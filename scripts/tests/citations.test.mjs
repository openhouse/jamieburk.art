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
  assert.deepEqual(resolveCitationOccurrence("callnyc", "product-iteration").sources.map((item) => item.number), [3, 6]);
  assert.deepEqual(resolveCitationOccurrence("callnyc", "social-translation-system").sources.map((item) => item.number), [7]);
});

test("repeated sources retain one note and unique backlinks", () => {
  const references = resolveCitationReferences("callnyc");
  const council = references.find((item) => item.number === 2);
  const politico = references.find((item) => item.number === 3);
  assert.equal(council.backlinks.length, 2);
  assert.equal(politico.backlinks.length, 4);
  assert.equal(new Set(politico.backlinks.map((item) => item.id)).size, 4);
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
  assert.equal(knowledgeBank.corrections.length, 3);
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

test("every citation plan is connected to its route and rendered occurrences", () => {
  const routeSourceOverrides = new Map([
    ["/about", "apps/www/src/app/about/page.tsx"]
  ]);
  for (const page of knowledgeBank.pages) {
    assert.equal(page.id, page.surface.split("/").at(-1));
    const sourcePath = routeSourceOverrides.get(page.surface) ??
      `apps/www/src/content${page.surface}.mdx`;
    const routeSource = readFileSync(sourcePath, "utf8");
    for (const occurrence of page.occurrences) {
      assert.match(
        routeSource,
        new RegExp(`occurrenceId=["']${occurrence.id}["']`)
      );
    }
    assert.ok(resolveCitationReferences(page.id).length > 0);
  }
});

test("the About throughline resolves only its public source", () => {
  const occurrence = resolveCitationOccurrence(
    "about",
    "participatory-social-systems-throughline"
  );
  assert.deepEqual(
    occurrence.sources.map(({ source }) => source.id),
    ["SRC-PARTICIPATION-GOODTIMES-OPEN-HOUSE-2006"]
  );
});

test("rendered citations do not stand in for protected direct support", () => {
  for (const page of knowledgeBank.pages) {
    for (const occurrence of page.occurrences) {
      const claim = knowledgeBank.claims.find((item) => item.id === occurrence.claimId);
      const hasNonrenderedDirectSupport = claim.evidence.some((item) => !item.renderCitation && ["direct-support", "private-support"].includes(item.relationship));
      if (!hasNonrenderedDirectSupport) continue;
      assert.ok(claim.evidence.some((item) => item.renderCitation && item.relationship === "direct-support" && occurrence.sourceIds?.includes(item.sourceId)));
    }
  }
});
