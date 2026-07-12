#!/usr/bin/env node

import { mkdirSync, writeFileSync } from "node:fs";
import {
  loadLaunchEvalSuite,
  runSourceChecks,
  validateLaunchEvalSuite
} from "./lib/launch-evals.mjs";

const suite = loadLaunchEvalSuite();
const schemaFailures = validateLaunchEvalSuite(suite);
const sourceFailures = runSourceChecks(suite);
const lines = [
  "# Launch-readiness eval report",
  "",
  "Generated from `evals/launch-readiness/evals.json`. Do not edit by hand.",
  "",
  "## Objective",
  "",
  suite.objective,
  "",
  "## Deterministic definition",
  "",
  `- Hard gates: ${suite.hardGates.length}`,
  `- Runtime cases: ${suite.runtimeCases.length}`,
  `- Judge criteria: ${suite.judgeCriteria.length}`,
  `- Weighted target: ${suite.targets.weightedJudgeScoreAtLeast} / ${suite.targets.scoreScale}`,
  `- Consecutive passing runs: ${suite.targets.consecutivePassingRuns}`,
  `- Schema status: ${schemaFailures.length ? "FAIL" : "PASS"}`,
  `- Source-check status: ${sourceFailures.length ? "FAIL" : "PASS"}`,
  "",
  "## Hard gates",
  "",
  ...suite.hardGates.map(
    (gate) =>
      `- ${gate.id} (${gate.kind}): ${gate.description}` +
      (gate.command ? ` Command: \`${gate.command}\`.` : "")
  ),
  "",
  "## Judge criteria",
  "",
  "| Criterion | Weight | Minimum |",
  "| --- | ---: | ---: |",
  ...suite.judgeCriteria.map(
    (criterion) =>
      `| ${criterion.id}: ${criterion.label} | ${criterion.weight} | ${criterion.minimumScore} |`
  ),
  "",
  "## Current failures",
  "",
  ...(schemaFailures.length || sourceFailures.length
    ? [...schemaFailures, ...sourceFailures].map((failure) => `- ${failure}`)
    : ["None in schema or source checks. Runtime and judge evidence remain per-run artifacts."]),
  "",
  "## Stop condition",
  "",
  suite.hillClimb.stopWhen,
  ""
];

mkdirSync("reports/generated", { recursive: true });
writeFileSync("reports/generated/launch-readiness.md", lines.join("\n"));
console.log("Wrote reports/generated/launch-readiness.md");
