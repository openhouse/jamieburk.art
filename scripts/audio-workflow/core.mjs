import { isDeepStrictEqual } from "node:util";
import { buildVoiceGraph, voiceSummary } from "./situated-voices.mjs";

export const STAGES = [
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
];

const ALLOWED_DISPOSITIONS = new Set([
  "queued",
  "reference-current",
  "held-participant-restriction",
  "out-of-scope",
  "unresolved"
]);

function copy(value) {
  return structuredClone(value);
}

function requireOpaqueJobId(jobId) {
  if (typeof jobId !== "string" || !/^job-[a-z0-9-]+$/i.test(jobId)) {
    throw new Error("opaque-job-id-required");
  }
}

function requireQueuedJob(job, stage) {
  if (stage === "intake") return;
  if (job.disposition === "held-participant-restriction") {
    throw new Error("participant-restricted-candidate-not-actionable");
  }
  if (job.disposition === "reference-current") {
    throw new Error("current-method-control-not-actionable");
  }
  if (job.disposition !== "queued") throw new Error("queued-disposition-required");
}

function requireAuthority(job, stage) {
  if (stage === "inventory" && job.authority.source_access !== true) {
    throw new Error("source-access-authorization-required");
  }
  if (stage === "preservation" && job.authority.private_preservation !== true) {
    throw new Error("private-preservation-authorization-required");
  }
  if (
    stage === "transcription" &&
    job.provider.processing === "external" &&
    (job.authority.external_transfer !== true ||
      job.authority.private_data_confirmed !== true)
  ) {
    throw new Error("external-private-data-transfer-confirmation-required");
  }
  if (
    stage === "diarization" &&
    job.known_speaker_reference_used === true &&
    job.authority.known_speaker_reference !== true
  ) {
    throw new Error("known-speaker-reference-authorization-required");
  }
}

function requireReceipt(receipt) {
  if (!receipt || receipt.status !== "complete") throw new Error("complete-receipt-required");
  for (const field of ["input_fingerprint", "output_fingerprint"]) {
    if (typeof receipt[field] !== "string" || receipt[field].length < 1) {
      throw new Error(`receipt-${field.replaceAll("_", "-")}-required`);
    }
  }
  if (!Number.isInteger(receipt.artifact_count) || receipt.artifact_count < 0) {
    throw new Error("receipt-artifact-count-required");
  }
  if (!Array.isArray(receipt.unresolved_conditions)) {
    throw new Error("receipt-unresolved-conditions-required");
  }
}

export function createJobManifest(input) {
  requireOpaqueJobId(input?.job_id);
  if (!ALLOWED_DISPOSITIONS.has(input?.disposition)) {
    throw new Error("allowed-disposition-required");
  }
  if (!input?.provider || !["local", "external", "existing-export"].includes(input.provider.processing)) {
    throw new Error("provider-processing-mode-required");
  }

  const authority = {
    source_access: input.authority?.source_access === true,
    private_preservation: input.authority?.private_preservation === true,
    external_transfer: input.authority?.external_transfer === true,
    private_data_confirmed: input.authority?.private_data_confirmed === true,
    known_speaker_reference: input.authority?.known_speaker_reference === true
  };

  return {
    schema_version: 1,
    job_id: input.job_id,
    disposition: input.disposition,
    provider: copy(input.provider),
    authority,
    known_speaker_reference_used: input.known_speaker_reference_used === true,
    stages: Object.fromEntries(STAGES.map((stage) => [stage, { status: "not-started" }])),
    receipts: {},
    private_context: copy(input.private_context ?? {})
  };
}

