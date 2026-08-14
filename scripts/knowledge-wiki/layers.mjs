import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";

const evidenceKinds = new Set(["asset", "evaluation", "research-run", "source"]);
const defaultSemanticEdgeTypes = [
  "collaborated_with",
  "contradicts",
  "informed_by",
  "organized_by",
  "part_of",
  "participated_in",
  "projected_to",
  "related_to",
  "resulted_in",
  "supports",
  "supersedes",
  "uses_method"
];
const sourceAdapters = new Set([
  "curate-apple-photos",
  "gmail:gmail",
  "google-drive:google-drive",
  "ig-dm-md",
  "local-file",
  "pdf:pdf",
  "site-tree-md",
  "transcribe",
  "web-archiving"
]);

function compareText(left, right) {
  return left < right ? -1 : left > right ? 1 : 0;
}

function classifyKind(kind, kindLayers) {
  if (kindLayers) {
    for (const layer of ["semantic", "evidence", "projection"]) {
      if (kindLayers[layer]?.includes(kind)) return layer;
    }
    throw new Error(`record kind is absent from the layer policy: ${kind}`);
  }
  if (kind === "projection") return "projection";
  if (evidenceKinds.has(kind)) return "evidence";
  return "semantic";
}

function sortNodes(nodes) {
  return [...nodes].sort((left, right) => compareText(left.id, right.id));
}

function sortEdges(edges) {
  return [...edges].sort((left, right) =>
    compareText(
      `${left.from}\0${left.type}\0${left.to}`,
      `${right.from}\0${right.type}\0${right.to}`
    )
  );
}

export function buildLayeredKnowledgeGraph(wiki, options = {}) {
  const semanticEdgeTypes = [...new Set(
    options.semanticEdgeTypes ?? defaultSemanticEdgeTypes
  )].sort(compareText);
  const layerOverrides = options.layerOverrides ?? {};
  const nodeLayer = new Map(
    wiki.graph.nodes.map((item) => [
      item.id,
      layerOverrides[item.id] ?? classifyKind(item.kind, options.kindLayers)
    ])
  );
  const semanticNodes = wiki.graph.nodes.filter(
    (item) => nodeLayer.get(item.id) === "semantic"
  );
  const evidenceNodes = wiki.graph.nodes.filter(
    (item) => nodeLayer.get(item.id) === "evidence"
  );
  const projectionNodes = wiki.graph.nodes.filter(
    (item) => nodeLayer.get(item.id) === "projection"
  );
  const semanticEdges = wiki.graph.edges.filter(
    (edge) =>
      nodeLayer.get(edge.from) === "semantic" &&
      nodeLayer.get(edge.to) === "semantic"
  );
  const evidenceEdges = wiki.graph.edges.filter(
    (edge) =>
      nodeLayer.get(edge.from) === "evidence" &&
      nodeLayer.get(edge.to) === "evidence"
  );
  const boundaries = wiki.graph.edges.filter(
    (edge) => nodeLayer.get(edge.from) !== nodeLayer.get(edge.to)
  );

  return {
    schemaVersion: 1,
    sourceFingerprint: wiki.graph.sourceFingerprint,
    policy: {
      semanticEdgeTypes,
      evidenceAttachmentTypes: [...new Set(
        options.evidenceAttachmentTypes ?? [
          "documents",
          "evidence:context",
          "evidence:direct-support",
          "evidence:private-support",
          "has_asset",
          "informed_by",
          "related_to",
          "supports",
          "uses_source"
        ]
      )].sort(compareText),
      evidenceExpansion: "attachment-phase",
      custodyMaterialization: "source-specific-adapter",
      defaultCrossLayer: "deny"
    },
    classification: {
      overrides: wiki.graph.nodes
        .filter((item) => layerOverrides[item.id])
        .map((item) => ({
          id: item.id,
          kind: item.kind,
          layer: layerOverrides[item.id]
        }))
        .sort((left, right) => compareText(left.id, right.id))
    },
    layers: {
      semantic: {
        nodes: sortNodes(semanticNodes),
        edges: sortEdges(semanticEdges)
      },
      evidence: {
        nodes: sortNodes(evidenceNodes),
        edges: sortEdges(evidenceEdges)
      },
      custody: {
        materialized: false,
        registry: "outside-public-git"
      }
    },
    projections: {
      nodes: sortNodes(projectionNodes)
    },
    boundaries: sortEdges(boundaries)
  };
}

