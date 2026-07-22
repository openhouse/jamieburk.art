import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";

import { compileWiki, defaultRepoRoot } from "./lib.mjs";
import { evaluatePhotographyNotebook } from "./photography-notebook-eval.mjs";

const result = compileWiki();

function cloneRecord(id) {
  return structuredClone(result.byId.get(id));
}

function sourceFor(id) {
  const item = result.byId.get(id);
  return readFileSync(path.join(defaultRepoRoot, item.path), "utf8");
}

test("photography working notebook baseline passes", () => {
  const evaluation = evaluatePhotographyNotebook({ result });
  assert.deepEqual(evaluation.failures, []);
  assert.deepEqual(evaluation.counts, {
    records: 10,
    entryHeadings: 11,
    blockingCriteria: 30
  });
});

test("a missing notebook record fails materialization", () => {
  const evaluation = evaluatePhotographyNotebook({
    result,
    recordOverrides: { "research-inquiry.photography.field-set-001": null }
  });
  assert.equal(evaluation.checks.photography_notebook_records_materialized, false);
});

test("the notebook must remain reachable from the Wiki root", () => {
  const root = cloneRecord("index.knowledge-wiki");
  root.relations = root.relations.filter(
    (relation) => relation.target !== "index.knowledge-wiki.photography-notebook"
  );
  const evaluation = evaluatePhotographyNotebook({
    result,
    recordOverrides: { [root.id]: root }
  });
  assert.equal(evaluation.checks.photography_notebook_reachable, false);
});

test("the rough field cannot activate itself as a public projection", () => {
  const field = cloneRecord("research-inquiry.photography.field-set-001");
  field.projection = { status: "active", surfaces: ["/work"] };
  const evaluation = evaluatePhotographyNotebook({
    result,
    recordOverrides: { [field.id]: field }
  });
  assert.equal(evaluation.checks.field_set_completed_private_rough_field, false);
  assert.equal(evaluation.checks.photography_projection_remains_hold, false);
});

test("the completed field must retain its exact private rough-field status", () => {
  const id = "research.photography.field-set-001-completion.2026-07-22";
  const mutated = sourceFor(id).replace(
    /exact private master of\s+1,000 unique still photographs/i,
    "approximate public collection"
  );
  const evaluation = evaluatePhotographyNotebook({
    result,
    sourceOverrides: { [id]: mutated }
  });
  assert.equal(
    evaluation.checks.field_set_completion_preserves_publication_boundary,
    false
  );
});

test("completion cannot confer publication permission", () => {
  const id = "research.photography.field-set-001-completion.2026-07-22";
  const mutated = sourceFor(id).replace(
    "Selection does not confer publication permission",
    "Selection grants publication permission"
  );
  const evaluation = evaluatePhotographyNotebook({
    result,
    sourceOverrides: { [id]: mutated }
  });
  assert.equal(
    evaluation.checks.field_set_completion_preserves_publication_boundary,
    false
  );
});

test("matching counts cannot replace exact private membership", () => {
  const id = "research-inquiry.photography.field-set-001";
  const mutated = sourceFor(id).replace(
    /exact private membership\s+rather than relying on a matching count/,
    "a matching count is sufficient"
  );
  const evaluation = evaluatePhotographyNotebook({
    result,
    sourceOverrides: { [id]: mutated }
  });
  assert.equal(evaluation.checks.field_set_exact_identity_and_nonmutation, false);
});

test("visible observation cannot collapse into interpretation", () => {
  const id = "method.photography.notebook-entry";
  const mutated = sourceFor(id).replace(
    "## Interpretations and hypotheses",
    "## Confirmed meaning"
  );
  const evaluation = evaluatePhotographyNotebook({
    result,
    sourceOverrides: { [id]: mutated }
  });
  assert.equal(evaluation.checks.observation_interpretation_claim_separated, false);
  assert.equal(evaluation.checks.notebook_entry_contract_complete, false);
});

test("a private source path fails the notebook boundary", () => {
  const id = "index.knowledge-wiki.photography-notebook";
  const evaluation = evaluatePhotographyNotebook({
    result,
    sourceOverrides: { [id]: `${sourceFor(id)}\n/Volumes/private/photo-library\n` }
  });
  assert.equal(evaluation.checks.photography_notebook_public_private_boundary, false);
});

test("an embedded private preview fails the notebook boundary", () => {
  const id = "research-inquiry.photography.field-set-001";
  const evaluation = evaluatePhotographyNotebook({
    result,
    sourceOverrides: { [id]: `${sourceFor(id)}\n![Private preview](preview-image)\n` }
  });
  assert.equal(evaluation.checks.photography_notebook_public_private_boundary, false);
});

