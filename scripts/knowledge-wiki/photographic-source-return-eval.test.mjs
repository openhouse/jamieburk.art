import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";

import {
  evaluatePhotographicSourceReturn
} from "./photographic-source-return-eval.mjs";
import { compileWiki, defaultRepoRoot } from "./lib.mjs";

const result = compileWiki();

function source(id) {
  const record = result.byId.get(id);
  return readFileSync(path.join(defaultRepoRoot, record.path), "utf8");
}

function cloneRecord(id) {
  return structuredClone(result.byId.get(id));
}

test("photographic source return passes the exact candidate", () => {
  const evaluation = evaluatePhotographicSourceReturn({ result });
  assert.equal(evaluation.passed, true);
});

test("cluster membership cannot multiply evidentiary weight", () => {
  const id = "index.photo-set.kc-town-hall-fieldwork";
  const mutated = source(id).replace(
    "they do not multiply evidentiary weight",
    "they multiply evidentiary weight"
  );
  const evaluation = evaluatePhotographicSourceReturn({
    result,
    sourceOverrides: { [id]: mutated }
  });
  assert.equal(evaluation.checks.photo_clusters_do_not_inflate_evidence, false);
});

test("agency hosting cannot be reassigned to coalition mobilization", () => {
  const id = "event.nyc.dcla.diy-spaces-listening.2017-01-27";
  const mutated = source(id).replaceAll("hosted", "attended");
  const evaluation = evaluatePhotographicSourceReturn({
    result,
    sourceOverrides: { [id]: mutated }
  });
  assert.equal(
    evaluation.checks.dcla_host_mobilization_and_participation_bounded,
    false
  );
});

test("a held photograph cannot become public without rights", () => {
  const id = "asset.photo.nycac-dcla-listening-room.2017.001";
  const mutated = cloneRecord(id);
  mutated.public_display_status = "cleared";
  mutated.projection = { status: "active", surfaces: ["/"] };
  const evaluation = evaluatePhotographicSourceReturn({
    result,
    recordOverrides: { [id]: mutated }
  });
  assert.equal(evaluation.checks.photo_rights_and_consent_fail_closed, false);
});

test("a private local path fails the public-safe source-return gate", () => {
  const id = "source.kc-town-hall.local-digital-archive.2026-07";
  const mutated = `${source(id)}\nPrivate path: /Users/example/archive\n`;
  const evaluation = evaluatePhotographicSourceReturn({
    result,
    sourceOverrides: { [id]: mutated }
  });
  assert.equal(evaluation.checks.protected_photo_payload_not_published, false);
});

test("Knowledge Bank cannot return as a reader-facing heading", () => {
  const readmePath = "README.md";
  const readme = readFileSync(path.join(defaultRepoRoot, readmePath), "utf8");
  const evaluation = evaluatePhotographicSourceReturn({
    result,
    sourceOverrides: {
      [readmePath]: readme.replace("## Knowledge Wiki", "## Knowledge Bank")
    }
  });
  assert.equal(evaluation.checks.knowledge_wiki_naming_is_canonical, false);
});

test("canonical wiki command permits additional checks without dropping the core validator", () => {
  const manifest = JSON.parse(readFileSync(path.join(defaultRepoRoot, "package.json"), "utf8"));
  manifest.scripts["knowledge-wiki"] =
    "node scripts/check-knowledge-bank.mjs && node scripts/knowledge-wiki/operating-control-plane-eval.mjs";
  const check = () => evaluatePhotographicSourceReturn({
    result,
    sourceOverrides: { "package.json": JSON.stringify(manifest) }
  }).checks.knowledge_wiki_naming_is_canonical;
  assert.equal(check(), true);
  manifest.scripts["knowledge-wiki"] = "node scripts/knowledge-wiki/operating-control-plane-eval.mjs";
  assert.equal(check(), false);
  manifest.scripts["knowledge-wiki"] = "echo node scripts/check-knowledge-bank.mjs";
  assert.equal(check(), false);
});

test("a live Photos failure cannot be promoted to a completed scan", () => {
  const id = "research.photographic-source-return.2026-07-26";
  const mutated = source(id)
    .replaceAll("did not materialize", "materialized")
    .replace("No full-library scan", "A full-library scan");
  const evaluation = evaluatePhotographicSourceReturn({
    result,
    sourceOverrides: { [id]: mutated }
  });
  assert.equal(evaluation.checks.apple_photos_capability_gap_explicit, false);
});
