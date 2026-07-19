#!/usr/bin/env node

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { REPO_ROOT } from "./lib.mjs";
import { evaluateEditorialDepth } from "./editorial-depth-eval-lib.mjs";

const contract = JSON.parse(
  readFileSync(resolve(REPO_ROOT, ".agents/evals/knowledge-wiki-editorial-depth.json"), "utf8")
);
const ids = contract.criteria.map((criterion) => criterion.id);
const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
const weightTotal = contract.criteria.reduce((sum, criterion) => sum + criterion.weight, 0);

if (duplicateIds.length || weightTotal !== contract.score_maximum) {
  console.error("Knowledge Wiki editorial-depth eval contract is invalid.");
  process.exit(2);
}

const { checks } = evaluateEditorialDepth();
const results = contract.criteria.map((criterion) => ({
  ...criterion,
  passed: checks[criterion.id]?.passed === true,
  score: checks[criterion.id]?.passed === true ? criterion.weight : 0,
  evidence: checks[criterion.id]?.evidence ?? "No deterministic check is defined."
}));
const score = results.reduce((sum, result) => sum + result.score, 0);
const passed = score >= contract.score_threshold && results.filter((result) => result.blocking).every((result) => result.passed);

for (const result of results) {
  console.log(`${result.passed ? "PASS" : "FAIL"} ${result.id} ${result.title} (${result.score}/${result.weight})`);
  console.log(`  ${result.evidence}`);
}

console.log(`Knowledge Wiki editorial-depth eval: ${score}/${contract.score_maximum} (criterion: ${contract.score_threshold}).`);
console.log("Jamie authorship, collaborator, rights, consent, editorial, and production gates remain open.");

if (!passed) process.exit(1);
