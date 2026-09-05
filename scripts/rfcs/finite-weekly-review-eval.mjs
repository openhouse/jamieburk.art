#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { isDeepStrictEqual } from "node:util";

const scriptPath = fileURLToPath(import.meta.url);
const defaultRepoRoot = path.resolve(path.dirname(scriptPath), "../..");
const rfcPath = "rfcs/0014-finite-weekly-review-and-sustainable-commitment-protocol.md";
const contractPath =
  "rfcs/0014-finite-weekly-review-and-sustainable-commitment-protocol.contract.json";
const suitePath = "evals/knowledge-bank/finite-weekly-review-rfc-evals.json";
const candidatePaths = [
  "package.json",
  "rfcs/README.md",
  rfcPath,
  contractPath,
  suitePath,
  "scripts/check-rfcs.mjs",
  "scripts/rfcs/finite-weekly-review-eval.mjs",
  "scripts/rfcs/finite-weekly-review-eval.test.mjs"
];

const allowedDispositions = new Set([
  "completed",
  "continuing",
  "waiting",
  "held",
  "consciously-not-pursuing",
  "superseded"
]);
const allowedLanes = new Set(["livelihood", "community", "sustaining"]);

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

export function evaluateFiniteWeeklyReview(state) {
  const denyReasons = [];
  const commitments = Array.isArray(state.next_week?.commitments)
    ? state.next_week.commitments
    : [];
  const laneCounts = new Map();

  for (const commitment of commitments) {
    laneCounts.set(commitment.lane, (laneCounts.get(commitment.lane) ?? 0) + 1);
  }

  if (state.record?.visibility !== "private") {
    denyReasons.push("real-weekly-record-must-remain-private");
  }
  if (state.projection?.contains_private_detail === true) {
    denyReasons.push("private-weekly-detail-publication-forbidden");
  }
  if (state.projection?.automatic === true) {
    denyReasons.push("automatic-publication-forbidden");
  }
  if (state.evidence?.operating_artifacts_claimed_as_external_outcomes === true) {
    denyReasons.push("operating-artifact-is-not-lived-outcome");
  }
  if (state.evidence?.unsupported_external_completion_claimed === true) {
    denyReasons.push("external-outcome-evidence-required");
  }
  if (state.sustaining_capacity?.productivity_optimization_target === true) {
    denyReasons.push("rest-instrumentalization-forbidden");
  }
  if (
    state.sustaining_capacity?.health_or_bodily_detail_required === true ||
    state.sustaining_capacity?.minimum_activity_proof_required === true
  ) {
    denyReasons.push("intimate-capacity-disclosure-forbidden");
  }
  if (state.open_loops?.automatic_carryover === true) {
    denyReasons.push("automatic-carryover-forbidden");
  }
  if (commitments.length > 3) {
    denyReasons.push("commitment-budget-exceeded");
  }
  if ([...laneCounts.values()].some((count) => count > 1)) {
    denyReasons.push("commitment-lane-budget-exceeded");
  }
  if (state.next_week?.selected_by_human !== true || state.automation?.selected_commitments === true) {
    denyReasons.push("automatic-commitment-selection-forbidden");
  }
  if (
    state.modeled_review?.action_authority_claimed === true ||
    state.modeled_review?.priority_authority_claimed === true
  ) {
    denyReasons.push("modeled-review-authority-forbidden");
  }
  if (
    state.automation?.computer_history_used === true &&
    state.automation?.computer_history_treated_as_authoritative === true &&
    state.automation?.computer_history_human_reviewed !== true
  ) {
    denyReasons.push("unreviewed-activity-authority-forbidden");
  }

  if (denyReasons.length > 0) {
    return {
      decision: "deny",
      public_projection_authorized: false,
      reasons: denyReasons
    };
  }

  const holdReasons = [];
  if (state.window?.bounded !== true || !state.window?.timezone) {
    holdReasons.push("bounded-review-window-required");
  }
  if (
    state.evidence?.source_classes_recorded !== true ||
    state.evidence?.source_cutoffs_recorded !== true ||
    state.evidence?.uncertainty_marked !== true ||
    state.evidence?.outcomes_and_artifacts_separate !== true
  ) {
    holdReasons.push("weekly-evidence-boundary-incomplete");
  }
  if (
    state.open_loops?.every_reviewed_item_dispositioned !== true ||
    !Array.isArray(state.open_loops?.dispositions) ||
    state.open_loops.dispositions.some((disposition) => !allowedDispositions.has(disposition))
  ) {
    holdReasons.push("open-loop-disposition-required");
  }
  if (
    commitments.some(
      (commitment) =>
        !commitment.id ||
        !allowedLanes.has(commitment.lane) ||
        commitment.bounded !== true ||
        commitment.observable_end !== true
    ) ||
    state.next_week?.unbounded_backlog_as_commitments === true
  ) {
    holdReasons.push("bounded-commitment-required");
  }
  if (state.sustaining_capacity?.boundary_present !== true) {
    holdReasons.push("sustaining-capacity-boundary-required");
  }
  if (state.authority?.decision_owner !== "Jamie Burkart") {
    holdReasons.push("jamie-decision-ownership-required");
  }
  if (
    state.projection?.requested === true &&
    (state.projection?.separately_composed !== true ||
      state.projection?.public_safety_reviewed !== true ||
      state.projection?.jamie_approved_exact_candidate !== true)
  ) {
    holdReasons.push("public-projection-human-approval-required");
  }

  if (holdReasons.length > 0) {
    return {
      decision: "hold",
      public_projection_authorized: false,
      reasons: holdReasons
    };
  }

  return {
    decision: "ready-for-human-review",
    public_projection_authorized: false,
    reasons: []
  };
}

