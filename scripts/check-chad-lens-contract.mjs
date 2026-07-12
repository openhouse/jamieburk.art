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
  if (!read(relativePath).includes(expected)) {
    failures.push(`${relativePath} is missing ${label}`);
  }
}

for (const [relativePath, expected, label] of [
  ["AGENTS.md", "Minimize the reader's burden", "the Chad Lens mandate"],
  ["docs/chad-lens.md", "courageous precision", "the public-copy standard"],
  ["docs/knowledge-bank/chad-lens.md", "Do not make the reader decode Jamie", "the claim-layer standard"],
  ["apps/www/src/components/Hero.tsx", "I turn emerging work", "Jamie as the homepage actor"],
  ["apps/www/src/components/Hero.tsx", "support launch", "the homepage toward-what-end statement"],
  ["apps/www/src/app/page.tsx", "Quick path through the portfolio", "the first-pass reader path"],
  ["apps/www/src/app/work/technical-operations/page.tsx", "Strongest role-fit proof", "proof prioritization"],
  ["apps/www/src/app/resume/page.tsx", "Recommended application path", "the application sequence"]
]) {
  requireText(relativePath, expected, label);
}

const caseStudyPaths = [
  "apps/www/src/content/work/harry-j-epstein.mdx",
  "apps/www/src/content/work/fair-rent-nyc.mdx",
  "apps/www/src/content/work/callnyc.mdx",
  "apps/www/src/content/work/wowlist.mdx",
  "apps/www/src/content/work/196-sunday-dinner.mdx",
  "apps/www/src/content/work/kc-town-hall.mdx"
];

for (const relativePath of caseStudyPaths) {
  const source = read(relativePath);
  for (const heading of ["## What I did", "## What became usable", "## Transferable proof"]) {
    if (!source.includes(heading)) failures.push(`${relativePath} is missing ${heading}`);
  }
}

const publicSources = [
  "apps/www/src/app/page.tsx",
  "apps/www/src/app/about/page.tsx",
  "apps/www/src/app/resume/page.tsx",
  "apps/www/src/app/work/technical-operations/page.tsx",
  "apps/www/src/components/Hero.tsx",
  "apps/www/src/components/WorkCard.tsx",
  "apps/www/src/content/work/harry-j-epstein.mdx",
  "apps/www/src/content/work/fair-rent-nyc.mdx",
  "apps/www/src/content/work/callnyc.mdx",
  "apps/www/src/content/work/wowlist.mdx",
  "apps/www/src/content/work/196-sunday-dinner.mdx",
  "apps/www/src/content/work/kc-town-hall.mdx",
  "apps/www/src/data/work.ts"
];

const decodingShortcuts = [
  ["under-structured", /\bunder-structured\b/i],
  ["tracking meetings", /tracking meetings/i],
  ["lightweight", /\blightweight\b/i],
  ["maintainers", /\bmaintainers?\b/i]
];

for (const relativePath of publicSources) {
  const lines = read(relativePath).split("\n");
  for (const [label, pattern] of decodingShortcuts) {
    lines.forEach((line, index) => {
      if (pattern.test(line)) {
        failures.push(`${relativePath}:${index + 1} uses ${label}; translate the actual work`);
      }
    });
  }
}

const fairRent = read("apps/www/src/content/work/fair-rent-nyc.mdx");
if (!/Jamie helped|Jamie contributed/.test(fairRent)) {
  failures.push("FairRentNYC must make Jamie's contribution visible");
}
if (!/not that one person caused|collective/i.test(fairRent)) {
  failures.push("FairRentNYC must preserve collective-work boundaries");
}

if (failures.length > 0) {
  console.error("Chad Lens contract failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Chad Lens contract passed across ${caseStudyPaths.length} case studies and ${publicSources.length} public source files.`);
