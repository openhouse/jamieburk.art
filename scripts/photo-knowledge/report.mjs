#!/usr/bin/env node

import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

import {
  defaultRepoRoot,
  evaluatePhotoKnowledge,
  renderPhotoReports
} from "./lib.mjs";

const viewIndex = process.argv.indexOf("--view");
const view = viewIndex >= 0 ? process.argv[viewIndex + 1] : null;
const evaluation = evaluatePhotoKnowledge({ skipGenerated: true });
const suite = JSON.parse(
  await import("node:fs").then(({ readFileSync }) =>
    readFileSync(
      path.join(defaultRepoRoot, "evals/photo-knowledge/suite.json"),
      "utf8"
    )
  )
);
const outputs = renderPhotoReports({
  suite,
  records: evaluation.records,
  checks: evaluation.checks
});

const viewPaths = {
  placements: "docs/knowledge-bank/_generated/public-photo-placements.md",
  permissions: "docs/knowledge-bank/_generated/photo-rights-review.md",
  usage: "docs/knowledge-bank/_generated/public-photo-placements.md",
  impact: "docs/knowledge-bank/_generated/photo-impact.md",
  health: "reports/photo-knowledge.json",
  edition: "docs/knowledge-bank/_generated/photography-index.md"
};

if (view) {
  const outputPath = viewPaths[view];
  if (!outputPath) {
    console.error(`Unknown photo report view: ${view}`);
    process.exit(1);
  }
  process.stdout.write(outputs[outputPath]);
  process.exit(0);
}

for (const [relativePath, content] of Object.entries(outputs)) {
  const absolutePath = path.join(defaultRepoRoot, relativePath);
  mkdirSync(path.dirname(absolutePath), { recursive: true });
  writeFileSync(absolutePath, content);
  console.log(`Wrote ${relativePath}`);
}
