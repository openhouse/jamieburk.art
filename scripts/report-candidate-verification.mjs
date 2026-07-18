#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import path from "node:path";
import { parseArgs } from "node:util";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const { values } = parseArgs({ options: { output: { type: "string" } } });
if (!values.output) throw new Error("--output is required; exact-candidate reports must remain outside the committed tree.");

const git = (...args) => execFileSync("git", args, { cwd: repoRoot, encoding: "utf8" }).trim();
const npmVersion = execFileSync("npm", ["--version"], { cwd: repoRoot, encoding: "utf8" }).trim();
const report = {
  schemaVersion: 1,
  recordedAt: new Date().toISOString(),
  revision: git("rev-parse", "HEAD"),
  tree: git("show", "-s", "--format=%T", "HEAD"),
  cleanTrackedWorktree: git("status", "--porcelain", "--untracked-files=no") === "",
  runtime: { node: process.version, npm: npmVersion },
  runContext: {
    githubSha: process.env.GITHUB_SHA ?? null,
    githubRunId: process.env.GITHUB_RUN_ID ?? null,
    githubRunAttempt: process.env.GITHUB_RUN_ATTEMPT ?? null,
    githubWorkflow: process.env.GITHUB_WORKFLOW ?? null
  },
  completedBeforeRecord: [
    "npm ci",
    "npm run check",
    "npm run preflight:staging",
    "npm run preflight:production",
    "npm run check:docker-runtime"
  ],
  boundary: "This machine-readable record is emitted only after the ordered workflow steps pass. It is CI evidence, not production authorization."
};
if (!report.cleanTrackedWorktree) throw new Error("Tracked worktree changes prevent an exact-candidate report.");
if (report.runContext.githubSha && report.runContext.githubSha !== report.revision) {
  throw new Error(`GITHUB_SHA ${report.runContext.githubSha} does not match HEAD ${report.revision}.`);
}
writeFileSync(path.resolve(repoRoot, values.output), `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report, null, 2));
