#!/usr/bin/env node

import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const productionLike =
  process.argv.includes("--production") ||
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

const fontExtensions = new Set([".otf", ".ttf", ".woff", ".woff2"]);
const placeholderResumeHashes = new Set([
  "c74cf11cb6d57e3483b3731a0b741da7714a6044588f5f901623a08820db40c4"
]);

const deepScanRoots = [
  "apps/www/src",
  "apps/www/public",
  "package.json",
  "apps/www/package.json",
  "Dockerfile",
  "apps/www/next.config.ts",
  "docs/deployment.md"
];

const docsLightRoots = ["README.md", "AGENTS.md", "docs"];

const allowlist = loadAllowlist();
const failures = [];
const warnings = [];

function loadAllowlist() {
  const allowlistPath = path.join(repoRoot, "config/public-safety-allowlist.json");
  if (!fs.existsSync(allowlistPath)) return [];

  try {
    const parsed = JSON.parse(fs.readFileSync(allowlistPath, "utf8"));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    failures.push("config/public-safety-allowlist.json is not valid JSON.");
    return [];
  }
}

function relative(filePath) {
  return path.relative(repoRoot, filePath);
}

function isIgnored(filePath) {
  return filePath
    .split(path.sep)
    .some((part) => ignoredDirectories.has(part));
}

function walk(filePath) {
  if (!fs.existsSync(filePath) || isIgnored(filePath)) return [];
  const stat = fs.statSync(filePath);

  if (stat.isDirectory()) {
    return fs
      .readdirSync(filePath)
      .flatMap((name) => walk(path.join(filePath, name)));
  }

  return stat.isFile() ? [filePath] : [];
}

function allFiles() {
  return walk(repoRoot);
}

function filesFor(roots) {
  return roots.flatMap((root) => walk(path.join(repoRoot, root)));
}

function readSearchableText(filePath) {
  if (path.extname(filePath).toLowerCase() === ".pdf") {
    const extracted = spawnSync("pdftotext", [filePath, "-"], {
      encoding: "utf8"
    });

    if (extracted.status === 0 && extracted.stdout) {
      return extracted.stdout;
    }
  }

  const buffer = fs.readFileSync(filePath);
  return `${buffer.toString("utf8")}\n${buffer.toString("latin1")}`;
}

function sha256(filePath) {
  return createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

function lineNumberFor(content, index) {
  return content.slice(0, index).split(/\r\n|\r|\n/).length;
}

function addFinding(kind, filePath, label, match = "") {
  const file = relative(filePath);
  const candidate = `${kind}:${file}:${label}:${match}`;
  const allowed = allowlist.some((entry) => {
    if (
      !entry?.pattern ||
      !entry?.reason ||
      !entry?.owner ||
      !entry?.reviewedAt ||
      !entry?.reviewBy
    ) {
      return false;
    }

    try {
      return new RegExp(entry.pattern).test(candidate);
    } catch {
      return false;
    }
  });

  if (allowed) return;
  const target = kind === "warning" ? warnings : failures;
  target.push(`${file} - ${label}${match ? ` (${match})` : ""}`);
}

function scanTextFiles(files, checks, kind = "failure") {
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (!textExtensions.has(ext) && ext !== ".pdf") continue;
    const content = readSearchableText(file);

    for (const check of checks) {
      const match = check.pattern.exec(content);
      if (!match) continue;
      const line = ext === ".pdf" ? "pdf" : lineNumberFor(content, match.index);
      addFinding(kind, file, `${check.label} at ${line}`, match[0].slice(0, 120));
    }
  }
}

for (const file of allFiles()) {
  const rel = relative(file);
  const ext = path.extname(file).toLowerCase();
  const base = path.basename(file);

  if (fontExtensions.has(ext)) {
    addFinding("failure", file, "committed font file");
  }

  if (base.startsWith(".env") && base !== ".env.example") {
    addFinding("failure", file, "non-example env file");
  }

  if (/^apps\/www\/public\//.test(rel) && /(?:otter|transcript)/i.test(base)) {
    addFinding("failure", file, "raw private transcript-looking public asset");
  }
}

const deepFiles = filesFor(deepScanRoots);
const docsLightFiles = filesFor(docsLightRoots);

scanTextFiles(deepFiles, [
  {
    label: "private local source path",
    pattern:
      /(?:\/Volumes\/16TB_SSD\/Work\/Jamie|\/Users\/jburkart\/Library|supporting-materials|job-hunt\/|Jamie Projects History)/i
  },
  {
    label: "private key material",
    pattern: /-----BEGIN (?:RSA |OPENSSH |EC |)?PRIVATE KEY-----/i
  },
  {
    label: "credential-looking assignment",
    pattern:
      /\b(?:api[_-]?key|secret|access[_-]?token|auth[_-]?token|client[_-]?secret|password|passwd)\b\s*[:=]\s*["'][^"']{8,}["']/i
  },
  {
    label: "OpenAI key-looking string",
    pattern: /\bsk-(?:proj-)?[A-Za-z0-9_-]{20,}\b/i
  },
  {
    label: "private font reference in shipped source",
    pattern:
      /(?:@font-face|\/s\/fonts\/|\/fonts\/|Trade Gothic|Verlag|Gotham Rounded|Maria handwriting)/i
  },
  {
    label: "placeholder resume text",
    pattern: /placeholder r(?:e|\u00e9)sum(?:e|\u00e9)|replace the placeholder/i
  }
]);

scanTextFiles(docsLightFiles, [
  {
    label: "private local source path",
    pattern:
      /(?:\/Volumes\/16TB_SSD\/Work\/Jamie|\/Users\/jburkart\/Library|supporting-materials|job-hunt\/|Jamie Projects History)/i
  },
  {
    label: "private key material",
    pattern: /-----BEGIN (?:RSA |OPENSSH |EC |)?PRIVATE KEY-----/i
  },
  {
    label: "credential-looking assignment",
    pattern:
      /\b(?:api[_-]?key|secret|access[_-]?token|auth[_-]?token|client[_-]?secret|password|passwd)\b\s*[:=]\s*["'][^"']{8,}["']/i
  }
]);

const resumePath = path.join(
  repoRoot,
  "apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf"
);

if (!fs.existsSync(resumePath)) {
  failures.push("apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf is missing.");
} else {
  const resumeHash = sha256(resumePath);
  const resumeText = readSearchableText(resumePath);

  if (placeholderResumeHashes.has(resumeHash)) {
    failures.push("Resume PDF matches the known placeholder hash.");
  }

  if (/placeholder r(?:e|\u00e9)sum(?:e|\u00e9)|replace with approved current resume/i.test(resumeText)) {
    failures.push("Resume PDF still contains placeholder resume text.");
  }
}

if (productionLike) {
  scanTextFiles(
    filesFor(["apps/www/src", "apps/www/public"]),
    [
      {
        label: "visible Jamie approval TODO",
        pattern: /TODO:\s*Jamie approval required/i
      },
      {
        label: "placeholder contact label",
        pattern:
          /Public email pending confirmation|LinkedIn pending|GitHub pending|placeholder contact/i
      },
      {
        label: "private visibility state",
        pattern: /visibility\s*:\s*["']private["']/i
      },
      {
        label: "draft work status",
        pattern: /status\s*:\s*["']Draft["']/i
      }
    ]
  );
}

if (warnings.length) {
  console.warn("Public-safety warnings:");
  for (const warning of warnings) console.warn(`- ${warning}`);
}

if (failures.length) {
  console.error("Public-safety check failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Public-safety check passed.");
