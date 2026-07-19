import assert from "node:assert/strict";
import test from "node:test";
import {
  buildEvaluatorPacket,
  loadHiringContext,
  publicOpportunityContext,
  resolveOpportunityGaps,
  runTitleBlindDiscovery,
  sha256,
  stableJson,
  validateHiringContext
} from "../hiring-acceptance/lib.mjs";

function cloneContext() {
  return structuredClone(loadHiringContext());
}

function errorCodes(result) {
  return new Set(result.errors.map((error) => error.code));
}

function publicSnapshot(routes, label = "Public content") {
  const pages = routes.map((route) => ({
    route,
    status: 200,
    text: `${label} for ${route}`,
    htmlHash: sha256(route)
  }));
  return {
    source: "live-http",
    baseUrl: "https://example.test",
    snapshotHash: sha256(stableJson(pages)),
    pages
  };
}

test("canonical employment context passes every machine hard gate", () => {
  const result = validateHiringContext(loadHiringContext());
  assert.deepEqual(result.errors, []);
  assert.equal(result.metrics.opportunities, 6);
  assert.ok(result.metrics.requirements >= 47);
  assert.equal(result.metrics.titleBlindTopKRecall, 1);
});

test("title-blind discovery never needs organization or role titles", () => {
  const context = cloneContext();
  const before = runTitleBlindDiscovery(context);
  for (const opportunity of context.opportunities) {
    opportunity.data.organization = "hidden";
    opportunity.data.role_title = "hidden";
    opportunity.data.title = "hidden";
  }
  const after = runTitleBlindDiscovery(context);
  assert.deepEqual(after.topK, before.topK);
  assert.equal(after.recall, 1);
});

test("title-blind discovery applies hard screens before signal ranking", () => {
  const context = cloneContext();
  const control = context.discovery.negativeControls[0];
  control.signals = [...context.discovery.profileSignals];
  const result = runTitleBlindDiscovery(context);
  assert.ok(result.screenedOut.some((candidate) => candidate.id === control.id));
  assert.ok(!result.topK.includes(control.id));
  assert.equal(result.negativeControlsRejected, context.discovery.negativeControls.length);
});

test("public evaluator context excludes Wiki-only evidence", () => {
  const opportunity = loadHiringContext().opportunities[0];
  const publicContext = publicOpportunityContext(opportunity);
  const raw = JSON.stringify(publicContext);
  assert.doesNotMatch(raw, /proof_refs|proofRefs|wiki_records|wikiRecords|coverage_status|gap_type/);
  assert.match(raw, /requirements/);
  assert.match(raw, /portfolioRoutes/);
});

test("gap resolver remains a separate Wiki-aware operator", () => {
  const result = resolveOpportunityGaps(
    "opportunity.nyc-oti.technical-operations-manager.782369"
  );
  assert.equal(result.state, "public-safe-wiki-gap-analysis");
  assert.ok(result.findings.some((finding) => finding.wikiRecords.length));
  assert.ok(result.findings.every((finding) => finding.requiresHumanApproval));
});

test("evaluator packet is deterministic for frozen inputs and leaves decision open", () => {
  const context = loadHiringContext();
  const opportunity = context.opportunities[0];
  const reader = context.readers.find((item) => item.data.id === "reader.generic-recruiter");
  const snapshot = publicSnapshot(opportunity.data.portfolio_routes);
  const options = {
    opportunity,
    reader,
    snapshot,
    binding: {
      candidateSha: "a".repeat(40),
      worktreeClean: true,
      worktreeStateHash: sha256("")
    },
    suite: context.suite,
    contract: context.contract,
    timestamp: "2026-07-18T12:00:00.000Z"
  };
  const first = buildEvaluatorPacket(options);
  const second = buildEvaluatorPacket(options);
  assert.deepEqual(first, second);
  assert.equal(first.outputState.decision, null);
  assert.equal(first.outputState.humanOrIndependentModelReview, "not-run");
  assert.doesNotMatch(stableJson(first.inputs), /wikiRecords|proofRefs|coverageStatus/);
});

test("mutation rejects a stale current role", () => {
  const context = cloneContext();
  context.opportunities[0].data.reverify_by = "2026-07-17";
  assert.ok(errorCodes(validateHiringContext(context)).has("stale-opportunity"));
});

