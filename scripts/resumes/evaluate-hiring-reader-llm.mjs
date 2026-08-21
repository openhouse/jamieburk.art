import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { evaluateHiringReaderPortfolio } from "./evaluate-hiring-reader-portfolio.mjs";
import { selectPublicResume } from "./select-public-resume.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

function readJson(relativePath, root = repoRoot) {
  return JSON.parse(readFileSync(path.join(root, relativePath), "utf8"));
}

const defaultConfig = readJson("evals/resumes/public-resume-selection.json");

function cacheKey(call) {
  return [
    call.opportunityId,
    call.readerPairId,
    call.resumeSha256,
    call.contextSha256,
    call.postingSourceReviewedAt,
    call.promptVersion
  ].join("|");
}

function resultErrors(result) {
  const errors = [];
  if (!["pass", "fail"].includes(result.verdict)) errors.push("invalid-verdict");
  const expectedDecision =
    result.verdict === "pass" ? "advance-to-structured-next-step" : "do-not-advance";
  if (result.decision !== expectedDecision) errors.push("verdict-decision-mismatch");
  if (result.actualPersonParticipated !== false) errors.push("actual-person-boundary-failed");
  for (const field of ["rationale", "constructiveCritique", "validateNext", "boundary"]) {
    if (typeof result[field] !== "string" || result[field].trim().length < 30) {
      errors.push(`${field}-missing-or-too-short`);
    }
  }
  if (!Array.isArray(result.strengths) || result.strengths.length < 2) {
    errors.push("insufficient-strengths");
  }
  if (!Array.isArray(result.missingEvidence)) errors.push("missing-evidence-not-array");
  return errors;
}

export function evaluateHiringReaderLlm({
  root = repoRoot,
  config = defaultConfig,
  recordedRun = readJson(config.modelGate.currentRunPath, root)
} = {}) {
  const selector = selectPublicResume({ root, config });
  const deterministic = evaluateHiringReaderPortfolio({ root, selectionConfig: config });
  const plannedByKey = new Map(selector.llmPlan.calls.map((call) => [cacheKey(call), call]));
  const results = Array.isArray(recordedRun.results) ? recordedRun.results : [];
  const resultByKey = new Map(results.map((result) => [result.cacheKey, result]));

  const checks = [
    {
      id: "deterministic-selector-passed-first",
      pass: selector.overall === "pass" && selector.llmPlan.status === "eligible",
      detail: `${selector.llmPlan.plannedCallCount} calls became eligible only after deterministic selection passed.`
    },
    {
      id: "artifact-signal-preflight-passed-first",
      pass: deterministic.overall === "pass",
      detail: "The exact selected artifact cleared structure, safety, and reader-signal coverage before model review."
    },
    {
      id: "run-boundary-is-fictionalized",
      pass:
        recordedRun.actualPeopleParticipated === false &&
        recordedRun.acceptanceQuestion === config.modelGate.acceptanceQuestion,
      detail: "The named people did not participate; the run records fictionalized public-source lenses only."
    },
    {
      id: "recorded-results-exactly-cover-plan",
      pass:
        results.length === plannedByKey.size &&
        resultByKey.size === plannedByKey.size &&
        [...plannedByKey.keys()].every((key) => resultByKey.has(key)),
      detail: `${resultByKey.size}/${plannedByKey.size} hash-bound planned calls have one cached result.`
    },
    {
      id: "no-model-work-for-deterministically-skipped-readers",
      pass: results.every((result) => plannedByKey.has(result.cacheKey)),
      detail: `${selector.llmPlan.skippedCallCount} out-of-tier reader calls remained skipped.`
    }
  ];

  const evaluatedResults = results.map((result) => {
    const plan = plannedByKey.get(result.cacheKey);
    const errors = resultErrors(result);
    if (!plan) errors.push("result-not-in-current-plan");
    if (plan && result.opportunityId !== plan.opportunityId) errors.push("opportunity-id-mismatch");
    if (plan && result.readerPairId !== plan.readerPairId) errors.push("reader-pair-id-mismatch");
    if (result.pairId !== result.readerPairId) errors.push("output-pair-id-mismatch");
    if (plan && result.resumeSha256 !== plan.resumeSha256) errors.push("resume-hash-mismatch");
    if (plan && result.contextSha256 !== plan.contextSha256) errors.push("context-hash-mismatch");
    if (plan && result.postingSourceReviewedAt !== plan.postingSourceReviewedAt) {
      errors.push("posting-review-date-mismatch");
    }
    if (plan && result.promptVersion !== plan.promptVersion) errors.push("prompt-version-mismatch");
    return { ...result, errors, current: errors.length === 0 };
  });

  const allCurrent = evaluatedResults.length === plannedByKey.size && evaluatedResults.every((result) => result.current);
  const allPass = allCurrent && evaluatedResults.every((result) => result.verdict === "pass");
  const overall = checks.every((check) => check.pass) && allPass ? "pass" : "fail";

  return {
    schemaVersion: 1,
    evalId: "hiring-reader-llm-public-resume-2026-08-20",
    evaluatedAt: recordedRun.evaluatedAt,
    overall,
    decision: overall === "pass" ? "advance-to-structured-next-step" : "do-not-advance",
    summary: {
      selectedOpportunities: selector.selection.opportunityIds.length,
      deterministicReaderCallsSkipped: selector.llmPlan.skippedCallCount,
      plannedModelCalls: plannedByKey.size,
      currentModelResults: evaluatedResults.filter((result) => result.current).length,
      passingModelResults: evaluatedResults.filter((result) => result.current && result.verdict === "pass").length
    },
    checks,
    results: evaluatedResults,
    actualPeopleParticipated: false,
    boundary: "These are independent model simulations of explicitly fictionalized public-source hiring-reader lenses. No named person participated or endorsed Jamie, and a pass advances only to a normal structured hiring step."
  };
}

function main() {
  const result = evaluateHiringReaderLlm();
  console.log(JSON.stringify(result, null, 2));
  assert.equal(result.overall, "pass", "Current public resume did not clear every planned fictionalized hiring-reader model gate");
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
