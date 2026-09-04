import assert from "node:assert/strict";
import test from "node:test";

test("the exact RFC 0013 candidate satisfies every deterministic hard gate", async () => {
  let evaluateAudioKnowledgeWorkflowRFC;
  try {
    ({ evaluateAudioKnowledgeWorkflowRFC } = await import(
      "./audio-to-knowledge-workflow-eval.mjs"
    ));
  } catch (error) {
    assert.fail(`audio workflow RFC evaluator must be implemented: ${error.message}`);
  }

  const result = evaluateAudioKnowledgeWorkflowRFC();

  assert.equal(result.rfc, 13);
  assert.equal(result.stage, "proposed");
  assert.equal(result.score, 1);
  assert.deepEqual(result.hard_failures, []);
  assert.equal(result.scenarios.total, 19);
  assert.equal(result.scenarios.passed, 19);
  assert.equal(result.scenarios.failed, 0);
  assert.match(result.candidate_fingerprint, /^[a-f0-9]{64}$/);
  assert.equal(result.implementation_authorized, false);
  assert.equal(result.publication_authorized, false);
  assert.equal(result.external_transfer_authorized_by_rfc, false);
});
