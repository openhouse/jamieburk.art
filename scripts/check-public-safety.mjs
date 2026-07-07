#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const args = new Set(process.argv.slice(2));
const productionLike = args.has("--production") || process.env.APP_ENV === "production";

const requiredIgnoreEntries = [
  "*.local",
  "*.private.*",
  "*.pem",
  "*.key",
  "*.p12",
  "*.crt",
  "*.cert",
  "*.kdbx",
  "*.ttf",
  "*.otf",
  "*.woff",
  "*.woff2",
  "private/",
  "_private/",
  "drafts/private/",
  "archive-private/",
  "raw/",
  "raw-otter/",
  "raw-transcripts/",
  "otter/",
  "otter-exports/",
  "transcripts/",
  "transcripts-private/",
  "source-material/",
  "source_material/",
  "gmail/",
  "gdrive/",
  "google-drive/",
  "google-docs/",
  "client-private/",
  "coalition-private/",
  "legal-review/",
  "stakeholders/",
  "internal-analytics/",
  "secrets/",
  "support-private/",
  "screenshots-private/",
  "private-screenshots/",
  "screenshots-unapproved/",
  "job-hunt/",
  "job-hunt-private/",
  "residency-private/",
  "*.env.local"
];

const scanRoots = [
  "apps/www/src",
  "apps/www/public",
  "apps/www/next.config.ts",
  "apps/www/package.json",
  "package.json"
];

const ignoredSegments = new Set([".git", ".next", "node_modules", "coverage", "out"]);
const privatePathPattern =
  /(^|\/)(?:private|_private|archive-private|raw|raw-otter|raw-transcripts|otter|otter-exports|transcripts|transcripts-private|source-material|source_material|gmail|gdrive|google-drive|google-docs|client-private|coalition-private|legal-review|stakeholders|internal-analytics|secrets|support-private|screenshots-private|private-screenshots|screenshots-unapproved|job-hunt|job-hunt-private|residency-private)(\/|$)|\.private\./i;
const textExtensions = new Set([
  ".css",
  ".js",
  ".jsx",
  ".json",
  ".md",
  ".mdx",
  ".mjs",
  ".svg",
  ".ts",
  ".tsx",
  ".txt"
]);

