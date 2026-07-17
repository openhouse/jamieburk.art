import assert from "node:assert/strict";
import test from "node:test";
import {
  detectSemanticRisks,
  evaluateComposite,
  repoRoot,
  validateCollectiveCreditPolicy,
  validateDonorDispositions,
  validateSurfaceBindings
} from "../lib/composite-integration.mjs";
import donorDispositions from "../../evals/composite-integration/donor-dispositions.json" with { type: "json" };

test("all frozen A-N donors have explicit dispositions", () => {
  assert.deepEqual(validateDonorDispositions(donorDispositions), []);
});

test("donor deletion and head drift fail closed", () => {
  const missing = structuredClone(donorDispositions);
  missing.donors = missing.donors.filter(
    (donor) => donor.branch !== "feature/evals-H"
  );
  assert.match(validateDonorDispositions(missing).join(" "), /evals-H/);

  const drifted = structuredClone(donorDispositions);
  drifted.donors[0].head = "00000000";
  assert.match(validateDonorDispositions(drifted).join(" "), /3757c4f5/);
});

test("collective-credit policy fails closed when a project disappears", () => {
  const missingPolicy = { version: 1, projects: [] };
  assert.match(
    validateCollectiveCreditPolicy(missingPolicy).join(" "),
    /missing/i
  );
});

test("surface policy fails closed when a route disappears", () => {
  const missingPolicy = { version: 1, routes: [] };
  assert.match(validateSurfaceBindings(missingPolicy).join(" "), /missing/i);
});

test("semantic guard rejects common overclaim mutations", () => {
  for (const statement of [
    "Jamie single-handedly caused the law to pass.",
    "Jamie alone founded the collective and organized every event.",
    "The appropriation means receipt and disbursement.",
    "This is the complete lifetime archive and reactions prove impact.",
    "AI review counts as collaborator testimony."
  ]) {
    assert.ok(detectSemanticRisks(statement).length > 0, statement);
  }
});

test("semantic guard permits bounded language", () => {
  for (const statement of [
    "Jamie co-founded the coalition and built its public campaign websites; policy outcomes remained collective.",
    "The Council appropriated funds, but the record does not establish disbursement.",
    "The recovered surface is not a lifetime archive or authorship record.",
    "The protocol remains open until collaborators respond."
  ]) {
    assert.deepEqual(detectSemanticRisks(statement), [], statement);
  }
});

test("current composite scorecard is candidate-bound", () => {
  const scorecard = evaluateComposite(repoRoot);
  assert.match(scorecard.candidateFingerprint, /^[a-f0-9]{64}$/);
  assert.match(scorecard.candidateCommit, /^[a-f0-9]{40}$/);
  assert.equal(typeof scorecard.workingTreeClean, "boolean");
  assert.equal(scorecard.criteria.length, 15);
  if (scorecard.hardGateFailures === 0 && scorecard.weightedScore === 1) {
    assert.equal(scorecard.passes, true);
  }
});
