import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const stableIdPattern = /^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+$/;

export function hasStableId(value) {
  return typeof value === "string" && stableIdPattern.test(value);
}

export function resultsAreGreen(results) {
  return results.length > 0 && results.every((result) => result.pass);
}

export function evaluateKnowledgeContracts({
  knowledgeBank,
  rubric,
  operatorLedger,
  repoRoot
}) {
  const sourceIds = new Set(knowledgeBank.sources.map((item) => item.id));
  const claimIds = new Set(knowledgeBank.claims.map((item) => item.id));
  const candidateIds = new Set(
    knowledgeBank.candidateClaims.map((item) => item.id)
  );
  const promotionByCandidate = new Map(
    knowledgeBank.promotions.map((item) => [item.candidateClaimId, item])
  );
  const allIntakes = [
    ...knowledgeBank.intakeItems,
    ...(operatorLedger.items ?? [])
  ];
  const reportsExist = [
    "scripts/report-knowledge-lifecycle.mjs",
    "docs/qa/application-outcomes-M.md"
  ].every((relativePath) => existsSync(path.join(repoRoot, relativePath)));

  const results = [
    {
      id: "KB-001",
      pass:
        allIntakes.length ===
          new Set(allIntakes.map((item) => item.id)).size &&
        allIntakes.every(
          (item) =>
            hasStableId(item.id) &&
            ["public", "public-safe", "protected"].includes(item.visibility) &&
            typeof item.status === "string" &&
            Boolean(item.disposition?.trim()) &&
            Array.isArray(item.linkedRecordIds) &&
            (item.status !== "processed" || item.linkedRecordIds.length > 0) &&
            !(item.visibility === "protected" && item.sourceUrl)
        )
    },
    {
      id: "KB-002",
      pass: knowledgeBank.sources.every(
        (source) =>
          hasStableId(source.id) &&
          Boolean(source.publicCitation?.trim()) &&
          Boolean(source.preservationStatus) &&
          Array.isArray(source.doesNotEstablish) &&
          !(
            source.visibility !== "public" &&
            (source.canonicalUrl || source.archiveUrl || source.assetUrl)
          ) &&
          (!source.media || Boolean(source.media.publicDisplayStatus))
      )
    },
    {
      id: "KB-003",
      pass:
        knowledgeBank.sourceReadings.length > 0 &&
        knowledgeBank.sourceReadings.every(
          (reading) =>
            sourceIds.has(reading.sourceId) &&
            reading.assertions.length > 0 &&
            reading.assertions.every(
              (assertion) =>
                hasStableId(assertion.id) &&
                Boolean(assertion.statement?.trim()) &&
                ["high", "moderate", "limited"].includes(
                  assertion.confidence
                ) &&
                typeof assertion.publicSafe === "boolean"
            ) &&
            reading.limitations.length > 0
        )
    },
    {
      id: "KB-004",
      pass:
        knowledgeBank.candidateClaims.every((candidate) => {
          const promotion = promotionByCandidate.get(candidate.id);
          if (candidate.status === "promoted") {
            return Boolean(
              candidate.promotedClaimId &&
                claimIds.has(candidate.promotedClaimId) &&
                promotion?.decision === "promoted" &&
                (promotion.claimId ?? promotion.promotedClaimId) ===
                  candidate.promotedClaimId
            );
          }
          return !candidate.promotedClaimId && promotion?.decision !== "promoted";
        }) &&
        knowledgeBank.promotions.every((promotion) =>
          candidateIds.has(promotion.candidateClaimId)
        )
    },
    {
      id: "KB-005",
      pass:
        rubric.collectiveProjects.length >= 5 &&
        knowledgeBank.claims.some((claim) => claim.antiClaims.length > 0) &&
        knowledgeBank.claims.some((claim) =>
          claim.boundaries.some((boundary) =>
            /collective|sole|individual|caus/i.test(boundary)
          )
        ) &&
        knowledgeBank.candidateClaims.some((candidate) =>
          candidate.boundaries.some((boundary) =>
            /collective|sole|individual|caus/i.test(boundary)
          )
        )
    },
    {
      id: "KB-006",
      pass:
        knowledgeBank.corrections.every((correction) =>
          claimIds.has(correction.claimId)
        ) &&
        knowledgeBank.researchInquiries.every((inquiry) =>
          inquiry.sourceIds.every((sourceId) => sourceIds.has(sourceId))
        ) &&
        knowledgeBank.candidateClaims.some(
          (candidate) => candidate.status === "contradicted"
        ) &&
        knowledgeBank.sourceReadings.some((reading) =>
          reading.limitations.some((limitation) =>
            /conflict|contradict|negative evidence|not proof/i.test(limitation)
          )
        ) &&
        knowledgeBank.researchInquiries.some(
          (inquiry) => inquiry.resultStatus === "not-recovered"
        )
    },
    {
      id: "KB-007",
      pass:
        knowledgeBank.editorialBriefs.every(
          (brief) =>
            brief.selectedClaimIds.every((id) => claimIds.has(id)) &&
            brief.heldCandidateClaimIds.every((id) => candidateIds.has(id))
        ) &&
        knowledgeBank.claims.some((claim) =>
          claim.projections.some((projection) => projection.status === "hold")
        ) &&
        knowledgeBank.candidateClaims.some(
          (candidate) =>
            candidate.status === "promoted" &&
            !knowledgeBank.editorialBriefs.some((brief) =>
              brief.selectedClaimIds.includes(candidate.promotedClaimId)
            )
        )
    },
    {
      id: "KB-008",
      pass:
        rubric.populationBoundaryFiles.every((relativePath) =>
          existsSync(path.join(repoRoot, relativePath))
        ) &&
        knowledgeBank.researchInquiries.some(
          (inquiry) =>
            /population|timeline|archive|posts/i.test(inquiry.question) &&
            inquiry.limitations.some((limitation) =>
              /not.*census|not.*complete|delet|retriev|surviv|denominator/i.test(
                limitation
              )
            )
        )
    },
    {
      id: "KB-009",
      pass:
        knowledgeBank.discoveryNotes.some(
          (note) => note.kind === "photo-editor"
        ) &&
        knowledgeBank.discoveryNotes
          .filter((note) => note.kind === "photo-editor")
          .every(
            (note) =>
              note.rightsReviewRequired === true &&
              note.sourceIds.every((sourceId) => sourceIds.has(sourceId)) &&
              note.candidateClaimIds.every((candidateId) =>
                candidateIds.has(candidateId)
              )
          )
    },
    {
      id: "KB-010",
      pass:
        reportsExist &&
        knowledgeBank.sources.length === sourceIds.size &&
        knowledgeBank.claims.length === claimIds.size &&
        knowledgeBank.candidateClaims.length === candidateIds.size &&
        knowledgeBank.sourceReadings.length ===
          new Set(knowledgeBank.sourceReadings.map((reading) => reading.id)).size
    }
  ];

  return results.map((result) => ({
    ...result,
    criterion: rubric.criteria.find((criterion) => criterion.id === result.id)
      ?.criterion
  }));
}

