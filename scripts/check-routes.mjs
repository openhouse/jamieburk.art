#!/usr/bin/env node
const routes = [
  "/",
  "/work",
  "/work/technical-operations",
  "/work/harry-j-epstein",
  "/work/fair-rent-nyc",
  "/work/callnyc",
  "/work/wowlist",
  "/work/196-sunday-dinner",
  "/work/kc-town-hall",
  "/lab/source-backed-team-memory",
  "/resume",
  "/about",
  "/contact",
  "/colophon",
  "/api/health",
  "/robots.txt",
  "/sitemap.xml"
];

const stripTrailingSlash = (value) => value.replace(/\/+$/, "");

const baseUrl = stripTrailingSlash(
  process.argv[2] ??
    process.env.ROUTE_CHECK_BASE_URL ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.SITE_URL ??
    "http://localhost:3000"
);

try {
  new URL(baseUrl);
} catch {
  console.error(`Route check base URL is invalid: ${baseUrl}`);
  process.exit(1);
}

const failures = [];

console.log(`Checking ${routes.length} routes against ${baseUrl}`);

for (const route of routes) {
  const url = new URL(route, baseUrl);

  try {
    const response = await fetch(url, {
      headers: { "User-Agent": "jamieburk-route-check/1.0" },
      redirect: "manual",
      signal: AbortSignal.timeout(10_000)
    });

    if (response.status === 200) {
      console.log(`[ok] ${response.status} ${route}`);
    } else {
      failures.push(`${route} returned ${response.status}`);
      console.error(`[fail] ${response.status} ${route}`);
    }
  } catch (error) {
    failures.push(`${route} request failed: ${error.message}`);
    console.error(`[fail] ${route} request failed: ${error.message}`);
  }
}

if (failures.length > 0) {
  console.error("Route check failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("Route check passed.");
