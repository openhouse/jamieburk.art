import { createHash } from "node:crypto";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync
} from "node:fs";
import { execFileSync } from "node:child_process";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { proofClaims } from "../../apps/www/src/data/proofs.ts";
import {
  ARTIFACT_ROOT as WIKI_ARTIFACT_ROOT,
  REPO_ROOT,
  loadWiki
} from "../knowledge-wiki/lib.mjs";

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
export const QA_ROOT = resolve(REPO_ROOT, "docs/qa/hiring-acceptance");
export const READER_ROOT = resolve(QA_ROOT, "readers");
export const SUITE_PATH = resolve(QA_ROOT, "current-priority.json");
export const DISCOVERY_PATH = resolve(QA_ROOT, "discovery-benchmark.json");
export const SOURCE_CHANNEL_PATH = resolve(QA_ROOT, "source-channel-coverage.json");
export const CAREER_PATH = resolve(QA_ROOT, "career-trajectory.json");
export const EVAL_CONTRACT_PATH = resolve(
  REPO_ROOT,
  ".agents/evals/knowledge-wiki-employment.json"
);
export const HIRING_ARTIFACT_ROOT = resolve(WIKI_ARTIFACT_ROOT, "hiring-acceptance");

const COVERAGE_STATUSES = new Set([
  "visible-proven",
  "visible-qualified",
  "visible-weak",
  "wiki-proven-not-projected",
  "source-needed",
  "corroboration-needed",
  "rights-blocked",
  "experience-gap",
  "hard-screen",
  "unknown",
  "not-applicable"
]);

const READER_CATEGORIES = new Set([
  "confirmed-organization-context-reader",
  "generic-internal-reader",
  "external-domain-expert",
  "field-or-referrer-reader",
  "trusted-editor-institutional-translator",
  "career-and-mutual-fit-advisory-lens",
  "product-engineering-sponsor-lens"
]);

