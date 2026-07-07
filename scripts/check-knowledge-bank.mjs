#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const production = process.argv.includes("--production");
const failures = [];
const warnings = [];

const requiredFiles = [
  "docs/knowledge-bank/README.md",
  "docs/knowledge-bank/chad-lens.md",
  "docs/knowledge-bank/claims.md",
  "docs/knowledge-bank/claims.json",
  "docs/knowledge-bank/proofs.md",
  "docs/knowledge-bank/anti-claims.md",
  "docs/knowledge-bank/source-policy.md",
  "docs/knowledge-bank/publication-rules.md",
  "docs/knowledge-bank/opportunities/oti-technical-operations.md",
  "docs/knowledge-bank/opportunities/source-backed-team-memory.md",
  "docs/knowledge-bank/review-checklist.md",
  "docs/production-readiness.md",
  "docs/release-checklist.md"
];

const allowedStatuses = new Set([
  "approved",
  "softened-for-v1",
  "needs-jamie-approval",
  "do-not-publish",
  "future-v1-1"
]);

const publicStatuses = new Set(["approved", "softened-for-v1"]);

const allowedSourceClasses = new Set([
  "public web artifact",
  "public resume",
  "public case-study summary",
  "private source reviewed by Jamie",
  "private source class only",
  "sensitive archive - do not commit",
  "third-party approval required",
  "unverified / do not publish"
]);

const requiredClaimIds = [
  "technical-operations",
  "emerging-work",
  "career-14-years",
  "hje-operating-layer",
  "hje-revenue-2x",
  "crs-campaign-memory",
  "crs-page-count",
  "nac-public-infrastructure",
  "callnyc-open-data",
  "wowlist-community-platform",
  "wowlist-exact-metrics",
  "participation-infrastructure",
  "sunday-dinner-exact-counts",
  "kc-town-hall-documentation",
  "kc-public-funding-exact",
  "source-backed-team-memory",
  "ai-evals-training",
  "private-evidence-as-proof",
  "linkedin-url"
];

function filePath(file) {
  return path.join(repoRoot, file);
}

function read(file) {
  return readFileSync(filePath(file), "utf8");
}

function fail(message) {
  failures.push(message);
}

function warn(message) {
  warnings.push(message);
}

function gitLsFiles() {
  const result = spawnSync("git", ["ls-files", "--cached", "--others", "--exclude-standard"], {
    cwd: repoRoot,
    encoding: "utf8",
    maxBuffer: 1024 * 1024 * 16
  });

  if (result.status !== 0) {
    fail(`Unable to list tracked files: ${result.stderr.trim()}`);
    return [];
  }

  return result.stdout.split("\n").filter(Boolean);
}

function trackedText(file) {
  return /\.(?:css|example|html|js|json|jsx|md|mdx|mjs|svg|ts|tsx|txt|xml|ya?ml)$/i.test(file);
}

for (const file of requiredFiles) {
  if (!existsSync(filePath(file))) {
    fail(`Missing required knowledge-bank file: ${file}`);
  }
}

let claims = [];
if (existsSync(filePath("docs/knowledge-bank/claims.json"))) {
  try {
    claims = JSON.parse(read("docs/knowledge-bank/claims.json"));
  } catch (error) {
    fail(`docs/knowledge-bank/claims.json is not valid JSON: ${error.message}`);
  }
}

if (!Array.isArray(claims)) {
  fail("docs/knowledge-bank/claims.json must be an array");
  claims = [];
}

const claimIds = new Set();
for (const claim of claims) {
  if (!claim.id || typeof claim.id !== "string") {
    fail("Every claim needs a string id");
    continue;
  }

  if (claimIds.has(claim.id)) {
    fail(`Duplicate claim id: ${claim.id}`);
  }
  claimIds.add(claim.id);

  if (!allowedStatuses.has(claim.status)) {
    fail(`${claim.id}: invalid status ${claim.status}`);
  }

  if (!allowedSourceClasses.has(claim.sourceClass)) {
    fail(`${claim.id}: invalid source class ${claim.sourceClass}`);
  }

  for (const field of [
    "publicClaim",
    "approvedWording",
    "fallbackWording",
    "approvalOwner",
    "protectedBoundary",
    "notes"
  ]) {
    if (!claim[field] || typeof claim[field] !== "string") {
      fail(`${claim.id}: missing string field ${field}`);
    }
  }

  if (!Array.isArray(claim.allowedPages)) {
    fail(`${claim.id}: allowedPages must be an array`);
  } else if (publicStatuses.has(claim.status) && claim.allowedPages.length === 0) {
    fail(`${claim.id}: public claim needs at least one allowed page`);
  } else if (!publicStatuses.has(claim.status) && claim.allowedPages.length > 0) {
    fail(`${claim.id}: non-public claim must not list public pages`);
  }
}

