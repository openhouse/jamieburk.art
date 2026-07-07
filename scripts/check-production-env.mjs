import { execFileSync } from "node:child_process";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const resumePath = path.join(
  repoRoot,
  "apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf"
);
const placeholderResumeHash =
  "c74cf11cb6d57e3483b3731a0b741da7714a6044588f5f901623a08820db40c4";

const required = {
  APP_ENV: "production",
  SITE_ENV: "production",
  NEXT_PUBLIC_DEPLOY_ENV: "production",
  SITE_URL: "https://jamieburk.art",
  NEXT_PUBLIC_SITE_URL: "https://jamieburk.art",
  NEXT_PUBLIC_ROBOTS_POLICY: "index"
};

const errors = [];

const readEnv = (key) => {
  const trimmed = (process.env[key] ?? "").trim();
  return trimmed ? trimmed : undefined;
};

const stripTrailingSlash = (value) => value.replace(/\/$/, "");

const appEnv =
  readEnv("APP_ENV") ??
  readEnv("SITE_ENV") ??
  readEnv("NEXT_PUBLIC_DEPLOY_ENV") ??
  "staging";
const siteUrl = stripTrailingSlash(
  readEnv("SITE_URL") ??
    readEnv("NEXT_PUBLIC_SITE_URL") ??
    (appEnv === "production"
      ? "https://jamieburk.art"
      : "https://staging.jamieburk.art")
);
const isProduction =
  appEnv === "production" || siteUrl === "https://jamieburk.art";
const robotsIndexable =
  isProduction && readEnv("NEXT_PUBLIC_ROBOTS_POLICY") === "index";

for (const [key, expected] of Object.entries(required)) {
  if ((process.env[key] ?? "").trim() !== expected) {
    errors.push(`${key} must be ${expected}`);
  }
}

if (!robotsIndexable) {
  errors.push("production robots computation would still emit noindex");
}

if (siteUrl !== "https://jamieburk.art") {
  errors.push(`production canonical URL would be ${siteUrl}`);
}

const contactEmail = (process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "").trim();
if (!contactEmail) {
  errors.push("NEXT_PUBLIC_CONTACT_EMAIL is required for production");
} else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(contactEmail)) {
  errors.push("NEXT_PUBLIC_CONTACT_EMAIL does not look like an email address");
}

if (!fs.existsSync(resumePath)) {
  errors.push("resume PDF is missing");
} else {
  const hash = crypto.createHash("sha256").update(fs.readFileSync(resumePath)).digest("hex");
  if (hash === placeholderResumeHash) {
    errors.push("resume PDF still matches the placeholder hash");
  }

  let resumeText = "";
  try {
    resumeText = execFileSync("pdftotext", [resumePath, "-"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"]
    });
  } catch {
    resumeText = fs.readFileSync(resumePath, "latin1");
  }

  if (/Placeholder resume PDF|Replace with approved current resume before launch/i.test(resumeText)) {
    errors.push("resume PDF still contains placeholder text");
  }
}

if (errors.length) {
  console.error("Production env preflight failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("Production env preflight passed.");
