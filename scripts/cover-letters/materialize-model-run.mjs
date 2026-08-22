import assert from "node:assert/strict";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { planCoverLetterReaderCalls } from "./plan-hiring-reader-llm.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

function option(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : null;
}

const outputPath = option("--output");
const evaluatedAt = option("--evaluated-at");
const resultArgs = process.argv.filter((argument) => argument.startsWith("--result=")).map((argument) => argument.slice("--result=".length));
assert.ok(outputPath, "--output is required");
assert.ok(evaluatedAt, "--evaluated-at is required");

const plan = planCoverLetterReaderCalls();
const callsByPair = new Map(plan.calls.map((call) => [call.readerPairId, call]));
const results = resultArgs.map((argument) => {
  const separator = argument.indexOf("=");
  assert.ok(separator > 0, `Invalid --result binding: ${argument}`);
  const pairId = argument.slice(0, separator);
  const filePath = argument.slice(separator + 1);
  const call = callsByPair.get(pairId);
  assert.ok(call, `No current planned call for ${pairId}`);
  const modelOutput = JSON.parse(readFileSync(filePath, "utf8"));
  assert.equal(modelOutput.pairId, pairId, `Model output pair mismatch for ${pairId}`);
  return {
    cacheKey: call.cacheKey,
    opportunityId: call.opportunityId,
    readerPairId: call.readerPairId,
    coverLetterSha256: call.coverLetterSha256,
    resumeSha256: call.resumeSha256,
    contextSha256: call.contextSha256,
    voiceProfileSha256: call.voiceProfileSha256,
    postingSourceReviewedAt: call.postingSourceReviewedAt,
    voiceSourceModifiedAt: call.voiceSourceModifiedAt,
    promptVersion: call.promptVersion,
    ...modelOutput
  };
});
assert.equal(results.length, plan.plannedCallCount, "Every planned call must have exactly one supplied output");

const envelope = {
  schemaVersion: 1,
  evalId: "hiring-reader-llm-cover-letters-2026-08-20",
  evaluatedAt,
  acceptanceQuestion: "Under this explicitly fictionalized public-source lens, would this role-specific cover letter, read with its sibling resume, make Jamie worth advancing to a structured interview or practical work sample for this opportunity?",
  actualPeopleParticipated: false,
  model: "gpt-5.6-sol",
  results
};
const absoluteOutput = path.join(repoRoot, outputPath);
mkdirSync(path.dirname(absoluteOutput), { recursive: true });
writeFileSync(absoluteOutput, `${JSON.stringify(envelope, null, 2)}\n`);
console.log(outputPath);
