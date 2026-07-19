import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { compileWiki, getCanonicalIds, REPO_ROOT } from "../knowledge-wiki/lib.mjs";

export const HIRING_ROOT = path.join(REPO_ROOT, "docs/qa/hiring-acceptance");
export const RUBRIC_PATH = path.join(REPO_ROOT, "docs/qa/hiring-acceptance-M.json");
export const SUITE_PATH = path.join(HIRING_ROOT, "suites/current-priority.json");
export const READERS_PATH = path.join(HIRING_ROOT, "readers.json");
export const ROUTES_PATH = path.join(HIRING_ROOT, "public-route-sources.json");
export const DISCOVERY_PATH = path.join(HIRING_ROOT, "discovery-benchmark.json");

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const OFFICIAL_HOSTS = new Set([
  "asana.com",
  "cityjobs.nyc.gov",
  "job-boards.greenhouse.io",
  "jobs.ashbyhq.com"
]);
const PRIVATE_SOURCE_PATTERN =
  /(?:docs\/knowledge-bank|\/Users\/|\/Volumes\/|Mobile Documents|supporting-materials|file:\/\/|private\/|raw\/|transcripts-private)/i;
const GENERIC_READER_CATEGORIES = new Set(["generic-internal-reader"]);

function json(relativeOrAbsolute) {
  const absolute = path.isAbsolute(relativeOrAbsolute)
    ? relativeOrAbsolute
    : path.join(REPO_ROOT, relativeOrAbsolute);
  return JSON.parse(readFileSync(absolute, "utf8"));
}

function digest(parts) {
  const hash = createHash("sha256");
  for (const part of parts) {
    hash.update(part);
    hash.update("\0");
  }
  return hash.digest("hex");
}

function normalize(value) {
  return String(value ?? "")
    .normalize("NFKD")
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .toLowerCase();
}

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function issue(code, location, message) {
  return { code, location, message };
}

function isOfficialEmployerUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && OFFICIAL_HOSTS.has(url.hostname);
  } catch {
    return false;
  }
}

export function loadHiringContext() {
  const rubric = json(RUBRIC_PATH);
  const suite = json(SUITE_PATH);
  const readers = json(READERS_PATH);
  const routes = json(ROUTES_PATH);
  const discovery = json(DISCOVERY_PATH);
  const wiki = compileWiki();
  const pagesById = new Map(wiki.pages.map((page) => [page.id, page]));
  const opportunities = suite.opportunityIds
    .map((id) => pagesById.get(id))
    .filter(Boolean);

  return {
    rubric,
    suite,
    readers,
    routes,
    discovery,
    wiki,
    pagesById,
    opportunities
  };
}

