#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  assets,
  citationNotes,
  claims,
  pageProjections,
  sources
} from "../apps/www/src/data/knowledge-bank/index.ts";
import {
  getPublicSourceLinks,
  resolveCitationPage
} from "../apps/www/src/lib/citations.ts";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const tests = [];

function test(name, callback) {
  tests.push({ name, callback });
}

test("numbering follows first appearance", () => {
  const page = resolveCitationPage("callnyc");
  assert.deepEqual(
    page.notes.slice(0, 3).map((note) => [note.note.id, note.number]),
    [
      ["callnyc-event", 1],
      ["callnyc-project-and-iteration", 2],
      ["callnyc-branding-and-councilstat", 3]
    ]
  );
});

test("repeated note IDs reuse their number", () => {
  const page = resolveCitationPage("callnyc");
  const eventNumbers = page.occurrences
    .filter((occurrence) => occurrence.noteId === "callnyc-event")
    .map((occurrence) => occurrence.number);
  assert.deepEqual([...new Set(eventNumbers)], [1]);
});

test("notes resolve once per page", () => {
  const page = resolveCitationPage("callnyc");
  assert.equal(page.notes.length, new Set(page.notes.map((item) => item.note.id)).size);
});

test("reference anchors are unique", () => {
  const page = resolveCitationPage("callnyc");
  assert.equal(
    page.occurrences.length,
    new Set(page.occurrences.map((item) => item.referenceAnchor)).size
  );
});

test("backlinks target resolved references", () => {
  const page = resolveCitationPage("callnyc");
  const referenceAnchors = new Set(page.occurrences.map((item) => item.referenceAnchor));
  assert.ok(page.notes.every((note) => note.occurrences.every((item) => referenceAnchors.has(item.referenceAnchor))));
});

test("unknown pages fail resolution", () => {
  assert.throws(() => resolveCitationPage("unknown-page"), /Unknown citation page/);
});

test("unknown occurrence IDs fail resolution through page data", () => {
  const page = resolveCitationPage("callnyc");
  assert.equal(page.occurrences.find((item) => item.id === "unknown"), undefined);
});

test("private sources expose no external links", () => {
  const source = sources.find((item) => item.id === "participant-archive-digital-district-2016");
  assert.ok(source);
  assert.deepEqual(getPublicSourceLinks(source), []);
});

test("canonical and archive URLs receive distinct labels", () => {
  const fixture = {
    ...sources[0],
    archiveUrl: "https://web.archive.org/example"
  };
  const links = getPublicSourceLinks(fixture);
  assert.deepEqual(links.map((link) => link.label), ["Original source", "Archived capture"]);
});

test("archive-only sources label the primary link as an archive", () => {
  const source = sources.find((item) => item.id === "civic-hall-embedded-feed-wayback-2016-01-31");
  assert.ok(source);
  assert.deepEqual(getPublicSourceLinks(source).map((link) => link.label), ["Archived capture", "Original source"]);
});

test("citation labels include useful context", () => {
  assert.ok(
    pageProjections.every((page) =>
      page.occurrences.every((item) => item.accessibleLabel.toLowerCase() !== "citation")
    )
  );
});

test("CallNYC year is 2016", () => {
  const work = readFileSync(path.join(repoRoot, "apps/www/src/data/work.ts"), "utf8");
  const block = work.slice(work.indexOf('title: "CallNYC.org"'), work.indexOf('title: "WOWList.org"'));
  assert.match(block, /years:\s*"2016"/);
  assert.doesNotMatch(block, /2014[\u2013-]2015/);
});

test("CallNYC anti-claims are present", () => {
  const antiClaims = claims.flatMap((claim) => claim.antiClaims).join(" ");
  for (const phrase of ["organized", "Digital District", "caused", "official Council product", "winning entry", "Melissa Mark-Viverito", "office quality", "measured improvements"]) {
    assert.match(antiClaims, new RegExp(phrase, "i"));
  }
});

test("public graph contains no local paths", () => {
  assert.doesNotMatch(JSON.stringify({ assets, citationNotes, claims, pageProjections, sources }), /\/private\/|\/tmp\/|\/Users\//);
});

test("protected assets are absent from public projections", () => {
  const protectedIds = new Set(assets.filter((item) => item.publicUseStatus === "protected").map((item) => item.id));
  assert.ok(pageProjections.every((page) => page.assetIds.every((id) => !protectedIds.has(id))));
});

test("page-local numbering resets", () => {
  assert.equal(resolveCitationPage("technical-operations").occurrences[0].number, 1);
});

test("the same governed claim is reused across surfaces", () => {
  const callnyc = resolveCitationPage("callnyc");
  const operations = resolveCitationPage("technical-operations");
  assert.ok(callnyc.occurrences.some((item) => item.claimId === "callnyc-product-method"));
  assert.ok(operations.occurrences.some((item) => item.claimId === "callnyc-product-method"));
});

test("note anchors are stable and page scoped", () => {
  assert.ok(resolveCitationPage("callnyc").notes.every((note) => note.noteAnchor.startsWith("cite-note-callnyc-")));
});

test("protected source records contain no URL", () => {
  assert.ok(
    sources
      .filter((source) => source.publicUseStatus === "protected")
      .every((source) => !source.canonicalUrl && !source.archiveUrl && !source.originalUrl)
  );
});

let failures = 0;
for (const { name, callback } of tests) {
  try {
    callback();
    console.log(`ok - ${name}`);
  } catch (error) {
    failures += 1;
    console.error(`not ok - ${name}`);
    console.error(error);
  }
}

if (failures) process.exit(1);
console.log(`${tests.length} citation tests passed.`);
