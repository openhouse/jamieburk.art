import assert from "node:assert/strict";
import test from "node:test";
import { evaluate, loadCandidate } from "./professional-record-eval.mjs";

function candidate() {
  return structuredClone(loadCandidate());
}

test("the pinned professional-record candidate passes", () => {
  const result = evaluate(candidate());
  assert.equal(result.passed, true, result.failures.join("\n"));
});

const mutations = [
  ["changed source commit", (value) => { value.lock.source_commit = "main"; }],
  ["changed manifest digest", (value) => { value.lock.source_manifest_sha256 = "0".repeat(64); }],
  ["reused candidate fingerprint", (value) => { value.lock.source_candidate_fingerprint = "0".repeat(64); }],
  ["deleted record", (value) => { value.manifest.records.pop(); }],
  ["duplicated record ID", (value) => { value.manifest.records[1].id = value.manifest.records[0].id; }],
  ["unpinned statement reference", (value) => { value.manifest.records.find((record) => record.kind === "canonical-reference").canonical_commit = "main"; }],
  ["promoted coverage gap", (value) => { value.manifest.records.find((record) => record.kind === "public-coverage-gap").publication_state = "public-source-already-published"; }],
  ["authorized public release", (value) => { value.manifest.public_release_authorized = true; }],
  ["added private runtime dependency", (value) => { value.manifest.private_source_dependency = true; }],
  ["authorized portfolio projection", (value) => { value.lock.projection_state = "portfolio-active"; }],
  ["leaked local path", (value) => { value.manifestSource += "\n/Users/example/private\n"; }],
  ["weakened photo boundary", (value) => { value.manifest.photo_policy = "approved"; }],
  ["invalid source-to-index relation", (value) => {
    value.sourcePageSource = value.sourcePageSource.replace(
      "- type: related_to\n    target: index.knowledge-wiki.jamie-public-record-source-edition",
      "- type: supports\n    target: index.knowledge-wiki.jamie-public-record-source-edition"
    );
  }]
];

for (const [name, mutate] of mutations) {
  test(`professional-record evaluator rejects ${name}`, () => {
    const value = candidate();
    mutate(value);
    assert.equal(evaluate(value).passed, false);
  });
}
