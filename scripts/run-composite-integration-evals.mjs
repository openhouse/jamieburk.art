#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  evaluateBranchLedger,
  evaluateCanonicalArchitecture,
  evaluateGovernance,
  evaluateReviewability,
  evaluateSemanticFixtures,
  findPrivatePaths,
  fingerprintPaths,
  scoreRubrics,
  validateCompositeSuite,
  validateJudgments
} from "./lib/composite-integration-evals.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const jsonOnly = args.includes("--json");
const noReport = args.includes("--no-report");
const skipRegression = args.includes("--skip-regression");

function readJson(relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);
  return existsSync(absolutePath) ? JSON.parse(readFileSync(absolutePath, "utf8")) : null;
}

function git(args) {
  return execFileSync("git", args, {
    cwd: repoRoot,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"]
  }).trim();
}

function diffStats(baseRef) {
  const output = git(["diff", "--numstat", `${baseRef}...HEAD`]);
  const rows = output.split("\n").filter(Boolean).map((line) => {
    const [added, deleted, ...parts] = line.split("\t");
    return {
      added: added === "-" ? 0 : Number(added),
      deleted: deleted === "-" ? 0 : Number(deleted),
      path: parts.join("\t")
    };
  });
  return {
    baseRef,
    changedFiles: rows.length,
    addedLines: rows.reduce((total, row) => total + row.added, 0),
    deletedLines: rows.reduce((total, row) => total + row.deleted, 0),
    maximumSingleFileAddedLines: Math.max(0, ...rows.map((row) => row.added)),
    largestAddedFile: [...rows].sort((a, b) => b.added - a.added)[0]?.path ?? null
  };
}

function runNode(relativePath, commandArgs = []) {
  try {
    const output = execFileSync(process.execPath, [path.join(repoRoot, relativePath), ...commandArgs], {
      cwd: repoRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"]
    });
    return { id: relativePath, status: "pass", evidence: output.trim().split("\n").at(-1) ?? "passed" };
  } catch (error) {
    return {
      id: relativePath,
      status: "fail",
      evidence: `${error.stdout ?? ""}\n${error.stderr ?? ""}`.trim() || error.message
    };
  }
}

const suitePath = "evals/composite-integration/suite.json";
const suite = readJson(suitePath);
const suiteFindings = validateCompositeSuite(suite);
if (suiteFindings.length) {
  console.error("Composite integration suite is invalid:");
  suiteFindings.forEach((finding) => console.error(`- ${finding}`));
  process.exit(1);
}

const headSha = git(["rev-parse", "HEAD"]);
const candidate = fingerprintPaths(repoRoot, suite.candidatePaths, suite.candidateIgnorePaths);
const contract = fingerprintPaths(repoRoot, suite.contractPaths);
const ledger = readJson(suite.ledgerPath);
const branchLedger = evaluateBranchLedger(suite, ledger);
const canonicalArchitecture = evaluateCanonicalArchitecture(repoRoot, suite);
const fixtures = readJson(suite.semanticFixturePath) ?? [];
const semanticIntegrity = evaluateSemanticFixtures(suite, fixtures);
const governance = evaluateGovernance(suite, readJson(suite.governancePath));

const historyPath = path.join(repoRoot, suite.historyPath);
const historyText = existsSync(historyPath) ? readFileSync(historyPath, "utf8") : "";
const historyEvents = historyText.split("\n").filter(Boolean).flatMap((line) => {
  try { return [JSON.parse(line)]; } catch { return []; }
});
const lifecycleMissing = suite.requiredLifecycleFiles.filter((file) => !existsSync(path.join(repoRoot, file)));
const missingEventTypes = suite.requiredHistoryEventTypes.filter((type) => !historyEvents.some((event) => event.type === type));
const privateFindings = findPrivatePaths({ ledger, history: historyText, governance });
const appendOnlyLifecycle = {
  passed: lifecycleMissing.length === 0 && missingEventTypes.length === 0 && privateFindings.length === 0,
  findings: [
    ...lifecycleMissing.map((file) => `Missing lifecycle file ${file}`),
    ...missingEventTypes.map((type) => `Missing lifecycle event type ${type}`),
    ...privateFindings.map((label) => `Private path detected in ${label}`)
  ]
};

const judgmentDirectory = path.join(repoRoot, suite.judgmentDirectory);
const judgments = existsSync(judgmentDirectory)
  ? readdirSync(judgmentDirectory).filter((file) => file.endsWith(".json")).map((file) => readJson(path.join(suite.judgmentDirectory, file)))
  : [];
const judgmentResult = validateJudgments({ judgments, suite, candidate, contract });

const inheritedStats = diffStats("origin/develop");
const integrationStats = diffStats(suite.startSha);
const reviewability = evaluateReviewability(integrationStats, suite.reviewabilityThresholds);

