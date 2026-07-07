#!/usr/bin/env node

import { execFileSync } from "node:child_process";

const errors = [];
const envValue = (name) => process.env[name]?.trim();
const stripTrailingSlash = (value) => value.replace(/\/$/, "");

const appEnv = envValue("APP_ENV") ?? envValue("SITE_ENV") ?? envValue("NEXT_PUBLIC_DEPLOY_ENV");
if (!["staging", "development", "local"].includes(appEnv ?? "")) {
  errors.push(`Staging preflight expected staging/development/local env. Received ${appEnv ?? "unset"}.`);
}

for (const name of ["SITE_URL", "NEXT_PUBLIC_SITE_URL"]) {
  const value = envValue(name);
  if (!value) errors.push(`${name} must be set for staging preflight.`);
  else if (stripTrailingSlash(value) !== "https://staging.jamieburk.art") {
    errors.push(`${name} must be https://staging.jamieburk.art. Received ${value}.`);
  }
}

if (envValue("NEXT_PUBLIC_ROBOTS_POLICY") === "index") {
  errors.push("Staging must not use NEXT_PUBLIC_ROBOTS_POLICY=index.");
}

try {
  execFileSync("node", ["scripts/check-public-safety.mjs"], {
    stdio: "inherit"
  });
} catch {
  errors.push("Public-safety scan failed.");
}

if (errors.length) {
  console.error("Staging preflight failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Staging preflight passed.");
