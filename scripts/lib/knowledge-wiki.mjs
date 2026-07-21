import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";

export const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
export const wikiRoot = path.join(repoRoot, "docs/knowledge-bank");
export const generatedRoot = path.join(repoRoot, "reports/knowledge-wiki/generated");
export const rootRecordId = "index.knowledge-wiki";

export const recordKinds = new Set([
  "anti-claim",
  "application",
  "asset",
  "capability",
  "claim",
  "correction",
  "decision",
  "evaluation",
  "event",
  "glossary",
  "index",
  "method",
  "opportunity",
  "organization",
  "person",
  "place",
  "projection",
  "project",
  "research-inquiry",
  "research-run",
  "source",
  "timeline"
]);

export const recordStatuses = new Set([
  "inbox",
  "draft",
  "maintained",
  "governed-open",
  "superseded",
  "archived",
  "retired"
]);

export const visibilityValues = new Set([
  "public",
  "public-safe",
  "summary-only",
  "internal",
  "restricted",
  "private",
  "permission-required"
]);

export const sensitivityValues = new Set(["low", "moderate", "high", "critical"]);

export const projectionStatuses = new Set([
  "ready",
  "ready-with-attribution",
  "careful",
  "pending",
  "protected",
  "never-public",
  "not-applicable"
]);

export const reviewStates = new Set([
  "not-requested",
  "requested",
  "scheduled",
  "completed",
  "human-blocked",
  "resolved"
]);

export const relationTypes = new Set([
  "collaborated_with",
  "contradicts",
  "documents",
  "has_asset",
  "informed_by",
  "located_at",
  "mentions",
  "organized_by",
  "part_of",
  "participated_in",
  "projected_to",
  "related_to",
  "resulted_in",
  "supersedes",
  "supports",
  "uses_method",
  "uses_source"
]);

export const opportunityStatuses = new Set([
  "live",
  "closed",
  "historical-benchmark",
  "availability-unknown"
]);

