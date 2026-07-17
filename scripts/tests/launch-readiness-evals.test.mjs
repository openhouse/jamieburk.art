import assert from "node:assert/strict";
import test from "node:test";
import {
  contractFingerprint,
  indexObservations,
  loadLaunchReadinessSuite,
  resolveCriterionObservation,
  validateObservationMeta
} from "../lib/launch-readiness-contract.mjs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const { suite, fingerprint } = loadLaunchReadinessSuite(repoRoot);
const commit = "a".repeat(40);

function result(criterionId, type, identity, runId, overrides = {}) {
  return {
    criterionId,
    score: 0.8,
    passed: true,
    evidence: ["Visible evidence tied to the reviewed candidate."],
    limitations: [],
    grader: {
      type,
      identity,
      name: identity,
      runId,
      independentOfOptimizer: type === "llm" || type === "human",
      isAgent: type !== "human"
    },
    ...overrides
  };
}

function observation(results, overrides = {}) {
  return {
    suite: suite.suite,
    suiteVersion: suite.version,
    contractFingerprint: fingerprint,
    runId: "observation-run",
    commit,
    performedAt: "2026-07-16T12:00:00Z",
    results,
    humanApprovals: [],
    ...overrides
  };
}

test("contract fingerprint is stable and content-addressed", () => {
  assert.match(fingerprint, /^sha256:[a-f0-9]{64}$/);
  assert.equal(contractFingerprint(suite), fingerprint);
  assert.notEqual(contractFingerprint({ ...suite, objective: `${suite.objective} changed` }), fingerprint);
});

test("observation must match current commit and contract", () => {
  const valid = observation([result("CLARITY-001", "llm", "grader-a", "run-a")]);
  assert.deepEqual(validateObservationMeta({ meta: valid, suite, fingerprint, currentCommit: commit }), []);
  assert.match(
    validateObservationMeta({ meta: { ...valid, commit: "b".repeat(40) }, suite, fingerprint, currentCommit: commit }).join("\n"),
    /does not match current HEAD/
  );
  assert.match(
    validateObservationMeta({ meta: { ...valid, contractFingerprint: "sha256:wrong" }, suite, fingerprint, currentCommit: commit }).join("\n"),
    /contractFingerprint/
  );
});

test("semantic independence requires distinct identities and run IDs", () => {
  const criterion = suite.criteria.find((item) => item.id === "CLARITY-001");
  const sameIdentity = [
    result("CLARITY-001", "llm", "grader-a", "run-a"),
    result("CLARITY-001", "llm", "grader-a", "run-b")
  ];
  const failed = resolveCriterionObservation({ criterion, observedById: indexObservations(sameIdentity), suite });
  assert.equal(failed.source, "invalid-observation");

  const independent = [
    result("CLARITY-001", "llm", "grader-a", "run-a"),
    result("CLARITY-001", "llm", "grader-b", "run-b")
  ];
  const passed = resolveCriterionObservation({ criterion, observedById: indexObservations(independent), suite });
  assert.equal(passed.passed, true);
  assert.equal(passed.score, 0.8);
});

test("an agent cannot submit a human observation", () => {
  const meta = observation([
    result("READER-001", "human", "reader-a", "reader-run", {
      grader: {
        type: "human",
        identity: "reader-a",
        name: "coded reader",
        runId: "reader-run",
        independentOfOptimizer: true,
        isAgent: true
      }
    })
  ]);
  assert.match(validateObservationMeta({ meta, suite, fingerprint, currentCommit: commit }).join("\n"), /non-agent human/);
});

test("passed evidence below the criterion threshold is rejected", () => {
  const meta = observation([result("CLARITY-001", "llm", "grader-a", "run-a", { score: 0.5 })]);
  assert.match(validateObservationMeta({ meta, suite, fingerprint, currentCommit: commit }).join("\n"), /cannot pass below/);
});

test("browser hard-gate evidence requires a score of one", () => {
  const invalid = observation([result("RESP-001", "browser", "playwright", "browser-run")]);
  assert.match(validateObservationMeta({ meta: invalid, suite, fingerprint, currentCommit: commit }).join("\n"), /cannot pass below 1/);
  const valid = observation([result("RESP-001", "browser", "playwright", "browser-run", { score: 1 })]);
  assert.deepEqual(validateObservationMeta({ meta: valid, suite, fingerprint, currentCommit: commit }), []);
});
