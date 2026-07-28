import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";

import { compileWiki, defaultRepoRoot } from "./lib.mjs";
import { evaluateSourceReturn } from "./source-return-eval.mjs";

const result = compileWiki();

function sourceFor(id) {
  const item = result.byId.get(id);
  return readFileSync(path.join(defaultRepoRoot, item.path), "utf8");
}

function cloneRecord(id) {
  return structuredClone(result.byId.get(id));
}

test("source-return baseline passes", () => {
  const evaluation = evaluateSourceReturn({ result });
  assert.deepEqual(evaluation.failures, []);
  assert.equal(evaluation.checks.length, 10);
});

test("later recollection cannot become contemporaneous evidence", () => {
  const id = "source.recollection.nycac-dcla-meeting.2026-07";
  const recollection = cloneRecord(id);
  recollection.source_class = "mixed-contemporaneous-record";
  const evaluation = evaluateSourceReturn({
    result,
    recordOverrides: { [id]: recollection }
  });
  assert.equal(
    evaluation.checks.find((item) => item.id === "SOURCE-RETURN-003").pass,
    false
  );
});

test("the DCLA occurrence cannot self-clear production", () => {
  const id = "projection.photo.layout-a.technical-operations.dcla-meeting";
  const occurrence = cloneRecord(id);
  occurrence.approval.production = "approved";
  const evaluation = evaluateSourceReturn({
    result,
    recordOverrides: { [id]: occurrence }
  });
  assert.equal(
    evaluation.checks.find((item) => item.id === "SOURCE-RETURN-010").pass,
    false
  );
});

test("the Council event cannot be established by recollection alone", () => {
  const id = "source.nycc.open-data-week-event-records.2026-03";
  const eventSource = cloneRecord(id);
  eventSource.source_class = "first-person-recollection";
  const evaluation = evaluateSourceReturn({
    result,
    recordOverrides: { [id]: eventSource }
  });
  assert.equal(
    evaluation.checks.find((item) => item.id === "SOURCE-RETURN-005").pass,
    false
  );
});

test("event registration cannot become proof of attendance or delivery", () => {
  const manifestPath = "apps/www/src/data/photography.ts";
  const mutated = readFileSync(
    path.join(defaultRepoRoot, manifestPath),
    "utf8"
  ).replace(
    "coalition participation materials and public-data research.",
    "an accepted proposal that the Council implemented."
  );
  const evaluation = evaluateSourceReturn({
    result,
    sourceOverrides: { [manifestPath]: mutated }
  });
  assert.equal(
    evaluation.checks.find((item) => item.id === "SOURCE-RETURN-005").pass,
    false
  );
});

test("the returned JPEG cannot replace the stripped public derivative", () => {
  const id = "asset.photo.jamie-council-chamber.layout-a";
  const asset = cloneRecord(id);
  asset.public_derivatives[0].checksum =
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
  const evaluation = evaluateSourceReturn({
    result,
    recordOverrides: { [id]: asset }
  });
  assert.equal(
    evaluation.checks.find((item) => item.id === "SOURCE-RETURN-005").pass,
    false
  );
});

test("a private returned-file fingerprint cannot enter the public recollection", () => {
  const sourcePath =
    "docs/knowledge-bank/sources/recollections/jamie-council-chamber-photo-2026-07.md";
  const mutated = readFileSync(
    path.join(defaultRepoRoot, sourcePath),
    "utf8"
  ).replace(
    "opaque record retained outside public Git",
    "SHA-256 aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  );
  const evaluation = evaluateSourceReturn({
    result,
    sourceOverrides: { [sourcePath]: mutated }
  });
  assert.equal(
    evaluation.checks.find((item) => item.id === "SOURCE-RETURN-005").pass,
    false
  );
});

test("the DCLA runtime occurrence cannot outrun the governed role language", () => {
  const sourcePath = "apps/www/src/data/photography.ts";
  const mutated = readFileSync(
    path.join(defaultRepoRoot, sourcePath),
    "utf8"
  ).replace(
    "A participant addresses a crowded meeting",
    "A facilitator leads a crowded meeting"
  );
  const evaluation = evaluateSourceReturn({
    result,
    sourceOverrides: { [sourcePath]: mutated }
  });
  assert.equal(
    evaluation.checks.find((item) => item.id === "SOURCE-RETURN-005").pass,
    false
  );
});

test("a remembered photographer cannot be promoted into the KC public page", () => {
  const pagePath = "apps/www/src/content/work/kc-town-hall.mdx";
  const mutated = `${readFileSync(
    path.join(defaultRepoRoot, pagePath),
    "utf8"
  )}\nThe hard-hat photographer was Julia.\n`;
  const evaluation = evaluateSourceReturn({
    result,
    sourceOverrides: { [pagePath]: mutated }
  });
  assert.equal(
    evaluation.checks.find((item) => item.id === "SOURCE-RETURN-006").pass,
    false
  );
});

test("a private source path fails the public boundary", () => {
  const id = "source.recollection.kc-town-hall-photos.2026-07";
  const evaluation = evaluateSourceReturn({
    result,
    sourceOverrides: {
      [result.byId.get(id).path]: `${sourceFor(id)}\n/Volumes/private/archive\n`
    }
  });
  assert.equal(
    evaluation.checks.find((item) => item.id === "SOURCE-RETURN-008").pass,
    false
  );
});

test("the missing DCLA audio cannot be reported as proof of absence", () => {
  const id = "research-inquiry.photography.dcla-diy-spaces-meeting.2017";
  const mutated = sourceFor(id).replace(
    /not proof that the recording\s+does not exist/,
    "proof that no recording exists"
  );
  const evaluation = evaluateSourceReturn({
    result,
    sourceOverrides: { [result.byId.get(id).path]: mutated }
  });
  assert.equal(
    evaluation.checks.find((item) => item.id === "SOURCE-RETURN-010").pass,
    false
  );
});

test("proposal artifact integrity fails on a changed checksum", () => {
  const id = "asset.kc-town-hall.proposal-excerpts.2019";
  const asset = cloneRecord(id);
  asset.public_derivatives[0].checksum = "0".repeat(64);
  const evaluation = evaluateSourceReturn({
    result,
    recordOverrides: { [id]: asset }
  });
  assert.equal(
    evaluation.checks.find((item) => item.id === "SOURCE-RETURN-007").pass,
    false
  );
});

test("Knowledge Bank cannot return as the primary operator heading", () => {
  const readmePath = "README.md";
  const mutated = readFileSync(path.join(defaultRepoRoot, readmePath), "utf8")
    .replace("## Knowledge Wiki", "## Knowledge Bank");
  const evaluation = evaluateSourceReturn({
    result,
    sourceOverrides: { [readmePath]: mutated }
  });
  assert.equal(
    evaluation.checks.find((item) => item.id === "SOURCE-RETURN-001").pass,
    false
  );
});
