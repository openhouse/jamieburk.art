#!/usr/bin/env node

import { execFileSync, spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { planAffectedChecks } from "./affected-lib.mjs";

const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../.."
);
const args = process.argv.slice(2);
const reportOnly = args.includes("--report");
const baseIndex = args.indexOf("--base");
const base = baseIndex >= 0 ? args[baseIndex + 1] : "origin/develop";

function gitLines(commandArgs) {
  return execFileSync("git", commandArgs, {
    cwd: repoRoot,
    encoding: "utf8"
  })
    .trim()
    .split("\n")
    .filter(Boolean);
}

let changedPaths;
try {
  changedPaths = [
    ...gitLines(["diff", "--name-only", `${base}...HEAD`]),
    ...gitLines(["diff", "--name-only"]),
    ...gitLines(["ls-files", "--others", "--exclude-standard"])
  ];
} catch (error) {
  console.error(
    `Could not determine changes from ${base}; selecting the full release gate.`
  );
  changedPaths = ["package.json"];
}

const plan = planAffectedChecks(changedPaths);
console.log(JSON.stringify({ base, ...plan }, null, 2));

if (reportOnly || plan.commands.length === 0) process.exit(0);

for (const command of plan.commands) {
  console.log(`\n[affected-checks] npm run ${command}\n`);
  const result = spawnSync("npm", ["run", command], {
    cwd: repoRoot,
    stdio: "inherit",
    env: process.env
  });
  if (result.status !== 0) process.exit(result.status ?? 1);
}
