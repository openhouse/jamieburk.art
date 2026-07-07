#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const productionUrl = "https://jamieburk.art";
const blockers = [];
const warnings = [];

const readEnv = (name) => {
  const normalized = process.env[name]?.trim();
  return normalized ? normalized : undefined;
};

const normalizeUrl = (value) => {
  if (!value) return undefined;
  try {
    return new URL(value).origin;
  } catch {
    return value;
  }
};

function addBlocker(message) {
  blockers.push(message);
}

function addWarning(message) {
  warnings.push(message);
}

if (readEnv("APP_ENV") !== "production") {
  addBlocker("APP_ENV must be production.");
}

for (const name of ["SITE_ENV", "NEXT_PUBLIC_DEPLOY_ENV"]) {
  const value = readEnv(name);
  if (value && value !== "production") {
    addBlocker(`${name} must be production when set.`);
  }
}

for (const name of ["SITE_URL", "NEXT_PUBLIC_SITE_URL"]) {
  const value = normalizeUrl(readEnv(name));
  if (value !== productionUrl) {
    addBlocker(`${name} must be ${productionUrl}.`);
  }
}

const robotsPolicy = readEnv("NEXT_PUBLIC_ROBOTS_POLICY") ?? "noindex";
if (!["noindex", "index"].includes(robotsPolicy)) {
  addBlocker("NEXT_PUBLIC_ROBOTS_POLICY must be noindex or index.");
}

const indexingMode = robotsPolicy === "index";
const resumeApproved = readEnv("NEXT_PUBLIC_RESUME_PDF_APPROVED") === "true";
const publicEmail = readEnv("NEXT_PUBLIC_CONTACT_EMAIL");
const resumePath = path.join(
  repoRoot,
  "apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf"
);

if (indexingMode) {
  if (!resumeApproved) {
    addBlocker("NEXT_PUBLIC_RESUME_PDF_APPROVED must be true for indexable production.");
  }
  if (!existsSync(resumePath)) {
    addBlocker("Approved resume PDF is required for indexable production.");
  }
  if (!publicEmail) {
    addBlocker("NEXT_PUBLIC_CONTACT_EMAIL must be set for indexable production.");
  }
} else {
  addWarning("Production preflight is running in noindex soft-launch mode.");
  if (!resumeApproved || !existsSync(resumePath)) {
    addWarning("Resume PDF remains approval-gated.");
  }
  if (!publicEmail) {
    addWarning("Public contact email remains hidden until approved.");
  }
}

for (const warning of warnings) {
  console.warn(`warning: ${warning}`);
}

if (blockers.length) {
  console.error("Production preflight failed before repository checks:");
  for (const blocker of blockers) console.error(`- ${blocker}`);
  process.exit(1);
}

const commands = [
  ["node", ["scripts/check-public-safety.mjs", "--production"]],
  ["node", ["scripts/check-routes.mjs"]]
];

for (const [command, args] of commands) {
  const result = spawnSync(command, args, {
    cwd: repoRoot,
    env: { ...process.env, PUBLIC_SAFETY_MODE: "production" },
    stdio: "inherit"
  });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

console.log(
  `Production preflight passed in ${indexingMode ? "indexable" : "noindex soft-launch"} mode.`
);
