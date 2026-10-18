import { execFileSync, spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const remote = "dokku@staging.jamieburk.art:jamieburkart-staging-c";
const settings = Object.freeze({
  APP_ENV: "staging",
  SITE_ENV: "staging",
  NEXT_PUBLIC_DEPLOY_ENV: "staging",
  SITE_URL: "https://staging-c.jamieburk.art",
  NEXT_PUBLIC_SITE_URL: "https://staging-c.jamieburk.art",
  NEXT_PUBLIC_ROBOTS_POLICY: "noindex"
});

export function cStagingRemote(cwd) {
  const destinations = execFileSync("git", ["remote", "get-url", "--push", "--all", "staging-c"], { cwd, encoding: "utf8" }).trim().split(/\r?\n/);
  if (destinations.length !== 1 || destinations[0] !== remote) {
    throw new Error("C staging requires exactly one approved push destination");
  }
  return destinations[0];
}

export function cStagingEnvironment(remoteUrl, environment = {}) {
  if (remoteUrl !== remote) throw new Error("C staging remote is missing or targets another application");
  for (const [key, value] of Object.entries(settings)) {
    if (environment[key] !== undefined && environment[key] !== value) {
      throw new Error(`${key} conflicts with the C staging target`);
    }
  }
  return { ...environment, ...settings };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const cwd = fileURLToPath(new URL("..", import.meta.url));
    const remoteUrl = cStagingRemote(cwd);
    const env = cStagingEnvironment(remoteUrl, process.env);
    if (process.argv.includes("--describe")) {
      console.log(JSON.stringify({ remoteUrl, settings }, null, 2));
    } else {
      const result = spawnSync("npm", ["run", "check"], { cwd, env, stdio: "inherit" });
      if (result.error) throw result.error;
      process.exitCode = result.status ?? 1;
    }
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
