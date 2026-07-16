import { readFileSync } from "node:fs";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import { campaignPressCatalogExpectations } from "../../apps/www/src/data/knowledge-bank/campaign-press-2026-07-14.ts";

const wowListFullPopulation = JSON.parse(
  readFileSync(
    new URL(
      "../../apps/www/src/data/knowledge-bank/fixtures/wowlist-full-population.json",
      import.meta.url
    ),
    "utf8"
  )
);

const kcTownHallFullPopulation = JSON.parse(
  readFileSync(
    new URL(
      "../../apps/www/src/data/knowledge-bank/fixtures/kctownhall-full-population.json",
      import.meta.url
    ),
    "utf8"
  )
);

const nycArtCFullPopulation = JSON.parse(
  readFileSync(
    new URL(
      "../../docs/knowledge-bank/data/nycartc-public-post-ledger.json",
      import.meta.url
    ),
    "utf8"
  )
);

const nycArtCInboundEngagement = JSON.parse(
  readFileSync(
    new URL(
      "../../docs/knowledge-bank/data/nycartc-public-engagement-ledger.json",
      import.meta.url
    ),
    "utf8"
  )
);

const urbanhermitFullPopulation = JSON.parse(
  readFileSync(
    new URL(
      "../../docs/knowledge-bank/corpora/urbanhermit-x-population-ledger-2026-07-15.json",
      import.meta.url
    ),
    "utf8"
  )
);

export const requiredSeedIntakeIds = [
  "INTAKE-WATERWAYS-PITCH-HUCK-FINN-2026",
  "INTAKE-WATERWAYS-CHARLOTTE-GREAT-ACCOMMODATIONS-2026",
  "INTAKE-OPEN-HOUSE-GOOD-TIMES-2026",
  "INTAKE-NYCAC-GOTHAMIST-CABARET-2026",
  "INTAKE-NYCAC-NPR-NIGHTLIFE-2026",
  "INTAKE-CALLNYC-COUNCIL-TWITTER-ENGAGEMENT-2026",
  "INTAKE-NYCAC-FOUNDING-ROLE-2026",
  "INTAKE-NYCAC-CABARET-REPEAL-ROLE-2026",
  "INTAKE-NYCAC-OFFICE-NIGHTLIFE-ROLE-2026",
  "INTAKE-NYCAC-TOWN-HALLS-2026",
  "INTAKE-NYCAC-TALKS-NOT-RAIDS-2026",
  "INTAKE-WATERWAYS-RAFT-TO-GULF-2026",
  "INTAKE-WATERWAYS-PARTICIPATORY-PROGRAMS-2026",
  "INTAKE-GREENE-HILL-QA-2026",
  "INTAKE-WATERWAYS-WLBT-VICKSBURG-2026",
  "INTAKE-WATERWAYS-PITCH-GULF-FOLLOWUP-2026",
  "INTAKE-NYCAC-MIXMAG-CABARET-2026",
  "INTAKE-NYCAC-BEDFORD-TOWN-HALL-2026",
  "INTAKE-NYCAC-CREATENYC-APPENDIX-2026",
  "INTAKE-NYCAC-SBJSA-TRANSCRIPT-2026",
  "INTAKE-KC-TOWN-HALL-CCED-MINUTES-2026",
  "INTAKE-KC-TOWN-HALL-COUNCIL-RESOLUTION-190649-2026",
  "INTAKE-KC-TOWN-HALL-COUNCIL-ORDINANCE-190642-2026",
  "INTAKE-KC-TOWN-HALL-CCED-PROJECT-UPDATE-2022-2026",
  "INTAKE-KC-TOWN-HALL-WITHDRAWAL-2026",
  "INTAKE-KC-TOWN-HALL-MISSION-ALIGNED-TRANSITION-2026",
  "INTAKE-KCTH-PHASE-ONE-FIELD-PRACTICE-2026",
  "INTAKE-KCTH-NEIGHBORHOOD-SURVEY-SYSTEM-2026",
  "INTAKE-KCTH-TIRED-OF-TIRES-OPERATIONS-2026",
  "INTAKE-KCTH-CLEVELAND-AND-PRO-BONO-DESIGN-2026",
  "INTAKE-CLAUDETTE-AR-COLLABORATION-2026",
  "INTAKE-NTERCHNG-PROJECT-SITE-2026",
  "INTAKE-NTERCHNG-ANH-INCLUSION-2026",
  "INTAKE-NTERCHNG-ANH-INSTALLER-WORKING-DOC-2026",
  "INTAKE-NTERCHNG-EXHIBIT-INFORMATION-WORKING-DOC-2026",
  "INTAKE-ANH-NERMAN-CONTEXT-2026",
  "INTAKE-WOWLIST-FULL-POPULATION-2026",
  "INTAKE-KCTOWNHALL-FULL-POPULATION-2026",
  "INTAKE-NYCARTC-X-FULL-POPULATION-2026"
];

export const requiredResearchSourceIds = [
  "SRC-COMMUNITY-GREENE-HILL-QA-2017",
  "SRC-WATERWAYS-WLBT-VICKSBURG-2007",
  "SRC-WATERWAYS-PITCH-GULF-FOLLOWUP-2009",
  "SRC-NYCAC-MIXMAG-CABARET-HEARING-2017",
  "SRC-NYCAC-BEDFORD-NIGHT-MAYOR-TOWN-HALL-2017",
  "SRC-NYCAC-CREATENYC-APPENDIX-2017",
  "SRC-NYCAC-NYC-COUNCIL-SBJSA-TRANSCRIPT-2018",
  "SRC-KC-TOWN-HALL-CCED-MINUTES-2019",
  "SRC-KC-TOWN-HALL-COUNCIL-RESOLUTION-190649",
  "SRC-KC-TOWN-HALL-COUNCIL-ORDINANCE-190642",
  "SRC-KC-TOWN-HALL-CCED-PROJECT-UPDATE-2022",
  "SRC-KC-TOWN-HALL-WITHDRAWAL-ORDINANCE-2024",
  "SRC-KCTH-TIRED-OF-TIRES-ARCHIVE-2020",
  "SRC-KCTH-TIRED-OF-TIRES-UPDATE-2019",
  "SRC-CLAUDETTE-MICHAEL-REES-AR-COLLABORATION",
  "SRC-NTERCHNG-PROJECT-SITE-2011",
  "SRC-NTERCHNG-ANH-ARTIST-PAGE-2011",
  "SRC-NTERCHNG-ANH-VISUAL-ARTISTS-INDEX-2011",
  "SRC-ANH-NERMAN-MUSEUM-2011"
];

export const requiredArchiveSourceIds = [
  "SRC-CRS-RUNNING-MINUTES-2026-05-14",
  "SRC-CRS-LEGISLATIVE-PROVENANCE-REDLINE-2026-05-17",
  "SRC-CRS-PUBLIC-BASELINE-HANDOUT-2026-03-27",
  "SRC-CRS-90-DAY-ACTION-PLAN-2026-04-06",
  "SRC-JPH-KANSAS-CITY-STAR-RAFT-2007-11-15",
  "SRC-SUNDAY-DINNER-RSVP-LIVE",
  "SRC-JOB-HUNT-SOURCE-BACKED-MEMORY-PROPOSAL-2026-06-26",
  "SRC-JOB-HUNT-CONTEXT-OUTLINE-2026-07-03"
];

export const requiredArchiveClaimIds = [
  "CLM-CRS-RUNNING-MEMORY-IN-USE-2026",
  "CLM-CRS-PROVENANCE-REDLINE-2026",
  "CLM-CRS-PUBLIC-BASELINE-PILOT-2026",
  "CLM-CRS-OPERATING-PLAN-2026",
  "CLM-WATERWAYS-KANSAS-CITY-STAR-FEATURE-2007",
  "CLM-SUNDAY-DINNER-LIVE-RSVP",
  "CLM-SOURCE-BACKED-MEMORY-PILOT-DESIGN-2026"
];

export const requiredArchiveIntakeIds = [
  "INTAKE-CRS-RUNNING-MINUTES-2026",
  "INTAKE-CRS-PROVENANCE-REDLINE-2026",
  "INTAKE-CRS-PUBLIC-BASELINE-HANDOUT-2026",
  "INTAKE-CRS-90-DAY-ACTION-PLAN-2026",
  "INTAKE-JPH-KANSAS-CITY-STAR-RAFT-2026",
  "INTAKE-SUNDAY-DINNER-LIVE-RSVP-2026",
  "INTAKE-JOB-HUNT-SOURCE-BACKED-MEMORY-PROPOSAL-2026",
  "INTAKE-JOB-HUNT-CONTEXT-OUTLINE-2026",
  "INTAKE-ICLOUD-TEAMS-MATERIALIZATION-2026"
];

export const requiredArchiveInquiryIds = [
  "INQ-JOB-HUNT-QUANTIFIED-CLAIMS-2026",
  "INQ-JOB-HUNT-SOURCE-BACKED-MEMORY-OUTCOME-2026",
  "INQ-ICLOUD-TEAMS-MATERIALIZATION-2026"
];

export const requiredSharedDriveSourceIds = [
  "SRC-GDRIVE-SHARED-DRIVE-INVENTORY-2026-07-14",
  "SRC-GDRIVE-FAIR-RENT-WEB-NOTES-2023",
  "SRC-GDRIVE-CRS-OUTREACH-TRACKER-2026-02",
  "SRC-GDRIVE-FAIR-RENT-ACTION-LAB-MINUTES-2026-02-25",
  "SRC-GDRIVE-COMPTROLLER-DATA-BRIEF-2026-05",
  "SRC-GDRIVE-196-RESIDENCY-ACCEPTANCE-2023",
  "SRC-GDRIVE-SUNDAY-DINNER-OPERATIONS-2025-2026",
  "SRC-GDRIVE-NYCAC-RESEARCH-DRAFT-2025",
  "SRC-GDRIVE-VISUAL-ASSET-SAMPLE-2026-07-14"
];

export const requiredSharedDriveClaimIds = [
  "CLM-FAIR-RENT-WEB-LAUNCH-RUNBOOK-2023",
  "CLM-CRS-STAKEHOLDER-OPS-TRACKER-2026",
  "CLM-CRS-ALIGNMENT-RECORD-2026",
  "CLM-CRS-COMPTROLLER-SCOPING-BRIEF-2026",
  "CLM-196-RESIDENCY-ONBOARDING-2023",
  "CLM-SUNDAY-DINNER-CONTINUITY-SYSTEM-2025"
];

export const requiredSharedDriveIntakeIds = [
  "INTAKE-GDRIVE-SHARED-DRIVE-INVENTORY-2026",
  "INTAKE-GDRIVE-FAIR-RENT-WEB-NOTES-2023",
  "INTAKE-GDRIVE-CRS-OUTREACH-TRACKER-2026",
  "INTAKE-GDRIVE-FAIR-RENT-ACTION-LAB-MINUTES-2026",
  "INTAKE-GDRIVE-COMPTROLLER-DATA-BRIEF-2026",
  "INTAKE-GDRIVE-196-RESIDENCY-ACCEPTANCE-2023",
  "INTAKE-GDRIVE-SUNDAY-DINNER-OPERATIONS-2025",
  "INTAKE-GDRIVE-NYCAC-RESEARCH-DRAFT-2025",
  "INTAKE-GDRIVE-VISUAL-ASSET-SAMPLE-2026"
];

export const requiredSharedDriveInquiryIds = [
  "INQ-GDRIVE-PROFESSIONAL-COVERAGE-2026",
  "INQ-GDRIVE-NYCAC-SOURCE-DECOMPOSITION-2026",
  "INQ-GDRIVE-VISUAL-ASSET-RIGHTS-2026",
  "INQ-GDRIVE-QUANTIFIED-PARTICIPATION-CLAIMS-2026"
];

export const requiredSocialAccountIds = [
  "SOCIAL-CALLNYC-X",
  "SOCIAL-NYCARTC-X",
  "SOCIAL-WOWLIST-X",
  "SOCIAL-KCTOWNHALL-X"
];

export const requiredSocialClaimIds = [
  "CLM-PROJECT-SOCIAL-IDENTITY-SYSTEMS",
  "CLM-CALLNYC-COUNCIL-ACCOUNT-ENGAGEMENT-2016",
  "CLM-NYCARTC-SHARED-CAMPAIGN-IDENTITY",
  "CLM-NYCARTC-COUNCIL-ACCOUNT-ENGAGEMENT",
  "CLM-NYCARTC-FULL-PROFILE-DISPOSITION",
  "CLM-NYCARTC-SOURCE-ROUTING-CONTINUITY",
  "CLM-NYCARTC-STAKEHOLDER-EXCHANGE-FLOOR",
  "CLM-WOWLIST-PUBLIC-ORIGIN-AND-USE",
  "CLM-WOWLIST-FULL-POPULATION-PRACTICE",
  "CLM-WOWLIST-SOCIAL-PRODUCT-SUPPORT",
  "CLM-WOWLIST-SUNDAY-DINNER-LINEAGE",
  "CLM-WOWLIST-CIVIC-DISTRIBUTION-ADAPTATION",
  "CLM-WOWLIST-ORGANIZER-PRODUCT-USE",
  "CLM-WOWLIST-JAMIE-PEER-ATTRIBUTION",
  "CLM-WOWLIST-CALENDAR-COMMUNITY-DIALOGUE",
  "CLM-WOWLIST-ARCHIVED-HOME-POSITIONING",
  "CLM-WOWLIST-HISTORICAL-SCALE-SNAPSHOT",
  "CLM-WOWLIST-SOURCE-CURATION-PRACTICE",
  "CLM-KCTOWNHALL-DURABLE-PUBLIC-IDENTITY",
  "CLM-KCTOWNHALL-ACCOUNT-ESTABLISHMENT-ROLE",
  "CLM-KCTOWNHALL-FULL-POPULATION-PRACTICE",
  "CLM-KCTOWNHALL-RESIDENT-INPUT-SURFACE",
  "CLM-KCTOWNHALL-TIRE-OPERATING-PATTERN",
  "CLM-KCTOWNHALL-TIRE-DROPOFF-CORROBORATION",
  "CLM-KCTOWNHALL-COUNCIL-RESPONSE-FLOOR",
  "CLM-KCTOWNHALL-CIVIC-RESOURCE-CURATION",
  "CLM-KCTOWNHALL-VISIBLE-ENGAGEMENT-SNAPSHOT"
];

