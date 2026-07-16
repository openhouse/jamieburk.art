#!/usr/bin/env node

import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  facebookEventsIntegrityControls,
  sha256
} from "./lib/facebook-personal-wowlist-events-validation.mjs";

const protectedPath = process.env.FACEBOOK_EVENTS_PROTECTED_CAPTURE;
if (!protectedPath) {
  console.error(
    "Set FACEBOOK_EVENTS_PROTECTED_CAPTURE to the protected authenticated capture."
  );
  process.exit(2);
}

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ledger = JSON.parse(
  readFileSync(
    path.join(
      repoRoot,
      "docs/knowledge-bank/corpora/facebook-personal-wowlist-events-public-ledger-2026-07-16.json"
    ),
    "utf8"
  )
);
const protectedText = readFileSync(protectedPath, "utf8");
const capture = JSON.parse(protectedText);

assert.equal(
  sha256(protectedText),
  facebookEventsIntegrityControls.protectedCaptureSha256,
  "Protected capture digest changed"
);
assert.equal(
  ledger.acquisitionIntegrity.protectedCaptureSha256,
  facebookEventsIntegrityControls.protectedCaptureSha256
);

const records = capture.personalProfile.records;
assert.equal(records.length, ledger.personalProfile.population.displayedEventSlots);
assert.equal(
  new Set(records.map((record) => record.eventId)).size,
  ledger.personalProfile.population.distinctBaseEventIds
);
assert.equal(
  records.length - new Set(records.map((record) => record.eventId)).size,
  ledger.personalProfile.population.recurringEventTimeInstances
);
assert.equal(
  records.filter((record) => record.eventTimeId !== null).length,
  ledger.personalProfile.population.recurringEventTimeInstances
);

const organizerRecords = records.filter(
  (record) =>
    record.relationToProfile === "profile-displayed-jamie-organizer"
);
assert.equal(
  organizerRecords.length,
  ledger.personalProfile.population.explicitJamieOrganizerRecords
);
assert.equal(
  records.length - organizerRecords.length,
  ledger.personalProfile.population.profileAssociatedRecords
);

const identityDigest = (rows) =>
  createHash("sha256")
    .update(
      rows
        .map((row) => `${row.eventId}:${row.eventTimeId ?? ""}`)
        .sort()
        .join("\n")
    )
    .digest("hex");

assert.equal(
  identityDigest(records),
  ledger.acquisitionIntegrity.personalEventIdentitySha256
);
assert.equal(
  identityDigest(organizerRecords),
  ledger.acquisitionIntegrity.explicitOrganizerIdentitySha256
);

const byYear = {};
for (const record of records) {
  const year = record.dateLabel.match(/(\d{4})$/)?.[1];
  assert.ok(year, `Missing date year for event ${record.eventId}`);
  byYear[year] = (byYear[year] ?? 0) + 1;
}
assert.deepEqual(byYear, ledger.personalProfile.population.byYear);

const detailAudit = capture.personalProfile.explicitOrganizerDetailAudit;
assert.equal(
  detailAudit.length,
  ledger.personalProfile.explicitOrganizerEvidence.detailRoutesReviewed
);
assert.deepEqual(
  detailAudit
    .map((record) => `${record.eventId}:${record.eventTimeId ?? ""}`)
    .sort(),
  organizerRecords
    .map((record) => `${record.eventId}:${record.eventTimeId ?? ""}`)
    .sort(),
  "Organizer detail audit must reconcile to every explicit organizer identity"
);
const responses = detailAudit
  .map((record) => {
    if (record.detail.response === null) return null;
    const value = record.detail.response.match(/^(\d+) people responded$/)?.[1];
    assert.ok(value, `Unexpected response label for event ${record.eventId}`);
    return Number(value);
  })
  .filter(Number.isInteger)
  .sort((left, right) => left - right);
assert.deepEqual(
  responses,
  ledger.personalProfile.explicitOrganizerEvidence
    .displayedResponseCountDistribution
);
assert.equal(
  responses.filter((value) => value >= 20).length,
  ledger.personalProfile.explicitOrganizerEvidence
    .eventsAtOrAbove20DisplayedResponses
);
assert.equal(
  Math.max(...responses),
  ledger.personalProfile.explicitOrganizerEvidence.largestDisplayedResponseCount
);

const detailById = new Map(detailAudit.map((record) => [record.eventId, record]));
for (const selected of ledger.personalProfile.explicitOrganizerEvidence
  .selectedPublicSafeEvents) {
  const protectedRecord = detailById.get(selected.eventId);
  assert.ok(protectedRecord, `Selected event ${selected.eventId} is not in the audit`);
  assert.equal(protectedRecord.title, selected.title);
  assert.equal(protectedRecord.dateLabel, selected.date);
  assert.equal(protectedRecord.href, selected.canonicalUrl);
  const response = protectedRecord.detail.response?.match(/^(\d+) people responded$/)?.[1];
  assert.equal(response ? Number(response) : null, selected.displayedResponses);
}

const externalDestinations = detailAudit.reduce(
  (total, record) => total + record.detail.external.length,
  0
);
assert.equal(
  externalDestinations,
  ledger.personalProfile.postedSourceRoutes.externalArticleDestinationsRecovered
);

const hostControlText = capture.personalProfile.hostControlAudit.hostAnchors
  .map((anchor) => anchor.text)
  .join("\n");
const hostCount = Number(hostControlText.match(/(\d+) past events/)?.[1]);
assert.equal(hostCount, ledger.personalProfile.population.eventHostControlPastEvents);
assert.equal(
  hostCount - organizerRecords.length,
  ledger.personalProfile.population.unresolvedHostControlCountDifference
);

assert.equal(
  capture.wowListPage.currentSurfaceAudit.eventAnchorCount,
  ledger.wowListPage.currentEventsSurface.eventDetailAnchors
);
assert.equal(
  capture.wowListPage.currentSurfaceAudit.hasEventsLabel,
  ledger.wowListPage.currentEventsSurface.eventsSectionExposed
);
assert.deepEqual(
  capture.wowListPage.currentSurfaceAudit.sectionLabels,
  ledger.wowListPage.currentEventsSurface.visibleAdditionalSectionLabels
);

console.log(
  "Protected Facebook event capture verified: 511 cards, 20 explicit organizer records, " +
    "17 response labels, 14 public-safe selections, and a current zero-card WOW List surface."
);
