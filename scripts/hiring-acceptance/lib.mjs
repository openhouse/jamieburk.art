import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { parse as parseYaml } from "yaml";
import { compileKnowledgeWiki, repoRoot } from "../knowledge-wiki/lib.mjs";

export const hiringRoot = path.join(repoRoot, "docs/qa/hiring-acceptance");
export const suitePath = path.join(hiringRoot, "suites/current-priority.json");
export const standardDisclaimer = "This is a simulated review lens based on supplied public or approved context. It is not the person's actual opinion, participation, endorsement, or hiring decision.";

function stableJson(value) { return `${JSON.stringify(value, null, 2)}\n`; }
export function fingerprint(value) { return createHash("sha256").update(typeof value === "string" ? value : stableJson(value)).digest("hex"); }
function relative(file) { return path.relative(repoRoot, file).split(path.sep).join("/"); }

function walk(root) {
  if (!existsSync(root)) return [];
  const files = [];
  for (const entry of readdirSync(root, { withFileTypes: true })) {
    const absolute = path.join(root, entry.name);
    if (entry.isDirectory()) files.push(...walk(absolute));
    else if (entry.isFile()) files.push(absolute);
  }
  return files;
}

export function selectedEmploymentCandidateFiles() {
  const roots = [
    "apps/www/src",
    "docs/knowledge-bank",
    "docs/qa/hiring-acceptance",
    ".agents/evals/knowledge-wiki-employment.json",
  ];
  return roots.flatMap((entry) => {
    const absolute = path.join(repoRoot, entry);
    if (!existsSync(absolute)) return [];
    return statSync(absolute).isFile() ? [absolute] : walk(absolute);
  }).filter((file) => !relative(file).includes("/reports/")).sort((left, right) => relative(left).localeCompare(relative(right)));
}

export function candidateFingerprint() {
  const hash = createHash("sha256");
  for (const file of selectedEmploymentCandidateFiles()) {
    hash.update(relative(file));
    hash.update("\0");
    hash.update(readFileSync(file));
    hash.update("\0");
  }
  return hash.digest("hex");
}

export function gitHead() {
  try { return execFileSync("git", ["rev-parse", "HEAD"], { cwd: repoRoot, encoding: "utf8" }).trim(); }
  catch { return "unavailable"; }
}

export function parseProfile(file) {
  const source = readFileSync(file, "utf8");
  if (!source.startsWith("---\n")) throw new Error(`Reader profile lacks frontmatter: ${relative(file)}`);
  const closing = source.indexOf("\n---\n", 4);
  if (closing < 0) throw new Error(`Reader profile frontmatter does not close: ${relative(file)}`);
  return { ...parseYaml(source.slice(4, closing)), body: source.slice(closing + 5).trim(), path: relative(file) };
}

export function loadReaderProfiles() {
  const root = path.join(hiringRoot, "readers");
  return new Map(walk(root).filter((file) => file.endsWith(".md")).map((file) => {
    const profile = parseProfile(file);
    return [profile.id, profile];
  }));
}

export function validateReaderProfile(profile) {
  const errors = [];
  for (const field of ["id", "type", "displayName", "mode", "panel", "publicSources", "relevance", "priorities", "likelyQuestions", "prohibitedAssumptions", "disclaimer"]) {
    if (profile[field] === undefined) errors.push(`${profile.id ?? "reader"} missing ${field}`);
  }
  const named = !profile.id?.startsWith("reader.generic-");
  if (named && (!Array.isArray(profile.publicSources) || profile.publicSources.length === 0)) errors.push(`${profile.id} named profile requires publicSources`);
  if (named && profile.disclaimer !== standardDisclaimer) errors.push(`${profile.id} must use the full simulated-lens disclaimer`);
  if (!["development", "holdout"].includes(profile.panel)) errors.push(`${profile.id} has invalid panel`);
  return errors;
}

export function loadSuite() { return JSON.parse(readFileSync(suitePath, "utf8")); }

export function sanitizeOpportunity(node) {
  const role = node.opportunity;
  return {
    id: node.id,
    title: node.title,
    organization: role.organization,
    canonicalUrl: role.canonical_url,
    sourceType: role.source_type,
    postingStatus: role.posting_status,
    verifiedAt: role.verified_at,
    reverifyBy: role.reverify_by,
    deadline: role.deadline,
    compensation: role.compensation,
    location: role.location,
    reportingLine: role.reporting_line,
    namedPersonnel: role.named_personnel,
    requirements: role.role_requirements.map((item) => ({ id: item.id, importance: item.importance, kind: item.kind, text: item.text })),
    hardScreens: role.hard_screens.map((item) => ({ id: item.id, text: item.text })),
    portfolioRoutes: role.portfolio_routes,
    confirmedFacts: role.confirmed_facts,
    unknowns: role.unknowns,
    oneYearSuccessConditions: role.one_year_success_conditions,
    oneYearRiskConditions: role.one_year_risk_conditions,
    interviewQuestions: role.interview_questions,
  };
}

function decodeHtml(value) {
  return value
    .replaceAll("&nbsp;", " ").replaceAll("&amp;", "&").replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">").replaceAll("&quot;", '"').replaceAll("&#39;", "'")
    .replace(/&#(\d+);/g, (_, number) => String.fromCodePoint(Number(number)));
}

