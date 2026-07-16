#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];

function read(relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);
  if (!existsSync(absolutePath)) {
    failures.push(`${relativePath} is missing`);
    return "";
  }
  return readFileSync(absolutePath, "utf8");
}

function requireText(relativePath, expected, label) {
  const source = read(relativePath).replace(/\s+/g, " ");
  if (!source.includes(expected.replace(/\s+/g, " "))) {
    failures.push(`${relativePath} is missing ${label}`);
  }
}

for (const [relativePath, expected, label] of [
  ["docs/knowledge-bank/warren-sack-lens.md", "recursive social inference", "the recursive-method source principle"],
  ["docs/knowledge-bank/warren-sack-lens.md", "demonstration is not adoption", "the outcome boundary"],
  ["docs/knowledge-bank/warren-sack-lens.md", "not a quotation, testimonial, or evaluation written, approved, or currently endorsed by Warren Sack", "the derivation and endorsement boundary"],
  ["apps/www/src/app/about/page.tsx", "Structure grows from the material and relationships already present.", "the material-to-structure statement"],
  ["apps/www/src/app/about/page.tsx", "latent patterns", "the recursive observation method"],
  ["apps/www/src/app/about/page.tsx", "prototypes and shared artifacts", "the theory-to-prototype movement"],
  ["apps/www/src/app/about/page.tsx", "understand and change the system together", "the interface-for-action end"],
  ["apps/www/src/app/about/page.tsx", "learn from what happens in use", "the situated-learning loop"],
  ["apps/www/src/app/about/page.tsx", "revise the structure without erasing the relationships that produced it", "the recursive revision and collective-history boundary"],
  ["apps/www/src/app/work/technical-operations/page.tsx", "Source-Backed Team Memory", "the current source-backed systems practice"],
  ["apps/www/src/app/lab/source-backed-team-memory/page.tsx", "Correction in practice", "the situated correction example"],
  ["apps/www/src/app/lab/source-backed-team-memory/page.tsx", "methodProof.detailedPublicWording", "the proof-bank projection"],
  ["apps/www/src/data/proofs.ts", "approximate 2:10 p.m. timestamp", "the initial bounded inference"],
  ["apps/www/src/data/proofs.ts", "direct Civic Hall announcement stating 1-3 p.m.", "the stronger source"],
  ["apps/www/src/data/proofs.ts", "the public claim was corrected", "the use-to-revision result"],
  ["apps/www/src/data/proofs.ts", "the photograph stayed held pending rights and consent review", "the correction's public-safety boundary"],
  ["apps/www/src/content/work/callnyc.mdx", "## What became usable", "the civic prototype result"],
  ["apps/www/src/data/work.ts", "Richard Caceres", "collective product credit"],
  ["apps/www/src/data/knowledge-bank/ucsc-lenses-lifecycle.ts", "CND-UCSC-RECURSIVE-SYSTEMS-METHOD", "the bounded method claim"]
]) {
  requireText(relativePath, expected, label);
}

const publicSources = [
  "apps/www/src/app/about/page.tsx",
  "apps/www/src/app/work/technical-operations/page.tsx",
  "apps/www/src/content/work/callnyc.mdx",
  "apps/www/src/content/work/wowlist.mdx"
];

for (const relativePath of publicSources) {
  if (/independently invented[\s\S]{0,80}structural equivalence/i.test(read(relativePath))) {
    failures.push(`${relativePath} turns a protected instructor evaluation into an unsupported public genius claim`);
  }
}

if (failures.length > 0) {
  console.error("Prof Warren Sack Lens contract failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("Prof Warren Sack Lens contract passed across recursive method, interface evidence, collective credit, and claim boundaries.");
