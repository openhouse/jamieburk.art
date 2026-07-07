#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];

function env(name) {
  return process.env[name] ?? "";
}

function run(name, args) {
  const result = spawnSync(name, args, {
    cwd: repoRoot,
    stdio: "inherit",
    env: process.env
  });

  if (result.status !== 0) {
    failures.push(`${name} ${args.join(" ")} failed`);
  }
}

if (env("APP_ENV") !== "production") {
  failures.push("APP_ENV must be production for production preflight");
}

if (env("SITE_URL").replace(/\/$/, "") !== "https://jamieburk.art") {
  failures.push("SITE_URL must be https://jamieburk.art");
}

if (env("NEXT_PUBLIC_SITE_URL").replace(/\/$/, "") !== "https://jamieburk.art") {
  failures.push("NEXT_PUBLIC_SITE_URL must be https://jamieburk.art");
}

if (env("NEXT_PUBLIC_ROBOTS_POLICY") !== "index") {
  failures.push("NEXT_PUBLIC_ROBOTS_POLICY must be index for production indexing");
}

const resumePath = path.join(
  repoRoot,
  "apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf"
);

if (!existsSync(resumePath)) {
  failures.push("approved resume PDF is missing");
}

if (env("NEXT_PUBLIC_RESUME_PDF_APPROVED") !== "true") {
  failures.push("NEXT_PUBLIC_RESUME_PDF_APPROVED must be true for production preflight");
}

if (!env("NEXT_PUBLIC_CONTACT_EMAIL")) {
  failures.push("NEXT_PUBLIC_CONTACT_EMAIL must be set to an approved public email or production must remain blocked");
}

const siteUrlSource = readFileSync(
  path.join(repoRoot, "apps/www/src/lib/site-url.ts"),
  "utf8"
);

if (!siteUrlSource.includes('process.env.NEXT_PUBLIC_ROBOTS_POLICY === "index"')) {
  failures.push("site-url.ts must require NEXT_PUBLIC_ROBOTS_POLICY=index");
}

const sitemapSource = readFileSync(
  path.join(repoRoot, "apps/www/src/app/sitemap.ts"),
  "utf8"
);
const nextConfigSource = readFileSync(
  path.join(repoRoot, "apps/www/next.config.ts"),
  "utf8"
);

if (sitemapSource.includes('"/lab/source-backed-team-memory"')) {
  failures.push("lab page must not be in production sitemap for V1");
}

if (sitemapSource.includes("Jamie-Burkart-Resume-Technical-Project-Manager.pdf")) {
  failures.push("resume PDF must not be in sitemap");
}

if (!nextConfigSource.includes('source: "/resume/:path*"')) {
  failures.push("resume PDF noindex header route is missing");
}

run("node", ["scripts/check-knowledge-bank.mjs"]);
run("node", ["scripts/check-public-safety.mjs", "--production"]);
run("node", ["scripts/check-routes.mjs"]);

if (failures.length) {
  console.error("Production-readiness blockers:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Production-readiness preflight passed.");
