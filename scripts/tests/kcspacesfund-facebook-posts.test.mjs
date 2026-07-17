import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import {
  kcSpacesFundFacebookPostClaimIds,
  kcSpacesFundFacebookPostReviewSummary,
  kcSpacesFundFacebookPostSourceIds,
} from "../../apps/www/src/data/knowledge-bank/kcSpacesFundFacebookPosts.ts";
import publicRegistry from "../../apps/www/src/data/knowledge-bank/public-registry.json" with { type: "json" };

const ledgerPath =
  "docs/knowledge-bank/data/kcspacesfund-public-facebook-post-ledger.json";
const reportPath =
  "docs/knowledge-bank/projects/kc-spaces-fund-facebook-posts.md";

const ledgerText = await readFile(ledgerPath, "utf8");
const ledger = JSON.parse(ledgerText);
const sum = (values) =>
  Object.values(values).reduce((total, value) => total + value, 0);

test("KC Spaces Fund Facebook census reconciles the surviving Page denominator", () => {
  assert.deepEqual(ledger.completeness.terminalTraversalCounts, [40, 38, 40]);
  assert.deepEqual(ledger.completeness.scrollIterations, [54, 49, 74]);
  assert.deepEqual(ledger.completeness.terminalNoAdditionPasses, [18, 18, 24]);
  assert.equal(ledger.completeness.survivingPublicRecords, 40);
  assert.equal(ledger.records.length, 40);
  assert.equal(new Set(ledger.records.map((record) => record.id)).size, 40);
  assert.equal(ledger.completeness.stableMediaIds, 21);
  assert.equal(ledger.completeness.stableMediaSetMatchedAcrossAllTraversals, true);

  const recordDigest = createHash("sha256")
    .update(ledger.records.map((record) => record.id).sort().join("\n"))
    .digest("hex");
  const mediaDigest = createHash("sha256")
    .update(ledger.records.flatMap((record) => record.mediaIds).sort().join("\n"))
    .digest("hex");
  assert.equal(recordDigest, ledger.completeness.publicRecordIdSetSha256);
  assert.equal(mediaDigest, ledger.completeness.protectedMediaIdSetSha256);
  assert.equal(
    recordDigest,
    kcSpacesFundFacebookPostReviewSummary.publicRecordIdSetSha256,
  );
  assert.equal(
    mediaDigest,
    kcSpacesFundFacebookPostReviewSummary.protectedMediaIdSetSha256,
  );
  assert.match(ledger.completeness.excludedHistory, /deleted|owner-export/i);
});

test("record forms, recovery states, and mission-mode totals remain reproducible", () => {
  const count = (predicate) => ledger.records.filter(predicate).length;
  assert.equal(count((record) => record.recordForm === "media-backed"), 20);
  assert.equal(count((record) => record.recordForm === "non-media"), 20);
  assert.equal(count((record) => record.recoveryState === "content-materialized"), 19);
  assert.equal(count((record) => record.recoveryState === "metadata-depth"), 15);
  assert.equal(count((record) => record.recoveryState === "attachment-unavailable"), 6);
  assert.equal(
    count((record) => record.missionModes.includes("application-routing")),
    8,
  );
  assert.equal(count((record) => record.missionModes.includes("fundraising")), 13);
  assert.equal(
    count((record) => record.missionModes.includes("funded-space-spotlight")),
    10,
  );
  assert.equal(ledger.aggregate.mediaBackedRecords + ledger.aggregate.nonMediaRecords, 40);
  assert.equal(
    ledger.aggregate.contentMaterializedRecords +
      ledger.aggregate.metadataDepthRecords +
      ledger.aggregate.unavailableAttachmentRecords,
    40,
  );
});

test("funded-space spotlights remain a ten-record Page inventory, not a grantee total", () => {
  const spotlightSubjects = ledger.records
    .map((record) => record.spotlightSubject)
    .filter(Boolean)
    .sort();
  assert.deepEqual(spotlightSubjects, [
    "Blackbox on Troost",
    "Farewell Transmission",
    "GetWoke: Queer and Trans People of Color",
    "Kansas City Textile Arts Center",
    "Latino Foundation for the Arts",
    "One Mic Stand",
    "Parker 2",
    "SWAN",
    "UN/TUCK Queer & Trans Collective",
    "Vulpes Bastille",
  ]);
  assert.equal(new Set(spotlightSubjects).size, 10);
});

