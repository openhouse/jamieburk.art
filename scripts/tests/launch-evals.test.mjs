import assert from "node:assert/strict";
import test from "node:test";
import {
  evaluateChadLens,
  summarizeLaunchEvals
} from "../lib/launch-readiness-evals.mjs";

test("all passing weighted evals reach automated readiness", () => {
  const summary = summarizeLaunchEvals([
    { id: "a", weight: 60, hardGate: true, status: "pass" },
    { id: "b", weight: 40, hardGate: false, status: "pass" }
  ]);

  assert.equal(summary.score, 100);
  assert.equal(summary.hardGatesPass, true);
  assert.equal(summary.automatedReady, true);
});

test("a failed hard gate blocks readiness even above the score threshold", () => {
  const summary = summarizeLaunchEvals([
    { id: "a", weight: 95, hardGate: false, status: "pass" },
    { id: "b", weight: 5, hardGate: true, status: "fail" }
  ]);

  assert.equal(summary.score, 95);
  assert.equal(summary.hardGatesPass, false);
  assert.equal(summary.automatedReady, false);
  assert.deepEqual(summary.failedHardGateIds, ["b"]);
});

test("score threshold blocks an incomplete soft-criterion pass", () => {
  const summary = summarizeLaunchEvals([
    { id: "a", weight: 90, hardGate: true, status: "pass" },
    { id: "b", weight: 10, hardGate: false, status: "fail" }
  ]);

  assert.equal(summary.score, 90);
  assert.equal(summary.hardGatesPass, true);
  assert.equal(summary.automatedReady, false);
});

const compliantChadLensFixture = {
  hero: [
    "Technical Project Manager - Product Operations & Implementation",
    "I turn emerging work into usable systems for complex public-facing teams.",
    "I help teams",
    "View selected work",
    "Download resume",
    "Contact Jamie"
  ].join(" "),
  homePage:
    'Quick path through the portfolio emerging,\n high-context work href: "/work/technical-operations" href: "/resume"',
  technicalOperations: [
    "Role fit at a glance",
    "Where I enter",
    "What I coordinate",
    "What teams can use afterward",
    "A public-facing project has multiple stakeholders",
    "I coordinate requirements",
    "Teams leave with",
    ...Array.from({ length: 8 }, (_, index) => `proof:\n      "I proof ${index}"`)
  ].join(" "),
  resumePage: [
    "Technical Project Manager - Product Operations & Implementation",
    "I turn emerging work into usable systems for complex public-facing teams.",
    "Selected impact",
    "Download resume PDF",
    "Contact Jamie"
  ].join(" "),
  proofs: [
    'id: "career-operating-structure-14-years"',
    'id: "hje-revenue-growth-contribution"',
    'id: "fair-rent-campaign-memory"',
    'id: "callnyc-council-member-amplification"'
  ].join(" "),
  chadGuide: [
    "Is Jamie visible as the actor?",
    'Does the sentence answer "toward what end?"',
    "Does the language say what became usable?",
    "courageous precision"
  ].join(" ")
};

test("Chad lens passes when actor, end, outputs, proof, and path are explicit", () => {
  assert.deepEqual(evaluateChadLens(compliantChadLensFixture), []);
});

test("Chad lens reports reader burden and actorless proof summaries", () => {
  const failures = evaluateChadLens({
    ...compliantChadLensFixture,
    homePage: "ambiguous, high-context situations",
    technicalOperations: "systems systems systems"
  });

  assert.ok(failures.some((failure) => failure.includes("Where I enter")));
  assert.ok(failures.some((failure) => failure.includes("actor-led proof summaries")));
  assert.ok(failures.some((failure) => failure.includes("ambiguity")));
});
