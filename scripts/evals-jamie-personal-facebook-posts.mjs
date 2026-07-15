#!/usr/bin/env node

import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { knowledgeBank } from "../apps/www/src/data/knowledge-bank/records.ts";
import { hasPersonalFacebookPostsPublicArtifactRisk } from "./lib/personal-facebook-posts-guard.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function read(relativePath) {
  return readFileSync(path.join(repoRoot, relativePath), "utf8");
}

function sum(values) {
  return Object.values(values).reduce((total, value) => total + value, 0);
}

function includesAll(source, values) {
  return values.every((value) => source.includes(value));
}

const controlsText = read("docs/knowledge-bank/data/jamie-personal-facebook-post-controls.json");
const controls = JSON.parse(controlsText);
const receipt = read("docs/knowledge-bank/intake/2026-07-15-jamie-personal-facebook-posts-full-population.md");
const dossier = read("docs/knowledge-bank/projects/jamie-personal-facebook-posts.md");
const moduleSource = read("apps/www/src/data/knowledge-bank/jamie-personal-facebook-posts-2026-07.ts");
const normalizedDocs = `${receipt}\n${dossier}`.replace(/\s+/g, " ");

const checks = [];

function check(dimension, label, points, passes, hard = true) {
  checks.push({ dimension, label, points, passes: Boolean(passes), hard });
}

check(
  "Population boundary",
  "The complete returned owner-filtered denominator and terminal control are explicit",
  18,
  controls.populationDefinition === "Facebook Manage Posts filtered to Posted by You" &&
    controls.populationControl.cursorPages === 621 &&
    controls.populationControl.returnedNodes === 3728 &&
    controls.populationControl.uniqueRecords === 1243 &&
    controls.populationControl.terminalHasNextPage === false &&
    controls.populationControl.missingDates === 0 &&
    controls.populationControl.ownerAbsentRecords === 0 &&
    controls.populationControl.recoveredStart === "2006-12-19" &&
    controls.populationControl.recoveredEnd === "2022-06-12" &&
    controls.populationControl.authenticatedFilterRecheckedAt === "2026-07-15" &&
    includesAll(normalizedDocs, [
      "100 percent",
      "owner-filtered",
      "not mean a native Meta export",
      "June 2022"
    ])
);

check(
  "Privacy",
  "Audience-state controls force the raw personal corpus to remain protected",
  12,
  controls.populationControl.audienceLabels.public === 268 &&
    controls.populationControl.audienceLabels.friends === 1 &&
    controls.populationControl.audienceLabels.onlyMe === 1 &&
    controls.populationControl.audienceLabels.notExposed === 973 &&
    sum(controls.populationControl.audienceLabels) === 1243 &&
    controls.privateArtifactId === "jamie-personal-facebook-owner-post-census-2026-07" &&
    includesAll(normalizedDocs, [
      "record-level corpus therefore remains protected",
      "Only six",
      "authentication state"
    ]) &&
    !/\/Volumes\/|\/Users\/|cookie|session token|c_user|\bxs=|__cft__|__tn__/i.test(
      `${controlsText}\n${moduleSource}\n${normalizedDocs}`
    )
);

check(
  "Population accounting",
  "Year and record-form aggregates each reconcile to the denominator",
  10,
  sum(controls.recordsByYear) === 1243 &&
    sum(controls.recordForms) === 1243 &&
    controls.recordsByYear[2009] === 218 &&
    controls.recordsByYear[2017] === 118 &&
    controls.recordForms.text === 335 &&
    controls.recordForms.sharedStory === 244 &&
    controls.recordForms.mediaOrTextUnavailable === 159
);

check(
  "Mission routing",
  "Overlapping project routes reproduce and stay distinct from importance or impact",
  12,
  controls.missionRouting.uniqueRecords === 181 &&
    controls.missionRouting.projectRecordCounts.wowList === 48 &&
    controls.missionRouting.projectRecordCounts.sundayDinner === 44 &&
    controls.missionRouting.projectRecordCounts.nycArtistCoalition === 34 &&
    controls.missionRouting.projectRecordCounts.letNycDance === 33 &&
    controls.missionRouting.projectRecordCounts.waterPublics === 10 &&
    /not exclusive semantic judgments, effort measures, engagement, or impact/i.test(
      controls.missionRouting.classificationBoundary
    ) &&
    includesAll(normalizedDocs, [
      "archive-navigation aids",
      "not effort, priority, engagement, or impact scores"
    ])
);

check(
  "Source routing",
  "Every normalized destination remains a lead until close reading",
  10,
  controls.postedUrlInventory.urlBearingRecords === 430 &&
    controls.postedUrlInventory.uniqueNormalizedExternalUrls === 549 &&
    /remains a source lead until independently recovered, close-read/i.test(
      controls.postedUrlInventory.routingBoundary
    ) &&
    includesAll(normalizedDocs, [
      "549 unique normalized external",
      "Gothamist",
      "CouncilStat"
    ])
);

check(
  "Stakeholder semantics",
  "Outbound references cannot mutate into inbound engagement",
  12,
  JSON.stringify(controls.stakeholderRouting.recordCounts) ===
    JSON.stringify({
      newYorkCityCouncil: 20,
      rafaelEspinal: 18,
      marketHotel: 9,
      officeOfNightlife: 6,
      antonioReynoso: 5,
      quintonLucas: 1,
      helenRosenthal: 1
    }) &&
    /not actions by the named stakeholders/i.test(
      controls.stakeholderRouting.classificationBoundary
    ) &&
    !hasPersonalFacebookPostsPublicArtifactRisk(normalizedDocs) &&
    includesAll(normalizedDocs, [
      "not actions by those stakeholders",
      "do not establish engagement, endorsement"
    ])
);

