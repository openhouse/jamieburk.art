#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { knowledgeBank } from "../apps/www/src/data/knowledge-bank/records.ts";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fixturePath =
  "apps/www/src/data/knowledge-bank/fixtures/personal-wowlist-facebook-events-full-population.json";

function read(relativePath) {
  return readFileSync(path.join(repoRoot, relativePath), "utf8");
}

function includesAll(source, values) {
  return values.every((value) => source.includes(value));
}

function allObjectKeys(value, result = []) {
  if (Array.isArray(value)) {
    for (const item of value) allObjectKeys(item, result);
  } else if (value && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) {
      result.push(key);
      allObjectKeys(item, result);
    }
  }
  return result;
}

const fixtureText = read(fixturePath);
const fixture = JSON.parse(fixtureText);
const receipt = read(
  "docs/knowledge-bank/intake/2026-07-15-personal-wowlist-facebook-events-full-population.md"
);
const projectNote = read(
  "docs/knowledge-bank/projects/personal-wowlist-facebook-events.md"
);
const evalRun = read(
  "evals/knowledge-bank/runs/2026-07-15-personal-wowlist-facebook-events.md"
);
const sundayDinner = read("apps/www/src/content/work/196-sunday-dinner.mdx");
const wowlist = read("apps/www/src/content/work/wowlist.mdx");
const proofSource = read("apps/www/src/data/proofs.ts");
const normalizedDocs = `${receipt}\n${projectNote}\n${evalRun}`.replace(/\s+/g, " ");

const checks = [];

function check(dimension, label, points, passes) {
  checks.push({ dimension, label, points, passes: Boolean(passes), hard: true });
}

const personal = fixture.surfaces.personal;
const wow = fixture.surfaces.wowlist;
const ledger = fixture.populationLedger;
const selected = fixture.selectedPublicEvents;
const dispositions = fixture.dispositionCounts;
const yearTotal = Object.values(personal.yearCounts).reduce((sum, count) => sum + count, 0);
const fixtureSha = createHash("sha256").update(fixtureText).digest("hex");

check(
  "Population reconciliation",
  "The full live denominator, recurrence arithmetic, and terminal convergence reproduce",
  18,
  personal.displayedInstances === 511 &&
    personal.uniqueParentEvents === 502 &&
    personal.recurringParentEvents === 4 &&
    personal.recurringInstances === 13 &&
    yearTotal === 511 &&
    JSON.stringify(personal.stableTerminalCounts) === JSON.stringify([511, 511, 511]) &&
    ledger.length === 511 &&
    new Set(ledger.map((row) => row.ordinal)).size === 511 &&
    ledger.every((row, index) => row.ordinal === index + 1) &&
    includesAll(normalizedDocs, [
      "six no-growth rounds",
      "same 511 instance URLs",
      "capture-date",
      "complete native Meta export"
    ])
);

check(
  "Disposition and privacy",
  "Every row has one public-safe disposition and withheld categories reconcile",
  14,
  dispositions["held-profile-association-only"] === 398 &&
    dispositions["withheld-private"] === 33 &&
    dispositions["represented-in-nycac-census"] === 23 &&
    dispositions["research-gap"] === 36 &&
    dispositions["selected-public-organizer-record"] === 21 &&
    Object.values(dispositions).reduce((sum, count) => sum + count, 0) === 511 &&
    ledger.filter((row) => row.disposition === "selected-public-organizer-record").length === 21 &&
    includesAll(normalizedDocs, [
      "presence on Jamie's profile does not establish a role",
      "Research gap",
      "private event titles",
      "social graph"
    ])
);

check(
  "Role-safe chronology",
  "The selected set is explicitly attributed, bounded, and chronologically complete",
  12,
  selected.length === 21 &&
    selected[0].date === "2019-02-24" &&
    selected.at(-1).date === "2006-12-02" &&
    selected.every((event) =>
      ["event-page-organizer-display", "event-page-co-organizer-display"].includes(
        event.attributionRelationship
      )
    ) &&
    includesAll(normalizedDocs, [
      "The 21 selected pages span December 2006 through February 2019",
      "sole authorship",
      "sole production",
      "unless another source establishes Jamie's relationship"
    ])
);

const event100 = selected.find((event) => event.url.includes("702417306475691"));
const event200 = selected.find((event) => event.url.includes("551536301637994"));

check(
  "Sunday Dinner milestones",
  "The 100th and 200th pages preserve bounded milestone and shared-credit evidence",
  10,
  event100?.title === "SUNDAY DINNER Turns 100!" &&
    event100.eventPageCredit === "Jamie Burkart" &&
    event200?.title.startsWith("200th Sunday Dinner!") &&
    event200.eventPageCredit === "Julia Fredenburg and Jamie Burkart" &&
    includesAll(normalizedDocs, [
      "contemporaneous milestone records",
      "not an independent audit of every Sunday Dinner",
      "Julia Fredenburg and Jamie"
    ])
);

