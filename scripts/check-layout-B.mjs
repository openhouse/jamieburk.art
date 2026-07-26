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

function readWebpDimensions(bytes) {
  const marker = Buffer.from([0x9d, 0x01, 0x2a]);
  const markerIndex = bytes.indexOf(marker);
  if (markerIndex < 0 || markerIndex + 7 > bytes.length) return null;
  return {
    width: bytes.readUInt16LE(markerIndex + 3) & 0x3fff,
    height: bytes.readUInt16LE(markerIndex + 5) & 0x3fff
  };
}

export function evaluateLayoutB(root = defaultRoot, overrides = {}) {
  const readText = (relativePath) =>
    overrides[relativePath] ?? readFileSync(path.join(root, relativePath), "utf8");
  const failures = [];
  const fail = (criterion, message) => failures.push({ criterion, message });

  const evaluation = JSON.parse(readText("evals/layout/layout-B.json"));
  const expectedCriteria = [
    "manifest-bound-field",
    "metadata-and-locator-safety",
    "person-practice-consequence",
    "hiring-reader-burden",
    "editorial-integration",
    "human-index-material-system",
    "responsive-accessible-images",
    "work-index-not-card-grid",
    "human-authority-open"
  ];
  if (
    JSON.stringify(evaluation.criteria.map(({ id }) => id)) !==
    JSON.stringify(expectedCriteria)
  ) {
    fail("eval-contract", "The blocking criteria changed or lost their stable order.");
  }
  if (
    evaluation.criteria.some(({ blocking }) => blocking !== true) ||
    evaluation.human_review.length < 5
  ) {
    fail("eval-contract", "Blocking criteria or the human review gate are incomplete.");
  }

  const manifestPath = "apps/www/src/data/photography.ts";
  const manifest = readText(manifestPath);
  const photoRecords = manifest.slice(manifest.indexOf("export const portfolioPhotos"));
  const manifestEntries = [
    ...manifest.matchAll(
      /src: "(\/images\/field-notes\/[^"]+)",\s+width: (\d+),\s+height: (\d+)/g
    )
  ].map((match) => ({
    src: match[1],
    width: Number(match[2]),
    height: Number(match[3])
  }));
  const expectedSources = [
    "/images/field-notes/jamie-east-river.webp",
    "/images/field-notes/kc-town-hall-before.webp",
    "/images/field-notes/paper-trimming.webp",
    "/images/field-notes/printed-editions.webp",
    "/images/field-notes/raft-riverboat.webp",
    "/images/field-notes/tired-of-tires-load.webp"
  ].sort();

  if (
    manifestEntries.length !== 6 ||
    JSON.stringify(manifestEntries.map(({ src }) => src).sort()) !==
      JSON.stringify(expectedSources)
  ) {
    fail("manifest-bound-field", "The public field must contain exactly the six reviewed derivatives.");
  }
  for (const requiredValue of [
    'publicationStatus: "jamie-authorized-working-review"',
    'productionApproval: "open"',
    "subjectExposure:",
    "publicUseBoundary:"
  ]) {
    const count = photoRecords.split(requiredValue).length - 1;
    if (count !== 6) {
      fail("manifest-bound-field", `${requiredValue} must appear once for every photograph.`);
    }
  }
  for (const requiredField of ["alt:", "caption:", "credit:", "placements:"]) {
    const count = photoRecords.split(requiredField).length - 1;
    if (count < 6) {
      fail("manifest-bound-field", `${requiredField} is missing from one or more photographs.`);
    }
  }
  if (
    !manifest.includes('subjectExposure: "self-only"') ||
    (manifest.match(/subjectExposure: "no-identifiable-people"/g) ?? []).length !== 4 ||
    (manifest.match(/subjectExposure: "hands-only"/g) ?? []).length !== 1
  ) {
    fail("person-practice-consequence", "The low-exposure subject contract changed.");
  }

  const publicImageRoot = path.join(root, "apps/www/public/images/field-notes");
  const publicImages = walkFiles(publicImageRoot).sort();
  if (
    publicImages.length !== 6 ||
    publicImages.some((file) => !file.endsWith(".webp")) ||
    JSON.stringify(publicImages.map((file) => `/images/field-notes/${file}`).sort()) !==
      JSON.stringify(expectedSources)
  ) {
    fail("manifest-bound-field", "The public directory must contain only the six registered WebP files.");
  }
  for (const relativeImagePath of publicImages) {
    const bytes = readFileSync(path.join(publicImageRoot, relativeImagePath));
    const binary = bytes.toString("latin1");
    if (/EXIF|Exif|GPSLatitude|GPSLongitude|<x:xmpmeta|Photoshop 3\.0/i.test(binary)) {
      fail("metadata-and-locator-safety", `${relativeImagePath} contains embedded metadata.`);
    }
    const dimensions = readWebpDimensions(bytes);
    const registered = manifestEntries.find(({ src }) =>
      src.endsWith(`/${relativeImagePath}`)
    );
    if (
      !dimensions ||
      !registered ||
      dimensions.width !== registered.width ||
      dimensions.height !== registered.height
    ) {
      fail("manifest-bound-field", `${relativeImagePath} dimensions do not match the manifest.`);
    }
  }

  const sourceFiles = walkFiles(path.join(root, "apps/www/src"));
  const appSource = sourceFiles
    .map((relativePath) => readText(path.join("apps/www/src", relativePath)))
    .join("\n");
  const publicDesignSurface = [
    manifest,
    readText("apps/www/src/components/FieldPhoto.tsx"),
    readText("apps/www/src/components/Hero.tsx"),
    readText("apps/www/src/components/WorkCard.tsx"),
    readText("apps/www/src/components/CaseStudyLayout.tsx"),
    readText("apps/www/src/app/page.tsx"),
    readText("apps/www/src/app/about/page.tsx"),
    readText("apps/www/src/app/colophon/page.tsx"),
    readText("apps/www/src/app/work/technical-operations/page.tsx"),
    readText("DESIGN.md"),
    readText("docs/design/layout-B-photography-integration.md")
  ].join("\n");
  if (/[0-9A-F]{8}(?:-[0-9A-F]{4}){3}-[0-9A-F]{12}/i.test(publicDesignSurface)) {
    fail("metadata-and-locator-safety", "A private archive UUID appears in the public design surface.");
  }
  if (/\/Volumes\/|\/Users\/|IMG_[0-9]{4}|_L0_001/i.test(publicDesignSurface)) {
    fail("metadata-and-locator-safety", "A protected path or original archive filename appears publicly.");
  }

  const hero = readText("apps/www/src/components/Hero.tsx");
  if (
    !hero.includes("portfolioPhotos.eastRiver") ||
    !hero.includes("Jamie Burkart") ||
    !hero.includes("Technical Project Manager") ||
    !hero.includes('href="/work"') ||
    !hero.includes('href="/resume"') ||
    !hero.includes("fill") ||
    /rounded|shadow/.test(hero)
  ) {
    fail("hiring-reader-burden", "The full-bleed hiring hero contract is incomplete.");
  }

  const home = readText("apps/www/src/app/page.tsx");
  const about = readText("apps/www/src/app/about/page.tsx");
  const technicalOperations = readText(
    "apps/www/src/app/work/technical-operations/page.tsx"
  );
  const caseStudy = readText("apps/www/src/components/CaseStudyLayout.tsx");
  const colophon = readText("apps/www/src/app/colophon/page.tsx");
  const placementChecks = [
    [home, "portfolioPhotos.kcTownHallBefore", "Home is missing place photography."],
    [home, "portfolioPhotos.tiredOfTiresLoad", "Home is missing service photography."],
    [home, "portfolioPhotos.paperTrimming", "Home is missing material-practice photography."],
    [about, "portfolioPhotos.raftRiverboat", "About is missing the waterways practice image."],
    [
      technicalOperations,
      "portfolioPhotos.paperTrimming",
      "Technical Operations is missing embodied implementation."
    ],
    [caseStudy, 'item.slug === "kc-town-hall"', "KC Town Hall lacks its route-specific sequence."],
    [caseStudy, "portfolioPhotos.tiredOfTiresLoad", "KC Town Hall lacks adjacent field practice."],
    [colophon, "portfolioPhotos.paperTrimming", "Colophon is missing handwork."],
    [colophon, "portfolioPhotos.printedEditions", "Colophon is missing finished matter."]
  ];
  for (const [surface, expected, message] of placementChecks) {
    if (!surface.includes(expected)) fail("editorial-integration", message);
  }

  const globalCss = readText("apps/www/src/app/globals.css");
  const rootLayout = readText("apps/www/src/app/layout.tsx");
  for (const token of [
    "--color-primary: #2f6f89",
    "--color-secondary: #4e6f61",
    "--color-accent: #c83b32",
    "--color-neutral: #222b36",
    "--color-base-100: #ffffff"
  ]) {
    if (!globalCss.includes(token)) {
      fail("human-index-material-system", `Missing Human Index token: ${token}.`);
    }
  }
  if (
    !globalCss.includes("themes: human-index --default") ||
    !rootLayout.includes('data-theme="human-index"')
  ) {
    fail("human-index-material-system", "The Human Index theme is not active at the root.");
  }
  if (/linear-gradient|radial-gradient|conic-gradient|\borb\b|bokeh/i.test(globalCss)) {
    fail("human-index-material-system", "A prohibited gradient, orb, or bokeh treatment appears.");
  }
  if (/rounded-(?:xl|2xl|3xl)/.test(appSource)) {
    fail("human-index-material-system", "An oversized radius remains in application source.");
  }

  const fieldPhoto = readText("apps/www/src/components/FieldPhoto.tsx");
  if (
    !fieldPhoto.includes('from "next/image"') ||
    !fieldPhoto.includes("sizes={sizes}") ||
    !fieldPhoto.includes("photo.alt") ||
    !fieldPhoto.includes("photo.caption")
  ) {
    fail("responsive-accessible-images", "FieldPhoto lost responsive image, alt, or caption binding.");
  }
  if (
    !globalCss.includes("100svh") ||
    !globalCss.includes("@media (prefers-reduced-motion: reduce)") ||
    !home.includes("aspect-[16/9]") ||
    !colophon.includes("aspect-[4/3]")
  ) {
    fail("responsive-accessible-images", "Stable responsive or reduced-motion contracts are incomplete.");
  }

  const workCard = readText("apps/www/src/components/WorkCard.tsx");
  const workIndex = readText("apps/www/src/app/work/page.tsx");
  if (
    !workCard.includes("jb-work-row") ||
    workCard.includes("shadow-sm") ||
    !workIndex.includes("<WorkCard") ||
    /grid gap-5 lg:grid-cols-2/.test(workIndex)
  ) {
    fail("work-index-not-card-grid", "The paced work-row composition regressed to a card grid.");
  }

  const design = readText("DESIGN.md");
  const integration = readText("docs/design/layout-B-photography-integration.md");
  if (
    !/never confers?\s+production publication permission/i.test(design) ||
    !/final selection, captions, photographer credits, rights, consent/i.test(integration) ||
    !/public pull-request review/i.test(integration)
  ) {
    fail("human-authority-open", "Human publication and rights gates are not explicit.");
  }

  return {
    passed: failures.length === 0,
    failures,
    criteriaCount: evaluation.criteria.length,
    photoCount: manifestEntries.length,
    humanReviewCount: evaluation.human_review.length
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const result = evaluateLayoutB();
  if (!result.passed) {
    for (const failure of result.failures) {
      console.error(`FAIL ${failure.criterion}: ${failure.message}`);
    }
    process.exit(1);
  }
  console.log(
    `Layout B evals passed: ${result.criteriaCount} blocking criteria, ${result.photoCount} photographs, ${result.humanReviewCount} open human questions.`
  );
}
