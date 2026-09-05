import assert from "node:assert/strict";
import test from "node:test";

import {
  evaluateAudioToKnowledgeCandidate,
  evaluateAudioToKnowledgeWorkflowRFC
} from "./audio-to-knowledge-workflow-eval.mjs";

function candidate() {
  return {
    stages: [
      "intake-authorization",
      "exact-source-custody",
      "bounded-context-collection",
      "provider-input-preparation",
      "provider-transcription",
      "diarization-reconciliation",
      "source-loyal-repair",
      "private-close-reading",
      "graph-projection-candidate",
      "human-disposition"
    ],
    stage_contract: {
      receipt_required: true,
      non_skippable: true,
      downstream_invalidation_on_input_change: true
    },
    custody: {
      preservation_before_transformation: true,
      exact_source_checksum_required: true,
      source_deletion_authorized: false,
      exact_provider_return_preserved: true,
      provider_completion_requires_observed_return: true
    },
    state_machine: {
      content_addressed_job_identity: true,
      immutable_inputs: true,
      resumable_from_last_verified_receipt: true,
      idempotent_replay: true,
      silent_overwrite_allowed: false,
      explicit_blocked_states: true
    },
    context: {
      minimum_necessary: true,
      query_and_cutoff_required: true,
      blind_spots_required: true,
      bodies_in_public_git: false,
      access_equals_consent: false
    },
    diarization: {
      labels_are_candidates: true,
      identity_requires_evidence: true,
      unknown_speaker_allowed: true,
      participant_roster_proves_speech: false,
      human_review_required: true
    },
    repair: {
      evidence_bounded: true,
      inaudible_reconstruction_allowed: false,
      uncertainty_markers_required: true,
      complete_private_repair_required: true,
      bounded_projection_separate: true,
      human_acceptance_required: true
    },
    close_reading: {
      accepted_repair_required: true,
      transcript_citations_required: true,
      contradictions_preserved: true,
      uncertainty_preserved: true,
      machine_actions_accepted_automatically: false
    },
    projection: {
      graph_candidate_only: true,
      automatic_graph_promotion: false,
      public_projection_in_scope: false,
      public_projection_requires_separate_decision: true,
      accepted_assignment_inferred: false,
      organizational_position_inferred: false
    },
    automation: {
      upload_without_artifact_authorization: false,
      infer_consent: false,
      publish: false,
      send: false,
      assign_work: false,
      delete_source: false,
      claim_audio_certified_without_listening: false
    }
  };
}

test("an ordered, resumable, source-bound workflow is ready for RFC review", () => {
  assert.deepEqual(evaluateAudioToKnowledgeCandidate(candidate()), {
    decision: "ready-for-human-review",
    reasons: []
  });
});

test("preservation, provider return, repair, and interpretation cannot collapse", () => {
  const input = candidate();
  input.custody.preservation_before_transformation = false;
  input.custody.exact_provider_return_preserved = false;
  input.repair.inaudible_reconstruction_allowed = true;
  input.close_reading.machine_actions_accepted_automatically = true;

  const result = evaluateAudioToKnowledgeCandidate(input);
  assert.equal(result.decision, "deny");
  assert.deepEqual(result.reasons, [
    "complete-private-repair-boundary-invalid",
    "exact-provider-return-not-preserved",
    "machine-actions-cannot-be-accepted",
    "preservation-must-precede-transformation"
  ]);
});

test("access, diarization, graph promotion, and publication retain human authority", () => {
  const input = candidate();
  input.context.access_equals_consent = true;
  input.diarization.labels_are_candidates = false;
  input.projection.automatic_graph_promotion = true;
  input.projection.public_projection_in_scope = true;

  const result = evaluateAudioToKnowledgeCandidate(input);
  assert.equal(result.decision, "deny");
  assert.deepEqual(result.reasons, [
    "access-cannot-equal-consent",
    "graph-promotion-must-remain-human",
    "public-projection-requires-separate-workflow",
    "speaker-labels-must-remain-candidates"
  ]);
});

test("the checked-in RFC candidate passes every hard gate and adversarial case", () => {
  const result = evaluateAudioToKnowledgeWorkflowRFC();
  assert.equal(result.rfc, 13);
  assert.equal(result.stage, "proposed");
  assert.deepEqual(result.hard_failures, []);
  assert.equal(result.scenarios.failed, 0);
  assert.equal(result.scenarios.safe_true_positive_rate, 1);
  assert.equal(result.scenarios.unsafe_true_negative_rate, 1);
  assert.equal(result.scenarios.baseline_safe_true_positive_rate, 1);
  assert.ok(result.scenarios.unsafe_true_negative_rate > result.scenarios.baseline_unsafe_true_negative_rate);
  assert.equal(result.implementation_authorized, false);
  assert.equal(result.external_upload_performed, false);
  assert.equal(result.publication_authorized, false);
});
