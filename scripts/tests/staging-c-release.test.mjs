import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import test from "node:test";
import path from "node:path";
import { pathToFileURL } from "node:url";

const modulePath = path.resolve(
  import.meta.dirname,
  "../lib/staging-c-release-eval.mjs"
);

const expectedSha = "1234567890abcdef1234567890abcdef12345678";
const requiredRoutes = [
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
];

function validObservation() {
  return {
    baseUrl: "https://staging-c.jamieburk.art",
    expectedSha,
    remoteSha: expectedSha,
    health: {
      status: 200,
      headers: { "x-robots-tag": "noindex, nofollow" },
      json: {
        ok: true,
        service: "jamie-portfolio",
        appEnv: "staging",
        siteUrl: "https://staging-c.jamieburk.art",
        isProduction: false,
        robotsIndexable: false
      }
    },
    home: {
      status: 200,
      headers: { "x-robots-tag": "noindex, nofollow" }
    },
    robots: {
      status: 200,
      body: "User-Agent: *\nDisallow: /\n"
    },
    routes: requiredRoutes.map((route) => ({ route, status: 200 }))
  };
}

async function loadEvaluator() {
  assert.equal(
    existsSync(modulePath),
    true,
    "the staging-C release evaluator must exist"
  );
  return import(pathToFileURL(modulePath));
}

test("an exact, healthy, noindex staging-C release passes", async () => {
  const { evaluateStagingCRelease } = await loadEvaluator();
  const result = evaluateStagingCRelease(validObservation());

  assert.equal(result.passed, true, result.failures.join("\n"));
  assert.equal(result.summary.routesPassing, 14);
  assert.equal(result.summary.routesRequired, 14);
});

test("a remote revision other than the intended commit fails", async () => {
  const { evaluateStagingCRelease } = await loadEvaluator();
  const observation = validObservation();
  observation.remoteSha = "abcdef1234567890abcdef1234567890abcdef12";

  const result = evaluateStagingCRelease(observation);

  assert.equal(result.passed, false);
  assert.match(result.failures.join("\n"), /remote revision does not equal expected revision/);
});

test("an indexable staging surface fails", async () => {
  const { evaluateStagingCRelease } = await loadEvaluator();
  const observation = validObservation();
  observation.home.headers["x-robots-tag"] = "index, follow";
  observation.health.json.robotsIndexable = true;
  observation.robots.body = "User-Agent: *\nAllow: /\n";

  const result = evaluateStagingCRelease(observation);

  assert.equal(result.passed, false);
  assert.match(result.failures.join("\n"), /home response must send noindex, nofollow/);
  assert.match(result.failures.join("\n"), /health must report robotsIndexable false/);
  assert.match(result.failures.join("\n"), /robots.txt must disallow the entire site/);
});

test("a missing or unsuccessful hiring-reader route fails", async () => {
  const { evaluateStagingCRelease } = await loadEvaluator();
  const observation = validObservation();
  observation.routes = observation.routes
    .filter(({ route }) => route !== "/work/wowlist")
    .map((entry) =>
      entry.route === "/lab/source-backed-team-memory"
        ? { ...entry, status: 500 }
        : entry
    );

  const result = evaluateStagingCRelease(observation);

  assert.equal(result.passed, false);
  assert.match(result.failures.join("\n"), /missing required route \/work\/wowlist/);
  assert.match(
    result.failures.join("\n"),
    /route \/lab\/source-backed-team-memory returned 500/
  );
});

test("a production or malformed health response fails", async () => {
  const { evaluateStagingCRelease } = await loadEvaluator();
  const observation = validObservation();
  observation.health.json.appEnv = "production";
  observation.health.json.isProduction = true;
  observation.health.json.siteUrl = "https://jamieburk.art";

  const result = evaluateStagingCRelease(observation);

  assert.equal(result.passed, false);
  assert.match(result.failures.join("\n"), /health must report appEnv staging/);
  assert.match(result.failures.join("\n"), /health must report isProduction false/);
  assert.match(result.failures.join("\n"), /health siteUrl must equal the staging-C origin/);
});
