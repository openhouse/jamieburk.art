#!/usr/bin/env node

import { execFileSync, spawnSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import path from "node:path";
import { parseArgs } from "node:util";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const { values } = parseArgs({ options: { output: { type: "string" } } });
const revision = execFileSync("git", ["rev-parse", "HEAD"], { cwd: repoRoot, encoding: "utf8" }).trim();
const tree = execFileSync("git", ["show", "-s", "--format=%T", "HEAD"], { cwd: repoRoot, encoding: "utf8" }).trim();
const image = `jamieburk-art:verify-${revision.slice(0, 12)}`;
let containerId = "";

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: repoRoot,
    encoding: "utf8",
    stdio: options.inherit ? "inherit" : "pipe"
  });
  if (result.status !== 0) {
    throw new Error(`${command} ${args.join(" ")} failed: ${(result.stderr ?? "").trim()}`);
  }
  return (result.stdout ?? "").trim();
}

async function waitFor(baseUrl) {
  let lastError;
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const response = await fetch(`${baseUrl}/api/health`, { signal: AbortSignal.timeout(3000) });
      if (response.ok) return response;
    } catch (error) {
      lastError = error;
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw lastError ?? new Error("Docker runtime did not become healthy.");
}

try {
  run("docker", [
    "build",
    "--build-arg", "APP_ENV=staging",
    "--build-arg", "SITE_ENV=staging",
    "--build-arg", "NEXT_PUBLIC_DEPLOY_ENV=staging",
    "--build-arg", "SITE_URL=https://staging.jamieburk.art",
    "--build-arg", "NEXT_PUBLIC_SITE_URL=https://staging.jamieburk.art",
    "--build-arg", "NEXT_PUBLIC_ROBOTS_POLICY=noindex",
    "-t", image,
    "."
  ], { inherit: true });

  containerId = run("docker", [
    "run", "-d", "-P",
    "-e", "APP_ENV=staging",
    "-e", "SITE_ENV=staging",
    "-e", "NEXT_PUBLIC_DEPLOY_ENV=staging",
    "-e", "SITE_URL=https://staging.jamieburk.art",
    "-e", "NEXT_PUBLIC_SITE_URL=https://staging.jamieburk.art",
    "-e", "NEXT_PUBLIC_ROBOTS_POLICY=noindex",
    image
  ]);

  const portOutput = run("docker", ["port", containerId, "3000/tcp"]);
  const port = portOutput.match(/:(\d+)/)?.[1];
  if (!port) throw new Error(`Unable to resolve the published container port: ${portOutput}`);
  const baseUrl = `http://127.0.0.1:${port}`;
  const healthResponse = await waitFor(baseUrl);
  const health = await healthResponse.json();
  const robotsResponse = await fetch(`${baseUrl}/robots.txt`);
  const robots = await robotsResponse.text();
  const routes = {};
  for (const route of ["/", "/resume", "/work/callnyc"]) {
    const response = await fetch(`${baseUrl}${route}`);
    routes[route] = response.status;
  }

  const checks = {
    health: healthResponse.status === 200 && health.ok === true,
    stagingEnvironment: health.appEnv === "staging" && health.isProduction === false,
    noindexHealth: health.robotsIndexable === false,
    robots: robotsResponse.status === 200 && /Disallow:\s*\//.test(robots),
    xRobotsTag: healthResponse.headers.get("x-robots-tag") === "noindex, nofollow",
    routes: Object.values(routes).every((status) => status === 200)
  };
  const report = {
    schemaVersion: 1,
    evaluatedAt: new Date().toISOString(),
    revision,
    tree,
    image,
    imageId: run("docker", ["image", "inspect", "--format", "{{.Id}}", image]),
    runtime: { baseUrl, health, routes, robotsPolicy: robots.trim(), xRobotsTag: healthResponse.headers.get("x-robots-tag") },
    checks,
    passed: Object.values(checks).every(Boolean)
  };
  if (values.output) writeFileSync(path.resolve(repoRoot, values.output), `${JSON.stringify(report, null, 2)}\n`);
  console.log(JSON.stringify(report, null, 2));
  if (!report.passed) process.exitCode = 1;
} finally {
  if (containerId) spawnSync("docker", ["stop", containerId], { cwd: repoRoot, stdio: "ignore" });
}
