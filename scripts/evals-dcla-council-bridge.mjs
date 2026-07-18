#!/usr/bin/env node

import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { knowledgeBank } from "../apps/www/src/data/knowledge-bank/records.ts";
import { knowledgeLifecycle } from "../apps/www/src/data/knowledge-bank/lifecycle-records.ts";
import { dclaCouncilBridgeSourceIds } from "../apps/www/src/data/knowledge-bank/dcla-council-bridge.ts";
import { proofClaims } from "../apps/www/src/data/proofs.ts";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relativePath) =>
  readFileSync(path.join(repoRoot, relativePath), "utf8");
const includesAll = (value, expected) =>
  expected.every((item) => value.includes(item));

const sourceById = new Map(
  knowledgeBank.sources.map((source) => [source.id, source])
);
const claimById = new Map(
  knowledgeBank.claims.map((claim) => [claim.id, claim])
);
const inquiryById = new Map(
  knowledgeBank.researchInquiries.map((inquiry) => [inquiry.id, inquiry])
);
const candidateById = new Map(
  knowledgeLifecycle.candidateClaims.map((candidate) => [candidate.id, candidate])
);
const taskById = new Map(
  knowledgeLifecycle.researchTasks.map((task) => [task.id, task])
);
const proofById = new Map(proofClaims.map((proof) => [proof.id, proof]));

const claimId = "CLM-NYCAC-DCLA-COUNCIL-INSTITUTIONAL-BRIDGE-2017";
const candidateId = "CND-NYCAC-DCLA-COUNCIL-INSTITUTIONAL-BRIDGE-2017";
const inquiryId = "INQ-NYCAC-DCLA-COUNCIL-INSTITUTIONAL-BRIDGE-2017";
const taskId = "TASK-NYCAC-DCLA-COUNCIL-INSTITUTIONAL-BRIDGE-2017";
const sourceIds = Object.values(dclaCouncilBridgeSourceIds);
const claim = claimById.get(claimId);
const candidate = candidateById.get(candidateId);
const inquiry = inquiryById.get(inquiryId);
const task = taskById.get(taskId);
const proof = proofById.get("nyc-artist-coalition-participation-system");
const page = knowledgeBank.pages.find(
  ({ surface }) => surface === "/work/fair-rent-nyc"
);
const researchNote = read(
  "docs/knowledge-bank/research/2026-07-16-nycac-dcla-council-institutional-bridge.md"
);
const workSource = read("apps/www/src/data/work.ts");
const antiClaims = read("docs/knowledge-bank/anti-claims.md");

const checks = [];
const check = (dimension, label, points, passes) =>
  checks.push({ dimension, label, points, passes: Boolean(passes) });

const sources = sourceIds.map((sourceId) => sourceById.get(sourceId));
const budgetSource = sourceById.get(dclaCouncilBridgeSourceIds.finkelpearlBudget);
const nextStepsSource = sourceById.get(
  dclaCouncilBridgeSourceIds.finkelpearlNextSteps
);
const culturalPlanSource = sourceById.get(
  dclaCouncilBridgeSourceIds.finkelpearlCulturalPlan
);
const espinalSource = sourceById.get(
  dclaCouncilBridgeSourceIds.espinalStatedMeeting
);

check(
  "Primary sources",
  "Seven official public sources are close-read, dated, and citable",
  18,
  sources.length === 7 &&
    sources.every(
      (source) =>
        source?.visibility === "public" &&
        source.reviewStatus === "close-read" &&
        source.contentReviewedAt === "2026-07-16" &&
        source.canonicalUrl?.startsWith("https://")
    )
);

check(
  "Transcript precision",
  "The exact May name and functional February/September descriptions stay distinct",
  18,
  includesAll(budgetSource?.publicNote ?? "", [
    "named NYC Artist Coalition",
    "reciprocal public engagement"
  ]) &&
    nextStepsSource?.doesNotEstablish.includes(
      "that Finkelpearl used the formal NYC Artist Coalition name in this hearing"
    ) &&
    culturalPlanSource?.doesNotEstablish.includes(
      "that Finkelpearl used the coalition's formal name in his relevant statement"
    ) &&
    includesAll(researchNote, [
      "decisive exact named reference",
      "without using the coalition's formal name",
      "functional descriptions"
    ])
);

