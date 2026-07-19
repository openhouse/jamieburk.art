import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import matter from "gray-matter";
import remarkParse from "remark-parse";
import { unified } from "unified";
import { z } from "zod";

import { employmentReportPaths } from "./employment-lib.mjs";

export const defaultRepoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../.."
);

export const wikiRelativeRoot = "docs/knowledge-bank";
export const generatedRelativeRoot = `${wikiRelativeRoot}/_generated`;

export const recordKinds = [
  "project",
  "person",
  "organization",
  "event",
  "place",
  "source",
  "asset",
  "claim",
  "research-run",
  "research-inquiry",
  "decision",
  "correction",
  "method",
  "timeline",
  "application",
  "evaluation",
  "index",
  "glossary",
  "anti-claim",
  "capability",
  "opportunity",
  "projection"
];

export const relationTypes = [
  "part_of",
  "informed_by",
  "resulted_in",
  "supports",
  "contradicts",
  "supersedes",
  "documents",
  "mentions",
  "participated_in",
  "organized_by",
  "collaborated_with",
  "uses_source",
  "uses_method",
  "has_asset",
  "located_at",
  "projected_to",
  "related_to"
];

const lifecycleValues = [
  "inbox",
  "draft",
  "maintained",
  "governed-open",
  "superseded",
  "archived",
  "retired"
];

const visibilityValues = [
  "public",
  "public-safe",
  "summary-only",
  "internal",
  "restricted",
  "private",
  "permission-required"
];

const stableIdSchema = z
  .string()
  .regex(/^[a-z0-9]+(?:[.-][a-z0-9]+)*$/, "use a stable lowercase dotted ID");

const relationSchema = z.object({
  type: z.enum(relationTypes),
  target: stableIdSchema,
  href: z.string().min(1),
  context: z.string().min(1).optional(),
  evidence: z.array(stableIdSchema).optional()
});

const evidenceSchema = z.object({
  target: stableIdSchema,
  relationship: z.enum([
    "direct-support",
    "corroborating",
    "context",
    "supports-boundary",
    "contradicts",
    "private-support",
    "documented-negative-search"
  ]),
  confidence: z.enum(["high", "moderate", "limited"]),
  supports: z.array(z.string().min(1)).min(1)
});

const projectionSchema = z.object({
  status: z.enum(["active", "hold", "pending", "deprecated", "disallowed"]),
  surfaces: z.array(z.string())
});

const wantedSchema = z.object({
  id: stableIdSchema,
  proposed_title: z.string().min(1),
  reason: z.string().min(1)
});

const opportunityRequirementSchema = z.object({
  id: stableIdSchema,
  importance: z.enum(["critical", "important", "context"]),
  kind: z.enum(["capability", "artifact", "screen", "condition"]),
  text: z.string().min(1),
  wiki_evidence: z.array(stableIdSchema).default([]),
  public_evidence: z
    .array(
      z.object({
        route: z.string().startsWith("/"),
        needle: z.string().min(1)
      })
    )
    .default([]),
  status: z.enum([
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
  ]),
  gap_type: z.enum([
    "none",
    "retrieval",
    "source",
    "modeling",
    "wording",
    "public-projection",
    "experience",
    "hard-screen",
    "role-context",
    "rights-or-consent"
  ]),
  next_action: z.string().min(1)
});

const opportunityScreenSchema = z.object({
  id: stableIdSchema,
  text: z.string().min(1),
  state: z.enum(["met", "likely-met", "review-needed", "not-met", "unknown"]),
  disposition: z.enum(["proceed", "verify", "conditional", "do-not-pursue"])
});

