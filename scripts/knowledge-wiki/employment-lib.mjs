import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

import matter from "gray-matter";

export const employmentReportPaths = [
  "reports/wiki-opportunity-coverage.md",
  "reports/wiki-career-trajectory-coverage.md",
  "reports/wiki-source-channel-coverage.md",
  "reports/wiki-opportunity-discovery.md",
  "reports/hiring-acceptance-public.json",
  "reports/hiring-acceptance-public.md",
  "reports/hiring-acceptance-gap-resolution.json",
  "reports/hiring-acceptance-gap-resolution.md"
];

const suitePath = "evals/knowledge-wiki/hiring-suites.json";
const privatePattern =
  /(?:\/Users\/|\/Volumes\/|Mobile Documents|supporting-materials|Library\/CloudStorage|BEGIN (?:RSA |OPENSSH )?PRIVATE KEY)/i;

function compareText(a, b) {
  return a < b ? -1 : a > b ? 1 : 0;
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function read(repoRoot, relativePath) {
  return readFileSync(path.join(repoRoot, relativePath), "utf8");
}

function readMatter(repoRoot, relativePath) {
  const raw = read(repoRoot, relativePath);
  const parsed = matter(raw);
  return { path: relativePath, raw, data: parsed.data, content: parsed.content };
}

function dateText(value) {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return value;
}

function stableHash(entries) {
  const hash = createHash("sha256");
  for (const [key, value] of entries.sort(([a], [b]) => compareText(a, b))) {
    hash.update(key);
    hash.update("\0");
    hash.update(value);
    hash.update("\0");
  }
  return hash.digest("hex");
}

function sourceCommit(repoRoot, candidatePaths) {
  try {
    return execFileSync("git", ["log", "-1", "--format=%H", "--", ...candidatePaths], {
      cwd: repoRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"]
    }).trim();
  } catch {
    return "working-tree";
  }
}

function commitTime(repoRoot, sha) {
  if (sha === "working-tree") return "1970-01-01T00:00:00Z";
  try {
    return execFileSync("git", ["show", "-s", "--format=%cI", sha], {
      cwd: repoRoot,
      encoding: "utf8"
    }).trim();
  } catch {
    return "1970-01-01T00:00:00Z";
  }
}

function relevantTreeClean(repoRoot, candidatePaths) {
  try {
    return (
      execFileSync("git", ["status", "--porcelain", "--", ...candidatePaths], {
        cwd: repoRoot,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"]
      }).trim() === ""
    );
  } catch {
    return false;
  }
}

export function loadHiringSuite(repoRoot) {
  return JSON.parse(read(repoRoot, suitePath));
}

function publicRoleContext(record) {
  return {
    id: record.id,
    title: record.title,
    organization: record.organization ?? record.title.split(" - ")[0],
    canonicalUrl: record.canonical_url,
    sourceType: record.source_type,
    status: record.opportunity_status,
    verifiedAt: dateText(record.verified_at),
    reviewBy: dateText(record.review_by),
    portfolioRoutes: record.portfolio_routes,
    confirmedFacts: record.confirmed_facts,
    inferences: record.inferences,
    unknowns: record.unknowns,
    hardScreens: record.hard_screens,
    requirements: record.role_requirements.map((requirement) => ({
      id: requirement.id,
      importance: requirement.importance,
      kind: requirement.kind,
      text: requirement.text,
      declaredPublicStatus: requirement.status,
      publicEvidence: requirement.public_evidence
    })),
    oneYearSuccessConditions: record.one_year_success_conditions,
    oneYearRiskConditions: record.one_year_risk_conditions,
    interviewQuestions: record.interview_questions,
    publicReportingContext: record.public_reporting_context ?? null,
    publicVisionContext: record.public_vision_context ?? null
  };
}

function publicReaderContext(record) {
  return {
    id: record.id,
    displayName: record.displayName,
    mode: record.mode,
    category: record.category,
    publicSources: record.publicSources,
    priorities: record.priorities,
    prohibitedAssumptions: record.prohibitedAssumptions,
    disclaimer: record.disclaimer
  };
}

function routeCorpora(repoRoot, suite) {
  return Object.fromEntries(
    Object.entries(suite.routeFiles).map(([route, files]) => [
      route,
      files.map((file) => read(repoRoot, file)).join("\n")
    ])
  );
}

function publicEvaluationMarkdown(report) {
  const lines = [
    "<!-- GENERATED FILE. DO NOT EDIT. -->",
    "# Public-only hiring acceptance baseline",
    "",
    `**Candidate commit:** \`${report.candidateSha}\``,
    `**Portfolio snapshot:** \`${report.portfolioSnapshotHash}\``,
    `**Role-context hash:** \`${report.roleContextHash}\``,
    `**Reader-context hash:** \`${report.readerContextHash}\``,
    `**Evaluation contract:** \`${report.promptHash}\``,
    `**Candidate paths clean:** ${report.candidatePathsClean ? "yes" : "no"}`,
    "",
    "> Deterministic baseline only. This is not an interview prediction, a named person's opinion, or a human reader study.",
    "",
    "## Opportunity results",
    ""
  ];
  for (const opportunity of report.opportunities) {
    lines.push(
      `### ${opportunity.title}`,
      "",
      `- Deterministic disposition: \`${opportunity.decision}\``,
      `- Critical signals observed: ${opportunity.criticalObserved}/${opportunity.criticalTotal}`,
      `- All signals observed: ${opportunity.observed}/${opportunity.requirementTotal}`,
      `- Opportunity status live: ${opportunity.live ? "yes" : "no"}`,
      `- Historical benchmark: ${opportunity.benchmark ? "yes" : "no"}`,
      `- Role context current at candidate time: ${opportunity.fresh ? "yes" : "no"}`,
      `- Exclusionary hard screen recorded: ${opportunity.hardScreenBlocked ? "yes" : "no"}`,
      `- Public reporting context: ${opportunity.publicReportingContext?.role ?? "not recorded"} (${opportunity.publicReportingContext?.identification ?? "not recorded"})`,
      `- Public vision context: ${opportunity.publicVisionContext?.role ?? "not recorded"} (${opportunity.publicVisionContext?.identification ?? "not recorded"})`,
      ""
    );
    for (const requirement of opportunity.requirementCoverage) {
      lines.push(
        `- \`${requirement.requirementId}\`: **${requirement.observed ? "observed" : "not observed"}**${requirement.routes.length ? ` on ${requirement.routes.map((route) => `\`${route}\``).join(", ")}` : ""}`
      );
    }
    lines.push("");
  }
  lines.push(
    "## Open human gates",
    "",
    "- Fresh generic-reader comprehension study",
    "- Named-context human review, if any person chooses to participate",
    "- Jamie's application and projection approval",
    "- Actual hiring and one-year team outcomes",
    ""
  );
  return lines.join("\n");
}

export function evaluatePublicHiring(repoRoot) {
  const suite = loadHiringSuite(repoRoot);
  const benchmarkOpportunityIds = new Set(suite.benchmarkOpportunityIds ?? []);
  const opportunities = suite.opportunityPaths.map((item) => readMatter(repoRoot, item));
  const readers = suite.readerPaths.map((item) => readMatter(repoRoot, item));
  const corpora = routeCorpora(repoRoot, suite);
  const publicFiles = [...new Set(Object.values(suite.routeFiles).flat())].sort();
  const candidatePaths = [...publicFiles, ...suite.opportunityPaths, ...suite.readerPaths, suitePath];
  const candidateSha = sourceCommit(repoRoot, candidatePaths);
  const generatedAt = commitTime(repoRoot, candidateSha);
  const publicEntries = publicFiles.map((file) => [file, read(repoRoot, file)]);
  const roleContexts = opportunities.map((item) => publicRoleContext(item.data));
  const readerContexts = readers.map((item) => publicReaderContext(item.data));

  const evaluated = roleContexts.map((opportunity) => {
    const requirementCoverage = opportunity.requirements.map((requirement) => {
      const observedEvidence = requirement.publicEvidence.filter(
        (item) => corpora[item.route]?.includes(item.needle)
      );
      const sufficient = ["visible-proven", "visible-qualified"].includes(
        requirement.declaredPublicStatus
      );
      return {
        requirementId: requirement.id,
        importance: requirement.importance,
        observed: observedEvidence.length > 0 && sufficient,
        matchedPublicText: observedEvidence.length > 0,
        declaredPublicStatus: requirement.declaredPublicStatus,
        routes: [...new Set(observedEvidence.map((item) => item.route))],
        evidenceNeedles: observedEvidence.map((item) => item.needle)
      };
    });
    const critical = requirementCoverage.filter((item) => item.importance === "critical");
    const criticalObserved = critical.filter((item) => item.observed).length;
    const protectedOpportunity = opportunity.id.startsWith("opportunity.protected.");
    const benchmark = benchmarkOpportunityIds.has(opportunity.id);
    const live =
      !protectedOpportunity &&
      !benchmark &&
      opportunity.status === "live" &&
      opportunity.sourceType === "official-employer";
    const fresh = live && opportunity.reviewBy >= generatedAt.slice(0, 10);
    const hardScreenBlocked = opportunity.hardScreens.some(
      (screen) => screen.state === "not-met" || screen.disposition === "do-not-pursue"
    );
    return {
      id: opportunity.id,
      title: opportunity.title,
      roleContextHash: sha256(JSON.stringify(opportunity)),
      benchmark,
      live,
      fresh,
      hardScreenBlocked,
      publicReportingContext: opportunity.publicReportingContext,
      publicVisionContext: opportunity.publicVisionContext,
      decision:
        benchmark
          ? "historical-benchmark"
          : !live
          ? "not-live"
          : hardScreenBlocked
            ? "hard-screen-exclusion"
            : fresh && critical.length > 0 && criticalObserved / critical.length >= 0.75
              ? "deterministic-ready-for-human-review"
              : "evidence-gap-review",
      observed: requirementCoverage.filter((item) => item.observed).length,
      requirementTotal: requirementCoverage.length,
      criticalObserved,
      criticalTotal: critical.length,
      requirementCoverage
    };
  });

  const corpus = Object.values(corpora).join("\n");
  const report = {
    schemaVersion: 1,
    runId: `hiring-public-${candidateSha.slice(0, 12)}`,
    generatedAt,
    candidateSha,
    candidatePathsClean: relevantTreeClean(repoRoot, candidatePaths),
    portfolioSnapshotHash: stableHash(publicEntries),
    roleContextHash: sha256(JSON.stringify(roleContexts)),
    readerContextHash: sha256(JSON.stringify(readerContexts)),
    promptHash: sha256(
      JSON.stringify({
        principle: suite.principle,
        rule: "Only declared public evidence needles in declared public route corpora may count as observed."
      })
    ),
    publicSafety: {
      privateMarkerCount: privatePattern.test(corpus) ? 1 : 0,
      protectedWikiReceived: false,
      rawCommunicationsReceived: false
    },
    readers: readerContexts,
    opportunities: evaluated,
    disclaimer:
      "Deterministic public-surface baseline; simulated profiles are not actual participation, endorsement, opinion, or hiring decisions."
  };

  return {
    report,
    outputs: {
      "reports/hiring-acceptance-public.json": `${JSON.stringify(report, null, 2)}\n`,
      "reports/hiring-acceptance-public.md": publicEvaluationMarkdown(report)
    }
  };
}

function gapClassification(requirement) {
  if (requirement.gap_type === "experience") return "true-experience-gap";
  if (requirement.gap_type === "hard-screen") return "hard-screen-gap";
  if (requirement.status === "wiki-proven-not-projected") return "wiki-proven-not-projected";
  if (requirement.status === "visible-weak") return "visible-weak-evidence-gap";
  if (requirement.status === "source-needed") return "source-needs-close-reading";
  if (requirement.status === "corroboration-needed") return "corroboration-needed";
  if (requirement.status === "rights-blocked") return "rights-or-consent-blocked";
  if (requirement.status === "experience-gap") return "true-experience-gap";
  if (requirement.status === "hard-screen") return "hard-screen-gap";
  return "role-context-or-evidence-unknown";
}

export function resolveHiringGaps(result, publicReport) {
  const findings = [];
  for (const opportunityResult of publicReport.opportunities) {
    const opportunity = result.byId.get(opportunityResult.id);
    if (!opportunity) continue;
    for (const coverage of opportunityResult.requirementCoverage.filter((item) => !item.observed)) {
      const requirement = opportunity.role_requirements.find((item) => item.id === coverage.requirementId);
      if (!requirement) continue;
      findings.push({
        findingId: `finding.${requirement.id}`,
        opportunityId: opportunity.id,
        requirementId: requirement.id,
        classification: gapClassification(requirement),
        wikiRecords: requirement.wiki_evidence,
        currentStatus: requirement.status,
        gapType: requirement.gap_type,
        smallestResponsibleChange: requirement.next_action,
        requiresOriginalSourceReview: ["source", "role-context"].includes(requirement.gap_type),
        requiresHumanApproval: true
      });
    }
  }
  const report = {
    schemaVersion: 1,
    candidateSha: publicReport.candidateSha,
    portfolioSnapshotHash: publicReport.portfolioSnapshotHash,
    publicReportHash: sha256(JSON.stringify(publicReport)),
    wikiSourceFingerprint: result.graph.sourceFingerprint,
    findings,
    humanApprovalRequired: true,
    disclaimer: "Gap resolution may query the public-safe Wiki; it cannot promote or publish a claim automatically."
  };
  const lines = [
    "<!-- GENERATED FILE. DO NOT EDIT. -->",
    "# Hiring acceptance Wiki gap resolution",
    "",
    `**Candidate commit:** \`${report.candidateSha}\``,
    `**Public report hash:** \`${report.publicReportHash}\``,
    `**Wiki fingerprint:** \`${report.wikiSourceFingerprint}\``,
    "",
    "The gap resolver runs after the public-only evaluator. It can identify Wiki evidence, but every public change remains human-reviewed.",
    "",
    "## Findings",
    ""
  ];
  for (const finding of findings) {
    lines.push(
      `- \`${finding.requirementId}\` - **${finding.classification}**; ${finding.smallestResponsibleChange}`
    );
  }
  if (!findings.length) lines.push("- None.");
  lines.push("");
  return {
    report,
    outputs: {
      "reports/hiring-acceptance-gap-resolution.json": `${JSON.stringify(report, null, 2)}\n`,
      "reports/hiring-acceptance-gap-resolution.md": lines.join("\n")
    }
  };
}

function opportunityCoverageMarkdown(result) {
  const opportunities = result.records.filter((record) => record.kind === "opportunity");
  const lines = [
    "<!-- GENERATED FILE. DO NOT EDIT. -->",
    "# Opportunity requirement coverage",
    "",
    `**Wiki fingerprint:** \`${result.graph.sourceFingerprint}\``,
    "",
    "Statuses preserve the difference between visible proof, Wiki-only proof, source work, experience gaps, and hard screens.",
    ""
  ];
  for (const opportunity of opportunities) {
    lines.push(`## ${opportunity.title}`, "", "| Requirement | Importance | Status | Gap | Next action |", "|---|---|---|---|---|");
    for (const requirement of opportunity.role_requirements) {
      lines.push(
        `| \`${requirement.id}\` | ${requirement.importance} | ${requirement.status} | ${requirement.gap_type} | ${requirement.next_action.replaceAll("|", "\\|")} |`
      );
    }
    lines.push("");
  }
  return lines.join("\n");
}

function coverageRecord(result) {
  return result.byId.get("evaluation.employment-context.coverage.2026-07-18");
}

function careerCoverageMarkdown(result) {
  const record = coverageRecord(result);
  const lines = [
    "<!-- GENERATED FILE. DO NOT EDIT. -->",
    "# Career trajectory coverage",
    "",
    `**Wiki fingerprint:** \`${result.graph.sourceFingerprint}\``,
    "",
    "| Period | Focus | Status | Gap |",
    "|---|---|---|---|"
  ];
  for (const item of record?.career_coverage ?? []) {
    lines.push(`| ${item.period} | ${item.focus} | ${item.status} | ${item.gap} |`);
  }
  lines.push("", "This matrix is diagnostic. Uneven density is not failure, and public projection remains selective.", "");
  return lines.join("\n");
}

function sourceCoverageMarkdown(result) {
  const record = coverageRecord(result);
  const lines = [
    "<!-- GENERATED FILE. DO NOT EDIT. -->",
    "# Source-channel coverage",
    "",
    `**Wiki fingerprint:** \`${result.graph.sourceFingerprint}\``,
    "",
    "| Channel | Coverage | Access | Normalization | Identity | Public-use boundary | Known gaps |",
    "|---|---|---|---|---|---|---|"
  ];
  for (const item of record?.source_channels ?? []) {
    lines.push(
      `| ${item.channel} | ${item.coverage_date} | ${item.access_state} | ${item.normalization_state} | ${item.identity_resolution_state} | ${item.public_use_boundary} | ${item.known_gaps} |`
    );
  }
  lines.push("", "Access is not completeness, permission, publication approval, or identity certainty.", "");
  return lines.join("\n");
}

function discoveryReport(result, suite) {
  const queries = suite.discoveryQueries.map((query) => {
    const statuses = Array.isArray(query.statuses) && query.statuses.length ? query.statuses : ["live"];
    const opportunities = result.records.filter(
      (record) => record.kind === "opportunity" && statuses.includes(record.opportunity_status)
    );
    const ranking = opportunities
      .map((opportunity) => ({
        id: opportunity.id,
        score: query.terms.filter((term) =>
          opportunity.discovery_terms.some((candidate) => candidate.toLowerCase() === term.toLowerCase())
        ).length
      }))
      .sort((a, b) => b.score - a.score || compareText(a.id, b.id));
    const topK = ranking.slice(0, query.k).map((item) => item.id);
    return {
      id: query.id,
      topK,
      expectedTopK: query.expectedTopK,
      passed: query.expectedTopK.every((id) => topK.includes(id)),
      titleBlind: query.terms.every(
        (term) => !opportunities.some((opportunity) => opportunity.title.toLowerCase() === term.toLowerCase())
      ),
      ranking
    };
  });
  const negatives = suite.negativeControls.map((item) => ({
    id: item.id,
    disposition: item.hardScreens.length ? "exclude-hard-screen" : "review",
    passed: item.hardScreens.length > 0 && item.expectedDisposition === "exclude-hard-screen"
  }));
  return { queries, negatives, passed: queries.every((item) => item.passed && item.titleBlind) && negatives.every((item) => item.passed) };
}

function discoveryMarkdown(result, suite) {
  const report = discoveryReport(result, suite);
  const lines = [
    "<!-- GENERATED FILE. DO NOT EDIT. -->",
    "# Opportunity discovery recall",
    "",
    `**Wiki fingerprint:** \`${result.graph.sourceFingerprint}\``,
    `**Overall:** ${report.passed ? "PASS" : "FAIL"}`,
    "",
    "## Title-blind queries",
    ""
  ];
  for (const query of report.queries) {
    lines.push(
      `- \`${query.id}\`: ${query.passed && query.titleBlind ? "PASS" : "FAIL"}; top results ${query.topK.map((id) => `\`${id}\``).join(", ")}`
    );
  }
  lines.push("", "## Negative controls", "");
  for (const item of report.negatives) {
    lines.push(`- \`${item.id}\`: ${item.passed ? "PASS" : "FAIL"}; \`${item.disposition}\``);
  }
  lines.push("", "Exact titles are not query terms. Hard credential and domain screens remain exclusions even when generic operations language overlaps.", "");
  return lines.join("\n");
}

export function buildEmploymentOutputs(result, publicEvaluation, gapResolution) {
  const suite = loadHiringSuite(result.repoRoot);
  return {
    "reports/wiki-opportunity-coverage.md": opportunityCoverageMarkdown(result),
    "reports/wiki-career-trajectory-coverage.md": careerCoverageMarkdown(result),
    "reports/wiki-source-channel-coverage.md": sourceCoverageMarkdown(result),
    "reports/wiki-opportunity-discovery.md": discoveryMarkdown(result, suite),
    ...publicEvaluation.outputs,
    ...gapResolution.outputs
  };
}

export function writeOrCheckOutputs(repoRoot, outputs, check = false) {
  const issues = [];
  for (const [relativePath, content] of Object.entries(outputs)) {
    const absolute = path.join(repoRoot, relativePath);
    if (check) {
      if (!existsSync(absolute)) issues.push(`${relativePath} is missing`);
      else if (readFileSync(absolute, "utf8") !== content) issues.push(`${relativePath} is stale`);
      continue;
    }
    mkdirSync(path.dirname(absolute), { recursive: true });
    writeFileSync(absolute, content);
  }
  return issues;
}

export function discoveryChecks(result) {
  return discoveryReport(result, loadHiringSuite(result.repoRoot));
}