export function htmlToPublicText(html) {
  return decodeHtml(html)
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<svg\b[^>]*>[\s\S]*?<\/svg>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export async function capturePublicPortfolio(baseUrl, routes) {
  const captured = [];
  for (const route of routes) {
    const url = new URL(route, baseUrl).toString();
    const response = await fetch(url, { redirect: "follow" });
    const html = await response.text();
    const text = htmlToPublicText(html);
    if (!response.ok || text.length < 80) throw new Error(`Public capture failed closed for ${route}: HTTP ${response.status}, ${text.length} visible characters`);
    captured.push({ route, url, status: response.status, text });
  }
  return {
    base_url: baseUrl,
    routes: captured,
    hash: fingerprint(captured),
  };
}

function splitCsv(value) { return value ? value.split(",").map((item) => item.trim()).filter(Boolean) : null; }

export async function buildHiringContext({ baseUrl, readerIds = null, opportunityIds = null, routes: routeOverride = null, panel = "development" }) {
  const suite = loadSuite();
  const profiles = loadReaderProfiles();
  const compiled = compileKnowledgeWiki();
  if (compiled.health.errors.length) throw new Error(`Wiki is invalid: ${compiled.health.errors.map((item) => item.code).join(", ")}`);
  const nodes = new Map(compiled.graph.nodes.map((node) => [node.id, node]));
  const selectedReaderIds = readerIds ?? (panel === "holdout" ? suite.holdoutReaderIds : suite.developmentReaderIds);
  const selectedOpportunityIds = opportunityIds ?? suite.opportunityIds;
  const readers = selectedReaderIds.map((id) => profiles.get(id));
  const roles = selectedOpportunityIds.map((id) => nodes.get(id)).map((node) => sanitizeOpportunity(node));
  if (readers.some((item) => !item) || roles.some((item) => !item)) throw new Error("Suite references an unknown reader or opportunity");
  const routes = routeOverride ?? [...new Set(roles.flatMap((role) => role.portfolioRoutes).filter((route) => suite.routes.includes(route)))];
  for (const route of routes) if (!suite.routes.includes(route)) throw new Error(`Route is outside the configured public suite: ${route}`);
  const portfolio = await capturePublicPortfolio(baseUrl, routes);
  const context = {
    schemaVersion: 1,
    suiteId: suite.id,
    panel,
    candidateSha: candidateFingerprint(),
    gitHead: gitHead(),
    portfolioSnapshotHash: portfolio.hash,
    roleContextHash: fingerprint(roles),
    readerContextHash: fingerprint(readers),
    promptHash: fingerprint(readFileSync(path.join(hiringRoot, "templates/named-public-context-reader.md"), "utf8")),
    optimizerIdentity: "Codex implementation agent",
    evaluatorIdentityRequired: "independent from optimizer",
    boundary: "Public portfolio, official public role context, and sourced reader context only. No hidden Knowledge Wiki evidence.",
    readers,
    opportunities: roles,
    portfolio,
    requiredOutput: {
      decisions: ["advance", "hold", "decline"],
      coverageStatuses: ["visible-proven", "visible-qualified", "visible-weak", "not-visible", "hard-screen", "unknown"],
      disclaimer: "Simulated review lens; not actual participation or endorsement.",
    },
  };
  const serialized = stableJson(context);
  if (/(?:wiki_evidence|public_proof_ids|gap_type|\/Users\/|\/Volumes\/)/.test(serialized)) throw new Error("Hiring context leaked hidden Wiki or private-locator data");
  return context;
}

export function cliSelection() {
  const argument = (name) => { const index = process.argv.indexOf(name); return index >= 0 ? process.argv[index + 1] : undefined; };
  return {
    baseUrl: argument("--base-url") ?? "http://127.0.0.1:3000",
    readerIds: splitCsv(argument("--readers")),
    opportunityIds: splitCsv(argument("--opportunities")),
    routes: splitCsv(argument("--routes")),
    panel: argument("--panel") ?? "development",
    output: argument("--output"),
  };
}

export function validateJudgments(payload, context) {
  const errors = [];
  for (const field of ["suiteId", "candidateSha", "portfolioSnapshotHash", "roleContextHash", "readerContextHash", "promptHash"]) {
    if (payload?.[field] !== context[field]) errors.push(`Judgment ${field} is stale or missing`);
  }
  if (payload?.independentFromOptimizer !== true) errors.push("Judgment must be independent from optimizer");
  if (!payload?.judgeId || payload.judgeId === context.optimizerIdentity) errors.push("Independent judgeId is required");
  const selectedReaders = new Set(context.readers.map((item) => item.id));
  const selectedRoles = new Set(context.opportunities.map((item) => item.id));
  const seen = new Set();
  for (const review of payload?.reviews ?? []) {
    const key = `${review.readerId}\0${review.opportunityId}`;
    if (!selectedReaders.has(review.readerId) || !selectedRoles.has(review.opportunityId)) errors.push(`Review has unknown context: ${key}`);
    if (seen.has(key)) errors.push(`Duplicate review: ${key}`);
    seen.add(key);
    if (!["advance", "hold", "decline"].includes(review.decision)) errors.push(`Invalid decision: ${key}`);
    if (!review.firstTenSeconds || typeof review.firstTenSeconds.professionalCategoryUnderstood !== "boolean") errors.push(`Missing firstTenSeconds: ${key}`);
    if (!Array.isArray(review.criticalRequirementCoverage)) errors.push(`Missing requirement coverage: ${key}`);
    if (!Array.isArray(review.missingPositiveEvidence) || !Array.isArray(review.recommendedPortfolioChanges)) errors.push(`Missing gap arrays: ${key}`);
    if (review.disclaimer !== context.requiredOutput.disclaimer) errors.push(`Missing disclaimer: ${key}`);
  }
  for (const readerId of selectedReaders) for (const roleId of selectedRoles) if (!seen.has(`${readerId}\0${roleId}`)) errors.push(`Missing review: ${readerId} / ${roleId}`);
  return errors;
}