for (const id of requiredClaimIds) {
  if (!claimIds.has(id)) {
    fail(`Missing required claim id: ${id}`);
  }
}

const claimsText = existsSync(filePath("docs/knowledge-bank/claims.md"))
  ? read("docs/knowledge-bank/claims.md")
  : "";
for (const id of requiredClaimIds) {
  if (!claimsText.includes(id)) {
    fail(`claims.md does not mention claim id: ${id}`);
  }
}

const knowledgeText = requiredFiles
  .filter((file) => existsSync(filePath(file)))
  .map((file) => read(file))
  .join("\n");

for (const phrase of [
  "The public site may use only approved, public-safe claims from this bank",
  "Protected evidence stays outside the repo",
  "Do not make the reader decode Jamie",
  "Structure grows out of the material",
  "AI drafts. Humans review. The shared record remains inspectable and correctable"
]) {
  if (!knowledgeText.includes(phrase)) {
    fail(`Missing required knowledge-bank phrase: ${phrase}`);
  }
}

for (const sourceClass of allowedSourceClasses) {
  if (!knowledgeText.includes(sourceClass)) {
    fail(`Knowledge-bank docs do not describe source class: ${sourceClass}`);
  }
}

const appFiles = gitLsFiles().filter(
  (file) =>
    (file.startsWith("apps/www/src/") || file.startsWith("apps/www/public/")) &&
    trackedText(file)
);

const appTextByFile = new Map(appFiles.map((file) => [file, read(file)]));
const appText = [...appTextByFile.values()].join("\n");

const nonPublicClaims = claims.filter((claim) => !publicStatuses.has(claim.status));
for (const claim of nonPublicClaims) {
  for (const text of [claim.publicClaim, claim.approvedWording, ...(claim.forbiddenPublicText ?? [])]) {
    if (text && appText.includes(text)) {
      fail(`${claim.id}: non-public claim text appears in public app content`);
    }
  }
}

for (const forbiddenStatus of ["needs-jamie-approval", "do-not-publish"]) {
  if (appText.includes(forbiddenStatus)) {
    fail(`Public app content contains non-public claim status: ${forbiddenStatus}`);
  }
}

const proofsPath = "apps/www/src/data/proofs.ts";
if (existsSync(filePath(proofsPath))) {
  const proofText = read(proofsPath);
  for (const match of proofText.matchAll(/id:\s*"([^"]+)"/g)) {
    const id = match[1];
    if (!claimIds.has(id)) {
      fail(`${proofsPath} references proof id not present in claims.json: ${id}`);
    }
  }
} else {
  fail(`${proofsPath} is missing`);
}

const privateLocalPath = /\/(?:Users|Volumes|private\/tmp|var\/folders)\//;
for (const file of gitLsFiles().filter(trackedText)) {
  if (file.startsWith(".agents/") || file.startsWith(".impeccable/")) continue;
  const text = read(file);
  if (privateLocalPath.test(text)) {
    fail(`Private local path appears in tracked text: ${file}`);
  }
}

if (production) {
  const packageJson = JSON.parse(read("package.json"));
  if (!packageJson.scripts?.["knowledge-bank"]) {
    fail("package.json is missing npm run knowledge-bank");
  }
  if (!packageJson.scripts?.["preflight:production"]?.includes("npm run knowledge-bank")) {
    fail("preflight:production does not run knowledge-bank");
  }
}

if (warnings.length) {
  console.warn("Knowledge-bank warnings:");
  for (const warning of warnings) {
    console.warn(`- ${warning}`);
  }
}

if (failures.length) {
  console.error("Knowledge-bank check failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`Knowledge-bank check passed${production ? " for production" : ""}.`);
