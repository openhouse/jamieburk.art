import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const methodPath = path.join(
  repoRoot,
  "docs/knowledge-bank/notebooks/photography/event-transcript-photo-constellations.md"
);
const evalPath = path.join(
  repoRoot,
  "evals/pre-launch/transcript-photo-constellations.json"
);
const method = readFileSync(methodPath, "utf8");
const contract = JSON.parse(readFileSync(evalPath, "utf8"));

test("the eval contract preserves all transcript-photo hard gates", () => {
  assert.deepEqual(
    contract.criteria.map((criterion) => criterion.id),
    ["TPC-001", "TPC-002", "TPC-003", "TPC-004", "TPC-005", "TPC-006", "TPC-007"]
  );
  assert.ok(contract.criteria.every((criterion) => criterion.type === "hard-gate"));
  assert.equal(contract.command, "npm run test:transcript-photo-constellations");
});

test("the method connects event, transcript, People, and prior-select signals", () => {
  assert.match(method, /source transcript, event date and time range/i);
  assert.match(method, /existing People associations/i);
  assert.match(method, /photo-filter/i);
  assert.match(method, /photo-select/i);
  assert.match(method, /_keep/i);
  assert.match(method, /transcript can lead back to a photograph/i);
  assert.match(method, /photograph can lead back\s+to the transcript/i);
});

test("prior selection and identity signals cannot become public claims", () => {
  assert.match(method, /prior-curatorial signal, never as proof/i);
  assert.match(method, /do not\s+identify unnamed faces or infer sensitive traits/i);
  assert.match(method, /No automated match becomes an identity or narrative claim/i);
  assert.match(method, /does not grant publication permission/i);
});

test("the event constellation stays private, complete, and non-destructive", () => {
  assert.match(method, /complete candidate\s+family, near-duplicates and sequences/i);
  assert.match(method, /counterexamples,\s+uncertain matches, and explicit holds/i);
  assert.match(method, /Preserve unclassified photographs/i);
  assert.match(method, /Do not alter originals, metadata, People associations, favorites/i);
  assert.match(method, /image-level join private/i);
});

test("the public method exposes no private locator or source identity", () => {
  assert.doesNotMatch(
    method,
    /\/Users\/|\/Volumes\/|Photos\.sqlite|ZUUID|PHAsset|jamie\.burkart@gmail|resourcekey=/i
  );
});
