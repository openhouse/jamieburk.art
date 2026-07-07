#!/usr/bin/env node

import { execFileSync } from "node:child_process";

const blockers = [];

function run(command, args) {
  execFileSync(command, args, { stdio: "inherit" });
}

run("node", ["scripts/check-public-safety.mjs", "--production"]);
run("node", ["scripts/check-knowledge-bank.mjs"]);

if (process.env.APP_ENV !== "production") {
  blockers.push("APP_ENV must be production for production indexing.");
}

if (process.env.SITE_URL !== "https://jamieburk.art") {
  blockers.push("SITE_URL must be https://jamieburk.art for production indexing.");
}

if (
  process.env.NEXT_PUBLIC_SITE_URL &&
  process.env.NEXT_PUBLIC_SITE_URL !== "https://jamieburk.art"
) {
  blockers.push("NEXT_PUBLIC_SITE_URL must be https://jamieburk.art when set for production.");
}

if (process.env.NEXT_PUBLIC_ROBOTS_POLICY !== "index") {
  blockers.push("NEXT_PUBLIC_ROBOTS_POLICY must be index for production indexing.");
}

if (blockers.length > 0) {
  console.error("Production-safety check failed:");
  for (const blocker of blockers) console.error(`- ${blocker}`);
  process.exit(1);
}

console.log("Production-safety check passed.");
