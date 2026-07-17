import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { buildReceipt, appendReceipt, readIntakeLedger, validateIntakeReceipts } from "../intake-knowledge-lead.mjs";
import { validateProjectionBindings } from "../check-projection-integrity.mjs";

const projectionBindings = JSON.parse(readFileSync("docs/knowledge-bank/projection-surface-bindings.json", "utf8"));

function validInput(overrides = {}) {
  return {
    kind: "url",
    summary: "A public-safe source lead for the waterways project.",
    sourceUrl: "https://example.com/source",
    submittedBy: "Test reviewer",
    publicSafety: "public-safe",
    projectIds: ["waterways"],
    claimFamilies: ["participatory method"],
    status: "researching",
    researchTaskIds: ["RT-WATERWAYS-GULF-ENDPOINT-CORROBORATION"],
    disposition: "Recover and close-read the source before claim promotion.",
    receivedAt: "2026-07-16",
    ...overrides,
  };
}

test("intake receipts are stable, append-only, and canonically routed", () => {
  const directory = mkdtempSync(path.join(os.tmpdir(), "knowledge-intake-test-"));
  const ledger = path.join(directory, "intake.jsonl");
  try {
    const { receipt } = buildReceipt(validInput());
    assert.deepEqual(validateIntakeReceipts([receipt]), []);
    appendReceipt(receipt, ledger);
    const before = readFileSync(ledger, "utf8");
    const second = buildReceipt(validInput({ summary: "Another public-safe lead.", sourceUrl: "https://example.com/second" })).receipt;
    appendReceipt(second, ledger);
    const after = readFileSync(ledger, "utf8");
    assert.ok(after.startsWith(before));
    assert.equal(readIntakeLedger(ledger).length, 2);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});

test("intake detects duplicates without creating another receipt", () => {
  const first = buildReceipt(validInput()).receipt;
  const duplicate = buildReceipt(validInput({ summary: "Different summary, same URL." }), [first]);
  assert.equal(duplicate.duplicate.receiptId, first.receiptId);
});

test("protected intake cannot expose an underlying URL", () => {
  const receipt = buildReceipt(validInput({ publicSafety: "protected-pointer" })).receipt;
  assert.match(validateIntakeReceipts([receipt]).join("\n"), /protected pointer/);
});

test("intake CLI rejects unknown options", () => {
  const result = spawnSync(process.execPath, ["scripts/intake-knowledge-lead.mjs", "--wat"], { encoding: "utf8" });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Unknown option/);
});

test("query returns stable, bounded claim results", () => {
  const output = JSON.parse(execFileSync(process.execPath, ["scripts/query-knowledge-lifecycle.mjs", "--type", "claim", "--project", "waterways", "--limit", "2"], { encoding: "utf8" }));
  assert.ok(output.count >= 2);
  assert.equal(output.returned, 2);
  assert.deepEqual([...output.results].map((item) => item.id), [...output.results].map((item) => item.id).sort());
  assert.ok(output.results.every((item) => item.type === "claim"));
});

test("query distinguishes zero results from query failure", () => {
  const zero = JSON.parse(execFileSync(process.execPath, ["scripts/query-knowledge-lifecycle.mjs", "--q", "definitely-no-such-knowledge-record-zzzz"], { encoding: "utf8" }));
  assert.equal(zero.count, 0);
  const failure = spawnSync(process.execPath, ["scripts/query-knowledge-lifecycle.mjs", "--unknown", "value"], { encoding: "utf8" });
  assert.notEqual(failure.status, 0);
});

test("projection inventory covers every discovered app surface", () => {
  const result = validateProjectionBindings(projectionBindings);
  assert.deepEqual(result.errors, []);
  assert.ok(result.discovered.length >= 15);
});

test("projection inventory fails closed when a surface is removed", () => {
  const candidate = structuredClone(projectionBindings);
  candidate.surfaces = candidate.surfaces.filter((surface) => surface.id !== "homepage");
  assert.match(validateProjectionBindings(candidate).errors.join("\n"), /Unbound claim-capable app surface/);
});
