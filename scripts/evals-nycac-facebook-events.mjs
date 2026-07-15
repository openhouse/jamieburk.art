#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { knowledgeBank } from
  "../apps/www/src/data/knowledge-bank/records.ts";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const corpusPath =
  "docs/knowledge-bank/corpora/nycartc-facebook-events-full-population-2026-07-15.json";

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

const corpusText = read(corpusPath);
const corpus = JSON.parse(corpusText);
const receipt = read(
  "docs/knowledge-bank/runs/2026-07-15-nycac-facebook-events-full-population.md"
);
const projectNote = read(
  "docs/knowledge-bank/projects/nyc-artist-coalition-facebook-events.md"
);
const inventory = read(
  "docs/knowledge-bank/projects/social-account-inventory.md"
);
const caseStudy = read("apps/www/src/content/work/fair-rent-nyc.mdx");
const proofSource = read("apps/www/src/data/proofs.ts");
const workSource = read("apps/www/src/data/work.ts");
const normalizedDocs = `${receipt}\n${projectNote}\n${inventory}`.replace(
  /\s+/g,
  " "
);

const checks = [];

function check(dimension, label, points, passes) {
  checks.push({ dimension, label, points, passes: Boolean(passes) });
}

const population = corpus.populationReconciliation;
const events = corpus.events;
const ids = events.map((event) => event.id);
const idDigest = createHash("sha256")
  .update([...ids].sort().join("\n"))
  .digest("hex");
const corpusSha = createHash("sha256").update(corpusText).digest("hex");

check(
  "Population reconciliation",
  "Every displayed control slot has an honest recovered-or-unresolved disposition",
  15,
  corpus.page.handle === "nycartc" &&
    population.pageDisplayedPastEventCount === 34 &&
    population.recoveredIndexEventCount === 33 &&
    population.recoveredDetailEventCount === 33 &&
    population.detailRetrievalFailureCount === 0 &&
    population.unmaterializedCount === 1 &&
    events.length === 33 &&
    new Set(ids).size === 33 &&
    idDigest ===
      "b9e63a508958e7b7ed71236803aef60bc597123b1ff5c497550df90c80fe09fc" &&
    includesAll(normalizedDocs, [
      "33 recovered event records and one unresolved historical slot",
      "100 percent control-slot accounting",
      "not 100 percent historical content recovery"
    ])
);

const recheck = population.detailAvailabilityRecheck;

check(
  "Population reconciliation",
  "Platform volatility remains visible without erasing earlier recovered records",
  7,
  recheck.recoveredEventIdCount === 33 &&
    recheck.recoveredDetailCount === 28 &&
    recheck.temporarilyUnavailableDetailCount === 5 &&
    recheck.temporarilyUnavailableEventIds.length === 5 &&
    includesAll(normalizedDocs, [
      "platform volatility",
      "Unavailable",
      "never existed",
      "native Meta owner export"
    ])
);

const years = Object.fromEntries(
  [...new Set(events.map((event) => event.date.slice(0, 4)))]
    .sort()
    .map((year) => [year, events.filter((event) => event.date.startsWith(year)).length])
);
const direct = events.filter(
  (event) => event.relationToPage === "index-displayed-nycac-organizer"
);
const allied = events.filter(
  (event) => event.relationToPage === "allied-or-cohosted-listing"
);

check(
  "Chronology and relationships",
  "Dates, direct organizer displays, and allied relationships reproduce",
  10,
  JSON.stringify(years) ===
    JSON.stringify({ 2017: 17, 2018: 3, 2019: 6, 2020: 6, 2021: 1 }) &&
    direct.length === 24 &&
    allied.length === 9 &&
    events[0].date === "2017-01-27" &&
    events.at(-1).date === "2021-01-29" &&
    includesAll(normalizedDocs, [
      "Twenty-four index cards",
      "nine are allied or cohosted",
      "do not identify the individual author or producer"
    ])
);

const recurringMeetingIds = new Set([
  "406505576359490",
  "1833265643557435",
  "212427345900529",
  "835861356564686",
  "107158013279474",
  "144317939631393",
  "383292402137451",
  "468698540318956",
  "149896349250651",
  "373845436658926",
  "1371973329662017",
  "772824526895291"
]);
const recurring = events.filter((event) => recurringMeetingIds.has(event.id));
const physicalRecurring = recurring.filter(
  (event) => event.venueCategory !== "virtual"
);

