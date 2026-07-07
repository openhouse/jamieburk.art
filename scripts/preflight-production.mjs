#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];
const productionUrl = "https://jamieburk.art";

const envValue = (name) => process.env[name]?.trim();
const stripTrailingSlash = (value) => value.replace(/\/$/, "");

function requireEnv(name, expected) {
  const value = envValue(name);
  if (!value) {
    errors.push(`${name} must be set to ${expected}.`);
    return;
  }
  if (stripTrailingSlash(value) !== expected) {
    errors.push(`${name} must be ${expected}. Received ${value}.`);
  }
}

function runNode(args, label) {
  try {
    execFileSync(process.execPath, args, {
      cwd: repoRoot,
      env: process.env,
      stdio: "inherit"
    });
  } catch {
    errors.push(`${label} failed.`);
  }
}

if (envValue("APP_ENV") !== "production") {
  errors.push(`APP_ENV must be production. Received ${envValue("APP_ENV") ?? "unset"}.`);
}

requireEnv("SITE_URL", productionUrl);
requireEnv("NEXT_PUBLIC_SITE_URL", productionUrl);

if (envValue("NEXT_PUBLIC_ROBOTS_POLICY") !== "index") {
  errors.push("NEXT_PUBLIC_ROBOTS_POLICY must be index for production preflight.");
}

const siteUrlSource = fs.readFileSync(path.join(repoRoot, "apps/www/src/lib/site-url.ts"), "utf8");
const nextConfigSource = fs.readFileSync(path.join(repoRoot, "apps/www/next.config.ts"), "utf8");
if (!siteUrlSource.includes('process.env.NEXT_PUBLIC_ROBOTS_POLICY === "index"')) {
  errors.push("ROBOTS_INDEXABLE must require NEXT_PUBLIC_ROBOTS_POLICY === \"index\".");
}
if (!nextConfigSource.includes('process.env.NEXT_PUBLIC_ROBOTS_POLICY === "index"')) {
  errors.push("Next config robots headers must require NEXT_PUBLIC_ROBOTS_POLICY === \"index\".");
}

const sitemapSource = fs.readFileSync(path.join(repoRoot, "apps/www/src/app/sitemap.ts"), "utf8");
for (const forbidden of [
  "/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf",
  "/work/source-backed-team-memory",
  "/work/fair-rent-crs",
  "/work/fairrentnyc",
  "/work/fairrentnyc-commercial-rent-stabilization",
  "/work/nyc-artist-coalition-fair-rent",
  "/proofs",
  "/knowledge-bank"
]) {
  if (sitemapSource.includes(forbidden)) {
    errors.push(`Sitemap source must not include ${forbidden}.`);
  }
}

runNode(["scripts/check-knowledge-bank.mjs", "--production"], "Knowledge-bank check");
runNode(["scripts/check-public-safety.mjs", "--production"], "Public-safety check");

if (envValue("CHECK_ROUTES_BASE_URL")) {
  runNode(["scripts/check-routes.mjs", envValue("CHECK_ROUTES_BASE_URL")], "Route check");
}

if (errors.length) {
  console.error("Production preflight failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Production preflight passed.");
