import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import matter from "gray-matter";

const defaultRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

function hasOverride(overrides, relativePath) {
  return Object.prototype.hasOwnProperty.call(overrides, relativePath);
}

function readBuffer(relativePath, root, overrides) {
  if (hasOverride(overrides, relativePath)) {
    const value = overrides[relativePath];
    return Buffer.isBuffer(value) ? value : Buffer.from(value);
  }
  const absolute = path.join(root, relativePath);
  return existsSync(absolute) ? readFileSync(absolute) : Buffer.alloc(0);
}

function readText(relativePath, root, overrides) {
  return readBuffer(relativePath, root, overrides).toString("utf8");
}

function readJson(relativePath, root, overrides) {
  return JSON.parse(readText(relativePath, root, overrides));
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function parseWebP(buffer) {
  if (
    buffer.length < 20 ||
    buffer.toString("ascii", 0, 4) !== "RIFF" ||
    buffer.toString("ascii", 8, 12) !== "WEBP"
  ) {
    return { valid: false, width: null, height: null, chunks: [] };
  }

  const chunks = [];
  let width = null;
  let height = null;
  let offset = 12;
  while (offset + 8 <= buffer.length) {
    const type = buffer.toString("ascii", offset, offset + 4);
    const size = buffer.readUInt32LE(offset + 4);
    const start = offset + 8;
    chunks.push(type);
    if (type === "VP8 " && size >= 10) {
      if (buffer[start + 3] === 0x9d && buffer[start + 4] === 0x01 && buffer[start + 5] === 0x2a) {
        width = buffer.readUInt16LE(start + 6) & 0x3fff;
        height = buffer.readUInt16LE(start + 8) & 0x3fff;
      }
    } else if (type === "VP8X" && size >= 10) {
      width = 1 + buffer.readUIntLE(start + 4, 3);
      height = 1 + buffer.readUIntLE(start + 7, 3);
    } else if (type === "VP8L" && size >= 5 && buffer[start] === 0x2f) {
      const b1 = buffer[start + 1];
      const b2 = buffer[start + 2];
      const b3 = buffer[start + 3];
      const b4 = buffer[start + 4];
      width = 1 + (b1 | ((b2 & 0x3f) << 8));
      height = 1 + ((b2 >> 6) | (b3 << 2) | ((b4 & 0x0f) << 10));
    }
    offset = start + size + (size % 2);
  }
  return { valid: width !== null && height !== null, width, height, chunks };
}

function parseJpeg(buffer) {
  if (buffer.length < 4 || buffer[0] !== 0xff || buffer[1] !== 0xd8) {
    return { valid: false, width: null, height: null, hasProtectedMetadata: false };
  }

  let width = null;
  let height = null;
  let offset = 2;
  while (offset + 4 <= buffer.length) {
    if (buffer[offset] !== 0xff) {
      offset += 1;
      continue;
    }
    const marker = buffer[offset + 1];
    offset += 2;
    if (marker === 0xd9 || marker === 0xda) break;
    if (marker >= 0xd0 && marker <= 0xd7) continue;
    if (offset + 2 > buffer.length) break;
    const segmentLength = buffer.readUInt16BE(offset);
    if (segmentLength < 2 || offset + segmentLength > buffer.length) break;
    if ([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(marker)) {
      height = buffer.readUInt16BE(offset + 3);
      width = buffer.readUInt16BE(offset + 5);
    }
    offset += segmentLength;
  }

  const ascii = buffer.toString("latin1");
  return {
    valid: width !== null && height !== null,
    width,
    height,
    hasProtectedMetadata:
      ascii.includes("Exif\0\0") ||
      ascii.includes("http://ns.adobe.com/xap/1.0/") ||
      ascii.includes("ICC_PROFILE")
  };
}

function parsePng(buffer) {
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  if (buffer.length < 24 || !buffer.subarray(0, 8).equals(signature)) {
    return { valid: false, width: null, height: null, chunks: [] };
  }

  const chunks = [];
  let offset = 8;
  while (offset + 12 <= buffer.length) {
    const length = buffer.readUInt32BE(offset);
    const type = buffer.toString("ascii", offset + 4, offset + 8);
    chunks.push(type);
    offset += 12 + length;
    if (type === "IEND") break;
  }

  return {
    valid: buffer.toString("ascii", 12, 16) === "IHDR",
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
    chunks
  };
}

export function computeSocialPreviewCandidateSha({
  root = defaultRoot,
  config,
  fileOverrides = {}
} = {}) {
  const activeConfig = config ?? readJson("evals/social-preview/og-image.json", root, fileOverrides);
  const hash = createHash("sha256");
  for (const relativePath of [...activeConfig.candidateFiles].sort()) {
    hash.update(relativePath);
    hash.update("\0");
    hash.update(readBuffer(relativePath, root, fileOverrides));
    hash.update("\0");
  }
  return hash.digest("hex");
}

export function evaluateSocialPreview({
  root = defaultRoot,
  config,
  fileOverrides = {}
} = {}) {
  const activeConfig = config ?? readJson("evals/social-preview/og-image.json", root, fileOverrides);
  const expected = activeConfig.expected;
  const social = readText("apps/www/src/data/social-preview.ts", root, fileOverrides);
  const site = readText("apps/www/src/data/site.ts", root, fileOverrides);
  const hero = readText("apps/www/src/components/Hero.tsx", root, fileOverrides);
  const metadata = readText("apps/www/src/lib/metadata.ts", root, fileOverrides);
  const imageRoute = readText("apps/www/src/app/opengraph-image.tsx", root, fileOverrides);
  const globals = readText("apps/www/src/app/globals.css", root, fileOverrides);
  const design = readText("DESIGN.md", root, fileOverrides);
  const typefaces = readText("docs/typefaces.md", root, fileOverrides);
  const colophon = readText("apps/www/src/app/colophon/page.tsx", root, fileOverrides);
  const photography = readText("apps/www/src/data/photography.ts", root, fileOverrides);
  const eastRiverBlock =
    photography.match(/eastRiver:\s*\{([\s\S]*?)\n\s*\},\n\s*saveNYCSpacesTownHall:/)?.[1] ?? "";
  const assetSource = readText(
    "docs/knowledge-bank/assets/photographs/east-river-manhattan-bridge-2022.md",
    root,
    fileOverrides
  );
  const projectionSource = readText(
    "docs/knowledge-bank/projections/photography/global-social-preview-east-river.md",
    root,
    fileOverrides
  );
  const permissionSource = readText(
    "docs/knowledge-bank/sources/permissions/elana-gordon-east-river-portfolio-2026.md",
    root,
    fileOverrides
  );
  const asset = matter(assetSource).data;
  const projection = matter(projectionSource).data;
  const permission = matter(permissionSource).data;
  const photoBuffer = readBuffer(expected.photoPath.replace(/^\//, "apps/www/public/"), root, fileOverrides);
  const webp = parseWebP(photoBuffer);
  const rendererPhotoBuffer = readBuffer(
    expected.rendererPhotoPath.replace(/^\//, "apps/www/public/"),
    root,
    fileOverrides
  );
  const jpeg = parseJpeg(rendererPhotoBuffer);
  const nameArtworkBuffer = readBuffer(
    expected.nameArtworkPath.replace(/^\//, "apps/www/public/"),
    root,
    fileOverrides
  );
  const nameArtwork = parsePng(nameArtworkBuffer);
  const derivative = (asset.public_derivatives ?? []).find((item) => item.id === expected.derivativeId);
  const rendererDerivative = (asset.public_derivatives ?? []).find(
    (item) => item.id === expected.rendererDerivativeId
  );
  const candidateSha256 = computeSocialPreviewCandidateSha({
    root,
    config: activeConfig,
    fileOverrides
  });
  const evidenceBuffer = readBuffer(activeConfig.visualReview.evidencePath, root, fileOverrides);
  const stagingAttestationBuffer = readBuffer(
    activeConfig.stagingReview.attestationPath,
    root,
    fileOverrides
  );
  const stagingAttestation = JSON.parse(stagingAttestationBuffer.toString("utf8"));

  const sharedIdentity =
    social.includes("title: site.name") &&
    social.includes("role: site.role") &&
    social.includes("tagline: site.heroTagline") &&
    social.includes(`photo: portfolioPhotos.${expected.photoKey}`) &&
    hero.includes("const photo = portfolioPhotos.eastRiver") &&
    hero.includes("{site.name}") &&
    hero.includes("{site.heroTagline}");

  const metadataContract =
    metadata.includes('card: "summary_large_image"') &&
    metadata.includes("url: new URL(socialPreview.path, SITE_URL)") &&
    metadata.includes("width: socialPreview.width") &&
    metadata.includes("height: socialPreview.height") &&
    (metadata.match(/alt: socialPreview\.alt/g)?.length ?? 0) >= 2;

  const sharedTypeface =
    social.includes("text: site.name") &&
    social.includes(`fontFamily: "${expected.nameFontFamily}"`) &&
    social.includes(`src: "${expected.nameArtworkPath}"`) &&
    social.includes(`sha256: "${expected.nameArtworkSha256}"`) &&
    globals.includes(`--font-display: "${expected.nameFontFamily}", Palatino`) &&
    design.includes(`display: "${expected.nameFontFamily},`) &&
    design.includes("metadata-stripped raster rendered from the local system Palatino") &&
    typefaces.includes("A Palatino-first system serif is the display face") &&
    colophon.includes("metadata-stripped Palatino name raster") &&
    imageRoute.includes("socialPreview.nameArtwork.src") &&
    imageRoute.includes("src={nameArtworkData as unknown as string}") &&
    imageRoute.includes("height={socialPreview.nameArtwork.height}") &&
    imageRoute.includes("width={socialPreview.nameArtwork.width}") &&
    projection.identity_typography?.family === expected.nameFontFamily &&
    projection.identity_typography?.name_artwork === expected.nameArtworkPath.replace(/^\//, "apps/www/public/") &&
    projection.identity_typography?.width === expected.nameArtworkWidth &&
    projection.identity_typography?.height === expected.nameArtworkHeight &&
    projection.identity_typography?.checksum === expected.nameArtworkSha256 &&
    projection.identity_typography?.metadata_stripped === true &&
    /no proprietary font file is distributed/.test(projection.identity_typography?.source_boundary ?? "") &&
    !social.includes(".ttf") &&
    !imageRoute.includes("displayFont") &&
    nameArtworkBuffer.length > 0 &&
    nameArtwork.valid &&
    nameArtwork.width === expected.nameArtworkWidth &&
    nameArtwork.height === expected.nameArtworkHeight &&
    sha256(nameArtworkBuffer) === expected.nameArtworkSha256 &&
    !nameArtwork.chunks.some((chunk) => ["eXIf", "iCCP", "iTXt", "tEXt", "zTXt"].includes(chunk));

  const imageRouteContract =
    imageRoute.includes("export const alt = socialPreview.alt") &&
    imageRoute.includes("width: socialPreview.width") &&
    imageRoute.includes("height: socialPreview.height") &&
    imageRoute.includes("export const contentType = socialPreview.contentType") &&
    imageRoute.includes("socialPreview.rendererPhoto.src") &&
    imageRoute.includes("socialPreview.rendererPhoto.width") &&
    imageRoute.includes("socialPreview.rendererPhoto.height") &&
    imageRoute.includes("socialPreview.nameArtwork.src") &&
    imageRoute.includes("socialPreview.tagline") &&
    imageRoute.includes("socialPreview.domain") &&
    !imageRoute.includes("socialPreview.role") &&
    !imageRoute.includes("socialPreview.photoCredit");

  const visualIdentityContract =
    expected.requiredColors.every((color) => imageRoute.toLowerCase().includes(color)) &&
    imageRoute.includes("linear-gradient(90deg") &&
    imageRoute.includes('height: "100%"') &&
    imageRoute.includes('width: "100%"') &&
    imageRoute.includes('width: "58%"') &&
    imageRoute.includes(`objectPosition: "${expected.objectPosition}"`) &&
    imageRoute.includes('padding: "58px 58px 50px"') &&
    imageRoute.includes('height: "175px"') &&
    imageRoute.includes('width: "350px"') &&
    !imageRoute.includes("socialPreview.role") &&
    !imageRoute.includes("Photograph by");

  const derivativeIntegrity =
    photoBuffer.length > 0 &&
    webp.valid &&
    derivative?.path === expected.photoPath.replace(/^\//, "apps/www/public/") &&
    derivative?.width === webp.width &&
    derivative?.height === webp.height &&
    derivative?.checksum === sha256(photoBuffer) &&
    derivative?.metadata_stripped === true &&
    !webp.chunks.some((chunk) => ["EXIF", "XMP ", "ICCP"].includes(chunk)) &&
    rendererPhotoBuffer.length > 0 &&
    jpeg.valid &&
    rendererDerivative?.path === expected.rendererPhotoPath.replace(/^\//, "apps/www/public/") &&
    rendererDerivative?.width === jpeg.width &&
    rendererDerivative?.height === jpeg.height &&
    rendererDerivative?.checksum === sha256(rendererPhotoBuffer) &&
    rendererDerivative?.metadata_stripped === true &&
    !jpeg.hasProtectedMetadata &&
    social.includes(`src: "${expected.rendererPhotoPath}"`) &&
    social.includes(`derivativeId: "${expected.rendererDerivativeId}"`);

  const governedOccurrence =
    asset.id === expected.assetId &&
    asset.projection?.surfaces?.includes(expected.metadataPath) &&
    assetSource.includes(`target: ${expected.placementId}`) &&
    eastRiverBlock.includes(`"${expected.placementId}"`) &&
    eastRiverBlock.includes('"social-preview"') &&
    projection.id === expected.placementId &&
    projection.asset === expected.assetId &&
    projection.derivative === expected.rendererDerivativeId &&
    projection.route === expected.metadataPath &&
    projection.permission_source === expected.permissionSourceId;

  const attributionAndAlt =
    !social.includes("photoCredit:") &&
    projection.credit?.text === expected.creatorCredit &&
    projection.credit?.visible_in_image === expected.visibleCredit &&
    permission.id === expected.permissionSourceId &&
    permission.permission_capsule?.preferred_credit === expected.creatorCredit &&
    permission.permission_capsule?.visible_credit_optional === true &&
    permission.permission_capsule?.credit_policy?.global_social_preview === "governed-but-not-visible" &&
    !imageRoute.includes("socialPreview.photoCredit") &&
    !imageRoute.includes("Photograph by") &&
    /Jamie Burkart/.test(social) &&
    /East River/.test(social) &&
    /Manhattan Bridge/.test(social) &&
    /usable systems/.test(social) &&
    (social.match(/alt:\s*"([^"]+)"/)?.[1]?.length ?? 0) >= 100;

  const releaseBoundary =
    projection.approval?.public_git === "approved" &&
    projection.approval?.staging === "approved" &&
    projection.approval?.production === "open" &&
    projection.approval?.indexing === "open" &&
    eastRiverBlock.includes('publicationStatus: "jamie-authorized"') &&
    eastRiverBlock.includes('production: "open"') &&
    eastRiverBlock.includes('indexing: "open"');

  const publicSafetyCorpus = `${social}\n${imageRoute}\n${projectionSource}\n${stagingAttestationBuffer.toString("utf8")}`;
  const publicSafety =
    !/\/(Users|Volumes|private)\//.test(publicSafetyCorpus) &&
    !/[A-F0-9]{8}-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{12}/i.test(
      publicSafetyCorpus
    );

  const visualReviewCurrent =
    activeConfig.visualReview.status === "pass" &&
    activeConfig.visualReview.candidateSha256 === candidateSha256 &&
    evidenceBuffer.length > 0 &&
    activeConfig.visualReview.evidenceSha256 === sha256(evidenceBuffer) &&
    activeConfig.visualReview.inspectedSizes.join(",") === "1200x630,600x315,300x158";

  const stagingHumanReviewCurrent =
    activeConfig.stagingReview.status === "pass" &&
    activeConfig.stagingReview.releaseScope === "staging-only" &&
    activeConfig.stagingReview.candidateSha256 === candidateSha256 &&
    activeConfig.stagingReview.attestationSha256 === sha256(stagingAttestationBuffer) &&
    stagingAttestation.suite === activeConfig.suite &&
    stagingAttestation.environment === "staging-a" &&
    stagingAttestation.sourceCommitAtReview === activeConfig.stagingReview.sourceCommitAtReview &&
    stagingAttestation.candidateSha256 === candidateSha256 &&
    stagingAttestation.renderSha256 === activeConfig.stagingReview.renderSha256 &&
    stagingAttestation.render?.width === expected.width &&
    stagingAttestation.render?.height === expected.height &&
    stagingAttestation.render?.contentType === expected.contentType &&
    stagingAttestation.render?.matchesLocallyInspectedPixels === true &&
    stagingAttestation.metadata?.absoluteImageUrlHost === "staging-a.jamieburk.art" &&
    stagingAttestation.metadata?.twitterCard === expected.twitterCard &&
    stagingAttestation.metadata?.descriptiveAltPresent === true &&
    stagingAttestation.runtime?.appEnv === "staging" &&
    stagingAttestation.runtime?.isProduction === false &&
    stagingAttestation.runtime?.robotsIndexable === false &&
    stagingAttestation.runtime?.homepageNoindexHeader === true &&
    stagingAttestation.runtime?.robotsDisallowsRoot === true &&
    stagingAttestation.humanFeedback?.reviewerAuthority === "Jamie Burkart" &&
    stagingAttestation.humanFeedback?.response === "positive" &&
    stagingAttestation.humanFeedback?.actualPersonParticipated === true &&
    stagingAttestation.releaseBoundary?.stagingAuthorized === true &&
    stagingAttestation.releaseBoundary?.productionAuthorized === false &&
    stagingAttestation.releaseBoundary?.indexingAuthorized === false &&
    stagingAttestation.releaseBoundary?.rightsExpanded === false;

  const checks = [
    {
      id: "shared-site-identity-and-photo",
      pass: sharedIdentity,
      detail: "Name, role, homepage tagline, and East River image share canonical site and photo records."
    },
    {
      id: "open-graph-and-twitter-metadata",
      pass: metadataContract,
      detail: "Open Graph and summary-large-image Twitter metadata use the shared path, dimensions, and alt text."
    },
    {
      id: "palatino-display-identity-boundary",
      pass: sharedTypeface,
      detail: "The site uses a Palatino-first display stack and the card uses its checksum-bound, metadata-stripped Palatino name raster without distributing the proprietary font program."
    },
    {
      id: "image-route-shared-contract",
      pass: imageRouteContract,
      detail: "The ImageResponse consumes the shared name artwork, tagline, domain, photo, dimensions, content type, and alt text while detailed role copy remains in metadata."
    },
    {
      id: "human-index-visual-contract",
      pass: visualIdentityContract,
      detail: "The card preserves the Human Index palette, exact full-bleed East River photograph, left gradient, Palatino name scale, and safe inset."
    },
    {
      id: "derivative-integrity-and-metadata-safety",
      pass: derivativeIntegrity,
      detail: `The governed WebP and renderer-safe JPEG are checksum-bound at ${webp.width}×${webp.height} and contain no protected metadata.`
    },
    {
      id: "governed-social-occurrence",
      pass: governedOccurrence,
      detail: "Asset, public manifest, derivative, permission source, route, and social-preview projection are closed under reference."
    },
    {
      id: "governed-attribution-and-descriptive-alt",
      pass: attributionAndAlt,
      detail: "Elana Gordon's authorship remains governed, visible credit is intentionally omitted under optional-credit permission, and the generated card has descriptive alt text."
    },
    {
      id: "release-boundary",
      pass: releaseBoundary,
      detail: "Public Git and staging are approved; production and indexing remain open human decisions."
    },
    {
      id: "public-safety",
      pass: publicSafety,
      detail: "The card, occurrence, and staging attestation expose no protected local path or archive UUID."
    },
    {
      id: "exact-candidate-visual-review",
      pass: visualReviewCurrent,
      detail: `Visual review ${activeConfig.visualReview.status}; candidate ${candidateSha256}.`
    },
    {
      id: "staging-human-feedback-and-release-attestation",
      pass: stagingHumanReviewCurrent,
      detail: "Jamie's positive visual feedback and the exact staging-A render are attested for staging only; production, indexing, and rights expansion remain false."
    }
  ];

  return {
    passed: checks.every((check) => check.pass),
    candidateSha256,
    checks
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const result = evaluateSocialPreview();
  for (const check of result.checks) {
    console.log(`${check.pass ? "PASS" : "FAIL"} ${check.id}: ${check.detail}`);
  }
  if (!result.passed) process.exit(1);
}
