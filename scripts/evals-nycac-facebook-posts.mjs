#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { knowledgeBank } from "../apps/www/src/data/knowledge-bank/records.ts";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fixturePath =
  "apps/www/src/data/knowledge-bank/fixtures/nycartc-facebook-posts-full-population.json";

function read(relativePath) {
  return readFileSync(path.join(repoRoot, relativePath), "utf8");
}

function includesAll(source, values) {
  return values.every((value) => source.includes(value));
}

function allObjectKeys(value, result = []) {
  if (Array.isArray(value)) {
    for (const item of value) allObjectKeys(item, result);
  } else if (value && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) {
      result.push(key);
      allObjectKeys(item, result);
    }
  }
  return result;
}

const fixtureText = read(fixturePath);
const fixture = JSON.parse(fixtureText);
const receipt = read(
  "docs/knowledge-bank/intake/2026-07-15-nycac-facebook-posts-full-population.md"
);
const projectReport = read(
  "docs/knowledge-bank/projects/nyc-artist-coalition-facebook-posts.md"
);
const runReport = read(
  "evals/knowledge-bank/runs/2026-07-15-nycac-facebook-posts.md"
);
const moduleSource = read(
  "apps/www/src/data/knowledge-bank/nycac-facebook-posts-2026-07.ts"
);
const fairRentCaseStudy = read("apps/www/src/content/work/fair-rent-nyc.mdx");
const technicalOperations = read(
  "apps/www/src/app/work/technical-operations/page.tsx"
);
const normalizedDocs = `${receipt}\n${projectReport}\n${runReport}`.replace(
  /\s+/g,
  " "
);

const checks = [];

function check(dimension, label, points, passes, hard = true) {
  checks.push({ dimension, label, points, passes: Boolean(passes), hard });
}

const population = fixture.population;
const audit = fixture.populationReconciliation;
const reconciliationHashes = population.map(
  (record) => record.reconciliationKeySha256
);
const reconciliationDigest = createHash("sha256")
  .update([...reconciliationHashes].sort().join("\n") + "\n")
  .digest("hex");
const fixtureSha = createHash("sha256").update(fixtureText).digest("hex");

check(
  "Population integrity",
  "The capture denominator, private reconciliation, and public ledger are exact",
  16,
  fixture.platform === "facebook" &&
    fixture.account === "@nycartc" &&
    audit.encounteredRenderRows === 598 &&
    audit.deduplicatedRenderVariants === 153 &&
    audit.exposedDistinctPosts === 445 &&
    audit.ledgerRows === 445 &&
    audit.recoveredPublicationDates === 445 &&
    audit.notRecovered === 0 &&
    population.length === 445 &&
    new Set(reconciliationHashes).size === 445 &&
    reconciliationDigest ===
      "79add9a8e36d93d41c0b30ddf233c39c3fe59fe4014db0b96f769ec98cf1ce5c" &&
    fixtureSha ===
      "cd32dd6fa53e4f93fa01ef4e59ebd2e6398ba8efff53eccae860993e51c7f24c" &&
    population.every(
      (record, index) =>
        record.ordinal === index + 1 &&
        /^[a-f0-9]{64}$/.test(record.reconciliationKeySha256) &&
        /^[a-f0-9]{64}$/.test(record.contentFingerprint) &&
        record.authorshipDisposition ===
          "shared-account-human-author-unresolved" &&
        record.bodyStored === false &&
        record.disposition === "recovered-public-metadata"
    ) &&
    includesAll(normalizedDocs, [
      "100% accounting for the capture-date authenticated Page-feed population",
      "not a native Meta export",
      "Deleted, hidden, private, unpublished, or no-longer-retained posts"
    ])
);

const yearCounts = Object.fromEntries(
  ["2017", "2018", "2019", "2020", "2021"].map((year) => [
    year,
    population.filter((record) => record.publishedAt.startsWith(year)).length
  ])
);

check(
  "Chronology and endpoint",
  "All dates and the authenticated terminal control reproduce",
  8,
  JSON.stringify(yearCounts) ===
    JSON.stringify({ 2017: 186, 2018: 74, 2019: 111, 2020: 69, 2021: 5 }) &&
    audit.dateRange.earliest === "2017-01-29" &&
    audit.dateRange.latest === "2021-09-15" &&
    fixture.method.terminalControl.consecutiveStableTerminalChecks === 7 &&
    fixture.method.terminalControl.terminalEarliestDate === "2017-01-29" &&
    fixture.method.terminalControl.terminalLatestDate === "2021-09-15" &&
    fixture.method.terminalControl.reverifiedNoLoadingBoundary === true &&
    fixture.method.terminalControl.reverifiedEndpointMarker ===
      "NYC Artist Coalition Recommendations to NYC Dept. of Cultural Affairs" &&
    JSON.stringify(
      fixture.method.terminalControl.reverifiedDocumentHeightRangePx
    ) === JSON.stringify([296842, 296970]) &&
    population.every((record) => /^\d{4}-\d{2}-\d{2}$/.test(record.publishedAt)) &&
    includesAll(normalizedDocs, [
      "seven checks with no loading boundary",
      "endpoint identity, not height alone"
    ])
);

