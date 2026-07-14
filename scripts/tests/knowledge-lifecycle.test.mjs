import assert from "node:assert/strict";
import test from "node:test";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import {
  nycaPressArticles,
  nycaPressCampaigns,
  nycaPressCorpusStats
} from "../../apps/www/src/data/knowledge-bank/nyca-press-corpus.ts";
import { validateKnowledgeBank } from "../lib/citation-validation.mjs";

test("canonical lifecycle records pass validation", () => {
  assert.deepEqual(validateKnowledgeBank(), []);
});

test("intake can preserve researched, open, and unprojected material", () => {
  assert.ok(knowledgeBank.intakeItems.length >= 4);
  assert.ok(
    knowledgeBank.intakeItems.some((item) => item.researchStatus === "researched")
  );
  assert.ok(
    knowledgeBank.intakeItems.some(
      (item) => item.researchStatus === "needs-more-research"
    )
  );
  assert.ok(
    knowledgeBank.intakeItems.some(
      (item) => item.publicationStatus === "knowledge-bank-only"
    )
  );
});

test("atomic observations remain source-linked", () => {
  const sourceIds = new Set(knowledgeBank.sources.map((source) => source.id));
  assert.ok(knowledgeBank.observations.length >= 18);
  assert.ok(
    knowledgeBank.observations.every(
      (observation) =>
        sourceIds.has(observation.sourceId) &&
        (observation.claimIds.length || observation.researchInquiryIds.length)
    )
  );
});

test("portfolio expansion ingests exactly ten new public sources", () => {
  const intake = knowledgeBank.intakeItems.find(
    (item) => item.id === "INTAKE-2026-07-12-PORTFOLIO-STRENGTHENING-SOURCES"
  );
  assert.ok(intake);
  assert.equal(intake.sourceIds.length, 10);
  assert.equal(new Set(intake.sourceIds).size, 10);
  assert.ok(
    intake.sourceIds.every((id) =>
      knowledgeBank.sources.some(
        (source) => source.id === id && source.visibility === "public"
      )
    )
  );
});

test("NYC Artist Coalition press recovery is complete and deduplicated", () => {
  assert.deepEqual(
    Object.fromEntries(
      Object.entries(nycaPressCampaigns).map(([key, campaign]) => [
        key,
        campaign.expected
      ])
    ),
    { letnycdance: 21, talksnotraids: 7, savenycspaces: 8, fairrentnyc: 9 }
  );
  assert.equal(nycaPressCorpusStats.placementCount, 45);
  assert.equal(nycaPressCorpusStats.uniqueArticleCount, 44);
  assert.equal(nycaPressCorpusStats.reusedSourceCount, 3);
  assert.equal(nycaPressCorpusStats.newArticleSourceCount, 41);
  assert.equal(nycaPressCorpusStats.archivedArticleCount, 44);
  assert.equal(new Set(nycaPressArticles.map((article) => article.sourceId)).size, 44);
  assert.ok(
    nycaPressArticles.every(
      (article) =>
        article.archiveUrl.startsWith("https://web.archive.org/web/") &&
        knowledgeBank.sources.some((source) => source.id === article.sourceId)
    )
  );
});

test("each campaign has a researched knowledge-bank-only intake", () => {
  for (const campaign of Object.keys(nycaPressCampaigns)) {
    const intake = knowledgeBank.intakeItems.find(
      (item) => item.id === `INTAKE-2026-07-13-NYCA-PRESS-${campaign.toUpperCase()}`
    );
    assert.ok(intake);
    assert.equal(intake.researchStatus, "researched");
    assert.equal(intake.publicationStatus, "knowledge-bank-only");
    assert.ok(intake.observationIds.length > 1);
  }
});

test("campaign authorship and press claims retain collective boundaries", () => {
  const claimById = new Map(knowledgeBank.claims.map((claim) => [claim.id, claim]));
  const authorship = claimById.get("CLM-NYCA-CAMPAIGN-WEBSITE-AUTHORSHIP");
  const press = claimById.get("CLM-NYCA-CAMPAIGN-PRESS-CORPUS");
  const rent = claimById.get("CLM-NYCA-COMMERCIAL-RENT-ADVOCACY-CONTEXT");

  assert.equal(authorship?.status, "confirmed-with-boundary");
  assert.ok(authorship?.antiClaims.some((value) => /solely led|alone caused/i.test(value)));
  assert.equal(press?.status, "confirmed-with-boundary");
  assert.ok(press?.boundaries.some((value) => /inclusion.*endorsed/i.test(value)));
  assert.equal(rent?.status, "confirmed-with-boundary");
  assert.ok(
    rent?.boundaries.some((value) => /do not establish Jamie's complete individual/i.test(value))
  );
});

test("claim maturity matches recovered evidence", () => {
  const claimById = new Map(knowledgeBank.claims.map((claim) => [claim.id, claim]));
  assert.equal(
    claimById.get("CLM-WATERWAYS-RAFT-EXPEDITION")?.status,
    "confirmed-with-boundary"
  );
  assert.equal(
    claimById.get("CLM-NYCA-CABARET-LAW-CONTRIBUTION")?.status,
    "confirmed-with-boundary"
  );
  assert.equal(
    claimById.get("CLM-NYCA-OFFICE-NIGHTLIFE-TOWN-HALL")?.status,
    "use-with-care"
  );
  assert.equal(
    claimById.get("CLM-NYCA-COFOUNDER-ROLE")?.status,
    "confirmed-with-boundary"
  );
  assert.equal(
    claimById.get("CLM-CALLNYC-COUNCIL-ENGAGEMENT-METRICS")?.status,
    "use-with-care"
  );
});

test("inference claims cannot silently reach active projection", () => {
  for (const claim of knowledgeBank.claims.filter(
    (item) => item.status === "inference"
  )) {
    assert.ok(claim.researchInquiryIds.length > 0);
    assert.ok(claim.projections.every((projection) => projection.status !== "active"));
  }
});

test("open research distinguishes queued from partially recovered", () => {
  const queued = knowledgeBank.researchInquiries.filter(
    (inquiry) => inquiry.resultStatus === "queued"
  );
  const partial = knowledgeBank.researchInquiries.filter(
    (inquiry) => inquiry.resultStatus === "partially-recovered"
  );
  assert.ok(queued.length >= 1);
  assert.ok(partial.length >= 4);
  assert.equal(
    knowledgeBank.researchInquiries.find(
      (inquiry) => inquiry.id === "INQ-CALLNYC-COUNCIL-ENGAGEMENT-2026"
    )?.resultStatus,
    "partially-recovered"
  );
  assert.ok(queued.every((inquiry) => !inquiry.runAt && inquiry.findings.length === 0));
  assert.ok(
    partial.every(
      (inquiry) => inquiry.runAt && inquiry.findings.length && inquiry.limitations.length
    )
  );
});
