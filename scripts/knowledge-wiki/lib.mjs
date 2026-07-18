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
import remarkParse from "remark-parse";
import { unified } from "unified";
import { visit } from "unist-util-visit";

import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import { proofClaims } from "../../apps/www/src/data/proofs.ts";

export const REPO_ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../.."
);
export const WIKI_ROOT = path.join(REPO_ROOT, "docs/knowledge-bank");
export const ROOT_ID = "index.knowledge-wiki";

export const ALLOWED_KINDS = new Set([
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
]);

export const ALLOWED_STATUSES = new Set([
  "inbox",
  "draft",
  "maintained",
  "governed-open",
  "superseded",
  "archived",
  "retired",
  "not-recovered"
]);

export const ALLOWED_VISIBILITIES = new Set([
  "public",
  "public-safe",
  "summary-only",
  "internal",
  "restricted",
  "private",
  "permission-required"
]);

export const ALLOWED_SENSITIVITIES = new Set([
  "low",
  "moderate",
  "high",
  "critical"
]);

export const ALLOWED_RELATIONS = new Set([
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
]);

const PRIVATE_PATH_PATTERN =
  /(?:\/Users\/|\/Volumes\/|Mobile Documents|supporting-materials|file:\/\/|[A-Za-z]:\\Users\\)/i;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const ID_PATTERN = /^[a-z0-9]+(?:[.-][a-z0-9]+)*$/;
const PROTECTED_VISIBILITIES = new Set([
  "restricted",
  "private",
  "permission-required"
]);

function posix(value) {
  return value.split(path.sep).join("/");
}

function walkMarkdown(root) {
  if (!existsSync(root)) return [];

  const files = [];
  for (const entry of readdirSync(root, { withFileTypes: true })) {
    const absolute = path.join(root, entry.name);
    if (entry.isDirectory()) files.push(...walkMarkdown(absolute));
    if (entry.isFile() && /\.mdx?$/i.test(entry.name)) files.push(absolute);
  }
  return files.sort((left, right) => left.localeCompare(right));
}

function nodeText(node) {
  if (typeof node.value === "string") return node.value;
  return Array.isArray(node.children)
    ? node.children.map((child) => nodeText(child)).join("")
    : "";
}

function githubHeadingSlug(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s_-]/gu, "")
    .replace(/\s/g, "-");
}

function parseMarkdown(content) {
  const tree = unified().use(remarkParse).parse(content);
  const headings = new Set();
  const slugCounts = new Map();
  const links = [];

  visit(tree, "heading", (node) => {
    const base = githubHeadingSlug(nodeText(node));
    const count = slugCounts.get(base) ?? 0;
    slugCounts.set(base, count + 1);
    headings.add(count === 0 ? base : `${base}-${count}`);
  });

  visit(tree, "link", (node) => {
    links.push({
      url: node.url,
      label: nodeText(node),
      line: node.position?.start?.line ?? 1
    });
  });

  return { headings, links };
}

function failure(code, file, message, line = 1) {
  return { code, file, line, message };
}

function warning(code, file, message, line = 1) {
  return { code, file, line, message };
}

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function hasExactCase(absolute, stopAt) {
  const relative = path.relative(stopAt, absolute);
  if (relative.startsWith("..")) return false;
  let cursor = stopAt;
  for (const segment of relative.split(path.sep)) {
    if (!segment) continue;
    if (!existsSync(cursor) || !statSync(cursor).isDirectory()) return false;
    const names = readdirSync(cursor);
    if (!names.includes(segment)) return false;
    cursor = path.join(cursor, segment);
  }
  return true;
}

function getGitValue(repoRoot, args, fallback) {
  try {
    return execFileSync("git", args, {
      cwd: repoRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"]
    }).trim();
  } catch {
    return fallback;
  }
}

export function getCanonicalIds() {
  const ids = new Set(proofClaims.map((record) => record.id));
  for (const collection of Object.values(knowledgeBank)) {
    if (!Array.isArray(collection)) continue;
    for (const record of collection) {
      if (record && typeof record.id === "string") ids.add(record.id);
    }
  }
  return ids;
}

