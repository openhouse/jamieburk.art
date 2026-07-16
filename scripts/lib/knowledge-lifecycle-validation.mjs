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
    ["inquiry", bank.researchInquiries],
    ["correction", bank.corrections],
    ["citation page", bank.pages]
  ]) {
    for (const id of duplicateIds(items)) errors.push(`Duplicate ${label} ID: ${id}`);
  }

  for (const record of bank.intake) {
    const lifecycleLinks = [
      ...record.sourceIds,
      ...record.claimIds,
      ...record.inquiryIds,
      ...record.correctionIds
    ];
    if (!lifecycleLinks.length && !["deferred", "rejected"].includes(record.status)) {
      errors.push(
        `Intake ${record.id} has no source, inquiry, claim, or correction disposition`
      );
    }
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
    if (record.kind === "reader-feedback" && record.claimIds.length) {
      errors.push(`Reader feedback ${record.id} bypasses governance and links directly to a claim`);
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

  const intakeClaimIds = new Set(bank.intake.flatMap((item) => item.claimIds));
  for (const claim of bank.claims) {
    if (!intakeClaimIds.has(claim.id)) {
      errors.push(`Claim ${claim.id} has no intake disposition`);
    }
  }

  const intakeInquiryIds = new Set(bank.intake.flatMap((item) => item.inquiryIds));
  for (const inquiry of bank.researchInquiries) {
    if (!intakeInquiryIds.has(inquiry.id)) {
      errors.push(`Inquiry ${inquiry.id} has no intake disposition`);
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
    for (const inquiryId of claim.researchInquiryIds) {
      if (!inquiryById.has(inquiryId)) {
        errors.push(`Claim ${claim.id} references unknown inquiry ${inquiryId}`);
      }
    }
    for (const relationship of claim.evidence) {
      if (!sourceById.has(relationship.sourceId)) {
        errors.push(
          `Claim ${claim.id} references unknown evidence source ${relationship.sourceId}`
        );
      }
    }
    for (const projection of claim.projections) {
      if (!projection.rationale) {
        errors.push(`Projection ${claim.id}/${projection.key} has no rationale`);
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

  for (const inquiry of bank.researchInquiries) {
    for (const sourceId of inquiry.sourceIds) {
      if (!sourceById.has(sourceId)) {
        errors.push(`Inquiry ${inquiry.id} references unknown source ${sourceId}`);
      }
    }
  }

  for (const correction of bank.corrections) {
    if (!claimById.has(correction.claimId)) {
      errors.push(`Correction ${correction.id} references unknown claim ${correction.claimId}`);
    }
  }

  for (const page of bank.pages) {
    const sourceOrder = new Set(page.sourceOrder);
    for (const sourceId of page.sourceOrder) {
      if (!sourceById.has(sourceId)) {
        errors.push(`Citation page ${page.id} references unknown source ${sourceId}`);
      }
    }
    for (const occurrenceId of duplicateIds(page.occurrences)) {
      errors.push(`Duplicate citation occurrence ID on ${page.id}: ${occurrenceId}`);
    }
    for (const occurrence of page.occurrences) {
      if (!claimById.has(occurrence.claimId)) {
        errors.push(
          `Citation occurrence ${page.id}/${occurrence.id} references unknown claim ${occurrence.claimId}`
        );
      }
      for (const sourceId of occurrence.sourceIds ?? []) {
        if (!sourceById.has(sourceId)) {
          errors.push(
            `Citation occurrence ${page.id}/${occurrence.id} references unknown source ${sourceId}`
          );
        }
        if (!sourceOrder.has(sourceId)) {
          errors.push(
            `Citation occurrence ${page.id}/${occurrence.id} uses source ${sourceId} outside the page source order`
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
        rationale: projection.rationale
      }))
    ),
    proofProjectionDecisions: proofs.map((proof) => ({
      proofId: proof.id,
      status: proof.status,
      surfaces: proof.surfaces,
      rationale: proof.whyItMatters ?? proof.publicWording,
      guardrail: proof.guardrail,
      canonicalCoverage: Boolean(proof.canonicalClaimIds?.length)
    })),
    canonicallyLinkedProofIds: linkedProofs.map((proof) => proof.id),
    proofResearchBacklogIds: proofs
      .filter((proof) => !proof.canonicalClaimIds?.length)
      .map((proof) => proof.id)
  };
}
