import assert from "node:assert/strict";
import test from "node:test";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
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
