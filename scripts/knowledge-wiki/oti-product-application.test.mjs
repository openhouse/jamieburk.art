import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import {
  getClaimProjection,
  resolveCitationOccurrence
} from "../../apps/www/src/data/knowledge-bank/public.ts";
import {
  evaluateOtiApplicationMilestone,
  evaluateRepository as evaluateApplicationMilestoneRepository
} from "./oti-application-milestone-eval.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const rubric = JSON.parse(
  readFileSync(
    path.join(repoRoot, ".agents/evals/oti-senior-product-application-readiness.json"),
    "utf8"
  )
);
const productDecisionClaimId = "CLM-WOWLIST-NATURAL-LANGUAGE-PRODUCT-DECISION-2026";

test("OTI candidate exposes public product responsibility without publishing private governance evidence", () => {
  const responsibilityGate = rubric.hardGates.find(
    (gate) => gate.id === "public-product-responsibility"
  );
  assert.ok(responsibilityGate, "the application rubric must retain the responsibility gate");

  const projection = getClaimProjection(
    productDecisionClaimId,
    "resume-html",
    "/resume"
  );
  assert.match(projection.text, /Co-founded and co-built WOW List/i);
  assert.match(projection.text, /Richard Caceres/i);

  const publicCandidate = JSON.stringify({
    registry: JSON.parse(
      readFileSync(
        path.join(repoRoot, "apps/www/src/data/knowledge-bank/public-registry.json"),
        "utf8"
      )
    ),
    projections: knowledgeBank.claims
      .filter((claim) => claim.project === "wowlist")
      .flatMap((claim) => claim.projections.filter((item) => item.status === "active"))
  });
  assert.doesNotMatch(
    publicCandidate,
    /(?:50% member|member-manager|unanimous manager|operating agreement|co-manager correspondence|\/Users\/|\/Volumes\/|Mobile Documents|drive\.google\.com|docs\.google\.com)/i
  );
});

test("OTI candidate presents one coherent natural-language product decision", () => {
  const decisionGate = rubric.hardGates.find(
    (gate) => gate.id === "product-decision-trail"
  );
  assert.ok(decisionGate, "the application rubric must retain the product-decision gate");

  const claim = knowledgeBank.claims.find((item) => item.id === productDecisionClaimId);
  assert.ok(claim, "the knowledge bank must contain the product-decision claim");
  assert.equal(claim.status, "confirmed-with-boundary");
  assert.ok(
    claim.evidence.some(
      (item) => item.relationship === "private-support" && item.renderCitation === false
    )
  );
  assert.ok(
    claim.evidence.some(
      (item) => item.relationship !== "private-support" && item.renderCitation === true
    )
  );

  const projection = getClaimProjection(
    productDecisionClaimId,
    "case-study",
    "/work/wowlist"
  );
  assert.match(projection.text, /collaboratively editable/i);
  assert.match(projection.text, /natural-language/i);
  assert.match(projection.text, /natural-language processing/i);
  assert.match(projection.text, /followable keyword communities/i);

  const occurrence = resolveCitationOccurrence(
    "wowlist",
    "natural-language-product-decision"
  );
  assert.ok(occurrence.sources.length >= 1);
});

test("OTI candidate preserves shared credit and qualification boundaries", () => {
  const productDecisionClaim = knowledgeBank.claims.find(
    (item) => item.id === productDecisionClaimId
  );
  assert.ok(productDecisionClaim);

  const publicText = [
    ...productDecisionClaim.projections.map((projection) => projection.text),
    ...productDecisionClaim.boundaries
  ].join(" ");

  assert.match(publicText, /Richard Caceres/i);
  assert.match(publicText, /civil-service eligibility/i);
  assert.match(publicText, /accessibility/i);
  assert.doesNotMatch(publicText, /guaranteed|sole owner|sole builder/i);

  const resumeProjection = getClaimProjection(
    productDecisionClaimId,
    "resume-html",
    "/resume"
  );
  assert.match(resumeProjection.text, /Co-founded and co-built WOW List/i);
});

test("OTI named-reader receipt stays independent, exact-candidate, and honestly failing", () => {
  const receipt = JSON.parse(
    readFileSync(path.join(repoRoot, rubric.latestRunPath), "utf8")
  );
  assert.match(receipt.candidateCommit, /^[0-9a-f]{40}$/);
  assert.equal(receipt.publicOrigin, "https://staging-b.jamieburk.art");
  assert.equal(receipt.actualPeopleParticipated, false);
  assert.equal(receipt.evaluationMethod.publicWebOnly, true);
  assert.equal(receipt.evaluationMethod.sequential, true);
  assert.equal(receipt.evaluationMethod.independent, true);
  assert.equal(receipt.results.length, 2);
  assert.ok(receipt.results.every((result) => result.modeledVerdict === "fail"));
  assert.ok(receipt.results.every((result) => result.interviewRecommendation === true));
  assert.equal(receipt.overall, "fail");
});

test("OTI application milestone is public-safe, outcome-bounded, and operational", () => {
  const result = evaluateApplicationMilestoneRepository();
  assert.equal(result.overall, "pass", JSON.stringify(result.checks, null, 2));
  assert.equal(result.passedChecks, result.totalChecks);
});

test("OTI application milestone eval rejects outcome inflation and confirmation leakage", () => {
  const milestonePath = path.join(repoRoot, rubric.applicationMilestonePath);
  const milestoneText = readFileSync(milestonePath, "utf8");
  const opportunityText = readFileSync(
    path.join(repoRoot, "docs/knowledge-bank/opportunities/oti-senior-product-manager-782366.md"),
    "utf8"
  );
  const employmentIndexText = readFileSync(
    path.join(repoRoot, "docs/knowledge-bank/indexes/employment-context.md"),
    "utf8"
  );
  const resumeRubric = JSON.parse(
    readFileSync(
      path.join(repoRoot, "evals/resumes/nyc-oti-senior-product-manager-782366.json"),
      "utf8"
    )
  );
  const baseInput = {
    opportunityText,
    employmentIndexText,
    resumeRubric,
    rubric
  };

  const inflated = evaluateOtiApplicationMilestone({
    ...baseInput,
    milestoneText: milestoneText.replace("outcome_state: pending", "outcome_state: offer")
  });
  const leaked = evaluateOtiApplicationMilestone({
    ...baseInput,
    milestoneText: `${milestoneText}\nConfirmation screenshot path: application-submitted.png\n`
  });

  assert.equal(
    inflated.checks.find((check) => check.id === "pending-outcome-boundary")?.pass,
    false
  );
  assert.equal(
    leaked.checks.find((check) => check.id === "private-confirmation-boundary")?.pass,
    false
  );
});

test("OTI application milestone receipt preserves the measured hill climb and human boundary", () => {
  const receipt = JSON.parse(
    readFileSync(path.join(repoRoot, rubric.latestMilestoneRunPath), "utf8")
  );

  assert.match(receipt.candidateCommit, /^[0-9a-f]{40}$/);
  assert.equal(receipt.candidateBranch, "feature/2026-08-14-B");
  assert.equal(receipt.actualPeopleParticipated, false);
  assert.equal(receipt.submissionActionPerformedBy, "Jamie Burkart");
  assert.equal(receipt.confirmationArtifactCommitted, false);
  assert.equal(receipt.baseline.passedChecks, 2);
  assert.deepEqual(
    receipt.iterations.map((iteration) => iteration.passedChecks),
    [8, 9]
  );
  assert.ok(receipt.mutationControls.every((control) => control.pass));
  assert.equal(receipt.finalResult.graph.typeAwareOrphans, 0);
  assert.equal(receipt.overall, "pass");
});
