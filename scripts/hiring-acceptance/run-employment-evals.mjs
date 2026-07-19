#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { employmentHealth } from "../knowledge-wiki/employment.mjs";
import { repoRoot } from "../knowledge-wiki/lib.mjs";
import { candidateFingerprint, loadReaderProfiles, validateReaderProfile } from "./lib.mjs";
import { employmentEvalPath, validateEmploymentEvalSuite } from "./check-evals.mjs";

const suite = JSON.parse(readFileSync(employmentEvalPath, "utf8"));
const suiteErrors = validateEmploymentEvalSuite(suite);
if (suiteErrors.length) throw new Error(suiteErrors.join("; "));
const health = employmentHealth();
const candidate = candidateFingerprint();
const reportPaths = Object.fromEntries(["development", "holdout"].map((panel) => [panel, path.join(repoRoot, `reports/hiring/${panel}/reader-consensus.json`)]));
const reports = Object.fromEntries(Object.entries(reportPaths).map(([panel, file]) => [panel, existsSync(file) ? JSON.parse(readFileSync(file, "utf8")) : null]));
const allReports = Object.values(reports).filter(Boolean);
const allReviews = allReports.flatMap((report) => report.reviews ?? []);
const profiles = loadReaderProfiles();
const profileErrors = [...profiles.values()].flatMap(validateReaderProfile);
const employmentReportFiles = [
  "reports/wiki/employment-health.md",
  "reports/wiki/source-coverage.md",
  "reports/wiki/career-trajectory-coverage.md",
  ...health.role_coverage.map((role) => `reports/wiki/role-coverage/${role.opportunity_id}.md`),
];
const check = spawnSync(process.execPath, ["scripts/hiring-acceptance/check.mjs", "--require-reports"], { cwd: repoRoot, encoding: "utf8" });

function criterion(id, pass, evidence, findings = []) {
  const definition = suite.evals.find((item) => item.id === id);
  return { id, title: definition.title, grader: definition.grader, blocking: definition.blocking, pass, evidence, findings };
}

