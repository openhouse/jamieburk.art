#!/usr/bin/env node

import { execFileSync, spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];
const productionUrl = "https://jamieburk.art";

function env(name) {
  return process.env[name]?.trim() ?? "";
}

function add(message) {
  failures.push(message);
}

function stripTrailingSlash(value) {
  return value.replace(/\/$/, "");
}

function runNodeScript(script, args = []) {
  try {
    execFileSync(process.execPath, [script, ...args], {
      cwd: repoRoot,
      stdio: "pipe"
    });
  } catch (error) {
    const output = `${error.stdout?.toString() ?? ""}${error.stderr?.toString() ?? ""}`.trim();
    add(output || `${script} failed.`);
  }
}

runNodeScript("scripts/check-public-safety.mjs", ["--production"]);
runNodeScript("scripts/check-routes.mjs");

if (env("APP_ENV") !== "production") add("APP_ENV must be production.");
if (env("SITE_ENV") !== "production") add("SITE_ENV must be production.");
if (env("NEXT_PUBLIC_DEPLOY_ENV") !== "production") {
  add("NEXT_PUBLIC_DEPLOY_ENV must be production.");
}
if (stripTrailingSlash(env("SITE_URL")) !== productionUrl) {
  add(`SITE_URL must be ${productionUrl}.`);
}
if (stripTrailingSlash(env("NEXT_PUBLIC_SITE_URL")) !== productionUrl) {
  add(`NEXT_PUBLIC_SITE_URL must be ${productionUrl}.`);
}
if (env("NEXT_PUBLIC_ROBOTS_POLICY") !== "index") {
  add("NEXT_PUBLIC_ROBOTS_POLICY must be exactly index for final production indexing.");
}

const contactEmail = env("NEXT_PUBLIC_CONTACT_EMAIL");
if (!contactEmail) {
  add("NEXT_PUBLIC_CONTACT_EMAIL must be set to an approved public email for production.");
}
if (/todo|pending|placeholder|example/i.test(contactEmail)) {
  add("NEXT_PUBLIC_CONTACT_EMAIL must not be a TODO, pending, placeholder, or example value.");
}

const siteUrlSource = fs.readFileSync(
  path.join(repoRoot, "apps/www/src/lib/site-url.ts"),
  "utf8"
);
if (!siteUrlSource.includes('process.env.NEXT_PUBLIC_ROBOTS_POLICY === "index"')) {
  add("ROBOTS_INDEXABLE must require NEXT_PUBLIC_ROBOTS_POLICY === \"index\".");
}

const nextConfig = fs.readFileSync(path.join(repoRoot, "apps/www/next.config.ts"), "utf8");
if (!nextConfig.includes('source: "/resume/:path*"') || !nextConfig.includes("X-Robots-Tag")) {
  add("Resume PDF route must emit X-Robots-Tag noindex.");
}
if (!nextConfig.includes("www.jamieburk.art") || !nextConfig.includes("https://jamieburk.art/:path*")) {
  add("www.jamieburk.art must redirect to the apex domain.");
}

const sitemap = fs.readFileSync(path.join(repoRoot, "apps/www/src/app/sitemap.ts"), "utf8");
if (!sitemap.includes('"/lab/source-backed-team-memory"')) {
  add("Sitemap source must include the bounded lab route.");
}
if (sitemap.includes("Jamie-Burkart-Resume-Technical-Project-Manager.pdf")) {
  add("Sitemap source must not include the resume PDF.");
}

const resumePath = path.join(
  repoRoot,
  "apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf"
);
if (!fs.existsSync(resumePath)) {
  add("Resume PDF is missing.");
} else {
  const stat = fs.statSync(resumePath);
  if (stat.size <= 10_000) add("Resume PDF must be larger than 10 KB.");
  const extracted = spawnSync("pdftotext", [resumePath, "-"], { encoding: "utf8" });
  const text = extracted.status === 0 ? extracted.stdout : fs.readFileSync(resumePath).toString("latin1");
  if (!text.includes("Jamie Burkart")) add('Resume PDF text must include "Jamie Burkart".');
  if (/placeholder|TODO/i.test(text)) add("Resume PDF must not contain placeholder or TODO text.");
}

if (failures.length) {
  console.error("Production preflight failed:");
  for (const failure of failures) {
    for (const line of failure.split("\n")) console.error(`- ${line}`);
  }
  process.exit(1);
}

console.log("Production preflight passed.");
