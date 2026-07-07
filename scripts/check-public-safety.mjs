#!/usr/bin/env node

import { execFileSync } from "node:child_process";
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

const placeholderResumeHash =
  "c74cf11cb6d57e3483b3731a0b741da7714a6044588f5f901623a08820db40c4";
const resumePath =
  "apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf";

const sourceExtensions = new Set([
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

const fontExtensions = new Set([".ttf", ".otf", ".woff", ".woff2"]);
const publicScanRoots = [
  "apps/www/src",
  "apps/www/public"
];
const docsScanRoots = ["docs"];
const privateDirectoryPrefixes = [
  "private/",
  "_private/",
  "drafts/private/",
  "raw/",
  "source-material/",
  "source_material/",
  "transcripts/",
  "transcripts-private/",
  "otter/",
  "gmail/",
  "gdrive/",
  "google-drive/",
  "google-docs/",
  "client-private/",
  "coalition-private/",
  "legal-review/",
  "stakeholders/",
  "internal-analytics/",
  "secrets/"
];

const hardTextPatterns = [
  {
    label: "visible Jamie approval TODO",
    pattern: /TODO:\s*Jamie approval required/i
  },
  {
    label: "placeholder resume language",
    pattern: /placeholder resume|replace the placeholder PDF|replace with approved current resume/i
  },
  {
    label: "known private local path",
    pattern: /(?:\/Volumes\/|\/Users\/[^/]+\/|Library\/Mobile Documents|supporting[-_ ]materials|job[-_ ]hunt\/)/i
  },
  {
    label: "OpenAI key-looking string",
    pattern: /\bsk-(?:proj-)?[A-Za-z0-9_-]{20,}\b/
  },
  {
    label: "GitHub token-looking string",
    pattern: /\bghp_[A-Za-z0-9_]{20,}\b/
  },
  {
    label: "secret-looking assignment",
    pattern: /\b(?:api[_-]?key|secret|token|password|client[_-]?secret)\s*[:=]\s*["'][^"']{8,}["']/i
  },
  {
    label: "private key material",
    pattern: /-----BEGIN (?:RSA |OPENSSH |EC |)?PRIVATE KEY-----/i
  }
];

const publicOnlyPatterns = [
  {
    label: "raw transcript marker",
    pattern: /(?:otter\.ai|_otter|raw transcript|^\s*[A-Z][A-Za-z .'-]{1,60}\s+\d{1,2}:\d{2}(?::\d{2})?\s*$)/im
  }
];

const docHardPatterns = hardTextPatterns.filter((check) =>
  [
    "known private local path",
    "OpenAI key-looking string",
    "GitHub token-looking string",
    "secret-looking assignment",
    "private key material"
  ].includes(check.label)
);

const failures = [];
const warnings = [];

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
  const absoluteRoot = path.join(repoRoot, root);
  if (!existsSync(absoluteRoot)) return;

  for (const entry of readdirSync(absoluteRoot, { withFileTypes: true })) {
    const fullPath = path.join(absoluteRoot, entry.name);

    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === ".next") continue;
      walkFiles(toRelative(fullPath), callback);
      continue;
    }

    if (entry.isFile()) callback(fullPath);
  }
}

function lineNumberForMatch(source, index) {
  return source.slice(0, index).split(/\r\n|\r|\n/).length;
}

function scanTextFile(filePath, patterns, mode) {
  const ext = path.extname(filePath).toLowerCase();
  if (!sourceExtensions.has(ext)) return;

  const source = readFileSync(filePath, "utf8");
  const relative = toRelative(filePath);

  for (const check of patterns) {
    const match = check.pattern.exec(source);
    if (match) {
      const message = `${relative}:${lineNumberForMatch(source, match.index)} ${check.label}`;
      if (mode === "warn") {
        warnings.push(message);
      } else {
        failures.push(message);
      }
    }
  }
}

function sha256(filePath) {
  return createHash("sha256").update(readFileSync(filePath)).digest("hex");
}

function extractPdfText(filePath) {
  try {
    return execFileSync("pdftotext", [filePath, "-"], {
      cwd: repoRoot,
      encoding: "utf8",
      maxBuffer: 10 * 1024 * 1024
    });
  } catch {
    const buffer = readFileSync(filePath);
    return `${buffer.toString("utf8")}\n${buffer.toString("latin1")}`;
  }
}

function scanResume() {
  const absoluteResume = path.join(repoRoot, resumePath);

  if (!existsSync(absoluteResume)) {
    if (productionLike) failures.push(`${resumePath} is missing.`);
    return;
  }

  if (sha256(absoluteResume) === placeholderResumeHash) {
    failures.push(`${resumePath} is still the known placeholder PDF.`);
  }

  const text = extractPdfText(absoluteResume);
  if (/Placeholder resume PDF|Replace with approved current resume|TODO:\s*Jamie approval/i.test(text)) {
    failures.push(`${resumePath} contains placeholder or approval TODO language.`);
  }
}

function extractWorkItemObjects(content) {
  const startMarker = "const workItemsInput = [";
  const start = content.indexOf(startMarker);
  if (start === -1) return [];

  const arrayStart = content.indexOf("[", start);
  const arrayEnd = content.indexOf("\n] satisfies WorkMeta[]", arrayStart);
  if (arrayStart === -1 || arrayEnd === -1) return [];

  const arrayContent = content.slice(arrayStart + 1, arrayEnd);
  const objects = [];
  let depth = 0;
  let objectStart = -1;
  let quote = null;
  let escaped = false;

  for (let index = 0; index < arrayContent.length; index += 1) {
    const character = arrayContent[index];

    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (character === "\\") {
        escaped = true;
      } else if (character === quote) {
        quote = null;
      }
      continue;
    }

    if (character === "\"" || character === "'" || character === "`") {
      quote = character;
      continue;
    }

    if (character === "{") {
      if (depth === 0) objectStart = index;
      depth += 1;
    } else if (character === "}") {
      depth -= 1;
      if (depth === 0 && objectStart !== -1) {
        objects.push(arrayContent.slice(objectStart, index + 1));
        objectStart = -1;
      }
    }
  }

  return objects;
}

