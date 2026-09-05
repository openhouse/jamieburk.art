#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const scriptPath = fileURLToPath(import.meta.url);
const defaultRepoRoot = path.resolve(path.dirname(scriptPath), "../..");

function result(decision, stage, reasons) {
  return { decision, stage, reasons: [...new Set(reasons)].sort() };
}

export function evaluateHumanScaleWeeklyReview(review = {}) {
  const activity = review.activity_metrics ?? {};
  if (
    activity.commit_count_primary_success_metric === true ||
    activity.line_count_primary_success_metric === true ||
    activity.artifact_count_primary_success_metric === true
  ) {
    return result("deny", "evidence", ["activity-counts-cannot-establish-success"]);
  }

  const capacity = review.capacity ?? {};
  if (capacity.inferred_from_workload === true) {
    return result("deny", "capacity", ["capacity-inference-forbidden"]);
  }

  const commitments = Array.isArray(review.commitments) ? review.commitments : [];
  const commitmentDenials = [];
  for (const commitment of commitments) {
    const id = commitment.id ?? "unknown-commitment";
    if (commitment.state === "active" && commitment.accepted !== true) {
      commitmentDenials.push(`unaccepted-active-commitment:${id}`);
    }
    if (commitment.ownership_defaulted_to_jamie === true) {
      commitmentDenials.push(`ownership-cannot-default-to-jamie:${id}`);
    }
  }
  if (commitmentDenials.length) {
    return result("deny", "commitment-clarification", commitmentDenials);
  }

  const publicProjection = review.public_projection ?? {};
  if (publicProjection.requested === true && publicProjection.private_detail_present === true) {
    return result("deny", "public-projection-review", [
      "public-projection-contains-private-week-detail"
    ]);
  }
  if (review.authority?.publication_authorized === true) {
    return result("deny", "authority", ["weekly-review-cannot-authorize-publication"]);
  }

  const evidenceReasons = [];
  const window = review.window ?? {};
  const evidence = review.evidence ?? {};
  if (window.current !== true || window.local_civil_day_count !== 7) {
    evidenceReasons.push("review-window-not-current");
  }
  if (
    evidence.bounded !== true ||
    evidence.source_cutoff_recorded !== true ||
    evidence.every_gap_dispositioned !== true
  ) {
    evidenceReasons.push("evidence-gap-undispositioned");
  }
  if (evidence.occurrence_claims_source_backed !== true) {
    return result("deny", "evidence", ["occurrence-claim-unsupported"]);
  }
  if (evidenceReasons.length) return result("hold", "evidence", evidenceReasons);

  if (!["recorded", "declined", "unknown"].includes(capacity.state)) {
    return result("hold", "capacity", ["capacity-state-missing"]);
  }

  const meetingReasons = [];
  const meetings = Array.isArray(review.meetings) ? review.meetings : [];
  for (const meeting of meetings.filter((item) => item.occurred === true)) {
    const id = meeting.id ?? "unknown-meeting";
    if (
      meeting.purpose_recorded !== true ||
      meeting.understanding_recorded !== true ||
      meeting.contested_recorded !== true ||
      meeting.accepted_actions_dispositioned !== true ||
      meeting.reconvene_decision_recorded !== true
    ) {
      meetingReasons.push(`meeting-ending-incomplete:${id}`);
    }
  }
  if (meetingReasons.length) return result("hold", "meeting-close", meetingReasons);

  const openLoopReasons = [];
  const allowedDispositions = new Set([
    "next-action",
    "waiting-for",
    "project",
    "someday-maybe",
    "reference",
    "closed"
  ]);
  for (const loop of Array.isArray(review.open_loops) ? review.open_loops : []) {
    if (!allowedDispositions.has(loop.disposition)) {
      openLoopReasons.push(`open-loop-disposition-missing:${loop.id ?? "unknown-loop"}`);
    }
  }
  if (openLoopReasons.length) {
    return result("hold", "open-loop-clarification", openLoopReasons);
  }

  const activeOutcomes = Array.isArray(review.selection?.active_outcomes)
    ? review.selection.active_outcomes
    : [];
  if (
    review.selection?.maximum_active_outcomes !== 3 ||
    activeOutcomes.length > 3
  ) {
    return result("hold", "selection", ["active-outcome-limit-exceeded"]);
  }

  const commitmentReasons = [];
  for (const commitment of commitments.filter((item) => item.state === "active")) {
    const id = commitment.id ?? "unknown-commitment";
    if (!commitment.successful_outcome?.trim()) {
      commitmentReasons.push(`successful-outcome-missing:${id}`);
    }
    if (!commitment.next_action?.trim()) {
      commitmentReasons.push(`next-action-missing:${id}`);
    }
  }
  if (commitmentReasons.length) {
    return result("hold", "commitment-clarification", commitmentReasons);
  }

  if (publicProjection.requested === true && publicProjection.human_authorized !== true) {
    return result("hold", "public-projection-review", [
      "public-projection-human-authorization-missing"
    ]);
  }
  if (publicProjection.requested === true) {
    return result("eligible-public-candidate", "public-candidate-review", []);
  }
  return result("ready-for-human-review", "human-review", []);
}

