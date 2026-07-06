const baseArg = process.argv[2] ?? process.env.ROUTE_CHECK_BASE_URL ?? "http://localhost:3000";

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

const normalizeBaseUrl = (value) => {
  try {
    const url = new URL(value);
    return url.toString().replace(/\/$/, "");
  } catch {
    throw new Error(`Route check base URL must be absolute: ${value}`);
  }
};

const baseUrl = normalizeBaseUrl(baseArg);
const failures = [];

for (const route of routes) {
  const url = new URL(route, `${baseUrl}/`);

  try {
    const response = await fetch(url, { redirect: "manual" });
    const statusLine = `${response.status} ${response.statusText}`.trim();

    if (response.status !== 200) {
      failures.push(`${route} returned ${statusLine}`);
      console.error(`FAIL ${route} ${statusLine}`);
      continue;
    }

    if (route === "/sitemap.xml") {
      const body = await response.text();
      if (!body.includes("<urlset") && !body.includes("<sitemapindex")) {
        failures.push("/sitemap.xml returned 200 but did not look like sitemap XML");
        console.error("FAIL /sitemap.xml invalid XML shape");
        continue;
      }
    }

    if (route === "/api/health") {
      const body = await response.json();
      if (body?.ok !== true) {
        failures.push("/api/health returned 200 but ok was not true");
        console.error("FAIL /api/health ok was not true");
        continue;
      }
    }

    console.log(`OK   ${route} ${statusLine}`);
  } catch (error) {
    failures.push(`${route} request failed: ${error.message}`);
    console.error(`FAIL ${route} ${error.message}`);
  }
}

if (failures.length > 0) {
  console.error("");
  console.error(`Route check failed with ${failures.length} issue(s):`);
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("");
console.log(`Route check passed for ${baseUrl}.`);