export function validateOpportunity(page, { rubric, routes, evidenceIds, now = new Date() }) {
  const issues = [];
  const requiredFields = [
    "organization",
    "role_title",
    "tier",
    "canonical_url",
    "source_type",
    "opportunity_status",
    "verified_at",
    "reverify_by",
    "compensation",
    "location",
    "reporting_line",
    "confirmed_facts",
    "inferences",
    "unknowns",
    "hard_screens",
    "portfolio_routes",
    "acceptance_signals",
    "role_requirements",
    "one_year_success_conditions",
    "one_year_risk_conditions",
    "interview_questions"
  ];

  for (const field of requiredFields) {
    if (page[field] === undefined || page[field] === null) {
      issues.push(issue("opportunity.required", page.path, `Missing ${field}`));
    }
  }

  if (!isOfficialEmployerUrl(page.canonical_url)) {
    issues.push(
      issue("opportunity.source", page.path, "canonical_url must be an approved official employer URL")
    );
  }
  if (page.source_type !== "official-employer") {
    issues.push(issue("opportunity.source-type", page.path, "source_type must be official-employer"));
  }
  if (!DATE_PATTERN.test(page.verified_at ?? "") || !DATE_PATTERN.test(page.reverify_by ?? "")) {
    issues.push(issue("opportunity.date", page.path, "verified_at and reverify_by must be YYYY-MM-DD"));
  }
  if (page.opportunity_status === "live" && DATE_PATTERN.test(page.reverify_by ?? "")) {
    const endOfReviewDay = new Date(`${page.reverify_by}T23:59:59Z`);
    if (endOfReviewDay < now) {
      issues.push(issue("opportunity.stale", page.path, `Live role required reverification by ${page.reverify_by}`));
    }
  }

  const compensation = page.compensation ?? {};
  if (
    compensation.currency !== "USD" ||
    !Number.isFinite(compensation.minimum) ||
    !Number.isFinite(compensation.maximum) ||
    compensation.minimum > compensation.maximum
  ) {
    issues.push(issue("opportunity.compensation", page.path, "Invalid compensation range"));
  }
  if (!page.location?.work_model || !page.reporting_line?.certainty) {
    issues.push(issue("opportunity.conditions", page.path, "Location and reporting certainty are required"));
  }

  if (asArray(page.hard_screens).length === 0) {
    issues.push(issue("opportunity.hard-screen", page.path, "At least one hard-screen review is required"));
  }
  for (const screen of asArray(page.hard_screens)) {
    if (!screen?.id || !screen?.kind || !screen?.text || !screen?.candidate_state) {
      issues.push(issue("opportunity.hard-screen-shape", page.path, "Hard screens require id, kind, text, and candidate_state"));
    }
  }

  const requirementIds = new Set();
  for (const requirement of asArray(page.role_requirements)) {
    if (!requirement?.id || requirementIds.has(requirement.id)) {
      issues.push(issue("opportunity.requirement-id", page.path, `Invalid or duplicate requirement ID: ${requirement?.id}`));
    }
    requirementIds.add(requirement?.id);
    for (const field of ["importance", "text", "source_status", "status", "gap_type", "next_action"]) {
      if (!requirement?.[field]) {
        issues.push(issue("opportunity.requirement-shape", page.path, `${requirement?.id ?? "Requirement"} missing ${field}`));
      }
    }
    for (const field of ["signal_terms", "wiki_evidence", "public_evidence"]) {
      if (asArray(requirement?.[field]).length === 0) {
        issues.push(issue("opportunity.requirement-shape", page.path, `${requirement?.id ?? "Requirement"} needs ${field}`));
      }
    }
    for (const evidenceId of asArray(requirement?.wiki_evidence)) {
      if (evidenceIds && !evidenceIds.has(evidenceId)) {
        issues.push(issue("opportunity.evidence", page.path, `${requirement.id} cites unknown Wiki evidence: ${evidenceId}`));
      }
    }
    for (const route of asArray(requirement?.public_evidence)) {
      if (!routes.routes?.[route] || !asArray(page.portfolio_routes).includes(route)) {
        issues.push(issue("opportunity.public-evidence", page.path, `${requirement.id} cites an unmapped or unselected public route: ${route}`));
      }
    }
    if (!rubric.coverageStatuses.includes(requirement?.status)) {
      issues.push(issue("opportunity.coverage-status", page.path, `Unknown coverage status: ${requirement?.status}`));
    }
  }
  if (!asArray(page.role_requirements).some((item) => item.importance === "critical")) {
    issues.push(issue("opportunity.critical-requirement", page.path, "At least one critical role requirement is required"));
  }

  for (const route of asArray(page.portfolio_routes)) {
    if (!routes.routes?.[route]) {
      issues.push(issue("opportunity.route", page.path, `Unmapped public portfolio route: ${route}`));
    }
  }
  for (const field of [
    "confirmed_facts",
    "inferences",
    "unknowns",
    "acceptance_signals",
    "one_year_success_conditions",
    "one_year_risk_conditions",
    "interview_questions"
  ]) {
    if (!Array.isArray(page[field])) {
      issues.push(issue("opportunity.array", page.path, `${field} must be an array`));
    }
  }

  return issues;
}

export function validateReaderProfiles(readers) {
  const issues = [];
  const ids = new Set();
  for (const profile of readers.profiles ?? []) {
    if (!profile.id || ids.has(profile.id)) {
      issues.push(issue("reader.id", READERS_PATH, `Invalid or duplicate reader ID: ${profile.id}`));
    }
    ids.add(profile.id);
    if (!profile.category || !profile.name || !profile.lens || !profile.disclaimer) {
      issues.push(issue("reader.shape", READERS_PATH, `${profile.id} is incomplete`));
    }
    const named = !GENERIC_READER_CATEGORIES.has(profile.category);
    if (named) {
      if (asArray(profile.sources).length === 0 || !DATE_PATTERN.test(profile.sourceLastVerified ?? "")) {
        issues.push(issue("reader.source", READERS_PATH, `${profile.id} needs public sources and a verification date`));
      }
      if (!/not .*actual opinion|not .*actual view/i.test(profile.disclaimer ?? "")) {
        issues.push(issue("reader.disclaimer", READERS_PATH, `${profile.id} must disclaim an actual opinion or view`));
      }
      if (!/endorsement/i.test(profile.disclaimer ?? "")) {
        issues.push(issue("reader.disclaimer", READERS_PATH, `${profile.id} must disclaim endorsement`));
      }
    }
  }
  return issues;
}