export function evaluateFiniteWeeklyReviewRFC(options = {}) {
  const repoRoot = options.repoRoot ?? defaultRepoRoot;
  const contract = options.contract ?? loadJson(repoRoot, contractPath);
  const suite = options.suite ?? loadJson(repoRoot, suitePath);

  const scenarioResults = suite.cases.map((scenario) => {
    const state = mergeState(suite.baseline, scenario.patch);
    const actual = evaluateFiniteWeeklyReview(state);
    return {
      id: scenario.id,
      passed: isDeepStrictEqual(actual, scenario.expected),
      actual,
      expected: scenario.expected
    };
  });

  const checks = {
    proposal_preserves_human_authority:
      contract.rfc === 14 &&
      contract.stage === "proposed" &&
      contract.authority?.decision_owner === "Jamie Burkart" &&
      contract.authority?.implementation_authorized === false &&
      contract.authority?.source_access_authorized === false &&
      contract.authority?.publication_authorized === false &&
      contract.authority?.deployment_authorized === false &&
      contract.authority?.action_authorized === false,
    public_method_private_records:
      contract.record?.default_visibility === "private" &&
      isDeepStrictEqual(contract.record?.allowed_custody, ["operator-local", "private-sidecar"]) &&
      contract.record?.public_repository_contains_method_only === true &&
      contract.record?.public_projection_is_separate_artifact === true &&
      contract.record?.real_weekly_entries_in_public_git === false,
    complete_review_layers:
      isDeepStrictEqual(contract.review_layers, [
        "window-and-evidence-boundary",
        "lived-outcomes",
        "operating-artifacts",
        "open-loops-and-dispositions",
        "interpretation",
        "finite-selection"
      ]),
    evidence_keeps_activity_and_outcomes_distinct:
      contract.evidence?.lived_outcomes_distinct_from_operating_artifacts === true &&
      contract.evidence?.activity_is_not_external_outcome === true &&
      contract.evidence?.draft_is_not_sent === true &&
      contract.evidence?.meeting_is_not_collective_authority === true &&
      contract.evidence?.pull_request_is_not_merge_or_deployment === true &&
      contract.evidence?.uncertainty_required === true,
    conscious_non_pursuit_is_available:
      isDeepStrictEqual(contract.dispositions, [
        "completed",
        "continuing",
        "waiting",
        "held",
        "consciously-not-pursuing",
        "superseded"
      ]),
    finite_commitment_budget:
      contract.commitment_budget?.minimum === 0 &&
      contract.commitment_budget?.maximum === 3 &&
      contract.commitment_budget?.maximum_per_lane === 1 &&
      isDeepStrictEqual(contract.commitment_budget?.lanes, [
        "livelihood",
        "community",
        "sustaining"
      ]) &&
      contract.commitment_budget?.automatic_carryover === false &&
      contract.commitment_budget?.human_selection_required === true &&
      contract.commitment_budget?.bounded_stopping_point_required === true,
    sustaining_capacity_is_non_instrumental:
      contract.sustaining_capacity?.boundary_required === true &&
      contract.sustaining_capacity?.rest_has_intrinsic_value === true &&
      contract.sustaining_capacity?.productivity_optimization_forbidden === true &&
      contract.sustaining_capacity?.minimum_activity_proof_required === false &&
      contract.sustaining_capacity?.health_or_bodily_detail_required === false &&
      contract.sustaining_capacity?.public_detail_required === false,
    observation_and_roleplay_are_non_authoritative:
      contract.automation?.source_access_authorized_by_rfc === false &&
      contract.automation?.collection_authorized_by_rfc === false &&
      contract.automation?.computer_history_is_observational_only === true &&
      contract.automation?.absence_of_activity_is_not_absence_of_life === true &&
      contract.automation?.automatic_commitment_selection === false &&
      contract.automation?.automatic_scheduling === false &&
      contract.modeled_review?.fictionalized_lenses_are_advisory === true &&
      contract.modeled_review?.quotation_or_endorsement_claimed === false &&
      contract.modeled_review?.action_authority === false &&
      contract.modeled_review?.priority_authority === false,
    publication_fails_closed:
      contract.publication?.automatic === false &&
      contract.publication?.private_record_redaction_is_sufficient === false &&
      contract.publication?.separate_minimum_necessary_composition_required === true &&
      contract.publication?.public_safety_review_required === true &&
      contract.publication?.exact_candidate_jamie_approval_required === true
  };

  const hardFailures = Object.entries(checks)
    .filter(([, passed]) => !passed)
    .map(([criterion]) => criterion);

  return {
    candidate: {
      fingerprint: candidateFingerprint(repoRoot),
      paths: candidatePaths
    },
    checks,
    hard_failures: hardFailures,
    scenarios: {
      total: scenarioResults.length,
      passed: scenarioResults.filter((scenario) => scenario.passed).length,
      results: scenarioResults
    }
  };
}

const invokedDirectly =
  process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;

if (invokedDirectly) {
  const result = evaluateFiniteWeeklyReviewRFC();
  console.log(JSON.stringify(result, null, 2));
  if (result.hard_failures.length > 0 || result.scenarios.passed !== result.scenarios.total) {
    process.exitCode = 1;
  }
}
