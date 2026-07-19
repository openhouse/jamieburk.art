#!/usr/bin/env node

import { readFileSync } from "node:fs";
import path from "node:path";

import { compileWiki, REPO_ROOT } from "./lib.mjs";

const configuration = JSON.parse(
  readFileSync(path.join(REPO_ROOT, "docs/qa/knowledge-wiki-foundation-M.json"), "utf8")
);
const withAnswerKey = process.argv.includes("--with-answer-key");
const wiki = compileWiki();

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

console.log("\nKnowledge development queue");
if (wiki.health.wantedPages.length === 0) console.log("- Wanted pages: none");
for (const item of wiki.health.wantedPages) {
  console.log(`- Wanted page: ${item.id} - ${item.reason}`);
}
if (wiki.health.sourceReturnsDue.length === 0) console.log("- Source returns due: none");
for (const id of wiki.health.sourceReturnsDue) console.log(`- Source return due: ${id}`);
if (wiki.health.blockedSourceReturns.length === 0) console.log("- Blocked source returns: none");
for (const id of wiki.health.blockedSourceReturns) {
  const node = wiki.graph.nodes.find((item) => item.id === id);
  console.log(`- Ask Jamie, personal librarian: ${node?.sourceReturn?.librarianRequest}`);
}
