import { readdir, readFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { pathToFileURL } from "node:url";

const repoRoot = process.cwd();
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

const textExtensions = new Set([
  ".css",
  ".js",
  ".jsx",
  ".json",
  ".md",
  ".mdx",
  ".mjs",
  ".ts",
  ".tsx",
  ".txt",
  ".yml",
  ".yaml"
]);

const fontExtensions = new Set([".otf", ".ttf", ".woff", ".woff2"]);

const publicContentRoots = [
  "apps/www/src/app",
  "apps/www/src/components",
  "apps/www/src/content",
  "apps/www/src/data",
  "apps/www/public"
];

const productionBlockers = [
  { label: "approval TODO", pattern: /TODO:\s*Jamie approval required/gi },
  { label: "placeholder resume text", pattern: /placeholder resume|placeholder PDF|replace the placeholder/gi },
  { label: "pending final approval text", pattern: /final written approval|approval before promotion/gi },
  { label: "do-not-publish marker", pattern: /DO NOT PUBLISH/g },
  { label: "confidential marker", pattern: /CONFIDENTIAL/g },
  { label: "internal-only marker", pattern: /INTERNAL ONLY/g },
  { label: "private-data marker", pattern: /PRIVATE_DATA/g },
  { label: "legal-review marker", pattern: /legal-review/gi },
  { label: "private stakeholder list marker", pattern: /private stakeholder list/gi },
  { label: "raw transcript marker", pattern: /raw transcript/gi },
  { label: "private notes marker", pattern: /private notes/gi },
  { label: "credential marker", pattern: /\bcredentials?\b/gi },
  { label: "password marker", pattern: /\bpasswords?\b/gi }
];

const sensitiveTerms = [
  "private coalition notes",
  "legal-review materials",
  "private correspondence",
  "stakeholder list",
  "private analytics",
  "client-private",
  "attendance list",
  "guest data",
  "health details",
  "financial details"
];

const credentialLikePatterns = [
  {
    label: "OpenAI key",
    pattern: /\bsk-(?:proj-)?[A-Za-z0-9_-]{20,}\b/g
  },
  {
    label: "GitHub token",
    pattern: /\bgh[psu]_[A-Za-z0-9_]{20,}\b/g
  },
  {
    label: "secret assignment",
    pattern: /\b(?:api[_-]?key|secret|token|password|credential)s?\s*[:=]\s*["'][^"']{8,}["']/gi
  }
];

const relative = (filePath) => path.relative(repoRoot, filePath).split(path.sep).join("/");

async function collectFiles(rootPath) {
  const absolutePath = path.join(repoRoot, rootPath);
  const entry = await stat(absolutePath);

  if (entry.isFile()) return [absolutePath];
  if (!entry.isDirectory()) return [];

  const files = [];
  const entries = await readdir(absolutePath, { withFileTypes: true });

  for (const child of entries) {
    if (ignoredDirectories.has(child.name)) continue;

    const childPath = path.join(absolutePath, child.name);

    if (child.isDirectory()) {
      files.push(...(await collectFiles(relative(childPath))));
    } else if (child.isFile()) {
      files.push(childPath);
    }
  }

  return files;
}

function addLineMatches(collection, content, filePath, pattern, label) {
  const lines = content.split(/\r?\n/);

  lines.forEach((line, index) => {
    pattern.lastIndex = 0;
    if (pattern.test(line)) {
      collection.push(`${filePath}:${index + 1} ${label}`);
    }
  });
}

function isEnvFile(filePath) {
  const name = path.basename(filePath);
  return (name === ".env" || name.startsWith(".env.")) && name !== ".env.example";
}

function isPublicContent(filePath) {
  const file = relative(filePath);
  return publicContentRoots.some((root) => file === root || file.startsWith(`${root}/`));
}

function validateUrl(value, hostPattern, label, failures) {
  if (!value) return;

  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || !hostPattern.test(url.hostname)) {
      failures.push(`${label} must be an https URL on the expected host`);
    }
  } catch {
    failures.push(`${label} is not a valid URL`);
  }
}

function extractPdfText(pdfPath, failures) {
  const absolutePdfPath = path.join(repoRoot, pdfPath);

  if (!existsSync(absolutePdfPath)) {
    failures.push(`${pdfPath} is missing`);
    return "";
  }

  const result = spawnSync("pdftotext", [absolutePdfPath, "-"], {
    encoding: "utf8",
    maxBuffer: 1024 * 1024 * 8
  });

  if (result.error || result.status !== 0) {
    failures.push(
      `${pdfPath} could not be extracted with pdftotext; install Poppler or provide a verified final PDF`
    );
    return "";
  }

  return result.stdout;
}

