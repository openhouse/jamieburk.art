import assert from "node:assert/strict";
import test from "node:test";

import {
  evaluateHoldoutReceipt,
  evaluatePreLaunchSuite,
  loadSuite,
  planChangedPaths
} from "./lib.mjs";

const { suite } = loadSuite();
const digest = "a".repeat(64);

test("the frozen pre-launch contract retains full candidate gates", () => {
  assert.deepEqual(evaluatePreLaunchSuite(suite).errors, []);
});

test("selects testimony and Wiki checks for testimony changes", () => {
  const plan = planChangedPaths(
    ["docs/knowledge-bank/data/public-testimony/example.json"],
    suite
  );
  assert.deepEqual(plan.domains.sort(), ["knowledge-wiki", "testimony"]);
  assert.ok(plan.iterationCommands.includes("node scripts/public-testimony/check.mjs"));
  assert.ok(plan.iterationCommands.includes("npm run wiki:check"));
  assert.equal(plan.fullSuiteRequired, false);
});

test("rejects a declared command whose script or file does not exist", () => {
  const mutated = structuredClone(suite);
  mutated.domains[0].iterationCommands.push("npm run missing:command");
  assert.match(
    evaluatePreLaunchSuite(mutated).errors.join("\n"),
    /declared command is not executable/
  );
});

test("unknown paths fail closed to the full suite", () => {
  const plan = planChangedPaths(["unexpected/new-system.bin"], suite);
  assert.equal(plan.fullSuiteRequired, true);
  assert.ok(plan.iterationCommands.includes("npm run check"));
  assert.equal(plan.pathDispositions[0].disposition, "full-suite-fallback");
});

test("eval-contract changes require the full suite", () => {
  const plan = planChangedPaths(["evals/pre-launch/suite.json"], suite);
  assert.equal(plan.fullSuiteRequired, true);
  assert.ok(plan.domains.includes("repository-governance"));
});

test("budget exhaustion cannot become a pass", () => {
  const result = evaluateHoldoutReceipt(
    {
      state: "blocked-budget",
      candidateSha256: digest,
      contractSha256: digest,
      evidenceSha256: digest,
      consecutiveUnchangedPasses: 2
    },
    suite
  );
  assert.equal(result.pass, false);
  assert.match(result.reason, /blocked-budget/);
});

test("a pass requires exact bindings and consecutive unchanged passes", () => {
  const missingBinding = evaluateHoldoutReceipt(
    {
      state: "pass",
      candidateSha256: digest,
      contractSha256: "",
      evidenceSha256: digest,
      consecutiveUnchangedPasses: 2
    },
    suite
  );
  assert.equal(missingBinding.pass, false);

  const unstable = evaluateHoldoutReceipt(
    {
      state: "pass",
      candidateSha256: digest,
      contractSha256: digest,
      evidenceSha256: digest,
      consecutiveUnchangedPasses: 1
    },
    suite
  );
  assert.equal(unstable.pass, false);

  const valid = evaluateHoldoutReceipt(
    {
      state: "pass",
      candidateSha256: digest,
      contractSha256: digest,
      evidenceSha256: digest,
      consecutiveUnchangedPasses: 2
    },
    suite
  );
  assert.equal(valid.pass, true);
});
