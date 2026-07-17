import assert from "node:assert/strict";
import { mkdtempSync, readFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import {
  appendKnowledgeEvent,
  parseKnowledgeHistory,
  publicKnowledgeEvent,
  validateAppendOnlySnapshots,
  validateKnowledgeEvent
} from "../lib/knowledge-history.mjs";

const intake = {
  version: 1,
  id: "HIST-2026-07-16-TEST-INTAKE",
  type: "intake-receipt",
  occurredAt: "2026-07-16",
  actor: "Test operator",
  subjectId: "TEST-SUBJECT",
  summary: "Captured a public-safe test fragment.",
  visibility: "public-safe"
};

test("validates public-safe and protected event boundaries", () => {
  assert.deepEqual(validateKnowledgeEvent(intake), []);
  assert.ok(validateKnowledgeEvent({ ...intake, summary: "/Users/example/private" }).includes("Event contains a private filesystem path"));
  assert.ok(validateKnowledgeEvent({ ...intake, visibility: "protected-reference" }).includes("Non-public events require an opaque protected locator ID"));
  assert.deepEqual(validateKnowledgeEvent({ ...intake, visibility: "protected-reference", protectedLocatorId: "OPAQUE-ARTIFACT-ID" }), []);
});

test("amendments and retirements require an existing superseded event", () => {
  const amendment = { ...intake, id: "HIST-2026-07-16-TEST-AMENDMENT", type: "amendment", supersedesEventId: intake.id };
  assert.deepEqual(validateKnowledgeEvent(amendment), []);
  const parsed = parseKnowledgeHistory(`${JSON.stringify(intake)}\n${JSON.stringify(amendment)}\n`);
  assert.deepEqual(parsed.findings, []);
  const missing = parseKnowledgeHistory(`${JSON.stringify(amendment)}\n`);
  assert.ok(missing.findings.some((finding) => finding.includes("supersedes unknown event")));
});

test("promotion decisions preserve defer reasons", () => {
  const decision = { ...intake, id: "HIST-2026-07-16-TEST-DECISION", type: "promotion-decision", disposition: "defer" };
  assert.ok(validateKnowledgeEvent(decision).includes("defer requires a reason"));
  assert.deepEqual(validateKnowledgeEvent({ ...decision, reason: "Needs corroboration" }), []);
});

test("append-only snapshots reject deletion and rewriting", () => {
  const first = `${JSON.stringify(intake)}\n`;
  const secondEvent = { ...intake, id: "HIST-2026-07-16-TEST-SECOND", subjectId: "SECOND-SUBJECT" };
  const current = `${first}${JSON.stringify(secondEvent)}\n`;
  assert.deepEqual(validateAppendOnlySnapshots(current, [first]), []);
  assert.ok(validateAppendOnlySnapshots(first, [current]).some((finding) => finding.includes("Deleted")));
  assert.ok(validateAppendOnlySnapshots(`${JSON.stringify(secondEvent)}\n`, [first]).some((finding) => finding.includes("Rewrote")));
});

test("append writes one JSONL record and rejects duplicate IDs", () => {
  const directory = mkdtempSync(path.join(os.tmpdir(), "knowledge-history-"));
  const file = path.join(directory, "history.jsonl");
  appendKnowledgeEvent(file, intake);
  assert.equal(parseKnowledgeHistory(readFileSync(file, "utf8")).events.length, 1);
  assert.throws(() => appendKnowledgeEvent(file, intake), /Duplicate event ID/);
});

test("public event projection removes protected locators", () => {
  const protectedEvent = { ...intake, visibility: "protected-reference", protectedLocatorId: "OPAQUE-ARTIFACT-ID" };
  assert.equal(publicKnowledgeEvent(protectedEvent).protectedLocatorId, undefined);
});
