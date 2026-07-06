#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "..");
const productionUrl = "https://jamieburk.art";
const errors = [];

const envValue = (name) => process.env[name]?.trim();
const stripTrailingSlash = (value) => value.replace(/\/$/, "");

const addError = (message) => {
  errors.push(message);
};

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const isValidPublicUrl = (value) => {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
};

const trackedFiles = () => {
  try {
    return execFileSync("git", ["ls-files"], {
      cwd: repoRoot,
      encoding: "utf8"
    })
      .split("\n")
      .filter(Boolean);
  } catch {
    const ignoredDirectories = new Set([".git", ".next", "node_modules"]);
    const files = [];

    const walk = (directory) => {
      for (const entry of readdirSync(directory)) {
        if (ignoredDirectories.has(entry)) continue;

        const fullPath = path.join(directory, entry);
        const relativePath = path.relative(repoRoot, fullPath);
        const stat = statSync(fullPath);

        if (stat.isDirectory()) {
          walk(fullPath);
        } else {
          files.push(relativePath);
        }
      }
    };

    walk(repoRoot);
    return files;
  }
};

const sourceTextExtensions = new Set([
  ".css",
  ".js",
  ".json",
  ".md",
  ".mdx",
  ".mjs",
  ".svg",
  ".ts",
  ".tsx",
  ".txt",
  ".yaml",
  ".yml"
]);

const files = trackedFiles();

const envSignals = ["APP_ENV", "SITE_ENV", "NEXT_PUBLIC_DEPLOY_ENV"]
  .map((name) => ({ name, value: envValue(name) }))
  .filter(({ value }) => value);

if (!envSignals.some(({ value }) => value === "production")) {
  addError("Set APP_ENV or NEXT_PUBLIC_DEPLOY_ENV to production before production preflight.");
}

for (const { name, value } of envSignals) {
  if (value !== "production") {
    addError(`${name} must be production, received ${value}.`);
  }
}

const siteUrls = ["SITE_URL", "NEXT_PUBLIC_SITE_URL"]
  .map((name) => ({ name, value: envValue(name) }))
  .filter(({ value }) => value);

if (!siteUrls.length) {
  addError("Set SITE_URL or NEXT_PUBLIC_SITE_URL to https://jamieburk.art.");
}

for (const { name, value } of siteUrls) {
  if (stripTrailingSlash(value) !== productionUrl) {
    addError(`${name} must be ${productionUrl}, received ${value}.`);
  }
}

if (envValue("NEXT_PUBLIC_ROBOTS_POLICY") !== "index") {
  addError("NEXT_PUBLIC_ROBOTS_POLICY must be index for production.");
}

const contactEmail = envValue("NEXT_PUBLIC_CONTACT_EMAIL");

if (!contactEmail) {
  addError("NEXT_PUBLIC_CONTACT_EMAIL is required for production.");
} else if (!isValidEmail(contactEmail)) {
  addError("NEXT_PUBLIC_CONTACT_EMAIL must be a valid email address.");
}

for (const name of ["NEXT_PUBLIC_LINKEDIN_URL", "NEXT_PUBLIC_GITHUB_URL"]) {
  const value = envValue(name);
  if (value && !isValidPublicUrl(value)) {
    addError(`${name} must be a valid http or https URL when set.`);
  }
}

const todoMarker = "TODO: Jamie approval required";
const productionFacingFiles = files.filter(
  (file) =>
    (file.startsWith("apps/www/src/") || file === "apps/www/mdx-components.tsx") &&
    sourceTextExtensions.has(path.extname(file))
);

for (const file of productionFacingFiles) {
  const contents = readFileSync(path.join(repoRoot, file), "utf8");
  if (contents.includes(todoMarker)) {
    addError(`${file} still contains ${todoMarker}.`);
  }
}

const resumePath =
  "apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf";
const absoluteResumePath = path.join(repoRoot, resumePath);

if (!existsSync(absoluteResumePath)) {
  addError(`${resumePath} is missing.`);
} else {
  const resumeBytes = readFileSync(absoluteResumePath, "utf8");
  if (
    resumeBytes.includes("Placeholder resume PDF") ||
    resumeBytes.includes("Replace with approved current resume before launch")
  ) {
    addError(`${resumePath} still contains placeholder resume text.`);
  }
}

const fontFiles = files.filter((file) => /\.(ttf|otf|woff|woff2)$/i.test(file));
if (fontFiles.length) {
  addError(`Tracked font files require explicit approval: ${fontFiles.join(", ")}.`);
}

const committedEnvFiles = files.filter((file) => {
  const basename = path.basename(file);
  return basename.startsWith(".env") && basename !== ".env.example";
});

if (committedEnvFiles.length) {
  addError(`Committed env files are not allowed: ${committedEnvFiles.join(", ")}.`);
}

if (errors.length) {
  console.error("Production preflight failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("Production preflight passed.");