function parseGovernedPage(file, repoRoot) {
  const raw = readFileSync(file, "utf8");
  const parsed = matter(raw);
  if (!parsed.data.id) return null;

  const relativePath = posix(path.relative(repoRoot, file));
  const markdown = parseMarkdown(parsed.content);

  return {
    ...parsed.data,
    absolutePath: file,
    path: relativePath,
    raw,
    body: parsed.content,
    headings: markdown.headings,
    links: markdown.links,
    aliases: asArray(parsed.data.aliases),
    canonical_refs: asArray(parsed.data.canonical_refs),
    relations: asArray(parsed.data.relations),
    wanted: asArray(parsed.data.wanted)
  };
}

function validatePageShape(page, canonicalIds) {
  const failures = [];
  const required = [
    "id",
    "title",
    "kind",
    "status",
    "visibility",
    "sensitivity",
    "owner",
    "last_reviewed",
    "review_by",
    "canonical_path",
    "discoverable"
  ];

  for (const field of required) {
    if (page[field] === undefined || page[field] === null || page[field] === "") {
      failures.push(failure("schema.required", page.path, `Missing required field: ${field}`));
    }
  }

  if (!ID_PATTERN.test(page.id ?? "")) {
    failures.push(failure("identity.invalid", page.path, `Invalid stable ID: ${page.id}`));
  }
  if (!ALLOWED_KINDS.has(page.kind)) {
    failures.push(failure("schema.kind", page.path, `Unknown kind: ${page.kind}`));
  }
  if (!ALLOWED_STATUSES.has(page.status)) {
    failures.push(failure("schema.status", page.path, `Unknown status: ${page.status}`));
  }
  if (!ALLOWED_VISIBILITIES.has(page.visibility)) {
    failures.push(
      failure("schema.visibility", page.path, `Unknown visibility: ${page.visibility}`)
    );
  }
  if (!ALLOWED_SENSITIVITIES.has(page.sensitivity)) {
    failures.push(
      failure("schema.sensitivity", page.path, `Unknown sensitivity: ${page.sensitivity}`)
    );
  }
  if (typeof page.discoverable !== "boolean") {
    failures.push(
      failure("schema.discoverable", page.path, "discoverable must be a boolean")
    );
  }
  for (const field of ["last_reviewed", "review_by"]) {
    if (!DATE_PATTERN.test(page[field] ?? "")) {
      failures.push(
        failure("schema.date", page.path, `${field} must be a quoted YYYY-MM-DD date`)
      );
    }
  }
  if (page.canonical_path !== page.path) {
    failures.push(
      failure(
        "identity.path",
        page.path,
        `canonical_path must match the current path: ${page.path}`
      )
    );
  }
  if (PRIVATE_PATH_PATTERN.test(page.raw)) {
    failures.push(
      failure("safety.private-path", page.path, "Governed page contains a private filesystem path")
    );
  }
  if (PROTECTED_VISIBILITIES.has(page.visibility)) {
    failures.push(
      failure(
        "safety.public-repo-visibility",
        page.path,
        `${page.visibility} records cannot be committed to the public Wiki`
      )
    );
  }

  for (const ref of page.canonical_refs) {
    if (typeof ref !== "string" || !canonicalIds.has(ref)) {
      failures.push(
        failure("authority.unknown-ref", page.path, `Unknown canonical reference: ${ref}`)
      );
    }
  }

  page.relations.forEach((relation, index) => {
    if (!relation || typeof relation !== "object") {
      failures.push(
        failure("relation.shape", page.path, `Relation ${index + 1} must be an object`)
      );
      return;
    }
    if (!ALLOWED_RELATIONS.has(relation.type)) {
      failures.push(
        failure("relation.type", page.path, `Unknown relation type: ${relation.type}`)
      );
    }
    if (typeof relation.target !== "string" || !relation.target) {
      failures.push(
        failure("relation.target", page.path, `Relation ${index + 1} is missing a target`)
      );
    }
    if (relation.context !== undefined && typeof relation.context !== "string") {
      failures.push(
        failure("relation.context", page.path, `Relation ${index + 1} has invalid context`)
      );
    }
  });

  if (page.kind === "source" && !page.canonical_refs.some((id) => id.startsWith("SRC-"))) {
    failures.push(
      failure("authority.source", page.path, "Source pages require a canonical SRC reference")
    );
  }
  if (page.kind === "claim") {
    if (!page.canonical_refs.some((id) => id.startsWith("CLM-"))) {
      failures.push(
        failure("authority.claim", page.path, "Claim pages require a canonical CLM reference")
      );
    }
    if (!page.relations.some((relation) => relation.type === "uses_source")) {
      failures.push(
        failure("evidence.claim-source", page.path, "Claim pages require a uses_source relation")
      );
    }
  }
  if (page.kind === "correction") {
    if (!page.canonical_refs.some((id) => id.startsWith("COR-"))) {
      failures.push(
        failure("authority.correction", page.path, "Correction pages require a canonical COR reference")
      );
    }
    if (!page.canonical_refs.some((id) => id.startsWith("CLM-"))) {
      failures.push(
        failure("authority.correction-claim", page.path, "Corrections require the affected CLM reference")
      );
    }
    if (!page.relations.some((relation) => relation.type === "supersedes")) {
      failures.push(
        failure("correction.supersession", page.path, "Corrections require a supersedes relation")
      );
    }
  }
  if (page.kind === "asset") {
    if (!page.rights_state || !page.permission_status) {
      failures.push(
        failure(
          "rights.required",
          page.path,
          "Asset pages require rights_state and permission_status"
        )
      );
    }
    if (page.public_asset_url && page.rights_state !== "cleared") {
      failures.push(
        failure(
          "rights.publication",
          page.path,
          "A public asset URL requires cleared rights"
        )
      );
    }
  }
  if (page.kind === "projection") {
    if (typeof page.surface !== "string" || !page.surface.startsWith("/")) {
      failures.push(
        failure("projection.surface", page.path, "Projection pages require a root-relative surface")
      );
    }
    if (!new Set(["active", "hold", "retired"]).has(page.publication_status)) {
      failures.push(
        failure(
          "projection.status",
          page.path,
          `Invalid publication_status: ${page.publication_status}`
        )
      );
    }
  }
  if (page.status === "not-recovered" && /\bnever (?:existed|occurred|happened|published)\b/i.test(page.body)) {
    failures.push(
      failure(
        "epistemic.negative-search",
        page.path,
        "A not-recovered record cannot become a universal nonexistence claim"
      )
    );
  }

  return failures;
}

