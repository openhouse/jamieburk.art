import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
  detectSemanticMutation,
  evaluateBranchLedger,
  evaluateGovernance,
  evaluateReviewability,
  evaluateSemanticFixtures,
  findPrivatePaths,
  isFingerprintBoundPath,
  scoreRubrics,
  validateCompositeSuite,
  validateJudgments
} from "../lib/composite-integration-evals.mjs";

const suite = JSON.parse(readFileSync("evals/composite-integration/suite.json", "utf8"));
const fixtures = JSON.parse(readFileSync(suite.semanticFixturePath, "utf8"));

test("composite v4 contract pins A through N and binds every hard-gate input", () => {
  assert.deepEqual(validateCompositeSuite(suite), []);
  assert.equal(suite.version, 4);
  assert.equal(suite.frozenBranches.length, 14);
  assert.equal(suite.rubrics.reduce((total, item) => total + item.weight, 0), 100);
  assert.ok(suite.contractPaths.includes(suite.ledgerPath));
  assert.ok(suite.contractPaths.includes(suite.governancePath));
  assert.ok(suite.candidatePaths.some((item) => suite.historyPath.startsWith(`${item}/`)));
  const unbound = structuredClone(suite);
  unbound.contractPaths = unbound.contractPaths.filter((item) => item !== suite.ledgerPath);
  assert.match(validateCompositeSuite(unbound).join("\n"), /branch-family-inventory\.json/);
});

test("reviewability includes only candidate- or contract-bound paths", () => {
  assert.equal(isFingerprintBoundPath(suite.ledgerPath, suite), true);
  assert.equal(isFingerprintBoundPath(suite.governancePath, suite), true);
  assert.equal(isFingerprintBoundPath(suite.historyPath, suite), true);
  assert.equal(isFingerprintBoundPath("evals/portfolio-readiness/judgments/application_ready/hiring-manager.json", suite), true);
  assert.equal(isFingerprintBoundPath("evals/composite-integration/judgments/archival-editorial.json", suite), false);
  assert.equal(isFingerprintBoundPath("evals/composite-integration/evidence/certification.json", suite), false);
  assert.equal(isFingerprintBoundPath("docs/evals/runs/feature-knowledge-c-composite.md", suite), false);
});

test("branch accounting requires exact frozen SHAs and dispositions", () => {
  const ledger = {
    version: 1,
    branches: suite.frozenBranches.map((item) => ({
      branch: item.branch,
      sourceCommit: item.sha,
      decisions: [{
        capability: "test capability",
        disposition: "deduplicate",
        reason: "Already present",
        verification: ["test"]
      }]
    }))
  };
  assert.equal(evaluateBranchLedger(suite, ledger).passed, true);
  ledger.branches[0].sourceCommit = "0".repeat(40);
  assert.equal(evaluateBranchLedger(suite, ledger).frozenSourcePassed, false);
  ledger.branches.pop();
  assert.equal(evaluateBranchLedger(suite, ledger).accountingPassed, false);
});

test("every required semantic mutation is rejected", () => {
  const result = evaluateSemanticFixtures(suite, fixtures);
  assert.equal(result.passed, true, result.findings.join("\n"));
  for (const fixture of fixtures) assert.equal(detectSemanticMutation(fixture), fixture.expectedCode);
});

test("private paths are rejected from public-safe integration evidence", () => {
  assert.deepEqual(findPrivatePaths({ safe: { locator: "opaque-artifact-id" } }), []);
  assert.deepEqual(findPrivatePaths({ unsafe: "/private/tmp/source" }), ["unsafe"]);
  assert.deepEqual(findPrivatePaths({ unsafe: "/Users/example/archive" }), ["unsafe"]);
});

test("candidate-bound judgments reject stale candidate and contract hashes", () => {
  const candidate = "sha256:candidate";
  const contract = "sha256:contract";
  const judgments = ["archival", "composition"].map((lens, index) => ({
    suite: suite.id,
    candidate,
    contract,
    judgeId: `judge-${index}`,
    lens,
    status: "pass",
    regressions: []
  }));
  assert.equal(validateJudgments({ judgments, suite, candidate, contract }).passed, true);
  judgments[0].candidate = "sha256:stale";
  assert.equal(validateJudgments({ judgments, suite, candidate, contract }).passed, false);
  judgments[0].candidate = candidate;
  judgments[1].contract = "sha256:stale";
  assert.equal(validateJudgments({ judgments, suite, candidate, contract }).passed, false);
});

test("governance keeps human and operational approvals externally evidenced", () => {
  const governance = {
    layers: suite.requiredGovernanceLayers.map((id) => ({
      id,
      status: ["human-reader", "rights-review", "production", "jamie-approval"].includes(id) ? "blocked" : "pass",
      evidence: "Explicit current disposition"
    }))
  };
  assert.equal(evaluateGovernance(suite, governance).passed, true);
  governance.layers.find((item) => item.id === "human-reader").status = "pass";
  assert.equal(evaluateGovernance(suite, governance).passed, false);
});

test("reviewability measures the integration delta independently", () => {
  const within = { changedFiles: 12, addedLines: 1800, maximumSingleFileAddedLines: 400, largestAddedFile: "file" };
  assert.equal(evaluateReviewability(within, suite.reviewabilityThresholds).passed, true);
  const oversized = { ...within, changedFiles: 51 };
  assert.equal(evaluateReviewability(oversized, suite.reviewabilityThresholds).passed, false);
});

test("rubric scoring fails closed with its governing gate", () => {
  const passingGates = Object.fromEntries(suite.requiredHardGates.map((id) => [id, { status: "pass" }]));
  assert.equal(scoreRubrics(suite, passingGates).weightedScore, 100);
  passingGates.canonical_architecture.status = "fail";
  const result = scoreRubrics(suite, passingGates);
  assert.equal(result.scores.architectural_coherence, 2);
  assert.ok(result.weightedScore < 100);
});
