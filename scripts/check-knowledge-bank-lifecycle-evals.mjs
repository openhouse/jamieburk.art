import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { knowledgeBank } from "../apps/www/src/data/knowledge-bank/records.ts";
import { validateKnowledgeBank } from "./lib/citation-validation.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const evalRoot = path.join(repoRoot, "evals/knowledge-bank-lifecycle");
const suiteSource = readFileSync(path.join(evalRoot, "evals.json"), "utf8");
const suite = JSON.parse(suiteSource);
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

if (suite.version !== 1) fail("Knowledge Bank lifecycle eval version must be 1");
if (suite.evalId !== "knowledge-bank-lifecycle") fail("Lifecycle evalId is invalid");
if (!suite.objective) fail("Lifecycle eval is missing its objective");

const gateIds = uniqueIds(suite.hardGates ?? [], "hardGates");
const criterionIds = uniqueIds(suite.scoredCriteria ?? [], "scoredCriteria");
const fixtureIds = uniqueIds(suite.fixtures ?? [], "fixtures");

for (const required of [
  "capture-completeness",
  "source-decomposition",
  "claim-evidence-separation",
  "status-calibration",
  "collective-credit-and-causality",
  "projection-discipline",
  "citation-contract",
  "public-safety",
  "photo-feedback-boundary"
]) {
  if (!gateIds.has(required)) fail(`Lifecycle eval is missing hard gate ${required}`);
}

for (const required of [
  "unread-public-url",
  "memory-with-partial-public-support",
  "collective-policy-outcome",
  "mature-bank-only-claim",
  "existing-site-claim-needs-sources",
  "photo-discovers-research-lead",
  "chronology-without-causality"
]) {
  if (!fixtureIds.has(required)) fail(`Lifecycle eval is missing fixture ${required}`);
}

const weightTotal = (suite.scoredCriteria ?? []).reduce(
  (total, criterion) => total + criterion.weight,
  0
);
if (weightTotal !== 100) fail(`Lifecycle criterion weights total ${weightTotal}, not 100`);
for (const criterion of suite.scoredCriteria ?? []) {
  if (!Number.isInteger(criterion.minimumScore) || criterion.minimumScore < 1 || criterion.minimumScore > 5) {
    fail(`${criterion.id} has an invalid minimum score`);
  }
  for (const anchor of ["1", "3", "5"]) {
    if (!criterion.anchors?.[anchor]) fail(`${criterion.id} is missing anchor ${anchor}`);
  }
}

const stop = suite.stopPolicy ?? {};
if (!Number.isInteger(stop.maxIterations) || stop.maxIterations < 1) {
  fail("Lifecycle maxIterations must be a positive integer");
}
if (!Number.isInteger(stop.requiredConsecutivePasses) || stop.requiredConsecutivePasses < 2) {
  fail("Lifecycle eval requires at least two consecutive passes");
}
for (const id of stop.requiredPerfectCriteria ?? []) {
  if (!criterionIds.has(id)) fail(`Lifecycle stop policy references unknown criterion ${id}`);
}

for (const fixture of suite.fixtures ?? []) {
  if (!fixture.task || !fixture.mustDo?.length || !fixture.mustNotDo?.length) {
    fail(`${fixture.id} must include task, mustDo, and mustNotDo`);
  }
}

for (const error of validateKnowledgeBank({ includePublicFiles: false })) {
  fail(`Knowledge Bank graph: ${error}`);
}

const intakeById = new Map(knowledgeBank.intakeRecords.map((item) => [item.id, item]));
const sourceById = new Map(knowledgeBank.sources.map((item) => [item.id, item]));
const claimById = new Map(knowledgeBank.claims.map((item) => [item.id, item]));
const inquiryById = new Map(knowledgeBank.researchInquiries.map((item) => [item.id, item]));

for (const intake of knowledgeBank.intakeRecords) {
  if (!intake.nextActions.length) fail(`Intake ${intake.id} has no next action`);
  if (intake.kind === "source-url" && !intake.sourceIds.length) {
    fail(`Source intake ${intake.id} has no decomposed source`);
  }
}

