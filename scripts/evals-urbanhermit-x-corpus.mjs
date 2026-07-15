#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { knowledgeBank } from
  "../apps/www/src/data/knowledge-bank/records.ts";
import { urbanhermitMissionSignalRules } from
  "./lib/urbanhermit-mission-classifier.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const corpusPath =
  "docs/knowledge-bank/corpora/urbanhermit-x-full-population-2026-07-15.json";
const expectedSha256 =
  "9fedab737b1e4d6ded779942203d4a77272fe0120663f50402c81bdbcdc0c455";

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

const corpusText = read(corpusPath);
const corpus = JSON.parse(corpusText);
const manifest = JSON.parse(
  read(
    "docs/knowledge-bank/corpora/urbanhermit-x-full-population-2026-07-15.manifest.json"
  )
);
const receipt = read(
  "docs/knowledge-bank/runs/2026-07-15-urbanhermit-x-full-population.md"
);
const projectNote = read("docs/knowledge-bank/projects/urbanhermit.md");
const inventory = read(
  "docs/knowledge-bank/projects/social-account-inventory.md"
);
const normalizedDocs = `${receipt}\n${projectNote}\n${inventory}`.replace(
  /\s+/g,
  " "
);

const checks = [];

function check(dimension, label, points, passes) {
  checks.push({ dimension, label, points, passes: Boolean(passes) });
}

const records = corpus.records;
const population = corpus.populationReconciliation;
const statusUrls = records.map((record) => record.url);
const accountAuthored = records.filter(
  (record) => record.sourceAuthorship === "account-authored"
);
const externalReposts = records.filter(
  (record) => record.sourceAuthorship === "external-source-native-repost"
);

check(
  "Population reconciliation",
  "Every live profile-counted record is present exactly once",
  14,
  corpus.account === "@urbanhermit" &&
    manifest.profileReportedPosts === 434 &&
    manifest.corpusItems === 434 &&
    population.profileReportedPostCount === 434 &&
    population.recoveredUnionRecordCount === 434 &&
    population.recoveredPopulationReviewedPercent === 100 &&
    population.profileCountNotMaterialized === 0 &&
    records.length === 434 &&
    new Set(statusUrls).size === 434 &&
    statusUrls.every((url) =>
      /^https:\/\/x\.com\/[A-Za-z0-9_]+\/status\/\d+$/.test(url)
    ) &&
    population.dateRange.earliest === "2008-10-04T23:21:03.000Z" &&
    population.dateRange.latest === "2023-04-17T16:55:07.000Z"
);

check(
  "Population reconciliation",
  "Timeline surfaces and source authorship reconcile without denominator leakage",
  10,
  population.postsTimelineUniqueCount === 421 &&
    population.repliesTimelineRenderedArticleCount === 436 &&
    population.repliesTimelinePrimaryRecordCount === 434 &&
    population.repliesTimelineConversationContextCount === 2 &&
    corpus.conversationContextRecords.length === 2 &&
    corpus.conversationContextRecords.every(
      (record) =>
        record.contextType ===
          "conversation-parent-excluded-from-profile-population" &&
        record.authorHandle !== "@urbanhermit"
    ) &&
    records.filter((record) => record.recordType === "original").length === 340 &&
    records.filter((record) => record.recordType === "reply").length === 13 &&
    records.filter((record) => record.recordType === "repost").length === 81 &&
    accountAuthored.length === 353 &&
    externalReposts.length === 81
);

const allLinks = records.flatMap((record) => record.externalLinks ?? []);
const accountLinks = accountAuthored.flatMap(
  (record) => record.externalLinks ?? []
);

check(
  "Posted source inventory",
  "The full short-URL population and its epistemic boundary remain explicit",
  10,
  records.filter((record) => record.externalLinks?.length).length === 277 &&
    allLinks.length === 349 &&
    new Set(allLinks.map((link) => link.shortUrl)).size === 321 &&
    accountLinks.length === 292 &&
    new Set(accountLinks.map((link) => link.shortUrl)).size === 277 &&
    includesAll(normalizedDocs, [
      "not all 321 destinations have been resolved and close-read",
      "does not establish Jamie's authorship",
      "endorsement"
    ])
);

const ruleManifest = urbanhermitMissionSignalRules.map((rule) => ({
  signalId: rule.id,
  pattern: rule.pattern.source,
  flags: rule.pattern.flags
}));
const signalCounts = Object.fromEntries(
  urbanhermitMissionSignalRules.map((rule) => [
    rule.id,
    records.filter((record) => record.missionSignals.includes(rule.id)).length
  ])
);

