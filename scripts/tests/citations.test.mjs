import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import test from "node:test";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import { citationNoteId, getClaimProjection, publicCitationRegistry, resolveCitationOccurrence, resolveCitationReferences } from "../../apps/www/src/data/knowledge-bank/public.ts";
import { validateKnowledgeBank } from "../lib/citation-validation.mjs";
import {
  findNycaOverclaims,
  nycaResearchClaimText
} from "../lib/nyca-claim-guard.mjs";

test("canonical registry passes deterministic validation", () => assert.deepEqual(validateKnowledgeBank(), []));

test("page-local numbering follows first source appearance", () => {
  assert.deepEqual(resolveCitationOccurrence("callnyc", "event-date-time").sources.map((item) => item.number), [1, 2]);
  assert.deepEqual(resolveCitationOccurrence("callnyc", "first-councilstat-hackathon").sources.map((item) => item.number), [2]);
  assert.deepEqual(resolveCitationOccurrence("callnyc", "independent-follow-on").sources.map((item) => item.number), [3, 4]);
  assert.deepEqual(resolveCitationOccurrence("callnyc", "event-branding").sources.map((item) => item.number), [5]);
  assert.deepEqual(resolveCitationOccurrence("callnyc", "member-engagement").sources.map((item) => item.number), [6]);
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

test("every MDX Claim resolves through the generated public registry", () => {
  for (const filename of ["fair-rent-nyc.mdx", "kc-town-hall.mdx", "callnyc.mdx"]) {
    const source = readFileSync(`apps/www/src/content/work/${filename}`, "utf8");
    for (const match of source.matchAll(/<Claim\b([\s\S]*?)\/>/g)) {
      const attributes = Object.fromEntries(
        [...match[1].matchAll(/(claimId|projection|surface)="([^"]+)"/g)].map((item) => [item[1], item[2]])
      );
      assert.doesNotThrow(
        () => getClaimProjection(attributes.claimId, attributes.projection, attributes.surface),
        `${filename} must resolve ${attributes.claimId}`
      );
    }
  }
});

test("corrections retire old wording from public surfaces", () => {
  const publicText = ["apps/www/src/content/work/callnyc.mdx", "apps/www/src/content/work/kc-town-hall.mdx", "apps/www/src/data/work.ts", "apps/www/src/data/proofs.ts", "apps/www/src/app/resume/page.tsx"].map((path) => readFileSync(path, "utf8")).join("\n");
  assert.doesNotMatch(publicText, /first civic-data hackathon|2014[-–]2015/i);
  assert.doesNotMatch(publicText, /The project did not proceed\. It later withdrew/i);
  assert.match(publicText, /transitioned stewardship/i);

  const correctionIds = new Set(knowledgeBank.corrections.map(({ id }) => id));
  for (const id of [
    "COR-CALLNYC-CHRONOLOGY-2026",
    "COR-CALLNYC-SUPERLATIVE-2026",
    "COR-CALLNYC-EVENT-TIME-2026",
    "COR-KC-TOWN-HALL-STEWARDSHIP-2026"
  ]) {
    assert.ok(correctionIds.has(id), `Missing correction ${id}`);
  }
});

test("negative research preserves scope and limitations", () => {
  const inquiry = knowledgeBank.researchInquiries.find(
    (record) => record.id === "INQ-CALLNYC-CIVIC-HALL-PAGE-2026"
  );
  assert.ok(inquiry, "Missing Civic Hall negative-research inquiry");
  assert.equal(inquiry.resultStatus, "not-recovered");
  assert.ok(inquiry.limitations.some((item) => /not proof of nonexistence/i.test(item)));
  assert.doesNotMatch(inquiry.publicSummary, /did not exist/i);
});

test("member engagement remains account-level and institutionally bounded", () => {
  const claim = knowledgeBank.claims.find((item) => item.id === "CLM-CALLNYC-COUNCIL-MEMBER-ENGAGEMENT");
  assert.ok(claim);
  assert.match(claim.internalClaim, /11 posts.*10 sitting NYC Council members/i);
  assert.ok(claim.boundaries.some((item) => /account-level/i.test(item)));
  assert.ok(claim.antiClaims.some((item) => /endorsed CallNYC/i.test(item)));
});

test("NYC Artist Coalition social claims preserve recovery and authorship boundaries", () => {
  const byId = new Map(knowledgeBank.claims.map((claim) => [claim.id, claim]));
  const sharedIdentity = byId.get("CLM-NYCA-SHARED-SOCIAL-IDENTITY");
  const councilEngagement = byId.get("CLM-NYCA-COUNCIL-MEMBER-ACCOUNT-ENGAGEMENT");
  const populationRange = byId.get("CLM-NYCA-SHARED-PUBLISHING-SYSTEM-RANGE");

  assert.ok(sharedIdentity);
  assert.ok(councilEngagement);
  assert.ok(populationRange);

  const sharedProjection = sharedIdentity.projections.find((projection) => projection.status === "active");
  const councilProjection = councilEngagement.projections.find((projection) => projection.status === "active");
  assert.match(sharedProjection.text, /Teammates also published.*not attributed to Jamie/is);
  assert.match(councilProjection.text, /account-level evidence.*not formal endorsement.*personal authorship/is);
  assert.ok(populationRange.projections.every((projection) => projection.status !== "active" && projection.surfaces.length === 0));
  assert.ok(populationRange.boundaries.some((boundary) => /complete disposition is not complete item recovery/i.test(boundary)));

  const liveText = [sharedIdentity, councilEngagement, populationRange]
    .flatMap((claim) => [claim.internalClaim, ...claim.projections.filter((projection) => projection.status === "active").map((projection) => projection.text)])
    .join("\n");
  assert.deepEqual(findNycaOverclaims(liveText), []);
});

test("NYC Artist Coalition guard catches representative semantic regressions", () => {
  const overclaims = [
    "All 5,124 tweets were recovered.",
    "5,124/5,124 tweets recovered.",
    "100 percent of the posts were recovered.",
    "Jamie authored all 5,124 posts.",
    "Jamie selected every repost.",
    "Current profile counters prove reach.",
    "The New York City Council formally endorsed NYC Artist Coalition.",
    "Seven Council members formally endorsed the coalition.",
    "Jamie personally communicated with all seven Council members.",
    "The social corpus alone proves policy causality."
  ];

  for (const sample of overclaims) {
    assert.notDeepEqual(findNycaOverclaims(sample), [], `Expected guard to reject: ${sample}`);
  }
});

test("NYC Artist Coalition public research artifacts pass the semantic guard", () => {
  const text = [
    nycaResearchClaimText(
      readFileSync("docs/knowledge-bank/projects/nycartc-x-population-2026-07-14.md", "utf8")
    ),
    readFileSync("docs/knowledge-bank/data/nycartc-public-post-ledger.json", "utf8"),
    readFileSync("docs/knowledge-bank/data/nycartc-public-engagement-ledger.json", "utf8")
  ].join("\n");

  assert.deepEqual(findNycaOverclaims(text), []);
});

test("repo-local knowledge-bank sources use immutable existing commit refs", () => {
  const repoBlobPattern =
    /^https:\/\/github\.com\/openhouse\/jamieburk\.art\/blob\/([^/]+)\/([^#?]+)(?:[#?].*)?$/i;
  const repoSources = knowledgeBank.sources
    .map((source) => ({ source, match: source.canonicalUrl?.match(repoBlobPattern) }))
    .filter(({ match }) => Boolean(match));

  assert.ok(repoSources.length > 0);
  for (const { source, match } of repoSources) {
    const [, revision, sourcePath] = match;
    assert.match(revision, /^[0-9a-f]{40}$/i, `${source.id} must use a full commit SHA`);
    assert.doesNotThrow(
      () => execFileSync("git", ["cat-file", "-e", `${revision}:${decodeURIComponent(sourcePath)}`], { stdio: "ignore" }),
      `${source.id} must resolve to a file in the pinned commit`
    );
  }
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
