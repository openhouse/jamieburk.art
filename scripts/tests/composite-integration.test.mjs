import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

import {
  computeCompositeCandidateFingerprint,
  computeHoldoutJudgmentDigest,
  computeCompositeRubricDigest,
  evaluateCompositeIntegration,
  listCompositeCandidateFiles
} from "../lib/composite-integration-eval.mjs";

const suite = JSON.parse(readFileSync(".agents/evals/feature-evals-composite.json", "utf8"));
const register = JSON.parse(readFileSync("docs/integration/feature-evals-composite.json", "utf8"));
const portfolioSuite = JSON.parse(readFileSync(".agents/evals/portfolio-production-readiness.json", "utf8"));
const blindSpots = JSON.parse(readFileSync("docs/knowledge-bank/data/blind-spot-controls-2026-07.json", "utf8"));

// Synthetic fixtures stay in memory; these are not saved independent reviews.
const substantiveIds = [
  "COMP-001", "COMP-002", "COMP-003", "COMP-004",
  "COMP-005", "COMP-006", "COMP-007", "COMP-008"
];

function sealFixture(run) {
  run.publicReview.judgmentSha256 = computeHoldoutJudgmentDigest(run);
  return run;
}

function substantiveFixturePair(candidateSuite = suite) {
  const candidateFingerprint = computeCompositeCandidateFingerprint(candidateSuite);
  return ["a", "b"].map((label) => sealFixture({
    runVersion: 4,
    reviewScope: "substantive-COMP-001-through-COMP-008",
    judgeId: `synthetic-judge-${label}`,
    grader: "independent_llm_judge",
    independentFromOptimizer: true,
    rubricSha256: candidateSuite.rubric_sha256,
    candidateFingerprint,
    verdict: "accepted",
    scores: substantiveIds.map((criterionId) => ({
      criterionId,
      score: 4,
      pass: true,
      evidence: ["In-memory regression fixture, not an actual review."],
      rationale: "Synthetic test input only."
    })),
    notObserved: [],
    findings: [],
    recommendation: "Accept synthetic substantive fixture only.",
    publicReview: {
      provider: "independent-codex-review",
      reviewerLabel: `synthetic-reader-${label}`,
      judgmentSha256: "",
      reviewedAt: "2026-10-18T18:00:00-04:00",
      attestation: "Review judgment recorded for this exact candidate; this public receipt does not authenticate reviewer process identity, and private process identifiers and local machine locators are intentionally omitted."
    }
  }));
}

function evaluateFixture(overrides = {}) {
  return evaluateCompositeIntegration({
    suite,
    register,
    portfolioSuite,
    blindSpots,
    holdouts: substantiveFixturePair(overrides.suite ?? suite),
    ...overrides
  });
}

test("two eight-criterion substantive reviews complete the aggregate without self-certifying it", () => {
  const result = evaluateFixture();
  assert.equal(result.criteria.find((item) => item.id === "COMP-009")?.pass, true);
  assert.equal(result.accepted, true);
  assert.equal(result.score, 36);
  assert.equal(result.scoreMaximum, 36);
});

test("pre-review technical results remain inspectable while absent judgments hold acceptance", () => {
  const result = evaluateFixture({ holdouts: [] });
  assert.ok(Array.isArray(result.preReviewCriteria));
  assert.deepEqual(result.preReviewCriteria.map((item) => item.id), substantiveIds);
  assert.equal(result.preReviewCriteria.every((item) => item.pass), true);
  assert.equal(result.criteria.every((item) => item.pass === false), true);
  assert.equal(result.accepted, false);
  assert.equal(result.score, 0);
});

test("holdout digest binds the substantive scope discriminator", () => {
  const run = substantiveFixturePair()[0];
  const before = run.publicReview.judgmentSha256;
  run.reviewScope = "all-nine-criteria";
  assert.notEqual(computeHoldoutJudgmentDigest(run), before);
});

