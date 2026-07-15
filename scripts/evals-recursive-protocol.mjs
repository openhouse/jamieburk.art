#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const failures = [];
const warnings = [];

function fail(message) {
  failures.push(message);
}

function warn(message) {
  warnings.push(message);
}

function absolute(relativePath) {
  return path.join(repoRoot, relativePath);
}

function read(relativePath) {
  return readFileSync(absolute(relativePath), "utf8");
}

function requireFile(relativePath) {
  if (!existsSync(absolute(relativePath))) fail(`${relativePath} is missing`);
}

function requireIncludes(source, expected, label) {
  if (!source.includes(expected)) fail(`${label} is missing ${expected}`);
}

function requirePattern(source, pattern, label) {
  if (!pattern.test(source)) fail(label);
}

function sectionForHeading(source, heading) {
  const start = source.indexOf(heading);
  if (start === -1) return "";

  const next = source.indexOf("\n## ", start + heading.length);
  return source.slice(start, next === -1 ? source.length : next);
}

const requiredFiles = [
  "docs/qa/evals-L/recursive-protocol.md",
  "docs/production-readiness.md",
  "docs/knowledge-bank/review-checklist.md",
  "docs/knowledge-bank/launch-blockers.md",
  "docs/knowledge-bank/approval-register.md",
  "docs/knowledge-bank/projection-map.md",
  "docs/knowledge-bank/claims.md",
  "docs/knowledge-bank/framework.md",
  "docs/knowledge-bank/intake/README.md",
  "docs/knowledge-bank/intake/2026-07-12-waterways-nightlife.md",
  "docs/knowledge-bank/intake/2026-07-14-kc-town-hall-council-funding.md",
  "docs/knowledge-bank/intake/2026-07-15-kc-town-hall-phase-one-and-neighborhood-work.md",
  "docs/knowledge-bank/projects/waterways-and-participatory-art.md",
  "docs/knowledge-bank/projects/nyc-artist-coalition.md",
  "docs/knowledge-bank/projects/kc-town-hall.md",
  "docs/knowledge-bank/projects/kansas-city-neighborhood-programs.md",
  "apps/www/src/data/proofs.ts",
  "apps/www/src/data/work.ts",
  "apps/www/src/app/resume/page.tsx",
  "apps/www/src/app/work/technical-operations/page.tsx",
  "apps/www/src/app/lab/source-backed-team-memory/page.tsx",
  "scripts/check-knowledge-bank.mjs",
  "scripts/check-public-safety.mjs",
  "scripts/evals-chad-lens.mjs",
  "scripts/evals-knowledge-lifecycle.mjs",
  "scripts/report-knowledge-lifecycle.mjs",
  "scripts/tests/knowledge-lifecycle.test.mjs",
  "scripts/check-routes.mjs"
];

for (const file of requiredFiles) requireFile(file);

const packageJson = JSON.parse(read("package.json"));
const scripts = packageJson.scripts ?? {};

for (const script of [
  "check",
  "knowledge-bank",
  "public-safety",
  "check:routes",
  "evals:knowledge-lifecycle",
  "evals:chad",
  "evals:recursive",
  "preflight:staging",
  "preflight:production"
]) {
  if (!scripts[script]) fail(`package.json is missing npm script: ${script}`);
}

if (scripts.check && !scripts.check.includes("npm run evals:recursive")) {
  fail("package.json check script must include npm run evals:recursive");
}

if (scripts.check && !scripts.check.includes("npm run evals:chad")) {
  fail("package.json check script must include npm run evals:chad");
}

if (scripts.check && !scripts.check.includes("npm run evals:knowledge-lifecycle")) {
  fail("package.json check script must include npm run evals:knowledge-lifecycle");
}

if (
  scripts["evals:knowledge-lifecycle"] !==
  "node scripts/evals-knowledge-lifecycle.mjs"
) {
  fail(
    "package.json evals:knowledge-lifecycle must run scripts/evals-knowledge-lifecycle.mjs"
  );
}

