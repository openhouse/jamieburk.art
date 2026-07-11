#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

const sources = readJson("apps/www/src/data/knowledge-bank/sources.json");
const claims = readJson("apps/www/src/data/knowledge-bank/claims.json");
const pageCitations = readJson("apps/www/src/data/knowledge-bank/page-citations.json");
const media = readJson("apps/www/src/data/knowledge-bank/media.json");
const corrections = readJson("apps/www/src/data/knowledge-bank/corrections.json");

const sourceById = new Map(sources.map((source) => [source.id, source]));
const claimById = new Map(claims.map((claim) => [claim.id, claim]));

function numberMap(noteIds) {
  return new Map([...new Set(noteIds)].map((noteId, index) => [noteId, index + 1]));
}

test("page-local citation numbers follow first appearance", () => {
  const callnycNumbers = numberMap(pageCitations["/work/callnyc"]);

  assert.equal(callnycNumbers.get("callnyc-hackathon-announced-date-time"), 1);
  assert.equal(callnycNumbers.get("callnyc-first-councilstat-hackathon"), 2);
  assert.equal(callnycNumbers.get("callnyc-independent-follow-on"), 3);
  assert.equal(callnycNumbers.get("callnyc-councilstat-usage-varied"), 4);
});

test("same note reuses one number on one page", () => {
  const ids = [
    "callnyc-independent-follow-on",
    "callnyc-councilstat-usage-varied",
    "callnyc-independent-follow-on"
  ];
  const numbers = numberMap(ids);

  assert.equal(numbers.get("callnyc-independent-follow-on"), 1);
  assert.equal(numbers.get("callnyc-councilstat-usage-varied"), 2);
});

test("citation numbering resets between pages", () => {
  const callnycNumbers = numberMap(pageCitations["/work/callnyc"]);
  const technicalNumbers = numberMap(pageCitations["/work/technical-operations"]);

  assert.equal(callnycNumbers.get("callnyc-independent-follow-on"), 3);
  assert.equal(technicalNumbers.get("callnyc-hackathon-to-independent-follow-on"), 1);
});

test("occurrence and backlink IDs are deterministic", () => {
  const pageKey = "work-callnyc";
  const numbers = numberMap(pageCitations["/work/callnyc"]);
  const ids = [...numbers.values()].map((number) => ({
    citationId: `citation-${pageKey}-${number}`,
    referenceId: `reference-${pageKey}-${number}`
  }));

  assert.deepEqual(ids[0], {
    citationId: "citation-work-callnyc-1",
    referenceId: "reference-work-callnyc-1"
  });
  assert.equal(new Set(ids.flatMap((id) => [id.citationId, id.referenceId])).size, ids.length * 2);
});

test("protected participant-photo evidence cannot project publicly", () => {
  const protectedSourceIds = new Set(
    sources
      .filter((source) => source.publicVisibility === "protected")
      .map((source) => source.id)
  );

  for (const claimIds of Object.values(pageCitations)) {
    for (const claimId of claimIds) {
      const claim = claimById.get(claimId);
      for (const evidence of claim.evidence) {
        assert.equal(protectedSourceIds.has(evidence.sourceId), false, `${claimId} projects ${evidence.sourceId}`);
      }
    }
  }
});

test("pending-rights media has no public URL", () => {
  for (const item of media) {
    if (item.publicationStatus === "pending-rights") {
      assert.equal(item.publicUrl, undefined, `${item.id} should not have a publicUrl`);
    }
  }
});

test("not-recovered evidence is not used as positive proof", () => {
  for (const claim of claims) {
    for (const evidence of claim.evidence) {
      const source = sourceById.get(evidence.sourceId);
      assert.notEqual(
        source?.availability === "not-recovered" && evidence.relation === "supports",
        true,
        `${claim.id} treats not-recovered evidence as support`
      );
    }
  }
});

test("required CallNYC corrections are applied", () => {
  const correctionById = new Map(corrections.map((correction) => [correction.id, correction]));

  assert.equal(correctionById.get("callnyc-years-2014-2015-to-2016")?.status, "applied");
  assert.equal(correctionById.get("callnyc-first-civic-data-to-first-councilstat")?.status, "applied");
});

test("all public URLs are syntactically valid", () => {
  for (const source of sources) {
    for (const url of [source.url, ...(source.archiveUrls ?? [])].filter(Boolean)) {
      assert.match(new URL(url).protocol, /^https?:$/);
    }
  }
});
