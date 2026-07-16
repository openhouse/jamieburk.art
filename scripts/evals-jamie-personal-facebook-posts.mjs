#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { knowledgeBank } from "../apps/www/src/data/knowledge-bank/records.ts";
import {
  checkPersonalFacebookRepository,
  evaluatePersonalFacebookControls
} from "./check-jamie-personal-facebook-posts.mjs";
import { hasPersonalFacebookPostsRisk } from "./lib/personal-facebook-posts-guard.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relativePath) => readFileSync(path.join(root, relativePath), "utf8");
const { controls, result } = checkPersonalFacebookRepository();
const checks = [];
const check = (dimension, label, points, passes) =>
  checks.push({ dimension, label, points, passes: Boolean(passes) });
const sourceById = new Map(knowledgeBank.sources.map((source) => [source.id, source]));
const claimById = new Map(knowledgeBank.claims.map((claim) => [claim.id, claim]));
const taskById = new Map(knowledgeBank.researchTasks.map((task) => [task.id, task]));
const inquiryById = new Map(
  knowledgeBank.researchInquiries.map((inquiry) => [inquiry.id, inquiry])
);
const batch = read(
  "apps/www/src/data/knowledge-bank/batches/jamie-personal-facebook-posts-full-population-2026-07-15.ts"
);
const docs = `${read("docs/knowledge-bank/projects/jamie-personal-facebook-posts.md")}\n${read("docs/knowledge-bank/runs/2026-07-15-jamie-personal-facebook-posts-full-population.md")}`;

check(
  "Population",
  "The terminal owner-filtered denominator is complete and bounded",
  18,
  result.errors.length === 0 &&
    controls.populationControl.uniqueRecords === 1243 &&
    controls.populationControl.cursorPages === 621 &&
    controls.populationControl.terminalHasNextPage === false &&
    claimById.get("CLM-FB-JAMIE-POST-POPULATION-2026")
      ?.projectionEligibility === "hold"
);
check(
  "Privacy",
  "Unknown audience state keeps the raw corpus protected",
  14,
  controls.populationControl.audienceLabels.notExposed === 973 &&
    sourceById.get("SRC-FB-JAMIE-OWNER-POST-CENSUS-2026")?.visibility ===
      "protected" &&
    !/\/Users\/|\/Volumes\/|cookie|session token|private@example\.com/i.test(
      `${batch}\n${docs}`
    )
);
check(
  "Routing semantics",
  "Mission and stakeholder routes remain research aids rather than impact",
  14,
  controls.missionRouting.uniqueRecords === 181 &&
    controls.stakeholderRouting.recordCounts.newYorkCityCouncil === 20 &&
    claimById.get("CLM-FB-JAMIE-STAKEHOLDER-MENTION-PATTERN-2026")
      ?.antiClaims.includes("twenty Council accounts engaged with Jamie") &&
    !hasPersonalFacebookPostsRisk(docs)
);
check(
  "Source lifecycle",
  "The URL population becomes leads and reviewed destinations become governed sources",
  14,
  controls.postedUrlInventory.uniqueNormalizedExternalUrls === 549 &&
    sourceById.get("SRC-WATERWAYS-PITCH-GULF-2009-09-03")?.kind ===
      "published-article" &&
    sourceById.get("SRC-NYC-COUNCIL-LABS-CONSTITUENT-SERVICES-DATA-2016")
      ?.kind === "government-record" &&
    taskById.get("TASK-FB-JAMIE-POSTED-SOURCE-REVIEW")?.status ===
      "in-progress"
);
check(
  "Public evidence",
  "Six public specimens are governed with exact role boundaries",
  12,
  controls.selectedPublicSourceControls.length === 6 &&
    controls.selectedPublicSourceControls.every(
      ({ sourceId }) => sourceById.get(sourceId)?.visibility === "public"
    ) &&
    sourceById
      .get("SRC-FB-JAMIE-CALLNYC-COUNCILSTAT-JOB-2016")
      ?.doesNotEstablish.includes(
        "Jamie's employment, title, contract, formal team membership, or exact Council relationship"
      ) &&
    sourceById
      .get("SRC-FB-JAMIE-KCTOWNHALL-START-2018")
      ?.doesNotEstablish.includes("sole founding, ownership, or authorship by Jamie")
);
check(
  "Collective credit",
  "Project and waterways claims retain collaborator and collective credit",
  10,
  claimById.get("CLM-FB-JAMIE-KCTOWNHALL-COINITIATION-TRACE")
    ?.collectiveWork === true &&
    claimById
      .get("CLM-FB-JAMIE-KCTOWNHALL-COINITIATION-TRACE")
      ?.internalClaim.includes("Julia Fredenburg") &&
    claimById.get("CLM-WATER-GULF-ROUTE")?.collectiveWork === true &&
    claimById.get("CLM-WATER-GULF-ROUTE")?.status ===
      "confirmed-with-boundary"
);
check(
  "Interaction boundary",
  "Mutable counters cannot become people, reach, endorsement, or impact",
  8,
  claimById.get("CLM-FB-JAMIE-SELECTED-PUBLIC-INTERACTION-SNAPSHOT-2026")
    ?.status === "use-with-care" &&
    claimById
      .get("CLM-FB-JAMIE-SELECTED-PUBLIC-INTERACTION-SNAPSHOT-2026")
      ?.antiClaims.includes("the selected posts reached 165 people")
);
check(
  "Lifecycle and projection",
  "Every research layer is wired and no website projection is forced",
  10,
  knowledgeBank.intake.some(
    (item) => item.id === "INT-FB-JAMIE-POST-FULL-POPULATION-2026"
  ) &&
    knowledgeBank.sourceAssertions.filter((assertion) =>
      assertion.id.startsWith("AST-FB-JAMIE-")
    ).length === 16 &&
    inquiryById.get("INQ-FB-JAMIE-POST-CORPUS-2026")?.resultStatus ===
      "partially-recovered" &&
    claimById.get("CLM-FB-JAMIE-PROJECT-ACTION-ROUTING")?.projections.every(
      (projection) => projection.status === "hold" && projection.surfaces.length === 0
    ) &&
    docs.includes("No public website copy changes")
);

