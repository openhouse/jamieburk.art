#!/usr/bin/env node

import { execFileSync, spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = new Set(process.argv.slice(2));
const productionLike =
  args.has("--production") ||
  process.env.APP_ENV === "production" ||
  process.env.SITE_ENV === "production" ||
  process.env.NEXT_PUBLIC_DEPLOY_ENV === "production";

const resumePath =
  "apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf";
const placeholderResumeHashes = new Set([
  "c74cf11cb6d57e3483b3731a0b741da7714a6044588f5f901623a08820db40c4"
]);

const textExtensions = new Set([
  ".css",
  ".html",
  ".js",
  ".json",
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

const fontExtensions = new Set([".otf", ".ttf", ".woff", ".woff2"]);
const ignoredDirectories = new Set([".git", ".next", "coverage", "node_modules", "out"]);
const publicScanRoots = ["apps/www/src", "apps/www/public"];
const docsScanRoots = [
  "README.md",
  "docs",
  ".env.example",
  ".gitignore",
  ".dockerignore",
  "Dockerfile",
  "package.json",
  "apps/www/package.json"
];
const failures = [];
const warnings = [];

const hardSecretPatterns = [
  {
    label: "private key material",
    pattern: /-----BEGIN (?:RSA |OPENSSH |EC |)?PRIVATE KEY-----/i
  },
  {
    label: "OpenAI key-looking string",
    pattern: /\bsk-(?:proj-)?[A-Za-z0-9_-]{20,}\b/
  },
  {
    label: "GitHub token-looking string",
    pattern: /\bgh[pousr]_[A-Za-z0-9_]{20,}\b/
  },
  {
    label: "credential-looking assignment",
    pattern:
      /\b(?:api[_-]?key|access[_-]?token|auth[_-]?token|bearer[_-]?token|refresh[_-]?token|session[_-]?token|password|passwd|client[_-]?secret)\b\s*[:=]\s*["'][^"']{8,}["']/i
  }
];

const privatePathPatterns = [
  {
    label: "private local source path",
    pattern:
      /(?:\/Volumes\/16TB_SSD\/Work\/Jamie|\/Users\/jburkart\/Library|supporting-materials|job-hunt\/|Jamie Projects History|Mobile Documents\/com~apple~CloudDocs)/i
  }
];

const publicContentBlockers = [
  {
    label: "visible public TODO",
    pattern: /\bTODO\b|Jamie approval required|replace the placeholder/i
  },
  {
    label: "placeholder contact label",
    pattern: /Public email pending confirmation|LinkedIn pending|GitHub pending|placeholder contact/i
  },
  {
    label: "private visibility state",
    pattern: /visibility\s*:\s*["']private["']/i
  },
  {
    label: "draft work status",
    pattern: /status\s*:\s*["']Draft["']/i
  },
  {
    label: "raw transcript marker",
    pattern: /\braw\s+(?:otter|transcript)|_otter|otter\.ai transcript/i
  }
];

const exactMetricPatterns = [
  /\b2x\s+revenue/i,
  /\b30\+\s+pages/i,
  /\b35\+\s+active/i,
  /\b1,800\+\s+users/i,
  /\b16,000\+\s+(?:events|event posts|events\/posts)/i,
  /\b300\+\s+gatherings/i,
  /\b20\+\s+resident/i,
  /\$490,539/i
];

function toRelative(filePath) {
  return path.relative(repoRoot, filePath).split(path.sep).join("/");
}

function trackedFiles() {
  try {
    return execFileSync("git", ["ls-files"], {
      cwd: repoRoot,
      encoding: "utf8"
    })
      .split("\n")
      .filter(Boolean);
  } catch {
    return [];
  }
}

function walkFiles(root, callback) {
  const target = path.join(repoRoot, root);
  if (!existsSync(target)) return;

  const stat = statSync(target);
  if (stat.isFile()) {
    callback(target);
    return;
  }

  for (const entry of readdirSync(target, { withFileTypes: true })) {
    if (entry.isDirectory() && ignoredDirectories.has(entry.name)) continue;
    const fullPath = path.join(target, entry.name);
    if (entry.isDirectory()) {
      walkFiles(toRelative(fullPath), callback);
    } else if (entry.isFile()) {
      callback(fullPath);
    }
  }
}

function lineNumberForMatch(source, index) {
  return source.slice(0, index).split(/\r\n|\r|\n/).length;
}

function addFinding(target, filePath, label, index = 0, source = "") {
  const line = source ? lineNumberForMatch(source, index) : 1;
  target.push(`${toRelative(filePath)}:${line} ${label}`);
}

function readText(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".pdf") {
    const extracted = spawnSync("pdftotext", [filePath, "-"], {
      encoding: "utf8"
    });

    if (extracted.status === 0 && extracted.stdout) {
      return extracted.stdout;
    }
  }

  const buffer = readFileSync(filePath);
  return `${buffer.toString("utf8")}\n${buffer.toString("latin1")}`;
}

function scanTextFile(filePath, patterns, target) {
  const ext = path.extname(filePath).toLowerCase();
  if (!textExtensions.has(ext) && ext !== ".pdf") return;

  const source = readText(filePath);
  for (const check of patterns) {
    const match = check.pattern.exec(source);
    if (match) addFinding(target, filePath, check.label, match.index, source);
  }
}

function sha256(filePath) {
  return createHash("sha256").update(readFileSync(filePath)).digest("hex");
}

function checkTrackedFiles() {
  for (const file of trackedFiles()) {
    const ext = path.extname(file).toLowerCase();
    const basename = path.basename(file);

    if (fontExtensions.has(ext)) {
      failures.push(`${file}:1 committed font file`);
    }

    if (basename.startsWith(".env") && basename !== ".env.example") {
      failures.push(`${file}:1 committed env file`);
    }

    if (/^(private|raw|source-material|client-private|coalition-private|legal-review|stakeholders|internal-analytics|secrets)\//i.test(file)) {
      failures.push(`${file}:1 private/source directory is tracked`);
    }
  }
}

function checkResume() {
  const absolute = path.join(repoRoot, resumePath);

  if (!existsSync(absolute)) {
    failures.push(`${resumePath}:1 resume PDF is missing`);
    return;
  }

  if (placeholderResumeHashes.has(sha256(absolute))) {
    failures.push(`${resumePath}:1 resume PDF matches known placeholder hash`);
  }

  const text = readText(absolute);
  if (/Placeholder resume PDF|Replace with approved current resume/i.test(text)) {
    failures.push(`${resumePath}:1 resume PDF contains placeholder language`);
  }
}

function findUnapprovedMetricClaims() {
  const proofsPath = path.join(repoRoot, "apps/www/src/data/proofs.ts");
  if (!existsSync(proofsPath)) return [];

  const source = readFileSync(proofsPath, "utf8");
  const objectPattern = /\{\s*id:\s*"([^"]+)"[\s\S]*?\n\s*\}/g;
  const unapproved = [];
  let match;

  while ((match = objectPattern.exec(source))) {
    const objectText = match[0];
    const id = match[1];
    const approved = /approvalState:\s*"approved"/.test(objectText);
    const doNotPublish = /approvalState:\s*"do-not-publish"/.test(objectText);

    if (doNotPublish) {
      failures.push(`apps/www/src/data/proofs.ts:1 proof ${id} is marked do-not-publish in app source`);
      continue;
    }

    if (!approved && exactMetricPatterns.some((pattern) => pattern.test(objectText))) {
      unapproved.push(id);
    }

    if (/approvalState:\s*"needs-jamie-review"/.test(objectText) && /"home"/.test(objectText)) {
      warnings.push(`apps/www/src/data/proofs.ts:1 proof ${id} needs Jamie review and may appear on homepage`);
    }
  }

  return unapproved;
}

function checkProductionEnvironment() {
  if (!productionLike) return;

  if (process.env.NEXT_PUBLIC_ROBOTS_POLICY !== "index") {
    failures.push("environment:1 NEXT_PUBLIC_ROBOTS_POLICY must be index for production indexing");
  }

  const siteUrl = process.env.SITE_URL?.trim();
  const nextSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (siteUrl && siteUrl.replace(/\/$/, "") !== "https://jamieburk.art") {
    failures.push("environment:1 SITE_URL must be https://jamieburk.art in production");
  }
  if (nextSiteUrl && nextSiteUrl.replace(/\/$/, "") !== "https://jamieburk.art") {
    failures.push("environment:1 NEXT_PUBLIC_SITE_URL must be https://jamieburk.art in production");
  }

  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();
  if (!contactEmail) {
    failures.push("environment:1 NEXT_PUBLIC_CONTACT_EMAIL is required in production");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail)) {
    failures.push("environment:1 NEXT_PUBLIC_CONTACT_EMAIL must be a valid email address");
  }
}

checkTrackedFiles();

for (const root of publicScanRoots) {
  walkFiles(root, (filePath) => {
    scanTextFile(filePath, hardSecretPatterns, failures);
    scanTextFile(filePath, privatePathPatterns, failures);
    scanTextFile(filePath, publicContentBlockers, failures);
  });
}

for (const root of docsScanRoots) {
  walkFiles(root, (filePath) => {
    scanTextFile(filePath, hardSecretPatterns, failures);
    scanTextFile(filePath, privatePathPatterns, failures);
  });
}

const unapprovedMetricClaims = findUnapprovedMetricClaims();
if (productionLike && unapprovedMetricClaims.length) {
  for (const claim of unapprovedMetricClaims) {
    failures.push(`apps/www/src/data/proofs.ts:1 exact metric claim ${claim} is not approved`);
  }
}

checkResume();
checkProductionEnvironment();

if (warnings.length) {
  console.warn("Public-safety warnings:");
  for (const warning of [...new Set(warnings)]) console.warn(`- ${warning}`);
}

if (failures.length) {
  console.error("Public-safety check failed:");
  for (const failure of [...new Set(failures)]) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Public-safety scan passed in ${productionLike ? "production" : "non-production"} mode.`);
