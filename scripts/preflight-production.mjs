#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];
const productionUrl = "https://jamieburk.art";

const envValue = (name) => process.env[name]?.trim();
const stripTrailingSlash = (value) => value.replace(/\/$/, "");

function addError(message) {
  errors.push(message);
}

if (envValue("APP_ENV") !== "production") {
  addError("APP_ENV must be production.");
}

for (const name of ["SITE_ENV", "NEXT_PUBLIC_DEPLOY_ENV"]) {
  const value = envValue(name);
  if (value && value !== "production") {
    addError(`${name} must be production when set.`);
  }
}

if (envValue("NEXT_PUBLIC_ROBOTS_POLICY") !== "index") {
  addError("NEXT_PUBLIC_ROBOTS_POLICY must be exactly index.");
}

for (const name of ["SITE_URL", "NEXT_PUBLIC_SITE_URL"]) {
  const value = envValue(name);
  if (!value) {
    addError(`${name} is required.`);
  } else if (stripTrailingSlash(value) !== productionUrl) {
    addError(`${name} must be ${productionUrl}.`);
  }
}

const siteConfigPath = path.join(repoRoot, "apps/www/src/data/site.ts");
const siteConfig = readFileSync(siteConfigPath, "utf8");

if (/Public email pending confirmation|TODO:\s*Jamie approval required/i.test(siteConfig)) {
  addError("Approved public contact path is missing from site config.");
}

if (!/mailto:[^"']+@[^"']+\.[^"']+/.test(siteConfig)) {
  addError("At least one approved public mailto contact path is required.");
}

const resumePath = path.join(
  repoRoot,
  "apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf"
);

if (!existsSync(resumePath)) {
  addError("Resume PDF is missing.");
} else {
  const bytes = readFileSync(resumePath);
  const searchable = `${bytes.toString("utf8")}\n${bytes.toString("latin1")}`;
  if (
    /Placeholder resume PDF/i.test(searchable) ||
    /Replace with approved current resume/i.test(searchable)
  ) {
    addError("Resume PDF still contains placeholder text.");
  }
}

try {
  execFileSync(process.execPath, ["scripts/check-public-safety.mjs", "--production"], {
    cwd: repoRoot,
    env: { ...process.env, APP_ENV: "production" },
    stdio: "pipe"
  });
} catch (error) {
  const output = `${error.stdout?.toString() ?? ""}${error.stderr?.toString() ?? ""}`.trim();
  addError(output || "Production public-safety scan failed.");
}

if (errors.length) {
  console.error("Production preflight failed:");
  for (const error of errors) {
    for (const line of error.split("\n")) {
      console.error(`- ${line}`);
    }
  }
  process.exit(1);
}

console.log("Production preflight passed.");
