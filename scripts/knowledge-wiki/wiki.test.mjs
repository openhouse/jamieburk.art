import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, renameSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { compileWiki } from "./lib.mjs";

const canonicalIds = new Set(["SRC-SAMPLE", "SRC-ASSET", "CLM-SAMPLE", "COR-SAMPLE"]);

function write(repoRoot, relativePath, content) {
  const target = path.join(repoRoot, relativePath);
  mkdirSync(path.dirname(target), { recursive: true });
  writeFileSync(target, content);
}

function frontmatter({
  id,
  title,
  kind,
  canonicalPath,
  status = "maintained",
  visibility = "public-safe",
  sensitivity = "low",
  aliases = [],
  canonicalRefs = [],
  relations = [],
  extra = "",
  body = ""
}) {
  const aliasLines = aliases.length
    ? `aliases:\n${aliases.map((value) => `  - ${value}`).join("\n")}\n`
    : "";
  const refLines = canonicalRefs.length
    ? `canonical_refs:\n${canonicalRefs.map((value) => `  - ${value}`).join("\n")}\n`
    : "";
  const relationLines = relations.length
    ? `relations:\n${relations
        .map((relation) => `  - type: ${relation.type}\n    target: ${relation.target}`)
        .join("\n")}\n`
    : "";
  return `---\nid: ${id}\ntitle: ${title}\nkind: ${kind}\nstatus: ${status}\nvisibility: ${visibility}\nsensitivity: ${sensitivity}\nowner: test\nlast_reviewed: "2026-07-18"\nreview_by: "2027-01-18"\ncanonical_path: ${canonicalPath}\ndiscoverable: true\n${aliasLines}${refLines}${relationLines}${extra}---\n\n# ${title}\n\n${body}\n`;
}

function createValidFixture() {
  const repoRoot = mkdtempSync(path.join(os.tmpdir(), "knowledge-wiki-test-"));
  write(
    repoRoot,
    "docs/knowledge-bank/README.md",
    frontmatter({
      id: "index.knowledge-wiki",
      title: "Knowledge Wiki",
      kind: "index",
      canonicalPath: "docs/knowledge-bank/README.md",
      relations: [{ type: "documents", target: "project.sample" }],
      body: "[Sample project](projects/sample.md#orientation)"
    })
  );
  write(
    repoRoot,
    "docs/knowledge-bank/projects/sample.md",
    frontmatter({
      id: "project.sample",
      title: "Sample project",
      kind: "project",
      canonicalPath: "docs/knowledge-bank/projects/sample.md",
      relations: [{ type: "uses_source", target: "source.sample" }],
      body: "## Orientation\n\n[Sample source](../sources/sample.md)"
    })
  );
  write(
    repoRoot,
    "docs/knowledge-bank/sources/sample.md",
    frontmatter({
      id: "source.sample",
      title: "Sample source",
      kind: "source",
      canonicalPath: "docs/knowledge-bank/sources/sample.md",
      canonicalRefs: ["SRC-SAMPLE"],
      relations: [{ type: "documents", target: "project.sample" }],
      body: "[Sample project](../projects/sample.md)"
    })
  );
  return repoRoot;
}

function compile(repoRoot) {
  return compileWiki({
    repoRoot,
    wikiRoot: path.join(repoRoot, "docs/knowledge-bank"),
    canonicalIds,
    now: new Date("2026-07-18T00:00:00Z")
  });
}

function failureCodes(result) {
  return new Set(result.health.hardFailures.map((item) => item.code));
}

test("valid governed pages compile into a deterministic graph", () => {
  const repoRoot = createValidFixture();
  const first = compile(repoRoot);
  const second = compile(repoRoot);
  assert.equal(first.health.hardFailures.length, 0);
  assert.equal(first.health.warnings.length, 0);
  assert.equal(JSON.stringify(first.graph), JSON.stringify(second.graph));
  assert.deepEqual(first.graph.nodes.map((node) => node.id), [
    "index.knowledge-wiki",
    "project.sample",
    "source.sample"
  ]);
});