export const roleCoverageStatuses = new Set([
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

export const requirementPriorities = new Set(["hard", "critical", "important", "context"]);

const publicVisibilities = new Set(["public", "public-safe"]);
const protectedVisibilities = new Set(["restricted", "private", "permission-required"]);
const allowedLeafKinds = new Set(["anti-claim", "asset", "claim", "correction", "source"]);
const stableIdPattern = /^[a-z0-9]+(?:[.-][a-z0-9]+)*$/;
const privatePatterns = [
  /(?:^|[\s`"'(])\/(?:Users|Volumes|private|tmp)\//i,
  /file:\/\//i,
  /(?:apple photos|photos library).*\b[0-9a-f]{8}-[0-9a-f-]{27,}\b/i,
  /(?:x-amz-signature|x-goog-signature)=/i
];

function listMarkdownFiles(directory) {
  if (!existsSync(directory)) return [];
  const files = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...listMarkdownFiles(target));
    else if (entry.isFile() && entry.name.endsWith(".md")) files.push(target);
  }
  return files.sort();
}

function relativeToRepo(file) {
  return path.relative(repoRoot, file).split(path.sep).join("/");
}

function normalizedArray(value) {
  if (value === undefined || value === null) return [];
  return Array.isArray(value) ? value : [value];
}

function normalizedDate(value) {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return typeof value === "string" ? value : undefined;
}

function normalizedRequirement(requirement) {
  return {
    id: requirement?.id,
    label: requirement?.label,
    priority: requirement?.priority,
    coverageStatus: requirement?.coverage_status,
    sourceStatus: requirement?.source_status,
    wikiEvidence: normalizedArray(requirement?.wiki_evidence),
    publicEvidence: normalizedArray(requirement?.public_evidence),
    gapType: requirement?.gap_type,
    nextAction: requirement?.next_action
  };
}

function slugBase(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/[^\p{L}\p{N}\s_-]/gu, "")
    .replace(/\s+/g, "-");
}

function headingIndex(markdown) {
  const anchors = new Set();
  const counts = new Map();
  const headings = [];
  for (const [index, line] of markdown.split("\n").entries()) {
    const match = /^(#{1,6})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!match) continue;
    const base = slugBase(match[2]);
    const count = counts.get(base) ?? 0;
    counts.set(base, count + 1);
    const anchor = count ? `${base}-${count}` : base;
    anchors.add(anchor);
    headings.push({ depth: match[1].length, text: match[2], anchor, line: index + 1 });
  }
  return { anchors, headings };
}

function markdownLinks(markdown) {
  const links = [];
  const pattern = /!?\[([^\]]*)\]\(([^)]+)\)/g;
  let match;
  while ((match = pattern.exec(markdown))) {
    let destination = match[2].trim();
    if (destination.startsWith("<") && destination.endsWith(">")) {
      destination = destination.slice(1, -1);
    }
    destination = destination.replace(/\s+["'][^"']*["']$/, "");
    links.push({
      label: match[1],
      destination,
      line: markdown.slice(0, match.index).split("\n").length
    });
  }
  return links;
}

function resolveLocalLink(sourceFile, destination) {
  if (/^(?:https?:|mailto:|tel:)/i.test(destination)) return null;
  const [rawPath, rawFragment] = destination.split("#", 2);
  const decodedPath = decodeURIComponent(rawPath || "");
  const fragment = rawFragment ? decodeURIComponent(rawFragment).toLowerCase() : undefined;
  const targetPath = decodedPath ? path.resolve(path.dirname(sourceFile), decodedPath) : sourceFile;
  return { targetPath, fragment };
}

function canonicalIds() {
  return new Set(
    [
      ...knowledgeBank.sources,
      ...knowledgeBank.claims,
      ...knowledgeBank.researchInquiries,
      ...knowledgeBank.corrections,
      ...knowledgeBank.pages
    ].map((record) => record.id)
  );
}

function parseRecord(file) {
  const raw = readFileSync(file, "utf8");
  const parsed = matter(raw);
  if (parsed.data.wiki_record !== true) return null;
  const data = parsed.data;
  return {
    id: data.id,
    title: data.title,
    kind: data.kind,
    status: data.status,
    visibility: data.visibility,
    sensitivity: data.sensitivity,
    projectionStatus: data.projection_status,
    discoverable: data.discoverable,
    created: normalizedDate(data.created),
    lastReviewed: normalizedDate(data.last_reviewed),
    reviewBy: normalizedDate(data.review_by),
    reviewState: data.review_state,
    owner: data.owner,
    aliases: normalizedArray(data.aliases),
    canonicalPath: data.canonical_path,
    canonicalRefs: normalizedArray(data.canonical_refs),
    summary: data.summary,
    relations: normalizedArray(data.relations).map((relation) => ({
      type: relation?.type,
      target: relation?.target,
      href: relation?.href,
      context: relation?.context,
      evidence: normalizedArray(relation?.evidence)
    })),
    allowedSurfaces: normalizedArray(data.allowed_surfaces),
    rightsState: data.rights_state,
    consentState: data.consent_state,
    knowledgeStatus: data.knowledge_status,
    previousClaim: data.previous_claim,
    correctedClaim: data.corrected_claim,
    affectedSurfaces: normalizedArray(data.affected_surfaces),
    absenceType: data.absence_type,
    canonicalUrl: data.canonical_url,
    sourceType: data.source_type,
    opportunityStatus: data.opportunity_status,
    verifiedAt: normalizedDate(data.verified_at),
    reverifyBy: normalizedDate(data.reverify_by),
    deadline: normalizedDate(data.deadline),
    compensation: data.compensation,
    location: data.location,
    reportingLine: data.reporting_line,
    namedPersonnel: normalizedArray(data.named_personnel),
    hardRequirements: normalizedArray(data.hard_requirements),
    preferredRequirements: normalizedArray(data.preferred_requirements),
    roleRequirements: normalizedArray(data.role_requirements).map(normalizedRequirement),
    discoveryTerms: normalizedArray(data.discovery_terms),
    portfolioRoutes: normalizedArray(data.portfolio_routes),
    confirmedFacts: normalizedArray(data.confirmed_facts),
    inferences: normalizedArray(data.inferences),
    unknowns: normalizedArray(data.unknowns),
    oneYearSuccessConditions: normalizedArray(data.one_year_success_conditions),
    oneYearRiskConditions: normalizedArray(data.one_year_risk_conditions),
    interviewQuestions: normalizedArray(data.interview_questions),
    body: parsed.content,
    raw,
    file,
    path: relativeToRepo(file),
    headings: headingIndex(parsed.content),
    links: markdownLinks(parsed.content)
  };
}

function sourceCommit(root) {
  try {
    return execFileSync(
      "git",
      ["log", "-1", "--format=%H", "--", relativeToRepo(root), "apps/www/src/data/knowledge-bank/records.ts", "scripts/lib/knowledge-wiki.mjs"],
      { cwd: repoRoot, encoding: "utf8" }
    ).trim();
  } catch {
    return "unknown";
  }
}

function hashParts(parts) {
  const hash = createHash("sha256");
  for (const part of parts) hash.update(part).update("\0");
  return `sha256:${hash.digest("hex")}`;
}

function recordFingerprint(records) {
  const parts = records
    .map((record) => `${record.path}\n${record.raw}`)
    .sort();
  parts.push(readFileSync(path.join(repoRoot, "apps/www/src/data/knowledge-bank/records.ts"), "utf8"));
  return hashParts(parts);
}

function relationShapeError(record, relation, target) {
  const requiredTargets = {
    has_asset: new Set(["asset"]),
    located_at: new Set(["place"]),
    organized_by: new Set(["organization", "person"]),
    projected_to: new Set(["projection"]),
    uses_method: new Set(["method"]),
    uses_source: new Set(["source"])
  };
  const expected = requiredTargets[relation.type];
  if (expected && !expected.has(target.kind)) {
    return `${record.path}: relation ${relation.type} cannot target ${target.kind} ${target.id}`;
  }
  if (relation.type === "supersedes" && record.kind !== target.kind) {
    return `${record.path}: supersedes must connect records of the same kind`;
  }
  return null;
}

function inspectWiki(records, root, { allowMissingGenerated = false } = {}) {
  const errors = [];
  const warnings = [];
  const byId = new Map();
  const byPath = new Map(records.map((record) => [record.file, record]));
  const allRecordIds = new Set(records.map((record) => record.id));
  const knownCanonicalIds = canonicalIds();
  const aliases = new Map();

  for (const record of records) {
    const prefix = record.path;
    for (const field of ["id", "title", "kind", "status", "visibility", "sensitivity", "projectionStatus", "lastReviewed", "reviewState"]) {
      if (record[field] === undefined || record[field] === null || record[field] === "") {
        errors.push(`${prefix}: missing required field ${field}`);
      }
    }
    if (record.discoverable !== true && record.discoverable !== false) {
      errors.push(`${prefix}: discoverable must be true or false`);
    }
    if (record.id && !stableIdPattern.test(record.id)) errors.push(`${prefix}: invalid stable ID ${record.id}`);
    if (byId.has(record.id)) errors.push(`${prefix}: duplicate stable ID ${record.id}`);
    else byId.set(record.id, record);
    if (!recordKinds.has(record.kind)) errors.push(`${prefix}: unknown kind ${record.kind}`);
    if (!recordStatuses.has(record.status)) errors.push(`${prefix}: unknown status ${record.status}`);
    if (!visibilityValues.has(record.visibility)) errors.push(`${prefix}: unknown visibility ${record.visibility}`);
    if (!sensitivityValues.has(record.sensitivity)) errors.push(`${prefix}: unknown sensitivity ${record.sensitivity}`);
    if (!projectionStatuses.has(record.projectionStatus)) errors.push(`${prefix}: unknown projection_status ${record.projectionStatus}`);
    if (!reviewStates.has(record.reviewState)) errors.push(`${prefix}: unknown review_state ${record.reviewState}`);
    if (record.canonicalPath !== record.path) errors.push(`${prefix}: canonical_path does not match current path`);

    for (const alias of record.aliases) {
      const normalized = String(alias).trim().toLowerCase();
      if (!normalized) errors.push(`${prefix}: alias must not be empty`);
      else if (aliases.has(normalized)) errors.push(`${prefix}: alias collision for ${alias}`);
      else aliases.set(normalized, record.id);
    }

    for (const canonicalRef of record.canonicalRefs) {
      if (!knownCanonicalIds.has(canonicalRef)) {
        errors.push(`${prefix}: unknown canonical_refs entry ${canonicalRef}`);
      }
    }

    const searchable = JSON.stringify({ ...record, file: undefined, raw: undefined, headings: undefined, links: undefined });
    for (const pattern of privatePatterns) {
      if (pattern.test(searchable) || pattern.test(record.body)) {
        errors.push(`${prefix}: private path, signed URL, or protected media identifier is not allowed`);
        break;
      }
    }

    if (record.allowedSurfaces.length) {
      if (!publicVisibilities.has(record.visibility)) errors.push(`${prefix}: projected record is not public-safe`);
      if (!["ready", "ready-with-attribution", "careful"].includes(record.projectionStatus)) {
        errors.push(`${prefix}: ${record.projectionStatus} record cannot project publicly`);
      }
    }
    if (record.kind === "asset" && record.allowedSurfaces.length && record.rightsState !== "cleared") {
      errors.push(`${prefix}: public asset projection requires cleared rights`);
    }
    if (record.knowledgeStatus === "not-recovered" && /\bnever existed\b/i.test(record.body)) {
      errors.push(`${prefix}: not-recovered cannot be presented as never existed`);
    }
    if (record.kind === "correction") {
      if (!record.previousClaim || !record.correctedClaim) errors.push(`${prefix}: correction requires previous_claim and corrected_claim`);
      if (!record.affectedSurfaces.length) errors.push(`${prefix}: correction requires affected_surfaces`);
    }
    if (record.kind === "opportunity" && record.opportunityStatus) {
      if (!opportunityStatuses.has(record.opportunityStatus)) {
        errors.push(`${prefix}: unknown opportunity_status ${record.opportunityStatus}`);
      }
      if (!record.canonicalUrl || !record.sourceType || !record.verifiedAt || !record.reverifyBy) {
        errors.push(`${prefix}: governed employment opportunity requires canonical_url, source_type, verified_at, and reverify_by`);
      }
      try {
        if (record.canonicalUrl && new URL(record.canonicalUrl).protocol !== "https:") {
          errors.push(`${prefix}: canonical_url must use HTTPS`);
        }
      } catch {
        errors.push(`${prefix}: canonical_url is invalid`);
      }
      if (record.opportunityStatus === "live" && record.reverifyBy < new Date().toISOString().slice(0, 10)) {
        errors.push(`${prefix}: live opportunity is stale and must be reverified or reclassified`);
      }
      if (record.roleRequirements.length < 3) {
        errors.push(`${prefix}: live opportunity requires at least three role_requirements`);
      }
      const requirementIds = new Set();
      for (const requirement of record.roleRequirements) {
        if (!requirement.id || !stableIdPattern.test(requirement.id)) {
          errors.push(`${prefix}: role requirement has an invalid stable ID ${requirement.id ?? "(missing)"}`);
        } else if (requirementIds.has(requirement.id)) {
          errors.push(`${prefix}: duplicate role requirement ID ${requirement.id}`);
        } else requirementIds.add(requirement.id);
        if (!requirement.label) errors.push(`${prefix}: role requirement ${requirement.id} needs a label`);
        if (!requirementPriorities.has(requirement.priority)) {
          errors.push(`${prefix}: role requirement ${requirement.id} has unknown priority ${requirement.priority}`);
        }
        if (!roleCoverageStatuses.has(requirement.coverageStatus)) {
          errors.push(`${prefix}: role requirement ${requirement.id} has unknown coverage_status ${requirement.coverageStatus}`);
        }
        if (!requirement.sourceStatus) errors.push(`${prefix}: role requirement ${requirement.id} needs source_status`);
        for (const evidenceId of requirement.wikiEvidence) {
          if (!allRecordIds.has(evidenceId) && !knownCanonicalIds.has(evidenceId)) {
            errors.push(`${prefix}: role requirement ${requirement.id} references unknown Wiki evidence ${evidenceId}`);
          }
        }
        for (const route of requirement.publicEvidence) {
          if (!/^\/(?:$|[a-z0-9][a-z0-9/-]*)$/.test(route)) {
            errors.push(`${prefix}: role requirement ${requirement.id} has invalid public route ${route}`);
          }
        }
      }
      if (!record.roleRequirements.some((requirement) => requirement.priority === "hard")) {
        errors.push(`${prefix}: opportunity must identify at least one hard requirement or application gate`);
      }
      if (record.discoveryTerms.length < 3) errors.push(`${prefix}: opportunity requires title-blind discovery_terms`);
      if (!record.portfolioRoutes.includes("/resume") || !record.portfolioRoutes.includes("/contact")) {
        errors.push(`${prefix}: opportunity portfolio_routes must include /resume and /contact`);
      }
      if (!record.oneYearSuccessConditions.length || !record.oneYearRiskConditions.length) {
        errors.push(`${prefix}: opportunity requires one-year success and risk conditions`);
      }
    }
  }

  for (const record of records) {
    for (const relation of record.relations) {
      if (!relationTypes.has(relation.type)) {
        errors.push(`${record.path}: unknown relation type ${relation.type}`);
        continue;
      }
      const target = byId.get(relation.target);
      if (!target) {
        errors.push(`${record.path}: relation targets unknown record ${relation.target}`);
        continue;
      }
      const shapeError = relationShapeError(record, relation, target);
      if (shapeError) errors.push(shapeError);
      if (publicVisibilities.has(record.visibility) && protectedVisibilities.has(target.visibility)) {
        errors.push(`${record.path}: public-safe record cannot link to protected record ${target.id}`);
      }
      if (!relation.href) {
        errors.push(`${record.path}: relation ${relation.type} to ${relation.target} requires href`);
      } else {
        const resolved = resolveLocalLink(record.file, relation.href);
        if (!resolved || path.normalize(resolved.targetPath) !== path.normalize(target.file)) {
          errors.push(`${record.path}: relation href does not resolve to ${relation.target}`);
        }
      }
    }

    for (const link of record.links) {
      const resolved = resolveLocalLink(record.file, link.destination);
      if (!resolved) continue;
      const relativeTarget = relativeToRepo(resolved.targetPath);
      if (relativeTarget.startsWith("..")) {
        errors.push(`${record.path}:${link.line}: local link leaves the repository`);
        continue;
      }
      if (!existsSync(resolved.targetPath)) {
        const targetsGeneratedOutput = path.normalize(resolved.targetPath).startsWith(path.normalize(generatedRoot));
        if (!(allowMissingGenerated && targetsGeneratedOutput)) {
          errors.push(`${record.path}:${link.line}: broken file link ${link.destination}`);
        }
        continue;
      }
      if (statSync(resolved.targetPath).isDirectory()) continue;
      if (resolved.fragment) {
        const targetRecord = byPath.get(resolved.targetPath);
        const targetMarkdown = targetRecord?.body ?? readFileSync(resolved.targetPath, "utf8");
        const anchors = targetRecord?.headings.anchors ?? headingIndex(matter(targetMarkdown).content).anchors;
        if (!anchors.has(resolved.fragment)) {
          errors.push(`${record.path}:${link.line}: broken heading fragment ${link.destination}`);
        }
      }
    }
  }

  const current = new Date().toISOString().slice(0, 10);
  for (const record of records) {
    if (record.reviewBy && record.reviewBy < current && !["archived", "retired", "superseded"].includes(record.status)) {
      warnings.push(`${record.path}: review date has passed (${record.reviewBy})`);
    }
    if (record.relations.some((relation) => relation.type === "related_to")) {
      warnings.push(`${record.path}: related_to should be replaced when a precise relation becomes available`);
    }
  }

  const rootRecord = byId.get(rootRecordId);
  if (!rootRecord) errors.push(`Missing root record ${rootRecordId}`);
  const adjacency = new Map(records.map((record) => [record.id, new Set()]));
  const inbound = new Map(records.map((record) => [record.id, new Set()]));
  for (const record of records) {
    for (const relation of record.relations) {
      if (byId.has(relation.target)) {
        adjacency.get(record.id).add(relation.target);
        inbound.get(relation.target).add(record.id);
      }
    }
    for (const link of record.links) {
      const resolved = resolveLocalLink(record.file, link.destination);
      const target = resolved ? byPath.get(resolved.targetPath) : undefined;
      if (target) {
        adjacency.get(record.id).add(target.id);
        inbound.get(target.id).add(record.id);
      }
    }
  }

  const distances = new Map();
  if (rootRecord) {
    const queue = [[rootRecord.id, 0]];
    while (queue.length) {
      const [id, distance] = queue.shift();
      if (distances.has(id)) continue;
      distances.set(id, distance);
      for (const target of adjacency.get(id) ?? []) queue.push([target, distance + 1]);
    }
  }
  const unreachable = records.filter((record) => record.discoverable && !distances.has(record.id));
  for (const record of unreachable) errors.push(`${record.path}: discoverable record is unreachable from ${rootRecordId}`);

  const orphans = records.filter((record) => {
    if (record.id === rootRecordId) return false;
    return (adjacency.get(record.id)?.size ?? 0) === 0 && (inbound.get(record.id)?.size ?? 0) === 0;
  });
  const unexplainedOrphans = orphans.filter((record) => !allowedLeafKinds.has(record.kind) && record.status !== "archived");
  for (const record of unexplainedOrphans) warnings.push(`${record.path}: unexplained type-aware orphan`);

  return { errors, warnings, byId, byPath, adjacency, inbound, distances, unreachable, orphans };
}

function semanticGraph(records, inspection, root) {
  const nodes = records
    .map((record) => ({
      id: record.id,
      path: record.path,
      title: record.title,
      kind: record.kind,
      status: record.status,
      visibility: record.visibility,
      sensitivity: record.sensitivity,
      projectionStatus: record.projectionStatus,
      discoverable: record.discoverable,
      canonicalRefs: [...record.canonicalRefs].sort(),
      aliases: [...record.aliases].sort(),
      allowedSurfaces: [...record.allowedSurfaces].sort(),
      lastReviewed: record.lastReviewed,
      reviewBy: record.reviewBy,
      reviewState: record.reviewState,
      rightsState: record.rightsState,
      consentState: record.consentState,
      opportunityStatus: record.opportunityStatus,
      verifiedAt: record.verifiedAt,
      reverifyBy: record.reverifyBy,
      deadline: record.deadline,
      roleRequirements: record.roleRequirements,
      discoveryTerms: [...record.discoveryTerms].sort(),
      portfolioRoutes: [...record.portfolioRoutes].sort()
    }))
    .sort((a, b) => a.id.localeCompare(b.id));

  const edges = [];
  for (const record of records) {
    for (const relation of record.relations) {
      if (!inspection.byId.has(relation.target)) continue;
      edges.push({
        from: record.id,
        type: relation.type,
        to: relation.target,
        source: "frontmatter",
        href: relation.href,
        context: relation.context
      });
    }
    for (const link of record.links) {
      const resolved = resolveLocalLink(record.file, link.destination);
      const target = resolved ? inspection.byPath.get(resolved.targetPath) : undefined;
      if (!target) continue;
      edges.push({
        from: record.id,
        type: "links_to",
        to: target.id,
        source: "markdown",
        href: link.destination,
        context: link.label || undefined
      });
    }
  }
  edges.sort((a, b) => `${a.from}|${a.type}|${a.to}|${a.href}`.localeCompare(`${b.from}|${b.type}|${b.to}|${b.href}`));

  const fingerprint = recordFingerprint(records);
  return {
    schemaVersion: 1,
    product: "Knowledge Wiki",
    compatibilityAlias: "Knowledge Bank",
    canonicalRoot: relativeToRepo(root),
    sourceCommit: sourceCommit(root),
    sourceFingerprint: fingerprint,
    nodes,
    edges
  };
}

function healthReport(records, inspection, graph) {
  const relationEdges = graph.edges.filter((edge) => edge.source === "frontmatter");
  const genericRelations = relationEdges.filter((edge) => edge.type === "related_to");
  const stale = records.filter((record) => record.reviewBy && record.reviewBy < new Date().toISOString().slice(0, 10));
  const rightsBacklog = records.filter((record) => record.kind === "asset" && record.rightsState && record.rightsState !== "cleared");
  const humanReviewBacklog = records.filter((record) => !["completed", "resolved"].includes(record.reviewState));
  const deadEnds = records.filter((record) => record.discoverable && (inspection.adjacency.get(record.id)?.size ?? 0) === 0);
  const opportunities = records.filter((record) => record.kind === "opportunity" && record.opportunityStatus);
  const roleCoverage = Object.fromEntries(
    opportunities.map((record) => [
      record.id,
      Object.fromEntries(
        [...roleCoverageStatuses].map((status) => [
          status,
          record.roleRequirements.filter((requirement) => requirement.coverageStatus === status).length
        ])
      )
    ])
  );
  return {
    schemaVersion: 1,
    sourceFingerprint: graph.sourceFingerprint,
    hardGates: {
      status: inspection.errors.length ? "fail" : "pass",
      failures: inspection.errors
    },
    diagnostics: {
      records: records.length,
      recordsByKind: Object.fromEntries(
        [...recordKinds]
          .map((kind) => [kind, records.filter((record) => record.kind === kind).length])
          .filter(([, count]) => count)
      ),
      proseLinks: graph.edges.filter((edge) => edge.source === "markdown").length,
      typedRelations: relationEdges.length,
      genericRelationRate: relationEdges.length ? genericRelations.length / relationEdges.length : 0,
      discoverableRecords: records.filter((record) => record.discoverable).length,
      reachableDiscoverableRecords: records.filter((record) => record.discoverable && inspection.distances.has(record.id)).length,
      maximumRootDistance: Math.max(0, ...inspection.distances.values()),
      typeAwareOrphans: inspection.orphans.map((record) => ({ id: record.id, kind: record.kind })),
      deadEnds: deadEnds.map((record) => ({ id: record.id, kind: record.kind, intentionalLeaf: allowedLeafKinds.has(record.kind) })),
      wantedPages: [],
      staleRecords: stale.map((record) => record.id),
      rightsBacklog: rightsBacklog.map((record) => record.id),
      humanReviewBacklog: humanReviewBacklog.map((record) => ({ id: record.id, state: record.reviewState })),
      employmentOpportunities: opportunities.map((record) => ({
        id: record.id,
        status: record.opportunityStatus,
        verifiedAt: record.verifiedAt,
        reverifyBy: record.reverifyBy,
        deadline: record.deadline,
        requirements: record.roleRequirements.length
      })),
      roleCoverage,
      warnings: inspection.warnings
    },
    manualAuthorityGates: {
      humanNavigationStudy: "not-requested",
      collaboratorConsent: "not-requested",
      rightsClearance: rightsBacklog.length ? "human-blocked" : "resolved",
      editorialApproval: "not-requested",
      productionObservation: "not-requested"
    }
  };
}

export function loadKnowledgeWiki({ root = wikiRoot, failOnErrors = false, allowMissingGenerated = false } = {}) {
  const records = listMarkdownFiles(root).map(parseRecord).filter(Boolean);
  const inspection = inspectWiki(records, root, { allowMissingGenerated });
  const graph = semanticGraph(records, inspection, root);
  const health = healthReport(records, inspection, graph);
  if (failOnErrors && inspection.errors.length) {
    throw new Error(inspection.errors.join("\n"));
  }
  return { records, inspection, graph, health };
}

export function graphFingerprint(graph) {
  const semantic = { ...graph, sourceCommit: undefined };
  return hashParts([JSON.stringify(semantic)]);
}

export function backlinksFor(graph) {
  const backlinks = {};
  for (const node of graph.nodes) backlinks[node.id] = [];
  for (const edge of graph.edges) {
    backlinks[edge.to].push({ from: edge.from, type: edge.type, source: edge.source, href: edge.href });
  }
  for (const value of Object.values(backlinks)) {
    value.sort((a, b) => `${a.from}|${a.type}|${a.href}`.localeCompare(`${b.from}|${b.type}|${b.href}`));
  }
  return backlinks;
}

export function wikiIndex(graph) {
  const byKind = {};
  const byStatus = {};
  for (const node of graph.nodes) {
    (byKind[node.kind] ??= []).push(node.id);
    (byStatus[node.status] ??= []).push(node.id);
  }
  return {
    schemaVersion: 1,
    sourceFingerprint: graph.sourceFingerprint,
    byKind,
    byStatus,
    aliases: Object.fromEntries(
      graph.nodes.flatMap((node) => node.aliases.map((alias) => [alias.toLowerCase(), node.id])).sort(([a], [b]) => a.localeCompare(b))
    )
  };
}

export function renderHealthMarkdown(health, graph) {
  const lines = [
    "# Knowledge Wiki health",
    "",
    "> Generated file. Do not edit directly.",
    "",
    `- Source commit: \`${graph.sourceCommit}\``,
    `- Source fingerprint: \`${graph.sourceFingerprint}\``,
    `- Hard gates: **${health.hardGates.status.toUpperCase()}**`,
    `- Records: ${health.diagnostics.records}`,
    `- Typed relations: ${health.diagnostics.typedRelations}`,
    `- Prose links: ${health.diagnostics.proseLinks}`,
    `- Discoverable and reachable: ${health.diagnostics.reachableDiscoverableRecords}/${health.diagnostics.discoverableRecords}`,
    `- Maximum path from Start Here: ${health.diagnostics.maximumRootDistance}`,
    "",
    "## Hard failures",
    ""
  ];
  if (health.hardGates.failures.length) lines.push(...health.hardGates.failures.map((failure) => `- ${failure}`));
  else lines.push("- None.");
  lines.push("", "## Diagnostics", "");
  lines.push(`- Type-aware orphans: ${health.diagnostics.typeAwareOrphans.length}`);
  lines.push(`- Dead ends: ${health.diagnostics.deadEnds.length}`);
  lines.push(`- Wanted pages: ${health.diagnostics.wantedPages.length}`);
  lines.push(`- Stale records: ${health.diagnostics.staleRecords.length}`);
  lines.push(`- Rights backlog: ${health.diagnostics.rightsBacklog.length}`);
  lines.push(`- Human-review backlog: ${health.diagnostics.humanReviewBacklog.length}`);
  if (health.diagnostics.warnings.length) lines.push(...health.diagnostics.warnings.map((warning) => `- Warning: ${warning}`));
  lines.push("", "## Manual authority gates", "");
  for (const [gate, status] of Object.entries(health.manualAuthorityGates)) lines.push(`- ${gate}: \`${status}\``);
  lines.push("", "Automation does not convert these human decisions into completion.");
  return lines.join("\n");
}

export function generatedArtifacts(wiki) {
  const backlinks = backlinksFor(wiki.graph);
  const index = wikiIndex(wiki.graph);
  const nodeById = new Map(wiki.graph.nodes.map((node) => [node.id, node]));
  const backlinkLines = ["# Knowledge Wiki backlinks", "", "> Generated file. Do not edit directly.", ""];
  for (const node of wiki.graph.nodes) {
    const links = backlinks[node.id] ?? [];
    backlinkLines.push(`## ${node.title}`, "", `Target: [${node.id}](../../../${node.path})`, "");
    if (!links.length) backlinkLines.push("- No inbound governed links.", "");
    else {
      for (const link of links) {
        const source = nodeById.get(link.from);
        backlinkLines.push(`- [${source?.title ?? link.from}](../../../${source?.path}) — \`${link.type}\` from \`${link.source}\``);
      }
      backlinkLines.push("");
    }
  }
  while (backlinkLines.at(-1) === "") backlinkLines.pop();
  const navigationLines = [
    "# Knowledge Wiki navigation diagnostics",
    "",
    "> Generated file. Do not edit directly.",
    "",
    `- Discoverable and reachable: ${wiki.health.diagnostics.reachableDiscoverableRecords}/${wiki.health.diagnostics.discoverableRecords}`,
    `- Maximum path from Start Here: ${wiki.health.diagnostics.maximumRootDistance}`,
    "",
    "## Type-aware orphans",
    ""
  ];
  if (wiki.health.diagnostics.typeAwareOrphans.length) {
    for (const item of wiki.health.diagnostics.typeAwareOrphans) navigationLines.push(`- \`${item.id}\` (${item.kind})`);
  } else navigationLines.push("- None.");
  navigationLines.push("", "## Dead ends", "");
  if (wiki.health.diagnostics.deadEnds.length) {
    for (const item of wiki.health.diagnostics.deadEnds) navigationLines.push(`- \`${item.id}\` (${item.kind}); intentional leaf: ${item.intentionalLeaf ? "yes" : "no"}`);
  } else navigationLines.push("- None.");
  navigationLines.push("", "## Wanted pages", "");
  if (wiki.health.diagnostics.wantedPages.length) {
    for (const item of wiki.health.diagnostics.wantedPages) navigationLines.push(`- \`${item.id}\``);
  } else navigationLines.push("- None in the bounded pilot.");
  const delta = {
    schemaVersion: 1,
    sourceFingerprint: wiki.graph.sourceFingerprint,
    baseline: null,
    note: "Foundation baseline: every governed node and edge is new to the Wiki Graph.",
    nodesAdded: wiki.graph.nodes.map((node) => node.id),
    nodesRemoved: [],
    edgesAdded: wiki.graph.edges.map((edge) => `${edge.from}|${edge.type}|${edge.to}`),
    edgesRemoved: [],
    newPublicProjections: wiki.graph.nodes.filter((node) => node.allowedSurfaces.length).map((node) => node.id),
    rightsChanges: wiki.graph.nodes.filter((node) => node.rightsState).map((node) => ({ id: node.id, rightsState: node.rightsState }))
  };
  return {
    "wiki-graph.json": `${JSON.stringify(wiki.graph, null, 2)}\n`,
    "wiki-index.json": `${JSON.stringify(index, null, 2)}\n`,
    "wiki-backlinks.json": `${JSON.stringify(backlinks, null, 2)}\n`,
    "wiki-backlinks.md": `${backlinkLines.join("\n")}\n`,
    "wiki-health.json": `${JSON.stringify(wiki.health, null, 2)}\n`,
    "wiki-health.md": `${renderHealthMarkdown(wiki.health, wiki.graph)}\n`,
    "wiki-navigation.md": `${navigationLines.join("\n")}\n`,
    "wiki-delta.json": `${JSON.stringify(delta, null, 2)}\n`
  };
}

export function writeGeneratedArtifacts(wiki, output = generatedRoot) {
  mkdirSync(output, { recursive: true });
  const artifacts = generatedArtifacts(wiki);
  for (const [name, content] of Object.entries(artifacts)) writeFileSync(path.join(output, name), content);
  return Object.keys(artifacts).map((name) => path.join(output, name));
}

export function checkGeneratedArtifacts(wiki, output = generatedRoot) {
  const expected = generatedArtifacts(wiki);
  const errors = [];
  for (const [name, content] of Object.entries(expected)) {
    const file = path.join(output, name);
    if (!existsSync(file)) errors.push(`Missing generated artifact ${relativeToRepo(file)}`);
    else if (readFileSync(file, "utf8") !== content) errors.push(`Stale generated artifact ${relativeToRepo(file)}`);
  }
  return errors;
}

export function queryWiki(wiki, options = {}) {
  let nodes = wiki.graph.nodes;
  if (options.id) nodes = nodes.filter((node) => node.id === options.id || node.aliases.map((alias) => alias.toLowerCase()).includes(options.id.toLowerCase()));
  if (options.kind) nodes = nodes.filter((node) => node.kind === options.kind);
  if (options.status) nodes = nodes.filter((node) => node.status === options.status);
  if (options.visibility) nodes = nodes.filter((node) => node.visibility === options.visibility);
  if (options.surface) nodes = nodes.filter((node) => node.allowedSurfaces.includes(options.surface));
  if (options.canonicalRef) nodes = nodes.filter((node) => node.canonicalRefs.includes(options.canonicalRef));
  if (options.backlinks) {
    const backlinks = backlinksFor(wiki.graph)[options.backlinks] ?? [];
    return { query: options, nodes: [], backlinks };
  }
  return { query: options, nodes, backlinks: [] };
}

export function candidateFingerprint(paths) {
  const parts = [];
  for (const target of paths.sort()) {
    const absolute = path.join(repoRoot, target);
    if (!existsSync(absolute)) continue;
    if (statSync(absolute).isDirectory()) {
      for (const file of listMarkdownFiles(absolute)) parts.push(`${relativeToRepo(file)}\n${readFileSync(file, "utf8")}`);
    } else parts.push(`${target}\n${readFileSync(absolute, "utf8")}`);
  }
  return hashParts(parts);
}
