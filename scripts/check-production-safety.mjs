import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const resumeRelativePath =
  "apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf";
const productionFacingPaths = [
  "apps/www/src",
  "apps/www/public",
  "apps/www/mdx-components.tsx"
];
const reviewOnlyPaths = [
  "README.md",
  "AGENTS.md",
  "docs",
  "package.json",
  "apps/www/package.json",
  "apps/www/next.config.ts",
  ".gitignore",
  ".dockerignore"
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
  ".txt"
]);

const blockers = [];
const warnings = [];
const productionMode = process.argv.includes("--production");

const productionBlockers = [
  {
    label: "visible Jamie approval TODO",
    pattern: /TODO:\s*Jamie approval required/i
  },
  {
    label: "placeholder resume language",
    pattern: /Placeholder resume PDF|Replace with approved current resume|replace the placeholder\s+PDF/i
  },
  { label: "unapproved LinkedIn surface", pattern: /LinkedIn/i },
  { label: "private visibility", pattern: /visibility:\s*["']?private["']?/i },
  { label: "draft status", pattern: /status:\s*["']?Draft["']?/ },
  { label: "do-not-publish marker", pattern: /DO NOT PUBLISH/i },
  { label: "confidential marker", pattern: /CONFIDENTIAL/i },
  { label: "internal-only marker", pattern: /INTERNAL ONLY/i },
  { label: "private-data marker", pattern: /PRIVATE_DATA/i },
  { label: "raw Otter marker", pattern: /raw\s+Otter/i },
  { label: "private transcript marker", pattern: /private\s+transcript/i },
  { label: "corrected working transcript marker", pattern: /Corrected Working Transcript/i },
  { label: "Jonathan Marmor transcript marker", pattern: /Jonathan Marmor transcript/i },
  {
    label: "private transcript filename",
    pattern:
      /2025-12-08-Call with Jonathan Marmor_otter\.ai|2025-12-11-Call with Jonathan Marmor_otter\.ai|What is WOW List__otter_ai_transcript/i
  },
  {
    label: "known private source path",
    pattern: /supporting-materials|Jamie Projects History|job-hunt/i
  },
  {
    label: "credential-looking token",
    pattern:
      /\b(?:sk-[A-Za-z0-9_-]{20,}|ghp_[A-Za-z0-9_]{20,}|github_pat_[A-Za-z0-9_]{20,})\b/
  },
  {
    label: "private key material",
    pattern: /-----BEGIN (?:RSA |OPENSSH |EC |DSA )?PRIVATE KEY-----/
  },
  {
    label: "secret assignment",
    pattern:
      /\b(?:api[_-]?key|client[_-]?secret|access[_-]?token|auth[_-]?token|private[_-]?key)\s*[:=]\s*["'][^"']{12,}["']/i
  }
];

const publicTranscriptShape =
  /^\s*[A-Z][A-Za-z .'-]{1,60}\s+\d{1,2}:\d{2}(?::\d{2})?\s*$/m;

const reviewWarnings = [
  { label: "raw transcript discussion", pattern: /raw transcripts?/i },
  { label: "legal-review discussion", pattern: /legal-review materials?/i },
  { label: "private correspondence discussion", pattern: /private correspondence/i },
  { label: "stakeholder list discussion", pattern: /stakeholder lists?/i },
  { label: "client-private discussion", pattern: /client-private/i }
];

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function walk(relativePath) {
  const absolutePath = path.join(root, relativePath);
  if (!fs.existsSync(absolutePath)) return [];

  const stat = fs.statSync(absolutePath);
  if (stat.isFile()) return [absolutePath];

  return fs.readdirSync(absolutePath, { withFileTypes: true }).flatMap((entry) => {
    const childRelativePath = path.join(relativePath, entry.name);
    if (entry.isDirectory()) return walk(childRelativePath);
    if (entry.isFile()) return [path.join(root, childRelativePath)];
    return [];
  });
}

function readText(filePath) {
  const buffer = fs.readFileSync(filePath);
  return buffer.toString("utf8");
}

function readSearchableBytes(filePath) {
  const buffer = fs.readFileSync(filePath);
  return `${buffer.toString("utf8")}\n${buffer.toString("latin1")}`;
}

function lineFor(content, index) {
  return content.slice(0, index).split(/\r?\n/).length;
}

function relative(filePath) {
  return path.relative(root, filePath);
}

function isTextFile(filePath) {
  return textExtensions.has(path.extname(filePath).toLowerCase());
}

function addBlocker(filePath, label, detail = "") {
  blockers.push(`${filePath}: ${label}${detail ? ` (${detail})` : ""}`);
}

if (productionMode) {
  const nodeMajor = Number(process.versions.node.split(".")[0]);
  if (nodeMajor !== 26) addBlocker("environment", "Node 26 is required for production verification");
  if (process.env.APP_ENV !== "production") {
    addBlocker("environment", "APP_ENV must be production for production verification");
  }
  if (process.env.SITE_ENV !== "production") {
    addBlocker("environment", "SITE_ENV must be production for production verification");
  }
  if (process.env.NEXT_PUBLIC_DEPLOY_ENV !== "production") {
    addBlocker("environment", "NEXT_PUBLIC_DEPLOY_ENV must be production");
  }
  if (process.env.SITE_URL !== "https://jamieburk.art") {
    addBlocker("environment", "SITE_URL must be https://jamieburk.art");
  }
  if (process.env.NEXT_PUBLIC_SITE_URL !== "https://jamieburk.art") {
    addBlocker("environment", "NEXT_PUBLIC_SITE_URL must be https://jamieburk.art");
  }
  if (process.env.NEXT_PUBLIC_ROBOTS_POLICY !== "index") {
    addBlocker("environment", "NEXT_PUBLIC_ROBOTS_POLICY must be index");
  }
}

for (const scanPath of productionFacingPaths) {
  for (const filePath of walk(scanPath)) {
    if (!isTextFile(filePath)) continue;

    const content = readText(filePath);
    const file = relative(filePath);

    for (const blocker of productionBlockers) {
      const match = blocker.pattern.exec(content);
      if (match) addBlocker(file, blocker.label, `line ${lineFor(content, match.index)}`);
    }

    if (file.startsWith("apps/www/public/") && publicTranscriptShape.test(content)) {
      addBlocker(file, "transcript-shaped public asset");
    }
  }
}

for (const scanPath of reviewOnlyPaths) {
  for (const filePath of walk(scanPath)) {
    if (!isTextFile(filePath)) continue;

    const content = readText(filePath);
    const file = relative(filePath);

    for (const blocker of productionBlockers.slice(8)) {
      const match = blocker.pattern.exec(content);
      if (match) addBlocker(file, blocker.label, `line ${lineFor(content, match.index)}`);
    }

    for (const warning of reviewWarnings) {
      const match = warning.pattern.exec(content);
      if (match) {
        warnings.push(`${file}: ${warning.label} (line ${lineFor(content, match.index)})`);
      }
    }
  }
}

if (!exists(resumeRelativePath)) {
  addBlocker(resumeRelativePath, "resume PDF is missing");
} else {
  const resumePath = path.join(root, resumeRelativePath);
  const size = fs.statSync(resumePath).size;
  const resumeText = readSearchableBytes(resumePath);

  if (size === 774) addBlocker(resumeRelativePath, "resume PDF still has placeholder size");
  if (/Placeholder resume PDF|Replace with approved current resume/i.test(resumeText)) {
    addBlocker(resumeRelativePath, "resume PDF still contains placeholder language");
  }
}

const siteDataPath = "apps/www/src/data/site.ts";
if (!exists(siteDataPath)) {
  addBlocker(siteDataPath, "site data file is missing");
} else {
  const siteData = readText(path.join(root, siteDataPath));
  if (!siteData.includes('emailLabel: "jamie.burkart@gmail.com"')) {
    addBlocker(siteDataPath, "approved public email label is missing");
  }
  if (!siteData.includes('emailHref: "mailto:jamie.burkart@gmail.com"')) {
    addBlocker(siteDataPath, "approved public email href is missing");
  }
}

let trackedFiles = [];
try {
  trackedFiles = execFileSync("git", ["ls-files"], {
    cwd: root,
    encoding: "utf8"
  })
    .split(/\r?\n/)
    .filter(Boolean);
} catch (error) {
  warnings.push("Could not inspect tracked files with git ls-files.");
}

for (const file of trackedFiles) {
  const ext = path.extname(file).toLowerCase();

  if (
    /(^|\/)(private|archive-private|raw|transcripts-private|client-private|legal-review)(\/|$)/.test(
      file
    ) ||
    /\bprivate\b|\braw\b|\blegal-review\b|\bclient-private\b/i.test(path.basename(file))
  ) {
    addBlocker(file, "tracked private/raw/legal-review/client-private path");
  }

  if (file.match(/(^|\/)\.env(\.|$)/) && file !== ".env.example") {
    addBlocker(file, "tracked environment file");
  }

  if ([".ttf", ".otf", ".woff", ".woff2"].includes(ext)) {
    addBlocker(file, "tracked font file");
  }
}

if (warnings.length) {
  console.warn("Production safety warnings:");
  for (const warning of warnings) console.warn(`- ${warning}`);
}

if (blockers.length) {
  console.error("Production safety blockers:");
  for (const blocker of blockers) console.error(`- ${blocker}`);
  process.exit(1);
}

console.log("Production safety check passed.");
