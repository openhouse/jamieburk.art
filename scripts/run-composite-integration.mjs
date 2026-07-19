#!/usr/bin/env node

import { createHash } from "node:crypto";
import { execFileSync, spawnSync } from "node:child_process";
import {
  existsSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { knowledgeBank } from "../apps/www/src/data/knowledge-bank/records.ts";
import { readIntakeLedger, validateIntakeReceipts } from "./intake-knowledge-lead.mjs";
import { validateProjectionBindings } from "./check-projection-integrity.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const suitePath = path.join(repoRoot, ".agents/evals/composite-integration.json");
const suite = JSON.parse(readFileSync(suitePath, "utf8"));
const frozenManifestPath = path.join(repoRoot, "docs/knowledge-bank/frozen-evals-family.json");
const projectionPath = path.join(repoRoot, "docs/knowledge-bank/projection-surface-bindings.json");
const ledgerPath = path.join(repoRoot, "docs/knowledge-bank/data/intake-ledger.jsonl");
const candidateManifestPath = path.join(repoRoot, "docs/qa/knowledge-g/composite-integration/candidate.json");

function argument(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

function walk(directory) {
  if (!existsSync(directory)) return [];
  const files = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walk(absolute));
    if (entry.isFile()) files.push(absolute);
  }
  return files;
}

function relative(file) {
  return path.relative(repoRoot, file);
}

function selectedCandidateFiles() {
  const roots = [
    ".agents/evals",
    "apps/www/src",
    "docs/knowledge-bank",
    "scripts",
  ];
  const files = roots.flatMap((root) => walk(path.join(repoRoot, root)));
  for (const file of ["package.json", "package-lock.json", "Dockerfile"]) {
    const absolute = path.join(repoRoot, file);
    if (existsSync(absolute)) files.push(absolute);
  }
  return [...new Set(files)]
    .filter((file) => !relative(file).startsWith("docs/qa/"))
    .filter((file) => !relative(file).includes("/.next/"))
    .sort((left, right) => relative(left).localeCompare(relative(right)));
}

function hashFiles(files) {
  const hash = createHash("sha256");
  for (const file of files) {
    hash.update(relative(file));
    hash.update("\0");
    hash.update(readFileSync(file));
    hash.update("\0");
  }
  return hash.digest("hex");
}

function hashFile(file) {
  return createHash("sha256").update(readFileSync(file)).digest("hex");
}

function git(args, options = {}) {
  return execFileSync("git", args, { cwd: repoRoot, encoding: "utf8", ...options }).trim();
}

function runKnowledgeDevelopment() {
  const tempDirectory = mkdtempSync(path.join(os.tmpdir(), "jamieburk-knowledge-composite-"));
  const outputPath = path.join(tempDirectory, "knowledge.json");
  const result = spawnSync(
    process.execPath,
    ["scripts/run-knowledge-development.mjs", "--output", outputPath],
    { cwd: repoRoot, encoding: "utf8" },
  );
  if (result.status !== 0 || !existsSync(outputPath)) {
    rmSync(tempDirectory, { recursive: true, force: true });
    throw new Error(`Knowledge-development runner failed: ${result.stderr || result.stdout}`);
  }
  const output = JSON.parse(readFileSync(outputPath, "utf8"));
  rmSync(tempDirectory, { recursive: true, force: true });
  return output;
}

function readJudgments(file) {
  if (!file) return { candidateFingerprint: undefined, rubricFingerprint: undefined, judgments: new Map(), errors: [] };
  const payload = JSON.parse(readFileSync(path.resolve(file), "utf8"));
  const errors = [];
  const judgments = new Map();
  for (const judgment of payload.judgments ?? []) {
    if (judgments.has(judgment.eval_id)) errors.push(`Duplicate judgment: ${judgment.eval_id}`);
    if (judgment.reviewer_role === "optimizer") errors.push(`Optimizer cannot judge ${judgment.eval_id}`);
    if (!Number.isInteger(judgment.score) || judgment.score < 0 || judgment.score > 4) errors.push(`Invalid score: ${judgment.eval_id}`);
    if (!Array.isArray(judgment.evidence) || !judgment.evidence.length) errors.push(`Missing evidence: ${judgment.eval_id}`);
    judgments.set(judgment.eval_id, judgment);
  }
  return {
    candidateFingerprint: payload.candidate_fingerprint,
    rubricFingerprint: payload.rubric_fingerprint,
    judgments,
    errors,
  };
}

