import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import {
  participationContinuityClaimIds,
  participationContinuitySourceIds
} from "../../apps/www/src/data/knowledge-bank/participation-continuity-2026-07.ts";
import { proofCoverageTargets } from "../../apps/www/src/data/knowledge-bank/proof-coverage.ts";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

function read(relativePath) {
  return readFileSync(path.join(repoRoot, relativePath), "utf8");
}

function readJson(relativePath) {
  return JSON.parse(read(relativePath));
}

function equal(actual, expected) {
  return JSON.stringify(actual) === JSON.stringify(expected);
}

function includesAll(value, fragments) {
  return fragments.every((fragment) => value.includes(fragment));
}

function objectKeys(value, found = []) {
  if (Array.isArray(value)) {
    for (const item of value) objectKeys(item, found);
  } else if (value && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) {
      found.push(key);
      objectKeys(item, found);
    }
  }
  return found;
}

const expectedDatabaseCounts = {
  users: 1846,
  signupRecords: 818,
  postsEvents: 16142,
  tagsLists: 23864,
  postTagLinks: 45562,
  listFollows: 28837,
  userFollows: 146,
  savedStarredEvents: 20927,
  goingRecords: 2965,
  mentions: 337,
  activityActions: 92114,
  geolocationRows: 25938,
  googleCalendarEvents: 15915,
  postCalendarEventLinks: 15875,
  socialAuthRows: 1175,
  emailSettingsRows: 1836
};

const expectedGeography = {
  cityRegionCountryKeysAtLeast50Posts: 35,
  cityRegionCountryKeysAtLeast25Posts: 48,
  cityRegionCountryKeysAtLeast10Posts: 79,
  cityRegionCountryKeysAtLeast5Posts: 133,
  cityRegionCountryKeysAtLeast1Post: 709
};

const expectedOrganizerIdentities = [
  "NYC Artist Coalition",
  "Call Script",
  "New York City Department of Cultural Affairs"
];

const forbiddenPublicKey = /^(participants?|participantRows|directIdentifiers|names|emails|phoneNumbers|contacts|rawRows|rawRecords|rawBodies|commentIdentities|authenticatedUrls)$/i;
const privateStringPattern = /(?:\/Volumes\/|\/Users\/|docs\.google\.com\/spreadsheets|[?&](?:__cft__|access_token|session|auth)=|\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b|\b\d{3}[-.) ]\d{3}[-. ]\d{4}\b)/i;
const inflatedProjectionPattern = /(?:single-handedly founded|sole founder|Call Script alone created|445 people attended|10,000 unique people|2,780 unique attendees|official chapters|current active users|proved policy impact|caused the coalition|authored every Call Script)/i;

