#!/usr/bin/env node

import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { validateRunBinding } from "./lib/eval-run-contract.mjs";

const suitePath = ".agents/evals/portfolio-production-readiness.json";

export function scoreRun(suite, run) {
  const errors = validateRunBinding(suite, run);
  const blockers = [];
  const allowedTargets = new Set(suite.run_record_schema?.allowed_targets ?? []);

  if (run.suite_id !== suite.suite_id) errors.push("run suite_id does not match the rubric");
  if (!allowedTargets.has(run.target)) errors.push(`unsupported target: ${run.target ?? "missing"}`);
  if (typeof run.candidate_sha !== "string" || !run.candidate_sha.trim()) {
    errors.push("candidate_sha is required");
  }
  if (typeof run.rubric_sha !== "string" || !run.rubric_sha.trim()) {
    errors.push("rubric_sha is required");
  }
  if (!Array.isArray(run.results)) errors.push("results must be an array");

  const results = new Map();
  for (const [index, result] of (run.results ?? []).entries()) {
    const prefix = `results[${index}]`;
    if (typeof result.eval_id !== "string") {
      errors.push(`${prefix}.eval_id is required`);
      continue;
    }
    if (results.has(result.eval_id)) errors.push(`duplicate result for ${result.eval_id}`);
    results.set(result.eval_id, result);

    if (!Number.isInteger(result.score) || result.score < 0 || result.score > 4) {
      errors.push(`${result.eval_id}.score must be an integer from 0 to 4`);
    }
    if (typeof result.pass !== "boolean") errors.push(`${result.eval_id}.pass must be boolean`);
    if (!Array.isArray(result.evidence) || result.evidence.length === 0) {
      errors.push(`${result.eval_id}.evidence must be non-empty`);
    }
    if (!Array.isArray(result.findings)) errors.push(`${result.eval_id}.findings must be an array`);
    if (
      result.recommended_next_move !== null &&
      typeof result.recommended_next_move !== "string"
    ) {
      errors.push(`${result.eval_id}.recommended_next_move must be a string or null`);
    }
    if (typeof result.confidence !== "number" || result.confidence < 0 || result.confidence > 1) {
      errors.push(`${result.eval_id}.confidence must be between 0 and 1`);
    }
    if (result.pass && result.evidence?.includes("not_observed")) {
      errors.push(`${result.eval_id} cannot pass with not_observed evidence`);
    }
  }

  for (const entry of suite.evals) {
    if (!results.has(entry.id)) errors.push(`missing result for ${entry.id}`);
  }
  for (const id of results.keys()) {
    if (!suite.evals.some((entry) => entry.id === id)) errors.push(`unknown eval result: ${id}`);
  }

  const thresholds =
    run.target === "production-launch"
      ? suite.production_launch_thresholds
      : suite.application_share_thresholds;

  let weightedScore = 0;
  for (const entry of suite.evals) {
    const result = results.get(entry.id);
    if (!result || !Number.isInteger(result.score)) continue;
    weightedScore += (entry.weight * result.score) / 4 / 100;

    const minimum = entry.blocking
      ? thresholds.blocking_score_minimum
      : thresholds.nonblocking_score_minimum;
    if (result.score < minimum) {
      blockers.push(`${entry.id} scores ${result.score}; minimum is ${minimum}`);
    }
  }

  if (weightedScore < thresholds.weighted_score_minimum) {
    blockers.push(
      `weighted score ${weightedScore.toFixed(3)} is below ${thresholds.weighted_score_minimum.toFixed(3)}`
    );
  }

  if (run.target === "production-launch") {
    for (const entry of suite.evals.filter((candidate) => candidate.blocking)) {
      if (results.get(entry.id)?.pass !== true) blockers.push(`${entry.id} blocking eval did not pass`);
    }
    if (
      typeof run.blind_reader_median !== "number" ||
      run.blind_reader_median < thresholds.blind_reader_median_minimum
    ) {
      blockers.push(
        `blind reader median ${run.blind_reader_median ?? "missing"} is below ${thresholds.blind_reader_median_minimum}`
      );
    }
    if (run.holdout_regression_pass !== true) blockers.push("holdout regression did not pass");
    if (
      !Number.isInteger(run.consecutive_passing_runs) ||
      run.consecutive_passing_runs < 2
    ) {
      blockers.push("two consecutive passing runs are required");
    }
  } else {
    for (const id of thresholds.required_eval_ids ?? []) {
      if (results.get(id)?.pass !== true) blockers.push(`${id} required application eval did not pass`);
    }
  }

  if (run.human_approval?.granted !== true) {
    blockers.push("human approval is required");
  } else if (run.human_approval.candidate_sha !== run.candidate_sha) {
    blockers.push("human approval must name the exact candidate SHA");
  }

  return {
    suite_id: suite.suite_id,
    target: run.target,
    candidate_sha: run.candidate_sha,
    weighted_score: Number(weightedScore.toFixed(4)),
    eligible: errors.length === 0 && blockers.length === 0,
    errors,
    blockers
  };
}

function runCli() {
  const runPath = process.argv[2];
  if (!runPath) {
    console.error("Usage: npm run evals:portfolio:score -- <run.json>");
    process.exit(2);
  }

  const suite = JSON.parse(readFileSync(suitePath, "utf8"));
  const run = JSON.parse(readFileSync(runPath, "utf8"));
  const result = scoreRun(suite, run);
  console.log(JSON.stringify(result, null, 2));
  if (!result.eligible) process.exit(1);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) runCli();
