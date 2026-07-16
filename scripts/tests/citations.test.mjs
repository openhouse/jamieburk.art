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
import {
  callNycCouncilSocialSourceIds,
  callNycFullPopulationCensusSourceId,
  callNycProjectSocialSourceIds,
  kcTownHallCouncilResponseSourceIds,
  kcTownHallFullPopulationCensusSourceId,
  kcSpacesRecipientSocialSourceIds,
  nycaCouncilSocialSourceIds,
  nycaOlympiaSocialSourceId,
  nycaProfilePopulationCensusSourceId,
  nycaSourceTrailSourceIds,
  projectSocialSourceIds,
  projectSocialSources,
  wowListFullPopulationCensusSourceId
} from "../../apps/www/src/data/knowledge-bank/projectSocial.ts";
import { citationNoteId, getClaimProjection, publicCitationRegistry, resolveCitationOccurrence, resolveCitationReferences } from "../../apps/www/src/data/knowledge-bank/public.ts";
import { intakeItemSchema } from "../../apps/www/src/data/knowledge-bank/schema.ts";
import {
  kcTownHallPhaseOneClaimIds,
  kcTownHallPhaseOneSourceIds
} from "../../apps/www/src/data/knowledge-bank/kcTownHallPhaseOne.ts";
import { validateKnowledgeBank } from "../lib/citation-validation.mjs";

test("canonical registry passes deterministic validation", () => assert.deepEqual(validateKnowledgeBank(), []));

