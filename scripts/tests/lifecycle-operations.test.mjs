import assert from "node:assert/strict";
import test from "node:test";

import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import {
  appendIntakeItem,
  intakeFingerprint,
  queryKnowledgeLifecycle
} from "../../apps/www/src/data/knowledge-bank/lifecycle-operations.ts";

test("append-safe intake is idempotent for an identical stable record", () => {
  const candidate = knowledgeBank.intakeItems[0];
  const result = appendIntakeItem(knowledgeBank, candidate);

  assert.equal(result.status, "already-present");
  assert.equal(result.knowledgeBank, knowledgeBank);
  assert.equal(result.knowledgeBank.intakeItems.length, knowledgeBank.intakeItems.length);
});

test("a repeated artifact with a new intake ID is retained as a linked duplicate", () => {
  const original = knowledgeBank.intakeItems.find((item) => item.kind === "public-url");
  assert.ok(original);
  const candidate = {
    ...structuredClone(original),
    id: "INTAKE-COMPOSITE-DUPLICATE-TEST",
    submittedAt: "2026-07-16"
  };
  const result = appendIntakeItem(knowledgeBank, candidate);

  assert.equal(result.status, "duplicate-preserved");
  assert.equal(result.intake.disposition, "duplicate");
  assert.equal(result.intake.duplicateOfIntakeId, original.id);
  assert.equal(result.knowledgeBank.intakeItems.length, knowledgeBank.intakeItems.length + 1);
  assert.equal(intakeFingerprint(result.intake), intakeFingerprint(original));
});

test("a stable ID collision with different content is rejected", () => {
  const original = knowledgeBank.intakeItems[0];
  assert.throws(
    () => appendIntakeItem(knowledgeBank, { ...structuredClone(original), title: `${original.title} changed` }),
    /Intake ID collision with different content/
  );
});

test("lifecycle queries expose held knowledge, gaps, corrections, and projection state", () => {
  const report = queryKnowledgeLifecycle(knowledgeBank);

  assert.ok(report.matureHeldClaimIds.length > 0);
  assert.ok(report.unresolvedInquiryIds.length > 0);
  assert.ok(report.correctionIds.length > 0);
  assert.ok(report.projectionCounts.active > 0);
  assert.equal(report.orphanSourceIds.length, 0);
});
