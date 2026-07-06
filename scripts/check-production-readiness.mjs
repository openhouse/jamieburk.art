#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];

const publicSafety = spawnSync(
  process.execPath,
  [path.join(repoRoot, "scripts/check-public-safety.mjs"), "--production"],
  { cwd: repoRoot, stdio: "inherit" }
);

if (publicSafety.status !== 0) {
  process.exit(publicSafety.status ?? 1);
}

function env(name) {
  const value = process.env[name]?.trim();
  return value || "";
}

function add(message) {
  failures.push(message);
}

if (env("APP_ENV") !== "production") add("APP_ENV must be production.");
if (env("SITE_ENV") !== "production") add("SITE_ENV must be production.");
if (env("NEXT_PUBLIC_DEPLOY_ENV") !== "production") {
  add("NEXT_PUBLIC_DEPLOY_ENV must be production.");
}

if (env("SITE_URL") !== "https://jamieburk.art") {
  add("SITE_URL must be https://jamieburk.art.");
}

if (env("NEXT_PUBLIC_SITE_URL") !== "https://jamieburk.art") {
  add("NEXT_PUBLIC_SITE_URL must be https://jamieburk.art.");
}

if (env("SITE_URL") !== env("NEXT_PUBLIC_SITE_URL")) {
  add("SITE_URL and NEXT_PUBLIC_SITE_URL must match.");
}

if (env("NEXT_PUBLIC_ROBOTS_POLICY") !== "index") {
  add("NEXT_PUBLIC_ROBOTS_POLICY must be exactly index for production indexing.");
}

const hasContactPath = Boolean(
  env("NEXT_PUBLIC_CONTACT_EMAIL") ||
    env("NEXT_PUBLIC_LINKEDIN_URL") ||
    env("NEXT_PUBLIC_GITHUB_URL")
);

if (!hasContactPath) {
  add("At least one approved public contact path must be set for production.");
}

const nextConfig = fs.readFileSync(path.join(repoRoot, "apps/www/next.config.ts"), "utf8");

if (!nextConfig.includes('source: "/resume/:path*"') || !nextConfig.includes("X-Robots-Tag")) {
  add("Resume PDF route must emit X-Robots-Tag noindex.");
}

if (!nextConfig.includes("www.jamieburk.art") || !nextConfig.includes("https://jamieburk.art/:path*")) {
  add("www.jamieburk.art must redirect to the apex domain.");
}

if (!nextConfig.includes("/work/fairrentnyc-commercial-rent-stabilization")) {
  add("FairRentNYC legacy redirect is missing.");
}

if (!nextConfig.includes("/work/source-backed-team-memory")) {
  add("Source-Backed Team Memory work-to-lab redirect is missing.");
}

if (failures.length) {
  console.error("Production readiness check failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Production readiness check passed.");
