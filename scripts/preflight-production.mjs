#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const productionUrl = "https://jamieburk.art";
const failures = [];
const warnings = [];

const env = (name) => {
  const value = process.env[name]?.trim();
  return value ? value : undefined;
};

const stripTrailingSlash = (value) => value.replace(/\/+$/, "");

const failUnless = (condition, message) => {
  if (!condition) failures.push(message);
};

const readTrackedFiles = () => {
  try {
    return execFileSync("git", ["ls-files"], {
      cwd: repoRoot,
      encoding: "utf8"
    })
      .split(/\r?\n/)
      .filter(Boolean);
  } catch {
    failures.push("Unable to read tracked files with git ls-files.");
    return [];
  }
};

const isHttpsUrl = (value) => {
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
};

const resolvedDeployEnv =
  env("APP_ENV") ?? env("SITE_ENV") ?? env("NEXT_PUBLIC_DEPLOY_ENV");
const nonProductionEnvNames = ["APP_ENV", "SITE_ENV", "NEXT_PUBLIC_DEPLOY_ENV"].filter(
  (name) => env(name) && env(name) !== "production"
);

failUnless(
  resolvedDeployEnv === "production",
  `Resolved deploy environment must be production. Current value: ${resolvedDeployEnv ?? "(unset)"}.`
);
failUnless(
  nonProductionEnvNames.length === 0,
  `Production preflight has non-production env values: ${nonProductionEnvNames.join(", ")}.`
);

const siteUrl = env("SITE_URL");
const publicSiteUrl = env("NEXT_PUBLIC_SITE_URL");
const resolvedSiteUrl = stripTrailingSlash(siteUrl ?? publicSiteUrl ?? "");
const nonProductionUrls = [
  ["SITE_URL", siteUrl],
  ["NEXT_PUBLIC_SITE_URL", publicSiteUrl]
].filter(([, value]) => value && stripTrailingSlash(value) !== productionUrl);

failUnless(
  resolvedSiteUrl === productionUrl,
  `SITE_URL/NEXT_PUBLIC_SITE_URL must resolve to ${productionUrl}. Current value: ${resolvedSiteUrl || "(unset)"}.`
);
failUnless(
  nonProductionUrls.length === 0,
  `Production preflight has non-production URL values: ${nonProductionUrls
    .map(([name]) => name)
    .join(", ")}.`
);

failUnless(
  env("NEXT_PUBLIC_ROBOTS_POLICY") === "index",
  "NEXT_PUBLIC_ROBOTS_POLICY must be index for production."
);

const contactEmail = env("NEXT_PUBLIC_CONTACT_EMAIL");
failUnless(
  Boolean(contactEmail) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail),
  "NEXT_PUBLIC_CONTACT_EMAIL must be set to an approved public email before production."
);
failUnless(
  !contactEmail || !/todo|example|placeholder/i.test(contactEmail),
  "NEXT_PUBLIC_CONTACT_EMAIL still looks like a placeholder."
);

for (const name of ["NEXT_PUBLIC_LINKEDIN_URL", "NEXT_PUBLIC_GITHUB_URL"]) {
  const value = env(name);
  if (!value) {
    warnings.push(`${name} is not set; production will omit that contact row.`);
  } else {
    failUnless(isHttpsUrl(value), `${name} must be a valid https URL when set.`);
  }
}

const trackedFiles = readTrackedFiles();
const envFiles = trackedFiles.filter((file) => {
  const basename = path.basename(file);
  return basename.startsWith(".env") && basename !== ".env.example";
});

failUnless(
  envFiles.length === 0,
  `Only .env.example may be committed. Remove: ${envFiles.join(", ")}.`
);

const fontExtensions = new Set([".otf", ".ttf", ".woff", ".woff2"]);
const fontFiles = trackedFiles.filter((file) => fontExtensions.has(path.extname(file).toLowerCase()));

failUnless(
  fontFiles.length === 0,
  `Do not commit private/proprietary font files. Review/remove: ${fontFiles.join(", ")}.`
);

const todoNeedle = "TODO: Jamie approval required";
const allowedTodoFiles = new Set(["apps/www/src/lib/public-safety.ts"]);
const productionFacingPrefixes = ["apps/www/src/", "apps/www/public/"];
const todoMatches = [];

for (const file of trackedFiles) {
  if (!productionFacingPrefixes.some((prefix) => file.startsWith(prefix))) continue;
  if (allowedTodoFiles.has(file)) continue;

  const absolutePath = path.join(repoRoot, file);
  if (!existsSync(absolutePath)) continue;

  const text = readFileSync(absolutePath, "utf8");
  text.split(/\r?\n/).forEach((line, index) => {
    if (line.includes(todoNeedle)) {
      todoMatches.push(`${file}:${index + 1}`);
    }
  });
}

failUnless(
  todoMatches.length === 0,
  `Approval TODOs remain in production-facing app files: ${todoMatches.join(", ")}.`
);

const resumePath = path.join(
  repoRoot,
  "apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf"
);

failUnless(existsSync(resumePath), "Approved resume PDF path is missing.");

if (existsSync(resumePath)) {
  const resumeText = readFileSync(resumePath).toString("latin1");
  const placeholderNeedles = [
    "Placeholder resume PDF",
    "Replace with approved current resume before launch"
  ];
  const foundPlaceholder = placeholderNeedles.find((needle) => resumeText.includes(needle));

  failUnless(
    !foundPlaceholder,
    `Resume PDF still contains placeholder text: ${foundPlaceholder}.`
  );
}

for (const warning of warnings) {
  console.warn(`Warning: ${warning}`);
}

if (failures.length > 0) {
  console.error("Production preflight failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("Production preflight passed.");
