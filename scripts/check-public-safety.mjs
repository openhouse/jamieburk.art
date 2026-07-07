#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const production = process.argv.includes("--production");
const blockers = [];
const warnings = [];
const docsProtectedPolicyFiles = new Set();

const skippedDirs = new Set([
  ".git",
  ".next",
  ".npm-cache",
  ".turbo",
  "coverage",
  "node_modules",
  "out"
]);

const blockedPathSegments = new Set([
  "archive-private",
  "client-private",
  "legal-review",
  "private",
  "raw",
  "raw-transcripts",
  "support-materials-private",
  "transcripts-private"
]);

const textExtensions = new Set([
  ".css",
  ".html",
  ".js",
  ".jsx",
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

const fontExtensions = new Set([".eot", ".otf", ".ttf", ".woff", ".woff2"]);
const publicAppPattern = /^(apps\/www\/src|apps\/www\/public)\//;
const publicSourcePattern = /^apps\/www\/src\//;
const docsPattern = /^(docs|README\.md|AGENTS\.md|DESIGN\.md)\b/;
const toolingPattern = /^scripts\//;
const placeholderResumeHashes = new Set([
  "c74cf11cb6d57e3483b3731a0b741da7714a6044588f5f901623a08820db40c4"
]);

const files = [];

function relative(filePath) {
  return path.relative(root, filePath).split(path.sep).join("/");
}

function walk(dir) {
  if (!existsSync(dir)) return;

  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (skippedDirs.has(entry.name)) continue;
    const absolute = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(absolute);
      continue;
    }

    if (entry.isFile()) files.push(absolute);
  }
}

function addBlocker(file, message) {
  blockers.push(`${file}: ${message}`);
}

function addWarning(file, message) {
  warnings.push(`${file}: ${message}`);
}

function readText(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!textExtensions.has(ext) && path.basename(filePath) !== ".env.example") {
    return undefined;
  }

  const buffer = readFileSync(filePath);
  if (buffer.includes(0)) return undefined;
  return buffer.toString("utf8");
}

function sha256(filePath) {
  return createHash("sha256").update(readFileSync(filePath)).digest("hex");
}

function readPdfText(filePath) {
  try {
    return execFileSync("pdftotext", ["-layout", filePath, "-"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"]
    });
  } catch {
    return readFileSync(filePath).toString("latin1");
  }
}

function reportResumeIssue(file, message) {
  if (production) addBlocker(file, message);
  else addWarning(file, message);
}

function checkPath(filePath) {
  const rel = relative(filePath);
  const segments = rel.split("/");
  const ext = path.extname(rel).toLowerCase();
  const base = path.basename(rel);

  if (segments.some((segment) => blockedPathSegments.has(segment))) {
    addBlocker(rel, "file is inside a private/protected source-material path");
  }

  if (base.startsWith(".env") && base !== ".env.example") {
    addBlocker(rel, "tracked environment files are not public-safe");
  }

  if (rel.includes(".private.")) {
    addBlocker(rel, "private-named files must stay out of the repo");
  }

  if (fontExtensions.has(ext)) {
    addBlocker(rel, "local font files must not be committed for V1");
  }

  if (/\.(pem|p12|pfx|key)$/i.test(rel)) {
    addBlocker(rel, "key or certificate material must not be committed");
  }
}

