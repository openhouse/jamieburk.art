import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const moduleUrl = new URL(
  "../../apps/www/src/lib/media-delivery.ts",
  import.meta.url
);
const mediaModule = await import(moduleUrl).catch(() => null);

test("Cloudinary delivery has an importable governed implementation", () => {
  assert.notEqual(
    mediaModule,
    null,
    "the governed media-delivery module must exist before the pilot can activate"
  );
});

test("a governed photograph produces one bounded optimized Cloudinary URL", () => {
  assert.equal(typeof mediaModule?.buildCloudinaryUrl, "function");
  const asset = {
    source: "/images/field-notes/test.webp",
    publicId: "jamieburk-art/portfolio/test-photo/derivative-v1",
    version: 1786824000,
    sourceWidth: 1200,
    widths: [480, 750, 1080, 1200],
    quality: "good"
  };

  assert.equal(
    mediaModule.buildCloudinaryUrl(asset, "portfolio-demo", 750),
    "https://res.cloudinary.com/portfolio-demo/image/upload/c_limit,w_750/f_auto/q_auto:good/v1786824000/jamieburk-art/portfolio/test-photo/derivative-v1"
  );
  assert.equal(
    mediaModule.buildCloudinaryUrl(asset, "portfolio-demo", 1800),
    "https://res.cloudinary.com/portfolio-demo/image/upload/c_limit,w_1200/f_auto/q_auto:good/v1786824000/jamieburk-art/portfolio/test-photo/derivative-v1"
  );
});

test("an unconfigured deployment retains the same-origin source", () => {
  assert.equal(typeof mediaModule?.resolveMediaDelivery, "function");
  assert.deepEqual(
    mediaModule.resolveMediaDelivery(
      "/images/field-notes/nycac-shoestring-facilitation.webp",
      { enabled: false, cloudName: "ofdj6rnm" }
    ),
    {
      mode: "local",
      src: "/images/field-notes/nycac-shoestring-facilitation.webp"
    }
  );
});

test("an unlisted asset cannot move to Cloudinary", () => {
  assert.deepEqual(
    mediaModule.resolveMediaDelivery("/images/social/jamie-east-river-og.jpg", {
      enabled: true,
      cloudName: "ofdj6rnm"
    }),
    {
      mode: "local",
      src: "/images/social/jamie-east-river-og.jpg"
    }
  );
});

test("an active pilot asset emits only its allowlisted responsive widths", () => {
  const result = mediaModule.resolveMediaDelivery(
    "/images/field-notes/nycac-shoestring-facilitation.webp",
    { enabled: true, cloudName: "ofdj6rnm" }
  );

  assert.equal(result.mode, "cloudinary");
  assert.deepEqual(result.widths, [480, 750, 1080, 1280, 1600, 2400]);
  assert.match(result.src, /^https:\/\/res\.cloudinary\.com\/ofdj6rnm\/image\/upload\//);
  assert.match(result.srcSet, / 480w,/);
  assert.match(result.srcSet, / 2400w$/);
  assert.doesNotMatch(result.srcSet, / 3840w/);
});

test("the text-heavy screenshot uses the high-legibility quality policy", () => {
  const result = mediaModule.resolveMediaDelivery(
    "/artifacts/fair-rent-nyc/let-nyc-dance-public-surface.webp",
    { enabled: true, cloudName: "ofdj6rnm" }
  );

  assert.equal(result.mode, "cloudinary");
  assert.match(result.srcSet, /q_auto:best/);
  assert.doesNotMatch(result.srcSet, /w_(?:1600|2400|3840)/);
});

test("the pilot is selective, direct, responsive, and lazy below the fold", () => {
  const responsiveMedia = readFileSync(
    "apps/www/src/components/ResponsiveMedia.tsx",
    "utf8"
  );
  const fieldPhoto = readFileSync(
    "apps/www/src/components/FieldPhoto.tsx",
    "utf8"
  );
  const participation = readFileSync(
    "apps/www/src/components/ParticipationSequence.tsx",
    "utf8"
  );
  const hero = readFileSync("apps/www/src/components/Hero.tsx", "utf8");
  const caseStudy = readFileSync(
    "apps/www/src/components/CaseStudyLayout.tsx",
    "utf8"
  );
  const gallery = readFileSync(
    "apps/www/src/components/CaseStudyBlocks.tsx",
    "utf8"
  );

  assert.match(responsiveMedia, /resolveMediaDelivery/);
  assert.match(responsiveMedia, /srcSet=\{delivery\.srcSet\}/);
  assert.match(responsiveMedia, /loading=\{preload \? "eager" : loading\}/);
  assert.match(fieldPhoto, /ResponsiveMedia/);
  assert.match(participation, /ResponsiveMedia/);
  assert.doesNotMatch(fieldPhoto, /priority/);
  assert.doesNotMatch(hero, /\bpriority\b/);
  assert.doesNotMatch(caseStudy, /\bpriority\b/);
  assert.doesNotMatch(gallery, /loading="eager"/);
});
