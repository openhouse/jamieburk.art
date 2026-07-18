import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import test from "node:test";
import { isIndexableDeployment } from "../../apps/www/src/lib/deployment-policy.ts";
import {
  loadLaunchEvalSuite,
  loadLaunchEvalRunRecords,
  runSourceChecks,
  scoreJudgeResults,
  validateBrowserReportCoverage,
  validateDecisionRecord,
  validateGateEvidence,
  validateLaunchEvalRunRecord,
  validateLaunchEvalSuite
} from "../lib/launch-evals.mjs";

const suite = loadLaunchEvalSuite();
const candidateCommit = execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim();
const resumeDigest = createHash("sha256").update(execFileSync("git", ["show", `${candidateCommit}:apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf`])).digest("hex");

function completeBrowserReport() {
  const byId = Object.fromEntries(suite.runtimeCases.map((runtimeCase) => [runtimeCase.id, runtimeCase]));
  const results = (runtimeId, build) => byId[runtimeId].routes.flatMap((route) => byId[runtimeId].viewports.map(([width, height]) => build(route, width, height)));
  return {
    candidateCommit: "a".repeat(40),
    runtimeCaseIds: ["LR-RUNTIME-RESPONSIVE", "LR-RUNTIME-KEYBOARD", "LR-RUNTIME-CITATIONS"],
    responsive: results("LR-RUNTIME-RESPONSIVE", (route, width, height) => ({
      route,
      width,
      height,
      status: 200,
      h1Count: 1,
      overflow: false,
      h1Overflow: false,
      consoleErrorCount: 0,
      canonical: `https://staging.jamieburk.art${route === "/" ? "/" : route}`,
      expectedCanonical: `https://staging.jamieburk.art${route === "/" ? "/" : route}`,
      robots: "noindex, nofollow",
      passed: true
    })),
    keyboard: results("LR-RUNTIME-KEYBOARD", (route, width, height) => ({
      route,
      width,
      height,
      focusableCount: 2,
      focusSequence: [
        { tag: "A", href: "#main", domIndex: 0, visibleFocus: true },
        { tag: "A", href: "/resume", domIndex: 1, visibleFocus: true }
      ],
      mainExists: true,
      logicalFocusOrder: true,
      allFocusIndicatorsVisible: true,
      actions: { email: route === "/contact", linkedin: route === "/contact", resume: true },
      passed: true
    })),
    keyboardActionCoverage: { email: true, linkedin: true, resume: true },
    citations: results("LR-RUNTIME-CITATIONS", (route, width, height) => ({
      route,
      width,
      height,
      referenceCount: 2,
      endnotesCount: 1,
      noteCount: 2,
      backlinkCount: 2,
      uniqueIds: true,
      labelsPresent: true,
      targetsExist: true,
      backlinkTargetsExist: true,
      navigationPassed: true,
      forbiddenEvidenceTokenCount: 3,
      protectedOrOpenEvidenceRendered: false,
      passed: true
    })),
    passed: true
  };
}

function makeDecisionRecord(overrides = {}) {
  return {
    dimensions: suite.lensPolicy.sack.decisionVector.map((dimension) => ({
      dimension,
      assessment: `${dimension} was reviewed separately`,
      evidence: ["public route or repository evidence"],
      unresolvedRisks: dimension === "unresolved risk" ? ["release is a human decision"] : []
    })),
    authorityLog: suite.lensPolicy.sack.authorities.map((policy) => ({
      action: policy.action,
      humanAuthority: policy.authority,
      disposition: "Reviewed and not invoked in this run",
      humanDecision: "not-invoked",
      humanDecisionEvidence: [],
      modelHasFinalAuthority: false
    })),
    reopenTriggersConsidered: [...suite.lensPolicy.sack.reopenTriggers],
    reopenReview: "No trigger required reopening this decision.",
    overrides: [],
    openDisagreements: [],
    disagreementReview: "No live disagreement was identified; an affected collaborator may still trigger review.",
    ...overrides
  };
}

test("launch-readiness eval suite is structurally valid", () => {
  assert.deepEqual(validateLaunchEvalSuite(suite), []);
});

