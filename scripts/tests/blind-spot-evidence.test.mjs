import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { validateBlindSpotEvidence } from "../check-blind-spot-evidence.mjs";

const status = JSON.parse(
  readFileSync("docs/evals/blind-spot-human-status.json", "utf8")
);
const allFilesExist = () => true;

test("canonical blind-spot evidence status is valid", () => {
  assert.deepEqual(validateBlindSpotEvidence(status).errors, []);
});

test("a prepared protocol cannot masquerade as market validation", () => {
  const candidate = structuredClone(status);
  candidate.evals["PR-019"].status = "pass";
  candidate.evals["PR-019"].blockingReason = null;
  const errors = validateBlindSpotEvidence(candidate, allFilesExist).errors.join("\n");
  assert.match(errors, /exact 40-character candidate SHA/);
  assert.match(errors, /at least 3 independent reviewers/);
});

test("automated checks cannot masquerade as hands-on launch QA", () => {
  const candidate = structuredClone(status);
  candidate.evals["PR-025"].status = "pass";
  candidate.evals["PR-025"].candidateSha = "a".repeat(40);
  candidate.evals["PR-025"].reviewedAt = "2026-07-16";
  candidate.evals["PR-025"].blockingReason = null;
  const errors = validateBlindSpotEvidence(candidate, allFilesExist).errors.join("\n");
  assert.match(errors, /at least 2 independent reviewers/);
});

test("pending human work requires an explicit blocking reason", () => {
  const candidate = structuredClone(status);
  candidate.evals["PR-019"].blockingReason = "";
  assert.match(
    validateBlindSpotEvidence(candidate, allFilesExist).errors.join("\n"),
    /pending status requires a blocking reason/
  );
});