const missionCount = (tag) =>
  population.filter((record) => record.missionTags.includes(tag)).length;
const expectedMission = fixture.missionSummary.tagCounts;

check(
  "Mission continuity",
  "Every overlapping mission classification reproduces",
  10,
  Object.entries(expectedMission).every(
    ([tag, expected]) => missionCount(tag) === expected
  ) &&
    JSON.stringify(expectedMission) ===
      JSON.stringify({
        "commercial-rent-and-anti-displacement": 48,
        "civic-solidarity-and-participation": 16,
        "covid-and-space-relief": 30,
        "cultural-space-survival-and-network": 191,
        "coalition-public-communications": 104,
        "nightlife-governance-and-listening": 29,
        "march-transparency-and-accountability": 65,
        "cabaret-law-and-dance-freedom": 76,
        "cultural-policy-and-create-nyc": 18,
        "cultural-space-safety-and-compliance": 8
      }) &&
    includesAll(normalizedDocs, [
      "tags overlap",
      "subject continuity and public routing",
      "not sole credit"
    ])
);

const stakeholderCount = (tag) =>
  population.filter((record) => record.stakeholderGroups.includes(tag)).length;
const accountReferenceCount = (tag) =>
  population.filter((record) => record.accountReferences.includes(tag)).length;

check(
  "Stakeholder semantics",
  "Stakeholder and account-reference counts remain outgoing interfaces",
  10,
  Object.entries(fixture.stakeholderSummary.tagCounts).every(
    ([tag, expected]) => stakeholderCount(tag) === expected
  ) &&
    accountReferenceCount("rafaelEspinal") === 23 &&
    accountReferenceCount("nycCouncil") === 25 &&
    accountReferenceCount("stephenLevin") === 8 &&
    accountReferenceCount("antonioReynoso") === 1 &&
    accountReferenceCount("culturalAffairs") === 4 &&
    accountReferenceCount("officeOfNightlife") === 4 &&
    accountReferenceCount("mayor") === 3 &&
    includesAll(normalizedDocs, [
      "Page-authored references",
      "do **not** establish that the named accounts engaged",
      "incoming stakeholder engagement remains unmeasured"
    ])
);

const urlInventory = fixture.postedUrlInventory;
const roleCounts = Object.fromEntries(
  [...new Set(urlInventory.map((record) => record.evidenceRole))]
    .sort()
    .map((role) => [
      role,
      urlInventory.filter((record) => record.evidenceRole === role).length
    ])
);
const withheldRoutes = urlInventory.filter(
  (record) => record.preservationDisposition === "withheld-sensitive-route"
);

check(
  "URL inventory",
  "Every route has a role, access disposition, and preservation disposition",
  12,
  urlInventory.length === 67 &&
    new Set(urlInventory.map((record) => record.routeKey)).size === 67 &&
    fixture.postedUrlSummary.distinctExternalRoutes === 67 &&
    fixture.postedUrlSummary.publishedExactRoutes === 65 &&
    fixture.postedUrlSummary.withheldSensitiveRoutes === 2 &&
    fixture.postedUrlSummary.governedSourceRoutes === 9 &&
    fixture.postedUrlSummary.inventoryOnlyRoutes === 56 &&
    JSON.stringify(roleCounts) ===
      JSON.stringify({
        "event-or-program": 9,
        "external-context": 6,
        "fundraising-or-petition": 3,
        "government-or-civic-action": 3,
        "issue-context": 22,
        "project-route": 18,
        "resource-or-intake": 6
      }) &&
    withheldRoutes.length === 2 &&
    withheldRoutes.every(
      (record) =>
        record.url === null &&
        record.accessDisposition === "withheld-public-route" &&
        record.sourceId === null
    ) &&
    urlInventory.every(
      (record) =>
        /^[a-f0-9]{20}$/.test(record.routeKey) &&
        typeof record.evidenceRole === "string" &&
        typeof record.missionContext === "string"
    ) &&
    includesAll(normalizedDocs, [
      "Sixty-five public-safe routes",
      "represented only by hashes and host classes",
      "not automatically coalition coverage, endorsement, partnership, adoption, or outcome evidence"
    ])
);

