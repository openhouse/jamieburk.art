export const STAGING_C_ORIGIN = "https://staging-c.jamieburk.art";

export const STAGING_C_REQUIRED_ROUTES = Object.freeze([
  "/",
  "/work",
  "/work/technical-operations",
  "/resume",
  "/about",
  "/contact",
  "/colophon",
  "/lab/source-backed-team-memory",
  "/work/harry-j-epstein",
  "/work/fair-rent-nyc",
  "/work/callnyc",
  "/work/wowlist",
  "/work/196-sunday-dinner",
  "/work/kc-town-hall"
]);

const fullShaPattern = /^[0-9a-f]{40}$/i;

function hasNoindexNofollow(headers = {}) {
  const value = String(headers["x-robots-tag"] ?? "").toLowerCase();
  return value.includes("noindex") && value.includes("nofollow");
}

export function evaluateStagingCRelease(observation) {
  const failures = [];
  const checks = [];
  const check = (passed, message) => {
    checks.push({ passed, message });
    if (!passed) failures.push(message);
  };

  check(
    observation?.baseUrl === STAGING_C_ORIGIN,
    "release origin must be the canonical staging-C origin"
  );
  check(
    fullShaPattern.test(observation?.expectedSha ?? ""),
    "expected revision must be a full Git SHA"
  );
  check(
    fullShaPattern.test(observation?.remoteSha ?? ""),
    "remote revision must be a full Git SHA"
  );
  check(
    observation?.remoteSha === observation?.expectedSha,
    "remote revision does not equal expected revision"
  );

  const health = observation?.health ?? {};
  const healthJson = health.json ?? {};
  check(health.status === 200, "health route must return 200");
  check(healthJson.ok === true, "health must report ok true");
  check(healthJson.service === "jamie-portfolio", "health must identify jamie-portfolio");
  check(healthJson.appEnv === "staging", "health must report appEnv staging");
  check(healthJson.siteUrl === STAGING_C_ORIGIN, "health siteUrl must equal the staging-C origin");
  check(healthJson.isProduction === false, "health must report isProduction false");
  check(healthJson.robotsIndexable === false, "health must report robotsIndexable false");
  check(
    hasNoindexNofollow(health.headers),
    "health response must send noindex, nofollow"
  );

  const home = observation?.home ?? {};
  check(home.status === 200, "home route must return 200");
  check(
    hasNoindexNofollow(home.headers),
    "home response must send noindex, nofollow"
  );

  const robots = observation?.robots ?? {};
  check(robots.status === 200, "robots.txt must return 200");
  check(
    /^\s*Disallow:\s*\/\s*$/im.test(robots.body ?? ""),
    "robots.txt must disallow the entire site"
  );

  const observedRoutes = new Map(
    (observation?.routes ?? []).map((entry) => [entry.route, entry])
  );
  let routesPassing = 0;
  for (const route of STAGING_C_REQUIRED_ROUTES) {
    const entry = observedRoutes.get(route);
    if (!entry) {
      failures.push(`missing required route ${route}`);
      checks.push({ passed: false, message: `missing required route ${route}` });
      continue;
    }
    const passed = entry.status === 200;
    checks.push({ passed, message: `route ${route} returned ${entry.status}` });
    if (passed) routesPassing += 1;
    else failures.push(`route ${route} returned ${entry.status}`);
  }

  return {
    passed: failures.length === 0,
    failures,
    checks,
    summary: {
      expectedSha: observation?.expectedSha ?? null,
      remoteSha: observation?.remoteSha ?? null,
      routesPassing,
      routesRequired: STAGING_C_REQUIRED_ROUTES.length,
      noindex: hasNoindexNofollow(home.headers),
      environment: healthJson.appEnv ?? null
    }
  };
}
