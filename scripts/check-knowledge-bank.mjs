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
  "docs/knowledge-bank/sources.md",
  "docs/knowledge-bank/projection-guide.md",
  "docs/knowledge-bank/projection-map.md",
  "docs/knowledge-bank/publication-rules.md",
  "docs/knowledge-bank/launch-blockers.md",
  "docs/knowledge-bank/review-checklist.md",
  "docs/knowledge-bank/opportunities/oti-technical-operations.md",
  "docs/knowledge-bank/opportunities/source-backed-team-memory.md"
];

const requiredClaimIds = [
  "CORE-001",
  "CORE-002",
  "CORE-003",
  "CAP-001",
  "TECHOPS-001",
  "HJE-001",
  "HJE-002",
  "CALL-001",
  "CALL-002",
  "CALLNYC-001",
  "FAIR-001",
  "NAC-001",
  "NAC-002",
  "CRS-001",
  "CRS-002",
  "WOW-001",
  "WOW-002",
  "SD-001",
  "KCTH-001",
  "KCTH-002",
  "SBTM-001",
  "SBTM-002",
  "AI-001"
];

const requiredClaimFamilies = [
  "CORE",
  "TECHOPS",
  "HJE",
  "CALLNYC",
  "FAIR",
  "NAC",
  "WOW",
  "SD",
  "KCTH",
  "SBTM",
  "AI"
];

const requiredProofSections = [
  "Core Positioning",
  "Technical Operations",
  "Harry J. Epstein Company",
  "CallNYC",
  "FairRentNYC / Commercial Rent Stabilization",
  "NYC Artist Coalition",
  "WOWList",
  "196 / Sunday Dinner",
  "KC Town Hall",
  "Source-Backed Team Memory",
  "AI Evals / Professional Development"
];

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