export const requiredSocialInquiryIds = [
  "INQ-PROJECT-SOCIAL-ACCOUNT-INVENTORY-2026",
  "INQ-NYCARTC-COUNCIL-ENGAGEMENT-2026",
  "INQ-NYCARTC-OWNER-ARCHIVE-2026",
  "INQ-PROJECT-SOCIAL-POST-AUTHORSHIP-2026",
  "INQ-WOWLIST-SOCIAL-ARCHIVE-2026",
  "INQ-WOWLIST-FULL-POPULATION-2026",
  "INQ-KCTOWNHALL-SOCIAL-ARCHIVE-2026",
  "INQ-KCTOWNHALL-FULL-POPULATION-2026"
];

export const requiredNYCArtCXArchivalSourceIds = [
  "SRC-X-NYCARTC-FULL-POPULATION-LEDGER-2026",
  "SRC-X-NYCARTC-INBOUND-ENGAGEMENT-LEDGER-2026",
  "SRC-HELL-GATE-WHO-LEADS-NIGHTCLUB-RAIDS-2023",
  "SRC-NYT-COMMERCIAL-RENTS-SURGING-2023",
  "SRC-HELL-GATE-LUCYS-EVICTION-2024",
  "SRC-HELL-GATE-SAINT-VITUS-RAID-2024",
  "SRC-HELL-GATE-NIGHTCLUB-RAIDS-2025",
  "SRC-CITY-STATE-COMMERCIAL-RENT-2026",
  "SRC-GOTHAMIST-SMALL-BUSINESS-RENT-CONTROL-2026",
  "SRC-BUSHWICK-DAILY-LEASE-RENEWALS-2026"
];

export const requiredNYCArtCXArchivalClaimIds = [
  "CLM-NYCARTC-FULL-PROFILE-DISPOSITION",
  "CLM-NYCARTC-SOURCE-ROUTING-CONTINUITY",
  "CLM-NYCARTC-STAKEHOLDER-EXCHANGE-FLOOR"
];

export const requiredUrbanhermitSourceIds = [
  "SRC-URBANHERM-X-POPULATION-LEDGER-2026-07-15",
  "SRC-URBANHERM-X-AUTHENTICATED-CAPTURE-2026-07-15",
  "SRC-URBANHERM-X-HORSE-LORDS-POST-2016",
  "SRC-URBANHERM-X-DREW-HORSE-LORDS-2016",
  "SRC-URBANHERM-X-JULIA-HORSE-LORDS-2016",
  "SRC-URBANHERM-NPR-HORSE-LORDS-2016",
  "SRC-URBANHERM-X-JULIA-EIGHTH-STREET-TUNNEL-2016",
  "SRC-URBANHERM-KCUR-EIGHTH-STREET-TUNNEL-2016",
  "SRC-URBANHERM-X-ALIZA-CABARET-REPEAL-2017",
  "SRC-URBANHERM-X-NYCARTC-SAVE-SPACES-QUOTE-2017",
  "SRC-URBANHERM-X-NYCARTC-NIGHTLIFE-QUOTE-2017",
  "SRC-URBANHERM-X-NYCARTC-TOWN-HALL-QUOTE-2017",
  "SRC-URBANHERM-BROOKLYN-EAGLE-NIGHTLIFE-2017",
  "SRC-URBANHERM-X-KCTH-TIRES-2019",
  "SRC-URBANHERM-X-JIMMY-TIRES-2022",
  "SRC-URBANHERM-X-DAWNIA-INTRODUCTIONS-2023"
];

export const requiredUrbanhermitClaimIds = [
  "CLM-URBANHERM-X-PERSONAL-PUBLIC-WORKING-SURFACE",
  "CLM-URBANHERM-X-BOUNDED-STAKEHOLDER-RESPONSE",
  "CLM-URBANHERM-X-VISIBLE-TRACTION-SNAPSHOT",
  "CLM-URBANHERM-HORSE-LORDS-TRUTHERS-VIDEO",
  "CLM-URBANHERM-EIGHTH-STREET-TUNNEL-PROGRAM",
  "CLM-URBANHERM-NYCAC-PUBLIC-SPEAKER-ATTRIBUTION",
  "CLM-URBANHERM-KCTH-TIRE-PICKUP-PARTICIPATION",
  "CLM-URBANHERM-CREATIVE-COMMUNITY-INTRODUCTIONS"
];

export const requiredUrbanhermitIntakeIds = [
  "INTAKE-URBANHERM-X-FULL-POPULATION-2026",
  "INTAKE-URBANHERM-X-MISSION-SOURCES-2026",
  "INTAKE-URBANHERM-NPR-HORSE-LORDS-2016",
  "INTAKE-URBANHERM-KCUR-EIGHTH-STREET-TUNNEL-2016",
  "INTAKE-URBANHERM-BROOKLYN-EAGLE-NIGHTLIFE-2017"
];

export const requiredUrbanhermitInquiryIds = [
  "INQ-URBANHERM-X-OWNER-ARCHIVE-2026",
  "INQ-URBANHERM-X-POSTED-SOURCE-MATURATION-2026"
];

const blockedPublicRepoMarkers = [
  "/Users/",
  "/Volumes/",
  "/private/tmp/",
  "file://",
  "supporting-materials",
  "raw transcript"
];

function duplicates(values) {
  return [...new Set(values.filter((value, index) => values.indexOf(value) !== index))];
}

function normalizedUrl(value) {
  const url = new URL(value);
  url.hash = "";
  for (const key of [...url.searchParams.keys()]) {
    if (/^(?:utm_|fbclid|gclid)/i.test(key)) url.searchParams.delete(key);
  }
  url.hostname = url.hostname.replace(/^www\./, "");
  url.pathname = url.pathname.replace(/\/+$/, "") || "/";
  return url.toString().replace(/\/$/, "");
}

