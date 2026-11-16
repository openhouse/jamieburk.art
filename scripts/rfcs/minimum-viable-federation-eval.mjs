#!/usr/bin/env node

import { createHash } from "node:crypto";
import { isDeepStrictEqual } from "node:util";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const scriptPath = fileURLToPath(import.meta.url);
const defaultRepoRoot = path.resolve(path.dirname(scriptPath), "../..");
const rfcPath = "rfcs/0010-minimum-viable-federation-canary.md";
const contractPath = "rfcs/0010-minimum-viable-federation-canary.contract.json";
const suitePath = "evals/knowledge-bank/minimum-viable-federation-rfc-evals.json";
const candidatePaths = [
  "rfcs/README.md",
  rfcPath,
  contractPath,
  suitePath,
  "scripts/check-rfcs.mjs",
  "scripts/rfcs/minimum-viable-federation-eval.mjs",
  "scripts/rfcs/minimum-viable-federation-eval.test.mjs"
];

function sortedUnique(values) {
  return [...new Set(values)].sort((left, right) => left.localeCompare(right, "en"));
}

function missingFields(value, fields, prefix) {
  return (fields ?? [])
    .filter((field) => {
      const candidate = value?.[field];
      return candidate === undefined || candidate === null || candidate === "";
    })
    .map((field) => `${prefix}:${field}`);
}

function containsField(value, field) {
  if (!value || typeof value !== "object") return false;
  if (Object.hasOwn(value, field)) return true;
  return Object.values(value).some((child) => containsField(child, field));
}

