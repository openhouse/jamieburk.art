import { existsSync, readFileSync, readdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
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

export function loadLaunchEvalRunRecords() {
  const runsDirectory = path.join(repoRoot, "evals/launch-readiness/runs");
  return readdirSync(runsDirectory)
    .filter((name) => name.endsWith(".json"))
    .sort()
    .map((name) => ({
      file: `evals/launch-readiness/runs/${name}`,
      record: JSON.parse(readFileSync(path.join(runsDirectory, name), "utf8"))
    }));
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

  const lensPolicy = suite.lensPolicy;
  if (!/not a quotation, current endorsement, or professor-authored review/i.test(
    lensPolicy?.attributionBoundary ?? ""
  )) {
    errors.push("lensPolicy needs a clear attribution boundary");
  }
  if (
    lensPolicy?.morse?.publicThresholdRoute !== "/about" ||
    lensPolicy.morse.dimensions?.length < 6 ||
    !lensPolicy.morse.boundary
  ) {
    errors.push("Morse lens needs the public threshold, six dimensions, and a boundary");
  }

  const sack = lensPolicy?.sack;
  const decisionVector = sack?.decisionVector ?? [];
  if (decisionVector.length !== 7 || new Set(decisionVector).size !== 7) {
    errors.push("Sack lens needs seven unique decision dimensions");
  }
  const requiredActions = new Set([
    "promote-public-claim",
    "dispute-attribution",
    "override-model-judgment",
    "reopen-decision"
  ]);
  const authorityActions = new Set((sack?.authorities ?? []).map((item) => item.action));
  if (
    sack?.authorities?.length !== requiredActions.size ||
    [...requiredActions].some((action) => !authorityActions.has(action)) ||
    sack.authorities.some((item) => !item.authority || item.modelHasFinalAuthority !== false)
  ) {
    errors.push("Sack lens needs four human authority records and no model final authority");
  }
  if (
    sack?.reopenTriggers?.length < 5 ||
    sack?.runRecordRequirements?.dimensionEvidenceRequired !== true ||
    sack.runRecordRequirements.dimensionRiskArrayRequired !== true ||
    sack.runRecordRequirements.authorityLogRequired !== true ||
    sack.runRecordRequirements.reopenReviewRequired !== true ||
    sack.runRecordRequirements.disagreementReviewRequired !== true ||
    sack.runRecordRequirements.completeTriggerReviewRequired !== true ||
    sack.runRecordRequirements.nonemptyEvidenceRequired !== true ||
    sack.runRecordRequirements.structuredOverridesRequired !== true ||
    sack.runRecordRequirements.recordOverridesWhenInvoked !== true ||
    sack.preserveDisagreement !== true ||
    sack.acceptedBooleanIsNotCompletion !== true
  ) {
    errors.push("Sack lens needs per-run governance records, reopen triggers, preserved disagreement, and a non-final acceptance boundary");
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

export function validateDecisionRecord(suite, decisionRecord) {
  const failures = [];
  const sack = suite.lensPolicy.sack;
  const dimensions = decisionRecord?.dimensions ?? [];
  const dimensionsByName = new Map(
    dimensions.map((record) => [record.dimension, record])
  );

  if (
    dimensions.length !== sack.decisionVector.length ||
    dimensionsByName.size !== sack.decisionVector.length
  ) {
    failures.push("decision record must contain every decision dimension exactly once");
  }
  for (const dimension of sack.decisionVector) {
    const record = dimensionsByName.get(dimension);
    if (!record) {
      failures.push(`decision record is missing dimension: ${dimension}`);
      continue;
    }
    if (!record.assessment?.trim()) {
      failures.push(`${dimension} needs a recorded assessment`);
    }
    if (
      !Array.isArray(record.evidence) ||
      record.evidence.length === 0 ||
      record.evidence.some((item) => typeof item !== "string" || !item.trim())
    ) {
      failures.push(`${dimension} needs per-run evidence`);
    }
    if (!Array.isArray(record.unresolvedRisks)) {
      failures.push(`${dimension} needs an unresolved-risks array`);
    }
  }

  const authorityLog = decisionRecord?.authorityLog ?? [];
  const authorityByAction = new Map(
    authorityLog.map((record) => [record.action, record])
  );
  if (
    authorityLog.length !== sack.authorities.length ||
    authorityByAction.size !== sack.authorities.length
  ) {
    failures.push("decision record must contain every human authority action exactly once");
  }
  for (const policy of sack.authorities) {
    const record = authorityByAction.get(policy.action);
    if (!record) {
      failures.push(`authority log is missing action: ${policy.action}`);
      continue;
    }
    if (
      record.humanAuthority !== policy.authority ||
      !record.disposition?.trim()
    ) {
      failures.push(`${policy.action} needs human authority and a disposition`);
    }
    if (record.modelHasFinalAuthority !== false) {
      failures.push(`${policy.action} cannot grant final authority to a model`);
    }
  }

  if (
    !Array.isArray(decisionRecord?.openDisagreements) ||
    decisionRecord.openDisagreements.some(
      (item) => typeof item !== "string" || !item.trim()
    )
  ) {
    failures.push("decision record needs an open-disagreements array");
  }
  if (!decisionRecord?.disagreementReview?.trim()) {
    failures.push("decision record needs an explicit disagreement review");
  }
  if (!Array.isArray(decisionRecord?.overrides)) {
    failures.push("decision record needs an overrides array");
  } else {
    for (const [index, override] of decisionRecord.overrides.entries()) {
      if (
        typeof override !== "object" ||
        !override.humanAuthority?.trim() ||
        !override.rationale?.trim() ||
        !Array.isArray(override.evidence) ||
        override.evidence.length === 0 ||
        !Array.isArray(override.boundaryChanges)
      ) {
        failures.push(`override ${index + 1} needs human authority, rationale, evidence, and boundary changes`);
      }
    }
  }
  if (!decisionRecord?.reopenReview?.trim()) {
    failures.push("decision record needs an explicit reopen review");
  }
  const triggers = decisionRecord?.reopenTriggersConsidered ?? [];
  if (
    triggers.length !== sack.reopenTriggers.length ||
    new Set(triggers).size !== sack.reopenTriggers.length ||
    sack.reopenTriggers.some((trigger) => !triggers.includes(trigger))
  ) {
    failures.push("decision record must review every reopen trigger exactly once");
  }

  return failures;
}

export function validateLaunchEvalRunRecord(suite, run) {
  const failures = [];
  if (!run?.id) failures.push("run record needs an id");
  if (!run?.recordedAt) failures.push("run record needs recordedAt");
  if (!run?.candidate?.branch || !run.candidate.baseCommit) {
    failures.push("run record needs candidate branch and baseCommit");
  } else if (!/^[a-f0-9]{40}$/i.test(run.candidate.baseCommit)) {
    failures.push("run record baseCommit must be a full Git SHA");
  } else {
    try {
      execFileSync("git", ["cat-file", "-e", `${run.candidate.baseCommit}^{commit}`], { cwd: repoRoot, stdio: "ignore" });
    } catch {
      failures.push("run record baseCommit is not available in Git");
    }
  }
  if (typeof run?.hardGatesPass !== "boolean") {
    failures.push("run record needs hardGatesPass");
  }
  if (!Array.isArray(run?.hardGateNotes) || run.hardGateNotes.length === 0) {
    failures.push("run record needs hard-gate notes");
  }
  if (run?.hardGatesPass === true) {
    const expectedGateIds = new Set(suite.hardGates.map((gate) => gate.id));
    const results = run.hardGateResults ?? [];
    const resultIds = new Set(results.map((result) => result.id));
    if (results.length !== expectedGateIds.size || resultIds.size !== expectedGateIds.size || [...expectedGateIds].some((id) => !resultIds.has(id))) {
      failures.push("a passing run must record every hard gate exactly once");
    }
    for (const result of results) {
      if (result.status !== "passed" || !Array.isArray(result.evidence) || result.evidence.length === 0 || result.evidence.some((item) => typeof item !== "string" || !item.trim())) {
        failures.push(`${result.id ?? "hard gate"} needs passed status and concrete evidence`);
      }
    }
  }

  const expectedIds = new Set(suite.judgeCriteria.map((criterion) => criterion.id));
  const scoreIds = new Set((run?.scores ?? []).map((score) => score.criterionId));
  if (
    run?.scores?.length !== expectedIds.size ||
    scoreIds.size !== expectedIds.size ||
    [...expectedIds].some((id) => !scoreIds.has(id))
  ) {
    failures.push("run record must score every criterion exactly once");
  }

  const computed = scoreJudgeResults(
    suite,
    run?.scores ?? [],
    run?.hardGatesPass,
    run?.decisionRecord
  );
  const declared = run?.declaredResult;
  if (!declared) {
    failures.push("run record needs a declaredResult");
  } else {
    for (const key of ["weightedScore", "accepted"]) {
      if (declared[key] !== computed[key]) {
        failures.push(`declared ${key} does not match the deterministic scorer`);
      }
    }
    for (const key of ["missing", "belowMinimum", "governanceFailures"]) {
      if (JSON.stringify(declared[key]) !== JSON.stringify(computed[key])) {
        failures.push(`declared ${key} does not match the deterministic scorer`);
      }
    }
  }

  return failures;
}

export function scoreJudgeResults(
  suite,
  scores,
  hardGatesPass = true,
  decisionRecord
) {
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
  const governanceFailures = validateDecisionRecord(suite, decisionRecord);
  return {
    weightedScore: rounded,
    missing,
    belowMinimum,
    governanceFailures,
    accepted:
      hardGatesPass &&
      missing.length === 0 &&
      belowMinimum.length === 0 &&
      governanceFailures.length === 0 &&
      rounded >= suite.targets.weightedJudgeScoreAtLeast
  };
}
