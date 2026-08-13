import assert from "node:assert/strict";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const scriptPath = path.join(
  repoRoot,
  "scripts/knowledge-wiki/federation-convergence.mjs"
);

function baselineScenario() {
  return {
    schema_version: 1,
    rfc_stage: "exploring",
    instances: [
      {
        id: "portfolio",
        registry: "portfolio.example",
        source_revision: "1".repeat(40),
        manifest_digest: "a".repeat(64),
        declared_visibility: "public",
        observed_visibility: "public",
        public_release_authorized: true,
        runtime_dependency: "local",
        standalone: true
      },
      {
        id: "source-edition",
        registry: "source-edition.example",
        source_revision: "2".repeat(40),
        manifest_digest: "b".repeat(64),
        declared_visibility: "private",
        observed_visibility: "private",
        public_release_authorized: false,
        runtime_dependency: "checked-in-snapshot",
        standalone: true
      }
    ],
    identities: [
      {
        stable_id: "project.example",
        claim_policy: "independent",
        members: [
          { instance_id: "portfolio", record_id: "project.example" },
          {
            instance_id: "source-edition",
            record_id: "record.project.example"
          }
        ],
        facet_authorities: [
          {
            facet: "semantic-interpretation",
            instance_id: "portfolio"
          },
          { facet: "source-body", instance_id: "source-edition" },
          { facet: "portfolio-projection", instance_id: "portfolio" }
        ]
      }
    ],
    references: [
      {
        from_instance_id: "portfolio",
        to_instance_id: "source-edition",
        relationship: "references",
        authority: "none"
      },
      {
        from_instance_id: "source-edition",
        to_instance_id: "portfolio",
        relationship: "references",
        authority: "none"
      }
    ],
    corrections: [],
    projections: [
      {
        id: "projection-1",
        status: "hold",
        selected_records: [
          {
            instance_id: "source-edition",
            record_id: "record.project.example"
          }
        ],
        gates: {
          consent_decision: false,
          credit_review: true,
          editorial_approval: false,
          public_safe_wording: true,
          rights_decision: false
        }
      }
    ]
  };
}

function runScenario(scenario) {
  const tempRoot = mkdtempSync(path.join(os.tmpdir(), "jbart-federation-test-"));
  const inputPath = path.join(tempRoot, "scenario.json");
  writeFileSync(inputPath, JSON.stringify(scenario));

  try {
    const result = spawnSync(
      process.execPath,
      [scriptPath, "--input", inputPath],
      {
        cwd: repoRoot,
        encoding: "utf8"
      }
    );

    assert.ok(
      result.stdout.trim(),
      `federation audit emitted no JSON; stderr: ${result.stderr}`
    );

    return {
      status: result.status,
      stderr: result.stderr,
      value: JSON.parse(result.stdout)
    };
  } finally {
    rmSync(tempRoot, { recursive: true, force: true });
  }
}

function authorizeSourceEdition(scenario) {
  const source = scenario.instances.find(
    (instance) => instance.id === "source-edition"
  );
  source.declared_visibility = "public";
  source.observed_visibility = "public";
  source.public_release_authorized = true;
  scenario.projections[0].status = "active";
  for (const gate of Object.keys(scenario.projections[0].gates)) {
    scenario.projections[0].gates[gate] = true;
  }
}