test("mutation rejects duplicate stable requirement IDs", () => {
  const context = cloneContext();
  context.opportunities[1].data.role_requirements[0].id =
    context.opportunities[0].data.role_requirements[0].id;
  assert.ok(errorCodes(validateHiringContext(context)).has("duplicate-requirement-id"));
});

test("mutation rejects an unknown governed proof", () => {
  const context = cloneContext();
  context.opportunities[0].data.role_requirements[0].proof_refs = ["proof.not-real"];
  assert.ok(errorCodes(validateHiringContext(context)).has("unknown-proof-ref"));
});

test("mutation rejects a private locator in public role context", () => {
  const context = cloneContext();
  context.opportunities[0].raw += "\n/private source: /Users/example/mail.txt\n";
  assert.ok(errorCodes(validateHiringContext(context)).has("private-marker"));
});

test("mutation rejects private job-search state", () => {
  const context = cloneContext();
  context.opportunities[0].data.warm_path = ["private person"];
  assert.ok(errorCodes(validateHiringContext(context)).has("private-job-search-field"));
});

test("mutation rejects camelCase private job-search state", () => {
  const context = cloneContext();
  context.opportunities[0].data.applicationStatus = "drafted";
  assert.ok(errorCodes(validateHiringContext(context)).has("private-job-search-field"));
});

test("mutation rejects sole-authorship inflation", () => {
  const context = cloneContext();
  context.opportunities[0].raw += "\nJamie single-handedly created the coalition.\n";
  assert.ok(errorCodes(validateHiringContext(context)).has("sole-authorship-drift"));
});

test("mutation rejects a hidden hard screen", () => {
  const context = cloneContext();
  const opportunity = context.opportunities[0].data;
  const hardId = opportunity.hard_requirements[0];
  opportunity.role_requirements.find((requirement) => requirement.id === hardId).kind =
    "capability";
  assert.ok(errorCodes(validateHiringContext(context)).has("hidden-hard-screen"));
});

test("mutation rejects a typed hard screen omitted from the reverse index", () => {
  const context = cloneContext();
  context.opportunities[0].data.hard_requirements.pop();
  assert.ok(errorCodes(validateHiringContext(context)).has("hard-screen-closure"));
});

test("mutation rejects a role fact set detached from its official source", () => {
  const context = cloneContext();
  context.opportunities[0].data.official_source.supports = ["role_title"];
  assert.ok(errorCodes(validateHiringContext(context)).has("unsupported-role-fact-class"));
});

test("mutation rejects visible-proven coverage backed only by weak proof debt", () => {
  const context = cloneContext();
  const requirement = context.opportunities
    .flatMap((opportunity) => opportunity.data.role_requirements)
    .find((item) => item.coverage_status === "visible-proven");
  requirement.proof_refs = ["hje-revenue-growth-contribution"];
  assert.ok(errorCodes(validateHiringContext(context)).has("overstated-proof-coverage"));
});

test("mutation rejects an unsourced named lens", () => {
  const context = cloneContext();
  const reader = context.readers.find((item) => item.data.id === "reader.herminia-ibarra");
  reader.data.public_sources = [];
  assert.ok(errorCodes(validateHiringContext(context)).has("unsourced-named-reader"));
});

test("mutation rejects named-reader sources without position-matched notes", () => {
  const context = cloneContext();
  const reader = context.readers.find((item) => item.data.id === "reader.herminia-ibarra");
  reader.data.source_notes = [];
  assert.ok(errorCodes(validateHiringContext(context)).has("unbound-reader-source"));
});

test("mutation rejects a disclaimer that implies actual participation", () => {
  const context = cloneContext();
  const reader = context.readers.find((item) => item.data.id === "reader.amy-edmondson");
  reader.data.disclaimer = "Helpful expert profile.";
  const codes = errorCodes(validateHiringContext(context));
  assert.ok(codes.has("missing-reader-disclaimer") || codes.has("weak-reader-disclaimer"));
});

test("mutation rejects development and holdout panel leakage", () => {
  const context = cloneContext();
  context.suite.panels.holdout.push(context.suite.panels.development[0]);
  assert.ok(errorCodes(validateHiringContext(context)).has("panel-leak"));
});

