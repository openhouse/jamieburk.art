#!/usr/bin/env node

import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { validateUrbanhermitCapture } from "./build-urbanhermit-x-public-ledger.mjs";
import {
  classifyUrbanhermitRecord,
  extractUrbanhermitSourcePostBody
} from "./lib/urbanhermit-mission-classifier.mjs";

const ledgerPath =
  "docs/knowledge-bank/corpora/urbanhermit-x-population-ledger-2026-07-15.json";
const manifestPath =
  "docs/knowledge-bank/corpora/urbanhermit-x-population-ledger-2026-07-15.manifest.json";
const ledgerText = readFileSync(ledgerPath, "utf8");
const ledger = JSON.parse(ledgerText);
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
const sha256 = (value) => createHash("sha256").update(value).digest("hex");

assert.equal(ledger.account, "@urbanhermit");
assert.equal(ledger.population.profileReported, 434);
assert.equal(ledger.population.recoveredAccountItems, 434);
assert.equal(ledger.population.recoveryGap, 0);
assert.equal(ledger.population.accountAuthored, 353);
assert.equal(ledger.population.externalSourceNativeReposts, 81);
assert.equal(ledger.population.accountAuthored + ledger.population.externalSourceNativeReposts, 434);
assert.equal(ledger.population.independentCompletePasses, 3);
assert.equal(ledger.population.allPassesRecoveredSamePopulation, true);
assert.equal(ledger.population.passStatusIdDigests.length, 3);
assert(ledger.population.passStatusIdDigests.every((pass) => pass.distinctStatusIds === 434));
assert(ledger.population.passStatusIdDigests.every(
  (pass) => pass.statusIdDigest === ledger.population.recoveredStatusIdDigest
));
assert.deepEqual(ledger.population.range, [
  "2008-10-04T23:21:03.000Z",
  "2023-04-17T16:55:07.000Z"
]);

assert.equal(ledger.sourceCirculation.recordsWithExternalLinks, 277);
assert.equal(ledger.sourceCirculation.normalizedRecordLinkPairs, 345);
assert.equal(ledger.sourceCirculation.distinctShortUrls, 321);
assert.equal(ledger.sourceCirculation.accountAuthoredNormalizedRecordLinkPairs, 290);
assert.equal(ledger.sourceCirculation.accountAuthoredDistinctShortUrls, 277);
assert.equal(ledger.sourceCirculation.researchQueueDisposition.status, "open");
assert.equal(ledger.sourceCirculation.researchQueueDisposition.bulkUrlInventoryPublished, false);
assert.deepEqual(ledger.missionSignals.counts, {
  "community-platforms-and-gatherings": 35,
  "civic-participation-and-service": 8,
  "cultural-space-advocacy": 45,
  "public-history-place-and-waterways": 2,
  "creative-technology-and-media": 4,
  "neighborhood-mutual-aid": 1
});

assert.equal(ledger.incomingStakeholderSearch.recoveredPublicRecords, 26);
assert.equal(ledger.incomingStakeholderSearch.missionRelevantThirdPartyRecords, 15);
assert.equal(ledger.incomingStakeholderSearch.missionRelevantThirdPartyAccounts, 9);
assert.equal(ledger.incomingStakeholderSearch.missionRelevantConversationContexts, 2);
assert.equal(ledger.incomingStakeholderSearch.redactedNonMissionPersonalOrNetworkRecords, 9);
assert.equal(ledger.selectedSourceLeads.length, 13);
assert.equal(new Set(ledger.selectedSourceLeads.map((lead) => lead.id)).size, 13);

assert.equal(ledger.heldVisibleInteractionObservation.accountAuthoredRecordsWithOneOrMoreDisplayedInteraction, 85);
assert.deepEqual(ledger.heldVisibleInteractionObservation.displayedInteractionUnits, {
  likes: 175,
  replies: 8,
  reposts: 60,
  total: 243
});
assert.equal(ledger.heldVisibleInteractionObservation.status, "hold");
assert.equal(ledger.acquisitionIntegrity.rawCapturePublished, false);
assert(!Object.hasOwn(ledger, "protectedSource"));

for (const digest of [
  ledger.population.recoveredStatusIdDigest,
  ledger.population.accountAuthoredStatusIdDigest,
  ledger.population.repostedStatusIdDigest,
  ledger.population.supplementalContextDigest,
  ledger.sourceCirculation.normalizedRecordLinkPairDigest,
  ledger.missionSignals.ruleManifestDigest,
  ledger.incomingStakeholderSearch.recoveredStatusIdDigest,
  ledger.incomingStakeholderSearch.missionRelevantStatusIdDigest
]) assert.match(digest, /^[a-f0-9]{64}$/);

const prohibitedKeys = new Set([
  "items", "text", "visibleText", "quotedText", "statusIds", "mentions",
  "hashtags", "mediaAlts", "engagementLabel", "visibleInteractions",
  "authenticatedAs", "authenticatedSessionIdentity", "locatorId",
  "protectedLocatorId", "protectedSourceLocatorId", "archivePath", "sourcePath"
]);
function assertMinimized(value, path = "ledger") {
  if (Array.isArray(value)) {
    value.forEach((item, index) => assertMinimized(item, `${path}[${index}]`));
    return;
  }
  if (!value || typeof value !== "object") return;
  for (const [key, nested] of Object.entries(value)) {
    assert(!prohibitedKeys.has(key), `${path}.${key} is prohibited in the public ledger`);
    assertMinimized(nested, `${path}.${key}`);
  }
}
assertMinimized(ledger);
assert.equal(ledger.privacy.status, "public-safe-minimized-ledger");
assert.equal(manifest.rawCapturePublished, false);
assert.equal(manifest.captureSha256, ledger.acquisitionIntegrity.captureSha256);
assert.equal(manifest.publicLedgerSha256, sha256(ledgerText));
assert.equal(manifest.publicLedger, ledgerPath);
assert.equal(
  manifest.generatorSha256,
  sha256(readFileSync("scripts/build-urbanhermit-x-public-ledger.mjs", "utf8"))
);
assert.equal(manifest.classifier, "scripts/lib/urbanhermit-mission-classifier.mjs");
assert.equal(
  manifest.classifierSha256,
  sha256(readFileSync("scripts/lib/urbanhermit-mission-classifier.mjs", "utf8"))
);
assert.match(manifest.nodeRuntime, /^v26\./);

