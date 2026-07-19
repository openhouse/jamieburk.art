#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  REPO_ROOT,
  loadHiringContext,
  validateHiringContext
} from "./lib.mjs";

const context = loadHiringContext();
const validation = validateHiringContext(context);
const contract = context.contract;
const runSource = readFileSync(
  resolve(REPO_ROOT, "scripts/hiring-acceptance/run-hiring-eval.mjs"),
  "utf8"
);
const libSource = readFileSync(
  resolve(REPO_ROOT, "scripts/hiring-acceptance/lib.mjs"),
  "utf8"
);
const testSource = readFileSync(
  resolve(REPO_ROOT, "scripts/tests/hiring-acceptance.test.mjs"),
  "utf8"
);
const technicalPage = readFileSync(
  resolve(REPO_ROOT, "apps/www/src/app/work/technical-operations/page.tsx"),
  "utf8"
);
const codes = new Set(validation.errors.map((error) => error.code));
const hasNone = (...wanted) => wanted.every((code) => !codes.has(code));

const checks = {
  "KWE-001":
    hasNone("private-marker", "private-job-search-field") &&
    context.opportunities.every((record) => record.repoPath.startsWith("docs/knowledge-wiki/opportunities/")) &&
    readFileSync(resolve(REPO_ROOT, "docs/qa/hiring-acceptance/README.md"), "utf8").includes("not a second evidence registry"),
  "KWE-002":
    context.opportunities.length === 6 &&
    hasNone(
      "noncanonical-opportunity-source",
      "stale-opportunity",
      "missing-opportunity-field",
      "official-role-fingerprint",
      "official-role-fingerprint-set"
    ),
  "KWE-003":
    hasNone(
      "duplicate-requirement-id",
      "invalid-coverage-status",
      "unknown-proof-ref",
      "unknown-wiki-ref",
      "unproven-visible-status"
    ),
  "KWE-004":
    context.career.phases.length >= 5 &&
    context.sourceChannels.channels.length >= 8 &&
    existsSync(resolve(REPO_ROOT, "scripts/hiring-acceptance/report-coverage.mjs")),
  "KWE-005":
    validation.discovery.passed &&
    validation.metrics.titleBlindTopKRecall === 1 &&
    validation.metrics.decoyControlsRejected === context.discovery.decoyControls.length &&
    validation.metrics.negativeControlsRejected === context.discovery.negativeControls.length,
  "KWE-006":
    runSource.includes("buildEvaluatorPacket") &&
    libSource.includes("publicOpportunityContext") &&
    libSource.includes("resolveOpportunityGaps") &&
    testSource.includes("public evaluator context excludes Wiki-only evidence"),
  "KWE-007":
    context.readers.length >= 7 &&
    hasNone("unsourced-named-reader", "missing-reader-disclaimer", "weak-reader-disclaimer", "panel-leak"),
  "KWE-008":
    [
      "candidateSha",
      "worktreeStateHash",
      "portfolioSnapshotHash",
      "roleContextHash",
      "readerContextHash",
      "suiteHash",
      "contractHash",
      "promptHash"
    ].every((field) => libSource.includes(field)),
  "KWE-009":
    testSource.match(/mutation rejects/g)?.length >= 8 &&
    hasNone("sole-authorship-drift", "hidden-hard-screen", "source-access-promotion"),
  "KWE-010":
    technicalPage.includes("Surface risk, dependencies, and open questions early") &&
    technicalPage.includes("operating documentation people can pick up") &&
    !technicalPage.includes("I led government technology hiring")
};

let passed = true;
for (const criterion of contract.criteria) {
  const result = checks[criterion.id] === true;
  passed &&= result;
  console.log(`${result ? "PASS" : "FAIL"} ${criterion.id} ${criterion.title}`);
}
if (validation.errors.length) {
  for (const error of validation.errors) {
    console.error(`- ${error.path} [${error.code}] ${error.message}`);
  }
}
console.log(
  "Human hiring, application, rights, and reader-response gates remain open and are not included in machine success."
);
if (!passed || validation.errors.length) process.exit(1);