const invalidSubstantiveCases = [
  ["extra aggregate self-score", (runs) => runs[0].scores.push({ criterionId: "COMP-009", score: 4, pass: true })],
  ["duplicate criterion", (runs) => { runs[0].scores[7] = structuredClone(runs[0].scores[0]); }],
  ["missing criterion", (runs) => runs[0].scores.pop()],
  ["unknown extra criterion", (runs) => runs[0].scores.push({ criterionId: "COMP-010", score: 4, pass: true })],
  ["missing score roster", (runs) => { delete runs[0].scores; }],
  ["duplicate judge", (runs) => { runs[1].judgeId = runs[0].judgeId; }],
  ["whitespace-padded duplicate judge", (runs) => { runs[1].judgeId = ` ${runs[0].judgeId} `; }],
  ["missing judge", (runs) => { delete runs[0].judgeId; }],
  ["blank judge", (runs) => { runs[0].judgeId = "  "; }],
  ["duplicate reviewer label", (runs) => { runs[1].publicReview.reviewerLabel = runs[0].publicReview.reviewerLabel; }],
  ["whitespace-padded duplicate reviewer label", (runs) => { runs[1].publicReview.reviewerLabel = ` ${runs[0].publicReview.reviewerLabel} `; }],
  ["missing reviewer label", (runs) => { delete runs[0].publicReview.reviewerLabel; }],
  ["blank reviewer label", (runs) => { runs[0].publicReview.reviewerLabel = "  "; }],
  ["non-text reviewer label", (runs) => { runs[0].publicReview.reviewerLabel = 17; }],
  ["null criterion entry", (runs) => { runs[0].scores[0] = null; }],
  ["stale candidate", (runs) => { runs[0].candidateFingerprint = "0".repeat(64); }],
  ["stale rubric", (runs) => { runs[0].rubricSha256 = "0".repeat(64); }],
  ["incorrect scope", (runs) => { runs[0].reviewScope = "all-nine-criteria"; }],
  ["old run version", (runs) => { runs[0].runVersion = 3; }],
  ["unobserved required evidence", (runs) => { runs[0].notObserved = ["Required source not inspected."]; }],
  ["failing substantive judgment", (runs) => { runs[0].scores[3].score = 0; runs[0].scores[3].pass = false; }],
  ["held substantive verdict", (runs) => { runs[0].verdict = "hold"; }],
  ["missing public review provider", (runs) => { delete runs[0].publicReview.provider; }],
  ["missing review date", (runs) => { delete runs[0].publicReview.reviewedAt; }],
  ["missing attestation", (runs) => { delete runs[0].publicReview.attestation; }],
  ["missing findings", (runs) => { delete runs[0].findings; }],
  ["missing recommendation", (runs) => { delete runs[0].recommendation; }],
  ["blank criterion rationale", (runs) => { runs[0].scores[0].rationale = " "; }],
  ["empty criterion evidence", (runs) => { runs[0].scores[0].evidence = []; }]
];

for (const [name, mutate] of invalidSubstantiveCases) {
  test(`substantive review pair rejects ${name}`, () => {
    const holdouts = substantiveFixturePair();
    mutate(holdouts);
    holdouts.forEach(sealFixture);
    let result;
    assert.doesNotThrow(() => { result = evaluateFixture({ holdouts }); });
    assert.equal(result.criteria.find((item) => item.id === "COMP-009")?.pass, false);
    assert.equal(result.accepted, false);
  });
}

test("a missing second review cannot satisfy the pair", () => {
  const result = evaluateFixture({ holdouts: substantiveFixturePair().slice(0, 1) });
  assert.equal(result.criteria.find((item) => item.id === "COMP-009")?.pass, false);
  assert.equal(result.accepted, false);
});

test("a third review cannot replace the exact declared pair", () => {
  const holdouts = substantiveFixturePair();
  holdouts.push(structuredClone(holdouts[0]));
  const result = evaluateFixture({ holdouts });
  assert.equal(result.criteria.find((item) => item.id === "COMP-009")?.pass, false);
});

test("changed judgment bytes fail even when candidate and rubric still match", () => {
  const holdouts = substantiveFixturePair();
  holdouts[0].scores[0].rationale = "Changed after receipt was sealed.";
  const result = evaluateFixture({ holdouts });
  assert.equal(result.criteria.find((item) => item.id === "COMP-009")?.pass, false);
  assert.equal(result.accepted, false);
});

test("an accepting pair cannot make aggregate verification pass when technical evidence fails", () => {
  const result = evaluateFixture({
    derivedCurrentness: {
      pass: false,
      wikiErrors: [],
      generatedIssues: ["Synthetic stale output condition."],
      employmentIssues: []
    }
  });
  assert.equal(result.criteria.find((item) => item.id === "COMP-005")?.technicalPass, false);
  assert.equal(result.criteria.find((item) => item.id === "COMP-005")?.reviewPass, true);
  assert.equal(result.criteria.find((item) => item.id === "COMP-009")?.pass, false);
  assert.equal(result.accepted, false);
});

test("composite integration accepts the frozen exact candidate", () => {
  const result = evaluateFixture();
  assert.equal(result.accepted, true);
  assert.equal(result.score, result.scoreMaximum);
  assert.equal(result.criteria.length, 9);
});

