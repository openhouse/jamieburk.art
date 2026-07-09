#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];

const requiredEnv = {
  APP_ENV: "production",
  SITE_ENV: "production",
  NEXT_PUBLIC_DEPLOY_ENV: "production",
  SITE_URL: "https://jamieburk.art",
  NEXT_PUBLIC_SITE_URL: "https://jamieburk.art",
  NEXT_PUBLIC_ROBOTS_POLICY: "index",
  NEXT_PUBLIC_CONTACT_EMAIL: "jamie.burkart@gmail.com",
  NEXT_PUBLIC_LINKEDIN_URL: "https://linkedin.com/in/jamie-burkart",
  NEXT_PUBLIC_GITHUB_URL: "https://github.com/openhouse"
};

function fail(message) {
  failures.push(message);
}

function read(relativePath) {
  return readFileSync(path.join(repoRoot, relativePath), "utf8");
}

function walk(dir) {
  if (!existsSync(dir)) return [];

  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const absolute = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(absolute));
    if (entry.isFile()) files.push(absolute);
  }
  return files;
}

function runScript(scriptName) {
  execFileSync(process.execPath, [path.join(repoRoot, "scripts", scriptName)], {
    cwd: repoRoot,
    stdio: "inherit"
  });
}

for (const [key, expected] of Object.entries(requiredEnv)) {
  if (process.env[key] !== expected) {
    fail(`${key} must be ${expected}`);
  }
}

runScript("check-public-safety.mjs");
runScript("check-routes.mjs");

const resumePath = path.join(
  repoRoot,
  "apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf"
);

if (!existsSync(resumePath)) {
  fail("approved resume PDF is missing");
} else if (statSync(resumePath).size < 10_000) {
  fail("approved resume PDF is unexpectedly small");
}

const siteData = read("apps/www/src/data/site.ts");
for (const expected of [
  "jamie.burkart@gmail.com",
  "https://linkedin.com/in/jamie-burkart",
  "https://github.com/openhouse"
]) {
  if (!siteData.includes(expected)) fail(`site data is missing ${expected}`);
}

const nextConfig = read("apps/www/next.config.ts");
if (!nextConfig.includes('source: "/resume/:path*"')) {
  fail("resume route X-Robots-Tag header is missing");
}

const sitemapSource = read("apps/www/src/app/sitemap.ts");
if (/Resume-Technical-Project-Manager\.pdf|\/resume\/Jamie-Burkart/i.test(sitemapSource)) {
  fail("sitemap source must not include resume PDF URLs");
}

const buildRoots = [
  path.join(repoRoot, "apps/www/.next/server/app"),
  path.join(repoRoot, "apps/www/.next/static"),
  path.join(repoRoot, "apps/www/.next/standalone")
];

for (const file of buildRoots.flatMap(walk)) {
  if (!/\.(html|js|json|txt|rsc|meta|body)$/i.test(file)) continue;
  const content = readFileSync(file, "utf8");
  if (content.includes("https://staging.jamieburk.art")) {
    fail(`${path.relative(repoRoot, file)} contains staging URL in production build output`);
  }
  if (/TODO:\s*Jamie approval required|Placeholder resume PDF|Replace with approved current resume/i.test(content)) {
    fail(`${path.relative(repoRoot, file)} contains launch-blocking placeholder text`);
  }
}

if (failures.length) {
  console.error("Production preflight failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Production preflight passed.");
