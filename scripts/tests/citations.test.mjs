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
  kcSpacesRecipientSocialSourceIds,
  nycaCouncilSocialSourceIds,
  nycaOlympiaSocialSourceId,
  projectSocialSourceIds,
  projectSocialSources
} from "../../apps/www/src/data/knowledge-bank/projectSocial.ts";
import { citationNoteId, getClaimProjection, publicCitationRegistry, resolveCitationOccurrence, resolveCitationReferences } from "../../apps/www/src/data/knowledge-bank/public.ts";
import { intakeItemSchema } from "../../apps/www/src/data/knowledge-bank/schema.ts";
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

test("iCloud Teams sources preserve public and protected evidence boundaries", () => {
  const sourceById = new Map(
    knowledgeBank.sources.map((source) => [source.id, source])
  );
  const selectedSourceIds = [
    "SRC-NTER-CHNG-PITCH-2010-01-07",
    "SRC-NTER-CHNG-VIMEO-METADATA-2011-03-23",
    "SRC-MONTHLY-MUSIC-HACKATHON-SORTED-AUDIO-2013-02-27",
    "SRC-MATMOS-VAGUE-TERRAIN-VIDEO-2016-11-26",
    "SRC-CLAUDETTES-THEATRE-XR-ENSEMBLE-2022-10-29",
    "SRC-CRS-NINETY-DAY-OPERATING-PLAN-2026-04-06",
    "SRC-CRS-COLLABORATION-RUNNING-MINUTES-2026-04-29",
    "SRC-CRS-OPEN-DATA-FOUNDATION-MEMO-2025-11-26",
    "SRC-CRS-FULLER-PUBLIC-BASELINE-HANDOUT-2026-03-27",
    "SRC-JOB-HUNT-CROSS-ARCHIVE-EVIDENCE-MAP-2026-07-03",
    "SRC-MAVEN-AI-EVALS-COMPLETION-2026",
    "SRC-SOURCE-BACKED-SPRINT-PREP-2026-06-30"
  ];

  assert.ok(selectedSourceIds.every((sourceId) => sourceById.has(sourceId)));
  const protectedSources = selectedSourceIds
    .map((sourceId) => sourceById.get(sourceId))
    .filter((source) => source.visibility === "protected");
  assert.equal(protectedSources.length, 7);
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
      .get("SRC-MATMOS-VAGUE-TERRAIN-VIDEO-2016-11-26")
      .doesNotEstablish.some((boundary) => /Jamie Burkhardt is Jamie Burkart/i.test(boundary))
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

  assert.equal(interactive.status, "claim-candidate");
  assert.equal(crs.status, "claim-candidate");
  assert.equal(evals.status, "claim-candidate");
  assert.equal(interactive.candidateClaims.length, 3);
  assert.equal(crs.candidateClaims.length, 4);
  assert.equal(evals.candidateClaims.length, 2);
  assert.ok([interactive, crs, evals].every((item) => item.projectionStatus === "no-public-projection"));
  assert.equal(
    interactive.propositions.find(
      (proposition) => proposition.id === "PROP-MATMOS-TOUR-VIDEO-NAME-CONFLICT-2016"
    ).status,
    "research-only"
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
  assert.doesNotMatch(publicRegistryText, /SRC-CRS-NINETY-DAY-OPERATING-PLAN/);
  assert.doesNotMatch(publicRegistryText, /SRC-SOURCE-BACKED-SPRINT-PREP/);
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
  assert.equal(projectSocialSources.length, 51);
  assert.equal(new Set(projectSocialSourceIds).size, 51);
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
  assert.equal(nyca.status, "researching");
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

  assert.ok(
    [socialIdentity, wowList, kcSpaces, kcTownHall].every(
      (item) =>
        item.status === "researching" &&
        item.projectionStatus === "no-public-projection" &&
        item.candidateClaims.length === 0
    )
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
  assert.ok(
    kcTownHall.boundaries.some((boundary) => /family crisis/i.test(boundary))
  );
  assert.ok(
    kcTownHall.boundaries.some((boundary) =>
      /post-transition posts or program outcomes/i.test(boundary)
    )
  );
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

test("rendering primitives preserve no-JavaScript document semantics", () => {
  const cite = readFileSync("apps/www/src/components/citations/Cite.tsx", "utf8");
  const references = readFileSync("apps/www/src/components/citations/References.tsx", "utf8");
  const sourceNote = readFileSync("apps/www/src/components/citations/SourceNote.tsx", "utf8");
  assert.match(cite, /role="doc-noteref"/);
  assert.match(references, /role="doc-endnotes"/);
  assert.match(references, /<ol>/);
  assert.match(sourceNote, /role="doc-backlink"/);
});
