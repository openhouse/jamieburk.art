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
  assert.equal(politico.backlinks.length, 4);
  assert.equal(new Set(politico.backlinks.map((item) => item.id)).size, 4);
  assert.equal(council.noteId, citationNoteId("callnyc", 2));
});

test("multi-source occurrences preserve editorial order", () => {
  assert.deepEqual(resolveCitationOccurrence("callnyc", "independent-follow-on").sources.map((item) => item.source.id), ["SRC-CALLNYC-POLITICO-2016-03-14", "SRC-CALLNYC-GITHUB-REPOSITORY"]);
  assert.deepEqual(
    resolveCitationOccurrence("kc-town-hall", "municipal-process").sources.map(
      (item) => item.source.id
    ),
    [
      "SRC-KC-TOWN-HALL-CCED-PROPOSAL-2019",
      "SRC-KC-TOWN-HALL-COUNCIL-RESOLUTION-190649",
      "SRC-KC-TOWN-HALL-ORDINANCE-240317",
      "SRC-KC-TOWN-HALL-CCED-PROJECT-STATUS-2024-04-12"
    ]
  );
});

test("new case-study citations expose only selected public sources", () => {
  assert.equal(resolveCitationReferences("wowlist").length, 14);
  assert.equal(resolveCitationReferences("196-sunday-dinner").length, 1);
  assert.equal(resolveCitationReferences("fair-rent-nyc").length, 8);
  assert.equal(resolveCitationReferences("kc-town-hall").length, 12);
  assert.deepEqual(
    resolveCitationOccurrence("kc-town-hall", "phase-one-completion").sources.map(
      (item) => item.source.id
    ),
    ["SRC-KC-TOWN-HALL-CCED-PROPOSAL-2019"]
  );
  assert.deepEqual(
    resolveCitationOccurrence("kc-town-hall", "neighborhood-survey").sources.map(
      (item) => item.source.id
    ),
    ["SRC-KC-TOWN-HALL-CCED-PROPOSAL-2019"]
  );
  assert.deepEqual(
    resolveCitationOccurrence("kc-town-hall", "social-public-operations").sources.map(
      (item) => item.source.id
    ),
    [
      "SRC-KCTH-X-CORPUS-2026-07-15",
      "SRC-KCTH-KCMO-COUNCIL-ROSTER-2019",
      "SRC-KCTH-KCMO-ROBINSON-SERVICE-2020",
      "SRC-KCTH-ROBINSON-REPLY-2020",
      "SRC-KCTH-JUSTUS-REPLY-2019",
      "SRC-KCTH-LUCAS-QUOTE-2019",
      "SRC-KCTH-KCMO311-REPLY-2018",
      "SRC-KCTH-BRIDGING-GAP-DROPOFF-2019"
    ]
  );
  assert.deepEqual(
    resolveCitationOccurrence("wowlist", "archive-scale").sources.map(
      (item) => item.source.id
    ),
    ["SRC-WOWLIST-DATABASE-AGGREGATES-2017"]
  );
  assert.deepEqual(
    resolveCitationOccurrence("wowlist", "technical-contribution").sources.map(
      (item) => item.source.id
    ),
    ["SRC-WOWLIST-TECHNICAL-ARCHIVE-2026"]
  );
  assert.deepEqual(
    resolveCitationOccurrence("wowlist", "product-support-loop").sources.map(
      (item) => item.source.id
    ),
    [
      "SRC-WOWLIST-LOCATION-SUPPORT-2015",
      "SRC-WOWLIST-LISTS-SUPPORT-2015",
      "SRC-WOWLIST-EVENT-SUPPORT-2015",
      "SRC-WOWLIST-MEMBER-TUTORIAL-2015"
    ]
  );
  assert.deepEqual(
    resolveCitationOccurrence("wowlist", "civic-care-use").sources.map(
      (item) => item.source.id
    ),
    [
      "SRC-WOWLIST-X-CORPUS-2026-07-15",
      "SRC-WOWLIST-POPULAR-VOTE-2016",
      "SRC-WOWLIST-KQED-GHOST-SHIP-VIGIL-2016"
    ]
  );
  assert.ok(
    resolveCitationReferences("wowlist").every(
      (item) => item.source.id !== "SRC-WOWLIST-GOOD-TIMES-ZINES-2-2015"
    ),
    "Field context should remain in the bank instead of the hiring-facing page"
  );
  assert.deepEqual(
    resolveCitationOccurrence("callnyc", "social-public-feedback-loop").sources.map(
      (item) => item.source.id
    ),
    [
      "SRC-SOCIAL-ARCHIVE-INVENTORY-2026",
      "SRC-NYC-COUNCIL-STATED-MEETING-2016-09-28",
      "SRC-CALLNYC-X-CORPUS-2026-07-14"
    ]
  );
  assert.deepEqual(
    resolveCitationOccurrence("callnyc", "product-iteration").sources.map(
      (item) => item.source.id
    ),
    ["SRC-CALLNYC-POLITICO-2016-03-14", "SRC-CALLNYC-X-API-2016"]
  );
  assert.deepEqual(
    resolveCitationOccurrence("fair-rent-nyc", "social-identity-system").sources.map(
      (item) => item.source.id
    ),
    [
      "SRC-JAMIE-SOCIAL-ACCOUNT-ESTABLISHMENT-2026",
      "SRC-NYCAC-X-PROFILE-2026",
      "SRC-NYCAC-OLYMPIA-RELIEF-2020",
      "SRC-NYCAC-OLYMPIA-FAIR-RENT-2021",
      "SRC-NYCAC-OLYMPIA-NIGHTLIFE-2022"
    ]
  );
});

