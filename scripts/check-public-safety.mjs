#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const isProduction =
  process.env.APP_ENV === "production" ||
  process.env.SITE_ENV === "production" ||
  process.env.NEXT_PUBLIC_DEPLOY_ENV === "production" ||
  process.env.NODE_ENV === "production";

const failures = [];
const warnings = [];

const allowlistPath = path.join(root, "scripts/public-safety-allowlist.json");
const allowlist = fs.existsSync(allowlistPath)
  ? JSON.parse(fs.readFileSync(allowlistPath, "utf8"))
  : [];

function report(kind, label, file, detail) {
  const item = `${label}${file ? `: ${file}` : ""}${detail ? ` (${detail})` : ""}`;
  if (kind === "failure") failures.push(item);
  else warnings.push(item);
}

function isAllowed(pattern, file) {
  return allowlist.some((entry) => {
    return entry.pattern === pattern && entry.file === file;
  });
}

function run(command, args) {
  return spawnSync(command, args, {
    cwd: root,
    encoding: "utf8",
    maxBuffer: 1024 * 1024 * 24
  });
}

function trackedFiles() {
  const result = run("git", ["ls-files"]);
  if (result.status !== 0) {
    report("failure", "Unable to list tracked files", "", result.stderr.trim());
    return [];
  }
  return result.stdout.split("\n").filter(Boolean);
}

