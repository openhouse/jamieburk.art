#!/usr/bin/env node

import { readFileSync } from "node:fs";

const suite = JSON.parse(readFileSync("evals/knowledge-wiki/suite.json", "utf8"));
console.log("Knowledge Wiki retrieval tasks");
console.log("These prompts require a human session; this command does not fabricate results.\n");
for (const task of suite.humanTasks) {
  console.log(`${task.id}: ${task.prompt}`);
  console.log(`  Expected records: ${task.expectedRecordIds.join(", ")}`);
  console.log(`  Required boundary: ${task.requiredBoundary}\n`);
}
