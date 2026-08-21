#!/usr/bin/env node

import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptPath = fileURLToPath(import.meta.url);
const repoRoot = path.resolve(path.dirname(scriptPath), "../..");
const defaultContractPath = path.join(
  repoRoot,
  "rfcs/0006-governed-knowledge-graph-federation.contract.json"
);

function sorted(values) {
  return [...values].sort((left, right) => left.localeCompare(right, "en"));
}

function memberKey(member) {
  return `${member.instance_id}:${member.record_id}`;
}

export function loadFederationContract(contractPath = defaultContractPath) {
  return JSON.parse(readFileSync(contractPath, "utf8"));
}

export function auditFederationScenario(
  scenario,
  contract = loadFederationContract()
) {
  const failures = [];
  const instanceById = new Map(
    (scenario.instances ?? []).map((instance) => [instance.id, instance])
  );
  const revisionPattern = new RegExp(contract.snapshot.revision_pattern);
  const digestPattern = new RegExp(contract.snapshot.digest_pattern);
  const allowedDependencies = new Set(
    contract.snapshot.allowed_runtime_dependencies
  );
  const allowedVisibilities = new Set(contract.snapshot.allowed_visibilities);
  const allowedFacets = new Set(contract.identity.allowed_facets);
  const allowedProjectionStatuses = new Set(contract.projection.statuses);
  const requiredGates = contract.projection.required_gates;
  const openCorrectionStatuses = new Set(
    contract.projection.open_correction_statuses
  );

  const schemaVersionSupported =
    scenario.schema_version === contract.schema_version;
  if (!schemaVersionSupported) {
    failures.push(`schema-version-not-supported:${scenario.schema_version}`);
  }

  const rfcStagePreserved = scenario.rfc_stage === contract.stage;
  if (!rfcStagePreserved) {
    failures.push(`rfc-stage-mismatch:${scenario.rfc_stage}`);
  }

  let snapshotsPinned = true;
  let instanceSchemaValid = true;
  let visibilityStatesAligned = true;
  let standaloneRuntime = true;

  for (const instance of scenario.instances ?? []) {
    const instanceLabel = instance.id ?? "unknown-instance";
    for (const field of contract.snapshot.required_instance_fields) {
      if (!Object.hasOwn(instance, field) || instance[field] == null) {
        instanceSchemaValid = false;
        failures.push(`missing-instance-field:${instanceLabel}:${field}`);
      }
    }
    for (const field of ["declared_visibility", "observed_visibility"]) {
      if (!allowedVisibilities.has(instance[field])) {
        instanceSchemaValid = false;
        failures.push(
          `instance-visibility-not-allowed:${instanceLabel}:${field}:${instance[field]}`
        );
      }
    }

    if (!revisionPattern.test(instance.source_revision ?? "")) {
      snapshotsPinned = false;
      failures.push(`snapshot-revision-not-pinned:${instance.id}`);
    }
    if (!digestPattern.test(instance.manifest_digest ?? "")) {
      snapshotsPinned = false;
      failures.push(`snapshot-digest-not-pinned:${instance.id}`);
    }

    if (
      instance.observed_visibility !== "unobserved" &&
      instance.declared_visibility !== instance.observed_visibility
    ) {
      visibilityStatesAligned = false;
      failures.push(
        `visibility-state-mismatch:${instance.id}:${instance.declared_visibility}:${instance.observed_visibility}`
      );
    }

    if (
      instance.standalone !== true ||
      !allowedDependencies.has(instance.runtime_dependency)
    ) {
      standaloneRuntime = false;
      failures.push(
        `runtime-dependency-not-allowed:${instance.id}:${instance.runtime_dependency}`
      );
    }
  }

  let stableIdentityBounded = true;
  let authorityFacetsUnambiguous = true;
  const identities = [];

  for (const identity of scenario.identities ?? []) {
    if (
      identity.claim_policy !== contract.identity.required_claim_policy
    ) {
      stableIdentityBounded = false;
      failures.push(
        `identity-claim-policy-not-independent:${identity.stable_id}`
      );
    }

    const facetAuthorities = {};
    for (const authority of identity.facet_authorities ?? []) {
      if (!allowedFacets.has(authority.facet)) {
        authorityFacetsUnambiguous = false;
        failures.push(
          `unknown-authority-facet:${identity.stable_id}:${authority.facet}`
        );
        continue;
      }
      if (Object.hasOwn(facetAuthorities, authority.facet)) {
        authorityFacetsUnambiguous = false;
        failures.push(
          `duplicate-facet-authority:${identity.stable_id}:${authority.facet}`
        );
        continue;
      }
      if (!instanceById.has(authority.instance_id)) {
        authorityFacetsUnambiguous = false;
        failures.push(
          `unknown-facet-authority-instance:${identity.stable_id}:${authority.instance_id}`
        );
        continue;
      }
      facetAuthorities[authority.facet] = authority.instance_id;
    }

    for (const member of identity.members ?? []) {
      if (!instanceById.has(member.instance_id)) {
        stableIdentityBounded = false;
        failures.push(
          `unknown-identity-instance:${identity.stable_id}:${member.instance_id}`
        );
      }
    }

    identities.push({
      stable_id: identity.stable_id,
      member_keys: sorted((identity.members ?? []).map(memberKey)),
      claim_policy: identity.claim_policy,
      claims_merged: false,
      facet_authorities: Object.fromEntries(
        Object.entries(facetAuthorities).sort(([left], [right]) =>
          left.localeCompare(right, "en")
        )
      )
    });
  }

  let reciprocalReferencesNonAuthoritative = true;
  for (const reference of scenario.references ?? []) {
    if (reference.authority !== contract.identity.reference_authority) {
      reciprocalReferencesNonAuthoritative = false;
      failures.push(
        `reference-authority-not-none:${reference.from_instance_id}:${reference.to_instance_id}`
      );
    }
  }

  const corrections = scenario.corrections ?? [];
  let correctionsPropagated = true;
  let projectionsFailClosed = true;
  let projectionStatesValid = true;
  const projectionDecisions = [];

  for (const projection of scenario.projections ?? []) {
    const reasons = [];
    if (!allowedProjectionStatuses.has(projection.status)) {
      projectionStatesValid = false;
      failures.push(
        `projection-status-not-allowed:${projection.id}:${projection.status}`
      );
    }
    const selectedKeys = new Set(
      (projection.selected_records ?? []).map(memberKey)
    );

    for (const gate of requiredGates) {
      if (projection.gates?.[gate] !== true) {
        reasons.push(`missing-gate:${gate}`);
      }
    }

    for (const selected of projection.selected_records ?? []) {
      const instance = instanceById.get(selected.instance_id);
      if (!instance?.public_release_authorized) {
        reasons.push(
          `source-release-not-authorized:${selected.instance_id}`
        );
      }
      if (instance?.declared_visibility !== "public") {
        reasons.push(
          `source-visibility-not-public:${selected.instance_id}:${instance?.declared_visibility}`
        );
      } else if (instance.observed_visibility !== "public") {
        reasons.push(
          `source-visibility-not-currently-observed:${selected.instance_id}:${instance.observed_visibility}`
        );
      }
    }

    const restrictingCorrections = corrections.filter(
      (correction) =>
        correction.effect === "restrict-projection" &&
        openCorrectionStatuses.has(correction.status) &&
        selectedKeys.has(memberKey(correction.target))
    );
    for (const correction of restrictingCorrections) {
      reasons.push(`open-correction:${correction.id}`);
    }

    const uniqueReasons = sorted(new Set(reasons));
    const eligible = uniqueReasons.length === 0;
    if (projection.status === "active" && !eligible) {
      projectionsFailClosed = false;
      failures.push(
        `projection-active-without-eligibility:${projection.id}`
      );
      for (const correction of restrictingCorrections) {
        correctionsPropagated = false;
        failures.push(
          `open-correction-not-held:${projection.id}:${correction.id}`
        );
      }
    }

    projectionDecisions.push({
      id: projection.id,
      state: projection.status,
      eligible,
      reasons: uniqueReasons
    });
  }

  const serializedScenario = JSON.stringify(scenario);
  const noProtectedLocators = contract.public_safety.forbidden_patterns.every(
    (pattern) => !new RegExp(pattern, "i").test(serializedScenario)
  );
  if (!noProtectedLocators) {
    failures.push("protected-locator-detected");
  }

  const checks = {
    authority_facets_unambiguous: authorityFacetsUnambiguous,
    corrections_propagated: correctionsPropagated,
    instance_schema_valid: instanceSchemaValid,
    no_protected_locators: noProtectedLocators,
    projection_states_valid: projectionStatesValid,
    projections_fail_closed: projectionsFailClosed,
    reciprocal_references_non_authoritative:
      reciprocalReferencesNonAuthoritative,
    rfc_stage_preserved: rfcStagePreserved,
    schema_version_supported: schemaVersionSupported,
    snapshots_pinned: snapshotsPinned,
    stable_identity_bounded: stableIdentityBounded,
    standalone_runtime: standaloneRuntime,
    visibility_states_aligned: visibilityStatesAligned
  };

  const orderedFailures = sorted(new Set(failures));
  return {
    accepted: Object.values(checks).every(Boolean),
    checks,
    identities: identities.sort((left, right) =>
      left.stable_id.localeCompare(right.stable_id, "en")
    ),
    projection_decisions: projectionDecisions.sort((left, right) =>
      left.id.localeCompare(right.id, "en")
    ),
    failures: orderedFailures
  };
}

function inputPathFromArgs(argv) {
  const index = argv.indexOf("--input");
  return index >= 0 ? argv[index + 1] : null;
}

function main() {
  const inputPath = inputPathFromArgs(process.argv.slice(2));
  if (!inputPath) {
    console.error("Usage: federation-convergence.mjs --input <scenario.json>");
    process.exitCode = 2;
    return;
  }

  const scenario = JSON.parse(readFileSync(path.resolve(inputPath), "utf8"));
  const result = auditFederationScenario(scenario);
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
  if (!result.accepted) process.exitCode = 1;
}

if (process.argv[1] === scriptPath) {
  main();
}
