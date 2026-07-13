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
const hybridPass = [
  { eval_id: "KB-007", score: 4, pass: true, evidence: ["blind collective-credit review"], findings: [], confidence: 0.95 },
  { eval_id: "KB-009", score: 4, pass: true, evidence: ["blind projection-coverage review"], findings: [], confidence: 0.95 }
];

test("knowledge-development suite is structurally valid", () => {
  assert.deepEqual(validateKnowledgeDevelopmentSuite(suite).errors, []);
});

test("current knowledge bank satisfies the frozen suite", () => {
  const result = evaluateKnowledgeBank(suite, knowledgeBank, 2, hybridPass);
  assert.equal(result.status, "threshold_met");
  assert.equal(result.weighted_score, 1);
  assert.ok(result.results.every((entry) => entry.pass));
});

test("campaign press corpus preserves all memberships without duplicating articles", () => {
  const pressIntake = knowledgeBank.intake.filter((item) =>
    item.id.includes("PRESS-CORPUS") && item.projects.includes("nyc-artist-coalition")
  );
  const indexIds = new Set([
    "SRC-NAC-LET-NYC-DANCE-PRESS-INDEX",
    "SRC-NAC-TALKS-NOT-RAIDS-PRESS-INDEX",
    "SRC-NAC-SAVE-NYC-SPACES-PRESS-INDEX",
    "SRC-NAC-FAIR-RENT-NYC-PRESS-INDEX-2021"
  ]);
  const articleMemberships = pressIntake.flatMap((item) =>
    item.sourceIds.filter((sourceId) => !indexIds.has(sourceId))
  );

  assert.equal(pressIntake.length, 4);
  assert.equal(articleMemberships.length, 45);
  assert.equal(new Set(articleMemberships).size, 44);

  const task = knowledgeBank.researchTasks.find(
    (item) => item.id === "TASK-NAC-CAMPAIGN-PRESS-CLOSE-READ"
  );
  assert.deepEqual(new Set(task.sourceIds), new Set(articleMemberships));

  const assertionSourceIds = new Set(
    knowledgeBank.sourceAssertions.map((assertion) => assertion.sourceId)
  );
  for (const sourceId of articleMemberships) {
    assert.equal(assertionSourceIds.has(sourceId), true, `${sourceId} lacks decomposition`);
  }
});

test("an intake-linked source without decomposition fails KB-003", () => {
  const candidate = structuredClone(knowledgeBank);
  const sourceId = candidate.intake[0].sourceIds[0];
  candidate.sourceAssertions = candidate.sourceAssertions.filter(
    (assertion) => assertion.sourceId !== sourceId
  );

  const result = evaluateKnowledgeBank(suite, candidate, 2, hybridPass);
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

  const result = evaluateKnowledgeBank(suite, candidate, 2, hybridPass);
  const maturityIntegrity = result.results.find(
    (entry) => entry.eval_id === "KB-004"
  );
  assert.equal(maturityIntegrity.pass, false);
  assert.match(maturityIntegrity.findings.join("\n"), /eligible before confirmation/);
});

test("hybrid criteria cannot pass without an independent scorecard", () => {
  const result = evaluateKnowledgeBank(suite, knowledgeBank, 2);
  assert.equal(result.status, "iterate");
  assert.equal(
    result.results.find((entry) => entry.eval_id === "KB-007").pass,
    false
  );
});