test("mutation rejects private material in an evaluator snapshot", () => {
  const context = loadHiringContext();
  const routes = context.opportunities[0].data.portfolio_routes;
  const snapshot = publicSnapshot(routes);
  snapshot.pages[0].text = "/Users/example/private";
  assert.throws(
    () =>
      buildEvaluatorPacket({
        opportunity: context.opportunities[0],
        reader: context.readers[0],
        snapshot,
        binding: { candidateSha: "a".repeat(40), worktreeClean: true, worktreeStateHash: sha256("") },
        suite: context.suite,
        contract: context.contract
      }),
    /absolute user path/
  );
});

test("mutation rejects a dirty worktree evaluator binding", () => {
  const context = loadHiringContext();
  const opportunity = context.opportunities[0];
  assert.throws(
    () =>
      buildEvaluatorPacket({
        opportunity,
        reader: context.readers[0],
        snapshot: publicSnapshot(opportunity.data.portfolio_routes),
        binding: {
          candidateSha: "a".repeat(40),
          worktreeClean: false,
          worktreeStateHash: sha256("changed file contents")
        },
        suite: context.suite,
        contract: context.contract
      }),
    /clean worktree/
  );
});

test("mutation rejects an incomplete public route snapshot", () => {
  const context = loadHiringContext();
  const opportunity = context.opportunities[0];
  const routes = opportunity.data.portfolio_routes;
  assert.throws(
    () =>
      buildEvaluatorPacket({
        opportunity,
        reader: context.readers[0],
        snapshot: publicSnapshot(routes.slice(1)),
        binding: {
          candidateSha: "a".repeat(40),
          worktreeClean: true,
          worktreeStateHash: sha256("")
        },
        suite: context.suite,
        contract: context.contract
      }),
    /missing required routes/
  );
});

test("mutation rejects a forged or stale public snapshot hash", () => {
  const context = loadHiringContext();
  const opportunity = context.opportunities[0];
  const snapshot = publicSnapshot(opportunity.data.portfolio_routes);
  snapshot.pages[0].text = "Changed after capture";
  assert.throws(
    () =>
      buildEvaluatorPacket({
        opportunity,
        reader: context.readers[0],
        snapshot,
        binding: {
          candidateSha: "a".repeat(40),
          worktreeClean: true,
          worktreeStateHash: sha256("")
        },
        suite: context.suite,
        contract: context.contract
      }),
    /snapshot hash/
  );
});

test("mutation rejects non-live evaluator snapshots", () => {
  const context = loadHiringContext();
  const opportunity = context.opportunities[0];
  const snapshot = publicSnapshot(opportunity.data.portfolio_routes);
  snapshot.source = "fixture";
  assert.throws(
    () =>
      buildEvaluatorPacket({
        opportunity,
        reader: context.readers[0],
        snapshot,
        binding: {
          candidateSha: "a".repeat(40),
          worktreeClean: true,
          worktreeStateHash: sha256("")
        },
        suite: context.suite,
        contract: context.contract
      }),
    /live HTTP/
  );
});

test("mutation rejects evaluator impersonation of a named reader", () => {
  const context = loadHiringContext();
  const opportunity = context.opportunities[0];
  const reader = context.readers.find((item) => item.data.id === "reader.lisa-gelobter");
  assert.throws(
    () =>
      buildEvaluatorPacket({
        opportunity,
        reader,
        snapshot: publicSnapshot(opportunity.data.portfolio_routes),
        binding: {
          candidateSha: "a".repeat(40),
          worktreeClean: true,
          worktreeStateHash: sha256("")
        },
        suite: context.suite,
        contract: context.contract,
        evaluatorIdentity: "Lisa Gelobter"
      }),
    /cannot impersonate/
  );
});

test("mutation rejects optimizer self-grading", () => {
  const context = loadHiringContext();
  const opportunity = context.opportunities[0];
  const snapshot = publicSnapshot(opportunity.data.portfolio_routes);
  assert.throws(
    () =>
      buildEvaluatorPacket({
        opportunity,
        reader: context.readers[0],
        snapshot,
        binding: { candidateSha: "a".repeat(40), worktreeClean: true, worktreeStateHash: sha256("") },
        suite: context.suite,
        contract: context.contract,
        optimizerIdentity: "same",
        evaluatorIdentity: "same"
      }),
    /must differ/
  );
});