if (scripts["evals:chad"] !== "node scripts/evals-chad-lens.mjs") {
  fail("package.json evals:chad must run scripts/evals-chad-lens.mjs");
}

if (scripts["evals:recursive"] !== "node scripts/evals-recursive-protocol.mjs") {
  fail("package.json evals:recursive must run scripts/evals-recursive-protocol.mjs");
}

for (const [script, expected] of [
  ["preflight:staging", "NEXT_PUBLIC_ROBOTS_POLICY=noindex"],
  ["preflight:production", "NEXT_PUBLIC_ROBOTS_POLICY=index"],
  ["preflight:production", "SITE_URL=https://jamieburk.art"],
  ["preflight:staging", "SITE_URL=https://staging.jamieburk.art"]
]) {
  if (scripts[script] && !scripts[script].includes(expected)) {
    fail(`${script} is missing ${expected}`);
  }
}

const productionReadiness = read("docs/production-readiness.md");
const reviewChecklist = read("docs/knowledge-bank/review-checklist.md");
const launchBlockers = read("docs/knowledge-bank/launch-blockers.md");
const approvalRegister = read("docs/knowledge-bank/approval-register.md");
const projectionMap = read("docs/knowledge-bank/projection-map.md");
const recursiveProtocol = read("docs/qa/evals-L/recursive-protocol.md");
const proofs = read("apps/www/src/data/proofs.ts");
const claims = read("docs/knowledge-bank/claims.md");
const labPage = read("apps/www/src/app/lab/source-backed-team-memory/page.tsx");
const resumePage = read("apps/www/src/app/resume/page.tsx");
const technicalOperationsPage = read("apps/www/src/app/work/technical-operations/page.tsx");
const kcTownHallReceipt = read(
  "docs/knowledge-bank/intake/2026-07-14-kc-town-hall-council-funding.md"
);
const kcTownHallPhaseOneReceipt = read(
  "docs/knowledge-bank/intake/2026-07-15-kc-town-hall-phase-one-and-neighborhood-work.md"
);

for (const doc of [
  ["docs/production-readiness.md", productionReadiness],
  ["docs/knowledge-bank/review-checklist.md", reviewChecklist],
  ["docs/knowledge-bank/launch-blockers.md", launchBlockers],
  ["docs/qa/evals-L/recursive-protocol.md", recursiveProtocol]
]) {
  requireIncludes(doc[1], "npm run evals:recursive", doc[0]);
}

for (const doc of [
  ["docs/production-readiness.md", productionReadiness],
  ["docs/knowledge-bank/review-checklist.md", reviewChecklist],
  ["docs/knowledge-bank/launch-blockers.md", launchBlockers],
  ["docs/qa/evals-L/recursive-protocol.md", recursiveProtocol]
]) {
  requireIncludes(doc[1], "npm run evals:chad", doc[0]);
}

for (const doc of [
  ["docs/production-readiness.md", productionReadiness],
  ["docs/knowledge-bank/review-checklist.md", reviewChecklist],
  ["docs/knowledge-bank/launch-blockers.md", launchBlockers],
  ["docs/qa/evals-L/recursive-protocol.md", recursiveProtocol]
]) {
  requireIncludes(doc[1], "npm run evals:knowledge-lifecycle", doc[0]);
}

for (const phrase of [
  "application-readiness",
  "claim projection",
  "public-safety",
  "production mechanics",
  "recursive"
]) {
  requirePattern(
    recursiveProtocol,
    new RegExp(phrase, "i"),
    `recursive protocol doc is missing ${phrase}`
  );
}

for (const phrase of [
  "do not display in website HTML",
  "approved resume PDF",
  "Production indexing",
  "Source-Backed Team Memory",
  "KC Spaces Fund"
]) {
  requireIncludes(approvalRegister, phrase, "approval register");
}

