#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();

const expectedAppFiles = [
  "apps/www/src/app/page.tsx",
  "apps/www/src/app/work/page.tsx",
  "apps/www/src/app/work/technical-operations/page.tsx",
  "apps/www/src/app/work/[slug]/page.tsx",
  "apps/www/src/app/lab/source-backed-team-memory/page.tsx",
  "apps/www/src/app/resume/page.tsx",
  "apps/www/src/app/about/page.tsx",
  "apps/www/src/app/contact/page.tsx",
  "apps/www/src/app/colophon/page.tsx",
  "apps/www/src/app/robots.ts",
  "apps/www/src/app/sitemap.ts",
  "apps/www/src/app/api/health/route.ts"
];

const expectedWorkSlugs = [
  "harry-j-epstein",
  "fair-rent-nyc",
  "callnyc",
  "wowlist",
  "196-sunday-dinner",
  "kc-town-hall"
];

const expectedRedirects = [
  ["/:path*", "https://jamieburk.art/:path*"],
  ["/fairrentnyc", "/work/fair-rent-nyc"],
  ["/fair-rent", "/work/fair-rent-nyc"],
  ["/commercial-rent-stabilization", "/work/fair-rent-nyc"],
  ["/work/fairrentnyc", "/work/fair-rent-nyc"],
  ["/work/fairrentnyc-commercial-rent-stabilization", "/work/fair-rent-nyc"],
  ["/196-artists-residency", "/work/196-sunday-dinner"],
  ["/sunday-dinner", "/work/196-sunday-dinner"],
  ["/work/196-artists-residency", "/work/196-sunday-dinner"],
  ["/source-backed-team-memory", "/lab/source-backed-team-memory"],
  ["/noting-us", "/lab/source-backed-team-memory"],
  ["/work/source-backed-team-memory", "/lab/source-backed-team-memory"]
];

const failures = [];

for (const relativePath of expectedAppFiles) {
  if (!existsSync(path.join(root, relativePath))) {
    failures.push(`Missing route file: ${relativePath}`);
  }
}

if (existsSync(path.join(root, "apps/www/src/app/proofs/page.tsx"))) {
  failures.push("Unexpected public /proofs page exists.");
}

const workData = readFileSync(path.join(root, "apps/www/src/data/work.ts"), "utf8");
for (const slug of expectedWorkSlugs) {
  if (!workData.includes(`slug: "${slug}"`)) {
    failures.push(`Missing work slug: ${slug}`);
  }
}

const nextConfig = readFileSync(path.join(root, "apps/www/next.config.ts"), "utf8");
for (const [source, destination] of expectedRedirects) {
  if (!nextConfig.includes(`source: "${source}"`) || !nextConfig.includes(`destination: "${destination}"`)) {
    failures.push(`Missing redirect: ${source} -> ${destination}`);
  }
}

const sitemapSource = readFileSync(path.join(root, "apps/www/src/app/sitemap.ts"), "utf8");
if (sitemapSource.includes('"/lab/source-backed-team-memory"')) {
  failures.push("Lab page is provisional and should not be listed in the sitemap.");
}

if (failures.length > 0) {
  console.error("Route check failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Route check passed.");
