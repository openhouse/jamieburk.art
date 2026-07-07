#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const blockers = [];

function addBlocker(message) {
  blockers.push(message);
}

function readRepoFile(file) {
  return readFileSync(path.join(repoRoot, file), "utf8");
}

const nextConfig = readRepoFile("apps/www/next.config.ts");
const sitemap = readRepoFile("apps/www/src/app/sitemap.ts");
const workData = readRepoFile("apps/www/src/data/work.ts");

const staticRouteFiles = {
  "/": "apps/www/src/app/page.tsx",
  "/work": "apps/www/src/app/work/page.tsx",
  "/work/technical-operations": "apps/www/src/app/work/technical-operations/page.tsx",
  "/lab/source-backed-team-memory": "apps/www/src/app/lab/source-backed-team-memory/page.tsx",
  "/resume": "apps/www/src/app/resume/page.tsx",
  "/about": "apps/www/src/app/about/page.tsx",
  "/contact": "apps/www/src/app/contact/page.tsx",
  "/colophon": "apps/www/src/app/colophon/page.tsx",
  "/api/health": "apps/www/src/app/api/health/route.ts",
  "/robots.txt": "apps/www/src/app/robots.ts",
  "/sitemap.xml": "apps/www/src/app/sitemap.ts",
  "/opengraph-image": "apps/www/src/app/opengraph-image.tsx"
};

const workRoutes = [
  "/work/harry-j-epstein",
  "/work/fair-rent-nyc",
  "/work/callnyc",
  "/work/wowlist",
  "/work/196-sunday-dinner",
  "/work/kc-town-hall"
];

const redirects = {
  "/work/fairrentnyc-commercial-rent-stabilization": "/work/fair-rent-nyc",
  "/work/fairrentnyc": "/work/fair-rent-nyc",
  "/work/nyc-artist-coalition-fair-rent": "/work/fair-rent-nyc",
  "/work/fair-rent-crs": "/work/fair-rent-nyc",
  "/work/source-backed-team-memory": "/lab/source-backed-team-memory",
  "/work/196-artists-residency": "/work/196-sunday-dinner"
};

for (const [route, file] of Object.entries(staticRouteFiles)) {
  if (!existsSync(path.join(repoRoot, file))) {
    addBlocker(`Canonical route ${route} is missing backing file ${file}`);
  }
}

for (const route of workRoutes) {
  const slug = route.replace("/work/", "");
  if (!workData.includes(`slug: "${slug}"`)) {
    addBlocker(`Canonical work route ${route} is missing from work data`);
  }
  if (!existsSync(path.join(repoRoot, `apps/www/src/content/work/${slug}.mdx`))) {
    addBlocker(`Canonical work route ${route} is missing its MDX file`);
  }
}

for (const [source, destination] of Object.entries(redirects)) {
  if (!nextConfig.includes(`source: "${source}"`)) {
    addBlocker(`Redirect source is missing: ${source}`);
  }
  if (!nextConfig.includes(`destination: "${destination}"`)) {
    addBlocker(`Redirect destination is missing for ${source}: ${destination}`);
  }
}

if (!nextConfig.includes('value: "www.jamieburk.art"')) {
  addBlocker("www.jamieburk.art host redirect is missing");
}

if (!nextConfig.includes('source: "/resume/:path*"')) {
  addBlocker("Resume PDF noindex header route is missing");
}

if (sitemap.includes("/lab/source-backed-team-memory")) {
  addBlocker("Lab route is accessible but should not be included in the V1 sitemap by default");
}

if (/Jamie-Burkart-Resume-Technical-Project-Manager\.pdf/.test(sitemap)) {
  addBlocker("Resume PDF must not appear in the sitemap");
}

for (const publicRoute of ["proofs", "knowledge-bank", "claims"]) {
  if (existsSync(path.join(repoRoot, `apps/www/src/app/${publicRoute}`))) {
    addBlocker(`Public /${publicRoute} route exists; the knowledge bank should stay in repo docs`);
  }
}

if (blockers.length) {
  console.error("Route check failed:");
  for (const blocker of blockers) console.error(`- ${blocker}`);
  process.exit(1);
}

console.log("Route check passed.");