const claimEvidence = new Set(claim?.evidence.map(({ sourceId }) => sourceId));
check(
  "Institutional claim",
  "The promoted claim connects recommendations, listening, testimony, and legislative follow-through",
  20,
  claim?.status === "confirmed-with-boundary" &&
    sourceIds.every((sourceId) => claimEvidence.has(sourceId)) &&
    claim.projections.some(
      ({ status, text, surfaces }) =>
        status === "active" &&
        surfaces.includes("/work/fair-rent-nyc") &&
        includesAll(text, [
          "formal recommendations",
          "agency dialogue",
          "Council testimony",
          "legislative follow-through",
          "alongside collaborators"
        ])
    )
);

check(
  "Espinal evidence",
  "Espinal's on-the-ground credit and sponsorship request are direct evidence",
  12,
  includesAll(espinalSource?.publicNote ?? "", [
    "on-the-ground work",
    "bringing attention to",
    "urged colleagues to sign on"
  ]) &&
    claim?.evidence.some(
      ({ sourceId, relationship, supports }) =>
        sourceId === dclaCouncilBridgeSourceIds.espinalStatedMeeting &&
        relationship === "direct-support" &&
        includesAll(supports.join(" "), [
          "on-the-ground work",
          "request for Council sponsors"
        ])
    )
);

check(
  "Causal and motive boundaries",
  "Institutional interpretation is separated from private motive, personal necessity, and sole causality",
  14,
  includesAll(claim?.boundaries.join(" ") ?? "", [
    "evidence-based interpretation",
    "not a quotation of private motive",
    "not sole causation",
    "helped build and steward"
  ]) &&
    includesAll(claim?.antiClaims.join(" ") ?? "", [
      "DCLA created or controlled NYC Artist Coalition",
      "The Council needed Jamie personally",
      "Espinal could not have advanced Intro 1652 without Jamie",
      "alone caused Cabaret Law repeal"
    ]) &&
    includesAll(antiClaims, [
      "Finkelpearl",
      "needed Jamie personally",
      "alone caused Cabaret Law repeal"
    ])
);

check(
  "Knowledge lifecycle",
  "The research inquiry, observations, task, candidate, and decision form a promoted audit trail",
  10,
  inquiry?.resultStatus === "recovered" &&
    inquiry.sourceIds.length === 7 &&
    candidate?.maturity === "promoted" &&
    candidate.targetCanonicalClaimId === claimId &&
    candidate.observationIds.length === 7 &&
    task?.status === "completed" &&
    task.sourceIds.length === 7 &&
    knowledgeLifecycle.promotionDecisions.some(
      ({ candidateClaimId, decision, targetCanonicalClaimId }) =>
        candidateClaimId === candidateId &&
        decision === "promote" &&
        targetCanonicalClaimId === claimId
    )
);

check(
  "Public projection",
  "The proof, case-study copy, manifest, and citation occurrence use the bounded claim",
  8,
  proof?.canonicalClaimIds?.includes(claimId) &&
    includesAll(proof?.whyItMatters ?? "", [
      "mattered institutionally",
      "agency and legislative processes"
    ]) &&
    includesAll(workSource, [
      "Agency-to-Council bridge",
      "Jamie helped build and steward a collective operating layer",
      "Official DCLA and Council records"
    ]) &&
    page?.sourceOrder.every((sourceId) => sourceById.has(sourceId)) &&
    page?.occurrences.some(
      ({ claimId: occurrenceClaimId, sourceIds: occurrenceSourceIds }) =>
        occurrenceClaimId === claimId && occurrenceSourceIds?.length === 7
    ) &&
    knowledgeLifecycle.proofSurfaceManifests.some(
      ({ route, canonicalClaimIds }) =>
        route === "/work/fair-rent-nyc" && canonicalClaimIds.includes(claimId)
    )
);

const possiblePoints = checks.reduce((sum, item) => sum + item.points, 0);
const earnedPoints = checks.reduce(
  (sum, item) => sum + (item.passes ? item.points : 0),
  0
);
const score = Math.round((earnedPoints / possiblePoints) * 100);
const failures = checks.filter(({ passes }) => !passes);

console.log(`DCLA and Council bridge eval: ${score}/100 (criterion: 100)`);
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
  console.error("DCLA and Council bridge gaps:");
  for (const failure of failures) {
    console.error(`- ${failure.dimension}: ${failure.label}`);
  }
  process.exit(1);
}

console.log("DCLA and Council bridge criterion met.");
