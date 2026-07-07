#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

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
  "/robots.txt",
  "/sitemap.xml",
  "/api/health"
];

const expectedRedirects = [
  ["/work/fairrentnyc-commercial-rent-stabilization", "/work/fair-rent-nyc"],
  ["/work/source-backed-team-memory", "/lab/source-backed-team-memory"],
  ["/source-backed-team-memory", "/lab/source-backed-team-memory"],
  ["/noting-us", "/lab/source-backed-team-memory"],
  ["/work/196-artists-residency", "/work/196-sunday-dinner"],
  ["/196-artists-residency", "/work/196-sunday-dinner"],
  ["/sunday-dinner", "/work/196-sunday-dinner"],
  ["/technical-operations", "/work/technical-operations"]
];

const unexpectedPublicRoutes = ["/proofs"];

const routeFiles = new Map([
  ["/", "apps/www/src/app/page.tsx"],
  ["/work", "apps/www/src/app/work/page.tsx"],
  ["/work/technical-operations", "apps/www/src/app/work/technical-operations/page.tsx"],
  ["/work/harry-j-epstein", "apps/www/src/content/work/harry-j-epstein.mdx"],
  ["/work/fair-rent-nyc", "apps/www/src/content/work/fair-rent-nyc.mdx"],
  ["/work/callnyc", "apps/www/src/content/work/callnyc.mdx"],
  ["/work/wowlist", "apps/www/src/content/work/wowlist.mdx"],
  ["/work/196-sunday-dinner", "apps/www/src/content/work/196-sunday-dinner.mdx"],
  ["/work/kc-town-hall", "apps/www/src/content/work/kc-town-hall.mdx"],
  ["/lab/source-backed-team-memory", "apps/www/src/app/lab/source-backed-team-memory/page.tsx"],
  ["/resume", "apps/www/src/app/resume/page.tsx"],
  ["/about", "apps/www/src/app/about/page.tsx"],
  ["/contact", "apps/www/src/app/contact/page.tsx"],
  ["/colophon", "apps/www/src/app/colophon/page.tsx"],
  ["/api/health", "apps/www/src/app/api/health/route.ts"]
]);

const failures = [];
const baseInput = process.argv[2] ?? process.env.CHECK_ROUTES_BASE_URL ?? "";

function repoPath(relativePath) {
  return path.join(repoRoot, relativePath);
}

function read(relativePath) {
  return readFileSync(repoPath(relativePath), "utf8");
}

function fail(message) {
  failures.push(message);
}

for (const [route, file] of routeFiles) {
  if (!existsSync(repoPath(file))) {
    fail(`${route} is missing expected file ${file}`);
  }
}

if (existsSync(repoPath("apps/www/src/app/proofs"))) {
  fail("Unexpected public /proofs route directory exists");
}

const nextConfig = read("apps/www/next.config.ts");
for (const [source, destination] of expectedRedirects) {
  if (!nextConfig.includes(`source: "${source}"`) || !nextConfig.includes(`destination: "${destination}"`)) {
    fail(`Missing redirect ${source} -> ${destination}`);
  }
}

const sitemapSource = read("apps/www/src/app/sitemap.ts");
for (const blocked of [
  "/lab/source-backed-team-memory",
  "/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf",
  "/api/health",
  "/work/source-backed-team-memory",
  "/source-backed-team-memory",
  "/noting-us"
]) {
  if (sitemapSource.includes(blocked)) {
    fail(`Sitemap source includes non-canonical or non-indexed path ${blocked}`);
  }
}

function toUrl(route, baseUrl) {
  return route === "/"
    ? new URL("/", baseUrl).toString()
    : new URL(route.replace(/^\//, ""), baseUrl).toString();
}

async function runLiveChecks() {
  if (!baseInput) {
    console.log("Static route check passed. Provide CHECK_ROUTES_BASE_URL or an argument for live checks.");
    return;
  }

  const baseUrl = new URL(baseInput.endsWith("/") ? baseInput : `${baseInput}/`);

  for (const route of expectedRoutes) {
    const url = toUrl(route, baseUrl);

    try {
      const response = await fetch(url, {
        redirect: "manual",
        signal: AbortSignal.timeout(15000)
      });
      const body = await response.text();

      if (response.status !== 200) {
        fail(`${route} returned ${response.status}`);
        continue;
      }

      if (route === "/sitemap.xml") {
        if (!body.includes("<urlset")) {
          fail("/sitemap.xml did not look like a sitemap XML document");
        }
        for (const [source] of expectedRedirects) {
          if (body.includes(toUrl(source, baseUrl))) {
            fail(`/sitemap.xml includes redirected URL ${source}`);
          }
        }
        if (body.includes(toUrl("/api/health", baseUrl))) {
          fail("/sitemap.xml includes /api/health");
        }
        if (body.includes(toUrl("/lab/source-backed-team-memory", baseUrl))) {
          fail("/sitemap.xml includes /lab/source-backed-team-memory");
        }
        if (body.includes(toUrl("/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf", baseUrl))) {
          fail("/sitemap.xml includes the resume PDF");
        }
      }

      if (route === "/robots.txt" && !/User-Agent|User-agent/i.test(body)) {
        fail("/robots.txt did not look like a robots document");
      }

      console.log(`${response.status} ${route}`);
    } catch (error) {
      fail(`${route} failed: ${error.message}`);
    }
  }

  for (const [source, destination] of expectedRedirects) {
    try {
      const response = await fetch(toUrl(source, baseUrl), {
        redirect: "manual",
        signal: AbortSignal.timeout(15000)
      });
      const location = response.headers.get("location") ?? "";

      if (![301, 302, 307, 308].includes(response.status)) {
        fail(`${source} returned ${response.status}, expected redirect`);
        continue;
      }

      if (!location.endsWith(destination)) {
        fail(`${source} redirected to ${location || "(empty)"}, expected ${destination}`);
        continue;
      }

      console.log(`${response.status} ${source} -> ${destination}`);
    } catch (error) {
      fail(`${source} redirect failed: ${error.message}`);
    }
  }

  for (const route of unexpectedPublicRoutes) {
    try {
      const response = await fetch(toUrl(route, baseUrl), {
        redirect: "manual",
        signal: AbortSignal.timeout(15000)
      });

      if (response.status !== 404) {
        fail(`${route} returned ${response.status}, expected 404`);
        continue;
      }

      console.log(`${response.status} ${route}`);
    } catch (error) {
      fail(`${route} failed: ${error.message}`);
    }
  }

  console.log(`Live route check completed for ${baseUrl.toString().replace(/\/$/, "")}.`);
}

await runLiveChecks();

if (failures.length) {
  console.error("Route check failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Route check passed.");
