import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";

import { compileWiki, defaultRepoRoot, wikiRecordSchema } from "./lib.mjs";
import { evaluatePhotoNotebook } from "./photo-notebook-eval.mjs";

const result = compileWiki();

function cloneRecord(id) {
  return structuredClone(result.byId.get(id));
}

function sourceFor(id) {
  const item = result.byId.get(id);
  return readFileSync(path.join(defaultRepoRoot, item.path), "utf8");
}

test("photography notebook baseline passes", () => {
  const evaluation = evaluatePhotoNotebook({ result });
  assert.deepEqual(evaluation.failures, []);
  assert.deepEqual(evaluation.counts, {
    requiredRecords: 6,
    targetPopulation: 1000,
    currentPopulation: 0,
    privateVerifiedPopulation: 1000
  });
});

test("a notebook cannot activate itself on the portfolio", () => {
  const notebook = cloneRecord("notebook.photography");
  notebook.projection = { status: "active", surfaces: ["/"] };
  const evaluation = evaluatePhotoNotebook({
    result,
    recordOverrides: { [notebook.id]: notebook }
  });
  assert.equal(evaluation.checks.photography_notebook_contract_bounded, false);
  assert.equal(wikiRecordSchema.safeParse(notebook).success, false);
});

test("a notebook cannot name a public projection surface", () => {
  const notebook = cloneRecord("notebook.photography");
  notebook.projection = { status: "hold", surfaces: ["/work"] };
  assert.equal(wikiRecordSchema.safeParse(notebook).success, false);
});

test("a notebook observation cannot become canonical evidence", () => {
  const notebook = cloneRecord("notebook.photography");
  notebook.evidence = [
    {
      target: "source.jamie.writers-voice-synthesis.2026-07",
      relationship: "context",
      confidence: "limited",
      supports: ["A provisional notebook observation."]
    }
  ];
  assert.equal(wikiRecordSchema.safeParse(notebook).success, false);
});

test("a notebook cannot determine rights, consent, or public display", () => {
  for (const [field, value] of [
    ["rights_state", "cleared"],
    ["consent_state", "cleared"],
    ["public_display_status", "cleared"]
  ]) {
    const notebook = cloneRecord("notebook.photography");
    notebook[field] = value;
    assert.equal(
      wikiRecordSchema.safeParse(notebook).success,
      false,
      `accepted notebook authority field: ${field}`
    );
  }
});

test("a notebook cannot declare public registry membership", () => {
  const notebook = cloneRecord("notebook.photography");
  notebook.registry_ids = ["public.claim.example"];
  assert.equal(wikiRecordSchema.safeParse(notebook).success, false);
});

test("the field cannot claim a private verified population beyond its target", () => {
  const field = cloneRecord("notebook.photography.field.v01");
  field.private_verified_population = 1001;
  const evaluation = evaluatePhotoNotebook({
    result,
    recordOverrides: { [field.id]: field }
  });
  assert.equal(evaluation.checks.photography_notebook_contract_bounded, false);
  assert.equal(evaluation.checks.photography_private_field_completion_is_bounded, false);
  assert.equal(wikiRecordSchema.safeParse(field).success, false);
});

test("private completion cannot become a public committed photo population", () => {
  const field = cloneRecord("notebook.photography.field.v01");
  field.current_population = 1000;
  const evaluation = evaluatePhotoNotebook({
    result,
    recordOverrides: { [field.id]: field }
  });
  assert.equal(
    evaluation.checks.photography_private_field_completion_is_bounded,
    false
  );
});

test("visual interpretation cannot silently become evidence", () => {
  const id = "notebook.photography.templates";
  const mutated = sourceFor(id).replace(
    /Treat memory as attributed context and a research lead, not automatic proof\./,
    "Treat memory as proof."
  );
  const evaluation = evaluatePhotoNotebook({
    result,
    sourceOverrides: { [id]: mutated }
  });
  assert.equal(evaluation.checks.photography_epistemic_lanes_separate, false);
});

