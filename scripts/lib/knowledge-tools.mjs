import { createHash } from "node:crypto";
import { appendFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import path from "node:path";

const allowedKinds = new Set([
  "url",
  "memory",
  "metric",
  "document",
  "photograph",
  "repository",
  "claim"
]);

const unsafePatterns = [
  { label: "private filesystem path", pattern: /(?:\/Users\/|\/Volumes\/|[A-Za-z]:\\)/ },
  { label: "email address", pattern: /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i },
  { label: "phone number", pattern: /(?:\+?1[ .-]?)?\(?\d{3}\)?[ .-]\d{3}[ .-]\d{4}/ },
  { label: "credential or token", pattern: /(?:sk-[A-Za-z0-9_-]{20,}|ghp_[A-Za-z0-9]{20,}|-----BEGIN .*PRIVATE KEY-----|\bpassword\s*[:=])/i }
];

function stableText(value) {
  return value.trim().replace(/\s+/g, " ");
}

export function parseNamedArgs(argv) {
  const args = {};
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (!token.startsWith("--")) continue;
    const key = token.slice(2);
    const next = argv[index + 1];
    if (!next || next.startsWith("--")) {
      args[key] = true;
      continue;
    }
    args[key] = next;
    index += 1;
  }
  return args;
}

export function publicSafetyFindings(values) {
  const joined = values.filter(Boolean).join(" ");
  return unsafePatterns
    .filter(({ pattern }) => pattern.test(joined))
    .map(({ label }) => `Remove ${label} from the public receipt`);
}

export function createLeadReceipt(input) {
  const title = stableText(input.title ?? "");
  const summary = stableText(input.summary ?? "");
  const project = stableText(input.project ?? "");
  const kind = stableText(input.kind ?? "");
  const receivedAt = input.receivedAt ?? new Date().toISOString().slice(0, 10);
  const url = input.url ? stableText(input.url) : undefined;

  const findings = [];
  if (!title) findings.push("--title is required");
  if (!summary) findings.push("--summary is required");
  if (!project || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(project)) {
    findings.push("--project must be a lowercase hyphenated project ID");
  }
  if (!allowedKinds.has(kind)) {
    findings.push(`--kind must be one of ${[...allowedKinds].join(", ")}`);
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(receivedAt)) {
    findings.push("--received-at must use YYYY-MM-DD");
  }
  if (url && !/^https?:\/\/[^\s]+$/i.test(url)) {
    findings.push("--url must be a public HTTP(S) URL");
  }
  findings.push(...publicSafetyFindings([title, summary, project, url]));
  if (findings.length) throw new Error(findings.join("\n"));

  const digest = createHash("sha256")
    .update(JSON.stringify({ title, summary, project, kind, receivedAt, url }))
    .digest("hex")
    .slice(0, 12)
    .toUpperCase();

  return {
    schemaVersion: 1,
    id: `LEAD-${receivedAt}-${digest}`,
    receivedAt,
    title,
    inputKind: kind,
    summary,
    projectIds: [project],
    ...(url ? { publicUrl: url } : {}),
    researchStatus: "captured",
    publicationStatus: "pending",
    nextAction: "Triage this lead into canonical sources, observations, claims, inquiries, and a deliberate projection decision."
  };
}

export function appendLeadReceipt(file, receipt) {
  const existing = existsSync(file)
    ? readFileSync(file, "utf8")
        .split("\n")
        .filter(Boolean)
        .map((line) => JSON.parse(line))
    : [];
  if (existing.some((item) => item.id === receipt.id)) {
    return { appended: false, reason: "duplicate", id: receipt.id };
  }
  mkdirSync(path.dirname(file), { recursive: true });
  appendFileSync(file, `${JSON.stringify(receipt)}\n`, "utf8");
  return { appended: true, id: receipt.id };
}

