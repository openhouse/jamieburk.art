#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { isDeepStrictEqual } from "node:util";

const scriptPath = fileURLToPath(import.meta.url);
const defaultRepoRoot = path.resolve(path.dirname(scriptPath), "../..");
const rfcPath = "rfcs/0012-public-engagement-pathway.md";
const contractPath = "rfcs/0012-public-engagement-pathway.contract.json";
const suitePath = "evals/knowledge-bank/public-engagement-pathway-rfc-evals.json";
const candidatePaths = [
  suitePath,
  "package.json",
  "rfcs/README.md",
  rfcPath,
  contractPath,
  "scripts/check-rfcs.mjs",
  "scripts/rfcs/public-engagement-pathway-eval.mjs",
  "scripts/rfcs/public-engagement-pathway-eval.test.mjs"
];

function loadJson(repoRoot, relativePath) {
  return JSON.parse(readFileSync(path.join(repoRoot, relativePath), "utf8"));
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

function wordCount(value) {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

export function evaluatePublicEngagementPathway(contract, candidate) {
  const denialReasons = [];
  const holdReasons = [];

  if (candidate.references_specific_private_opportunity) {
    denialReasons.push("specific-private-opportunity-reference-forbidden");
  }
  if (candidate.implies_past_client_outcome) {
    denialReasons.push("past-client-outcome-claim-forbidden");
  }
  if (candidate.implies_endorsement) {
    denialReasons.push("endorsement-claim-forbidden");
  }
  if (
    contract.pathways.continuation_requires_separate_mutual_decision &&
    !candidate.continuation_is_separate
  ) {
    denialReasons.push("automatic-continuation-forbidden");
  }

  if (candidate.introduces_new_route) {
    holdReasons.push("new-route-not-justified");
  }
  if (
    contract.pricing.public_price_state === "decision-pending" &&
    candidate.public_price !== null
  ) {
    holdReasons.push("public-price-decision-required");
  }
  if (candidate.surface !== "/contact") {
    holdReasons.push("recommended-surface-mismatch");
  }
  if (!candidate.paid) holdReasons.push("paid-boundary-missing");
  if (candidate.duration_minutes !== 60) holdReasons.push("duration-boundary-missing");
  if (!candidate.names_problem_types) holdReasons.push("problem-types-missing");
  if (!candidate.names_takeaway) holdReasons.push("takeaway-missing");
  if (
    contract.pathways.other_engagements_remain_visible &&
    !candidate.other_engagements_remain_visible
  ) {
    holdReasons.push("other-engagement-pathways-missing");
  }

  if (denialReasons.length > 0) {
    return {
      decision: "deny",
      publication_authorized: false,
      reasons: denialReasons
    };
  }

  return {
    decision: holdReasons.length > 0 ? "hold" : "ready-for-human-review",
    publication_authorized: false,
    reasons: holdReasons
  };
}

export function evaluatePublicEngagementPathwayRFC(options = {}) {
  const repoRoot = options.repoRoot ?? defaultRepoRoot;
  const contract = options.contract ?? loadJson(repoRoot, contractPath);
  const suite = options.suite ?? loadJson(repoRoot, suitePath);
  const rfc = options.rfcSource ?? readFileSync(path.join(repoRoot, rfcPath), "utf8");

  const scenarioResults = suite.cases.map((scenario) => {
    const actual = evaluatePublicEngagementPathway(contract, scenario.candidate);
    return {
      id: scenario.id,
      passed: isDeepStrictEqual(actual, scenario.expected),
      actual,
      expected: scenario.expected
    };
  });

  const checks = {
    proposal_preserves_human_authority:
      contract.rfc === 12 &&
      contract.stage === "proposed" &&
      contract.authority?.decision_owner === "Jamie Burkart" &&
      contract.authority?.implementation_authorized === false &&
      contract.authority?.publication_authorized === false,
    reuses_high_intent_contact_surface:
      contract.information_architecture?.primary_surface === "/contact" &&
      contract.information_architecture?.introduces_new_route === false &&
      contract.information_architecture?.contact_channel === "email",
    bounded_paid_entry_is_explicit:
      contract.pathways?.entry_unit === "one-paid-bounded-working-session" &&
      contract.pathways?.duration_minutes === 60 &&
      rfc.includes(contract.public_copy.heading) &&
      rfc.includes(contract.public_copy.body),
    outcome_and_takeaway_are_concrete:
      contract.outcome?.agreed_in_advance === true &&
      contract.outcome?.usable_takeaway_required === true &&
      contract.outcome?.examples?.length >= 3,
    continuation_requires_a_new_choice:
      contract.pathways?.continuation_requires_separate_mutual_decision === true &&
      contract.pathways?.automatic_continuation === false,
    broader_hiring_position_remains_visible:
      contract.pathways?.other_engagements_remain_visible === true,
    private_origin_and_claims_do_not_project:
      Object.values(contract.public_boundary ?? {}).every((value) => value === false),
    public_pricing_remains_a_human_decision:
      contract.pricing?.public_price_state === "decision-pending" &&
      contract.pricing?.amount === null &&
      contract.authority?.public_price_authorized === false,
    scenario_coverage:
      scenarioResults.length === 7 && scenarioResults.every((scenario) => scenario.passed),
    reader_burden:
      wordCount(contract.public_copy.body) <= 75 &&
      wordCount(contract.public_copy.cta_label) <= 4
  };

  const rubric = {
    proposal_preserves_human_authority: { weight: 0.1, hard: true },
    reuses_high_intent_contact_surface: { weight: 0.1, hard: true },
    bounded_paid_entry_is_explicit: { weight: 0.1, hard: true },
    outcome_and_takeaway_are_concrete: { weight: 0.1, hard: true },
    continuation_requires_a_new_choice: { weight: 0.1, hard: true },
    broader_hiring_position_remains_visible: { weight: 0.1, hard: true },
    private_origin_and_claims_do_not_project: { weight: 0.1, hard: true },
    public_pricing_remains_a_human_decision: { weight: 0.1, hard: true },
    scenario_coverage: { weight: 0.1, hard: true },
    reader_burden: { weight: 0.1, hard: false }
  };
  const score = Object.entries(rubric).reduce(
    (total, [id, criterion]) => total + (checks[id] ? criterion.weight : 0),
    0
  );
  const hardFailures = Object.entries(rubric)
    .filter(([id, criterion]) => criterion.hard && !checks[id])
    .map(([id]) => id);

  return {
    schema_version: 1,
    rfc: 12,
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
    public_copy_word_count: wordCount(contract.public_copy.body),
    implementation_authorized: contract.authority.implementation_authorized,
    publication_authorized: contract.authority.publication_authorized
  };
}

function main() {
  const evaluation = evaluatePublicEngagementPathwayRFC();
  process.stdout.write(`${JSON.stringify(evaluation, null, 2)}\n`);
  if (evaluation.hard_failures.length > 0 || evaluation.scenarios.failed > 0) {
    process.exitCode = 1;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
