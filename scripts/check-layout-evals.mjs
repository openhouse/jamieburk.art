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
    "truthful-project-cover-field",
    "homepage-hiring-sequence",
    "tag-navigation-contract",
    "human-index-material-system",
    "responsive-image-contract",
    "social-preview-contract",
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
    if (count !== 10) {
      fail("manifest-bound-publication", `Manifest field ${field} is missing from one or more photos.`);
    }
  }
  if ([...manifest.matchAll(/publicationStatus: "jamie-authorized"/g)].length !== 10) {
    fail("manifest-bound-publication", "Every photo must retain the Jamie-authorized publication status.");
  }
  const expectedProjectCredits = [
    ["Photo courtesy of NYC Artist Coalition.", 2],
    ["Photo courtesy of Sunday Dinner NYC.", 1],
    ["Photo courtesy of KC Town Hall.", 3],
    ["Design courtesy of KC Town Hall.", 1]
  ];
  for (const [credit, expectedCount] of expectedProjectCredits) {
    const observedCount = manifest.split(`credit: "${credit}"`).length - 1;
    if (observedCount !== expectedCount) {
      fail(
        "manifest-bound-publication",
        `Expected ${expectedCount} exact public occurrence(s) of project credit: ${credit}`
      );
    }
  }
  if (/Paul Mossine|retained export|photographer not identified|photographer unresolved|authorship remains under review/i.test(manifest)) {
    fail(
      "manifest-bound-publication",
      "Public visual credits must use verified creator attribution or a clean project courtesy line, never an incorrect byline or archive-process note."
    );
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
    readText("apps/www/src/data/social-preview.ts"),
    readText("apps/www/src/app/opengraph-image.tsx"),
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
  const workData = readText("apps/www/src/data/work.ts");
  const hiringSequenceDecision = readText("docs/design/homepage-hiring-sequence.md");
  const hiringSequenceHillclimb = JSON.parse(
    readText("evals/layout/homepage-hiring-sequence-hillclimb.json")
  );
  const workCard = readText("apps/www/src/components/WorkCard.tsx");
  const caseStudyLayout = readText("apps/www/src/components/CaseStudyLayout.tsx");
  const homePage = readText("apps/www/src/app/page.tsx");
  const workIndex = readText("apps/www/src/app/work/page.tsx");
  const tagList = readText("apps/www/src/components/TagList.tsx");
  const capabilityGrid = readText("apps/www/src/components/CapabilityGrid.tsx");
  const coverCount = [...workCovers.matchAll(/^  (?:"[^"]+"|[a-z]+): \{/gm)].length;
  if (coverCount !== 7 ||
      !workCard.includes('from "next/image"') ||
      !workCard.includes("getWorkCover(item.slug)") ||
      !workCard.includes("cover.src") ||
      !workCard.includes("cover.caption") ||
      !workCard.includes("cover.credit") ||
      !caseStudyLayout.includes("getWorkCover(item.slug)") ||
      !caseStudyLayout.includes("cover.src") ||
      !caseStudyLayout.includes("cover.caption") ||
      !caseStudyLayout.includes("cover.credit")) {
    fail("truthful-project-cover-field", "All seven work items and case studies must render one captioned and credited cover from the separate cover manifest.");
  }
  for (const [title, requiredCover] of [
    ["Harry J. Epstein Company", '"/artifacts/hje/public-site.png"'],
    ["NYC Artist Coalition / FairRentNYC", "portfolioPhotos.nycacMarketHotelBanner.src"],
    ["CallNYC.org", '"/artifacts/callnyc/original-launch.webp"'],
    ["KC Spaces Fund", '"/artifacts/kc-spaces-fund/public-site.webp"'],
    ["WOWList.org", '"/artifacts/wowlist/public-threshold.webp"'],
    ["196 Artists Residency / Sunday Dinner", "portfolioPhotos.sundayDinnerSharedMap.src"],
    ["KC Town Hall LLC", "portfolioPhotos.kcTownHallRoofWork.src"]
  ]) {
    const slug = {
      "Harry J. Epstein Company": '"harry-j-epstein"',
      "NYC Artist Coalition / FairRentNYC": '"fair-rent-nyc"',
      "CallNYC.org": "callnyc",
      "KC Spaces Fund": '"kc-spaces-fund"',
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

  const sequenceMatch = workData.match(
    /export const homepageHiringSequence = \[([\s\S]*?)\]\s+as const satisfies/
  );
  const observedSequence = sequenceMatch
    ? [...sequenceMatch[1].matchAll(/"([^"]+)"/g)].map((match) => match[1])
    : [];
  const expectedSequence = [
    "harry-j-epstein",
    "fair-rent-nyc",
    "callnyc",
    "kc-town-hall",
    "wowlist",
    "196-sunday-dinner"
  ];
  const quickPath = [
    'href: "/work/technical-operations"',
    'href: "/work/harry-j-epstein"',
    'href: "/work/fair-rent-nyc"',
    'href: "/work/callnyc"',
    'href: "/resume"'
  ];
  let lastQuickPathIndex = -1;
  const quickPathInOrder = quickPath.every((needle) => {
    const index = homePage.indexOf(needle, lastQuickPathIndex + 1);
    if (index < 0) return false;
    lastQuickPathIndex = index;
    return true;
  });
  if (
    JSON.stringify(observedSequence) !== JSON.stringify(expectedSequence) ||
    !workData.includes("export const featuredWork = homepageHiringSequence.map") ||
    !homePage.includes("featuredWork.map") ||
    !quickPathInOrder ||
    JSON.stringify(hiringSequenceHillclimb.candidate?.sequence) !==
      JSON.stringify(expectedSequence) ||
    hiringSequenceHillclimb.decision !== "keep-change" ||
    hiringSequenceHillclimb.criterion !== "rushed-hiring-reader-legibility" ||
    hiringSequenceHillclimb.capabilityNavigation?.decision !== "keep-change" ||
    hiringSequenceHillclimb.capabilityNavigation?.criterion !==
      "capability-to-project-proof" ||
    hiringSequenceHillclimb.capabilityNavigation?.destinationPattern !==
      "/work?tag={encoded-tag}#work-index" ||
    hiringSequenceHillclimb.capabilityNavigation?.browserReview?.desktop !== "pass" ||
    hiringSequenceHillclimb.capabilityNavigation?.browserReview?.mobile !== "pass" ||
    hiringSequenceHillclimb.capabilityNavigation?.browserReview?.filterState !== "pass" ||
    !hiringSequenceHillclimb.activeOpportunityBasis?.submittedPending?.includes(
      "opportunity.nyc-oti.senior-product-manager.782366"
    ) ||
    !hiringSequenceHillclimb.candidate?.retainedInCompleteIndex?.includes(
      "kc-spaces-fund"
    ) ||
    !/current public instance remains archived, unofficial, and non-current/i.test(workData) ||
    !workData.includes("Historical, collaborator-led campaign") ||
    !hiringSequenceDecision.includes("The homepage is an argument, not a chronology") ||
    !/Can Jamie deliver for an\s+established organization\?/.test(hiringSequenceDecision) ||
    !hiringSequenceDecision.includes("Sunday Dinner closes") ||
    !hiringSequenceDecision.includes("KC Spaces Fund remains in the complete work index") ||
    !hiringSequenceDecision.includes("A later reorder should name the changed hiring question")
  ) {
    fail(
      "homepage-hiring-sequence",
      "The approved six-project hiring sequence, mirrored quick path, active-opportunity basis, or historical and collective-credit boundary has drifted."
    );
  }
  if (workData.includes("approved public materials pending") ||
      !workData.includes("one human-reviewed project photograph cleared for this portfolio display with a Sunday Dinner NYC courtesy credit") ||
      !workData.includes("Additional named participants, photographs, and artifacts require consent and approval.")) {
    fail(
      "truthful-project-cover-field",
      "The Sunday Dinner source boundary must distinguish its authorized cover from additional consent-gated media."
    );
  }

  const expectedCapabilityTags = [
    "Technical Operations",
    "Product Operations",
    "Knowledge Systems",
    "Civic Technology",
    "Web Systems",
    "Community Systems"
  ];
  if (!tagList.includes('from "next/link"') ||
      !tagList.includes("/work?tag=") ||
      !tagList.includes("encodeURIComponent(tag)") ||
      !capabilityGrid.includes('from "next/link"') ||
      !capabilityGrid.includes("encodeURIComponent(capability.tag)") ||
      !capabilityGrid.includes('id="capabilities"') ||
      expectedCapabilityTags.some((tag) => !capabilityGrid.includes(`tag: "${tag}"`)) ||
      !workIndex.includes("selectedTag") ||
      !workIndex.includes("Clear filter") ||
      !workIndex.includes('id="work-index"')) {
    fail("tag-navigation-contract", "Tag-shaped controls and homepage capability rows must link to visible, clearable work-index filter states.");
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
  const responsiveMedia = readText("apps/www/src/components/ResponsiveMedia.tsx");
  if (!fieldPhoto.includes("ResponsiveMedia") ||
      !fieldPhoto.includes("sizes={sizes}") ||
      !fieldPhoto.includes("photo.alt") ||
      !responsiveMedia.includes('from "next/image"') ||
      !responsiveMedia.includes("resolveMediaDelivery") ||
      !responsiveMedia.includes("srcSet={delivery.srcSet}")) {
    fail("responsive-image-contract", "Field photos must retain the governed local fallback, responsive sizes, manifest alt text, and bounded direct Cloudinary srcset.");
  }
  if (!globalCss.includes("100svh")) {
    fail("responsive-image-contract", "The stable viewport-bounded hero contract is incomplete.");
  }

  const socialPreview = readText("apps/www/src/data/social-preview.ts");
  const openGraphImage = readText("apps/www/src/app/opengraph-image.tsx");
  const appPackage = readText("apps/www/package.json");
  const repositoryScripts = walkFiles(path.join(root, "scripts"));
  const metadata = readText("apps/www/src/lib/metadata.ts");
  const socialPlacement = readText(
    "docs/knowledge-bank/projections/photography/social-preview-east-river.md"
  );
  const socialPermission = readText(
    "docs/knowledge-bank/sources/permissions/elana-gordon-east-river-portfolio-2026.md"
  );
  const socialImagePath = path.join(
    root,
    "apps/www/public/images/social/jamie-east-river-og.jpg"
  );
  const socialImageBytes = readFileSync(socialImagePath);
  const socialImageSha = createHash("sha256").update(socialImageBytes).digest("hex");
  const eastRiverAsset = readText(
    "docs/knowledge-bank/assets/photographs/east-river-manhattan-bridge-2022.md"
  );
  const metadataBindings = [
    "socialPreview.route",
    "socialPreview.width",
    "socialPreview.height",
    "socialPreview.alt"
  ];
  const renderedBindings = [
    "socialPreview.name",
    "socialPreview.proposition",
    "socialPreview.image.src",
    "socialPreview.image.alt",
    "socialPreview.siteLabel"
  ];
  const compositionInstructions = [
    "photograph-is-the-field",
    "name-is-primary",
    "proposition-is-secondary",
    "destination-is-quiet",
    "role-and-credit-are-metadata"
  ];
  if (
    !socialPreview.includes("image: portfolioPhotos.eastRiverSocialPreview") ||
    !manifest.includes('src: "/images/social/jamie-east-river-og.jpg"') ||
    !socialPreview.includes('route: "/opengraph-image"') ||
    !socialPreview.includes("width: 1200") ||
    !socialPreview.includes("height: 630") ||
    metadataBindings.some((binding) => !metadata.includes(binding)) ||
    [...metadata.matchAll(/socialPreview\.route/g)].length !== 2 ||
    [...metadata.matchAll(/socialPreview\.alt/g)].length !== 2 ||
    [...metadata.matchAll(/socialPreview\.width/g)].length !== 1 ||
    [...metadata.matchAll(/socialPreview\.height/g)].length !== 1 ||
    !socialPreview.includes("Photograph by Elana Gordon.") ||
    !socialPreview.includes('id: "human-index-editorial-proposition-v1"') ||
    !socialPreview.includes('selectedVariant: "image-4-editorial-proposition"') ||
    !socialPreview.includes("alternativesReviewed: 6") ||
    !socialPreview.includes("uniqueCompositionsReviewed: 4") ||
    compositionInstructions.some((instruction) => !socialPreview.includes(instruction)) ||
    !socialPreview.includes('renderedFields: ["name", "proposition", "siteLabel"]') ||
    !socialPreview.includes('metadataOnlyFields: ["role", "creatorCredit"]') ||
    !socialPreview.includes('sha256: "1f83d66b7e35e8a3a955819cf2104b79a88c9a8bd3953fd6fa691143bdb6da42"') ||
    !appPackage.includes('"social-preview:verify"') ||
    !appPackage.includes("npm run social-preview:verify") ||
    !repositoryScripts.includes("check-social-preview-render.mjs") ||
    /\b(?:focus|credit):/.test(socialPreview) ||
    renderedBindings.some(
      (binding) => openGraphImage.split(binding).length - 1 !== 1
    ) ||
    /socialPreview\.(?:focus|credit)|socialPreview\.image\.caption/.test(
      openGraphImage
    ) ||
    !openGraphImage.includes('export const runtime = "nodejs"') ||
    !openGraphImage.includes('import { readFile } from "node:fs/promises"') ||
    !openGraphImage.includes("readSocialPreviewAsset(socialPreview.image.src)") ||
    !openGraphImage.includes(
      "readSocialPreviewAsset(composition.typography.displayFont.src)"
    ) ||
    !openGraphImage.includes(
      "readSocialPreviewAsset(composition.typography.bodyFont.src)"
    ) ||
    !openGraphImage.includes("src={imageData as unknown as string}") ||
    !openGraphImage.includes('objectFit: "cover"') ||
    !socialPreview.includes('image: { objectPosition: "center 46%" }') ||
    !openGraphImage.includes("composition.layout.image.objectPosition") ||
    openGraphImage.includes("socialPreview.role") ||
    !openGraphImage.includes("socialPreview.composition") ||
    !openGraphImage.includes("readSocialPreviewAsset") ||
    !openGraphImage.includes("fonts:") ||
    !openGraphImage.includes("composition.contrast") ||
    !openGraphImage.includes("composition.typography") ||
    !openGraphImage.includes("composition.layout") ||
    /new URL\(socialPreview\.image\.src|SITE_URL/.test(openGraphImage) ||
    /#0b5f81|#1f5c3e|#eeefec|radial-gradient|conic-gradient/i.test(
      openGraphImage
    ) ||
    !/route: \/opengraph-image/.test(socialPlacement) ||
    !/asset: asset\.photo\.east-river-manhattan-bridge\.2022\.001/.test(
      socialPlacement
    ) ||
    !/derivative: derivative\.photo\.east-river\.social-preview\.v1/.test(
      socialPlacement
    ) ||
    !/fixed: full-bleed 1200 by 630 cover, centered at 46 percent vertically/.test(
      socialPlacement
    ) ||
    !/rendered_in_image: false/.test(socialPlacement) ||
    !/carried_in_alt_metadata: true/.test(socialPlacement) ||
    !/in_image_credit: optional/.test(socialPermission) ||
    !/metadata_credit: Photograph by Elana Gordon\./.test(socialPermission) ||
    socialImageBytes[0] !== 0xff ||
    socialImageBytes[1] !== 0xd8 ||
    /EXIF|Exif|GPSLatitude|GPSLongitude|<x:xmpmeta|Photoshop 3\.0/i.test(
      socialImageBytes.toString("latin1")
    ) ||
    !eastRiverAsset.includes(socialImageSha) ||
    !/production: approved/.test(socialPlacement) ||
    !/indexing: approved/.test(socialPlacement) ||
    !/authority: Jamie Burkart/.test(socialPlacement) ||
    !/selected_variant: image-4-editorial-proposition/.test(socialPlacement) ||
    !/alternatives_reviewed: 6/.test(socialPlacement) ||
    !/unique_compositions_reviewed: 4/.test(socialPlacement)
  ) {
    fail(
      "social-preview-contract",
      "Open Graph, Twitter, the distilled full-bleed image, placement-specific creator attribution, and human release gates must remain one shared contract."
    );
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