export const wikiRecordSchema = z
  .object({
    id: stableIdSchema,
    title: z.string().min(1),
    kind: z.enum(recordKinds),
    status: z.enum(lifecycleValues),
    visibility: z.enum(visibilityValues),
    sensitivity: z.enum(["low", "moderate", "high", "critical"]),
    last_reviewed: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    review_by: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    aliases: z.array(z.string().min(1)).default([]),
    canonical_path: z.string().min(1),
    summary: z.string().min(1),
    relations: z.array(relationSchema).default([]),
    evidence: z.array(evidenceSchema).default([]),
    wanted: z.array(wantedSchema).default([]),
    projection: projectionSchema.optional(),
    projection_status: z
      .enum(["active", "hold", "pending", "deprecated", "disallowed"])
      .optional(),
    registry_ids: z.array(z.string().min(1)).default([]),
    anti_claims: z.array(z.string().min(1)).default([]),
    human_review: z
      .enum([
        "not-requested",
        "requested",
        "scheduled",
        "completed",
        "human-blocked",
        "resolved",
        "governed-open"
      ])
      .optional(),
    rights_state: z
      .enum(["cleared", "permission-needed", "unknown", "do-not-publish"])
      .optional(),
    consent_state: z
      .enum(["cleared", "review-needed", "not-applicable", "do-not-publish"])
      .optional(),
    public_display_status: z
      .enum(["cleared", "metadata-only", "hold", "do-not-publish"])
      .optional(),
    claim_status: z
      .enum([
        "confirmed",
        "confirmed-with-boundary",
        "use-with-care",
        "inference",
        "not-recovered",
        "disallowed"
      ])
      .optional(),
    credit_scope: z
      .enum(["individual", "shared", "collective", "institutional", "individual-and-collective"])
      .optional(),
    canonical_url: z.string().url().optional(),
    source_type: z.enum(["official-employer", "official-public-data", "protected-metadata"]).optional(),
    opportunity_status: z.enum(["live", "closed", "historical-benchmark", "conditional"]).optional(),
    verified_at: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    role_requirements: z.array(opportunityRequirementSchema).default([]),
    hard_screens: z.array(opportunityScreenSchema).default([]),
    portfolio_routes: z.array(z.string().startsWith("/")).default([]),
    discovery_terms: z.array(z.string().min(1)).default([]),
    confirmed_facts: z.array(z.string().min(1)).default([]),
    inferences: z.array(z.string().min(1)).default([]),
    unknowns: z.array(z.string().min(1)).default([]),
    one_year_success_conditions: z.array(z.string().min(1)).default([]),
    one_year_risk_conditions: z.array(z.string().min(1)).default([]),
    interview_questions: z.array(z.string().min(1)).default([])
  })
  .passthrough()
  .superRefine((record, context) => {
    if (record.kind === "claim" && !record.claim_status) {
      context.addIssue({ code: "custom", path: ["claim_status"], message: "claim records require claim_status" });
    }
    if (record.kind === "claim" && record.evidence.length === 0) {
      context.addIssue({ code: "custom", path: ["evidence"], message: "claim records require evidence" });
    }
    if (record.kind === "asset") {
      for (const field of ["rights_state", "consent_state", "public_display_status"]) {
        if (!record[field]) {
          context.addIssue({ code: "custom", path: [field], message: `asset records require ${field}` });
        }
      }
    }
    if (record.kind === "projection" && !record.projection_status) {
      context.addIssue({ code: "custom", path: ["projection_status"], message: "projection records require projection_status" });
    }
    if (record.kind === "source" && !record.source_kind) {
      context.addIssue({ code: "custom", path: ["source_kind"], message: "source records require source_kind" });
    }
    if (record.kind === "correction") {
      for (const field of ["previous_text", "replacement_text", "reason", "affected_surfaces"]) {
        if (!record[field] || (Array.isArray(record[field]) && record[field].length === 0)) {
          context.addIssue({ code: "custom", path: [field], message: `correction records require ${field}` });
        }
      }
    }
    if (record.kind === "opportunity") {
      for (const field of ["canonical_url", "source_type", "opportunity_status", "verified_at", "review_by"]) {
        if (!record[field]) {
          context.addIssue({ code: "custom", path: [field], message: `opportunity records require ${field}` });
        }
      }
      if (record.role_requirements.length === 0) {
        context.addIssue({ code: "custom", path: ["role_requirements"], message: "opportunity records require role requirements" });
      }
      if (record.hard_screens.length === 0) {
        context.addIssue({ code: "custom", path: ["hard_screens"], message: "opportunity records require explicit hard-screen review" });
      }
      if (record.portfolio_routes.length === 0) {
        context.addIssue({ code: "custom", path: ["portfolio_routes"], message: "opportunity records require public routes to review" });
      }
      if (record.discovery_terms.length < 3) {
        context.addIssue({ code: "custom", path: ["discovery_terms"], message: "opportunity records require at least three title-blind discovery terms" });
      }
      const requirementIds = record.role_requirements.map((item) => item.id);
      if (new Set(requirementIds).size !== requirementIds.length) {
        context.addIssue({ code: "custom", path: ["role_requirements"], message: "requirement IDs must be unique within an opportunity" });
      }
    }
  });

const privatePattern =
  /(?:\/Users\/|\/Volumes\/|Mobile Documents|supporting-materials|Library\/CloudStorage|\.docx\b|\.xlsx\b|BEGIN (?:RSA |OPENSSH )?PRIVATE KEY)/i;

const generatedOutputs = [
  "reports/wiki-graph.json",
  "reports/wiki-health.json",
  "reports/wiki-health.md",
  "reports/wiki-graph-delta.md",
  `${generatedRelativeRoot}/index-by-kind.md`,
  `${generatedRelativeRoot}/orphans.md`,
  `${generatedRelativeRoot}/dead-ends.md`,
  `${generatedRelativeRoot}/wanted-pages.md`,
  `${generatedRelativeRoot}/corrections.md`,
  `${generatedRelativeRoot}/rights-review.md`,
  ...employmentReportPaths
];

function normalizeYaml(value) {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (Array.isArray(value)) return value.map(normalizeYaml);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, normalizeYaml(item)]));
  }
  return value;
}

function walkFiles(root, predicate = () => true) {
  if (!existsSync(root)) return [];
  return readdirSync(root, { withFileTypes: true })
    .sort((a, b) => a.name.localeCompare(b.name))
    .flatMap((entry) => {
      const absolute = path.join(root, entry.name);
      if (entry.isDirectory()) return walkFiles(absolute, predicate);
      return entry.isFile() && predicate(absolute) ? [absolute] : [];
    });
}

function visit(node, callback) {
  callback(node);
  if (Array.isArray(node.children)) {
    for (const child of node.children) visit(child, callback);
  }
}

function nodeText(node) {
  if (typeof node.value === "string") return node.value;
  if (typeof node.alt === "string") return node.alt;
  return Array.isArray(node.children) ? node.children.map(nodeText).join("") : "";
}

function baseSlug(value) {
  return value
    .normalize("NFKD")
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s_-]/gu, "")
    .replace(/\s+/g, "-");
}

function parseMarkdown(content) {
  const tree = unified().use(remarkParse).parse(content);
  const headings = new Set();
  const slugCounts = new Map();
  const links = [];

  visit(tree, (node) => {
    if (node.type === "heading") {
      const raw = baseSlug(nodeText(node));
      const count = slugCounts.get(raw) ?? 0;
      slugCounts.set(raw, count + 1);
      headings.add(count === 0 ? raw : `${raw}-${count}`);
    }
    if ((node.type === "link" || node.type === "image") && typeof node.url === "string") {
      links.push({
        url: node.url,
        line: node.position?.start?.line ?? 1,
        kind: node.type
      });
    }
  });

  return { headings, links };
}

function posix(value) {
  return value.split(path.sep).join("/");
}

function relativeTo(root, absolute) {
  return posix(path.relative(root, absolute));
}