function readJson(repoRoot, relativePath) {
  return JSON.parse(readFileSync(path.join(repoRoot, relativePath), "utf8"));
}

export function evaluateHumanScaleWeeklyReviewRFC(options = {}) {
  const repoRoot = options.repoRoot ?? defaultRepoRoot;
  const rfcPath =
    "rfcs/0015-human-scale-weekly-review-and-real-world-commitment-closure.md";
  const contractPath =
    "rfcs/0015-human-scale-weekly-review-and-real-world-commitment-closure.contract.json";
  const suitePath = "evals/knowledge-bank/human-scale-weekly-review-rfc-evals.json";
  const contract = readJson(repoRoot, contractPath);
  const suite = readJson(repoRoot, suitePath);
  const rfc = readFileSync(path.join(repoRoot, rfcPath), "utf8");
  const expectedDispositions = [
    "next-action",
    "waiting-for",
    "project",
    "someday-maybe",
    "reference",
    "closed"
  ];
  const expectedMeetingFields = [
    "understanding",
    "contestation",
    "accepted-actions",
    "reconvening"
  ];
  const expectedCapacityStates = ["recorded", "declined", "unknown"];
  const authorityStates = Object.values(contract.authority ?? {});
  const hardCriteria = {
    proposal_not_implementation:
      contract.stage === "proposed" &&
      contract.implementation === null &&
      /^stage: proposed$/m.test(rfc) &&
      /^implementation: null$/m.test(rfc) &&
      authorityStates.length === 4 &&
      authorityStates.every((value) => value === false),
    current_seven_day_window_contract:
      contract.window?.local_civil_day_count === 7 &&
      contract.window?.timezone_required === true &&
      contract.window?.source_cutoffs_required === true &&
      contract.window?.coverage_gaps_require_disposition === true,
    activity_outcome_separation:
      contract.evidence?.activity_counts_are_secondary_only === true &&
      contract.evidence?.infrastructure_is_not_lived_outcome === true,
    evidence_state_separation:
      contract.evidence?.occurrence_requires_source === true &&
      contract.evidence?.fact_report_interpretation_inference_separated === true &&
      contract.evidence?.silence_is_not_state_change === true,
    designed_meeting_ending:
      contract.meeting_ending?.required_for_consequential_gatherings === true &&
      JSON.stringify(contract.meeting_ending?.fields) ===
        JSON.stringify(expectedMeetingFields),
    ownership_requires_acceptance:
      contract.meeting_ending?.unowned_work_remains_unowned === true &&
      contract.meeting_ending?.ownership_cannot_default_to_jamie === true &&
      contract.open_loops?.active_commitment_requires_acceptance === true,
    exact_open_loop_dispositions:
      contract.open_loops?.exactly_one_disposition_required === true &&
      JSON.stringify(contract.open_loops?.dispositions) ===
        JSON.stringify(expectedDispositions),
    active_commitment_definition:
      contract.open_loops?.active_commitment_requires_successful_outcome === true &&
      contract.open_loops?.active_commitment_requires_next_action === true,
    three_outcome_limit:
      contract.selection?.maximum_active_outcomes === 3 &&
      contract.selection?.supporting_actions_roll_up_to_outcomes === true,
    capacity_self_report_only:
      JSON.stringify(contract.capacity?.states) ===
        JSON.stringify(expectedCapacityStates) &&
      contract.capacity?.self_report_only === true &&
      contract.capacity?.inference_from_activity_forbidden === true,
    capacity_disclosure_optional:
      contract.capacity?.disclosure_optional === true &&
      contract.capacity?.private_by_default === true,
    deterministic_checks_first:
      contract.evaluation?.deterministic_checks_first === true &&
      contract.evaluation?.hard_gates_cannot_be_averaged === true,
    interpretive_judges_require_validation:
      contract.evaluation?.interpretive_judges_require_error_analysis === true &&
      contract.evaluation?.interpretive_judges_require_human_validation === true,
    private_default_projection:
      contract.projection?.default_target === "private" &&
      contract.projection?.public_projection_optional === true &&
      contract.projection?.public_projection_minimum_necessary === true &&
      contract.projection?.private_capacity_detail_forbidden === true &&
      contract.projection?.private_relationship_detail_forbidden === true,
    separate_public_authority:
      contract.projection?.public_projection_requires_separate_human_authorization ===
        true && contract.authority?.publication_authorized === false,
    human_gates_explicit: [
      "rfc-acceptance",
      "source-access",
      "capacity-self-report-or-decline",
      "weekly-candidate-correction",
      "weekly-candidate-adoption",
      "public-projection",
      "publication",
      "implementation",
      "operational-use"
    ].every((gate) => contract.human_gates?.includes(gate)),
    public_safe_rfc:
      !/(?:\/Users\/|\/Volumes\/|-----BEGIN (?:RSA |OPENSSH |EC |DSA )?PRIVATE KEY-----|\b(?:sk-proj-|ghp_|AKIA)[A-Za-z0-9_-]{12,}\b)/.test(
        rfc
      )
  };
  const hardFailures = Object.entries(hardCriteria)
    .filter(([, passed]) => !passed)
    .map(([name]) => name);
  const results = suite.cases.map((scenario) => {
    const actual = evaluateHumanScaleWeeklyReview(scenario.review);
    return {
      id: scenario.id,
      passed: JSON.stringify(actual) === JSON.stringify(scenario.expected),
      expected: scenario.expected,
      actual
    };
  });
  const candidateFiles = [
    rfcPath,
    contractPath,
    suitePath,
    "scripts/rfcs/human-scale-weekly-review-eval.mjs",
    "scripts/rfcs/human-scale-weekly-review-eval.test.mjs"
  ];
  const fingerprint = createHash("sha256");
  for (const relativePath of candidateFiles) {
    fingerprint.update(relativePath);
    fingerprint.update("\0");
    fingerprint.update(readFileSync(path.join(repoRoot, relativePath)));
    fingerprint.update("\0");
  }
  return {
    schema_version: 1,
    rfc: 15,
    stage: contract.stage,
    hard_criteria: hardCriteria,
    hard_failures: hardFailures,
    scenarios: {
      count: results.length,
      passed: results.filter((item) => item.passed).length,
      failed: results.filter((item) => !item.passed).length,
      results
    },
    candidate_fingerprint: fingerprint.digest("hex"),
    implementation_authorized:
      contract.authority?.implementation_authorized ?? false,
    publication_authorized: contract.authority?.publication_authorized ?? false
  };
}

function main() {
  const evaluation = evaluateHumanScaleWeeklyReviewRFC();
  process.stdout.write(`${JSON.stringify(evaluation, null, 2)}\n`);
  if (evaluation.hard_failures.length || evaluation.scenarios.failed) {
    process.exitCode = 1;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
