import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import {
  jamieFacebookEventReviewSummary,
  jamieWowlistFacebookEventClaimIds,
  jamieWowlistFacebookEventSourceIds,
  wowlistFacebookEventReviewSummary,
} from "../../apps/www/src/data/knowledge-bank/jamieWowlistFacebookEvents.ts";
import publicRegistry from "../../apps/www/src/data/knowledge-bank/public-registry.json" with { type: "json" };

const personalFixturePath =
  "apps/www/src/data/knowledge-bank/fixtures/jamie-facebook-events-full-population.json";
const wowlistFixturePath =
  "apps/www/src/data/knowledge-bank/fixtures/wowlist-facebook-events-full-population.json";
const personalFixtureText = readFileSync(personalFixturePath, "utf8");
const wowlistFixtureText = readFileSync(wowlistFixturePath, "utf8");
const personalFixture = JSON.parse(personalFixtureText);
const wowlistFixture = JSON.parse(wowlistFixtureText);

test("personal Facebook event control accounts for all 21 displayed slots", () => {
  const reconciliation = personalFixture.populationReconciliation;
  assert.equal(reconciliation.profileDisplayedPastEventCount, 21);
  assert.equal(reconciliation.recoveredIndexEventCount, 20);
  assert.equal(reconciliation.recoveredDetailEventCount, 20);
  assert.equal(reconciliation.detailRetrievalFailureCount, 0);
  assert.equal(reconciliation.unmaterializedCount, 1);
  assert.equal(
    reconciliation.recoveredIndexEventCount + reconciliation.unmaterializedCount,
    reconciliation.profileDisplayedPastEventCount,
  );
  assert.equal(personalFixture.events.length, 20);
  assert.equal(new Set(personalFixture.events.map((event) => event.id)).size, 20);
  assert.match(reconciliation.reconciliationNote, /unmaterialized, not as nonexistent/i);
});

test("personal event chronology and collaborator arithmetic are exact", () => {
  const yearCounts = Object.fromEntries(
    Object.entries(
      Object.groupBy(personalFixture.events, (event) => event.date.slice(0, 4)),
    ).map(([year, events]) => [year, events.length]),
  );
  assert.deepEqual(yearCounts, {
    2006: 1,
    2007: 4,
    2010: 1,
    2012: 2,
    2013: 3,
    2014: 3,
    2016: 3,
    2017: 2,
    2019: 1,
  });

  assert.ok(
    personalFixture.events.every((event) =>
      event.organizerDisplay.includes("Jamie Burkart"),
    ),
  );
  assert.equal(
    personalFixture.events.filter(
      (event) => event.relationToJamie === "organizer",
    ).length,
    13,
  );
  assert.equal(
    personalFixture.events.filter(
      (event) => event.relationToJamie === "cohosted",
    ).length,
    7,
  );
  assert.equal(
    jamieFacebookEventReviewSummary.eventsListingJamieAsOrganizerOrCoorganizer,
    20,
  );
});

test("personal event response labels remain thresholds rather than attendance", () => {
  const counts = personalFixture.events
    .map((event) => event.responseSnapshot.respondedDisplay)
    .filter(Number.isFinite)
    .sort((a, b) => b - a);
  assert.deepEqual(counts, [128, 104, 38, 23, 20, 16]);
  assert.equal(counts.filter((count) => count >= 20).length, 5);
  assert.equal(counts.filter((count) => count >= 100).length, 2);
  assert.match(personalFixture.aggregateSnapshot.interpretation, /not verified attendance/i);
  assert.match(personalFixture.aggregateSnapshot.interpretation, /must not be summed/i);

  const claim = knowledgeBank.claims.find(
    (candidate) =>
      candidate.id ===
      jamieWowlistFacebookEventClaimIds.personalResponseSignals,
  );
  assert.ok(claim);
  assert.match(claim.boundaries.join(" "), /not verified attendance/i);
  assert.match(claim.antiClaims.join(" "), /Facebook responses equal attendance/i);
  assert.doesNotMatch(
    claim.projections.map((projection) => projection.text).join(" "),
    /329 (?:people|attendees|participants|unique)/i,
  );
});

test("personal event resource routes are normalized and auditable", () => {
  const resources = personalFixture.events.flatMap(
    (event) => event.outboundResources,
  );
  const urls = resources.map((resource) => resource.url);
  assert.equal(resources.length, 18);
  assert.equal(new Set(urls).size, 17);
  assert.equal(
    personalFixture.events.reduce(
      (sum, event) => sum + event.withheldOutboundLinkCategories.length,
      0,
    ),
    1,
  );
  assert.equal(
    personalFixture.events.filter((event) =>
      event.withheldOutboundLinkCategories.includes("unresolved-short-link"),
    ).length,
    1,
  );
  assert.doesNotMatch(JSON.stringify(urls), /fbclid|utm_|[?&](?:ref|tracking)=/i);
});

