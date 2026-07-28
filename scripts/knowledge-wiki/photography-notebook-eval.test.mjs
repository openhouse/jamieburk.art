import assert from "node:assert/strict";
import { createHash } from "node:crypto";
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
  const record = result.byId.get(id);
  return readFileSync(path.join(defaultRepoRoot, record.path), "utf8");
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function manifestForSources(overrides = {}) {
  const manifest = JSON.parse(
    readFileSync(
      path.join(defaultRepoRoot, "evals/knowledge-wiki/photography-notebook.json"),
      "utf8"
    )
  );
  manifest.contentBindings.notebook = sha256(
    overrides.notebook ?? sourceFor(manifest.notebookId)
  );
  manifest.contentBindings.field = sha256(
    overrides.field ?? sourceFor(manifest.fieldId)
  );
  manifest.contentBindings.proposal = sha256(
    overrides.proposal ?? sourceFor(manifest.proposalId)
  );
  manifest.contentBindings.oralHistory = sha256(
    overrides.oralHistory ?? sourceFor(manifest.oralHistoryId)
  );
  return manifest;
}

function manifestForFieldSource(fieldSource) {
  return manifestForSources({ field: fieldSource });
}

test("photography notebook baseline passes", () => {
  const evaluation = evaluatePhotographyNotebook({ result });
  assert.deepEqual(evaluation.failures, []);
  assert.equal(evaluation.counts.blockingCriteria, 32);
  assert.equal(evaluation.counts.humanGates, 10);
  assert.equal(evaluation.counts.governedRecords, 4);
});

test("a missing field corpus page fails the notebook contract", () => {
  const evaluation = evaluatePhotographyNotebook({
    result,
    recordOverrides: { "research-inquiry.photography.field-corpus-001": null }
  });
  assert.equal(evaluation.checks.photography_notebook_materialized, false);
  assert.equal(evaluation.checks.photography_notebook_reachable, false);
});

test("a missing residency proposal fails the notebook contract", () => {
  const evaluation = evaluatePhotographyNotebook({
    result,
    recordOverrides: {
      "research-inquiry.photography.196-first-pass-proposal": null
    }
  });
  assert.equal(evaluation.checks.photography_notebook_materialized, false);
  assert.equal(evaluation.checks.photography_notebook_reachable, false);
});

test("a missing oral-history prompt fails the notebook contract", () => {
  const evaluation = evaluatePhotographyNotebook({
    result,
    recordOverrides: {
      "research-inquiry.photography.oral-history-stewardship-afterlife-001": null
    }
  });
  assert.equal(evaluation.checks.photography_notebook_materialized, false);
  assert.equal(evaluation.checks.photography_notebook_reachable, false);
});

test("an obsolete unassembled-corpus statement fails truthful state", () => {
  const id = "research-inquiry.photography.field-corpus-001";
  const fieldSource = `${sourceFor(id)}\n\nThe current private 1,000-photo field is not assembled.\n`;
  const evaluation = evaluatePhotographyNotebook({
    result,
    manifest: manifestForFieldSource(fieldSource),
    sourceOverrides: {
      [id]: fieldSource
    }
  });
  assert.equal(evaluation.checks.field_corpus_state_truthful, false);
});

test("oral history cannot automatically become a claim or publication approval", () => {
  const id =
    "research-inquiry.photography.oral-history-stewardship-afterlife-001";
  const oralHistorySource = `${sourceFor(id)}\n\nJamie's response automatically becomes a verified claim and approves publication.\n`;
  const evaluation = evaluatePhotographyNotebook({
    result,
    manifest: manifestForSources({ oralHistory: oralHistorySource }),
    sourceOverrides: { [id]: oralHistorySource }
  });
  assert.equal(
    evaluation.checks.oral_history_intake_cannot_auto_promote,
    false
  );
  assert.equal(evaluation.checks.oral_history_not_publication, false);
});

test("oral-history private locators fail closed", () => {
  const id =
    "research-inquiry.photography.oral-history-stewardship-afterlife-001";
  const oralHistorySource = `${sourceFor(id)}\n\nProtected source: /Users/example/Pictures/private-library\nImage file: private-frame.heic\n`;
  const evaluation = evaluatePhotographyNotebook({
    result,
    manifest: manifestForSources({ oralHistory: oralHistorySource }),
    sourceOverrides: { [id]: oralHistorySource }
  });
  assert.equal(evaluation.checks.public_notebook_has_no_private_payload, false);
  assert.equal(evaluation.checks.oral_history_privacy_fails_closed, false);
});

