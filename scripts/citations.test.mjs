#!/usr/bin/env node

import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  allowedRelationships,
  loadCitationModel,
  resolveProjection,
  validIdPattern
} from "./lib/citation-model.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const model = loadCitationModel(repoRoot);
const tests = [];

function test(name, fn) {
  tests.push({ name, fn });
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function assertThrows(fn, message) {
  try {
    fn();
  } catch {
    return;
  }
  throw new Error(message);
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function projection(id) {
  const item = model.projections.find((record) => record.id === id);
  assert(item, `missing projection ${id}`);
  return item;
}

const callnyc = resolveProjection(projection("page.work.callnyc"), model);
const technical = resolveProjection(projection("page.work.technical-operations"), model);

test("page-local citation numbering resets by page", () => {
  assert(callnyc.references[0].number === 1, "CallNYC first reference should be 1");
  assert(technical.references[0].number === 1, "technical operations first reference should be 1");
});

test("repeated claim occurrences reuse the same reference numbers", () => {
  const first = callnyc.occurrences["callnyc-context-independent-follow-on"].citations.map(
    (item) => item.referenceNumber
  );
  const repeated = callnyc.occurrences["callnyc-role-independent-follow-on"].citations.map(
    (item) => item.referenceNumber
  );
  assert(JSON.stringify(first) === JSON.stringify(repeated), "independent claim should reuse refs");
});

test("one projected claim can render multiple adjacent citation markers", () => {
  const citations = callnyc.occurrences["callnyc-context-independent-follow-on"].citations;
  assert(citations.length === 2, "independent follow-on should have two adjacent citations");
});

test("private participant evidence remains summary-only", () => {
  const citation = callnyc.occurrences["callnyc-evidence-digital-district"].citations[0];
  const reference = callnyc.references.find((item) => item.number === citation.referenceNumber);
  assert(reference.treatment === "summary_only", "participant source must be summary-only");
  assert(reference.source.publiclyLinkable === false, "participant source must not be linked");
  assert(reference.source.accessStatus === "private", "participant source must be private");
});

test("rendered reference and citation DOM ids are unique per page", () => {
  for (const resolved of [callnyc, technical]) {
    const ids = new Set();
    for (const reference of resolved.references) {
      const refId = `reference-${reference.number}`;
      assert(!ids.has(refId), `duplicate ${refId}`);
      ids.add(refId);
      for (const backlink of reference.backlinks) {
        assert(!ids.has(backlink.anchorId), `duplicate ${backlink.anchorId}`);
        ids.add(backlink.anchorId);
      }
    }
  }
});

test("reused references accumulate backlinks", () => {
  const repeatedReference = callnyc.references.find(
    (item) => item.evidenceId === "evidence.callnyc.independent-follow-on.politico"
  );
  assert(repeatedReference.backlinks.length >= 4, "reused reference should have multiple backlinks");
});

test("origin source and preservation provider stay distinct", () => {
  const source = model.sources.find((item) => item.id === "source.civic-hall.x.693124020917522433");
  assert(source.originalUrl?.includes("x.com/CivicHall"), "original source should remain Civic Hall/X");
  assert(source.preservation?.captureUrl?.includes("web.archive.org"), "archive capture should be Wayback");
  assert(/not the author/i.test(source.preservation?.caution ?? ""), "Wayback caution is missing");
});

test("Civic Hall research-run counts match the reviewed run", () => {
  const run = model.researchRuns.find((item) => item.id === "research.civic-hall-wayback-cdx.2026-07");
  assert(run.counts.deduplicated_html_captures === 4630, "wrong html capture count");
  assert(run.counts.original_urls === 1240, "wrong original URL count");
  assert(run.counts.distinct_event_url_keys === 296, "wrong event URL key count");
  assert(run.counts.successful_event_pages === 215, "wrong successful event page count");
  assert(run.counts.redirect_event_urls === 74, "wrong redirect count");
  assert(run.counts.not_found_captures === 7, "wrong not-found count");
});

test("CallNYC project-year correction is resolved", () => {
  const correction = model.corrections.find(
    (item) => item.id === "correction.callnyc.project-year.2016"
  );
  assert(correction.surface === "/work/callnyc", "wrong correction surface");
  assert(correction.field === "years", "wrong correction field");
  assert(correction.correctedValue === "2016", "wrong corrected value");
  assert(correction.status === "resolved", "correction should be resolved");
});

test("sources carry both establishes and doesNotEstablish boundaries", () => {
  for (const source of model.sources) {
    assert(source.establishes.length > 0, `${source.id} missing establishes`);
    assert(source.doesNotEstablish.length > 0, `${source.id} missing doesNotEstablish`);
  }
});

test("protected or unapproved claims cannot resolve publicly", () => {
  const copy = clone(model);
  copy.claims.find((item) => item.id === "claim.callnyc.project.independent-follow-on").approval.status =
    "protected";
  assertThrows(
    () => resolveProjection(copy.projections.find((item) => item.id === "page.work.callnyc"), copy),
    "protected claim should fail public resolution"
  );
});

test("surface mismatches fail resolution", () => {
  const copy = clone(model);
  copy.projections.find((item) => item.id === "page.work.callnyc").surface = "homepage";
  assertThrows(
    () => resolveProjection(copy.projections.find((item) => item.id === "page.work.callnyc"), copy),
    "surface mismatch should fail resolution"
  );
});

test("unknown projected claims fail resolution", () => {
  const copy = clone(model);
  copy.projections.find((item) => item.id === "page.work.callnyc").occurrences.push({
    occurrenceId: "callnyc-unknown-claim",
    claimId: "claim.callnyc.missing"
  });
  assertThrows(
    () => resolveProjection(copy.projections.find((item) => item.id === "page.work.callnyc"), copy),
    "unknown claim should fail resolution"
  );
});

test("relationship types are constrained", () => {
  const badRelationship = "vibes";
  assert(!allowedRelationships.has(badRelationship), "bad relationship should not be allowed");
  for (const evidence of model.evidence) {
    assert(allowedRelationships.has(evidence.relationship), `${evidence.id} has bad relationship`);
  }
});

test("citation IDs and component roles are valid", () => {
  for (const collection of [
    model.sources,
    model.claims,
    model.evidence,
    model.researchRuns,
    model.assets,
    model.corrections,
    model.projections
  ]) {
    for (const record of collection) assert(validIdPattern.test(record.id), `bad id ${record.id}`);
  }

  const cite = readFileSync(
    path.join(repoRoot, "apps/www/src/components/citations/Cite.tsx"),
    "utf8"
  );
  const references = readFileSync(
    path.join(repoRoot, "apps/www/src/components/citations/References.tsx"),
    "utf8"
  );
  assert(cite.includes('role="doc-noteref"'), "doc-noteref role missing");
  assert(references.includes('role="doc-footnote"'), "doc-footnote role missing");
  assert(references.includes('role="doc-backlink"'), "doc-backlink role missing");
});

const failures = [];
for (const item of tests) {
  try {
    item.fn();
    console.log(`ok - ${item.name}`);
  } catch (error) {
    failures.push(`${item.name}: ${error.message}`);
    console.error(`not ok - ${item.name}`);
  }
}

if (tests.length !== 15) failures.push(`expected 15 tests, found ${tests.length}`);

if (failures.length) {
  console.error("Citation tests failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Citation tests passed: ${tests.length} checks.`);
