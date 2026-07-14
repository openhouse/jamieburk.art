import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import {
  campaignPressDistinctSourceCount,
  campaignPressDistinctSourceIds,
  campaignPressIndexSourceIds,
  campaignPressPlacementCount,
  campaignPressSources,
  campaignPressSourceIds
} from "../../apps/www/src/data/knowledge-bank/campaignPress.ts";
import { citationNoteId, getClaimProjection, publicCitationRegistry, resolveCitationOccurrence, resolveCitationReferences } from "../../apps/www/src/data/knowledge-bank/public.ts";
import { intakeItemSchema } from "../../apps/www/src/data/knowledge-bank/schema.ts";
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

test("intake remains non-projectable and absent from the public registry", () => {
  assert.ok(knowledgeBank.intakeItems.length > 0);
  assert.ok(knowledgeBank.intakeItems.every((item) => item.projectionStatus === "no-public-projection"));
  const serialized = JSON.stringify(publicCitationRegistry);
  for (const item of knowledgeBank.intakeItems) assert.doesNotMatch(serialized, new RegExp(item.id));
});

test("intake maturity states require their supporting structure", () => {
  const base = {
    id: "INTAKE-TEST",
    title: "Test intake",
    kind: "memory-fragment",
    summary: "A public-safe test fragment.",
    sourceIds: [],
    relatedClaimIds: [],
    candidateClaims: [],
    researchQuestions: [],
    boundaries: ["Do not project directly."],
    projectionStatus: "no-public-projection",
    receivedAt: "2026-07-12",
    reviewedAt: "2026-07-12",
    reviewedBy: []
  };

  assert.equal(intakeItemSchema.safeParse({ ...base, status: "captured" }).success, true);
  assert.equal(intakeItemSchema.safeParse({ ...base, status: "source-associated" }).success, false);
  assert.equal(intakeItemSchema.safeParse({ ...base, status: "claim-candidate" }).success, false);
  assert.equal(intakeItemSchema.safeParse({ ...base, status: "integrated" }).success, false);
});

