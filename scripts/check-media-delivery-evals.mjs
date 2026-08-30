import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const defaultRoot = path.resolve(scriptDir, "..");

export function evaluateMediaDelivery(root = defaultRoot, overrides = {}) {
  const readText = (relativePath) =>
    overrides[relativePath] ?? readFileSync(path.join(root, relativePath), "utf8");
  const failures = [];
  const fail = (criterion, message) => failures.push({ criterion, message });

  const evaluation = JSON.parse(
    readText("evals/media/cloudinary-delivery.json")
  );
  const expectedCriteria = [
    "exact-asset-binding",
    "bounded-responsive-transforms",
    "local-asset-boundary",
    "loading-policy",
    "configuration-fails-local",
    "human-authority-and-secrets"
  ];
  if (
    JSON.stringify(evaluation.criteria.map(({ id }) => id)) !==
    JSON.stringify(expectedCriteria)
  ) {
    fail("eval-contract", "The media-delivery criteria changed or lost their stable order.");
  }
  if (evaluation.criteria.some(({ blocking }) => blocking !== true)) {
    fail("eval-contract", "Every media-delivery criterion must remain blocking.");
  }

  const modulePath = "apps/www/src/lib/media-delivery.ts";
  const moduleSource = readText(modulePath);
  const receipt = JSON.parse(
    readText("reports/media/cloudinary-pilot-2026-08-15.json")
  );
  const expectedAssets = [
    {
      source: "/images/field-notes/nycac-shoestring-facilitation.webp",
      file: "apps/www/public/images/field-notes/nycac-shoestring-facilitation.webp",
      publicId: "nycac-shoestring-facilitation",
      version: 1786825562,
      widths: "[480, 750, 1080, 1280, 1600, 2400]",
      quality: 'quality: "good"'
    },
    {
      source: "/artifacts/fair-rent-nyc/let-nyc-dance-public-surface.webp",
      file: "apps/www/public/artifacts/fair-rent-nyc/let-nyc-dance-public-surface.webp",
      publicId: "let-nyc-dance-public-surface",
      version: 1786825582,
      widths: "[480, 750, 1080, 1280, 1440]",
      quality: 'quality: "best"'
    }
  ];

  if (receipt.assets.length !== expectedAssets.length) {
    fail("exact-asset-binding", "The receipt must bind exactly two pilot assets.");
  }
  for (const asset of expectedAssets) {
    const item = receipt.assets.find(({ source }) => source === asset.source);
    const bytes = readFileSync(path.join(root, asset.file));
    const sha256 = createHash("sha256").update(bytes).digest("hex");
    if (
      !item ||
      item.public_id !== asset.publicId ||
      item.version !== asset.version ||
      item.bytes !== bytes.length ||
      item.sha256 !== sha256 ||
      item.remote_sha256 !== sha256 ||
      !moduleSource.includes(`publicId: "${asset.publicId}"`) ||
      !moduleSource.includes(`version: ${asset.version}`)
    ) {
      fail("exact-asset-binding", `Cloudinary binding drifted for ${asset.source}.`);
    }
    if (
      !moduleSource.includes(asset.widths) ||
      !moduleSource.includes(asset.quality)
    ) {
      fail("bounded-responsive-transforms", `Responsive policy drifted for ${asset.source}.`);
    }
  }
  if (
    !moduleSource.includes("c_limit,w_${width}") ||
    !moduleSource.includes('"f_auto"') ||
    !moduleSource.includes("q_auto:${asset.quality}") ||
    !moduleSource.includes("Math.min(")
  ) {
    fail("bounded-responsive-transforms", "Width cap, format, or quality negotiation is missing.");
  }

  const excludedTokens = [
    "/images/social/jamie-east-river-og.jpg",
    ".pdf",
    ".woff",
    ".woff2"
  ];
  if (excludedTokens.some((token) => moduleSource.includes(token))) {
    fail("local-asset-boundary", "An excluded same-origin asset entered the Cloudinary allowlist.");
  }
  const dockerfile = readText("Dockerfile");
  if (
    !dockerfile.includes("/repo/apps/www/public ./apps/www/public") ||
    !dockerfile.includes("/repo/apps/www/.next/static ./apps/www/.next/static")
  ) {
    fail("local-asset-boundary", "The standalone rollback assets are not packaged.");
  }

  const hero = readText("apps/www/src/components/Hero.tsx");
  const participation = readText("apps/www/src/components/ParticipationSequence.tsx");
  const gallery = readText("apps/www/src/components/CaseStudyBlocks.tsx");
  if (!hero.includes("preload") || /\bpriority\b/.test(hero)) {
    fail("loading-policy", "The homepage hero must use the current preload contract.");
  }
  if (
    /loading="eager"/.test(gallery) ||
    /<ResponsiveMedia[\s\S]{0,400}\bpreload(?:\s|=\{true\})/.test(participation)
  ) {
    fail("loading-policy", "A below-fold pilot or gallery image is forced eager.");
  }

  if (
    !dockerfile.includes("ARG NEXT_PUBLIC_CLOUDINARY_PILOT=disabled") ||
    !moduleSource.includes('NEXT_PUBLIC_CLOUDINARY_PILOT === "enabled"') ||
    !moduleSource.includes('mode: "local"')
  ) {
    fail("configuration-fails-local", "The pilot no longer defaults to local delivery.");
  }

  const publicRecord = [
    moduleSource,
    JSON.stringify(receipt),
    readText("docs/deployment.md")
  ].join("\n");
  if (
    receipt.authorization.authority !== "Jamie Burkart" ||
    receipt.authorization.scope !== "Two exact public portfolio derivatives only" ||
    /api[_ -]?secret\s*[:=]\s*[a-z0-9]/i.test(publicRecord)
  ) {
    fail("human-authority-and-secrets", "Authorization or credential boundary is incomplete.");
  }

  return {
    passed: failures.length === 0,
    criteria: evaluation.criteria.length,
    failures
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const result = evaluateMediaDelivery();
  if (!result.passed) {
    for (const failure of result.failures) {
      console.error(`FAIL ${failure.criterion}: ${failure.message}`);
    }
    process.exitCode = 1;
  } else {
    console.log(`PASS ${result.criteria} governed Cloudinary delivery criteria.`);
  }
}