function resolveMarkdownLinks(pages, repoRoot) {
  const failures = [];
  const documentEdges = [];
  const pageByPath = new Map(pages.map((page) => [page.absolutePath, page]));
  const headingCache = new Map(pages.map((page) => [page.absolutePath, page.headings]));

  for (const page of pages) {
    for (const link of page.links) {
      const isExternal = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(link.url ?? "");
      if (!link.url || (!link.url.startsWith("#") && isExternal)) continue;

      const [encodedPath, encodedFragment] = link.url.split("#", 2);
      let decodedPath;
      let fragment;
      try {
        decodedPath = decodeURIComponent(encodedPath || "");
        fragment = encodedFragment ? decodeURIComponent(encodedFragment) : "";
      } catch {
        failures.push(
          failure("link.encoding", page.path, `Invalid link encoding: ${link.url}`, link.line)
        );
        continue;
      }

      const target = decodedPath
        ? path.resolve(path.dirname(page.absolutePath), decodedPath.split("?")[0])
        : page.absolutePath;
      const relativeTarget = path.relative(repoRoot, target);

      if (relativeTarget.startsWith("..") || path.isAbsolute(relativeTarget)) {
        failures.push(
          failure("link.boundary", page.path, `Link leaves the repository: ${link.url}`, link.line)
        );
        continue;
      }
      if (!existsSync(target) || !hasExactCase(target, repoRoot)) {
        failures.push(
          failure("link.file", page.path, `Broken or case-mismatched link: ${link.url}`, link.line)
        );
        continue;
      }

      if (fragment) {
        let headings = headingCache.get(target);
        if (!headings && statSync(target).isFile() && /\.mdx?$/i.test(target)) {
          headings = parseMarkdown(matter(readFileSync(target, "utf8")).content).headings;
          headingCache.set(target, headings);
        }
        if (!headings?.has(fragment)) {
          failures.push(
            failure(
              "link.fragment",
              page.path,
              `Broken heading fragment: ${link.url}`,
              link.line
            )
          );
        }
      }

      const targetPage = pageByPath.get(target);
      if (targetPage) {
        documentEdges.push({
          from: page.id,
          type: "links_to",
          to: targetPage.id,
          source: "markdown",
          label: link.label,
          line: link.line
        });
      }
    }
  }

  return { failures, documentEdges };
}