test("new source leads preserve claim boundaries", () => {
  const sourceById = new Map(knowledgeBank.sources.map((source) => [source.id, source]));
  assert.ok(sourceById.get("SRC-WATERWAYS-PITCH-HUCK-FINN-2007").doesNotEstablish.some((item) => /Gulf of Mexico/i.test(item)));
  assert.ok(sourceById.get("SRC-NYCA-GOTHAMIST-CABARET-REPEAL-2017-06-19").doesNotEstablish.some((item) => /alone repealed/i.test(item)));
  assert.ok(sourceById.get("SRC-NYCA-NPR-CABARET-REPEAL-2017-09-20").doesNotEstablish.some((item) => /Jamie's role/i.test(item)));
});

test("campaign press census preserves every placement and its limits", () => {
  assert.deepEqual(
    Object.fromEntries(
      Object.entries(campaignPressSourceIds).map(([campaign, sourceIds]) => [
        campaign,
        sourceIds.length
      ])
    ),
    {
      "let-nyc-dance": 21,
      "talks-not-raids": 7,
      "save-nyc-spaces": 8,
      "fair-rent-nyc": 10
    }
  );
  assert.equal(campaignPressPlacementCount, 46);
  assert.equal(campaignPressDistinctSourceCount, 45);
  assert.equal(new Set(campaignPressDistinctSourceIds).size, 45);
  assert.equal(campaignPressIndexSourceIds.length, 5);
  assert.equal(campaignPressSources.length, 48);

  const sourceById = new Map(
    knowledgeBank.sources.map((source) => [source.id, source])
  );
  for (const sourceId of [
    ...campaignPressIndexSourceIds,
    ...campaignPressDistinctSourceIds
  ]) {
    assert.ok(sourceById.has(sourceId), `missing campaign press source ${sourceId}`);
  }

  const intake = knowledgeBank.intakeItems.find(
    (item) => item.id === "INTAKE-NYCA-CAMPAIGN-PRESS-CORPUS-2026-07-13"
  );
  assert.ok(intake);
  assert.equal(intake.projectionStatus, "no-public-projection");
  assert.equal(intake.sourceIds.length, 50);
  assert.ok(
    campaignPressSources.every((source) =>
      source.doesNotEstablish.some((boundary) =>
        /endorsement|causality|causal|authorship/i.test(boundary)
      )
    )
  );
  assert.equal(
    sourceById.get("SRC-SFGATE-CABARET-LAW-2017").preservationStatus,
    "dead"
  );
  assert.match(
    sourceById.get("SRC-SFGATE-CABARET-LAW-2017").publicNote,
    /no Wayback capture was recovered/i
  );
  assert.match(
    sourceById.get("SRC-NYT-SMALL-BUSINESS-RENTS-2023-05-08").publicNote,
    /access restriction/i
  );

  const pressIndex = readFileSync(
    "docs/knowledge-bank/projects/nyca-campaign-press-index.md",
    "utf8"
  );
  assert.match(
    pressIndex,
    /gothamist\.com\/arts-entertainment\/lawmakers-demand-transparency/
  );
  assert.match(
    pressIndex,
    /gothamist\.com\/arts-entertainment\/de-blasio-praising-punk-rock/
  );
  assert.doesNotMatch(pressIndex, /gothamist\.com\/news\/march-nightlife-raids-city-council/);
  assert.doesNotMatch(pressIndex, /gothamist\.com\/news\/punk-blaz-signs-bill/);
});

test("KC Town Hall intake separates recommendation, appropriation, and use", () => {
  const sourceById = new Map(
    knowledgeBank.sources.map((source) => [source.id, source])
  );
  const intake = knowledgeBank.intakeItems.find(
    (item) =>
      item.id === "INTAKE-KC-TOWN-HALL-CCED-ALLOCATION-2026-07-13"
  );

  assert.ok(intake);
  assert.equal(intake.status, "researching");
  assert.equal(intake.projectionStatus, "no-public-projection");
  assert.deepEqual(intake.relatedProofIds, [
    "kc-town-hall-public-benefit-documentation"
  ]);
  assert.equal(intake.sourceIds.length, 3);
  assert.equal(intake.candidateClaims.length, 0);

  const resolution = sourceById.get(
    "SRC-KCMO-CCED-RESOLUTION-190649-2019-09-26"
  );
  const appropriation = sourceById.get(
    "SRC-KCMO-CCED-ORDINANCE-190642-2019-09-26"
  );
  const reappropriation = sourceById.get(
    "SRC-KCMO-CCED-ORDINANCE-240317-2024-03-28"
  );
  assert.ok(resolution);
  assert.ok(appropriation);
  assert.ok(reappropriation);
  assert.ok(
    resolution.doesNotEstablish.some((item) => /receipt or disbursement/i.test(item))
  );
  assert.ok(
    appropriation.doesNotEstablish.some((item) => /expenditure/i.test(item))
  );
  assert.ok(
    reappropriation.supportsGenerally.some((item) => /remained unused/i.test(item))
  );

  const propositionById = new Map(
    intake.propositions.map((proposition) => [proposition.id, proposition])
  );
  assert.match(
    propositionById.get("PROP-KC-TOWN-HALL-COUNCIL-APPROPRIATION-2019").text,
    /appropriating \$490,539/
  );
  assert.match(
    propositionById.get("PROP-KC-TOWN-HALL-WITHDRAWAL-REAPPROPRIATION-2024").text,
    /remained unused/
  );
  assert.ok(
    intake.tensions[0].correctionTriggers.some(
      (trigger) => trigger.action === "replace"
    )
  );

  const publicProof = readFileSync("apps/www/src/data/proofs.ts", "utf8");
  assert.match(publicProof, /\$490,539 public funding recommendation/);
  assert.doesNotMatch(JSON.stringify(publicCitationRegistry), /SRC-KCMO-CCED/);
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
