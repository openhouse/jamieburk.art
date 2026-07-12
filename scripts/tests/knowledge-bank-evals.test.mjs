import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import { validateKnowledgeContent, validateSuite } from "../check-knowledge-bank-evals.mjs";
import { scoreRun } from "../score-knowledge-bank-eval-run.mjs";

const suite = JSON.parse(readFileSync(".agents/evals/knowledge-bank-development.json", "utf8"));
const cloneSuite = () => structuredClone(suite);
const cloneBank = () => structuredClone(knowledgeBank);

test("canonical knowledge-bank development suite is valid", () => {
  assert.deepEqual(validateSuite(suite).errors, []);
});

test("knowledge-bank eval weights must total 100", () => {
  const candidate = cloneSuite();
  candidate.evals[0].weight += 1;
  assert.match(validateSuite(candidate).errors.join("\n"), /weights must total 100/);
});

test("source, credit, maturity, integrity, and process evals remain blocking", () => {
  const candidate = cloneSuite();
  candidate.evals.find((entry) => entry.id === "KB-003").blocking = false;
  assert.match(validateSuite(candidate).errors.join("\n"), /KB-003 must remain blocking/);
});

test("canonical knowledge content meets deterministic contracts", () => {
  assert.deepEqual(validateKnowledgeContent(), []);
});

test("intake cannot become directly projectable", () => {
  const candidate = cloneBank();
  candidate.intakeItems[0].projectionStatus = "public-projection";
  assert.match(validateKnowledgeContent(candidate).join("\n"), /projectable directly from intake/);
});

test("memory fragments must remain labeled as research leads", () => {
  const candidate = cloneBank();
  const memory = candidate.intakeItems.find((item) => item.kind === "memory-fragment");
  memory.boundaries = memory.boundaries.filter((boundary) => !/memory|recollection|research lead/i.test(boundary));
  assert.match(validateKnowledgeContent(candidate).join("\n"), /does not label memory as a research lead/);
});

test("sources must preserve affirmative and negative support boundaries", () => {
  const candidate = cloneBank();
  candidate.sources[0].doesNotEstablish = [];
  assert.match(validateKnowledgeContent(candidate).join("\n"), /does not state what it cannot establish/);
});

function passingRun(target = "claim-development") {
  return {
    suite_id: suite.suite_id,
    target,
    candidate_sha: "candidate123",
    rubric_sha: "rubric123",
    content_scope: ["INTAKE-TEST"],
    consecutive_passing_runs: 2,
    holdout_regression_pass: true,
    human_approval: {
      granted: true,
      candidate_sha: "candidate123",
      approved_by: "Jamie Burkart",
      approved_at: "2026-07-12"
    },
    results: suite.evals.map((entry) => ({
      eval_id: entry.id,
      score: 4,
      pass: true,
      evidence: ["observed evidence"],
      findings: [],
      recommended_next_move: null,
      confidence: 0.9
    }))
  };
}

test("two complete claim-development passes are eligible", () => {
  const result = scoreRun(suite, passingRun());
  assert.equal(result.eligible, true);
  assert.equal(result.weighted_score, 1);
});

test("claim development requires two consecutive passing runs", () => {
  const run = passingRun();
  run.consecutive_passing_runs = 1;
  const result = scoreRun(suite, run);
  assert.equal(result.eligible, false);
  assert.match(result.blockers.join("\n"), /two consecutive passing runs/);
});

test("projection candidates require exact human approval", () => {
  const run = passingRun("projection-candidate");
  run.human_approval.candidate_sha = "another-candidate";
  const result = scoreRun(suite, run);
  assert.equal(result.eligible, false);
  assert.match(result.blockers.join("\n"), /exact candidate SHA/);
});
