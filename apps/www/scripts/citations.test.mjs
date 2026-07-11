import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
  claimRecords,
  correctionRecords,
  evidenceNoteRecords,
  mediaEvidenceRecords,
  pageCitationManifests,
  researchRunRecords,
  sourceRecords
} from "../src/data/knowledge-bank/index.ts";
import {
  buildCitationSet,
  getPublicSourceLinks,
  projectPublicSource
} from "../src/lib/citations.ts";
import { validateCitationGraph } from "../src/lib/citation-validation.ts";

const graph = {
  sources: sourceRecords,
  claims: claimRecords,
  notes: evidenceNoteRecords,
  pages: pageCitationManifests,
  researchRuns: researchRunRecords,
  media: mediaEvidenceRecords,
  corrections: correctionRecords
};

function sampleManifest(pageId = "first") {
  return {
    pageId,
    path: `/${pageId}`,
    mdxPath: "fixture.mdx",
    allowedNoteIds: ["alpha", "beta"],
    occurrences: [
      { refId: "alpha-first", noteId: "alpha" },
      { refId: "beta-first", noteId: "beta" },
      { refId: "alpha-repeat", noteId: "alpha" }
    ],
    expectedOccurrenceCount: 3
  };
}

test("page-local numbers follow first appearance and repeated notes reuse numbers", () => {
  const built = buildCitationSet(sampleManifest());
  assert.deepEqual(built.occurrences.map((item) => item.number), [1, 2, 1]);
  assert.equal(built.notes.length, 2);
});

test("numbering resets on a new page", () => {
  const second = sampleManifest("second");
  second.allowedNoteIds = ["beta"];
  second.occurrences = [{ refId: "beta-only", noteId: "beta" }];
  second.expectedOccurrenceCount = 1;
  assert.equal(buildCitationSet(second).occurrences[0].number, 1);
});

test("each occurrence has a unique deterministic anchor and all backlinks", () => {
  const built = buildCitationSet(sampleManifest());
  assert.equal(new Set(built.occurrences.map((item) => item.anchorId)).size, 3);
  assert.deepEqual(built.notes[0].referenceAnchorIds, [
    "cite-ref-first-alpha-first",
    "cite-ref-first-alpha-repeat"
  ]);
});

test("one evidence note can synthesize several sources", () => {
  const note = evidenceNoteRecords.find((item) => item.id === "callnyc-event-date-time");
  assert.ok(note);
  assert.equal(note.sourceIds.length, 3);
});

test("original, archive, image, and contextual-carrier labels remain distinct", () => {
  const social = sourceRecords.find((item) => item.id === "civic-hall-x-693124020917522433");
  const graphic = sourceRecords.find(
    (item) => item.id === "nyc-council-hackathon-promotional-graphic"
  );
  const carrier = sourceRecords.find((item) => item.id === "civic-hall-wayback-2016-01-31");
  assert.deepEqual(getPublicSourceLinks(social).map((item) => item.label), ["Original post", "Archived copy"]);
  assert.deepEqual(getPublicSourceLinks(graphic).map((item) => item.label), ["View image"]);
  assert.deepEqual(getPublicSourceLinks(carrier).map((item) => item.label), ["Contextual carrier"]);
});

test("restricted source URLs and internal notes are redacted", () => {
  const source = sourceRecords.find(
    (item) => item.id === "callnyc-digital-district-participant-photo"
  );
  assert.ok(source);
  const projection = projectPublicSource(source);
  assert.equal(projection.links.length, 0);
  assert.equal("internalNote" in projection, false);
});

test("summary-only citation mode is governed", () => {
  const note = evidenceNoteRecords.find((item) => item.id === "callnyc-digital-district-photo");
  assert.equal(note?.renderMode, "summary-only");
});

test("not recovered cannot become never existed", () => {
  const broken = structuredClone(graph);
  const claim = broken.claims.find((item) => item.id === "callnyc.research.calendar-not-recovered");
  claim.publicText = "No Civic Hall listing ever existed.";
  assert.match(
    validateCitationGraph(broken).failures.join("\n"),
    /negative research result|unbounded not-recovered|anti-claim/
  );
});

test("archived carrier relation is preserved", () => {
  const carrier = sourceRecords.find((item) => item.id === "civic-hall-wayback-2016-01-31");
  assert.equal(carrier?.archiveRelation, "embedded-social-feed-capture");
});

test("correction records resolve valid object and evidence IDs", () => {
  const result = validateCitationGraph(graph);
  assert.equal(result.failures.filter((item) => item.includes("correction")).length, 0);
  assert.equal(correctionRecords[0].status, "published");
});

test("citation components expose meaningful server-rendered link semantics", () => {
  const cite = readFileSync(new URL("../src/components/citations/Cite.tsx", import.meta.url), "utf8");
  const references = readFileSync(
    new URL("../src/components/citations/References.tsx", import.meta.url),
    "utf8"
  );
  assert.match(cite, /role="doc-noteref"/);
  assert.match(cite, /aria-label=/);
  assert.match(cite, /href=/);
  assert.doesNotMatch(cite, /use client/);
  assert.match(references, /role="doc-endnotes"/);
  assert.match(references, /role="doc-backlink"/);
  assert.match(references, /<ol/);
});

test("canonical CallNYC manifest generates no duplicate DOM IDs", () => {
  const built = buildCitationSet(pageCitationManifests[0]);
  const ids = [
    ...built.occurrences.map((item) => item.anchorId),
    ...built.notes.map((item) => item.noteAnchorId)
  ];
  assert.equal(new Set(ids).size, ids.length);
});