const regressions = skipRegression ? [] : [
  runNode("scripts/check-citations.mjs"),
  runNode("scripts/check-knowledge-bank.mjs"),
  runNode("scripts/run-knowledge-lifecycle-evals.mjs", ["--json", "--no-report"]),
  runNode("scripts/check-public-safety.mjs"),
  runNode("scripts/check-routes.mjs"),
  runNode("scripts/run-portfolio-evals.mjs", ["--profile", "application_ready", "--json", "--no-report"])
];
const noRegression = {
  passed: skipRegression || regressions.every((item) => item.status === "pass"),
  findings: regressions.filter((item) => item.status !== "pass").map((item) => `${item.id}: ${item.evidence}`)
};
const projectionCheckIds = new Set([
  "scripts/check-citations.mjs",
  "scripts/check-knowledge-bank.mjs",
  "scripts/check-public-safety.mjs"
]);
const projectionChecks = regressions.filter((item) => projectionCheckIds.has(item.id));
const projectionPassed =
  privateFindings.length === 0 &&
  (skipRegression || projectionChecks.every((item) => item.status === "pass"));

const hardGates = {
  frozen_source_integrity: {
    status: branchLedger.frozenSourcePassed ? "pass" : "fail",
    evidence: branchLedger.findings.join("; ") || "All frozen branch SHAs match the contract"
  },
  branch_family_accounting: {
    status: branchLedger.accountingPassed ? "pass" : "fail",
    evidence: branchLedger.findings.join("; ") || "A through N have explicit dispositions"
  },
  canonical_architecture: {
    status: canonicalArchitecture.passed ? "pass" : "fail",
    evidence: canonicalArchitecture.findings.join("; ") || "One canonical knowledge and eval architecture remains"
  },
  append_only_lifecycle: {
    status: appendOnlyLifecycle.passed ? "pass" : "fail",
    evidence: appendOnlyLifecycle.findings.join("; ") || `${historyEvents.length} append-only event(s) and an operable command surface`
  },
  semantic_claim_integrity: {
    status: semanticIntegrity.passed ? "pass" : "fail",
    evidence: semanticIntegrity.findings.join("; ") || `${fixtures.length} adversarial mutations rejected`
  },
  projection_restraint: {
    status: projectionPassed ? "pass" : "fail",
    evidence: privateFindings.length
      ? `Private paths in ${privateFindings.join(", ")}`
      : projectionChecks.some((item) => item.status !== "pass")
        ? projectionChecks.filter((item) => item.status !== "pass").map((item) => `${item.id}: ${item.evidence}`).join("; ")
        : "Citation, knowledge, and public-safety boundaries pass"
  },
  candidate_binding: {
    status: judgmentResult.passed ? "pass" : "fail",
    evidence: judgmentResult.findings.join("; ") || `${judgmentResult.valid.length} valid candidate-bound judgments`
  },
  reviewability_accounting: {
    status: reviewability.passed ? "pass" : "fail",
    evidence: reviewability.findings.join("; ") || `${integrationStats.changedFiles} integration files; inherited delta reported separately`
  },
  no_regression: {
    status: noRegression.passed ? "pass" : "fail",
    evidence: noRegression.findings.join("; ") || `${regressions.length || "skipped"} canonical checks passed`
  },
  governance_honesty: {
    status: governance.passed ? "pass" : "fail",
    evidence: governance.findings.join("; ") || "Deterministic, model, human, rights, production, and approval layers remain distinct"
  }
};

const { scores, weightedScore } = scoreRubrics(suite, hardGates);
const profile = suite.profiles.integration_ready;
const failedHardGates = suite.requiredHardGates.filter((id) => hardGates[id]?.status !== "pass");
const failedRubrics = suite.rubrics.filter((rubric) => scores[rubric.id] < profile.minimumRubricScore).map((rubric) => rubric.id);
const passed = weightedScore >= profile.minimumWeightedScore && failedHardGates.length === 0 && failedRubrics.length === 0;
const baseline = readJson(suite.baselineRecord);
const result = {
  suite: suite.id,
  profile: "integration_ready",
  headSha,
  candidate,
  contract,
  baselineCandidate: baseline?.candidate ?? null,
  score: weightedScore,
  threshold: profile.minimumWeightedScore,
  passed,
  scores,
  hardGates,
  failedHardGates,
  failedRubrics,
  reviewStats: { inheritedFromDevelop: inheritedStats, integrationFromStart: integrationStats },
  regressions,
  evaluatedAt: new Date().toISOString(),
  nextAction: passed
    ? `Repeat unchanged until ${profile.consecutivePassingRuns} consecutive runs agree, then stop for human review.`
    : hardGates[failedHardGates[0]]?.evidence ?? "Address the highest-value failing gate."
};

if (!noReport) {
  const reportDirectory = path.join(repoRoot, "reports/generated");
  mkdirSync(reportDirectory, { recursive: true });
  writeFileSync(path.join(reportDirectory, "composite-integration.json"), `${JSON.stringify(result, null, 2)}\n`);
}

if (jsonOnly) console.log(JSON.stringify(result, null, 2));
else {
  console.log(`Composite integration eval: ${result.profile}`);
  console.log(`Score: ${result.score} / 100 (threshold ${result.threshold})`);
  console.log(`Result: ${result.passed ? "PASS" : "FAIL"}`);
  for (const [id, gate] of Object.entries(hardGates)) console.log(`- ${id}: ${gate.status} - ${gate.evidence}`);
  console.log(`Candidate: ${candidate}`);
  console.log(`Contract: ${contract}`);
  console.log(`Next action: ${result.nextAction}`);
}

if (!passed) process.exit(1);
