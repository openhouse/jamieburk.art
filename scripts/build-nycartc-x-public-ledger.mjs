#!/usr/bin/env node

import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { buildNycArtCCorpus } from "./derive-nycartc-x-corpus.mjs";

const defaultProtectedCapture =
  "docs/knowledge-bank/corpora/source-captures/nycartc-x-browser-extraction-2026-07-15-utc.json";
const defaultLedger =
  "docs/knowledge-bank/corpora/nycartc-x-population-ledger-2026-07-15.json";
const defaultManifest =
  "docs/knowledge-bank/corpora/nycartc-x-population-ledger-2026-07-15.manifest.json";

const sha256 = (value) => createHash("sha256").update(value).digest("hex");
const digestValues = (values) =>
  sha256(JSON.stringify([...values].sort((left, right) => left.localeCompare(right))));

export function buildPublicLedger(protectedCaptureText) {
  const corpus = buildNycArtCCorpus(protectedCaptureText);
  const authored = corpus.items.filter((item) => item.kind === "authored");
  const reposted = corpus.items.filter((item) => item.kind === "reposted");
  const councilStatusIds = authored
    .filter((item) => item.visibleMentions.includes("@nyccouncil"))
    .map((item) => item.statusId);
  const resolvedLinkPairs = corpus.items.flatMap((item) =>
    item.outgoingLinks.map((link) => `${link.shortUrl}\t${link.resolvedDestination}`)
  );

  const selectedRepostSources = corpus.stakeholderCommunication
    .recoveredRepostSourceCounts.slice(0, 8)
    .map(({ value, count }) => ({ handle: value, recoveredCount: count }));

  return {
    schemaVersion: 1,
    account: corpus.account,
    capturedAt: corpus.capturedAt,
    capturedThrough: corpus.capturedThrough,
    protectedSource: {
      locatorId: "NYCAC-X-AUTHENTICATED-CAPTURE-2026-07-15",
      sha256: sha256(protectedCaptureText),
      visibility: "protected",
      repositoryStatus: "excluded"
    },
    population: {
      ...corpus.population,
      recoveredStatusIdDigest: digestValues(corpus.items.map((item) => item.statusId)),
      authoredStatusIdDigest: digestValues(authored.map((item) => item.statusId)),
      repostedStatusIdDigest: digestValues(reposted.map((item) => item.statusId)),
      supplementalContextDigest: digestValues(
        corpus.supplementalContexts.map((item) => item.statusId)
      )
    },
    campaignMarkers: corpus.campaignMarkers.map((marker) => ({
      id: marker.id,
      hashtag: marker.hashtag,
      summary: marker.summary,
      authoredPostCount: marker.statusIds.length,
      visibleHashtagOccurrences: marker.visibleHashtagOccurrences,
      statusIdDigest: digestValues(marker.statusIds)
    })),
    sourceCirculation: {
      allDistinctShortUrlsResolved:
        corpus.linkInventory.allDistinctShortUrlsResolved,
      authoredPostsWithOutgoingLinks:
        corpus.linkInventory.authoredPostsWithOutgoingLinks,
      authoredOutgoingLinkOccurrences:
        corpus.linkInventory.authoredOutgoingLinkOccurrences,
      distinctAuthoredShortUrls:
        corpus.linkInventory.distinctAuthoredShortUrls,
      recoveredLinkPairDigest: digestValues(resolvedLinkPairs),
      boundary: corpus.linkInventory.boundary
    },
    stakeholderCommunication: {
      nycCouncilOutboundMentionOccurrences:
        corpus.stakeholderCommunication.outboundMentionCounts.find(
          (entry) => entry.value === "@nyccouncil"
        )?.count ?? 0,
      nycCouncilOutboundPosts: councilStatusIds.length,
      nycCouncilOutboundStatusIdDigest: digestValues(councilStatusIds),
      selectedRecoveredRepostSources: selectedRepostSources,
      boundary: corpus.stakeholderCommunication.boundary
    },
    sourceLeads: corpus.sourceLeads,
    heldObservations: corpus.heldObservations,
    boundaries: corpus.boundaries,
    privacy: {
      status: "public-safe-minimized-ledger",
      omitted: [
        "raw capture",
        "post text",
        "quoted-card text",
        "per-item status IDs and URLs outside the selected source leads",
        "per-item mentions and hashtags",
        "per-item interaction counters",
        "unselected person-level account handles",
        "historical contact details",
        "authentication and private account state"
      ],
      rationale:
        "Publish aggregate evidence and cryptographic reconciliation controls without republishing a searchable bulk social record."
    }
  };
}

export function buildPublicManifest(protectedCaptureText, ledgerText, ledger) {
  return {
    schemaVersion: 1,
    generatedAt: ledger.capturedAt,
    generator: "scripts/build-nycartc-x-public-ledger.mjs",
    protectedSourceLocatorId: ledger.protectedSource.locatorId,
    protectedSourceSha256: sha256(protectedCaptureText),
    publicLedger:
      "docs/knowledge-bank/corpora/nycartc-x-population-ledger-2026-07-15.json",
    publicLedgerSha256: sha256(ledgerText),
    profileReportedPosts: ledger.population.profileReported,
    recoveredAccountItems: ledger.population.recoveredAccountItems,
    unrecoveredItems: ledger.population.unrecoveredCountDifference,
    status: "population-accounted-with-protected-source-and-minimized-public-ledger"
  };
}

function main() {
  const [protectedCapture = defaultProtectedCapture, ledgerPath = defaultLedger,
    manifestPath = defaultManifest] = process.argv.slice(2);
  const protectedCaptureText = readFileSync(protectedCapture, "utf8");
  const ledger = buildPublicLedger(protectedCaptureText);
  assert.equal(ledger.population.profileReported, 5_124);
  assert.equal(ledger.population.recoveredAccountItems, 3_367);
  assert.equal(ledger.population.unrecoveredCountDifference, 1_757);
  const ledgerText = `${JSON.stringify(ledger, null, 2)}\n`;
  const manifest = buildPublicManifest(protectedCaptureText, ledgerText, ledger);
  writeFileSync(ledgerPath, ledgerText);
  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(JSON.stringify({ ledgerPath, manifestPath, publicLedgerSha256: manifest.publicLedgerSha256 }, null, 2));
}

if (process.argv[1]?.endsWith("build-nycartc-x-public-ledger.mjs")) main();
