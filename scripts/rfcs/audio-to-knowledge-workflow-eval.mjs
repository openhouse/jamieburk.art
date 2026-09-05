#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { isDeepStrictEqual } from "node:util";

const scriptPath = fileURLToPath(import.meta.url);
const defaultRepoRoot = path.resolve(path.dirname(scriptPath), "../..");
const rfcPath = "rfcs/0013-governed-audio-to-knowledge-workflow.md";
const contractPath = "rfcs/0013-governed-audio-to-knowledge-workflow.contract.json";
const suitePath = "evals/knowledge-bank/audio-to-knowledge-workflow-rfc-evals.json";
const candidatePaths = [
  "package.json",
  "rfcs/README.md",
  rfcPath,
  contractPath,
  suitePath,
  "scripts/check-rfcs.mjs",
  "scripts/rfcs/audio-to-knowledge-workflow-eval.mjs",
  "scripts/rfcs/audio-to-knowledge-workflow-eval.test.mjs",
  "scripts/rfcs/audio-to-knowledge-revisit-queue-rfc.test.mjs",
  "scripts/rfcs/audio-to-knowledge-workflow-rfc.test.mjs",
  "scripts/audio-workflow/core.mjs",
  "scripts/audio-workflow/cli.mjs",
  "scripts/audio-workflow/audio-workflow.test.mjs",
  "scripts/audio-workflow/person-readings.mjs",
  "scripts/audio-workflow/person-readings.test.mjs",
  "scripts/audio-workflow/person-reading-files.mjs",
  "scripts/audio-workflow/person-reading-files.test.mjs"
];

function loadJson(repoRoot, relativePath) {
  return JSON.parse(readFileSync(path.join(repoRoot, relativePath), "utf8"));
}

function mergeState(base, patch) {
  if (Array.isArray(base) || Array.isArray(patch)) return patch;
  if (!base || typeof base !== "object" || !patch || typeof patch !== "object") return patch;

  const result = { ...base };
  for (const [key, value] of Object.entries(patch)) {
    result[key] =
      value && typeof value === "object" && !Array.isArray(value)
        ? mergeState(base[key] ?? {}, value)
        : value;
  }
  return result;
}

function candidateFingerprint(repoRoot) {
  const digest = createHash("sha256");
  for (const relativePath of [...candidatePaths].sort()) {
    digest.update(relativePath);
    digest.update("\0");
    digest.update(readFileSync(path.join(repoRoot, relativePath)));
    digest.update("\0");
  }
  return digest.digest("hex");
}

