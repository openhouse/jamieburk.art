#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { knowledgeBank } from "../apps/www/src/data/knowledge-bank/records.ts";
import { urbanhermitMissionSignalRules } from "./lib/urbanhermit-mission-classifier.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fixturePath = "apps/www/src/data/knowledge-bank/fixtures/urbanhermit-full-population.json";

function read(relativePath) {
  return readFileSync(path.join(repoRoot, relativePath), "utf8");
}

function includesAll(source, values) {
  return values.every((value) => source.includes(value));
}

function validPublicStatusUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname === "x.com" && /\/status\/\d+$/.test(url.pathname);
  } catch {
    return false;
  }
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
const receipt = read("docs/knowledge-bank/intake/2026-07-15-urbanhermit-x-full-population.md");
const projectNote = read("docs/knowledge-bank/projects/urbanhermit-public-record.md");
const moduleSource = read("apps/www/src/data/knowledge-bank/urbanhermit-x-corpus.ts");
const normalizedDocs = `${receipt}\n${projectNote}`.replace(/\s+/g, " ");

const checks = [];

function check(dimension, label, points, passes, hard = true) {
  checks.push({ dimension, label, points, passes: Boolean(passes), hard });
}

const records = fixture.records;
const statusUrls = records.map((record) => record.url);
const accountAuthored = records.filter((record) => record.sourceAuthorship === "account-authored");
const externalReposts = records.filter((record) => record.sourceAuthorship === "external-source-native-repost");
const originalRecords = records.filter((record) => record.recordType === "original");
const replyRecords = records.filter((record) => record.recordType === "reply");
const repostRecords = records.filter((record) => record.recordType === "repost");
const population = fixture.populationReconciliation;

check(
  "Population reconciliation",
  "Every live profile-counted record is present exactly once",
  14,
  fixture.account === "@urbanhermit" &&
    population.profileReportedPostCount === 434 &&
    population.recoveredUnionRecordCount === 434 &&
    population.recoveredPopulationReviewedPercent === 100 &&
    population.profileCountNotMaterialized === 0 &&
    records.length === 434 &&
    new Set(statusUrls).size === 434 &&
    statusUrls.every(validPublicStatusUrl) &&
    population.dateRange.earliest === "2008-10-04T23:21:03.000Z" &&
    population.dateRange.latest === "2023-04-17T16:55:07.000Z"
);

check(
  "Population reconciliation",
  "Posts, Replies, conversation contexts, and record types reconcile without denominator leakage",
  10,
  population.postsTimelineUniqueCount === 421 &&
    population.repliesTimelineRenderedArticleCount === 436 &&
    population.repliesTimelinePrimaryRecordCount === 434 &&
    population.repliesTimelineConversationContextCount === 2 &&
    fixture.conversationContextRecords.length === 2 &&
    fixture.conversationContextRecords.every((record) =>
      record.contextType === "conversation-parent-excluded-from-profile-population" &&
      record.authorHandle !== "@urbanhermit"
    ) &&
    originalRecords.length === 340 &&
    replyRecords.length === 13 &&
    repostRecords.length === 81 &&
    accountAuthored.length === 353 &&
    externalReposts.length === 81
);

const allLinks = records.flatMap((record) => record.externalLinks ?? []);
const accountLinks = accountAuthored.flatMap((record) => record.externalLinks ?? []);
const recordsWithLinks = records.filter((record) => record.externalLinks?.length);

check(
  "Posted URL inventory",
  "The complete posted-link population and account-authored subset reproduce",
  10,
  recordsWithLinks.length === 277 &&
    allLinks.length === 349 &&
    new Set(allLinks.map((link) => link.shortUrl)).size === 321 &&
    accountLinks.length === 292 &&
    new Set(accountLinks.map((link) => link.shortUrl)).size === 277 &&
    fixture.postedUrlInventory.recordCountWithExternalLinks === 277 &&
    fixture.postedUrlInventory.externalLinkOccurrences === 349 &&
    fixture.postedUrlInventory.distinctExternalShortUrls === 321 &&
    includesAll(normalizedDocs, [
      "not all 321 destinations have been resolved and close-read",
      "does not establish Jamie's authorship",
      "endorsement"
    ])
);

