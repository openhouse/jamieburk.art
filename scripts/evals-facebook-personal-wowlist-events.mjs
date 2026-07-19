#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { knowledgeBank } from "../apps/www/src/data/knowledge-bank/records.ts";
import { validateFacebookPersonalWowListEventsLedger } from "./lib/facebook-personal-wowlist-events-validation.mjs";

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

const sourceById = new Map(
  knowledgeBank.sources.map((source) => [source.id, source])
);
const claimById = new Map(
  knowledgeBank.claims.map((claim) => [claim.id, claim])
);
const inquiryById = new Map(
  knowledgeBank.researchInquiries.map((inquiry) => [inquiry.id, inquiry])
);
const intakeById = new Map(
  knowledgeBank.intake.map((intake) => [intake.id, intake])
);

const criteria = [
  {
    name: "Population accounting",
    points: 20,
    pass:
      validateFacebookPersonalWowListEventsLedger(ledger).length === 0 &&
      ledger.personalProfile.population.displayedEventSlots === 511 &&
      ledger.personalProfile.population.explicitJamieOrganizerRecords === 20 &&
      ledger.personalProfile.population.profileAssociatedRecords === 491 &&
      ledger.personalProfile.population.unresolvedHostControlCountDifference === 1
  },
  {
    name: "Attribution discipline",
    points: 15,
    pass: (() => {
      const claim = claimById.get("CLM-FACEBOOK-JAMIE-ORGANIZER-PRACTICE");
      return (
        claim?.status === "confirmed-with-boundary" &&
        claim.boundaries.some((boundary) =>
          /not a complete lifetime event denominator/i.test(boundary)
        ) &&
        claim.antiClaims.some((antiClaim) =>
          /Every profile-associated event/i.test(antiClaim)
        )
      );
    })()
  },
  {
    name: "Privacy minimization",
    points: 15,
    pass: (() => {
      const source = sourceById.get(
        "SRC-FACEBOOK-PERSONAL-WOWLIST-EVENT-PROTECTED-CAPTURE-2026"
      );
      return (
        ledger.acquisitionIntegrity.protectedCapturePublished === false &&
        ledger.privacy.status === "public-safe-minimized-ledger" &&
        source?.visibility === "protected" &&
        !source.protectedLocatorId
      );
    })()
  },
  {
    name: "Traction boundaries",
    points: 15,
    pass: (() => {
      const claim = claimById.get(
        "CLM-FACEBOOK-JAMIE-ORGANIZER-RESPONSE-SIGNALS"
      );
      return (
        claim?.status === "use-with-care" &&
        claim.projections.every((projection) => projection.status === "hold") &&
        claim.boundaries.some((boundary) => /Do not sum/i.test(boundary)) &&
        claim.boundaries.some((boundary) =>
          /attendance, unique people, stakeholder identity, reach, endorsement/i.test(
            boundary
          )
        )
      );
    })()
  },
  {
    name: "WOW List preservation honesty",
    points: 10,
    pass: (() => {
      const claim = claimById.get(
        "CLM-WOWLIST-FACEBOOK-CURRENT-RENDER-GAP"
      );
      const inquiry = inquiryById.get(
        "INQ-WOWLIST-FACEBOOK-HISTORICAL-EVENTS"
      );
      return (
        claim?.status === "confirmed-with-boundary" &&
        claim.antiClaims.includes("WOW List never created Facebook events.") &&
        inquiry?.resultStatus === "open" &&
        ledger.wowListPage.currentEventsSurface.historicalPopulationStatus ===
          "unresolved"
      );
    })()
  },
  {
    name: "Source maturation",
    points: 15,
    pass: (() => {
      const source = sourceById.get(
        "SRC-WATERWAYS-PITCH-PART-III-2007-11-12"
      );
      const claim = claimById.get("CLM-WATERWAYS-RAFT-EXPEDITION");
      const inquiry = inquiryById.get("INQ-WATERWAYS-FULL-PROGRAM-CORPUS");
      return (
        source?.kind === "published-article" &&
        source.organization === "The Pitch" &&
        source.supportsGenerally.includes(
          "their weeks spent constructing the recycled-material raft"
        ) &&
        source.doesNotEstablish.includes("the later Gulf terminus") &&
        claim?.reviewedAt === "2026-07-16" &&
        claim?.evidence.some(
          (evidence) =>
            evidence.sourceId ===
            "SRC-WATERWAYS-PITCH-PART-III-2007-11-12"
        ) &&
        inquiry?.runAt === "2026-07-16"
      );
    })()
  },
  {
    name: "Knowledge lifecycle",
    points: 10,
    pass: (() => {
      const intake = intakeById.get(
        "INT-FACEBOOK-PERSONAL-WOWLIST-EVENTS-2026"
      );
      return (
        intake?.status === "matured" &&
        intake.claimIds.length === 7 &&
        intake.inquiryIds.length === 3 &&
        intake.artifactPaths.length === 4
      );
    })()
  }
];

const score = criteria.reduce(
  (total, criterion) => total + (criterion.pass ? criterion.points : 0),
  0
);
for (const criterion of criteria) {
  console.log(
    `${criterion.pass ? "PASS" : "FAIL"} ${criterion.name} (${criterion.points})`
  );
}
console.log(`Facebook personal/WOW List events eval score: ${score}/100`);
assert.equal(score, 100, "Facebook personal/WOW List event criteria were not met.");