export function evaluateAudioKnowledgeWorkflow(state) {
  const denyReasons = [];

  if ((state.cloud_recovery?.cloud_mutation_count ?? 0) > 0) {
    denyReasons.push("read-only-cloud-mutation-forbidden");
  }
  if (
    state.cloud_recovery?.source_state === "web-listed" &&
    state.cloud_recovery?.preservation_claimed === true
  ) {
    denyReasons.push("web-listing-not-preservation");
  }
  if (
    state.cloud_recovery?.source_state === "recovered" &&
    state.cloud_recovery?.download_status !== "complete"
  ) {
    denyReasons.push("unrecovered-cloud-source-overclaim");
  }
  if (state.security?.credentials_present === true) {
    denyReasons.push("credential-material-forbidden");
  }
  if (
    state.capture?.originals_immutable !== true ||
    state.preparation?.source_bytes_modified === true
  ) {
    denyReasons.push("source-original-mutation-forbidden");
  }
  if (state.capture?.raw_audio_destination !== "source-vault") {
    denyReasons.push("raw-source-git-destination-forbidden");
  }
  if (
    state.context?.scheduled_event_present === true &&
    state.context?.occurrence_corroborated !== true &&
    state.context?.event_state === "occurred"
  ) {
    denyReasons.push("scheduled-event-occurrence-unsupported");
  }
  if (
    state.diarization?.known_speaker_reference_used === true &&
    state.diarization?.known_speaker_reference_authorized !== true
  ) {
    denyReasons.push("voice-reference-authorization-required");
  }
  if (
    state.diarization?.label_mode === "named" &&
    (state.diarization?.named_identity_supported !== true ||
      state.diarization?.human_reviewed !== true)
  ) {
    denyReasons.push("named-speaker-assignment-unverified");
  }
  if (
    state.revisit_queue?.participant_restriction === true &&
    state.revisit_queue?.candidate_disposition === "queued"
  ) {
    denyReasons.push("participant-restricted-queue-item-actionable");
  }
  if (
    state.revisit_queue?.current_method_control === true &&
    state.revisit_queue?.candidate_disposition === "queued"
  ) {
    denyReasons.push("current-method-control-requeued");
  }
  if (state.revisit_queue?.processing_authority_claimed === true) {
    denyReasons.push("queue-priority-cannot-authorize-processing");
  }
  if (state.revisit_queue?.public_detail_exposed === true) {
    denyReasons.push("private-queue-detail-exposure-forbidden");
  }
  if (state.repair?.status === "complete") {
    if (state.repair?.compared_with_audio !== true) {
      denyReasons.push("repair-audio-comparison-required");
    }
    if (state.repair?.segment_lineage !== true) {
      denyReasons.push("repair-segment-lineage-required");
    }
    if (state.repair?.uncertainty_marked !== true) {
      denyReasons.push("repair-uncertainty-marking-required");
    }
    if (state.repair?.provider_export_modified === true) {
      denyReasons.push("provider-export-mutation-forbidden");
    }
  }
  if (state.repair?.audio_certification_status === "automated-certified") {
    denyReasons.push("automated-audio-certification-forbidden");
  }
  if (state.projection?.automatic === true) {
    denyReasons.push("automatic-publication-forbidden");
  }

  if (denyReasons.length > 0) {
    return {
      decision: "deny",
      publication_authorized: false,
      reasons: denyReasons
    };
  }

  const holdReasons = [];
  if (
    state.cloud_recovery?.download_status === "complete" &&
    (state.cloud_recovery?.private_source_custody !== true ||
      state.cloud_recovery?.sha256_recorded !== true)
  ) {
    holdReasons.push("cloud-recovery-receipt-incomplete");
  }
  if (state.scope?.bounded !== true) holdReasons.push("bounded-call-family-required");
  if (state.scope?.source_access_authorized !== true) {
    holdReasons.push("source-access-authorization-required");
  }
  if (state.scope?.preservation_authorized !== true) {
    holdReasons.push("private-preservation-authorization-required");
  }
  if (
    !state.revisit_queue?.candidate_disposition ||
    state.revisit_queue.candidate_disposition === "unresolved"
  ) {
    holdReasons.push("revisit-candidate-disposition-required");
  }
  if (
    !Number.isInteger(state.capture?.observed_artifact_count) ||
    state.capture.observed_artifact_count < 1 ||
    state.capture?.dispositioned_artifact_count !== state.capture.observed_artifact_count
  ) {
    holdReasons.push("captured-artifact-disposition-incomplete");
  }
  if (state.capture?.originals_hashed !== true) {
    holdReasons.push("source-original-hash-required");
  }
  if (state.preparation?.derived_audio_only !== true) {
    holdReasons.push("derived-processing-media-required");
  }
  if (state.transfer?.external_provider_required === true) {
    if (state.transfer?.authorized !== true) {
      holdReasons.push("external-transfer-authorization-required");
    }
    if (state.transfer?.private_data_confirmed !== true) {
      holdReasons.push("external-private-data-transfer-confirmation-required");
    }
  }
  if (state.transcription?.status !== "complete") {
    holdReasons.push("provider-transcript-incomplete");
  } else {
    if (state.transcription?.provider_export_preserved !== true) {
      holdReasons.push("provider-export-preservation-required");
    }
    if (state.transcription?.provider_and_model_recorded !== true) {
      holdReasons.push("provider-model-receipt-required");
    }
    if (state.transcription?.segment_order_recorded !== true) {
      holdReasons.push("transcript-segment-order-required");
    }
  }
  if (state.diarization?.uncertainty_marked !== true) {
    holdReasons.push("diarization-uncertainty-required");
  }
  if (state.repair?.status !== "complete") {
    holdReasons.push("conservative-repair-incomplete");
  }
  if (
    state.knowledge?.private_close_reading !== "complete" ||
    state.knowledge?.source_ids_resolve !== true ||
    state.knowledge?.claim_states_present !== true ||
    state.knowledge?.destination !== "private-sidecar"
  ) {
    holdReasons.push("private-close-reading-lineage-incomplete");
  }
  if (state.receipt?.candidate_matches !== true) {
    holdReasons.push("candidate-receipt-stale");
  }
  if (state.receipt?.duplicate_artifact_count !== 0) {
    holdReasons.push("non-idempotent-duplicate-artifact");
  }

  if (holdReasons.length > 0) {
    return {
      decision: "hold",
      publication_authorized: false,
      reasons: holdReasons
    };
  }

  return {
    decision: "ready-for-private-knowledge-update",
    publication_authorized: false,
    reasons: []
  };
}

