#!/usr/bin/env node

import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

const suitePath = ".agents/evals/composite-integration.json";

export function validateCompositeSuite(suite) {
  const errors = [];
  const requireValue = (condition, message) => {
    if (!condition) errors.push(message);
  };
  requireValue(suite.version === 1, "suite.version must be 1");
  requireValue(suite.suite_id === "evals-family-composite-integration", "suite_id is invalid");
  requireValue(Array.isArray(suite.inherited_suites) && suite.inherited_suites.length === 2, "two inherited suites are required");
  requireValue(Array.isArray(suite.hard_constraints) && suite.hard_constraints.length >= 8, "at least eight hard constraints are required");
  requireValue(Array.isArray(suite.evals) && suite.evals.length === 12, "exactly twelve composite evals are required");
  const ids = new Set();
  const allowedGraders = new Set(["deterministic", "hybrid", "llm_judge", "human_approval"]);
  let totalWeight = 0;
  let blockingCount = 0;
  for (const [index, entry] of (suite.evals ?? []).entries()) {
    const label = `evals[${index}]`;
    requireValue(/^CI-\d{3}$/.test(entry.id ?? ""), `${label}.id must use CI-###`);
    requireValue(!ids.has(entry.id), `${label}.id must be unique`);
    ids.add(entry.id);
    requireValue(allowedGraders.has(entry.grader), `${label}.grader is invalid`);
    requireValue(typeof entry.blocking === "boolean", `${label}.blocking must be boolean`);
    requireValue(Number.isInteger(entry.weight) && entry.weight > 0, `${label}.weight must be positive`);
    for (const field of ["inputs", "procedure", "pass_criteria", "evidence_required", "cannot_establish"]) {
      requireValue(Array.isArray(entry[field]) && entry[field].length > 0, `${label}.${field} must be non-empty`);
    }
    requireValue(typeof entry.remediation_hint === "string" && entry.remediation_hint.length > 0, `${label}.remediation_hint is required`);
    if (entry.external_judgment_required) requireValue(["llm_judge", "hybrid", "human_approval"].includes(entry.grader), `${label} external judgment has an invalid grader`);
    totalWeight += entry.weight ?? 0;
    if (entry.blocking) blockingCount += 1;
  }
  requireValue(totalWeight === 100, `eval weights must total 100; received ${totalWeight}`);
  requireValue(blockingCount >= 1, "at least one blocking eval is required");
  requireValue(suite.thresholds?.weighted_score_minimum === 0.9, "weighted threshold must be 0.9");
  requireValue(suite.thresholds?.all_blocking_evals_must_pass === true, "all blockers must pass");
  requireValue(suite.thresholds?.two_consecutive_passing_runs_required === true, "two passing runs are required");
  requireValue(suite.optimization?.rubric_is_frozen_during_run === true, "rubric must be frozen");
  requireValue(suite.optimization?.optimizer_may_not_grade_own_patch === true, "optimizer cannot grade its patch");
  requireValue(suite.optimization?.holdout_judge_is_blind_to_patch_intent === true, "holdout must be blind");
  return { errors, totalWeight, blockingCount, evalCount: suite.evals?.length ?? 0 };
}

function run() {
  const suite = JSON.parse(readFileSync(suitePath, "utf8"));
  const result = validateCompositeSuite(suite);
  if (result.errors.length) {
    console.error("Composite eval suite validation failed:");
    result.errors.forEach((error) => console.error(`- ${error}`));
    process.exit(1);
  }
  console.log(`Composite eval suite passed: ${result.evalCount} evals, ${result.blockingCount} blocking, weights total ${result.totalWeight}.`);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) run();
