import assert from "node:assert/strict";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import {
  evaluateGraphLayerRFC,
  loadGraphLayerContract,
  runGraphLayerScenario
} from "./three-layer-knowledge-graph-eval.mjs";

const defaultRepoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../.."
);

const contract = loadGraphLayerContract(defaultRepoRoot);

test("semantic radius cannot cross an evidence hub", () => {
  const result = runGraphLayerScenario(contract, {
    id: "semantic-radius-stops-before-photo-hub",
    operation: "semantic-radius",
    max_degree: 2,
    seed_ids: ["opportunity"],
    nodes: [
      { id: "opportunity", layer: "semantic" },
      { id: "capability", layer: "semantic" },
      { id: "project", layer: "semantic" },
      { id: "photo-index", layer: "evidence" },
      { id: "photo-001", layer: "evidence" },
      { id: "source-vault", layer: "custody" }
    ],
    edges: [
      { source: "opportunity", target: "capability", type: "fits_requirement" },
      { source: "capability", target: "project", type: "demonstrated_by" },
      { source: "project", target: "photo-index", type: "documented_by" },
      { source: "photo-index", target: "photo-001", type: "contains_evidence" },
      { source: "photo-001", target: "source-vault", type: "captured_from" }
    ]
  });

  assert.deepEqual(result.semantic_node_ids, ["capability", "opportunity", "project"]);
  assert.deepEqual(result.evidence_candidate_ids, ["photo-index"]);
  assert.deepEqual(result.custody_materialization_ids, []);
});

test("custody cannot project directly even when disclosure fields are presented", () => {
  const result = runGraphLayerScenario(contract, {
    id: "no-custody-to-public-shortcut",
    operation: "transition",
    from: "custody",
    to: "projection",
    presented: [
      "bounded_request",
      "current_authorization",
      "recipient",
      "rights_decision",
      "consent_decision",
      "credit_review",
      "editorial_approval"
    ]
  });

  assert.deepEqual(result, {
    decision: "deny",
    reason: "transition-not-defined"
  });
});

test("custody capture fails closed without current authorization", () => {
  const result = runGraphLayerScenario(contract, {
    id: "stale-access-is-not-current-authorization",
    operation: "transition",
    from: "custody",
    to: "evidence",
    presented: ["bounded_request", "source_cutoff", "disposition"]
  });

  assert.equal(result.decision, "deny");
  assert.deepEqual(result.missing, ["current_authorization"]);
});

test("bounded authorized custody capture may produce evidence", () => {
  const result = runGraphLayerScenario(contract, {
    id: "bounded-capture-with-receipt",
    operation: "transition",
    from: "custody",
    to: "evidence",
    presented: [
      "bounded_request",
      "current_authorization",
      "source_cutoff",
      "disposition"
    ]
  });

  assert.deepEqual(result, {
    decision: "allow",
    rule_id: "bounded-capture"
  });
});

test("public projection remains human-gated after semantic maturity", () => {
  const result = runGraphLayerScenario(contract, {
    id: "maturity-is-not-publication",
    operation: "transition",
    from: "semantic",
    to: "projection",
    presented: ["recipient", "public_safe_wording", "rights_decision"]
  });

  assert.equal(result.decision, "deny");
  assert.deepEqual(result.missing, [
    "consent_decision",
    "credit_review",
    "editorial_approval"
  ]);
});

test("packet planning preserves each seed and defers unbudgeted evidence hubs", () => {
  const result = runGraphLayerScenario(contract, {
    id: "per-seed-and-union-packets-with-lazy-hub",
    operation: "packet-plan",
    seed_ids: ["portfolio", "job-b", "job-a"],
    evidence_hub: {
      id: "photo-census",
      candidate_artifact_count: 180
    }
  });

  assert.deepEqual(result, {
    packet_families: [
      { id: "per-seed:job-a", seed_ids: ["job-a"] },
      { id: "per-seed:job-b", seed_ids: ["job-b"] },
      { id: "per-seed:portfolio", seed_ids: ["portfolio"] },
      { id: "union", seed_ids: ["job-a", "job-b", "portfolio"] }
    ],
    evidence_expansion: {
      decision: "defer",
      hub_id: "photo-census",
      candidate_artifact_count: 180,
      reason: "explicit-artifact-budget-required"
    },
    reports_per_seed_coverage: true
  });
});

test("the repository RFC candidate satisfies every hard design gate", () => {
  const evaluation = evaluateGraphLayerRFC({ repoRoot: defaultRepoRoot });
  assert.deepEqual(evaluation.hard_failures, []);
  assert.equal(evaluation.scenarios.failed, 0);
});
