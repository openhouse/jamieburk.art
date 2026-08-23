import assert from "node:assert/strict";
import test from "node:test";

import { planCoverLetterReaderCalls } from "./plan-hiring-reader-llm.mjs";

test("model work is limited to lifecycle-selected reader pairs", () => {
  const plan = planCoverLetterReaderCalls();
  assert.equal(plan.status, "eligible");
  assert.equal(plan.plannedCallCount, 2);
  assert.equal(plan.skippedCallCount, 14);
  assert.deepEqual(plan.selectedOpportunityIds, ["opportunity.nyc-oti.senior-product-manager.782366"]);
  assert.deepEqual(plan.calls.map((call) => call.readerPairId).sort(), ["oti-product-lisa-gelobter", "oti-product-luke-farrell"]);
  assert.equal(plan.calls.some((call) => call.opportunityId.includes("technical-operations-manager")), false);
});

test("every model call is bound to exact letter, resume, context, voice, and source versions", () => {
  const plan = planCoverLetterReaderCalls();
  for (const call of plan.calls) {
    for (const field of ["coverLetterSha256", "resumeSha256", "contextSha256", "voiceProfileSha256"]) {
      assert.match(call[field], /^[a-f0-9]{64}$/);
    }
    assert.equal(call.cacheKey.includes(call.coverLetterSha256), true);
    assert.equal(call.cacheKey.includes(call.voiceSourceModifiedAt), true);
    assert.equal(call.promptVersion, "hiring-reader-cover-letter-v1");
  }
});
