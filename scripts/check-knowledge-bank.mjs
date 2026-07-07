#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const production = process.argv.includes("--production");
const failures = [];
const warnings = [];

const requiredFiles = [
  "docs/knowledge-bank/README.md",
  "docs/knowledge-bank/chad-lens.md",
  "docs/knowledge-bank/claims.md",
  "docs/knowledge-bank/proofs.md",
  "docs/knowledge-bank/anti-claims.md",
  "docs/knowledge-bank/source-policy.md",
  "docs/knowledge-bank/publication-rules.md",
  "docs/knowledge-bank/opportunities/oti-technical-operations.md",
  "docs/knowledge-bank/opportunities/source-backed-team-memory.md",
  "docs/knowledge-bank/review-checklist.md"
];

const appTextRoots = ["apps/www/src/", "apps/www/public/"];
const highImpactTerms = [
  "14+",
  "2x revenue",
  "34-page",
  "1,800+",
  "16,000+",
  "35+",
  "300+",
  "20+",
  "$490,539"
];

const requiredClaimIds = [
  "CORE-001",
  "CORE-002",
  "CORE-003",
  "CAP-001",
  "HJE-001",
  "HJE-002",
  "NAC-001",
  "NAC-002",
  "CRS-001",
  "CRS-002",
  "CALL-001",
  "CALL-002",
  "WOW-001",
  "WOW-002",
  "SD-001",
  "KCTH-001",
  "KCTH-002",
  "SBTM-001",
  "SBTM-002",
  "AI-001"
];

function report(kind, label, file, detail) {
  const item = `${label}${file ? `: ${file}` : ""}${detail ? ` (${detail})` : ""}`;
  if (kind === "failure") failures.push(item);
  else warnings.push(item);
}

function exists(file) {
  return fs.existsSync(path.join(root, file));
}

