import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import {
  evaluateArchiveDenominators,
  evaluateDecisiveNarrative,
  evaluateHumanReaderValidation,
  evaluateProductionRelease,
  evaluatePromotionDiscipline,
  evaluateReviewability,
  evaluateRoleAttribution,
  evaluateVisualEvidence,
  matureUnusedClaims,
  profileBlindSpotResults,
  promotionCandidateFingerprint,
  validateBlindSpotSuite
} from "../lib/blind-spot-evals.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const suite = JSON.parse(readFileSync(path.join(repoRoot, "evals/blind-spots/suite.json"), "utf8"));

test("blind-spot suite defines eight valid evaluations and two profiles", () => {
  assert.deepEqual(validateBlindSpotSuite(suite), []);
  assert.equal(suite.evaluations.length, 8);
});

test("missing visual review remains blocked rather than inferred from artifact language", () => {
  const result = evaluateVisualEvidence({ suite, evidence: null, candidate: "sha256:a" });
  assert.equal(result.status, "blocked");
});

test("visual closure requires every priority project and approved claim-bound artifacts", () => {
  const artifacts = Array.from({ length: 2 }, (_, index) => ({
    id: `artifact-${index}`,
    rightsStatus: "approved",
    safetyStatus: "approved",
    context: "Shows actual project work.",
    alt: "Project artifact",
    claimIds: ["claim-a"],
    publicPath: `/artifact-${index}.jpg`
  }));
  const evidence = {
    candidate: "sha256:a",
    projects: suite.targets.visualProjects.map((projectId) => ({ projectId, artifacts }))
  };
  const result = evaluateVisualEvidence({
    suite,
    evidence,
    candidate: "sha256:a",
    fileExists: () => true
  });
  assert.equal(result.status, "pass");

  evidence.projects[0].artifacts[0].rightsStatus = "unknown";
  assert.equal(
    evaluateVisualEvidence({ suite, evidence, candidate: "sha256:a", fileExists: () => true }).status,
    "fail"
  );
});

test("decisive narrative requires role, fit, reader effort, Chad lens, and gates", () => {
  const report = {
    candidate: "sha256:a",
    weightedScore: 86.5,
    scores: { role_clarity: 4, role_fit: 4, reader_effort: 3, chad_lens: 3 },
    hardGates: {
      application_path: { status: "pass" },
      model_judgment: { status: "pass" },
      chad_lens_review: { status: "pass" }
    }
  };
  assert.equal(evaluateDecisiveNarrative({ portfolioReport: report }).status, "pass");
  report.scores.role_clarity = 2;
  assert.equal(evaluateDecisiveNarrative({ portfolioReport: report }).status, "partial");
});

test("open role inquiries remain partial and cannot leak immature projections", () => {
  const result = evaluateRoleAttribution({ suite, knowledgeBank });
  assert.equal(result.status, "partial");
  assert.equal(result.findings.length, 4);
  assert.ok(result.findings.some((finding) => finding.includes("INQ-NYCARTC-OFFICE-NIGHTLIFE-ROLE")));
  assert.ok(result.evidence.includes("INQ-CALLNYC-COUNCIL-ACCOUNT-ENGAGEMENT: recovered"));

  const mutated = structuredClone(knowledgeBank);
  const openId = suite.targets.roleInquiries[0];
  mutated.claims.push({
    id: "MUTATED-ROLE-CLAIM",
    status: "inference",
    researchInquiryIds: [openId],
    projections: [{ status: "active" }]
  });
  assert.equal(evaluateRoleAttribution({ suite, knowledgeBank: mutated }).status, "fail");
});

test("every social corpus preserves a recoverable denominator and material gaps", () => {
  assert.equal(evaluateArchiveDenominators({ suite, knowledgeBank }).status, "pass");
  const mutated = structuredClone(knowledgeBank);
  const source = mutated.sources.find((item) => item.id === suite.targets.socialCorpusSources[0]);
  source.doesNotEstablish = [];
  assert.equal(evaluateArchiveDenominators({ suite, knowledgeBank: mutated }).status, "fail");
});