check(
  "Mission classification",
  "Auditable overlapping rules reproduce all six retrieval counts",
  12,
  JSON.stringify(corpus.missionSignalClassification.rules) ===
    JSON.stringify(ruleManifest) &&
    JSON.stringify(signalCounts) ===
      JSON.stringify(corpus.publishingPattern.missionSignalRecordCounts) &&
    signalCounts["community-platforms-and-gatherings"] === 35 &&
    signalCounts["civic-participation-and-service"] === 8 &&
    signalCounts["cultural-space-advocacy"] === 45 &&
    signalCounts["public-history-place-and-waterways"] === 2 &&
    signalCounts["creative-technology-and-media"] === 4 &&
    signalCounts["neighborhood-mutual-aid"] === 1 &&
    records.every(
      (record) =>
        record.missionSignals.length === record.missionSignalEvidence.length &&
        /^[a-f0-9]{64}$/.test(record.classificationInputDigest)
    ) &&
    includesAll(normalizedDocs, [
      "overlapping",
      "not measures of labor",
      "not words authored by Jamie"
    ])
);

const incoming = corpus.stakeholderInventory.records;
const missionThirdParty = incoming.filter(
  (record) => record.classification === "mission-relevant-third-party"
);
const missionContexts = incoming.filter(
  (record) => record.classification === "mission-relevant-conversation-context"
);
const redactedContexts = incoming.filter(
  (record) => record.classification === "context-limited-personal-or-network"
);

check(
  "Stakeholder response",
  "The bounded incoming population and identity-free redactions reproduce",
  12,
  incoming.length === 26 &&
    missionThirdParty.length === 15 &&
    new Set(missionThirdParty.map((record) => record.authorHandle)).size === 9 &&
    missionContexts.length === 2 &&
    redactedContexts.length === 9 &&
    redactedContexts.every(
      (record) =>
        Object.keys(record).sort().join(",") ===
          "classification,publicDisposition,redactionId,stakeholderGroup" &&
        record.publicDisposition ===
          "identity-date-and-metrics-withheld-as-non-mission-personal-context"
    ) &&
    includesAll(normalizedDocs, [
      "preserve no identity, date, URL, or metrics",
      "not a complete engagement census",
      "not an endorsement count"
    ])
);

const engagement = accountAuthored.reduce(
  (totals, record) => {
    const value = record.visibleEngagement;
    totals.likes += value.likes;
    totals.replies += value.replies;
    totals.reposts += value.reposts;
    if (value.likes + value.replies + value.reposts > 0) totals.nonzero += 1;
    return totals;
  },
  { likes: 0, replies: 0, reposts: 0, nonzero: 0 }
);

check(
  "Traction boundary",
  "Dated account-authored counters remain non-impact observations",
  8,
  engagement.nonzero === 85 &&
    engagement.likes === 175 &&
    engagement.replies === 8 &&
    engagement.reposts === 60 &&
    includesAll(normalizedDocs, [
      "243 interaction units, not 243 people",
      "not unique people, reach, endorsement, conversion, attendance, or impact",
      "Source-post counters on external native reposts are excluded"
    ])
);

const sourceById = new Map(
  knowledgeBank.sources.map((source) => [source.id, source])
);
const claimById = new Map(
  knowledgeBank.claims.map((claim) => [claim.id, claim])
);
const taskById = new Map(
  knowledgeBank.researchTasks.map((task) => [task.id, task])
);
const inquiryById = new Map(
  knowledgeBank.researchInquiries.map((inquiry) => [inquiry.id, inquiry])
);
const intakeById = new Map(
  knowledgeBank.intake.map((item) => [item.id, item])
);
const claimIds = [
  "CLM-URBANHERM-X-PERSONAL-PUBLIC-WORKING-SURFACE",
  "CLM-URBANHERM-X-BOUNDED-STAKEHOLDER-RESPONSE",
  "CLM-URBANHERM-X-VISIBLE-TRACTION-SNAPSHOT",
  "CLM-URBANHERM-WOWLIST-PEER-ATTRIBUTION",
  "CLM-URBANHERM-HORSE-LORDS-TRUTHERS-VIDEO",
  "CLM-URBANHERM-EIGHTH-STREET-TUNNEL-PROGRAM",
  "CLM-URBANHERM-NYCAC-PUBLIC-SPEAKER-ATTRIBUTION",
  "CLM-URBANHERM-KCTH-TIRE-PICKUP-PARTICIPATION"
];

