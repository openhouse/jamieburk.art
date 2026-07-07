import { readFileSync } from "node:fs";

const nextConfig = readFileSync("apps/www/next.config.ts", "utf8");
const sitemap = readFileSync("apps/www/src/app/sitemap.ts", "utf8");
const data = readFileSync("apps/www/src/data/work.ts", "utf8");
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
  "/resume",
  "/about",
  "/contact",
  "/colophon"
];

const redirects = {
  "/work/fairrentnyc-commercial-rent-stabilization": "/work/fair-rent-nyc",
  "/work/fairrentnyc": "/work/fair-rent-nyc",
  "/work/nyc-artist-coalition-fair-rent": "/work/fair-rent-nyc",
  "/work/source-backed-team-memory": "/lab/source-backed-team-memory",
  "/work/196-artists-residency": "/work/196-sunday-dinner"
};

for (const route of canonicalRoutes.filter((route) => route.startsWith("/work/"))) {
  const slug = route.replace("/work/", "");
  if (slug !== "technical-operations" && !data.includes(`slug: "${slug}"`)) {
    blockers.push(`missing work slug for ${route}`);
  }
}

for (const route of canonicalRoutes.filter((route) => !route.startsWith("/work/"))) {
  if (!sitemap.includes(`"${route}"`)) {
    blockers.push(`sitemap is missing ${route}`);
  }
}

if (sitemap.includes("/lab/source-backed-team-memory")) {
  blockers.push("lab route should not be included in the V1 sitemap");
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

if (blockers.length > 0) {
  console.error("Route check failed:");
  for (const blocker of blockers) console.error(`- ${blocker}`);
  process.exit(1);
}

console.log("Route check passed.");
