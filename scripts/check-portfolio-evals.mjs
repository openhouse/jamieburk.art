import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

const suitePath = ".agents/evals/portfolio-production-readiness.json";

export function validateSuite(suite) {
  const errors = [];
  const requireValue = (condition, message) => {
    if (!condition) errors.push(message);
  };

  requireValue(suite.version === 1, "suite.version must be 1");
  requireValue(
    suite.suite_id === "portfolio-production-readiness",
    "suite.suite_id must be portfolio-production-readiness"
  );
  requireValue(
    Array.isArray(suite.hard_constraints) && suite.hard_constraints.length > 0,
    "suite.hard_constraints must be a non-empty array"
  );
  requireValue(
    Array.isArray(suite.evals) && suite.evals.length > 0,
    "suite.evals must be a non-empty array"
  );

  const ids = new Set();
  let totalWeight = 0;
  let blockingCount = 0;
  const allowedGraders = new Set([
    "deterministic",
    "llm_judge",
    "human_approval",
    "hybrid"
  ]);

  for (const [index, entry] of (suite.evals ?? []).entries()) {
    const prefix = `suite.evals[${index}]`;
    requireValue(
      typeof entry.id === "string" && /^PR-\d{3}$/.test(entry.id),
      `${prefix}.id must use PR-### format`
    );
    requireValue(!ids.has(entry.id), `${prefix}.id must be unique`);
    ids.add(entry.id);
    requireValue(
      typeof entry.title === "string" && entry.title.trim().length > 0,
      `${prefix}.title is required`
    );
    requireValue(allowedGraders.has(entry.grader), `${prefix}.grader is invalid`);
    requireValue(
      typeof entry.blocking === "boolean",
      `${prefix}.blocking must be boolean`
    );
    requireValue(
      Number.isInteger(entry.weight) && entry.weight > 0,
      `${prefix}.weight must be a positive integer`
    );
    requireValue(
      Array.isArray(entry.inputs) && entry.inputs.length > 0,
      `${prefix}.inputs must be non-empty`
    );
    requireValue(
      Array.isArray(entry.procedure) && entry.procedure.length > 0,
      `${prefix}.procedure must be non-empty`
    );
    requireValue(
      Array.isArray(entry.pass_criteria) && entry.pass_criteria.length > 0,
      `${prefix}.pass_criteria must be non-empty`
    );
    requireValue(
      Array.isArray(entry.evidence_required) && entry.evidence_required.length > 0,
      `${prefix}.evidence_required must be non-empty`
    );
    requireValue(
      typeof entry.remediation_hint === "string" &&
        entry.remediation_hint.trim().length > 0,
      `${prefix}.remediation_hint is required`
    );

    totalWeight += Number.isInteger(entry.weight) ? entry.weight : 0;
    if (entry.blocking) blockingCount += 1;
  }

  requireValue(
    totalWeight === 100,
    `eval weights must total 100; received ${totalWeight}`
  );
  requireValue(blockingCount > 0, "suite must include at least one blocking eval");

  const validateThresholds = (name, thresholds, production = false) => {
    requireValue(typeof thresholds === "object" && thresholds !== null, `${name} is required`);
    requireValue(
      typeof thresholds?.weighted_score_minimum === "number" &&
        thresholds.weighted_score_minimum >= 0 &&
        thresholds.weighted_score_minimum <= 1,
      `${name}.weighted_score_minimum must be between 0 and 1`
    );
    for (const field of ["blocking_score_minimum", "nonblocking_score_minimum"]) {
      requireValue(
        Number.isInteger(thresholds?.[field]) &&
          thresholds[field] >= suite.score_scale.minimum &&
          thresholds[field] <= suite.score_scale.maximum,
        `${name}.${field} must fit the score scale`
      );
    }
    if (Array.isArray(thresholds?.required_eval_ids)) {
      for (const id of thresholds.required_eval_ids) {
        requireValue(ids.has(id), `${name}.required_eval_ids contains unknown eval ${id}`);
      }
    }
    if (production) {
      requireValue(
        thresholds?.all_blocking_evals_must_pass === true,
        "all production blocking evals must pass"
      );
      requireValue(
        thresholds?.holdout_regression_must_pass === true,
        "production holdout regression must pass"
      );
      requireValue(
        thresholds?.two_consecutive_passing_runs_required === true,
        "production requires two consecutive passing runs"
      );
      requireValue(
        thresholds?.human_production_approval_required === true,
        "human production approval must be required"
      );
    } else {
      requireValue(
        thresholds?.human_approval_required === true,
        "human application-share approval must be required"
      );
    }
  };

  validateThresholds(
    "application_share_thresholds",
    suite.application_share_thresholds
  );
  validateThresholds(
    "production_launch_thresholds",
    suite.production_launch_thresholds,
    true
  );

  requireValue(
    suite.optimization?.rubric_is_frozen_during_run === true,
    "optimizer must freeze the rubric during a run"
  );
  requireValue(
    suite.optimization?.optimizer_may_not_grade_own_patch === true,
    "optimizer may not grade its own patch"
  );
  requireValue(
    suite.optimization?.holdout_judge_is_blind_to_patch_intent === true,
    "holdout judge must be blind to patch intent"
  );
  requireValue(
    suite.optimization?.success_requires_two_consecutive_passing_runs === true,
    "optimizer success requires two consecutive passing runs"
  );

  requireValue(
    Array.isArray(suite.grader_output_schema?.required) &&
      suite.grader_output_schema.required.length > 0,
    "grader_output_schema.required must be non-empty"
  );
  requireValue(
    Array.isArray(suite.iteration_record_schema?.required) &&
      suite.iteration_record_schema.required.length > 0,
    "iteration_record_schema.required must be non-empty"
  );
  requireValue(
    Array.isArray(suite.iteration_record_schema?.allowed_decisions) &&
      suite.iteration_record_schema.allowed_decisions.includes("stop_human_blocked"),
    "iteration records must support stop_human_blocked"
  );

  return { errors, totalWeight, blockingCount, evalCount: suite.evals?.length ?? 0 };
}

function run() {
  const suite = JSON.parse(readFileSync(suitePath, "utf8"));
  const result = validateSuite(suite);

  if (result.errors.length) {
    console.error("Portfolio eval suite validation failed:");
    for (const error of result.errors) console.error(`- ${error}`);
    process.exit(1);
  }

  console.log(
    `Portfolio eval suite passed: ${result.evalCount} evals, ` +
      `${result.blockingCount} blocking, weights total ${result.totalWeight}.`
  );
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) run();
