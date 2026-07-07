#!/usr/bin/env node

import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

const failures = [];

function run(label, args, env = process.env) {
  const result = spawnSync(process.execPath, args, {
    stdio: "inherit",
    env
  });

  if (result.status !== 0) {
    failures.push(`${label} failed`);
  }
}

function requireEnv(name, expected) {
  const value = process.env[name]?.trim();
  if (!value) {
    failures.push(`${name} is required`);
    return "";
  }
  if (expected && value.replace(/\/$/, "") !== expected) {
    failures.push(`${name} must be ${expected}; received ${value}`);
  }
  return value;
}

requireEnv("APP_ENV", "production");
requireEnv("SITE_URL", "https://jamieburk.art");
requireEnv("NEXT_PUBLIC_SITE_URL", "https://jamieburk.art");

const robotsPolicy = requireEnv("NEXT_PUBLIC_ROBOTS_POLICY");
if (robotsPolicy && !["index", "noindex"].includes(robotsPolicy)) {
  failures.push("NEXT_PUBLIC_ROBOTS_POLICY must be index or noindex");
}

const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();
if (!email) {
  failures.push("NEXT_PUBLIC_CONTACT_EMAIL is required for production");
} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
  failures.push("NEXT_PUBLIC_CONTACT_EMAIL must be a valid email address");
}

const siteUrlSource = readFileSync("apps/www/src/lib/site-url.ts", "utf8");
if (!siteUrlSource.includes('process.env.NEXT_PUBLIC_ROBOTS_POLICY === "index"')) {
  failures.push("Production indexing must require NEXT_PUBLIC_ROBOTS_POLICY=index");
}
if (!siteUrlSource.includes('APP_ENV === "production"')) {
  failures.push("Production indexing must require APP_ENV=production");
}

const nextConfigSource = readFileSync("apps/www/next.config.ts", "utf8");
if (!nextConfigSource.includes('source: "/resume/:path*"')) {
  failures.push("Resume assets must remain noindex by X-Robots-Tag");
}
for (const redirect of [
  "/work/fairrentnyc",
  "/work/fairrentnyc-commercial-rent-stabilization",
  "/work/nyc-artist-coalition-fair-rent",
  "/work/196-artists-residency",
  "/work/sunday-dinner-196-artists-residency",
  "/work/source-backed-team-memory",
  "/work/noting-us"
]) {
  if (!nextConfigSource.includes(redirect)) {
    failures.push(`Expected redirect is missing: ${redirect}`);
  }
}

const sitemapSource = readFileSync("apps/www/src/app/sitemap.ts", "utf8");
for (const route of ["/", "/work", "/work/technical-operations", "/resume", "/about", "/contact", "/colophon"]) {
  if (!sitemapSource.includes(`"${route}"`)) {
    failures.push(`sitemap source is missing ${route}`);
  }
}
if (sitemapSource.includes("/lab/source-backed-team-memory")) {
  failures.push("sitemap source must not include the lab route without explicit indexing approval");
}
if (sitemapSource.includes("/proofs")) {
  failures.push("sitemap source must not include a public proofs route");
}

run("knowledge-bank", ["scripts/check-knowledge-bank.mjs", "--production"], {
  ...process.env,
  APP_ENV: "production"
});
run("public-safety", ["scripts/check-public-safety.mjs", "--production"], {
  ...process.env,
  APP_ENV: "production"
});

if (process.env.CHECK_ROUTES_BASE_URL) {
  run("route check", ["scripts/check-routes.mjs", process.env.CHECK_ROUTES_BASE_URL]);
}

if (failures.length) {
  console.error("Production preflight failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `Production preflight passed for ${robotsPolicy === "index" ? "indexable production" : "quiet noindex production"}.`
);
