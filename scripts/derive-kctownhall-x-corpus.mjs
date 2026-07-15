import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const defaultFixturePath =
  "apps/www/src/data/knowledge-bank/fixtures/kctownhall-full-population.json";
const defaultManifestPath =
  "docs/knowledge-bank/corpora/kctownhall-x-full-population-2026-07-15.manifest.json";

const prohibitedKeys = new Set([
  "address",
  "authenticatedAs",
  "cookie",
  "cookies",
  "phone",
  "privateMessage",
  "rawText",
  "session",
  "sessionData",
  "text"
]);

export function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function statusId(url) {
  return url.match(/\/status\/(\d+)/)?.[1];
}

function countBy(values) {
  return Object.fromEntries(
    [...new Set(values)].sort().map((value) => [
      value,
      values.filter((candidate) => candidate === value).length
    ])
  );
}

function inspectKeys(value, path = "root") {
  if (Array.isArray(value)) {
    value.forEach((item, index) => inspectKeys(item, `${path}[${index}]`));
    return;
  }
  if (!value || typeof value !== "object") return;

  for (const [key, child] of Object.entries(value)) {
    assert(!prohibitedKeys.has(key), `Prohibited key ${path}.${key}`);
    inspectKeys(child, `${path}.${key}`);
  }
}

export function deriveKcTownHallMetrics(fixture) {
  const records = fixture.records;
  const authored = records.filter(
    (record) => record.authorHandle === "@KCTownHall"
  );
  const externalLinks = records.flatMap((record) => record.externalLinks);
  const authoredExternalLinks = authored.flatMap(
    (record) => record.externalLinks
  );
  const engagedAuthored = authored.filter((record) =>
    Object.values(record.visibleEngagement).some((count) => count > 0)
  );
  const authoredEngagement = authored.reduce(
    (totals, record) => ({
      replies: totals.replies + record.visibleEngagement.replies,
      reposts: totals.reposts + record.visibleEngagement.reposts,
      likes: totals.likes + record.visibleEngagement.likes,
      bookmarks: totals.bookmarks + record.visibleEngagement.bookmarks
    }),
    { replies: 0, reposts: 0, likes: 0, bookmarks: 0 }
  );

  return {
    profileReported: fixture.populationReconciliation.profileReportedPostCount,
    postsTimelinePrimaryRecords:
      fixture.populationReconciliation.postsTimelineUniqueCount,
    repliesTimelineRenderedCards:
      fixture.populationReconciliation.repliesTimelineRenderedArticleCount,
    conversationContextCards:
      fixture.populationReconciliation.repliesTimelineConversationContextCount,
    renderedPrimaryRecords:
      fixture.populationReconciliation.recoveredUnionRecordCount,
    unresolvedCountDifference:
      fixture.populationReconciliation.profileCountNotMaterialized,
    recordTypes: countBy(records.map((record) => record.recordType)),
    accountAuthoredRecords: authored.length,
    recordsByYear: countBy(
      records.map((record) => record.publishedAt.slice(0, 4))
    ),
    tireRelatedRecords: records.filter((record) =>
      record.classifications.includes("tire-related")
    ).length,
    surveyLinkedRecords: records.filter((record) =>
      record.classifications.includes("survey-linked")
    ).length,
    recordsWithExternalLinks: records.filter(
      (record) => record.externalLinks.length > 0
    ).length,
    externalLinkOccurrences: externalLinks.length,
    distinctExternalShortUrls: new Set(
      externalLinks.map((link) => link.shortUrl)
    ).size,
    accountAuthoredRecordsWithExternalLinks: authored.filter(
      (record) => record.externalLinks.length > 0
    ).length,
    accountAuthoredExternalLinkOccurrences: authoredExternalLinks.length,
    accountAuthoredDistinctExternalShortUrls: new Set(
      authoredExternalLinks.map((link) => link.shortUrl)
    ).size,
    curatedMissionRelevantSources:
      fixture.postedUrlInventory.curatedMissionRelevantSources.length,
    directCouncilMemberAccounts:
      fixture.stakeholderResponseInventory.directCouncilMemberAccountCount,
    otherMissionRelevantStakeholderRecords:
      fixture.stakeholderResponseInventory.otherMissionRelevantRecords.length,
    accountAuthoredRecordsWithVisibleInteraction: engagedAuthored.length,
    accountAuthoredVisibleEngagement: authoredEngagement
  };
}

