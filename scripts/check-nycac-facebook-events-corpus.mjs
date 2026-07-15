#!/usr/bin/env node

import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const corpusPath =
  "docs/knowledge-bank/corpora/nycartc-facebook-events-full-population-2026-07-15.json";
const manifestPath =
  "docs/knowledge-bank/corpora/nycartc-facebook-events-full-population-2026-07-15.manifest.json";
const expectedCorpusSha256 =
  "64af7b2f1804b3b319de2f5eef60bfb01371ce5209c8497473f800a334c66555";
const expectedIdSha256 =
  "b9e63a508958e7b7ed71236803aef60bc597123b1ff5c497550df90c80fe09fc";

function read(relativePath) {
  return readFileSync(path.join(repoRoot, relativePath), "utf8");
}

function countBy(items, selector) {
  return items.reduce((counts, item) => {
    const key = selector(item);
    counts[key] = (counts[key] ?? 0) + 1;
    return counts;
  }, {});
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
const manifest = JSON.parse(read(manifestPath));
const corpusSha256 = createHash("sha256").update(corpusText).digest("hex");
const events = corpus.events;
const eventIds = events.map((event) => event.id);
const eventIdSha256 = createHash("sha256")
  .update([...eventIds].sort().join("\n"))
  .digest("hex");

assert.equal(corpus.page.handle, "nycartc");
assert.equal(corpus.page.selectedSurface, "Past Events");
assert.equal(corpusSha256, expectedCorpusSha256);
assert.equal(manifest.corpusSha256, expectedCorpusSha256);
assert.equal(manifest.corpusBytes, Buffer.byteLength(corpusText));
assert.equal(eventIdSha256, expectedIdSha256);
assert.equal(manifest.sortedEventIdSha256, expectedIdSha256);
assert.equal(manifest.currentReplay.sortedEventIdSha256, expectedIdSha256);

const population = corpus.populationReconciliation;
assert.equal(population.pageDisplayedPastEventCount, 34);
assert.equal(population.recoveredIndexEventCount, 33);
assert.equal(population.recoveredDetailEventCount, 33);
assert.equal(population.detailRetrievalFailureCount, 0);
assert.equal(population.unmaterializedCount, 1);
assert.equal(events.length, 33);
assert.equal(new Set(eventIds).size, 33);
assert.equal(manifest.pageDisplayedPastEventSlots, 34);
assert.equal(manifest.recoveredEventRecords, 33);
assert.equal(manifest.unresolvedControlSlots, 1);
assert.equal(manifest.currentReplay.recoveredEventRecords, 33);
assert.deepEqual(manifest.currentReplay.growthSequence, [24, 32, 33]);

assert.deepEqual(countBy(events, (event) => event.date.slice(0, 4)), {
  2017: 17,
  2018: 3,
  2019: 6,
  2020: 6,
  2021: 1
});
assert.equal(
  events.filter(
    (event) => event.relationToPage === "index-displayed-nycac-organizer"
  ).length,
  24
);
assert.equal(
  events.filter((event) => event.relationToPage === "allied-or-cohosted-listing")
    .length,
  9
);

const recurringMeetingIds = new Set([
  "406505576359490",
  "1833265643557435",
  "212427345900529",
  "835861356564686",
  "107158013279474",
  "144317939631393",
  "383292402137451",
  "468698540318956",
  "149896349250651",
  "373845436658926",
  "1371973329662017",
  "772824526895291"
]);
const recurring = events.filter((event) => recurringMeetingIds.has(event.id));
const physicalRecurring = recurring.filter(
  (event) => event.venueCategory !== "virtual"
);
assert.equal(recurring.length, 12);
assert.equal(physicalRecurring.length, 10);
assert.equal(new Set(physicalRecurring.map((event) => event.venue)).size, 10);

const topicCounts = {};
for (const event of events) {
  for (const topic of event.topics) {
    topicCounts[topic] = (topicCounts[topic] ?? 0) + 1;
  }
}
assert.deepEqual(topicCounts, {
  "participatory-convening": 29,
  "government-interface": 15,
  "cultural-planning": 12,
  "safety-and-compliance": 12,
  "cabaret-law-repeal": 11,
  "commercial-rent-and-displacement": 10,
  "cultural-space-defense": 8,
  "nightlife-governance": 7,
  "mutual-aid-and-relief": 6,
  "march-enforcement": 5,
  "cultural-fundraising": 1
});

const responses = events.filter(
  (event) => typeof event.responseSnapshot?.pointEstimate === "number"
);
assert.equal(responses.length, 32);
assert.equal(
  responses.filter((event) => event.responseSnapshot.pointEstimate >= 100).length,
  19
);
assert.equal(
  responses.filter((event) => event.responseSnapshot.pointEstimate >= 500).length,
  7
);
assert.equal(
  responses.filter((event) => event.responseSnapshot.pointEstimate >= 1000).length,
  3
);

assert.equal(corpus.postedSourceArticles.length, 7);
assert.deepEqual(
  corpus.postedSourceArticles.map((article) => article.publisher),
  [
    "New York Post",
    "WNYC",
    "Metro",
    "The New Yorker",
    "The Baffler",
    "Curbed",
    "Gothamist"
  ]
);
assert.equal(
  events.reduce((sum, event) => sum + event.withheldOutboundLinkCount, 0),
  13
);

const recheck = population.detailAvailabilityRecheck;
assert.equal(recheck.recoveredEventIdCount, 33);
assert.equal(recheck.recoveredDetailCount, 28);
assert.equal(recheck.temporarilyUnavailableDetailCount, 5);
assert.equal(recheck.temporarilyUnavailableEventIds.length, 5);

assert.equal(corpus.publicSafety.rawDescriptionsPublished, false);
assert.equal(corpus.publicSafety.attendeeIdentitiesPublished, false);
assert.equal(corpus.publicSafety.contactDetailsPublished, false);
assert.equal(corpus.publicSafety.accessCredentialsPublished, false);
assert.ok(
  !allObjectKeys(corpus).some((key) =>
    new Set([
      "rawDescription",
      "attendeeIdentities",
      "comments",
      "email",
      "phone",
      "cookie",
      "session",
      "credential",
      "directMessage"
    ]).has(key)
  )
);
assert.ok(!corpusText.includes("/Users/"));
assert.ok(!corpusText.includes("/Volumes/"));

console.log(
  JSON.stringify(
    {
      status: "pass",
      displayedControlSlots: 34,
      recoveredEvents: 33,
      unresolvedControlSlots: 1,
      eventIdSha256,
      corpusSha256
    },
    null,
    2
  )
);
