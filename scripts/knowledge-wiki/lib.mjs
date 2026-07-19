import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parse as parseYaml } from "yaml";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import { proofClaims } from "../../apps/www/src/data/proofs.ts";

export const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
export const wikiRoot = path.join(repoRoot, "docs/knowledge-bank");
export const reportsRoot = path.join(repoRoot, "reports");
export const rootWikiId = "index.knowledge-wiki";

export const wikiKinds = new Set([
  "index", "project", "event", "capability", "method", "opportunity",
  "person", "organization", "place", "policy", "note",
]);
export const wikiStatuses = new Set([
  "seed", "active", "maintained", "needs-review", "held", "deprecated",
]);
export const wikiVisibilities = new Set(["public-safe", "restricted", "private"]);
export const wikiSensitivities = new Set(["low", "moderate", "high", "protected"]);
export const relationTypes = new Set([
  "indexes", "informed_by", "informed", "demonstrates", "demonstrated_by",
  "developed_through", "uses_method", "documented_by", "governed_by",
  "governs", "supports", "corrected_by", "projects_to", "related_to",
]);
export const opportunityPostingStatuses = new Set(["live", "closed", "historical", "unknown"]);
export const opportunityCoverageStatuses = new Set([
  "visible-proven", "visible-qualified", "visible-weak",
  "wiki-proven-not-projected", "source-needed", "corroboration-needed",
  "rights-blocked", "experience-gap", "hard-screen", "unknown",
  "not-applicable",
]);
export const hardScreenStatuses = new Set(["clear", "conditional", "unknown", "gap", "not-applicable"]);

const requiredFields = [
  "id", "title", "kind", "status", "visibility", "sensitivity",
  "last_reviewed", "review_by",
];
const privateLocatorPattern = /(?:file:\/\/|\/(?:Users|Volumes|private)\/|[A-Za-z]:\\Users\\)/;
const stableWikiIdPattern = /^[a-z0-9]+(?:[.-][a-z0-9]+)*$/;
const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/;

function listFiles(root, suffix = ".md") {
  const files = [];
  if (!existsSync(root)) return files;
  for (const entry of readdirSync(root, { withFileTypes: true })) {
    const absolute = path.join(root, entry.name);
    if (entry.isDirectory()) files.push(...listFiles(absolute, suffix));
    else if (entry.isFile() && entry.name.endsWith(suffix)) files.push(absolute);
  }
  return files.sort((left, right) => left.localeCompare(right));
}

function normalizeArray(value) {
  if (value === undefined || value === null) return [];
  return Array.isArray(value) ? value : [value];
}

