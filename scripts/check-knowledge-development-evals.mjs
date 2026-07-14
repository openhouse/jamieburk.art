import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

const suitePath = ".agents/evals/knowledge-development.json";

export function validateKnowledgeDevelopmentSuite(suite) {
  const errors = [];
  const requireValue = (condition, message) => {
    if (!condition) errors.push(message);
  };

  requireValue(suite.version === 1, "suite.version must be 1");
  requireValue(
    suite.suite_id === "knowledge-development-lifecycle",
    "suite.suite_id must be knowledge-development-lifecycle"
  );
  requireValue(
    Array.isArray(suite.hard_constraints) && suite.hard_constraints.length >= 5,
    "suite.hard_constraints must contain at least five constraints"
  );
  requireValue(
    Array.isArray(suite.evals) && suite.evals.length > 0,
    "suite.evals must be a non-empty array"
  );

  const ids = new Set();
  const allowedGraders = new Set(["deterministic", "llm_judge", "human_approval", "hybrid"]);
  let totalWeight = 0;
  let blockingCount = 0;

  for (const [index, entry] of (suite.evals ?? []).entries()) {
    const prefix = `suite.evals[${index}]`;
    requireValue(/^KD-\d{3}$/.test(entry.id ?? ""), `${prefix}.id must use KD-### format`);
    requireValue(!ids.has(entry.id), `${prefix}.id must be unique`);
    ids.add(entry.id);
    requireValue(typeof entry.title === "string" && entry.title.trim(), `${prefix}.title is required`);
    requireValue(allowedGraders.has(entry.grader), `${prefix}.grader is invalid`);
    requireValue(typeof entry.blocking === "boolean", `${prefix}.blocking must be boolean`);
    requireValue(Number.isInteger(entry.weight) && entry.weight > 0, `${prefix}.weight must be a positive integer`);
    for (const field of ["inputs", "procedure", "pass_criteria", "evidence_required"]) {
      requireValue(Array.isArray(entry[field]) && entry[field].length > 0, `${prefix}.${field} must be non-empty`);
    }
    requireValue(
      typeof entry.remediation_hint === "string" && entry.remediation_hint.trim(),
      `${prefix}.remediation_hint is required`
    );
    totalWeight += Number.isInteger(entry.weight) ? entry.weight : 0;
    if (entry.blocking) blockingCount += 1;
  }

  requireValue(totalWeight === 100, `eval weights must total 100; received ${totalWeight}`);
  requireValue(blockingCount > 0, "suite must include at least one blocking eval");
  const thresholds = suite.development_thresholds;
  requireValue(
    typeof thresholds?.weighted_score_minimum === "number" &&
      thresholds.weighted_score_minimum >= 0 &&
      thresholds.weighted_score_minimum <= 1,
    "development_thresholds.weighted_score_minimum must be between 0 and 1"
  );
  requireValue(thresholds?.all_blocking_evals_must_pass === true, "all blocking evals must pass");
  requireValue(thresholds?.two_consecutive_passing_runs_required === true, "two consecutive passing runs must be required");
  requireValue(thresholds?.holdout_judgments_required === true, "holdout judgments must be required");
  requireValue(suite.optimization?.rubric_is_frozen_during_run === true, "rubric must be frozen during a run");
  requireValue(suite.optimization?.optimizer_may_not_grade_own_patch === true, "optimizer may not grade its own patch");
  requireValue(suite.optimization?.holdout_judge_is_blind_to_patch_intent === true, "holdout judge must be blind to patch intent");

  return { errors, totalWeight, blockingCount, evalCount: suite.evals?.length ?? 0 };
}

function run() {
  const suite = JSON.parse(readFileSync(suitePath, "utf8"));
  const result = validateKnowledgeDevelopmentSuite(suite);
  if (result.errors.length) {
    console.error("Knowledge-development eval suite validation failed:");
    for (const error of result.errors) console.error(`- ${error}`);
    process.exit(1);
  }
  console.log(
    `Knowledge-development eval suite passed: ${result.evalCount} evals, ` +
      `${result.blockingCount} blocking, weights total ${result.totalWeight}.`
  );
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) run();
