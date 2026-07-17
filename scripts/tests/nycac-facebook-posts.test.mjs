import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import {
  nycacFacebookPostClaimIds,
  nycacFacebookPostReviewSummary,
  nycacFacebookPostSourceIds,
} from "../../apps/www/src/data/knowledge-bank/nycacFacebookPosts.ts";
import publicRegistry from "../../apps/www/src/data/knowledge-bank/public-registry.json" with { type: "json" };

const censusPath =
  "docs/knowledge-bank/data/nycartc-public-facebook-post-ledger.json";
const routePath =
  "docs/knowledge-bank/data/nycartc-public-facebook-post-route-ledger.json";
const reportPath =
  "docs/knowledge-bank/projects/nyc-artist-coalition-facebook-posts.md";

const censusText = await readFile(censusPath, "utf8");
const census = JSON.parse(censusText);
const routeText = await readFile(routePath, "utf8");
const routes = JSON.parse(routeText);

const sum = (values) =>
  Object.values(values).reduce((total, value) => total + value, 0);

test("NYCAC Facebook census reconciles the complete surviving Page surface", () => {
  assert.equal(census.population.terminalTraversals, 2);
  assert.equal(census.population.scrollIterations, 824);
  assert.deepEqual(census.population.terminalScrollsWithoutAddition, [42, 41]);
  assert.equal(census.population.exactIdentitySetMatch, true);
  assert.equal(census.population.distinctSurvivingPosts, 444);
  assert.equal(census.records.length, 444);
  assert.equal(new Set(census.records.map((record) => record.recordId)).size, 444);
  assert.equal(sum(census.forms), 444);
  assert.equal(sum(census.primaryThemes), 444);
  assert.match(census.population.completenessBoundary, /not a native Meta export/i);

  const publicDigest = createHash("sha256")
    .update(
      census.records
        .map((record) => record.recordId)
        .sort()
        .join("\n"),
    )
    .digest("hex");
  assert.equal(publicDigest, census.population.publicDispositionSetSha256);
  assert.equal(
    census.population.protectedIdentitySetSha256,
    nycacFacebookPostReviewSummary.protectedIdentitySetSha256,
  );
});

test("forms, themes, and visible-signal aggregates remain reproducible", () => {
  assert.deepEqual(census.forms, nycacFacebookPostReviewSummary.forms);
  assert.deepEqual(
    census.primaryThemes,
    nycacFacebookPostReviewSummary.primaryThemes,
  );
  assert.deepEqual(
    census.stakeholderRouting.recordOccurrences,
    nycacFacebookPostReviewSummary.stakeholderRouting,
  );
  assert.equal(
    census.records.filter((record) => record.hasVisibleInteraction).length,
    389,
  );

  for (const metric of ["reactions", "comments", "shares"]) {
    const frequencySum = census.visibleInteractionSnapshot.unlinkableValueFrequencies[
      metric
    ].reduce(
      (total, row) => total + row.value * row.recordCount,
      0,
    );
    const recordCount = census.visibleInteractionSnapshot.unlinkableValueFrequencies[
      metric
    ].reduce((total, row) => total + row.recordCount, 0);
    assert.equal(recordCount, 444);
    assert.equal(
      frequencySum,
      census.visibleInteractionSnapshot.datedAggregateFloor[metric],
    );
  }
});

