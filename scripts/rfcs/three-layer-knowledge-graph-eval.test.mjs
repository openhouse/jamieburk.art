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

test("knowledge-flow audit preserves lenses and distinguishes handoff states", () => {
  const result = runGraphLayerScenario(contract, {
    id: "plural-lenses-survive-the-audit",
    operation: "knowledge-flow-audit",
    lenses: [
      { id: "participant" },
      { id: "facilitator" },
      { id: "specialist" }
    ],
    observations: [
      { id: "obs-1", lens_id: "participant", source_id: "src-1", observed_at: "2026-06-18T10:00:00Z" },
      { id: "obs-2", lens_id: "facilitator", source_id: "src-2", observed_at: "2026-06-18T10:05:00Z" },
      { id: "obs-3", lens_id: "specialist", source_id: "src-3", observed_at: "2026-06-24T14:00:00Z" }
    ],
    handoffs: [
      { id: "handoff-1", observation_ids: ["obs-1"], communicated_at: "2026-06-18T10:10:00Z", received_at: "2026-06-18T10:11:00Z" },
      { id: "handoff-2", observation_ids: ["obs-2"], communicated_at: "2026-06-18T10:12:00Z", received_at: "2026-06-18T10:13:00Z", incorporated_at: "2026-06-18T10:20:00Z" }
    ],
    decisions: [
      { id: "decision-1", decided_at: "2026-06-18T10:15:00Z", considered_observation_ids: ["obs-1"] }
    ],
    operational_questions: [
      { id: "question-1", status: "open" }
    ]
  });

  assert.deepEqual(result, {
    lens_ids: ["facilitator", "participant", "specialist"],
    observation_ids: ["obs-1", "obs-2", "obs-3"],
    handoff_states: [
      { id: "handoff-1", state: "received" },
      { id: "handoff-2", state: "incorporated" }
    ],
    decisions: [
      {
        id: "decision-1",
        considered_observation_ids: ["obs-1"],
        available_unconsidered_observation_ids: ["obs-2"]
      }
    ],
    open_question_ids: ["question-1"]
  });
});

test("scope composition keeps only fields every contributing scope permits", () => {
  const result = runGraphLayerScenario(contract, {
    id: "most-restrictive-boundary-composition",
    operation: "compose-boundaries",
    requested_fields: ["decision", "lens", "private_locator", "source_excerpt"],
    scopes: [
      { id: "team", permitted_fields: ["decision", "lens", "source_excerpt"] },
      { id: "project", permitted_fields: ["decision", "lens"] }
    ]
  });

  assert.deepEqual(result, {
    scope_ids: ["project", "team"],
    allowed_fields: ["decision", "lens"],
    blocked_fields: ["private_locator", "source_excerpt"]
  });
});

test("a participant correction holds projection without rewriting the source", () => {
  const result = runGraphLayerScenario(contract, {
    id: "participant-correction-holds-projection",
    operation: "record-correction",
    target: { id: "observation-1", record_state: "source-preserved" },
    correction: {
      id: "correction-1",
      raised_by_lens_id: "participant",
      status: "proposed",
      effect: "restrict-projection",
      original_preserved: true
    }
  });

  assert.deepEqual(result, {
    decision: "append-correction",
    correction_id: "correction-1",
    target_id: "observation-1",
    correction_status: "proposed",
    original_record_state: "source-preserved",
    original_preserved: true,
    projection_state: "held-pending-correction-review"
  });
});

test("a correction that would replace the source fails closed", () => {
  const result = runGraphLayerScenario(contract, {
    id: "destructive-correction-is-denied",
    operation: "record-correction",
    target: { id: "observation-1", record_state: "source-preserved" },
    correction: {
      id: "correction-1",
      raised_by_lens_id: "participant",
      status: "accepted",
      effect: "append-context",
      original_preserved: false
    }
  });

  assert.deepEqual(result, {
    decision: "deny",
    reason: "original-record-must-be-preserved"
  });
});

test("the repository RFC candidate satisfies every hard design gate", () => {
  const evaluation = evaluateGraphLayerRFC({ repoRoot: defaultRepoRoot });
  assert.deepEqual(evaluation.hard_failures, []);
  assert.equal(evaluation.scenarios.failed, 0);
  assert.equal(evaluation.checks.prototype_boundary, true);
  assert.equal(evaluation.checks.heteroglossic_knowledge_practice, true);
  assert.equal(evaluation.checks.participant_correction, true);
});