export function evaluateCanaryEvent(contract, event, context = {}) {
  if (contract.authority?.automation_publication_authority !== "none") {
    return {
      decision: "deny",
      reasons: ["automation-publication-authority-forbidden"]
    };
  }

  const missingEventFields = missingFields(
    event,
    contract.exchange?.required_fields,
    "event-field-missing"
  );
  if (missingEventFields.length > 0) {
    return { decision: "hold", reasons: sortedUnique(missingEventFields) };
  }

  const allowedKinds = new Set(contract.exchange?.allowed_kinds ?? []);
  if (!allowedKinds.has(event.kind)) {
    return { decision: "deny", reasons: ["exchange-kind-not-allowed"] };
  }

  const forbiddenFields = (contract.exchange?.forbidden_public_fields ?? [])
    .filter((field) => containsField(event, field))
    .map((field) => `forbidden-public-field:${field}`);
  if (forbiddenFields.length > 0) {
    return { decision: "deny", reasons: sortedUnique(forbiddenFields) };
  }

  const missingOriginFields = missingFields(
    event.origin,
    contract.exchange?.origin_requires,
    "origin-field-missing"
  );
  if (missingOriginFields.length > 0) {
    return { decision: "hold", reasons: sortedUnique(missingOriginFields) };
  }

  const missingAuthorityFields = missingFields(
    event.authority,
    contract.exchange?.authority_requires,
    "authority-field-missing"
  );
  if (missingAuthorityFields.length > 0) {
    return { decision: "hold", reasons: sortedUnique(missingAuthorityFields) };
  }

  const authorityValues = (contract.exchange?.authority_requires ?? []).map(
    (field) => event.authority[field]
  );
  if (
    contract.exchange?.authority_must_be_distinct === true &&
    new Set(authorityValues).size !== authorityValues.length
  ) {
    return { decision: "deny", reasons: ["authority-boundaries-collapsed"] };
  }

  const unavailableStates = new Set(
    contract.evidence_boundaries?.unresolved_source_states ?? []
  );
  if (unavailableStates.has(event.source_access_state)) {
    return {
      decision: contract.evidence_boundaries?.unresolved_source_effect ?? "hold",
      reasons: [`source-content-unavailable:${event.source_access_state}`]
    };
  }

  const outboundOnlyPostures = new Set(
    contract.evidence_boundaries?.outbound_only_postures ?? []
  );
  const outcomesRequiringResponse = new Set(
    contract.evidence_boundaries?.outcomes_requiring_response ?? []
  );
  if (
    outboundOnlyPostures.has(event.evidence_posture) &&
    outcomesRequiringResponse.has(event.claim_assertion)
  ) {
    return {
      decision: "hold",
      reasons: [`outbound-only-cannot-establish:${event.claim_assertion}`]
    };
  }

  if (
    contract.evidence_boundaries?.duplicate_content_fingerprints_do_not_add_support === true &&
    event.corroboration_required === true &&
    Array.isArray(event.source_content_fingerprints)
  ) {
    const independentSourceCount = new Set(event.source_content_fingerprints).size;
    const minimumIndependentSources = event.minimum_independent_sources ?? 2;
    if (
      independentSourceCount < minimumIndependentSources &&
      independentSourceCount < event.source_content_fingerprints.length
    ) {
      return {
        decision: "hold",
        reasons: ["duplicate-content-fingerprints-cannot-establish-corroboration"]
      };
    }
  }

  const bindingFields = contract.exchange?.origin_binding_fields ?? [];
  const mismatchedBindings = bindingFields
    .filter(
      (field) =>
        context.current_origin?.[field] !== undefined &&
        event.origin[field] !== context.current_origin[field]
    )
    .map((field) => `origin-binding-mismatch:${field}`);
  if (mismatchedBindings.length > 0) {
    return { decision: "deny", reasons: sortedUnique(mismatchedBindings) };
  }

  if (event.intent === "publish") {
    return {
      decision: "deny",
      reasons: ["automation-publication-authority-forbidden"]
    };
  }

  if (event.kind === "correction-notice") {
    const correctionMissing = missingFields(
      event,
      contract.correction?.required_fields,
      "correction-field-missing"
    );
    for (const field of contract.correction?.required_fields ?? []) {
      if (Array.isArray(event[field]) && event[field].length === 0) {
        correctionMissing.push(`correction-field-empty:${field}`);
      }
    }
    if (correctionMissing.length > 0) {
      return { decision: "hold", reasons: sortedUnique(correctionMissing) };
    }

    return {
      decision: contract.correction.downstream_effect,
      correction_id: event.correction_id,
      invalidated_projection_ids: sortedUnique(event.affected_projection_ids),
      original_preserved: contract.correction.original_preserved,
      authority_transferred: contract.exchange.authority_transferred,
      publication_authorized: false,
      reasons: []
    };
  }

  return {
    decision: "accept-as-proposal",
    next_state: "received-proposal",
    authority_transferred: contract.exchange.authority_transferred,
    publication_authorized: false,
    reasons: []
  };
}

function loadJson(repoRoot, relativePath) {
  return JSON.parse(readFileSync(path.join(repoRoot, relativePath), "utf8"));
}

function candidateFingerprint(repoRoot) {
  const digest = createHash("sha256");
  for (const relativePath of candidatePaths) {
    digest.update(relativePath);
    digest.update("\0");
    digest.update(readFileSync(path.join(repoRoot, relativePath)));
    digest.update("\0");
  }
  return digest.digest("hex");
}

