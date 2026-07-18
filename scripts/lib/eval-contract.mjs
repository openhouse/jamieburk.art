import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  hasBindingHumanRefusal,
  validateDecisionRecord
} from "./launch-evals.mjs";
import { resolveRepoEvidencePath } from "./repo-evidence-path.mjs";
import { normalizeSecurityText } from "./security-normalization.mjs";

export const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
export const contractPath = path.join(repoRoot, "evals/_shared/contract.json");
export const runDirectory = path.join(repoRoot, "evals/_shared/runs");

const sha256 = (value) => createHash("sha256").update(value).digest("hex");
const git = (...args) => execFileSync("git", args, { cwd: repoRoot, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
const commitFileDigestCache = new Map();
const governedFilesAtCommitCache = new Map();
const governedDigestAtCommitCache = new Map();

export function canonicalJson(value) {
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonicalJson(value[key])}`).join(",")}}`;
  }
  return JSON.stringify(value);
}

export function loadEvalContract() {
  return JSON.parse(readFileSync(contractPath, "utf8"));
}

export function loadContractVersion(version) {
  const current = loadEvalContract();
  if (current.version === version) return current;
  const archived = path.join(repoRoot, `evals/_shared/contracts/${version}.json`);
  return existsSync(archived) ? JSON.parse(readFileSync(archived, "utf8")) : null;
}

export function contractDigest(contract = loadEvalContract()) {
  const suiteRecords = contract.suites.map((suite) => ({
    ...suite,
    digest: sha256(readFileSync(path.join(repoRoot, suite.path)))
  }));
  return sha256(canonicalJson({ contract, suiteRecords }));
}

function isGenerated(file, contract) {
  return contract.generatedOutputs.some((item) => file === item || file.startsWith(`${item.replace(/\/$/, "")}/`));
}

function walkAtRoot(root, relativePath) {
  const absolutePath = path.join(root, relativePath);
  if (!existsSync(absolutePath)) return [];
  if (!statSync(absolutePath).isDirectory()) return [relativePath];
  return readdirSync(absolutePath).sort().flatMap((name) => walkAtRoot(root, path.posix.join(relativePath, name)));
}

export function governedFilesAtRoot(root, contract = loadEvalContract()) {
  return [...new Set(contract.governedInputs.flatMap((input) => walkAtRoot(root, input)))]
    .filter((file) => !isGenerated(file, contract))
    .sort();
}

export function governedFiles(contract = loadEvalContract()) {
  return governedFilesAtRoot(repoRoot, contract);
}

export function governedInputDigestAtRoot(root, contract = loadEvalContract()) {
  const hash = createHash("sha256");
  for (const file of governedFilesAtRoot(root, contract)) {
    hash.update(file).update("\0").update(readFileSync(path.join(root, file))).update("\0");
  }
  return hash.digest("hex");
}

export function governedInputDigest(contract = loadEvalContract()) {
  return governedInputDigestAtRoot(repoRoot, contract);
}

export function normalizeReviewerIdentity(value) {
  try {
    return normalizeSecurityText(String(value ?? "")).trim().toLocaleLowerCase();
  } catch {
    return "";
  }
}

export function governedFilesAtCommit(commit, contract = loadEvalContract()) {
  const cacheKey = `${commit}:${canonicalJson({ governedInputs: contract.governedInputs, generatedOutputs: contract.generatedOutputs })}`;
  if (governedFilesAtCommitCache.has(cacheKey)) return governedFilesAtCommitCache.get(cacheKey);
  const files = contract.governedInputs.flatMap((input) => {
    try {
      return git("ls-tree", "-r", "--name-only", commit, "--", input).split("\n").filter(Boolean);
    } catch {
      return [];
    }
  });
  const result = [...new Set(files)].filter((file) => !isGenerated(file, contract)).sort();
  governedFilesAtCommitCache.set(cacheKey, result);
  return result;
}

export function governedInputDigestAtCommit(commit, contract = loadEvalContract()) {
  const cacheKey = `${commit}:${canonicalJson({ governedInputs: contract.governedInputs, generatedOutputs: contract.generatedOutputs })}`;
  if (governedDigestAtCommitCache.has(cacheKey)) return governedDigestAtCommitCache.get(cacheKey);
  const hash = createHash("sha256");
  for (const file of governedFilesAtCommit(commit, contract)) {
    hash.update(file).update("\0").update(execFileSync("git", ["show", `${commit}:${file}`], { cwd: repoRoot, maxBuffer: 100 * 1024 * 1024 })).update("\0");
  }
  const digest = hash.digest("hex");
  governedDigestAtCommitCache.set(cacheKey, digest);
  return digest;
}