const PRIVATE_PATTERNS = [
  [/\/Users\//i, "absolute user path"],
  [/\/Volumes\//i, "absolute volume path"],
  [/Mobile Documents/i, "CloudDocs locator"],
  [/supporting-materials/i, "private supporting-materials locator"],
  [/(?:^|\s)file:\/\//i, "file URL"],
  [/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/i, "private key"]
];

const SOLE_AUTHORSHIP_PATTERN =
  /\b(?:single-handedly|solely (?:built|created|led|caused|owned)|alone (?:built|created|led|caused))\b/i;

const FORBIDDEN_KEYS = new Set([
  "application_status",
  "warm_path",
  "referral",
  "mutual_connection",
  "private_contact",
  "interview_notes",
  "relationship_history",
  "raw_communications"
]);

const REQUIRED_OPPORTUNITY_FIELDS = [
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
  "hard_requirements",
  "preferred_requirements",
  "discovery_signals",
  "role_requirements",
  "organizational_context",
  "confirmed_facts",
  "inferences",
  "unknowns",
  "portfolio_routes",
  "one_year_success_conditions",
  "one_year_risk_conditions",
  "interview_questions"
];

export function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

export function stableJson(value) {
  if (Array.isArray(value)) return `[${value.map(stableJson).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.keys(value)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${stableJson(value[key])}`)
      .join(",")}}`;
  }
  return JSON.stringify(value);
}

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function git(args, fallback = "unknown") {
  try {
    return execFileSync("git", args, {
      cwd: REPO_ROOT,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"]
    }).trim();
  } catch {
    return fallback;
  }
}

function listMarkdown(root) {
  if (!existsSync(root)) return [];
  return readdirSync(root)
    .filter((name) => name.endsWith(".md"))
    .sort()
    .map((name) => {
      const path = resolve(root, name);
      const raw = readFileSync(path, "utf8");
      const parsed = matter(raw);
      return {
        path,
        repoPath: relative(REPO_ROOT, path),
        raw,
        data: parsed.data,
        content: parsed.content
      };
    });
}

export function loadHiringContext() {
  const wikiRecords = loadWiki();
  return {
    wikiRecords,
    opportunities: wikiRecords.filter(
      (record) => record.data.kind === "opportunity" && record.data.tier === 1
    ),
    readers: listMarkdown(READER_ROOT),
    suite: readJson(SUITE_PATH),
    discovery: readJson(DISCOVERY_PATH),
    sourceChannels: readJson(SOURCE_CHANNEL_PATH),
    career: readJson(CAREER_PATH),
    contract: readJson(EVAL_CONTRACT_PATH)
  };
}

function findForbiddenKey(value, trail = []) {
  if (Array.isArray(value)) {
    for (let index = 0; index < value.length; index += 1) {
      const found = findForbiddenKey(value[index], [...trail, index]);
      if (found) return found;
    }
    return null;
  }
  if (!value || typeof value !== "object") return null;
  for (const [key, child] of Object.entries(value)) {
    if (FORBIDDEN_KEYS.has(key)) return [...trail, key].join(".");
    const found = findForbiddenKey(child, [...trail, key]);
    if (found) return found;
  }
  return null;
}

function validatePublicSafeRaw(raw, path, errors) {
  for (const [pattern, label] of PRIVATE_PATTERNS) {
    if (pattern.test(raw)) errors.push({ code: "private-marker", path, message: `Contains ${label}.` });
  }
}

export function validateHiringContext(context = loadHiringContext(), { asOf = "2026-07-18" } = {}) {
  const errors = [];
  const warnings = [];
  const add = (code, path, message) => errors.push({ code, path, message });
  const proofIds = new Set(proofClaims.map((proof) => proof.id));
  const wikiIds = new Set(context.wikiRecords.map((record) => record.data.id));
  const readerById = new Map(context.readers.map((reader) => [reader.data.id, reader]));
  const opportunityById = new Map(
    context.opportunities.map((record) => [record.data.id, record])
  );
  const requirementOwners = new Map();

  if (context.opportunities.length !== 6) {
    add("tier-one-count", "docs/knowledge-wiki/opportunities", "Expected exactly six Tier 1 opportunities.");
  }

  for (const record of context.opportunities) {
    const data = record.data;
    validatePublicSafeRaw(record.raw, record.repoPath, errors);
    if (SOLE_AUTHORSHIP_PATTERN.test(record.raw)) {
      add("sole-authorship-drift", record.repoPath, "Opportunity context inflates collective work into sole authorship.");
    }
    const forbidden = findForbiddenKey(data);
    if (forbidden) add("private-job-search-field", record.repoPath, `Forbidden private field ${forbidden}.`);
    for (const field of REQUIRED_OPPORTUNITY_FIELDS) {
      if (data[field] == null) add("missing-opportunity-field", record.repoPath, `Missing ${field}.`);
    }
    if (data.source_type !== "official-employer") {
      add("noncanonical-opportunity-source", record.repoPath, "Tier 1 source must be official-employer.");
    }
    if (!/^https:\/\//.test(data.canonical_url ?? "")) {
      add("invalid-opportunity-url", record.repoPath, "canonical_url must be HTTPS.");
    }
    if (data.opportunity_status !== "live") {
      add("inactive-tier-one-role", record.repoPath, "Tier 1 role is not marked live.");
    }
    for (const field of ["verified_at", "reverify_by"]) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(data[field] ?? "")) {
        add("invalid-opportunity-date", record.repoPath, `${field} must use YYYY-MM-DD.`);
      }
    }
    if (data.reverify_by < asOf) {
      add("stale-opportunity", record.repoPath, `Reverification was due ${data.reverify_by}.`);
    }
    if (!Array.isArray(data.role_requirements) || data.role_requirements.length < 7) {
      add("thin-requirement-map", record.repoPath, "Tier 1 roles require at least seven decomposed requirements.");
    }
    const localRequirementIds = new Set();
    for (const requirement of data.role_requirements ?? []) {
      const requirementId = requirement?.id;
      if (!/^requirement\.[a-z0-9]+(?:[.-][a-z0-9]+)*$/.test(requirementId ?? "")) {
        add("invalid-requirement-id", record.repoPath, `Invalid requirement ID ${requirementId ?? "(missing)"}.`);
        continue;
      }
      if (localRequirementIds.has(requirementId) || requirementOwners.has(requirementId)) {
        add("duplicate-requirement-id", record.repoPath, `Duplicate requirement ID ${requirementId}.`);
      }
      localRequirementIds.add(requirementId);
      requirementOwners.set(requirementId, data.id);
      if (!COVERAGE_STATUSES.has(requirement.coverage_status)) {
        add("invalid-coverage-status", record.repoPath, `Invalid status for ${requirementId}.`);
      }
      if (!requirement.text || !requirement.importance || !requirement.kind || !requirement.gap_type || !requirement.next_action) {
        add("incomplete-requirement", record.repoPath, `${requirementId} lacks its decision contract.`);
      }
      for (const proofId of requirement.proof_refs ?? []) {
        if (!proofIds.has(proofId)) add("unknown-proof-ref", record.repoPath, `${requirementId} references ${proofId}.`);
      }
      for (const wikiId of requirement.wiki_records ?? []) {
        if (!wikiIds.has(wikiId)) add("unknown-wiki-ref", record.repoPath, `${requirementId} references ${wikiId}.`);
      }
      for (const route of requirement.public_routes ?? []) {
        if (!(data.portfolio_routes ?? []).includes(route)) {
          add("route-outside-opportunity", record.repoPath, `${requirementId} uses unlisted route ${route}.`);
        }
      }
      if (
        requirement.coverage_status === "visible-proven" &&
        (!(requirement.proof_refs?.length) || !(requirement.public_routes?.length))
      ) {
        add("unproven-visible-status", record.repoPath, `${requirementId} is visible-proven without proof and route evidence.`);
      }
    }
    for (const requirementId of data.hard_requirements ?? []) {
      const requirement = (data.role_requirements ?? []).find((item) => item.id === requirementId);
      if (!requirement) add("unknown-hard-requirement", record.repoPath, `Unknown hard requirement ${requirementId}.`);
      else if (requirement.kind !== "hard-screen") {
        add("hidden-hard-screen", record.repoPath, `${requirementId} must be typed hard-screen.`);
      }
    }
    for (const field of [
      "organizational_context",
      "confirmed_facts",
      "inferences",
      "unknowns",
      "portfolio_routes",
      "one_year_success_conditions",
      "one_year_risk_conditions",
      "interview_questions"
    ]) {
      if (!Array.isArray(data[field])) add("invalid-opportunity-list", record.repoPath, `${field} must be an array.`);
    }
    for (const person of data.named_personnel ?? []) {
      const reader = readerById.get(person.person_id);
      if (!reader) add("unknown-named-personnel", record.repoPath, `Unknown profile ${person.person_id}.`);
      if (reader && !reader.data.category.includes("organization-context")) {
        add("misclassified-named-personnel", record.repoPath, `${person.person_id} is not organization context.`);
      }
    }
  }

  for (const reader of context.readers) {
    const data = reader.data;
    validatePublicSafeRaw(reader.raw, reader.repoPath, errors);
    if (!/^reader\.[a-z0-9]+(?:[.-][a-z0-9]+)*$/.test(data.id ?? "")) {
      add("invalid-reader-id", reader.repoPath, "Reader requires a stable reader.* ID.");
    }
    if (!READER_CATEGORIES.has(data.category)) add("invalid-reader-category", reader.repoPath, `Unknown category ${data.category}.`);
    for (const field of ["relevance", "priorities", "likely_questions", "prohibited_assumptions", "public_sources"]) {
      if (!Array.isArray(data[field])) add("invalid-reader-list", reader.repoPath, `${field} must be an array.`);
    }
    const named = !data.id?.startsWith("reader.generic-");
    if (named && !(data.public_sources?.length)) add("unsourced-named-reader", reader.repoPath, "Named profiles require public sources.");
    if (named && !data.disclaimer?.includes("not") && !data.disclaimer?.includes("Not")) {
      add("missing-reader-disclaimer", reader.repoPath, "Named profile disclaimer must reject actual participation.");
    }
    if (!data.disclaimer?.toLowerCase().includes("actual")) {
      add("weak-reader-disclaimer", reader.repoPath, "Disclaimer must use the word actual.");
    }
  }

  const suiteOpportunityIds = new Set(context.suite.opportunityIds ?? []);
  const canonicalOpportunityIds = new Set(context.opportunities.map((record) => record.data.id));
  if (stableJson([...suiteOpportunityIds].sort()) !== stableJson([...canonicalOpportunityIds].sort())) {
    add("suite-opportunity-drift", relative(REPO_ROOT, SUITE_PATH), "Suite and canonical Tier 1 role IDs differ.");
  }
  for (const readerId of context.suite.readerIds ?? []) {
    if (!readerById.has(readerId)) add("unknown-suite-reader", relative(REPO_ROOT, SUITE_PATH), `Unknown ${readerId}.`);
  }
  const development = new Set(context.suite.panels?.development ?? []);
  const holdout = new Set(context.suite.panels?.holdout ?? []);
  for (const id of holdout) {
    if (development.has(id)) add("panel-leak", relative(REPO_ROOT, SUITE_PATH), `${id} appears in development and holdout.`);
  }

  for (const phase of context.career.phases ?? []) {
    for (const proofId of phase.proofRefs ?? []) {
      if (!proofIds.has(proofId)) add("unknown-career-proof", relative(REPO_ROOT, CAREER_PATH), `${phase.id} references ${proofId}.`);
    }
  }
  if ((context.sourceChannels.channels ?? []).length < 8) {
    add("thin-source-channel-report", relative(REPO_ROOT, SOURCE_CHANNEL_PATH), "Expected at least eight bounded source channels.");
  }
  if (!context.sourceChannels.rule?.includes("publication permission")) {
    add("source-access-promotion", relative(REPO_ROOT, SOURCE_CHANNEL_PATH), "Source report must separate access from publication.");
  }

  const discovery = runTitleBlindDiscovery(context);
  if (!discovery.passed) add("discovery-regression", relative(REPO_ROOT, DISCOVERY_PATH), discovery.reason);

  return {
    errors: errors.sort((a, b) => `${a.path}:${a.code}`.localeCompare(`${b.path}:${b.code}`)),
    warnings,
    metrics: {
      opportunities: context.opportunities.length,
      readers: context.readers.length,
      requirements: requirementOwners.size,
      sourceChannels: context.sourceChannels.channels?.length ?? 0,
      careerPhases: context.career.phases?.length ?? 0,
      titleBlindTopKRecall: discovery.recall,
      negativeControlsRejected: discovery.negativeControlsRejected
    },
    discovery
  };
}

function overlapScore(candidateSignals, profileSignals) {
  const profile = new Set(profileSignals);
  return [...new Set(candidateSignals)].filter((signal) => profile.has(signal)).length;
}

export function runTitleBlindDiscovery(context = loadHiringContext()) {
  const profileSignals = context.discovery.profileSignals ?? [];
  const opportunities = context.opportunities.map((record) => ({
    id: record.data.id,
    score: overlapScore(record.data.discovery_signals ?? [], profileSignals),
    hardScreens: []
  }));
  const negativeControls = (context.discovery.negativeControls ?? []).map((candidate) => ({
    id: candidate.id,
    score: overlapScore(candidate.signals ?? [], profileSignals),
    hardScreens: candidate.hardScreens ?? []
  }));
  const ranked = [...opportunities, ...negativeControls].sort(
    (a, b) => b.score - a.score || a.id.localeCompare(b.id)
  );
  const topK = ranked.slice(0, context.discovery.topK ?? 6).map((candidate) => candidate.id);
  const knownGood = context.discovery.knownGoodOpportunityIds ?? [];
  const recalled = knownGood.filter((id) => topK.includes(id));
  const rejected = negativeControls.filter(
    (candidate) => candidate.hardScreens.length > 0 && !topK.includes(candidate.id)
  );
  const recall = knownGood.length ? recalled.length / knownGood.length : 0;
  const passed = recall === 1 && rejected.length === negativeControls.length;
  return {
    passed,
    reason: passed
      ? "Known-good roles lead title-blind retrieval and every negative control is rejected."
      : `Recall ${recalled.length}/${knownGood.length}; rejected ${rejected.length}/${negativeControls.length} negative controls.`,
    recall,
    topK,
    ranked,
    negativeControlsRejected: rejected.length
  };
}

export function publicOpportunityContext(record) {
  const data = record.data;
  return {
    id: data.id,
    organization: data.organization,
    roleTitle: data.role_title,
    canonicalUrl: data.canonical_url,
    verifiedAt: data.verified_at,
    deadline: data.deadline,
    compensation: data.compensation,
    location: data.location,
    reportingLine: data.reporting_line,
    requirements: (data.role_requirements ?? []).map((requirement) => ({
      id: requirement.id,
      importance: requirement.importance,
      kind: requirement.kind,
      text: requirement.text
    })),
    organizationalContext: data.organizational_context,
    confirmedFacts: data.confirmed_facts,
    inferences: data.inferences,
    unknowns: data.unknowns,
    portfolioRoutes: data.portfolio_routes,
    oneYearSuccessConditions: data.one_year_success_conditions,
    oneYearRiskConditions: data.one_year_risk_conditions,
    interviewQuestions: data.interview_questions
  };
}

export function publicReaderContext(reader) {
  return {
    id: reader.data.id,
    displayName: reader.data.display_name,
    category: reader.data.category,
    mode: reader.data.mode,
    publicSources: reader.data.public_sources,
    relevance: reader.data.relevance,
    priorities: reader.data.priorities,
    likelyQuestions: reader.data.likely_questions,
    prohibitedAssumptions: reader.data.prohibited_assumptions,
    disclaimer: reader.data.disclaimer
  };
}

function stripHtml(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

export async function capturePublicSnapshot(baseUrl, routes) {
  const pages = [];
  for (const route of [...new Set(routes)].sort()) {
    const response = await fetch(new URL(route, baseUrl), { redirect: "follow" });
    if (!response.ok) throw new Error(`${route} returned ${response.status}`);
    const html = await response.text();
    pages.push({ route, status: response.status, text: stripHtml(html), htmlHash: sha256(html) });
  }
  const semantic = pages.map(({ route, status, text, htmlHash }) => ({ route, status, text, htmlHash }));
  return {
    baseUrl,
    pages,
    snapshotHash: sha256(stableJson(semantic))
  };
}

export function candidateBinding() {
  const candidateSha = git(["rev-parse", "HEAD"]);
  const status = git(["status", "--porcelain"], "");
  return {
    candidateSha,
    worktreeClean: status === "",
    worktreeStateHash: sha256(status)
  };
}

export function buildEvaluatorPacket({
  opportunity,
  reader,
  snapshot,
  binding = candidateBinding(),
  suite,
  contract,
  panel = "development",
  evaluatorIdentity = "unassigned-independent-evaluator",
  optimizerIdentity = "codex-optimizer",
  timestamp = new Date().toISOString()
}) {
  if (evaluatorIdentity === optimizerIdentity) {
    throw new Error("Optimizer and evaluator identities must differ.");
  }
  const snapshotRaw = stableJson(snapshot);
  for (const [pattern, label] of PRIVATE_PATTERNS) {
    if (pattern.test(snapshotRaw)) throw new Error(`Public snapshot contains ${label}.`);
  }
  const roleContext = publicOpportunityContext(opportunity);
  const readerContext = publicReaderContext(reader);
  const selectedRoutes = new Set(roleContext.portfolioRoutes);
  const publicPages = (snapshot.pages ?? []).filter((page) => selectedRoutes.has(page.route));
  const portfolioSnapshot = {
    baseUrl: snapshot.baseUrl,
    snapshotHash: snapshot.snapshotHash,
    pages: publicPages
  };
  const prompt =
    "Simulate the supplied review lens using only the provided public context. " +
    "Do not claim to be the real named person. Do not infer private beliefs. " +
    "Evaluate the exact public portfolio in the supplied situation and retain uncertainty.";
  const hashes = {
    portfolioSnapshotHash: sha256(stableJson(portfolioSnapshot)),
    roleContextHash: sha256(stableJson(roleContext)),
    readerContextHash: sha256(stableJson(readerContext)),
    suiteHash: sha256(stableJson(suite)),
    contractHash: sha256(stableJson(contract)),
    promptHash: sha256(prompt)
  };
  const runId = sha256(
    stableJson({ candidateSha: binding.candidateSha, panel, reader: readerContext.id, role: roleContext.id, ...hashes })
  ).slice(0, 24);
  return {
    schemaVersion: 1,
    runId,
    state: "ready-for-independent-evaluation",
    panel,
    candidateSha: binding.candidateSha,
    worktreeClean: binding.worktreeClean,
    worktreeStateHash: binding.worktreeStateHash,
    timestamp,
    optimizerIdentity,
    evaluatorIdentity,
    ...hashes,
    readerId: readerContext.id,
    opportunityId: roleContext.id,
    routesReviewed: publicPages.map((page) => page.route),
    inputBoundary: "Public portfolio, public opportunity context, and public reader context only.",
    prompt,
    inputs: {
      portfolio: portfolioSnapshot,
      opportunity: roleContext,
      reader: readerContext
    },
    outputState: {
      decision: null,
      humanOrIndependentModelReview: "not-run"
    },
    disclaimer: "Simulated review protocol; no actual participation, endorsement, hiring decision, or advancement outcome is implied."
  };
}

export function writeArtifact(relativePath, value) {
  const path = resolve(HIRING_ARTIFACT_ROOT, relativePath);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, typeof value === "string" ? value : `${JSON.stringify(value, null, 2)}\n`);
  return path;
}

export function renderRoleCoverage(record) {
  const rows = (record.data.role_requirements ?? []).map((requirement) =>
    `| \`${requirement.id}\` | ${requirement.text} | ${requirement.coverage_status} | ${requirement.gap_type} | ${requirement.next_action} |`
  );
  return `# ${record.data.organization}: ${record.data.role_title}\n\n` +
    `> Generated from \`${record.repoPath}\`; verified ${record.data.verified_at}. ` +
    `This report does not certify hiring fit or application readiness.\n\n` +
    `| Requirement | Need | Coverage | Gap | Next action |\n` +
    `| --- | --- | --- | --- | --- |\n${rows.join("\n")}\n`;
}

