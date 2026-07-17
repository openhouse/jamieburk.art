import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
  validateChadLensContracts,
  validateMorseLensContracts,
  validatePublicSourceContracts,
  validateSackLensContracts,
  validateSuite
} from "../check-portfolio-evals.mjs";
import { scoreRun } from "../score-portfolio-eval-run.mjs";

const suite = JSON.parse(
  readFileSync(".agents/evals/portfolio-production-readiness.json", "utf8")
);

const cloneSuite = () => structuredClone(suite);

test("canonical portfolio eval suite is valid", () => {
  assert.deepEqual(validateSuite(suite).errors, []);
});

test("weights must total 100", () => {
  const candidate = cloneSuite();
  candidate.evals[0].weight += 1;
  assert.match(validateSuite(candidate).errors.join("\n"), /weights must total 100/);
});

test("application threshold cannot require an unknown eval", () => {
  const candidate = cloneSuite();
  candidate.application_share_thresholds.required_eval_ids.push("PR-999");
  assert.match(validateSuite(candidate).errors.join("\n"), /unknown eval PR-999/);
});

test("Chad lens remains a blocking application criterion", () => {
  const candidate = cloneSuite();
  candidate.evals.find((entry) => entry.id === "PR-015").blocking = false;
  candidate.application_share_thresholds.required_eval_ids =
    candidate.application_share_thresholds.required_eval_ids.filter(
      (id) => id !== "PR-015"
    );
  const errors = validateSuite(candidate).errors.join("\n");
  assert.match(errors, /PR-015 Chad lens eval must be blocking/);
  assert.match(errors, /application sharing must require PR-015/);
});

test("Chad lens source contract requires visible actors and CallNYC boundaries", () => {
  const errors = validateChadLensContracts({
    hero: "Technical Project Manager - Product Operations & Implementation I create operating structure requirements, workflows, documentation, decision trails launch support, onboarding, and durable handoffs",
    work: 'summary: "Helped an 80+ year-old" summary: "Co-founded NYC Artist Coalition" summary: "Co-built a Django" summary: "Created repeatable" "CLM-CALLNYC-INDEPENDENT-FOLLOW-ON"',
    proofs: "CallNYC archived unofficial",
    technicalOperations: "CallNYC archived unofficial"
  });
  assert.match(errors.join("\n"), /explicit actor/);
});

test("canonical public source meets deterministic Chad lens contracts", () => {
  assert.deepEqual(validateChadLensContracts(), []);
});

test("Margaret Morse and Warren Sack lenses remain blocking application criteria", () => {
  const candidate = cloneSuite();
  for (const id of ["PR-016", "PR-017"]) {
    candidate.evals.find((entry) => entry.id === id).blocking = false;
    candidate.application_share_thresholds.required_eval_ids =
      candidate.application_share_thresholds.required_eval_ids.filter(
        (requiredId) => requiredId !== id
      );
  }
  const errors = validateSuite(candidate).errors.join("\n");
  assert.match(errors, /PR-016 Margaret Morse lens eval must be blocking/);
  assert.match(errors, /application sharing must require PR-016 Margaret Morse lens/);
  assert.match(errors, /PR-017 Warren Sack lens eval must be blocking/);
  assert.match(errors, /application sharing must require PR-017 Warren Sack lens/);
});

test("Margaret Morse lens requires embodied practice and title uncertainty", () => {
  const errors = validateMorseLensContracts({
    about: "Technical Project Manager",
    proofs: "",
    records: ""
  }).join("\n");
  assert.match(errors, /Structure grows from the material/);
  assert.match(errors, /protected evidence/);
  assert.match(errors, /title uncertainty/);
});

test("Warren Sack lens requires a specific model-interface chain and anti-claim", () => {
  const errors = validateSackLensContracts({
    about: "Original systems thinker",
    proofs: "",
    records: ""
  }).join("\n");
  assert.match(errors, /recursively overlapping Flickr groups/);
  assert.match(errors, /PROP-UCSC-SACK-SOCIAL-SOFTWARE-PROTOTYPES/);
  assert.match(errors, /Jamie invented structural equivalence/);
});

test("canonical public source meets deterministic professor lens contracts", () => {
  assert.deepEqual(validateMorseLensContracts(), []);
  assert.deepEqual(validateSackLensContracts(), []);
});

test("optimizer cannot grade its own patch", () => {
  const candidate = cloneSuite();
  candidate.optimization.optimizer_may_not_grade_own_patch = false;
  assert.match(validateSuite(candidate).errors.join("\n"), /may not grade its own patch/);
});

test("production requires repeat passing runs and human approval", () => {
  const candidate = cloneSuite();
  candidate.production_launch_thresholds.two_consecutive_passing_runs_required = false;
  candidate.production_launch_thresholds.human_production_approval_required = false;
  const errors = validateSuite(candidate).errors.join("\n");
  assert.match(errors, /two consecutive passing runs/);
  assert.match(errors, /human production approval/);
});

test("iteration records preserve the human-blocked stop state", () => {
  const candidate = cloneSuite();
  candidate.iteration_record_schema.allowed_decisions = ["accept", "reject"];
  assert.match(validateSuite(candidate).errors.join("\n"), /stop_human_blocked/);
});

test("download labels cannot point to the resume HTML page", () => {
  const errors = validatePublicSourceContracts([
    {
      path: "apps/www/src/components/Test.tsx",
      source: '<JBButton href="/resume">Download resume</JBButton>'
    }
  ]);
  assert.match(errors.join("\n"), /labels an HTML \/resume destination as a download/);
});

function passingRun(target = "application-share") {
  return {
    suite_id: suite.suite_id,
    target,
    candidate_sha: "abc123",
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
    blind_reader_median: 4,
    holdout_regression_pass: true,
    consecutive_passing_runs: 2,
    human_approval: {
      granted: true,
      candidate_sha: "abc123",
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

test("a complete approved application run is eligible", () => {
  const result = scoreRun(suite, passingRun());
  assert.equal(result.eligible, true);
  assert.equal(result.weighted_score, 1);
});

test("weighted strength cannot compensate for a failed blocker", () => {
  const run = passingRun();
  const blocker = suite.evals.find((entry) => entry.blocking);
  const result = run.results.find((entry) => entry.eval_id === blocker.id);
  result.score = 2;
  result.pass = false;
  const scored = scoreRun(suite, run);
  assert.equal(scored.eligible, false);
  assert.match(scored.blockers.join("\n"), new RegExp(blocker.id));
});

test("production requires two consecutive passing runs", () => {
  const run = passingRun("production-launch");
  run.consecutive_passing_runs = 1;
  const result = scoreRun(suite, run);
  assert.equal(result.eligible, false);
  assert.match(result.blockers.join("\n"), /two consecutive passing runs/);
});

test("human approval must name the evaluated candidate", () => {
  const run = passingRun();
  run.human_approval.candidate_sha = "different-sha";
  const result = scoreRun(suite, run);
  assert.equal(result.eligible, false);
  assert.match(result.blockers.join("\n"), /exact candidate SHA/);
});
