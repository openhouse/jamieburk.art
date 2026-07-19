#!/usr/bin/env node

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { repoRoot } from "../knowledge-wiki/lib.mjs";
import { validateJudgments } from "./lib.mjs";

const argument = (name) => { const index = process.argv.indexOf(name); return index >= 0 ? process.argv[index + 1] : undefined; };
const contextPath = argument("--context");
const judgmentsPath = argument("--judgments");
const outputDirectory = argument("--output-dir");
if (!contextPath || !judgmentsPath) throw new Error("Usage: run.mjs --context <context.json> --judgments <judgments.json>");
const context = JSON.parse(readFileSync(contextPath, "utf8"));
const judgments = JSON.parse(readFileSync(judgmentsPath, "utf8"));
const errors = validateJudgments(judgments, context);
if (errors.length) throw new Error(errors.join("; "));

const decisions = { advance: 0, hold: 0, decline: 0 };
for (const review of judgments.reviews) decisions[review.decision] += 1;
const aggregate = {
  schemaVersion: 1,
  suiteId: context.suiteId,
  panel: context.panel,
  candidateSha: context.candidateSha,
  gitHead: context.gitHead,
  portfolioSnapshotHash: context.portfolioSnapshotHash,
  roleContextHash: context.roleContextHash,
  readerContextHash: context.readerContextHash,
  promptHash: context.promptHash,
  judgeId: judgments.judgeId,
  independentFromOptimizer: true,
  model: judgments.model ?? "unreported",
  decisions,
  reviews: judgments.reviews,
  humanAuthority: "open",
  disclaimer: "Simulated reviews do not establish actual participation, endorsement, hiring outcome, or human release approval.",
};
const root = outputDirectory ? path.resolve(repoRoot, outputDirectory) : path.join(repoRoot, `reports/hiring/${context.panel}`);
mkdirSync(root, { recursive: true });
writeFileSync(path.join(root, "reader-consensus.json"), `${JSON.stringify(aggregate, null, 2)}\n`);
const missing = [...new Set(judgments.reviews.flatMap((review) => review.missingPositiveEvidence.map((item) => typeof item === "string" ? item : item.requirementId ?? item.signal)).filter(Boolean))];
const changes = [...new Set(judgments.reviews.flatMap((review) => review.recommendedPortfolioChanges.map((item) => typeof item === "string" ? item : item.change)).filter(Boolean))];
writeFileSync(path.join(root, "summary.md"), [
  "<!-- GENERATED CANDIDATE-BOUND SUMMARY. Do not edit directly. -->",
  "",
  "# Hiring acceptance summary",
  "",
  `- Candidate fingerprint: \`${context.candidateSha}\``,
  `- Public snapshot: \`${context.portfolioSnapshotHash}\``,
  `- Panel: \`${context.panel}\``,
  `- Independent judge: \`${judgments.judgeId}\``,
  `- Decisions: ${decisions.advance} advance, ${decisions.hold} hold, ${decisions.decline} decline`,
  "- Human authority: **OPEN**",
  "",
  "## Missing positive evidence",
  "",
  ...(missing.length ? missing.map((item) => `- ${item}`) : ["- None reported."]),
  "",
  "## Suggested public changes",
  "",
  ...(changes.length ? changes.map((item) => `- ${item}`) : ["- None reported."]),
  "",
  "Simulated reviews do not establish actual participation, endorsement, hiring outcome, or human release approval.",
].join("\n"));
process.stdout.write(`Wrote ${path.relative(repoRoot, root)}/reader-consensus.json and summary.md\n`);