export function validateSuite(context) {
  const { rubric, suite, readers, routes, discovery, pagesById } = context;
  const issues = [];
  const readerIds = new Set((readers.profiles ?? []).map((item) => item.id));
  const development = new Set(suite.developmentReaderIds ?? []);
  const holdout = new Set(suite.holdoutReaderIds ?? []);

  for (const id of suite.opportunityIds ?? []) {
    if (!pagesById.has(id)) issues.push(issue("suite.opportunity", SUITE_PATH, `Missing opportunity: ${id}`));
  }
  if (!suite.opportunityIds?.includes(suite.targetOpportunityId)) {
    issues.push(issue("suite.target", SUITE_PATH, "Target opportunity must be in the suite"));
  }
  for (const id of [...development, ...holdout]) {
    if (!readerIds.has(id)) issues.push(issue("suite.reader", SUITE_PATH, `Unknown reader: ${id}`));
  }
  for (const id of development) {
    if (holdout.has(id)) issues.push(issue("suite.holdout", SUITE_PATH, `Reader appears in development and holdout: ${id}`));
  }
  if (!Number.isFinite(suite.minimumCriticalSignalRecall) || suite.minimumCriticalSignalRecall <= 0) {
    issues.push(issue("suite.threshold", SUITE_PATH, "minimumCriticalSignalRecall must be positive"));
  }
  for (const required of rubric.requiredFiles ?? []) {
    if (!existsSync(path.join(REPO_ROOT, required))) {
      issues.push(issue("suite.required-file", required, "Required file is missing"));
    }
  }
  if (!routes.routes || !Array.isArray(discovery.titleBlindCases) || !Array.isArray(discovery.negativeControls)) {
    issues.push(issue("suite.config", HIRING_ROOT, "Route and discovery configuration is incomplete"));
  }
  return issues;
}

export function buildPublicCandidate(routeConfig, selectedRoutes) {
  const issues = [];
  const chunks = [];
  const files = new Set();

  for (const route of selectedRoutes) {
    const mapped = routeConfig.routes?.[route];
    if (!Array.isArray(mapped)) {
      issues.push(issue("public.route", ROUTES_PATH, `No source map for ${route}`));
      continue;
    }
    for (const relativePath of mapped) {
      if (PRIVATE_SOURCE_PATTERN.test(relativePath)) {
        issues.push(issue("public.private-leak", relativePath, "Public evaluator mapping reaches a Wiki or private source"));
        continue;
      }
      if (!relativePath.startsWith("apps/www/")) {
        issues.push(issue("public.boundary", relativePath, "Public evaluator source must stay inside apps/www"));
        continue;
      }
      const absolute = path.join(REPO_ROOT, relativePath);
      if (!existsSync(absolute)) {
        issues.push(issue("public.file", relativePath, "Mapped public file does not exist"));
        continue;
      }
      files.add(relativePath);
    }
  }

  const hashParts = [];
  for (const relativePath of [...files].sort()) {
    const absolute = path.join(REPO_ROOT, relativePath);
    const buffer = readFileSync(absolute);
    hashParts.push(relativePath, buffer);
    if (/\.(?:tsx?|jsx?|mdx?|txt|json|css)$/i.test(relativePath)) {
      chunks.push(buffer.toString("utf8"));
    } else if (/\.pdf$/i.test(relativePath)) {
      try {
        chunks.push(execFileSync("pdftotext", [absolute, "-"], { encoding: "utf8" }));
      } catch {
        issues.push(issue("public.pdf-text", relativePath, "Public resume text could not be extracted"));
      }
    } else {
      chunks.push(`[public artifact present: ${path.basename(relativePath)}]`);
    }
  }

  return {
    issues,
    routes: [...selectedRoutes],
    files: [...files].sort(),
    text: chunks.join("\n"),
    candidateHash: digest(hashParts)
  };
}

