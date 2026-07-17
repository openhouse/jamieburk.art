#!/usr/bin/env node

import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import {
  evaluateComposite,
  repoRoot
} from "./lib/composite-integration.mjs";

const scorecard = evaluateComposite();

console.log(
  `Composite integration eval: ${Math.round(scorecard.weightedScore * 100)}/100 ` +
    `(hard failures: ${scorecard.hardGateFailures})`
);
console.log(`Candidate fingerprint: ${scorecard.candidateFingerprint}`);
console.log(`Candidate commit: ${scorecard.candidateCommit}`);
console.log(`Working tree clean: ${scorecard.workingTreeClean ? "yes" : "no"}`);

for (const criterion of scorecard.criteria) {
  const mark = criterion.passes ? "PASS" : "FAIL";
  console.log(`- ${mark} ${criterion.id} ${criterion.title}`);
  for (const finding of criterion.findings) console.log(`  - ${finding}`);
}

if (process.argv.includes("--report")) {
  const reportsDir = path.join(repoRoot, "reports/generated");
  mkdirSync(reportsDir, { recursive: true });
  const reportPath = path.join(reportsDir, "composite-integration-scorecard.json");
  writeFileSync(reportPath, `${JSON.stringify(scorecard, null, 2)}\n`);
  console.log(`Wrote ${path.relative(repoRoot, reportPath)}`);
}

const writeRunIndex = process.argv.indexOf("--write-run");
if (writeRunIndex !== -1) {
  const relativeRunPath = process.argv[writeRunIndex + 1];
  if (
    !relativeRunPath?.startsWith("evals/composite-integration/runs/") ||
    !relativeRunPath.endsWith(".json") ||
    relativeRunPath.includes("..")
  ) {
    throw new Error("--write-run must target evals/composite-integration/runs/*.json");
  }
  if (!scorecard.workingTreeClean) {
    throw new Error("Commit the candidate before writing a candidate-bound run");
  }
  const runPath = path.join(repoRoot, relativeRunPath);
  mkdirSync(path.dirname(runPath), { recursive: true });
  writeFileSync(runPath, `${JSON.stringify(scorecard, null, 2)}\n`);
  console.log(`Wrote ${relativeRunPath}`);
}

console.log("Human-only gates:");
for (const gate of scorecard.humanGates) {
  console.log(`- ${gate.state.toUpperCase()} ${gate.id}`);
}

if (!scorecard.passes) process.exit(1);
console.log("Composite integration criterion met.");