const privatePattern = /\/Users\/|\/Volumes\/|Mobile Documents|supporting-materials|file:\/\/|\.photoslibrary/i;
if (privatePattern.test(suiteSource)) fail("Lifecycle eval contains a private path");

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

    if (result.version !== 1 || result.evalId !== suite.evalId) {
      fail(`${runName} references the wrong eval or version`);
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(result.evaluatedThrough ?? "")) {
      fail(`${runName} must declare an evaluatedThrough date`);
    }
    if (!Number.isInteger(result.iterations) || result.iterations < 1 || result.iterations > stop.maxIterations) {
      fail(`${runName} has an invalid iteration count`);
    }
    if (result.rounds?.length !== result.iterations) {
      fail(`${runName} must record every iteration`);
    }
    for (const [index, round] of (result.rounds ?? []).entries()) {
      if (round.round !== index + 1) fail(`${runName} round numbers are not contiguous`);
    }

    const evaluatedIntakeIds = result.evaluatedIntakeIds ?? [];
    if (new Set(evaluatedIntakeIds).size !== evaluatedIntakeIds.length) {
      fail(`${runName} repeats an evaluated intake ID`);
    }
    for (const intakeId of evaluatedIntakeIds) {
      if (!intakeById.has(intakeId)) fail(`${runName} references unknown intake ${intakeId}`);
    }
    if (evaluatedIntakeIds.length !== result.graphSnapshot?.intakeRecords) {
      fail(
        `${runName} evaluates ${evaluatedIntakeIds.length} intake records but its graph snapshot declares ${result.graphSnapshot?.intakeRecords}`
      );
    }
    const clusters = result.contentClusters ?? [];
    uniqueIds(clusters, `${runName} content clusters`);
    for (const cluster of clusters) {
      for (const sourceId of cluster.sourceIds ?? []) {
        if (!sourceById.has(sourceId)) fail(`${runName}/${cluster.id} references unknown source ${sourceId}`);
      }
      for (const claimId of cluster.claimIds ?? []) {
        if (!claimById.has(claimId)) fail(`${runName}/${cluster.id} references unknown claim ${claimId}`);
      }
      for (const inquiryId of cluster.researchInquiryIds ?? []) {
        if (!inquiryById.has(inquiryId)) fail(`${runName}/${cluster.id} references unknown inquiry ${inquiryId}`);
      }
    }

    const expectedCounts = {
      intakeRecords: knowledgeBank.intakeRecords.length,
      sources: knowledgeBank.sources.length,
      claims: knowledgeBank.claims.length,
      researchInquiries: knowledgeBank.researchInquiries.length,
      activeProjections: knowledgeBank.claims.flatMap((claim) => claim.projections).filter((projection) => projection.status === "active").length,
      heldProjections: knowledgeBank.claims.flatMap((claim) => claim.projections).filter((projection) => projection.status === "hold").length
    };
    for (const [key, count] of Object.entries(expectedCounts)) {
      const snapshotCount = result.graphSnapshot?.[key];
      if (!Number.isInteger(snapshotCount) || snapshotCount < 0) {
        fail(`${runName} graph snapshot ${key} is invalid`);
      } else if (snapshotCount > count) {
        fail(`${runName} graph snapshot ${key} exceeds the current graph`);
      }
    }

    if (result.status === "passed") {
      const qualifyingRounds = result.qualifyingRounds ?? [];
      if (qualifyingRounds.length < stop.requiredConsecutivePasses) {
        fail(`${runName} passed without enough qualifying rounds`);
      }
      if (qualifyingRounds.slice(1).some((round, index) => round !== qualifyingRounds[index] + 1)) {
        fail(`${runName} qualifying rounds are not consecutive`);
      }
      const expectedFinalRounds = Array.from(
        { length: stop.requiredConsecutivePasses },
        (_, index) => result.iterations - stop.requiredConsecutivePasses + index + 1
      );
      if (JSON.stringify(qualifyingRounds.slice(-stop.requiredConsecutivePasses)) !== JSON.stringify(expectedFinalRounds)) {
        fail(`${runName} did not finish on qualifying rounds`);
      }
      for (const roundNumber of expectedFinalRounds) {
        const round = result.rounds?.[roundNumber - 1];
        if (
          round?.result !== "qualifying-pass" ||
          round.evidenceGovernanceScore < stop.targetWeightedScore ||
          round.editorialFutureUseScore < stop.targetWeightedScore
        ) {
          fail(`${runName} round ${roundNumber} does not satisfy the qualifying-pass contract`);
        }
      }
      if ((result.unresolvedCriteria?.length ?? 0) > 0) {
        fail(`${runName} passed with unresolved criteria`);
      }
      for (const judgeKey of ["evidenceGovernanceJudge", "editorialFutureUseJudge"]) {
        const judge = result.finalJudgments?.[judgeKey];
        if (!judge?.allHardGatesPassed) fail(`${runName}/${judgeKey} has a failed hard gate`);
        if (judge?.weightedScore < stop.targetWeightedScore) fail(`${runName}/${judgeKey} is below the score threshold`);
        if (judge?.minimumCriterionScore < stop.minimumCriterionScore) fail(`${runName}/${judgeKey} has a criterion below minimum`);
        if (stop.requiredPerfectCriteria?.includes("calibration") && judge?.calibration !== 5) {
          fail(`${runName}/${judgeKey} must score calibration 5`);
        }
        if ((judge?.regressions?.length ?? 0) > stop.maxRegressions) {
          fail(`${runName}/${judgeKey} exceeds the regression limit`);
        }
      }
    }

    if (privatePattern.test(resultSource)) fail(`${runName}/result.json contains a private path`);
  }
}

if (failures.length) {
  console.error("Knowledge Bank lifecycle eval check failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(
  `Knowledge Bank lifecycle eval check passed: ${suite.hardGates.length} hard gates, ` +
    `${suite.scoredCriteria.length} criteria, ${suite.fixtures.length} fixtures, ` +
    `${knowledgeBank.intakeRecords.length} intake records.`
);