test("a stable ID survives a link-aware file move", () => {
  const repoRoot = createValidFixture();
  const before = compile(repoRoot);
  const oldPath = path.join(repoRoot, "docs/knowledge-bank/projects/sample.md");
  const newPath = path.join(repoRoot, "docs/knowledge-bank/projects/sample-moved.md");
  renameSync(oldPath, newPath);
  write(
    repoRoot,
    "docs/knowledge-bank/README.md",
    frontmatter({
      id: "index.knowledge-wiki",
      title: "Knowledge Wiki",
      kind: "index",
      canonicalPath: "docs/knowledge-bank/README.md",
      relations: [{ type: "documents", target: "project.sample" }],
      body: "[Sample project](projects/sample-moved.md#orientation)"
    })
  );
  write(
    repoRoot,
    "docs/knowledge-bank/projects/sample-moved.md",
    frontmatter({
      id: "project.sample",
      title: "Sample project",
      kind: "project",
      canonicalPath: "docs/knowledge-bank/projects/sample-moved.md",
      relations: [{ type: "uses_source", target: "source.sample" }],
      body: "## Orientation\n\n[Sample source](../sources/sample.md)"
    })
  );
  write(
    repoRoot,
    "docs/knowledge-bank/sources/sample.md",
    frontmatter({
      id: "source.sample",
      title: "Sample source",
      kind: "source",
      canonicalPath: "docs/knowledge-bank/sources/sample.md",
      canonicalRefs: ["SRC-SAMPLE"],
      relations: [{ type: "documents", target: "project.sample" }],
      body: "[Sample project](../projects/sample-moved.md)"
    })
  );
  const after = compile(repoRoot);
  assert.equal(after.health.hardFailures.length, 0);
  assert.equal(before.graph.nodes.find((node) => node.kind === "project").id, "project.sample");
  assert.equal(after.graph.nodes.find((node) => node.kind === "project").id, "project.sample");
});

test("duplicate stable IDs are rejected", () => {
  const repoRoot = createValidFixture();
  write(
    repoRoot,
    "docs/knowledge-bank/projects/duplicate.md",
    frontmatter({
      id: "project.sample",
      title: "Duplicate",
      kind: "project",
      canonicalPath: "docs/knowledge-bank/projects/duplicate.md"
    })
  );
  assert.ok(failureCodes(compile(repoRoot)).has("identity.duplicate"));
});

test("broken relative files and heading fragments are rejected", () => {
  const repoRoot = createValidFixture();
  write(
    repoRoot,
    "docs/knowledge-bank/README.md",
    frontmatter({
      id: "index.knowledge-wiki",
      title: "Knowledge Wiki",
      kind: "index",
      canonicalPath: "docs/knowledge-bank/README.md",
      relations: [{ type: "documents", target: "project.sample" }],
      body: "[Missing file](projects/missing.md) and [missing heading](projects/sample.md#missing)"
    })
  );
  const codes = failureCodes(compile(repoRoot));
  assert.ok(codes.has("link.file"));
  assert.ok(codes.has("link.fragment"));
});

test("unknown relation types and targets are rejected", () => {
  const repoRoot = createValidFixture();
  write(
    repoRoot,
    "docs/knowledge-bank/projects/sample.md",
    frontmatter({
      id: "project.sample",
      title: "Sample project",
      kind: "project",
      canonicalPath: "docs/knowledge-bank/projects/sample.md",
      relations: [
        { type: "invented_relation", target: "source.sample" },
        { type: "uses_source", target: "source.missing" }
      ],
      body: "## Orientation\n\n[Sample source](../sources/sample.md)"
    })
  );
  const codes = failureCodes(compile(repoRoot));
  assert.ok(codes.has("relation.type"));
  assert.ok(codes.has("relation.unknown-target"));
});

test("alias collisions and unknown canonical references are rejected", () => {
  const repoRoot = createValidFixture();
  write(
    repoRoot,
    "docs/knowledge-bank/projects/sample.md",
    frontmatter({
      id: "project.sample",
      title: "Sample project",
      kind: "project",
      canonicalPath: "docs/knowledge-bank/projects/sample.md",
      aliases: ["Shared alias"],
      canonicalRefs: ["CLM-MISSING"],
      relations: [{ type: "uses_source", target: "source.sample" }],
      body: "## Orientation\n\n[Sample source](../sources/sample.md)"
    })
  );
  write(
    repoRoot,
    "docs/knowledge-bank/sources/sample.md",
    frontmatter({
      id: "source.sample",
      title: "Sample source",
      kind: "source",
      canonicalPath: "docs/knowledge-bank/sources/sample.md",
      aliases: ["Shared alias"],
      canonicalRefs: ["SRC-SAMPLE"],
      relations: [{ type: "documents", target: "project.sample" }]
    })
  );
  const codes = failureCodes(compile(repoRoot));
  assert.ok(codes.has("alias.collision"));
  assert.ok(codes.has("authority.unknown-ref"));
});

