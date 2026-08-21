import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import {
  evaluateFederatedEcosystem,
  loadSnapshot as loadGovernanceSnapshot
} from "./federated-ecosystem-eval.mjs";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const evaluatorPath = path.join(scriptDir, "federated-ecosystem-eval.mjs");
const repoRoot = path.resolve(scriptDir, "../..");
const snapshotPath = path.join(
  repoRoot,
  "config/knowledge-wiki/federated-ecosystem.snapshot.json"
);

function runSnapshot(snapshot) {
  const tempDir = mkdtempSync(path.join(os.tmpdir(), "federated-ecosystem-test-"));
  const candidatePath = path.join(tempDir, "candidate.json");
  writeFileSync(candidatePath, `${JSON.stringify(snapshot, null, 2)}\n`);

  try {
    return spawnSync(process.execPath, [evaluatorPath, candidatePath], {
      cwd: repoRoot,
      encoding: "utf8"
    });
  } finally {
    rmSync(tempDir, { recursive: true, force: true });
  }
}

function loadSnapshot() {
  return JSON.parse(readFileSync(snapshotPath, "utf8"));
}

function loadContext() {
  return {
    knowledgeBank: structuredClone(knowledgeBank),
    indexSource: readFileSync(
      path.join(
        repoRoot,
        "docs/knowledge-bank/indexes/federated-knowledge-graph-ecosystem.md"
      ),
      "utf8"
    ),
    sourceNote: readFileSync(
      path.join(
        repoRoot,
        "docs/knowledge-bank/sources/federated-knowledge-graph-ecosystem-review-2026-08-13.md"
      ),
      "utf8"
    )
  };
}

function publicPracticeFixture() {
  return {
    schemaVersion: 1,
    layers: [
      { id: "source", label: "Source graph" },
      { id: "evidence", label: "Evidence graph" },
      { id: "semantic", label: "Semantic graph" }
    ],
    transitions: [
      { from: "source", to: "evidence", automatic: false },
      { from: "evidence", to: "semantic", automatic: false },
      { from: "semantic", to: "projection", automatic: false }
    ],
    projection: {
      id: "projection",
      recipientSpecific: true,
      humanGates: ["rights", "consent", "credit", "editorial review"]
    },
    lineage: {
      predecessor: "Noting.us",
      relationship: "prototype-predecessor",
      productionAdoptionClaimed: false
    },
    publicSurfaces: ["/colophon", "/lab/source-backed-team-memory"]
  };
}

test("the current federated-ecosystem snapshot satisfies its governance contract", () => {
  const run = spawnSync(process.execPath, [evaluatorPath], {
    cwd: path.resolve(scriptDir, "../.."),
    encoding: "utf8"
  });

  assert.equal(run.status, 0, run.stderr || run.stdout);
});

test("RFC authority cannot be advanced by the ecosystem snapshot", () => {
  const snapshot = loadSnapshot();
  snapshot.authority.rfc_stage = "accepted";
  snapshot.authority.implementation_authorized = true;

  const run = runSnapshot(snapshot);

  assert.notEqual(run.status, 0, "an unauthorized stage advance should fail");
  assert.match(run.stderr, /RFC 0005 must remain exploring and implementation-authorized false/);
});

test("a protected system cannot disclose its repository locator", () => {
  const snapshot = loadSnapshot();
  const protectedSystem = snapshot.systems.find(
    (system) => system.id === "protected-subject-knowledge"
  );
  protectedSystem.locator_disclosure = "public";

  const run = runSnapshot(snapshot);

  assert.notEqual(run.status, 0, "protected locator disclosure should fail");
  assert.match(run.stderr, /protected systems must withhold locators/);
});

test("cross-system handoffs cannot become automatic synchronization", () => {
  const snapshot = loadSnapshot();
  snapshot.handoffs[0].automatic = true;

  const run = runSnapshot(snapshot);

  assert.notEqual(run.status, 0, "automatic federation should fail");
  assert.match(run.stderr, /handoffs must remain non-automatic/);
});

test("a governed handoff cannot drop its required human or provenance gates", () => {
  const snapshot = loadSnapshot();
  const handoff = snapshot.handoffs.find(
    (item) => item.id === "semantics-to-portfolio"
  );
  handoff.requires = handoff.requires.filter(
    (requirement) => requirement !== "editorial approval"
  );

  const run = runSnapshot(snapshot);

  assert.notEqual(run.status, 0, "a missing projection gate should fail");
  assert.match(run.stderr, /semantics-to-portfolio is missing editorial approval/);
});

test("the federation cannot collapse access, evidence, packet, security, or release authority", () => {
  const snapshot = loadSnapshot();
  snapshot.invariants = snapshot.invariants.filter(
    (invariant) => invariant !== "evidence-is-not-publication-permission"
  );

  const run = runSnapshot(snapshot);

  assert.notEqual(run.status, 0, "a missing authority invariant should fail");
  assert.match(run.stderr, /required invariant is missing: evidence-is-not-publication-permission/);
});

test("the project threshold cannot claim a full relaunch or release authority", () => {
  const snapshot = loadSnapshot();
  const threshold = snapshot.systems.find(
    (system) => system.id === "bounded-project-threshold"
  );
  threshold.cannot_authorize = threshold.cannot_authorize.filter(
    (boundary) => boundary !== "deployment, indexing, or relaunch claims"
  );

  const run = runSnapshot(snapshot);

  assert.notEqual(run.status, 0, "removing the relaunch boundary should fail");
  assert.match(run.stderr, /project threshold must withhold deployment, indexing, and relaunch authority/);
});

