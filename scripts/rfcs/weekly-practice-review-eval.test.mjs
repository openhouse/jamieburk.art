import assert from "node:assert/strict";
import test from "node:test";

import {
  evaluateWeeklyPracticeCandidate,
  evaluateWeeklyPracticeReviewRFC
} from "./weekly-practice-review-eval.mjs";

import contract from "../../rfcs/0014-weekly-practice-review-and-commitment-protocol.contract.json" with { type: "json" };
import spec from "../../evals/knowledge-bank/weekly-practice-review-rfc-evals.json" with { type: "json" };

const base = spec.cases[0].candidate;

test("the bounded candidate enters human review without authorizing adoption", () => {
  assert.deepEqual(evaluateWeeklyPracticeCandidate(contract, base), spec.cases[0].expected);
});

for (const testCase of spec.cases.slice(1)) {
  test(testCase.id, () => {
    const candidate = testCase.candidate ?? { ...base, ...testCase.patch };
    assert.deepEqual(evaluateWeeklyPracticeCandidate(contract, candidate), testCase.expected);
  });
}

test("the exact RFC candidate satisfies the bounded review rubric", () => {
  const result = evaluateWeeklyPracticeReviewRFC();
  assert.equal(result.rfc, 14);
  assert.equal(result.stage, "proposed");
  assert.equal(result.score, 1);
  assert.deepEqual(result.hard_failures, []);
  assert.equal(result.scenarios.total, 17);
  assert.equal(result.scenarios.failed, 0);
  assert.match(result.candidate_fingerprint, /^[a-f0-9]{64}$/);
  assert.equal(result.implementation_authorized, false);
  assert.equal(result.adoption_authorized, false);
  assert.equal(result.publication_authorized, false);
});
