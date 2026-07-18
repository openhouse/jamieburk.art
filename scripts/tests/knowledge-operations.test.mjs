import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

function run(script, args = []) {
  const result = spawnSync(process.execPath, [path.join(repoRoot, script), ...args], {
    cwd: repoRoot,
    encoding: "utf8"
  });
  assert.equal(result.status, 0, result.stderr || result.stdout);
  return result.stdout;
}

test("intake is dry-run first and accepts the documented public-safe interface", () => {
  const output = run("scripts/knowledge/intake.mjs", [
    "--kind", "public-url",
    "--title", "Operational test source",
    "--description", "A public-safe dry-run receipt used only to test the intake interface.",
    "--url", "https://example.org/operational-test",
    "--entity", "ENT-196-ARTISTS-RESIDENCY"
  ]);
  const parsed = JSON.parse(output);
  assert.equal(parsed.mode, "dry-run");
  assert.equal(parsed.receipt.status, "queued");
  assert.equal(parsed.receipt.title, "Operational test source");
});

test("query accepts the documented type filter and finds the projected 196 claim", () => {
  const output = run("scripts/knowledge/query.mjs", [
    "--type", "claim",
    "--project", "196-artists-residency",
    "--maturity", "projected"
  ]);
  const parsed = JSON.parse(output);
  assert.deepEqual(parsed.claims.map((claim) => claim.id), [
    "CLM-196-ARTISTS-RESIDENCY-FOUNDER-SCALE"
  ]);
});

test("knowledge report has a concise default and complete JSON mode", () => {
  const concise = run("scripts/knowledge/report.mjs");
  assert.match(concise, /Knowledge-bank health report/);
  assert.match(concise, /Queued receipts: 0/);

  const full = JSON.parse(run("scripts/knowledge/report.mjs", ["--json"]));
  assert.equal(full.counts.sources > 0, true);
  assert.equal(full.projectionDebt.length, 0);
  assert.deepEqual(full.queuedReceipts, []);
});

test("knowledge operations check rejects no canonical state in a clean queue", () => {
  const output = run("scripts/knowledge/check.mjs");
  assert.match(output, /Knowledge operations check passed/);
});
