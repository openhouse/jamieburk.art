import assert from "node:assert/strict";
import test from "node:test";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import {
  buildKnowledgeReport,
  buildProjectionMap,
  queryKnowledgeBank,
  validateKnowledgeOperations
} from "../lib/knowledge-operations.mjs";

test("canonical knowledge operations validate without a second fact store", () => {
  const validation = validateKnowledgeOperations(knowledgeBank);
  assert.deepEqual(validation.errors, []);
  assert.equal(validation.passed, true);
});

test("report counts agree with canonical arrays", () => {
  const report = buildKnowledgeReport(knowledgeBank);
  assert.equal(report.counts.intakes, knowledgeBank.intakes.length);
  assert.equal(report.counts.sources, knowledgeBank.sources.length);
  assert.equal(report.counts.claims, knowledgeBank.claims.length);
  assert.equal(report.activeProjectionCount, buildProjectionMap(knowledgeBank).active.length);
});

test("query returns stable, public-safe summaries", () => {
  const results = queryKnowledgeBank(knowledgeBank, "CallNYC");
  assert.ok(results.length > 0);
  assert.ok(results.every((result) => result.id && result.type && result.summary));
  assert.doesNotMatch(JSON.stringify(results), /\/private\/tmp\/|\/Users\/|\/Volumes\//i);
});
