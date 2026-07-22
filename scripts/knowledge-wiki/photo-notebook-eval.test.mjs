import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";

import { compileWiki, defaultRepoRoot } from "./lib.mjs";
import { evaluatePhotoNotebook } from "./photo-notebook-eval.mjs";

const result = compileWiki();

function cloneRecord(id) {
  return structuredClone(result.byId.get(id));
}

function sourceFor(id) {
  const record = result.byId.get(id);
  return readFileSync(path.join(defaultRepoRoot, record.path), "utf8");
}

test("photography working notebook passes every bounded criterion", () => {
  const evaluation = evaluatePhotoNotebook({ result });
  assert.deepEqual(evaluation.failures, []);
  assert.deepEqual(evaluation.counts, {
    records: 6,
    openQuestions: 26,
    notebookFiles: 6
  });
});

test("a missing notebook surface fails materialization and navigation", () => {
  const evaluation = evaluatePhotoNotebook({
    result,
    recordOverrides: { "method.photo-notebook.field-note": null }
  });
  assert.equal(evaluation.checks.photo_notebook_records_materialized, false);
  assert.equal(evaluation.checks.photo_notebook_navigation_reachable, false);
});

test("a draft sketch cannot activate itself on a public surface", () => {
  const sketch = cloneRecord("index.photo-notebook.sketch.release-water-salt");
  sketch.projection = { status: "active", surfaces: ["/work/waterways"] };
  const evaluation = evaluatePhotoNotebook({
    result,
    recordOverrides: { [sketch.id]: sketch }
  });
  assert.equal(evaluation.checks.photo_working_states_remain_provisional, false);
  assert.equal(evaluation.checks.photo_human_publication_gates_remain_open, false);
  assert.equal(evaluation.checks.photo_sequence_sketch_remains_interpretive, false);
});

test("a private source path fails the notebook public-safety boundary", () => {
  const id = "index.knowledge-wiki.photo-notebook";
  const evaluation = evaluatePhotoNotebook({
    result,
    sourceOverrides: { [id]: `${sourceFor(id)}\n/Volumes/private/photo-library\n` }
  });
  assert.equal(evaluation.checks.photo_notebook_public_safety_preserved, false);
});

test("image files cannot enter the public notebook directory", () => {
  const evaluation = evaluatePhotoNotebook({
    result,
    notebookFilesOverride: [
      "docs/knowledge-bank/notebooks/photography/README.md",
      "docs/knowledge-bank/notebooks/photography/contact-sheet.jpg"
    ]
  });
  assert.equal(evaluation.checks.photo_notebook_public_safety_preserved, false);
});

test("the rough cohort cannot become a representative archive claim", () => {
  const id = "index.knowledge-wiki.photo-notebook";
  const mutated = sourceFor(id).replace(
    "not an audited sample",
    "a statistically representative sample"
  );
  const evaluation = evaluatePhotoNotebook({
    result,
    sourceOverrides: { [id]: mutated }
  });
  assert.equal(evaluation.checks.photo_rough_cohort_not_population_claim, false);
});

test("the notebook must preserve mystery and emergent structure", () => {
  const id = "index.knowledge-wiki.photo-notebook";
  const mutated = sourceFor(id)
    .replace("No fixed taxonomy governs the first reading.", "Use the fixed taxonomy below.")
    .replace("`mystery` or `not understood yet`", "fully classified");
  const evaluation = evaluatePhotoNotebook({
    result,
    sourceOverrides: { [id]: mutated }
  });
  assert.equal(evaluation.checks.photo_creative_latitude_preserved, false);
});

test("visible observation cannot collapse into factual interpretation", () => {
  const id = "method.photo-notebook.field-note";
  const mutated = sourceFor(id)
    .replace("### Felt response and interpretation", "### Facts established by the image")
    .replace("a reading, not a fact carried by the pixels", "a fact carried by the pixels");
  const evaluation = evaluatePhotoNotebook({
    result,
    sourceOverrides: { [id]: mutated }
  });
  assert.equal(evaluation.checks.photo_observation_interpretation_separated, false);
});

test("represented people cannot become scenery", () => {
  const id = "index.knowledge-wiki.photo-notebook";
  const mutated = sourceFor(id).replace(
    /People are agents, not scenery around\s+Jamie's work\./,
    "People are scenery around Jamie's work."
  );
  const evaluation = evaluatePhotoNotebook({
    result,
    sourceOverrides: { [id]: mutated }
  });
  assert.equal(evaluation.checks.photo_represented_people_remain_agents, false);
});

