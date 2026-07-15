import { readFileSync } from "node:fs";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import publicRegistry from "../../apps/www/src/data/knowledge-bank/public-registry.json" with { type: "json" };

const publicSurfaceFiles = [
  "apps/www/src/content/work/callnyc.mdx",
  "apps/www/src/content/work/kc-town-hall.mdx",
  "apps/www/src/data/work.ts",
  "apps/www/src/data/proofs.ts",
  "apps/www/src/app/resume/page.tsx"
];

const forbiddenPathPatterns = [
  /\/private\//i,
  /\/tmp\//i,
  /file:\/\//i,
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
  const sourceById = new Map(knowledgeBank.sources.map((source) => [source.id, source]));
  const claimById = new Map(knowledgeBank.claims.map((claim) => [claim.id, claim]));
  const inquiryById = new Map(knowledgeBank.researchInquiries.map((inquiry) => [inquiry.id, inquiry]));

  for (const [label, items] of [
    ["source", knowledgeBank.sources],
    ["claim", knowledgeBank.claims],
    ["research inquiry", knowledgeBank.researchInquiries],
    ["correction", knowledgeBank.corrections],
    ["intake item", knowledgeBank.intakeItems],
    ["page", knowledgeBank.pages]
  ]) {
    for (const id of duplicateIds(items)) errors.push(`Duplicate ${label} ID: ${id}`);
  }

  for (const source of knowledgeBank.sources) {
    if (!source.publicCitation.trim()) errors.push(`Source ${source.id} has no public citation text`);
    if (source.visibility !== "public" && (source.canonicalUrl || source.archiveUrl || source.assetUrl)) errors.push(`Non-public source ${source.id} exposes a URL`);
    if (source.visibility === "public" && ["archived", "live-and-archived"].includes(source.preservationStatus) && !source.archiveUrl) errors.push(`Archived public source ${source.id} has no archive URL`);
  }

  for (const claim of knowledgeBank.claims) {
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
    }
  }

  for (const inquiry of knowledgeBank.researchInquiries) {
    for (const sourceId of inquiry.sourceIds) if (!sourceById.has(sourceId)) errors.push(`Inquiry ${inquiry.id} references unknown source ${sourceId}`);
    if (inquiry.resultStatus === "not-recovered" && !inquiry.limitations.length) errors.push(`Not-recovered inquiry ${inquiry.id} has no limitations`);
  }

  for (const correction of knowledgeBank.corrections) {
    if (!claimById.has(correction.claimId)) errors.push(`Correction ${correction.id} references unknown claim ${correction.claimId}`);
  }

  for (const item of knowledgeBank.intakeItems) {
    for (const sourceId of item.sourceIds) {
      if (!sourceById.has(sourceId)) errors.push(`Intake item ${item.id} references unknown source ${sourceId}`);
    }
    for (const claimId of item.relatedClaimIds) {
      if (!claimById.has(claimId)) errors.push(`Intake item ${item.id} references unknown claim ${claimId}`);
    }
    if (item.projectionStatus !== "no-public-projection") {
      errors.push(`Intake item ${item.id} is incorrectly approved for public projection`);
    }
    if (JSON.stringify(publicRegistry).includes(item.id)) {
      errors.push(`Intake item ${item.id} leaked into the public citation registry`);
    }
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

  for (const value of allStrings(knowledgeBank)) {
    for (const pattern of forbiddenPathPatterns) if (pattern.test(value)) errors.push(`Canonical registry contains forbidden private path or URL: ${value}`);
  }

  const publicJson = JSON.stringify(publicRegistry);
  for (const source of knowledgeBank.sources) {
    if (source.protectedLocatorId && publicJson.includes(source.protectedLocatorId)) errors.push(`Protected locator ${source.protectedLocatorId} leaked into public registry`);
  }
  if (publicRegistry.sources.some((source) => source.visibility !== "public")) errors.push("Public registry contains a non-public source");

  if (includePublicFiles) {
    const publicText = publicSurfaceFiles.map((path) => readFileSync(path, "utf8")).join("\n");
    for (const pattern of [/first civic-data hackathon/i, /first civic-tech hackathon/i, /the Council['’]s first hackathon(?! of)/i, /2014[-–]2015/, /citation pending|press citation pending/i]) {
      if (pattern.test(publicText)) errors.push(`Retired or unresolved wording remains on a public surface: ${pattern}`);
    }
    for (const path of [
      "apps/www/src/content/work/callnyc.mdx",
      "apps/www/src/content/work/kc-town-hall.mdx"
    ]) {
      const mdx = readFileSync(path, "utf8");
      if (/\[\d+\]/.test(mdx)) {
        errors.push(`${path} contains a manually typed citation number`);
      }
    }
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
    ...knowledgeBank.researchInquiries.flatMap((inquiry) => inquiry.sourceIds),
    ...knowledgeBank.intakeItems.flatMap((item) => item.sourceIds)
  ]);
  const activeProjections = knowledgeBank.claims.flatMap((claim) => claim.projections.filter((item) => item.status === "active"));
  return {
    sourceKinds: countBy(knowledgeBank.sources, "kind"),
    sourceVisibility: countBy(knowledgeBank.sources, "visibility"),
    preservation: countBy(knowledgeBank.sources, "preservationStatus"),
    activeProjections: activeProjections.length,
    projectionSurfaces: [...new Set(activeProjections.flatMap((item) => item.surfaces))].sort(),
    corrections: knowledgeBank.corrections.length,
    inquiries: knowledgeBank.researchInquiries.length,
    intakeByStatus: countBy(knowledgeBank.intakeItems, "status"),
    citedClaims: citedClaimIds.size,
    uncitedPublicClaims: knowledgeBank.claims.filter((claim) => claim.projections.some((item) => item.status === "active" && item.surfaces.some((surface) => surface.startsWith("/"))) && !citedClaimIds.has(claim.id)).map((claim) => claim.id),
    orphanSources: knowledgeBank.sources.filter((source) => !referencedSourceIds.has(source.id)).map((source) => source.id),
    boundedEvidence: knowledgeBank.sources.filter((source) => source.visibility !== "public").map((source) => ({ id: source.id, visibility: source.visibility })),
    pages: knowledgeBank.pages.map((page) => ({ id: page.id, sources: page.sourceOrder.length, occurrences: page.occurrences.length }))
  };
}
