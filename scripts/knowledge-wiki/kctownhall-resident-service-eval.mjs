import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
export const repoRoot = path.resolve(scriptDir, "../..");

const paths = {
  project: "docs/knowledge-bank/projects/tired-of-tires-resident-service.md",
  intake: "docs/knowledge-bank/intake/2026-08-14-kcth-tired-of-tires-resident-service.md",
  source: "docs/knowledge-bank/sources/kc-town-hall-tired-of-tires-design-field-archive-2026.md",
  caseStudy: "apps/www/src/content/work/kc-town-hall.mdx",
  component: "apps/www/src/components/ResidentServiceSequence.tsx",
  photography: "apps/www/src/data/photography.ts",
  productResume:
    "resumes/2026-08-14/nyc-oti-senior-product-manager-782366/Jamie-Burkart-Resume-NYC-OTI-Senior-Product-Manager-782366.md",
  operationsResume:
    "resumes/2026-08-14/nyc-oti-technical-operations-manager-782369/Jamie-Burkart-Resume-NYC-OTI-Technical-Operations-Manager-782369.md"
};

const assets = [
  "apps/www/public/images/artifacts/kc-town-hall-tired-of-tires-flyer.webp",
  "apps/www/public/images/field-notes/kc-town-hall-tired-of-tires-before.webp",
  "apps/www/public/images/field-notes/kc-town-hall-tired-of-tires-after.webp"
];

function read(root, relative) {
  const file = path.join(root, relative);
  return existsSync(file) ? readFileSync(file, "utf8") : "";
}

export function loadCandidate(root = repoRoot) {
  return {
    project: read(root, paths.project),
    intake: read(root, paths.intake),
    source: read(root, paths.source),
    caseStudy: read(root, paths.caseStudy),
    component: read(root, paths.component),
    photography: read(root, paths.photography),
    productResume: read(root, paths.productResume),
    operationsResume: read(root, paths.operationsResume),
    assetPresence: Object.fromEntries(
      assets.map((asset) => [asset, existsSync(path.join(root, asset))])
    ),
    knowledgeBank: structuredClone(knowledgeBank)
  };
}

