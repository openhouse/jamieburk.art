const baseUrl = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");

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
  "/sitemap.xml",
  "/opengraph-image"
];

const redirects = [
  ["/work/source-backed-team-memory", "/lab/source-backed-team-memory"],
  ["/work/196-artists-residency", "/work/196-sunday-dinner"],
  ["/work/fair-rent-crs", "/work/fair-rent-nyc"],
  ["/work/fairrentnyc-commercial-rent-stabilization", "/work/fair-rent-nyc"]
];

const failures = [];

async function checkRoute(route) {
  const response = await fetch(`${baseUrl}${route}`, { redirect: "manual" });
  if (response.status !== 200) {
    failures.push(`${route} expected 200, got ${response.status}`);
  }
}

async function checkRedirect([source, destination]) {
  const response = await fetch(`${baseUrl}${source}`, { redirect: "manual" });
  if (![307, 308].includes(response.status)) {
    failures.push(`${source} expected redirect, got ${response.status}`);
    return;
  }

  const location = response.headers.get("location") ?? "";
  if (!location.endsWith(destination)) {
    failures.push(`${source} expected redirect to ${destination}, got ${location}`);
  }
}

for (const route of routes) {
  await checkRoute(route);
}

for (const redirect of redirects) {
  await checkRedirect(redirect);
}

if (failures.length) {
  console.error(`Route check failed for ${baseUrl}:`);
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`Route check passed for ${baseUrl}.`);