test("agent authority cannot replace human holds", () => {
  const id = "index.knowledge-wiki.photography-notebook";
  const mutated = sourceFor(id).replace(
    /they may not clear\s+safety, provenance, rights, consent, attribution, or publication holds/,
    "they may clear all remaining holds"
  );
  const evaluation = evaluatePhotographyNotebook({
    result,
    sourceOverrides: { [id]: mutated }
  });
  assert.equal(evaluation.checks.human_holds_cannot_be_agent_cleared, false);
});

test("the creative grammar keeps the complete three-part movement", () => {
  const id = "method.photography.invitation-container-emergence";
  const mutated = sourceFor(id).replace(
    "## Until it tastes of salt: emergence",
    "## Finished outcome"
  );
  const evaluation = evaluatePhotographyNotebook({
    result,
    sourceOverrides: { [id]: mutated }
  });
  assert.equal(evaluation.checks.creative_sequence_grammar_preserved, false);
});

test("the residency proposal remains an accepted but reviewable entryway", () => {
  const id = "project.photography.field-set-001-residency";
  const proposal = cloneRecord(id);
  proposal.human_review = "completed";
  const evaluation = evaluatePhotographyNotebook({
    result,
    recordOverrides: { [id]: proposal }
  });
  assert.equal(evaluation.checks.residency_proposal_is_governed_entryway, false);
});

test("residency acceptance cannot approve photographs or public use", () => {
  const id = "decision.photography.field-set-001-residency-acceptance";
  const mutated = sourceFor(id).replace(
    /does not approve any photograph, identity,\s+caption, claim, sequence, crop, rights determination, consent determination, or\s+public use/,
    "approves all photographs and public uses"
  );
  const evaluation = evaluatePhotographyNotebook({
    result,
    sourceOverrides: { [id]: mutated }
  });
  assert.equal(
    evaluation.checks.residency_acceptance_is_documented_without_overreach,
    false
  );
});

test("the proposal cannot be converted into a production contract", () => {
  const id = "project.photography.field-set-001-residency";
  const mutated = sourceFor(id).replace(
    /instrument of attention, not a contract/gi,
    "binding production agreement"
  );
  const evaluation = evaluatePhotographyNotebook({
    result,
    sourceOverrides: { [id]: mutated }
  });
  assert.equal(evaluation.checks.residency_proposal_is_not_contract, false);
});

test("changing course remains evidence of attention rather than failure", () => {
  const id = "project.photography.field-set-001-residency";
  const mutated = sourceFor(id).replace(
    "Changing course is evidence that attention is operating, not a failure",
    "Changing course is a failure to execute"
  );
  const evaluation = evaluatePhotographyNotebook({
    result,
    sourceOverrides: { [id]: mutated }
  });
  assert.equal(evaluation.checks.residency_permission_to_depart_preserved, false);
});

test("success cannot require a finished or public result", () => {
  const id = "project.photography.field-set-001-residency";
  const mutated = sourceFor(id).replace(
    /Success does not require a finished artifact, a fixed number of selects, or a\s+public result/,
    "Success requires a finished public exhibition"
  );
  const evaluation = evaluatePhotographyNotebook({
    result,
    sourceOverrides: { [id]: mutated }
  });
  assert.equal(evaluation.checks.residency_success_not_output_or_publication, false);
});

test("artistic freedom cannot erase privacy and consent boundaries", () => {
  const id = "project.photography.field-set-001-residency";
  const mutated = sourceFor(id).replace(
    /Play\s+does not override privacy, provenance, attribution, rights, consent, factual\s+review, or Jamie's approval/,
    "Play overrides all publication boundaries"
  );
  const evaluation = evaluatePhotographyNotebook({
    result,
    sourceOverrides: { [id]: mutated }
  });
  assert.equal(evaluation.checks.residency_freedom_remains_ethically_bounded, false);
});

test("the Teju Cole precedent cannot be sharpened beyond the sources", () => {
  const id = "source.teju-cole.far-away-from-here.2015";
  const mutated = sourceFor(id).replace(
    /he did some Lagos\s+and other writing/,
    "he abandoned all writing"
  );
  const evaluation = evaluatePhotographyNotebook({
    result,
    sourceOverrides: { [id]: mutated }
  });
  assert.equal(evaluation.checks.teju_cole_reference_is_source_honest, false);
});

test("notebook IDs cannot enter the public registry implicitly", () => {
  const evaluation = evaluatePhotographyNotebook({
    result,
    publicRegistryOverride: "index.knowledge-wiki.photography-notebook"
  });
  assert.equal(evaluation.checks.photography_projection_remains_hold, false);
});