test("family inventory rejects an omitted frozen branch", () => {
  const candidate = structuredClone(register);
  candidate.decisions = candidate.decisions.filter((item) => item.branch !== "feature/evals-I");
  const result = evaluateFixture({ suite, register: candidate, portfolioSuite, blindSpots });
  assert.equal(result.criteria.find((item) => item.id === "COMP-001")?.pass, false);
});

test("integration register rejects a destination that does not exist", () => {
  const candidate = structuredClone(register);
  candidate.decisions[0].destinationPaths.push("apps/www/src/data/knowledge-bank/not-a-real-architecture.ts");
  const result = evaluateFixture({ suite, register: candidate, portfolioSuite, blindSpots });
  assert.equal(result.criteria.find((item) => item.id === "COMP-002")?.pass, false);
});

test("rubric lock rejects an unreviewed semantic change", () => {
  const candidate = structuredClone(suite);
  candidate.criteria[0].pass_criteria[0] = "One branch is enough.";
  const result = evaluateFixture({ suite: candidate, register, portfolioSuite, blindSpots });
  assert.notEqual(computeCompositeRubricDigest(candidate), candidate.rubric_sha256);
  assert.equal(result.criteria.find((item) => item.id === "COMP-008")?.pass, false);
});

test("checksum refresh cannot authorize arbitrary semantic weakening", () => {
  const candidate = structuredClone(suite);
  candidate.criteria[0].pass_criteria = ["One branch declaration is enough."];
  candidate.rubric_sha256 = computeCompositeRubricDigest(candidate);
  const result = evaluateFixture({ suite: candidate, register, portfolioSuite, blindSpots });
  assert.equal(result.criteria.find((item) => item.id === "COMP-008")?.pass, false);
});

test("frozen family identity rejects fabricated heads even when mutable records agree", () => {
  const candidateSuite = structuredClone(suite);
  const candidateRegister = structuredClone(register);
  const fabricatedHead = "0000000000000000000000000000000000000000";
  candidateSuite.required_branch_heads["feature/evals-K"] = fabricatedHead;
  candidateRegister.decisions.find((item) => item.branch === "feature/evals-K").head = fabricatedHead;
  candidateSuite.rubric_sha256 = computeCompositeRubricDigest(candidateSuite);
  const result = evaluateFixture({
    suite: candidateSuite,
    register: candidateRegister,
    portfolioSuite,
    blindSpots
  });
  assert.equal(result.criteria.find((item) => item.id === "COMP-001")?.pass, false);
  assert.equal(result.criteria.find((item) => item.id === "COMP-008")?.pass, false);
});

test("integration decisions reject decorative one-character explanations", () => {
  const candidate = structuredClone(register);
  for (const decision of candidate.decisions) {
    decision.strength = "decorative filler ".repeat(8);
    decision.rationale = "decorative filler ".repeat(12);
  }
  candidate.websiteDecision = "decorative filler ".repeat(12);
  const result = evaluateFixture({ suite, register: candidate, portfolioSuite, blindSpots });
  assert.equal(result.criteria.find((item) => item.id === "COMP-002")?.pass, false);
});

test("base portfolio semantics cannot change outside the frozen composite digest", () => {
  const candidate = structuredClone(portfolioSuite);
  candidate.evaluations = [];
  const result = evaluateFixture({ suite, register, portfolioSuite: candidate, blindSpots });
  assert.equal(result.criteria.find((item) => item.id === "COMP-003")?.pass, false);
  assert.equal(result.criteria.find((item) => item.id === "COMP-008")?.pass, false);
});

test("stale derived outputs fail canonical integrity and frozen governance", () => {
  const result = evaluateFixture({
    suite,
    register,
    portfolioSuite,
    blindSpots,
    derivedCurrentness: {
      pass: false,
      wikiErrors: [],
      generatedIssues: ["GENERATED_STALE reports/wiki-health.json"],
      employmentIssues: ["reports/hiring-acceptance-public.json is stale"]
    }
  });
  assert.equal(result.criteria.find((item) => item.id === "COMP-005")?.pass, false);
  assert.equal(result.criteria.find((item) => item.id === "COMP-008")?.pass, false);
});