export function loadLayerPolicy(repoRoot) {
  const policyPath = path.join(repoRoot, "config/knowledge-wiki/graph-layers.json");
  return JSON.parse(readFileSync(policyPath, "utf8"));
}

function traversedEdge(edge, currentId) {
  return {
    from: edge.from,
    to: edge.to,
    type: edge.type,
    traversalDirection: edge.from === currentId ? "stored" : "reverse"
  };
}

export function traverseSemanticRadius(layered, options) {
  const semanticIds = new Set(
    layered.layers.semantic.nodes.map((item) => item.id)
  );
  const evidenceIds = new Set(
    layered.layers.evidence.nodes.map((item) => item.id)
  );
  const permittedEdgeTypes = new Set(
    options.semanticEdgeTypes ?? layered.policy.semanticEdgeTypes
  );
  const permittedEvidenceTypes = new Set(
    options.evidenceAttachmentTypes ?? layered.policy.evidenceAttachmentTypes
  );
  const maxDegree = options.maxDegree;
  if (!Number.isInteger(maxDegree) || maxDegree < 0) {
    throw new Error("maxDegree must be a non-negative integer");
  }

  const seedIds = [...new Set(options.seedIds ?? [])].sort(compareText);
  if (seedIds.length === 0) throw new Error("at least one semantic seed is required");
  for (const seedId of seedIds) {
    if (!semanticIds.has(seedId)) {
      throw new Error(`semantic seed does not resolve to the semantic layer: ${seedId}`);
    }
  }

  const discovered = new Map();
  const queue = [];
  for (const seedId of seedIds) {
    const path = {
      nodeId: seedId,
      seedId,
      degree: 0,
      nodePath: [seedId],
      edgePath: []
    };
    discovered.set(seedId, path);
    queue.push(seedId);
  }

  while (queue.length > 0) {
    const currentId = queue.shift();
    const currentPath = discovered.get(currentId);
    if (currentPath.degree >= maxDegree) continue;

    const adjacent = layered.layers.semantic.edges
      .flatMap((edge) => {
        if (!permittedEdgeTypes.has(edge.type)) return [];
        if (edge.from === currentId) return [{ edge, nextId: edge.to }];
        if (edge.to === currentId) return [{ edge, nextId: edge.from }];
        return [];
      })
      .sort((left, right) =>
        compareText(
          `${left.nextId}\0${left.edge.type}\0${left.edge.from}\0${left.edge.to}`,
          `${right.nextId}\0${right.edge.type}\0${right.edge.from}\0${right.edge.to}`
        )
      );

    for (const { edge, nextId } of adjacent) {
      if (discovered.has(nextId)) continue;
      discovered.set(nextId, {
        nodeId: nextId,
        seedId: currentPath.seedId,
        degree: currentPath.degree + 1,
        nodePath: [...currentPath.nodePath, nextId],
        edgePath: [...currentPath.edgePath, traversedEdge(edge, currentId)]
      });
      queue.push(nextId);
    }
  }

  const paths = [...discovered.values()].sort(
    (left, right) => left.degree - right.degree || compareText(left.nodeId, right.nodeId)
  );
  const selectedSemanticIds = new Set(paths.map((item) => item.nodeId));
  const evidenceCandidates = layered.boundaries
    .flatMap((edge) => {
      if (!permittedEvidenceTypes.has(edge.type)) return [];
      if (selectedSemanticIds.has(edge.from) && evidenceIds.has(edge.to)) {
        return [{
          semanticId: edge.from,
          evidenceId: edge.to,
          relation: traversedEdge(edge, edge.from)
        }];
      }
      if (selectedSemanticIds.has(edge.to) && evidenceIds.has(edge.from)) {
        return [{
          semanticId: edge.to,
          evidenceId: edge.from,
          relation: traversedEdge(edge, edge.to)
        }];
      }
      return [];
    })
    .sort((left, right) =>
      compareText(
        `${left.evidenceId}\0${left.semanticId}\0${left.relation.type}`,
        `${right.evidenceId}\0${right.semanticId}\0${right.relation.type}`
      )
    );

  return {
    seedIds,
    maxDegree,
    semanticNodeIds: [...selectedSemanticIds].sort(compareText),
    paths,
    evidenceCandidates
  };
}

