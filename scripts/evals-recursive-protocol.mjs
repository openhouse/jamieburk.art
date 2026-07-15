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
  "docs/knowledge-bank/intake/2026-07-15-kc-town-hall-stewardship-transition.md",
  "docs/knowledge-bank/intake/2026-07-15-project-social-account-archive.md",
  "docs/knowledge-bank/intake/2026-07-15-callnyc-x-full-population.md",
  "docs/knowledge-bank/intake/2026-07-15-wowlist-x-full-population.md",
  "docs/knowledge-bank/intake/2026-07-15-nycartc-x-full-population.md",
  "docs/knowledge-bank/intake/2026-07-15-urbanhermit-x-full-population.md",
  "docs/knowledge-bank/intake/2026-07-15-nycac-facebook-events-full-population.md",
  "docs/knowledge-bank/intake/2026-07-15-personal-wowlist-facebook-events-full-population.md",
  "docs/knowledge-bank/corpora/callnyc-x-public-corpus.json",
  "docs/knowledge-bank/corpora/wowlist-x-public-corpus.json",
  "docs/knowledge-bank/corpora/nycartc-x-full-population-2026-07-15.json",
  "docs/knowledge-bank/corpora/nycartc-x-full-population-2026-07-15.manifest.json",
  "docs/knowledge-bank/projects/callnyc.md",
  "docs/knowledge-bank/projects/wowlist.md",
  "docs/knowledge-bank/projects/urbanhermit-public-record.md",
  "docs/knowledge-bank/projects/waterways-and-participatory-art.md",
  "docs/knowledge-bank/projects/nyc-artist-coalition.md",
  "docs/knowledge-bank/projects/nyc-artist-coalition-facebook-events.md",
  "docs/knowledge-bank/projects/personal-wowlist-facebook-events.md",
  "docs/knowledge-bank/projects/kc-town-hall.md",
  "docs/knowledge-bank/projects/kansas-city-neighborhood-programs.md",
  "evals/knowledge-bank/runs/2026-07-15-nycac-facebook-events.md",
  "evals/knowledge-bank/runs/2026-07-15-personal-wowlist-facebook-events.md",
  "apps/www/src/data/proofs.ts",
  "apps/www/src/data/knowledge-bank/social-account-archive.ts",
  "apps/www/src/data/knowledge-bank/callnyc-x-corpus.ts",
  "apps/www/src/data/knowledge-bank/wowlist-x-corpus.ts",
  "apps/www/src/data/knowledge-bank/nycartc-x-corpus.ts",
  "apps/www/src/data/knowledge-bank/urbanhermit-x-corpus.ts",
  "apps/www/src/data/knowledge-bank/nycac-facebook-events.ts",
  "apps/www/src/data/knowledge-bank/personal-wowlist-facebook-events-2026-07.ts",
  "apps/www/src/data/knowledge-bank/fixtures/nycartc-facebook-events-full-population.json",
  "apps/www/src/data/knowledge-bank/fixtures/personal-wowlist-facebook-events-full-population.json",
  "apps/www/src/data/knowledge-bank/fixtures/urbanhermit-full-population.json",
  "apps/www/src/content/work/callnyc.mdx",
  "apps/www/src/data/work.ts",
  "apps/www/src/app/resume/page.tsx",
  "apps/www/src/app/work/technical-operations/page.tsx",
  "apps/www/src/app/lab/source-backed-team-memory/page.tsx",
  "scripts/check-knowledge-bank.mjs",
  "scripts/check-public-safety.mjs",
  "scripts/evals-chad-lens.mjs",
  "scripts/evals-callnyc-x-corpus.mjs",
  "scripts/evals-wowlist-x-corpus.mjs",
  "scripts/derive-nycartc-x-corpus.mjs",
  "scripts/evals-nycartc-x-corpus.mjs",
  "scripts/evals-urbanhermit-x-corpus.mjs",
  "scripts/evals-nycac-facebook-events.mjs",
  "scripts/evals-personal-wowlist-facebook-events.mjs",
  "scripts/lib/urbanhermit-mission-classifier.mjs",
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
  "evals:callnyc-x",
  "evals:wowlist-x",
  "check:nycartc-corpus",
  "evals:nycartc-x",
  "evals:urbanhermit-x",
  "evals:nycac-facebook-events",
  "evals:personal-wowlist-facebook-events",
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

