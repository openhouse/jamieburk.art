#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { knowledgeBank } from "../apps/www/src/data/knowledge-bank/records.ts";
import { knowledgeLifecycle } from "../apps/www/src/data/knowledge-bank/lifecycle-records.ts";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fixturePath =
  "apps/www/src/data/knowledge-bank/fixtures/personal-wowlist-facebook-events-full-population.json";

function read(relativePath) {
  return readFileSync(path.join(repoRoot, relativePath), "utf8");
}

function includesAll(source, values) {
  return values.every((value) => source.includes(value));
}

const fixtureText = read(fixturePath);
const fixture = JSON.parse(fixtureText);
const projectNote = read(
  "docs/knowledge-bank/projects/personal-wowlist-facebook-events.md"
);
const intakeNote = read(
  "docs/knowledge-bank/intake/2026-07-15-personal-wowlist-facebook-events-full-population.md"
);
const sundayDinner = read("apps/www/src/content/work/196-sunday-dinner.mdx");
const wowList = read("apps/www/src/content/work/wowlist.mdx");
const proofSource = read("apps/www/src/data/proofs.ts");
const normalizedDocs = `${projectNote}\n${intakeNote}`.replace(/\s+/g, " ");
const checks = [];

function check(dimension, label, points, passes, hard = true) {
  checks.push({ dimension, label, points, passes: Boolean(passes), hard });
}

const personal = fixture.surfaces.personal;
const wow = fixture.surfaces.wowlist;
const ledger = fixture.populationLedger;
const selected = fixture.selectedPublicEvents;
const dispositions = fixture.dispositionCounts;

check(
  "Population reconciliation",
  "The complete exposed personal population and recurrence arithmetic reproduce",
  16,
  personal.displayedInstances === 511 &&
    personal.uniqueParentEvents === 502 &&
    personal.recurringParentEvents === 4 &&
    personal.recurringInstances === 13 &&
    ledger.length === 511 &&
    ledger.every((row, index) => row.ordinal === index + 1) &&
    personal.stableTerminalCounts.length === 3 &&
    personal.stableTerminalCounts.every((count) => count === 511) &&
    includesAll(normalizedDocs, [
      "ten consecutive terminal loads",
      "exactly matched the protected capture",
      "capture-date live index"
    ])
);

const dispositionSum = Object.values(dispositions).reduce(
  (sum, count) => sum + count,
  0
);

check(
  "Population reconciliation",
  "Every exposed row has an anonymous public-safe disposition",
  14,
  dispositionSum === 511 &&
    dispositions["held-profile-association-only"] === 398 &&
    dispositions["withheld-private"] === 33 &&
    dispositions["represented-in-nycac-census"] === 23 &&
    dispositions["research-gap"] === 36 &&
    dispositions["selected-public-organizer-record"] === 21 &&
    ledger.filter((row) => row.disposition === "withheld-private").length === 33
);

const prohibitedLedgerKeys = new Set([
  "eventId",
  "eventTimeId",
  "title",
  "description",
  "address",
  "venue",
  "organizer",
  "url",
  "guest",
  "attendee"
]);

check(
  "Public safety",
  "Held and private records remain metadata-only and non-identifying",
  12,
  ledger.every((row) =>
    Object.keys(row).every((key) => !prohibitedLedgerKeys.has(key))
  ) &&
    fixture.publicSafety.privateEventTitlesPublished === false &&
    fixture.publicSafety.rawDescriptionsPublished === false &&
    fixture.publicSafety.exactResidentialAddressesPublished === false &&
    fixture.publicSafety.contactDetailsPublished === false &&
    fixture.publicSafety.attendeeOrGuestIdentitiesPublished === false &&
    fixture.publicSafety.authenticatedSessionDataPublished === false &&
    !fixtureText.includes("/Users/") &&
    !fixtureText.includes("/Volumes/")
);

check(
  "Role discipline",
  "Only public organizer-attributed records enter the selected chronology",
  13,
  selected.length === 21 &&
    selected.every(
      (event) =>
        event.eventPageCredit.includes("Jamie Burkart") &&
        [
          "event-page-organizer-display",
          "event-page-co-organizer-display"
        ].includes(event.attributionRelationship) &&
        event.responseInterpretation.includes("not attendance") &&
        event.responseInterpretation.includes("not")
    ) &&
    selected[0].date === "2019-02-24" &&
    selected.at(-1).date === "2006-12-02" &&
    includesAll(normalizedDocs, [
      "does not establish organization, authorship, attendance, endorsement, contribution, or impact",
      "sole authorship",
      "not summed"
    ])
);

const routeRelationships = fixture.missionRelevantSourceRoutes.map(
  (route) => route.relationship
);

check(
  "Source routing",
  "Mission-relevant project and research routes stay relationship-labeled",
  10,
  personal.externalUrlOccurrences === 77 &&
    personal.uniqueExternalUrls === 77 &&
    fixture.missionRelevantSourceRoutes.length === 9 &&
    routeRelationships.filter((value) => value === "selected-public-organizer-record")
      .length === 5 &&
    routeRelationships.filter(
      (value) => value === "profile-association-only-research-lead"
    ).length === 2 &&
    includesAll(fixtureText, [
      "http://talksnotraids.com/",
      "http://letnycdance.com/",
      "https://wowlist.org/events/22791/sunday-dinner-200",
      "http://rivermarvel.com/",
      "http://kcdiy.org/"
    ])
);

