import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import { citationNoteId, getClaimProjection, publicCitationRegistry, resolveCitationOccurrence, resolveCitationReferences } from "../../apps/www/src/data/knowledge-bank/public.ts";
import { validateKnowledgeBank } from "../lib/citation-validation.mjs";

test("canonical registry passes deterministic validation", () => assert.deepEqual(validateKnowledgeBank(), []));

test("page-local numbering follows first source appearance", () => {
  assert.deepEqual(resolveCitationOccurrence("callnyc", "event-date-time").sources.map((item) => item.number), [1, 2]);
  assert.deepEqual(resolveCitationOccurrence("callnyc", "first-councilstat-hackathon").sources.map((item) => item.number), [2]);
  assert.deepEqual(resolveCitationOccurrence("callnyc", "independent-follow-on").sources.map((item) => item.number), [3, 4]);
  assert.deepEqual(resolveCitationOccurrence("callnyc", "event-branding").sources.map((item) => item.number), [5]);
});

test("repeated sources retain one note and unique backlinks", () => {
  const references = resolveCitationReferences("callnyc");
  const council = references.find((item) => item.number === 2);
  const politico = references.find((item) => item.number === 3);
  assert.equal(council.backlinks.length, 2);
  assert.equal(politico.backlinks.length, 3);
  assert.equal(new Set(politico.backlinks.map((item) => item.id)).size, 3);
  assert.equal(council.noteId, citationNoteId("callnyc", 2));
});

test("multi-source occurrences preserve editorial order", () => {
  assert.deepEqual(resolveCitationOccurrence("callnyc", "independent-follow-on").sources.map((item) => item.source.id), ["SRC-CALLNYC-POLITICO-2016-03-14", "SRC-CALLNYC-GITHUB-REPOSITORY"]);
});

test("KC Town Hall keeps the hiring-facing award, transition, and planning records distinct", () => {
  assert.deepEqual(
    resolveCitationOccurrence("kc-town-hall", "jamie-secured-cced-award").sources.map((item) => item.source.id),
    [
      "SRC-KC-TOWN-HALL-CCED-BOARD-MATERIALS-2019",
      "SRC-KC-TOWN-HALL-RESOLUTION-190649",
      "SRC-KC-TOWN-HALL-ORDINANCE-190642"
    ]
  );
  assert.deepEqual(
    resolveCitationOccurrence("kc-town-hall", "mission-aligned-transition").sources,
    []
  );
  assert.deepEqual(
    resolveCitationOccurrence("kc-town-hall", "jamie-planning-contribution").sources.map((item) => item.source.id),
    ["SRC-JAMIE-RESUME-KC-TOWN-HALL-2026"]
  );
  assert.deepEqual(
    resolveCitationOccurrence("kc-town-hall", "public-service-interface").sources.map((item) => item.source.id),
    [
      "SRC-X-KCTH-FULL-POPULATION-AUDIT-2026",
      "SRC-X-QUINTON-LUCAS-KCTH-RESPONSE-2019-04-29",
      "SRC-X-JOLIE-JUSTUS-KCTH-RESPONSE-2019-04-29",
      "SRC-KCMO-COUNCIL-ROSTER-2018",
      "SRC-KCMO-COUNCIL-BUSINESS-SESSION-TERMS"
    ]
  );
});

test("Claim resolver returns only active approved projections", () => {
  assert.match(getClaimProjection("CLM-CALLNYC-FIRST-COUNCILSTAT-HACKATHON", "case-study", "/work/callnyc").text, /first CouncilStat hackathon/);
  assert.match(getClaimProjection("CLM-NYCAC-X-RETRIEVABLE-SOCIAL-INFRASTRUCTURE", "case-study", "/work/fair-rent-nyc").text, /3,123 unique public records/);
  assert.throws(() => getClaimProjection("CLM-CALLNYC-DIGITAL-DISTRICT", "photo-caption", "/work/callnyc"), /Unknown public claim/);
  assert.throws(() => getClaimProjection("CLM-CALLNYC-INDEPENDENT-FOLLOW-ON", "resume-html", "/work"), /not approved/);
});

