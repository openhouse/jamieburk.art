import assert from "node:assert/strict";
import test from "node:test";

import {
  computePhotoBindingFingerprintFromModel,
  evaluatePhotoKnowledgeModel,
  loadPhotoKnowledgeModel
} from "../photo-knowledge/lib.mjs";

let loaded;

async function baselineModel() {
  if (!loaded) loaded = await loadPhotoKnowledgeModel();
  const model = structuredClone(loaded);
  model.candidateReceipt = {
    candidateFingerprint: model.candidate.fingerprint,
    candidateFileCount: model.candidate.fileCount,
    baseCommit: "fea303e54c6b5fae36caee872a2a7450501f9e11",
    derivativeSha256: model.canary.derivative.sha256,
    privateBindingVerification: "verified",
    production: "open",
    indexing: "open",
    automatedApproval: false
  };
  return model;
}

function attachCarriedForwardReceipt(model) {
  const binding = computePhotoBindingFingerprintFromModel(model);
  model.candidateReceipt = {
    candidateFingerprint: model.candidate.fingerprint,
    candidateFileCount: model.candidate.fileCount,
    baseCommit: "fea303e54c6b5fae36caee872a2a7450501f9e11",
    derivativeSha256: model.canary.derivative.sha256,
    privateBindingVerification: "verified-carried-forward",
    carryForwardPolicyVersion: 1,
    bindingRelevantFingerprint: binding.fingerprint,
    bindingRelevantItemCount: binding.itemCount,
    carriedForwardFromCandidateFingerprint: "1".repeat(64),
    carriedForwardFromCandidateFileCount: 217,
    carriedForwardFromSourceCommit: "2".repeat(40),
    carriedForwardFromReceiptSha256: "3".repeat(64),
    carriedForwardFromPrivateBindingVerification: "verified",
    production: "open",
    indexing: "open",
    automatedApproval: false
  };
}

function appendPendingPhoto(model) {
  const pending = {
    id: "pending-test",
    wikiId: null,
    knowledgeStatus: "phase-2-reconciliation-pending",
    placementIds: [],
    releaseState: {
      publicGit: "approved",
      staging: "approved",
      production: "open",
      indexing: "open"
    }
  };
  model.publicPhotoManifest.push(pending);
  return pending;
}

test("East River canary passes every hard gate and criterion", async () => {
  const result = evaluatePhotoKnowledgeModel(await baselineModel());
  assert.equal(result.passed, true);
  assert.deepEqual(result.failedHardGates, []);
  assert.deepEqual(result.failedCriteria, []);
});

test("private source locators fail closed", async () => {
  const model = await baselineModel();
  model.sourceTexts["docs/knowledge-bank/fixture.md"] = "/Users/example/Photos Library.photoslibrary";
  const result = evaluatePhotoKnowledgeModel(model);
  assert.equal(result.checks.no_private_locator_leakage, false);
});

test("public project-site UUID filenames do not become private locator findings", async () => {
  const model = await baselineModel();
  model.sourceTexts[
    "docs/knowledge-bank/assets/photographs/project-sites/public-uuid.md"
  ] =
    "https://example.org/content/images/93383C1E-5096-48D2-9667-1B4F82221C88.jpeg";
  const result = evaluatePhotoKnowledgeModel(model);
  assert.equal(result.checks.no_private_locator_leakage, true);
});

test("project-site census files still reject private paths", async () => {
  const model = await baselineModel();
  model.sourceTexts[
    "docs/knowledge-bank/assets/photographs/project-sites/private-path.md"
  ] = "/Volumes/archive/Photos Library.photoslibrary";
  const result = evaluatePhotoKnowledgeModel(model);
  assert.equal(result.checks.no_private_locator_leakage, false);
});

test("a modified derivative checksum fails closed", async () => {
  const model = await baselineModel();
  model.derivativeSha = "0".repeat(64);
  const result = evaluatePhotoKnowledgeModel(model);
  assert.equal(result.checks.derivative_integrity_and_metadata_stripping, false);
});

