#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const failures = [];
const warnings = [];

const ignoredDirs = new Set([
  ".git",
  ".next",
  ".turbo",
  "coverage",
  "dist",
  "node_modules"
]);

const textExtensions = new Set([
  ".css",
  ".example",
  ".html",
  ".js",
  ".json",
  ".jsx",
  ".md",
  ".mdx",
  ".mjs",
  ".ts",
  ".tsx",
  ".txt",
  ".yaml",
  ".yml"
]);

const privatePathPattern =
  /(^|\/)(private|archive-private|raw|raw-otter|transcripts-private|client-private|legal-review|support-private|support-materials-private|job-hunt-private|screenshots-private|private-screenshots|resumes-private|supporting-materials)(\/|$)/i;
const fontExtensions = new Set([".eot", ".otf", ".ttf", ".woff", ".woff2"]);

const isProduction =
  process.env.APP_ENV === "production" ||
  process.env.SITE_ENV === "production" ||
  process.env.NEXT_PUBLIC_DEPLOY_ENV === "production" ||
  process.env.NODE_ENV === "production";

const resumePath = path.join(
  repoRoot,
  "apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf"
);

function walk(dir) {
  if (!existsSync(dir)) return [];

  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const absolute = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (!ignoredDirs.has(entry.name)) files.push(...walk(absolute));
      continue;
    }

    if (entry.isFile()) files.push(absolute);
  }

  return files;
}

function relative(file) {
  return path.relative(repoRoot, file);
}

function addFailure(file, message, line) {
  failures.push(`${relative(file)}${line ? `:${line}` : ""} - ${message}`);
}

function addWarning(file, message, line) {
  warnings.push(`${relative(file)}${line ? `:${line}` : ""} - ${message}`);
}

function lineForMatch(content, index) {
  return content.slice(0, index).split("\n").length;
}

function readText(file) {
  return readFileSync(file, "utf8");
}

function scanPattern(files, label, pattern, severity = "failure") {
  for (const file of files) {
    const content = readText(file);
    const match = pattern.exec(content);

    if (match?.index !== undefined) {
      const line = lineForMatch(content, match.index);
      if (severity === "warning") addWarning(file, label, line);
      else addFailure(file, label, line);
    }
  }
}

function pdftotext(file) {
  try {
    return execFileSync("pdftotext", [file, "-"], {
      cwd: repoRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"]
    });
  } catch {
    addWarning(file, "pdftotext unavailable or failed; using binary string fallback");
    return readFileSync(file).toString("latin1");
  }
}

try {
  execFileSync(process.execPath, [path.join(repoRoot, "scripts/check-knowledge-bank.mjs")], {
    cwd: repoRoot,
    stdio: "inherit"
  });
} catch {
  failures.push("scripts/check-knowledge-bank.mjs - knowledge-bank gate failed");
}

const allFiles = walk(repoRoot);
const textFiles = allFiles.filter((file) => textExtensions.has(path.extname(file)));
const shippedTextFiles = textFiles.filter((file) => {
  const rel = relative(file);
  return (
    rel.startsWith("apps/www/src/") ||
    rel.startsWith("apps/www/public/") ||
    rel === "apps/www/next.config.ts" ||
    rel === "apps/www/mdx-components.tsx" ||
    rel === "Dockerfile"
  );
});

const scannerFiles = new Set([
  path.join(repoRoot, "scripts/check-public-safety.mjs"),
  path.join(repoRoot, "scripts/check-knowledge-bank.mjs")
]);
const shippedContentFiles = shippedTextFiles.filter((file) => !scannerFiles.has(file));
const publicContentFiles = shippedContentFiles.filter((file) => {
  return relative(file) !== "apps/www/src/data/proofs.ts";
});

for (const file of allFiles) {
  const rel = relative(file);
  const base = path.basename(file);
  const ext = path.extname(file).toLowerCase();

  if (base.startsWith(".env") && base !== ".env.example") {
    addFailure(file, "environment file must not be committed");
  }

  if (fontExtensions.has(ext)) {
    addFailure(file, "font file must not be committed or served from the repo");
  }

  if (privatePathPattern.test(rel) || /\.private\./i.test(rel)) {
    addFailure(file, "private/source-material path must not be committed");
  }

  if (/\.(key|pem|p12|crt|cer)$/i.test(rel)) {
    addFailure(file, "key or certificate material must not be committed");
  }
}

scanPattern(
  shippedContentFiles,
  "production-facing approval marker requires resolution before launch",
  /TODO:\s*Jamie approval required/i
);

scanPattern(
  shippedContentFiles,
  "placeholder text appears in production-facing content",
  /\b(?:Placeholder resume PDF|Replace with approved current resume|lorem ipsum|replace this)\b/i
);

scanPattern(
  shippedContentFiles,
  "public-facing copy should use clearer Chad-lens language instead of under-structured",
  /\bunder-structured\b/i
);

scanPattern(
  shippedContentFiles,
  "production-facing launch scaffold language requires resolution",
  /\b(?:pending Jamie approval|Jamie approval|before launch|before publication|may be added after Jamie confirms|screenshots pending|citation pending|approval pending|approvals pending)\b/i
);

