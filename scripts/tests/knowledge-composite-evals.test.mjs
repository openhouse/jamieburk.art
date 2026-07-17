import assert from "node:assert/strict";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import { proofClaims } from "../../apps/www/src/data/proofs.ts";
import {
  readCompositeArtifacts,
  validateAgency,
  validateCompositeArtifacts,
  validateComposition,
  validateHumanState,
  validateHoldouts,
  validateMosaic,
  validateSuite,
  validateSurvivorship
} from "../lib/knowledge-composite-validation.mjs";
import { scanCompiledLifecycleLeaks } from "../check-compiled-lifecycle-leaks.mjs";

const clone = (value) => structuredClone(value);
const artifacts = readCompositeArtifacts();

test("composite contract retains exact IDs, weights, provenance, and thresholds", () => {
  assert.deepEqual(validateSuite(artifacts.suite), []);
});

test("contract mutation catches weight drift", () => {
  const suite = clone(artifacts.suite);
  suite.evals[0].weight += 1;
  assert.match(validateSuite(suite).join("\n"), /weights must total 100/);
});

test("agency relations classify every proof as an exact set", () => {
  assert.deepEqual(validateAgency(artifacts.agency, proofClaims, knowledgeBank), []);
});

test("agency mutation catches missing classification", () => {
  const agency = clone(artifacts.agency);
  agency.relations.pop();
  assert.match(validateAgency(agency).join("\n"), /exact set/);
});

test("agency mutation catches sole causality and unsupported title inflation", () => {
  const agency = clone(artifacts.agency);
  agency.relations[0].boundedAction = "single-handedly served as executive director and caused the outcome";
  assert.match(validateAgency(agency).join("\n"), /sole-causality or unsupported-title drift/);
});

test("agency mutation catches collaborator boundary erasure", () => {
  const agency = clone(artifacts.agency);
  const relation = agency.relations.find((item) => item.proofId === "fair-rent-campaign-memory");
  relation.creditScope = "individual";
  relation.antiClaims = ["unsupported overstatement"];
  assert.match(validateAgency(agency).join("\n"), /erases the collective or institutional boundary/);
});

test("agency mutation catches unknown canonical support", () => {
  const agency = clone(artifacts.agency);
  const relation = agency.relations.find((item) => item.supportClaimIds.length);
  relation.supportClaimIds = ["CLM-NOT-REAL"];
  const errors = validateAgency(agency).join("\n");
  assert.match(errors, /must exactly match|unknown canonical claim/);
});

test("composition covers every route template and every proof decision", () => {
  assert.deepEqual(validateComposition(artifacts.composition, artifacts.agency), []);
});

test("composition mutation catches route and omission loss", () => {
  const manifest = clone(artifacts.composition);
  manifest.surfaces = manifest.surfaces.filter((surface) => surface.id !== "resume");
  manifest.unselectedProofDecisions.pop();
  const errors = validateComposition(manifest, artifacts.agency).join("\n");
  assert.match(errors, /every public route|account for the proof bank exactly/);
});

test("survivorship mutation catches historical absence overclaim", () => {
  const register = clone(artifacts.survivorship);
  const population = register.populations.find((item) => item.status === "not-recovered");
  population.boundary = "The page never existed.";
  assert.match(validateSurvivorship(register).join("\n"), /not proof of nonexistence/);
});

test("survivorship mutations preserve separate rights and non-automatic re-entry", () => {
  const register = clone(artifacts.survivorship);
  register.rightsDimensions.pop();
  register.reentryRule = "Photo leads become public claims automatically.";
  const errors = validateSurvivorship(register).join("\n");
  assert.match(errors, /Rights dimensions must remain separate and complete/);
  assert.match(errors, /block automatic claim promotion/);
});

test("mosaic review requires combinations, continuing holds, and candidate binding", () => {
  assert.deepEqual(validateMosaic(artifacts.mosaic), []);
  const mosaic = clone(artifacts.mosaic);
  mosaic.findings.pop();
  mosaic.findings[0].combination = ["one fragment"];
  let errors = validateMosaic(mosaic).join("\n");
  assert.match(errors, /at least six combination-risk findings/);
  assert.match(errors, /combination of at least two fragments/);
  errors = validateMosaic(artifacts.mosaic, {
    expectedCandidateFingerprint: "different",
    requireBinding: true
  }).join("\n");
  assert.match(errors, /not bound to the candidate fingerprint/);
});