export function evaluateMinimumViableFederationRFC(options = {}) {
  const repoRoot = options.repoRoot ?? defaultRepoRoot;
  const contract = options.contract ?? loadJson(repoRoot, contractPath);
  const suite = options.suite ?? loadJson(repoRoot, suitePath);
  const rfc = options.rfcSource ?? readFileSync(path.join(repoRoot, rfcPath), "utf8");
  const scenarioResults = suite.cases.map((scenario) => {
    const actual = evaluateCanaryEvent(contract, scenario.event, scenario.context);
    return {
      id: scenario.id,
      passed: isDeepStrictEqual(actual, scenario.expected),
      actual,
      expected: scenario.expected
    };
  });

  const mapNames = Object.keys(contract.maps ?? {}).sort();
  const laneNames = Object.keys(contract.capability_lanes ?? {}).sort();
  const checks = {
    proposal_boundary:
      contract.rfc === 10 &&
      contract.stage === "proposed" &&
      contract.authority?.implementation_authorized === false &&
      contract.authority?.publication_authorized === false &&
      contract.authority?.stage_advancement === "human-only" &&
      /^stage:\s+proposed$/m.test(rfc) &&
      /^implementation:\s+null$/m.test(rfc),
    complementary_capability_lanes: isDeepStrictEqual(laneNames, [
      "federation",
      "intelligibility",
      "legitimacy"
    ]),
    three_map_model: isDeepStrictEqual(mapNames, ["action", "meaning", "record"]),
    bounded_sourcebook_canary:
      contract.canary?.source_population_size === 3 &&
      contract.canary?.correction_fixture_policy === "synthetic-unless-separately-authorized" &&
      contract.canary?.real_source_access === false &&
      contract.canary?.public_projection === false,
    exchange_boundary:
      [
        "event_id",
        "kind",
        "origin",
        "target",
        "purpose",
        "audience",
        "authority"
      ].every((field) => contract.exchange?.required_fields?.includes(field)) &&
      ["repository", "record_id", "revision", "content_fingerprint"].every((field) =>
        contract.exchange?.origin_requires?.includes(field)
      ) &&
      contract.exchange?.authority_must_be_distinct === true &&
      contract.exchange?.authority_transferred === false,
    privacy_and_correction:
      ["raw_source_body", "protected_locator", "private_identifier"].every((field) =>
        contract.exchange?.forbidden_public_fields?.includes(field)
      ) &&
      contract.correction?.downstream_effect === "hold-projection" &&
      contract.correction?.original_preserved === true &&
      contract.evidence_boundaries?.silence_is_approval === false &&
      contract.evidence_boundaries?.unresolved_source_effect === "hold" &&
      ["acceptance", "adoption", "delivery", "deployment", "endorsement", "payment"].every(
        (outcome) => contract.evidence_boundaries?.outcomes_requiring_response?.includes(outcome)
      ) &&
      contract.evidence_boundaries?.duplicate_content_fingerprints_do_not_add_support === true,
    currentness_and_local_authority:
      contract.currentness?.evaluation_as_of_required === true &&
      contract.currentness?.exact_revision_required === true &&
      contract.authority?.transport_is_canonical_authority === false &&
      contract.authority?.automation_publication_authority === "none",
    ordered_evaluation:
      isDeepStrictEqual(contract.evaluation?.ordered_phases, [
        "deterministic",
        "subjective",
        "human"
      ]) &&
      contract.evaluation?.model_may_approve_own_output === false,
    human_gate_integrity:
      [
        "affected-party-review",
        "rights",
        "consent",
        "collective-credit",
        "editorial-selection",
        "publication",
        "deployment",
        "production-indexing"
      ].every((gate) => contract.human_gates?.required?.includes(gate)) &&
      contract.human_gates?.named_authority_required === true,
    scenario_coverage:
      scenarioResults.length >= 10 && scenarioResults.every((scenario) => scenario.passed)
  };

  const rubric = Object.fromEntries(
    Object.keys(checks).map((id) => [id, { weight: 0.1, hard: true }])
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
    rfc: 10,
    stage: "proposed",
    candidate_files: candidatePaths,
    candidate_fingerprint: candidateFingerprint(repoRoot),
    score: Number(score.toFixed(2)),
    checks,
    hard_failures: hardFailures,
    scenarios: {
      total: scenarioResults.length,
      passed: scenarioResults.filter((scenario) => scenario.passed).length,
      failed: scenarioResults.filter((scenario) => !scenario.passed).length,
      results: scenarioResults
    },
    implementation_authorized: false,
    publication_authorized: false
  };
}

function main() {
  const evaluation = evaluateMinimumViableFederationRFC();
  process.stdout.write(`${JSON.stringify(evaluation, null, 2)}\n`);
  if (evaluation.hard_failures.length > 0 || evaluation.scenarios.failed > 0) {
    process.exitCode = 1;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