export function evaluateResidentService(candidate) {
  const failures = [];
  const check = (condition, message) => {
    if (!condition) failures.push(message);
  };
  const bank = candidate.knowledgeBank;
  const claim = bank.claims.find(
    (item) => item.id === "CLM-KCTH-TIRED-OF-TIRES-RESIDENT-SERVICE-SYSTEM"
  );
  const inquiry = bank.researchInquiries.find(
    (item) => item.id === "INQ-KCTH-TIRED-OF-TIRES-OWNERSHIP-AND-MEASUREMENT"
  );
  const workbook = bank.sources.find(
    (item) => item.id === "SRC-KCTH-TIRED-OF-TIRES-OPERATING-WORKBOOK-2019-2022"
  );
  const visualArchive = bank.sources.find(
    (item) => item.id === "SRC-KCTH-TIRED-OF-TIRES-DESIGN-FIELD-ARCHIVE-2019-2022"
  );
  const visualObservation = bank.observations.find(
    (item) => item.id === "OBS-KCTH-TIRED-OF-TIRES-GOVERNED-VISUAL-BRIDGE"
  );
  const publicText = [
    candidate.project,
    candidate.intake,
    candidate.source,
    candidate.caseStudy,
    candidate.component,
    candidate.photography,
    candidate.productResume,
    candidate.operationsResume
  ].join("\n");

  check(Boolean(claim), "resident-service claim is missing");
  check(Boolean(inquiry), "resident-service research inquiry is missing");
  check(Boolean(workbook), "protected operating-workbook source is missing");
  check(Boolean(visualArchive), "protected design-and-field archive source is missing");
  check(Boolean(visualObservation), "governed visual-bridge observation is missing");

  if (workbook) {
    check(
      workbook.visibility === "protected" && workbook.preservationStatus === "private",
      "operating workbook must remain protected and private"
    );
    check(
      !workbook.canonicalUrl && !workbook.archiveUrl && !workbook.assetUrl,
      "operating workbook must expose no public locator"
    );
    check(
      workbook.doesNotEstablish.some((item) => /derived aggregates/i.test(item)),
      "operating-workbook boundary must hold private-derived aggregates"
    );
  }

  if (visualArchive) {
    check(
      visualArchive.visibility === "protected" && visualArchive.preservationStatus === "private",
      "design-and-field archive must remain protected and private"
    );
    check(
      visualArchive.doesNotEstablish.some((item) => /photographer/i.test(item)) &&
        visualArchive.doesNotEstablish.some((item) => /blanket permission/i.test(item)),
      "visual archive must preserve photographer and occurrence-specific permission limits"
    );
  }

  if (claim) {
    check(
      claim.status === "confirmed-with-boundary",
      "resident-service claim must retain confirmed-with-boundary status"
    );
    check(
      claim.antiClaims.some((item) => /alone created or operated/i.test(item)),
      "resident-service claim must prohibit sole-credit language"
    );
    const productProjection = claim.projections.find(
      (item) => item.key === "resume-html"
    );
    const operationsProjection = claim.projections.find(
      (item) => item.key === "technical-operations"
    );
    check(
      Boolean(productProjection?.text) && candidate.productResume.includes(productProjection.text),
      "OTI Product resume must match its governed resident-service projection"
    );
    check(
      Boolean(operationsProjection?.text) && candidate.operationsResume.includes(operationsProjection.text),
      "OTI Operations resume must match its governed resident-service projection"
    );
  }

  for (const required of [
    "eligibility",
    "form and phone intake",
    "field collection",
    "City recycling",
    "direct participation",
    "individual authorship"
  ]) {
    check(
      candidate.project.toLowerCase().includes(required.toLowerCase()) ||
        candidate.intake.toLowerCase().includes(required.toLowerCase()),
      `resident-service documentation is missing ${required}`
    );
  }

  check(
    candidate.caseStudy.includes("<ResidentServiceSequence />"),
    "KC Town Hall case study must render the resident-service sequence"
  );
  check(
    candidate.component.includes("portfolioPhotos.kcTownHallTiredOfTiresFlyer") &&
      candidate.component.includes("portfolioPhotos.kcTownHallTiredOfTiresBefore") &&
      candidate.component.includes("portfolioPhotos.kcTownHallTiredOfTiresAfter"),
    "resident-service component must bind all three governed visual assets"
  );
  check(
    /public derivative excludes obsolete contact details/i.test(candidate.photography) &&
      /does not identify a resident/i.test(candidate.photography) &&
      /does not establish an audited program total/i.test(candidate.photography),
    "photography registry must retain contact, resident, and outcome boundaries"
  );
  check(
    (candidate.photography.match(/publicationStatus: "jamie-authorized"/g) ?? []).length >= 8,
    "all three resident-service assets must retain Jamie-authorized publication status"
  );
  check(
    Object.values(candidate.assetPresence).every(Boolean),
    "one or more governed resident-service visual assets are missing"
  );

  check(
    !/(?:docs\.google\.com|drive\.google\.com|18-kAX3Zu4CPa3RXYNtQfP9NGWcIFP-UaV2WkFQ0Qh_E)/i.test(
      publicText
    ),
    "public resident-service materials expose a private Drive locator"
  );
  check(
    !/(?:1,970|44,890)/.test(publicText),
    "public resident-service materials expose an unapproved private-workbook aggregate"
  );
  check(
    !/Jamie single-handedly (?:created|designed|operated)/i.test(publicText),
    "public resident-service materials overclaim sole authorship"
  );

  return {
    passed: failures.length === 0,
    failures,
    metrics: {
      sources: [workbook, visualArchive].filter(Boolean).length,
      visuals: Object.values(candidate.assetPresence).filter(Boolean).length,
      governedResumeProjections: claim?.projections?.filter((item) => item.status === "active").length ?? 0,
      publicDerivedAggregates: /(?:1,970|44,890)/.test(publicText) ? 1 : 0
    }
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const result = evaluateResidentService(loadCandidate());
  if (!result.passed) {
    console.error(`Tired of Tires resident-service eval failed:\n${result.failures.join("\n")}`);
    process.exit(1);
  }
  console.log(
    `Tired of Tires resident-service eval passed: ${result.metrics.sources} protected sources, ${result.metrics.visuals} governed visuals, ${result.metrics.governedResumeProjections} active resume projections, and no private-derived aggregate on the public surface.`
  );
}
