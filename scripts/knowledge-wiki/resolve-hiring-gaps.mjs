#!/usr/bin/env node

import {
  evaluatePublicHiring,
  resolveHiringGaps,
  writeOrCheckOutputs
} from "./employment-lib.mjs";
import { compileWiki } from "./lib.mjs";

const check = process.argv.includes("--check");
const result = compileWiki();
const publicEvaluation = evaluatePublicHiring(result.repoRoot);
const resolution = resolveHiringGaps(result, publicEvaluation.report);
const issues = writeOrCheckOutputs(result.repoRoot, resolution.outputs, check);

if (issues.length) {
  for (const issue of issues) console.error(`- ${issue}`);
  process.exit(1);
}

console.log(
  `Hiring gap resolution ${check ? "is current" : "written"}: ${resolution.report.findings.length} bounded findings; human approval remains required.`
);
