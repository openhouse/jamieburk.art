import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { evaluateLayout } from "../check-layout-evals.mjs";

test("current photographic layout passes every hard gate", () => {
  const result = evaluateLayout();
  assert.equal(result.passed, true, JSON.stringify(result.failures, null, 2));
});

test("a private archive identifier fails closed", () => {
  const path = "apps/www/src/data/photography.ts";
  const source = `// 12345678-1234-1234-1234-123456789ABC\n${readFileSync(path, "utf8")}`;
  const result = evaluateLayout(process.cwd(), { [path]: source });
  assert.equal(result.passed, false);
  assert(result.failures.some(({ criterion }) => criterion === "metadata-and-locator-safety"));
});

test("a missing caption fails the manifest contract", () => {
  const path = "apps/www/src/data/photography.ts";
  const source = readFileSync(path, "utf8").replace(
    'caption: "At the East River beneath the Manhattan Bridge, 2022.",',
    ""
  );
  const result = evaluateLayout(process.cwd(), { [path]: source });
  assert.equal(result.passed, false);
  assert(result.failures.some(({ criterion }) => criterion === "manifest-bound-publication"));
});

test("a decorative gradient fails the material-system contract", () => {
  const path = "apps/www/src/app/globals.css";
  const source = `${readFileSync(path, "utf8")}\n.test { background: linear-gradient(red, blue); }\n`;
  const result = evaluateLayout(process.cwd(), { [path]: source });
  assert.equal(result.passed, false);
  assert(result.failures.some(({ criterion }) => criterion === "human-index-material-system"));
});

test("removing a participation-sequence photographer credit fails closed", () => {
  const path = "apps/www/src/data/photography.ts";
  const source = readFileSync(path, "utf8").replace(
    'credit: "Photograph by Paul Mossine. From Jamie Burkart\'s photo archive.",',
    ""
  );
  const result = evaluateLayout(process.cwd(), { [path]: source });
  assert.equal(result.passed, false);
  assert(result.failures.some(({ criterion }) => criterion === "manifest-bound-publication"));
});

test("private People or GPS metadata cannot enter the public photography surface", () => {
  const path = "apps/www/src/components/ParticipationSequence.tsx";
  const source = `${readFileSync(path, "utf8")}\n// /Volumes/archive People tags GPSLatitude\n`;
  const result = evaluateLayout(process.cwd(), { [path]: source });
  assert.equal(result.passed, false);
  assert(result.failures.some(({ criterion }) => criterion === "metadata-and-locator-safety"));
});

test("the homepage hero remains bound to the East River photograph", () => {
  const path = "apps/www/src/components/Hero.tsx";
  const source = readFileSync(path, "utf8").replace(
    "portfolioPhotos.eastRiver",
    "portfolioPhotos.nycacMarketHotelBanner"
  );
  const result = evaluateLayout(process.cwd(), { [path]: source });
  assert.equal(result.passed, false);
  assert(result.failures.some(({ criterion }) => criterion === "editorial-not-decorative"));
});

test("every work item retains a truthful cover visual", () => {
  const path = "apps/www/src/data/work-covers.ts";
  const source = readFileSync(path, "utf8").replace(
    'src: "/artifacts/wowlist/public-threshold.webp",',
    'src: "/artifacts/hje/public-site.png",'
  );
  const result = evaluateLayout(process.cwd(), { [path]: source });
  assert.equal(result.passed, false);
  assert(result.failures.some(({ criterion }) => criterion === "truthful-project-cover-field"));
});

test("tag-shaped controls retain real destinations", () => {
  const path = "apps/www/src/components/TagList.tsx";
  const source = readFileSync(path, "utf8").replace("/work?tag=", "/work#");
  const result = evaluateLayout(process.cwd(), { [path]: source });
  assert.equal(result.passed, false);
  assert(result.failures.some(({ criterion }) => criterion === "tag-navigation-contract"));
});

test("metadata remains bound to the shared social-preview contract", () => {
  const path = "apps/www/src/lib/metadata.ts";
  const source = readFileSync(path, "utf8").replace(
    "socialPreview.route",
    '"/stale-social-preview"'
  );
  const result = evaluateLayout(process.cwd(), { [path]: source });
  assert.equal(result.passed, false);
  assert(result.failures.some(({ criterion }) => criterion === "social-preview-contract"));
});

test("the social preview cannot lose its governed photograph", () => {
  const path = "apps/www/src/app/opengraph-image.tsx";
  const source = readFileSync(path, "utf8").replace(
    "socialPreview.image.src",
    '"/images/field-notes/kc-town-hall-roof-work.webp"'
  );
  const result = evaluateLayout(process.cwd(), { [path]: source });
  assert.equal(result.passed, false);
  assert(result.failures.some(({ criterion }) => criterion === "social-preview-contract"));
});

test("the distilled social preview rejects caption, focus, or pixel-credit copy", () => {
  const path = "apps/www/src/app/opengraph-image.tsx";
  const source = `${readFileSync(path, "utf8")}\n// socialPreview.image.caption socialPreview.focus socialPreview.credit\n`;
  const result = evaluateLayout(process.cwd(), { [path]: source });
  assert.equal(result.passed, false);
  assert(result.failures.some(({ criterion }) => criterion === "social-preview-contract"));
});

test("the social preview renders each reader answer exactly once", () => {
  const path = "apps/www/src/app/opengraph-image.tsx";
  const source = readFileSync(path, "utf8").replace(
    "{socialPreview.siteLabel}",
    "{socialPreview.siteLabel}{socialPreview.siteLabel}"
  );
  const result = evaluateLayout(process.cwd(), { [path]: source });
  assert.equal(result.passed, false);
  assert(result.failures.some(({ criterion }) => criterion === "social-preview-contract"));
});

test("social-preview metadata retains creator attribution when the rendered pixels omit it", () => {
  const path = "apps/www/src/data/social-preview.ts";
  const source = readFileSync(path, "utf8").replace("Photograph by Elana Gordon.", "");
  const result = evaluateLayout(process.cwd(), { [path]: source });
  assert.equal(result.passed, false);
  assert(result.failures.some(({ criterion }) => criterion === "social-preview-contract"));
});

test("the social preview uses a renderer-supported image derivative", () => {
  const path = "apps/www/src/data/photography.ts";
  const source = readFileSync(path, "utf8").replace(
    "/images/social/jamie-east-river-og.jpg",
    "/images/social/jamie-east-river-og.webp"
  );
  const result = evaluateLayout(process.cwd(), { [path]: source });
  assert.equal(result.passed, false);
  assert(result.failures.some(({ criterion }) => criterion === "social-preview-contract"));
});

test("the social preview loads its governed image locally rather than through a remote site URL", () => {
  const path = "apps/www/src/app/opengraph-image.tsx";
  const source = readFileSync(path, "utf8").replace(
    "const imageData = await readSocialPreviewImage();",
    "const imageData = await fetch(new URL(socialPreview.image.src, SITE_URL));"
  );
  const result = evaluateLayout(process.cwd(), { [path]: source });
  assert.equal(result.passed, false);
  assert(result.failures.some(({ criterion }) => criterion === "social-preview-contract"));
});
