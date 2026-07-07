#!/usr/bin/env node

import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
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

const appRoots = [
  "apps/www/src",
  "apps/www/public",
  "apps/www/next.config.ts",
  "apps/www/package.json",
  "package.json",
  "Dockerfile",
  ".env.example"
];
const docsRoots = ["README.md", "AGENTS.md", "DESIGN.md", "docs"];
const failures = [];
const warnings = [];

function relative(filePath) {
  return path.relative(repoRoot, filePath);
}

function isIgnored(filePath) {
  return filePath.split(path.sep).some((part) => ignoredDirectories.has(part));
}

function walk(filePath) {
  if (!fs.existsSync(filePath) || isIgnored(filePath)) return [];
  const stat = fs.statSync(filePath);
  if (stat.isDirectory()) {
    return fs.readdirSync(filePath).flatMap((name) => walk(path.join(filePath, name)));
  }
  return stat.isFile() ? [filePath] : [];
}

function filesFor(roots) {
  return roots.flatMap((root) => walk(path.join(repoRoot, root)));
}

function allFiles() {
  return walk(repoRoot);
}

function readSearchableText(filePath) {
  if (path.extname(filePath).toLowerCase() === ".pdf") {
    const extracted = spawnSync("pdftotext", [filePath, "-"], {
      encoding: "utf8"
    });
    if (extracted.status === 0 && extracted.stdout) return extracted.stdout;
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
  const message = `${relative(filePath)} - ${label}${match ? ` (${match})` : ""}`;
  if (kind === "warning") warnings.push(message);
  else failures.push(message);
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

  if (fontExtensions.has(ext)) addFinding("failure", file, "committed font file");
  if (base.startsWith(".env") && base !== ".env.example") {
    addFinding("failure", file, "non-example env file");
  }
  if (/^apps\/www\/public\//.test(rel) && /(?:otter|transcript)/i.test(base)) {
    addFinding("failure", file, "raw private transcript-looking public asset");
  }
  if (
    /(^|\/)(private|_private|archive-private|raw|raw-transcripts|transcripts-private|otter|gmail|gdrive|google-drive|google-docs|client-private|coalition-private|legal-review|stakeholders|internal-analytics|screenshots-unapproved|support-materials-private)(\/|$)/i.test(
      rel
    )
  ) {
    addFinding("failure", file, "tracked private-source directory");
  }
}

scanTextFiles(filesFor(appRoots), [
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
      /(?:@font-face|\/s\/fonts\/|\/fonts\/|Trade Gothic|Verlag|Gotham Rounded|FondFont RISQUE|Maria handwriting)/i
  },
  {
    label: "placeholder resume text",
    pattern: /placeholder r(?:e|\u00e9)sum(?:e|\u00e9)|replace with approved current resume|replace the placeholder/i
  },
  {
    label: "raw transcript marker in public app surface",
    pattern: /(?:raw transcripts?|Otter transcript|otter\.ai)/i
  }
]);

scanTextFiles(filesFor(docsRoots), [
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

const siteUrlSource = fs.readFileSync(
  path.join(repoRoot, "apps/www/src/lib/site-url.ts"),
  "utf8"
);
if (!siteUrlSource.includes('process.env.NEXT_PUBLIC_ROBOTS_POLICY === "index"')) {
  failures.push("Production indexing must require NEXT_PUBLIC_ROBOTS_POLICY === \"index\".");
}

const workSource = fs.readFileSync(path.join(repoRoot, "apps/www/src/data/work.ts"), "utf8");
if (/visibility\s*:\s*["']private["']/i.test(workSource)) {
  failures.push("apps/www/src/data/work.ts contains publishable private visibility.");
}
if (/status\s*:\s*["']Draft["']/i.test(workSource)) {
  failures.push("apps/www/src/data/work.ts contains publishable Draft status.");
}

if (productionLike) {
  scanTextFiles(filesFor(["apps/www/src", "apps/www/public"]), [
    {
      label: "visible Jamie approval TODO",
      pattern: /TODO:\s*Jamie approval required/i
    },
    {
      label: "placeholder contact label",
      pattern:
        /Public email pending confirmation|LinkedIn pending|GitHub pending|placeholder contact/i
    }
  ]);
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