test("Proof of Life cannot stand in for the unassembled Field Set 001", () => {
  const id = "research.photography.proof-of-life.2026-07-22";
  const mutated = sourceFor(id).replace(
    /small systems proof and a first notebook encounter/i,
    "complete Field Set 001"
  );
  const evaluation = evaluatePhotographyNotebook({
    result,
    sourceOverrides: { [id]: mutated }
  });
  assert.equal(evaluation.checks.proof_of_life_is_bounded_first_encounter, false);
});

test("Proof of Life cannot drift outside the authorized workspace", () => {
  const id = "research.photography.proof-of-life.2026-07-22";
  const mutated = sourceFor(id).replace(
    /No album or folder outside `Workspace-A` was changed/i,
    "Other albums were also reorganized"
  );
  const evaluation = evaluatePhotographyNotebook({
    result,
    sourceOverrides: { [id]: mutated }
  });
  assert.equal(evaluation.checks.proof_of_life_workspace_scope_is_exact, false);
});

test("public prose cannot expose a raw Photos identifier", () => {
  const id = "research.photography.proof-of-life.2026-07-22";
  const mutated = `${sourceFor(id)}\n00000000-0000-0000-0000-000000000000/L0/001\n`;
  const evaluation = evaluatePhotographyNotebook({
    result,
    sourceOverrides: { [id]: mutated }
  });
  assert.equal(
    evaluation.checks.proof_of_life_receipts_are_private_and_bound,
    false
  );
});

test("a People association cannot become publication permission", () => {
  const id = "research.photography.proof-of-life.2026-07-22";
  const mutated = sourceFor(id).replace(
    /Neither the association nor album membership\s+grants rights, consent, attribution, caption approval, or publication permission/i,
    "The association grants publication permission"
  );
  const evaluation = evaluatePhotographyNotebook({
    result,
    sourceOverrides: { [id]: mutated }
  });
  assert.equal(
    evaluation.checks.people_retrieval_and_publication_remain_separate,
    false
  );
});

test("the repaired helper cannot erase the earlier authorization failure", () => {
  const id = "research.photography.proof-of-life.2026-07-22";
  const mutated = sourceFor(id).replace(
    /The earlier version-2 helper failure remains part of the history\./i,
    "The helper always worked and no repair was needed."
  );
  const evaluation = evaluatePhotographyNotebook({
    result,
    sourceOverrides: { [id]: mutated }
  });
  assert.equal(evaluation.checks.photo_fieldwork_tooling_status_is_truthful, false);
});

test("the live helper canary cannot be removed from the return", () => {
  const id = "research.photography.proof-of-life.2026-07-22";
  const mutated = sourceFor(id).replace(
    /zero-image, no-write live authorization canary against the frozen source/i,
    "an unbounded helper launch"
  );
  const evaluation = evaluatePhotographyNotebook({
    result,
    sourceOverrides: { [id]: mutated }
  });
  assert.equal(evaluation.checks.helper_return_inspection_is_bounded, false);
});

test("the second image cannot displace the first album member", () => {
  const id = "research.photography.proof-of-life.2026-07-22";
  const mutated = sourceFor(id).replace(
    /preserved the first album member/i,
    "replaced the first album member"
  );
  const evaluation = evaluatePhotographyNotebook({
    result,
    sourceOverrides: { [id]: mutated }
  });
  assert.equal(evaluation.checks.proof_of_life_exact_two_preserves_first, false);
});

test("a scripting readback cannot be promoted to catalog-level verification", () => {
  const id = "research.photography.proof-of-life.2026-07-22";
  const mutated = sourceFor(id).replace(
    /are not described\s+as equivalent to independent\s+catalog-level verification/i,
    "are fully equivalent to independent catalog-level verification"
  );
  const evaluation = evaluatePhotographyNotebook({
    result,
    sourceOverrides: { [id]: mutated }
  });
  assert.equal(evaluation.checks.helper_verification_tiers_remain_truthful, false);
});

test("helper success cannot clear either photograph for publication", () => {
  const id = "research.photography.proof-of-life.2026-07-22";
  const proof = cloneRecord(id);
  proof.projection = { status: "active", surfaces: ["/work"] };
  const evaluation = evaluatePhotographyNotebook({
    result,
    recordOverrides: { [id]: proof }
  });
  assert.equal(evaluation.checks.helper_success_does_not_clear_publication, false);
  assert.equal(evaluation.checks.photography_projection_remains_hold, false);
});

test("the private photo archive cannot be converted into a public collection", () => {
  const id = "source.vault.apple-photos.metadata";
  const mutated = sourceFor(id).replace(
    /not a public\s+collection/i,
    "a public collection"
  );
  const evaluation = evaluatePhotographyNotebook({
    result,
    sourceOverrides: { [id]: mutated }
  });
  assert.equal(evaluation.checks.photo_archive_source_boundary_is_governed, false);
});
