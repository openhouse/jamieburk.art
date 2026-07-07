#!/usr/bin/env node

import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "..");
const errors = [];

function addError(message) {
  errors.push(message);
}

function source(file) {
  return readFileSync(path.join(repoRoot, file), "utf8");
}

const nextConfig = source("apps/www/next.config.ts");
const sitemap = source("apps/www/src/app/sitemap.ts");
const workData = source("apps/www/src/data/work.ts");
const technicalOperationsPage = source(
  "apps/www/src/app/work/technical-operations/page.tsx"
);
const labPage = source("apps/www/src/app/lab/source-backed-team-memory/page.tsx");

const expectedStaticRoutes = [
  "/",
  "/work",
  "/work/technical-operations",
  "/resume",
  "/about",
  "/contact",
  "/colophon",
  "/lab/source-backed-team-memory"
];

for (const route of expectedStaticRoutes) {
  if (!sitemap.includes(`"${route}"`)) {
    addError(`Sitemap static route is missing ${route}.`);
  }
}

const expectedSlugs = [
  "harry-j-epstein",
  "fair-rent-nyc",
  "callnyc",
  "wowlist",
  "196-sunday-dinner",
  "kc-town-hall"
];

for (const slug of expectedSlugs) {
  if (!workData.includes(`slug: "${slug}"`)) {
    addError(`Work data is missing slug ${slug}.`);
  }
}

const redirects = [
  ["/work/source-backed-team-memory", "/lab/source-backed-team-memory"],
  ["/work/196-artists-residency", "/work/196-sunday-dinner"],
  ["/work/fair-rent-crs", "/work/fair-rent-nyc"],
  ["/work/fairrentnyc-commercial-rent-stabilization", "/work/fair-rent-nyc"],
  ["/technical-operations", "/work/technical-operations"]
];

for (const [from, to] of redirects) {
  if (!nextConfig.includes(`source: "${from}"`)) {
    addError(`Missing redirect source ${from}.`);
  }
  if (!nextConfig.includes(`destination: "${to}"`)) {
    addError(`Missing redirect destination ${to}.`);
  }
}

for (const route of redirects.map(([from]) => from)) {
  if (sitemap.includes(`"${route}"`)) {
    addError(`Sitemap must not include redirected route ${route}.`);
  }
}

if (!technicalOperationsPage.includes("Technical Operations & Implementation")) {
  addError("Technical Operations page is not recognizable.");
}

if (!labPage.includes("Source-Backed Team Memory")) {
  addError("Source-Backed Team Memory lab page is not recognizable.");
}

const baseUrl =
  process.env.CHECK_ROUTES_BASE_URL?.replace(/\/$/, "") ??
  process.argv[2]?.replace(/\/$/, "");

if (baseUrl) {
  await checkHttpRoutes(baseUrl);
}

async function checkHttpRoutes(base) {
  const routes = [
    "/",
    "/work",
    "/work/technical-operations",
    "/resume",
    "/about",
    "/contact",
    "/colophon",
    "/lab/source-backed-team-memory",
    ...expectedSlugs.map((slug) => `/work/${slug}`)
  ];

  for (const route of routes) {
    const response = await fetch(`${base}${route}`, { redirect: "manual" });
    if (response.status !== 200) {
      addError(`${route} returned HTTP ${response.status}.`);
    }
  }

  for (const [from, to] of redirects) {
    const response = await fetch(`${base}${from}`, { redirect: "manual" });
    if (response.status < 300 || response.status >= 400) {
      addError(`${from} did not redirect. HTTP ${response.status}.`);
      continue;
    }

    const location = response.headers.get("location") ?? "";
    if (!location.endsWith(to)) {
      addError(`${from} redirected to ${location}, expected ${to}.`);
    }
  }
}

if (errors.length) {
  console.error("Route check failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(
  baseUrl
    ? `Route check passed against ${baseUrl}.`
    : "Static route check passed."
);