const results = [];
results.push(criterion("EWA-001", health.gates.canonical_wiki_authority && health.gates.no_private_locators, ["single docs/knowledge-bank authority", "opaque protected-channel metadata", "no private locator compiler errors"]));
results.push(criterion("EWA-002", health.gates.six_priority_records && health.gates.official_sources_only && health.gates.bounded_reverification && health.gates.live_roles_current_as_of, [`priority records: ${health.role_coverage.length}`, `as of: ${health.as_of}`]));
results.push(criterion("EWA-003", health.gates.requirement_ids && health.gates.hard_screens && health.gates.oti_source_discrepancy_preserved, ["stable role requirement IDs", "controlled hard-screen states", "OTI Internal CSV discrepancy retained"]));
results.push(criterion("EWA-004", employmentReportFiles.every((file) => existsSync(path.join(repoRoot, file))), employmentReportFiles, employmentReportFiles.filter((file) => !existsSync(path.join(repoRoot, file))).map((file) => `Missing ${file}`)));
results.push(criterion("EWA-005", health.gates.title_blind_recall && health.gates.discovery_precision && health.gates.hard_screen_detection && health.gates.closed_control_rejected, [`Top-${health.discovery.top_k} recall: ${health.discovery.top_k_recall}`, `precision: ${health.discovery.precision}`, `hard-screen detection: ${health.discovery.hard_screen_detection}`]));
results.push(criterion("EWA-006", check.status === 0, [check.stdout.trim() || "hiring contract check"], check.status === 0 ? [] : [check.stderr.trim() || check.stdout.trim()]));
results.push(criterion("EWA-007", profileErrors.length === 0, [`reader profiles: ${profiles.size}`, "development and holdout panels are disjoint"], profileErrors));
const exactReports = allReports.length === 2 && allReports.every((report) => report.candidateSha === candidate && report.independentFromOptimizer === true && report.portfolioSnapshotHash && report.roleContextHash && report.readerContextHash && report.promptHash);
results.push(criterion("EWA-008", exactReports, [`candidate fingerprint: ${candidate}`, `bound reports: ${allReports.length}/2`], exactReports ? [] : ["Development and holdout reports must be rebound to the exact candidate"]));
const target = "opportunity.oti.technical-operations-manager.782369";
const targetReviews = allReviews.filter((review) => review.opportunityId === target);
const hiringAcceptance = targetReviews.length >= 2 && targetReviews.every((review) => review.firstTenSeconds?.professionalCategoryUnderstood === true && Array.isArray(review.criticalRequirementCoverage) && review.criticalRequirementCoverage.length > 0 && Array.isArray(review.missingPositiveEvidence));
results.push(criterion("EWA-009", hiringAcceptance, [`OTI public-only reviews: ${targetReviews.length}`, "first-ten-second and requirement-level outputs retained"], hiringAcceptance ? [] : ["Independent public-only OTI judgments are missing or incomplete"]));
const advisoryReaders = new Set(allReviews.map((review) => review.readerId));
const oneYearPass = ["reader.herminia-ibarra", "reader.claudio-fernandez-araoz", "reader.amy-edmondson"].every((id) => advisoryReaders.has(id)) && allReviews.filter((review) => ["reader.herminia-ibarra", "reader.claudio-fernandez-araoz", "reader.amy-edmondson"].includes(review.readerId)).every((review) => Array.isArray(review.oneYearSuccessConditions) && review.oneYearSuccessConditions.length && Array.isArray(review.oneYearRiskConditions) && review.oneYearRiskConditions.length);
results.push(criterion("EWA-010", oneYearPass, ["Herminia working-identity lens", "Claudio selection-risk lens", "Amy team-learning lens"], oneYearPass ? [] : ["One-year advisory contexts are incomplete"]));
const chadReviews = allReviews.filter((review) => review.readerId === "reader.chad-berkowitz");
const voicePass = chadReviews.length > 0 && chadReviews.every((review) => review.voiceFindings?.strongestSentence && review.voiceFindings?.clarity >= 3 && review.voiceFindings?.warmth >= 3);
results.push(criterion("EWA-011", voicePass, [`Chad-lens reviews: ${chadReviews.length}`, "voice findings retain strongest sentence, clarity, and warmth"], voicePass ? [] : ["Independent Chad-lens voice finding is missing"]));
const deadlineYields = suite.stop_conditions.some((item) => /deadline/.test(item) && /priority/.test(item));
const humanOpen = allReports.length === 2 && allReports.every((report) => report.humanAuthority === "open") && deadlineYields;
results.push(criterion("EWA-012", humanOpen, ["human authority remains open", "live deadlines outrank further optimization", "no employer outcome claimed"], humanOpen ? [] : ["Human/outward-action gate is missing or overstated"]));

const status = results.every((item) => item.pass) ? "pass" : "blocked";
const output = { schemaVersion: 1, suiteId: suite.suite_id, candidateSha: candidate, status, noBlendedScore: true, results };
const root = path.join(repoRoot, "reports/hiring");
mkdirSync(root, { recursive: true });
writeFileSync(path.join(root, "employment-evals.json"), `${JSON.stringify(output, null, 2)}\n`);
writeFileSync(path.join(root, "employment-evals.md"), [
  "<!-- GENERATED FILE. Run `npm run run:employment-evals`; do not edit directly. -->",
  "",
  "# Employment and hiring acceptance evals",
  "",
  `**Status:** ${status.toUpperCase()}`,
  `**Candidate:** \`${candidate}\``,
  "**Scoring:** No blended score. Each gate stands on its own.",
  "",
  "| Eval | Result | Evidence |",
  "| --- | --- | --- |",
  ...results.map((item) => `| \`${item.id}\` ${item.title} | ${item.pass ? "PASS" : "BLOCKED"} | ${item.evidence.join("; ")} |`),
  "",
  "Human approval, application submission, employer response, rights, and production release remain external outcomes or named human decisions.",
].join("\n"));
for (const item of results) console.log(`${item.pass ? "PASS" : "BLOCKED"} ${item.id} ${item.title}`);
if (status !== "pass") process.exitCode = 1;
