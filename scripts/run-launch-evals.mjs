#!/usr/bin/env node

import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  runLaunchEvals,
  writeLaunchEvalReports
} from "./lib/launch-readiness-evals.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const report = runLaunchEvals(repoRoot);
writeLaunchEvalReports(repoRoot, report);

for (const item of report.results) {
  const gate = item.hardGate ? " hard-gate" : "";
  console.log(`${item.status.toUpperCase()}${gate} ${item.id} (${item.weight})`);
  for (const failure of item.failures) console.error(`  - ${failure}`);
}

console.log(`Automated score: ${report.summary.score}/100`);
console.log(
  `Automated hard gates: ${report.summary.hardGatesPass ? "PASS" : "FAIL"}`
);
console.log(
  `Manual gates remaining: ${report.manualEvals.map((item) => item.id).join(", ")}`
);

if (!report.summary.automatedReady) process.exit(1);

