#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const errors = [];
const productionUrl = "https://jamieburk.art";

function value(name) {
  return process.env[name]?.trim();
}

function add(message) {
  errors.push(message);
}

if (value("APP_ENV") !== "production") add("APP_ENV must be production.");

for (const alias of ["SITE_ENV", "NEXT_PUBLIC_DEPLOY_ENV", "SITE_INDEXABLE", "NEXT_PUBLIC_NO_INDEX"]) {
  if (value(alias)) add(`${alias} is not part of the canonical environment model.`);
}

for (const name of ["SITE_URL", "NEXT_PUBLIC_SITE_URL"]) {
  if (!value(name)) add(`${name} is required.`);
  else if (value(name).replace(/\/$/, "") !== productionUrl) add(`${name} must be ${productionUrl}.`);
}

if (value("NEXT_PUBLIC_ROBOTS_POLICY") !== "index") {
  add("NEXT_PUBLIC_ROBOTS_POLICY must be exactly index for production.");
}

if (!value("NEXT_PUBLIC_CONTACT_EMAIL")) {
  add("NEXT_PUBLIC_CONTACT_EMAIL is required for a production public contact path.");
}

const resumePath = path.join(
  root,
  "apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf"
);

if (!existsSync(resumePath)) {
  add("Resume PDF is missing.");
} else {
  let resumeText = "";
  try {
    resumeText = execFileSync("pdftotext", [resumePath, "-"], {
      encoding: "utf8",
      maxBuffer: 10 * 1024 * 1024,
      stdio: ["ignore", "pipe", "ignore"]
    });
  } catch {
    resumeText = readFileSync(resumePath, "latin1");
  }

  if (/placeholder r(?:e|\u00e9)sum(?:e|\u00e9)|replace with approved current resume/i.test(resumeText)) {
    add("Resume PDF is still a placeholder.");
  }
}

try {
  execFileSync(process.execPath, ["scripts/public-safety.mjs", "--production"], {
    cwd: root,
    env: { ...process.env, APP_ENV: "production" },
    stdio: "pipe"
  });
} catch (error) {
  const output = `${error.stdout?.toString() ?? ""}${error.stderr?.toString() ?? ""}`.trim();
  add(output || "Production public-safety scan failed.");
}

if (errors.length > 0) {
  console.error("Production safety failed:");
  for (const error of errors) {
    for (const line of error.split("\n")) console.error(`- ${line}`);
  }
  process.exit(1);
}

console.log("Production safety passed.");