export function evaluateParticipationContinuity(overrides = {}) {
  const controls = overrides.controls ?? readJson(
    "docs/knowledge-bank/data/wowlist-sunday-dinner-callscript-controls.json"
  );
  const sources = overrides.sources ?? knowledgeBank.sources;
  const claims = overrides.claims ?? knowledgeBank.claims;
  const coverage = overrides.proofCoverageTargets ?? proofCoverageTargets;
  const wowMdx = overrides.wowMdx ?? read("apps/www/src/content/work/wowlist.mdx");
  const sundayMdx = overrides.sundayMdx ?? read("apps/www/src/content/work/196-sunday-dinner.mdx");
  const recordsSource = overrides.recordsSource ?? read("apps/www/src/data/knowledge-bank/records.ts");
  const moduleSource = overrides.moduleSource ?? read("apps/www/src/data/knowledge-bank/participation-continuity-2026-07.ts");
  const projectReport = overrides.projectReport ?? read("docs/knowledge-bank/projects/wowlist-sunday-dinner-callscript-continuity.md");
  const intakeReceipt = overrides.intakeReceipt ?? read("docs/knowledge-bank/intake/2026-07-15-wowlist-sunday-dinner-callscript.md");
  const criteria = [];

  function check(id, description, points, pass, evidence) {
    criteria.push({ id, description, points, pass: Boolean(pass), evidence });
  }

  const database = controls.wowListProductionSnapshot ?? {};
  check(
    "PARTICIPATION-WOWLIST-DATABASE",
    "The July 2017 production counts reproduce exactly at the historical-snapshot boundary",
    18,
    database.snapshotDate === "2017-07-22" &&
      database.snapshotFormat === "PostgreSQL custom dump" &&
      equal(database.counts, expectedDatabaseCounts) &&
      includesAll((database.boundaries ?? []).join(" "), [
        "not current active-user",
        "raw database",
        "not a complete product archive"
      ]),
    "Selected table counts are hard-coded independently of editable approval values."
  );

  check(
    "PARTICIPATION-WOWLIST-GEOGRAPHY",
    "The conservative city-region-country thresholds reproduce without becoming chapter or ownership claims",
    10,
    equal(database.geography, expectedGeography) &&
      (database.boundaries ?? []).some((item) => item.includes("not official chapters")),
    "The 35-key claim is fixed to at least 50 posts per city-region-country key."
  );

  const matrix = controls.sundayDinnerAttendanceMatrix ?? {};
  const eventNumbers = matrix.eventNumberRange ?? {};
  check(
    "PARTICIPATION-SUNDAY-DINNER-AGGREGATE",
    "The protected workbook corroborates 300-plus gatherings through bounded aggregate structure",
    16,
    matrix.eventLabeledColumns === 346 &&
      eventNumbers.minimum === 1 &&
      eventNumbers.maximum === 345 &&
      eventNumbers.uniqueNumbers === 341 &&
      equal(eventNumbers.missingNumbers, [233, 279, 288, 292]) &&
      equal(eventNumbers.duplicateNumberCounts, { "263": 2, "264": 3, "267": 2, "268": 2 }) &&
      matrix.eventColumnsWithAtLeastOneExplicitAffirmativeMark === 342 &&
      matrix.explicitAffirmativeMarks === 2780,
    "Event-column, numbering-quality, and explicit-mark controls are all independently fixed."
  );

  check(
    "PARTICIPATION-SUNDAY-DINNER-PRIVACY",
    "The attendance source remains aggregate-only and cannot become a participant or consent claim",
    14,
    matrix.participantRowsCopiedToRepository === 0 &&
      matrix.directIdentifiersCopiedToRepository === 0 &&
      includesAll((matrix.boundaries ?? []).join(" "), [
        "not a unique person",
        "not a complete lifetime census",
        "stay outside the public repository"
      ]),
    "Zero participant rows and zero direct identifiers are required."
  );

  const continuity = controls.callScriptContinuity ?? {};
  const event = continuity.dclaEvent ?? {};
  check(
    "PARTICIPATION-CALLSCRIPT-PUBLIC-RECORD",
    "The popular.vote, DCLA event, naming poll, letter action, and next-meeting chronology reproduces",
    18,
    continuity.wowListPopularVoteRoute?.publishedAt === "2016-11-14" &&
      continuity.wowListPopularVoteRoute?.route === "http://popular.vote" &&
      equal(continuity.wowListPopularVoteRoute?.displayedInteractionsAtReview, { likes: 2, comments: 0, shares: 6 }) &&
      continuity.callScriptPage?.url === "https://www.facebook.com/callscript" &&
      continuity.callScriptPage?.publicProjectLink === "http://popular.vote/" &&
      event.date === "2017-01-27" &&
      event.displayedResponseLabel === "people responded" &&
      event.displayedResponseCountAtReview === 445 &&
      equal(event.displayedOrganizerIdentities, expectedOrganizerIdentities) &&
      event.callScriptNamingPoll?.displayedLeadingOption === "NYC Artist Coalition" &&
      event.callScriptNamingPoll?.displayedLeadingPercentage === 57 &&
      event.callScriptNamingPoll?.voteCountRecovered === false &&
      event.callScriptSelfReportedTraction?.peopleReachedMoreThan === 10000 &&
      event.callScriptSelfReportedTraction?.goingMoreThan === 100 &&
      event.callScriptSelfReportedTraction?.independentlyAudited === false &&
      event.additionalPublicAction?.includes("read, edit, and sign") &&
      continuity.jamieEventPromotion?.publishedAt === "2017-01-25" &&
      continuity.nextCoalitionMeeting?.date === "2017-03-06",
    "The continuity claim retains source roles, dates, display labels, and self-report status."
  );

  const sourceById = new Map(sources.map((source) => [source.id, source]));
  const protectedSources = [
    participationContinuitySourceIds.wowDatabase,
    participationContinuitySourceIds.sundayDinnerMatrix,
    participationContinuitySourceIds.jamieMemory
  ];
  const publicSources = [
    participationContinuitySourceIds.controls,
    participationContinuitySourceIds.callScriptPage,
    participationContinuitySourceIds.dclaEventDiscussion,
    participationContinuitySourceIds.jamieEventPost
  ];
  check(
    "PARTICIPATION-SOURCE-GOVERNANCE",
    "Protected and public sources retain distinct URL, visibility, and evidentiary roles",
    10,
    protectedSources.every((id) => {
      const source = sourceById.get(id);
      return source?.visibility === "protected" &&
        source?.preservationStatus === "private" &&
        !source?.canonicalUrl &&
        Boolean(source?.protectedLocatorId);
    }) &&
      publicSources.every((id) => {
        const source = sourceById.get(id);
        return source?.visibility === "public" && Boolean(source?.canonicalUrl);
      }),
    "Private database, workbook, and memory sources expose no underlying URL."
  );

  const claimById = new Map(claims.map((claim) => [claim.id, claim]));
  const selectedClaims = Object.values(participationContinuityClaimIds).map((id) => claimById.get(id));
  const activeProjectionText = selectedClaims
    .flatMap((claim) => claim?.projections ?? [])
    .filter((projection) => projection.status === "active")
    .map((projection) => projection.text)
    .join(" ");
  const continuityClaim = claimById.get(participationContinuityClaimIds.callScriptContinuity);
  const wowClaim = claimById.get(participationContinuityClaimIds.wowScale);
  const sundayClaim = claimById.get(participationContinuityClaimIds.sundayDinnerScale);
  check(
    "PARTICIPATION-CLAIM-SEMANTICS",
    "Active projections are source-backed, selective, collectively credited, and resistant to causal inflation",
    8,
    selectedClaims.every((claim) => claim?.status === "confirmed-with-boundary" &&
      claim.projections.some((projection) => projection.status === "active" && projection.citationRequired)) &&
      continuityClaim?.internalClaim.includes("one bridge") &&
      continuityClaim?.projections[0]?.text.includes("supports Jamie's account") &&
      continuityClaim?.antiClaims.includes("Jamie single-handedly founded NYC Artist Coalition") &&
      wowClaim?.boundaries.some((item) => item.includes("Richard Caceres")) &&
      sundayClaim?.antiClaims.includes("2,780 unique attendees") &&
      !inflatedProjectionPattern.test(activeProjectionText),
    "Sole credit, attendance inflation, current-product inflation, and policy causation are rejected."
  );

  const coverageById = new Map(coverage.map((item) => [item.proofId, item]));
  const wowCoverage = coverageById.get("wowlist-community-platform");
  const sundayCoverage = coverageById.get("sunday-dinner-196-participation-infrastructure");
  const siteWiringPass =
    includesAll(wowMdx, [
      'claimId="CLM-WOWLIST-PRODUCTION-SCALE-2017"',
      'occurrenceId="production-scale"',
      'claimId="CLM-CALLSCRIPT-WOWLIST-NYCAC-CONTINUITY-2017"',
      'occurrenceId="callscript-participation-continuity"'
    ]) &&
    includesAll(sundayMdx, [
      'claimId="CLM-SUNDAY-DINNER-300-PLUS-CORROBORATION"',
      'occurrenceId="protected-attendance-corroboration"'
    ]) &&
    includesAll(recordsSource, [
      'id: "production-scale"',
      'id: "callscript-participation-continuity"',
      'id: "protected-attendance-corroboration"'
    ]) &&
    wowCoverage?.status === "source-backed" &&
    wowCoverage.sourceIds.includes(participationContinuitySourceIds.wowDatabase) &&
    wowCoverage.sourceIds.includes(participationContinuitySourceIds.dclaEventDiscussion) &&
    sundayCoverage?.sourceIds.includes(participationContinuitySourceIds.sundayDinnerMatrix);
  check(
    "PARTICIPATION-PROJECTION-WIRING",
    "The website projects the three matured claims through governed occurrences and updated proof coverage",
    4,
    siteWiringPass,
    "The WOW List and Sunday Dinner pages use Claim components rather than ungoverned scale prose."
  );

  const publicCorpus = JSON.stringify(controls) + "\n" + moduleSource + "\n" + projectReport + "\n" + intakeReceipt;
  const forbiddenKeys = objectKeys(controls).filter((key) => forbiddenPublicKey.test(key));
  const privatePatternDetected = privateStringPattern.test(publicCorpus);
  const normalizedProjectReport = projectReport.replace(/\s+/g, " ");
  const reportBoundariesPresent = includesAll(normalizedProjectReport, [
    "not a public attendance database",
    "not current active users",
    "not a legal founding vote",
    "do not establish attendance"
  ]);
  const intakeBoundariesPresent = includesAll(intakeReceipt, ["zero participant rows", "collective"]);
  check(
    "PARTICIPATION-PUBLIC-SAFETY",
    "Public artifacts contain aggregates and public-source identities but no private rows, locators, or direct identifiers",
    2,
    forbiddenKeys.length === 0 &&
      !privatePatternDetected &&
      reportBoundariesPresent &&
      intakeBoundariesPresent,
    `A privacy scan covers controls, governed records, intake, and project interpretation (forbidden keys: ${forbiddenKeys.length}; private pattern: ${privatePatternDetected}; report boundaries: ${reportBoundariesPresent}; intake boundaries: ${intakeBoundariesPresent}).`
  );

  const passedPoints = criteria
    .filter((criterion) => criterion.pass)
    .reduce((sum, criterion) => sum + criterion.points, 0);
  const totalPoints = criteria.reduce((sum, criterion) => sum + criterion.points, 0);

  return {
    pass: criteria.every((criterion) => criterion.pass),
    passedPoints,
    totalPoints,
    criteria
  };
}
