#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const failures = [];
const warnings = [];

const scanRoots = [
  "apps/www/src",
  "apps/www/public",
  "apps/www/next.config.ts",
  "apps/www/package.json",
  "package.json",
  "README.md",
  "AGENTS.md",
  "DESIGN.md",
  "PRODUCT.md",
  "docs"
];

const requiredIgnoreEntries = [
  "*.local",
  "*.private.*",
  "private/",
  "archive-private/",
  "raw/",
  "transcripts-private/",
  "client-private/",
  "legal-review/",
  "support-materials-private/",
  "resumes-private/",
  "screenshots-private/",
  "supporting-materials/",
  "*.key",
  "*.pem"
];

const ignoredSegments = new Set([
  ".git",
  ".next",
  "node_modules",
  "coverage",
  "out",
  "dist"
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
  ".svg",
  ".ts",
  ".tsx",
  ".txt",
  ".yaml",
  ".yml"
]);

const fontExtensions = new Set([".eot", ".otf", ".ttf", ".woff", ".woff2"]);

function resolve(relativePath) {
  return path.join(root, relativePath);
}

function lineFor(content, index) {
  return content.slice(0, index).split("\n").length;
}

function walk(relativePath) {
  const absolutePath = resolve(relativePath);

  if (!existsSync(absolutePath)) return [];

  const stat = statSync(absolutePath);

  if (stat.isFile()) return [relativePath];
  if (!stat.isDirectory()) return [];
  if (ignoredSegments.has(path.basename(relativePath))) return [];

  return readdirSync(absolutePath).flatMap((entry) => {
    return walk(path.join(relativePath, entry));
  });
}

function readPdfText(relativePath) {
  try {
    return execFileSync("pdftotext", [resolve(relativePath), "-"], {
      encoding: "utf8",
      maxBuffer: 10 * 1024 * 1024,
      stdio: ["ignore", "pipe", "ignore"]
    });
  } catch {
    warnings.push(`${relativePath}: pdftotext unavailable or failed; used binary fallback only.`);
    return readFileSync(resolve(relativePath)).toString("latin1");
  }
}

function readScannableText(relativePath) {
  const extension = path.extname(relativePath).toLowerCase();
  if (extension === ".pdf") return readPdfText(relativePath);
  if (!textExtensions.has(extension)) return "";
  return readFileSync(resolve(relativePath), "utf8");
}

function fail(message) {
  failures.push(message);
}

function checkIgnoreFile(relativePath) {
  const content = existsSync(resolve(relativePath))
    ? readFileSync(resolve(relativePath), "utf8")
    : "";
  const lines = new Set(content.split(/\r?\n/));

  for (const entry of requiredIgnoreEntries) {
    if (!lines.has(entry)) {
      fail(`${relativePath}: missing required ignore entry ${entry}`);
    }
  }
}

checkIgnoreFile(".gitignore");
checkIgnoreFile(".dockerignore");

