import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

test("the Docker production build enables Next's lower-memory webpack mode", () => {
  const source = readFileSync(path.join(repoRoot, "apps/www/next.config.ts"), "utf8");
  assert.match(source, /experimental:\s*\{[\s\S]*webpackMemoryOptimizations:\s*true/);
});
