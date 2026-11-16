#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const defaultRepoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

function readJson(file) {
  return JSON.parse(readFileSync(file, "utf8"));
}

function fingerprint(files) {
  const hash = createHash("sha256");
  for (const file of files) {
    hash.update(path.basename(file));
    hash.update("\0");
    hash.update(readFileSync(file));
    hash.update("\0");
  }
  return hash.digest("hex");
}

export function evaluateWeeklyPracticeCandidate(contract, candidate) {
  const deny = [];
  const hold = [];
  const allowedVerbs = new Set(contract.gathering_policy.allowed_verbs);
  const allowedCommercialStates = new Set(contract.commercial_boundary.allowed_states);
  const forbiddenPublic = new Set(contract.information_partition.public_forbidden);
  const forbiddenAutomation = new Set(contract.automation.may_not);

  if (candidate.assigns_other_people_without_opt_in) {
    deny.push("other-person-assignment-without-opt-in");
  }
  for (const contentClass of candidate.public_content_classes ?? []) {
    if (forbiddenPublic.has(contentClass)) deny.push(`public-content-forbidden:${contentClass}`);
  }
  for (const action of candidate.automation_actions ?? []) {
    if (forbiddenAutomation.has(action)) deny.push(`automation-action-forbidden:${action}`);
  }
  if (candidate.person_level_productivity_surveillance) {
    deny.push("person-level-productivity-surveillance-forbidden");
  }

  if (candidate.active_commitment_count > contract.commitment_policy.default_active_limit) {
    hold.push("default-active-limit-exceeded");
  }
  if (!candidate.all_commitments_have_required_fields) hold.push("commitment-fields-incomplete");
  if (candidate.counts_preservation_as_active) hold.push("preservation-conflated-with-commitment");
  if (
    candidate.new_commitment_requested &&
    !candidate.capacity_slot_available &&
    !candidate.substitution_recorded
  ) {
    hold.push("one-in-one-out-substitution-required");
  }
  if (candidate.gathering_verb_count !== contract.gathering_policy.governing_verb_count) {
    hold.push("one-governing-verb-required");
  }
  if (!allowedVerbs.has(candidate.gathering_verb)) hold.push("governing-verb-not-allowed");
  if (!candidate.closure_receipt_complete) hold.push("closure-receipt-incomplete");
  if (!candidate.agency_map_complete) hold.push("agency-map-incomplete");
  if (
    candidate.bespoke_work_requested &&
    !allowedCommercialStates.has(candidate.commercial_state)
  ) {
    hold.push("commercial-boundary-required");
  }
  if (!candidate.has_publication_packet) hold.push("separate-publication-packet-required");

  const reasons = (deny.length ? deny : hold).sort();
  return {
    decision: deny.length ? "deny" : hold.length ? "hold" : "ready-for-human-review",
    adoption_authorized: false,
    publication_authorized: false,
    reasons
  };
}

export function evaluateWeeklyPracticeReviewRFC({ repoRoot = defaultRepoRoot } = {}) {
  const rfcPath = path.join(repoRoot, "rfcs/0014-weekly-practice-review-and-commitment-protocol.md");
  const contractPath = path.join(repoRoot, "rfcs/0014-weekly-practice-review-and-commitment-protocol.contract.json");
  const evalPath = path.join(repoRoot, "evals/knowledge-bank/weekly-practice-review-rfc-evals.json");
  const rfc = readFileSync(rfcPath, "utf8");
  const contract = readJson(contractPath);
  const spec = readJson(evalPath);
  const base = spec.cases[0].candidate;

  const scenarioResults = spec.cases.map((testCase) => {
    const candidate = testCase.candidate ?? { ...base, ...testCase.patch };
    const actual = evaluateWeeklyPracticeCandidate(contract, candidate);
    return {
      id: testCase.id,
      passed: JSON.stringify(actual) === JSON.stringify(testCase.expected),
      actual,
      expected: testCase.expected
    };
  });

  const hardCriteria = {
    proposed_stage_preserved:
      contract.stage === "proposed" &&
      contract.authority.implementation_authorized === false &&
      contract.authority.adoption_authorized === false &&
      contract.authority.publication_authorized === false,
    finite_commitment_slate:
      contract.commitment_policy.default_active_limit === 3 &&
      contract.commitment_policy.fewer_allowed === true &&
      contract.commitment_policy.suggested_lanes_are_quotas === false,
    preservation_is_not_commitment:
      contract.commitment_policy.preservation_creates_commitment === false &&
      /Preservation is not commitment/.test(rfc),
    one_in_one_out_admission:
      contract.commitment_policy.full_slate_admission === "one-in-one-out" &&
      /one-in, one-out/i.test(rfc),
    one_gathering_verb:
      contract.gathering_policy.governing_verb_count === 1 &&
      contract.gathering_policy.allowed_verbs.length === 6 &&
      /one governing verb/i.test(rfc),
    voluntary_agency:
      contract.agency_policy.other_people_require_opt_in === true &&
      /No one is assigned work by inference/.test(rfc),
    commercial_boundary:
      contract.commercial_boundary.bespoke_work_requires_explicit_state === true &&
      contract.commercial_boundary.goodwill_creates_unlimited_unpaid_work === false,
    three_plane_information_boundary:
      contract.information_partition.public_backlink_to_private === false &&
      contract.information_partition.separate_publication_packet_required === true &&
      contract.information_partition.source_vault_required.length > 0,
    automation_is_advisory:
      contract.automation.may_not.includes("choose-priorities") &&
      contract.automation.may_not.includes("assign-people") &&
      contract.automation.may_not.includes("publish"),
    scenario_regression: scenarioResults.every((result) => result.passed)
  };

  const scoredCriteria = {
    all_hard_criteria_pass: Object.values(hardCriteria).every(Boolean),
    operator_review_budget: contract.cadence.operator_budget_minutes <= 30,
    decision_facing_compression: contract.cadence.decision_facing_page_limit === 1,
    evidence_window: contract.cadence.evidence_window_required === true,
    complete_commitment_fields: contract.commitment_policy.required_fields.length === 6,
    complete_closure_fields: contract.gathering_policy.closure_fields.length === 8,
    visible_unassigned_work: contract.agency_policy.unassigned_work_remains_visible === true,
    bounded_commercial_states: contract.commercial_boundary.allowed_states.length === 4,
    no_surveillance: /Do not create a productivity score/.test(rfc),
    reversible_canary: /two-week private canary/i.test(rfc) && /Rollback/.test(rfc)
  };
  const score = Object.values(scoredCriteria).filter(Boolean).length / Object.keys(scoredCriteria).length;

  return {
    rfc: 14,
    stage: contract.stage,
    score,
    criteria: scoredCriteria,
    hard_failures: Object.entries(hardCriteria).filter(([, passed]) => !passed).map(([id]) => id),
    scenarios: {
      total: scenarioResults.length,
      passed: scenarioResults.filter((result) => result.passed).length,
      failed: scenarioResults.filter((result) => !result.passed).length,
      results: scenarioResults
    },
    candidate_fingerprint: fingerprint([rfcPath, contractPath, evalPath]),
    implementation_authorized: contract.authority.implementation_authorized,
    adoption_authorized: contract.authority.adoption_authorized,
    publication_authorized: contract.authority.publication_authorized
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const result = evaluateWeeklyPracticeReviewRFC();
  console.log(JSON.stringify(result, null, 2));
  if (result.hard_failures.length || result.scenarios.failed) process.exitCode = 1;
}
