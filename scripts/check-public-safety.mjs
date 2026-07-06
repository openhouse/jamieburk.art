import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const production = process.argv.includes("--production");
const blockers = [];
const warnings = [];

const skippedDirs = new Set([
  ".git",
  ".next",
  ".npm-cache",
  "coverage",
  "node_modules",
  "out"
]);

const blockedPathSegments = new Set([
  "archive-private",
  "client-private",
  "legal-review",
  "private",
  "raw",
  "transcripts-private"
]);

const textExtensions = new Set([
  ".css",
  ".html",
  ".js",
  ".json",
  ".md",
  ".mdx",
  ".mjs",
  ".ts",
  ".tsx",
  ".txt",
  ".yaml",
  ".yml"
]);

const fontExtensions = new Set([".eot", ".otf", ".ttf", ".woff", ".woff2"]);

const publicFacingPattern = /^(apps\/www\/src\/(app|components|content|data)|apps\/www\/public)\//;
const docsPattern = /^(docs|README\.md|DESIGN\.md|AGENTS\.md)\b/;
const toolingPattern = /^scripts\//;

const allFiles = [];

function relative(filePath) {
  return path.relative(root, filePath).split(path.sep).join("/");
}

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (skippedDirs.has(entry.name)) continue;
    const absolute = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(absolute);
      continue;
    }
    if (entry.isFile()) allFiles.push(absolute);
  }
}

function addBlocker(file, message) {
  blockers.push(`${file}: ${message}`);
}

function addWarning(file, message) {
  warnings.push(`${file}: ${message}`);
}

function readText(filePath) {
  const ext = path.extname(filePath);
  if (!textExtensions.has(ext) && path.basename(filePath) !== ".env.example") {
    return undefined;
  }

  const buffer = readFileSync(filePath);
  if (buffer.includes(0)) return undefined;
  return buffer.toString("utf8");
}

function readPdfText(filePath) {
  try {
    return execFileSync("pdftotext", ["-layout", filePath, "-"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"]
    });
  } catch {
    return readFileSync(filePath).toString("latin1");
  }
}

function checkPath(filePath) {
  const rel = relative(filePath);
  const segments = rel.split("/");
  const ext = path.extname(rel).toLowerCase();
  const base = path.basename(rel);

  if (segments.some((segment) => blockedPathSegments.has(segment))) {
    addBlocker(rel, "file is inside a private/protected source folder");
  }

  if (base.startsWith(".env") && base !== ".env.example") {
    addBlocker(rel, "tracked env files are not public-safe");
  }

  if (rel.includes(".private.")) {
    addBlocker(rel, "private-named files must stay out of the repo");
  }

  if (fontExtensions.has(ext)) {
    addBlocker(rel, "local font files must not be committed for V1");
  }
}

function checkText(filePath, text) {
  const rel = relative(filePath);
  const publicFacing = publicFacingPattern.test(rel);
  const docs = docsPattern.test(rel);

  const blockerPatterns = [
    [/-----BEGIN (RSA |OPENSSH |EC |DSA )?PRIVATE KEY-----/, "private key material"],
    [/\bsk-proj-[A-Za-z0-9_-]{16,}/, "OpenAI project key-looking string"],
    [/\bsk-[A-Za-z0-9]{24,}/, "OpenAI key-looking string"],
    [/\bAKIA[0-9A-Z]{16}\b/, "AWS access key-looking string"],
    [/\bghp_[A-Za-z0-9]{24,}\b/, "GitHub token-looking string"],
    [/\bOPENAI_API_KEY\s*=\s*[^#\s]+/, "non-empty OPENAI_API_KEY assignment"]
  ];

  for (const [pattern, message] of blockerPatterns) {
    if (pattern.test(text)) addBlocker(rel, message);
  }

  if (production && publicFacing && /TODO: Jamie approval required/.test(text)) {
    addBlocker(rel, "production-facing TODO approval marker remains");
  }

  if (
    production &&
    publicFacing &&
    /\b(Trade Gothic|Verlag|Gotham Rounded|FondFont RISQUE|Maria)\b/i.test(text)
  ) {
    addBlocker(rel, "private/proprietary font reference appears in app code or content");
  }

  if (
    !docs &&
    !toolingPattern.test(rel) &&
    publicFacing &&
    /\b(raw transcript|private coalition notes|legal-review material)\b/i.test(text)
  ) {
    addWarning(rel, "sensitive category wording appears outside docs; confirm it is context, not source material");
  }
}

function checkPdf(filePath) {
  const rel = relative(filePath);
  const text = readPdfText(filePath);

  if (/Placeholder Resume PDF/i.test(text)) {
    addBlocker(rel, "placeholder resume PDF is still present");
  }

  if (rel.startsWith("apps/www/public/") && /\b(raw transcript|legal-review|private coalition)\b/i.test(text)) {
    addBlocker(rel, "public PDF appears to contain private-source category text");
  }
}

walk(root);

for (const filePath of allFiles) {
  checkPath(filePath);
  const text = readText(filePath);
  if (text !== undefined) checkText(filePath, text);
  if (path.extname(filePath).toLowerCase() === ".pdf") checkPdf(filePath);
}

const resumePath = path.join(
  root,
  "apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf"
);

if (!existsSync(resumePath)) {
  addBlocker("apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf", "resume PDF is missing");
} else if (statSync(resumePath).size < 10000) {
  addBlocker("apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf", "resume PDF still looks like a placeholder");
}

if (production) {
  if (!process.env.NEXT_PUBLIC_CONTACT_EMAIL) {
    addBlocker("environment", "NEXT_PUBLIC_CONTACT_EMAIL is required for production");
  }
  if (process.env.SITE_URL !== "https://jamieburk.art") {
    addBlocker("environment", "SITE_URL must be https://jamieburk.art for production");
  }
  if (
    process.env.NEXT_PUBLIC_SITE_URL &&
    process.env.NEXT_PUBLIC_SITE_URL !== "https://jamieburk.art"
  ) {
    addBlocker("environment", "NEXT_PUBLIC_SITE_URL must be https://jamieburk.art for production");
  }
  if (process.env.NEXT_PUBLIC_ROBOTS_POLICY !== "index") {
    addBlocker("environment", "NEXT_PUBLIC_ROBOTS_POLICY must be index for production indexing");
  }
}

for (const warning of warnings) {
  console.warn(`warning: ${warning}`);
}

if (blockers.length > 0) {
  console.error("Public-safety check failed:");
  for (const blocker of blockers) console.error(`- ${blocker}`);
  process.exit(1);
}

console.log(`Public-safety check passed${production ? " for production" : ""}.`);
