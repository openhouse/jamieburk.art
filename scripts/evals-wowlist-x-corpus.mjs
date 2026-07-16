#!/usr/bin/env node

import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { knowledgeBank } from "../apps/www/src/data/knowledge-bank/records.ts";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function read(relativePath) {
  return readFileSync(path.join(repoRoot, relativePath), "utf8");
}

function includesAll(source, values) {
  return values.every((value) => source.includes(value));
}

function validUrl(value) {
  try {
    return ["http:", "https:"].includes(new URL(value).protocol);
  } catch {
    return false;
  }
}

const corpusText = read("docs/knowledge-bank/corpora/wowlist-x-public-corpus.json");
const corpus = JSON.parse(corpusText);
const receipt = read("docs/knowledge-bank/intake/2026-07-15-wowlist-x-full-population.md");
const projectNote = read("docs/knowledge-bank/projects/wowlist.md");
const caseStudy = read("apps/www/src/content/work/wowlist.mdx");
const moduleSource = read("apps/www/src/data/knowledge-bank/wowlist-x-corpus.ts");
const normalizedReceipt = receipt.replace(/\s+/g, " ");
const normalizedProjectNote = projectNote.replace(/\s+/g, " ");

const checks = [];

function check(dimension, label, points, passes, hard = true) {
  checks.push({ dimension, label, points, passes: Boolean(passes), hard });
}

const records = corpus.records;
const accountPosts = records.filter((record) => record.relationship === "account-post");
const accountReplies = records.filter((record) => record.relationship === "account-reply");
const reposts = records.filter((record) => record.relationship === "repost");
const accountAuthored = records.filter((record) => record.relationship !== "repost");
const statusIds = records.map((record) => record.statusId);

check(
  "Population accounting",
  "The surviving 38-item profile control is recovered without a residual",
  12,
  corpus.sourceProfile === "https://x.com/wowlist" &&
    corpus.populationAudit.profileCountObserved === 38 &&
    corpus.populationAudit.uniqueItemsRecovered === 38 &&
    corpus.populationAudit.unresolvedPopulationSlots === 0 &&
    corpus.populationAudit.dispositionTotal === 38 &&
    records.length === 38 &&
    new Set(statusIds).size === 38
);

check(
  "Population accounting",
  "Account posts, replies, and reposts reconcile exactly",
  10,
  accountPosts.length === 16 &&
    accountReplies.length === 6 &&
    reposts.length === 16 &&
    accountAuthored.length === 22 &&
    new Set(reposts.map((record) => record.authorHandle)).size === 13
);

check(
  "Record integrity",
  "Every status record has a stable public URL, relationship, date, summary, and counter owner",
  8,
  records.every((record) =>
    /^\d+$/.test(record.statusId) &&
    validUrl(record.statusUrl) &&
    record.statusUrl.endsWith(`/status/${record.statusId}`) &&
    ["account-post", "account-reply", "repost"].includes(record.relationship) &&
    /^\d{4}-\d{2}-\d{2}T/.test(record.publishedAt) &&
    record.contentSummary.length > 20 &&
    ["wowlist-status", "source-status"].includes(record.metricOwner) &&
    ["replies", "reposts", "likes"].every(
      (key) => Number.isInteger(record.visibleMetricsObserved2026[key]) && record.visibleMetricsObserved2026[key] >= 0
    )
  )
);

check(
  "Public support",
  "All six surviving replies are classified as support or onboarding",
  10,
  accountReplies.length === 6 &&
    accountReplies.every((record) => record.primaryTheme === "product-support-and-onboarding") &&
    new Set(accountReplies.map((record) => record.statusId)).size === 6 &&
    corpus.aggregateFindings.directProductSupportReplies === 6
);

const links = records.flatMap((record) => record.outboundLinks);
const shortUrls = links.map((link) => link.shortUrl);
const destinationUrls = links.map((link) => link.destinationUrl);

check(
  "URL inventory",
  "Every shortened link is dispositioned to the expected destination population",
  12,
  links.length === 35 &&
    new Set(shortUrls).size === 35 &&
    new Set(destinationUrls).size === 34 &&
    links.every((link) => validUrl(link.shortUrl) && validUrl(link.destinationUrl)) &&
    corpus.aggregateFindings.shortUrlOccurrences === 35 &&
    corpus.aggregateFindings.uniqueResolvedDestinations === 34 &&
    corpus.aggregateFindings.uniqueProjectOrLineageDestinations === 19
);

const themeCounts = Object.fromEntries(
  [...new Set(records.map((record) => record.primaryTheme))].map((theme) => [
    theme,
    records.filter((record) => record.primaryTheme === theme).length
  ])
);

