#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "..");
const errors = [];
const productionUrl = "https://jamieburk.art";

const envValue = (name) => process.env[name]?.trim();
const stripTrailingSlash = (value) => value.replace(/\/$/, "");
const addError = (message) => errors.push(message);

const appEnv = envValue("APP_ENV") ?? envValue("SITE_ENV") ?? envValue("NEXT_PUBLIC_DEPLOY_ENV");
if (appEnv !== "production") {
  addError(`APP_ENV, SITE_ENV, or NEXT_PUBLIC_DEPLOY_ENV must resolve to production. Received ${appEnv ?? "unset"}.`);
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

const siteUrlSource = readFileSync(path.join(repoRoot, "apps/www/src/lib/site-url.ts"), "utf8");
if (!siteUrlSource.includes('process.env.NEXT_PUBLIC_ROBOTS_POLICY === "index"')) {
  addError("ROBOTS_INDEXABLE must require NEXT_PUBLIC_ROBOTS_POLICY === \"index\".");
}

const nextConfig = readFileSync(path.join(repoRoot, "apps/www/next.config.ts"), "utf8");
for (const route of [
  "/work/fairrentnyc",
  "/work/fairrentnyc-commercial-rent-stabilization",
  "/work/nyc-artist-coalition-fair-rent",
  "/work/196-artists-residency",
  "/work/sunday-dinner-196-artists-residency",
  "/work/source-backed-team-memory",
  "/work/noting-us"
]) {
  if (!nextConfig.includes(`source: "${route}"`)) {
    addError(`Missing redirect source ${route}.`);
  }
}

if (!nextConfig.includes('source: "/resume/:path*"') || !nextConfig.includes('value: "noindex"')) {
  addError("Resume PDF responses must include an X-Robots-Tag noindex header.");
}

const resumePath = path.join(
  repoRoot,
  "apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf"
);
if (!existsSync(resumePath)) {
  addError("Resume PDF is missing.");
} else {
  let resumeText = "";
  try {
    resumeText = execFileSync("pdftotext", [resumePath, "-"], {
      cwd: repoRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"]
    });
  } catch {
    const buffer = readFileSync(resumePath);
    resumeText = `${buffer.toString("utf8")}\n${buffer.toString("latin1")}`;
  }

  if (/Placeholder resume PDF|Replace with approved current resume/i.test(resumeText)) {
    addError("Resume PDF is still the placeholder.");
  }
}

const sitemapSource = readFileSync(path.join(repoRoot, "apps/www/src/app/sitemap.ts"), "utf8");
for (const route of [
  "/",
  "/work",
  "/work/technical-operations",
  "/resume",
  "/about",
  "/contact",
  "/colophon",
  "/lab/source-backed-team-memory"
]) {
  if (!sitemapSource.includes(`"${route}"`)) {
    addError(`Sitemap static route is missing ${route}.`);
  }
}

try {
  execFileSync("node", ["scripts/check-public-safety.mjs", "--production"], {
    cwd: repoRoot,
    stdio: "pipe"
  });
} catch (error) {
  addError(`Production public-safety check failed:\n${error.stdout?.toString() ?? ""}${error.stderr?.toString() ?? ""}`);
}

if (errors.length) {
  console.error("Production preflight failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(`Production preflight passed with NEXT_PUBLIC_ROBOTS_POLICY=${robotsPolicy}.`);
