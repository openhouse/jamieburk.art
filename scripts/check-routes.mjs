#!/usr/bin/env node

const expectedRoutes = [
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
  "/sitemap.xml",
  "/opengraph-image"
];

const expectedRedirects = [
  ["/work/source-backed-team-memory", "/lab/source-backed-team-memory"],
  ["/work/196-artists-residency", "/work/196-sunday-dinner"],
  ["/work/fair-rent-crs", "/work/fair-rent-nyc"],
  ["/work/fairrentnyc-commercial-rent-stabilization", "/work/fair-rent-nyc"]
];

const baseInput = process.argv[2] ?? "http://localhost:3000";
const baseUrl = new URL(baseInput.endsWith("/") ? baseInput : `${baseInput}/`);
const failures = [];

function toUrl(route) {
  return route === "/"
    ? new URL("/", baseUrl).toString()
    : new URL(route.replace(/^\//, ""), baseUrl).toString();
}

for (const route of expectedRoutes) {
  const response = await fetch(toUrl(route), {
    redirect: "manual",
    signal: AbortSignal.timeout(15000)
  }).catch((error) => {
    failures.push(`${route} failed: ${error.message}`);
    return undefined;
  });

  if (!response) continue;
  const body = await response.text();

  if (response.status !== 200) {
    failures.push(`${route} returned ${response.status}`);
    continue;
  }

  if (route === "/sitemap.xml") {
    if (!body.includes("<urlset")) failures.push("/sitemap.xml did not look like sitemap XML");
    for (const [source] of expectedRedirects) {
      if (body.includes(toUrl(source))) failures.push(`/sitemap.xml includes redirected URL ${source}`);
    }
  }

  if (route === "/robots.txt" && !/User-Agent|User-agent/i.test(body)) {
    failures.push("/robots.txt did not look like robots.txt");
  }

  console.log(`${response.status} ${route}`);
}

for (const [source, destination] of expectedRedirects) {
  const response = await fetch(toUrl(source), {
    redirect: "manual",
    signal: AbortSignal.timeout(15000)
  }).catch((error) => {
    failures.push(`${source} redirect failed: ${error.message}`);
    return undefined;
  });

  if (!response) continue;
  const location = response.headers.get("location") ?? "";

  if (![301, 302, 307, 308].includes(response.status)) {
    failures.push(`${source} returned ${response.status}, expected redirect`);
    continue;
  }

  if (!location.endsWith(destination)) {
    failures.push(`${source} redirected to ${location || "(empty)"}, expected ${destination}`);
    continue;
  }

  console.log(`${response.status} ${source} -> ${destination}`);
}

if (failures.length) {
  console.error("Route check failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Route check passed for ${baseUrl.toString().replace(/\/$/, "")}.`);
