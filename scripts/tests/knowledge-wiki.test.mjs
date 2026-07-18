import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";
import { compileKnowledgeWiki } from "../knowledge-wiki/lib.mjs";

const emptyRegistry = { captures: [], sources: [], observations: [], claims: [], researchTasks: [], researchInquiries: [], corrections: [], pages: [] };

function page({ id = "index.knowledge-wiki", title = "Root", body = "# Root", relations = "", wanted = "" } = {}) {
  return `---
id: ${id}
title: ${title}
kind: ${id === "index.knowledge-wiki" ? "index" : "note"}
status: maintained
visibility: public-safe
sensitivity: low
last_reviewed: 2026-07-18
review_by: 2027-01-18
${relations}${wanted}---

${body}
`;
}

function fixture(files) {
  const root = mkdtempSync(path.join(tmpdir(), "knowledge-wiki-test-"));
  for (const [name, contents] of Object.entries(files)) {
    const target = path.join(root, name);
    mkdirSync(path.dirname(target), { recursive: true });
    writeFileSync(target, contents);
  }
  return root;
}

test("canonical Knowledge Wiki pilot compiles without hard failures", () => {
  const first = compileKnowledgeWiki();
  const second = compileKnowledgeWiki();
  assert.deepEqual(first.health.errors, []);
  assert.equal(first.graph.fingerprint, second.graph.fingerprint);
  assert.ok(first.graph.nodes.some((node) => node.id === "project.callnyc"));
  assert.ok(first.graph.nodes.some((node) => node.id === "event.nycc.councilstat-hackathon-2016"));
  assert.ok(first.graph.nodes.some((node) => node.id === "capability.technical-operations"));
  assert.ok(first.graph.nodes.some((node) => node.id === "method.source-backed-team-memory"));
  assert.ok(first.health.wanted_pages.some((item) => item.status === "not-recovered"));
});

test("protected canonical source is represented without its title or locator", () => {
  const compiled = compileKnowledgeWiki();
  const node = compiled.graph.nodes.find((item) => item.id === "SRC-CALLNYC-DIGITAL-DISTRICT-PHOTO");
  assert.equal(node.title, "[protected source]");
  assert.equal(node.sensitivity, "protected");
  assert.equal(node.governance.public_display_status, "hold");
  assert.ok(node.safe_context.includes("collaborative working setting"));
  assert.ok(node.does_not_establish.includes("the identity or consent status of all people depicted"));
  assert.doesNotMatch(JSON.stringify(node), /Users|Volumes|file:\/\//);
});

test("duplicate page IDs fail closed", () => {
  const root = fixture({ "README.md": page(), "duplicate.md": page({ body: "# Duplicate" }) });
  assert.ok(compileKnowledgeWiki({ root, registry: emptyRegistry }).health.errors.some((item) => item.code === "duplicate-id"));
});

test("broken files and fragments fail closed", () => {
  const brokenFile = fixture({ "README.md": page({ body: "# Root\n[Missing](missing.md)" }) });
  assert.ok(compileKnowledgeWiki({ root: brokenFile, registry: emptyRegistry }).health.errors.some((item) => item.code === "broken-link"));
  const brokenFragment = fixture({ "README.md": page({ body: "# Root\n[Missing fragment](#nope)" }) });
  assert.ok(compileKnowledgeWiki({ root: brokenFragment, registry: emptyRegistry }).health.errors.some((item) => item.code === "broken-fragment"));
});

test("missing typed relation targets fail closed", () => {
  const root = fixture({ "README.md": page({ relations: "relations:\n  - type: supports\n    target: claim.missing\n" }) });
  assert.ok(compileKnowledgeWiki({ root, registry: emptyRegistry }).health.errors.some((item) => item.code === "missing-relation-target"));
});

test("private locators and inflated absence claims fail closed", () => {
  const privateRoot = fixture({ "README.md": page({ body: "# Root\n/Users/example/private.txt" }) });
  assert.ok(compileKnowledgeWiki({ root: privateRoot, registry: emptyRegistry }).health.errors.some((item) => item.code === "private-locator"));
  const absenceRoot = fixture({ "README.md": page({ body: "# Root\nThe event page never existed." }) });
  assert.ok(compileKnowledgeWiki({ root: absenceRoot, registry: emptyRegistry }).health.errors.some((item) => item.code === "absence-inflation"));
});

test("wanted pages are reported without becoming dangling graph nodes", () => {
  const root = fixture({ "README.md": page({ wanted: "wanted:\n  - id: wanted.example\n    title: Example\n    reason: Deliberately missing.\n    status: not-recovered\n" }) });
  const compiled = compileKnowledgeWiki({ root, registry: emptyRegistry });
  assert.deepEqual(compiled.health.errors, []);
  assert.equal(compiled.health.wanted_pages[0].id, "wanted.example");
  assert.ok(!compiled.graph.nodes.some((node) => node.id === "wanted.example"));
});