export function assessPublicCandidate(opportunity, candidate, threshold = 0.75) {
  const normalizedText = normalize(candidate.text);
  const critical = asArray(opportunity.role_requirements).filter(
    (item) => item.importance === "critical"
  );
  const findings = critical.map((requirement) => {
    const matchedTerms = asArray(requirement.signal_terms).filter((term) =>
      normalizedText.includes(normalize(term))
    );
    return {
      requirementId: requirement.id,
      visible: matchedTerms.length > 0,
      matchedTerms
    };
  });
  const visibleCount = findings.filter((item) => item.visible).length;
  const criticalSignalRecall = critical.length ? visibleCount / critical.length : 0;
  const actorVisible = /\b(?:jamie|i|my)\b/i.test(candidate.text);
  const resumeVisible = !opportunity.portfolio_routes.includes("/resume") || candidate.routes.includes("/resume");
  const contactVisible = !opportunity.portfolio_routes.includes("/contact") || candidate.routes.includes("/contact");

  return {
    opportunityId: opportunity.id,
    candidateHash: candidate.candidateHash,
    criticalSignalRecall,
    threshold,
    actorVisible,
    resumeVisible,
    contactVisible,
    hardScreenReviewRequired: asArray(opportunity.hard_screens).map((screen) => ({
      id: screen.id,
      candidateState: screen.candidate_state
    })),
    findings,
    criterionMet:
      candidate.issues.length === 0 &&
      criticalSignalRecall >= threshold &&
      actorVisible &&
      resumeVisible &&
      contactVisible,
    authorityBoundary:
      "Deterministic public-signal proxy only; not a recruiter response, interview prediction, named person's opinion, or hiring decision."
  };
}

export function resolveWikiGaps(opportunity, assessment) {
  const requirementById = new Map(
    asArray(opportunity.role_requirements).map((item) => [item.id, item])
  );
  return assessment.findings
    .filter((finding) => !finding.visible)
    .map((finding) => {
      const requirement = requirementById.get(finding.requirementId);
      const classification = {
        "wiki-proven-not-projected": "projection-gap",
        "visible-weak": "evidence-quality-gap",
        "source-needed": "source-gap",
        "corroboration-needed": "corroboration-gap",
        "rights-blocked": "rights-gap",
        "experience-gap": "experience-gap",
        "hard-screen": "hard-screen",
        unknown: "unknown-gap"
      }[requirement?.status] ?? requirement?.gap_type ?? "projection-gap";
      return {
        requirementId: finding.requirementId,
        classification,
        wikiStatus: requirement?.status ?? "unknown",
        sourceStatus: requirement?.source_status ?? "unknown",
        nextAction: requirement?.next_action ?? "Review the governed opportunity record."
      };
    });
}

function queryTerms(value) {
  const stop = new Set(["and", "the", "for", "with", "from", "into", "one", "role"]);
  return new Set(normalize(value).split(" ").filter((term) => term.length > 2 && !stop.has(term)));
}

export function rankOpportunities(opportunities, query) {
  const querySet = queryTerms(query);
  return opportunities
    .map((opportunity) => {
      const corpus = [
        ...asArray(opportunity.acceptance_signals),
        ...asArray(opportunity.role_requirements).map((item) => item.text),
        ...asArray(opportunity.role_requirements).flatMap((item) => asArray(item.signal_terms))
      ].join(" ");
      const corpusSet = queryTerms(corpus);
      const matchedTerms = [...querySet].filter((term) => corpusSet.has(term));
      return {
        opportunityId: opportunity.id,
        score: matchedTerms.length,
        matchedTerms
      };
    })
    .sort((left, right) => right.score - left.score || left.opportunityId.localeCompare(right.opportunityId));
}

export function evaluateDiscovery(context) {
  const topK = context.discovery.topK;
  const titleBlind = context.discovery.titleBlindCases.map((item) => {
    const ranked = rankOpportunities(context.opportunities, item.query);
    const topIds = ranked.slice(0, topK).map((result) => result.opportunityId);
    return {
      id: item.id,
      pass: item.expectedOpportunityIds.every((id) => topIds.includes(id)),
      topIds
    };
  });
  const negativeControls = context.discovery.negativeControls.map((item) => {
    const ranked = rankOpportunities(context.opportunities, item.query);
    const queryTermCount = queryTerms(item.query).size;
    const topScore = ranked[0]?.score ?? 0;
    const overlapRatio = queryTermCount ? topScore / queryTermCount : 0;
    return {
      id: item.id,
      pass: overlapRatio < 0.4,
      topScore,
      overlapRatio
    };
  });
  return { titleBlind, negativeControls };
}

export function detectUnsafeHiringMutation(text) {
  const findings = [];
  if (/\b(?:solely|single-handedly|singlehandedly)\b/i.test(text)) findings.push("sole-authorship-inflation");
  if (/\b(?:999%|10x|100x)\b/i.test(text)) findings.push("metric-requires-source-review");
  if (PRIVATE_SOURCE_PATTERN.test(text)) findings.push("private-source-leak");
  return findings;
}

export function compareIdentityStatements(resumeStatement, portfolioStatement) {
  return normalize(resumeStatement) === normalize(portfolioStatement)
    ? []
    : [{ code: "candidate.identity-contradiction", resumeStatement, portfolioStatement }];
}

export function hiringContractHash(context) {
  return digest([
    readFileSync(RUBRIC_PATH),
    readFileSync(SUITE_PATH),
    readFileSync(READERS_PATH),
    readFileSync(ROUTES_PATH),
    readFileSync(DISCOVERY_PATH)
  ]);
}

