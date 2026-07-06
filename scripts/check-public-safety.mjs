import { execFileSync } from "node:child_process";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const placeholderResumeHash =
  "c74cf11cb6d57e3483b3731a0b741da7714a6044588f5f901623a08820db40c4";
const resumePath = path.join(
  repoRoot,
  "apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf"
);

const productionLike =
  process.env.APP_ENV === "production" ||
  process.env.SITE_ENV === "production" ||
  process.env.NEXT_PUBLIC_DEPLOY_ENV === "production" ||
  process.argv.includes("--production");

const failures = [];
const warnings = [];

const ignoredDirs = new Set([
  ".git",
  ".next",
  "coverage",
  "node_modules",
  "out"
]);

const strictRoots = ["apps/www/src", "apps/www/public"];
const docsRoots = ["README.md", "AGENTS.md", "docs", "Dockerfile", ".env.example"];
const textExtensions = new Set([
  ".css",
  ".js",
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
const fontExtensions = new Set([".ttf", ".otf", ".woff", ".woff2"]);

function addIssue(kind, message) {
  if (kind === "failure") {
    failures.push(message);
    return;
  }

  if (productionLike) {
    failures.push(message);
  } else {
    warnings.push(message);
  }
}

function walk(entry) {
  const fullPath = path.join(repoRoot, entry);
  if (!fs.existsSync(fullPath)) return [];

  const stat = fs.statSync(fullPath);
  if (stat.isFile()) return [fullPath];
  if (!stat.isDirectory()) return [];

  const files = [];
  for (const child of fs.readdirSync(fullPath)) {
    if (ignoredDirs.has(child)) continue;
    const childPath = path.join(entry, child);
    files.push(...walk(childPath));
  }
  return files;
}

function rel(file) {
  return path.relative(repoRoot, file);
}

function readText(file) {
  return fs.readFileSync(file, "utf8");
}

function checkTextPatterns(file, mode) {
  const relative = rel(file);
  const ext = path.extname(file);
  if (!textExtensions.has(ext) && path.basename(file) !== "Dockerfile") return;

  let text;
  try {
    text = readText(file);
  } catch {
    return;
  }

  const lines = text.split(/\r?\n/);
  lines.forEach((line, index) => {
    const location = `${relative}:${index + 1}`;

    if (mode === "strict" && /TODO:\s*Jamie approval required/i.test(line)) {
      addIssue("warning", `${location} visible Jamie approval TODO`);
    }

    if (mode === "strict" && /\/Volumes\/|\/Users\/|~\//.test(line)) {
      addIssue("warning", `${location} private local path in production-facing source`);
    }

    if (mode === "strict" && /\b(archive-private|raw|transcripts-private|client-private|legal-review)\//i.test(line)) {
      addIssue("warning", `${location} private source path marker`);
    }

    if (mode === "strict" && /visibility:\s*["']private["']/.test(line)) {
      addIssue("warning", `${location} private work item visibility`);
    }

    if (mode === "strict" && /status:\s*["']Draft["']/.test(line)) {
      addIssue("warning", `${location} draft work item status`);
    }

    if (/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/.test(line)) {
      addIssue("failure", `${location} private key block`);
    }

    if (/\bsk-[A-Za-z0-9_-]{20,}/.test(line)) {
      addIssue("failure", `${location} credential-looking sk- token`);
    }

    if (/\b(?:OPENAI_API_KEY|PASSWORD|SECRET|TOKEN)\s*=\s*["']?[^"'\s<>{}]+/i.test(line)) {
      addIssue("failure", `${location} credential-looking assignment`);
    }
  });
}

function sha256(file) {
  return crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
}

function extractPdfText(file) {
  try {
    return execFileSync("pdftotext", [file, "-"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"]
    });
  } catch {
    return fs.readFileSync(file, "latin1");
  }
}

function checkResume() {
  if (!fs.existsSync(resumePath)) {
    addIssue("warning", `${rel(resumePath)} missing resume PDF`);
    return;
  }

  const hash = sha256(resumePath);
  if (hash === placeholderResumeHash) {
    addIssue("warning", `${rel(resumePath)} matches known placeholder resume hash`);
  }

  const text = extractPdfText(resumePath);
  if (/Placeholder resume PDF|Replace with approved current resume before launch/i.test(text)) {
    addIssue("warning", `${rel(resumePath)} contains placeholder resume text`);
  }
}

function checkFiles() {
  const strictFiles = strictRoots.flatMap(walk);
  const docsFiles = docsRoots.flatMap(walk);
  const allFiles = [...strictFiles, ...docsFiles];

  for (const file of allFiles) {
    const relative = rel(file);
    const ext = path.extname(file);

    if (fontExtensions.has(ext)) {
      addIssue("failure", `${relative} private/proprietary font binary committed`);
    }
  }

  for (const file of strictFiles) {
    checkTextPatterns(file, "strict");
  }

  for (const file of docsFiles) {
    checkTextPatterns(file, "docs");
  }
}

function checkTrackedEnvFiles() {
  try {
    const tracked = execFileSync("git", ["ls-files"], { encoding: "utf8" })
      .split(/\r?\n/)
      .filter(Boolean);

    for (const file of tracked) {
      const basename = path.basename(file);
      if ((basename === ".env" || basename.startsWith(".env.")) && basename !== ".env.example") {
        addIssue("failure", `${file} committed env file`);
      }
    }
  } catch {
    warnings.push("Could not inspect tracked files for committed env files.");
  }
}

checkFiles();
checkTrackedEnvFiles();
checkResume();

if (warnings.length) {
  console.warn("Public-safety warnings:");
  for (const warning of warnings) {
    console.warn(`- ${warning}`);
  }
}

if (failures.length) {
  console.error("Public-safety blockers:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Public-safety scan passed.");