check(
  "Participation system",
  "The recurring rotating-space pattern and its limits remain explicit",
  12,
  recurring.length === 12 &&
    physicalRecurring.length === 10 &&
    new Set(physicalRecurring.map((event) => event.venue)).size === 10 &&
    includesAll(normalizedDocs, [
      "Magick City",
      "The Floasis",
      "Muchmore's",
      "The City Reliquary",
      "Shoestring Press",
      "Chinatown Soup",
      "Secret Project Robot",
      "Friends and Lovers",
      "Flowers for all Occasions",
      "Ode to Babel",
      "does not prove that a meeting occurred every calendar month"
    ])
);

const topicCounts = {};
for (const event of events) {
  for (const topic of event.topics) {
    topicCounts[topic] = (topicCounts[topic] ?? 0) + 1;
  }
}

check(
  "Mission classification",
  "Overlapping civic, cultural, safety, policy, and relief classifications reproduce",
  10,
  topicCounts["participatory-convening"] === 29 &&
    topicCounts["government-interface"] === 15 &&
    topicCounts["cultural-planning"] === 12 &&
    topicCounts["safety-and-compliance"] === 12 &&
    topicCounts["cabaret-law-repeal"] === 11 &&
    topicCounts["commercial-rent-and-displacement"] === 10 &&
    topicCounts["cultural-space-defense"] === 8 &&
    topicCounts["nightlife-governance"] === 7 &&
    topicCounts["mutual-aid-and-relief"] === 6 &&
    topicCounts["march-enforcement"] === 5 &&
    events.filter((event) =>
      ["cultural-or-community-space", "community-meeting-place"].includes(
        event.venueCategory
      )
    ).length === 15 &&
    events.filter((event) => event.venueCategory === "government").length === 9
);

const responses = events.filter(
  (event) => typeof event.responseSnapshot?.pointEstimate === "number"
);

check(
  "Traction boundary",
  "Response thresholds reproduce without becoming attendance or unique reach",
  10,
  responses.length === 32 &&
    responses.filter((event) => event.responseSnapshot.pointEstimate >= 100).length ===
      19 &&
    responses.filter((event) => event.responseSnapshot.pointEstimate >= 500).length ===
      7 &&
    responses.filter((event) => event.responseSnapshot.pointEstimate >= 1000).length ===
      3 &&
    includesAll(normalizedDocs, [
      "not verified attendance",
      "unique people",
      "not summed into a people-reached claim"
    ]) &&
    !caseStudy.includes("9,989")
);

const articlePublishers = corpus.postedSourceArticles.map(
  (article) => article.publisher
);
const withheldLinks = events.reduce(
  (sum, event) => sum + event.withheldOutboundLinkCount,
  0
);

check(
  "Source and stakeholder routing",
  "Seven article routes and protected link dispositions remain auditable",
  9,
  corpus.postedSourceArticles.length === 7 &&
    new Set(articlePublishers).size === 7 &&
    [
      "New York Post",
      "WNYC",
      "Metro",
      "The New Yorker",
      "The Baffler",
      "Curbed",
      "Gothamist"
    ].every((publisher) => articlePublishers.includes(publisher)) &&
    withheldLinks === 13 &&
    includesAll(normalizedDocs, [
      "establishes a source route",
      "does not mean every host or participant adopted every statement",
      "event-level interface",
      "does not turn that person or institution into an endorser"
    ])
);

const sourceById = new Map(knowledgeBank.sources.map((source) => [source.id, source]));
const claimById = new Map(knowledgeBank.claims.map((claim) => [claim.id, claim]));
const taskById = new Map(
  knowledgeBank.researchTasks.map((task) => [task.id, task])
);
const inquiryById = new Map(
  knowledgeBank.researchInquiries.map((inquiry) => [inquiry.id, inquiry])
);
const intake = knowledgeBank.intake.find(
  (item) => item.id === "INT-NYCAC-FACEBOOK-EVENTS-FULL-POPULATION-2026"
);
const participationClaim = claimById.get("CLM-NYCAC-PARTICIPATION-SYSTEM");
const responseClaim = claimById.get("CLM-NYCAC-FACEBOOK-EVENT-RESPONSE-SIGNALS");
const democracyClaim = claimById.get("CLM-NYCAC-DEMOCRATIC-LISTENING-PRACTICE");

