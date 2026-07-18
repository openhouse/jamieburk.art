import { existsSync, readFileSync, readdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { resolveRepoEvidencePath } from "./repo-evidence-path.mjs";

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

const runtimeReportFields = {
  "LR-RUNTIME-RESPONSIVE": "responsive",
  "LR-RUNTIME-KEYBOARD": "keyboard",
  "LR-RUNTIME-CITATIONS": "citations"
};

const caseKey = (route, viewport) => `${route}\u0000${viewport[0]}x${viewport[1]}`;

export function validateBrowserReportCoverage(suite, report, { requiredRuntimeIds, exactRuntimeIds = false } = {}) {
  const errors = [];
  const required = requiredRuntimeIds ?? Object.keys(runtimeReportFields);
  const declared = report?.runtimeCaseIds ?? [];
  if (!Array.isArray(declared) || new Set(declared).size !== declared.length || required.some((id) => !declared.includes(id))) {
    errors.push("browser report must declare every required runtime case exactly once");
  }
  if (exactRuntimeIds && (declared.length !== required.length || declared.some((id) => !required.includes(id)))) {
    errors.push("browser report runtime cases must exactly match the canonical suite");
  }

  for (const runtimeId of required) {
    const runtimeCase = suite.runtimeCases.find((item) => item.id === runtimeId);
    const field = runtimeReportFields[runtimeId];
    if (!runtimeCase || !field) {
      errors.push(`browser report references unsupported runtime case ${runtimeId}`);
      continue;
    }
    const expected = new Set(runtimeCase.routes.flatMap((route) => runtimeCase.viewports.map((viewport) => caseKey(route, viewport))));
    const actual = report?.[field];
    if (!Array.isArray(actual)) {
      errors.push(`${runtimeId} needs a ${field} result array`);
      continue;
    }
    const actualKeys = actual.map((item) => caseKey(item.route, [item.width, item.height]));
    if (actual.length !== expected.size || new Set(actualKeys).size !== actualKeys.length || actualKeys.some((key) => !expected.has(key))) {
      errors.push(`${runtimeId} does not cover the complete route and viewport matrix`);
    }
    if (actual.some((item) => item.passed !== true)) errors.push(`${runtimeId} contains a failed browser case`);
  }
  if (report?.passed !== true) errors.push("browser report is not declared passed");
  return errors;
}

const placeholderEvidence = /^(?:pass(?:ed)?|ok|yes|todo|tbd|none|n\/a|trust me)$/i;

function parseJsonObject(value) {
  try {
    const parsed = JSON.parse(value);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function validateGateEvidence(gate, evidence, candidateCommit) {
  const errors = [];
  const required = gate.evidenceRequired ?? [];
  if (!Array.isArray(evidence) || evidence.length !== required.length) {
    return [`${gate.id} needs structured evidence for every declared ${gate.kind} requirement`];
  }
  const labels = evidence.map((item) => item?.label);
  if (new Set(labels).size !== labels.length || required.some((label) => !labels.includes(label)) || labels.some((label) => !required.includes(label))) {
    errors.push(`${gate.id} evidence labels must exactly match the declared requirements`);
  }
  const values = new Map(evidence.map((item) => [item?.label, item?.value]));
  for (const label of required) {
    const value = values.get(label);
    if (typeof value !== "string" || !value.trim() || placeholderEvidence.test(value.trim())) {
      errors.push(`${gate.id}/${label} needs substantive evidence`);
      continue;
    }
    if (label === "approved commit SHA" && value !== candidateCommit) errors.push(`${gate.id}/${label} must equal the exact candidate commit`);
    if (label === "staging URL") {
      try {
        const url = new URL(value);
        if (url.protocol !== "https:" || url.hostname !== "staging.jamieburk.art") throw new Error();
      } catch {
        errors.push(`${gate.id}/${label} must be an HTTPS staging.jamieburk.art URL`);
      }
    }
    if (label === "production image or deployment identifier" && !/^[A-Za-z0-9][A-Za-z0-9._:@/+\-]{7,}$/.test(value)) {
      errors.push(`${gate.id}/${label} needs a concrete image or deployment identifier`);
    }
    if (label === "resume SHA-256" && !/^[a-f0-9]{64}$/i.test(value)) errors.push(`${gate.id}/${label} must be a SHA-256 digest`);
    if (label === "HTTP observations") {
      const observations = parseJsonObject(value);
      const keys = ["apex", "www", "tls", "health", "canonicals", "openGraph"];
      if (!observations || keys.some((key) => observations[key] === undefined || observations[key] === "")) {
        errors.push(`${gate.id}/${label} must be JSON covering apex, www, TLS, health, canonicals, and Open Graph`);
      }
    }
    if (label === "robots and sitemap bodies") {
      const bodies = parseJsonObject(value);
      if (!bodies || typeof bodies.robots !== "string" || !/user-agent/i.test(bodies.robots) || typeof bodies.sitemap !== "string" || !/<urlset/i.test(bodies.sitemap)) {
        errors.push(`${gate.id}/${label} must be JSON containing inspected robots and sitemap bodies`);
      }
    }
  }
  return errors;
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
    if (["approval", "deployment"].includes(gate.kind) && (!Array.isArray(gate.evidenceRequired) || gate.evidenceRequired.length === 0 || new Set(gate.evidenceRequired).size !== gate.evidenceRequired.length)) {
      errors.push(`${gate.id} needs unique evidence requirements`);
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
    if (!/^[a-f0-9]{40}$/i.test(run.candidate?.commit ?? "") || !/^[a-f0-9]{40}$/i.test(run.candidate?.tree ?? "")) {
      failures.push("a passing run must bind an exact candidate commit and tree");
    } else {
      try {
        const actualTree = execFileSync("git", ["rev-parse", `${run.candidate.commit}^{tree}`], { cwd: repoRoot, encoding: "utf8" }).trim();
        if (actualTree !== run.candidate.tree) failures.push("passing run candidate tree does not match its commit");
      } catch {
        failures.push("passing run candidate commit is not available in Git");
      }
    }
    const expectedGateIds = new Set(suite.hardGates.map((gate) => gate.id));
    const results = run.hardGateResults ?? [];
    const resultIds = new Set(results.map((result) => result.id));
    if (results.length !== expectedGateIds.size || resultIds.size !== expectedGateIds.size || [...expectedGateIds].some((id) => !resultIds.has(id))) {
      failures.push("a passing run must record every hard gate exactly once");
    }
    for (const result of results) {
      const gate = suite.hardGates.find((item) => item.id === result.id);
      if (result.status !== "passed" || result.candidateCommit !== run.candidate?.commit) {
        failures.push(`${result.id ?? "hard gate"} needs passed status bound to the exact candidate commit`);
      }
      if (gate?.kind === "command") {
        const execution = result.execution;
        if (execution?.command !== gate.command || execution?.exitCode !== 0 || !/^[a-f0-9]{64}$/.test(execution?.outputDigest ?? "") || !execution?.outputPath) {
          failures.push(`${result.id} needs exact command, zero exit code, retained output path, and output digest`);
        } else {
          const resolved = resolveRepoEvidencePath(repoRoot, execution.outputPath, ["evals/launch-readiness/evidence"]);
          if (resolved.error) failures.push(`${result.id} ${resolved.error}`);
          else if (!existsSync(resolved.path)) failures.push(`${result.id} retained output is missing`);
          else if (createHash("sha256").update(readFileSync(resolved.path)).digest("hex") !== execution.outputDigest) failures.push(`${result.id} retained output digest is stale`);
        }
      } else if (gate?.kind === "browser") {
        const report = result.browserReport;
        const expectedRuntimeIds = [...(gate.runtimeCaseIds ?? [])].sort();
        const actualRuntimeIds = [...(report?.runtimeCaseIds ?? [])].sort();
        if (!report?.path || !/^[a-f0-9]{64}$/.test(report?.digest ?? "") || JSON.stringify(actualRuntimeIds) !== JSON.stringify(expectedRuntimeIds)) {
          failures.push(`${result.id} needs a digest-bound browser report covering every required runtime case`);
        } else {
          const resolved = resolveRepoEvidencePath(repoRoot, report.path, ["reports/generated"]);
          if (resolved.error) failures.push(`${result.id} ${resolved.error}`);
          else if (!existsSync(resolved.path)) failures.push(`${result.id} browser report is missing`);
          else {
            const reportContent = readFileSync(resolved.path);
            if (createHash("sha256").update(reportContent).digest("hex") !== report.digest) failures.push(`${result.id} browser report digest is stale`);
            else {
              try {
                const parsed = JSON.parse(reportContent);
                if (parsed.candidateCommit !== run.candidate?.commit) failures.push(`${result.id} browser report does not bind the exact candidate`);
                failures.push(...validateBrowserReportCoverage(suite, parsed, { requiredRuntimeIds: gate.runtimeCaseIds }).map((error) => `${result.id} ${error}`));
              } catch {
                failures.push(`${result.id} browser report is not valid JSON`);
              }
            }
          }
        }
      } else if (["approval", "deployment"].includes(gate?.kind)) {
        failures.push(...validateGateEvidence(gate, result.evidence, run.candidate?.commit));
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
  for (const score of run?.scores ?? []) {
    if (!Number.isInteger(score.score) || score.score < 1 || score.score > suite.targets.scoreScale) failures.push(`${score.criterionId ?? "score"} must be an integer on the declared scale`);
    if (run?.hardGatesPass === true && (!Array.isArray(score.evidence) || score.evidence.length === 0 || score.evidence.some((item) => typeof item !== "string" || !item.trim()))) failures.push(`${score.criterionId ?? "score"} needs evidence before a run can pass`);
    if (run?.hardGatesPass === true && !Array.isArray(score.risks)) failures.push(`${score.criterionId ?? "score"} needs a risks array before a run can pass`);
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
    if (!Number.isInteger(score) || !(score >= 1 && score <= suite.targets.scoreScale)) {
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
