import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import { proofClaims } from "../../apps/www/src/data/proofs.ts";
import {
  knowledgeLifecycleReport,
  validateKnowledgeLifecycle
} from "../lib/knowledge-lifecycle-validation.mjs";

const cloneBank = () => structuredClone(knowledgeBank);

test("canonical knowledge lifecycle is valid", () => {
  assert.deepEqual(validateKnowledgeLifecycle(), []);
});

test("intake cannot reference unknown sources", () => {
  const candidate = cloneBank();
  candidate.intake[0].sourceIds.push("SRC-UNKNOWN");
  assert.match(
    validateKnowledgeLifecycle(candidate, proofClaims).join("\n"),
    /references unknown source SRC-UNKNOWN/
  );
});

test("corrections cannot exist without an intake disposition", () => {
  const candidate = cloneBank();
  candidate.intake.forEach((item) => {
    item.correctionIds = [];
  });
  assert.match(
    validateKnowledgeLifecycle(candidate, proofClaims).join("\n"),
    /Correction COR-CALLNYC-CHRONOLOGY-2026 has no intake disposition/
  );
});

test("matured intake must retain a claim disposition", () => {
  const candidate = cloneBank();
  candidate.intake.find((item) => item.status === "matured").claimIds = [];
  assert.match(
    validateKnowledgeLifecycle(candidate, proofClaims).join("\n"),
    /Matured intake .* has no claim/
  );
});

test("photo leads cannot bypass research", () => {
  const candidate = cloneBank();
  const photoLead = candidate.intake.find((item) => item.kind === "photo-lead");
  photoLead.claimIds = [candidate.claims[0].id];
  assert.match(
    validateKnowledgeLifecycle(candidate, proofClaims).join("\n"),
    /Photo lead .* bypasses research/
  );
});

test("reader feedback cannot become accomplishment evidence", () => {
  const candidate = cloneBank();
  const feedback = candidate.intake.find((item) => item.kind === "reader-feedback");
  feedback.claimIds = ["CLM-CALLNYC-INDEPENDENT-FOLLOW-ON"];
  assert.match(
    validateKnowledgeLifecycle(candidate, proofClaims).join("\n"),
    /Reader feedback .* bypasses governance and links directly to a claim/
  );
});

test("every projection requires a compositional rationale", () => {
  const candidate = cloneBank();
  const claim = candidate.claims.find((item) =>
    item.projections.some((projection) => projection.status === "hold")
  );
  claim.projections.find((projection) => projection.status === "hold").rationale = undefined;
  assert.match(
    validateKnowledgeLifecycle(candidate, proofClaims).join("\n"),
    /Projection .* has no rationale/
  );
});

test("a claim cannot use a source for an explicitly excluded proposition", () => {
  const candidate = cloneBank();
  const relationship = candidate.claims[0].evidence[0];
  const source = candidate.sources.find((item) => item.id === relationship.sourceId);
  source.doesNotEstablish.push(relationship.supports[0]);
  assert.match(
    validateKnowledgeLifecycle(candidate, proofClaims).join("\n"),
    /uses .* to support a proposition the source does not establish/
  );
});

test("high-risk projections retain their evidence posture", () => {
  const byId = new Map(knowledgeBank.claims.map((claim) => [claim.id, claim]));
  assert.match(
    byId.get("CLM-CALLNYC-ARCHIVED-UNOFFICIAL-STATUS").projections[0].text,
    /portfolio presents .* historical evidence/i
  );
  assert.match(
    byId.get("CLM-WATERWAYS-RAFT-EXPEDITION").projections.find((item) => item.key === "about").text,
    /published account/i
  );
  assert.match(
    byId.get("CLM-TALKS-NOT-RAIDS-ADVOCACY").projections.find((item) => item.key === "case-study").text,
    /Testified .* supported the coalition's .* campaign/i
  );
  const waterwaysProof = proofClaims.find(
    (proof) => proof.id === "waterways-participatory-practice"
  );
  assert.match(waterwaysProof.publicWording, /published first-person account/i);
  assert.ok(
    readFileSync("docs/knowledge-bank/claims.md", "utf8").includes(
      `**Public wording:** ${waterwaysProof.publicWording}`
    )
  );
  const marchProof = proofClaims.find(
    (proof) => proof.id === "march-transparency-to-cure"
  );
  assert.match(marchProof.publicWording, /^Advocated M\.A\.R\.C\.H\. transparency/);
  assert.match(marchProof.detailedPublicWording, /does not establish .* caused/i);
  assert.doesNotMatch(marchProof.publicWording, /^Contributed to/);
});

test("reader feedback resolves to a public governance artifact", () => {
  const feedback = knowledgeBank.intake.find((item) => item.kind === "reader-feedback");
  assert.equal(feedback.disposition, "governance-updated");
  assert.ok(feedback.artifactPaths.length > 0);
  assert.deepEqual(feedback.inquiryIds, [
    "INQ-READER-FEEDBACK-PROJECTION-GOVERNANCE"
  ]);
  assert.deepEqual(validateKnowledgeLifecycle(), []);
});

test("governance artifacts alone cannot dispose active intake", () => {
  const candidate = cloneBank();
  const feedback = candidate.intake.find((item) => item.kind === "reader-feedback");
  feedback.inquiryIds = [];
  assert.match(
    validateKnowledgeLifecycle(candidate, proofClaims).join("\n"),
    /Intake INT-READER-FEEDBACK-.* has no source, inquiry, claim, or correction disposition/
  );
});

test("a concrete claim-generated photo lead returns to inquiry", () => {
  const lead = knowledgeBank.intake.find(
    (item) => item.id === "INT-WATERWAYS-PHOTO-LEAD-2026-07-12"
  );
  assert.equal(lead.status, "researching");
  assert.deepEqual(lead.claimIds, []);
  assert.deepEqual(lead.inquiryIds, ["INQ-WATERWAYS-PHOTO-SELECTS"]);
});

test("unlinked proof claims remain visible research backlog", () => {
  const report = knowledgeLifecycleReport();
  assert.ok(report.canonicallyLinkedProofIds.length > 0);
  assert.ok(report.proofResearchBacklogIds.length > 0);
  assert.equal(
    report.canonicallyLinkedProofIds.length + report.proofResearchBacklogIds.length,
    proofClaims.length
  );
  assert.equal(report.proofProjectionDecisions.length, proofClaims.length);
  assert.ok(
    report.proofProjectionDecisions.every(
      (decision) =>
        decision.surfaces.length > 0 && decision.rationale && decision.guardrail
    )
  );
});
