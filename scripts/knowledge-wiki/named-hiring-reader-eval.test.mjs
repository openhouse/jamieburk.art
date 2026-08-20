import assert from "node:assert/strict";
import test from "node:test";

import {
  loadNamedHiringRun,
  loadNamedHiringSuite,
  validateNamedHiringRun
} from "./named-hiring-reader-eval.mjs";

function clone(value) {
  return structuredClone(value);
}

test("latest named hiring-reader run is structurally valid and preserves the strict verdict", () => {
  const suite = loadNamedHiringSuite();
  const run = loadNamedHiringRun();
  const validation = validateNamedHiringRun({ suite, run });
  assert.deepEqual(validation.issues, []);
  assert.equal(validation.summary.evaluationCount, 8);
  assert.equal(validation.summary.liveEvaluationCount, 8);
  assert.equal(validation.summary.suiteVerdict, run.failCount === 0 ? "pass" : "fail");
});

test("missing reader decisions fail closed", () => {
  const suite = loadNamedHiringSuite();
  const run = clone(loadNamedHiringRun());
  run.results.pop();
  const validation = validateNamedHiringRun({ suite, run });
  assert.ok(validation.issues.some((issue) => issue.includes("exactly one result")));
  assert.ok(validation.issues.some((issue) => issue.includes("missing a selected opportunity-reader gate")));
});

test("a verdict cannot contradict the acceptance statement", () => {
  const suite = loadNamedHiringSuite();
  const run = clone(loadNamedHiringRun());
  run.results[0].verdict = "pass";
  const validation = validateNamedHiringRun({ suite, run });
  assert.ok(validation.issues.some((issue) => issue.includes("acceptance statement contradicts verdict")));
  assert.ok(validation.issues.some((issue) => issue.includes("pass count is stale")));
});

test("protected local paths are rejected from public-reader evidence", () => {
  const suite = loadNamedHiringSuite();
  const run = clone(loadNamedHiringRun());
  run.results[0].primaryBlocker = "/Users/example/private-evidence";
  const validation = validateNamedHiringRun({ suite, run });
  assert.ok(validation.issues.some((issue) => issue.includes("protected local path")));
});

test("a stale public portfolio snapshot fails closed", () => {
  const suite = loadNamedHiringSuite();
  const run = clone(loadNamedHiringRun());
  run.portfolioSnapshotHash = "0".repeat(64);
  const validation = validateNamedHiringRun({ suite, run });
  assert.ok(validation.issues.some((issue) => issue.includes("current public hiring surface")));
});

test("reader isolation and no-repository rules are invariant", () => {
  const suite = clone(loadNamedHiringSuite());
  const run = loadNamedHiringRun();
  suite.execution.priorJudgeOutputVisible = true;
  suite.execution.repositoryOrWikiAccessForJudges = true;
  const validation = validateNamedHiringRun({ suite, run });
  assert.ok(validation.issues.some((issue) => issue.includes("repository or Wiki")));
  assert.ok(validation.issues.some((issue) => issue.includes("prior judge output")));
});
