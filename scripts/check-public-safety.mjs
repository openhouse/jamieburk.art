#!/usr/bin/env node

import { execFileSync, spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "..");
const args = new Set(process.argv.slice(2));

const productionLike =
  args.has("--production") ||
  process.env.APP_ENV === "production" ||
  process.env.SITE_ENV === "production" ||
  process.env.NEXT_PUBLIC_DEPLOY_ENV === "production" ||
  process.env.NODE_ENV === "production";

const hardFailures = [];
const productionFindings = [];
const warnings = [];

const ignoredTextFiles = new Set([
  "scripts/check-public-safety.mjs"
]);

const ignoredDirectories = new Set([
  ".git",
  ".next",
  ".turbo",
  "coverage",
  "node_modules",
  "out"
]);

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
  ".yaml",
  ".yml"
]);

const fontExtensions = new Set([".ttf", ".otf", ".woff", ".woff2"]);
const appFacingRoots = ["apps/www/src", "apps/www/public"];
const shippedRoots = [...appFacingRoots, "apps/www/next.config.ts", "Dockerfile"];

function runGit(args) {
  const result = spawnSync("git", args, {
    cwd: repoRoot,
    encoding: "utf8",
    maxBuffer: 1024 * 1024 * 16
  });

  if (result.status !== 0) {
    hardFailures.push({
      label: "Unable to inspect tracked files",
      file: "git",
      line: 1,
      detail: result.stderr.trim()
    });
    return "";
  }

  return result.stdout;
}

function trackedFiles() {
  return runGit(["ls-files", "--cached", "--others", "--exclude-standard"]).split("\n").filter(Boolean);
}

function isInsideAny(file, roots) {
  return roots.some((root) => file === root || file.startsWith(`${root}/`));
}

function lineNumberForMatch(source, index) {
  return source.slice(0, index).split("\n").length;
}

function add(list, label, file, line = 1, detail = "") {
  list.push({ label, file, line, detail });
}

function readPdfText(filePath) {
  try {
    return execFileSync("pdftotext", [filePath, "-"], {
      cwd: repoRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
      maxBuffer: 8 * 1024 * 1024
    });
  } catch {
    const buffer = fs.readFileSync(filePath);
    return `${buffer.toString("utf8")}\n${buffer.toString("latin1")}`;
  }
}

function readSearchableText(file) {
  const filePath = path.join(repoRoot, file);
  const ext = path.extname(file).toLowerCase();

  if (ext === ".pdf") return readPdfText(filePath);
  if (!textExtensions.has(ext)) return "";

  return fs.readFileSync(filePath, "utf8");
}