export function validateFixture(fixtureText) {
  const fixture = JSON.parse(fixtureText);
  inspectKeys(fixture);
  assert.equal(
    /\b\d{3}[-.) ]\s*\d{3}[- ]\d{4}\b/.test(fixtureText),
    false,
    "Historical phone number leaked into public fixture"
  );
  assert.equal(fixture.account, "@KCTownHall");
  assert.match(fixture.publicSafety, /post text.*excluded/i);

  assert.equal(fixture.records.length, 183);
  const ids = fixture.records.map((record) => statusId(record.url));
  assert(ids.every(Boolean));
  assert.equal(new Set(ids).size, 183);
  assert(
    fixture.records.every((record) =>
      ["original", "reply", "repost"].includes(record.recordType)
    )
  );
  assert(
    fixture.records.every((record) =>
      record.recoveredFrom.every((route) =>
        ["posts", "replies"].includes(route)
      )
    )
  );
  assert(
    fixture.records.every((record) =>
      record.externalLinks.every(
        (link) =>
          /^https:\/\/t\.co\//.test(link.shortUrl) &&
          typeof link.displayedDestination === "string"
      )
    )
  );
  assert.equal(fixture.conversationContextRecords.length, 5);
  assert(
    fixture.conversationContextRecords.every(
      (record) => record.authorHandle !== "@KCTownHall"
    )
  );

  const metrics = deriveKcTownHallMetrics(fixture);
  assert.deepEqual(metrics, {
    profileReported: 183,
    postsTimelinePrimaryRecords: 170,
    repliesTimelineRenderedCards: 188,
    conversationContextCards: 5,
    renderedPrimaryRecords: 183,
    unresolvedCountDifference: 0,
    recordTypes: { original: 142, reply: 13, repost: 28 },
    accountAuthoredRecords: 155,
    recordsByYear: {
      "2018": 30,
      "2019": 85,
      "2020": 41,
      "2021": 17,
      "2022": 10
    },
    tireRelatedRecords: 100,
    surveyLinkedRecords: 12,
    recordsWithExternalLinks: 118,
    externalLinkOccurrences: 133,
    distinctExternalShortUrls: 31,
    accountAuthoredRecordsWithExternalLinks: 115,
    accountAuthoredExternalLinkOccurrences: 130,
    accountAuthoredDistinctExternalShortUrls: 28,
    curatedMissionRelevantSources: 9,
    directCouncilMemberAccounts: 3,
    otherMissionRelevantStakeholderRecords: 4,
    accountAuthoredRecordsWithVisibleInteraction: 77,
    accountAuthoredVisibleEngagement: {
      replies: 22,
      reposts: 70,
      likes: 174,
      bookmarks: 1
    }
  });

  assert.deepEqual(
    fixture.recordTypeCounts,
    metrics.recordTypes
  );
  assert.deepEqual(fixture.recordsByYear, metrics.recordsByYear);
  assert.equal(
    fixture.publishingPattern.tireRelatedRecordCount,
    metrics.tireRelatedRecords
  );
  assert.equal(
    fixture.publishingPattern.surveyLinkedRecordCount,
    metrics.surveyLinkedRecords
  );
  assert.equal(
    fixture.visibleEngagementSnapshot.accountAuthoredDisplayedInteractionUnits,
    Object.values(metrics.accountAuthoredVisibleEngagement).reduce(
      (sum, value) => sum + value,
      0
    )
  );

  return metrics;
}

export function buildManifest(fixturePath, fixtureText, metrics) {
  const ids = JSON.parse(fixtureText).records
    .map((record) => statusId(record.url))
    .sort();

  return {
    schemaVersion: 1,
    generatedAt: "2026-07-15T16:30:00-04:00",
    generator: "scripts/derive-kctownhall-x-corpus.mjs --write",
    corpus: fixturePath,
    corpusSha256: sha256(fixtureText),
    canonicalStatusIdSetSha256: sha256(`${ids.join("\n")}\n`),
    profileReportedPosts: metrics.profileReported,
    corpusItems: metrics.renderedPrimaryRecords,
    profileCountNotMaterialized: metrics.unresolvedCountDifference,
    status: "complete-profile-reported-population"
  };
}

export function validateCommittedFixture(
  fixturePath,
  fixtureText,
  manifest
) {
  const metrics = validateFixture(fixtureText);
  assert.deepEqual(
    manifest,
    buildManifest(fixturePath, fixtureText, metrics)
  );
  return metrics;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const write = process.argv.includes("--write");
  const paths = process.argv
    .slice(2)
    .filter((value) => !["--write", "--check"].includes(value));
  const fixturePath = paths[0] ?? defaultFixturePath;
  const manifestPath = paths[1] ?? defaultManifestPath;
  const fixtureText = readFileSync(fixturePath, "utf8");
  const metrics = validateFixture(fixtureText);
  const manifest = buildManifest(fixturePath, fixtureText, metrics);

  if (write) {
    writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  } else {
    assert.deepEqual(
      JSON.parse(readFileSync(manifestPath, "utf8")),
      manifest
    );
  }
  process.stdout.write(`${JSON.stringify(metrics, null, 2)}\n`);
}
