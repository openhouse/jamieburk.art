#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  createCitationReport,
  getCitationNumber,
  getCitationOccurrence,
  getPageCitationScope,
  getPublicReferences,
  validateKnowledgeBank
} from "../index.ts";
import { callNYCKnowledgeBank } from "../records/callnyc.ts";
import type { KnowledgeBank } from "../schemas.ts";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../../..");

function cloneBank(): KnowledgeBank {
  return structuredClone(callNYCKnowledgeBank);
}

function expectFailure(bank: KnowledgeBank, text: string) {
  const result = validateKnowledgeBank(bank);
  assert.equal(result.ok, false);
  assert.match(result.failures.join("\n"), new RegExp(text));
}

const valid = validateKnowledgeBank();
assert.equal(valid.ok, true, valid.failures.join("\n"));

const scope = getPageCitationScope("work.callnyc");
assert.equal(scope.path, "/work/callnyc");
assert.equal(getCitationNumber("work.callnyc", "citation.callnyc.archived-independent-prototype"), 7);
assert.equal(
  getCitationOccurrence(
    "work.callnyc",
    "callnyc-transfer-archive-repeat",
    "citation.callnyc.archived-independent-prototype"
  ).number,
  7
);
assert.equal(
  new Set(scope.occurrences.map((occurrence) => occurrence.refId)).size,
  scope.occurrences.length
);

const references = getPublicReferences("work.callnyc");
const digitalDistrict = references.find((reference) => {
  return reference.citationGroup.id === "citation.callnyc.digital-district-breakout";
});
assert.ok(digitalDistrict);
assert.ok(digitalDistrict.targets.some((target) => target.kind === "artifact"));
assert.equal(digitalDistrict.targets.every((target) => target.links.length === 0), true);
assert.match(digitalDistrict.citationGroup.publicCaveat ?? "", /does not establish/);

const report = createCitationReport();
assert.match(report, /Citation Report: \/work\/callnyc/);
assert.match(report, /correction\.callnyc\.years/);
assert.doesNotMatch(report, /\/private\/|\/Users\/|\/Volumes\/|file:\/\//);

const pageHtmlSource = readFileSync(
  path.join(repoRoot, "apps/www/src/components/citations/References.tsx"),
  "utf8"
);
assert.match(pageHtmlSource, /role="doc-endnotes"/);
assert.match(pageHtmlSource, /role="doc-backlink"/);
assert.doesNotMatch(pageHtmlSource, /role=["']doc-endnote["']|role=["']doc-biblioentry["']/);

const citeSource = readFileSync(
  path.join(repoRoot, "apps/www/src/components/citations/Cite.tsx"),
  "utf8"
);
assert.match(citeSource, /role="doc-noteref"/);

const duplicate = cloneBank();
duplicate.sources.push(duplicate.sources[0]);
expectFailure(duplicate, "Duplicate source IDs");

const missingRelationship = cloneBank();
missingRelationship.claims[0].evidenceEdgeIds.push("edge.callnyc.missing");
expectFailure(missingRelationship, "references missing edge");

const invalidUrl = cloneBank();
invalidUrl.sources[0] = { ...invalidUrl.sources[0], url: "file:///private/source" };
expectFailure(invalidUrl, "Schema issue");

const negativeSearch = cloneBank();
const notRecovered = negativeSearch.claims.find((claim) => claim.status === "not-recovered");
assert.ok(notRecovered);
notRecovered.approvedPublicText = "No dedicated listing ever existed.";
expectFailure(negativeSearch, "nonexistence claim");

const doesNotSupportOnly = cloneBank();
doesNotSupportOnly.citationGroups[3].evidenceEdgeIds = [
  "edge.callnyc.digital-district.photo-does-not-support-title"
];
expectFailure(doesNotSupportOnly, "no affirmative support");

const pageRestricted = cloneBank();
pageRestricted.claims[0].prohibitedPages = ["work.callnyc"];
expectFailure(pageRestricted, "not allowed");

const rightsRestricted = cloneBank();
rightsRestricted.artifacts[0].publicAssetUrl = "https://example.com/private-photo.jpg";
expectFailure(rightsRestricted, "public assets");

const badCorrection = cloneBank();
badCorrection.corrections[0].targetClaimId = "claim.callnyc.missing";
expectFailure(badCorrection, "references missing target claim");

const privateLeak = cloneBank();
privateLeak.researchRuns[0].finding = "Reviewed /private/tmp/civic-hall-wayback-research.";
expectFailure(privateLeak, "restricted marker");

console.log("Citation tests passed.");