export function captureCandidateSnapshot(contract = loadEvalContract()) {
  return {
    commit: git("rev-parse", "HEAD"),
    tree: git("rev-parse", "HEAD^{tree}"),
    governedInputDigest: governedInputDigest(contract)
  };
}

export function validateCandidateSnapshot(snapshot, contract = loadEvalContract()) {
  const current = captureCandidateSnapshot(contract);
  const errors = [];
  if (current.commit !== snapshot.commit) errors.push("candidate commit changed during deterministic evaluation");
  if (current.tree !== snapshot.tree) errors.push("candidate tree changed during deterministic evaluation");
  if (current.governedInputDigest !== snapshot.governedInputDigest) errors.push("governed inputs changed during deterministic evaluation");
  return errors;
}

export function promptDigest(promptPath) {
  return sha256(readFileSync(path.join(repoRoot, promptPath)));
}

export function fileDigestAtCommit(commit, filePath) {
  const cacheKey = `${commit}:${filePath}`;
  if (!commitFileDigestCache.has(cacheKey)) commitFileDigestCache.set(cacheKey, sha256(execFileSync("git", ["show", `${commit}:${filePath}`], { cwd: repoRoot, maxBuffer: 100 * 1024 * 1024, stdio: ["ignore", "pipe", "pipe"] })));
  return commitFileDigestCache.get(cacheKey);
}

export function runRecordDigest(record) {
  const { recordDigest: _recordDigest, ...content } = record;
  return sha256(canonicalJson(content));
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
    const content = readFileSync(absolute);
    const value = JSON.parse(content);
    if (value.version !== suite.version) errors.push(`${suite.id}: declared suite version is stale`);
    if (suite.digest !== sha256(content)) errors.push(`${suite.id}: declared suite digest is stale`);
  }
  if (contract.stopCondition?.consecutiveDeterministicPasses < 2) errors.push("stop condition needs two deterministic passes");
  const requiredHoldouts = contract.stopCondition?.contextSeparatedModelHoldouts ?? contract.stopCondition?.independentHoldouts;
  if (requiredHoldouts < 2) errors.push("stop condition needs two context-separated model holdouts");
  if (contract.requireReviewBundleBinding === true && (
    contract.stopCondition?.identityAssurance !== "self-attested-model-context" ||
    contract.stopCondition?.cryptographicIdentityRequired !== false
  )) errors.push("current stop condition must describe model-context separation without claiming cryptographic identity proof");
  if (contract.stopCondition?.holdoutsReviewUnchangedCandidate !== true) errors.push("holdouts must review an unchanged candidate");
  if (contract.stopCondition?.priorScoresHiddenFromHoldouts !== true) errors.push("holdouts must not see prior scores");
  if (contract.humanAuthority?.modelHasFinalReleaseAuthority !== false) errors.push("models cannot have final release authority");
  if (contract.requireReviewerAttestation !== true) errors.push("current contract must require reviewer attestation");
  if (contract.requireReviewBundleBinding !== true) errors.push("current contract must bind holdouts to the reviewed source bundle");
  if (contract.requireBindingHumanDecisions !== true) errors.push("current contract must make human refusals and publication holds binding");
  if (contract.requireCanonicalReviewerIdentity !== true) errors.push("current contract must canonicalize reviewer identity");
  if (contract.reviewerProvider !== "codex-multi-agent") errors.push("current contract must name the supported model-context provider");
  if (contract.requireHumanReadableLogs !== true) errors.push("current contract must retain human-readable command logs");
  if (contract.requireDecisionRecordSynchronization !== true) errors.push("current contract must synchronize decision records");
  if (contract.requireDeterministicDecisionRecord !== true) errors.push("current contract must require deterministic decision records");
  if (!Array.isArray(contract.requiredCommands) || new Set(contract.requiredCommands).size !== contract.requiredCommands?.length) errors.push("required commands must be a unique non-empty array");
  const launch = launchSuite();
  for (const gate of launch.hardGates.filter((item) => item.kind === "command")) {
    if (!contract.requiredCommands?.includes(gate.command)) errors.push(`composite contract is missing launch command gate ${gate.id}: ${gate.command}`);
  }
  if (!contract.requiredCommands?.includes("npm run test:browser-evals")) errors.push("composite contract is missing the browser hard gate");
  if (!Array.isArray(contract.requiredExternalGates) || contract.requiredExternalGates.length < 1) errors.push("required external gates are missing");
  if (!Array.isArray(contract.holdoutPrompts) || new Set(contract.holdoutPrompts).size !== 2) errors.push("contract needs exactly two distinct holdout prompts");
  for (const prompt of contract.holdoutPrompts ?? []) if (!existsSync(path.join(repoRoot, prompt))) errors.push(`holdout prompt does not exist: ${prompt}`);
  if (!Array.isArray(contract.requiredReopenTriggers) || contract.requiredReopenTriggers.length < 1) errors.push("required reopen triggers are missing");
  if (!contract.runnerPath || !existsSync(path.join(repoRoot, contract.runnerPath))) errors.push("canonical runner path is missing");
  for (const input of contract.governedInputs ?? []) {
    if (!existsSync(path.join(repoRoot, input))) errors.push(`governed input does not exist: ${input}`);
  }
  return errors;
}

