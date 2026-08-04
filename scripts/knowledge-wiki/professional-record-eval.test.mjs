import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";

import { evaluateProfessionalRecord } from "./professional-record-eval.mjs";
import { compileWiki, defaultRepoRoot } from "./lib.mjs";

const result = compileWiki();

function source(id) {
  const record = result.byId.get(id);
  return readFileSync(path.join(defaultRepoRoot, record.path), "utf8");
}

function cloneRecord(id) {
  return structuredClone(result.byId.get(id));
}

test("professional record pilot passes the exact candidate", () => {
  assert.equal(evaluateProfessionalRecord({ result }).passed, true);
});

test("an injected private path fails closed", () => {
  const id = "source.professional-record.research.2026-08";
  const evaluation = evaluateProfessionalRecord({
    result,
    sourceOverrides: { [id]: `${source(id)}\n/Users/example/private\n` }
  });
  assert.equal(evaluation.checks.private_payload_withheld, false);
});

test("a historical record cannot become a current endorsement", () => {
  const manifest = structuredClone(evaluateProfessionalRecord({ result }).manifest);
  manifest.records.find((item) => item.id === "person.warren-sack").endorsementState =
    "established";
  const evaluation = evaluateProfessionalRecord({ result, manifest });
  assert.equal(evaluation.checks.endorsement_fails_closed, false);
});

test("a held photograph cannot clear itself", () => {
  const id = "asset.photo-set.mit-interrogative-design.2024";
  const mutated = cloneRecord(id);
  mutated.rights_state = "cleared";
  mutated.public_display_status = "cleared";
  mutated.projection = { status: "active", surfaces: ["/"] };
  const evaluation = evaluateProfessionalRecord({
    result,
    recordOverrides: { [id]: mutated }
  });
  assert.equal(evaluation.checks.photographs_fail_closed, false);
});

test("a held claim cannot silently become a portfolio claim", () => {
  const manifest = structuredClone(evaluateProfessionalRecord({ result }).manifest);
  manifest.portfolioProjection = { status: "active", surfaces: ["/about"] };
  const evaluation = evaluateProfessionalRecord({ result, manifest });
  assert.equal(evaluation.checks.claim_projections_remain_held, false);
});

test("the distinction between recommendation and endorsement is required", () => {
  const id = "index.knowledge-wiki.professional-record";
  const mutated = source(id).replace("6. An **endorsement**", "6. A **comment**");
  const evaluation = evaluateProfessionalRecord({
    result,
    sourceOverrides: { [id]: mutated }
  });
  assert.equal(evaluation.checks.relationship_categories_remain_distinct, false);
});

test("the exact protected candidate fingerprints cannot drift", () => {
  const manifest = structuredClone(evaluateProfessionalRecord({ result }).manifest);
  manifest.inputReceipts[0].sha256 = "0".repeat(64);
  const evaluation = evaluateProfessionalRecord({ result, manifest });
  assert.equal(
    evaluation.checks.exact_private_candidates_bound_by_fingerprint,
    false
  );
});
