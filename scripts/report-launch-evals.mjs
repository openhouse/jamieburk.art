#!/usr/bin/env node

import { mkdirSync, writeFileSync } from "node:fs";
import {
  loadLaunchEvalSuite,
  loadLaunchEvalRunRecords,
  runSourceChecks,
  validateLaunchEvalRunRecord,
  validateLaunchEvalSuite
} from "./lib/launch-evals.mjs";

const suite = loadLaunchEvalSuite();
const schemaFailures = validateLaunchEvalSuite(suite);
const sourceFailures = runSourceChecks(suite);
const runs = loadLaunchEvalRunRecords();
const runFailures = runs.flatMap(({ file, record }) =>
  validateLaunchEvalRunRecord(suite, record).map((failure) => `${file}: ${failure}`)
);
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
  "## Decision vector",
  "",
  ...suite.lensPolicy.sack.decisionVector.map((dimension) => `- ${dimension}`),
  "",
  "## Decision authority and reopen paths",
  "",
  ...suite.lensPolicy.sack.authorities.map(
    (record) =>
      `- ${record.action}: ${record.authority}. Model has final authority: ${record.modelHasFinalAuthority ? "yes" : "no"}.`
  ),
  "",
  "Reopen triggers:",
  "",
  ...suite.lensPolicy.sack.reopenTriggers.map((trigger) => `- ${trigger}`),
  "",
  "Per-run governance contract:",
  "",
  "- Every decision dimension needs an assessment, evidence, and unresolved-risks array.",
  "- Every human authority action needs a recorded disposition.",
  "- Reopen triggers, overrides, and disagreement review remain present beside the aggregate.",
  `- Machine-readable run records validated: ${runs.length}.`,
  "",
  "## Current failures",
  "",
  ...(schemaFailures.length || sourceFailures.length || runFailures.length
    ? [...schemaFailures, ...sourceFailures, ...runFailures].map((failure) => `- ${failure}`)
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
