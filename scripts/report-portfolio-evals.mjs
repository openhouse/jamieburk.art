#!/usr/bin/env node

import { mkdirSync, writeFileSync } from "node:fs";
import {
  evaluatePortfolioEffectiveness,
  loadPortfolioEvalSuite
} from "./lib/portfolio-evals.mjs";

const { suite, evidence } = loadPortfolioEvalSuite();
const result = evaluatePortfolioEffectiveness(suite, evidence);
const labelById = new Map(suite.criteria.map((criterion) => [criterion.id, criterion.label]));
const lines = [
  "# Portfolio-effectiveness report",
  "",
  suite.objective,
  "",
  `Weighted score: **${result.weightedScore} / 5**`,
  `Accepted at the local evidence floor: **${result.accepted ? "yes" : "no"}**`,
  "",
  "| Criterion | Score | Evidence | Next evidence |",
  "| --- | ---: | --- | --- |",
  ...result.criteria.map((item) =>
    `| ${labelById.get(item.criterionId)} | ${item.score} | ${item.evidence.join("; ")} | ${item.nextEvidence} |`
  ),
  "",
  "## Explicit external gates",
  "",
  ...(result.externalGates.length
    ? result.externalGates.map((item) => `- ${item.criterionId}: ${item.nextEvidence}`)
    : ["None."]),
  "",
  "## Canonical errors",
  "",
  ...(result.errors.length ? result.errors.map((error) => `- ${error}`) : ["None."]),
  ""
];

mkdirSync("reports/generated", { recursive: true });
writeFileSync("reports/generated/portfolio-effectiveness.md", lines.join("\n"));
console.log("Wrote reports/generated/portfolio-effectiveness.md");
