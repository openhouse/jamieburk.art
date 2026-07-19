import assert from "node:assert/strict";
import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { afterEach, test } from "node:test";
import { fileURLToPath } from "node:url";
import { evaluateSourceReturn } from "../knowledge-wiki/source-return-eval-lib.mjs";

const TEST_DIR = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(TEST_DIR, "../..");
const roots = [];

function candidate() {
  const root = mkdtempSync(join(tmpdir(), "knowledge-wiki-source-return-"));
  roots.push(root);
  cpSync(resolve(REPO_ROOT, "docs"), resolve(root, "docs"), { recursive: true });
  mkdirSync(resolve(root, "scripts/tests"), { recursive: true });
  cpSync(resolve(REPO_ROOT, "scripts/tests/knowledge-wiki-source-return.test.mjs"), resolve(root, "scripts/tests/knowledge-wiki-source-return.test.mjs"));
  return root;
}

function mutate(root, path, transform) {
  const absolute = resolve(root, path);
  writeFileSync(absolute, transform(readFileSync(absolute, "utf8")));
}

afterEach(() => {
  while (roots.length) rmSync(roots.pop(), { recursive: true, force: true });
});

test("baseline source-return candidate passes", () => {
  const result = evaluateSourceReturn({ repoRoot: REPO_ROOT });
  assert.equal(Object.values(result.checks).every((check) => check.passed), true);
});

test("mutation rejects a missing approved page", () => {
  const root = candidate();
  rmSync(resolve(root, "docs/knowledge-wiki/projects/wowlist.md"));
  assert.equal(evaluateSourceReturn({ repoRoot: root }).checks["SR-001"].passed, false);
});

test("mutation rejects a missing source-return section", () => {
  const root = candidate();
  mutate(root, "docs/knowledge-wiki/projects/kc-town-hall.md", (text) => text.replace("## Source Return", "## Archive Note"));
  assert.equal(evaluateSourceReturn({ repoRoot: root }).checks["SR-002"].passed, false);
});

test("mutation rejects a page without canonical authority", () => {
  const root = candidate();
  mutate(root, "docs/knowledge-wiki/projects/wowlist.md", (text) =>
    text.replace(/authority_refs:\n[\s\S]*?\nrelations:/, "authority_refs: []\nrelations:")
  );
  assert.equal(evaluateSourceReturn({ repoRoot: root }).checks["SR-002"].passed, false);
});

test("mutation rejects a missing edited-index link", () => {
  const root = candidate();
  mutate(root, "docs/knowledge-wiki/indexes/projects.md", (text) => text.replace("../projects/wowlist.md", "../projects/callnyc.md"));
  assert.equal(evaluateSourceReturn({ repoRoot: root }).checks["SR-003"].passed, false);
});

test("mutation rejects an incomplete source-class receipt", () => {
  const root = candidate();
  mutate(root, "docs/knowledge-wiki/research-runs/missing-pages-return-to-source-2026.md", (text) => text.replace("WOW List production dump", "Application summary"));
  assert.equal(evaluateSourceReturn({ repoRoot: root }).checks["SR-004"].passed, false);
});

test("mutation rejects a source-return receipt without canonical authority", () => {
  const root = candidate();
  mutate(root, "docs/knowledge-wiki/research-runs/missing-pages-return-to-source-2026.md", (text) =>
    text.replace(/authority_refs:\n[\s\S]*?\nrelations:/, "authority_refs: []\nrelations:")
  );
  assert.equal(evaluateSourceReturn({ repoRoot: root }).checks["SR-004"].passed, false);
});

test("mutation rejects a private filesystem locator", () => {
  const root = candidate();
  mutate(root, "docs/knowledge-wiki/projects/wowlist.md", (text) => `${text}\n/Users/example/private-source\n`);
  assert.equal(evaluateSourceReturn({ repoRoot: root }).checks["SR-005"].passed, false);
});

test("mutation rejects closing the human librarian gate", () => {
  const root = candidate();
  mutate(root, "docs/knowledge-wiki/evaluations/missing-pages-and-source-return.md", (text) => text.replace("human_review_state: not-requested", "human_review_state: resolved"));
  assert.equal(evaluateSourceReturn({ repoRoot: root }).checks["SR-006"].passed, false);
});

test("mutation rejects removing governed re-entry", () => {
  const root = candidate();
  mutate(root, "docs/knowledge-wiki/research-runs/missing-pages-return-to-source-2026.md", (text) => text.replace("## Re-Entry Rule", "## Notes"));
  assert.equal(evaluateSourceReturn({ repoRoot: root }).checks["SR-007"].passed, false);
});

test("mutation rejects removing explicit non-support", () => {
  const root = candidate();
  mutate(root, "docs/knowledge-wiki/projects/fair-rent-nyc.md", (text) => text.replace("**Does not establish:**", "**Background:**"));
  assert.equal(evaluateSourceReturn({ repoRoot: root }).checks["SR-002"].passed, false);
});
