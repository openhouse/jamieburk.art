import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { evaluateCoverLetterHiringReaderLlm } from "./evaluate-hiring-reader-llm.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const config = JSON.parse(readFileSync(path.join(repoRoot, "evals/cover-letters/hiring-reader-portfolio.json"), "utf8"));
const run = JSON.parse(readFileSync(path.join(repoRoot, config.modelGate.currentRunPath), "utf8"));

test("the selected cover letter clears every current named-reader model gate", () => {
  const result = evaluateCoverLetterHiringReaderLlm();
  assert.equal(result.overall, "pass", JSON.stringify(result, null, 2));
  assert.equal(result.summary.plannedModelCalls, 2);
  assert.equal(result.summary.passingModelResults, 2);
  assert.equal(result.summary.deterministicReaderCallsSkipped, 14);
  assert.equal(result.actualPeopleParticipated, false);
});

test("a stale letter hash invalidates the cached reader result", () => {
  const mutation = structuredClone(run);
  mutation.results[0].coverLetterSha256 = "0".repeat(64);
  const result = evaluateCoverLetterHiringReaderLlm({ recordedRun: mutation });
  assert.equal(result.overall, "fail");
  assert.ok(result.results[0].errors.includes("coverLetterSha256-mismatch"));
});

test("voice failure cannot be averaged away by an application pass", () => {
  const mutation = structuredClone(run);
  mutation.results[0].voiceFidelity.verdict = "fail";
  const result = evaluateCoverLetterHiringReaderLlm({ recordedRun: mutation });
  assert.equal(result.overall, "fail");
  assert.ok(result.results[0].errors.includes("voice-verdict-failed"));
});

test("actual named-person participation cannot be fabricated", () => {
  const mutation = structuredClone(run);
  mutation.results[0].actualPersonParticipated = true;
  const result = evaluateCoverLetterHiringReaderLlm({ recordedRun: mutation });
  assert.equal(result.overall, "fail");
  assert.ok(result.results[0].errors.includes("actual-person-boundary-failed"));
});