const signalCounts = Object.fromEntries(
  urbanhermitMissionSignalRules.map((rule) => [
    rule.id,
    records.filter((record) => record.missionSignals.includes(rule.id)).length
  ])
);
const fixtureRuleManifest = fixture.missionSignalClassification.rules;
const codeRuleManifest = urbanhermitMissionSignalRules.map((rule) => ({
  signalId: rule.id,
  pattern: rule.pattern.source,
  flags: rule.pattern.flags
}));
const validEvidence = records.every((record) =>
  record.missionSignals.length === record.missionSignalEvidence.length &&
  record.missionSignalEvidence.every((evidence) =>
    record.missionSignals.includes(evidence.signalId) &&
    fixture.missionSignalClassification.inputFields.includes(evidence.inputField) &&
    typeof evidence.matchedValue === "string" &&
    evidence.matchedValue.length > 0
  ) &&
  /^[a-f0-9]{64}$/.test(record.classificationInputDigest)
);

check(
  "Mission classification",
  "The checked-in rule manifest, positive evidence, and six overlapping counts remain auditable",
  12,
  JSON.stringify(fixtureRuleManifest) === JSON.stringify(codeRuleManifest) &&
    validEvidence &&
    signalCounts["community-platforms-and-gatherings"] === 35 &&
    signalCounts["civic-participation-and-service"] === 8 &&
    signalCounts["cultural-space-advocacy"] === 45 &&
    signalCounts["public-history-place-and-waterways"] === 2 &&
    signalCounts["creative-technology-and-media"] === 4 &&
    signalCounts["neighborhood-mutual-aid"] === 1 &&
    JSON.stringify(signalCounts) === JSON.stringify(fixture.publishingPattern.missionSignalRecordCounts) &&
    includesAll(normalizedDocs, ["overlapping", "not measures of labor", "not words authored by Jamie"])
);

const stakeholderRecords = fixture.stakeholderInventory.records;
const missionThirdParty = stakeholderRecords.filter((record) => record.classification === "mission-relevant-third-party");
const missionContexts = stakeholderRecords.filter((record) => record.classification === "mission-relevant-conversation-context");
const contextLimited = stakeholderRecords.filter((record) => record.classification === "context-limited-personal-or-network");
const stakeholderGroupCounts = Object.fromEntries(
  [...new Set(missionThirdParty.map((record) => record.stakeholderGroup))]
    .sort()
    .map((group) => [group, missionThirdParty.filter((record) => record.stakeholderGroup === group).length])
);

check(
  "Stakeholder response",
  "The bounded incoming-search population, mission subset, and stakeholder groups reproduce",
  10,
  stakeholderRecords.length === 26 &&
    missionThirdParty.length === 15 &&
    new Set(missionThirdParty.map((record) => record.authorHandle)).size === 9 &&
    missionContexts.length === 2 &&
    contextLimited.length === 9 &&
    JSON.stringify(stakeholderGroupCounts) === JSON.stringify(fixture.stakeholderInventory.stakeholderGroupCounts) &&
    fixture.stakeholderInventory.recoveredPublicIncomingRecordCount === 26 &&
    fixture.stakeholderInventory.missionRelevantThirdPartyRecordCount === 15 &&
    fixture.stakeholderInventory.missionRelevantThirdPartyAccountCount === 9 &&
    fixture.stakeholderInventory.missionRelevantConversationContextCount === 2
);

