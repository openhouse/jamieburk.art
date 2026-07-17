import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import {
  jamiePersonalFacebookPostClaimIds,
  jamiePersonalFacebookPostReviewSummary,
  jamiePersonalFacebookPostSourceIds,
} from "../../apps/www/src/data/knowledge-bank/jamiePersonalFacebookPosts.ts";
import publicRegistry from "../../apps/www/src/data/knowledge-bank/public-registry.json" with { type: "json" };

const controlsPath =
  "docs/knowledge-bank/data/jamie-personal-facebook-post-controls.json";
const reportPath =
  "docs/knowledge-bank/projects/jamie-personal-facebook-posts.md";

const controlsText = await readFile(controlsPath, "utf8");
const controls = JSON.parse(controlsText);
const sum = (values) =>
  Object.values(values).reduce((total, value) => total + value, 0);

test("personal Facebook census reconciles the full returned owner-filtered population", () => {
  const population = controls.populationControl;
  assert.equal(population.cursorPages, 621);
  assert.equal(population.returnedNodes, 3728);
  assert.equal(population.uniqueRecords, 1243);
  assert.equal(population.terminalHasNextPage, false);
  assert.equal(population.missingDates, 0);
  assert.equal(population.ownerAbsentRecords, 0);
  assert.equal(population.recoveredStart, "2006-12-19");
  assert.equal(population.recoveredEnd, "2022-06-12");
  assert.equal(sum(controls.recordsByYear), 1243);
  assert.equal(
    population.audienceLabelExposedRecords +
      population.audienceLabelNotExposedRecords,
    1243,
  );
  assert.deepEqual(jamiePersonalFacebookPostReviewSummary, {
    recordsReviewed: 1243,
    recordsReviewedPercent: 100,
    cursorPages: 621,
    returnedNodes: 3728,
    terminalHasNextPage: false,
    missingDates: 0,
    ownerAbsentRecords: 0,
    recoveredStart: "2006-12-19",
    recoveredEnd: "2022-06-12",
    audienceLabelExposedRecords: 270,
    audienceLabelNotExposedRecords: 973,
    missionRoutedRecords: 181,
    urlBearingRecords: 430,
    normalizedExternalDestinations: 549,
    selectedPublicSources: 6,
  });
  assert.match(controls.completenessBoundary, /not a native Meta export/i);
});

test("mission, source, and stakeholder routes remain reproducible and bounded", () => {
  assert.equal(controls.missionRouting.uniqueRecords, 181);
  assert.equal(controls.missionRouting.projectRecordCounts.wowList, 48);
  assert.equal(controls.missionRouting.projectRecordCounts.sundayDinner, 44);
  assert.equal(controls.missionRouting.projectRecordCounts.nycArtistCoalition, 34);
  assert.equal(controls.missionRouting.projectRecordCounts.letNycDance, 33);
  assert.equal(controls.postedUrlInventory.urlBearingRecords, 430);
  assert.equal(controls.postedUrlInventory.uniqueNormalizedExternalUrls, 549);
  assert.equal(controls.stakeholderRouting.recordCounts.newYorkCityCouncil, 20);
  assert.equal(controls.stakeholderRouting.recordCounts.rafaelEspinal, 18);
  assert.match(
    controls.stakeholderRouting.classificationBoundary,
    /not actions.*not evidence of engagement/i,
  );
  assert.match(
    controls.interactionAvailability,
    /did not expose reliable historical/i,
  );
});

test("selected public counters remain snapshots rather than a reach total", () => {
  assert.equal(controls.selectedPublicSourceControls.length, 6);
  const snapshots = controls.selectedPublicSourceControls
    .map((source) => source.currentCounters)
    .filter(Boolean);
  assert.equal(snapshots.length, 4);
  assert.match(controls.engagementBoundary, /Do not sum/i);
  assert.match(controls.engagementBoundary, /reach.*stakeholder engagement/i);
});

