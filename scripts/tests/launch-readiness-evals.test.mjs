import assert from "node:assert/strict";
import test from "node:test";
import {
  compareObjective,
  evaluateSourceChecks,
  loadSuite,
  scoreAssessment,
  validateSuite
} from "../evals/lib/launch-readiness.mjs";

const suite = loadSuite();

test("launch-readiness contract is internally consistent", () => {
  assert.deepEqual(validateSuite(suite), []);
  assert.equal(
    suite.judgeCriteria.reduce((sum, criterion) => sum + criterion.weight, 0),
    100
  );
  assert.ok(suite.humanGates.every((gate) => gate.agentMaySelfCertify === false));
});

test("source evaluator covers every declared source criterion", () => {
  const report = evaluateSourceChecks({ suite });
  assert.deepEqual(
    report.results.map((item) => item.id).sort(),
    suite.sourceChecks.map((item) => item.id).sort()
  );
  assert.equal(
    report.summary.hardGateTotal,
    suite.sourceChecks.filter((item) => item.kind === "hard-gate").length
  );
});

function completeAssessment({ verifier = "Jamie Burkart", score = 4 } = {}) {
  return {
    suiteId: suite.id,
    suiteVersion: suite.version,
    judge: {
      model: "independent-eval-model",
      independentPass: true,
      scores: suite.judgeCriteria.map((criterion) => ({
        criterionId: criterion.id,
        score,
        evidence: ["/ route observation", `${criterion.id} knowledge-bank observation`]
      }))
    },
    humanGates: suite.humanGates.map((gate) => ({
      gateId: gate.id,
      status: "confirmed",
      verifiedBy: verifier
    }))
  };
}

test("a complete independently evidenced assessment reaches 100", () => {
  const scored = scoreAssessment(completeAssessment(), suite);
  assert.equal(scored.valid, true);
  assert.equal(scored.weightedJudgeScore, 100);
  assert.equal(scored.judgeThresholdMet, true);
  assert.deepEqual(scored.pendingHumanGates, []);
});

test("an LLM cannot self-certify human approval", () => {
  const scored = scoreAssessment(completeAssessment({ verifier: "Codex agent" }), suite);
  assert.equal(scored.valid, false);
  assert.equal(scored.pendingHumanGates.length, suite.humanGates.length);
  assert.ok(scored.failures.every((failure) => /named human owner/.test(failure)));
});

test("objective comparison accepts only lexicographic improvement", () => {
  const before = {
    summary: {
      hardGateFailures: 2,
      judgeFloorFailures: ["visual-proof"],
      weightedJudgeScore: 70,
      qualityTargetGaps: 2
    }
  };
  const after = {
    summary: {
      hardGateFailures: 1,
      judgeFloorFailures: ["visual-proof", "completion-confidence"],
      weightedJudgeScore: 60,
      qualityTargetGaps: 2
    }
  };
  const regression = {
    summary: {
      hardGateFailures: 3,
      judgeFloorFailures: [],
      weightedJudgeScore: 100,
      qualityTargetGaps: 0
    }
  };

  assert.equal(compareObjective(before, after).accepted, true);
  assert.equal(compareObjective(before, regression).accepted, false);
});
