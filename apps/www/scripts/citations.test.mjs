import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.resolve(scriptDir, "..");
const knowledgeBankDir = path.join(appRoot, "src/data/knowledge-bank");

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(knowledgeBankDir, relativePath), "utf8"));
}

function mapById(records) {
  return new Map(records.map((record) => [record.id, record]));
}

function slugifyPage(page) {
  return page.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase() || "page";
}

function defineCitationProjection(record) {
  const pageSlug = slugifyPage(record.page);
  const citationsByKey = {};
  const references = [];
  const referenceByGroup = new Map();
  const seenCitationKeys = new Set();

  for (const occurrence of record.occurrences) {
    if (seenCitationKeys.has(occurrence.citationKey)) {
      throw new Error(`Duplicate citation key on ${record.page}: ${occurrence.citationKey}`);
    }

    seenCitationKeys.add(occurrence.citationKey);

    const occurrenceAnchor = `cite-${pageSlug}-${occurrence.citationKey}`;
    const existingReference = referenceByGroup.get(occurrence.citationGroupId);

    if (existingReference) {
      existingReference.citationAnchors.push(occurrenceAnchor);
      citationsByKey[occurrence.citationKey] = {
        citationGroupId: occurrence.citationGroupId,
        number: existingReference.number,
        referenceId: existingReference.referenceId,
        occurrenceAnchor
      };
      continue;
    }

    const reference = {
      citationGroupId: occurrence.citationGroupId,
      number: references.length + 1,
      referenceId: `note-${pageSlug}-${occurrence.citationGroupId.toLowerCase()}`,
      citationAnchors: [occurrenceAnchor]
    };

    references.push(reference);
    referenceByGroup.set(occurrence.citationGroupId, reference);
    citationsByKey[occurrence.citationKey] = {
      citationGroupId: occurrence.citationGroupId,
      number: reference.number,
      referenceId: reference.referenceId,
      occurrenceAnchor
    };
  }

  return { page: record.page, citationsByKey, references };
}

function linkLabelForSource(source) {
  if (source.sourceType === "institutional-social-post") return "Original post";
  if (source.sourceType === "independent-reporting") return "Archived PDF";
  if (source.sourceType === "public-code-repository") return "Public repository";
  if (source.sourceType === "official-web-page") return "Official page";
  if (source.sourceClass === "primary-attachment") return "Promotional graphic";
  return "Source";
}

const sources = readJson("sources.json");
const assets = readJson("assets.json");
const claims = readJson("claims.json");
const evidence = readJson("evidence.json");
const corrections = readJson("corrections.json");
const citationGroups = readJson("citation-groups.json");
const callnycProjectionRecord = readJson("page-projections/callnyc.json");
const technicalOperationsProjectionRecord = readJson("page-projections/technical-operations.json");

const sourceById = mapById(sources);
const assetById = mapById(assets);
const claimById = mapById(claims);
const evidenceById = mapById(evidence);
const citationGroupById = mapById(citationGroups);

test("CallNYC citation numbers follow first appearance order", () => {
  const projection = defineCitationProjection(callnycProjectionRecord);

  assert.equal(projection.citationsByKey["event-context"].number, 1);
  assert.equal(projection.citationsByKey["digital-district"].number, 2);
  assert.equal(projection.citationsByKey["independent-follow-on"].number, 3);
  assert.deepEqual(
    projection.references.map((reference) => reference.citationGroupId),
    ["CALLNYC-NOTE-01", "CALLNYC-NOTE-02", "CALLNYC-NOTE-03"]
  );
});

test("Technical Operations gets a page-local citation number", () => {
  const projection = defineCitationProjection(technicalOperationsProjectionRecord);

  assert.equal(projection.citationsByKey["callnyc-independent-follow-on"].number, 1);
  assert.equal(
    projection.citationsByKey["callnyc-independent-follow-on"].referenceId,
    "note-work-technical-operations-callnyc-note-03"
  );
});