test("indexability requires the production environment, exact apex URL, and explicit policy together", () => {
  assert.equal(isIndexableDeployment({ appEnv: "production", siteUrl: "https://jamieburk.art", robotsPolicy: "index" }), true);
  assert.equal(isIndexableDeployment({ appEnv: "production", siteUrl: "https://staging.jamieburk.art", robotsPolicy: "index" }), false);
  assert.equal(isIndexableDeployment({ appEnv: "production", siteUrl: "https://preview.example", robotsPolicy: "index" }), false);
  assert.equal(isIndexableDeployment({ appEnv: "staging", siteUrl: "https://jamieburk.art", robotsPolicy: "index" }), false);
  assert.equal(isIndexableDeployment({ appEnv: "production", siteUrl: "https://jamieburk.art", robotsPolicy: "noindex" }), false);
});

test("launch-readiness source intentions hold", () => {
  assert.deepEqual(runSourceChecks(suite), []);
});

test("machine-readable run records reproduce their declared decisions", () => {
  const runs = loadLaunchEvalRunRecords();
  assert.ok(runs.length >= 1);
  for (const { file, record } of runs) {
    assert.deepEqual(validateLaunchEvalRunRecord(suite, record), [], file);
  }
});

test("a declared hard-gate result cannot use a fabricated candidate commit", () => {
  const record = structuredClone(loadLaunchEvalRunRecords()[0].record);
  record.candidate.baseCommit = "not-a-sha";
  assert.match(validateLaunchEvalRunRecord(suite, record).join("\n"), /full Git SHA/);
});

test("a passing run cannot replace hard-gate records with a trust-me note", () => {
  const record = structuredClone(loadLaunchEvalRunRecords()[0].record);
  record.hardGatesPass = true;
  record.hardGateNotes = ["trust me"];
  delete record.hardGateResults;
  assert.match(validateLaunchEvalRunRecord(suite, record).join("\n"), /record every hard gate/);
});

test("a passing run needs exact candidate identity rather than a parent base commit", () => {
  const record = structuredClone(loadLaunchEvalRunRecords()[0].record);
  record.hardGatesPass = true;
  record.candidate.baseCommit = "a".repeat(40);
  delete record.candidate.commit;
  delete record.candidate.tree;
  record.hardGateResults = suite.hardGates.map((gate) => ({ id: gate.id, status: "passed", evidence: ["trust me"] }));
  assert.match(validateLaunchEvalRunRecord(suite, record).join("\n"), /exact candidate commit and tree/);
});

test("launch scoring rejects fractional values", () => {
  const scores = suite.judgeCriteria.map((criterion) => ({ criterionId: criterion.id, score: criterion.id === "LR-JUDGE-ROLE" ? 4.2 : 5 }));
  const result = scoreJudgeResults(suite, scores, true, makeDecisionRecord());
  assert.equal(result.accepted, false);
  assert.deepEqual(result.missing, ["LR-JUDGE-ROLE"]);
});

test("a passing run needs criterion evidence and unresolved-risk arrays", () => {
  const record = structuredClone(loadLaunchEvalRunRecords()[0].record);
  record.hardGatesPass = true;
  record.scores = suite.judgeCriteria.map((criterion) => ({ criterionId: criterion.id, score: 5 }));
  const errors = validateLaunchEvalRunRecord(suite, record).join("\n");
  assert.match(errors, /needs evidence before a run can pass/);
  assert.match(errors, /needs a risks array before a run can pass/);
});

test("hard-gate prose cannot substitute for typed command and browser evidence", () => {
  const record = structuredClone(loadLaunchEvalRunRecords()[0].record);
  record.hardGatesPass = true;
  record.candidate.commit = record.candidate.baseCommit;
  record.candidate.tree = "b".repeat(40);
  record.hardGateResults = suite.hardGates.map((gate) => ({ id: gate.id, status: "passed", candidateCommit: record.candidate.commit, evidence: ["passed"] }));
  const errors = validateLaunchEvalRunRecord(suite, record).join("\n");
  assert.match(errors, /exact command, zero exit code/);
  assert.match(errors, /digest-bound browser report/);
  assert.match(errors, /structured evidence/);
});

test("browser evidence must cover every route and viewport instead of passing empty loops", () => {
  const complete = completeBrowserReport();
  assert.deepEqual(validateBrowserReportCoverage(suite, complete, { exactRuntimeIds: true }), []);
  complete.responsive = complete.responsive.slice(0, 1);
  complete.keyboard = [];
  complete.citations = [];
  const errors = validateBrowserReportCoverage(suite, complete, { exactRuntimeIds: true }).join("\n");
  assert.match(errors, /LR-RUNTIME-RESPONSIVE does not cover the complete route and viewport matrix/);
  assert.match(errors, /LR-RUNTIME-KEYBOARD does not cover the complete route and viewport matrix/);
  assert.match(errors, /LR-RUNTIME-CITATIONS does not cover the complete route and viewport matrix/);
});

