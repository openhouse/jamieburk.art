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
  "apps/www/src/data/page-owner-registry.json",
  "evals/page-owners/runs/2026-08-22-colophon-page-owners.json",
  suitePath,
  "package.json",
  "rfcs/README.md",
  rfcPath,
  contractPath,
  "scripts/check-rfcs.mjs",
  "scripts/page-owners/contact-assignment-eval.mjs",
  "scripts/page-owners/contact-assignment-eval.test.mjs",
  "scripts/page-owners/evaluate.mjs",
  "scripts/page-owners/evaluate.test.mjs",
  "scripts/rfcs/public-private-boundary-eval.test.mjs",
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

function sortedUnique(values) {
  return [...new Set(values)].sort((left, right) => left.localeCompare(right, "en"));
}

export function evaluateEngagementInformationPlacement(policy, candidate) {
  const contentClasses = sortedUnique(candidate.content_classes ?? []);
  const sourceVaultClasses = new Set(
    policy.source_vault?.required_content_classes ?? []
  );
  const sourceVaultContent = contentClasses.filter((contentClass) =>
    sourceVaultClasses.has(contentClass)
  );

  if (sourceVaultContent.length > 0) {
    const enteredPrivateGit = candidate.requested_destination === "private-sidecar";
    return {
      decision: enteredPrivateGit ? "route-to-source-vault" : "deny",
      destination: "source-vault",
      publication_authorized: false,
      reasons: sourceVaultContent.map(
        (contentClass) =>
          `source-vault-content-cannot-enter-${enteredPrivateGit ? "private-git" : "git"}:${contentClass}`
      )
    };
  }

  if (candidate.requested_destination === "public") {
    const forbiddenPublicClasses = new Set(
      policy.public?.forbidden_content_classes ?? []
    );
    const forbidden = contentClasses.filter((contentClass) =>
      forbiddenPublicClasses.has(contentClass)
    );
    const reasons = forbidden.map(
      (contentClass) => `public-content-forbidden:${contentClass}`
    );
    if (candidate.public_backlink_to_private) {
      reasons.push("public-private-backlink-forbidden");
    }
    if (reasons.length > 0) {
      return {
        decision: "deny",
        destination: "private-sidecar",
        publication_authorized: false,
        reasons: sortedUnique(reasons)
      };
    }

    const allowedPublicClasses = new Set(
      policy.public?.allowed_content_classes ?? []
    );
    const unclassified = contentClasses.filter(
      (contentClass) => !allowedPublicClasses.has(contentClass)
    );
    const holdReasons = unclassified.map(
      (contentClass) => `public-content-unclassified:${contentClass}`
    );
    if (!candidate.has_separate_publication_packet) {
      holdReasons.push("separate-publication-packet-required");
    }
    return {
      decision: holdReasons.length > 0 ? "hold" : "ready-for-public-review",
      destination: "public",
      publication_authorized: false,
      reasons: sortedUnique(holdReasons)
    };
  }

  if (candidate.requested_destination === "private-sidecar") {
    const allowedPrivateClasses = new Set(
      policy.private_sidecar?.allowed_content_classes ?? []
    );
    const allowedRepresentations = new Set(
      policy.private_sidecar?.allowed_representations ?? []
    );
    const reasons = contentClasses
      .filter((contentClass) => !allowedPrivateClasses.has(contentClass))
      .map((contentClass) => `private-content-unclassified:${contentClass}`);
    if (!allowedRepresentations.has(candidate.representation)) {
      reasons.push("private-representation-not-governed");
    }
    if (!candidate.source_registered) reasons.push("private-source-registration-required");
    return {
      decision: reasons.length > 0 ? "hold" : "ready-for-private-intake",
      destination: "private-sidecar",
      publication_authorized: false,
      reasons: sortedUnique(reasons)
    };
  }

  return {
    decision: "hold",
    destination: null,
    publication_authorized: false,
    reasons: ["destination-unrecognized"]
  };
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
  const placementScenarioResults = (suite.placement_cases ?? []).map((scenario) => {
    const actual = evaluateEngagementInformationPlacement(
      contract.information_partition,
      scenario.candidate
    );
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
    three_plane_information_partition:
      contract.information_partition?.public?.allowed_content_classes?.length >= 6 &&
      contract.information_partition?.public?.forbidden_content_classes?.includes(
        "named-relationship"
      ) &&
      contract.information_partition?.private_sidecar?.allowed_representations?.includes(
        "bounded-derived-record"
      ) &&
      contract.information_partition?.source_vault?.required_content_classes?.includes(
        "raw-transcript"
      ) &&
      contract.information_partition?.projection?.direction === "private-to-public" &&
      contract.information_partition?.projection?.public_backlink_to_private === false &&
      contract.information_partition?.projection?.separate_publication_packet_required === true,
    scenario_coverage:
      scenarioResults.length === 7 && scenarioResults.every((scenario) => scenario.passed),
    placement_scenario_coverage:
      placementScenarioResults.length === 7 &&
      placementScenarioResults.every((scenario) => scenario.passed),
    reader_burden:
      wordCount(contract.public_copy.body) <= 75 &&
      wordCount(contract.public_copy.cta_label) <= 4
  };

  const criterionWeight = 1 / Object.keys(checks).length;
  const rubric = Object.fromEntries(
    Object.keys(checks).map((id) => [
      id,
      { weight: criterionWeight, hard: id !== "reader_burden" }
    ])
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
    placement_scenarios: {
      total: placementScenarioResults.length,
      passed: placementScenarioResults.filter((scenario) => scenario.passed).length,
      failed: placementScenarioResults.filter((scenario) => !scenario.passed).length,
      results: placementScenarioResults
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
