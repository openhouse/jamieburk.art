import assert from "node:assert/strict";
import test from "node:test";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  digestJson,
  expectedUnresolvedHumanChecks,
  readJson,
  validateApplicationArgument,
  validateHumanStatus,
  validateRubric,
  validateScorecard
} from "../lib/portfolio-readiness-validation.mjs";
import { proofClaims } from "../../apps/www/src/data/proofs.ts";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const evalRoot = path.join(repoRoot, "evals/portfolio-readiness");
const rubric = readJson(path.join(evalRoot, "rubric.json"));
const humanStatus = readJson(path.join(evalRoot, "human-status.json"));
const argument = readJson(path.join(evalRoot, "application-argument.json"));

test("composite rubric is structurally valid and weights total 100", function () {
  assert.deepEqual(validateRubric(rubric), []);
  assert.equal(rubric.criteria.reduce(function (sum, item) { return sum + item.weight; }, 0), 100);
});

test("human readiness remains separate from machine readiness", function () {
  assert.deepEqual(validateHumanStatus(humanStatus, rubric), []);
  assert(expectedUnresolvedHumanChecks(humanStatus).includes("exact-candidate-share-approval"));
  assert(expectedUnresolvedHumanChecks(humanStatus).includes("hiring-reader-validation"));
});

test("application argument references canonical proof IDs", function () {
  assert.deepEqual(
    validateApplicationArgument(argument, proofClaims.map(function (claim) { return claim.id; })),
    []
  );
});

function specimen() {
  return {
    version: 1,
    evalId: rubric.id,
    runId: "specimen",
    round: 1,
    evaluatedAt: "2026-07-16T12:00:00.000Z",
    evaluator: {
      id: "independent-specimen",
      role: "hiring-and-comprehension-judge",
      kind: "llm-judge",
      provider: "test",
      model: "test",
      sessionId: "specimen-session",
      independentFromAuthor: true
    },
    candidate: {
      revision: "a".repeat(40),
      digest: "b".repeat(64)
    },
    rubricDigest: digestJson(rubric),
    criteria: rubric.criteria.map(function (criterion) {
      return {
        id: criterion.id,
        score: criterion.machineScored ? 5 : null,
        confidence: criterion.machineScored ? "high" : "not-applicable",
        evidence: criterion.machineScored
          ? [
              { path: "/", observation: "Rendered candidate observation." },
              { path: "apps/www/src/data/proofs.ts", observation: "Canonical source observation." }
            ]
          : [
              { path: "evals/portfolio-readiness/human-status.json", observation: "Deferred to the named human state." }
            ],
        hardGatePassed: criterion.machineScored ? true : null,
        repair: "No repair required in this specimen.",
        antiGamingCheck: "The specimen does not change the rubric or claim boundary."
      };
    }),
    releaseRecommendation: "system-ready",
    unresolvedHumanChecks: expectedUnresolvedHumanChecks(humanStatus)
  };
}

const context = {
  rubric,
  runId: "specimen",
  revision: "a".repeat(40),
  candidateDigest: "b".repeat(64),
  rubricDigest: digestJson(rubric),
  humanStatus
};

test("passing scorecard satisfies machine gates but not human states", function () {
  const result = validateScorecard(specimen(), context);
  assert.deepEqual(result.failures, []);
  assert.equal(result.passed, true);
  assert.equal(result.weightedScore, 100);
});

test("stale candidate digest is rejected", function () {
  const scorecard = specimen();
  scorecard.candidate.digest = "c".repeat(64);
  assert(validateScorecard(scorecard, context).failures.some(function (item) {
    return item.includes("candidate digest");
  }));
});

test("a hard-gate failure cannot be averaged away", function () {
  const scorecard = specimen();
  const claim = scorecard.criteria.find(function (entry) { return entry.id === "claim-source-governance"; });
  claim.score = 3;
  claim.hardGatePassed = false;
  const result = validateScorecard(scorecard, context);
  assert.equal(result.passed, false);
  assert(result.hardGateFailures.includes("claim-source-governance"));
});

test("human criteria cannot be machine scored", function () {
  const scorecard = specimen();
  const human = scorecard.criteria.find(function (entry) { return entry.id === "exact-candidate-approval"; });
  human.score = 5;
  assert(validateScorecard(scorecard, context).failures.some(function (item) {
    return item.includes("defer its score");
  }));
});

test("private paths in judge evidence are rejected", function () {
  const scorecard = specimen();
  scorecard.criteria[0].evidence[0].path = "/Users/example/private.txt";
  assert(validateScorecard(scorecard, context).failures.some(function (item) {
    return item.includes("unsafe");
  }));
});

test("an LLM cannot grant application or production readiness", function () {
  const scorecard = specimen();
  scorecard.releaseRecommendation = "production-ready";
  assert(validateScorecard(scorecard, context).failures.some(function (item) {
    return item.includes("cannot grant");
  }));
});

