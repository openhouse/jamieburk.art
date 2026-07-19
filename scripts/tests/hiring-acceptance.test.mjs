import assert from "node:assert/strict";
import test from "node:test";
import {
  buildGapResolverInput,
  buildHiringEvaluatorInput,
  discoveryRanking,
  evaluationFingerprints,
  inspectHiringAcceptance,
  loadHiringAcceptance,
  publicInputLeaks,
  runMutationFixtures
} from "../lib/hiring-acceptance.mjs";

const bundle = loadHiringAcceptance();

test("six Tier 1 opportunities are governed and fresh", () => {
  const inspection = inspectHiringAcceptance(bundle, { today: "2026-07-18" });
  assert.equal(bundle.opportunities.length, 6);
  assert.equal(inspection.gates.find((gate) => gate.id === "tier-one-records").status, "pass");
  assert.equal(inspection.gates.find((gate) => gate.id === "opportunity-freshness").status, "pass");
});

test("hiring evaluator input excludes Wiki gap evidence", () => {
  const input = buildHiringEvaluatorInput({
    opportunity: bundle.opportunities[0],
    reader: bundle.readers[0],
    routes: bundle.suite.routes
  });
  assert.deepEqual(publicInputLeaks(input), []);
  assert.equal(JSON.stringify(input).includes("wikiEvidence"), false);
  assert.equal(JSON.stringify(input).includes("nextAction"), false);
});

test("gap resolver receives public-safe Wiki metadata only after hiring review", () => {
  const input = buildGapResolverInput({ hiringReport: { decision: "hold" }, opportunity: bundle.opportunities[0], wiki: bundle.wiki });
  assert.ok(input.publicSafeWiki.length > 0);
  assert.equal(input.hiringReport.decision, "hold");
  assert.ok(input.roleRequirements.some((requirement) => requirement.wikiEvidence.length));
});

test("reader profiles preserve explicit simulation disclaimers and holdout separation", () => {
  assert.ok(bundle.readers.length >= 9);
  assert.ok(bundle.readers.every((reader) => /not actual|not an actual/i.test(reader.disclaimer)));
  assert.deepEqual(bundle.suite.developmentReaderIds.filter((id) => bundle.suite.holdoutReaderIds.includes(id)), []);
});

test("title-blind discovery ranks every target above negative controls", () => {
  const ranking = discoveryRanking(bundle.opportunities, bundle.suite);
  const targetScores = ranking.filter((item) => item.candidateType === "target").map((item) => item.score);
  const negativeScores = ranking.filter((item) => item.candidateType === "negative").map((item) => item.score);
  assert.ok(Math.min(...targetScores) > Math.max(...negativeScores), JSON.stringify(ranking, null, 2));
});

test("all mutation fixtures produce their intended failure signal", () => {
  const results = runMutationFixtures(bundle);
  assert.equal(results.length, 13);
  assert.deepEqual(results.filter((item) => !item.detected), []);
});

test("candidate, role, reader, prompt, and contract fingerprints are explicit", () => {
  const fingerprints = evaluationFingerprints(bundle);
  for (const [key, value] of Object.entries(fingerprints)) {
    assert.ok(value && value !== "sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", `${key} missing`);
  }
});

test("hard screens remain visible without becoming public applicant disclosures", () => {
  const codePath = bundle.opportunities.find((item) => item.id.includes("codepath"));
  const authorization = codePath.roleRequirements.find((item) => item.id === "codepath.us-work-authorization");
  assert.equal(authorization.coverageStatus, "unknown");
  assert.equal(authorization.gapType, "protected-applicant-fact");
  assert.match(authorization.nextAction, /privately/i);
});
