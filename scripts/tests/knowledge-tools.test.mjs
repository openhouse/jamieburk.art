import assert from "node:assert/strict";
import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
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
  assert.throws(
    () => createLeadReceipt({ ...base, summary: "Raw coalition legal strategy and a stakeholder roster" }),
    /legal or stakeholder/
  );
  assert.throws(
    () => createLeadReceipt({ ...base, summary: "A participant has cancer" }),
    /health detail/
  );
  assert.throws(
    () => createLeadReceipt({ ...base, summary: "A participant owes $50,000" }),
    /financial detail/
  );
  assert.throws(
    () => createLeadReceipt({
      ...base,
      kind: "url",
      summary: "Protected archive download",
      url: "https://example.org/file?X-Amz-Signature=SECRET"
    }),
    /signed or secret URL/
  );
  assert.throws(
    () => createLeadReceipt({
      ...base,
      kind: "url",
      summary: "Protected archive download",
      url: "https://storage.googleapis.com/item?X-Goog-Signature=SECRET"
    }),
    /signed or secret URL/
  );
  assert.throws(
    () => createLeadReceipt({
      ...base,
      summary: "Private correspondence, a raw participant transcript, and unapproved participant names."
    }),
    /private correspondence|raw participant material|unapproved personal identity/
  );
  assert.throws(
    () => createLeadReceipt({
      title: "Sensitive participant record",
      kind: "document",
      project: "callnyc",
      receivedAt: "2026-07-16",
      summary:
        `Participant medical record confirms asthma; SSN 123-45-6789; AWS key ${"AKIA" + "IOSFODNN7EXAMPLE"}; home address 123 Main Street.`
    }),
    /medical record|government identifier|credential|street address/
  );
  assert.throws(
    () => createLeadReceipt({
      title: "x",
      kind: "memory",
      project: "callnyc",
      receivedAt: "2026-07-16",
      summary: "y"
    }),
    /at least 8 characters|at least 20 characters/
  );
});

test("intake CLI rejects valued write flags and unknown arguments", () => {
  const script = path.join(repoRoot, "scripts/intake-knowledge-lead.mjs");
  const common = [
    script,
    "--title", "Public archive lead",
    "--kind", "memory",
    "--summary", "A sufficiently specific public lead for later review.",
    "--project", "callnyc",
    "--received-at", "2026-07-16"
  ];

  const valuedWrite = spawnSync(process.execPath, [...common, "--write", "false"], {
    cwd: repoRoot,
    encoding: "utf8"
  });
  assert.notEqual(valuedWrite.status, 0);
  assert.match(valuedWrite.stderr, /does not accept a value/);

  const unknown = spawnSync(process.execPath, [...common, "--publish"], {
    cwd: repoRoot,
    encoding: "utf8"
  });
  assert.notEqual(unknown.status, 0);
  assert.match(unknown.stderr, /Unknown argument --publish/);
});

