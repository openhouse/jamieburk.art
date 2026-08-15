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

function renderingScore() {
  return {
    schemaVersion: 1,
    id: "global-social-preview-east-river-v2",
    decision: "Image 4",
    intent:
      "Keep the photograph legible as situated evidence while the name and proposition retain textual authority at social-card and thumbnail sizes.",
    priorities: [
      {
        rank: 1,
        id: "truth-and-governance",
        instruction:
          "Use only the governed exact photo, shared identity copy, and approved Palatino raster; never let visual refinement expand rights or release state."
      },
      {
        rank: 2,
        id: "name-proposition-place",
        instruction:
          "Preserve the reading order Jamie Burkart, homepage proposition, jamieburk.art while the person and East River remain recognizable."
      },
      {
        rank: 3,
        id: "accessible-authority",
        instruction:
          "Keep every text layer at or above 4.5:1 against the composited photograph at reviewed social-preview scales."
      },
      {
        rank: 4,
        id: "photographic-openness",
        instruction:
          "Use the least darkening that preserves the selected hierarchy and contrast margin; do not turn the left side into a detached title card."
      },
      {
        rank: 5,
        id: "exact-candidate-review",
        instruction:
          "Invalidate prior review when any governed input, rendering instruction, or rendered pixel changes."
      }
    ],
    render: {
      canvas: { width: 1200, height: 630, background: "#1a232b" },
      photo: { objectFit: "cover", objectPosition: "50% 47%" },
      overlay: {
        type: "linear-gradient",
        angleDegrees: 90,
        color: "#1a232b",
        opacity: 0.854,
        stops: [
          { positionPercent: 0, alpha: 0.98 },
          { positionPercent: 34, alpha: 0.95 },
          { positionPercent: 52, alpha: 0.78 },
          { positionPercent: 72, alpha: 0.2 },
          { positionPercent: 100, alpha: 0.04 }
        ]
      },
      content: {
        widthPercent: 58,
        padding: "58px 58px 50px",
        textColor: "#ffffff",
        supportingFontFamily: "Arial, sans-serif",
        name: { width: 350, height: 175 },
        tagline: { fontSize: 38, fontWeight: 700, lineHeight: 1.16, marginTop: 42, maxWidth: 500 },
        domain: { color: "#a9c4cf", fontSize: 24, fontWeight: 700, letterSpacing: 1.1 }
      }
    },
    accessibility: {
      standard: "WCAG 2.x AA contrast for images of text",
      minimumContrastRatio: 4.5,
      measuredMinimumOverlayOpacity: 0.82395,
      selectedOverlayOpacity: 0.854,
      reason:
        "Use normal-text AA because social platforms downscale the raster; the selected value retains margin above the measured floor.",
      reviewSizes: ["1200x630", "600x315", "300x158"]
    },
    boundaries: {
      includeRole: false,
      includeVisiblePhotoCredit: false,
      productionAuthorized: false,
      indexingAuthorized: false,
      rightsExpanded: false
    }
  };
}

test("the reviewed global social preview passes", () => {
  assert.equal(evaluateSocialPreview().passed, true);
});

test("the rendering score's ranked priorities cannot silently lose their instructions", () => {
  const relativePath = "apps/www/src/data/social-preview-composition.json";
  const score = renderingScore();
  score.priorities[3].instruction = "";
  const result = evaluateSocialPreview({
    fileOverrides: { [relativePath]: JSON.stringify(score) }
  });
  assert.equal(result.checks.find((check) => check.id === "declarative-rendering-score")?.pass, false);
});

test("the selected overlay cannot undercut the measured accessible floor", () => {
  const relativePath = "apps/www/src/data/social-preview-composition.json";
  const score = renderingScore();
  score.render.overlay.opacity = 0.82394;
  score.accessibility.selectedOverlayOpacity = 0.82394;
  const result = evaluateSocialPreview({
    fileOverrides: { [relativePath]: JSON.stringify(score) }
  });
  assert.equal(result.checks.find((check) => check.id === "declarative-rendering-score")?.pass, false);
});

test("the image route cannot bypass the declarative overlay opacity", () => {
  const relativePath = "apps/www/src/app/opengraph-image.tsx";
  const result = evaluateSocialPreview({
    fileOverrides: {
      [relativePath]: text(relativePath).replace(
        "opacity: socialPreviewComposition.render.overlay.opacity",
        "opacity: 1"
      )
    }
  });
  assert.equal(result.checks.find((check) => check.id === "score-consumed-by-image-route")?.pass, false);
});

test("the rendering score cannot authorize production or indexing", () => {
  const relativePath = "apps/www/src/data/social-preview-composition.json";
  const score = renderingScore();
  score.boundaries.productionAuthorized = true;
  score.boundaries.indexingAuthorized = true;
  const result = evaluateSocialPreview({
    fileOverrides: { [relativePath]: JSON.stringify(score) }
  });
  assert.equal(result.checks.find((check) => check.id === "declarative-rendering-score")?.pass, false);
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
  const relativePath = "apps/www/src/data/social-preview-composition.json";
  const result = evaluateSocialPreview({
    fileOverrides: {
      [relativePath]: text(relativePath).replace('"objectPosition": "50% 47%"', '"objectPosition": "50% 50%"')
    }
  });
  assert.equal(result.checks.find((check) => check.id === "exact-candidate-visual-review").pass, false);
});

test("positive staging feedback cannot be promoted to production approval", () => {
  const relativePath = "evals/social-preview/runs/2026-08-15-staging-a-854.json";
  const result = evaluateSocialPreview({
    fileOverrides: {
      [relativePath]: text(relativePath).replace(
        '"productionAuthorized": false',
        '"productionAuthorized": true'
      )
    }
  });
  assert.equal(
    result.checks.find((check) => check.id === "staging-human-feedback-and-release-attestation").pass,
    false
  );
});

test("the staging attestation cannot drift from the reviewed pixel digest", () => {
  const relativePath = "evals/social-preview/runs/2026-08-15-staging-a-854.json";
  const result = evaluateSocialPreview({
    fileOverrides: {
      [relativePath]: text(relativePath).replace(
        "6d54b100fd231b9001c17a72abf1f4d29b6fca09f320dfd4bd02c471472b1d82",
        "0".repeat(64)
      )
    }
  });
  assert.equal(
    result.checks.find((check) => check.id === "staging-human-feedback-and-release-attestation").pass,
    false
  );
});

test("the staging attestation cannot publish a protected local locator", () => {
  const relativePath = "evals/social-preview/runs/2026-08-15-staging-a-854.json";
  const result = evaluateSocialPreview({
    fileOverrides: {
      [relativePath]: text(relativePath).replace(
        "https://staging-a.jamieburk.art/opengraph-image",
        "/Users/example/private/social-preview.png"
      )
    }
  });
  assert.equal(result.checks.find((check) => check.id === "public-safety").pass, false);
});
