import assert from "node:assert/strict";
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
  validateSuite,
  validateSurvivorship
} from "../lib/knowledge-composite-validation.mjs";

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