test("private paths and protected records are rejected in the public repository", () => {
  const repoRoot = createValidFixture();
  write(
    repoRoot,
    "docs/knowledge-bank/projects/sample.md",
    frontmatter({
      id: "project.sample",
      title: "Sample project",
      kind: "project",
      visibility: "private",
      canonicalPath: "docs/knowledge-bank/projects/sample.md",
      relations: [{ type: "uses_source", target: "source.sample" }],
      body: "A local locator begins with /Users/example/private."
    })
  );
  const codes = failureCodes(compile(repoRoot));
  assert.ok(codes.has("safety.private-path"));
  assert.ok(codes.has("safety.public-repo-visibility"));
});

test("rights-pending media cannot enter an active public projection", () => {
  const repoRoot = createValidFixture();
  write(
    repoRoot,
    "docs/knowledge-bank/media/pending.md",
    frontmatter({
      id: "asset.pending",
      title: "Pending asset",
      kind: "asset",
      visibility: "summary-only",
      canonicalPath: "docs/knowledge-bank/media/pending.md",
      canonicalRefs: ["SRC-ASSET"],
      relations: [{ type: "documents", target: "project.sample" }],
      extra: "rights_state: permission-needed\npermission_status: unknown\npublic_asset_url: null\n"
    })
  );
  write(
    repoRoot,
    "docs/knowledge-bank/projections/sample.md",
    frontmatter({
      id: "projection.sample",
      title: "Sample projection",
      kind: "projection",
      visibility: "public",
      canonicalPath: "docs/knowledge-bank/projections/sample.md",
      relations: [{ type: "has_asset", target: "asset.pending" }],
      extra: "surface: /sample\npublication_status: active\n"
    })
  );
  const codes = failureCodes(compile(repoRoot));
  assert.ok(codes.has("projection.pending-rights"));
});

test("not-recovered cannot mutate into never existed", () => {
  const repoRoot = createValidFixture();
  write(
    repoRoot,
    "docs/knowledge-bank/research/negative.md",
    frontmatter({
      id: "research.negative",
      title: "Negative search",
      kind: "research-inquiry",
      status: "not-recovered",
      canonicalPath: "docs/knowledge-bank/research/negative.md",
      body: "The page never existed."
    })
  );
  assert.ok(failureCodes(compile(repoRoot)).has("epistemic.negative-search"));
});

test("claim-source closure and correction authority are enforced", () => {
  const repoRoot = createValidFixture();
  write(
    repoRoot,
    "docs/knowledge-bank/claims/sample.md",
    frontmatter({
      id: "claim.sample",
      title: "Sample claim",
      kind: "claim",
      canonicalPath: "docs/knowledge-bank/claims/sample.md",
      canonicalRefs: ["CLM-SAMPLE"]
    })
  );
  write(
    repoRoot,
    "docs/knowledge-bank/corrections/sample.md",
    frontmatter({
      id: "correction.sample",
      title: "Sample correction",
      kind: "correction",
      canonicalPath: "docs/knowledge-bank/corrections/sample.md",
      canonicalRefs: ["COR-SAMPLE"],
      relations: [{ type: "documents", target: "project.sample" }]
    })
  );
  const codes = failureCodes(compile(repoRoot));
  assert.ok(codes.has("evidence.claim-source"));
  assert.ok(codes.has("authority.correction-claim"));
  assert.ok(codes.has("correction.supersession"));
});

