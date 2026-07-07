#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const mode =
  process.argv.includes("--production") || process.env.PUBLIC_SAFETY_MODE === "production"
    ? "production"
    : "staging";

const blockers = [];
const warnings = [];

function addBlocker(message) {
  blockers.push(message);
}

function addWarning(message) {
  warnings.push(message);
}

const trackedFiles = execFileSync("git", ["ls-files", "--cached", "--others", "--exclude-standard"], {
  cwd: repoRoot,
  encoding: "utf8"
})
  .split("\n")
  .filter(Boolean);

const privatePathPatterns = [
  "private/",
  "archive-private/",
  "raw/",
  "transcripts-private/",
  "client-private/",
  "legal-review/",
  "supporting-materials/",
  "support-materials-private/",
  "job-hunt/",
  "Jamie Projects History/",
  "screenshots-private/",
  "private-screenshots/",
  "raw-otter/"
];

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
  ".yml",
  ".yaml"
]);

const productionFacingPatterns = [
  /^apps\/www\/src\//,
  /^apps\/www\/public\//,
  /^apps\/www\/mdx-components\.tsx$/,
  /^apps\/www\/next\.config\.ts$/
];

function isProductionFacing(file) {
  return productionFacingPatterns.some((pattern) => pattern.test(file));
}

function textForFile(file) {
  const absolutePath = path.join(repoRoot, file);
  if (!existsSync(absolutePath)) return undefined;

  const ext = path.extname(file).toLowerCase();
  if (ext === ".pdf") {
    try {
      return execFileSync("pdftotext", [absolutePath, "-"], {
        cwd: repoRoot,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"]
      });
    } catch {
      const buffer = readFileSync(absolutePath);
      return `${buffer.toString("utf8")}\n${buffer.toString("latin1")}`;
    }
  }

  if (!textExtensions.has(ext) && path.basename(file) !== ".env.example") {
    return undefined;
  }

  const buffer = readFileSync(absolutePath);
  if (buffer.includes(0)) return undefined;
  return buffer.toString("utf8");
}

function lineNumberFor(text, index) {
  return text.slice(0, index).split(/\r\n|\r|\n/).length;
}

for (const file of trackedFiles) {
  const basename = path.basename(file);

  if (
    privatePathPatterns.some((pattern) => file === pattern.slice(0, -1) || file.startsWith(pattern))
  ) {
    addBlocker(`Tracked private/source-material path is not allowed: ${file}`);
  }

  if (/\.private\./i.test(file)) {
    addBlocker(`Tracked private file pattern is not allowed: ${file}`);
  }

  if (/^\.(env|env\.)/.test(basename) && basename !== ".env.example") {
    addBlocker(`Committed env file is not allowed: ${file}`);
  }

  if (/\.(ttf|otf|woff|woff2)$/i.test(file)) {
    addBlocker(`Tracked font file is not allowed for V1: ${file}`);
  }

  if (/\.(key|pem)$/i.test(file)) {
    addBlocker(`Tracked secret-looking file is not allowed: ${file}`);
  }
}

const hardTextChecks = [
  {
    label: "private key material",
    pattern: /-----BEGIN (?:RSA |OPENSSH |EC |DSA |)?PRIVATE KEY-----/i
  },
  {
    label: "OpenAI key-looking string",
    pattern: /\bsk-(?:proj-)?[A-Za-z0-9_-]{20,}\b/
  },
  {
    label: "AWS key-looking string",
    pattern: /\bAKIA[0-9A-Z]{16}\b/
  },
  {
    label: "GitHub token-looking string",
    pattern: /\bghp_[A-Za-z0-9]{20,}\b/
  },
  {
    label: "credential-looking assignment",
    pattern: /\b(?:AWS_SECRET_ACCESS_KEY|OPENAI_API_KEY|api_key|access_token|auth_token|password|secret)\s*=\s*[^#\s]+/i
  },
  {
    label: "private local source path",
    pattern: /(?:\/Volumes\/16TB_SSD\/Work\/Jamie\/Portfolio\/supporting-materials|\/Users\/jburkart\/Library\/Mobile Documents)/i
  }
];

const publicCopyBlockers = [
  {
    label: "visible Jamie approval TODO",
    pattern: /TODO:\s*Jamie approval required/i
  },
  {
    label: "placeholder resume text",
    pattern: /(?:Placeholder resume PDF|Replace the placeholder PDF|Replace with approved current resume|placeholder resume)/i
  },
  {
    label: "private/proprietary font reference in shipped app code",
    pattern: /\b(?:Trade Gothic|Verlag|Gotham Rounded|RISQUE|RISQU[EÉ]|Maria)\b/i
  },
  {
    label: "raw transcript marker",
    pattern: /(?:otter\.ai|^\s*[A-Z][A-Za-z .'-]{1,60}\s+\d{1,2}:\d{2}(?::\d{2})?\s*$)/im
  }
];

for (const file of trackedFiles) {
  const text = textForFile(file);
  if (!text) continue;

  for (const check of hardTextChecks) {
    const match = check.pattern.exec(text);
    if (match) {
      addBlocker(`${file}:${lineNumberFor(text, match.index)} contains ${check.label}`);
    }
  }

  if (isProductionFacing(file)) {
    for (const check of publicCopyBlockers) {
      const match = check.pattern.exec(text);
      if (match) {
        addBlocker(`${file}:${lineNumberFor(text, match.index)} contains ${check.label}`);
      }
    }
  }
}

const workDataPath = path.join(repoRoot, "apps/www/src/data/work.ts");
if (existsSync(workDataPath)) {
  const workData = readFileSync(workDataPath, "utf8");
  if (/visibility:\s*"private"/.test(workData)) {
    addBlocker("apps/www/src/data/work.ts contains a published item with visibility: private");
  }
  if (/status:\s*"Draft"/.test(workData)) {
    addBlocker("apps/www/src/data/work.ts contains a published item with status: Draft");
  }
}

const resumePath = "apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf";
const resumeAbsolutePath = path.join(repoRoot, resumePath);
const resumeApproved = process.env.NEXT_PUBLIC_RESUME_PDF_APPROVED === "true";

if (!existsSync(resumeAbsolutePath)) {
  const message = `${resumePath} is not installed; PDF download remains approval-gated`;
  if (resumeApproved) addBlocker(message);
  else addWarning(message);
} else {
  const resumeText = textForFile(resumePath) ?? "";
  if (/Placeholder resume PDF|Replace with approved current resume|placeholder resume/i.test(resumeText)) {
    addBlocker(`${resumePath} contains placeholder resume text`);
  }
}

for (const warning of warnings) {
  console.warn(`warning: ${warning}`);
}

if (blockers.length) {
  console.error(`Public-safety check failed in ${mode} mode:`);
  for (const blocker of blockers) console.error(`- ${blocker}`);
  process.exit(1);
}

console.log(`Public-safety check passed in ${mode} mode.`);
