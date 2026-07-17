#!/usr/bin/env node

import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import {
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
  report.summary.browserHardGateFailures = report.browser.summary?.hardGateFailures ?? 0;
  report.summary.hardGateFailures += report.summary.browserHardGateFailures;
}

const assessmentPath = valueFor("--assessment");
if (assessmentPath) {
  report.assessment = scoreAssessment(readJson(path.resolve(assessmentPath)), suite);
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
  const releaseFailures = [];
  if (sourceGateFailed) releaseFailures.push("source hard gates are failing");
  if (!report.browser) {
    releaseFailures.push("a browser report was not supplied");
  } else if (report.summary.browserHardGateFailures > 0) {
    releaseFailures.push("browser hard gates are failing");
  }
  if (!report.assessment) {
    releaseFailures.push("a human assessment was not supplied");
  } else {
    if (!report.assessment.valid) releaseFailures.push("the human assessment is invalid");
    if (!report.assessment.judgeThresholdMet) {
      releaseFailures.push("the judge threshold is not met");
    }
    if (report.assessment.pendingHumanGates.length > 0) {
      releaseFailures.push(
        `${report.assessment.pendingHumanGates.length} human gates remain pending`
      );
    }
  }
  if (releaseFailures.length > 0) {
    console.error("Release gate failed:");
    releaseFailures.forEach((failure) => console.error(`- ${failure}`));
    process.exit(1);
  }
}
