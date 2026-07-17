import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFileSync, unlinkSync, writeFileSync } from "node:fs";
import test from "node:test";
import { validateCompositeSuite } from "../check-composite-integration-evals.mjs";

const suite = JSON.parse(readFileSync(".agents/evals/composite-integration.json", "utf8"));

test("canonical composite suite is valid", () => {
  assert.deepEqual(validateCompositeSuite(suite).errors, []);
});

test("composite suite inherits rather than duplicates canonical KD and PR suites", () => {
  assert.deepEqual(suite.inherited_suites, [
    ".agents/evals/knowledge-development.json",
    ".agents/evals/portfolio-production-readiness.json",
  ]);
  assert.ok(suite.evals.every((entry) => entry.id.startsWith("CI-")));
});

test("composite weights total 100 and complete readiness requires repeat runs", () => {
  assert.equal(suite.evals.reduce((sum, entry) => sum + entry.weight, 0), 100);
  assert.equal(suite.thresholds.two_consecutive_passing_runs_required, true);
  assert.equal(suite.thresholds.weighted_score_minimum, 0.9);
});

test("external criteria cannot be satisfied by the optimizing agent", () => {
  const external = suite.evals.filter((entry) => entry.external_judgment_required);
  assert.deepEqual(external.map((entry) => entry.id), ["CI-007", "CI-008", "CI-009", "CI-012"]);
  assert.equal(suite.optimization.optimizer_may_not_grade_own_patch, true);
});

test("complete gate fails honestly while external and human judgments are absent", () => {
  const result = spawnSync(process.execPath, ["scripts/run-composite-integration.mjs", "--require-pass"], { encoding: "utf8", maxBuffer: 20_000_000 });
  assert.notEqual(result.status, 0);
  const report = JSON.parse(result.stdout);
  assert.equal(report.criteria_met, false);
  assert.ok(report.missing_judgments.includes("CI-012"));
});

test("stale candidate judgments are rejected", () => {
  const directory = process.env.TMPDIR ?? "/tmp";
  const judgmentPath = `${directory}/composite-stale-judgment-${process.pid}.json`;
  const payload = {
    candidate_fingerprint: "stale",
    rubric_fingerprint: "stale",
    judgments: [{ eval_id: "CI-007", score: 4, pass: true, reviewer_role: "holdout", evidence: ["bounded review"] }],
  };
  writeFileSync(judgmentPath, `${JSON.stringify(payload)}\n`);
  try {
    const result = spawnSync(process.execPath, ["scripts/run-composite-integration.mjs", "--judgments", judgmentPath], { encoding: "utf8", maxBuffer: 20_000_000 });
    assert.equal(result.status, 0);
    const report = JSON.parse(result.stdout);
    assert.match(report.judgment_errors.join("\n"), /stale or missing/);
    assert.ok(report.missing_judgments.includes("CI-007"));
  } finally {
    unlinkSync(judgmentPath);
  }
});
