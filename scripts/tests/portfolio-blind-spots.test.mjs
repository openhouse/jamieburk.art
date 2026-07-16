import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import {
  buildBlindSpotRepoState,
  evaluateBlindSpots,
  validateBlindSpotSuite
} from "../check-portfolio-blind-spots.mjs";

const suite = JSON.parse(
  readFileSync(".agents/evals/portfolio-blind-spots.json", "utf8")
);
const evidence = JSON.parse(
  readFileSync(
    "docs/knowledge-bank/data/portfolio-blind-spots-evidence-2026-07-15.json",
    "utf8"
  )
);
const state = buildBlindSpotRepoState();

const clone = (value) => structuredClone(value);

test("blind-spot suite defines all seven weighted controls", () => {
  assert.deepEqual(validateBlindSpotSuite(suite).errors, []);
});

test("machine criteria are met while missing human evidence stops honestly", () => {
  const assessment = evaluateBlindSpots(suite, evidence, state);
  assert.deepEqual(assessment.errors, []);
  assert.equal(assessment.status, "human_blocked");
  assert.equal(assessment.machineScore, 1);
  assert.equal(assessment.humanCriteriaMet, false);
});

test("zero collaborator reviews cannot be reported as criteria met", () => {
  const candidate = clone(evidence);
  const result = candidate.results.find(({ evalId }) => evalId === "BS-001");
  result.status = "criteria_met";
  result.score = 4;
  assert.match(
    evaluateBlindSpots(suite, candidate, state).errors.join("\n"),
    /cannot pass without independent candidate and collaborator review/
  );
});

test("unknown current proof cannot satisfy the currency eval", () => {
  const candidate = clone(evidence);
  candidate.currentEvidence[0].proofId = "invented-current-proof";
  assert.match(
    evaluateBlindSpots(suite, candidate, state).errors.join("\n"),
    /current evidence is incomplete, unknown, or unbounded/
  );
});

test("an outcome chain without a causal boundary fails", () => {
  const candidate = clone(evidence);
  candidate.outcomeChains[1].sourceBackedBoundary =
    "The work produced every subsequent policy result.";
  assert.match(
    evaluateBlindSpots(suite, candidate, state).errors.join("\n"),
    /outcome chains are incomplete, unresolved, or causally unbounded/
  );
});

test("visual criterion cannot pass with no selected or cleared files", () => {
  const candidate = clone(evidence);
  const result = candidate.results.find(({ evalId }) => evalId === "BS-006");
  result.status = "criteria_met";
  result.score = 4;
  assert.match(
    evaluateBlindSpots(suite, candidate, state).errors.join("\n"),
    /cannot pass without selected, rights-cleared project visuals/
  );
});

test("maintenance snapshot drift is detected", () => {
  const candidate = clone(evidence);
  candidate.maintenanceSnapshot.fingerprint = "0".repeat(64);
  assert.match(
    evaluateBlindSpots(suite, candidate, state).errors.join("\n"),
    /maintenance fingerprint does not match/
  );
});

test("role clarity cannot pass if the role disappears from the first viewport", () => {
  const candidateState = {
    ...state,
    hero: state.hero.replaceAll("Technical Project Manager", "Project contributor")
  };
  assert.match(
    evaluateBlindSpots(suite, evidence, candidateState).errors.join("\n"),
    /role conversion evidence does not meet/
  );
});
