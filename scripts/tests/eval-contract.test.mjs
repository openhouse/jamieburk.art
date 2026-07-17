import assert from "node:assert/strict";
import test from "node:test";
import {
  contractDigest,
  evaluateCompositeStopCondition,
  governedFiles,
  governedInputDigest,
  loadEvalContract,
  validateCompositeRunRecord,
  validateEvalContract
} from "../lib/eval-contract.mjs";

const contract = loadEvalContract();
const digest = contractDigest(contract);
const inputDigest = governedInputDigest(contract);

function run(id, judgeClass = "deterministic") {
  return {
    schemaVersion: "2.0.0",
    id,
    iteration: 1,
    recordedAt: "2026-07-16T12:00:00Z",
    contract: { id: contract.id, version: contract.version, digest },
    candidate: { branch: "feature/knowledge-a", commit: "a".repeat(40), tree: "b".repeat(40), governedInputDigest: inputDigest },
    commands: [{ command: "npm run check", exitCode: 0, status: "passed" }],
    judge: { class: judgeClass, label: id, independent: judgeClass === "holdout", priorScoresVisible: false },
    criterionResults: judgeClass === "holdout" ? [{ criterionId: "reader-clarity", score: 4, evidence: ["route evidence"] }] : [],
    openDisagreements: [],
    overrides: [],
    reopenTriggersReviewed: ["new evidence", "changed public projection", "human disagreement"],
    decision: { status: "accepted-for-review", productionReady: false, externalGatesOpen: ["Jamie exact-SHA approval"] }
  };
}

test("shared contract governs exactly the three canonical suites", () => {
  assert.deepEqual(validateEvalContract(contract), []);
});

test("governed digest excludes generated run records", () => {
  assert.ok(governedFiles(contract).every((file) => !file.includes("/runs/") && !file.startsWith("reports/")));
});

test("stale contract and candidate digests are rejected", () => {
  const changed = run("stale");
  changed.contract.digest = "0".repeat(64);
  changed.candidate.governedInputDigest = "1".repeat(64);
  const errors = validateCompositeRunRecord(changed, { contractDigest: digest, governedInputDigest: inputDigest }).join("\n");
  assert.match(errors, /stale contract digest/);
  assert.match(errors, /stale candidate-input digest/);
});

test("hard-coded pass without command results is rejected", () => {
  const changed = run("hard-coded");
  changed.commands = [];
  assert.match(validateCompositeRunRecord(changed).join("\n"), /commands are required/);
});

test("command status must agree with its actual exit code", () => {
  const changed = run("lying-command");
  changed.commands[0] = { command: "npm run check", exitCode: 1, status: "passed" };
  assert.match(validateCompositeRunRecord(changed).join("\n"), /disagrees with exit code/);
});

test("holdouts must be independent and blind to prior scores", () => {
  const changed = run("leaky-holdout", "holdout");
  changed.judge.independent = false;
  changed.judge.priorScoresVisible = true;
  const errors = validateCompositeRunRecord(changed).join("\n");
  assert.match(errors, /must be independent/);
  assert.match(errors, /cannot see prior scores/);
});

test("holdout scores require criterion evidence", () => {
  const changed = run("evidenceless", "holdout");
  changed.criterionResults[0].evidence = [];
  assert.match(validateCompositeRunRecord(changed).join("\n"), /actual score and evidence/);
});

test("two deterministic passes and two unchanged holdouts meet the review stop condition", () => {
  const records = [run("det-1"), run("det-2"), run("hold-1", "holdout"), run("hold-2", "holdout")].map((record) => ({ file: `${record.id}.json`, record }));
  assert.equal(evaluateCompositeStopCondition(records, contract).acceptedForReview, true);
});

test("one holdout cannot certify the candidate", () => {
  const records = [run("det-1"), run("det-2"), run("hold-1", "holdout")].map((record) => ({ file: `${record.id}.json`, record }));
  assert.equal(evaluateCompositeStopCondition(records, contract).acceptedForReview, false);
});

test("a failed deterministic run resets the consecutive pass streak", () => {
  const failed = run("det-failed");
  failed.commands[0] = { command: "npm run check", exitCode: 1, status: "failed" };
  failed.decision.status = "revision-required";
  const records = [run("det-1"), failed, run("det-2"), run("hold-1", "holdout"), run("hold-2", "holdout")].map((record) => ({ file: `${record.id}.json`, record }));
  assert.equal(evaluateCompositeStopCondition(records, contract).deterministicPasses, 1);
  assert.equal(evaluateCompositeStopCondition(records, contract).acceptedForReview, false);
});

test("two labels from one holdout judge cannot certify the candidate", () => {
  const holdoutOne = run("hold-1", "holdout");
  const holdoutTwo = run("hold-2", "holdout");
  holdoutTwo.judge.label = holdoutOne.judge.label;
  const records = [run("det-1"), run("det-2"), holdoutOne, holdoutTwo].map((record) => ({ file: `${record.id}.json`, record }));
  assert.equal(evaluateCompositeStopCondition(records, contract).acceptedForReview, false);
});

test("a contract version change invalidates old runs", () => {
  const changedContract = structuredClone(contract);
  changedContract.version = "2.1.0";
  const records = [run("det-1"), run("det-2"), run("hold-1", "holdout"), run("hold-2", "holdout")].map((record) => ({ file: `${record.id}.json`, record }));
  assert.equal(evaluateCompositeStopCondition(records, changedContract).acceptedForReview, false);
});

test("a model cannot grant production readiness", () => {
  const changed = run("overreach");
  changed.decision.productionReady = true;
  assert.match(validateCompositeRunRecord(changed).join("\n"), /cannot grant production authority/);
});