check(
  "WOW List boundary",
  "The current zero-card owner surface is not converted into historical absence",
  10,
  wow.currentOwnerVisibleEventCards === 0 &&
    wow.surfaceMessage === "No events to show" &&
    wow.boundary.includes("does not establish") &&
    includesAll(normalizedDocs, [
      "zero event cards",
      "not evidence that WOW List never created",
      "native Page export"
    ])
);

const sourceById = new Map(knowledgeBank.sources.map((source) => [source.id, source]));
const claimById = new Map(knowledgeBank.claims.map((claim) => [claim.id, claim]));
const inquiryById = new Map(
  knowledgeBank.researchInquiries.map((inquiry) => [inquiry.id, inquiry])
);
const claimIds = [
  "CLM-FACEBOOK-PERSONAL-WOWLIST-EVENT-POPULATION",
  "CLM-FACEBOOK-JAMIE-CONVENING-PRACTICE",
  "CLM-FACEBOOK-SUNDAY-DINNER-MILESTONES",
  "CLM-FACEBOOK-WOWLIST-IN-PRACTICE",
  "CLM-FACEBOOK-EARLY-PARTICIPATORY-PRACTICE"
];
const sourceIds = [
  "SRC-FACEBOOK-PERSONAL-EVENT-SURFACE-2026",
  "SRC-FACEBOOK-WOWLIST-EVENT-SURFACE-2026",
  "SRC-FACEBOOK-PERSONAL-WOWLIST-EVENT-CENSUS-2026",
  "SRC-FACEBOOK-PERSONAL-WOWLIST-EVENT-PROTECTED-RUN-2026",
  "SRC-FACEBOOK-SUNDAY-DINNER-100-2014",
  "SRC-FACEBOOK-SUNDAY-DINNER-200-2016",
  "SRC-FACEBOOK-RAFT-LAUNCH-2007",
  "SRC-FACEBOOK-MICROPOP-2007",
  "SRC-FACEBOOK-SEMANTIC-WEB-2006"
];

check(
  "Knowledge lifecycle",
  "Canonical sources, claims, inquiries, and promotion decisions are wired",
  12,
  sourceIds.every((id) => sourceById.has(id)) &&
    claimIds.every((id) => claimById.has(id)) &&
    [
      "INQ-FACEBOOK-PERSONAL-EVENT-OWNER-EXPORT",
      "INQ-FACEBOOK-WOWLIST-HISTORICAL-EVENT-EXPORT",
      "INQ-FACEBOOK-PERSONAL-EVENT-CORROBORATION"
    ].every((id) => inquiryById.has(id)) &&
    knowledgeLifecycle.leads.some(
      (lead) => lead.id === "LEAD-FACEBOOK-PERSONAL-EVENT-FULL-POPULATION"
    ) &&
    knowledgeLifecycle.leads.some(
      (lead) => lead.id === "LEAD-FACEBOOK-WOWLIST-EVENT-CURRENT-SURFACE"
    ) &&
    claimIds.every((id) =>
      knowledgeLifecycle.promotionDecisions.some(
        (decision) =>
          decision.targetCanonicalClaimId === id &&
          decision.decision === "promote" &&
          decision.humanReviewStatus === "approved"
      )
    )
);

check(
  "Selective projection",
  "Only the useful milestone and product-practice bridge reach the website",
  9,
  sundayDinner.includes("CLM-FACEBOOK-SUNDAY-DINNER-MILESTONES") &&
    wowList.includes("CLM-FACEBOOK-WOWLIST-IN-PRACTICE") &&
    !sundayDinner.includes("CLM-FACEBOOK-PERSONAL-WOWLIST-EVENT-POPULATION") &&
    !wowList.includes("CLM-FACEBOOK-JAMIE-CONVENING-PRACTICE") &&
    includesAll(proofSource, [
      "CLM-FACEBOOK-SUNDAY-DINNER-MILESTONES",
      "CLM-FACEBOOK-WOWLIST-IN-PRACTICE",
      "contemporaneous milestones",
      "one concrete route"
    ])
);

check(
  "Artifact integrity",
  "The fixture and method note are stable and auditable",
  4,
  createHash("sha256").update(fixtureText).digest("hex") ===
    "23c7d57699dc30d84d6738f7ece4b47f3497550fa2dd8690ca7c4a86719d70ef" &&
    fixture.schemaVersion === 1 &&
    fixture.capturedAt === "2026-07-15" &&
    fixture.reviewedAt === "2026-07-15"
);

const possiblePoints = checks.reduce((sum, item) => sum + item.points, 0);
const earnedPoints = checks.reduce(
  (sum, item) => sum + (item.passes ? item.points : 0),
  0
);
const score = Math.round((earnedPoints / possiblePoints) * 100);
const failures = checks.filter((item) => !item.passes);
const hardFailures = failures.filter((item) => item.hard);
const threshold = 100;

console.log(
  `Personal and WOW List Facebook events eval: ${score}/100 (criterion: >= ${threshold}, no hard failures)`
);

for (const dimension of [...new Set(checks.map((item) => item.dimension))]) {
  const dimensionChecks = checks.filter((item) => item.dimension === dimension);
  const earned = dimensionChecks.reduce(
    (sum, item) => sum + (item.passes ? item.points : 0),
    0
  );
  const possible = dimensionChecks.reduce((sum, item) => sum + item.points, 0);
  console.log(`- ${dimension}: ${earned}/${possible}`);
}

if (failures.length) {
  console.error("Personal and WOW List Facebook events gaps:");
  for (const item of failures) {
    console.error(`- ${item.hard ? "HARD " : ""}${item.dimension}: ${item.label}`);
  }
}

if (score < threshold || hardFailures.length) process.exit(1);

console.log("Personal and WOW List Facebook events criterion met.");
