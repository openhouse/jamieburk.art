#!/usr/bin/env node

import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { knowledgeBank } from "../apps/www/src/data/knowledge-bank/records.ts";
import { knowledgeLifecycle } from "../apps/www/src/data/knowledge-bank/lifecycle-records.ts";
import { proofClaims } from "../apps/www/src/data/proofs.ts";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relativePath) => readFileSync(path.join(repoRoot, relativePath), "utf8");

const sourceById = new Map(knowledgeBank.sources.map((source) => [source.id, source]));
const claimById = new Map(knowledgeBank.claims.map((claim) => [claim.id, claim]));
const proofById = new Map(proofClaims.map((proof) => [proof.id, proof]));
const candidateById = new Map(
  knowledgeLifecycle.candidateClaims.map((candidate) => [candidate.id, candidate])
);
const manifestById = new Map(
  knowledgeLifecycle.proofSurfaceManifests.map((manifest) => [manifest.id, manifest])
);

const bridgeSource = read("apps/www/src/data/knowledge-bank/callscript-bridge.ts");
const bridgeLifecycle = read(
  "apps/www/src/data/knowledge-bank/callscript-bridge-lifecycle.ts"
);
const researchNote = read(
  "docs/knowledge-bank/research/2026-07-16-callscript-wowlist-sunday-dinner-nycac-bridge.md"
);
const workSource = read("apps/www/src/data/work.ts");

const checks = [];
const check = (dimension, label, points, passes) =>
  checks.push({ dimension, label, points, passes: Boolean(passes) });
const includesAll = (value, expected) => expected.every((item) => value.includes(item));

const pageSource = sourceById.get("SRC-CALLSCRIPT-FACEBOOK-PAGE-2026-07-16");
const eventSource = sourceById.get("SRC-CALLSCRIPT-DCLA-EVENT-DISCUSSION-2017");
const databaseSource = sourceById.get(
  "SRC-WOWLIST-PRODUCTION-ARCHIVE-NYCAC-SEQUENCE-2017"
);
const ledgerSource = sourceById.get("SRC-SUNDAY-DINNER-WORKING-LEDGER-2012-2021");

check(
  "Source governance",
  "Public sources remain citable and protected sources expose no underlying locator",
  18,
  pageSource?.visibility === "public" &&
    pageSource.canonicalUrl === "https://www.facebook.com/callscript" &&
    eventSource?.visibility === "public" &&
    eventSource.canonicalUrl?.includes("388137698233507") &&
    databaseSource?.visibility === "protected" &&
    !databaseSource.canonicalUrl &&
    !databaseSource.archiveUrl &&
    ledgerSource?.visibility === "protected" &&
    !ledgerSource.canonicalUrl &&
    !ledgerSource.archiveUrl
);

const participationClaim = claimById.get("CLM-NYCAC-PARTICIPATION-SYSTEM");
const participationEvidence = new Set(
  participationClaim?.evidence.map(({ sourceId }) => sourceId)
);

check(
  "Operating sequence",
  "The canonical claim preserves tool, meeting, listening, drafting, naming, and follow-up",
  22,
  participationClaim?.projections.some(({ text, status }) =>
    status === "active" &&
    includesAll(text, [
      "Call Script",
      "WOW List",
      "DCLA meeting",
      "issue gathering",
      "collaborative drafting",
      "collective naming",
      "follow-up meeting"
    ])
  ) &&
    [
      "SRC-WOWLIST-POPULAR-VOTE-ARCHIVE-2016",
      "SRC-CALLSCRIPT-FACEBOOK-PAGE-2026-07-16",
      "SRC-CALLSCRIPT-DCLA-EVENT-DISCUSSION-2017",
      "SRC-WOWLIST-PRODUCTION-ARCHIVE-NYCAC-SEQUENCE-2017"
    ].every((sourceId) => participationEvidence.has(sourceId))
);

