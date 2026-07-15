import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import {
  validLifecycleJudgments,
  validateKnowledgeLifecycle,
  weightedScore
} from "../lib/knowledge-lifecycle.mjs";

const suite = JSON.parse(readFileSync("evals/knowledge-lifecycle/suite.json", "utf8"));

test("knowledge-lifecycle weights sum to 100", () => {
  assert.equal(suite.rubrics.reduce((sum, rubric) => sum + rubric.weight, 0), 100);
  assert.equal(weightedScore(suite.rubrics, Object.fromEntries(suite.rubrics.map((item) => [item.id, 4]))), 100);
});

test("canonical knowledge bank reaches deterministic lifecycle completion", () => {
  const result = validateKnowledgeLifecycle(knowledgeBank, suite);
  assert.deepEqual(result.findings, []);
  assert.equal(result.score, 100);
  assert.equal(Object.keys(result.scores).length, suite.rubrics.length);
});

test("every supplied URL has a completed intake disposition", () => {
  const intakeByUrl = new Map(
    knowledgeBank.intakeItems.map((item) => [item.submittedUrl, item])
  );
  for (const url of suite.requiredIntakeUrls) {
    const item = intakeByUrl.get(url);
    assert.ok(item, url);
    assert.equal(["promoted", "deferred", "closed"].includes(item.status), true);
  }
});

test("the second research round contains ten unique promoted sources", () => {
  assert.equal(suite.requiredResearchUrls.length, 10);
  assert.equal(new Set(suite.requiredResearchUrls).size, 10);
  const intakeByUrl = new Map(
    knowledgeBank.intakeItems.map((item) => [item.submittedUrl, item])
  );
  for (const url of suite.requiredResearchUrls) {
    const item = intakeByUrl.get(url);
    assert.ok(item, url);
    assert.equal(item.status, "promoted");
    assert.equal(item.sourceIds.length, 1);
    const source = knowledgeBank.sources.find((candidate) => candidate.id === item.sourceIds[0]);
    assert.ok(source, item.sourceIds[0]);
    assert.equal(source.reviewStatus, "reviewed");
    assert.equal(source.supportsGenerally.length > 0, true);
    assert.equal(source.doesNotEstablish.length > 0, true);
    assert.equal(Boolean(source.locator), true);
  }
});

test("memory leads stay deferred until bounded evidence supports promotion", () => {
  const memoryItems = knowledgeBank.intakeItems.filter((item) =>
    item.id.startsWith("INT-2026-07-13-MEMORY")
  );
  assert.equal(memoryItems.length, 4);
  const promoted = memoryItems.find((item) => item.id === "INT-2026-07-13-MEMORY-NYCARTC-TOWN-HALLS");
  assert.equal(promoted.status, "promoted");
  assert.deepEqual(promoted.sourceIds, ["SRC-NYCARTC-JAMIE-EVENT-PRACTICE-CONFIRMATION-2026"]);
  assert.deepEqual(promoted.claimIds, ["CLM-FB-NYCARTC-PARTICIPATION-SYSTEM"]);
  for (const item of memoryItems.filter((candidate) => candidate !== promoted)) {
    assert.equal(item.status, "deferred");
    assert.equal(item.claimIds.length, 0);
    assert.equal(item.inquiryIds.length > 0, true);
    assert.equal(Boolean(item.dispositionReason), true);
  }
});

test("the first lifecycle corpus preserves source support and non-support", () => {
  const initialSourceIds = [
    "SRC-WATER-PITCH-HUCK-FINN-2007",
    "SRC-WATER-CHARLOTTE-STREET-GREAT-ACCOMMODATIONS-2009",
    "SRC-OPEN-HOUSE-GOOD-TIMES-2006",
    "SRC-NYCARTC-GOTHAMIST-CABARET-2017",
    "SRC-NYCARTC-NPR-NIGHTLIFE-2017",
    "SRC-NYCARTC-GREENE-HILL-NEWSLETTER-2017",
    "SRC-NYC-COUNCIL-OFFICE-NIGHTLIFE-2017",
    "SRC-NYC-COUNCIL-CABARET-VOTE-2017"
  ];
  const lifecycleSources = knowledgeBank.sources.filter((source) =>
    initialSourceIds.includes(source.id)
  );
  assert.equal(lifecycleSources.length, 8);
  for (const source of lifecycleSources.filter((item) => item.reviewStatus === "reviewed")) {
    assert.equal(source.supportsGenerally.length > 0, true);
    assert.equal(source.doesNotEstablish.length > 0, true);
    assert.equal(Boolean(source.locator), true);
  }
  assert.equal(lifecycleSources.every((item) => item.reviewStatus === "reviewed"), true);
  assert.equal(
    lifecycleSources.find((item) => item.id === "SRC-NYCARTC-GREENE-HILL-NEWSLETTER-2017")?.preservationStatus,
    "live"
  );
});

test("mature unused claims remain out of public composition", () => {
  const lifecycleClaims = knowledgeBank.claims.filter((claim) =>
    ["water-publics", "open-house", "nyc-artist-coalition"].includes(claim.project)
  );
  const active = lifecycleClaims.filter((claim) => claim.editorialStatus === "active");
  const unused = lifecycleClaims.filter((claim) => claim.editorialStatus === "unused");
  assert.deepEqual(
    active.map((claim) => claim.id).sort(),
    [
      "CLM-FB-NYCARTC-PARTICIPATION-SYSTEM",
      "CLM-NYCARTC-CABARET-LAW-ADVOCACY",
      "CLM-NYCARTC-CAMPAIGN-PRESS-CORPUS",
      "CLM-NYCARTC-EARLY-ORGANIZER-ROLE",
      "CLM-NYCARTC-FOUNDING-ROLE",
      "CLM-NYCARTC-MUTUAL-AID-SIGNUPS",
      "CLM-NYCARTC-OCTOBER-TOWN-HALL",
      "CLM-NYCARTC-SBJSA-TESTIMONY-2018",
      "CLM-TALKS-NOT-RAIDS-LEGISLATIVE-OUTCOME",
      "CLM-TALKS-NOT-RAIDS-PUBLIC-CAMPAIGN"
    ]
  );
  assert.equal(unused.length, 16);
  assert.equal(unused.every((claim) => claim.projections.every((item) => item.status !== "active")), true);
});

test("campaign press corpus preserves every placement and deduplicates sources", () => {
  assert.equal(knowledgeBank.pressCollections.length, 4);
  const counts = Object.fromEntries(
    knowledgeBank.pressCollections.map((collection) => [
      collection.id,
      collection.articles.length
    ])
  );
  assert.deepEqual(counts, {
    "PRESS-LET-NYC-DANCE": 21,
    "PRESS-TALKS-NOT-RAIDS": 7,
    "PRESS-SAVE-NYC-SPACES": 8,
    "PRESS-FAIR-RENT-NYC": 9
  });
  const placements = knowledgeBank.pressCollections.flatMap(
    (collection) => collection.articles
  );
  assert.equal(placements.length, 45);
  assert.equal(new Set(placements.map((article) => article.sourceId)).size, 44);
  for (const collection of knowledgeBank.pressCollections) {
    assert.deepEqual(
      collection.articles.map((article) => article.position),
      collection.articles.map((_, index) => index + 1)
    );
  }
  assert.equal(
    placements.filter((article) => article.sourceId === "SRC-NYCARTC-NPR-NIGHTLIFE-2017").length,
    2
  );
  const pressSourceIds = new Set(placements.map((article) => article.sourceId));
  const pressSources = knowledgeBank.sources.filter((source) => pressSourceIds.has(source.id));
  assert.equal(pressSources.length, 44);
  assert.equal(pressSources.every((source) => Boolean(source.reviewDepth)), true);
  const indexSourceIds = new Set(
    knowledgeBank.pressCollections.map((collection) => collection.indexSourceId)
  );
  const indexSources = knowledgeBank.sources.filter((source) => indexSourceIds.has(source.id));
  assert.equal(indexSources.length, 4);
  assert.equal(indexSources.every((source) => source.reviewDepth === "close-reading"), true);
});

