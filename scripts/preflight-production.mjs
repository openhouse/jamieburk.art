#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const errors = [];
const productionUrl = "https://jamieburk.art";

function addError(message) {
  errors.push(message);
}

function file(relativePath) {
  return path.join(root, relativePath);
}

function env(name) {
  return process.env[name]?.trim();
}

function stripTrailingSlash(value) {
  return value.replace(/\/$/, "");
}

const appEnv = env("APP_ENV") ?? env("SITE_ENV") ?? env("NEXT_PUBLIC_DEPLOY_ENV");
if (appEnv !== "production") {
  addError(`APP_ENV, SITE_ENV, or NEXT_PUBLIC_DEPLOY_ENV must resolve to production. Received ${appEnv ?? "unset"}.`);
}

for (const name of ["SITE_URL", "NEXT_PUBLIC_SITE_URL"]) {
  const value = env(name);
  if (!value) addError(`${name} must be set to ${productionUrl}.`);
  else if (stripTrailingSlash(value) !== productionUrl) {
    addError(`${name} must be ${productionUrl}. Received ${value}.`);
  }
}

if (env("NEXT_PUBLIC_ROBOTS_POLICY") !== "index") {
  addError("NEXT_PUBLIC_ROBOTS_POLICY must be exactly index for production indexing.");
}

const siteUrlSource = readFileSync(file("apps/www/src/lib/site-url.ts"), "utf8");
if (!siteUrlSource.includes('process.env.NEXT_PUBLIC_ROBOTS_POLICY === "index"')) {
  addError('ROBOTS_INDEXABLE must require NEXT_PUBLIC_ROBOTS_POLICY === "index".');
}

const nextConfig = readFileSync(file("apps/www/next.config.ts"), "utf8");
if (!nextConfig.includes('source: "/resume/:path*.pdf"') || !nextConfig.includes('value: "noindex"')) {
  addError("Resume PDF responses must include an X-Robots-Tag noindex header.");
}

const sitemapSource = readFileSync(file("apps/www/src/app/sitemap.ts"), "utf8");
if (!sitemapSource.includes("SITE_URL")) {
  addError("Sitemap should be generated from SITE_URL.");
}

if (sitemapSource.includes("https://staging.jamieburk.art")) {
  addError("Sitemap source must not hardcode staging URLs.");
}

for (const route of ["/", "/work", "/work/technical-operations", "/resume", "/about", "/contact", "/colophon"]) {
  if (!sitemapSource.includes(`"${route}"`)) addError(`Sitemap static route is missing ${route}.`);
}

const resumePath = file("apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf");
if (!existsSync(resumePath)) {
  addError("Resume PDF is missing.");
}

const approvalRegister = readFileSync(file("docs/knowledge-bank/approval-register.md"), "utf8");
for (const item of ["Resume PDF", "Public email", "LinkedIn URL", "GitHub URL"]) {
  const openPattern = new RegExp(`\\|\\s*${item.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*\\|\\s*Open\\s*\\|`);
  if (openPattern.test(approvalRegister)) {
    addError(`${item} remains Open in docs/knowledge-bank/approval-register.md.`);
  }
}

for (const command of [
  ["node", ["scripts/check-public-safety.mjs", "--production"]],
  ["node", ["scripts/check-knowledge-bank.mjs"]]
]) {
  try {
    execFileSync(command[0], command[1], { cwd: root, stdio: "pipe" });
  } catch (error) {
    addError(`${command[0]} ${command[1].join(" ")} failed:\n${error.stdout?.toString() ?? ""}${error.stderr?.toString() ?? ""}`);
  }
}

if (errors.length) {
  console.error("Production preflight failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Production preflight passed.");
