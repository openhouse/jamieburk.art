#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { knowledgeBank } from "../apps/www/src/data/knowledge-bank/records.ts";
import {
  nycaPressArticles,
  nycaPressCampaigns,
  nycaPressCorpusStats
} from "../apps/www/src/data/knowledge-bank/nyca-press-corpus.ts";
import publicRegistry from "../apps/www/src/data/knowledge-bank/public-registry.json" with { type: "json" };
import { validateKnowledgeBank } from "./lib/citation-validation.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const checks = [];

function check(dimension, label, points, passes, hard = false) {
  checks.push({ dimension, label, points, passes: Boolean(passes), hard });
}

function read(relativePath) {
  const absolute = path.join(repoRoot, relativePath);
  return existsSync(absolute) ? readFileSync(absolute, "utf8") : "";
}

const sourceById = new Map(knowledgeBank.sources.map((source) => [source.id, source]));
const observationById = new Map(
  knowledgeBank.observations.map((observation) => [observation.id, observation])
);
const claimById = new Map(knowledgeBank.claims.map((claim) => [claim.id, claim]));
const inquiryById = new Map(
  knowledgeBank.researchInquiries.map((inquiry) => [inquiry.id, inquiry])
);
const validationErrors = validateKnowledgeBank();

check(
  "Capture integrity",
  "Canonical registry passes structural and public-safety validation",
  8,
  validationErrors.length === 0,
  true
);
check(
  "Capture integrity",
  "Every intake item preserves at least one downstream route",
  7,
  knowledgeBank.intakeItems.every(
    (item) =>
      item.sourceIds.length ||
      item.observationIds.length ||
      item.claimIds.length ||
      item.researchInquiryIds.length
  ),
  true
);

const suppliedSourceIds = [
  "SRC-WATERWAYS-PITCH-2007-08-09",
  "SRC-WATERWAYS-CHARLOTTE-STREET-2009-09-01",
  "SRC-OPEN-HOUSE-GOOD-TIMES-2006-06-28",
  "SRC-NYCA-GOTHAMIST-CABARET-2017-06-19",
  "SRC-NYCA-NPR-CABARET-2017-09-20"
];

const portfolioExpansionSourceIds = [
  "SRC-SUNDAY-DINNER-GREENE-HILL-QA-2017-12-19",
  "SRC-NYCA-BEDFORD-BOWERY-DIY-SPACES-2017-02-07",
  "SRC-NYCA-SAVE-NYC-SPACES-SITE",
  "SRC-NYCA-EDGE-OF-SOUND-TOWN-HALL-2017-10-14",
  "SRC-NYCA-MIXMAG-CABARET-2017-09-20",
  "SRC-CLAUDETTE-MICHAEL-REES-AR",
  "SRC-KC-TOWN-HALL-CCED-MINUTES-2019",
  "SRC-KC-EIGHTH-STREET-TUNNEL-KCUR-2016-09-15",
  "SRC-WATERWAYS-PITCH-GULF-2009-09-03",
  "SRC-KC-FRONTIER-DREAMERS-2012-05-17"
];

const kcTownHallCouncilSourceIds = [
  "SRC-KC-TOWN-HALL-RESOLUTION-190649",
  "SRC-KC-TOWN-HALL-ORDINANCE-190642",
  "SRC-KC-TOWN-HALL-CCED-UPDATE-2022-05-17",
  "SRC-KC-TOWN-HALL-ORDINANCE-240317"
];

const kcTownHallPhaseOneSourceIds = [
  "SRC-KC-TOWN-HALL-CCED-PROPOSAL-2019",
  "SRC-KC-TOWN-HALL-JAMIE-ACCOUNT-2026-07-15"
];

const kcTownHallTransitionSourceId =
  "SRC-KC-TOWN-HALL-JAMIE-TRANSITION-ACCOUNT-2026-07-15";

const googleDriveProtectedSourceIds = [
  "SRC-JAMIE-SHARED-DRIVE-PRACTICE-2026-07-15",
  "SRC-GDRIVE-PORTFOLIO-ARCHIVE-REVIEW-2026-07-15",
  "SRC-GDRIVE-FAIR-RENT-IMPLEMENTATION-2023",
  "SRC-GDRIVE-196-ONBOARDING-2023"
];

const googleDrivePromotedClaimIds = [
  "CLM-FAIR-RENT-WEB-IMPLEMENTATION-2023",
  "CLM-196-ARTIST-RESIDENCY-ONBOARDING-2023"
];