test("oral-history public notes cannot name a protected circumstance category", () => {
  const id =
    "research-inquiry.photography.oral-history-stewardship-afterlife-001";
  const oralHistorySource = `${sourceFor(id)}\n\nThe transition followed a family crisis.\n`;
  const evaluation = evaluatePhotographyNotebook({
    result,
    manifest: manifestForSources({ oralHistory: oralHistorySource }),
    sourceOverrides: { [id]: oralHistorySource }
  });
  assert.equal(evaluation.checks.oral_history_privacy_fails_closed, false);
});

test("an embedded oral-history photograph fails the public notebook boundary", () => {
  const id =
    "research-inquiry.photography.oral-history-stewardship-afterlife-001";
  const oralHistorySource = `${sourceFor(id)}\n\n![private preview](https://example.com/private.jpg)\n`;
  const evaluation = evaluatePhotographyNotebook({
    result,
    manifest: manifestForSources({ oralHistory: oralHistorySource }),
    sourceOverrides: { [id]: oralHistorySource }
  });
  assert.equal(evaluation.checks.public_notebook_has_no_private_payload, false);
  assert.equal(evaluation.checks.oral_history_privacy_fails_closed, false);
});

test("oral-history intake must preserve corroboration and collaborator review", () => {
  const id =
    "research-inquiry.photography.oral-history-stewardship-afterlife-001";
  const oralHistorySource = sourceFor(id).replace(
    "seek corroborating\nrecords and collaborator knowledge, preserve counterevidence",
    "accept the recollection without corroboration or collaborator review"
  );
  const evaluation = evaluatePhotographyNotebook({
    result,
    manifest: manifestForSources({ oralHistory: oralHistorySource }),
    sourceOverrides: { [id]: oralHistorySource }
  });
  assert.equal(
    evaluation.checks.oral_history_research_and_credit_open,
    false
  );
});

test("the one-photo canary cannot complete the larger field", () => {
  const id = "research-inquiry.photography.field-corpus-001";
  const fieldSource = `${sourceFor(id)}\n\nThe one-photo operational canary proves the 1,000-photo field is complete and publication ready.\n`;
  const evaluation = evaluatePhotographyNotebook({
    result,
    manifest: manifestForFieldSource(fieldSource),
    sourceOverrides: { [id]: fieldSource }
  });
  assert.equal(evaluation.checks.field_corpus_state_truthful, false);
  assert.equal(evaluation.checks.one_photo_canary_does_not_complete_field, false);
});

test("source-bearing preview failures must remain excluded from visual review", () => {
  const id = "research-inquiry.photography.field-corpus-001";
  const fieldSource = sourceFor(id).replace(
    "Derivatives retaining source-bearing metadata were rejected before visual review.",
    "Derivatives retaining source-bearing metadata were reviewed anyway."
  );
  const evaluation = evaluatePhotographyNotebook({
    result,
    manifest: manifestForFieldSource(fieldSource),
    sourceOverrides: { [id]: fieldSource }
  });
  assert.equal(evaluation.checks.one_photo_canary_privacy_fails_closed, false);
});

test("the timed-out broad metadata probe cannot be reported as available", () => {
  const id = "research-inquiry.photography.field-corpus-001";
  const fieldSource = sourceFor(id).replace(
    "one-record probe timed out and remains explicitly\nunverified for this run",
    "one-record probe is fully available"
  );
  const evaluation = evaluatePhotographyNotebook({
    result,
    manifest: manifestForFieldSource(fieldSource),
    sourceOverrides: { [id]: fieldSource }
  });
  assert.equal(evaluation.checks.one_photo_canary_capability_gap_explicit, false);
});

test("the canary requires an idempotent rerun and independent verification", () => {
  const id = "research-inquiry.photography.field-corpus-001";
  const fieldSource = sourceFor(id)
    .replace("an identical rerun was idempotent; ", "the rerun was skipped; ")
    .replace(
      "identical rerun was idempotent",
      "identical rerun was not performed"
    );
  const evaluation = evaluatePhotographyNotebook({
    result,
    manifest: manifestForFieldSource(fieldSource),
    sourceOverrides: { [id]: fieldSource }
  });
  assert.equal(evaluation.checks.one_photo_canary_bounded, false);
});

test("workspace albums cannot be confused with unchanged whole-library state", () => {
  const id = "research-inquiry.photography.field-corpus-001";
  const fieldSource = `${sourceFor(id)}\n\nThe helper reorganized a pre-existing album and the whole Photos library remained unchanged.\n`;
  const evaluation = evaluatePhotographyNotebook({
    result,
    manifest: manifestForFieldSource(fieldSource),
    sourceOverrides: { [id]: fieldSource }
  });
  assert.equal(evaluation.checks.photo_source_non_mutation_preserved, false);
});

