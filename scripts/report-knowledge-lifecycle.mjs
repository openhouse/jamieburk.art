#!/usr/bin/env node

import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { knowledgeBank } from "../apps/www/src/data/knowledge-bank/records.ts";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const operatorLedger = JSON.parse(
  readFileSync(
    path.join(repoRoot, "docs/knowledge-bank/operator-intake-M.json"),
    "utf8"
  )
);
const blindSpots = JSON.parse(
  readFileSync(path.join(repoRoot, "docs/qa/blind-spot-readiness-M.json"), "utf8")
);
const allIntakes = [...knowledgeBank.intakeItems, ...operatorLedger.items];
const sourceIds = new Set(knowledgeBank.sources.map((item) => item.id));
const claimIds = new Set(knowledgeBank.claims.map((item) => item.id));
const selectedClaimIds = new Set(
  knowledgeBank.editorialBriefs.flatMap((brief) => brief.selectedClaimIds)
);
const referencedSourceIds = new Set([
  ...knowledgeBank.sourceReadings.map((reading) => reading.sourceId),
  ...knowledgeBank.claims.flatMap((claim) =>
    claim.evidence.map((evidence) => evidence.sourceId)
  )
]);
const promotedCandidates = knowledgeBank.candidateClaims.filter(
  (candidate) => candidate.status === "promoted"
);
const today = new Date().toISOString().slice(0, 10);
const staleBefore = `${Number(today.slice(0, 4)) - 1}${today.slice(4)}`;

const lines = [
  "# Knowledge Lifecycle Report",
  "",
  `Generated: ${today}`,
  "",
  "This report is redacted by construction: it omits protected locators, private excerpts, and underlying private-source paths.",
  "",
  "## Intake",
  "",
  `- Total: ${allIntakes.length}`,
  `- Captured or researching: ${allIntakes.filter((item) => ["captured", "researching"].includes(item.status)).length}`,
  `- Deferred: ${allIntakes.filter((item) => item.status === "deferred").length}`,
  `- Processed: ${allIntakes.filter((item) => item.status === "processed").length}`,
  "",
  "## Relationships",
  "",
  `- Orphaned sources: ${knowledgeBank.sources.filter((source) => !referencedSourceIds.has(source.id)).length}`,
  `- Candidates with missing sources: ${knowledgeBank.candidateClaims.filter((candidate) => candidate.sourceIds.some((id) => !sourceIds.has(id))).length}`,
  `- Claims with missing sources: ${knowledgeBank.claims.filter((claim) => claim.evidence.some((evidence) => !sourceIds.has(evidence.sourceId))).length}`,
  `- Corrections with missing claims: ${knowledgeBank.corrections.filter((correction) => !claimIds.has(correction.claimId)).length}`,
  "",
  "## Decisions",
  "",
  `- Promoted candidates: ${promotedCandidates.length}`,
  `- Held or research-needed candidates: ${knowledgeBank.candidateClaims.filter((candidate) => ["hold", "research-needed"].includes(candidate.status)).length}`,
  `- Mature but unselected claims: ${promotedCandidates.filter((candidate) => candidate.promotedClaimId && !selectedClaimIds.has(candidate.promotedClaimId)).length}`,
  `- Unresolved contradictions: ${knowledgeBank.claims.filter((claim) => claim.evidence.some((evidence) => evidence.relationship === "contradicts") && claim.status !== "disallowed").length}`,
  `- Public claims without direct or corroborating support: ${knowledgeBank.claims.filter((claim) => claim.projections.some((projection) => projection.status === "active") && !claim.evidence.some((evidence) => ["direct-support", "corroborating"].includes(evidence.relationship))).length}`,
  "",
  "## Holds And Drift",
  "",
  `- Rights or consent holds: ${knowledgeBank.sources.filter((source) => source.media && source.media.publicDisplayStatus !== "cleared").length + knowledgeBank.discoveryNotes.filter((note) => note.rightsReviewRequired).length}`,
  `- Claims reviewed before ${staleBefore}: ${knowledgeBank.claims.filter((claim) => claim.reviewedAt < staleBefore).length}`,
  `- Open human-evidence gates: ${blindSpots.criteria.filter((criterion) => criterion.outcomeState.startsWith("pending") || criterion.outcomeState === "no-observations-yet").length}`,
  "",
  "Counts identify review queues, not professional importance or public-site selection."
];

console.log(lines.join("\n"));
