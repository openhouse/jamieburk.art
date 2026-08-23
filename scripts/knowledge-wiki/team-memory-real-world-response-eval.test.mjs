import assert from "node:assert/strict";
import test from "node:test";

import {
  evaluateTeamMemoryResponse,
  loadTeamMemoryResponseCandidate
} from "./team-memory-real-world-response-eval.mjs";

test("the governed real-world response clears every deterministic boundary", () => {
  const result = evaluateTeamMemoryResponse(loadTeamMemoryResponseCandidate());
  assert.equal(result.passed, true, result.failures.join("\n"));
  assert.equal(result.stage, "deterministic");
});

test("a warm acknowledgment cannot be promoted to page review", () => {
  const candidate = structuredClone(loadTeamMemoryResponseCandidate());
  candidate.response.state.pageReviewed = "observed";

  const result = evaluateTeamMemoryResponse(candidate);
  assert.equal(result.passed, false);
  assert.match(result.failures.join("\n"), /pageReviewed must remain not-established/i);
});

test("a future conversation cannot be promoted to hiring interest", () => {
  const candidate = structuredClone(loadTeamMemoryResponseCandidate());
  candidate.response.state.hiringInterest = "observed";

  const result = evaluateTeamMemoryResponse(candidate);
  assert.equal(result.passed, false);
  assert.match(result.failures.join("\n"), /hiringInterest must remain not-established/i);
});

test("the response cannot clear a model or public-projection gate", () => {
  const candidate = structuredClone(loadTeamMemoryResponseCandidate());
  candidate.response.disposition.modelEvalEffect = "pass";
  candidate.response.disposition.publicProjection = "active";

  const result = evaluateTeamMemoryResponse(candidate);
  assert.equal(result.passed, false);
  assert.match(result.failures.join("\n"), /modelEvalEffect must remain none/i);
  assert.match(result.failures.join("\n"), /publicProjection must remain hold/i);
});

test("the response cannot be counted as collaborator corroboration", () => {
  const candidate = structuredClone(loadTeamMemoryResponseCandidate());
  const intake = candidate.knowledgeBank.intakeItems.find((item) =>
    item.sourceIds.includes(candidate.config.sourceRecordId)
  );
  intake.kind = "collaborator-note";

  const result = evaluateTeamMemoryResponse(candidate);
  assert.equal(result.passed, false);
  assert.match(result.failures.join("\n"), /not human corroboration/i);
});

test("private personal context fails the minimization gate", () => {
  const candidate = structuredClone(loadTeamMemoryResponseCandidate());
  candidate.response.personalCircumstances = "synthetic private detail";

  const result = evaluateTeamMemoryResponse(candidate);
  assert.equal(result.passed, false);
  assert.match(result.failures.join("\n"), /personal-context/i);
});
