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
    .filter((relativePath) => !relativePath.endsWith("public-registry.json"))
    .map((relativePath) => readFileSync(relativePath, "utf8"))
    .join("\n");
}

function loadRouteSource() {
  return readFileSync(
    "apps/www/src/app/work/technical-operations/page.tsx",
    "utf8"
  );
}

function loadCandidateSource(contract) {
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
    pageSource: loadPageSource(contract),
    routeSource: loadRouteSource(),
    candidateSource: `${loadCandidateSource(contract)}\nchanged candidate`,
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
    pageSource: loadPageSource(contract),
    routeSource: loadRouteSource(),
    candidateSource: loadCandidateSource(contract)
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

test("the page cannot regain a competing evidence map", async () => {
  const { evaluateTechnicalOperationsPageOwners } = await loadEvaluator();
  const contract = loadContract();
  const result = evaluateTechnicalOperationsPageOwners({
    contract,
    pageSource: `${loadPageSource(contract)} Evidence by capability`
  });

  assert.ok(result.failures.includes("method_is_the_only_evidence_route"));
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
    pageSource: loadPageSource(contract),
    candidateSource: loadCandidateSource(contract).replace(
      "coordinated day-to-day web and e-commerce work",
      "maintained the web and e-commerce presence"
    )
  });

  assert.ok(
    result.failures.includes("situation_fields_avoid_repeating_one_claim")
  );
});

test("supporting summaries do not regain a second proof list", async () => {
  const { evaluateTechnicalOperationsPageOwners } = await loadEvaluator();
  const contract = loadContract();
  const result = evaluateTechnicalOperationsPageOwners({
    contract,
    pageSource: `${loadPageSource(contract)} fair-rent-source-map`
  });

  assert.ok(
    result.failures.includes("supporting_proof_points_are_distinct_and_plain")
  );
});

test("the three situation-to-result chains remain explicit", async () => {
  const { evaluateTechnicalOperationsPageOwners } = await loadEvaluator();
  const contract = loadContract();
  const result = evaluateTechnicalOperationsPageOwners({
    contract,
    pageSource: loadPageSource(contract).replace("Result", "Evidence")
  });

  assert.ok(result.failures.includes("situation_responsibility_result_chain"));
});

test("supporting results state coordination value and distinguish prototype capability from adoption", async () => {
  const { evaluateTechnicalOperationsPageOwners } = await loadEvaluator();
  const contract = loadContract();
  const result = evaluateTechnicalOperationsPageOwners({
    contract,
    pageSource: loadPageSource(contract),
    candidateSource: loadCandidateSource(contract)
  });

  assert.equal(
    result.checks.supporting_results_state_non_artifact_value,
    true
  );
});

test("the opening defers to one five-part method instead of previewing a second map", async () => {
  const { evaluateTechnicalOperationsPageOwners } = await loadEvaluator();
  const contract = loadContract();
  const result = evaluateTechnicalOperationsPageOwners({
    contract,
    pageSource: loadPageSource(contract),
    candidateSource: loadCandidateSource(contract)
  });

  assert.equal(result.checks.opening_defers_to_one_method_sequence, true);
});

test("supporting proof points stay distinct, plain, and explicitly linked", async () => {
  const { evaluateTechnicalOperationsPageOwners } = await loadEvaluator();
  const contract = loadContract();
  const result = evaluateTechnicalOperationsPageOwners({
    contract,
    pageSource: loadPageSource(contract),
    routeSource: loadRouteSource(),
    candidateSource: loadCandidateSource(contract)
  });

  assert.equal(
    result.checks.supporting_proof_points_are_distinct_and_plain,
    true
  );
  assert.equal(result.checks.method_links_are_explicit_case_evidence, true);
});

test("supporting lifecycle safeguards stay concise and nonduplicative", async () => {
  const { evaluateTechnicalOperationsPageOwners } = await loadEvaluator();
  const contract = loadContract();
  const result = evaluateTechnicalOperationsPageOwners({
    contract,
    pageSource: loadPageSource(contract),
    candidateSource: loadCandidateSource(contract)
  });

  assert.equal(
    result.checks.supporting_status_is_concise_and_nonduplicative,
    true
  );
});

test("the strongest situation retains a distinct editorial hierarchy", async () => {
  const { evaluateTechnicalOperationsPageOwners } = await loadEvaluator();
  const contract = loadContract();
  const result = evaluateTechnicalOperationsPageOwners({
    contract,
    pageSource: loadPageSource(contract).replace(
      "const [primarySituation, ...supportingSituations] = signatureSituations",
      "const supportingSituations = signatureSituations"
    )
  });

  assert.ok(
    result.failures.includes(
      "signature_situations_have_weighted_editorial_hierarchy"
    )
  );
});