check(
  "Stakeholder response",
  "Non-mission personal context is reduced to identity-free dispositions",
  8,
  contextLimited.every((record) =>
    Object.keys(record).sort().join(",") === "classification,publicDisposition,redactionId,stakeholderGroup" &&
    /^context-limited-\d{2}$/.test(record.redactionId) &&
    record.publicDisposition === "identity-date-and-metrics-withheld-as-non-mission-personal-context"
  ) &&
    includesAll(normalizedDocs, [
      "preserve no identity, date, URL, or metrics",
      "not complete historical engagement",
      "not an endorsement count"
    ])
);

const engagement = accountAuthored.reduce(
  (totals, record) => {
    const metrics = record.visibleEngagement;
    totals.likes += metrics.likes;
    totals.replies += metrics.replies;
    totals.reposts += metrics.reposts;
    totals.bookmarks += metrics.bookmarks;
    totals.views += metrics.views;
    if (metrics.likes + metrics.replies + metrics.reposts + metrics.bookmarks + metrics.views > 0) totals.nonzero += 1;
    return totals;
  },
  { likes: 0, replies: 0, reposts: 0, bookmarks: 0, views: 0, nonzero: 0 }
);

check(
  "Traction boundary",
  "Only dated account-authored visible counters are aggregated and they remain non-impact evidence",
  8,
  engagement.nonzero === 85 &&
    engagement.likes === 175 &&
    engagement.replies === 8 &&
    engagement.reposts === 60 &&
    engagement.bookmarks === 0 &&
    engagement.views === 0 &&
    engagement.likes + engagement.replies + engagement.reposts === 243 &&
    includesAll(normalizedDocs, [
      "243 interaction units, not 243 people",
      "not unique people, reach, endorsement, conversion, attendance, or impact",
      "Source-post counters on external native reposts are excluded"
    ])
);

const sourceById = new Map(knowledgeBank.sources.map((source) => [source.id, source]));
const claimById = new Map(knowledgeBank.claims.map((claim) => [claim.id, claim]));
const inquiryById = new Map(knowledgeBank.researchInquiries.map((inquiry) => [inquiry.id, inquiry]));
const intake = knowledgeBank.intakeItems.find((item) => item.id === "INTAKE-2026-07-15-URBANHERM-X-FULL-POPULATION");
const personalClaim = claimById.get("CLM-URBANHERM-X-PERSONAL-PUBLIC-WORKING-SURFACE");
const tireClaim = claimById.get("CLM-URBANHERM-KCTH-TIRE-PICKUP-PARTICIPATION");

check(
  "Lifecycle integration",
  "The corpus reaches intakes, sources, atomic observations, bounded claims, and recursive inquiries",
  10,
  intake?.sourceIds.length === 2 &&
    intake.observationIds.length === 4 &&
    intake.claimIds.length === 1 &&
    intake.researchInquiryIds.length === 2 &&
    intake.observationIds.every((id) => knowledgeBank.observations.some((observation) => observation.id === id)) &&
    sourceById.has("SRC-URBANHERM-X-FULL-POPULATION-2026") &&
    sourceById.has("SRC-URBANHERM-X-AUTHENTICATED-RESEARCH-2026") &&
    personalClaim?.status === "confirmed-with-boundary" &&
    tireClaim?.status === "confirmed-with-boundary" &&
    inquiryById.get("INQ-URBANHERM-X-OWNER-ARCHIVE-RECONCILIATION")?.resultStatus === "partially-recovered" &&
    inquiryById.get("INQ-URBANHERM-X-POSTED-SOURCE-MATURATION")?.resultStatus === "partially-recovered"
);

const horseClaim = claimById.get("CLM-HORSE-LORDS-TRUTHERS-VIDEO");
const tunnelClaim = claimById.get("CLM-KC-EIGHTH-STREET-TUNNEL-PROGRAM");
const officeClaim = claimById.get("CLM-NYCA-OFFICE-NIGHTLIFE-TOWN-HALL");

