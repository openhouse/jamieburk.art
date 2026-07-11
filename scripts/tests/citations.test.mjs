import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
  knowledgeBundle,
  resolveCitationPage,
  validateKnowledgeBundle,
  validateProofLinks
} from "../../packages/knowledge-bank/src/index.ts";

const clone = () => structuredClone(knowledgeBundle);

test("1 first appearance assigns page numbers", () => {
  assert.deepEqual(resolveCitationPage("callnyc").references.map((item) => item.number), [1, 2, 3, 4]);
});

test("2 numbering resets on another page", () => {
  const bundle = clone();
  bundle.pagePlans.push({
    pageId: "second-page",
    route: "/work/callnyc",
    heading: "Sources",
    occurrences: [{ id: "second-follow-on", citationGroupId: "callnyc-independent-follow-on" }]
  });
  assert.equal(resolveCitationPage("second-page", validateKnowledgeBundle(bundle)).references[0].number, 1);
});

test("3 repeated group reuses its number", () => {
  const bundle = clone();
  bundle.pagePlans[0].occurrences.push({
    id: "callnyc-announced-schedule-repeat",
    citationGroupId: "callnyc-announced-schedule-and-purpose"
  });
  const page = resolveCitationPage("callnyc", validateKnowledgeBundle(bundle));
  assert.equal(page.occurrences.at(-1).number, 1);
});

test("4 repeated occurrences get unique backlinks", () => {
  const bundle = clone();
  bundle.pagePlans[0].occurrences.push({
    id: "callnyc-announced-schedule-repeat",
    citationGroupId: "callnyc-announced-schedule-and-purpose"
  });
  const reference = resolveCitationPage("callnyc", validateKnowledgeBundle(bundle)).references[0];
  assert.equal(reference.backlinks.length, 2);
  assert.equal(new Set(reference.backlinks.map((item) => item.anchorId)).size, 2);
});

test("5 one group can include several sources", () => {
  assert.equal(resolveCitationPage("callnyc").references[0].sources.length, 2);
});

test("6 one claim can have several evidence edges", () => {
  assert.equal(knowledgeBundle.evidence.filter((item) => item.claimId === "claim-callnyc-independent-follow-on").length, 2);
});

test("7 source ordering is deterministic", () => {
  assert.deepEqual(resolveCitationPage("callnyc").references[0].sources.map((item) => item.id), [
    "src-civichall-announcement-2016",
    "src-wayback-civichall-feed-2016"
  ]);
});

test("8 open claim cannot render", () => {
  const bundle = clone();
  bundle.claims.find((item) => item.id === "claim-callnyc-announced-schedule-purpose").status = "open";
  assert.throws(() => validateKnowledgeBundle(bundle), /contains open claim/i);
});

test("9 protected source cannot render", () => {
  const bundle = clone();
  bundle.sources.find((item) => item.id === "src-civichall-announcement-2016").visibility = "protected";
  assert.throws(() => validateKnowledgeBundle(bundle), /protected source/i);
});

test("10 hold citation group cannot render", () => {
  const bundle = clone();
  bundle.citationGroups[0].status = "hold";
  assert.throws(() => validateKnowledgeBundle(bundle), /references hold group/i);
});

test("11 allowed surfaces are enforced", () => {
  const bundle = clone();
  bundle.pagePlans[0].route = "/work/not-callnyc";
  assert.throws(() => validateKnowledgeBundle(bundle), /not allowed/i);
});

test("12 private paths are rejected", () => {
  const bundle = clone();
  bundle.sources[0].publicNote = "/Users/example/private-record";
  assert.throws(() => validateKnowledgeBundle(bundle), /private path/i);
});

test("13 signed URLs are rejected", () => {
  const bundle = clone();
  bundle.sources[0].links[0].url = "https://example.com/item?token=secret";
  assert.throws(() => validateKnowledgeBundle(bundle), /signed URL/i);
});

