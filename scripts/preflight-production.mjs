#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];
const productionUrl = "https://jamieburk.art";

function env(name) {
  return process.env[name]?.trim();
}

function stripTrailingSlash(value) {
  return value.replace(/\/$/, "");
}

function run(label, args, extraEnv = {}) {
  try {
    execFileSync(process.execPath, args, {
      cwd: repoRoot,
      env: { ...process.env, ...extraEnv },
      stdio: "inherit"
    });
  } catch {
    failures.push(`${label} failed`);
  }
}

const deployEnv = env("APP_ENV") ?? env("SITE_ENV") ?? env("NEXT_PUBLIC_DEPLOY_ENV");
const robotsPolicy = env("NEXT_PUBLIC_ROBOTS_POLICY");

if (deployEnv !== "production") {
  failures.push(
    `production preflight requires APP_ENV, SITE_ENV, or NEXT_PUBLIC_DEPLOY_ENV to resolve to production (got ${deployEnv ?? "unset"})`
  );
}

for (const name of ["SITE_URL", "NEXT_PUBLIC_SITE_URL"]) {
  const value = env(name);
  if (!value || stripTrailingSlash(value) !== productionUrl) {
    failures.push(`${name} must be ${productionUrl} for production preflight`);
  }
}

if (robotsPolicy !== "noindex" && robotsPolicy !== "index") {
  failures.push("NEXT_PUBLIC_ROBOTS_POLICY must be noindex or index for production preflight");
}

run("knowledge-bank", ["scripts/check-knowledge-bank.mjs"]);
run("public-safety", ["scripts/check-public-safety.mjs"], {
  NODE_ENV: "production"
});
run("routes", ["scripts/check-routes.mjs"]);

if (failures.length) {
  console.error("Production preflight failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Production preflight passed with NEXT_PUBLIC_ROBOTS_POLICY=${robotsPolicy}.`);

