#!/usr/bin/env node

import { readFileSync } from "node:fs";
import path from "node:path";

import { REPO_ROOT } from "./lib.mjs";

const configuration = JSON.parse(
  readFileSync(path.join(REPO_ROOT, "docs/qa/knowledge-wiki-foundation-M.json"), "utf8")
);
const withAnswerKey = process.argv.includes("--with-answer-key");

console.log("Knowledge Wiki retrieval tasks");
console.log("Record real completion, time, wrong turns, confidence, and boundary understanding separately.\n");

for (const task of configuration.retrievalTasks) {
  console.log(`${task.id}: ${task.prompt}`);
  if (withAnswerKey) {
    console.log(`  Expected IDs: ${task.expectedIds.join(", ")}`);
    console.log(`  Material boundary: ${task.materialBoundary}`);
  }
  console.log("");
}

console.log(`Human evaluation state: ${configuration.humanEvaluationState}`);
console.log("Automated checks do not change this state.");