test("notebook records cannot silently enter the public registry", () => {
  const evaluation = evaluatePhotoNotebook({
    result,
    publicRegistryOverride: "index.knowledge-wiki.photo-notebook"
  });
  assert.equal(evaluation.checks.photo_notebook_public_safety_preserved, false);
});

test("the sequence sketch cannot harden into verified history", () => {
  const id = "index.photo-notebook.sketch.release-water-salt";
  const mutated = sourceFor(id)
    .replace("a working interpretation supplied by Jamie", "a verified historical account")
    .replace(
      "Photography may test, complicate, or replace this structure.",
      "Photography must confirm this structure."
    );
  const evaluation = evaluatePhotoNotebook({
    result,
    sourceOverrides: { [id]: mutated }
  });
  assert.equal(evaluation.checks.photo_sequence_sketch_remains_interpretive, false);
});

test("Jamie and represented-person review cannot be automated away", () => {
  const id = "method.photo-notebook.field-note";
  const mutated = sourceFor(id)
    .replace("Jamie approval is required", "Automated approval is sufficient")
    .replace("represented-person", "automated subject");
  const evaluation = evaluatePhotoNotebook({
    result,
    sourceOverrides: { [id]: mutated }
  });
  assert.equal(evaluation.checks.photo_human_publication_gates_remain_open, false);
});

test("the accepted proposal must remain reachable from the notebook and residency", () => {
  const notebook = cloneRecord("index.knowledge-wiki.photo-notebook");
  notebook.relations = notebook.relations.filter(
    (relation) => relation.target !== "index.photo-notebook.proposal.first-pass-196"
  );
  const evaluation = evaluatePhotoNotebook({
    result,
    recordOverrides: { [notebook.id]: notebook }
  });
  assert.equal(evaluation.checks.photo_notebook_navigation_reachable, false);
});

test("the proposal cannot be hardened into a contract", () => {
  const id = "index.photo-notebook.proposal.first-pass-196";
  const mutated = sourceFor(id)
    .replace("This proposal is not a contract.", "This proposal is a binding contract.")
    .replace(
      "I will not be judged against the work forecast here.",
      "I will be judged against the work forecast here."
    )
    .replace(
      "Departure is evidence of attention, not failure.",
      "Departure is failure."
    );
  const evaluation = evaluatePhotoNotebook({
    result,
    sourceOverrides: { [id]: mutated }
  });
  assert.equal(evaluation.checks.photo_proposal_departure_protected, false);
});

test("the proposal cannot impose required production outputs", () => {
  const id = "index.photo-notebook.proposal.first-pass-196";
  const mutated = sourceFor(id)
    .replace("invitations, not required deliverables", "required deliverables")
    .replace("no public artifact at all", "a minimum 100-image public artifact");
  const evaluation = evaluatePhotoNotebook({
    result,
    sourceOverrides: { [id]: mutated }
  });
  assert.equal(evaluation.checks.photo_proposal_outputs_not_required, false);
});

test("acceptance must honor the artist's need without binding the forecast", () => {
  const id = "index.photo-notebook.proposal.first-pass-196";
  const mutated = sourceFor(id)
    .replace(
      "196 Artists Residency receives and accepts this proposal.",
      "196 Artists Residency conditionally approves this deliverable plan."
    )
    .replace(
      "It does not bind the work to its forecast.",
      "It binds the work to its forecast."
    );
  const evaluation = evaluatePhotoNotebook({
    result,
    sourceOverrides: { [id]: mutated }
  });
  assert.equal(evaluation.checks.photo_proposal_accepted_as_permission, false);
});

test("the remembered Teju Cole lesson cannot masquerade as a recovered quotation", () => {
  const id = "index.photo-notebook.proposal.first-pass-196";
  const mutated = sourceFor(id)
    .replace("Jamie remembers an essay", "The definitive essay proves")
    .replace(
      "The exact essay, book, and wording Jamie remembers have not yet been recovered.",
      "The exact quotation is verified."
    )
    .replace(
      "an artistic permission, not as a verified quotation",
      "a verified quotation and biographical fact"
    );
  const evaluation = evaluatePhotoNotebook({
    result,
    sourceOverrides: { [id]: mutated }
  });
  assert.equal(
    evaluation.checks.photo_proposal_reference_source_position_honest,
    false
  );
});

test("the public proposal cannot expose the residency's exact address", () => {
  const id = "index.photo-notebook.proposal.first-pass-196";
  const mutated = sourceFor(id).replace(
    "Its exact address remains private.",
    "Its exact street address is published below."
  );
  const evaluation = evaluatePhotoNotebook({
    result,
    sourceOverrides: { [id]: mutated }
  });
  assert.equal(evaluation.checks.photo_proposal_site_duration_bounded, false);
});