function sortObjectList(list, keys) {
  return [...list].sort((left, right) => {
    for (const key of keys) {
      const comparison = String(left[key] ?? "").localeCompare(String(right[key] ?? ""));
      if (comparison !== 0) return comparison;
    }
    return 0;
  });
}

function buildBacklinks(nodes, edges) {
  const map = Object.fromEntries(nodes.map((node) => [node.id, []]));
  for (const edge of edges) {
    if (map[edge.to]) map[edge.to].push(edge);
  }
  for (const id of Object.keys(map)) {
    map[id] = sortObjectList(map[id], ["from", "type", "source"]);
  }
  return map;
}

function reachableIds(edges, rootId) {
  const outgoing = new Map();
  for (const edge of edges) {
    if (!outgoing.has(edge.from)) outgoing.set(edge.from, []);
    outgoing.get(edge.from).push(edge.to);
  }
  const visited = new Set([rootId]);
  const queue = [rootId];
  while (queue.length) {
    const current = queue.shift();
    for (const target of outgoing.get(current) ?? []) {
      if (visited.has(target)) continue;
      visited.add(target);
      queue.push(target);
    }
  }
  return visited;
}

function currentMetadata(repoRoot, pages) {
  const sourceCommit = getGitValue(repoRoot, ["rev-parse", "HEAD"], "unknown");
  const generatedAt = getGitValue(
    repoRoot,
    ["show", "-s", "--format=%cI", "HEAD"],
    "unknown"
  );
  const digest = createHash("sha256");
  for (const page of [...pages].sort((left, right) => left.path.localeCompare(right.path))) {
    digest.update(page.path);
    digest.update("\0");
    digest.update(page.raw);
    digest.update("\0");
  }
  return {
    generatedFile: true,
    generatedAt,
    sourceCommit,
    sourceDigest: digest.digest("hex")
  };
}

