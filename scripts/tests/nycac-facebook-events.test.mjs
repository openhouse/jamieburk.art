import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import {
  nycacFacebookEventArticleSourceIds,
  nycacFacebookEventClaimIds,
  nycacFacebookEventReviewSummary,
  nycacFacebookEventSourceIds,
  nycacPhysicalMeetingVenues,
  nycacRecurringMeetingEventIds,
} from "../../apps/www/src/data/knowledge-bank/nycacFacebookEvents.ts";
import publicRegistry from "../../apps/www/src/data/knowledge-bank/public-registry.json" with { type: "json" };

const fixturePath =
  "apps/www/src/data/knowledge-bank/fixtures/nycartc-facebook-events-full-population.json";
const fixtureText = readFileSync(fixturePath, "utf8");
const fixture = JSON.parse(fixtureText);

const websiteCopyPaths = [
  "apps/www/src/content/work/fair-rent-nyc.mdx",
  "apps/www/src/data/work.ts",
];
const websiteCopy = websiteCopyPaths
  .map((path) => readFileSync(path, "utf8"))
  .join("\n");

test("NYCAC Facebook event control accounts for all 34 displayed slots", () => {
  const reconciliation = fixture.populationReconciliation;
  assert.equal(reconciliation.pageDisplayedPastEventCount, 34);
  assert.equal(reconciliation.recoveredIndexEventCount, 33);
  assert.equal(reconciliation.recoveredDetailEventCount, 33);
  assert.equal(reconciliation.detailRetrievalFailureCount, 0);
  assert.equal(reconciliation.unmaterializedCount, 1);
  assert.equal(
    reconciliation.recoveredIndexEventCount + reconciliation.unmaterializedCount,
    reconciliation.pageDisplayedPastEventCount,
  );
  assert.equal(fixture.events.length, 33);
  assert.equal(new Set(fixture.events.map((event) => event.id)).size, 33);
  assert.match(reconciliation.reconciliationNote, /unmaterialized, not as nonexistent/i);
});

test("NYCAC Facebook event fixture preserves chronology and relationship arithmetic", () => {
  const yearCounts = Object.fromEntries(
    Object.entries(
      Object.groupBy(fixture.events, (event) => event.date.slice(0, 4)),
    ).map(([year, events]) => [year, events.length]),
  );
  assert.deepEqual(yearCounts, {
    2017: 17,
    2018: 3,
    2019: 6,
    2020: 6,
    2021: 1,
  });

  const direct = fixture.events.filter(
    (event) => event.relationToPage === "index-displayed-nycac-organizer",
  ).length;
  const allied = fixture.events.filter(
    (event) => event.relationToPage === "allied-or-cohosted-listing",
  ).length;
  assert.equal(direct, 24);
  assert.equal(allied, 9);
  assert.equal(direct + allied, 33);
});

test("NYCAC recurring meeting classification is explicit and auditable", () => {
  const eventsById = new Map(fixture.events.map((event) => [event.id, event]));
  assert.equal(nycacRecurringMeetingEventIds.length, 12);
  assert.equal(new Set(nycacRecurringMeetingEventIds).size, 12);
  for (const eventId of nycacRecurringMeetingEventIds) {
    assert.ok(eventsById.has(eventId), `missing recurring meeting ${eventId}`);
  }
  assert.equal(nycacPhysicalMeetingVenues.length, 10);
  assert.equal(new Set(nycacPhysicalMeetingVenues).size, 10);
  for (const venue of nycacPhysicalMeetingVenues) {
    assert.ok(
      fixture.events.some((event) => event.venue === venue),
      `missing physical meeting venue ${venue}`,
    );
  }
  assert.equal(nycacFacebookEventReviewSummary.virtualMeetingRecords, 2);
});

test("NYCAC response findings remain platform signals rather than attendance", () => {
  const responseEvents = fixture.events.filter(
    (event) => event.responseSnapshot.respondedDisplay !== null,
  );
  const threshold = (minimum) =>
    fixture.events.filter(
      (event) => (event.responseSnapshot.pointEstimate ?? 0) >= minimum,
    ).length;

  assert.equal(responseEvents.length, 32);
  assert.equal(threshold(100), 19);
  assert.equal(threshold(500), 7);
  assert.equal(threshold(1000), 3);
  assert.equal(fixture.aggregateSnapshot.eventsAtOrAbove100Responses, 19);
  assert.equal(fixture.aggregateSnapshot.eventsAtOrAbove500Responses, 7);
  assert.equal(fixture.aggregateSnapshot.eventsAtOrAbove1000Responses, 3);
  assert.match(fixture.aggregateSnapshot.interpretation, /not unique people/i);

  const claim = knowledgeBank.claims.find(
    (candidate) => candidate.id === nycacFacebookEventClaimIds.responseSignals,
  );
  assert.ok(claim);
  assert.match(claim.boundaries.join(" "), /not verified attendance/i);
  assert.match(claim.antiClaims.join(" "), /Facebook responses equal event attendance/i);
  assert.doesNotMatch(
    claim.projections.map((projection) => projection.text).join(" "),
    /9,?989 (?:people|attendees|participants)/i,
  );
});

