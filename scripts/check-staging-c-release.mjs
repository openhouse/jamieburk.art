import { execFileSync } from "node:child_process";

import {
  STAGING_C_ORIGIN,
  STAGING_C_REQUIRED_ROUTES,
  evaluateStagingCRelease
} from "./lib/staging-c-release-eval.mjs";

function argumentValue(name) {
  const index = process.argv.indexOf(name);
  return index === -1 ? null : process.argv[index + 1] ?? null;
}

function git(...args) {
  return execFileSync("git", args, { encoding: "utf8" }).trim();
}

function responseHeaders(response) {
  return { "x-robots-tag": response.headers.get("x-robots-tag") ?? "" };
}

async function fetchWithTimeout(pathname) {
  return fetch(new URL(pathname, STAGING_C_ORIGIN), {
    redirect: "follow",
    signal: AbortSignal.timeout(20_000)
  });
}

async function observeRelease(expectedSha) {
  const remoteLine = git("ls-remote", "staging-c", "refs/heads/main");
  const remoteSha = remoteLine.split(/\s+/)[0] ?? "";

  const [healthResponse, homeResponse, robotsResponse, ...routeResponses] =
    await Promise.all([
      fetchWithTimeout("/api/health"),
      fetchWithTimeout("/"),
      fetchWithTimeout("/robots.txt"),
      ...STAGING_C_REQUIRED_ROUTES.map((route) => fetchWithTimeout(route))
    ]);

  let healthJson = null;
  try {
    healthJson = await healthResponse.json();
  } catch {
    healthJson = {};
  }

  return {
    baseUrl: STAGING_C_ORIGIN,
    expectedSha,
    remoteSha,
    health: {
      status: healthResponse.status,
      headers: responseHeaders(healthResponse),
      json: healthJson
    },
    home: {
      status: homeResponse.status,
      headers: responseHeaders(homeResponse)
    },
    robots: {
      status: robotsResponse.status,
      body: await robotsResponse.text()
    },
    routes: STAGING_C_REQUIRED_ROUTES.map((route, index) => ({
      route,
      status: routeResponses[index].status
    }))
  };
}

async function main() {
  const expectedSha = argumentValue("--expected-sha") ?? git("rev-parse", "HEAD");
  const observation = await observeRelease(expectedSha);
  const result = evaluateStagingCRelease(observation);
  console.log(JSON.stringify({ suite: "staging-c-release", ...result }, null, 2));
  if (!result.passed) process.exitCode = 1;
}

main().catch((error) => {
  console.error(
    JSON.stringify(
      {
        suite: "staging-c-release",
        passed: false,
        failures: [error instanceof Error ? error.message : String(error)]
      },
      null,
      2
    )
  );
  process.exitCode = 1;
});
