#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "..");
const mode =
  process.argv.includes("--production") ||
  process.env.PUBLIC_SAFETY_MODE === "production"
    ? "production"
    : "staging";

const hardFailures = [];
const warnings = [];

function addFinding(message, productionOnly = false) {
  if (productionOnly && mode !== "production") {
    warnings.push(message);
  } else {
    hardFailures.push(message);
  }
}

const trackedFiles = execFileSync("git", ["ls-files"], {
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
  "support-materials-private/"
];

for (const file of trackedFiles) {
  const basename = path.basename(file);

  if (
    privatePathPatterns.some(
      (pattern) => file === pattern.slice(0, -1) || file.startsWith(pattern)
    )
  ) {
    hardFailures.push(`Tracked private path is not allowed: ${file}`);
  }

  if (/\.private\./i.test(file)) {
    hardFailures.push(`Tracked private file pattern is not allowed: ${file}`);
  }

  if (/^\.(env|env\.)/.test(basename) && basename !== ".env.example") {
    hardFailures.push(`Committed env file is not allowed: ${file}`);
  }

  if (/\.(ttf|otf|woff|woff2)$/i.test(file)) {
    hardFailures.push(`Tracked font binary is not allowed: ${file}`);
  }
}

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

function isSearchable(file) {
  const ext = path.extname(file).toLowerCase();

  return (
    textExtensions.has(ext) ||
    ext === ".pdf" ||
    file === "package.json" ||
    file === ".gitignore" ||
    file === ".dockerignore" ||
    file === ".env.example"
  );
}

function isProductionFacing(file) {
  return (
    file.startsWith("apps/www/src/") ||
    file.startsWith("apps/www/content/") ||
    file.startsWith("apps/www/public/") ||
    file === "apps/www/mdx-components.tsx" ||
    file === "apps/www/next.config.ts"
  );
}

function readSearchableText(file) {
  const absolutePath = path.join(repoRoot, file);
  const buffer = readFileSync(absolutePath);

  if (path.extname(file).toLowerCase() !== ".pdf") {
    return buffer.toString("utf8");
  }

  try {
    return execFileSync("pdftotext", [absolutePath, "-"], {
      cwd: repoRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"]
    });
  } catch {
    return `${buffer.toString("utf8")}\n${buffer.toString("latin1")}`;
  }
}

function lineNumberFor(text, index) {
  return text.slice(0, index).split(/\r\n|\r|\n/).length;
}

const searchableFiles = trackedFiles.filter(isSearchable);
const productionFacingFiles = searchableFiles.filter(isProductionFacing);

const hardTextChecks = [
  {
    label: "private key material",
    pattern: /-----BEGIN (?:RSA |OPENSSH |EC |)?PRIVATE KEY-----/i
  },
  {
    label: "OpenAI key-looking string",
    pattern: /\bsk-(?:proj-)?[A-Za-z0-9_-]{20,}\b/
  },
  {
    label: "generic API key-looking string",
    pattern: /\b(?:ghp|github_pat|xoxb|xoxp|AKIA)[A-Za-z0-9_-]{16,}\b/
  },
  {
    label: "credential-looking assignment",
    pattern:
      /\b(?:AWS_SECRET_ACCESS_KEY|OPENAI_API_KEY|api_key|access_token|auth_token|password|secret)\s*=/i
  }
];

const productionBlockerChecks = [
  {
    label: "visible Jamie approval TODO",
    pattern: /TODO:\s*Jamie approval required/i
  },
  {
    label: "placeholder resume text",
    pattern:
      /(?:Placeholder resume PDF|Replace the placeholder PDF|Replace with approved current resume|placeholder resume)/i
  },
  {
    label: "unsafe visible pending approval language",
    pattern:
      /(?:pending approval|approved screenshot pending|pending screenshot|pending citation|unapproved contact|unapproved metric)/i
  },
  {
    label: "private work item exposed in public data",
    pattern: /visibility:\s*"private"/i
  },
  {
    label: "draft work item exposed in public data",
    pattern: /status:\s*"Draft"/i
  },
  {
    label: "raw transcript marker",
    pattern:
      /(?:otter\.ai|^\s*[A-Z][A-Za-z .'-]{1,60}\s+\d{1,2}:\d{2}(?::\d{2})?\s*$)/im
  }
];

const privateLocalPathPattern = new RegExp(
  [
    String.raw`\/Volumes\/16TB_SSD\/Work\/Jamie\/Portfolio`,
    String.raw`\/supporting-materials`,
    String.raw`|\/Users\/jburkart\/Library\/Mobile Documents`,
    `|${["Jamie Projects ", "History"].join("")}`,
    `|${["job", "-hunt"].join("")}`
  ].join(""),
  "i"
);

hardTextChecks.push({
  label: "private local source path",
  pattern: privateLocalPathPattern
});

for (const file of searchableFiles) {
  const text = readSearchableText(file);

  for (const check of hardTextChecks) {
    const match = check.pattern.exec(text);
    if (match) {
      hardFailures.push(`${file}:${lineNumberFor(text, match.index)} contains ${check.label}`);
    }
  }
}

for (const file of productionFacingFiles) {
  const text = readSearchableText(file);

  for (const check of productionBlockerChecks) {
    const match = check.pattern.exec(text);
    if (match) {
      addFinding(
        `${file}:${lineNumberFor(text, match.index)} contains ${check.label}`,
        true
      );
    }
  }
}

const resumePath =
  "apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf";
if (!existsSync(path.join(repoRoot, resumePath))) {
  hardFailures.push(`${resumePath} is missing`);
}

if (hardFailures.length) {
  console.error(`Public-safety check failed in ${mode} mode:`);
  for (const failure of hardFailures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

if (warnings.length) {
  console.warn(`Public-safety warnings in ${mode} mode:`);
  for (const warning of warnings) {
    console.warn(`- ${warning}`);
  }
}

console.log(`Public-safety check passed in ${mode} mode.`);
