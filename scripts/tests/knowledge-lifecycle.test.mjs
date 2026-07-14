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

test("memory leads remain inquiries rather than confirmed claims", () => {
  const memoryItems = knowledgeBank.intakeItems.filter((item) =>
    item.id.startsWith("INT-2026-07-13-MEMORY")
  );
  assert.equal(memoryItems.length, 4);
  for (const item of memoryItems) {
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
  assert.equal(unused.length, 12);
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
  const metadataSources = knowledgeBank.sources.filter(
    (source) => source.reviewDepth === "metadata"
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
    required.claimIds
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
  assert.ok(acceptanceOccurrence < councilOccurrence && councilOccurrence < unusedOccurrence);
  assert.match(work, /years: "2015–2024"/);
  assert.match(work, /CLM-KC-TOWN-HALL-PLANNING-AND-DOCUMENTATION-ROLE/);
  assert.match(work, /CLM-KC-TOWN-HALL-COUNCIL-APPROPRIATION/);
  assert.doesNotMatch(work, /stakeholder coordination, and implementation support/i);
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
  bank.claims[0].status = "inference";
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
