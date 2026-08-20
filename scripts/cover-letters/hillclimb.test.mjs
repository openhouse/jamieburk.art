import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const read = (relativePath) => JSON.parse(readFileSync(path.join(repoRoot, relativePath), "utf8"));
const hillclimb = read("evals/cover-letters/runs/2026-08-20-cover-letter-hillclimb.json");
const baseline = read(hillclimb.baseline.runPath);
const post = read(hillclimb.postHillclimb.runPath);

test("the bounded hill climb preserves passes while improving the shared weakness", () => {
  assert.notEqual(hillclimb.baseline.coverLetterSha256, hillclimb.postHillclimb.coverLetterSha256);
  assert.equal(baseline.results.every((result) => result.verdict === "pass" && result.voiceFidelity.verdict === "pass"), true);
  assert.equal(post.results.every((result) => result.verdict === "pass" && result.voiceFidelity.verdict === "pass"), true);
  assert.equal(post.results.every((result) => /version-one|bounded MVP|product decision|product judgment/i.test(`${result.rationale} ${result.strengths.join(" ")}`)), true);
  assert.equal(post.results.every((result) => /clearer next step|agency learning|continued ownership|carry learning forward/i.test(`${result.rationale} ${result.strengths.join(" ")} ${result.voiceFidelity.rationale}`)), true);
  assert.equal(hillclimb.decision, "keep-change");
  assert.equal(hillclimb.boundedChange.claimScopeChanged, false);
  assert.equal(hillclimb.boundedChange.newEvidenceIntroduced, false);
});