test("catalog writes outside the authorized workspace fail source custody", () => {
  const id = "research-inquiry.photography.field-corpus-001";
  const fieldSource = `${sourceFor(id)}\n\nAn album write outside the authorized workspace is permitted.\n`;
  const evaluation = evaluatePhotographyNotebook({
    result,
    manifest: manifestForFieldSource(fieldSource),
    sourceOverrides: { [id]: fieldSource }
  });
  assert.equal(evaluation.checks.photo_source_non_mutation_preserved, false);
});

test("the bounded canary cannot become generic zero-HOLD phase readiness", () => {
  const id = "research-inquiry.photography.field-corpus-001";
  const fieldSource = sourceFor(id).replace(
    "it does not establish zero-HOLD readiness\nfor the generic phase chain",
    "it establishes full zero-HOLD readiness for the generic phase chain"
  );
  const evaluation = evaluatePhotographyNotebook({
    result,
    manifest: manifestForFieldSource(fieldSource),
    sourceOverrides: { [id]: fieldSource }
  });
  assert.equal(evaluation.checks.one_photo_canary_release_path_bounded, false);
});

test("selection cannot become publication", () => {
  const id = "research-inquiry.photography.field-corpus-001";
  const field = cloneRecord(id);
  field.projection = { status: "active", surfaces: ["/photos"] };
  const evaluation = evaluatePhotographyNotebook({
    result,
    recordOverrides: { [id]: field }
  });
  assert.equal(evaluation.checks.photo_publication_gates_human, false);
  assert.equal(evaluation.checks.no_public_photo_route, false);
});

test("a private source path fails the public notebook boundary", () => {
  const id = "research-inquiry.photography.field-corpus-001";
  const evaluation = evaluatePhotographyNotebook({
    result,
    sourceOverrides: {
      [id]: `${sourceFor(id)}\n\nProtected source: /Users/example/Pictures/private-library\n`
    }
  });
  assert.equal(evaluation.checks.public_notebook_has_no_private_payload, false);
});

test("human publication gates cannot be replaced by a model score", () => {
  const id = "research-inquiry.photography.field-corpus-001";
  const fieldSource = `${sourceFor(id)}\n\nMachine confidence satisfies every publication prerequisite and marks human review complete.\n`;
  const evaluation = evaluatePhotographyNotebook({
    result,
    manifest: manifestForFieldSource(fieldSource),
    sourceOverrides: {
      [id]: fieldSource
    }
  });
  assert.equal(evaluation.checks.photo_publication_gates_human, false);
});

test("experimental material cannot be forced into complete coverage", () => {
  const id = "research-inquiry.photography.field-corpus-001";
  const fieldSource = `${sourceFor(id)}\n\nAllocate the same number of photographs to each project.\n`;
  const evaluation = evaluatePhotographyNotebook({
    result,
    manifest: manifestForFieldSource(fieldSource),
    sourceOverrides: {
      [id]: fieldSource
    }
  });
  assert.equal(evaluation.checks.experimental_space_preserved, false);
});

test("a visible observation cannot promote itself into a factual claim", () => {
  const id = "research-inquiry.photography.field-corpus-001";
  const fieldSource = `${sourceFor(id)}\n\nA visible observation is sufficient evidence for a verified factual claim.\n`;
  const evaluation = evaluatePhotographyNotebook({
    result,
    manifest: manifestForFieldSource(fieldSource),
    sourceOverrides: {
      [id]: fieldSource
    }
  });
  assert.equal(evaluation.checks.photo_observations_remain_questions, false);
});

test("reconstructive image-level payloads fail the public notebook boundary", () => {
  const id = "research-inquiry.photography.field-corpus-001";
  const fieldSource = `${sourceFor(id)}\n\nArchive location: /private/tmp/photo-field\nImage file: river-launch-2007.heic\nArchive UUID: 123e4567-e89b-42d3-a456-426614174000\nCoordinates: 40°42'46\"N, 74°0'21\"W\nRecognized person: Example Person\nExtracted text: private placard lettering\nThumbnail URI: vault://thumb/1234\n![remote preview](https://example.com/private.jpg)\n`;
  const evaluation = evaluatePhotographyNotebook({
    result,
    manifest: manifestForFieldSource(fieldSource),
    sourceOverrides: {
      [id]: fieldSource
    }
  });
  assert.equal(evaluation.checks.public_notebook_has_no_private_payload, false);
});

test("an unreviewed additive note invalidates the exact notebook binding", () => {
  const id = "research-inquiry.photography.field-corpus-001";
  const evaluation = evaluatePhotographyNotebook({
    result,
    sourceOverrides: {
      [id]: `${sourceFor(id)}\n\nA new public-safe working note.\n`
    }
  });
  assert.equal(evaluation.checks.photography_notebook_content_bound, false);
  assert.equal(evaluation.passed, false);
});

