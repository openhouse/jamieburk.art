import assert from "node:assert/strict";
import test from "node:test";
import {
  evaluateChadLens,
  evaluateKnowledgeLifecycle,
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

const lifecycleFixture = {
  schema:
    "intakeRecordSchema projectRecordSchema publicationDecisionSchema proofCoverageSchema publicSafety editorialStatus",
  records:
    "frameworkIntake frameworkProjects frameworkSources frameworkClaims frameworkInquiries frameworkPublicationDecisions frameworkProofCoverage",
  framework: [
    "No silent loss photoBrief",
    "LEAD-NYCARTC-COFOUNDING-MEMORY",
    "LEAD-CABARET-LAW-ROLE-MEMORY",
    "LEAD-OFFICE-NIGHTLIFE-ROLE-MEMORY",
    "LEAD-NIGHTLIFE-TOWN-HALLS-MEMORY",
    "LEAD-TALKS-NOT-RAIDS-MARCH-MEMORY",
    "LEAD-RAFT-GULF-MEMORY",
    "LEAD-WATERWAYS-PUBLIC-ENGAGEMENT-MEMORY",
    "LEAD-PITCH-RAFT-2007",
    "LEAD-CHARLOTTE-GREAT-ACCOMMODATIONS-2009",
    "LEAD-GOOD-TIMES-OPEN-HOUSE-2006",
    "LEAD-GOTHAMIST-CABARET-2017",
    "LEAD-NPR-CABARET-REPEAL-2017",
    "SRC-OPEN-HOUSE-GOOD-TIMES-2006",
    "SRC-RAFT-PITCH-2007",
    "SRC-GREAT-ACCOMMODATIONS-CHARLOTTE-STREET-2009",
    "SRC-NYCARTC-CABARET-GOTHAMIST-2017",
    "CLM-OPEN-HOUSE-PARTICIPATORY-PROGRAM",
    "CLM-GREAT-ACCOMMODATIONS-PARTICIPATORY-RIVER-PROGRAM",
    "CLM-RIVER-RAFT-EXPEDITION",
    "CLM-NYCARTC-CABARET-ORGANIZING",
    "CLM-PARTICIPATORY-SYSTEMS-LONGITUDINAL",
    'coverage("proof-a"'
  ].join(" "),
  knowledgeReadme:
    "No silent loss Evidentiary maturity Publication safety Editorial selection Publicly defensible does not mean selected",
  fairRentCase: "CLM-NYCARTC-CABARET-ORGANIZING cabaret-organizing",
  proofs: '    id: "proof-a"'
};

test("knowledge lifecycle passes with intake, maturity, coverage, and selection", () => {
  assert.deepEqual(evaluateKnowledgeLifecycle(lifecycleFixture), []);
});

test("knowledge lifecycle catches lost intake and uncovered public proofs", () => {
  const failures = evaluateKnowledgeLifecycle({
    ...lifecycleFixture,
    framework: "No silent loss",
    proofs: '    id: "uncovered-proof"'
  });

  assert.ok(failures.some((failure) => failure.includes("LEAD-RAFT-GULF-MEMORY")));
  assert.ok(failures.some((failure) => failure.includes("uncovered-proof")));
});
