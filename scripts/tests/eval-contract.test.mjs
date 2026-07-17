import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import path from "node:path";
import {
  contractDigest,
  evaluateCompositeStopCondition,
  governedFiles,
  governedInputDigest,
  loadEvalContract,
  promptDigest,
  repoRoot,
  runRecordDigest,
  scoreHoldout,
  validateCompositeRunRecord,
  validateEvalContract,
  validateRunSequence
} from "../lib/eval-contract.mjs";

const contract = loadEvalContract();
const digest = contractDigest(contract);
const inputDigest = governedInputDigest(contract);
const suite = JSON.parse(readFileSync(path.join(repoRoot, "evals/launch-readiness/evals.json"), "utf8"));

function seal(record) {
  record.recordDigest = runRecordDigest(record);
  return record;
}

const validate = (record, expected = {}) => validateCompositeRunRecord(record, { ...expected, verifyCandidate: false });

function run(id, judgeClass = "deterministic", options = {}) {
  const promptPath = options.promptPath ?? "evals/_shared/holdout-a.md";
  const criteria = suite.judgeCriteria.map((criterion) => ({ criterionId: criterion.id, score: 5, evidence: [`${criterion.id} evidence`], risks: [] }));
  const record = {
    schemaVersion: "2.1.0",
    id,
    iteration: options.iteration ?? 1,
    recordedAt: "2026-07-16T12:00:00Z",
    contract: { id: contract.id, version: contract.version, digest },
    candidate: { branch: "feature/knowledge-a", commit: "a".repeat(40), tree: "b".repeat(40), governedInputDigest: inputDigest },
    commands: judgeClass === "deterministic"
      ? contract.requiredCommands.map((command) => ({ command, exitCode: 0, status: "passed", startedAt: "2026-07-16T12:00:00Z", completedAt: "2026-07-16T12:00:01Z", durationMs: 1000, outputDigest: "c".repeat(64) }))
      : [{ command: "independent read-only holdout", exitCode: 0, status: "passed" }],
    ...(judgeClass === "deterministic" ? { execution: { runnerPath: "scripts/run-composite-eval.mjs", runnerDigest: promptDigest("scripts/run-composite-eval.mjs"), node: process.version, platform: "test" } } : {}),
    judge: judgeClass === "holdout"
      ? { class: "holdout", label: options.label ?? id, sessionId: options.sessionId ?? `session-${id}`, independent: true, priorScoresVisible: false, promptPath, promptDigest: promptDigest(promptPath) }
      : { class: "deterministic", label: id, independent: false, priorScoresVisible: false },
    criterionResults: judgeClass === "holdout" ? criteria : [],
    openDisagreements: [],
    overrides: [],
    reopenTriggersReviewed: ["new evidence", "changed public projection", "human disagreement"],
    decision: { status: "accepted-for-review", weightedScore: judgeClass === "holdout" ? 5 : undefined, productionReady: false, externalGatesOpen: [...contract.requiredExternalGates] }
  };
  return seal(record);
}

function sequence(records) {
  return records.map((record, index) => {
    record.iteration = index + 1;
    if (index) {
      record.previousRunId = records[index - 1].id;
      record.previousRunDigest = records[index - 1].recordDigest;
    }
    return seal(record);
  }).map((record) => ({ file: `${record.id}.json`, record }));
}

test("shared contract governs exactly the three canonical suites", () => assert.deepEqual(validateEvalContract(contract), []));

test("governed digest includes all app source and excludes generated results", () => {
  const files = governedFiles(contract);
  assert.ok(files.includes("apps/www/src/app/globals.css"));
  assert.ok(files.includes("evals/launch-readiness/judge.md"));
  assert.ok(files.includes("evals/portfolio-effectiveness/evidence.json"));
  assert.ok(files.every((file) => !file.includes("/runs/") && !file.includes("/.next/") && !file.startsWith("reports/")));
});

test("stale contract and candidate digests are rejected", () => {
  const changed = run("stale");
  changed.contract.digest = "0".repeat(64);
  changed.candidate.governedInputDigest = "1".repeat(64);
  seal(changed);
  const errors = validate(changed, { contract, contractDigest: digest, governedInputDigest: inputDigest }).join("\n");
  assert.match(errors, /stale contract digest/);
  assert.match(errors, /stale candidate-input digest/);
});

test("hard-coded pass without the full command set is rejected", () => {
  const changed = run("hard-coded");
  changed.commands = [{ command: "true", exitCode: 0, status: "passed" }];
  seal(changed);
  assert.match(validate(changed, { contract }).join("\n"), /complete required command set/);
});

test("command status must agree with its actual exit code", () => {
  const changed = run("lying-command");
  changed.commands[0].exitCode = 1;
  seal(changed);
  assert.match(validate(changed, { contract }).join("\n"), /disagrees with exit code/);
});

test("deterministic records require canonical runner and captured output provenance", () => {
  const changed = run("missing-provenance");
  changed.execution.runnerDigest = "0".repeat(64);
  delete changed.commands[0].outputDigest;
  delete changed.commands[0].startedAt;
  seal(changed);
  const errors = validate(changed, { contract }).join("\n");
  assert.match(errors, /runner digest is stale/);
  assert.match(errors, /captured output digest/);
  assert.match(errors, /execution timing/);
});

