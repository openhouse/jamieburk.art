import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import { compileWiki, semanticGraphFingerprint } from "./lib.mjs";

const metadata = {
  sourceCommit: "fixture-commit",
  generatedAt: "2026-07-18T00:00:00Z"
};

const files = {
  "README.md": `---
id: index.knowledge-wiki
title: Knowledge Wiki
kind: index
status: maintained
visibility: public-safe
sensitivity: low
last_reviewed: 2026-07-18
aliases: []
canonical_path: docs/knowledge-bank/README.md
summary: Fixture root.
relations:
  - type: related_to
    target: claim.fixture
    href: claims/claim.md
---
# Knowledge Wiki

[Claim](claims/claim.md#bounded-proposition)
[Source](sources/source.md)
[Asset](assets/asset.md)
[Projection](projections/projection.md)
`,
  "claims/claim.md": `---
id: claim.fixture
title: Fixture claim
kind: claim
status: maintained
visibility: public-safe
sensitivity: low
last_reviewed: 2026-07-18
aliases: []
canonical_path: docs/knowledge-bank/claims/claim.md
summary: Bounded fixture claim.
claim_status: confirmed
relations:
  - type: uses_source
    target: source.fixture
    href: ../sources/source.md
  - type: projected_to
    target: portfolio.fixture
    href: ../projections/projection.md
evidence:
  - target: source.fixture
    relationship: direct-support
    confidence: high
    supports:
      - bounded fact
projection:
  status: active
  surfaces:
    - /work/fixture
anti_claims:
  - Do not broaden the claim.
---
# Fixture claim

## Bounded proposition

[Source](../sources/source.md#supports)
`,
  "sources/source.md": `---
id: source.fixture
title: Fixture source
kind: source
status: maintained
visibility: public
sensitivity: low
last_reviewed: 2026-07-18
aliases: []
canonical_path: docs/knowledge-bank/sources/source.md
summary: Public fixture source.
source_kind: published-article
relations:
  - type: supports
    target: claim.fixture
    href: ../claims/claim.md
---
# Fixture source

## Supports

Bounded fact.
`,
  "assets/asset.md": `---
id: asset.fixture
title: Fixture asset
kind: asset
status: governed-open
visibility: summary-only
sensitivity: moderate
last_reviewed: 2026-07-18
aliases: []
canonical_path: docs/knowledge-bank/assets/asset.md
summary: Metadata-only fixture asset.
rights_state: permission-needed
consent_state: review-needed
public_display_status: hold
projection:
  status: hold
  surfaces: []
relations: []
---
# Fixture asset
`,
  "projections/projection.md": `---
id: portfolio.fixture
title: Fixture projection
kind: projection
status: maintained
visibility: public
sensitivity: low
last_reviewed: 2026-07-18
aliases: []
canonical_path: docs/knowledge-bank/projections/projection.md
summary: Public fixture projection.
route: /work/fixture
projection_status: active
relations:
  - type: related_to
    target: claim.fixture
    href: ../claims/claim.md
---
# Fixture projection
`
};

function fixture() {
  const root = mkdtempSync(path.join(tmpdir(), "knowledge-wiki-test-"));
  const wiki = path.join(root, "docs/knowledge-bank");
  for (const [relative, content] of Object.entries(files)) {
    const target = path.join(wiki, relative);
    mkdirSync(path.dirname(target), { recursive: true });
    writeFileSync(target, content);
  }
  return root;
}

function mutate(root, relative, mutation) {
  const target = path.join(root, "docs/knowledge-bank", relative);
  writeFileSync(target, mutation(readFileSync(target, "utf8")));
}

function compile(root) {
  return compileWiki({ repoRoot: root, sourceMetadata: metadata });
}

function assertIssue(result, code) {
  assert.ok(result.issues.some((issue) => issue.code === code), `expected ${code}`);
}

test("bounded fixture passes all hard gates", () => {
  const result = compile(fixture());
  assert.deepEqual(result.errors, []);
  assert.equal(result.health.orphans.length, 0);
});

test("graph compilation is deterministic", () => {
  const root = fixture();
  const first = compile(root);
  const second = compile(root);
  assert.equal(semanticGraphFingerprint(first.graph), semanticGraphFingerprint(second.graph));
});

test("broken relative file link fails", () => {
  const root = fixture();
  mutate(root, "README.md", (value) => `${value}\n[Missing](missing.md)\n`);
  assertIssue(compile(root), "BROKEN_LINK");
});

test("broken heading fragment fails", () => {
  const root = fixture();
  mutate(root, "README.md", (value) => value.replace("#bounded-proposition", "#not-a-heading"));
  assertIssue(compile(root), "BROKEN_FRAGMENT");
});

test("duplicate stable ID fails", () => {
  const root = fixture();
  const source = readFileSync(path.join(root, "docs/knowledge-bank/sources/source.md"), "utf8")
    .replace("canonical_path: docs/knowledge-bank/sources/source.md", "canonical_path: docs/knowledge-bank/sources/duplicate.md");
  writeFileSync(path.join(root, "docs/knowledge-bank/sources/duplicate.md"), source);
  assertIssue(compile(root), "DUPLICATE_ID");
});

test("alias collision fails", () => {
  const root = fixture();
  mutate(root, "claims/claim.md", (value) => value.replace("aliases: []", "aliases:\n  - shared alias"));
  mutate(root, "sources/source.md", (value) => value.replace("aliases: []", "aliases:\n  - Shared Alias"));
  assertIssue(compile(root), "ALIAS_COLLISION");
});

