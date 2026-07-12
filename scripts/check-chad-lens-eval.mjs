import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const evalRoot = path.join(repoRoot, "evals/chad-lens");
const evalPath = path.join(evalRoot, "eval.json");
const source = readFileSync(evalPath, "utf8");
const evalDefinition = JSON.parse(source);
const failures = [];

function fail(message) {
  failures.push(message);
}

if (evalDefinition.version !== 1) fail("Chad Lens eval version must be 1");
if (evalDefinition.evalId !== "chad-lens") fail("Chad Lens evalId must be chad-lens");
if (!evalDefinition.objective) fail("Chad Lens eval is missing its objective");

const expectedDimensions = [
  "reader-burden",
  "jamie-as-actor",
  "usable-change",
  "plain-language-translation",
  "collective-work-boundary"
];
const dimensionIds = evalDefinition.criterion?.dimensions?.map(({ id }) => id) ?? [];
for (const id of expectedDimensions) {
  if (!dimensionIds.includes(id)) fail(`Chad Lens eval is missing dimension ${id}`);
}
if (new Set(dimensionIds).size !== dimensionIds.length) {
  fail("Chad Lens eval contains duplicate dimensions");
}
if (evalDefinition.criterion?.threshold !== 5) {
  fail("Chad Lens criterion threshold must be 5");
}
for (const anchor of ["1", "3", "5"]) {
  if (!evalDefinition.criterion?.anchors?.[anchor]) {
    fail(`Chad Lens criterion is missing score anchor ${anchor}`);
  }
}

const stop = evalDefinition.stopPolicy ?? {};
if (stop.requiredConsecutivePasses < 2) {
  fail("Chad Lens eval requires at least two consecutive passes");
}
if (!Number.isInteger(stop.maxIterations) || stop.maxIterations < 1) {
  fail("Chad Lens maxIterations must be a positive integer");
}
if (!evalDefinition.fixture?.startingCandidate) {
  fail("Chad Lens fixture is missing its starting candidate");
}
if (!Number.isInteger(evalDefinition.candidateContract?.maximumWords)) {
  fail("Chad Lens eval is missing a maximumWords contract");
}
if (
  !Number.isInteger(evalDefinition.candidateContract?.maximumSentences) ||
  evalDefinition.candidateContract.maximumSentences > 4
) {
  fail("Chad Lens maximumSentences must be an integer no greater than 4");
}
if ((evalDefinition.fixture?.mustInclude?.length ?? 0) < 4) {
  fail("Chad Lens fixture must exercise every part of the lens");
}
if ((evalDefinition.fixture?.mustNotClaim?.length ?? 0) < 4) {
  fail("Chad Lens fixture must include collective-work anti-claims");
}

const privatePattern = /\/Users\/|\/Volumes\/|Mobile Documents|supporting-materials|file:\/\/|\.photoslibrary/i;
if (privatePattern.test(source)) fail("Chad Lens eval contains a private path");

const runsRoot = path.join(evalRoot, "runs");
if (existsSync(runsRoot)) {
  for (const runName of readdirSync(runsRoot)) {
    const resultPath = path.join(runsRoot, runName, "result.json");
    if (!existsSync(resultPath)) continue;
    const resultSource = readFileSync(resultPath, "utf8");
    let result;
    try {
      result = JSON.parse(resultSource);
    } catch (error) {
      fail(`${runName}/result.json is not valid JSON: ${error.message}`);
      continue;
    }

    if (result.evalId !== evalDefinition.evalId) fail(`${runName} references the wrong evalId`);
    if (!Number.isInteger(result.iterations) || result.iterations > stop.maxIterations) {
      fail(`${runName} exceeds the iteration limit`);
    }
    if (result.status === "complete") {
      if ((result.qualifyingRounds?.length ?? 0) < stop.requiredConsecutivePasses) {
        fail(`${runName} is complete without enough qualifying rounds`);
      }
      for (const judge of ["evidenceJudge", "hiringReaderJudge"]) {
        if (result.finalJudgments?.[judge]?.score !== evalDefinition.criterion.threshold) {
          fail(`${runName} is complete without a final score of 5 from ${judge}`);
        }
        if (result.finalJudgments?.[judge]?.hardGatesPass !== true) {
          fail(`${runName} is complete with a failed hard gate from ${judge}`);
        }
      }
      const wordCount = result.candidate.trim().split(/\s+/).length;
      const sentenceCount = (result.candidate.match(/[.!?](?:\s|$)/g) ?? []).length;
      if (wordCount !== result.wordCount || wordCount > evalDefinition.candidateContract.maximumWords) {
        fail(`${runName} candidate violates its word-count contract`);
      }
      if (
        sentenceCount !== result.sentenceCount ||
        sentenceCount > evalDefinition.candidateContract.maximumSentences
      ) {
        fail(`${runName} candidate violates its sentence-count contract`);
      }
    }
    if (privatePattern.test(resultSource)) fail(`${runName}/result.json contains a private path`);
  }
}

if (failures.length) {
  console.error("Chad Lens eval check failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(
  `Chad Lens eval check passed: ${dimensionIds.length} dimensions, ` +
    `${evalDefinition.hardGates.length} hard gates, threshold ${evalDefinition.criterion.threshold}.`
);
