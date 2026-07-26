#!/usr/bin/env node

import { readFileSync } from "node:fs";
import path from "node:path";

import {
  buildPhotoKnowledgeOutputs,
  checkPhotoKnowledgeOutputs,
  evaluatePhotoKnowledge,
  photoKnowledgeRepoRoot,
  writePhotoKnowledgeOutputs
} from "./lib.mjs";

const repoRoot = photoKnowledgeRepoRoot();
const command = process.argv[2] ?? "check";

function printEvaluation(result) {
  for (const criterion of result.criteria) {
    console.log(`${criterion.pass ? "PASS" : "FAIL"} ${criterion.id} - ${criterion.detail}`);
  }
  console.log(`Photo-knowledge eval: ${result.passed}/${result.total}`);
}

function print(relativePath) {
  process.stdout.write(readFileSync(path.join(repoRoot, relativePath), "utf8"));
}

if (command === "report") {
  const result = evaluatePhotoKnowledge({ repoRoot, skipGenerated: true });
  printEvaluation(result);
  if (!result.pass) process.exit(1);
  const outputs = buildPhotoKnowledgeOutputs(result);
  writePhotoKnowledgeOutputs(repoRoot, outputs);
  console.log(`Wrote ${Object.keys(outputs).length} deterministic photo-knowledge reports.`);
  process.exit(0);
}

const result = evaluatePhotoKnowledge({ repoRoot });

if (command === "check" || command === "health") {
  printEvaluation(result);
  if (!result.pass) process.exit(1);
  const outputs = buildPhotoKnowledgeOutputs(
    evaluatePhotoKnowledge({ repoRoot, skipGenerated: true })
  );
  const outputIssues = checkPhotoKnowledgeOutputs(repoRoot, outputs);
  if (outputIssues.length) {
    for (const issue of outputIssues) console.error(`FAIL generated-output - ${issue}`);
    process.exit(1);
  }
  console.log("Photo-knowledge checks passed; human publication gates remain open.");
  process.exit(0);
}

if (command === "placements") {
  print("docs/knowledge-bank/_generated/public-photo-placements.md");
} else if (command === "permissions") {
  print("docs/knowledge-bank/_generated/photo-rights-review.md");
} else if (command === "usage") {
  print("reports/photo-knowledge-usage.json");
} else if (command === "impact") {
  print("docs/knowledge-bank/_generated/photography-backlinks.md");
} else if (command === "edition") {
  print("docs/knowledge-bank/projections/photography/layout-a-branch-review-edition-2026-07.md");
} else if (command === "recollection") {
  print("docs/knowledge-bank/_generated/photo-source-return.md");
} else if (command === "manifest") {
  console.log(JSON.stringify({
    canary: result.canary,
    asset: result.asset.id,
    occurrence: result.occurrence.id,
    edition: result.edition.id,
    migration: result.migration
  }, null, 2));
} else if (command === "curatorial-check") {
  const criterion = result.criteria.find((item) => item.id === "PHOTO-KNOWLEDGE-006");
  console.log(`${criterion.pass ? "PASS" : "FAIL"} ${criterion.id} - ${criterion.detail}`);
  if (!criterion.pass) process.exit(1);
} else if (command === "curatorial-run") {
  console.log("SIMULATED LENSES - NOT PARTICIPATION, ENDORSEMENT, OR PUBLICATION AUTHORITY");
  console.log(`Candidate: ${result.edition.candidate_commit}`);
  console.log(`Occurrence: ${result.occurrence.id}`);
  console.log("Open human gates:");
  for (const gate of result.humanGates) console.log(`- ${gate.name}`);
  console.log("See the authored curatorial evaluation for proposal, dissent, and documentary questions.");
} else {
  console.error(`Unknown photo-knowledge command: ${command}`);
  process.exit(1);
}