test("a held cross-repository reference stays safe without becoming a merged claim", () => {
  const result = runScenario(baselineScenario());

  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.value.accepted, true);
  assert.deepEqual(result.value.failures, []);
  assert.deepEqual(result.value.checks, {
    authority_facets_unambiguous: true,
    corrections_propagated: true,
    instance_schema_valid: true,
    no_protected_locators: true,
    projection_states_valid: true,
    projections_fail_closed: true,
    reciprocal_references_non_authoritative: true,
    rfc_stage_preserved: true,
    schema_version_supported: true,
    snapshots_pinned: true,
    stable_identity_bounded: true,
    standalone_runtime: true,
    visibility_states_aligned: true
  });
  assert.deepEqual(result.value.identities, [
    {
      stable_id: "project.example",
      member_keys: [
        "portfolio:project.example",
        "source-edition:record.project.example"
      ],
      claim_policy: "independent",
      claims_merged: false,
      facet_authorities: {
        "portfolio-projection": "portfolio",
        "semantic-interpretation": "portfolio",
        "source-body": "source-edition"
      }
    }
  ]);
  assert.deepEqual(result.value.projection_decisions, [
    {
      id: "projection-1",
      state: "hold",
      eligible: false,
      reasons: [
        "missing-gate:consent_decision",
        "missing-gate:editorial_approval",
        "missing-gate:rights_decision",
        "source-release-not-authorized:source-edition",
        "source-visibility-not-public:source-edition:private"
      ]
    }
  ]);
});

test("an exact public snapshot with every human gate may remain active", () => {
  const scenario = baselineScenario();
  authorizeSourceEdition(scenario);

  const result = runScenario(scenario);

  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.value.accepted, true);
  assert.deepEqual(result.value.projection_decisions, [
    {
      id: "projection-1",
      state: "active",
      eligible: true,
      reasons: []
    }
  ]);
});

test("an active projection cannot inherit release authority from a reference", () => {
  const scenario = baselineScenario();
  scenario.projections[0].status = "active";
  for (const gate of Object.keys(scenario.projections[0].gates)) {
    scenario.projections[0].gates[gate] = true;
  }

  const result = runScenario(scenario);

  assert.equal(result.status, 1);
  assert.equal(result.value.checks.projections_fail_closed, false);
  assert.ok(
    result.value.failures.includes(
      "projection-active-without-eligibility:projection-1"
    )
  );
});

test("a private source cannot become public through an approval flag", () => {
  const scenario = baselineScenario();
  scenario.instances[1].public_release_authorized = true;
  scenario.projections[0].status = "active";
  for (const gate of Object.keys(scenario.projections[0].gates)) {
    scenario.projections[0].gates[gate] = true;
  }

  const result = runScenario(scenario);

  assert.equal(result.status, 1);
  assert.deepEqual(result.value.projection_decisions[0].reasons, [
    "source-visibility-not-public:source-edition:private"
  ]);
});

test("an unobserved source state cannot support an active projection", () => {
  const scenario = baselineScenario();
  scenario.instances[1].declared_visibility = "public";
  scenario.instances[1].observed_visibility = "unobserved";
  scenario.instances[1].public_release_authorized = true;
  scenario.projections[0].status = "active";
  for (const gate of Object.keys(scenario.projections[0].gates)) {
    scenario.projections[0].gates[gate] = true;
  }

  const result = runScenario(scenario);

  assert.equal(result.status, 1);
  assert.deepEqual(result.value.projection_decisions[0].reasons, [
    "source-visibility-not-currently-observed:source-edition:unobserved"
  ]);
});

test("observed repository visibility cannot drift from its declared state", () => {
  const scenario = baselineScenario();
  scenario.instances[1].observed_visibility = "public";

  const result = runScenario(scenario);

  assert.equal(result.status, 1);
  assert.equal(result.value.checks.visibility_states_aligned, false);
  assert.ok(
    result.value.failures.includes(
      "visibility-state-mismatch:source-edition:private:public"
    )
  );
});

test("a public build cannot gain a live private repository dependency", () => {
  const scenario = baselineScenario();
  scenario.instances[1].runtime_dependency = "private-live";

  const result = runScenario(scenario);

  assert.equal(result.status, 1);
  assert.equal(result.value.checks.standalone_runtime, false);
  assert.ok(
    result.value.failures.includes(
      "runtime-dependency-not-allowed:source-edition:private-live"
    )
  );
});

