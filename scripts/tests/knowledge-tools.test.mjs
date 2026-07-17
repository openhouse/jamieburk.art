import assert from "node:assert/strict";
import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import {
  appendLeadReceipt,
  createLeadReceipt,
  queryKnowledgeBank
} from "../lib/knowledge-tools.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

test("intake receipts are deterministic, public-safe, and append-only", () => {
  const input = {
    title: "Public article about CallNYC",
    kind: "url",
    summary: "A public article to inspect for bounded project claims.",
    project: "callnyc",
    url: "https://example.org/article",
    receivedAt: "2026-07-16"
  };
  const receipt = createLeadReceipt(input);
  assert.equal(createLeadReceipt(input).id, receipt.id);

  const directory = mkdtempSync(path.join(tmpdir(), "knowledge-intake-"));
  const file = path.join(directory, "receipts.jsonl");
  assert.equal(appendLeadReceipt(file, receipt).appended, true);
  assert.equal(appendLeadReceipt(file, receipt).appended, false);
  assert.equal(readFileSync(file, "utf8").trim().split("\n").length, 1);
});

test("committed intake receipts retain their deterministic identity", () => {
  const receipts = readFileSync(
    path.join(repoRoot, "docs/knowledge-bank/intake/receipts.jsonl"),
    "utf8"
  )
    .split("\n")
    .filter(Boolean)
    .map((line) => JSON.parse(line));
  for (const receipt of receipts) {
    const reconstructed = createLeadReceipt({
      title: receipt.title,
      kind: receipt.inputKind,
      summary: receipt.summary,
      project: receipt.projectIds[0],
      url: receipt.publicUrl,
      receivedAt: receipt.receivedAt
    });
    assert.equal(receipt.id, reconstructed.id);
  }
});

test("intake refuses common private content", () => {
  const base = {
    title: "Lead",
    kind: "memory",
    project: "callnyc",
    receivedAt: "2026-07-16"
  };
  assert.throws(
    () => createLeadReceipt({ ...base, summary: "Read /Users/person/private.txt" }),
    /filesystem path/
  );
  assert.throws(
    () => createLeadReceipt({ ...base, summary: "Contact person@example.org" }),
    /email address/
  );
});

test("public-safe queries remove protected source details and internal excerpts", () => {
  const bank = {
    intakeItems: [{ projectIds: ["example"], publicationStatus: "pending" }],
    sources: [
      { id: "SRC-PUBLIC", visibility: "public", protectedLocatorId: "LOC-ONE" },
      { id: "SRC-PRIVATE", visibility: "private", protectedLocatorId: "LOC-TWO" }
    ],
    observations: [
      { project: "example", sourceId: "SRC-PUBLIC" },
      { project: "example", sourceId: "SRC-PRIVATE" }
    ],
    claims: [{
      id: "CLM-ONE",
      project: "example",
      status: "confirmed",
      projections: [{ status: "active", surfaces: ["/work/example"] }],
      evidence: [
        { sourceId: "SRC-PUBLIC", internalExcerpt: "remove me" },
        { sourceId: "SRC-PRIVATE", internalExcerpt: "remove me too" }
      ]
    }],
    researchInquiries: [{ project: "example", protectedLocatorId: "LOC-THREE" }]
  };
  const result = queryKnowledgeBank(bank, {
    project: "example",
    surface: "/work/example",
    publicationSafe: true,
    routeBindings: [{ path: "/work/example", audience: "Hiring readers", purpose: "Show evidence" }]
  });
  assert.deepEqual(result.sources.map((source) => source.id), ["SRC-PUBLIC"]);
  assert.equal("protectedLocatorId" in result.sources[0], false);
  assert.deepEqual(result.claims[0].evidence, [{ sourceId: "SRC-PUBLIC" }]);
  assert.equal("protectedLocatorId" in result.researchInquiries[0], false);
  assert.deepEqual(result.matchedRoutes.map((route) => route.path), ["/work/example"]);
});

test("surface queries return no unrelated records", () => {
  const bank = {
    intakeItems: [{ projectIds: ["other"], publicationStatus: "pending" }],
    sources: [{ id: "SRC-OTHER", visibility: "public" }],
    observations: [{ project: "other", sourceId: "SRC-OTHER", claimIds: [] }],
    claims: [],
    researchInquiries: [{ project: "other" }]
  };
  const result = queryKnowledgeBank(bank, {
    surface: "/contact",
    routeBindings: [{ path: "/contact", audience: "Hiring readers", purpose: "Make contact" }]
  });
  assert.deepEqual(result.intakeItems, []);
  assert.deepEqual(result.sources, []);
  assert.deepEqual(result.observations, []);
  assert.deepEqual(result.researchInquiries, []);
});
