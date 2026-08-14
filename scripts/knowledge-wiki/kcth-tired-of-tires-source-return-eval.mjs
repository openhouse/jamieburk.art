import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import { kcTownHallTiredOfTiresSourceReturn } from "../../apps/www/src/data/knowledge-bank/kctownhall-tired-of-tires-source-return.ts";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
export const repoRoot = path.resolve(scriptDir, "../..");

const paths = {
  config: ".agents/evals/kcth-tired-of-tires-source-return.json",
  caseStudy: "apps/www/src/content/work/kc-town-hall.mdx",
  work: "apps/www/src/data/work.ts",
  projectDoc: "docs/knowledge-bank/projects/kc-town-hall.md",
  intakeDoc: "docs/knowledge-bank/intake/2026-08-14-kcth-tired-of-tires-source-return.md"
};

function read(root, relativePath) {
  return readFileSync(path.join(root, relativePath), "utf8");
}

export function loadCandidate(root = repoRoot) {
  const config = JSON.parse(read(root, paths.config));
  return {
    root,
    config,
    knowledgeBank: structuredClone(knowledgeBank),
    sourceReturn: structuredClone(kcTownHallTiredOfTiresSourceReturn),
    caseStudySource: read(root, paths.caseStudy),
    workSource: read(root, paths.work),
    projectDoc: read(root, paths.projectDoc),
    intakeDoc: read(root, paths.intakeDoc),
    artifactExists: Object.fromEntries(
      config.required.artifactPaths.map((artifactPath) => [
        artifactPath,
        existsSync(path.join(root, artifactPath))
      ])
    )
  };
}

