#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const failures = [];

const canonicalStaticRoutes = [
  "/",
  "/work",
  "/work/technical-operations",
  "/resume",
  "/about",
  "/contact",
  "/colophon",
  "/lab/source-backed-team-memory"
];

const canonicalWorkSlugs = [
  "harry-j-epstein",
  "fair-rent-nyc",
  "callnyc",
  "wowlist",
  "196-sunday-dinner",
  "kc-town-hall"
];

const redirects = [
  ["/work/fairrentnyc-commercial-rent-stabilization", "/work/fair-rent-nyc"],
  ["/work/fairrentnyc", "/work/fair-rent-nyc"],
  ["/work/nyc-artist-coalition-fair-rent", "/work/fair-rent-nyc"],
  ["/work/196-artists-residency", "/work/196-sunday-dinner"],
  ["/work/source-backed-team-memory", "/lab/source-backed-team-memory"]
];

const forbiddenRouteDirs = [
  "apps/www/src/app/proofs",
  "apps/www/src/app/knowledge-bank",
  "apps/www/src/app/proof-bank",
  "apps/www/src/app/archive-browser",
  "apps/www/src/app/work/source-backed-team-memory"
];

const forbiddenSitemapTerms = [
  "/work/fairrentnyc-commercial-rent-stabilization",
  "/work/fairrentnyc",
  "/work/nyc-artist-coalition-fair-rent",
  "/work/196-artists-residency",
  "/work/source-backed-team-memory",
  ".pdf",
  "proof-bank",
  "knowledge-bank",
  "archive-browser"
];

function file(filePath) {
  return path.join(root, filePath);
}

function read(filePath) {
  return fs.readFileSync(file(filePath), "utf8");
}

function fail(label, filePath, detail) {
  failures.push(`${label}${filePath ? `: ${filePath}` : ""}${detail ? ` (${detail})` : ""}`);
}

for (const filePath of [
  "apps/www/next.config.ts",
  "apps/www/src/app/sitemap.ts",
  "apps/www/src/data/work.ts"
]) {
  if (!fs.existsSync(file(filePath))) {
    fail("Missing route-governance file", filePath);
  }
}

const nextConfig = fs.existsSync(file("apps/www/next.config.ts"))
  ? read("apps/www/next.config.ts")
  : "";
const sitemap = fs.existsSync(file("apps/www/src/app/sitemap.ts"))
  ? read("apps/www/src/app/sitemap.ts")
  : "";
const workData = fs.existsSync(file("apps/www/src/data/work.ts"))
  ? read("apps/www/src/data/work.ts")
  : "";

for (const route of canonicalStaticRoutes) {
  if (!sitemap.includes(`"${route}"`)) {
    fail("Canonical static route missing from sitemap source", "apps/www/src/app/sitemap.ts", route);
  }
}

for (const slug of canonicalWorkSlugs) {
  if (!workData.includes(`slug: "${slug}"`)) {
    fail("Canonical work slug missing", "apps/www/src/data/work.ts", slug);
  }
}

for (const [source, destination] of redirects) {
  if (!nextConfig.includes(`source: "${source}"`) || !nextConfig.includes(`destination: "${destination}"`)) {
    fail("Canonical redirect missing", "apps/www/next.config.ts", `${source} -> ${destination}`);
  }
}

for (const dir of forbiddenRouteDirs) {
  if (fs.existsSync(file(dir))) {
    fail("Forbidden public route directory exists", dir);
  }
}

for (const term of forbiddenSitemapTerms) {
  if (sitemap.includes(term)) {
    fail("Sitemap source includes redirect/private/non-canonical path", "apps/www/src/app/sitemap.ts", term);
  }
}

if (!nextConfig.includes("X-Robots-Tag") || !nextConfig.includes("noindex, noarchive")) {
  fail("Resume PDF noindex/noarchive header missing", "apps/www/next.config.ts");
}

if (!nextConfig.includes('NEXT_PUBLIC_ROBOTS_POLICY === "index"')) {
  fail("Production indexing is not explicit opt-in", "apps/www/next.config.ts");
}

if (failures.length) {
  console.error("\nRoute-governance failures:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Route-governance check passed.");
