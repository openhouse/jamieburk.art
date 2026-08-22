import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import path from "node:path";
import test from "node:test";

const repoRoot = path.resolve(import.meta.dirname, "../..");

test("the exact colophon passes only after all three simulated editorial owners accept it", () => {
  const result = spawnSync(
    process.execPath,
    ["scripts/evals-colophon-page-owners.mjs"],
    { cwd: repoRoot, encoding: "utf8" }
  );

  assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);

  const report = JSON.parse(result.stdout);
  assert.equal(report.deterministicPassed, true, report.failures.join("\n"));
  assert.equal(report.allOwnersAccepted, true, report.failures.join("\n"));
  assert.equal(report.passed, true, report.failures.join("\n"));
  assert.deepEqual(report.ownerIds, [
    "mandy-brown-editorial-practice",
    "mindy-seu-networked-archive",
    "ethan-marcotte-resilient-web"
  ]);
});
