#!/usr/bin/env node

import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import {
  evaluateLifecycle,
  loadSuite,
  readJson,
  requiredLifecycleFiles,
  scoreAssessment,
  validateSuite
} from "./lib/knowledge-lifecycle.mjs";

const args = process.argv.slice(2);
const has = (flag) => args.includes(flag);
const valueFor = (flag) => {
  const index = args.indexOf(flag);
  return index === -1 ? undefined : args[index + 1];
};

const suite = loadSuite();
const contractFailures = validateSuite(suite);
const missingFiles = requiredLifecycleFiles();
if (contractFailures.length || missingFiles.length) {
  console.error("Knowledge-lifecycle contract is invalid:");
  for (const failure of contractFailures) console.error(`- ${failure}`);
  for (const file of missingFiles) console.error(`- Missing ${file}`);
  process.exit(1);
}

if (has("--contract-only")) {
  console.log("Knowledge-lifecycle eval contract passed.");
  process.exit(0);
}

const report = evaluateLifecycle({ suite });
const assessmentPath = valueFor("--assessment");
if (assessmentPath) report.assessment = scoreAssessment(readJson(path.resolve(assessmentPath)), suite);
if ((has("--gate") || has("--release")) && !report.assessment) {
  console.error("A gate requires an independent assessment via --assessment.");
  process.exit(1);
}

const outputPath = valueFor("--output");
if (outputPath) {
  const absolute = path.resolve(outputPath);
  mkdirSync(path.dirname(absolute), { recursive: true });
  writeFileSync(absolute, `${JSON.stringify(report, null, 2)}\n`);
}

if (has("--json")) console.log(JSON.stringify(report, null, 2));
else {
  console.log("Knowledge-lifecycle eval:");
  for (const item of report.results) {
    console.log(`${item.passed ? "PASS" : item.kind === "hard-gate" ? "FAIL" : "GAP "} ${item.id}: ${item.observed}`);
  }
  console.log(`Summary: ${report.summary.hardGateFailures}/${report.summary.hardGateTotal} hard gates failing; ${report.summary.qualityTargetGaps}/${report.summary.qualityTargetTotal} quality targets open.`);
  if (report.assessment) {
    console.log(`Judge score: ${report.assessment.weightedJudgeScore}/100.`);
    console.log(`Pending human gates: ${report.assessment.pendingHumanGates.length}.`);
  }
}

if (has("--gate") && (report.summary.hardGateFailures > 0 || report.assessment && (!report.assessment.valid || !report.assessment.judgeThresholdMet))) {
  process.exit(1);
}
if (has("--release")) {
  console.error("Human approvals cannot be authenticated by this agent-run tool; use the external release process.");
  process.exit(1);
}
