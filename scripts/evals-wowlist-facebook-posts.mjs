#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { knowledgeBank } from "../apps/www/src/data/knowledge-bank/records.ts";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fixturePath =
  "apps/www/src/data/knowledge-bank/fixtures/wowlist-facebook-posts-full-population.json";

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
  "docs/knowledge-bank/intake/2026-07-15-wowlist-facebook-posts-full-population.md"
);
const projectReport = read(
  "docs/knowledge-bank/projects/wowlist-facebook-posts.md"
);
const moduleSource = read(
  "apps/www/src/data/knowledge-bank/wowlist-facebook-posts-2026-07.ts"
);
const caseStudy = read("apps/www/src/content/work/wowlist.mdx");
const normalizedDocs = `${receipt}\n${projectReport}`.replace(/\s+/g, " ");

const checks = [];

function check(dimension, label, points, passes, hard = true) {
  checks.push({ dimension, label, points, passes: Boolean(passes), hard });
}

const population = fixture.population;
const populationAudit = fixture.populationReconciliation;
const fingerprints = population.map((record) => record.contentFingerprint);
const fingerprintDigest = createHash("sha256")
  .update([...fingerprints].sort().join("\n") + "\n")
  .digest("hex");
const fixtureSha = createHash("sha256").update(fixtureText).digest("hex");

check(
  "Population boundary",
  "The capture-date live-feed denominator is complete and explicitly bounded",
  12,
  fixture.platform === "facebook" &&
    fixture.account === "WOW List" &&
    fixture.publicPageUrl === "https://www.facebook.com/wowlist" &&
    fixture.method.terminalControl.consecutiveStableTerminalChecks === 7 &&
    fixture.method.terminalControl.stableDocumentHeightPx === 40095 &&
    populationAudit.exposedDistinctPosts === 57 &&
    populationAudit.ledgerRows === 57 &&
    populationAudit.recoveredPublicMetadata === 57 &&
    populationAudit.notRecovered === 0 &&
    includesAll(normalizedDocs, [
      "100% accounting for the capture-date authenticated live-feed population",
      "not a native Meta export",
      "Deleted, hidden, private, unpublished, or no-longer-retained posts"
    ])
);

const yearCounts = Object.fromEntries(
  ["2015", "2016", "2017", "2018"].map((year) => [
    year,
    population.filter((record) => record.publishedAt.startsWith(year)).length
  ])
);

check(
  "Record integrity",
  "All 57 rows retain unique immutable fingerprints and exact chronology",
  12,
  population.length === 57 &&
    new Set(fingerprints).size === 57 &&
    fingerprintDigest ===
      "3cd88490d5df7a393b010b4814541c539582b611cc725c25e46ea80538a99840" &&
    fixtureSha ===
      "5755dfbbb6388ca369b90337e210502dd264bb22d554cf8f0294027de08ffc72" &&
    JSON.stringify(yearCounts) ===
      JSON.stringify({ 2015: 22, 2016: 27, 2017: 7, 2018: 1 }) &&
    populationAudit.dateRange.earliest === "2015-04-25" &&
    populationAudit.dateRange.latest === "2018-03-22" &&
    populationAudit.sharedSourceCardRows === 24 &&
    populationAudit.pagePostRows === 33 &&
    population.every(
      (record, index) =>
        record.ordinal === index + 1 &&
        /^\d{4}-\d{2}-\d{2}$/.test(record.publishedAt) &&
        ["shared-source-card", "wow-list-page-post"].includes(
          record.relationship
        ) &&
        record.bodyStored === false &&
        record.disposition === "recovered-public-metadata"
    )
);

const urlInventory = fixture.postedUrlInventory;
const urlSummary = fixture.urlInventorySummary;
const roleCounts = Object.fromEntries(
  [...new Set(urlInventory.map((record) => record.evidenceRole))]
    .sort()
    .map((role) => [
      role,
      urlInventory.filter((record) => record.evidenceRole === role).length
    ])
);

check(
  "URL inventory",
  "Every cleaned route has a source role, access state, and preservation state",
  12,
  urlInventory.length === 55 &&
    new Set(urlInventory.map((record) => record.url)).size === 55 &&
    urlSummary.distinctPostedUrls === 55 &&
    urlSummary.wowListUrls === 30 &&
    urlSummary.externalUrls === 25 &&
    JSON.stringify(roleCounts) ===
      JSON.stringify({
        "civic-mobilization-resource": 1,
        "cultural-network-resource": 1,
        "event-information": 3,
        fundraising: 9,
        "independent-product-use": 1,
        "issue-context": 5,
        "organizer-resource": 5,
        "project-route": 30
      }) &&
    urlInventory.every(
      (record) =>
        /^https?:\/\//.test(record.url) &&
        typeof record.evidenceRole === "string" &&
        ["canonical-source-recovered", "not-rechecked-in-this-pass"].includes(
          record.accessDisposition
        ) &&
        ["governed-source-record", "route-inventory-only"].includes(
          record.preservationDisposition
        )
    ) &&
    includesAll(normalizedDocs, [
      "not-rechecked-in-this-pass",
      "route-inventory-only",
      "not a claim that a route is live, dead, or historically nonexistent"
    ])
);

