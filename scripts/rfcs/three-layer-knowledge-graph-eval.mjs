#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { isDeepStrictEqual } from "node:util";
import { fileURLToPath, pathToFileURL } from "node:url";

const scriptPath = fileURLToPath(import.meta.url);
const scriptDirectory = path.dirname(scriptPath);
const defaultRoot = path.resolve(scriptDirectory, "../..");

const contractPath = "rfcs/0005-three-layer-knowledge-graph.contract.json";
const rfcPath = "rfcs/0005-three-layer-knowledge-graph.md";
const suitePath = "evals/knowledge-bank/graph-layers-rfc-evals.json";

function readJson(repoRoot, relativePath) {
  return JSON.parse(readFileSync(path.join(repoRoot, relativePath), "utf8"));
}

function sortedUnique(values) {
  return [...new Set(values)].sort((left, right) => left.localeCompare(right, "en"));
}

export function loadGraphLayerContract(repoRoot = defaultRoot) {
  return readJson(repoRoot, contractPath);
}

export function loadGraphLayerEvalSuite(repoRoot = defaultRoot) {
  return readJson(repoRoot, suitePath);
}

function runTransition(contract, scenario) {
  const rule = contract.transitions.find(
    (candidate) => candidate.from === scenario.from && candidate.to === scenario.to
  );

  if (!rule) {
    return { decision: "deny", reason: "transition-not-defined" };
  }

  const presented = new Set(scenario.presented ?? []);
  const missing = rule.requires.filter((requirement) => !presented.has(requirement));

  if (missing.length > 0) {
    return { decision: "deny", rule_id: rule.id, missing };
  }

  return { decision: "allow", rule_id: rule.id };
}

function runSemanticRadius(contract, scenario) {
  const nodes = new Map(scenario.nodes.map((node) => [node.id, node]));
  const semanticEdgeTypes = new Set(contract.traversal.semantic_edge_types);
  const evidenceBoundaryTypes = new Set(contract.traversal.evidence_boundary_edge_types);
  const distance = new Map();
  const queue = [];

  for (const seedId of scenario.seed_ids) {
    const seed = nodes.get(seedId);
    if (!seed || seed.layer !== "semantic") {
      throw new Error(`semantic-radius seed must resolve to a semantic node: ${seedId}`);
    }
    distance.set(seedId, 0);
    queue.push(seedId);
  }

  while (queue.length > 0) {
    const current = queue.shift();
    const currentDistance = distance.get(current);
    if (currentDistance >= scenario.max_degree) continue;

    for (const edge of scenario.edges) {
      let next = null;
      if (edge.source === current) next = edge.target;
      else if (edge.target === current) next = edge.source;
      if (!next || distance.has(next)) continue;

      const currentNode = nodes.get(current);
      const nextNode = nodes.get(next);
      if (
        currentNode?.layer !== "semantic" ||
        nextNode?.layer !== "semantic" ||
        !semanticEdgeTypes.has(edge.type)
      ) {
        continue;
      }

      distance.set(next, currentDistance + 1);
      queue.push(next);
    }
  }

  const semanticNodeIds = sortedUnique(distance.keys());
  const semanticSet = new Set(semanticNodeIds);
  const evidenceCandidateIds = [];

  for (const edge of scenario.edges) {
    const source = nodes.get(edge.source);
    const target = nodes.get(edge.target);
    if (!evidenceBoundaryTypes.has(edge.type)) continue;
    if (semanticSet.has(edge.source) && target?.layer === "evidence") {
      evidenceCandidateIds.push(edge.target);
    }
    if (semanticSet.has(edge.target) && source?.layer === "evidence") {
      evidenceCandidateIds.push(edge.source);
    }
  }

  return {
    semantic_node_ids: semanticNodeIds,
    evidence_candidate_ids: sortedUnique(evidenceCandidateIds),
    custody_materialization_ids: []
  };
}

