import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
export const contractPath = path.join(repoRoot, "evals/_shared/contract.json");
export const runDirectory = path.join(repoRoot, "evals/_shared/runs");

const sha256 = (value) => createHash("sha256").update(value).digest("hex");

export function loadEvalContract() {
  return JSON.parse(readFileSync(contractPath, "utf8"));
}

function canonicalJson(value) {
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonicalJson(value[key])}`).join(",")}}`;
  }
  return JSON.stringify(value);
}

export function contractDigest(contract = loadEvalContract()) {
  const suiteRecords = contract.suites.map((suite) => ({
    ...suite,
    digest: sha256(readFileSync(path.join(repoRoot, suite.path)))
  }));
  return sha256(canonicalJson({ contract, suiteRecords }));
}

function walk(relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);
  if (!existsSync(absolutePath)) return [];
  if (!statSync(absolutePath).isDirectory()) return [relativePath];
  return readdirSync(absolutePath).sort().flatMap((name) => walk(path.posix.join(relativePath, name)));
}

export function governedFiles(contract = loadEvalContract()) {
  const generated = contract.generatedOutputs.map((item) => `${item.replace(/\/$/, "")}/`);
  return [...new Set(contract.governedInputs.flatMap(walk))]
    .filter((file) => !generated.some((prefix) => `${file}/`.startsWith(prefix)))
    .sort();
}

export function governedInputDigest(contract = loadEvalContract()) {
  const hash = createHash("sha256");
  for (const file of governedFiles(contract)) {
    hash.update(file);
    hash.update("\0");
    hash.update(readFileSync(path.join(repoRoot, file)));
    hash.update("\0");
  }
  return hash.digest("hex");
}

export function validateEvalContract(contract) {
  const errors = [];
  if (contract.id !== "jamieburk-art-composite-eval-contract") errors.push("contract id is not canonical");
  if (!/^\d+\.\d+\.\d+$/.test(contract.version ?? "")) errors.push("contract version must be semantic");
  if (contract.suites?.length !== 3) errors.push("contract must govern exactly three top-level suites");
  const suiteIds = new Set(contract.suites?.map((suite) => suite.id));
  for (const id of ["launch-readiness", "portfolio-effectiveness", "knowledge-bank"]) {
    if (!suiteIds.has(id)) errors.push(`contract is missing suite ${id}`);
  }
  for (const suite of contract.suites ?? []) {
    const absolute = path.join(repoRoot, suite.path ?? "");
    if (!existsSync(absolute)) {
      errors.push(`${suite.id}: missing suite file ${suite.path}`);
      continue;
    }
    const value = JSON.parse(readFileSync(absolute, "utf8"));
    if (value.version !== suite.version) errors.push(`${suite.id}: declared suite version is stale`);
  }
  if (contract.stopCondition?.consecutiveDeterministicPasses < 2) errors.push("stop condition needs two deterministic passes");
  if (contract.stopCondition?.independentHoldouts < 2) errors.push("stop condition needs two independent holdouts");
  if (contract.stopCondition?.holdoutsReviewUnchangedCandidate !== true) errors.push("holdouts must review an unchanged candidate");
  if (contract.stopCondition?.priorScoresHiddenFromHoldouts !== true) errors.push("holdouts must not see prior scores");
  if (contract.humanAuthority?.modelHasFinalReleaseAuthority !== false) errors.push("models cannot have final release authority");
  for (const input of contract.governedInputs ?? []) {
    if (!existsSync(path.join(repoRoot, input))) errors.push(`governed input does not exist: ${input}`);
  }
  return errors;
}

export function loadCompositeRunRecords() {
  if (!existsSync(runDirectory)) return [];
  return readdirSync(runDirectory).filter((name) => name.endsWith(".json")).sort().map((name) => ({
    file: `evals/_shared/runs/${name}`,
    record: JSON.parse(readFileSync(path.join(runDirectory, name), "utf8"))
  }));
}