test("personal public fixture excludes residential, contact, and session data", () => {
  const prohibitedPatterns = [
    /196 Clinton/i,
    /42 Janssen/i,
    /536 Main/i,
    /18-67 Menahan/i,
    /\b(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]\d{3}[-.\s]\d{4}\b/,
    /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i,
    /\/(?:Users|Volumes|private\/tmp)\//,
    /cookie|access[_ -]?token|session[_ -]?id/i,
  ];
  for (const pattern of prohibitedPatterns) {
    assert.doesNotMatch(personalFixtureText, pattern);
  }
  assert.equal(personalFixture.publicSafety.rawDescriptionsPublished, false);
  assert.equal(personalFixture.publicSafety.residentialAddressesPublished, false);
  assert.equal(personalFixture.publicSafety.contactDetailsPublished, false);
  assert.equal(personalFixture.publicSafety.attendeeIdentitiesPublished, false);
  assert.equal(
    personalFixture.publicSafety.authenticatedSessionStatePublished,
    false,
  );
});

test("WOWList zero-state and linked-event populations stay distinct", () => {
  const reconciliation = wowlistFixture.populationReconciliation;
  assert.equal(reconciliation.currentDisplayedEventCount, 0);
  assert.equal(reconciliation.recoveredCurrentEventCount, 0);
  assert.equal(reconciliation.preservedPagePostLinkedEventCount, 2);
  assert.equal(reconciliation.linkedEventsHostedByWowlist, 0);
  assert.equal(wowlistFixture.linkedEvents.length, 2);
  assert.ok(
    wowlistFixture.linkedEvents.every(
      (event) =>
        event.relationToWowlist === "shared-from-page-post" &&
        event.hostedByWowlist === false,
    ),
  );
  assert.deepEqual(wowlistFacebookEventReviewSummary, {
    currentDisplayedEvents: 0,
    currentSurfaceMessage: "No events to show",
    preservedPagePostLinkedEvents: 2,
    linkedEventsHostedByWowlist: 0,
  });
});

test("WOWList governed wording resists historical-negative and ownership inflation", () => {
  const claims = new Map(
    knowledgeBank.claims.map((claim) => [claim.id, claim]),
  );
  const zeroState = claims.get(
    jamieWowlistFacebookEventClaimIds.wowlistZeroState,
  );
  const crossSurface = claims.get(
    jamieWowlistFacebookEventClaimIds.wowlistCrossSurface,
  );
  assert.ok(zeroState);
  assert.ok(crossSurface);
  assert.match(zeroState.boundaries.join(" "), /current zero-state/i);
  assert.match(zeroState.antiClaims.join(" "), /never hosted/i);
  assert.match(crossSurface.boundaries.join(" "), /not WOWList events/i);
  assert.match(crossSurface.boundaries.join(" "), /shared project identity/i);
  assert.match(crossSurface.antiClaims.join(" "), /personally authored/i);

  const projectionCopy = [zeroState, crossSurface]
    .flatMap((claim) => claim.projections.map((projection) => projection.text))
    .join("\n");
  assert.doesNotMatch(projectionCopy, /WOWList never (?:hosted|had)/i);
  assert.doesNotMatch(projectionCopy, /WOWList hosted (?:both|the two)/i);
  assert.doesNotMatch(projectionCopy, /Jamie (?:wrote|authored) both/i);
});

test("event findings remain non-projecting intake with no public archive route", () => {
  const intakeIds = [
    "INTAKE-JAMIE-FACEBOOK-EVENT-POPULATION-2026-07-15",
    "INTAKE-WOWLIST-FACEBOOK-EVENT-POPULATION-2026-07-15",
  ];
  for (const intakeId of intakeIds) {
    const intake = knowledgeBank.intakeItems.find((item) => item.id === intakeId);
    assert.ok(intake, `missing ${intakeId}`);
    assert.equal(intake.status, "integrated");
    assert.equal(intake.projectionStatus, "no-public-projection");
  }

  assert.ok(
    knowledgeBank.pages.every(
      (page) =>
        ![
          "/proofs",
          "/events",
          "/knowledge-bank",
          "/jamie-events",
          "/wowlist-events",
        ].includes(page.surface),
    ),
  );

  const serializedRegistry = JSON.stringify(publicRegistry);
  assert.doesNotMatch(serializedRegistry, /LOC-JAMIE-FACEBOOK-EVENT-RESEARCH/);
  assert.doesNotMatch(serializedRegistry, /LOC-WOWLIST-FACEBOOK-EVENT-RESEARCH/);
  assert.doesNotMatch(serializedRegistry, /INTAKE-(?:JAMIE|WOWLIST)-FACEBOOK-EVENT/);
  assert.ok(
    Object.values(jamieWowlistFacebookEventSourceIds).every((sourceId) =>
      knowledgeBank.sources.some((source) => source.id === sourceId),
    ),
  );
});

test("public fixtures exclude protected archive and account-administration data", () => {
  const serialized = `${personalFixtureText}\n${wowlistFixtureText}`;
  assert.doesNotMatch(serialized, /\/(?:Users|Volumes|private\/tmp)\//);
  assert.doesNotMatch(
    serialized,
    /"(?:page|profile|account)(?:Id|_id| id)"\s*:/i,
  );
  assert.doesNotMatch(serialized, /cookie|access[_ -]?token|session[_ -]?id/i);
  assert.equal(wowlistFixture.publicSafety.rawPostBodiesPublished, false);
  assert.equal(wowlistFixture.publicSafety.commentsOrReactionsPublished, false);
  assert.equal(wowlistFixture.publicSafety.accountAdministrationPublished, false);
  assert.equal(
    wowlistFixture.publicSafety.authenticatedSessionStatePublished,
    false,
  );
});
