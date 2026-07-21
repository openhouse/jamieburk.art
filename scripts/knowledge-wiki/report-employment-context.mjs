#!/usr/bin/env node

import {
  buildEmploymentOutputs,
  evaluatePublicHiring,
  resolveHiringGaps,
  writeOrCheckOutputs
} from "./employment-lib.mjs";
import { compileWiki } from "./lib.mjs";

const check = process.argv.includes("--check");
const result = compileWiki();
const publicEvaluation = evaluatePublicHiring(result.repoRoot);
const gapResolution = resolveHiringGaps(result, publicEvaluation.report);
const outputs = buildEmploymentOutputs(result, publicEvaluation, gapResolution);
const issues = writeOrCheckOutputs(result.repoRoot, outputs, check);

if (issues.length) {
  console.error("Employment-context reports are not current:");
  for (const issue of issues) console.error(`- ${issue}`);
  process.exit(1);
}

console.log(
  `${check ? "Checked" : "Wrote"} ${Object.keys(outputs).length} employment-context and hiring-acceptance reports.`
);