function readText(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

function exists(file) {
  return fs.existsSync(path.join(root, file));
}

const files = trackedFiles();
const scanFiles = files.filter((file) => {
  return !file.startsWith(".agents/") && !file.startsWith(".codex/") && !file.startsWith(".impeccable/");
});
const fontExtensions = /\.(?:ttf|otf|woff|woff2)$/i;
const privatePathPattern =
  /(^|\/)(?:private|archive-private|raw|transcripts-private|client-private|legal-review|support-materials-private)(\/|$)|\.private\./i;
const envFilePattern = /(^|\/)\.env(?:\.|$)/;

for (const file of scanFiles) {
  if (fontExtensions.test(file)) {
    report("failure", "Tracked font file", file);
  }
  if (privatePathPattern.test(file)) {
    report("failure", "Tracked private/source-material path", file);
  }
  if (envFilePattern.test(file) && file !== ".env.example") {
    report("failure", "Tracked non-example env file", file);
  }
  if (/\.(?:key|pem)$/i.test(file)) {
    report("failure", "Tracked key material", file);
  }
}

const textFiles = scanFiles.filter((file) => {
  return (
    file === "Dockerfile" ||
    /\.(?:md|mdx|ts|tsx|js|jsx|json|mjs|css|txt|example|yml|yaml|toml)$/i.test(file)
  );
});

const credentialPatterns = [
  ["OPENAI_API_KEY", /OPENAI_API_KEY\s*=\s*(?!$|your-|example|placeholder)/i],
  ["Secret-like sk token", /\bsk-(?:proj-)?[A-Za-z0-9_-]{20,}/],
  ["Private key block", /-----BEGIN (?:RSA |OPENSSH |EC |DSA )?PRIVATE KEY-----/],
  ["Password assignment", /\bpassword\s*[:=]\s*["']?[^"'\s<>]{8,}/i],
  ["Secret assignment", /\bsecret\s*[:=]\s*["']?[^"'\s<>]{8,}/i],
  ["Token assignment", /\btoken\s*[:=]\s*["']?[^"'\s<>]{12,}/i]
];

const shippedTextRoots = [
  "apps/www/src/",
  "apps/www/public/",
  "apps/www/mdx-components.tsx",
  "apps/www/next.config.ts",
  "Dockerfile"
];

function isShippedText(file) {
  return shippedTextRoots.some((prefix) => file === prefix || file.startsWith(prefix));
}

for (const file of textFiles) {
  const text = readText(file);
  const scannerRuleFile = file === "scripts/check-public-safety.mjs";
  const allowlistFile = file === "scripts/public-safety-allowlist.json";
  const knowledgeBankScannerFile = file === "scripts/check-knowledge-bank.mjs";
  const knowledgeBankAllowlistFile = file === "scripts/knowledge-bank-allowlist.json";

  for (const [label, pattern] of credentialPatterns) {
    if (pattern.test(text)) {
      report("failure", label, file);
    }
  }

  if (!scannerRuleFile && /Placeholder resume PDF|Replace with approved current resume/.test(text)) {
    report(isShippedText(file) ? "failure" : "warning", "Placeholder resume text", file);
  }

  if (
    !scannerRuleFile &&
    !knowledgeBankScannerFile &&
    /TODO: Jamie approval required|Public email pending confirmation|LinkedIn pending|GitHub pending/.test(text)
  ) {
    report(isShippedText(file) ? "failure" : "warning", "Visible approval placeholder", file);
  }

  if (
    !scannerRuleFile &&
    !allowlistFile &&
    !knowledgeBankScannerFile &&
    !knowledgeBankAllowlistFile &&
    /raw transcript/i.test(text) &&
    !isAllowed("raw transcript", file)
  ) {
    report(isShippedText(file) ? "failure" : "warning", "Raw transcript policy/content term", file);
  }

  if (/Otter transcript|otter\.ai/i.test(text) && isShippedText(file)) {
    report("failure", "Otter/raw transcript marker in shipped surface", file);
  }

  if (/Trade Gothic|Verlag|Gotham Rounded|maria-extra-bold|Oswald/i.test(text) && isShippedText(file)) {
    report("failure", "Disallowed/private typeface reference in shipped source", file);
  }
}

const resumePath = "apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf";
if (!exists(resumePath)) {
  report("failure", "Missing resume PDF", resumePath);
} else {
  const resumeTextResult = run("pdftotext", [resumePath, "-"]);
  const resumeText =
    resumeTextResult.status === 0
      ? resumeTextResult.stdout
      : fs.readFileSync(path.join(root, resumePath)).toString("latin1");

  if (/Placeholder resume PDF|Replace with approved current resume/i.test(resumeText)) {
    report("failure", "Placeholder resume PDF", resumePath);
  }

  if (!/Technical Project Manager/i.test(resumeText)) {
    report("warning", "Resume text extraction missing expected role phrase", resumePath);
  }
}

const siteUrlSource = readText("apps/www/src/lib/site-url.ts");
const nextConfigSource = readText("apps/www/next.config.ts");
if (/NEXT_PUBLIC_ROBOTS_POLICY\s*!==\s*["']noindex["']/.test(siteUrlSource + nextConfigSource)) {
  report("failure", "Robots policy is permissive by default", "apps/www/src/lib/site-url.ts");
}
if (!/NEXT_PUBLIC_ROBOTS_POLICY\s*===\s*["']index["']/.test(siteUrlSource + nextConfigSource)) {
  report("failure", "Production indexing is not explicit opt-in", "apps/www/src/lib/site-url.ts");
}

if (isProduction && process.env.NEXT_PUBLIC_ROBOTS_POLICY !== "index") {
  report(
    "failure",
    "Production env requires NEXT_PUBLIC_ROBOTS_POLICY=index",
    "",
    `got ${process.env.NEXT_PUBLIC_ROBOTS_POLICY ?? "unset"}`
  );
}

const workSource = readText("apps/www/src/data/work.ts");
if (/visibility:\s*["']private["']/.test(workSource)) {
  report("failure", "Private work item would be publishable", "apps/www/src/data/work.ts");
}
if (/status:\s*["']Draft["']/.test(workSource)) {
  report("failure", "Draft work item would be publishable", "apps/www/src/data/work.ts");
}
if (/approval:\s*["'](?:needs-review|do-not-publish)["']/.test(workSource)) {
  report("failure", "Unapproved work item would be publishable", "apps/www/src/data/work.ts");
}

if (!/fairrentnyc-commercial-rent-stabilization/.test(nextConfigSource)) {
  report("failure", "Expected FairRentNYC redirect is missing", "apps/www/next.config.ts");
}
if (!/source-backed-team-memory/.test(nextConfigSource)) {
  report("failure", "Expected Source-Backed Team Memory redirect is missing", "apps/www/next.config.ts");
}

if (warnings.length) {
  console.warn("\nPublic-safety warnings:");
  for (const warning of warnings) console.warn(`- ${warning}`);
}

if (failures.length) {
  console.error("\nPublic-safety failures:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `Public-safety check passed${warnings.length ? ` with ${warnings.length} warning(s)` : ""}.`
);
