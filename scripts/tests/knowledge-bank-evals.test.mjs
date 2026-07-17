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

test("candidate claims resolve to proposition-level source support", () => {
  const candidate = cloneBank();
  const waterways = candidate.intakeItems.find((item) => item.id.includes("WATERWAYS"));
  waterways.candidateClaims.push("Jamie completed an unsupported accomplishment.");
  assert.match(validateKnowledgeContent(candidate).join("\n"), /not a supported proposition/);
});

test("proposition sources stay within the intake source set", () => {
  const candidate = cloneBank();
  const waterways = candidate.intakeItems.find((item) => item.id.includes("WATERWAYS"));
  waterways.propositions[0].sourceIds = ["SRC-CALLNYC-GITHUB-REPOSITORY"];
  assert.match(validateKnowledgeContent(candidate).join("\n"), /outside its intake source set/);
});

test("intake proof links must resolve to governed proofs", () => {
  const candidate = cloneBank();
  const nyca = candidate.intakeItems.find((item) => item.id.includes("NYCA"));
  nyca.relatedProofIds.push("unknown-governed-proof");
  assert.match(validateKnowledgeContent(candidate).join("\n"), /references unknown proof/);
});

test("tensions must resolve to propositions in the same intake item", () => {
  const candidate = cloneBank();
  const nyca = candidate.intakeItems.find((item) => item.id.includes("NYCA"));
  nyca.tensions[0].propositionIds = ["PROP-FROM-ANOTHER-HISTORY"];
  assert.match(validateKnowledgeContent(candidate).join("\n"), /references unknown intake proposition/);
});

test("tension proofs stay within the intake proof set", () => {
  const candidate = cloneBank();
  const nyca = candidate.intakeItems.find((item) => item.id.includes("NYCA"));
  nyca.relatedProofIds = ["nyc-artist-coalition-civic-systems"];
  assert.match(validateKnowledgeContent(candidate).join("\n"), /outside its intake proof set/);
});

test("correction triggers stay within their tension proof set", () => {
  const candidate = cloneBank();
  const nyca = candidate.intakeItems.find((item) => item.id.includes("NYCA"));
  nyca.tensions[0].correctionTriggers[0].targetProofId = "nyc-artist-coalition-civic-systems";
  assert.match(validateKnowledgeContent(candidate).join("\n"), /outside its tension proof set/);
});

function passingRun(target = "claim-development") {
  return {
    suite_id: suite.suite_id,
    target,
    candidate_sha: "candidate123",
    candidate_fingerprint: `sha256:${"a".repeat(64)}`,
    rubric_sha: "rubric123",
    contract_fingerprint: `sha256:${"b".repeat(64)}`,
    evidence_bundle_fingerprint: `sha256:${"c".repeat(64)}`,
    profile: target,
    evaluator_identity: "independent-test-judge",
    evaluator_authored_candidate: false,
    unresolved_blockers: [],
    next_action: null,
    final_state: "threshold_met",
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
