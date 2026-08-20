import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { evaluateCoverLetterPortfolio } from "./evaluate-cover-letter-portfolio.mjs";
import { coverLetterCacheKey, planCoverLetterReaderCalls } from "./plan-hiring-reader-llm.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

function readJson(relativePath, root = repoRoot) {
  return JSON.parse(readFileSync(path.join(root, relativePath), "utf8"));
}

const defaultConfig = readJson("evals/cover-letters/hiring-reader-portfolio.json");

function resultErrors(result) {
  const errors = [];
  if (!["pass", "fail"].includes(result.verdict)) errors.push("invalid-verdict");
  const expectedDecision = result.verdict === "pass" ? "advance-to-structured-next-step" : "do-not-advance";
  if (result.decision !== expectedDecision) errors.push("verdict-decision-mismatch");
  if (result.verdict === "pass" && result.voiceFidelity?.verdict !== "pass") errors.push("voice-verdict-failed");
  if (result.actualPersonParticipated !== false) errors.push("actual-person-boundary-failed");
  for (const field of ["rationale", "constructiveCritique", "validateNext", "boundary"]) {
    if (typeof result[field] !== "string" || result[field].trim().length < 30) errors.push(`${field}-missing-or-too-short`);
  }
  if (!Array.isArray(result.strengths) || result.strengths.length < 2) errors.push("insufficient-strengths");
  if (!Array.isArray(result.missingEvidence)) errors.push("missing-evidence-not-array");
  if (typeof result.voiceFidelity?.rationale !== "string" || result.voiceFidelity.rationale.length < 30) errors.push("voice-rationale-missing");
  if (!Array.isArray(result.voiceFidelity?.presentSignals) || result.voiceFidelity.presentSignals.length < 2) errors.push("voice-signals-insufficient");
  return errors;
}

export function evaluateCoverLetterHiringReaderLlm({
  root = repoRoot,
  config = defaultConfig,
  recordedRun = readJson(config.modelGate.currentRunPath, root)
} = {}) {
  const preflight = evaluateCoverLetterPortfolio({ root, config });
  const plan = planCoverLetterReaderCalls({ root, config });
  const plannedByKey = new Map(plan.calls.map((call) => [coverLetterCacheKey(call), call]));
  const results = Array.isArray(recordedRun.results) ? recordedRun.results : [];
  const resultByKey = new Map(results.map((result) => [result.cacheKey, result]));
  const checks = [
    {
      id: "deterministic-preflight-ran-first",
      pass: preflight.overall === "pass" && plan.status === "eligible",
      detail: `${plan.plannedCallCount} calls became eligible only after deterministic checks passed.`
    },
    {
      id: "cost-gate-skipped-unselected-readers",
      pass: results.every((result) => plannedByKey.has(result.cacheKey)),
      detail: `${plan.skippedCallCount} unselected or expired reader pairs consumed no model work.`
    },
    {
      id: "run-boundary-is-fictionalized",
      pass: recordedRun.actualPeopleParticipated === false && recordedRun.acceptanceQuestion === config.contract.acceptanceQuestion,
      detail: "No named person participated or endorsed Jamie."
    },
    {
      id: "recorded-results-exactly-cover-plan",
      pass: results.length === plannedByKey.size && resultByKey.size === plannedByKey.size && [...plannedByKey.keys()].every((key) => resultByKey.has(key)),
      detail: `${resultByKey.size}/${plannedByKey.size} hash-bound calls have one result.`
    }
  ];
  const evaluatedResults = results.map((result) => {
    const planCall = plannedByKey.get(result.cacheKey);
    const errors = resultErrors(result);
    if (!planCall) errors.push("result-not-in-current-plan");
    for (const field of ["opportunityId", "readerPairId", "coverLetterSha256", "resumeSha256", "contextSha256", "voiceProfileSha256", "postingSourceReviewedAt", "voiceSourceModifiedAt", "promptVersion"]) {
      if (planCall && result[field] !== planCall[field]) errors.push(`${field}-mismatch`);
    }
    if (result.pairId !== result.readerPairId) errors.push("output-pair-id-mismatch");
    return { ...result, errors, current: errors.length === 0 };
  });
  const allCurrent = evaluatedResults.length === plannedByKey.size && evaluatedResults.every((result) => result.current);
  const allPass = allCurrent && evaluatedResults.every((result) => result.verdict === "pass" && result.voiceFidelity.verdict === "pass");
  const overall = checks.every((check) => check.pass) && allPass ? "pass" : "fail";
  return {
    schemaVersion: 1,
    evalId: "hiring-reader-llm-cover-letters-2026-08-20",
    evaluatedAt: recordedRun.evaluatedAt,
    overall,
    decision: overall === "pass" ? "advance-to-structured-next-step" : "do-not-advance",
    summary: {
      selectedOpportunities: plan.selectedOpportunityIds.length,
      deterministicReaderCallsSkipped: plan.skippedCallCount,
      plannedModelCalls: plannedByKey.size,
      currentModelResults: evaluatedResults.filter((result) => result.current).length,
      passingModelResults: evaluatedResults.filter((result) => result.current && result.verdict === "pass" && result.voiceFidelity.verdict === "pass").length
    },
    checks,
    results: evaluatedResults,
    actualPeopleParticipated: false,
    boundary: "These are independent fictionalized public-source model simulations. No named person participated or endorsed Jamie, and a pass advances only to a normal structured hiring step."
  };
}

function main() {
  const result = evaluateCoverLetterHiringReaderLlm();
  console.log(JSON.stringify(result, null, 2));
  assert.equal(result.overall, "pass", "Current selected cover letter did not clear every planned fictionalized hiring-reader model gate");
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
