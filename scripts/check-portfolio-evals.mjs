import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const evalPath = path.join(repoRoot, "evals/portfolio-claims/evals.json");
const source = readFileSync(evalPath, "utf8");
const suite = JSON.parse(source);
const failures = [];

function fail(message) {
  failures.push(message);
}

function uniqueIds(records, label) {
  const ids = records.map((record) => record.id);
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
  if (duplicates.length) {
    fail(`${label} contains duplicate IDs: ${[...new Set(duplicates)].join(", ")}`);
  }
  return new Set(ids);
}

if (suite.version !== 1) fail("Eval suite version must be 1");
if (!suite.suiteId) fail("Eval suite is missing suiteId");
if (!suite.objective) fail("Eval suite is missing objective");

for (const field of ["hardGates", "scoredCriteria", "fixtures", "loop"]) {
  if (!Array.isArray(suite[field]) || !suite[field].length) {
    fail(`Eval suite ${field} must be a non-empty array`);
  }
}

const gateIds = uniqueIds(suite.hardGates ?? [], "hardGates");
const criterionIds = uniqueIds(suite.scoredCriteria ?? [], "scoredCriteria");
const fixtureIds = uniqueIds(suite.fixtures ?? [], "fixtures");

const requiredPhotoFixtures = [
  "photo-coalition-corroboration",
  "photo-cultural-hosting-material-practice",
  "photo-source-backed-memory-vocabulary",
  "photo-unsupported-project-attribution",
  "photo-asset-publication-gate"
];

if (!gateIds.has("photo-evidence-boundary")) {
  fail("Eval suite is missing the photo-evidence-boundary hard gate");
}

for (const id of requiredPhotoFixtures) {
  if (!fixtureIds.has(id)) fail(`Eval suite is missing required photo fixture: ${id}`);
}

for (const gate of suite.hardGates ?? []) {
  if (!gate.description || !gate.passCondition) {
    fail(`${gate.id} must include description and passCondition`);
  }
  if (!Array.isArray(gate.failureExamples) || !gate.failureExamples.length) {
    fail(`${gate.id} must include failureExamples`);
  }
}

const weightTotal = (suite.scoredCriteria ?? []).reduce(
  (total, criterion) => total + criterion.weight,
  0
);

if (weightTotal !== 100) fail(`Scored criterion weights must total 100, received ${weightTotal}`);

for (const criterion of suite.scoredCriteria ?? []) {
  if (!Number.isInteger(criterion.weight) || criterion.weight <= 0) {
    fail(`${criterion.id} weight must be a positive integer`);
  }
  if (!Number.isInteger(criterion.minimumScore) || criterion.minimumScore < 1 || criterion.minimumScore > 5) {
    fail(`${criterion.id} minimumScore must be an integer from 1 to 5`);
  }
  for (const anchor of ["1", "3", "5"]) {
    if (!criterion.anchors?.[anchor]) fail(`${criterion.id} is missing score anchor ${anchor}`);
  }
}

const stop = suite.stopPolicy ?? {};
if (stop.targetWeightedScore < 0 || stop.targetWeightedScore > 100) {
  fail("stopPolicy.targetWeightedScore must be from 0 to 100");
}
if (!Number.isInteger(stop.maxIterations) || stop.maxIterations < 1) {
  fail("stopPolicy.maxIterations must be a positive integer");
}
if (!Number.isInteger(stop.requiredConsecutivePasses) || stop.requiredConsecutivePasses < 2) {
  fail("stopPolicy.requiredConsecutivePasses must be at least 2");
}
for (const id of stop.requiredPerfectCriteria ?? []) {
  if (!criterionIds.has(id)) fail(`stopPolicy references unknown criterion: ${id}`);
}

for (const fixture of suite.fixtures ?? []) {
  if (!fixture.task || !fixture.evidence || !fixture.expected) {
    fail(`${fixture.id} must include task, evidence, and expected`);
    continue;
  }
  for (const gateId of fixture.expected.requiredGates ?? []) {
    if (!gateIds.has(gateId)) fail(`${fixture.id} references unknown gate: ${gateId}`);
  }
  if (
    fixture.id.startsWith("photo-") &&
    !fixture.expected.requiredGates?.includes("photo-evidence-boundary")
  ) {
    fail(`${fixture.id} must require the photo-evidence-boundary hard gate`);
  }
  if (!fixture.expected.mustIncludeConcepts?.length) {
    fail(`${fixture.id} must include mustIncludeConcepts`);
  }
  if (!fixture.expected.mustNotClaim?.length) {
    fail(`${fixture.id} must include mustNotClaim`);
  }
}

const publicationFixture = (suite.fixtures ?? []).find(
  (fixture) => fixture.id === "photo-asset-publication-gate"
);
if ((publicationFixture?.evidence?.requiredAssetChecks?.length ?? 0) < 8) {
  fail("photo-asset-publication-gate must preserve all eight asset-specific checks");
}

if (/\/Users\/|\/Volumes\/|Mobile Documents|supporting-materials|file:\/\/|\.photoslibrary/i.test(source)) {
  fail("Eval suite contains a private filesystem or source path");
}

