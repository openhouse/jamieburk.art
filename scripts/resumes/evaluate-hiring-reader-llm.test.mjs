import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";

import { evaluateHiringReaderLlm } from "./evaluate-hiring-reader-llm.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const config = JSON.parse(
  readFileSync(path.join(repoRoot, "evals/resumes/public-resume-selection.json"), "utf8")
);
const run = JSON.parse(
  readFileSync(path.join(repoRoot, config.modelGate.currentRunPath), "utf8")
);

test("the lifecycle-selected public resume clears every current model reader gate", () => {
  const result = evaluateHiringReaderLlm();
  assert.equal(result.overall, "pass", JSON.stringify(result, null, 2));
  assert.equal(result.summary.plannedModelCalls, 2);
  assert.equal(result.summary.passingModelResults, 2);
  assert.equal(result.summary.deterministicReaderCallsSkipped, 14);
  assert.equal(result.actualPeopleParticipated, false);
});

test("a stale resume hash invalidates the cached result", () => {
  const mutation = structuredClone(run);
  mutation.results[0].resumeSha256 = "0".repeat(64);
  const result = evaluateHiringReaderLlm({ recordedRun: mutation });
  assert.equal(result.overall, "fail");
  assert.ok(result.results[0].errors.includes("resume-hash-mismatch"));
});

test("an unplanned reader result cannot consume or satisfy the gate", () => {
  const mutation = structuredClone(run);
  mutation.results[0].cacheKey = mutation.results[0].cacheKey.replace(
    "oti-product-luke-farrell",
    "unplanned-reader"
  );
  const result = evaluateHiringReaderLlm({ recordedRun: mutation });
  assert.equal(result.overall, "fail");
  assert.equal(
    result.checks.find((check) => check.id === "no-model-work-for-deterministically-skipped-readers")?.pass,
    false
  );
});

test("the pass cannot be recorded as actual participation or a final hire", () => {
  const mutation = structuredClone(run);
  mutation.results[0].actualPersonParticipated = true;
  const result = evaluateHiringReaderLlm({ recordedRun: mutation });
  assert.equal(result.overall, "fail");
  assert.ok(result.results[0].errors.includes("actual-person-boundary-failed"));
  assert.equal(result.decision, "do-not-advance");
});