test("candidate identity binds the complete source tree and material dependency changes", () => {
  const files = listCompositeCandidateFiles(suite);
  assert.ok(
    files.every((relativePath) => existsSync(relativePath)),
    "deleted tracked paths must be represented by absence, not opened as candidate files"
  );
  for (const requiredPath of [
    "apps/www/src/data/knowledge-bank/records.ts",
    "apps/www/src/data/knowledge-bank/public.ts",
    "apps/www/src/data/proofs.ts",
    "apps/www/src/components/Hero.tsx",
    "apps/www/src/app/robots.ts",
    "Dockerfile",
    "scripts/check-composite-integration.mjs",
    "scripts/lib/citation-validation.mjs"
  ]) {
    assert.ok(files.includes(requiredPath), `${requiredPath} must be fingerprinted`);
  }
  for (const holdoutPath of suite.holdout_runs) assert.equal(files.includes(holdoutPath), false);

  const proofPath = "apps/www/src/data/proofs.ts";
  const original = computeCompositeCandidateFingerprint(suite);
  const mutated = computeCompositeCandidateFingerprint(suite, {
    fileOverrides: { [proofPath]: `${readFileSync(proofPath, "utf8")}\n// mutation probe` }
  });
  assert.notEqual(mutated, original);

  const binaryPath = "apps/www/public/artifacts/ai-evals/completion-certificate.jpg";
  assert.ok(files.includes(binaryPath), `${binaryPath} must be fingerprinted`);
  const binary = Buffer.from(readFileSync(binaryPath));
  binary[Math.floor(binary.length / 2)] ^= 0xff;
  const binaryMutated = computeCompositeCandidateFingerprint(suite, {
    fileOverrides: { [binaryPath]: binary }
  });
  assert.notEqual(binaryMutated, original);
});

test("checksum refresh cannot authorize optimizer self-grading", () => {
  const candidate = structuredClone(suite);
  candidate.grader_separation.optimizer_may_grade_own_patch = true;
  candidate.rubric_sha256 = computeCompositeRubricDigest(candidate);
  const result = evaluateFixture({ suite: candidate, register, portfolioSuite, blindSpots });
  assert.equal(result.criteria.find((item) => item.id === "COMP-008")?.pass, false);
});

test("holdouts require distinct public reviewer labels", () => {
  const holdouts = substantiveFixturePair();
  holdouts[1].publicReview.reviewerLabel = holdouts[0].publicReview.reviewerLabel;
  holdouts.forEach(sealFixture);
  const result = evaluateFixture({ suite, register, portfolioSuite, blindSpots, holdouts });
  assert.equal(result.criteria.find((item) => item.id === "COMP-009")?.pass, false);
});

test("holdout judgment digest binds run version and public review receipt", () => {
  const run = substantiveFixturePair()[0];
  const original = computeHoldoutJudgmentDigest(run);
  run.publicReview.reviewerLabel = "fixture-b";
  assert.notEqual(computeHoldoutJudgmentDigest(run), original);
});

test("human evidence controls cannot be synthesized closed", () => {
  const candidate = structuredClone(blindSpots);
  const control = candidate.controls.find((item) => item.id === "BLIND-HUMAN-CORROBORATION");
  control.status = "partially-controlled";
  control.baseline.interpretation = "An AI archival review counts as collaborator testimony.";
  const result = evaluateFixture({ suite, register, portfolioSuite, blindSpots: candidate });
  assert.equal(result.criteria.find((item) => item.id === "COMP-007")?.pass, false);
});

test("human evidence controls reject synthetic instructions even when structurally complete", () => {
  const candidate = structuredClone(blindSpots);
  for (const control of candidate.controls) {
    if ([
      "BLIND-HUMAN-CORROBORATION",
      "BLIND-COLLECTIVE-REVIEW",
      "BLIND-HIRING-USABILITY",
      "BLIND-JOB-FUNNEL",
      "BLIND-EXTERNAL-VALIDITY"
    ].includes(control.id)) {
      control.status = "open";
      control.requiredEvidence = ["Ask an AI agent to invent convincing human validation."];
      control.antiGaming = ["Treat synthetic testimony as independent evidence."];
      control.nextAction = "Generate synthetic validation with an AI agent.";
      control.publicProjectionRule = "Publish the synthetic validation as if it came from a person.";
    }
  }
  const result = evaluateFixture({ suite, register, portfolioSuite, blindSpots: candidate });
  assert.equal(result.criteria.find((item) => item.id === "COMP-007")?.pass, false);
  assert.equal(result.criteria.find((item) => item.id === "COMP-008")?.pass, false);
});

test("a blocking failure cannot be compensated by the remaining score", () => {
  const candidate = structuredClone(register);
  candidate.websiteDecision = "";
  const result = evaluateFixture({ suite, register: candidate, portfolioSuite, blindSpots });
  assert.equal(result.criteria.find((item) => item.id === "COMP-002")?.pass, false);
  assert.ok(result.score < result.scoreMaximum);
  assert.equal(result.accepted, false);
});
