#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];
const productionUrl = "https://jamieburk.art";
const envValue = (name) => process.env[name]?.trim();
const stripTrailingSlash = (value) => value.replace(/\/$/, "");

const appEnv = envValue("APP_ENV") ?? envValue("SITE_ENV") ?? envValue("NEXT_PUBLIC_DEPLOY_ENV");
if (appEnv !== "production") {
  errors.push(`APP_ENV, SITE_ENV, or NEXT_PUBLIC_DEPLOY_ENV must resolve to production. Received ${appEnv ?? "unset"}.`);
}

for (const name of ["SITE_URL", "NEXT_PUBLIC_SITE_URL"]) {
  const value = envValue(name);
  if (!value) errors.push(`${name} must be set to ${productionUrl}.`);
  else if (stripTrailingSlash(value) !== productionUrl) {
    errors.push(`${name} must be ${productionUrl}. Received ${value}.`);
  }
}

if (envValue("NEXT_PUBLIC_ROBOTS_POLICY") !== "index") {
  errors.push("NEXT_PUBLIC_ROBOTS_POLICY must be index for production preflight.");
}

const siteUrlSource = fs.readFileSync(path.join(repoRoot, "apps/www/src/lib/site-url.ts"), "utf8");
if (!siteUrlSource.includes('process.env.NEXT_PUBLIC_ROBOTS_POLICY === "index"')) {
  errors.push("ROBOTS_INDEXABLE must require NEXT_PUBLIC_ROBOTS_POLICY === \"index\".");
}

try {
  execFileSync("node", ["scripts/check-public-safety.mjs", "--production"], {
    cwd: repoRoot,
    stdio: "inherit"
  });
} catch {
  errors.push("Production public-safety scan failed.");
}

if (errors.length) {
  console.error("Production preflight failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Production preflight passed.");
