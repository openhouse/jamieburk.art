#!/usr/bin/env node

import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import { defaultRepoRoot } from "../evals/lib/knowledge-lifecycle.mjs";
import { readJsonLines } from "./lib.mjs";

const activeStatuses = new Set(["open", "in-progress", "blocked"]);
const decisionsByClaim = new Map();
for (const decision of knowledgeBank.projectionDecisions) {
  const values = decisionsByClaim.get(decision.claimId) ?? [];
  values.push(decision);
  decisionsByClaim.set(decision.claimId, values);
}

const matureUnused = knowledgeBank.claims
  .filter((claim) => claim.maturity === "public-ready")
  .filter((claim) => !claim.projections.some((projection) => projection.status === "active"))
  .map((claim) => ({
    id: claim.id,
    project: claim.project,
    decisions: decisionsByClaim.get(claim.id) ?? []
  }));

const report = {
  generatedAt: new Date().toISOString(),
  counts: Object.fromEntries(
    ["entities", "intake", "sources", "sourceReadings", "claims", "researchTasks", "researchInquiries", "projectionDecisions", "corrections", "pages"]
      .map((key) => [key, knowledgeBank[key].length])
  ),
  readingState: Object.fromEntries(
    ["queued", "closely-read", "needs-access", "revisit"].map((status) => [
      status,
      knowledgeBank.sourceReadings.filter((reading) => reading.status === status).length
    ])
  ),
  claimMaturity: Object.fromEntries(
    [...new Set(knowledgeBank.claims.map((claim) => claim.maturity))]
      .sort()
      .map((maturity) => [maturity, knowledgeBank.claims.filter((claim) => claim.maturity === maturity).length])
  ),
  matureUnused,
  openHighPriorityResearch: knowledgeBank.researchTasks
    .filter((task) => ["critical", "high"].includes(task.priority) && activeStatuses.has(task.status))
    .map(({ id, project, priority, question, nextActions }) => ({ id, project, priority, question, nextActions })),
  projectionDebt: knowledgeBank.claims
    .filter((claim) => claim.maturity === "public-ready" && !(decisionsByClaim.get(claim.id)?.length))
    .map((claim) => claim.id),
  activeCorrections: knowledgeBank.corrections.filter((correction) => correction.status === "active"),
  queuedReceipts: readJsonLines(defaultRepoRoot)
};

if (process.argv.includes("--json")) {
  console.log(JSON.stringify(report, null, 2));
} else {
  const topResearch = report.openHighPriorityResearch.slice(0, 10);
  console.log("Knowledge-bank health report");
  console.log(`Generated: ${report.generatedAt}`);
  console.log(`Population: ${report.counts.sources} sources, ${report.counts.claims} claims, ${report.counts.researchTasks} research tasks`);
  console.log(`Readings: ${Object.entries(report.readingState).map(([key, value]) => `${key} ${value}`).join(", ")}`);
  console.log(`Claim maturity: ${Object.entries(report.claimMaturity).map(([key, value]) => `${key} ${value}`).join(", ")}`);
  console.log(`Mature unused: ${report.matureUnused.length}`);
  console.log(`High-priority open research: ${report.openHighPriorityResearch.length}`);
  for (const task of topResearch) console.log(`  - ${task.priority}: ${task.id} (${task.project})`);
  if (report.openHighPriorityResearch.length > topResearch.length) {
    console.log(`  - plus ${report.openHighPriorityResearch.length - topResearch.length} more; use --json for the full queue`);
  }
  console.log(`Projection debt: ${report.projectionDebt.length}`);
  console.log(`Active corrections: ${report.activeCorrections.length}`);
  console.log(`Queued receipts: ${report.queuedReceipts.length}`);
}
