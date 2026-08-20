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
    "public-project-credit-policy",
    "governed-photographic-field",
    "metadata-and-locator-safety",
    "editorial-not-decorative",
    "truthful-project-cover-field",
    "tag-navigation-contract",
    "human-index-material-system",
    "responsive-image-contract",
    "reliable-image-delivery",
    "human-authority-remains-open"
  ];
  const observedCriteria = evaluation.criteria.map(({ id }) => id);
  if (JSON.stringify(observedCriteria) !== JSON.stringify(expectedCriteria)) {
    fail("eval-contract", "The blocking layout criteria changed or lost their stable order.");
  }
  if (evaluation.criteria.some(({ blocking }) => blocking !== true)) {
    fail("eval-contract", "Every declared layout criterion must remain blocking.");
  }

  const photographyPath = "apps/www/src/data/photography.ts";
  const participationPath = "apps/www/src/data/participationMedia.ts";
  const photography = readText(photographyPath);
  const participation = readText(participationPath);
  const photographySurface = [photography, participation].join("\n");
  const expectedPhotoBindings = [
    [photography, "eastRiver", "/images/field-notes/jamie-east-river.webp"],
    [photography, "sundayDinnerSharedMap", "/images/field-notes/sunday-dinner-shared-map.webp"],
    [photography, "kcTownHallRoofWork", "/images/field-notes/kc-town-hall-roof-work.webp"],
    [participation, "shoestringFacilitation", "/images/participation/shoestring-facilitation.webp"],
    [participation, "marketHotelTownHall", "/images/participation/save-nyc-spaces-market-hotel.webp"]
  ];
  for (const [source, key, asset] of expectedPhotoBindings) {
    const start = source.indexOf(`${key}: {`);
    const end = source.indexOf("\n  },", start);
    const block = source.slice(start, end);
    if (start < 0 || !block.includes(`src: "${asset}"`) ||
        !block.includes("width:") || !block.includes("height:") ||
        !block.includes("alt:") || !block.includes("caption:") ||
        !block.includes("credit:") || !block.includes('publicationStatus: "jamie-authorized"') ||
        !block.includes("publicUseBoundary:") && source === photography ||
        !block.includes("permissionId:") && source === participation) {
      fail("manifest-bound-publication", `Incomplete governed photo binding for ${key}.`);
    }
  }

  const expectedPublicCredits = [
    [photography, "eastRiver", "Photograph by Elana Gordon. From Jamie Burkart's photo archive."],
    [photography, "sundayDinnerSharedMap", "Photo courtesy of Sunday Dinner NYC."],
    [photography, "kcTownHallRoofWork", "Photo courtesy of KC Town Hall."],
    [participation, "shoestringFacilitation", "Photo courtesy of NYC Artist Coalition."],
    [participation, "marketHotelTownHall", "Photo courtesy of NYC Artist Coalition."]
  ];
  for (const [source, key, credit] of expectedPublicCredits) {
    const start = source.indexOf(`${key}: {`);
    const end = source.indexOf("\n  },", start);
    const block = source.slice(start, end);
    if (start < 0 || !block.includes(`credit: "${credit}"`)) {
      fail("public-project-credit-policy", `Public photo credit drifted for ${key}.`);
    }
  }
  if (/Paul Mossine|photographer not identified|individual photographer not recorded|retained export/i.test(photographySurface)) {
    fail(
      "public-project-credit-policy",
      "Visitor-facing photo data contains an unsupported individual credit or archive-processing commentary."
    );
  }

  const governedAssetRoots = [
    "apps/www/public/images/field-notes",
    "apps/www/public/images/participation"
  ];
  const expectedAssetCounts = new Map([
    ["apps/www/public/images/field-notes", 3],
    ["apps/www/public/images/participation", 2]
  ]);
  for (const relativeRoot of governedAssetRoots) {
    const files = walkFiles(path.join(root, relativeRoot)).sort();
    if (files.length !== expectedAssetCounts.get(relativeRoot) || files.some((file) => !file.endsWith(".webp"))) {
      fail("governed-photographic-field", `${relativeRoot} does not contain the exact reviewed WebP set.`);
    }
    for (const relativeImagePath of files) {
      const bytes = readFileSync(path.join(root, relativeRoot, relativeImagePath));
      const binary = bytes.toString("latin1");
      if (/EXIF|Exif|GPSLatitude|GPSLongitude|<x:xmpmeta/i.test(binary)) {
        fail("metadata-and-locator-safety", `${relativeImagePath} contains embedded metadata.`);
      }
    }
  }

  const sourceFiles = walkFiles(path.join(root, "apps/www/src"));
  const appSource = sourceFiles
    .map((relativePath) => readText(path.join("apps/www/src", relativePath)))
    .join("\n");
  if (/[0-9A-F]{8}(?:-[0-9A-F]{4}){3}-[0-9A-F]{12}/i.test(photographySurface)) {
    fail("metadata-and-locator-safety", "A private archive UUID appears in public photography data.");
  }
  if (/\/Volumes\/|\/Users\/|IMG_[0-9]{4}|_L0_001|People tags|GPSLatitude/i.test(appSource)) {
    fail("metadata-and-locator-safety", "A protected path, filename, or archive metadata label appears in public source.");
  }

  const hero = readText("apps/www/src/components/Hero.tsx");
  const participationSystem = readText("apps/www/src/components/ParticipationSystem.tsx");
  const about = readText("apps/www/src/app/about/page.tsx");
  const colophon = readText("apps/www/src/app/colophon/page.tsx");
  if (!hero.includes("portfolioPhotos.eastRiver") || !hero.includes("fill") || /rounded|shadow/.test(hero)) {
    fail("editorial-not-decorative", "The homepage photograph must remain full-bleed, unframed, and unchanged.");
  }
  if (!participationSystem.includes("participationMedia.shoestringFacilitation") ||
      !participationSystem.includes("participationMedia.letNycDanceSurface") ||
      !participationSystem.includes("participationMedia.marketHotelTownHall")) {
    fail("editorial-not-decorative", "The Fair Rent participation sequence lost one of its three governed evidence roles.");
  }
  if (/FieldPhoto|portfolioPhotos|\/images\/field-notes\//.test(about) ||
      /FieldPhoto|portfolioPhotos|\/images\/field-notes\//.test(colophon)) {
    fail("editorial-not-decorative", "About and Colophon must remain text-led without a separate editorial decision.");
  }

  const workCovers = readText("apps/www/src/data/work-covers.ts");
  const workCard = readText("apps/www/src/components/WorkCard.tsx");
  const caseStudyLayout = readText("apps/www/src/components/CaseStudyLayout.tsx");
  const workIndex = readText("apps/www/src/app/work/page.tsx");
  const tagList = readText("apps/www/src/components/TagList.tsx");
  const expectedCovers = [
    ['"harry-j-epstein"', '"/artifacts/hje/public-site.png"'],
    ['"fair-rent-nyc"', "participationMedia.marketHotelTownHall.src"],
    ["callnyc", '"/artifacts/callnyc/archived-prototype.png"'],
    ["wowlist", '"/artifacts/wowlist/public-threshold.webp"'],
    ['"196-sunday-dinner"', "portfolioPhotos.sundayDinnerSharedMap.src"],
    ['"kc-town-hall"', "portfolioPhotos.kcTownHallRoofWork.src"]
  ];
  for (const [slug, source] of expectedCovers) {
    const start = workCovers.indexOf(`${slug}: {`);
    const end = workCovers.indexOf("\n  },", start);
    const block = workCovers.slice(start, end);
    if (start < 0 || !block.includes(`src: ${source}`)) {
      fail("truthful-project-cover-field", `Missing project-bound cover for ${slug}.`);
    }
  }
  if (!workCard.includes('from "@/components/MediaImage"') || !workCard.includes("getWorkCover(item.slug)") ||
      !workCard.includes("cover.caption") || !workCard.includes("cover.credit") ||
      !caseStudyLayout.includes("getWorkCover(item.slug)") ||
      !caseStudyLayout.includes("cover.caption") || !caseStudyLayout.includes("cover.credit")) {
    fail("truthful-project-cover-field", "Work cards and case-study openings must render captioned covers from the cover manifest.");
  }

  if (!tagList.includes('from "next/link"') || !tagList.includes("/work?tag=") ||
      !tagList.includes("encodeURIComponent(tag)") || !workIndex.includes("selectedTag") ||
      !workIndex.includes("Clear filter") || !workIndex.includes('id="work-index"')) {
    fail("tag-navigation-contract", "Tag-shaped controls must link to a visible, clearable work-index filter state.");
  }

  const globalCss = readText("apps/www/src/app/globals.css");
  if (!globalCss.includes("themes: human-index --default") || !globalCss.includes("--color-primary: #2f6f89")) {
    fail("human-index-material-system", "The Human Index theme is not active with work-jacket blue.");
  }
  if (/linear-gradient|radial-gradient|conic-gradient|\borb\b|bokeh/i.test(globalCss)) {
    fail("human-index-material-system", "A prohibited gradient, orb, or bokeh treatment appears in global CSS.");
  }
  if (!workCard.includes("sizes=") || !workCard.includes('loading={eager ? "eager" : "lazy"}') ||
      !caseStudyLayout.includes("sizes=") || !caseStudyLayout.includes('loading="eager"') ||
      !globalCss.includes("100svh")) {
    fail("responsive-image-contract", "The responsive cover or viewport-bounded hero contract is incomplete.");
  }

  const nextConfig = readText("apps/www/next.config.ts");
  const mediaImage = readText("apps/www/src/components/MediaImage.tsx");
  if (!/images\s*:\s*\{[\s\S]*?loaderFile\s*:\s*"\.\/src\/lib\/cloudinary-image-loader\.ts"[\s\S]*?\}/.test(nextConfig) ||
      !mediaImage.includes("unoptimized={!useCloudinary}") ||
      !mediaImage.includes('NEXT_PUBLIC_MEDIA_DELIVERY === "cloudinary"')) {
    fail(
      "reliable-image-delivery",
      "Reviewed local derivatives need direct fallback while Cloudinary handles responsive transforms away from Dokku."
    );
  }
  const directlyDeliveredImages = [
    "apps/www/public/images",
    "apps/www/public/artifacts"
  ].flatMap((relativeRoot) =>
    walkFiles(path.join(root, relativeRoot)).map((relativePath) =>
      path.join(relativeRoot, relativePath)
    )
  ).filter((relativePath) => /\.(?:avif|jpe?g|png|webp)$/i.test(relativePath));
  const oversizedImage = directlyDeliveredImages.find(
    (relativePath) => statSync(path.join(root, relativePath)).size > 512 * 1024
  );
  if (oversizedImage) {
    fail(
      "reliable-image-delivery",
      `${oversizedImage} exceeds the 512 KiB direct-delivery budget.`
    );
  }

  const design = readText("DESIGN.md");
  const permission = readText("docs/knowledge-bank/sources/permissions/jamie-portfolio-album-2026-08-13.md");
  if (!/automated score[s]? never confer publication permission/i.test(design) ||
      !/staging review does not make production indexable/i.test(design) ||
      !/production publication and indexing await approval/i.test(permission)) {
    fail("human-authority-remains-open", "Human rights, exact-candidate production, and indexing gates must remain explicit.");
  }

  return {
    passed: failures.length === 0,
    failures,
    criteriaCount: evaluation.criteria.length,
    photoCount: expectedPhotoBindings.length,
    coverCount: expectedCovers.length
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
  console.log(`Layout evals passed: ${result.criteriaCount} blocking criteria; ${result.photoCount} photographs; ${result.coverCount} project covers.`);
}
