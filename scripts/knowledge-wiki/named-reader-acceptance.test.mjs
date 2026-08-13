import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { validateNamedReaderAcceptance } from "./named-reader-acceptance-lib.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const config = JSON.parse(
  readFileSync(path.join(repoRoot, "evals/knowledge-wiki/named-reader-acceptance.json"), "utf8")
);
const run = JSON.parse(readFileSync(path.join(repoRoot, config.currentRunPath), "utf8"));

test("current named-reader receipt is coherent and honestly failing", () => {
  const result = validateNamedReaderAcceptance(repoRoot, { config, run });
  assert.deepEqual(result.issues, []);
  assert.equal(result.summary.overall, "fail");
  assert.equal(result.summary.passedPairCount, 1);
});

test("named-reader receipt rejects false participation and missing coverage", () => {
  const mutated = structuredClone(run);
  mutated.actualPeopleParticipated = true;
  mutated.results = mutated.results.slice(1);
  const result = validateNamedReaderAcceptance(repoRoot, { config, run: mutated });
  assert.ok(result.issues.some((issue) => issue.includes("did not participate")));
  assert.ok(result.issues.some((issue) => issue.includes("Missing result")));
});

test("named-reader receipt rejects a false overall pass", () => {
  const mutated = structuredClone(run);
  mutated.overall = "pass";
  const result = validateNamedReaderAcceptance(repoRoot, { config, run: mutated });
  assert.ok(result.issues.some((issue) => issue.includes("Overall gate result")));
});
