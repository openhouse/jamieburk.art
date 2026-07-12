import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
  assessRun,
  validateRun,
  validateSuite
} from "../check-portfolio-evals.mjs";

const suite = JSON.parse(
  readFileSync(".agents/evals/portfolio-production-readiness.json", "utf8")
);

const cloneSuite = () => structuredClone(suite);

function passingRun(mode, overrides = {}) {
  const results = suite.evals
    .filter((entry) => entry.applies_to.includes(mode))
    .map((entry) => ({
      eval_id: entry.id,
      score: 4,
      pass: true,
      evidence: [`reports/generated/portfolio-evals/${entry.id}.json`],
      findings: [],
      recommended_next_move: null,
      confidence: 0.9
    }));

  return {
    suite_id: suite.suite_id,
    suite_version: suite.version,
    mode,
    candidate_sha: "0123456789abcdef0123456789abcdef01234567",
    human_approval: true,
    results,
    ...(mode === "production_launch"
      ? {
          holdout_regression_pass: true,
          blind_reader_median: 4,
          consecutive_passing_runs: 2
        }
      : {}),
    ...overrides
  };
}

test("canonical portfolio eval suite is valid", () => {
  assert.deepEqual(validateSuite(suite).errors, []);
});

test("weights must total 100", () => {
  const candidate = cloneSuite();
  candidate.evals[0].weight += 1;
  assert.match(validateSuite(candidate).errors.join("\n"), /weights must total 100/);
});

test("application threshold cannot require an unknown eval", () => {
  const candidate = cloneSuite();
  candidate.application_share_thresholds.required_eval_ids.push("PR-999");
  assert.match(validateSuite(candidate).errors.join("\n"), /unknown eval PR-999/);
});

test("optimizer cannot grade its own patch", () => {
  const candidate = cloneSuite();
  candidate.optimization.optimizer_may_not_grade_own_patch = false;
  assert.match(validateSuite(candidate).errors.join("\n"), /may not grade its own patch/);
});

test("production requires repeat passing runs and human approval", () => {
  const candidate = cloneSuite();
  candidate.production_launch_thresholds.two_consecutive_passing_runs_required = false;
  candidate.production_launch_thresholds.human_production_approval_required = false;
  const errors = validateSuite(candidate).errors.join("\n");
  assert.match(errors, /two consecutive passing runs/);
  assert.match(errors, /human production approval/);
});

test("iteration records preserve the human-blocked stop state", () => {
  const candidate = cloneSuite();
  candidate.iteration_record_schema.allowed_decisions = ["accept", "reject"];
  assert.match(validateSuite(candidate).errors.join("\n"), /stop_human_blocked/);
});

test("application and production modes evaluate only their relevant criteria", () => {
  const application = passingRun("application_share");
  const production = passingRun("production_launch");

  assert.equal(application.results.some((result) => result.eval_id === "PR-008"), false);
  assert.equal(application.results.some((result) => result.eval_id === "PR-014"), true);
  assert.equal(production.results.some((result) => result.eval_id === "PR-008"), true);
  assert.equal(production.results.some((result) => result.eval_id === "PR-014"), false);
  assert.deepEqual(validateRun(suite, application).errors, []);
  assert.deepEqual(validateRun(suite, production).errors, []);
});

test("passing evidence reports reach their mode threshold", () => {
  assert.equal(assessRun(suite, passingRun("application_share")).status, "threshold_met");
  assert.equal(assessRun(suite, passingRun("production_launch")).status, "threshold_met");
});

test("missing human approval stops for a person instead of inviting a patch", () => {
  const assessment = assessRun(
    suite,
    passingRun("application_share", { human_approval: false })
  );
  assert.equal(assessment.status, "human_blocked");
  assert.equal(assessment.next_eval_id, null);
});

test("the highest-priority failed blocker becomes the next eval", () => {
  const run = passingRun("application_share");
  const result = run.results.find((item) => item.eval_id === "PR-001");
  result.score = 1;
  result.pass = false;
  result.findings = ["Role family was not clear in the first reading."];
  result.recommended_next_move = "Clarify the first viewport.";

  const assessment = assessRun(suite, run);
  assert.equal(assessment.status, "iterate");
  assert.equal(assessment.next_eval_id, "PR-001");
});

test("a passing result cannot hide missing evidence", () => {
  const run = passingRun("application_share");
  run.results[0].evidence = ["not_observed"];
  assert.match(validateRun(suite, run).errors.join("\n"), /cannot pass with missing evidence/);
});
