#!/usr/bin/env node

import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import {
  evaluationFingerprints,
  inspectHiringAcceptance,
  loadHiringAcceptance,
  repoRoot,
  validateJudgments
} from "./lib/hiring-acceptance.mjs";

const args = process.argv.slice(2);
const writeReport = !args.includes("--no-report");
const jsonOnly = args.includes("--json");
const printFingerprints = args.includes("--print-fingerprints");
const skipJudgments = args.includes("--skip-judgments");
const opportunityArg = args.indexOf("--opportunity");
const selectedOpportunity = opportunityArg >= 0 ? args[opportunityArg + 1] : null;
const reportRoot = path.join(repoRoot, "reports/hiring-acceptance");
const judgmentsRoot = path.join(repoRoot, "evals/hiring-acceptance/judgments");

function loadJudgments() {
  if (!existsSync(judgmentsRoot)) return [];
  return readdirSync(judgmentsRoot)
    .filter((file) => file.endsWith(".json"))
    .sort()
    .map((file) => JSON.parse(readFileSync(path.join(judgmentsRoot, file), "utf8")));
}

function coverageTable(opportunity) {
  const lines = [
    `## ${opportunity.title}`,
    "",
    `- Status: \`${opportunity.opportunityStatus}\``,
    `- Verified: \`${opportunity.verifiedAt}\`; reverify by \`${opportunity.reverifyBy}\``,
    `- Official source: [posting](${opportunity.canonicalUrl})`,
    "",
    "| Requirement | Priority | Coverage | Public evidence | Gap | Next action |",
    "| --- | --- | --- | --- | --- | --- |"
  ];
  for (const requirement of opportunity.roleRequirements) {
    lines.push(`| ${requirement.label} | ${requirement.priority} | \`${requirement.coverageStatus}\` | ${requirement.publicEvidence.join(", ") || "None"} | ${requirement.gapType || "none"} | ${requirement.nextAction} |`);
  }
  return lines.join("\n");
}

function renderMarkdown(result, bundle) {
  const lines = [
    "# Hiring acceptance summary",
    "",
    "> Generated candidate-bound summary. Do not edit directly.",
    "",
    `- Automated result: **${result.automatedResult.toUpperCase()}**`,
    `- Consecutive unchanged passes: ${result.consecutivePasses}/${bundle.suite.stopRules.requiredConsecutivePasses}`,
    `- Candidate commit: \`${result.fingerprints.candidateSha}\``,
    `- Portfolio snapshot: \`${result.fingerprints.portfolioSnapshotHash}\``,
    `- Role context: \`${result.fingerprints.roleContextHash}\``,
    `- Reader context: \`${result.fingerprints.readerContextHash}\``,
    `- Contract: \`${result.fingerprints.contractFingerprint}\``,
    "",
    "## Hard gates",
    ""
  ];
  for (const gate of result.gates) lines.push(`- **${gate.status.toUpperCase()}** \`${gate.id}\`: ${gate.detail}`);
  lines.push("", "## Opportunity coverage", "");
  const opportunities = selectedOpportunity
    ? bundle.opportunities.filter((item) => item.id === selectedOpportunity)
    : bundle.opportunities;
  for (const opportunity of opportunities) lines.push(coverageTable(opportunity), "");
  lines.push("## Title-blind discovery", "");
  for (const item of result.ranking) lines.push(`- \`${item.id}\`: ${item.score} matching terms (${item.overlap.join(", ") || "none"})`);
  lines.push("", "## Manual authority", "");
  for (const [gate, status] of Object.entries(bundle.suite.manualAuthority)) lines.push(`- ${gate}: \`${status}\``);
  lines.push(
    "",
    "Automated passage does not submit an application, approve the ACLU product brief, answer protected applicant questions, establish named-reader participation, or decide whether Jamie should accept a role.",
    ""
  );
  return lines.join("\n");
}

const bundle = loadHiringAcceptance();
const fingerprints = evaluationFingerprints(bundle);

if (printFingerprints) {
  console.log(JSON.stringify(fingerprints, null, 2));
  process.exit(0);
}

const inspection = inspectHiringAcceptance(bundle);
const validJudgmentIds = skipJudgments ? ["public-hiring-editorial", "wiki-gap-resolution"] : validateJudgments(loadJudgments(), fingerprints);
const judgmentsPass = validJudgmentIds.length === 2;
const gates = [
  ...inspection.gates,
  {
    id: "candidate-bound-judgments",
    status: judgmentsPass ? "pass" : "fail",
    detail: judgmentsPass
      ? "Public-only hiring and separate Wiki gap-resolution judgments bind to this candidate, role context, reader context, and contract"
      : `Valid judgments present: ${validJudgmentIds.join(", ") || "none"}`
  }
];
const automatedResult = bundle.suite.requiredGates.every((id) => gates.find((gate) => gate.id === id)?.status === "pass") ? "pass" : "fail";
const priorPath = path.join(reportRoot, "current-priority-summary.json");
let prior = null;
if (existsSync(priorPath)) {
  try { prior = JSON.parse(readFileSync(priorPath, "utf8")); } catch { prior = null; }
}
const sameCandidate = prior &&
  prior.automatedResult === "pass" &&
  Object.entries(fingerprints).every(([key, value]) => prior.fingerprints?.[key] === value);
const consecutivePasses = automatedResult === "pass" ? (sameCandidate ? Math.min((prior.consecutivePasses ?? 1) + 1, 2) : 1) : 0;
const result = {
  id: "hiring-acceptance-current-priority-2026-07-18",
  generatedAt: new Date().toISOString(),
  automatedResult,
  consecutivePasses,
  fingerprints,
  gates,
  ranking: inspection.ranking,
  mutationResults: inspection.mutations,
  selectedOpportunity,
  manualAuthority: bundle.suite.manualAuthority,
  stopReason: consecutivePasses >= 2
    ? "All automated gates passed twice on the unchanged candidate; remaining decisions require human authority or application work outside the public repository."
    : automatedResult === "pass"
      ? "Run once more without candidate changes to satisfy the consecutive-pass stop rule."
      : "Continue with the highest-priority failing gate without weakening an earlier lexicographic criterion."
};

if (writeReport) {
  mkdirSync(reportRoot, { recursive: true });
  writeFileSync(priorPath, `${JSON.stringify(result, null, 2)}\n`);
  writeFileSync(path.join(reportRoot, "current-priority-summary.md"), renderMarkdown(result, bundle));
}

if (jsonOnly) console.log(JSON.stringify(result, null, 2));
else {
  console.log(`Hiring acceptance automated result: ${automatedResult.toUpperCase()}`);
  for (const gate of gates) console.log(`- ${gate.status.toUpperCase()} ${gate.id}: ${gate.detail}`);
  console.log(`Consecutive unchanged passes: ${consecutivePasses}/${bundle.suite.stopRules.requiredConsecutivePasses}`);
}

if (automatedResult !== "pass") process.exit(1);
