import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  loadCitationData,
  validateCitationData
} from "../check-citations.mjs";
import {
  assertNoDuplicateDomIds,
  resolveCitationPage
} from "../../apps/www/src/data/knowledge-bank/resolve-citations.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

function clone(value) {
  return structuredClone(value);
}

function registry(data) {
  return {
    sourcesById: new Map(data.sources.map((record) => [record.id, record])),
    claimsById: new Map(data.claims.map((record) => [record.id, record])),
    evidenceById: new Map(data.evidence.map((record) => [record.id, record])),
    notesById: new Map(data.notes.map((record) => [record.id, record]))
  };
}

function failuresFor(data, options = {}) {
  return validateCitationData(data, {
    repoRoot,
    checkRepo: false,
    ...options
  }).failures;
}

test("canonical records use stable string IDs or routes", () => {
  const data = loadCitationData(repoRoot);
  for (const [collection, records] of Object.entries(data)) {
    for (const record of records) {
      if (collection === "pages") assert.match(record.route, /^\/[a-z0-9/-]+$/);
      else assert.match(record.id, /^[a-z][a-z0-9.-]+$/);
    }
  }
});

test("page-local numbering starts at one", () => {
  const data = loadCitationData(repoRoot);
  const page = resolveCitationPage(data.pages[0], registry(data));
  assert.equal(page.occurrences[0].number, 1);
});

test("a repeated note reuses its number", () => {
  const data = loadCitationData(repoRoot);
  const page = resolveCitationPage(data.pages[0], registry(data));
  const first = page.occurrenceById.get("announced-schedule");
  const repeated = page.occurrenceById.get("schedule-recap");
  assert.equal(first.number, repeated.number);
  assert.equal(page.references.filter((item) => item.note.id === first.note.id).length, 1);
});

test("repeated notes keep unique occurrence backlinks", () => {
  const data = loadCitationData(repoRoot);
  const page = resolveCitationPage(data.pages[0], registry(data));
  const reference = page.references.find((item) => item.note.id === "note.callnyc.date-time-purpose");
  assert.equal(reference.backlinks.length, 2);
  assert.equal(new Set(reference.backlinks.map((item) => item.citationId)).size, 2);
});

test("one citation number may resolve multiple public sources", () => {
  const data = loadCitationData(repoRoot);
  const page = resolveCitationPage(data.pages[0], registry(data));
  const reference = page.references.find((item) => item.note.id === "note.callnyc.date-time-purpose");
  assert.equal(reference.number, 1);
  assert.ok(reference.sources.length >= 2);
});

test("unknown note IDs fail closed", () => {
  const data = loadCitationData(repoRoot);
  const page = clone(data.pages[0]);
  page.occurrences[0].noteId = "note.unknown";
  assert.throws(() => resolveCitationPage(page, registry(data)), /Unknown citation note/);
});

test("protected evidence cannot be rendered publicly", () => {
  const data = loadCitationData(repoRoot);
  const note = data.notes.find((item) => item.id === "note.callnyc.digital-district-photo");
  note.status = "ready";
  const page = clone(data.pages[0]);
  page.occurrences = [{ id: "protected", noteId: note.id }];
  assert.throws(() => resolveCitationPage(page, registry(data)), /non-public claim|non-public evidence/);
});

test("open claims cannot appear in ready notes", () => {
  const data = loadCitationData(repoRoot);
  const claim = data.claims.find((item) => item.id === "claim.callnyc.research.no-event-page-recovered");
  const note = data.notes.find((item) => item.id === "note.callnyc.negative-archive-finding");
  note.status = "ready";
  const result = failuresFor(data);
  assert.ok(result.some((item) => item.includes(`Ready note ${note.id} uses non-defensible claim ${claim.id}`)));
});

test("claims cannot render on an undeclared surface", () => {
  const data = loadCitationData(repoRoot);
  const page = clone(data.pages[0]);
  page.route = "/work/not-callnyc";
  assert.throws(() => resolveCitationPage(page, registry(data)), /is not allowed on/);
});