test("the draft proposal cannot activate itself on the portfolio", () => {
  const proposal = cloneRecord("index.photo-notebook.proposal.first-pass-196");
  proposal.projection = { status: "active", surfaces: ["/work/photography"] };
  const evaluation = evaluatePhotoNotebook({
    result,
    recordOverrides: { [proposal.id]: proposal }
  });
  assert.equal(evaluation.checks.photo_working_states_remain_provisional, false);
  assert.equal(evaluation.checks.photo_proposal_care_boundaries_explicit, false);
});

test("AI assistance cannot be presented as Jamie's already approved final prose", () => {
  const id = "index.photo-notebook.proposal.first-pass-196";
  const mutated = sourceFor(id)
    .replace("an AI-assisted draft", "Jamie's final unassisted statement")
    .replace(
      "Jamie explicitly accepted the proposal and remains its author and final editor.",
      "No human review is needed."
    );
  const evaluation = evaluatePhotoNotebook({
    result,
    sourceOverrides: { [id]: mutated }
  });
  assert.equal(evaluation.checks.photo_proposal_authorship_position_honest, false);
});

test("proposal acceptance must remain a dated human decision", () => {
  const proposal = cloneRecord("index.photo-notebook.proposal.first-pass-196");
  proposal.proposal_state = "pending";
  proposal.accepted_by = "AI evaluator";
  proposal.acceptance_authority = "automated";
  const evaluation = evaluatePhotoNotebook({
    result,
    recordOverrides: { [proposal.id]: proposal }
  });
  assert.equal(evaluation.checks.photo_proposal_human_acceptance_recorded, false);
});

test("the local canary must remain membership-only and independently verified", () => {
  const id = "evaluation.photo-notebook.local-photos-canary.2026-07-22";
  const mutated = sourceFor(id)
    .replace("added one existing photograph by membership only", "rewrote one photograph")
    .replace("independent read-only verifier", "helper self-report");
  const evaluation = evaluatePhotoNotebook({
    result,
    sourceOverrides: { [id]: mutated }
  });
  assert.equal(evaluation.checks.photo_canary_selection_and_write_bounded, false);
  assert.equal(
    evaluation.checks.photo_canary_receipts_and_verification_complete,
    false
  );
});

test("the local canary cannot expose private identifiers or paths", () => {
  const id = "evaluation.photo-notebook.local-photos-canary.2026-07-22";
  const evaluation = evaluatePhotoNotebook({
    result,
    sourceOverrides: {
      [id]: `${sourceFor(id)}\n/Volumes/private/photo-library/11111111-2222-3333-4444-555555555555/L0/040\n`
    }
  });
  assert.equal(evaluation.checks.photo_canary_private_material_absent, false);
  assert.equal(evaluation.checks.photo_notebook_public_safety_preserved, false);
});

test("the local canary cannot erase a failed receipt or source-state gap", () => {
  const id = "evaluation.photo-notebook.local-photos-canary.2026-07-22";
  const mutated = sourceFor(id)
    .replace(/differed by five source\s+items/, "were always identical")
    .replace(/It was not counted as\s+a pass\./, "It was counted as a pass.");
  const evaluation = evaluatePhotoNotebook({
    result,
    sourceOverrides: { [id]: mutated }
  });
  assert.equal(evaluation.checks.photo_canary_friction_and_repair_preserved, false);
});

test("the local canary cannot become publication clearance", () => {
  const id = "evaluation.photo-notebook.local-photos-canary.2026-07-22";
  const mutated = sourceFor(id).replace(
    /does not select or clear a photograph for the portfolio or\s+publication/,
    "selects and clears a photograph for portfolio publication"
  );
  const evaluation = evaluatePhotoNotebook({
    result,
    sourceOverrides: { [id]: mutated }
  });
  assert.equal(evaluation.checks.photo_canary_publication_gate_remains_human, false);
});

test("the local canary cannot claim changes beyond the authorized workspace", () => {
  const id = "evaluation.photo-notebook.local-photos-canary.2026-07-22";
  const mutated = sourceFor(id).replace(
    /or anything outside the owner-authorized private\s+workspace/,
    "and reorganized albums outside the workspace"
  );
  const evaluation = evaluatePhotoNotebook({
    result,
    sourceOverrides: { [id]: mutated }
  });
  assert.equal(evaluation.checks.photo_canary_no_upload_or_collateral_mutation, false);
});
