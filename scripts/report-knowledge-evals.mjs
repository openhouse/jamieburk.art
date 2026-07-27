#!/usr/bin/env node

import { mkdirSync, writeFileSync } from "node:fs";
import { evaluateKnowledgeBank, loadKnowledgeEvalSuite } from "./lib/knowledge-evals.mjs";

const suite = loadKnowledgeEvalSuite();
const result = evaluateKnowledgeBank(suite);
const lines = [
  "# Knowledge Wiki maturation report",
  "",
  suite.objective,
  "",
  `Weighted score: **${result.weightedScore} / 5**`,
  `Accepted: **${result.accepted ? "yes" : "no"}**`,
  `Consecutive independent holdout passes: **${result.holdout.consecutivePassingRuns} / ${result.holdout.requiredConsecutivePassingRuns}**`,
  `Accepted holdout judges: **${result.holdout.judgeIds.join(", ") || "none"}**`,
  "",
  "| Criterion | Score | Evidence |",
  "| --- | ---: | --- |",
  ...result.criteria.map((item) => `| ${item.criterionId} | ${item.score} | ${item.evidence.join("; ")} |`),
  "",
  "## Canonical errors",
  "",
  ...(result.errors.length ? result.errors.map((error) => `- ${error}`) : ["None."]),
  ""
];

mkdirSync("reports/generated", { recursive: true });
writeFileSync("reports/generated/knowledge-bank-maturation.md", lines.join("\n"));
console.log("Wrote reports/generated/knowledge-bank-maturation.md");
