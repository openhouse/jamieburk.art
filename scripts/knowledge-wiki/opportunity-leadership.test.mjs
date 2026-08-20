import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";

import { evaluatePublicHiring } from "./employment-lib.mjs";
import { compileWiki, defaultRepoRoot } from "./lib.mjs";

const expected = new Map([
  ["opportunity.aclu.senior-project-manager-lps.8620968002", "live"],
  ["opportunity.benepass.product-operations.7f963a7a", "closed"],
  ["opportunity.aclu.senior-project-manager-national-campaigns.8631854002", "live"],
  ["opportunity.nyc-oti.product-manager.784450", "live"],
  ["opportunity.nyc-oti.senior-product-manager.782366", "live"],
  ["opportunity.nyc-oti.operations-manager.789810", "live"],
  ["opportunity.nyc-oti.cybersecurity-senior-project-manager.791074", "live"],
  ["opportunity.nyc-oti.technical-operations-manager.782369", "closed"]
]);

const directStates = new Map([
  ["opportunity.aclu.senior-project-manager-lps.8620968002", "posting-title-person-unresolved"],
  ["opportunity.benepass.product-operations.7f963a7a", "posting-named-person"],
  ["opportunity.aclu.senior-project-manager-national-campaigns.8631854002", "public-title-match-not-confirmed"],
  ["opportunity.nyc-oti.product-manager.784450", "posting-person-unresolved"],
  ["opportunity.nyc-oti.senior-product-manager.782366", "public-operating-lead-not-confirmed"],
  ["opportunity.nyc-oti.operations-manager.789810", "posting-person-unresolved"],
  ["opportunity.nyc-oti.cybersecurity-senior-project-manager.791074", "posting-person-unresolved"]
]);

const expectedVerificationDates = new Map([
  ["opportunity.benepass.product-operations.7f963a7a", "2026-08-14"],
  ["opportunity.nyc-oti.technical-operations-manager.782369", "2026-08-13"]
]);

test("priority opportunity records preserve current live and closed states", () => {
  const result = compileWiki();
  for (const [id, status] of expected) {
    const opportunity = result.byId.get(id);
    assert.ok(opportunity, `${id} must exist`);
    assert.equal(opportunity.opportunity_status, status);
    assert.equal(opportunity.verified_at, expectedVerificationDates.get(id) ?? "2026-08-20");
    assert.ok(
      opportunity.evidence.some((item) => {
        const source = result.byId.get(item.target);
        return item.relationship === "direct-support" && source?.source_kind === "official-job-posting";
      }),
      `${id} needs direct official-posting evidence`
    );
  }
});

test("direct-report evidence distinguishes fact, title match, proximity, and unresolved identity", () => {
  const result = compileWiki();
  for (const [id, state] of directStates) {
    const context = result.byId.get(id)?.leadership_context?.direct_report;
    assert.equal(context?.evidence_state, state);
    assert.ok(context?.title);
    assert.ok(context?.note);
  }
  assert.equal(
    result.byId.get("opportunity.aclu.senior-project-manager-lps.8620968002")
      ?.leadership_context?.direct_report?.person_id,
    null
  );
});

test("named opportunity leaders have public sources and non-endorsement boundaries", () => {
  const result = compileWiki();
  const personIds = new Set();
  for (const id of directStates.keys()) {
    const leadership = result.byId.get(id)?.leadership_context;
    for (const personId of [leadership?.direct_report?.person_id, leadership?.senior_vision?.person_id]) {
      if (personId) personIds.add(personId);
    }
  }

  assert.deepEqual(
    [...personIds].sort(),
    [
      "person.aileen-palmer",
      "person.deirdre-schifeling",
      "person.jaclyn-chen",
      "person.james-williams-aclu",
      "person.kelly-moan",
      "person.lisa-gelobter",
      "person.luke-farrell",
      "person.terence-dougherty"
    ]
  );

  for (const personId of personIds) {
    const person = result.byId.get(personId);
    assert.ok(person?.relations.some((relation) => relation.type === "uses_source"));
    const source = readFileSync(path.join(defaultRepoRoot, person.path), "utf8");
    assert.match(source, /## Boundary/);
    assert.match(source, /does not establish|not establish/);
    assert.match(source, /endorsement/);
  }
});

test("expired OTI dream-role benchmark cannot enter the live hiring decision set", () => {
  const { report } = evaluatePublicHiring(defaultRepoRoot);
  const expired = report.opportunities.find(
    (item) => item.id === "opportunity.nyc-oti.technical-operations-manager.782369"
  );
  assert.equal(expired?.live, false);
  assert.equal(expired?.decision, "not-live");
});
