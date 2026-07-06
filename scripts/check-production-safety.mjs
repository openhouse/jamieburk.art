#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const production = process.argv.includes("--production");
const failures = [];
const warnings = [];

const publicRoots = ["apps/www/src", "apps/www/public"];
const docRoots = ["AGENTS.md", "README.md", "PRODUCT.md", "docs"];
const ignoredDirectories = new Set([
  ".git",
  ".next",
  "node_modules",
  "out",
  "coverage",
  "dist"
]);
const binaryExtensions = new Set([
  ".avif",
  ".gif",
  ".ico",
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".woff",
  ".woff2",
  ".ttf",
  ".otf"
]);

function resolve(relativePath) {
  return path.join(root, relativePath);
}

function fail(message) {
  failures.push(message);
}

function warn(message) {
  warnings.push(message);
}

function walk(relativePath) {
  const absolutePath = resolve(relativePath);

  if (!existsSync(absolutePath)) {
    return [];
  }

  const stat = statSync(absolutePath);

  if (stat.isDirectory()) {
    if (ignoredDirectories.has(path.basename(relativePath))) {
      return [];
    }

    return readdirSync(absolutePath).flatMap((entry) => walk(path.join(relativePath, entry)));
  }

  return [relativePath];
}

function readText(relativePath) {
  const buffer = readFileSync(resolve(relativePath));
  return buffer.toString("utf8");
}

function readRawText(relativePath) {
  const buffer = readFileSync(resolve(relativePath));
  return `${buffer.toString("utf8")}\n${buffer.toString("latin1")}`;
}

function findExecutable(command, candidates = []) {
  for (const directory of (process.env.PATH ?? "").split(path.delimiter)) {
    if (!directory) continue;

    const candidate = path.join(directory, command);

    if (existsSync(candidate)) {
      return candidate;
    }
  }

  return candidates.find((candidate) => existsSync(candidate));
}

function scanFiles(files, checks, scopeName) {
  for (const file of files) {
    const extension = path.extname(file).toLowerCase();

    if (binaryExtensions.has(extension)) {
      continue;
    }

    const text = extension === ".pdf" ? readRawText(file) : readText(file);

    for (const check of checks) {
      if (check.pattern.test(text)) {
        fail(`${scopeName}: ${file} contains ${check.label}.`);
      }
    }
  }
}

