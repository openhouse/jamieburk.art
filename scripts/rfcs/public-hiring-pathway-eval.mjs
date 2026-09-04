#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { isDeepStrictEqual } from "node:util";

const scriptPath = fileURLToPath(import.meta.url);
const defaultRepoRoot = path.resolve(path.dirname(scriptPath), "../..");
const rfcPath = "rfcs/0012-public-paid-working-session-hiring-pathway.md";
const contractPath = "rfcs/0012-public-paid-working-session-hiring-pathway.contract.json";
const suitePath = "evals/knowledge-bank/public-hiring-pathway-rfc-evals.json";
const hillClimbPath =
  "evals/knowledge-bank/runs/2026-09-04-public-hiring-pathway-rfc-hill-climb.json";
const candidatePaths = [
  hillClimbPath,
  suitePath,
  "rfcs/README.md",
  rfcPath,
  contractPath,
  "scripts/check-rfcs.mjs",
  "scripts/rfcs/public-hiring-pathway-eval.mjs",
  "scripts/rfcs/public-hiring-pathway-eval.test.mjs"
];

function sortedUnique(values) {
  return [...new Set(values)].sort((left, right) => left.localeCompare(right, "en"));
}

function containsField(value, field) {
  if (!value || typeof value !== "object") return false;
  if (Object.hasOwn(value, field)) return true;
  return Object.values(value).some((child) => containsField(child, field));
}

export function evaluatePublicHiringPathway(contract, candidate) {
  const denialReasons = [];
  const holdReasons = [];

  for (const field of contract.public_boundary?.forbidden_fields ?? []) {
    if (containsField(candidate, field)) {
      denialReasons.push(`forbidden-public-field:${field}`);
    }
  }

  if (candidate.offer?.follow_on !== contract.offer?.follow_on) {
    denialReasons.push("follow-on-must-be-separately-scoped-and-authorized");
  }

  if (!(contract.surface?.allowed_cta_actions ?? []).includes(candidate.cta?.action)) {
    denialReasons.push(`cta-action-not-allowed:${candidate.cta?.action ?? "missing"}`);
  }

  if (candidate.cta?.implied_current_availability !== false) {
    denialReasons.push("current-availability-not-established");
  }

  if (candidate.public_contract?.published !== false || candidate.public_contract?.linked !== false) {
    denialReasons.push("public-contract-not-authorized");
  }

  if (denialReasons.length > 0) {
    return { decision: "deny", reasons: sortedUnique(denialReasons) };
  }

  if (candidate.offer?.model !== contract.offer?.model) {
    holdReasons.push("offer-model-not-fixed-fee-outcome");
  }
  if (candidate.offer?.currency !== contract.offer?.currency) {
    holdReasons.push("offer-currency-mismatch");
  }
  if (candidate.offer?.amount !== contract.offer?.proposed_amount) {
    holdReasons.push("proposed-fee-mismatch");
  }
  if (
    candidate.offer?.maximum_total_effort_minutes !==
    contract.offer?.maximum_total_effort_minutes
  ) {
    holdReasons.push("total-effort-boundary-mismatch");
  }

  for (const component of contract.offer?.required_components ?? []) {
    if (!(candidate.offer?.components ?? []).includes(component)) {
      holdReasons.push(`offer-component-missing:${component}`);
    }
  }

  if (candidate.offer?.intended_outcome_agreed_before_work !== true) {
    holdReasons.push("intended-outcome-agreement-required");
  }
  if (candidate.offer?.standalone !== contract.offer?.standalone) {
    holdReasons.push("standalone-offer-required");
  }
  if (candidate.surface?.primary_location !== contract.surface?.primary_location) {
    holdReasons.push("primary-location-mismatch");
  }
  if (candidate.surface?.homepage_role !== contract.surface?.homepage_role) {
    holdReasons.push("homepage-role-mismatch");
  }
  if (candidate.surface?.new_route_required !== contract.surface?.new_route_required) {
    holdReasons.push("new-route-not-authorized");
  }

  if (holdReasons.length > 0) {
    return { decision: "hold", reasons: sortedUnique(holdReasons) };
  }

  return {
    decision: "ready-for-human-review",
    next_state: contract.stage,
    implementation_authorized: contract.authority.implementation_authorized,
    publication_authorized: contract.authority.publication_authorized,
    reasons: []
  };
}

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

