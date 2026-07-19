#!/usr/bin/env node

import { readFileSync } from "node:fs";
import path from "node:path";
import { repoRoot } from "../knowledge-wiki/lib.mjs";

export const employmentEvalPath = path.join(repoRoot, ".agents/evals/knowledge-wiki-employment.json");
export function validateEmploymentEvalSuite(suite) {
  const errors = [];
  if (suite.suite_id !== "knowledge-wiki-employment-acceptance-v1") errors.push("Unexpected suite_id");
  if (!/No blended score/.test(suite.scoring ?? "")) errors.push("Suite must prohibit a blended score");
  if (!Array.isArray(suite.lexicographic_objective) || suite.lexicographic_objective.length < 10) errors.push("Lexicographic objective is incomplete");
  if (!Array.isArray(suite.stop_conditions) || suite.stop_conditions.length < 6) errors.push("Stop conditions are incomplete");
  const ids = new Set();
  for (const entry of suite.evals ?? []) {
    if (!/^EWA-\d{3}$/.test(entry.id ?? "")) errors.push(`Invalid eval id: ${entry.id}`);
    if (ids.has(entry.id)) errors.push(`Duplicate eval id: ${entry.id}`);
    ids.add(entry.id);
    if (!entry.title || !entry.grader || entry.blocking !== true || !Array.isArray(entry.pass_criteria) || entry.pass_criteria.length < 3) errors.push(`Incomplete eval contract: ${entry.id}`);
    if (entry.grader !== "deterministic" && entry.external_judgment_required !== true) errors.push(`External grader not marked external: ${entry.id}`);
  }
  if (ids.size !== 12) errors.push("Expected 12 employment evals");
  if (!Array.isArray(suite.mutations) || suite.mutations.length < 14) errors.push("Mutation inventory is incomplete");
  return errors;
}

const suite = JSON.parse(readFileSync(employmentEvalPath, "utf8"));
const errors = validateEmploymentEvalSuite(suite);
if (errors.length) {
  for (const error of errors) console.error(`ERROR ${error}`);
  process.exitCode = 1;
} else console.log(`Employment eval suite passed: ${suite.evals.length} separate gates.`);
