import assert from "node:assert/strict";
import test from "node:test";

import {
  buildLayeredKnowledgeGraph,
  evaluateProjectionEligibility,
  loadLayerPolicy,
  planLayeredPacketFamilies,
  planCustodyRequests,
  traverseSemanticRadius
} from "./layers.mjs";
import { compileWiki, defaultRepoRoot } from "./lib.mjs";

function node(id, kind) {
  return {
    id,
    kind,
    title: id,
    status: "maintained",
    visibility: "public-safe",
    sensitivity: "low",
    summary: `${id} summary`
  };
}

function fixtureWiki() {
  const nodes = [
    node("opportunity", "opportunity"),
    node("capability", "capability"),
    node("project", "project"),
    node("photo-index", "source"),
    node("photo-001", "asset"),
    node("portfolio", "projection")
  ];
  return {
    records: nodes,
    graph: {
      schemaVersion: 1,
      sourceFingerprint: "fixture-fingerprint",
      rootId: "opportunity",
      nodes,
      edges: [
        { from: "opportunity", to: "capability", type: "related_to", source: "frontmatter" },
        { from: "capability", to: "project", type: "related_to", source: "frontmatter" },
        { from: "project", to: "photo-index", type: "uses_source", source: "frontmatter" },
        { from: "photo-index", to: "photo-001", type: "related_to", source: "frontmatter" },
        { from: "project", to: "portfolio", type: "projected_to", source: "frontmatter" }
      ]
    }
  };
}

test("the public Wiki compiles into semantic, evidence, and projection layers without custody locators", () => {
  const layered = buildLayeredKnowledgeGraph(fixtureWiki());

  assert.deepEqual(
    layered.layers.semantic.nodes.map((item) => item.id),
    ["capability", "opportunity", "project"]
  );
  assert.deepEqual(
    layered.layers.evidence.nodes.map((item) => item.id),
    ["photo-001", "photo-index"]
  );
  assert.deepEqual(
    layered.projections.nodes.map((item) => item.id),
    ["portfolio"]
  );
  assert.deepEqual(
    layered.layers.semantic.edges.map((edge) => [edge.from, edge.to]),
    [
      ["capability", "project"],
      ["opportunity", "capability"]
    ]
  );
  assert.equal(layered.layers.custody.materialized, false);
  assert.equal(JSON.stringify(layered).includes("locator"), false);
});

test("semantic degree stops before an evidence hub and proposes only boundary evidence", () => {
  const layered = buildLayeredKnowledgeGraph(fixtureWiki());
  const result = traverseSemanticRadius(layered, {
    seedIds: ["opportunity"],
    maxDegree: 2
  });

  assert.deepEqual(result.semanticNodeIds, ["capability", "opportunity", "project"]);
  assert.deepEqual(result.paths, [
    {
      nodeId: "opportunity",
      seedId: "opportunity",
      degree: 0,
      nodePath: ["opportunity"],
      edgePath: []
    },
    {
      nodeId: "capability",
      seedId: "opportunity",
      degree: 1,
      nodePath: ["opportunity", "capability"],
      edgePath: [
        {
          from: "opportunity",
          to: "capability",
          type: "related_to",
          traversalDirection: "stored"
        }
      ]
    },
    {
      nodeId: "project",
      seedId: "opportunity",
      degree: 2,
      nodePath: ["opportunity", "capability", "project"],
      edgePath: [
        {
          from: "opportunity",
          to: "capability",
          type: "related_to",
          traversalDirection: "stored"
        },
        {
          from: "capability",
          to: "project",
          type: "related_to",
          traversalDirection: "stored"
        }
      ]
    }
  ]);
  assert.deepEqual(result.evidenceCandidates.map((item) => item.evidenceId), [
    "photo-index"
  ]);
  assert.deepEqual(result.evidenceCandidates[0].relation, {
    from: "project",
    to: "photo-index",
    type: "uses_source",
    traversalDirection: "stored"
  });
});

test("evidence attachment ignores cross-layer relations outside its frozen policy", () => {
  const wiki = fixtureWiki();
  wiki.graph.edges.push({
    from: "project",
    to: "photo-001",
    type: "collaborated_with",
    source: "frontmatter"
  });
  const layered = buildLayeredKnowledgeGraph(wiki);
  const result = traverseSemanticRadius(layered, {
    seedIds: ["opportunity"],
    maxDegree: 2
  });

  assert.deepEqual(result.evidenceCandidates.map((item) => item.evidenceId), [
    "photo-index"
  ]);
});

test("semantic traversal ignores semantic edge types outside the frozen traversal policy", () => {
  const wiki = fixtureWiki();
  const unrelated = node("unrelated-person", "person");
  wiki.records.push(unrelated);
  wiki.graph.nodes.push(unrelated);
  wiki.graph.edges.push({
    from: "opportunity",
    to: "unrelated-person",
    type: "mentions",
    source: "frontmatter"
  });
  const layered = buildLayeredKnowledgeGraph(wiki);
  const result = traverseSemanticRadius(layered, {
    seedIds: ["opportunity"],
    maxDegree: 1
  });

  assert.deepEqual(result.semanticNodeIds, ["capability", "opportunity"]);
});