export function renderCareerCoverage(context) {
  const rows = context.career.phases.map((phase) =>
    `| ${phase.period} | ${phase.id} | ${phase.capabilities.join(", ")} | ${phase.proofRefs.map((id) => `\`${id}\``).join(", ")} | ${phase.portfolioState} |`
  );
  return `# Career Trajectory Coverage\n\n` +
    `> Generated diagnostic. Uneven density is not a claim gap by itself.\n\n` +
    `| Period | Phase | Capabilities | Governed proofs | Portfolio state |\n` +
    `| --- | --- | --- | --- | --- |\n${rows.join("\n")}\n`;
}

export function renderSourceCoverage(context) {
  const rows = context.sourceChannels.channels.map((channel) =>
    `| ${channel.id} | ${channel.coverageDate} | ${channel.accessState} | ${channel.normalizationState} | ${channel.identityResolutionState} | ${channel.publicUseBoundary} |`
  );
  return `# Source Channel Coverage\n\n> ${context.sourceChannels.rule}\n\n` +
    `| Channel | Coverage | Access | Normalization | Identity | Public-use boundary |\n` +
    `| --- | --- | --- | --- | --- | --- |\n${rows.join("\n")}\n`;
}

export function writeCoverageArtifacts(context = loadHiringContext()) {
  const paths = [];
  for (const opportunity of context.opportunities) {
    paths.push(
      writeArtifact(
        `role-coverage/${opportunity.data.id}.md`,
        renderRoleCoverage(opportunity)
      )
    );
  }
  paths.push(writeArtifact("career-trajectory-coverage.md", renderCareerCoverage(context)));
  paths.push(writeArtifact("source-channel-coverage.md", renderSourceCoverage(context)));
  const discovery = runTitleBlindDiscovery(context);
  paths.push(writeArtifact("opportunity-discovery.json", discovery));
  return { paths, discovery };
}

