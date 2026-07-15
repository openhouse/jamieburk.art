import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const defaultFixturePath =
  "apps/www/src/data/knowledge-bank/fixtures/kctownhall-full-population.json";
const defaultManifestPath =
  "docs/knowledge-bank/corpora/kctownhall-x-full-population-2026-07-15.manifest.json";
const defaultAcquisitionLedgerPath =
  "docs/knowledge-bank/corpora/kctownhall-x-acquisition-ledger-2026-07-15.json";
const defaultUrlTriagePath =
  "docs/knowledge-bank/corpora/kctownhall-x-posted-url-triage-2026-07-15.json";

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

function captureRecord(record) {
  return {
    statusId: record.statusId,
    statusUrl: `https://x.com${record.statusPath}`,
    authorHandle: record.statusOwner,
    publishedAt: record.datetime,
    recordType: record.isRepost
      ? "repost"
      : record.isReply
        ? "reply"
        : "original",
    recoveredRoutes: [...record.recoveredRoutes].sort()
  };
}

export function buildPublicAcquisitionLedger(captureText) {
  const capture = JSON.parse(captureText);
  assert.equal(capture.profileReportedCount, 183);
  assert.equal(capture.postsRoute.length, 170);
  assert.equal(capture.repliesRoute.length, 188);
  assert.equal(capture.attributablePopulation.length, 183);
  assert.equal(capture.excludedConversationContext.length, 5);

  const primaryRecords = capture.attributablePopulation
    .map(captureRecord)
    .sort((a, b) => a.statusId.localeCompare(b.statusId));
  const contextRecords = capture.excludedConversationContext
    .map(captureRecord)
    .sort((a, b) => a.statusId.localeCompare(b.statusId));

  return {
    schemaVersion: 1,
    capturedAt: "2026-07-15",
    sourceCaptureSha256: sha256(captureText),
    captureSurfaces: [
      "https://x.com/KCTownHall",
      "https://x.com/KCTownHall/with_replies"
    ],
    profileObservation: {
      reportedPosts: capture.profileReportedCount,
      observedAt: capture.reviewedAt
    },
    routeObservations: {
      posts: {
        renderedPrimaryRecords: capture.postsRoute.length,
        repeatedNoGrowthPasses: 12,
        primaryStatusIds: capture.postsRoute
          .map((record) => record.statusId)
          .sort()
      },
      replies: {
        renderedCards: capture.repliesRoute.length,
        renderedPrimaryRecords: capture.attributablePopulation.length,
        renderedConversationContextCards:
          capture.excludedConversationContext.length,
        repeatedNoGrowthPasses: 14,
        primaryStatusIds: capture.attributablePopulation
          .map((record) => record.statusId)
          .sort(),
        conversationContextStatusIds: contextRecords.map(
          (record) => record.statusId
        )
      }
    },
    primaryRecords,
    conversationContextRecords: contextRecords,
    publicSafety: {
      retained: [
        "status identifiers and URLs",
        "public author handles",
        "publication timestamps",
        "record types",
        "route membership"
      ],
      excluded: [
        "post text",
        "historical phone numbers",
        "precise addresses",
        "link labels",
        "authentication identity",
        "cookies and session state",
        "private-account material"
      ]
    },
    limitation:
      "This public ledger preserves the redacted acquisition result and a digest of the private capture. It does not recreate deleted, private, liked, or platform-suppressed activity and cannot replay the authenticated browser session without the protected source capture."
  };
}

export function validateAcquisitionLedger(ledgerText, fixture) {
  const ledger = JSON.parse(ledgerText);
  inspectKeys(ledger);
  assert.equal(
    /\b\d{3}[-.) ]\s*\d{3}[- ]\d{4}\b/.test(ledgerText),
    false,
    "Historical phone number leaked into acquisition ledger"
  );
  assert.equal(ledger.profileObservation.reportedPosts, 183);
  assert.equal(ledger.routeObservations.posts.renderedPrimaryRecords, 170);
  assert.equal(ledger.routeObservations.replies.renderedCards, 188);
  assert.equal(
    ledger.routeObservations.replies.renderedConversationContextCards,
    5
  );
  assert.equal(ledger.primaryRecords.length, 183);
  assert.equal(ledger.conversationContextRecords.length, 5);

  const fixtureIds = fixture.records.map((record) => statusId(record.url)).sort();
  const ledgerIds = ledger.primaryRecords.map((record) => record.statusId).sort();
  assert.deepEqual(ledgerIds, fixtureIds);
  assert.deepEqual(
    ledger.routeObservations.posts.primaryStatusIds,
    fixture.records
      .filter((record) => record.recoveredFrom.includes("posts"))
      .map((record) => statusId(record.url))
      .sort()
  );
  assert.deepEqual(
    ledger.routeObservations.replies.primaryStatusIds,
    fixture.records
      .filter((record) => record.recoveredFrom.includes("replies"))
      .map((record) => statusId(record.url))
      .sort()
  );
  assert(
    ledger.publicSafety.excluded.includes("post text") &&
      ledger.publicSafety.excluded.includes("historical phone numbers")
  );
  return ledger;
}

