#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { compileKnowledgeWiki, repoRoot } from "../knowledge-wiki/lib.mjs";
import { candidateFingerprint, loadReaderProfiles, loadSuite, sanitizeOpportunity, validateReaderProfile } from "./lib.mjs";

const requireReports = process.argv.includes("--require-reports");
const errors = [];
const suite = loadSuite();
const profiles = loadReaderProfiles();
for (const profile of profiles.values()) errors.push(...validateReaderProfile(profile));
const development = new Set(suite.developmentReaderIds);
const holdout = new Set(suite.holdoutReaderIds);
for (const id of development) if (holdout.has(id)) errors.push(`Reader appears in development and holdout panels: ${id}`);
for (const id of [...development, ...holdout]) if (!profiles.has(id)) errors.push(`Suite references missing reader: ${id}`);
const compiled = compileKnowledgeWiki();
const nodes = new Map(compiled.graph.nodes.map((node) => [node.id, node]));
for (const id of suite.opportunityIds) {
  const node = nodes.get(id);
  if (!node) errors.push(`Suite references missing opportunity: ${id}`);
  else {
    const serialized = JSON.stringify(sanitizeOpportunity(node));
    if (/(?:wiki_evidence|public_proof_ids|gap_type|\/Users\/|\/Volumes\/)/.test(serialized)) errors.push(`Sanitized role context leaks hidden evidence: ${id}`);
  }
}
const candidate = candidateFingerprint();
for (const panel of ["development", "holdout"]) {
  const reportPath = path.join(repoRoot, `reports/hiring/${panel}/reader-consensus.json`);
  if (!existsSync(reportPath)) {
    if (requireReports) errors.push(`Missing ${panel} hiring report`);
    continue;
  }
  const report = JSON.parse(readFileSync(reportPath, "utf8"));
  if (report.candidateSha !== candidate) errors.push(`${panel} hiring report is stale`);
  if (report.panel !== panel) errors.push(`${panel} report has wrong panel`);
  if (report.independentFromOptimizer !== true) errors.push(`${panel} report lacks evaluator independence`);
  if (report.humanAuthority !== "open") errors.push(`${panel} report overstates human authority`);
}
const evaluatorSource = ["lib.mjs", "prepare-context.mjs", "run.mjs"].map((name) => readFileSync(path.join(repoRoot, "scripts/hiring-acceptance", name), "utf8")).join("\n");
if (/resolve-wiki-gaps/.test(evaluatorSource)) errors.push("Hiring evaluator imports the Wiki gap resolver");
const gapResolver = readFileSync(path.join(repoRoot, "scripts/hiring-acceptance/resolve-wiki-gaps.mjs"), "utf8");
if (!/reader-consensus\.json/.test(gapResolver) || !/compileKnowledgeWiki/.test(gapResolver)) errors.push("Gap resolver does not run after a hiring report against the public-safe Wiki");

if (errors.length) {
  for (const error of errors) console.error(`ERROR ${error}`);
  process.exitCode = 1;
} else {
  console.log(`Hiring acceptance contract passed: ${profiles.size} readers, ${suite.opportunityIds.length} opportunities, exact candidate ${candidate}.`);
}