check(
  "Mission patterns",
  "Support, distribution, scene knowledge, product community, and civic care reproduce from records",
  10,
  themeCounts["product-support-and-onboarding"] === 6 &&
    themeCounts["event-distribution"] === 5 &&
    themeCounts["scene-knowledge-and-connection"] === 3 &&
    themeCounts["product-community-infrastructure"] === 3 &&
    themeCounts["civic-mobilization-and-care"] === 5 &&
    themeCounts["civic-care-amplification"] === 5 &&
    themeCounts["platform-use-and-event-amplification"] === 5 &&
    themeCounts["community-scene-context"] === 6
);

const accountCounterTotals = accountAuthored.reduce(
  (totals, record) => {
    const metrics = record.visibleMetricsObserved2026;
    totals.replies += metrics.replies;
    totals.reposts += metrics.reposts;
    totals.likes += metrics.likes;
    if (metrics.replies + metrics.reposts + metrics.likes > 0) totals.nonzero += 1;
    return totals;
  },
  { replies: 0, reposts: 0, likes: 0, nonzero: 0 }
);

check(
  "Traction boundary",
  "Only account-authored mutable counters are aggregated, with non-impact language",
  8,
  accountCounterTotals.replies === 2 &&
    accountCounterTotals.reposts === 20 &&
    accountCounterTotals.likes === 21 &&
    accountCounterTotals.nonzero === 12 &&
    includesAll(normalizedReceipt, [
      "mutable counter events, not unique people",
      "sentiment, endorsement, adoption, or impact",
      "source-post counters are retained at record level but are not aggregated"
    ])
);

const sourceById = new Map(knowledgeBank.sources.map((source) => [source.id, source]));
const claimById = new Map(knowledgeBank.claims.map((claim) => [claim.id, claim]));
const inquiryById = new Map(knowledgeBank.researchInquiries.map((inquiry) => [inquiry.id, inquiry]));
const intake = knowledgeBank.intakeItems.find(
  (item) => item.id === "INTAKE-2026-07-15-WOWLIST-X-FULL-POPULATION"
);
const supportClaim = claimById.get("CLM-WOWLIST-X-PUBLIC-SUPPORT-SURFACE");
const inquiry = inquiryById.get("INQ-WOWLIST-X-FULL-POPULATION-2026");

check(
  "Lifecycle integration",
  "The intake reaches sources, atomic observations, bounded claims, and a completed inquiry",
  10,
  intake?.sourceIds.length === 11 &&
    intake.observationIds.length === 7 &&
    intake.claimIds.length === 4 &&
    intake.researchInquiryIds.length === 1 &&
    sourceById.has("SRC-WOWLIST-X-FULL-POPULATION-2026-07-15") &&
    intake.observationIds.every((id) =>
      knowledgeBank.observations.some((item) => item.id === id)
    ) &&
    supportClaim?.status === "confirmed-with-boundary" &&
    inquiry?.resultStatus === "recovered"
);

check(
  "Source positioning",
  "Mission sources are ingested without becoming WOW List coverage or ownership claims",
  8,
  sourceById.get("SRC-WOWLIST-GRASSTRONAUT-IN-EVERY-TOWN-2015")?.doesNotEstablish.includes("press coverage or endorsement of WOW List") &&
    sourceById.get("SRC-WOWLIST-GOOD-TIMES-ZINES-2015")?.doesNotEstablish.includes("press coverage or endorsement of WOW List") &&
    sourceById.get("SRC-WOWLIST-KQED-GHOST-SHIP-VIGIL-2016")?.doesNotEstablish.includes("WOW List organization of the vigil") &&
    sourceById.get("SRC-WOWLIST-MEOW-WOLF-DIY-FUND-2016")?.doesNotEstablish.includes("WOW List organization of the fund") &&
    includesAll(normalizedProjectNote, [
      "not coverage",
      "not a native X export or deletion history",
      "not unique people or identified stakeholder accounts"
    ])
);

check(
  "Projection discipline",
  "The site selects the support result while the corpus keeps the deeper archive and boundaries",
  12,
  includesAll(caseStudy, [
    'claimId="CLM-WOWLIST-X-PUBLIC-SUPPORT-SURFACE"',
    'occurrenceId="public-support-surface"',
    "complete census of the 38 records",
    "not a platform export or deletion history"
  ]) &&
    includesAll(moduleSource, [
      "Jamie personally wrote all six replies",
      "Reposting proves partnership, endorsement, reach, or impact",
      "Authentication state, private messages, private analytics, and credentials were excluded"
    ]) &&
    includesAll(normalizedReceipt, [
      "Do not project the number 38 as an impact metric",
      "one sentence for `/work/wowlist`"
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

console.log(`WOW List X corpus eval: ${score}/100 (criterion: >= ${threshold}, no hard failures)`);

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
  console.error("WOW List X corpus gaps:");
  for (const item of failures) {
    console.error(`- ${item.hard ? "HARD " : ""}${item.dimension}: ${item.label}`);
  }
}

if (score < threshold || hardFailures.length) process.exit(1);

console.log("WOW List X corpus criterion met.");