export function validateCompositeRunRecord(record, expected = {}) {
  const errors = [];
  const requiredString = (value, label) => {
    if (typeof value !== "string" || !value.trim()) errors.push(`${label} is required`);
  };
  requiredString(record.id, "run id");
  requiredString(record.recordedAt, "recordedAt");
  if (record.schemaVersion !== "2.0.0") errors.push(`${record.id ?? "run"}: schemaVersion must be 2.0.0`);
  requiredString(record.contract?.id, `${record.id}: contract id`);
  requiredString(record.contract?.version, `${record.id}: contract version`);
  requiredString(record.contract?.digest, `${record.id}: contract digest`);
  requiredString(record.candidate?.branch, `${record.id}: candidate branch`);
  requiredString(record.candidate?.commit, `${record.id}: candidate commit`);
  requiredString(record.candidate?.tree, `${record.id}: candidate tree`);
  requiredString(record.candidate?.governedInputDigest, `${record.id}: governed input digest`);
  if (!Array.isArray(record.commands) || record.commands.length === 0) errors.push(`${record.id}: commands are required`);
  for (const command of record.commands ?? []) {
    if (!command.command || !Number.isInteger(command.exitCode) || !["passed", "failed"].includes(command.status)) {
      errors.push(`${record.id}: every command needs text, an actual exit code, and status`);
    }
    if ((command.exitCode === 0) !== (command.status === "passed")) errors.push(`${record.id}: command status disagrees with exit code`);
  }
  if (record.judge?.class === "holdout") {
    if (record.judge.independent !== true) errors.push(`${record.id}: holdout must be independent`);
    if (record.judge.priorScoresVisible !== false) errors.push(`${record.id}: holdout cannot see prior scores`);
    if (!Array.isArray(record.criterionResults) || record.criterionResults.length === 0) errors.push(`${record.id}: holdout needs criterion results`);
    for (const result of record.criterionResults ?? []) {
      if (!result.criterionId || typeof result.score !== "number" || !result.evidence?.length) {
        errors.push(`${record.id}: criterion results need actual score and evidence`);
      }
    }
  }
  if (!["accepted-for-review", "revision-required", "blocked-by-external-gates"].includes(record.decision?.status)) {
    errors.push(`${record.id}: invalid decision status`);
  }
  if (record.decision?.productionReady === true) errors.push(`${record.id}: composite eval cannot grant production authority`);
  if (!Number.isInteger(record.iteration) || record.iteration < 1) errors.push(`${record.id}: iteration must be a positive integer`);
  for (const field of ["openDisagreements", "overrides", "reopenTriggersReviewed"]) {
    if (!Array.isArray(record[field])) errors.push(`${record.id}: ${field} must be retained as an array`);
  }
  if (expected.contractId && record.contract?.id !== expected.contractId) errors.push(`${record.id}: stale contract id`);
  if (expected.contractVersion && record.contract?.version !== expected.contractVersion) errors.push(`${record.id}: stale contract version`);
  if (expected.contractDigest && record.contract?.digest !== expected.contractDigest) errors.push(`${record.id}: stale contract digest`);
  if (expected.governedInputDigest && record.candidate?.governedInputDigest !== expected.governedInputDigest) errors.push(`${record.id}: stale candidate-input digest`);
  return errors;
}

export function evaluateCompositeStopCondition(records, contract = loadEvalContract()) {
  const currentContractDigest = contractDigest(contract);
  const currentInputDigest = governedInputDigest(contract);
  const current = records.filter(({ record }) =>
    record.contract?.digest === currentContractDigest &&
    record.candidate?.governedInputDigest === currentInputDigest
  );
  const deterministicRuns = current.filter(({ record }) => record.judge?.class === "deterministic");
  let consecutiveDeterministicPasses = 0;
  for (const { record } of deterministicRuns) {
    if (record.commands?.every((command) => command.exitCode === 0) && record.decision?.status === "accepted-for-review") consecutiveDeterministicPasses += 1;
    else consecutiveDeterministicPasses = 0;
  }
  const holdouts = current.filter(({ record }) =>
    record.judge?.class === "holdout" &&
    record.judge.independent === true &&
    record.judge.priorScoresVisible === false &&
    record.decision?.status === "accepted-for-review"
  );
  const candidateIdentities = new Set(holdouts.map(({ record }) => [record.candidate.commit, record.candidate.tree, record.candidate.governedInputDigest].join(":")));
  const independentJudgeLabels = new Set(holdouts.map(({ record }) => record.judge.label));
  return {
    deterministicPasses: consecutiveDeterministicPasses,
    independentHoldouts: holdouts.length,
    unchangedCandidate: candidateIdentities.size <= 1,
    distinctHoldoutJudges: independentJudgeLabels.size,
    externalGatesOpen: current.some(({ record }) => (record.decision?.externalGatesOpen ?? []).length > 0),
    acceptedForReview:
      consecutiveDeterministicPasses >= contract.stopCondition.consecutiveDeterministicPasses &&
      holdouts.length >= contract.stopCondition.independentHoldouts &&
      candidateIdentities.size === 1 &&
      independentJudgeLabels.size >= contract.stopCondition.independentHoldouts
  };
}
