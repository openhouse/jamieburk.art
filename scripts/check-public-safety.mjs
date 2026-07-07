#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const repoRoot = process.cwd();
const production =
  process.argv.includes("--production") || process.env.APP_ENV === "production";
const resumePath = "apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf";

const ignoredDirectories = new Set([
  ".agents",
  ".codex",
  ".git",
  ".impeccable",
  ".next",
  "coverage",
  "dist",
  "node_modules",
  "out"
]);

const publicContentRoots = [
  "apps/www/src/app",
  "apps/www/src/components",
  "apps/www/src/content",
  "apps/www/src/data",
  "apps/www/public"
];

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
  ".txt",
  ".yml",
  ".yaml"
]);

const fontExtensions = new Set([".otf", ".ttf", ".woff", ".woff2"]);

const credentialPatterns = [
  { label: "OpenAI key", pattern: /\bsk-(?:proj-)?[A-Za-z0-9_-]{20,}\b/g },
  { label: "GitHub token", pattern: /\bgh[psu]_[A-Za-z0-9_]{20,}\b/g },
  {
    label: "secret assignment",
    pattern:
      /\b(?:api[_-]?key|secret|token|password|credential)s?\s*[:=]\s*["'][^"']{8,}["']/gi
  },
  {
    label: "private key material",
    pattern: /-----BEGIN (?:RSA |OPENSSH |EC |)?PRIVATE KEY-----/gi
  }
];

const privatePathPatterns = [
  {
    label: "private local path",
    pattern:
      /\/Volumes\/16TB_SSD\/Work\/Jamie|\/Users\/jburkart\/Library|supporting-materials|job-hunt\/|Jamie Projects History|Mobile Documents\/com~apple~CloudDocs/gi
  }
];

