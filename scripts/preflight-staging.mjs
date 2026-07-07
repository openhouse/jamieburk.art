#!/usr/bin/env node

import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

const failures = [];
const appEnv = process.env.APP_ENV?.trim() || "staging";
const siteUrl = (process.env.SITE_URL?.trim() || "https://staging.jamieburk.art").replace(/\/$/, "");
const nextPublicSiteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://staging.jamieburk.art"
).replace(/\/$/, "");
const robotsPolicy = process.env.NEXT_PUBLIC_ROBOTS_POLICY?.trim() || "noindex";

if (appEnv !== "staging" && appEnv !== "development") {
  failures.push(`APP_ENV should be staging or development for staging preflight; received ${appEnv}`);
}
if (siteUrl !== "https://staging.jamieburk.art" && !siteUrl.startsWith("http://localhost")) {
  failures.push(`SITE_URL should be staging or localhost; received ${siteUrl}`);
}
if (
  nextPublicSiteUrl !== "https://staging.jamieburk.art" &&
  !nextPublicSiteUrl.startsWith("http://localhost")
) {
  failures.push(`NEXT_PUBLIC_SITE_URL should be staging or localhost; received ${nextPublicSiteUrl}`);
}
if (robotsPolicy !== "noindex") {
  failures.push("NEXT_PUBLIC_ROBOTS_POLICY must be noindex for staging");
}

const robotsSource = readFileSync("apps/www/src/app/robots.ts", "utf8");
if (!robotsSource.includes('disallow: "/"')) {
  failures.push("robots.ts must disallow crawling when ROBOTS_INDEXABLE is false");
}

const metadataSource = readFileSync("apps/www/src/lib/metadata.ts", "utf8");
if (!metadataSource.includes("ROBOTS_INDEXABLE")) {
  failures.push("metadata must derive index/follow from ROBOTS_INDEXABLE");
}

const knowledgeBankResult = spawnSync(process.execPath, ["scripts/check-knowledge-bank.mjs"], {
  stdio: "inherit",
  env: process.env
});
if (knowledgeBankResult.status !== 0) failures.push("knowledge-bank check failed");

const publicSafetyResult = spawnSync(process.execPath, ["scripts/check-public-safety.mjs"], {
  stdio: "inherit",
  env: {
    ...process.env,
    APP_ENV: appEnv,
    SITE_URL: siteUrl,
    NEXT_PUBLIC_SITE_URL: nextPublicSiteUrl,
    NEXT_PUBLIC_ROBOTS_POLICY: robotsPolicy
  }
});

if (publicSafetyResult.status !== 0) failures.push("public-safety check failed");

if (failures.length) {
  console.error("Staging preflight failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Staging preflight passed.");
