import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import {
  assessBlockingResults,
  assessProfile,
  compareObjectiveVectors,
  evaluateCompositeRepository,
  selectNextAction,
  validateBrowserReceipt,
  validateCompositeSuite
} from "../check-composite-evals.mjs";
import { buildIntakeLead } from "../intake-knowledge-lead.mjs";
import { queryKnowledgeBank } from "../query-knowledge-bank.mjs";

const suite = JSON.parse(readFileSync(".agents/evals/composite-system.json", "utf8"));
const packageJson = JSON.parse(readFileSync("package.json", "utf8"));

function clone(value) {
  return structuredClone(value);
}

test("composite suite covers the complete frozen branch family", () => {
  assert.deepEqual(validateCompositeSuite(suite).errors, []);
  assert.equal(suite.branch_family.length, 14);
});

test("a missing branch cannot disappear from the integration ledger", () => {
  const candidate = clone(suite);
  candidate.branch_family.pop();
  assert.match(validateCompositeSuite(candidate).errors.join("\n"), /A through N/);
});

test("observer classes cannot be collapsed into one agent", () => {
  const candidate = clone(suite);
  candidate.observer_types = ["deterministic", "llm_judge"];
  assert.match(validateCompositeSuite(candidate).errors.join("\n"), /six observer classes/);
});

test("external evidence cannot be self-certified", () => {
  const candidate = clone(suite);
  candidate.external_gates[0].status = "criteria_met";
  assert.match(validateCompositeSuite(candidate).errors.join("\n"), /cannot be self-certified/);
});

test("canonical layers cannot introduce competing truth stores", () => {
  const candidate = clone(suite);
  candidate.canonical_layers[1].canonical_store = candidate.canonical_layers[0].canonical_store;
  assert.match(validateCompositeSuite(candidate).errors.join("\n"), /duplicate truth stores/);
});

test("repository contract validates its commands, files, and decision ledger", () => {
  assert.deepEqual(evaluateCompositeRepository(suite, packageJson).errors, []);
});

test("protocol-only browser state remains not observed", () => {
  const repository = evaluateCompositeRepository(suite, packageJson);
  assert.equal(assessProfile(suite, repository, "browser").status, "not_observed");
});

function browserReceipt() {
  const routes = [
    "/", "/work", "/work/technical-operations", "/resume", "/contact", "/about",
    "/work/harry-j-epstein", "/work/fair-rent-nyc", "/work/callnyc",
    "/work/kc-town-hall", "/work/wowlist"
  ];
  return {
    version: 1,
    suite_id: "feature-evals-composite-browser",
    candidate_sha: "a".repeat(40),
    performed_at: "2026-07-16T12:00:00.000Z",
    browser: { engine: "chromium", headless: true },
    routes: routes.map((route) => ({
      route,
      viewports: [320, 375, 768, 1440].map((width) => ({
        width,
        height: 900,
        status: 200,
        overflow_x: false,
        console_errors: [],
        h1: "Heading"
      }))
    })),
    checks: {
      keyboard: { passed: true },
      citations: { passed: true },
      resume_download: { passed: true },
      metadata: { passed: true }
    }
  };
}

test("browser receipt requires the complete route and viewport population", () => {
  const receipt = browserReceipt();
  assert.deepEqual(validateBrowserReceipt(receipt), []);
  receipt.routes[0].viewports.pop();
  assert.match(validateBrowserReceipt(receipt).join("\n"), /320, 375, 768, and 1440/);
});

test("browser receipt cannot hide console failures", () => {
  const receipt = browserReceipt();
  receipt.routes[0].viewports[0].console_errors.push("Uncaught error");
  assert.match(validateBrowserReceipt(receipt).join("\n"), /console errors/);
});

test("browser receipt excludes protected local and authenticated markers", () => {
  const receipt = browserReceipt();
  receipt.notes = "Captured from /Users/example/private";
  assert.match(validateBrowserReceipt(receipt).join("\n"), /protected marker/);
});

test("application and release profiles stop at real external gates", () => {
  const repository = evaluateCompositeRepository(suite, packageJson);
  assert.equal(assessProfile(suite, repository, "application").status, "human_blocked");
  assert.equal(assessProfile(suite, repository, "release").status, "human_blocked");
});

test("lexicographic optimization rejects a semantic gain that weakens safety", () => {
  const before = { safetyFailures: 0, hardGateFailures: 0, blockingFailures: 1, weightedGap: 0.2, diffSize: 20 };
  const after = { safetyFailures: 1, hardGateFailures: 0, blockingFailures: 0, weightedGap: 0, diffSize: 10 };
  assert.deepEqual(compareObjectiveVectors(before, after), { accepted: false, decidingKey: "safetyFailures" });
});

test("the next action prioritizes safety before weighted semantic gaps", () => {
  const next = selectNextAction([
    { id: "SEM", category: "semantic", weight: 20, risk: 1 },
    { id: "SAFE", category: "safety", weight: 1, risk: 1 }
  ]);
  assert.equal(next.id, "SAFE");
});

test("a weighted score cannot average away a blocking failure", () => {
  const result = assessBlockingResults([
    { id: "BLOCK", blocking: true, pass: false, score: 2, weight: 10 },
    { id: "HIGH", blocking: false, pass: true, score: 4, weight: 90 }
  ], 3);
  assert.equal(result.weightedScore, 0.95);
  assert.equal(result.pass, false);
  assert.deepEqual(result.blockingFailures, ["BLOCK"]);
});

test("intake previews validate against the canonical schema", () => {
  const lead = buildIntakeLead({
    id: "INT-20260716-COMPOSITE-TEST",
    title: "Composite test lead",
    summary: "A public-safe test receipt for append-safe operator validation.",
    project: "callnyc",
    kind: "claim-lead",
    date: "2026-07-16"
  });
  assert.equal(lead.status, "captured");
  assert.equal(lead.disposition, "research-queued");
});

test("intake rejects private filesystem markers", () => {
  assert.throws(() => buildIntakeLead({
    title: "Private lead",
    summary: "Recovered from /Users/example/private",
    project: "callnyc",
    kind: "artifact-lead",
    date: "2026-07-16"
  }), /private-path/);
});

test("knowledge query requires a bounded filter", () => {
  assert.throws(() => queryKnowledgeBank({}), /bounded filter/);
  const result = queryKnowledgeBank({ project: "callnyc", publicationSafe: true, limit: 3 });
  assert.ok(result.claims.length > 0);
  assert.ok(result.sources.every(({ visibility }) => visibility === "public"));
  assert.deepEqual(result.researchTasks, []);
});
