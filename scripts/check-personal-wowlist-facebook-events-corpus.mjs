#!/usr/bin/env node

import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const corpusPath =
  "docs/knowledge-bank/corpora/jamie-wowlist-facebook-events-full-population-2026-07-15.json";
const manifestPath =
  "docs/knowledge-bank/corpora/jamie-wowlist-facebook-events-full-population-2026-07-15.manifest.json";
const expectedCorpusSha256 =
  "0dc80da93b52bdbe2c01922720164783d18a1832b034ce44c69bea15d5f5bd60";
const expectedPublicIdSha256 =
  "f3f655c819fc2b80b15fcde1213eaf37cab2b8d26d01e1398e6bc5e11c412b29";
const expectedIds = [
  "10152721710031750",
  "10153218027900549",
  "10153298280050561",
  "10153308288768593",
  "10153329249353169",
  "10155459481930035",
  "1031906753551935",
  "129543367256632",
  "1416424718368443",
  "205659063162313",
  "278687849214415",
  "298498420264248",
  "314671892724189",
  "336325076507688",
  "464787083542664",
  "477366412348590",
  "515145431873418",
  "551536301637994",
  "653082538122515",
  "702417306475691"
];

function read(relativePath) {
  return readFileSync(path.join(repoRoot, relativePath), "utf8");
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
const events = corpus.events;
const eventIds = events.map((event) => event.id);
const publicIdSerialization = [...eventIds].sort().join("\n") + "\n";
const corpusSha256 = createHash("sha256").update(corpusText).digest("hex");
const publicIdSha256 = createHash("sha256")
  .update(publicIdSerialization)
  .digest("hex");

assert.equal(corpusSha256, expectedCorpusSha256);
assert.equal(manifest.corpusSha256, expectedCorpusSha256);
assert.equal(manifest.corpusBytes, Buffer.byteLength(corpusText));
assert.equal(publicIdSha256, expectedPublicIdSha256);
assert.equal(manifest.publicEventIdSet.sha256, expectedPublicIdSha256);
assert.deepEqual([...eventIds].sort(), expectedIds);
assert.equal(new Set(eventIds).size, expectedIds.length);

const personal = corpus.surfaces.personalHostedPast;
assert.equal(personal.displayedSlots, 21);
assert.equal(personal.publicSafeRecords, 20);
assert.equal(personal.privateWithheldSlots, 1);
assert.equal(personal.publicDetailPagesMaterialized, 19);
assert.equal(personal.publicDetailPagesUnavailable, 1);
assert.deepEqual(personal.replay.growthSequence, [3, 8, 13, 18, 21]);
assert.equal(personal.replay.terminalStableCount, 21);
assert.equal(personal.replay.consecutiveNoGrowthRounds, 8);
assert.equal(personal.replay.samePopulationOnSecondReplay, true);
assert.equal(personal.replay.protectedFullPopulationIdDigestPublished, false);
assert.equal(events.length, 20);
assert.equal(
  events.filter((event) => event.retrievalState === "retrieved").length,
  19
);
assert.equal(
  events.filter((event) => event.retrievalState === "detail-unavailable").length,
  1
);

const wowList = corpus.surfaces.wowListPage;
assert.equal(wowList.currentDisplayedEventRecords, 0);
assert.equal(wowList.pageEventsDisplay, "No events to show");
assert.ok(wowList.hostedPastDisplay.startsWith("Events you've hosted"));
assert.equal(manifest.population.wowListCurrentDisplayedEventRecords, 0);

const detailResponses = events
  .map((event) => event.responseSnapshot.detailResponded)
  .filter(Number.isFinite);
assert.equal(detailResponses.length, 19);
assert.equal(detailResponses.filter((value) => value > 0).length, 19);
assert.equal(detailResponses.filter((value) => value >= 10).length, 13);
assert.equal(detailResponses.filter((value) => value >= 20).length, 8);
assert.equal(detailResponses.filter((value) => value >= 100).length, 3);
assert.equal(corpus.responseDisplayAnalysis.recordsAtOrAbove10, 13);
assert.equal(corpus.responseDisplayAnalysis.recordsAtOrAbove20, 8);
assert.equal(corpus.responseDisplayAnalysis.recordsAtOrAbove100, 3);

const resources = corpus.postedResources.map((resource) => resource.url);
const eventResources = events.flatMap((event) => event.outboundResourceUrls);
assert.equal(resources.length, 16);
assert.equal(new Set(resources).size, 16);
assert.equal(new Set(eventResources).size, 16);
assert.ok(eventResources.every((url) => resources.includes(url)));
assert.equal(corpus.sourceRouteAnalysis.sourceArticlesRecovered, 0);

assert.equal(corpus.privateWithheldDisposition.count, 1);
assert.equal(
  corpus.privateWithheldDisposition.disposition,
  "private-event-withheld"
);
assert.deepEqual(corpus.privateWithheldDisposition.publishedIdentityFields, []);
assert.equal(corpus.publicSafety.rawDescriptionsPublished, false);
assert.equal(corpus.publicSafety.privateEventIdentityPublished, false);
assert.equal(corpus.publicSafety.residentialAddressesPublished, false);
assert.equal(corpus.publicSafety.phoneNumbersPublished, false);
assert.equal(corpus.publicSafety.attendeeOrGuestIdentitiesPublished, false);
assert.equal(corpus.publicSafety.commentsPublished, false);
assert.equal(corpus.publicSafety.authenticatedSessionStatePublished, false);
assert.equal(manifest.protectedPopulationDigestPublished, false);

const prohibitedKeys = new Set([
  "rawDescription",
  "privateEventId",
  "privateEventTitle",
  "residentialAddress",
  "phone",
  "phoneNumber",
  "attendeeIdentities",
  "guestIdentities",
  "comments",
  "cookie",
  "session",
  "credential",
  "directMessage",
  "sourceEventId"
]);
assert.ok(!allObjectKeys(corpus).some((key) => prohibitedKeys.has(key)));
assert.ok(!corpusText.includes("/Users/"));
assert.ok(!corpusText.includes("/Volumes/"));
assert.ok(!corpusText.includes("incorrect-collision-guard"));
assert.ok(!corpusText.includes("b24bd294f74fef5245120cd423d4ba8ae"));

const batch = read(
  "apps/www/src/data/knowledge-bank/batches/personal-wowlist-facebook-events-full-population-2026-07-15.ts"
);
const records = read("apps/www/src/data/knowledge-bank/records.ts");
const projectNote = read(
  "docs/knowledge-bank/projects/personal-facebook-events.md"
);
const sundayDinner = read("docs/knowledge-bank/projects/sunday-dinner.md");
const normalizedProjectNote = projectNote.replace(/\s+/g, " ");
assert.ok(batch.includes("CLM-PERSONAL-FACEBOOK-EVENT-POPULATION"));
assert.ok(batch.includes("CLM-SUNDAY-DINNER-FACEBOOK-MILESTONES"));
assert.ok(batch.includes("CLM-WATER-FACEBOOK-PLANNING-SENDOFF"));
assert.ok(batch.includes("CLM-NTER-CHNG-FACEBOOK-EVENT-TRACE"));
assert.ok(
  records.includes("personalWowListFacebookEventsFullPopulationBatch20260715")
);
assert.ok(normalizedProjectNote.includes("complete current-interface accounting"));
assert.ok(normalizedProjectNote.includes("not physical attendance, unique people"));
assert.ok(sundayDinner.includes("Unresolved chronology"));
assert.ok(sundayDinner.includes("must be reconciled"));

console.log(
  JSON.stringify(
    {
      status: "pass",
      personalDisplayedSlots: 21,
      publicEvents: 20,
      privateWithheldSlots: 1,
      wowListCurrentEvents: 0,
      publicIdSha256,
      corpusSha256
    },
    null,
    2
  )
);