test("an explicit record override can classify a mixed index as evidence", () => {
  const wiki = fixtureWiki();
  wiki.records.find((item) => item.id === "photo-index").kind = "index";
  wiki.graph.nodes.find((item) => item.id === "photo-index").kind = "index";

  const layered = buildLayeredKnowledgeGraph(wiki, {
    layerOverrides: { "photo-index": "evidence" }
  });

  assert.deepEqual(
    layered.layers.evidence.nodes.map((item) => item.id),
    ["photo-001", "photo-index"]
  );
  assert.deepEqual(layered.classification.overrides, [
    { id: "photo-index", kind: "index", layer: "evidence" }
  ]);
});

test("the repository policy classifies every current Wiki node and treats photo-set indexes as evidence", () => {
  const wiki = compileWiki();
  const policy = loadLayerPolicy(defaultRepoRoot);
  const layered = buildLayeredKnowledgeGraph(wiki, policy);
  const classifiedCount =
    layered.layers.semantic.nodes.length +
    layered.layers.evidence.nodes.length +
    layered.projections.nodes.length;

  assert.equal(classifiedCount, wiki.graph.nodes.length);
  assert.ok(
    layered.layers.semantic.nodes.some((item) => item.id === "index.knowledge-wiki")
  );
  assert.deepEqual(
    layered.classification.overrides.map((item) => item.id),
    [
      "index.photo-set.east-river-canoe.2022",
      "index.photo-set.kc-town-hall-fieldwork",
      "index.photo-set.mit-interrogative-design.2024",
      "index.photo-set.nycac-dcla-formation.2017",
      "index.photo-set.nycac-project-sites.2017-2026"
    ]
  );
  assert.ok(
    layered.layers.evidence.nodes.some(
      (item) => item.id === "index.photo-set.nycac-project-sites.2017-2026"
    )
  );
});

test("packet planning emits cumulative per-seed and union families and defers an unbudgeted evidence hub", () => {
  const layered = buildLayeredKnowledgeGraph(fixtureWiki());
  const plan = planLayeredPacketFamilies(layered, {
    seedIds: ["project", "opportunity"],
    maxDegree: 2
  });

  assert.deepEqual(
    plan.packetFamilies.map((family) => family.id),
    ["per-seed:opportunity", "per-seed:project", "union"]
  );
  assert.deepEqual(
    plan.packetFamilies.find((family) => family.id === "per-seed:opportunity").packets
      .map((packet) => ({ degree: packet.degree, semanticNodeIds: packet.semanticNodeIds })),
    [
      { degree: 0, semanticNodeIds: ["opportunity"] },
      { degree: 1, semanticNodeIds: ["capability", "opportunity"] },
      { degree: 2, semanticNodeIds: ["capability", "opportunity", "project"] }
    ]
  );
  assert.deepEqual(
    plan.packetFamilies.find((family) => family.id === "union").packets
      .map((packet) => ({ degree: packet.degree, semanticNodeIds: packet.semanticNodeIds })),
    [
      { degree: 0, semanticNodeIds: ["opportunity", "project"] },
      { degree: 1, semanticNodeIds: ["capability", "opportunity", "project"] }
    ]
  );
  assert.deepEqual(plan.perSeedCoverage, [
    { seedId: "opportunity", semanticNodeCount: 3, evidenceCandidateCount: 1 },
    { seedId: "project", semanticNodeCount: 3, evidenceCandidateCount: 1 }
  ]);
  const { candidateEvidenceDigest, ...deferredExpansion } = plan.evidenceExpansion;
  assert.equal(candidateEvidenceDigest.length, 64);
  assert.deepEqual(deferredExpansion, {
    decision: "defer",
    candidateEvidenceCount: 1,
    reason: "explicit-artifact-budget-and-selection-required"
  });
});

test("a deferred evidence hub is summarized without serializing its candidate inventory", () => {
  const layered = buildLayeredKnowledgeGraph(fixtureWiki());
  const plan = planLayeredPacketFamilies(layered, {
    seedIds: ["opportunity"],
    maxDegree: 2
  });

  assert.equal(Object.hasOwn(plan.evidenceExpansion, "candidateEvidenceIds"), false);
  assert.equal(plan.evidenceExpansion.candidateEvidenceCount, 1);
  assert.equal(plan.evidenceExpansion.candidateEvidenceDigest.length, 64);
  assert.equal(
    plan.packetFamilies.some((family) =>
      family.packets.some((packet) => Object.hasOwn(packet, "evidenceCandidates"))
    ),
    false
  );
  assert.deepEqual(
    plan.packetFamilies.find((family) => family.id.startsWith("per-seed:")).packets.at(-1)
      .evidenceAttachmentSummary,
    {
      candidateCount: 1,
      candidateDigest: plan.evidenceExpansion.candidateEvidenceDigest
    }
  );
});