export function compileWiki({
  repoRoot = REPO_ROOT,
  wikiRoot = path.join(repoRoot, "docs/knowledge-bank"),
  canonicalIds = getCanonicalIds(),
  now = new Date("2026-07-18T00:00:00Z")
} = {}) {
  const files = walkMarkdown(wikiRoot);
  const caseMap = new Map();
  const failures = [];
  const warnings = [];

  for (const file of files) {
    const relativePath = posix(path.relative(repoRoot, file));
    const key = relativePath.toLowerCase();
    if (caseMap.has(key) && caseMap.get(key) !== relativePath) {
      failures.push(
        failure(
          "identity.case-collision",
          relativePath,
          `Case-only path collision with ${caseMap.get(key)}`
        )
      );
    }
    caseMap.set(key, relativePath);
  }

  const pages = files
    .map((file) => parseGovernedPage(file, repoRoot))
    .filter(Boolean);
  const pageById = new Map();
  const aliasOwners = new Map();

  for (const page of pages) {
    failures.push(...validatePageShape(page, canonicalIds));
    if (pageById.has(page.id)) {
      failures.push(
        failure(
          "identity.duplicate",
          page.path,
          `Duplicate stable ID also used by ${pageById.get(page.id).path}: ${page.id}`
        )
      );
    } else {
      pageById.set(page.id, page);
    }

    for (const alias of page.aliases) {
      if (typeof alias !== "string" || !alias.trim()) {
        failures.push(failure("alias.invalid", page.path, "Aliases must be non-empty strings"));
        continue;
      }
      const key = alias.trim().toLowerCase();
      if (aliasOwners.has(key) && aliasOwners.get(key) !== page.id) {
        failures.push(
          failure(
            "alias.collision",
            page.path,
            `Alias '${alias}' is already owned by ${aliasOwners.get(key)}`
          )
        );
      }
      aliasOwners.set(key, page.id);
    }
  }

  const semanticEdges = [];
  for (const page of pages) {
    for (const relation of page.relations) {
      if (!relation || typeof relation.target !== "string") continue;
      const target = pageById.get(relation.target);
      if (!target) {
        failures.push(
          failure(
            "relation.unknown-target",
            page.path,
            `Unknown relation target: ${relation.target}`
          )
        );
        continue;
      }

      const expectedKind = {
        has_asset: "asset",
        projected_to: "projection",
        uses_method: "method",
        uses_source: "source"
      }[relation.type];
      if (expectedKind && target.kind !== expectedKind) {
        failures.push(
          failure(
            "relation.kind",
            page.path,
            `${relation.type} requires a ${expectedKind} target; ${target.id} is ${target.kind}`
          )
        );
      }

      if (
        page.kind === "projection" &&
        page.publication_status === "active" &&
        PROTECTED_VISIBILITIES.has(target.visibility)
      ) {
        failures.push(
          failure(
            "projection.private-target",
            page.path,
            `Active public projection references protected record: ${target.id}`
          )
        );
      }
      if (
        page.kind === "projection" &&
        page.publication_status === "active" &&
        target.kind === "asset" &&
        target.rights_state !== "cleared"
      ) {
        failures.push(
          failure(
            "projection.pending-rights",
            page.path,
            `Active public projection references rights-pending asset: ${target.id}`
          )
        );
      }

      semanticEdges.push({
        from: page.id,
        type: relation.type,
        to: relation.target,
        source: "frontmatter",
        ...(relation.context ? { context: relation.context } : {})
      });
    }
  }

  const linkResult = resolveMarkdownLinks(pages, repoRoot);
  failures.push(...linkResult.failures);

  const nodes = sortObjectList(
    pages.map((page) => ({
      id: page.id,
      path: page.path,
      title: page.title,
      kind: page.kind,
      status: page.status,
      visibility: page.visibility,
      sensitivity: page.sensitivity,
      discoverable: page.discoverable,
      intentionalLeaf: Boolean(page.intentional_leaf),
      aliases: [...page.aliases].sort(),
      canonicalRefs: [...page.canonical_refs].sort(),
      lastReviewed: page.last_reviewed,
      reviewBy: page.review_by,
      ...(page.surface ? { surface: page.surface } : {}),
      ...(page.publication_status ? { publicationStatus: page.publication_status } : {}),
      ...(page.rights_state ? { rightsState: page.rights_state } : {}),
      ...(page.permission_status ? { permissionStatus: page.permission_status } : {})
    })),
    ["id"]
  );
  const edges = sortObjectList(
    [...semanticEdges, ...linkResult.documentEdges],
    ["from", "type", "to", "source"]
  );
  const backlinks = buildBacklinks(nodes, edges);
  const reachable = reachableIds(edges, ROOT_ID);
  const outbound = new Set(edges.map((edge) => edge.from));
  const orphans = nodes
    .filter(
      (node) => node.discoverable && !node.intentionalLeaf && !reachable.has(node.id)
    )
    .map((node) => node.id);
  const deadEnds = nodes
    .filter((node) => !node.intentionalLeaf && !outbound.has(node.id))
    .map((node) => node.id);
  const stale = nodes
    .filter((node) => DATE_PATTERN.test(node.reviewBy) && new Date(`${node.reviewBy}T23:59:59Z`) < now)
    .map((node) => node.id);

  if (!pageById.has(ROOT_ID)) {
    failures.push(failure("navigation.root", posix(path.relative(repoRoot, wikiRoot)), `Missing root record: ${ROOT_ID}`));
  }
  for (const id of orphans) {
    warnings.push(warning("navigation.orphan", pageById.get(id)?.path ?? id, `Discoverable record is unreachable from ${ROOT_ID}: ${id}`));
  }
  for (const id of deadEnds) {
    warnings.push(warning("navigation.dead-end", pageById.get(id)?.path ?? id, `Record has no outward navigation: ${id}`));
  }
  for (const id of stale) {
    warnings.push(warning("lifecycle.stale", pageById.get(id)?.path ?? id, `Record review date has passed: ${id}`));
  }

  const relatedCount = semanticEdges.filter((edge) => edge.type === "related_to").length;
  const wantedPages = sortObjectList(
    pages.flatMap((page) =>
      page.wanted.map((item) => ({
        requestedBy: page.id,
        id: item.id,
        proposedTitle: item.proposed_title,
        reason: item.reason
      }))
    ),
    ["id", "requestedBy"]
  );
  const corrections = nodes
    .filter((node) => node.kind === "correction")
    .map((node) => node.id);
  const contradictions = semanticEdges
    .filter((edge) => edge.type === "contradicts")
    .map((edge) => ({ from: edge.from, to: edge.to }));
  const projections = nodes
    .filter((node) => node.kind === "projection")
    .map((node) => ({
      id: node.id,
      surface: node.surface,
      status: node.publicationStatus,
      canonicalRefs: node.canonicalRefs
    }));
  const metadata = currentMetadata(repoRoot, pages);
  const graph = {
    ...metadata,
    product: "Knowledge Wiki",
    canonicalRoot: posix(path.relative(repoRoot, wikiRoot)),
    nodes,
    edges,
    wantedPages
  };
  const health = {
    ...metadata,
    product: "Knowledge Wiki",
    hardFailures: sortObjectList(failures, ["file", "line", "code", "message"]),
    warnings: sortObjectList(warnings, ["file", "line", "code", "message"]),
    metrics: {
      governedPages: nodes.length,
      nodesByKind: Object.fromEntries(
        [...ALLOWED_KINDS]
          .map((kind) => [kind, nodes.filter((node) => node.kind === kind).length])
          .filter(([, count]) => count > 0)
          .sort(([left], [right]) => left.localeCompare(right))
      ),
      proseLinks: linkResult.documentEdges.length,
      typedRelations: semanticEdges.length,
      typedRelationCoverage: nodes.length
        ? Number((nodes.filter((node) => semanticEdges.some((edge) => edge.from === node.id)).length / nodes.length).toFixed(3))
        : 0,
      genericRelatedToRate: semanticEdges.length
        ? Number((relatedCount / semanticEdges.length).toFixed(3))
        : 0,
      discoverablePages: nodes.filter((node) => node.discoverable).length,
      reachableDiscoverablePages: nodes.filter(
        (node) => node.discoverable && reachable.has(node.id)
      ).length,
      orphanCount: orphans.length,
      deadEndCount: deadEnds.length,
      staleCount: stale.length,
      wantedPageCount: wantedPages.length,
      correctionCount: corrections.length,
      contradictionCount: contradictions.length,
      activeProjectionCount: nodes.filter(
        (node) => node.kind === "projection" && node.publicationStatus === "active"
      ).length,
      rightsReviewCount: nodes.filter(
        (node) => node.kind === "asset" && node.rightsState !== "cleared"
      ).length
    },
    orphans,
    deadEnds,
    stale,
    wantedPages,
    corrections,
    contradictions,
    projections
  };
  const index = {
    ...metadata,
    byKind: Object.fromEntries(
      Object.entries(health.metrics.nodesByKind).map(([kind]) => [
        kind,
        nodes.filter((node) => node.kind === kind).map((node) => node.id)
      ])
    ),
    byStatus: Object.fromEntries(
      [...new Set(nodes.map((node) => node.status))]
        .sort()
        .map((status) => [status, nodes.filter((node) => node.status === status).map((node) => node.id)])
    )
  };

  return { pages, graph, backlinks, health, index };
}

