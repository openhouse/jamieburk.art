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
    blockingCriteria: 22
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
