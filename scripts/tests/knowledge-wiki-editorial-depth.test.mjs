import assert from "node:assert/strict";
import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { afterEach, test } from "node:test";
import { fileURLToPath } from "node:url";
import { evaluateEditorialDepth } from "../knowledge-wiki/editorial-depth-eval-lib.mjs";

const TEST_DIR = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(TEST_DIR, "../..");
const roots = [];

function candidate() {
  const root = mkdtempSync(join(tmpdir(), "knowledge-wiki-editorial-depth-"));
  roots.push(root);
  cpSync(resolve(REPO_ROOT, "docs"), resolve(root, "docs"), { recursive: true });
  mkdirSync(resolve(root, "scripts/tests"), { recursive: true });
  cpSync(
    resolve(REPO_ROOT, "scripts/tests/knowledge-wiki-editorial-depth.test.mjs"),
    resolve(root, "scripts/tests/knowledge-wiki-editorial-depth.test.mjs")
  );
  return root;
}

function mutate(root, path, transform) {
  const absolute = resolve(root, path);
  writeFileSync(absolute, transform(readFileSync(absolute, "utf8")));
}

afterEach(() => {
  while (roots.length) rmSync(roots.pop(), { recursive: true, force: true });
});

test("baseline editorial-depth candidate passes", () => {
  const result = evaluateEditorialDepth({ repoRoot: REPO_ROOT });
  assert.equal(Object.values(result.checks).every((check) => check.passed), true);
});

test("mutation rejects a missing editorial-depth page", () => {
  const root = candidate();
  rmSync(resolve(root, "docs/knowledge-wiki/methods/learning-through-making.md"));
  assert.equal(evaluateEditorialDepth({ repoRoot: root }).checks["ED-001"].passed, false);
});

test("mutation rejects a page without canonical authority", () => {
  const root = candidate();
  mutate(root, "docs/knowledge-wiki/methods/identity-systems-as-shared-infrastructure.md", (text) =>
    text.replace(/authority_refs:\n[\s\S]*?\nrelations:/, "authority_refs: []\nrelations:")
  );
  assert.equal(evaluateEditorialDepth({ repoRoot: root }).checks["ED-002"].passed, false);
});

test("mutation rejects a missing source-return section", () => {
  const root = candidate();
  mutate(root, "docs/knowledge-wiki/indexes/places-where-work-became-real.md", (text) =>
    text.replace("## Source Return", "## Archive Note")
  );
  assert.equal(evaluateEditorialDepth({ repoRoot: root }).checks["ED-002"].passed, false);
});

test("mutation rejects collapsed identity contribution types", () => {
  const root = candidate();
  mutate(root, "docs/knowledge-wiki/methods/identity-systems-as-shared-infrastructure.md", (text) =>
    text.replace("authorship of a particular post or artifact", "social publishing")
  );
  assert.equal(evaluateEditorialDepth({ repoRoot: root }).checks["ED-003"].passed, false);
});

test("mutation rejects removal of the identity media and typeface boundary", () => {
  const root = candidate();
  mutate(root, "docs/knowledge-wiki/methods/identity-systems-as-shared-infrastructure.md", (text) =>
    text.replace("## Media And Typeface Boundary", "## Visual Examples")
  );
  assert.equal(evaluateEditorialDepth({ repoRoot: root }).checks["ED-003"].passed, false);
});

test("mutation rejects erasure of the learning and writing tension", () => {
  const root = candidate();
  mutate(root, "docs/knowledge-wiki/methods/learning-through-making.md", (text) =>
    text.replace("Learning through making is not an excuse to avoid writing", "Making replaces writing")
  );
  assert.equal(evaluateEditorialDepth({ repoRoot: root }).checks["ED-004"].passed, false);
});

test("mutation rejects exposure of protected academic identity", () => {
  const root = candidate();
  mutate(root, "docs/knowledge-wiki/methods/learning-through-making.md", (text) => `${text}\nStudent ID 0120470\n`);
  assert.equal(evaluateEditorialDepth({ repoRoot: root }).checks["ED-004"].passed, false);
});

test("mutation rejects deployment inflation in learning history", () => {
  const root = candidate();
  mutate(root, "docs/knowledge-wiki/methods/learning-through-making.md", (text) =>
    text.replace("**Does not establish:** production deployment of classroom prototypes", "**Does not establish:** later commercial adoption")
  );
  assert.equal(evaluateEditorialDepth({ repoRoot: root }).checks["ED-004"].passed, false);
});

test("mutation rejects removal of the place and person boundary", () => {
  const root = candidate();
  mutate(root, "docs/knowledge-wiki/indexes/places-where-work-became-real.md", (text) =>
    text.replace("No person becomes evidentiary texture", "People supply useful narrative detail")
  );
  assert.equal(evaluateEditorialDepth({ repoRoot: root }).checks["ED-005"].passed, false);
});

test("mutation rejects a present-day place safety inference", () => {
  const root = candidate();
  mutate(root, "docs/knowledge-wiki/indexes/places-where-work-became-real.md", (text) =>
    text.replace("**Does not establish:** present-day access or safety", "**Does not establish:** current programming")
  );
  assert.equal(evaluateEditorialDepth({ repoRoot: root }).checks["ED-005"].passed, false);
});

test("mutation rejects a resolved first-person authorship gate", () => {
  const root = candidate();
  mutate(root, "docs/knowledge-wiki/methods/what-is-at-stake-for-me.md", (text) =>
    text.replace("human_review_state: requested", "human_review_state: resolved")
  );
  assert.equal(evaluateEditorialDepth({ repoRoot: root }).checks["ED-006"].passed, false);
});

test("mutation rejects an unlabeled AI-assisted first-person draft", () => {
  const root = candidate();
  mutate(root, "docs/knowledge-wiki/methods/what-is-at-stake-for-me.md", (text) =>
    text.replace("**Authorship status:** This is an AI-assisted first-person draft", "**Statement:**")
  );
  assert.equal(evaluateEditorialDepth({ repoRoot: root }).checks["ED-006"].passed, false);
});

test("mutation rejects a first-person draft marked projection-ready", () => {
  const root = candidate();
  mutate(root, "docs/knowledge-wiki/methods/what-is-at-stake-for-me.md", (text) =>
    text.replace("projection_status: pending", "projection_status: ready")
  );
  assert.equal(evaluateEditorialDepth({ repoRoot: root }).checks["ED-006"].passed, false);
});

test("mutation rejects a missing edited-index link", () => {
  const root = candidate();
  mutate(root, "docs/knowledge-wiki/indexes/projects.md", (text) =>
    text.replace("places-where-work-became-real.md", "projects.md")
  );
  assert.equal(evaluateEditorialDepth({ repoRoot: root }).checks["ED-007"].passed, false);
});

test("mutation rejects removal of governed re-entry", () => {
  const root = candidate();
  mutate(root, "docs/knowledge-wiki/research-runs/editorial-depth-source-return-2026.md", (text) =>
    text.replace("## Re-Entry Rule", "## Notes")
  );
  assert.equal(evaluateEditorialDepth({ repoRoot: root }).checks["ED-007"].passed, false);
});

test("mutation rejects a private source locator", () => {
  const root = candidate();
  mutate(root, "docs/knowledge-wiki/research-runs/editorial-depth-source-return-2026.md", (text) =>
    `${text}\n/Users/example/private-voice-guide.md\n`
  );
  assert.equal(evaluateEditorialDepth({ repoRoot: root }).checks["ED-007"].passed, false);
});
