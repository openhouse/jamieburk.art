import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";

import {
  evaluatePhotoKnowledge,
  photoKnowledgeRepoRoot
} from "./lib.mjs";

const repoRoot = photoKnowledgeRepoRoot();

function baseline() {
  return evaluatePhotoKnowledge({ repoRoot, skipGenerated: true });
}

function mutatedRecords(mutate) {
  const initial = baseline();
  const records = structuredClone(initial.records);
  mutate(records);
  return evaluatePhotoKnowledge({
    repoRoot,
    records,
    skipGenerated: true
  });
}

test("the RFC 0003 canary passes while human gates remain open", () => {
  const result = baseline();
  assert.equal(result.pass, true);
  assert.equal(result.passed, result.total);
  assert.equal(result.migration.governedAssets, 1);
  assert.equal(result.migration.remaining, 12);
  assert.ok(result.humanGates.every((gate) => gate.state === "open"));
});

test("a derivative checksum mismatch fails closed", () => {
  const result = mutatedRecords((records) => {
    const asset = records.find(
      (record) => record.id === "asset.photo.jamie-council-chamber.layout-a"
    );
    asset.public_derivatives[0].checksum = "0".repeat(64);
  });
  const criterion = result.criteria.find(
    (item) => item.id === "PHOTO-KNOWLEDGE-004"
  );
  assert.equal(criterion.pass, false);
});

test("a curatorial panel cannot omit its simulation disclosure", () => {
  const result = mutatedRecords((records) => {
    const evaluation = records.find(
      (record) =>
        record.id === "evaluation.curatorial.layout-a.home-council-chamber.v1"
    );
    evaluation.panel.simulation_notice = false;
  });
  const criterion = result.criteria.find(
    (item) => item.id === "PHOTO-KNOWLEDGE-006"
  );
  assert.equal(criterion.pass, false);
});

test("production approval cannot jump ahead of rights review", () => {
  const result = mutatedRecords((records) => {
    const occurrence = records.find(
      (record) =>
        record.id === "projection.photo.layout-a.home.hero.council-chamber"
    );
    occurrence.approval.production = "approved";
  });
  const criterion = result.criteria.find(
    (item) => item.id === "PHOTO-KNOWLEDGE-008"
  );
  assert.equal(criterion.pass, false);
});

test("the application manifest must retain its Wiki binding", () => {
  const photographyPath = "apps/www/src/data/photography.ts";
  const source = baseline().canary;
  assert.equal(source.wikiId, "asset.photo.jamie-council-chamber.layout-a");

  const original = readFileSync(path.join(repoRoot, photographyPath), "utf8");
  const mutated = original.replace(
    '    wikiId: "asset.photo.jamie-council-chamber.layout-a",\n',
    ""
  );
  const result = evaluatePhotoKnowledge({
    repoRoot,
    overrides: { [photographyPath]: mutated },
    skipGenerated: true
  });
  const criterion = result.criteria.find(
    (item) => item.id === "PHOTO-KNOWLEDGE-002"
  );
  assert.equal(criterion.pass, false);
});

test("a public source binding cannot contain a private locator", () => {
  const result = mutatedRecords((records) => {
    const asset = records.find(
      (record) => record.id === "asset.photo.jamie-council-chamber.layout-a"
    );
    asset.private_source_binding.public_id = "/Users/example/Pictures/private";
  });
  const criterion = result.criteria.find(
    (item) => item.id === "PHOTO-KNOWLEDGE-003"
  );
  assert.equal(criterion.pass, false);
});

test("caption assertions must resolve to statements on the asset", () => {
  const result = mutatedRecords((records) => {
    const occurrence = records.find(
      (record) =>
        record.id === "projection.photo.layout-a.home.hero.council-chamber"
    );
    occurrence.caption.assertions.push("statement.photo.nonexistent.v1");
  });
  const criterion = result.criteria.find(
    (item) => item.id === "PHOTO-KNOWLEDGE-007"
  );
  assert.equal(criterion.pass, false);
});
