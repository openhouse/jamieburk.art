import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../.."
);

export const suitePath = path.join(
  repoRoot,
  "evals/launch-readiness/evals.json"
);

export function loadLaunchEvalSuite() {
  return JSON.parse(readFileSync(suitePath, "utf8"));
}

export function validateLaunchEvalSuite(suite) {
  const errors = [];
  const requireArray = (name) => {
    if (!Array.isArray(suite[name]) || suite[name].length === 0) {
      errors.push(`${name} must be a non-empty array`);
      return [];
    }
    return suite[name];
  };

  if (suite.version !== 1) errors.push("version must be 1");
  if (!suite.id) errors.push("id is required");
  if (!suite.objective) errors.push("objective is required");

  const groups = {
    hardGates: requireArray("hardGates"),
    sourceChecks: requireArray("sourceChecks"),
    judgeCriteria: requireArray("judgeCriteria"),
    runtimeCases: requireArray("runtimeCases")
  };
  const allIds = [];
  for (const [groupName, records] of Object.entries(groups)) {
    for (const record of records) {
      if (!record.id) errors.push(`${groupName} contains a record without an id`);
      else allIds.push(record.id);
    }
  }
  const duplicates = allIds.filter((id, index) => allIds.indexOf(id) !== index);
  for (const id of new Set(duplicates)) errors.push(`duplicate eval id: ${id}`);

  const runtimeIds = new Set(groups.runtimeCases.map((item) => item.id));
  for (const gate of groups.hardGates) {
    if (!gate.description) errors.push(`${gate.id} needs a description`);
    if (gate.kind === "command" && !gate.command) {
      errors.push(`${gate.id} command gate needs a command`);
    }
    for (const runtimeId of gate.runtimeCaseIds ?? []) {
      if (!runtimeIds.has(runtimeId)) {
        errors.push(`${gate.id} references unknown runtime case ${runtimeId}`);
      }
    }
  }

  const weight = groups.judgeCriteria.reduce(
    (sum, criterion) => sum + Number(criterion.weight || 0),
    0
  );
  if (Math.abs(weight - 1) > 0.000001) {
    errors.push(`judge criterion weights must total 1, got ${weight}`);
  }
  for (const criterion of groups.judgeCriteria) {
    if (!(criterion.minimumScore >= 1 && criterion.minimumScore <= 5)) {
      errors.push(`${criterion.id} minimumScore must be between 1 and 5`);
    }
    for (const anchor of ["1", "3", "5"]) {
      if (!criterion.anchors?.[anchor]) {
        errors.push(`${criterion.id} needs score anchor ${anchor}`);
      }
    }
  }

  if (!(suite.targets?.weightedJudgeScoreAtLeast > 0)) {
    errors.push("targets.weightedJudgeScoreAtLeast must be positive");
  }
  if (!suite.hillClimb?.stopWhen) errors.push("hillClimb.stopWhen is required");

  return errors;
}

export function runSourceChecks(suite) {
  const failures = [];
  for (const group of suite.sourceChecks ?? []) {
    for (const check of group.checks ?? []) {
      const absolute = path.join(repoRoot, check.file);
      if (!existsSync(absolute)) {
        failures.push(`${group.id}: missing ${check.file}`);
        continue;
      }
      const content = readFileSync(absolute, "utf8");
      for (const expected of check.mustInclude ?? []) {
        if (!content.includes(expected)) {
          failures.push(`${group.id}: ${check.file} is missing ${JSON.stringify(expected)}`);
        }
      }
      for (const prohibited of check.mustNotInclude ?? []) {
        if (content.includes(prohibited)) {
          failures.push(`${group.id}: ${check.file} contains ${JSON.stringify(prohibited)}`);
        }
      }
    }
  }
  return failures;
}

export function scoreJudgeResults(suite, scores, hardGatesPass = true) {
  const byId = new Map(scores.map((item) => [item.criterionId, item.score]));
  const missing = [];
  const belowMinimum = [];
  let weightedScore = 0;

  for (const criterion of suite.judgeCriteria) {
    const score = byId.get(criterion.id);
    if (!(score >= 1 && score <= suite.targets.scoreScale)) {
      missing.push(criterion.id);
      continue;
    }
    weightedScore += score * criterion.weight;
    if (score < criterion.minimumScore) belowMinimum.push(criterion.id);
  }

  const rounded = Math.round(weightedScore * 1000) / 1000;
  return {
    weightedScore: rounded,
    missing,
    belowMinimum,
    accepted:
      hardGatesPass &&
      missing.length === 0 &&
      belowMinimum.length === 0 &&
      rounded >= suite.targets.weightedJudgeScoreAtLeast
  };
}
