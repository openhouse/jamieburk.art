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
    "governed-photographic-field",
    "metadata-and-locator-safety",
    "editorial-not-decorative",
    "truthful-project-cover-field",
    "tag-navigation-contract",
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
  const sources = [...manifest.matchAll(/src: "(\/images\/field-notes\/[^"]+)"/g)].map(
    (match) => match[1]
  );
  const expectedSources = [
    "/images/field-notes/jamie-east-river.webp",
    "/images/field-notes/kc-town-hall-roof-work.webp",
    "/images/field-notes/kc-town-hall-tired-of-tires-after.webp",
    "/images/field-notes/kc-town-hall-tired-of-tires-before.webp",
    "/images/field-notes/nycac-market-hotel-banner.webp",
    "/images/field-notes/nycac-shoestring-facilitation.webp",
    "/images/field-notes/sunday-dinner-shared-map.webp"
  ];
  if (JSON.stringify(sources.sort()) !== JSON.stringify(expectedSources.sort())) {
    fail("governed-photographic-field", "The public field must contain exactly the seven reviewed photographic derivatives.");
  }

  for (const field of ["id", "width", "height", "alt", "caption", "credit", "placements", "publicationStatus", "publicUseBoundary"]) {
    const count = [...manifest.matchAll(new RegExp(`\\b${field}:`, "g"))].length;
    if (count !== 9) {
      fail("manifest-bound-publication", `Manifest field ${field} is missing from one or more photos.`);
    }
  }
  if ([...manifest.matchAll(/publicationStatus: "jamie-authorized"/g)].length !== 9) {
    fail("manifest-bound-publication", "Every photo must retain the Jamie-authorized publication status.");
  }

  const publicImageRoot = path.join(root, "apps/www/public/images/field-notes");
  const publicImages = walkFiles(publicImageRoot).sort();
  if (publicImages.length !== 7 || publicImages.some((file) => !file.endsWith(".webp"))) {
    fail("governed-photographic-field", "The field-notes directory must contain only the seven fully bound photographic WebP derivatives.");
  }
  for (const relativeImagePath of publicImages) {
    const bytes = readFileSync(path.join(publicImageRoot, relativeImagePath));
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
    readText("apps/www/src/components/ParticipationSequence.tsx"),
    readText("apps/www/src/components/ResidentServiceSequence.tsx"),
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
  if (!hero.includes("portfolioPhotos.eastRiver") || !hero.includes("fill") || /rounded|shadow/.test(hero)) {
    fail("editorial-not-decorative", "The home photograph must remain full-bleed, unframed, and manifest-bound.");
  }
  const participationSequence = readText("apps/www/src/components/ParticipationSequence.tsx");
  if (!participationSequence.includes("portfolioPhotos.nycacShoestringFacilitation") ||
      !participationSequence.includes("portfolioPhotos.nycacMarketHotelBanner") ||
      !participationSequence.includes("let-nyc-dance-public-surface.webp")) {
    fail("editorial-not-decorative", "The two participation photographs and campaign screenshot must remain composed as one Fair Rent NYC evidence sequence.");
  }
  const residentServiceSequence = readText("apps/www/src/components/ResidentServiceSequence.tsx");
  if (!residentServiceSequence.includes("portfolioPhotos.kcTownHallTiredOfTiresFlyer") ||
      !residentServiceSequence.includes("portfolioPhotos.kcTownHallTiredOfTiresBefore") ||
      !residentServiceSequence.includes("portfolioPhotos.kcTownHallTiredOfTiresAfter")) {
    fail("editorial-not-decorative", "The governed flyer and matched before-and-after field photographs must remain composed as one resident-service evidence sequence.");
  }
  if (/FieldPhoto|portfolioPhotos|\/images\/field-notes\//.test(about) ||
      /FieldPhoto|portfolioPhotos|\/images\/field-notes\//.test(colophon)) {
    fail("editorial-not-decorative", "About and Colophon must remain text-led until additional images complete exact rights and credit review.");
  }

  const workCovers = readText("apps/www/src/data/work-covers.ts");
  const workCard = readText("apps/www/src/components/WorkCard.tsx");
  const caseStudyLayout = readText("apps/www/src/components/CaseStudyLayout.tsx");
  const workIndex = readText("apps/www/src/app/work/page.tsx");
  const tagList = readText("apps/www/src/components/TagList.tsx");
  const coverCount = [...workCovers.matchAll(/^  (?:"[^"]+"|[a-z]+): \{/gm)].length;
  if (coverCount !== 6 ||
      !workCard.includes('from "next/image"') ||
      !workCard.includes("getWorkCover(item.slug)") ||
      !workCard.includes("cover.src") ||
      !workCard.includes("cover.caption") ||
      !workCard.includes("cover.credit") ||
      !caseStudyLayout.includes("getWorkCover(item.slug)") ||
      !caseStudyLayout.includes("cover.src") ||
      !caseStudyLayout.includes("cover.caption") ||
      !caseStudyLayout.includes("cover.credit")) {
    fail("truthful-project-cover-field", "All six work items and case studies must render one captioned and credited cover from the separate cover manifest.");
  }
  for (const [title, requiredCover] of [
    ["Harry J. Epstein Company", '"/artifacts/hje/public-site.png"'],
    ["NYC Artist Coalition / FairRentNYC", "portfolioPhotos.nycacMarketHotelBanner.src"],
    ["CallNYC.org", '"/artifacts/callnyc/archived-prototype.png"'],
    ["WOWList.org", '"/artifacts/wowlist/public-threshold.webp"'],
    ["196 Artists Residency / Sunday Dinner", "portfolioPhotos.sundayDinnerSharedMap.src"],
    ["KC Town Hall LLC", "portfolioPhotos.kcTownHallRoofWork.src"]
  ]) {
    const slug = {
      "Harry J. Epstein Company": '"harry-j-epstein"',
      "NYC Artist Coalition / FairRentNYC": '"fair-rent-nyc"',
      "CallNYC.org": "callnyc",
      "WOWList.org": "wowlist",
      "196 Artists Residency / Sunday Dinner": '"196-sunday-dinner"',
      "KC Town Hall LLC": '"kc-town-hall"'
    }[title];
    const slugIndex = workCovers.indexOf(`${slug}: {`);
    const coverEnd = workCovers.indexOf("},", slugIndex);
    const coverBlock = workCovers.slice(slugIndex, coverEnd);
    if (slugIndex < 0 || !coverBlock.includes(`src: ${requiredCover}`)) {
      fail("truthful-project-cover-field", `Missing project-bound cover for ${title}.`);
    }
  }

  if (!tagList.includes('from "next/link"') ||
      !tagList.includes("/work?tag=") ||
      !tagList.includes("encodeURIComponent(tag)") ||
      !workIndex.includes("selectedTag") ||
      !workIndex.includes("Clear filter") ||
      !workIndex.includes('id="work-index"')) {
    fail("tag-navigation-contract", "Tag-shaped controls must link to a visible, clearable work-index filter state.");
  }

  for (const route of [
    "apps/www/src/app/resume/page.tsx",
    "apps/www/src/app/contact/page.tsx"
  ]) {
    if (/FieldPhoto|portfolioPhotos|\/images\/field-notes\//.test(readText(route))) {
      fail("truthful-project-cover-field", `${route} received a field photograph without a new editorial decision.`);
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
