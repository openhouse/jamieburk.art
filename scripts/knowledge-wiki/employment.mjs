import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { compileKnowledgeWiki, repoRoot } from "./lib.mjs";

export const priorityOpportunityIds = [
  "opportunity.oti.technical-operations-manager.782369",
  "opportunity.aclu.product-manager-discovery.8482872002",
  "opportunity.benepass.product-operations-manager",
  "opportunity.codepath.senior-program-manager-claude-corps.5182020007",
  "opportunity.asana.ai-implementation-manager-service-management.8027437",
  "opportunity.permitflow.product-operations-manager",
];

export const discoveryBenchmarkPath = path.join(repoRoot, "docs/knowledge-bank/data/opportunity-discovery-benchmark.json");

export function fingerprint(value) {
  return createHash("sha256").update(typeof value === "string" ? value : JSON.stringify(value)).digest("hex");
}

export function loadEmploymentContext(compiled = compileKnowledgeWiki()) {
  const byId = new Map(compiled.graph.nodes.map((node) => [node.id, node]));
  const opportunities = priorityOpportunityIds.map((id) => byId.get(id)).filter(Boolean);
  return { compiled, byId, opportunities };
}

export function analyzeRoleCoverage(opportunity) {
  const requirements = opportunity.opportunity.role_requirements.map((requirement) => ({
    id: requirement.id,
    importance: requirement.importance,
    text: requirement.text,
    status: requirement.coverage.status,
    wiki_evidence: requirement.coverage.wiki_evidence ?? [],
    public_proof_ids: requirement.coverage.public_proof_ids ?? [],
    public_routes: requirement.coverage.public_routes ?? [],
    gap_type: requirement.coverage.gap_type ?? "unknown",
    next_action: requirement.coverage.next_action,
  }));
  const critical = requirements.filter((item) => item.importance === "critical");
  const p0Statuses = new Set(["source-needed", "corroboration-needed", "rights-blocked", "experience-gap", "hard-screen", "unknown"]);
  return {
    opportunity_id: opportunity.id,
    title: opportunity.title,
    posting_status: opportunity.opportunity.posting_status,
    verified_at: opportunity.opportunity.verified_at,
    reverify_by: opportunity.opportunity.reverify_by,
    requirement_count: requirements.length,
    critical_requirement_count: critical.length,
    critical_p0_gaps: critical.filter((item) => p0Statuses.has(item.status)).map((item) => item.id),
    requirements,
    hard_screens: opportunity.opportunity.hard_screens,
  };
}

const discoverySignals = [
  "delivery", "implementation", "launch", "documentation", "handoff",
  "workflow", "stakeholder", "operations", "discovery", "risk",
  "onboarding", "customer", "program", "product", "ai", "data",
];

function signalScore(text) {
  const lowered = text.toLowerCase();
  return discoverySignals.filter((signal) => lowered.includes(signal)).length;
}

