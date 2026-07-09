#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];

function fail(message) {
  failures.push(message);
}

function read(relativePath) {
  return readFileSync(path.join(repoRoot, relativePath), "utf8");
}

function requireFile(relativePath) {
  if (!existsSync(path.join(repoRoot, relativePath))) fail(`${relativePath} is missing`);
}

for (const file of [
  "apps/www/src/app/page.tsx",
  "apps/www/src/app/work/page.tsx",
  "apps/www/src/app/work/[slug]/page.tsx",
  "apps/www/src/app/work/technical-operations/page.tsx",
  "apps/www/src/app/lab/source-backed-team-memory/page.tsx",
  "apps/www/src/app/resume/page.tsx",
  "apps/www/src/app/robots.ts",
  "apps/www/src/app/sitemap.ts",
  "apps/www/src/app/api/health/route.ts"
]) {
  requireFile(file);
}

for (const routeDir of [
  "apps/www/src/app/proofs",
  "apps/www/src/app/knowledge-bank",
  "apps/www/src/app/public-claims"
]) {
  if (existsSync(path.join(repoRoot, routeDir))) fail(`${routeDir} must not exist`);
}

const workSource = read("apps/www/src/data/work.ts");
for (const slug of [
  "fair-rent-nyc",
  "196-sunday-dinner",
  "callnyc",
  "harry-j-epstein",
  "kc-town-hall",
  "wowlist"
]) {
  if (!workSource.includes(`slug: "${slug}"`)) fail(`work slug is missing: ${slug}`);
}

const nextConfigSource = read("apps/www/next.config.ts");
for (const legacyRoute of [
  "/:path*",
  "/technical-operations",
  "/work/fairrentnyc-commercial-rent-stabilization",
  "/work/fairrentnyc",
  "/work/nyc-artist-coalition-fair-rent",
  "/work/fair-rent-crs",
  "/work/196-artists-residency",
  "/work/source-backed-team-memory",
  "/work/noting-us"
]) {
  if (!nextConfigSource.includes(`source: "${legacyRoute}"`)) {
    fail(`legacy redirect missing: ${legacyRoute}`);
  }
}

for (const destination of [
  "https://jamieburk.art/:path*",
  "/work/technical-operations",
  "/work/fair-rent-nyc",
  "/work/196-sunday-dinner",
  "/lab/source-backed-team-memory"
]) {
  if (!nextConfigSource.includes(`destination: "${destination}"`)) {
    fail(`redirect destination missing: ${destination}`);
  }
}

const sitemapSource = read("apps/www/src/app/sitemap.ts");
for (const canonicalRoute of [
  "/",
  "/work",
  "/work/technical-operations",
  "/resume",
  "/about",
  "/contact",
  "/colophon",
  "/lab/source-backed-team-memory"
]) {
  if (!sitemapSource.includes(`"${canonicalRoute}"`)) {
    fail(`sitemap static route missing: ${canonicalRoute}`);
  }
}

for (const blockedRoute of [
  "/proofs",
  "/knowledge-bank",
  "/public-claims",
  "/technical-operations",
  "/work/source-backed-team-memory",
  "/work/noting-us",
  "/work/fairrentnyc",
  "/work/fairrentnyc-commercial-rent-stabilization",
  "/work/fair-rent-crs",
  "/work/196-artists-residency"
]) {
  if (sitemapSource.includes(`"${blockedRoute}"`) || sitemapSource.includes(`'${blockedRoute}'`)) {
    fail(`sitemap includes blocked or legacy route: ${blockedRoute}`);
  }
}

if (!nextConfigSource.includes('type: "host", value: "www.jamieburk.art"')) {
  fail("www.jamieburk.art apex redirect host rule is missing");
}

if (!nextConfigSource.includes("permanent: true")) {
  fail("www.jamieburk.art apex redirect must be permanent");
}

const labPageSource = read("apps/www/src/app/lab/source-backed-team-memory/page.tsx");
if (!labPageSource.includes('path: "/lab/source-backed-team-memory"')) {
  fail("Source-Backed Team Memory canonical path must stay under /lab");
}

if (failures.length) {
  console.error("Route check failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Route check passed.");
