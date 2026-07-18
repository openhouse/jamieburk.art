#!/usr/bin/env node

import { readFileSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { repoRoot } from "./lib.mjs";

export const suitePath = path.join(repoRoot, ".agents/evals/knowledge-wiki-foundation.json");

export function validateWikiEvalSuite(suite) {
  const errors = [];
  const requireValue = (condition, message) => { if (!condition) errors.push(message); };
  requireValue(suite.version === 1, "suite.version must be 1");
  requireValue(suite.suite_id === "knowledge-wiki-foundation", "suite_id is invalid");
  requireValue(Array.isArray(suite.hard_constraints) && suite.hard_constraints.length >= 8, "at least eight hard constraints are required");
  requireValue(Array.isArray(suite.evals) && suite.evals.length === 12, "exactly twelve Knowledge Wiki evals are required");
  requireValue(suite.optimization?.rubric_is_frozen_during_run === true, "rubric must be frozen during optimization");
  requireValue(suite.optimization?.optimizer_may_not_grade_own_patch === true, "optimizer may not grade its own patch");
  requireValue(suite.optimization?.holdout_judge_is_blind_to_patch_intent === true, "holdout judge must be blind to patch intent");
  requireValue(suite.thresholds?.two_consecutive_passing_runs_required === true, "two unchanged passing runs are required");
  requireValue(suite.thresholds?.human_release_approval_required === true, "human release approval must be required");
  const graders = new Set(["deterministic", "hybrid", "llm_judge", "human_approval"]);
  const ids = new Set();
  let totalWeight = 0;
  let blockingCount = 0;
  let humanCount = 0;
  for (const [index, entry] of (suite.evals ?? []).entries()) {
    const label = `evals[${index}]`;
    requireValue(/^KW-\d{3}$/.test(entry.id ?? ""), `${label}.id must use KW-###`);
    requireValue(!ids.has(entry.id), `${label}.id must be unique`);
    ids.add(entry.id);
    requireValue(graders.has(entry.grader), `${label}.grader is invalid`);
    requireValue(typeof entry.blocking === "boolean", `${label}.blocking must be boolean`);
    requireValue(Number.isInteger(entry.weight) && entry.weight > 0, `${label}.weight must be positive`);
    for (const field of ["inputs", "procedure", "pass_criteria", "evidence_required", "cannot_establish"]) requireValue(Array.isArray(entry[field]) && entry[field].length, `${label}.${field} must be non-empty`);
    requireValue(typeof entry.remediation_hint === "string" && entry.remediation_hint.length, `${label}.remediation_hint is required`);
    if (["llm_judge", "human_approval"].includes(entry.grader)) requireValue(entry.external_judgment_required === true, `${label} must require external judgment`);
    if (entry.grader === "human_approval") humanCount += 1;
    if (entry.blocking) blockingCount += 1;
    totalWeight += entry.weight ?? 0;
  }
  requireValue(totalWeight === 100, `eval weights must total 100; received ${totalWeight}`);
  requireValue(blockingCount >= 1, "at least one blocking eval is required");
  requireValue(humanCount === 1, "exactly one human-approval eval is required");
  return { errors, totalWeight, blockingCount, evalCount: suite.evals?.length ?? 0 };
}

function main() {
  const suite = JSON.parse(readFileSync(suitePath, "utf8"));
  const result = validateWikiEvalSuite(suite);
  if (result.errors.length) {
    console.error("Knowledge Wiki eval suite validation failed:");
    result.errors.forEach((error) => console.error(`- ${error}`));
    process.exitCode = 1;
  } else console.log(`Knowledge Wiki eval suite passed: ${result.evalCount} evals, ${result.blockingCount} blocking, weights total ${result.totalWeight}.`);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) main();
