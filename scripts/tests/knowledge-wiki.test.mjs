import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import {
  checkGeneratedArtifacts,
  graphFingerprint,
  loadKnowledgeWiki,
  queryWiki,
  repoRoot
} from "../lib/knowledge-wiki.mjs";

const required = {
  status: "maintained",
  visibility: "public-safe",
  sensitivity: "low",
  projection_status: "not-applicable",
  discoverable: true,
  last_reviewed: "2026-07-18",
  review_by: "2027-01-18",
  review_state: "completed"
};
const coveredMutationIds = [
  "alias-collision",
  "broken-file-link",
  "broken-heading-fragment",
  "duplicate-stable-id",
  "invalid-record-kind",
  "invalid-relation-shape",
  "not-recovered-to-never-existed",
  "pending-public-projection",
  "pending-rights-media",
  "private-path",
  "unknown-relation-target"
];

function yamlValue(value, indent = 0) {
  const pad = " ".repeat(indent);
  if (Array.isArray(value)) return value.length ? `\n${value.map((item) => `${pad}- ${item}`).join("\n")}` : " []";
  if (typeof value === "boolean") return ` ${value}`;
  return ` ${value}`;
}

function recordFile(root, relative, data, body) {
  const file = path.join(root, relative);
  const canonicalPath = path.relative(repoRoot, file).split(path.sep).join("/");
  const merged = { wiki_record: true, ...required, ...data, canonical_path: canonicalPath };
  const lines = ["---"];
  for (const [key, value] of Object.entries(merged)) {
    if (key === "relations") {
      lines.push("relations:");
      for (const relation of value) {
        lines.push(`  - type: ${relation.type}`, `    target: ${relation.target}`, `    href: ${relation.href}`);
      }
    } else if (Array.isArray(value)) {
      lines.push(`${key}:${yamlValue(value, 2)}`);
    } else lines.push(`${key}:${yamlValue(value)}`);
  }
  lines.push("---", "", body, "");
  writeFileSync(file, lines.join("\n"));
}

function fixture(configure = () => {}) {
  const root = mkdtempSync(path.join(repoRoot, ".wiki-test-"));
  const state = {
    rootData: {
      id: "index.knowledge-wiki",
      title: "Start here",
      kind: "index",
      aliases: ["Wiki root"],
      relations: []
    },
    rootBody: "# Start Here\n\n[Project](project.md#orientation)",
    projectData: {
      id: "project.example",
      title: "Example",
      kind: "project",
      aliases: ["Example project"],
      relations: []
    },
    projectBody: "# Example\n\n## Orientation\n\nA bounded project record.",
    extras: []
  };
  configure(state, root);
  recordFile(root, "README.md", state.rootData, state.rootBody);
  recordFile(root, "project.md", state.projectData, state.projectBody);
  for (const extra of state.extras) recordFile(root, extra.path, extra.data, extra.body);
  return {
    root,
    load: () => loadKnowledgeWiki({ root }),
    cleanup: () => rmSync(root, { recursive: true, force: true })
  };
}

function expectFailure(configure, expected) {
  const testFixture = fixture(configure);
  try {
    const wiki = testFixture.load();
    assert.ok(wiki.inspection.errors.some((error) => error.includes(expected)), wiki.inspection.errors.join("\n"));
  } finally {
    testFixture.cleanup();
  }
}

test("foundation Wiki passes hard gates and generated outputs are current", () => {
  const wiki = loadKnowledgeWiki();
  assert.deepEqual(wiki.inspection.errors, []);
  assert.deepEqual(checkGeneratedArtifacts(wiki), []);
  assert.equal(wiki.health.hardGates.status, "pass");
});

test("graph generation is deterministic", () => {
  assert.equal(graphFingerprint(loadKnowledgeWiki().graph), graphFingerprint(loadKnowledgeWiki().graph));
});

test("stable identity survives a fixture file move", () => {
  const first = fixture();
  const second = fixture((state) => {
    state.rootBody = "# Start Here\n\n[Project](renamed.md#orientation)";
  });
  try {
    const firstId = first.load().records.find((record) => record.kind === "project").id;
    const source = path.join(second.root, "project.md");
    const target = path.join(second.root, "renamed.md");
    const content = readFileSync(source, "utf8").replace(/canonical_path: .+/, `canonical_path: ${path.relative(repoRoot, target).split(path.sep).join("/")}`);
    writeFileSync(target, content);
    rmSync(source);
    const secondId = second.load().records.find((record) => record.kind === "project").id;
    assert.equal(firstId, secondId);
  } finally {
    first.cleanup();
    second.cleanup();
  }
});