function runPacketPlan(contract, scenario) {
  const seeds = sortedUnique(scenario.seed_ids ?? []);
  const packetFamilies = [];

  if (contract.retrieval?.packet_families?.includes("per-seed")) {
    packetFamilies.push(
      ...seeds.map((seedId) => ({ id: `per-seed:${seedId}`, seed_ids: [seedId] }))
    );
  }
  if (contract.retrieval?.packet_families?.includes("union")) {
    packetFamilies.push({ id: "union", seed_ids: seeds });
  }

  const hub = scenario.evidence_hub;
  let evidenceExpansion = null;
  if (hub) {
    if (
      contract.retrieval?.requires_explicit_artifact_budget === true &&
      !Number.isInteger(hub.artifact_budget)
    ) {
      evidenceExpansion = {
        decision: "defer",
        hub_id: hub.id,
        candidate_artifact_count: hub.candidate_artifact_count,
        reason: "explicit-artifact-budget-required"
      };
    } else {
      evidenceExpansion = {
        decision: "allow",
        hub_id: hub.id,
        candidate_artifact_count: hub.candidate_artifact_count,
        artifact_budget: hub.artifact_budget
      };
    }
  }

  return {
    packet_families: packetFamilies,
    evidence_expansion: evidenceExpansion,
    reports_per_seed_coverage: contract.retrieval?.reports_per_seed_coverage === true
  };
}

function runKnowledgeFlowAudit(scenario) {
  const observations = [...(scenario.observations ?? [])].sort((left, right) =>
    left.id.localeCompare(right.id, "en")
  );
  const observationById = new Map(observations.map((item) => [item.id, item]));
  const handoffs = [...(scenario.handoffs ?? [])].sort((left, right) =>
    left.id.localeCompare(right.id, "en")
  );

  const availableAt = (observationId, cutoff) => {
    const observation = observationById.get(observationId);
    if (!observation || observation.observed_at > cutoff) return false;
    return handoffs.some(
      (handoff) =>
        (handoff.observation_ids ?? []).includes(observationId) &&
        handoff.received_at &&
        handoff.received_at <= cutoff
    );
  };

  return {
    lens_ids: sortedUnique((scenario.lenses ?? []).map((item) => item.id)),
    observation_ids: observations.map((item) => item.id),
    handoff_states: handoffs.map((handoff) => ({
      id: handoff.id,
      state: handoff.incorporated_at
        ? "incorporated"
        : handoff.received_at
          ? "received"
          : handoff.communicated_at
            ? "communicated"
            : "proposed"
    })),
    decisions: [...(scenario.decisions ?? [])]
      .sort((left, right) => left.id.localeCompare(right.id, "en"))
      .map((decision) => {
        const considered = sortedUnique(decision.considered_observation_ids ?? []);
        const consideredSet = new Set(considered);
        return {
          id: decision.id,
          considered_observation_ids: considered,
          available_unconsidered_observation_ids: observations
            .map((item) => item.id)
            .filter(
              (observationId) =>
                !consideredSet.has(observationId) &&
                availableAt(observationId, decision.decided_at)
            )
        };
      }),
    open_question_ids: sortedUnique(
      (scenario.operational_questions ?? [])
        .filter((item) => item.status === "open")
        .map((item) => item.id)
    )
  };
}

function runBoundaryComposition(scenario) {
  const requested = sortedUnique(scenario.requested_fields ?? []);
  const scopes = [...(scenario.scopes ?? [])].sort((left, right) =>
    left.id.localeCompare(right.id, "en")
  );
  const allowed = requested.filter((field) =>
    scopes.every((scope) => (scope.permitted_fields ?? []).includes(field))
  );
  const allowedSet = new Set(allowed);

  return {
    scope_ids: scopes.map((scope) => scope.id),
    allowed_fields: allowed,
    blocked_fields: requested.filter((field) => !allowedSet.has(field))
  };
}