test("passed booleans cannot replace retained browser assertion evidence", () => {
  const report = completeBrowserReport();
  report.responsive = report.responsive.map(({ route, width, height }) => ({ route, width, height, passed: true }));
  report.keyboard = report.keyboard.map(({ route, width, height }) => ({ route, width, height, passed: true }));
  report.citations = report.citations.map(({ route, width, height }) => ({ route, width, height, passed: true }));
  const errors = validateBrowserReportCoverage(suite, report, { exactRuntimeIds: true }).join("\n");
  assert.match(errors, /retained HTTP, layout, console, canonical, and robots evidence/);
  assert.match(errors, /complete logical focus sequence/);
  assert.match(errors, /semantic, navigation, and protected-or-open non-rendering evidence/);
});

test("approval and deployment evidence must match declared labels and semantic formats", () => {
  const approval = suite.hardGates.find((gate) => gate.id === "LR-HG-EXACT-SHA");
  const deployment = suite.hardGates.find((gate) => gate.id === "LR-HG-PRODUCTION-SMOKE");
  const commit = candidateCommit;
  const approvalErrors = validateGateEvidence(approval, [
    { label: "approved commit SHA", value: "passed" },
    { label: "staging URL", value: "https://example.com" },
    { label: "production image or deployment identifier", value: "ok" }
  ], commit).join("\n");
  assert.match(approvalErrors, /needs substantive evidence/);
  assert.match(approvalErrors, /HTTPS staging\.jamieburk\.art URL/);

  const deploymentErrors = validateGateEvidence(deployment, [
    { label: "HTTP observations", value: "{}" },
    { label: "resume SHA-256", value: "not-a-digest" },
    { label: "robots and sitemap bodies", value: "{}" }
  ], commit).join("\n");
  assert.match(deploymentErrors, /must be JSON covering apex/);
  assert.match(deploymentErrors, /must be a SHA-256 digest/);
  assert.match(deploymentErrors, /inspected robots and sitemap bodies/);

  const failedSmokeErrors = validateGateEvidence(deployment, [
    { label: "HTTP observations", value: JSON.stringify({ apex: 500, www: 500, tls: false, health: 503, resume: 404, canonicals: false, openGraph: false, candidateCommit: commit, deploymentIdentifier: "deploy:test-failure" }) },
    { label: "resume SHA-256", value: "b".repeat(64) },
    { label: "robots and sitemap bodies", value: JSON.stringify({ robots: "User-agent: *\nDisallow: /", sitemap: "<urlset><url><loc>https://example.com/</loc></url></urlset>" }) }
  ], commit).join("\n");
  assert.match(failedSmokeErrors, /200 apex response/);
  assert.match(failedSmokeErrors, /permanent www redirect/);
  assert.match(failedSmokeErrors, /confirm TLS/);
  assert.match(failedSmokeErrors, /200 health response/);
  assert.match(failedSmokeErrors, /200 resume response/);
  assert.match(failedSmokeErrors, /confirm canonical URLs/);
  assert.match(failedSmokeErrors, /confirm Open Graph metadata/);
  assert.match(failedSmokeErrors, /production crawling allowed/);
  assert.match(failedSmokeErrors, /apex production URL/);

  assert.deepEqual(validateGateEvidence(approval, [
    { label: "approved commit SHA", value: commit },
    { label: "staging URL", value: "https://staging.jamieburk.art/work" },
    { label: "production image or deployment identifier", value: "sha256:0123456789abcdef" }
  ], commit), []);
  assert.deepEqual(validateGateEvidence(deployment, [
    { label: "HTTP observations", value: JSON.stringify({ apex: 200, www: 308, tls: true, health: 200, resume: 200, canonicals: "verified", openGraph: "verified", candidateCommit: commit, deploymentIdentifier: "sha256:0123456789abcdef" }) },
    { label: "resume SHA-256", value: resumeDigest },
    { label: "robots and sitemap bodies", value: JSON.stringify({ robots: "User-agent: *\nAllow: /", sitemap: "<urlset><url><loc>https://jamieburk.art/</loc></url></urlset>" }) }
  ], commit), []);

  const wildcardBlock = validateGateEvidence(deployment, [
    { label: "HTTP observations", value: JSON.stringify({ apex: 200, www: 308, tls: true, health: 200, resume: 200, canonicals: true, openGraph: true, candidateCommit: commit, deploymentIdentifier: "sha256:0123456789abcdef" }) },
    { label: "resume SHA-256", value: resumeDigest },
    { label: "robots and sitemap bodies", value: JSON.stringify({ robots: "User-agent: *\nAllow: /\nDisallow: /*", sitemap: "<urlset><url><loc>https://jamieburk.art/</loc></url></urlset>" }) }
  ], commit).join("\n");
  assert.match(wildcardBlock, /production crawling allowed/);
});