const blockers = [
  ["visible Jamie approval TODO", /TODO:\s*Jamie approval required/i],
  ["private work item visibility", /visibility:\s*["']private["']/i],
  ["draft work item status", /status:\s*["']Draft["']/i],
  ["uppercase private marker", /\bPRIVATE\b/],
  ["uppercase confidential marker", /\bCONFIDENTIAL\b/],
  ["raw Otter marker", /\braw\s+Otter\b|otter\.ai|_otter/i],
  ["raw transcript marker", /\braw\s+transcript\b/i],
  [
    "private folder marker",
    /(?:transcripts-private|archive-private|client-private|coalition-private|legal-review|support-private|job-hunt-private|screenshots-private|screenshots-unapproved|private-screenshots|raw-otter|raw-transcripts|otter-exports|source-material|source_material|internal-analytics|residency-private|\/private\/|\/raw\/|\/client-private\/|\/legal-review\/)/i
  ],
  [
    "credential-looking string",
    /\b(?:api[_-]?key|access[_-]?token|auth[_-]?token|bearer[_-]?token|refresh[_-]?token|session[_-]?token|client[_-]?secret|password|secret)\s*[:=]/i
  ],
  ["private key block", /-----BEGIN (?:RSA |OPENSSH |DSA |EC |PGP )?PRIVATE KEY-----/i],
  [
    "local private source path",
    /\/Volumes\/16TB_SSD\/Work\/Jamie\/Portfolio\/supporting-materials|\/Users\/jburkart\/Library\/Mobile Documents\/com~apple~CloudDocs\/(?:Teams|People)/i
  ]
];

const warnings = [
  ["context word: transcript", /\btranscripts?\b/i],
  ["context word: source", /\bsource\b/i],
  ["context word: archive", /\barchive\b/i],
  ["context word: legal", /\blegal\b/i],
  ["context word: private", /\bprivate\b/i],
  ["context word: protected", /\bprotected\b/i],
  ["context word: redacted", /\bredacted\b/i]
];

const failures = [];
const reviewWarnings = [];
const warningContextPattern =
  /raw|confidential|protected|redacted|public-safe|omitted|publish|private (?:notes|source|archive|records|emails|stakeholder|strategy|community|guest|analytics|materials|dashboards|data)|legal review/i;

function lineFor(content, index) {
  return content.slice(0, index).split("\n").length;
}

function walk(entry) {
  const fullPath = path.join(root, entry);
  if (!existsSync(fullPath)) return [];
  const stat = statSync(fullPath);

  if (stat.isFile()) return [fullPath];
  if (!stat.isDirectory()) return [];

  const files = [];
  for (const child of readdirSync(fullPath)) {
    if (ignoredSegments.has(child)) continue;
    files.push(...walk(path.join(entry, child)));
  }
  return files;
}

function readPdfText(filePath) {
  try {
    return execFileSync("pdftotext", [filePath, "-"], {
      encoding: "utf8",
      maxBuffer: 10 * 1024 * 1024,
      stdio: ["ignore", "pipe", "ignore"]
    });
  } catch {
    reviewWarnings.push(`${path.relative(root, filePath)}: unable to extract PDF text with pdftotext`);
    return "";
  }
}

function readText(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  if (extension === ".pdf") return readPdfText(filePath);
  if (!textExtensions.has(extension)) return "";
  return readFileSync(filePath, "utf8");
}

function warningScanStart(relativePath, content) {
  if (relativePath.startsWith("apps/www/src/types/")) return -1;
  if (relativePath === "apps/www/src/data/work.ts") {
    return content.indexOf("const workItemsInput");
  }
  return 0;
}

function checkIgnoreFile(relativePath) {
  const content = readFileSync(path.join(root, relativePath), "utf8");
  for (const entry of requiredIgnoreEntries) {
    if (!content.split(/\r?\n/).includes(entry)) {
      failures.push(`${relativePath}: missing required ignore entry ${entry}`);
    }
  }
}

function checkTrackedFiles() {
  let tracked = "";
  try {
    tracked = execFileSync("git", ["ls-files"], {
      cwd: root,
      encoding: "utf8",
      maxBuffer: 10 * 1024 * 1024
    });
  } catch {
    reviewWarnings.push("unable to inspect tracked files with git ls-files");
    return;
  }

  for (const relativePath of tracked.split(/\r?\n/).filter(Boolean)) {
    const basename = path.basename(relativePath);
    if (basename.startsWith(".env") && basename !== ".env.example") {
      failures.push(`${relativePath}: tracked env file must not be committed`);
    }
    if (/\.(?:otf|ttf|woff2?)$/i.test(relativePath)) {
      failures.push(`${relativePath}: tracked font file requires explicit approval`);
    }
    if (privatePathPattern.test(relativePath)) {
      failures.push(`${relativePath}: tracked private/source-material path`);
    }
  }
}

checkIgnoreFile(".gitignore");
checkIgnoreFile(".dockerignore");
checkTrackedFiles();

for (const filePath of scanRoots.flatMap(walk)) {
  const relativePath = path.relative(root, filePath);

  if (/\.(?:otf|ttf|woff2?)$/i.test(relativePath)) {
    failures.push(`${relativePath}: tracked font file requires explicit approval`);
  }

  const content = readText(filePath);
  if (!content) continue;

  for (const [label, pattern] of blockers) {
    const match = pattern.exec(content);
    if (match?.index !== undefined) {
      failures.push(`${relativePath}:${lineFor(content, match.index)} ${label}`);
    }
  }

  const placeholderMatch = /placeholder r(?:e|\u00e9)sum(?:e|\u00e9)|replace with approved current resume|replace the placeholder/i.exec(content);
  if (placeholderMatch?.index !== undefined) {
    const message = `${relativePath}:${lineFor(content, placeholderMatch.index)} placeholder resume text`;
    if (productionLike) failures.push(message);
    else reviewWarnings.push(message);
  }

  const warningStart = warningScanStart(relativePath, content);
  if (warningStart >= 0) {
    const warningContent = content.slice(warningStart);
    for (const [label, pattern] of warnings) {
      const flags = pattern.flags.includes("g") ? pattern.flags : `${pattern.flags}g`;
      const scanner = new RegExp(pattern.source, flags);
      let match;
      while ((match = scanner.exec(warningContent))) {
        const index = warningStart + match.index;
        if (warningContextPattern.test(content.slice(Math.max(0, index - 120), index + 120))) {
          reviewWarnings.push(`${relativePath}:${lineFor(content, index)} review ${label}`);
          break;
        }
      }
    }
  }
}

if (reviewWarnings.length > 0) {
  console.warn("Public-safety review warnings:");
  for (const warning of reviewWarnings) console.warn(`- ${warning}`);
}

if (failures.length > 0) {
  console.error("Public-safety blockers:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Public-safety scan passed in ${productionLike ? "production" : "staging"} mode.`);
