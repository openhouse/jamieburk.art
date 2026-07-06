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

const baseInput = process.argv[2] ?? "http://localhost:3000";
const baseUrl = new URL(baseInput.endsWith("/") ? baseInput : `${baseInput}/`);
const failures = [];

const toUrl = (route) =>
  route === "/"
    ? new URL("/", baseUrl).toString()
    : new URL(route.replace(/^\//, ""), baseUrl).toString();

for (const route of routes) {
  const url = toUrl(route);

  try {
    const response = await fetch(url, {
      redirect: "manual",
      signal: AbortSignal.timeout(15000)
    });
    const body = await response.text();

    if (response.status !== 200) {
      failures.push(`${route} returned ${response.status}`);
      continue;
    }

    if (route === "/sitemap.xml" && !body.includes("<urlset")) {
      failures.push("/sitemap.xml did not look like a sitemap XML document");
      continue;
    }

    console.log(`${response.status} ${route}`);
  } catch (error) {
    failures.push(`${route} failed: ${error.message}`);
  }
}

if (failures.length) {
  console.error("Route check failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`Route check passed for ${baseUrl.toString().replace(/\/$/, "")}.`);
