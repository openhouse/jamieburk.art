import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

export const defaultRepoRoot = path.resolve(import.meta.dirname, "../..");

const privatePattern =
  /(?:\/Users\/|\/Volumes\/|\/private\/tmp\/|Mobile Documents|Library\/CloudStorage|\.photoslibrary\b|[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/i;

const embeddedMetadataMarkers = [
  Buffer.from("Exif\0\0", "binary"),
  Buffer.from("http://ns.adobe.com/xap/1.0/"),
  Buffer.from("Photoshop 3.0"),
  Buffer.from("GPSLatitude")
];

function jpegDimensions(buffer) {
  if (buffer.length < 12 || buffer[0] !== 0xff || buffer[1] !== 0xd8) {
    return null;
  }

  const startOfFrame = new Set([
    0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7,
    0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf
  ]);

  let offset = 2;
  while (offset + 9 < buffer.length) {
    if (buffer[offset] !== 0xff) {
      offset += 1;
      continue;
    }

    const marker = buffer[offset + 1];
    if (marker === 0xd8 || marker === 0xd9) {
      offset += 2;
      continue;
    }
    if (marker === 0xda) break;

    const length = buffer.readUInt16BE(offset + 2);
    if (startOfFrame.has(marker)) {
      return {
        height: buffer.readUInt16BE(offset + 5),
        width: buffer.readUInt16BE(offset + 7)
      };
    }
    if (length < 2) return null;
    offset += length + 2;
  }

  return null;
}

function includesMetadata(buffer) {
  return embeddedMetadataMarkers.some((marker) => buffer.includes(marker));
}

export function evaluateLayoutPhotography(options = {}) {
  const repoRoot = options.repoRoot ?? defaultRepoRoot;
  const suitePath = path.join(repoRoot, "evals/layout-photography/suite.json");
  const suite =
    options.suiteOverride ??
    JSON.parse(readFileSync(suitePath, "utf8"));
  const sourceOverrides = options.sourceOverrides ?? {};
  const assetOverrides = options.assetOverrides ?? {};

  const source = (relativePath) => {
    if (Object.hasOwn(sourceOverrides, relativePath)) {
      return sourceOverrides[relativePath];
    }
    return readFileSync(path.join(repoRoot, relativePath), "utf8");
  };

  const asset = (relativePath) => {
    if (Object.hasOwn(assetOverrides, relativePath)) {
      return assetOverrides[relativePath];
    }
    const absolutePath = path.join(repoRoot, relativePath);
    return existsSync(absolutePath) ? readFileSync(absolutePath) : null;
  };

  const allSource = suite.source_files.map(source).join("\n");
  const photographyData = source("apps/www/src/data/photography.ts");
  const hero = source("apps/www/src/components/Hero.tsx");
  const workCard = source("apps/www/src/components/WorkCard.tsx");
  const caseStudy = source("apps/www/src/components/CaseStudyLayout.tsx");
  const home = source("apps/www/src/app/page.tsx");
  const work = source("apps/www/src/app/work/page.tsx");
  const about = source("apps/www/src/app/about/page.tsx");
  const globals = source("apps/www/src/app/globals.css");
  const tokens = source("apps/www/src/styles/tokens.css");
  const layoutStudy = source(
    "docs/knowledge-bank/notebooks/photography/layout-study-d.md"
  );

  const photoAssetsAreExactAndMetadataMinimized =
    suite.required_photo_assets.every((entry) => {
      const buffer = asset(entry.path);
      const dimensions = buffer ? jpegDimensions(buffer) : null;
      return (
        buffer &&
        buffer.length > 100_000 &&
        dimensions?.width === entry.width &&
        dimensions?.height === entry.height &&
        !includesMetadata(buffer)
      );
    });

  const photoRecordsAreCompleteAndPublicSafe =
    suite.required_photo_assets.every((entry) => {
      const publicPath = entry.path.replace("apps/www/public", "");
      const recordPattern = new RegExp(
        `${entry.key}:[\\s\\S]*?src:\\s*"${publicPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"[\\s\\S]*?alt:\\s*"[\\s\\S]+?"[\\s\\S]*?caption:\\s*[\\s\\S]+?[\\s\\S]*?credit:\\s*"[\\s\\S]+?"[\\s\\S]*?kind:\\s*"photograph"`
      );
      return recordPattern.test(photographyData);
    }) &&
    photographyData.includes("satisfies Record<string, PortfolioVisual>") &&
    !privatePattern.test(photographyData);

  const workingBranchReviewIsExplicitPerImage =
    suite.required_photo_assets.every((entry) => {
      const nextKeyIndex = suite.required_photo_assets
        .map((candidate) => photographyData.indexOf(`${candidate.key}:`))
        .filter((index) => index > photographyData.indexOf(`${entry.key}:`))
        .sort((a, b) => a - b)[0] ?? photographyData.indexOf("} satisfies Record");
      const record = photographyData.slice(
        photographyData.indexOf(`${entry.key}:`),
        nextKeyIndex
      );
      return [
        'workingUse: "authorized-for-features-layout-D-review"',
        'production: "hold"',
        'rights: "review-required"',
        'credit: "review-required"',
        'context: "reviewed-no-sensitive-context-observed"',
        "contextNote:",
        'representedPeople: "context-and-consent-review-required"'
      ].every((field) => record.includes(field));
    }) &&
    (layoutStudy.match(/Authorized for `features\/layout-D` review/g)?.length ?? 0) ===
      suite.required_photo_assets.length &&
    (layoutStudy.match(/Hold: rights/g)?.length ?? 0) ===
      suite.required_photo_assets.length &&
    (layoutStudy.match(/no sensitive context observed/g)?.length ?? 0) >= 5;

  const everyPhotoHasADeliberateProjection =
    suite.required_photo_assets.every((entry) =>
      [hero, home, work, photographyData].some((text) =>
        text.includes(entry.projection_marker)
      )
    );

  const heroIsImageLedAndRoleLegible =
    hero.includes("<Image") &&
    hero.includes("fill") &&
    hero.includes("priority") &&
    hero.includes("photographs.cabaretLawHearing") &&
    hero.includes("<h1") &&
    hero.includes("Jamie Burkart") &&
    hero.includes("I create operating structure for complex public-facing teams") &&
    globals.includes(".jb-photo-hero") &&
    /height:\s*clamp\([^;]+100svh/.test(globals);

  const layoutUsesHumanIndexMaterialPalette =
    [
      "--jb-broadway-blue: #2f6f89",
      "--jb-oil-white: #ffffff",
      "--jb-oil-paper: #f3f6f8",
      "--jb-oil-ink: #1a232b",
      "--jb-deep-green: #4e6f61",
      "--jb-yellow-ochre: #d1a23f",
      "--jb-correction-red: #c83b32",
      "--jb-graphite: #222b36"
    ].every((token) => tokens.includes(token)) &&
    globals.includes('name: "human-index"') &&
    !/(?:linear|radial|conic)-gradient\(/i.test(globals);

  const photographyIsResponsiveAndNonDecorative =
    globals.includes("@media (max-width: 700px)") &&
    globals.includes(".jb-photo-sequence") &&
    globals.includes(".jb-project-cover") &&
    globals.includes(".jb-case-visual") &&
    suite.required_photo_assets.every((entry) => {
      const publicPath = entry.path.replace("apps/www/public", "");
      return photographyData.includes(publicPath);
    }) &&
    !/alt=\{?["']["']\}?/.test([hero, home, work, about, caseStudy, workCard].join("\n"));

  const projectCardsRemainScannable =
    workCard.includes("item.whatBecameUsable") &&
    !workCard.includes("item.whatWasUnclear") &&
    !workCard.includes("item.roleFit") &&
    workCard.includes("item.tags.slice(0, 4)") &&
    workCard.includes("jb-project-cover");

  const photoEvidenceBoundaryIsVisible =
    photographyData.includes("A displayed image does not by itself establish") &&
    photographyData.includes("sole authorship") &&
    photographyData.includes("permission for reuse outside this portfolio") &&
    hero.includes("photoDisplayBoundary") &&
    caseStudy.includes("photoDisplayBoundary") &&
    about.includes("photoDisplayBoundary") &&
    home.includes("photoDisplayBoundary") &&
    work.includes("photoDisplayBoundary") &&
    home.includes("Photography makes the operational practice visible");

  const layoutStudyIsGoverned =
    layoutStudy.includes("id: notebook.photography.layout-study.d") &&
    layoutStudy.includes("notebook_state: sequencing") &&
    /projection:\s+status: hold\s+surfaces: \[\]/.test(layoutStudy) &&
    /seven\s+metadata-minimized photographic derivatives/i.test(layoutStudy) &&
    /does not publish the private 1,000-photo editor field/i.test(layoutStudy) &&
    /image-by-image rights and credit review/i.test(layoutStudy) &&
    /production observation after deployment/i.test(layoutStudy);

  const privateArchiveCoordinatesAreAbsent =
    suite.source_files.every((file) => !privatePattern.test(source(file))) &&
    !privatePattern.test(JSON.stringify(suite));

  const manualGatesRemainOpen =
    Object.values(suite.manual_gates ?? {}).every((value) => value === "required") &&
    suite.thresholds?.manual_gates_must_remain_explicit === true &&
    suite.thresholds?.application_ready_does_not_imply_production_approved === true;

  const checks = {
    photo_assets_are_exact_and_metadata_minimized:
      Boolean(photoAssetsAreExactAndMetadataMinimized),
    photo_records_are_complete_and_public_safe:
      photoRecordsAreCompleteAndPublicSafe,
    working_branch_review_is_explicit_per_image:
      workingBranchReviewIsExplicitPerImage,
    every_photo_has_a_deliberate_projection:
      everyPhotoHasADeliberateProjection,
    hero_is_image_led_and_role_legible:
      heroIsImageLedAndRoleLegible,
    layout_uses_human_index_material_palette:
      layoutUsesHumanIndexMaterialPalette,
    photography_is_responsive_and_non_decorative:
      photographyIsResponsiveAndNonDecorative,
    project_cards_remain_scannable:
      projectCardsRemainScannable,
    photo_evidence_boundary_is_visible:
      photoEvidenceBoundaryIsVisible,
    layout_study_is_governed:
      layoutStudyIsGoverned,
    private_archive_coordinates_are_absent:
      privateArchiveCoordinatesAreAbsent,
    manual_publication_gates_remain_open:
      manualGatesRemainOpen
  };

  return {
    passed:
      suite.version === 1 &&
      suite.suite_id === "portfolio-layout-photography" &&
      suite.thresholds?.all_deterministic_criteria_must_pass === true &&
      Object.values(checks).every(Boolean),
    checks,
    failures: Object.entries(checks)
      .filter(([, passed]) => !passed)
      .map(([id]) => id),
    counts: {
      requiredPhotoAssets: suite.required_photo_assets.length,
      projectedPhotoAssets: suite.required_photo_assets.filter((entry) =>
        [hero, home, work, photographyData].some((text) =>
          text.includes(entry.projection_marker)
        )
      ).length
    },
    publicProjectionFiles: suite.public_projection_files
  };
}
