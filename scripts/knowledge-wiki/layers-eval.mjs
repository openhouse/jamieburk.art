#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

import { compileWiki, defaultRepoRoot } from "./lib.mjs";
import {
  buildLayeredKnowledgeGraph,
  evaluateProjectionEligibility,
  loadLayerPolicy,
  planCustodyRequests,
  planLayeredPacketFamilies,
  traverseSemanticRadius
} from "./layers.mjs";

const suiteRelativePath = "evals/knowledge-wiki/graph-layers-implementation.json";
const candidatePaths = [
  "config/knowledge-wiki/graph-layers.json",
  suiteRelativePath,
  "rfcs/0005-three-layer-knowledge-graph.contract.json",
  "rfcs/0005-three-layer-knowledge-graph.md",
  "scripts/knowledge-wiki/layered-graph.mjs",
  "scripts/knowledge-wiki/layers-eval.mjs",
  "scripts/knowledge-wiki/layers.mjs"
];

function compareText(left, right) {
  return left < right ? -1 : left > right ? 1 : 0;
}

function fingerprint(repoRoot) {
  const digest = createHash("sha256");
  for (const relativePath of [...candidatePaths].sort(compareText)) {
    digest.update(relativePath);
    digest.update("\0");
    digest.update(readFileSync(path.join(repoRoot, relativePath)));
    digest.update("\0");
  }
  return digest.digest("hex");
}

function unique(values) {
  return [...new Set(values)].sort(compareText);
}

