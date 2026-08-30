#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
export const repoRoot = path.resolve(scriptDir, "../..");

const paths = {
  contract:
    "docs/knowledge-bank/methods/source-backed-team-memory.operations.json",
  method: "docs/knowledge-bank/methods/source-backed-team-memory.md",
  labCopy: "apps/www/src/content/lab/source-backed-team-memory.mdx"
};

function readRequired(root, relative) {
  const file = path.join(root, relative);
  if (!existsSync(file)) throw new Error(`Required control-plane artifact is missing: ${relative}`);
  return readFileSync(file, "utf8");
}

export function loadControlPlaneCandidate(root = repoRoot) {
  return {
    contract: JSON.parse(readRequired(root, paths.contract)),
    method: readRequired(root, paths.method),
    labCopy: readRequired(root, paths.labCopy)
  };
}

function includesAll(actual, expected) {
  const values = new Set(actual ?? []);
  return expected.every((item) => values.has(item));
}

export function evaluateControlPlaneCandidate(candidate) {
  const failures = [];
  const check = (condition, failure) => {
    if (!condition) failures.push(failure);
  };
  const contract = candidate.contract ?? {};
  const publicMethod = `${candidate.method ?? ""}\n${candidate.labCopy ?? ""}`;
  const normalizedPublicMethod = publicMethod.replace(/\s+/g, " ").toLowerCase();

  check(
    includesAll(contract.graph_responsibilities, ["semantic", "evidence", "source-custody"]),
    "control plane loses one of the three graph responsibilities"
  );
  check(
    includesAll(contract.source_registry?.required_fields, [
      "source_id",
      "can_establish",
      "cannot_establish",
      "last_reviewed",
      "source_cutoff",
      "known_gaps",
      "refresh_trigger",
      "custody",
      "allowed_projection"
    ]) && contract.source_registry?.default_projection === "hold",
    "source registry does not preserve coverage, limits, freshness, custody, and projection state"
  );
  check(
    includesAll(contract.state_models?.opportunity?.allowed_states, [
      "discovered",
      "qualified",
      "ready-to-apply",
      "applied",
      "in-review",
      "interviewing",
      "offered",
      "accepted",
      "rejected",
      "expired"
    ]) &&
      includesAll(contract.state_models?.relationship?.invariants, [
        "interest-is-not-authority",
        "plan-is-not-action",
        "response-is-not-commitment"
      ]),
    "temporal state models collapse opportunity or relationship history"
  );
  check(
    includesAll(contract.health?.dimensions, [
      "source-coverage",
      "claim-maturity",
      "projection-freshness",
      "eval-readiness",
      "candidate-receipt-freshness",
      "action-readiness"
    ]) &&
      contract.health?.no_composite_override === true &&
      contract.health?.report_each_dimension === true,
    "health dimensions can be hidden by a composite score"
  );
  check(
    includesAll(
      (contract.planning_horizons ?? []).map((item) => item.window),
      ["24-hours", "7-days", "30-days", "90-days"]
    ),
    "planning horizons do not cover next action, active week, application cycle, and strategic learning"
  );
  check(
    includesAll(contract.dependency_receipts?.required_candidate_fields, [
      "commit",
      "content_fingerprint",
      "upstream_fingerprint"
    ]) &&
      contract.dependency_receipts?.stale_after_upstream_change === true &&
      contract.dependency_receipts?.cross_candidate_reuse === false,
    "dependency receipts are not exact-candidate or upstream-change sensitive"
  );
  check(
    contract.evaluation_pipeline?.deterministic_before_subjective === true &&
      contract.evaluation_pipeline?.objective_checks_may_use_subjective_model === false &&
      contract.evaluation_pipeline?.model_decision_authority === "none",
    "evaluation pipeline can spend subjective review before deterministic checks or grant model authority"
  );
  check(
    includesAll(contract.situated_voice?.required_fields, [
      "source_basis",
      "speaker_or_lens",
      "audience",
      "purpose",
      "public_private_boundary"
    ]) &&
      contract.situated_voice?.simulation_is_endorsement === false &&
      contract.situated_voice?.simulation_is_participation === false,
    "situated voice loses source, audience, purpose, boundary, or non-endorsement safeguards"
  );
  check(
    includesAll(contract.action_contract?.human_authorization_actions, [
      "send-outreach",
      "submit-application",
      "publish",
      "merge",
      "deploy",
      "spend",
      "make-public-endorsement",
      "take-political-action"
    ]) && contract.authority?.automation_action_authority === "none",
    "human action boundary grants automation consequential authority"
  );
  check(
    contract.federation?.local_authority_retained === true &&
      contract.federation?.forced_schema_merger === false &&
      contract.federation?.exchange_is_authority_transfer === false,
    "federation contract silently transfers authority or forces one internal schema"
  );
  for (const phrase of [
    "## Operating control plane",
    "source coverage and freshness",
    "temporal state",
    "health dimensions",
    "four planning horizons",
    "exact-candidate dependency receipts",
    "situated voice",
    "deterministic checks run before subjective review",
    "Human decisions remain human decisions"
  ]) {
    check(
      normalizedPublicMethod.includes(phrase.toLowerCase()),
      `maintained method does not explain ${phrase}`
    );
  }

  return { passed: failures.length === 0, failures };
}