check(
  "WOW List boundary",
  "The zero current surface and one affirmative historical route remain distinct",
  10,
  wow.currentOwnerVisibleEventCards === 0 &&
    wow.surfaceMessage === "No events to show" &&
    fixture.missionRelevantSourceRoutes.some(
      (route) => route.url === "https://wowlist.org/events/22791/sunday-dinner-200"
    ) &&
    includesAll(normalizedDocs, [
      "zero current owner-visible event cards",
      "not evidence that WOW List never created",
      "one concrete route"
    ])
);

check(
  "Source and stakeholder routing",
  "Mission routes, NYCAC overlap, and response semantics stay auditable",
  8,
  personal.externalUrlOccurrences === 77 &&
    personal.uniqueExternalUrls === 77 &&
    fixture.missionRelevantSourceRoutes.length === 9 &&
    personal.nycacCensusOverlap === 23 &&
    fixture.missionRelevantSourceRoutes.some((route) => route.url.includes("talksnotraids")) &&
    fixture.missionRelevantSourceRoutes.some((route) => route.url.includes("letnycdance")) &&
    includesAll(normalizedDocs, [
      "not verified attendance",
      "unique people",
      "page-level source is better evidence",
      "Values are not summed"
    ])
);

const intake = knowledgeBank.intakeItems.find(
  (item) =>
    item.id ===
    "INTAKE-2026-07-15-PERSONAL-WOWLIST-FACEBOOK-EVENT-FULL-POPULATION"
);
const claimById = new Map(knowledgeBank.claims.map((claim) => [claim.id, claim]));
const inquiryById = new Map(
  knowledgeBank.researchInquiries.map((inquiry) => [inquiry.id, inquiry])
);

check(
  "Lifecycle integration",
  "The census reaches intakes, sources, observations, claims, and inquiries",
  12,
  intake?.sourceIds.length === 9 &&
    intake.observationIds.length === 10 &&
    intake.claimIds.length === 5 &&
    intake.researchInquiryIds.length === 3 &&
    claimById.get("CLM-FACEBOOK-PERSONAL-WOWLIST-EVENT-POPULATION")?.status ===
      "confirmed-with-boundary" &&
    claimById.get("CLM-FACEBOOK-JAMIE-CONVENING-PRACTICE")?.status ===
      "confirmed-with-boundary" &&
    inquiryById.get("INQ-FACEBOOK-PERSONAL-EVENT-OWNER-EXPORT")?.resultStatus ===
      "partially-recovered" &&
    inquiryById.get("INQ-FACEBOOK-WOWLIST-HISTORICAL-EVENT-EXPORT")?.resultStatus ===
      "inconclusive"
);

const wowPage = knowledgeBank.pages.find((page) => page.id === "wowlist");
const dinnerPage = knowledgeBank.pages.find((page) => page.id === "196-sunday-dinner");

check(
  "Projection discipline",
  "Only the mature milestone and platform-route claims reach the public site",
  8,
  includesAll(sundayDinner, [
    "CLM-FACEBOOK-SUNDAY-DINNER-MILESTONES",
    "facebook-milestones"
  ]) &&
    includesAll(wowlist, ["CLM-FACEBOOK-WOWLIST-IN-PRACTICE", "facebook-event-route"]) &&
    dinnerPage?.occurrences.some(
      (occurrence) => occurrence.claimId === "CLM-FACEBOOK-SUNDAY-DINNER-MILESTONES"
    ) &&
    wowPage?.occurrences.some(
      (occurrence) => occurrence.claimId === "CLM-FACEBOOK-WOWLIST-IN-PRACTICE"
    ) &&
    includesAll(proofSource, [
      "contemporaneous milestones rather than an independent audit",
      "one concrete route rather than a complete adoption or traffic census"
    ])
);

const objectKeys = allObjectKeys(fixture);
const serializedFixture = JSON.stringify(fixture);

check(
  "Public safety",
  "The fixture is hash-locked and excludes private, contact, guest, and session data",
  8,
  fixtureSha === "23c7d57699dc30d84d6738f7ece4b47f3497550fa2dd8690ca7c4a86719d70ef" &&
    fixture.publicSafety.newspaperSafeReview === true &&
    fixture.publicSafety.rawDescriptionsPublished === false &&
    fixture.publicSafety.exactResidentialAddressesPublished === false &&
    fixture.publicSafety.contactDetailsPublished === false &&
    fixture.publicSafety.attendeeOrGuestIdentitiesPublished === false &&
    fixture.publicSafety.privateEventTitlesPublished === false &&
    fixture.publicSafety.authenticatedSessionDataPublished === false &&
    !objectKeys.some((key) =>
      ["rawDescription", "email", "phone", "cookie", "session", "credential"].includes(key)
    ) &&
    !serializedFixture.includes("/Users/") &&
    !serializedFixture.includes("/Volumes/")
);

const possiblePoints = checks.reduce((sum, item) => sum + item.points, 0);
const earnedPoints = checks.reduce(
  (sum, item) => sum + (item.passes ? item.points : 0),
  0
);
const score = Math.round((earnedPoints / possiblePoints) * 100);
const failures = checks.filter((item) => !item.passes);
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
  console.error("Personal and WOW List Facebook event gaps:");
  for (const item of failures) console.error(`- HARD ${item.dimension}: ${item.label}`);
}

if (score < threshold || failures.length) process.exit(1);

console.log("Personal and WOW List Facebook events criterion met.");
