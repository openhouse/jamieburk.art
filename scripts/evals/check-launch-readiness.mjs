#!/usr/bin/env node

import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import {
  currentLaunchCandidateSnapshot,
  evaluateSourceChecks,
  loadSuite,
  readJson,
  scoreAssessment,
  validateSuite
} from "./lib/launch-readiness.mjs";

const args = process.argv.slice(2);
const has = (flag) => args.includes(flag);
const valueFor = (flag) => {
  const index = args.indexOf(flag);
  return index === -1 ? undefined : args[index + 1];
};

const suite = loadSuite();
const contractFailures = validateSuite(suite);

if (contractFailures.length) {
  console.error("Launch-readiness eval contract is invalid:");
  contractFailures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

if (has("--contract-only")) {
  console.log("Launch-readiness eval contract passed.");
  process.exit(0);
}

const report = evaluateSourceChecks({ suite });
report.summary.sourceHardGateFailures = report.summary.hardGateFailures;
const assessmentPath = valueFor("--assessment");
const assessmentInput = assessmentPath
  ? readJson(path.resolve(assessmentPath))
  : null;

const browserReportPath = valueFor("--browser-report");
if (browserReportPath) {
  report.browser = readJson(path.resolve(browserReportPath));
  if (
    report.browser.suiteId !== suite.id ||
    report.browser.suiteVersion !== suite.version
  ) {
    console.error("Browser report suite id/version does not match the active suite.");
    process.exit(1);
  }
  if (
    JSON.stringify(report.browser.candidate) !==
    JSON.stringify(currentLaunchCandidateSnapshot(suite))
  ) {
    console.error("Browser report candidate does not match the current governed candidate.");
    process.exit(1);
  }
  if (
    assessmentInput &&
    JSON.stringify(report.browser.candidate) !== JSON.stringify(assessmentInput.candidate)
  ) {
    console.error("Browser report candidate does not match the semantic assessment candidate.");
    process.exit(1);
  }
  report.summary.browserHardGateFailures = report.browser.summary?.hardGateFailures ?? 0;
  report.summary.hardGateFailures += report.summary.browserHardGateFailures;
}

if (assessmentInput) {
  report.assessment = scoreAssessment(assessmentInput, suite);
  report.summary.weightedJudgeScore = report.assessment.weightedJudgeScore;
  report.summary.judgeFloorFailures = report.assessment.judgeFloorFailures;
  report.summary.pendingHumanGates = report.assessment.pendingHumanGates;
}

const outputPath = valueFor("--output");
if (outputPath) {
  const absolute = path.resolve(outputPath);
  mkdirSync(path.dirname(absolute), { recursive: true });
  writeFileSync(absolute, `${JSON.stringify(report, null, 2)}\n`);
}

if (has("--json")) {
  console.log(JSON.stringify(report, null, 2));
} else {
  console.log("Launch-readiness source eval:");
  for (const item of report.results) {
    console.log(`${item.passed ? "PASS" : item.kind === "hard-gate" ? "FAIL" : "GAP "} ${item.id}: ${item.observed}`);
  }
  console.log(
    `Summary: ${report.summary.hardGateFailures}/${report.summary.hardGateTotal} hard gates failing; ` +
      `${report.summary.qualityTargetGaps}/${report.summary.qualityTargetTotal} quality targets open.`
  );
  if (report.assessment) {
    console.log(`Judge score: ${report.assessment.weightedJudgeScore}/100.`);
    console.log(`Pending human gates: ${report.assessment.pendingHumanGates.length}.`);
  }
}

const sourceGateFailed = report.summary.hardGateFailures > 0;
const assessmentInvalid = report.assessment && !report.assessment.valid;
if (has("--gate") && (sourceGateFailed || assessmentInvalid)) process.exit(1);

if (has("--release")) {
  const releaseFailed =
    sourceGateFailed ||
    !report.browser ||
    report.summary.browserHardGateFailures > 0 ||
    !report.assessment ||
    !report.assessment.valid ||
    !report.assessment.judgeThresholdMet ||
    report.assessment.pendingHumanGates.length > 0;
  if (releaseFailed) process.exit(1);
}
