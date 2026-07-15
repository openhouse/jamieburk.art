import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import { proofClaims } from "../../apps/www/src/data/proofs.ts";
import { citationNoteId, getClaimProjection, publicCitationRegistry, resolveCitationOccurrence, resolveCitationReferences } from "../../apps/www/src/data/knowledge-bank/public.ts";
import { validateKnowledgeBank } from "../lib/citation-validation.mjs";

test("canonical registry passes deterministic validation", () => assert.deepEqual(validateKnowledgeBank(), []));

test("campaign press collections preserve every listed article and deduplicate shared sources", () => {
  const counts = Object.fromEntries(knowledgeBank.sourceCollections.map(({ id, itemSourceIds }) => [id, itemSourceIds.length]));
  assert.deepEqual(counts, {
    "COL-NYCA-LET-NYC-DANCE-PRESS": 21,
    "COL-NYCA-TALKS-NOT-RAIDS-PRESS": 7,
    "COL-NYCA-SAVE-NYC-SPACES-PRESS": 8,
    "COL-NYCA-FAIR-RENT-NYC-PRESS-2021": 9
  });
  const listed = knowledgeBank.sourceCollections.flatMap(({ itemSourceIds }) => itemSourceIds);
  assert.equal(listed.length, 45);
  assert.equal(new Set(listed).size, 44);
  assert.equal(listed.filter((id) => id === "SRC-NYCA-NPR-CABARET-CONTEXT-2017").length, 2);
  assert.ok(knowledgeBank.sourceCollections.every(({ completeness }) => completeness === "complete-as-listed"));
  assert.ok(listed.includes("SRC-PRESS-LND-SFGATE-NO-DANCING-2017"));
});

test("campaign-listed claim evidence requires a close read", () => {
  const listed = new Set(knowledgeBank.sourceCollections.flatMap(({ itemSourceIds }) => itemSourceIds));
  const sources = new Map(knowledgeBank.sources.map((source) => [source.id, source]));
  const used = knowledgeBank.claims.flatMap(({ evidence }) => evidence).filter(({ sourceId }) => listed.has(sourceId));
  assert.ok(used.length > 0);
  assert.ok(used.every(({ sourceId }) => sources.get(sourceId)?.reviewStatus === "close-read"));
});

test("the founding-member proof resolves through a canonical corrected claim", () => {
  const proof = proofClaims.find(({ id }) => id === "nyc-artist-coalition-public-web-infrastructure");
  const correction = knowledgeBank.corrections.find(({ id }) => id === "COR-NYCA-NPR-FOUNDING-MEMBER-2026");
  const claim = knowledgeBank.claims.find(({ id }) => id === proof?.canonicalClaimIds?.[0]);
  const evidence = claim?.evidence.find(({ sourceId }) => sourceId === "SRC-NYCA-NPR-CABARET-CONTEXT-2017");
  assert.deepEqual(proof?.canonicalClaimIds, ["CLM-NYCA-CABARET-REPEAL-ADVOCACY-2017"]);
  assert.ok(evidence?.supports.includes("Jamie as a founding member of NYC Artist Coalition"));
  assert.deepEqual(correction?.sourceIds, ["SRC-NYCA-NPR-CABARET-CONTEXT-2017"]);
  assert.deepEqual(correction?.approvedBy, ["Jamie Burkart"]);
});

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

test("Claim resolver returns only active approved projections", () => {
  assert.match(getClaimProjection("CLM-CALLNYC-FIRST-COUNCILSTAT-HACKATHON", "case-study", "/work/callnyc").text, /first CouncilStat hackathon/);
  assert.throws(() => getClaimProjection("CLM-CALLNYC-DIGITAL-DISTRICT", "photo-caption", "/work/callnyc"), /Unknown public claim/);
  assert.throws(() => getClaimProjection("CLM-CALLNYC-INDEPENDENT-FOLLOW-ON", "resume-html", "/work"), /not approved/);
});

test("corrections retire old wording from public surfaces", () => {
  const text = ["apps/www/src/content/work/callnyc.mdx", "apps/www/src/data/work.ts", "apps/www/src/data/proofs.ts", "apps/www/src/app/resume/page.tsx"].map((path) => readFileSync(path, "utf8")).join("\n");
  assert.doesNotMatch(text, /first civic-data hackathon|2014[-–]2015/i);
  assert.equal(knowledgeBank.corrections.length, 4);
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
});
