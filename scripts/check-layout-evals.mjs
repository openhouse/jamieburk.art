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

function manifestEntries(manifest) {
  const body = manifest.match(
    /export const portfolioPhotos = \{([\s\S]*?)\n\} as const satisfies/
  )?.[1];
  if (!body) return [];

  return [...body.matchAll(/^  ([A-Za-z][A-Za-z0-9]*): \{([\s\S]*?)(?=^  [A-Za-z][A-Za-z0-9]*: \{|(?![\s\S]))/gm)]
    .map(([, key, source]) => ({ key, source }));
}

export function evaluateLayout(root = defaultRoot, overrides = {}) {
  const readText = (relativePath) =>
    overrides[relativePath] ?? readFileSync(path.join(root, relativePath), "utf8");
  const failures = [];
  const fail = (criterion, message) => failures.push({ criterion, message });

  const evaluation = JSON.parse(readText("evals/layout/portfolio-photography.json"));
  const expectedCriteria = [
    "manifest-bound-publication",
    "authorized-public-field",
    "metadata-and-locator-safety",
    "editorial-not-decorative",
    "deliberate-placement",
    "public-service-folio-material-system",
    "responsive-image-contract",
    "human-authority-remains-open",
    "direction-contract-persisted"
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
  const entries = manifestEntries(manifest);
  const activeEntries = entries.filter(({ source }) =>
    source.includes('knowledgeStatus: "portfolio-authorized"')
  );
  const activeSources = activeEntries
    .map(({ source }) => source.match(/src: "(\/images\/portfolio\/[^"]+)"/)?.[1])
    .filter(Boolean)
    .sort();
  const expectedSources = [
    "/images/portfolio/callnyc-interface.webp",
    "/images/portfolio/collective-synthesis.webp",
    "/images/portfolio/fair-rent-materials.webp",
    "/images/portfolio/inventive-logistics.webp",
    "/images/portfolio/material-repair.webp",
    "/images/portfolio/public-work-conversation.webp"
  ].sort();

  if (entries.length !== 7 || activeEntries.length !== 6) {
    fail("authorized-public-field", "The manifest must retain six source-album photographs plus the superseded East River record.");
  }
  if (JSON.stringify(activeSources) !== JSON.stringify(expectedSources)) {
    fail("authorized-public-field", "The active public field must contain exactly the six reviewed source-album derivatives.");
  }

  const requiredFields = [
    "id",
    "src",
    "width",
    "height",
    "alt",
    "caption",
    "credit",
    "placementIds",
    "placements",
    "publicationStatus",
    "releaseState",
    "publicUseBoundary"
  ];
  for (const { key, source } of entries) {
    for (const field of requiredFields) {
      if (!new RegExp(`\\b${field}:`).test(source)) {
        fail("manifest-bound-publication", `${key} is missing manifest field ${field}.`);
      }
    }
    if (!source.includes('publicationStatus: "jamie-authorized"')) {
      fail("manifest-bound-publication", `${key} lost Jamie's publication authorization.`);
    }
  }
  for (const { key, source } of activeEntries) {
    for (const gate of ["publicGit", "staging", "production", "indexing"]) {
      if (!new RegExp(`${gate}: "approved"`).test(source)) {
        fail("manifest-bound-publication", `${key} does not preserve the approved ${gate} release state.`);
      }
    }
    if (!source.includes("publicUseBoundary: sourceAlbumBoundary")) {
      fail("manifest-bound-publication", `${key} lost the source-album represented-person permission boundary.`);
    }
  }
  if (!/sourceAlbumBoundary[\s\S]*represented-person permission/i.test(manifest)) {
    fail("manifest-bound-publication", "The shared source-album represented-person permission boundary is missing.");
  }

  const portfolioImageRoot = path.join(root, "apps/www/public/images/portfolio");
  const portfolioImages = walkFiles(portfolioImageRoot).sort();
  const expectedPublicFiles = expectedSources.map((source) => path.basename(source)).sort();
  if (JSON.stringify(portfolioImages) !== JSON.stringify(expectedPublicFiles)) {
    fail("authorized-public-field", "The portfolio image directory must contain only the six reviewed WebP derivatives.");
  }
  const publicImageFiles = [
    ...portfolioImages.map((relativePath) => path.join(portfolioImageRoot, relativePath)),
    ...walkFiles(path.join(root, "apps/www/public/images/field-notes"))
      .map((relativePath) => path.join(root, "apps/www/public/images/field-notes", relativePath))
  ];
  for (const imagePath of publicImageFiles) {
    const bytes = readFileSync(imagePath);
    const binary = bytes.toString("latin1");
    if (/EXIF|Exif|GPSLatitude|GPSLongitude|<x:xmpmeta/i.test(binary)) {
      fail("metadata-and-locator-safety", `${path.basename(imagePath)} contains embedded metadata.`);
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
    readText("apps/www/src/app/page.tsx"),
    readText("apps/www/src/components/CaseStudyLayout.tsx")
  ].join("\n");
  if (/[0-9A-F]{8}(?:-[0-9A-F]{4}){3}-[0-9A-F]{12}/i.test(photographySurface)) {
    fail("metadata-and-locator-safety", "A private archive UUID appears in public application source.");
  }
  if (/\/Volumes\/|\/Users\/|IMG_[0-9]{4}|_L0_001/i.test(appSource)) {
    fail("metadata-and-locator-safety", "A protected path or original archive filename appears in public application source.");
  }

  const hero = readText("apps/www/src/components/Hero.tsx");
  const home = readText("apps/www/src/app/page.tsx");
  const caseLayout = readText("apps/www/src/components/CaseStudyLayout.tsx");
  if (
    !hero.includes("portfolioPhotos.publicWorkConversation") ||
    !hero.includes("jb-product-hero-grid") ||
    !hero.includes("Product leadership for public-facing systems") ||
    /\bfill\b|rounded|shadow/.test(hero)
  ) {
    fail("editorial-not-decorative", "The first surface must remain a specific split product folio with its manifest-bound working-session photograph.");
  }
  for (const key of ["collectiveSynthesis", "callNycInterface", "fairRentMaterials", "materialRepair", "inventiveLogistics"]) {
    if (!home.includes(`portfolioPhotos.${key}`)) {
      fail("editorial-not-decorative", `The composed home folio lost the ${key} evidence photograph.`);
    }
  }
  if (!caseLayout.includes("portfolioPhotos.fairRentMaterials") || !caseLayout.includes("portfolioPhotos.callNycInterface")) {
    fail("editorial-not-decorative", "The two route-specific documentary photographs lost their case-study placements.");
  }

  for (const route of [
    "apps/www/src/app/work/page.tsx",
    "apps/www/src/app/resume/page.tsx",
    "apps/www/src/app/contact/page.tsx",
    "apps/www/src/app/about/page.tsx",
    "apps/www/src/app/colophon/page.tsx"
  ]) {
    if (/FieldPhoto|portfolioPhotos|\/images\/(?:field-notes|portfolio)\//.test(readText(route))) {
      fail("deliberate-placement", `${route} received a photograph without a governed occurrence decision.`);
    }
  }

  const globalCss = readText("apps/www/src/app/globals.css");
  if (
    !globalCss.includes('themes: public-service-folio --default') ||
    !globalCss.includes("--color-primary: #0e62a3") ||
    !globalCss.includes("var(--font-oswald)")
  ) {
    fail("public-service-folio-material-system", "The Public Service Briefing Folio theme, Broadway blue, or display type is not active.");
  }
  if (/linear-gradient|radial-gradient|conic-gradient|\borb\b|bokeh/i.test(globalCss)) {
    fail("public-service-folio-material-system", "A prohibited gradient, orb, or bokeh treatment appears in global CSS.");
  }

  const fieldPhoto = readText("apps/www/src/components/FieldPhoto.tsx");
  if (
    !fieldPhoto.includes('from "next/image"') ||
    !fieldPhoto.includes("sizes={sizes}") ||
    !fieldPhoto.includes("photo.alt") ||
    !fieldPhoto.includes("height={photo.height}") ||
    !fieldPhoto.includes("width={photo.width}")
  ) {
    fail("responsive-image-contract", "Field photos must retain Next Image, responsive sizes, manifest alt text, and explicit dimensions.");
  }
  if (!globalCss.includes("100svh")) {
    fail("responsive-image-contract", "The stable viewport-bounded hero contract is incomplete.");
  }

  const design = readText("DESIGN.md");
  if (
    !/automated evaluation[\s\S]*not publication permission/i.test(design) ||
    !/Jamie remains the publication and indexing\s+decision owner/i.test(design)
  ) {
    fail("human-authority-remains-open", "Design documentation must preserve human rights, publication, and indexing gates.");
  }

  const rootLayout = readText("apps/www/src/app/layout.tsx");
  const contract = {
    seed: "603b707c",
    world: "public-service-briefing-folio",
    mechanism: "complex-public-work-to-traceable-decisions-and-usable-systems",
    firstSurface: "product-ownership-public-service-judgment-shipping-fluency",
    signature: "evidence-rail-and-documentary-folio-field",
    craftFloor: "no-eyebrows-card-grids-gradients-fake-technical-chrome-or-decorative-metrics"
  };
  for (const [field, value] of Object.entries(contract)) {
    if (!rootLayout.includes(`${field}: "${value}"`) || !rootLayout.includes(`data-form-${field.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}`)) {
      fail("direction-contract-persisted", `The emitted FORM ${field} contract is missing or has drifted.`);
    }
  }
  if (!design.includes('form_seed: "603b707c"') || !design.includes("## FORM direction contract")) {
    fail("direction-contract-persisted", "DESIGN.md does not corroborate the emitted FORM seed and five-block contract.");
  }

  return {
    passed: failures.length === 0,
    failures,
    criteriaCount: evaluation.criteria.length,
    photoCount: activeSources.length
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
  console.log(`Layout evals passed: ${result.criteriaCount} blocking criteria; ${result.photoCount} authorized folio photographs.`);
}