test("press article metadata is reviewed but cannot silently support claims", () => {
  const pressSourceIds = new Set(
    knowledgeBank.pressCollections.flatMap((collection) =>
      collection.articles.map((article) => article.sourceId)
    )
  );
  const metadataSources = knowledgeBank.sources.filter(
    (source) => pressSourceIds.has(source.id) && source.reviewDepth === "metadata"
  );
  assert.equal(metadataSources.length, 41);
  assert.equal(metadataSources.every((source) => source.reviewStatus === "reviewed"), true);
  assert.equal(metadataSources.every((source) => source.supportsGenerally.length > 0), true);
  assert.equal(metadataSources.every((source) => source.doesNotEstablish.length > 0), true);

  const bank = structuredClone(knowledgeBank);
  bank.claims[0].evidence.push({
    sourceId: metadataSources[0].id,
    relationship: "direct-support",
    supports: ["improper article-body support"],
    locator: "Metadata only",
    confidence: "high",
    renderCitation: false
  });
  const result = validateKnowledgeLifecycle(bank, suite);
  assert.equal(
    result.findings.some((item) => item.code === "metadata-as-positive-evidence"),
    true
  );
});

test("press collection sources require an explicit review depth", () => {
  const bank = structuredClone(knowledgeBank);
  const source = bank.sources.find(
    (item) => item.id === bank.pressCollections[0].articles[0].sourceId
  );
  delete source.reviewDepth;
  const result = validateKnowledgeLifecycle(bank, suite);
  assert.equal(
    result.findings.some((item) => item.code === "press-source-missing-review-depth"),
    true
  );
});

test("historical FairRentNYC press inventory uses the archived campaign surface", () => {
  const live = knowledgeBank.intakeItems.find(
    (item) => item.id === "INT-2026-07-13-PRESS-FAIR-RENT-NYC-LIVE"
  );
  const archived = knowledgeBank.intakeItems.find(
    (item) => item.id === "INT-2026-07-13-PRESS-FAIR-RENT-NYC-ARCHIVE"
  );
  assert.equal(live?.status, "closed");
  assert.equal(Boolean(live?.dispositionReason), true);
  assert.equal(archived?.status, "promoted");
  assert.equal(archived?.availability, "archived");
});

test("KC Town Hall preserves the full Board-to-Council funding sequence", () => {
  const required = suite.requiredKcTownHallSequence;
  const sourceIds = new Set(knowledgeBank.sources.map((source) => source.id));
  const claimIds = new Set(knowledgeBank.claims.map((claim) => claim.id));
  for (const sourceId of required.sourceIds) assert.equal(sourceIds.has(sourceId), true, sourceId);
  for (const claimId of required.claimIds) assert.equal(claimIds.has(claimId), true, claimId);

  const councilClaim = knowledgeBank.claims.find(
    (claim) => claim.id === "CLM-KC-TOWN-HALL-COUNCIL-APPROPRIATION"
  );
  assert.ok(councilClaim);
  assert.deepEqual(
    councilClaim.evidence
      .map((evidence) => evidence.sourceId),
    required.requiredAppropriationEvidenceIds
  );
  assert.equal(councilClaim.boundaries.some((boundary) => /disbursement|receipt/i.test(boundary)), true);
  assert.equal(councilClaim.antiClaims.some((antiClaim) => /unanimous/i.test(antiClaim)), true);

  const page = knowledgeBank.pages.find((item) => item.id === required.pageId);
  assert.ok(page);
  assert.deepEqual(
    page.occurrences.map((occurrence) => occurrence.claimId),
    required.publicClaimIds
  );
  assert.equal(
    knowledgeBank.corrections.some((correction) => correction.id === required.correctionId),
    true
  );
});

test("KC Town Hall planning role requires canonical approved-resume evidence", () => {
  const bank = structuredClone(knowledgeBank);
  const claim = bank.claims.find(
    (item) => item.id === suite.requiredKcTownHallSequence.roleClaimId
  );
  claim.evidence = [];
  const result = validateKnowledgeLifecycle(bank, suite);
  assert.equal(result.findings.some((item) => item.code === "kc-role-evidence"), true);
});

test("KC Town Hall planning role cannot drift into exclusive leadership", () => {
  const bank = structuredClone(knowledgeBank);
  const claim = bank.claims.find(
    (item) => item.id === suite.requiredKcTownHallSequence.roleClaimId
  );
  claim.projections[0].text = "Jamie single-handedly led and independently verified every part of KC Town Hall.";
  claim.boundaries = [];
  const result = validateKnowledgeLifecycle(bank, suite);
  assert.equal(result.findings.some((item) => item.code === "kc-role-overclaim"), true);
  assert.equal(result.findings.some((item) => item.code === "kc-role-attribution-boundary"), true);
  assert.equal(result.findings.some((item) => item.code === "kc-role-attribution-loss"), true);
});

test("KC Town Hall planning role cannot lose first-party attribution", () => {
  const bank = structuredClone(knowledgeBank);
  const claim = bank.claims.find(
    (item) => item.id === suite.requiredKcTownHallSequence.roleClaimId
  );
  claim.projections[1].text = "Co-led redevelopment planning and public-benefit documentation.";
  const result = validateKnowledgeLifecycle(bank, suite);
  assert.equal(result.findings.some((item) => item.code === "kc-role-attribution-loss"), true);
});

test("KC Town Hall public composition separates Jamie's role from government action", () => {
  const mdx = readFileSync("apps/www/src/content/work/kc-town-hall.mdx", "utf8");
  const work = readFileSync("apps/www/src/data/work.ts", "utf8");
  const whatIDid = mdx.indexOf("## What I did");
  const publicRecord = mdx.indexOf("## What the public record shows");
  const roleOccurrence = mdx.indexOf('occurrenceId="planning-and-documentation-role"');
  const presenterOccurrence = mdx.indexOf('occurrenceId="presenter-role"');
  const boardOccurrence = mdx.indexOf('occurrenceId="board-recommendation"');
  const acceptanceOccurrence = mdx.indexOf('occurrenceId="council-acceptance"');
  const councilOccurrence = mdx.indexOf('occurrenceId="council-appropriation"');
  const unusedOccurrence = mdx.indexOf('occurrenceId="unused-allocation"');

  assert.ok(whatIDid < roleOccurrence && roleOccurrence < publicRecord);
  assert.ok(whatIDid < presenterOccurrence && presenterOccurrence < publicRecord);
  assert.ok(publicRecord < boardOccurrence && boardOccurrence < acceptanceOccurrence);
  assert.ok(acceptanceOccurrence < councilOccurrence);
  assert.equal(unusedOccurrence, -1);
  assert.match(work, /years: "2015–2024"/);
  assert.match(work, /CLM-KC-TOWN-HALL-PLANNING-AND-DOCUMENTATION-ROLE/);
  assert.match(work, /CLM-KC-TOWN-HALL-COUNCIL-APPROPRIATION/);
  assert.doesNotMatch(work, /stakeholder coordination, and implementation support/i);
  assert.doesNotMatch(work, /reappropriat|unused allocation|unused funds|project withdrew/i);
});

