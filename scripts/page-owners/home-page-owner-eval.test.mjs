import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const contractPath = "evals/page-owners/home.json";

async function loadEvaluator() {
  return import("./home-page-owner-eval.mjs");
}

function loadContract() {
  return JSON.parse(readFileSync(contractPath, "utf8"));
}

function clone(value) {
  return structuredClone(value);
}

function loadPageSource(contract) {
  return contract.targetPaths
    .map((relativePath) => readFileSync(relativePath, "utf8"))
    .join("\n");
}

function loadModeledRun(contract) {
  return JSON.parse(readFileSync(contract.latestDevelopmentRunPath, "utf8"));
}

test("the homepage clears deterministic page-owner preflight", async () => {
  const { evaluateRepository } = await loadEvaluator();
  const result = evaluateRepository();

  assert.deepEqual(result.failures, []);
  assert.equal(result.deterministicVerdict, "pass");
  assert.equal(result.modeledReviewStatus, "advisory-pass");
});

test("a homepage change makes modeled sign-off stale", async () => {
  const { evaluateHomePageOwners } = await loadEvaluator();
  const contract = loadContract();
  const result = evaluateHomePageOwners({
    contract,
    pageSource: `${loadPageSource(contract)}\nchanged candidate`,
    modeledRun: loadModeledRun(contract)
  });

  assert.ok(result.failures.includes("latest_modeled_run_matches_candidate"));
  assert.equal(result.modeledReviewStatus, "stale-modeled-review");
});

test("a missing owner blocks modeled review", async () => {
  const { evaluateHomePageOwners } = await loadEvaluator();
  const contract = clone(loadContract());
  contract.owners.pop();
  const result = evaluateHomePageOwners({
    contract,
    pageSource: loadPageSource(contract)
  });

  assert.ok(result.failures.includes("four_distinct_homepage_owners"));
  assert.equal(result.modeledReviewStatus, "preflight-blocked");
});

test("owners cannot average away a failed sign-off", async () => {
  const { evaluateHomePageOwners } = await loadEvaluator();
  const contract = clone(loadContract());
  contract.passPolicy.averagingAllowed = true;
  const result = evaluateHomePageOwners({
    contract,
    pageSource: loadPageSource(contract)
  });

  assert.ok(result.failures.includes("all_owners_must_pass_without_averaging"));
});

test("modeled owners see rendered public pages, not source or prior output", async () => {
  const { evaluateHomePageOwners } = await loadEvaluator();
  const contract = clone(loadContract());
  contract.execution.repositoryAccess = true;
  contract.execution.priorOwnerOutputVisible = true;
  const result = evaluateHomePageOwners({
    contract,
    pageSource: loadPageSource(contract)
  });

  assert.ok(result.failures.includes("rendered_page_only_input_boundary"));
  assert.ok(result.failures.includes("owner_reviews_are_isolated"));
});

test("modeled owner names cannot become public endorsements", async () => {
  const { evaluateHomePageOwners } = await loadEvaluator();
  const contract = loadContract();
  const result = evaluateHomePageOwners({
    contract,
    pageSource: `${loadPageSource(contract)} Cyd Harrell approved this page.`
  });

  assert.ok(result.failures.includes("public_page_avoids_false_endorsement"));
});

test("the opening cannot regain competing hero actions", async () => {
  const { evaluateHomePageOwners } = await loadEvaluator();
  const contract = loadContract();
  const result = evaluateHomePageOwners({
    contract,
    pageSource: `${loadPageSource(contract)} See role-fit evidence`
  });

  assert.ok(result.failures.includes("one_three_route_orientation_point"));
});

test("the hero cannot regain a third explanation of the premise", async () => {
  const { evaluateHomePageOwners } = await loadEvaluator();
  const contract = loadContract();
  const result = evaluateHomePageOwners({
    contract,
    pageSource: `${loadPageSource(contract)} I clarify requirements, coordinate implementation`,
  });

  assert.ok(result.failures.includes("hero_states_the_promise_once"));
});

test("selected work cannot restate the operating premise before the proof", async () => {
  const { evaluateHomePageOwners } = await loadEvaluator();
  const contract = loadContract();
  const result = evaluateHomePageOwners({
    contract,
    pageSource: `${loadPageSource(contract)} Three different settings, one operating practice`,
  });

  assert.ok(result.failures.includes("selected_work_leads_directly_to_evidence"));
});

test("Sunday Dinner remains in the ranked homepage sequence", async () => {
  const { evaluateHomePageOwners } = await loadEvaluator();
  const contract = loadContract();
  const result = evaluateHomePageOwners({
    contract,
    pageSource: loadPageSource(contract).replace(
      '"kc-town-hall",\n  "196-sunday-dinner"',
      '"kc-town-hall",\n  "callnyc"'
    )
  });

  assert.ok(result.failures.includes("ranked_three_project_sequence"));
});

test("the uncalibrated modeled gate remains advisory", async () => {
  const { evaluateHomePageOwners } = await loadEvaluator();
  const contract = loadContract();
  const result = evaluateHomePageOwners({
    contract,
    pageSource: loadPageSource(contract)
  });

  assert.equal(contract.calibration.releaseAuthority, "advisory-until-calibrated");
  assert.equal(result.humanPublicationAuthority, "Jamie Burkart");
});