test("selection cannot imply publication clearance", () => {
  const id = "notebook.photography";
  const mutated = sourceFor(id).replace(
    /Selection is not publication\./,
    "Selection clears publication."
  );
  const evaluation = evaluatePhotoNotebook({
    result,
    sourceOverrides: { [id]: mutated }
  });
  assert.equal(
    evaluation.checks.photography_selection_publication_rights_separate,
    false
  );
});

test("the experimental field cannot collapse into deterministic scoring", () => {
  const id = "notebook.photography.vocabulary";
  const mutated = sourceFor(id).replace(
    /not a\s+deterministic scoring system/,
    "a deterministic scoring system"
  );
  const evaluation = evaluatePhotoNotebook({
    result,
    sourceOverrides: { [id]: mutated }
  });
  assert.equal(evaluation.checks.photography_experiment_remains_open, false);
});

test("private photo-library coordinates fail closed", () => {
  const id = "notebook.photography.field.v01";
  const evaluation = evaluatePhotoNotebook({
    result,
    sourceOverrides: {
      [id]: `${sourceFor(id)}\n/Volumes/private/Jamie.photoslibrary/original.jpg\n`
    }
  });
  assert.equal(evaluation.checks.photography_private_archive_boundary, false);
});

test("notebook IDs cannot enter the public registry implicitly", () => {
  const evaluation = evaluatePhotoNotebook({
    result,
    publicRegistryOverride: "notebook.photography"
  });
  assert.equal(evaluation.checks.photography_public_projection_selective, false);
});

test("the residency proposal cannot become a deliverables contract", () => {
  const id = "notebook.photography.residency-proposal.v01";
  const mutated = sourceFor(id)
    .replace(
      /The proposal\s+is an opening, not a contract\./,
      "The proposal is a binding deliverables contract."
    )
    .replace(
      /will not be judged on the basis of\s+doing what was promised here/,
      "will be judged on the basis of delivering everything promised here"
    );
  const evaluation = evaluatePhotoNotebook({
    result,
    sourceOverrides: { [id]: mutated }
  });
  assert.equal(
    evaluation.checks.photography_residency_proposal_preserves_play,
    false
  );
});

test("residency hospitality cannot publish private access details", () => {
  const id = "notebook.photography.residency-proposal.v01";
  const mutated = sourceFor(id).replace(
    /Private access instructions, household details, equipment custody, and precise\s+residential coordinates remain in resident orientation rather than this public\s+notebook\./,
    "Private access instructions and precise residential coordinates belong in this public notebook."
  );
  const evaluation = evaluatePhotoNotebook({
    result,
    sourceOverrides: { [id]: mutated }
  });
  assert.equal(
    evaluation.checks.photography_residency_hospitality_is_bounded,
    false
  );
});

test("the Teju Cole touchstone cannot become an unsourced textual claim", () => {
  const id = "notebook.photography.residency-proposal.v01";
  const mutated = sourceFor(id).replace(
    /This is recorded as Jamie's remembered\s+touchstone, not yet as a source-verified account of Cole's text\./,
    "This is a verified quotation and account of Cole's published text."
  );
  const evaluation = evaluatePhotoNotebook({
    result,
    sourceOverrides: { [id]: mutated }
  });
  assert.equal(
    evaluation.checks.photography_residency_touchstone_is_attributed_memory,
    false
  );
});

test("Proof of Life cannot become publication approval", () => {
  const id = "notebook.photography.residency-proposal.v01";
  const mutated = sourceFor(id).replace(
    /does not approve the selected photograph for\s+publication or establish what the larger residency will become/,
    "approves the selected photograph for every public use"
  );
  const evaluation = evaluatePhotoNotebook({
    result,
    sourceOverrides: { [id]: mutated }
  });
  assert.equal(evaluation.checks.photography_proof_of_life_is_bounded, false);
});