const validStatuses = new Set(["Ready", "Careful", "Pending", "Protected", "Private"]);
const appTextRoots = ["apps/www/src/", "apps/www/public/"];
const forbiddenRouteDirs = [
  "apps/www/src/app/proofs",
  "apps/www/src/app/knowledge-bank",
  "apps/www/src/app/proof-bank",
  "apps/www/src/app/archive-browser",
  "apps/www/src/app/work/source-backed-team-memory"
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

function includesHeading(text, heading) {
  return text.includes(`## ${heading}`) || text.includes(`### ${heading}`);
}

function loadAllowlist(file) {
  if (!exists(file)) return [];
  return JSON.parse(read(file));
}

function isAllowed(allowlist, pattern, file) {
  return allowlist.some((entry) => entry.pattern === pattern && entry.file === file);
}

for (const file of requiredFiles) {
  if (!exists(file)) report("failure", "Missing required knowledge-bank file", file);
}

const claimsPath = "docs/knowledge-bank/claims.md";
const proofsPath = "docs/knowledge-bank/proofs.md";
const antiClaimsPath = "docs/knowledge-bank/anti-claims.md";
const publicationRulesPath = "docs/knowledge-bank/publication-rules.md";
const sourcesPath = "docs/knowledge-bank/sources.md";
const projectionGuidePath = "docs/knowledge-bank/projection-guide.md";
const projectionMapPath = "docs/knowledge-bank/projection-map.md";
const launchBlockersPath = "docs/knowledge-bank/launch-blockers.md";
const reviewChecklistPath = "docs/knowledge-bank/review-checklist.md";

const claimsText = exists(claimsPath) ? read(claimsPath) : "";
const proofsText = exists(proofsPath) ? read(proofsPath) : "";
const antiClaimsText = exists(antiClaimsPath) ? read(antiClaimsPath) : "";
const publicationRulesText = exists(publicationRulesPath) ? read(publicationRulesPath) : "";
const sourcesText = exists(sourcesPath) ? read(sourcesPath) : "";
const projectionGuideText = exists(projectionGuidePath) ? read(projectionGuidePath) : "";
const projectionMapText = exists(projectionMapPath) ? read(projectionMapPath) : "";
const launchBlockersText = exists(launchBlockersPath) ? read(launchBlockersPath) : "";
const reviewChecklistText = exists(reviewChecklistPath) ? read(reviewChecklistPath) : "";

for (const id of requiredClaimIds) {
  if (!new RegExp(`^## ${id}$`, "m").test(claimsText)) {
    report("failure", "Missing required claim ID", claimsPath, id);
  }
}

for (const family of requiredClaimFamilies) {
  if (!new RegExp(`^## ${family}-\\d+`, "m").test(claimsText)) {
    report("failure", "Missing required claim family", claimsPath, family);
  }
}

for (const match of claimsText.matchAll(/^\*\*Status:\*\* ([^.]+)\./gm)) {
  if (!validStatuses.has(match[1])) {
    report("failure", "Invalid claim status", claimsPath, match[1]);
  }
}

for (const term of highImpactTerms) {
  if (!claimsText.includes(term)) {
    report("failure", "High-impact metric missing from claims inventory", claimsPath, term);
  }
}

for (const section of requiredProofSections) {
  if (!includesHeading(proofsText, section)) {
    report("failure", "Missing proof register section", proofsPath, section);
  }
}

for (const requiredPhrase of [
  "Do not make the reader decode Jamie",
  "The public site may use only approved, public-safe claims from this bank",
  "Protected evidence stays outside the repo",
  "unsafe, unfair, embarrassing"
]) {
  const knowledgeText = [
    exists("docs/knowledge-bank/README.md") ? read("docs/knowledge-bank/README.md") : "",
    claimsText,
    sourcesText
  ].join("\n");
  if (!knowledgeText.includes(requiredPhrase)) {
    report("failure", "Missing required knowledge-bank rule", "docs/knowledge-bank", requiredPhrase);
  }
}

for (const phrase of [
  "Jamie single-handedly led collective civic campaigns",
  "Jamie alone repealed the Cabaret Law",
  "NYC Artist Coalition alone created the Office of Nightlife",
  "NYC Artist Coalition alone ended enforcement practices",
  "Jamie authored official legal analysis for Commercial Rent Stabilization",
  "Jamie solely caused HJE's revenue growth",
  "WOWList raw archive data can be published as a public dataset",
  "CallNYC is an official or current City service",
  "Source-Backed Team Memory is production SaaS",
  "can be treated as public proof without approval",
  "Staging is private"
]) {
  if (!antiClaimsText.includes(phrase)) {
    report("failure", "Missing anti-claim", antiClaimsPath, phrase);
  }
}

for (const sourceClass of [
  "Approved resume",
  "Approved resume candidate, pending Jamie launch approval",
  "Public project artifact",
  "Public website / public artifact",
  "Public source / public record",
  "Public-safe archive summary",
  "Firsthand / collaborator context",
  "Conversation summary",
  "Private-source-outside-repo",
  "Approval pending",
  "Do-not-publish"
]) {
  if (!sourcesText.includes(`### ${sourceClass}`)) {
    report("failure", "Missing source class", sourcesPath, sourceClass);
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
  "Redirects And Sitemap"
]) {
  if (!publicationRulesText.includes(`## ${phrase}`)) {
    report("failure", "Missing publication rule section", publicationRulesPath, phrase);
  }
}

for (const phrase of [
  "Ready claims may appear on public pages",
  "Careful claims may appear only with guardrails intact",
  "Pending claims stay in the Knowledge Bank",
  "Protected material never becomes site copy"
]) {
  if (!projectionGuideText.includes(phrase)) {
    report("failure", "Missing projection guide rule", projectionGuidePath, phrase);
  }
}

for (const section of [
  "Homepage Proof Strip",
  "Resume Page",
  "Technical Operations",
  "Work Index",
  "Case Studies",
  "Lab / Source-Backed Team Memory",
  "Metadata / OpenGraph"
]) {
  if (!includesHeading(projectionMapText, section)) {
    report("failure", "Missing projection map section", projectionMapPath, section);
  }
}

for (const phrase of [
  "Every homepage proof claim exists in the Knowledge Bank",
  "Every résumé-page proof claim exists in the Knowledge Bank",
  "Pending/private claims are not projected onto public pages",
  "Source-Backed Team Memory does not expose private collaborator/client",
  "Jamie approves final production deploy"
]) {
  if (!launchBlockersText.includes(phrase)) {
    report("failure", "Missing launch blocker", launchBlockersPath, phrase);
  }
}

for (const phrase of [
  "docs/knowledge-bank/README.md",
  "docs/knowledge-bank/projection-guide.md",
  "npm run knowledge-bank",
  "npm run routes",
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
const knowledgeAllowlist = loadAllowlist("scripts/knowledge-bank-allowlist.json");

for (const file of textFiles) {
  const text = read(file);
  const scannerFile = file === "scripts/check-knowledge-bank.mjs";
  const publicSafetyScannerFile = file === "scripts/check-public-safety.mjs";
  const routeScannerFile = file === "scripts/check-routes.mjs";
  const productionScannerFile = file === "scripts/preflight-production.mjs";
  const knowledgeAllowlistFile = file === "scripts/knowledge-bank-allowlist.json";
  const publicSafetyAllowlistFile = file === "scripts/public-safety-allowlist.json";

  if (privateLocalPath.test(text)) {
    report("failure", "Private local path appears in tracked text", file);
  }

  if (
    !scannerFile &&
    !publicSafetyScannerFile &&
    !routeScannerFile &&
    !productionScannerFile &&
    !knowledgeAllowlistFile &&
    !publicSafetyAllowlistFile &&
    rawTranscriptPattern.test(text) &&
    !isAllowed(knowledgeAllowlist, "raw transcripts", file)
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

for (const [label, pattern] of [
  ["single-handedly", /Jamie single-handedly|single-handedly led|single-handedly repealed|single-handedly transformed/i],
  ["solely caused", /\bsolely caused\b/i],
  ["official city service", /CallNYC is an official|official City service|official city service/i],
  ["production SaaS claim", /Source-Backed Team Memory is production SaaS|is a production SaaS/i],
  ["official city chapters", /official city chapters/i]
]) {
  if (pattern.test(publicAppText)) {
    report("failure", "Anti-claim appears in public app text", "", label);
  }
}

const pendingOrProtectedClaimIds = [...claimsText.matchAll(/^## ([A-Z]+-\d+)[\s\S]*?\*\*Status:\*\* (Pending|Protected|Private)\./gm)].map(
  (match) => match[1]
);

for (const id of pendingOrProtectedClaimIds) {
  if (publicAppText.includes(id)) {
    report("failure", "Pending/Protected/Private claim ID appears in public app text", "", id);
  }
}

for (const dir of forbiddenRouteDirs) {
  if (fs.existsSync(path.join(root, dir))) {
    report("failure", "Forbidden public route directory exists", dir);
  }
}

const sitemapText = exists("apps/www/src/app/sitemap.ts")
  ? read("apps/www/src/app/sitemap.ts")
  : "";
for (const forbidden of [
  "/work/fairrentnyc",
  "/work/196-artists-residency",
  "/work/source-backed-team-memory",
  ".pdf",
  "proof-bank",
  "knowledge-bank",
  "archive-browser"
]) {
  if (sitemapText.includes(forbidden)) {
    report("failure", "Sitemap source includes non-canonical or private path", "apps/www/src/app/sitemap.ts", forbidden);
  }
}

const packageJson = exists("package.json") ? JSON.parse(read("package.json")) : {};
if (packageJson.scripts?.["knowledge-bank"] !== "node scripts/check-knowledge-bank.mjs") {
  report("failure", "Missing npm knowledge-bank script", "package.json");
}
if (packageJson.scripts?.["public-safety"] !== "node scripts/check-public-safety.mjs") {
  report("failure", "Missing npm public-safety script", "package.json");
}
if (packageJson.scripts?.["routes"] !== "node scripts/check-routes.mjs") {
  report("failure", "Missing npm routes script", "package.json");
}
if (!packageJson.scripts?.["check:production"]?.includes("preflight-production.mjs")) {
  report("failure", "Production check does not include production preflight", "package.json");
}
if (!packageJson.scripts?.["check:production"]?.includes("knowledge-bank")) {
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