const governedRoutes = urlInventory.filter((record) => record.sourceId);
const expectedGoverned = new Map([
  [
    "SRC-NYCAC-FACEBOOK-GRUBSTREET-ODE-2019-05-22",
    ["issue-context", "march-transparency-and-accountability"]
  ],
  [
    "SRC-NYCA-PRESS-GOTHAMIST-2019-02-12-LAWMAKERS-DEMAND-TRANSPARENCY-ON-SURPRISE",
    ["issue-context", "march-transparency-and-accountability"]
  ],
  [
    "SRC-NYCA-PRESS-BEDFORD-BOWERY-2019-02-12-DISCO-DISCORD-NYPD-AND-NIGHTLIFE",
    ["issue-context", "cultural-space-survival-and-network"]
  ],
  [
    "SRC-NYCAC-FACEBOOK-FOX5-NIGHTLIFE-LISTENING-2018-03-26",
    ["issue-context", "cultural-space-survival-and-network"]
  ],
  [
    "SRC-NYCA-PRESS-NYT-2017-10-30-AFTER-91-YEARS-NEW-YORK",
    ["issue-context", "cabaret-law-and-dance-freedom"]
  ],
  [
    "SRC-NYCA-NPR-CABARET-2017-09-20",
    ["issue-context", "cultural-space-survival-and-network"]
  ],
  [
    "SRC-NYCA-PRESS-NEW-YORKER-2017-07-03-DANCE-OUTLAWS-FIGHT-FOR-THE",
    ["issue-context", "cabaret-law-and-dance-freedom"]
  ],
  [
    "SRC-NYCA-PRESS-WNYC-2017-06-19-THE-BUREAUCRATIC-DANCE-TO-END",
    ["issue-context", "cabaret-law-and-dance-freedom"]
  ],
  [
    "SRC-NYCAC-FACEBOOK-TIMEOUT-CABARET-2017-03-22",
    ["issue-context", "coalition-public-communications"]
  ]
]);
const sourceById = new Map(
  knowledgeBank.sources.map((source) => [source.id, source])
);

check(
  "Governed sources",
  "All nine governed routes retain exact source and evidence semantics",
  10,
  governedRoutes.length === 9 &&
    governedRoutes.every((record) => {
      const expected = expectedGoverned.get(record.sourceId);
      return (
        expected?.[0] === record.evidenceRole &&
        expected?.[1] === record.missionContext &&
        record.accessDisposition === "governed-source-recovered" &&
        record.preservationDisposition === "governed-source-record" &&
        sourceById.has(record.sourceId)
      );
    }) &&
    [...expectedGoverned.keys()].every((id) => sourceById.has(id)) &&
    sourceById
      .get("SRC-NYCAC-FACEBOOK-GRUBSTREET-ODE-2019-05-22")
      ?.doesNotEstablish.includes("Jamie's individual role") &&
    sourceById
      .get("SRC-NYCAC-FACEBOOK-FOX5-NIGHTLIFE-LISTENING-2018-03-26")
      ?.doesNotEstablish.includes(
        "NYC Artist Coalition solely created the Office of Nightlife"
      ) &&
    sourceById
      .get("SRC-NYCAC-FACEBOOK-TIMEOUT-CABARET-2017-03-22")
      ?.doesNotEstablish.includes("coverage of Jamie")
);

const interactionTotals = population.reduce(
  (result, record) => {
    const metrics = record.displayedInteractions;
    result.reactions += metrics.reactions;
    result.comments += metrics.comments;
    result.shares += metrics.shares;
    result.rowsWithReactions += metrics.reactions > 0 ? 1 : 0;
    result.rowsWithComments += metrics.comments > 0 ? 1 : 0;
    result.rowsWithShares += metrics.shares > 0 ? 1 : 0;
    return result;
  },
  {
    reactions: 0,
    comments: 0,
    shares: 0,
    rowsWithReactions: 0,
    rowsWithComments: 0,
    rowsWithShares: 0
  }
);
const highestReactionRow = population.find((record) => record.ordinal === 293);

check(
  "Displayed interactions",
  "Capture-date labels reproduce without becoming people, reach, or impact",
  8,
  interactionTotals.reactions === 2291 &&
    interactionTotals.comments === 212 &&
    interactionTotals.shares === 0 &&
    interactionTotals.rowsWithReactions === 371 &&
    interactionTotals.rowsWithComments === 128 &&
    interactionTotals.rowsWithShares === 0 &&
    highestReactionRow?.publishedAt === "2017-10-30" &&
    highestReactionRow.displayedInteractions.reactions === 95 &&
    fixture.displayedInteractionSummary.maxCommentsOnOneRow === 7 &&
    includesAll(normalizedDocs, [
      "Share counts were absent",
      "Zero displayed shares is not evidence that no sharing occurred",
      "not unique people, reach, attendance, conversion, endorsement, mandate, or impact"
    ])
);