test("KC Town Hall keeps presenter, Board recommendation, acceptance, and appropriation atomic", () => {
  const ids = new Set(knowledgeBank.claims.map((claim) => claim.id));
  assert.equal(ids.has("CLM-KC-TOWN-HALL-PRESENTER-ROLE"), true);
  assert.equal(ids.has("CLM-KC-TOWN-HALL-BOARD-RECOMMENDATION"), true);
  assert.equal(ids.has("CLM-KC-TOWN-HALL-COUNCIL-ACCEPTANCE"), true);
  assert.equal(ids.has("CLM-KC-TOWN-HALL-COUNCIL-APPROPRIATION"), true);
  assert.equal(ids.has("CLM-KC-TOWN-HALL-PRESENTATION-AND-RECOMMENDATION"), false);
});

test("KC Town Hall Council appropriation cannot lose direct ordinance support", () => {
  const bank = structuredClone(knowledgeBank);
  const claim = bank.claims.find(
    (item) => item.id === "CLM-KC-TOWN-HALL-COUNCIL-APPROPRIATION"
  );
  claim.evidence = claim.evidence.filter(
    (evidence) => evidence.sourceId !== "SRC-KC-TOWN-HALL-ORDINANCE-190642"
  );
  const result = validateKnowledgeLifecycle(bank, suite);
  assert.equal(result.findings.some((item) => item.code === "kc-council-evidence"), true);
});

test("KC Town Hall appropriation cannot drift into receipt or Council unanimity", () => {
  const bank = structuredClone(knowledgeBank);
  const claim = bank.claims.find(
    (item) => item.id === "CLM-KC-TOWN-HALL-COUNCIL-APPROPRIATION"
  );
  claim.projections[0].text = "The Council unanimously awarded and disbursed $490,539 to KC Town Hall.";
  claim.boundaries = claim.boundaries.filter((boundary) => !/disbursement|receipt/i.test(boundary));
  claim.antiClaims = claim.antiClaims.filter((antiClaim) => !/unanimous/i.test(antiClaim));
  const result = validateKnowledgeLifecycle(bank, suite);
  assert.equal(result.findings.some((item) => item.code === "kc-funding-overclaim"), true);
  assert.equal(result.findings.some((item) => item.code === "kc-appropriation-boundary"), true);
  assert.equal(result.findings.some((item) => item.code === "kc-council-vote-boundary"), true);
});

test("KC Town Hall withdrawal remains bounded and directly sourced", () => {
  const bank = structuredClone(knowledgeBank);
  const claim = bank.claims.find(
    (item) => item.id === "CLM-KC-TOWN-HALL-UNUSED-ALLOCATION"
  );
  claim.evidence[0].relationship = "context";
  claim.boundaries = [];
  const result = validateKnowledgeLifecycle(bank, suite);
  assert.equal(result.findings.some((item) => item.code === "kc-unused-allocation-evidence"), true);
  assert.equal(result.findings.some((item) => item.code === "kc-withdrawal-causality"), true);
});

test("KC Town Hall transition memory remains deferred and outside public composition", () => {
  const required = suite.requiredKcTownHallSequence;
  const intake = knowledgeBank.intakeItems.find(
    (item) => item.id === required.transitionIntakeId
  );
  const inquiry = knowledgeBank.researchInquiries.find(
    (item) => item.id === required.transitionInquiryId
  );
  const councilInquiry = knowledgeBank.researchInquiries.find(
    (item) => item.id === "INQ-KC-TOWN-HALL-COUNCIL-SEQUENCE"
  );
  const disposition = knowledgeBank.claims.find(
    (item) => item.id === "CLM-KC-TOWN-HALL-UNUSED-ALLOCATION"
  );
  const page = knowledgeBank.pages.find((item) => item.id === required.pageId);

  assert.equal(intake?.kind, "memory");
  assert.equal(intake?.status, "deferred");
  assert.match(intake?.publicSafeDescription ?? "", /mission-aligned organization/);
  assert.deepEqual(intake?.inquiryIds, [required.transitionInquiryId]);
  assert.equal(inquiry?.resultStatus, "inconclusive");
  assert.deepEqual(inquiry?.sourceIds, []);
  assert.equal(councilInquiry?.intakeIds.includes(required.transitionIntakeId), false);
  assert.equal(disposition?.editorialStatus, "unused");
  assert.equal(disposition?.projections.some((projection) => projection.status === "active"), false);
  assert.equal(page?.occurrences.some((occurrence) => occurrence.claimId === disposition?.id), false);

  const bank = structuredClone(knowledgeBank);
  const changedIntake = bank.intakeItems.find((item) => item.id === required.transitionIntakeId);
  const changedDisposition = bank.claims.find((item) => item.id === disposition?.id);
  changedIntake.status = "promoted";
  changedDisposition.editorialStatus = "active";
  changedDisposition.projections[0].status = "active";
  const result = validateKnowledgeLifecycle(bank, suite);
  assert.equal(result.findings.some((item) => item.code === "kc-transition-intake"), true);
  assert.equal(result.findings.some((item) => item.code === "kc-disposition-public-conclusion"), true);
});

test("iCloud Teams archival production covers all required archives and records", () => {
  const required = suite.requiredIcloudArchiveProduction;
  assert.deepEqual(required.archiveNames, ["Jamie Projects History", "CRS", "job-hunt"]);
  assert.equal(required.intakeIds.length, 11);
  assert.equal(required.sourceIds.length, 11);
  assert.equal(required.claimIds.length, 9);
  for (const id of required.projectIds) {
    assert.equal(knowledgeBank.projects.some((item) => item.id === id), true, id);
  }
  for (const id of required.intakeIds) {
    const intake = knowledgeBank.intakeItems.find((item) => item.id === id);
    assert.ok(intake, id);
    assert.equal(intake.status, "promoted");
  }
  for (const id of required.sourceIds) {
    const source = knowledgeBank.sources.find((item) => item.id === id);
    assert.ok(source, id);
    assert.equal(source.reviewStatus, "reviewed");
    assert.equal(source.reviewDepth, "close-reading");
    assert.equal(Boolean(source.locator), true);
    assert.equal(source.supportsGenerally.length > 0, true);
    assert.equal(source.doesNotEstablish.length > 0, true);
  }
});

test("private iCloud artifacts remain opaque and non-renderable", () => {
  const required = suite.requiredIcloudArchiveProduction;
  for (const id of required.privateIntakeIds) {
    const intake = knowledgeBank.intakeItems.find((item) => item.id === id);
    assert.ok(intake, id);
    assert.notEqual(intake.sensitivity, "public-safe");
    assert.equal(intake.availability, "local-private");
    assert.equal(Boolean(intake.protectedLocatorId), true);
    assert.equal(intake.submittedUrl, undefined);
  }
  const privateSourceIds = new Set(
    required.privateIntakeIds.flatMap((id) =>
      knowledgeBank.intakeItems.find((item) => item.id === id)?.sourceIds ?? []
    )
  );
  const privateSources = knowledgeBank.sources.filter((item) => privateSourceIds.has(item.id));
  assert.equal(privateSources.length, required.privateIntakeIds.length);
  assert.equal(privateSources.every((item) => item.visibility !== "public"), true);
  assert.equal(privateSources.every((item) => Boolean(item.protectedLocatorId)), true);
  assert.equal(privateSources.every((item) => !item.canonicalUrl && !item.archiveUrl && !item.assetUrl), true);
  const privateEvidence = knowledgeBank.claims.flatMap((claim) =>
    claim.evidence.filter((evidence) => privateSourceIds.has(evidence.sourceId))
  );
  assert.equal(privateEvidence.every((item) => item.relationship === "private-support"), true);
  assert.equal(privateEvidence.every((item) => item.renderCitation === false), true);
});

