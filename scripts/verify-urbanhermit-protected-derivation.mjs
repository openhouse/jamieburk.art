import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";

import {
  classifyUrbanhermitMissionSignals,
  extractUrbanhermitSourcePostBody,
  urbanhermitMissionSignalManifest,
  urbanhermitSourceBodyExternalLinks
} from "./lib/urbanhermit-mission-classifier.mjs";
import { assertUrbanhermitPublicAggregateShape } from "./lib/urbanhermit-public-aggregate-schema.mjs";

const args = Object.fromEntries(process.argv.slice(2).reduce((pairs, value, index, values) => {
  if (value.startsWith("--")) pairs.push([value.slice(2), values[index + 1]]);
  return pairs;
}, []));
for (const required of ["population", "incoming", "dispositions", "fixture", "manifest"]) {
  if (!args[required]) throw new Error(`Missing --${required}`);
}

const readJson = (path) => JSON.parse(readFileSync(path, "utf8"));
const sha256 = (value) => createHash("sha256").update(value).digest("hex");
const canonicalIdSetDigest = (rows) => sha256(rows.map(({ statusId }) => statusId).toSorted().join("\n"));
const canonicalJson = (value) => {
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
  if (value && typeof value === "object") return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonicalJson(value[key])}`).join(",")}}`;
  return JSON.stringify(value);
};

const population = readJson(args.population);
const incoming = readJson(args.incoming);
const dispositions = readJson(args.dispositions);
const fixture = assertUrbanhermitPublicAggregateShape(readJson(args.fixture));
const manifest = readJson(args.manifest);

assert.equal(population.account, "@urbanhermit");
assert.equal(incoming.account, "@urbanhermit");
assert.equal(population.rows.length, population.profile.reportedPostCount);
assert.equal(new Set(population.rows.map(({ statusId }) => statusId)).size, population.rows.length);
assert.equal(new Set(incoming.rows.map(({ statusId }) => statusId)).size, incoming.rows.length);

const dispositionById = new Map(dispositions.map((item) => [item.statusId, item]));
assert.equal(dispositionById.size, incoming.rows.length, "Every incoming record needs exactly one protected disposition");
assert.deepEqual([...dispositionById.keys()].toSorted(), incoming.rows.map(({ statusId }) => statusId).toSorted());

const compactCount = (label = "", singular, plural = `${singular}s`) => {
  const match = label.match(new RegExp(`([\\d,.]+)\\s+(?:${singular}|${plural})`, "i"));
  return match ? Number(match[1].replace(/[,.]/g, "")) : 0;
};
const engagement = (label) => ({
  likes: compactCount(label, "like"),
  replies: compactCount(label, "reply", "replies"),
  reposts: compactCount(label, "repost"),
  bookmarks: compactCount(label, "bookmark"),
  views: compactCount(label, "view")
});
const countBy = (values, orderedKeys) => Object.fromEntries(orderedKeys.map((key) => [key, values.filter((value) => value === key).length]));

const records = population.rows.map((record) => {
  const sourceBody = extractUrbanhermitSourcePostBody(record);
  return {
    year: record.datetime.slice(0, 4),
    recordType: record.recordType,
    accountAuthored: record.author.toLowerCase() === "urbanhermit",
    links: urbanhermitSourceBodyExternalLinks(record, sourceBody),
    missionSignals: classifyUrbanhermitMissionSignals(record),
    engagement: engagement(record.interactionLabel)
  };
});
const authored = records.filter(({ accountAuthored }) => accountAuthored);
const links = records.flatMap(({ links: recordLinks }) => recordLinks);
const authoredLinks = authored.flatMap(({ links: recordLinks }) => recordLinks);
const missionSignalIds = urbanhermitMissionSignalManifest.map(({ signalId }) => signalId);
const stakeholderGroupIds = Object.keys(fixture.stakeholderInventory.stakeholderGroupCounts);
const incomingDispositions = incoming.rows.map(({ statusId }) => dispositionById.get(statusId));
const missionRelevant = incomingDispositions.filter(({ classification }) => classification === "mission-relevant-third-party");
const contextRecords = incomingDispositions.filter(({ classification }) => classification === "mission-relevant-conversation-context");
const contextLimited = incomingDispositions.filter(({ classification }) => classification === "context-limited-personal-or-network");
const engagementTotals = authored.reduce((totals, record) => {
  for (const key of Object.keys(totals)) totals[key] += record.engagement[key];
  return totals;
}, { likes: 0, replies: 0, reposts: 0, bookmarks: 0, views: 0 });