const productionBlockers = [
  { label: "approval TODO", pattern: /TODO:\s*Jamie approval required/gi },
  {
    label: "placeholder resume text",
    pattern: /placeholder resume|placeholder PDF|replace with approved current resume|replace the placeholder/gi
  },
  {
    label: "pending approval text",
    pattern:
      /Production remains|blocked until Jamie approves|final written approval|approval before promotion/gi
  },
  { label: "private visibility state", pattern: /visibility:\s*["']private["']/g },
  { label: "draft work status", pattern: /status:\s*["']Draft["']/g },
  { label: "do-not-publish marker", pattern: /DO NOT PUBLISH/g },
  { label: "confidential marker", pattern: /CONFIDENTIAL/g },
  { label: "internal-only marker", pattern: /INTERNAL ONLY/g },
  { label: "private-data marker", pattern: /PRIVATE_DATA/g },
  { label: "raw transcript marker", pattern: /raw transcript|otter\.ai transcript/gi },
  { label: "unapproved contact placeholder", pattern: /Public email pending approval/gi }
];

const sensitiveTerms = [
  "private coalition notes",
  "legal-review materials",
  "private correspondence",
  "private contact list",
  "stakeholder list",
  "private analytics",
  "client-private",
  "attendance list",
  "guest data",
  "health details",
  "financial details"
];

const failures = [];
const warnings = [];

const relative = (filePath) => path.relative(repoRoot, filePath).split(path.sep).join("/");

async function collectFiles(rootPath) {
  const absolutePath = path.join(repoRoot, rootPath);
  const entry = await stat(absolutePath);

  if (entry.isFile()) return [absolutePath];
  if (!entry.isDirectory()) return [];

  const files = [];
  for (const child of await readdir(absolutePath, { withFileTypes: true })) {
    if (ignoredDirectories.has(child.name)) continue;
    const childPath = path.join(absolutePath, child.name);
    if (child.isDirectory()) files.push(...(await collectFiles(relative(childPath))));
    if (child.isFile()) files.push(childPath);
  }
  return files;
}

function addLineMatches(collection, content, file, pattern, label) {
  const lines = content.split(/\r?\n/);
  lines.forEach((line, index) => {
    pattern.lastIndex = 0;
    if (pattern.test(line)) collection.push(`${file}:${index + 1} ${label}`);
  });
}

function isEnvFile(file) {
  const basename = path.basename(file);
  return (basename === ".env" || basename.startsWith(".env.")) && basename !== ".env.example";
}

function isPublicContent(filePath) {
  const file = relative(filePath);
  return publicContentRoots.some((root) => file === root || file.startsWith(`${root}/`));
}

function extractPdfText(pdfPath) {
  const absolute = path.join(repoRoot, pdfPath);
  if (!existsSync(absolute)) {
    addResumeIssue(`${pdfPath}:1 resume PDF is missing`);
    return "";
  }

  const result = spawnSync("pdftotext", [absolute, "-"], {
    encoding: "utf8",
    maxBuffer: 1024 * 1024 * 8
  });

  if (result.error || result.status !== 0) {
    addResumeIssue(`${pdfPath}:1 could not extract selectable resume text with pdftotext`);
    return "";
  }

  return result.stdout;
}

function addResumeIssue(message) {
  if (production) {
    failures.push(message);
  } else {
    warnings.push(message);
  }
}

function validateUrl(value, hostPattern, label) {
  if (!value) return;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || !hostPattern.test(url.hostname)) {
      failures.push(`environment:1 ${label} must be an https URL on the expected host`);
    }
  } catch {
    failures.push(`environment:1 ${label} is not a valid URL`);
  }
}

function checkProductionEnvironment() {
  if (!production) return;

  if (process.env.APP_ENV !== "production") {
    failures.push("environment:1 APP_ENV must be production");
  }
  if (process.env.SITE_URL !== "https://jamieburk.art") {
    failures.push("environment:1 SITE_URL must be https://jamieburk.art");
  }
  if (process.env.NEXT_PUBLIC_SITE_URL !== "https://jamieburk.art") {
    failures.push("environment:1 NEXT_PUBLIC_SITE_URL must be https://jamieburk.art");
  }
  if (process.env.NEXT_PUBLIC_ROBOTS_POLICY !== "index") {
    failures.push("environment:1 NEXT_PUBLIC_ROBOTS_POLICY must be index");
  }

  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();
  if (!email) {
    failures.push("environment:1 NEXT_PUBLIC_CONTACT_EMAIL must be set to Jamie's approved public email");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    failures.push("environment:1 NEXT_PUBLIC_CONTACT_EMAIL is not a valid email address");
  }

  validateUrl(process.env.NEXT_PUBLIC_LINKEDIN_URL?.trim(), /(^|\.)linkedin\.com$/i, "NEXT_PUBLIC_LINKEDIN_URL");
  validateUrl(process.env.NEXT_PUBLIC_GITHUB_URL?.trim(), /(^|\.)github\.com$/i, "NEXT_PUBLIC_GITHUB_URL");
}

function checkResumePdf() {
  const text = extractPdfText(resumePath);
  if (!text) return;

  if (text.trim().length < 250) {
    addResumeIssue(`${resumePath}:1 resume PDF does not appear to contain enough selectable text`);
  }
  if (/Placeholder resume PDF|Replace with approved current resume|replace the placeholder/i.test(text)) {
    addResumeIssue(`${resumePath}:1 resume PDF contains placeholder language`);
  }
  if (/\b\d{1,5}\s+[A-Za-z0-9 .'-]+(?:Street|St\.|Avenue|Ave\.|Road|Rd\.|Boulevard|Blvd\.|Lane|Ln\.|Drive|Dr\.)\b/i.test(text)) {
    addResumeIssue(`${resumePath}:1 resume PDF appears to contain a street address`);
  }
}

for (const filePath of await collectFiles(".")) {
  const file = relative(filePath);
  const ext = path.extname(filePath).toLowerCase();

  if (isEnvFile(filePath)) {
    failures.push(`${file}:1 committed env file`);
    continue;
  }

  if (fontExtensions.has(ext)) {
    failures.push(`${file}:1 committed font file`);
    continue;
  }

  if (!textExtensions.has(ext)) continue;

  const content = await readFile(filePath, "utf8");
  for (const check of credentialPatterns) {
    addLineMatches(failures, content, file, check.pattern, check.label);
  }

  if (isPublicContent(filePath)) {
    for (const check of privatePathPatterns) {
      addLineMatches(failures, content, file, check.pattern, check.label);
    }
    for (const term of sensitiveTerms) {
      const pattern = new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
      if (pattern.test(content)) warnings.push(`${file}:1 sensitive review term "${term}"`);
    }
    if (production) {
      for (const check of productionBlockers) {
        addLineMatches(failures, content, file, check.pattern, check.label);
      }
    }
  }
}

checkResumePdf();
checkProductionEnvironment();

const uniqueWarnings = [...new Set(warnings)];
if (uniqueWarnings.length) {
  console.warn("Public-safety warnings:");
  for (const warning of uniqueWarnings) console.warn(`- ${warning}`);
}

const uniqueFailures = [...new Set(failures)];
if (uniqueFailures.length) {
  console.error("Public-safety check failed:");
  for (const failure of uniqueFailures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Public-safety check passed in ${production ? "production" : "staging/non-production"} mode.`);