test("iCloud archive claims preserve collective credit and proposal boundaries", () => {
  const required = suite.requiredIcloudArchiveProduction;
  const nterChng = knowledgeBank.claims.find((item) => item.id === required.collectiveCreditClaimId);
  assert.match(nterChng?.internalClaim ?? "", /Drew Bolton/);
  assert.match(nterChng?.internalClaim ?? "", /Garrett Fuselier/);
  assert.match(nterChng?.internalClaim ?? "", /Mary Nichols/);
  assert.deepEqual(
    nterChng?.evidence.map((item) => item.sourceId),
    ["SRC-NTER-CHNG-PITCH-2010", "SRC-NTER-CHNG-VIMEO-2011"]
  );

  const createNyc = knowledgeBank.claims.find((item) => item.id === required.collectivePolicyClaimId);
  assert.match(createNyc?.internalClaim ?? "", /collective/i);
  assert.equal(createNyc?.antiClaims.some((item) => /alone|sole/i.test(item)), true);

  const proposal = knowledgeBank.claims.find((item) => item.id === required.proposalClaimId);
  assert.equal(proposal?.projections.every((item) => item.status !== "active"), true);
  assert.equal(proposal?.boundaries.some((item) => /not completion/i.test(item)), true);
  assert.equal(proposal?.antiClaims.some((item) => /production AI memory platform/i.test(item)), true);
});

test("iCloud archive eval rejects private leaks and premature projection", () => {
  const required = suite.requiredIcloudArchiveProduction;
  const bank = structuredClone(knowledgeBank);
  const privateIntake = bank.intakeItems.find((item) => item.id === required.privateIntakeIds[0]);
  const privateSource = bank.sources.find((item) => item.id === privateIntake.sourceIds[0]);
  const candidateClaim = bank.claims.find((item) => item.id === required.proposalClaimId);
  privateIntake.sensitivity = "public-safe";
  privateSource.visibility = "public";
  privateSource.preservationStatus = "live";
  privateSource.canonicalUrl = "https://example.com/private-artifact";
  candidateClaim.editorialStatus = "active";
  candidateClaim.projections[0].status = "active";
  candidateClaim.projections[0].surfaces = ["/lab/source-backed-team-memory"];
  const result = validateKnowledgeLifecycle(bank, suite);
  assert.equal(result.findings.some((item) => item.code === "icloud-private-intake-boundary"), true);
  assert.equal(result.findings.some((item) => item.code === "icloud-premature-projection"), true);
});

test("social archival production reconciles complete populations and preserves explicit gaps", () => {
  const required = suite.requiredSocialArchiveProduction;
  for (const population of required.completePopulations) {
    const claim = knowledgeBank.claims.find((item) => item.id === population.claimId);
    const corpus = knowledgeBank.sources.find((item) => item.id === population.corpusSourceId);
    assert.ok(claim, population.claimId);
    assert.ok(corpus, population.corpusSourceId);
    assert.match(claim.internalClaim, new RegExp(String(population.count)));
    assert.equal(claim.publicationStatus, "internal-only");
    assert.equal(corpus.visibility, "private");
    assert.equal(Boolean(corpus.protectedLocatorId), true);
  }
  const callInquiry = knowledgeBank.researchInquiries.find(
    (item) => item.id === required.callNyc.inquiryId
  );
  assert.match(callInquiry.publicSummary, /107 of 110/);
  const nycInquiry = knowledgeBank.researchInquiries.find(
    (item) => item.id === required.nycArtC.inquiryId
  );
  assert.match(nycInquiry.publicSummary, /748-record/);
  assert.match(nycInquiry.limitations.join(" "), /4,376/);
});

test("social archive eval rejects a partial NYCArtC corpus presented as complete", () => {
  const required = suite.requiredSocialArchiveProduction.nycArtC;
  const bank = structuredClone(knowledgeBank);
  const claim = bank.claims.find((item) => item.id === required.negativeClaimId);
  const inquiry = bank.researchInquiries.find((item) => item.id === required.inquiryId);
  claim.status = "confirmed";
  claim.publicationStatus = "public";
  claim.internalClaim = "The complete @NYCArtC population contains 748 posts.";
  claim.antiClaims = [];
  inquiry.resultStatus = "resolved";
  inquiry.limitations = [];
  const result = validateKnowledgeLifecycle(bank, suite);
  assert.equal(result.findings.some((item) => item.code === "nycartc-population-boundary"), true);
  assert.equal(result.findings.some((item) => item.code === "nycartc-recovery-method"), true);
});

test("CallNYC amplification requires all four posts, officeholder context, and endorsement limits", () => {
  const required = suite.requiredSocialArchiveProduction.callNyc;
  const bank = structuredClone(knowledgeBank);
  const claim = bank.claims.find((item) => item.id === required.amplificationClaimId);
  claim.internalClaim = "Four Council members endorsed CallNYC.";
  claim.evidence = claim.evidence.filter(
    (item) => !required.personSourceIds.includes(item.sourceId)
  );
  claim.boundaries = [];
  claim.antiClaims = [];
  const result = validateKnowledgeLifecycle(bank, suite);
  assert.equal(result.findings.some((item) => item.code === "callnyc-amplification-boundary"), true);
});

test("NYCArtC account-establishment memory cannot erase the multi-author boundary", () => {
  const required = suite.requiredSocialArchiveProduction.nycArtC;
  const bank = structuredClone(knowledgeBank);
  const memory = bank.intakeItems.find((item) => item.id === required.memoryIntakeId);
  const inquiry = bank.researchInquiries.find((item) => item.id === required.roleInquiryId);
  memory.status = "promoted";
  memory.claimIds = ["CLM-X-NYCARTC-CAMPAIGN-IDENTITY"];
  inquiry.limitations = [];
  const result = validateKnowledgeLifecycle(bank, suite);
  assert.equal(result.findings.some((item) => item.code === "nycartc-account-credit"), true);
});

test("Facebook event production accounts for every displayed control slot", () => {
  const required = suite.requiredFacebookEventsArchiveProduction;
  const sources = required.eventIds.map((eventId) =>
    knowledgeBank.sources.find((item) => item.id === `SRC-FB-NYCARTC-EVENT-${eventId}`)
  );
  const entities = required.eventIds.map((eventId) =>
    knowledgeBank.entities.find((item) => item.id === `facebook-nycartc-event-${eventId}`)
  );
  assert.equal(sources.filter(Boolean).length, 33);
  assert.equal(entities.filter(Boolean).length, 33);
  assert.equal(sources.filter((item) => /direct-card-host/.test(item.locator)).length, 24);
  assert.equal(sources.filter((item) => /page-associated/.test(item.locator)).length, 9);
  assert.equal(sources.filter((item) => item.reviewDepth === "close-reading").length, 26);
  assert.equal(sources.filter((item) => item.reviewDepth === "metadata").length, 7);
  assert.equal(sources.filter((item) => item.preservationStatus === "dead").length, 2);
  const inquiry = knowledgeBank.researchInquiries.find((item) => item.id === required.inquiryId);
  assert.equal(inquiry.resultStatus, "partially-recovered");
  assert.match(inquiry.publicSummary, /33 recovered records and one unresolved slot/);
});