test("a stable identity cannot silently merge repository claims", () => {
  const scenario = baselineScenario();
  scenario.identities[0].claim_policy = "merge";

  const result = runScenario(scenario);

  assert.equal(result.status, 1);
  assert.equal(result.value.checks.stable_identity_bounded, false);
  assert.ok(
    result.value.failures.includes(
      "identity-claim-policy-not-independent:project.example"
    )
  );
});

test("reciprocal references cannot acquire canonical authority", () => {
  const scenario = baselineScenario();
  scenario.references[1].authority = "canonical";

  const result = runScenario(scenario);

  assert.equal(result.status, 1);
  assert.equal(
    result.value.checks.reciprocal_references_non_authoritative,
    false
  );
  assert.ok(
    result.value.failures.includes(
      "reference-authority-not-none:source-edition:portfolio"
    )
  );
});

test("one identity facet cannot have two canonical authorities", () => {
  const scenario = baselineScenario();
  scenario.identities[0].facet_authorities.push({
    facet: "source-body",
    instance_id: "portfolio"
  });

  const result = runScenario(scenario);

  assert.equal(result.status, 1);
  assert.equal(result.value.checks.authority_facets_unambiguous, false);
  assert.ok(
    result.value.failures.includes(
      "duplicate-facet-authority:project.example:source-body"
    )
  );
});

test("an unresolved participant correction holds a dependent projection", () => {
  const scenario = baselineScenario();
  authorizeSourceEdition(scenario);
  scenario.corrections.push({
    id: "correction-1",
    target: {
      instance_id: "source-edition",
      record_id: "record.project.example"
    },
    status: "proposed",
    effect: "restrict-projection"
  });

  const result = runScenario(scenario);

  assert.equal(result.status, 1);
  assert.equal(result.value.checks.corrections_propagated, false);
  assert.deepEqual(result.value.projection_decisions[0].reasons, [
    "open-correction:correction-1"
  ]);
});

test("every external snapshot needs an exact revision and manifest digest", () => {
  const scenario = baselineScenario();
  scenario.instances[1].source_revision = "main";
  scenario.instances[1].manifest_digest = "latest";

  const result = runScenario(scenario);

  assert.equal(result.status, 1);
  assert.equal(result.value.checks.snapshots_pinned, false);
  assert.ok(
    result.value.failures.includes(
      "snapshot-revision-not-pinned:source-edition"
    )
  );
  assert.ok(
    result.value.failures.includes(
      "snapshot-digest-not-pinned:source-edition"
    )
  );
});

test("an instance receipt must include every required contract field", () => {
  const scenario = baselineScenario();
  delete scenario.instances[1].registry;

  const result = runScenario(scenario);

  assert.equal(result.status, 1);
  assert.equal(result.value.checks.instance_schema_valid, false);
  assert.ok(
    result.value.failures.includes(
      "missing-instance-field:source-edition:registry"
    )
  );
});

test("a projection cannot introduce an undeclared workflow state", () => {
  const scenario = baselineScenario();
  scenario.projections[0].status = "published";

  const result = runScenario(scenario);

  assert.equal(result.status, 1);
  assert.equal(result.value.checks.projection_states_valid, false);
  assert.ok(
    result.value.failures.includes(
      "projection-status-not-allowed:projection-1:published"
    )
  );
});

test("a federation manifest cannot disclose a protected locator", () => {
  const scenario = baselineScenario();
  scenario.notes = "/Users/example/protected/archive";

  const result = runScenario(scenario);

  assert.equal(result.status, 1);
  assert.equal(result.value.checks.no_protected_locators, false);
  assert.ok(result.value.failures.includes("protected-locator-detected"));
});

test("the prototype cannot advance its own RFC stage", () => {
  const scenario = baselineScenario();
  scenario.rfc_stage = "accepted";

  const result = runScenario(scenario);

  assert.equal(result.status, 1);
  assert.equal(result.value.checks.rfc_stage_preserved, false);
  assert.ok(result.value.failures.includes("rfc-stage-mismatch:accepted"));
});
