import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import publicRegistry from "../../apps/www/src/data/knowledge-bank/public-registry.json" with { type: "json" };
import { proofClaims } from "../../apps/www/src/data/proofs.ts";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const forbiddenPublicLanguage = /\b(?:bound|bounded)\b/giu;

function filesWithin(relativeDirectory, extensions) {
  const directory = path.join(repoRoot, relativeDirectory);
  const files = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const relative = path.join(relativeDirectory, entry.name);
    if (entry.isDirectory()) files.push(...filesWithin(relative, extensions));
    else if (extensions.some((extension) => entry.name.endsWith(extension))) files.push(relative);
  }
  return files;
}

function occurrences(surface, text) {
  const matches = [];
  for (const match of text.matchAll(forbiddenPublicLanguage)) {
    matches.push(`${surface}: ${match[0]}`);
  }
  return matches;
}

function publicLanguageOccurrences() {
  const violations = [];
  const readerFacingSourceFiles = [
    ...filesWithin("apps/www/src/app", [".ts", ".tsx"]),
    ...filesWithin("apps/www/src/components", [".ts", ".tsx"]),
    ...filesWithin("apps/www/src/content", [".md", ".mdx"]),
    "apps/www/src/data/home-identity.ts",
    "apps/www/src/data/participationMedia.ts",
    "apps/www/src/data/site.ts",
    "apps/www/src/data/social-card.ts",
    "apps/www/src/data/work-covers.ts",
    "apps/www/src/data/work.ts",
    ...filesWithin("resume-versions", [".md", ".json"])
  ];

  for (const relative of readerFacingSourceFiles) {
    violations.push(...occurrences(relative, readFileSync(path.join(repoRoot, relative), "utf8")));
  }

  for (const proof of proofClaims) {
    for (const [field, value] of [
      ["publicWording", proof.publicWording],
      ["shortWording", proof.shortWording],
      ["detailedPublicWording", proof.detailedPublicWording]
    ]) {
      if (value) violations.push(...occurrences(`proof:${proof.id}:${field}`, value));
    }
  }

  for (const source of publicRegistry.sources) {
    violations.push(...occurrences(`citation:${source.id}:publicCitation`, source.publicCitation));
    if (source.publicNote) violations.push(...occurrences(`citation:${source.id}:publicNote`, source.publicNote));
  }
  for (const claim of publicRegistry.claims) {
    for (const projection of claim.projections) {
      violations.push(...occurrences(`claim:${claim.id}:${projection.key}`, projection.text));
    }
  }

  return violations.sort();
}

test("reader-facing surfaces replace bound and bounded with context-specific language", () => {
  assert.deepEqual(publicLanguageOccurrences(), []);
});