test("14 negative search cannot prove nonexistence", () => {
  const bundle = clone();
  bundle.researchRuns[0].result = "This proves no page existed.";
  assert.throws(() => validateKnowledgeBundle(bundle), /proof of nonexistence/i);
});

test("15 archival carrier must reject event-listing status", () => {
  const bundle = clone();
  const evidence = bundle.evidence.find((item) => item.id === "ev-callnyc-schedule-archive-carrier");
  evidence.limitations = ["Archive context only."];
  assert.throws(() => validateKnowledgeBundle(bundle), /event-listing status/i);
});

test("16 doesNotEstablish conflicts are rejected", () => {
  const bundle = clone();
  bundle.evidence[0].supportsText = "actual start or end time";
  assert.throws(() => validateKnowledgeBundle(bundle), /asks .* to establish/i);
});

test("17 correction records resolve stale values", () => {
  const values = knowledgeBundle.corrections.map((item) => [item.previousValue, item.correctedValue, item.status]);
  assert.deepEqual(values, [
    ["2014-2015", "2016", "resolved"],
    [
      "first civic-data hackathon",
      "an event-day New York City Council post described the gathering as its first CouncilStat hackathon",
      "resolved"
    ]
  ]);
});

test("18 unknown proof linkage fails", () => {
  assert.throws(() => validateProofLinks(knowledgeBundle, []), /Unknown professional proof links/i);
});

test("19 MDX contains no manual numbers", () => {
  const source = readFileSync(new URL("../../apps/www/src/content/work/callnyc.mdx", import.meta.url), "utf8");
  assert.doesNotMatch(source, /<Cite\b[^>]*\bnumber=/);
  assert.doesNotMatch(source, /\[\^[^\]]+\]/);
});

test("20 CallNYC fixture yields expected notes", () => {
  assert.deepEqual(resolveCitationPage("callnyc").references.map((item) => item.group.id), [
    "callnyc-announced-schedule-and-purpose",
    "callnyc-first-councilstat-hackathon",
    "callnyc-independent-follow-on",
    "callnyc-civic-hall-page-not-recovered"
  ]);
});

test("21 components include accessible roles and labels", () => {
  const cite = readFileSync(new URL("../../apps/www/src/components/citations/Cite.tsx", import.meta.url), "utf8");
  const refs = readFileSync(new URL("../../apps/www/src/components/citations/References.tsx", import.meta.url), "utf8");
  assert.match(cite, /role="doc-noteref"/);
  assert.match(refs, /role="doc-endnotes"/);
  assert.match(refs, /role="doc-backlink"/);
  assert.match(refs, /<ol>/);
});

test("22 multiple backlinks map to their occurrences", () => {
  const bundle = clone();
  bundle.pagePlans[0].occurrences.push({
    id: "callnyc-follow-on-repeat",
    citationGroupId: "callnyc-independent-follow-on"
  });
  const reference = resolveCitationPage("callnyc", validateKnowledgeBundle(bundle)).references[2];
  assert.deepEqual(reference.backlinks.map((item) => item.anchorId), [
    "cite-callnyc-callnyc-independent-follow-on-3",
    "cite-callnyc-callnyc-follow-on-repeat-3"
  ]);
});

test("23 generated IDs are unique", () => {
  const page = resolveCitationPage("callnyc");
  const ids = [...page.occurrences.map((item) => item.anchorId), ...page.references.map((item) => item.targetId)];
  assert.equal(new Set(ids).size, ids.length);
});

test("24 public resolution contains no Digital District record", () => {
  assert.doesNotMatch(JSON.stringify(resolveCitationPage("callnyc")), /Digital District/i);
});

test("25 renderer requires no client state", () => {
  const source = ["Cite.tsx", "References.tsx"]
    .map((name) => readFileSync(new URL(`../../apps/www/src/components/citations/${name}`, import.meta.url), "utf8"))
    .join("\n");
  assert.doesNotMatch(source, /"use client"|useState|useEffect|fetch\(/);
});