test("visible response remains anonymous, mutable, and arithmetically bounded", () => {
  assert.equal(
    ledger.records.filter((record) => record.visibleReactionSignals > 0).length,
    28,
  );
  assert.equal(
    ledger.records.reduce(
      (total, record) => total + record.visibleReactionSignals,
      0,
    ),
    119,
  );
  assert.equal(
    ledger.records.filter((record) => record.visibleCommentRelation).length,
    4,
  );
  assert.equal(
    ledger.records.filter(
      (record) =>
        record.visibleCommentRelation === "cultural-space-account" ||
        record.visibleCommentRelation === "funded-cultural-space-account",
    ).length,
    3,
  );
});

test("public artifact excludes private content and authenticated state", () => {
  assert.doesNotMatch(ledgerText, /\/(?:Users|Volumes|private\/tmp)\//);
  assert.doesNotMatch(ledgerText, /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  assert.doesNotMatch(ledgerText, /cookie|access.?token|session.?id|phone/i);
  assert.ok(
    ledger.records.every(
      (record) =>
        !Object.hasOwn(record, "body") &&
        !Object.hasOwn(record, "message") &&
        !Object.hasOwn(record, "comments") &&
        !Object.hasOwn(record, "commenter") &&
        !Object.hasOwn(record, "reactionIdentities"),
    ),
  );
  assert.equal(
    Object.values(ledger.routeDictionary).filter((route) => route.url === null).length,
    3,
  );
});

test("knowledge bank integrates governed sources, claims, inquiries, and intake", () => {
  const sourceIds = new Set(knowledgeBank.sources.map((source) => source.id));
  const claimIds = new Set(knowledgeBank.claims.map((claim) => claim.id));
  const inquiryIds = new Set(
    knowledgeBank.researchInquiries.map((inquiry) => inquiry.id),
  );

  for (const sourceId of Object.values(kcSpacesFundFacebookPostSourceIds)) {
    assert.ok(sourceIds.has(sourceId), sourceId);
  }
  for (const claimId of Object.values(kcSpacesFundFacebookPostClaimIds)) {
    assert.ok(claimIds.has(claimId), claimId);
  }
  assert.ok(inquiryIds.has("INQ-KCSPACESFUND-FACEBOOK-POPULATION-2026"));
  assert.ok(inquiryIds.has("INQ-KCSPACESFUND-FACEBOOK-SOURCES-2026"));
  assert.ok(inquiryIds.has("INQ-KCSPACESFUND-ROLE-2026"));

  const intake = knowledgeBank.intakeItems.find(
    (item) => item.id === "INTAKE-KCSPACESFUND-FACEBOOK-POSTS-2026-07-15",
  );
  assert.equal(intake.status, "integrated");
  assert.equal(intake.projectionStatus, "no-public-projection");
  assert.deepEqual(
    new Set(intake.relatedClaimIds),
    new Set(Object.values(kcSpacesFundFacebookPostClaimIds)),
  );
});

test("Jamie's infrastructure claim and naming memory preserve the role boundary", () => {
  const claims = new Map(knowledgeBank.claims.map((claim) => [claim.id, claim]));
  const infrastructure = claims.get(kcSpacesFundFacebookPostClaimIds.infrastructure);
  assert.equal(infrastructure.status, "confirmed-with-boundary");
  assert.match(infrastructure.internalClaim, /Ghost campaign site/i);
  assert.match(infrastructure.internalClaim, /reusable campaign theme/i);
  assert.match(infrastructure.internalClaim, /deployment/i);
  assert.match(infrastructure.internalClaim, /fundraising-display/i);
  assert.match(infrastructure.boundaries.join(" "), /Do not assign Jamie Facebook posting/i);

  const naming = claims.get(kcSpacesFundFacebookPostClaimIds.namingMemory);
  assert.equal(naming.status, "use-with-care");
  assert.ok(naming.projections.every((projection) => projection.status === "hold"));
  assert.match(naming.internalClaim, /recalls supporting/i);
  assert.match(naming.boundaries.join(" "), /not automatic corroboration/i);
  assert.match(naming.antiClaims.join(" "), /alone named|owned|posted/i);
});

test("Facebook archival findings do not create a public archive route", async () => {
  const claimIds = new Set(Object.values(kcSpacesFundFacebookPostClaimIds));
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
          "/kcspacesfund-posts",
          "/facebook-archive",
        ].includes(page.surface),
    ),
  );
  const registry = JSON.stringify(publicRegistry);
  for (const claimId of Object.values(kcSpacesFundFacebookPostClaimIds)) {
    assert.doesNotMatch(registry, new RegExp(claimId));
  }
  assert.doesNotMatch(registry, /INTAKE-KCSPACESFUND-FACEBOOK-POSTS/);

  const report = await readFile(reportPath, "utf8");
  assert.match(report, /Projection decision.*Knowledge bank only/i);
  assert.match(report, /No website page was changed/i);
  assert.match(report, /40 \/ 40 \(100%\)/i);
});