test("an explicit artifact budget expands only the evidence IDs selected by the recipient contract", () => {
  const layered = buildLayeredKnowledgeGraph(fixtureWiki());
  const plan = planLayeredPacketFamilies(layered, {
    seedIds: ["opportunity"],
    maxDegree: 2,
    artifactBudget: 1,
    selectedEvidenceIds: ["photo-index"]
  });

  const { candidateEvidenceDigest, ...allowedExpansion } = plan.evidenceExpansion;
  assert.equal(candidateEvidenceDigest.length, 64);
  assert.deepEqual(allowedExpansion, {
    decision: "allow",
    artifactBudget: 1,
    selectedEvidenceIds: ["photo-index"],
    deferredEvidenceCount: 0
  });
});

test("custody requests fail closed when an adapter has no current authorization", () => {
  const layered = buildLayeredKnowledgeGraph(fixtureWiki());
  const packetPlan = planLayeredPacketFamilies(layered, {
    seedIds: ["opportunity"],
    maxDegree: 2,
    artifactBudget: 1,
    selectedEvidenceIds: ["photo-index"]
  });
  const custody = planCustodyRequests(packetPlan, {
    bindings: {
      "photo-index": {
        adapter: "curate-apple-photos",
        disposition: "protected-pointer",
        authorization: { state: "stale", receiptId: "receipt-001" },
        sourceCutoff: "2026-08-10"
      }
    }
  });

  assert.deepEqual(custody.requests, [
    {
      evidenceId: "photo-index",
      adapter: "curate-apple-photos",
      disposition: "protected-pointer",
      sourceCutoff: "2026-08-10",
      state: "blocked",
      reason: "current-authorization-required"
    }
  ]);
  assert.equal(JSON.stringify(custody).includes("receipt-001"), false);
  assert.equal(JSON.stringify(custody).includes("locator"), false);
});

test("a bounded source-specific request becomes ready under a current opaque authorization receipt", () => {
  const layered = buildLayeredKnowledgeGraph(fixtureWiki());
  const packetPlan = planLayeredPacketFamilies(layered, {
    seedIds: ["opportunity"],
    maxDegree: 2,
    artifactBudget: 1,
    selectedEvidenceIds: ["photo-index"]
  });
  const custody = planCustodyRequests(packetPlan, {
    bindings: {
      "photo-index": {
        adapter: "curate-apple-photos",
        disposition: "protected-pointer",
        authorization: { state: "current", receiptId: "opaque-receipt-001" },
        boundedRequestId: "request-001",
        sourceCutoff: "2026-08-10"
      }
    }
  });

  assert.equal(custody.state, "ready");
  assert.deepEqual(custody.requests, [
    {
      evidenceId: "photo-index",
      adapter: "curate-apple-photos",
      disposition: "protected-pointer",
      sourceCutoff: "2026-08-10",
      boundedRequestId: "request-001",
      authorizationReceiptId: "opaque-receipt-001",
      state: "ready"
    }
  ]);
});

test("an unrecognized source adapter cannot become a ready custody request", () => {
  const layered = buildLayeredKnowledgeGraph(fixtureWiki());
  const packetPlan = planLayeredPacketFamilies(layered, {
    seedIds: ["opportunity"],
    maxDegree: 2,
    artifactBudget: 1,
    selectedEvidenceIds: ["photo-index"]
  });
  const custody = planCustodyRequests(packetPlan, {
    bindings: {
      "photo-index": {
        adapter: "generic-account-scraper",
        disposition: "exact-copy",
        authorization: { state: "current", receiptId: "opaque-receipt-001" },
        boundedRequestId: "request-001",
        sourceCutoff: "2026-08-10"
      }
    }
  });

  assert.deepEqual(custody.requests, [
    {
      evidenceId: "photo-index",
      adapter: "generic-account-scraper",
      disposition: "exact-copy",
      sourceCutoff: "2026-08-10",
      state: "blocked",
      reason: "recognized-source-specific-adapter-required"
    }
  ]);
});

test("semantic and evidence readiness cannot bypass recipient, consent, credit, or editorial gates", () => {
  const decision = evaluateProjectionEligibility({
    recipient: "portfolio-photo-editors",
    purpose: "select photographs for a professional portfolio",
    semanticSelection: ["project"],
    evidenceSelection: ["photo-index"],
    gates: {
      publicSafeWording: "approved",
      rights: "approved"
    }
  });

  assert.deepEqual(decision, {
    state: "hold",
    recipient: "portfolio-photo-editors",
    purpose: "select photographs for a professional portfolio",
    missingGates: ["consent", "creditReview", "editorialApproval"],
    eligibleSemanticIds: [],
    eligibleEvidenceIds: [],
    publicationAuthorized: false
  });
});
