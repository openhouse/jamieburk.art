import { readFileSync } from "node:fs";
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

if (failures.length) {
  console.error("Portfolio eval check failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(
  `Portfolio eval check passed: ${suite.hardGates.length} hard gates, ` +
    `${suite.scoredCriteria.length} scored criteria, ${suite.fixtures.length} fixtures.`
);
