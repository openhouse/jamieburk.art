#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { knowledgeBank } from
  "../apps/www/src/data/knowledge-bank/records.ts";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const corpusPath =
  "docs/knowledge-bank/corpora/jamie-wowlist-facebook-events-full-population-2026-07-15.json";

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
const manifest = JSON.parse(
  read(
    "docs/knowledge-bank/corpora/jamie-wowlist-facebook-events-full-population-2026-07-15.manifest.json"
  )
);
const projectNote = read(
  "docs/knowledge-bank/projects/personal-facebook-events.md"
);
const sundayDinner = read("docs/knowledge-bank/projects/sunday-dinner.md");
const wowList = read("docs/knowledge-bank/projects/wowlist.md");
const waterway = read("docs/knowledge-bank/projects/waterway-participation.md");
const nterChng = read("docs/knowledge-bank/projects/nter-chng.md");
const runNote = read(
  "docs/knowledge-bank/runs/2026-07-15-personal-wowlist-facebook-events-full-population.md"
);
const normalizedDocs =
  `${projectNote}\n${sundayDinner}\n${wowList}\n${waterway}\n${nterChng}\n${runNote}`.replace(
    /\s+/g,
    " "
  );
const websiteSources = [
  read("apps/www/src/content/work/wowlist.mdx"),
  read("apps/www/src/content/work/196-sunday-dinner.mdx"),
  read("apps/www/src/data/proofs.ts"),
  read("apps/www/src/data/work.ts")
].join("\n");

const checks = [];

function check(dimension, label, points, passes) {
  checks.push({ dimension, label, points, passes: Boolean(passes) });
}

const events = corpus.events;
const ids = events.map((event) => event.id);
const idDigest = createHash("sha256")
  .update([...ids].sort().join("\n") + "\n")
  .digest("hex");
const corpusSha = createHash("sha256").update(corpusText).digest("hex");

check(
  "Population boundary",
  "Every currently displayed personal slot and both WOW List Page surfaces have an explicit disposition",
  16,
  corpus.surfaces.personalHostedPast.displayedSlots === 21 &&
    corpus.surfaces.personalHostedPast.publicSafeRecords === 20 &&
    corpus.surfaces.personalHostedPast.privateWithheldSlots === 1 &&
    events.length === 20 &&
    new Set(ids).size === 20 &&
    corpus.surfaces.wowListPage.currentDisplayedEventRecords === 0 &&
    manifest.population.personalDisplayedSlots === 21 &&
    manifest.population.wowListCurrentDisplayedEventRecords === 0 &&
    idDigest ===
      "f3f655c819fc2b80b15fcde1213eaf37cab2b8d26d01e1398e6bc5e11c412b29" &&
    includesAll(normalizedDocs, [
      "complete current-interface accounting",
      "not a native Meta owner export",
      "does not establish historical absence"
    ])
);

check(
  "Population boundary",
  "Replay and detail volatility are preserved without inventing missing records",
  8,
  JSON.stringify(corpus.surfaces.personalHostedPast.replay.growthSequence) ===
    JSON.stringify([3, 8, 13, 18, 21]) &&
    corpus.surfaces.personalHostedPast.replay.consecutiveNoGrowthRounds === 8 &&
    corpus.surfaces.personalHostedPast.replay.samePopulationOnSecondReplay === true &&
    corpus.surfaces.personalHostedPast.publicDetailPagesMaterialized === 19 &&
    corpus.surfaces.personalHostedPast.publicDetailPagesUnavailable === 1 &&
    includesAll(normalizedDocs, [
      "one public detail page remained unavailable",
      "Events deleted or made unavailable",
      "Every currently displayed slot"
    ])
);

const topics = new Set(events.flatMap((event) => event.topics));
check(
  "Professional throughline",
  "The dated corpus supports a long-running cross-domain convening practice with collective-credit boundaries",
  14,
  events.at(-1).date === "2006-12-02" &&
    events[0].date === "2019-02-24" &&
    [
      "participatory-technology",
      "waterway-participation",
      "sunday-dinner",
      "music-programming",
      "mutual-care",
      "civic-reflection",
      "venue-safety"
    ].every((topic) => topics.has(topic)) &&
    includesAll(normalizedDocs, [
      "creating or co-creating",
      "not a claim that every event belonged to one formal program",
      "solely produced every gathering"
    ])
);

const details = events
  .map((event) => event.responseSnapshot.detailResponded)
  .filter(Number.isFinite);
check(
  "Traction boundary",
  "Response thresholds reproduce while attendance, unique reach, endorsement, and impact remain prohibited",
  12,
  details.length === 19 &&
    details.filter((value) => value > 0).length === 19 &&
    details.filter((value) => value >= 10).length === 13 &&
    details.filter((value) => value >= 20).length === 8 &&
    details.filter((value) => value >= 100).length === 3 &&
    includesAll(normalizedDocs, [
      "not physical attendance, unique people, reach",
      "must never be summed",
      "Index and detail values conflict"
    ]) &&
    !websiteSources.includes("Nineteen reviewed event details display")
);

const resourceUrls = corpus.postedResources.map((resource) => resource.url);
const eventResourceUrls = events.flatMap((event) => event.outboundResourceUrls);
check(
  "Source and stakeholder routing",
  "All posted resource routes and collaborator patterns have bounded dispositions",
  10,
  resourceUrls.length === 16 &&
    new Set(resourceUrls).size === 16 &&
    new Set(eventResourceUrls).size === 16 &&
    corpus.sourceRouteAnalysis.sourceArticlesRecovered === 0 &&
    includesAll(normalizedDocs, [
      "No independent news article was recovered",
      "distribution infrastructure for collaborators",
      "No NYC Council-member engagement record was identified"
    ])
);