function readWorkItemLabel(objectText, fallback) {
  return (
    objectText.match(/title:\s*"([^"]+)"/)?.[1] ??
    objectText.match(/slug:\s*"([^"]+)"/)?.[1] ??
    fallback
  );
}

function scanWorkItems() {
  if (!productionLike) return;

  const workPath = path.join(repoRoot, "apps/www/src/data/work.ts");
  if (!existsSync(workPath)) return;

  const content = readFileSync(workPath, "utf8");
  const objects = extractWorkItemObjects(content);

  objects.forEach((objectText, index) => {
    const label = readWorkItemLabel(objectText, `work item ${index + 1}`);

    if (/visibility:\s*"private"/.test(objectText)) {
      failures.push(`apps/www/src/data/work.ts has private published work item: ${label}`);
    }

    if (/status:\s*"Draft"/.test(objectText)) {
      failures.push(`apps/www/src/data/work.ts has draft published work item: ${label}`);
    }

    if (/currentStatus:\s*"Draft/i.test(objectText) || /contentState:\s*"Draft/i.test(objectText)) {
      failures.push(`apps/www/src/data/work.ts has draft content state: ${label}`);
    }
  });
}

function scanEnvironment() {
  if (!productionLike) return;

  if (process.env.NEXT_PUBLIC_ROBOTS_POLICY !== "index") {
    failures.push("NEXT_PUBLIC_ROBOTS_POLICY must be index for production indexing.");
  }

  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();
  if (!contactEmail) {
    failures.push("NEXT_PUBLIC_CONTACT_EMAIL is required in production mode.");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail)) {
    failures.push("NEXT_PUBLIC_CONTACT_EMAIL must be a valid email address.");
  }
}

const tracked = trackedFiles();

for (const file of tracked) {
  const ext = path.extname(file).toLowerCase();
  const basename = path.basename(file);

  if (fontExtensions.has(ext)) {
    failures.push(`${file} is a committed font file.`);
  }

  if (basename.startsWith(".env") && basename !== ".env.example") {
    failures.push(`${file} is a committed env file.`);
  }

  if (privateDirectoryPrefixes.some((prefix) => file.startsWith(prefix))) {
    failures.push(`${file} is inside a private/source directory.`);
  }
}

for (const root of publicScanRoots) {
  walkFiles(root, (filePath) => {
    scanTextFile(filePath, hardTextPatterns, "fail");
    scanTextFile(filePath, publicOnlyPatterns, "fail");
  });
}

for (const root of docsScanRoots) {
  walkFiles(root, (filePath) => {
    scanTextFile(filePath, docHardPatterns, "fail");
  });
}

scanResume();
scanWorkItems();
scanEnvironment();

if (warnings.length) {
  console.warn("Public-safety warnings:");
  for (const warning of warnings) console.warn(`- ${warning}`);
}

if (failures.length) {
  console.error("Public-safety check failed:");
  for (const failure of [...new Set(failures)]) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Public-safety scan passed in ${productionLike ? "production" : "non-production"} mode.`);
