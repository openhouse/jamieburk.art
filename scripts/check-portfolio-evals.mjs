import { readFileSync } from "node:fs";

const suitePath = ".agents/evals/portfolio-production-readiness.json";
const suite = JSON.parse(readFileSync(suitePath, "utf8"));
const errors = [];

function requireValue(condition, message) {
  if (!condition) errors.push(message);
}

requireValue(suite.version === 2, "suite.version must be 2");
requireValue(
  suite.suite_id === "portfolio-production-readiness",
  "suite.suite_id must be portfolio-production-readiness"
);
requireValue(Array.isArray(suite.hard_constraints) && suite.hard_constraints.length > 0,
  "suite.hard_constraints must be a non-empty array");
requireValue(Array.isArray(suite.evals) && suite.evals.length > 0,
  "suite.evals must be a non-empty array");

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
  requireValue(typeof entry.id === "string" && /^PR-\d{3}$/.test(entry.id),
    `${prefix}.id must use PR-### format`);
  requireValue(!ids.has(entry.id), `${prefix}.id must be unique`);
  ids.add(entry.id);
  requireValue(typeof entry.title === "string" && entry.title.trim().length > 0,
    `${prefix}.title is required`);
  requireValue(allowedGraders.has(entry.grader), `${prefix}.grader is invalid`);
  requireValue(typeof entry.blocking === "boolean", `${prefix}.blocking must be boolean`);
  requireValue(Number.isInteger(entry.weight) && entry.weight > 0,
    `${prefix}.weight must be a positive integer`);
  requireValue(Array.isArray(entry.inputs) && entry.inputs.length > 0,
    `${prefix}.inputs must be non-empty`);
  requireValue(Array.isArray(entry.procedure) && entry.procedure.length > 0,
    `${prefix}.procedure must be non-empty`);
  requireValue(Array.isArray(entry.pass_criteria) && entry.pass_criteria.length > 0,
    `${prefix}.pass_criteria must be non-empty`);
  requireValue(Array.isArray(entry.evidence_required) && entry.evidence_required.length > 0,
    `${prefix}.evidence_required must be non-empty`);
  requireValue(typeof entry.remediation_hint === "string" && entry.remediation_hint.trim().length > 0,
    `${prefix}.remediation_hint is required`);

  totalWeight += Number.isInteger(entry.weight) ? entry.weight : 0;
  if (entry.blocking) blockingCount += 1;
}

requireValue(totalWeight === 100, `eval weights must total 100; received ${totalWeight}`);
requireValue(blockingCount > 0, "suite must include at least one blocking eval");

const thresholds = suite.launch_thresholds ?? {};
requireValue(
  typeof thresholds.weighted_score_minimum === "number" &&
    thresholds.weighted_score_minimum >= 0 &&
    thresholds.weighted_score_minimum <= 1,
  "launch threshold weighted_score_minimum must be between 0 and 1"
);
requireValue(
  Number.isInteger(thresholds.individual_score_minimum) &&
    thresholds.individual_score_minimum >= suite.score_scale.minimum &&
    thresholds.individual_score_minimum <= suite.score_scale.maximum,
  "launch threshold individual_score_minimum must fit the score scale"
);
requireValue(
  Number.isInteger(thresholds.chad_lens_median_minimum) &&
    thresholds.chad_lens_median_minimum >= suite.score_scale.minimum &&
    thresholds.chad_lens_median_minimum <= suite.score_scale.maximum,
  "Chad Lens median threshold must fit the score scale"
);
for (const [key, label] of [
  ["margaret_morse_lens_median_minimum", "Margaret Morse Lens"],
  ["warren_sack_lens_median_minimum", "Warren Sack Lens"]
]) {
  requireValue(
    Number.isInteger(thresholds[key]) &&
      thresholds[key] >= suite.score_scale.minimum &&
      thresholds[key] <= suite.score_scale.maximum,
    `${label} median threshold must fit the score scale`
  );
}
requireValue(thresholds.all_blocking_evals_must_pass === true,
  "all blocking evals must pass");
requireValue(thresholds.human_production_approval_required === true,
  "human production approval must be required");

if (errors.length) {
  console.error("Portfolio eval suite validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  `Portfolio eval suite passed: ${suite.evals.length} evals, ` +
    `${blockingCount} blocking, weights total ${totalWeight}.`
);