test("public-safe queries remove protected source details and internal excerpts", () => {
  const bank = {
    intakeItems: [
      { id: "LEAD-ONE", projectIds: ["example"], publicationStatus: "projected" },
      { id: "LEAD-TWO", projectIds: ["example"], publicationStatus: "pending" }
    ],
    sources: [
      { id: "SRC-PUBLIC", visibility: "public", protectedLocatorId: "LOC-ONE" },
      { id: "SRC-PRIVATE", visibility: "private", protectedLocatorId: "LOC-TWO" }
    ],
    observations: [
      { project: "example", sourceId: "SRC-PUBLIC", status: "verified" },
      { project: "example", sourceId: "SRC-PRIVATE" }
    ],
    claims: [{
      id: "CLM-ONE",
      project: "example",
      status: "confirmed",
      internalClaim: "remove this internal formulation",
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
  assert.deepEqual(result.intakeItems.map((item) => item.id), ["LEAD-ONE"]);
  assert.equal("protectedLocatorId" in result.sources[0], false);
  assert.deepEqual(result.claims[0].evidence, [{ sourceId: "SRC-PUBLIC" }]);
  assert.equal("internalClaim" in result.claims[0], false);
  assert.deepEqual(result.researchInquiries, []);
  assert.deepEqual(result.matchedRoutes.map((route) => route.path), ["/work/example"]);
  assert.deepEqual(Object.keys(result.intakeItems[0]).sort(), [
    "id",
    "projectIds",
    "publicationStatus"
  ]);
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

test("publication-safe queries fail closed for unbound surfaces and project scope", () => {
  const bank = {
    intakeItems: [{
      id: "LEAD-ONE",
      projectIds: ["example"],
      publicationStatus: "projected",
      sourceIds: ["SRC-PRIVATE"]
    }],
    sources: [
      { id: "SRC-ONE", visibility: "public", canonicalUrl: "https://example.org/one" },
      { id: "SRC-TWO", visibility: "public", canonicalUrl: "https://example.org/two" },
      { id: "SRC-PRIVATE", visibility: "protected" }
    ],
    observations: [],
    claims: [{
      id: "CLM-ONE",
      project: "example",
      status: "confirmed",
      projections: [{ status: "active", surfaces: ["/work/example"] }],
      evidence: [{ sourceId: "SRC-ONE" }]
    }],
    researchInquiries: []
  };
  const unbound = queryKnowledgeBank(bank, {
    surface: "/work/unregistered",
    publicationSafe: true,
    routeBindings: [{ path: "/work/example", audience: "Hiring readers", purpose: "Evidence" }]
  });
  assert.deepEqual(unbound.claims, []);
  assert.deepEqual(unbound.sources, []);

  const project = queryKnowledgeBank(bank, {
    project: "example",
    publicationSafe: true
  });
  assert.deepEqual(project.sources.map((source) => source.id), ["SRC-ONE"]);
  assert.deepEqual(project.intakeItems[0], {
    id: "LEAD-ONE",
    projectIds: ["example"],
    publicationStatus: "projected"
  });
});

test("publication-safe source output is an allowlist and removes signed URLs", () => {
  const bank = {
    intakeItems: [],
    sources: [{
      id: "SRC-ONE",
      title: "Source",
      visibility: "public",
      canonicalUrl: "https://example.org/file?X-Goog-Signature=SECRET",
      protectedLocatorId: "LOC-ONE",
      unexpectedPrivateField: "remove me"
    }],
    observations: [],
    claims: [{
      id: "CLM-ONE",
      project: "example",
      status: "confirmed",
      internalClaim: "remove me",
      projections: [{ status: "active", surfaces: ["/work/example"] }],
      evidence: [{ sourceId: "SRC-ONE" }],
      boundaries: [],
      antiClaims: []
    }],
    researchInquiries: []
  };
  const result = queryKnowledgeBank(bank, {
    project: "example",
    publicationSafe: true
  });
  assert.equal("canonicalUrl" in result.sources[0], false);
  assert.equal("protectedLocatorId" in result.sources[0], false);
  assert.equal("unexpectedPrivateField" in result.sources[0], false);
  assert.equal("internalClaim" in result.claims[0], false);
});

test("publication-safe output drops records containing sensitive identifiers", () => {
  const bank = {
    intakeItems: [],
    sources: [{
      id: "SRC-LEAK",
      title: "Public source",
      author: "Participant SSN 123-45-6789; medical record confirms asthma",
      visibility: "public",
      canonicalUrl: "https://example.org/source"
    }],
    observations: [],
    claims: [{
      id: "CLM-LEAK",
      project: "example",
      status: "confirmed",
      projections: [{
        key: "case-study",
        text: "Bounded text",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/example"]
      }],
      evidence: [{ sourceId: "SRC-LEAK" }],
      boundaries: [],
      antiClaims: [],
      reviewedAt: "2026-07-16"
    }],
    researchInquiries: []
  };
  const result = queryKnowledgeBank(bank, {
    project: "example",
    publicationSafe: true
  });
  assert.deepEqual(result.sources, []);
  assert.deepEqual(result.claims, []);
});
