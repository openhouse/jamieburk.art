#!/usr/bin/env node

import { readFileSync } from "node:fs";
import { knowledgeBank } from "../apps/www/src/data/knowledge-bank/records.ts";

const intakeItems = knowledgeBank.intakeItems ?? [];
const sourceReadings = knowledgeBank.sourceReadings ?? [];
const candidateClaims = knowledgeBank.candidateClaims ?? [];
const promotions = knowledgeBank.promotions ?? [];
const editorialBriefs = knowledgeBank.editorialBriefs ?? [];
const discoveryNotes = knowledgeBank.discoveryNotes ?? [];
const pressCollections = knowledgeBank.pressCollections ?? [];

const suppliedUrls = [
  "https://www.thepitchkc.com/when-artists-turn-huck-finn/",
  "https://charlottestreet.org/event/great-accommodations-with-jamie-burkart-imagining-lifestyles-for-cities-on-the-water/",
  "https://www.goodtimes.sc/archives/metro-santa-cruz/06.28.06/open-house-0626.html",
  "https://gothamist.com/news/diy-venues-demand-repeal-of-widely-reviled-cabaret-law",
  "https://www.npr.org/sections/therecord/2017/09/20/552292586/with-its-no-dancing-law-verging-on-repeal-new-york-legitimizes-its-nightlife?renderPlatform=nprone_ios&unified=true"
];

const batchSourceIds = [
  "SRC-OPEN-HOUSE-GOOD-TIMES-2006",
  "SRC-RAFT-PITCH-2007",
  "SRC-GREAT-ACCOMMODATIONS-CHARLOTTE-STREET-2009",
  "SRC-NYCAC-CABARET-GOTHAMIST-2017",
  "SRC-NYCAC-CABARET-NPR-2017",
  "SRC-NYC-COUNCIL-CABARET-REPEAL-2017",
  "SRC-NYC-MOME-OFFICE-NIGHTLIFE-2017",
  "SRC-NYCAC-NIGHT-MAYOR-TOWN-HALL-2017",
  "SRC-BEDFORD-BOWERY-NIGHT-MAYOR-2017",
  "SRC-TALKS-NOT-RAIDS-PUBLIC-SITE",
  "SRC-NYC-COUNCIL-INT-1156-2018",
  "SRC-BUSHWICK-DAILY-MARCH-DISBANDS-2023"
];

const strengtheningBatchUrls = [
  "https://legistar.council.nyc.gov/View.ashx?GUID=41F1062B-FC32-4A12-846E-65CEB3BB052C&ID=5316935&M=F",
  "https://legistar.council.nyc.gov/View.ashx?GUID=2582E680-452D-46B1-8DE1-C5C5168F5D63&ID=7080592&M=F",
  "https://www.vice.com/en/article/nyc-artist-coalition-dance-liberation-network-diy-spaces/",
  "https://www.villagevoice.com/awaiting-the-night-mayor/",
  "https://www.nyc.gov/mayors-office/news/2023/12/transcript-mayor-adams-launches-effort-enhance-nightlife-safety-strengthen-small",
  "https://createnyc.cityofnewyork.us/wp-content/uploads/2017/07/CreateNYC_Appendix-Sect5_NYC-Artist-Coalition-DIY-Community.pdf",
  "https://www.sbdiy.org/",
  "https://www.kcmo.gov/home/showpublisheddocument/3533/637145055055230000",
  "https://www.kcmo.gov/home/showpublisheddocument/7198/637696345156870000",
  "https://www.kcur.org/arts-life/2016-09-15/the-8th-street-tunnel-is-a-gateway-to-kansas-citys-history-but-you-probably-cant-get-in"
];

const strengtheningBatchSourceIds = [
  "SRC-NYC-COUNCIL-CABARET-HEARING-2017",
  "SRC-NYC-COUNCIL-MARCH-HEARING-2019",
  "SRC-VICE-NYCAC-DIY-SAFETY-2017",
  "SRC-VILLAGE-VOICE-NIGHT-MAYOR-2017",
  "SRC-NYC-MAYOR-CURE-MARCH-2023",
  "SRC-CREATENYC-NYCAC-APPENDIX-2017",
  "SRC-SBDIY-WOWLIST-CALENDAR",
  "SRC-KCMO-KC-TOWN-HALL-PROPOSAL-2019",
  "SRC-KCMO-KC-TOWN-HALL-MINUTES-2021",
  "SRC-KCUR-EIGHTH-STREET-TUNNEL-2016"
];

const strengtheningCandidateIds = [
  "CND-NYCAC-PUBLIC-TESTIMONY",
  "CND-NYCAC-SOLE-POLICY-CAUSALITY",
  "CND-WOWLIST-SBDIY-CALENDAR-USE",
  "CND-KC-TOWN-HALL-MUNICIPAL-RECORD",
  "CND-KC-TOWN-HALL-FUNDING-AWARD",
  "CND-EIGHTH-STREET-TUNNEL-PUBLIC-HISTORY"
];

const strengtheningPromotedClaimIds = [
  "CLM-NYCAC-PUBLIC-TESTIMONY-2017-2019",
  "CLM-WOWLIST-SBDIY-CALENDAR-USE",
  "CLM-KC-TOWN-HALL-MUNICIPAL-RECORD"
];

const kcTownHallCouncilSourceIds = [
  "SRC-KCMO-KC-TOWN-HALL-RESOLUTION-190649-2019",
  "SRC-KCMO-CCED-ORDINANCE-190642-2019",
  "SRC-KCMO-CCED-CLAWBACK-240317-2024"
];

const nterChngSourceIds = [
  "SRC-NTER-CHNG-ARCHIVED-PROJECT-SITE-2011",
  "SRC-AMERICA-NOW-HERE-NTER-CHNG-2011",
  "SRC-NERMAN-AMERICA-NOW-HERE-2011"
];

const nterChngArtifactSourceIds = [
  "SRC-NTER-CHNG-INSTALLER-RUNBOOK-2011",
  "SRC-NTER-CHNG-EXHIBIT-WORKING-DOCUMENT-2010-2011"
];

const kcTownHallPhaseOneSourceIds = [
  "SRC-KCTH-PHASE-ONE-CCED-PROPOSAL-2019",
  "SRC-KCTH-JAMIE-PHASE-ONE-ROLE-CONFIRMATION-2026"
];

const eastKcNeighborhoodPracticeSourceIds = [
  "SRC-JAMIE-EAST-KC-NEIGHBORHOOD-PRACTICE-CONFIRMATION-2026",
  "SRC-CLEVELAND-AVE-KC-TIRED-OF-TIRES-2020",
  "SRC-HENC-STRATEGIC-PLAN-2024",
  "SRC-KCTH-OAK-PARK-DUMPSTER-DAY-2019",
  "SRC-KCTH-CHESTNUT-TIRE-COLLECTION-2021"
];

const teamsArchivalDeepeningSourceIds = [
  "SRC-CLAUDETTE-MICHAEL-REES-2022",
  "SRC-CLAUDETTE-MAKE-US-VISIBLE-MUNICH-2022",
  "SRC-CLAUDETTE-IMPLEMENTATION-HANDOFF-2022",
  "SRC-CRS-90-DAY-OPERATING-PLAN-2026",
  "SRC-JOB-HUNT-RESUME-PARITY-2026"
];

const teamsArchivalDeepeningIntakeIds = [
  "INT-2026-07-15-TEAMS-JAMIE-PROJECTS-HISTORY-DEEPENING",
  "INT-2026-07-15-TEAMS-CRS-DEEPENING",
  "INT-2026-07-15-TEAMS-JOB-HUNT-PARITY"
];

const archivalScaleAndLineageSourceIds = [
  "SRC-WOWLIST-DATABASE-SNAPSHOT-SERIES-2016-2017",
  "SRC-WOWLIST-DATABASE-AUDIT-2026-07-15",
  "SRC-SUNDAY-DINNER-PARTICIPATION-WORKBOOK-2012-2021",
  "SRC-SUNDAY-DINNER-WORKBOOK-AUDIT-2026-07-15",
  "SRC-CALLSCRIPT-PUBLIC-PAGE-2026",
  "SRC-CALLSCRIPT-NYCAC-NAMING-DISCUSSION-2017",
  "SRC-JAMIE-CALLSCRIPT-FIRST-PERSON-CONTEXT-2026"
];

const archivalScaleAndLineageIntakeIds = [
  "INT-2026-07-15-WOWLIST-DATABASE-SNAPSHOTS",
  "INT-2026-07-15-SUNDAY-DINNER-WORKBOOK",
  "INT-2026-07-15-CALLSCRIPT-NYCAC-LINEAGE"
];

const archivalProductionSourceIds = [
  "SRC-RAFT-SOUNDINGS-2007",
  "SRC-MONTHLY-MUSIC-HACKATHON-SORTED-AUDIO-2013",
  "SRC-CRS-FULLER-PUBLIC-BASELINE-2026",
  "SRC-CRS-LEGISLATIVE-PROVENANCE-REDLINE-2026",
  "SRC-CRS-OPEN-DATA-FOUNDATION-2025"
];

const teamsArchiveIntakeIds = [
  "INT-2026-07-12-TEAMS-JAMIE-PROJECTS-HISTORY",
  "INT-2026-07-12-TEAMS-CRS",
  "INT-2026-07-12-TEAMS-JOB-HUNT"
];

const sharedDriveSourceIds = [
  "SRC-GDRIVE-SHARED-DRIVE-RESEARCH-2026",
  "SRC-GDRIVE-CRS-RUNNING-MEMORY-2026",
  "SRC-GDRIVE-CRS-OUTREACH-TRACKER-2026",
  "SRC-GDRIVE-CRS-ALIGNMENT-MINUTES-2026",
  "SRC-GDRIVE-CRS-DATA-OPPORTUNITY-2026",
  "SRC-GDRIVE-SUNDAY-DINNER-TRACKER-2025",
  "SRC-GDRIVE-196-ONBOARDING-LETTER-2023"
];

const sharedDriveIntakeIds = [
  "INT-2026-07-12-GDRIVE-SHARED-DRIVE-CORPUS",
  "INT-2026-07-12-GDRIVE-CRS-OPERATING-MEMORY",
  "INT-2026-07-12-GDRIVE-CRS-DATA-OPPORTUNITY",
  "INT-2026-07-12-GDRIVE-SUNDAY-DINNER-TRACKER",
  "INT-2026-07-12-GDRIVE-196-ONBOARDING"
];

const sharedDriveHeldCandidateIds = [
  "CND-CRS-CONSENT-AWARE-OUTREACH-OPERATIONS",
  "CND-SUNDAY-DINNER-RECURRING-HOSPITALITY-OPERATIONS",
  "CND-196-RESIDENCY-ONBOARDING-WORKFLOW",
  "CND-CRS-MULTILINGUAL-MEETING-MEMORY"
];

const socialArchiveSourceIds = [
  "SRC-SOCIAL-CALLNYC-PROFILE-CAPTURE-2026",
  "SRC-SOCIAL-CALLNYC-HELEN-ROSENTHAL-2016",
  "SRC-SOCIAL-CALLNYC-MATHIEU-EUGENE-2016",
  "SRC-SOCIAL-NYCAC-CREATENYC-TWITTER-DATA-2017",
  "SRC-SOCIAL-NYCAC-ESPINAL-NIGHTLIFE-2018",
  "SRC-SOCIAL-NYCAC-CORPUS-RUN-2026",
  "SRC-SOCIAL-NYCAC-LINK-CENSUS-2026",
  "SRC-SOCIAL-NYCAC-CONTINUITY-POST-2025",
  "SRC-SOCIAL-WOWLIST-MARCHES-POST-2016",
  "SRC-SOCIAL-WOWLIST-PARTICIPATION-POST-2016"
];

const socialArchiveIntakeIds = [
  "INT-2026-07-12-PROJECT-SOCIAL-ARCHIVE",
  "INT-2026-07-12-CALLNYC-PROFILE-CAPTURE",
  "INT-2026-07-12-NYCAC-SOCIAL-CORPUS",
  "INT-2026-07-12-SOCIAL-IDENTITY-CONFIRMATION"
];

const authenticatedSocialSourceIds = [
  "SRC-SOCIAL-X-AUTHENTICATED-RUN-2026",
  "SRC-SOCIAL-CALLNYC-PETER-KOO-2016",
  "SRC-SOCIAL-CALLNYC-STEVEN-MATTEO-2016",
  "SRC-SOCIAL-CALLNYC-RUBEN-WILLS-2016",
  "SRC-SOCIAL-CALLNYC-MARGARET-CHIN-2017",
  "SRC-SOCIAL-NYCAC-CARLINA-RIVERA-2018",
  "SRC-SOCIAL-NYCAC-STEPHEN-LEVIN-2019",
  "SRC-SOCIAL-NYCAC-JUSTIN-BRANNAN-2019",
  "SRC-SOCIAL-NYCAC-MARK-LEVINE-2020",
  "SRC-SOCIAL-NYCAC-JIMMY-VAN-BRAMER-2020",
  "SRC-SOCIAL-NYCAC-BRAD-LANDER-2021",
  "SRC-SOCIAL-OLYMPIA-NYCAC-CORPUS-2026",
  "SRC-SOCIAL-OLYMPIA-NYCAC-HEARING-2022",
  "SRC-SOCIAL-NYC-INSTITUTIONAL-CORPUS-2026",
  "SRC-SOCIAL-NYCULTURE-MARCH-CABARET-2017",
  "SRC-SOCIAL-DOCUMENT-JOURNAL-NIGHTLIFE-2018"
];

const callnycPopulationSourceIds = [
  "SRC-CALLNYC-LIVE-PROFILE-CONTROL-2026",
  "SRC-CALLNYC-FULL-POPULATION-RUN-2026"
];

const callnycCensusRows = readFileSync(
  "docs/knowledge-bank/callnyc-post-census-2026-07-12.csv",
  "utf8"
)
  .trim()
  .split("\n")
  .slice(1)
  .map((line) => line.split(","));

const callnycRecoveredCensusRows = callnycCensusRows.filter(
  (row) => row[10] === "recovered"
);
const callnycUnresolvedCensusRows = callnycCensusRows.filter(
  (row) => row[10] === "unrecovered"
);

const wowlistPopulationSourceIds = [
  "SRC-WOWLIST-LIVE-PROFILE-CONTROL-2026",
  "SRC-WOWLIST-FULL-POPULATION-RUN-2026",
  "SRC-WOWLIST-ORIGIN-SUNDAY-DINNER-2014",
  "SRC-WOWLIST-SUPPORT-FEED-SCOPE-2015",
  "SRC-WOWLIST-SUPPORT-PROFILE-2015",
  "SRC-WOWLIST-SUPPORT-EVENT-SUBMISSION-2015",
  "SRC-WOWLIST-SUPPORT-NYCDIY-IDENTITY-2016",
  "SRC-WOWLIST-SUPPORT-NYCDIY-JOIN-2016",
  "SRC-WOWLIST-SUPPORT-NYCDIY-LINEAGE-2016"
];

const wowlistCensusRows = readFileSync(
  "docs/knowledge-bank/wowlist-post-census-2026-07-12.csv",
  "utf8"
)
  .trim()
  .split("\n")
  .slice(1)
  .map((line) => line.split(","));

const kctownhallPopulationSourceIds = [
  "SRC-KCTH-LIVE-PROFILE-CONTROL-2026",
  "SRC-KCTH-FULL-POPULATION-RUN-2026",
  "SRC-KCTH-TIRES-ARCHIVED-PAGE-2021",
  "SRC-KCTH-SOCIAL-LAUNCH-2018",
  "SRC-KCTH-SOCIAL-NEIGHBORHOOD-PROCESS-2018",
  "SRC-KCTH-SOCIAL-TIRES-LAUNCH-2019",
  "SRC-KCTH-SOCIAL-TIRES-FIRST-MONTH-2019",
  "SRC-KCTH-SOCIAL-TIRES-2019-RECAP",
  "SRC-KCTH-SOCIAL-TIRES-FOLLOWTHROUGH-2020",
  "SRC-KCTH-SOCIAL-TIRES-2021-RECAP"
];

const kctownhallCensusText = readFileSync(
  "docs/knowledge-bank/kctownhall-post-census-2026-07-12.csv",
  "utf8"
);
const kctownhallCensusRows = kctownhallCensusText
  .trim()
  .split("\n")
  .slice(1)
  .map((line) => line.split(","));

const nycartcPopulationSourceIds = [
  "SRC-NYCAC-LIVE-PROFILE-CONTROL-2026",
  "SRC-NYCAC-FULL-POPULATION-RUN-2026",
  "SRC-NYCAC-SOCIAL-FAIR-RENT-2026",
  "SRC-NYCAC-SOCIAL-CREATE-IN-PLACE-2026",
  "SRC-NYCAC-SOCIAL-ARTIST-LABOR-2026",
  "SRC-NYCAC-SOCIAL-NIGHTLIFE-ACCOUNTABILITY-2025"
];

const nycartcCensusText = readFileSync(
  "docs/knowledge-bank/nycartc-post-census-2026-07-12.csv",
  "utf8"
);
const nycartcCensusRows = nycartcCensusText
  .trim()
  .split("\n")
  .slice(1)
  .map((line) => line.split(","));
const nycartcRecoveredCensusRows = nycartcCensusRows.filter(
  (row) => row[9] === "recovered"
);
const nycartcUnresolvedCensusRows = nycartcCensusRows.filter(
  (row) => row[9] === "unresolved"
);

const urbanhermitPopulationSourceIds = [
  "SRC-URBANHERMIT-LIVE-PROFILE-CONTROL-2026",
  "SRC-URBANHERMIT-FULL-POPULATION-RUN-2026",
  "SRC-URBANHERMIT-RIVER-SOFTWARE-OFFICE-HOURS-2009",
  "SRC-URBANHERMIT-HJE-WEB-PRACTICE-2010",
  "SRC-URBANHERMIT-SUNDAY-DINNER-VIDEO-2013",
  "SRC-URBANHERMIT-COUNCIL-PUBLIC-ENGAGEMENT-2015",
  "SRC-URBANHERMIT-HORSE-LORDS-NPR-2016",
  "SRC-URBANHERMIT-LET-NYC-DANCE-SAFETY-2017",
  "SRC-URBANHERMIT-MEDIA-ARCHAEOLOGY-2020",
  "SRC-HORSE-LORDS-TRUTHERS-NPR-2016"
];

const urbanhermitCensusText = readFileSync(
  "docs/knowledge-bank/urbanhermit-post-census-2026-07-13.csv",
  "utf8"
);
const urbanhermitCensusRows = urbanhermitCensusText
  .trim()
  .split("\n")
  .slice(1)
  .map((line) => line.split(","));