function uniqueEvidenceIds(candidates) {
  return [...new Set(candidates.map((item) => item.evidenceId))].sort(compareText);
}

function digestIds(ids) {
  return createHash("sha256").update(JSON.stringify(ids)).digest("hex");
}

function evidenceAttachmentSummary(candidates) {
  const ids = uniqueEvidenceIds(candidates);
  return {
    candidateCount: ids.length,
    candidateDigest: digestIds(ids)
  };
}

function packetFamily(layered, id, seedIds, maxDegree) {
  const packets = [];
  for (let degree = 0; degree <= maxDegree; degree += 1) {
    const traversal = traverseSemanticRadius(layered, { seedIds, maxDegree: degree });
    const frontierNodeIds = traversal.paths
      .filter((item) => item.degree === degree)
      .map((item) => item.nodeId)
      .sort(compareText);
    if (degree > 0 && frontierNodeIds.length === 0) break;
    packets.push({
      degree,
      semanticNodeIds: traversal.semanticNodeIds,
      frontierNodeIds,
      paths: traversal.paths,
      evidenceCandidates: traversal.evidenceCandidates
    });
  }
  return { id, seedIds, packets };
}

export function planLayeredPacketFamilies(layered, options) {
  const seedIds = [...new Set(options.seedIds ?? [])].sort(compareText);
  const maxDegree = options.maxDegree;
  const perSeedFamilies = seedIds.map((seedId) =>
    packetFamily(layered, `per-seed:${seedId}`, [seedId], maxDegree)
  );
  const unionFamily = packetFamily(layered, "union", seedIds, maxDegree);
  const packetFamilies = [...perSeedFamilies, unionFamily];
  const finalPacket = (family) => family.packets.at(-1);
  const perSeedCoverage = perSeedFamilies.map((family) => ({
    seedId: family.seedIds[0],
    semanticNodeCount: finalPacket(family).semanticNodeIds.length,
    evidenceCandidateCount: uniqueEvidenceIds(finalPacket(family).evidenceCandidates).length
  }));
  const candidateEvidenceIds = uniqueEvidenceIds(
    finalPacket(unionFamily).evidenceCandidates
  );
  const candidateEvidenceDigest = digestIds(candidateEvidenceIds);
  const selectedEvidenceIds = [...new Set(options.selectedEvidenceIds ?? [])].sort(compareText);
  let evidenceExpansion = {
    decision: "defer",
    candidateEvidenceCount: candidateEvidenceIds.length,
    candidateEvidenceDigest,
    reason: "explicit-artifact-budget-and-selection-required"
  };

  if (options.artifactBudget !== undefined || selectedEvidenceIds.length > 0) {
    if (!Number.isInteger(options.artifactBudget) || options.artifactBudget < 0) {
      throw new Error("artifactBudget must be a non-negative integer");
    }
    const candidateSet = new Set(candidateEvidenceIds);
    for (const evidenceId of selectedEvidenceIds) {
      if (!candidateSet.has(evidenceId)) {
        throw new Error(`selected evidence is outside the semantic packet: ${evidenceId}`);
      }
    }
    if (selectedEvidenceIds.length > options.artifactBudget) {
      throw new Error("selected evidence exceeds artifactBudget");
    }
    if (selectedEvidenceIds.length > 0) {
      const selectedSet = new Set(selectedEvidenceIds);
      evidenceExpansion = {
        decision: "allow",
        artifactBudget: options.artifactBudget,
        selectedEvidenceIds,
        deferredEvidenceCount: candidateEvidenceIds.filter((id) => !selectedSet.has(id)).length,
        candidateEvidenceDigest
      };
    }
  }
  const publicPacketFamilies = packetFamilies.map((family) => ({
    id: family.id,
    seedIds: family.seedIds,
    packets: family.packets.map(({ evidenceCandidates, ...packet }) => ({
      ...packet,
      evidenceAttachmentSummary: evidenceAttachmentSummary(evidenceCandidates)
    }))
  }));

  return {
    schemaVersion: 1,
    seedIds,
    maxDegree,
    packetFamilies: publicPacketFamilies,
    perSeedCoverage,
    evidenceExpansion
  };
}