test("Facebook event eval rejects a missing event and association promoted to hosting", () => {
  const required = suite.requiredFacebookEventsArchiveProduction;
  const bank = structuredClone(knowledgeBank);
  bank.sources = bank.sources.filter((item) => item.id !== `SRC-FB-NYCARTC-EVENT-${required.eventIds[0]}`);
  const associated = bank.sources.find((item) => item.id === `SRC-FB-NYCARTC-EVENT-${required.associatedEventIds[1]}`);
  associated.locator = associated.locator.replace("page-associated", "direct-card-host");
  associated.doesNotEstablish = associated.doesNotEstablish.filter((item) => !/association alone/i.test(item));
  const result = validateKnowledgeLifecycle(bank, suite);
  assert.equal(result.findings.some((item) => item.code === "facebook-event-population"), true);
  assert.equal(result.findings.some((item) => item.code === "facebook-event-host-boundary"), true);
});

test("Facebook event eval rejects response signals presented as attendance", () => {
  const required = suite.requiredFacebookEventsArchiveProduction;
  const bank = structuredClone(knowledgeBank);
  const claim = bank.claims.find((item) => item.id === required.responseClaimId);
  claim.publicationStatus = "public";
  claim.projections = [{ key: "case-study", text: "1.7K people attended the hearing.", status: "active", citationRequired: true, surfaces: ["/work/fair-rent-nyc"] }];
  claim.boundaries = [];
  claim.antiClaims = [];
  const result = validateKnowledgeLifecycle(bank, suite);
  assert.equal(result.findings.some((item) => item.code === "facebook-event-response-boundary"), true);
});

test("Facebook event eval rejects sole-author role projection and exposed first-party evidence", () => {
  const required = suite.requiredFacebookEventsArchiveProduction;
  const bank = structuredClone(knowledgeBank);
  const source = bank.sources.find((item) => item.id === required.roleSourceId);
  const claim = bank.claims.find((item) => item.id === required.participationClaimId);
  source.visibility = "public";
  source.preservationStatus = "live";
  source.protectedLocatorId = undefined;
  claim.projections[0].text = "Jamie alone organized every NYC Artist Coalition event.";
  claim.boundaries = [];
  claim.antiClaims = [];
  const result = validateKnowledgeLifecycle(bank, suite);
  assert.equal(result.findings.some((item) => item.code === "facebook-event-role-source"), true);
  assert.equal(result.findings.some((item) => item.code === "facebook-event-participation-claim"), true);
});

test("Facebook event role projection cannot drop first-person attribution", () => {
  const required = suite.requiredFacebookEventsArchiveProduction;
  const bank = structuredClone(knowledgeBank);
  const claim = bank.claims.find((item) => item.id === required.participationClaimId);
  claim.claimType = "role";
  claim.projections[0].text = "Jamie helped establish and produce the coalition's recurring participation system.";
  claim.boundaries = claim.boundaries.filter((item) => !/first-person/i.test(item));
  const result = validateKnowledgeLifecycle(bank, suite);
  assert.equal(result.findings.some((item) => item.code === "facebook-event-participation-claim"), true);
});

test("Facebook event public notes do not expose internal response signals", () => {
  const required = suite.requiredFacebookEventsArchiveProduction;
  const bank = structuredClone(knowledgeBank);
  const source = bank.sources.find((item) => item.id === `SRC-FB-NYCARTC-EVENT-${required.eventIds[1]}`);
  source.publicNote = "The captured page displayed 150 people responded.";
  const result = validateKnowledgeLifecycle(bank, suite);
  assert.equal(result.findings.some((item) => item.code === "facebook-event-source"), true);
});

test("Facebook event review depth follows surviving detail availability", () => {
  const required = suite.requiredFacebookEventsArchiveProduction;
  const bank = structuredClone(knowledgeBank);
  const source = bank.sources.find((item) => item.id === `SRC-FB-NYCARTC-EVENT-${required.eventIds[25]}`);
  source.visibility = "public";
  source.preservationStatus = "live";
  source.reviewDepth = "close-reading";
  const result = validateKnowledgeLifecycle(bank, suite);
  assert.equal(result.findings.some((item) => item.code === "facebook-event-source"), true);
});

test("Facebook event eval rejects invented recovery of the unresolved slot", () => {
  const required = suite.requiredFacebookEventsArchiveProduction;
  const bank = structuredClone(knowledgeBank);
  const claim = bank.claims.find((item) => item.id === required.populationClaimId);
  const inquiry = bank.researchInquiries.find((item) => item.id === required.inquiryId);
  claim.internalClaim = "All 34 Facebook event records were recovered.";
  claim.publicationStatus = "public";
  claim.antiClaims = [];
  inquiry.resultStatus = "recovered";
  inquiry.limitations = inquiry.limitations.filter((item) => !/Meta.*export/i.test(item));
  const result = validateKnowledgeLifecycle(bank, suite);
  assert.equal(result.findings.some((item) => item.code === "facebook-event-population-claim"), true);
  assert.equal(result.findings.some((item) => item.code === "facebook-event-inquiry"), true);
});

test("Facebook event eval rejects scheduled officials presented as confirmed attendees", () => {
  const required = suite.requiredFacebookEventsArchiveProduction;
  const bank = structuredClone(knowledgeBank);
  const source = bank.sources.find((item) => item.id === `SRC-FB-NYCARTC-EVENT-${required.stakeholderEventIds[0]}`);
  const claim = bank.claims.find((item) => item.id === required.officialProgramClaimId);
  source.doesNotEstablish = source.doesNotEstablish.filter((item) => !/scheduled stakeholder attended/i.test(item));
  claim.boundaries = [];
  claim.antiClaims = [];
  const result = validateKnowledgeLifecycle(bank, suite);
  assert.equal(result.findings.some((item) => item.code === "facebook-event-stakeholder-boundary"), true);
  assert.equal(result.findings.some((item) => item.code === "facebook-event-official-boundary"), true);
});

test("Facebook event eval keeps posted URLs as private research routing", () => {
  const required = suite.requiredFacebookEventsArchiveProduction;
  const bank = structuredClone(knowledgeBank);
  const source = bank.sources.find((item) => item.id === required.linkSourceId);
  const claim = bank.claims.find((item) => item.id === required.sourceRoutingClaimId);
  source.visibility = "public";
  source.protectedLocatorId = undefined;
  claim.publicationStatus = "public";
  claim.boundaries = [];
  const result = validateKnowledgeLifecycle(bank, suite);
  assert.equal(result.findings.some((item) => item.code === "facebook-event-links"), true);
  assert.equal(result.findings.some((item) => item.code === "facebook-event-source-routing"), true);
});

