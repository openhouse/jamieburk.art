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

export function runGraphLayerScenario(contract, scenario) {
  if (scenario.operation === "transition") return runTransition(contract, scenario);
  if (scenario.operation === "semantic-radius") return runSemanticRadius(contract, scenario);
  if (scenario.operation === "packet-plan") return runPacketPlan(contract, scenario);
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
    scenario_coverage:
      scenarioResults.length >= 10 && scenarioResults.every((result) => result.passed),
    retrieval_quality:
      isDeepStrictEqual(contract.retrieval?.packet_families, ["per-seed", "union"]) &&
      contract.retrieval?.hub_policy === "lazy-evidence-expansion" &&
      contract.retrieval?.requires_explicit_artifact_budget === true &&
      contract.retrieval?.reports_per_seed_coverage === true
  };

  const rubric = {
    layer_integrity: { weight: 0.2, hard: true },
    semantic_traversal: { weight: 0.2, hard: true },
    source_custody: { weight: 0.2, hard: true },
    publication_authority: { weight: 0.15, hard: true },
    scenario_coverage: { weight: 0.15, hard: true },
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
