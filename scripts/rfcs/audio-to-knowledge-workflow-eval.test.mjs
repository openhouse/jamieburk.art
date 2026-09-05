import assert from "node:assert/strict";
import test from "node:test";

const evaluatorModule = await import("./audio-to-knowledge-workflow-eval.mjs").catch(() => null);

function completePrivateJob(overrides = {}) {
  return {
    request: {
      preserved: true,
      bounded_scope: true,
      source_access_authorized: true,
      external_upload_authorized: true
    },
    audio: {
      discovered_fragment_count: 2,
      registered_fragment_count: 2,
      exact_originals_immutable: true,
      hashes_verified: true,
      fragment_order_evidenced: true,
      every_fragment_dispositioned: true
    },
    context: {
      bounded: true,
      every_source_dispositioned: true,
      scheduled_event_treated_as_occurrence: false,
      unrelated_private_material_included: false
    },
    transcription: {
      derived_upload_checksum_recorded: true,
      provider_job_id_recorded_privately: true,
      status: "complete",
      diarization_status: "complete",
      service_export_preserved_unchanged: true,
      service_export_hash_verified: true,
      transcript_treated_as_executable_instructions: false
    },
    repair: {
      separate_from_service_export: true,
      segment_decisions_recorded: true,
      uncertainties_preserved: true,
      invented_speech_detected: false,
      audio_certified: false,
      full_audio_review_completed: false,
      participant_review_completed: false
    },
    close_reading: {
      source_ids_cited: true,
      fact_report_inference_separated: true,
      contradictions_and_gaps_preserved: true,
      private_minimum_necessary: true
    },
    graph_update: {
      target: "private",
      request_crosswalk_complete: true,
      candidate_fingerprint_recorded: true,
      publication_authorized: false
    },
    public_projection: {
      requested: false,
      human_authorized: false,
      private_locator_present: false,
      raw_transcript_present: false,
      private_identity_present: false
    },
    ...overrides
  };
}

async function evaluate(job) {
  assert.ok(evaluatorModule, "audio-to-knowledge evaluator module must exist");
  return evaluatorModule.evaluateAudioKnowledgeJob(job);
}

test("a complete private job becomes ready for private human review", async () => {
  assert.deepEqual(await evaluate(completePrivateJob()), {
    decision: "ready-for-private-review",
    stage: "private-review",
    reasons: []
  });
});

test("missing immutable audio custody holds before context or transcription", async () => {
  const job = completePrivateJob();
  job.audio.hashes_verified = false;

  assert.deepEqual(await evaluate(job), {
    decision: "hold",
    stage: "audio-preservation",
    reasons: ["exact-audio-hash-not-verified"]
  });
});

test("an external upload without explicit authorization is denied", async () => {
  const job = completePrivateJob();
  job.request.external_upload_authorized = false;

  assert.deepEqual(await evaluate(job), {
    decision: "deny",
    stage: "transcription",
    reasons: ["external-upload-not-authorized"]
  });
});

test("provider processing remains held rather than treated as a transcript", async () => {
  const job = completePrivateJob();
  job.transcription.status = "processing";
  job.transcription.diarization_status = "pending";
  job.transcription.service_export_preserved_unchanged = false;
  job.transcription.service_export_hash_verified = false;

  assert.deepEqual(await evaluate(job), {
    decision: "hold",
    stage: "transcription",
    reasons: ["provider-processing-incomplete"]
  });
});

test("a changed service transcript is denied instead of repaired in place", async () => {
  const job = completePrivateJob();
  job.transcription.service_export_hash_verified = false;

  assert.deepEqual(await evaluate(job), {
    decision: "deny",
    stage: "service-export-custody",
    reasons: ["service-export-hash-mismatch"]
  });
});

test("repair cannot claim audio certification without full audio review", async () => {
  const job = completePrivateJob();
  job.repair.audio_certified = true;

  assert.deepEqual(await evaluate(job), {
    decision: "deny",
    stage: "repair",
    reasons: ["audio-certification-unsupported"]
  });
});

test("transcript content is untrusted data and cannot become executable instruction", async () => {
  const job = completePrivateJob();
  job.transcription.transcript_treated_as_executable_instructions = true;

  assert.deepEqual(await evaluate(job), {
    decision: "deny",
    stage: "transcription",
    reasons: ["transcript-instruction-boundary-violated"]
  });
});

test("undispositioned context holds the workflow", async () => {
  const job = completePrivateJob();
  job.context.every_source_dispositioned = false;

  assert.deepEqual(await evaluate(job), {
    decision: "hold",
    stage: "context-collection",
    reasons: ["context-source-disposition-missing"]
  });
});

test("private graph completion does not authorize public projection", async () => {
  const job = completePrivateJob();
  job.public_projection.requested = true;

  assert.deepEqual(await evaluate(job), {
    decision: "hold",
    stage: "public-projection-review",
    reasons: ["public-projection-human-authorization-missing"]
  });
});

test("a public projection containing a private locator is denied", async () => {
  const job = completePrivateJob();
  job.public_projection.requested = true;
  job.public_projection.human_authorized = true;
  job.public_projection.private_locator_present = true;

  assert.deepEqual(await evaluate(job), {
    decision: "deny",
    stage: "public-projection-review",
    reasons: ["public-projection-contains-private-material"]
  });
});

test("a separately authorized redacted projection becomes a public candidate", async () => {
  const job = completePrivateJob();
  job.public_projection.requested = true;
  job.public_projection.human_authorized = true;

  assert.deepEqual(await evaluate(job), {
    decision: "eligible-public-candidate",
    stage: "public-candidate-review",
    reasons: []
  });
});