function checkProductionEnvironment(failures) {
  const appEnv = process.env.APP_ENV?.trim();
  const siteUrl = process.env.SITE_URL?.trim();
  const nextPublicSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const robotsPolicy = process.env.NEXT_PUBLIC_ROBOTS_POLICY?.trim();
  const publicEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();

  if (appEnv !== "production") {
    failures.push("APP_ENV must be production for production promotion");
  }

  if (siteUrl !== "https://jamieburk.art") {
    failures.push("SITE_URL must be https://jamieburk.art for production promotion");
  }

  if (nextPublicSiteUrl !== "https://jamieburk.art") {
    failures.push("NEXT_PUBLIC_SITE_URL must be https://jamieburk.art for production promotion");
  }

  if (robotsPolicy !== "index") {
    failures.push("NEXT_PUBLIC_ROBOTS_POLICY must be index for production promotion");
  }

  if (!publicEmail) {
    failures.push("NEXT_PUBLIC_CONTACT_EMAIL must be set to Jamie's approved public email");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(publicEmail)) {
    failures.push("NEXT_PUBLIC_CONTACT_EMAIL is not a valid email address");
  }

  validateUrl(
    process.env.NEXT_PUBLIC_LINKEDIN_URL?.trim(),
    /(^|\.)linkedin\.com$/i,
    "NEXT_PUBLIC_LINKEDIN_URL",
    failures
  );
  validateUrl(
    process.env.NEXT_PUBLIC_GITHUB_URL?.trim(),
    /(^|\.)github\.com$/i,
    "NEXT_PUBLIC_GITHUB_URL",
    failures
  );
}

function checkResumePdf(failures) {
  const text = extractPdfText(resumePath, failures);
  if (!text) return;

  if (text.trim().length < 250) {
    failures.push(`${resumePath} does not appear to contain enough selectable text`);
  }

  if (/placeholder resume|replace with approved current resume|replace the placeholder/i.test(text)) {
    failures.push(`${resumePath} still contains placeholder resume language`);
  }

  if (/\b\d{1,5}\s+[A-Za-z0-9 .'-]+(?:Street|St\.|Avenue|Ave\.|Road|Rd\.|Boulevard|Blvd\.|Lane|Ln\.|Drive|Dr\.)\b/i.test(text)) {
    failures.push(`${resumePath} appears to contain a street address`);
  }
}

function checkWorkItems(failures, filesByRelativePath) {
  const workFile = filesByRelativePath.get("apps/www/src/data/work.ts");
  if (!workFile) return;

  const content = workFile.content;
  addLineMatches(failures, content, "apps/www/src/data/work.ts", /visibility:\s*"private"/g, "private work item");
  addLineMatches(failures, content, "apps/www/src/data/work.ts", /status:\s*"Draft"/g, "draft work item");
}

export async function runPublicSafetyCheck({ production = false } = {}) {
  const failures = [];
  const warnings = [];
  const files = await collectFiles(".");
  const filesByRelativePath = new Map();

  for (const filePath of files) {
    const file = relative(filePath);
    const extension = path.extname(filePath);

    if (isEnvFile(filePath)) {
      failures.push(`${file} must not be committed`);
      continue;
    }

    if (fontExtensions.has(extension)) {
      failures.push(`${file} is a committed font file`);
      continue;
    }

    if (!textExtensions.has(extension)) continue;

    const content = await readFile(filePath, "utf8");
    filesByRelativePath.set(file, { content });

    for (const { pattern, label } of credentialLikePatterns) {
      addLineMatches(failures, content, file, pattern, label);
    }

    if (isPublicContent(filePath)) {
      for (const term of sensitiveTerms) {
        const pattern = new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
        if (pattern.test(content)) {
          warnings.push(`${file} references sensitive review term "${term}"`);
        }
      }
    }

    if (production && isPublicContent(filePath)) {
      for (const { pattern, label } of productionBlockers) {
        addLineMatches(failures, content, file, pattern, label);
      }
    }
  }

  if (production) {
    checkProductionEnvironment(failures);
    checkResumePdf(failures);
    checkWorkItems(failures, filesByRelativePath);
  }

  const uniqueFailures = [...new Set(failures)];
  const uniqueWarnings = [...new Set(warnings)];

  if (uniqueFailures.length > 0) {
    console.error("Public-safety check failed:");
    for (const failure of uniqueFailures) console.error(`- ${failure}`);

    if (uniqueWarnings.length > 0) {
      console.warn("\nPublic-safety warnings:");
      for (const warning of uniqueWarnings) console.warn(`- ${warning}`);
    }

    process.exitCode = 1;
    return;
  }

  if (uniqueWarnings.length > 0) {
    console.warn("Public-safety check passed with warnings:");
    for (const warning of uniqueWarnings) console.warn(`- ${warning}`);
  } else {
    console.log("Public-safety check passed.");
  }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  await runPublicSafetyCheck({ production: process.argv.includes("--production") });
}