function normalizeAlias(value) {
  return value.normalize("NFKC").trim().toLocaleLowerCase("en-US");
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function sourceMetadata(repoRoot, override) {
  if (override) return override;

  let sourceCommit = "working-tree";
  try {
    sourceCommit = execFileSync(
      "git",
      [
        "log",
        "-1",
        "--format=%H",
        "--",
        "package.json",
        "package-lock.json",
        ".vscode",
        "docs/architecture",
        "docs/knowledge-bank",
        "scripts/knowledge-wiki",
        "evals/knowledge-wiki",
        ":(exclude)docs/knowledge-bank/_generated/**"
      ],
      { cwd: repoRoot, encoding: "utf8" }
    ).trim();
  } catch {
    // Temporary test repositories use the deterministic fallback below.
  }

  let generatedAt = "1970-01-01T00:00:00Z";
  if (sourceCommit !== "working-tree") {
    try {
      generatedAt = execFileSync("git", ["show", "-s", "--format=%cI", sourceCommit], {
        cwd: repoRoot,
        encoding: "utf8"
      }).trim();
    } catch {
      // Keep the deterministic fallback.
    }
  }

  return { sourceCommit, generatedAt };
}

function makeIssue(code, message, file, line, severity = "error") {
  return { code, message, file, line, severity };
}

function resolveLocalLink(repoRoot, sourcePath, rawUrl) {
  const withoutQuery = rawUrl.split("?")[0];
  const hashIndex = withoutQuery.indexOf("#");
  const rawPath = hashIndex >= 0 ? withoutQuery.slice(0, hashIndex) : withoutQuery;
  const fragment = hashIndex >= 0 ? decodeURIComponent(withoutQuery.slice(hashIndex + 1)) : "";
  const decodedPath = decodeURIComponent(rawPath);
  const sourceAbsolute = path.join(repoRoot, sourcePath);
  const targetAbsolute = decodedPath
    ? path.resolve(path.dirname(sourceAbsolute), decodedPath)
    : sourceAbsolute;
  return {
    targetAbsolute,
    targetPath: relativeTo(repoRoot, targetAbsolute),
    fragment
  };
}

function isExternalLink(url) {
  return /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(url);
}

function relationShapeAllowed(fromKind, type, toKind) {
  if (["related_to", "mentions", "contradicts", "collaborated_with"].includes(type)) return true;
  const shapes = {
    part_of: ["project", "event", "organization", "timeline", "application"],
    informed_by: ["event", "source", "method", "research-run", "research-inquiry"],
    resulted_in: ["project", "event", "decision", "correction"],
    supports: ["claim", "capability", "opportunity"],
    supersedes: ["claim", "correction", "decision", "projection"],
    documents: ["project", "event", "claim", "method"],
    participated_in: ["event", "project", "organization"],
    organized_by: ["person", "organization"],
    uses_source: ["source", "asset", "research-run"],
    uses_method: ["method"],
    has_asset: ["asset"],
    located_at: ["place"],
    projected_to: ["projection"]
  };
  if (!shapes[type]?.includes(toKind)) return false;
  if (type === "supports") return ["project", "source", "claim", "method", "capability"].includes(fromKind);
  if (type === "supersedes") return ["correction", "claim", "decision"].includes(fromKind);
  if (type === "documents") return ["source", "asset", "research-run"].includes(fromKind);
  return true;
}

function humanGates() {
  return [
    { id: "collaborator-review", state: "governed-open", authority: "named collaborators" },
    { id: "media-rights-and-consent", state: "human-blocked", authority: "rights holders and depicted people" },
    { id: "retrieval-task-study", state: "not-requested", authority: "fresh human readers" },
    { id: "editorial-projection-approval", state: "governed-open", authority: "Jamie and relevant editors" },
    { id: "production-observation", state: "not-requested", authority: "deployment owner" },
    { id: "hiring-outcomes", state: "not-requested", authority: "external readers and employers" }
  ];
}

export function compileWiki(options = {}) {
  const repoRoot = options.repoRoot ?? defaultRepoRoot;
  const wikiRoot = path.join(repoRoot, options.wikiRelativeRoot ?? wikiRelativeRoot);
  const now = options.now ?? "2026-07-18";
  const metadata = sourceMetadata(repoRoot, options.sourceMetadata);
  const issues = [];
  const markdownFiles = walkFiles(
    wikiRoot,
    (file) => /\.md$/i.test(file) && !file.includes(`${path.sep}_generated${path.sep}`)
  );
  const parsedByPath = new Map();
  const records = [];

  for (const absolute of markdownFiles) {
    const sourcePath = relativeTo(repoRoot, absolute);
    const raw = readFileSync(absolute, "utf8");
    const parsedMatter = matter(raw);
    const markdown = parseMarkdown(parsedMatter.content);
    parsedByPath.set(sourcePath, { ...markdown, raw, content: parsedMatter.content });

    if (privatePattern.test(raw)) {
      issues.push(makeIssue("PRIVATE_PATH", "public repository text contains a protected path or raw-source marker", sourcePath, 1));
    }

    if (raw.includes("GENERATED FILE. DO NOT EDIT.")) {
      issues.push(makeIssue("GENERATED_AS_AUTHORED", "a generated file cannot be a canonical authored record", sourcePath, 1));
    }

    if (!parsedMatter.data.id) continue;
    const normalized = normalizeYaml(parsedMatter.data);
    const result = wikiRecordSchema.safeParse(normalized);
    if (!result.success) {
      for (const schemaIssue of result.error.issues) {
        issues.push(
          makeIssue(
            "SCHEMA",
            `${schemaIssue.path.join(".") || "frontmatter"}: ${schemaIssue.message}`,
            sourcePath,
            1
          )
        );
      }
      continue;
    }

    const record = { ...result.data, path: sourcePath, headings: [...markdown.headings] };
    if (record.canonical_path !== sourcePath) {
      issues.push(makeIssue("CANONICAL_PATH", `canonical_path must be ${sourcePath}`, sourcePath, 1));
    }
    records.push(record);
  }

  const byId = new Map();
  const byPath = new Map();
  for (const record of records) {
    if (byId.has(record.id)) {
      issues.push(makeIssue("DUPLICATE_ID", `duplicate stable ID ${record.id}`, record.path, 1));
    } else {
      byId.set(record.id, record);
    }
    byPath.set(record.path, record);
  }

  const aliasOwner = new Map();
  for (const record of records) {
    const names = [record.id, record.title, ...record.aliases];
    for (const name of names) {
      const normalized = normalizeAlias(name);
      const owner = aliasOwner.get(normalized);
      if (owner && owner !== record.id) {
        issues.push(makeIssue("ALIAS_COLLISION", `alias or title '${name}' collides with ${owner}`, record.path, 1));
      } else {
        aliasOwner.set(normalized, record.id);
      }
    }
  }

  const requirementOwner = new Map();
  for (const record of records.filter((item) => item.kind === "opportunity")) {
    for (const requirement of record.role_requirements) {
      const owner = requirementOwner.get(requirement.id);
      if (owner && owner !== record.id) {
        issues.push(
          makeIssue(
            "DUPLICATE_REQUIREMENT_ID",
            `${requirement.id} is already owned by ${owner}`,
            record.path,
            1
          )
        );
      } else {
        requirementOwner.set(requirement.id, record.id);
      }
      for (const evidenceId of requirement.wiki_evidence) {
        if (!byId.has(evidenceId)) {
          issues.push(
            makeIssue(
              "UNKNOWN_REQUIREMENT_EVIDENCE",
              `${requirement.id} references unknown Wiki evidence ${evidenceId}`,
              record.path,
              1
            )
          );
        }
      }
      for (const publicEvidence of requirement.public_evidence) {
        if (!record.portfolio_routes.includes(publicEvidence.route)) {
          issues.push(
            makeIssue(
              "UNDECLARED_PORTFOLIO_ROUTE",
              `${requirement.id} uses ${publicEvidence.route}, which is absent from portfolio_routes`,
              record.path,
              1
            )
          );
        }
      }
    }
    if (
      record.opportunity_status === "live" &&
      record.hard_screens.some((screen) => screen.state === "not-met" && screen.disposition === "proceed")
    ) {
      issues.push(
        makeIssue(
          "IGNORED_HARD_SCREEN",
          "a live opportunity cannot proceed past a known unmet hard screen",
          record.path,
          1
        )
      );
    }
  }

  const documentLinks = [];
  const virtualGenerated = new Set(generatedOutputs);
  for (const [sourcePath, parsed] of parsedByPath) {
    for (const link of parsed.links) {
      if (isExternalLink(link.url)) continue;
      let resolved;
      try {
        resolved = resolveLocalLink(repoRoot, sourcePath, link.url);
      } catch {
        issues.push(makeIssue("LINK_ENCODING", `cannot decode link ${link.url}`, sourcePath, link.line));
        continue;
      }
      if (resolved.targetPath.startsWith("../") || path.isAbsolute(resolved.targetPath)) {
        issues.push(makeIssue("LINK_ESCAPE", `link leaves the repository: ${link.url}`, sourcePath, link.line));
        continue;
      }
      const targetExists = existsSync(resolved.targetAbsolute) || virtualGenerated.has(resolved.targetPath);
      if (!targetExists) {
        issues.push(makeIssue("BROKEN_LINK", `missing target ${resolved.targetPath}`, sourcePath, link.line));
        continue;
      }
      if (resolved.fragment && existsSync(resolved.targetAbsolute) && /\.md$/i.test(resolved.targetPath)) {
        let targetParsed = parsedByPath.get(resolved.targetPath);
        if (!targetParsed) {
          const targetMatter = matter(readFileSync(resolved.targetAbsolute, "utf8"));
          targetParsed = parseMarkdown(targetMatter.content);
        }
        if (!targetParsed.headings.has(resolved.fragment)) {
          issues.push(
            makeIssue(
              "BROKEN_FRAGMENT",
              `missing heading #${resolved.fragment} in ${resolved.targetPath}`,
              sourcePath,
              link.line
            )
          );
        }
      }
      documentLinks.push({
        fromPath: sourcePath,
        from: byPath.get(sourcePath)?.id ?? null,
        toPath: resolved.targetPath,
        to: byPath.get(resolved.targetPath)?.id ?? null,
        fragment: resolved.fragment || null,
        line: link.line,
        kind: link.kind
      });
    }
  }

  const edges = [];
  for (const record of records) {
    for (const relation of record.relations) {
      const target = byId.get(relation.target);
      if (!target) {
        issues.push(makeIssue("UNKNOWN_RELATION_TARGET", `unknown target ${relation.target}`, record.path, 1));
        continue;
      }
      let resolved;
      try {
        resolved = resolveLocalLink(repoRoot, record.path, relation.href);
      } catch {
        issues.push(makeIssue("RELATION_HREF", `cannot decode relation href ${relation.href}`, record.path, 1));
        continue;
      }
      if (resolved.targetPath !== target.path) {
        issues.push(
          makeIssue(
            "RELATION_HREF_MISMATCH",
            `${relation.target} resolves to ${target.path}, not ${resolved.targetPath}`,
            record.path,
            1
          )
        );
      }
      if (!relationShapeAllowed(record.kind, relation.type, target.kind)) {
        issues.push(
          makeIssue(
            "RELATION_SHAPE",
            `${record.kind} ${relation.type} ${target.kind} is not an allowed relation shape`,
            record.path,
            1
          )
        );
      }
      if (
        relation.type === "mentions" &&
        /\b(?:endorsement|endorses?|approved by)\b/i.test(relation.context ?? "")
      ) {
        issues.push(
          makeIssue(
            "MENTION_ENDORSEMENT",
            "a mention relationship cannot be promoted to endorsement",
            record.path,
            1
          )
        );
      }
      if (
        ["public", "public-safe"].includes(record.visibility) &&
        ["restricted", "private", "permission-required"].includes(target.visibility)
      ) {
        issues.push(
          makeIssue(
            "VISIBILITY_EDGE",
            `public-safe record cannot directly relate to ${target.visibility} record ${target.id}`,
            record.path,
            1
          )
        );
      }
      edges.push({
        from: record.id,
        type: relation.type,
        to: target.id,
        source: "frontmatter",
        href: relation.href,
        context: relation.context ?? null
      });
    }

    for (const evidence of record.evidence) {
      const target = byId.get(evidence.target);
      if (!target) {
        issues.push(makeIssue("INVALID_EVIDENCE_TARGET", `unknown evidence target ${evidence.target}`, record.path, 1));
        continue;
      }
      if (!["source", "asset", "research-run"].includes(target.kind)) {
        issues.push(
          makeIssue(
            "INVALID_EVIDENCE_KIND",
            `evidence target ${target.id} has kind ${target.kind}`,
            record.path,
            1
          )
        );
      }
      if (evidence.relationship === "documented-negative-search" && record.claim_status !== "not-recovered") {
        issues.push(
          makeIssue(
            "NON_RECOVERY_POSITIVE",
            "documented non-recovery cannot be used as positive evidence",
            record.path,
            1
          )
        );
      }
      edges.push({
        from: record.id,
        type: `evidence:${evidence.relationship}`,
        to: target.id,
        source: "evidence",
        confidence: evidence.confidence,
        supports: evidence.supports
      });
    }

    const activeProjection =
      record.projection?.status === "active" || record.projection_status === "active";
    if (
      activeProjection &&
      !["public", "public-safe"].includes(record.visibility)
    ) {
      issues.push(makeIssue("PRIVATE_PROJECTION", `${record.visibility} record is projected as active`, record.path, 1));
    }
    if (
      activeProjection &&
      record.kind === "asset" &&
      (record.rights_state !== "cleared" ||
        !["cleared", "not-applicable"].includes(record.consent_state) ||
        record.public_display_status !== "cleared")
    ) {
      issues.push(makeIssue("RIGHTS_PROJECTION", "rights-pending asset cannot be projected as active", record.path, 1));
    }
    if (activeProjection && ["superseded", "retired"].includes(record.status)) {
      issues.push(makeIssue("SUPERSEDED_PROJECTION", `${record.status} record cannot project as current`, record.path, 1));
    }
    if (
      activeProjection &&
      (["inbox", "draft", "governed-open"].includes(record.status) ||
        ["use-with-care", "inference", "not-recovered", "disallowed"].includes(record.claim_status))
    ) {
      issues.push(makeIssue("PENDING_PROJECTION", "unresolved record cannot be projected as active", record.path, 1));
    }
    if (
      record.credit_scope === "collective" &&
      /\b(?:solely|single-handedly|alone created|alone built)\b/i.test(parsedByPath.get(record.path)?.content ?? "")
    ) {
      issues.push(
        makeIssue(
          "COLLECTIVE_TO_SOLE",
          "collective credit cannot be mutated into sole authorship",
          record.path,
          1
        )
      );
    }
  }

  const semanticOutgoing = new Map(records.map((record) => [record.id, []]));
  for (const edge of edges) semanticOutgoing.get(edge.from)?.push(edge.to);

  const documentOutgoing = new Map(records.map((record) => [record.id, []]));
  for (const link of documentLinks) {
    if (link.from && link.to) documentOutgoing.get(link.from)?.push(link.to);
  }

  const reachable = new Set();
  const queue = byId.has("index.knowledge-wiki") ? ["index.knowledge-wiki"] : [];
  while (queue.length) {
    const current = queue.shift();
    if (reachable.has(current)) continue;
    reachable.add(current);
    for (const target of documentOutgoing.get(current) ?? []) {
      if (!reachable.has(target)) queue.push(target);
    }
  }

  const intentionalLeafKinds = new Set(["source", "asset", "correction"]);
  const orphans = records
    .filter(
      (record) =>
        !reachable.has(record.id) &&
        !intentionalLeafKinds.has(record.kind) &&
        !["archived", "retired"].includes(record.status)
    )
    .map((record) => ({ id: record.id, kind: record.kind, path: record.path, reason: "not reachable from root" }));

  const deadEnds = records
    .filter(
      (record) =>
        (documentOutgoing.get(record.id)?.length ?? 0) === 0 &&
        (semanticOutgoing.get(record.id)?.length ?? 0) === 0 &&
        !intentionalLeafKinds.has(record.kind)
    )
    .map((record) => ({ id: record.id, kind: record.kind, path: record.path }));

  const stale = records
    .filter((record) => record.review_by && record.review_by < now)
    .map((record) => ({ id: record.id, reviewBy: record.review_by, path: record.path }));

  const wanted = records.flatMap((record) =>
    record.wanted.map((item) => ({ ...item, requestedBy: record.id, path: record.path }))
  );
  const corrections = records
    .filter((record) => record.kind === "correction")
    .map((record) => ({ id: record.id, title: record.title, path: record.path, humanReview: record.human_review ?? "not-requested" }));
  const rightsReview = records
    .filter(
      (record) =>
        record.kind === "asset" &&
        (record.rights_state !== "cleared" ||
          !["cleared", "not-applicable"].includes(record.consent_state) ||
          record.public_display_status !== "cleared")
    )
    .map((record) => ({
      id: record.id,
      path: record.path,
      rightsState: record.rights_state,
      consentState: record.consent_state,
      publicDisplayStatus: record.public_display_status
    }));

  for (const orphan of orphans) {
    issues.push(makeIssue("ORPHAN", `${orphan.id} is not reachable from the root`, orphan.path, 1, "warning"));
  }
  for (const item of stale) {
    issues.push(makeIssue("STALE", `${item.id} was due for review on ${item.reviewBy}`, item.path, 1, "warning"));
  }

  const authoredFiles = markdownFiles
    .map((absolute) => ({ path: relativeTo(repoRoot, absolute), content: readFileSync(absolute) }))
    .sort((a, b) => a.path.localeCompare(b.path));
  const fingerprintHash = createHash("sha256");
  for (const file of authoredFiles) {
    fingerprintHash.update(file.path);
    fingerprintHash.update("\0");
    fingerprintHash.update(file.content);
    fingerprintHash.update("\0");
  }
  const sourceFingerprint = fingerprintHash.digest("hex");

  const nodes = records
    .map((record) => ({
      id: record.id,
      path: record.path,
      title: record.title,
      kind: record.kind,
      status: record.status,
      visibility: record.visibility,
      sensitivity: record.sensitivity,
      summary: record.summary,
      aliases: record.aliases,
      lastReviewed: record.last_reviewed,
      reviewBy: record.review_by ?? null
    }))
    .sort((a, b) => a.id.localeCompare(b.id));

  edges.sort((a, b) =>
    `${a.from}\0${a.type}\0${a.to}`.localeCompare(`${b.from}\0${b.type}\0${b.to}`)
  );
  documentLinks.sort((a, b) =>
    `${a.fromPath}\0${a.line}\0${a.toPath}`.localeCompare(`${b.fromPath}\0${b.line}\0${b.toPath}`)
  );

  const byKind = Object.fromEntries(
    recordKinds
      .map((kind) => [kind, records.filter((record) => record.kind === kind).length])
      .filter(([, count]) => count > 0)
  );
  const relationTypeCounts = Object.fromEntries(
    [...new Set(edges.map((edge) => edge.type))]
      .sort()
      .map((type) => [type, edges.filter((edge) => edge.type === type).length])
  );
  const opportunityRecords = records.filter((record) => record.kind === "opportunity");
  const criticalRequirements = opportunityRecords.flatMap((record) =>
    record.role_requirements.filter((requirement) => requirement.importance === "critical")
  );

  const graph = {
    schemaVersion: 1,
    generatedAt: metadata.generatedAt,
    sourceCommit: metadata.sourceCommit,
    sourceFingerprint,
    rootId: "index.knowledge-wiki",
    nodes,
    edges,
    documentLinks
  };

  const errors = issues.filter((issue) => issue.severity === "error");
  const warnings = issues.filter((issue) => issue.severity === "warning");
  const health = {
    schemaVersion: 1,
    generatedAt: metadata.generatedAt,
    sourceCommit: metadata.sourceCommit,
    sourceFingerprint,
    hardGates: {
      passed: errors.length === 0,
      errorCount: errors.length,
      errors
    },
    diagnostics: {
      records: records.length,
      byKind,
      typedRelations: edges.filter((edge) => edge.source === "frontmatter").length,
      evidenceRelations: edges.filter((edge) => edge.source === "evidence").length,
      relationTypeCounts,
      proseLinks: documentLinks.length,
      rootReachable: reachable.size,
      orphanCount: orphans.length,
      deadEndCount: deadEnds.length,
      wantedPageCount: wanted.length,
      stalePageCount: stale.length,
      correctionCount: corrections.length,
      rightsReviewCount: rightsReview.length,
      opportunityCount: opportunityRecords.length,
      liveOpportunityCount: opportunityRecords.filter((record) => record.opportunity_status === "live").length,
      criticalRequirementCount: criticalRequirements.length,
      criticalRequirementGapCount: criticalRequirements.filter((requirement) =>
        !["visible-proven", "visible-qualified"].includes(requirement.status)
      ).length,
      warningCount: warnings.length,
      warnings
    },
    humanGates: humanGates(),
    orphans,
    deadEnds,
    wanted,
    stale,
    corrections,
    rightsReview
  };

  return {
    repoRoot,
    wikiRoot,
    metadata,
    records,
    byId,
    graph,
    health,
    issues,
    errors,
    warnings,
    reachable
  };
}

function generatedHeader(title, result) {
  return `<!-- GENERATED FILE. DO NOT EDIT. -->\n# ${title}\n\n` +
    `**Source commit:** \`${result.metadata.sourceCommit}\`\n` +
    `**Generation time:** ${result.metadata.generatedAt}\n` +
    `**Source fingerprint:** \`${result.graph.sourceFingerprint}\`\n\n`;
}

function markdownLink(fromPath, targetPath, label) {
  const href = posix(path.relative(path.dirname(fromPath), targetPath));
  return `[${label}](${href.startsWith(".") ? href : `./${href}`})`;
}

function healthMarkdown(result) {
  const { health } = result;
  const lines = [
    generatedHeader("Knowledge Wiki health", result).trimEnd(),
    "",
    "Wiki health is reported as hard gates, diagnostics, and human authority gates. These are not averaged into one synthetic score.",
    "",
    "## Hard gates",
    "",
    health.hardGates.passed
      ? "**PASS:** no blocking structural, semantic, evidence, projection, rights, or privacy failures."
      : `**FAIL:** ${health.hardGates.errorCount} blocking failure(s).`,
    ""
  ];
  for (const issue of health.hardGates.errors) {
    lines.push(`- \`${issue.code}\` ${issue.file}:${issue.line} - ${issue.message}`);
  }
  if (!health.hardGates.errors.length) lines.push("- No blocking failures.");
  lines.push(
    "",
    "## Diagnostics",
    "",
    `- Governed records: ${health.diagnostics.records}`,
    `- Typed relations: ${health.diagnostics.typedRelations}`,
    `- Evidence relations: ${health.diagnostics.evidenceRelations}`,
    `- Prose links: ${health.diagnostics.proseLinks}`,
    `- Root-reachable governed records: ${health.diagnostics.rootReachable}`,
    `- Type-aware orphans: ${health.diagnostics.orphanCount}`,
    `- Type-aware dead ends: ${health.diagnostics.deadEndCount}`,
    `- Wanted pages: ${health.diagnostics.wantedPageCount}`,
    `- Stale pages: ${health.diagnostics.stalePageCount}`,
    `- Corrections: ${health.diagnostics.correctionCount}`,
    `- Rights-review queue: ${health.diagnostics.rightsReviewCount}`,
    `- Opportunity records: ${health.diagnostics.opportunityCount}`,
    `- Live opportunity records: ${health.diagnostics.liveOpportunityCount}`,
    `- Critical role requirements: ${health.diagnostics.criticalRequirementCount}`,
    `- Critical requirements requiring source, corroboration, experience, hard-screen, or unknown review: ${health.diagnostics.criticalRequirementGapCount}`,
    "",
    "## Human authority gates",
    ""
  );
  for (const gate of health.humanGates) {
    lines.push(`- **${gate.id}:** \`${gate.state}\` - authority: ${gate.authority}`);
  }
  lines.push(
    "",
    "Automation does not establish comprehension, consent, rights clearance, editorial approval, production observation, or hiring outcomes.",
    ""
  );
  return lines.join("\n");
}

function listMarkdown(title, result, items, render) {
  const lines = [generatedHeader(title, result).trimEnd(), ""];
  if (!items.length) lines.push("- None.");
  for (const item of items) lines.push(`- ${render(item)}`);
  lines.push("");
  return lines.join("\n");
}

function indexByKindMarkdown(result) {
  const outputPath = `${generatedRelativeRoot}/index-by-kind.md`;
  const lines = [generatedHeader("Knowledge Wiki index by kind", result).trimEnd(), ""];
  const groups = Object.groupBy(result.graph.nodes, (node) => node.kind);
  for (const kind of Object.keys(groups).sort()) {
    lines.push(`## ${kind}`, "");
    for (const node of groups[kind]) {
      lines.push(`- ${markdownLink(outputPath, node.path, node.title)} - \`${node.id}\``);
    }
    lines.push("");
  }
  return lines.join("\n");
}

function backlinksOutputs(result) {
  const incoming = new Map(result.records.map((record) => [record.id, []]));
  for (const edge of result.graph.edges) {
    incoming.get(edge.to)?.push({ from: edge.from, type: edge.type, source: edge.source });
  }
  for (const link of result.graph.documentLinks) {
    if (link.from && link.to) incoming.get(link.to)?.push({ from: link.from, type: "prose_link", source: "markdown" });
  }

  return Object.fromEntries(
    result.records.map((record) => {
      const outputPath = `${generatedRelativeRoot}/backlinks/${record.id}.md`;
      const lines = [generatedHeader(`Backlinks to ${record.title}`, result).trimEnd(), ""];
      const entries = incoming.get(record.id).sort((a, b) =>
        `${a.from}\0${a.type}`.localeCompare(`${b.from}\0${b.type}`)
      );
      if (!entries.length) lines.push("- None.");
      for (const entry of entries) {
        const source = result.byId.get(entry.from);
        lines.push(`- ${markdownLink(outputPath, source.path, source.title)} - \`${entry.type}\` (${entry.source})`);
      }
      lines.push("");
      return [outputPath, lines.join("\n")];
    })
  );
}

function graphDeltaMarkdown(result, baseGraph) {
  const baseNodes = new Map((baseGraph?.nodes ?? []).map((node) => [node.id, node]));
  const currentNodes = new Map(result.graph.nodes.map((node) => [node.id, node]));
  const baseEdges = new Set((baseGraph?.edges ?? []).map((edge) => `${edge.from}\0${edge.type}\0${edge.to}`));
  const currentEdges = new Set(result.graph.edges.map((edge) => `${edge.from}\0${edge.type}\0${edge.to}`));
  const addedNodes = [...currentNodes.keys()].filter((id) => !baseNodes.has(id)).sort();
  const removedNodes = [...baseNodes.keys()].filter((id) => !currentNodes.has(id)).sort();
  const addedEdges = [...currentEdges].filter((key) => !baseEdges.has(key)).sort();
  const removedEdges = [...baseEdges].filter((key) => !currentEdges.has(key)).sort();
  const lines = [
    generatedHeader("Knowledge Wiki graph delta", result).trimEnd(),
    "",
    baseGraph
      ? "Compared with the graph artifact on `origin/develop`."
      : "`origin/develop` has no Knowledge Wiki graph artifact; the bounded pilot is reported as an addition.",
    "",
    `- Nodes added: ${addedNodes.length}`,
    `- Nodes removed: ${removedNodes.length}`,
    `- Edges added: ${addedEdges.length}`,
    `- Edges removed: ${removedEdges.length}`,
    `- New type-aware orphans: ${result.health.orphans.length}`,
    `- Current rights-review records: ${result.health.rightsReview.length}`,
    "",
    "## Added nodes",
    "",
    ...(addedNodes.length ? addedNodes.map((id) => `- \`${id}\``) : ["- None."]),
    ""
  ];
  return lines.join("\n");
}

function loadBaseGraph(repoRoot) {
  try {
    return JSON.parse(
      execFileSync("git", ["show", "origin/develop:reports/wiki-graph.json"], {
        cwd: repoRoot,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"]
      })
    );
  } catch {
    return null;
  }
}

export function buildGeneratedOutputs(result) {
  const outputs = {
    "reports/wiki-graph.json": `${JSON.stringify(result.graph, null, 2)}\n`,
    "reports/wiki-health.json": `${JSON.stringify(result.health, null, 2)}\n`,
    "reports/wiki-health.md": healthMarkdown(result),
    "reports/wiki-graph-delta.md": graphDeltaMarkdown(result, loadBaseGraph(result.repoRoot)),
    [`${generatedRelativeRoot}/index-by-kind.md`]: indexByKindMarkdown(result),
    [`${generatedRelativeRoot}/orphans.md`]: listMarkdown(
      "Type-aware orphans",
      result,
      result.health.orphans,
      (item) => `\`${item.id}\` (${item.kind}) - ${item.reason}`
    ),
    [`${generatedRelativeRoot}/dead-ends.md`]: listMarkdown(
      "Type-aware dead ends",
      result,
      result.health.deadEnds,
      (item) => `\`${item.id}\` (${item.kind})`
    ),
    [`${generatedRelativeRoot}/wanted-pages.md`]: listMarkdown(
      "Wanted pages",
      result,
      result.health.wanted,
      (item) => `\`${item.id}\` - ${item.proposed_title}; requested by \`${item.requestedBy}\`: ${item.reason}`
    ),
    [`${generatedRelativeRoot}/corrections.md`]: listMarkdown(
      "Corrections",
      result,
      result.health.corrections,
      (item) => `${markdownLink(`${generatedRelativeRoot}/corrections.md`, item.path, item.title)} - \`${item.humanReview}\``
    ),
    [`${generatedRelativeRoot}/rights-review.md`]: listMarkdown(
      "Rights and consent review",
      result,
      result.health.rightsReview,
      (item) => `\`${item.id}\` - rights \`${item.rightsState}\`, consent \`${item.consentState}\`, display \`${item.publicDisplayStatus}\``
    ),
    ...backlinksOutputs(result)
  };
  return Object.fromEntries(Object.entries(outputs).sort(([a], [b]) => a.localeCompare(b)));
}

export function writeGeneratedOutputs(result, mode = "all") {
  const outputs = buildGeneratedOutputs(result);
  for (const [relativePath, content] of Object.entries(outputs)) {
    const isGraph = relativePath === "reports/wiki-graph.json";
    if (mode === "graph" && !isGraph) continue;
    if (mode === "report" && isGraph) continue;
    const absolute = path.join(result.repoRoot, relativePath);
    mkdirSync(path.dirname(absolute), { recursive: true });
    writeFileSync(absolute, content);
  }
  return outputs;
}

export function checkGeneratedOutputs(result) {
  const expected = buildGeneratedOutputs(result);
  const issues = [];
  for (const [relativePath, content] of Object.entries(expected)) {
    const absolute = path.join(result.repoRoot, relativePath);
    if (!existsSync(absolute)) {
      issues.push(makeIssue("GENERATED_MISSING", "generated output is missing", relativePath, 1));
      continue;
    }
    if (readFileSync(absolute, "utf8") !== content) {
      issues.push(makeIssue("GENERATED_STALE", "generated output is stale; run wiki:graph and wiki:report", relativePath, 1));
    }
  }
  return issues;
}

export function queryWiki(result, query) {
  if (query.id) {
    const record = result.byId.get(query.id);
    return record ? { query: "id", record } : { query: "id", record: null };
  }
  if (query.sourcesForClaim) {
    return {
      query: "sources-for-claim",
      claim: query.sourcesForClaim,
      sources: result.graph.edges
        .filter((edge) => edge.from === query.sourcesForClaim && edge.source === "evidence")
        .map((edge) => result.byId.get(edge.to))
        .filter(Boolean)
    };
  }
  if (query.claimsForSource) {
    return {
      query: "claims-for-source",
      source: query.claimsForSource,
      claims: result.graph.edges
        .filter((edge) => edge.to === query.claimsForSource && edge.source === "evidence")
        .map((edge) => result.byId.get(edge.from))
        .filter(Boolean)
    };
  }
  if (query.backlinks) {
    return {
      query: "backlinks",
      target: query.backlinks,
      backlinks: [
        ...result.graph.edges
          .filter((edge) => edge.to === query.backlinks)
          .map((edge) => ({ from: edge.from, type: edge.type, source: edge.source })),
        ...result.graph.documentLinks
          .filter((link) => link.to === query.backlinks && link.from)
          .map((link) => ({ from: link.from, type: "prose_link", source: "markdown" }))
      ]
    };
  }
  if (query.projectedTo) {
    return {
      query: "projected-to",
      target: query.projectedTo,
      records: result.graph.edges
        .filter((edge) => edge.type === "projected_to" && edge.to === query.projectedTo)
        .map((edge) => result.byId.get(edge.from))
    };
  }
  if (query.rightsPending) {
    return { query: "rights-pending", records: result.health.rightsReview };
  }
  if (query.corrections) {
    return { query: "corrections", records: result.health.corrections };
  }
  if (query.opportunity) {
    const opportunity = result.byId.get(query.opportunity);
    const connected = result.graph.edges
      .filter((edge) => edge.from === query.opportunity || edge.to === query.opportunity)
      .flatMap((edge) => [edge.from, edge.to])
      .filter((id) => id !== query.opportunity);
    return {
      query: "opportunity",
      opportunity: opportunity ?? null,
      connected: [...new Set(connected)].sort().map((id) => result.byId.get(id)).filter(Boolean)
    };
  }
  if (query.liveOpportunities) {
    return {
      query: "live-opportunities",
      records: result.records
        .filter((record) => record.kind === "opportunity" && record.opportunity_status === "live")
        .sort((a, b) => a.review_by.localeCompare(b.review_by) || a.title.localeCompare(b.title))
    };
  }
  if (query.requirement) {
    for (const opportunity of result.records.filter((record) => record.kind === "opportunity")) {
      const requirement = opportunity.role_requirements.find((item) => item.id === query.requirement);
      if (requirement) {
        return { query: "requirement", opportunity, requirement };
      }
    }
    return { query: "requirement", opportunity: null, requirement: null };
  }
  return { query: "help" };
}

export function semanticGraphFingerprint(graph) {
  const semantic = {
    schemaVersion: graph.schemaVersion,
    sourceFingerprint: graph.sourceFingerprint,
    rootId: graph.rootId,
    nodes: graph.nodes,
    edges: graph.edges,
    documentLinks: graph.documentLinks
  };
  return sha256(JSON.stringify(semantic));
}