export function validateKnowledgeIntake() {
  const errors = [];
  const coverageErrors = [];
  const researchErrors = [];
  const dispositionErrors = [];
  const projectionErrors = [];
  const pressErrors = [];
  const kcTownHallErrors = [];
  const archiveProductionErrors = [];
  const sharedDriveProductionErrors = [];
  const socialMediaProductionErrors = [];
  const nycArtCXArchivalProductionErrors = [];
  const urbanhermitProductionErrors = [];
  const intakeIds = knowledgeBank.intakes.map(({ id }) => id);
  const intakeIdSet = new Set(intakeIds);
  const sourceById = new Map(knowledgeBank.sources.map((source) => [source.id, source]));
  const claimById = new Map(knowledgeBank.claims.map((claim) => [claim.id, claim]));
  const inquiryById = new Map(
    knowledgeBank.researchInquiries.map((inquiry) => [inquiry.id, inquiry])
  );
  const socialAccountById = new Map(
    knowledgeBank.socialAccounts.map((account) => [account.id, account])
  );

  for (const id of duplicates(intakeIds)) {
    coverageErrors.push(`Duplicate intake ID: ${id}`);
  }

  for (const id of requiredSeedIntakeIds) {
    if (!intakeIdSet.has(id)) coverageErrors.push(`Missing required intake: ${id}`);
  }

  for (const id of requiredArchiveIntakeIds) {
    if (!intakeIdSet.has(id)) archiveProductionErrors.push(`Missing required archive intake: ${id}`);
  }

  for (const id of requiredArchiveSourceIds) {
    const source = sourceById.get(id);
    if (!source) {
      archiveProductionErrors.push(`Missing required archive source: ${id}`);
      continue;
    }
    if (!source.supportsGenerally.length || !source.doesNotEstablish.length) {
      archiveProductionErrors.push(`${id} needs explicit support and does-not-establish boundaries`);
    }
    const linkedIntakes = knowledgeBank.intakes.filter((intake) => intake.sourceIds.includes(id));
    const linkedClaims = knowledgeBank.claims.filter((claim) =>
      claim.evidence.some((evidence) => evidence.sourceId === id)
    );
    const linkedInquiries = knowledgeBank.researchInquiries.filter((inquiry) =>
      inquiry.sourceIds.includes(id)
    );
    if (!linkedIntakes.length || (!linkedClaims.length && !linkedInquiries.length)) {
      archiveProductionErrors.push(`${id} needs an intake edge and a claim or inquiry edge`);
    }
  }

  for (const id of requiredArchiveClaimIds) {
    if (!claimById.has(id)) archiveProductionErrors.push(`Missing required archive claim: ${id}`);
  }
  for (const id of requiredArchiveInquiryIds) {
    if (!inquiryById.has(id)) archiveProductionErrors.push(`Missing required archive inquiry: ${id}`);
  }

  const archiveRecordSet = [
    ...requiredArchiveIntakeIds.map((id) => knowledgeBank.intakes.find((record) => record.id === id)),
    ...requiredArchiveSourceIds.map((id) => sourceById.get(id)),
    ...requiredArchiveClaimIds.map((id) => claimById.get(id)),
    ...requiredArchiveInquiryIds.map((id) => inquiryById.get(id))
  ].filter(Boolean);
  const serializedArchiveRecords = JSON.stringify(archiveRecordSet);
  for (const marker of blockedPublicRepoMarkers) {
    if (serializedArchiveRecords.toLowerCase().includes(marker.toLowerCase())) {
      archiveProductionErrors.push(`Archive production records contain blocked public-repo marker: ${marker}`);
    }
  }

  const selectedArchiveClaimIds = new Set([
    "CLM-CRS-RUNNING-MEMORY-IN-USE-2026",
    "CLM-CRS-PROVENANCE-REDLINE-2026",
    "CLM-CRS-PUBLIC-BASELINE-PILOT-2026"
  ]);
  for (const claimId of requiredArchiveClaimIds) {
    const claim = claimById.get(claimId);
    const activeProjections = claim?.projections.filter((projection) => projection.status === "active") ?? [];
    if (selectedArchiveClaimIds.has(claimId) && activeProjections.length !== 1) {
      archiveProductionErrors.push(`${claimId} must have exactly one selected active projection`);
    }
    if (!selectedArchiveClaimIds.has(claimId) && activeProjections.length) {
      archiveProductionErrors.push(`${claimId} must remain unsurfaced or held in this archive pass`);
    }
  }

  for (const claimId of [
    "CLM-CRS-RUNNING-MEMORY-IN-USE-2026",
    "CLM-CRS-PROVENANCE-REDLINE-2026"
  ]) {
    const claim = claimById.get(claimId);
    const evidence = claim?.evidence[0];
    const projection = claim?.projections.find((item) => item.status === "active");
    if (
      evidence?.relationship !== "private-support" ||
      evidence.renderCitation ||
      projection?.citationRequired
    ) {
      archiveProductionErrors.push(`${claimId} must project only a non-cited public-safe summary of private support`);
    }
  }

  const publicBaselineSource = sourceById.get("SRC-CRS-PUBLIC-BASELINE-HANDOUT-2026-03-27");
  const publicBaselineClaim = claimById.get("CLM-CRS-PUBLIC-BASELINE-PILOT-2026");
  const publicBaselineProjection = publicBaselineClaim?.projections.find((item) => item.status === "active");
  const publicBaselineEvidence = publicBaselineClaim?.evidence.find(
    (item) => item.sourceId === publicBaselineSource?.id
  );
  if (
    publicBaselineSource?.visibility !== "public" ||
    !publicBaselineSource.assetUrl ||
    !publicBaselineProjection?.citationRequired ||
    !publicBaselineEvidence?.renderCitation
  ) {
    archiveProductionErrors.push("The selected public-baseline claim needs a public artifact and renderable citation relationship");
  }
  const publicBaselineBoundaryText = JSON.stringify([
    publicBaselineSource?.doesNotEstablish,
    publicBaselineClaim?.boundaries,
    publicBaselineClaim?.antiClaims
  ]).toLowerCase();
  for (const boundary of ["adopt", "released", "dataset", "represent"]) {
    if (!publicBaselineBoundaryText.includes(boundary)) {
      archiveProductionErrors.push(`The public-baseline claim is missing the ${boundary} boundary`);
    }
  }

  const operatingPlanClaim = claimById.get("CLM-CRS-OPERATING-PLAN-2026");
  if (!JSON.stringify([operatingPlanClaim?.boundaries, operatingPlanClaim?.antiClaims]).toLowerCase().includes("completion")) {
    archiveProductionErrors.push("The CRS operating plan must remain distinct from completed work");
  }
  const proposalOutcomeInquiry = inquiryById.get("INQ-JOB-HUNT-SOURCE-BACKED-MEMORY-OUTCOME-2026");
  if (proposalOutcomeInquiry?.resultStatus !== "inconclusive") {
    archiveProductionErrors.push("The Source-Backed Team Memory engagement outcome must remain inconclusive");
  }
  const materializationInquiry = inquiryById.get("INQ-ICLOUD-TEAMS-MATERIALIZATION-2026");
  const materializationBoundaryText = JSON.stringify(materializationInquiry?.limitations ?? []).toLowerCase();
  if (
    materializationInquiry?.resultStatus !== "partially-recovered" ||
    !materializationBoundaryText.includes("not materialized") ||
    !materializationBoundaryText.includes("not evidence")
  ) {
    archiveProductionErrors.push("iCloud placeholders must remain partially recovered with an explicit not-materialized boundary");
  }

  for (const id of requiredSharedDriveIntakeIds) {
    if (!intakeIdSet.has(id)) {
      sharedDriveProductionErrors.push(`Missing required Shared Drive intake: ${id}`);
    }
  }

  for (const id of requiredSharedDriveSourceIds) {
    const source = sourceById.get(id);
    if (!source) {
      sharedDriveProductionErrors.push(`Missing required Shared Drive source: ${id}`);
      continue;
    }
    if (!source.supportsGenerally.length || !source.doesNotEstablish.length) {
      sharedDriveProductionErrors.push(`${id} needs explicit support and does-not-establish boundaries`);
    }
    if (source.visibility === "public" || !source.protectedLocatorId) {
      sharedDriveProductionErrors.push(`${id} must remain protected or metadata-only with a protected locator`);
    }
    if (source.canonicalUrl || source.archiveUrl || source.assetUrl) {
      sharedDriveProductionErrors.push(`${id} must not expose a Shared Drive source URL`);
    }
    const linkedIntakes = knowledgeBank.intakes.filter((intake) => intake.sourceIds.includes(id));
    const linkedClaims = knowledgeBank.claims.filter((claim) =>
      claim.evidence.some((evidence) => evidence.sourceId === id)
    );
    const linkedInquiries = knowledgeBank.researchInquiries.filter((inquiry) =>
      inquiry.sourceIds.includes(id)
    );
    if (!linkedIntakes.length || (!linkedClaims.length && !linkedInquiries.length)) {
      sharedDriveProductionErrors.push(`${id} needs an intake edge and a claim or inquiry edge`);
    }
  }

  for (const id of requiredSharedDriveClaimIds) {
    if (!claimById.has(id)) {
      sharedDriveProductionErrors.push(`Missing required Shared Drive claim: ${id}`);
    }
  }
  for (const id of requiredSharedDriveInquiryIds) {
    if (!inquiryById.has(id)) {
      sharedDriveProductionErrors.push(`Missing required Shared Drive inquiry: ${id}`);
    }
  }

  const sharedDriveRecordSet = [
    ...requiredSharedDriveIntakeIds.map((id) => knowledgeBank.intakes.find((record) => record.id === id)),
    ...requiredSharedDriveSourceIds.map((id) => sourceById.get(id)),
    ...requiredSharedDriveClaimIds.map((id) => claimById.get(id)),
    ...requiredSharedDriveInquiryIds.map((id) => inquiryById.get(id))
  ].filter(Boolean);
  const serializedSharedDriveRecords = JSON.stringify(sharedDriveRecordSet).toLowerCase();
  for (const marker of [
    ...blockedPublicRepoMarkers,
    "drive.google.com",
    "docs.google.com",
    "spreadsheets/d/",
    "shared drive id",
    "file id",
    "zoom.us",
    "password:"
  ]) {
    if (serializedSharedDriveRecords.includes(marker.toLowerCase())) {
      sharedDriveProductionErrors.push(`Shared Drive records contain blocked public-repo marker: ${marker}`);
    }
  }

  const selectedSharedDriveClaimIds = new Set([
    "CLM-CRS-STAKEHOLDER-OPS-TRACKER-2026",
    "CLM-CRS-ALIGNMENT-RECORD-2026",
    "CLM-196-RESIDENCY-ONBOARDING-2023",
    "CLM-SUNDAY-DINNER-CONTINUITY-SYSTEM-2025"
  ]);
  for (const claimId of requiredSharedDriveClaimIds) {
    const claim = claimById.get(claimId);
    const activeProjections = claim?.projections.filter((projection) => projection.status === "active") ?? [];
    if (selectedSharedDriveClaimIds.has(claimId) && activeProjections.length !== 1) {
      sharedDriveProductionErrors.push(`${claimId} must have exactly one selected active projection`);
    }
    if (!selectedSharedDriveClaimIds.has(claimId) && activeProjections.length) {
      sharedDriveProductionErrors.push(`${claimId} must remain held or unsurfaced`);
    }
    if (selectedSharedDriveClaimIds.has(claimId)) {
      const projection = activeProjections[0];
      const evidence = claim?.evidence[0];
      if (
        evidence?.relationship !== "private-support" ||
        evidence.renderCitation ||
        projection?.citationRequired
      ) {
        sharedDriveProductionErrors.push(`${claimId} must project only a non-cited public-safe summary of private support`);
      }
    }
  }

  const selectedSharedDriveIntakes = requiredSharedDriveIntakeIds
    .map((id) => knowledgeBank.intakes.find((intake) => intake.id === id))
    .filter((intake) => intake?.editorialState === "selected");
  if (selectedSharedDriveIntakes.length !== selectedSharedDriveClaimIds.size) {
    sharedDriveProductionErrors.push("Shared Drive production must select exactly four public-safe workflow claims");
  }

  const inventoryInquiry = inquiryById.get("INQ-GDRIVE-PROFESSIONAL-COVERAGE-2026");
  const inventoryText = JSON.stringify([
    inventoryInquiry?.findings,
    inventoryInquiry?.limitations
  ]).toLowerCase();
  if (
    inventoryInquiry?.resultStatus !== "partially-recovered" ||
    !inventoryText.includes("110") ||
    !inventoryText.includes("not close-read every file") ||
    !inventoryText.includes("access does not establish")
  ) {
    sharedDriveProductionErrors.push("Shared Drive inventory must preserve its dated 110-drive scope and bounded selection limits");
  }

  const trackerClaim = claimById.get("CLM-CRS-STAKEHOLDER-OPS-TRACKER-2026");
  const trackerBoundaries = JSON.stringify([
    trackerClaim?.boundaries,
    trackerClaim?.antiClaims
  ]).toLowerCase();
  for (const boundary of ["contact details", "row-level", "relationship"]) {
    if (!trackerBoundaries.includes(boundary)) {
      sharedDriveProductionErrors.push(`The stakeholder tracker claim is missing its ${boundary} boundary`);
    }
  }

  const alignmentClaim = claimById.get("CLM-CRS-ALIGNMENT-RECORD-2026");
  const alignmentBoundaries = JSON.stringify([
    alignmentClaim?.boundaries,
    alignmentClaim?.antiClaims
  ]).toLowerCase();
  for (const boundary of ["translated", "consensus", "completed"]) {
    if (!alignmentBoundaries.includes(boundary)) {
      sharedDriveProductionErrors.push(`The alignment record is missing its ${boundary} boundary`);
    }
  }

  const webLaunchClaim = claimById.get("CLM-FAIR-RENT-WEB-LAUNCH-RUNBOOK-2023");
  const webLaunchText = JSON.stringify(webLaunchClaim).toLowerCase();
  if (!webLaunchText.includes("olympia kazi") || webLaunchClaim?.projections.some((item) => item.status === "active")) {
    sharedDriveProductionErrors.push("The Fair Rent web launch record must retain Olympia Kazi's credit and remain held");
  }

  const comptrollerClaim = claimById.get("CLM-CRS-COMPTROLLER-SCOPING-BRIEF-2026");
  const comptrollerBoundaryText = JSON.stringify([
    comptrollerClaim?.boundaries,
    comptrollerClaim?.antiClaims
  ]).toLowerCase();
  if (!comptrollerBoundaryText.includes("adopt") || comptrollerClaim?.projections.some((item) => item.status === "active")) {
    sharedDriveProductionErrors.push("The Comptroller brief must remain a held proposal with an explicit non-adoption boundary");
  }

  const quantifiedParticipationInquiry = inquiryById.get("INQ-GDRIVE-QUANTIFIED-PARTICIPATION-CLAIMS-2026");
  if (
    quantifiedParticipationInquiry?.resultStatus !== "partially-recovered" ||
    !JSON.stringify(quantifiedParticipationInquiry?.findings).toLowerCase().includes("do not independently establish")
  ) {
    sharedDriveProductionErrors.push("The Sunday Dinner and residency aggregate counts must remain only partially recovered");
  }

  const visualInquiry = inquiryById.get("INQ-GDRIVE-VISUAL-ASSET-RIGHTS-2026");
  if (
    visualInquiry?.resultStatus !== "partially-recovered" ||
    !JSON.stringify(visualInquiry?.limitations).toLowerCase().includes("does not establish jamie's role")
  ) {
    sharedDriveProductionErrors.push("Visual-only holdings must remain a protected rights-and-role research queue");
  }

  const researchedUrls = new Set();
  for (const sourceId of requiredResearchSourceIds) {
    const source = sourceById.get(sourceId);
    if (!source) {
      researchErrors.push(`Missing required researched source: ${sourceId}`);
      continue;
    }

    if (source.visibility !== "public" || !source.canonicalUrl) {
      researchErrors.push(`${sourceId} must be public and expose a canonical URL`);
    }
    if (source.canonicalUrl && researchedUrls.has(source.canonicalUrl)) {
      researchErrors.push(`${sourceId} duplicates a researched canonical URL`);
    }
    if (source.canonicalUrl) researchedUrls.add(source.canonicalUrl);
    if (!source.supportsGenerally.length || !source.doesNotEstablish.length) {
      researchErrors.push(`${sourceId} needs explicit support and does-not-establish boundaries`);
    }

    const linkedIntakes = knowledgeBank.intakes.filter((intake) =>
      intake.sourceIds.includes(sourceId)
    );
    const linkedClaims = knowledgeBank.claims.filter((claim) =>
      claim.evidence.some((evidence) => evidence.sourceId === sourceId)
    );
    if (!linkedIntakes.length || !linkedClaims.length) {
      researchErrors.push(`${sourceId} needs at least one intake and one atomic claim edge`);
    }
  }

  const nterChngClaimIds = [
    "CLM-NTERCHNG-COLLECTIVE-INSTALLATION-2011",
    "CLM-NTERCHNG-PARTICIPATORY-SYSTEM-2011",
    "CLM-NTERCHNG-ANH-KC-INCLUSION-2011",
    "CLM-NTERCHNG-ORIGINAL-RUN-DATES-2010",
    "CLM-NTERCHNG-ANH-PRODUCTION-PLAN-2011",
    "CLM-NTERCHNG-CROSS-DISCIPLINARY-PRODUCTION-2010"
  ];
  for (const claimId of nterChngClaimIds) {
    const claim = claimById.get(claimId);
    if (!claim) {
      researchErrors.push(`Missing required NTER CHNG claim: ${claimId}`);
      continue;
    }
    if (claim.projections.some((projection) => projection.status === "active")) {
      researchErrors.push(`${claimId} must remain held pending a separate editorial-selection pass`);
    }
  }

  const nterChngCollectiveClaim = claimById.get(
    "CLM-NTERCHNG-COLLECTIVE-INSTALLATION-2011"
  );
  const nterChngCollectiveText = JSON.stringify([
    nterChngCollectiveClaim?.internalClaim,
    nterChngCollectiveClaim?.projections,
    nterChngCollectiveClaim?.boundaries,
    nterChngCollectiveClaim?.antiClaims
  ]).toLowerCase();
  for (const requiredCredit of ["drew bolton", "garrett fuselier", "alone"]) {
    if (!nterChngCollectiveText.includes(requiredCredit)) {
      researchErrors.push(`NTER CHNG collective authorship is missing the ${requiredCredit} boundary`);
    }
  }

  const nterChngInclusionClaim = claimById.get(
    "CLM-NTERCHNG-ANH-KC-INCLUSION-2011"
  );
  const nterChngInclusionText = JSON.stringify([
    nterChngInclusionClaim?.boundaries,
    nterChngInclusionClaim?.antiClaims
  ]).toLowerCase();
  for (const requiredBoundary of ["nerman museum", "exact physical", "toured nationally"]) {
    if (!nterChngInclusionText.includes(requiredBoundary)) {
      researchErrors.push(`NTER CHNG exhibition inclusion is missing the ${requiredBoundary} boundary`);
    }
  }

  const nterChngInquiry = inquiryById.get("INQ-NTERCHNG-ANH-ARCHIVE-2026");
  const nterChngInquiryText = JSON.stringify([
    nterChngInquiry?.findings,
    nterChngInquiry?.limitations
  ]).toLowerCase();
  if (
    nterChngInquiry?.resultStatus !== "recovered" ||
    !nterChngInquiryText.includes("press release") ||
    !nterChngInquiryText.includes("not recovered") ||
    !nterChngInquiryText.includes("exact physical")
  ) {
    researchErrors.push("NTER CHNG archive recovery must preserve its recovered finding and unresolved physical-display and press-release boundaries");
  }

  const nterChngProtectedSourceIds = [
    "SRC-NTERCHNG-ANH-INSTALLER-WORKING-DOC-2011",
    "SRC-NTERCHNG-EXHIBIT-INFORMATION-WORKING-DOC-2011"
  ];
  for (const sourceId of nterChngProtectedSourceIds) {
    const source = sourceById.get(sourceId);
    if (!source) {
      researchErrors.push(`Missing protected NTER CHNG source: ${sourceId}`);
      continue;
    }
    if (
      source.visibility !== "protected" ||
      source.preservationStatus !== "private" ||
      source.canonicalUrl ||
      source.archiveUrl ||
      source.assetUrl ||
      !source.protectedLocatorId
    ) {
      researchErrors.push(`${sourceId} must remain protected, privately preserved, URL-free, and locator-governed`);
    }
    if (!source.supportsGenerally.length || !source.doesNotEstablish.length) {
      researchErrors.push(`${sourceId} needs explicit support and does-not-establish boundaries`);
    }
    const linkedIntakes = knowledgeBank.intakes.filter((intake) =>
      intake.sourceIds.includes(sourceId)
    );
    const linkedClaims = knowledgeBank.claims.filter((claim) =>
      claim.evidence.some((evidence) => evidence.sourceId === sourceId)
    );
    if (!linkedIntakes.length || !linkedClaims.length) {
      researchErrors.push(`${sourceId} needs at least one intake and one atomic claim edge`);
    }
  }

  const nterChngProtectedIntakeIds = [
    "INTAKE-NTERCHNG-ANH-INSTALLER-WORKING-DOC-2026",
    "INTAKE-NTERCHNG-EXHIBIT-INFORMATION-WORKING-DOC-2026"
  ];
  for (const intakeId of nterChngProtectedIntakeIds) {
    const intake = knowledgeBank.intakes.find((item) => item.id === intakeId);
    if (
      intake?.maturity !== "decomposed" ||
      intake.publicUse !== "protected" ||
      intake.editorialState !== "unsurfaced" ||
      intake.canonicalUrl
    ) {
      researchErrors.push(`${intakeId} must remain decomposed, protected, unsurfaced, and URL-free`);
    }
  }

  const nterChngPlanClaim = claimById.get("CLM-NTERCHNG-ANH-PRODUCTION-PLAN-2011");
  const nterChngPlanText = JSON.stringify([
    nterChngPlanClaim?.internalClaim,
    nterChngPlanClaim?.boundaries,
    nterChngPlanClaim?.antiClaims
  ]).toLowerCase();
  for (const boundary of ["plan", "completed", "april 22", "individual"]) {
    if (!nterChngPlanText.includes(boundary)) {
      researchErrors.push(`NTER CHNG production-plan claim is missing its ${boundary} boundary`);
    }
  }

  const nterChngDatesClaim = claimById.get("CLM-NTERCHNG-ORIGINAL-RUN-DATES-2010");
  const nterChngDatesText = JSON.stringify([
    nterChngDatesClaim?.internalClaim,
    nterChngDatesClaim?.boundaries,
    nterChngDatesClaim?.antiClaims
  ]).toLowerCase();
  for (const boundary of ["january 8-29, 2010", "first-party", "independent", "press release"]) {
    if (!nterChngDatesText.includes(boundary)) {
      researchErrors.push(`NTER CHNG run-dates claim is missing its ${boundary} boundary`);
    }
  }

  const nterChngWorkingInquiry = inquiryById.get(
    "INQ-NTERCHNG-WORKING-DOCUMENTS-2026"
  );
  const nterChngWorkingInquiryText = JSON.stringify([
    nterChngWorkingInquiry?.findings,
    nterChngWorkingInquiry?.limitations
  ]).toLowerCase();
  for (const boundary of ["revision history", "phone numbers", "task", "publicly recoverable", "timed out", "not recover"]) {
    if (!nterChngWorkingInquiryText.includes(boundary)) {
      researchErrors.push(`NTER CHNG working-document inquiry is missing its ${boundary} boundary`);
    }
  }
  if (nterChngWorkingInquiry?.resultStatus !== "partially-recovered") {
    researchErrors.push("NTER CHNG working-document inquiry must remain partially recovered");
  }

  for (const intake of knowledgeBank.intakes) {
    const serialized = JSON.stringify(intake);
    for (const marker of blockedPublicRepoMarkers) {
      if (serialized.toLowerCase().includes(marker.toLowerCase())) {
        coverageErrors.push(`${intake.id} contains blocked public-repo marker: ${marker}`);
      }
    }

    for (const sourceId of intake.sourceIds) {
      if (!sourceById.has(sourceId)) {
        dispositionErrors.push(`${intake.id} references unknown source ${sourceId}`);
      }
    }
    for (const claimId of intake.claimIds) {
      if (!claimById.has(claimId)) {
        dispositionErrors.push(`${intake.id} references unknown claim ${claimId}`);
      }
    }
    for (const inquiryId of intake.inquiryIds) {
      if (!inquiryById.has(inquiryId)) {
        dispositionErrors.push(`${intake.id} references unknown inquiry ${inquiryId}`);
      }
    }
    if (intake.duplicateOf && !intakeIdSet.has(intake.duplicateOf)) {
      dispositionErrors.push(`${intake.id} references unknown duplicate intake ${intake.duplicateOf}`);
    }

    if (
      intake.maturity === "decomposed" &&
      (!intake.sourceIds.length || (!intake.claimIds.length && !intake.inquiryIds.length))
    ) {
      dispositionErrors.push(
        `${intake.id} is decomposed without a source and a claim candidate or inquiry`
      );
    }

    if (intake.maturity === "decomposed") {
      for (const claimId of intake.claimIds) {
        for (const evidence of claimById.get(claimId)?.evidence ?? []) {
          if (!evidence.locator) {
            dispositionErrors.push(
              `${intake.id} links decomposed ${claimId} evidence without a locator: ${evidence.sourceId}`
            );
          }
        }
      }
    }

    if (
      ["metadata-reviewed", "source-reviewed"].includes(intake.maturity) &&
      (intake.editorialState !== "unsurfaced" || intake.claimIds.length)
    ) {
      dispositionErrors.push(
        `${intake.id} must remain claim-free and unsurfaced until decomposition`
      );
    }

    const destinationRequirements = {
      "source-created": intake.sourceIds.length > 0,
      "claim-candidate-created": intake.claimIds.length > 0,
      "research-inquiry-created": intake.inquiryIds.length > 0,
      "linked-existing":
        intake.sourceIds.length + intake.claimIds.length + intake.inquiryIds.length > 0,
      "linked-duplicate": Boolean(intake.duplicateOf),
      "held-protected": ["approval-required", "protected"].includes(intake.publicUse),
      superseded: Boolean(intake.duplicateOf)
    };

    if (!destinationRequirements[intake.disposition]) {
      dispositionErrors.push(
        `${intake.id} has disposition ${intake.disposition} without its required destination`
      );
    }

    const selectedAndPublishable =
      intake.maturity === "decomposed" &&
      intake.publicUse === "public-linkable" &&
      intake.editorialState === "selected";
    const activeProjections = intake.claimIds.flatMap((claimId) =>
      (claimById.get(claimId)?.projections ?? []).filter(
        (projection) => projection.status === "active"
      )
    );

    if (activeProjections.length && !selectedAndPublishable) {
      projectionErrors.push(
        `${intake.id} links an active projection without decomposed, public-linkable, selected status`
      );
    }

    if (
      ["approval-required", "protected"].includes(intake.publicUse) &&
      intake.canonicalUrl
    ) {
      projectionErrors.push(`${intake.id} exposes a canonical URL despite non-public use policy`);
    }
  }

  const pressPlacements = knowledgeBank.campaignPressPlacements;
  const articleSourceIds = new Set(
    pressPlacements.map((placement) => placement.articleSourceId)
  );
  const expectedCampaignCounts = campaignPressCatalogExpectations.campaignCounts;

  if (pressPlacements.length !== campaignPressCatalogExpectations.placementCount) {
    pressErrors.push(
      `Campaign press catalog has ${pressPlacements.length} placements; expected ${campaignPressCatalogExpectations.placementCount}`
    );
  }
  if (articleSourceIds.size !== campaignPressCatalogExpectations.uniqueArticleSourceCount) {
    pressErrors.push(
      `Campaign press catalog has ${articleSourceIds.size} unique article sources; expected ${campaignPressCatalogExpectations.uniqueArticleSourceCount}`
    );
  }

  for (const [campaignId, expectedCount] of Object.entries(expectedCampaignCounts)) {
    const placements = pressPlacements
      .filter((placement) => placement.campaign === campaignId)
      .sort((a, b) => a.position - b.position);
    const positions = placements.map((placement) => placement.position);
    const expectedPositions = Array.from(
      { length: Number(expectedCount) },
      (_, index) => index + 1
    );

    if (placements.length !== expectedCount) {
      pressErrors.push(`${campaignId} has ${placements.length} placements; expected ${expectedCount}`);
    }
    if (JSON.stringify(positions) !== JSON.stringify(expectedPositions)) {
      pressErrors.push(`${campaignId} positions are not unique and contiguous from 1 to ${expectedCount}`);
    }

    const indexSourceIds = new Set(placements.map((placement) => placement.indexSourceId));
    if (indexSourceIds.size !== 1) {
      pressErrors.push(`${campaignId} does not resolve to exactly one campaign index source`);
    }
    const indexSource = sourceById.get([...indexSourceIds][0]);
    if (
      !indexSource ||
      indexSource.kind !== "project-archive" ||
      !indexSource.canonicalUrl ||
      !indexSource.archiveUrl ||
      !indexSource.captureFingerprint
    ) {
      pressErrors.push(`${campaignId} index needs canonical and archival provenance plus a capture fingerprint`);
    }
  }

  for (const placement of pressPlacements) {
    const articleSource = sourceById.get(placement.articleSourceId);
    const indexSource = sourceById.get(placement.indexSourceId);
    if (!articleSource) pressErrors.push(`${placement.id} references unknown article source ${placement.articleSourceId}`);
    if (!indexSource) pressErrors.push(`${placement.id} references unknown index source ${placement.indexSourceId}`);
    if (articleSource && (articleSource.kind !== "published-article" || articleSource.visibility !== "public")) {
      pressErrors.push(`${placement.articleSourceId} must be a public published-article source`);
    }
    if (articleSource && (!articleSource.supportsGenerally.length || !articleSource.doesNotEstablish.length)) {
      pressErrors.push(`${placement.articleSourceId} needs explicit support and does-not-establish boundaries`);
    }
    if (
      ["archive-backed", "access-restricted-with-archive"].includes(placement.identityStatus) &&
      !articleSource?.archiveUrl
    ) {
      pressErrors.push(`${placement.id} is archive-backed but ${placement.articleSourceId} has no archive URL`);
    }
    if (placement.reviewStatus !== "metadata-reviewed" || placement.editorialState !== "unsurfaced") {
      pressErrors.push(`${placement.id} must remain metadata-reviewed and unsurfaced until article-level decomposition`);
    }

    const linkedIntakes = knowledgeBank.intakes.filter((intake) =>
      intake.sourceIds.includes(placement.articleSourceId)
    );
    if (!linkedIntakes.length) {
      pressErrors.push(`${placement.articleSourceId} has no intake record`);
    }
  }

  const articleUrls = new Map();
  for (const sourceId of articleSourceIds) {
    const source = sourceById.get(sourceId);
    if (!source?.canonicalUrl) {
      pressErrors.push(`${sourceId} has no canonical article URL`);
      continue;
    }
    const key = normalizedUrl(source.canonicalUrl);
    const previousSourceId = articleUrls.get(key);
    if (previousSourceId && previousSourceId !== sourceId) {
      pressErrors.push(`${sourceId} duplicates canonical article identity ${previousSourceId}`);
    }
    articleUrls.set(key, sourceId);
  }

  const multiCampaignSources = [...articleSourceIds].filter((sourceId) => {
    const campaigns = new Set(
      pressPlacements
        .filter((placement) => placement.articleSourceId === sourceId)
        .map((placement) => placement.campaign)
    );
    return campaigns.size > 1;
  });
  if (
    multiCampaignSources.length !== 1 ||
    multiCampaignSources[0] !== "SRC-NYCAC-NPR-NIGHTLIFE-2017"
  ) {
    pressErrors.push("The shared NPR article must be one canonical source with Let NYC Dance and Save NYC Spaces placement edges");
  }

  for (const sourceId of articleSourceIds) {
    if (campaignPressCatalogExpectations.existingArticleSourceIds.includes(sourceId)) continue;
    const linkedClaims = knowledgeBank.claims.filter((claim) =>
      claim.evidence.some((evidence) => evidence.sourceId === sourceId)
    );
    if (linkedClaims.length) {
      pressErrors.push(`${sourceId} was promoted from metadata intake to claim evidence without article-level review`);
    }
    const linkedIntakes = knowledgeBank.intakes.filter((intake) =>
      intake.sourceIds.includes(sourceId)
    );
    if (!linkedIntakes.some((intake) =>
      intake.maturity === "metadata-reviewed" &&
      intake.editorialState === "unsurfaced" &&
      intake.claimIds.length === 0
    )) {
      pressErrors.push(`${sourceId} needs an unsurfaced metadata-reviewed intake with no claim edge`);
    }
  }

  const requiredKcTownHallSourceIds = [
    "SRC-KC-TOWN-HALL-CCED-MINUTES-2019",
    "SRC-KC-TOWN-HALL-COUNCIL-RESOLUTION-190649",
    "SRC-KC-TOWN-HALL-COUNCIL-ORDINANCE-190642",
    "SRC-KC-TOWN-HALL-CCED-PROJECT-UPDATE-2022",
    "SRC-KC-TOWN-HALL-WITHDRAWAL-ORDINANCE-2024"
  ];
  const requiredKcTownHallClaimIds = [
    "CLM-KC-TOWN-HALL-PROPOSAL-2019",
    "CLM-KC-TOWN-HALL-COUNCIL-ACCEPTANCE-2019",
    "CLM-KC-TOWN-HALL-COUNCIL-APPROPRIATION-2019",
    "CLM-KC-TOWN-HALL-INTERIM-FUNDING-STATUS-2022",
    "CLM-KC-TOWN-HALL-WITHDRAWN-2024"
  ];
  const requiredKcTownHallSocialPageSourceIds = [
    "SRC-X-KCTOWNHALL-NEIGHBORHOOD-PROCESS-2018",
    "SRC-X-KCTOWNHALL-FULL-POPULATION-2026",
    "SRC-X-KCTOWNHALL-BTG-TIRE-DROPOFF-2019"
  ];
  const requiredKcTownHallSocialPageClaimIds = [
    "CLM-KCTOWNHALL-RESIDENT-INPUT-SURFACE",
    "CLM-KCTOWNHALL-TIRE-OPERATING-PATTERN",
    "CLM-KCTOWNHALL-TIRE-DROPOFF-CORROBORATION",
    "CLM-KCTOWNHALL-COUNCIL-RESPONSE-FLOOR"
  ];
  const requiredKcTownHallPracticeSourceIds = [
    "SRC-KCTH-CCED-PROPOSAL-PHASE-ONE-2019",
    "SRC-KCTH-JAMIE-FIELD-PRACTICE-MEMORY-2026",
    "SRC-KCTH-TIRED-OF-TIRES-ARCHIVE-2020",
    "SRC-KCTH-TIRED-OF-TIRES-UPDATE-2019"
  ];
  const requiredKcTownHallPracticeClaimIds = [
    "CLM-KCTH-PHASE-ONE-GENERAL-CONTRACTOR-ROLE",
    "CLM-KCTH-NEIGHBORHOOD-SURVEY-SYSTEM",
    "CLM-KCTH-SITE-BASED-LISTENING-PRACTICE",
    "CLM-KCTH-TIRED-OF-TIRES-OPERATIONS",
    "CLM-KCTH-CLEVELAND-UNIFY-TO-BEAUTIFY-ROLE",
    "CLM-KCTH-PRO-BONO-NEIGHBORHOOD-DESIGN"
  ];
  const requiredKcTownHallPracticeIntakeIds = [
    "INTAKE-KCTH-PHASE-ONE-FIELD-PRACTICE-2026",
    "INTAKE-KCTH-NEIGHBORHOOD-SURVEY-SYSTEM-2026",
    "INTAKE-KCTH-TIRED-OF-TIRES-OPERATIONS-2026",
    "INTAKE-KCTH-CLEVELAND-AND-PRO-BONO-DESIGN-2026"
  ];
  const requiredKcTownHallPracticeInquiryIds = [
    "INQ-KCTH-PHASE-ONE-FIELD-PRACTICE-2026",
    "INQ-KCTH-NEIGHBORHOOD-PRACTICE-2026"
  ];

  for (const sourceId of requiredKcTownHallSourceIds) {
    if (!sourceById.has(sourceId)) kcTownHallErrors.push(`KC Town Hall sequence is missing ${sourceId}`);
  }
  for (const claimId of requiredKcTownHallClaimIds) {
    if (!claimById.has(claimId)) kcTownHallErrors.push(`KC Town Hall sequence is missing ${claimId}`);
  }
  for (const sourceId of requiredKcTownHallPracticeSourceIds) {
    if (!sourceById.has(sourceId)) kcTownHallErrors.push(`KC Town Hall field-practice record is missing ${sourceId}`);
  }
  for (const claimId of requiredKcTownHallPracticeClaimIds) {
    if (!claimById.has(claimId)) kcTownHallErrors.push(`KC Town Hall field-practice record is missing ${claimId}`);
  }
  for (const intakeId of requiredKcTownHallPracticeIntakeIds) {
    if (!intakeIdSet.has(intakeId)) kcTownHallErrors.push(`KC Town Hall field-practice record is missing ${intakeId}`);
  }
  for (const inquiryId of requiredKcTownHallPracticeInquiryIds) {
    if (!inquiryById.has(inquiryId)) kcTownHallErrors.push(`KC Town Hall field-practice record is missing ${inquiryId}`);
  }

  const phaseOneSource = sourceById.get("SRC-KCTH-CCED-PROPOSAL-PHASE-ONE-2019");
  const fieldMemorySource = sourceById.get("SRC-KCTH-JAMIE-FIELD-PRACTICE-MEMORY-2026");
  const phaseOneClaim = claimById.get("CLM-KCTH-PHASE-ONE-GENERAL-CONTRACTOR-ROLE");
  const surveyClaim = claimById.get("CLM-KCTH-NEIGHBORHOOD-SURVEY-SYSTEM");
  const tiredOfTiresClaim = claimById.get("CLM-KCTH-TIRED-OF-TIRES-OPERATIONS");
  const clevelandClaim = claimById.get("CLM-KCTH-CLEVELAND-UNIFY-TO-BEAUTIFY-ROLE");
  const proBonoDesignClaim = claimById.get("CLM-KCTH-PRO-BONO-NEIGHBORHOOD-DESIGN");

  for (const source of [phaseOneSource, fieldMemorySource]) {
    if (
      !source ||
      source.visibility !== "protected" ||
      source.preservationStatus !== "private" ||
      source.canonicalUrl ||
      source.archiveUrl ||
      source.assetUrl
    ) {
      kcTownHallErrors.push("KC Town Hall proposal and first-person field records must remain protected without exposed URLs");
      break;
    }
  }

  for (const claimId of requiredKcTownHallPracticeClaimIds) {
    const claim = claimById.get(claimId);
    if (claim?.projections.some(
      (projection) => projection.status !== "hold" || projection.surfaces.length > 0
    )) {
      kcTownHallErrors.push(`${claimId} must remain held from public-site projection in this intake pass`);
    }
  }

  const phaseOneBoundaryText = JSON.stringify([
    phaseOneSource?.doesNotEstablish,
    fieldMemorySource?.doesNotEstablish,
    phaseOneClaim?.boundaries,
    phaseOneClaim?.antiClaims
  ]).toLowerCase();
  for (const requiredBoundary of [
    "general-contractor title",
    "licensed",
    "julia",
    "audited",
    "full adaptive reuse"
  ]) {
    if (!phaseOneBoundaryText.includes(requiredBoundary)) {
      kcTownHallErrors.push(`KC Town Hall Phase One record is missing the ${requiredBoundary} boundary`);
    }
  }
  const phaseOneMemoryEvidence = phaseOneClaim?.evidence.find(
    (evidence) => evidence.sourceId === fieldMemorySource?.id
  );
  const phaseOneProposalEvidence = phaseOneClaim?.evidence.find(
    (evidence) => evidence.sourceId === phaseOneSource?.id
  );
  if (
    phaseOneMemoryEvidence?.relationship !== "private-support" ||
    phaseOneMemoryEvidence.renderCitation ||
    phaseOneProposalEvidence?.relationship !== "corroborating" ||
    phaseOneProposalEvidence.renderCitation
  ) {
    kcTownHallErrors.push("KC Town Hall Phase One claim must separate private role testimony from protected proposal corroboration");
  }

  const surveyBoundaryText = JSON.stringify([
    surveyClaim?.boundaries,
    surveyClaim?.antiClaims
  ]).toLowerCase();
  for (const requiredBoundary of ["respondent", "statistically representative", "individual designer"]) {
    if (!surveyBoundaryText.includes(requiredBoundary)) {
      kcTownHallErrors.push(`KC Town Hall survey record is missing the ${requiredBoundary} boundary`);
    }
  }

  const tiredOfTiresEvidenceIds = new Set(
    tiredOfTiresClaim?.evidence.map((evidence) => evidence.sourceId) ?? []
  );
  for (const sourceId of [
    "SRC-KCTH-JAMIE-FIELD-PRACTICE-MEMORY-2026",
    "SRC-KCTH-TIRED-OF-TIRES-ARCHIVE-2020",
    "SRC-KCTH-TIRED-OF-TIRES-UPDATE-2019"
  ]) {
    if (!tiredOfTiresEvidenceIds.has(sourceId)) {
      kcTownHallErrors.push(`KC Town Hall TiredOfTires claim is missing ${sourceId}`);
    }
  }
  const tiredBoundaryText = JSON.stringify([
    tiredOfTiresClaim?.boundaries,
    tiredOfTiresClaim?.antiClaims
  ]).toLowerCase();
  for (const requiredBoundary of ["sole", "indian mound", "audited", "later service date"]) {
    if (!tiredBoundaryText.includes(requiredBoundary)) {
      kcTownHallErrors.push(`KC Town Hall TiredOfTires record is missing the ${requiredBoundary} boundary`);
    }
  }

  for (const claim of [clevelandClaim, proBonoDesignClaim]) {
    if (
      claim?.status !== "use-with-care" ||
      claim.evidence.some(
        (evidence) => evidence.sourceId !== fieldMemorySource?.id || evidence.relationship !== "private-support" || evidence.renderCitation
      )
    ) {
      kcTownHallErrors.push("KC Town Hall Cleveland Avenue and pro bono design records must remain first-person, use-with-care research leads");
      break;
    }
  }
  const clevelandBoundaryText = JSON.stringify([
    clevelandClaim?.boundaries,
    clevelandClaim?.antiClaims
  ]).toLowerCase();
  for (const requiredBoundary of ["pastor lee", "henc", "capital allocation", "sole"]) {
    if (!clevelandBoundaryText.includes(requiredBoundary)) {
      kcTownHallErrors.push(`KC Town Hall Cleveland Avenue record is missing the ${requiredBoundary} boundary`);
    }
  }

  const acceptanceClaim = claimById.get("CLM-KC-TOWN-HALL-COUNCIL-ACCEPTANCE-2019");
  const appropriationClaim = claimById.get("CLM-KC-TOWN-HALL-COUNCIL-APPROPRIATION-2019");
  const interimStatusClaim = claimById.get("CLM-KC-TOWN-HALL-INTERIM-FUNDING-STATUS-2022");
  const withdrawalClaim = claimById.get("CLM-KC-TOWN-HALL-WITHDRAWN-2024");
  const transitionSource = sourceById.get("SRC-KC-TOWN-HALL-JAMIE-TRANSITION-CONFIRMATION-2026");
  const transitionClaim = claimById.get("CLM-KC-TOWN-HALL-MISSION-ALIGNED-TRANSITION");
  const activeAcceptance = acceptanceClaim?.projections.find(
    (projection) => projection.key === "case-study" && projection.status === "active"
  );
  const activeAppropriation = appropriationClaim?.projections.find(
    (projection) => projection.key === "case-study" && projection.status === "active"
  );
  const activeInterimStatus = interimStatusClaim?.projections.find(
    (projection) => projection.key === "case-study" && projection.status === "active"
  );
  const activeTransition = transitionClaim?.projections.find(
    (projection) => projection.key === "case-study" && projection.status === "active"
  );
  const acceptanceText = activeAcceptance?.text ?? "";
  const appropriationText = activeAppropriation?.text ?? "";
  const interimStatusText = activeInterimStatus?.text ?? "";

  if (!/Council accepted the CCED Board's recommendation of up to \$490,539/i.test(acceptanceText)) {
    kcTownHallErrors.push("KC Town Hall public acceptance claim must name the Council, CCED Board recommendation, and bounded amount");
  }
  if (!/Council passed Ordinance 190642, appropriating \$490,539 to KC Town Hall/i.test(appropriationText)) {
    kcTownHallErrors.push("KC Town Hall public appropriation claim must name Ordinance 190642 and the $490,539 project appropriation");
  }
  if (!/May 2022 city status report.*funding agreement in negotiation.*no disbursement amount at that point/i.test(interimStatusText)) {
    kcTownHallErrors.push("KC Town Hall public interim-status claim must preserve the May 2022 negotiation and dated non-disbursement finding");
  }
  if (!activeAcceptance?.citationRequired || !activeAppropriation?.citationRequired || !activeInterimStatus?.citationRequired) {
    kcTownHallErrors.push("KC Town Hall Council acceptance, appropriation, and interim-status projections must require citations");
  }

  if (!transitionSource || !transitionClaim || !activeTransition) {
    kcTownHallErrors.push("KC Town Hall must preserve Jamie's separately sourced mission-aligned transition");
  } else {
    if (
      transitionSource.visibility !== "public-metadata-only" ||
      transitionSource.preservationStatus !== "private" ||
      transitionSource.canonicalUrl ||
      transitionSource.archiveUrl ||
      transitionSource.assetUrl
    ) {
      kcTownHallErrors.push("KC Town Hall transition confirmation must remain public metadata only without an exposed source URL");
    }
    if (!/I transitioned it to a mission-aligned organization/i.test(activeTransition.text)) {
      kcTownHallErrors.push("KC Town Hall case study must state Jamie's mission-aligned transition in direct, bounded language");
    }
    if (activeTransition.citationRequired) {
      kcTownHallErrors.push("KC Town Hall transition must not project a private-support source as a public citation");
    }
    const transitionEvidence = transitionClaim.evidence.find(
      (evidence) => evidence.sourceId === transitionSource.id
    );
    if (
      !transitionEvidence ||
      transitionEvidence.relationship !== "private-support" ||
      transitionEvidence.renderCitation
    ) {
      kcTownHallErrors.push("KC Town Hall transition needs a non-rendered private-support evidence relationship");
    }
    const transitionBoundaryText = JSON.stringify([
      transitionSource.doesNotEstablish,
      transitionClaim.boundaries,
      transitionClaim.antiClaims
    ]).toLowerCase();
    for (const requiredBoundary of [
      "organization's identity",
      "public funds",
      "property",
      "current status",
      "circumstances",
      "municipal"
    ]) {
      if (!transitionBoundaryText.includes(requiredBoundary)) {
        kcTownHallErrors.push(`KC Town Hall transition evidence is missing the ${requiredBoundary} boundary`);
      }
    }
    if (/\b(?:because|due to|reason for)\b/i.test(activeTransition.text)) {
      kcTownHallErrors.push("KC Town Hall public transition wording must not encode a causal explanation");
    }
  }

  const municipalBoundaryText = JSON.stringify([
    sourceById.get("SRC-KC-TOWN-HALL-COUNCIL-RESOLUTION-190649")?.doesNotEstablish,
    sourceById.get("SRC-KC-TOWN-HALL-COUNCIL-ORDINANCE-190642")?.doesNotEstablish,
    sourceById.get("SRC-KC-TOWN-HALL-CCED-PROJECT-UPDATE-2022")?.doesNotEstablish,
    acceptanceClaim?.boundaries,
    acceptanceClaim?.antiClaims,
    appropriationClaim?.boundaries,
    appropriationClaim?.antiClaims,
    interimStatusClaim?.boundaries,
    interimStatusClaim?.antiClaims
  ]).toLowerCase();
  for (const requiredBoundary of ["executed", "disburs", "completed", "alone caused"]) {
    if (!municipalBoundaryText.includes(requiredBoundary)) {
      kcTownHallErrors.push(`KC Town Hall municipal evidence is missing the ${requiredBoundary} boundary`);
    }
  }

  const kcTownHallPage = knowledgeBank.pages.find((page) => page.id === "kc-town-hall");
  if (!kcTownHallPage) {
    kcTownHallErrors.push("KC Town Hall citation page plan is missing");
  } else {
    const occurrenceClaimIds = new Set(
      kcTownHallPage.occurrences.map((occurrence) => occurrence.claimId)
    );
    for (const claimId of [
      ...requiredKcTownHallClaimIds,
      ...requiredKcTownHallSocialPageClaimIds
    ]) {
      if (!occurrenceClaimIds.has(claimId)) {
        kcTownHallErrors.push(`KC Town Hall page plan does not render ${claimId}`);
      }
    }
    const expectedSourceOrder = [
      ...requiredKcTownHallSourceIds,
      ...requiredKcTownHallSocialPageSourceIds
    ];
    if (JSON.stringify(kcTownHallPage.sourceOrder) !== JSON.stringify(expectedSourceOrder)) {
      kcTownHallErrors.push("KC Town Hall source order must preserve the municipal chronology followed by the public operating and stakeholder record");
    }
    if (
      kcTownHallPage.sourceOrder.includes("SRC-KC-TOWN-HALL-JAMIE-TRANSITION-CONFIRMATION-2026") ||
      occurrenceClaimIds.has("CLM-KC-TOWN-HALL-MISSION-ALIGNED-TRANSITION")
    ) {
      kcTownHallErrors.push("KC Town Hall must not project the first-person transition confirmation into the public citation plan");
    }
  }
  if (!withdrawalClaim?.projections.some(
    (projection) => projection.key === "case-study" && projection.status === "active"
  )) {
    kcTownHallErrors.push("KC Town Hall withdrawal and reappropriation context must remain active");
  }

  const expectedSocialAccounts = new Map([
    ["SOCIAL-CALLNYC-X", { handle: "@CallNYCApp", observed: 110, recovered: 107, unresolved: 3 }],
    ["SOCIAL-NYCARTC-X", { handle: "@NYCArtC", observed: 5124, recovered: 3367, unresolved: 1757 }],
    ["SOCIAL-WOWLIST-X", { handle: "@wowlist", observed: 38, recovered: 38, unresolved: 0 }],
    ["SOCIAL-KCTOWNHALL-X", { handle: "@KCTownHall", observed: 183, recovered: 183, unresolved: 0 }]
  ]);
  if (knowledgeBank.socialAccounts.length !== expectedSocialAccounts.size) {
    socialMediaProductionErrors.push("Social-account inventory must contain exactly four verified project accounts");
  }
  for (const duplicateId of duplicates(knowledgeBank.socialAccounts.map(({ id }) => id))) {
    socialMediaProductionErrors.push(`Duplicate social-account ID: ${duplicateId}`);
  }
  for (const duplicateHandle of duplicates(
    knowledgeBank.socialAccounts.map(({ handle }) => handle.toLowerCase())
  )) {
    socialMediaProductionErrors.push(`Duplicate social-account handle: ${duplicateHandle}`);
  }
  for (const [id, expected] of expectedSocialAccounts) {
    const account = socialAccountById.get(id);
    if (!account) {
      socialMediaProductionErrors.push(`Missing required social account: ${id}`);
      continue;
    }
    if (
      account.handle !== expected.handle ||
      account.profilePostsObserved !== expected.observed ||
      account.recoveredItems !== expected.recovered ||
      account.unresolvedItems !== expected.unresolved
    ) {
      socialMediaProductionErrors.push(`${id} no longer matches its dated profile-control reconciliation`);
    }
    if (account.recoveredItems + account.unresolvedItems !== account.profilePostsObserved) {
      socialMediaProductionErrors.push(`${id} recovered and unresolved slots must reconcile to the profile control`);
    }
    for (const sourceId of account.sourceIds) {
      if (!sourceById.has(sourceId)) socialMediaProductionErrors.push(`${id} references unknown source ${sourceId}`);
    }
    for (const claimId of account.claimIds) {
      if (!claimById.has(claimId)) socialMediaProductionErrors.push(`${id} references unknown claim ${claimId}`);
    }
    for (const inquiryId of account.inquiryIds) {
      if (!inquiryById.has(inquiryId)) socialMediaProductionErrors.push(`${id} references unknown inquiry ${inquiryId}`);
    }
  }

  const wowListRecords = wowListFullPopulation.records ?? [];
  const wowListRecordUrls = wowListRecords.map(({ url }) => url);
  const wowListRecordTypeCounts = wowListRecords.reduce(
    (counts, record) => ({
      ...counts,
      [record.recordType]: (counts[record.recordType] ?? 0) + 1
    }),
    {}
  );
  const wowListOnlyInReplies = wowListRecords
    .filter(({ recoveredFrom }) =>
      recoveredFrom.includes("replies") && !recoveredFrom.includes("posts")
    )
    .map(({ url }) => url);
  const wowListExternalLinkOccurrences = wowListRecords.reduce(
    (count, record) => count + record.externalLinks.length,
    0
  );
  const wowListDistinctShortUrls = new Set(
    wowListRecords.flatMap((record) =>
      record.externalLinks.map(({ shortUrl }) => shortUrl)
    )
  );
  const reconciliation = wowListFullPopulation.populationReconciliation ?? {};
  if (
    wowListFullPopulation.generatedAt !== "2026-07-15" ||
    reconciliation.profileReportedPostCount !== 38 ||
    reconciliation.postsTimelineUniqueCount !== 37 ||
    reconciliation.repliesTimelineUniqueCount !== 38 ||
    reconciliation.recoveredUnionRecordCount !== 38 ||
    reconciliation.recoveredPopulationReviewedPercent !== 100 ||
    reconciliation.profileCountNotMaterialized !== 0
  ) {
    socialMediaProductionErrors.push("WOW List full-population fixture no longer preserves the 38-record reconciliation");
  }
  if (wowListRecords.length !== 38 || new Set(wowListRecordUrls).size !== 38) {
    socialMediaProductionErrors.push("WOW List fixture must contain 38 unique primary status URLs");
  }
  if (
    wowListRecordTypeCounts.original !== 16 ||
    wowListRecordTypeCounts.reply !== 6 ||
    wowListRecordTypeCounts.repost !== 16
  ) {
    socialMediaProductionErrors.push("WOW List fixture must retain the 16 original, 6 reply, and 16 repost disposition");
  }
  if (
    wowListOnlyInReplies.length !== 1 ||
    wowListOnlyInReplies[0] !== "https://x.com/wowlist/status/665520472461860864"
  ) {
    socialMediaProductionErrors.push("WOW List fixture must preserve the one status recovered only from Replies");
  }
  if (
    wowListFullPopulation.postedUrlInventory?.recordsWithExternalLinks !== 31 ||
    wowListExternalLinkOccurrences !== 35 ||
    wowListFullPopulation.postedUrlInventory?.externalLinkOccurrences !== 35 ||
    wowListDistinctShortUrls.size !== 35 ||
    wowListFullPopulation.postedUrlInventory?.distinctExternalShortUrls !== 35 ||
    wowListFullPopulation.postedUrlInventory?.curatedMissionRelevantSources?.length !== 9
  ) {
    socialMediaProductionErrors.push("WOW List fixture must retain all 35 posted URLs and nine curated source leads");
  }
  const stakeholderInventory = wowListFullPopulation.stakeholderInventory ?? {};
  const stakeholderGroupTotal = Object.values(
    stakeholderInventory.stakeholderGroupCounts ?? {}
  ).reduce((sum, count) => sum + count, 0);
  if (
    stakeholderInventory.recoveredSearchRecordCount !== 16 ||
    stakeholderInventory.missionRelevantThirdPartyRecordCount !== 10 ||
    stakeholderInventory.missionRelevantThirdPartyAccountCount !== 10 ||
    stakeholderInventory.thirdPartyRecordsPostingWowListUrls !== 9 ||
    stakeholderGroupTotal !== 10
  ) {
    socialMediaProductionErrors.push("WOW List bounded stakeholder inventory no longer reconciles 16 records, 10 accounts, four groups, and nine posted URLs");
  }
  const visibleEngagement = wowListFullPopulation.visibleEngagementSnapshot ?? {};
  if (
    visibleEngagement.observedAt !== "2026-07-15" ||
    visibleEngagement.accountAuthoredRecordsWithAnyDisplayedInteraction !== 12 ||
    visibleEngagement.accountAuthoredDisplayedReplies !== 2 ||
    visibleEngagement.accountAuthoredDisplayedReposts !== 20 ||
    visibleEngagement.accountAuthoredDisplayedLikes !== 21 ||
    visibleEngagement.accountAuthoredDisplayedInteractionUnits !== 43
  ) {
    socialMediaProductionErrors.push("WOW List dated visible-engagement snapshot no longer reconciles");
  }

  const wowListFixtureKeys = new Set();
  const wowListFixtureStack = [wowListFullPopulation];
  while (wowListFixtureStack.length) {
    const value = wowListFixtureStack.pop();
    if (!value || typeof value !== "object") continue;
    if (Array.isArray(value)) {
      wowListFixtureStack.push(...value);
      continue;
    }
    for (const [key, child] of Object.entries(value)) {
      wowListFixtureKeys.add(key.toLowerCase());
      wowListFixtureStack.push(child);
    }
  }
  for (const forbiddenKey of [
    "text",
    "rawtext",
    "cookies",
    "credentials",
    "session",
    "privatemessages"
  ]) {
    if (wowListFixtureKeys.has(forbiddenKey)) {
      socialMediaProductionErrors.push(`WOW List public fixture contains forbidden raw field: ${forbiddenKey}`);
    }
  }
  const serializedWowListFixture = JSON.stringify(wowListFullPopulation);
  for (const marker of blockedPublicRepoMarkers) {
    if (serializedWowListFixture.toLowerCase().includes(marker.toLowerCase())) {
      socialMediaProductionErrors.push(`WOW List public fixture contains blocked public-repo marker: ${marker}`);
    }
  }

  const kcTownHallRecords = kcTownHallFullPopulation.records ?? [];
  const kcTownHallRecordUrls = kcTownHallRecords.map(({ url }) => url);
  const kcTownHallRecordTypeCounts = kcTownHallRecords.reduce(
    (counts, record) => ({
      ...counts,
      [record.recordType]: (counts[record.recordType] ?? 0) + 1
    }),
    {}
  );
  const kcTownHallClassificationCounts = kcTownHallRecords
    .flatMap(({ classifications }) => classifications)
    .reduce(
      (counts, classification) => ({
        ...counts,
        [classification]: (counts[classification] ?? 0) + 1
      }),
      {}
    );
  const kcTownHallExternalLinkOccurrences = kcTownHallRecords.reduce(
    (count, record) => count + record.externalLinks.length,
    0
  );
  const kcTownHallDistinctShortUrls = new Set(
    kcTownHallRecords.flatMap((record) =>
      record.externalLinks.map(({ shortUrl }) => shortUrl)
    )
  );
  const kcTownHallReconciliation =
    kcTownHallFullPopulation.populationReconciliation ?? {};
  if (
    kcTownHallFullPopulation.generatedAt !== "2026-07-14" ||
    kcTownHallReconciliation.profileReportedPostCount !== 183 ||
    kcTownHallReconciliation.postsTimelineUniqueCount !== 170 ||
    kcTownHallReconciliation.repliesTimelineRenderedArticleCount !== 188 ||
    kcTownHallReconciliation.repliesTimelineConversationContextCount !== 5 ||
    kcTownHallReconciliation.repliesTimelinePrimaryRecordCount !== 183 ||
    kcTownHallReconciliation.recoveredUnionRecordCount !== 183 ||
    kcTownHallReconciliation.recoveredPopulationReviewedPercent !== 100 ||
    kcTownHallReconciliation.profileCountNotMaterialized !== 0
  ) {
    socialMediaProductionErrors.push(
      "KC Town Hall full-population fixture no longer preserves the 183-record reconciliation"
    );
  }
  if (
    kcTownHallRecords.length !== 183 ||
    new Set(kcTownHallRecordUrls).size !== 183
  ) {
    socialMediaProductionErrors.push(
      "KC Town Hall fixture must contain 183 unique primary status URLs"
    );
  }
  if (
    kcTownHallRecordTypeCounts.original !== 142 ||
    kcTownHallRecordTypeCounts.reply !== 13 ||
    kcTownHallRecordTypeCounts.repost !== 28
  ) {
    socialMediaProductionErrors.push(
      "KC Town Hall fixture must retain the 142 original, 13 reply, and 28 repost disposition"
    );
  }
  if (
    kcTownHallFullPopulation.recordsByYear?.["2018"] !== 30 ||
    kcTownHallFullPopulation.recordsByYear?.["2019"] !== 85 ||
    kcTownHallFullPopulation.recordsByYear?.["2020"] !== 41 ||
    kcTownHallFullPopulation.recordsByYear?.["2021"] !== 17 ||
    kcTownHallFullPopulation.recordsByYear?.["2022"] !== 10
  ) {
    socialMediaProductionErrors.push(
      "KC Town Hall fixture must retain its 2018-2022 record chronology"
    );
  }
  if (
    kcTownHallClassificationCounts["tire-related"] !== 100 ||
    kcTownHallClassificationCounts["survey-linked"] !== 12 ||
    kcTownHallFullPopulation.publishingPattern?.tireRelatedRecordCount !== 100 ||
    kcTownHallFullPopulation.publishingPattern?.surveyLinkedRecordCount !== 12
  ) {
    socialMediaProductionErrors.push(
      "KC Town Hall fixture must retain 100 tire-related and 12 survey-linked classifications"
    );
  }
  if (
    kcTownHallFullPopulation.postedUrlInventory?.recordsWithExternalLinks !==
      118 ||
    kcTownHallExternalLinkOccurrences !== 133 ||
    kcTownHallFullPopulation.postedUrlInventory?.externalLinkOccurrences !==
      133 ||
    kcTownHallDistinctShortUrls.size !== 31 ||
    kcTownHallFullPopulation.postedUrlInventory?.distinctExternalShortUrls !==
      31 ||
    kcTownHallFullPopulation.postedUrlInventory?.curatedMissionRelevantSources
      ?.length !== 9
  ) {
    socialMediaProductionErrors.push(
      "KC Town Hall fixture must retain all 31 distinct posted URLs and nine curated source leads"
    );
  }
  const kcTownHallStakeholders =
    kcTownHallFullPopulation.stakeholderResponseInventory ?? {};
  if (
    kcTownHallStakeholders.incomingMissionRelevantSearchRecordCount !== 3 ||
    kcTownHallStakeholders.directCouncilMemberAccountCount !== 3 ||
    kcTownHallStakeholders.communityOrProgramCorroborationAccountCount !== 1 ||
    kcTownHallStakeholders.councilMemberAccounts?.length !== 3 ||
    kcTownHallStakeholders.otherMissionRelevantRecords?.length !== 4 ||
    kcTownHallFullPopulation.conversationContextRecords?.length !== 5
  ) {
    socialMediaProductionErrors.push(
      "KC Town Hall stakeholder inventory must retain three Council-member responses, one program corroborator, four other mission-relevant records, and five separated contexts"
    );
  }
  const kcTownHallVisibleEngagement =
    kcTownHallFullPopulation.visibleEngagementSnapshot ?? {};
  if (
    kcTownHallVisibleEngagement.observedAt !== "2026-07-14" ||
    kcTownHallVisibleEngagement.accountAuthoredRecordsWithAnyDisplayedInteraction !==
      77 ||
    kcTownHallVisibleEngagement.accountAuthoredDisplayedReplies !== 22 ||
    kcTownHallVisibleEngagement.accountAuthoredDisplayedReposts !== 70 ||
    kcTownHallVisibleEngagement.accountAuthoredDisplayedLikes !== 174 ||
    kcTownHallVisibleEngagement.accountAuthoredDisplayedBookmarks !== 1 ||
    kcTownHallVisibleEngagement.accountAuthoredDisplayedInteractionUnits !== 267
  ) {
    socialMediaProductionErrors.push(
      "KC Town Hall dated visible-engagement snapshot no longer reconciles"
    );
  }

  const kcTownHallFixtureKeys = new Set();
  const kcTownHallFixtureStack = [kcTownHallFullPopulation];
  while (kcTownHallFixtureStack.length) {
    const value = kcTownHallFixtureStack.pop();
    if (!value || typeof value !== "object") continue;
    if (Array.isArray(value)) {
      kcTownHallFixtureStack.push(...value);
      continue;
    }
    for (const [key, child] of Object.entries(value)) {
      kcTownHallFixtureKeys.add(key.toLowerCase());
      kcTownHallFixtureStack.push(child);
    }
  }
  for (const forbiddenKey of [
    "text",
    "rawtext",
    "phonenumber",
    "cookies",
    "credentials",
    "session",
    "privatemessages"
  ]) {
    if (kcTownHallFixtureKeys.has(forbiddenKey)) {
      socialMediaProductionErrors.push(
        `KC Town Hall public fixture contains forbidden raw field: ${forbiddenKey}`
      );
    }
  }
  const serializedKcTownHallFixture = JSON.stringify(
    kcTownHallFullPopulation
  );
  for (const marker of blockedPublicRepoMarkers) {
    if (
      serializedKcTownHallFixture
        .toLowerCase()
        .includes(marker.toLowerCase())
    ) {
      socialMediaProductionErrors.push(
        `KC Town Hall public fixture contains blocked public-repo marker: ${marker}`
      );
    }
  }

  const nycArtCAccount = socialAccountById.get("SOCIAL-NYCARTC-X");
  for (const projectId of [
    "nyc-artist-coalition",
    "let-nyc-dance",
    "talks-not-raids",
    "save-nyc-spaces",
    "fair-rent-nyc"
  ]) {
    if (!nycArtCAccount?.projectIds.includes(projectId)) {
      socialMediaProductionErrors.push(`@NYCArtC must retain the ${projectId} shared-identity edge`);
    }
  }
  if (nycArtCAccount?.accountRelationship !== "shared-coalition") {
    socialMediaProductionErrors.push("@NYCArtC must remain a shared coalition identity");
  }

  for (const id of requiredSocialClaimIds) {
    if (!claimById.has(id)) socialMediaProductionErrors.push(`Missing required social-media claim: ${id}`);
  }
  for (const id of requiredSocialInquiryIds) {
    if (!inquiryById.has(id)) socialMediaProductionErrors.push(`Missing required social-media inquiry: ${id}`);
  }
  if (!intakeIdSet.has("INTAKE-PROJECT-SOCIAL-ACCOUNT-ARCHIVE-2026")) {
    socialMediaProductionErrors.push("Missing project social-account archival intake");
  }
  if (!intakeIdSet.has("INTAKE-PROJECT-SOCIAL-SOURCE-LEADS-2026")) {
    socialMediaProductionErrors.push("Missing project social source-lead staging intake");
  }
  const selectedSocialIntake = knowledgeBank.intakes.find(
    ({ id }) => id === "INTAKE-PROJECT-SOCIAL-ACCOUNT-ARCHIVE-2026"
  );
  const socialSourceLeadIntake = knowledgeBank.intakes.find(
    ({ id }) => id === "INTAKE-PROJECT-SOCIAL-SOURCE-LEADS-2026"
  );
  const claimLinkedSourceIds = new Set(
    knowledgeBank.claims.flatMap((claim) => claim.evidence.map(({ sourceId }) => sourceId))
  );
  if (
    selectedSocialIntake?.claimIds.some((claimId) => claimById.get(claimId)?.status === "disallowed")
  ) {
    socialMediaProductionErrors.push("Selected social intake includes a disallowed claim");
  }
  if (
    socialSourceLeadIntake?.sourceIds.some((sourceId) => claimLinkedSourceIds.has(sourceId))
  ) {
    socialMediaProductionErrors.push("Metadata-only social source leads include claim-linked evidence");
  }
  if (!intakeIdSet.has("INTAKE-WOWLIST-FULL-POPULATION-2026")) {
    socialMediaProductionErrors.push("Missing WOW List full-population archival intake");
  }
  if (!intakeIdSet.has("INTAKE-KCTOWNHALL-FULL-POPULATION-2026")) {
    socialMediaProductionErrors.push(
      "Missing KC Town Hall full-population archival intake"
    );
  }

  const requiredSocialSourceIds = new Set([
    ...knowledgeBank.socialAccounts.flatMap((account) => account.sourceIds),
    "SRC-JAMIE-SOCIAL-ACCOUNT-ESTABLISHMENT-2026",
    "SRC-X-NYCARTC-MADEINNY-TOWN-HALL-2017",
    "SRC-DOCUMENT-JOURNAL-NIGHTLIFE-2018",
    "SRC-NYC-NIGHTLIFE-ADVISORY-REPORT-2021"
  ]);
  for (const id of requiredSocialSourceIds) {
    const source = sourceById.get(id);
    if (!source) {
      socialMediaProductionErrors.push(`Missing required social-media source: ${id}`);
    } else if (!source.supportsGenerally.length || !source.doesNotEstablish.length) {
      socialMediaProductionErrors.push(`${id} needs explicit support and does-not-establish boundaries`);
    }
  }

  const socialBoundaryText = JSON.stringify([
    ...requiredSocialClaimIds.map((id) => claimById.get(id)),
    ...knowledgeBank.socialAccounts
  ]).toLowerCase();
  for (const boundary of [
    "jamie wrote every",
    "official council endorsement",
    "policy causality",
    "recovery floor",
    "changing stewardship",
    "unresolved"
  ]) {
    if (!socialBoundaryText.includes(boundary)) {
      socialMediaProductionErrors.push(`Social-media production is missing the ${boundary} boundary`);
    }
  }

  const expectedActiveSocialClaims = new Set([
    "CLM-PROJECT-SOCIAL-IDENTITY-SYSTEMS",
    "CLM-CALLNYC-COUNCIL-ACCOUNT-ENGAGEMENT-2016",
    "CLM-NYCARTC-SHARED-CAMPAIGN-IDENTITY",
    "CLM-NYCARTC-COUNCIL-ACCOUNT-ENGAGEMENT",
    "CLM-WOWLIST-ORGANIZER-PRODUCT-USE",
    "CLM-WOWLIST-JAMIE-PEER-ATTRIBUTION",
    "CLM-WOWLIST-HISTORICAL-SCALE-SNAPSHOT",
    "CLM-KCTOWNHALL-DURABLE-PUBLIC-IDENTITY",
    "CLM-KCTOWNHALL-ACCOUNT-ESTABLISHMENT-ROLE",
    "CLM-KCTOWNHALL-RESIDENT-INPUT-SURFACE",
    "CLM-KCTOWNHALL-TIRE-OPERATING-PATTERN",
    "CLM-KCTOWNHALL-TIRE-DROPOFF-CORROBORATION",
    "CLM-KCTOWNHALL-COUNCIL-RESPONSE-FLOOR"
  ]);
  for (const claimId of expectedActiveSocialClaims) {
    const active = claimById.get(claimId)?.projections.filter((projection) => projection.status === "active") ?? [];
    if (active.length !== 1) socialMediaProductionErrors.push(`${claimId} must have exactly one selected active projection`);
  }
  const deprecatedWowListOmnibus = claimById.get("CLM-WOWLIST-PUBLIC-ORIGIN-AND-USE");
  if (
    deprecatedWowListOmnibus?.status !== "disallowed" ||
    deprecatedWowListOmnibus.projections.some((projection) => projection.status !== "deprecated")
  ) {
    socialMediaProductionErrors.push("The omnibus WOW List origin-and-use claim must remain deprecated in favor of atomic lineage and product-support claims");
  }
  if (
    claimById
      .get("CLM-WOWLIST-FULL-POPULATION-PRACTICE")
      ?.projections.some((projection) => projection.status === "active")
  ) {
    socialMediaProductionErrors.push("The WOW List population-reconciliation claim must remain internal rather than replacing the public product story");
  }
  for (const claimId of [
    "CLM-KCTOWNHALL-FULL-POPULATION-PRACTICE",
    "CLM-KCTOWNHALL-CIVIC-RESOURCE-CURATION",
    "CLM-KCTOWNHALL-VISIBLE-ENGAGEMENT-SNAPSHOT"
  ]) {
    if (
      claimById
        .get(claimId)
        ?.projections.some((projection) => projection.status === "active")
    ) {
      socialMediaProductionErrors.push(
        `${claimId} must remain internal rather than displacing the bounded public operating story`
      );
    }
  }

  const serializedSocialRecords = JSON.stringify([
    ...knowledgeBank.socialAccounts,
    ...requiredSocialClaimIds.map((id) => claimById.get(id)),
    ...requiredSocialInquiryIds.map((id) => inquiryById.get(id)),
    ...[...requiredSocialSourceIds].map((id) => sourceById.get(id)),
    knowledgeBank.intakes.find((intake) => intake.id === "INTAKE-PROJECT-SOCIAL-ACCOUNT-ARCHIVE-2026")
  ]);
  for (const marker of blockedPublicRepoMarkers) {
    if (serializedSocialRecords.toLowerCase().includes(marker.toLowerCase())) {
      socialMediaProductionErrors.push(`Social-media production records contain blocked public-repo marker: ${marker}`);
    }
  }

  for (const sourceId of requiredNYCArtCXArchivalSourceIds) {
    const source = sourceById.get(sourceId);
    if (!source) {
      nycArtCXArchivalProductionErrors.push(
        `Missing NYC Artist Coalition X archival source: ${sourceId}`
      );
      continue;
    }
    if (!source.supportsGenerally.length || !source.doesNotEstablish.length) {
      nycArtCXArchivalProductionErrors.push(
        `${sourceId} needs explicit support and does-not-establish boundaries`
      );
    }
  }
  for (const claimId of requiredNYCArtCXArchivalClaimIds) {
    const claim = claimById.get(claimId);
    if (!claim) {
      nycArtCXArchivalProductionErrors.push(
        `Missing NYC Artist Coalition X archival claim: ${claimId}`
      );
      continue;
    }
    if (claim.projections.some((projection) => projection.status === "active")) {
      nycArtCXArchivalProductionErrors.push(
        `${claimId} must remain held in the knowledge bank until editorial selection`
      );
    }
  }
  if (!intakeIdSet.has("INTAKE-NYCARTC-X-FULL-POPULATION-2026")) {
    nycArtCXArchivalProductionErrors.push(
      "Missing NYC Artist Coalition full-population X intake"
    );
  }
  const ownerArchiveInquiry = inquiryById.get("INQ-NYCARTC-OWNER-ARCHIVE-2026");
  const ownerArchiveBoundary = JSON.stringify([
    ownerArchiveInquiry?.findings,
    ownerArchiveInquiry?.limitations,
    ownerArchiveInquiry?.publicSummary
  ]).toLowerCase();
  if (
    ownerArchiveInquiry?.resultStatus !== "partially-recovered" ||
    !ownerArchiveBoundary.includes("first-party") ||
    !ownerArchiveBoundary.includes("unresolved")
  ) {
    nycArtCXArchivalProductionErrors.push(
      "The owner-archive inquiry must preserve the partially recovered and unresolved boundary"
    );
  }

  const nycArtCItems = nycArtCFullPopulation.items ?? [];
  const recoveredNYCArtCItems = nycArtCItems.filter(
    ({ status }) => status === "recovered-public-status"
  );
  const unresolvedNYCArtCItems = nycArtCItems.filter(
    ({ status }) => status === "unresolved-profile-count-slot"
  );
  const accountStatuses = recoveredNYCArtCItems.filter(
    ({ relationship }) => relationship === "account-status"
  );
  const reposts = recoveredNYCArtCItems.filter(
    ({ relationship }) => relationship === "repost"
  );
  const dispositionIds = new Set(
    nycArtCItems.map(({ dispositionId }) => dispositionId)
  );
  const recoveredStatusIds = new Set(
    recoveredNYCArtCItems.map(({ statusId }) => statusId)
  );
  const populationAudit = nycArtCFullPopulation.populationAudit ?? {};
  const aggregateFindings = nycArtCFullPopulation.aggregateFindings ?? {};

  if (
    nycArtCFullPopulation.account !== "@NYCArtC" ||
    populationAudit.profileCountObserved !== 5124 ||
    nycArtCItems.length !== 5124 ||
    dispositionIds.size !== 5124 ||
    recoveredNYCArtCItems.length !== 3367 ||
    recoveredStatusIds.size !== 3367 ||
    unresolvedNYCArtCItems.length !== 1757 ||
    accountStatuses.length !== 715 ||
    reposts.length !== 2652 ||
    recoveredNYCArtCItems.length + unresolvedNYCArtCItems.length !== 5124
  ) {
    nycArtCXArchivalProductionErrors.push(
      "NYC Artist Coalition 5,124-slot population ledger no longer reconciles"
    );
  }
  if (
    aggregateFindings.outboundLinkOccurrences !== 1772 ||
    aggregateFindings.uniqueOutboundUrls !== 1241
  ) {
    nycArtCXArchivalProductionErrors.push(
      "NYC Artist Coalition posted-link inventory no longer reconciles"
    );
  }
  if (
    recoveredNYCArtCItems.some(
      ({ statusId, statusUrl, publishedAt, contentDigestSha256 }) =>
        !statusId || !statusUrl || !publishedAt || !contentDigestSha256
    ) ||
    unresolvedNYCArtCItems.some(
      ({ statusId, statusUrl, publishedAt, relationship }) =>
        statusId || statusUrl || publishedAt || relationship
    )
  ) {
    nycArtCXArchivalProductionErrors.push(
      "Recovered and unresolved NYC Artist Coalition ledger rows are not cleanly separated"
    );
  }

  const inboundRecords = nycArtCInboundEngagement.records ?? [];
  const explicitMentions = inboundRecords.filter(
    ({ evidenceDisposition }) => evidenceDisposition === "explicit-account-mention"
  );
  const contextRecords = inboundRecords.filter(
    ({ evidenceDisposition }) => evidenceDisposition === "search-or-thread-context"
  );
  const distinctInboundAccounts = new Set(
    inboundRecords.map(({ authorHandle }) => authorHandle?.toLowerCase())
  );
  const stakeholderCount = (stakeholderGroup) =>
    inboundRecords.filter((record) => record.stakeholderGroup === stakeholderGroup)
      .length;
  if (
    inboundRecords.length !== 501 ||
    explicitMentions.length !== 347 ||
    contextRecords.length !== 154 ||
    distinctInboundAccounts.size !== 178 ||
    stakeholderCount("nyc-council-member-account") !== 24 ||
    stakeholderCount("nyc-city-agency-account") !== 16 ||
    stakeholderCount("coalition-civic-or-cultural-partner") !== 235
  ) {
    nycArtCXArchivalProductionErrors.push(
      "NYC Artist Coalition inbound stakeholder ledger no longer reconciles"
    );
  }

  const publicLedgerKeys = new Set();
  const publicLedgerStack = [nycArtCFullPopulation, nycArtCInboundEngagement];
  while (publicLedgerStack.length) {
    const value = publicLedgerStack.pop();
    if (!value || typeof value !== "object") continue;
    if (Array.isArray(value)) {
      publicLedgerStack.push(...value);
      continue;
    }
    for (const [key, child] of Object.entries(value)) {
      publicLedgerKeys.add(key.toLowerCase());
      publicLedgerStack.push(child);
    }
  }
  for (const forbiddenKey of [
    "text",
    "rawtext",
    "phonenumber",
    "email",
    "cookies",
    "credentials",
    "session",
    "privatemessages"
  ]) {
    if (publicLedgerKeys.has(forbiddenKey)) {
      nycArtCXArchivalProductionErrors.push(
        `NYC Artist Coalition public ledger contains forbidden raw field: ${forbiddenKey}`
      );
    }
  }
  const serializedNYCArtCLedgers = JSON.stringify([
    nycArtCFullPopulation,
    nycArtCInboundEngagement
  ]).toLowerCase();
  for (const marker of blockedPublicRepoMarkers) {
    if (serializedNYCArtCLedgers.includes(marker.toLowerCase())) {
      nycArtCXArchivalProductionErrors.push(
        `NYC Artist Coalition public ledger contains blocked public-repo marker: ${marker}`
      );
    }
  }

  const fullPopulationClaim = claimById.get(
    "CLM-NYCARTC-FULL-PROFILE-DISPOSITION"
  );
  const fullPopulationBoundary = JSON.stringify([
    fullPopulationClaim?.boundaries,
    fullPopulationClaim?.antiClaims,
    sourceById.get("SRC-X-NYCARTC-FULL-POPULATION-LEDGER-2026")
      ?.doesNotEstablish
  ]).toLowerCase();
  for (const boundary of [
    "not 100 percent item-level",
    "first-party",
    "deletion history",
    "jamie authored every"
  ]) {
    if (!fullPopulationBoundary.includes(boundary)) {
      nycArtCXArchivalProductionErrors.push(
        `NYC Artist Coalition population claim is missing the ${boundary} boundary`
      );
    }
  }

  for (const intakeId of requiredUrbanhermitIntakeIds) {
    if (!intakeIdSet.has(intakeId)) {
      urbanhermitProductionErrors.push(`Missing Urbanhermit intake: ${intakeId}`);
    }
  }
  for (const sourceId of requiredUrbanhermitSourceIds) {
    const source = sourceById.get(sourceId);
    if (!source) {
      urbanhermitProductionErrors.push(`Missing Urbanhermit source: ${sourceId}`);
      continue;
    }
    if (!source.supportsGenerally.length || !source.doesNotEstablish.length) {
      urbanhermitProductionErrors.push(
        `${sourceId} needs explicit support and does-not-establish boundaries`
      );
    }
  }
  for (const claimId of requiredUrbanhermitClaimIds) {
    const claim = claimById.get(claimId);
    if (!claim) {
      urbanhermitProductionErrors.push(`Missing Urbanhermit claim: ${claimId}`);
      continue;
    }
    if (
      claim.projections.some(
        (projection) => projection.status !== "hold" || projection.surfaces.length
      )
    ) {
      urbanhermitProductionErrors.push(
        `${claimId} must remain held with no public surface until editorial selection`
      );
    }
  }
  for (const inquiryId of requiredUrbanhermitInquiryIds) {
    if (!inquiryById.has(inquiryId)) {
      urbanhermitProductionErrors.push(`Missing Urbanhermit inquiry: ${inquiryId}`);
    }
  }

  const urbanPopulation = urbanhermitFullPopulation.population ?? {};
  const urbanLinks = urbanhermitFullPopulation.sourceCirculation ?? {};
  const urbanStakeholders = urbanhermitFullPopulation.incomingStakeholderSearch ?? {};
  const urbanInteraction =
    urbanhermitFullPopulation.heldVisibleInteractionObservation ?? {};
  if (
    urbanhermitFullPopulation.account !== "@urbanhermit" ||
    urbanPopulation.profileReported !== 434 ||
    urbanPopulation.recoveredAccountItems !== 434 ||
    urbanPopulation.recoveryGap !== 0 ||
    urbanPopulation.accountAuthored !== 353 ||
    urbanPopulation.externalSourceNativeReposts !== 81 ||
    urbanPopulation.independentCompletePasses !== 3 ||
    urbanPopulation.allPassesRecoveredSamePopulation !== true ||
    urbanPopulation.passStatusIdDigests?.length !== 3 ||
    !urbanPopulation.passStatusIdDigests?.every(
      (pass) =>
        pass.distinctStatusIds === 434 &&
        pass.statusIdDigest === urbanPopulation.recoveredStatusIdDigest
    )
  ) {
    urbanhermitProductionErrors.push(
      "Urbanhermit 434-record live-profile population no longer reconciles"
    );
  }
  if (
    urbanLinks.recordsWithExternalLinks !== 277 ||
    urbanLinks.normalizedRecordLinkPairs !== 345 ||
    urbanLinks.distinctShortUrls !== 321 ||
    urbanLinks.researchQueueDisposition?.status !== "open" ||
    urbanLinks.researchQueueDisposition?.bulkUrlInventoryPublished !== false
  ) {
    urbanhermitProductionErrors.push(
      "Urbanhermit posted-source inventory or open research queue no longer reconciles"
    );
  }
  if (
    urbanStakeholders.recoveredPublicRecords !== 26 ||
    urbanStakeholders.missionRelevantThirdPartyRecords !== 15 ||
    urbanStakeholders.missionRelevantThirdPartyAccounts !== 9 ||
    urbanStakeholders.missionRelevantConversationContexts !== 2 ||
    urbanStakeholders.redactedNonMissionPersonalOrNetworkRecords !== 9
  ) {
    urbanhermitProductionErrors.push(
      "Urbanhermit bounded incoming-stakeholder inventory no longer reconciles"
    );
  }
  if (
    urbanInteraction.accountAuthoredRecordsWithOneOrMoreDisplayedInteraction !== 85 ||
    urbanInteraction.displayedInteractionUnits?.likes !== 175 ||
    urbanInteraction.displayedInteractionUnits?.replies !== 8 ||
    urbanInteraction.displayedInteractionUnits?.reposts !== 60 ||
    urbanInteraction.displayedInteractionUnits?.total !== 243 ||
    urbanInteraction.status !== "hold"
  ) {
    urbanhermitProductionErrors.push(
      "Urbanhermit dated visible-interaction snapshot no longer reconciles or is no longer held"
    );
  }

  const urbanCanonicalUrls = new Set(
    knowledgeBank.sources.map((source) => source.canonicalUrl).filter(Boolean)
  );
  for (const lead of urbanhermitFullPopulation.selectedSourceLeads ?? []) {
    if (!urbanCanonicalUrls.has(lead.canonicalUrl)) {
      urbanhermitProductionErrors.push(
        `Urbanhermit selected source lead has no canonical source record: ${lead.id}`
      );
    }
  }
  const urbanProtectedSource = sourceById.get(
    "SRC-URBANHERM-X-AUTHENTICATED-CAPTURE-2026-07-15"
  );
  if (
    urbanProtectedSource?.visibility !== "protected" ||
    urbanProtectedSource?.preservationStatus !== "private" ||
    urbanProtectedSource?.canonicalUrl ||
    urbanProtectedSource?.archiveUrl ||
    urbanProtectedSource?.assetUrl
  ) {
    urbanhermitProductionErrors.push(
      "Urbanhermit protected capture must remain non-linkable and outside the public repository"
    );
  }

  const ownerInquiry = inquiryById.get("INQ-URBANHERM-X-OWNER-ARCHIVE-2026");
  const ownerBoundary = JSON.stringify([
    ownerInquiry?.findings,
    ownerInquiry?.limitations,
    ownerInquiry?.publicSummary
  ]).toLowerCase();
  if (
    ownerInquiry?.resultStatus !== "partially-recovered" ||
    !ownerBoundary.includes("owner") ||
    !ownerBoundary.includes("live profile")
  ) {
    urbanhermitProductionErrors.push(
      "Urbanhermit owner-archive inquiry must preserve the live-profile and all-ever boundary"
    );
  }

  const tractionClaim = claimById.get("CLM-URBANHERM-X-VISIBLE-TRACTION-SNAPSHOT");
  const tractionBoundary = JSON.stringify([
    tractionClaim?.boundaries,
    tractionClaim?.antiClaims
  ]).toLowerCase();
  for (const boundary of ["not unique people", "reach", "impact", "mutable"]) {
    if (!tractionBoundary.includes(boundary)) {
      urbanhermitProductionErrors.push(
        `Urbanhermit traction claim is missing the ${boundary} boundary`
      );
    }
  }
  const roleBoundaryText = JSON.stringify(
    requiredUrbanhermitClaimIds.map((id) => ({
      boundaries: claimById.get(id)?.boundaries,
      antiClaims: claimById.get(id)?.antiClaims
    }))
  ).toLowerCase();
  for (const boundary of [
    "m.c. schmidt",
    "legislative authorship",
    "sole program ownership",
    "tunnel restoration"
  ]) {
    if (!roleBoundaryText.includes(boundary)) {
      urbanhermitProductionErrors.push(
        `Urbanhermit role claims are missing the ${boundary} boundary`
      );
    }
  }

  const serializedUrbanhermit = JSON.stringify([
    urbanhermitFullPopulation,
    requiredUrbanhermitIntakeIds.map((id) =>
      knowledgeBank.intakes.find((intake) => intake.id === id)
    ),
    requiredUrbanhermitSourceIds.map((id) => sourceById.get(id)),
    requiredUrbanhermitClaimIds.map((id) => claimById.get(id)),
    requiredUrbanhermitInquiryIds.map((id) => inquiryById.get(id))
  ]).toLowerCase();
  for (const marker of blockedPublicRepoMarkers) {
    if (serializedUrbanhermit.includes(marker.toLowerCase())) {
      urbanhermitProductionErrors.push(
        `Urbanhermit public records contain blocked public-repo marker: ${marker}`
      );
    }
  }
  for (const forbiddenKey of [
    '"items":',
    '"text":',
    '"visibletext":',
    '"engagementlabel":',
    '"authenticatedas":'
  ]) {
    if (JSON.stringify(urbanhermitFullPopulation).toLowerCase().includes(forbiddenKey)) {
      urbanhermitProductionErrors.push(
        `Urbanhermit minimized ledger contains forbidden row-level field: ${forbiddenKey}`
      );
    }
  }

  errors.push(
    ...coverageErrors,
    ...researchErrors,
    ...dispositionErrors,
    ...projectionErrors,
    ...pressErrors,
    ...kcTownHallErrors,
    ...archiveProductionErrors,
    ...sharedDriveProductionErrors,
    ...socialMediaProductionErrors,
    ...nycArtCXArchivalProductionErrors,
    ...urbanhermitProductionErrors
  );
  return {
    errors,
    checks: {
      coverage: {
        passed: coverageErrors.length === 0,
        errors: coverageErrors,
        evidence: `${knowledgeBank.intakes.length} intake records include all ${requiredSeedIntakeIds.length} required fragments.`
      },
      research: {
        passed: researchErrors.length === 0,
        errors: researchErrors,
        evidence: `${requiredResearchSourceIds.length} newly researched public sources have unique URLs, support boundaries, and claim edges.`
      },
      disposition: {
        passed: dispositionErrors.length === 0,
        errors: dispositionErrors,
        evidence: "Every intake destination resolves to a canonical source, claim, inquiry, duplicate, or protected hold."
      },
      projection: {
        passed: projectionErrors.length === 0,
        errors: projectionErrors,
        evidence: "No intake-linked claim is actively projected without separate evidence, public-use, and editorial-selection approval."
      },
      press: {
        passed: pressErrors.length === 0,
        errors: pressErrors,
        evidence: `${pressPlacements.length} campaign press placements resolve to ${articleSourceIds.size} canonical article sources across four archive-backed indexes without automatic claim projection.`
      },
      kcTownHall: {
        passed: kcTownHallErrors.length === 0,
        errors: kcTownHallErrors,
        evidence: "KC Town Hall preserves the municipal funding and stewardship sequence plus a separately governed Phase One field-practice layer: protected proposal and participant-memory sources, six atomic construction and neighborhood-operation claims, two public TiredOfTires sources, explicit collective credit, active research leads, and no automatic public projection."
      },
      archiveProduction: {
        passed: archiveProductionErrors.length === 0,
        errors: archiveProductionErrors,
        evidence: `${requiredArchiveSourceIds.length} sources, ${requiredArchiveClaimIds.length} claims, ${requiredArchiveInquiryIds.length} inquiries, and ${requiredArchiveIntakeIds.length} intakes preserve close-read archival production across Jamie Projects History, CRS, and job-hunt with only three selected public projections.`
      },
      sharedDriveProduction: {
        passed: sharedDriveProductionErrors.length === 0,
        errors: sharedDriveProductionErrors,
        evidence: `${requiredSharedDriveSourceIds.length} sources, ${requiredSharedDriveClaimIds.length} claims, ${requiredSharedDriveInquiryIds.length} inquiries, and ${requiredSharedDriveIntakeIds.length} intakes preserve a governed 110-drive inventory, selective close reading, protected Drive locators, and exactly four selected public-safe workflow projections.`
      },
      socialMediaProduction: {
        passed: socialMediaProductionErrors.length === 0,
        errors: socialMediaProductionErrors,
        evidence: "Four project accounts reconcile dated profile controls to recovered and unresolved slots. WOW List preserves its public-safe 38-record corpus and KC Town Hall preserves a public-safe 183-record corpus, all 31 distinct posted URLs, nine curated source leads, five separated conversation contexts, three direct Council-member responses, one external program corroborator, and dated engagement context; selected projections retain collective-authorship, stewardship, reach, endorsement, causality, and privacy boundaries."
      },
      nycArtCXArchivalProduction: {
        passed: nycArtCXArchivalProductionErrors.length === 0,
        errors: nycArtCXArchivalProductionErrors,
        evidence: "The @NYCArtC archival production preserves all 5,124 dated profile-count slots as 3,367 item-level recoveries plus 1,757 explicit unresolved slots; recomputes 715 account statuses, 2,652 reposts, 1,772 posted-link occurrences, 1,241 unique URLs, and a 501-record inbound stakeholder floor; links eight close-read mission sources; keeps all new projections held; and excludes raw text, private account data, and local paths."
      },
      urbanhermitProduction: {
        passed: urbanhermitProductionErrors.length === 0,
        errors: urbanhermitProductionErrors,
        evidence: "Three independent authenticated passes reconcile all 434 live-profile records; the public repo keeps only aggregates, digests, and selected role-bearing sources; 321 posted URLs remain dispositioned as a protected research queue; 15 mission-relevant third-party records from nine accounts and two conversation contexts retain bounded stakeholder meaning; all eight new claims remain held; and the all-ever owner-archive question stays open."
      }
    }
  };
}