const nterChngArchiveSourceIds = [
  "SRC-NTER-CHNG-OFFICIAL-SITE-WAYBACK-2011",
  "SRC-NTER-CHNG-JAMIE-EXHIBITION-ACCOUNT-2026-07-15",
  "SRC-AMERICA-NOW-HERE-NERMAN-2011",
  "SRC-AMERICA-NOW-HERE-SMITHSONIAN-RECORDS",
  "SRC-AMERICA-NOW-HERE-WAYBACK-RESEARCH-2026"
];

const callnycXCorpusSourceIds = [
  "SRC-CALLNYC-X-FULL-POPULATION-2026-07-15",
  "SRC-CALLNYC-X-LAUNCH-2016-03-05",
  "SRC-CALLNYC-X-JAMIE-IDENTIFICATION-2016-03-16",
  "SRC-CALLNYC-X-JSON-API-2016-04-20",
  "SRC-CALLNYC-X-POLITICO-CIRCULATION-2016-03-17",
  "SRC-CALLNYC-GIZMODO-311-2016-03-10",
  "SRC-CALLNYC-GOTHAMIST-PULASKI-2016-04-28"
];

const wowlistXCorpusSourceIds = [
  "SRC-WOWLIST-X-FULL-POPULATION-2026-07-15",
  "SRC-WOWLIST-X-SUPPORT-FEED-2015-04-24",
  "SRC-WOWLIST-X-SUPPORT-PROFILE-2015-04-24",
  "SRC-WOWLIST-X-SUPPORT-SUBMISSION-2015-04-24",
  "SRC-WOWLIST-X-SUPPORT-NYCDIY-IDENTITY-2016-09-01",
  "SRC-WOWLIST-X-SUPPORT-NYCDIY-JOIN-2016-09-01",
  "SRC-WOWLIST-X-SUPPORT-NYCDIY-LINEAGE-2016-09-01",
  "SRC-WOWLIST-GRASSTRONAUT-IN-EVERY-TOWN-2015",
  "SRC-WOWLIST-GOOD-TIMES-ZINES-2015",
  "SRC-WOWLIST-KQED-GHOST-SHIP-VIGIL-2016",
  "SRC-WOWLIST-MEOW-WOLF-DIY-FUND-2016"
];

check(
  "Source quality",
  "Every supplied and portfolio-expansion URL has a canonical source record",
  6,
  suppliedSourceIds.every((id) => sourceById.has(id)) &&
    portfolioExpansionSourceIds.length === 10 &&
    portfolioExpansionSourceIds.every((id) => sourceById.has(id)),
  true
);
check(
  "Source quality",
  "The WOW List full-population pass reaches all support and mission-context sources",
  6,
  wowlistXCorpusSourceIds.length === 11 &&
    wowlistXCorpusSourceIds.every((id) => sourceById.has(id)),
  true
);
check(
  "Source quality",
  "Public sources record access dates and negative boundaries",
  5,
  knowledgeBank.sources
    .filter((source) => source.visibility === "public")
    .every((source) => source.accessedAt && source.doesNotEstablish.length),
  true
);
check(
  "Source quality",
  "Research adds primary government corroboration for civic outcomes",
  4,
  [
    "SRC-NYCA-COUNCIL-CABARET-HEARING-2017-06-19",
    "SRC-NYCA-LEGISTAR-CABARET-REPEAL-2017",
    "SRC-NYCA-MOME-OFFICE-NIGHTLIFE-2017-09-19",
    "SRC-NYCA-LEGISTAR-MARCH-TRANSPARENCY-2019",
    "SRC-NYCA-MAYOR-CURE-2023-12-28"
  ].every((id) => sourceById.get(id)?.kind === "government-record")
);
check(
  "Source quality",
  "The four campaign indexes recover the complete deduplicated press corpus",
  6,
  nycaPressCampaigns.letnycdance.expected === 21 &&
    nycaPressCampaigns.talksnotraids.expected === 7 &&
    nycaPressCampaigns.savenycspaces.expected === 8 &&
    nycaPressCampaigns.fairrentnyc.expected === 9 &&
    nycaPressCorpusStats.placementCount === 45 &&
    nycaPressCorpusStats.uniqueArticleCount === 44 &&
    nycaPressCorpusStats.reusedSourceCount === 3 &&
    nycaPressCorpusStats.newArticleSourceCount === 41,
  true
);
check(
  "Source quality",
  "Every recovered article resolves to a source and Wayback fallback",
  6,
  nycaPressArticles.length === 44 &&
    new Set(nycaPressArticles.map((article) => article.sourceId)).size === 44 &&
    nycaPressCorpusStats.archivedArticleCount === 44 &&
    nycaPressArticles.every(
      (article) =>
        sourceById.has(article.sourceId) &&
        article.archiveUrl.startsWith("https://web.archive.org/web/")
    ),
  true
);
check(
  "Source quality",
  "KC Town Hall Council funding and later disposition use primary government records",
  6,
  kcTownHallCouncilSourceIds.every(
    (id) => sourceById.get(id)?.kind === "government-record"
  ),
  true
);
check(
  "Source quality",
  "KC Town Hall protected records expose claims and boundaries without exposing source assets",
  6,
  kcTownHallPhaseOneSourceIds.every(
    (id) =>
      sourceById.get(id)?.visibility === "protected" &&
      sourceById.get(id)?.preservationStatus === "private" &&
      sourceById.get(id)?.protectedLocatorId &&
      !sourceById.get(id)?.canonicalUrl &&
      !sourceById.get(id)?.assetUrl
  ),
  true
);