test("operator commands reject unsafe input and remain non-promoting", () => {
  const directory = mkdtempSync(path.join(os.tmpdir(), "knowledge-intake-test-"));
  try {
    const safePath = path.join(directory, "safe.json");
    const unsafePath = path.join(directory, "unsafe.json");
    const candidate = {
      id: "INT-TEST-PUBLIC-SAFE-2099-01-01",
      receivedAt: "2099-01-01",
      kind: "claim-hypothesis",
      visibility: "public-safe",
      title: "Test candidate",
      description: "A bounded test fragment.",
      whyItMatters: "Exercises intake without creating a claim.",
      projectIds: ["test-project"],
      status: "deferred",
      disposition: "deferred-with-reason",
      dispositionNote: "Test only; no claim created.",
      sourceIds: [], claimIds: [], inquiryIds: [], correctionIds: [],
      relatedIntakeIds: [], artifactPaths: [],
      boundaries: ["Do not promote automatically."]
    };
    writeFileSync(safePath, JSON.stringify(candidate));
    writeFileSync(unsafePath, JSON.stringify({ ...candidate, id: "INT-TEST-UNSAFE-2099-01-01", description: "Private source at /Users/example/archive." }));
    const safe = spawnSync(process.execPath, ["scripts/knowledge-intake.mjs", "--validate", safePath], { encoding: "utf8" });
    assert.equal(safe.status, 0);
    assert.match(safe.stdout, /No canonical record or public claim was created/);
    const unsafe = spawnSync(process.execPath, ["scripts/knowledge-intake.mjs", "--validate", unsafePath], { encoding: "utf8" });
    assert.notEqual(unsafe.status, 0);
    assert.match(unsafe.stderr, /protected marker/);
    const invalidQuery = spawnSync(process.execPath, ["scripts/query-knowledge-lifecycle.mjs", "--view", "unbounded"], { encoding: "utf8" });
    assert.notEqual(invalidQuery.status, 0);
    assert.match(invalidQuery.stderr, /held, research, or proof-debt/);
    const report = spawnSync(process.execPath, ["scripts/report-knowledge-lifecycle.mjs", "--stdout"], { encoding: "utf8" });
    assert.equal(report.status, 0);
    assert.match(report.stdout, /Human-only blockers/);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});

test("compiled leak scanner rejects private locators, credentials, and HTML phone strings", () => {
  const directory = mkdtempSync(path.join(os.tmpdir(), "knowledge-leak-test-"));
  try {
    const html = path.join(directory, "page.html");
    const json = path.join(directory, "registry.json");
    writeFileSync(html, "<p>Call 212-555-0199</p>");
    const credentialKey = ["api", "key"].join("_");
    writeFileSync(json, JSON.stringify({ path: "/Volumes/private/archive", [credentialKey]: "fixture-value-12345" }));
    const result = scanCompiledLifecycleLeaks([directory]);
    assert.match(result.failures.join("\n"), /machine-local path/);
    assert.match(result.failures.join("\n"), /credential marker/);
    assert.match(result.failures.join("\n"), /phone-like string/);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});

test("human gates cannot be replaced by automated approval", () => {
  const state = clone(artifacts.state);
  state.humanGates["PR-019"] = "ai-approved";
  const blind = clone(artifacts.blindStatus);
  blind.evals["PR-019"].status = "ai-approved";
  assert.match(validateHumanState(state, blind).join("\n"), /cannot use automated approval/);
});

test("holdout validation rejects self-grading and candidate drift", () => {
  const suite = clone(artifacts.suite);
  const state = {
    ...clone(artifacts.state),
    optimizerIdentity: "optimizer",
    candidateSha: "a".repeat(40)
  };
  const scores = suite.evals.map((entry) => ({ id: entry.id, score: 4, rationale: "fixture", evidencePaths: ["fixture"] }));
  const baseReceipt = {
    version: 1,
    judgeRole: "read-only-independent",
    authoredPatch: false,
    sawOptimizationHistory: false,
    candidateSha: state.candidateSha,
    contractFingerprint: "contract",
    candidateFingerprint: "candidate",
    scores,
    criticalRegressions: [],
    decision: "pass_for_code_review"
  };
  const receipts = [
    { ...baseReceipt, judgeIdentity: "optimizer" },
    { ...baseReceipt, judgeIdentity: "judge-2", candidateFingerprint: "different" }
  ];
  const result = validateHoldouts({ suite, state, receipts, expectedContractFingerprint: "contract", expectedCandidateFingerprint: "candidate" });
  assert.match(result.errors.join("\n"), /Optimizer may not grade|different candidate fingerprint/);
});

test("missing holdouts normalize to zero instead of an accidental pass", () => {
  const suite = clone(artifacts.suite);
  const state = { ...clone(artifacts.state), candidateSha: "a".repeat(40) };
  const result = validateHoldouts({
    suite,
    state,
    receipts: [],
    expectedContractFingerprint: "contract",
    expectedCandidateFingerprint: "candidate"
  });
  assert.equal(result.weightedScore, 0);
  assert.equal(result.conservativeScores["CI-001"], 0);
  assert.match(result.errors.join("\n"), /Exactly two independent holdout receipts|CI-001 conservative score is below 3/);
});

test("pre-holdout composite artifacts pass all implementation structure checks", () => {
  const result = validateCompositeArtifacts(artifacts, { requireHoldouts: false });
  assert.deepEqual(result.errors, []);
});