export function loadCompositeRunRecords() {
  if (!existsSync(runDirectory)) return [];
  return readdirSync(runDirectory).filter((name) => name.endsWith(".json")).map((name) => ({
    file: `evals/_shared/runs/${name}`,
    record: JSON.parse(readFileSync(path.join(runDirectory, name), "utf8"))
  })).sort((a, b) => a.record.iteration - b.record.iteration || a.file.localeCompare(b.file));
}

export function validateRunSequence(records) {
  const errors = [];
  const ids = new Set();
  for (let index = 0; index < records.length; index += 1) {
    const { file, record } = records[index];
    if (ids.has(record.id)) errors.push(`${file}: duplicate run id ${record.id}`);
    ids.add(record.id);
    if (record.iteration !== index + 1) errors.push(`${file}: iteration must be ${index + 1}`);
    if (index === 0) {
      if (record.previousRunId || record.previousRunDigest) errors.push(`${file}: first run cannot name a predecessor`);
    } else {
      const previous = records[index - 1].record;
      if (record.previousRunId !== previous.id) errors.push(`${file}: previousRunId must name ${previous.id}`);
      if (record.previousRunDigest !== previous.recordDigest) errors.push(`${file}: previousRunDigest must match ${previous.id}`);
    }
  }
  return errors;
}

function sameStringSet(actual = [], expected = []) {
  return actual.length === expected.length && [...actual].sort().every((value, index) => value === [...expected].sort()[index]);
}

function launchSuite() {
  return JSON.parse(readFileSync(path.join(repoRoot, "evals/launch-readiness/evals.json"), "utf8"));
}

export function scoreHoldout(record, suite = launchSuite()) {
  const expected = new Map(suite.judgeCriteria.map((criterion) => [criterion.id, criterion]));
  const seen = new Set();
  const errors = [];
  let weightedScore = 0;
  for (const result of record.criterionResults ?? []) {
    const criterion = expected.get(result.criterionId);
    if (!criterion) errors.push(`${record.id}: unknown criterion ${result.criterionId}`);
    if (seen.has(result.criterionId)) errors.push(`${record.id}: duplicate criterion ${result.criterionId}`);
    seen.add(result.criterionId);
    if (!Number.isInteger(result.score) || result.score < 1 || result.score > 5) errors.push(`${record.id}: ${result.criterionId} score must be an integer from 1 to 5`);
    if (!Array.isArray(result.evidence) || result.evidence.length === 0 || result.evidence.some((item) => typeof item !== "string" || !item.trim())) errors.push(`${record.id}: ${result.criterionId} needs evidence`);
    if (!Array.isArray(result.risks)) errors.push(`${record.id}: ${result.criterionId} needs a risks array`);
    if (criterion && Number.isInteger(result.score)) weightedScore += result.score * criterion.weight;
  }
  for (const id of expected.keys()) if (!seen.has(id)) errors.push(`${record.id}: missing criterion ${id}`);
  weightedScore = Math.round(weightedScore * 1000) / 1000;
  const belowMinimum = [...expected.values()].filter((criterion) => {
    const result = record.criterionResults?.find((item) => item.criterionId === criterion.id);
    return !result || result.score < criterion.minimumScore;
  }).map((criterion) => criterion.id);
  return { errors, weightedScore, belowMinimum, scorePasses: weightedScore >= suite.targets.weightedJudgeScoreAtLeast && belowMinimum.length === 0 };
}

