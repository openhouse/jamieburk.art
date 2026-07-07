#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = new Set(process.argv.slice(2));

const productionLike =
  args.has("--production") ||
  process.env.APP_ENV === "production" ||
  process.env.SITE_ENV === "production" ||
  process.env.NEXT_PUBLIC_DEPLOY_ENV === "production";

const placeholderResumeHash =
  "c74cf11cb6d57e3483b3731a0b741da7714a6044588f5f901623a08820db40c4";

const resumePath = path.join(
  repoRoot,
  "apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf"
);

const ignoredDirs = new Set([
  ".git",
  ".next",
  ".turbo",
  "coverage",
  "node_modules",
  "out"
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
  ".yml",
  ".yaml"
]);

const fontExtensions = new Set([".ttf", ".otf", ".woff", ".woff2"]);

const appPublicRoots = ["apps/www/src", "apps/www/public"];

const repoPolicyRoots = [
  "apps/www",
  "docs",
  "AGENTS.md",
  "README.md",
  "PRODUCT.md",
  "Dockerfile",
  "package.json",
  ".env.example"
];

const hardTextChecks = [
  {
    label: "private local path",
    pattern:
      /(?:\/Volumes\/16TB_SSD\/Work\/Jamie|\/Users\/jburkart\/Library\/Mobile Documents|supporting-materials|\/job-hunt\/|iMessage\/)/i
  },
  {
    label: "password assignment",
    pattern: /\b(?:password|passwd)\s*[:=]\s*["'][^"']+["']/i
  },
  {
    label: "secret assignment",
    pattern:
      /\b(?:api[_-]?key|secret|access[_-]?token|auth[_-]?token|client[_-]?secret)\s*[:=]\s*["'][^"']{8,}["']/i
  },
  {
    label: "private key material",
    pattern: /-----BEGIN (?:RSA |OPENSSH |EC |)?PRIVATE KEY-----/i
  },
  {
    label: "OpenAI key-looking string",
    pattern: /\bsk-(?:proj-)?[A-Za-z0-9_-]{20,}\b/i
  }
];

const approvalChecks = [
  {
    label: "visible approval TODO",
    pattern: /TODO:\s*Jamie approval required/i
  },
  {
    label: "pending approval language",
    pattern: /\b(?:pending final approval|approval pending|pending Jamie approval|screenshots pending|citation pending)\b/i
  },
  {
    label: "placeholder launch language",
    pattern:
      /\b(?:placeholder resume pdf|replace the placeholder|public email pending confirmation|LinkedIn pending|GitHub pending)\b/i
  },
  {
    label: "phone number in website text",
    pattern: /\b(?:\(\d{3}\)\s*|\d{3}[-. ])\d{3}[-. ]\d{4}\b/
  },
  {
    label: "raw transcript marker",
    pattern: /(?:otter\.ai|_otter|raw transcript|^\s*[A-Z][A-Za-z .'-]{1,60}\s+\d{1,2}:\d{2}(?::\d{2})?\s*$)/im
  },
  {
    label: "private source-material marker",
    pattern:
      /\b(?:private coalition notes|legal-review materials|private stakeholder lists|internal analytics|client-private materials|raw community records)\b/i
  }
];

const hardFailures = [];
const approvalFindings = [];

function relative(filePath) {
  return path.relative(repoRoot, filePath) || ".";
}

function lineFor(source, index) {
  return source.slice(0, index).split(/\r\n|\r|\n/).length;
}

function walk(rootPath, callback) {
  if (!fs.existsSync(rootPath)) return;
  const stat = fs.statSync(rootPath);

  if (stat.isFile()) {
    callback(rootPath);
    return;
  }

  for (const entry of fs.readdirSync(rootPath, { withFileTypes: true })) {
    if (entry.isDirectory() && ignoredDirs.has(entry.name)) continue;
    walk(path.join(rootPath, entry.name), callback);
  }
}

function scanTextFile(filePath, checks, target) {
  const ext = path.extname(filePath).toLowerCase();
  if (!textExtensions.has(ext)) return;

  const source = fs.readFileSync(filePath, "utf8");

  for (const check of checks) {
    const match = check.pattern.exec(source);
    if (!match) continue;

    target.push({
      label: check.label,
      file: relative(filePath),
      line: lineFor(source, match.index)
    });
  }
}

function scanHardFileRules(filePath) {
  const rel = relative(filePath);
  const ext = path.extname(filePath).toLowerCase();
  const base = path.basename(filePath);

  if (fontExtensions.has(ext)) {
    hardFailures.push({ label: "private/proprietary font file committed", file: rel, line: 1 });
  }

  if (base.startsWith(".env") && base !== ".env.example") {
    hardFailures.push({ label: "committed environment file", file: rel, line: 1 });
  }

  scanTextFile(filePath, hardTextChecks, hardFailures);
}

function readPdfText(filePath) {
  try {
    return execFileSync("pdftotext", [filePath, "-"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"]
    });
  } catch {
    const buffer = fs.readFileSync(filePath);
    return `${buffer.toString("utf8")}\n${buffer.toString("latin1")}`;
  }
}

function scanResume() {
  if (!fs.existsSync(resumePath)) {
    hardFailures.push({ label: "resume PDF is missing", file: relative(resumePath), line: 1 });
    return;
  }

  const buffer = fs.readFileSync(resumePath);
  const hash = crypto.createHash("sha256").update(buffer).digest("hex");

  if (hash === placeholderResumeHash) {
    hardFailures.push({
      label: "resume PDF is the known placeholder",
      file: relative(resumePath),
      line: 1
    });
  }

  const text = readPdfText(resumePath);
  if (/Placeholder resume PDF|Replace with approved current resume/i.test(text)) {
    hardFailures.push({
      label: "resume PDF contains placeholder text",
      file: relative(resumePath),
      line: 1
    });
  }

  if (/unapproved resume|approval required/i.test(text)) {
    approvalFindings.push({
      label: "resume PDF contains approval-required marker",
      file: relative(resumePath),
      line: 1
    });
  }
}

for (const root of repoPolicyRoots) {
  walk(path.join(repoRoot, root), scanHardFileRules);
}

for (const root of appPublicRoots) {
  walk(path.join(repoRoot, root), (filePath) => {
    scanTextFile(filePath, approvalChecks, approvalFindings);
  });
}

scanResume();

function report(items) {
  for (const item of items.slice(0, 80)) {
    console.error(`- ${item.label}: ${item.file}:${item.line}`);
  }

  if (items.length > 80) {
    console.error(`- plus ${items.length - 80} more finding(s)`);
  }
}

if (hardFailures.length) {
  console.error("Public-safety check failed on hard blockers:");
  report(hardFailures);
  process.exit(1);
}

if (approvalFindings.length && productionLike) {
  console.error("Production-safety check failed on approval blockers:");
  report(approvalFindings);
  process.exit(1);
}

if (approvalFindings.length) {
  console.warn("Public-safety staging scan found approval blockers:");
  report(approvalFindings);
  console.warn("Allowed in staging mode; production-safety will fail until resolved.");
}

console.log(
  `Public-safety scan completed in ${productionLike ? "production" : "staging"} mode.`
);
