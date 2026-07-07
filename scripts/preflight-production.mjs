#!/usr/bin/env node

import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

const failures = [];

function requireEnv(name, expected) {
  const value = process.env[name]?.trim();
  if (!value) {
    failures.push(`${name} is required`);
    return;
  }
  if (expected && value.replace(/\/$/, "") !== expected) {
    failures.push(`${name} must be ${expected}; received ${value}`);
  }
}

requireEnv("APP_ENV", "production");
requireEnv("SITE_URL", "https://jamieburk.art");
requireEnv("NEXT_PUBLIC_SITE_URL", "https://jamieburk.art");
requireEnv("NEXT_PUBLIC_ROBOTS_POLICY", "index");

const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();
if (!email) {
  failures.push("NEXT_PUBLIC_CONTACT_EMAIL is required");
} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
  failures.push("NEXT_PUBLIC_CONTACT_EMAIL must be a valid email address");
}

const siteUrlSource = readFileSync("apps/www/src/lib/site-url.ts", "utf8");
if (!siteUrlSource.includes('process.env.NEXT_PUBLIC_ROBOTS_POLICY === "index"')) {
  failures.push("Production indexing must require NEXT_PUBLIC_ROBOTS_POLICY=index");
}

const sitemapSource = readFileSync("apps/www/src/app/sitemap.ts", "utf8");
for (const route of [
  "/",
  "/work",
  "/work/technical-operations",
  "/resume",
  "/about",
  "/contact",
  "/colophon",
  "/lab/source-backed-team-memory"
]) {
  if (!sitemapSource.includes(`"${route}"`)) {
    failures.push(`sitemap source is missing ${route}`);
  }
}

if (sitemapSource.includes("/proofs")) {
  failures.push("sitemap source must not include a public proofs route");
}

if (failures.length) {
  console.error("Production preflight failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

const result = spawnSync(process.execPath, ["scripts/check-public-safety.mjs", "--production"], {
  stdio: "inherit",
  env: process.env
});

process.exit(result.status ?? 1);
