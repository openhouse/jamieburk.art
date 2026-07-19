import assert from "node:assert/strict";
import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { afterEach, test } from "node:test";
import { fileURLToPath } from "node:url";
import { evaluateFamilyClosure } from "../knowledge-wiki/family-closure-eval-lib.mjs";

const TEST_DIR = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(TEST_DIR, "../..");
const roots = [];

function candidate() {
  const root = mkdtempSync(join(tmpdir(), "knowledge-wiki-family-closure-"));
  roots.push(root);
  for (const path of ["docs", "scripts", ".agents"]) {
    cpSync(resolve(REPO_ROOT, path), resolve(root, path), { recursive: true });
  }
  cpSync(resolve(REPO_ROOT, "package.json"), resolve(root, "package.json"));
  return root;
}

function mutate(root, path, transform) {
  const absolute = resolve(root, path);
  writeFileSync(absolute, transform(readFileSync(absolute, "utf8")));
}

afterEach(() => {
  while (roots.length) rmSync(roots.pop(), { recursive: true, force: true });
});

test("baseline family-closure candidate passes", () => {
  assert.equal(Object.values(evaluateFamilyClosure().checks).every((check) => check.passed), true);
});

test("mutation rejects an omitted frozen donor", () => {
  const root = candidate();
  mutate(root, "docs/architecture/ADR-knowledge-wiki-family-closure.md", (text) => text.replace("feature/knowledge-wiki-E", "feature/knowledge-wiki-X"));
  assert.equal(evaluateFamilyClosure({ repoRoot: root }).checks["FC-001"].passed, false);
});

test("mutation rejects an omitted archive observation", () => {
  const root = candidate();
  mutate(root, "docs/knowledge-wiki/research-runs/knowledge-wiki-family-closure-2026.md", (text) => text.replace("2,078", "unknown"));
  assert.equal(evaluateFamilyClosure({ repoRoot: root }).checks["FC-002"].passed, false);
});

test("mutation rejects a missing reader-path page", () => {
  const root = candidate();
  rmSync(resolve(root, "docs/knowledge-wiki/methods/jamie-at-work.md"));
  assert.equal(evaluateFamilyClosure({ repoRoot: root }).checks["FC-003"].passed, false);
});

test("mutation rejects removal of Jamie's supported action", () => {
  const root = candidate();
  mutate(root, "docs/knowledge-wiki/indexes/operational-evidence-map.md", (text) => text.replaceAll("Jamie's supported responsibility", "Project activity"));
  assert.equal(evaluateFamilyClosure({ repoRoot: root }).checks["FC-004"].passed, false);
});

test("mutation rejects collapsing adoption into launch", () => {
  const root = candidate();
  mutate(root, "docs/knowledge-wiki/capabilities/handoff-adoption-continuity.md", (text) => text.replace("does not prove the next", "proves the next"));
  assert.equal(evaluateFamilyClosure({ repoRoot: root }).checks["FC-005"].passed, false);
});

test("mutation rejects legislative causality inflation", () => {
  const root = candidate();
  mutate(root, "docs/knowledge-wiki/projects/let-nyc-dance.md", (text) =>
    text.replace(/do(?:es)?\s+not\s+establish\s+sole\s+legislative\s+causality/i, "establishes legislative causality")
  );
  assert.equal(evaluateFamilyClosure({ repoRoot: root }).checks["FC-006"].passed, false);
});

test("mutation rejects erasing the MARCH outcome boundary", () => {
  const root = candidate();
  mutate(root, "docs/knowledge-wiki/projects/talks-not-raids.md", (text) =>
    text.replace(/does\s+not\s+establish\s+that\s+every\s+form\s+of\s+multi-agency\s+nightlife\s+enforcement\s+ended/i, "establishes that multi-agency nightlife enforcement ended")
  );
  assert.equal(evaluateFamilyClosure({ repoRoot: root }).checks["FC-006"].passed, false);
});

test("mutation rejects a decision record without unknowns", () => {
  const root = candidate();
  mutate(root, "docs/knowledge-wiki/decisions/callnyc-issue-pathways.md", (text) => text.replace("unknowns:", "notes:"));
  assert.equal(evaluateFamilyClosure({ repoRoot: root }).checks["FC-007"].passed, false);
});

test("mutation rejects a projected decision record", () => {
  const root = candidate();
  mutate(root, "docs/knowledge-wiki/decisions/kc-town-hall-listening-fieldwork.md", (text) => text.replace("projection_status: never-public", "projection_status: ready"));
  assert.equal(evaluateFamilyClosure({ repoRoot: root }).checks["FC-007"].passed, false);
});

test("mutation rejects a private filesystem locator", () => {
  const root = candidate();
  mutate(root, "docs/knowledge-wiki/evaluations/family-closure.md", (text) => `${text}\n/Users/example/private-record\n`);
  assert.equal(evaluateFamilyClosure({ repoRoot: root }).checks["FC-008"].passed, false);
});

test("mutation rejects resolved human gates", () => {
  const root = candidate();
  mutate(root, "docs/evals/knowledge-wiki-family-closure-state.json", (text) => text.replaceAll('"open"', '"resolved"'));
  assert.equal(evaluateFamilyClosure({ repoRoot: root }).checks["FC-010"].passed, false);
});

test("mutation rejects stale candidate binding", () => {
  const root = candidate();
  mutate(root, "docs/knowledge-wiki/README.md", (text) => `${text}\nCandidate drift.\n`);
  assert.equal(evaluateFamilyClosure({ repoRoot: root }).checks["FC-010"].passed, false);
});
