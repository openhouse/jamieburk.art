#!/usr/bin/env node

import { execFileSync } from "node:child_process";

const root = process.cwd();
const env = {
  ...process.env,
  APP_ENV: "staging",
  SITE_URL: process.env.SITE_URL ?? "https://staging.jamieburk.art",
  NEXT_PUBLIC_SITE_URL:
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://staging.jamieburk.art",
  NEXT_PUBLIC_ROBOTS_POLICY: process.env.NEXT_PUBLIC_ROBOTS_POLICY ?? "noindex"
};

const checks = [
  ["typecheck", ["run", "typecheck"]],
  ["lint", ["run", "lint"]],
  ["public-safety", ["run", "public-safety"]],
  ["route check", ["run", "check:routes"]]
];

const failures = [];

for (const [label, args] of checks) {
  try {
    execFileSync("npm", args, { cwd: root, env, stdio: "inherit" });
  } catch {
    failures.push(label);
  }
}

if (failures.length > 0) {
  console.error("Staging preflight failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Staging preflight passed.");
