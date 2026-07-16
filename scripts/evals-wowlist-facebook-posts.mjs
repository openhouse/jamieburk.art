#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  semanticRecordDigest,
  sha256,
  validateWowListFacebookPostLedger,
  validateWowListFacebookPostManifest
} from "./lib/wowlist-facebook-posts-validation.mjs";
import {
  wowListFacebookPostSafeMutations,
  wowListFacebookPostUnsafeMutations
} from "./lib/wowlist-facebook-posts-adversarial.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ledgerText = readFileSync(path.join(repoRoot, "docs/knowledge-bank/corpora/wowlist-facebook-posts-full-population-2026-07-16.json"), "utf8");
const ledger = JSON.parse(ledgerText);
const manifest = JSON.parse(readFileSync(path.join(repoRoot, "docs/knowledge-bank/corpora/wowlist-facebook-posts-full-population-2026-07-16.manifest.json"), "utf8"));
const clone = (value) => structuredClone(value);

assert.deepEqual(validateWowListFacebookPostLedger(ledger), []);
assert.deepEqual(validateWowListFacebookPostManifest(manifest, { ledgerText }), []);

for (const { label, mutate } of wowListFacebookPostUnsafeMutations) {
  const candidate = clone(ledger);
  mutate(candidate);
  const errors = validateWowListFacebookPostLedger(candidate);
  assert.ok(errors.length > 0, `Unsafe mutation passed: ${label}`);
}

const selfConsistentUnsafeMutations = [
  ["self-consistent-date-drift", (candidate) => {
    candidate.records[9].publishedOn = candidate.records[10].publishedOn;
    candidate.integrity.recordSemanticSha256 = semanticRecordDigest(candidate.records);
  }],
  ["self-consistent-canonical-id-drift", (candidate) => {
    candidate.records[10].postId = "9999999999999999999";
    candidate.records[10].canonicalUrl = "https://www.facebook.com/wowlist/posts/9999999999999999999";
    candidate.integrity.canonicalPostIdSha256 = sha256(candidate.records.map((record) => record.postId).join("\n"));
    candidate.integrity.recordSemanticSha256 = semanticRecordDigest(candidate.records);
  }],
  ["self-consistent-management-id-drift", (candidate) => {
    candidate.records[0].managementContentId = "9999999999999999998";
    candidate.integrity.managementContentIdSha256 = sha256(candidate.records.map((record) => record.managementContentId).join("\n"));
    candidate.integrity.recordSemanticSha256 = semanticRecordDigest(candidate.records);
  }],
  ["self-consistent-source-link-drift", (candidate) => {
    const counts = new Map();
    for (const record of candidate.records) {
      for (const link of record.sourceLinks) counts.set(link, (counts.get(link) ?? 0) + 1);
    }
    const target = candidate.records.find((record) => record.sourceLinks.some((link) => counts.get(link) === 1));
    const oldLink = target.sourceLinks.find((link) => counts.get(link) === 1);
    const newLink = "https://example.org/public-source-replacement";
    target.sourceLinks[target.sourceLinks.indexOf(oldLink)] = newLink;
    candidate.linkInventory.links[candidate.linkInventory.links.indexOf(oldLink)] = newLink;
    candidate.integrity.recordSemanticSha256 = semanticRecordDigest(candidate.records);
  }]
];

for (const [label, mutate] of selfConsistentUnsafeMutations) {
  const candidate = clone(ledger);
  mutate(candidate);
  const errors = validateWowListFacebookPostLedger(candidate);
  assert.ok(errors.length > 0, `Self-consistent unsafe mutation passed: ${label}`);
}

for (const { label, mutate } of wowListFacebookPostSafeMutations) {
  const candidate = clone(ledger);
  mutate(candidate);
  const errors = validateWowListFacebookPostLedger(candidate);
  assert.deepEqual(errors, [], `Safe mutation failed: ${label}`);
}

const manifestUnsafeMutations = [
  ["manifest-materialized-count", (candidate) => { candidate.population.materializedRecords = 55; }],
  ["manifest-canonical-count", (candidate) => { candidate.population.canonicalPostIds = 53; }],
  ["manifest-legacy-count", (candidate) => { candidate.population.legacyManagementContentIds = 53; }],
  ["manifest-date-drift", (candidate) => { candidate.population.start = "2015-01-01"; }],
  ["manifest-all-ever-status", (candidate) => { candidate.population.status = "complete-all-ever"; }],
  ["manifest-owner-agreement", (candidate) => { candidate.ownerExport.exactCanonicalIdAgreement = 28; }],
  ["manifest-owner-verification", (candidate) => { candidate.ownerExport.fileVerifiedWindows = 3; }],
  ["manifest-privacy-flip", (candidate) => { candidate.privacy.adminAnalyticsPublished = true; }],
  ["manifest-nested-private-path", (candidate) => { candidate.privacy.protectedPath = "/private/tmp/raw.json"; }],
  ["manifest-publish-captures", (candidate) => { candidate.sourceCapturesPublished = true; }],
  ["manifest-corpus-path", (candidate) => { candidate.corpus = "private/raw.json"; }],
  ["manifest-digest", (candidate) => { candidate.corpusSha256 = "0".repeat(64); }]
];

for (const [label, mutate] of manifestUnsafeMutations) {
  const candidate = clone(manifest);
  mutate(candidate);
  const errors = validateWowListFacebookPostManifest(candidate, { ledgerText });
  assert.ok(errors.length > 0, `Unsafe manifest mutation passed: ${label}`);
}

const reorderedManifest = Object.fromEntries(Object.entries(manifest).reverse());
reorderedManifest.population = Object.fromEntries(Object.entries(reorderedManifest.population).reverse());
assert.deepEqual(
  validateWowListFacebookPostManifest(reorderedManifest, { ledgerText }),
  [],
  "Semantically harmless manifest key reordering must pass"
);

console.log(`WOW List Facebook adversarial evals passed: ${wowListFacebookPostUnsafeMutations.length + selfConsistentUnsafeMutations.length + manifestUnsafeMutations.length} unsafe mutations rejected and ${wowListFacebookPostSafeMutations.length + 1} safe mutations accepted.`);
