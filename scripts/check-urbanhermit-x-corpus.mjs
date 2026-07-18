#!/usr/bin/env node

import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import {
  urbanhermitMissionSignalRules
} from "./lib/urbanhermit-mission-classifier.mjs";

const corpusPath =
  "docs/knowledge-bank/corpora/urbanhermit-x-full-population-2026-07-15.json";
const manifestPath =
  "docs/knowledge-bank/corpora/urbanhermit-x-full-population-2026-07-15.manifest.json";
const expectedCorpusSha256 =
  "9fedab737b1e4d6ded779942203d4a77272fe0120663f50402c81bdbcdc0c455";

const corpusText = readFileSync(corpusPath, "utf8");
const corpus = JSON.parse(corpusText);
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
const corpusSha256 = createHash("sha256").update(corpusText).digest("hex");

function countBy(values, field) {
  return Object.fromEntries(
    [...new Set(values.map((value) => value[field]))]
      .sort()
      .map((key) => [key, values.filter((value) => value[field] === key).length])
  );
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

const records = corpus.records;
const population = corpus.populationReconciliation;
const accountAuthored = records.filter(
  (record) => record.sourceAuthorship === "account-authored"
);
const externalReposts = records.filter(
  (record) => record.sourceAuthorship === "external-source-native-repost"
);
const statusUrls = records.map((record) => record.url);

assert.equal(corpus.account, "@urbanhermit");
assert.equal(corpusSha256, expectedCorpusSha256);
assert.equal(manifest.corpusSha256, expectedCorpusSha256);
assert.equal(manifest.profileReportedPosts, 434);
assert.equal(manifest.corpusItems, 434);

assert.equal(population.profileReportedPostCount, 434);
assert.equal(population.recoveredUnionRecordCount, 434);
assert.equal(population.recoveredPopulationReviewedPercent, 100);
assert.equal(population.profileCountNotMaterialized, 0);
assert.equal(records.length, 434);
assert.equal(new Set(statusUrls).size, 434);
assert.ok(
  statusUrls.every((url) => /^https:\/\/x\.com\/[A-Za-z0-9_]+\/status\/\d+$/.test(url))
);
assert.deepEqual(countBy(records, "recordType"), {
  original: 340,
  reply: 13,
  repost: 81
});
assert.equal(accountAuthored.length, 353);
assert.equal(externalReposts.length, 81);
assert.equal(population.postsTimelineUniqueCount, 421);
assert.equal(population.repliesTimelineRenderedArticleCount, 436);
assert.equal(population.repliesTimelineConversationContextCount, 2);
assert.equal(population.repliesTimelinePrimaryRecordCount, 434);
assert.equal(corpus.conversationContextRecords.length, 2);
assert.ok(
  corpus.conversationContextRecords.every(
    (record) =>
      record.contextType ===
        "conversation-parent-excluded-from-profile-population" &&
      record.authorHandle !== "@urbanhermit"
  )
);

const allLinks = records.flatMap((record) => record.externalLinks ?? []);
const accountAuthoredLinks = accountAuthored.flatMap(
  (record) => record.externalLinks ?? []
);
assert.equal(records.filter((record) => record.externalLinks?.length).length, 277);
assert.equal(allLinks.length, 349);
assert.equal(new Set(allLinks.map((link) => link.shortUrl)).size, 321);
assert.equal(accountAuthoredLinks.length, 292);
assert.equal(new Set(accountAuthoredLinks.map((link) => link.shortUrl)).size, 277);

const fixtureRuleManifest = corpus.missionSignalClassification.rules;
const codeRuleManifest = urbanhermitMissionSignalRules.map((rule) => ({
  signalId: rule.id,
  pattern: rule.pattern.source,
  flags: rule.pattern.flags
}));
assert.deepEqual(fixtureRuleManifest, codeRuleManifest);

const signalCounts = Object.fromEntries(
  urbanhermitMissionSignalRules.map((rule) => [
    rule.id,
    records.filter((record) => record.missionSignals.includes(rule.id)).length
  ])
);
assert.deepEqual(signalCounts, {
  "community-platforms-and-gatherings": 35,
  "civic-participation-and-service": 8,
  "cultural-space-advocacy": 45,
  "public-history-place-and-waterways": 2,
  "creative-technology-and-media": 4,
  "neighborhood-mutual-aid": 1
});
assert.deepEqual(signalCounts, corpus.publishingPattern.missionSignalRecordCounts);
assert.ok(
  records.every(
    (record) =>
      record.missionSignals.length === record.missionSignalEvidence.length &&
      record.missionSignalEvidence.every(
        (evidence) =>
          record.missionSignals.includes(evidence.signalId) &&
          corpus.missionSignalClassification.inputFields.includes(
            evidence.inputField
          ) &&
          typeof evidence.matchedValue === "string" &&
          evidence.matchedValue.length > 0
      ) &&
      /^[a-f0-9]{64}$/.test(record.classificationInputDigest)
  )
);

const stakeholderRecords = corpus.stakeholderInventory.records;
const missionThirdParty = stakeholderRecords.filter(
  (record) => record.classification === "mission-relevant-third-party"
);
const missionContexts = stakeholderRecords.filter(
  (record) => record.classification === "mission-relevant-conversation-context"
);
const contextLimited = stakeholderRecords.filter(
  (record) => record.classification === "context-limited-personal-or-network"
);
assert.equal(stakeholderRecords.length, 26);
assert.equal(missionThirdParty.length, 15);
assert.equal(new Set(missionThirdParty.map((record) => record.authorHandle)).size, 9);
assert.equal(missionContexts.length, 2);
assert.equal(contextLimited.length, 9);
assert.ok(
  contextLimited.every(
    (record) =>
      Object.keys(record).sort().join(",") ===
        "classification,publicDisposition,redactionId,stakeholderGroup" &&
      /^context-limited-\d{2}$/.test(record.redactionId) &&
      record.publicDisposition ===
        "identity-date-and-metrics-withheld-as-non-mission-personal-context"
  )
);

const engagement = accountAuthored.reduce(
  (totals, record) => {
    const metrics = record.visibleEngagement;
    totals.likes += metrics.likes;
    totals.replies += metrics.replies;
    totals.reposts += metrics.reposts;
    totals.bookmarks += metrics.bookmarks;
    totals.views += metrics.views;
    if (
      metrics.likes +
        metrics.replies +
        metrics.reposts +
        metrics.bookmarks +
        metrics.views >
      0
    ) {
      totals.nonzero += 1;
    }
    return totals;
  },
  { likes: 0, replies: 0, reposts: 0, bookmarks: 0, views: 0, nonzero: 0 }
);
assert.deepEqual(engagement, {
  likes: 175,
  replies: 8,
  reposts: 60,
  bookmarks: 0,
  views: 0,
  nonzero: 85
});

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
assert.ok(!allObjectKeys(corpus).some((key) => prohibitedKeys.has(key)));
assert.ok(!corpusText.includes("/Users/"));
assert.ok(!corpusText.includes("/Volumes/"));
assert.ok(!corpusText.toLowerCase().includes("impressions"));
assert.equal(corpus.publicSafety.status, "public-safe-metadata-only");

console.log(
  JSON.stringify(
    {
      status: "pass",
      profileReportedPosts: 434,
      recoveredRecords: 434,
      accountAuthoredRecords: 353,
      externalSourceReposts: 81,
      distinctPostedShortUrls: 321,
      missionRelevantIncomingRecords: 15,
      missionRelevantIncomingAccounts: 9,
      profileCountRecoveryGap: 0,
      corpusSha256
    },
    null,
    2
  )
);