function read(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

function gitLsFiles() {
  const result = spawnSync("git", ["ls-files"], {
    cwd: root,
    encoding: "utf8",
    maxBuffer: 1024 * 1024 * 16
  });
  if (result.status !== 0) {
    report("failure", "Unable to list tracked files", "", result.stderr.trim());
    return [];
  }
  return result.stdout.split("\n").filter(Boolean);
}

function isTextFile(file) {
  return /\.(?:md|mdx|ts|tsx|js|jsx|json|mjs|css|txt|example|yml|yaml|toml)$/i.test(file);
}

function isAppText(file) {
  return appTextRoots.some((prefix) => file.startsWith(prefix));
}

function includesClaimId(text, id) {
  return new RegExp(`(^|[^A-Z0-9-])${id}([^A-Z0-9-]|$)`).test(text);
}

for (const file of requiredFiles) {
  if (!exists(file)) report("failure", "Missing required knowledge-bank file", file);
}

const claimsPath = "docs/knowledge-bank/claims.md";
const antiClaimsPath = "docs/knowledge-bank/anti-claims.md";
const publicationRulesPath = "docs/knowledge-bank/publication-rules.md";
const sourcePolicyPath = "docs/knowledge-bank/source-policy.md";
const reviewChecklistPath = "docs/knowledge-bank/review-checklist.md";

const claimsText = exists(claimsPath) ? read(claimsPath) : "";
const antiClaimsText = exists(antiClaimsPath) ? read(antiClaimsPath) : "";
const publicationRulesText = exists(publicationRulesPath) ? read(publicationRulesPath) : "";
const sourcePolicyText = exists(sourcePolicyPath) ? read(sourcePolicyPath) : "";
const reviewChecklistText = exists(reviewChecklistPath) ? read(reviewChecklistPath) : "";

for (const id of requiredClaimIds) {
  if (!includesClaimId(claimsText, id)) {
    report("failure", "Missing required claim ID", claimsPath, id);
  }
}

for (const term of highImpactTerms) {
  if (!claimsText.includes(term)) {
    report("failure", "High-impact metric missing from claims inventory", claimsPath, term);
  }
}

for (const requiredPhrase of [
  "Do not make the reader decode Jamie",
  "The public site may use only approved, public-safe claims from this bank",
  "Protected evidence stays outside the repo"
]) {
  const knowledgeText = [
    exists("docs/knowledge-bank/README.md") ? read("docs/knowledge-bank/README.md") : "",
    claimsText,
    sourcePolicyText
  ].join("\n");
  if (!knowledgeText.includes(requiredPhrase)) {
    report("failure", "Missing required knowledge-bank rule", "docs/knowledge-bank", requiredPhrase);
  }
}

for (const phrase of [
  "Jamie single-handedly led collective civic campaigns",
  "Jamie alone repealed the Cabaret Law",
  "NYC Artist Coalition alone created the Office of Nightlife",
  "Jamie solely caused HJE's revenue growth",
  "CallNYC is an official or current City service",
  "Source-Backed Team Memory is production SaaS",
  "Staging is private"
]) {
  if (!antiClaimsText.includes(phrase)) {
    report("failure", "Missing anti-claim", antiClaimsPath, phrase);
  }
}

for (const sourceClass of [
  "public-source",
  "approved-resume",
  "approved-public-page",
  "public-safe-summary",
  "private-archive-summary",
  "private-source-outside-repo",
  "conversation-summary",
  "staging-only",
  "do-not-publish"
]) {
  if (!sourcePolicyText.includes(`### ${sourceClass}`)) {
    report("failure", "Missing source class", sourcePolicyPath, sourceClass);
  }
}

for (const phrase of [
  "Homepage",
  "Work Index",
  "Case-Study Pages",
  "Technical Operations Page",
  "Lab Page",
  "Resume Page",
  "Metadata And OpenGraph",
  "Colophon"
]) {
  if (!publicationRulesText.includes(`## ${phrase}`)) {
    report("failure", "Missing publication rule section", publicationRulesPath, phrase);
  }
}

for (const phrase of [
  "docs/knowledge-bank/README.md",
  "npm run knowledge-bank",
  "High-impact metrics",
  "Can future edits strengthen public claims"
]) {
  if (!reviewChecklistText.includes(phrase)) {
    report("failure", "Review checklist missing expected item", reviewChecklistPath, phrase);
  }
}

const tracked = gitLsFiles();
const textFiles = tracked.filter((file) => {
  return (
    !file.startsWith(".agents/") &&
    !file.startsWith(".codex/") &&
    !file.startsWith(".impeccable/") &&
    isTextFile(file)
  );
});

const privateLocalPath = /\/(?:Users|Volumes|private\/tmp|var\/folders)\//;
const rawTranscriptPattern = /raw transcripts?/i;
const approvalPlaceholderPattern =
  /TODO: Jamie approval required|Public email pending confirmation|LinkedIn pending|GitHub pending|approval required|placeholder/i;

const rawTranscriptAllowedFiles = new Set([
  "AGENTS.md",
  "README.md",
  "DESIGN.md",
  "docs/knowledge-bank/anti-claims.md",
  "docs/knowledge-bank/source-policy.md"
]);

for (const file of textFiles) {
  const text = read(file);
  const scannerFile = file === "scripts/check-knowledge-bank.mjs";
  const knowledgeAllowlistFile = file === "scripts/knowledge-bank-allowlist.json";
  const publicSafetyAllowlistFile = file === "scripts/public-safety-allowlist.json";

  if (privateLocalPath.test(text)) {
    report("failure", "Private local path appears in tracked text", file);
  }

  if (
    !scannerFile &&
    file !== "scripts/check-public-safety.mjs" &&
    !knowledgeAllowlistFile &&
    !publicSafetyAllowlistFile &&
    rawTranscriptPattern.test(text) &&
    !rawTranscriptAllowedFiles.has(file)
  ) {
    report("failure", "Raw transcript marker outside policy allowlist", file);
  }

  if (production && isAppText(file) && approvalPlaceholderPattern.test(text)) {
    report("failure", "Production-facing approval placeholder", file);
  }
}

const publicAppText = textFiles
  .filter((file) => isAppText(file))
  .map((file) => read(file))
  .join("\n");

const publicAntiClaimPatterns = [
  ["single-handedly", /Jamie single-handedly|single-handedly led|single-handedly repealed|single-handedly transformed/i],
  ["solely caused", /\bsolely caused\b/i],
  ["official city service", /CallNYC is an official|official City service|official city service/i],
  ["production SaaS claim", /Source-Backed Team Memory is production SaaS|is a production SaaS/i],
  ["official city chapters", /official city chapters/i]
];

for (const [label, pattern] of publicAntiClaimPatterns) {
  if (pattern.test(publicAppText)) {
    report("failure", "Anti-claim appears in public app text", "", label);
  }
}

const packageJson = exists("package.json") ? JSON.parse(read("package.json")) : {};
if (packageJson.scripts?.["knowledge-bank"] !== "node scripts/check-knowledge-bank.mjs") {
  report("failure", "Missing npm knowledge-bank script", "package.json");
}
if (!packageJson.scripts?.["check:production"]?.includes("check-knowledge-bank.mjs")) {
  report("failure", "Production check does not include knowledge-bank validation", "package.json");
}

if (warnings.length) {
  console.warn("\nKnowledge-bank warnings:");
  for (const warning of warnings) console.warn(`- ${warning}`);
}

if (failures.length) {
  console.error("\nKnowledge-bank failures:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Knowledge-bank check passed${production ? " for production" : ""}.`);