export function validateCandidateIdentity(record, contract) {
  const errors = [];
  try {
    const tree = git("rev-parse", `${record.candidate.commit}^{tree}`);
    if (tree !== record.candidate.tree) errors.push(`${record.id}: candidate tree does not match candidate commit`);
    const digest = governedInputDigestAtCommit(record.candidate.commit, contract);
    if (digest !== record.candidate.governedInputDigest) errors.push(`${record.id}: candidate-input digest does not match candidate commit`);
  } catch {
    errors.push(`${record.id}: candidate commit is not available in Git`);
  }
  return errors;
}

export function validateCompositeRunRecord(record, expected = {}) {
  const errors = [];
  const contract = expected.contract ?? loadContractVersion(record.contract?.version);
  const requiredString = (value, label) => {
    if (typeof value !== "string" || !value.trim()) errors.push(`${label} is required`);
  };
  requiredString(record.id, "run id");
  requiredString(record.recordedAt, "recordedAt");
  if (!/^2\.\d+\.0$/.test(record.schemaVersion ?? "")) errors.push(`${record.id ?? "run"}: unsupported schemaVersion`);
  requiredString(record.contract?.id, `${record.id}: contract id`);
  requiredString(record.contract?.version, `${record.id}: contract version`);
  requiredString(record.contract?.digest, `${record.id}: contract digest`);
  requiredString(record.candidate?.branch, `${record.id}: candidate branch`);
  requiredString(record.candidate?.commit, `${record.id}: candidate commit`);
  requiredString(record.candidate?.tree, `${record.id}: candidate tree`);
  requiredString(record.candidate?.governedInputDigest, `${record.id}: governed input digest`);
  if (!contract) errors.push(`${record.id}: no immutable contract exists for version ${record.contract?.version}`);
  if (!Array.isArray(record.commands) || record.commands.length === 0) errors.push(`${record.id}: commands are required`);
  for (const command of record.commands ?? []) {
    if (!command.command || !Number.isInteger(command.exitCode) || !["passed", "failed"].includes(command.status)) errors.push(`${record.id}: every command needs text, an actual exit code, and status`);
    if ((command.exitCode === 0) !== (command.status === "passed")) errors.push(`${record.id}: command status disagrees with exit code`);
  }
  if (record.judge?.class === "deterministic" && contract?.requiredCommands && !sameStringSet(record.commands.map((item) => item.command), contract.requiredCommands)) errors.push(`${record.id}: deterministic run must execute the complete required command set`);
  if (record.judge?.class === "deterministic" && contract?.requiredCommands) {
    if (contract.runnerPath && record.execution?.runnerPath !== contract.runnerPath) errors.push(`${record.id}: deterministic run must identify the canonical runner`);
    else if (contract.runnerPath) {
      try {
        const expectedRunnerDigest = expected.verifyCandidate === false ? promptDigest(record.execution.runnerPath) : fileDigestAtCommit(record.candidate.commit, record.execution.runnerPath);
        if (record.execution.runnerDigest !== expectedRunnerDigest) errors.push(`${record.id}: deterministic runner digest is stale for its candidate commit`);
      } catch {
        errors.push(`${record.id}: deterministic runner is missing from its candidate commit`);
      }
    }
    for (const command of record.commands ?? []) {
      if (!/^[a-f0-9]{64}$/.test(command.outputDigest ?? "")) errors.push(`${record.id}: ${command.command} needs a captured output digest`);
      if (!command.startedAt || !command.completedAt || !Number.isInteger(command.durationMs) || command.durationMs < 0) errors.push(`${record.id}: ${command.command} needs execution timing`);
      if (contract.retainCommandLogs === true) {
        const roots = ["evals/_shared/logs", ...(expected.verifyCandidate === false ? ["scripts/tests/fixtures"] : [])];
        const resolved = command.outputPath ? resolveRepoEvidencePath(repoRoot, command.outputPath, roots) : null;
        if (!resolved) errors.push(`${record.id}: ${command.command} needs a retained output log`);
        else if (resolved.error) errors.push(`${record.id}: ${command.command} ${resolved.error}`);
        else if (!existsSync(resolved.path)) errors.push(`${record.id}: ${command.command} needs a retained output log`);
        else if (sha256(readFileSync(resolved.path)) !== command.outputDigest) errors.push(`${record.id}: ${command.command} output log digest is stale`);
      }
      if (contract.requireHumanReadableLogs === true) {
        const roots = ["evals/_shared/logs", ...(expected.verifyCandidate === false ? ["scripts/tests/fixtures"] : [])];
        const resolved = command.reviewOutputPath ? resolveRepoEvidencePath(repoRoot, command.reviewOutputPath, roots) : null;
        if (!resolved) errors.push(`${record.id}: ${command.command} needs a human-readable output log`);
        else if (resolved.error) errors.push(`${record.id}: ${command.command} ${resolved.error}`);
        else if (!existsSync(resolved.path)) errors.push(`${record.id}: ${command.command} needs a human-readable output log`);
        else if (!/^[a-f0-9]{64}$/.test(command.reviewOutputDigest ?? "") || sha256(readFileSync(resolved.path)) !== command.reviewOutputDigest) errors.push(`${record.id}: ${command.command} human-readable output digest is stale`);
      }
    }
  }
  if (record.judge?.class === "holdout") {
    if (record.judge.independent !== true) errors.push(`${record.id}: holdout must be independent`);
    if (record.judge.priorScoresVisible !== false) errors.push(`${record.id}: holdout cannot see prior scores`);
    if (record.judge.label !== record.judge.label?.trim() || !record.judge.label) errors.push(`${record.id}: holdout label must be normalized`);
    if (contract?.requireCanonicalReviewerIdentity === true && record.judge.label !== normalizeReviewerIdentity(record.judge.label)) errors.push(`${record.id}: holdout label must use its canonical security-normalized form`);
    if (!/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(record.judge.sessionId ?? "")) errors.push(`${record.id}: holdout needs a stable reviewer session UUID`);
    if (contract?.requireReviewerAttestation === true) {
      if (record.judge.reviewerClass !== "model-context" || !record.judge.provider?.trim()) errors.push(`${record.id}: holdout must identify its model context and provider`);
      const attestation = record.judge.attestation;
      if (attestation?.candidateCommit !== record.candidate.commit || attestation?.promptPath !== record.judge.promptPath) errors.push(`${record.id}: holdout attestation does not bind candidate and prompt`);
      if (contract?.requireReviewBundleBinding === true && (
        attestation?.candidateTree !== record.candidate.tree ||
        attestation?.governedInputDigest !== record.candidate.governedInputDigest ||
        attestation?.reviewBundleDigest !== record.candidate.governedInputDigest
      )) errors.push(`${record.id}: holdout attestation does not bind the reviewed source bundle, candidate tree, and governed digest`);
      if (contract?.requireReviewBundleBinding === true && attestation?.assurance !== "self-attested-model-context") errors.push(`${record.id}: holdout must state its reviewer identity assurance`);
      if (contract?.reviewerProvider && record.judge.provider !== contract.reviewerProvider) errors.push(`${record.id}: holdout provider is not the governed model-context provider`);
      for (const field of ["runRecordsInspected", "generatedReportsInspected", "editsMade"]) if (attestation?.[field] !== false) errors.push(`${record.id}: holdout attestation requires ${field}=false`);
      if (!Number.isFinite(Date.parse(attestation?.attestedAt ?? ""))) errors.push(`${record.id}: holdout attestation needs a timestamp`);
    }
    if (contract?.holdoutPrompts && !contract.holdoutPrompts.includes(record.judge.promptPath)) errors.push(`${record.id}: holdout prompt is not governed by the contract`);
    if (!record.judge.promptPath || !existsSync(path.join(repoRoot, record.judge.promptPath))) errors.push(`${record.id}: holdout prompt path is missing`);
    else {
      try {
        const archivedPrompt = record.judge.promptPath.startsWith(`evals/_shared/prompts/${record.contract.version}/`);
        const expectedPromptDigest = expected.verifyCandidate === false || archivedPrompt
          ? promptDigest(record.judge.promptPath)
          : fileDigestAtCommit(record.candidate.commit, record.judge.promptPath);
        if (record.judge.promptDigest !== expectedPromptDigest) errors.push(`${record.id}: holdout prompt digest is stale for its candidate commit`);
      } catch {
        errors.push(`${record.id}: holdout prompt is missing from its candidate commit`);
      }
    }
    const scored = scoreHoldout(record);
    errors.push(...scored.errors);
    if (record.decision?.weightedScore !== scored.weightedScore) errors.push(`${record.id}: declared weighted score does not match criterion results`);
    if (record.decision?.status === "accepted-for-review" && !scored.scorePasses) errors.push(`${record.id}: an accepted decision does not meet score floors and weighted target`);
    if (record.decision?.status === "accepted-for-review" && (record.blockingFindings?.length ?? 0) > 0) errors.push(`${record.id}: blocking findings prohibit acceptance`);
  }
  const needsDecisionRecord =
    (record.judge?.class === "holdout" && contract?.requireDecisionRecord === true) ||
    (record.judge?.class === "deterministic" && contract?.requireDeterministicDecisionRecord === true);
  if (needsDecisionRecord) {
    errors.push(...validateDecisionRecord(launchSuite(), record.decisionRecord, {
      requireBindingHumanDecisions: contract?.requireBindingHumanDecisions === true
    }).map((error) => `${record.id}: ${error}`));
    if (record.decision?.status === "accepted-for-review" && hasBindingHumanRefusal(record.decisionRecord)) errors.push(`${record.id}: a binding human refusal, publication hold, or reopen decision prohibits acceptance`);
    if (contract?.requireDecisionRecordSynchronization === true && canonicalJson(record.openDisagreements) !== canonicalJson(record.decisionRecord?.openDisagreements)) errors.push(`${record.id}: top-level disagreements must match the decision record`);
    if (contract?.requireDecisionRecordSynchronization === true && canonicalJson(record.overrides) !== canonicalJson(record.decisionRecord?.overrides)) errors.push(`${record.id}: top-level overrides must match the decision record`);
    if (contract?.requireDecisionRecordSynchronization === true && !sameStringSet(record.reopenTriggersReviewed, record.decisionRecord?.reopenTriggersConsidered)) errors.push(`${record.id}: top-level reopen review must match the decision record`);
  }
  if (!["accepted-for-review", "revision-required", "blocked-by-external-gates"].includes(record.decision?.status)) errors.push(`${record.id}: invalid decision status`);
  if (record.commands?.some((command) => command.exitCode !== 0) && record.decision?.status === "accepted-for-review") errors.push(`${record.id}: a failed command cannot be averaged away`);
  if (record.decision?.productionReady === true) errors.push(`${record.id}: composite eval cannot grant production authority`);
  if (contract?.requiredExternalGates && !sameStringSet(record.decision?.externalGatesOpen, contract.requiredExternalGates)) errors.push(`${record.id}: required external human gates must remain explicit`);
  if (!Number.isInteger(record.iteration) || record.iteration < 1) errors.push(`${record.id}: iteration must be a positive integer`);
  for (const field of ["openDisagreements", "overrides", "reopenTriggersReviewed"]) if (!Array.isArray(record[field])) errors.push(`${record.id}: ${field} must be retained as an array`);
  if (contract?.requiredReopenTriggers && !sameStringSet(record.reopenTriggersReviewed, contract.requiredReopenTriggers)) errors.push(`${record.id}: every governed reopen trigger must be reviewed`);
  if (record.recordDigest !== runRecordDigest(record)) errors.push(`${record.id}: run record digest is stale`);
  if (expected.contractId && record.contract?.id !== expected.contractId) errors.push(`${record.id}: stale contract id`);
  if (expected.contractVersion && record.contract?.version !== expected.contractVersion) errors.push(`${record.id}: stale contract version`);
  if (expected.contractDigest && record.contract?.digest !== expected.contractDigest) errors.push(`${record.id}: stale contract digest`);
  if (expected.governedInputDigest && record.candidate?.governedInputDigest !== expected.governedInputDigest) errors.push(`${record.id}: stale candidate-input digest`);
  if (contract && expected.verifyCandidate !== false) errors.push(...validateCandidateIdentity(record, contract));
  return errors;
}