const derived = {
  populationReconciliation: {
    profileReportedPostCount: population.profile.reportedPostCount,
    postsTimelineUniqueCount: population.traversal.posts.uniquePrimaryRecords,
    repliesTimelineRenderedArticleCount: population.traversal.withReplies.renderedPrimaryAndContextCards,
    repliesTimelineConversationContextCount: population.traversal.excludedConversationContext.length,
    repliesTimelinePrimaryRecordCount: population.traversal.withReplies.renderedPrimaryAndContextCards - population.traversal.excludedConversationContext.length,
    recoveredUnionRecordCount: records.length,
    recoveredPopulationReviewedPercent: records.length / population.profile.reportedPostCount * 100,
    profileCountNotMaterialized: population.profile.reportedPostCount - records.length,
    dateRange: { earliestYear: Number(records.map(({ year }) => year).toSorted()[0]), latestYear: Number(records.map(({ year }) => year).toSorted().at(-1)) },
    traversalPasses: { posts: population.traversal.posts.passes, replies: population.traversal.withReplies.passes },
    repeatedNoGrowthPasses: { posts: population.traversal.posts.repeatedNoGrowthPasses, replies: population.traversal.withReplies.repeatedNoGrowthPasses },
    protectedRecordSetSha256: canonicalIdSetDigest(population.rows)
  },
  recordTypeCounts: countBy(records.map(({ recordType }) => recordType), ["original", "reply", "repost"]),
  recordsByYear: countBy(records.map(({ year }) => year), Object.keys(fixture.recordsByYear)),
  publishingPattern: {
    accountAuthoredRecordCount: authored.length,
    accountAuthoredOriginalCount: authored.filter(({ recordType }) => recordType === "original").length,
    accountAuthoredReplyCount: authored.filter(({ recordType }) => recordType === "reply").length,
    externalSourceNativeRepostRecordCount: records.filter(({ accountAuthored }) => !accountAuthored).length,
    recordsWithExternalLinks: records.filter(({ links: recordLinks }) => recordLinks.length).length,
    externalLinkOccurrences: links.length,
    distinctExternalShortUrls: new Set(links.map(({ shortUrl }) => shortUrl)).size,
    accountAuthoredExternalLinkOccurrences: authoredLinks.length,
    accountAuthoredDistinctExternalShortUrls: new Set(authoredLinks.map(({ shortUrl }) => shortUrl)).size,
    missionSignalRecordCounts: Object.fromEntries(missionSignalIds.map((id) => [id, records.filter(({ missionSignals }) => missionSignals.includes(id)).length]))
  },
  stakeholderInventory: {
    recoveredPublicIncomingRecordCount: incoming.rows.length,
    missionRelevantThirdPartyRecordCount: missionRelevant.length,
    missionRelevantThirdPartyAccountCount: new Set(missionRelevant.map(({ authorHandle }) => authorHandle)).size,
    missionRelevantConversationContextCount: contextRecords.length,
    contextLimitedRecordCount: contextLimited.length,
    protectedIncomingRecordSetSha256: canonicalIdSetDigest(incoming.rows),
    stakeholderGroupCounts: countBy(missionRelevant.map(({ stakeholderGroup }) => stakeholderGroup), stakeholderGroupIds)
  },
  visibleEngagementSnapshot: {
    accountAuthoredRecordsWithAnyDisplayedInteraction: authored.filter(({ engagement: metrics }) => Object.values(metrics).some((value) => value > 0)).length,
    accountAuthoredDisplayedInteractionTotals: engagementTotals
  },
  missionSignalManifestSha256: sha256(canonicalJson(urbanhermitMissionSignalManifest)),
  protectedDispositionSetSha256: sha256(canonicalJson(dispositions.toSorted((a, b) => a.statusId.localeCompare(b.statusId))))
};

const fixtureComparable = {
  populationReconciliation: Object.fromEntries(Object.keys(derived.populationReconciliation).map((key) => [key, fixture.populationReconciliation[key]])),
  recordTypeCounts: fixture.recordTypeCounts,
  recordsByYear: fixture.recordsByYear,
  publishingPattern: Object.fromEntries(Object.keys(derived.publishingPattern).map((key) => [key, fixture.publishingPattern[key]])),
  stakeholderInventory: Object.fromEntries(Object.keys(derived.stakeholderInventory).map((key) => [key, fixture.stakeholderInventory[key]])),
  visibleEngagementSnapshot: Object.fromEntries(Object.keys(derived.visibleEngagementSnapshot).map((key) => [key, fixture.visibleEngagementSnapshot[key]])),
  missionSignalManifestSha256: manifest.classifier.manifestSha256,
  protectedDispositionSetSha256: manifest.protectedInputs.stakeholderDispositionsSha256
};
assert.deepEqual(derived, fixtureComparable);
assert.equal(manifest.contractVersion, "urbanhermit-protected-derivation-v1");
assert.equal(manifest.revisionDate, fixture.generatedAt);
assert.equal(manifest.protectedInputs.populationIdSetSha256, derived.populationReconciliation.protectedRecordSetSha256);
assert.equal(manifest.protectedInputs.incomingIdSetSha256, derived.stakeholderInventory.protectedIncomingRecordSetSha256);
assert.equal(manifest.publicOutput.fixtureSha256, sha256(readFileSync(args.fixture, "utf8")));

const report = {
  status: "verified",
  contractVersion: manifest.contractVersion,
  revisionDate: manifest.revisionDate,
  account: fixture.account,
  liveProfilePopulation: derived.populationReconciliation.recoveredUnionRecordCount,
  recoveryGap: derived.populationReconciliation.profileCountNotMaterialized,
  protectedInputDigestsMatched: 3,
  classifierDigestMatched: true,
  publicFixtureDigestMatched: true,
  publicAggregateShape: "closed-and-valid",
  privacyBoundary: "No row-level content is emitted."
};
if (args.report) writeFileSync(args.report, `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report, null, 2));