const mutations = [
  ["claim-lifetime-completeness", (candidate) => {
    candidate.completenessBoundary = "Every Facebook post Jamie ever published.";
  }],
  ["turn-unknown-audiences-public", (candidate) => {
    candidate.populationControl.audienceLabels.public = 1241;
    candidate.populationControl.audienceLabels.notExposed = 0;
  }],
  ["erase-terminal-control", (candidate) => {
    candidate.populationControl.terminalHasNextPage = true;
  }],
  ["convert-routing-to-impact", (candidate) => {
    candidate.missionRouting.classificationBoundary =
      "The 181 records prove Jamie's most important and impactful work.";
  }],
  ["convert-urls-to-corroboration", (candidate) => {
    candidate.postedUrlInventory.routingBoundary =
      "All 549 sources corroborate Jamie's accomplishments.";
  }],
  ["convert-references-to-engagement", (candidate) => {
    candidate.stakeholderRouting.classificationBoundary =
      "Twenty New York City Council accounts engaged with Jamie.";
  }],
  ["convert-counters-to-impact", (candidate) => {
    candidate.engagementBoundary =
      "The counters represent 165 people and prove project impact.";
  }],
  ["leak-private-path", (candidate) => {
    candidate.privatePath = "/Users/example/facebook.json";
  }],
  ["leak-auth-state", (candidate) => {
    candidate.session = "session token";
  }],
  ["change-selected-public-count", (candidate) => {
    candidate.selectedPublicSourceControls.pop();
  }]
];

for (const [name, mutate] of mutations) {
  const candidate = structuredClone(controls);
  mutate(candidate);
  const candidateResult = evaluatePersonalFacebookControls(
    candidate,
    JSON.stringify(candidate)
  );
  assert.ok(candidateResult.errors.length > 0, `${name} must fail`);
}

const originalKcClaim = claimById.get(
  "CLM-FB-JAMIE-KCTOWNHALL-COINITIATION-TRACE"
);
const originalCouncilStatClaim = claimById.get(
  "CLM-FB-JAMIE-CALLNYC-COUNCILSTAT-JOB-LANGUAGE"
);
assert.ok(originalKcClaim?.antiClaims.includes("Jamie solely founded KC Town Hall"));
assert.ok(
  originalCouncilStatClaim?.antiClaims.includes(
    "Jamie was employed by the CouncilStat team"
  )
);
assert.ok(
  !hasPersonalFacebookPostsRisk(
    "The selected posts show practical action routing; they do not establish clicks, attendance, conversion, causality, or impact."
  )
);
assert.ok(
  hasPersonalFacebookPostsRisk(
    "Jamie alone founded KC Town Hall and the counters prove project impact."
  )
);

const earned = checks
  .filter((item) => item.passes)
  .reduce((total, item) => total + item.points, 0);
const possible = checks.reduce((total, item) => total + item.points, 0);
assert.equal(possible, 100);
assert.equal(earned, 100, JSON.stringify(checks, null, 2));

console.log(
  JSON.stringify(
    {
      suite: "jamie-personal-facebook-posts-full-population",
      status: "criteria_met",
      score: earned,
      possible,
      checks,
      mutationTests: mutations.map(([id]) => ({ id, rejected: true }))
    },
    null,
    2
  )
);
