import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import {
  campaignPressEntries,
  campaignPressExpectedCounts,
  campaignPressIndexes,
  campaignPressIntake
} from "../../apps/www/src/data/knowledge-bank/campaign-press.ts";
import { citationNoteId, getClaimProjection, publicCitationRegistry, resolveCitationOccurrence, resolveCitationReferences } from "../../apps/www/src/data/knowledge-bank/public.ts";
import { validateKnowledgeBank } from "../lib/citation-validation.mjs";

test("canonical registry passes deterministic validation", () => assert.deepEqual(validateKnowledgeBank(), []));

test("work-page citation IDs match their route slugs", () => {
  for (const page of knowledgeBank.pages.filter((item) => item.surface.startsWith("/work/"))) {
    assert.equal(page.id, page.surface.slice("/work/".length));
  }
});

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

test("rendering primitives preserve no-JavaScript document semantics", () => {
  const cite = readFileSync("apps/www/src/components/citations/Cite.tsx", "utf8");
  const references = readFileSync("apps/www/src/components/citations/References.tsx", "utf8");
  const sourceNote = readFileSync("apps/www/src/components/citations/SourceNote.tsx", "utf8");
  assert.match(cite, /role="doc-noteref"/);
  assert.match(references, /role="doc-endnotes"/);
  assert.match(references, /<ol>/);
  assert.match(sourceNote, /role="doc-backlink"/);
});

test("intake has no silent loss and memories are not auto-promoted", () => {
  assert.equal(knowledgeBank.intake.length, 51 + campaignPressIntake.length);
  assert.ok(knowledgeBank.intake.every((item) => item.status !== "received"));
  assert.ok(knowledgeBank.intake.every((item) =>
    item.sourceIds.length + item.claimIds.length + item.inquiryIds.length > 0
  ));
  const officeLead = knowledgeBank.intake.find(
    (item) => item.id === "LEAD-OFFICE-NIGHTLIFE-ROLE-MEMORY"
  );
  assert.equal(officeLead.status, "researching");
  assert.deepEqual(officeLead.claimIds, []);
  assert.deepEqual(officeLead.inquiryIds, ["INQ-NYCARTC-OFFICE-NIGHTLIFE-ROLE"]);
  assert.ok(
    knowledgeBank.intake.some(
      (item) => item.id === "LEAD-CALLNYC-FULL-POPULATION-CORPUS-2026"
    )
  );
  assert.ok(
    knowledgeBank.intake.some(
      (item) => item.id === "LEAD-RIVER-RAFT-KC-STAR-2007"
    )
  );
  assert.ok(
    knowledgeBank.intake.some(
      (item) => item.id === "LEAD-NYCARTC-GOVERNMENT-INSTITUTIONAL-VALUE-2026"
    )
  );
  assert.ok(
    knowledgeBank.intake.some(
      (item) => item.id === "LEAD-NYCARTC-FULL-POPULATION-CORPUS-2026"
    )
  );
  assert.ok(
    knowledgeBank.intake.some(
      (item) => item.id === "LEAD-WOWLIST-FULL-POPULATION-CORPUS-2026"
    )
  );
  assert.ok(
    knowledgeBank.intake.some(
      (item) => item.id === "LEAD-WOWLIST-DATABASE-SCALE-2026"
    )
  );
  assert.ok(
    knowledgeBank.intake.some(
      (item) => item.id === "LEAD-SUNDAY-DINNER-ATTENDANCE-WORKBOOK-2026"
    )
  );
  assert.ok(
    knowledgeBank.intake.some(
      (item) => item.id === "LEAD-CALLSCRIPT-NYCARTC-FORMATION-LINEAGE-2026"
    )
  );
  assert.ok(
    knowledgeBank.intake.some(
      (item) => item.id === "LEAD-KC-TOWN-HALL-FULL-POPULATION-CORPUS-2026"
    )
  );
  assert.ok(
    knowledgeBank.intake.some(
      (item) => item.id === "LEAD-URBANHERMIT-FULL-POPULATION-CORPUS-2026"
    )
  );
  assert.ok(
    knowledgeBank.intake.some(
      (item) => item.id === "LEAD-NYCAC-FACEBOOK-EVENT-FULL-POPULATION-2026"
    )
  );
  for (const intakeId of [
    "LEAD-ICLOUD-JAMIE-PROJECTS-HISTORY-PASS-2026",
    "LEAD-ICLOUD-CRS-OPERATING-BACKBONE-PASS-2026",
    "LEAD-ICLOUD-JOB-HUNT-PROOF-AUDIT-2026",
    "LEAD-ICLOUD-JPH-CREATIVE-TECHNOLOGY-EXPANSION-2026",
    "LEAD-ICLOUD-CRS-THIRTY-FOUR-PAGE-VERIFICATION-2026",
    "LEAD-ICLOUD-JOB-HUNT-JULY-RESUME-AUDIT-2026",
    "LEAD-NTER-CHNG-ARCHIVE-EXHIBITION-EXPANSION-2026",
    "LEAD-NTER-CHNG-GDRIVE-ARTIFACTS-2026"
  ]) {
    assert.ok(knowledgeBank.intake.some((item) => item.id === intakeId));
  }
});