test("Claim resolver returns only active approved projections", () => {
  assert.match(getClaimProjection("CLM-CALLNYC-FIRST-COUNCILSTAT-HACKATHON", "case-study", "/work/callnyc").text, /first CouncilStat hackathon/);
  assert.match(
    getClaimProjection(
      "CLM-COMMERCIAL-VACANCY-PILOT-BRIEF-2026",
      "technical-operations",
      "/work/technical-operations"
    ).text,
    /smallest publishable pilot/
  );
  assert.match(
    getClaimProjection(
      "CLM-SUNDAY-DINNER-RESIDENCY-OPERATING-RECORDS",
      "case-study",
      "/work/196-sunday-dinner"
    ).text,
    /345 numbered Sunday Dinner events/
  );
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
  assert.doesNotMatch(serialized, /ARCHIVE-COMMERCIAL-VACANCY-PUBLIC-BASELINE-BRIEF-2026/);
  assert.doesNotMatch(serialized, /ARCHIVE-SUNDAY-DINNER-OPERATIONS-LEDGER-2012-2021/);
  assert.ok(publicCitationRegistry.sources.every((source) => source.visibility === "public"));
});

test("rendering primitives preserve no-JavaScript document semantics", () => {
  const cite = readFileSync("apps/www/src/components/citations/Cite.tsx", "utf8");
  const references = readFileSync("apps/www/src/components/citations/References.tsx", "utf8");
  const sourceNote = readFileSync("apps/www/src/components/citations/SourceNote.tsx", "utf8");
  const caseStudyLayout = readFileSync(
    "apps/www/src/components/CaseStudyLayout.tsx",
    "utf8"
  );
  assert.match(cite, /role="doc-noteref"/);
  assert.match(references, /role="doc-endnotes"/);
  assert.match(references, /<ol>/);
  assert.match(sourceNote, /role="doc-backlink"/);
  assert.ok(
    caseStudyLayout.indexOf("<EvidenceAndLimits") <
      caseStudyLayout.indexOf("<References"),
    "case-study endnotes must follow evidence and limits"
  );
});