check(
  "Attribution and metrics",
  "Collective credit, post authorship, poll denominator, attendance, and causality limits stay explicit",
  18,
  includesAll(participationClaim?.boundaries.join(" ") ?? "", [
    "do not assign Jamie authorship",
    "does not establish that Jamie wrote every post or comment",
    "does not display a vote denominator",
    "does not establish that any gathering caused a policy outcome"
  ]) &&
    includesAll(participationClaim?.antiClaims.join(" ") ?? "", [
      "Jamie solely created or produced every NYC Artist Coalition event",
      "Call Script or popular.vote alone caused NYC Artist Coalition to form",
      "representative mandate"
    ])
);

const sundayClaim = claimById.get("CLM-SUNDAY-DINNER-WEEKLY-OPEN-HOSTING-2017");
const sundayCandidate = candidateById.get("CND-SUNDAY-DINNER-WEEKLY-OPEN-HOSTING");
const sundayProof = proofById.get("sunday-dinner-196-participation-infrastructure");

check(
  "Sunday Dinner data quality",
  "The ledger supports numbered project history without becoming attendance evidence",
  16,
  sundayClaim?.evidence.some(
    ({ sourceId, relationship, renderCitation }) =>
      sourceId === "SRC-SUNDAY-DINNER-WORKING-LEDGER-2012-2021" &&
      relationship === "private-support" &&
      renderCitation === false
  ) &&
    sundayCandidate?.observationIds.includes(
      "OBS-SUNDAY-DINNER-WORKING-LEDGER-SCALE"
    ) &&
    includesAll(sundayProof?.guardrail ?? "", [
      "project-history support",
      "attendance or unique-participant evidence",
      "keep the ledger out of public citations"
    ])
);

const fairRentPage = knowledgeBank.pages.find(
  ({ surface }) => surface === "/work/fair-rent-nyc"
);
const fairRentManifest = manifestById.get("MANIFEST-PROOFS-FAIR-RENT-CASE-STUDY");

check(
  "Public projection",
  "The case study names Jamie's operating contribution and cites only public bridge sources",
  14,
  includesAll(workSource, [
    "Jamie used Call Script and WOW List's civic event-sharing adaptation",
    "issue gathering",
    "collaborative drafting",
    "collective naming"
  ]) &&
    fairRentPage?.sourceOrder.includes("SRC-CALLSCRIPT-DCLA-EVENT-DISCUSSION-2017") &&
    !fairRentPage?.sourceOrder.includes(
      "SRC-WOWLIST-PRODUCTION-ARCHIVE-NYCAC-SEQUENCE-2017"
    ) &&
    fairRentManifest?.reviewedAt === "2026-07-16" &&
    fairRentManifest.guardrails.some((guardrail) =>
      guardrail.includes("protected database out of citations")
    )
);

check(
  "Public safety",
  "Research artifacts retain methods and boundaries without private paths or source-record payloads",
  12,
  includesAll(researchNote, [
    "does not reproduce participant records",
    "does not display the denominator",
    "does not prove causality",
    "Do not add a public archive"
  ]) &&
    !includesAll(`${bridgeSource}\n${bridgeLifecycle}\n${researchNote}`, ["/Volumes/"]) &&
    !`${bridgeSource}\n${bridgeLifecycle}\n${researchNote}`.includes(
      "docs.google.com/spreadsheets/d/"
    )
);

const possiblePoints = checks.reduce((sum, item) => sum + item.points, 0);
const earnedPoints = checks.reduce(
  (sum, item) => sum + (item.passes ? item.points : 0),
  0
);
const score = Math.round((earnedPoints / possiblePoints) * 100);
const failures = checks.filter(({ passes }) => !passes);

console.log(`Call Script bridge eval: ${score}/100 (criterion: 100)`);
for (const dimension of [...new Set(checks.map(({ dimension }) => dimension))]) {
  const dimensionChecks = checks.filter((item) => item.dimension === dimension);
  const earned = dimensionChecks.reduce(
    (sum, item) => sum + (item.passes ? item.points : 0),
    0
  );
  const possible = dimensionChecks.reduce((sum, item) => sum + item.points, 0);
  console.log(`- ${dimension}: ${earned}/${possible}`);
}

if (failures.length) {
  console.error("Call Script bridge gaps:");
  for (const failure of failures) {
    console.error(`- ${failure.dimension}: ${failure.label}`);
  }
  process.exit(1);
}

console.log("Call Script bridge criterion met.");