export function evaluateKcthTireSourceReturn(candidate) {
  const failures = [];
  const criteria = [];
  const check = (criterionId, condition, message) => {
    criteria.push({ criterionId, pass: Boolean(condition), message });
    if (!condition) failures.push(`${criterionId}: ${message}`);
  };

  const { knowledgeBank: bank, config } = candidate;
  const byId = (items) => new Map(items.map((item) => [item.id, item]));
  const intakes = byId(bank.intakeItems);
  const observations = byId(bank.observations);
  const sources = byId(bank.sources);
  const claims = byId(bank.claims);
  const inquiries = byId(bank.researchInquiries);
  const relations = byId(bank.agencyRelations);
  const serviceClaim = claims.get("CLM-KCTH-TIRED-OF-TIRES-SERVICE-DESIGN");
  const measurementClaim = claims.get("CLM-KCTH-TIRED-OF-TIRES-MEASUREMENT");
  const designSource = sources.get("SRC-KCTH-TIRES-DESIGN-ARCHIVE-2019-2021");
  const trackerSource = sources.get("SRC-KCTH-TIRES-TRACKER-2019-2022");
  const page = bank.pages.find((item) => item.id === "kc-town-hall");

  const requiredCanonical =
    config.required.intakeIds.every((id) => intakes.has(id)) &&
    config.required.sourceIds.every((id) => sources.has(id)) &&
    config.required.claimIds.every((id) => claims.has(id)) &&
    config.required.inquiryIds.every((id) => inquiries.has(id)) &&
    config.required.relationIds.every((id) => relations.has(id));

  const evidenceClosed = config.required.claimIds.every((claimId) => {
    const claim = claims.get(claimId);
    return claim?.evidence.every((evidence) => {
      const source = sources.get(evidence.sourceId);
      return source && evidence.supports.every((support) => source.supportsGenerally.includes(support));
    });
  });

  const intakeClosed = config.required.intakeIds.every((intakeId) => {
    const intake = intakes.get(intakeId);
    return intake &&
      intake.sourceIds.every((id) => sources.has(id)) &&
      intake.observationIds.every((id) => observations.has(id)) &&
      intake.researchInquiryIds.every((id) => inquiries.has(id)) &&
      intake.boundaries.length >= 3;
  });

  const relationClosed = config.required.relationIds.every((relationId) => {
    const relation = relations.get(relationId);
    return relation &&
      relation.claimIds.every((id) => claims.has(id)) &&
      relation.sourceIds.every((id) => sources.has(id)) &&
      relation.sourceSupportKeys.every((support) =>
        relation.sourceIds.some((sourceId) => sources.get(sourceId)?.supportsGenerally.includes(support))
      ) &&
      relation.boundaries.length >= 2;
  });

  check(
    "KCTH-TIRES-EVAL-SOURCE-CLOSURE",
    requiredCanonical && evidenceClosed && intakeClosed && relationClosed,
    "source-return records, evidence strings, intake links, claims, inquiries, and agency relations must close against canonical IDs"
  );

  const measurementText = [
    measurementClaim?.internalClaim,
    ...(measurementClaim?.projections.map((projection) => projection.text) ?? []),
    ...(measurementClaim?.boundaries ?? [])
  ].join("\n");
  const measurementBounded = Boolean(
    measurementClaim?.status === "confirmed-with-boundary" &&
    measurementClaim.projections.some((projection) =>
      projection.status === "active" &&
      projection.surfaces.includes("/work/kc-town-hall") &&
      /project-maintained tracker/i.test(projection.text) &&
      /1,970 tires/i.test(projection.text) &&
      /May 2019 through September 2022/i.test(projection.text) &&
      /estimates \$44,890/i.test(projection.text) &&
      /stated assumptions/i.test(projection.text)
    ) &&
    /not audited City data/i.test(measurementText) &&
    /not.*unique residents|do not translate tires into unique residents/i.test(measurementText) &&
    trackerSource?.visibility === "protected" &&
    trackerSource.protectedLocatorId &&
    !trackerSource.canonicalUrl &&
    !trackerSource.archiveUrl &&
    !trackerSource.assetUrl
  );
  check(
    "KCTH-TIRES-EVAL-MEASUREMENT-BOUNDARY",
    measurementBounded,
    "measurement projection must retain project-maintained, 1,970, $44,890 estimate, date range, assumptions, non-audit, and non-unique-resident boundaries"
  );

  const serviceProjection = serviceClaim?.projections.find((projection) =>
    projection.status === "active" && projection.surfaces.includes("/work/kc-town-hall")
  );
  const serviceText = [
    serviceClaim?.internalClaim,
    serviceProjection?.text,
    ...(serviceClaim?.boundaries ?? []),
    ...(serviceClaim?.antiClaims ?? [])
  ].join("\n");
  const collectiveCredit = Boolean(
    serviceClaim?.status === "confirmed-with-boundary" &&
    /helped design and operate Tired of Tires/i.test(serviceProjection?.text ?? "") &&
    /KC Town Hall/i.test(serviceProjection?.text ?? "") &&
    /Oak Park Neighborhood Association/i.test(serviceProjection?.text ?? "") &&
    /residents/i.test(serviceProjection?.text ?? "") &&
    /City partners/i.test(serviceProjection?.text ?? "") &&
    /driver for the May 2019 launch pickup/i.test(serviceProjection?.text ?? "") &&
    /not sole credit|does not assign sole credit|Jamie alone/i.test(serviceText) &&
    !/(?:Jamie|he) alone (?:designed|operated|created|ran)/i.test(serviceProjection?.text ?? "")
  );
  check(
    "KCTH-TIRES-EVAL-COLLECTIVE-CREDIT",
    collectiveCredit,
    "public copy must preserve Jamie's helped-design-and-operate and launch-driving roles alongside explicit collective credit and no sole credit"
  );

  const publicSurfaceText = `${candidate.caseStudySource}\n${candidate.workSource}`;
  const contactLeak = /\b\d{3}[- .]\d{3}[- .]\d{4}\b/.test(publicSurfaceText) ||
    /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(publicSurfaceText) ||
    /\b\d{3,5}\s+(?:North|South|East|West|N\.?|S\.?|E\.?|W\.?)?\s*[A-Z][A-Za-z]+\s+(?:Street|St\.?|Avenue|Ave\.?|Road|Rd\.?|Boulevard|Blvd\.?)\b/i.test(publicSurfaceText) ||
    /ARCHIVE-KCTH-TIRES|RESEARCH-KCTH-TIRES/i.test(publicSurfaceText);
  const privacyBounded = !contactLeak &&
    /Resident names, addresses, requests, and[\s\S]{0,80}contact details remain private/i.test(candidate.caseStudySource) &&
    /Resident names, addresses, requests, phone numbers, email addresses/i.test(candidate.workSource);
  check(
    "KCTH-TIRES-EVAL-RESIDENT-PRIVACY",
    privacyBounded,
    "public surface contains resident contact data, a phone, email, street address, protected locator, or lacks an explicit privacy boundary"
  );

  const tireArtifact = "/images/artifacts/kc-town-hall-tired-of-tires-handbill-2021.webp";
  const surveyArtifact = "/images/artifacts/kc-town-hall-neighborhood-survey-handbill-2019.webp";
  const artifactGovernance = Boolean(
    config.required.artifactPaths.every((artifactPath) => candidate.artifactExists[artifactPath]) &&
    candidate.workSource.includes(tireArtifact) &&
    candidate.workSource.includes(surveyArtifact) &&
    /Historic artifact, not a current service notice/i.test(candidate.workSource) &&
    /excluding obsolete phone and email details/i.test(candidate.workSource) &&
    /Blank form labels remain visible; obsolete contact details and all resident response data are excluded/i.test(candidate.workSource) &&
    designSource?.visibility === "protected" &&
    designSource.media?.rightsStatus === "cleared" &&
    designSource.media?.consentStatus === "not-applicable" &&
    designSource.media?.publicDisplayStatus === "cleared" &&
    /exact public-safe portfolio derivatives/i.test(sources.get("SRC-KCTH-TIRES-DESIGN-AUTHORIZATION-2026")?.supportsGenerally.join(" ") ?? "")
  );
  check(
    "KCTH-TIRES-EVAL-ARTIFACT-GOVERNANCE",
    artifactGovernance,
    "both Tired of Tires handbill and survey handbill must exist with historical labeling, obsolete-contact exclusion, and exact cleared public-display disposition"
  );

  const serviceBlueprint = Boolean(
    candidate.caseStudySource.includes("## A resident service, end to end") &&
    /4×6 handbill and web page explained the service/i.test(candidate.caseStudySource) &&
    /Field pickup moved tires/i.test(candidate.caseStudySource) &&
    /City coordination made a no-fee recycling handoff/i.test(candidate.caseStudySource) &&
    /protected tracker recorded monthly counts/i.test(candidate.caseStudySource) &&
    /paired 4×6 survey carried neighborhood priorities back into planning/i.test(candidate.caseStudySource) &&
    candidate.caseStudySource.includes("CLM-KCTH-TIRED-OF-TIRES-SERVICE-DESIGN") &&
    candidate.caseStudySource.includes("CLM-KCTH-TIRED-OF-TIRES-MEASUREMENT") &&
    page?.occurrences.some((occurrence) => occurrence.id === "tired-of-tires-service-design") &&
    page?.occurrences.some((occurrence) =>
      occurrence.id === "tired-of-tires-measurement" && !occurrence.sourceIds
    ) &&
    page?.sourceOrder.includes("SRC-KCTH-TIRES-WAYBACK-2021") &&
    !page?.sourceOrder.includes("SRC-KCTH-TIRES-TRACKER-2019-2022") &&
    measurementClaim?.projections.some((projection) =>
      projection.key === "case-study" && projection.citationRequired === false
    )
  );
  check(
    "KCTH-TIRES-EVAL-SERVICE-BLUEPRINT",
    serviceBlueprint,
    "case study must make the resident promise, field delivery, City handoff, measurement, survey feedback loop, claims, and citation occurrences legible"
  );

  const documentationComplete =
    candidate.projectDoc.includes("## Tired of Tires Resident Service Source Return") &&
    candidate.projectDoc.includes("1,970 tires") &&
    candidate.projectDoc.includes("$44,890") &&
    candidate.projectDoc.includes("../intake/2026-08-14-kcth-tired-of-tires-source-return.md") &&
    candidate.intakeDoc.includes("## Resident-service blueprint") &&
    candidate.intakeDoc.includes("## Agency and collective credit") &&
    candidate.intakeDoc.includes("## Employment relevance") &&
    config.required.inquiryIds.every((id) => candidate.intakeDoc.includes(id));
  check(
    "KCTH-TIRES-EVAL-DOCUMENTATION",
    documentationComplete,
    "project page and intake record must preserve the result, method, agency, employment relevance, and open research inquiries"
  );

  return {
    name: config.name,
    pass: failures.length === 0,
    criteria,
    failures
  };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const result = evaluateKcthTireSourceReturn(loadCandidate());
  console.log(JSON.stringify(result, null, 2));
  if (!result.pass) process.exitCode = 1;
}
