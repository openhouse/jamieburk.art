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
