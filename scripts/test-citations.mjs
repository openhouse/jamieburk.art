#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataRoot = path.join(repoRoot, "apps/www/src/data/knowledge-bank");

function load(name) {
  return JSON.parse(readFileSync(path.join(dataRoot, name), "utf8"));
}

function read(rel) {
  return readFileSync(path.join(repoRoot, rel), "utf8");
}

const sources = load("sources.json");
const claims = load("claims.json");
const groups = load("citation-groups.json");
const pageOrders = load("page-citation-orders.json");
const inquiries = load("research-inquiries.json");
const media = load("media.json");
const corrections = load("corrections.json");

const sourceById = new Map(sources.map((source) => [source.id, source]));
const claimById = new Map(claims.map((claim) => [claim.id, claim]));
const groupById = new Map(groups.map((group) => [group.id, group]));

function citationNumber(pageKey, groupId) {
  const ids = pageOrders[pageKey] ?? [];
  const index = ids.indexOf(groupId);
  if (index === -1) throw new Error(`${groupId} is not registered on ${pageKey}`);
  return index + 1;
}

function noteId(pageKey, groupId) {
  return `cite-note-${pageKey}-${groupId}`;
}

function refId(pageKey, groupId, instance) {
  return `cite-ref-${pageKey}-${groupId}${instance ? `-${instance}` : ""}`;
}

test("page-local numbering follows first appearance", () => {
  assert.deepEqual(
    pageOrders.callnyc.map((id) => citationNumber("callnyc", id)),
    [1, 2, 3, 4]
  );
  assert.equal(citationNumber("technical-operations", "callnyc-independent-follow-on"), 1);
  assert.equal(citationNumber("technical-operations", "callnyc-data-limitations"), 2);
});

test("same group reuses the same page-local number", () => {
  assert.equal(citationNumber("callnyc", "callnyc-event-date-time"), 1);
  assert.equal(citationNumber("callnyc", "callnyc-event-date-time"), 1);
});

test("repeated occurrences can have unique anchor IDs", () => {
  const first = refId("callnyc", "callnyc-event-date-time", "first");
  const second = refId("callnyc", "callnyc-event-date-time", "second");
  assert.notEqual(first, second);
  assert.match(read("apps/www/src/components/citations/CitationRef.tsx"), /instance/);
});

test("noteref hrefs, note IDs, and backlink hrefs use matching IDs", () => {
  for (const [pageKey, ids] of Object.entries(pageOrders)) {
    for (const groupId of ids) {
      assert.match(noteId(pageKey, groupId), /^cite-note-/);
      assert.match(refId(pageKey, groupId), /^cite-ref-/);
    }
  }
  const refSource = read("apps/www/src/components/citations/CitationRef.tsx");
  const notesSource = read("apps/www/src/components/citations/CitationNotes.tsx");
  assert.match(refSource, /href=\{`#cite-note-/);
  assert.match(notesSource, /href=\{`#cite-ref-/);
});

test("private-review and summary-only sources do not render private links", () => {
  const protectedSources = sources.filter(
    (source) =>
      source.visibility === "private-review-only" ||
      source.publicCitationMode === "summary-only" ||
      source.publicCitationMode === "not-public"
  );
  assert.ok(protectedSources.length > 0);
  for (const source of protectedSources) {
    assert.equal(source.originalUrl, undefined, `${source.id} must not expose originalUrl`);
    assert.equal(source.archivedUrl, undefined, `${source.id} must not expose archivedUrl`);
    assert.equal(source.mediaUrl, undefined, `${source.id} must not expose mediaUrl`);
  }
});

test("summary-only sources can render public-safe labels", () => {
  const summarySources = sources.filter((source) => source.publicCitationMode === "summary-only");
  assert.ok(summarySources.length > 0);
  for (const source of summarySources) {
    assert.ok(source.shortLabel);
    assert.doesNotMatch(source.shortLabel, /^https?:\/\//);
  }
});

test("source links are human-labeled", () => {
  for (const source of sources) {
    assert.ok(source.shortLabel.trim(), `${source.id} missing shortLabel`);
    assert.doesNotMatch(source.shortLabel, /^https?:\/\//);
  }
  assert.match(read("apps/www/src/components/citations/SourceLinks.tsx"), /source\.shortLabel/);
});

test("note order is deterministic", () => {
  assert.deepEqual(pageOrders.callnyc, [
    "callnyc-event-date-time",
    "callnyc-digital-district",
    "callnyc-independent-follow-on",
    "callnyc-data-limitations"
  ]);
});

test("no duplicate DOM IDs are implied by current page citation orders", () => {
  const ids = [];
  for (const [pageKey, groupIds] of Object.entries(pageOrders)) {
    for (const groupId of groupIds) {
      ids.push(noteId(pageKey, groupId));
      ids.push(refId(pageKey, groupId));
    }
  }
  assert.equal(new Set(ids).size, ids.length);
});

test("correction records reference valid claims and sources", () => {
  assert.ok(corrections.length > 0);
  for (const correction of corrections) {
    for (const claimId of correction.claimIds) {
      assert.ok(claimById.has(claimId), `${correction.id} references unknown ${claimId}`);
    }
    for (const sourceId of correction.sourceIds) {
      assert.ok(sourceById.has(sourceId), `${correction.id} references unknown ${sourceId}`);
    }
    assert.match(correction.priorWording, /multi-year|ambiguous|hackathon/i);
    assert.match(correction.revisedWording, /2016/);
  }
});

test("negative finding retains its limitation", () => {
  const findingClaim = claimById.get("civic-hall-calendar-listing-not-recovered");
  assert.ok(findingClaim);
  assert.match(findingClaim.caveat, /not proof/i);
  assert.ok(
    findingClaim.evidence.some((edge) => edge.relationship === "negative-search-finding")
  );
  assert.ok(inquiries.some((inquiry) => inquiry.id === "callnyc-dedicated-event-page"));
});

test("CallNYC public year is 2016", () => {
  const publicText = [
    read("apps/www/src/content/work/callnyc.mdx"),
    read("apps/www/src/data/work.ts"),
    JSON.stringify(claims)
  ].join("\n");
  assert.match(publicText, /2016/);
  assert.doesNotMatch(publicText, /2014-2015|2014–2015/);
});

test("media records distinguish direct evidence from representative context", () => {
  const participant = media.find(
    (item) => item.id === "media-callnyc-digital-district-participant-photo"
  );
  const representative = media.find(
    (item) => item.id === "media-callnyc-future-representative-civic-hackathon-photo"
  );
  assert.equal(participant.evidenceRole, "participant-archive-evidence");
  assert.equal(participant.publicUse, "hold");
  assert.equal(representative.evidenceRole, "representative-context");
  assert.equal(representative.publicUse, "do-not-publish");
  assert.ok(representative.mustNotImply.some((text) => /January 30, 2016/.test(text)));
});

test("citation components include required DPUB-ARIA roles", () => {
  const refSource = read("apps/www/src/components/citations/CitationRef.tsx");
  const notesSource = read("apps/www/src/components/citations/CitationNotes.tsx");
  assert.match(refSource, /role="doc-noteref"/);
  assert.match(notesSource, /role="doc-endnotes"/);
  assert.match(notesSource, /role="doc-backlink"/);
  assert.match(notesSource, /<ol>/);
  assert.doesNotMatch(notesSource, /role="doc-endnote"/);
});