test("unknown typed relation target fails", () => {
  const root = fixture();
  mutate(root, "claims/claim.md", (value) => value.replace("target: source.fixture", "target: source.missing"));
  assertIssue(compile(root), "UNKNOWN_RELATION_TARGET");
});

test("invalid record kind fails schema", () => {
  const root = fixture();
  mutate(root, "claims/claim.md", (value) => value.replace("kind: claim", "kind: rumor"));
  assertIssue(compile(root), "SCHEMA");
});

test("invalid relation type fails schema", () => {
  const root = fixture();
  mutate(root, "claims/claim.md", (value) => value.replace("type: uses_source", "type: magically_proves"));
  assertIssue(compile(root), "SCHEMA");
});

test("incompatible relation shape fails", () => {
  const root = fixture();
  mutate(root, "claims/claim.md", (value) => value.replace("type: uses_source", "type: has_asset"));
  assertIssue(compile(root), "RELATION_SHAPE");
});

test("private absolute path fails", () => {
  const root = fixture();
  mutate(root, "claims/claim.md", (value) => `${value}\nProtected locator: /Users/example/private.txt\n`);
  assertIssue(compile(root), "PRIVATE_PATH");
});

test("pending claim cannot project publicly", () => {
  const root = fixture();
  mutate(root, "claims/claim.md", (value) => value.replace("status: maintained", "status: draft"));
  assertIssue(compile(root), "PENDING_PROJECTION");
});

test("pending-rights media cannot project publicly", () => {
  const root = fixture();
  mutate(root, "assets/asset.md", (value) =>
    value.replace("projection:\n  status: hold", "projection:\n  status: active")
  );
  assertIssue(compile(root), "PRIVATE_PROJECTION");
  assertIssue(compile(root), "RIGHTS_PROJECTION");
});

test("documented non-recovery cannot become positive support", () => {
  const root = fixture();
  mutate(root, "claims/claim.md", (value) => value.replace("relationship: direct-support", "relationship: documented-negative-search"));
  assertIssue(compile(root), "NON_RECOVERY_POSITIVE");
});

test("relation href must resolve to the stable target path", () => {
  const root = fixture();
  mutate(root, "claims/claim.md", (value) => value.replace("href: ../sources/source.md", "href: ../assets/asset.md"));
  assertIssue(compile(root), "RELATION_HREF_MISMATCH");
});

test("claim evidence must target a source, asset, or research run", () => {
  const root = fixture();
  mutate(root, "claims/claim.md", (value) => value.replace("target: source.fixture\n    relationship", "target: portfolio.fixture\n    relationship"));
  assertIssue(compile(root), "INVALID_EVIDENCE_KIND");
});

test("intentional source and asset leaves are not orphans", () => {
  const result = compile(fixture());
  assert.ok(!result.health.orphans.some((item) => ["source.fixture", "asset.fixture"].includes(item.id)));
});

test("accidental active project orphan is reported", () => {
  const root = fixture();
  const target = path.join(root, "docs/knowledge-bank/projects/orphan.md");
  mkdirSync(path.dirname(target), { recursive: true });
  writeFileSync(target, `---
id: project.orphan
title: Orphan project
kind: project
status: maintained
visibility: public-safe
sensitivity: low
last_reviewed: 2026-07-18
aliases: []
canonical_path: docs/knowledge-bank/projects/orphan.md
summary: Deliberately unlinked fixture.
relations: []
---
# Orphan project
`);
  assertIssue(compile(root), "ORPHAN");
});

test("stable identity survives a file move when links and canonical path move", () => {
  const root = fixture();
  const oldPath = path.join(root, "docs/knowledge-bank/sources/source.md");
  const newPath = path.join(root, "docs/knowledge-bank/sources/renamed-source.md");
  renameSync(oldPath, newPath);
  mutate(root, "sources/renamed-source.md", (value) => value.replace("sources/source.md", "sources/renamed-source.md"));
  mutate(root, "README.md", (value) => value.replace("sources/source.md", "sources/renamed-source.md"));
  mutate(root, "claims/claim.md", (value) => value.replaceAll("../sources/source.md", "../sources/renamed-source.md"));
  const result = compile(root);
  assert.deepEqual(result.errors, []);
  assert.equal(result.byId.get("source.fixture").path, "docs/knowledge-bank/sources/renamed-source.md");
});

test("collective credit cannot mutate into sole authorship", () => {
  const root = fixture();
  mutate(root, "claims/claim.md", (value) => value.replace("claim_status: confirmed", "claim_status: confirmed\ncredit_scope: collective") + "\nJamie single-handedly built the collective work.\n");
  assertIssue(compile(root), "COLLECTIVE_TO_SOLE");
});

test("a mention cannot be promoted to endorsement", () => {
  const root = fixture();
  mutate(root, "projections/projection.md", (value) => value.replace("type: related_to", "type: mentions").replace("href: ../claims/claim.md", "href: ../claims/claim.md\n    context: This mention proves endorsement."));
  assertIssue(compile(root), "MENTION_ENDORSEMENT");
});

test("generated file cannot masquerade as an authored record", () => {
  const root = fixture();
  mutate(root, "claims/claim.md", (value) => `<!-- GENERATED FILE. DO NOT EDIT. -->\n${value}`);
  assertIssue(compile(root), "GENERATED_AS_AUTHORED");
});