export function formatHealthMarkdown(health) {
  const lines = [
    "# Knowledge Wiki health report",
    "",
    "> Generated file. Do not edit directly.",
    "",
    `- Source commit: \`${health.sourceCommit}\``,
    `- Source digest: \`${health.sourceDigest}\``,
    `- Hard failures: **${health.hardFailures.length}**`,
    `- Warnings: **${health.warnings.length}**`,
    "",
    "## Structural and semantic health",
    "",
    `- Governed pages: ${health.metrics.governedPages}`,
    `- Typed relations: ${health.metrics.typedRelations}`,
    `- Prose links among governed pages: ${health.metrics.proseLinks}`,
    `- Reachable discoverable pages: ${health.metrics.reachableDiscoverablePages}/${health.metrics.discoverablePages}`,
    `- Orphans: ${health.metrics.orphanCount}`,
    `- Dead ends: ${health.metrics.deadEndCount}`,
    `- Wanted pages: ${health.metrics.wantedPageCount}`,
    `- Corrections: ${health.metrics.correctionCount}`,
    `- Contradictions: ${health.metrics.contradictionCount}`,
    `- Stale pages: ${health.metrics.staleCount}`,
    `- Rights-review records: ${health.metrics.rightsReviewCount}`,
    "",
    "## Hard failures",
    ""
  ];

  if (health.hardFailures.length === 0) lines.push("None.");
  for (const item of health.hardFailures) {
    lines.push(`- \`${item.code}\` ${item.file}:${item.line} - ${item.message}`);
  }
  lines.push("", "## Diagnostic warnings", "");
  if (health.warnings.length === 0) lines.push("None.");
  for (const item of health.warnings) {
    lines.push(`- \`${item.code}\` ${item.file}:${item.line} - ${item.message}`);
  }
  lines.push("", "## Corrections and contradictions", "");
  if (health.corrections.length === 0) lines.push("- Corrections: none.");
  else lines.push(`- Corrections: ${health.corrections.map((id) => `\`${id}\``).join(", ")}`);
  if (health.contradictions.length === 0) lines.push("- Contradictions: none recorded in the pilot graph.");
  else {
    for (const edge of health.contradictions) {
      lines.push(`- Contradiction: \`${edge.from}\` -> \`${edge.to}\``);
    }
  }
  lines.push("", "## Public projections", "");
  for (const projection of health.projections) {
    lines.push(`- \`${projection.id}\` -> \`${projection.surface}\` (${projection.status})`);
  }
  lines.push("", "## Wanted pages", "");
  if (health.wantedPages.length === 0) lines.push("None.");
  for (const item of health.wantedPages) {
    lines.push(`- \`${item.id}\`, requested by \`${item.requestedBy}\`: ${item.reason}`);
  }
  lines.push(
    "",
    "## Human-required work",
    "",
    "Automated success does not establish comprehension, collaborator consent, rights clearance, editorial approval, production behavior, or hiring-reader response. Run `npm run wiki:tasks` and record real sessions separately.",
    ""
  );
  return lines.join("\n");
}

export function writeArtifacts(result, repoRoot = REPO_ROOT) {
  const reportsRoot = path.join(repoRoot, "reports");
  mkdirSync(reportsRoot, { recursive: true });
  const files = {
    "wiki-graph.json": result.graph,
    "wiki-backlinks.json": {
      generatedFile: true,
      generatedAt: result.graph.generatedAt,
      sourceCommit: result.graph.sourceCommit,
      sourceDigest: result.graph.sourceDigest,
      backlinks: result.backlinks
    },
    "wiki-health.json": result.health,
    "wiki-index.json": result.index
  };
  for (const [name, value] of Object.entries(files)) {
    writeFileSync(path.join(reportsRoot, name), `${JSON.stringify(value, null, 2)}\n`);
  }
  writeFileSync(path.join(reportsRoot, "wiki-health.md"), formatHealthMarkdown(result.health));
  return Object.keys(files)
    .concat("wiki-health.md")
    .map((name) => posix(path.join("reports", name)));
}

export function formatFailures(items) {
  return items.map((item) => `${item.file}:${item.line} [${item.code}] ${item.message}`);
}
