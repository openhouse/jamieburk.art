#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];

function fail(message) {
  failures.push(message);
}

function runScript(scriptName) {
  execFileSync(process.execPath, [path.join(repoRoot, "scripts", scriptName)], {
    cwd: repoRoot,
    stdio: "inherit"
  });
}

if (process.env.NEXT_PUBLIC_ROBOTS_POLICY === "index") {
  fail("staging must not use NEXT_PUBLIC_ROBOTS_POLICY=index");
}

if (process.env.APP_ENV === "production") {
  fail("staging preflight must not run with APP_ENV=production");
}

if (process.env.SITE_URL === "https://jamieburk.art") {
  fail("staging preflight must not resolve to the production URL");
}

runScript("check-public-safety.mjs");
runScript("check-routes.mjs");

if (failures.length) {
  console.error("Staging preflight failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Staging preflight passed.");
