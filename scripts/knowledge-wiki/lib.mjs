import { createHash } from "node:crypto";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync
} from "node:fs";
import { execFileSync } from "node:child_process";
import { dirname, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import { proofClaims } from "../../apps/www/src/data/proofs.ts";

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));

export const REPO_ROOT = resolve(SCRIPT_DIR, "../..");
export const WIKI_ROOT = resolve(REPO_ROOT, "docs/knowledge-wiki");
export const ARTIFACT_ROOT = resolve(REPO_ROOT, ".artifacts/knowledge-wiki");

export const RECORD_KINDS = [
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

export const RELATION_TYPES = [
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

const STATUS_VALUES = [
  "inbox",
  "draft",
  "maintained",
  "governed-open",
  "superseded",
  "archived",
  "retired"
];

const VISIBILITY_VALUES = [
  "public",
  "public-safe",
  "summary-only",
  "internal",
  "restricted",
  "private",
  "permission-required"
];

const SENSITIVITY_VALUES = ["low", "moderate", "high", "critical"];
const PROJECTION_VALUES = [
  "ready",
  "careful",
  "pending",
  "protected",
  "never-public"
];
const HUMAN_REVIEW_VALUES = [
  "not-requested",
  "requested",
  "scheduled",
  "completed",
  "human-blocked",
  "resolved"
];

const AUTHORITY_DOMAINS = [
  "source",
  "claim",
  "inquiry",
  "correction",
  "citation-page",
  "proof"
];

const RELATION_TARGET_KINDS = {
  part_of: ["project", "event", "timeline", "index"],
  informed_by: ["event", "source", "method", "research-run", "research-inquiry"],
  resulted_in: ["project", "event", "claim", "decision", "correction", "method"],
  supports: ["project", "claim", "capability", "opportunity", "method"],
  contradicts: ["claim", "anti-claim"],
  supersedes: ["claim", "correction", "source", "decision"],
  documents: ["project", "event", "claim", "method", "place"],
  mentions: RECORD_KINDS,
  participated_in: ["project", "event"],
  organized_by: ["person", "organization"],
  collaborated_with: ["person", "organization", "project"],
  uses_source: ["source"],
  uses_method: ["method"],
  has_asset: ["asset"],
  located_at: ["place"],
  projected_to: ["projection"],
  related_to: RECORD_KINDS
};

const RELATION_SOURCE_KINDS = {
  part_of: RECORD_KINDS,
  informed_by: ["project", "claim", "method", "decision", "capability", "opportunity"],
  resulted_in: ["event", "project", "method", "decision", "research-run"],
  supports: ["project", "source", "claim", "method", "capability", "correction"],
  contradicts: ["claim", "anti-claim", "source", "correction"],
  supersedes: ["correction", "claim", "source", "decision"],
  documents: ["source", "asset", "research-run"],
  mentions: RECORD_KINDS,
  participated_in: ["person", "organization", "project"],
  organized_by: ["event", "project"],
  collaborated_with: ["person", "organization", "project", "event"],
  uses_source: ["project", "claim", "method", "projection", "capability", "opportunity"],
  uses_method: ["project", "method", "capability", "evaluation", "application"],
  has_asset: ["project", "event"],
  located_at: ["project", "event", "organization", "asset"],
  projected_to: ["project", "claim", "source"],
  related_to: RECORD_KINDS
};

const AUTHORITY_REQUIREMENTS = {
  source: "source",
  asset: "source",
  claim: "claim",
  "anti-claim": "claim",
  correction: "correction",
  projection: "citation-page"
};

const PRIVATE_PATTERNS = [
  { pattern: /\/Users\//i, label: "absolute user path" },
  { pattern: /\/Volumes\//i, label: "absolute volume path" },
  { pattern: /Mobile Documents/i, label: "CloudDocs locator" },
  { pattern: /supporting-materials/i, label: "private supporting-materials locator" },
  { pattern: /(?:^|\s)file:\/\//i, label: "file URL" },
  { pattern: /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/i, label: "private key" },
  { pattern: /AKIA[0-9A-Z]{16}/, label: "AWS access key" }
];

function toPosix(value) {
  return value.split(sep).join("/");
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function stableJson(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
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

function listMarkdownFiles(rootDir) {
  if (!existsSync(rootDir)) return [];
  const files = [];
  const visit = (directory) => {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const absolute = resolve(directory, entry.name);
      if (entry.isDirectory()) {
        if (entry.name !== "_generated") visit(absolute);
      } else if (entry.isFile() && entry.name.endsWith(".md")) {
        files.push(absolute);
      }
    }
  };
  visit(rootDir);
  return files.sort((a, b) => a.localeCompare(b));
}

function normalizeDate(value) {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return typeof value === "string" ? value : value == null ? null : String(value);
}

function lineNumberFor(raw, needle) {
  const index = raw.split("\n").findIndex((line) => line.includes(needle));
  return index === -1 ? 1 : index + 1;
}

export function slugHeading(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s/g, "-");
}

function markdownLines(content) {
  const lines = [];
  let inFence = false;
  content.split("\n").forEach((line, index) => {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      return;
    }
    if (!inFence) lines.push({ line, lineNumber: index + 1 });
  });
  return lines;
}

function extractHeadings(content) {
  const seen = new Map();
  const headings = [];
  for (const { line, lineNumber } of markdownLines(content)) {
    const match = /^(#{1,6})\s+(.+?)\s*$/.exec(line);
    if (!match) continue;
    const base = slugHeading(match[2].replace(/\s+#+\s*$/, ""));
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    headings.push({
      depth: match[1].length,
      text: match[2].replace(/\s+#+\s*$/, ""),
      slug: count ? `${base}-${count}` : base,
      lineNumber
    });
  }
  return headings;
}

function cleanHref(value) {
  const trimmed = value.trim();
  if (trimmed.startsWith("<") && trimmed.endsWith(">")) {
    return trimmed.slice(1, -1);
  }
  return trimmed.replace(/\s+["'][^"']*["']\s*$/, "");
}

function extractLinks(content) {
  const links = [];
  for (const { line, lineNumber } of markdownLines(content)) {
    const pattern = /(?<!!)\[([^\]]+)\]\(([^)]+)\)/g;
    for (const match of line.matchAll(pattern)) {
      links.push({ label: match[1], href: cleanHref(match[2]), lineNumber });
    }
  }
  return links;
}

function parseRecord({ absolutePath, raw, pathBase }) {
  const parsed = matter(raw);
  const repoPath = toPosix(relative(pathBase, absolutePath));
  return {
    absolutePath,
    repoPath,
    raw,
    content: parsed.content,
    data: {
      ...parsed.data,
      last_reviewed: normalizeDate(parsed.data.last_reviewed),
      review_by: normalizeDate(parsed.data.review_by)
    },
    headings: extractHeadings(parsed.content),
    links: extractLinks(parsed.content)
  };
}

export function loadWiki({ rootDir = WIKI_ROOT, pathBase = REPO_ROOT } = {}) {
  return listMarkdownFiles(rootDir).map((absolutePath) =>
    parseRecord({
      absolutePath,
      raw: readFileSync(absolutePath, "utf8"),
      pathBase
    })
  );
}

export function loadWikiFromRef(ref) {
  const output = git(
    ["ls-tree", "-r", "--name-only", ref, "docs/knowledge-wiki"],
    ""
  );
  if (!output) return [];
  return output
    .split("\n")
    .filter((path) => path.endsWith(".md") && !path.includes("/_generated/"))
    .sort((a, b) => a.localeCompare(b))
    .map((repoPath) => {
      const raw = git(["show", `${ref}:${repoPath}`], "");
      return parseRecord({
        absolutePath: resolve(REPO_ROOT, repoPath),
        raw,
        pathBase: REPO_ROOT
      });
    });
}

export function authorityRegistry(bank = knowledgeBank, proofs = proofClaims) {
  return new Map([
    ["source", new Set(bank.sources.map((record) => record.id))],
    ["claim", new Set(bank.claims.map((record) => record.id))],
    ["inquiry", new Set(bank.researchInquiries.map((record) => record.id))],
    ["correction", new Set(bank.corrections.map((record) => record.id))],
    ["citation-page", new Set(bank.pages.map((record) => record.id))],
    ["proof", new Set(proofs.map((record) => record.id))]
  ]);
}

function normalizeAlias(value) {
  return String(value).toLowerCase().replace(/[^a-z0-9]+/g, "").trim();
}

function error(record, code, message, field = "id") {
  return {
    code,
    path: record.repoPath,
    line: lineNumberFor(record.raw, `${field}:`),
    message
  };
}

function linkTarget(record, href) {
  const [pathPart, fragmentPart] = href.split("#", 2);
  const decodedPath = decodeURIComponent(pathPart || "");
  const absolute = decodedPath
    ? resolve(dirname(record.absolutePath), decodedPath)
    : record.absolutePath;
  return {
    absolute,
    fragment: fragmentPart ? decodeURIComponent(fragmentPart) : null
  };
}

function relationShapeAllows(type, targetKind) {
  return RELATION_TARGET_KINDS[type]?.includes(targetKind) ?? false;
}

function relationSourceAllows(type, sourceKind) {
  return RELATION_SOURCE_KINDS[type]?.includes(sourceKind) ?? false;
}

function canonicalAuthorityRecord(domain, id, bank = knowledgeBank, proofs = proofClaims) {
  const source = {
    source: bank.sources,
    claim: bank.claims,
    inquiry: bank.researchInquiries,
    correction: bank.corrections,
    "citation-page": bank.pages,
    proof: proofs
  }[domain];
  return source?.find((record) => record.id === id) ?? null;
}

export function validateWiki(
  records = loadWiki(),
  {
    pathBase = REPO_ROOT,
    rootId = "index.knowledge-wiki",
    asOf = "2026-07-18",
    bank = knowledgeBank,
    proofs = proofClaims
  } = {}
) {
  const errors = [];
  const warnings = [];
  const byId = new Map();
  const byAbsolutePath = new Map(records.map((record) => [record.absolutePath, record]));
  const authorities = authorityRegistry(bank, proofs);
  const aliasOwners = new Map();

  for (const record of records) {
    const data = record.data;
    for (const field of [
      "id",
      "title",
      "kind",
      "status",
      "visibility",
      "sensitivity",
      "projection_status",
      "last_reviewed",
      "review_by",
      "human_review_state",
      "canonical_path",
      "summary"
    ]) {
      if (data[field] == null || data[field] === "") {
        errors.push(error(record, "missing-field", `Missing required field ${field}`, field));
      }
    }

    if (!/^[a-z0-9]+(?:[.-][a-z0-9]+)*$/.test(data.id ?? "")) {
      errors.push(error(record, "invalid-id", `Invalid stable ID ${data.id ?? "(missing)"}`));
    }
    if (byId.has(data.id)) {
      errors.push(error(record, "duplicate-id", `Duplicate stable ID ${data.id}`));
    } else if (data.id) {
      byId.set(data.id, record);
    }

    if (!RECORD_KINDS.includes(data.kind)) {
      errors.push(error(record, "invalid-kind", `Unknown record kind ${data.kind}`, "kind"));
    }
    if (!STATUS_VALUES.includes(data.status)) {
      errors.push(error(record, "invalid-status", `Unknown status ${data.status}`, "status"));
    }
    if (!VISIBILITY_VALUES.includes(data.visibility)) {
      errors.push(error(record, "invalid-visibility", `Unknown visibility ${data.visibility}`, "visibility"));
    }
    if (!SENSITIVITY_VALUES.includes(data.sensitivity)) {
      errors.push(error(record, "invalid-sensitivity", `Unknown sensitivity ${data.sensitivity}`, "sensitivity"));
    }
    if (!PROJECTION_VALUES.includes(data.projection_status)) {
      errors.push(error(record, "invalid-projection", `Unknown projection status ${data.projection_status}`, "projection_status"));
    }
    if (!HUMAN_REVIEW_VALUES.includes(data.human_review_state)) {
      errors.push(error(record, "invalid-human-review", `Unknown human review state ${data.human_review_state}`, "human_review_state"));
    }
    for (const field of ["last_reviewed", "review_by"]) {
      if (data[field] && !/^\d{4}-\d{2}-\d{2}$/.test(data[field])) {
        errors.push(error(record, "invalid-date", `${field} must use YYYY-MM-DD`, field));
      }
    }

    const actualPath = toPosix(relative(pathBase, record.absolutePath));
    if (data.canonical_path !== actualPath) {
      errors.push(
        error(
          record,
          "canonical-path-drift",
          `canonical_path ${data.canonical_path ?? "(missing)"} does not match ${actualPath}`,
          "canonical_path"
        )
      );
    }

    if (!Array.isArray(data.aliases)) {
      errors.push(error(record, "invalid-aliases", "aliases must be an array", "aliases"));
    }
    if (!Array.isArray(data.relations)) {
      errors.push(error(record, "invalid-relations", "relations must be an array", "relations"));
    }
    if (!Array.isArray(data.authority_refs)) {
      errors.push(error(record, "invalid-authority-refs", "authority_refs must be an array", "authority_refs"));
    }

    const identityLabels = [data.id, data.title, ...(Array.isArray(data.aliases) ? data.aliases : [])];
    for (const label of identityLabels.filter(Boolean)) {
      const normalized = normalizeAlias(label);
      const existing = aliasOwners.get(normalized);
      if (existing && existing !== data.id) {
        errors.push(error(record, "alias-collision", `Alias or title ${label} collides with ${existing}`, "aliases"));
      } else {
        aliasOwners.set(normalized, data.id);
      }
    }

    for (const marker of PRIVATE_PATTERNS) {
      if (marker.pattern.test(record.raw)) {
        errors.push(error(record, "private-marker", `Record contains ${marker.label}`, "summary"));
      }
    }

    if (
      ["ready", "careful"].includes(data.projection_status) &&
      ["restricted", "private", "permission-required"].includes(data.visibility)
    ) {
      errors.push(error(record, "unsafe-projection", "Restricted material cannot be ready for projection", "projection_status"));
    }
    if (["restricted", "private", "permission-required"].includes(data.visibility)) {
      errors.push(
        error(
          record,
          "unsafe-repository-visibility",
          "Private or restricted records do not belong in the public Wiki; commit only a summary-only public-safe record",
          "visibility"
        )
      );
    }
    if (
      data.projection_status === "ready" &&
      ["inbox", "draft", "governed-open"].includes(data.status)
    ) {
      errors.push(error(record, "unreviewed-projection", "Unreviewed records cannot be ready for projection", "projection_status"));
    }

    if (
      data.kind === "asset" &&
      ["permission-needed", "unknown", "do-not-publish"].includes(data.rights_state) &&
      !["protected", "never-public"].includes(data.projection_status)
    ) {
      errors.push(error(record, "rights-projection", "Pending-rights media cannot be projected", "rights_state"));
    }
    if (
      data.kind === "asset" &&
      data.public_display_status !== "hold" &&
      data.rights_state !== "cleared"
    ) {
      errors.push(error(record, "display-without-rights", "Public display requires cleared rights", "public_display_status"));
    }
    if (data.kind === "asset") {
      for (const field of ["rights_state", "consent_state", "public_display_status"]) {
        if (!data[field]) {
          errors.push(error(record, "missing-media-governance", `Asset requires ${field}`, field));
        }
      }
    }

    if (
      data.absence_state === "not-recovered" &&
      (data.positive_evidence === true || ["ready", "careful"].includes(data.projection_status))
    ) {
      errors.push(error(record, "absence-overclaim", "Not recovered cannot be used as positive evidence", "absence_state"));
    }

    const requiredDomain = AUTHORITY_REQUIREMENTS[data.kind];
    if (
      requiredDomain &&
      !(Array.isArray(data.authority_refs) && data.authority_refs.some((ref) => ref?.domain === requiredDomain))
    ) {
      errors.push(error(record, "missing-authority", `${data.kind} requires a ${requiredDomain} authority reference`, "authority_refs"));
    }

    for (const ref of Array.isArray(data.authority_refs) ? data.authority_refs : []) {
      if (!ref || typeof ref !== "object" || !AUTHORITY_DOMAINS.includes(ref.domain) || typeof ref.id !== "string") {
        errors.push(error(record, "invalid-authority-ref", "Authority references require a recognized domain and ID", "authority_refs"));
        continue;
      }
      if (!authorities.get(ref.domain)?.has(ref.id)) {
        errors.push(error(record, "unknown-authority-ref", `Unknown ${ref.domain} authority ${ref.id}`, "authority_refs"));
      }
    }

    if (!record.headings.length || record.headings[0].depth !== 1) {
      errors.push(error(record, "missing-h1", "Record requires one leading level-one heading", "title"));
    }
    if (record.headings.filter((heading) => heading.depth === 1).length !== 1) {
      errors.push(error(record, "multiple-h1", "Record requires exactly one level-one heading", "title"));
    }
  }

  for (const record of records) {
    const relations = Array.isArray(record.data.relations) ? record.data.relations : [];
    for (const relation of relations) {
      if (!relation || typeof relation !== "object") {
        errors.push(error(record, "invalid-relation", "Relation must be an object", "relations"));
        continue;
      }
      if (!RELATION_TYPES.includes(relation.type)) {
        errors.push(error(record, "invalid-relation-type", `Unknown relation type ${relation.type}`, "relations"));
        continue;
      }
      const target = byId.get(relation.target);
      if (!target) {
        errors.push(error(record, "unknown-relation-target", `Unknown relation target ${relation.target}`, "relations"));
        continue;
      }
      if (!relationShapeAllows(relation.type, target.data.kind)) {
        errors.push(
          error(
            record,
            "incompatible-relation",
            `${relation.type} cannot target ${target.data.kind} (${relation.target})`,
            "relations"
          )
        );
      }
      if (!relationSourceAllows(relation.type, record.data.kind)) {
        errors.push(
          error(
            record,
            "incompatible-relation-source",
            `${record.data.kind} cannot originate ${relation.type} (${relation.target})`,
            "relations"
          )
        );
      }
      if (typeof relation.context !== "string" || !relation.context.trim()) {
        errors.push(error(record, "missing-relation-context", `Relation to ${relation.target} needs context`, "relations"));
      }
    }

    if (record.data.kind === "claim") {
      const sourceRelations = relations.filter((relation) => relation.type === "uses_source");
      if (!sourceRelations.length) {
        errors.push(error(record, "claim-source-closure", "Claim requires at least one uses_source relation", "relations"));
      }
      const claimRef = record.data.authority_refs?.find((ref) => ref.domain === "claim");
      const canonical = claimRef ? canonicalAuthorityRecord("claim", claimRef.id, bank, proofs) : null;
      if (canonical && !canonical.evidence?.length) {
        errors.push(error(record, "canonical-claim-without-evidence", `${claimRef.id} has no canonical evidence`, "authority_refs"));
      }
    }
  }

  for (const record of records) {
    const wanted = Array.isArray(record.data.wanted) ? record.data.wanted : [];
    for (const item of wanted) {
      if (!item || typeof item !== "object" || !/^[a-z0-9]+(?:[.-][a-z0-9]+)*$/.test(item.id ?? "")) {
        errors.push(error(record, "invalid-wanted-record", "Wanted records require a stable proposed ID", "wanted"));
        continue;
      }
      if (!item.proposed_title || !item.reason) {
        errors.push(error(record, "invalid-wanted-record", `Wanted record ${item.id} requires title and reason`, "wanted"));
      }
      if (byId.has(item.id)) {
        errors.push(error(record, "resolved-wanted-record", `Wanted record ${item.id} already exists`, "wanted"));
      }
    }
  }

  const documentEdges = [];
  for (const record of records) {
    for (const link of record.links) {
      if (/^(?:https?:|mailto:|tel:)/i.test(link.href)) continue;
      if (/^(?:javascript:|data:|file:)/i.test(link.href)) {
        errors.push({ code: "unsafe-link-scheme", path: record.repoPath, line: link.lineNumber, message: `Unsafe link ${link.href}` });
        continue;
      }
      const target = linkTarget(record, link.href);
      const boundaryPath = relative(pathBase, target.absolute);
      if (boundaryPath === ".." || boundaryPath.startsWith(`..${sep}`)) {
        errors.push({ code: "link-outside-repository", path: record.repoPath, line: link.lineNumber, message: `Link leaves the repository boundary: ${link.href}` });
        continue;
      }
      if (!existsSync(target.absolute) || !statSync(target.absolute).isFile()) {
        errors.push({ code: "broken-file-link", path: record.repoPath, line: link.lineNumber, message: `Broken file link ${link.href}` });
        continue;
      }
      if (target.fragment) {
        const targetContent = readFileSync(target.absolute, "utf8");
        const targetBody = target.absolute.endsWith(".md") ? matter(targetContent).content : targetContent;
        const slugs = new Set(extractHeadings(targetBody).map((heading) => heading.slug));
        if (!slugs.has(target.fragment)) {
          errors.push({ code: "broken-fragment-link", path: record.repoPath, line: link.lineNumber, message: `Broken fragment #${target.fragment} in ${link.href}` });
        }
      }
      const wikiTarget = byAbsolutePath.get(target.absolute);
      if (wikiTarget) {
        documentEdges.push({
          from: record.data.id,
          to: wikiTarget.data.id,
          label: link.label,
          href: link.href,
          source: "markdown",
          line: link.lineNumber
        });
      }
    }
  }

  const root = byId.get(rootId);
  if (!root) {
    errors.push({ code: "missing-root", path: "docs/knowledge-wiki", line: 1, message: `Missing root record ${rootId}` });
  }

  const adjacency = new Map();
  for (const edge of documentEdges) {
    if (!adjacency.has(edge.from)) adjacency.set(edge.from, []);
    adjacency.get(edge.from).push(edge.to);
  }
  const reachable = new Set();
  const depth = new Map();
  if (root) {
    const queue = [rootId];
    depth.set(rootId, 0);
    while (queue.length) {
      const id = queue.shift();
      if (reachable.has(id)) continue;
      reachable.add(id);
      for (const target of adjacency.get(id) ?? []) {
        if (!depth.has(target)) depth.set(target, (depth.get(id) ?? 0) + 1);
        if (!reachable.has(target)) queue.push(target);
      }
    }
  }

  const discoverable = records.filter(
    (record) => !["archived", "retired"].includes(record.data.status)
  );
  const unexplainedOrphans = discoverable
    .filter((record) => !reachable.has(record.data.id))
    .map((record) => record.data.id)
    .sort();
  for (const id of unexplainedOrphans) {
    const record = byId.get(id);
    errors.push(error(record, "unreachable-record", `Record ${id} is not reachable from ${rootId}`));
  }

  const outgoingCounts = new Map(records.map((record) => [record.data.id, 0]));
  for (const edge of documentEdges) {
    outgoingCounts.set(edge.from, (outgoingCounts.get(edge.from) ?? 0) + 1);
  }
  const intentionalLeafKinds = new Set(["source", "asset", "anti-claim", "correction"]);
  const intentionalLeaves = records
    .filter((record) => (outgoingCounts.get(record.data.id) ?? 0) === 0 && intentionalLeafKinds.has(record.data.kind))
    .map((record) => record.data.id)
    .sort();
  const deadEnds = records
    .filter(
      (record) =>
        record.data.id !== rootId &&
        (outgoingCounts.get(record.data.id) ?? 0) === 0 &&
        !intentionalLeafKinds.has(record.data.kind)
    )
    .map((record) => record.data.id)
    .sort();
  for (const id of deadEnds) warnings.push({ code: "dead-end", message: `${id} has no outgoing prose link` });

  const staleRecords = records
    .filter((record) => record.data.review_by && record.data.review_by < asOf)
    .map((record) => record.data.id)
    .sort();
  const rightsBacklog = records
    .filter((record) => record.data.kind === "asset" && record.data.rights_state !== "cleared")
    .map((record) => record.data.id)
    .sort();
  const humanBacklog = records
    .filter((record) => ["requested", "scheduled", "human-blocked"].includes(record.data.human_review_state))
    .map((record) => record.data.id)
    .sort();
  const wantedPages = records.flatMap((record) =>
    (Array.isArray(record.data.wanted) ? record.data.wanted : []).map((wanted) => ({
      requestedBy: record.data.id,
      ...wanted
    }))
  );
  const relationCount = records.reduce(
    (sum, record) => sum + (Array.isArray(record.data.relations) ? record.data.relations.length : 0),
    0
  );
  const genericRelationCount = records.reduce(
    (sum, record) =>
      sum + (Array.isArray(record.data.relations) ? record.data.relations.filter((relation) => relation.type === "related_to").length : 0),
    0
  );
  const maxDepth = Math.max(0, ...depth.values());
  const warningsByCode = new Map();
  for (const warning of warnings) warningsByCode.set(warning.code, (warningsByCode.get(warning.code) ?? 0) + 1);

  return {
    errors: errors.sort((a, b) => `${a.path}:${a.line}:${a.code}`.localeCompare(`${b.path}:${b.line}:${b.code}`)),
    warnings,
    records,
    byId,
    documentEdges: documentEdges.sort((a, b) => `${a.from}:${a.to}:${a.line}`.localeCompare(`${b.from}:${b.to}:${b.line}`)),
    reachable,
    depth,
    metrics: {
      records: records.length,
      recordsByKind: Object.fromEntries(
        RECORD_KINDS.map((kind) => [kind, records.filter((record) => record.data.kind === kind).length]).filter(([, count]) => count)
      ),
      proseLinks: documentEdges.length,
      typedRelations: relationCount,
      genericRelationCount,
      genericRelationRate: relationCount ? Number((genericRelationCount / relationCount).toFixed(3)) : 0,
      rootReachable: reachable.size,
      discoverable: discoverable.length,
      maxRootDepth: maxDepth,
      unexplainedOrphans,
      intentionalLeaves,
      deadEnds,
      wantedPages,
      staleRecords,
      rightsBacklog,
      humanBacklog,
      warningsByCode: Object.fromEntries(warningsByCode)
    }
  };
}

function sourceMetadata(records, { sourceCommit, generatedAt } = {}) {
  const resolvedCommit = sourceCommit ?? git(["rev-parse", "HEAD"]);
  return {
    sourceCommit: resolvedCommit,
    generatedAt:
      generatedAt ??
      git(["show", "-s", "--format=%cI", resolvedCommit], "1970-01-01T00:00:00Z"),
    sourceTreeFingerprint: sha256(
      records.map((record) => `${record.repoPath}\0${record.raw}`).join("\0")
    )
  };
}

export function buildWikiGraph(records = loadWiki(), metadata = {}) {
  const source = sourceMetadata(records, metadata);
  const byAbsolutePath = new Map(records.map((record) => [record.absolutePath, record]));
  const nodes = records
    .map((record) => ({
      id: record.data.id,
      path: record.repoPath,
      title: record.data.title,
      kind: record.data.kind,
      status: record.data.status,
      visibility: record.data.visibility,
      sensitivity: record.data.sensitivity,
      projectionStatus: record.data.projection_status,
      summary: record.data.summary,
      aliases: record.data.aliases ?? [],
      reviewBy: record.data.review_by,
      humanReviewState: record.data.human_review_state,
      rightsState: record.data.rights_state ?? null,
      consentState: record.data.consent_state ?? null,
      publicDisplayStatus: record.data.public_display_status ?? null,
      authorityRefs: (record.data.authority_refs ?? []).map((ref) => ({ domain: ref.domain, id: ref.id }))
    }))
    .sort((a, b) => a.id.localeCompare(b.id));
  const edges = records
    .flatMap((record) =>
      (record.data.relations ?? []).map((relation) => ({
        from: record.data.id,
        type: relation.type,
        to: relation.target,
        context: relation.context,
        source: "frontmatter"
      }))
    )
    .sort((a, b) => `${a.from}:${a.type}:${a.to}`.localeCompare(`${b.from}:${b.type}:${b.to}`));
  const documentLinks = records
    .flatMap((record) =>
      record.links.flatMap((link) => {
        if (/^(?:https?:|mailto:|tel:)/i.test(link.href)) return [];
        const target = linkTarget(record, link.href);
        const targetRecord = byAbsolutePath.get(target.absolute);
        if (!targetRecord) return [];
        return [{
          from: record.data.id,
          to: targetRecord.data.id,
          label: link.label,
          fragment: target.fragment,
          source: "markdown"
        }];
      })
    )
    .sort((a, b) => `${a.from}:${a.to}:${a.label}`.localeCompare(`${b.from}:${b.to}:${b.label}`));
  const wantedPages = records
    .flatMap((record) =>
      (record.data.wanted ?? []).map((wanted) => ({
        requestedBy: record.data.id,
        id: wanted.id,
        proposedTitle: wanted.proposed_title,
        reason: wanted.reason
      }))
    )
    .sort((a, b) => `${a.id}:${a.requestedBy}`.localeCompare(`${b.id}:${b.requestedBy}`));
  const semantic = { nodes, edges, documentLinks, wantedPages };
  return {
    schemaVersion: 1,
    ...source,
    semanticFingerprint: sha256(JSON.stringify(semantic)),
    ...semantic
  };
}

export function buildBacklinks(graph) {
  const backlinks = new Map(graph.nodes.map((node) => [node.id, []]));
  for (const edge of graph.edges) {
    backlinks.get(edge.to)?.push({
      from: edge.from,
      type: edge.type,
      context: edge.context,
      source: edge.source
    });
  }
  for (const link of graph.documentLinks) {
    backlinks.get(link.to)?.push({
      from: link.from,
      type: "prose_link",
      context: link.label,
      source: link.source
    });
  }
  return Object.fromEntries(
    [...backlinks.entries()]
      .map(([id, items]) => [
        id,
        items.sort((a, b) => `${a.from}:${a.type}`.localeCompare(`${b.from}:${b.type}`))
      ])
      .sort(([a], [b]) => a.localeCompare(b))
  );
}

export function graphDelta(baseGraph, headGraph, baseRef = "origin/develop") {
  const key = (edge) => `${edge.from}|${edge.type}|${edge.to}`;
  const baseNodes = new Set(baseGraph.nodes.map((node) => node.id));
  const headNodes = new Set(headGraph.nodes.map((node) => node.id));
  const baseEdges = new Set(baseGraph.edges.map(key));
  const headEdges = new Set(headGraph.edges.map(key));
  const baseById = new Map(baseGraph.nodes.map((node) => [node.id, node]));
  const headById = new Map(headGraph.nodes.map((node) => [node.id, node]));
  const changedProjectionStates = [...headNodes]
    .filter((id) => baseById.has(id) && baseById.get(id).projectionStatus !== headById.get(id).projectionStatus)
    .map((id) => ({ id, from: baseById.get(id).projectionStatus, to: headById.get(id).projectionStatus }));
  const changedRightsStates = [...headNodes]
    .filter(
      (id) =>
        baseById.has(id) &&
        ["rightsState", "consentState", "publicDisplayStatus"].some(
          (field) => baseById.get(id)[field] !== headById.get(id)[field]
        )
    )
    .map((id) => ({
      id,
      from: {
        rightsState: baseById.get(id).rightsState,
        consentState: baseById.get(id).consentState,
        publicDisplayStatus: baseById.get(id).publicDisplayStatus
      },
      to: {
        rightsState: headById.get(id).rightsState,
        consentState: headById.get(id).consentState,
        publicDisplayStatus: headById.get(id).publicDisplayStatus
      }
    }));
  return {
    baseRef,
    baseCommit: baseGraph.sourceCommit,
    headCommit: headGraph.sourceCommit,
    nodesAdded: [...headNodes].filter((id) => !baseNodes.has(id)).sort(),
    nodesRemoved: [...baseNodes].filter((id) => !headNodes.has(id)).sort(),
    edgesAdded: [...headEdges].filter((edge) => !baseEdges.has(edge)).sort(),
    edgesRemoved: [...baseEdges].filter((edge) => !headEdges.has(edge)).sort(),
    changedProjectionStates,
    changedRightsStates
  };
}

export function emptyGraphForRef(ref) {
  const sourceCommit = git(["rev-parse", ref], ref);
  return {
    schemaVersion: 1,
    sourceCommit,
    generatedAt: git(["show", "-s", "--format=%cI", sourceCommit], "1970-01-01T00:00:00Z"),
    sourceTreeFingerprint: sha256(""),
    semanticFingerprint: sha256(JSON.stringify({ nodes: [], edges: [], documentLinks: [], wantedPages: [] })),
    nodes: [],
    edges: [],
    documentLinks: [],
    wantedPages: []
  };
}

export function buildWikiGraphForRef(ref) {
  const records = loadWikiFromRef(ref);
  if (!records.length) return emptyGraphForRef(ref);
  const sourceCommit = git(["rev-parse", ref], ref);
  return buildWikiGraph(records, {
    sourceCommit,
    generatedAt: git(
      ["show", "-s", "--format=%cI", sourceCommit],
      "1970-01-01T00:00:00Z"
    )
  });
}

export function writeJsonArtifact(name, value, artifactRoot = ARTIFACT_ROOT) {
  mkdirSync(artifactRoot, { recursive: true });
  const path = resolve(artifactRoot, name);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, stableJson(value));
  return path;
}

export function writeTextArtifact(name, value, artifactRoot = ARTIFACT_ROOT) {
  mkdirSync(artifactRoot, { recursive: true });
  const path = resolve(artifactRoot, name);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, value.endsWith("\n") ? value : `${value}\n`);
  return path;
}

export function renderHealthMarkdown(validation, graph) {
  const { metrics } = validation;
  const list = (items, empty = "None") =>
    items.length ? items.map((item) => `- ${typeof item === "string" ? item : JSON.stringify(item)}`).join("\n") : `- ${empty}`;
  return `# Knowledge Wiki Health\n\n` +
    `> Generated file. Source commit: \`${graph.sourceCommit}\`. ` +
    `Source tree: \`${graph.sourceTreeFingerprint.slice(0, 12)}\`. Do not edit directly.\n\n` +
    `## Hard Gates\n\n` +
    `- status: ${validation.errors.length ? "fail" : "pass"}\n` +
    `- errors: ${validation.errors.length}\n\n` +
    `${list(validation.errors.map((entry) => `${entry.path}:${entry.line} ${entry.code} - ${entry.message}`))}\n\n` +
    `## Structural And Semantic Diagnostics\n\n` +
    `- records: ${metrics.records}\n` +
    `- prose links: ${metrics.proseLinks}\n` +
    `- typed relations: ${metrics.typedRelations}\n` +
    `- generic \`related_to\` rate: ${metrics.genericRelationRate}\n` +
    `- root-reachable: ${metrics.rootReachable}/${metrics.discoverable}\n` +
    `- maximum root depth: ${metrics.maxRootDepth}\n\n` +
    `### Unexplained Orphans\n\n${list(metrics.unexplainedOrphans)}\n\n` +
    `### Intentional Leaves\n\n${list(metrics.intentionalLeaves)}\n\n` +
    `### Dead Ends\n\n${list(metrics.deadEnds)}\n\n` +
    `### Wanted Records\n\n${list(metrics.wantedPages)}\n\n` +
    `## Freshness\n\n${list(metrics.staleRecords)}\n\n` +
    `## Rights And Human Review\n\n` +
    `### Rights Backlog\n\n${list(metrics.rightsBacklog)}\n\n` +
    `### Human Review Backlog\n\n${list(metrics.humanBacklog)}\n\n` +
    `These queues are not failures by themselves. Automation cannot clear rights, consent, editorial, hiring-reader, or production decisions.\n`;
}

export function writeWikiArtifacts({
  records = loadWiki(),
  validation = validateWiki(records),
  graph = buildWikiGraph(records),
  artifactRoot = ARTIFACT_ROOT,
  baseRef = process.env.WIKI_BASE_REF || "origin/develop"
} = {}) {
  const backlinks = buildBacklinks(graph);
  const baseGraph = buildWikiGraphForRef(baseRef);
  const delta = graphDelta(baseGraph, graph, baseRef);
  const health = {
    schemaVersion: 1,
    sourceCommit: graph.sourceCommit,
    sourceTreeFingerprint: graph.sourceTreeFingerprint,
    semanticFingerprint: graph.semanticFingerprint,
    status: validation.errors.length ? "fail" : "pass",
    hardErrors: validation.errors,
    warnings: validation.warnings,
    metrics: validation.metrics,
    manualAuthorityGates: [
      "human comprehension",
      "collaborator consent",
      "rights clearance",
      "editorial approval",
      "hiring-reader response",
      "production approval"
    ]
  };
  const index = {
    schemaVersion: 1,
    sourceCommit: graph.sourceCommit,
    recordsByKind: recordsByKind(graph)
  };

  const paths = [
    writeJsonArtifact("wiki-graph.json", graph, artifactRoot),
    writeJsonArtifact("wiki-index.json", index, artifactRoot),
    writeJsonArtifact("wiki-backlinks.json", backlinks, artifactRoot),
    writeJsonArtifact("wiki-health.json", health, artifactRoot),
    writeJsonArtifact("graph-delta.json", delta, artifactRoot),
    writeTextArtifact("wiki-health.md", renderHealthMarkdown(validation, graph), artifactRoot),
    writeTextArtifact("wiki-search.ndjson", `${searchRows(graph).join("\n")}\n`, artifactRoot)
  ];

  const nodeById = new Map(graph.nodes.map((node) => [node.id, node]));
  for (const [targetId, items] of Object.entries(backlinks)) {
    const target = nodeById.get(targetId);
    const lines = [
      `# Backlinks To ${target?.title ?? targetId}`,
      "",
      `> Generated file. Source commit: \`${graph.sourceCommit}\`. Do not edit directly.`,
      ""
    ];
    if (!items.length) {
      lines.push("- None");
    } else {
      for (const item of items) {
        const source = nodeById.get(item.from);
        lines.push(`- ${source?.title ?? item.from} (\`${item.from}\`)`);
        lines.push(`  - relation: ${item.type}`);
        lines.push(`  - context: ${item.context}`);
      }
    }
    paths.push(
      writeTextArtifact(
        `backlinks/${targetId.replace(/[^a-z0-9.-]+/gi, "-")}.md`,
        `${lines.join("\n")}\n`,
        artifactRoot
      )
    );
  }

  return { paths, graph, health, index, backlinks, delta };
}

export function searchRows(graph) {
  return graph.nodes.map((node) =>
    JSON.stringify({
      id: node.id,
      title: node.title,
      kind: node.kind,
      path: node.path,
      summary: node.summary,
      aliases: node.aliases
    })
  );
}

export function recordsByKind(graph) {
  const result = {};
  for (const node of graph.nodes) {
    if (!result[node.kind]) result[node.kind] = [];
    result[node.kind].push({ id: node.id, title: node.title, path: node.path });
  }
  return Object.fromEntries(Object.entries(result).sort(([a], [b]) => a.localeCompare(b)));
}

export function queryWiki({ records = loadWiki(), mode, value } = {}) {
  const graph = buildWikiGraph(records);
  const backlinks = buildBacklinks(graph);
  const byId = new Map(records.map((record) => [record.data.id, record]));
  const questions = {
    "callnyc-chronology": [
      "project.callnyc",
      "event.nycc.constituent-services-hackathon.2016",
      "correction.callnyc.chronology.2026"
    ],
    "callnyc-time": [
      "event.nycc.constituent-services-hackathon.2016",
      "source.civichall.hackathon-announcement.2016"
    ],
    "callnyc-council-attribution": [
      "source.nycc.councilstat-hackathon-post.2016",
      "anti-claim.callnyc.official-council-product"
    ],
    "digital-district-support": ["asset.photo.callnyc.digital-district.001"],
    "digital-district-protection": [
      "asset.photo.callnyc.digital-district.001",
      "index.media-review"
    ],
    "callnyc-correction": ["correction.callnyc.chronology.2026"],
    "public-data-translation": [
      "project.callnyc",
      "capability.technical-operations"
    ],
    "oti-role-coverage": [
      "opportunity.nyc-oti.technical-operations-manager.782369",
      "capability.technical-operations",
      "project.callnyc",
      "method.source-backed-team-memory"
    ]
  };

  if (mode === "id") {
    const record = byId.get(value);
    return record
      ? { mode, value, records: [{ id: record.data.id, title: record.data.title, path: record.repoPath, summary: record.data.summary }] }
      : { mode, value, error: `Unknown record ${value}` };
  }
  if (mode === "backlinks") {
    return byId.has(value)
      ? { mode, value, backlinks: backlinks[value] ?? [] }
      : { mode, value, error: `Unknown record ${value}` };
  }
  if (mode === "authority") {
    const [domain, id] = String(value).split(":", 2);
    const matches = records
      .filter((record) => record.data.authority_refs?.some((ref) => ref.domain === domain && ref.id === id))
      .map((record) => ({ id: record.data.id, title: record.data.title, path: record.repoPath }));
    return { mode, value, records: matches };
  }
  if (mode === "project") {
    const projectId = value.startsWith("project.") ? value : `project.${value}`;
    const selected = new Set([projectId]);
    for (const edge of graph.edges) {
      if (edge.from === projectId || edge.to === projectId) {
        selected.add(edge.from);
        selected.add(edge.to);
      }
    }
    return {
      mode,
      value,
      records: [...selected]
        .map((id) => byId.get(id))
        .filter(Boolean)
        .map((record) => ({ id: record.data.id, title: record.data.title, path: record.repoPath }))
        .sort((a, b) => a.id.localeCompare(b.id))
    };
  }
  if (mode === "rights-pending") {
    return {
      mode,
      records: records
        .filter((record) => record.data.kind === "asset" && record.data.rights_state !== "cleared")
        .map((record) => ({
          id: record.data.id,
          title: record.data.title,
          path: record.repoPath,
          rightsState: record.data.rights_state,
          consentState: record.data.consent_state,
          displayStatus: record.data.public_display_status
        }))
    };
  }
  if (mode === "question") {
    const ids = questions[value];
    return ids
      ? {
          mode,
          value,
          records: ids.map((id) => {
            const record = byId.get(id);
            return { id, title: record.data.title, path: record.repoPath, summary: record.data.summary };
          })
        }
      : { mode, value, error: `Unknown bounded question ${value}` };
  }
  return { error: `Unknown query mode ${mode}` };
}

export function renderQuery(result) {
  if (result.error) return `Query failed: ${result.error}\n`;
  const lines = [`# Knowledge Wiki Query`, "", `- mode: ${result.mode}`, result.value ? `- value: ${result.value}` : null, ""]
    .filter((line) => line != null);
  for (const record of result.records ?? []) {
    lines.push(`- ${record.title ?? record.id} (\`${record.id}\`)`);
    if (record.path) lines.push(`  - ${record.path}`);
    if (record.summary) lines.push(`  - ${record.summary}`);
    if (record.rightsState) lines.push(`  - rights: ${record.rightsState}; consent: ${record.consentState}; display: ${record.displayStatus}`);
  }
  for (const backlink of result.backlinks ?? []) {
    lines.push(`- ${backlink.from} --${backlink.type}--> ${result.value}`);
  }
  return `${lines.join("\n")}\n`;
}

export function readRetrievalTasks(records = loadWiki()) {
  const record = records.find((item) => item.data.id === "evaluation.knowledge-wiki.retrieval-tasks");
  if (!record) return [];
  return markdownLines(record.content)
    .map(({ line }) => /^\d+\.\s+(.+)$/.exec(line)?.[1])
    .filter(Boolean);
}
