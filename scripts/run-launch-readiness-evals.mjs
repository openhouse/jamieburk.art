#!/usr/bin/env node

import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { validateKnowledgeIntake } from "./lib/knowledge-intake-validation.mjs";
import { validateFacebookEventsArchive } from
  "./lib/facebook-events-archive-validation.mjs";
import { validateWowListFacebookPosts } from
  "./lib/wowlist-facebook-posts-validation.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const suite = JSON.parse(readFileSync(path.join(repoRoot, "evals/launch-readiness/v16/evals.json"), "utf8"));
const args = process.argv.slice(2);
const strict = args.includes("--strict");
const observationIndex = args.indexOf("--observations");
const observationPaths = observationIndex >= 0
  ? (args[observationIndex + 1] ?? "").split(",").filter(Boolean)
  : [];

function read(relativePath) {
  return readFileSync(path.join(repoRoot, relativePath), "utf8");
}

function walk(relativeDir) {
  const absoluteDir = path.join(repoRoot, relativeDir);
  if (!existsSync(absoluteDir)) return [];
  const files = [];
  for (const entry of readdirSync(absoluteDir, { withFileTypes: true })) {
    const relative = path.join(relativeDir, entry.name);
    if (entry.isDirectory()) files.push(...walk(relative));
    else if (entry.isFile()) files.push(relative);
  }
  return files;
}

const sourceFiles = walk("apps/www/src").filter((file) => /\.(?:ts|tsx|md|mdx|json)$/.test(file));
const sourceText = sourceFiles.map((file) => read(file)).join("\n");

const deterministic = new Map();

const workSource = read("apps/www/src/data/work.ts");
const fairRentStart = workSource.indexOf('slug: "fair-rent-nyc"');
const fairRentEnd = workSource.indexOf('\n  {\n    title:', fairRentStart + 1);
const fairRentBlock = fairRentStart >= 0 ? workSource.slice(fairRentStart, fairRentEnd > fairRentStart ? fairRentEnd : undefined) : "";
const fairRentPass = /2017/.test(fairRentBlock) && !/years:\s*"2024-Present"/.test(fairRentBlock);
deterministic.set("FACT-001", {
  score: fairRentPass ? 1 : 0,
  passed: fairRentPass,
  evidence: fairRentPass
    ? ["FairRentNYC case metadata includes the 2017 coalition chronology without a 2024-only co-founder range."]
    : ["FairRentNYC case metadata still presents the combined co-founder case as 2024-Present while approved claims say 2017 onward."]
});

const recordsSource = read("apps/www/src/data/knowledge-bank/records.ts");
const hoursClaimStart = recordsSource.indexOf('id: "CLM-CALLNYC-HACKATHON-DATE-TIME"');
const hoursClaimEnd = recordsSource.indexOf('\n    {\n      id: "CLM-', hoursClaimStart + 1);
const hoursClaim = hoursClaimStart >= 0 ? recordsSource.slice(hoursClaimStart, hoursClaimEnd > hoursClaimStart ? hoursClaimEnd : undefined) : "";
const hoursPass = /Civic Hall announced[^\n]*1-3 p\.m\./i.test(hoursClaim) && !/Council held a 1-3 p\.m\./i.test(hoursClaim);
deterministic.set("FACT-002", {
  score: hoursPass ? 1 : 0,
  passed: hoursPass,
  evidence: hoursPass
    ? ["The active CallNYC projection attributes 1-3 p.m. to Civic Hall's announcement."]
    : ["The active CallNYC projection does not preserve announced-hours attribution or still states the window as observed duration."]
});