test("route inventory accounts for every normalized and protected route", () => {
  assert.equal(routes.accounting.rawOutboundLinkOccurrences, 64);
  assert.equal(routes.accounting.normalizedRoutes, 33);
  assert.equal(routes.rows.length, 33);
  assert.equal(
    routes.rows.reduce((total, row) => total + row.occurrences, 0),
    64,
  );
  assert.equal(routes.rows.filter((row) => row.publicUrl).length, 31);
  assert.equal(routes.rows.filter((row) => row.disposition === "protected").length, 2);
  assert.ok(
    routes.rows
      .filter((row) => row.publicUrl)
      .every((row) => /^https:\/\//.test(row.publicUrl)),
  );
  assert.ok(
    routes.rows
      .filter((row) => row.disposition === "protected")
      .every((row) => row.publicUrl === null),
  );
});

test("public artifacts exclude protected content and authenticated state", () => {
  const combined = `${censusText}\n${routeText}`;
  assert.doesNotMatch(combined, /\/(?:Users|Volumes|private\/tmp)\//);
  assert.doesNotMatch(combined, /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  assert.doesNotMatch(combined, /cookie|access.?token|session.?id/i);
  assert.doesNotMatch(combined, /zoom\.us|meet\.google|docs\.google|drive\.google/i);
  assert.ok(
    census.records.every(
      (record) =>
        !Object.hasOwn(record, "body") &&
        !Object.hasOwn(record, "message") &&
        !Object.hasOwn(record, "comments") &&
        !Object.hasOwn(record, "reactions") &&
        !Object.hasOwn(record, "shares") &&
        !Object.hasOwn(record, "url"),
    ),
  );
});

test("knowledge bank integrates governed sources, claims, inquiries, and intake", () => {
  const sourceIds = new Set(knowledgeBank.sources.map((source) => source.id));
  const claimIds = new Set(knowledgeBank.claims.map((claim) => claim.id));
  const inquiryIds = new Set(
    knowledgeBank.researchInquiries.map((inquiry) => inquiry.id),
  );

  for (const sourceId of Object.values(nycacFacebookPostSourceIds)) {
    assert.ok(sourceIds.has(sourceId), sourceId);
  }
  for (const claimId of Object.values(nycacFacebookPostClaimIds)) {
    assert.ok(claimIds.has(claimId), claimId);
  }
  assert.ok(inquiryIds.has("INQ-NYCAC-FACEBOOK-POST-POPULATION-2026"));
  assert.ok(inquiryIds.has("INQ-NYCAC-FACEBOOK-SOURCE-NETWORK-2026"));
  assert.ok(inquiryIds.has("INQ-NYCAC-FACEBOOK-PUBLISHER-ATTRIBUTION-2026"));

  for (const row of routes.rows.filter((row) => row.sourceId)) {
    assert.ok(sourceIds.has(row.sourceId), row.sourceId);
  }

  const intake = knowledgeBank.intakeItems.find(
    (item) => item.id === "INTAKE-NYCAC-FACEBOOK-POSTS-2026-07-15",
  );
  assert.equal(intake.status, "integrated");
  assert.equal(intake.projectionStatus, "no-public-projection");
  assert.deepEqual(
    new Set(intake.relatedClaimIds),
    new Set(Object.values(nycacFacebookPostClaimIds)),
  );
});

test("role, stakeholder, and interaction claims retain their boundaries", () => {
  const claims = new Map(knowledgeBank.claims.map((claim) => [claim.id, claim]));
  const role = claims.get(nycacFacebookPostClaimIds.publishingMemory);
  assert.equal(role.status, "use-with-care");
  assert.ok(role.projections.every((projection) => projection.status === "hold"));
  assert.match(role.internalClaim, /predominant person/i);
  assert.match(role.internalClaim, /other coalition participants/i);
  assert.match(role.boundaries.join(" "), /administrator chronology|publisher/i);
  assert.match(role.antiClaims.join(" "), /all 444|sole Page administrator/i);

  const stakeholder = claims.get(nycacFacebookPostClaimIds.stakeholderRouting);
  assert.match(stakeholder.boundaries.join(" "), /does not establish/i);
  assert.match(stakeholder.boundaries.join(" "), /does not mean 88 Council members/i);

  const signals = claims.get(nycacFacebookPostClaimIds.visibleSignals);
  assert.match(signals.boundaries.join(" "), /not lifetime analytics/i);
  assert.match(signals.boundaries.join(" "), /reach, attendance, conversion/i);
});

test("Facebook post findings do not create a public archive route", async () => {
  const claimIds = new Set(Object.values(nycacFacebookPostClaimIds));
  assert.ok(
    knowledgeBank.pages.every((page) =>
      page.occurrences.every((occurrence) => !claimIds.has(occurrence.claimId)),
    ),
  );
  assert.ok(
    knowledgeBank.pages.every(
      (page) =>
        !["/proofs", "/knowledge-bank", "/nycartc-posts", "/facebook-archive"].includes(
          page.surface,
        ),
    ),
  );
  const registry = JSON.stringify(publicRegistry);
  for (const claimId of Object.values(nycacFacebookPostClaimIds)) {
    assert.doesNotMatch(registry, new RegExp(claimId));
  }
  assert.doesNotMatch(registry, /INTAKE-NYCAC-FACEBOOK-POSTS/);

  const report = await readFile(reportPath, "utf8");
  assert.match(report, /Projection decision.*Knowledge bank only/i);
  assert.match(report, /No website page was changed/i);
  assert.match(report, /100 percent disposition coverage/i);
});

test("review summary preserves the first-party export boundary", () => {
  assert.equal(nycacFacebookPostReviewSummary.recoveredPostCount, 444);
  assert.equal(nycacFacebookPostReviewSummary.recordsReviewedPercent, 100);
  assert.equal(nycacFacebookPostReviewSummary.managerExportRows, 185);
  assert.equal(nycacFacebookPostReviewSummary.normalizedPublicSafeRoutes, 33);
  assert.equal(nycacFacebookPostReviewSummary.protectedRoutes, 2);
});