test("a coordinated final-narrative claim still fails semantic review", () => {
  const id = "research-inquiry.photography.field-corpus-001";
  const fieldSource = `${sourceFor(id)}\n\nThis field is the representative complete final narrative of the archive.\n`;
  const evaluation = evaluatePhotographyNotebook({
    result,
    manifest: manifestForFieldSource(fieldSource),
    sourceOverrides: { [id]: fieldSource }
  });
  assert.equal(evaluation.checks.attention_not_publication, false);
});

test("the residency proposal cannot be converted into a delivery contract", () => {
  const id = "research-inquiry.photography.196-first-pass-proposal";
  const proposalSource = `${sourceFor(id)}\n\nThe proposal functions as a contract.\n`;
  const evaluation = evaluatePhotographyNotebook({
    result,
    manifest: manifestForSources({ proposal: proposalSource }),
    sourceOverrides: { [id]: proposalSource }
  });
  assert.equal(evaluation.checks.residency_proposal_not_contract, false);
});

test("changing course cannot be recast as residency failure", () => {
  const id = "research-inquiry.photography.196-first-pass-proposal";
  const proposalSource = `${sourceFor(id)}\n\nChanging course counts as failure.\n`;
  const evaluation = evaluatePhotographyNotebook({
    result,
    manifest: manifestForSources({ proposal: proposalSource }),
    sourceOverrides: { [id]: proposalSource }
  });
  assert.equal(evaluation.checks.artistic_divergence_protected, false);
  assert.equal(evaluation.checks.residency_proposal_not_contract, false);
});

test("the two-week container cannot become a mandatory deadline", () => {
  const id = "research-inquiry.photography.196-first-pass-proposal";
  const proposalSource = `${sourceFor(id)}\n\nTwo weeks is a mandatory deadline.\n`;
  const evaluation = evaluatePhotographyNotebook({
    result,
    manifest: manifestForSources({ proposal: proposalSource }),
    sourceOverrides: { [id]: proposalSource }
  });
  assert.equal(evaluation.checks.residency_container_not_deadline, false);
});

test("the residency cannot require a publishable output", () => {
  const id = "research-inquiry.photography.196-first-pass-proposal";
  const proposalSource = `${sourceFor(id)}\n\nThe artist must produce a publishable photo portfolio.\n`;
  const evaluation = evaluatePhotographyNotebook({
    result,
    manifest: manifestForSources({ proposal: proposalSource }),
    sourceOverrides: { [id]: proposalSource }
  });
  assert.equal(evaluation.checks.open_ended_outcome_protected, false);
});

test("the project cannot be required to remain photography", () => {
  const id = "research-inquiry.photography.196-first-pass-proposal";
  const proposalSource = `${sourceFor(id)}\n\nThe project must remain photography.\n`;
  const evaluation = evaluatePhotographyNotebook({
    result,
    manifest: manifestForSources({ proposal: proposalSource }),
    sourceOverrides: { [id]: proposalSource }
  });
  assert.equal(evaluation.checks.artistic_divergence_protected, false);
});

test("host acceptance cannot become publication clearance", () => {
  const id = "research-inquiry.photography.196-first-pass-proposal";
  const proposalSource = `${sourceFor(id)}\n\nAcceptance authorizes publication and public use.\n`;
  const evaluation = evaluatePhotographyNotebook({
    result,
    manifest: manifestForSources({ proposal: proposalSource }),
    sourceOverrides: { [id]: proposalSource }
  });
  assert.equal(
    evaluation.checks.host_acceptance_preserves_artist_agency,
    false
  );
});

test("the remembered Teju Cole source cannot be silently marked recovered", () => {
  const id = "research-inquiry.photography.196-first-pass-proposal";
  const proposalSource = `${sourceFor(id)}\n\nThe exact source has been verified and recovered.\n`;
  const evaluation = evaluatePhotographyNotebook({
    result,
    manifest: manifestForSources({ proposal: proposalSource }),
    sourceOverrides: { [id]: proposalSource }
  });
  assert.equal(
    evaluation.checks.remembered_teju_source_positioned_honestly,
    false
  );
});

test("the accepted residency requires Jamie's dated human welcome", () => {
  const id = "research-inquiry.photography.196-first-pass-proposal";
  const proposalSource = sourceFor(id).replace(
    "> Your proposal is accepted. Welcome.",
    "> Proposal accepted by an automated workflow."
  );
  const evaluation = evaluatePhotographyNotebook({
    result,
    manifest: manifestForSources({ proposal: proposalSource }),
    sourceOverrides: { [id]: proposalSource }
  });
  assert.equal(evaluation.checks.human_host_acceptance_recorded, false);
});
