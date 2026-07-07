#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "..");
const errors = [];
const productionUrl = "https://jamieburk.art";

function envValue(name) {
  return process.env[name]?.trim();
}

function stripTrailingSlash(value) {
  return value.replace(/\/$/, "");
}

function addError(message) {
  errors.push(message);
}

function run(label, command, args) {
  try {
    execFileSync(command, args, { cwd: repoRoot, stdio: "pipe" });
  } catch (error) {
    addError(
      `${label} failed:\n${error.stdout?.toString() ?? ""}${error.stderr?.toString() ?? ""}`
    );
  }
}

const appEnv =
  envValue("APP_ENV") ?? envValue("SITE_ENV") ?? envValue("NEXT_PUBLIC_DEPLOY_ENV");
if (appEnv !== "production") {
  addError(
    `APP_ENV, SITE_ENV, or NEXT_PUBLIC_DEPLOY_ENV must resolve to production. Received ${appEnv ?? "unset"}.`
  );
}

for (const name of ["SITE_URL", "NEXT_PUBLIC_SITE_URL"]) {
  const value = envValue(name);
  if (!value) {
    addError(`${name} must be set to ${productionUrl}.`);
  } else if (stripTrailingSlash(value) !== productionUrl) {
    addError(`${name} must be ${productionUrl}. Received ${value}.`);
  }
}

const robotsPolicy = envValue("NEXT_PUBLIC_ROBOTS_POLICY");
if (robotsPolicy !== "noindex" && robotsPolicy !== "index") {
  addError("NEXT_PUBLIC_ROBOTS_POLICY must be noindex or index for production preflight.");
}

const siteUrlSource = readFileSync(
  path.join(repoRoot, "apps/www/src/lib/site-url.ts"),
  "utf8"
);
if (!siteUrlSource.includes('process.env.NEXT_PUBLIC_ROBOTS_POLICY === "index"')) {
  addError('ROBOTS_INDEXABLE must require NEXT_PUBLIC_ROBOTS_POLICY === "index".');
}

const nextConfig = readFileSync(path.join(repoRoot, "apps/www/next.config.ts"), "utf8");
for (const route of [
  "/work/source-backed-team-memory",
  "/work/196-artists-residency",
  "/work/fair-rent-crs",
  "/work/fairrentnyc-commercial-rent-stabilization",
  "/technical-operations"
]) {
  if (!nextConfig.includes(`source: "${route}"`)) {
    addError(`Missing redirect source ${route}.`);
  }
}

if (
  !nextConfig.includes('source: "/resume/:path*"') ||
  !nextConfig.includes('value: "noindex, nofollow"')
) {
  addError("Resume PDF responses must include an X-Robots-Tag noindex header.");
}

run("Production public-safety", "node", [
  "scripts/check-public-safety.mjs",
  "--production"
]);
run("Route check", "node", ["scripts/check-routes.mjs"]);

if (errors.length) {
  console.error("Production preflight failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(`Production preflight passed with NEXT_PUBLIC_ROBOTS_POLICY=${robotsPolicy}.`);

