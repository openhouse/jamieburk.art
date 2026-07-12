import { readFileSync } from "node:fs";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import publicRegistry from "../../apps/www/src/data/knowledge-bank/public-registry.json" with { type: "json" };

const publicSurfaceFiles = [
  "apps/www/src/content/work/callnyc.mdx",
  "apps/www/src/content/work/fair-rent-nyc.mdx",
  "apps/www/src/app/about/page.tsx",
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
  const candidateById = new Map(knowledgeBank.candidateClaims.map((candidate) => [candidate.id, candidate]));
  const knownRecordIds = new Set([
    ...knowledgeBank.sources.map((item) => item.id),
    ...knowledgeBank.claims.map((item) => item.id),
    ...knowledgeBank.researchInquiries.map((item) => item.id),
    ...knowledgeBank.candidateClaims.map((item) => item.id),
    ...knowledgeBank.sourceReadings.map((item) => item.id),
    ...knowledgeBank.pressCollections.map((item) => item.id)
  ]);

  for (const [label, items] of [
    ["source", knowledgeBank.sources],
    ["claim", knowledgeBank.claims],
    ["research inquiry", knowledgeBank.researchInquiries],
    ["correction", knowledgeBank.corrections],
    ["page", knowledgeBank.pages],
    ["intake item", knowledgeBank.intakeItems],
    ["source reading", knowledgeBank.sourceReadings],
    ["candidate claim", knowledgeBank.candidateClaims],
    ["promotion", knowledgeBank.promotions],
    ["editorial brief", knowledgeBank.editorialBriefs],
    ["discovery note", knowledgeBank.discoveryNotes],
    ["press collection", knowledgeBank.pressCollections]
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
    if (["researching", "processed", "deferred"].includes(item.status) && !item.linkedRecordIds.length) {
      errors.push(`Intake item ${item.id} has no forward link for its ${item.status} disposition`);
    }
    for (const id of item.linkedRecordIds) {
      if (!knownRecordIds.has(id)) errors.push(`Intake item ${item.id} references unknown record ${id}`);
    }
  }

  for (const reading of knowledgeBank.sourceReadings) {
    if (!sourceById.has(reading.sourceId)) errors.push(`Source reading ${reading.id} references unknown source ${reading.sourceId}`);
    for (const candidateId of reading.candidateClaimIds) {
      if (!candidateById.has(candidateId)) errors.push(`Source reading ${reading.id} references unknown candidate ${candidateId}`);
    }
  }
  for (const sourceId of duplicateIds(knowledgeBank.sourceReadings.map((reading) => ({ id: reading.sourceId })))) {
    errors.push(`Multiple source readings use source ${sourceId}; consolidate atomic assertions into one canonical reading`);
  }

  for (const candidate of knowledgeBank.candidateClaims) {
    for (const sourceId of candidate.sourceIds) {
      if (!sourceById.has(sourceId)) errors.push(`Candidate ${candidate.id} references unknown source ${sourceId}`);
    }
    for (const inquiryId of candidate.researchInquiryIds) {
      if (!inquiryById.has(inquiryId)) errors.push(`Candidate ${candidate.id} references unknown inquiry ${inquiryId}`);
    }
    if (candidate.status === "promoted") {
      if (!candidate.promotedClaimId || !claimById.has(candidate.promotedClaimId)) {
        errors.push(`Promoted candidate ${candidate.id} has no canonical claim`);
      }
      if (!knowledgeBank.promotions.some((promotion) => promotion.decision === "promoted" && promotion.candidateClaimId === candidate.id && promotion.claimId === candidate.promotedClaimId)) {
        errors.push(`Promoted candidate ${candidate.id} has no matching promotion decision`);
      }
    } else if (candidate.promotedClaimId) {
      errors.push(`Unpromoted candidate ${candidate.id} assigns canonical claim ${candidate.promotedClaimId}`);
    }
  }

  for (const promotion of knowledgeBank.promotions) {
    if (!candidateById.has(promotion.candidateClaimId)) errors.push(`Promotion ${promotion.id} references unknown candidate ${promotion.candidateClaimId}`);
    if (promotion.claimId && !claimById.has(promotion.claimId)) errors.push(`Promotion ${promotion.id} references unknown claim ${promotion.claimId}`);
  }

  for (const brief of knowledgeBank.editorialBriefs) {
    for (const claimId of brief.selectedClaimIds) if (!claimById.has(claimId)) errors.push(`Editorial brief ${brief.id} selects unknown claim ${claimId}`);
    for (const candidateId of brief.heldCandidateClaimIds) if (!candidateById.has(candidateId)) errors.push(`Editorial brief ${brief.id} holds unknown candidate ${candidateId}`);
  }

  for (const note of knowledgeBank.discoveryNotes) {
    for (const sourceId of note.sourceIds) if (!sourceById.has(sourceId)) errors.push(`Discovery note ${note.id} references unknown source ${sourceId}`);
    for (const candidateId of note.candidateClaimIds) if (!candidateById.has(candidateId)) errors.push(`Discovery note ${note.id} references unknown candidate ${candidateId}`);
  }

  for (const collection of knowledgeBank.pressCollections) {
    if (!sourceById.has(collection.campaignSourceId)) {
      errors.push(`Press collection ${collection.id} references unknown campaign source ${collection.campaignSourceId}`);
    }
    const entrySourceIds = collection.entries.map((entry) => entry.sourceId);
    if (new Set(entrySourceIds).size !== entrySourceIds.length) {
      errors.push(`Press collection ${collection.id} repeats an article source`);
    }
    for (const entry of collection.entries) {
      if (!sourceById.has(entry.sourceId)) {
        errors.push(`Press collection ${collection.id} references unknown article source ${entry.sourceId}`);
      }
      if (entry.retrievalStatus === "metadata-only" && !entry.archiveUrl) {
        errors.push(`Metadata-only press entry ${collection.id}/${entry.sourceId} has no archive fallback`);
      }
      if (entry.retrievalStatus === "not-recovered" && entry.archiveUrl) {
        errors.push(`Not-recovered press entry ${collection.id}/${entry.sourceId} exposes a recovered archive URL`);
      }
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
    ...knowledgeBank.researchInquiries.flatMap((inquiry) => inquiry.sourceIds),
    ...knowledgeBank.sourceReadings.map((reading) => reading.sourceId),
    ...knowledgeBank.candidateClaims.flatMap((candidate) => candidate.sourceIds),
    ...knowledgeBank.discoveryNotes.flatMap((note) => note.sourceIds),
    ...knowledgeBank.pressCollections.flatMap((collection) => [
      collection.campaignSourceId,
      ...collection.entries.map((entry) => entry.sourceId)
    ])
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
    intakeItems: knowledgeBank.intakeItems.length,
    sourceReadings: knowledgeBank.sourceReadings.length,
    candidateClaims: knowledgeBank.candidateClaims.length,
    promotedCandidates: knowledgeBank.candidateClaims.filter((candidate) => candidate.status === "promoted").length,
    promotions: knowledgeBank.promotions.length,
    editorialBriefs: knowledgeBank.editorialBriefs.length,
    discoveryNotes: knowledgeBank.discoveryNotes.length,
    pressCollections: knowledgeBank.pressCollections.length,
    pressPlacements: knowledgeBank.pressCollections.flatMap((collection) => collection.entries).length,
    distinctPressArticles: new Set(
      knowledgeBank.pressCollections.flatMap((collection) =>
        collection.entries.map((entry) => entry.sourceId)
      )
    ).size,
    citedClaims: citedClaimIds.size,
    uncitedPublicClaims: knowledgeBank.claims.filter((claim) => claim.projections.some((item) => item.status === "active" && item.surfaces.some((surface) => surface.startsWith("/"))) && !citedClaimIds.has(claim.id)).map((claim) => claim.id),
    orphanSources: knowledgeBank.sources.filter((source) => !referencedSourceIds.has(source.id)).map((source) => source.id),
    boundedEvidence: knowledgeBank.sources.filter((source) => source.visibility !== "public").map((source) => ({ id: source.id, visibility: source.visibility })),
    pages: knowledgeBank.pages.map((page) => ({ id: page.id, sources: page.sourceOrder.length, occurrences: page.occurrences.length }))
  };
}
