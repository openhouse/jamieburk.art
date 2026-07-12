import { existsSync } from "node:fs";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import { proofClaims } from "../../apps/www/src/data/proofs.ts";

const privateMarkers = [
  /\/Users\//i,
  /\/Volumes\//i,
  /Mobile Documents/i,
  /supporting-materials/i,
  /raw-otter/i,
  /\.docx\b/i,
  /\.xlsx\b/i,
  /private transcript/i,
  /contact list/i
];

function duplicateIds(items) {
  const seen = new Set();
  return items.map((item) => item.id).filter((id) => seen.has(id) || !seen.add(id));
}

function allStrings(value, strings = []) {
  if (typeof value === "string") strings.push(value);
  else if (Array.isArray(value)) value.forEach((item) => allStrings(item, strings));
  else if (value && typeof value === "object") {
    Object.values(value).forEach((item) => allStrings(item, strings));
  }
  return strings;
}

function normalizeProposition(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

export function validateKnowledgeLifecycle(
  bank = knowledgeBank,
  proofs = proofClaims
) {
  const errors = [];
  const sourceById = new Map(bank.sources.map((item) => [item.id, item]));
  const claimById = new Map(bank.claims.map((item) => [item.id, item]));
  const inquiryById = new Map(bank.researchInquiries.map((item) => [item.id, item]));
  const correctionById = new Map(bank.corrections.map((item) => [item.id, item]));
  const intakeById = new Map(bank.intake.map((item) => [item.id, item]));

  if (!bank.intake.length) errors.push("Knowledge lifecycle has no intake records");

  for (const [label, items] of [
    ["intake", bank.intake],
    ["source", bank.sources],
    ["claim", bank.claims],
    ["inquiry", bank.researchInquiries]
  ]) {
    for (const id of duplicateIds(items)) errors.push(`Duplicate ${label} ID: ${id}`);
  }

  for (const record of bank.intake) {
    for (const sourceId of record.sourceIds) {
      if (!sourceById.has(sourceId)) {
        errors.push(`Intake ${record.id} references unknown source ${sourceId}`);
      }
    }
    for (const claimId of record.claimIds) {
      if (!claimById.has(claimId)) {
        errors.push(`Intake ${record.id} references unknown claim ${claimId}`);
      }
    }
    for (const inquiryId of record.inquiryIds) {
      if (!inquiryById.has(inquiryId)) {
        errors.push(`Intake ${record.id} references unknown inquiry ${inquiryId}`);
      }
    }
    for (const correctionId of record.correctionIds) {
      if (!correctionById.has(correctionId)) {
        errors.push(`Intake ${record.id} references unknown correction ${correctionId}`);
      }
    }
    for (const relatedId of record.relatedIntakeIds) {
      if (!intakeById.has(relatedId)) {
        errors.push(`Intake ${record.id} references unknown related intake ${relatedId}`);
      }
    }
    for (const artifactPath of record.artifactPaths) {
      if (!existsSync(artifactPath)) {
        errors.push(`Intake ${record.id} references missing governance artifact ${artifactPath}`);
      }
    }

    if (record.status === "matured" && !record.claimIds.length) {
      errors.push(`Matured intake ${record.id} has no claim`);
    }
    if (record.status === "researching" && !record.inquiryIds.length) {
      errors.push(`Researching intake ${record.id} has no inquiry`);
    }
    if (record.kind === "photo-lead" && record.claimIds.length) {
      errors.push(`Photo lead ${record.id} bypasses research and links directly to a claim`);
    }

    for (const value of allStrings(record)) {
      for (const marker of privateMarkers) {
        if (marker.test(value)) {
          errors.push(`Intake ${record.id} contains a private marker: ${value}`);
        }
      }
    }
  }

  const intakeSourceIds = new Set(bank.intake.flatMap((item) => item.sourceIds));
  for (const source of bank.sources) {
    if (!intakeSourceIds.has(source.id)) {
      errors.push(`Source ${source.id} has no intake disposition`);
    }
  }

  const intakeCorrectionIds = new Set(
    bank.intake.flatMap((item) => item.correctionIds)
  );
  for (const correction of bank.corrections) {
    if (!intakeCorrectionIds.has(correction.id)) {
      errors.push(`Correction ${correction.id} has no intake disposition`);
    }
  }

  const graphSourceIds = new Set([
    ...bank.claims.flatMap((claim) => claim.evidence.map((item) => item.sourceId)),
    ...bank.researchInquiries.flatMap((inquiry) => inquiry.sourceIds)
  ]);
  for (const source of bank.sources) {
    if (!graphSourceIds.has(source.id)) {
      errors.push(`Source ${source.id} is not associated with a claim or inquiry`);
    }
  }

  for (const claim of bank.claims) {
    for (const projection of claim.projections) {
      if (projection.status === "hold" && !projection.rationale) {
        errors.push(`Held projection ${claim.id}/${projection.key} has no rationale`);
      }
    }
    if (["confirmed", "confirmed-with-boundary"].includes(claim.status)) {
      if (!claim.evidence.length) errors.push(`Mature claim ${claim.id} has no evidence`);
      if (!claim.reviewedBy.length) errors.push(`Mature claim ${claim.id} has no reviewer`);
      if (
        claim.status === "confirmed-with-boundary" &&
        !claim.boundaries.length &&
        !claim.antiClaims.length
      ) {
        errors.push(`Bounded claim ${claim.id} has no boundary or anti-claim`);
      }
    }
    for (const relationship of claim.evidence) {
      const source = sourceById.get(relationship.sourceId);
      if (!source) continue;
      const excluded = new Set(source.doesNotEstablish.map(normalizeProposition));
      for (const support of relationship.supports) {
        if (excluded.has(normalizeProposition(support))) {
          errors.push(
            `Claim ${claim.id} uses ${source.id} to support a proposition the source does not establish: ${support}`
          );
        }
      }
    }
  }

  for (const proof of proofs) {
    for (const claimId of proof.canonicalClaimIds ?? []) {
      if (!claimById.has(claimId)) {
        errors.push(`Proof ${proof.id} references unknown canonical claim ${claimId}`);
      }
    }
  }

  return errors;
}

export function knowledgeLifecycleReport(bank = knowledgeBank, proofs = proofClaims) {
  const linkedProofs = proofs.filter((proof) => proof.canonicalClaimIds?.length);
  const heldClaims = bank.claims.filter((claim) => {
    const mature = ["confirmed", "confirmed-with-boundary", "use-with-care"].includes(
      claim.status
    );
    const websiteActive = claim.projections.some(
      (projection) =>
        projection.status === "active" &&
        projection.surfaces.some((surface) => surface.startsWith("/"))
    );
    return mature && !websiteActive;
  });

  return {
    intakeCount: bank.intake.length,
    intakeByStatus: Object.fromEntries(
      [...new Set(bank.intake.map((item) => item.status))]
        .sort()
        .map((status) => [status, bank.intake.filter((item) => item.status === status).length])
    ),
    sources: bank.sources.length,
    claims: bank.claims.length,
    inquiries: bank.researchInquiries.length,
    heldMatureClaimIds: heldClaims.map((claim) => claim.id),
    projectionDecisions: bank.claims.flatMap((claim) =>
      claim.projections.map((projection) => ({
        claimId: claim.id,
        key: projection.key,
        status: projection.status,
        surfaces: projection.surfaces,
        rationale:
          projection.rationale ??
          (projection.status === "active"
            ? `Selected for ${projection.surfaces.join(", ")} as an approved audience-specific projection.`
            : "No rationale recorded.")
      }))
    ),
    canonicallyLinkedProofIds: linkedProofs.map((proof) => proof.id),
    proofResearchBacklogIds: proofs
      .filter((proof) => !proof.canonicalClaimIds?.length)
      .map((proof) => proof.id)
  };
}