check(
  "Source quality",
  "Shared Drive evidence stays protected and omits underlying URLs",
  6,
  googleDriveProtectedSourceIds.every((id) => {
    const source = sourceById.get(id);
    return source?.visibility === "protected" &&
      source.preservationStatus === "private" &&
      source.protectedLocatorId &&
      !source.canonicalUrl &&
      !source.archiveUrl &&
      !source.assetUrl &&
      source.doesNotEstablish.length >= 4;
  }),
  true
);

check(
  "Source quality",
  "NTER CHNG recovery separates first-party proof, protected memory, institutional context, and bounded negative search",
  7,
  nterChngArchiveSourceIds.every((id) => sourceById.has(id)) &&
    sourceById.get("SRC-NTER-CHNG-OFFICIAL-SITE-WAYBACK-2011")?.kind ===
      "archived-web-capture" &&
    sourceById.get("SRC-NTER-CHNG-OFFICIAL-SITE-WAYBACK-2011")
      ?.preferredPublicUrl === "archive" &&
    sourceById.get("SRC-NTER-CHNG-JAMIE-EXHIBITION-ACCOUNT-2026-07-15")
      ?.visibility === "protected" &&
    !sourceById.get("SRC-NTER-CHNG-JAMIE-EXHIBITION-ACCOUNT-2026-07-15")
      ?.canonicalUrl &&
    sourceById.get("SRC-AMERICA-NOW-HERE-WAYBACK-RESEARCH-2026")
      ?.doesNotEstablish.some((value) => /absent/i.test(value)),
  true
);

check(
  "Source quality",
  "The CallNYC full-population pass preserves a bounded source ecology",
  7,
  callnycXCorpusSourceIds.every((id) => sourceById.has(id)) &&
    sourceById.get("SRC-CALLNYC-X-FULL-POPULATION-2026-07-15")
      ?.doesNotEstablish.includes("identities behind aggregate counters") &&
    sourceById.get("SRC-CALLNYC-GIZMODO-311-2016-03-10")
      ?.doesNotEstablish.includes("CallNYC coverage by Gizmodo") &&
    sourceById.get("SRC-CALLNYC-GOTHAMIST-PULASKI-2016-04-28")
      ?.doesNotEstablish.includes("CallNYC coverage by Gothamist"),
  true
);

check(
  "Atomic observations",
  "Every researched intake links atomic observations",
  5,
  knowledgeBank.intakeItems
    .filter((item) => item.researchStatus === "researched")
    .every((item) => item.observationIds.length > 0)
);
check(
  "Atomic observations",
  "Every observation links to a valid source and claim or inquiry",
  6,
  knowledgeBank.observations.every(
    (observation) =>
      sourceById.has(observation.sourceId) &&
      (observation.claimIds.some((id) => claimById.has(id)) ||
        observation.researchInquiryIds.some((id) => inquiryById.has(id)))
  ),
  true
);
check(
  "Atomic observations",
  "The first run captures both waterways and nightlife observations",
  4,
  knowledgeBank.observations.some(
    (observation) => observation.project === "waterways-participatory-art"
  ) &&
    knowledgeBank.observations.some(
      (observation) => observation.project === "nyc-artist-coalition"
    )
);

check(
  "Atomic observations",
  "Shared Drive ingestion preserves handoff, Fair Rent, and 196 as separate observations",
  5,
  [
    "OBS-GDRIVE-JAMIE-HANDOFF-PRACTICE",
    "OBS-GDRIVE-FAIR-RENT-DELIVERY-STATE",
    "OBS-GDRIVE-196-ONBOARDING-WORKFLOW"
  ].every((id) => observationById.get(id)?.status === "verified")
);

check(
  "Atomic observations",
  "NTER CHNG observations distinguish recovered facts from Jamie's provisional exhibition account",
  6,
  observationById.get("OBS-NTER-CHNG-OFFICIAL-SITE-DESCRIPTION-CREDITS")
    ?.status === "verified" &&
    observationById.get("OBS-NTER-CHNG-AMERICA-NOW-HERE-ACCOUNT")?.status ===
      "provisional" &&
    observationById.get("OBS-AMERICA-NOW-HERE-WAYBACK-NO-REFERENCE-RECOVERED")
      ?.status === "verified",
  true
);

