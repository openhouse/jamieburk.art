#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { parseArgs } from "node:util";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const { values } = parseArgs({
  options: {
    rubric: { type: "string", default: "evals/portfolio-readiness/rubric.json" },
    profile: { type: "string", default: "fast" },
    scorecard: { type: "string" },
    "confirming-scorecard": { type: "string" },
    output: { type: "string" },
    json: { type: "boolean", default: false },
    "skip-commands": { type: "boolean", default: false }
  }
});

const rubricPath = path.resolve(repoRoot, values.rubric);
const rubric = JSON.parse(readFileSync(rubricPath, "utf8"));
const allowedRecommendations = new Set(
  rubric.recommendations ?? ["iterate", "application-ready", "production-ready"]
);

if (!new Set(["fast", "release"]).has(values.profile)) {
  console.error(`Unknown profile: ${values.profile}. Use fast or release.`);
  process.exit(2);
}

function filesUnder(relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);
  if (!existsSync(absolutePath)) return [];
  if (statSync(absolutePath).isFile()) return [absolutePath];

  return readdirSync(absolutePath, { withFileTypes: true }).flatMap((entry) => {
    const child = path.join(relativePath, entry.name);
    return entry.isDirectory() ? filesUnder(child) : [path.join(repoRoot, child)];
  });
}

function checkText(check, shouldMatch) {
  const targets = (check.paths ?? [check.path]).flatMap(filesUnder);
  if (targets.length === 0) return { passed: false, detail: "No target files found." };

  const pattern = new RegExp(check.pattern, "i");
  const matchingFiles = targets.filter((file) => {
    try {
      return pattern.test(readFileSync(file, "utf8"));
    } catch {
      return false;
    }
  });
  const passed = shouldMatch ? matchingFiles.length > 0 : matchingFiles.length === 0;

  return {
    passed,
    detail: passed
      ? shouldMatch
        ? `Matched in ${path.relative(repoRoot, matchingFiles[0])}.`
        : `No prohibited match in ${targets.length} files.`
      : shouldMatch
        ? "Required pattern was not found."
        : `Prohibited pattern matched ${matchingFiles.map((file) => path.relative(repoRoot, file)).join(", ")}.`
  };
}

function runCheck(check) {
  if (check.type === "command") {
    if (values["skip-commands"]) {
      return {
        passed: false,
        skipped: true,
        detail: "Skipped by --skip-commands; this gate cannot satisfy the stop condition."
      };
    }

    const result = spawnSync(check.command, {
      cwd: repoRoot,
      encoding: "utf8",
      shell: true,
      stdio: values.json ? "pipe" : "inherit"
    });
    return {
      passed: result.status === 0,
      detail: result.status === 0
        ? "Command passed."
        : `Command exited ${result.status ?? "without a status"}.`,
      output: values.json ? `${result.stdout ?? ""}${result.stderr ?? ""}`.trim() : undefined
    };
  }

  if (check.type === "file") {
    const absolutePath = path.join(repoRoot, check.path);
    if (!existsSync(absolutePath)) return { passed: false, detail: `${check.path} is missing.` };
    const size = statSync(absolutePath).size;
    return {
      passed: size >= (check.minimumBytes ?? 1),
      detail: `${check.path} is ${size} bytes.`
    };
  }

  if (check.type === "files") {
    const missing = check.paths.filter((item) => !existsSync(path.join(repoRoot, item)));
    return {
      passed: missing.length === 0,
      detail: missing.length === 0
        ? `${check.paths.length} required files are present.`
        : `Missing: ${missing.join(", ")}.`
    };
  }

  if (check.type === "text-match") return checkText(check, true);
  if (check.type === "text-not-match") return checkText(check, false);

  return { passed: false, detail: `Unsupported check type: ${check.type}.` };
}

function validateRubric() {
  const failures = [];
  const ids = new Set();
  const weight = rubric.criteria.reduce((sum, criterion) => sum + criterion.weight, 0);

  if (weight !== 100) failures.push(`Criterion weights total ${weight}, expected 100.`);
  for (const criterion of rubric.criteria) {
    if (ids.has(criterion.id)) failures.push(`Duplicate criterion ID: ${criterion.id}.`);
    ids.add(criterion.id);
    if (criterion.minimumScore < 1 || criterion.minimumScore > 5) {
      failures.push(`${criterion.id} has an invalid minimum score.`);
    }
  }
  return failures;
}

function scoreScorecard(scorecardPath) {
  const scorecard = JSON.parse(readFileSync(path.resolve(repoRoot, scorecardPath), "utf8"));
  const errors = [];
  const entries = new Map(scorecard.criteria?.map((item) => [item.id, item]) ?? []);

  if (scorecard.evalId !== rubric.id) errors.push(`Scorecard evalId must be ${rubric.id}.`);
  if (entries.size !== rubric.criteria.length) {
    errors.push(`Scorecard must contain exactly ${rubric.criteria.length} unique criteria.`);
  }
  if (!allowedRecommendations.has(scorecard.releaseRecommendation)) {
    errors.push("Scorecard releaseRecommendation is invalid.");
  }

  let weightedScore = 0;
  const belowMinimum = [];
  const criticalFailures = [];

  for (const criterion of rubric.criteria) {
    const entry = entries.get(criterion.id);
    if (!entry) {
      errors.push(`Missing criterion: ${criterion.id}.`);
      continue;
    }
    if (!Number.isInteger(entry.score) || entry.score < 1 || entry.score > 5) {
      errors.push(`${criterion.id} score must be an integer from 1 to 5.`);
      continue;
    }
    const minimumEvidence = criterion.minimumEvidence ?? 2;
    if (!Array.isArray(entry.evidence) || entry.evidence.length < minimumEvidence) {
      errors.push(`${criterion.id} needs at least ${minimumEvidence} evidence observations.`);
    }
    for (const field of criterion.dimensionFields ?? []) {
      if (!entry.dimensionFindings?.[field]) {
        errors.push(`${criterion.id} is missing dimensionFindings.${field}.`);
      }
    }
    if (!entry.repair) errors.push(`${criterion.id} needs a repair recommendation.`);
    if (!entry.antiGamingCheck) errors.push(`${criterion.id} needs an antiGamingCheck.`);

    weightedScore += (entry.score / 5) * criterion.weight;
    if (entry.score < criterion.minimumScore) belowMinimum.push(criterion.id);
    if (criterion.critical && entry.score < rubric.stopCondition.criticalCriteriaAtLeast) {
      criticalFailures.push(criterion.id);
    }
  }

  return {
    errors,
    weightedScore: Number(weightedScore.toFixed(1)),
    belowMinimum,
    criticalFailures,
    releaseRecommendation: scorecard.releaseRecommendation
  };
}

