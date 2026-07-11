import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
  knowledgeBundle,
  resolveCitationPage,
  validateKnowledgeBundle
} from "../../apps/www/src/data/knowledge/index.ts";

function cloneBundle() {
  return structuredClone(knowledgeBundle);
}

test("assigns source numbers in first-appearance order", () => {
  const page = resolveCitationPage("/work/callnyc");
  assert.deepEqual(page.sources.map((source) => source.number), [1, 2, 3]);
});

test("repeated source reuses its number", () => {
  const bundle = cloneBundle();
  bundle.pages[0].occurrences.push({
    id: "announced-schedule-again",
    claimId: "callnyc-hackathon-announced-schedule"
  });
  const page = resolveCitationPage("/work/callnyc", validateKnowledgeBundle(bundle));
  assert.deepEqual(page.occurrences[0].sources.map((source) => source.number), [1, 2]);
  assert.deepEqual(page.occurrences[2].sources.map((source) => source.number), [1, 2]);
});

test("one claim can yield multiple source markers", () => {
  const page = resolveCitationPage("/work/callnyc");
  assert.equal(page.occurrences[0].sources.length, 2);
});

test("protected source cannot render", () => {
  const bundle = cloneBundle();
  const claim = bundle.claims.find((item) => item.id === "callnyc-digital-district-breakout");
  const evidence = bundle.evidence.find((item) => item.claimId === claim.id);
  claim.status = "defensible";
  evidence.publicCitation = true;
  evidence.citationNote = "Unsafe fixture";
  bundle.pages[0].occurrences = [{ id: "unsafe-photo", claimId: claim.id }];
  assert.throws(() => validateKnowledgeBundle(bundle), /protected source/i);
});

test("open claim cannot render", () => {
  const bundle = cloneBundle();
  bundle.pages[0].occurrences = [
    { id: "open-photo", claimId: "callnyc-digital-district-breakout" }
  ];
  assert.throws(() => validateKnowledgeBundle(bundle), /uses open claim/i);
});

test("allowed surfaces are enforced", () => {
  const bundle = cloneBundle();
  bundle.pages[0].route = "/work/not-callnyc";
  assert.throws(() => validateKnowledgeBundle(bundle), /does not allow citation/i);
});

test("source notes follow source-number order", () => {
  const page = resolveCitationPage("/work/callnyc");
  assert.deepEqual(
    page.sources.map((note) => note.source.id),
    [
      "src-civichall-x-693124020917522433",
      "src-wayback-civichall-events-page-2-20160131",
      "src-nyccouncil-x-693509031768506368"
    ]
  );
});

test("repeated source creates unique backlink IDs", () => {
  const bundle = cloneBundle();
  bundle.pages[0].occurrences.push({
    id: "announced-schedule-again",
    claimId: "callnyc-hackathon-announced-schedule"
  });
  const page = resolveCitationPage("/work/callnyc", validateKnowledgeBundle(bundle));
  assert.equal(page.sources[0].backlinks.length, 2);
  assert.equal(new Set(page.sources[0].backlinks.map((item) => item.id)).size, 2);
});

test("components include accessible citation roles and labels", () => {
  const referenceSource = readFileSync(
    new URL("../../apps/www/src/components/citations/CitationRef.tsx", import.meta.url),
    "utf8"
  );
  const notesSource = readFileSync(
    new URL("../../apps/www/src/components/citations/SourceNotes.tsx", import.meta.url),
    "utf8"
  );
  assert.match(referenceSource, /role="doc-noteref"/);
  assert.match(referenceSource, /aria-label=/);
  assert.match(notesSource, /role="doc-endnotes"/);
  assert.match(notesSource, /role="doc-backlink"/);
  assert.match(notesSource, /<ol/);
});

test("negative-search wording cannot claim proof of nonexistence", () => {
  const bundle = cloneBundle();
  bundle.evidence[0].supportType = "negative-search-result";
  bundle.evidence[0].supportsText = "proves no event page existed";
  assert.throws(() => validateKnowledgeBundle(bundle), /proof of nonexistence/i);
});

test("malformed source URLs are rejected", () => {
  const bundle = cloneBundle();
  bundle.sources[0].links[0].url = "not a URL";
  assert.throws(() => validateKnowledgeBundle(bundle));
});

test("CallNYC fixture produces the expected public source order", () => {
  const page = resolveCitationPage("/work/callnyc");
  assert.deepEqual(
    page.occurrences.map((occurrence) => occurrence.sources.map((source) => source.number)),
    [[1, 2], [3]]
  );
});
