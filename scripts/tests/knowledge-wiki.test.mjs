import assert from "node:assert/strict";
import { mkdtempSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import test from "node:test";
import {
  buildWikiGraph,
  loadWiki,
  queryWiki,
  readRetrievalTasks,
  validateWiki
} from "../knowledge-wiki/lib.mjs";

function frontmatter({
  id,
  title,
  kind,
  canonicalPath,
  status = "maintained",
  visibility = "public-safe",
  projectionStatus = "never-public",
  authorityRefs = [],
  relations = [],
  extra = ""
}) {
  const authorityYaml = authorityRefs.length
    ? `authority_refs:\n${authorityRefs.map((ref) => `  - domain: ${ref.domain}\n    id: ${ref.id}`).join("\n")}\n`
    : "authority_refs: []\n";
  const relationYaml = relations.length
    ? `relations:\n${relations
        .map(
          (relation) =>
            `  - type: ${relation.type}\n    target: ${relation.target}\n    context: ${relation.context}`
        )
        .join("\n")}\n`
    : "relations: []\n";
  return `---\n` +
    `id: ${id}\n` +
    `title: ${title}\n` +
    `kind: ${kind}\n` +
    `status: ${status}\n` +
    `visibility: ${visibility}\n` +
    `sensitivity: low\n` +
    `projection_status: ${projectionStatus}\n` +
    `last_reviewed: "2026-07-18"\n` +
    `review_by: "2027-01-18"\n` +
    `human_review_state: not-requested\n` +
    `aliases: []\n` +
    `canonical_path: ${canonicalPath}\n` +
    `summary: Public-safe deterministic fixture.\n` +
    authorityYaml +
    relationYaml +
    `${extra}` +
    `---\n\n# ${title}\n`;
}

function baseFiles(rootLink = "[Source](source.md#known)") {
  return {
    "README.md":
      frontmatter({
        id: "index.knowledge-wiki",
        title: "Knowledge Wiki",
        kind: "index",
        canonicalPath: "README.md"
      }) + `\n${rootLink}\n`,
    "source.md":
      frontmatter({
        id: "source.fixture",
        title: "Fixture Source",
        kind: "source",
        canonicalPath: "source.md",
        authorityRefs: [
          { domain: "source", id: "SRC-CALLNYC-CIVIC-HALL-POST-693124020917522433" }
        ]
      }) + "\n## Known\n\nThis fixture is intentionally a document leaf.\n"
  };
}

function fixture(files = baseFiles()) {
  const root = mkdtempSync(resolve(tmpdir(), "knowledge-wiki-test-"));
  for (const [path, content] of Object.entries(files)) {
    writeFileSync(resolve(root, path), content);
  }
  return {
    root,
    load: () => loadWiki({ rootDir: root, pathBase: root }),
    cleanup: () => rmSync(root, { recursive: true, force: true })
  };
}

function codes(result) {
  return new Set(result.errors.map((entry) => entry.code));
}

test("canonical Knowledge Wiki passes every hard gate", () => {
  const result = validateWiki(loadWiki());
  assert.deepEqual(result.errors, []);
  assert.equal(result.metrics.rootReachable, result.metrics.discoverable);
  assert.equal(result.metrics.unexplainedOrphans.length, 0);
  assert.equal(result.metrics.deadEnds.length, 0);
  assert.equal(result.metrics.wantedPages.length, 1);
  assert.equal(result.metrics.rightsBacklog.length, 1);
});

test("Wiki Graph is deterministic for one source tree", () => {
  const records = loadWiki();
  const first = buildWikiGraph(records);
  const second = buildWikiGraph(records);
  assert.deepEqual(first, second);
  assert.equal(first.nodes.length, records.length);
  assert.match(first.semanticFingerprint, /^[a-f0-9]{64}$/);
});

test("bounded query and task operators expose records without mutation", () => {
  const result = queryWiki({ mode: "question", value: "digital-district-protection" });
  assert.equal(result.error, undefined);
  assert.deepEqual(
    result.records.map((record) => record.id),
    ["asset.photo.callnyc.digital-district.001", "index.media-review"]
  );
  assert.ok(readRetrievalTasks().length >= 9);
});

test("generated graph excludes private locators and filesystem paths", () => {
  const graph = JSON.stringify(buildWikiGraph(loadWiki()));
  assert.doesNotMatch(graph, /\/Users\//);
  assert.doesNotMatch(graph, /\/Volumes\//);
  assert.doesNotMatch(graph, /protectedLocatorId/);
  assert.doesNotMatch(graph, /PHOTO-CALLNYC-DIGITAL-DISTRICT-2016-001/);
});

test("mutation rejects a broken relative file link", () => {
  const item = fixture(baseFiles("[Missing](missing.md)"));
  try {
    assert.ok(codes(validateWiki(item.load(), { pathBase: item.root })).has("broken-file-link"));
  } finally {
    item.cleanup();
  }
});

test("mutation rejects a relative link that leaves the repository", () => {
  const item = fixture(baseFiles("[Outside](../../private-source.md)"));
  try {
    assert.ok(codes(validateWiki(item.load(), { pathBase: item.root })).has("link-outside-repository"));
  } finally {
    item.cleanup();
  }
});

test("mutation rejects a broken heading fragment", () => {
  const item = fixture(baseFiles("[Source](source.md#missing-heading)"));
  try {
    assert.ok(codes(validateWiki(item.load(), { pathBase: item.root })).has("broken-fragment-link"));
  } finally {
    item.cleanup();
  }
});

test("mutation rejects duplicate stable IDs", () => {
  const files = baseFiles();
  files["duplicate.md"] = frontmatter({
    id: "source.fixture",
    title: "Duplicate Fixture",
    kind: "source",
    canonicalPath: "duplicate.md",
    authorityRefs: [
      { domain: "source", id: "SRC-CALLNYC-CIVIC-HALL-POST-693124020917522433" }
    ]
  });
  files["README.md"] += "\n[Duplicate](duplicate.md)\n";
  const item = fixture(files);
  try {
    assert.ok(codes(validateWiki(item.load(), { pathBase: item.root })).has("duplicate-id"));
  } finally {
    item.cleanup();
  }
});

test("mutation rejects unknown and incompatible semantic relations", () => {
  const files = baseFiles();
  files["README.md"] =
    frontmatter({
      id: "index.knowledge-wiki",
      title: "Knowledge Wiki",
      kind: "index",
      canonicalPath: "README.md",
      relations: [
        { type: "uses_source", target: "source.missing", context: "Unknown target fixture." },
        { type: "projected_to", target: "source.fixture", context: "Wrong target kind fixture." }
      ]
    }) + "\n[Source](source.md#known)\n";
  const item = fixture(files);
  try {
    const found = codes(validateWiki(item.load(), { pathBase: item.root }));
    assert.ok(found.has("unknown-relation-target"));
    assert.ok(found.has("incompatible-relation"));
  } finally {
    item.cleanup();
  }
});

test("mutation rejects relations originated by an incompatible record kind", () => {
  const files = baseFiles();
  files["README.md"] =
    frontmatter({
      id: "index.knowledge-wiki",
      title: "Knowledge Wiki",
      kind: "index",
      canonicalPath: "README.md",
      relations: [
        { type: "uses_source", target: "source.fixture", context: "Wrong source kind fixture." }
      ]
    }) + "\n[Source](source.md#known)\n";
  const item = fixture(files);
  try {
    assert.ok(codes(validateWiki(item.load(), { pathBase: item.root })).has("incompatible-relation-source"));
  } finally {
    item.cleanup();
  }
});

test("mutation rejects invalid page and relation vocabularies", () => {
  const files = baseFiles();
  files["source.md"] = frontmatter({
    id: "source.fixture",
    title: "Fixture Source",
    kind: "artifactish",
    canonicalPath: "source.md",
    authorityRefs: [
      { domain: "source", id: "SRC-CALLNYC-CIVIC-HALL-POST-693124020917522433" }
    ],
    relations: [
      { type: "endorsed_by", target: "index.knowledge-wiki", context: "Invalid relation fixture." }
    ]
  }) + "\n## Known\n";
  const item = fixture(files);
  try {
    const found = codes(validateWiki(item.load(), { pathBase: item.root }));
    assert.ok(found.has("invalid-kind"));
    assert.ok(found.has("invalid-relation-type"));
  } finally {
    item.cleanup();
  }
});

test("mutation rejects unknown canonical authority references", () => {
  const files = baseFiles();
  files["source.md"] = frontmatter({
    id: "source.fixture",
    title: "Fixture Source",
    kind: "source",
    canonicalPath: "source.md",
    authorityRefs: [{ domain: "source", id: "SRC-NOT-REAL" }]
  }) + "\n## Known\n";
  const item = fixture(files);
  try {
    assert.ok(codes(validateWiki(item.load(), { pathBase: item.root })).has("unknown-authority-ref"));
  } finally {
    item.cleanup();
  }
});

test("mutation rejects private absolute paths", () => {
  const files = baseFiles();
  files["source.md"] += "\nPrivate locator: /Users/example/private-source.txt\n";
  const item = fixture(files);
  try {
    assert.ok(codes(validateWiki(item.load(), { pathBase: item.root })).has("private-marker"));
  } finally {
    item.cleanup();
  }
});

test("mutation rejects private records in the public Wiki", () => {
  const files = baseFiles();
  files["source.md"] = frontmatter({
    id: "source.fixture",
    title: "Fixture Source",
    kind: "source",
    canonicalPath: "source.md",
    visibility: "private",
    authorityRefs: [
      { domain: "source", id: "SRC-CALLNYC-CIVIC-HALL-POST-693124020917522433" }
    ]
  }) + "\n## Known\n";
  const item = fixture(files);
  try {
    assert.ok(codes(validateWiki(item.load(), { pathBase: item.root })).has("unsafe-repository-visibility"));
  } finally {
    item.cleanup();
  }
});

test("mutation rejects a draft claim projected as ready", () => {
  const files = baseFiles();
  files["claim.md"] =
    frontmatter({
      id: "claim.fixture",
      title: "Fixture Claim",
      kind: "claim",
      canonicalPath: "claim.md",
      status: "draft",
      projectionStatus: "ready",
      authorityRefs: [{ domain: "claim", id: "CLM-CALLNYC-INDEPENDENT-FOLLOW-ON" }],
      relations: [
        { type: "uses_source", target: "source.fixture", context: "Required support fixture." }
      ]
    }) + "\n[Source](source.md)\n";
  files["README.md"] += "\n[Claim](claim.md)\n";
  const item = fixture(files);
  try {
    assert.ok(codes(validateWiki(item.load(), { pathBase: item.root })).has("unreviewed-projection"));
  } finally {
    item.cleanup();
  }
});

test("mutation rejects pending-rights media projected publicly", () => {
  const files = baseFiles();
  files["asset.md"] =
    frontmatter({
      id: "asset.fixture",
      title: "Fixture Asset",
      kind: "asset",
      canonicalPath: "asset.md",
      projectionStatus: "ready",
      authorityRefs: [
        { domain: "source", id: "SRC-CALLNYC-DIGITAL-DISTRICT-PHOTO" }
      ],
      extra: "rights_state: permission-needed\nconsent_state: review-needed\npublic_display_status: hold\n"
    }) + "\n[Source](source.md)\n";
  files["README.md"] += "\n[Asset](asset.md)\n";
  const item = fixture(files);
  try {
    assert.ok(codes(validateWiki(item.load(), { pathBase: item.root })).has("rights-projection"));
  } finally {
    item.cleanup();
  }
});

test("mutation requires explicit governance for every media asset", () => {
  const files = baseFiles();
  files["asset.md"] =
    frontmatter({
      id: "asset.fixture",
      title: "Fixture Asset",
      kind: "asset",
      canonicalPath: "asset.md",
      authorityRefs: [
        { domain: "source", id: "SRC-CALLNYC-DIGITAL-DISTRICT-PHOTO" }
      ]
    }) + "\n[Source](source.md)\n";
  files["README.md"] += "\n[Asset](asset.md)\n";
  const item = fixture(files);
  try {
    assert.ok(codes(validateWiki(item.load(), { pathBase: item.root })).has("missing-media-governance"));
  } finally {
    item.cleanup();
  }
});

test("mutation rejects wanted records that already exist", () => {
  const files = baseFiles();
  files["README.md"] =
    frontmatter({
      id: "index.knowledge-wiki",
      title: "Knowledge Wiki",
      kind: "index",
      canonicalPath: "README.md",
      extra:
        "wanted:\n" +
        "  - id: source.fixture\n" +
        "    proposed_title: Fixture Source\n" +
        "    reason: This request should have been closed.\n"
    }) + "\n[Source](source.md#known)\n";
  const item = fixture(files);
  try {
    assert.ok(codes(validateWiki(item.load(), { pathBase: item.root })).has("resolved-wanted-record"));
  } finally {
    item.cleanup();
  }
});

test("mutation rejects non-recovery used as positive evidence", () => {
  const files = baseFiles();
  files["source.md"] =
    frontmatter({
      id: "source.fixture",
      title: "Fixture Source",
      kind: "source",
      canonicalPath: "source.md",
      projectionStatus: "careful",
      authorityRefs: [
        { domain: "source", id: "SRC-CALLNYC-CIVIC-HALL-POST-693124020917522433" }
      ],
      extra: "absence_state: not-recovered\npositive_evidence: true\n"
    }) + "\n## Known\n";
  const item = fixture(files);
  try {
    assert.ok(codes(validateWiki(item.load(), { pathBase: item.root })).has("absence-overclaim"));
  } finally {
    item.cleanup();
  }
});

test("file move preserves stable identity when canonical path and prose link move together", () => {
  const item = fixture();
  try {
    const before = buildWikiGraph(item.load());
    renameSync(resolve(item.root, "source.md"), resolve(item.root, "moved-source.md"));
    const movedSource = baseFiles()["source.md"].replace("canonical_path: source.md", "canonical_path: moved-source.md");
    writeFileSync(resolve(item.root, "moved-source.md"), movedSource);
    writeFileSync(
      resolve(item.root, "README.md"),
      baseFiles("[Source](moved-source.md#known)")["README.md"]
    );
    const movedRecords = item.load();
    const validation = validateWiki(movedRecords, { pathBase: item.root });
    const after = buildWikiGraph(movedRecords);
    assert.deepEqual(validation.errors, []);
    assert.ok(before.nodes.some((node) => node.id === "source.fixture" && node.path === "source.md"));
    assert.ok(after.nodes.some((node) => node.id === "source.fixture" && node.path === "moved-source.md"));
  } finally {
    item.cleanup();
  }
});