check(
  "Claim maturity",
  "Shared Drive projections retain explicit scope and anti-claim boundaries",
  6,
  googleDrivePromotedClaimIds.every((id) => {
    const claim = claimById.get(id);
    return claim?.status === "confirmed-with-boundary" &&
      claim.boundaries.length >= 2 &&
      claim.antiClaims.length >= 3 &&
      claim.evidence.every((item) => sourceById.has(item.sourceId));
  }),
  true
);

check(
  "Claim maturity",
  "Strong waterways and participatory-program claims are confirmed",
  6,
  [
    "CLM-WATERWAYS-RAFT-EXPEDITION",
    "CLM-WATERWAYS-GREAT-ACCOMMODATIONS",
    "CLM-OPEN-HOUSE-PARTICIPATORY-PROGRAMS"
  ].every((id) =>
    ["confirmed", "confirmed-with-boundary"].includes(claimById.get(id)?.status)
  )
);
check(
  "Claim maturity",
  "NTER CHNG project credit is strengthened while the exhibition connection stays held and bounded",
  8,
  claimById.get("CLM-NTER-CHNG-INTERACTIVE-INSTALLATION")?.status ===
      "confirmed-with-boundary" &&
    claimById
      .get("CLM-NTER-CHNG-INTERACTIVE-INSTALLATION")
      ?.evidence.some(
        (item) => item.sourceId === "SRC-NTER-CHNG-OFFICIAL-SITE-WAYBACK-2011"
      ) &&
    claimById.get("CLM-NTER-CHNG-AMERICA-NOW-HERE-INCLUSION")?.status ===
      "use-with-care" &&
    claimById
      .get("CLM-NTER-CHNG-AMERICA-NOW-HERE-INCLUSION")
      ?.projections.every((projection) => projection.status !== "active") &&
    claimById
      .get("CLM-NTER-CHNG-AMERICA-NOW-HERE-INCLUSION")
      ?.antiClaims.some((value) => /Nerman Museum/i.test(value)) &&
    claimById
      .get("CLM-NTER-CHNG-AMERICA-NOW-HERE-INCLUSION")
      ?.antiClaims.some((value) => /Wayback review proves/i.test(value)),
  true
);
check(
  "Atomic observations",
  "KC Town Hall decomposes document evidence from first-person memory",
  6,
  [
    "OBS-KC-TOWN-HALL-PROPOSER-TEAM-2019",
    "OBS-KC-TOWN-HALL-PHASE-ONE-COMPLETED-2019",
    "OBS-KC-TOWN-HALL-NEIGHBORHOOD-SURVEY-2019"
  ].every((id) =>
    observationById.get(id)?.sourceId === "SRC-KC-TOWN-HALL-CCED-PROPOSAL-2019" &&
    observationById.get(id)?.status === "verified"
  ) &&
    [
      "OBS-KC-TOWN-HALL-GENERAL-CONTRACTOR-ACCOUNT",
      "OBS-KC-TOWN-HALL-SITE-LISTENING-ACCOUNT",
      "OBS-KC-TIRED-OF-TIRES-ACCOUNT",
      "OBS-KC-CLEVELAND-UNIFY-TO-BEAUTIFY-ACCOUNT"
    ].every((id) =>
      observationById.get(id)?.sourceId ===
        "SRC-KC-TOWN-HALL-JAMIE-ACCOUNT-2026-07-15" &&
      observationById.get(id)?.status === "provisional"
    ),
  true
);
check(
  "Claim maturity",
  "Cabaret Law contribution is strong and collectively bounded",
  6,
  claimById.get("CLM-NYCA-CABARET-LAW-CONTRIBUTION")?.status ===
    "confirmed-with-boundary" &&
    claimById
      .get("CLM-NYCA-CABARET-LAW-CONTRIBUTION")
      ?.antiClaims.some((value) => /single-handedly/i.test(value)),
  true
);
check(
  "Claim maturity",
  "Office of Nightlife and MARCH claims retain open causal boundaries",
  4,
  [
    "CLM-NYCA-OFFICE-NIGHTLIFE-TOWN-HALL",
    "CLM-NYCA-TALKS-NOT-RAIDS-LONG-ARC"
  ].every((id) => claimById.get(id)?.status === "use-with-care")
);
check(
  "Claim maturity",
  "Recovered co-founder and bounded CallNYC engagement claims are strong without claiming completeness",
  4,
  claimById.get("CLM-NYCA-COFOUNDER-ROLE")?.status ===
      "confirmed-with-boundary" &&
    claimById
      .get("CLM-NYCA-COFOUNDER-ROLE")
      ?.boundaries.some((boundary) => /division of labor|chronology/i.test(boundary)) &&
    claimById.get("CLM-CALLNYC-COUNCIL-ENGAGEMENT-METRICS")?.status ===
      "confirmed-with-boundary" &&
    claimById
      .get("CLM-CALLNYC-COUNCIL-ENGAGEMENT-METRICS")
      ?.projections.some(
        (projection) =>
          projection.status === "active" &&
          projection.surfaces.includes("/work/callnyc") &&
          /at least six/i.test(projection.text)
      ) &&
    claimById
      .get("CLM-CALLNYC-COUNCIL-ENGAGEMENT-METRICS")
      ?.boundaries.some((boundary) => /do not describe.*comprehensive/i.test(boundary)),
  true
);
check(
  "Claim maturity",
  "Social identity claims separate establishment, authorship, participation, and engagement",
  7,
  claimById.get("CLM-PROJECT-SOCIAL-IDENTITY-SYSTEMS")?.status ===
      "use-with-care" &&
    claimById
      .get("CLM-PROJECT-SOCIAL-IDENTITY-SYSTEMS")
      ?.antiClaims.some((value) => /authored every project post/i.test(value)) &&
    claimById.get("CLM-NYCA-X-PUBLIC-IDENTITY-CONTINUITY")?.status ===
      "confirmed-with-boundary" &&
    claimById
      .get("CLM-NYCA-X-PUBLIC-IDENTITY-CONTINUITY")
      ?.boundaries.some((value) => /not a complete platform export/i.test(value)) &&
    claimById.get("CLM-NYCA-X-COUNCIL-ENGAGEMENT")?.status ===
      "confirmed-with-boundary" &&
    claimById
      .get("CLM-NYCA-X-COUNCIL-ENGAGEMENT")
      ?.antiClaims.some((value) => /Only seven Council members/i.test(value)) &&
    sourceById
      .get("SRC-PROJECT-X-AUTHENTICATED-PROFILE-INVENTORY-2026-07-15")
      ?.doesNotEstablish.some((value) => /authored every post/i.test(value)),
  true
);
check(
  "Claim maturity",
  "Campaign website authorship is direct, specific, and collectively bounded",
  5,
  claimById.get("CLM-NYCA-CAMPAIGN-WEBSITE-AUTHORSHIP")?.status ===
      "confirmed-with-boundary" &&
    ["Let NYC Dance", "Talks Not Raids", "Save NYC Spaces", "FairRentNYC"].every(
      (name) =>
        claimById
          .get("CLM-NYCA-CAMPAIGN-WEBSITE-AUTHORSHIP")
          ?.internalClaim.includes(name)
    ) &&
    claimById
      .get("CLM-NYCA-CAMPAIGN-WEBSITE-AUTHORSHIP")
      ?.antiClaims.some((value) => /solely led|alone caused/i.test(value)),
  true
);
check(
  "Claim maturity",
  "Press and commercial-rent claims preserve attribution boundaries",
  5,
  claimById.get("CLM-NYCA-CAMPAIGN-PRESS-CORPUS")?.status ===
      "confirmed-with-boundary" &&
    claimById
      .get("CLM-NYCA-CAMPAIGN-PRESS-CORPUS")
      ?.boundaries.some((value) => /inclusion.*endorsed/i.test(value)) &&
    claimById.get("CLM-NYCA-COMMERCIAL-RENT-ADVOCACY-CONTEXT")?.status ===
      "confirmed-with-boundary" &&
    claimById
      .get("CLM-NYCA-COMMERCIAL-RENT-ADVOCACY-CONTEXT")
      ?.boundaries.some((value) => /do not establish Jamie's complete individual/i.test(value)),
  true
);
check(
  "Claim maturity",
  "KC Town Hall distinguishes Council appropriation from receipt and later disposition",
  6,
  claimById.get("CLM-KC-TOWN-HALL-COUNCIL-APPROPRIATION")?.status ===
      "confirmed-with-boundary" &&
    [
      "SRC-KC-TOWN-HALL-RESOLUTION-190649",
      "SRC-KC-TOWN-HALL-ORDINANCE-190642",
      "SRC-KC-TOWN-HALL-CCED-UPDATE-2022-05-17",
      "SRC-KC-TOWN-HALL-ORDINANCE-240317"
    ].every((sourceId) =>
      claimById
        .get("CLM-KC-TOWN-HALL-COUNCIL-APPROPRIATION")
        ?.evidence.some((item) => item.sourceId === sourceId)
    ) &&
    claimById
      .get("CLM-KC-TOWN-HALL-COUNCIL-APPROPRIATION")
      ?.boundaries.some((value) => /appropriation is not receipt.*disbursement/i.test(value)) &&
    claimById
      .get("CLM-KC-TOWN-HALL-COUNCIL-APPROPRIATION")
      ?.antiClaims.some((value) => /received or spent/i.test(value)),
  true
);
check(
  "Claim maturity",
  "KC Town Hall Phase One is strong while first-person role claims remain bounded",
  8,
  claimById.get("CLM-KC-TOWN-HALL-PHASE-ONE-COMPLETION")?.status ===
      "confirmed-with-boundary" &&
    claimById
      .get("CLM-KC-TOWN-HALL-PHASE-ONE-COMPLETION")
      ?.boundaries.some((value) => /not an independent.*certification/i.test(value)) &&
    claimById.get("CLM-KC-TOWN-HALL-GENERAL-CONTRACTOR-ROLE")?.status ===
      "use-with-care" &&
    claimById
      .get("CLM-KC-TOWN-HALL-GENERAL-CONTRACTOR-ROLE")
      ?.antiClaims.some((value) => /licensed general contractor/i.test(value)) &&
    [
      "CLM-KC-TIRED-OF-TIRES-OPERATIONS",
      "CLM-KC-CLEVELAND-UNIFY-TO-BEAUTIFY"
    ].every(
      (id) =>
        claimById.get(id)?.status === "use-with-care" &&
        claimById
          .get(id)
          ?.projections.every((projection) => projection.status !== "active")
    ),
  true
);
check(
  "Claim maturity",
  "KC Town Hall stewardship transition is projected without collapsing it into municipal withdrawal",
  6,
  sourceById.get(kcTownHallTransitionSourceId)?.visibility === "protected" &&
    observationById.get("OBS-KC-TOWN-HALL-STEWARDSHIP-TRANSITION-ACCOUNT")
      ?.status === "provisional" &&
    claimById.get("CLM-KC-TOWN-HALL-STEWARDSHIP-TRANSITION")?.status ===
      "confirmed-with-boundary" &&
    claimById
      .get("CLM-KC-TOWN-HALL-STEWARDSHIP-TRANSITION")
      ?.projections.some(
        (projection) =>
          projection.status === "active" &&
          projection.surfaces.includes("/work/kc-town-hall")
      ) &&
    claimById
      .get("CLM-KC-TOWN-HALL-STEWARDSHIP-TRANSITION")
      ?.boundaries.some((value) => /does not establish how.*relates/i.test(value)) &&
    inquiryById.get("INQ-KC-TOWN-HALL-STEWARDSHIP-TRANSITION-2026")
      ?.resultStatus === "queued",
  true
);

check(
  "Research recursion",
  "Every needs-more-research intake links a live inquiry",
  6,
  knowledgeBank.intakeItems
    .filter((item) => item.researchStatus === "needs-more-research")
    .every(
      (item) =>
        item.researchInquiryIds.length &&
        item.researchInquiryIds.every((id) => inquiryById.has(id))
    ),
  true
);
check(
  "Research recursion",
  "The framework supports queued work without fabricated findings",
  5,
  knowledgeBank.researchInquiries
    .filter((inquiry) => inquiry.resultStatus === "queued")
    .every((inquiry) => !inquiry.runAt && inquiry.findings.length === 0)
);
check(
  "Research recursion",
  "Partially recovered inquiries preserve findings and limitations",
  4,
  knowledgeBank.researchInquiries
    .filter((inquiry) => inquiry.resultStatus === "partially-recovered")
    .every(
      (inquiry) =>
        inquiry.runAt && inquiry.findings.length > 0 && inquiry.limitations.length > 0
    )
);
check(
  "Research recursion",
  "NTER CHNG exhibition inquiry preserves the 205-page search result without converting non-recovery into absence",
  7,
  inquiryById.get("INQ-NTER-CHNG-AMERICA-NOW-HERE-INCLUSION-2026")
    ?.resultStatus === "partially-recovered" &&
    inquiryById
      .get("INQ-NTER-CHNG-AMERICA-NOW-HERE-INCLUSION-2026")
      ?.findings.some((value) => /205 replayable/i.test(value)) &&
    inquiryById
      .get("INQ-NTER-CHNG-AMERICA-NOW-HERE-INCLUSION-2026")
      ?.limitations.some((value) => /Wayback capture.*incomplete/i.test(value)) &&
    nterChngArchiveSourceIds.every((sourceId) =>
      inquiryById
        .get("INQ-NTER-CHNG-AMERICA-NOW-HERE-INCLUSION-2026")
        ?.sourceIds.includes(sourceId)
    ),
  true
);

const newSourceIds = new Set(
  knowledgeBank.sources
    .filter((source) => !source.id.startsWith("SRC-CALLNYC-"))
    .map((source) => source.id)
);

check(
  "Projection discipline",
  "New depth remains selective, and projected intake clears claim-maturity gates",
  5,
  knowledgeBank.intakeItems
    .filter((item) => item.sourceIds.some((id) => newSourceIds.has(id)))
    .some((item) => item.publicationStatus === "knowledge-bank-only") &&
    knowledgeBank.intakeItems
      .filter(
        (item) =>
          item.publicationStatus === "projected" &&
          item.sourceIds.some((id) => newSourceIds.has(id))
      )
      .every(
        (item) =>
          item.claimIds.length > 0 &&
          item.claimIds.every((claimId) =>
            ["confirmed", "confirmed-with-boundary"].includes(
              claimById.get(claimId)?.status ?? ""
            )
          ) &&
          item.claimIds.some((claimId) =>
            claimById
              .get(claimId)
              ?.projections.some(
                (projection) =>
                  projection.status === "active" &&
                  projection.surfaces.some((surface) => surface.startsWith("/"))
              )
          )
      )
);
check(
  "Projection discipline",
  "Unselected sources stay out of the retinal citation layer",
  6,
  publicRegistry.sources.every((source) =>
    knowledgeBank.pages.some(
      (page) =>
        page.sourceOrder.includes(source.id) ||
        page.occurrences.some((occurrence) => occurrence.sourceIds?.includes(source.id))
    )
  ),
  true
);
check(
  "Projection discipline",
  "The public citation registry remains a deliberate page plan",
  4,
  publicRegistry.pages.length === 2 &&
    publicRegistry.pages.some((page) => page.id === "callnyc") &&
    publicRegistry.pages.some((page) => page.id === "wowlist")
);

const frameworkDoc = read("docs/knowledge-bank/framework.md");
const intakeDoc = read("docs/knowledge-bank/intake/README.md");
const nycaPressReceipt = read(
  "docs/knowledge-bank/intake/2026-07-13-nyca-campaign-press-corpus.md"
);
const kcTownHallReceipt = read(
  "docs/knowledge-bank/intake/2026-07-14-kc-town-hall-council-funding.md"
);
const kcTownHallPhaseOneReceipt = read(
  "docs/knowledge-bank/intake/2026-07-15-kc-town-hall-phase-one-and-neighborhood-work.md"
);
const nterChngReceipt = read(
  "docs/knowledge-bank/intake/2026-07-15-nter-chng-archive-and-exhibition.md"
);
const callnycXReceipt = read(
  "docs/knowledge-bank/intake/2026-07-15-callnyc-x-full-population.md"
);
const callnycXCorpus = read(
  "docs/knowledge-bank/corpora/callnyc-x-public-corpus.json"
);
const wowlistXReceipt = read(
  "docs/knowledge-bank/intake/2026-07-15-wowlist-x-full-population.md"
);
const normalizedWowlistXReceipt = wowlistXReceipt.replace(/\s+/g, " ");
const wowlistXCorpus = read(
  "docs/knowledge-bank/corpora/wowlist-x-public-corpus.json"
);

check(
  "Capture integrity",
  "The public-safe press receipt accounts for every recovered source",
  5,
  /\| \*\*Total placements\*\* \| \*\*45\*\* \|/.test(nycaPressReceipt) &&
    /\| \*\*Unique articles\*\* \| \*\*44\*\* \|/.test(nycaPressReceipt) &&
    nycaPressArticles.every((article) => nycaPressReceipt.includes(article.sourceId)),
  true
);
check(
  "Capture integrity",
  "The KC Town Hall receipt preserves the complete municipal decision chain",
  5,
  [
    "SRC-KC-TOWN-HALL-CCED-MINUTES-2019",
    ...kcTownHallCouncilSourceIds
  ].every((sourceId) => kcTownHallReceipt.includes(sourceId)) &&
    ["recommendation", "appropriating", "no funds disbursed", "withdrawn"].every(
      (phrase) => kcTownHallReceipt.toLowerCase().includes(phrase.toLowerCase())
    ),
  true
);
check(
  "Capture integrity",
  "The KC Town Hall Phase One receipt preserves verified work, held memories, and research routes",
  7,
  kcTownHallPhaseOneSourceIds.every((sourceId) =>
    kcTownHallPhaseOneReceipt.includes(sourceId)
  ) &&
    [
      "Phase One cold-shell restoration",
      "Completed in 2019",
      "general contractor",
      "TiredOfTires",
      "Cleveland Avenue Unify to Beautify",
      "Pastor Lee",
      "INQ-KC-TOWN-HALL-CONSTRUCTION-ROLE-2026",
      "INQ-KC-NEIGHBORHOOD-PROGRAMS-2026"
    ].every((phrase) =>
      kcTownHallPhaseOneReceipt.toLowerCase().includes(phrase.toLowerCase())
    ),
  true
);
check(
  "Capture integrity",
  "The NTER CHNG receipt preserves recovered proof, the official-site search, and publication restraint",
  7,
  nterChngArchiveSourceIds.every((sourceId) => nterChngReceipt.includes(sourceId)) &&
    [
      "205 recoverable pages",
      "not mean the project was absent",
      "INQ-NTER-CHNG-AMERICA-NOW-HERE-INCLUSION-2026"
    ].every((phrase) =>
      nterChngReceipt.toLowerCase().includes(phrase.toLowerCase())
    ) && /held from\s+the\s+public website/i.test(nterChngReceipt),
  true
);

check(
  "Capture integrity",
  "The CallNYC corpus reconciles the population and keeps recovery limits explicit",
  8,
  [
    "100% population accounting",
    "97.3% status-level recovery",
    "not a complete 110-status export",
    "mutable counter events"
  ].every((phrase) => callnycXReceipt.includes(phrase)) &&
    [
      '"displayedByProfile": 110',
      '"recoveredStatusRecords": 107',
      '"unavailableResidual": 3',
      '"accountedPopulation": 110'
    ].every((phrase) => callnycXCorpus.includes(phrase)) &&
    claimById.get("CLM-CALLNYC-X-PUBLIC-DOCUMENTATION-SYSTEM")?.status ===
      "confirmed-with-boundary" &&
    inquiryById.get("INQ-CALLNYC-X-FULL-POPULATION-2026")?.resultStatus ===
      "partially-recovered",
  true
);

check(
  "Capture integrity",
  "The WOW List corpus closes the surviving population and preserves authorship, source, and traction limits",
  8,
  [
    "100% recovery of the surviving July 2026 profile population",
    "not a native X export, deletion history",
    "mutable counter events, not unique people",
    "not press coverage or endorsement of WOW List"
  ].every((phrase) => normalizedWowlistXReceipt.includes(phrase)) &&
    [
      '"profileCountObserved": 38',
      '"uniqueItemsRecovered": 38',
      '"unresolvedPopulationSlots": 0',
      '"directProductSupportReplies": 6',
      '"uniqueResolvedDestinations": 34'
    ].every((phrase) => wowlistXCorpus.includes(phrase)) &&
    claimById.get("CLM-WOWLIST-X-PUBLIC-SUPPORT-SURFACE")?.status ===
      "confirmed-with-boundary" &&
    inquiryById.get("INQ-WOWLIST-X-FULL-POPULATION-2026")?.resultStatus ===
      "recovered",
  true
);

check(
  "Photo feedback",
  "The framework treats photographs as evidence, artifacts, projection candidates, and research leads",
  5,
  ["evidence", "artifact", "projection candidate", "research lead"].every(
    (phrase) => frameworkDoc.toLowerCase().includes(phrase)
  ) &&
    ["photograph", "photo-caption", "rights", "consent"].every((phrase) =>
      `${frameworkDoc}\n${intakeDoc}`.toLowerCase().includes(phrase)
    )
);

const possiblePoints = checks.reduce((total, item) => total + item.points, 0);
const earnedPoints = checks.reduce(
  (total, item) => total + (item.passes ? item.points : 0),
  0
);
const score = Math.round((earnedPoints / possiblePoints) * 100);
const failures = checks.filter((item) => !item.passes);
const hardFailures = failures.filter((item) => item.hard);
const threshold = 95;

console.log(
  `Knowledge lifecycle eval: ${score}/100 (criterion: >= ${threshold}, no hard failures)`
);

for (const dimension of [...new Set(checks.map((item) => item.dimension))]) {
  const dimensionChecks = checks.filter((item) => item.dimension === dimension);
  const earned = dimensionChecks.reduce(
    (total, item) => total + (item.passes ? item.points : 0),
    0
  );
  const possible = dimensionChecks.reduce((total, item) => total + item.points, 0);
  console.log(`- ${dimension}: ${earned}/${possible}`);
}

if (validationErrors.length) {
  console.error("Canonical validation errors:");
  for (const error of validationErrors) console.error(`- ${error}`);
}

if (failures.length) {
  console.error("Knowledge lifecycle gaps:");
  for (const item of failures) {
    console.error(`- ${item.hard ? "HARD " : ""}${item.dimension}: ${item.label}`);
  }
}

if (score < threshold || hardFailures.length) process.exit(1);

console.log("Knowledge lifecycle criterion met.");
