#!/usr/bin/env node

import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

const ledgerPath =
  "docs/knowledge-bank/corpora/nycartc-x-population-ledger-2026-07-15.json";
const manifestPath =
  "docs/knowledge-bank/corpora/nycartc-x-population-ledger-2026-07-15.manifest.json";
const ledgerText = readFileSync(ledgerPath, "utf8");
const ledger = JSON.parse(ledgerText);
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
const sha256 = (value) => createHash("sha256").update(value).digest("hex");

assert.equal(ledger.account, "@NYCArtC");
assert.equal(ledger.population.profileReported, 5_124);
assert.equal(ledger.population.recoveredAccountItems, 3_367);
assert.equal(ledger.population.unrecoveredCountDifference, 1_757);
assert.equal(ledger.population.recoveredAccountItems + ledger.population.unrecoveredCountDifference, 5_124);
assert.equal(ledger.population.authored, 696);
assert.equal(ledger.population.reposted, 2_671);
assert.equal(ledger.population.authored + ledger.population.reposted, 3_367);
assert.equal(ledger.population.supplementalPublicContexts, 19);

assert.deepEqual(
  Object.fromEntries(ledger.campaignMarkers.map((marker) => [marker.id, marker.authoredPostCount])),
  { "fair-rent-nyc": 186, "save-nyc-spaces": 106, "let-nyc-dance": 76, "talks-not-raids": 54 }
);
assert.equal(ledger.sourceCirculation.allDistinctShortUrlsResolved, 1_235);
assert.equal(ledger.sourceCirculation.authoredPostsWithOutgoingLinks, 446);
assert.equal(ledger.sourceCirculation.authoredOutgoingLinkOccurrences, 529);
assert.equal(ledger.sourceCirculation.distinctAuthoredShortUrls, 287);
assert.equal(ledger.stakeholderCommunication.nycCouncilOutboundMentionOccurrences, 104);
assert.equal(ledger.stakeholderCommunication.nycCouncilOutboundPosts, 100);
assert.equal(
  ledger.stakeholderCommunication.selectedRecoveredRepostSources.find(
    (entry) => entry.handle === "olympiakazi"
  )?.recoveredCount,
  194
);
assert.equal(ledger.heldObservations.authoredPostsWithDisplayedReplyRepostOrLike, 628);
assert.deepEqual(ledger.heldObservations.visibleInteractionTotals,
  { replies: 112, reposts: 1_527, likes: 2_761, bookmarks: 64 });
assert.equal(ledger.sourceLeads.length, 12);
assert.equal(new Set(ledger.sourceLeads.map((lead) => lead.id)).size, 12);

for (const digest of [
  ledger.population.recoveredStatusIdDigest,
  ledger.population.authoredStatusIdDigest,
  ledger.population.repostedStatusIdDigest,
  ledger.population.supplementalContextDigest,
  ...ledger.campaignMarkers.map((marker) => marker.statusIdDigest),
  ledger.sourceCirculation.recoveredLinkPairDigest,
  ledger.stakeholderCommunication.nycCouncilOutboundStatusIdDigest
]) assert.match(digest, /^[a-f0-9]{64}$/);

const prohibitedKeys = new Set([
  "items", "visibleText", "text", "statusIds", "visibleMentions",
  "mentions", "allMentions", "shortUrl", "resolvedUrl", "resolvedDestination",
  "visibleInteractions", "visibleInteractionLabel"
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
assert.equal(ledger.protectedSource.repositoryStatus, "excluded");
assert.equal(manifest.protectedSourceLocatorId, ledger.protectedSource.locatorId);
assert.equal(manifest.protectedSourceSha256, ledger.protectedSource.sha256);
assert.equal(manifest.publicLedgerSha256, sha256(ledgerText));
assert.equal(manifest.publicLedger, ledgerPath);

console.log(JSON.stringify({
  profileReported: ledger.population.profileReported,
  recoveredAccountItems: ledger.population.recoveredAccountItems,
  unrecoveredCountDifference: ledger.population.unrecoveredCountDifference,
  publicArtifact: "minimized aggregate and digest ledger",
  publicLedgerSha256: manifest.publicLedgerSha256
}, null, 2));
