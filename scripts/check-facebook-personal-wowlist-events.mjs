#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  sha256,
  validateFacebookPersonalWowListEventsLedger,
  validateFacebookPersonalWowListEventsManifest
} from "./lib/facebook-personal-wowlist-events-validation.mjs";
import {
  facebookEventsSafeMutations,
  facebookEventsUnsafeMutations
} from "./lib/facebook-personal-wowlist-events-adversarial.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ledgerPath =
  "docs/knowledge-bank/corpora/facebook-personal-wowlist-events-public-ledger-2026-07-16.json";
const manifestPath =
  "docs/knowledge-bank/corpora/facebook-personal-wowlist-events-public-ledger-2026-07-16.manifest.json";
const projectPath =
  "docs/knowledge-bank/projects/personal-and-wowlist-facebook-events.md";
const runPath =
  "docs/knowledge-bank/runs/2026-07-16-facebook-personal-wowlist-events.md";
const typedPath =
  "apps/www/src/data/knowledge-bank/facebook-personal-wowlist-events.ts";
const portfolioHistoryPath =
  "apps/www/src/data/knowledge-bank/portfolio-history.ts";
const expectedLedgerSha256 =
  "6d0801464836c6cb41711426e8d5aff80d634962510b4f2179a4fa19bb7810ae";

const read = (relativePath) =>
  readFileSync(path.join(repoRoot, relativePath), "utf8");

const ledgerText = read(ledgerPath);
const ledger = JSON.parse(ledgerText);
const manifest = JSON.parse(read(manifestPath));
const project = read(projectPath);
const run = read(runPath);
const typed = read(typedPath);
const portfolioHistory = read(portfolioHistoryPath);
const ledgerSha256 = sha256(ledgerText);

assert.deepEqual(validateFacebookPersonalWowListEventsLedger(ledger), []);
assert.deepEqual(
  validateFacebookPersonalWowListEventsManifest(manifest, {
    ledgerText,
    ledgerSha256
  }),
  []
);
assert.equal(ledgerSha256, expectedLedgerSha256);
assert.equal(manifest.publicLedgerSha256, expectedLedgerSha256);

const population = ledger.personalProfile.population;
assert.equal(population.displayedEventSlots, 511);
assert.equal(population.distinctBaseEventIds, 502);
assert.equal(population.recurringEventTimeInstances, 9);
assert.equal(population.explicitJamieOrganizerRecords, 20);
assert.equal(population.profileAssociatedRecords, 491);
assert.equal(population.eventHostControlPastEvents, 21);
assert.equal(population.unresolvedHostControlCountDifference, 1);
assert.equal(
  Object.values(population.byYear).reduce((sum, count) => sum + count, 0),
  511
);

const organizer = ledger.personalProfile.explicitOrganizerEvidence;
assert.equal(organizer.selectedPublicSafeEvents.length, 14);
assert.equal(
  new Set(organizer.selectedPublicSafeEvents.map((event) => event.eventId)).size,
  14
);
assert.equal(organizer.detailRoutesReviewed, 20);
assert.equal(organizer.detailPagesWithDisplayedResponseCount, 17);
assert.equal(organizer.eventsAtOrAbove20DisplayedResponses, 6);
assert.equal(organizer.largestDisplayedResponseCount, 119);
assert.deepEqual(organizer.displayedResponseCountDistribution, [
  2, 4, 5, 5, 5, 6, 7, 7, 14, 16, 16, 20, 21, 28, 38, 44, 119
]);
assert.ok(
  organizer.selectedPublicSafeEvents.some(
    (event) =>
      event.eventId === "702417306475691" &&
      event.title === "SUNDAY DINNER Turns 100!" &&
      event.displayedResponses === 21
  )
);