const sourceById = new Map(knowledgeBank.sources.map((source) => [source.id, source]));
const selectedSourceIds = controls.selectedPublicSourceControls.map(
  (source) => source.sourceId
);

check(
  "Governed public evidence",
  "Six public specimens and two contextual sources are governed with role boundaries",
  10,
  selectedSourceIds.length === 6 &&
    selectedSourceIds.every((id) => sourceById.get(id)?.visibility === "public") &&
    sourceById.get("SRC-GOTHAMIST-CABARET-MOMENTUM-2017-03-31")?.kind ===
      "published-article" &&
    sourceById.get("SRC-NYC-COUNCIL-LABS-CONSTITUENT-SERVICES-DATA-2016")
      ?.kind === "government-record" &&
    sourceById
      .get("SRC-FB-JAMIE-CALLNYC-COUNCILSTAT-JOB-2016")
      ?.doesNotEstablish.includes(
        "Jamie's employment, title, contract, formal team membership, or exact Council relationship"
      ) &&
    sourceById
      .get("SRC-FB-JAMIE-KCTOWNHALL-START-2018")
      ?.doesNotEstablish.includes("sole founding, ownership, or authorship by Jamie")
);

const claimById = new Map(knowledgeBank.claims.map((claim) => [claim.id, claim]));
const inquiryById = new Map(
  knowledgeBank.researchInquiries.map((inquiry) => [inquiry.id, inquiry])
);
const intake = knowledgeBank.intakeItems.find(
  (item) =>
    item.id ===
    "INTAKE-2026-07-15-JAMIE-PERSONAL-FACEBOOK-POST-FULL-POPULATION"
);

check(
  "Lifecycle integration",
  "The population reaches intake, sources, observations, claims, and inquiries",
  10,
  intake?.publicationStatus === "knowledge-bank-only" &&
    intake.sourceIds.length === 10 &&
    intake.observationIds.length === 14 &&
    intake.claimIds.length === 8 &&
    intake.researchInquiryIds.length === 3 &&
    intake.sourceIds.every((id) => sourceById.has(id)) &&
    intake.observationIds.every((id) =>
      knowledgeBank.observations.some((observation) => observation.id === id)
    ) &&
    intake.claimIds.every((id) => claimById.has(id)) &&
    intake.researchInquiryIds.every((id) => inquiryById.has(id)) &&
    inquiryById.get("INQ-FB-JAMIE-POST-CORPUS-2026")?.resultStatus ===
      "partially-recovered" &&
    inquiryById.get("INQ-FB-JAMIE-POSTED-SOURCES-2026")?.resultStatus ===
      "partially-recovered" &&
    inquiryById.get("INQ-FB-JAMIE-COUNCILSTAT-ROLE-2026")?.resultStatus ===
      "inconclusive"
);

check(
  "Projection and anti-claims",
  "The practice finding remains held bank depth and high-risk mutations are encoded",
  6,
  claimById
    .get("CLM-FB-JAMIE-PROJECT-ACTION-ROUTING")
    ?.projections.every(
      (projection) =>
        projection.status === "hold" && projection.surfaces.length === 0
    ) &&
    claimById.get("CLM-FB-JAMIE-STAKEHOLDER-MENTION-PATTERN-2026")
      ?.status === "use-with-care" &&
    claimById.get("CLM-FB-JAMIE-SELECTED-PUBLIC-INTERACTION-SNAPSHOT-2026")
      ?.status === "use-with-care" &&
    claimById
      .get("CLM-FB-JAMIE-CALLNYC-COUNCILSTAT-JOB-LANGUAGE")
      ?.antiClaims.includes("Jamie was employed by the CouncilStat team") &&
    claimById
      .get("CLM-FB-JAMIE-KCTOWNHALL-COINITIATION-TRACE")
      ?.antiClaims.includes("Jamie solely founded KC Town Hall") &&
    includesAll(normalizedDocs, [
      "No public website copy changes",
      "stronger as governed bank depth"
    ])
);

const possiblePoints = checks.reduce((total, item) => total + item.points, 0);
const earnedPoints = checks.reduce(
  (total, item) => total + (item.passes ? item.points : 0),
  0
);
const score = Math.round((earnedPoints / possiblePoints) * 100);
const failures = checks.filter((item) => !item.passes);
const hardFailures = failures.filter((item) => item.hard);
const threshold = 100;

console.log(
  `Jamie personal Facebook posts eval: ${score}/100 (criterion: >= ${threshold}, no hard failures)`
);

for (const dimension of [...new Set(checks.map((item) => item.dimension))]) {
  const dimensionChecks = checks.filter((item) => item.dimension === dimension);
  const earned = dimensionChecks.reduce(
    (total, item) => total + (item.passes ? item.points : 0),
    0
  );
  const possible = dimensionChecks.reduce((total, item) => total + item.points, 0);
  console.log(`- ${dimension}: ${earned}/${possible}`);
}

if (failures.length) {
  console.error("Jamie personal Facebook posts gaps:");
  for (const item of failures) {
    console.error(`- ${item.hard ? "HARD " : ""}${item.dimension}: ${item.label}`);
  }
}

if (score < threshold || hardFailures.length) process.exit(1);

console.log("Jamie personal Facebook posts criterion met.");
