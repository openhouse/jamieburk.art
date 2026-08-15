import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const defaultRoot = path.resolve(scriptDir, "..");

function walkFiles(root, relative = "") {
  const directory = path.join(root, relative);
  return readdirSync(directory).flatMap((name) => {
    const child = path.join(relative, name);
    return statSync(path.join(root, child)).isDirectory()
      ? walkFiles(root, child)
      : [child];
  });
}

export function evaluateMediaDelivery(root = defaultRoot, overrides = {}) {
  const failures = [];
  const fail = (criterion, message) => failures.push({ criterion, message });
  const read = (relativePath) =>
    overrides[relativePath] ?? readFileSync(path.join(root, relativePath), "utf8");

  const evaluation = JSON.parse(read("evals/media-delivery/evals.json"));
  const expectedCriteria = [
    "public-safe-upload-boundary",
    "repository-source-authority",
    "immutable-versioned-delivery",
    "responsive-performance-contract",
    "reversible-delivery-switch",
    "image-search-discovery",
    "local-resilience-and-human-authority"
  ];
  if (
    JSON.stringify(evaluation.criteria.map(({ id }) => id)) !==
      JSON.stringify(expectedCriteria) ||
    evaluation.criteria.some(({ blocking }) => blocking !== true)
  ) {
    fail("eval-contract", "The blocking media-delivery contract changed.");
  }

  const manifestPath = "apps/www/src/data/media-delivery.json";
  const manifest = JSON.parse(read(manifestPath));
  const sources = new Set();
  const publicIds = new Set();
  const authorityRoots = ["apps/www/src/data", "docs/knowledge-bank"];
  const authorityCorpus = authorityRoots
    .flatMap((relativeRoot) =>
      walkFiles(path.join(root, relativeRoot))
        .filter((relativePath) => /\.(?:json|md|tsx?)$/.test(relativePath))
        .filter(
          (relativePath) =>
            path.join(relativeRoot, relativePath) !== manifestPath
        )
        .map((relativePath) => read(path.join(relativeRoot, relativePath)))
    )
    .join("\n");
  const protectedPattern = /(?:\/Users\/|\/Volumes\/|Library\/Photos|IMG_[0-9]{4}|GPSLatitude|GPSLongitude|[0-9A-F]{8}(?:-[0-9A-F]{4}){3}-[0-9A-F]{12})/i;

  if (
    manifest.schemaVersion !== 1 ||
    manifest.provider?.name !== "cloudinary" ||
    manifest.provider?.cloudName !== "ofdj6rnm" ||
    manifest.provider?.deliveryBase !==
      "https://res.cloudinary.com/ofdj6rnm/image/upload"
  ) {
    fail("immutable-versioned-delivery", "The provider binding is incomplete or changed.");
  }

  for (const asset of manifest.assets ?? []) {
    if (
      protectedPattern.test(JSON.stringify(asset)) ||
      !/^\/(?:images|artifacts)\/[a-z0-9/.-]+$/i.test(asset.source) ||
      asset.publicationStatus !== "approved-public-derivative" ||
      !asset.governanceId
    ) {
      fail("public-safe-upload-boundary", `${asset.id ?? "unknown"} is not a bounded public derivative.`);
    }
    if (sources.has(asset.source)) {
      fail("repository-source-authority", `Duplicate source binding: ${asset.source}`);
    }
    if (!authorityCorpus.includes(asset.governanceId ?? "")) {
      fail(
        "repository-source-authority",
        `Unknown governance authority: ${asset.governanceId ?? "missing"}`
      );
    }
    sources.add(asset.source);

    const sourcePath = path.join(root, "apps/www/public", asset.source);
    if (!existsSync(sourcePath)) {
      fail("repository-source-authority", `Missing local source: ${asset.source}`);
    } else {
      const bytes = readFileSync(sourcePath);
      const digest = createHash("sha256").update(bytes).digest("hex");
      if (digest !== asset.sourceSha256 || bytes.length !== asset.bytes) {
        fail("repository-source-authority", `Source drift: ${asset.source}`);
      }
      if (/EXIF|Exif|GPSLatitude|GPSLongitude|<x:xmpmeta/i.test(bytes.toString("latin1"))) {
        fail("public-safe-upload-boundary", `Embedded metadata: ${asset.source}`);
      }
    }

    if (
      !/^jamieburk-art\/portfolio\/[a-z0-9/-]+$/.test(asset.cloudinary?.publicId ?? "") ||
      !Number.isInteger(asset.cloudinary?.version) ||
      asset.cloudinary.version < 1 ||
      publicIds.has(asset.cloudinary.publicId)
    ) {
      fail("immutable-versioned-delivery", `Invalid Cloudinary binding: ${asset.id}`);
    }
    publicIds.add(asset.cloudinary?.publicId);
    if (
      !Number.isInteger(asset.width) ||
      !Number.isInteger(asset.height) ||
      !["best", "good"].includes(asset.quality) ||
      !Array.isArray(asset.routes) ||
      asset.routes.length === 0 ||
      !asset.title ||
      !asset.caption
    ) {
      fail("responsive-performance-contract", `Incomplete responsive metadata: ${asset.id}`);
    }
  }

  const sourceFiles = walkFiles(path.join(root, "apps/www/src"));
  const appSource = sourceFiles
    .map((relativePath) => read(path.join("apps/www/src", relativePath)))
    .join("\n");
  const visibleRasterSources = new Set(
    [...appSource.matchAll(/["'](\/(?:images|artifacts)\/[a-z0-9/_.-]+\.(?:avif|jpe?g|png|webp))["']/gi)]
      .map((match) => match[1])
      .filter((source) => !source.startsWith("/images/social/"))
  );
  for (const source of visibleRasterSources) {
    if (!sources.has(source)) {
      fail("repository-source-authority", `Visible raster lacks a delivery binding: ${source}`);
    }
  }

  const componentPath = "apps/www/src/components/MediaImage.tsx";
  const component = read(componentPath);
  const loader = read("apps/www/src/lib/cloudinary-image-loader.ts");
  const nextConfig = read("apps/www/next.config.ts");
  const dockerfile = read("Dockerfile");
  const rootLayout = read("apps/www/src/app/layout.tsx");
  if (
    !component.includes('NEXT_PUBLIC_MEDIA_DELIVERY === "cloudinary"') ||
    !component.includes("unoptimized={!useCloudinary}") ||
    !component.includes("encodeCloudinarySource")
  ) {
    fail("reversible-delivery-switch", "The explicit Cloudinary/local switch is incomplete.");
  }
  if ((dockerfile.match(/ARG NEXT_PUBLIC_MEDIA_DELIVERY=local/g) ?? []).length !== 2 ||
      (dockerfile.match(/ENV NEXT_PUBLIC_MEDIA_DELIVERY=\$NEXT_PUBLIC_MEDIA_DELIVERY/g) ?? []).length !== 2) {
    fail("reversible-delivery-switch", "The delivery switch is not available at Docker build and runtime.");
  }
  if (
    !nextConfig.includes('loaderFile: "./src/lib/cloudinary-image-loader.ts"') ||
    /unoptimized\s*:\s*true/.test(nextConfig) ||
    !loader.includes("c_limit") && !loader.includes("buildCloudinaryDeliveryUrl") ||
    !rootLayout.includes('<link crossOrigin="anonymous" href="https://res.cloudinary.com" rel="preconnect" />')
  ) {
    fail("responsive-performance-contract", "The responsive custom-loader contract is incomplete.");
  }

  const directImageConsumers = [
    "apps/www/src/components/Hero.tsx",
    "apps/www/src/components/FieldPhoto.tsx",
    "apps/www/src/components/ParticipationSystem.tsx",
    "apps/www/src/components/WorkCard.tsx",
    "apps/www/src/components/CaseStudyLayout.tsx",
    "apps/www/src/components/CaseStudyBlocks.tsx",
    "apps/www/src/app/lab/source-backed-team-memory/page.tsx"
  ];
  for (const consumerPath of directImageConsumers) {
    const consumer = read(consumerPath);
    if (
      consumer.includes('from "next/image"') ||
      !consumer.includes("MediaImage")
    ) {
      fail("responsive-performance-contract", `${consumerPath} bypasses governed responsive delivery.`);
    }
  }

  const sitemapPath = "apps/www/src/app/image-sitemap.xml/route.ts";
  const sitemap = read(sitemapPath);
  const robots = read("apps/www/src/app/robots.ts");
  if (
    !sitemap.includes("image:image") ||
    !sitemap.includes("image:caption") ||
    !sitemap.includes("image:title") ||
    !sitemap.includes("mediaDeliveryManifest") ||
    !robots.includes("image-sitemap.xml")
  ) {
    fail("image-search-discovery", "The image sitemap or robots discovery binding is incomplete.");
  }

  const docs = read("docs/media-delivery.md");
  const upload = read("scripts/cloudinary/sync-public-media.mjs");
  if (
    !/repository\s+remains authoritative/i.test(docs) ||
    !/passing automated score never grants/i.test(docs) ||
    !/local-only|remain first-party/i.test(JSON.stringify(manifest.localOnly)) ||
    !upload.includes("signature") ||
    /unsigned|upload preset|widget/i.test(upload)
  ) {
    fail("local-resilience-and-human-authority", "Repository authority, signed upload, or local-only scope is incomplete.");
  }

  return {
    passed: failures.length === 0,
    failures,
    criteriaCount: evaluation.criteria.length,
    assetCount: manifest.assets.length
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const result = evaluateMediaDelivery();
  if (!result.passed) {
    for (const failure of result.failures) {
      console.error(`FAIL ${failure.criterion}: ${failure.message}`);
    }
    process.exit(1);
  }
  console.log(
    `Media delivery evals passed: ${result.criteriaCount} blocking criteria; ${result.assetCount} governed raster assets.`
  );
}
