import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";

import { compileWiki, defaultRepoRoot } from "./lib.mjs";
import { evaluateFamilyClosure } from "./family-closure-eval.mjs";

const result = compileWiki();

function cloneRecord(id) {
  return structuredClone(result.byId.get(id));
}

function sourceFor(id) {
  const item = result.byId.get(id);
  return readFileSync(path.join(defaultRepoRoot, item.path), "utf8");
}

test("branch-family closure baseline passes", () => {
  const evaluation = evaluateFamilyClosure({ result });
  assert.deepEqual(evaluation.failures, []);
  assert.deepEqual(evaluation.counts, {
    donors: 5,
    requiredRecords: 21,
    integratedRecords: 14,
    blockingCriteria: 26
  });
});

test("a substituted frozen donor head fails", () => {
  const donor = cloneRecord("source.knowledge-wiki.branch-a.2026-07-19");
  donor.canonical_url = "https://github.com/openhouse/jamieburk.art/tree/develop";
  const evaluation = evaluateFamilyClosure({
    result,
    recordOverrides: { [donor.id]: donor }
  });
  assert.equal(evaluation.checks.exact_frozen_donors_recorded, false);
});

test("an integrated page cannot lose donor provenance", () => {
  const page = cloneRecord("method.learning-through-making");
  page.relations = page.relations.filter(
    (relation) => relation.target !== "source.knowledge-wiki.branch-b.2026-07-19"
  );
  const evaluation = evaluateFamilyClosure({
    result,
    recordOverrides: { [page.id]: page }
  });
  assert.equal(evaluation.checks.donor_provenance_preserved, false);
});

test("research authority cannot become publication authority", () => {
  const run = cloneRecord("research.knowledge-wiki-family-closure.2026-07-19");
  run.source_encounter.publication_authority = "research-authorization";
  const evaluation = evaluateFamilyClosure({
    result,
    recordOverrides: { [run.id]: run }
  });
  assert.equal(evaluation.checks.source_return_candidate_specific, false);
});

test("implementation cannot collapse launch into adoption", () => {
  const id = "capability.implementation-adoption-and-handoff";
  const mutated = sourceFor(id).replace(
    /One state does not prove the next\./,
    "Every launch proves adoption."
  );
  const evaluation = evaluateFamilyClosure({
    result,
    sourceOverrides: { [id]: mutated }
  });
  assert.equal(evaluation.checks.adoption_states_stay_distinct, false);
});

test("identity infrastructure cannot imply undifferentiated authorship", () => {
  const id = "method.identity-systems-as-shared-infrastructure";
  const mutated = sourceFor(id).replace(
    /Evidence for one does not establish the others\./,
    "Establishing the account proves authorship of everything."
  );
  const evaluation = evaluateFamilyClosure({
    result,
    sourceOverrides: { [id]: mutated }
  });
  assert.equal(evaluation.checks.identity_authorship_bounded, false);
});

test("graph relations cannot become causal verdicts", () => {
  const id = "index.knowledge-wiki.relational-infrastructure-atlas";
  const mutated = sourceFor(id).replace(
    /Typed proximity is not causality, attendance, authorship, endorsement, or\s+measured impact\./,
    "Typed proximity proves causal impact."
  );
  const evaluation = evaluateFamilyClosure({
    result,
    sourceOverrides: { [id]: mutated }
  });
  assert.equal(evaluation.checks.relations_do_not_become_causality, false);
});

test("protected absence cannot be reframed as deficit", () => {
  const id = "index.knowledge-wiki.role-authorship-protected-absence";
  const mutated = sourceFor(id).replace(
    /Protected absence is not missing work, a deficit/,
    "Protected absence is missing work and a deficit"
  );
  const evaluation = evaluateFamilyClosure({
    result,
    sourceOverrides: { [id]: mutated }
  });
  assert.equal(evaluation.checks.role_credit_and_absence_bounded, false);
});