test("Repeated citation groups reuse one reference and collect backlinks", () => {
  const projection = defineCitationProjection({
    page: "/fixture",
    occurrences: [
      { citationKey: "first", citationGroupId: "CALLNYC-NOTE-03" },
      { citationKey: "second", citationGroupId: "CALLNYC-NOTE-03" },
      { citationKey: "third", citationGroupId: "CALLNYC-NOTE-01" },
      { citationKey: "fourth", citationGroupId: "CALLNYC-NOTE-02" }
    ]
  });

  assert.equal(projection.citationsByKey.first.number, 1);
  assert.equal(projection.citationsByKey.second.number, 1);
  assert.equal(projection.citationsByKey.third.number, 2);
  assert.equal(projection.citationsByKey.fourth.number, 3);
  assert.deepEqual(projection.references[0].citationAnchors, [
    "cite-fixture-first",
    "cite-fixture-second"
  ]);
});

test("Reference ids and occurrence anchors are stable and unique", () => {
  const projection = defineCitationProjection(callnycProjectionRecord);
  const anchors = Object.values(projection.citationsByKey).map((citation) => citation.occurrenceAnchor);

  assert.equal(projection.references[0].referenceId, "note-work-callnyc-callnyc-note-01");
  assert.equal(new Set(anchors).size, anchors.length);
});

test("Citation groups only cite evidence for their declared claims", () => {
  for (const group of citationGroups) {
    for (const claimId of group.claimIds) {
      assert.ok(claimById.has(claimId), `Missing claim ${claimId}`);
    }

    for (const evidenceId of group.evidenceIds) {
      const evidenceRecord = evidenceById.get(evidenceId);
      assert.ok(evidenceRecord, `Missing evidence ${evidenceId}`);
      assert.ok(
        group.claimIds.includes(evidenceRecord.claimId),
        `${group.id} includes evidence for undeclared claim ${evidenceRecord.claimId}`
      );
    }
  }
});

test("Private participant photo is public-safe description-only evidence", () => {
  const source = sourceById.get("SRC-PHOTO-DIGITAL-DISTRICT-001");
  const asset = assetById.get("ASSET-PHOTO-DIGITAL-DISTRICT-001");
  const group = citationGroupById.get("CALLNYC-NOTE-02");

  assert.equal(source.visibility, "private");
  assert.equal(source.citationMode, "description-only");
  assert.equal(source.originalUrl, null);
  assert.deepEqual(source.archiveUrls, []);
  assert.equal(asset.publicAssetUrl, null);
  assert.equal(asset.rightsState, "private-review");
  assert.match(group.boundaryNote, /no image file/i);
});

test("Source label mapping keeps original and archive links distinct", () => {
  assert.equal(linkLabelForSource(sourceById.get("SRC-CIVICHALL-X-693124020917522433")), "Original post");
  assert.equal(linkLabelForSource(sourceById.get("SRC-POLITICO-NEUBAUER-2016-03-14")), "Archived PDF");
  assert.equal(linkLabelForSource(sourceById.get("SRC-CALLNYC-GITHUB")), "Public repository");
});

test("Correction record resolves the stale CallNYC year range", () => {
  const correction = corrections.find((record) => record.id === "CORR-CALLNYC-YEARS-001");

  assert.equal(correction.previousValue, "2014-2015");
  assert.equal(correction.correctedValue, "2016");
  assert.equal(correction.status, "resolved");
});

test("Negative search finding remains restricted and bounded", () => {
  const claim = claimById.get("CLM-CALLNYC-CIVICHALL-PAGE-NOT-RECOVERED");
  const group = citationGroupById.get("CALLNYC-NOTE-04");

  assert.equal(claim.status, "supported-negative-search-finding");
  assert.equal(group.visibility, "restricted");
  assert.match(group.publicNote, /not "never existed\.?"/i);
});

test("Adjacent citation marks render as adjacent bracketed notes", () => {
  const projection = defineCitationProjection({
    page: "/adjacent",
    occurrences: [
      { citationKey: "alpha", citationGroupId: "CALLNYC-NOTE-01" },
      { citationKey: "beta", citationGroupId: "CALLNYC-NOTE-02" }
    ]
  });

  const renderedMarks = ["alpha", "beta"]
    .map((key) => `[${projection.citationsByKey[key].number}]`)
    .join("");

  assert.equal(renderedMarks, "[1][2]");
});