test("page-local numbering follows first source appearance", () => {
  assert.deepEqual(resolveCitationOccurrence("callnyc", "event-date-time").sources.map((item) => item.number), [1, 2]);
  assert.deepEqual(resolveCitationOccurrence("callnyc", "first-councilstat-hackathon").sources.map((item) => item.number), [2]);
  assert.deepEqual(resolveCitationOccurrence("callnyc", "independent-follow-on").sources.map((item) => item.number), [3, 4]);
  assert.deepEqual(resolveCitationOccurrence("callnyc", "event-branding").sources.map((item) => item.number), [5]);
  assert.deepEqual(resolveCitationOccurrence("callnyc", "public-issue-pathway-census").sources.map((item) => item.number), [6, 7]);
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
  assert.ok(sourceById.get("SRC-WATERWAYS-KC-STAR-GO-WITH-FLOW-2007").supportsGenerally.some((item) => /1,000-mile marker/i.test(item)));
  assert.ok(sourceById.get("SRC-WATERWAYS-KC-STAR-GO-WITH-FLOW-2007").doesNotEstablish.some((item) => /arrival at the Gulf of Mexico/i.test(item)));
  assert.ok(sourceById.get("SRC-WATERWAYS-KC-STAR-GO-WITH-FLOW-2007").doesNotEstablish.some((item) => /permission to republish/i.test(item)));
  assert.ok(sourceById.get("SRC-NYCA-GOTHAMIST-CABARET-REPEAL-2017-06-19").doesNotEstablish.some((item) => /alone repealed/i.test(item)));
  assert.ok(sourceById.get("SRC-NYCA-NPR-CABARET-REPEAL-2017-09-20").doesNotEstablish.some((item) => /Jamie's role/i.test(item)));
});

test("Kansas City Star waterways evidence promotes a bounded reserve claim", () => {
  const source = knowledgeBank.sources.find(
    (item) => item.id === "SRC-WATERWAYS-KC-STAR-GO-WITH-FLOW-2007"
  );
  const claim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-WATERWAYS-RAFT-EXPEDITION-2007"
  );
  const intake = knowledgeBank.intakeItems.find(
    (item) => item.id === "INTAKE-WATERWAYS-PARTICIPATORY-PRACTICE-2026-07-12"
  );

  assert.equal(source.visibility, "public-metadata-only");
  assert.equal(source.preservationStatus, "private");
  assert.equal(source.media.rightsStatus, "permission-needed");
  assert.equal(source.media.publicDisplayStatus, "hold");
  assert.equal(claim.status, "confirmed-with-boundary");
  assert.ok(claim.boundaries.some((item) => /Libby Hendon and Laura Mattingly/i.test(item)));
  assert.ok(claim.antiClaims.some((item) => /reached the Gulf of Mexico/i.test(item)));
  assert.equal(intake.status, "integrated");
  assert.ok(intake.relatedClaimIds.includes("CLM-WATERWAYS-RAFT-EXPEDITION-2007"));
  assert.equal(
    intake.propositions.find(
      (item) => item.id === "PROP-WATERWAYS-RAFT-CONCEPTION-2007"
    ).status,
    "direct-support"
  );
  assert.equal(
    intake.propositions.find(
      (item) =>
        item.id === "PROP-WATERWAYS-RIVER-AS-CONNECTIVE-CULTURAL-SPACE-2007"
    ).status,
    "direct-support"
  );
  assert.doesNotMatch(JSON.stringify(publicCitationRegistry), /SRC-WATERWAYS-KC-STAR-GO-WITH-FLOW-2007/);
  assert.doesNotMatch(JSON.stringify(knowledgeBank), /KC_Star_Article\.pdf|\/Users\/|\/Volumes\//);
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
  assert.equal(intake.status, "integrated");
  assert.equal(intake.projectionStatus, "no-public-projection");
  assert.deepEqual(intake.relatedClaimIds, [
    "CLM-KC-TOWN-HALL-FUNDING-SEQUENCE"
  ]);
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
  assert.equal(intake.tensions[0].status, "reconciled");

  const publicProof = readFileSync("apps/www/src/data/proofs.ts", "utf8");
  assert.match(publicProof, /Council acceptance and appropriation of \$490,539/);
  assert.match(
    JSON.stringify(publicCitationRegistry),
    /CLM-KC-TOWN-HALL-FUNDING-SEQUENCE/
  );
});

test("KC Town Hall stewardship transition remains a bounded memory lead", () => {
  const intake = knowledgeBank.intakeItems.find(
    (item) =>
      item.id === "INTAKE-KC-TOWN-HALL-STEWARDSHIP-TRANSITION-2026-07-14"
  );

  assert.ok(intake);
  assert.equal(intake.kind, "memory-fragment");
  assert.equal(intake.status, "captured");
  assert.equal(intake.projectionStatus, "no-public-projection");
  assert.deepEqual(intake.sourceIds, []);
  assert.deepEqual(intake.candidateClaims, []);
  assert.equal(intake.propositions.length, 1);
  assert.equal(intake.propositions[0].status, "memory-lead");
  assert.deepEqual(intake.propositions[0].sourceIds, []);
  assert.ok(
    intake.propositions[0].boundaries.some((boundary) =>
      /does not establish this stewardship transition/i.test(boundary)
    )
  );
  assert.ok(
    intake.boundaries.some((boundary) =>
      /Do not infer abandonment, failure/i.test(boundary)
    )
  );
  assert.doesNotMatch(
    JSON.stringify(publicCitationRegistry),
    /KC-TOWN-HALL-STEWARDSHIP-TRANSITION/
  );
});

test("KC Town Hall Phase One claims separate first-person role from proposal corroboration", () => {
  const sourceById = new Map(
    knowledgeBank.sources.map((source) => [source.id, source])
  );
  const claimById = new Map(
    knowledgeBank.claims.map((claim) => [claim.id, claim])
  );
  const proposal = sourceById.get(kcTownHallPhaseOneSourceIds.proposal);
  const firsthand = sourceById.get(
    kcTownHallPhaseOneSourceIds.firsthandAccount
  );
  const fieldClaim = claimById.get(
    kcTownHallPhaseOneClaimIds.fieldCoordination
  );
  const surveyClaim = claimById.get(
    kcTownHallPhaseOneClaimIds.neighborhoodSurvey
  );

  assert.ok(proposal);
  assert.ok(firsthand);
  assert.ok(fieldClaim);
  assert.ok(surveyClaim);
  assert.equal(proposal.visibility, "protected");
  assert.equal(firsthand.visibility, "protected");
  assert.ok(
    proposal.doesNotEstablish.some((boundary) =>
      /arithmetically reconciled/i.test(boundary)
    )
  );
  assert.ok(
    fieldClaim.boundaries.some((boundary) =>
      /first-person evidence/i.test(boundary)
    )
  );
  assert.ok(
    fieldClaim.boundaries.some((boundary) =>
      /do not reconcile/i.test(boundary)
    )
  );
  assert.ok(
    surveyClaim.boundaries.some((boundary) =>
      /does not identify the card's individual designer/i.test(boundary)
    )
  );
  assert.ok(
    [fieldClaim, surveyClaim].every((claim) =>
      claim.projections.every((projection) =>
        projection.surfaces.every((surface) => !surface.startsWith("/"))
      )
    )
  );
});

test("KC Town Hall neighborhood practice promotes bounded operations and retains research leads", () => {
  const intake = knowledgeBank.intakeItems.find(
    (item) =>
      item.id ===
      "INTAKE-KCTH-PHASE-ONE-NEIGHBORHOOD-PRACTICE-2026-07-15"
  );
  const tiresClaim = knowledgeBank.claims.find(
    (claim) => claim.id === kcTownHallPhaseOneClaimIds.tiredOfTires
  );
  const report = readFileSync(
    "docs/knowledge-bank/projects/kc-town-hall-phase-one-and-neighborhood-practice.md",
    "utf8"
  );

  assert.ok(intake);
  assert.ok(tiresClaim);
  assert.equal(intake.status, "integrated");
  assert.equal(intake.projectionStatus, "no-public-projection");
  assert.deepEqual(
    new Set(intake.relatedClaimIds),
    new Set(Object.values(kcTownHallPhaseOneClaimIds))
  );
  const cleveland = intake.propositions.find(
    (proposition) =>
      proposition.id ===
      "PROP-KCTH-CLEVELAND-UNIFY-TO-BEAUTIFY-MEMORY-2026"
  );
  assert.ok(cleveland);
  assert.equal(cleveland.status, "memory-lead");
  assert.match(cleveland.nextStep, /flyers|logo files|maps/i);
  assert.ok(
    tiresClaim.boundaries.some((boundary) =>
      /first-person account supplies the deeper design/i.test(boundary)
    )
  );
  assert.ok(
    tiresClaim.antiClaims.some((antiClaim) =>
      /Indian Mound expansion is independently corroborated/i.test(antiClaim)
    )
  );
  assert.doesNotMatch(
    JSON.stringify(publicCitationRegistry),
    /KCTH-PHASE-ONE|KCTH-TIRED-OF-TIRES-PROGRAM/
  );
  assert.doesNotMatch(report, /\/Users\/|\/Volumes\//);
  assert.match(report, /No `\/proofs`, `\/knowledge-bank`/);
  assert.match(report, /visible 2018 and 2019 column totals add to \$191,895/);
});

test("iCloud Teams sources preserve public and protected evidence boundaries", () => {
  const sourceById = new Map(
    knowledgeBank.sources.map((source) => [source.id, source])
  );
  const selectedSourceIds = [
    "SRC-NTER-CHNG-PITCH-2010-01-07",
    "SRC-NTER-CHNG-VIMEO-METADATA-2011-03-23",
    "SRC-NTER-CHNG-PROJECT-SITE-2011",
    "SRC-ANH-KC-NTER-CHNG-ARTIST-PAGE-2011",
    "SRC-ANH-NTER-CHNG-USE-ACCOUNT-2011",
    "SRC-NERMAN-AMERICA-NOW-HERE-2011",
    "SRC-NTER-CHNG-ANH-INSTALL-PLAN-2011",
    "SRC-NTER-CHNG-EXHIBIT-INTERACTION-WORKING-RECORD-2011",
    "SRC-WAVE-FARM-BAPLAB-PROGRAM-2006-07-22",
    "SRC-BAPLAB-ARCHIVED-NEW-MEDIA-PROGRAM-2006-07-22",
    "SRC-BAPLAB-TIME-IS-LONG-ARTICLE-2006",
    "SRC-MONTHLY-MUSIC-HACKATHON-SORTED-AUDIO-2013-02-27",
    "SRC-MATMOS-VAGUE-TERRAIN-VIDEO-2016-11-26",
    "SRC-CLAUDETTES-THEATRE-XR-ENSEMBLE-2022-10-29",
    "SRC-CRS-NINETY-DAY-OPERATING-PLAN-2026-04-06",
    "SRC-CRS-COLLABORATION-RUNNING-MINUTES-2026-04-29",
    "SRC-CRS-OPEN-DATA-FOUNDATION-MEMO-2025-11-26",
    "SRC-CRS-FULLER-PUBLIC-BASELINE-HANDOUT-2026-03-27",
    "SRC-CRS-LEGISLATIVE-PROVENANCE-REDLINE-2026-05-17",
    "SRC-JOB-HUNT-CROSS-ARCHIVE-EVIDENCE-MAP-2026-07-03",
    "SRC-MAVEN-AI-EVALS-COMPLETION-2026",
    "SRC-SOURCE-BACKED-SPRINT-PREP-2026-06-30",
    "SRC-NYCA-DCLA-MEETING-RECORD-2017-02-03",
    "SRC-NYCA-DCLA-PRIORITY-VOTE-2017-02-07",
    "SRC-CREATENYC-NYCAC-APPENDIX-2017-07-19",
    "SRC-CREATENYC-FINAL-PLAN-NYCAC-2017-07-19",
    "SRC-NYC-COUNCIL-CULTURAL-PLAN-FINKELPEARL-TESTIMONY-2017-02-27",
    "SRC-NYC-COUNCIL-FY2018-EXECUTIVE-BUDGET-FINKELPEARL-2017-05-19",
    "SRC-NYC-COUNCIL-CABARET-HEARING-JAMIE-2017-06-19",
    "SRC-NYC-COUNCIL-MARCH-HEARING-NYCAC-2019-02-11"
  ];

  assert.ok(selectedSourceIds.every((sourceId) => sourceById.has(sourceId)));
  const protectedSources = selectedSourceIds
    .map((sourceId) => sourceById.get(sourceId))
    .filter((source) => source.visibility === "protected");
  assert.equal(protectedSources.length, 10);
  assert.ok(protectedSources.every((source) => source.protectedLocatorId));
  assert.ok(
    protectedSources.every(
      (source) => !source.canonicalUrl && !source.archiveUrl && !source.assetUrl
    )
  );
  assert.ok(
    sourceById
      .get("SRC-NTER-CHNG-PITCH-2010-01-07")
      .doesNotEstablish.some((boundary) => /Jamie's role/i.test(boundary))
  );
  assert.ok(
    sourceById
      .get("SRC-NTER-CHNG-VIMEO-METADATA-2011-03-23")
      .supportsGenerally.some((support) => /Jamie Burkart designer credit/i.test(support))
  );
  assert.ok(
    sourceById
      .get("SRC-ANH-KC-NTER-CHNG-ARTIST-PAGE-2011")
      .supportsGenerally.some((support) => /shared visual-artist credit/i.test(support))
  );
  assert.ok(
    sourceById
      .get("SRC-NERMAN-AMERICA-NOW-HERE-2011")
      .doesNotEstablish.some((boundary) => /NTER CHNG inclusion/i.test(boundary))
  );
  assert.ok(
    sourceById
      .get("SRC-ANH-NTER-CHNG-USE-ACCOUNT-2011")
      .doesNotEstablish.some((boundary) => /total attendance/i.test(boundary))
  );
  assert.ok(
    sourceById
      .get("SRC-NTER-CHNG-ANH-INSTALL-PLAN-2011")
      .doesNotEstablish.some((boundary) => /sole or exact responsibility/i.test(boundary))
  );
  assert.ok(
    sourceById
      .get("SRC-NTER-CHNG-EXHIBIT-INTERACTION-WORKING-RECORD-2011")
      .doesNotEstablish.some((boundary) => /participant identity/i.test(boundary))
  );
  assert.ok(
    sourceById
      .get("SRC-MATMOS-VAGUE-TERRAIN-VIDEO-2016-11-26")
      .doesNotEstablish.some((boundary) => /Jamie Burkhardt is Jamie Burkart/i.test(boundary))
  );
  assert.ok(
    sourceById
      .get("SRC-BAPLAB-TIME-IS-LONG-ARTICLE-2006")
      .doesNotEstablish.some((boundary) => /Jamie Burkhart is Jamie Burkart/i.test(boundary))
  );
  assert.ok(
    sourceById
      .get("SRC-UCSC-WARREN-SACK-NARRATIVE-EVALS-2004-2006")
      .doesNotEstablish.some((boundary) => /originated.*structural equivalence/i.test(boundary))
  );
  assert.ok(
    sourceById
      .get("SRC-UCSC-MARGARET-MORSE-NARRATIVE-EVALS-2006")
      .doesNotEstablish.some((boundary) => /Art is Long.*Time Is Long/i.test(boundary))
  );
  assert.ok(
    sourceById
      .get("SRC-CREATENYC-FINAL-PLAN-NYCAC-2017-07-19")
      .doesNotEstablish.some((boundary) => /individual role/i.test(boundary))
  );
  assert.ok(
    sourceById
      .get("SRC-CRS-LEGISLATIVE-PROVENANCE-REDLINE-2026-05-17")
      .doesNotEstablish.some((boundary) => /legal advice/i.test(boundary))
  );
});

test("iCloud Teams intake keeps claims bounded and non-projectable", () => {
  const intakeById = new Map(
    knowledgeBank.intakeItems.map((item) => [item.id, item])
  );
  const interactive = intakeById.get(
    "INTAKE-INTERACTIVE-MEDIA-PRACTICE-2026-07-14"
  );
  const crs = intakeById.get(
    "INTAKE-CRS-OPERATING-AND-DATA-INFRASTRUCTURE-2026-07-14"
  );
  const evals = intakeById.get(
    "INTAKE-EVALS-AND-SOURCE-BACKED-SPRINT-2026-07-14"
  );
  const nyca = intakeById.get(
    "INTAKE-NYCA-CULTURAL-SPACE-POLICY-2026-07-12"
  );

  assert.equal(interactive.status, "integrated");
  assert.equal(crs.status, "claim-candidate");
  assert.equal(evals.status, "claim-candidate");
  assert.equal(nyca.status, "researching");
  assert.equal(interactive.candidateClaims.length, 9);
  assert.equal(crs.candidateClaims.length, 5);
  assert.equal(evals.candidateClaims.length, 2);
  assert.ok([interactive, crs, evals].every((item) => item.projectionStatus === "no-public-projection"));
  assert.equal(
    interactive.propositions.find(
      (proposition) => proposition.id === "PROP-NTER-CHNG-AMERICA-NOW-HERE-2011"
    ).status,
    "supported-with-boundary"
  );
  assert.equal(
    interactive.propositions.find(
      (proposition) => proposition.id === "PROP-NTER-CHNG-ANH-INSTALLATION-OPERATIONS-2011"
    ).status,
    "supported-with-boundary"
  );
  assert.equal(
    interactive.propositions.find(
      (proposition) => proposition.id === "PROP-NTER-CHNG-CONCEPT-AND-PROMPT-RESPONSE-2010-2011"
    ).status,
    "supported-with-boundary"
  );
  assert.ok(
    interactive.relatedClaimIds.includes("CLM-NTER-CHNG-AMERICA-NOW-HERE-2011")
  );
  assert.ok(
    interactive.relatedClaimIds.includes(
      "CLM-CREATIVE-TECHNOLOGY-EMBODIED-SYSTEMS"
    )
  );
  assert.ok(
    interactive.relatedProofIds.includes(
      "creative-technology-embodied-systems"
    )
  );
  assert.equal(
    interactive.propositions.find(
      (proposition) =>
        proposition.id ===
        "PROP-UCSC-SACK-SOCIAL-SOFTWARE-PROTOTYPES-2004-2006"
    ).status,
    "direct-support"
  );
  assert.equal(
    interactive.propositions.find(
      (proposition) =>
        proposition.id === "PROP-UCSC-MORSE-EMBODIED-MEDIA-PRACTICE-2006"
    ).status,
    "supported-with-boundary"
  );
  assert.equal(
    interactive.propositions.find(
      (proposition) => proposition.id === "PROP-MATMOS-TOUR-VIDEO-NAME-CONFLICT-2016"
    ).status,
    "research-only"
  );
  assert.equal(
    interactive.propositions.find(
      (proposition) => proposition.id === "PROP-BAPLAB-TIME-IS-LONG-NAME-CONFLICT-2006"
    ).status,
    "research-only"
  );
  assert.equal(
    crs.propositions.find(
      (proposition) => proposition.id === "PROP-CRS-LEGISLATIVE-PROVENANCE-REDLINE-2026"
    ).status,
    "direct-support"
  );
  assert.equal(
    nyca.propositions.find(
      (proposition) =>
        proposition.id === "PROP-NYCA-CREATENYC-OFFICIAL-INSTITUTIONAL-RECORD-2017"
    ).status,
    "direct-support"
  );
  assert.equal(
    nyca.propositions.find(
      (proposition) => proposition.id === "PROP-NYCA-CREATENYC-BRIDGE-INTERPRETATION-2017"
    ).status,
    "synthesis-with-boundary"
  );
  assert.equal(
    evals.propositions.find(
      (proposition) => proposition.id === "PROP-JOB-HUNT-EVIDENCE-MAP-CONTEXT-2026"
    ).status,
    "context-only"
  );
  assert.ok(
    crs.tensions[0].correctionTriggers.some(
      (trigger) => trigger.action === "narrow"
    )
  );

  const publicRegistryText = JSON.stringify(publicCitationRegistry);
  assert.doesNotMatch(publicRegistryText, /INTAKE-INTERACTIVE-MEDIA-PRACTICE/);
  assert.doesNotMatch(publicRegistryText, /CLM-NTER-CHNG-AMERICA-NOW-HERE-2011/);
  assert.doesNotMatch(publicRegistryText, /SRC-ANH-KC-NTER-CHNG-ARTIST-PAGE-2011/);
  assert.doesNotMatch(publicRegistryText, /SRC-NTER-CHNG-ANH-INSTALL-PLAN-2011/);
  assert.doesNotMatch(publicRegistryText, /SRC-NTER-CHNG-EXHIBIT-INTERACTION-WORKING-RECORD-2011/);
  assert.doesNotMatch(publicRegistryText, /SRC-UCSC-WARREN-SACK-NARRATIVE-EVALS/);
  assert.doesNotMatch(publicRegistryText, /SRC-UCSC-MARGARET-MORSE-NARRATIVE-EVALS/);
  assert.doesNotMatch(publicRegistryText, /SRC-MARGARET-MORSE-LINKEDIN-RECOMMENDATION/);
  assert.doesNotMatch(publicRegistryText, /SRC-CRS-NINETY-DAY-OPERATING-PLAN/);
  assert.doesNotMatch(publicRegistryText, /SRC-CRS-LEGISLATIVE-PROVENANCE-REDLINE/);
  assert.doesNotMatch(publicRegistryText, /SRC-CREATENYC-FINAL-PLAN-NYCAC/);
  assert.doesNotMatch(publicRegistryText, /SRC-SOURCE-BACKED-SPRINT-PREP/);
});

test("Council hearing records preserve institutional use and causal boundaries", () => {
  const sourceById = new Map(
    knowledgeBank.sources.map((source) => [source.id, source])
  );
  const intakeById = new Map(
    knowledgeBank.intakeItems.map((item) => [item.id, item])
  );
  const inquiryById = new Map(
    knowledgeBank.researchInquiries.map((item) => [item.id, item])
  );
  const nyca = intakeById.get(
    "INTAKE-NYCA-CULTURAL-SPACE-POLICY-2026-07-12"
  );
  const propositionById = new Map(
    nyca.propositions.map((proposition) => [proposition.id, proposition])
  );
  const finkelpearl = sourceById.get(
    "SRC-NYC-COUNCIL-FY2018-EXECUTIVE-BUDGET-FINKELPEARL-2017-05-19"
  );
  const cabaret = sourceById.get(
    "SRC-NYC-COUNCIL-CABARET-HEARING-JAMIE-2017-06-19"
  );
  const march = sourceById.get(
    "SRC-NYC-COUNCIL-MARCH-HEARING-NYCAC-2019-02-11"
  );
  const inquiry = inquiryById.get(
    "INQ-NYCA-FINKELPEARL-COUNCIL-TRANSCRIPTS-2026-07-15"
  );

  assert.match(finkelpearl.publicNote, /direct public feedback/i);
  assert.ok(
    finkelpearl.doesNotEstablish.some((boundary) =>
      /huge influence.*NYC Artist Coalition/i.test(boundary)
    )
  );
  assert.ok(
    cabaret.supportsGenerally.some((support) =>
      /formal Council testimony/i.test(support)
    )
  );
  assert.ok(
    cabaret.doesNotEstablish.some((boundary) =>
      /100 percent exam-pass/i.test(boundary)
    )
  );
  assert.match(march.publicNote, /NYPD disputed/i);
  assert.ok(
    march.doesNotEstablish.some((boundary) =>
      /Jamie's authorship/i.test(boundary)
    )
  );
  assert.equal(inquiry.resultStatus, "partially-recovered");
  assert.match(inquiry.findings[0], /one exact/i);
  assert.ok(
    inquiry.limitations.some((limitation) =>
      /does not establish.*no other/i.test(limitation)
    )
  );
  assert.equal(
    propositionById.get("PROP-NYCA-FINKELPEARL-COUNCIL-USE-2017").status,
    "direct-support"
  );
  assert.equal(
    propositionById.get("PROP-NYCA-JAMIE-ESPINAL-CABARET-TESTIMONY-2017").status,
    "direct-support"
  );
  assert.equal(
    propositionById.get("PROP-NYCA-COUNCIL-USES-COALITION-RESEARCH-2019").status,
    "direct-support"
  );
  assert.equal(
    propositionById.get("PROP-NYCA-INSTITUTIONAL-USE-JAMIE-INTERPRETATION-2026").status,
    "synthesis-with-boundary"
  );
  assert.ok(
    nyca.candidateClaims.includes(
      propositionById.get("PROP-NYCA-INSTITUTIONAL-USE-JAMIE-INTERPRETATION-2026").text
    )
  );

  const note = readFileSync(
    "docs/knowledge-bank/research/2026-07-15-finkelpearl-council-hearing-institutional-use.md",
    "utf8"
  );
  assert.match(note, /one exact instance[\s\S]*recovered/i);
  assert.match(note, /not \*\*only one instance ever existed\*\*/i);
  assert.match(note, /publicly contestable/i);
  assert.match(note, /no `\/proofs` or archive route/i);

  const publicRegistryText = JSON.stringify(publicCitationRegistry);
  assert.doesNotMatch(publicRegistryText, /FINKELPEARL-2017-05-19/);
  assert.doesNotMatch(publicRegistryText, /CABARET-HEARING-JAMIE/);
  assert.doesNotMatch(publicRegistryText, /MARCH-HEARING-NYCAC/);
});

test("Google Drive intake preserves attribution, data gaps, and projection boundaries", () => {
  const intakeById = new Map(
    knowledgeBank.intakeItems.map((item) => [item.id, item])
  );
  const sourceById = new Map(
    knowledgeBank.sources.map((source) => [source.id, source])
  );
  const residency = intakeById.get(
    "INTAKE-GDRIVE-196-RESIDENCY-OPERATIONS-2026-07-14"
  );
  const archive = intakeById.get(
    "INTAKE-GDRIVE-VACANCY-ARCHIVE-AND-OVERVIEW-AUTOMATION-2026-07-14"
  );
  const workspace = intakeById.get(
    "INTAKE-GDRIVE-SHARED-WORKSPACE-PRACTICE-2026-07-14"
  );

  assert.equal(residency.status, "claim-candidate");
  assert.equal(archive.status, "claim-candidate");
  assert.equal(workspace.status, "researching");
  assert.equal(residency.candidateClaims.length, 1);
  assert.equal(archive.candidateClaims.length, 2);
  assert.equal(workspace.candidateClaims.length, 0);
  assert.ok(
    [residency, archive, workspace].every(
      (item) => item.projectionStatus === "no-public-projection"
    )
  );
  assert.equal(
    workspace.propositions.find(
      (proposition) =>
        proposition.id === "PROP-GDRIVE-MEDIA-DELIVERABLES-ROLE-GAP-2026"
    ).status,
    "research-only"
  );
  assert.ok(
    sourceById
      .get("SRC-GDRIVE-VACANCY-ARCHIVE-INVENTORY-2026-03-04")
      .supportsGenerally.some((support) => /visible March 2019 gap/i.test(support))
  );
  assert.ok(
    sourceById
      .get("SRC-GDRIVE-PROJECT-OVERVIEW-SCRIPT-2026-03-04")
      .doesNotEstablish.some((boundary) => /without review/i.test(boundary))
  );

  const publicRegistryText = JSON.stringify(publicCitationRegistry);
  assert.doesNotMatch(publicRegistryText, /INTAKE-GDRIVE/);
  assert.doesNotMatch(publicRegistryText, /SRC-GDRIVE/);
  assert.doesNotMatch(publicRegistryText, /LOC-GDRIVE/);
});

test("project social census preserves strict counts and source identity", () => {
  assert.equal(projectSocialSources.length, 81);
  assert.equal(new Set(projectSocialSourceIds).size, 81);
  assert.equal(callNycCouncilSocialSourceIds.length, 8);
  assert.equal(callNycProjectSocialSourceIds.length, 4);
  assert.equal(nycaCouncilSocialSourceIds.length, 11);
  assert.equal(kcSpacesRecipientSocialSourceIds.length, 11);
  assert.ok(
    projectSocialSourceIds.every((sourceId) =>
      knowledgeBank.sources.some((source) => source.id === sourceId)
    )
  );

  const sourceById = new Map(
    knowledgeBank.sources.map((source) => [source.id, source])
  );
  assert.equal(
    sourceById.get("SRC-PROJECT-SOCIAL-X-AUTHENTICATED-CENSUS-2026-07-14").visibility,
    "protected"
  );
  assert.equal(
    sourceById.get("SRC-NYCA-HISTORICAL-COUNCIL-HANDLE-ROSTERS").visibility,
    "protected"
  );
  const callNycCensus = sourceById.get(callNycFullPopulationCensusSourceId);
  assert.equal(callNycCensus.visibility, "public");
  assert.match(callNycCensus.publicNote, /107 recoverable.*three unrecovered/i);
  assert.ok(
    callNycCensus.supportsGenerally.includes("71 issue-recognition posts")
  );
  assert.ok(
    callNycCensus.doesNotEstablish.some((boundary) => /platform account-data export/i.test(boundary))
  );
  assert.ok(
    sourceById
      .get("SRC-NYCA-X-PROFILE-2026-07-14")
      .doesNotEstablish.some((boundary) => /every post/i.test(boundary))
  );
  assert.ok(
    sourceById
      .get("SRC-KC-SPACES-FUND-X-PROFILE-2026-07-14")
      .doesNotEstablish.some((boundary) => /grant/i.test(boundary))
  );
});

test("Council social intake uses recovery floors and excludes noisy matches", () => {
  const intakeById = new Map(
    knowledgeBank.intakeItems.map((item) => [item.id, item])
  );
  const callNyc = intakeById.get(
    "INTAKE-CALLNYC-COUNCIL-ENGAGEMENT-2026-07-12"
  );
  const nyca = intakeById.get(
    "INTAKE-NYCA-COUNCIL-SOCIAL-ENGAGEMENT-2026-07-14"
  );
  const callNycFloor = callNyc.propositions.find(
    (proposition) =>
      proposition.id === "PROP-CALLNYC-EIGHT-COUNCIL-ACCOUNTS-RECOVERED"
  );
  const nycaFloor = nyca.propositions.find(
    (proposition) =>
      proposition.id === "PROP-NYCA-FIVE-DIRECT-COUNCIL-ACCOUNTS-2026"
  );
  const olympia = nyca.propositions.find(
    (proposition) =>
      proposition.id === "PROP-NYCA-OLYMPIA-KAZI-MENTION-CORPUS-2026"
  );

  assert.equal(callNyc.status, "integrated");
  assert.equal(nyca.status, "integrated");
  assert.deepEqual(nyca.relatedClaimIds, [
    "CLM-NYCA-SHARED-PUBLIC-IDENTITY-CORPUS",
    "CLM-NYCA-COUNCIL-SOCIAL-ENGAGEMENT"
  ]);
  assert.ok(
    callNyc.relatedClaimIds.includes("CLM-CALLNYC-PUBLIC-ISSUE-PATHWAY-CENSUS")
  );
  const callNycPathwayCensus = callNyc.propositions.find(
    (proposition) => proposition.id === "PROP-CALLNYC-ISSUE-PATHWAY-CENSUS"
  );
  assert.match(callNycPathwayCensus.text, /71 issue-recognition.*61 distinct.*26 Council-member/i);
  assert.ok(callNycPathwayCensus.sourceIds.includes(callNycFullPopulationCensusSourceId));
  assert.match(callNycFloor.text, /eight then-serving/);
  assert.equal(
    callNycFloor.sourceIds.filter((sourceId) =>
      callNycCouncilSocialSourceIds.includes(sourceId)
    ).length,
    8
  );
  assert.ok(
    callNycFloor.boundaries.some((boundary) =>
      /institutional @NYCCouncil account/i.test(boundary)
    )
  );
  assert.match(nycaFloor.text, /five then-serving.*15 recoverable/i);
  assert.equal(
    nycaFloor.sourceIds.filter((sourceId) =>
      nycaCouncilSocialSourceIds.includes(sourceId)
    ).length,
    11
  );
  assert.ok(
    nycaFloor.boundaries.some((boundary) =>
      /Brad Lander and Carlina Rivera/i.test(boundary)
    )
  );
  assert.match(olympia.text, /89 of the 526/);
  assert.ok(olympia.sourceIds.includes(nycaOlympiaSocialSourceId));
  assert.ok(
    [callNyc, nyca].every(
      (item) => item.projectionStatus === "no-public-projection"
    )
  );
});

test("project social intake protects shared authorship and transitions", () => {
  const intakeById = new Map(
    knowledgeBank.intakeItems.map((item) => [item.id, item])
  );
  const socialIdentity = intakeById.get(
    "INTAKE-PROJECT-SOCIAL-IDENTITY-SYSTEM-2026-07-14"
  );
  const wowList = intakeById.get(
    "INTAKE-WOWLIST-SOCIAL-RECORD-2026-07-14"
  );
  const kcSpaces = intakeById.get(
    "INTAKE-KC-SPACES-FUND-SOCIAL-RECORD-2026-07-14"
  );
  const kcTownHall = intakeById.get(
    "INTAKE-KC-TOWN-HALL-SOCIAL-CONTINUITY-2026-07-14"
  );

  assert.equal(socialIdentity.status, "integrated");
  assert.ok(
    [socialIdentity, wowList, kcSpaces].every(
      (item) =>
        item.projectionStatus === "no-public-projection" &&
        item.candidateClaims.length === 0
    )
  );
  assert.ok(
    [wowList, kcSpaces].every((item) => item.status === "researching")
  );
  assert.equal(
    socialIdentity.propositions.find(
      (proposition) =>
        proposition.id === "PROP-PROJECT-SOCIAL-ACCOUNTS-ESTABLISHED-BY-JAMIE"
    ).status,
    "memory-lead"
  );
  assert.ok(
    socialIdentity.boundaries.some((boundary) =>
      /individual authorship/i.test(boundary)
    )
  );
  assert.equal(
    kcSpaces.propositions.find(
      (proposition) =>
        proposition.id === "PROP-KC-SPACES-FUND-ELEVEN-PUBLIC-HIGHLIGHTS-2026"
    ).sourceIds.length,
    11
  );
  assert.ok(
    kcSpaces.boundaries.some((boundary) => /grant decisions/i.test(boundary))
  );
  assert.equal(kcTownHall.status, "integrated");
  assert.equal(kcTownHall.projectionStatus, "no-public-projection");
  assert.deepEqual(kcTownHall.relatedClaimIds, [
    "CLM-KC-TOWN-HALL-PUBLIC-OPERATING-SURFACE"
  ]);
  assert.ok(
    kcTownHall.boundaries.some((boundary) =>
      /without speculating about its cause/i.test(boundary)
    )
  );
  assert.ok(
    kcTownHall.boundaries.some((boundary) =>
      /post-transition program outcome/i.test(boundary)
    )
  );
});

test("WOW List full-population census reconciles every profile-counted object", () => {
  const census = readFileSync(
    "docs/knowledge-bank/research/data/wowlist-x-full-population-census-2026-07-15.csv",
    "utf8"
  );
  const summary = JSON.parse(
    readFileSync(
      "docs/knowledge-bank/research/data/wowlist-x-full-population-summary-2026-07-15.json",
      "utf8"
    )
  );
  const intake = knowledgeBank.intakeItems.find(
    (item) => item.id === "INTAKE-WOWLIST-SOCIAL-RECORD-2026-07-14"
  );
  const source = knowledgeBank.sources.find(
    (item) => item.id === wowListFullPopulationCensusSourceId
  );
  const recoveredRows = census.match(/^RECOVERED-\d{3},/gm) ?? [];
  const statusIds = [
    ...census.matchAll(/https:\/\/x\.com\/[A-Za-z0-9_]+\/status\/(\d+)/g)
  ].map((match) => match[1]);

  assert.equal(recoveredRows.length, 38);
  assert.equal(new Set(statusIds).size, 38);
  assert.equal((census.match(/,project-post,/g) ?? []).length, 16);
  assert.equal((census.match(/,project-reply,/g) ?? []).length, 6);
  assert.equal((census.match(/,project-repost,/g) ?? []).length, 16);
  assert.equal(summary.population.profileCount, 38);
  assert.equal(summary.population.recoveredCount, 38);
  assert.equal(summary.population.projectAuthoredTotal, 22);
  assert.equal(summary.population.uniqueRepostSourceAccounts, 13);
  assert.equal(summary.urlInventory.uniqueShortUrls, 35);
  assert.equal(summary.urlInventory.items.length, 35);
  assert.deepEqual(summary.accessTimeProjectAuthoredEngagement, {
    observedAt: "2026-07-15",
    statusesWithAnyObservedInteraction: 12,
    replies: 2,
    reposts: 20,
    likes: 21,
    boundary:
      "These are mutable access-time labels on the 22 project-authored statuses. Metrics on the 16 reposted source statuses are excluded because they are not project-account traction."
  });
  assert.equal(
    summary.externalMentionSearch.find(
      (item) => item.statusId === "834145172128677888"
    ).disposition,
    "excluded-unrelated-handle-use"
  );
  assert.equal(source.visibility, "public");
  assert.ok(source.doesNotEstablish.some((item) => /human author/i.test(item)));
  assert.ok(intake.sourceIds.includes(wowListFullPopulationCensusSourceId));
  assert.equal(
    intake.propositions.find(
      (item) => item.id === "PROP-WOWLIST-X-CORPUS-RECOVERY-2026"
    ).status,
    "direct-support"
  );
  assert.ok(
    intake.boundaries.some((boundary) =>
      /Do not aggregate engagement on reposted source statuses/i.test(boundary)
    )
  );
  assert.doesNotMatch(census, /Punk shows should|Hug those that you love/);
  assert.doesNotMatch(JSON.stringify(summary), /\/Users\/|\/Volumes\//);
});

test("KC Town Hall full-population census reconciles all 183 records", () => {
  const census = readFileSync(
    "docs/knowledge-bank/research/data/kctownhall-x-full-population-census-2026-07-15.csv",
    "utf8"
  );
  const summary = JSON.parse(
    readFileSync(
      "docs/knowledge-bank/research/data/kctownhall-x-full-population-summary-2026-07-15.json",
      "utf8"
    )
  );
  const intake = knowledgeBank.intakeItems.find(
    (item) =>
      item.id === "INTAKE-KC-TOWN-HALL-SOCIAL-CONTINUITY-2026-07-14"
  );
  const source = knowledgeBank.sources.find(
    (item) => item.id === kcTownHallFullPopulationCensusSourceId
  );
  const claim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-KC-TOWN-HALL-PUBLIC-OPERATING-SURFACE"
  );
  const recoveredRows = census.match(/^RECOVERED-\d{3},/gm) ?? [];
  const statusIds = [
    ...census.matchAll(/https:\/\/x\.com\/[A-Za-z0-9_]+\/status\/(\d+)/g)
  ].map((match) => match[1]);

  assert.equal(recoveredRows.length, 183);
  assert.equal(new Set(statusIds).size, 183);
  assert.equal((census.match(/,project-post,/g) ?? []).length, 142);
  assert.equal((census.match(/,project-reply,/g) ?? []).length, 13);
  assert.equal((census.match(/,project-repost,/g) ?? []).length, 28);
  assert.equal(summary.population.profileCount, 183);
  assert.equal(summary.population.recoveredUnionCount, 183);
  assert.equal(summary.population.reviewedPercent, 100);
  assert.equal(summary.population.unrecoveredCount, 0);
  assert.equal(summary.population.projectAuthoredTotal, 155);
  assert.equal(summary.population.repostedExternalStatuses, 28);
  assert.equal(summary.population.repliesTimelineConversationContexts, 5);
  assert.equal(summary.publishingPattern.tireRelatedRecords, 100);
  assert.equal(summary.publishingPattern.surveyLinkedRecords, 12);
  assert.equal(summary.urlInventory.recordsWithExternalLinks, 118);
  assert.equal(summary.urlInventory.externalLinkOccurrences, 133);
  assert.equal(summary.urlInventory.distinctExternalShortUrls, 31);
  assert.equal(
    summary.stakeholderResponses.directCouncilMemberAccountCount,
    3
  );
  assert.deepEqual(
    summary.stakeholderResponses.councilMemberResponses.map(
      (item) => item.handle
    ),
    ["@QuintonLucasKC", "@joliejustus", "@Robinson4kc"]
  );
  assert.deepEqual(summary.accessTimeProjectAuthoredEngagement, {
    observedAt: "2026-07-14",
    statusesWithAnyObservedInteraction: 77,
    replies: 22,
    reposts: 70,
    likes: 174,
    bookmarks: 1,
    visibleInteractionUnits: 267,
    boundary:
      "These are mutable interface observations, not unique people, reach, conversion, endorsement, participation, or impact. Counts attached to reposted source records are excluded from the project-authored totals."
  });
  assert.equal(source.visibility, "public");
  assert.ok(source.doesNotEstablish.some((item) => /human author/i.test(item)));
  assert.equal(intake.status, "integrated");
  assert.ok(intake.sourceIds.includes(kcTownHallFullPopulationCensusSourceId));
  assert.equal(
    intake.propositions.find(
      (item) => item.id === "PROP-KC-TOWN-HALL-X-FULL-POPULATION-2026"
    ).status,
    "direct-support"
  );
  assert.equal(intake.tensions[0].status, "reconciled");
  assert.ok(
    kcTownHallCouncilResponseSourceIds.every((sourceId) =>
      claim.evidence.some((item) => item.sourceId === sourceId)
    )
  );
  assert.deepEqual(
    resolveCitationOccurrence(
      "kc-town-hall",
      "public-operating-surface"
    ).sources.map((item) => item.source.id),
    [
      kcTownHallFullPopulationCensusSourceId,
      ...kcTownHallCouncilResponseSourceIds
    ]
  );
  assert.doesNotMatch(
    census,
    /Thank you for doing the heavy lifting|Let.?s do this!!/
  );
  assert.doesNotMatch(`${census}\n${JSON.stringify(summary)}`, /\/Users\/|\/Volumes\//);
});

test("NYC Artist Coalition census gives every profile-counted slot a bounded disposition", () => {
  const census = readFileSync(
    "docs/knowledge-bank/research/data/nycartc-x-profile-population-census-2026-07-15.csv",
    "utf8"
  );
  const summary = JSON.parse(
    readFileSync(
      "docs/knowledge-bank/research/data/nycartc-x-profile-population-summary-2026-07-15.json",
      "utf8"
    )
  );
  const intake = knowledgeBank.intakeItems.find(
    (item) => item.id === "INTAKE-NYCA-COUNCIL-SOCIAL-ENGAGEMENT-2026-07-14"
  );
  const source = knowledgeBank.sources.find(
    (item) => item.id === nycaProfilePopulationCensusSourceId
  );
  const identityClaim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-NYCA-SHARED-PUBLIC-IDENTITY-CORPUS"
  );
  const councilClaim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-NYCA-COUNCIL-SOCIAL-ENGAGEMENT"
  );

  assert.equal((census.match(/^RECOVERED-\d{4},/gm) ?? []).length, 3123);
  assert.equal(
    (census.match(/^NOT-MATERIALIZED-\d{4},/gm) ?? []).length,
    2001
  );
  assert.equal(
    (census.match(/,coalition-account-original,/g) ?? []).length,
    608
  );
  assert.equal(
    (census.match(/,coalition-account-reply,/g) ?? []).length,
    77
  );
  assert.equal(
    (census.match(/,native-repost-source-status,/g) ?? []).length,
    2438
  );
  assert.equal(summary.population.profileReportedPostCount, 5124);
  assert.equal(summary.population.recoveredPublicInterfaceRecords, 3123);
  assert.equal(summary.population.notMaterializedPublicInterfaceRecords, 2001);
  assert.equal(summary.population.dispositionLedgerRows, 5124);
  assert.equal(summary.population.dispositionCoveragePercent, 100);
  assert.equal(summary.population.coalitionAuthoredSourceStatuses, 685);
  assert.equal(summary.urlInventory.recordsWithExternalLinks, 1339);
  assert.equal(summary.urlInventory.externalLinkOccurrences, 1451);
  assert.equal(summary.urlInventory.distinctExternalShortUrls, 1161);
  assert.deepEqual(summary.publishingPattern.missionSignalRecordCounts, {
    "fair-rent-nyc": 477,
    "save-nyc-spaces": 192,
    "let-nyc-dance": 97,
    "talks-not-raids": 62,
    "nightlife-governance": 57,
    "artist-labor": 98
  });
  assert.equal(
    summary.visibleEngagementSnapshot.originalAndReplyDisplayedInteractionUnits,
    4306
  );
  assert.equal(
    summary.stakeholderEngagement.strictThenServingCouncilMemberResult.accountCount,
    5
  );
  assert.equal(
    summary.stakeholderEngagement.strictThenServingCouncilMemberResult
      .directMentionOrReplyInteractionCount,
    15
  );
  assert.equal(
    summary.stakeholderEngagement.post2020IncomingMentionInventory
      .directlyMatchingRecordCount,
    75
  );
  assert.equal(source.visibility, "public");
  assert.equal(nycaSourceTrailSourceIds.length, 6);
  assert.equal(intake.status, "integrated");
  assert.ok(intake.sourceIds.includes(nycaProfilePopulationCensusSourceId));
  assert.ok(
    identityClaim.boundaries.some((boundary) =>
      /not literal recovery of all 5,124/i.test(boundary)
    )
  );
  assert.ok(
    councilClaim.boundaries.some((boundary) =>
      /does not establish endorsement/i.test(boundary)
    )
  );
  assert.deepEqual(
    resolveCitationOccurrence(
      "fair-rent-nyc",
      "shared-public-identity-corpus"
    ).sources.map((item) => item.source.id),
    [nycaProfilePopulationCensusSourceId]
  );
  assert.deepEqual(
    resolveCitationOccurrence(
      "fair-rent-nyc",
      "council-social-engagement"
    ).sources.map((item) => item.source.id),
    [nycaProfilePopulationCensusSourceId]
  );
  assert.doesNotMatch(`${census}\n${JSON.stringify(summary)}`, /\/Users\/|\/Volumes\//);
  assert.doesNotMatch(census, /(?:utm_|eType=|eId=|linkId=)/);
});

test("social research locators stay private and research notes stay public-safe", () => {
  const publicRegistryText = JSON.stringify(publicCitationRegistry);
  assert.doesNotMatch(publicRegistryText, /RESEARCH-PROJECT-SOCIAL-X-CENSUS/);
  assert.doesNotMatch(publicRegistryText, /LOC-NYCA-COUNCIL-HANDLE-ROSTERS/);
  assert.doesNotMatch(publicRegistryText, /INTAKE-PROJECT-SOCIAL/);
  assert.doesNotMatch(publicRegistryText, /INTAKE-NYCA-COUNCIL-SOCIAL/);

  const researchNote = readFileSync(
    "docs/knowledge-bank/research/2026-07-14-project-social-media-archival-production.md",
    "utf8"
  );
  assert.doesNotMatch(researchNote, /\/Users\//);
  assert.doesNotMatch(researchNote, /\/Volumes\//);
  assert.doesNotMatch(researchNote, /\b\d{3}[-.)]\s?\d{3}[- ]\d{4}\b/);
  assert.match(
    researchNote,
    /recovered social corpus does not\s+independently establish account creation/i
  );
  assert.doesNotMatch(
    researchNote,
    /interpretation:\s+Jamie established an\s+identity system/i
  );
});

test("WOW List, Sunday Dinner, and Call Script evidence stays aggregate, bounded, and non-projecting", () => {
  const sourceById = new Map(
    knowledgeBank.sources.map((source) => [source.id, source])
  );
  const intakeById = new Map(
    knowledgeBank.intakeItems.map((item) => [item.id, item])
  );
  const wowSource = sourceById.get(
    "SRC-WOWLIST-PRODUCTION-DATABASE-SNAPSHOTS-2016-2017"
  );
  const dinnerSource = sourceById.get(
    "SRC-SUNDAY-DINNER-INVITATION-RESPONSE-WORKBOOK-2025-2026"
  );
  const eventSource = sourceById.get(
    "SRC-CALLSCRIPT-NYCA-DCLA-EVENT-DISCUSSION-2017"
  );
  const memorySource = sourceById.get(
    "SRC-JAMIE-CALLSCRIPT-NYCA-BRIDGE-MEMORY-2026-07-15"
  );
  const wowIntake = intakeById.get(
    "INTAKE-WOWLIST-PRODUCTION-DATABASE-2026-07-15"
  );
  const dinnerIntake = intakeById.get(
    "INTAKE-SUNDAY-DINNER-COMMUNITY-HOSTING-2026-07-13"
  );
  const nycaIntake = intakeById.get(
    "INTAKE-NYCA-CULTURAL-SPACE-POLICY-2026-07-12"
  );

  assert.equal(knowledgeBank.intakeItems.length, 28);
  assert.equal(wowSource.visibility, "protected");
  assert.equal(wowSource.canonicalUrl, undefined);
  assert.equal(dinnerSource.visibility, "protected");
  assert.equal(dinnerSource.canonicalUrl, undefined);
  assert.equal(memorySource.visibility, "protected");
  assert.equal(memorySource.canonicalUrl, undefined);
  assert.match(wowSource.publicNote, /1,846 account rows and 16,142 post-index rows/);
  assert.ok(
    wowSource.supportsGenerally.includes(
      "35 city or region labels with at least 50 geocoded posts or events"
    )
  );
  assert.ok(
    wowSource.doesNotEstablish.some((boundary) =>
      /unique active humans/i.test(boundary)
    )
  );
  assert.match(dinnerSource.publicNote, /52 invitation instances/);
  assert.ok(
    dinnerSource.doesNotEstablish.some((boundary) =>
      /physical attendance/i.test(boundary)
    )
  );
  assert.match(eventSource.canonicalUrl, /facebook\.com\/events\/388137698233507/);
  assert.ok(
    eventSource.doesNotEstablish.some((boundary) =>
      /Call Script alone created NYC Artist Coalition/i.test(boundary)
    )
  );
  assert.equal(wowIntake.status, "claim-candidate");
  assert.equal(wowIntake.projectionStatus, "no-public-projection");
  assert.equal(dinnerIntake.reviewedAt, "2026-07-15");
  assert.equal(nycaIntake.reviewedAt, "2026-07-15");
  assert.equal(
    dinnerIntake.propositions.find(
      (proposition) =>
        proposition.id ===
        "PROP-SUNDAY-DINNER-INVITATION-FOLLOW-THROUGH-SYSTEM-2025-2026"
    ).status,
    "supported-with-boundary"
  );
  assert.equal(
    nycaIntake.propositions.find(
      (proposition) => proposition.id === "PROP-CALLSCRIPT-PARTICIPATION-RELAY-2017"
    ).status,
    "synthesis-with-boundary"
  );
  assert.ok(
    knowledgeBank.pages.every(
      (page) => !["/proofs", "/knowledge-bank"].includes(page.surface)
    )
  );

  const note = readFileSync(
    "docs/knowledge-bank/research/2026-07-15-wowlist-sunday-dinner-callscript-reconciliation.md",
    "utf8"
  );
  assert.doesNotMatch(note, /\/Users\/|\/Volumes\//);
  assert.doesNotMatch(note, /docs\.google\.com|spreadsheets\/d\//i);
  assert.match(note, /445 people responded/);
  assert.match(note, /mutable, access-time response label, not an attendance count/i);
  assert.match(note, /No `\/proofs` or\s+other public knowledge-bank route is created/i);
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