const runsRoot = path.join(repoRoot, "evals/portfolio-claims/runs");
if (existsSync(runsRoot)) {
  for (const runName of readdirSync(runsRoot)) {
    const resultPath = path.join(runsRoot, runName, "result.json");
    if (!existsSync(resultPath)) continue;

    let result;
    const resultSource = readFileSync(resultPath, "utf8");
    try {
      result = JSON.parse(resultSource);
    } catch (error) {
      fail(`${runName}/result.json is not valid JSON: ${error.message}`);
      continue;
    }

    if (result.suiteId !== suite.suiteId) {
      fail(`${runName} references the wrong suiteId`);
    }
    if (result.version !== 1) {
      fail(`${runName} result version must be 1`);
    }
    if (!Number.isInteger(result.iterations) || result.iterations < 1 || result.iterations > stop.maxIterations) {
      fail(`${runName} iterations must be from 1 to ${stop.maxIterations}`);
    }
    if (result.summary?.fixtures !== fixtureIds.size || result.fixtures?.length !== fixtureIds.size) {
      fail(`${runName} must record all ${fixtureIds.size} fixtures`);
    }
    if ((result.summary?.unresolved ?? 0) > 0 && result.status !== "incomplete") {
      fail(`${runName} has unresolved fixtures and must be incomplete`);
    }
    if (result.status === "incomplete" && !result.unresolvedCriteria?.length) {
      fail(`${runName} is incomplete but does not name unresolved criteria`);
    }

    const resultFixtureIds = uniqueIds(result.fixtures ?? [], `${runName} fixtures`);
    for (const fixtureId of fixtureIds) {
      if (!resultFixtureIds.has(fixtureId)) {
        fail(`${runName} is missing fixture ${fixtureId}`);
      }
    }

    for (const fixtureResult of result.fixtures ?? []) {
      if (!fixtureIds.has(fixtureResult.id)) {
        fail(`${runName} references unknown fixture ${fixtureResult.id}`);
      }
      if (
        fixtureResult.disposition?.startsWith("accepted") &&
        (fixtureResult.qualifyingRounds?.length ?? 0) < stop.requiredConsecutivePasses
      ) {
        fail(`${runName}/${fixtureResult.id} is accepted without enough qualifying rounds`);
      }

      const rounds = fixtureResult.qualifyingRounds ?? [];
      if (rounds.some((round) => !Number.isInteger(round) || round < 1 || round > result.iterations)) {
        fail(`${runName}/${fixtureResult.id} has a qualifying round outside the run`);
      }
      if (new Set(rounds).size !== rounds.length) {
        fail(`${runName}/${fixtureResult.id} repeats a qualifying round`);
      }
      if (
        rounds.length >= stop.requiredConsecutivePasses &&
        rounds.slice(1).some((round, index) => round !== rounds[index] + 1)
      ) {
        fail(`${runName}/${fixtureResult.id} qualifying rounds must be consecutive`);
      }

      if (result.status === "passed") {
        if (!fixtureResult.disposition?.startsWith("accepted")) {
          fail(`${runName}/${fixtureResult.id} must be accepted in a passed run`);
        }
        if (fixtureResult.acceptedIteration !== rounds[0]) {
          fail(`${runName}/${fixtureResult.id} acceptedIteration must match its first qualifying round`);
        }

        for (const judgeKey of ["evidenceJudge", "hiringReaderJudge"]) {
          const judge = fixtureResult[judgeKey];
          if (!judge) {
            fail(`${runName}/${fixtureResult.id} is missing ${judgeKey}`);
            continue;
          }
          if (judge.allHardGatesPassed !== true) {
            fail(`${runName}/${fixtureResult.id}/${judgeKey} did not pass every hard gate`);
          }
          if (judge.weightedScore < stop.targetWeightedScore) {
            fail(
              `${runName}/${fixtureResult.id}/${judgeKey} scored ${judge.weightedScore}; ` +
                `${stop.targetWeightedScore} is required`
            );
          }
          if (judge.minimumCriterionScore < stop.minimumCriterionScore) {
            fail(`${runName}/${fixtureResult.id}/${judgeKey} has a criterion below the minimum`);
          }
          if (
            stop.requiredPerfectCriteria?.includes("calibration") &&
            judge.calibration !== 5
          ) {
            fail(`${runName}/${fixtureResult.id}/${judgeKey} must score calibration 5`);
          }
          if ((judge.regressions?.length ?? 0) > stop.maxRegressions) {
            fail(`${runName}/${fixtureResult.id}/${judgeKey} exceeds the regression limit`);
          }
        }
      }
    }

    if (result.status === "passed") {
      if (result.stoppingReason !== "success-condition-reached") {
        fail(`${runName} passed without the success stopping reason`);
      }
      if ((result.unresolvedCriteria?.length ?? 0) !== 0 || result.summary?.unresolved !== 0) {
        fail(`${runName} passed but still records unresolved criteria`);
      }
      if (
        result.summary?.thresholdMet !== fixtureIds.size ||
        result.summary?.hardGateFailuresInFinalCandidates !== 0 ||
        result.summary?.acceptedDraftRegressions > stop.maxRegressions
      ) {
        fail(`${runName} passed but its summary does not satisfy the stop policy`);
      }
      if ((result.judgeRoles?.length ?? 0) < 2) {
        fail(`${runName} passed without two independent judge roles`);
      }
    }

    if (/\/Users\/|\/Volumes\/|Mobile Documents|supporting-materials|file:\/\/|\.photoslibrary/i.test(resultSource)) {
      fail(`${runName}/result.json contains a private filesystem or source path`);
    }
  }
}

if (failures.length) {
  console.error("Portfolio eval check failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(
  `Portfolio eval check passed: ${suite.hardGates.length} hard gates, ` +
    `${suite.scoredCriteria.length} scored criteria, ${suite.fixtures.length} fixtures.`
);
