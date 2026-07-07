#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import {
  existsSync,
  readdirSync,
  readFileSync,
  statSync
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = new Set(process.argv.slice(2));

const productionLike =
  args.has("--production") ||
  process.env.APP_ENV === "production" ||
  process.env.SITE_ENV === "production" ||
  process.env.NEXT_PUBLIC_DEPLOY_ENV === "production" ||
  process.env.NEXT_PUBLIC_ROBOTS_POLICY === "index";

const publicRoots = [
  "apps/www/src",
  "apps/www/public",
  "apps/www/next.config.ts",
  "apps/www/package.json",
  "package.json"
];

const docsRoots = ["README.md", "docs"];

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
  ".xml"
]);

const fontExtensions = new Set([".otf", ".ttf", ".woff", ".woff2"]);
const suspiciousPublicBinaryExtensions = new Set([
  ".csv",
  ".doc",
  ".docx",
  ".key",
  ".numbers",
  ".pages",
  ".rtf",
  ".xls",
  ".xlsx",
  ".zip"
]);

const ignoredDirectories = new Set([
  ".git",
  ".next",
  "coverage",
  "node_modules",
  "out"
]);

const hardPatterns = [
  {
    label: "private key material",
    pattern: /-----BEGIN (?:RSA |OPENSSH |EC |)?PRIVATE KEY-----/i
  },
  {
    label: "OpenAI key-looking string",
    pattern: /\bsk-(?:proj-)?[A-Za-z0-9_-]{20,}\b/i
  },
  {
    label: "credential-looking assignment",
    pattern: /\b(?:api[_-]?key|client[_-]?secret|password|secret)\s*[:=]\s*["']?[^"'\s]{8,}/i
  },
  {
    label: "token-looking assignment",
    pattern: /\b(?:api|auth|access|bearer|refresh|session)[_-]?\s*token\s*[:=]\s*["']?[^"'\s]{8,}/i
  },
  {
    label: "private local path",
    pattern:
      /\/Users\/jburkart\/|\/Volumes\/|Library\/Mobile Documents|supporting-materials|job-hunt|Jamie Projects History/i
  },
  {
    label: "raw/private source marker",
    pattern:
      /raw Otter|\/client-private\/|\/legal-review\/|\/transcripts-private\/|\/archive-private\//i
  }
];

const productionBlockers = [
  {
    label: "Jamie approval TODO",
    pattern: /TODO:\s*Jamie approval required/i
  },
  {
    label: "placeholder resume text",
    pattern: /Placeholder resume PDF|Replace with approved current resume|replace the placeholder PDF/i
  },
  {
    label: "pending public contact placeholder",
    pattern: /Public email pending confirmation|LinkedIn pending|GitHub pending/i
  },
  {
    label: "private work visibility",
    pattern: /visibility:\s*["']private["']/i
  },
  {
    label: "draft work status",
    pattern: /status:\s*["']Draft["']/i
  },
  {
    label: "unapproved screenshot marker",
    pattern: /unapproved screenshot|screenshots? pending approval/i
  }
];

const warningTerms = [
  "raw transcript",
  "private coalition notes",
  "legal-review",
  "stakeholder list",
  "private correspondence",
  "internal analytics",
  "client-private",
  "raw community records"
];

const resumePath =
  "apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf";

const failures = [];
const warnings = [];
const scannedPdfFiles = new Set();

function toRelative(filePath) {
  return path.relative(repoRoot, filePath).split(path.sep).join("/");
}

function lineNumberFor(source, index) {
  return source.slice(0, index).split(/\r\n|\r|\n/).length;
}

function addFailure(filePath, line, label) {
  failures.push(`${filePath}:${line} - ${label}`);
}

function addWarning(filePath, line, label) {
  warnings.push(`${filePath}:${line} - ${label}`);
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

function collectFiles(target) {
  const absolute = path.join(repoRoot, target);

  if (!existsSync(absolute)) {
    return [];
  }

  const info = statSync(absolute);

  if (info.isFile()) {
    return [absolute];
  }

  const files = [];

  for (const entry of readdirSync(absolute, { withFileTypes: true })) {
    if (entry.isDirectory() && ignoredDirectories.has(entry.name)) {
      continue;
    }

    const child = path.join(absolute, entry.name);

    if (entry.isDirectory()) {
      files.push(...collectFiles(toRelative(child)));
    } else if (entry.isFile()) {
      files.push(child);
    }
  }

  return files;
}

function readText(filePath) {
  return readFileSync(filePath, "utf8");
}

function scanTextFile(filePath, mode) {
  const relativePath = toRelative(filePath);
  const source = readText(filePath);

  for (const check of hardPatterns) {
    const match = check.pattern.exec(source);
    if (match) {
      addFailure(relativePath, lineNumberFor(source, match.index), check.label);
    }
  }

  for (const term of warningTerms) {
    const index = source.toLowerCase().indexOf(term.toLowerCase());
    if (index >= 0) {
      addWarning(relativePath, lineNumberFor(source, index), `review sensitive term: ${term}`);
    }
  }

  if (mode === "docs" && !productionLike) {
    return;
  }

  if (mode === "public" && productionLike) {
    for (const check of productionBlockers) {
      const match = check.pattern.exec(source);
      if (match) {
        addFailure(relativePath, lineNumberFor(source, match.index), check.label);
      }
    }
  }
}

function scanPublicAsset(filePath) {
  const relativePath = toRelative(filePath);
  const ext = path.extname(filePath).toLowerCase();

  if (fontExtensions.has(ext)) {
    addFailure(relativePath, 1, "font file committed or served from public/app source");
    return;
  }

  if (
    relativePath.startsWith("apps/www/public/") &&
    suspiciousPublicBinaryExtensions.has(ext)
  ) {
    addFailure(relativePath, 1, "private-looking binary asset in public directory");
    return;
  }

  if (/screenshot/i.test(relativePath) && !/approved/i.test(relativePath)) {
    if (productionLike) {
      addFailure(relativePath, 1, "unapproved screenshot-looking public asset");
    } else {
      addWarning(relativePath, 1, "review screenshot approval");
    }
  }

  if (textExtensions.has(ext)) {
    scanTextFile(filePath, "public");
  } else if (ext === ".pdf") {
    scanPdfTextAndMetadata(filePath);
  }
}

function extractPdfText(filePath) {
  try {
    return execFileSync("pdftotext", [filePath, "-"], {
      cwd: repoRoot,
      encoding: "utf8",
      maxBuffer: 10 * 1024 * 1024
    });
  } catch {
    addWarning(toRelative(filePath), 1, "pdftotext unavailable or failed; using binary text fallback");
    const buffer = readFileSync(filePath);
    return `${buffer.toString("utf8")}\n${buffer.toString("latin1")}`;
  }
}

function extractPdfInfo(filePath) {
  try {
    return execFileSync("pdfinfo", [filePath], {
      cwd: repoRoot,
      encoding: "utf8",
      maxBuffer: 1024 * 1024
    });
  } catch {
    addWarning(toRelative(filePath), 1, "pdfinfo unavailable or failed; PDF metadata not inspected");
    return "";
  }
}

function scanPdfTextAndMetadata(filePath) {
  const relativePath = toRelative(filePath);

  if (scannedPdfFiles.has(relativePath)) {
    return;
  }

  scannedPdfFiles.add(relativePath);

  const text = extractPdfText(filePath);
  const metadata = extractPdfInfo(filePath);
  const combined = `${text}\n${metadata}`;

  for (const check of hardPatterns) {
    if (check.pattern.test(combined)) {
      addFailure(relativePath, 1, `PDF text or metadata contains ${check.label}`);
    }
  }

  if (productionLike) {
    for (const check of productionBlockers) {
      if (check.pattern.test(combined)) {
        addFailure(relativePath, 1, `PDF text or metadata contains ${check.label}`);
      }
    }
  }

  if (/Placeholder resume PDF|Replace with approved current resume/i.test(combined)) {
    addFailure(relativePath, 1, "PDF still contains placeholder resume text");
  }

  if (/home address|street address/i.test(combined)) {
    addWarning(relativePath, 1, "review PDF for address-like language");
  }
}

function scanResumePdf() {
  const absolute = path.join(repoRoot, resumePath);

  if (!existsSync(absolute)) {
    addFailure(resumePath, 1, "resume PDF is missing");
    return;
  }

  scanPdfTextAndMetadata(absolute);
}

function scanTrackedFiles() {
  for (const file of trackedFiles()) {
    const basename = path.basename(file);
    const ext = path.extname(file).toLowerCase();

    if (fontExtensions.has(ext)) {
      addFailure(file, 1, "tracked font file requires explicit license approval");
    }

    if (basename.startsWith(".env") && basename !== ".env.example") {
      addFailure(file, 1, "committed env file is not allowed");
    }
  }
}

function scanProductionEnvironment() {
  if (!productionLike) {
    return;
  }

  const urls = [
    ["SITE_URL", process.env.SITE_URL],
    ["NEXT_PUBLIC_SITE_URL", process.env.NEXT_PUBLIC_SITE_URL]
  ];

  for (const [name, value] of urls) {
    if (!value) {
      addFailure("environment", 1, `${name} is required for production preflight`);
      continue;
    }

    if (value.replace(/\/$/, "") !== "https://jamieburk.art") {
      addFailure("environment", 1, `${name} must be https://jamieburk.art`);
    }
  }

  if (process.env.NEXT_PUBLIC_ROBOTS_POLICY !== "index") {
    addFailure("environment", 1, "NEXT_PUBLIC_ROBOTS_POLICY must be index for production preflight");
  }
}

scanTrackedFiles();

for (const root of publicRoots) {
  for (const file of collectFiles(root)) {
    scanPublicAsset(file);
  }
}

for (const root of docsRoots) {
  for (const file of collectFiles(root)) {
    if (textExtensions.has(path.extname(file).toLowerCase())) {
      scanTextFile(file, "docs");
    }
  }
}

scanResumePdf();
scanProductionEnvironment();

if (warnings.length) {
  console.warn("Public-safety warnings:");
  for (const warning of warnings.slice(0, 80)) {
    console.warn(`- ${warning}`);
  }
  if (warnings.length > 80) {
    console.warn(`- plus ${warnings.length - 80} more warning(s)`);
  }
}

if (failures.length) {
  console.error("Public-safety blockers:");
  for (const failure of failures.slice(0, 80)) {
    console.error(`- ${failure}`);
  }
  if (failures.length > 80) {
    console.error(`- plus ${failures.length - 80} more blocker(s)`);
  }
  process.exit(1);
}

console.log(
  `Public-safety scan passed in ${productionLike ? "production" : "non-production"} mode.`
);
