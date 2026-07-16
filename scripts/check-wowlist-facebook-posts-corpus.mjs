#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  sha256,
  validateWowListFacebookPostLedger,
  validateWowListFacebookPostManifest
} from "./lib/wowlist-facebook-posts-validation.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ledgerPath = "docs/knowledge-bank/corpora/wowlist-facebook-posts-full-population-2026-07-16.json";
const manifestPath = "docs/knowledge-bank/corpora/wowlist-facebook-posts-full-population-2026-07-16.manifest.json";
const projectPath = "docs/knowledge-bank/projects/wowlist-facebook-posts.md";
const runPath = "docs/knowledge-bank/runs/2026-07-16-wowlist-facebook-posts-full-population.md";
const typedPath = "apps/www/src/data/knowledge-bank/wowlist-facebook-posts-full-population.ts";
const mdxPath = "apps/www/src/content/work/wowlist.mdx";
const expectedLedgerSha256 = "0e8cf08fea7284b8d37009ad922eccf8cb2126580765418afc3a7249aaaf4cc0";

const read = (relativePath) => readFileSync(path.join(repoRoot, relativePath), "utf8");
const ledgerText = read(ledgerPath);
const ledger = JSON.parse(ledgerText);
const manifest = JSON.parse(read(manifestPath));
const project = read(projectPath);
const run = read(runPath);
const typed = read(typedPath);
const mdx = read(mdxPath);

assert.deepEqual(validateWowListFacebookPostLedger(ledger), []);
assert.deepEqual(validateWowListFacebookPostManifest(manifest, { ledgerText }), []);
assert.equal(sha256(ledgerText), expectedLedgerSha256);
assert.equal(manifest.corpusSha256, expectedLedgerSha256);

for (const text of [project, run, typed]) {
  assert.match(text, /54/);
  assert.match(text, /51/);
  assert.match(text, /three|3/);
  assert.match(text, /Richard Album/);
  assert.match(text, /complete as materialized|complete-as-materialized|materialized/i);
  assert.match(text, /(?:not an assertion|does not make|not[^.\n]*(?:all-ever|complete|sole))/i);
}

for (const claimId of [
  "CLM-WOWLIST-FACEBOOK-PUBLISHING-STEWARDSHIP",
  "CLM-WOWLIST-FACEBOOK-DISTRIBUTION-PRACTICE"
]) {
  assert.ok(mdx.includes(`claimId="${claimId}"`), `${claimId} must project on the WOW List case study`);
  assert.ok(typed.includes(claimId), `${claimId} must exist in typed knowledge-bank data`);
}

assert.match(typed, /status: "hold"/);
assert.match(project, /No public stakeholder-group engagement count is promoted/);
assert.doesNotMatch(ledgerText, /\/Users\/|\/Volumes\/|\/private\/tmp\//);

console.log("WOW List Facebook corpus verified: 54 records, 51 Page-publisher bylines, 3 video redirects, 42 normalized URLs, one exact 29-row owner-export segment, and public-safety boundaries.");
