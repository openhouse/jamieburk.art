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
    buildSocialCardLayout,
    homeSocialCard,
    homeSocialCardRenderContract,
    resolveSocialCardIdentityFontLicensePath,
    resolveSocialCardIdentityFontPath,
    resolveSocialCardInterfaceFontLicensePath,
    resolveSocialCardInterfaceFontPath,
    resolveSocialCardPhotoPath,
    validateHomeSocialCardRenderContract
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
    "https://staging.jamieburk.art/opengraph-image?v=human-index-photo-v5"
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
  assert.equal(homeSocialCard.revision, "human-index-photo-v5");
});

test("the cinematic identity gradient reaches every edge, clears before the portrait, and has no rule", () => {
  const layout = buildSocialCardLayout();

  assert.deepEqual(
    {
      top: layout.identityField.top,
      bottom: layout.identityField.bottom,
      left: layout.identityField.left,
      right: layout.identityField.right
    },
    { top: 0, bottom: 0, left: 0, right: 0 }
  );
  assert.equal(layout.identityField.position, "absolute");
  assert.match(layout.identityField.background, /^linear-gradient\(90deg,/);
  assert.match(layout.identityField.background, /rgba\(12, 22, 28, 0\) 89%\)$/);
  assert.equal("rule" in layout, false);
  assert.equal(layout.copy.position, "absolute");
  assert.equal(layout.copy.left <= 72, true);
  assert.equal(layout.copy.left + layout.copy.width < homeSocialCard.width * 0.65, true);
});

test("the selected role-led composition enforces its social-preview contrast floor", () => {
  assert.equal(typeof homeSocialCardRenderContract, "object");
  assert.equal(homeSocialCardRenderContract.id, "home-social-card-role-led-v1");
  assert.deepEqual(homeSocialCardRenderContract.visibleCopyOrder, ["role", "name"]);
  assert.equal(homeSocialCardRenderContract.accessibility.targetContrastRatio, 4.5);
  assert.equal(
    homeSocialCardRenderContract.accessibility.minimumIdentityFieldOpacity,
    0.674140289044
  );

  const belowFloor = structuredClone(homeSocialCardRenderContract);
  belowFloor.layers.identityField.opacity = 0.61803398875;
  belowFloor.accessibility.measuredIdentityFieldOpacity = 0.61803398875;
  assert.throws(
    () => buildSocialCardLayout(belowFloor),
    /identity-field opacity must be at least 0\.674140289044/
  );

  const passingVariant = structuredClone(homeSocialCardRenderContract);
  passingVariant.layers.identityField.opacity = 0.764;
  passingVariant.accessibility.measuredIdentityFieldOpacity = 0.764;
  const passingLayout = buildSocialCardLayout(passingVariant);
  assert.equal(passingLayout.identityField.opacity, 0.764);
});

test("the renderer rejects a stale or internally inconsistent render receipt", () => {
  assert.equal(typeof validateHomeSocialCardRenderContract, "function");
  assert.doesNotThrow(() => validateHomeSocialCardRenderContract());

  const staleDimensions = structuredClone(homeSocialCardRenderContract);
  staleDimensions.goldenRender.width = 1199;
  assert.throws(
    () => validateHomeSocialCardRenderContract(staleDimensions),
    /golden render dimensions must match the social-card dimensions/
  );

  const staleOpacityReceipt = structuredClone(homeSocialCardRenderContract);
  staleOpacityReceipt.accessibility.measuredIdentityFieldOpacity = 0.91;
  assert.throws(
    () => validateHomeSocialCardRenderContract(staleOpacityReceipt),
    /measured identity-field opacity must match the selected opacity/
  );

  const staleHash = structuredClone(homeSocialCardRenderContract);
  staleHash.goldenRender.sha256 = "not-a-sha256";
  assert.throws(
    () => validateHomeSocialCardRenderContract(staleHash),
    /golden render must carry a SHA-256 digest/
  );
});

test("the social card exposes only the role and name as visible copy", () => {
  assert.deepEqual(homeSocialCard.visibleCopy, {
    role: "Technical Project Manager - Product Operations & Implementation",
    name: "Jamie Burkart"
  });
  assert.equal(Object.values(homeSocialCard.visibleCopy).includes(homeSocialCard.tagline), false);
  assert.equal(Object.values(homeSocialCard.visibleCopy).includes(homeSocialCard.photoLabel), false);
  assert.equal(Object.values(homeSocialCard.visibleCopy).includes(homeSocialCard.photoCredit), false);
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
