#!/usr/bin/env node

import { spawnSync } from "node:child_process";

const env = {
  ...process.env,
  APP_ENV: "staging",
  SITE_ENV: "staging",
  NEXT_PUBLIC_DEPLOY_ENV: "staging",
  SITE_URL: "https://staging.jamieburk.art",
  NEXT_PUBLIC_SITE_URL: "https://staging.jamieburk.art",
  NEXT_PUBLIC_ROBOTS_POLICY: "noindex",
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