check(
  "Lifecycle integration",
  "The pass reaches intakes, sources, assertions, bounded claims, tasks, and inquiries",
  10,
  intake?.sourceIds.length === 10 &&
    intake.claimIds.length === 3 &&
    intake.researchTaskIds.length === 3 &&
    sourceById.has("SRC-NYCAC-FACEBOOK-EVENT-SURFACE-2026") &&
    sourceById.has("SRC-NYCAC-FACEBOOK-EVENT-CENSUS-2026") &&
    sourceById.has("SRC-NYCAC-FACEBOOK-EVENT-PROTECTED-RUN-2026") &&
    knowledgeBank.sourceAssertions.filter((assertion) =>
      assertion.id.startsWith("AST-NYCAC-FACEBOOK-")
    ).length === 8 &&
    participationClaim?.status === "confirmed-with-boundary" &&
    responseClaim?.status === "confirmed-with-boundary" &&
    democracyClaim?.status === "use-with-care" &&
    taskById.get("TASK-NYCAC-FACEBOOK-EVENT-OWNER-EXPORT")?.status === "queued" &&
    inquiryById.get("INQ-NYCAC-FACEBOOK-EVENT-OWNER-EXPORT")?.resultStatus ===
      "partially-recovered" &&
    inquiryById.get("INQ-NYCAC-FACEBOOK-EVENT-ROLE-AND-ATTENDANCE")
      ?.resultStatus === "partially-recovered"
);

const fairRentPage = knowledgeBank.pages.find((page) => page.id === "fair-rent-nyc");
const proofStart = proofSource.indexOf(
  'id: "nyc-artist-coalition-participation-system"'
);
const proofEnd = proofSource.indexOf(
  'id: "nyc-artist-coalition-shared-public-identity"',
  proofStart
);
const proofBlock = proofSource.slice(proofStart, proofEnd);

check(
  "Role and projection discipline",
  "The website receives one strong bounded role claim while fragile metrics stay in the bank",
  9,
  participationClaim?.projections.some(
    (projection) =>
      projection.key === "case-study" &&
      projection.status === "active" &&
      projection.surfaces.includes("/work/fair-rent-nyc")
  ) &&
    responseClaim?.projections.every(
      (projection) => projection.key === "archive-note"
    ) &&
    democracyClaim?.projectionEligibility === "hold" &&
    democracyClaim.projections.every((projection) => projection.status === "hold") &&
    fairRentPage?.occurrences.some(
      (occurrence) =>
        occurrence.id === "coalition-participation-system" &&
        occurrence.claimId === "CLM-NYCAC-PARTICIPATION-SYSTEM"
    ) &&
    includesAll(caseStudy, [
      "CLM-NYCAC-PARTICIPATION-SYSTEM",
      "does not assign Jamie authorship of",
      "Facebook responses into attendance"
    ]) &&
    participationClaim.projections.some((projection) =>
      projection.text.includes("helped establish and produce")
    ) &&
    includesAll(proofBlock, [
      "helped establish and produce",
      "Jamie solely produced every NYC Artist Coalition event",
      "Facebook responses equal attendance or unique reach"
    ]) &&
    workSource.includes('"nyc-artist-coalition-participation-system"')
);

const objectKeys = allObjectKeys(corpus);
const serializedCorpus = JSON.stringify(corpus);

check(
  "Public safety",
  "The metadata-only corpus is hash-locked and excludes personal, raw, and authenticated data",
  8,
  corpusSha ===
    "64af7b2f1804b3b319de2f5eef60bfb01371ce5209c8497473f800a334c66555" &&
    corpus.publicSafety.rawDescriptionsPublished === false &&
    corpus.publicSafety.attendeeIdentitiesPublished === false &&
    corpus.publicSafety.contactDetailsPublished === false &&
    corpus.publicSafety.accessCredentialsPublished === false &&
    !objectKeys.some((key) =>
      [
        "rawDescription",
        "attendeeIdentities",
        "comments",
        "email",
        "phone",
        "cookie",
        "session",
        "credential",
        "directMessage"
      ].includes(key)
    ) &&
    !serializedCorpus.includes("/Users/") &&
    !serializedCorpus.includes("/Volumes/") &&
    includesAll(normalizedDocs, [
      "attendee and guest identities",
      "meeting IDs and passcodes",
      "authenticated-session state"
    ])
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
  `NYCAC Facebook events eval: ${score}/100 (criterion: >= ${threshold}, no failures)`
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
  console.error("NYCAC Facebook events gaps:");
  for (const item of failures) {
    console.error(`- ${item.dimension}: ${item.label}`);
  }
}

if (score < threshold || failures.length) process.exit(1);

console.log("NYCAC Facebook events criterion met.");
