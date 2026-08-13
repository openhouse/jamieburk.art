import assert from "node:assert/strict";
import test from "node:test";

import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import { evaluateNycacCrsFrontline } from "./nycac-crs-frontline-eval.mjs";

function cloneBank() {
  return structuredClone(knowledgeBank);
}

test("the bounded NYCAC commercial-rent advocacy source return passes", () => {
  assert.equal(evaluateNycacCrsFrontline().passed, true);
});

test("prepared remarks cannot be silently treated as the delivered transcript", () => {
  const bank = cloneBank();
  const claim = bank.claims.find(
    (item) => item.id === "CLM-NYCAC-CRS-PRESS-CONFERENCE-SPEAKING-2026-07"
  );
  claim.antiClaims = claim.antiClaims.filter(
    (item) => !/prepared remarks.*delivered/i.test(item)
  );

  const evaluation = evaluateNycacCrsFrontline({ knowledgeBank: bank });
  assert.equal(evaluation.checks.prepared_and_delivered_remain_distinct, false);
});

test("a footage request cannot mature into a press placement", () => {
  const bank = cloneBank();
  const claim = bank.claims.find(
    (item) => item.id === "CLM-NYCAC-CRS-PRESS-CONFERENCE-SPEAKING-2026-07"
  );
  claim.antiClaims = claim.antiClaims.filter(
    (item) => !/footage request.*delivery.*coverage/i.test(item)
  );

  const evaluation = evaluateNycacCrsFrontline({ knowledgeBank: bank });
  assert.equal(evaluation.checks.media_request_fails_closed, false);
});

test("government contact cannot become endorsement or legislative commitment", () => {
  const bank = cloneBank();
  const claim = bank.claims.find(
    (item) => item.id === "CLM-NYCAC-CRS-GOVERNMENT-ALIGNMENT-2026-08"
  );
  claim.antiClaims = [];

  const evaluation = evaluateNycacCrsFrontline({ knowledgeBank: bank });
  assert.equal(evaluation.checks.government_contact_fails_closed, false);
});

test("scheduled alignment cannot be recorded as an occurred meeting", () => {
  const bank = cloneBank();
  const observation = bank.observations.find(
    (item) => item.id === "OBS-NYCAC-CRS-STATE-STAFF-ALIGNMENT-SCHEDULED"
  );
  observation.text = observation.text.replace("scheduled", "held");

  const evaluation = evaluateNycacCrsFrontline({ knowledgeBank: bank });
  assert.equal(evaluation.checks.scheduled_is_not_occurred, false);
});

test("protected sources cannot expose locators or render citations", () => {
  const bank = cloneBank();
  const source = bank.sources.find(
    (item) => item.id === "SRC-NYCAC-CRS-PARTNER-CORRESPONDENCE-2026-07"
  );
  source.canonicalUrl = "https://example.com/private-thread";

  const evaluation = evaluateNycacCrsFrontline({ knowledgeBank: bank });
  assert.equal(evaluation.checks.protected_sources_fail_closed, false);
});

test("the advocacy claims cannot publish themselves", () => {
  const bank = cloneBank();
  const claim = bank.claims.find(
    (item) => item.id === "CLM-NYCAC-CRS-REPORT-REVIEW-2026-07"
  );
  claim.projections[0].status = "active";
  claim.projections[0].surfaces = ["/work/fair-rent-nyc"];

  const evaluation = evaluateNycacCrsFrontline({ knowledgeBank: bank });
  assert.equal(evaluation.checks.projections_remain_held, false);
});

test("public acknowledgment cannot be inflated into report authorship", () => {
  const bank = cloneBank();
  const claim = bank.claims.find(
    (item) => item.id === "CLM-NYCAC-CRS-REPORT-REVIEW-2026-07"
  );
  claim.antiClaims = claim.antiClaims.filter((item) => !/author|data analysis/i.test(item));

  const evaluation = evaluateNycacCrsFrontline({ knowledgeBank: bank });
  assert.equal(evaluation.checks.report_credit_remains_bounded, false);
});
