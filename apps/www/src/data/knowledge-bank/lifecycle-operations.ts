import { createHash } from "node:crypto";

import {
  intakeItemSchema,
  type IntakeItem,
  type KnowledgeBank
} from "./schema.ts";

function canonicalize(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>)
        .sort(([left], [right]) => left.localeCompare(right))
        .map(([key, entry]) => [key, canonicalize(entry)])
    );
  }
  return value;
}

function digest(value: unknown) {
  return createHash("sha256")
    .update(JSON.stringify(canonicalize(value)))
    .digest("hex");
}

function intakeIdentity(item: IntakeItem) {
  return {
    kind: item.kind,
    title: item.title.trim(),
    projectIds: [...item.projectIds].sort(),
    reason: item.reason.trim(),
    sourceUrl: item.sourceUrl,
    visibility: item.visibility
  };
}

export function intakeFingerprint(item: IntakeItem) {
  return digest(intakeIdentity(item));
}

export function intakeRecordFingerprint(item: IntakeItem) {
  return digest(item);
}

export type AppendIntakeResult = {
  knowledgeBank: KnowledgeBank;
  intake: IntakeItem;
  status: "appended" | "already-present" | "duplicate-preserved";
};

export function appendIntakeItem(
  knowledgeBank: KnowledgeBank,
  candidate: IntakeItem
): AppendIntakeResult {
  const intake = intakeItemSchema.parse(candidate);
  const sameId = knowledgeBank.intakeItems.find((item) => item.id === intake.id);

  if (sameId) {
    if (intakeRecordFingerprint(sameId) === intakeRecordFingerprint(intake)) {
      return { knowledgeBank, intake: sameId, status: "already-present" };
    }
    throw new Error(`Intake ID collision with different content: ${intake.id}`);
  }

  const sameArtifact = knowledgeBank.intakeItems.find(
    (item) => intakeFingerprint(item) === intakeFingerprint(intake)
  );
  const appended = sameArtifact
    ? intakeItemSchema.parse({
        ...intake,
        disposition: "duplicate",
        duplicateOfIntakeId: sameArtifact.id
      })
    : intake;

  return {
    knowledgeBank: {
      ...knowledgeBank,
      intakeItems: [...knowledgeBank.intakeItems, appended]
    },
    intake: appended,
    status: sameArtifact ? "duplicate-preserved" : "appended"
  };
}

export function queryKnowledgeLifecycle(knowledgeBank: KnowledgeBank) {
  const referencedSourceIds = new Set([
    ...knowledgeBank.intakeItems.flatMap((item) => item.sourceIds),
    ...knowledgeBank.observations.flatMap((item) => [
      ...(item.sourceId ? [item.sourceId] : []),
      ...item.comparisonSourceIds
    ]),
    ...knowledgeBank.claims.flatMap((claim) =>
      claim.evidence.map((evidence) => evidence.sourceId)
    ),
    ...knowledgeBank.agencyRelations.flatMap((relation) => relation.sourceIds),
    ...knowledgeBank.researchInquiries.flatMap((inquiry) => inquiry.sourceIds),
    ...knowledgeBank.proofCoverageTargets.flatMap((target) => target.sourceIds),
    ...knowledgeBank.pages.flatMap((page) => page.sourceOrder)
  ]);
  const observedClaimIds = new Set(
    knowledgeBank.observations.flatMap((observation) => observation.claimIds)
  );
  const citedClaimIds = new Set(
    knowledgeBank.pages.flatMap((page) =>
      page.occurrences.map((occurrence) => occurrence.claimId)
    )
  );

  return {
    openIntakeIds: knowledgeBank.intakeItems
      .filter((item) => ["captured", "researching", "deferred"].includes(item.disposition))
      .map((item) => item.id),
    duplicateIntakeIds: knowledgeBank.intakeItems
      .filter((item) => item.disposition === "duplicate")
      .map((item) => item.id),
    unresolvedInquiryIds: knowledgeBank.researchInquiries
      .filter((inquiry) => ["not-recovered", "inconclusive", "partially-recovered"].includes(inquiry.resultStatus))
      .map((inquiry) => inquiry.id),
    matureHeldClaimIds: knowledgeBank.claims
      .filter((claim) =>
        ["confirmed", "confirmed-with-boundary", "use-with-care"].includes(claim.status) &&
        !claim.projections.some((projection) => projection.status === "active")
      )
      .map((claim) => claim.id),
    uncitedActiveClaimIds: knowledgeBank.claims
      .filter((claim) =>
        claim.projections.some((projection) => projection.status === "active") &&
        !citedClaimIds.has(claim.id)
      )
      .map((claim) => claim.id),
    unobservedClaimIds: knowledgeBank.claims
      .filter((claim) => !observedClaimIds.has(claim.id))
      .map((claim) => claim.id),
    orphanSourceIds: knowledgeBank.sources
      .filter((source) => !referencedSourceIds.has(source.id))
      .map((source) => source.id),
    correctionIds: knowledgeBank.corrections.map((correction) => correction.id),
    projectionCounts: Object.fromEntries(
      ["active", "hold", "deprecated", "disallowed"].map((status) => [
        status,
        knowledgeBank.claims.reduce(
          (count, claim) =>
            count + claim.projections.filter((projection) => projection.status === status).length,
          0
        )
      ])
    )
  };
}
