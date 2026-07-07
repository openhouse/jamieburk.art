#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = new Set(process.argv.slice(2));
const mode = args.has("--staging") ? "staging" : "production";
const targetUrl = mode === "production" ? "https://jamieburk.art" : "https://staging.jamieburk.art";
const errors = [];

const envValue = (name) => process.env[name]?.trim();
const stripTrailingSlash = (value) => value.replace(/\/$/, "");

function addError(message) {
  errors.push(message);
}

function runNodeScript(script, scriptArgs = [], env = {}) {
  try {
    execFileSync(process.execPath, [script, ...scriptArgs], {
      cwd: repoRoot,
      env: { ...process.env, ...env },
      stdio: "pipe"
    });
  } catch (error) {
    const output = `${error.stdout?.toString() ?? ""}${error.stderr?.toString() ?? ""}`.trim();
    addError(output || `${script} failed.`);
  }
}

if (envValue("APP_ENV") !== mode) {
  addError(`APP_ENV must be ${mode}.`);
}

for (const name of ["SITE_ENV", "NEXT_PUBLIC_DEPLOY_ENV"]) {
  const value = envValue(name);
  if (value && value !== mode) {
    addError(`${name} must be ${mode} when set.`);
  }
}

const robotsPolicy = envValue("NEXT_PUBLIC_ROBOTS_POLICY");
if (mode === "staging" && robotsPolicy !== "noindex") {
  addError("NEXT_PUBLIC_ROBOTS_POLICY must be noindex for staging.");
}

if (mode === "production" && !["index", "noindex"].includes(robotsPolicy ?? "")) {
  addError(
    "NEXT_PUBLIC_ROBOTS_POLICY must be either noindex for soft launch or index for final launch."
  );
}

for (const name of ["SITE_URL", "NEXT_PUBLIC_SITE_URL"]) {
  const value = envValue(name);
  if (!value) {
    addError(`${name} is required.`);
  } else if (stripTrailingSlash(value) !== targetUrl) {
    addError(`${name} must be ${targetUrl}.`);
  }
}

const siteConfigPath = path.join(repoRoot, "apps/www/src/data/site.ts");
const siteConfig = readFileSync(siteConfigPath, "utf8");
const sitemapPath = path.join(repoRoot, "apps/www/src/app/sitemap.ts");
const sitemapSource = readFileSync(sitemapPath, "utf8");

if (/Public email pending confirmation|TODO:\s*Jamie approval required/i.test(siteConfig)) {
  addError("Visible contact approval placeholders must be removed from site config.");
}

if (/\/lab\/source-backed-team-memory/.test(sitemapSource)) {
  addError("Sitemap source must exclude the lab page unless Jamie explicitly approves indexing.");
}

if (/Jamie-Burkart-Resume-Technical-Project-Manager\.pdf/.test(sitemapSource)) {
  addError("Sitemap source must not include the resume PDF.");
}

const resumePath = path.join(
  repoRoot,
  "apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf"
);

if (!existsSync(resumePath)) {
  addError("Resume PDF is missing.");
} else if (mode === "production") {
  const bytes = readFileSync(resumePath);
  const searchable = `${bytes.toString("utf8")}\n${bytes.toString("latin1")}`;
  if (
    /Placeholder resume PDF/i.test(searchable) ||
    /Replace with approved current resume/i.test(searchable)
  ) {
    addError("Resume PDF still contains placeholder text.");
  }
}

runNodeScript("scripts/check-public-safety.mjs", mode === "production" ? ["--production"] : []);
runNodeScript("scripts/check-knowledge-bank.mjs", mode === "production" ? ["--production"] : []);
runNodeScript("scripts/check-routes.mjs");

const routeCheckBaseUrl = envValue("CHECK_ROUTES_BASE_URL");
if (routeCheckBaseUrl) {
  runNodeScript("scripts/check-routes.mjs", [routeCheckBaseUrl]);
}

if (errors.length) {
  console.error(`${mode === "production" ? "Production" : "Staging"} preflight failed:`);
  for (const error of errors) {
    for (const line of error.split("\n")) {
      console.error(`- ${line}`);
    }
  }
  process.exit(1);
}

console.log(
  `${mode === "production" ? "Production" : "Staging"} preflight passed for ${
    mode === "production" && robotsPolicy === "index"
      ? "final indexing"
      : "quiet noindex review"
  }.`
);