const aiEvalProof = sectionForHeading(proofs, 'id: "ai-evals-professional-development"');
if (!aiEvalProof) {
  fail("apps/www/src/data/proofs.ts is missing ai-evals-professional-development");
} else {
  for (const expected of [
    'status: "ready"',
    'supportLevel: "strong"',
    "Completed AI Evals for Engineers & PMs",
    "Treat as professional development",
    '"resume"',
    '"lab"',
    '"about"'
  ]) {
    requireIncludes(aiEvalProof, expected, "ai evals proof");
  }
}

const aiEvalClaim = sectionForHeading(
  claims,
  "## ai-evals-professional-development - AI evals professional development"
);
if (!aiEvalClaim) {
  fail("docs/knowledge-bank/claims.md is missing ai-evals-professional-development");
} else {
  for (const expected of [
    "**Status:** Ready",
    "**Support level:** Strong",
    "**Evidence class:** Approved resume / public-safe certificate",
    "**Where to project:** Resume page, Lab page, About.",
    "not instructor affiliation"
  ]) {
    requireIncludes(aiEvalClaim, expected, "ai evals claim");
  }
}

requireIncludes(projectionMap, "ai-evals-professional-development", "projection map");
requireIncludes(resumePage, "resumeProofHighlights", "resume page");
requireIncludes(proofs, '"ai-evals-professional-development"', "resume proof highlights");

for (const expected of [
  'requireReadyOrCarefulProof("ai-evals-professional-development")',
  "professional development",
  "Evaluation practice"
]) {
  requireIncludes(labPage, expected, "lab page");
}

requireIncludes(
  technicalOperationsPage,
  "technicalOperationsProofRows",
  "technical operations page"
);
requireIncludes(
  proofs,
  '"technical-operations-operating-backbone"',
  "technical operations proof rows"
);
requireIncludes(
  proofs,
  '"source-backed-team-memory-method"',
  "technical operations proof rows"
);

for (const expected of [
  "SRC-KC-TOWN-HALL-RESOLUTION-190649",
  "SRC-KC-TOWN-HALL-ORDINANCE-190642",
  "SRC-KC-TOWN-HALL-CCED-UPDATE-2022-05-17",
  "SRC-KC-TOWN-HALL-ORDINANCE-240317",
  "Appropriation is not receipt or expenditure"
]) {
  requireIncludes(kcTownHallReceipt, expected, "KC Town Hall funding receipt");
}

for (const expected of [
  "SRC-KC-TOWN-HALL-CCED-PROPOSAL-2019",
  "SRC-KC-TOWN-HALL-JAMIE-ACCOUNT-2026-07-15",
  "Phase One cold-shell restoration",
  "general contractor",
  "TiredOfTires",
  "Cleveland Avenue Unify to Beautify",
  "Pastor Lee originated",
  "INQ-KC-TOWN-HALL-CONSTRUCTION-ROLE-2026",
  "INQ-KC-NEIGHBORHOOD-PROGRAMS-2026"
]) {
  requireIncludes(kcTownHallPhaseOneReceipt, expected, "KC Town Hall Phase One receipt");
}

for (const forbidden of [
  "Jamie is certified by Maven as an AI evaluator",
  "Jamie teaches the course",
  "private cohort materials"
]) {
  if (labPage.includes(forbidden) || resumePage.includes(forbidden)) {
    fail(`public page contains forbidden AI-evals wording: ${forbidden}`);
  }
}

if (!recursiveProtocol.includes("Run the loop again after any material change")) {
  warn("recursive protocol should be rerun after material content changes");
}

if (warnings.length) {
  console.warn("Recursive eval warnings:");
  for (const warning of warnings) console.warn(`- ${warning}`);
}

if (failures.length) {
  console.error("Recursive eval protocol failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `Recursive eval protocol passed${warnings.length ? ` with ${warnings.length} warning(s)` : ""}.`
);
