import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { registerHooks } from "node:module";
import path from "node:path";
import test from "node:test";
import { pathToFileURL } from "node:url";

const repoRoot = process.cwd();
const appSourceRoot = path.join(repoRoot, "apps/www/src");

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (!specifier.startsWith("@/")) return nextResolve(specifier, context);

    const requested = path.join(appSourceRoot, specifier.slice(2));
    const resolved = [requested, `${requested}.ts`, `${requested}.tsx`].find(existsSync);
    if (!resolved) return nextResolve(specifier, context);

    return {
      shortCircuit: true,
      url: pathToFileURL(resolved).href
    };
  }
});

const [
  { createMetadata },
  { portfolioPhotos },
  {
    homeSocialCard,
    resolveSocialCardIdentityFontLicensePath,
    resolveSocialCardIdentityFontPath,
    resolveSocialCardInterfaceFontLicensePath,
    resolveSocialCardInterfaceFontPath,
    resolveSocialCardPhotoPath
  }
] = await Promise.all([
  import("../../apps/www/src/lib/metadata.ts"),
  import("../../apps/www/src/data/photography.ts"),
  import("../../apps/www/src/data/social-card.ts")
]);

const expectedSocialAlt =
  "Jamie Burkart at the East River shoreline beneath the Manhattan Bridge — Technical Project Manager, Product Operations & Implementation.";

test("Open Graph and Twitter expose the same photographic large-card contract", () => {
  const metadata = createMetadata({
    title: "A current portfolio page",
    description: "A current page description.",
    path: "/work"
  });

  assert.equal(metadata.openGraph?.title, "A current portfolio page");
  assert.equal(metadata.openGraph?.description, "A current page description.");
  assert.equal(metadata.openGraph?.url?.toString(), "https://staging.jamieburk.art/work");
  assert.equal(
    metadata.openGraph?.images?.[0]?.url?.toString(),
    "https://staging.jamieburk.art/opengraph-image?v=human-index-photo-v2"
  );
  assert.equal(metadata.openGraph?.images?.[0]?.width, 1200);
  assert.equal(metadata.openGraph?.images?.[0]?.height, 630);
  assert.equal(metadata.openGraph?.images?.[0]?.alt, expectedSocialAlt);
  assert.equal(metadata.openGraph?.images?.[0]?.alt, homeSocialCard.alt);

  assert.equal(metadata.twitter?.card, "summary_large_image");
  assert.equal(metadata.twitter?.title, metadata.openGraph?.title);
  assert.equal(metadata.twitter?.description, metadata.openGraph?.description);
  const twitterImage = metadata.twitter?.images?.[0];
  assert.equal(
    twitterImage?.url?.toString(),
    metadata.openGraph?.images?.[0]?.url?.toString()
  );
  assert.equal(twitterImage?.alt, homeSocialCard.alt);
  assert.equal(homeSocialCard.photo.id, "east-river");
  assert.equal(homeSocialCard.revision, "human-index-photo-v2");
});

test("the shared identity typeface is a locally deliverable, licensed Palatino-family face", () => {
  const appRoot = path.join(repoRoot, "apps/www");
  const fontPath = resolveSocialCardIdentityFontPath(appRoot);
  const licensePath = resolveSocialCardIdentityFontLicensePath(appRoot);
  const fontBytes = readFileSync(fontPath);
  const license = readFileSync(licensePath, "utf8");

  assert.equal(homeSocialCard.identityFont.family, "TeX Gyre Pagella");
  assert.equal(homeSocialCard.identityFont.weight, 400);
  assert.equal(
    fontPath,
    path.join(appRoot, "public/fonts/tex-gyre-pagella/texgyrepagella-regular.otf")
  );
  assert.equal(
    licensePath,
    path.join(appRoot, "public/fonts/tex-gyre-pagella/GUST-FONT-LICENSE.txt")
  );
  assert.equal(fontBytes.subarray(0, 4).toString("ascii"), "OTTO");
  assert.match(license, /GUST Font License/);
  assert.match(license, /LaTeX Project Public License/);
});

test("the social card preserves the site's Karla interface voice around the serif name", () => {
  const appRoot = path.join(repoRoot, "apps/www");
  const regularFontPath = resolveSocialCardInterfaceFontPath(appRoot, 400);
  const boldFontPath = resolveSocialCardInterfaceFontPath(appRoot, 700);
  const licensePath = resolveSocialCardInterfaceFontLicensePath(appRoot);
  const regularFontBytes = readFileSync(regularFontPath);
  const boldFontBytes = readFileSync(boldFontPath);
  const license = readFileSync(licensePath, "utf8");

  assert.equal(homeSocialCard.interfaceFont.family, "Karla");
  assert.deepEqual(homeSocialCard.interfaceFont.weights, [400, 700]);
  assert.equal(
    regularFontPath,
    path.join(appRoot, "public/fonts/karla/Karla-Regular.ttf")
  );
  assert.equal(
    boldFontPath,
    path.join(appRoot, "public/fonts/karla/Karla-Bold.ttf")
  );
  assert.equal(
    licensePath,
    path.join(appRoot, "public/fonts/karla/OFL.txt")
  );
  assert.deepEqual([...regularFontBytes.subarray(0, 4)], [0x00, 0x01, 0x00, 0x00]);
  assert.deepEqual([...boldFontBytes.subarray(0, 4)], [0x00, 0x01, 0x00, 0x00]);
  assert.match(license, /SIL OPEN FONT LICENSE Version 1\.1/);
});

test("the East River manifest binds the social card to an approved portfolio occurrence", () => {
  const photo = portfolioPhotos.eastRiver;

  assert.equal(photo.src, "/images/field-notes/jamie-east-river.webp");
  assert.equal(photo.publicationStatus, "jamie-authorized");
  assert.equal(photo.releaseState.publicGit, "approved");
  assert.equal(photo.releaseState.staging, "approved");
  assert.equal(photo.releaseState.production, "open");
  assert(photo.placements.includes("home"));
  assert(photo.placements.includes("social-card"));
  assert(photo.placementIds.includes("projection.photo.home-og.east-river"));
});

test("the OG renderer resolves a supported metadata-stripped local image instead of a network fetch", () => {
  assert.equal(typeof resolveSocialCardPhotoPath, "function");

  const appRoot = path.join(repoRoot, "apps/www");
  const localPhoto = resolveSocialCardPhotoPath(appRoot);
  const bytes = readFileSync(localPhoto);

  assert.equal(localPhoto, path.join(appRoot, "public/images/social/jamie-east-river-og-source.jpg"));
  assert.equal(bytes[0], 0xff);
  assert.equal(bytes[1], 0xd8);
  assert(bytes.length < 512 * 1024);
});

test("the renderer uses an ordinary route so file-convention metadata cannot override card parity", () => {
  assert.equal(existsSync(path.join(repoRoot, "apps/www/src/app/opengraph-image.tsx")), false);
  assert.equal(existsSync(path.join(repoRoot, "apps/www/src/app/opengraph-image/route.tsx")), true);
});
