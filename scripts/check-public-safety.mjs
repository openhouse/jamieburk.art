import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const placeholderResumeHash =
  "c74cf11cb6d57e3483b3731a0b741da7714a6044588f5f901623a08820db40c4";

const ignoredNames = new Set([
  ".git",
  ".next",
  "node_modules",
  "private",
  "archive-private",
  "raw",
  "transcripts-private",
  "client-private",
  "legal-review"
]);

const textExtensions = new Set([
  ".css",
  ".js",
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

const rootsToScan = [
  "AGENTS.md",
  "DESIGN.md",
  "Dockerfile",
  "README.md",
  ".dockerignore",
  ".env.example",
  ".gitignore",
  "apps/www/public",
  "apps/www/src",
  "docs",
  "package.json"
];

const blockers = [
  {
    label: "visible Jamie approval TODO",
    pattern: /TODO:\s*Jamie approval required/i
  },
  {
    label: "placeholder resume or public placeholder copy",
    pattern: /placeholder resume|replace the placeholder PDF|public email pending confirmation/i
  },
  {
    label: "private visibility exposed in public work data",
    pattern: /visibility:\s*["']private["']/i
  },
  {
    label: "draft status exposed in public route data",
    pattern: /status:\s*["']Draft["']/i
  },
  {
    label: "credential-looking assignment",
    pattern:
      /\b(?:api[_-]?key|access[_-]?token|auth[_-]?token|client[_-]?secret|private[_-]?key|password|secret)\s*[:=]\s*['"]?[A-Za-z0-9_./+=-]{12,}/i
  },
  {
    label: "known private local path",
    pattern:
      /\/Volumes\/16TB_SSD\/Work\/Jamie\/Portfolio\/supporting-materials|\/Users\/jburkart\/Library\/Mobile Documents\/com~apple~CloudDocs\/Teams\/(?:Jamie Projects History|job-hunt)/i
  },
  {
    label: "raw transcript export marker",
    pattern: /(?:otter\.ai|_otter|What is WOW List__otter_ai_transcript)/i
  },
  {
    label: "timestamped transcript-like speaker turn",
    pattern: /^\s*[A-Z][A-Za-z .'-]{1,60}\s+\d{1,2}:\d{2}(?::\d{2})?\s*$/m
  },
  {
    label: "staging URL in production-facing metadata or docs",
    pattern: /https:\/\/staging\.jamieburk\.art\/(?:opengraph-image|sitemap\.xml|work|resume|contact)/i
  }
];

const warningTerms = [
  "AI",
  "archive",
  "client",
  "coalition",
  "dashboard",
  "legal",
  "private",
  "source",
  "transcript"
];

const failures = [];
const warnings = [];

function relative(filePath) {
  return path.relative(root, filePath);
}

function lineFor(content, index) {
  return content.slice(0, index).split("\n").length;
}

function shouldSkip(filePath) {
  return filePath.split(path.sep).some((part) => ignoredNames.has(part));
}

function walk(entry) {
  const fullPath = path.join(root, entry);
  if (!existsSync(fullPath) || shouldSkip(fullPath)) return [];

  const stat = statSync(fullPath);
  if (stat.isDirectory()) {
    return readdirSync(fullPath).flatMap((name) => walk(path.join(entry, name)));
  }

  return [fullPath];
}

function inspectText(filePath, content) {
  const rel = relative(filePath);
  const isPublicSurface = rel.startsWith("apps/www/src/") || rel.startsWith("apps/www/public/");
  const publicSurfaceOnly = new Set([
    "visible Jamie approval TODO",
    "placeholder resume or public placeholder copy",
    "private visibility exposed in public work data",
    "draft status exposed in public route data",
    "staging URL in production-facing metadata or docs"
  ]);

  for (const blocker of blockers) {
    if (!isPublicSurface && publicSurfaceOnly.has(blocker.label)) {
      continue;
    }
    const match = blocker.pattern.exec(content);
    if (match) {
      failures.push(`${rel}:${lineFor(content, match.index)} ${blocker.label}`);
    }
  }

  for (const term of warningTerms) {
    const pattern = new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i");
    const match = pattern.exec(content);
    if (match) {
      warnings.push(`${rel}:${lineFor(content, match.index)} review context for "${term}"`);
    }
  }
}

function inspectPdf(filePath) {
  const buffer = readFileSync(filePath);
  const hash = createHash("sha256").update(buffer).digest("hex");
  if (hash === placeholderResumeHash) {
    failures.push(`${relative(filePath)} matches the placeholder resume PDF hash`);
  }

  const text = spawnSync("pdftotext", [filePath, "-"], { encoding: "utf8" });
  if (text.status === 0) {
    inspectText(filePath, text.stdout);
  } else {
    warnings.push(`${relative(filePath)} could not be text-inspected with pdftotext`);
  }
}

for (const scanRoot of rootsToScan) {
  for (const filePath of walk(scanRoot)) {
    const ext = path.extname(filePath).toLowerCase();
    const name = path.basename(filePath);

    if (name.startsWith(".env") && name !== ".env.example") {
      failures.push(`${relative(filePath)} non-example env file is present`);
      continue;
    }

    if (ext === ".pdf") {
      inspectPdf(filePath);
      continue;
    }

    if (fontExtensions.has(ext)) {
      failures.push(`${relative(filePath)} committed font file requires explicit public license review`);
      continue;
    }

    if (!textExtensions.has(ext) && !["Dockerfile", ".dockerignore", ".gitignore"].includes(name)) {
      continue;
    }

    inspectText(filePath, readFileSync(filePath, "utf8"));
  }
}

if (warnings.length > 0) {
  console.warn("Public-safety review warnings:");
  for (const warning of warnings) {
    console.warn(`- ${warning}`);
  }
}

if (failures.length > 0) {
  console.error("Public-safety blockers:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Public-safety check passed.");
