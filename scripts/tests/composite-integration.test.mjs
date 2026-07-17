import assert from "node:assert/strict";
import test from "node:test";
import {
  detectSemanticRisks,
  evaluateComposite,
  repoRoot,
  validateCollectiveCreditPolicy,
  validateDonorDispositions,
  validateProofTraceability,
  validateScorecardSchema,
  validateSurfaceBindings
} from "../lib/composite-integration.mjs";
import donorDispositions from "../../evals/composite-integration/donor-dispositions.json" with { type: "json" };
import collectiveCreditPolicy from "../../docs/knowledge-bank/policies/collective-credit-policy.json" with { type: "json" };
import surfaceBindings from "../../docs/knowledge-bank/policies/projection-surface-bindings.json" with { type: "json" };
import scorecardSchema from "../../evals/composite-integration/scorecard.schema.json" with { type: "json" };

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

test("collective-credit policy rejects hollow rules and covers active claim projects", () => {
  const hollow = structuredClone(collectiveCreditPolicy);
  for (const project of hollow.projects) {
    project.publicRule = "x";
    project.boundaries = ["x"];
  }
  assert.ok(validateCollectiveCreditPolicy(hollow).length > 0);

  const missing = structuredClone(collectiveCreditPolicy);
  missing.projects = missing.projects.filter(
    (project) => project.id !== "nyc-artist-coalition"
  );
  assert.match(
    validateCollectiveCreditPolicy(
      missing,
      [],
      [{ id: "CLM-ONE", project: "nyc-artist-coalition" }],
      { routes: [{ claimIds: ["CLM-ONE"] }] }
    ).join(" "),
    /nyc-artist-coalition/
  );
});

test("surface policy fails closed when a route disappears", () => {
  const missingPolicy = { version: 1, routes: [] };
  assert.match(validateSurfaceBindings(missingPolicy).join(" "), /missing/i);
});

test("surface policy rejects missing source files and unauthorized proof surfaces", () => {
  const brokenFiles = structuredClone(surfaceBindings);
  brokenFiles.routes.find((route) => route.path === "/resume").sourceFiles = [
    "does/not/exist.ts"
  ];
  assert.match(validateSurfaceBindings(brokenFiles).join(" "), /missing source file/);

  const unauthorizedProof = {
    id: "callnyc-civic-data-guidance",
    status: "ready",
    surfaces: ["case-study"]
  };
  const findings = validateSurfaceBindings(
    surfaceBindings,
    [unauthorizedProof],
    [],
    []
  ).join(" ");
  assert.match(findings, /without resume approval/);
});

test("selected proofs require resolvable structured evidence", () => {
  const findings = validateProofTraceability(
    [{ id: "PROOF-ONE" }],
    { routes: [{ proofIds: ["PROOF-ONE"] }] },
    { sources: [], claims: [] }
  );
  assert.match(findings.join(" "), /lacks resolvable/);
});

test("semantic guard rejects common overclaim mutations", () => {
  for (const statement of [
    "Jamie single-handedly caused the law to pass.",
    "Jamie alone founded the collective and organized every event.",
    "The appropriation means receipt and disbursement.",
    "This is the complete lifetime archive and reactions prove impact.",
    "AI review counts as collaborator testimony.",
    "Jamie made the law happen.",
    "This is the entire archive and the metrics demonstrate impact.",
    "Automated review cleared production."
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
  assert.deepEqual(validateScorecardSchema(scorecard, scorecardSchema), []);
  if (!scorecard.workingTreeClean) assert.equal(scorecard.passes, false);
});
