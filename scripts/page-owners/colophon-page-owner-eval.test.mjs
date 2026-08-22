import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const contractPath = "evals/page-owners/colophon.json";

async function loadEvaluator() {
  return import("./colophon-page-owner-eval.mjs");
}

function loadContract() {
  return JSON.parse(readFileSync(contractPath, "utf8"));
}

function clone(value) {
  return structuredClone(value);
}

function loadPageSource(contract) {
  return [contract.targetPath, contract.supportingPublicDataPath]
    .map((relativePath) => readFileSync(relativePath, "utf8"))
    .join("\n");
}

function loadModeledRun(contract) {
  return JSON.parse(readFileSync(contract.latestDevelopmentRunPath, "utf8"));
}

test("the colophon clears deterministic page-owner preflight", async () => {
  const { evaluateRepository } = await loadEvaluator();
  const result = evaluateRepository();

  assert.deepEqual(result.failures, []);
  assert.equal(result.deterministicVerdict, "pass");
  assert.equal(result.modeledReviewStatus, "advisory-pass");
});

test("a page change makes the modeled sign-off stale", async () => {
  const { evaluateColophonPageOwners } = await loadEvaluator();
  const contract = loadContract();
  const result = evaluateColophonPageOwners({
    contract,
    pageSource: `${loadPageSource(contract)}\nchanged candidate`,
    modeledRun: loadModeledRun(contract)
  });

  assert.ok(result.failures.includes("latest_modeled_run_matches_candidate"));
  assert.equal(result.modeledReviewStatus, "stale-modeled-review");
});

test("a missing editorial discipline blocks modeled review", async () => {
  const { evaluateColophonPageOwners } = await loadEvaluator();
  const contract = clone(loadContract());
  contract.owners.pop();

  const result = evaluateColophonPageOwners({
    contract,
    pageSource: loadPageSource(contract)
  });

  assert.ok(result.failures.includes("three_distinct_editorial_owners"));
  assert.equal(result.modeledReviewStatus, "preflight-blocked");
});

test("owners cannot average away a failed sign-off", async () => {
  const { evaluateColophonPageOwners } = await loadEvaluator();
  const contract = clone(loadContract());
  contract.passPolicy.averagingAllowed = true;

  const result = evaluateColophonPageOwners({
    contract,
    pageSource: loadPageSource(contract)
  });

  assert.ok(result.failures.includes("all_owners_must_pass_without_averaging"));
});

test("each owner returns critique before a binary verdict", async () => {
  const { evaluateColophonPageOwners } = await loadEvaluator();
  const contract = clone(loadContract());
  contract.owners[0].outputOrder = ["result", "critique"];

  const result = evaluateColophonPageOwners({
    contract,
    pageSource: loadPageSource(contract)
  });

  assert.ok(result.failures.includes("critique_precedes_binary_verdict"));
});

test("modeled owners see the rendered page, not repository or prior judge output", async () => {
  const { evaluateColophonPageOwners } = await loadEvaluator();
  const contract = clone(loadContract());
  contract.execution.repositoryAccess = true;
  contract.execution.priorOwnerOutputVisible = true;

  const result = evaluateColophonPageOwners({
    contract,
    pageSource: loadPageSource(contract)
  });

  assert.ok(result.failures.includes("rendered_page_only_input_boundary"));
  assert.ok(result.failures.includes("owner_reviews_are_isolated"));
});

test("the public page cannot imply participation or endorsement by modeled owners", async () => {
  const { evaluateColophonPageOwners } = await loadEvaluator();
  const contract = loadContract();
  const pageSource = `${loadPageSource(contract)} Deborah Treisman approved this page.`;

  const result = evaluateColophonPageOwners({ contract, pageSource });

  assert.ok(result.failures.includes("public_page_avoids_false_endorsement"));
});

test("the uncalibrated modeled gate remains advisory", async () => {
  const { evaluateColophonPageOwners } = await loadEvaluator();
  const contract = loadContract();
  const result = evaluateColophonPageOwners({
    contract,
    pageSource: loadPageSource(contract)
  });

  assert.equal(contract.calibration.status, "required");
  assert.equal(contract.calibration.releaseAuthority, "advisory-until-calibrated");
  assert.equal(result.humanPublicationAuthority, "Jamie Burkart");
});