export function planCustodyRequests(packetPlan, options = {}) {
  if (packetPlan.evidenceExpansion.decision !== "allow") {
    return {
      schemaVersion: 1,
      state: "deferred",
      requests: []
    };
  }

  const bindings = options.bindings ?? {};
  const requests = packetPlan.evidenceExpansion.selectedEvidenceIds.map((evidenceId) => {
    const binding = bindings[evidenceId];
    if (!binding) {
      return {
        evidenceId,
        adapter: null,
        disposition: "not-recovered",
        sourceCutoff: null,
        state: "capability-gap",
        reason: "source-specific-adapter-binding-required"
      };
    }
    if (!sourceAdapters.has(binding.adapter)) {
      return {
        evidenceId,
        adapter: binding.adapter,
        disposition: binding.disposition,
        sourceCutoff: binding.sourceCutoff,
        state: "blocked",
        reason: "recognized-source-specific-adapter-required"
      };
    }
    if (binding.authorization?.state !== "current") {
      return {
        evidenceId,
        adapter: binding.adapter,
        disposition: binding.disposition,
        sourceCutoff: binding.sourceCutoff,
        state: "blocked",
        reason: "current-authorization-required"
      };
    }
    if (
      !binding.authorization.receiptId ||
      !binding.boundedRequestId ||
      !binding.sourceCutoff ||
      !binding.adapter ||
      !binding.disposition
    ) {
      return {
        evidenceId,
        adapter: binding.adapter ?? null,
        disposition: binding.disposition ?? "not-recovered",
        sourceCutoff: binding.sourceCutoff ?? null,
        state: "blocked",
        reason: "bounded-custody-contract-incomplete"
      };
    }
    return {
      evidenceId,
      adapter: binding.adapter,
      disposition: binding.disposition,
      sourceCutoff: binding.sourceCutoff,
      boundedRequestId: binding.boundedRequestId,
      authorizationReceiptId: binding.authorization.receiptId,
      state: "ready"
    };
  });

  return {
    schemaVersion: 1,
    state: requests.every((request) => request.state === "ready") ? "ready" : "blocked",
    requests
  };
}

export function evaluateProjectionEligibility(contract) {
  if (!contract.recipient || !contract.purpose) {
    throw new Error("projection eligibility requires a named recipient and purpose");
  }
  const requiredGates = [
    "publicSafeWording",
    "rights",
    "consent",
    "creditReview",
    "editorialApproval"
  ];
  const missingGates = requiredGates.filter(
    (gate) => contract.gates?.[gate] !== "approved"
  );
  const eligible = missingGates.length === 0;

  return {
    state: eligible ? "eligible" : "hold",
    recipient: contract.recipient,
    purpose: contract.purpose,
    missingGates,
    eligibleSemanticIds: eligible
      ? [...new Set(contract.semanticSelection ?? [])].sort(compareText)
      : [],
    eligibleEvidenceIds: eligible
      ? [...new Set(contract.evidenceSelection ?? [])].sort(compareText)
      : [],
    publicationAuthorized: false
  };
}