test("holdouts must be independent, blind, normalized, and prompt-bound", () => {
  const changed = run("leaky-holdout", "holdout");
  changed.judge.independent = false;
  changed.judge.priorScoresVisible = true;
  changed.judge.label = " leaky-holdout ";
  changed.judge.promptDigest = "0".repeat(64);
  seal(changed);
  const errors = validate(changed, { contract }).join("\n");
  assert.match(errors, /must be independent/);
  assert.match(errors, /cannot see prior scores/);
  assert.match(errors, /label must be normalized/);
  assert.match(errors, /prompt digest is stale/);
});

test("unknown, duplicate, missing, out-of-range, and evidenceless scores are rejected", () => {
  const changed = run("bad-score", "holdout");
  changed.criterionResults[0].criterionId = "UNKNOWN";
  changed.criterionResults[0].score = 99;
  changed.criterionResults[0].evidence = [];
  changed.criterionResults[1].criterionId = changed.criterionResults[2].criterionId;
  seal(changed);
  const errors = validate(changed, { contract }).join("\n");
  assert.match(errors, /unknown criterion/);
  assert.match(errors, /score must be an integer from 1 to 5/);
  assert.match(errors, /needs evidence/);
  assert.match(errors, /duplicate criterion/);
  assert.match(errors, /missing criterion/);
});

test("declared decision and weighted score are recomputed from actual results", () => {
  const changed = run("below-floor", "holdout");
  changed.criterionResults.find((item) => item.criterionId === "LR-JUDGE-EVIDENCE").score = 3;
  seal(changed);
  const scored = scoreHoldout(changed);
  assert.deepEqual(scored.belowMinimum, ["LR-JUDGE-EVIDENCE"]);
  const errors = validate(changed, { contract }).join("\n");
  assert.match(errors, /weighted score does not match/);
  assert.match(errors, /decision status does not match/);
});

test("required human gates cannot disappear from an accepted record", () => {
  const changed = run("missing-gates");
  changed.decision.externalGatesOpen = [];
  seal(changed);
  assert.match(validate(changed, { contract }).join("\n"), /external human gates/);
});

test("run records form an ordered hash chain", () => {
  const records = sequence([run("first"), run("second")]);
  assert.deepEqual(validateRunSequence(records), []);
  records[1].record.previousRunDigest = "0".repeat(64);
  assert.match(validateRunSequence(records).join("\n"), /previousRunDigest/);
});

test("record mutation invalidates its own digest", () => {
  const changed = run("mutated");
  changed.decision.status = "revision-required";
  assert.match(validate(changed, { contract }).join("\n"), /run record digest is stale/);
});

test("two deterministic passes and two unchanged independent holdouts meet the review stop", () => {
  const records = sequence([
    run("det-1"), run("det-2"),
    run("hold-1", "holdout", { label: "holdout-a", sessionId: "session-holdout-a" }),
    run("hold-2", "holdout", { label: "holdout-b", sessionId: "session-holdout-b", promptPath: "evals/_shared/holdout-b.md" })
  ]);
  assert.equal(evaluateCompositeStopCondition(records, contract).acceptedForReview, true);
});

test("a failed deterministic run resets the consecutive pass streak", () => {
  const failed = run("det-failed");
  failed.commands[0] = { ...failed.commands[0], exitCode: 1, status: "failed" };
  failed.decision.status = "revision-required";
  seal(failed);
  const records = sequence([run("det-1"), failed, run("det-2"), run("hold-1", "holdout"), run("hold-2", "holdout", { promptPath: "evals/_shared/holdout-b.md" })]);
  assert.equal(evaluateCompositeStopCondition(records, contract).deterministicPasses, 1);
  assert.equal(evaluateCompositeStopCondition(records, contract).acceptedForReview, false);
});

test("one reviewer cannot certify twice by changing label whitespace or case", () => {
  const one = run("hold-1", "holdout", { label: "Reviewer-One", sessionId: "session-same-reviewer" });
  const two = run("hold-2", "holdout", { label: "reviewer-one", sessionId: "session-same-reviewer", promptPath: "evals/_shared/holdout-b.md" });
  const records = sequence([run("det-1"), run("det-2"), one, two]);
  assert.equal(evaluateCompositeStopCondition(records, contract).acceptedForReview, false);
});

test("deterministic and holdout records must bind the same commit and tree", () => {
  const changed = run("hold-2", "holdout", { promptPath: "evals/_shared/holdout-b.md" });
  changed.candidate.commit = "c".repeat(40);
  changed.candidate.tree = "d".repeat(40);
  seal(changed);
  const records = sequence([run("det-1"), run("det-2"), run("hold-1", "holdout"), changed]);
  assert.equal(evaluateCompositeStopCondition(records, contract).unchangedCandidate, false);
  assert.equal(evaluateCompositeStopCondition(records, contract).acceptedForReview, false);
});

test("a contract version change resets old passes", () => {
  const changedContract = structuredClone(contract);
  changedContract.version = "9.0.0";
  const records = sequence([run("det-1"), run("det-2"), run("hold-1", "holdout"), run("hold-2", "holdout", { promptPath: "evals/_shared/holdout-b.md" })]);
  assert.equal(evaluateCompositeStopCondition(records, changedContract).acceptedForReview, false);
});

test("a model cannot grant production readiness", () => {
  const changed = run("overreach");
  changed.decision.productionReady = true;
  seal(changed);
  assert.match(validate(changed, { contract }).join("\n"), /cannot grant production authority/);
});

test("candidate commit and tree are verified by the record validator", () => {
  const changed = run("fabricated-candidate");
  assert.match(validateCompositeRunRecord(changed, { contract }).join("\n"), /candidate commit is not available in Git/);
});
