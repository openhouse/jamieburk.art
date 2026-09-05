#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const scriptPath = fileURLToPath(import.meta.url);
const defaultRepoRoot = path.resolve(path.dirname(scriptPath), "../..");
const rfcPath = "rfcs/0013-audio-to-knowledge-workflow.md";
const contractPath = "rfcs/0013-audio-to-knowledge-workflow.contract.json";
const suitePath = "evals/knowledge-bank/audio-to-knowledge-workflow-rfc-evals.json";
const candidatePaths = [
  "package.json",
  "rfcs/README.md",
  rfcPath,
  contractPath,
  suitePath,
  "scripts/check-rfcs.mjs",
  "scripts/rfcs/audio-to-knowledge-workflow-eval.mjs",
  "scripts/rfcs/audio-to-knowledge-workflow-eval.test.mjs"
];
const requiredStages = [
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
];
const requiredLayers = [
  "exact-source",
  "provider-input",
  "exact-provider-return",
  "machine-transcript",
  "complete-private-repair",
  "bounded-tracked-projection",
  "private-close-reading",
  "graph-projection-candidate"
];
const requiredClaimClasses = [
  "exact-speech",
  "attributed-report",
  "documented-interpretation",
  "inference",
  "open-question",
  "proposed-action"
];
const requiredHumanGates = [
  "processing-basis-and-private-destination",
  "external-upload-per-artifact",
  "speaker-and-repair-acceptance",
  "close-reading-acceptance",
  "private-graph-promotion",
  "quotation-attribution-and-publication"
];

function exact(actual, expected) {
  return JSON.stringify(actual) === JSON.stringify(expected);
}

function setAtPath(target, dottedPath, value) {
  const parts = dottedPath.split(".");
  let cursor = target;
  for (const part of parts.slice(0, -1)) {
    cursor = cursor[Number.isInteger(Number(part)) ? Number(part) : part];
  }
  const last = parts.at(-1);
  cursor[Number.isInteger(Number(last)) ? Number(last) : last] = value;
}