const quotedCardFixture = {
  text: [
    "Jamie Burkart",
    "@urbanhermit",
    "Jan 1, 2020",
    "Metadata",
    "Ordinary source-post body",
    "QUOTE",
    "Quoted account",
    "Cabaret Law and NYC Artist Coalition"
  ].join("\n")
};
assert.equal(extractUrbanhermitSourcePostBody(quotedCardFixture), "Ordinary source-post body");
assert.deepEqual(classifyUrbanhermitRecord(quotedCardFixture), []);

const missionIncoming = [
  ["musichackathon", "579088937022406657"],
  ["DDDrewDaniel", "726096416070836224"],
  ["juliafredenburg", "726238278433804288"],
  ["YuraMironArt", "731863659052445696"],
  ["juliafredenburg", "775795144553398272"],
  ["alizauf", "916709928915619840"],
  ["NYCArtC", "923573066252382209"],
  ["alizauf", "925021115080232960"],
  ["NYCArtC", "925875113555357707"],
  ["NYCArtC", "934625625016623104"],
  ["NYCArtC", "934923724683431936"],
  ["KCTownHall", "1124810411302359040"],
  ["KCTownHall", "1135246124883861504"],
  ["JimmyFitzner", "1510067983456026629"],
  ["letsglitchit", "1648007189049516032"],
  ["alizauf", "916710349172301824"],
  ["alizauf", "916710595092729857"]
];
const primaryIds = Array.from({ length: 434 }, (_, index) => String(700000000000000000n + BigInt(index)));
const syntheticRecord = (handle, id, kind = "authored") => ({
  statusUrl: `/${handle}/status/${id}`,
  kind,
  datetime: "2020-01-01T00:00:00.000Z",
  engagementLabel: "",
  links: [],
  text: ""
});
const validSyntheticCapture = {
  capturedAt: "2026-07-15T00:00:00.000Z",
  profile: { account: "@urbanhermit", reportedPosts: 434 },
  items: primaryIds.map((id) => syntheticRecord("urbanhermit", id)),
  supplementalContexts: [
    syntheticRecord("contextAccount", "800000000000000001"),
    syntheticRecord("contextAccount", "800000000000000002")
  ],
  acquisitionVerification: {
    passes: [1, 2, 3].map((pass) => ({
      id: `pass-${pass}`,
      distinctPrimaryStatusIds: 434,
      totalRenderedStatusIds: 436,
      conversationContextRecords: 2,
      statusIds: [...primaryIds]
    })),
    setsEqual: true,
    matchedProfileBaseline: true,
    stoppingCondition: "Twelve consecutive scroll observations produced no new canonical status IDs."
  },
  incomingSearch: {
    query: "@urbanhermit -from:urbanhermit",
    yearlyWindows: "2008-2026",
    distinctRecovered: 26,
    records: [
      ...missionIncoming.map(([handle, id]) => syntheticRecord(handle, id)),
      ...Array.from({ length: 9 }, (_, index) =>
        syntheticRecord("otherAccount", String(900000000000000000n + BigInt(index))))
    ],
    boundary: "Synthetic validation fixture"
  }
};

assert.doesNotThrow(() => validateUrbanhermitCapture(validSyntheticCapture));

const duplicatePrimary = structuredClone(validSyntheticCapture);
duplicatePrimary.items[433].statusUrl = duplicatePrimary.items[0].statusUrl;
assert.throws(() => validateUrbanhermitCapture(duplicatePrimary), /distinct status IDs/);

const emptyPass = structuredClone(validSyntheticCapture);
emptyPass.acquisitionVerification.passes[1].statusIds = [];
assert.throws(() => validateUrbanhermitCapture(emptyPass), /must contain 434 status IDs/);

const mismatchedPass = structuredClone(validSyntheticCapture);
mismatchedPass.acquisitionVerification.passes[2].statusIds[0] = "999999999999999999";
assert.throws(() => validateUrbanhermitCapture(mismatchedPass), /missing status ID/);

const duplicateIncoming = structuredClone(validSyntheticCapture);
duplicateIncoming.incomingSearch.records[25].statusUrl = duplicateIncoming.incomingSearch.records[24].statusUrl;
assert.throws(() => validateUrbanhermitCapture(duplicateIncoming), /distinct status IDs/);

const overlappingContext = structuredClone(validSyntheticCapture);
overlappingContext.supplementalContexts[0].statusUrl = overlappingContext.items[0].statusUrl;
assert.throws(() => validateUrbanhermitCapture(overlappingContext), /outside the primary population/);

const wrongQuery = structuredClone(validSyntheticCapture);
wrongQuery.incomingSearch.query = "arbitrary query";
assert.throws(() => validateUrbanhermitCapture(wrongQuery));

console.log(JSON.stringify({
  profileReported: ledger.population.profileReported,
  recoveredAccountItems: ledger.population.recoveredAccountItems,
  recoveryGap: ledger.population.recoveryGap,
  adversarialCaptureValidation: "passed",
  publicArtifact: "minimized aggregate, digest, and selected-source ledger",
  publicLedgerSha256: manifest.publicLedgerSha256
}, null, 2));