function githubSlug(value) {
  return value
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/[`*_~]/g, "")
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function extractHeadings(body) {
  const counts = new Map();
  const headings = new Set();
  for (const line of body.split("\n")) {
    const match = line.match(/^#{1,6}\s+(.+?)\s*#*$/);
    if (!match) continue;
    const base = githubSlug(match[1]);
    const count = counts.get(base) ?? 0;
    counts.set(base, count + 1);
    headings.add(count === 0 ? base : `${base}-${count}`);
  }
  return headings;
}

function extractLinks(body) {
  const links = [];
  const pattern = /(?<!!)\[[^\]]*\]\(([^)\s]+)(?:\s+["'][^"']*["'])?\)/g;
  for (const match of body.matchAll(pattern)) links.push(match[1].replace(/^<|>$/g, ""));
  return links;
}

export function parseWikiDocument(filePath, root = wikiRoot) {
  const source = readFileSync(filePath, "utf8");
  let frontmatter = null;
  let body = source;
  let frontmatterError = null;
  if (source.startsWith("---\n")) {
    const closing = source.indexOf("\n---\n", 4);
    if (closing === -1) {
      frontmatterError = "Frontmatter opens but does not close";
    } else {
      try {
        frontmatter = parseYaml(source.slice(4, closing)) ?? {};
      } catch (error) {
        frontmatterError = `Invalid YAML frontmatter: ${error.message}`;
      }
      body = source.slice(closing + 5);
    }
  }
  return {
    absolutePath: filePath,
    path: path.relative(repoRoot, filePath).split(path.sep).join("/"),
    wikiPath: path.relative(root, filePath).split(path.sep).join("/"),
    source,
    body,
    frontmatter,
    frontmatterError,
    headings: extractHeadings(body),
    links: extractLinks(body),
  };
}

function addError(state, code, message, file = null) {
  state.errors.push({ code, message, ...(file ? { file } : {}) });
}

function addWarning(state, code, message, file = null) {
  state.warnings.push({ code, message, ...(file ? { file } : {}) });
}

function validateFrontmatter(document, state) {
  const data = document.frontmatter;
  if (!data) return;
  const file = document.path;
  for (const field of requiredFields) {
    if (data[field] === undefined || data[field] === null || data[field] === "") {
      addError(state, "missing-frontmatter-field", `Missing required field: ${field}`, file);
    }
  }
  if (data.id && !stableWikiIdPattern.test(data.id)) addError(state, "invalid-wiki-id", `Invalid wiki ID: ${data.id}`, file);
  if (data.kind && !wikiKinds.has(data.kind)) addError(state, "invalid-kind", `Unknown kind: ${data.kind}`, file);
  if (data.status && !wikiStatuses.has(data.status)) addError(state, "invalid-status", `Unknown status: ${data.status}`, file);
  if (data.visibility && !wikiVisibilities.has(data.visibility)) addError(state, "invalid-visibility", `Unknown visibility: ${data.visibility}`, file);
  if (data.sensitivity && !wikiSensitivities.has(data.sensitivity)) addError(state, "invalid-sensitivity", `Unknown sensitivity: ${data.sensitivity}`, file);
  for (const field of ["last_reviewed", "review_by"]) {
    if (data[field] && !isoDatePattern.test(String(data[field]))) addError(state, "invalid-date", `${field} must be YYYY-MM-DD`, file);
  }
  for (const alias of normalizeArray(data.aliases)) {
    if (typeof alias !== "string" || !alias.trim()) addError(state, "invalid-alias", "Aliases must be non-empty strings", file);
  }
  for (const reference of normalizeArray(data.canonical_refs)) {
    if (typeof reference !== "string" || !reference.trim()) addError(state, "invalid-reference", "Canonical refs must be non-empty IDs", file);
  }
  for (const relation of normalizeArray(data.relations)) {
    if (!relation || typeof relation !== "object" || typeof relation.type !== "string" || typeof relation.target !== "string") {
      addError(state, "invalid-relation", "Relations require string type and target fields", file);
      continue;
    }
    if (!relationTypes.has(relation.type)) addError(state, "invalid-relation-type", `Unknown relation type: ${relation.type}`, file);
  }
  for (const wanted of normalizeArray(data.wanted)) {
    if (!wanted || typeof wanted !== "object" || !wanted.id || !wanted.title || !wanted.reason || !wanted.status) {
      addError(state, "invalid-wanted-page", "Wanted pages require id, title, reason, and status", file);
    }
  }
  if (privateLocatorPattern.test(document.source)) addError(state, "private-locator", "Public repository wiki page contains an absolute private locator", file);
  if (data.kind === "opportunity") validateOpportunity(data, state, file);
  const inflatesAbsence = /\b(?:page|artifact|record|source)\s+never existed\b/i.test(document.body);
  const explicitlyRejectsInflation = /(?:not proof|cannot|must never)[\s\S]{0,120}\b(?:page|artifact|record|source)\s+never existed\b/i.test(document.body);
  if (inflatesAbsence && !explicitlyRejectsInflation) {
    addError(state, "absence-inflation", "A not-recovered artifact cannot be asserted to have never existed", file);
  }
}

function validateOpportunity(data, state, file) {
  const required = ["organization", "canonical_url", "source_type", "posting_status", "verified_at", "reverify_by"];
  for (const field of required) {
    if (data[field] === undefined || data[field] === null || data[field] === "") {
      addError(state, "missing-opportunity-field", `Opportunity is missing ${field}`, file);
    }
  }
  if (data.canonical_url && !/^https:\/\//.test(data.canonical_url)) addError(state, "invalid-opportunity-url", "Opportunity canonical_url must use HTTPS", file);
  if (data.source_type && data.source_type !== "official-employer") addError(state, "invalid-opportunity-source", "Priority opportunity source_type must be official-employer", file);
  if (data.posting_status && !opportunityPostingStatuses.has(data.posting_status)) addError(state, "invalid-posting-status", `Unknown opportunity posting_status: ${data.posting_status}`, file);
  for (const field of ["verified_at", "reverify_by", "deadline"]) {
    if (data[field] && !isoDatePattern.test(String(data[field]))) addError(state, "invalid-opportunity-date", `${field} must be YYYY-MM-DD`, file);
  }
  if (data.verified_at && data.reverify_by && String(data.reverify_by) < String(data.verified_at)) addError(state, "invalid-reverification-window", "reverify_by precedes verified_at", file);
  if (!Array.isArray(data.role_requirements) || data.role_requirements.length === 0) addError(state, "missing-role-requirements", "Opportunity must contain role_requirements", file);
  const requirementIds = new Set();
  const proofIds = new Set(proofClaims.map((proof) => proof.id));
  for (const requirement of normalizeArray(data.role_requirements)) {
    if (!requirement?.id || !stableWikiIdPattern.test(requirement.id)) addError(state, "invalid-requirement-id", `Invalid role requirement ID: ${requirement?.id ?? "missing"}`, file);
    if (requirementIds.has(requirement?.id)) addError(state, "duplicate-requirement-id", `Duplicate role requirement ID: ${requirement.id}`, file);
    requirementIds.add(requirement?.id);
    if (!['critical', 'important', 'supporting'].includes(requirement?.importance)) addError(state, "invalid-requirement-importance", `Invalid importance for ${requirement?.id ?? "requirement"}`, file);
    if (!requirement?.text) addError(state, "missing-requirement-text", `Missing text for ${requirement?.id ?? "requirement"}`, file);
    const coverage = requirement?.coverage;
    if (!coverage || !opportunityCoverageStatuses.has(coverage.status)) addError(state, "invalid-coverage-status", `Invalid coverage status for ${requirement?.id ?? "requirement"}`, file);
    for (const id of normalizeArray(coverage?.public_proof_ids)) if (!proofIds.has(id)) addError(state, "unknown-public-proof", `Unknown public proof ID ${id}`, file);
    for (const route of normalizeArray(coverage?.public_routes)) if (typeof route !== "string" || !route.startsWith("/")) addError(state, "invalid-public-route", `Invalid public route for ${requirement?.id ?? "requirement"}`, file);
    if (!coverage?.next_action) addError(state, "missing-coverage-action", `Missing next_action for ${requirement?.id ?? "requirement"}`, file);
  }
  for (const screen of normalizeArray(data.hard_screens)) {
    if (!screen?.id || !stableWikiIdPattern.test(screen.id)) addError(state, "invalid-hard-screen-id", `Invalid hard-screen ID: ${screen?.id ?? "missing"}`, file);
    if (!screen?.text || !hardScreenStatuses.has(screen?.status)) addError(state, "invalid-hard-screen", `Hard screen ${screen?.id ?? "missing"} requires text and controlled status`, file);
  }
  if (!Array.isArray(data.portfolio_routes) || data.portfolio_routes.length === 0) addError(state, "missing-portfolio-routes", "Opportunity must name public portfolio routes", file);
  for (const route of normalizeArray(data.portfolio_routes)) if (typeof route !== "string" || !route.startsWith("/")) addError(state, "invalid-public-route", `Invalid opportunity portfolio route: ${route}`, file);
  for (const field of ["confirmed_facts", "inferences", "unknowns", "one_year_success_conditions", "one_year_risk_conditions", "interview_questions"]) {
    if (!Array.isArray(data[field])) addError(state, "missing-opportunity-array", `Opportunity field ${field} must be an array`, file);
  }
}

function canonicalEntries(registry = knowledgeBank) {
  const entries = new Map();
  const add = (kind, record, title, visibility = "restricted", sensitivity = "moderate", governance = undefined) => {
    entries.set(record.id, { id: record.id, kind, record, title, visibility, sensitivity, ...(governance ? { governance } : {}) });
  };
  for (const record of registry.captures) add("capture", record, "Knowledge intake capture", record.publicSafety === "public-safe" ? "public-safe" : "restricted", record.publicSafety === "public-safe" ? "low" : "protected");
  for (const record of registry.sources) {
    const protectedSource = ["private", "protected"].includes(record.visibility)
      || record.preservationStatus === "private"
      || ["hold", "do-not-publish"].includes(record.media?.publicDisplayStatus);
    add(
      "source",
      record,
      protectedSource ? "[protected source]" : record.title,
      record.visibility === "public" ? "public-safe" : "restricted",
      protectedSource ? "protected" : record.visibility === "public-metadata-only" ? "moderate" : "low",
      record.media ? {
        rights_status: record.media.rightsStatus,
        consent_status: record.media.consentStatus,
        public_display_status: record.media.publicDisplayStatus,
      } : undefined,
    );
  }
  for (const record of registry.observations) add("observation", record, `Observation ${record.id}`, "restricted", "moderate");
  for (const record of registry.claims) add("claim", record, `Claim ${record.id}`, ["approved", "public-safe"].includes(record.publicationState) ? "public-safe" : "restricted", record.publicationState === "private" ? "protected" : "moderate");
  for (const record of registry.researchTasks) add("research-task", record, `Research task ${record.id}`, "restricted", "moderate");
  for (const record of registry.researchInquiries) add("research-inquiry", record, `Research inquiry ${record.id}`, "restricted", "moderate");
  for (const record of registry.corrections) add("correction", record, `Correction ${record.id}`, "public-safe", "low");
  for (const record of registry.pages) add("citation-page", record, `Citation plan: ${record.surface}`, "public-safe", "low");
  for (const record of proofClaims) add(
    "proof-claim",
    record,
    `Proof claim ${record.id}`,
    "public-safe",
    record.status === "careful" ? "moderate" : "low",
  );
  return entries;
}

function canonicalDependencies(entry) {
  const record = entry.record;
  if (entry.kind === "capture") return [...record.sourceIds, ...record.observationIds, ...record.researchTaskIds];
  if (entry.kind === "observation") return [record.sourceId, ...record.supportsClaimIds];
  if (entry.kind === "claim") return [
    ...record.observationIds,
    ...record.evidence.map((item) => item.sourceId),
    ...(record.researchTaskIds ?? []),
    ...record.researchInquiryIds,
  ];
  if (entry.kind === "research-task") return [...record.sourceIds, ...record.claimIds];
  if (entry.kind === "research-inquiry") return record.sourceIds;
  if (entry.kind === "correction") return [record.claimId];
  if (entry.kind === "citation-page") return [
    ...record.sourceOrder,
    ...record.occurrences.flatMap((item) => [item.claimId, ...(item.sourceIds ?? [])]),
  ];
  return [];
}

function canonicalEdges(entry) {
  const record = entry.record;
  if (entry.kind === "capture") return [
    ...record.sourceIds.map((target) => ({ type: "produced_source", target })),
    ...record.observationIds.map((target) => ({ type: "produced_observation", target })),
    ...record.researchTaskIds.map((target) => ({ type: "routes_to", target })),
  ];
  if (entry.kind === "observation") return [
    { type: "observed_in", target: record.sourceId },
    ...record.supportsClaimIds.map((target) => ({ type: "supports", target })),
  ];
  if (entry.kind === "claim") return [
    ...record.observationIds.map((target) => ({ type: "supported_by_observation", target })),
    ...record.evidence.map((item) => ({ type: item.relationship.replaceAll("-", "_"), target: item.sourceId })),
    ...(record.researchTaskIds ?? []).map((target) => ({ type: "has_research_task", target })),
    ...record.researchInquiryIds.map((target) => ({ type: "has_research_inquiry", target })),
  ];
  if (entry.kind === "research-task") return [
    ...record.sourceIds.map((target) => ({ type: "investigates_source", target })),
    ...record.claimIds.map((target) => ({ type: "investigates_claim", target })),
  ];
  if (entry.kind === "research-inquiry") return record.sourceIds.map((target) => ({ type: "reviewed_source", target }));
  if (entry.kind === "correction") return [{ type: "corrects", target: record.claimId }];
  if (entry.kind === "citation-page") return record.occurrences.map((item) => ({ type: "projects_claim", target: item.claimId }));
  return [];
}

function resolveMarkdownLink(document, href, documentsByPath, state) {
  if (/^(?:https?:|mailto:|tel:|data:)/i.test(href)) return null;
  const [rawTarget, rawFragment] = href.split("#", 2);
  const fragment = rawFragment ? decodeURIComponent(rawFragment).toLowerCase() : null;
  let targetPath = document.absolutePath;
  if (rawTarget) targetPath = path.resolve(path.dirname(document.absolutePath), decodeURIComponent(rawTarget));
  if (rawTarget && !path.extname(targetPath) && existsSync(`${targetPath}.md`)) targetPath = `${targetPath}.md`;
  if (!existsSync(targetPath) || !statSync(targetPath).isFile()) {
    const generatedTargets = new Set([
      path.join(reportsRoot, "wiki-graph.json"),
      path.join(reportsRoot, "wiki-backlinks.json"),
      path.join(reportsRoot, "wiki-health.json"),
      path.join(reportsRoot, "wiki-health.md"),
    ]);
    if (generatedTargets.has(targetPath)) return targetPath;
    addError(state, "broken-link", `Broken Markdown link: ${href}`, document.path);
    return null;
  }
  if (fragment && targetPath.endsWith(".md")) {
    const targetDocument = documentsByPath.get(targetPath) ?? parseWikiDocument(targetPath);
    if (!targetDocument.headings.has(fragment)) addError(state, "broken-fragment", `Missing fragment #${fragment} in ${path.relative(repoRoot, targetPath)}`, document.path);
  }
  return targetPath;
}

