import assert from "node:assert/strict";
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

test("held projections require a compositional rationale", () => {
  const candidate = cloneBank();
  const claim = candidate.claims.find((item) =>
    item.projections.some((projection) => projection.status === "hold")
  );
  claim.projections.find((projection) => projection.status === "hold").rationale = undefined;
  assert.match(
    validateKnowledgeLifecycle(candidate, proofClaims).join("\n"),
    /Held projection .* has no rationale/
  );
});

test("reader feedback resolves to a public governance artifact", () => {
  const feedback = knowledgeBank.intake.find((item) => item.kind === "reader-feedback");
  assert.equal(feedback.disposition, "governance-updated");
  assert.ok(feedback.artifactPaths.length > 0);
  assert.deepEqual(validateKnowledgeLifecycle(), []);
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
});