test("personal and WOW List Facebook event controls account for every current slot", () => {
  const required = suite.requiredPersonalWowlistFacebookEvents;
  const controls = JSON.parse(
    readFileSync(
      "docs/knowledge-bank/data/personal-wowlist-facebook-event-controls.json",
      "utf8"
    )
  );
  assert.equal(controls.personalPastEventsSurface.currentRecords, required.pastCount);
  assert.equal(controls.personalPastEventsSurface.secondPassExactIdMatch, true);
  assert.deepEqual(controls.personalPastEventsSurface.displayedHostAccounting, {
    jamie: required.pastJamieDisplayedHostCount,
    anotherHost: required.pastOtherDisplayedHostCount,
    distinctHostLabelsIncludingUnresolved: required.distinctPastHostLabels
  });
  assert.equal(controls.personalHostedEventsTab.currentRecords, required.hostedCount);
  assert.equal(controls.personalHostedEventsTab.recoveredRecords, required.hostedCount);
  assert.equal(controls.personalHostedEventsTab.unresolvedRecords, 0);
  assert.equal(controls.personalHostedEventsTab.overlapWithPastSurface, required.overlapCount);
  assert.equal(controls.personalHostedEventsTab.hostedTabOnlyRecords, required.hostedOnlyCount);
  assert.equal(controls.personalHostedEventsTab.distinctRecordsAcrossBothTabs, required.distinctUnionCount);
  assert.deepEqual(controls.personalHostedEventsTab.displayedHostAccounting, {
    jamie: required.hostedJamieDisplayedHostCount,
    anotherHost: required.hostedOtherDisplayedHostCount
  });
  assert.equal(controls.wowlist.currentDisplayedRecords, 0);
  assert.equal(controls.wowlist.historicalDisposition, "not-recovered");

  const census = readFileSync(
    "docs/knowledge-bank/data/jamie-facebook-displayed-host-event-census-2026-07-14.csv",
    "utf8"
  ).trim().split("\n");
  assert.equal(census.length, required.pastJamieDisplayedHostCount + 1);
  assert.equal(census.slice(1).every((row) => /,Jamie Burkart,recovered,/.test(row)), true);
  assert.equal(census.filter((row) => row.endsWith("cultural-performance-and-production")).length, 7);
  assert.equal(census.filter((row) => row.endsWith("recurring-hospitality-and-care")).length, 4);
  assert.equal(census.filter((row) => row.endsWith("participatory-place-travel-and-water")).length, 4);
  assert.equal(census.filter((row) => row.endsWith("networked-culture-and-public-history")).length, 3);
  assert.equal(census.filter((row) => row.endsWith("civic-learning-and-making")).length, 2);
});

test("personal Facebook event aggregate omits the relational ledger and mutable metrics", () => {
  const aggregate = [
    readFileSync("docs/knowledge-bank/data/personal-wowlist-facebook-event-controls.json", "utf8"),
    readFileSync("docs/knowledge-bank/data/jamie-facebook-displayed-host-event-census-2026-07-14.csv", "utf8")
  ].join("\n");
  assert.doesNotMatch(aggregate, /"(?:eventId|eventUrl|guestIdentities|friendContext|inviteContext|comments|accountAdmin)"\s*:/i);
  assert.doesNotMatch(aggregate, /^(?:event_id|event_url|guest|relationship|comment|account_admin),/im);
  assert.doesNotMatch(aggregate, /"(?:attendance|went|interested|responses|peopleReached)"\s*:/i);
  assert.doesNotMatch(aggregate, /^(?:attendance|went|interested|responses|people_reached),/im);
});

test("personal Facebook event production preserves selected-source and reserve-depth boundaries", () => {
  const required = suite.requiredPersonalWowlistFacebookEvents;
  for (const sourceId of required.displayedHostSourceIds) {
    const source = knowledgeBank.sources.find((item) => item.id === sourceId);
    assert.ok(source, sourceId);
    assert.equal(source.visibility, "public");
    assert.equal(source.reviewDepth, "close-reading");
    assert.equal(source.author, undefined);
    assert.match(source.publicNote, /bounded platform attribution/);
  }
  for (const claimId of required.claimIds) {
    const claim = knowledgeBank.claims.find((item) => item.id === claimId);
    assert.ok(claim, claimId);
    assert.equal(claim.publicationStatus, "internal-only");
    assert.equal(claim.editorialStatus, "unused");
    assert.equal(claim.projections.some((projection) => projection.status === "active"), false);
  }
  const personalInquiry = knowledgeBank.researchInquiries.find(
    (item) => item.id === required.personalInquiryId
  );
  assert.equal(personalInquiry.resultStatus, "partially-recovered");
  assert.match(personalInquiry.publicSummary, /502 Past IDs and 21 Hosted IDs.*18 overlaps and 505 distinct records/);
});

test("personal Facebook event eval rejects association, authorship, and traction inflation", () => {
  const required = suite.requiredPersonalWowlistFacebookEvents;
  const bank = structuredClone(knowledgeBank);
  const association = bank.claims.find((item) => item.id === required.associationClaimId);
  const hosted = bank.claims.find((item) => item.id === required.hostedClaimId);
  const practice = bank.claims.find((item) => item.id === required.practiceClaimId);
  association.boundaries = [];
  association.antiClaims = [];
  hosted.boundaries = [];
  hosted.antiClaims = [];
  practice.boundaries = [];
  practice.antiClaims = [];
  practice.publicationStatus = "public";
  practice.editorialStatus = "active";
  practice.projections[0].status = "active";
  practice.projections[0].surfaces = ["/about"];
  practice.projections[0].text = "Jamie produced 502 events that reached thousands of people.";
  const result = validateKnowledgeLifecycle(bank, suite);
  assert.equal(result.findings.some((item) => item.code === "personal-facebook-credit-boundary"), true);
  assert.equal(result.findings.some((item) => item.code === "personal-facebook-practice-claim"), true);
  assert.equal(result.findings.some((item) => item.code === "personal-facebook-projection-boundary"), true);
});

test("personal Facebook event eval keeps posted URLs as routing and WOW List as non-recovery", () => {
  const required = suite.requiredPersonalWowlistFacebookEvents;
  const bank = structuredClone(knowledgeBank);
  const practice = bank.claims.find((item) => item.id === required.practiceClaimId);
  const wowlist = bank.claims.find((item) => item.id === required.wowlistNegativeClaimId);
  practice.evidence.push({
    sourceId: required.postedDestinationSourceIds[0],
    relationship: "direct-support",
    supports: ["participant endorsement"],
    confidence: "high",
    renderCitation: false
  });
  wowlist.status = "confirmed";
  wowlist.internalClaim = "WOW List never had a Facebook event.";
  wowlist.boundaries = [];
  wowlist.antiClaims = [];
  const result = validateKnowledgeLifecycle(bank, suite);
  assert.equal(result.findings.some((item) => item.code === "personal-facebook-posted-url-boundary"), true);
  assert.equal(result.findings.some((item) => item.code === "wowlist-facebook-nonrecovery-boundary"), true);
});

test("WOW List Facebook post production reconciles the full current public population", () => {
  const required = suite.requiredWowlistFacebookPosts;
  const controls = JSON.parse(readFileSync(required.controlPath, "utf8"));
  assert.equal(controls.publicTimeline.terminalTraversalPasses, 2);
  assert.equal(controls.publicTimeline.exactFingerprintMatchAcrossPasses, true);
  assert.equal(controls.publicTimeline.postLikeVariants, required.renderVariantCount);
  assert.equal(controls.publicTimeline.excludedRenderArtifacts, 2);
  assert.equal(controls.publicTimeline.retainedUniquePosts, required.currentPostCount);
  assert.deepEqual(controls.publicTimeline.publisherMetadata, {
    "Jamie Burkart": required.publisherCount
  });
  assert.equal(
    controls.surfaceReconciliation.lifetimeContentLibraryRows,
    required.contentLibraryCount
  );
  assert.equal(
    controls.surfaceReconciliation.contentLibraryIsHistoricalPopulationControl,
    false
  );
  assert.equal(
    controls.currentEngagementDisplay.postsWithVisibleReactions,
    required.postsWithVisibleReactions
  );
  assert.equal(
    controls.currentEngagementDisplay.visibleReactions,
    required.visibleReactionCount
  );
  assert.equal(
    controls.postedUrlInventory.resolvedOccurrences,
    required.resolvedUrlOccurrences
  );
  assert.equal(
    controls.postedUrlInventory.distinctResolvedDestinations,
    required.distinctResolvedUrls
  );
  assert.equal(
    controls.postedUrlInventory.wowlistOrgOccurrences,
    required.wowlistOrgOccurrences
  );
  assert.equal(controls.privateArtifactId, "wowlist-facebook-public-post-census-2026-07-14");
});

