#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "..");
const errors = [];

function envValue(name) {
  return process.env[name]?.trim();
}

function run(label, command, args) {
  try {
    execFileSync(command, args, { cwd: repoRoot, stdio: "inherit" });
  } catch {
    errors.push(`${label} failed.`);
  }
}

const appEnv =
  envValue("APP_ENV") ?? envValue("SITE_ENV") ?? envValue("NEXT_PUBLIC_DEPLOY_ENV");
const robotsPolicy = envValue("NEXT_PUBLIC_ROBOTS_POLICY") ?? "noindex";

if (appEnv === "production") {
  errors.push("Staging preflight must not resolve APP_ENV/SITE_ENV/NEXT_PUBLIC_DEPLOY_ENV to production.");
}

if (robotsPolicy === "index") {
  errors.push("Staging must not use NEXT_PUBLIC_ROBOTS_POLICY=index.");
}

run("Public-safety", "node", ["scripts/check-public-safety.mjs"]);
run("Route check", "node", ["scripts/check-routes.mjs"]);

if (errors.length) {
  console.error("Staging preflight failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("Staging preflight passed.");

