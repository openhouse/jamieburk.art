#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const failures = [];
const warnings = [];

const productionUrl = "https://jamieburk.art";
const stagingUrl = "https://staging.jamieburk.art";
const robotsPolicy = process.env.NEXT_PUBLIC_ROBOTS_POLICY;
const requireIndex = process.env.REQUIRE_PRODUCTION_INDEX === "1";
const appEnv = process.env.APP_ENV;
const siteEnv = process.env.SITE_ENV;
const deployEnv = process.env.NEXT_PUBLIC_DEPLOY_ENV;
const siteUrl = process.env.SITE_URL;
const publicSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const isProductionContext =
  appEnv === "production" || siteEnv === "production" || deployEnv === "production";
const isStagingContext =
  appEnv === "staging" || siteEnv === "staging" || deployEnv === "staging";

function fail(label, detail) {
  failures.push(detail ? `${label} (${detail})` : label);
}

function warn(label, detail) {
  warnings.push(detail ? `${label} (${detail})` : label);
}

function read(filePath) {
  return fs.readFileSync(path.join(root, filePath), "utf8");
}

function exists(filePath) {
  return fs.existsSync(path.join(root, filePath));
}

function run(command, args) {
  return spawnSync(command, args, {
    cwd: root,
    encoding: "utf8",
    maxBuffer: 1024 * 1024 * 24
  });
}

if (!isProductionContext && !isStagingContext) {
  fail("Preflight requires explicit APP_ENV/SITE_ENV/NEXT_PUBLIC_DEPLOY_ENV", "expected staging or production");
}

if (!["index", "noindex"].includes(robotsPolicy ?? "")) {
  fail("NEXT_PUBLIC_ROBOTS_POLICY must be explicit", `got ${robotsPolicy ?? "unset"}`);
}

if (isStagingContext) {
  if (siteUrl !== stagingUrl || publicSiteUrl !== stagingUrl) {
    fail("Staging URLs must point to staging.jamieburk.art", `${siteUrl ?? "unset"} / ${publicSiteUrl ?? "unset"}`);
  }
  if (robotsPolicy !== "noindex") {
    fail("Staging must remain noindex", `got ${robotsPolicy ?? "unset"}`);
  }
}

if (isProductionContext) {
  if (siteUrl !== productionUrl || publicSiteUrl !== productionUrl) {
    fail("Production URLs must point to jamieburk.art", `${siteUrl ?? "unset"} / ${publicSiteUrl ?? "unset"}`);
  }
  if (requireIndex && robotsPolicy !== "index") {
    fail("Final production check requires NEXT_PUBLIC_ROBOTS_POLICY=index", `got ${robotsPolicy ?? "unset"}`);
  }
  if (!requireIndex && robotsPolicy === "noindex") {
    warn("Quiet production review mode", "production URL with noindex/noarchive until Jamie approves indexing");
  }
}

const requiredScripts = {
  "knowledge-bank": "node scripts/check-knowledge-bank.mjs",
  "public-safety": "node scripts/check-public-safety.mjs",
  routes: "node scripts/check-routes.mjs"
};
const packageJson = exists("package.json") ? JSON.parse(read("package.json")) : { scripts: {} };
for (const [script, command] of Object.entries(requiredScripts)) {
  if (packageJson.scripts?.[script] !== command) {
    fail("Missing required package script", `${script}: ${command}`);
  }
}
for (const script of ["preflight:staging", "preflight:production", "check:production"]) {
  if (!packageJson.scripts?.[script]) {
    fail("Missing required package script", script);
  }
}

const resumePath = "apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf";
if (!exists(resumePath)) {
  fail("Missing approved resume PDF", resumePath);
} else {
  const result = run("pdftotext", [resumePath, "-"]);
  const resumeText = result.status === 0 ? result.stdout : fs.readFileSync(path.join(root, resumePath)).toString("latin1");
  if (/Placeholder resume PDF|Replace with approved current resume/i.test(resumeText)) {
    fail("Resume PDF appears to be a placeholder", resumePath);
  }
  if (!/Technical Project Manager/i.test(resumeText)) {
    warn("Resume text extraction did not find role phrase", resumePath);
  }
}

const siteUrlSource = exists("apps/www/src/lib/site-url.ts")
  ? read("apps/www/src/lib/site-url.ts")
  : "";
const nextConfigSource = exists("apps/www/next.config.ts")
  ? read("apps/www/next.config.ts")
  : "";
if (!siteUrlSource.includes('NEXT_PUBLIC_ROBOTS_POLICY === "index"') && !nextConfigSource.includes('NEXT_PUBLIC_ROBOTS_POLICY === "index"')) {
  fail("Production indexing must be explicit opt-in", "NEXT_PUBLIC_ROBOTS_POLICY=index");
}
if (!nextConfigSource.includes("noindex, noarchive")) {
  fail("Resume PDF noindex/noarchive header is missing", "apps/www/next.config.ts");
}

const sitemapSource = exists("apps/www/src/app/sitemap.ts")
  ? read("apps/www/src/app/sitemap.ts")
  : "";
for (const forbidden of [".pdf", "/work/source-backed-team-memory", "knowledge-bank", "proof-bank"]) {
  if (sitemapSource.includes(forbidden)) {
    fail("Sitemap source includes forbidden publication path", forbidden);
  }
}

if (warnings.length) {
  console.warn("\nProduction preflight warnings:");
  for (const warning of warnings) console.warn(`- ${warning}`);
}

if (failures.length) {
  console.error("\nProduction preflight failures:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `Production preflight passed${requireIndex ? " for final indexing" : " for quiet review"}.`
);