export function resolveOpportunityGaps(opportunityId, context = loadHiringContext()) {
  const record = context.opportunities.find((item) => item.data.id === opportunityId);
  if (!record) throw new Error(`Unknown opportunity ${opportunityId}`);
  return {
    opportunityId,
    state: "public-safe-wiki-gap-analysis",
    evaluatorBoundary: "This resolver runs after public-only evaluation and never changes the evaluator packet.",
    findings: (record.data.role_requirements ?? [])
      .filter((requirement) => requirement.coverage_status !== "visible-proven")
      .map((requirement) => ({
        findingId: `gap.${requirement.id}`,
        requirementId: requirement.id,
        classification: requirement.coverage_status,
        gapType: requirement.gap_type,
        wikiRecords: requirement.wiki_records ?? [],
        proofRefs: requirement.proof_refs ?? [],
        publicRoutes: requirement.public_routes ?? [],
        smallestResponsibleChange: requirement.next_action,
        requiresHumanApproval: true
      }))
  };
}

export function contextHashes(context = loadHiringContext()) {
  return {
    suiteHash: sha256(stableJson(context.suite)),
    contractHash: sha256(stableJson(context.contract)),
    opportunityHashes: Object.fromEntries(
      context.opportunities.map((record) => [
        record.data.id,
        sha256(stableJson(publicOpportunityContext(record)))
      ])
    ),
    readerHashes: Object.fromEntries(
      context.readers.map((reader) => [
        reader.data.id,
        sha256(stableJson(publicReaderContext(reader)))
      ])
    )
  };
}

export { REPO_ROOT };