export function evaluatePublicHiringPathwayRFC(options = {}) {
  const repoRoot = options.repoRoot ?? defaultRepoRoot;
  const contract = options.contract ?? loadJson(repoRoot, contractPath);
  const suite = options.suite ?? loadJson(repoRoot, suitePath);
  const rfc = options.rfcSource ?? readFileSync(path.join(repoRoot, rfcPath), "utf8");
  const hillClimb = loadJson(repoRoot, hillClimbPath);
  const scenarioResults = suite.cases.map((scenario) => {
    const actual = evaluatePublicHiringPathway(contract, scenario.candidate);
    return {
      id: scenario.id,
      passed: isDeepStrictEqual(actual, scenario.expected),
      actual,
      expected: scenario.expected
    };
  });

  const checks = {
    proposal_boundary:
      contract.rfc === 12 &&
      contract.stage === "proposed" &&
      contract.authority?.implementation_authorized === false &&
      contract.authority?.publication_authorized === false &&
      contract.authority?.automatic_acceptance_authority === "none" &&
      /^stage:\s+proposed$/m.test(rfc) &&
      /^implementation:\s+null$/m.test(rfc),
    outcome_based_entry_unit:
      contract.offer?.model === "fixed-fee-outcome" &&
      contract.offer?.maximum_total_effort_minutes === 60 &&
      contract.offer?.required_components?.includes("agreed-preparation") &&
      contract.offer?.required_components?.includes("working-session-or-analysis") &&
      contract.offer?.required_components?.includes("short-written-recap") &&
      contract.offer?.standalone === true &&
      contract.offer?.follow_on === "separately-scoped-and-authorized",
    low_burden_surface:
      contract.surface?.primary_location === "/contact#working-session" &&
      contract.surface?.homepage_role === "secondary" &&
      contract.surface?.new_route_required === false &&
      contract.surface?.allowed_cta_actions?.includes("propose-working-session"),
    public_private_separation:
      contract.public_boundary?.named_private_opportunity === false &&
      contract.public_boundary?.private_provenance_publication === false &&
      [
        "private_transcript",
        "private_correspondence",
        "relationship_source",
        "client_negotiation",
        "private_repository_locator"
      ].every((field) => contract.public_boundary?.forbidden_fields?.includes(field)),
    contract_separation:
      contract.contract_boundary?.public_contract === false &&
      contract.contract_boundary?.agreement_occurs_after_fit_check === true &&
      contract.contract_boundary?.signature_authority_verified_separately === true,
    human_gates:
      [
        "exact-public-copy",
        "displayed-price",
        "implementation",
        "deployment",
        "production-indexing"
      ].every((gate) => contract.authority?.human_decisions?.includes(gate)),
    hill_climb_evidence:
      hillClimb.rfc === 12 &&
      hillClimb.decision === "keep-change" &&
      hillClimb.baseline?.decision === "hold" &&
      hillClimb.candidate?.deterministic_score === 1 &&
      hillClimb.candidate?.implementation_authorized === false &&
      hillClimb.candidate?.publication_authorized === false,
    scenario_coverage:
      scenarioResults.length >= 8 && scenarioResults.every((scenario) => scenario.passed)
  };

  const weight = 1 / Object.keys(checks).length;
  const score = Object.values(checks).reduce(
    (total, passed) => total + (passed ? weight : 0),
    0
  );
  const hardFailures = Object.entries(checks)
    .filter(([, passed]) => !passed)
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
    implementation_authorized: contract.authority.implementation_authorized,
    publication_authorized: contract.authority.publication_authorized
  };
}

function main() {
  const evaluation = evaluatePublicHiringPathwayRFC();
  process.stdout.write(`${JSON.stringify(evaluation, null, 2)}\n`);
  if (evaluation.hard_failures.length > 0 || evaluation.scenarios.failed > 0) {
    process.exitCode = 1;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