check(
  "Project integration",
  "Sunday Dinner, WOW List, waterway participation, and NTER CHNG receive accurate dated nodes",
  12,
  events.some(
    (event) => event.id === "702417306475691" && event.date === "2014-03-09"
  ) &&
    events.some(
      (event) => event.id === "551536301637994" && event.date === "2016-06-26"
    ) &&
    events.some(
      (event) => event.id === "10153218027900549" && event.date === "2007-07-14"
    ) &&
    events.some(
      (event) => event.id === "10153298280050561" && event.date === "2010-01-08"
    ) &&
    includesAll(normalizedDocs, [
      "Unresolved chronology",
      "July 9 raft-design",
      "Drew Bolton, Jamie Burkart, and Garrett Fuselier together",
      "project Page and personal event infrastructure"
    ])
);

const sourceById = new Map(knowledgeBank.sources.map((source) => [source.id, source]));
const claimById = new Map(knowledgeBank.claims.map((claim) => [claim.id, claim]));
const taskById = new Map(knowledgeBank.researchTasks.map((task) => [task.id, task]));
const inquiryById = new Map(
  knowledgeBank.researchInquiries.map((inquiry) => [inquiry.id, inquiry])
);
const intake = knowledgeBank.intake.find(
  (item) =>
    item.id === "INT-PERSONAL-WOWLIST-FACEBOOK-EVENTS-FULL-POPULATION-2026"
);
check(
  "Knowledge lifecycle",
  "The pass reaches intake, sources, assertions, claims, tasks, inquiries, and project notes",
  12,
  intake?.sourceIds.length === 4 &&
    intake.claimIds.length === 7 &&
    intake.researchTaskIds.length === 3 &&
    sourceById.has("SRC-JAMIE-FACEBOOK-EVENT-SURFACE-2026") &&
    sourceById.has("SRC-WOWLIST-FACEBOOK-EVENT-SURFACE-2026") &&
    sourceById.has("SRC-PERSONAL-WOWLIST-FACEBOOK-EVENT-CENSUS-2026") &&
    knowledgeBank.sourceAssertions.filter((assertion) =>
      assertion.id.startsWith("AST-PERSONAL-FACEBOOK-")
    ).length === 4 &&
    claimById.get("CLM-PERSONAL-FACEBOOK-EVENT-PRACTICE")?.status ===
      "confirmed-with-boundary" &&
    claimById.get("CLM-SUNDAY-DINNER-FACEBOOK-MILESTONES")?.status ===
      "use-with-care" &&
    taskById.get("TASK-SUNDAY-DINNER-MILESTONE-RECONCILIATION")?.status ===
      "in-progress" &&
    inquiryById.get("INQ-PERSONAL-FACEBOOK-EVENT-POPULATION-2026")
      ?.resultStatus === "partially-recovered"
);

const claims = [
  "CLM-PERSONAL-FACEBOOK-EVENT-POPULATION",
  "CLM-PERSONAL-FACEBOOK-EVENT-PRACTICE",
  "CLM-PERSONAL-FACEBOOK-RESPONSE-SIGNALS",
  "CLM-WOWLIST-FACEBOOK-EVENT-SURFACE",
  "CLM-SUNDAY-DINNER-FACEBOOK-MILESTONES",
  "CLM-WATER-FACEBOOK-PLANNING-SENDOFF",
  "CLM-NTER-CHNG-FACEBOOK-EVENT-TRACE"
].map((id) => claimById.get(id));
check(
  "Projection discipline",
  "New claims deepen the bank without forcing fragile or duplicative website copy",
  8,
  claims.every(Boolean) &&
    claims.every((claim) => claim.projectionEligibility === "hold") &&
    claims.every((claim) =>
      claim.projections.every(
        (projection) =>
          projection.key === "archive-note" && projection.status === "hold"
      )
    ) &&
    !websiteSources.includes("current WOW List Facebook Page exposes zero") &&
    !websiteSources.includes("hundredth Sunday Dinner on March 9, 2014")
);

const objectKeys = allObjectKeys(corpus);
const prohibitedKeys = [
  "rawDescription",
  "privateEventId",
  "privateEventTitle",
  "residentialAddress",
  "phone",
  "phoneNumber",
  "attendeeIdentities",
  "guestIdentities",
  "comments",
  "cookie",
  "session",
  "credential",
  "directMessage",
  "sourceEventId"
];
check(
  "Public safety",
  "The hash-locked public corpus excludes private-event identity, personal details, and authenticated state",
  8,
  corpusSha ===
    "0dc80da93b52bdbe2c01922720164783d18a1832b034ce44c69bea15d5f5bd60" &&
    corpus.privateWithheldDisposition.count === 1 &&
    corpus.privateWithheldDisposition.publishedIdentityFields.length === 0 &&
    Object.values(corpus.publicSafety).filter((value) => value === true).length ===
      0 &&
    manifest.protectedPopulationDigestPublished === false &&
    !objectKeys.some((key) => prohibitedKeys.includes(key)) &&
    !corpusText.includes("/Users/") &&
    !corpusText.includes("/Volumes/") &&
    includesAll(normalizedDocs, [
      "does not publish addresses, phone numbers",
      "private-event identity",
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
  `Personal and WOW List Facebook events eval: ${score}/100 (criterion: >= ${threshold}, no failures)`
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
    console.error(`- ${item.dimension}: ${item.label}`);
  }
}

if (score < threshold || failures.length) process.exit(1);

console.log("Personal and WOW List Facebook events criterion met.");