function scanTrackedFile(file) {
  const ext = path.extname(file).toLowerCase();
  const basename = path.basename(file);

  if (file.startsWith(".agents/") || file.startsWith(".codex/")) return;

  if (fontExtensions.has(ext)) {
    add(hardFailures, "Tracked private/proprietary font file", file);
  }

  if (/\.(?:key|pem|p12|crt|cer)$/i.test(file)) {
    add(hardFailures, "Tracked key material", file);
  }

  if (basename.startsWith(".env") && basename !== ".env.example") {
    add(hardFailures, "Tracked non-example env file", file);
  }

  if (
    /(^|\/)(?:private|archive-private|raw|transcripts-private|client-private|legal-review|support-materials-private|support-private|job-hunt-private|screenshots-private|private-screenshots|raw-otter)(\/|$)|\.private\./i.test(file)
  ) {
    add(hardFailures, "Tracked private/source-material path", file);
  }

  if (ignoredTextFiles.has(file)) return;

  const source = readSearchableText(file);
  if (!source) return;

  const secretPatterns = [
    ["OpenAI key-looking string", /\bsk-(?:proj-)?[A-Za-z0-9_-]{20,}\b/i],
    ["GitHub token-looking string", /\bgh[pousr]_[A-Za-z0-9_]{20,}\b/i],
    ["Private key block", /-----BEGIN (?:RSA |OPENSSH |EC |DSA )?PRIVATE KEY-----/i],
    ["Secret-like assignment", /\b(?:api[_-]?key|secret|access[_-]?token|auth[_-]?token|client[_-]?secret|password|passwd)\s*[:=]\s*["']?[^"'\s<>]{8,}/i]
  ];

  for (const [label, pattern] of secretPatterns) {
    const match = pattern.exec(source);
    if (match) add(hardFailures, label, file, lineNumberForMatch(source, match.index));
  }

  const blockerPatterns = [
    ["Visible approval placeholder", /TODO:\s*Jamie approval required|Public email pending confirmation|LinkedIn pending|GitHub pending/i],
    ["Placeholder resume text", /placeholder r(?:e|\u00e9)sum(?:e|\u00e9)|replace (?:with|the) approved current resume|replace the placeholder/i],
    ["Private visibility state", /visibility\s*:\s*["']private["']/i],
    ["Draft work status state", /status\s*:\s*["']Draft["']/i],
    ["Raw transcript marker", /(?:otter\.ai|_otter|raw transcript|^\s*[A-Z][A-Za-z .'-]{1,60}\s+\d{1,2}:\d{2}(?::\d{2})?\s*$)/im],
    ["Private local source path", /(?:\/Volumes\/16TB_SSD\/Work\/|\/Users\/jburkart\/Library\/Mobile Documents|supporting-materials|job-hunt\/|iMessage\/)/i],
    ["Disallowed/private typeface reference", /Trade Gothic|Verlag|Gotham Rounded|maria-extra-bold|Oswald|League Spartan/i]
  ];

  for (const [label, pattern] of blockerPatterns) {
    const match = pattern.exec(source);
    if (!match) continue;

    const finding = {
      label,
      file,
      line: lineNumberForMatch(source, match.index)
    };

    if (isInsideAny(file, shippedRoots)) productionFindings.push(finding);
    else warnings.push(finding);
  }

  const warningPatterns = [
    ["Approval-sensitive term", /\b(?:source|archive|legal|transcript|private|client|dashboard|AI)\b/i],
    ["Phone-like value in public artifact", /\b(?:\+?1[-.\s]?)?(?:\([2-9]\d{2}\)|[2-9]\d{2})[-.\s]?\d{3}[-.\s]?\d{4}\b/]
  ];

  for (const [label, pattern] of warningPatterns) {
    const match = pattern.exec(source);
    if (match && isInsideAny(file, appFacingRoots)) {
      warnings.push({
        label,
        file,
        line: lineNumberForMatch(source, match.index)
      });
    }
  }
}

function checkRequiredFiles() {
  const resumePath = "apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf";
  if (!fs.existsSync(path.join(repoRoot, resumePath))) {
    add(hardFailures, "Missing resume PDF", resumePath);
    return;
  }

  const resumeText = readPdfText(path.join(repoRoot, resumePath));
  if (/Placeholder resume PDF|Replace with approved current resume/i.test(resumeText)) {
    add(hardFailures, "Placeholder resume PDF", resumePath);
  }

  const siteUrlSource = fs.readFileSync(path.join(repoRoot, "apps/www/src/lib/site-url.ts"), "utf8");
  const nextConfigSource = fs.readFileSync(path.join(repoRoot, "apps/www/next.config.ts"), "utf8");
  const combined = `${siteUrlSource}\n${nextConfigSource}`;

  if (!combined.includes('process.env.NEXT_PUBLIC_ROBOTS_POLICY === "index"')) {
    add(hardFailures, "Production indexing is not explicit opt-in", "apps/www/src/lib/site-url.ts");
  }

  for (const route of [
    "/work/source-backed-team-memory",
    "/work/196-artists-residency",
    "/work/fair-rent-crs",
    "/work/fairrentnyc-commercial-rent-stabilization",
    "/work/fairrentnyc",
    "/work/nyc-artist-coalition-fair-rent"
  ]) {
    if (!nextConfigSource.includes(`source: "${route}"`)) {
      add(hardFailures, `Missing redirect source ${route}`, "apps/www/next.config.ts");
    }
  }

  if (!nextConfigSource.includes('source: "/resume/:path*"') || !nextConfigSource.includes("noindex, noarchive")) {
    add(hardFailures, "Resume PDF noindex/noarchive header missing", "apps/www/next.config.ts");
  }
}

function checkProductionEnvironment() {
  if (!productionLike) return;

  const expectedUrl = "https://jamieburk.art";
  for (const name of ["SITE_URL", "NEXT_PUBLIC_SITE_URL"]) {
    const value = process.env[name]?.replace(/\/$/, "");
    if (value !== expectedUrl) {
      add(productionFindings, `${name} must be ${expectedUrl}`, "environment");
    }
  }

  if (process.env.NEXT_PUBLIC_ROBOTS_POLICY !== "index") {
    add(productionFindings, "NEXT_PUBLIC_ROBOTS_POLICY must be index", "environment");
  }
}

function report(title, list, logger = console.error) {
  logger(title);
  for (const item of list.slice(0, 80)) {
    logger(`- ${item.label}: ${item.file}:${item.line}${item.detail ? ` (${item.detail})` : ""}`);
  }
  if (list.length > 80) logger(`- plus ${list.length - 80} more finding(s)`);
}

for (const file of trackedFiles()) scanTrackedFile(file);
checkRequiredFiles();
checkProductionEnvironment();

if (warnings.length) {
  report("Public-safety warnings for review. Values are intentionally not printed:", warnings, console.warn);
}

if (hardFailures.length) {
  report("Public-safety check failed.", hardFailures);
  process.exit(1);
}

if (productionFindings.length && productionLike) {
  report("Public-safety production check failed.", productionFindings);
  process.exit(1);
}

if (productionFindings.length) {
  report("Public-safety scan found production launch blockers. These are allowed outside production:", productionFindings, console.warn);
}

console.log(`Public-safety scan passed in ${productionLike ? "production" : "non-production"} mode.`);