test("source-bearing WebP metadata fails closed", async () => {
  const model = await baselineModel();
  model.webp.chunks.push("EXIF");
  const result = evaluatePhotoKnowledgeModel(model);
  assert.equal(result.checks.derivative_integrity_and_metadata_stripping, false);
});

test("creator and archive custody cannot collapse into one attribution", async () => {
  const model = await baselineModel();
  model.recordsById[model.canary.assetId].statements = model.recordsById[
    model.canary.assetId
  ].statements.filter((item) => item.id !== "statement.photo.east-river.custody.v1");
  const result = evaluatePhotoKnowledgeModel(model);
  assert.equal(result.checks.creator_credit_and_custody_distinct, false);
});

test("a corrected creator credit cannot retain the pre-identification boundary", async () => {
  const model = await baselineModel();
  model.portfolioPhotos.eastRiver.publicUseBoundary =
    "Authorized by Jamie for this portfolio layout; no third-party authorship or rights are asserted.";
  const result = evaluatePhotoKnowledgeModel(model);
  assert.equal(result.checks.creator_credit_and_custody_distinct, false);
  assert.equal(result.passed, false);
});

test("a production-approved permission mutation fails the open human gate", async () => {
  const model = await baselineModel();
  model.recordsById[model.canary.permissionSourceId].permission_capsule.production = "approved";
  const result = evaluatePhotoKnowledgeModel(model);
  assert.equal(result.checks.permission_scope_exact_and_fail_closed, false);
});

test("a changed crop scope fails exact permission", async () => {
  const model = await baselineModel();
  model.recordsById[model.canary.permissionSourceId].permission_capsule.derivative_scope =
    "Any future crop";
  const result = evaluatePhotoKnowledgeModel(model);
  assert.equal(result.checks.permission_scope_exact_and_fail_closed, false);
});

test("an unsupported caption assertion fails closed", async () => {
  const model = await baselineModel();
  model.recordsById[model.canary.placementId].caption.assertions.push(
    "statement.photo.east-river.recurring-journey.v1"
  );
  const result = evaluatePhotoKnowledgeModel(model);
  assert.equal(result.checks.caption_assertions_source_bound, false);
});

test("manifest and Wiki placement drift fails closed", async () => {
  const model = await baselineModel();
  model.portfolioPhotos.eastRiver.placementIds = [];
  const result = evaluatePhotoKnowledgeModel(model);
  assert.equal(result.checks.manifest_wiki_placement_alignment, false);
});

test("a missing case-study creator credit fails manifest alignment", async () => {
  const model = await baselineModel();
  model.portfolioPhotos.nycacShoestringFacilitation.credit = "";
  const result = evaluatePhotoKnowledgeModel(model);
  assert.equal(result.checks.manifest_wiki_placement_alignment, false);
  assert.equal(result.passed, false);
});

test("revocation cannot leave an active occurrence valid", async () => {
  const model = await baselineModel();
  model.recordsById[model.canary.permissionSourceId].permission_capsule.public_git = "revoked";
  const result = evaluatePhotoKnowledgeModel(model);
  assert.equal(result.checks.permission_scope_exact_and_fail_closed, false);
});

test("removing rollback instructions fails closed", async () => {
  const model = await baselineModel();
  delete model.recordsById[model.canary.placementId].rollback;
  const result = evaluatePhotoKnowledgeModel(model);
  assert.equal(result.checks.revocation_and_rollback_available, false);
});

test("protected absence cannot be auto-filled", async () => {
  const model = await baselineModel();
  model.recordsById[model.canary.protectedAbsenceDecisionId].projection.status = "active";
  const result = evaluatePhotoKnowledgeModel(model);
  assert.equal(result.checks.protected_absence_not_auto_filled, false);
});

test("a recollection cannot activate itself", async () => {
  const model = await baselineModel();
  model.recordsById[model.canary.recollectionSourceId].projection = {
    status: "active",
    surfaces: ["/about"]
  };
  const result = evaluatePhotoKnowledgeModel(model);
  assert.equal(result.checks.recollection_does_not_auto_project, false);
});