const blockerPatterns = [
  {
    label: "visible Jamie approval TODO",
    pattern: /TODO:\s*Jamie approval required/i
  },
  {
    label: "placeholder resume copy",
    pattern: /Placeholder resume PDF|Replace with approved current resume|replace the placeholder PDF/i
  },
  {
    label: "pending public contact copy",
    pattern: /Public email pending confirmation|LinkedIn pending|GitHub pending/i
  },
  {
    label: "private work item visibility",
    pattern: /visibility:\s*["']private["']/i
  },
  {
    label: "draft work item status",
    pattern: /status:\s*["']Draft["']/i
  },
  {
    label: "raw Otter material",
    pattern: /\braw\s+Otter\b|otter\.ai|_otter/i
  },
  {
    label: "raw or private transcript material",
    pattern: /\braw\s+(?:meeting\s+)?transcript\b|private\s+transcript|corrected[_ -]working[_ -]transcript|repaired[_ -]transcript/i
  },
  {
    label: "private source-material path",
    pattern:
      /\/Volumes\/16TB_SSD\/Work\/Jamie\/Portfolio\/supporting-materials|supporting-materials\//i
  },
  {
    label: "credential-looking string",
    pattern:
      /\b(?:sk-proj-[A-Za-z0-9_-]{20,}|sk-[A-Za-z0-9_-]{20,}|ghp_[A-Za-z0-9]{20,}|AKIA[0-9A-Z]{16})\b/
  },
  {
    label: "credential-like assignment",
    pattern:
      /\b(?:api[_-]?key|auth[_-]?token|access[_-]?token|refresh[_-]?token|session[_-]?token|client[_-]?secret|password|secret)\s*[:=]\s*["'][^"'\n]{8,}["']/i
  },
  {
    label: "private key material",
    pattern: /-----BEGIN (?:RSA |OPENSSH |DSA |EC |PGP )?PRIVATE KEY-----/i
  },
  {
    label: "unapproved screenshot marker",
    pattern: /unapproved screenshot|screenshots? pending/i
  }
];

const policyFiles = new Set([
  "README.md",
  "AGENTS.md",
  "DESIGN.md",
  "PRODUCT.md",
  "docs/content-safety.md",
  "docs/professional-legibility.md",
  "docs/production-readiness.md",
  "docs/release-checklist.md",
  "docs/knowledge-bank/README.md",
  "docs/knowledge-bank/approval-register.md",
  "docs/knowledge-bank/claims.md",
  "docs/knowledge-bank/publication-rules.md",
  "docs/knowledge-bank/source-classes.md"
]);

const policyAllowedLabels = new Set([
  "raw Otter material",
  "raw or private transcript material",
  "private source-material path",
  "unapproved screenshot marker"
]);

const files = scanRoots.flatMap(walk);

for (const relativePath of files) {
  const extension = path.extname(relativePath).toLowerCase();

  if (fontExtensions.has(extension)) {
    fail(`${relativePath}: private/proprietary font file must not be tracked.`);
  }

  if (
    /(^|\/)(?:private|archive-private|raw|transcripts-private|client-private|legal-review|support-materials-private|resumes-private|screenshots-private|supporting-materials)(\/|$)|\.private\.|\.(?:key|pem)$/i.test(
      relativePath
    )
  ) {
    fail(`${relativePath}: private/source-material path must not be tracked.`);
  }

  const content = readScannableText(relativePath);
  if (!content) continue;

  for (const blocker of blockerPatterns) {
    if (policyFiles.has(relativePath) && policyAllowedLabels.has(blocker.label)) {
      continue;
    }

    const match = blocker.pattern.exec(content);
    if (match?.index !== undefined) {
      fail(`${relativePath}:${lineFor(content, match.index)} ${blocker.label}`);
    }
  }
}

const resumePath = "apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf";
if (!existsSync(resolve(resumePath))) {
  fail(`${resumePath}: approved resume PDF is missing.`);
} else {
  const stats = statSync(resolve(resumePath));
  if (stats.size < 10_000) {
    fail(`${resumePath}: resume PDF is unexpectedly small.`);
  }

  const resumeText = readPdfText(resumePath);
  if (!/Jamie\s+Burkart/i.test(resumeText) || !/Technical Project Manager/i.test(resumeText)) {
    fail(`${resumePath}: resume PDF text extraction is missing expected public resume text.`);
  }
}

const siteData = readFileSync(resolve("apps/www/src/data/site.ts"), "utf8");
if (!siteData.includes("jamie.burkart@gmail.com")) {
  fail("apps/www/src/data/site.ts: approved public email is missing.");
}
if (!siteData.includes("https://github.com/openhouse")) {
  fail("apps/www/src/data/site.ts: approved GitHub URL is missing.");
}
if (/linkedin/i.test(siteData)) {
  fail("apps/www/src/data/site.ts: LinkedIn should stay omitted until the exact URL is approved.");
}

const siteUrlText = readFileSync(resolve("apps/www/src/lib/site-url.ts"), "utf8");
const nextConfigText = readFileSync(resolve("apps/www/next.config.ts"), "utf8");

if (!siteUrlText.includes('NEXT_PUBLIC_ROBOTS_POLICY === "index"')) {
  fail("apps/www/src/lib/site-url.ts: production indexing must be explicit opt-in.");
}
if (!nextConfigText.includes('NEXT_PUBLIC_ROBOTS_POLICY === "index"')) {
  fail("apps/www/next.config.ts: production indexing must be explicit opt-in.");
}
if (
  !nextConfigText.includes("/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf") ||
  !nextConfigText.includes('X-Robots-Tag", value: "noindex, nofollow"')
) {
  fail("apps/www/next.config.ts: resume PDF must be configured with noindex headers.");
}

for (const route of [
  "/work/fairrentnyc-commercial-rent-stabilization",
  "/work/fairrentnyc",
  "/work/nyc-artist-coalition-fair-rent",
  "/work/source-backed-team-memory",
  "/work/196-artists-residency"
]) {
  if (!nextConfigText.includes(route)) {
    fail(`apps/www/next.config.ts: missing redirect coverage for ${route}.`);
  }
}

if (warnings.length > 0) {
  console.warn("Public-safety warnings:");
  for (const warning of warnings) {
    console.warn(`- ${warning}`);
  }
}

if (failures.length > 0) {
  console.error("Public-safety check failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Public-safety check passed.");
