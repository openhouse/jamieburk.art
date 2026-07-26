import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";

import {
  defaultRepoRoot,
  evaluateLayoutPhotography
} from "../lib/layout-photography-eval.mjs";

function source(relativePath) {
  return readFileSync(path.join(defaultRepoRoot, relativePath), "utf8");
}

function suite() {
  return JSON.parse(
    readFileSync(
      path.join(defaultRepoRoot, "evals/layout-photography/suite.json"),
      "utf8"
    )
  );
}

test("the layout and photography baseline passes", () => {
  const evaluation = evaluateLayoutPhotography();
  assert.deepEqual(evaluation.failures, []);
  assert.deepEqual(evaluation.counts, {
    requiredPhotoAssets: 7,
    projectedPhotoAssets: 7
  });
});

test("a missing photograph fails closed", () => {
  const item = suite().required_photo_assets[0];
  const evaluation = evaluateLayoutPhotography({
    assetOverrides: { [item.path]: null }
  });
  assert.equal(
    evaluation.checks.photo_assets_are_exact_and_metadata_minimized,
    false
  );
});

test("embedded image metadata fails closed", () => {
  const item = suite().required_photo_assets[0];
  const original = readFileSync(path.join(defaultRepoRoot, item.path));
  const evaluation = evaluateLayoutPhotography({
    assetOverrides: {
      [item.path]: Buffer.concat([original, Buffer.from("Exif\0\0", "binary")])
    }
  });
  assert.equal(
    evaluation.checks.photo_assets_are_exact_and_metadata_minimized,
    false
  );
});

test("a private archive path fails closed", () => {
  const file = "apps/www/src/data/photography.ts";
  const evaluation = evaluateLayoutPhotography({
    sourceOverrides: {
      [file]: `${source(file)}\n// /Volumes/private/Jamie.photoslibrary/original.jpg\n`
    }
  });
  assert.equal(evaluation.checks.private_archive_coordinates_are_absent, false);
  assert.equal(evaluation.checks.photo_records_are_complete_and_public_safe, false);
});

test("an empty alt attribute fails the visual contract", () => {
  const file = "apps/www/src/components/Hero.tsx";
  const evaluation = evaluateLayoutPhotography({
    sourceOverrides: {
      [file]: source(file).replace(
        "alt={image.alt}",
        'alt=""'
      )
    }
  });
  assert.equal(
    evaluation.checks.photography_is_responsive_and_non_decorative,
    false
  );
});

test("the hero cannot regress to a text-only surface", () => {
  const file = "apps/www/src/components/Hero.tsx";
  const evaluation = evaluateLayoutPhotography({
    sourceOverrides: {
      [file]: source(file).replace("<Image", "<div")
    }
  });
  assert.equal(evaluation.checks.hero_is_image_led_and_role_legible, false);
});

test("a decorative gradient fails the material palette", () => {
  const file = "apps/www/src/app/globals.css";
  const evaluation = evaluateLayoutPhotography({
    sourceOverrides: {
      [file]: `${source(file)}\nbody { background: linear-gradient(#fff, #000); }\n`
    }
  });
  assert.equal(
    evaluation.checks.layout_uses_human_index_material_palette,
    false
  );
});

test("removing the photo evidence boundary fails closed", () => {
  const file = "apps/www/src/data/photography.ts";
  const evaluation = evaluateLayoutPhotography({
    sourceOverrides: {
      [file]: source(file).replace(
        "A displayed image does not by itself establish",
        "Every photograph establishes"
      )
    }
  });
  assert.equal(evaluation.checks.photo_evidence_boundary_is_visible, false);
});

test("project cards cannot return to miniature case studies", () => {
  const file = "apps/www/src/components/WorkCard.tsx";
  const evaluation = evaluateLayoutPhotography({
    sourceOverrides: {
      [file]: `${source(file)}\n{/* item.whatWasUnclear item.roleFit */}\n`
    }
  });
  assert.equal(evaluation.checks.project_cards_remain_scannable, false);
});

test("rights and consent review remain human gates", () => {
  const mutated = suite();
  mutated.manual_gates.image_by_image_rights_review = "passed";
  const evaluation = evaluateLayoutPhotography({ suiteOverride: mutated });
  assert.equal(evaluation.checks.manual_publication_gates_remain_open, false);
});

test("every active photograph keeps a bounded working-use record", () => {
  const file = "apps/www/src/data/photography.ts";
  const evaluation = evaluateLayoutPhotography({
    sourceOverrides: {
      [file]: source(file).replace(
        /(raftInFog:[\s\S]*?)workingUse: "authorized-for-features-layout-D-review"/,
        '$1workingUse: "unreviewed"'
      )
    }
  });
  assert.equal(
    evaluation.checks.working_branch_review_is_explicit_per_image,
    false
  );
});

test("the layout notebook cannot activate itself as a projection", () => {
  const file = "docs/knowledge-bank/notebooks/photography/layout-study-d.md";
  const evaluation = evaluateLayoutPhotography({
    sourceOverrides: {
      [file]: source(file)
        .replace("status: hold", "status: active")
        .replace("surfaces: []", "surfaces: [homepage]")
    }
  });
  assert.equal(evaluation.checks.layout_study_is_governed, false);
});