export function completeStage(job, stage, receipt, voiceCorpus) {
  if (!STAGES.includes(stage)) throw new Error("known-stage-required");
  requireQueuedJob(job, stage);
  requireAuthority(job, stage);
  requireReceipt(receipt);
  if (STAGES.indexOf(stage) >= STAGES.indexOf("close-reading")) {
    if (!voiceCorpus) throw new Error("situated-voice-corpus-required");
    const graph = buildVoiceGraph(voiceCorpus);
    if (!graph.complete) throw new Error("situated-voice-coverage-incomplete");
    const sources = voiceCorpus.transcripts.map(t => ({ transcript_id: t.id, sha256: t.sha256 }))
      .sort((a, b) => a.transcript_id.localeCompare(b.transcript_id));
    const repairSources = [...(job.receipts?.repair?.transcript_sources ?? [])]
      .sort((a, b) => a.transcript_id.localeCompare(b.transcript_id));
    if (!isDeepStrictEqual(sources, repairSources)) throw new Error("voice-corpus-repair-binding-mismatch");
    if (stage === "close-reading") receipt = { ...receipt, voice_coverage: voiceSummary(graph) };
    else if (job.receipts?.["close-reading"]?.voice_coverage?.candidate_fingerprint !== graph.candidate_fingerprint) {
      throw new Error("situated-voice-receipt-stale");
    }
  }

  const stageIndex = STAGES.indexOf(stage);
  if (stageIndex > 0) {
    const prerequisite = STAGES[stageIndex - 1];
    if (job.stages?.[prerequisite]?.status !== "complete") {
      throw new Error(`prerequisite-stage-incomplete:${prerequisite}`);
    }
    const upstreamFingerprint = job.receipts?.[prerequisite]?.output_fingerprint;
    if (receipt.input_fingerprint !== upstreamFingerprint) {
      throw new Error(`receipt-input-does-not-match:${prerequisite}`);
    }
  }

  if (isDeepStrictEqual(job.receipts?.[stage], receipt)) return job;

  const next = copy(job);
  next.stages[stage] = { status: "complete" };
  next.receipts[stage] = copy(receipt);
  for (const downstream of STAGES.slice(stageIndex + 1)) {
    next.stages[downstream] = { status: "not-started" };
    delete next.receipts[downstream];
  }
  return next;
}

export function holdStage(job, stage, reasonCodes) {
  if (!STAGES.includes(stage)) throw new Error("known-stage-required");
  if (!Array.isArray(reasonCodes) || reasonCodes.length < 1) {
    throw new Error("hold-reason-code-required");
  }
  const next = copy(job);
  next.stages[stage] = {
    status: "held",
    reason_codes: [...new Set(reasonCodes)].sort()
  };
  delete next.receipts[stage];
  const stageIndex = STAGES.indexOf(stage);
  for (const downstream of STAGES.slice(stageIndex + 1)) {
    next.stages[downstream] = { status: "not-started" };
    delete next.receipts[downstream];
  }
  return next;
}

export function evaluateQueue(queue) {
  const candidates = Array.isArray(queue?.candidates) ? queue.candidates : [];
  const failures = [];
  const seen = new Set();
  for (const candidate of candidates) {
    if (!candidate?.id || seen.has(candidate.id)) {
      failures.push(`candidate-id-not-unique:${candidate?.id ?? "missing"}`);
      continue;
    }
    seen.add(candidate.id);
    if (!ALLOWED_DISPOSITIONS.has(candidate.disposition)) {
      failures.push(`candidate-disposition-invalid:${candidate.id}`);
    }
    if (
      candidate.disposition === "held-participant-restriction" &&
      (candidate.participant_restriction !== true || candidate.priority !== null)
    ) {
      failures.push(`participant-restricted-candidate-actionable:${candidate.id}`);
    }
    if (
      candidate.disposition === "reference-current" &&
      (candidate.current_method_control !== true || candidate.priority !== null)
    ) {
      failures.push(`current-method-control-actionable:${candidate.id}`);
    }
    if (candidate.disposition === "queued" && !/^P[0-3]$/.test(candidate.priority ?? "")) {
      failures.push(`queued-priority-invalid:${candidate.id}`);
    }
  }

  return {
    candidate_count: candidates.length,
    actionable_count: candidates.filter((item) => item.disposition === "queued").length,
    reference_count: candidates.filter((item) => item.disposition === "reference-current").length,
    held_count: candidates.filter(
      (item) => item.disposition === "held-participant-restriction"
    ).length,
    hard_failures: failures.sort()
  };
}

export function summarizeJob(job) {
  const states = Object.fromEntries(
    STAGES.map((stage) => [
      stage,
      {
        status: job.stages?.[stage]?.status ?? "not-started",
        reason_codes: job.stages?.[stage]?.reason_codes ?? []
      }
    ])
  );
  return {
    schema_version: job.schema_version,
    job_id: job.job_id,
    disposition: job.disposition,
    stage_states: states,
    complete_stage_count: Object.values(states).filter((value) => value.status === "complete").length,
    held_stage_count: Object.values(states).filter((value) => value.status === "held").length
  };
}
