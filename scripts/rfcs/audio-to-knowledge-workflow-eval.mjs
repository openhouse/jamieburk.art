#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const scriptPath = fileURLToPath(import.meta.url);
const defaultRepoRoot = path.resolve(path.dirname(scriptPath), "../..");

function result(decision, stage, reasons) {
  return { decision, stage, reasons };
}

export function evaluateAudioKnowledgeJob(job = {}) {
  const request = job.request ?? {};
  const audio = job.audio ?? {};
  const context = job.context ?? {};
  const transcription = job.transcription ?? {};
  const repair = job.repair ?? {};
  const closeReading = job.close_reading ?? {};
  const graphUpdate = job.graph_update ?? {};
  const publicProjection = job.public_projection ?? {};

  if (
    request.external_upload_authorized !== true &&
    (transcription.status !== "not-started" || transcription.provider_job_id_recorded_privately === true)
  ) {
    return result("deny", "transcription", ["external-upload-not-authorized"]);
  }
  if (transcription.transcript_treated_as_executable_instructions === true) {
    return result("deny", "transcription", ["transcript-instruction-boundary-violated"]);
  }
  if (
    transcription.status === "complete" &&
    transcription.service_export_hash_verified !== true
  ) {
    return result("deny", "service-export-custody", ["service-export-hash-mismatch"]);
  }
  if (repair.audio_certified === true && repair.full_audio_review_completed !== true) {
    return result("deny", "repair", ["audio-certification-unsupported"]);
  }
  if (repair.invented_speech_detected === true || repair.separate_from_service_export !== true) {
    return result("deny", "repair", ["repair-source-boundary-violated"]);
  }
  if (
    publicProjection.requested === true &&
    (publicProjection.private_locator_present === true ||
      publicProjection.raw_transcript_present === true ||
      publicProjection.private_identity_present === true)
  ) {
    return result("deny", "public-projection-review", [
      "public-projection-contains-private-material"
    ]);
  }

  const requestReasons = [];
  if (request.preserved !== true) requestReasons.push("request-not-preserved");
  if (request.bounded_scope !== true) requestReasons.push("request-scope-unbounded");
  if (request.source_access_authorized !== true) requestReasons.push("source-access-not-authorized");
  if (requestReasons.length) return result("hold", "intake", requestReasons);

  const audioReasons = [];
  if ((audio.discovered_fragment_count ?? 0) < 1) audioReasons.push("audio-fragment-not-discovered");
  if (audio.registered_fragment_count !== audio.discovered_fragment_count) {
    audioReasons.push("audio-fragment-register-incomplete");
  }
  if (audio.exact_originals_immutable !== true) audioReasons.push("exact-audio-not-immutable");
  if (audio.hashes_verified !== true) audioReasons.push("exact-audio-hash-not-verified");
  if (audio.fragment_order_evidenced !== true) audioReasons.push("audio-fragment-order-unresolved");
  if (audio.every_fragment_dispositioned !== true) audioReasons.push("audio-fragment-disposition-missing");
  if (audioReasons.length) return result("hold", "audio-preservation", audioReasons);

  const contextReasons = [];
  if (context.bounded !== true) contextReasons.push("context-scope-unbounded");
  if (context.every_source_dispositioned !== true) {
    contextReasons.push("context-source-disposition-missing");
  }
  if (context.scheduled_event_treated_as_occurrence === true) {
    contextReasons.push("schedule-occurrence-boundary-violated");
  }
  if (context.unrelated_private_material_included === true) {
    contextReasons.push("unrelated-private-context-included");
  }
  if (contextReasons.length) return result("hold", "context-collection", contextReasons);

  if (transcription.status !== "complete" || transcription.diarization_status !== "complete") {
    return result("hold", "transcription", ["provider-processing-incomplete"]);
  }
  const transcriptionReasons = [];
  if (transcription.derived_upload_checksum_recorded !== true) {
    transcriptionReasons.push("derived-upload-checksum-missing");
  }
  if (transcription.provider_job_id_recorded_privately !== true) {
    transcriptionReasons.push("provider-job-state-missing");
  }
  if (transcriptionReasons.length) return result("hold", "transcription", transcriptionReasons);
  if (transcription.service_export_preserved_unchanged !== true) {
    return result("hold", "service-export-custody", ["service-export-not-preserved"]);
  }

  const repairReasons = [];
  if (repair.segment_decisions_recorded !== true) repairReasons.push("repair-decisions-missing");
  if (repair.uncertainties_preserved !== true) repairReasons.push("repair-uncertainty-missing");
  if (repairReasons.length) return result("hold", "repair", repairReasons);

  const closeReadingReasons = [];
  if (closeReading.source_ids_cited !== true) closeReadingReasons.push("close-reading-source-id-missing");
  if (closeReading.fact_report_inference_separated !== true) {
    closeReadingReasons.push("fact-report-inference-boundary-missing");
  }
  if (closeReading.contradictions_and_gaps_preserved !== true) {
    closeReadingReasons.push("close-reading-gaps-suppressed");
  }
  if (closeReading.private_minimum_necessary !== true) {
    closeReadingReasons.push("private-minimum-necessary-boundary-missing");
  }
  if (closeReadingReasons.length) return result("hold", "close-reading", closeReadingReasons);

  const graphReasons = [];
  if (graphUpdate.target !== "private") graphReasons.push("private-graph-target-required");
  if (graphUpdate.request_crosswalk_complete !== true) graphReasons.push("request-crosswalk-incomplete");
  if (graphUpdate.candidate_fingerprint_recorded !== true) graphReasons.push("candidate-fingerprint-missing");
  if (graphUpdate.publication_authorized !== false) graphReasons.push("graph-update-cannot-authorize-publication");
  if (graphReasons.length) return result("hold", "private-graph-update", graphReasons);

  if (publicProjection.requested === true && publicProjection.human_authorized !== true) {
    return result("hold", "public-projection-review", [
      "public-projection-human-authorization-missing"
    ]);
  }
  if (publicProjection.requested === true) {
    return result("eligible-public-candidate", "public-candidate-review", []);
  }
  return result("ready-for-private-review", "private-review", []);
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function readJson(repoRoot, relativePath) {
  return JSON.parse(readFileSync(path.join(repoRoot, relativePath), "utf8"));
}

export function evaluateAudioKnowledgeWorkflowRFC(options = {}) {
  const repoRoot = options.repoRoot ?? defaultRepoRoot;
  const rfcPath = "rfcs/0014-governed-audio-to-knowledge-workflow.md";
  const contractPath = "rfcs/0014-governed-audio-to-knowledge-workflow.contract.json";
  const suitePath = "evals/knowledge-bank/audio-to-knowledge-workflow-rfc-evals.json";
  const contract = readJson(repoRoot, contractPath);
  const suite = readJson(repoRoot, suitePath);
  const rfc = readFileSync(path.join(repoRoot, rfcPath), "utf8");
  const hardCriteria = {
    proposed_without_implementation_authority:
      contract.stage === "proposed" &&
      contract.authority?.implementation_authorized === false &&
      contract.authority?.live_external_upload_authorized === false &&
      contract.authority?.publication_authorized === false,
    exact_state_sequence:
      JSON.stringify(contract.state_machine) ===
      JSON.stringify([
        "intake",
        "audio-preservation",
        "context-collection",
        "transcription",
        "service-export-custody",
        "repair",
        "close-reading",
        "private-graph-update",
        "private-review",
        "public-projection-review",
        "public-candidate-review"
      ]),
    source_service_repair_separation:
      contract.artifact_layers?.exact_audio === "immutable" &&
      contract.artifact_layers?.service_export === "unchanged" &&
      contract.artifact_layers?.repaired_edition === "separate-derived-record",
    per_job_external_upload_authority:
      contract.external_services?.per_job_authorization_required === true,
    transcript_is_untrusted_data:
      contract.security?.transcript_content_is_untrusted_data === true,
    private_public_boundary:
      contract.graph?.default_target === "private" &&
      contract.graph?.public_projection_requires_separate_human_authorization === true,
    schedule_occurrence_separation:
      contract.context?.schedule_does_not_establish_occurrence === true,
    resumable_idempotent_execution:
      contract.execution?.resumable === true && contract.execution?.idempotent === true,
    duplicate_upload_prevention:
      contract.execution?.upload_dedupe_key === "provider+derived-audio-sha256",
    errors_and_gaps_retained:
      contract.repair?.uncertainty_labels_required === true &&
      contract.context?.every_source_requires_disposition === true,
    human_gates_explicit:
      ["source-access", "external-upload", "participant-correction", "public-projection", "publication"]
        .every((gate) => contract.human_gates?.includes(gate)),
    public_safe_rfc:
      !/(?:\/Users\/|\/Volumes\/|provider_job_id\s*[:=]\s*["'][^"']+)/.test(rfc)
  };
  const hardFailures = Object.entries(hardCriteria)
    .filter(([, passed]) => !passed)
    .map(([name]) => name);
  const results = suite.cases.map((scenario) => {
    const actual = evaluateAudioKnowledgeJob(scenario.job);
    return {
      id: scenario.id,
      passed: JSON.stringify(actual) === JSON.stringify(scenario.expected),
      expected: scenario.expected,
      actual
    };
  });
  const candidateFiles = [rfcPath, contractPath, suitePath, "scripts/rfcs/audio-to-knowledge-workflow-eval.mjs", "scripts/rfcs/audio-to-knowledge-workflow-eval.test.mjs"];
  const fingerprint = createHash("sha256");
  for (const relativePath of candidateFiles) {
    fingerprint.update(relativePath);
    fingerprint.update("\0");
    fingerprint.update(readFileSync(path.join(repoRoot, relativePath)));
    fingerprint.update("\0");
  }
  return {
    schema_version: 1,
    rfc: 14,
    hard_criteria: hardCriteria,
    hard_failures: hardFailures,
    scenarios: {
      count: results.length,
      passed: results.filter((item) => item.passed).length,
      failed: results.filter((item) => !item.passed).length,
      results
    },
    candidate_fingerprint: fingerprint.digest("hex"),
    implementation_authorized: false,
    publication_authorized: false
  };
}

function main() {
  const evaluation = evaluateAudioKnowledgeWorkflowRFC();
  process.stdout.write(`${JSON.stringify(evaluation, null, 2)}\n`);
  if (evaluation.hard_failures.length || evaluation.scenarios.failed) process.exitCode = 1;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