export function runHiringAcceptance({ now = new Date() } = {}) {
  const context = loadHiringContext();
  const issues = [
    ...validateSuite(context),
    ...validateReaderProfiles(context.readers)
  ];
  const evidenceIds = new Set([...getCanonicalIds(), ...context.pagesById.keys()]);
  for (const opportunity of context.opportunities) {
    issues.push(
      ...validateOpportunity(opportunity, {
        rubric: context.rubric,
        routes: context.routes,
        evidenceIds,
        now
      })
    );
  }

  const target = context.pagesById.get(context.suite.targetOpportunityId);
  const candidate = target
    ? buildPublicCandidate(context.routes, target.portfolio_routes)
    : { issues: [issue("target.missing", SUITE_PATH, "Target opportunity is missing")], routes: [], files: [], text: "", candidateHash: "missing" };
  issues.push(...candidate.issues);
  const assessment = target
    ? assessPublicCandidate(target, candidate, context.suite.minimumCriticalSignalRecall)
    : null;
  const gaps = target && assessment ? resolveWikiGaps(target, assessment) : [];
  const discovery = evaluateDiscovery(context);
  for (const result of [...discovery.titleBlind, ...discovery.negativeControls]) {
    if (!result.pass) issues.push(issue("discovery.benchmark", DISCOVERY_PATH, `Discovery benchmark failed: ${result.id}`));
  }
  if (assessment && !assessment.criterionMet) {
    issues.push(issue("acceptance.target", target.path, "Target public-signal criterion is not met"));
  }

  return {
    context,
    issues,
    target,
    candidate,
    assessment,
    gaps,
    discovery,
    contractHash: hiringContractHash(context)
  };
}

export function writeHiringReports(result) {
  const outputRoot = path.join(REPO_ROOT, "reports/hiring");
  const coverageRoot = path.join(REPO_ROOT, "reports/wiki-role-coverage");
  mkdirSync(outputRoot, { recursive: true });
  mkdirSync(coverageRoot, { recursive: true });

  const summary = {
    generatedFile: true,
    generatedAt: new Date().toISOString(),
    contractHash: result.contractHash,
    candidateHash: result.candidate.candidateHash,
    targetOpportunityId: result.target?.id ?? null,
    assessment: result.assessment,
    wikiGapResolution: result.gaps,
    discovery: result.discovery,
    developmentReaderIds: result.context.suite.developmentReaderIds,
    holdoutReaderIds: result.context.suite.holdoutReaderIds,
    humanReaderState: result.context.suite.humanReaderState,
    externalOutcomeState: result.context.suite.externalOutcomeState,
    issues: result.issues
  };
  writeFileSync(path.join(outputRoot, "current-priority.json"), `${JSON.stringify(summary, null, 2)}\n`);

  const lines = [
    "# Current hiring acceptance report",
    "",
    `- Contract hash: \`${result.contractHash}\``,
    `- Public candidate hash: \`${result.candidate.candidateHash}\``,
    `- Target: \`${result.target?.id ?? "missing"}\``,
    `- Deterministic public-signal criterion: ${result.assessment?.criterionMet ? "met" : "not met"}`,
    `- Critical signal recall: ${Math.round((result.assessment?.criticalSignalRecall ?? 0) * 100)}%`,
    `- Human reader state: ${result.context.suite.humanReaderState}`,
    `- External outcome state: ${result.context.suite.externalOutcomeState}`,
    "",
    "This is a deterministic diagnostic, not a hiring prediction or a named person's opinion.",
    ""
  ];
  writeFileSync(path.join(outputRoot, "current-priority.md"), `${lines.join("\n")}\n`);

  for (const opportunity of result.context.opportunities) {
    const rows = asArray(opportunity.role_requirements).map((requirement) =>
      `| ${requirement.id} | ${requirement.source_status} | ${requirement.status} | ${requirement.gap_type} | ${requirement.next_action} |`
    );
    const content = [
      `# ${opportunity.title} role coverage`,
      "",
      `Verified: ${opportunity.verified_at}; reverify by: ${opportunity.reverify_by}.`,
      "",
      "| Requirement | Source | Public status | Gap | Next action |",
      "| --- | --- | --- | --- | --- |",
      ...rows,
      ""
    ].join("\n");
    writeFileSync(path.join(coverageRoot, `${opportunity.id}.md`), content);
  }

  return { outputRoot, coverageRoot };
}

export function moduleDirectory() {
  return path.dirname(fileURLToPath(import.meta.url));
}
