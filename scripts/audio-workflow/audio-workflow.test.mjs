import assert from "node:assert/strict";
import test from "node:test";

async function loadWorkflow() {
  try {
    return await import("./core.mjs");
  } catch (error) {
    assert.fail(`accepted audio workflow implementation must exist: ${error.message}`);
  }
}

function receipt(inputFingerprint, outputFingerprint = inputFingerprint) {
  return {
    status: "complete",
    input_fingerprint: inputFingerprint,
    output_fingerprint: outputFingerprint,
    artifact_count: 1,
    unresolved_conditions: []
  };
}

test("an external transcription stage cannot advance without active transfer confirmation", async () => {
  const { createJobManifest, completeStage } = await loadWorkflow();
  let job = createJobManifest({
    job_id: "job-001",
    disposition: "queued",
    provider: { processing: "external" },
    authority: {
      source_access: true,
      private_preservation: true,
      external_transfer: false,
      private_data_confirmed: false,
      known_speaker_reference: false
    }
  });

  job = completeStage(job, "intake", receipt("request-a"));
  job = completeStage(job, "inventory", receipt("request-a", "inventory-a"));
  job = completeStage(job, "preservation", receipt("inventory-a", "source-a"));
  job = completeStage(job, "preparation", receipt("source-a", "derivative-a"));

  assert.throws(
    () => completeStage(job, "transcription", receipt("derivative-a", "export-a")),
    /external-private-data-transfer-confirmation-required/
  );
});

test("an unchanged retry is idempotent and an upstream change invalidates every dependent receipt", async () => {
  const { createJobManifest, completeStage } = await loadWorkflow();
  let job = createJobManifest({
    job_id: "job-002",
    disposition: "queued",
    provider: { processing: "external" },
    authority: {
      source_access: true,
      private_preservation: true,
      external_transfer: true,
      private_data_confirmed: true,
      known_speaker_reference: false
    }
  });

  for (const [stage, input, output] of [
    ["intake", "request-a", "request-a"],
    ["inventory", "request-a", "inventory-a"],
    ["preservation", "inventory-a", "source-a"],
    ["preparation", "source-a", "derivative-a"],
    ["transcription", "derivative-a", "export-a"]
  ]) {
    job = completeStage(job, stage, receipt(input, output));
  }

  const retried = completeStage(job, "transcription", receipt("derivative-a", "export-a"));
  assert.deepEqual(retried, job);

  const changed = completeStage(job, "preservation", receipt("inventory-a", "source-b"));
  assert.equal(changed.stages.preservation.status, "complete");
  assert.equal(changed.stages.preparation.status, "not-started");
  assert.equal(changed.stages.transcription.status, "not-started");
  assert.equal(changed.receipts.preparation, undefined);
  assert.equal(changed.receipts.transcription, undefined);
});

test("queue accounting keeps participant holds and current controls non-actionable", async () => {
  const { evaluateQueue } = await loadWorkflow();
  const result = evaluateQueue({
    candidates: [
      { id: "queued", disposition: "queued", priority: "P0" },
      { id: "control", disposition: "reference-current", priority: null, current_method_control: true },
      { id: "held", disposition: "held-participant-restriction", priority: null, participant_restriction: true }
    ]
  });

  assert.deepEqual(result, {
    candidate_count: 3,
    actionable_count: 1,
    reference_count: 1,
    held_count: 1,
    hard_failures: []
  });

  assert.deepEqual(
    evaluateQueue({
      candidates: [
        { id: "held", disposition: "held-participant-restriction", priority: "P1", participant_restriction: true }
      ]
    }).hard_failures,
    ["participant-restricted-candidate-actionable:held"]
  );
});

test("a source-blocked stage is retained as a reason-coded hold without advancing downstream", async () => {
  const { createJobManifest, holdStage } = await loadWorkflow();
  const job = createJobManifest({
    job_id: "job-004",
    disposition: "queued",
    provider: { processing: "local" },
    authority: {
      source_access: true,
      private_preservation: true,
      external_transfer: false,
      private_data_confirmed: false,
      known_speaker_reference: false
    }
  });

  const held = holdStage(job, "inventory", ["source-bytes-unavailable"]);
  assert.deepEqual(held.stages.inventory, {
    status: "held",
    reason_codes: ["source-bytes-unavailable"]
  });
  assert.equal(held.stages.preservation.status, "not-started");
});

test("operator logs expose only opaque identity, stage states, counts, and reason codes", async () => {
  const { createJobManifest, summarizeJob } = await loadWorkflow();
  const job = createJobManifest({
    job_id: "job-opaque-003",
    disposition: "queued",
    provider: { processing: "local" },
    authority: {
      source_access: true,
      private_preservation: true,
      external_transfer: false,
      private_data_confirmed: false,
      known_speaker_reference: false
    },
    private_context: {
      participant_name: "Private Person",
      source_path: "/private/source/audio.wav",
      transcript_body: "private dialogue"
    }
  });

  const summary = summarizeJob(job);
  const serialized = JSON.stringify(summary);
  assert.equal(summary.job_id, "job-opaque-003");
  assert.equal(serialized.includes("Private Person"), false);
  assert.equal(serialized.includes("/private/source/audio.wav"), false);
  assert.equal(serialized.includes("private dialogue"), false);
});

test("a reason-coded hold produces a nonzero automation exit policy", async () => {
  let exitCodeForResult;
  try {
    ({ exitCodeForResult } = await import("./cli.mjs"));
  } catch (error) {
    assert.fail(`audio workflow CLI must expose its exit policy: ${error.message}`);
  }

  assert.equal(
    exitCodeForResult({
      hard_failures: [],
      stage_states: { inventory: { status: "held", reason_codes: ["source-bytes-unavailable"] } }
    }),
    2
  );
  assert.equal(exitCodeForResult({ hard_failures: ["invalid"] }), 1);
  assert.equal(exitCodeForResult({ hard_failures: [], stage_states: {} }), 0);
});