test("a passing scorecard reaches the deterministic target", () => {
  const scores = suite.judgeCriteria.map((criterion) => ({
    criterionId: criterion.id,
    score: 5
  }));
  assert.deepEqual(scoreJudgeResults(suite, scores, true, makeDecisionRecord()), {
    weightedScore: 5,
    missing: [],
    belowMinimum: [],
    governanceFailures: [],
    accepted: true
  });
});

test("hard-gate failure cannot be averaged away", () => {
  const scores = suite.judgeCriteria.map((criterion) => ({
    criterionId: criterion.id,
    score: 5
  }));
  assert.equal(
    scoreJudgeResults(suite, scores, false, makeDecisionRecord()).accepted,
    false
  );
});

test("one criterion below its floor rejects an otherwise strong run", () => {
  const scores = suite.judgeCriteria.map((criterion) => ({
    criterionId: criterion.id,
    score: criterion.id === "LR-JUDGE-COLLECTIVE" ? 3 : 5
  }));
  const result = scoreJudgeResults(suite, scores, true, makeDecisionRecord());
  assert.equal(result.accepted, false);
  assert.deepEqual(result.belowMinimum, ["LR-JUDGE-COLLECTIVE"]);
});

test("the Chad lens is explicit and cannot be averaged away", () => {
  const chad = suite.judgeCriteria.find(
    (criterion) => criterion.id === "LR-JUDGE-CHAD"
  );
  assert.equal(chad?.minimumScore, 4);

  const scores = suite.judgeCriteria.map((criterion) => ({
    criterionId: criterion.id,
    score: criterion.id === "LR-JUDGE-CHAD" ? 3 : 5
  }));
  const result = scoreJudgeResults(suite, scores, true, makeDecisionRecord());
  assert.equal(result.accepted, false);
  assert.deepEqual(result.belowMinimum, ["LR-JUDGE-CHAD"]);
});

test("the Margaret Morse lens is explicit and cannot be averaged away", () => {
  const morse = suite.judgeCriteria.find(
    (criterion) => criterion.id === "LR-JUDGE-MORSE"
  );
  assert.equal(morse?.minimumScore, 4);

  const scores = suite.judgeCriteria.map((criterion) => ({
    criterionId: criterion.id,
    score: criterion.id === "LR-JUDGE-MORSE" ? 3 : 5
  }));
  const result = scoreJudgeResults(suite, scores, true, makeDecisionRecord());
  assert.equal(result.accepted, false);
  assert.deepEqual(result.belowMinimum, ["LR-JUDGE-MORSE"]);
});

test("the Warren Sack lens is explicit and cannot be averaged away", () => {
  const sack = suite.judgeCriteria.find(
    (criterion) => criterion.id === "LR-JUDGE-SACK"
  );
  assert.equal(sack?.minimumScore, 4);

  const scores = suite.judgeCriteria.map((criterion) => ({
    criterionId: criterion.id,
    score: criterion.id === "LR-JUDGE-SACK" ? 3 : 5
  }));
  const result = scoreJudgeResults(suite, scores, true, makeDecisionRecord());
  assert.equal(result.accepted, false);
  assert.deepEqual(result.belowMinimum, ["LR-JUDGE-SACK"]);
});

test("the Warren Sack lens rejects collapsed judgment and model final authority", () => {
  const changed = structuredClone(suite);
  changed.lensPolicy.sack.decisionVector = ["employability"];
  changed.lensPolicy.sack.authorities[0].modelHasFinalAuthority = true;
  const errors = validateLaunchEvalSuite(changed).join("\n");
  assert.match(errors, /seven unique decision dimensions/);
  assert.match(errors, /no model final authority/);
});

