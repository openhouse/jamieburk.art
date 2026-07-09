#!/usr/bin/env node

import { spawnSync } from "node:child_process";

const softLaunch = process.argv.includes("--soft");
const indexLaunch = process.argv.includes("--index");

if (!softLaunch && !indexLaunch) {
  console.error("Use --soft for production noindex smoke tests or --index for indexed production preflight.");
  process.exit(1);
}

const env = {
  ...process.env,
  APP_ENV: "production",
  SITE_ENV: "production",
  NEXT_PUBLIC_DEPLOY_ENV: "production",
  SITE_URL: "https://jamieburk.art",
  NEXT_PUBLIC_SITE_URL: "https://jamieburk.art",
  NEXT_PUBLIC_ROBOTS_POLICY: softLaunch ? "noindex" : "index",
  NEXT_PUBLIC_CONTACT_EMAIL: "jamie.burkart@gmail.com",
  NEXT_PUBLIC_LINKEDIN_URL: "https://linkedin.com/in/jamie-burkart",
  NEXT_PUBLIC_GITHUB_URL: "https://github.com/openhouse",
  NEXT_TELEMETRY_DISABLED: "1"
};

const result = spawnSync("npm", ["run", "check"], {
  env,
  stdio: "inherit"
});

process.exit(result.status ?? 1);