function sortedUnique(values) {
  return [...new Set(values)].sort((left, right) => left.localeCompare(right, "en"));
}

function exactCandidateMatches(requiredFields, recorded, current) {
  return requiredFields.every(
    (field) =>
      typeof recorded?.[field] === "string" &&
      recorded[field].length > 0 &&
      recorded[field] === current?.[field]
  );
}

export function evaluateWorkflowItem(contract, item, context) {
  const deterministicReasons = [];
  const now = Date.parse(context?.now ?? "");
  const refreshDue = Date.parse(item?.source_refresh_due_at ?? "");

  if (!Number.isFinite(now) || !Number.isFinite(refreshDue) || refreshDue <= now) {
    deterministicReasons.push("source-refresh-required");
  }

  const transitions = contract.state_models?.opportunity?.transitions ?? {};
  if (!(transitions[item?.current_state] ?? []).includes(item?.proposed_state)) {
    deterministicReasons.push("invalid-state-transition");
  }

  if (
    !exactCandidateMatches(
      contract.dependency_receipts?.required_candidate_fields ?? [],
      item?.candidate,
      context?.currentCandidate
    )
  ) {
    deterministicReasons.push("candidate-receipt-stale");
  }

  if (item?.deterministic_checks_passed !== true) {
    deterministicReasons.push("deterministic-check-failed");
  }

  if (deterministicReasons.length > 0) {
    return {
      decision: "hold",
      reasons: sortedUnique(deterministicReasons),
      next_stage: "deterministic-remediation"
    };
  }

  const humanActions = new Set(
    contract.action_contract?.human_authorization_actions ?? []
  );
  if (humanActions.has(item?.action) && item?.human_authorization !== "approved") {
    return {
      decision: "hold",
      reasons: [`human-authorization-required:${item.action}`],
      next_stage: "human-decision"
    };
  }

  if (item?.subjective_review_required === true) {
    return {
      decision: "eligible-for-subjective-evaluation",
      reasons: [],
      next_stage: "subjective-evaluation",
      automation_authority: "none"
    };
  }

  return {
    decision: "eligible-for-human-action",
    reasons: [],
    next_stage: "human-decision",
    automation_authority: "none"
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const result = evaluateControlPlaneCandidate(loadControlPlaneCandidate());
  if (!result.passed) {
    console.error("Knowledge operations control-plane evaluation failed:");
    for (const failure of result.failures) console.error(`- ${failure}`);
    process.exit(1);
  }
  console.log("Knowledge operations control-plane evaluation passed: source freshness, temporal state, health, planning, receipts, eval order, situated voice, federation, and human authority remain explicit.");
}