test("human-reader closure requires five anonymous candidate-bound sessions", () => {
  assert.equal(evaluateHumanReaderValidation({ suite, evidence: null, candidate: "sha256:a" }).status, "blocked");
  const sessions = Array.from({ length: 5 }, (_, index) => ({
    id: `reader-${index + 1}`,
    roleFamily: "public-interest implementation",
    tasks: { role: "answer", work: "answer", outcome: "answer" },
    interviewInterest: true
  }));
  assert.equal(
    evaluateHumanReaderValidation({ suite, evidence: { candidate: "sha256:a", sessions }, candidate: "sha256:a" }).status,
    "pass"
  );
});

test("reviewability fails oversized diffs unless an exact-head decomposition is approved", () => {
  const stats = {
    changedFiles: 91,
    addedLines: 26864,
    maximumSingleFileAddedLines: 2883,
    paths: ["a", "b"]
  };
  assert.equal(evaluateReviewability({ suite, stats, evidence: null, headSha: "abc" }).status, "fail");
  const evidence = {
    headSha: "abc",
    approved: true,
    reviewUnits: [
      { title: "one", paths: ["a"], changedFiles: 1, addedLines: 5000, maximumSingleFileAddedLines: 1000 },
      { title: "two", paths: ["b"], changedFiles: 1, addedLines: 5000, maximumSingleFileAddedLines: 1000 }
    ]
  };
  assert.equal(evaluateReviewability({ suite, stats, evidence, headSha: "abc" }).status, "pass");
});

test("production closure requires every exact-commit attestation", () => {
  assert.equal(evaluateProductionRelease({ env: {}, headSha: "abc" }).status, "blocked");
  const env = {
    EVAL_EXPECTED_SHA: "abc",
    EVAL_DEPLOYED_SHA: "abc",
    EVAL_PRODUCTION_SMOKE: "pass",
    EVAL_ROLLBACK_READY: "true",
    EVAL_PRODUCTION_INDEXING: "pass",
    EVAL_STAGING_NOINDEX: "pass",
    EVAL_HUMAN_APPROVAL: "approved"
  };
  assert.equal(evaluateProductionRelease({ env, headSha: "abc" }).status, "pass");
});

test("promotion discipline inventories every mature unused claim without auto-publishing it", () => {
  const claims = matureUnusedClaims(knowledgeBank);
  const candidate = promotionCandidateFingerprint(claims);
  const missing = evaluatePromotionDiscipline({ suite, knowledgeBank, evidence: null });
  assert.equal(missing.status, "partial");
  assert.equal(missing.findings.length, claims.length);

  const evidence = {
    candidate,
    decisions: claims.map((claim) => ({
      claimId: claim.id,
      decision: "defer",
      rationale: "Not selected for the current hiring argument.",
      reviewedAt: "2026-07-15"
    }))
  };
  assert.equal(
    evaluatePromotionDiscipline({ suite, knowledgeBank, evidence, now: new Date("2026-07-15T12:00:00Z") }).status,
    "pass"
  );
});

test("diagnostic completion can pass while closure remains honestly open", () => {
  const results = suite.evaluations.map((evaluation, index) => ({
    id: evaluation.id,
    status: index === 0 ? "blocked" : "pass",
    summary: "Current evidence disposition."
  }));
  const diagnostic = profileBlindSpotResults({ suite, profileId: "diagnostic", results });
  const closure = profileBlindSpotResults({ suite, profileId: "closure", results });
  assert.equal(diagnostic.passed, true);
  assert.equal(diagnostic.closurePassed, false);
  assert.equal(closure.passed, false);
  assert.deepEqual(closure.closureFailures, [suite.evaluations[0].id]);
});