const urbanhermitExpectedYears = new Map([
  ["2008", 1],
  ["2009", 49],
  ["2010", 6],
  ["2011", 4],
  ["2012", 12],
  ["2013", 58],
  ["2014", 114],
  ["2015", 18],
  ["2016", 37],
  ["2017", 67],
  ["2018", 25],
  ["2019", 31],
  ["2020", 8],
  ["2021", 1],
  ["2022", 2],
  ["2023", 1]
]);

const urbanhermitExpectedThemes = new Map([
  ["everyday-life-and-observation", 204],
  ["civic-and-public-interest-work", 78],
  ["culture-art-and-performance", 52],
  ["community-and-hospitality", 37],
  ["waterways-place-and-ecology", 20],
  ["technical-and-digital-practice", 19],
  ["care-memory-and-relationships", 14],
  ["media-only-or-text-unavailable", 10]
]);

const urbanhermitExpectedAuthoredThemes = new Map([
  ["everyday-life-and-observation", 195],
  ["civic-and-public-interest-work", 34],
  ["culture-art-and-performance", 34],
  ["community-and-hospitality", 34],
  ["waterways-place-and-ecology", 20],
  ["technical-and-digital-practice", 14],
  ["care-memory-and-relationships", 12],
  ["media-only-or-text-unavailable", 10]
]);

const urbanhermitExpectedRepostThemes = new Map([
  ["everyday-life-and-observation", 9],
  ["civic-and-public-interest-work", 44],
  ["culture-art-and-performance", 18],
  ["community-and-hospitality", 3],
  ["waterways-place-and-ecology", 0],
  ["technical-and-digital-practice", 5],
  ["care-memory-and-relationships", 2],
  ["media-only-or-text-unavailable", 0]
]);

const nycartcFacebookEventSourceIds = [
  "SRC-NYCAC-FACEBOOK-EVENTS-CONTROL-2026",
  "SRC-NYCAC-FACEBOOK-EVENTS-POPULATION-RUN-2026",
  "SRC-NYCAC-JAMIE-EVENT-PRACTICE-CONFIRMATION-2026",
  "SRC-NYCAC-FACEBOOK-EVENT-GENERAL-MEETING-2017",
  "SRC-NYCAC-FACEBOOK-EVENT-MARCH-MEETING-2017",
  "SRC-NYCAC-FACEBOOK-EVENT-CABARET-PANEL-2017",
  "SRC-NYCAC-FACEBOOK-EVENT-CABARET-HEARING-2017",
  "SRC-NYCAC-FACEBOOK-EVENT-NIGHTLIFE-TOWN-HALL-2017",
  "SRC-NYCAC-FACEBOOK-EVENT-NOVEMBER-MEETING-2017",
  "SRC-NYCAC-FACEBOOK-EVENT-NIGHT-MAYOR-PANEL-2018",
  "SRC-NYCAC-FACEBOOK-EVENT-MARCH-HEARING-2019",
  "SRC-NYCAC-FACEBOOK-EVENT-SUMMER-MEETING-2019",
  "SRC-NYCAC-FACEBOOK-EVENT-COVID-RELIEF-2020"
];

const nycartcFacebookEventCensusText = readFileSync(
  "docs/knowledge-bank/nycartc-facebook-event-census-2026-07-13.csv",
  "utf8"
);
const nycartcFacebookEventCensusRows = nycartcFacebookEventCensusText
  .trim()
  .split("\n")
  .slice(1)
  .map((line) => line.split(","));
const nycartcFacebookRecoveredEventRows = nycartcFacebookEventCensusRows.filter(
  (row) => row[9] === "detail-recovered" || row[9] === "detail-partial-description"
);
const nycartcFacebookUnresolvedEventRows = nycartcFacebookEventCensusRows.filter(
  (row) => row[9] === "unresolved-control-slot"
);

const facebookEventSurfaceSourceIds = [
  "SRC-JAMIE-FACEBOOK-HOST-CONTROL-2026",
  "SRC-JAMIE-FACEBOOK-HOSTED-EVENT-RUN-2026",
  "SRC-JAMIE-FACEBOOK-EVENT-ASSOCIATION-RUN-2026",
  "SRC-JAMIE-FACEBOOK-EVENT-SEMANTIC-WEB-2006",
  "SRC-JAMIE-FACEBOOK-EVENT-PIRATE-TROLLEY-2007",
  "SRC-JAMIE-FACEBOOK-EVENT-RIVER-RAFT-2007",
  "SRC-JAMIE-FACEBOOK-EVENT-NIGHT-WALK-2010",
  "SRC-JAMIE-FACEBOOK-EVENT-SUNDAY-DINNER-100-2014",
  "SRC-JAMIE-FACEBOOK-EVENT-WHY-I-MARCH-2017",
  "SRC-JAMIE-FACEBOOK-EVENT-HYPERNORMALISATION-2017",
  "SRC-WOWLIST-FACEBOOK-EVENT-LIVE-CONTROL-2026",
  "SRC-WOWLIST-FACEBOOK-EVENT-RECOVERY-RUN-2026"
];

const jamieFacebookHostedEventCensusText = readFileSync(
  "docs/knowledge-bank/jamie-facebook-hosted-event-census-2026-07-13.csv",
  "utf8"
);
const jamieFacebookHostedEventCensusRows = jamieFacebookHostedEventCensusText
  .trim()
  .split("\n")
  .slice(1)
  .map((line) => line.split(","));
const jamieFacebookRecoveredHostedEventRows = jamieFacebookHostedEventCensusRows.filter(
  (row) => row[4] === "recovered"
);
const jamieFacebookUnresolvedHostedEventRows = jamieFacebookHostedEventCensusRows.filter(
  (row) => row[4] === "unresolved"
);

const jamieFacebookExpectedHostedEventYears = new Map([
  ["2006", 1],
  ["2007", 4],
  ["2010", 1],
  ["2011", 3],
  ["2012", 2],
  ["2013", 2],
  ["2014", 3],
  ["2016", 2],
  ["2017", 2]
]);

const jamieFacebookExpectedHostedEventThemes = new Map([
  ["civic-learning-and-making", 2],
  ["cultural-performance-and-production", 7],
  ["recurring-hospitality-and-care", 4],
  ["participatory-place-travel-and-water", 4],
  ["networked-culture-and-public-history", 3]
]);

const wowlistFacebookEventControlText = readFileSync(
  "docs/knowledge-bank/wowlist-facebook-event-control-2026-07-13.csv",
  "utf8"
);
const wowlistFacebookEventControlRows = wowlistFacebookEventControlText
  .trim()
  .split("\n")
  .slice(1)
  .map((line) => line.split(","));

const wowlistFacebookPostSourceIds = [
  "SRC-WOWLIST-FACEBOOK-LIVE-PROFILE-CONTROL-2026",
  "SRC-WOWLIST-FACEBOOK-FULL-POPULATION-RUN-2026",
  "SRC-WOWLIST-FACEBOOK-NINE-CITIES-2015",
  "SRC-WOWLIST-FACEBOOK-LA-FORTY-ONE-EVENTS-2015",
  "SRC-WOWLIST-FACEBOOK-COMMUNITY-VALUES-2016",
  "SRC-WOWLIST-FACEBOOK-WOMENS-MARCH-2017",
  "SRC-WOWLIST-FACEBOOK-PHXDIY-CONTINUITY-2018"
];

const wowlistFacebookPostCensusText = readFileSync(
  "docs/knowledge-bank/wowlist-facebook-post-census-2026-07-13.csv",
  "utf8"
);
const wowlistFacebookPostCensusRows = wowlistFacebookPostCensusText
  .trim()
  .split("\n")
  .slice(1)
  .map((line) => line.split(","));

const wowlistFacebookPostExpectedYears = new Map([
  ["2015", 22],
  ["2016", 27],
  ["2017", 7],
  ["2018", 1]
]);

const wowlistFacebookPostExpectedThemes = new Map([
  ["distributed-community-use", 12],
  ["product-community-infrastructure", 6],
  ["cultural-space-care", 19],
  ["civic-routing", 8],
  ["event-distribution", 11],
  ["public-knowledge-and-storytelling", 1]
]);

const jamieFacebookPostSourceIds = [
  "SRC-JAMIE-FACEBOOK-MANAGE-POSTS-CONTROL-2026",
  "SRC-JAMIE-FACEBOOK-FULL-POST-POPULATION-RUN-2026",
  "SRC-JAMIE-FACEBOOK-PROFESSIONAL-CLOSE-READ-2026"
];

const jamieFacebookPostCensusText = readFileSync(
  "docs/knowledge-bank/jamie-facebook-post-census-2026-07-13.csv",
  "utf8"
);
const jamieFacebookPostCensusRows = jamieFacebookPostCensusText
  .trim()
  .split("\n")
  .slice(1)
  .map((line) => line.split(","));

const jamieFacebookPostExpectedYears = new Map([
  ["2006", 2],
  ["2007", 5],
  ["2008", 4],
  ["2009", 218],
  ["2010", 82],
  ["2011", 88],
  ["2012", 153],
  ["2013", 184],
  ["2014", 109],
  ["2015", 68],
  ["2016", 122],
  ["2017", 118],
  ["2018", 27],
  ["2019", 42],
  ["2020", 19],
  ["2022", 2]
]);

const jamieFacebookPostExpectedForms = new Map([
  ["event", 58],
  ["external-link", 55],
  ["media-or-text-unavailable", 159],
  ["photo", 221],
  ["photo-album", 135],
  ["shared-story", 244],
  ["text", 335],
  ["video", 36]
]);

const jamieFacebookPostExpectedThemes = new Map([
  ["care-memory-and-relationships", 45],
  ["civic-and-public-interest-work", 78],
  ["community-and-hospitality", 97],
  ["culture-art-and-performance", 134],
  ["everyday-life-and-observation", 620],
  ["media-only-or-text-unavailable", 235],
  ["small-business-and-commerce", 1],
  ["technical-and-digital-practice", 12],
  ["waterways-place-and-ecology", 21]
]);

const jamieFacebookPostExpectedRelevance = new Map([
  ["contextual", 1021],
  ["practice-related", 64],
  ["project-specific", 158]
]);

const requiredCandidateIds = [
  "CND-PARTICIPATORY-PUBLIC-SYSTEMS-THROUGHLINE",
  "CND-RIVER-RAFT-KC-GULF",
  "CND-NYCAC-CIVIC-ADVOCACY-BOUNDED",
  "CND-NYCAC-OFFICE-NIGHTLIFE-INSTRUMENTAL-ROLE",
  "CND-TALKS-NOT-RAIDS-DISBAND-CAUSALITY",
  "CND-CALLNYC-COUNCIL-ENGAGEMENT-STATS"
];

const sourceIds = new Set(knowledgeBank.sources.map((source) => source.id));
const claimIds = new Set(knowledgeBank.claims.map((claim) => claim.id));
const candidateById = new Map(candidateClaims.map((claim) => [claim.id, claim]));
const readingBySourceId = new Map(sourceReadings.map((reading) => [reading.sourceId, reading]));
const promotedCandidates = candidateClaims.filter((candidate) => candidate.status === "promoted");
const publicSitePromotedCandidates = promotedCandidates.filter((candidate) =>
  knowledgeBank.claims
    .find((claim) => claim.id === candidate.promotedClaimId)
    ?.projections.some(
      (projection) =>
        projection.status === "active" && projection.surfaces.some((surface) => surface.startsWith("/"))
    )
);
const renderedProjectionSources = [
  readFileSync("apps/www/src/app/about/page.tsx", "utf8"),
  readFileSync("apps/www/src/content/work/fair-rent-nyc.mdx", "utf8"),
  readFileSync("apps/www/src/content/work/wowlist.mdx", "utf8"),
  readFileSync("apps/www/src/content/work/196-sunday-dinner.mdx", "utf8"),
  readFileSync("apps/www/src/content/work/kc-town-hall.mdx", "utf8")
].join("\n");
const publicRegistryText = readFileSync(
  "apps/www/src/data/knowledge-bank/public-registry.json",
  "utf8"
);