check(
  "Source positioning",
  "Mission-relevant sources strengthen the record without displacing collaborators or inventing causation",
  10,
  horseClaim?.evidence.some((evidence) => evidence.sourceId === "SRC-URBANHERM-X-HORSE-LORDS-POST-2016") &&
    horseClaim.boundaries.some((boundary) => boundary.includes("M.C. Schmidt")) &&
    tunnelClaim?.evidence.some((evidence) => evidence.sourceId === "SRC-URBANHERM-X-JULIA-EIGHTH-STREET-TUNNEL-2016" && evidence.relationship === "corroborating") &&
    officeClaim?.evidence.some((evidence) => evidence.sourceId === "SRC-URBANHERM-BROOKLYN-EAGLE-NIGHTLIFE-2017" && !evidence.renderCitation) &&
    sourceById.get("SRC-URBANHERM-BROOKLYN-EAGLE-NIGHTLIFE-2017")?.doesNotEstablish.includes("Jamie's individual authorship or role") &&
    tireClaim?.antiClaims.includes("Jamie alone created or operated Tired of Tires.") &&
    includesAll(normalizedDocs, ["does not name Jamie or assign individual causation", "do not establish sole ownership"])
);

const objectKeys = allObjectKeys(fixture);
const serializedFixture = JSON.stringify(fixture);
const fixtureSha = createHash("sha256").update(fixtureText).digest("hex");
const pageOccurrences = knowledgeBank.pages.flatMap((page) => page.occurrences);

check(
  "Privacy and projection discipline",
  "The fixture is metadata-only, hash-locked, and the personal corpus remains off the website",
  8,
  fixtureSha === "9fedab737b1e4d6ded779942203d4a77272fe0120663f50402c81bdbcdc0c455" &&
    !objectKeys.some((key) => ["text", "postText", "rawText", "body", "email", "phone", "cookie", "session", "credential", "directMessage"].includes(key)) &&
    !serializedFixture.includes("/Users/") &&
    !serializedFixture.includes("/Volumes/") &&
    !serializedFixture.toLowerCase().includes("impressions") &&
    fixture.publicSafety.status === "public-safe-metadata-only" &&
    personalClaim?.projections.every((projection) => projection.status === "hold" && projection.surfaces.length === 0) &&
    tireClaim?.projections.every((projection) => projection.status === "hold" && projection.surfaces.length === 0) &&
    !pageOccurrences.some((occurrence) =>
      ["CLM-URBANHERM-X-PERSONAL-PUBLIC-WORKING-SURFACE", "CLM-URBANHERM-KCTH-TIRE-PICKUP-PARTICIPATION"].includes(occurrence.claimId)
    ) &&
    includesAll(moduleSource, [
      "Raw post text and protected personal or authenticated-session context remain outside the public repository.",
      "not selected for the current job-application website"
    ])
);

const possiblePoints = checks.reduce((sum, item) => sum + item.points, 0);
const earnedPoints = checks.reduce((sum, item) => sum + (item.passes ? item.points : 0), 0);
const score = Math.round((earnedPoints / possiblePoints) * 100);
const failures = checks.filter((item) => !item.passes);
const hardFailures = failures.filter((item) => item.hard);
const threshold = 100;

console.log(`Urbanhermit X corpus eval: ${score}/100 (criterion: >= ${threshold}, no hard failures)`);

for (const dimension of [...new Set(checks.map((item) => item.dimension))]) {
  const dimensionChecks = checks.filter((item) => item.dimension === dimension);
  const earned = dimensionChecks.reduce((sum, item) => sum + (item.passes ? item.points : 0), 0);
  const possible = dimensionChecks.reduce((sum, item) => sum + item.points, 0);
  console.log(`- ${dimension}: ${earned}/${possible}`);
}

if (failures.length) {
  console.error("Urbanhermit X corpus gaps:");
  for (const item of failures) {
    console.error(`- ${item.hard ? "HARD " : ""}${item.dimension}: ${item.label}`);
  }
}

if (score < threshold || hardFailures.length) process.exit(1);

console.log("Urbanhermit X corpus criterion met.");
