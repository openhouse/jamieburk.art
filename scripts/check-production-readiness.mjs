#!/usr/bin/env node

import { execFileSync, spawnSync } from "node:child_process";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const resumeRelativePath =
  "apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf";
const resumePath = path.join(repoRoot, resumeRelativePath);
const placeholderHash =
  "c74cf11cb6d57e3483b3731a0b741da7714a6044588f5f901623a08820db40c4";

const failures = [];

function fail(message) {
  failures.push(message);
}

function sha256(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

function readPdfText(filePath) {
  const pdftotext = spawnSync("pdftotext", [filePath, "-"], {
    encoding: "utf8",
    maxBuffer: 1024 * 1024 * 8
  });

  if (pdftotext.status === 0 && pdftotext.stdout) return pdftotext.stdout;

  const buffer = fs.readFileSync(filePath);
  return `${buffer.toString("utf8")}\n${buffer.toString("latin1")}`;
}

function read(relativePath) {
  return fs.readFileSync(path.join(repoRoot, relativePath), "utf8");
}

function requireEnv(name, expected) {
  if (process.env[name] !== expected) {
    fail(`${name} must be exactly ${expected}`);
  }
}

requireEnv("APP_ENV", "production");
requireEnv("SITE_ENV", "production");
requireEnv("NEXT_PUBLIC_DEPLOY_ENV", "production");
requireEnv("SITE_URL", "https://jamieburk.art");
requireEnv("NEXT_PUBLIC_SITE_URL", "https://jamieburk.art");
requireEnv("NEXT_PUBLIC_ROBOTS_POLICY", "index");

if (!fs.existsSync(resumePath)) {
  fail("Resume PDF is missing.");
} else {
  const stats = fs.statSync(resumePath);
  const text = readPdfText(resumePath);
  const hash = sha256(resumePath);

  if (hash === placeholderHash || stats.size < 10_000) {
    fail("Resume PDF still looks like the placeholder.");
  }

  if (/placeholder resume pdf|replace with approved current resume/i.test(text)) {
    fail("Resume PDF contains placeholder text.");
  }
}

const siteSource = read("apps/www/src/data/site.ts");
const contactBlockers = [
  /Public email pending/i,
  /approval required/i,
  /emailLabel:\s*["']\s*["']/,
  /emailHref:\s*["']\s*["']/,
  /linkedInHref:\s*["']\s*["']/,
  /githubHref:\s*["']\s*["']/
];

for (const blocker of contactBlockers) {
  if (blocker.test(siteSource)) {
    fail("Public contact data is missing, placeholder, or approval-pending.");
    break;
  }
}

const sitemapSource = read("apps/www/src/app/sitemap.ts");
if (sitemapSource.includes("Jamie-Burkart-Resume-Technical-Project-Manager.pdf")) {
  fail("Sitemap includes the resume PDF.");
}

const appPublicText = [
  "apps/www/src/app",
  "apps/www/src/components",
  "apps/www/src/content",
  "apps/www/src/data"
]
  .flatMap((relativeRoot) => {
    const root = path.join(repoRoot, relativeRoot);
    const files = [];
    const walk = (current) => {
      for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
        const fullPath = path.join(current, entry.name);
        if (entry.isDirectory()) walk(fullPath);
        if (entry.isFile() && /\.(?:mdx?|tsx?|json|css)$/.test(entry.name)) {
          files.push(fullPath);
        }
      }
    };
    walk(root);
    return files;
  });

for (const filePath of appPublicText) {
  const source = fs.readFileSync(filePath, "utf8");
  if (/TODO:\s*Jamie approval required|approval required before launch|Artifact gallery/i.test(source)) {
    fail(`Visible production blocker remains in ${path.relative(repoRoot, filePath)}.`);
  }
}

try {
  execFileSync("node", ["scripts/check-public-safety.mjs", "--production"], {
    cwd: repoRoot,
    env: process.env,
    stdio: "inherit"
  });
} catch {
  fail("Public-safety production scan failed.");
}

if (!process.env.SKIP_PRODUCTION_BUILD) {
  try {
    execFileSync("npm", ["run", "build", "-w", "@jamie-burkart/www"], {
      cwd: repoRoot,
      env: process.env,
      stdio: "inherit"
    });
  } catch {
    fail("apps/www did not build in production-readiness mode.");
  }
}

if (failures.length) {
  console.error("Production-readiness check failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Production-readiness check passed.");
