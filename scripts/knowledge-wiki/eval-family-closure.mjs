#!/usr/bin/env node

import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { evaluateFamilyClosure } from "./family-closure-eval-lib.mjs";
import { REPO_ROOT } from "./lib.mjs";

const contract = JSON.parse(
  readFileSync(resolve(REPO_ROOT, ".agents/evals/knowledge-wiki-family-closure.json"), "utf8")
);
const ids = contract.criteria.map((criterion) => criterion.id);
const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
const weightTotal = contract.criteria.reduce((sum, criterion) => sum + criterion.weight, 0);

if (duplicateIds.length || weightTotal !== contract.score_maximum) {
  console.error("Knowledge Wiki family-closure eval contract is invalid.");
  process.exit(2);
}

let evaluation = evaluateFamilyClosure();

if (process.argv.includes("--write-state")) {
  const preBindingPassed = Object.entries(evaluation.checks)
    .filter(([id]) => id !== "FC-010")
    .every(([, check]) => check.passed);
  if (!preBindingPassed) {
    console.error("Refusing to bind a candidate that has not passed FC-001 through FC-009.");
    process.exit(1);
  }
  const state = {
    contract: contract.id,
    base: {
      branch: "feature/knowledge-wiki-B",
      sha: "268a92d794f5b604f4004fc9d6e5652f234fc61b"
    },
    candidateFingerprint: `sha256:${evaluation.fingerprint.digest}`,
    candidateFileCount: evaluation.fingerprint.files.length,
    automatedDecision: "pass",
    evaluatedAt: "2026-07-19",
    humanGates: {
      jamieFinalReview: "open",
      collaboratorAndConsentReview: "open",
      mediaRightsReview: "open",
      hiringReaderReview: "open",
      productionAndIndexingApproval: "open"
    }
  };
  writeFileSync(
    resolve(REPO_ROOT, "docs/evals/knowledge-wiki-family-closure-state.json"),
    `${JSON.stringify(state, null, 2)}\n`
  );
  evaluation = evaluateFamilyClosure();
}

const results = contract.criteria.map((criterion) => ({
  ...criterion,
  passed: evaluation.checks[criterion.id]?.passed === true,
  score: evaluation.checks[criterion.id]?.passed === true ? criterion.weight : 0,
  evidence: evaluation.checks[criterion.id]?.evidence ?? "No deterministic check is defined."
}));
const score = results.reduce((sum, result) => sum + result.score, 0);
const passed = score >= contract.score_threshold && results.filter((result) => result.blocking).every((result) => result.passed);

for (const result of results) {
  console.log(`${result.passed ? "PASS" : "FAIL"} ${result.id} ${result.title} (${result.score}/${result.weight})`);
  console.log(`  ${result.evidence}`);
}

console.log(`Knowledge Wiki family-closure eval: ${score}/${contract.score_maximum} (criterion: ${contract.score_threshold}).`);
console.log("Jamie review, collaborator and consent review, media rights, hiring-reader response, production, and indexing gates remain open.");

if (!passed) process.exit(1);
