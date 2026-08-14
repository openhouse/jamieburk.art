import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

test("the Docker production build stays within the staging host's memory budget", () => {
  const source = readFileSync(path.join(repoRoot, "apps/www/next.config.ts"), "utf8");
  const dockerfile = readFileSync(path.join(repoRoot, "Dockerfile"), "utf8");

  assert.match(source, /experimental:\s*\{[\s\S]*cpus:\s*1/);
  assert.match(source, /experimental:\s*\{[\s\S]*webpackMemoryOptimizations:\s*true/);
  assert.match(
    source,
    /typescript:\s*\{[\s\S]*ignoreBuildErrors:\s*process\.env\.NEXT_BUILD_SKIP_VERIFIED_TYPECHECK === "1"/
  );
  assert.match(
    dockerfile,
    /FROM base AS deps\s+ENV NODE_OPTIONS=--max-old-space-size=256[\s\S]*RUN npm ci/
  );
  assert.match(
    dockerfile,
    /FROM base AS builder[\s\S]*ENV NODE_OPTIONS=--max-old-space-size=384/
  );
  assert.match(
    dockerfile,
    /RUN npm run typecheck -w @jamie-burkart\/www\s+RUN NODE_OPTIONS=--max-old-space-size=208 NEXT_BUILD_SKIP_VERIFIED_TYPECHECK=1 npm run build -w @jamie-burkart\/www/
  );
});
