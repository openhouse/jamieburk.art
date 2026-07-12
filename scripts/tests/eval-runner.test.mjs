import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const runnerPath = path.join(repoRoot, "scripts/eval-portfolio-readiness.mjs");
const tempDir = mkdtempSync(path.join(tmpdir(), "chad-lens-eval-test-"));

const dimensions = {
  actorLegibility: "Jamie and the action are explicit.",
  towardWhatEnd: "The practical end is explicit.",
  usableResult: "The user capability is explicit.",
  onePassTranslation: "Specialized work is translated.",
  readerBurden: "The strongest proof comes first.",
  collectivePrecision: "Shared work retains collective credit."
};

function scorecard(overrides = {}) {
  return {
    evalId: "chad-lens-v1",
    evaluatedAt: "2026-07-12T00:00:00Z",
    evaluator: "Eval runner test",
    revision: "test",
    pagesReviewed: ["/", "/resume", "/work/technical-operations", "/work/harry-j-epstein", "/work/callnyc", "/work/fair-rent-nyc"],
    criteria: [{
      id: "chad-lens",
      score: 4,
      confidence: "high",
      dimensionFindings: dimensions,
      evidence: ["actor", "end", "result", "translation", "burden", "credit"],
      mostImportantFailure: null,
      repair: "Retain the current bounded wording.",
      repairLayer: ["none"],
      antiGamingCheck: "Complete sentences, not keyword presence, support the score."
    }],
    releaseRecommendation: "criterion-met",
    ...overrides
  };
}

function evaluate(name, value) {
  const scorecardPath = path.join(tempDir, `${name}.json`);
  writeFileSync(scorecardPath, `${JSON.stringify(value)}\n`);
  const result = spawnSync(process.execPath, [
    runnerPath,
    "--rubric", "evals/chad-lens/rubric.json",
    "--profile", "fast",
    "--skip-commands",
    "--scorecard", scorecardPath,
    "--json"
  ], { cwd: repoRoot, encoding: "utf8" });

  assert.equal(result.status, 1, "skipped deterministic gates must fail closed");
  return JSON.parse(result.stdout);
}

test("criterion-met recommendation can pass scorecard validation", () => {
  const report = evaluate("criterion-met", scorecard());
  assert.equal(report.scorecard.passed, true);
  assert.deepEqual(report.scorecard.errors, []);
});

test("iterate recommendation cannot satisfy the scorecard", () => {
  const report = evaluate("iterate", scorecard({ releaseRecommendation: "iterate" }));
  assert.equal(report.scorecard.passed, false);
});

test("every Chad Lens dimension is required", () => {
  const incompleteDimensions = { ...dimensions };
  delete incompleteDimensions.usableResult;
  const value = scorecard();
  value.criteria[0].dimensionFindings = incompleteDimensions;
  const report = evaluate("missing-dimension", value);
  assert.equal(report.scorecard.passed, false);
  assert.match(report.scorecard.errors.join("\n"), /dimensionFindings\.usableResult/);
});
