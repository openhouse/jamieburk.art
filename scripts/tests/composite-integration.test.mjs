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

  const hollow = structuredClone(donorDispositions);
  for (const donor of hollow.donors) {
    donor.mechanism = "alpha beta gamma delta";
    donor.destination = "epsilon zeta eta theta";
    donor.boundary = "iota kappa lambda mu";
    donor.risk = "nu xi omicron pi";
    donor.verification = "rho sigma tau upsilon";
  }
  assert.ok(validateDonorDispositions(hollow).length > 0);
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
    project.publicRule = "x ".repeat(40);
    project.boundaries = ["y ".repeat(20), "z ".repeat(20)];
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
      [{
        id: "CLM-ONE",
        project: "nyc-artist-coalition",
        projections: [{ status: "active" }]
      }],
      { routes: [] }
    ).join(" "),
    /nyc-artist-coalition/
  );

  const overclaim = structuredClone(collectiveCreditPolicy);
  overclaim.projects[0].publicRule =
    "Credit Jamie because he single-handedly caused every collective outcome and alone authored all policy decisions, campaigns, public systems, institutional actions, and community results.";
  assert.match(
    validateCollectiveCreditPolicy(overclaim).join(" "),
    /prohibited authorship or causality/
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

  const brokenContact = structuredClone(surfaceBindings);
  const contact = brokenContact.routes.find((route) => route.path === "/contact");
  contact.sourceFiles = ["does/not/exist.ts"];
  contact.proofIds = ["UNKNOWN-PROOF"];
  const contactFindings = validateSurfaceBindings(brokenContact).join(" ");
  assert.match(contactFindings, /missing source file/);
  assert.match(contactFindings, /unknown proof/);

  const escaped = structuredClone(surfaceBindings);
  escaped.routes.find((route) => route.path === "/contact").sourceFiles = [
    "../../outside.txt"
  ];
  assert.match(validateSurfaceBindings(escaped).join(" "), /outside the repository/);

  const hollowRoute = structuredClone(surfaceBindings);
  Object.assign(
    hollowRoute.routes.find((route) => route.path === "/contact"),
    {
      sourceFiles: ["package.json"],
      audience: "x",
      purpose: "x",
      approvalState: "x",
      changeRule: "x",
      exclusions: [""]
    }
  );
  assert.ok(validateSurfaceBindings(hollowRoute).length > 0);
});

test("selected proofs require resolvable structured evidence", () => {
  const findings = validateProofTraceability(
    [{ id: "PROOF-ONE" }],
    { routes: [{ proofIds: ["PROOF-ONE"] }] },
    { sources: [], claims: [] }
  );
  assert.match(findings.join(" "), /lacks resolvable/);

  const protectedFindings = validateProofTraceability(
    [{ id: "PROOF-ONE", sourceIds: ["SRC-PROTECTED"] }],
    { routes: [{ proofIds: ["PROOF-ONE"] }] },
    {
      sources: [{ id: "SRC-PROTECTED", visibility: "protected" }],
      claims: []
    }
  );
  assert.match(protectedFindings.join(" "), /protected source/);

  const heldFindings = validateProofTraceability(
    [{ id: "PROOF-ONE", knowledgeClaimIds: ["CLM-HELD"] }],
    { routes: [{ proofIds: ["PROOF-ONE"] }] },
    {
      sources: [{ id: "SRC-PUBLIC", visibility: "public" }],
      claims: [{
        id: "CLM-HELD",
        status: "confirmed",
        projections: [{ status: "hold" }],
        evidence: [{ sourceId: "SRC-PUBLIC" }]
      }]
    }
  );
  assert.match(heldFindings.join(" "), /without an active projection/);

  const indirectProtected = validateProofTraceability(
    [{ id: "PROOF-ONE", knowledgeClaimIds: ["CLM-ONE"] }],
    { routes: [{ path: "/shown", proofIds: ["PROOF-ONE"] }] },
    {
      sources: [{ id: "SRC-PRIVATE", visibility: "protected" }],
      claims: [{
        id: "CLM-ONE",
        status: "confirmed",
        projections: [{ status: "active", surfaces: ["/elsewhere"] }],
        evidence: [{ sourceId: "SRC-PRIVATE", renderCitation: false }],
        boundaries: []
      }]
    }
  );
  assert.match(
    indirectProtected.join(" "),
    /not bound to selecting route|unbounded protected evidence/
  );
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

test("scorecard validation rejects malformed and internally inconsistent runs", () => {
  const scorecard = evaluateComposite(repoRoot);
  const malformed = structuredClone(scorecard);
  malformed.generatedAt = "not-a-date";
  malformed.hardGateFailures = -4;
  malformed.weightedScore = 99;
  malformed.criteria[0].title = 42;
  malformed.criteria[0].score = 99;
  malformed.criteria[0].findings = [42];
  malformed.criteria[1].unsupported = true;
  malformed.humanGates = [];
  malformed.passes = true;
  const findings = validateScorecardSchema(malformed, scorecardSchema).join(" ");
  for (const expected of [
    "generatedAt",
    "hardGateFailures",
    "weightedScore",
    "criteria",
    "human gates",
    "Passing scorecards"
  ]) {
    assert.match(findings, new RegExp(expected, "i"));
  }

  const forged = structuredClone(scorecard);
  forged.rubricVersion = "forged-version";
  forged.workingTreeClean = true;
  forged.hardGateFailures = 0;
  forged.weightedScore = 1;
  forged.passes = true;
  forged.criteria = forged.criteria.map((criterion) => ({
    ...criterion,
    passes: true,
    score: 0,
    findings: ["ignored failure"]
  }));
  forged.humanGates = forged.humanGates.map((gate) => ({
    ...gate,
    state: "met"
  }));
  const forgedFindings = validateScorecardSchema(
    forged,
    scorecardSchema
  ).join(" ");
  for (const expected of [
    "rubricVersion",
    "inconsistent pass",
    "human-gate registries",
    "weightedScore"
  ]) {
    assert.match(forgedFindings, new RegExp(expected, "i"));
  }
});
