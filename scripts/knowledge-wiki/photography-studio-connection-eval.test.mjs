import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";

import { compileWiki, defaultRepoRoot } from "./lib.mjs";
import { evaluatePhotographyStudioConnection } from "./photography-studio-connection-eval.mjs";

const result = compileWiki();
const runId = "research.photography-studio-connection.2026-07-22";
const evaluationId = "evaluation.photography-studio-connection.2026-07-22";
const sourceId = "source.openhouse.photo-fieldwork.2026-07-22";

function cloneRecord(id) {
  return structuredClone(result.byId.get(id));
}

function source(id) {
  const record = result.byId.get(id);
  return readFileSync(path.join(defaultRepoRoot, record.path), "utf8");
}

test("photography studio connection baseline passes", () => {
  const evaluation = evaluatePhotographyStudioConnection({ result });
  assert.deepEqual(evaluation.failures, []);
  assert.equal(evaluation.counts.requiredRecords, 3);
  assert.equal(evaluation.counts.blockingCriteria, 19);
});

test("the public software source must remain materialized", () => {
  const evaluation = evaluatePhotographyStudioConnection({
    result,
    recordOverrides: { [sourceId]: null }
  });
  assert.equal(evaluation.checks.studio_connection_records_materialized, false);
});

test("the notebook must lead to the completed private contact", () => {
  const notebook = cloneRecord("index.knowledge-wiki.photography-notebook");
  notebook.relations = notebook.relations.filter((relation) => relation.target !== runId);
  const evaluation = evaluatePhotographyStudioConnection({
    result,
    recordOverrides: { [notebook.id]: notebook }
  });
  assert.equal(evaluation.checks.studio_connection_navigation_reachable, false);
});

test("skill sync and source freezing cannot be omitted", () => {
  const mutated = source(sourceId).replace(
    /local\s+`main` matched `origin\/main`/,
    "the local skill version was not checked"
  );
  const evaluation = evaluatePhotographyStudioConnection({
    result,
    sourceOverrides: { [sourceId]: mutated }
  });
  assert.equal(evaluation.checks.photo_skill_upstream_and_source_frozen, false);
});

test("a timed-out provider cannot become a passing capability", () => {
  const mutated = source(runId)
    .replace("timed out", "passed")
    .replace("remains **unverified**", "is fully available")
    .replace(
      "does not claim that every archive capability is available",
      "claims that all archive capabilities are available"
    );
  const evaluation = evaluatePhotographyStudioConnection({
    result,
    sourceOverrides: { [runId]: mutated }
  });
  assert.equal(evaluation.checks.photo_capability_gap_explicit, false);
});

test("the write scope cannot expand beyond the granted workspace", () => {
  const mutated = source(runId)
    .replace(
      /one private workspace as the only\s+place where this residency may create or change folders and albums/,
      "the entire library as a writable workspace"
    )
    .replace(
      /only creation of one album beneath that\s+workspace and addition of one existing asset/,
      "unbounded folder moves, deletions, and edits"
    );
  const evaluation = evaluatePhotographyStudioConnection({
    result,
    sourceOverrides: { [runId]: mutated }
  });
  assert.equal(evaluation.checks.photo_workspace_write_bounded, false);
});

test("People tags cannot become inferred public identities", () => {
  const mutated = source(runId).replace(
    /they are not\s+identity inference, public evidence, consent, or publication permission/i,
    "They prove identity, consent, public claims, and publication permission"
  );
  const evaluation = evaluatePhotographyStudioConnection({
    result,
    sourceOverrides: { [runId]: mutated }
  });
  assert.equal(evaluation.checks.people_tags_private_not_inference, false);
});

test("private previews cannot be externally uploaded", () => {
  const mutated = source(runId).replace(
    "No image or metadata was uploaded.",
    "Every image and metadata record was uploaded to an external service."
  );
  const evaluation = evaluatePhotographyStudioConnection({
    result,
    sourceOverrides: { [runId]: mutated }
  });
  assert.equal(evaluation.checks.photo_inspection_local_only, false);
});

test("an automatic HOLD cannot enter the selected membership", () => {
  const mutated = source(runId)
    .replace("Automated safety holds remained excluded.", "An automatic HOLD was selected.")
    .replace("it did not clear a hold", "it cleared a hold");
  const evaluation = evaluatePhotographyStudioConnection({
    result,
    sourceOverrides: { [runId]: mutated }
  });
  assert.equal(evaluation.checks.photo_holds_excluded, false);
});