const governedRoutes = urlInventory.filter((record) => record.sourceId);
const expectedGoverned = new Map([
  [
    "SRC-WOWLIST-FACEBOOK-WESTWORD-DIY-FUND-2017",
    ["issue-context", "venue-safety-and-survival"]
  ],
  [
    "SRC-WOWLIST-FACEBOOK-MEOW-WOLF-DIY-FUND-2016",
    ["fundraising", "venue-safety-and-survival"]
  ],
  [
    "SRC-WOWLIST-FACEBOOK-EAST-BAY-SAFE-SPACES-2016",
    ["issue-context", "venue-safety-and-survival"]
  ],
  [
    "SRC-WOWLIST-FACEBOOK-KNOW-CLOSING-2016",
    ["issue-context", "venue-safety-and-survival"]
  ],
  ["SRC-WOWLIST-SBDIY-ADOPTION", ["organizer-resource", "organizer-infrastructure"]],
  [
    "SRC-WOWLIST-SHELBY-TUTORIAL-2015",
    ["independent-product-use", "organizer-infrastructure"]
  ],
  [
    "SRC-WOWLIST-FACEBOOK-DODIY-RESOURCE",
    ["organizer-resource", "organizer-infrastructure"]
  ]
]);

check(
  "Governed source semantics",
  "The seven governed routes retain their exact evidence roles and source identities",
  10,
  governedRoutes.length === 7 &&
    governedRoutes.every((record) => {
      const expected = expectedGoverned.get(record.sourceId);
      return (
        expected?.[0] === record.evidenceRole &&
        expected?.[1] === record.missionContext &&
        record.accessDisposition === "canonical-source-recovered" &&
        record.preservationDisposition === "governed-source-record"
      );
    }) &&
    [...expectedGoverned.keys()].every((id) =>
      knowledgeBank.sources.some((source) => source.id === id)
    )
);

const missionCount = (tag) =>
  population.filter((record) => record.missionTags.includes(tag)).length;

check(
  "Mission patterns",
  "Organizer workflows, cultural distribution, care, and civic routing reproduce",
  10,
  missionCount("product-onboarding-and-use") === 17 &&
    missionCount("cross-city-organizer-infrastructure") === 16 &&
    missionCount("participatory-product-governance") === 3 &&
    missionCount("cultural-event-distribution") === 38 &&
    missionCount("venue-safety-and-survival") === 12 &&
    missionCount("mutual-aid-and-civic-mobilization") === 6 &&
    includesAll(normalizedDocs, [
      "organizer workflows",
      "participatory product-governance",
      "venue-safety or survival",
      "mutual aid or civic mobilization"
    ])
);

const stakeholderCount = (tag) =>
  population.filter((record) => record.stakeholderGroups.includes(tag)).length;

check(
  "Stakeholder patterns",
  "Displayed source relationships remain distinct from people, partnerships, and authorship",
  8,
  stakeholderCount("artist-or-community-source") === 12 &&
    stakeholderCount("local-organizer-or-resource-network") === 8 &&
    stakeholderCount("arts-and-civic-advocacy") === 5 &&
    stakeholderCount("cultural-space") === 5 &&
    stakeholderCount("published-media") === 4 &&
    stakeholderCount("wow-list-page-originated") === 33 &&
    includesAll(normalizedDocs, [
      "not unique people",
      "formal partnerships",
      "reaction identities",
      "post authors"
    ])
);

const interactionTotals = population.reduce(
  (result, record) => {
    const metrics = record.displayedInteractions;
    result.likes += metrics.likes;
    result.comments += metrics.comments;
    result.shares += metrics.shares;
    result.rowsWithLikes += metrics.likes > 0 ? 1 : 0;
    result.rowsWithComments += metrics.comments > 0 ? 1 : 0;
    result.rowsWithShares += metrics.shares > 0 ? 1 : 0;
    return result;
  },
  {
    likes: 0,
    comments: 0,
    shares: 0,
    rowsWithLikes: 0,
    rowsWithComments: 0,
    rowsWithShares: 0
  }
);
const highRow = population.find(
  (record) => record.ordinal === fixture.displayedInteractionSummary.highestDisplayedInteractionOrdinal
);

