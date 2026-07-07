#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = new Set(process.argv.slice(2));
const productionLike =
  args.has("--production") ||
  process.env.APP_ENV === "production" ||
  process.env.SITE_ENV === "production" ||
  process.env.NEXT_PUBLIC_DEPLOY_ENV === "production";

const sourceTextExtensions = new Set([
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

const fontExtensions = new Set([".ttf", ".otf", ".woff", ".woff2"]);
const ignoredDirectories = new Set([
  ".git",
  ".next",
  "coverage",
  "node_modules",
  "out"
]);

const privateDirectoryNames = new Set([
  "private",
  "archive-private",
  "raw",
  "transcripts-private",
  "client-private",
  "legal-review",
  "supporting-materials",
  "job-hunt",
  "Jamie Projects History",
  "private-screenshots",
  "raw-otter",
  "gmail-export",
  "drive-export",
  "otter",
  "financial",
  "health",
  "therapy",
  "resumes-private",
  "screenshots-private"
]);

const launchScanRoots = ["apps/www/src", "apps/www/public"];
const trackedScanRoots = ["apps/www/src", "apps/www/public", "README.md", "AGENTS.md", "docs"];

const launchPatterns = [
  { label: "Jamie approval TODO", pattern: /TODO:\s*Jamie approval required/i },
  { label: "placeholder resume text", pattern: /placeholder r(?:e|\u00e9)sum(?:e|\u00e9)|replace the placeholder/i },
  { label: "pending public email", pattern: /Public email pending confirmation/i },
  { label: "private visibility state", pattern: /visibility\s*:\s*["']private["']/i },
  { label: "draft status state", pattern: /status\s*:\s*["']Draft["']/i },
  { label: "PRIVATE marker", pattern: /\bPRIVATE\b/ },
  { label: "CONFIDENTIAL marker", pattern: /\bCONFIDENTIAL\b/ },
  { label: "raw/private transcript marker", pattern: /\b(?:raw|private)\s+transcripts?\b|\braw\s+Otter\b/i },
  {
    label: "unapproved proof metric",
    pattern:
      /\b14\+|\b2x\s+revenue|\b30\+\s+pages|\b35\+|\broughly\s+35|\b35\s+city|\b300\+\s+gatherings|\b20\+\s+resident/i
  }
];

const hardSecretPatterns = [
  {
    label: "credential-like assignment",
    pattern:
      /\b(?:api[_-]?key|access[_-]?token|auth[_-]?token|bearer[_-]?token|refresh[_-]?token|session[_-]?token|password|secret)\b\s*[:=]\s*["']?[A-Za-z0-9_./+=-]{16,}/i
  },
  {
    label: "OpenAI secret key",
    pattern: /\bsk-(?:proj-)?[A-Za-z0-9_-]{20,}/
  },
  {
    label: "GitHub token",
    pattern: /\bgh[pousr]_[A-Za-z0-9_]{20,}/
  }
];

const failures = [];
const warnings = [];

function toRelative(filePath) {
  return path.relative(repoRoot, filePath);
}

function lineNumberForMatch(source, index) {
  return source.slice(0, index).split("\n").length;
}

function walkFiles(target, callback) {
  if (!existsSync(target)) return;

  const stat = statSync(target);
  if (stat.isFile()) {
    callback(target);
    return;
  }

  for (const entry of readdirSync(target, { withFileTypes: true })) {
    if (entry.isDirectory() && ignoredDirectories.has(entry.name)) continue;
    walkFiles(path.join(target, entry.name), callback);
  }
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

function addFinding(list, label, file, line = 1) {
  list.push(`${label}: ${file}:${line}`);
}

function scanTextFile(filePath, mode) {
  const ext = path.extname(filePath).toLowerCase();
  if (!sourceTextExtensions.has(ext)) return;

  const source = readFileSync(filePath, "utf8");
  const relative = toRelative(filePath);

  for (const blocker of hardSecretPatterns) {
    const match = blocker.pattern.exec(source);
    if (match) {
      addFinding(failures, blocker.label, relative, lineNumberForMatch(source, match.index));
    }
  }

  if (mode !== "launch") return;

  for (const blocker of launchPatterns) {
    const match = blocker.pattern.exec(source);
    if (!match) continue;

    addFinding(
      productionLike ? failures : warnings,
      blocker.label,
      relative,
      lineNumberForMatch(source, match.index)
    );
  }
}

for (const relativeFile of trackedFiles()) {
  const ext = path.extname(relativeFile).toLowerCase();
  if (fontExtensions.has(ext)) {
    addFinding(failures, "tracked font file requires explicit approval", relativeFile);
  }

  if (path.basename(relativeFile).startsWith(".env") && path.basename(relativeFile) !== ".env.example") {
    addFinding(failures, "tracked env file is not allowed", relativeFile);
  }

  if (
    [...privateDirectoryNames].some(
      (directoryName) =>
        relativeFile === directoryName || relativeFile.startsWith(`${directoryName}/`)
    )
  ) {
    addFinding(failures, "tracked private-source path", relativeFile);
  }
}

for (const relativeRoot of trackedScanRoots) {
  const absoluteRoot = path.join(repoRoot, relativeRoot);
  walkFiles(absoluteRoot, (filePath) => scanTextFile(filePath, "tracked"));
}

for (const relativeRoot of launchScanRoots) {
  const absoluteRoot = path.join(repoRoot, relativeRoot);
  walkFiles(absoluteRoot, (filePath) => scanTextFile(filePath, "launch"));
}

const resumePath = path.join(
  repoRoot,
  "apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf"
);

if (!existsSync(resumePath)) {
  addFinding(failures, "resume PDF is missing", toRelative(resumePath));
} else {
  const bytes = readFileSync(resumePath);
  const searchable = `${bytes.toString("utf8")}\n${bytes.toString("latin1")}`;
  if (
    /Placeholder resume PDF/i.test(searchable) ||
    /Replace with approved current resume/i.test(searchable)
  ) {
    addFinding(productionLike ? failures : warnings, "resume PDF is still placeholder", toRelative(resumePath));
  }
}

if (failures.length) {
  console.error("Public-safety blockers found:");
  for (const failure of failures) console.error(`- ${failure}`);
}

if (warnings.length) {
  console.warn("Public-safety warnings found:");
  for (const warning of warnings) console.warn(`- ${warning}`);
}

if (failures.length) process.exit(1);

console.log(
  `Public-safety scan completed in ${productionLike ? "production" : "staging"} mode.`
);