check(
  "Lifecycle integration",
  "The pass reaches intake, sources, assertions, claims, tasks, and inquiries",
  10,
  intakeById.has("INT-URBANHERM-X-FULL-POPULATION-2026") &&
    intakeById.has("INT-URBANHERM-X-MISSION-SOURCES-2026") &&
    sourceById.has("SRC-URBANHERM-X-CORPUS-2026-07-15") &&
    sourceById.has("SRC-URBANHERM-X-AUTHENTICATED-RESEARCH-2026-07-15") &&
    claimIds.every((id) => claimById.has(id)) &&
    taskById.has("TASK-URBANHERM-X-OWNER-ARCHIVE") &&
    taskById.has("TASK-URBANHERM-X-POSTED-SOURCE-MATURATION") &&
    taskById.has("TASK-URBANHERM-X-CREATIVE-ASSET-REVIEW") &&
    inquiryById.get("INQ-URBANHERM-X-FULL-POPULATION-2026")?.resultStatus ===
      "recovered" &&
    inquiryById.get("INQ-URBANHERM-X-POSTED-SOURCE-MATURATION-2026")
      ?.resultStatus === "partially-recovered"
);

const horseClaim = claimById.get(
  "CLM-URBANHERM-HORSE-LORDS-TRUTHERS-VIDEO"
);
const tunnelClaim = claimById.get(
  "CLM-URBANHERM-EIGHTH-STREET-TUNNEL-PROGRAM"
);
const coalitionClaim = claimById.get(
  "CLM-URBANHERM-NYCAC-PUBLIC-SPEAKER-ATTRIBUTION"
);
const tireClaim = claimById.get(
  "CLM-URBANHERM-KCTH-TIRE-PICKUP-PARTICIPATION"
);

check(
  "Source positioning and collective credit",
  "Independent sources strengthen narrow roles without inventing sole causation",
  8,
  horseClaim?.evidence.some(
    (evidence) => evidence.sourceId === "SRC-URBANHERM-NPR-HORSE-LORDS-2016"
  ) &&
    horseClaim.boundaries.some((boundary) => boundary.includes("M.C. Schmidt")) &&
    tunnelClaim?.evidence.some(
      (evidence) =>
        evidence.sourceId === "SRC-URBANHERM-KCUR-EIGHTH-STREET-TUNNEL-2016"
    ) &&
    coalitionClaim?.boundaries.some((boundary) =>
      boundary.includes("Julia Fredenburg")
    ) &&
    coalitionClaim?.antiClaims.includes("Jamie alone repealed the Cabaret Law.") &&
    sourceById
      .get("SRC-URBANHERM-BROOKLYN-EAGLE-NIGHTLIFE-2017")
      ?.doesNotEstablish.includes("Jamie's individual authorship or role") &&
    tireClaim?.antiClaims.includes("Jamie alone created or operated Tired of Tires.") &&
    includesAll(normalizedDocs, [
      "does not name Jamie or assign individual causation",
      "do not establish sole design"
    ])
);

const pageOccurrences = knowledgeBank.pages.flatMap(
  (page) => page.occurrences
);
const corpusSha256 = createHash("sha256").update(corpusText).digest("hex");
const prohibitedKeys = new Set([
  "text",
  "postText",
  "rawText",
  "body",
  "email",
  "phone",
  "cookie",
  "session",
  "credential",
  "directMessage"
]);

check(
  "Privacy and projection discipline",
  "The corpus is hash-locked and every new claim stays off public surfaces",
  6,
  corpusSha256 === expectedSha256 &&
    manifest.corpusSha256 === expectedSha256 &&
    !allObjectKeys(corpus).some((key) => prohibitedKeys.has(key)) &&
    !corpusText.includes("/Users/") &&
    !corpusText.includes("/Volumes/") &&
    corpus.publicSafety.status === "public-safe-metadata-only" &&
    claimIds.every(
      (id) =>
        claimById.get(id)?.projectionEligibility === "hold" &&
        claimById
          .get(id)
          ?.projections.every(
            (projection) =>
              projection.status === "hold" && projection.surfaces.length === 0
          )
    ) &&
    !pageOccurrences.some((occurrence) => claimIds.includes(occurrence.claimId)) &&
    normalizedDocs.includes("No new website route or portfolio projection was selected")
);

const possiblePoints = checks.reduce((sum, item) => sum + item.points, 0);
const earnedPoints = checks.reduce(
  (sum, item) => sum + (item.passes ? item.points : 0),
  0
);
const score = Math.round((earnedPoints / possiblePoints) * 100);
const failures = checks.filter((item) => !item.passes);

console.log(
  `Urbanhermit X corpus eval: ${score}/100 (criterion: 100, no failures)`
);
for (const dimension of [...new Set(checks.map((item) => item.dimension))]) {
  const group = checks.filter((item) => item.dimension === dimension);
  const earned = group.reduce(
    (sum, item) => sum + (item.passes ? item.points : 0),
    0
  );
  console.log(
    `- ${dimension}: ${earned}/${group.reduce((sum, item) => sum + item.points, 0)}`
  );
}

if (failures.length) {
  console.error("Urbanhermit X corpus gaps:");
  for (const item of failures) console.error(`- ${item.dimension}: ${item.label}`);
  process.exit(1);
}

console.log("Urbanhermit X corpus criterion met.");