function fingerprint(value) {
  return createHash("sha256").update(value).digest("hex");
}

function stableJson(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

export function compileKnowledgeWiki({ root = wikiRoot, registry = knowledgeBank } = {}) {
  const state = { errors: [], warnings: [] };
  const documents = listFiles(root).map((file) => parseWikiDocument(file, root));
  const documentsByPath = new Map(documents.map((document) => [document.absolutePath, document]));
  const authoredDocuments = documents.filter((document) => document.frontmatter);
  const byId = new Map();
  const byAlias = new Map();

  for (const document of documents) {
    if (document.frontmatterError) addError(state, "frontmatter-parse", document.frontmatterError, document.path);
    validateFrontmatter(document, state);
    if (!document.frontmatter?.id) continue;
    if (byId.has(document.frontmatter.id)) addError(state, "duplicate-id", `Duplicate ID: ${document.frontmatter.id}`, document.path);
    else byId.set(document.frontmatter.id, document);
    for (const alias of normalizeArray(document.frontmatter.aliases)) {
      if (typeof alias !== "string") continue;
      const key = alias.toLowerCase();
      if (byAlias.has(key) && byAlias.get(key) !== document.frontmatter.id) addError(state, "duplicate-alias", `Alias is used by multiple pages: ${alias}`, document.path);
      else byAlias.set(key, document.frontmatter.id);
    }
  }

  const canonical = canonicalEntries(registry);
  const seeds = new Set();
  for (const document of authoredDocuments) {
    for (const reference of normalizeArray(document.frontmatter.canonical_refs)) {
      if (!canonical.has(reference)) addError(state, "missing-canonical-ref", `Unknown canonical record: ${reference}`, document.path);
      else seeds.add(reference);
    }
    for (const relation of normalizeArray(document.frontmatter.relations)) {
      if (!byId.has(relation.target) && !canonical.has(relation.target)) addError(state, "missing-relation-target", `Unknown relation target: ${relation.target}`, document.path);
      if (canonical.has(relation.target)) seeds.add(relation.target);
    }
  }

  const includedCanonical = new Set();
  const queue = [...seeds].sort();
  while (queue.length) {
    const id = queue.shift();
    if (includedCanonical.has(id) || !canonical.has(id)) continue;
    includedCanonical.add(id);
    for (const dependency of canonicalDependencies(canonical.get(id))) {
      if (canonical.has(dependency) && !includedCanonical.has(dependency)) queue.push(dependency);
    }
    queue.sort();
  }

  const nodes = [];
  const edges = [];
  for (const document of authoredDocuments) {
    const data = document.frontmatter;
    if (!data?.id) continue;
    nodes.push({
      id: data.id,
      title: data.title,
      kind: data.kind,
      layer: "authored",
      status: data.status,
      visibility: data.visibility,
      sensitivity: data.sensitivity,
      path: document.path,
      aliases: normalizeArray(data.aliases).sort(),
      last_reviewed: String(data.last_reviewed ?? ""),
      review_by: String(data.review_by ?? ""),
      ...(data.kind === "opportunity" ? {
        opportunity: {
          organization: data.organization,
          canonical_url: data.canonical_url,
          source_type: data.source_type,
          posting_status: data.posting_status,
          verified_at: String(data.verified_at ?? ""),
          reverify_by: String(data.reverify_by ?? ""),
          deadline: data.deadline ? String(data.deadline) : null,
          job_id: data.job_id ?? null,
          compensation: data.compensation ?? null,
          location: data.location ?? null,
          reporting_line: data.reporting_line ?? null,
          named_personnel: normalizeArray(data.named_personnel),
          role_requirements: normalizeArray(data.role_requirements),
          hard_screens: normalizeArray(data.hard_screens),
          portfolio_routes: normalizeArray(data.portfolio_routes),
          confirmed_facts: normalizeArray(data.confirmed_facts),
          inferences: normalizeArray(data.inferences),
          unknowns: normalizeArray(data.unknowns),
          one_year_success_conditions: normalizeArray(data.one_year_success_conditions),
          one_year_risk_conditions: normalizeArray(data.one_year_risk_conditions),
          interview_questions: normalizeArray(data.interview_questions),
        },
      } : {}),
    });
    for (const relation of normalizeArray(data.relations)) edges.push({ from: data.id, type: relation.type, to: relation.target, layer: "authored" });
    for (const reference of normalizeArray(data.canonical_refs)) edges.push({ from: data.id, type: "references", to: reference, layer: "authored" });
    for (const href of document.links) {
      const targetPath = resolveMarkdownLink(document, href, documentsByPath, state);
      const targetDocument = targetPath ? documentsByPath.get(targetPath) : null;
      if (targetDocument?.frontmatter?.id) edges.push({ from: data.id, type: "links_to", to: targetDocument.frontmatter.id, layer: "authored" });
    }
  }
  for (const document of documents.filter((item) => !item.frontmatter)) {
    for (const href of document.links) resolveMarkdownLink(document, href, documentsByPath, state);
  }
  for (const id of [...includedCanonical].sort()) {
    const entry = canonical.get(id);
    nodes.push({
      id: entry.id,
      title: entry.title,
      kind: entry.kind,
      layer: "canonical-adapter",
      status: entry.record.status ?? entry.record.preservationStatus ?? entry.record.resultStatus ?? "recorded",
      visibility: entry.visibility,
      sensitivity: entry.sensitivity,
      ...(entry.governance ? { governance: entry.governance } : {}),
      ...(entry.kind === "source" && entry.record.visibility === "public-metadata-only" && entry.record.supportsGenerally?.length ? { safe_context: [...entry.record.supportsGenerally].sort() } : {}),
      ...(entry.kind === "source" && entry.record.visibility === "public-metadata-only" && entry.record.doesNotEstablish?.length ? { does_not_establish: [...entry.record.doesNotEstablish].sort() } : {}),
    });
    for (const edge of canonicalEdges(entry)) {
      if (includedCanonical.has(edge.target)) edges.push({ from: id, type: edge.type, to: edge.target, layer: "canonical-adapter" });
    }
  }

  const nodeIds = new Set(nodes.map((node) => node.id));
  for (const node of nodes.filter((item) => item.kind === "opportunity" && item.opportunity)) {
    for (const requirement of node.opportunity.role_requirements) {
      for (const evidenceId of normalizeArray(requirement.coverage?.wiki_evidence)) {
        if (!nodeIds.has(evidenceId)) addError(state, "missing-wiki-evidence", `Unknown Wiki evidence ${evidenceId} for ${requirement.id}`, node.path);
      }
    }
  }
  for (const edge of edges) {
    if (!nodeIds.has(edge.from) || !nodeIds.has(edge.to)) addError(state, "dangling-edge", `Dangling edge: ${edge.from} -[${edge.type}]-> ${edge.to}`);
  }

  nodes.sort((left, right) => left.id.localeCompare(right.id));
  edges.sort((left, right) => `${left.from}\0${left.type}\0${left.to}`.localeCompare(`${right.from}\0${right.type}\0${right.to}`));
  const dedupedEdges = edges.filter((edge, index) => index === 0 || JSON.stringify(edge) !== JSON.stringify(edges[index - 1]));
  const authoredIds = new Set(authoredDocuments.map((document) => document.frontmatter?.id).filter(Boolean));
  const authoredEdges = dedupedEdges.filter((edge) => authoredIds.has(edge.from) && authoredIds.has(edge.to));
  const incoming = new Map([...authoredIds].map((id) => [id, 0]));
  for (const edge of authoredEdges) incoming.set(edge.to, (incoming.get(edge.to) ?? 0) + 1);
  const orphans = [...incoming].filter(([id, count]) => id !== rootWikiId && count === 0).map(([id]) => id).sort();

  const reachable = new Set();
  const reachQueue = byId.has(rootWikiId) ? [rootWikiId] : [];
  while (reachQueue.length) {
    const current = reachQueue.shift();
    if (reachable.has(current)) continue;
    reachable.add(current);
    for (const edge of authoredEdges.filter((item) => item.from === current)) if (!reachable.has(edge.to)) reachQueue.push(edge.to);
  }
  const unreachable = [...authoredIds].filter((id) => !reachable.has(id)).sort();
  if (!byId.has(rootWikiId)) addError(state, "missing-root", `Missing root page: ${rootWikiId}`);
  for (const id of orphans) addWarning(state, "orphan", `Authored page has no incoming authored relation or link: ${id}`);
  for (const id of unreachable) addWarning(state, "unreachable", `Authored page is not reachable from ${rootWikiId}: ${id}`);

  const wanted = authoredDocuments.flatMap((document) => normalizeArray(document.frontmatter?.wanted).map((item) => ({ ...item, requested_by: document.frontmatter.id }))).sort((left, right) => left.id.localeCompare(right.id));
  const migrationCandidates = documents.filter((document) => !document.frontmatter).map((document) => document.path).sort();
  const stale = nodes.filter((node) => node.layer === "authored" && node.review_by && node.review_by < new Date().toISOString().slice(0, 10)).map((node) => node.id);
  for (const id of stale) addWarning(state, "review-overdue", `Review date has passed: ${id}`);

  state.errors.sort((left, right) => `${left.code}\0${left.file ?? ""}\0${left.message}`.localeCompare(`${right.code}\0${right.file ?? ""}\0${right.message}`));
  state.warnings.sort((left, right) => `${left.code}\0${left.file ?? ""}\0${left.message}`.localeCompare(`${right.code}\0${right.file ?? ""}\0${right.message}`));

  const graphCore = { schema_version: 1, generated: true, generated_by: "npm run wiki:graph", root_id: rootWikiId, nodes, edges: dedupedEdges };
  const graph = { ...graphCore, fingerprint: fingerprint(stableJson(graphCore)) };
  const backlinks = Object.fromEntries(nodes.map((node) => [node.id, dedupedEdges.filter((edge) => edge.to === node.id).map((edge) => ({ from: edge.from, type: edge.type, layer: edge.layer }))]));
  const health = {
    schema_version: 1,
    generated: true,
    generated_by: "npm run wiki:report",
    graph_fingerprint: graph.fingerprint,
    status: state.errors.length ? "fail" : "pass",
    counts: {
      markdown_files: documents.length,
      authored_pages: authoredDocuments.length,
      migration_candidates: migrationCandidates.length,
      canonical_nodes_in_pilot: includedCanonical.size,
      graph_nodes: nodes.length,
      graph_edges: dedupedEdges.length,
      wanted_pages: wanted.length,
      orphans: orphans.length,
      unreachable: unreachable.length,
      errors: state.errors.length,
      warnings: state.warnings.length,
    },
    errors: state.errors,
    warnings: state.warnings,
    wanted_pages: wanted,
    orphans,
    unreachable,
    migration_candidates: migrationCandidates,
  };
  return { graph, backlinks, health, documents, authoredDocuments, canonical, stableJson };
}

export function serializeGraph(compiled) {
  return compiled.stableJson(compiled.graph);
}

export function serializeBacklinks(compiled) {
  return compiled.stableJson({ schema_version: 1, generated: true, generated_by: "npm run wiki:graph", graph_fingerprint: compiled.graph.fingerprint, backlinks: compiled.backlinks });
}

export function serializeHealthJson(compiled) {
  return compiled.stableJson(compiled.health);
}

export function serializeHealthMarkdown(compiled) {
  const { health } = compiled;
  const lines = [
    "<!-- GENERATED FILE. Run `npm run wiki:report`; do not edit directly. -->",
    "",
    "# Knowledge Wiki health",
    "",
    `**Status:** ${health.status.toUpperCase()}`,
    `**Graph fingerprint:** \`${health.graph_fingerprint}\``,
    "",
    "## Counts",
    "",
    "| Measure | Count |",
    "| --- | ---: |",
    ...Object.entries(health.counts).map(([key, value]) => `| ${key.replaceAll("_", " ")} | ${value} |`),
    "",
    "## Hard failures",
    "",
    ...(health.errors.length ? health.errors.map((item) => `- \`${item.code}\`${item.file ? ` in \`${item.file}\`` : ""}: ${item.message}`) : ["- None."]),
    "",
    "## Warnings",
    "",
    ...(health.warnings.length ? health.warnings.map((item) => `- \`${item.code}\`${item.file ? ` in \`${item.file}\`` : ""}: ${item.message}`) : ["- None."]),
    "",
    "## Wanted pages",
    "",
    ...(health.wanted_pages.length ? health.wanted_pages.map((item) => `- \`${item.id}\` (${item.status}), requested by \`${item.requested_by}\`: ${item.reason}`) : ["- None."]),
    "",
    "## Migration candidates",
    "",
    `${health.counts.migration_candidates} historical Markdown files remain readable but do not yet participate as authored semantic nodes. This is a bounded migration queue, not missing data.`,
    "",
    "## Authority reminder",
    "",
    "A passing report establishes structural consistency only. It does not grant publication, rights, consent, collaborator credit, or release approval.",
    "",
  ];
  return lines.join("\n");
}