test("query benchmark returns bounded CallNYC records", () => {
  const wiki = loadKnowledgeWiki({ failOnErrors: true });
  assert.deepEqual(queryWiki(wiki, { id: "project.callnyc" }).nodes.map((node) => node.id), ["project.callnyc"]);
  assert.ok(queryWiki(wiki, { surface: "/work/callnyc" }).nodes.some((node) => node.id === "portfolio.work.callnyc"));
  assert.equal(queryWiki(wiki, { canonicalRef: "SRC-CALLNYC-CIVIC-HALL-POST-693124020917522433" }).nodes[0].id, "source.civichall.hackathon-announcement.2016");
});

test("relational atlas preserves noncausality and private-graph boundaries", () => {
  const text = readFileSync(path.join(repoRoot, "docs/knowledge-bank/indexes/relational-infrastructure-atlas.md"), "utf8").replace(/\s+/g, " ");
  assert.match(text, /Typed proximity is not causality, attendance, authorship, endorsement, or measured impact/);
  assert.match(text, /does not publish a private relationship graph/);
  assert.match(text, /generated graph is an index, not an argument/);
});

test("operational outcomes keep responsibility, delivery, result, and unknown separate", () => {
  const text = readFileSync(path.join(repoRoot, "docs/knowledge-bank/indexes/decisions-deliverables-and-operational-outcomes.md"), "utf8").replace(/\s+/g, " ");
  assert.match(text, /Government action is not Jamie's action/);
  assert.match(text, /A delivered artifact is not an adopted recommendation/);
  assert.match(text, /No row may collapse difficulty, responsibility, deliverable, team outcome, and unknown into one sentence/);
});

test("maintenance and care preserve distinct modes and collective labor", () => {
  const text = readFileSync(path.join(repoRoot, "docs/knowledge-bank/indexes/maintenance-and-care.md"), "utf8").replace(/\s+/g, " ");
  for (const mode of ["Physical repair and sequencing", "Digital continuity", "Recurring participation", "Information stewardship", "Governed memory", "Responsible transition"]) {
    assert.match(text, new RegExp(mode));
  }
  assert.match(text, /does not support a single continuous maintenance role across all projects/);
  assert.match(text, /Care language must not obscure labor allocation/);
});

test("mutation fixture contract matches implemented adversarial cases", () => {
  const fixtures = JSON.parse(readFileSync(path.join(repoRoot, "evals/knowledge-wiki/fixtures/mutations.json"), "utf8"));
  assert.deepEqual(fixtures.map((fixture) => fixture.id).sort(), coveredMutationIds);
});

test("broken file links fail", () => expectFailure((state) => { state.rootBody = "# Start Here\n\n[Missing](missing.md)"; }, "broken file link"));
test("broken heading fragments fail", () => expectFailure((state) => { state.rootBody = "# Start Here\n\n[Project](project.md#missing)"; }, "broken heading fragment"));
test("duplicate stable IDs fail", () => expectFailure((state) => { state.extras.push({ path: "duplicate.md", data: { ...state.projectData }, body: "# Duplicate" }); }, "duplicate stable ID"));
test("unknown relation targets fail", () => expectFailure((state) => { state.projectData.relations = [{ type: "documents", target: "source.missing", href: "missing.md" }]; }, "relation targets unknown record"));
test("invalid record kinds fail", () => expectFailure((state) => { state.projectData.kind = "initiative"; }, "unknown kind"));
test("incompatible relation shapes fail", () => expectFailure((state) => { state.rootData.relations = [{ type: "uses_source", target: "project.example", href: "project.md" }]; }, "cannot target"));
test("alias collisions fail", () => expectFailure((state) => { state.projectData.aliases = ["Wiki root"]; }, "alias collision"));
test("private paths fail", () => expectFailure((state) => { state.projectBody += "\n\nProtected at /Users/example/private-source."; }, "private path"));
test("pending claims cannot project publicly", () => expectFailure((state) => { state.projectData.allowed_surfaces = ["/work/example"]; state.projectData.projection_status = "pending"; }, "cannot project publicly"));
test("pending-rights media cannot project publicly", () => expectFailure((state) => { state.projectData.kind = "asset"; state.projectData.allowed_surfaces = ["/work/example"]; state.projectData.projection_status = "ready"; state.projectData.rights_state = "private-review"; }, "public asset projection requires cleared rights"));
test("not recovered cannot become never existed", () => expectFailure((state) => { state.projectData.kind = "claim"; state.projectData.knowledge_status = "not-recovered"; state.projectBody = "# Example\n\nThe page never existed."; }, "not-recovered cannot be presented as never existed"));