test("WOW List Facebook sources and claims preserve publisher and collective-credit boundaries", () => {
  const required = suite.requiredWowlistFacebookPosts;
  for (const sourceId of required.sourceIds) {
    const source = knowledgeBank.sources.find((item) => item.id === sourceId);
    assert.ok(source, sourceId);
  }
  for (const claimId of required.claimIds) {
    const claim = knowledgeBank.claims.find((item) => item.id === claimId);
    assert.ok(claim, claimId);
    assert.equal(claim.publicationStatus, "internal-only");
    assert.equal(claim.projections.some((projection) => projection.status === "active"), false);
  }

  const publisher = knowledgeBank.claims.find(
    (item) => item.id === required.publisherClaimId
  );
  assert.match(publisher.internalClaim, /all 54 unique posts/);
  assert.match(publisher.boundaries.join(" "), /not sole Page administration/i);
  assert.match(publisher.boundaries.join(" "), /Richard Album/);

  const management = knowledgeBank.claims.find(
    (item) => item.id === required.managementClaimId
  );
  assert.equal(management.status, "use-with-care");
  assert.match(management.internalClaim, /recalls managing/i);
  assert.deepEqual(
    management.evidence.map((item) => item.sourceId),
    [required.memorySourceId, required.corpusSourceId]
  );
});

test("WOW List Facebook eval rejects historical-population and sole-management inflation", () => {
  const required = suite.requiredWowlistFacebookPosts;
  const bank = structuredClone(knowledgeBank);
  const population = bank.claims.find(
    (item) => item.id === required.populationClaimId
  );
  const publisher = bank.claims.find(
    (item) => item.id === required.publisherClaimId
  );
  const management = bank.claims.find(
    (item) => item.id === required.managementClaimId
  );
  population.internalClaim = "WOW List published exactly 54 Facebook posts in its history.";
  population.boundaries = [];
  population.antiClaims = [];
  publisher.internalClaim = "Jamie was the sole administrator and author of every WOW List post.";
  publisher.boundaries = [];
  publisher.antiClaims = [];
  management.internalClaim = "Jamie definitively and exclusively controlled every WOW List social account.";
  management.status = "confirmed";
  management.boundaries = [];
  management.antiClaims = [];
  const result = validateKnowledgeLifecycle(bank, suite);
  assert.equal(
    result.findings.some((item) => item.code === "wowlist-facebook-post-population-claim"),
    true
  );
  assert.equal(
    result.findings.some((item) => item.code === "wowlist-facebook-publisher-boundary"),
    true
  );
  assert.equal(
    result.findings.some((item) => item.code === "wowlist-facebook-management-role-boundary"),
    true
  );
});

test("WOW List Facebook eval keeps engagement and posted URLs out of impact claims", () => {
  const required = suite.requiredWowlistFacebookPosts;
  const bank = structuredClone(knowledgeBank);
  const engagement = bank.claims.find(
    (item) => item.id === required.engagementClaimId
  );
  const routing = bank.claims.find((item) => item.id === required.urlClaimId);
  engagement.publicationStatus = "public";
  engagement.editorialStatus = "active";
  engagement.projections = [{
    key: "case-study",
    text: "303 people attended a WOW List event and the current reaction sum proves impact.",
    status: "active",
    citationRequired: true,
    surfaces: ["/work/wowlist"]
  }];
  engagement.boundaries = [];
  engagement.antiClaims = [];
  routing.internalClaim = "Every linked organization endorsed WOW List and every link produced outcomes.";
  routing.boundaries = [];
  routing.antiClaims = [];
  const result = validateKnowledgeLifecycle(bank, suite);
  assert.equal(
    result.findings.some((item) => item.code === "wowlist-facebook-post-projection-boundary"),
    true
  );
  assert.equal(
    result.findings.some((item) => item.code === "wowlist-facebook-engagement-boundary"),
    true
  );
  assert.equal(
    result.findings.some((item) => item.code === "wowlist-facebook-posted-url-boundary"),
    true
  );
});

test("NYC Artist Coalition Facebook post production reconciles the full current surface", () => {
  const required = suite.requiredNycArtcFacebookPosts;
  const controls = JSON.parse(readFileSync(required.controlPath, "utf8"));
  assert.equal(controls.publicTimeline.terminalTraversalPasses, 2);
  assert.equal(controls.publicTimeline.exactIdentitySetMatchAcrossPasses, true);
  assert.equal(controls.publicTimeline.retainedUniquePosts, required.currentPostCount);
  assert.equal(controls.publicTimeline.firstPassSortedIdSetSha256, required.sortedIdSetSha256);
  assert.equal(controls.publicTimeline.secondPassSortedIdSetSha256, required.sortedIdSetSha256);
  assert.deepEqual(controls.publicTimeline.fingerprintPreimage, {
    input: "each retained records[].key exactly as captured",
    encoding: "UTF-8",
    normalization: "none",
    ordering: "ascending bytewise order under LC_ALL=C",
    delimiter: "LF",
    trailingDelimiter: true,
    duplicatePolicy: "one line for each of 444 unique retained keys",
    algorithm: "SHA-256"
  });
  assert.equal(controls.forms.eventRoute, required.eventRouteCount);
  assert.equal(controls.forms.standalonePost, required.standalonePostCount);
  assert.equal(controls.forms.originalMediaPost, required.originalMediaPostCount);
  assert.equal(controls.forms.resharedStory, required.resharedStoryCount);
  assert.equal(controls.forms.sourceOrResourceRoute, required.sourceRouteCount);
  assert.equal(controls.forms.total, required.currentPostCount);
  assert.equal(
    controls.currentVisibleInteractionSnapshot.recordsWithAtLeastOneSignal,
    required.postsWithVisibleSignals
  );
  assert.equal(controls.currentVisibleInteractionSnapshot.reactions, required.visibleReactions);
  assert.equal(controls.currentVisibleInteractionSnapshot.comments, required.visibleComments);
  assert.equal(controls.currentVisibleInteractionSnapshot.shares, required.visibleShares);
  assert.equal(controls.postedUrlInventory.outboundLinkOccurrences, required.outboundLinkOccurrences);
  assert.equal(controls.postedUrlInventory.uniqueUrls, required.uniqueOutboundUrls);
  assert.equal(controls.stakeholderRouteOccurrences.nycCouncilMembersAndCouncil, required.councilRouteOccurrences);
  assert.equal(controls.privateArtifactId, "nycartc-facebook-public-post-census-2026-07-14");
});