test("catalog writes cannot bypass exact-candidate evaluation and validation", () => {
  const mutated = source(runId).replace(
    /passed full-coverage delegated evaluation and\s+structural validation before any catalog write/,
    "was written before evaluation and validation"
  );
  const evaluation = evaluatePhotographyStudioConnection({
    result,
    sourceOverrides: { [runId]: mutated }
  });
  assert.equal(evaluation.checks.photo_release_gates_passed, false);
});

test("a receipt-less launch cannot be narrated as success", () => {
  const mutated = source(runId)
    .replace(/exited before a receipt/, "was declared successful without a receipt")
    .replace(
      "confirmed that no album had been created",
      "was skipped because the optimistic log was accepted"
    );
  const evaluation = evaluatePhotographyStudioConnection({
    result,
    sourceOverrides: { [runId]: mutated }
  });
  assert.equal(evaluation.checks.receiptless_launch_fails_closed, false);
});

test("one receipt cannot replace rerun and independent verification", () => {
  const mutated = source(runId)
    .replace(
      "The exact production plan was run and rerun with distinct nonces.",
      "The production plan ran once without a second nonce."
    )
    .replace(
      /A receipt\s+comparator and an independent WAL-aware, read-only catalog verifier both\s+passed/,
      "No independent verification was performed"
    );
  const evaluation = evaluatePhotographyStudioConnection({
    result,
    sourceOverrides: { [runId]: mutated }
  });
  assert.equal(evaluation.checks.photo_membership_idempotently_verified, false);
});

test("the operation cannot be said to change the source or prior hierarchy", () => {
  const mutated = source(runId).replace(
    /source membership and prior hierarchy remained unchanged; only the\s+authorized private album membership was added/,
    "the source assets and prior hierarchy were rewritten"
  );
  const evaluation = evaluatePhotographyStudioConnection({
    result,
    sourceOverrides: { [runId]: mutated }
  });
  assert.equal(evaluation.checks.photo_source_and_prior_structure_unchanged, false);
});

test("one image cannot become a complete account of the archive", () => {
  const mutated = source(runId)
    .replace(
      /A one-image proof is not the proposed rough-draft field and cannot establish\s+the archive's range, themes, completeness, or quality/,
      "A one-image proof establishes the complete range, themes, and quality of the archive"
    )
    .replace(
      /A domestic still life is not by itself evidence of professional\s+accomplishment, project impact, hosting outcomes, or another person's\s+experience/,
      "The domestic still life proves every professional impact and resident outcome"
    );
  const evaluation = evaluatePhotographyStudioConnection({
    result,
    sourceOverrides: { [runId]: mutated }
  });
  assert.equal(evaluation.checks.one_image_not_archive_scale_evidence, false);
});

test("private archive locators fail the public boundary", () => {
  const evaluation = evaluatePhotographyStudioConnection({
    result,
    sourceOverrides: {
      [runId]: `${source(runId)}\nPrivate run: /Users/example/Pictures/Photos.sqlite\n`
    }
  });
  assert.equal(evaluation.checks.studio_connection_public_boundary_clean, false);
});

test("private fingerprints embedded in evaluator source fail the public boundary", () => {
  const evaluatorSource = readFileSync(
    path.join(defaultRepoRoot, "scripts/knowledge-wiki/photography-studio-connection-eval.mjs"),
    "utf8"
  );
  const mutated = [
    evaluatorSource,
    `const protectedCount = "${"9".repeat(6)}";`,
    `const protectedDigest = "${"a".repeat(32)}";`
  ].join("\n");
  const evaluation = evaluatePhotographyStudioConnection({
    result,
    selfEvaluatorOverride: mutated
  });
  assert.equal(evaluation.checks.studio_connection_public_boundary_clean, false);
});

test("separator-formatted protected counts in evaluator source fail the public boundary", () => {
  const evaluatorSource = readFileSync(
    path.join(defaultRepoRoot, "scripts/knowledge-wiki/photography-studio-connection-eval.mjs"),
    "utf8"
  );
  for (const separator of [",", " "]) {
    const count = `${"9".repeat(3)}${separator}${"8".repeat(3)}`;
    const evaluation = evaluatePhotographyStudioConnection({
      result,
      selfEvaluatorOverride: `${evaluatorSource}\nconst protectedCount = "${count}";\n`
    });
    assert.equal(evaluation.checks.studio_connection_public_boundary_clean, false);
  }
});

