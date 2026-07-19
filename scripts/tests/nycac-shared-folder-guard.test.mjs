import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  evaluateNyCACSharedFolderCensus,
  findNyCACSharedFolderLeak,
  runNyCACSharedFolderGuard,
} from "../lib/nycac-shared-folder-guard.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const census = JSON.parse(readFileSync(path.join(repoRoot, "apps/www/src/data/knowledge-bank/fixtures/nycac-shared-folder-public-census.json"), "utf8"));

test("current NYC Artist Coalition shared-folder artifacts pass", () => {
  assert.deepEqual(runNyCACSharedFolderGuard(repoRoot), []);
});

test("rejects a broken population denominator", () => {
  const mutation = structuredClone(census);
  mutation.coverage.dispositioned_total = 2077;
  assert.match(evaluateNyCACSharedFolderCensus(mutation).join("\n"), /dispositioned_total/);
});

test("rejects a broken primary-disposition sum", () => {
  const mutation = structuredClone(census);
  mutation.dispositionCounts["protected-metadata-only"] -= 1;
  assert.match(evaluateNyCACSharedFolderCensus(mutation).join("\n"), /disposition counts/);
});

test("rejects private archive locators and Drive access details", () => {
  for (const value of [
    "https://drive.google.com/drive/folders/private",
    "resourcekey=private",
    "/Volumes/private/archive",
    "person@example.com",
    '{"privateId":"private"}',
  ]) {
    assert.ok(findNyCACSharedFolderLeak(value), value);
  }
});

test("allows public-safe aggregate and digest language", () => {
  assert.equal(findNyCACSharedFolderLeak("2,078 accessible items; manifest SHA-256 250de23a17cf990de9f87d5374bb3325265ed7321a5cfe9eb4b38aec71bf62ba"), null);
});
