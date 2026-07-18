import { readFileSync } from "node:fs";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import { proofClaims } from "../../apps/www/src/data/proofs.ts";
import publicRegistry from "../../apps/www/src/data/knowledge-bank/public-registry.json" with { type: "json" };
import { canonicalizePublicUrl, containsPrivatePath } from "./security-normalization.mjs";

const publicSurfaceFiles = [
  "apps/www/src/content/work/callnyc.mdx",
  "apps/www/src/content/work/kc-town-hall.mdx",
  "apps/www/src/data/work.ts",
  "apps/www/src/data/proofs.ts",
  "apps/www/src/app/resume/page.tsx"
];

const forbiddenPublicUrlPatterns = [
  /civic-hall-wayback-research/i,
  /(?:drive|dropbox)\.google\.com/i,
  /[?&](?:x-goog-signature|x-amz-signature)=/i
];

function duplicateIds(items) {
  const seen = new Set();
  return items.map((item) => item.id).filter((id) => seen.has(id) || !seen.add(id));
}

function normalize(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function allStrings(value, strings = []) {
  if (typeof value === "string") strings.push(value);
  else if (Array.isArray(value)) value.forEach((item) => allStrings(item, strings));
  else if (value && typeof value === "object") Object.values(value).forEach((item) => allStrings(item, strings));
  return strings;
}

export function validateKnowledgeBank({ includePublicFiles = true } = {}) {
  const errors = [];
  const intakeById = new Map(knowledgeBank.intakeItems.map((item) => [item.id, item]));
  const observationById = new Map(knowledgeBank.observations.map((item) => [item.id, item]));
  const sourceById = new Map(knowledgeBank.sources.map((source) => [source.id, source]));
  const claimById = new Map(knowledgeBank.claims.map((claim) => [claim.id, claim]));
  const inquiryById = new Map(knowledgeBank.researchInquiries.map((inquiry) => [inquiry.id, inquiry]));

  for (const [label, items] of [
    ["intake item", knowledgeBank.intakeItems],
    ["observation", knowledgeBank.observations],
    ["source", knowledgeBank.sources],
    ["claim", knowledgeBank.claims],
    ["research inquiry", knowledgeBank.researchInquiries],
    ["proof coverage target", knowledgeBank.proofCoverageTargets.map((item) => ({ id: item.proofId }))],
    ["correction", knowledgeBank.corrections],
    ["page", knowledgeBank.pages]
  ]) {
    for (const id of duplicateIds(items)) errors.push(`Duplicate ${label} ID: ${id}`);
  }

  for (const intake of knowledgeBank.intakeItems) {
    for (const sourceId of intake.sourceIds) {
      if (!sourceById.has(sourceId)) errors.push(`Intake ${intake.id} references unknown source ${sourceId}`);
    }
    for (const observationId of intake.observationIds) {
      const observation = observationById.get(observationId);
      if (!observation) errors.push(`Intake ${intake.id} references unknown observation ${observationId}`);
      else if (observation.intakeId !== intake.id) errors.push(`Observation ${observationId} points to ${observation.intakeId}, not ${intake.id}`);
    }
    for (const inquiryId of intake.researchInquiryIds) {
      if (!inquiryById.has(inquiryId)) errors.push(`Intake ${intake.id} references unknown inquiry ${inquiryId}`);
    }
    if (intake.kind === "public-url" && !intake.sourceUrl) errors.push(`Public URL intake ${intake.id} has no sourceUrl`);
    if (intake.kind === "photo-lead") {
      if (!intake.observationIds.length || !intake.researchInquiryIds.length) errors.push(`Photo lead ${intake.id} lacks a visual observation or research inquiry`);
      for (const observationId of intake.observationIds) {
        const observation = observationById.get(observationId);
        if (observation && observation.kind !== "visual-observation") errors.push(`Photo lead ${intake.id} uses non-visual observation ${observationId}`);
      }
    }
    if (intake.disposition === "integrated" && (!intake.sourceIds.length || !intake.observationIds.length)) errors.push(`Integrated intake ${intake.id} lacks a source or observation`);
    if (["captured", "researching"].includes(intake.disposition) && !intake.researchInquiryIds.length) errors.push(`Open intake ${intake.id} has no research inquiry`);
  }

  for (const observation of knowledgeBank.observations) {
    const intake = intakeById.get(observation.intakeId);
    if (!intake) errors.push(`Observation ${observation.id} references unknown intake ${observation.intakeId}`);
    else {
      if (!intake.observationIds.includes(observation.id)) {
        errors.push(`Observation ${observation.id} points to intake ${intake.id}, but the intake does not list it`);
      }
      if (
        observation.sourceId &&
        intake.sourceIds.length === 1 &&
        intake.sourceIds[0] !== observation.sourceId
      ) {
        errors.push(
          `Observation ${observation.id} uses source ${observation.sourceId}, not the single source ${intake.sourceIds[0]} listed by intake ${intake.id}`
        );
      }
    }
    if (observation.sourceId && !sourceById.has(observation.sourceId)) errors.push(`Observation ${observation.id} references unknown source ${observation.sourceId}`);
    for (const claimId of observation.claimIds) if (!claimById.has(claimId)) errors.push(`Observation ${observation.id} references unknown claim ${claimId}`);
    for (const inquiryId of observation.researchInquiryIds) if (!inquiryById.has(inquiryId)) errors.push(`Observation ${observation.id} references unknown inquiry ${inquiryId}`);
    if (["corroborated", "verified"].includes(observation.status) && !observation.sourceId) errors.push(`Verified observation ${observation.id} has no source`);
    if (!observation.publicSafe && observation.claimIds.length) errors.push(`Non-public observation ${observation.id} is attached to a public-safe claim record`);
  }

  for (const source of knowledgeBank.sources) {
    if (!source.publicCitation.trim()) errors.push(`Source ${source.id} has no public citation text`);
    if (!source.doesNotEstablish.length) errors.push(`Source ${source.id} has no doesNotEstablish boundary`);
    if (source.visibility !== "public" && (source.canonicalUrl || source.archiveUrl || source.assetUrl)) errors.push(`Non-public source ${source.id} exposes a URL`);
    if (source.visibility === "public" && ["archived", "live-and-archived"].includes(source.preservationStatus) && !source.archiveUrl) errors.push(`Archived public source ${source.id} has no archive URL`);
  }

  const canonicalSourceUrls = new Map();
  for (const source of knowledgeBank.sources) {
    const field = source.canonicalUrl ? "canonicalUrl" : source.assetUrl ? "assetUrl" : "archiveUrl";
    const value = source[field];
    if (!value) continue;
    let canonical;
    try {
      canonical = canonicalizePublicUrl(value, { stripHash: false });
    } catch {
      errors.push(`Source ${source.id} has malformed ${field}: ${value}`);
      continue;
    }
    const prior = canonicalSourceUrls.get(canonical);
    if (prior && prior.sourceId !== source.id) {
      errors.push(`Sources ${prior.sourceId} and ${source.id} reuse canonical public URL ${canonical}`);
    } else {
      canonicalSourceUrls.set(canonical, { sourceId: source.id, field });
    }
  }

  for (const claim of knowledgeBank.claims) {
    if (["confirmed", "confirmed-with-boundary"].includes(claim.status) && !claim.evidence.length) errors.push(`Confirmed claim ${claim.id} has no evidence`);
    for (const evidence of claim.evidence) {
      const source = sourceById.get(evidence.sourceId);
      if (!source) {
        errors.push(`Claim ${claim.id} references unknown source ${evidence.sourceId}`);
        continue;
      }
      for (const supported of evidence.supports) {
        const support = normalize(supported);
        if (source.doesNotEstablish.some((boundary) => {
          const bounded = normalize(boundary);
          return support === bounded || (support.length > 12 && bounded.includes(support));
        })) errors.push(`Claim ${claim.id} uses ${source.id} to support a proposition it does not establish: ${supported}`);
      }
    }

    for (const inquiryId of claim.researchInquiryIds) {
      if (!inquiryById.has(inquiryId)) errors.push(`Claim ${claim.id} references unknown inquiry ${inquiryId}`);
    }

    if (claim.status === "not-recovered") {
      if (!claim.researchInquiryIds.length) errors.push(`Not-recovered claim ${claim.id} has no inquiry`);
      if (claim.projections.some((projection) => /did not exist|no .* existed/i.test(projection.text))) errors.push(`Not-recovered claim ${claim.id} is phrased as proof of nonexistence`);
      for (const inquiryId of claim.researchInquiryIds) {
        const inquiry = inquiryById.get(inquiryId);
        if (inquiry && !inquiry.limitations.length) errors.push(`Inquiry ${inquiry.id} has no limitations`);
      }
    }

    for (const projection of claim.projections) {
      if (projection.status === "active" && projection.citationRequired && !claim.evidence.some((evidence) => evidence.renderCitation)) errors.push(`Active cited projection ${claim.id}/${projection.key} has no renderable evidence`);
      if (projection.status === "hold" && projection.surfaces.length) errors.push(`Held projection ${claim.id}/${projection.key} names a public surface`);
    }
  }

  for (const inquiry of knowledgeBank.researchInquiries) {
    for (const sourceId of inquiry.sourceIds) if (!sourceById.has(sourceId)) errors.push(`Inquiry ${inquiry.id} references unknown source ${sourceId}`);
    if (inquiry.resultStatus === "not-recovered" && !inquiry.limitations.length) errors.push(`Not-recovered inquiry ${inquiry.id} has no limitations`);
  }

  const proofIds = new Set(proofClaims.map((proof) => proof.id));
  const coveredProofIds = new Set();
  for (const target of knowledgeBank.proofCoverageTargets) {
    coveredProofIds.add(target.proofId);
    if (!proofIds.has(target.proofId)) errors.push(`Coverage target references unknown proof ${target.proofId}`);
    for (const sourceId of target.sourceIds) if (!sourceById.has(sourceId)) errors.push(`Coverage target ${target.proofId} references unknown source ${sourceId}`);
    for (const inquiryId of target.researchInquiryIds) if (!inquiryById.has(inquiryId)) errors.push(`Coverage target ${target.proofId} references unknown inquiry ${inquiryId}`);
  }
  for (const proofId of proofIds) if (!coveredProofIds.has(proofId)) errors.push(`Proof ${proofId} has no evidence-coverage disposition`);

  for (const correction of knowledgeBank.corrections) {
    if (!claimById.has(correction.claimId)) errors.push(`Correction ${correction.id} references unknown claim ${correction.claimId}`);
  }

  for (const page of knowledgeBank.pages) {
    for (const id of duplicateIds(page.occurrences)) errors.push(`Duplicate occurrence ${page.id}/${id}`);
    if (new Set(page.sourceOrder).size !== page.sourceOrder.length) errors.push(`Page ${page.id} has duplicate source-order entries`);
    const firstAppearance = [];
    for (const occurrence of page.occurrences) {
      const claim = claimById.get(occurrence.claimId);
      if (!claim) {
        errors.push(`Occurrence ${page.id}/${occurrence.id} references unknown claim ${occurrence.claimId}`);
        continue;
      }
      const projection = claim.projections.find((item) => item.key === occurrence.projection);
      if (!projection || projection.status !== "active" || !projection.surfaces.includes(page.surface)) errors.push(`Occurrence ${page.id}/${occurrence.id} uses an unauthorized projection`);
      const renderable = new Set(claim.evidence.filter((item) => item.renderCitation).map((item) => item.sourceId));
      const sourceIds = occurrence.sourceIds ?? [...renderable];
      for (const sourceId of sourceIds) {
        if (!sourceById.has(sourceId)) errors.push(`Occurrence ${page.id}/${occurrence.id} references unknown source ${sourceId}`);
        if (!renderable.has(sourceId)) errors.push(`Occurrence ${page.id}/${occurrence.id} uses ${sourceId} outside claim evidence`);
        if (!firstAppearance.includes(sourceId)) firstAppearance.push(sourceId);
      }
    }
    if (JSON.stringify(firstAppearance) !== JSON.stringify(page.sourceOrder)) errors.push(`Page ${page.id} source order does not match first appearance or contains unused sources`);
  }

  if (containsPrivatePath(knowledgeBank)) errors.push("Canonical registry contains a forbidden private filesystem path");
  for (const value of allStrings(knowledgeBank)) {
    for (const pattern of forbiddenPublicUrlPatterns) if (pattern.test(value)) errors.push(`Canonical registry contains forbidden private URL: ${value}`);
  }

  const publicJson = JSON.stringify(publicRegistry);
  for (const source of knowledgeBank.sources) {
    if (source.protectedLocatorId && publicJson.includes(source.protectedLocatorId)) errors.push(`Protected locator ${source.protectedLocatorId} leaked into public registry`);
  }
  if (publicRegistry.sources.some((source) => source.visibility !== "public")) errors.push("Public registry contains a non-public source");

  if (includePublicFiles) {
    const publicText = publicSurfaceFiles.map((path) => readFileSync(path, "utf8")).join("\n");
    for (const pattern of [/first civic-data hackathon/i, /first civic-tech hackathon/i, /the Council['’]s first hackathon(?! of)/i, /2014[-–]2015/, /citation pending|press citation pending/i, /recommendation unless final funding details/i, /KC Town Hall received (?:or spent )?(?:the )?\$490,539/i]) {
      if (pattern.test(publicText)) errors.push(`Retired or unresolved wording remains on a public surface: ${pattern}`);
    }
    const mdx = readFileSync("apps/www/src/content/work/callnyc.mdx", "utf8");
    if (/\[\d+\]/.test(mdx)) errors.push("CallNYC MDX contains a manually typed citation number");
  }

  return errors;
}

export function citationReport() {
  const countBy = (items, key) => Object.entries(items.reduce((counts, item) => {
    const value = item[key];
    counts[value] = (counts[value] ?? 0) + 1;
    return counts;
  }, {}));
  const citedClaimIds = new Set(knowledgeBank.pages.flatMap((page) => page.occurrences.map((item) => item.claimId)));
  const referencedSourceIds = new Set([
    ...knowledgeBank.claims.flatMap((claim) => claim.evidence.map((item) => item.sourceId)),
    ...knowledgeBank.researchInquiries.flatMap((inquiry) => inquiry.sourceIds)
  ]);
  const activeProjections = knowledgeBank.claims.flatMap((claim) => claim.projections.filter((item) => item.status === "active"));
  return {
    intakeDispositions: countBy(knowledgeBank.intakeItems, "disposition"),
    observationStatus: countBy(knowledgeBank.observations, "status"),
    openResearchLeads: knowledgeBank.intakeItems.filter((item) => ["captured", "researching"].includes(item.disposition)).map((item) => item.id),
    proofCoverageStatus: countBy(knowledgeBank.proofCoverageTargets, "status"),
    sourceKinds: countBy(knowledgeBank.sources, "kind"),
    sourceVisibility: countBy(knowledgeBank.sources, "visibility"),
    preservation: countBy(knowledgeBank.sources, "preservationStatus"),
    activeProjections: activeProjections.length,
    projectionSurfaces: [...new Set(activeProjections.flatMap((item) => item.surfaces))].sort(),
    corrections: knowledgeBank.corrections.length,
    inquiries: knowledgeBank.researchInquiries.length,
    citedClaims: citedClaimIds.size,
    uncitedPublicClaims: knowledgeBank.claims.filter((claim) => claim.projections.some((item) => item.status === "active" && item.surfaces.some((surface) => surface.startsWith("/"))) && !citedClaimIds.has(claim.id)).map((claim) => claim.id),
    orphanSources: knowledgeBank.sources.filter((source) => !referencedSourceIds.has(source.id)).map((source) => source.id),
    boundedEvidence: knowledgeBank.sources.filter((source) => source.visibility !== "public").map((source) => ({ id: source.id, visibility: source.visibility })),
    pages: knowledgeBank.pages.map((page) => ({ id: page.id, sources: page.sourceOrder.length, occurrences: page.occurrences.length }))
  };
}
