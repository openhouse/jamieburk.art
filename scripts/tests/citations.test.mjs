import assert from "node:assert/strict";
import { createHash } from "node:crypto";
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

test("FairRentNYC citation plan follows authored claim order without widening evidence", () => {
  const page = knowledgeBank.pages.find((item) => item.id === "fair-rent-nyc");
  const mdx = readFileSync("apps/www/src/content/work/fair-rent-nyc.mdx", "utf8");
  const authoredClaims = [...mdx.matchAll(/<Claim\b([\s\S]*?)\/>/g)].map((match) => {
    const attributes = Object.fromEntries([...match[1].matchAll(/(\w+)="([^"]+)"/g)].map((attribute) => [attribute[1], attribute[2]]));
    const occurrence = attributes.occurrenceId
      ? page.occurrences.find((item) => item.id === attributes.occurrenceId)
      : page.occurrences.find((item) => item.claimId === attributes.claimId);
    assert.ok(occurrence, `Missing page plan for ${attributes.claimId}`);
    assert.equal(occurrence.claimId, attributes.claimId);
    assert.equal(occurrence.projection, attributes.projection);
    assert.equal(page.surface, attributes.surface);
    getClaimProjection(attributes.claimId, attributes.projection, attributes.surface);
    return occurrence;
  });
  assert.deepEqual(authoredClaims.map((item) => item.id), page.occurrences.map((item) => item.id));
  const firstSources = [...new Set(authoredClaims.flatMap((item) =>
    resolveCitationOccurrence(page.id, item.id).sources.map((source) => source.source.id)
  ))];
  assert.deepEqual(firstSources, page.sourceOrder);
  assert.deepEqual(firstSources, resolveCitationReferences(page.id).map((item) => item.source.id));
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

test("the About page renders ordered endnotes for its lineage and documented participation systems", () => {
  const aboutPage = readFileSync("apps/www/src/app/about/page.tsx", "utf8");
  assert.deepEqual(
    resolveCitationReferences("about").map((reference) => reference.source.id),
    [
      "SRC-OPEN-HOUSE-GOOD-TIMES-2006-06-28",
      "SRC-WOWLIST-PRODUCT-SUPPORT-POST-2016",
      "SRC-WOWLIST-X-POPULATION-MANIFEST",
      "SRC-WOWLIST-SHELBY-TUTORIAL-2015",
      "SRC-WOWLIST-SBDIY-ADOPTION",
      "SRC-CALLSCRIPT-FACEBOOK-PAGE",
      "SRC-CALLSCRIPT-DCLA-EVENT-DISCUSSION-2017-01-27",
      "SRC-FB-JAMIE-DCLA-DIY-SPACES-EVENT-2017-01-25",
      "SRC-PARTICIPATION-CONTINUITY-CONTROLS-2026",
      "SRC-WAYBACK-KCTH-TIRED-OF-TIRES-2020-10-30",
      "SRC-URBANHERM-X-JIMMY-TIRES-2022",
      "SRC-URBANHERM-X-KCTH-TIRES-2019",
      "SRC-KNOWLEDGE-WIKI-RFC-0005-2026",
      "SRC-KNOWLEDGE-WIKI-RFC-0006-2026"
    ]
  );
  assert.match(aboutPage, /<References pageId="about" \/>/);
  for (const occurrence of ["wowlist-product-model", "wowlist-organizer-support", "coalition-participation-path", "resident-service-path"]) {
    assert.ok(aboutPage.includes(`occurrenceId="${occurrence}"`), occurrence);
  }
});

// Approval is scoped to this wording and destination. These exercise the same
// projection and source resolution used by Claim and References on the page.
test("audio and print case resolves the approved three paragraphs in their approved order", () => {
  const page = knowledgeBank.pages.find((item) => item.id === "technical-operations");
  assert.ok(page, "The approved technical-operations citation page must exist");
  const audioOccurrences = page.occurrences.filter((item) => item.claimId.startsWith("CLM-AUDIO-PRINT-"));
  assert.deepEqual(audioOccurrences.map((item) => item.id), ["audio-editions", "print-production", "shared-credit"]);
  const text = audioOccurrences.map((item) =>
    resolveCitationOccurrence(page.id, item.id).projection.text
  ).join("\n\n");
  // Independently bound to the exact three paragraphs Jamie approved, not
  // calculated from canonical records by the test or an implementation helper.
  // Normalization: paragraphs joined by two LFs, with no final LF.
  assert.equal(createHash("sha256").update(text).digest("hex"), "ca8d03976eb32fc58f7cb3e451c47f716d17a5880b79265bc266a10d70b488da");
});

test("audio and print approval cannot widen to another surface or a photo caption", () => {
  const claimId = "CLM-AUDIO-PRINT-PHYSICAL-USE-2026";
  assert.ok(publicCitationRegistry.claims.some((item) => item.id === claimId), "The approved text claim must be published through the registry");
  assert.throws(() => getClaimProjection(claimId, "case-study", "/about"), /not approved/);
  assert.throws(() => getClaimProjection(claimId, "photo-caption", "/work/technical-operations"), /Missing photo-caption/);
});

test("audio and print citations disclose a first-person account without source links or independent-audit claims", () => {
  const notes = resolveCitationReferences("technical-operations").filter(({ source }) => source.id === "SRC-AUDIO-PRINT-APPROVED-ACCOUNT-2026");
  assert.equal(notes.length, 1, "All three paragraphs cite one approved first-person summary");
  const { source, backlinks } = notes[0];
  assert.equal(backlinks.length, 3);
  assert.equal(source.author, "Jamie Burkart");
  assert.equal(source.canonicalUrl, undefined);
  assert.equal(source.archiveUrl, undefined);
  assert.equal(source.assetUrl, undefined);
  assert.match(source.publicNote, /first-person account/i);
  assert.match(source.publicNote, /retrospectively confirmed by Jamie/i);
  assert.ok(source.doesNotEstablish.includes("an independent physical-use audit"));
  assert.ok(source.doesNotEstablish.includes("permission to publish names or photographs"));
  assert.doesNotMatch(JSON.stringify(notes), /protectedLocatorId|file:\/\/|\/Users\/|\.photoslibrary|\.pdf|\.jpg|\.png/i);
});

test("audio and print agency separates Jamie's production contribution from the artist's project leadership", () => {
  const relations = knowledgeBank.agencyRelations.filter((item) => item.project === "audio-print-production");
  assert.equal(relations.length, 2, "Both contribution and shared project credit must be represented");
  const contribution = relations.find((item) => item.creditScope === "individual");
  const shared = relations.find((item) => item.creditScope === "shared");
  assert.deepEqual(contribution?.actorIds, ["ENT-JAMIE-BURKART"]);
  assert.deepEqual(shared?.actorIds, ["ENT-JAMIE-BURKART", "ENT-PORTRAIT-EXHIBITION-ARTIST"]);
  assert.match(shared.result, /artist led/i);
  assert.ok(contribution.boundaries.some((item) => /not.*who attached/i.test(item)));
  assert.ok(shared.boundaries.some((item) => /not.*sole authorship/i.test(item)));
  for (const relation of relations) {
    assert.ok(relation.sourceSupportKeys.length > 0);
    for (const key of relation.sourceSupportKeys) {
      assert.ok(relation.sourceIds.some((id) => knowledgeBank.sources.find((source) => source.id === id)?.supportsGenerally.includes(key)));
    }
  }
});

test("Jamie's first-person case does not count as independent collaborator corroboration", async () => {
  const { evaluateKnowledgeBank, loadKnowledgeEvalSuite } = await import("../lib/knowledge-evals.mjs");
  const result = evaluateKnowledgeBank(loadKnowledgeEvalSuite());
  const corroboration = result.contentApprovals.blindSpotControls;
  assert.equal(corroboration.actualCollaboratorNoteCount, 0);
  assert.equal(corroboration.checks.humanCorroborationControlComplete, true);
});

test("current practice cases resolve as distinct cited paragraphs only at their approved destination", () => {
  for (const [occurrence, claimId] of [
    ["written-participation", "CLM-WRITTEN-PARTICIPATION-2026"],
    ["editorial-animation", "CLM-EDITORIAL-ANIMATION-2026"]
  ]) {
    const resolved = resolveCitationOccurrence("technical-operations", occurrence);
    const canonical = knowledgeBank.claims.find(({ id }) => id === claimId);
    assert.equal(resolved.claim.id, claimId);
    assert.equal(resolved.projection.text, canonical.projections.find(({ key }) => key === "case-study").text);
    assert.equal(resolved.sources.length, 1);
    assert.equal(resolved.sources[0].source.author, "Jamie Burkart");
    assert.equal(resolved.sources[0].source.canonicalUrl, undefined);
    assert.throws(() => getClaimProjection(claimId, "case-study", "/about"), /not approved/);
    assert.throws(() => getClaimProjection(claimId, "photo-caption", "/work/technical-operations"), /Missing photo-caption/);
  }
  const references = resolveCitationReferences("technical-operations");
  assert.deepEqual(references.map(({ source }) => source.id), [
    "SRC-AUDIO-PRINT-APPROVED-ACCOUNT-2026",
    "SRC-WRITTEN-PARTICIPATION-APPROVED-ACCOUNT-2026",
    "SRC-EDITORIAL-ANIMATION-APPROVED-ACCOUNT-2026"
  ]);
  assert.deepEqual(references.map(({ backlinks }) => backlinks.length), [3, 1, 1]);
});