export function evaluateAudioKnowledgeWorkflowRFC(options = {}) {
  const repoRoot = options.repoRoot ?? defaultRepoRoot;
  const contract = options.contract ?? loadJson(repoRoot, contractPath);
  const suite = options.suite ?? loadJson(repoRoot, suitePath);
  const rfc = options.rfcSource ?? readFileSync(path.join(repoRoot, rfcPath), "utf8");

  const scenarioResults = suite.cases.map((scenario) => {
    const state = mergeState(suite.baseline, scenario.patch);
    const actual = evaluateAudioKnowledgeWorkflow(state);
    return {
      id: scenario.id,
      passed: isDeepStrictEqual(actual, scenario.expected),
      actual,
      expected: scenario.expected
    };
  });

  const checks = {
    accepted_implementation_preserves_human_authority:
      contract.rfc === 13 &&
      contract.stage === "implementing" &&
      contract.authority?.decision_owner === "Jamie Burkart" &&
      contract.authority?.implementation_authorized === true &&
      contract.authority?.source_access_authorized_by_rfc === false &&
      contract.authority?.external_transfer_authorized_by_rfc === false &&
      contract.authority?.publication_authorized === false &&
      /^stage:\s+implementing$/m.test(rfc) &&
      /^implementation:\s+scripts\/audio-workflow\/cli\.mjs$/m.test(rfc),
    bounded_per_job_authority:
      contract.authority?.job_authority_mode === "explicit-and-bounded-per-job" &&
      contract.authority?.private_preservation_authorized_by_rfc === false &&
      contract.authority?.known_speaker_reference_authorized_by_rfc === false,
    complete_stage_model:
      isDeepStrictEqual(contract.stages, [
        "intake",
        "inventory",
        "preservation",
        "preparation",
        "transcription",
        "diarization",
        "repair",
        "close-reading",
        "projection",
        "verification"
      ]) &&
      contract.stage_states?.includes("held") &&
      contract.stage_states?.includes("superseded"),
    source_custody_and_immutability:
      contract.custody?.every_observed_artifact_requires_disposition === true &&
      contract.custody?.source_originals_are_immutable === true &&
      contract.custody?.source_originals_require_sha256 === true &&
      contract.custody?.raw_audio_default_destination === "source-vault" &&
      contract.custody?.private_git_is_not_raw_source_vault === true &&
      contract.custody?.processing_uses_derived_media === true &&
      contract.custody?.provider_exports_are_immutable === true,
    provider_adapter_is_bounded:
      contract.provider_adapter?.provider_neutral_contract === true &&
      contract.provider_adapter?.external_transfer_requires_active_job_confirmation === true &&
      contract.provider_adapter?.completion_requires_collected_export === true &&
      contract.provider_adapter?.visible_provider_state_is_not_export === true &&
      contract.provider_adapter?.required_metadata?.length >= 7,
    context_evidence_boundaries:
      contract.context?.may_bound_chronology === true &&
      contract.context?.may_support_term_repair === true &&
      contract.context?.scheduled_event_alone_establishes_occurrence === false &&
      contract.context?.search_miss_establishes_absence === false &&
      contract.context?.conflicting_sources_must_be_retained === true,
    historical_revisit_queue_is_governed:
      contract.revisit_queue?.body_free === true &&
      contract.revisit_queue?.private_by_default === true &&
      contract.revisit_queue?.every_candidate_requires_disposition === true &&
      contract.revisit_queue?.current_method_controls_are_not_backlog === true &&
      contract.revisit_queue?.participant_holds_are_not_actionable === true &&
      contract.revisit_queue?.dataless_is_not_absent === true &&
      contract.revisit_queue?.priority_is_not_processing_authority === true &&
      contract.revisit_queue?.private_item_counts_may_be_public === false &&
      contract.revisit_queue?.required_candidate_fields?.length === 12 &&
      contract.revisit_queue.required_candidate_fields.includes("dependencies") &&
      contract.revisit_queue.required_candidate_fields.includes("evidence_basis") &&
      contract.revisit_queue.required_candidate_fields.includes("revisit_trigger") &&
      contract.revisit_queue?.allowed_dispositions?.length === 5,
    authenticated_cloud_recovery_is_bounded:
      contract.cloud_recovery?.authenticated_read_only_fallback === true &&
      contract.cloud_recovery?.web_listing_is_preservation === false &&
      contract.cloud_recovery?.confirmed_empty_is_materialization_failure === false &&
      contract.cloud_recovery?.download_requires_private_custody_and_sha256 === true &&
      contract.cloud_recovery?.download_timeout_may_be_called_recovered === false &&
      contract.cloud_recovery?.technical_media_validation_establishes_transcription_complete === false &&
      contract.cloud_recovery?.cloud_mutation_allowed === false &&
      contract.cloud_recovery?.candidate_git_may_contain_recovered_raw_body === false &&
      contract.cloud_recovery?.state_terms?.length === 5 &&
      contract.cloud_recovery.state_terms.includes("technically-readable"),
    diarization_preserves_uncertainty:
      contract.diarization?.generic_labels_allowed === true &&
      contract.diarization?.named_labels_require_support === true &&
      contract.diarization?.named_labels_require_human_review === true &&
      contract.diarization?.uncertainty_must_be_visible === true &&
      contract.diarization?.known_speaker_reference_requires_specific_authority === true &&
      contract.diarization?.provider_guess_alone_establishes_identity === false,
    repair_preserves_lineage:
      contract.repair?.provider_export_is_never_edited === true &&
      contract.repair?.repair_is_separate_derived_artifact === true &&
      contract.repair?.audio_comparison_required === true &&
      contract.repair?.segment_lineage_required === true &&
      contract.repair?.uncertainty_markers_required === true &&
      contract.repair?.context_may_invent_missing_speech === false &&
      contract.repair?.automation_may_self_certify_audio === false,
    private_knowledge_and_public_projection_are_separate:
      contract.knowledge?.complete_repair_and_close_reading_are_separate === true &&
      contract.knowledge?.private_is_default_destination === true &&
      contract.knowledge?.source_ids_required === true &&
      contract.knowledge?.claim_states?.length === 6 &&
      contract.knowledge?.public_projection_requires_separate_packet === true &&
      contract.knowledge?.automatic_publication === false &&
      contract.knowledge?.public_may_reveal_private_topology === false,
    retry_and_receipt_safety:
      contract.automation?.implementation === "scripts/audio-workflow/cli.mjs" &&
      contract.automation?.commands?.length === 11 &&
      contract.automation?.dry_run_required === true &&
      contract.automation?.resumable === true &&
      contract.automation?.idempotent_by_hash_and_recipe === true &&
      contract.automation?.changed_input_invalidates_downstream_receipts === true &&
      contract.automation?.nonzero_exit_on_hold_or_deny === true &&
      contract.automation?.hold_exit_code === 2 &&
      contract.automation?.deny_exit_code === 1,
    logs_and_external_actions_are_bounded:
      contract.automation?.logs_must_be_body_free_and_secret_free === true &&
      contract.automation?.automatic_contact === false &&
      contract.automation?.automatic_merge === false &&
      contract.automation?.automatic_deployment === false,
    human_gates_remain_human:
      contract.human_gates?.required?.length >= 12 &&
      contract.human_gates?.automation_may_satisfy?.length === 0 &&
      contract.evaluation?.deterministic_checks_satisfy_human_gates === false,
    scenario_coverage:
      scenarioResults.length >= 19 && scenarioResults.every((scenario) => scenario.passed)
  };

  const criterionWeight = 1 / Object.keys(checks).length;
  const rubric = Object.fromEntries(
    Object.keys(checks).map((id) => [id, { weight: criterionWeight, hard: true }])
  );
  const score = Object.entries(rubric).reduce(
    (total, [id, criterion]) => total + (checks[id] ? criterion.weight : 0),
    0
  );
  const hardFailures = Object.entries(rubric)
    .filter(([id, criterion]) => criterion.hard && !checks[id])
    .map(([id]) => id);

  return {
    schema_version: 1,
    rfc: 13,
    stage: contract.stage,
    candidate_files: candidatePaths,
    candidate_fingerprint: candidateFingerprint(repoRoot),
    score: Number(score.toFixed(3)),
    checks,
    hard_failures: hardFailures,
    scenarios: {
      total: scenarioResults.length,
      passed: scenarioResults.filter((scenario) => scenario.passed).length,
      failed: scenarioResults.filter((scenario) => !scenario.passed).length,
      results: scenarioResults
    },
    implementation_authorized: contract.authority.implementation_authorized,
    publication_authorized: contract.authority.publication_authorized,
    external_transfer_authorized_by_rfc:
      contract.authority.external_transfer_authorized_by_rfc
  };
}

function main() {
  const evaluation = evaluateAudioKnowledgeWorkflowRFC();
  process.stdout.write(`${JSON.stringify(evaluation, null, 2)}\n`);
  if (evaluation.hard_failures.length > 0 || evaluation.scenarios.failed > 0) {
    process.exitCode = 1;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