export function evaluateLayerImplementation(options = {}) {
  const repoRoot = options.repoRoot ?? defaultRepoRoot;
  const suite = options.suite ?? JSON.parse(
    readFileSync(path.join(repoRoot, suiteRelativePath), "utf8")
  );
  const wiki = options.wiki ?? compileWiki({ repoRoot });
  const policy = options.policy ?? loadLayerPolicy(repoRoot);
  const layered = buildLayeredKnowledgeGraph(wiki, policy);
  const semanticIds = new Set(layered.layers.semantic.nodes.map((item) => item.id));
  const evidenceIds = new Set(layered.layers.evidence.nodes.map((item) => item.id));
  const projectionIds = new Set(layered.projections.nodes.map((item) => item.id));
  const allLayerIds = [
    ...semanticIds,
    ...evidenceIds,
    ...projectionIds
  ];
  const unresolved = suite.seedIds.filter((id) => !semanticIds.has(id));
  const traversals = suite.seedIds
    .filter((id) => semanticIds.has(id))
    .map((seedId) => traverseSemanticRadius(layered, {
      seedIds: [seedId],
      maxDegree: suite.maxDegree
    }));
  const plan = unresolved.length === 0
    ? planLayeredPacketFamilies(layered, {
      seedIds: suite.seedIds,
      maxDegree: suite.maxDegree
    })
    : null;
  const unionTraversal = unresolved.length === 0
    ? traverseSemanticRadius(layered, {
      seedIds: suite.seedIds,
      maxDegree: suite.maxDegree
    })
    : null;
  const firstEvidenceId = unionTraversal
    ? unique(unionTraversal.evidenceCandidates.map((item) => item.evidenceId))[0]
    : null;
  let custody = { state: "blocked", requests: [] };
  if (firstEvidenceId) {
    const selectedPlan = planLayeredPacketFamilies(layered, {
      seedIds: suite.seedIds,
      maxDegree: suite.maxDegree,
      artifactBudget: 1,
      selectedEvidenceIds: [firstEvidenceId]
    });
    custody = planCustodyRequests(selectedPlan, {
      bindings: {
        [firstEvidenceId]: {
          adapter: "local-file",
          disposition: "protected-pointer",
          sourceCutoff: "fixture-cutoff",
          boundedRequestId: "fixture-request",
          authorization: { state: "stale", receiptId: "must-not-escape" }
        }
      }
    });
  }
  const projection = evaluateProjectionEligibility({
    recipient: "fixture-recipient",
    purpose: "implementation evaluation",
    semanticSelection: suite.seedIds,
    evidenceSelection: firstEvidenceId ? [firstEvidenceId] : [],
    gates: { publicSafeWording: "approved", rights: "approved" }
  });
  const expectedFamilyIds = [
    ...suite.seedIds.map((id) => `per-seed:${id}`),
    "union"
  ].sort(compareText);
  const actualFamilyIds = (plan?.packetFamilies ?? []).map((family) => family.id).sort(compareText);
  const deferredEvidenceIdCount = plan?.evidenceExpansion.candidateEvidenceIds?.length ?? 0;
  const packetsExposeCandidateArrays = (plan?.packetFamilies ?? []).some((family) =>
    family.packets.some((packet) => Array.isArray(packet.evidenceCandidates))
  );

  const checks = {
    layer_partition_integrity:
      allLayerIds.length === wiki.graph.nodes.length &&
      new Set(allLayerIds).size === wiki.graph.nodes.length &&
      layered.layers.custody.materialized === false,
    semantic_traversal_isolation:
      traversals.every((traversal) =>
        traversal.semanticNodeIds.every((id) => semanticIds.has(id)) &&
        traversal.evidenceCandidates.every((item) => evidenceIds.has(item.evidenceId))
      ),
    custody_fails_closed:
      custody.state === "blocked" &&
      custody.requests.every((request) => request.state !== "ready") &&
      !JSON.stringify(custody).includes("must-not-escape"),
    publication_authority:
      projection.state === "hold" &&
      projection.publicationAuthorized === false &&
      projection.missingGates.length === 3,
    packet_family_contract:
      unresolved.length === 0 &&
      JSON.stringify(actualFamilyIds) === JSON.stringify(expectedFamilyIds) &&
      plan.perSeedCoverage.length === suite.seedIds.length &&
      plan.evidenceExpansion.decision === "defer",
    policy_coverage:
      JSON.stringify(layered.classification.overrides.map((item) => item.id)) ===
        JSON.stringify(suite.requiredEvidenceOverrides) &&
      policy.custody.credentialsAllowed === false &&
      policy.custody.requiresCurrentAuthorization === true,
    deferred_hub_is_bounded:
      deferredEvidenceIdCount <= suite.limits.deferredEvidenceIdsEnumerated &&
      !packetsExposeCandidateArrays
  };
  const rubric = {
    layer_partition_integrity: { weight: 0.15, hard: true },
    semantic_traversal_isolation: { weight: 0.15, hard: true },
    custody_fails_closed: { weight: 0.15, hard: true },
    publication_authority: { weight: 0.15, hard: true },
    packet_family_contract: { weight: 0.15, hard: true },
    policy_coverage: { weight: 0.15, hard: true },
    deferred_hub_is_bounded: { weight: 0.1, hard: false }
  };
  const score = Object.entries(rubric).reduce(
    (total, [id, criterion]) => total + (checks[id] ? criterion.weight : 0),
    0
  );
  const hardFailures = Object.entries(rubric)
    .filter(([id, criterion]) => criterion.hard && !checks[id])
    .map(([id]) => id);

  return {
    schemaVersion: 1,
    rfc: 5,
    stage: "exploring",
    prototypeUnderEvaluation: true,
    candidateFingerprint: fingerprint(repoRoot),
    score: Number(score.toFixed(2)),
    checks,
    hardFailures,
    lowestScoringCriteria: Object.keys(checks).filter((id) => !checks[id]),
    seedResults: {
      requested: suite.seedIds,
      unresolved,
      perSeedCoverage: plan?.perSeedCoverage ?? []
    },
    layerCounts: {
      semantic: semanticIds.size,
      evidence: evidenceIds.size,
      projection: projectionIds.size,
      custodyMaterialized: 0
    },
    deferredEvidenceIdCount,
    implementationAuthorized: false,
    publicationAuthorized: false
  };
}

function main() {
  const evaluation = evaluateLayerImplementation();
  process.stdout.write(`${JSON.stringify(evaluation, null, 2)}\n`);
  if (evaluation.hardFailures.length > 0) process.exitCode = 1;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
