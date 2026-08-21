import { createHash } from "node:crypto";
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
    "knowledge-wiki-photographic-metaphor",
    "truthful-project-cover-field",
    "hiring-argument-project-sequence",
    "hiring-reader-attention-budget",
    "truthful-photo-credit",
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
    "/images/field-notes/coalition-facilitation-shoestring.webp",
    "/images/field-notes/jamie-east-river.webp",
    "/images/field-notes/kc-town-hall-roof-work.webp",
    "/images/field-notes/knowledge-wiki-collective-synthesis.webp",
    "/images/field-notes/save-nyc-spaces-town-hall.webp",
    "/images/field-notes/sunday-dinner-shared-map.webp"
  ];
  if (JSON.stringify(sources.sort()) !== JSON.stringify(expectedSources.sort())) {
    fail("governed-photographic-field", "The public field must contain exactly the six reviewed derivatives.");
  }

  for (const field of ["id", "width", "height", "alt", "caption", "credit", "placements", "publicationStatus", "publicUseBoundary"]) {
    const count = [...manifest.matchAll(new RegExp(`\\b${field}:`, "g"))].length;
    if (count !== 7) {
      fail("manifest-bound-publication", `Manifest field ${field} is missing from one or more photos.`);
    }
  }
  if ([...manifest.matchAll(/publicationStatus: "jamie-authorized"/g)].length !== 7) {
    fail("manifest-bound-publication", "Every photo must retain the Jamie-authorized publication status.");
  }
  const requiredPhotoCredits = [
    "Photograph by Elana Gordon. From Jamie Burkart's photo archive.",
    "Photo courtesy of NYC Artist Coalition.",
    "Photo courtesy of Sunday Dinner NYC.",
    "Photo courtesy of KC Town Hall."
  ];
  for (const credit of requiredPhotoCredits) {
    if (!manifest.includes(`credit: "${credit}"`)) {
      fail(
        "truthful-photo-credit",
        `The public photo manifest is missing the approved credit: ${credit}`
      );
    }
  }
  if (
    [...manifest.matchAll(/credit: "Photo courtesy of NYC Artist Coalition\."/g)]
      .length !== 3 ||
    /Paul Mossine|Photographer not identified in (?:the )?retained export/i.test(
      manifest
    )
  ) {
    fail(
      "truthful-photo-credit",
      "Project photographs must use the approved project courtesy credit without unsupported creator attribution or archive-process prose."
    );
  }

  const publicImageRoot = path.join(root, "apps/www/public/images/field-notes");
  const publicImages = walkFiles(publicImageRoot).sort();
  if (publicImages.length !== 6 || publicImages.some((file) => !file.endsWith(".webp"))) {
    fail("governed-photographic-field", "The field-notes directory must contain only the six fully bound WebP derivatives.");
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
    readText("apps/www/src/app/about/page.tsx"),
    readText("apps/www/src/app/colophon/page.tsx"),
    readText("apps/www/src/app/lab/source-backed-team-memory/page.tsx")
  ].join("\n");
  if (/[0-9A-F]{8}(?:-[0-9A-F]{4}){3}-[0-9A-F]{12}/i.test(photographySurface)) {
    fail("metadata-and-locator-safety", "A private archive UUID appears in public application source.");
  }
  if (/\/Volumes\/|\/Users\/|IMG_[0-9]{4}|_L0_001/i.test(appSource)) {
    fail("metadata-and-locator-safety", "A protected path or original archive filename appears in public application source.");
  }

  const hero = readText("apps/www/src/components/Hero.tsx");
  const siteHeader = readText("apps/www/src/components/SiteHeader.tsx");
  const fieldSystemEvidence = readText("apps/www/src/components/FieldSystemEvidence.tsx");
  const governedImage = readText("apps/www/src/components/GovernedImage.tsx");
  const home = readText("apps/www/src/app/page.tsx");
  const proofsData = readText("apps/www/src/data/proofs.ts");
  const fairRent = readText("apps/www/src/app/work/[slug]/page.tsx");
  const sourceBackedTeamMemory = readText(
    "apps/www/src/app/lab/source-backed-team-memory/page.tsx"
  );
  const albumPermission = readText(
    "docs/knowledge-bank/sources/permissions/jamie-nycac-portfolio-album-clearance-2026-08.md"
  );
  const portfolioAlbumPermission = readText(
    "docs/knowledge-bank/sources/permissions/jamie-portfolio-album-2026-08-13.md"
  );
  const knowledgeWikiPhotoAsset = readText(
    "docs/knowledge-bank/assets/photographs/nycac-steering-group-card-field-2017.md"
  );
  const knowledgeWikiPhotoProjection = readText(
    "docs/knowledge-bank/projections/photography/source-backed-team-memory-card-field.md"
  );
  const letNYCDanceCapture = readText(
    "docs/knowledge-bank/sources/photo-metadata/let-nyc-dance-selected-frame-2026-08.md"
  );
  const letNYCDanceScreenshot = readFileSync(
    path.join(root, "apps/www/public/artifacts/fair-rent-nyc/let-nyc-dance-site.png")
  );
  const about = readText("apps/www/src/app/about/page.tsx");
  const colophon = readText("apps/www/src/app/colophon/page.tsx");
  if (!hero.includes("portfolioPhotos.eastRiver") || !hero.includes("fill") || /rounded|shadow/.test(hero)) {
    fail("editorial-not-decorative", "The home photograph must remain full-bleed, unframed, and manifest-bound.");
  }
  if (
    !fieldSystemEvidence.includes("portfolioPhotos.saveNYCSpacesTownHall") ||
    !fieldSystemEvidence.includes("portfolioPhotos.coalitionFacilitationShoestring") ||
    !fieldSystemEvidence.includes("/artifacts/fair-rent-nyc/public-site.png") ||
    !fieldSystemEvidence.includes("/artifacts/fair-rent-nyc/let-nyc-dance-site.png") ||
    !fieldSystemEvidence.includes('from "@/components/GovernedImage"') ||
    !governedImage.includes('from "next/image"')
  ) {
    fail("editorial-not-decorative", "Both field-and-system pairs must remain explicit, manifest-bound, and responsive.");
  }
  if (
    home.indexOf("Selected systems") > home.indexOf('<FieldSystemEvidence variant="home" />') ||
    home.indexOf('<FieldSystemEvidence variant="home" />') > home.indexOf("How I work") ||
    !fairRent.includes('<FieldSystemEvidence variant="fair-rent" />')
  ) {
    fail("editorial-not-decorative", "The two field-and-system pairs moved outside their reviewed editorial sequence.");
  }
  const knowledgeWikiPhoto = readFileSync(
    path.join(
      root,
      "apps/www/public/images/field-notes/knowledge-wiki-collective-synthesis.webp"
    )
  );
  const knowledgeWikiPhotoSha = createHash("sha256")
    .update(knowledgeWikiPhoto)
    .digest("hex");
  if (
    !sourceBackedTeamMemory.includes(
      "const photo = portfolioPhotos.knowledgeWikiCollectiveSynthesis"
    ) ||
    !sourceBackedTeamMemory.includes("alt={photo.alt}") ||
    !sourceBackedTeamMemory.includes("src={photo.src}") ||
    !sourceBackedTeamMemory.includes("{photo.caption}") ||
    !sourceBackedTeamMemory.includes("{photo.credit}") ||
    sourceBackedTeamMemory.indexOf("alt={photo.alt}") >
      sourceBackedTeamMemory.indexOf("<SourceBackedMemory />") ||
    !/The\s+structure does not invent the knowledge/.test(
      sourceBackedTeamMemory
    ) ||
    !portfolioAlbumPermission.includes(
      "asset.photo.nycac.steering-group-card-field.2017.001"
    ) ||
    !knowledgeWikiPhotoAsset.includes(
      "checksum: 3142209a27765b140ce3b3b64fdae1db57970262a9e6fddf38bf020cf59db50c"
    ) ||
    knowledgeWikiPhotoSha !==
      "3142209a27765b140ce3b3b64fdae1db57970262a9e6fddf38bf020cf59db50c" ||
    !knowledgeWikiPhotoProjection.includes("interpretation_boundary:") ||
    !knowledgeWikiPhotoProjection.includes(
      "It does not imply that the diagram created that knowledge"
    )
  ) {
    fail(
      "knowledge-wiki-photographic-metaphor",
      "The Source-Backed Team Memory lab lost its exact governed collective-synthesis occurrence or its interpretation boundary."
    );
  }
  if (
    !albumPermission.includes("album_scope_publication: approved") ||
    !albumPermission.includes("required_credit: Photo courtesy of NYC Artist Coalition.") ||
    !albumPermission.includes("production: open") ||
    !albumPermission.includes("indexing: open") ||
    !albumPermission.includes("private_evidence: held-outside-git")
  ) {
    fail("governed-photographic-field", "The destination-specific album clearance or its open human gates are incomplete.");
  }
  const selectedScreenshotSha = createHash("sha256").update(letNYCDanceScreenshot).digest("hex");
  if (
    selectedScreenshotSha !== "c5122b3d6d49cb34548d5b7a4b3e6f139eaa9ba38b86c3602335f87a4f6305f5" ||
    !letNYCDanceCapture.includes("selected_frame: 8") ||
    !letNYCDanceCapture.includes("once per second for ten seconds")
  ) {
    fail("manifest-bound-publication", "The selected Let NYC Dance frame is not the exact documented ten-second filmstrip choice.");
  }
  if (/FieldPhoto|portfolioPhotos|\/images\/field-notes\//.test(about) ||
      /FieldPhoto|portfolioPhotos|\/images\/field-notes\//.test(colophon)) {
    fail("editorial-not-decorative", "About and Colophon must remain text-led until additional images complete exact rights and credit review.");
  }

  const workCovers = readText("apps/www/src/data/work-covers.ts");
  const workData = readText("apps/www/src/data/work.ts");
  const workCard = readText("apps/www/src/components/WorkCard.tsx");
  const caseStudyLayout = readText("apps/www/src/components/CaseStudyLayout.tsx");
  const workIndex = readText("apps/www/src/app/work/page.tsx");
  const tagList = readText("apps/www/src/components/TagList.tsx");
  const capabilityGrid = readText("apps/www/src/components/CapabilityGrid.tsx");
  const coverCount = [...workCovers.matchAll(/^  (?:"[^"]+"|[a-z]+): \{/gm)].length;
  if (coverCount !== 7 ||
      !workCard.includes('from "@/components/GovernedImage"') ||
      !workCard.includes("getWorkCover(item.slug)") ||
      !workCard.includes("cover.src") ||
      !workCard.includes("cover.caption") ||
      !workCard.includes("cover.credit") ||
      !caseStudyLayout.includes('from "@/components/GovernedImage"') ||
      !caseStudyLayout.includes("getWorkCover(item.slug)") ||
      !caseStudyLayout.includes("cover.src") ||
      !caseStudyLayout.includes("cover.caption") ||
      !caseStudyLayout.includes("cover.credit")) {
    fail("truthful-project-cover-field", "All seven work items and case studies must render one captioned and credited cover from the separate cover manifest.");
  }
  for (const [slug, requiredCover] of [
    ['"harry-j-epstein"', '"/artifacts/hje/public-site.png"'],
    ['"fair-rent-nyc"', "portfolioPhotos.saveNYCSpacesTownHall.src"],
    ['"kc-spaces-fund"', '"/artifacts/kc-spaces-fund/public-site.png"'],
    ["callnyc", '"/artifacts/callnyc/launch-2016.png"'],
    ["wowlist", '"/artifacts/wowlist/public-threshold.webp"'],
    ['"196-sunday-dinner"', "portfolioPhotos.sundayDinnerSharedMap.src"],
    ['"kc-town-hall"', "portfolioPhotos.kcTownHallRoofWork.src"]
  ]) {
    const slugIndex = workCovers.indexOf(`${slug}: {`);
    const coverEnd = workCovers.indexOf("},", slugIndex);
    const coverBlock = workCovers.slice(slugIndex, coverEnd);
    if (slugIndex < 0 || !coverBlock.includes(`src: ${requiredCover}`)) {
      fail("truthful-project-cover-field", `Missing governed project-bound cover for ${slug}.`);
    }
  }

  const homepageOrderBlock = workData.match(
    /export const homepageWorkOrder = \[([\s\S]*?)\] as const;/
  );
  const observedHomepageOrder = homepageOrderBlock
    ? [...homepageOrderBlock[1].matchAll(/"([^"]+)"/g)].map((match) => match[1])
    : [];
  const expectedHomepageOrder = [
    "fair-rent-nyc",
    "harry-j-epstein",
    "callnyc",
    "kc-town-hall",
    "wowlist",
    "196-sunday-dinner"
  ];
  const sundayDinnerBlock = workData.slice(
    workData.indexOf('title: "196 Artists Residency / Sunday Dinner"'),
    workData.indexOf('title: "KC Town Hall LLC"')
  );
  const startHereBlock = home.match(
    /const startHereLinks = \[([\s\S]*?)\];/
  );
  const observedStartHereOrder = startHereBlock
    ? [...startHereBlock[1].matchAll(/href: "([^"]+)"/g)].map((match) => match[1])
    : [];
  const expectedStartHereOrder = [
    "/work/technical-operations",
    "/work",
    "/resume"
  ];
  if (
    JSON.stringify(observedHomepageOrder) !== JSON.stringify(expectedHomepageOrder) ||
    !workData.includes("homepageWorkOrder.map") ||
    !sundayDinnerBlock.includes("featured: true") ||
    JSON.stringify(observedStartHereOrder) !== JSON.stringify(expectedStartHereOrder)
  ) {
    fail(
      "hiring-argument-project-sequence",
      "The homepage no longer opens with current civic delivery, sustained operations, and resident-facing product judgment before completing the six-project argument with Sunday Dinner present."
    );
  }

  const homepageProofBlock = proofsData.match(
    /export const homepageProofs = \[([\s\S]*?)\]\.map\(requireReadyOrCarefulProof\);/
  );
  const observedHomepageProofs = homepageProofBlock
    ? [...homepageProofBlock[1].matchAll(/"([^"]+)"/g)].map((match) => match[1])
    : [];
  const expectedHomepageProofs = [
    "career-operating-structure-14-years",
    "hje-revenue-growth-contribution",
    "fair-rent-campaign-memory"
  ];
  if (
    JSON.stringify(observedStartHereOrder) !== JSON.stringify(expectedStartHereOrder) ||
    JSON.stringify(observedHomepageProofs) !== JSON.stringify(expectedHomepageProofs) ||
    !hero.includes('href="/work/technical-operations"') ||
    !hero.includes("See role-fit evidence") ||
    !home.includes('<FieldSystemEvidence variant="home" />') ||
    home.includes("const transformations") ||
    home.includes("Operating motif")
  ) {
    fail(
      "hiring-reader-attention-budget",
      "The homepage exceeds the three-route, three-proof attention budget, loses its direct role-fit action or field-and-system passage, or repeats the operating thesis."
    );
  }

  const expectedCapabilityTags = [
    ["Technical project management", "Technical Operations"],
    ["Product operations", "Product Operations"],
    ["Knowledge systems & documentation", "Knowledge Systems"],
    ["Civic technology & open data", "Civic Technology"],
    ["Web systems & public-facing tools", "Public-Facing Tools"],
    ["Community systems", "Community Systems"]
  ];
  const observedCapabilityTags = [
    ...capabilityGrid.matchAll(/title: "([^"]+)",\s+tag: "([^"]+)",/g)
  ].map((match) => [match[1], match[2]]);
  const availableWorkTags = new Set(
    [...workData.matchAll(/tags: \[([^\]]+)\]/g)].flatMap((match) =>
      [...match[1].matchAll(/"([^"]+)"/g)].map((tagMatch) => tagMatch[1])
    )
  );
  if (!tagList.includes('from "next/link"') ||
      !tagList.includes("/work?tag=") ||
      !tagList.includes("encodeURIComponent(tag)") ||
      !workIndex.includes("selectedTag") ||
      !workIndex.includes("Clear filter") ||
      !workIndex.includes('id="work-index"') ||
      !capabilityGrid.includes('from "next/link"') ||
      !capabilityGrid.includes("/work?tag=${encodeURIComponent(capability.tag)}#work-index") ||
      JSON.stringify(observedCapabilityTags) !== JSON.stringify(expectedCapabilityTags) ||
      observedCapabilityTags.some(([, tag]) => !availableWorkTags.has(tag))) {
    fail("tag-navigation-contract", "Tag-shaped controls and homepage capability rows must link through the canonical tag taxonomy to a visible, clearable work-index filter state.");
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
  if (!fieldPhoto.includes('from "@/components/GovernedImage"') ||
      !governedImage.includes('from "next/image"') ||
      !fieldPhoto.includes("sizes={sizes}") ||
      !fieldPhoto.includes("photo.alt") ||
      !fieldSystemEvidence.includes("sizes=")) {
    fail("responsive-image-contract", "Field photos must retain Next Image, responsive sizes, and manifest alt text.");
  }
  if (!globalCss.includes("100svh")) {
    fail("responsive-image-contract", "The stable viewport-bounded hero contract is incomplete.");
  }
  if (
    !siteHeader.startsWith('"use client";') ||
    !siteHeader.includes('closest("details")?.removeAttribute("open")') ||
    !siteHeader.includes("onClick={closeMobileNavigation}")
  ) {
    fail("responsive-navigation", "Mobile navigation links must close the persistent disclosure when activated.");
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