test("publication decisions keep reserve depth off the current site", () => {
  assert.equal(knowledgeBank.publicationDecisions.length, knowledgeBank.claims.length);
  const decisionByClaim = new Map(
    knowledgeBank.publicationDecisions.map((item) => [item.claimId, item])
  );
  assert.ok(knowledgeBank.claims.every(
    (claim) => decisionByClaim.get(claim.id)?.decision === claim.editorialStatus
  ));
  assert.equal(
    decisionByClaim.get("CLM-NYCARTC-CABARET-ORGANIZING").decision,
    "selected"
  );
  assert.equal(
    decisionByClaim.get("CLM-RIVER-RAFT-EXPEDITION").decision,
    "reserve"
  );
  assert.throws(
    () => getClaimProjection(
      "CLM-RIVER-RAFT-EXPEDITION",
      "archive-note",
      "/work/fair-rent-nyc"
    ),
    /Unknown public claim|not approved/
  );
});

test("new civic projection has a bounded page-local citation", () => {
  const occurrence = resolveCitationOccurrence("fair-rent-nyc", "cabaret-organizing");
  assert.equal(occurrence.claim.id, "CLM-NYCARTC-CABARET-ORGANIZING");
  assert.deepEqual(occurrence.sources.map((item) => item.number), [1, 2]);
  assert.match(occurrence.claim.boundaries.join(" "), /not sole causality/i);
});

test("ten-source research set is canonical, bounded, and non-orphaned", () => {
  const sourceIds = new Set(knowledgeBank.sources.map((item) => item.id));
  const researchSet = [
    "SRC-GHFC-JAMIE-JULIA-QA-2017",
    "SRC-BEDFORD-BOWERY-DIY-SPACES-2017",
    "SRC-VICE-NYCARTC-DCA-2017",
    "SRC-BEDFORD-BOWERY-NIGHT-MAYOR-2017",
    "SRC-SAVE-NYC-SPACES-CAMPAIGN",
    "SRC-EDGE-OF-SOUND-SAVE-NYC-SPACES-2017",
    "SRC-NYC-COUNCIL-CABARET-HEARING-2017",
    "SRC-TALKS-NOT-RAIDS-CAMPAIGN",
    "SRC-NYC-COUNCIL-MARCH-REPORTING-2019",
    "SRC-KCMO-CCED-ROUND2-MINUTES-2019"
  ];
  assert.ok(researchSet.every((id) => sourceIds.has(id)));
  assert.ok(researchSet.every((id) => {
    const source = knowledgeBank.sources.find((item) => item.id === id);
    return source.visibility === "public" && source.doesNotEstablish.length > 0;
  }));
  const referenced = new Set([
    ...knowledgeBank.claims.flatMap((claim) => claim.evidence.map((item) => item.sourceId)),
    ...knowledgeBank.researchInquiries.flatMap((inquiry) => inquiry.sourceIds)
  ]);
  assert.ok(researchSet.every((id) => referenced.has(id)));
});

