#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];

function env(name) {
  return process.env[name]?.trim();
}

function run(label, args) {
  try {
    execFileSync(process.execPath, args, { cwd: repoRoot, stdio: "inherit" });
  } catch {
    failures.push(`${label} failed`);
  }
}

const deployEnv = env("APP_ENV") ?? env("SITE_ENV") ?? env("NEXT_PUBLIC_DEPLOY_ENV") ?? "staging";
const robotsPolicy = env("NEXT_PUBLIC_ROBOTS_POLICY") ?? "noindex";

if (deployEnv === "production") {
  failures.push("staging preflight must not resolve to production");
}

if (robotsPolicy === "index") {
  failures.push("staging preflight requires a noindex robots policy");
}

run("knowledge-bank", ["scripts/check-knowledge-bank.mjs"]);
run("public-safety", ["scripts/check-public-safety.mjs"]);
run("routes", ["scripts/check-routes.mjs"]);

if (failures.length) {
  console.error("Staging preflight failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Staging preflight passed.");