test("corrections retire old wording from public surfaces", () => {
  const text = ["apps/www/src/content/work/callnyc.mdx", "apps/www/src/data/work.ts", "apps/www/src/data/proofs.ts", "apps/www/src/app/resume/page.tsx"].map((path) => readFileSync(path, "utf8")).join("\n");
  assert.doesNotMatch(text, /first civic-data hackathon|2014[-–]2015/i);
  const correctionIds = new Set(knowledgeBank.corrections.map((correction) => correction.id));
  for (const id of [
    "COR-CALLNYC-CHRONOLOGY-2026",
    "COR-CALLNYC-SUPERLATIVE-2026",
    "COR-CALLNYC-EVENT-TIME-2026",
    "COR-NYCAC-CABARET-HEARING-DATE-2026",
    "COR-HJE-THICK-ARTS-CHRONOLOGY-2026"
  ]) {
    assert.ok(correctionIds.has(id), `missing governed correction ${id}`);
  }
  assert.ok(knowledgeBank.corrections.some((correction) =>
    correction.id === "COR-NYCAC-CABARET-HEARING-DATE-2026" &&
    correction.replacementText === "September 14, 2017"
  ));
  assert.ok(knowledgeBank.corrections.some((correction) =>
    correction.id === "COR-HJE-THICK-ARTS-CHRONOLOGY-2026" &&
    correction.replacementText.includes("2009 through 2015") &&
    correction.replacementText.includes("first client")
  ));
});

test("negative research preserves scope and limitations", () => {
  const inquiry = knowledgeBank.researchInquiries[0];
  assert.equal(inquiry.resultStatus, "not-recovered");
  assert.ok(inquiry.limitations.some((item) => /not proof of nonexistence/i.test(item)));
  assert.doesNotMatch(inquiry.publicSummary, /did not exist/i);
});

test("private and metadata-only evidence is absent from the public registry", () => {
  const serialized = JSON.stringify(publicCitationRegistry);
  assert.doesNotMatch(serialized, /PHOTO-CALLNYC-DIGITAL-DISTRICT-2016-001/);
  assert.doesNotMatch(serialized, /RESEARCH-CALLNYC-CIVIC-HALL-CDX-2026-001/);
  assert.ok(publicCitationRegistry.sources.every((source) => source.visibility === "public"));
});

test("rendering primitives preserve no-JavaScript document semantics", () => {
  const cite = readFileSync("apps/www/src/components/citations/Cite.tsx", "utf8");
  const references = readFileSync("apps/www/src/components/citations/References.tsx", "utf8");
  const sourceNote = readFileSync("apps/www/src/components/citations/SourceNote.tsx", "utf8");
  assert.match(cite, /role="doc-noteref"/);
  assert.match(references, /role="doc-endnotes"/);
  assert.match(references, /<ol>/);
  assert.match(sourceNote, /role="doc-backlink"/);
  assert.match(sourceNote, /Official document/);
});

test("the About page renders endnotes for its Open House and Knowledge Wiki Graph citations", () => {
  const aboutPage = readFileSync("apps/www/src/app/about/page.tsx", "utf8");
  assert.deepEqual(
    resolveCitationReferences("about").map((reference) => reference.source.id),
    [
      "SRC-OPEN-HOUSE-GOOD-TIMES-2006-06-28",
      "SRC-KNOWLEDGE-WIKI-RFC-0005-2026",
      "SRC-KNOWLEDGE-WIKI-RFC-0006-2026",
      "SRC-KNOWLEDGE-WIKI-RFC-0009-2026",
      "SRC-KNOWLEDGE-WIKI-RFC-0010-2026"
    ]
  );
  assert.match(aboutPage, /<References pageId="about" \/>/);
});