check(
  "Traction boundary",
  "Displayed interaction totals reproduce without becoming reach or impact",
  8,
  interactionTotals.likes === 87 &&
    interactionTotals.comments === 16 &&
    interactionTotals.shares === 49 &&
    interactionTotals.rowsWithLikes === 41 &&
    interactionTotals.rowsWithComments === 12 &&
    interactionTotals.rowsWithShares === 10 &&
    highRow?.publishedAt === "2015-10-05" &&
    highRow.displayedInteractions.likes === 13 &&
    highRow.displayedInteractions.comments === 3 &&
    highRow.displayedInteractions.shares === 29 &&
    includesAll(normalizedDocs, [
      "mutable interface counts",
      "not unique people, reach, attendance, conversion, endorsement, mandate, or impact"
    ])
);

const sourceById = new Map(knowledgeBank.sources.map((source) => [source.id, source]));
const claimById = new Map(knowledgeBank.claims.map((claim) => [claim.id, claim]));
const inquiryById = new Map(
  knowledgeBank.researchInquiries.map((inquiry) => [inquiry.id, inquiry])
);
const intake = knowledgeBank.intakeItems.find(
  (item) =>
    item.id === "INTAKE-2026-07-15-WOWLIST-FACEBOOK-POST-FULL-POPULATION"
);
const facebookClaims = [
  "CLM-WOWLIST-FACEBOOK-PUBLIC-OPERATING-RECORD",
  "CLM-WOWLIST-FACEBOOK-ORGANIZER-WORKFLOWS",
  "CLM-WOWLIST-FACEBOOK-CARE-AND-MOBILIZATION"
].map((id) => claimById.get(id));

check(
  "Lifecycle integration",
  "The pass reaches intake, sources, observations, bounded claims, and inquiries",
  12,
  intake?.publicationStatus === "knowledge-bank-only" &&
    intake.sourceIds.length === 11 &&
    intake.observationIds.length === 10 &&
    intake.claimIds.length === 3 &&
    intake.researchInquiryIds.length === 3 &&
    intake.sourceIds.every((id) => sourceById.has(id)) &&
    intake.observationIds.every((id) =>
      knowledgeBank.observations.some((item) => item.id === id)
    ) &&
    intake.claimIds.every((id) => claimById.has(id)) &&
    intake.researchInquiryIds.every((id) => inquiryById.has(id)) &&
    facebookClaims.every((claim) => claim?.status === "confirmed-with-boundary") &&
    inquiryById.get("INQ-WOWLIST-FACEBOOK-NATIVE-EXPORT")?.resultStatus ===
      "inconclusive" &&
    inquiryById.get("INQ-WOWLIST-FACEBOOK-SOCIAL-STEWARDSHIP")
      ?.resultStatus === "inconclusive" &&
    inquiryById.get("INQ-WOWLIST-FACEBOOK-LINKED-SOURCE-PRESERVATION")
      ?.resultStatus === "partially-recovered"
);

check(
  "Source positioning and credit",
  "Issue context, current access, and collective credit cannot become coverage or authorship",
  8,
  sourceById.get("SRC-WOWLIST-FACEBOOK-WESTWORD-DIY-FUND-2017")
    ?.doesNotEstablish.includes("coverage of WOW List") &&
    sourceById.get("SRC-WOWLIST-FACEBOOK-MEOW-WOLF-DIY-FUND-2016")
      ?.doesNotEstablish.includes("WOW List involvement in creating the fund") &&
    sourceById.get("SRC-WOWLIST-FACEBOOK-PROTECTED-RUN-2026")?.visibility ===
      "protected" &&
    includesAll(moduleSource, [
      "Jamie authored every WOW List Facebook post",
      "Jamie alone created WOW List",
      "WOW List caused venue recoveries or policy change",
      "Social-presence stewardship is a supported research lead; post-level authorship remains unassigned"
    ]) &&
    includesAll(normalizedDocs, [
      "shared work with Richard Caceres",
      "does not identify the human author of every historical page post"
    ])
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
  "authenticatedUrl"
]);
const exposedForbiddenKey = allObjectKeys(fixture).some((key) =>
  forbiddenKeys.has(key)
);

check(
  "Projection and privacy discipline",
  "Archive depth stays held and the public fixture excludes private content",
  8,
  !exposedForbiddenKey &&
    !/(c_user|xs=|fr=|datr=|__cft__|__tn__)/i.test(fixtureText) &&
    facebookClaims.every(
      (claim) =>
        claim?.projections.length === 1 &&
        claim.projections[0].status === "hold" &&
        claim.projections[0].surfaces.length === 0
    ) &&
    !caseStudy.includes("CLM-WOWLIST-FACEBOOK-") &&
    includesAll(normalizedDocs, [
      "No website copy changes",
      "raw bodies, comments, reaction identities",
      "three new claims remain held"
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
  `WOW List Facebook posts eval: ${score}/100 (criterion: >= ${threshold}, no hard failures)`
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
  console.error("WOW List Facebook posts gaps:");
  for (const item of failures) {
    console.error(`- ${item.hard ? "HARD " : ""}${item.dimension}: ${item.label}`);
  }
}

if (score < threshold || hardFailures.length) process.exit(1);

console.log("WOW List Facebook posts criterion met.");
