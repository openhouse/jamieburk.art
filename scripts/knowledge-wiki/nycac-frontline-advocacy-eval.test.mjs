import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";

import { evaluateNycacFrontlineAdvocacy } from "./nycac-frontline-advocacy-eval.mjs";
import { compileWiki, defaultRepoRoot } from "./lib.mjs";

const result = compileWiki();

function source(id) {
  const record = result.byId.get(id);
  return readFileSync(path.join(defaultRepoRoot, record.path), "utf8");
}

function cloneRecord(id) {
  return structuredClone(result.byId.get(id));
}

test("the NYCAC frontline advocacy candidate passes every hard gate", () => {
  assert.equal(evaluateNycacFrontlineAdvocacy({ result }).passed, true);
});

test("review credit cannot silently become report authorship", () => {
  const id = "claim.nycac.frontline-advocacy.2026-08";
  const mutated = source(id).replace(
    "bounded prepublication review",
    "co-authorship of the report"
  );
  const evaluation = evaluateNycacFrontlineAdvocacy({
    result,
    sourceOverrides: { [id]: mutated }
  });
  assert.equal(evaluation.checks.review_credit_not_authorship, false);
});

test("a media request cannot become published press coverage", () => {
  const manifest = structuredClone(
    evaluateNycacFrontlineAdvocacy({ result }).manifest
  );
  manifest.claimStates.mediaCoverage = "confirmed";
  const evaluation = evaluateNycacFrontlineAdvocacy({ result, manifest });
  assert.equal(evaluation.checks.media_request_not_coverage, false);
});

test("a scheduled staff meeting cannot become a completed policy outcome", () => {
  const manifest = structuredClone(
    evaluateNycacFrontlineAdvocacy({ result }).manifest
  );
  manifest.claimStates.monthlyCoordination = "completed-policy-outcome";
  const evaluation = evaluateNycacFrontlineAdvocacy({ result, manifest });
  assert.equal(evaluation.checks.time_and_officeholder_states_are_exact, false);
});

test("historical field photographs cannot become current-window canvassing", () => {
  const manifest = structuredClone(
    evaluateNycacFrontlineAdvocacy({ result }).manifest
  );
  manifest.claimStates.historicalFieldAttachments = "current-window-fieldwork";
  const evaluation = evaluateNycacFrontlineAdvocacy({ result, manifest });
  assert.equal(evaluation.checks.historical_attachments_remain_historical, false);
});

test("city and state advocacy lanes cannot be collapsed", () => {
  const id = "project.fair-rent-nyc";
  const mutated = source(id).replace(
    "City and state lanes remain aligned but not interchangeable",
    "City and state advocacy are one interchangeable lane"
  );
  const evaluation = evaluateNycacFrontlineAdvocacy({
    result,
    sourceOverrides: { [id]: mutated }
  });
  assert.equal(evaluation.checks.city_state_lanes_remain_distinct, false);
});

test("the causal boundary for storefront-vacancy findings fails closed", () => {
  const id = "source.sbu.empty-storefronts-high-rents.2026-07-28";
  const mutated = source(id).replace(
    /does\s+not by itself establish landlord motive, deliberate warehousing, or a financing\s+mechanism/,
    "establishes landlord motive, deliberate warehousing, and a financing mechanism"
  );
  const evaluation = evaluateNycacFrontlineAdvocacy({
    result,
    sourceOverrides: { [id]: mutated }
  });
  assert.equal(evaluation.checks.descriptive_findings_not_causal_proof, false);
});

test("protected correspondence and transcript locators cannot leak", () => {
  const id = "research.nycac.frontline-advocacy.2026-08-12";
  const evaluation = evaluateNycacFrontlineAdvocacy({
    result,
    sourceOverrides: {
      [id]: `${source(id)}\n/Users/example/private-transcript\n`
    }
  });
  assert.equal(evaluation.checks.protected_payload_withheld, false);
});

test("publication credit remains unresolved when NYCArtC is absent from the collaborator list", () => {
  const manifest = structuredClone(
    evaluateNycacFrontlineAdvocacy({ result }).manifest
  );
  manifest.claimStates.instagramCollaboratorCredit = "confirmed";
  const evaluation = evaluateNycacFrontlineAdvocacy({ result, manifest });
  assert.equal(evaluation.checks.social_credit_state_is_observed_not_inferred, false);
});

test("a held claim cannot self-authorize a portfolio projection", () => {
  const claim = cloneRecord("claim.nycac.frontline-advocacy.2026-08");
  claim.projection = { status: "active", surfaces: ["/work/fair-rent-nyc"] };
  const evaluation = evaluateNycacFrontlineAdvocacy({
    result,
    recordOverrides: { [claim.id]: claim }
  });
  assert.equal(evaluation.checks.human_projection_gate_preserved, false);
});
