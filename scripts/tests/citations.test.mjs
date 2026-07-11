import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import {
  citationAnchor,
  extractMdxCitations,
  loadKnowledge,
  referenceAnchor,
  repoRoot,
  resolveCitationPage,
  validateKnowledge
} from "../lib/citation-domain.mjs";

const clone = () => structuredClone(loadKnowledge());

test("first-appearance numbering starts at 1", () => {
  assert.deepEqual(resolveCitationPage("/work/callnyc").notes.map((note) => note.number), [1, 2, 3, 4, 5, 6]);
});

test("repeated citation-note ID reuses the same number", () => {
  const bundle = clone();
  bundle.pages[0].occurrences.push({
    noteId: "NOTE-CALL-EVENT-CONTEXT",
    occurrence: "call-event-context-2"
  });
  const note = resolveCitationPage("/work/callnyc", bundle).notes[0];
  assert.equal(note.number, 1);
  assert.equal(note.backlinks.length, 2);
});

test("numbering resets on a different page", () => {
  const bundle = clone();
  bundle.pages.push({
    ...structuredClone(bundle.pages[0]),
    id: "PAGE-CALL-SECONDARY",
    route: "/work/callnyc-secondary",
    slug: "callnyc-secondary",
    citationOrder: ["NOTE-CALL-POLITICO"],
    occurrences: [{ noteId: "NOTE-CALL-POLITICO", occurrence: "secondary-politico-1" }]
  });
  assert.equal(resolveCitationPage("/work/callnyc-secondary", bundle).notes[0].number, 1);
});

test("citation groups resolve several evidence relationships", () => {
  const note = resolveCitationPage("/work/callnyc").notes[0];
  assert.equal(note.relationships.length, 5);
  assert.equal(note.sources.length, 2);
});

test("one source participates in several evidence relationships", () => {
  const bundle = clone();
  assert.ok(
    bundle.evidence.filter((edge) => edge.sourceId === "SRC-CALL-CIVICHALL-ANNOUNCEMENT").length > 1
  );
});

test("duplicate IDs fail", () => {
  const bundle = clone();
  bundle.sources.push(structuredClone(bundle.sources[0]));
  assert.throws(() => validateKnowledge(bundle), /Duplicate source ID/);
});

test("unknown references fail", () => {
  const bundle = clone();
  bundle.evidence[0].sourceId = "SRC-UNKNOWN";
  assert.throws(() => validateKnowledge(bundle), /unknown source/);
});

test("approval-required source cannot enter a public note", () => {
  const bundle = clone();
  bundle.citationNotes[0].evidenceIds.push("EVID-CALL-DIGITAL-DISTRICT-PLACARD");
  assert.throws(() => validateKnowledge(bundle), /non-public evidence|approval-required source/);
});

test("protected source cannot expose locator or URL", () => {
  const resolved = JSON.stringify(resolveCitationPage("/work/callnyc"));
  assert.doesNotMatch(resolved, /photo-metadata|DIGITAL-DISTRICT-PHOTO|participant photograph metadata/i);
});

test("public-metadata-only record can exist without a public asset", () => {
  const bundle = clone();
  const source = bundle.sources.find((item) => item.id === "SRC-CALL-DIGITAL-DISTRICT-PHOTO");
  const artifact = bundle.artifacts.find((item) => item.id === "ART-CALL-DIGITAL-DISTRICT-PHOTO");
  assert.equal(source.links.length, 0);
  assert.equal(artifact.publicAssetUrl, undefined);
  assert.doesNotThrow(() => validateKnowledge(bundle));
});

test("representative artifact cannot directly support event identity", () => {
  const bundle = clone();
  bundle.artifacts[0].evidenceScope = "representative";
  bundle.artifacts[0].supportsAssertionIds = ["ASSERT-CALL-EVENT-DATE"];
  assert.throws(() => validateKnowledge(bundle), /representative media as direct event proof/);
});

test("not-recovered cannot become never existed", () => {
  const bundle = clone();
  bundle.researchRuns[0].finding = "A Civic Hall event page never existed.";
  assert.throws(() => validateKnowledge(bundle), /proof of nonexistence/);
});

test("correction records point to real assertions and sources", () => {
  const bundle = clone();
  assert.doesNotThrow(() => validateKnowledge(bundle));
  bundle.corrections[0].relatedAssertionIds = ["ASSERT-UNKNOWN"];
  assert.throws(() => validateKnowledge(bundle), /CORR-.*unknown assertion/i);
});

test("every occurrence anchor is unique", () => {
  const page = resolveCitationPage("/work/callnyc");
  const anchors = page.notes.flatMap((note) => note.backlinks.map((item) => item.citationId));
  assert.equal(new Set(anchors).size, anchors.length);
});

test("every reference target is unique", () => {
  const page = resolveCitationPage("/work/callnyc");
  assert.equal(new Set(page.notes.map((note) => note.referenceId)).size, page.notes.length);
});

test("every backlink resolves to a declared occurrence", () => {
  const bundle = clone();
  const page = resolveCitationPage("/work/callnyc", bundle);
  const expected = new Set(bundle.pages[0].occurrences.map((item) => citationAnchor(page, item.occurrence)));
  for (const backlink of page.notes.flatMap((note) => note.backlinks)) {
    assert.ok(expected.has(backlink.citationId));
  }
});

test("page manifest and MDX first appearance agree", () => {
  const bundle = clone();
  const mdx = readFileSync(path.join(repoRoot, "apps/www/src/content/work/callnyc.mdx"), "utf8");
  assert.deepEqual(extractMdxCitations(mdx), bundle.pages[0].occurrences);
});

test("CallNYC resolves to deterministic note numbers", () => {
  const first = resolveCitationPage("/work/callnyc");
  const second = resolveCitationPage("/work/callnyc");
  assert.deepEqual(
    first.notes.map((note) => [note.id, note.number]),
    second.notes.map((note) => [note.id, note.number])
  );
  assert.equal(first.notes[0].referenceId, referenceAnchor(first, 1));
});

test("rendered projection contains no private paths", () => {
  assert.doesNotMatch(JSON.stringify(resolveCitationPage("/work/callnyc")), /\/private\/tmp\/|\/Users\/|\/Volumes\/|\b[A-Za-z]:\\/);
});

test("rendering is server-only and semantically annotated", () => {
  const cite = readFileSync(path.join(repoRoot, "apps/www/src/components/citations/Cite.tsx"), "utf8");
  const references = readFileSync(
    path.join(repoRoot, "apps/www/src/components/citations/References.tsx"),
    "utf8"
  );
  assert.doesNotMatch(`${cite}${references}`, /"use client"/);
  assert.match(cite, /role="doc-noteref"/);
  assert.match(references, /role="doc-endnotes"/);
  assert.match(references, /role="doc-backlink"/);
});