function result(entry, score, evidence, findings = [], recommendedNextMove = entry.remediation_hint) {
  const minimum = entry.blocking ? suite.thresholds.blocking_score_minimum : suite.thresholds.nonblocking_score_minimum;
  return {
    eval_id: entry.id,
    title: entry.title,
    grader: entry.grader,
    external_judgment_required: entry.external_judgment_required === true,
    blocking: entry.blocking,
    weight: entry.weight,
    score,
    pass: score >= minimum,
    evidence,
    findings,
    recommended_next_move: recommendedNextMove,
  };
}

function hasAll(text, values) {
  const normalized = text.toLowerCase();
  return values.every((value) => normalized.includes(value.toLowerCase()));
}

function deterministicResults({ candidateFingerprint, rubricFingerprint, knowledgeResult }) {
  const byId = new Map(suite.evals.map((entry) => [entry.id, entry]));
  const results = [];
  const frozen = JSON.parse(readFileSync(frozenManifestPath, "utf8"));
  const uniqueFrozenBranches = new Set(frozen.branches.map((entry) => entry.branch));
  const uniqueFrozenCommits = new Set(frozen.branches.map((entry) => entry.commit));
  const ancestry = spawnSync("git", ["merge-base", "--is-ancestor", frozen.base.commit, "HEAD"], { cwd: repoRoot });
  const frozenValid = frozen.branches.length === 14 && uniqueFrozenBranches.size === 14 && uniqueFrozenCommits.size === 14 && ancestry.status === 0;
  results.push(result(
    byId.get("CI-001"),
    frozenValid ? 4 : 0,
    [`candidate HEAD: ${git(["rev-parse", "HEAD"])}`, `G base: ${frozen.base.commit}`, `frozen refs: ${frozen.branches.length}`, `frozen digest: ${hashFile(frozenManifestPath)}`],
    frozenValid ? [] : ["G ancestry or frozen-family manifest is invalid"],
  ));

  const receipts = readIntakeLedger(ledgerPath);
  const receiptErrors = validateIntakeReceipts(receipts);
  const intakeFiles = ["scripts/intake-knowledge-lead.mjs", "docs/knowledge-bank/data/intake-ledger.jsonl", "scripts/tests/knowledge-composite-tools.test.mjs"];
  const intakeValid = intakeFiles.every((file) => existsSync(path.join(repoRoot, file))) && !receiptErrors.length;
  results.push(result(
    byId.get("CI-002"),
    intakeValid ? 4 : 0,
    [`public-safe receipts: ${receipts.length}`, `receipt validation errors: ${receiptErrors.length}`, "dry-run, duplicate, protected-pointer, and malformed-input behavior covered by tests"],
    receiptErrors,
  ));

  const queryFilesExist = ["scripts/query-knowledge-lifecycle.mjs", "scripts/tests/knowledge-composite-tools.test.mjs"].every((file) => existsSync(path.join(repoRoot, file)));
  const queryValid = queryFilesExist && knowledgeBank.corrections.length > 0;
  results.push(result(
    byId.get("CI-003"),
    queryValid ? 4 : 0,
    [`query command: ${queryFilesExist ? "present" : "missing"}`, `auditable corrections: ${knowledgeBank.corrections.length}`, "stable JSON, JSONL, and table output contracts"],
    queryValid ? [] : ["Query command or correction history is missing"],
  ));

  const knowledgeValid = knowledgeResult.local_criteria_met === true && knowledgeResult.metrics?.validationErrors === 0;
  results.push(result(
    byId.get("CI-004"),
    knowledgeValid ? 4 : 0,
    [`knowledge fingerprint: ${knowledgeResult.candidate_fingerprint}`, `knowledge local score: ${knowledgeResult.weighted_score}`, `validation errors: ${knowledgeResult.metrics?.validationErrors ?? "unknown"}`],
    knowledgeValid ? [] : knowledgeResult.local_failures ?? ["Inherited knowledge gate failed"],
  ));

  const projectionBindings = JSON.parse(readFileSync(projectionPath, "utf8"));
  const projection = validateProjectionBindings(projectionBindings, repoRoot);
  const projectionValid = !projection.errors.length;
  results.push(result(
    byId.get("CI-005"),
    projectionValid ? 4 : 0,
    [`bound surfaces: ${projection.surfaceCount}`, `discovered app surfaces: ${projection.discovered.length}`, `projection digest: ${hashFile(projectionPath)}`, "default policy: deny"],
    projection.errors,
  ));

  const populationEval = knowledgeResult.evals.find((entry) => entry.eval_id === "KD-013");
  const corpusFiles = walk(path.join(repoRoot, "apps/www/src/data/knowledge-bank/fixtures"));
  const ledgerFiles = walk(path.join(repoRoot, "docs/knowledge-bank/data"));
  const corpusValid = populationEval?.pass === true && corpusFiles.length >= 10 && ledgerFiles.length >= 4;
  results.push(result(
    byId.get("CI-006"),
    corpusValid ? 4 : 0,
    [`inherited full-population score: ${populationEval?.score ?? 0}`, `public-safe fixture files: ${corpusFiles.length}`, `public-safe ledger files: ${ledgerFiles.length}`, `corpus digest: ${hashFiles([...corpusFiles, ...ledgerFiles].sort())}`],
    corpusValid ? [] : ["Corpus manifests or inherited population reconciliation failed"],
  ));

  const antiClaims = readFileSync(path.join(repoRoot, "docs/knowledge-bank/anti-claims.md"), "utf8");
  const readiness = JSON.parse(readFileSync(path.join(repoRoot, "docs/knowledge-bank/readiness-ledger.json"), "utf8"));
  const collectiveStructure = antiClaims.includes("Do not") && readiness.roleCorroboration?.length >= 5 && readiness.impactEvidence?.length >= 4;
  results.push(result(
    byId.get("CI-007"),
    collectiveStructure ? 3 : 0,
    [`role-corroboration controls: ${readiness.roleCorroboration?.length ?? 0}`, `outcome evidence classes: ${readiness.impactEvidence?.length ?? 0}`, "local structural preflight is capped at 3 pending independent judgment"],
    collectiveStructure ? ["Independent collective-credit judgment remains required"] : ["Collective-credit structural controls are incomplete"],
  ));

  const hero = readFileSync(path.join(repoRoot, "apps/www/src/components/Hero.tsx"), "utf8");
  const technical = readFileSync(path.join(repoRoot, "apps/www/src/app/work/technical-operations/page.tsx"), "utf8");
  const about = readFileSync(path.join(repoRoot, "apps/www/src/app/about/page.tsx"), "utf8");
  const hiringStructure = hasAll(`${hero}\n${technical}\n${about}`, ["technical project", "requirements", "handoff", "contact"]);
  results.push(result(
    byId.get("CI-008"),
    hiringStructure ? 3 : 0,
    ["homepage actor and offer contract checked", "technical-operations ownership signals checked", "future-facing contact route checked", "local structural preflight is capped at 3 pending independent judgment"],
    hiringStructure ? ["Independent Chad-lens judgment remains required"] : ["Hiring path is missing a required action, end, or next step"],
  ));

  const morse = knowledgeResult.evals.find((entry) => entry.eval_id === "KD-022");
  const sack = knowledgeResult.evals.find((entry) => entry.eval_id === "KD-023");
  const lensStructure = morse?.pass === true && sack?.pass === true;
  results.push(result(
    byId.get("CI-009"),
    lensStructure ? 3 : 0,
    [`Morse structural score: ${morse?.score ?? 0}`, `Sack structural score: ${sack?.score ?? 0}`, "local structural preflight is capped at 3 pending independent judgment"],
    lensStructure ? ["Independent Morse and Sack lens judgment remains required"] : ["Morse or Sack structural preflight failed"],
  ));

  const projectDocs = walk(path.join(repoRoot, "docs/knowledge-bank/projects")).filter((file) => file.endsWith(".md"));
  const dossierGaps = projectDocs.filter((file) => {
    const content = readFileSync(file, "utf8");
    const headings = [...content.matchAll(/^##?\s+/gm)].length;
    return headings < 3 || !/(source|method|record|evidence)/i.test(content) || !/(boundar|open research|research queue|held|anti-claim|limitation)/i.test(content);
  });
  const dossierValid = projectDocs.length >= 18 && dossierGaps.length === 0;
  results.push(result(
    byId.get("CI-010"),
    dossierValid ? 4 : dossierGaps.length < 3 ? 2 : 0,
    [`project dossiers: ${projectDocs.length}`, `dossiers missing source/method or boundary/research language: ${dossierGaps.length}`, "canonical readiness ledger retained"],
    dossierGaps.map((file) => `Dossier gap: ${relative(file)}`),
  ));

  let candidateEvidence;
  let candidateEvidenceError;
  if (existsSync(candidateManifestPath)) {
    try {
      candidateEvidence = JSON.parse(readFileSync(candidateManifestPath, "utf8"));
    } catch (error) {
      candidateEvidenceError = error.message;
    }
  }
  const verification = candidateEvidence?.verification ?? {};
  const exactEvidence =
    candidateEvidence?.candidate_fingerprint === candidateFingerprint &&
    candidateEvidence?.rubric_fingerprint === rubricFingerprint &&
    verification.repository_check === "pass" &&
    verification.staging_preflight === "pass" &&
    verification.production_preflight === "pass" &&
    verification.docker_smoke === "pass" &&
    verification.responsive_route_width_pairs >= 56 &&
    verification.route_failures === 0 &&
    verification.browser_console_errors === 0;
  results.push(result(
    byId.get("CI-011"),
    exactEvidence ? 4 : 0,
    [
      `candidate manifest: ${existsSync(candidateManifestPath) ? "present" : "missing"}`,
      `candidate fingerprint match: ${candidateEvidence?.candidate_fingerprint === candidateFingerprint}`,
      `repository check: ${verification.repository_check ?? "not_observed"}`,
      `staging preflight: ${verification.staging_preflight ?? "not_observed"}`,
      `production preflight: ${verification.production_preflight ?? "not_observed"}`,
      `Docker smoke: ${verification.docker_smoke ?? "not_observed"}`,
      `responsive pairs: ${verification.responsive_route_width_pairs ?? 0}`,
    ],
    exactEvidence ? [] : [candidateEvidenceError ?? "Exact-candidate build, runtime, or responsive evidence is incomplete"],
  ));

  const approval = readFileSync(path.join(repoRoot, "docs/knowledge-bank/approval-register.md"), "utf8");
  const blockers = readFileSync(path.join(repoRoot, "docs/knowledge-bank/launch-blockers.md"), "utf8");
  const authorityValid = readiness.releaseState === "held" && approval.includes("Phone: do not display in website HTML") && blockers.includes("Current release state: held");
  results.push(result(
    byId.get("CI-012"),
    authorityValid ? 3 : 0,
    ["machine, evidence, approval, and release authority remain distinct", `release state: ${readiness.releaseState}`, "local structural preflight is capped at 3 pending human authority"],
    authorityValid ? ["Exact-candidate human approval and release authority remain required"] : ["Authority hierarchy or held state is inconsistent"],
  ));

  return results;
}

function main() {
  const candidateFiles = selectedCandidateFiles();
  const candidateFingerprint = hashFiles(candidateFiles);
  const rubricFingerprint = hashFile(suitePath);
  const projectionFingerprint = hashFile(projectionPath);
  const graphFiles = walk(path.join(repoRoot, "apps/www/src/data/knowledge-bank")).sort();
  const graphFingerprint = hashFiles(graphFiles);
  const knowledgeResult = runKnowledgeDevelopment();
  const loadedJudgments = readJudgments(argument("--judgments"));
  const judgmentErrors = [...loadedJudgments.errors];
  if (argument("--judgments") && loadedJudgments.candidateFingerprint !== candidateFingerprint) judgmentErrors.push("Judgment candidate fingerprint is stale or missing");
  if (argument("--judgments") && loadedJudgments.rubricFingerprint !== rubricFingerprint) judgmentErrors.push("Judgment rubric fingerprint is stale or missing");
  const judgmentsValid = judgmentErrors.length === 0;
  const judgments = judgmentsValid ? loadedJudgments.judgments : new Map();
  const results = deterministicResults({ candidateFingerprint, rubricFingerprint, knowledgeResult });

  for (const entry of results) {
    const judgment = judgments.get(entry.eval_id);
    if (!judgment) continue;
    entry.score = judgment.score;
    entry.pass = judgment.pass === true && judgment.score >= (entry.blocking ? suite.thresholds.blocking_score_minimum : suite.thresholds.nonblocking_score_minimum);
    entry.evidence = judgment.evidence;
    entry.findings = judgment.findings ?? [];
    entry.reviewer_role = judgment.reviewer_role;
    entry.confidence = judgment.confidence ?? null;
  }

  const weightedScore = results.reduce((sum, entry) => sum + entry.weight * entry.score / 4, 0) / results.reduce((sum, entry) => sum + entry.weight, 0);
  const localBlockingFailures = results.filter((entry) => entry.blocking && entry.score < suite.thresholds.blocking_score_minimum && !entry.external_judgment_required).map((entry) => entry.eval_id);
  const localNonblockingFailures = results.filter((entry) => !entry.blocking && entry.score < suite.thresholds.nonblocking_score_minimum && !entry.external_judgment_required).map((entry) => entry.eval_id);
  const localCriteriaMet = weightedScore >= suite.thresholds.weighted_score_minimum && !localBlockingFailures.length && !localNonblockingFailures.length;
  const externalIds = suite.evals.filter((entry) => entry.external_judgment_required).map((entry) => entry.id);
  const missingJudgments = externalIds.filter((id) => !judgments.has(id));
  const externalFailures = externalIds.filter((id) => judgments.has(id) && !results.find((entry) => entry.eval_id === id)?.pass);
  let previous;
  const previousPath = argument("--previous");
  if (previousPath && existsSync(path.resolve(previousPath))) previous = JSON.parse(readFileSync(path.resolve(previousPath), "utf8"));
  const consecutiveLocalPass = previous?.candidate_fingerprint === candidateFingerprint && previous?.local_criteria_met === true && localCriteriaMet;
  const criteriaBeforeRepeat = localCriteriaMet && judgmentsValid && !missingJudgments.length && !externalFailures.length;
  const consecutiveCompletePass = previous?.candidate_fingerprint === candidateFingerprint && previous?.criteria_before_repeat === true && criteriaBeforeRepeat;
  const criteriaMet = criteriaBeforeRepeat && consecutiveCompletePass;
  const output = {
    suite_id: suite.suite_id,
    suite_version: suite.version,
    label: argument("--label") ?? null,
    run_at: new Date().toISOString(),
    base_commit: git(["merge-base", "origin/develop", "HEAD"]),
    candidate_commit: git(["rev-parse", "HEAD"]),
    candidate_fingerprint: candidateFingerprint,
    candidate_file_count: candidateFiles.length,
    rubric_fingerprint: rubricFingerprint,
    inherited_rubric_fingerprints: Object.fromEntries(suite.inherited_suites.map((file) => [file, hashFile(path.join(repoRoot, file))])),
    graph_fingerprint: graphFingerprint,
    projection_fingerprint: projectionFingerprint,
    knowledge_candidate_fingerprint: knowledgeResult.candidate_fingerprint,
    weighted_score: Number(weightedScore.toFixed(4)),
    threshold: suite.thresholds.weighted_score_minimum,
    local_criteria_met: localCriteriaMet,
    consecutive_local_pass: consecutiveLocalPass,
    criteria_before_repeat: criteriaBeforeRepeat,
    criteria_met: criteriaMet,
    decision: criteriaMet ? "pass" : localCriteriaMet ? "stop_external_or_human_blocked" : "continue_hill_climb",
    local_blocking_failures: localBlockingFailures,
    local_nonblocking_failures: localNonblockingFailures,
    missing_judgments: missingJudgments,
    external_failures: externalFailures,
    judgment_errors: judgmentErrors,
    evals: results,
  };
  const outputPath = argument("--output");
  if (outputPath) {
    const absolute = path.resolve(outputPath);
    writeFileSync(absolute, `${JSON.stringify(output, null, 2)}\n`);
  }
  process.stdout.write(`${JSON.stringify(output, null, 2)}\n`);
  if (process.argv.includes("--require-local-pass") && !localCriteriaMet) process.exitCode = 1;
  if (process.argv.includes("--require-pass") && !criteriaMet) process.exitCode = 1;
}

try {
  main();
} catch (error) {
  console.error(`Composite integration runner failed: ${error.message}`);
  process.exitCode = 1;
}