test("public artifact excludes the protected record-level corpus", () => {
  assert.doesNotMatch(controlsText, /\/(?:Users|Volumes|private\/tmp)\//);
  assert.doesNotMatch(
    controlsText,
    /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i,
  );
  assert.doesNotMatch(controlsText, /cookie|access.?token|session.?id|phone/i);
  assert.ok(!Object.hasOwn(controls, "records"));
  assert.ok(!Object.hasOwn(controls, "messages"));
  assert.ok(!Object.hasOwn(controls, "comments"));
  assert.equal(
    controls.protectedArtifactId,
    "jamie-personal-facebook-owner-post-census-2026-07",
  );
});

test("knowledge bank integrates sources, claims, inquiries, and protected intake", () => {
  const sourceIds = new Set(knowledgeBank.sources.map((source) => source.id));
  const claimIds = new Set(knowledgeBank.claims.map((claim) => claim.id));
  const inquiryIds = new Set(
    knowledgeBank.researchInquiries.map((inquiry) => inquiry.id),
  );

  for (const sourceId of Object.values(jamiePersonalFacebookPostSourceIds)) {
    assert.ok(sourceIds.has(sourceId), sourceId);
  }
  for (const claimId of Object.values(jamiePersonalFacebookPostClaimIds)) {
    assert.ok(claimIds.has(claimId), claimId);
  }
  assert.ok(inquiryIds.has("INQ-FB-JAMIE-POST-CORPUS-2026"));
  assert.ok(inquiryIds.has("INQ-FB-JAMIE-POSTED-SOURCES-2026"));
  assert.ok(inquiryIds.has("INQ-FB-JAMIE-STAKEHOLDER-ENGAGEMENT-2026"));
  assert.ok(inquiryIds.has("INQ-FB-JAMIE-COUNCILSTAT-ROLE-2026"));

  const intake = knowledgeBank.intakeItems.find(
    (item) => item.id === "INTAKE-FB-JAMIE-PERSONAL-POSTS-2026-07-15",
  );
  assert.equal(intake.status, "integrated");
  assert.equal(intake.projectionStatus, "no-public-projection");
  assert.deepEqual(
    new Set(intake.relatedClaimIds),
    new Set(Object.values(jamiePersonalFacebookPostClaimIds)),
  );
});

test("claims preserve engagement, role, and collective-credit boundaries", () => {
  const claims = new Map(knowledgeBank.claims.map((claim) => [claim.id, claim]));

  const stakeholder = claims.get(
    jamiePersonalFacebookPostClaimIds.stakeholderAddressing,
  );
  assert.equal(stakeholder.status, "use-with-care");
  assert.match(stakeholder.boundaries.join(" "), /not actions/i);
  assert.match(stakeholder.antiClaims.join(" "), /Council members engaged/i);

  const actionRouting = claims.get(
    jamiePersonalFacebookPostClaimIds.actionRouting,
  );
  assert.equal(actionRouting.status, "confirmed-with-boundary");
  assert.match(actionRouting.internalClaim, /practical participation routes/i);
  assert.match(actionRouting.boundaries.join(" "), /does not establish clicks/i);

  const councilStat = claims.get(
    jamiePersonalFacebookPostClaimIds.councilStatContext,
  );
  assert.equal(councilStat.status, "use-with-care");
  assert.match(
    councilStat.boundaries.join(" "),
    /no employment, title, contract, team membership, or hiring authority/i,
  );

  const kcTownHall = claims.get(
    jamiePersonalFacebookPostClaimIds.kcTownHallCoInitiation,
  );
  assert.match(kcTownHall.internalClaim, /Julia Fredenburg/i);
  assert.match(kcTownHall.antiClaims.join(" "), /solely founded/i);
});

test("personal Facebook research does not create a website archive route", async () => {
  const claimIds = new Set(Object.values(jamiePersonalFacebookPostClaimIds));
  assert.ok(
    knowledgeBank.pages.every((page) =>
      page.occurrences.every((occurrence) => !claimIds.has(occurrence.claimId)),
    ),
  );
  assert.ok(
    knowledgeBank.pages.every(
      (page) =>
        ![
          "/proofs",
          "/knowledge-bank",
          "/facebook",
          "/facebook-archive",
          "/engagement-dashboard",
        ].includes(page.surface),
    ),
  );

  const registry = JSON.stringify(publicRegistry);
  for (const claimId of Object.values(jamiePersonalFacebookPostClaimIds)) {
    assert.doesNotMatch(registry, new RegExp(claimId));
  }
  assert.doesNotMatch(registry, /INTAKE-FB-JAMIE-PERSONAL-POSTS/);

  const report = await readFile(reportPath, "utf8");
  assert.match(report, /100 percent.*every unique record returned/is);
  assert.match(report, /no corpus-wide stakeholder-group engagement claim/is);
  assert.match(report, /No public website copy changes/i);
});
