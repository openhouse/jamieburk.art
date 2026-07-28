import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { expectedRecords, validateTestimonyCorpus } from "./public-testimony-corpus.mjs";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "../..");

test("declares the five recovered personal Council testimony records", () => {
  assert.equal(expectedRecords.length, 5);
});

test("keeps every testimony source complete, official, bounded, and held", () => {
  assert.deepEqual(validateTestimonyCorpus(), []);
});

test("Commercial Rent Stabilization queue includes supportive public officials", () => {
  const queue = fs.readFileSync(
    path.join(
      repoRoot,
      "docs/knowledge-bank/research-runs/commercial-rent-stabilization-testimony-corpus-queue-2026-07-28.md",
    ),
    "utf8",
  );
  assert.match(queue, /every other supportive\s+public\s+official/);
  assert.match(queue, /City Council member, State legislator, committee chair/);
  assert.match(queue, /full\s+speaking turn/);
  assert.match(queue, /does not by itself establish that a\s+statement was supportive/);
});

test("Commercial Rent Stabilization queue includes Albany and public-event source lanes", () => {
  const queue = fs.readFileSync(
    path.join(
      repoRoot,
      "docs/knowledge-bank/research-runs/commercial-rent-stabilization-testimony-corpus-queue-2026-07-28.md",
    ),
    "utf8",
  );
  assert.match(queue, /## Albany legislative source return/);
  assert.match(queue, /Assembly Member Emily Gallagher and Senator Julia Salazar are priority source/);
  assert.match(queue, /## Press conferences and public events/);
  assert.match(queue, /Comptroller Brad\s+Lander/);
  assert.match(queue, /Council\s+Member Shahana Hanif/);
  assert.match(queue, /complete attributed turn separately/);
  assert.match(queue, /Eon Huntley is an additional priority discovery lead/);
  assert.match(queue, /Do not infer a current\s+title, electoral status/);
  assert.match(queue, /names are not evidence|name.*not evidence/i);
  assert.match(queue, /authenticated Otter account and private CRS/);
  assert.match(queue, /account details, private URLs, local filesystem/);
});