function runCorrectionReview(contract, scenario) {
  const correction = scenario.correction ?? {};
  const target = scenario.target ?? {};
  const practice = contract.knowledge_practice ?? {};

  if (correction.original_preserved !== true) {
    return { decision: "deny", reason: "original-record-must-be-preserved" };
  }
  if (!target.id || !correction.id || !correction.raised_by_lens_id) {
    return { decision: "deny", reason: "correction-identity-incomplete" };
  }
  if (!(practice.correction_statuses ?? []).includes(correction.status)) {
    return { decision: "deny", reason: "correction-status-not-recognized" };
  }
  if (!(practice.correction_effects ?? []).includes(correction.effect)) {
    return { decision: "deny", reason: "correction-effect-not-recognized" };
  }

  const unresolved = ["proposed", "acknowledged", "disputed", "held"].includes(
    correction.status
  );
  const projectionState =
    correction.effect === "restrict-projection"
      ? unresolved
        ? "held-pending-correction-review"
        : correction.status === "accepted"
          ? "restricted"
          : "unchanged-after-review"
      : "review-required";

  return {
    decision: "append-correction",
    correction_id: correction.id,
    target_id: target.id,
    correction_status: correction.status,
    original_record_state: target.record_state,
    original_preserved: true,
    projection_state: projectionState
  };
}

export function runGraphLayerScenario(contract, scenario) {
  if (scenario.operation === "transition") return runTransition(contract, scenario);
  if (scenario.operation === "semantic-radius") return runSemanticRadius(contract, scenario);
  if (scenario.operation === "packet-plan") return runPacketPlan(contract, scenario);
  if (scenario.operation === "knowledge-flow-audit") return runKnowledgeFlowAudit(scenario);
  if (scenario.operation === "compose-boundaries") return runBoundaryComposition(scenario);
  if (scenario.operation === "record-correction") return runCorrectionReview(contract, scenario);
  throw new Error(`unknown graph-layer RFC eval operation: ${scenario.operation}`);
}

function candidateFingerprint(repoRoot) {
  const digest = createHash("sha256");
  for (const relativePath of [rfcPath, contractPath, suitePath, path.relative(repoRoot, scriptPath)]) {
    digest.update(relativePath);
    digest.update("\0");
    digest.update(readFileSync(path.join(repoRoot, relativePath)));
    digest.update("\0");
  }
  return digest.digest("hex");
}

