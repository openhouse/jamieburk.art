import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import { proofClaims } from "../../apps/www/src/data/proofs.ts";
import {
  readCompositeArtifacts,
  validateAgency,
  validateCandidateGitBinding,
  validateCompositeArtifacts,
  validateComposition,
  validateCompositionSourceBindings,
  validateHumanState,
  validateHoldouts,
  validateMosaic,
  validatePublicAgencySurfaceWording,
  validateSuite,
  validateSurvivorship
} from "../lib/knowledge-composite-validation.mjs";
import { scanCompiledLifecycleLeaks } from "../check-compiled-lifecycle-leaks.mjs";
import {
  validateIntakeCandidateReferences,
  validateOperatorGraph
} from "../lib/knowledge-operator-validation.mjs";

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

test("contract mutation catches missing donor decisions", () => {
  const suite = clone(artifacts.suite);
  delete suite.donors_inspected[0].rejected;
  assert.match(validateSuite(suite).join("\n"), /Donor A needs a rejected decision/);
});

test("contract mutation catches an unbound composition render path", () => {
  const suite = clone(artifacts.suite);
  suite.candidate_fingerprint_scope = suite.candidate_fingerprint_scope.filter(
    (relativePath) => relativePath !== "apps/www/src/app/work/page.tsx"
  );
  assert.match(
    validateSuite(suite).join("\n"),
    /Candidate fingerprint scope must include apps\/www\/src\/app\/work\/page\.tsx/
  );
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

test("agency mutation catches public wording causality, title, and endorsement drift", () => {
  const proofs = clone(proofClaims);
  proofs[0].publicWording =
    "Jamie single-handedly served as executive director and was officially endorsed by the city.";
  const errors = validateAgency(artifacts.agency, proofs, knowledgeBank).join("\n");
  assert.match(errors, /public wording contains sole-causality or unsupported-title drift/);
  assert.match(errors, /public wording contains institutional-endorsement drift/);
});

test("public route mutation catches causality, title, and endorsement drift", () => {
  const target = "apps/www/src/app/work/page.tsx";
  const errors = validatePublicAgencySurfaceWording((relativePath) => {
    const source = readFileSync(relativePath, "utf8");
    return relativePath === target
      ? `${source}\nJamie single-handedly served as the executive director and was officially endorsed by the city.\n`
      : source;
  }).join("\n");
  assert.match(errors, /public sole-causality or unsupported-title drift/);
  assert.match(errors, /public institutional-endorsement drift/);
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

test("composition mutation catches rendered proof and direct-projection drift", () => {
  const manifest = clone(artifacts.composition);
  const surface = manifest.surfaces.find((item) => item.id === "technical-operations");
  surface.selectedProofIds = surface.selectedProofIds.filter((id) => id !== "kc-spaces-fund-digital-infrastructure");
  surface.selectedClaimProjectionKeys.pop();
  const errors = validateComposition(manifest, artifacts.agency).join("\n");
  assert.match(errors, /proof selection must match the public composition registry exactly/);
  assert.match(errors, /direct claim projections must match the public composition registry exactly/);
});

test("composition budget counts proofs and direct projections", () => {
  const manifest = clone(artifacts.composition);
  const surface = manifest.surfaces.find((item) => item.id === "technical-operations");
  surface.claimBudget = surface.selectedProofIds.length;
  assert.match(validateComposition(manifest, artifacts.agency).join("\n"), /exceeds its claim budget/);
});

test("composition render paths stay bound to canonical selectors", () => {
  assert.deepEqual(validateCompositionSourceBindings(), []);
  const errors = validateCompositionSourceBindings((relativePath) => {
    const source = readFileSync(relativePath, "utf8");
    return relativePath === "apps/www/src/app/work/page.tsx"
      ? source.replaceAll("requireReadyOrCarefulProof", "unboundProof")
      : source;
  });
  assert.match(errors.join("\n"), /work-index render path is not bound/);
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

test("survivorship mutations catch population, status, project, and inquiry drift", () => {
  const register = clone(artifacts.survivorship);
  register.populations.pop();
  register.populations[0].project = "not-a-project";
  register.populations[0].inquiryId = "INQ-NOT-REAL";
  const errors = validateSurvivorship(register).join("\n");
  assert.match(errors, /reviewed exact set/);
  assert.match(errors, /represent every canonical status/);
  assert.match(errors, /unknown project/);
  assert.match(errors, /unknown inquiry/);
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
    const unknownPath = path.join(directory, "unknown.json");
    const candidate = {
      id: "INT-TEST-PUBLIC-SAFE-2099-01-01",
      receivedAt: "2099-01-01",
      kind: "claim-hypothesis",
      visibility: "public-safe",
      title: "Test candidate",
      description: "A bounded test fragment.",
      whyItMatters: "Exercises intake without creating a claim.",
      projectIds: ["callnyc"],
      status: "deferred",
      disposition: "deferred-with-reason",
      dispositionNote: "Test only; no claim created.",
      sourceIds: [], claimIds: [], inquiryIds: [], correctionIds: [],
      relatedIntakeIds: [], artifactPaths: [],
      boundaries: ["Do not promote automatically."]
    };
    writeFileSync(safePath, JSON.stringify(candidate));
    writeFileSync(unsafePath, JSON.stringify({ ...candidate, id: "INT-TEST-UNSAFE-2099-01-01", description: "Private source at /Users/example/archive." }));
    writeFileSync(unknownPath, JSON.stringify({ ...candidate, id: "INT-TEST-UNKNOWN-2099-01-01", sourceIds: ["SRC-NOT-REAL"] }));
    const safe = spawnSync(process.execPath, ["scripts/knowledge-intake.mjs", "--validate", safePath], { encoding: "utf8" });
    assert.equal(safe.status, 0);
    assert.match(safe.stdout, /No canonical record or public claim was created/);
    const unsafe = spawnSync(process.execPath, ["scripts/knowledge-intake.mjs", "--validate", unsafePath], { encoding: "utf8" });
    assert.notEqual(unsafe.status, 0);
    assert.match(unsafe.stderr, /protected marker/);
    const unknown = spawnSync(process.execPath, ["scripts/knowledge-intake.mjs", "--validate", unknownPath], { encoding: "utf8" });
    assert.notEqual(unknown.status, 0);
    assert.match(unknown.stderr, /unknown ID/);
    const invalidQuery = spawnSync(process.execPath, ["scripts/query-knowledge-lifecycle.mjs", "--view", "unbounded"], { encoding: "utf8" });
    assert.notEqual(invalidQuery.status, 0);
    assert.match(invalidQuery.stderr, /held, research, or proof-debt/);
    const report = spawnSync(process.execPath, ["scripts/report-knowledge-lifecycle.mjs", "--stdout"], { encoding: "utf8" });
    assert.equal(report.status, 0);
    assert.match(report.stdout, /Human-only blockers/);

    const queryFixtures = [
      ["text", ["CallNYC"]],
      ["id", ["--id", proofClaims[0].id]],
      ["project", ["--project", knowledgeBank.claims[0].project]],
      ["status", ["--status", knowledgeBank.claims[0].status]],
      ["source", ["--source", knowledgeBank.sources[0].id]],
      ["inquiry", ["--inquiry", knowledgeBank.researchInquiries[0].id]],
      ["projection", ["--projection", knowledgeBank.claims[0].projections[0].surfaces[0]]],
      ["evidence-class", ["--evidence-class", proofClaims[0].evidenceClass[0]]],
      ["view-held", ["--view", "held"]],
      ["view-research", ["--view", "research"]],
      ["view-proof-debt", ["--view", "proof-debt"]]
    ];
    for (const [label, queryArgs] of queryFixtures) {
      const result = spawnSync(
        process.execPath,
        ["scripts/query-knowledge-lifecycle.mjs", ...queryArgs],
        { encoding: "utf8" }
      );
      assert.equal(result.status, 0, `${label}: ${result.stderr}`);
      const payload = JSON.parse(result.stdout);
      assert.ok(Array.isArray(payload.results), `${label} must return bounded results`);
      assert.ok(payload.results.length <= 100, `${label} exceeded its result cap`);
      assert.doesNotMatch(
        result.stdout,
        /protectedLocatorId|internalExcerpt|artifactPaths|privateUrl/i,
        `${label} leaked a protected output field`
      );
    }
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});

test("operator validation rejects broken canonical graphs and unknown references", () => {
  const brokenBank = clone(knowledgeBank);
  brokenBank.intake[0].sourceIds.push("SRC-NOT-REAL");
  assert.match(validateOperatorGraph(brokenBank, proofClaims).join("\n"), /unknown source/);
  const candidate = {
    projectIds: ["PROJECT-NOT-REAL"],
    sourceIds: ["SRC-NOT-REAL"],
    claimIds: [], inquiryIds: [], correctionIds: [], relatedIntakeIds: []
  };
  const errors = validateIntakeCandidateReferences(candidate).join("\n");
  assert.match(errors, /unknown project/);
  assert.match(errors, /unknown ID/);
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
    evaluatedAt: "2026-07-17",
    scores,
    criticalRegressions: [],
    instrumentDefects: [],
    decision: "pass_for_code_review"
  };
  const receipts = [
    { ...baseReceipt, judgeIdentity: "optimizer" },
    { ...baseReceipt, judgeIdentity: "judge-2", candidateFingerprint: "different" }
  ];
  const result = validateHoldouts({ suite, state, receipts, expectedContractFingerprint: "contract", expectedCandidateFingerprint: "candidate" });
  assert.match(result.errors.join("\n"), /Optimizer may not grade|different candidate fingerprint/);
});

test("holdout validation rejects duplicate criterion scores", () => {
  const suite = clone(artifacts.suite);
  const state = { ...clone(artifacts.state), candidateSha: "a".repeat(40) };
  const scores = suite.evals.map((entry) => ({ id: entry.id, score: 4, rationale: "fixture", evidencePaths: ["fixture"] }));
  scores.push({ ...scores[0] });
  const receipt = {
    version: 1,
    judgeIdentity: "judge-1",
    judgeRole: "read-only-independent",
    authoredPatch: false,
    sawOptimizationHistory: false,
    candidateSha: state.candidateSha,
    contractFingerprint: "contract",
    candidateFingerprint: "candidate",
    scores,
    criticalRegressions: [],
    instrumentDefects: [],
    evaluatedAt: "2026-07-17",
    decision: "pass_for_code_review"
  };
  const result = validateHoldouts({
    suite,
    state,
    receipts: [receipt, { ...receipt, judgeIdentity: "judge-2" }],
    expectedContractFingerprint: "contract",
    expectedCandidateFingerprint: "candidate"
  });
  assert.match(result.errors.join("\n"), /score each eval exactly once/);
});

test("holdout validation rejects stale dates, unresolved defects, and invented evidence", () => {
  const suite = clone(artifacts.suite);
  const state = { ...clone(artifacts.state), candidateSha: "a".repeat(40) };
  const scores = suite.evals.map((entry) => ({ id: entry.id, score: 4, rationale: "fixture", evidencePaths: ["fixture"] }));
  const receipt = {
    version: 1,
    judgeIdentity: "judge-1",
    judgeRole: "read-only-independent",
    authoredPatch: false,
    sawOptimizationHistory: false,
    candidateSha: state.candidateSha,
    contractFingerprint: "contract",
    candidateFingerprint: "candidate",
    evaluatedAt: "not-a-date",
    scores: [{ ...scores[0], evidencePaths: ["../invented"] }, ...scores.slice(1)],
    criticalRegressions: [],
    instrumentDefects: ["unresolved"],
    decision: "pass_for_code_review"
  };
  const result = validateHoldouts({
    suite,
    state,
    receipts: [receipt, { ...receipt, judgeIdentity: "judge-2", evaluatedAt: "2026-07-17" }],
    expectedContractFingerprint: "contract",
    expectedCandidateFingerprint: "candidate",
    evidencePathExists: (relativePath) => relativePath === "fixture"
  });
  const errors = result.errors.join("\n");
  assert.match(errors, /ISO evaluation date/);
  assert.match(errors, /outside the candidate commit/);
  assert.match(errors, /unresolved evaluator defect/);
  assert.match(errors, /share one evaluation date/);
});

test("holdout validation requires exact receipt paths and explicit empty defect arrays", () => {
  const suite = clone(artifacts.suite);
  const state = { ...clone(artifacts.state), candidateSha: "a".repeat(40) };
  const scores = suite.evals.map((entry) => ({
    id: entry.id,
    score: 4,
    rationale: "fixture",
    evidencePaths: ["fixture"]
  }));
  const receipt = {
    version: 1,
    judgeIdentity: "judge-1",
    judgeRole: "read-only-independent",
    authoredPatch: false,
    sawOptimizationHistory: false,
    candidateSha: state.candidateSha,
    contractFingerprint: "contract",
    candidateFingerprint: "candidate",
    evaluatedAt: "2026-07-17",
    scores,
    criticalRegressions: [],
    decision: "pass_for_code_review"
  };
  const result = validateHoldouts({
    suite,
    state,
    receipts: [receipt, { ...receipt, judgeIdentity: "judge-2" }],
    receiptPaths: ["../holdout-1.json", "docs/evals/runs/other.json"],
    expectedContractFingerprint: "contract",
    expectedCandidateFingerprint: "candidate",
    evidencePathExists: () => true
  });
  const errors = result.errors.join("\n");
  assert.match(errors, /evaluator-owned exact set/);
  assert.match(errors, /escapes the repository/);
  assert.match(errors, /receipt must use the exact schema/);
  assert.match(errors, /instrumentDefects must be an array/);
});

test("candidate binding rejects arbitrary SHAs and post-candidate implementation drift", () => {
  const state = {
    ...clone(artifacts.state),
    candidateSha: "a".repeat(40),
    allowedPostCandidatePaths: [
      "docs/evals/knowledge-composite-integration-state.json",
      "docs/evals/runs/2026-07-16-knowledge-composite-integration.md",
      "docs/evals/runs/2026-07-16-knowledge-composite-holdout-1.json",
      "docs/evals/runs/2026-07-16-knowledge-composite-holdout-2.json"
    ]
  };
  let errors = validateCandidateGitBinding(state, {
    headSha: "b".repeat(40),
    commitExists: false,
    candidateIsAncestor: false,
    changedPaths: [],
    candidateChangedPaths: [],
    candidateFingerprint: ""
  }, "candidate").join("\n");
  assert.match(errors, /does not resolve to a Git commit/);
  assert.match(errors, /must be an ancestor/);

  errors = validateCandidateGitBinding(state, {
    headSha: "b".repeat(40),
    commitExists: true,
    candidateIsAncestor: true,
    candidateChangedPaths: ["scripts/lib/knowledge-composite-validation.mjs"],
    candidateFingerprint: "candidate",
    changedPaths: [
      "docs/evals/knowledge-composite-integration-state.json",
      "scripts/lib/knowledge-composite-validation.mjs"
    ]
  }, "candidate").join("\n");
  assert.match(errors, /exceed the evidence-only allowlist/);

  errors = validateCandidateGitBinding(state, {
    headSha: "b".repeat(40),
    commitExists: true,
    candidateIsAncestor: true,
    candidateChangedPaths: ["scripts/lib/knowledge-composite-validation.mjs"],
    candidateFingerprint: "candidate",
    changedPaths: [],
    historyChangedPaths: ["scripts/lib/knowledge-composite-validation.mjs"],
    mergeCommits: []
  }, "candidate").join("\n");
  assert.match(errors, /exceed the evidence-only allowlist/);

  errors = validateCandidateGitBinding(state, {
    headSha: "b".repeat(40),
    commitExists: true,
    candidateIsAncestor: true,
    candidateChangedPaths: ["docs/evals/knowledge-composite-integration-state.json"],
    candidateFingerprint: "different",
    changedPaths: []
  }, "candidate").join("\n");
  assert.match(errors, /implementation-changing commit/);
  assert.match(errors, /reproduce from the named Git commit tree/);
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
