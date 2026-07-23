import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const expectedCandidateIds = new Set([
  "WEB-CAND-001",
  "WEB-CAND-002",
  "WEB-CAND-003",
  "WEB-CAND-004",
  "WEB-CAND-010",
  "WEB-CAND-013",
  "WEB-CAND-014",
  "WEB-CAND-015",
  "WEB-CAND-019",
  "WEB-CAND-029",
  "WEB-CAND-031",
  "WEB-CAND-033",
  "WEB-CAND-039"
]);

const heldCandidateIds = [
  "WEB-CAND-009",
  "WEB-CAND-008",
  "WEB-CAND-016",
  "WEB-CAND-021",
  "WEB-CAND-023",
  "WEB-CAND-024",
  "WEB-CAND-050"
];

function values(source, field) {
  return [...source.matchAll(new RegExp(`${field}:\\s*"([^"]+)"`, "g"))].map(
    (match) => match[1]
  );
}

function includesEvery(source, fragments) {
  return fragments.every((fragment) => source.includes(fragment));
}

export function evaluateLayoutPhotography({ repoRoot, overrides = {} }) {
  const read = (relativePath) =>
    overrides[relativePath] ?? readFileSync(path.join(repoRoot, relativePath), "utf8");

  const suite = JSON.parse(read(".agents/evals/layout-photography-integration.json"));
  const photography = read("apps/www/src/data/photography.ts");
  const photoFigure = read("apps/www/src/components/PhotoFigure.tsx");
  const hero = read("apps/www/src/components/Hero.tsx");
  const home = read("apps/www/src/app/page.tsx");
  const about = read("apps/www/src/app/about/page.tsx");
  const operations = read("apps/www/src/app/work/technical-operations/page.tsx");
  const caseStudy = read("apps/www/src/components/CaseStudyLayout.tsx");
  const colophon = read("apps/www/src/app/colophon/page.tsx");
  const globals = read("apps/www/src/app/globals.css");
  const workCard = read("apps/www/src/components/WorkCard.tsx");
  const caseStudyBlocks = read("apps/www/src/components/CaseStudyBlocks.tsx");
  const mdxComponents = read("apps/www/mdx-components.tsx");
  const sundayDinner = read("apps/www/src/content/work/196-sunday-dinner.mdx");
  const publicSafety = read("scripts/check-public-safety.mjs");
  const reviewRegister = JSON.parse(read("docs/qa/layout-A/photo-review-register.json"));
  const browserQa = JSON.parse(read("docs/qa/layout-A/browser-qa.json"));

  const candidateIds = values(photography, "candidateId");
  const sources = values(photography, "src");
  const uniqueCandidates = new Set(candidateIds);
  const uniqueSources = new Set(sources);
  const weights = suite.evals.reduce((sum, item) => sum + item.weight, 0);
  const expectedLenses = [
    "Yolanda Cuomo",
    "Abbott Miller",
    "Gail Anderson",
    "Ingeborg Gerdes",
    "Zora Neale Hurston",
    "Vivian Gornick",
    "Margaret Morse",
    "Deborah Treisman"
  ];

  const assetChecks = sources.map((source) => {
    const assetPath = path.join(repoRoot, "apps/www/public", source);
    if (!existsSync(assetPath)) return false;
    const bytes = readFileSync(assetPath);
    return !bytes.includes(Buffer.from("Exif\0\0")) && !bytes.includes(Buffer.from("GPSInfo"));
  });
  const heldReviewItems = reviewRegister.heldAfterEditorialReview ?? [];
  const screenshotPaths = [
    "docs/qa/layout-A/home-desktop.png",
    "docs/qa/layout-A/home-mobile.png",
    "docs/qa/layout-A/fair-rent-desktop.png",
    "docs/qa/layout-A/about-mobile.png"
  ];

  const criteria = [
    {
      id: "suite-contract",
      pass:
        suite.version === 1 &&
        suite.suite_id === "layout-photography-integration" &&
        suite.evals.length === 8 &&
        weights === 100 &&
        suite.evals.every((item, index) =>
          item.id === `LAYOUT-00${index + 1}` &&
          item.lens === expectedLenses[index] &&
          item.criterion.trim().length > 0
        ) &&
        suite.human_gate?.required === true &&
        suite.human_gate?.machine_pass_is_not_clearance === true,
      detail: "The eight-lens suite totals 100 and preserves a mandatory human publication gate."
    },
    {
      id: "governed-photo-set",
      pass:
        candidateIds.length === 13 &&
        uniqueCandidates.size === 13 &&
        [...uniqueCandidates].every((id) => expectedCandidateIds.has(id)) &&
        [...expectedCandidateIds].every((id) => uniqueCandidates.has(id)) &&
        heldCandidateIds.every((id) => !photography.includes(id)) &&
        sources.length === 13 &&
        uniqueSources.size === 13,
      detail: "The 13-image projection matches the editorial selection and returns unidentified or identity-bearing material to the archive."
    },
    {
      id: "public-asset-safety",
      pass:
        assetChecks.length === 13 &&
        assetChecks.every(Boolean) &&
        sources.every((source) => /^\/photos\/[a-z0-9-]+\.jpg$/.test(source)),
      detail: "Every governed JPEG exists under public/photos and contains no EXIF or GPS marker."
    },
    {
      id: "metadata-and-boundary",
      pass:
        values(photography, "alt").length === 13 &&
        values(photography, "caption").length === 13 &&
        values(photography, "archiveLabel").length === 13 &&
        photography.includes('const publicationStatus = "branch-review" as const') &&
        includesEvery(photography, [
          "Final production publication remains subject",
          "exact crop",
          "caption",
          "credit",
          "rights",
          "consent",
          "dignity",
          "collective-credit review"
        ]),
      detail: "Each image has editorial metadata and the registry carries the final human-review boundary."
    },
    {
      id: "held-image-provenance",
      pass:
        heldReviewItems.length === 2 &&
        heldReviewItems.some((item) =>
          item.candidateId === "WEB-CAND-009" &&
          item.photoFieldworkId === "PHOTO-FIELDWORK-009"
        ) &&
        heldReviewItems.some((item) =>
          item.candidateId === "WEB-CAND-024" &&
          item.photoFieldworkId === "PHOTO-FIELDWORK-024"
        ) &&
        ["WEB-CAND-031", "WEB-CAND-033"].every((candidateId) => {
          const item = reviewRegister.items.find((entry) => entry.candidateId === candidateId);
          return item && !item.subjectClass.includes("without people");
        }),
      detail: "Held web candidates retain their Photo Fieldwork aliases, and people-bearing river scenes are classified honestly."
    },
    {
      id: "accessible-photo-component",
      pass: includesEvery(photoFigure, [
        "alt={photo.alt}",
        "<figcaption",
        "photo.caption",
        "photo.archiveLabel",
        "sizes={sizes}",
        "data-photo-id={photo.id}",
        "data-publication-status={photo.publicationStatus}"
      ]),
      detail: "The reusable figure exposes alt text, visible caption, archive label, stable sizing, and a QA identifier."
    },
    {
      id: "editorial-projection",
      pass:
        includesEvery(hero, ["photos.councilChamber", "alt={photo.alt}"]) &&
        home.includes("<WorkCard compact") &&
        !home.includes("photos.materialPractice") &&
        includesEvery(about, [
          "photos.cityPortrait",
          "photos.waterfrontPortrait",
          "photos.raftArrival",
          "photos.raftFog",
          "photos.raftDeltaQueen"
        ]) &&
        includesEvery(operations, [
          "photos.dclaMeeting",
          "photos.councilHearingRoom",
          "photos.fairRentHandbills"
        ]) &&
        includesEvery(caseStudy, [
          "projectLeadPhotos",
          "projectPhotoEssays",
          "Scenes of collective work",
          "They support collective context"
        ]) &&
        colophon.includes("photos.mirrorCamera") &&
        workCard.includes("compact = false"),
      detail: "Distinct image sequences support hiring, civic process, collective work, river practice, and archive method without decorative or identity-bearing substitutions."
    },
    {
      id: "human-index-theme",
      pass:
        includesEvery(globals, [
          'themes: human-index --default',
          'name: "human-index"',
          "--color-primary: #2f6f89",
          "--color-secondary: #4e6f61",
          "--color-accent: #c83b32",
          "--color-neutral: #222b36",
          "letter-spacing: 0",
          ".jb-dark-photo-section .jb-photo-caption"
        ]) &&
        !globals.includes("linear-gradient"),
      detail: "The work-jacket palette, editorial rules, zero tracking for reading text, and dark-caption contrast are explicit."
    },
    {
      id: "homepage-restraint",
      pass:
        home.includes("<WorkCard compact") &&
        workCard.includes("!compact ?") &&
        workCard.includes("Read case study") &&
        !home.includes("whatWasUnclear") &&
        !home.includes("whatBecameUsable"),
      detail: "The homepage introduces each project while the Work route retains its fuller evidence structure."
    },
    {
      id: "recursive-project-traces",
      pass: includesEvery(about, [
        "Status:",
        "Observed:",
        "Modeled:",
        "Interface:",
        "Use and feedback:",
        "Revision and handoff:",
        "Evidence boundary:",
        "Current / 2012-Present",
        "Current / 2017-Present",
        "Historical platform / 2010s",
        "Current / 2010s-Present",
        "governed 2023 residency handoff and 2025 operating sheet"
      ]),
      detail: "The About page exposes project-specific recursive stages, temporal status, and public evidence boundaries."
    },
    {
      id: "public-safe-operating-specimen",
      pass:
        includesEvery(caseStudyBlocks, [
          "HostingHandoffTemplate",
          "Observe",
          "Model",
          "Interface",
          "Use and notice",
          "Revise",
          "Hand off",
          "Publication boundary:",
          "names, contact information, attendance, addresses",
          "access credentials, private correspondence, or unapproved images"
        ]) &&
        mdxComponents.includes("HostingHandoffTemplate") &&
        includesEvery(sundayDinner, [
          "<HostingHandoffTemplate />",
          "public-safe derivative",
          "not a participant record",
          "protected source files"
        ]),
      detail: "The 196 page renders a real blank hosting handoff tool while excluding participant records and protected source material."
    },
    {
      id: "current-rendered-evidence",
      pass:
        browserQa.length === 14 &&
        browserQa.every((entry) =>
          entry.status === 200 &&
          entry.consoleErrors.length === 0 &&
          entry.pageErrors.length === 0 &&
          entry.scrollWidth <= entry.clientWidth &&
          entry.images.every((image) => image.complete && image.naturalWidth > 0) &&
          !JSON.stringify(entry).includes("hands-cutting-material.jpg") &&
          !JSON.stringify(entry).includes("welcome-196-artist.jpg")
        ) &&
        screenshotPaths.every((relativePath) =>
          existsSync(path.join(repoRoot, relativePath)) &&
          statSync(path.join(repoRoot, relativePath)).size > 100_000
        ),
      detail: "Four nonblank screenshots and fourteen current 200-response browser states contain no held-image references."
    },
    {
      id: "production-photo-gate",
      pass:
        publicSafety.includes("branch-review photography must receive exact-image human approval before production") &&
        publicSafety.includes("photography is enabled for branch review") &&
        publicSafety.includes("if (isProduction)"),
      detail: "Branch-review photography is visible for design review but hard-fails the production public-safety preflight."
    }
  ];

  return {
    pass: criteria.every((criterion) => criterion.pass),
    passed: criteria.filter((criterion) => criterion.pass).length,
    total: criteria.length,
    criteria
  };
}