test("intentional leaves and accidental orphans remain distinct", () => {
  const repoRoot = createValidFixture();
  write(
    repoRoot,
    "docs/knowledge-bank/glossary/leaf.md",
    frontmatter({
      id: "glossary.intentional-leaf",
      title: "Intentional leaf",
      kind: "glossary",
      canonicalPath: "docs/knowledge-bank/glossary/leaf.md",
      extra: "intentional_leaf: true\n"
    })
  );
  write(
    repoRoot,
    "docs/knowledge-bank/projects/orphan.md",
    frontmatter({
      id: "project.orphan",
      title: "Accidental orphan",
      kind: "project",
      canonicalPath: "docs/knowledge-bank/projects/orphan.md"
    })
  );
  const result = compile(repoRoot);
  assert.ok(result.health.orphans.includes("project.orphan"));
  assert.ok(!result.health.orphans.includes("glossary.intentional-leaf"));
  assert.ok(!result.health.deadEnds.includes("glossary.intentional-leaf"));
});

test("a source return compiles into the graph and lifecycle metrics", () => {
  const repoRoot = createValidFixture();
  write(
    repoRoot,
    "docs/knowledge-bank/projects/sample.md",
    frontmatter({
      id: "project.sample",
      title: "Sample project",
      kind: "project",
      canonicalPath: "docs/knowledge-bank/projects/sample.md",
      relations: [{ type: "uses_source", target: "source.sample" }],
      extra:
        'source_return:\n  encountered_on: "2026-07-18"\n  return_by: "2026-10-18"\n  mode: original-source-reread\n  access_state: available\n  source_classes:\n    - original project record\n  changed_or_confirmed: "The current reading confirmed the bounded role."\n  unresolved:\n    - "Collaborator review remains open."\n',
      body: "## Orientation\n\n[Sample source](../sources/sample.md)"
    })
  );
  const result = compile(repoRoot);
  const sample = result.graph.nodes.find((node) => node.id === "project.sample");
  assert.equal(result.health.hardFailures.length, 0);
  assert.equal(result.health.metrics.sourceReturnCount, 1);
  assert.equal(result.health.metrics.originalSourceReturnCount, 1);
  assert.equal(sample.sourceReturn.accessState, "available");
  assert.equal(sample.sourceReturn.changedOrConfirmed, "The current reading confirmed the bounded role.");
});

test("malformed source-return metadata is rejected", () => {
  const repoRoot = createValidFixture();
  write(
    repoRoot,
    "docs/knowledge-bank/projects/sample.md",
    frontmatter({
      id: "project.sample",
      title: "Sample project",
      kind: "project",
      canonicalPath: "docs/knowledge-bank/projects/sample.md",
      relations: [{ type: "uses_source", target: "source.sample" }],
      extra:
        'source_return:\n  encountered_on: "July 18"\n  return_by: "2026-01-01"\n  mode: remembered-summary\n  access_state: maybe\n  source_classes: []\n  changed_or_confirmed: ""\n  unresolved: []\n',
      body: "## Orientation\n\n[Sample source](../sources/sample.md)"
    })
  );
  const codes = failureCodes(compile(repoRoot));
  assert.ok(codes.has("source-return.date"));
  assert.ok(codes.has("source-return.mode"));
  assert.ok(codes.has("source-return.access-state"));
  assert.ok(codes.has("source-return.source-classes"));
  assert.ok(codes.has("source-return.finding"));
  assert.ok(codes.has("source-return.unresolved"));
});

test("blocked source access requires a public-safe librarian request", () => {
  const repoRoot = createValidFixture();
  write(
    repoRoot,
    "docs/knowledge-bank/projects/sample.md",
    frontmatter({
      id: "project.sample",
      title: "Sample project",
      kind: "project",
      canonicalPath: "docs/knowledge-bank/projects/sample.md",
      relations: [{ type: "uses_source", target: "source.sample" }],
      extra:
        'source_return:\n  encountered_on: "2026-07-18"\n  return_by: "2026-10-18"\n  mode: original-source-reread\n  access_state: blocked\n  source_classes:\n    - unavailable original record\n  changed_or_confirmed: "The source could not be reached in this encounter."\n  unresolved:\n    - "The original record still needs review."\n',
      body: "## Orientation\n\n[Sample source](../sources/sample.md)"
    })
  );
  assert.ok(
    failureCodes(compile(repoRoot)).has("source-return.blocked-without-request")
  );
});

