import assert from "node:assert/strict";
import test from "node:test";
import {
  evaluateSemanticGuards,
  semanticGuardFixture
} from "../lib/eval-integrity.mjs";

const attacks = [
  [
    "MUT-001-project-evidence-as-individual-role",
    { roleEvidenceScope: "project", roleClaimScope: "individual" }
  ],
  [
    "MUT-002-pending-human-review-as-complete",
    { humanReviewState: "complete", humanReviewObserved: false }
  ],
  [
    "MUT-003-protected-url-exposure",
    { protectedPublicUrl: "https://example.com/protected" }
  ],
  [
    "MUT-004-recoverable-population-as-platform-complete",
    { populationClaimScope: "platform-complete" }
  ],
  ["MUT-005-mention-as-endorsement", { engagementClaim: "endorsement" }],
  ["MUT-006-mature-claim-auto-projection", { projectionStatus: "active" }],
  [
    "MUT-007-rights-needed-as-cleared",
    { visualClaimState: "rights-cleared" }
  ],
  ["MUT-008-proposal-as-delivery", { deliveryClaim: "delivered" }],
  ["MUT-009-sequence-as-sole-causation", { causalClaim: "sole-causation" }],
  ["MUT-010-stale-rubric-hash", { receiptRubricHash: "stale" }],
  [
    "MUT-011-authoring-agent-as-independent",
    {
      judgeIdentity: "codex-author",
      judgeClass: "independent"
    }
  ],
  ["MUT-012-source-volume-as-importance", { sourceVolumeUsedAsImportance: true }]
];

test("the safe semantic fixture passes every guard", () => {
  assert.ok(evaluateSemanticGuards(semanticGuardFixture()).every((item) => item.pass));
});

for (const [id, mutation] of attacks) {
  test(`${id} is rejected`, () => {
    const candidate = { ...semanticGuardFixture(), ...mutation };
    const result = evaluateSemanticGuards(candidate).find((item) => item.id === id);
    assert.equal(result.pass, false);
  });
}
