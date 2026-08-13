import { readFileSync, readdirSync, statSync } from "node:fs";
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

export function evaluateLayout(root = defaultRoot, overrides = {}) {
  const readText = (relativePath) =>
    overrides[relativePath] ?? readFileSync(path.join(root, relativePath), "utf8");
  const failures = [];
  const fail = (criterion, message) => failures.push({ criterion, message });

  const evaluation = JSON.parse(readText("evals/layout/portfolio-photography.json"));
  const expectedCriteria = [
    "manifest-bound-publication",
    "authorized-employment-field",
    "metadata-and-locator-safety",
    "editorial-not-decorative",
    "deliberate-absence",
    "human-index-material-system",
    "responsive-image-contract",
    "human-authority-remains-open"
  ];
  const observedCriteria = evaluation.criteria.map(({ id }) => id);
  if (JSON.stringify(observedCriteria) !== JSON.stringify(expectedCriteria)) {
    fail("eval-contract", "The blocking layout criteria changed or lost their stable order.");
  }
  if (evaluation.criteria.some(({ blocking }) => blocking !== true)) {
    fail("eval-contract", "Every declared layout criterion must remain blocking.");
  }

  const manifestPath = "apps/www/src/data/photography.ts";
  const manifest = readText(manifestPath);
  const sources = [...manifest.matchAll(/src: "(\/images\/(?:field-notes|product-practice)\/[^\"]+)"/g)].map(
    (match) => match[1]
  );
  const expectedSources = [
    "/images/field-notes/jamie-east-river.webp",
    "/images/product-practice/bicycle-canoe-system.webp",
    "/images/product-practice/civic-field-exchange.webp",
    "/images/product-practice/civic-interface.webp",
    "/images/product-practice/collective-synthesis.webp",
    "/images/product-practice/maintenance-in-practice.webp",
    "/images/product-practice/public-information-materials.webp"
  ];
  if (JSON.stringify(sources.sort()) !== JSON.stringify(expectedSources.sort())) {
    fail("authorized-employment-field", "The public field must contain exactly the seven reviewed derivatives.");
  }

  for (const field of ["id", "width", "height", "alt", "caption", "credit", "placements", "publicationStatus", "publicUseBoundary"]) {
    const count = [...manifest.matchAll(new RegExp(`\\b${field}:`, "g"))].length;
    if (count !== expectedSources.length + 1) {
      fail("manifest-bound-publication", `Manifest field ${field} is missing from one or more photos.`);
    }
  }
  if ([...manifest.matchAll(/publicationStatus: "jamie-authorized",/g)].length !== expectedSources.length) {
    fail("manifest-bound-publication", "Every photo must retain the Jamie-authorized publication status.");
  }

  const publicImageRoots = [
    path.join(root, "apps/www/public/images/field-notes"),
    path.join(root, "apps/www/public/images/product-practice")
  ];
  const publicImages = publicImageRoots.flatMap((imageRoot) =>
    walkFiles(imageRoot).map((file) => ({ imageRoot, file }))
  );
  if (publicImages.length !== expectedSources.length || publicImages.some(({ file }) => !file.endsWith(".webp"))) {
    fail("authorized-employment-field", "The public image directories must contain only the seven bound WebP derivatives.");
  }
  for (const { imageRoot, file: relativeImagePath } of publicImages) {
    const bytes = readFileSync(path.join(imageRoot, relativeImagePath));
    const binary = bytes.toString("latin1");
    if (/EXIF|Exif|GPSLatitude|GPSLongitude|<x:xmpmeta/i.test(binary)) {
      fail("metadata-and-locator-safety", `${relativeImagePath} contains embedded metadata.`);
    }
  }

  const sourceFiles = walkFiles(path.join(root, "apps/www/src"));
  const appSource = sourceFiles
    .map((relativePath) => readText(path.join("apps/www/src", relativePath)))
    .join("\n");
  const photographySurface = [
    manifest,
    readText("apps/www/src/components/FieldPhoto.tsx"),
    readText("apps/www/src/components/Hero.tsx"),
    readText("apps/www/src/app/about/page.tsx"),
    readText("apps/www/src/app/colophon/page.tsx")
  ].join("\n");
  if (/[0-9A-F]{8}(?:-[0-9A-F]{4}){3}-[0-9A-F]{12}/i.test(photographySurface)) {
    fail("metadata-and-locator-safety", "A private archive UUID appears in public application source.");
  }
  if (/\/Volumes\/|\/Users\/|IMG_[0-9]{4}|_L0_001/i.test(appSource)) {
    fail("metadata-and-locator-safety", "A protected path or original archive filename appears in public application source.");
  }

  const hero = readText("apps/www/src/components/Hero.tsx");
  const about = readText("apps/www/src/app/about/page.tsx");
  const colophon = readText("apps/www/src/app/colophon/page.tsx");
  if (!hero.includes("portfolioPhotos.civicFieldExchange") || !hero.includes("fill") || /rounded|shadow/.test(hero)) {
    fail("editorial-not-decorative", "The home photograph must remain full-bleed, unframed, and manifest-bound.");
  }
  if (/FieldPhoto|portfolioPhotos|\/images\/(?:field-notes|product-practice)\//.test(about) ||
      /FieldPhoto|portfolioPhotos|\/images\/(?:field-notes|product-practice)\//.test(colophon)) {
    fail("editorial-not-decorative", "About and Colophon must remain text-led.");
  }

  for (const route of [
    "apps/www/src/app/work/page.tsx",
    "apps/www/src/app/resume/page.tsx",
    "apps/www/src/app/contact/page.tsx"
  ]) {
    if (/FieldPhoto|portfolioPhotos|\/images\/(?:field-notes|product-practice)\//.test(readText(route))) {
      fail("deliberate-absence", `${route} received a field photograph without a new editorial decision.`);
    }
  }

  const globalCss = readText("apps/www/src/app/globals.css");
  if (!globalCss.includes('themes: human-index --default') || !globalCss.includes("--color-primary: #2f6f89")) {
    fail("human-index-material-system", "The Human Index theme is not active with work-jacket blue.");
  }
  if (/linear-gradient|radial-gradient|conic-gradient|\borb\b|bokeh/i.test(globalCss)) {
    fail("human-index-material-system", "A prohibited gradient, orb, or bokeh treatment appears in global CSS.");
  }
  const fieldPhoto = readText("apps/www/src/components/FieldPhoto.tsx");
  if (!fieldPhoto.includes('from "next/image"') || !fieldPhoto.includes("sizes={sizes}") || !fieldPhoto.includes("photo.alt")) {
    fail("responsive-image-contract", "Field photos must retain Next Image, responsive sizes, and manifest alt text.");
  }
  if (!globalCss.includes("100svh")) {
    fail("responsive-image-contract", "The stable viewport-bounded hero contract is incomplete.");
  }

  const design = readText("DESIGN.md");
  if (!/automated score[s]? never confer publication permission/i.test(design) || !/staging review does not make production indexable/i.test(design)) {
    fail("human-authority-remains-open", "Design documentation must preserve human rights and production gates.");
  }

  return {
    passed: failures.length === 0,
    failures,
    criteriaCount: evaluation.criteria.length,
    photoCount: sources.length
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const result = evaluateLayout();
  if (!result.passed) {
    for (const failure of result.failures) {
      console.error(`FAIL ${failure.criterion}: ${failure.message}`);
    }
    process.exit(1);
  }
  console.log(`Layout evals passed: ${result.criteriaCount} blocking criteria; ${result.photoCount} manifest-bound photographs.`);
}
