import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

const suitePath = ".agents/evals/portfolio-production-readiness.json";
const allowedModes = new Set(["application_share", "production_launch"]);

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
  requireValue(
    Array.isArray(suite.evaluation_modes) &&
      suite.evaluation_modes.length === allowedModes.size &&
      suite.evaluation_modes.every((mode) => allowedModes.has(mode)),
    "suite.evaluation_modes must define application_share and production_launch"
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
      Array.isArray(entry.applies_to) &&
        entry.applies_to.length > 0 &&
        entry.applies_to.every((mode) => allowedModes.has(mode)),
      `${prefix}.applies_to must contain a valid evaluation mode`
    );
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

  const validateThresholds = (name, thresholds, mode, production = false) => {
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
        const entry = suite.evals.find((item) => item.id === id);
        requireValue(
          entry?.applies_to?.includes(mode),
          `${name}.required_eval_ids contains ${id}, which does not apply to ${mode}`
        );
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
    suite.application_share_thresholds,
    "application_share"
  );
  validateThresholds(
    "production_launch_thresholds",
    suite.production_launch_thresholds,
    "production_launch",
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
    Array.isArray(suite.run_result_schema?.required) &&
      suite.run_result_schema.required.length > 0,
    "run_result_schema.required must be non-empty"
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

function thresholdsFor(suite, mode) {
  return mode === "application_share"
    ? suite.application_share_thresholds
    : suite.production_launch_thresholds;
}

function minimumScore(entry, thresholds) {
  return entry.blocking
    ? thresholds.blocking_score_minimum
    : thresholds.nonblocking_score_minimum;
}

export function validateRun(suite, run) {
  const errors = [...validateSuite(suite).errors];
  const requireValue = (condition, message) => {
    if (!condition) errors.push(message);
  };

  requireValue(run?.suite_id === suite.suite_id, "run.suite_id must match the suite");
  requireValue(run?.suite_version === suite.version, "run.suite_version must match the suite");
  requireValue(allowedModes.has(run?.mode), "run.mode must be an evaluation mode");
  requireValue(
    typeof run?.candidate_sha === "string" && /^[0-9a-f]{7,40}$/i.test(run.candidate_sha),
    "run.candidate_sha must be a Git commit SHA"
  );
  requireValue(typeof run?.human_approval === "boolean", "run.human_approval must be boolean");
  requireValue(Array.isArray(run?.results), "run.results must be an array");

  if (!allowedModes.has(run?.mode) || !Array.isArray(run?.results)) {
    return { errors, applicableEvals: [] };
  }

  const applicableEvals = suite.evals.filter((entry) => entry.applies_to.includes(run.mode));
  const applicableIds = new Set(applicableEvals.map((entry) => entry.id));
  const resultIds = new Set();
  const resultById = new Map();

  for (const [index, result] of run.results.entries()) {
    const prefix = `run.results[${index}]`;
    requireValue(applicableIds.has(result.eval_id), `${prefix}.eval_id is not applicable to ${run.mode}`);
    requireValue(!resultIds.has(result.eval_id), `${prefix}.eval_id must be unique`);
    resultIds.add(result.eval_id);
    resultById.set(result.eval_id, result);
    requireValue(
      Number.isInteger(result.score) &&
        result.score >= suite.score_scale.minimum &&
        result.score <= suite.score_scale.maximum,
      `${prefix}.score must fit the score scale`
    );
    requireValue(typeof result.pass === "boolean", `${prefix}.pass must be boolean`);
    requireValue(
      Array.isArray(result.evidence) &&
        result.evidence.length > 0 &&
        result.evidence.every((item) => typeof item === "string" && item.trim().length > 0),
      `${prefix}.evidence must contain observed URLs, files, or commands`
    );
    requireValue(Array.isArray(result.findings), `${prefix}.findings must be an array`);
    requireValue(
      result.recommended_next_move === null ||
        (typeof result.recommended_next_move === "string" && result.recommended_next_move.trim().length > 0),
      `${prefix}.recommended_next_move must be null or a non-empty string`
    );
    requireValue(
      typeof result.confidence === "number" && result.confidence >= 0 && result.confidence <= 1,
      `${prefix}.confidence must be between 0 and 1`
    );

    const entry = applicableEvals.find((item) => item.id === result.eval_id);
    if (entry && Number.isInteger(result.score)) {
      requireValue(
        !result.pass || result.score >= minimumScore(entry, thresholdsFor(suite, run.mode)),
        `${prefix} cannot pass below the mode's minimum score`
      );
    }
    if (result.pass && Array.isArray(result.evidence)) {
      requireValue(
        !result.evidence.includes(suite.grader_output_schema.missing_evidence_value),
        `${prefix} cannot pass with missing evidence`
      );
    }
  }

  for (const entry of applicableEvals) {
    requireValue(resultById.has(entry.id), `run.results is missing applicable eval ${entry.id}`);
  }

  if (run.mode === "production_launch") {
    requireValue(
      typeof run.holdout_regression_pass === "boolean",
      "production run.holdout_regression_pass must be boolean"
    );
    requireValue(
      typeof run.blind_reader_median === "number" &&
        run.blind_reader_median >= suite.score_scale.minimum &&
        run.blind_reader_median <= suite.score_scale.maximum,
      "production run.blind_reader_median must fit the score scale"
    );
    requireValue(
      Number.isInteger(run.consecutive_passing_runs) && run.consecutive_passing_runs >= 0,
      "production run.consecutive_passing_runs must be a non-negative integer"
    );
  }

  return { errors, applicableEvals };
}

export function assessRun(suite, run) {
  const validation = validateRun(suite, run);
  if (validation.errors.length) {
    return { status: "invalid", errors: validation.errors };
  }

  const thresholds = thresholdsFor(suite, run.mode);
  const resultById = new Map(run.results.map((result) => [result.eval_id, result]));
  const totalApplicableWeight = validation.applicableEvals.reduce(
    (total, entry) => total + entry.weight,
    0
  );
  const weightedScore = validation.applicableEvals.reduce(
    (total, entry) =>
      total + entry.weight * (resultById.get(entry.id).score / suite.score_scale.maximum),
    0
  ) / totalApplicableWeight;

  const failedEvals = validation.applicableEvals
    .filter((entry) => {
      const result = resultById.get(entry.id);
      return !result.pass || result.score < minimumScore(entry, thresholds);
    })
    .sort((left, right) => {
      if (left.blocking !== right.blocking) return left.blocking ? -1 : 1;
      const leftGap = (suite.score_scale.maximum - resultById.get(left.id).score) * left.weight;
      const rightGap = (suite.score_scale.maximum - resultById.get(right.id).score) * right.weight;
      return rightGap - leftGap;
    });

  const requiredFailed = (thresholds.required_eval_ids ?? []).filter((id) => {
    const result = resultById.get(id);
    return !result?.pass;
  });
  const humanApprovalMissing = run.human_approval !== true;
  const productionConditionsMet =
    run.mode !== "production_launch" ||
    (run.holdout_regression_pass === true &&
      run.blind_reader_median >= thresholds.blind_reader_median_minimum &&
      run.consecutive_passing_runs >= 2);
  const thresholdMet =
    weightedScore >= thresholds.weighted_score_minimum &&
    failedEvals.length === 0 &&
    requiredFailed.length === 0 &&
    !humanApprovalMissing &&
    productionConditionsMet;

  const nonHumanFailures = failedEvals.filter((entry) => entry.grader !== "human_approval");
  const humanOnlyBlocked =
    nonHumanFailures.length === 0 &&
    (humanApprovalMissing || failedEvals.some((entry) => entry.grader === "human_approval"));
  const status = thresholdMet
    ? "threshold_met"
    : humanOnlyBlocked && productionConditionsMet
      ? "human_blocked"
      : "iterate";

  return {
    status,
    mode: run.mode,
    candidate_sha: run.candidate_sha,
    weighted_score: Number(weightedScore.toFixed(4)),
    weighted_score_minimum: thresholds.weighted_score_minimum,
    failed_eval_ids: failedEvals.map((entry) => entry.id),
    required_failed_eval_ids: requiredFailed,
    next_eval_id: status === "iterate" ? nonHumanFailures[0]?.id ?? null : null,
    next_action:
      status !== "iterate"
        ? null
        : !productionConditionsMet
          ? "complete the blind holdout and consecutive-pass requirements"
          : nonHumanFailures[0]?.remediation_hint ?? null,
    human_approval_missing: humanApprovalMissing,
    production_conditions_met: productionConditionsMet
  };
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

  const reportPath = process.argv[2];
  if (reportPath) {
    const report = JSON.parse(readFileSync(reportPath, "utf8"));
    const assessment = assessRun(suite, report);
    console.log(JSON.stringify(assessment, null, 2));
    if (assessment.status === "invalid") process.exit(1);
  }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) run();