test("overdue source returns enter the review queue", () => {
  const repoRoot = createValidFixture();
  write(
    repoRoot,
    "docs/knowledge-bank/projects/sample.md",
    frontmatter({
      id: "project.sample",
      title: "Sample project",
      kind: "project",
      canonicalPath: "docs/knowledge-bank/projects/sample.md",
      relations: [{ type: "uses_source", target: "source.sample" }],
      extra:
        'source_return:\n  encountered_on: "2026-01-01"\n  return_by: "2026-02-01"\n  mode: source-family-reread\n  access_state: partial\n  source_classes:\n    - surviving source family\n  changed_or_confirmed: "The partial record confirmed the chronology."\n  unresolved:\n    - "One original document remains unavailable."\n  librarian_request: "Please help locate the original public program."\n',
      body: "## Orientation\n\n[Sample source](../sources/sample.md)"
    })
  );
  const result = compileWiki({
    repoRoot,
    wikiRoot: path.join(repoRoot, "docs/knowledge-bank"),
    canonicalIds,
    now: new Date("2026-07-18T00:00:00Z")
  });
  assert.deepEqual(result.health.sourceReturnsDue, ["project.sample"]);
  assert.equal(result.health.metrics.sourceReturnsDueCount, 1);
  assert.ok(
    result.health.warnings.some((item) => item.code === "source-return.overdue")
  );
});

test("wanted pages require a reason and leave the queue when created", () => {
  const repoRoot = createValidFixture();
  write(
    repoRoot,
    "docs/knowledge-bank/README.md",
    frontmatter({
      id: "index.knowledge-wiki",
      title: "Knowledge Wiki",
      kind: "index",
      canonicalPath: "docs/knowledge-bank/README.md",
      relations: [{ type: "documents", target: "project.sample" }],
      extra:
        'wanted:\n  - id: project.sample\n    proposed_title: Sample project\n    reason: ""\n',
      body: "[Sample project](projects/sample.md#orientation)"
    })
  );
  const codes = failureCodes(compile(repoRoot));
  assert.ok(codes.has("wanted.required"));
  assert.ok(codes.has("wanted.resolved"));
});

test("the advisory wishlist is closed by governed source-return pages", () => {
  const result = compileWiki();
  const nodeById = new Map(result.graph.nodes.map((node) => [node.id, node]));
  const wantedIds = new Set(result.graph.wantedPages.map((item) => item.id));
  const advisoryWishlistIds = [
    "capability.implementation-adoption-and-handoff",
    "capability.campaign-identity-and-web-systems",
    "index.knowledge-wiki.research-agenda-and-held-claims",
    "method.new-fragment-intake",
    "method.practices-of-care-and-transition",
    "index.knowledge-wiki.scenes-of-work",
    "method.public-knowledge-in-peoples-own-terms",
    "index.knowledge-wiki.canonical-story-bank",
    "index.knowledge-wiki.visual-evidence-and-rights-queue"
  ];

  assert.equal(result.health.hardFailures.length, 0);
  for (const id of advisoryWishlistIds) {
    assert.ok(nodeById.get(id)?.sourceReturn, `${id} needs a source return`);
    assert.equal(nodeById.get(id)?.discoverable, true);
    assert.equal(wantedIds.has(id), false);
  }
  assert.equal(
    result.health.metrics.reachableDiscoverablePages,
    result.health.metrics.discoverablePages
  );
});

test("the source-to-story chain keeps evidence and publication gates separate", () => {
  const result = compileWiki();
  const edges = new Set(
    result.graph.edges.map((edge) => `${edge.from}|${edge.type}|${edge.to}`)
  );
  const nodeById = new Map(result.graph.nodes.map((node) => [node.id, node]));

  assert.ok(
    edges.has(
      "method.new-fragment-intake|supports|index.knowledge-wiki.research-agenda-and-held-claims"
    )
  );
  assert.ok(
    edges.has(
      "index.knowledge-wiki.canonical-story-bank|informed_by|index.knowledge-wiki.scenes-of-work"
    )
  );
  assert.ok(
    edges.has(
      "index.knowledge-wiki.visual-evidence-and-rights-queue|documents|asset.callnyc.digital-district-photo"
    )
  );
  assert.notEqual(
    nodeById.get("asset.callnyc.digital-district-photo")?.rightsState,
    "cleared"
  );
  assert.notEqual(
    nodeById.get("asset.callnyc.digital-district-photo")?.permissionStatus,
    "approved"
  );
});
