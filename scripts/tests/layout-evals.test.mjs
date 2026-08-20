import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { evaluateLayout } from "../check-layout-evals.mjs";
import {
  evaluateApprovedRender,
  inspectPng,
  readApprovedRender
} from "../check-social-preview-render.mjs";

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

test("removing a participation-sequence project courtesy credit fails closed", () => {
  const path = "apps/www/src/data/photography.ts";
  const source = readFileSync(path, "utf8").replace(
    'credit: "Photo courtesy of NYC Artist Coalition.",',
    ""
  );
  const result = evaluateLayout(process.cwd(), { [path]: source });
  assert.equal(result.passed, false);
  assert(result.failures.some(({ criterion }) => criterion === "manifest-bound-publication"));
});

test("archive-process language in a public photo credit fails closed", () => {
  const path = "apps/www/src/data/photography.ts";
  const source = readFileSync(path, "utf8").replace(
    'credit: "Photo courtesy of Sunday Dinner NYC.",',
    'credit: "Photographer not identified in the retained export.",'
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

test("an authorized project cover cannot be described as still pending", () => {
  const path = "apps/www/src/data/work.ts";
  const source = readFileSync(path, "utf8").replace(
    "one human-reviewed project photograph cleared for this portfolio display with a Sunday Dinner NYC courtesy credit",
    "approved public materials pending"
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

test("the selected editorial preview keeps the role out of rendered pixels", () => {
  const path = "apps/www/src/app/opengraph-image.tsx";
  const source = `${readFileSync(path, "utf8")}\n// {socialPreview.role}\n`;
  const result = evaluateLayout(process.cwd(), { [path]: source });
  assert.equal(result.passed, false);
  assert(result.failures.some(({ criterion }) => criterion === "social-preview-contract"));
});

test("the procedural score cannot lose a rendering priority", () => {
  const path = "apps/www/src/data/social-preview.ts";
  const source = readFileSync(path, "utf8").replace(
    "destination-is-quiet",
    "destination-is-prominent"
  );
  const result = evaluateLayout(process.cwd(), { [path]: source });
  assert.equal(result.passed, false);
  assert(result.failures.some(({ criterion }) => criterion === "social-preview-contract"));
});

test("social-preview metadata retains creator attribution when the rendered pixels omit it", () => {
  const path = "apps/www/src/data/social-preview.ts";
  const source = readFileSync(path, "utf8").replaceAll(
    "Photograph by Elana Gordon.",
    ""
  );
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
    "readSocialPreviewAsset(socialPreview.image.src)",
    "fetch(new URL(socialPreview.image.src, SITE_URL))"
  );
  const result = evaluateLayout(process.cwd(), { [path]: source });
  assert.equal(result.passed, false);
  assert(result.failures.some(({ criterion }) => criterion === "social-preview-contract"));
});

test("the approved-render verifier reads the declarative composition contract", () => {
  const contract = readApprovedRender(`approvedRender: {
    width: 1200,
    height: 630,
    contentType: "image/png",
    sha256: "abc123"
  },`);
  assert.deepEqual(contract, {
    width: 1200,
    height: 630,
    contentType: "image/png",
    sha256: "abc123"
  });
});

test("the approved-render verifier reads PNG dimensions and bytes", () => {
  const bytes = Buffer.alloc(24);
  Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]).copy(bytes);
  bytes.write("IHDR", 12, "ascii");
  bytes.writeUInt32BE(1200, 16);
  bytes.writeUInt32BE(630, 20);
  assert.deepEqual(inspectPng(bytes), {
    width: 1200,
    height: 630,
    contentType: "image/png",
    sha256: "763d6b5763eb64e1310fc3d6b27291a4c7b3fa6d03e9cb3f71d79ddba25f58fc"
  });
});

test("the approved-render verifier fails exact output drift", () => {
  const observed = {
    width: 1200,
    height: 630,
    contentType: "image/png",
    sha256: "new-render"
  };
  const approved = { ...observed, sha256: "approved-render" };
  assert.deepEqual(evaluateApprovedRender(observed, approved), [
    "sha256: expected approved-render, observed new-render"
  ]);
});