test("NYCAC event source routes and protected-link exclusions are complete", () => {
  assert.equal(fixture.postedSourceArticles.length, 7);
  assert.equal(nycacFacebookEventArticleSourceIds.length, 7);
  assert.equal(new Set(nycacFacebookEventArticleSourceIds).size, 7);
  assert.equal(
    fixture.events.reduce(
      (total, event) => total + event.withheldOutboundLinkCount,
      0,
    ),
    13,
  );
  assert.equal(
    fixture.events.filter((event) => event.withheldOutboundLinkCount > 0).length,
    11,
  );

  const sourceIds = new Set(knowledgeBank.sources.map((source) => source.id));
  for (const sourceId of nycacFacebookEventArticleSourceIds) {
    assert.ok(sourceIds.has(sourceId), `missing event article source ${sourceId}`);
  }
});

test("NYCAC public fixture excludes participant and authenticated-session data", () => {
  const serializedUrls = JSON.stringify(
    fixture.events.flatMap((event) => [
      event.url,
      ...event.outboundResources.map((resource) => resource.url),
    ]),
  );
  assert.doesNotMatch(serializedUrls, /zoom\.us|meet\.google|docs\.google|drive\.google/i);
  assert.doesNotMatch(fixtureText, /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  assert.doesNotMatch(fixtureText, /\/(?:Users|Volumes|private\/tmp)\//);
  assert.equal(fixture.publicSafety.rawDescriptionsPublished, false);
  assert.equal(fixture.publicSafety.attendeeIdentitiesPublished, false);
  assert.equal(fixture.publicSafety.contactDetailsPublished, false);
  assert.equal(fixture.publicSafety.accessCredentialsPublished, false);
});

test("NYCAC event claims preserve collective credit and attributed interpretation", () => {
  const claims = new Map(knowledgeBank.claims.map((claim) => [claim.id, claim]));
  for (const claimId of Object.values(nycacFacebookEventClaimIds)) {
    assert.ok(claims.has(claimId), `missing claim ${claimId}`);
  }

  const participation = claims.get(nycacFacebookEventClaimIds.participationSystem);
  assert.match(participation.projections[0].text, /helped establish and produce/i);
  assert.match(participation.boundaries.join(" "), /collective|cohost|collaborator/i);
  assert.match(participation.antiClaims.join(" "), /solely created or produced/i);

  const interpretation = claims.get(nycacFacebookEventClaimIds.democraticPractice);
  assert.equal(interpretation.status, "use-with-care");
  assert.match(interpretation.boundaries.join(" "), /attributed to Jamie/i);
  assert.match(interpretation.antiClaims.join(" "), /participant shared/i);
});

test("NYCAC governed copy resists attendance, sole-credit, and causality inflation", () => {
  const governedClaims = new Set(Object.values(nycacFacebookEventClaimIds));
  const projectionCopy = knowledgeBank.claims
    .filter((claim) => governedClaims.has(claim.id))
    .flatMap((claim) => claim.projections.map((projection) => projection.text))
    .join("\n");
  const governedProjectionCopy = `${websiteCopy}\n${projectionCopy}`;

  assert.match(governedProjectionCopy, /helped establish and produce/i);
  assert.match(governedProjectionCopy, /not (?:verified )?attendance/i);
  assert.match(governedProjectionCopy, /collective|cohost|collaborator/i);
  assert.match(governedProjectionCopy, /Jamie describes/i);

  const unsafePatterns = [
    /Facebook responses? (?:equal|equaled|represented|proved|showed) (?:event )?attendance/i,
    /(?:9,?989|Facebook responses?) (?:people|attendees|participants) (?:attended|showed up|came)/i,
    /Jamie (?:solely |single-handedly )?(?:created|produced|organized|ran) (?:all|every|the) NYC Artist Coalition events?/i,
    /(?:the events?|the participation system) (?:caused|secured|delivered|won) (?:the )?(?:Cabaret Law repeal|Office of Nightlife|policy outcomes?)/i,
    /participants? shared (?:Jamie's|his) interpretation/i,
  ];

  for (const pattern of unsafePatterns) {
    assert.doesNotMatch(governedProjectionCopy, pattern);
  }
});

test("NYCAC event findings project only through governed claims and no archive route", () => {
  const intake = knowledgeBank.intakeItems.find(
    (item) =>
      item.id === "INTAKE-NYCAC-FACEBOOK-EVENT-POPULATION-2026-07-15",
  );
  assert.ok(intake);
  assert.equal(intake.status, "integrated");
  assert.equal(intake.projectionStatus, "no-public-projection");
  assert.ok(
    knowledgeBank.pages.every(
      (page) =>
        !["/proofs", "/events", "/knowledge-bank", "/nycartc-events"].includes(
          page.surface,
        ),
    ),
  );

  const serializedRegistry = JSON.stringify(publicRegistry);
  assert.doesNotMatch(serializedRegistry, /LOC-NYCAC-FACEBOOK-EVENT-RESEARCH/);
  assert.doesNotMatch(serializedRegistry, /INTAKE-NYCAC-FACEBOOK-EVENT-POPULATION/);
  assert.ok(
    Object.values(nycacFacebookEventSourceIds).every((sourceId) =>
      knowledgeBank.sources.some((source) => source.id === sourceId),
    ),
  );
});
