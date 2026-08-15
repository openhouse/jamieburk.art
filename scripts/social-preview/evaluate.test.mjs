import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { evaluateSocialPreview } from "./evaluate.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

function text(relativePath) {
  return readFileSync(path.join(root, relativePath), "utf8");
}

test("the reviewed global social preview passes", () => {
  assert.equal(evaluateSocialPreview().passed, true);
});

test("Open Graph metadata cannot drift from the shared image contract", () => {
  const relativePath = "apps/www/src/lib/metadata.ts";
  const result = evaluateSocialPreview({
    fileOverrides: {
      [relativePath]: text(relativePath).replace("alt: socialPreview.alt", 'alt: "Generic portfolio"')
    }
  });
  assert.equal(result.checks.find((check) => check.id === "open-graph-and-twitter-metadata").pass, false);
});

test("the social image cannot silently fall back from the site's display typeface", () => {
  const relativePath = "apps/www/src/data/social-preview.ts";
  const result = evaluateSocialPreview({
    fileOverrides: {
      [relativePath]: text(relativePath).replace(
        'fontFamily: "Palatino Linotype"',
        'fontFamily: "Arial"'
      )
    }
  });
  assert.equal(result.checks.find((check) => check.id === "palatino-display-identity-boundary").pass, false);
});

test("the social preview cannot silently diverge from the homepage photograph", () => {
  const relativePath = "apps/www/src/data/social-preview.ts";
  const result = evaluateSocialPreview({
    fileOverrides: {
      [relativePath]: text(relativePath).replace("portfolioPhotos.eastRiver", "portfolioPhotos.kcTownHallRoofWork")
    }
  });
  assert.equal(result.checks.find((check) => check.id === "shared-site-identity-and-photo").pass, false);
});

test("photographer attribution cannot disappear from the governed occurrence", () => {
  const relativePath = "docs/knowledge-bank/projections/photography/global-social-preview-east-river.md";
  const result = evaluateSocialPreview({
    fileOverrides: {
      [relativePath]: text(relativePath).replace("  text: Photograph by Elana Gordon.", "  text: Creator not recorded.")
    }
  });
  assert.equal(result.checks.find((check) => check.id === "governed-attribution-and-descriptive-alt").pass, false);
});

test("visible credit cannot silently return to the distilled traveling image", () => {
  const relativePath = "docs/knowledge-bank/projections/photography/global-social-preview-east-river.md";
  const result = evaluateSocialPreview({
    fileOverrides: {
      [relativePath]: text(relativePath).replace("  visible_in_image: false", "  visible_in_image: true")
    }
  });
  assert.equal(result.checks.find((check) => check.id === "governed-attribution-and-descriptive-alt").pass, false);
});

test("the social image cannot lose its governed occurrence", () => {
  const relativePath = "apps/www/src/data/photography.ts";
  const result = evaluateSocialPreview({
    fileOverrides: {
      [relativePath]: text(relativePath).replace(
        ',\n      "projection.photo.global-social-preview.east-river"',
        ""
      )
    }
  });
  assert.equal(result.checks.find((check) => check.id === "governed-social-occurrence").pass, false);
});

test("a changed candidate invalidates the prior visual review", () => {
  const relativePath = "apps/www/src/app/opengraph-image.tsx";
  const result = evaluateSocialPreview({
    fileOverrides: {
      [relativePath]: text(relativePath).replace('objectPosition: "50% 47%"', 'objectPosition: "50% 50%"')
    }
  });
  assert.equal(result.checks.find((check) => check.id === "exact-candidate-visual-review").pass, false);
});
