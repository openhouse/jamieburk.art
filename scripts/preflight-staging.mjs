#!/usr/bin/env node

import { spawnSync } from "node:child_process";

const blockers = [];
const appEnv =
  process.env.APP_ENV ?? process.env.SITE_ENV ?? process.env.NEXT_PUBLIC_DEPLOY_ENV ?? "staging";
const robotsPolicy = process.env.NEXT_PUBLIC_ROBOTS_POLICY ?? "noindex";

if (appEnv === "production") {
  blockers.push("Staging preflight must not run with APP_ENV/SITE_ENV/NEXT_PUBLIC_DEPLOY_ENV=production.");
}

if (robotsPolicy === "index") {
  blockers.push("Staging preflight must remain noindex; NEXT_PUBLIC_ROBOTS_POLICY=index is not allowed.");
}

if (blockers.length) {
  console.error("Staging preflight failed:");
  for (const blocker of blockers) console.error(`- ${blocker}`);
  process.exit(1);
}

const commands = [
  ["node", ["scripts/check-public-safety.mjs"]],
  ["node", ["scripts/check-routes.mjs"]]
];

for (const [command, args] of commands) {
  const result = spawnSync(command, args, { stdio: "inherit" });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

console.log("Staging preflight passed; staging remains noindex.");
