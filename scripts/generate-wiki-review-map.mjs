#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const baseRef = process.env.WIKI_REVIEW_BASE ?? "origin/develop";
const mapPath = "docs/review/wiki-A-review-units.json";
const maxPaths = 50;
const maxAddedLines = 10000;

function git(args) {
  return execFileSync("git", args, {
    cwd: repoRoot,
    encoding: "utf8",
    maxBuffer: 30 * 1024 * 1024
  }).trim();
}

const changedPaths = git(["diff", "--name-only", `${baseRef}...HEAD`])
  .split("\n")
  .filter(Boolean);
if (!changedPaths.includes(mapPath)) changedPaths.push(mapPath);

const numstat = new Map(
  git(["diff", "--numstat", `${baseRef}...HEAD`])
    .split("\n")
    .filter(Boolean)
    .map((line) => {
      const [added, deleted, ...pathParts] = line.split("\t");
      return [
        pathParts.join("\t"),
        {
          addedLines: /^\d+$/.test(added) ? Number(added) : 0,
          deletedLines: /^\d+$/.test(deleted) ? Number(deleted) : 0
        }
      ];
    })
);
numstat.set(mapPath, { addedLines: 0, deletedLines: 0 });

function categoryFor(relativePath) {
  if (relativePath.startsWith("apps/www/src/data/knowledge-bank/")) {
    return ["evidence-records", "Canonical evidence and claim records"];
  }
  if (relativePath.startsWith("apps/www/")) {
    return ["portfolio-projection", "Purpose-built portfolio projection"];
  }
  if (relativePath.startsWith("docs/knowledge-bank/")) {
    return ["governed-wiki", "Governed Knowledge Wiki pages and archival reports"];
  }
  if (
    relativePath.startsWith("docs/qa/") ||
    relativePath.startsWith("docs/review/") ||
    relativePath.startsWith("scripts/")
  ) {
    return ["quality-controls", "Deterministic checks, mutation tests, and review controls"];
  }
  if (relativePath.startsWith("rfps/")) {
    return ["future-architecture", "Public-safe future architecture proposals"];
  }
  if (relativePath.startsWith("apps/www/public/")) {
    return ["public-assets", "Public assets and rights-bounded artifacts"];
  }
  return ["repository-operations", "Repository, release, and operating documentation"];
}

const grouped = new Map();
for (const relativePath of changedPaths.sort()) {
  const [category, purpose] = categoryFor(relativePath);
  if (!grouped.has(category)) grouped.set(category, { purpose, paths: [] });
  grouped.get(category).paths.push(relativePath);
}

const reviewUnits = [];
for (const [category, group] of grouped) {
  let sequence = 1;
  let paths = [];
  let addedLines = 0;
  let deletedLines = 0;

  const flush = () => {
    if (paths.length === 0) return;
    reviewUnits.push({
      id: `${category}-${String(sequence).padStart(2, "0")}`,
      purpose: group.purpose,
      reviewerPrompt:
        category === "governed-wiki"
          ? "Are the claims, limits, collective credit, and source-return boundaries clear?"
          : category === "portfolio-projection"
            ? "Does this reduce reader burden and make Jamie's action and usable result legible?"
            : category === "quality-controls"
              ? "Do the checks fail under unsafe mutations without closing human gates?"
              : "Is this change necessary, public-safe, and proportionate to the closure PR?",
      paths,
      addedLines,
      deletedLines,
      humanReview: "pending"
    });
    sequence += 1;
    paths = [];
    addedLines = 0;
    deletedLines = 0;
  };

  for (const relativePath of group.paths) {
    const stats = numstat.get(relativePath) ?? {
      addedLines: 0,
      deletedLines: 0
    };
    if (
      paths.length > 0 &&
      (paths.length + 1 > maxPaths ||
        addedLines + stats.addedLines > maxAddedLines)
    ) {
      flush();
    }
    if (stats.addedLines > maxAddedLines) {
      throw new Error(
        `${relativePath} adds ${stats.addedLines} lines, above the per-unit limit`
      );
    }
    paths.push(relativePath);
    addedLines += stats.addedLines;
    deletedLines += stats.deletedLines;
  }
  flush();
}

const output = {
  generatedAt: new Date().toISOString(),
  baseRef,
  baseSha: git(["rev-parse", baseRef]),
  generatedFromHead: git(["rev-parse", "HEAD"]),
  pullRequest: "https://github.com/openhouse/jamieburk.art/pull/244",
  contract: {
    exactPathCoverage: true,
    maximumPathsPerUnit: maxPaths,
    maximumAddedLinesPerUnit: maxAddedLines,
    mapIncludesItself: true,
    machinePassIsNotHumanApproval: true
  },
  humanGates: {
    contentApproval: "pending",
    rightsClearance: "pending",
    productionApproval: "not-granted",
    mergeDecision: "pending"
  },
  reviewUnits
};

const absoluteMapPath = path.join(repoRoot, mapPath);
mkdirSync(path.dirname(absoluteMapPath), { recursive: true });
writeFileSync(absoluteMapPath, `${JSON.stringify(output, null, 2)}\n`);
console.log(
  `Wrote ${mapPath}: ${changedPaths.length} paths in ${reviewUnits.length} units`
);