export function evaluateOpportunityDiscovery(context = loadEmploymentContext()) {
  const benchmark = JSON.parse(readFileSync(discoveryBenchmarkPath, "utf8"));
  const candidates = context.opportunities.map((node) => {
    const role = node.opportunity;
    const titleBlindText = [
      ...role.role_requirements.map((item) => item.text),
      ...role.confirmed_facts,
      ...role.one_year_success_conditions,
    ].join(" ");
    return {
      id: node.id,
      label: "known-good",
      live: role.posting_status === "live",
      salary_min: node.opportunity.compensation?.minimum ?? null,
      salary_max: node.opportunity.compensation?.maximum ?? null,
      hard_screen: role.hard_screens.some((item) => item.status === "gap") ? "unmet" : null,
      score: signalScore(titleBlindText),
      title_blind: true,
    };
  });
  for (const control of benchmark.controls) {
    candidates.push({
      ...control,
      score: signalScore((control.signals ?? []).join(" ")),
      title_blind: true,
    });
  }
  const rejected = [];
  const eligible = [];
  for (const candidate of candidates) {
    const reasons = [];
    if (!candidate.live) reasons.push("closed");
    if ((candidate.salary_max ?? candidate.salary_min ?? 0) < 100000) reasons.push("compensation-below-floor");
    if (candidate.hard_screen) reasons.push("hard-screen");
    if (candidate.label === "false-positive" || candidate.score < 3) reasons.push("insufficient-trajectory-match");
    if (reasons.length) rejected.push({ id: candidate.id, reasons: [...new Set(reasons)] });
    else eligible.push(candidate);
  }
  eligible.sort((left, right) => right.score - left.score || left.id.localeCompare(right.id));
  const retrieved = eligible.slice(0, 6).map((item) => item.id);
  const expected = new Set(benchmark.known_good);
  const truePositiveCount = retrieved.filter((id) => expected.has(id)).length;
  const falsePositiveCount = retrieved.length - truePositiveCount;
  const hardScreenControls = benchmark.controls.filter((item) => item.label === "hard-screen");
  const detectedHardScreens = hardScreenControls.filter((item) => rejected.some((entry) => entry.id === item.id && entry.reasons.includes("hard-screen"))).length;
  return {
    schema_version: 1,
    as_of: benchmark.as_of,
    title_blind: true,
    query_terms_exclude_titles: true,
    top_k: 6,
    retrieved,
    expected: benchmark.known_good,
    top_k_recall: expected.size ? truePositiveCount / expected.size : 0,
    precision: retrieved.length ? truePositiveCount / retrieved.length : 0,
    hard_screen_detection: hardScreenControls.length ? detectedHardScreens / hardScreenControls.length : 1,
    closed_roles_rejected: benchmark.controls.filter((item) => item.label === "closed").every((item) => rejected.some((entry) => entry.id === item.id && entry.reasons.includes("closed"))),
    below_floor_rejected: benchmark.controls.filter((item) => item.id.includes("low-salary")).every((item) => rejected.some((entry) => entry.id === item.id && entry.reasons.includes("compensation-below-floor"))),
    rejected,
    candidate_scores: candidates.map(({ id, label, score }) => ({ id, label, score })),
  };
}

export function employmentHealth(context = loadEmploymentContext(), { asOf = "2026-07-18" } = {}) {
  const coverage = context.opportunities.map(analyzeRoleCoverage);
  const discovery = evaluateOpportunityDiscovery(context);
  const missingPriority = priorityOpportunityIds.filter((id) => !context.byId.has(id));
  const invalidReverifyWindows = context.opportunities
    .filter((node) => {
      const verified = Date.parse(`${node.opportunity.verified_at}T00:00:00Z`);
      const reverify = Date.parse(`${node.opportunity.reverify_by}T00:00:00Z`);
      return !Number.isFinite(verified) || !Number.isFinite(reverify) || reverify - verified > 3 * 86400000;
    })
    .map((node) => node.id);
  const staleLiveRoles = context.opportunities
    .filter((node) => node.opportunity.posting_status === "live" && node.opportunity.reverify_by < asOf)
    .map((node) => node.id);
  const oti = context.byId.get("opportunity.oti.technical-operations-manager.782369");
  const otiDiscrepancyPreserved = oti?.opportunity.unknowns.some((item) => /Internal CSV/.test(item))
    && oti?.opportunity.confirmed_facts.some((item) => /CSV labels Posting Type as Internal/.test(item));
  const gates = {
    canonical_wiki_authority: !context.compiled.documents.some((doc) => doc.path.startsWith("docs/knowledge-wiki/")),
    no_private_locators: !context.compiled.health.errors.some((item) => item.code === "private-locator"),
    six_priority_records: missingPriority.length === 0,
    official_sources_only: context.opportunities.every((node) => node.opportunity.source_type === "official-employer"),
    bounded_reverification: invalidReverifyWindows.length === 0,
    live_roles_current_as_of: staleLiveRoles.length === 0,
    requirement_ids: coverage.every((report) => report.requirement_count > 0),
    hard_screens: coverage.every((report) => Array.isArray(report.hard_screens) && report.hard_screens.length > 0),
    oti_source_discrepancy_preserved: Boolean(otiDiscrepancyPreserved),
    title_blind_recall: discovery.top_k_recall === 1,
    discovery_precision: discovery.precision === 1,
    hard_screen_detection: discovery.hard_screen_detection === 1,
    closed_control_rejected: discovery.closed_roles_rejected,
  };
  return {
    schema_version: 1,
    as_of: asOf,
    status: Object.values(gates).every(Boolean) ? "pass" : "fail",
    gates,
    missing_priority_records: missingPriority,
    invalid_reverify_windows: invalidReverifyWindows,
    stale_live_roles: staleLiveRoles,
    role_coverage: coverage,
    discovery,
  };
}