const claimById = new Map(
  knowledgeBank.claims.map((claim) => [claim.id, claim])
);
const inquiryById = new Map(
  knowledgeBank.researchInquiries.map((inquiry) => [inquiry.id, inquiry])
);
const intake = knowledgeBank.intakeItems.find(
  (item) =>
    item.id === "INTAKE-2026-07-15-NYCAC-FACEBOOK-POST-FULL-POPULATION"
);
const facebookClaimIds = [
  "CLM-NYCAC-FACEBOOK-PUBLIC-OPERATING-RECORD",
  "CLM-NYCAC-FACEBOOK-CIVIC-RELAY",
  "CLM-NYCAC-FACEBOOK-INTERACTION-SIGNALS"
];
const facebookClaims = facebookClaimIds.map((id) => claimById.get(id));

check(
  "Lifecycle integration",
  "The pass reaches intake, sources, observations, claims, and inquiries",
  10,
  intake?.publicationStatus === "knowledge-bank-only" &&
    intake.sourceIds.length === 13 &&
    intake.observationIds.length === 9 &&
    intake.claimIds.length === 3 &&
    intake.researchInquiryIds.length === 3 &&
    intake.sourceIds.every((id) => sourceById.has(id)) &&
    intake.observationIds.every((id) =>
      knowledgeBank.observations.some((item) => item.id === id)
    ) &&
    intake.claimIds.every((id) => claimById.has(id)) &&
    intake.researchInquiryIds.every((id) => inquiryById.has(id)) &&
    facebookClaims.every(
      (claim) => claim?.status === "confirmed-with-boundary"
    ) &&
    inquiryById.get("INQ-NYCAC-FACEBOOK-POST-OWNER-EXPORT")?.resultStatus ===
      "inconclusive" &&
    inquiryById.get("INQ-NYCAC-FACEBOOK-POST-AUTHORSHIP")?.resultStatus ===
      "inconclusive" &&
    inquiryById.get("INQ-NYCAC-FACEBOOK-POST-SOURCE-PRESERVATION")
      ?.resultStatus === "partially-recovered"
);

const forbiddenKeys = new Set([
  "body",
  "rawBody",
  "commentText",
  "commenter",
  "reactionIdentity",
  "followerIdentity",
  "email",
  "phone",
  "cookie",
  "session",
  "authenticatedUrl",
  "platformPostId"
]);
const exposedForbiddenKey = allObjectKeys(fixture).some((key) =>
  forbiddenKeys.has(key)
);

check(
  "Credit, privacy, and projection",
  "Collective credit and private boundaries remain held from the website",
  16,
  sourceById.get("SRC-NYCAC-FACEBOOK-PROTECTED-RUN-2026")?.visibility ===
    "protected" &&
    !exposedForbiddenKey &&
    !/(c_user|xs=|fr=|datr=|__cft__|__tn__)/i.test(fixtureText) &&
    facebookClaims.every((claim) =>
      claim?.projections.every(
        (projection) =>
          projection.status === "hold" && projection.surfaces.length === 0
      )
    ) &&
    !fairRentCaseStudy.includes("CLM-NYCAC-FACEBOOK-") &&
    !technicalOperations.includes("CLM-NYCAC-FACEBOOK-") &&
    includesAll(moduleSource, [
      "Jamie authored every NYC Artist Coalition Facebook post",
      "every referenced official engaged with NYC Artist Coalition",
      "zero displayed shares means no one shared the posts"
    ]) &&
    includesAll(normalizedDocs, [
      "Current authenticated management access establishes current custody only",
      "shared Page cannot assign post-level authorship",
      "No website copy changes"
    ])
);

const possiblePoints = checks.reduce((sum, item) => sum + item.points, 0);
const earnedPoints = checks.reduce(
  (sum, item) => sum + (item.passes ? item.points : 0),
  0
);
const score = Math.round((earnedPoints / possiblePoints) * 100);
const failures = checks.filter((item) => !item.passes);
const hardFailures = failures.filter((item) => item.hard);
const threshold = 100;

console.log(
  `NYC Artist Coalition Facebook posts eval: ${score}/100 (criterion: >= ${threshold}, no hard failures)`
);

for (const dimension of [...new Set(checks.map((item) => item.dimension))]) {
  const dimensionChecks = checks.filter((item) => item.dimension === dimension);
  const earned = dimensionChecks.reduce(
    (sum, item) => sum + (item.passes ? item.points : 0),
    0
  );
  const possible = dimensionChecks.reduce((sum, item) => sum + item.points, 0);
  console.log(`- ${dimension}: ${earned}/${possible}`);
}

if (failures.length) {
  console.error("NYC Artist Coalition Facebook posts gaps:");
  for (const item of failures) {
    console.error(`- ${item.hard ? "HARD " : ""}${item.dimension}: ${item.label}`);
  }
}

if (score < threshold || hardFailures.length) process.exit(1);

console.log("NYC Artist Coalition Facebook posts criterion met.");
