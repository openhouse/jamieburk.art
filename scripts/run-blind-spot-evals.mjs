#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { knowledgeBank } from "../apps/www/src/data/knowledge-bank/records.ts";
import {
  evaluateArchiveDenominators,
  evaluateDecisiveNarrative,
  evaluateHumanReaderValidation,
  evaluateProductionRelease,
  evaluatePromotionDiscipline,
  evaluateReviewability,
  evaluateRoleAttribution,
  evaluateVisualEvidence,
  profileBlindSpotResults,
  validateBlindSpotSuite
} from "./lib/blind-spot-evals.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const profileArg = args.indexOf("--profile");
const profileId = profileArg >= 0 ? args[profileArg + 1] : "diagnostic";
const jsonOnly = args.includes("--json");
const writeReport = !args.includes("--no-report");
const suitePath = path.join(repoRoot, "evals/blind-spots/suite.json");
const suite = JSON.parse(readFileSync(suitePath, "utf8"));
const suiteFindings = validateBlindSpotSuite(suite);

if (suiteFindings.length) {
  console.error("Blind-spot suite is invalid:");
  suiteFindings.forEach((finding) => console.error(`- ${finding}`));
  process.exit(1);
}

if (!suite.profiles[profileId]) {
  console.error(`Unknown blind-spot profile: ${profileId}`);
  process.exit(1);
}

function readJsonIfPresent(relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);
  if (!existsSync(absolutePath)) return null;
  return JSON.parse(readFileSync(absolutePath, "utf8"));
}

function runPortfolioEval() {
  try {
    return JSON.parse(
      execFileSync(
        process.execPath,
        ["scripts/run-portfolio-evals.mjs", "--profile", "application_ready", "--json", "--no-report"],
        { cwd: repoRoot, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }
      )
    );
  } catch (error) {
    try {
      return JSON.parse(String(error.stdout ?? ""));
    } catch {
      return null;
    }
  }
}

function gitOutput(args) {
  return execFileSync("git", args, {
    cwd: repoRoot,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"]
  }).trim();
}

function reviewStats(baseRef) {
  const lines = gitOutput(["diff", "--numstat", `${baseRef}...HEAD`])
    .split("\n")
    .filter(Boolean)
    .map((line) => {
      const [added, deleted, ...pathParts] = line.split("\t");
      return {
        added: added === "-" ? 0 : Number(added),
        deleted: deleted === "-" ? 0 : Number(deleted),
        path: pathParts.join("\t")
      };
    });
  return {
    baseRef,
    changedFiles: lines.length,
    addedLines: lines.reduce((total, item) => total + item.added, 0),
    deletedLines: lines.reduce((total, item) => total + item.deleted, 0),
    maximumSingleFileAddedLines: Math.max(0, ...lines.map((item) => item.added)),
    largestAddedFile: [...lines].sort((a, b) => b.added - a.added)[0]?.path ?? null,
    paths: lines.map((item) => item.path).sort()
  };
}

function contractFingerprint() {
  const hash = createHash("sha256");
  for (const relativePath of [
    "evals/blind-spots/suite.json",
    "docs/evals/blind-spots.md",
    "scripts/lib/blind-spot-evals.mjs",
    "scripts/run-blind-spot-evals.mjs",
    "scripts/tests/blind-spot-evals.test.mjs"
  ]) {
    hash.update(relativePath);
    hash.update("\0");
    hash.update(readFileSync(path.join(repoRoot, relativePath)));
    hash.update("\0");
  }
  return `sha256:${hash.digest("hex")}`;
}

const headSha = gitOutput(["rev-parse", "HEAD"]);
const portfolioReport = runPortfolioEval();
const candidate = portfolioReport?.candidate ?? `git:${headSha}`;
const stats = reviewStats("origin/develop");
const visualEvidence = readJsonIfPresent(suite.evidencePaths.visual);
const humanEvidence = readJsonIfPresent(suite.evidencePaths.humanReaders);
const reviewabilityEvidence = readJsonIfPresent(suite.evidencePaths.reviewability);
const promotionEvidence = readJsonIfPresent(suite.evidencePaths.promotion);

const results = [
  evaluateVisualEvidence({
    suite,
    evidence: visualEvidence,
    candidate,
    fileExists: (publicPath) => existsSync(path.join(repoRoot, publicPath.replace(/^\//, "")))
  }),
  evaluateDecisiveNarrative({ portfolioReport }),
  evaluateRoleAttribution({ suite, knowledgeBank }),
  evaluateArchiveDenominators({ suite, knowledgeBank }),
  evaluateHumanReaderValidation({ suite, evidence: humanEvidence, candidate }),
  evaluateReviewability({ suite, stats, evidence: reviewabilityEvidence, headSha }),
  evaluateProductionRelease({ env: process.env, headSha }),
  evaluatePromotionDiscipline({ suite, knowledgeBank, evidence: promotionEvidence })
];
const profile = profileBlindSpotResults({ suite, profileId, results });
const report = {
  suite: suite.id,
  profile: profileId,
  candidate,
  headSha,
  contract: contractFingerprint(),
  evaluatedAt: new Date().toISOString(),
  passed: profile.passed,
  closurePassed: profile.closurePassed,
  counts: profile.counts,
  missing: profile.missing,
  invalid: profile.invalid,
  closureFailures: profile.closureFailures,
  reviewStats: stats,
  results,
  nextAction: profile.closurePassed
    ? "Stop: every named blind spot has current closure evidence."
    : "Use the diagnostic to select one open blind spot; do not reinterpret diagnostic completion as closure."
};

if (writeReport) {
  const reportDir = path.join(repoRoot, "reports/generated");
  mkdirSync(reportDir, { recursive: true });
  writeFileSync(path.join(reportDir, `blind-spots-${profileId}.json`), `${JSON.stringify(report, null, 2)}\n`);
}

if (jsonOnly) {
  console.log(JSON.stringify(report, null, 2));
} else {
  console.log(`Blind-spot eval: ${profileId}`);
  console.log(`Result: ${report.passed ? "PASS" : "FAIL"}`);
  console.log(`Closure: ${report.closurePassed ? "PASS" : "OPEN"}`);
  for (const result of results) {
    console.log(`- ${result.id}: ${result.status} - ${result.summary}`);
  }
  console.log(`Next action: ${report.nextAction}`);
}

process.exitCode = report.passed ? 0 : 1;
