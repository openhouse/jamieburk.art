import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

test("the Docker production build bounds worker concurrency and enables lower-memory webpack mode", () => {
  const source = readFileSync(path.join(repoRoot, "apps/www/next.config.ts"), "utf8");
  const dockerfile = readFileSync(path.join(repoRoot, "Dockerfile"), "utf8");
  assert.match(source, /experimental:\s*\{[\s\S]*cpus:\s*1/);
  assert.match(source, /experimental:\s*\{[\s\S]*webpackMemoryOptimizations:\s*true/);
  assert.match(dockerfile, /FROM base AS builder[\s\S]*ENV NODE_OPTIONS=--max-old-space-size=512[\s\S]*RUN npm run build/);
});
