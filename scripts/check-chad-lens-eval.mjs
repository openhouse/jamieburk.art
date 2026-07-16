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

const projection = evalDefinition.projectionContract ?? {};
if (!(projection.exactCandidatePaths?.length > 0)) {
  fail("Chad Lens eval must declare at least one exact candidate projection path");
}
if (!(projection.knowledgeBankClaimIds?.length > 0)) {
  fail("Chad Lens eval must declare supporting Knowledge Bank claim IDs");
}
if (!(projection.knowledgeBankPaths?.length > 0)) {
  fail("Chad Lens eval must declare Knowledge Bank paths");
}
if (!Number.isInteger(stop.maxRegressions) || stop.maxRegressions < 0) {
  fail("Chad Lens maxRegressions must be a non-negative integer");
}

const privatePattern = /\/Users\/|\/Volumes\/|Mobile Documents|supporting-materials|file:\/\/|\.photoslibrary/i;
if (privatePattern.test(source)) fail("Chad Lens eval contains a private path");

const runsRoot = path.join(evalRoot, "runs");
if (existsSync(runsRoot)) {
  const runNames = readdirSync(runsRoot);
  const latestCompleteRunName = runNames
    .filter((runName) => {
      const resultPath = path.join(runsRoot, runName, "result.json");
      if (!existsSync(resultPath)) return false;
      try {
        return JSON.parse(readFileSync(resultPath, "utf8")).status === "complete";
      } catch {
        return false;
      }
    })
    .sort()
    .at(-1);

  for (const runName of runNames) {
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
    if (
      !Number.isInteger(result.iterations) ||
      result.iterations < 1 ||
      result.iterations > stop.maxIterations
    ) {
      fail(`${runName} exceeds the iteration limit`);
    }
    if (result.rounds?.length !== result.iterations) {
      fail(`${runName} must record every iteration`);
    }
    for (const [index, round] of (result.rounds ?? []).entries()) {
      if (round.round !== index + 1) {
        fail(`${runName} round numbers must be contiguous and one-based`);
      }
    }
    if (result.status === "complete") {
      const qualifyingRounds = result.qualifyingRounds ?? [];
      if (qualifyingRounds.length < stop.requiredConsecutivePasses) {
        fail(`${runName} is complete without enough qualifying rounds`);
      }
      if (
        qualifyingRounds.slice(1).some((round, index) => round !== qualifyingRounds[index] + 1)
      ) {
        fail(`${runName} qualifying rounds must be consecutive`);
      }
      const expectedFinalRounds = Array.from(
        { length: stop.requiredConsecutivePasses },
        (_, index) => result.iterations - stop.requiredConsecutivePasses + index + 1
      );
      if (JSON.stringify(qualifyingRounds.slice(-stop.requiredConsecutivePasses)) !== JSON.stringify(expectedFinalRounds)) {
        fail(`${runName} must end with its qualifying rounds`);
      }
      for (const judge of ["evidenceJudge", "hiringReaderJudge"]) {
        if (result.finalJudgments?.[judge]?.score !== evalDefinition.criterion.threshold) {
          fail(`${runName} is complete without a final score of 5 from ${judge}`);
        }
        if (result.finalJudgments?.[judge]?.hardGatesPass !== true) {
          fail(`${runName} is complete with a failed hard gate from ${judge}`);
        }
        if (result.finalJudgments?.[judge]?.dimensionsPass !== dimensionIds.length) {
          fail(`${runName} is complete without every Chad Lens dimension passing for ${judge}`);
        }
      }
      if ((result.regressions?.length ?? 0) > stop.maxRegressions) {
        fail(`${runName} exceeds the accepted regression limit`);
      }
      for (const roundNumber of expectedFinalRounds) {
        const round = result.rounds?.[roundNumber - 1];
        if (
          round?.result !== "qualifying-pass" ||
          round.evidenceJudgeScore !== evalDefinition.criterion.threshold ||
          round.hiringReaderJudgeScore !== evalDefinition.criterion.threshold
        ) {
          fail(`${runName} round ${roundNumber} does not satisfy the qualifying-pass contract`);
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

      if (runName === latestCompleteRunName) {
        for (const relativePath of projection.exactCandidatePaths ?? []) {
          const projectionPath = path.join(repoRoot, relativePath);
          if (!existsSync(projectionPath)) {
            fail(`${runName} projection path is missing: ${relativePath}`);
            continue;
          }
          if (!readFileSync(projectionPath, "utf8").includes(result.candidate)) {
            fail(`${runName} winning candidate is not projected exactly in ${relativePath}`);
          }
        }
      }
      for (const relativePath of projection.knowledgeBankPaths ?? []) {
        const knowledgeBankPath = path.join(repoRoot, relativePath);
        if (!existsSync(knowledgeBankPath)) {
          fail(`${runName} Knowledge Bank path is missing: ${relativePath}`);
          continue;
        }
        const knowledgeBankSource = readFileSync(knowledgeBankPath, "utf8");
        for (const claimId of projection.knowledgeBankClaimIds ?? []) {
          if (!knowledgeBankSource.includes(claimId)) {
            fail(`${runName} Knowledge Bank claim ${claimId} is missing from ${relativePath}`);
          }
        }
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
