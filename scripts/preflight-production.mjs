#!/usr/bin/env node

import { spawnSync } from "node:child_process";

const errors = [];

function envValue(name) {
  const value = process.env[name]?.trim();
  return value ? value : undefined;
}

function stripTrailingSlash(value) {
  return value.replace(/\/$/, "");
}

function requireValue(name, expected) {
  const value = envValue(name);
  if (!value) {
    errors.push(`${name} is required.`);
    return;
  }

  if (expected && stripTrailingSlash(value) !== expected) {
    errors.push(`${name} must be ${expected}; received ${value}.`);
  }
}

for (const name of ["APP_ENV", "SITE_ENV", "NEXT_PUBLIC_DEPLOY_ENV"]) {
  const value = envValue(name);
  if (value && value !== "production") {
    errors.push(`${name} must be production when set; received ${value}.`);
  }
}

if (!["APP_ENV", "SITE_ENV", "NEXT_PUBLIC_DEPLOY_ENV"].some((name) => envValue(name) === "production")) {
  errors.push("At least one production environment signal is required.");
}

requireValue("SITE_URL", "https://jamieburk.art");
requireValue("NEXT_PUBLIC_SITE_URL", "https://jamieburk.art");

if (envValue("NEXT_PUBLIC_ROBOTS_POLICY") !== "index") {
  errors.push("NEXT_PUBLIC_ROBOTS_POLICY must be index.");
}

const contactEmail = envValue("NEXT_PUBLIC_CONTACT_EMAIL");
if (!contactEmail) {
  errors.push("NEXT_PUBLIC_CONTACT_EMAIL is required.");
} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail)) {
  errors.push("NEXT_PUBLIC_CONTACT_EMAIL must be a valid email address.");
}

if (errors.length) {
  console.error("Production preflight failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

const result = spawnSync(
  process.execPath,
  ["scripts/check-public-safety.mjs", "--production"],
  {
    stdio: "inherit",
    env: process.env
  }
);

process.exit(result.status ?? 1);
