import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import {
  evaluateKnowledgeBank,
  validateKnowledgeDevelopmentSuite
} from "../check-knowledge-development.mjs";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";

const suite = JSON.parse(
  readFileSync(".agents/evals/knowledge-bank-development.json", "utf8")
);

test("knowledge-development suite is structurally valid", () => {
  assert.deepEqual(validateKnowledgeDevelopmentSuite(suite).errors, []);
});

test("current knowledge bank satisfies the frozen suite", () => {
  const result = evaluateKnowledgeBank(suite, knowledgeBank, 2);
  assert.equal(result.status, "threshold_met");
  assert.equal(result.weighted_score, 1);
  assert.ok(result.results.every((entry) => entry.pass));
});

test("an intake-linked source without decomposition fails KB-003", () => {
  const candidate = structuredClone(knowledgeBank);
  const sourceId = candidate.intake[0].sourceIds[0];
  candidate.sourceAssertions = candidate.sourceAssertions.filter(
    (assertion) => assertion.sourceId !== sourceId
  );

  const result = evaluateKnowledgeBank(suite, candidate, 2);
  const sourceDecomposition = result.results.find(
    (entry) => entry.eval_id === "KB-003"
  );
  assert.equal(sourceDecomposition.pass, false);
  assert.match(sourceDecomposition.findings.join("\n"), /no atomic assertion/);
});

test("a research-stage claim cannot become projection-eligible", () => {
  const candidate = structuredClone(knowledgeBank);
  const claim = candidate.claims.find(
    (entry) => entry.id === "CLM-NAC-CREATION-ROLE"
  );
  claim.projectionEligibility = "eligible";

  const result = evaluateKnowledgeBank(suite, candidate, 2);
  const maturityIntegrity = result.results.find(
    (entry) => entry.eval_id === "KB-004"
  );
  assert.equal(maturityIntegrity.pass, false);
  assert.match(maturityIntegrity.findings.join("\n"), /eligible before confirmation/);
});