test("evidence expansion selectively strengthens three public case studies", () => {
  const early = resolveCitationOccurrence("fair-rent-nyc", "early-mutual-aid-organizing");
  const march = resolveCitationOccurrence("fair-rent-nyc", "march-transparency");
  const sunday = resolveCitationOccurrence("196-sunday-dinner", "weekly-open-gathering");
  const kc = resolveCitationOccurrence("kc-town-hall", "council-allocation");

  assert.match(early.claim.boundaries.join(" "), /not sole founder/i);
  assert.match(march.claim.boundaries.join(" "), /not sole causality/i);
  assert.match(sunday.claim.boundaries.join(" "), /not the 300-plus/i);
  assert.deepEqual(kc.sources.map((item) => item.number), [3, 4, 5]);
  assert.match(kc.claim.boundaries.join(" "), /executed funding agreement/i);
  assert.match(kc.claim.boundaries.join(" "), /receipt or disbursement/i);
});

test("KC Town Hall public identity evidence precedes the allocation record", () => {
  const identity = resolveCitationOccurrence("kc-town-hall", "durable-public-identity");
  assert.equal(identity.claim.id, "CLM-KC-TOWN-HALL-DURABLE-PUBLIC-IDENTITY");
  assert.deepEqual(identity.sources.map((item) => item.number), [1, 2]);
  assert.match(identity.claim.boundaries.join(" "), /account was shared/i);
  assert.match(identity.claim.boundaries.join(" "), /not assigned to him without direct evidence/i);
});

test("new evidence reduces proof debt without erasing open questions", () => {
  const coverage = new Map(
    knowledgeBank.proofCoverage.map((item) => [item.proofId, item])
  );
  assert.equal(coverage.get("wowlist-community-platform").status, "partially-backed");
  assert.equal(
    coverage.get("sunday-dinner-196-participation-infrastructure").status,
    "partially-backed"
  );
  assert.equal(
    coverage.get("kc-town-hall-public-benefit-documentation").status,
    "source-backed"
  );
  assert.ok(coverage.get("kc-town-hall-public-benefit-documentation").inquiryIds.includes(
    "INQ-KC-TOWN-HALL-AGREEMENT-DISBURSEMENT"
  ));
});

test("campaign press indexes reconcile 46 appearances to 45 unique articles", () => {
  assert.equal(campaignPressEntries.length, campaignPressExpectedCounts.uniqueArticles);
  const occurrences = Object.values(campaignPressIndexes).reduce(
    (sum, index) => sum + index.sourceIds.length,
    0
  );
  assert.equal(occurrences, campaignPressExpectedCounts.totalOccurrences);
  assert.deepEqual(
    Object.fromEntries(
      Object.entries(campaignPressIndexes).map(([id, index]) => [id, index.sourceIds.length])
    ),
    {
      "let-nyc-dance": 21,
      "talks-not-raids": 7,
      "save-nyc-spaces": 8,
      "fair-rent-nyc": 10
    }
  );
  assert.equal(
    campaignPressEntries.find((entry) => entry.id === "SRC-NPR-CABARET-OFFICE-NIGHTLIFE-2017").campaigns.length,
    2
  );
});

test("unreviewed campaign press cannot silently become claim evidence", () => {
  const pressInquiry = knowledgeBank.researchInquiries.find(
    (item) => item.id === "INQ-NYCARTC-CAMPAIGN-PRESS-CORPUS"
  );
  assert.equal(pressInquiry.sourceIds.length, 45);
  const campaignPressIds = new Set(campaignPressEntries.map((entry) => entry.id));
  const unverified = knowledgeBank.sources.filter(
    (source) =>
      campaignPressIds.has(source.id) && source.preservationStatus === "unverified"
  );
  assert.ok(unverified.length > 0);
  assert.ok(unverified.every((source) =>
    source.doesNotEstablish.some((boundary) => /before close reading/i.test(boundary))
  ));
  const claimEvidence = new Set(
    knowledgeBank.claims.flatMap((claim) => claim.evidence.map((item) => item.sourceId))
  );
  assert.ok(unverified.every((source) => !claimEvidence.has(source.id)));
});
