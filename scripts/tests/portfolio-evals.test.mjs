import assert from "node:assert/strict";
import test from "node:test";
import {
  evaluatePortfolioEffectiveness,
  loadPortfolioEvalSuite,
  validatePortfolioEvalSuite
} from "../lib/portfolio-evals.mjs";

const loaded = loadPortfolioEvalSuite();
const suite = loaded.suite;
const evidence = loaded.evidence;
const clone = (value) => structuredClone(value);
const criterion = (result, id) => result.criteria.find((item) => item.criterionId === id);

test("portfolio-effectiveness suite defines exactly seven valid criteria", () => {
  assert.deepEqual(validatePortfolioEvalSuite(suite, evidence), []);
  assert.equal(suite.criteria.length, 7);
});

test("current evidence meets every local floor without hiding external gates", () => {
  const result = evaluatePortfolioEffectiveness(suite, evidence);
  assert.equal(result.accepted, true);
  assert.equal(result.weightedScore, 3.88);
  assert.deepEqual(result.belowMinimum, []);
  assert.equal(result.externalGates.length, 5);
});

test("LLM or automated review cannot become a real reader session", () => {
  const changed = clone(evidence);
  changed.readerValidation.humanSessions = Array.from({ length: 5 }, (_, index) => ({
    sessionId: `SIM-${index + 1}`,
    reviewerClass: "LLM simulation",
    performedAt: "2026-07-15",
    comprehensionPassed: true,
    noPersonalData: false
  }));
  const result = evaluatePortfolioEffectiveness(suite, changed);
  assert.equal(criterion(result, "PE-EVAL-READER-VALIDATION").score, 4);
});

test("real reader completion requires five privacy-safe aggregate records", () => {
  const changed = clone(evidence);
  changed.readerValidation.humanSessions = Array.from({ length: 5 }, (_, index) => ({
    sessionId: `HUMAN-${index + 1}`,
    reviewerClass: "hiring reader",
    performedAt: "2026-07-15",
    comprehensionPassed: true,
    noPersonalData: true
  }));
  const result = evaluatePortfolioEffectiveness(suite, changed);
  assert.equal(criterion(result, "PE-EVAL-READER-VALIDATION").score, 5);
});

test("self-assertion cannot become collaborator corroboration", () => {
  const changed = clone(evidence);
  changed.collaboratorProof.receivedProofNotes = evidence.collaboratorProof.targets.map((target) => ({
    targetId: target.id,
    permissionState: "public-paraphrase-approved",
    receivedAt: "2026-07-15",
    publicSafeSummary: "Jamie remembers doing this work.",
    boundaries: []
  }));
  const result = evaluatePortfolioEffectiveness(suite, changed);
  assert.equal(criterion(result, "PE-EVAL-COLLABORATOR-PROOF").score, 3);
});

test("an operating sequence fails when its evidence reference is unknown", () => {
  const changed = clone(evidence);
  changed.operatingSequences[0].evidenceRefs[0] = "proof:invented-proof";
  const result = evaluatePortfolioEffectiveness(suite, changed);
  assert.equal(criterion(result, "PE-EVAL-OPERATING-SEQUENCES").score, 1);
  assert.equal(result.accepted, false);
});

test("a recent proposal cannot be represented as delivered client work", () => {
  const changed = clone(evidence);
  changed.recentPractice[1].boundary = "A client pilot was delivered and adopted.";
  const result = evaluatePortfolioEffectiveness(suite, changed);
  assert.equal(criterion(result, "PE-EVAL-RECENT-PRACTICE").score, 1);
});

test("pending visual candidates cannot count as cleared artifacts", () => {
  const changed = clone(evidence);
  changed.visualEvidence.clearedArtifacts.push({
    ...changed.visualEvidence.selectionQueue[0],
    path: "apps/www/public/artifacts/callnyc/callnyc-project-mark.png",
    route: "/work/kc-town-hall",
    sourceId: "SRC-CALLNYC-PROJECT-MARK",
    boundary: "This is still awaiting project-specific rights and collaborator review."
  });
  const result = evaluatePortfolioEffectiveness(suite, changed);
  assert.equal(criterion(result, "PE-EVAL-VISUAL-EVIDENCE").score, 3);
});

test("a different production SHA cannot satisfy exact-candidate release", () => {
  const changed = clone(evidence);
  changed.exactShaRelease.verifiedCandidate = {
    sha: "a".repeat(40),
    localChecksPassed: true,
    dockerPassed: true,
    stagingUrl: "https://staging.jamieburk.art",
    accessibilityPassed: true,
    jamieApproved: true
  };
  changed.exactShaRelease.productionVerification = {
    sha: "b".repeat(40),
    smokeChecksPassed: true,
    productionUrl: "https://jamieburk.art"
  };
  const result = evaluatePortfolioEffectiveness(suite, changed);
  assert.equal(criterion(result, "PE-EVAL-EXACT-SHA-RELEASE").score, 4);
});

test("maintenance rejects removal of the anti-self-certification rule", () => {
  const changed = clone(evidence);
  changed.maintenance.changePolicy = changed.maintenance.changePolicy.filter(
    (item) => !item.includes("evaluator's own assertion")
  );
  const result = evaluatePortfolioEffectiveness(suite, changed);
  assert.equal(criterion(result, "PE-EVAL-MAINTAINABILITY").score, 1);
  assert.equal(result.accepted, false);
});

test("private local paths fail suite validation", () => {
  const changed = clone(evidence);
  changed.visualEvidence.selectionQueue[0].artifactClass = "/Users/jamie/private/photo.jpg";
  assert.match(
    validatePortfolioEvalSuite(suite, changed).join("\n"),
    /private local path/
  );
});