function mutate(candidate, mutations) {
  const result = structuredClone(candidate);
  for (const mutation of mutations) {
    if (mutation.target === "candidate" && mutation.type === "set") {
      setAtPath(result, mutation.path, mutation.value);
    } else {
      throw new Error(`unsupported mutation: ${JSON.stringify(mutation)}`);
    }
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

export function evaluateAudioToKnowledgeCandidate(candidate) {
  const reasons = [];
  const deny = (condition, reason) => {
    if (condition) reasons.push(reason);
  };

  deny(!exact(candidate?.stages, requiredStages), "ordered-stage-contract-invalid");
  deny(candidate?.stage_contract?.receipt_required !== true ||
    candidate?.stage_contract?.non_skippable !== true ||
    candidate?.stage_contract?.downstream_invalidation_on_input_change !== true,
  "stage-receipt-or-invalidation-contract-invalid");
  if (candidate?.artifact_layers !== undefined) {
    deny(!exact(candidate.artifact_layers, requiredLayers), "artifact-layer-contract-invalid");
  }

  deny(candidate?.custody?.preservation_before_transformation !== true,
    "preservation-must-precede-transformation");
  deny(candidate?.custody?.exact_source_checksum_required !== true,
    "exact-source-checksum-required");
  deny(candidate?.custody?.source_deletion_authorized !== false,
    "source-deletion-not-authorized");
  deny(candidate?.custody?.exact_provider_return_preserved !== true,
    "exact-provider-return-not-preserved");
  deny(candidate?.custody?.provider_completion_requires_observed_return !== true,
    "provider-completion-must-be-observed");

  deny(candidate?.state_machine?.content_addressed_job_identity !== true ||
    candidate?.state_machine?.immutable_inputs !== true ||
    candidate?.state_machine?.resumable_from_last_verified_receipt !== true ||
    candidate?.state_machine?.idempotent_replay !== true ||
    candidate?.state_machine?.silent_overwrite_allowed !== false ||
    candidate?.state_machine?.explicit_blocked_states !== true,
  "resumable-state-machine-contract-invalid");

  deny(candidate?.context?.minimum_necessary !== true ||
    candidate?.context?.query_and_cutoff_required !== true ||
    candidate?.context?.blind_spots_required !== true ||
    candidate?.context?.bodies_in_public_git !== false,
  "bounded-context-contract-invalid");
  deny(candidate?.context?.access_equals_consent !== false, "access-cannot-equal-consent");

  if (candidate?.provider_adapter !== undefined) {
    deny(candidate.provider_adapter.provider_neutral_interface !== true ||
      candidate.provider_adapter.exact_submitted_byte_identity_required !== true ||
      candidate.provider_adapter.exact_return_required !== true ||
      candidate.provider_adapter.credentials_in_artifacts !== false ||
      candidate.provider_adapter.constraints_reverified_at_implementation !== true,
    "provider-adapter-contract-invalid");
  }

  deny(candidate?.diarization?.labels_are_candidates !== true,
    "speaker-labels-must-remain-candidates");
  deny(candidate?.diarization?.identity_requires_evidence !== true ||
    candidate?.diarization?.unknown_speaker_allowed !== true ||
    candidate?.diarization?.participant_roster_proves_speech !== false ||
    candidate?.diarization?.human_review_required !== true,
  "speaker-identity-boundary-invalid");

  deny(candidate?.repair?.evidence_bounded !== true ||
    candidate?.repair?.inaudible_reconstruction_allowed !== false ||
    candidate?.repair?.uncertainty_markers_required !== true ||
    candidate?.repair?.complete_private_repair_required !== true ||
    candidate?.repair?.bounded_projection_separate !== true ||
    candidate?.repair?.human_acceptance_required !== true,
  "complete-private-repair-boundary-invalid");

  deny(candidate?.close_reading?.accepted_repair_required !== true ||
    candidate?.close_reading?.transcript_citations_required !== true ||
    candidate?.close_reading?.contradictions_preserved !== true ||
    candidate?.close_reading?.uncertainty_preserved !== true,
  "close-reading-evidence-contract-invalid");
  if (candidate?.close_reading?.claim_classes !== undefined) {
    deny(!exact(candidate.close_reading.claim_classes, requiredClaimClasses),
      "close-reading-claim-classes-invalid");
  }
  deny(candidate?.close_reading?.machine_actions_accepted_automatically !== false,
    "machine-actions-cannot-be-accepted");

  deny(candidate?.projection?.graph_candidate_only !== true ||
    candidate?.projection?.accepted_assignment_inferred !== false ||
    candidate?.projection?.organizational_position_inferred !== false,
  "graph-candidate-authority-invalid");
  deny(candidate?.projection?.automatic_graph_promotion !== false,
    "graph-promotion-must-remain-human");
  deny(candidate?.projection?.public_projection_in_scope !== false ||
    candidate?.projection?.public_projection_requires_separate_decision !== true,
  "public-projection-requires-separate-workflow");

  if (candidate?.public_boundary !== undefined) {
    deny(candidate.public_boundary.raw_audio_in_public_git !== false ||
      candidate.public_boundary.machine_transcript_in_public_git !== false ||
      candidate.public_boundary.private_context_in_public_git !== false ||
      candidate.public_boundary.protected_locator_in_public_git !== false ||
      candidate.public_boundary.private_runtime_dependency !== false ||
      candidate.public_boundary.opaque_permissioned_companion_allowed !== true,
    "public-private-boundary-invalid");
  }

  deny(candidate?.automation?.upload_without_artifact_authorization !== false ||
    candidate?.automation?.infer_consent !== false ||
    candidate?.automation?.publish !== false ||
    candidate?.automation?.send !== false ||
    candidate?.automation?.assign_work !== false ||
    candidate?.automation?.delete_source !== false ||
    candidate?.automation?.claim_audio_certified_without_listening !== false,
  "automation-authority-boundary-invalid");
  if (candidate?.human_gates !== undefined) {
    deny(!exact(candidate.human_gates, requiredHumanGates), "human-gate-contract-invalid");
  }

  reasons.sort((left, right) => left.localeCompare(right, "en"));
  return {
    decision: reasons.length > 0 ? "deny" : "ready-for-human-review",
    reasons
  };
}

export function evaluateAudioToKnowledgeBaseline(candidate) {
  return Array.isArray(candidate?.stages) && candidate.stages.length === 10 &&
    candidate?.custody?.preservation_before_transformation === true &&
    candidate?.repair?.complete_private_repair_required === true;
}

export function evaluateAudioToKnowledgeWorkflowRFC(options = {}) {
  const repoRoot = options.repoRoot ?? defaultRepoRoot;
  const contract = options.contract ?? JSON.parse(readFileSync(path.join(repoRoot, contractPath), "utf8"));
  const suite = options.suite ?? JSON.parse(readFileSync(path.join(repoRoot, suitePath), "utf8"));
  const rfc = options.rfcSource ?? readFileSync(path.join(repoRoot, rfcPath), "utf8");
  const hardFailures = [];
  const fail = (condition, id) => {
    if (condition) hardFailures.push(id);
  };

  fail(contract.schema_version !== 1 || contract.rfc !== 13 || contract.stage !== "proposed" ||
    contract.public_projection_id !== "method.audio-to-knowledge-workflow.v1",
  "rfc-identity-invalid");
  fail(contract.authority?.decision_owner !== "Jamie Burkart" ||
    contract.authority?.rfc_drafting_authorized !== true ||
    contract.authority?.implementation_authorized !== false ||
    contract.authority?.external_upload_authorized_by_rfc !== false ||
    contract.authority?.graph_promotion_authorized !== false ||
    contract.authority?.publication_authorized !== false ||
    contract.authority?.deployment_authorized !== false ||
    contract.authority?.automatic_merge_authority !== "none",
  "authority-contract-invalid");
  fail(contract.implementation?.runtime_started !== false ||
    contract.implementation?.provider_adapters_started !== false ||
    contract.implementation?.external_upload_performed !== false ||
    contract.implementation?.private_operating_companion_required_for_public_build !== false,
  "implementation-state-invalid");
  fail(contract.evaluation?.deterministic_checks_first !== true ||
    contract.evaluation?.labels !== "provisional-pending-Jamie-review" ||
    contract.evaluation?.independent_human_holdout_complete !== false ||
    contract.evaluation?.reports_tpr_and_tnr_separately !== true,
  "evaluation-claim-invalid");

  const exactResult = evaluateAudioToKnowledgeCandidate(contract.proposal_candidate);
  fail(exactResult.decision !== "ready-for-human-review", "proposal-candidate-invalid");

  const requiredText = [
    "# Governed Audio-to-Knowledge Workflow",
    "Preservation precedes transformation",
    "Access is not consent",
    "Provider completion is observed",
    "Diarization is a hypothesis",
    "Repair is source-loyal",
    "Private completeness precedes projection",
    "Interpretation does not become speech",
    "Projection is not promotion",
    "Evaluation is not authority",
    "Public projection is outside this workflow",
    "This RFC is a proposal"
  ];
  fail(!/^stage:\s+proposed$/mu.test(rfc) || !/^implementation:\s+null$/mu.test(rfc) ||
    requiredText.some((text) => !rfc.includes(text)),
  "reader-rfc-contract-incomplete");
  fail(/(?:workflow runtime|provider adapter) (?:is|are|was|were) (?:now )?implemented|public projection (?:is|was) authorized/iu.test(rfc),
    "reader-rfc-status-inflation");
  fail(/\/(?:Users|Volumes)\/|private repository (?:name|url)|private pull request|protected locator:/iu.test(rfc),
    "reader-rfc-public-safety-invalid");

  const scenarioResults = suite.cases.map((scenario) => {
    const candidate = mutate(contract.proposal_candidate, scenario.mutations);
    const result = evaluateAudioToKnowledgeCandidate(candidate);
    const actualPass = result.decision === "ready-for-human-review";
    const baselinePass = evaluateAudioToKnowledgeBaseline(candidate);
    const expectedPass = scenario.expected === "PASS";
    return {
      id: scenario.id,
      expected: scenario.expected,
      actual: actualPass ? "PASS" : "FAIL",
      baseline_actual: baselinePass ? "PASS" : "FAIL",
      passed: actualPass === expectedPass,
      reasons: result.reasons
    };
  });
  const safe = scenarioResults.filter(({ expected }) => expected === "PASS");
  const unsafe = scenarioResults.filter(({ expected }) => expected === "FAIL");
  const safeTpr = safe.filter(({ actual }) => actual === "PASS").length / safe.length;
  const unsafeTnr = unsafe.filter(({ actual }) => actual === "FAIL").length / unsafe.length;
  const baselineTpr = safe.filter(({ baseline_actual: actual }) => actual === "PASS").length / safe.length;
  const baselineTnr = unsafe.filter(({ baseline_actual: actual }) => actual === "FAIL").length / unsafe.length;
  fail(suite.review_status !== "provisional-pending-Jamie-review" ||
    suite.independent_human_holdout !== false || safe.length < 2 || unsafe.length < 20 ||
    safeTpr !== 1 || unsafeTnr !== 1,
  "scenario-coverage-invalid");

  return {
    schema_version: 1,
    rfc: contract.rfc,
    stage: contract.stage,
    candidate_files: candidatePaths,
    candidate_fingerprint: candidateFingerprint(repoRoot),
    hard_failures: [...new Set(hardFailures)].sort((left, right) => left.localeCompare(right, "en")),
    scenarios: {
      total: scenarioResults.length,
      safe: safe.length,
      unsafe: unsafe.length,
      passed: scenarioResults.filter(({ passed }) => passed).length,
      failed: scenarioResults.filter(({ passed }) => !passed).length,
      safe_true_positive_rate: safeTpr,
      unsafe_true_negative_rate: unsafeTnr,
      baseline_safe_true_positive_rate: baselineTpr,
      baseline_unsafe_true_negative_rate: baselineTnr,
      results: scenarioResults
    },
    implementation_authorized: contract.authority.implementation_authorized,
    external_upload_performed: contract.implementation.external_upload_performed,
    publication_authorized: contract.authority.publication_authorized
  };
}

function main() {
  const evaluation = evaluateAudioToKnowledgeWorkflowRFC();
  process.stdout.write(`${JSON.stringify(evaluation, null, 2)}\n`);
  if (evaluation.hard_failures.length > 0 || evaluation.scenarios.failed > 0) process.exitCode = 1;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