export function evaluateGraphLayerRFC(options = {}) {
  const repoRoot = options.repoRoot ?? defaultRoot;
  const contract = options.contract ?? loadGraphLayerContract(repoRoot);
  const suite = options.suite ?? loadGraphLayerEvalSuite(repoRoot);
  const rfc = options.rfcSource ?? readFileSync(path.join(repoRoot, rfcPath), "utf8");

  const scenarioResults = suite.cases.map((scenario) => {
    const actual = runGraphLayerScenario(contract, scenario);
    return {
      id: scenario.id,
      passed: isDeepStrictEqual(actual, scenario.expected),
      actual,
      expected: scenario.expected
    };
  });

  const layerNames = Object.keys(contract.layers ?? {}).sort();
  const transitionPairs = new Set(
    (contract.transitions ?? []).map((transition) => `${transition.from}->${transition.to}`)
  );
  const projectionRule = contract.transitions?.find(
    (transition) => transition.from === "semantic" && transition.to === "projection"
  );
  const custodyCaptureRule = contract.transitions?.find(
    (transition) => transition.from === "custody" && transition.to === "evidence"
  );
  const knowledgePractice = contract.knowledge_practice;

  const checks = {
    layer_integrity:
      isDeepStrictEqual(layerNames, ["custody", "evidence", "semantic"]) &&
      contract.layers.custody?.instance_location === "outside-public-git" &&
      contract.layers.semantic?.stores_private_locators === false &&
      contract.layers.evidence?.stores_private_locators === false,
    semantic_traversal:
      contract.traversal?.degree_domain === "semantic" &&
      contract.traversal?.evidence_expansion === "attachment-phase" &&
      contract.traversal?.custody_materialization === "source-specific-adapter" &&
      contract.traversal?.default_cross_layer === "deny",
    source_custody:
      !transitionPairs.has("custody->projection") &&
      custodyCaptureRule?.requires?.includes("current_authorization") &&
      custodyCaptureRule?.requires?.includes("bounded_request") &&
      contract.layers.custody?.credentials_allowed === false,
    publication_authority:
      contract.authority?.decision_owner === "Jamie Burkart" &&
      contract.authority?.implementation_authorized === false &&
      contract.authority?.stage_advancement === "human-only" &&
      [
        "recipient",
        "public_safe_wording",
        "rights_decision",
        "consent_decision",
        "credit_review",
        "editorial_approval"
      ].every((gate) => projectionRule?.requires?.includes(gate)) &&
      /^stage:\s+exploring$/m.test(rfc) &&
      /^implementation:\s+null$/m.test(rfc),
    prototype_boundary:
      contract.evaluation_prototype?.policy === "config/knowledge-wiki/graph-layers.json" &&
      contract.evaluation_prototype?.runtime === "scripts/knowledge-wiki/layers.mjs" &&
      contract.evaluation_prototype?.cli === "scripts/knowledge-wiki/layered-graph.mjs" &&
      contract.evaluation_prototype?.source_adapter_execution === false &&
      contract.evaluation_prototype?.public_projection === false,
    heteroglossic_knowledge_practice:
      knowledgePractice?.synthesis_mode === "ensemble-without-forced-consensus" &&
      ["lens_id", "source_id", "observed_at"].every((field) =>
        knowledgePractice?.observation_requires?.includes(field)
      ) &&
      ["proposed", "communicated", "received", "incorporated", "acted"].every(
        (state) => knowledgePractice?.handoff_states?.includes(state)
      ) &&
      knowledgePractice?.counterfactuals_remain_questions === true &&
      knowledgePractice?.boundary_composition === "intersection-most-restrictive" &&
      knowledgePractice?.simulated_voice_requires_human_confirmation === true,
    participant_correction:
      ["target_id", "raised_by_lens_id", "status", "effect", "original_preserved"].every(
        (field) => knowledgePractice?.correction_requires?.includes(field)
      ) &&
      ["proposed", "acknowledged", "accepted", "disputed", "declined", "withdrawn", "held"].every(
        (state) => knowledgePractice?.correction_statuses?.includes(state)
      ) &&
      knowledgePractice?.correction_preserves_original === true &&
      knowledgePractice?.unresolved_restriction_policy === "hold-projection",
    scenario_coverage:
      scenarioResults.length >= 10 && scenarioResults.every((result) => result.passed),
    retrieval_quality:
      isDeepStrictEqual(contract.retrieval?.packet_families, ["per-seed", "union"]) &&
      contract.retrieval?.hub_policy === "lazy-evidence-expansion" &&
      contract.retrieval?.requires_explicit_artifact_budget === true &&
      contract.retrieval?.reports_per_seed_coverage === true
  };

  const rubric = {
    layer_integrity: { weight: 0.15, hard: true },
    semantic_traversal: { weight: 0.15, hard: true },
    source_custody: { weight: 0.15, hard: true },
    publication_authority: { weight: 0.1, hard: true },
    prototype_boundary: { weight: 0.05, hard: true },
    heteroglossic_knowledge_practice: { weight: 0.1, hard: true },
    participant_correction: { weight: 0.1, hard: true },
    scenario_coverage: { weight: 0.1, hard: true },
    retrieval_quality: { weight: 0.1, hard: false }
  };

  const score = Object.entries(rubric).reduce(
    (total, [id, criterion]) => total + (checks[id] ? criterion.weight : 0),
    0
  );
  const hardFailures = Object.entries(rubric)
    .filter(([id, criterion]) => criterion.hard && !checks[id])
    .map(([id]) => id);
  const failing = Object.keys(checks).filter((id) => !checks[id]);

  return {
    schema_version: 1,
    rfc: 5,
    stage: "exploring",
    candidate_fingerprint: candidateFingerprint(repoRoot),
    rubric_sha256: createHash("sha256").update(JSON.stringify(rubric)).digest("hex"),
    score: Number(score.toFixed(2)),
    checks,
    hard_failures: hardFailures,
    lowest_scoring_criteria: failing,
    scenarios: {
      total: scenarioResults.length,
      passed: scenarioResults.filter((result) => result.passed).length,
      failed: scenarioResults.filter((result) => !result.passed).length,
      results: scenarioResults
    },
    implementation_authorized: false
  };
}

function main() {
  const evaluation = evaluateGraphLayerRFC();
  process.stdout.write(`${JSON.stringify(evaluation, null, 2)}\n`);
  if (evaluation.hard_failures.length > 0 || evaluation.scenarios.failed > 0) {
    process.exitCode = 1;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
