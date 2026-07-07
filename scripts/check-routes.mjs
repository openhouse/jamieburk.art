#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const canonicalRoutes = [
  ["/", "apps/www/src/app/page.tsx"],
  ["/work", "apps/www/src/app/work/page.tsx"],
  ["/work/technical-operations", "apps/www/src/app/work/technical-operations/page.tsx"],
  ["/work/harry-j-epstein", "apps/www/src/content/work/harry-j-epstein.mdx"],
  ["/work/fair-rent-nyc", "apps/www/src/content/work/fair-rent-nyc.mdx"],
  ["/work/callnyc", "apps/www/src/content/work/callnyc.mdx"],
  ["/resume", "apps/www/src/app/resume/page.tsx"],
  ["/about", "apps/www/src/app/about/page.tsx"],
  ["/contact", "apps/www/src/app/contact/page.tsx"],
  ["/colophon", "apps/www/src/app/colophon/page.tsx"],
  ["/lab/source-backed-team-memory", "apps/www/src/app/lab/source-backed-team-memory/page.tsx"]
];

const redirects = [
  ["/work/source-backed-team-memory", "/lab/source-backed-team-memory"],
  ["/work/noting-us", "/lab/source-backed-team-memory"],
  ["/work/fairrentnyc", "/work/fair-rent-nyc"],
  ["/work/fair-rent", "/work/fair-rent-nyc"],
  ["/work/commercial-rent-stabilization", "/work/fair-rent-nyc"],
  ["/work/196-artists-residency", "/work/196-sunday-dinner"],
  ["/work/sunday-dinner", "/work/196-sunday-dinner"]
];

const failures = [];

for (const [route, file] of canonicalRoutes) {
  if (!existsSync(path.join(repoRoot, file))) {
    failures.push(`${route} is missing backing file ${file}`);
  }
}

const nextConfigPath = path.join(repoRoot, "apps/www/next.config.ts");
const nextConfig = existsSync(nextConfigPath)
  ? readFileSync(nextConfigPath, "utf8")
  : "";

if (!nextConfig.includes("www.jamieburk.art")) {
  failures.push("www.jamieburk.art canonical-host redirect is missing");
}

if (!nextConfig.includes('source: "/resume/:path*"')) {
  failures.push("resume PDF noindex header route is missing");
}

for (const [source, destination] of redirects) {
  if (!nextConfig.includes(`source: "${source}"`)) {
    failures.push(`redirect source missing: ${source}`);
  }

  if (!nextConfig.includes(`destination: "${destination}"`)) {
    failures.push(`redirect destination missing for ${source}: ${destination}`);
  }
}

const sitemapPath = path.join(repoRoot, "apps/www/src/app/sitemap.ts");
const sitemap = existsSync(sitemapPath) ? readFileSync(sitemapPath, "utf8") : "";

if (sitemap.includes('"/lab/source-backed-team-memory"')) {
  failures.push("/lab/source-backed-team-memory should not be in sitemap for V1");
}

if (sitemap.includes("Jamie-Burkart-Resume-Technical-Project-Manager.pdf")) {
  failures.push("resume PDF should not be included in sitemap");
}

if (failures.length) {
  console.error("Route hygiene check failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Route hygiene check passed.");