test("an aggregate pass cannot omit the per-run decision record", () => {
  const scores = suite.judgeCriteria.map((criterion) => ({
    criterionId: criterion.id,
    score: 5
  }));
  const result = scoreJudgeResults(suite, scores, true);
  assert.equal(result.accepted, false);
  assert.match(result.governanceFailures.join("\n"), /every decision dimension/);
  assert.match(result.governanceFailures.join("\n"), /every human authority action/);
  assert.match(result.governanceFailures.join("\n"), /disagreement review/);
});

test("every decision dimension needs evidence and an unresolved-risks array", () => {
  const changed = makeDecisionRecord();
  changed.dimensions[0].evidence = [];
  delete changed.dimensions[1].unresolvedRisks;
  const failures = validateDecisionRecord(suite, changed).join("\n");
  assert.match(failures, /role fit needs per-run evidence/);
  assert.match(failures, /demonstrated action needs an unresolved-risks array/);
});

test("reopen review covers every trigger and invoked overrides carry provenance", () => {
  const changed = makeDecisionRecord({
    reopenTriggersConsidered: [],
    overrides: [
      {
        humanAuthority: "Jamie Burkart",
        rationale: "",
        evidence: [],
        boundaryChanges: []
      }
    ]
  });
  const failures = validateDecisionRecord(suite, changed).join("\n");
  assert.match(failures, /review every reopen trigger exactly once/);
  assert.match(failures, /override 1 needs a governed human authority, rationale, substantive evidence, and substantive boundary changes/);
});

test("override records cannot grant authority to a model or hide empty evidence and boundary changes", () => {
  const changed = makeDecisionRecord({
    overrides: [{
      humanAuthority: "automated model reviewer",
      rationale: "Override the public boundary.",
      evidence: ["   "],
      boundaryChanges: [""]
    }]
  });
  assert.match(validateDecisionRecord(suite, changed).join("\n"), /governed human authority/);

  changed.overrides[0] = {
    humanAuthority: suite.lensPolicy.sack.authorities.find((item) => item.action === "override-model-judgment").authority,
    rationale: "A named human reviewer recorded why the model judgment changed.",
    evidence: ["Reviewed public source and consent record."],
    boundaryChanges: ["Return the claim to human review before publication."]
  };
  assert.deepEqual(validateDecisionRecord(suite, changed), []);
});

test("authority records cannot substitute a model or generic reviewer for policy owners", () => {
  const changed = makeDecisionRecord();
  changed.authorityLog[0].humanAuthority = "automated judge";
  const failures = validateDecisionRecord(suite, changed).join("\n");
  assert.match(failures, /promote-public-claim needs human authority and a disposition/);
});

test("live disagreement survives an accepted aggregate result", () => {
  const scores = suite.judgeCriteria.map((criterion) => ({
    criterionId: criterion.id,
    score: 5
  }));
  const decisionRecord = makeDecisionRecord({
    openDisagreements: ["A reviewer wants one more artistic-practice artifact."],
    disagreementReview: "The disagreement remains open and does not negate the bounded release judgment."
  });
  const result = scoreJudgeResults(suite, scores, true, decisionRecord);
  assert.equal(result.accepted, true);
  assert.deepEqual(decisionRecord.openDisagreements, [
    "A reviewer wants one more artistic-practice artifact."
  ]);
});

test("a binding human refusal cannot be averaged into acceptance", () => {
  const scores = suite.judgeCriteria.map((criterion) => ({
    criterionId: criterion.id,
    score: 5
  }));
  const decisionRecord = makeDecisionRecord();
  const promotion = decisionRecord.authorityLog.find((item) => item.action === "promote-public-claim");
  promotion.humanDecision = "refused";
  promotion.humanDecisionEvidence = ["Jamie declined public projection of the claim."];
  const result = scoreJudgeResults(suite, scores, true, decisionRecord);
  assert.equal(result.accepted, false);
  assert.match(result.governanceFailures.join("\n"), /binding human refusal/);
});

test("binding human-decision fields are substantive and internally consistent", () => {
  const missing = makeDecisionRecord();
  delete missing.authorityLog[0].humanDecision;
  assert.match(
    validateDecisionRecord(suite, missing, { requireBindingHumanDecisions: true }).join("\n"),
    /allowed binding human decision/
  );

  const held = makeDecisionRecord();
  const dispute = held.authorityLog.find((item) => item.action === "dispute-attribution");
  dispute.humanDecision = "publication-hold";
  dispute.humanDecisionEvidence = ["An affected collaborator requested a publication hold."];
  assert.match(
    validateDecisionRecord(suite, held, { requireBindingHumanDecisions: true }).join("\n"),
    /publication hold must remain visible/
  );
});