assert.equal(ledger.wowListPage.currentEventsSurface.eventDetailAnchors, 0);
assert.equal(ledger.wowListPage.currentEventsSurface.eventsSectionExposed, false);
assert.equal(
  ledger.wowListPage.currentEventsSurface.historicalPopulationStatus,
  "unresolved"
);
assert.equal(
  ledger.personalProfile.postedSourceRoutes.externalArticleDestinationsRecovered,
  0
);

const publicLedgerRows = project
  .split("\n")
  .filter((line) => /^\| 20\d\d-\d\d-\d\d \| \[/.test(line));
assert.equal(publicLedgerRows.length, 14);
assert.match(project, /profile-associated card does not establish/i);
assert.doesNotMatch(project, /## Stakeholder Leads/);
assert.doesNotMatch(
  ledgerText,
  /NYC Artist Coalition|Rafael L Espinal|Department of Cultural Affairs|KC Tenants/
);
assert.match(project, /not evidence that\s+WOW List never created/i);
assert.match(project, /more than 1,000 miles/i);
assert.match(project, /spent weeks\s+constructing the recycled-material raft/i);
assert.match(project, /following an external Facebook link remains subject/i);
assert.match(run, /309,467-byte record outside the repository/i);
assert.match(run, /one complete traversal, not\s+an independent replay/i);
assert.match(run, /21-versus-20 result remained a one-count discrepancy/i);

assert.match(typed, /SRC-WATERWAYS-PITCH-PART-III-2007-11-12/);
assert.match(
  typed,
  /https:\/\/www\.thepitchkc\.com\/artists-turned-huck-finn-part-iii\//
);
assert.match(
  portfolioHistory,
  /sourceId: "SRC-WATERWAYS-PITCH-PART-III-2007-11-12"/
);
assert.match(
  portfolioHistory,
  /more than 1,000 miles traveled before the reported Coast Guard interruption/
);
assert.match(portfolioHistory, /weeks spent constructing the recycled-material raft/);
assert.match(portfolioHistory, /reviewedAt: "2026-07-16"/);

for (const { label, mutate } of facebookEventsUnsafeMutations) {
  const candidate = structuredClone(ledger);
  mutate(candidate);
  assert.ok(
    validateFacebookPersonalWowListEventsLedger(candidate).length > 0,
    `Unsafe mutation passed validation: ${label}`
  );
}
for (const { label, mutate } of facebookEventsSafeMutations) {
  const candidate = structuredClone(ledger);
  mutate(candidate);
  assert.deepEqual(
    validateFacebookPersonalWowListEventsLedger(candidate),
    [],
    `Safe mutation failed validation: ${label}`
  );
}

for (const [label, mutate] of [
  ["protected-capture-digest", (candidate) => {
    candidate.protectedCaptureSha256 = "0".repeat(64);
  }],
  ["public-ledger-path", (candidate) => {
    candidate.publicLedger = "private/facebook-events.json";
  }],
  ["manifest-extra-locator", (candidate) => {
    candidate.protectedPath = "/private/tmp/facebook-events.json";
  }],
  ["distinct-base-event-control", (candidate) => {
    candidate.personalProfileDistinctBaseEventIds = 999;
  }],
  ["host-display-control", (candidate) => {
    candidate.personalHostControlPastEvents = 999;
  }]
]) {
  const candidate = structuredClone(manifest);
  mutate(candidate);
  assert.ok(
    validateFacebookPersonalWowListEventsManifest(candidate, {
      ledgerText,
      ledgerSha256
    }).length > 0,
    `Unsafe manifest mutation passed validation: ${label}`
  );
}

console.log(
  "Facebook personal/WOW List event corpus passed: " +
    "511 cards, 502 base IDs, 20 explicit organizer records, " +
    "491 profile associations, 14 selected events, WOW List history unresolved."
);
console.log(
  `Adversarial review passed: ${facebookEventsUnsafeMutations.length} unsafe and ` +
    `${facebookEventsSafeMutations.length} safe mutations, plus 5 unsafe manifest mutations.`
);
