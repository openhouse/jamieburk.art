#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  evaluateWikiFamilyClosure
} from "./lib/wiki-family-closure.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const readJson = (relativePath) =>
  JSON.parse(readFileSync(path.join(repoRoot, relativePath), "utf8"));
const closure = readJson("docs/integration/wiki-family-closure.json");
const reviewMap = existsSync(path.join(repoRoot, closure.reviewMapPath))
  ? readJson(closure.reviewMapPath)
  : { reviewUnits: [] };

function walk(directory) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(absolute) : [absolute];
  });
}

function governedPages() {
  const root = path.join(repoRoot, closure.canonicalRoot);
  const pages = walk(root).filter((file) => file.endsWith(".md"));
  const ids = new Set();
  const relationTargets = new Set();
  for (const page of pages) {
    const text = readFileSync(page, "utf8");
    const id = text.match(/^id:\s*(.+)$/m)?.[1]?.trim();
    if (id) ids.add(id);
    for (const match of text.matchAll(/^\s+target:\s*(.+)$/gm)) {
      relationTargets.add(match[1].trim());
    }
  }
  return { ids, relationTargets };
}

function diffPaths() {
  try {
    return execFileSync(
      "git",
      ["diff", "--name-only", `${reviewMap.baseRef ?? "origin/develop"}...HEAD`],
      { cwd: repoRoot, encoding: "utf8" }
    )
      .trim()
      .split("\n")
      .filter(Boolean);
  } catch {
    return [];
  }
}

function addedLinesFor(paths) {
  if (paths.length === 0) return 0;
  const output = execFileSync(
    "git",
    [
      "diff",
      "--numstat",
      `${reviewMap.baseRef ?? "origin/develop"}...HEAD`,
      "--",
      ...paths
    ],
    { cwd: repoRoot, encoding: "utf8", maxBuffer: 20 * 1024 * 1024 }
  );
  return output
    .trim()
    .split("\n")
    .filter(Boolean)
    .reduce((sum, line) => {
      const added = line.split("\t", 1)[0];
      return sum + (/^\d+$/.test(added) ? Number(added) : 0);
    }, 0);
}

const { ids, relationTargets } = governedPages();
const packageJson = readJson("package.json");
const workflowText = existsSync(path.join(repoRoot, closure.ciWorkflowPath))
  ? readFileSync(path.join(repoRoot, closure.ciWorkflowPath), "utf8")
  : "";
const reconciliationPath = path.join(
  repoRoot,
  "docs/knowledge-bank/research-runs/nycac-shared-folder-census-reconciliation-2026-07-19.md"
);
const reviewUnits = (reviewMap.reviewUnits ?? []).map((unit) => ({
  ...unit,
  addedLines: addedLinesFor(unit.paths ?? [])
}));

const candidate = {
  ...closure,
  forbiddenRootPresent: closure.forbiddenParallelRoots.some((relativePath) =>
    existsSync(path.join(repoRoot, relativePath))
  ),
  publicWikiRoutePresent: [
    "apps/www/src/app/proofs",
    "apps/www/src/app/knowledge-bank",
    "apps/www/src/app/knowledge-wiki",
    "apps/www/src/app/public-claims"
  ].some((relativePath) => existsSync(path.join(repoRoot, relativePath))),
  censusReconciliationPresent: existsSync(reconciliationPath),
  governedPageIds: ids,
  rootRelationTargets: relationTargets,
  reviewMapPresent: existsSync(path.join(repoRoot, closure.reviewMapPath)),
  diffPaths: diffPaths(),
  reviewUnits,
  ciWorkflowPresent: Boolean(workflowText),
  ciRunsRepositoryCheck: /npm run check/.test(workflowText),
  repositoryCheckRunsClosure:
    packageJson.scripts.check.includes("check:wiki-family-closure"),
  repositoryCheckRunsMutationTests:
    packageJson.scripts.check.includes("test:wiki-family-closure"),
  requiredRemoteFeatureRefs: [],
  parallelFixtureRoots: ["fixtures/knowledge-wiki-family"].filter(
    (relativePath) => existsSync(path.join(repoRoot, relativePath))
  )
};

const results = evaluateWikiFamilyClosure(candidate);
console.log(
  `Wiki family closure: ${results.filter((result) => result.pass).length}/${results.length}`
);
for (const result of results) {
  console.log(`${result.pass ? "PASS" : "FAIL"} ${result.id}`);
}

if (results.some((result) => !result.pass)) {
  process.exit(1);
}
