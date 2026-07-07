#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";

const baseUrl = process.argv[2];

if (baseUrl) {
  await checkHttpRoutes(baseUrl);
} else {
  checkSourceRoutes();
}

function checkSourceRoutes() {
  const nextConfig = readFileSync("apps/www/next.config.ts", "utf8");
  const sitemap = readFileSync("apps/www/src/app/sitemap.ts", "utf8");
  const workData = readFileSync("apps/www/src/data/work.ts", "utf8");
  const blockers = [];

  const canonicalRoutes = [
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
    "/colophon"
  ];
  const redirects = {
    "/work/fairrentnyc-commercial-rent-stabilization": "/work/fair-rent-nyc",
    "/work/fairrentnyc": "/work/fair-rent-nyc",
    "/work/nyc-artist-coalition-fair-rent": "/work/fair-rent-nyc",
    "/work/196-artists-residency": "/work/196-sunday-dinner",
    "/work/source-backed-team-memory": "/lab/source-backed-team-memory"
  };

  for (const route of canonicalRoutes.filter((route) => route.startsWith("/work/"))) {
    const slug = route.replace("/work/", "");
    if (slug !== "technical-operations" && !workData.includes(`slug: "${slug}"`)) {
      blockers.push(`missing work slug for ${route}`);
    }
  }

  for (const route of canonicalRoutes.filter((route) => !route.startsWith("/work/"))) {
    if (!sitemap.includes(`"${route}"`)) blockers.push(`sitemap is missing ${route}`);
  }

  for (const blockedRoute of [
    "/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf",
    "/knowledge-bank",
    "/proofs",
    "/claims",
    "/internal"
  ]) {
    if (sitemap.includes(blockedRoute)) {
      blockers.push(`sitemap must not include ${blockedRoute}`);
    }
  }

  for (const publicInternalRoute of [
    "apps/www/src/app/knowledge-bank",
    "apps/www/src/app/proofs",
    "apps/www/src/app/claims",
    "apps/www/src/app/internal"
  ]) {
    if (existsSync(publicInternalRoute)) {
      blockers.push(`${publicInternalRoute} must not exist as a public route`);
    }
  }

  for (const [source, destination] of Object.entries(redirects)) {
    if (!nextConfig.includes(`source: "${source}"`)) {
      blockers.push(`redirect source missing: ${source}`);
    }
    if (!nextConfig.includes(`destination: "${destination}"`)) {
      blockers.push(`redirect destination missing: ${destination}`);
    }
  }

  if (!nextConfig.includes('value: "www.jamieburk.art"')) {
    blockers.push("www host redirect is missing");
  }
  if (!nextConfig.includes('source: "/resume/:path*"') || !nextConfig.includes("X-Robots-Tag")) {
    blockers.push("resume PDF noindex header is missing");
  }

  finish(blockers, "Route source check passed.");
}

async function checkHttpRoutes(baseInput) {
  const base = new URL(baseInput.endsWith("/") ? baseInput : `${baseInput}/`);
  const blockers = [];
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
    ["/work/fairrentnyc", "/work/fair-rent-nyc"],
    ["/work/nyc-artist-coalition-fair-rent", "/work/fair-rent-nyc"],
    ["/work/196-artists-residency", "/work/196-sunday-dinner"],
    ["/work/source-backed-team-memory", "/lab/source-backed-team-memory"]
  ];

  const toUrl = (route) =>
    route === "/"
      ? new URL("/", base).toString()
      : new URL(route.replace(/^\//, ""), base).toString();

  for (const route of expectedRoutes) {
    try {
      const response = await fetch(toUrl(route), {
        redirect: "manual",
        signal: AbortSignal.timeout(15000)
      });
      const body = await response.text();

      if (response.status !== 200) {
        blockers.push(`${route} returned ${response.status}`);
        continue;
      }

      if (route === "/sitemap.xml") {
        if (!body.includes("<urlset")) blockers.push("/sitemap.xml is not sitemap XML");
        if (!body.includes("/lab/source-backed-team-memory")) {
          blockers.push("/sitemap.xml is missing lab route");
        }
        if (body.includes("Jamie-Burkart-Resume-Technical-Project-Manager.pdf")) {
          blockers.push("/sitemap.xml includes resume PDF");
        }
      }

      console.log(`${response.status} ${route}`);
    } catch (error) {
      blockers.push(`${route} failed: ${error.message}`);
    }
  }

  for (const [source, destination] of expectedRedirects) {
    try {
      const response = await fetch(toUrl(source), {
        redirect: "manual",
        signal: AbortSignal.timeout(15000)
      });
      const location = response.headers.get("location") ?? "";

      if (![301, 302, 307, 308].includes(response.status)) {
        blockers.push(`${source} returned ${response.status}, expected redirect`);
        continue;
      }

      if (!location.endsWith(destination)) {
        blockers.push(`${source} redirected to ${location || "(empty)"}, expected ${destination}`);
      }

      console.log(`${response.status} ${source} -> ${destination}`);
    } catch (error) {
      blockers.push(`${source} redirect failed: ${error.message}`);
    }
  }

  finish(blockers, `Route HTTP check passed for ${base.toString().replace(/\/$/, "")}.`);
}

function finish(blockers, success) {
  if (blockers.length) {
    console.error("Route check failed:");
    for (const blocker of blockers) console.error(`- ${blocker}`);
    process.exit(1);
  }

  console.log(success);
}