test("negative research cannot be worded as proof of nonexistence", () => {
  const data = loadCitationData(repoRoot);
  data.researchRuns[0].interpretation = "This proves that no event page ever existed.";
  assert.ok(failuresFor(data).some((item) => item.includes("proof of nonexistence")));
});

test("archive carriers must reject event-listing status", () => {
  const data = loadCitationData(repoRoot);
  const relationship = data.evidence.find((item) => item.relation === "archival-carrier");
  relationship.limitations = ["An archived page can be incomplete."];
  assert.ok(failuresFor(data).some((item) => item.includes("does not reject event-listing status")));
});

test("does-not-support evidence cannot become positive public evidence", () => {
  const data = loadCitationData(repoRoot);
  const relationship = data.evidence[0];
  relationship.relation = "does-not-support";
  relationship.publicCitation = true;
  assert.ok(failuresFor(data).some((item) => item.includes("does-not-support as positive public evidence")));
});

test("CouncilStat wording preserves institutional attribution", () => {
  const data = loadCitationData(repoRoot);
  const claim = data.claims.find((item) => item.id === "claim.callnyc.hackathon.first-councilstat");
  claim.publicProjection = "This was the first CouncilStat hackathon.";
  assert.ok(failuresFor(data).some((item) => item.includes("drops attribution")));
});

test("unresolved corrections block production but not staging", () => {
  const data = loadCitationData(repoRoot);
  assert.ok(!failuresFor(data, { production: false }).some((item) => item.includes("Production blocked")));
  assert.ok(failuresFor(data, { production: true }).some((item) => item.includes("Production blocked")));
});

test("absolute private paths are rejected", () => {
  const data = loadCitationData(repoRoot);
  data.sources[0].publicNote = "/private/tmp/secret/source.html";
  assert.ok(failuresFor(data).some((item) => item.includes("absolute private filesystem path")));
});

test("participant photograph remains protected and unlinked", () => {
  const data = loadCitationData(repoRoot);
  const source = data.sources.find((item) => item.id === "source.callnyc.digital-district-photo");
  assert.equal(source.visibility, "protected");
  assert.deepEqual(source.links, []);
  assert.ok(!data.pages[0].occurrences.some((item) => item.noteId === "note.callnyc.digital-district-photo"));
});

test("citation components keep semantic roles and server rendering", () => {
  const cite = readFileSync(path.join(repoRoot, "apps/www/src/components/citations/Cite.tsx"), "utf8");
  const references = readFileSync(path.join(repoRoot, "apps/www/src/components/citations/References.tsx"), "utf8");
  assert.match(cite, /<sup/);
  assert.match(cite, /role="doc-noteref"/);
  assert.match(references, /role="doc-endnotes"/);
  assert.match(references, /role="doc-backlink"/);
  assert.doesNotMatch(cite + references, /^['"]use client['"]/m);
});

test("citation CSS preserves focus, return position, target, and print behavior", () => {
  const css = readFileSync(path.join(repoRoot, "apps/www/src/app/globals.css"), "utf8");
  assert.match(css, /\.citation-marker a\s*\{[^}]*scroll-margin-top:\s*8rem/s);
  assert.match(css, /\.citation-marker a:focus-visible[\s\S]*outline:\s*3px solid var\(--jb-yellow-ochre\)/);
  assert.match(css, /\.reference-note:target[\s\S]*background:/);
  assert.match(css, /@media print\s*\{[\s\S]*\.reference-backlinks\s*\{\s*display:\s*none/s);
  assert.match(css, /\.citation-references a\[href\^="http"\]::after/);
});

test("generated citation DOM IDs are unique", () => {
  const data = loadCitationData(repoRoot);
  const page = resolveCitationPage(data.pages[0], registry(data));
  assert.equal(assertNoDuplicateDomIds(page), true);
});

test("numbering resets independently for another page", () => {
  const data = loadCitationData(repoRoot);
  const secondPage = clone(data.pages[0]);
  secondPage.slug = "second-page";
  secondPage.route = "/work/callnyc";
  secondPage.occurrences = [secondPage.occurrences[2]];
  const resolved = resolveCitationPage(secondPage, registry(data));
  assert.equal(resolved.occurrences[0].number, 1);
});