function scorecardPasses(result) {
  const passingRecommendations = new Set(
    rubric.passingRecommendations ?? rubric.recommendations ?? []
  );
  return (
    result.errors.length === 0 &&
    result.weightedScore >= rubric.stopCondition.weightedScoreAtLeast &&
    result.belowMinimum.length === 0 &&
    result.criticalFailures.length === 0 &&
    (passingRecommendations.size === 0 ||
      passingRecommendations.has(result.releaseRecommendation))
  );
}

const rubricFailures = validateRubric();
const selectedChecks = rubric.deterministicChecks.filter((check) =>
  check.profiles.includes(values.profile)
);
const results = selectedChecks.map((check) => ({ ...check, ...runCheck(check) }));
const failedChecks = results.filter((result) => !result.passed);
const scorecardResult = values.scorecard ? scoreScorecard(values.scorecard) : null;
const confirmingScorecardResult = values["confirming-scorecard"]
  ? scoreScorecard(values["confirming-scorecard"])
  : null;

const scorePass = scorecardResult ? scorecardPasses(scorecardResult) : null;
const confirmingScorePass = confirmingScorecardResult
  ? scorecardPasses(confirmingScorecardResult)
  : null;
const stableScorecards =
  scorecardResult && confirmingScorecardResult
    ? scorePass === true &&
      confirmingScorePass === true &&
      Math.abs(scorecardResult.weightedScore - confirmingScorecardResult.weightedScore) <= 2 &&
      scorecardResult.releaseRecommendation === confirmingScorecardResult.releaseRecommendation
    : false;

const report = {
  evalId: rubric.id,
  profile: values.profile,
  rubricValid: rubricFailures.length === 0,
  rubricFailures,
  deterministic: {
    passed: failedChecks.length === 0,
    checks: results.map(({ id, description, passed, skipped, detail, output }) => ({
      id,
      description,
      passed,
      skipped: skipped ?? false,
      detail,
      ...(output ? { output } : {})
    }))
  },
  scorecard: scorecardResult
    ? { passed: scorePass, target: rubric.stopCondition.weightedScoreAtLeast, ...scorecardResult }
    : null,
  confirmingScorecard: confirmingScorecardResult
    ? {
        passed: confirmingScorePass,
        target: rubric.stopCondition.weightedScoreAtLeast,
        ...confirmingScorecardResult
      }
    : null,
  stableScorecards,
  criterionCount: rubric.criteria.length,
  stopConditionReached:
    failedChecks.length === 0 &&
    rubricFailures.length === 0 &&
    scorePass === true &&
    stableScorecards,
  humanApprovalStillRequired:
    rubric.stopCondition.explicitHumanApprovalRequiredForProduction ?? false
};

if (values.output) {
  const outputPath = path.resolve(repoRoot, values.output);
  writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`);
  if (!values.json) console.log(`Wrote eval report to ${outputPath}.`);
}

if (values.json) {
  console.log(JSON.stringify(report, null, 2));
} else {
  console.log(`\n${rubric.title} (${values.profile})`);
  for (const result of results) {
    const status = result.skipped ? "SKIP" : result.passed ? "PASS" : "FAIL";
    console.log(`${status} ${result.id}: ${result.detail}`);
  }
  for (const failure of rubricFailures) console.log(`FAIL rubric: ${failure}`);
  if (scorecardResult) {
    console.log(
      `\nWeighted score: ${scorecardResult.weightedScore}/100 (target ${rubric.stopCondition.weightedScoreAtLeast})`
    );
    for (const error of scorecardResult.errors) console.log(`FAIL scorecard: ${error}`);
    if (scorecardResult.belowMinimum.length > 0) {
      console.log(`Below minimum: ${scorecardResult.belowMinimum.join(", ")}`);
    }
    if (scorecardResult.criticalFailures.length > 0) {
      console.log(`Critical failures: ${scorecardResult.criticalFailures.join(", ")}`);
    }
    if (confirmingScorecardResult) {
      console.log(
        `Confirming score: ${confirmingScorecardResult.weightedScore}/100; stable pair: ${stableScorecards ? "yes" : "no"}`
      );
    } else if (scorePass) {
      console.log("A fresh confirming scorecard is still required for the stop condition.");
    }
  } else {
    console.log("\nNo LLM scorecard supplied; deterministic gates only.");
  }
  console.log(`Stop condition reached: ${report.stopConditionReached ? "yes" : "no"}`);
  if (rubric.stopCondition.explicitHumanApprovalRequiredForProduction) {
    console.log("Production still requires Jamie's explicit approval.");
  }
}

if (
  rubricFailures.length > 0 ||
  failedChecks.length > 0 ||
  (scorecardResult && !scorePass) ||
  (confirmingScorecardResult && !confirmingScorePass)
) {
  process.exit(1);
}
