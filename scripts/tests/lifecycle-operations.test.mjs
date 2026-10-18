import assert from "node:assert/strict";
import test from "node:test";

import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import {
  appendIntakeItem,
  intakeFingerprint,
  queryKnowledgeLifecycle
} from "../../apps/www/src/data/knowledge-bank/lifecycle-operations.ts";
import { intakeItemSchema, knowledgeBankSchema } from "../../apps/www/src/data/knowledge-bank/schema.ts";

function duplicateFixture(overrides = {}) {
  const original = intakeItemSchema.parse({
    id: "INTAKE-REPLAY-ORIGINAL", kind: "public-url", title: "Public artifact",
    submittedAt: "2026-10-18", submittedBy: "Replay fixture",
    projectIds: ["project-replay"], reason: "Preserve public evidence",
    sourceUrl: "https://example.org/artifact", visibility: "public-safe",
    disposition: "triaged"
  });
  const bank = knowledgeBankSchema.parse({
    intakeItems: [original], observations: [], sources: [], claims: [], entities: [],
    agencyRelations: [], researchInquiries: [], proofCoverageTargets: [], corrections: [], pages: []
  });
  const incoming = { ...original, id: "INTAKE-REPLAY-DUPLICATE", ...overrides };
  return { bank, incoming, first: appendIntakeItem(bank, incoming) };
}

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

test("a normalized duplicate accepts replay of the identical original input after persistence", () => {
  const { incoming, first } = duplicateFixture();
  const persisted = knowledgeBankSchema.parse(JSON.parse(JSON.stringify(first.knowledgeBank)));
  const replay = appendIntakeItem(persisted, incoming);

  assert.equal(replay.status, "already-present");
  assert.equal(replay.knowledgeBank, persisted);
  assert.equal(replay.knowledgeBank.intakeItems.length, 2);
  assert.equal(replay.intake.disposition, "duplicate");
  assert.equal(replay.intake.duplicateOfIntakeId, "INTAKE-REPLAY-ORIGINAL");
});

test("the normalized returned duplicate remains replayable without adding another record", () => {
  const { first } = duplicateFixture();
  const replay = appendIntakeItem(first.knowledgeBank, first.intake);
  assert.equal(replay.status, "already-present");
  assert.equal(replay.knowledgeBank, first.knowledgeBank);
  assert.equal(replay.knowledgeBank.intakeItems.length, 2);
});

test("duplicate replay rejects changed input metadata as well as changed artifact content", () => {
  const { incoming, first } = duplicateFixture();
  for (const change of [
    { title: "Changed artifact" }, { disposition: "protected" },
    { submittedAt: "2026-10-17" }, { submittedBy: "Someone else" },
    { boundaries: ["New publication restriction"] }, { sourceIds: ["SRC-OTHER"] },
    { observationIds: ["OBS-OTHER"] }, { researchInquiryIds: ["INQUIRY-OTHER"] },
    { disposition: "duplicate", duplicateOfIntakeId: "INTAKE-OTHER" }
  ]) {
    assert.throws(() => appendIntakeItem(first.knowledgeBank, { ...incoming, ...change }), /collision/);
  }
});

test("an original duplicate disposition and link are preserved in exact replay identity", () => {
  const { incoming, first } = duplicateFixture({
    disposition: "duplicate", duplicateOfIntakeId: "INTAKE-ANOTHER-ORIGINAL"
  });
  assert.equal(first.intake.duplicateOfIntakeId, "INTAKE-REPLAY-ORIGINAL");
  assert.equal(appendIntakeItem(first.knowledgeBank, incoming).status, "already-present");
  assert.throws(() => appendIntakeItem(first.knowledgeBank, {
    ...incoming, duplicateOfIntakeId: "INTAKE-DIFFERENT-ORIGINAL"
  }), /collision/);
});

test("legacy duplicates without normalization provenance do not guess the original input", () => {
  const { incoming, first } = duplicateFixture();
  const legacy = structuredClone(first.knowledgeBank);
  delete legacy.intakeItems[1].duplicateNormalization;
  assert.throws(() => appendIntakeItem(legacy, incoming), /collision/);
  assert.equal(appendIntakeItem(legacy, legacy.intakeItems[1]).status, "already-present");
});

test("tampered stored duplicate content or normalization provenance cannot authorize replay", () => {
  const { incoming, first } = duplicateFixture();
  assert.ok(first.intake.duplicateNormalization, "Machine normalization must retain exact replay provenance");
  for (const mutate of [
    (item) => { item.boundaries.push("Changed after normalization"); },
    (item) => { item.duplicateOfIntakeId = "INTAKE-DIFFERENT-ORIGINAL"; },
    (item) => { item.duplicateNormalization.inputRecordSha256 = "0".repeat(64); },
    (item) => { item.duplicateNormalization.storedRecordSha256 = "0".repeat(64); }
  ]) {
    const changed = structuredClone(first.knowledgeBank);
    mutate(changed.intakeItems[1]);
    assert.throws(() => appendIntakeItem(changed, incoming), /normalization provenance/);
    assert.throws(() => appendIntakeItem(changed, changed.intakeItems[1]), /normalization provenance/);
  }
});

test("normalization provenance is schema constrained to complete hashes on duplicate records", () => {
  const { incoming, first } = duplicateFixture();
  const valid = { inputRecordSha256: "a".repeat(64), storedRecordSha256: "b".repeat(64) };
  for (const provenance of [
    {}, { ...valid, inputRecordSha256: "short" }, { ...valid, storedRecordSha256: null },
    { ...valid, extra: "unrecognized provenance" }
  ]) {
    assert.equal(intakeItemSchema.safeParse({ ...first.intake, duplicateNormalization: provenance }).success, false);
  }
  assert.equal(intakeItemSchema.safeParse({ ...incoming, duplicateNormalization: valid }).success, false);
});

test("lifecycle queries expose held knowledge, gaps, corrections, and projection state", () => {
  const report = queryKnowledgeLifecycle(knowledgeBank);

  assert.ok(report.matureHeldClaimIds.length > 0);
  assert.ok(report.unresolvedInquiryIds.length > 0);
  assert.ok(report.correctionIds.length > 0);
  assert.ok(report.projectionCounts.active > 0);
  assert.equal(report.orphanSourceIds.length, 0);
});
