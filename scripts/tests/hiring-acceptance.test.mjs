import assert from "node:assert/strict";
import test from "node:test";

import {
  assessPublicCandidate,
  buildPublicCandidate,
  compareIdentityStatements,
  detectUnsafeHiringMutation,
  evaluateDiscovery,
  loadHiringContext,
  runHiringAcceptance,
  validateOpportunity
} from "../hiring-acceptance/lib.mjs";

function opportunityFixture(overrides = {}) {
  return {
    id: "opportunity.fixture",
    path: "fixture.md",
    organization: "Fixture",
    role_title: "Operations Lead",
    tier: 1,
    canonical_url: "https://asana.com/jobs/apply/fixture",
    source_type: "official-employer",
    opportunity_status: "live",
    verified_at: "2026-07-18",
    reverify_by: "2026-07-21",
    compensation: { currency: "USD", minimum: 120000, maximum: 140000 },
    location: { work_model: "remote" },
    reporting_line: { certainty: "unknown" },
    confirmed_facts: [],
    inferences: [],
    unknowns: [],
    hard_screens: [
      {
        id: "screen.fixture",
        kind: "experience",
        text: "Verify experience",
        candidate_state: "verify-before-application"
      }
    ],
    portfolio_routes: ["/", "/resume", "/contact"],
    acceptance_signals: ["delivery"],
    role_requirements: [
      {
        id: "requirement.fixture.delivery",
        importance: "critical",
        text: "Coordinate delivery",
        signal_terms: ["delivery"],
        wiki_evidence: ["proof.fixture"],
        source_status: "supported",
        public_evidence: ["/"],
        status: "visible-proven",
        gap_type: "none",
        next_action: "Retain"
      }
    ],
    one_year_success_conditions: [],
    one_year_risk_conditions: [],
    interview_questions: [],
    ...overrides
  };
}

function candidateFixture(text, routes = ["/", "/resume", "/contact"]) {
  return {
    issues: [],
    routes,
    files: [],
    text,
    candidateHash: "fixture-candidate"
  };
}

test("MUT-H001 hidden public proof lowers visible signal recall", () => {
  const result = assessPublicCandidate(
    opportunityFixture(),
    candidateFixture("Jamie coordinates work."),
    1
  );
  assert.equal(result.criticalSignalRecall, 0);
  assert.equal(result.criterionMet, false);
});

test("MUT-H002 vague actor language cannot satisfy the actor gate", () => {
  const result = assessPublicCandidate(
    opportunityFixture(),
    candidateFixture("Delivery is coordinated through a maintained plan."),
    1
  );
  assert.equal(result.actorVisible, false);
  assert.equal(result.criterionMet, false);
});

test("MUT-H003 sole-authorship inflation is detected", () => {
  assert.deepEqual(detectUnsafeHiringMutation("Jamie single-handedly built everything."), [
    "sole-authorship-inflation"
  ]);
});

test("MUT-H004 suspicious unsupported metric is routed to source review", () => {
  assert.deepEqual(detectUnsafeHiringMutation("Jamie drove 10x growth."), [
    "metric-requires-source-review"
  ]);
});

test("MUT-H005 hidden resume or contact prevents the target criterion", () => {
  const result = assessPublicCandidate(
    opportunityFixture(),
    candidateFixture("Jamie coordinates delivery.", ["/"]),
    1
  );
  assert.equal(result.resumeVisible, false);
  assert.equal(result.contactVisible, false);
  assert.equal(result.criterionMet, false);
});

test("MUT-H006 stale live opportunity fails validation", () => {
  const context = loadHiringContext();
  const issues = validateOpportunity(
    opportunityFixture({ reverify_by: "2026-07-01" }),
    { rubric: context.rubric, routes: context.routes, now: new Date("2026-07-18T12:00:00Z") }
  );
  assert.ok(issues.some((item) => item.code === "opportunity.stale"));
});

test("MUT-H007 missing hard-screen review fails validation", () => {
  const context = loadHiringContext();
  const issues = validateOpportunity(
    opportunityFixture({ hard_screens: [] }),
    { rubric: context.rubric, routes: context.routes, now: new Date("2026-07-18T12:00:00Z") }
  );
  assert.ok(issues.some((item) => item.code === "opportunity.hard-screen"));
});

test("MUT-H008 public evaluator rejects Wiki and private source paths", () => {
  const result = buildPublicCandidate(
    { routes: { "/": ["docs/knowledge-bank/README.md"] } },
    ["/"]
  );
  assert.ok(result.issues.some((item) => item.code === "public.private-leak"));
});

test("MUT-H009 missing mapped public evidence fails closed", () => {
  const result = buildPublicCandidate(
    { routes: { "/": ["apps/www/src/app/does-not-exist/page.tsx"] } },
    ["/"]
  );
  assert.ok(result.issues.some((item) => item.code === "public.file"));
});

test("MUT-H010 resume and portfolio identity contradiction is visible", () => {
  assert.equal(
    compareIdentityStatements("CallNYC, 2016", "CallNYC, 2017")[0].code,
    "candidate.identity-contradiction"
  );
});

test("current title-blind and negative-control discovery benchmarks pass", () => {
  const context = loadHiringContext();
  const result = evaluateDiscovery(context);
  assert.ok(result.titleBlind.every((item) => item.pass));
  assert.ok(result.negativeControls.every((item) => item.pass));
});

test("current target candidate meets only the deterministic public-signal criterion", () => {
  const result = runHiringAcceptance({ now: new Date("2026-07-18T12:00:00Z") });
  assert.deepEqual(result.issues, []);
  assert.equal(result.assessment.criterionMet, true);
  assert.match(result.assessment.authorityBoundary, /not a recruiter response/i);
  assert.equal(result.context.suite.humanReaderState, "not-run");
  assert.equal(result.context.suite.externalOutcomeState, "not-observed");
});
