#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const mode =
  process.argv.includes("--production") ||
  process.env.PUBLIC_SAFETY_MODE === "production" ||
  process.env.APP_ENV === "production"
    ? "production"
    : "staging";

const failures = [];
const warnings = [];

function gitLsFiles() {
  return execFileSync("git", ["ls-files"], {
    cwd: repoRoot,
    encoding: "utf8"
  })
    .split("\n")
    .filter(Boolean);
}

const trackedFiles = gitLsFiles();

const scannerRoots = [
  "apps/www/src",
  "apps/www/content",
  "apps/www/public",
  "docs",
  "README.md",
  "AGENTS.md",
  "DESIGN.md",
  "PRODUCT.md"
];

const textExtensions = new Set([
  ".css",
  ".example",
  ".html",
  ".js",
  ".json",
  ".jsx",
  ".md",
  ".mdx",
  ".mjs",
  ".svg",
  ".ts",
  ".tsx",
  ".txt",
  ".xml",
  ".yaml",
  ".yml"
]);

const privatePathPatterns = [
  "*.private.*",
  "private/",
  "archive-private/",
  "raw/",
  "transcripts-private/",
  "client-private/",
  "legal-review/",
  "support-materials-private/",
  "supporting-materials/"
];

const fontExtensions = new Set([".eot", ".otf", ".ttf", ".woff", ".woff2"]);
const resumePath = "apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf";

function isInScannerRoot(file) {
  return scannerRoots.some((root) => file === root || file.startsWith(`${root}/`));
}

function isProductionFacing(file) {
  return file.startsWith("apps/www/src/") || file.startsWith("apps/www/public/");
}

function isTextFile(file) {
  return textExtensions.has(path.extname(file).toLowerCase());
}

function addFailure(message) {
  failures.push(message);
}

function addWarning(message) {
  warnings.push(message);
}

function lineFor(text, index) {
  return text.slice(0, index).split(/\r\n|\r|\n/).length;
}

function readText(file) {
  return readFileSync(path.join(repoRoot, file), "utf8");
}

function checkPattern(file, text, label, pattern, severity = "failure") {
  const match = pattern.exec(text);
  if (!match) return;

  const message = `${file}:${lineFor(text, match.index)} contains ${label}`;
  if (severity === "warning") {
    addWarning(message);
  } else {
    addFailure(message);
  }
}

for (const file of trackedFiles) {
  const basename = path.basename(file);
  const extension = path.extname(file).toLowerCase();

  if (/\.private\./i.test(file)) {
    addFailure(`Tracked private file pattern is not allowed: ${file}`);
  }

  for (const pattern of privatePathPatterns.slice(1)) {
    if (file === pattern.slice(0, -1) || file.startsWith(pattern)) {
      addFailure(`Tracked private path is not allowed: ${file}`);
    }
  }

  if ((basename.startsWith(".env") || basename.endsWith(".env")) && basename !== ".env.example") {
    addFailure(`Committed env file is not allowed: ${file}`);
  }

  if (/\.(key|pem)$/i.test(file)) {
    addFailure(`Committed private key material is not allowed: ${file}`);
  }

  if (fontExtensions.has(extension)) {
    addFailure(`Tracked font binary requires explicit license approval: ${file}`);
  }
}

const searchableTextFiles = trackedFiles.filter((file) => isInScannerRoot(file) && isTextFile(file));

