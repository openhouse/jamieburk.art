import assert from "node:assert/strict";
import test from "node:test";
import {
  loadLaunchEvalSuite,
  runSourceChecks,
  scoreJudgeResults,
  validateLaunchEvalSuite
} from "../lib/launch-evals.mjs";

const suite = loadLaunchEvalSuite();

test("launch-readiness eval suite is structurally valid", () => {
  assert.deepEqual(validateLaunchEvalSuite(suite), []);
});

test("launch-readiness source intentions hold", () => {
  assert.deepEqual(runSourceChecks(suite), []);
});

test("a passing scorecard reaches the deterministic target", () => {
  const scores = suite.judgeCriteria.map((criterion) => ({
    criterionId: criterion.id,
    score: 5
  }));
  assert.deepEqual(scoreJudgeResults(suite, scores, true), {
    weightedScore: 5,
    missing: [],
    belowMinimum: [],
    accepted: true
  });
});

test("hard-gate failure cannot be averaged away", () => {
  const scores = suite.judgeCriteria.map((criterion) => ({
    criterionId: criterion.id,
    score: 5
  }));
  assert.equal(scoreJudgeResults(suite, scores, false).accepted, false);
});

test("one criterion below its floor rejects an otherwise strong run", () => {
  const scores = suite.judgeCriteria.map((criterion) => ({
    criterionId: criterion.id,
    score: criterion.id === "LR-JUDGE-COLLECTIVE" ? 3 : 5
  }));
  const result = scoreJudgeResults(suite, scores, true);
  assert.equal(result.accepted, false);
  assert.deepEqual(result.belowMinimum, ["LR-JUDGE-COLLECTIVE"]);
});

test("the Chad lens is explicit and cannot be averaged away", () => {
  const chad = suite.judgeCriteria.find(
    (criterion) => criterion.id === "LR-JUDGE-CHAD"
  );
  assert.equal(chad?.minimumScore, 4);

  const scores = suite.judgeCriteria.map((criterion) => ({
    criterionId: criterion.id,
    score: criterion.id === "LR-JUDGE-CHAD" ? 3 : 5
  }));
  const result = scoreJudgeResults(suite, scores, true);
  assert.equal(result.accepted, false);
  assert.deepEqual(result.belowMinimum, ["LR-JUDGE-CHAD"]);
});
