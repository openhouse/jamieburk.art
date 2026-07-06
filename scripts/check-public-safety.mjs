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

const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  ".."
);

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
  ".ts",
  ".tsx",
  ".txt",
  ".yaml",
  ".yml"
]);

const fontExtensions = new Set([".eot", ".otf", ".ttf", ".woff", ".woff2"]);
const resumePath = path.join(
  repoRoot,
  "apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf"
);

function walk(dir) {
  if (!existsSync(dir)) {
    return [];
  }

  const entries = readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const absolute = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (!ignoredDirs.has(entry.name)) {
        files.push(...walk(absolute));
      }
      continue;
    }

    if (entry.isFile()) {
      files.push(absolute);
    }
  }

  return files;
}

function relative(file) {
  return path.relative(repoRoot, file);
}

function addFailure(file, message, line) {
  failures.push(`${relative(file)}${line ? `:${line}` : ""} - ${message}`);
}

function lineForMatch(content, index) {
  return content.slice(0, index).split("\n").length;
}

function scanPattern(files, label, pattern) {
  for (const file of files) {
    const content = readFileSync(file, "utf8");
    const match = pattern.exec(content);

    if (match?.index !== undefined) {
      addFailure(file, label, lineForMatch(content, match.index));
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
    warnings.push(
      `${relative(file)} - pdftotext unavailable or failed; binary PDF text scan skipped`
    );
    return "";
  }
}

const productionTextFiles = [
  ...walk(path.join(repoRoot, "apps/www/src")),
  ...walk(path.join(repoRoot, "apps/www/public"))
].filter((file) => textExtensions.has(path.extname(file)));

scanPattern(
  productionTextFiles,
  "production-facing TODO marker requires approval before launch",
  /\bTODO\b/i
);

scanPattern(
  productionTextFiles,
  "placeholder text appears in production-facing content",
  /\b(?:placeholder|lorem ipsum|replace this)\b/i
);

scanPattern(
  productionTextFiles,
  "raw or private transcript source appears in production-facing content",
  /\b(?:otter(?:\.ai|_ai)?|raw\s+(?:meeting\s+)?transcripts?|private\s+transcripts?|corrected[_ -]?(?:working[_ -]?)?transcripts?|repaired[_ -]?transcripts?)\b/i
);

scanPattern(
  productionTextFiles,
  "credential-like value appears in production-facing content",
  /\b(?:sk-proj-[A-Za-z0-9_-]{20,}|sk-[A-Za-z0-9_-]{20,}|ghp_[A-Za-z0-9]{20,}|AKIA[0-9A-Z]{16})\b/
);

scanPattern(
  productionTextFiles,
  "secret assignment appears in production-facing content",
  /\b(?:api[_-]?key|secret|token|password)\s*[:=]\s*["'][^"'\n]{12,}["']/i
);

const workDataPath = path.join(repoRoot, "apps/www/src/data/work.ts");
if (existsSync(workDataPath)) {
  const workData = readFileSync(workDataPath, "utf8");

  if (/visibility:\s*"private"/.test(workData)) {
    addFailure(workDataPath, "private work item is present in public data");
  }

  if (/status:\s*"Draft"/.test(workData)) {
    addFailure(workDataPath, "draft work item is present in public data");
  }
}

const siteDataPath = path.join(repoRoot, "apps/www/src/data/site.ts");
if (existsSync(siteDataPath)) {
  const siteData = readFileSync(siteDataPath, "utf8");

  if (!/NEXT_PUBLIC_CONTACT_EMAIL|mailto:[^"`']+@/.test(siteData)) {
    addFailure(siteDataPath, "public contact email source is missing");
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
  if (resumeText) {
    if (!/Jamie\s+Burkart/i.test(resumeText)) {
      addFailure(resumePath, "resume PDF text does not include Jamie Burkart");
    }

    if (/\b(?:TODO|placeholder|lorem ipsum|replace this)\b/i.test(resumeText)) {
      addFailure(resumePath, "resume PDF contains placeholder or TODO text");
    }
  }
}

for (const file of walk(repoRoot)) {
  const name = path.basename(file);
  const ext = path.extname(file).toLowerCase();

  if (name.startsWith(".env") && name !== ".env.example") {
    addFailure(file, "environment file must not be committed");
  }

  if (fontExtensions.has(ext)) {
    addFailure(file, "font file must not be committed or served from the repo");
  }
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

console.log("Public-safety check passed.");