export function queryKnowledgeBank(bank, filters = {}) {
  const project = filters.project;
  const entity = filters.entity?.toLowerCase();
  const date = filters.date;
  const evidenceRole = filters.evidenceRole;
  const claimStatus = filters.claimStatus;
  const matchedRoutes = (filters.routeBindings ?? []).filter((route) =>
    (!filters.surface || route.path === filters.surface) &&
    (!filters.audience || route.audience.toLowerCase().includes(filters.audience.toLowerCase())) &&
    (!filters.purpose || route.purpose.toLowerCase().includes(filters.purpose.toLowerCase()))
  );
  const surfaces = new Set(
    filters.surface
      ? [filters.surface]
      : matchedRoutes.map((route) => route.path)
  );
  const hasRouteFilter = Boolean(filters.surface || filters.audience || filters.purpose);
  const publicationSafe = filters.publicationSafe === true;
  const publicSourceIds = new Set(
    bank.sources
      .filter((source) => ["public", "public-metadata-only"].includes(source.visibility))
      .map((source) => source.id)
  );

  const claims = bank.claims.filter((claim) =>
    (!project || claim.project === project) &&
    (!claimStatus || claim.status === claimStatus) &&
    (!evidenceRole || claim.evidence.some((evidence) => evidence.relationship === evidenceRole)) &&
    (!hasRouteFilter || claim.projections.some((projection) =>
      projection.status === "active" && projection.surfaces.some((surface) => surfaces.has(surface))
    ))
  );
  const claimIds = new Set(claims.map((claim) => claim.id));
  const selectedProjects = new Set(
    project
      ? [project]
      : (hasRouteFilter || claimStatus || evidenceRole)
        ? claims.map((claim) => claim.project)
        : []
  );
  const selectedSourceIds = new Set(
    claims.flatMap((claim) => claim.evidence.map((evidence) => evidence.sourceId))
  );
  const isConstrainedByClaims = hasRouteFilter || Boolean(claimStatus || evidenceRole);
  const projectMatches = (projectId) =>
    project ? projectId === project : !isConstrainedByClaims || selectedProjects.has(projectId);
  const intakeItems = bank.intakeItems.filter((item) =>
    item.projectIds.some((id) => projectMatches(id)) &&
    (!publicationSafe || item.publicationStatus !== "private")
  );
  const sources = bank.sources.filter((source) =>
    (!isConstrainedByClaims || selectedSourceIds.has(source.id)) &&
    (!publicationSafe || publicSourceIds.has(source.id))
  );
  const observations = bank.observations.filter((observation) =>
    projectMatches(observation.project) &&
    (!isConstrainedByClaims || observation.claimIds?.some((id) => claimIds.has(id)) || selectedSourceIds.has(observation.sourceId)) &&
    (!publicationSafe || publicSourceIds.has(observation.sourceId))
  );
  const researchInquiries = bank.researchInquiries.filter((inquiry) =>
    projectMatches(inquiry.project)
  );

  const containsEntity = (item) => !entity || JSON.stringify(item).toLowerCase().includes(entity);
  const containsDate = (item) => !date || JSON.stringify(item).includes(date);
  const select = (items) => items.filter((item) => containsEntity(item) && containsDate(item));
  const selected = {
    intakeItems: select(intakeItems),
    sources: select(sources),
    observations: select(observations),
    claims: select(claims),
    researchInquiries: select(researchInquiries)
  };

  if (!publicationSafe) {
    return {
      filters: { ...filters, routeBindings: undefined },
      matchedRoutes: matchedRoutes.map(({ path, audience, purpose }) => ({ path, audience, purpose })),
      ...selected
    };
  }

  return {
    filters: { ...filters, routeBindings: undefined },
    matchedRoutes: matchedRoutes.map(({ path, audience, purpose }) => ({ path, audience, purpose })),
    intakeItems: selected.intakeItems,
    sources: selected.sources.map(({ protectedLocatorId: _protected, ...source }) => source),
    observations: selected.observations,
    claims: selected.claims.map((claim) => ({
      ...claim,
      evidence: claim.evidence
        .filter((evidence) => publicSourceIds.has(evidence.sourceId))
        .map(({ internalExcerpt: _internal, ...evidence }) => evidence)
    })),
    researchInquiries: selected.researchInquiries.map(
      ({ protectedLocatorId: _protected, ...inquiry }) => inquiry
    )
  };
}