test("AI-assisted first-person language cannot activate itself", () => {
  const page = cloneRecord("method.what-is-at-stake-for-me");
  page.projection_status = "active";
  page.projection = { status: "active", surfaces: ["/about"] };
  const evaluation = evaluateFamilyClosure({
    result,
    recordOverrides: { [page.id]: page }
  });
  assert.equal(evaluation.checks.first_person_authorship_human_controlled, false);
  assert.equal(evaluation.checks.family_public_projection_still_selective, false);
});

test("a protected local path fails the family public-safety boundary", () => {
  const id = "index.knowledge-wiki.canonical-story-bank";
  const evaluation = evaluateFamilyClosure({
    result,
    sourceOverrides: { [id]: `${sourceFor(id)}\n/Volumes/private/archive\n` }
  });
  assert.equal(evaluation.checks.family_public_safety_preserved, false);
});

test("new records cannot enter the public registry implicitly", () => {
  const evaluation = evaluateFamilyClosure({
    result,
    publicRegistryOverride: "method.what-is-at-stake-for-me"
  });
  assert.equal(evaluation.checks.family_public_projection_still_selective, false);
});

test("the merge candidate must keep exact-head pull-request CI", () => {
  const evaluation = evaluateFamilyClosure({
    result,
    workflowOverride: "on:\n  pull_request:\njobs:\n  check:\n    steps: []\n"
  });
  assert.equal(evaluation.checks.merge_readiness_ci_enforced, false);
});

test("pull-request CI cannot substitute the synthetic merge ref", () => {
  const workflowPath = path.join(
    defaultRepoRoot,
    ".github/workflows/portfolio-readiness.yml"
  );
  const workflow = readFileSync(workflowPath, "utf8").replace(
    "ref: ${{ github.event.pull_request.head.sha || github.sha }}",
    "ref: ${{ github.sha }}"
  );
  const evaluation = evaluateFamilyClosure({ result, workflowOverride: workflow });
  assert.equal(evaluation.checks.merge_readiness_ci_enforced, false);
});

test("pull-request CI must verify the checked-out head SHA", () => {
  const workflowPath = path.join(
    defaultRepoRoot,
    ".github/workflows/portfolio-readiness.yml"
  );
  const workflow = readFileSync(workflowPath, "utf8").replace(
    /^\s*run: test "\$\(git rev-parse HEAD\)" = ".*"\n/m,
    ""
  );
  const evaluation = evaluateFamilyClosure({ result, workflowOverride: workflow });
  assert.equal(evaluation.checks.merge_readiness_ci_enforced, false);
});

test("manual CI dispatch keeps explicit diff hygiene", () => {
  const workflowPath = path.join(
    defaultRepoRoot,
    ".github/workflows/portfolio-readiness.yml"
  );
  const workflow = readFileSync(workflowPath, "utf8").replace(
    "run: git diff --check HEAD^...HEAD",
    "run: true"
  );
  const evaluation = evaluateFamilyClosure({ result, workflowOverride: workflow });
  assert.equal(evaluation.checks.merge_readiness_ci_enforced, false);
});

test("the RFC contract must remain in the normal repository check", () => {
  const packageManifest = JSON.parse(
    readFileSync(path.join(defaultRepoRoot, "package.json"), "utf8")
  );
  packageManifest.scripts.check = packageManifest.scripts.check.replace(
    "npm run check:rfcs && ",
    ""
  );
  const evaluation = evaluateFamilyClosure({ result, packageOverride: packageManifest });
  assert.equal(evaluation.checks.rfc_contract_enforced, false);
});

test("generated outputs must remain independent of process locale", () => {
  const evaluation = evaluateFamilyClosure({
    result,
    localeDeterminismOverride: false
  });
  assert.equal(evaluation.checks.generated_outputs_locale_independent, false);
});

test("diff hygiene is a blocking family-closure criterion", () => {
  const evaluation = evaluateFamilyClosure({ result, diffCheckOverride: false });
  assert.equal(evaluation.checks.diff_hygiene_clean, false);
});