scanPattern(
  publicContentFiles,
  "raw/private transcript exposure appears in production-facing content",
  /\b(?:otter(?:\.ai|_ai)?|raw\s+(?:meeting\s+)?transcripts?|private\s+transcript\s+excerpt|corrected[_ -]?(?:working[_ -]?)?transcripts?|repaired[_ -]?transcripts?)\b/i
);

scanPattern(
  shippedContentFiles,
  "all-caps private/confidential marker appears in production-facing content",
  /\b(?:PRIVATE|CONFIDENTIAL)\b/
);

const credentialPatterns = [
  ["OpenAI or secret key", /\b(?:sk-proj-[A-Za-z0-9_-]{20,}|sk-[A-Za-z0-9_-]{20,}|ghp_[A-Za-z0-9]{20,}|AKIA[0-9A-Z]{16})\b/],
  ["Private key block", /-----BEGIN (?:RSA |OPENSSH |EC |DSA )?PRIVATE KEY-----/],
  ["Bearer token", /\bbearer\s+[A-Za-z0-9._-]{20,}/i],
  ["Secret assignment", /\b(?:api[_-]?key|secret|password)\s*[:=]\s*["'][^"'\n]{12,}["']/i],
  ["Token assignment", /\b(?:auth|access|refresh|session)[_-]?token\s*[:=]\s*["'][^"'\n]{12,}["']/i]
];

for (const file of textFiles.filter((item) => !scannerFiles.has(item))) {
  const content = readText(file);
  for (const [label, pattern] of credentialPatterns) {
    const match = pattern.exec(content);
    if (match?.index !== undefined) {
      addFailure(file, label, lineForMatch(content, match.index));
    }
  }
}

const siteDataPath = path.join(repoRoot, "apps/www/src/data/site.ts");
if (existsSync(siteDataPath)) {
  const siteData = readText(siteDataPath);

  if (/Public email pending confirmation|LinkedIn pending|GitHub pending/i.test(siteData)) {
    addFailure(siteDataPath, "unapproved public contact placeholder appears in site data");
  }
}

if (!existsSync(resumePath)) {
  failures.push(
    "apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf - approved resume PDF is missing"
  );
} else {
  const stats = statSync(resumePath);

  if (stats.size < 10_000) {
    addFailure(resumePath, "resume PDF is unexpectedly small");
  }

  const resumeText = pdftotext(resumePath);
  if (!/Jamie\s+Burkart/i.test(resumeText)) {
    addFailure(resumePath, "resume PDF text does not include Jamie Burkart");
  }

  if (!/Technical Project Manager/i.test(resumeText)) {
    addFailure(resumePath, "resume PDF text does not include the target role");
  }

  if (/\b(?:TODO|Placeholder resume PDF|lorem ipsum|replace this)\b/i.test(resumeText)) {
    addFailure(resumePath, "resume PDF contains placeholder or TODO text");
  }

  if (isProduction && !process.env.NEXT_PUBLIC_CONTACT_EMAIL && !/[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}/.test(resumeText)) {
    addFailure(resumePath, "production contact email env is unset and resume PDF does not expose a contact email");
  } else if (isProduction && !process.env.NEXT_PUBLIC_CONTACT_EMAIL) {
    addWarning(resumePath, "production contact email env is unset; contact page relies on resume PDF");
  }
}

const siteUrlPath = path.join(repoRoot, "apps/www/src/lib/site-url.ts");
const nextConfigPath = path.join(repoRoot, "apps/www/next.config.ts");
const siteUrlSource = existsSync(siteUrlPath) ? readText(siteUrlPath) : "";
const nextConfigSource = existsSync(nextConfigPath) ? readText(nextConfigPath) : "";

if (/NEXT_PUBLIC_ROBOTS_POLICY\s*!==\s*["']noindex["']/.test(siteUrlSource + nextConfigSource)) {
  addFailure(siteUrlPath, "robots policy is permissive by default");
}

if (!/NEXT_PUBLIC_ROBOTS_POLICY\s*===\s*["']index["']/.test(siteUrlSource + nextConfigSource)) {
  addFailure(siteUrlPath, "production indexing is not explicit opt-in");
}

if (!/\/resume\/:path\*/.test(nextConfigSource) || !/X-Robots-Tag/.test(nextConfigSource)) {
  addFailure(nextConfigPath, "resume PDF noindex header is missing");
}

if (isProduction && process.env.NEXT_PUBLIC_ROBOTS_POLICY !== "index") {
  failures.push(
    `production env requires NEXT_PUBLIC_ROBOTS_POLICY=index (got ${process.env.NEXT_PUBLIC_ROBOTS_POLICY ?? "unset"})`
  );
}

if (warnings.length) {
  console.warn("Public-safety warnings:");
  for (const warning of warnings) {
    console.warn(`- ${warning}`);
  }
}

if (failures.length) {
  console.error("Public-safety check failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(
  `Public-safety check passed${warnings.length ? ` with ${warnings.length} warning(s)` : ""}.`
);