function checkText(filePath, text) {
  const rel = relative(filePath);
  const publicApp = publicAppPattern.test(rel);
  const publicSource = publicSourcePattern.test(rel);
  const docs = docsPattern.test(rel);

  const blockerPatterns = [
    [/\/Volumes\/16TB_SSD\/Work\/Jamie/i, "private local Work/Jamie path"],
    [/\/Users\/jburkart\/Library\/Mobile Documents/i, "private local iCloud path"],
    [/\/Users\/jburkart\/Documents\/sites/i, "private local sites path"],
    [/-----BEGIN (RSA |OPENSSH |EC |DSA )?PRIVATE KEY-----/, "private key material"],
    [/\bsk-proj-[A-Za-z0-9_-]{16,}/, "OpenAI project key-looking string"],
    [/\bsk-[A-Za-z0-9]{24,}/, "OpenAI key-looking string"],
    [/\bAKIA[0-9A-Z]{16}\b/, "AWS access key-looking string"],
    [/\bghp_[A-Za-z0-9]{24,}\b/, "GitHub token-looking string"],
    [/\bOPENAI_API_KEY\s*=\s*[^#\s]+/, "non-empty OPENAI_API_KEY assignment"],
    [/\b(?:password|passwd)\s*[:=]\s*["'][^"']+["']/i, "password assignment"],
    [/\b(?:api[_-]?key|secret|access[_-]?token|auth[_-]?token|client[_-]?secret)\s*[:=]\s*["'][^"']{8,}["']/i, "secret assignment"]
  ];

  for (const [pattern, message] of blockerPatterns) {
    if (pattern.test(text)) addBlocker(rel, message);
  }

  if (production && publicSource && /TODO:\s*Jamie approval required/i.test(text)) {
    addBlocker(rel, "visible approval TODO remains in production-facing app source");
  }

  if (publicSource && /\b(?:\(\d{3}\)\s*|\d{3}[-. ])\d{3}[-. ]\d{4}\b/.test(text)) {
    addBlocker(rel, "phone number appears in website source");
  }

  if (
    production &&
    publicSource &&
    /\b(?:pending final approval|approval pending|pending Jamie approval|screenshots pending|citation pending|placeholder resume|replace the placeholder)\b/i.test(text)
  ) {
    addBlocker(rel, "approval or placeholder language remains in production-facing app source");
  }

  if (
    publicApp &&
    /\b(raw transcript|legal-review materials|private coalition notes|private stakeholder lists|internal analytics|raw community records)\b/i.test(text)
  ) {
    addWarning(rel, "protected-category language appears in app/public files; confirm it is a boundary note, not source material");
  }

  if (
    docs &&
    /\b(raw transcripts?|legal-review materials?|private coalition notes?|protected material|private stakeholder lists?)\b/i.test(text)
  ) {
    docsProtectedPolicyFiles.add(rel);
  }

  if (
    !docs &&
    !toolingPattern.test(rel) &&
    /\b(raw transcript|otter\.ai transcript|speaker \d+:|legal review)\b/i.test(text)
  ) {
    addBlocker(rel, "raw transcript or legal-review marker appears outside policy docs");
  }
}

function checkPdf(filePath) {
  const rel = relative(filePath);
  const hash = sha256(filePath);

  if (placeholderResumeHashes.has(hash)) {
    reportResumeIssue(rel, "known placeholder PDF hash is still present");
  }

  const text = readPdfText(filePath);
  if (/Placeholder Resume PDF|Replace with approved current resume/i.test(text)) {
    reportResumeIssue(rel, "placeholder resume PDF text is still present");
  }

  if (rel.startsWith("apps/www/public/") && /\b(raw transcript|legal-review|private coalition)\b/i.test(text)) {
    addBlocker(rel, "public PDF appears to contain protected source-material text");
  }
}

walk(root);

for (const filePath of files) {
  checkPath(filePath);
  const text = readText(filePath);
  if (text !== undefined) checkText(filePath, text);
  if (path.extname(filePath).toLowerCase() === ".pdf") checkPdf(filePath);
}

if (docsProtectedPolicyFiles.size > 0) {
  addWarning(
    "documentation",
    `protected-category policy examples appear in ${docsProtectedPolicyFiles.size} documentation file(s)`
  );
}

const resumePath = path.join(
  root,
  "apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf"
);

if (!existsSync(resumePath)) {
  reportResumeIssue(
    "apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf",
    "resume PDF is missing"
  );
}

for (const warning of warnings) {
  console.warn(`warning: ${warning}`);
}

if (blockers.length > 0) {
  console.error("Public-safety check failed:");
  for (const blocker of blockers) console.error(`- ${blocker}`);
  process.exit(1);
}

console.log(`Public-safety check passed${production ? " for production" : ""}.`);