export function evaluateBlindSpotControls({
  rubric,
  controlPlane,
  protocolTexts
}) {
  const combined = Object.values(protocolTexts).join("\n");
  const criterionById = new Map(
    rubric.criteria.map((criterion) => [criterion.id, criterion])
  );
  const requiredIds = Array.from({ length: 8 }, (_, index) =>
    `BS-${String(index + 1).padStart(3, "0")}`
  );
  const authorityIds = new Set(
    controlPlane.authorities.map((authority) => authority.id)
  );

  const checks = {
    "BS-001":
      /three unfamiliar readers/i.test(combined) &&
      /pending-human-review/i.test(combined) &&
      /exact candidate/i.test(combined),
    "BS-002":
      /silence is not approval/i.test(combined) &&
      /collaborator/i.test(combined),
    "BS-003":
      /countability bias|offline, relational, maintenance/i.test(combined),
    "BS-004": /mosaic privacy/i.test(combined) && /whole-graph/i.test(combined),
    "BS-005":
      authorityIds.has("deterministic-checker") &&
      authorityIds.has("read-only-model-grader") &&
      authorityIds.has("human-reviewer") &&
      /authoring agent.*independent/i.test(combined),
    "BS-006":
      /application and referral outcomes/i.test(combined) &&
      /private, aggregate/i.test(combined),
    "BS-007":
      /rubric hash/i.test(combined) &&
      /candidate content hash/i.test(combined) &&
      /drift/i.test(combined),
    "BS-008":
      /five dated real job descriptions/i.test(combined) &&
      /pending-real-job-review/i.test(combined)
  };

  return requiredIds.map((id) => {
    const criterion = criterionById.get(id);
    return {
      id,
      pass: Boolean(
        criterion &&
          ["controlled", "controlled-open"].includes(
            criterion.controlState
          ) &&
          criterion.outcomeState &&
          criterion.blockingLevel &&
          criterion.criterion?.trim() &&
          checks[id]
      ),
      criterion: criterion?.criterion
    };
  });
}

export function readJson(repoRoot, relativePath) {
  return JSON.parse(readFileSync(path.join(repoRoot, relativePath), "utf8"));
}
