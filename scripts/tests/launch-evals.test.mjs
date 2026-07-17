import assert from "node:assert/strict";
import test from "node:test";
import {
  loadLaunchEvalSuite,
  loadLaunchEvalRunRecords,
  runSourceChecks,
  scoreJudgeResults,
  validateDecisionRecord,
  validateLaunchEvalRunRecord,
  validateLaunchEvalSuite
} from "../lib/launch-evals.mjs";

const suite = loadLaunchEvalSuite();

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
  assert.match(failures, /override 1 needs human authority, rationale, evidence, and boundary changes/);
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