for (const file of searchableTextFiles) {
  const text = readText(file);
  const productionFacing = isProductionFacing(file);

  checkPattern(file, text, "private key material", /-----BEGIN (?:RSA |OPENSSH |EC |)?PRIVATE KEY-----/i);
  checkPattern(file, text, "OpenAI key-looking string", /\bsk-(?:proj-)?[A-Za-z0-9_-]{20,}\b/);
  checkPattern(file, text, "GitHub token-looking string", /\bgh[pousr]_[A-Za-z0-9_]{20,}\b/);
  checkPattern(
    file,
    text,
    "credential-looking assignment",
    /\b(?:AWS_SECRET_ACCESS_KEY|OPENAI_API_KEY|api_key|password|secret|token)\s*[:=]\s*["'][^"'\n]{8,}["']/i
  );
  checkPattern(
    file,
    text,
    "private local source path",
    /(?:\/Volumes\/16TB_SSD\/Work\/Jamie\/Portfolio\/supporting-materials|\/Users\/jburkart\/Library\/Mobile Documents|Jamie Projects History|job-hunt)/i
  );

  if (productionFacing) {
    checkPattern(file, text, "visible Jamie approval TODO", /TODO:\s*Jamie approval required/i);
    checkPattern(file, text, "placeholder production text", /\b(?:Placeholder resume PDF|Replace the placeholder PDF|Replace with approved current resume|placeholder resume|lorem ipsum|replace this)\b/i);
    checkPattern(file, text, "private work item", /visibility:\s*"private"/);
    checkPattern(file, text, "draft work item", /status:\s*"Draft"/);
    checkPattern(file, text, "raw Otter marker", /\b(?:otter\.ai|otter_ai)\b/i);
    checkPattern(file, text, "private transcript exposure", /\b(?:raw transcript|private transcript|Corrected Working Transcript|Jonathan Marmor transcript|speaker\/timecode transcript)\b/i);
    checkPattern(file, text, "rendered pending social/contact row", /(?:Public email pending|LinkedIn pending|GitHub pending|pending confirmation)/i);
    checkPattern(file, text, "production-facing private source path", /(?:supporting-materials|support-materials|transcripts-private|client-private|legal-review)/i);
  } else if (/(raw transcript|private transcript|legal-review|stakeholder lists|client-private)/i.test(text)) {
    addWarning(`${file} discusses safety boundary terms`);
  }
}

const siteDataPath = "apps/www/src/data/site.ts";
if (!existsSync(path.join(repoRoot, siteDataPath))) {
  addFailure(`${siteDataPath} is missing`);
} else {
  const siteData = readText(siteDataPath);
  if (!/jamie\.burkart@gmail\.com/.test(siteData)) {
    addFailure(`${siteDataPath} is missing the approved public contact email`);
  }
}

const resumeAbsolutePath = path.join(repoRoot, resumePath);
if (!existsSync(resumeAbsolutePath)) {
  addFailure(`${resumePath} is missing`);
} else {
  const stats = statSync(resumeAbsolutePath);
  if (stats.size < 10_000) {
    addFailure(`${resumePath} appears to be a placeholder or truncated PDF`);
  }

  let resumeText = "";
  try {
    resumeText = execFileSync("pdftotext", [resumeAbsolutePath, "-"], {
      cwd: repoRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"]
    });
  } catch {
    addWarning(`${resumePath}: pdftotext unavailable or failed; using binary fallback`);
    resumeText = readFileSync(resumeAbsolutePath).toString("latin1");
  }

  if (!/Jamie\s+Burkart|James\s+Burkart/i.test(resumeText)) {
    addFailure(`${resumePath} text does not include Jamie Burkart`);
  }

  if (/\b(?:TODO|placeholder|lorem ipsum|replace this)\b/i.test(resumeText)) {
    addFailure(`${resumePath} contains placeholder or TODO text`);
  }
}

if (
  mode === "production" &&
  !(
    process.env.APP_ENV === "production" &&
    process.env.NEXT_PUBLIC_ROBOTS_POLICY === "index" &&
    (process.env.SITE_URL ?? process.env.NEXT_PUBLIC_SITE_URL) === "https://jamieburk.art"
  )
) {
  addFailure(
    "Production public-safety mode requires APP_ENV=production, SITE_URL=https://jamieburk.art, and NEXT_PUBLIC_ROBOTS_POLICY=index"
  );
}

if (warnings.length) {
  console.warn(`Public-safety warnings in ${mode} mode:`);
  for (const warning of warnings) {
    console.warn(`- ${warning}`);
  }
}

if (failures.length) {
  console.error(`Public-safety check failed in ${mode} mode:`);
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`Public-safety check passed in ${mode} mode.`);