export function validateUrlTriage(triageText, fixture) {
  const triage = JSON.parse(triageText);
  inspectKeys(triage);
  assert.equal(triage.items.length, 31);
  assert.equal(new Set(triage.items.map((item) => item.shortUrl)).size, 31);
  assert.deepEqual(
    triage.items.map((item) => item.shortUrl).sort(),
    fixture.postedUrlInventory.distinctLinks
      .map((item) => item.shortUrl)
      .sort()
  );
  assert(
    triage.items.every(
      (item) =>
        ["promoted-source", "operational-link-family", "research-inquiry"].includes(
          item.disposition
        ) &&
        ((item.sourceIds?.length ?? 0) > 0 ||
          (item.inquiryIds?.length ?? 0) > 0)
    )
  );
  assert.deepEqual(triage.dispositionCounts, countBy(triage.items.map((item) => item.disposition)));
  return triage;
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

export function buildManifest(
  fixturePath,
  fixtureText,
  acquisitionLedgerPath,
  acquisitionLedgerText,
  urlTriagePath,
  urlTriageText,
  metrics
) {
  const ids = JSON.parse(fixtureText).records
    .map((record) => statusId(record.url))
    .sort();

  return {
    schemaVersion: 2,
    generatedAt: "2026-07-15T16:30:00-04:00",
    generator: "scripts/derive-kctownhall-x-corpus.mjs --write",
    corpus: fixturePath,
    corpusSha256: sha256(fixtureText),
    acquisitionLedger: acquisitionLedgerPath,
    acquisitionLedgerSha256: sha256(acquisitionLedgerText),
    postedUrlTriage: urlTriagePath,
    postedUrlTriageSha256: sha256(urlTriageText),
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
  manifest,
  acquisitionLedgerPath = defaultAcquisitionLedgerPath,
  acquisitionLedgerText = readFileSync(defaultAcquisitionLedgerPath, "utf8"),
  urlTriagePath = defaultUrlTriagePath,
  urlTriageText = readFileSync(defaultUrlTriagePath, "utf8")
) {
  const metrics = validateFixture(fixtureText);
  const fixture = JSON.parse(fixtureText);
  validateAcquisitionLedger(acquisitionLedgerText, fixture);
  validateUrlTriage(urlTriageText, fixture);
  assert.deepEqual(
    manifest,
    buildManifest(
      fixturePath,
      fixtureText,
      acquisitionLedgerPath,
      acquisitionLedgerText,
      urlTriagePath,
      urlTriageText,
      metrics
    )
  );
  return metrics;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const write = process.argv.includes("--write");
  const acquisitionSourceFlag = process.argv.indexOf(
    "--write-acquisition-from"
  );
  const acquisitionSourcePath =
    acquisitionSourceFlag >= 0 ? process.argv[acquisitionSourceFlag + 1] : null;
  const excludedArgs = new Set([
    "--write",
    "--check",
    "--write-acquisition-from",
    acquisitionSourcePath
  ]);
  const paths = process.argv.slice(2).filter((value) => !excludedArgs.has(value));
  const fixturePath = paths[0] ?? defaultFixturePath;
  const manifestPath = paths[1] ?? defaultManifestPath;
  const acquisitionLedgerPath = paths[2] ?? defaultAcquisitionLedgerPath;
  const urlTriagePath = paths[3] ?? defaultUrlTriagePath;
  const fixtureText = readFileSync(fixturePath, "utf8");
  const metrics = validateFixture(fixtureText);

  if (acquisitionSourcePath) {
    const acquisitionLedger = buildPublicAcquisitionLedger(
      readFileSync(acquisitionSourcePath, "utf8")
    );
    writeFileSync(
      acquisitionLedgerPath,
      `${JSON.stringify(acquisitionLedger, null, 2)}\n`
    );
  }

  const acquisitionLedgerText = readFileSync(acquisitionLedgerPath, "utf8");
  const urlTriageText = readFileSync(urlTriagePath, "utf8");
  validateAcquisitionLedger(acquisitionLedgerText, JSON.parse(fixtureText));
  validateUrlTriage(urlTriageText, JSON.parse(fixtureText));
  const manifest = buildManifest(
    fixturePath,
    fixtureText,
    acquisitionLedgerPath,
    acquisitionLedgerText,
    urlTriagePath,
    urlTriageText,
    metrics
  );

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
