import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { validateCompositeManifest } from "../check-composite-evals.mjs";
import { testFingerprint, validateRunBinding } from "../lib/eval-run-contract.mjs";

const manifest = JSON.parse(readFileSync(".agents/evals/composite-integration.json", "utf8"));
const clone = () => structuredClone(manifest);

test("the canonical composite contract is valid", () => {
  assert.deepEqual(validateCompositeManifest(manifest), []);
});

test("all A-N sources require a unique disposition", () => {
  const missing = clone();
  missing.source_dispositions = missing.source_dispositions.filter(({ source }) => source !== "I");
  assert.match(validateCompositeManifest(missing).join("\n"), /missing source disposition: I/);

  const duplicate = clone();
  duplicate.source_dispositions.push(structuredClone(duplicate.source_dispositions[0]));
  assert.match(validateCompositeManifest(duplicate).join("\n"), /duplicate source disposition: A/);
});

test("profile thresholds cannot drift from their canonical suites", () => {
  const broken = clone();
  broken.profiles.find(({ id }) => id === "knowledge-development").weighted_score_minimum = 0.82;
  assert.match(validateCompositeManifest(broken).join("\n"), /threshold drifts/);
});

test("grader roles cannot collapse human evidence into automation", () => {
  const broken = clone();
  broken.grader_roles.find(({ id }) => id === "human").may_not_be_simulated = false;
  assert.match(validateCompositeManifest(broken).join("\n"), /must not be simulated/);
});

test("immutable fingerprints and grader separation bind every scored run", () => {
  const suite = JSON.parse(readFileSync(".agents/evals/knowledge-bank-development.json", "utf8"));
  const run = {
    suite_id: suite.suite_id,
    target: "claim-development",
    profile: "claim-development",
    candidate_sha: "candidate",
    candidate_fingerprint: testFingerprint("a"),
    rubric_sha: "rubric",
    contract_fingerprint: testFingerprint("b"),
    evidence_bundle_fingerprint: testFingerprint("c"),
    evaluator_identity: "independent-holdout",
    evaluator_authored_candidate: false,
    content_scope: ["knowledge-lifecycle"],
    results: [],
    unresolved_blockers: [],
    next_action: null,
    final_state: "threshold_met",
    consecutive_passing_runs: 2
  };
  assert.deepEqual(validateRunBinding(suite, run), []);

  const stale = structuredClone(run);
  stale.evidence_bundle_fingerprint = "editable-checksum";
  assert.match(validateRunBinding(suite, stale).join("\n"), /sha256 fingerprint/);

  const selfGraded = structuredClone(run);
  selfGraded.evaluator_authored_candidate = true;
  assert.match(validateRunBinding(suite, selfGraded).join("\n"), /cannot certify threshold_met/);
});

test("human-blocked runs name the unresolved human gate", () => {
  const suite = JSON.parse(readFileSync(".agents/evals/knowledge-bank-development.json", "utf8"));
  const run = {
    suite_id: suite.suite_id,
    target: "projection-candidate",
    profile: "projection-candidate",
    candidate_sha: "candidate",
    candidate_fingerprint: testFingerprint("d"),
    rubric_sha: "rubric",
    contract_fingerprint: testFingerprint("e"),
    evidence_bundle_fingerprint: testFingerprint("f"),
    evaluator_identity: "automation",
    evaluator_authored_candidate: true,
    content_scope: ["knowledge-lifecycle"],
    results: [],
    unresolved_blockers: [],
    next_action: "Jamie reviews the exact candidate.",
    final_state: "human_blocked",
    consecutive_passing_runs: 0
  };
  assert.match(validateRunBinding(suite, run).join("\n"), /requires at least one unresolved blocker/);
});