test("a segmented exact-count matcher in evaluator source fails the public boundary", () => {
  const evaluatorSource = readFileSync(
    path.join(defaultRepoRoot, "scripts/knowledge-wiki/photography-studio-connection-eval.mjs"),
    "utf8"
  );
  const matcher = `${"9".repeat(3)}[ ,]?${"8".repeat(3)}`;
  const evaluation = evaluatePhotographyStudioConnection({
    result,
    selfEvaluatorOverride: `${evaluatorSource}\nconst leakedMatcher = /${matcher}/;\n`
  });
  assert.equal(evaluation.checks.studio_connection_public_boundary_clean, false);
});

test("an unrelated six-digit public identifier does not trigger the private boundary", () => {
  const evaluatorSource = readFileSync(
    path.join(defaultRepoRoot, "scripts/knowledge-wiki/photography-studio-connection-eval.mjs"),
    "utf8"
  );
  const publicIdentifier = "7".repeat(6);
  const evaluation = evaluatePhotographyStudioConnection({
    result,
    selfEvaluatorOverride: `${evaluatorSource}\nconst publicId = "${publicIdentifier}";\n`
  });
  assert.equal(evaluation.checks.studio_connection_public_boundary_clean, true);
});

test("a protected fingerprint in branch history fails even after the current tree is clean", () => {
  const evaluatorSource = readFileSync(
    path.join(defaultRepoRoot, "scripts/knowledge-wiki/photography-studio-connection-eval.mjs"),
    "utf8"
  );
  const historicalCount = `${"9".repeat(3)},${"8".repeat(3)}`;
  const evaluation = evaluatePhotographyStudioConnection({
    result,
    historyEvaluatorSourcesOverride: [
      evaluatorSource,
      `${evaluatorSource}\nconst protectedCount = "${historicalCount}";\n`
    ]
  });
  assert.equal(
    evaluation.checks.studio_connection_branch_history_boundary_clean,
    false
  );
});

test("a tracked Knowledge Bank photo asset fails the public boundary", () => {
  const evaluation = evaluatePhotographyStudioConnection({
    result,
    trackedFilesOverride: [
      "docs/knowledge-bank/research-runs/photography-studio-connection-2026-07-22.md",
      "docs/knowledge-bank/private-preview.jpg"
    ]
  });
  assert.equal(evaluation.checks.studio_connection_public_boundary_clean, false);
});

test("private selection cannot become publication clearance", () => {
  const mutated = source(runId)
    .replace("remains `publication-review-required`", "is approved for every public surface")
    .replace(
      "No person, rights holder, author, caption, crop, claim, or destination has been cleared.",
      "Every right, person, caption, crop, claim, and destination is cleared."
    );
  const evaluation = evaluatePhotographyStudioConnection({
    result,
    sourceOverrides: { [runId]: mutated }
  });
  assert.equal(evaluation.checks.studio_connection_selection_not_publication, false);
});

test("the studio entry cannot activate its own portfolio projection", () => {
  const run = cloneRecord(runId);
  run.projection_status = "active";
  run.projection = { status: "active", surfaces: ["/work"] };
  const evaluation = evaluatePhotographyStudioConnection({
    result,
    recordOverrides: { [run.id]: run }
  });
  assert.equal(evaluation.checks.studio_connection_projection_held, false);
});

test("the evaluator cannot grade or promote the photograph", () => {
  const mutated = source(evaluationId)
    .replace(
      /cannot grade the photograph, decide its meaning, clear rights or consent, or\s+promote it to the portfolio/,
      "must grade the photograph, decide its meaning, clear consent, and promote it"
    )
    .replace(
      /does not mean the photograph is good,\s+important, public-safe, rights-cleared, or ready for any portfolio surface/,
      "means the photograph is good, rights-cleared, and ready for every surface"
    );
  const evaluation = evaluatePhotographyStudioConnection({
    result,
    sourceOverrides: { [evaluationId]: mutated }
  });
  assert.equal(evaluation.checks.studio_connection_eval_non_authoritative, false);
});

test("the studio evaluator must remain wired into the main Wiki suite", () => {
  const mainEvaluator = readFileSync(
    path.join(defaultRepoRoot, "scripts/knowledge-wiki/evaluate-wiki.mjs"),
    "utf8"
  );
  const evaluation = evaluatePhotographyStudioConnection({
    result,
    mainEvaluatorOverride: mainEvaluator.replace(
      'import { evaluatePhotographyStudioConnection } from "./photography-studio-connection-eval.mjs";',
      ""
    )
  });
  assert.equal(evaluation.checks.studio_connection_eval_wired, false);
});
