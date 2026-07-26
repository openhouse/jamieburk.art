import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";

import { publicPhotoManifest } from "../../apps/www/src/data/photography.ts";
import { compileWiki } from "../knowledge-wiki/lib.mjs";
import {
  applyPhotoRevocation,
  defaultRepoRoot,
  evaluatePhotoKnowledge,
  loadPhotoKnowledge
} from "./lib.mjs";

function manifest() {
  return structuredClone(loadPhotoKnowledge());
}

test("RFC 0003 photographic knowledge baseline passes", () => {
  const result = evaluatePhotoKnowledge();
  assert.equal(result.passed, true, result.failures.join(", "));
  assert.equal(result.counts.photos, 6);
  assert.equal(result.counts.blockingCriteria, 17);
});

test("a derivative checksum drift fails closed", () => {
  const changed = manifest();
  changed.photos[0].sha256 = "0".repeat(64);
  const result = evaluatePhotoKnowledge({ manifest: changed });
  assert.equal(result.checks.photo_derivative_integrity, false);
});

test("an unregistered seventh photo cannot enter the edition", () => {
  const changed = manifest();
  changed.photos.push({
    ...structuredClone(changed.photos[0]),
    id: "photo.unreviewed",
    derivativeId: "derivative.unreviewed",
    src: "/images/field-notes/unreviewed.webp"
  });
  const result = evaluatePhotoKnowledge({ manifest: changed });
  assert.equal(result.checks.photo_manifest_exact_and_bound, false);
});

test("creator credit cannot regress to archive custody", () => {
  const sitePhotos = structuredClone(publicPhotoManifest);
  sitePhotos[0].credit = "Jamie Burkart archive.";
  const result = evaluatePhotoKnowledge({ publicPhotoManifest: sitePhotos });
  assert.equal(
    result.checks.photo_creator_correction_and_history_preserved,
    false
  );
});

test("the deprecated attribution state remains legible", () => {
  const wiki = compileWiki();
  const east = structuredClone(
    wiki.byId.get("photo.east-river-manhattan-bridge.2022")
  );
  east.creator_statements = east.creator_statements.filter(
    (statement) => statement.rank !== "deprecated"
  );
  wiki.byId.set(east.id, east);
  const result = evaluatePhotoKnowledge({ wiki });
  assert.equal(
    result.checks.photo_creator_correction_and_history_preserved,
    false
  );
});

test("permission cannot expand into an unrestricted license", () => {
  const wiki = compileWiki();
  const east = structuredClone(
    wiki.byId.get("photo.east-river-manhattan-bridge.2022")
  );
  east.permission_scope = "Unrestricted future use.";
  wiki.byId.set(east.id, east);
  const result = evaluatePhotoKnowledge({ wiki });
  assert.equal(result.checks.photo_permission_bounded_and_private, false);
});

test("production and indexing cannot be silently approved", () => {
  const changed = manifest();
  changed.edition.production = "approved";
  changed.edition.indexing = "approved";
  changed.photos[0].productionApproval = "approved";
  const result = evaluatePhotoKnowledge({ manifest: changed });
  assert.equal(result.checks.photo_human_gates_open, false);
  assert.equal(result.checks.photo_placements_and_edition_governed, false);
});

test("a recollection cannot automatically become a public projection", () => {
  const wiki = compileWiki();
  const id = "source.recollection.jamie.canoe-commuting.2026-07";
  const record = structuredClone(wiki.byId.get(id));
  record.projection = { status: "active", surfaces: ["/"] };
  wiki.byId.set(id, record);
  const result = evaluatePhotoKnowledge({ wiki });
  assert.equal(result.checks.photo_recollection_nonpublishing, false);
});

test("journey counts cannot be inferred from photo counts", () => {
  const wiki = compileWiki();
  const id = "research-inquiry.canoe-bike-journeys";
  const record = wiki.byId.get(id);
  const original = readFileSync(path.join(defaultRepoRoot, record.path), "utf8");
  const temporary = original.replace(
    "Count journeys, not photographs.",
    "Count every photograph as a separate journey."
  );
  const result = evaluatePhotoKnowledge({
    wiki,
    sourceOverrides: { [id]: temporary }
  });
  assert.equal(result.checks.photo_inquiry_avoids_photo_counting, false);
  assert.match(original, /Count journeys, not photographs/);
});

test("curatorial ranking cannot become publication authority", () => {
  const wiki = compileWiki();
  const id = "evaluation.photo-curation.home-east-river.2026-07-26";
  const record = structuredClone(wiki.byId.get(id));
  record.panel_authority = "automatic-publication";
  wiki.byId.set(id, record);
  const result = evaluatePhotoKnowledge({ wiki });
  assert.equal(result.checks.photo_curatorial_authority_advisory, false);
});

test("protected absence cannot be auto-promoted", () => {
  const wiki = compileWiki();
  const id = "decision.photo.protected-absence.layout-b";
  const record = structuredClone(wiki.byId.get(id));
  record.projection = { status: "active", surfaces: ["/"] };
  wiki.byId.set(id, record);
  const changed = manifest();
  changed.protectedAbsences[0].status = "auto-promoted";
  const result = evaluatePhotoKnowledge({ wiki, manifest: changed });
  assert.equal(result.checks.photo_protected_absence_first_class, false);
});

test("revocation places the photo, occurrence, and edition on hold", () => {
  const changed = applyPhotoRevocation(
    manifest(),
    "photo.east-river-manhattan-bridge.2022"
  );
  const photo = changed.photos[0];
  assert.equal(photo.permissionState, "revoked");
  assert.equal(photo.productionApproval, "hold");
  assert(photo.placements.every((placement) => placement.production === "hold"));
  assert.equal(changed.edition.production, "hold");
  assert.equal(changed.edition.indexing, "hold");
});

test("an RFC stage regression fails the implementation contract", () => {
  const rfc = readFileSync(
    path.join(
      defaultRepoRoot,
      "rfcs/0003-living-photographic-knowledge-loop.md"
    ),
    "utf8"
  ).replace("stage: implementing", "stage: proposed");
  const result = evaluatePhotoKnowledge({ rfc });
  assert.equal(result.checks.photo_rfc_0003_implementing_and_indexed, false);
});

test("a protected local locator fails the public boundary", () => {
  const result = evaluatePhotoKnowledge({
    publicBoundaryExtraSources: ["/Volumes/private/photo-library"]
  });
  assert.equal(result.checks.photo_public_boundary_clean, false);
});
