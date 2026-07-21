#!/usr/bin/env node

import { evaluatePublicHiring, writeOrCheckOutputs } from "./employment-lib.mjs";
import { defaultRepoRoot } from "./lib.mjs";

const check = process.argv.includes("--check");
const evaluation = evaluatePublicHiring(defaultRepoRoot);
const issues = writeOrCheckOutputs(defaultRepoRoot, evaluation.outputs, check);

if (evaluation.report.publicSafety.privateMarkerCount > 0) {
  console.error("Public hiring evaluator found a protected path or source marker.");
  process.exit(1);
}
if (evaluation.report.publicSafety.protectedWikiReceived || evaluation.report.publicSafety.rawCommunicationsReceived) {
  console.error("Public hiring evaluator crossed the source boundary.");
  process.exit(1);
}
if (issues.length) {
  for (const issue of issues) console.error(`- ${issue}`);
  process.exit(1);
}

console.log(
  `Public-only hiring baseline ${check ? "is current" : "written"}: ${evaluation.report.opportunities.length} opportunities, candidate ${evaluation.report.candidateSha.slice(0, 12)}.`
);