const misleadingResumeAction = /href=(?:"\/resume"|\{["']\/resume["']\})[\s\S]{0,180}>[\s\S]{0,80}Download resume(?! PDF)/i.test(sourceText);
deterministic.set("CTA-001", {
  score: misleadingResumeAction ? 0 : 1,
  passed: !misleadingResumeAction,
  evidence: misleadingResumeAction
    ? ["At least one action labeled Download resume points to the /resume HTML route."]
    : ["No action labeled Download resume points to the /resume HTML route."]
});

const intakeValidation = validateKnowledgeIntake();
for (const [criterionId, checkName] of [
  ["INTAKE-001", "coverage"],
  ["RESEARCH-001", "research"],
  ["ARCHIVE-001", "archiveProduction"],
  ["GDRIVE-001", "sharedDriveProduction"],
  ["SOCIAL-001", "socialMediaProduction"],
  ["NYCARTC-001", "nycArtCXArchivalProduction"],
  ["URBANHERM-001", "urbanhermitProduction"],
  ["KCTH-001", "kcTownHall"],
  ["PRESS-001", "press"],
  ["DISPOSITION-001", "disposition"],
  ["PROJECTION-001", "projection"]
]) {
  const check = intakeValidation.checks[checkName];
  deterministic.set(criterionId, {
    score: check.passed ? 1 : 0,
    passed: check.passed,
    evidence: check.passed ? [check.evidence] : check.errors
  });
}

const facebookEventValidation = validateFacebookEventsArchive();
deterministic.set("FBEVENT-001", {
  score: facebookEventValidation.passed ? 1 : 0,
  passed: facebookEventValidation.passed,
  evidence: facebookEventValidation.passed
    ? [facebookEventValidation.evidence]
    : facebookEventValidation.errors
});

const wowListFacebookPostValidation = validateWowListFacebookPosts();
deterministic.set("WOWFB-001", {
  score: wowListFacebookPostValidation.passed ? 1 : 0,
  passed: wowListFacebookPostValidation.passed,
  evidence: wowListFacebookPostValidation.passed
    ? [wowListFacebookPostValidation.evidence]
    : wowListFacebookPostValidation.errors
});

const criteriaById = new Map(suite.criteria.map((criterion) => [criterion.id, criterion]));
const observationErrors = [];
const observationMetas = observationPaths.map((observationPath) => {
  const absolute = path.resolve(repoRoot, observationPath);
  const meta = JSON.parse(readFileSync(absolute, "utf8"));

  if (meta.suite !== suite.suite) observationErrors.push(`${observationPath}: suite does not match`);
  if (meta.suiteVersion !== suite.version) observationErrors.push(`${observationPath}: suiteVersion does not match`);
  if (!meta.runId || /replace-with/.test(meta.runId)) observationErrors.push(`${observationPath}: runId is missing or placeholder`);
  if (!/^[0-9a-f]{40}$/i.test(meta.commit ?? "")) observationErrors.push(`${observationPath}: commit must be a full Git SHA`);
  if (!Array.isArray(meta.results)) observationErrors.push(`${observationPath}: results must be an array`);

  for (const result of meta.results ?? []) {
    const criterion = criteriaById.get(result.criterionId);
    if (!criterion) {
      observationErrors.push(`${observationPath}: unknown criterion ${result.criterionId}`);
      continue;
    }
    if (criterion.layer === "deterministic") {
      observationErrors.push(`${observationPath}: deterministic criterion ${result.criterionId} may not be self-reported`);
    }
    if (typeof result.score !== "number" || result.score < 0 || result.score > 1) {
      observationErrors.push(`${observationPath}: ${result.criterionId} score must be between 0 and 1`);
    }
    if (typeof result.passed !== "boolean") {
      observationErrors.push(`${observationPath}: ${result.criterionId} passed must be boolean`);
    }
    if (!Array.isArray(result.evidence) || result.evidence.length === 0) {
      observationErrors.push(`${observationPath}: ${result.criterionId} needs visible evidence`);
    }
    if (!result.grader?.type || !result.grader?.name || !result.grader?.runId) {
      observationErrors.push(`${observationPath}: ${result.criterionId} needs grader type, name, and runId`);
    }
  }

  return meta;
});

function indexObservations(observations) {
  const observedById = new Map();
  for (const result of observations) {
    const list = observedById.get(result.criterionId) ?? [];
    list.push(result);
    observedById.set(result.criterionId, list);
  }
  return observedById;
}

function resolveResult(criterion, observedById) {
  if (deterministic.has(criterion.id)) return { ...deterministic.get(criterion.id), source: "deterministic" };
  const candidates = observedById.get(criterion.id) ?? [];
  if (!candidates.length) return { score: null, passed: false, source: "unobserved", evidence: [] };

  const expectedType = {
    browser: "browser",
    semantic: "llm",
    runtime: "runtime",
    human: "human"
  }[criterion.layer];
  const typedCandidates = candidates.filter((item) => item.grader?.type === expectedType);
  const requiredGraders = criterion.layer === "semantic"
    ? suite.target.requiredIndependentSemanticGraders
    : 1;
  const independentGraders = new Set(typedCandidates.map((item) => item.grader?.runId));

  if (independentGraders.size < requiredGraders) {
    return {
      score: null,
      passed: false,
      source: "invalid-observation",
      evidence: [`${criterion.name} requires ${requiredGraders} independent ${expectedType} grader(s).`]
    };
  }

  const score = Math.min(...typedCandidates.map((item) => Number(item.score)));
  const passed = typedCandidates.every((item) => item.passed === true) && score >= (criterion.gate === "scored" ? suite.target.minimumScoredCriterion : 1);
  return {
    score,
    passed,
    source: "observation",
    evidence: typedCandidates.flatMap((item) => item.evidence ?? [])
  };
}

function evaluateRun(observationMeta) {
  const observedById = indexObservations(observationMeta?.results ?? []);
  const results = suite.criteria.map((criterion) => ({ criterion, result: resolveResult(criterion, observedById) }));
  const hard = results.filter(({ criterion }) => criterion.gate === "hard");
  const scored = results.filter(({ criterion }) => criterion.gate === "scored");
  const hardPassed = hard.filter(({ result }) => result.passed).length;
  const observedScored = scored.filter(({ result }) => result.score !== null);
  const weightedScore = observedScored.length === scored.length
    ? scored.reduce((total, { criterion, result }) => total + criterion.weight * result.score, 0)
    : null;
  const minimumScore = observedScored.length === scored.length
    ? Math.min(...scored.map(({ result }) => result.score))
    : null;
  const targetReached =
    hardPassed === hard.length &&
    weightedScore !== null &&
    weightedScore >= suite.target.minimumWeightedScore &&
    minimumScore !== null &&
    minimumScore >= suite.target.minimumScoredCriterion;

  return { observationMeta, results, hard, hardPassed, weightedScore, minimumScore, targetReached };
}

const runSummaries = observationMetas.length
  ? observationMetas.map(evaluateRun)
  : [evaluateRun(null)];

console.log(`# ${suite.suite} v${suite.version}`);
for (const summary of runSummaries) {
  if (summary.observationMeta) console.log(`\nRun: ${summary.observationMeta.runId} at ${summary.observationMeta.commit}`);
  console.log("");
  for (const { criterion, result } of summary.results) {
    const state = result.source === "unobserved" ? "UNOBSERVED" : result.passed ? "PASS" : "FAIL";
    const score = result.score === null ? "-" : result.score.toFixed(2);
    console.log(`${state}\t${criterion.id}\t${score}\t${criterion.name}`);
    for (const evidence of result.evidence ?? []) console.log(`  - ${evidence}`);
  }
  console.log("");
  console.log(`Hard gates: ${summary.hardPassed}/${summary.hard.length}`);
  console.log(`Weighted score: ${summary.weightedScore === null ? "incomplete" : summary.weightedScore.toFixed(3)}`);
  console.log(`Minimum scored criterion: ${summary.minimumScore === null ? "incomplete" : summary.minimumScore.toFixed(3)}`);
  console.log(`Single-run target: ${summary.targetReached ? "reached" : "not reached"}`);
}

if (observationErrors.length) {
  console.log("\nInvalid observation evidence:");
  for (const error of observationErrors) console.log(`- ${error}`);
}

const realSummaries = runSummaries.filter((summary) => summary.observationMeta);
const uniqueRunIds = new Set(realSummaries.map((summary) => summary.observationMeta.runId));
const uniqueCommits = new Set(realSummaries.map((summary) => summary.observationMeta.commit));
const releaseTargetReached =
  observationErrors.length === 0 &&
  realSummaries.length >= suite.target.requiredConsecutivePassingRuns &&
  uniqueRunIds.size === realSummaries.length &&
  uniqueCommits.size === 1 &&
  realSummaries.every((summary) => summary.targetReached);

console.log(`\nRelease target: ${releaseTargetReached ? "reached" : "not reached"}`);
console.log(`Requires ${suite.target.requiredConsecutivePassingRuns} passing run files for one commit; pass comma-separated paths to --observations.`);

if (strict && !releaseTargetReached) process.exit(1);