export function evaluateCompositeStopCondition(records, contract = loadEvalContract()) {
  const currentContractDigest = contractDigest(contract);
  const currentInputDigest = governedInputDigest(contract);
  const matching = records.filter(({ record }) => record.contract?.digest === currentContractDigest && record.candidate?.governedInputDigest === currentInputDigest);
  const lastRejection = matching.findLastIndex(({ record }) => record.decision?.status !== "accepted-for-review");
  const current = matching.slice(lastRejection + 1);
  const firstHoldoutIndex = current.findIndex(({ record }) => record.judge?.class === "holdout");
  const deterministicPhase = firstHoldoutIndex === -1 ? current : current.slice(0, firstHoldoutIndex);
  const holdoutPhase = firstHoldoutIndex === -1 ? [] : current.slice(firstHoldoutIndex);
  const phaseOrderValid =
    deterministicPhase.every(({ record }) => record.judge?.class === "deterministic") &&
    holdoutPhase.every(({ record }) => record.judge?.class === "holdout");
  const deterministicRuns = deterministicPhase.filter(({ record }) => record.judge?.class === "deterministic");
  let consecutiveDeterministicPasses = 0;
  for (const { record } of deterministicRuns) {
    if (record.commands?.every((command) => command.exitCode === 0) && record.decision?.status === "accepted-for-review") consecutiveDeterministicPasses += 1;
    else consecutiveDeterministicPasses = 0;
  }
  const holdouts = phaseOrderValid
    ? holdoutPhase.filter(({ record }) => record.judge.reviewerClass === "model-context" && record.judge.independent === true && record.judge.priorScoresVisible === false && record.decision?.status === "accepted-for-review")
    : [];
  const certifying = [...deterministicRuns.slice(-consecutiveDeterministicPasses), ...holdouts];
  const identities = new Set(certifying.map(({ record }) => [record.candidate.commit, record.candidate.tree, record.candidate.governedInputDigest].join(":")));
  const sessions = new Set(holdouts.map(({ record }) => record.judge.sessionId?.trim().toLocaleLowerCase()));
  const labels = new Set(holdouts.map(({ record }) => normalizeReviewerIdentity(record.judge.label)));
  const prompts = new Set(holdouts.map(({ record }) => record.judge.promptPath));
  const externalGatesExplicit = current.every(({ record }) => sameStringSet(record.decision?.externalGatesOpen, contract.requiredExternalGates));
  const requiredHoldouts = contract.stopCondition.contextSeparatedModelHoldouts ?? contract.stopCondition.independentHoldouts;
  return {
    deterministicPasses: consecutiveDeterministicPasses,
    contextSeparatedHoldouts: holdouts.length,
    identityAssurance: contract.stopCondition.identityAssurance ?? "legacy-self-attested-model-context",
    cryptographicIdentityVerified: false,
    unchangedCandidate: identities.size === 1,
    distinctReviewContexts: Math.min(sessions.size, labels.size),
    phaseOrderValid,
    externalGatesOpen: externalGatesExplicit,
    acceptedForReview:
      phaseOrderValid &&
      consecutiveDeterministicPasses >= contract.stopCondition.consecutiveDeterministicPasses &&
      holdouts.length >= requiredHoldouts &&
      identities.size === 1 && sessions.size >= requiredHoldouts &&
      labels.size >= requiredHoldouts && prompts.size >= requiredHoldouts && externalGatesExplicit
  };
}

export function validateCompositeHistory(records, currentContract = loadEvalContract()) {
  const current = {
    contractId: currentContract.id,
    contractVersion: currentContract.version,
    contractDigest: contractDigest(currentContract),
    governedInputDigest: governedInputDigest(currentContract),
    contract: currentContract
  };
  const errors = [...validateEvalContract(currentContract), ...validateRunSequence(records)];
  for (const { file, record } of records) {
    const runContract = loadContractVersion(record.contract?.version);
    const expected = record.contract?.version === currentContract.version ? current : { contractId: currentContract.id, contract: runContract };
    errors.push(...validateCompositeRunRecord(record, expected).map((error) => `${file}: ${error}`));
  }
  return errors;
}
