import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const contractPath = "evals/page-owners/technical-operations.json";

async function loadEvaluator() {
  return import("./technical-operations-page-owner-eval.mjs");
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

test("the Technical Operations page clears deterministic page-owner preflight", async () => {
  const { evaluateRepository } = await loadEvaluator();
  const result = evaluateRepository();

  assert.deepEqual(result.failures, []);
  assert.equal(result.deterministicVerdict, "pass");
  assert.equal(result.modeledReviewStatus, "advisory-pass");
});

test("a page or proof change makes modeled sign-off stale", async () => {
  const { evaluateTechnicalOperationsPageOwners } = await loadEvaluator();
  const contract = loadContract();
  const result = evaluateTechnicalOperationsPageOwners({
    contract,
    pageSource: `${loadPageSource(contract)}\nchanged candidate`,
    modeledRun: loadModeledRun(contract)
  });

  assert.ok(result.failures.includes("latest_modeled_run_matches_candidate"));
  assert.equal(result.modeledReviewStatus, "stale-modeled-review");
});

test("a missing owner blocks modeled review", async () => {
  const { evaluateTechnicalOperationsPageOwners } = await loadEvaluator();
  const contract = clone(loadContract());
  contract.owners.pop();
  const result = evaluateTechnicalOperationsPageOwners({
    contract,
    pageSource: loadPageSource(contract)
  });

  assert.ok(
    result.failures.includes("four_distinct_technical_operations_owners")
  );
  assert.equal(result.modeledReviewStatus, "preflight-blocked");
});

test("owners cannot average away a failed sign-off", async () => {
  const { evaluateTechnicalOperationsPageOwners } = await loadEvaluator();
  const contract = clone(loadContract());
  contract.passPolicy.averagingAllowed = true;
  const result = evaluateTechnicalOperationsPageOwners({
    contract,
    pageSource: loadPageSource(contract)
  });

  assert.ok(result.failures.includes("all_owners_must_pass_without_averaging"));
});

test("modeled owners see rendered public pages, not source or prior output", async () => {
  const { evaluateTechnicalOperationsPageOwners } = await loadEvaluator();
  const contract = clone(loadContract());
  contract.execution.repositoryAccess = true;
  contract.execution.priorOwnerOutputVisible = true;
  const result = evaluateTechnicalOperationsPageOwners({
    contract,
    pageSource: loadPageSource(contract)
  });

  assert.ok(result.failures.includes("rendered_page_only_input_boundary"));
  assert.ok(result.failures.includes("owner_reviews_are_isolated"));
});

test("modeled owner names cannot become public endorsements", async () => {
  const { evaluateTechnicalOperationsPageOwners } = await loadEvaluator();
  const contract = loadContract();
  const result = evaluateTechnicalOperationsPageOwners({
    contract,
    pageSource: `${loadPageSource(contract)} Jennifer Pahlka approved this page.`
  });

  assert.ok(result.failures.includes("public_page_avoids_false_endorsement"));
});

test("the page cannot regain competing full-length proof maps", async () => {
  const { evaluateTechnicalOperationsPageOwners } = await loadEvaluator();
  const contract = loadContract();
  const result = evaluateTechnicalOperationsPageOwners({
    contract,
    pageSource: `${loadPageSource(contract)} JBCard`
  });

  assert.ok(
    result.failures.includes("compact_capability_index_preserves_deep_routes")
  );
});

test("case-study links retain destination-specific labels", async () => {
  const { evaluateTechnicalOperationsPageOwners } = await loadEvaluator();
  const contract = loadContract();
  const result = evaluateTechnicalOperationsPageOwners({
    contract,
    pageSource: loadPageSource(contract).replace(
      "Read the CallNYC case study",
      "Read case study"
    )
  });

  assert.ok(
    result.failures.includes("case_study_links_name_their_destinations")
  );
});

test("situation fields retain distinct responsibility and result jobs", async () => {
  const { evaluateTechnicalOperationsPageOwners } = await loadEvaluator();
  const contract = loadContract();
  const result = evaluateTechnicalOperationsPageOwners({
    contract,
    pageSource: loadPageSource(contract).replace(
      "coordinated day-to-day web and e-commerce work",
      "maintained the web and e-commerce presence"
    )
  });

  assert.ok(
    result.failures.includes("situation_fields_avoid_repeating_one_claim")
  );
});

test("the source-map result retains its plain-language projection", async () => {
  const { evaluateTechnicalOperationsPageOwners } = await loadEvaluator();
  const contract = loadContract();
  const result = evaluateTechnicalOperationsPageOwners({
    contract,
    pageSource: loadPageSource(contract).replace(
      "proof.shortWording",
      "proof.publicWording"
    )
  });

  assert.ok(result.failures.includes("source_map_uses_plain_language_projection"));
});

test("the three situation-to-result chains remain explicit", async () => {
  const { evaluateTechnicalOperationsPageOwners } = await loadEvaluator();
  const contract = loadContract();
  const result = evaluateTechnicalOperationsPageOwners({
    contract,
    pageSource: loadPageSource(contract).replace("What became usable", "Evidence")
  });

  assert.ok(result.failures.includes("situation_responsibility_result_chain"));
});

test("foregrounded results state their evidence maturity", async () => {
  const { evaluateTechnicalOperationsPageOwners } = await loadEvaluator();
  const contract = loadContract();
  const result = evaluateTechnicalOperationsPageOwners({
    contract,
    pageSource: loadPageSource(contract).replace(
      "current-service adoption and resident outcomes are not claimed",
      "impact"
    )
  });

  assert.ok(
    result.failures.includes("foregrounded_results_state_evidence_maturity")
  );
});

test("signature situations retain concrete operating mechanics", async () => {
  const { evaluateTechnicalOperationsPageOwners } = await loadEvaluator();
  const contract = loadContract();
  const result = evaluateTechnicalOperationsPageOwners({
    contract,
    pageSource: loadPageSource(contract).replace(
      "Operating mechanics",
      "Implementation"
    )
  });

  assert.ok(
    result.failures.includes("signature_situations_name_operating_mechanics")
  );
});

test("the five-part operating method remains intact", async () => {
  const { evaluateTechnicalOperationsPageOwners } = await loadEvaluator();
  const contract = loadContract();
  const result = evaluateTechnicalOperationsPageOwners({
    contract,
    pageSource: loadPageSource(contract).replace("Leave a useful handoff", "Finish")
  });

  assert.ok(result.failures.includes("five_part_operating_method"));
});

test("adoption language cannot outrun the available evidence", async () => {
  const { evaluateTechnicalOperationsPageOwners } = await loadEvaluator();
  const contract = loadContract();
  const result = evaluateTechnicalOperationsPageOwners({
    contract,
    pageSource: loadPageSource(contract).replace(
      "Prepare for adoption",
      "Support adoption"
    )
  });

  assert.ok(
    result.failures.includes("adoption_language_matches_available_evidence")
  );
});

test("the operating method retains routes to concrete project evidence", async () => {
  const { evaluateTechnicalOperationsPageOwners } = await loadEvaluator();
  const contract = loadContract();
  const result = evaluateTechnicalOperationsPageOwners({
    contract,
    pageSource: loadPageSource(contract).replace("Seen in ", "Example: ")
  });

  assert.ok(
    result.failures.includes("operating_method_routes_to_project_evidence")
  );
});

test("the uncalibrated modeled gate remains advisory", async () => {
  const { evaluateTechnicalOperationsPageOwners } = await loadEvaluator();
  const contract = loadContract();
  const result = evaluateTechnicalOperationsPageOwners({
    contract,
    pageSource: loadPageSource(contract)
  });

  assert.equal(contract.calibration.releaseAuthority, "advisory-until-calibrated");
  assert.equal(result.humanPublicationAuthority, "Jamie Burkart");
});
