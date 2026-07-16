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
  ["docs/knowledge-bank/margaret-morse-lens.md", "actual accomplishment", "the accomplishment-over-format source principle"],
  ["docs/knowledge-bank/margaret-morse-lens.md", "not a quotation, testimonial, or evaluation written, approved, or currently endorsed by Margaret Morse", "the derivation and endorsement boundary"],
  ["apps/www/src/app/about/page.tsx", "The artistic, civic, technical, and social parts of my practice belong together.", "the cross-practice threshold"],
  ["apps/www/src/app/about/page.tsx", "systems as things people inhabit", "the embodied-systems statement"],
  ["apps/www/src/app/about/page.tsx", "attention, hospitality, and participation", "the relational method"],
  ["apps/www/src/content/work/196-sunday-dinner.mdx", "hospitality", "hospitality evidence"],
  ["apps/www/src/data/knowledge-bank/records.ts", "reviewStatus: \"close-read\"", "the close-read public Open House source"],
  ["apps/www/src/data/knowledge-bank/ucsc-lenses-lifecycle.ts", "SRC-UCSC-NARRATIVE-EVALUATIONS-2004-2006", "the protected narrative-evaluation source"]
]) {
  requireText(relativePath, expected, label);
}

const about = read("apps/www/src/app/about/page.tsx");
for (const [label, pattern] of [
  ["private praise", /recommend him without reservation/i],
  ["grade language", /\bA\+\b/],
  ["student identifier", /0120470/],
  ["private correspondence", /@(?:ucsc\.edu|comcast\.net)/i]
]) {
  if (pattern.test(about)) failures.push(`About page exposes ${label}`);
}

if (failures.length > 0) {
  console.error("Prof Margaret Morse Lens contract failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("Prof Margaret Morse Lens contract passed across the public threshold, project evidence, and protected source boundary.");
