#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const productionMode =
  process.argv.includes("--production") ||
  process.env.APP_ENV === "production" ||
  process.env.SITE_ENV === "production" ||
  process.env.NEXT_PUBLIC_DEPLOY_ENV === "production";

const failures = [];
const warnings = [];

const blockedPathPatterns = [
  /(^|\/)private(\/|$)/i,
  /(^|\/)archive-private(\/|$)/i,
  /(^|\/)raw(\/|$)/i,
  /(^|\/)transcripts-private(\/|$)/i,
  /(^|\/)client-private(\/|$)/i,
  /(^|\/)legal-review(\/|$)/i,
  /(^|\/)supporting-materials(\/|$)/i,
  /(^|\/)support-materials-private(\/|$)/i,
  /(^|\/)job-hunt(\/|$)/i,
  /(^|\/)Jamie Projects History(\/|$)/i,
  /(^|\/)screenshots-private(\/|$)/i,
  /(^|\/)private-screenshots(\/|$)/i,
  /(^|\/)raw-otter(\/|$)/i
];

const fontExtensions = new Set([".ttf", ".otf", ".woff", ".woff2"]);
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

const publicTextRoots = [
  "apps/www/src",
  "apps/www/next.config.ts",
  "apps/www/package.json",
  "package.json"
];

const hardTextChecks = [
  ["private key material", /-----BEGIN (?:RSA |OPENSSH |EC |)?PRIVATE KEY-----/i],
  ["OpenAI key-looking string", /\bsk-(?:proj-)?[A-Za-z0-9_-]{20,}\b/i],
  [
    "credential-looking assignment",
    /\b(?:api[_-]?key|client[_-]?secret|password|secret)\s*[:=]\s*["']?[^"'\s]{8,}/i
  ],
  [
    "token-looking assignment",
    /\b(?:api|auth|access|bearer|refresh|session)[_-]?token\s*[:=]\s*["']?[^"'\s]{8,}/i
  ],
  ["private local path", /\/Users\/jburkart\/|\/Volumes\/|Library\/Mobile Documents/i],
  ["visible Jamie approval TODO", /TODO:\s*Jamie approval required/i],
  ["placeholder resume copy", /Placeholder resume PDF|Replace with approved current resume/i]
];

function trackedFiles() {
  return execFileSync("git", ["ls-files"], {
    cwd: repoRoot,
    encoding: "utf8"
  })
    .split("\n")
    .filter(Boolean);
}

function lineNumberFor(source, index) {
  return source.slice(0, index).split(/\r\n|\r|\n/).length;
}

function readIfText(relativePath) {
  const ext = path.extname(relativePath).toLowerCase();

  if (!textExtensions.has(ext)) {
    return null;
  }

  return readFileSync(path.join(repoRoot, relativePath), "utf8");
}

function shouldScanPublicText(relativePath) {
  return publicTextRoots.some((root) => {
    if (root.endsWith(".ts") || root.endsWith(".json")) {
      return relativePath === root;
    }

    return relativePath.startsWith(`${root}/`);
  });
}

for (const file of trackedFiles()) {
  const basename = path.basename(file);
  const ext = path.extname(file).toLowerCase();

  for (const pattern of blockedPathPatterns) {
    if (pattern.test(file)) {
      failures.push(`${file}: tracked private/raw/legal/client path`);
    }
  }

  if (basename.startsWith(".env") && basename !== ".env.example") {
    failures.push(`${file}: tracked env file is not allowed`);
  }

  if (fontExtensions.has(ext)) {
    failures.push(`${file}: private/proprietary font files must not be tracked`);
  }

  if (!shouldScanPublicText(file)) {
    continue;
  }

  const source = readIfText(file);

  if (source === null) {
    continue;
  }

  for (const [label, pattern] of hardTextChecks) {
    const match = pattern.exec(source);
    if (match) {
      failures.push(`${file}:${lineNumberFor(source, match.index)}: ${label}`);
    }
  }

}

const resumePath = path.join(
  repoRoot,
  "apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf"
);

if (!existsSync(resumePath)) {
  warnings.push("approved resume PDF is not installed; production readiness must fail");
} else if (!statSync(resumePath).isFile()) {
  failures.push("resume path exists but is not a file");
} else {
  const resumeText = readFileSync(resumePath).toString("latin1");

  if (/Placeholder resume PDF|Replace with approved current resume/i.test(resumeText)) {
    failures.push("resume PDF contains placeholder resume text");
  }

  if (
    /\b(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/.test(resumeText) &&
    process.env.RESUME_PDF_PHONE_APPROVED !== "true"
  ) {
    failures.push(
      "resume PDF appears to contain a phone number without RESUME_PDF_PHONE_APPROVED=true"
    );
  }
}

if (failures.length) {
  console.error("Public-safety blockers:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

if (warnings.length) {
  console.warn("Public-safety warnings:");
  for (const warning of warnings) {
    console.warn(`- ${warning}`);
  }
}

console.log(`Public-safety scan passed in ${productionMode ? "production" : "non-production"} mode.`);
