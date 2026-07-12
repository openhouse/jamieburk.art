import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { validateSuite } from "../check-portfolio-evals.mjs";

const suite = JSON.parse(
  readFileSync(".agents/evals/portfolio-production-readiness.json", "utf8")
);

const cloneSuite = () => structuredClone(suite);

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

test("readiness profiles reject unknown or duplicate included evals", () => {
  const candidate = cloneSuite();
  candidate.application_share_thresholds.included_eval_ids.push("PR-001", "PR-999");
  const errors = validateSuite(candidate).errors.join("\n");
  assert.match(errors, /must not contain duplicates/);
  assert.match(errors, /included_eval_ids contains unknown eval PR-999/);
});

test("required evals must be included in their readiness profile", () => {
  const candidate = cloneSuite();
  candidate.application_share_thresholds.included_eval_ids =
    candidate.application_share_thresholds.included_eval_ids.filter(
      (id) => id !== "PR-001"
    );
  assert.match(
    validateSuite(candidate).errors.join("\n"),
    /required_eval_ids contains excluded eval PR-001/
  );
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