test("system identities remain unique and every handoff endpoint resolves", () => {
  const snapshot = loadSnapshot();
  snapshot.systems[1].id = snapshot.systems[0].id;

  const run = runSnapshot(snapshot);

  assert.notEqual(run.status, 0, "duplicate system identity should fail");
  assert.match(run.stderr, /system IDs must be unique/);
});

test("the ecosystem claim cannot activate a public projection", () => {
  const context = loadContext();
  const claim = context.knowledgeBank.claims.find(
    (item) => item.id === "CLM-FEDERATED-KNOWLEDGE-GRAPH-OPERATING-MODEL"
  );
  claim.projections[0].status = "active";
  claim.projections[0].surfaces = ["/knowledge-graph"];

  const result = evaluateFederatedEcosystem(loadGovernanceSnapshot(), context);

  assert.equal(result.passed, false, "an activated ecosystem projection should fail");
  assert.match(result.failures.join("\n"), /ecosystem claim must remain held from public surfaces/);
});

test("protected ecosystem support cannot expose a URL or render a citation", () => {
  const context = loadContext();
  const source = context.knowledgeBank.sources.find(
    (item) => item.id === "SRC-FEDERATED-ECOSYSTEM-SUBJECT-KNOWLEDGE-2026"
  );
  source.canonicalUrl = "https://example.com/protected";
  const claim = context.knowledgeBank.claims.find(
    (item) => item.id === "CLM-FEDERATED-KNOWLEDGE-GRAPH-OPERATING-MODEL"
  );
  const evidence = claim.evidence.find((item) => item.sourceId === source.id);
  evidence.renderCitation = true;

  const result = evaluateFederatedEcosystem(loadGovernanceSnapshot(), context);

  assert.equal(result.passed, false, "protected source disclosure should fail");
  assert.match(result.failures.join("\n"), /protected ecosystem support must expose no URL and render no citation/);
});

test("the ecosystem claim retains separate system observations and authority anti-claims", () => {
  const context = loadContext();
  const claim = context.knowledgeBank.claims.find(
    (item) => item.id === "CLM-FEDERATED-KNOWLEDGE-GRAPH-OPERATING-MODEL"
  );
  claim.antiClaims = [];
  for (const observation of context.knowledgeBank.observations.filter((item) =>
    item.claimIds.includes(claim.id)
  )) {
    observation.sourceId = "SRC-FEDERATED-ECOSYSTEM-JAMIEBURK-ART-DEVELOP-2026";
  }

  const result = evaluateFederatedEcosystem(loadGovernanceSnapshot(), context);

  assert.equal(result.passed, false, "collapsed roles and authority should fail");
  assert.match(result.failures.join("\n"), /requires seven source-distinct observations/);
  assert.match(result.failures.join("\n"), /anti-claims omit synchronization, causation, packet, security, or release boundaries/);
});

test("the public practice keeps source, evidence, and semantic graphs distinct from projection", () => {
  const context = loadContext();
  context.publicPractice = publicPracticeFixture();
  context.publicPractice.layers = context.publicPractice.layers.filter(
    (layer) => layer.id !== "evidence"
  );
  context.publicPractice.transitions[0].automatic = true;
  context.publicPractice.projection.recipientSpecific = false;

  const result = evaluateFederatedEcosystem(loadGovernanceSnapshot(), context);

  assert.equal(result.passed, false, "a collapsed public architecture should fail");
  assert.match(result.failures.join("\n"), /public practice requires source, evidence, and semantic graphs/);
  assert.match(result.failures.join("\n"), /public practice transitions must remain non-automatic/);
  assert.match(result.failures.join("\n"), /public projection must remain recipient-specific/);
});

test("the public practice presents Noting.us as a predecessor and reaches both explanatory surfaces", () => {
  const context = loadContext();
  context.publicPractice = publicPracticeFixture();
  context.publicPractice.lineage.relationship = "production-platform";
  context.publicPractice.lineage.productionAdoptionClaimed = true;
  context.publicPractice.publicSurfaces = ["/colophon"];

  const result = evaluateFederatedEcosystem(loadGovernanceSnapshot(), context);

  assert.equal(result.passed, false, "inflated lineage or missing surfaces should fail");
  assert.match(result.failures.join("\n"), /Noting\.us must remain a prototype predecessor/);
  assert.match(result.failures.join("\n"), /public practice must reach the colophon and lab page/);
});

test("the active practice claim remains approved only for the colophon and lab surfaces", () => {
  const context = loadContext();
  context.publicPractice = publicPracticeFixture();
  const claim = context.knowledgeBank.claims.find(
    (item) => item.id === "CLM-KNOWLEDGE-WIKI-GRAPH-PRACTICE-2026"
  );
  claim.projections.find((projection) => projection.key === "archive-note").surfaces = [
    "/"
  ];

  const result = evaluateFederatedEcosystem(loadGovernanceSnapshot(), context);

  assert.equal(result.passed, false, "an expanded or missing public surface should fail");
  assert.match(result.failures.join("\n"), /practice claim must remain active only on the colophon and lab page/);
});

test("the Noting.us lineage cannot expose its protected source or claim production adoption", () => {
  const context = loadContext();
  context.publicPractice = publicPracticeFixture();
  const source = context.knowledgeBank.sources.find(
    (item) => item.id === "SRC-NOTING-US-PRACTICE-REVIEW-2026-08-21"
  );
  source.canonicalUrl = "https://example.com/protected";
  const claim = context.knowledgeBank.claims.find(
    (item) => item.id === "CLM-NOTING-US-KNOWLEDGE-WIKI-LINEAGE-2026"
  );
  claim.evidence[0].renderCitation = true;

  const result = evaluateFederatedEcosystem(loadGovernanceSnapshot(), context);

  assert.equal(result.passed, false, "protected lineage disclosure should fail");
  assert.match(result.failures.join("\n"), /Noting.us lineage support must stay protected and non-citing/);
});