test("ranked-choice voting cannot become publication authority", async () => {
  const model = await baselineModel();
  model.curatorialConfig.authority.selectionMethod = "ranked-choice voting";
  const result = evaluatePhotoKnowledgeModel(model);
  assert.equal(result.checks.automated_selection_prohibited, false);
});

test("a panel without dissent fails artist-led curation", async () => {
  const model = await baselineModel();
  delete model.recordsById[model.canary.curatorialEvaluationId].dissent;
  const result = evaluatePhotoKnowledgeModel(model);
  assert.equal(result.checks.automated_selection_prohibited, false);
  assert.equal(result.criteria.artist_led_curation, false);
});

test("binding every public photograph defeats selective materialization", async () => {
  const model = await baselineModel();
  const pending = appendPendingPhoto(model);
  pending.knowledgeStatus = "bound";
  pending.wikiId = "asset.photo.auto-generated";
  const result = evaluatePhotoKnowledgeModel(model);
  assert.equal(result.criteria.selective_projection, false);
});

test("a pending photograph cannot receive automated production approval", async () => {
  const model = await baselineModel();
  const pending = appendPendingPhoto(model);
  pending.releaseState.production = "approved";
  const result = evaluatePhotoKnowledgeModel(model);
  assert.equal(result.checks.manifest_wiki_placement_alignment, false);
  assert.equal(result.criteria.selective_projection, false);
  assert.equal(result.passed, false);
});

test("production and indexing approval cannot be automated", async () => {
  const model = await baselineModel();
  model.recordsById[model.canary.placementId].approval.production = "approved";
  model.recordsById[model.canary.placementId].approval.indexing = "approved";
  const result = evaluatePhotoKnowledgeModel(model);
  assert.equal(result.checks.production_and_indexing_human_gated, false);
});

test("stale candidate evidence fails closed", async () => {
  const model = await baselineModel();
  model.candidateReceipt.candidateFingerprint = "f".repeat(64);
  const result = evaluatePhotoKnowledgeModel(model);
  assert.equal(result.checks.exact_candidate_receipt_current, false);
});

test("a verified binding may carry forward across unrelated candidate-scope additions", async () => {
  const model = await baselineModel();
  model.candidate.fingerprint = "4".repeat(64);
  model.candidate.fileCount += 1;
  attachCarriedForwardReceipt(model);
  const result = evaluatePhotoKnowledgeModel(model);
  assert.equal(result.checks.exact_candidate_receipt_current, true);
  assert.equal(result.diagnostics.receiptState.carriedForward, true);
});

test("changing Hero source invalidates a carried-forward binding receipt", async () => {
  const model = await baselineModel();
  attachCarriedForwardReceipt(model);
  model.sourceTexts["apps/www/src/components/Hero.tsx"] += "\n// changed placement";
  const result = evaluatePhotoKnowledgeModel(model);
  assert.equal(result.checks.exact_candidate_receipt_current, false);
  assert.equal(result.passed, false);
});

test("changing the East River manifest invalidates a carried-forward binding receipt", async () => {
  const model = await baselineModel();
  attachCarriedForwardReceipt(model);
  model.portfolioPhotos.eastRiver.caption = "A changed caption.";
  const result = evaluatePhotoKnowledgeModel(model);
  assert.equal(result.checks.exact_candidate_receipt_current, false);
  assert.equal(result.passed, false);
});

test("the RFC terminology cannot regress to RFP", async () => {
  const model = await baselineModel();
  model.sourceTexts[model.canary.rfcPath] = model.sourceTexts[model.canary.rfcPath].replace(
    "RFC 0003",
    "RFP 0003"
  );
  const result = evaluatePhotoKnowledgeModel(model);
  assert.equal(result.checks.rfc_authority_and_scope_current, false);
  assert.equal(result.passed, false);
});