test("supporting situations stay compressed into one evidence paragraph", async () => {
  const { evaluateTechnicalOperationsPageOwners } = await loadEvaluator();
  const contract = loadContract();
  const result = evaluateTechnicalOperationsPageOwners({
    contract,
    pageSource: loadPageSource(contract),
    candidateSource: loadCandidateSource(contract)
  });

  assert.equal(result.checks.supporting_cases_remain_compressed_evidence, true);
});

test("foregrounded results state their evidence maturity", async () => {
  const { evaluateTechnicalOperationsPageOwners } = await loadEvaluator();
  const contract = loadContract();
  const result = evaluateTechnicalOperationsPageOwners({
    contract,
    pageSource: loadPageSource(contract).replace(
      "CLM-CALLNYC-ARCHIVED-UNOFFICIAL-STATUS",
      "CLM-CALLNYC-STATUS"
    )
  });

  assert.ok(
    result.failures.includes("foregrounded_results_state_evidence_maturity")
  );
});

test("signature situations retain concrete implementation methods", async () => {
  const { evaluateTechnicalOperationsPageOwners } = await loadEvaluator();
  const contract = loadContract();
  const result = evaluateTechnicalOperationsPageOwners({
    contract,
    pageSource: loadPageSource(contract).replaceAll(
      "Method",
      "Implementation"
    )
  });

  assert.ok(
    result.failures.includes("signature_situations_name_operating_mechanics")
  );
});

test("the historical Epstein case keeps lifecycle and handoff boundaries explicit", async () => {
  const { evaluateTechnicalOperationsPageOwners } = await loadEvaluator();
  const contract = loadContract();
  const result = evaluateTechnicalOperationsPageOwners({
    contract,
    pageSource: loadPageSource(contract).replaceAll(
      "CLM-HJE-THICK-ARTS-FORMALIZATION-2009-2015",
      "CLM-HJE-CHRONOLOGY"
    )
  });

  assert.ok(
    result.failures.includes("historical_hje_lifecycle_boundary_is_explicit")
  );
});

test("the active FairRentNYC case keeps lifecycle and authority boundaries explicit", async () => {
  const { evaluateTechnicalOperationsPageOwners } = await loadEvaluator();
  const contract = loadContract();
  const result = evaluateTechnicalOperationsPageOwners({
    contract,
    pageSource: loadPageSource(contract).replaceAll(
      "CLM-CRS-CAMPAIGN-MEMORY-SYSTEM-2026",
      "CLM-CRS-MEMORY"
    )
  });

  assert.ok(
    result.failures.includes("active_fair_rent_lifecycle_boundary_is_explicit")
  );
});

test("the archived CallNYC case keeps preservation and service boundaries explicit", async () => {
  const { evaluateTechnicalOperationsPageOwners } = await loadEvaluator();
  const contract = loadContract();
  const result = evaluateTechnicalOperationsPageOwners({
    contract,
    pageSource: loadPageSource(contract).replace(
      "CLM-CALLNYC-ARCHIVED-UNOFFICIAL-STATUS",
      "CLM-CALLNYC-STATUS"
    )
  });

  assert.ok(
    result.failures.includes(
      "archived_callnyc_lifecycle_and_preservation_are_explicit"
    )
  );
});

test("public copy stays direct and free of internal labels", async () => {
  const { evaluateTechnicalOperationsPageOwners } = await loadEvaluator();
  const contract = loadContract();
  const result = evaluateTechnicalOperationsPageOwners({
    contract,
    pageSource: `${loadPageSource(contract)} source lineage`
  });

  assert.ok(
    result.failures.includes("public_copy_uses_direct_operational_language")
  );
});

test("supporting cases avoid shared-memory and workstream shorthand", async () => {
  const { evaluateTechnicalOperationsPageOwners } = await loadEvaluator();
  const contract = loadContract();
  const result = evaluateTechnicalOperationsPageOwners({
    contract,
    pageSource: loadPageSource(contract),
    candidateSource: loadCandidateSource(contract).replace(
      "I turned meetings, public sources, policy questions, decisions, and assigned next steps into reviewable working records.",
      "I synthesized shared memory into actionable workstreams."
    )
  });

  assert.equal(result.checks.public_copy_uses_direct_operational_language, false);
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
    pageSource: loadPageSource(contract).replace("Case evidence: ", "Example: ")
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
