import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
  validateEvidenceContracts,
  validateSuite
} from "../check-blind-spot-evals.mjs";
import { scoreRun } from "../score-blind-spot-eval-run.mjs";

const suite = JSON.parse(
  readFileSync(".agents/evals/blind-spot-readiness.json", "utf8")
);
const cloneSuite = () => structuredClone(suite);

test("canonical blind-spot suite is valid", () => {
  assert.deepEqual(validateSuite(suite).errors, []);
});

test("suite represents all seven blind spots exactly once", () => {
  assert.deepEqual(
    suite.evals.map((entry) => entry.id),
    ["BS-001", "BS-002", "BS-003", "BS-004", "BS-005", "BS-006", "BS-007"]
  );
});

test("weights must total 100", () => {
  const candidate = cloneSuite();
  candidate.evals[0].weight += 1;
  assert.match(validateSuite(candidate).errors.join("\n"), /weights must total 100/);
});

test("optimizer cannot grade its own patch", () => {
  const candidate = cloneSuite();
  candidate.optimization.optimizer_may_not_grade_own_patch = false;
  assert.match(validateSuite(candidate).errors.join("\n"), /may not grade its own patch/);
});

test("release threshold requires independent, cold-reader, live, and human validation", () => {
  const candidate = cloneSuite();
  candidate.release_readiness_thresholds.independent_holdout_required = false;
  candidate.release_readiness_thresholds.cold_reader_validation_required = false;
  candidate.release_readiness_thresholds.live_use_validation_required = false;
  candidate.release_readiness_thresholds.human_approval_required = false;
  const errors = validateSuite(candidate).errors.join("\n");
  assert.match(errors, /independent_holdout_required/);
  assert.match(errors, /cold_reader_validation_required/);
  assert.match(errors, /live_use_validation_required/);
  assert.match(errors, /human_approval_required/);
});

test("canonical blind-spot evidence contracts pass", () => {
  assert.deepEqual(validateEvidenceContracts(), []);
});

test("metric entries require definitions and anti-inferences", () => {
  const metrics = JSON.parse(
    readFileSync("docs/knowledge-bank/metric-register.json", "utf8")
  );
  metrics.items[0].definition = "";
  metrics.items[0].doNotInfer = [];
  const errors = validateEvidenceContracts({ metrics }).join("\n");
  assert.match(errors, /definition is required/);
  assert.match(errors, /doNotInfer must be non-empty/);
});

test("release cannot be marked ready while human validation remains incomplete", () => {
  const validation = JSON.parse(
    readFileSync("docs/evals/blind-spot-validation-state.json", "utf8")
  );
  validation.releaseReady = true;
  const errors = validateEvidenceContracts({ validation }).join("\n");
  assert.match(errors, /releaseReady cannot be true/);
});

function passingRun(target = "development-readiness") {
  return {
    suite_id: suite.suite_id,
    target,
    candidate_sha: "candidate123",
    rubric_sha: "rubric123",
    content_scope: ["portfolio", "knowledge-bank"],
    consecutive_passing_runs: 2,
    independent_holdout_pass: true,
    cold_reader_validation_pass: true,
    live_use_validation_pass: true,
    human_approval: {
      granted: true,
      candidate_sha: "candidate123"
    },
    results: suite.evals.map((entry) => ({
      eval_id: entry.id,
      score: 4,
      pass: true,
      evidence: ["observed evidence"],
      findings: [],
      recommended_next_move: null,
      confidence: 0.9
    }))
  };
}

test("two complete development passes are eligible", () => {
  const result = scoreRun(suite, passingRun());
  assert.equal(result.eligible, true);
  assert.equal(result.weighted_score, 1);
});

test("a failed blocker cannot be compensated by weighted strength", () => {
  const run = passingRun();
  const blocker = suite.evals.find((entry) => entry.blocking);
  const result = run.results.find((entry) => entry.eval_id === blocker.id);
  result.score = 2;
  result.pass = false;
  const scored = scoreRun(suite, run);
  assert.equal(scored.eligible, false);
  assert.match(scored.blockers.join("\n"), new RegExp(blocker.id));
});

test("release requires completed external and human evidence", () => {
  const run = passingRun("release-readiness");
  run.independent_holdout_pass = false;
  run.cold_reader_validation_pass = false;
  run.live_use_validation_pass = false;
  run.human_approval.granted = false;
  const result = scoreRun(suite, run);
  assert.equal(result.eligible, false);
  assert.match(result.blockers.join("\n"), /independent_holdout_pass/);
  assert.match(result.blockers.join("\n"), /cold_reader_validation_pass/);
  assert.match(result.blockers.join("\n"), /live_use_validation_pass/);
  assert.match(result.blockers.join("\n"), /human approval/);
});