test("NYC Artist Coalition Facebook records preserve collective credit and role evidence separation", () => {
  const required = suite.requiredNycArtcFacebookPosts;
  for (const id of required.sourceIds) {
    assert.ok(knowledgeBank.sources.find((item) => item.id === id), id);
  }
  for (const id of required.claimIds) {
    const claim = knowledgeBank.claims.find((item) => item.id === id);
    assert.ok(claim, id);
    assert.equal(claim.publicationStatus, "internal-only");
    assert.equal(claim.projections.some((projection) => projection.status === "active"), false);
  }
  const role = knowledgeBank.claims.find((item) => item.id === required.roleClaimId);
  assert.equal(role.status, "use-with-care");
  assert.match(role.internalClaim, /recalls.*predominantly.*other coalition participants/i);
  assert.deepEqual(role.evidence.map((item) => item.sourceId), [
    required.memorySourceId,
    required.managementControlSourceId,
    required.contentControlSourceId
  ]);
  assert.match(role.boundaries.join(" "), /Do not assign any specific post/i);
});

test("NYC Artist Coalition Facebook eval rejects population, stakeholder, and role inflation", () => {
  const required = suite.requiredNycArtcFacebookPosts;
  const bank = structuredClone(knowledgeBank);
  const population = bank.claims.find((item) => item.id === required.populationClaimId);
  const stakeholder = bank.claims.find((item) => item.id === required.stakeholderClaimId);
  const role = bank.claims.find((item) => item.id === required.roleClaimId);
  population.internalClaim = "NYC Artist Coalition published exactly 444 Facebook posts in its history.";
  population.boundaries = [];
  population.antiClaims = [];
  stakeholder.internalClaim = "Eighty-eight NYC Council members engaged with and endorsed the Page.";
  stakeholder.boundaries = [];
  stakeholder.antiClaims = [];
  role.internalClaim = "Jamie was the sole historical administrator and author of all 444 posts.";
  role.status = "confirmed";
  role.boundaries = [];
  role.antiClaims = [];
  const result = validateKnowledgeLifecycle(bank, suite);
  assert.equal(result.findings.some((item) => item.code === "nycartc-facebook-post-population-claim"), true);
  assert.equal(result.findings.some((item) => item.code === "nycartc-facebook-stakeholder-boundary"), true);
  assert.equal(result.findings.some((item) => item.code === "nycartc-facebook-role-boundary"), true);
});

test("NYC Artist Coalition Facebook eval keeps counters and posted URLs out of impact claims", () => {
  const required = suite.requiredNycArtcFacebookPosts;
  const bank = structuredClone(knowledgeBank);
  const engagement = bank.claims.find((item) => item.id === required.engagementClaimId);
  const routing = bank.claims.find((item) => item.id === required.urlClaimId);
  engagement.publicationStatus = "public";
  engagement.editorialStatus = "active";
  engagement.projections = [{
    key: "case-study",
    text: "The Page reached 2,374 people and proved coalition impact.",
    status: "active",
    citationRequired: true,
    surfaces: ["/work/fair-rent-nyc"]
  }];
  engagement.boundaries = [];
  engagement.antiClaims = [];
  routing.internalClaim = "Every linked source was true and every linked organization endorsed the coalition.";
  routing.boundaries = [];
  routing.antiClaims = [];
  const result = validateKnowledgeLifecycle(bank, suite);
  assert.equal(result.findings.some((item) => item.code === "nycartc-facebook-post-projection-boundary"), true);
  assert.equal(result.findings.some((item) => item.code === "nycartc-facebook-engagement-boundary"), true);
  assert.equal(result.findings.some((item) => item.code === "nycartc-facebook-posted-url-boundary"), true);
});

test("Google Drive archival production keeps private sources, media holds, and asset counts bounded", () => {
  const required = suite.requiredGoogleDriveArchiveProduction;
  for (const sourceId of required.sourceIds) {
    const source = knowledgeBank.sources.find((item) => item.id === sourceId);
    assert.ok(source, sourceId);
    assert.notEqual(source.visibility, "public");
    assert.equal(Boolean(source.protectedLocatorId), true);
    assert.equal(source.canonicalUrl, undefined);
  }
  const media = knowledgeBank.sources.find((item) => item.id === required.fairRentMediaSourceId);
  assert.deepEqual(media.media, {
    mediaKind: "other",
    rightsStatus: "permission-needed",
    consentStatus: "review-needed",
    publicDisplayStatus: "hold"
  });
  const sundayDinner = knowledgeBank.claims.find((item) => item.id === required.sundayDinnerClaimId);
  assert.match(sundayDinner.antiClaims.join(" "), /33 Zoom events/);
});

test("Google Drive eval rejects exposed locators, cleared media, and event-count inflation", () => {
  const required = suite.requiredGoogleDriveArchiveProduction;
  const bank = structuredClone(knowledgeBank);
  const source = bank.sources.find((item) => item.id === required.sourceIds[0]);
  const media = bank.sources.find((item) => item.id === required.fairRentMediaSourceId);
  const sundayDinner = bank.claims.find((item) => item.id === required.sundayDinnerClaimId);
  source.visibility = "public";
  source.canonicalUrl = "https://drive.google.com/private-artifact";
  media.media.rightsStatus = "cleared";
  media.media.consentStatus = "cleared";
  media.media.publicDisplayStatus = "approved";
  sundayDinner.internalClaim = "Sunday Dinner held 33 Zoom events.";
  sundayDinner.boundaries = [];
  sundayDinner.antiClaims = [];
  const result = validateKnowledgeLifecycle(bank, suite);
  assert.equal(result.findings.some((item) => item.code === "drive-private-source-boundary"), true);
  assert.equal(result.findings.some((item) => item.code === "drive-media-rights"), true);
  assert.equal(result.findings.some((item) => item.code === "drive-asset-event-boundary"), true);
});

test("missing supplied URLs fail capture integrity", () => {
  const result = validateKnowledgeLifecycle({ ...knowledgeBank, intakeItems: [] }, suite);
  assert.equal(result.findings.filter((item) => item.code === "missing-required-intake").length, suite.requiredIntakeUrls.length);
  assert.equal(result.scores.capture_integrity, 0);
});

test("private filesystem paths fail projection restraint", () => {
  const bank = structuredClone(knowledgeBank);
  bank.projects[0].summary = "See /private/tmp/secret";
  const result = validateKnowledgeLifecycle(bank, suite);
  assert.equal(result.findings.some((item) => item.code === "private-path"), true);
});

test("immature public projections fail closed", () => {
  const bank = structuredClone(knowledgeBank);
  const activeClaim = bank.claims.find((claim) =>
    claim.projections.some(
      (projection) =>
        projection.status === "active" &&
        projection.surfaces.some((surface) => surface.startsWith("/"))
    )
  );
  activeClaim.status = "inference";
  const result = validateKnowledgeLifecycle(bank, suite);
  assert.equal(result.findings.some((item) => item.code === "immature-active"), true);
});

test("candidate-bound judgments reject stale evidence", () => {
  const judgment = {
    judgeId: "judge-a",
    lens: "archival-editorial",
    candidate: "sha256:candidate",
    contract: "sha256:contract",
    passes: true,
    scores: Object.fromEntries(suite.rubrics.map((rubric) => [rubric.id, 3])),
    regressions: []
  };
  assert.equal(validLifecycleJudgments({ judgments: [judgment], candidate: "sha256:candidate", contract: "sha256:contract", suite }).length, 1);
  assert.equal(validLifecycleJudgments({ judgments: [judgment], candidate: "sha256:new", contract: "sha256:contract", suite }).length, 0);
});
