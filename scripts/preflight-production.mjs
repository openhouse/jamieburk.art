#!/usr/bin/env node

import { execFileSync } from "node:child_process";

const env = {
  ...process.env,
  APP_ENV: process.env.APP_ENV ?? "production",
  SITE_ENV: process.env.SITE_ENV ?? "production",
  NEXT_PUBLIC_DEPLOY_ENV: process.env.NEXT_PUBLIC_DEPLOY_ENV ?? "production",
  SITE_URL: process.env.SITE_URL ?? "https://jamieburk.art",
  NEXT_PUBLIC_SITE_URL:
    process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL ?? "https://jamieburk.art",
  NEXT_PUBLIC_ROBOTS_POLICY: process.env.NEXT_PUBLIC_ROBOTS_POLICY ?? "noindex",
  NEXT_PUBLIC_CONTACT_EMAIL:
    process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "jamie.burkart@gmail.com"
};

if (!["index", "noindex"].includes(env.NEXT_PUBLIC_ROBOTS_POLICY)) {
  console.error(
    `preflight:production requires NEXT_PUBLIC_ROBOTS_POLICY=index or noindex; got ${env.NEXT_PUBLIC_ROBOTS_POLICY}`
  );
  process.exit(1);
}

console.log(
  `Production preflight: ${env.SITE_URL}, robots=${env.NEXT_PUBLIC_ROBOTS_POLICY}`
);

execFileSync(process.platform === "win32" ? "npm.cmd" : "npm", ["run", "check"], {
  env,
  stdio: "inherit"
});