const criteria = [
  {
    id: "lifecycle-collections",
    label: "All upstream lifecycle collections exist",
    pass: [intakeItems, sourceReadings, candidateClaims, promotions, editorialBriefs, discoveryNotes].every(
      (items) => items.length > 0
    )
  },
  {
    id: "supplied-url-intake",
    label: "Every supplied URL has an intake record",
    pass: suppliedUrls.every((url) => intakeItems.some((item) => item.sourceUrl === url))
  },
  {
    id: "source-batch",
    label: "The research batch is represented by canonical source records",
    pass: batchSourceIds.every((id) => sourceIds.has(id))
  },
  {
    id: "close-readings",
    label: "Every batch source has an atomic reading with limits",
    pass: batchSourceIds.every((id) => {
      const reading = readingBySourceId.get(id);
      return reading && reading.assertions.length >= 2 && reading.limitations.length >= 1;
    })
  },
  {
    id: "intake-dispositions",
    label: "Every intake item has a research or processing disposition and links forward",
    pass:
      intakeItems.length >= suppliedUrls.length &&
      intakeItems.every(
        (item) =>
          ["researching", "processed", "deferred"].includes(item.status) &&
          item.linkedRecordIds.length > 0
      )
  },
  {
    id: "candidate-depth",
    label: "Promotable and unresolved candidate claims are both retained",
    pass:
      requiredCandidateIds.every((id) => candidateById.has(id)) &&
      candidateClaims.some((claim) => claim.status === "promoted") &&
      candidateClaims.some((claim) => claim.status === "partially-supported") &&
      candidateClaims.some((claim) => claim.status === "research-needed")
  },
  {
    id: "promotion-lineage",
    label: "Every promoted candidate has a promotion decision and canonical claim",
    pass:
      promotedCandidates.length > 0 &&
      promotedCandidates.every(
        (candidate) =>
          candidate.promotedClaimId &&
          claimIds.has(candidate.promotedClaimId) &&
          promotions.some(
            (promotion) =>
              promotion.candidateClaimId === candidate.id &&
              promotion.claimId === candidate.promotedClaimId &&
              promotion.decision === "promoted"
          )
      )
  },
  {
    id: "strong-claim-holds",
    label: "High-causality claims remain unprojected while evidence is incomplete",
    pass: [
      "CND-RIVER-RAFT-KC-GULF",
      "CND-NYCAC-OFFICE-NIGHTLIFE-INSTRUMENTAL-ROLE",
      "CND-TALKS-NOT-RAIDS-DISBAND-CAUSALITY",
      "CND-CALLNYC-COUNCIL-ENGAGEMENT-STATS"
    ].every((id) => {
      const candidate = candidateById.get(id);
      return candidate && candidate.status !== "promoted" && !candidate.promotedClaimId;
    })
  },
  {
    id: "editorial-selection",
    label: "A hiring brief selects canonical claims and explicitly holds deeper material",
    pass: editorialBriefs.some(
      (brief) =>
        /hiring|job application/i.test(`${brief.audience} ${brief.goal}`) &&
        brief.selectedClaimIds.length > 0 &&
        brief.selectedClaimIds.every((id) => claimIds.has(id)) &&
        brief.heldCandidateClaimIds.length > 0 &&
        brief.heldCandidateClaimIds.every((id) => candidateById.has(id))
    )
  },
  {
    id: "photo-feedback-loop",
    label: "Photo and archive discovery can feed new research back into intake",
    pass:
      discoveryNotes.some((note) => note.kind === "photo-editor") &&
      discoveryNotes.some((note) => note.kind === "archive-research") &&
      discoveryNotes.every((note) => note.candidateClaimIds.length > 0)
  },
  {
    id: "public-citation-plan",
    label: "Every newly promoted public claim renders, and citation-required claims have a page occurrence",
    pass:
      publicSitePromotedCandidates.length > 0 &&
      publicSitePromotedCandidates.every((candidate) => {
        const claim = knowledgeBank.claims.find(
          (item) => item.id === candidate.promotedClaimId
        );
        const activePublicProjection = claim?.projections.find(
          (projection) =>
            projection.status === "active" &&
            projection.surfaces.some((surface) => surface.startsWith("/"))
        );
        const occurrence = knowledgeBank.pages
          .flatMap((page) => page.occurrences)
          .find((item) => item.claimId === candidate.promotedClaimId);
        if (!renderedProjectionSources.includes(candidate.promotedClaimId)) return false;
        if (!activePublicProjection?.citationRequired) return true;
        return Boolean(occurrence && renderedProjectionSources.includes(occurrence.id));
      })
  },
  {
    id: "public-selection-restraint",
    label: "The public site selects fewer claims than the bank retains",
    pass:
      promotedCandidates.length > 0 && promotedCandidates.length < candidateClaims.length
  },
  {
    id: "strengthening-source-batch",
    label: "Ten new public sources are canonical, bounded, and non-duplicative",
    pass:
      strengtheningBatchSourceIds.length === 10 &&
      new Set(strengtheningBatchSourceIds).size === 10 &&
      new Set(
        strengtheningBatchSourceIds.map(
          (id) => knowledgeBank.sources.find((item) => item.id === id)?.canonicalUrl
        )
      ).size === 10 &&
      strengtheningBatchSourceIds.every((id) => {
        const source = knowledgeBank.sources.find((item) => item.id === id);
        return (
          source &&
          source.visibility === "public" &&
          source.canonicalUrl &&
          strengtheningBatchUrls.includes(source.canonicalUrl) &&
          source.supportsGenerally.length >= 2 &&
          source.doesNotEstablish.length >= 2
        );
      })
  },
  {
    id: "strengthening-intake-and-readings",
    label: "Every new source has intake lineage and a close reading",
    pass:
      strengtheningBatchUrls.every((url) =>
        intakeItems.some((item) => item.sourceUrl === url && item.status === "processed")
      ) &&
      strengtheningBatchSourceIds.every((id) => {
        const reading = readingBySourceId.get(id);
        return reading && reading.assertions.length >= 2 && reading.limitations.length >= 1;
      })
  },
  {
    id: "strengthening-claim-maturation",
    label: "The new batch matures useful claims while holding causal and funding overclaims",
    pass:
      strengtheningCandidateIds.every((id) => candidateById.has(id)) &&
      strengtheningPromotedClaimIds.every((id) => claimIds.has(id)) &&
      ["CND-NYCAC-SOLE-POLICY-CAUSALITY", "CND-KC-TOWN-HALL-FUNDING-AWARD"].every(
        (id) => {
          const candidate = candidateById.get(id);
          return candidate && candidate.status !== "promoted" && !candidate.promotedClaimId;
        }
      )
  },
  {
    id: "strengthening-public-projection",
    label: "Only the strongest new hiring claims are projected with rendered citations",
    pass: strengtheningPromotedClaimIds.every((claimId) => {
      const occurrence = knowledgeBank.pages
        .flatMap((page) => page.occurrences)
        .find((item) => item.claimId === claimId);
      return occurrence && renderedProjectionSources.includes(claimId) && renderedProjectionSources.includes(occurrence.id);
    })
  },
  {
    id: "campaign-press-census",
    label: "All four campaign press collections preserve the complete deduplicated census",
    pass:
      pressCollections.length === 4 &&
      JSON.stringify(pressCollections.map((collection) => collection.entries.length)) ===
        JSON.stringify([21, 7, 8, 1]) &&
      pressCollections.flatMap((collection) => collection.entries).length === 37 &&
      new Set(
        pressCollections.flatMap((collection) =>
          collection.entries.map((entry) => entry.sourceId)
        )
      ).size === 36
  },
  {
    id: "campaign-press-lineage",
    label: "Every campaign and article source has a bounded reading and explicit retrieval state",
    pass:
      pressCollections.length === 4 &&
      pressCollections.every(
        (collection) =>
          sourceIds.has(collection.campaignSourceId) &&
          readingBySourceId.has(collection.campaignSourceId) &&
          collection.entries.every(
            (entry) =>
              sourceIds.has(entry.sourceId) &&
              readingBySourceId.has(entry.sourceId) &&
              ["read", "metadata-only", "not-recovered"].includes(entry.retrievalStatus)
          )
      )
  },
  {
    id: "campaign-press-claim-discipline",
    label: "The campaign-site claim is projected while reach and solo-causality claims remain held",
    pass:
      claimIds.has("CLM-NYCAC-CAMPAIGN-PRESS-INFRASTRUCTURE") &&
      renderedProjectionSources.includes("CLM-NYCAC-CAMPAIGN-PRESS-INFRASTRUCTURE") &&
      ["CND-NYCAC-PRESS-REACH", "CND-NYCAC-CAMPAIGN-SOLO-CAUSALITY"].every(
        (id) => {
          const candidate = candidateById.get(id);
          return candidate && candidate.status === "hold" && !candidate.promotedClaimId;
        }
      )
  },
  {
    id: "kc-town-hall-council-record",
    label: "Council adoption, appropriation, and later clawback have canonical source readings",
    pass: kcTownHallCouncilSourceIds.every((id) => {
      const reading = readingBySourceId.get(id);
      return sourceIds.has(id) && reading && reading.assertions.length >= 2 && reading.limitations.length >= 1;
    })
  },
  {
    id: "kc-town-hall-council-promotion",
    label: "The Council authorization candidate is promoted while receipt and disbursement remain held",
    pass:
      candidateById.get("CND-KC-TOWN-HALL-COUNCIL-AUTHORIZATION")?.status === "promoted" &&
      candidateById.get("CND-KC-TOWN-HALL-COUNCIL-AUTHORIZATION")?.promotedClaimId ===
        "CLM-KC-TOWN-HALL-MUNICIPAL-RECORD" &&
      promotions.some(
        (promotion) =>
          promotion.candidateClaimId === "CND-KC-TOWN-HALL-COUNCIL-AUTHORIZATION" &&
          promotion.claimId === "CLM-KC-TOWN-HALL-MUNICIPAL-RECORD" &&
          promotion.decision === "promoted"
      ) &&
      candidateById.get("CND-KC-TOWN-HALL-FUNDING-AWARD")?.status === "hold" &&
      !candidateById.get("CND-KC-TOWN-HALL-FUNDING-AWARD")?.promotedClaimId
  },
  {
    id: "kc-town-hall-council-projection",
    label: "The case study renders Council allocation with the non-disbursement lifecycle boundary",
    pass: (() => {
      const claim = knowledgeBank.claims.find(
        (item) => item.id === "CLM-KC-TOWN-HALL-MUNICIPAL-RECORD"
      );
      const projection = claim?.projections.find((item) => item.key === "case-study");
      return Boolean(
        projection &&
        /Council.*adopted/i.test(projection.text) &&
        /appropriat/i.test(projection.text) &&
        /490,539/.test(projection.text) &&
        /withdr/i.test(projection.text) &&
        claim?.boundaries.some((boundary) => /disburs/i.test(boundary)) &&
        renderedProjectionSources.includes("CLM-KC-TOWN-HALL-MUNICIPAL-RECORD")
      );
    })()
  },
  {
    id: "kc-town-hall-transition-lineage",
    label: "The mission-aligned transition has firsthand source, reading, candidate, and promotion lineage",
    pass: (() => {
      const sourceId = "SRC-KC-TOWN-HALL-JAMIE-TRANSITION-CONFIRMATION-2026";
      const candidate = candidateById.get("CND-KC-TOWN-HALL-MISSION-ALIGNED-TRANSITION");
      return Boolean(
        sourceIds.has(sourceId) &&
        readingBySourceId.get(sourceId)?.assertions.length >= 2 &&
        candidate?.status === "promoted" &&
        candidate.promotedClaimId === "CLM-KC-TOWN-HALL-MUNICIPAL-RECORD" &&
        promotions.some(
          (promotion) =>
            promotion.candidateClaimId === candidate.id &&
            promotion.claimId === candidate.promotedClaimId &&
            promotion.decision === "promoted"
        )
      );
    })()
  },
  {
    id: "kc-town-hall-transition-privacy",
    label: "The public projection names the transition without encoding its private cause",
    pass: (() => {
      const claim = knowledgeBank.claims.find(
        (item) => item.id === "CLM-KC-TOWN-HALL-MUNICIPAL-RECORD"
      );
      const projection = claim?.projections.find((item) => item.key === "case-study");
      const source = knowledgeBank.sources.find(
        (item) => item.id === "SRC-KC-TOWN-HALL-JAMIE-TRANSITION-CONFIRMATION-2026"
      );
      return Boolean(
        projection?.text.includes("transitioned the project to a mission-aligned organization") &&
        claim?.boundaries.some((boundary) => /reason.*transition.*not.*publish/i.test(boundary)) &&
        source?.doesNotEstablish.some((boundary) => /reason for the transition/i.test(boundary)) &&
        !/(because|due to).*transition/i.test(projection.text)
      );
    })()
  },
  {
    id: "teams-archive-intake",
    label: "Jamie Projects History, CRS, and job-hunt each have bounded archive dispositions",
    pass: teamsArchiveIntakeIds.every((id) => {
      const item = intakeItems.find((candidate) => candidate.id === id);
      return Boolean(
        item &&
        item.visibility === "protected" &&
        item.status === "processed" &&
        item.protectedLocatorId &&
        item.linkedRecordIds.includes("INQ-TEAMS-ARCHIVAL-PRODUCTION-2026")
      );
    })
  },
  {
    id: "archival-production-readings",
    label: "Every archival-production source has an atomic close reading with limits",
    pass: archivalProductionSourceIds.every((id) => {
      const source = knowledgeBank.sources.find((item) => item.id === id);
      const reading = readingBySourceId.get(id);
      return Boolean(
        source &&
        source.supportsGenerally.length >= 2 &&
        source.doesNotEstablish.length >= 2 &&
        reading &&
        reading.assertions.length >= 2 &&
        reading.limitations.length >= 1
      );
    })
  },
  {
    id: "crs-data-pilot-promotion",
    label: "The privacy-preserving data pilot has complete promotion and citation lineage",
    pass: (() => {
      const candidate = candidateById.get("CND-CRS-PRIVACY-PRESERVING-DATA-PILOT");
      const claim = knowledgeBank.claims.find(
        (item) => item.id === "CLM-CRS-PRIVACY-PRESERVING-DATA-PILOT"
      );
      const occurrence = knowledgeBank.pages
        .find((page) => page.id === "fair-rent-nyc")
        ?.occurrences.find((item) => item.id === "crs-privacy-preserving-data-pilot");
      return Boolean(
        candidate?.status === "promoted" &&
        candidate.promotedClaimId === claim?.id &&
        promotions.some(
          (promotion) =>
            promotion.candidateClaimId === candidate.id &&
            promotion.claimId === claim?.id &&
            promotion.decision === "promoted"
        ) &&
        claim?.boundaries.some((boundary) => /not an adopted|proposal/i.test(boundary)) &&
        occurrence?.sourceIds?.includes("SRC-CRS-FULLER-PUBLIC-BASELINE-2026") &&
        renderedProjectionSources.includes(claim.id) &&
        renderedProjectionSources.includes(occurrence.id)
      );
    })()
  },
  {
    id: "archival-production-depth-holds",
    label: "Mature provenance and technical-history fragments remain available but unprojected",
    pass: [
      "CND-CRS-LEGISLATIVE-PROVENANCE-ARTIFACT",
      "CND-SORTED-AUDIO-MAXMSP-2013"
    ].every((id) => {
      const candidate = candidateById.get(id);
      return (
        candidate?.status === "ready-for-promotion" &&
        !candidate.promotedClaimId &&
        promotions.some(
          (promotion) =>
            promotion.candidateClaimId === id && promotion.decision === "held"
        )
      );
    })
  },
  {
    id: "raft-scale-with-landing-boundary",
    label: "The public throughline uses verified scale while the exact Gulf landing remains held",
    pass: (() => {
      const claim = knowledgeBank.claims.find(
        (item) => item.id === "CLM-PARTICIPATORY-PUBLIC-SYSTEMS-THROUGHLINE"
      );
      const projection = claim?.projections.find((item) => item.key === "about");
      const gulfCandidate = candidateById.get("CND-RIVER-RAFT-KC-GULF");
      return Boolean(
        projection?.text.includes("more than 1,000 miles") &&
        claim?.evidence.some(
          (evidence) =>
            evidence.sourceId === "SRC-RAFT-SOUNDINGS-2007" && evidence.renderCitation
        ) &&
        gulfCandidate?.status === "research-needed" &&
        !gulfCandidate.promotedClaimId &&
        !projection?.text.includes("Gulf of Mexico")
      );
    })()
  },
  {
    id: "archival-production-public-safety",
    label: "Protected locators and private archive coordinates stay out of the public registry",
    pass:
      !/ARCHIVE-TEAMS|ARCHIVE-CRS|RESEARCH-TEAMS/.test(publicRegistryText) &&
      !/Mobile Documents|CloudDocs|job-hunt\//i.test(publicRegistryText) &&
      knowledgeBank.sources
        .filter((source) =>
          [
            "SRC-CRS-LEGISLATIVE-PROVENANCE-REDLINE-2026",
            "SRC-CRS-OPEN-DATA-FOUNDATION-2025"
          ].includes(source.id)
        )
        .every(
          (source) =>
            source.visibility !== "public" &&
            !source.canonicalUrl &&
            !source.archiveUrl &&
            !source.assetUrl
        )
  },
  {
    id: "shared-drive-corpus-selection",
    label: "Shared Drive research records collection scope, selection, and access limits",
    pass: (() => {
      const source = knowledgeBank.sources.find(
        (item) => item.id === "SRC-GDRIVE-SHARED-DRIVE-RESEARCH-2026"
      );
      const inquiry = knowledgeBank.researchInquiries.find(
        (item) => item.id === "INQ-GDRIVE-SHARED-DRIVE-ARCHIVAL-PRODUCTION-2026"
      );
      return Boolean(
        source?.supportsGenerally.some((item) => /110 Shared Drives/.test(item)) &&
        source?.doesNotEstablish.some((item) => /created every accessible drive/.test(item)) &&
        inquiry?.methods.some((item) => /representative cohort/i.test(item)) &&
        inquiry?.limitations.some((item) => /not establish.*authored every file/i.test(item)) &&
        sharedDriveIntakeIds.every((id) => {
          const intake = intakeItems.find((item) => item.id === id);
          return intake?.visibility === "protected" && intake.status === "processed";
        })
      );
    })()
  },
  {
    id: "shared-drive-close-readings",
    label: "Every selected Shared Drive source has atomic assertions and explicit limits",
    pass: sharedDriveSourceIds.every((id) => {
      const source = knowledgeBank.sources.find((item) => item.id === id);
      const reading = readingBySourceId.get(id);
      return Boolean(
        source &&
        source.supportsGenerally.length >= 2 &&
        source.doesNotEstablish.length >= 2 &&
        reading &&
        reading.assertions.length >= 2 &&
        reading.limitations.length >= 1
      );
    })
  },
  {
    id: "shared-drive-authorship-discipline",
    label: "Revision evidence distinguishes Jamie's stewardship from shared access",
    pass: [
      "SRC-GDRIVE-CRS-RUNNING-MEMORY-2026",
      "SRC-GDRIVE-CRS-OUTREACH-TRACKER-2026",
      "SRC-GDRIVE-CRS-DATA-OPPORTUNITY-2026",
      "SRC-GDRIVE-SUNDAY-DINNER-TRACKER-2025",
      "SRC-GDRIVE-196-ONBOARDING-LETTER-2023"
    ].every((id) => {
      const source = knowledgeBank.sources.find((item) => item.id === id);
      const reading = readingBySourceId.get(id);
      return Boolean(
        source?.supportsGenerally.some((item) => /recorded revisions|revision-level/i.test(item)) &&
        reading?.assertions.some((assertion) => /revision/i.test(assertion.locator ?? ""))
      );
    })
  },
  {
    id: "shared-drive-claim-promotion",
    label: "The campaign-memory claim has complete private-evidence promotion lineage",
    pass: (() => {
      const candidate = candidateById.get("CND-CRS-SHARED-MEMORY-OPERATING-SYSTEM");
      const claim = knowledgeBank.claims.find(
        (item) => item.id === "CLM-CRS-SHARED-MEMORY-OPERATIONS"
      );
      const occurrence = knowledgeBank.pages
        .find((page) => page.id === "fair-rent-nyc")
        ?.occurrences.find((item) => item.id === "crs-shared-memory-operations");
      return Boolean(
        candidate?.status === "promoted" &&
        candidate.promotedClaimId === claim?.id &&
        claim?.evidence.length === 3 &&
        claim.evidence.every(
          (evidence) => evidence.relationship === "private-support" && !evidence.renderCitation
        ) &&
        promotions.some(
          (promotion) =>
            promotion.candidateClaimId === candidate.id &&
            promotion.claimId === claim.id &&
            promotion.decision === "promoted"
        ) &&
        occurrence?.claimId === claim.id &&
        renderedProjectionSources.includes(claim.id) &&
        renderedProjectionSources.includes(occurrence.id)
      );
    })()
  },
  {
    id: "shared-drive-public-safety-and-restraint",
    label: "Private Drive coordinates stay redacted and deeper workflow claims remain held",
    pass:
      sharedDriveSourceIds.every((id) => {
        const source = knowledgeBank.sources.find((item) => item.id === id);
        return Boolean(
          source &&
          source.visibility !== "public" &&
          source.protectedLocatorId &&
          !source.canonicalUrl &&
          !source.archiveUrl &&
          !source.assetUrl
        );
      }) &&
      sharedDriveHeldCandidateIds.every((id) => {
        const candidate = candidateById.get(id);
        return Boolean(candidate && candidate.status !== "promoted" && !candidate.promotedClaimId);
      }) &&
      !/SRC-GDRIVE|ARCHIVE-GDRIVE|RESEARCH-GDRIVE/.test(publicRegistryText)
  },
  {
    id: "social-archive-lineage",
    label: "Project social-account evidence has complete intake, source, and reading lineage",
    pass:
      socialArchiveIntakeIds.every((id) => intakeItems.some((item) => item.id === id)) &&
      socialArchiveSourceIds.every((id) => {
        const reading = readingBySourceId.get(id);
        return sourceIds.has(id) && reading && reading.assertions.length >= 1 && reading.limitations.length >= 1;
      })
  },
  {
    id: "social-archive-bounded-corpus",
    label: "Social corpus findings record coverage, resolved links, and platform limits",
    pass: (() => {
      const inquiry = knowledgeBank.researchInquiries.find(
        (item) => item.id === "INQ-PROJECT-SOCIAL-ARCHIVE-2026"
      );
      return Boolean(
        inquiry?.findings.some((item) => /286 distinct.*279/i.test(item)) &&
        inquiry.findings.some((item) => /193 unique/i.test(item)) &&
        inquiry.limitations.some((item) => /Wayback coverage is selective/i.test(item)) &&
        inquiry.limitations.some((item) => /post-level authorship cannot be inferred/i.test(item))
      );
    })()
  },
  {
    id: "social-account-inventory-coverage",
    label: "Every recovered canonical project account has bounded source and reading coverage",
    pass: (() => {
      const registry = readFileSync("docs/knowledge-bank/social-account-registry.md", "utf8");
      const inquiry = knowledgeBank.researchInquiries.find(
        (item) => item.id === "INQ-PROJECT-SOCIAL-ARCHIVE-2026"
      );
      return Boolean(
        /@CallNYCapp/.test(registry) &&
        /@NYCArtC/.test(registry) &&
        /@wowlist/.test(registry) &&
        inquiry?.findings.some((item) => /Two recovered @wowlist posts/i.test(item))
      );
    })()
  },
  {
    id: "social-council-minimum-not-total",
    label: "Direct Council engagement is promoted only as a recovered minimum",
    pass: (() => {
      const minimum = candidateById.get("CND-PROJECT-SOCIAL-COUNCIL-ENGAGEMENT-MINIMUM");
      const exact = candidateById.get("CND-PROJECT-SOCIAL-COUNCIL-ENGAGEMENT-EXACT");
      const legacyBroadClaim = candidateById.get("CND-CALLNYC-COUNCIL-ENGAGEMENT-STATS");
      const claim = knowledgeBank.claims.find(
        (item) => item.id === "CLM-PROJECT-SOCIAL-COUNCIL-ENGAGEMENT-MINIMUM"
      );
      return Boolean(
        minimum?.status === "promoted" &&
        minimum.promotedClaimId === "CLM-PROJECT-SOCIAL-COUNCIL-ENGAGEMENT-MINIMUM" &&
        /29 direct posts.*13 distinct then-sitting/i.test(minimum.text) &&
        /29 public posts.*13 distinct then-sitting/i.test(claim?.internalClaim || "") &&
        claim?.boundaries.some((item) => /minimums, not comprehensive totals/i.test(item)) &&
        exact?.status !== "promoted" &&
        !exact?.promotedClaimId &&
        legacyBroadClaim?.status === "partially-supported" &&
        !legacyBroadClaim.promotedClaimId
      );
    })()
  },
  {
    id: "authenticated-social-lineage",
    label: "Authenticated social findings have atomic sources, readings, and platform limits",
    pass:
      intakeItems.some((item) => item.id === "INT-2026-07-12-AUTHENTICATED-X-ARCHIVE") &&
      authenticatedSocialSourceIds.every((id) => {
        const reading = readingBySourceId.get(id);
        return sourceIds.has(id) && reading && reading.assertions.length >= 1 && reading.limitations.length >= 1;
      })
  },
  {
    id: "social-collaborator-credit",
    label: "Olympia Kazi continuity is promoted under her authorship without shared-account overreach",
    pass: (() => {
      const candidate = candidateById.get("CND-NYCAC-OLYMPIA-PUBLIC-STEWARDSHIP");
      const claim = knowledgeBank.claims.find(
        (item) => item.id === "CLM-NYCAC-OLYMPIA-PUBLIC-STEWARDSHIP"
      );
      return Boolean(
        candidate?.status === "promoted" &&
        /89 recovered posts/i.test(candidate.text) &&
        claim?.boundaries.some((item) => /Credit the posts to Olympia Kazi/i.test(item)) &&
        claim.boundaries.some((item) => /Do not infer.*shared @NYCArtC account/i.test(item))
      );
    })()
  },
  {
    id: "social-city-dialogue-boundary",
    label: "City-agency dialogue is source-backed without becoming an adoption claim",
    pass: (() => {
      const candidate = candidateById.get("CND-NYCAC-CITY-DIALOGUE");
      const claim = knowledgeBank.claims.find((item) => item.id === "CLM-NYCAC-CITY-DIALOGUE");
      return Boolean(
        candidate?.status === "promoted" &&
        /Seventeen authenticated-search posts/i.test(candidate.supportSummary) &&
        claim?.boundaries.some((item) => /do not equal adoption/i.test(item)) &&
        claim.antiClaims.some((item) => /adopted every coalition recommendation/i.test(item))
      );
    })()
  },
  {
    id: "callnyc-full-population-accounting",
    label: "The complete 110-slot CallNYC control is accounted without hiding the recovery gap",
    pass:
      callnycCensusRows.length === 110 &&
      callnycRecoveredCensusRows.length === 107 &&
      callnycUnresolvedCensusRows.length === 3 &&
      new Set(callnycRecoveredCensusRows.map((row) => row[1])).size === 107 &&
      callnycRecoveredCensusRows.filter((row) => row[3] === "authored-post").length === 86 &&
      callnycRecoveredCensusRows.filter((row) => row[3] === "authored-reply").length === 6 &&
      callnycRecoveredCensusRows.filter((row) => row[3] === "repost").length === 15
  },
  {
    id: "callnyc-full-population-lineage",
    label: "CallNYC population findings have intake, source, reading, inquiry, and hold lineage",
    pass: (() => {
      const inquiry = knowledgeBank.researchInquiries.find(
        (item) => item.id === "INQ-CALLNYC-FULL-POPULATION-2026"
      );
      const exact = candidateById.get("CND-CALLNYC-EXACT-EXPORT-COMPLETION");
      return Boolean(
        intakeItems.some(
          (item) => item.id === "INT-2026-07-12-CALLNYC-FULL-POPULATION"
        ) &&
        callnycPopulationSourceIds.every((id) => {
          const reading = readingBySourceId.get(id);
          return sourceIds.has(id) && reading?.assertions.length && reading.limitations.length;
        }) &&
        inquiry?.resultStatus === "partially-recovered" &&
        inquiry.findings.some((item) => /110-slot.*107 recovered.*three unresolved/i.test(item)) &&
        inquiry.limitations.some((item) => /official account export/i.test(item)) &&
        exact?.status === "research-needed" &&
        promotions.some(
          (promotion) =>
            promotion.candidateClaimId === exact.id && promotion.decision === "held"
        )
      );
    })()
  },
  {
    id: "callnyc-service-pattern-boundary",
    label: "Record-level service findings are promoted without converting mentions into engagement",
    pass: (() => {
      const candidate = candidateById.get(
        "CND-CALLNYC-SERVICE-RECOGNITION-PATTERN"
      );
      const claim = knowledgeBank.claims.find(
        (item) => item.id === "CLM-CALLNYC-SERVICE-RECOGNITION-PATTERN"
      );
      return Boolean(
        callnycRecoveredCensusRows.filter(
          (row) => row[3].startsWith("authored-") && row[6] === "true"
        ).length === 72 &&
        candidate?.status === "promoted" &&
        /72.*92.*26.*66/i.test(candidate.text) &&
        claim?.boundaries.some((item) => /not proof.*engaged|not direct.*engagement/i.test(item)) &&
        claim.antiClaims.some((item) => /Twenty-six Council members directly engaged/i.test(item))
      );
    })()
  },
  {
    id: "wowlist-full-population-accounting",
    label: "The complete 38-record WOWList profile population is recovered and classified",
    pass:
      wowlistCensusRows.length === 38 &&
      wowlistCensusRows.every((row) => row[9] === "recovered") &&
      new Set(wowlistCensusRows.map((row) => row[1])).size === 38 &&
      wowlistCensusRows.filter((row) => row[3] === "authored-post").length === 16 &&
      wowlistCensusRows.filter((row) => row[3] === "authored-reply").length === 6 &&
      wowlistCensusRows.filter((row) => row[3] === "repost").length === 16
  },
  {
    id: "wowlist-full-population-lineage",
    label: "WOWList population findings have complete intake, source, reading, inquiry, and promotion lineage",
    pass: (() => {
      const inquiry = knowledgeBank.researchInquiries.find(
        (item) => item.id === "INQ-WOWLIST-FULL-POPULATION-2026"
      );
      const population = candidateById.get("CND-WOWLIST-COMPLETE-SOCIAL-POPULATION");
      return Boolean(
        intakeItems.some(
          (item) => item.id === "INT-2026-07-12-WOWLIST-FULL-POPULATION"
        ) &&
        wowlistPopulationSourceIds.every((id) => {
          const reading = readingBySourceId.get(id);
          return sourceIds.has(id) && reading?.assertions.length && reading.limitations.length;
        }) &&
        inquiry?.resultStatus === "recovered" &&
        inquiry.findings.some((item) => /All 38 profile-counted records/i.test(item)) &&
        inquiry.limitations.some((item) => /shared account.*teammate/i.test(item)) &&
        population?.status === "promoted" &&
        population.promotedClaimId === "CLM-WOWLIST-COMPLETE-SOCIAL-POPULATION"
      );
    })()
  },
  {
    id: "wowlist-support-and-care-boundaries",
    label: "WOWList support and civic-care patterns are projected with shared-authorship and impact boundaries",
    pass: (() => {
      const support = candidateById.get("CND-WOWLIST-PUBLIC-SUPPORT-SURFACE");
      const supportClaim = knowledgeBank.claims.find(
        (item) => item.id === "CLM-WOWLIST-PUBLIC-SUPPORT-SURFACE"
      );
      const civicClaim = knowledgeBank.claims.find(
        (item) => item.id === "CLM-WOWLIST-CIVIC-CARE-CONTINUITY"
      );
      const wowlistMdx = readFileSync("apps/www/src/content/work/wowlist.mdx", "utf8");
      return Boolean(
        wowlistCensusRows.filter(
          (row) => row[5] === "product-support-and-onboarding"
        ).length === 6 &&
        wowlistCensusRows.filter(
          (row) => row[5] === "civic-mobilization-and-care"
        ).length === 5 &&
        wowlistCensusRows.filter((row) => row[5] === "civic-care-amplification")
          .length === 5 &&
        support?.status === "promoted" &&
        supportClaim?.boundaries.some((item) => /do not assign individual post authorship/i.test(item)) &&
        civicClaim?.boundaries.some((item) => /does not establish.*causality/i.test(item)) &&
        /claimId="CLM-WOWLIST-PUBLIC-SUPPORT-SURFACE"/.test(wowlistMdx)
      );
    })()
  },
  {
    id: "kctownhall-full-population-accounting",
    label: "The complete 183-record KC Town Hall profile population is recovered and classified",
    pass:
      kctownhallCensusRows.length === 183 &&
      kctownhallCensusRows.every((row) => row[9] === "recovered") &&
      new Set(kctownhallCensusRows.map((row) => row[1])).size === 183 &&
      kctownhallCensusRows.filter((row) => row[3] === "authored-post").length === 142 &&
      kctownhallCensusRows.filter((row) => row[3] === "authored-reply").length === 13 &&
      kctownhallCensusRows.filter((row) => row[3] === "repost").length === 28 &&
      kctownhallCensusRows.filter(
        (row) => row[5] === "resident-service-and-environmental-action"
      ).length === 100
  },
  {
    id: "kctownhall-full-population-lineage",
    label: "KC Town Hall population findings have complete lifecycle and research-hold lineage",
    pass: (() => {
      const inquiry = knowledgeBank.researchInquiries.find(
        (item) => item.id === "INQ-KCTH-FULL-POPULATION-2026"
      );
      const population = candidateById.get("CND-KCTH-COMPLETE-SOCIAL-POPULATION");
      const outcomes = candidateById.get("CND-KCTH-TIRES-OUTCOME-TOTALS");
      return Boolean(
        intakeItems.some((item) => item.id === "INT-2026-07-12-KCTH-FULL-POPULATION") &&
        kctownhallPopulationSourceIds.every((id) => {
          const reading = readingBySourceId.get(id);
          return sourceIds.has(id) && reading?.assertions.length && reading.limitations.length;
        }) &&
        inquiry?.resultStatus === "recovered" &&
        inquiry.findings.some((item) => /All 183 profile-counted records/i.test(item)) &&
        population?.status === "promoted" &&
        population.promotedClaimId === "CLM-KCTH-COMPLETE-SOCIAL-POPULATION" &&
        outcomes?.status === "research-needed" &&
        promotions.some(
          (promotion) =>
            promotion.candidateClaimId === outcomes.id && promotion.decision === "held"
        ) &&
        discoveryNotes.some(
          (note) => note.id === "DISC-KCTH-TIRES-INDEPENDENT-CORROBORATION-2026"
        )
      );
    })()
  },
  {
    id: "kctownhall-workflow-credit-and-privacy",
    label: "The resident-service workflow preserves collective credit, metric boundaries, and resident privacy",
    pass: (() => {
      const workflow = candidateById.get("CND-KCTH-RESIDENT-SERVICE-WORKFLOW");
      const claim = knowledgeBank.claims.find(
        (item) => item.id === "CLM-KCTH-RESIDENT-SERVICE-WORKFLOW"
      );
      const page = readFileSync("apps/www/src/content/work/kc-town-hall.mdx", "utf8");
      return Boolean(
        workflow?.status === "promoted" &&
        workflow.promotedClaimId === "CLM-KCTH-RESIDENT-SERVICE-WORKFLOW" &&
        claim?.boundaries.some(
          (item) => /Julia and Jamie.*KC Town Hall.*Oak Park Neighborhood Association/i.test(item)
        ) &&
        claim.boundaries.some((item) => /project-reported|independently corroborated/i.test(item)) &&
        /claimId="CLM-KCTH-RESIDENT-SERVICE-WORKFLOW"/.test(page) &&
        !/\b816[- )]/.test(kctownhallCensusText) &&
        !/resident-submitted location/i.test(kctownhallCensusText)
      );
    })()
  },
  {
    id: "nycartc-full-population-accounting",
    label: "The complete 5,124-slot NYC Artist Coalition control is accounted without overstating recovery",
    pass:
      nycartcCensusRows.length === 5124 &&
      nycartcRecoveredCensusRows.length === 892 &&
      nycartcUnresolvedCensusRows.length === 4232 &&
      new Set(nycartcRecoveredCensusRows.map((row) => row[1])).size === 892 &&
      nycartcUnresolvedCensusRows.every((row) => !row[1]) &&
      nycartcRecoveredCensusRows.filter((row) => row[3] === "repost").length === 541 &&
      nycartcRecoveredCensusRows.filter((row) => row[3] === "authored-post").length === 103 &&
      nycartcRecoveredCensusRows.filter((row) => row[3] === "authored-reply").length === 12 &&
      nycartcRecoveredCensusRows.filter((row) => row[3] === "authored-record").length === 236
  },
  {
    id: "nycartc-full-population-lineage",
    label: "NYC Artist Coalition population findings have intake, source, reading, inquiry, promotion, and hold lineage",
    pass: (() => {
      const inquiry = knowledgeBank.researchInquiries.find(
        (item) => item.id === "INQ-NYCAC-FULL-POPULATION-2026"
      );
      const population = candidateById.get("CND-NYCAC-POPULATION-ACCOUNTING");
      const continuation = candidateById.get("CND-NYCAC-RESOURCE-AND-ADVOCACY-SURFACE");
      const proportions = candidateById.get("CND-NYCAC-POPULATION-THEME-PROPORTIONS");
      return Boolean(
        intakeItems.some(
          (item) => item.id === "INT-2026-07-12-NYCAC-FULL-POPULATION"
        ) &&
        nycartcPopulationSourceIds.every((id) => {
          const reading = readingBySourceId.get(id);
          return sourceIds.has(id) && reading?.assertions.length && reading.limitations.length;
        }) &&
        inquiry?.resultStatus === "partially-recovered" &&
        inquiry.findings.some((item) => /5,124.*892/i.test(item)) &&
        inquiry.limitations.some((item) => /4,232 unresolved/i.test(item)) &&
        population?.status === "promoted" &&
        population.promotedClaimId === "CLM-NYCAC-POPULATION-ACCOUNTING" &&
        continuation?.status === "promoted" &&
        continuation.promotedClaimId === "CLM-NYCAC-RESOURCE-AND-ADVOCACY-SURFACE" &&
        proportions?.status === "research-needed" &&
        promotions.some(
          (promotion) =>
            promotion.candidateClaimId === proportions.id && promotion.decision === "held"
        )
      );
    })()
  },
  {
    id: "nycartc-public-boundaries",
    label: "NYC Artist Coalition population documentation preserves absence, privacy, and non-extrapolation boundaries",
    pass: (() => {
      const claim = knowledgeBank.claims.find(
        (item) => item.id === "CLM-NYCAC-POPULATION-ACCOUNTING"
      );
      const page = readFileSync("apps/www/src/content/work/fair-rent-nyc.mdx", "utf8");
      const report = readFileSync(
        "docs/knowledge-bank/nycartc-population-2026-07-12.md",
        "utf8"
      );
      return Boolean(
        /complete accounting, not complete recovery/i.test(report) &&
        /17\.4\s+percent/i.test(report) &&
        claim?.boundaries.some((item) => /82\.6 percent.*unresolved/i.test(item)) &&
        claim.antiClaims.some((item) => /All 5,124 records were recovered/i.test(item)) &&
        /claimId="CLM-NYCAC-RESOURCE-AND-ADVOCACY-SURFACE"/.test(page) &&
        /^ledger_id,status_id,date,record_type,account,primary_theme,mentioned_handles,hashtags,status_url,accounting_status/m.test(
          nycartcCensusText
        ) &&
        !/full_text|post_text|private_path|protected_locator/i.test(
          nycartcCensusText.split("\n")[0]
        )
      );
    })()
  },
  {
    id: "nycartc-facebook-event-full-population-accounting",
    label: "The 34-slot NYC Artist Coalition Facebook event control is fully reconciled with one unresolved slot",
    pass: (() => {
      const yearCounts = new Map();
      for (const row of nycartcFacebookRecoveredEventRows) {
        const year = row[2].slice(0, 4);
        yearCounts.set(year, (yearCounts.get(year) ?? 0) + 1);
      }
      const recurringRows = nycartcFacebookRecoveredEventRows.filter((row) =>
        [
          "coalition-formation-meeting",
          "recurring-meeting",
          "panel-and-recurring-meeting",
          "relief-meeting"
        ].includes(row[6])
      );
      const recurringPhysicalVenues = new Set(
        recurringRows
          .filter((row) => !["Virtual", "Online"].includes(row[5]))
          .map((row) => row[5])
      );
      return (
        nycartcFacebookEventCensusRows.length === 34 &&
        nycartcFacebookEventCensusRows.every((row) => row.length === 11) &&
        new Set(nycartcFacebookEventCensusRows.map((row) => row[0])).size === 34 &&
        nycartcFacebookRecoveredEventRows.length === 33 &&
        new Set(nycartcFacebookRecoveredEventRows.map((row) => row[1])).size === 33 &&
        nycartcFacebookUnresolvedEventRows.length === 1 &&
        nycartcFacebookUnresolvedEventRows[0][0] === "unresolved-034" &&
        nycartcFacebookRecoveredEventRows.filter((row) => row[4] === "direct-card-host")
          .length === 24 &&
        nycartcFacebookRecoveredEventRows.filter(
          (row) => row[4] === "cohosted-or-associated"
        ).length === 9 &&
        nycartcFacebookRecoveredEventRows.filter((row) => row[8]).length === 32 &&
        yearCounts.get("2017") === 17 &&
        yearCounts.get("2018") === 3 &&
        yearCounts.get("2019") === 6 &&
        yearCounts.get("2020") === 6 &&
        yearCounts.get("2021") === 1 &&
        recurringRows.length === 12 &&
        recurringPhysicalVenues.size === 10
      );
    })()
  },
  {
    id: "nycartc-facebook-event-lifecycle-lineage",
    label: "Facebook event findings have complete intake, source, reading, inquiry, promotion, and hold lineage",
    pass: (() => {
      const inquiry = knowledgeBank.researchInquiries.find(
        (item) => item.id === "INQ-NYCAC-FACEBOOK-EVENTS-2026"
      );
      const population = candidateById.get("CND-NYCAC-FACEBOOK-EVENT-ACCOUNTING");
      const participation = candidateById.get("CND-NYCAC-PARTICIPATION-SYSTEM");
      const attendance = candidateById.get(
        "CND-NYCAC-FACEBOOK-RESPONSES-EQUAL-ATTENDANCE"
      );
      const causality = candidateById.get("CND-NYCAC-EVENTS-CAUSED-POLICY-OUTCOMES");
      return Boolean(
        intakeItems.some((item) => item.id === "INT-2026-07-13-NYCAC-FACEBOOK-EVENTS") &&
        nycartcFacebookEventSourceIds.every((id) => {
          const reading = readingBySourceId.get(id);
          return sourceIds.has(id) && reading?.assertions.length && reading.limitations.length;
        }) &&
        inquiry?.resultStatus === "partially-recovered" &&
        inquiry.findings.some((item) => /34.*33.*one unresolved/i.test(item)) &&
        inquiry.limitations.some((item) => /not unique-person.*attendance/i.test(item)) &&
        population?.status === "promoted" &&
        population.promotedClaimId === "CLM-NYCAC-FACEBOOK-EVENT-POPULATION-2026" &&
        participation?.status === "promoted" &&
        participation.promotedClaimId === "CLM-NYCAC-PARTICIPATION-SYSTEM" &&
        attendance?.status === "research-needed" &&
        causality?.status === "research-needed" &&
        promotions.some(
          (promotion) =>
            promotion.candidateClaimId === attendance.id && promotion.decision === "held"
        ) &&
        promotions.some(
          (promotion) =>
            promotion.candidateClaimId === causality.id && promotion.decision === "held"
        )
      );
    })()
  },
  {
    id: "nycartc-facebook-event-public-boundaries",
    label: "Facebook event documentation preserves privacy, authorship, attendance, and causality boundaries",
    pass: (() => {
      const source = knowledgeBank.sources.find(
        (item) => item.id === "SRC-NYCAC-FACEBOOK-EVENTS-POPULATION-RUN-2026"
      );
      const participation = knowledgeBank.claims.find(
        (item) => item.id === "CLM-NYCAC-PARTICIPATION-SYSTEM"
      );
      const response = knowledgeBank.claims.find(
        (item) => item.id === "CLM-NYCAC-FACEBOOK-RESPONSE-BOUNDARY"
      );
      const report = readFileSync(
        "docs/knowledge-bank/nycartc-facebook-events-2026-07-13.md",
        "utf8"
      );
      const antiClaims = readFileSync("docs/knowledge-bank/anti-claims.md", "utf8");
      return Boolean(
        source?.visibility === "protected" &&
        source.protectedLocatorId &&
        /33 recovered.*one unresolved/i.test(report) &&
        /response does not establish[\s\S]{0,80}attendance/i.test(report) &&
        /helped establish and produce/i.test(report) &&
        /Do not sum Facebook response totals/i.test(antiClaims) &&
        participation?.boundaries.some((item) => /collectively|collective/i.test(item)) &&
        response?.antiClaims.some((item) => /sum of all Facebook responses/i.test(item)) &&
        nycartcFacebookEventCensusText.startsWith(
          "slot_id,event_id,event_date,event_title,page_relationship,venue_or_mode,event_format,primary_program,response_display,recovery_status,source_url"
        ) &&
        !/guest|invite|comment|email|phone|passcode|zoom|protected_locator|private_path/i.test(
          nycartcFacebookEventCensusText
        ) &&
        !publicRegistryText.includes("RESEARCH-NYCAC-FACEBOOK-EVENTS-2026-001")
      );
    })()
  },
  {
    id: "nycartc-facebook-event-chad-projection",
    label: "The event archive projects one bounded, hiring-legible participation-system claim",
    pass: (() => {
      const claim = knowledgeBank.claims.find(
        (item) => item.id === "CLM-NYCAC-PARTICIPATION-SYSTEM"
      );
      const candidate = candidateById.get("CND-NYCAC-PARTICIPATION-SYSTEM");
      const page = readFileSync("apps/www/src/content/work/fair-rent-nyc.mdx", "utf8");
      const work = readFileSync("apps/www/src/data/work.ts", "utf8");
      const proofs = readFileSync("apps/www/src/data/proofs.ts", "utf8");
      return Boolean(
        candidate?.status === "promoted" &&
        candidate.promotedClaimId === claim?.id &&
        claim?.projections.some(
          (projection) =>
            projection.key === "case-study" &&
            projection.status === "active" &&
            projection.citationRequired &&
            projection.surfaces.includes("/work/fair-rent-nyc")
        ) &&
        /claimId="CLM-NYCAC-PARTICIPATION-SYSTEM"/.test(page) &&
        /years:\s*"2017-Present"/.test(work) &&
        /nyc-artist-coalition-participation-system/.test(work) &&
        /nyc-artist-coalition-participation-system/.test(proofs)
      );
    })()
  },
  {
    id: "urbanhermit-full-population-accounting",
    label: "The complete 434-record personal-account control is recovered and reconciled without interpretive drift",
    pass: (() => {
      const yearCounts = new Map();
      const themeCounts = new Map();
      const authoredThemeCounts = new Map();
      const repostThemeCounts = new Map();
      for (const row of urbanhermitCensusRows) {
        yearCounts.set(row[1], (yearCounts.get(row[1]) ?? 0) + 1);
        themeCounts.set(row[3], (themeCounts.get(row[3]) ?? 0) + 1);
        const target = row[2] === "repost" ? repostThemeCounts : authoredThemeCounts;
        target.set(row[3], (target.get(row[3]) ?? 0) + 1);
      }
      const expectedThemes = new Set(urbanhermitExpectedThemes.keys());
      return (
        urbanhermitCensusRows.length === 434 &&
        new Set(urbanhermitCensusRows.map((row) => row[0])).size === 434 &&
        urbanhermitCensusRows.every(
          (row) =>
            row.length === 6 &&
            /^recovered-\d{4}$/.test(row[0]) &&
            expectedThemes.has(row[3]) &&
            row[4] === "recovered" &&
            row[5] === "aggregate-only"
        ) &&
        urbanhermitCensusRows.filter((row) => row[2] === "authored-post").length === 338 &&
        urbanhermitCensusRows.filter((row) => row[2] === "authored-reply").length === 15 &&
        urbanhermitCensusRows.filter((row) => row[2] === "repost").length === 81 &&
        urbanhermitExpectedYears.size === yearCounts.size &&
        [...urbanhermitExpectedYears].every(
          ([year, expected]) => yearCounts.get(year) === expected
        ) &&
        [...urbanhermitExpectedThemes].every(
          ([theme, expected]) => themeCounts.get(theme) === expected
        ) &&
        [...urbanhermitExpectedAuthoredThemes].every(
          ([theme, expected]) => (authoredThemeCounts.get(theme) ?? 0) === expected
        ) &&
        [...urbanhermitExpectedRepostThemes].every(
          ([theme, expected]) => (repostThemeCounts.get(theme) ?? 0) === expected
        )
      );
    })()
  },
  {
    id: "urbanhermit-full-population-lineage",
    label: "Personal-account findings have intake, source, reading, inquiry, promotion, and hold lineage",
    pass: (() => {
      const inquiry = knowledgeBank.researchInquiries.find(
        (item) => item.id === "INQ-URBANHERMIT-FULL-POPULATION-2026"
      );
      const population = candidateById.get("CND-URBANHERMIT-POPULATION-ACCOUNTING");
      const threads = candidateById.get("CND-URBANHERMIT-PRACTICE-THREADS");
      const frequency = candidateById.get("CND-URBANHERMIT-FREQUENCY-EQUALS-IMPACT");
      return Boolean(
        intakeItems.some(
          (item) => item.id === "INT-2026-07-13-URBANHERMIT-FULL-POPULATION"
        ) &&
        urbanhermitPopulationSourceIds.every((id) => {
          const reading = readingBySourceId.get(id);
          return sourceIds.has(id) && reading?.assertions.length && reading.limitations.length;
        }) &&
        inquiry?.resultStatus === "recovered" &&
        inquiry.findings.some((item) => /338.*15.*81/i.test(item)) &&
        inquiry.limitations.some((item) => /deleted before capture/i.test(item)) &&
        population?.status === "promoted" &&
        population.promotedClaimId === "CLM-URBANHERMIT-POPULATION-ACCOUNTING" &&
        threads?.status === "promoted" &&
        threads.promotedClaimId === "CLM-URBANHERMIT-PRACTICE-THREADS" &&
        frequency?.status === "research-needed" &&
        promotions.some(
          (promotion) =>
            promotion.candidateClaimId === frequency.id && promotion.decision === "held"
        )
      );
    })()
  },
  {
    id: "urbanhermit-public-boundaries",
    label: "Personal-account documentation preserves privacy, authorship, and non-instrumentalization boundaries",
    pass: (() => {
      const source = knowledgeBank.sources.find(
        (item) => item.id === "SRC-URBANHERMIT-FULL-POPULATION-RUN-2026"
      );
      const claim = knowledgeBank.claims.find(
        (item) => item.id === "CLM-URBANHERMIT-POPULATION-ACCOUNTING"
      );
      const report = readFileSync(
        "docs/knowledge-bank/urbanhermit-population-2026-07-13.md",
        "utf8"
      );
      return Boolean(
        source?.visibility === "protected" &&
        source.protectedLocatorId &&
        /complete recovery of the current surviving profile population/i.test(report) &&
        /new dossier/i.test(report) &&
        /ordinary-life and relational material/i.test(report) &&
        claim?.boundaries.some((item) => /deleted before capture/i.test(item)) &&
        claim.antiClaims.some((item) => /public census reproduces/i.test(item)) &&
        urbanhermitCensusText.startsWith(
          "ledger_id,year,record_type,primary_theme,accounting_status,public_detail_status"
        ) &&
        !/status_id|status_url|exact_date|full_text|post_text|handle|protected_locator|@urbanhermit|https?:/i.test(
          urbanhermitCensusText
        ) &&
        !publicRegistryText.includes("RESEARCH-URBANHERMIT-FULL-POPULATION-2026-001")
      );
    })()
  },
  {
    id: "urbanhermit-independent-corroboration",
    label: "The strongest new personal-archive lead is independently corroborated and held from automatic site projection",
    pass: (() => {
      const source = knowledgeBank.sources.find(
        (item) => item.id === "SRC-HORSE-LORDS-TRUTHERS-NPR-2016"
      );
      const claim = knowledgeBank.claims.find(
        (item) => item.id === "CLM-HORSE-LORDS-TRUTHERS-VIDEO-2016"
      );
      const candidate = candidateById.get("CND-HORSE-LORDS-TRUTHERS-VIDEO-2016");
      return Boolean(
        source?.organization === "NPR Music" &&
        source.canonicalUrl?.includes("/476020413/") &&
        claim?.status === "confirmed-with-boundary" &&
        claim.evidence.some(
          (item) =>
            item.sourceId === source.id && item.relationship === "direct-support"
        ) &&
        claim.boundaries.some((item) => /Credit Jamie and M\.C\. Schmidt together/i.test(item)) &&
        claim.projections.every(
          (projection) =>
            projection.key === "archive-note" &&
            projection.surfaces.every((surface) => !surface.startsWith("/"))
        ) &&
        candidate?.status === "promoted" &&
        candidate.promotedClaimId === claim.id
      );
    })()
  },
  {
    id: "jamie-facebook-hosted-event-full-population-accounting",
    label: "The 21-slot personal hosted-event control is fully reconciled with one unresolved slot",
    pass: (() => {
      const yearCounts = new Map();
      const themeCounts = new Map();
      for (const row of jamieFacebookRecoveredHostedEventRows) {
        yearCounts.set(row[1], (yearCounts.get(row[1]) ?? 0) + 1);
        themeCounts.set(row[3], (themeCounts.get(row[3]) ?? 0) + 1);
      }
      return (
        jamieFacebookHostedEventCensusRows.length === 21 &&
        jamieFacebookHostedEventCensusRows.every((row) => row.length === 6) &&
        new Set(jamieFacebookHostedEventCensusRows.map((row) => row[0])).size === 21 &&
        jamieFacebookRecoveredHostedEventRows.length === 20 &&
        jamieFacebookRecoveredHostedEventRows.every(
          (row) =>
            row[2] === "jamie-host-card" &&
            row[5] === "aggregate-only" &&
            jamieFacebookExpectedHostedEventThemes.has(row[3])
        ) &&
        jamieFacebookUnresolvedHostedEventRows.length === 1 &&
        jamieFacebookUnresolvedHostedEventRows[0][0] === "unresolved-021" &&
        jamieFacebookExpectedHostedEventYears.size === yearCounts.size &&
        [...jamieFacebookExpectedHostedEventYears].every(
          ([year, expected]) => yearCounts.get(year) === expected
        ) &&
        [...jamieFacebookExpectedHostedEventThemes].every(
          ([theme, expected]) => themeCounts.get(theme) === expected
        )
      );
    })()
  },
  {
    id: "facebook-personal-wowlist-event-lifecycle-lineage",
    label: "Personal and WOW List event findings have intake, reading, inquiry, promotion, and hold lineage",
    pass: (() => {
      const personalInquiry = knowledgeBank.researchInquiries.find(
        (item) => item.id === "INQ-JAMIE-FACEBOOK-HOSTED-EVENTS-2026"
      );
      const wowlistInquiry = knowledgeBank.researchInquiries.find(
        (item) => item.id === "INQ-WOWLIST-FACEBOOK-EVENTS-2026"
      );
      const population = candidateById.get(
        "CND-JAMIE-FACEBOOK-HOSTED-EVENT-POPULATION"
      );
      const practice = candidateById.get("CND-JAMIE-FACEBOOK-HOSTED-EVENT-PRACTICE");
      const association = candidateById.get(
        "CND-JAMIE-FACEBOOK-ASSOCIATION-EQUALS-PARTICIPATION"
      );
      const wowlistControl = candidateById.get(
        "CND-WOWLIST-FACEBOOK-EVENT-LIVE-CONTROL"
      );
      const wowlistNever = candidateById.get(
        "CND-WOWLIST-NEVER-HOSTED-FACEBOOK-EVENTS"
      );
      return Boolean(
        intakeItems.some(
          (item) => item.id === "INT-2026-07-13-FACEBOOK-PERSONAL-WOWLIST-EVENTS"
        ) &&
        facebookEventSurfaceSourceIds.every((id) => {
          const reading = readingBySourceId.get(id);
          return sourceIds.has(id) && reading?.assertions.length && reading.limitations.length;
        }) &&
        personalInquiry?.resultStatus === "partially-recovered" &&
        personalInquiry.findings.some((item) => /21.*20.*one unresolved/i.test(item)) &&
        personalInquiry.limitations.some((item) => /association does not establish/i.test(item)) &&
        wowlistInquiry?.resultStatus === "partially-recovered" &&
        wowlistInquiry.limitations.some((item) => /does not establish.*historical/i.test(item)) &&
        population?.status === "promoted" &&
        population.promotedClaimId ===
          "CLM-JAMIE-FACEBOOK-HOSTED-EVENT-POPULATION-2026" &&
        practice?.status === "promoted" &&
        practice.promotedClaimId ===
          "CLM-JAMIE-FACEBOOK-HOSTED-EVENT-PRACTICE-2006-2017" &&
        wowlistControl?.status === "promoted" &&
        wowlistControl.promotedClaimId ===
          "CLM-WOWLIST-FACEBOOK-EVENT-LIVE-CONTROL-2026" &&
        association?.status === "research-needed" &&
        wowlistNever?.status === "research-needed" &&
        promotions.some(
          (promotion) =>
            promotion.candidateClaimId === association.id && promotion.decision === "held"
        ) &&
        promotions.some(
          (promotion) =>
            promotion.candidateClaimId === wowlistNever.id && promotion.decision === "held"
        )
      );
    })()
  },
  {
    id: "jamie-facebook-hosted-event-public-boundaries",
    label: "The personal hosted-event archive remains aggregate-only and does not become a relational dossier",
    pass: (() => {
      const source = knowledgeBank.sources.find(
        (item) => item.id === "SRC-JAMIE-FACEBOOK-HOSTED-EVENT-RUN-2026"
      );
      const associationSource = knowledgeBank.sources.find(
        (item) => item.id === "SRC-JAMIE-FACEBOOK-EVENT-ASSOCIATION-RUN-2026"
      );
      const claim = knowledgeBank.claims.find(
        (item) => item.id === "CLM-JAMIE-FACEBOOK-HOSTED-EVENT-PRACTICE-2006-2017"
      );
      const report = readFileSync(
        "docs/knowledge-bank/jamie-facebook-events-2026-07-13.md",
        "utf8"
      );
      const antiClaims = readFileSync("docs/knowledge-bank/anti-claims.md", "utf8");
      return Boolean(
        source?.visibility === "protected" &&
        source.protectedLocatorId &&
        associationSource?.visibility === "protected" &&
        associationSource.protectedLocatorId &&
        /502 distinct public event\s+associations/i.test(report) &&
        /20 hosted-event pages[\s\S]{0,120}one\s+historical slot as unresolved/i.test(report) &&
        /new dossier/i.test(report) &&
        /Do not treat the 502 events/i.test(antiClaims) &&
        claim?.boundaries.some((item) => /does not establish sole production/i.test(item)) &&
        jamieFacebookHostedEventCensusText.startsWith(
          "slot_id,year,host_relationship,primary_theme,accounting_status,public_detail_status"
        ) &&
        !/event_id|event_url|source_url|exact_date|event_title|address|guest|comment|response|email|phone|https?:/i.test(
          jamieFacebookHostedEventCensusText
        ) &&
        !publicRegistryText.includes("RESEARCH-JAMIE-FACEBOOK-HOSTED-EVENTS-2026-001") &&
        !publicRegistryText.includes("RESEARCH-JAMIE-FACEBOOK-EVENT-ASSOCIATIONS-2026-001")
      );
    })()
  },
  {
    id: "wowlist-facebook-event-zero-control-boundary",
    label: "WOW List's current zero-record event control is preserved without becoming a never-existed claim",
    pass: (() => {
      const claim = knowledgeBank.claims.find(
        (item) => item.id === "CLM-WOWLIST-FACEBOOK-EVENT-LIVE-CONTROL-2026"
      );
      const report = readFileSync(
        "docs/knowledge-bank/wowlist-facebook-events-2026-07-13.md",
        "utf8"
      );
      return Boolean(
        wowlistFacebookEventControlRows.length === 1 &&
        wowlistFacebookEventControlRows[0].length === 5 &&
        wowlistFacebookEventControlRows[0][1] === "0" &&
        wowlistFacebookEventControlRows[0][2] === "no-events-to-show" &&
        wowlistFacebookEventControlRows[0][3] ===
          "no-historical-event-records-recovered" &&
        /not proof that WOW List never/i.test(report) &&
        /not recovered`, not `did not exist/i.test(report) &&
        claim?.boundaries.some((item) => /Negative recovery is not proof/i.test(item)) &&
        claim.antiClaims.some((item) => /never used Facebook events/i.test(item)) &&
        !publicRegistryText.includes("RESEARCH-WOWLIST-FACEBOOK-EVENTS-2026-001")
      );
    })()
  },
  {
    id: "facebook-personal-wowlist-chad-editorial-restraint",
    label: "Chad's lens keeps the event findings available without adding reader burden to the live portfolio",
    pass: (() => {
      const brief = editorialBriefs.find(
        (item) => item.id === "BRIEF-FACEBOOK-PERSONAL-WOWLIST-EVENTS-EDITORIAL-2026"
      );
      const selectedClaims = [
        "CLM-JAMIE-FACEBOOK-HOSTED-EVENT-POPULATION-2026",
        "CLM-JAMIE-FACEBOOK-HOSTED-EVENT-PRACTICE-2006-2017",
        "CLM-WOWLIST-FACEBOOK-EVENT-LIVE-CONTROL-2026"
      ].map((id) => knowledgeBank.claims.find((claim) => claim.id === id));
      return Boolean(
        brief?.selectedClaimIds.length === 3 &&
        brief.heldCandidateClaimIds.includes(
          "CND-JAMIE-FACEBOOK-ASSOCIATION-EQUALS-PARTICIPATION"
        ) &&
        brief.heldCandidateClaimIds.includes(
          "CND-WOWLIST-NEVER-HOSTED-FACEBOOK-EVENTS"
        ) &&
        brief.rationale.some((item) => /no immediate website change/i.test(item)) &&
        selectedClaims.every(
          (claim) =>
            claim &&
            claim.projections.every(
              (projection) =>
                projection.key === "archive-note" &&
                projection.surfaces.every((surface) => !surface.startsWith("/"))
            )
        ) &&
        selectedClaims.every(
          (claim) => claim && !renderedProjectionSources.includes(claim.id)
        )
      );
    })()
  },
  {
    id: "wowlist-facebook-post-full-population-accounting",
    label: "The terminal WOW List Facebook cursor is reconciled into a complete 57-record public-safe census",
    pass: (() => {
      const yearCounts = new Map();
      const themeCounts = new Map();
      let reactions = 0;
      let comments = 0;
      let shares = 0;
      let recordsWithInteractions = 0;
      for (const row of wowlistFacebookPostCensusRows) {
        const year = row[2].slice(0, 4);
        yearCounts.set(year, (yearCounts.get(year) ?? 0) + 1);
        themeCounts.set(row[4], (themeCounts.get(row[4]) ?? 0) + 1);
        reactions += Number(row[5]);
        comments += Number(row[6]);
        shares += Number(row[7]);
        if (Number(row[5]) + Number(row[6]) + Number(row[7]) > 0) {
          recordsWithInteractions += 1;
        }
      }
      return (
        wowlistFacebookPostCensusRows.length === 57 &&
        wowlistFacebookPostCensusRows.every(
          (row) =>
            row.length === 11 &&
            row[9] === "recovered" &&
            row[10] === "metadata-only"
        ) &&
        new Set(wowlistFacebookPostCensusRows.map((row) => row[0])).size === 57 &&
        new Set(wowlistFacebookPostCensusRows.map((row) => row[1])).size === 57 &&
        wowlistFacebookPostCensusRows.filter((row) => row[3] === "standalone-post")
          .length === 35 &&
        wowlistFacebookPostCensusRows.filter((row) => row[3] === "reshared-story")
          .length === 22 &&
        [...wowlistFacebookPostExpectedYears].every(
          ([year, expected]) => yearCounts.get(year) === expected
        ) &&
        [...wowlistFacebookPostExpectedThemes].every(
          ([theme, expected]) => themeCounts.get(theme) === expected
        ) &&
        reactions === 94 &&
        comments === 16 &&
        shares === 49 &&
        recordsWithInteractions === 47
      );
    })()
  },
  {
    id: "wowlist-facebook-post-lifecycle-lineage",
    label: "The WOW List Facebook population has intake, reading, inquiry, promotion, and hold lineage",
    pass: (() => {
      const inquiry = knowledgeBank.researchInquiries.find(
        (item) => item.id === "INQ-WOWLIST-FACEBOOK-FULL-POPULATION-2026"
      );
      const promotedPairs = [
        ["CND-WOWLIST-FACEBOOK-COMPLETE-POPULATION", "CLM-WOWLIST-FACEBOOK-COMPLETE-POPULATION"],
        ["CND-WOWLIST-FACEBOOK-DISTRIBUTED-USE", "CLM-WOWLIST-FACEBOOK-DISTRIBUTED-USE"],
        ["CND-WOWLIST-FACEBOOK-CIVIC-ROUTING", "CLM-WOWLIST-FACEBOOK-CIVIC-ROUTING"],
        ["CND-WOWLIST-FACEBOOK-INTERACTION-SIGNALS", "CLM-WOWLIST-FACEBOOK-INTERACTION-SIGNALS"]
      ];
      const socialManagement = candidateById.get(
        "CND-WOWLIST-FACEBOOK-SOLE-SOCIAL-MANAGEMENT"
      );
      return Boolean(
        intakeItems.some(
          (item) => item.id === "INT-2026-07-13-WOWLIST-FACEBOOK-FULL-POPULATION"
        ) &&
        wowlistFacebookPostSourceIds.every((id) => {
          const reading = readingBySourceId.get(id);
          return sourceIds.has(id) && reading?.assertions.length && reading.limitations.length;
        }) &&
        inquiry?.resultStatus === "recovered" &&
        inquiry.findings.some((item) => /19.*57.*no repeated cursor/i.test(item)) &&
        inquiry.limitations.some((item) => /shared Page identity/i.test(item)) &&
        promotedPairs.every(([candidateId, claimId]) => {
          const candidate = candidateById.get(candidateId);
          return candidate?.status === "promoted" && candidate.promotedClaimId === claimId;
        }) &&
        socialManagement?.status === "research-needed" &&
        promotions.some(
          (promotion) =>
            promotion.candidateClaimId === socialManagement.id && promotion.decision === "held"
        )
      );
    })()
  },
  {
    id: "wowlist-facebook-post-public-boundaries",
    label: "The WOW List Facebook census preserves authorship, interaction, and protected-capture boundaries",
    pass: (() => {
      const source = knowledgeBank.sources.find(
        (item) => item.id === "SRC-WOWLIST-FACEBOOK-FULL-POPULATION-RUN-2026"
      );
      const report = readFileSync(
        "docs/knowledge-bank/wowlist-facebook-posts-2026-07-13.md",
        "utf8"
      );
      const antiClaims = readFileSync("docs/knowledge-bank/anti-claims.md", "utf8");
      return Boolean(
        source?.visibility === "protected" &&
        source.protectedLocatorId &&
        /has_next_page: false/i.test(report) &&
        /does not expose the individual administrator/i.test(report) &&
        /raw authenticated responses/i.test(report) &&
        /Do not say Jamie authored all 57/i.test(antiClaims) &&
        /managed\s+all of (?:WOW List's|the project's) social presence/i.test(antiClaims) &&
        wowlistFacebookPostCensusText.startsWith(
          "ledger_id,post_id,date,record_type,primary_theme,reactions,comments,shares,source_url,accounting_status,public_detail_status"
        ) &&
        !/full_text|post_text|comment_identity|comment_text|account_role|request_token|protected_locator/i.test(
          wowlistFacebookPostCensusText
        ) &&
        !publicRegistryText.includes("RESEARCH-WOWLIST-FACEBOOK-POSTS-2026-001")
      );
    })()
  },
  {
    id: "wowlist-facebook-post-chad-projection",
    label: "Chad's lens projects one hiring-legible distributed-use sentence and holds the archive detail",
    pass: (() => {
      const brief = editorialBriefs.find(
        (item) => item.id === "BRIEF-WOWLIST-FACEBOOK-POSTS-EDITORIAL-2026"
      );
      const distributedUse = knowledgeBank.claims.find(
        (item) => item.id === "CLM-WOWLIST-FACEBOOK-DISTRIBUTED-USE"
      );
      const archiveClaimIds = [
        "CLM-WOWLIST-FACEBOOK-COMPLETE-POPULATION",
        "CLM-WOWLIST-FACEBOOK-CIVIC-ROUTING",
        "CLM-WOWLIST-FACEBOOK-INTERACTION-SIGNALS"
      ];
      const page = readFileSync("apps/www/src/content/work/wowlist.mdx", "utf8");
      const proofs = readFileSync("apps/www/src/data/proofs.ts", "utf8");
      return Boolean(
        brief?.selectedClaimIds.length === 4 &&
        brief.heldCandidateClaimIds.includes(
          "CND-WOWLIST-FACEBOOK-SOLE-SOCIAL-MANAGEMENT"
        ) &&
        brief.rationale.some((item) => /one compact distributed-use sentence/i.test(item)) &&
        distributedUse?.projections.some(
          (projection) =>
            projection.key === "case-study" &&
            projection.status === "active" &&
            projection.citationRequired &&
            projection.surfaces.includes("/work/wowlist") &&
            /nine cities/i.test(projection.text) &&
            /41 Los Angeles events/i.test(projection.text) &&
            /Phoenix organizer/i.test(projection.text)
        ) &&
        /claimId="CLM-WOWLIST-FACEBOOK-DISTRIBUTED-USE"/.test(page) &&
        /terminal-cursor census of 57 surviving Facebook Page records/i.test(proofs) &&
        archiveClaimIds.every((id) => {
          const claim = knowledgeBank.claims.find((item) => item.id === id);
          return claim?.projections.every(
            (projection) =>
              projection.key === "archive-note" &&
              projection.surfaces.every((surface) => !surface.startsWith("/"))
          );
        }) &&
        !/src\/app\/(proofs|knowledge-bank|public-claims)/.test(renderedProjectionSources)
      );
    })()
  },
  {
    id: "jamie-facebook-post-full-population-accounting",
    label: "The terminal personal Facebook author control is reconciled into a complete 1,243-record aggregate census",
    pass: (() => {
      const count = (index) => {
        const result = new Map();
        for (const row of jamieFacebookPostCensusRows) {
          result.set(row[index], (result.get(row[index]) ?? 0) + 1);
        }
        return result;
      };
      const yearCounts = count(1);
      const formCounts = count(2);
      const themeCounts = count(3);
      const relevanceCounts = count(4);
      const matches = (actual, expected) =>
        actual.size === expected.size &&
        [...expected].every(([key, value]) => actual.get(key) === value);
      return (
        jamieFacebookPostCensusRows.length === 1243 &&
        new Set(jamieFacebookPostCensusRows.map((row) => row[0])).size === 1243 &&
        jamieFacebookPostCensusRows.every(
          (row) =>
            row.length === 7 &&
            /^recovered-\d{4}$/.test(row[0]) &&
            row[5] === "recovered" &&
            row[6] === "aggregate-only"
        ) &&
        matches(yearCounts, jamieFacebookPostExpectedYears) &&
        matches(formCounts, jamieFacebookPostExpectedForms) &&
        matches(themeCounts, jamieFacebookPostExpectedThemes) &&
        matches(relevanceCounts, jamieFacebookPostExpectedRelevance)
      );
    })()
  },
  {
    id: "jamie-facebook-post-lifecycle-lineage",
    label: "Personal Facebook post findings have intake, source, reading, inquiry, promotion, and research-hold lineage",
    pass: (() => {
      const inquiry = knowledgeBank.researchInquiries.find(
        (item) => item.id === "INQ-JAMIE-FACEBOOK-FULL-POST-POPULATION-2026"
      );
      const promotedPairs = [
        [
          "CND-JAMIE-FACEBOOK-POST-POPULATION-ACCOUNTING",
          "CLM-JAMIE-FACEBOOK-POST-POPULATION-ACCOUNTING-2026"
        ],
        [
          "CND-JAMIE-FACEBOOK-PROJECT-OPERATIONS-THREAD",
          "CLM-JAMIE-FACEBOOK-PROJECT-OPERATIONS-THREAD-2009-2020"
        ],
        [
          "CND-JAMIE-FACEBOOK-NYCAC-IMPLEMENTATION-PRACTICE",
          "CLM-JAMIE-FACEBOOK-NYCAC-IMPLEMENTATION-PRACTICE-2017-2019"
        ]
      ];
      const heldCandidateIds = [
        "CND-JAMIE-FACEBOOK-COMPLETE-LIFETIME-HISTORY",
        "CND-JAMIE-FACEBOOK-FREQUENCY-EQUALS-IMPACT"
      ];
      return Boolean(
        intakeItems.some(
          (item) =>
            item.id === "INT-2026-07-13-JAMIE-FACEBOOK-FULL-POST-POPULATION"
        ) &&
        jamieFacebookPostSourceIds.every((id) => {
          const reading = readingBySourceId.get(id);
          return sourceIds.has(id) && reading?.assertions.length && reading.limitations.length;
        }) &&
        inquiry?.resultStatus === "recovered" &&
        inquiry.findings.some((item) => /621.*3,728.*1,243/i.test(item)) &&
        inquiry.findings.some((item) => /replayed 1,242.*three times/i.test(item)) &&
        inquiry.limitations.some((item) => /privacy labels were unavailable/i.test(item)) &&
        promotedPairs.every(([candidateId, claimId]) => {
          const candidate = candidateById.get(candidateId);
          return candidate?.status === "promoted" && candidate.promotedClaimId === claimId;
        }) &&
        heldCandidateIds.every((candidateId) => {
          const candidate = candidateById.get(candidateId);
          return (
            candidate?.status === "research-needed" &&
            promotions.some(
              (promotion) =>
                promotion.candidateClaimId === candidateId &&
                promotion.decision === "held"
            )
          );
        })
      );
    })()
  },
  {
    id: "jamie-facebook-post-public-boundaries",
    label: "The personal Facebook corpus remains protected while the public repository contains only aggregate accounting",
    pass: (() => {
      const populationSource = knowledgeBank.sources.find(
        (item) => item.id === "SRC-JAMIE-FACEBOOK-FULL-POST-POPULATION-RUN-2026"
      );
      const closeReadSource = knowledgeBank.sources.find(
        (item) => item.id === "SRC-JAMIE-FACEBOOK-PROFESSIONAL-CLOSE-READ-2026"
      );
      const report = readFileSync(
        "docs/knowledge-bank/jamie-facebook-posts-2026-07-13.md",
        "utf8"
      );
      return Boolean(
        populationSource?.visibility === "protected" &&
        populationSource.protectedLocatorId &&
        closeReadSource?.visibility === "protected" &&
        closeReadSource.protectedLocatorId &&
        /1,242 unique records appeared three times/i.test(report) &&
        /privacy labels were recovered for only a minority/i.test(report) &&
        /protected corpus is a research source, not a new dossier/i.test(report) &&
        /did not recover complete\s+interaction metrics/i.test(report) &&
        jamieFacebookPostCensusText.startsWith(
          "ledger_id,year,record_type,primary_theme,professional_relevance,accounting_status,public_detail_status"
        ) &&
        !/story_id|post_id|status_id|source_url|facebook\.com|exact_date|post_text|full_text|privacy|interaction|comment|email|phone|address|protected_locator/i.test(
          jamieFacebookPostCensusText
        ) &&
        !publicRegistryText.includes("RESEARCH-JAMIE-FACEBOOK-POSTS-2026-001") &&
        !publicRegistryText.includes("RESEARCH-JAMIE-FACEBOOK-POSTS-2026-002") &&
        !publicRegistryText.includes("RESEARCH-JAMIE-FACEBOOK-POSTS-2026-003")
      );
    })()
  },
  {
    id: "jamie-facebook-post-chad-editorial-restraint",
    label: "Chad's lens preserves the research depth without projecting a personal timeline into the live portfolio",
    pass: (() => {
      const brief = editorialBriefs.find(
        (item) => item.id === "BRIEF-JAMIE-FACEBOOK-POSTS-EDITORIAL-2026"
      );
      const selectedClaims = [
        "CLM-JAMIE-FACEBOOK-POST-POPULATION-ACCOUNTING-2026",
        "CLM-JAMIE-FACEBOOK-PROJECT-OPERATIONS-THREAD-2009-2020",
        "CLM-JAMIE-FACEBOOK-NYCAC-IMPLEMENTATION-PRACTICE-2017-2019"
      ].map((id) => knowledgeBank.claims.find((claim) => claim.id === id));
      const report = readFileSync(
        "docs/knowledge-bank/jamie-facebook-posts-2026-07-13.md",
        "utf8"
      );
      return Boolean(
        brief?.selectedClaimIds.length === 3 &&
        brief.heldCandidateClaimIds.includes(
          "CND-JAMIE-FACEBOOK-COMPLETE-LIFETIME-HISTORY"
        ) &&
        brief.heldCandidateClaimIds.includes(
          "CND-JAMIE-FACEBOOK-FREQUENCY-EQUALS-IMPACT"
        ) &&
        brief.rationale.some((item) => /no immediate website change/i.test(item)) &&
        selectedClaims.every(
          (claim) =>
            claim &&
            claim.projections.every(
              (projection) =>
                projection.key === "archive-note" &&
                projection.surfaces.every((surface) => !surface.startsWith("/"))
            )
        ) &&
        selectedClaims.every(
          (claim) => claim && !renderedProjectionSources.includes(claim.id)
        ) &&
        /There is no public Facebook archive route, proofs route, knowledge-bank route/i.test(
          report
        )
      );
    })()
  },
  {
    id: "nter-chng-source-and-lifecycle-lineage",
    label: "NTER CHNG has a complete source-reading-promotion lineage with unresolved claims held",
    pass: (() => {
      const inquiry = knowledgeBank.researchInquiries.find(
        (item) => item.id === "INQ-NTER-CHNG-AMERICA-NOW-HERE-2026"
      );
      const artifactInquiry = knowledgeBank.researchInquiries.find(
        (item) => item.id === "INQ-NTER-CHNG-PROJECT-ARTIFACTS-2026"
      );
      const promotedPairs = [
        [
          "CND-NTER-CHNG-COLLABORATIVE-INSTALLATION",
          "CLM-NTER-CHNG-COLLABORATIVE-INSTALLATION"
        ],
        [
          "CND-NTER-CHNG-AMERICA-NOW-HERE-INCLUSION",
          "CLM-NTER-CHNG-AMERICA-NOW-HERE-INCLUSION-2011"
        ],
        [
          "CND-NTER-CHNG-PARTICIPATORY-SYSTEM-THREAD",
          "CLM-NTER-CHNG-PARTICIPATORY-SYSTEM-THREAD"
        ],
        [
          "CND-NTER-CHNG-ORIGINAL-EXHIBITION-CHRONOLOGY",
          "CLM-NTER-CHNG-ORIGINAL-EXHIBITION-2010"
        ],
        [
          "CND-NTER-CHNG-INTEGRATED-INSTALLATION-SYSTEM-2011",
          "CLM-NTER-CHNG-INTEGRATED-INSTALLATION-SYSTEM-2011"
        ]
      ];
      const heldCandidateIds = [
        "CND-NTER-CHNG-SOLE-TECHNICAL-AUTHORSHIP",
        "CND-NTER-CHNG-EXACT-CLOSING-DATE"
      ];
      const contradictedOpening = candidateById.get(
        "CND-NTER-CHNG-ORIGINAL-OPENING-DATE"
      );
      return Boolean(
        [
          "INT-2026-07-14-NTER-CHNG-ARCHIVED-SITE",
          "INT-2026-07-14-NERMAN-AMERICA-NOW-HERE",
          "INT-2026-07-15-NTER-CHNG-INSTALLER-RUNBOOK",
          "INT-2026-07-15-NTER-CHNG-EXHIBIT-WORKING-DOCUMENT"
        ].every((id) => intakeItems.some((item) => item.id === id)) &&
        [...nterChngSourceIds, ...nterChngArtifactSourceIds].every((id) => {
          const reading = readingBySourceId.get(id);
          return sourceIds.has(id) && reading?.assertions.length && reading.limitations.length;
        }) &&
        inquiry?.resultStatus === "recovered" &&
        artifactInquiry?.resultStatus === "partially-recovered" &&
        promotedPairs.every(([candidateId, claimId]) => {
          const candidate = candidateById.get(candidateId);
          return candidate?.status === "promoted" && candidate.promotedClaimId === claimId;
        }) &&
        heldCandidateIds.every((candidateId) => {
          const candidate = candidateById.get(candidateId);
          return (
            candidate?.status === "research-needed" &&
            promotions.some(
              (promotion) =>
                promotion.candidateClaimId === candidateId &&
                promotion.decision === "held"
            )
          );
        }) &&
        contradictedOpening?.status === "contradicted" &&
        promotions.some(
          (promotion) =>
            promotion.candidateClaimId === contradictedOpening.id &&
            promotion.decision === "held"
        )
      );
    })()
  },
  {
    id: "nter-chng-collective-credit-and-evidence-boundaries",
    label: "NTER CHNG preserves direct exhibition evidence, all creator credits, and explicit anti-claims",
    pass: (() => {
      const projectClaim = knowledgeBank.claims.find(
        (item) => item.id === "CLM-NTER-CHNG-COLLABORATIVE-INSTALLATION"
      );
      const exhibitionClaim = knowledgeBank.claims.find(
        (item) => item.id === "CLM-NTER-CHNG-AMERICA-NOW-HERE-INCLUSION-2011"
      );
      const report = readFileSync(
        "docs/knowledge-bank/nter-chng-2026-07-14.md",
        "utf8"
      );
      const antiClaims = readFileSync(
        "docs/knowledge-bank/anti-claims.md",
        "utf8"
      );
      return Boolean(
        projectClaim?.internalClaim.includes("Drew Bolton") &&
        projectClaim.internalClaim.includes("Jamie Burkart") &&
        projectClaim.internalClaim.includes("Garrett Fuselier") &&
        projectClaim.evidence.some(
          (item) =>
            item.sourceId === "SRC-NTER-CHNG-ARCHIVED-PROJECT-SITE-2011" &&
            item.relationship === "direct-support"
        ) &&
        projectClaim.boundaries.some((item) => /division of .*labor|sole/i.test(item)) &&
        exhibitionClaim?.evidence.some(
          (item) =>
            item.sourceId === "SRC-AMERICA-NOW-HERE-NTER-CHNG-2011" &&
            item.relationship === "direct-support"
        ) &&
        /exhibition's own website/i.test(report) &&
        /unrecovered press release|press release.*not recovered/i.test(report) &&
        /NTER CHNG/i.test(antiClaims) &&
        /solely created.*designed.*programmed|independently.*complete/i.test(
          antiClaims
        ) &&
        /opening date|January 2011/i.test(antiClaims)
      );
    })()
  },
  {
    id: "nter-chng-protected-artifact-lineage",
    label: "NTER CHNG working artifacts have protected intake, source, reading, and inquiry lineage",
    pass: (() => {
      const artifactInquiry = knowledgeBank.researchInquiries.find(
        (item) => item.id === "INQ-NTER-CHNG-PROJECT-ARTIFACTS-2026"
      );
      const protectedIntakes = [
        "INT-2026-07-15-NTER-CHNG-INSTALLER-RUNBOOK",
        "INT-2026-07-15-NTER-CHNG-EXHIBIT-WORKING-DOCUMENT"
      ].map((id) => intakeItems.find((item) => item.id === id));
      return Boolean(
        protectedIntakes.every(
          (item) => item?.visibility === "protected" && !item.sourceUrl && item.protectedLocatorId
        ) &&
        nterChngArtifactSourceIds.every((id) => {
          const source = knowledgeBank.sources.find((item) => item.id === id);
          const reading = readingBySourceId.get(id);
          return (
            source?.visibility === "protected" &&
            source.preservationStatus === "private" &&
            source.protectedLocatorId &&
            !source.canonicalUrl &&
            !source.archiveUrl &&
            !source.assetUrl &&
            reading?.assertions.length &&
            reading.limitations.length
          );
        }) &&
        artifactInquiry?.sourceIds.every((id) => sourceIds.has(id)) &&
        artifactInquiry.limitations.some((item) => /phone numbers.*message text/i.test(item))
      );
    })()
  },
  {
    id: "nter-chng-chronology-correction-and-conflict",
    label: "NTER CHNG corrects the original chronology while preserving the closing-date conflict",
    pass: (() => {
      const chronologyClaim = knowledgeBank.claims.find(
        (item) => item.id === "CLM-NTER-CHNG-ORIGINAL-EXHIBITION-2010"
      );
      const closingCandidate = candidateById.get("CND-NTER-CHNG-EXACT-CLOSING-DATE");
      const report = readFileSync("docs/knowledge-bank/nter-chng-2026-07-14.md", "utf8");
      const antiClaims = readFileSync("docs/knowledge-bank/anti-claims.md", "utf8");
      return Boolean(
        chronologyClaim?.internalClaim.includes("January 2010") &&
        chronologyClaim.evidence.some(
          (item) =>
            item.sourceId === "SRC-NTER-CHNG-EXHIBIT-WORKING-DOCUMENT-2010-2011" &&
            item.relationship === "private-support"
        ) &&
        chronologyClaim.evidence.some(
          (item) =>
            item.sourceId === "SRC-NTER-CHNG-ARCHIVED-PROJECT-SITE-2011" &&
            item.relationship === "supports-boundary"
        ) &&
        closingCandidate?.status === "research-needed" &&
        promotions.some(
          (promotion) =>
            promotion.candidateClaimId === closingCandidate.id &&
            promotion.decision === "held"
        ) &&
        /January 29[\s\S]{0,180}January 24/i.test(report) &&
        /Do not say the original Cocoon Gallery presentation opened in January 2011/i.test(
          antiClaims
        )
      );
    })()
  },
  {
    id: "nter-chng-integrated-system-and-privacy-boundaries",
    label: "NTER CHNG preserves implementation depth without solo attribution or participant exposure",
    pass: (() => {
      const systemClaim = knowledgeBank.claims.find(
        (item) => item.id === "CLM-NTER-CHNG-INTEGRATED-INSTALLATION-SYSTEM-2011"
      );
      const report = readFileSync("docs/knowledge-bank/nter-chng-2026-07-14.md", "utf8");
      return Boolean(
        systemClaim?.internalClaim.includes("software refinement") &&
        systemClaim.internalClaim.includes("wall fabrication") &&
        systemClaim.boundaries.some((item) => /three-person collaboration|individual tasks/i.test(item)) &&
        systemClaim.antiClaims.some((item) => /independently built every part/i.test(item)) &&
        /software, hardware,[\s\S]{0,80}fabrication, and gallery-production workflow/i.test(
          report
        ) &&
        !publicRegistryText.includes("ARCHIVE-NTER-CHNG-INSTALLER-RUNBOOK") &&
        !publicRegistryText.includes("ARCHIVE-NTER-CHNG-EXHIBIT-WORKING-DOC") &&
        !publicRegistryText.includes("docs.google.com/document/d/")
      );
    })()
  },
  {
    id: "nter-chng-chad-editorial-restraint",
    label: "Chad's lens preserves NTER CHNG as useful depth without adding an unneeded public route",
    pass: (() => {
      const brief = editorialBriefs.find(
        (item) => item.id === "BRIEF-NTER-CHNG-EDITORIAL-2026"
      );
      const selectedClaims = [
        "CLM-NTER-CHNG-COLLABORATIVE-INSTALLATION",
        "CLM-NTER-CHNG-AMERICA-NOW-HERE-INCLUSION-2011",
        "CLM-NTER-CHNG-PARTICIPATORY-SYSTEM-THREAD",
        "CLM-NTER-CHNG-ORIGINAL-EXHIBITION-2010",
        "CLM-NTER-CHNG-INTEGRATED-INSTALLATION-SYSTEM-2011"
      ].map((id) => knowledgeBank.claims.find((claim) => claim.id === id));
      const report = readFileSync(
        "docs/knowledge-bank/nter-chng-2026-07-14.md",
        "utf8"
      );
      return Boolean(
        brief?.selectedClaimIds.length === 5 &&
        brief.heldCandidateClaimIds.includes(
          "CND-NTER-CHNG-SOLE-TECHNICAL-AUTHORSHIP"
        ) &&
        brief.heldCandidateClaimIds.includes(
          "CND-NTER-CHNG-EXACT-CLOSING-DATE"
        ) &&
        brief.rationale.some((item) => /no immediate website change/i.test(item)) &&
        selectedClaims.every(
          (claim) =>
            claim &&
            claim.projections.every(
              (projection) =>
                projection.key === "archive-note" &&
                projection.surfaces.every((surface) => !surface.startsWith("/"))
            )
        ) &&
        selectedClaims.every(
          (claim) => claim && !renderedProjectionSources.includes(claim.id)
        ) &&
        /There is no public NTER CHNG route, proofs route, knowledge-bank route/i.test(
          report
        ) &&
        !publicRegistryText.includes("RESEARCH-NTER-CHNG-WAYBACK-2026-001") &&
        !publicRegistryText.includes("RESEARCH-NTER-CHNG-PROJECT-ARTIFACTS-2026-001")
      );
    })()
  },
  {
    id: "kcth-phase-one-source-and-lifecycle-lineage",
    label: "KC Town Hall Phase One has separate proposal and firsthand source lineages with promoted and held claims",
    pass: (() => {
      const inquiry = knowledgeBank.researchInquiries.find(
        (item) => item.id === "INQ-KCTH-PHASE-ONE-DELIVERY-2026"
      );
      const promotedPairs = [
        [
          "CND-KCTH-PHASE-ONE-CONSTRUCTION-DELIVERY",
          "CLM-KCTH-PHASE-ONE-CONSTRUCTION-DELIVERY"
        ],
        [
          "CND-KCTH-NEIGHBORHOOD-SURVEY-SYSTEM",
          "CLM-KCTH-NEIGHBORHOOD-SURVEY-SYSTEM"
        ],
        [
          "CND-KCTH-PARTICIPATORY-CONSTRUCTION-PRACTICE",
          "CLM-KCTH-PARTICIPATORY-CONSTRUCTION-PRACTICE"
        ]
      ];
      const heldCandidateIds = [
        "CND-KCTH-LICENSED-GENERAL-CONTRACTOR-OF-RECORD",
        "CND-KCTH-NEIGHBORHOOD-APPRECIATION-OUTCOME"
      ];
      return Boolean(
        [
          "INT-2026-07-15-KCTH-PHASE-ONE-PROPOSAL",
          "INT-2026-07-15-KCTH-JAMIE-PHASE-ONE-CONFIRMATION"
        ].every((id) => intakeItems.some((item) => item.id === id)) &&
        kcTownHallPhaseOneSourceIds.every((id) => {
          const reading = readingBySourceId.get(id);
          return sourceIds.has(id) && reading?.assertions.length && reading.limitations.length;
        }) &&
        inquiry?.resultStatus === "partially-recovered" &&
        promotedPairs.every(([candidateId, claimId]) => {
          const candidate = candidateById.get(candidateId);
          return candidate?.status === "promoted" && candidate.promotedClaimId === claimId;
        }) &&
        heldCandidateIds.every((candidateId) => {
          const candidate = candidateById.get(candidateId);
          return (
            candidate?.status === "research-needed" &&
            promotions.some(
              (promotion) =>
                promotion.candidateClaimId === candidateId &&
                promotion.decision === "held"
            )
          );
        })
      );
    })()
  },
  {
    id: "kcth-phase-one-role-privacy-and-completion-boundaries",
    label: "KC Town Hall Phase One preserves functional-role, raw-proposal, and full-redevelopment boundaries",
    pass: (() => {
      const proposal = knowledgeBank.sources.find(
        (item) => item.id === "SRC-KCTH-PHASE-ONE-CCED-PROPOSAL-2019"
      );
      const confirmation = knowledgeBank.sources.find(
        (item) => item.id === "SRC-KCTH-JAMIE-PHASE-ONE-ROLE-CONFIRMATION-2026"
      );
      const deliveryClaim = knowledgeBank.claims.find(
        (item) => item.id === "CLM-KCTH-PHASE-ONE-CONSTRUCTION-DELIVERY"
      );
      const surveyClaim = knowledgeBank.claims.find(
        (item) => item.id === "CLM-KCTH-NEIGHBORHOOD-SURVEY-SYSTEM"
      );
      const report = readFileSync(
        "docs/knowledge-bank/kc-town-hall-phase-one-2026-07-15.md",
        "utf8"
      );
      const antiClaims = readFileSync(
        "docs/knowledge-bank/anti-claims.md",
        "utf8"
      );
      return Boolean(
        proposal?.visibility === "public-metadata-only" &&
        proposal.preservationStatus === "private" &&
        proposal.protectedLocatorId &&
        confirmation?.visibility === "public" &&
        deliveryClaim?.boundaries.some((item) => /licensure|permit-holder/i.test(item)) &&
        deliveryClaim.boundaries.some((item) => /Phase Two|full redevelopment/i.test(item)) &&
        surveyClaim?.boundaries.some((item) => /responses|contact/i.test(item)) &&
        /raw\s+PDF is not committed/i.test(report) &&
        /licensed general contractor|permit holder/i.test(antiClaims) &&
        /statistically representative/i.test(antiClaims) &&
        !publicRegistryText.includes("ARCHIVE-KCTH-PHASE-ONE-PROPOSAL-2019-001") &&
        !publicRegistryText.includes("RESEARCH-KCTH-PHASE-ONE-2026-001")
      );
    })()
  },
  {
    id: "kcth-phase-one-chad-public-projection",
    label: "Chad's lens makes the completed delivery and participation system visible without overstating the full project",
    pass: (() => {
      const brief = editorialBriefs.find(
        (item) => item.id === "BRIEF-KCTH-PHASE-ONE-EDITORIAL-2026"
      );
      const page = knowledgeBank.pages.find((item) => item.id === "kc-town-hall");
      const caseStudy = readFileSync(
        "apps/www/src/content/work/kc-town-hall.mdx",
        "utf8"
      );
      const workData = readFileSync("apps/www/src/data/work.ts", "utf8");
      const proofData = readFileSync("apps/www/src/data/proofs.ts", "utf8");
      const claimIds = [
        "CLM-KCTH-PHASE-ONE-CONSTRUCTION-DELIVERY",
        "CLM-KCTH-NEIGHBORHOOD-SURVEY-SYSTEM",
        "CLM-KCTH-PARTICIPATORY-CONSTRUCTION-PRACTICE"
      ];
      return Boolean(
        brief?.selectedClaimIds.length === 3 &&
        brief.heldCandidateClaimIds.includes(
          "CND-KCTH-LICENSED-GENERAL-CONTRACTOR-OF-RECORD"
        ) &&
        brief.heldCandidateClaimIds.includes(
          "CND-KCTH-NEIGHBORHOOD-APPRECIATION-OUTCOME"
        ) &&
        claimIds.every((id) =>
          page?.occurrences.some(
            (occurrence) => occurrence.claimId === id && occurrence.projection === "case-study"
          )
        ) &&
        claimIds.every((id) => renderedProjectionSources.includes(id)) &&
        /Founder \/ Project Manager \/ Phase One Construction Lead/.test(workData) &&
        /years: "2018-2021"/.test(workData) &&
        /kc-town-hall-phase-one-delivery/.test(proofData) &&
        /functional general-contractor role/.test(proofData) &&
        /completion of Phase Two.*completion of the full redevelopment/i.test(caseStudy) &&
        !/It does not claim[^.]*completed construction/i.test(caseStudy)
      );
    })()
  },
  {
    id: "east-kc-neighborhood-practice-lifecycle-lineage",
    label: "East Kansas City neighborhood practice has source readings, promoted reserve depth, and explicit research holds",
    pass: (() => {
      const intake = intakeItems.find(
        (item) => item.id === "INT-2026-07-15-EAST-KC-NEIGHBORHOOD-PRACTICE"
      );
      const inquiry = knowledgeBank.researchInquiries.find(
        (item) => item.id === "INQ-EAST-KC-NEIGHBORHOOD-PRACTICE-2026"
      );
      const promotedPairs = [
        [
          "CND-EAST-KC-TIRED-OF-TIRES-OPERATIONS",
          "CLM-EAST-KC-TIRED-OF-TIRES-OPERATIONS"
        ],
        [
          "CND-EAST-KC-FIELD-COMMUNICATIONS-PRACTICE",
          "CLM-EAST-KC-FIELD-COMMUNICATIONS-PRACTICE"
        ],
        [
          "CND-EAST-KC-CLEVELAND-AVE-DESIGN-PRACTICE",
          "CLM-EAST-KC-CLEVELAND-AVE-DESIGN-PRACTICE"
        ]
      ];
      const heldCandidateIds = [
        "CND-EAST-KC-INDIAN-MOUND-EXPANSION",
        "CND-EAST-KC-CLEVELAND-AVE-CAPITAL-INFLUENCE"
      ];
      return Boolean(
        intake?.status === "processed" &&
        intake.visibility === "public-safe" &&
        eastKcNeighborhoodPracticeSourceIds.every((id) => {
          const reading = readingBySourceId.get(id);
          return sourceIds.has(id) && reading?.assertions.length && reading.limitations.length;
        }) &&
        inquiry?.resultStatus === "partially-recovered" &&
        promotedPairs.every(([candidateId, claimId]) => {
          const candidate = candidateById.get(candidateId);
          return (
            candidate?.status === "promoted" &&
            candidate.promotedClaimId === claimId &&
            promotions.some(
              (promotion) =>
                promotion.candidateClaimId === candidateId &&
                promotion.claimId === claimId &&
                promotion.decision === "promoted"
            )
          );
        }) &&
        heldCandidateIds.every((candidateId) => {
          const candidate = candidateById.get(candidateId);
          return (
            candidate?.status === "research-needed" &&
            !candidate.promotedClaimId &&
            promotions.some(
              (promotion) =>
                promotion.candidateClaimId === candidateId &&
                promotion.decision === "held"
            )
          );
        })
      );
    })()
  },
  {
    id: "east-kc-tired-of-tires-role-and-collective-credit",
    label: "Tired of Tires makes Jamie's initial operating role visible while preserving collective credit and later-operator boundaries",
    pass: (() => {
      const claim = knowledgeBank.claims.find(
        (item) => item.id === "CLM-EAST-KC-TIRED-OF-TIRES-OPERATIONS"
      );
      const page = knowledgeBank.pages.find((item) => item.id === "kc-town-hall");
      const occurrence = page?.occurrences.find(
        (item) => item.id === "tired-of-tires-operations"
      );
      const caseStudy = readFileSync(
        "apps/www/src/content/work/kc-town-hall.mdx",
        "utf8"
      );
      const workData = readFileSync("apps/www/src/data/work.ts", "utf8");
      const proofData = readFileSync("apps/www/src/data/proofs.ts", "utf8");
      return Boolean(
        claim?.status === "confirmed-with-boundary" &&
        claim.evidence.some(
          (item) =>
            item.sourceId ===
              "SRC-JAMIE-EAST-KC-NEIGHBORHOOD-PRACTICE-CONFIRMATION-2026" &&
            item.relationship === "direct-support"
        ) &&
        claim.evidence.some(
          (item) =>
            item.sourceId === "SRC-KCTH-TIRES-ARCHIVED-PAGE-2021" &&
            item.relationship === "corroborating"
        ) &&
        claim.boundaries.some((item) => /Julia and Jamie|collective/i.test(item)) &&
        claim.boundaries.some((item) => /through 2022|every operation|later/i.test(item)) &&
        claim.boundaries.some((item) => /municipal ownership|City coordination/i.test(item)) &&
        occurrence?.claimId === claim.id &&
        occurrence.sourceIds?.includes(
          "SRC-JAMIE-EAST-KC-NEIGHBORHOOD-PRACTICE-CONFIRMATION-2026"
        ) &&
        occurrence.sourceIds?.includes("SRC-KCTH-TIRES-ARCHIVED-PAGE-2021") &&
        /CLM-EAST-KC-TIRED-OF-TIRES-OPERATIONS/.test(caseStudy) &&
        /kc-town-hall-neighborhood-service-operations/.test(workData) &&
        /intake.*routing.*partner coordination.*field execution.*handoff.*measurement.*public follow-through/i.test(
          proofData
        )
      );
    })()
  },
  {
    id: "east-kc-cleveland-indian-mound-and-capital-boundaries",
    label: "Cleveland Avenue credit, Indian Mound status, and capital causality remain proposition-specific",
    pass: (() => {
      const clevelandClaim = knowledgeBank.claims.find(
        (item) => item.id === "CLM-EAST-KC-CLEVELAND-AVE-DESIGN-PRACTICE"
      );
      const indianMound = candidateById.get("CND-EAST-KC-INDIAN-MOUND-EXPANSION");
      const capital = candidateById.get(
        "CND-EAST-KC-CLEVELAND-AVE-CAPITAL-INFLUENCE"
      );
      const henc = knowledgeBank.sources.find(
        (item) => item.id === "SRC-HENC-STRATEGIC-PLAN-2024"
      );
      const report = readFileSync(
        "docs/knowledge-bank/kc-town-hall-neighborhood-practice-2026-07-15.md",
        "utf8"
      );
      const antiClaims = readFileSync("docs/knowledge-bank/anti-claims.md", "utf8");
      return Boolean(
        clevelandClaim?.status === "use-with-care" &&
        clevelandClaim.projections.every((item) =>
          item.surfaces.every((surface) => !surface.startsWith("/"))
        ) &&
        clevelandClaim.boundaries.some((item) => /Pastor Lee/i.test(item)) &&
        clevelandClaim.antiClaims.some((item) => /capital allocation/i.test(item)) &&
        indianMound?.status === "research-needed" &&
        capital?.status === "research-needed" &&
        henc?.doesNotEstablish.some((item) => /Jamie's individual|specific capital/i.test(item)) &&
        /Indian Mound.*No dated.*recovered/is.test(report) &&
        /No proposition-level record was recovered/is.test(report) &&
        /Credit Pastor Lee.*corridor concept/is.test(antiClaims)
      );
    })()
  },
  {
    id: "east-kc-neighborhood-practice-public-safety",
    label: "Neighborhood practice preserves resident, operational, and protected-source boundaries",
    pass: (() => {
      const report = readFileSync(
        "docs/knowledge-bank/kc-town-hall-neighborhood-practice-2026-07-15.md",
        "utf8"
      );
      const antiClaims = readFileSync("docs/knowledge-bank/anti-claims.md", "utf8");
      return Boolean(
        /resident addresses, phone numbers, contact forms, or route details/i.test(report) &&
        /raw survey responses or contact records/i.test(report) &&
        /raw operational spreadsheets/i.test(report) &&
        /unapproved photographs/i.test(report) &&
        /large print runs.*exact handbill total/is.test(antiClaims) &&
        !publicRegistryText.includes("RESEARCH-EAST-KC-NEIGHBORHOOD-PRACTICE-2026-001") &&
        !publicRegistryText.includes("CND-EAST-KC-INDIAN-MOUND-EXPANSION") &&
        !publicRegistryText.includes("CND-EAST-KC-CLEVELAND-AVE-CAPITAL-INFLUENCE")
      );
    })()
  },
  {
    id: "teams-archival-deepening-lineage",
    label: "All three Teams collections have bounded intake, source readings, promotions, and explicit holds",
    pass: (() => {
      const inquiry = knowledgeBank.researchInquiries.find(
        (item) => item.id === "INQ-TEAMS-ARCHIVAL-DEEPENING-2026"
      );
      const promotedPairs = [
        [
          "CND-CRS-90-DAY-OPERATING-PLAN",
          "CLM-CRS-90-DAY-OPERATING-PLAN"
        ],
        [
          "CND-CLAUDETTE-AR-COLLABORATION-2022",
          "CLM-CLAUDETTE-AR-COLLABORATION-2022"
        ]
      ];
      const heldCandidates = [
        "CND-CRS-90-DAY-PLAN-COMPLETION",
        "CND-CLAUDETTE-SOLO-TECHNICAL-AUTHORSHIP"
      ];
      return Boolean(
        teamsArchivalDeepeningIntakeIds.every((id) => {
          const item = intakeItems.find((candidate) => candidate.id === id);
          return (
            item?.visibility === "protected" &&
            item.status === "processed" &&
            item.protectedLocatorId &&
            item.linkedRecordIds.includes("INQ-TEAMS-ARCHIVAL-DEEPENING-2026")
          );
        }) &&
        teamsArchivalDeepeningSourceIds.every((id) => {
          const reading = readingBySourceId.get(id);
          return sourceIds.has(id) && reading?.assertions.length >= 2 && reading.limitations.length;
        }) &&
        inquiry?.resultStatus === "partially-recovered" &&
        promotedPairs.every(([candidateId, claimId]) => {
          const candidate = candidateById.get(candidateId);
          return (
            candidate?.status === "promoted" &&
            candidate.promotedClaimId === claimId &&
            promotions.some(
              (promotion) =>
                promotion.candidateClaimId === candidateId &&
                promotion.claimId === claimId &&
                promotion.decision === "promoted"
            )
          );
        }) &&
        heldCandidates.every((candidateId) => {
          const candidate = candidateById.get(candidateId);
          return (
            candidate?.status === "research-needed" &&
            !candidate.promotedClaimId &&
            promotions.some(
              (promotion) =>
                promotion.candidateClaimId === candidateId &&
                promotion.decision === "held"
            )
          );
        })
      );
    })()
  },
  {
    id: "crs-90-day-plan-hiring-projection",
    label: "The Fair Rent operating plan projects specific hiring proof without becoming a completion claim",
    pass: (() => {
      const claim = knowledgeBank.claims.find(
        (item) => item.id === "CLM-CRS-90-DAY-OPERATING-PLAN"
      );
      const page = knowledgeBank.pages.find((item) => item.id === "fair-rent-nyc");
      const occurrence = page?.occurrences.find(
        (item) => item.id === "crs-90-day-operating-plan"
      );
      const proofData = readFileSync("apps/www/src/data/proofs.ts", "utf8");
      return Boolean(
        claim?.status === "confirmed-with-boundary" &&
        claim.evidence.some(
          (item) =>
            item.sourceId === "SRC-CRS-90-DAY-OPERATING-PLAN-2026" &&
            item.relationship === "private-support" &&
            item.renderCitation === false
        ) &&
        claim.projections.some(
          (item) =>
            item.key === "case-study" &&
            item.surfaces.includes("/work/fair-rent-nyc") &&
            /sequenced 90-day.*operating plan/i.test(item.text)
        ) &&
        claim.projections.some(
          (item) =>
            item.key === "technical-operations" &&
            item.surfaces.includes("/work/technical-operations")
        ) &&
        claim.boundaries.some((item) => /completion|completed/i.test(item)) &&
        claim.boundaries.some((item) => /collective|movement|coalition/i.test(item)) &&
        occurrence?.claimId === claim.id &&
        !occurrence.sourceIds &&
        renderedProjectionSources.includes(claim.id) &&
        /fair-rent-90-day-operating-plan/.test(proofData) &&
        /concrete deliverables, success conditions, consent boundaries, and decision infrastructure/.test(
          proofData
        )
      );
    })()
  },
  {
    id: "claudette-collective-credit-and-reserve",
    label: "Claudette preserves collective technical credit as bank depth while solo authorship remains held",
    pass: (() => {
      const claim = knowledgeBank.claims.find(
        (item) => item.id === "CLM-CLAUDETTE-AR-COLLABORATION-2022"
      );
      const soloCandidate = candidateById.get(
        "CND-CLAUDETTE-SOLO-TECHNICAL-AUTHORSHIP"
      );
      return Boolean(
        claim?.status === "confirmed-with-boundary" &&
        claim.projections.every((projection) =>
          projection.surfaces.every((surface) => !surface.startsWith("/"))
        ) &&
        claim.evidence.some(
          (item) =>
            item.sourceId === "SRC-CLAUDETTE-MICHAEL-REES-2022" &&
            item.relationship === "direct-support"
        ) &&
        claim.evidence.some(
          (item) =>
            item.sourceId === "SRC-CLAUDETTE-IMPLEMENTATION-HANDOFF-2022" &&
            item.relationship === "private-support" &&
            item.renderCitation === false
        ) &&
        claim.boundaries.some((item) => /Michael Rees/i.test(item)) &&
        claim.boundaries.some((item) => /sole authorship|Do not assign Jamie sole/i.test(item)) &&
        soloCandidate?.status === "research-needed" &&
        !soloCandidate.promotedClaimId &&
        !renderedProjectionSources.includes(claim.id)
      );
    })()
  },
  {
    id: "teams-archival-deepening-public-safety",
    label: "The bounded pass records incomplete access, protected exclusions, and resume-parity limits",
    pass: (() => {
      const report = readFileSync(
        "docs/knowledge-bank/teams-archival-deepening-2026-07-15.md",
        "utf8"
      );
      const resumeSource = knowledgeBank.sources.find(
        (item) => item.id === "SRC-JOB-HUNT-RESUME-PARITY-2026"
      );
      return Boolean(
        /signed[- ]out/i.test(report) &&
        /not an exhaustive semantic review|not.*every\s+file/is.test(report) &&
        /private correspondence|stakeholder names|outreach lists/i.test(report) &&
        resumeSource?.doesNotEstablish.some((item) => /truth|verification.*claim/i.test(item)) &&
        resumeSource?.doesNotEstablish.some((item) => /future|replacement|point-in-time/i.test(item)) &&
        !publicRegistryText.includes("ARCHIVE-CLAUDETTE-IMPLEMENTATION-HANDOFF-2022-001") &&
        !publicRegistryText.includes("ARCHIVE-CRS-90-DAY-OPERATING-PLAN-2026-001") &&
        !publicRegistryText.includes("d1e45343efd1e4125fb258514c70ce8101505b8400de3ccb1d30a8389d58fd8c")
      );
    })()
  },
  {
    id: "archival-scale-and-lineage-intake",
    label: "WOWList, Sunday Dinner, and Call Script evidence completes the intake and atomic-reading path",
    pass: (() => {
      const inquiryIds = [
        "INQ-WOWLIST-DATABASE-AGGREGATE-AUDIT-2026",
        "INQ-SUNDAY-DINNER-WORKBOOK-STRUCTURAL-AUDIT-2026",
        "INQ-CALLSCRIPT-POPULAR-VOTE-NYCAC-LINEAGE-2026"
      ];
      return Boolean(
        archivalScaleAndLineageIntakeIds.every((id) => {
          const intake = intakeItems.find((item) => item.id === id);
          return intake?.status === "processed" && intake.linkedRecordIds.length >= 5;
        }) &&
        archivalScaleAndLineageSourceIds.every((id) => {
          const reading = readingBySourceId.get(id);
          return sourceIds.has(id) && reading?.assertions.length >= 2 && reading.limitations.length;
        }) &&
        inquiryIds.every((id) => {
          const inquiry = knowledgeBank.researchInquiries.find((item) => item.id === id);
          return inquiry && inquiry.findings.length >= 4 && inquiry.limitations.length >= 3;
        })
      );
    })()
  },
  {
    id: "wowlist-database-production-scale",
    label: "WOWList production scale is promoted with a thresholded geography claim and no chapter inflation",
    pass: (() => {
      const candidate = candidateById.get("CND-WOWLIST-ARCHIVED-PRODUCTION-SCALE");
      const rejected = candidateById.get("CND-WOWLIST-OFFICIAL-CITY-CHAPTERS");
      const claim = knowledgeBank.claims.find(
        (item) => item.id === "CLM-WOWLIST-ARCHIVED-PRODUCTION-SCALE"
      );
      const report = readFileSync(
        "docs/knowledge-bank/wowlist-sunday-dinner-callscript-2026-07-15.md",
        "utf8"
      );
      return Boolean(
        candidate?.status === "promoted" &&
        candidate.promotedClaimId === claim?.id &&
        claim?.status === "confirmed-with-boundary" &&
        claim.projections.some(
          (item) =>
            item.key === "case-study" &&
            item.surfaces.includes("/work/wowlist") &&
            /1,846 users.*16,142 posts\/events/is.test(item.text) &&
            /(?:Thirty-five|35) city labels.*at least 50/i.test(item.text)
        ) &&
        claim.boundaries.some((item) => /not as official chapters/i.test(item)) &&
        renderedProjectionSources.includes(claim.id) &&
        rejected?.status === "contradicted" &&
        promotions.some(
          (item) =>
            item.candidateClaimId === rejected.id && item.decision === "rejected"
        ) &&
        /35 city labels with at least 50/i.test(report) &&
        /not evidence of 35 official chapters/i.test(report)
      );
    })()
  },
  {
    id: "sunday-dinner-longitudinal-participation-system",
    label: "Sunday Dinner projects the operating system while holding person-level and attendance claims",
    pass: (() => {
      const candidate = candidateById.get(
        "CND-SUNDAY-DINNER-LONGITUDINAL-PARTICIPATION-SYSTEM"
      );
      const attendeeTotal = candidateById.get("CND-SUNDAY-DINNER-PUBLIC-ATTENDEE-TOTAL");
      const claim = knowledgeBank.claims.find(
        (item) => item.id === "CLM-SUNDAY-DINNER-LONGITUDINAL-PARTICIPATION-SYSTEM"
      );
      const report = readFileSync(
        "docs/knowledge-bank/wowlist-sunday-dinner-callscript-2026-07-15.md",
        "utf8"
      );
      return Boolean(
        candidate?.status === "promoted" &&
        candidate.promotedClaimId === claim?.id &&
        claim?.status === "confirmed-with-boundary" &&
        claim.projections.some(
          (item) =>
            item.key === "case-study" &&
            item.surfaces.includes("/work/196-sunday-dinner") &&
            /17-sheet workbook/i.test(item.text) &&
            /numbered gatherings, invitations, responses, attendance logic, themes, hosts/i.test(
              item.text
            )
        ) &&
        renderedProjectionSources.includes(claim.id) &&
        attendeeTotal?.status === "research-needed" &&
        !attendeeTotal.promotedClaimId &&
        promotions.some(
          (item) =>
            item.candidateClaimId === attendeeTotal.id && item.decision === "held"
        ) &&
        /300\+ gatherings.*not 340 unique verified events/is.test(report) &&
        /not a public attendance database/i.test(report)
      );
    })()
  },
  {
    id: "callscript-popular-vote-nycac-lineage",
    label: "Call Script lineage preserves Jamie's agency, collective formation credit, and bank-only placement",
    pass: (() => {
      const candidate = candidateById.get("CND-CALLSCRIPT-POPULAR-VOTE-NYCAC-LINEAGE");
      const inflated = candidateById.get("CND-CALLSCRIPT-REACH-ATTENDANCE-SOLE-FOUNDING");
      const claim = knowledgeBank.claims.find(
        (item) => item.id === "CLM-CALLSCRIPT-POPULAR-VOTE-NYCAC-LINEAGE"
      );
      const report = readFileSync(
        "docs/knowledge-bank/wowlist-sunday-dinner-callscript-2026-07-15.md",
        "utf8"
      );
      const antiClaims = readFileSync("docs/knowledge-bank/anti-claims.md", "utf8");
      return Boolean(
        candidate?.status === "promoted" &&
        candidate.promotedClaimId === claim?.id &&
        claim?.status === "confirmed-with-boundary" &&
        claim.projections.every((item) =>
          item.surfaces.every((surface) => !surface.startsWith("/"))
        ) &&
        !renderedProjectionSources.includes(claim.id) &&
        claim.boundaries.some((item) => /collective|collaborator and participant agency/i.test(item)) &&
        inflated?.status === "contradicted" &&
        promotions.some(
          (item) =>
            item.candidateClaimId === inflated.id && item.decision === "rejected"
        ) &&
        /popular\.vote.*participatory naming.*continued coalition convening/is.test(report) &&
        /does not establish.*Jamie alone founded/is.test(antiClaims)
      );
    })()
  },
  {
    id: "archival-scale-and-lineage-public-safety",
    label: "Protected databases and participation records stay aggregate-only and locator-free",
    pass: (() => {
      const report = readFileSync(
        "docs/knowledge-bank/wowlist-sunday-dinner-callscript-2026-07-15.md",
        "utf8"
      );
      const protectedLocatorIds = [
        "ARCHIVE-WOWLIST-DATABASE-SNAPSHOTS-2016-2017-001",
        "RESEARCH-WOWLIST-DATABASE-AUDIT-2026-001",
        "ARCHIVE-SUNDAY-DINNER-PARTICIPATION-WORKBOOK-2012-2021-001",
        "RESEARCH-SUNDAY-DINNER-WORKBOOK-AUDIT-2026-001",
        "RESEARCH-CALLSCRIPT-NYCAC-LINEAGE-2026-001"
      ];
      return Boolean(
        /Do not publish raw database rows/i.test(report) &&
        /participant names, phone numbers, email addresses/i.test(report) &&
        !/\/Volumes\/|\/Users\//.test(report) &&
        protectedLocatorIds.every((id) => !publicRegistryText.includes(id))
      );
    })()
  },
  {
    id: "social-identity-collective-authorship",
    label: "Identity-system authorship is visible while post authorship remains collective",
    pass: (() => {
      const identity = candidateById.get("CND-NYCAC-PUBLIC-IDENTITY-SYSTEM");
      const namedStewardship = candidateById.get(
        "CND-NYCAC-NAMED-COLLABORATOR-SOCIAL-STEWARDSHIP"
      );
      const claim = knowledgeBank.claims.find(
        (item) => item.id === "CLM-NYCAC-PUBLIC-IDENTITY-SYSTEM"
      );
      return Boolean(
        identity?.status === "promoted" &&
        claim?.boundaries.some((item) => /individual authorship|every post/i.test(item)) &&
        namedStewardship?.status === "research-needed" &&
        promotions.some(
          (promotion) =>
            promotion.candidateClaimId === namedStewardship.id && promotion.decision === "held"
        )
      );
    })()
  }
];

const passed = criteria.filter((criterion) => criterion.pass).length;

console.log(`Knowledge lifecycle eval: ${passed}/${criteria.length}`);
for (const criterion of criteria) {
  console.log(`${criterion.pass ? "PASS" : "FAIL"} ${criterion.id}: ${criterion.label}`);
}

if (passed !== criteria.length) {
  console.error(
    "Knowledge lifecycle criterion not met. Continue the intake, research, promotion, and editorial loop."
  );
  process.exit(1);
}

console.log("Knowledge lifecycle criterion met.");
