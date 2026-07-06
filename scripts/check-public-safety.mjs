#!/usr/bin/env node

import { execFileSync, spawnSync } from "node:child_process";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = new Set(process.argv.slice(2));
const productionLike =
  args.has("--production") ||
  process.env.APP_ENV === "production" ||
  process.env.SITE_ENV === "production" ||
  process.env.NEXT_PUBLIC_DEPLOY_ENV === "production";

const ignoredDirectories = new Set([
  ".git",
  ".next",
  "coverage",
  "node_modules",
  "out"
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
  ".xml"
]);

const publicRoots = [
  "apps/www/src/app",
  "apps/www/src/components",
  "apps/www/src/content",
  "apps/www/src/data",
  "apps/www/src/lib",
  "apps/www/public"
];
const privatePathScanRoots = [
  ...publicRoots,
  "docs",
  "README.md",
  "AGENTS.md",
  "PRODUCT.md",
  "Dockerfile",
  "package.json"
];

const fontExtensions = new Set([".ttf", ".otf", ".woff", ".woff2"]);
const knownPlaceholderResumeHash =
  "c74cf11cb6d57e3483b3731a0b741da7714a6044588f5f901623a08820db40c4";

const hardFindings = [];
const reviewFindings = [];

function relative(filePath) {
  return path.relative(repoRoot, filePath);
}

function addFinding(target, label, filePath, line = 1) {
  target.push({ label, file: relative(filePath), line });
}

function walk(root, callback) {
  if (!fs.existsSync(root)) return;

  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const fullPath = path.join(root, entry.name);

    if (entry.isDirectory()) {
      if (!ignoredDirectories.has(entry.name)) walk(fullPath, callback);
      continue;
    }

    if (entry.isFile()) callback(fullPath);
  }
}

function lineFor(source, index) {
  return source.slice(0, index).split(/\r\n|\r|\n/).length;
}

function readText(filePath) {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch {
    return "";
  }
}

function readPdfText(filePath) {
  const pdftotext = spawnSync("pdftotext", [filePath, "-"], {
    encoding: "utf8",
    maxBuffer: 1024 * 1024 * 8
  });

  if (pdftotext.status === 0 && pdftotext.stdout) {
    return pdftotext.stdout;
  }

  const buffer = fs.readFileSync(filePath);
  return `${buffer.toString("utf8")}\n${buffer.toString("latin1")}`;
}

function sha256(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

function allFiles() {
  const files = [];
  walk(repoRoot, (filePath) => files.push(filePath));
  return files;
}

function scanRepositoryFile(filePath) {
  const basename = path.basename(filePath);
  const ext = path.extname(filePath).toLowerCase();

  if (fontExtensions.has(ext)) {
    addFinding(hardFindings, "font file committed", filePath);
    return;
  }

  if (basename.startsWith(".env") && basename !== ".env.example") {
    addFinding(hardFindings, "committed env file", filePath);
    return;
  }

  if (!textExtensions.has(ext)) return;

  const source = readText(filePath);
  const hardPatterns = [
    ["private key material", /-----BEGIN (?:RSA |OPENSSH |EC |)?PRIVATE KEY-----/i],
    ["OpenAI key-looking string", /\bsk-(?:proj-)?[A-Za-z0-9_-]{20,}\b/i],
    ["secret-looking assignment", /\b(?:api[_-]?key|secret|access[_-]?token|auth[_-]?token|client[_-]?secret)\s*[:=]\s*["']?[A-Za-z0-9_./+=-]{12,}/i],
    ["password-looking assignment", /\b(?:password|passwd)\s*[:=]\s*["']?[^"'\s]{8,}/i]
  ];

  for (const [label, pattern] of hardPatterns) {
    const match = pattern.exec(source);
    if (match) addFinding(hardFindings, label, filePath, lineFor(source, match.index));
  }
}

function scanPublicFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const source = ext === ".pdf" ? readPdfText(filePath) : readText(filePath);

  if (ext === ".pdf" && sha256(filePath) === knownPlaceholderResumeHash) {
    addFinding(hardFindings, "placeholder resume hash", filePath);
  }

  const blockers = [
    ["visible approval TODO", /TODO:\s*Jamie approval required/i],
    ["approval-pending public copy", /approval required before launch|public email pending confirmation/i],
    ["placeholder resume text", /placeholder resume pdf|replace (?:the )?placeholder/i],
    ["Artifact gallery label", /Artifact gallery/i],
    ["raw transcript marker", /(?:otter\.ai|_otter|raw transcript|^\s*[A-Z][A-Za-z .'-]{1,60}\s+\d{1,2}:\d{2}(?::\d{2})?\s*$)/im],
    ["unsupported approved language", /approved public contact links/i],
    ["private source path", /(?:\/Users\/|\/Volumes\/|Library\/Mobile Documents|supporting-materials|job-hunt\/)/i]
  ];

  for (const [label, pattern] of blockers) {
    const match = pattern.exec(source);
    if (match) addFinding(reviewFindings, label, filePath, lineFor(source, match.index));
  }
}

for (const file of allFiles()) {
  scanRepositoryFile(file);
}

for (const root of privatePathScanRoots) {
  const absoluteRoot = path.join(repoRoot, root);
  const scanOne = (filePath) => {
    if (!textExtensions.has(path.extname(filePath).toLowerCase())) return;
    const source = readText(filePath);
    const match = /(?:\/Users\/|\/Volumes\/|Library\/Mobile Documents|supporting-materials|job-hunt\/)/i.exec(source);
    if (match) addFinding(hardFindings, "private local path", filePath, lineFor(source, match.index));
  };

  if (fs.existsSync(absoluteRoot) && fs.statSync(absoluteRoot).isFile()) {
    scanOne(absoluteRoot);
  } else {
    walk(absoluteRoot, scanOne);
  }
}

for (const root of publicRoots) {
  walk(path.join(repoRoot, root), scanPublicFile);
}

function report(label, items) {
  if (!items.length) return;
  console.error(label);
  for (const item of items.slice(0, 80)) {
    console.error(`- ${item.file}:${item.line} - ${item.label}`);
  }
  if (items.length > 80) {
    console.error(`- plus ${items.length - 80} more finding(s)`);
  }
}

if (hardFindings.length) {
  report("Public-safety check failed.", hardFindings);
  process.exit(1);
}

if (reviewFindings.length && productionLike) {
  report("Production public-safety check failed.", reviewFindings);
  process.exit(1);
}

if (reviewFindings.length) {
  report("Public-safety review warnings.", reviewFindings);
  process.exit(0);
}

try {
  execFileSync("git", ["rev-parse", "--is-inside-work-tree"], {
    cwd: repoRoot,
    stdio: "ignore"
  });
} catch {
  console.warn("Skipping git tracked-file verification outside a git worktree.");
}

console.log(`Public-safety scan passed in ${productionLike ? "production" : "non-production"} mode.`);