if (scripts.check && !scripts.check.includes("npm run evals:callnyc-x")) {
  fail("package.json check script must include npm run evals:callnyc-x");
}

if (scripts.check && !scripts.check.includes("npm run evals:wowlist-x")) {
  fail("package.json check script must include npm run evals:wowlist-x");
}

if (scripts.check && !scripts.check.includes("npm run check:nycartc-corpus")) {
  fail("package.json check script must include npm run check:nycartc-corpus");
}

if (scripts.check && !scripts.check.includes("npm run evals:nycartc-x")) {
  fail("package.json check script must include npm run evals:nycartc-x");
}

if (scripts.check && !scripts.check.includes("npm run evals:urbanhermit-x")) {
  fail("package.json check script must include npm run evals:urbanhermit-x");
}

if (
  scripts.check &&
  !scripts.check.includes("npm run evals:nycac-facebook-events")
) {
  fail(
    "package.json check script must include npm run evals:nycac-facebook-events"
  );
}

if (
  scripts.check &&
  !scripts.check.includes("npm run evals:personal-wowlist-facebook-events")
) {
  fail(
    "package.json check script must include npm run evals:personal-wowlist-facebook-events"
  );
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

if (scripts["evals:callnyc-x"] !== "node scripts/evals-callnyc-x-corpus.mjs") {
  fail("package.json evals:callnyc-x must run scripts/evals-callnyc-x-corpus.mjs");
}

if (scripts["evals:wowlist-x"] !== "node scripts/evals-wowlist-x-corpus.mjs") {
  fail("package.json evals:wowlist-x must run scripts/evals-wowlist-x-corpus.mjs");
}

if (scripts["check:nycartc-corpus"] !== "node scripts/derive-nycartc-x-corpus.mjs") {
  fail("package.json check:nycartc-corpus must run scripts/derive-nycartc-x-corpus.mjs");
}

if (scripts["evals:nycartc-x"] !== "node scripts/evals-nycartc-x-corpus.mjs") {
  fail("package.json evals:nycartc-x must run scripts/evals-nycartc-x-corpus.mjs");
}

if (scripts["evals:urbanhermit-x"] !== "node scripts/evals-urbanhermit-x-corpus.mjs") {
  fail("package.json evals:urbanhermit-x must run scripts/evals-urbanhermit-x-corpus.mjs");
}

if (
  scripts["evals:nycac-facebook-events"] !==
  "node scripts/evals-nycac-facebook-events.mjs"
) {
  fail(
    "package.json evals:nycac-facebook-events must run scripts/evals-nycac-facebook-events.mjs"
  );
}

if (
  scripts["evals:personal-wowlist-facebook-events"] !==
  "node scripts/evals-personal-wowlist-facebook-events.mjs"
) {
  fail(
    "package.json evals:personal-wowlist-facebook-events must run scripts/evals-personal-wowlist-facebook-events.mjs"
  );
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
const kcTownHallTransitionReceipt = read(
  "docs/knowledge-bank/intake/2026-07-15-kc-town-hall-stewardship-transition.md"
);
const socialAccountReceipt = read(
  "docs/knowledge-bank/intake/2026-07-15-project-social-account-archive.md"
);
const callnycXReceipt = read(
  "docs/knowledge-bank/intake/2026-07-15-callnyc-x-full-population.md"
);
const callnycXCorpus = read(
  "docs/knowledge-bank/corpora/callnyc-x-public-corpus.json"
);
const callnycXModule = read(
  "apps/www/src/data/knowledge-bank/callnyc-x-corpus.ts"
);
const callnycCaseStudy = read("apps/www/src/content/work/callnyc.mdx");
const wowlistXReceipt = read(
  "docs/knowledge-bank/intake/2026-07-15-wowlist-x-full-population.md"
);
const wowlistXCorpus = read(
  "docs/knowledge-bank/corpora/wowlist-x-public-corpus.json"
);
const wowlistXModule = read(
  "apps/www/src/data/knowledge-bank/wowlist-x-corpus.ts"
);
const wowlistCaseStudy = read("apps/www/src/content/work/wowlist.mdx");
const nycartcXReceipt = read(
  "docs/knowledge-bank/intake/2026-07-15-nycartc-x-full-population.md"
);
const nycartcXCorpus = read(
  "docs/knowledge-bank/corpora/nycartc-x-full-population-2026-07-15.json"
);
const nycartcXModule = read(
  "apps/www/src/data/knowledge-bank/nycartc-x-corpus.ts"
);
const fairRentCaseStudy = read("apps/www/src/content/work/fair-rent-nyc.mdx");

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

for (const doc of [
  ["docs/production-readiness.md", productionReadiness],
  ["docs/knowledge-bank/review-checklist.md", reviewChecklist],
  ["docs/knowledge-bank/launch-blockers.md", launchBlockers],
  ["docs/qa/evals-L/recursive-protocol.md", recursiveProtocol]
]) {
  requireIncludes(doc[1], "npm run evals:callnyc-x", doc[0]);
}

for (const doc of [
  ["docs/production-readiness.md", productionReadiness],
  ["docs/knowledge-bank/review-checklist.md", reviewChecklist],
  ["docs/knowledge-bank/launch-blockers.md", launchBlockers],
  ["docs/qa/evals-L/recursive-protocol.md", recursiveProtocol]
]) {
  requireIncludes(doc[1], "npm run evals:wowlist-x", doc[0]);
}

for (const doc of [
  ["docs/production-readiness.md", productionReadiness],
  ["docs/knowledge-bank/review-checklist.md", reviewChecklist],
  ["docs/knowledge-bank/launch-blockers.md", launchBlockers],
  ["docs/qa/evals-L/recursive-protocol.md", recursiveProtocol]
]) {
  requireIncludes(doc[1], "npm run check:nycartc-corpus", doc[0]);
  requireIncludes(doc[1], "npm run evals:nycartc-x", doc[0]);
}

for (const doc of [
  ["docs/production-readiness.md", productionReadiness],
  ["docs/knowledge-bank/review-checklist.md", reviewChecklist],
  ["docs/knowledge-bank/launch-blockers.md", launchBlockers],
  ["docs/qa/evals-L/recursive-protocol.md", recursiveProtocol]
]) {
  requireIncludes(doc[1], "npm run evals:urbanhermit-x", doc[0]);
}

for (const doc of [
  ["docs/production-readiness.md", productionReadiness],
  ["docs/knowledge-bank/review-checklist.md", reviewChecklist],
  ["docs/knowledge-bank/launch-blockers.md", launchBlockers],
  ["docs/qa/evals-L/recursive-protocol.md", recursiveProtocol]
]) {
  requireIncludes(doc[1], "npm run evals:nycac-facebook-events", doc[0]);
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

for (const expected of [
  "SRC-KC-TOWN-HALL-JAMIE-TRANSITION-ACCOUNT-2026-07-15",
  "OBS-KC-TOWN-HALL-STEWARDSHIP-TRANSITION-ACCOUNT",
  "CLM-KC-TOWN-HALL-STEWARDSHIP-TRANSITION",
  "mission-aligned",
  "INQ-KC-TOWN-HALL-STEWARDSHIP-TRANSITION-2026",
  "distinct from the later municipal funding withdrawal"
]) {
  requireIncludes(kcTownHallTransitionReceipt, expected, "KC Town Hall transition receipt");
}

const normalizedSocialAccountReceipt = socialAccountReceipt
  .replaceAll("**", "")
  .replace(/\s+/g, " ")
  .toLowerCase();

for (const expected of [
  "@CallNYCapp",
  "@NYCArtC",
  "@wowlist",
  "@KCTownHall",
  "@KCSpacesFund",
  "at least six distinct then-Council-member accounts",
  "21 posts from at least seven distinct Council-member accounts",
  "Olympia Kazi authored 89 recovered posts",
  "13-post CreateNYC exchange",
  "not a complete account export",
  "Jamie did not necessarily author every post"
]) {
  requireIncludes(
    normalizedSocialAccountReceipt,
    expected.toLowerCase(),
    "project social account receipt"
  );
}

for (const expected of [
  "100% population accounting",
  "97.3% status-level recovery",
  "70 recovered issue-recognition posts",
  "24 Council-member accounts",
  "two city-agency accounts",
  "63 distinct CallNYC destinations",
  "not a complete 110-status export",
  "mutable counter events"
]) {
  requireIncludes(callnycXReceipt, expected, "CallNYC X full-population receipt");
}

for (const expected of [
  "INTAKE-2026-07-15-CALLNYC-X-FULL-POPULATION",
  "SRC-CALLNYC-X-FULL-POPULATION-2026-07-15",
  "CLM-CALLNYC-X-PUBLIC-DOCUMENTATION-SYSTEM",
  "INQ-CALLNYC-X-FULL-POPULATION-2026",
  "do not call 107 a complete export",
  "not unique people or identified stakeholder accounts"
]) {
  requireIncludes(callnycXModule, expected, "CallNYC X knowledge-bank module");
}

for (const expected of [
  '"displayedByProfile": 110',
  '"recoveredStatusRecords": 107',
  '"unavailableResidual": 3',
  "Authenticated-user interaction state"
]) {
  requireIncludes(callnycXCorpus, expected, "CallNYC X public corpus");
}

for (const expected of [
  'claimId="CLM-CALLNYC-X-PUBLIC-DOCUMENTATION-SYSTEM"',
  'occurrenceId="social-documentation-system"'
]) {
  requireIncludes(callnycCaseStudy, expected, "CallNYC case study projection");
}

for (const expected of [
  "100% recovery of the surviving July 2026 profile population",
  "16 account posts",
  "six account replies",
  "16 reposts",
  "35 link occurrences",
  "34 distinct public destinations",
  "Do not project the number 38 as an impact metric"
]) {
  requireIncludes(wowlistXReceipt, expected, "WOW List X full-population receipt");
}

for (const expected of [
  "INTAKE-2026-07-15-WOWLIST-X-FULL-POPULATION",
  "CLM-WOWLIST-X-PUBLIC-SUPPORT-SURFACE",
  "INQ-WOWLIST-X-FULL-POPULATION-2026",
  "Jamie personally wrote all six replies",
  "Reposting proves partnership, endorsement, reach, or impact"
]) {
  requireIncludes(wowlistXModule, expected, "WOW List X knowledge-bank module");
}

for (const expected of [
  '"profileCountObserved": 38',
  '"accountPostsRecovered": 16',
  '"accountRepliesRecovered": 6',
  '"repostsRecovered": 16',
  '"uniqueResolvedDestinations": 34'
]) {
  requireIncludes(wowlistXCorpus, expected, "WOW List X public corpus");
}

for (const expected of [
  'claimId="CLM-WOWLIST-X-PUBLIC-SUPPORT-SURFACE"',
  'occurrenceId="public-support-surface"',
  "complete census of the 38 records",
  "not a platform export or deletion history"
]) {
  requireIncludes(wowlistCaseStudy, expected, "WOW List case study projection");
}

for (const expected of [
  "100% population accounting, not 100% item recovery",
  "3,367 distinct account items",
  "1,757",
  "696 recovered authored posts",
  "2,671 reposts",
  "1,235 distinct short URLs",
  "outbound communication findings",
  "held from accomplishment messaging"
]) {
  requireIncludes(nycartcXReceipt, expected, "NYC Artist Coalition X receipt");
}

for (const expected of [
  "INTAKE-2026-07-15-NYCARTC-X-FULL-POPULATION",
  "SRC-NAC-X-CORPUS-2026-07-15",
  "CLM-NAC-X-SHARED-PUBLIC-OPERATING-LAYER",
  "INQ-NAC-X-FULL-POPULATION-2026",
  "All 5,124 profile-reported items were recovered",
  "109 Council members engaged with the coalition",
  "Visible engagement proves policy impact"
]) {
  requireIncludes(nycartcXModule, expected, "NYC Artist Coalition X module");
}

for (const expected of [
  '"profileReported": 5124',
  '"recoveredAccountItems": 3367',
  '"authored": 696',
  '"reposted": 2671',
  '"unrecoveredCountDifference": 1757',
  '"allDistinctShortUrlsResolved": 1235'
]) {
  requireIncludes(nycartcXCorpus, expected, "NYC Artist Coalition X corpus");
}

for (const expected of [
  'claimId="CLM-NAC-X-SHARED-PUBLIC-OPERATING-LAYER"',
  'occurrenceId="shared-public-operating-layer"',
  "3,367 of 5,124 reported items",
  "does not assign every shared-account post to Jamie",
  "treat posting volume as policy impact"
]) {
  requireIncludes(fairRentCaseStudy, expected, "Fair Rent NYC corpus projection");
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