const publicChecks = [
  { label: "a visible approval TODO", pattern: /TODO:\s*Jamie approval required/i },
  { label: "placeholder resume copy", pattern: /Placeholder resume PDF|Replace with approved current resume/i },
  { label: "pending public contact copy", pattern: /Public email pending confirmation|GitHub pending|LinkedIn pending/i },
  { label: "draft-only work metadata", pattern: /status:\s*["']Draft["']/ },
  { label: "private work metadata", pattern: /visibility:\s*["']private["']/ },
  { label: "raw Otter material", pattern: /raw\s+Otter/i },
  {
    label: "private transcript material",
    pattern: /private\s+transcript|Corrected Working Transcript|Jonathan Marmor[^"\n]*transcript/i
  },
  {
    label: "a private source-material path",
    pattern: /\/Volumes\/16TB_SSD\/Work\/Jamie\/Portfolio\/supporting-materials|supporting-materials\//i
  },
  { label: "uppercase PRIVATE marker", pattern: /\bPRIVATE\b/ },
  { label: "uppercase CONFIDENTIAL marker", pattern: /\bCONFIDENTIAL\b/ },
  {
    label: "a credential-like assignment",
    pattern:
      /\b(api[_-]?key|auth[_-]?token|access[_-]?token|refresh[_-]?token|secret|password)\b\s*[:=]\s*["'][^"']{8,}["']/i
  },
  { label: "a private environment file reference", pattern: /\.env\.(local|production|private)\b/i }
];

const docChecks = [
  { label: "an unresolved approval TODO", pattern: /TODO:\s*Jamie approval required/i },
  { label: "placeholder resume copy", pattern: /Placeholder resume PDF|Replace with approved current resume/i },
  {
    label: "a private source-material path",
    pattern: /\/Volumes\/16TB_SSD\/Work\/Jamie\/Portfolio\/supporting-materials|supporting-materials\//i
  },
  {
    label: "a credential-like assignment",
    pattern:
      /\b(api[_-]?key|auth[_-]?token|access[_-]?token|refresh[_-]?token|secret|password)\b\s*[:=]\s*["'][^"']{8,}["']/i
  }
];

const publicFiles = publicRoots.flatMap(walk);
const docFiles = docRoots.flatMap(walk);

scanFiles(publicFiles, publicChecks, "public surface");
scanFiles(docFiles, docChecks, "documentation");

const privateDirectories = ["private/", "raw/", "transcripts-private/", "client-private/", "legal-review/"];

for (const ignoreFile of [".gitignore", ".dockerignore"]) {
  const text = existsSync(resolve(ignoreFile)) ? readText(ignoreFile) : "";

  for (const directory of privateDirectories) {
    if (!text.includes(directory)) {
      fail(`${ignoreFile} must ignore ${directory}.`);
    }
  }
}

const resumePath = "apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf";

if (!existsSync(resolve(resumePath))) {
  fail(`${resumePath} is missing.`);
} else {
  let resumeText = readRawText(resumePath);
  const pdfToText = findExecutable("pdftotext", [
    "/opt/homebrew/bin/pdftotext",
    "/usr/local/bin/pdftotext",
    "/opt/local/bin/pdftotext"
  ]);

  if (pdfToText) {
    try {
      resumeText += `\n${execFileSync(pdfToText, [resolve(resumePath), "-"], {
        encoding: "utf8",
        maxBuffer: 5 * 1024 * 1024
      })}`;
    } catch {
      warn("pdftotext failed, so resume accessibility was checked only with a raw PDF scan.");
    }
  } else {
    warn("pdftotext is not available, so resume accessibility was checked only with a raw PDF scan.");
  }

  if (/Placeholder resume PDF|Replace with approved current resume/i.test(resumeText)) {
    fail(`${resumePath} still looks like the placeholder resume.`);
  }

  if (production && resumeText.replace(/\s+/g, " ").trim().length < 1000) {
    fail(`${resumePath} does not expose enough selectable text for a production resume.`);
  }
}

const siteData = readText("apps/www/src/data/site.ts");

if (!siteData.includes("jamie.burkart@gmail.com")) {
  fail("apps/www/src/data/site.ts must include the approved public email.");
}

if (!siteData.includes("https://github.com/openhouse")) {
  fail("apps/www/src/data/site.ts must include the approved GitHub URL.");
}

if (/linkedin/i.test(siteData)) {
  fail("LinkedIn should stay omitted until the URL is confirmed.");
}

const siteUrlText = readText("apps/www/src/lib/site-url.ts");
const nextConfigText = readText("apps/www/next.config.ts");

if (!siteUrlText.includes('NEXT_PUBLIC_ROBOTS_POLICY === "index"')) {
  fail("apps/www/src/lib/site-url.ts must make indexing opt-in with NEXT_PUBLIC_ROBOTS_POLICY=index.");
}

if (!nextConfigText.includes('NEXT_PUBLIC_ROBOTS_POLICY === "index"')) {
  fail("apps/www/next.config.ts must make indexing opt-in with NEXT_PUBLIC_ROBOTS_POLICY=index.");
}

for (const route of [
  "/work/fairrentnyc-commercial-rent-stabilization",
  "/work/fairrentnyc",
  "/work/source-backed-team-memory",
  "/work/196-artists-residency"
]) {
  if (!nextConfigText.includes(route)) {
    fail(`apps/www/next.config.ts is missing redirect coverage for ${route}.`);
  }
}

if (production) {
  const requiredEnv = {
    APP_ENV: "production",
    SITE_ENV: "production",
    NEXT_PUBLIC_DEPLOY_ENV: "production",
    SITE_URL: "https://jamieburk.art",
    NEXT_PUBLIC_SITE_URL: "https://jamieburk.art",
    NEXT_PUBLIC_ROBOTS_POLICY: "index"
  };

  for (const [name, expected] of Object.entries(requiredEnv)) {
    if (process.env[name] !== expected) {
      fail(`production safety requires ${name}=${expected}.`);
    }
  }
}

for (const message of warnings) {
  console.warn(`Warning: ${message}`);
}

if (failures.length > 0) {
  console.error("Production safety check failed:");

  for (const message of failures) {
    console.error(`- ${message}`);
  }

  process.exit(1);
}

console.log(
  production
    ? "Production safety check passed."
    : "Production safety check passed for the current environment."
);
