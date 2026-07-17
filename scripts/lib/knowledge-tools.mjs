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
  { label: "credential or token", pattern: /(?:sk-[A-Za-z0-9_-]{20,}|ghp_[A-Za-z0-9]{20,}|-----BEGIN .*PRIVATE KEY-----|\bpassword\s*[:=])/i },
  { label: "signed or secret URL parameter", pattern: /[?&](?:x-amz-signature|signature|sig|token|access_token|auth|key|secret)=[^&\s]+/i },
  { label: "private legal or stakeholder detail", pattern: /\b(?:private|confidential|raw)\b.{0,40}\b(?:legal strategy|legal review|strategy|stakeholder (?:list|roster)|donor (?:list|roster)|subscriber (?:list|roster))\b/i },
  { label: "private correspondence", pattern: /\b(?:private|confidential|unpublished)\b.{0,32}\b(?:correspondence|email|message|letter|conversation)\b/i },
  { label: "raw participant material", pattern: /\braw\b.{0,32}\b(?:participant|stakeholder|collaborator|interview|transcript|testimony)\b/i },
  { label: "unapproved personal identity", pattern: /\bunapproved\b.{0,32}\b(?:participant|stakeholder|collaborator|person|people|name|identity|identities)\b/i },
  { label: "private health detail", pattern: /\b(?:has|diagnosed with|medical (?:record|history|condition)|health (?:record|history|condition))\s+(?:cancer|hiv|aids|diabetes|depression|anxiety|bipolar|schizophrenia)\b/i },
  { label: "private financial detail", pattern: /\b(?:owes|debt|salary|bank balance|account balance|tax liability)\b.{0,24}\$[\d,]+/i }
];

function stableText(value) {
  return value.trim().replace(/\s+/g, " ");
}

function publicUrlFindings(value) {
  if (!value) return [];
  const findings = [];
  try {
    const parsed = new URL(value);
    if (!["http:", "https:"].includes(parsed.protocol)) {
      findings.push("--url must be a public HTTP(S) URL");
    }
    if (parsed.username || parsed.password) {
      findings.push("--url cannot contain embedded credentials");
    }
    for (const key of parsed.searchParams.keys()) {
      const normalized = key.toLowerCase();
      if (
        /(?:signature|token|secret|credential|authorization|auth|api[-_]?key)/i.test(normalized) ||
        normalized.startsWith("x-amz-") ||
        normalized.startsWith("x-goog-")
      ) {
        findings.push("Remove signed or secret URL parameter from the public receipt");
        break;
      }
    }
  } catch {
    findings.push("--url must be a public HTTP(S) URL");
  }
  return findings;
}

function safePublicUrl(value) {
  return value && publicUrlFindings(value).length === 0 ? value : undefined;
}

function definedRecord(entries) {
  return Object.fromEntries(entries.filter(([, value]) => value !== undefined));
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
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(receivedAt) ||
    Number.isNaN(Date.parse(`${receivedAt}T00:00:00Z`)) ||
    new Date(`${receivedAt}T00:00:00Z`).toISOString().slice(0, 10) !== receivedAt
  ) {
    findings.push("--received-at must use YYYY-MM-DD");
  }
  if (url) findings.push(...publicUrlFindings(url));
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
    matchedRoutes.map((route) => route.path)
  );
  const hasRouteFilter = Boolean(filters.surface || filters.audience || filters.purpose);
  const publicationSafe = filters.publicationSafe === true;
  const publicFilters = definedRecord([
    ["project", project],
    ["entity", filters.entity],
    ["date", date],
    ["evidenceRole", evidenceRole],
    ["claimStatus", claimStatus],
    ["surface", filters.surface],
    ["audience", filters.audience],
    ["purpose", filters.purpose],
    ["publicationSafe", publicationSafe]
  ]);
  const publicRoutes = matchedRoutes.map(({ path, audience, purpose }) => ({
    path,
    audience,
    purpose
  }));
  if (hasRouteFilter && matchedRoutes.length === 0) {
    return {
      filters: publicationSafe ? publicFilters : { ...filters, routeBindings: undefined },
      matchedRoutes: [],
      intakeItems: [],
      sources: [],
      observations: [],
      claims: [],
      researchInquiries: []
    };
  }
  const publicSourceIds = new Set(
    bank.sources
      .filter((source) => ["public", "public-metadata-only"].includes(source.visibility))
      .map((source) => source.id)
  );

  const claims = bank.claims.filter((claim) =>
    (!project || claim.project === project) &&
    (!claimStatus || claim.status === claimStatus) &&
    (!publicationSafe || ["confirmed", "confirmed-with-boundary", "use-with-care"].includes(claim.status)) &&
    (!publicationSafe || claim.projections.some((projection) => projection.status === "active")) &&
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
  const isConstrainedByClaims = hasRouteFilter || Boolean(project || claimStatus || evidenceRole);
  const projectMatches = (projectId) =>
    project ? projectId === project : !isConstrainedByClaims || selectedProjects.has(projectId);
  const intakeItems = bank.intakeItems.filter((item) =>
    item.projectIds.some((id) => projectMatches(id)) &&
    (!publicationSafe || ["eligible", "projected"].includes(item.publicationStatus))
  );
  const sources = bank.sources.filter((source) =>
    (!isConstrainedByClaims || selectedSourceIds.has(source.id)) &&
    (!publicationSafe || publicSourceIds.has(source.id))
  );
  const observations = bank.observations.filter((observation) =>
    projectMatches(observation.project) &&
    (!isConstrainedByClaims || observation.claimIds?.some((id) => claimIds.has(id)) || selectedSourceIds.has(observation.sourceId)) &&
    (!publicationSafe || (publicSourceIds.has(observation.sourceId) && observation.status === "verified"))
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
      matchedRoutes: publicRoutes,
      ...selected
    };
  }


  const publicIntake = (item) => definedRecord([
    ["id", item.id],
    ["receivedAt", item.receivedAt],
    ["inputKind", item.inputKind],
    ["summary", item.summary],
    ["projectIds", item.projectIds],
    ["researchStatus", item.researchStatus],
    ["publicationStatus", item.publicationStatus],
    ["publicUrl", safePublicUrl(item.publicUrl)]
  ]);
  const publicSource = (source) => {
    const canonicalUrl = safePublicUrl(source.canonicalUrl);
    const archiveUrl = safePublicUrl(source.archiveUrl);
    const assetUrl = safePublicUrl(source.assetUrl);
    const preferredUrlAvailable =
      (source.preferredPublicUrl === "canonical" && canonicalUrl) ||
      (source.preferredPublicUrl === "archive" && archiveUrl) ||
      (source.preferredPublicUrl === "asset" && assetUrl);
    return definedRecord([
      ["id", source.id],
      ["title", source.title],
      ["organization", source.organization],
      ["author", source.author],
      ["kind", source.kind],
      ["visibility", source.visibility],
      ["preservationStatus", source.preservationStatus],
      ["publishedAt", source.publishedAt],
      ["capturedAt", source.capturedAt],
      ["accessedAt", source.accessedAt],
      ["canonicalUrl", canonicalUrl],
      ["archiveUrl", archiveUrl],
      ["assetUrl", assetUrl],
      ["preferredPublicUrl", preferredUrlAvailable ? source.preferredPublicUrl : undefined],
      ["publicCitation", source.publicCitation],
      ["publicNote", source.publicNote],
      ["supportsGenerally", source.supportsGenerally],
      ["doesNotEstablish", source.doesNotEstablish]
    ]);
  };
  const publicObservation = (observation) => definedRecord([
    ["id", observation.id],
    ["sourceId", observation.sourceId],
    ["project", observation.project],
    ["text", observation.text],
    ["status", observation.status],
    ["confidence", observation.confidence],
    ["claimIds", observation.claimIds],
    ["reviewedAt", observation.reviewedAt]
  ]);
  const publicClaim = (claim) => ({
    id: claim.id,
    project: claim.project,
    status: claim.status,
    projections: claim.projections
      .filter((projection) => projection.status === "active")
      .map((projection) => ({
        key: projection.key,
        text: projection.text,
        status: projection.status,
        citationRequired: projection.citationRequired,
        surfaces: projection.surfaces
      })),
    evidence: claim.evidence
      .filter((evidence) => publicSourceIds.has(evidence.sourceId))
      .map((evidence) => definedRecord([
        ["sourceId", evidence.sourceId],
        ["relationship", evidence.relationship],
        ["supports", evidence.supports],
        ["publicNote", evidence.publicNote],
        ["confidence", evidence.confidence],
        ["renderCitation", evidence.renderCitation]
      ])),
    boundaries: claim.boundaries,
    antiClaims: claim.antiClaims,
    reviewedAt: claim.reviewedAt
  });
  const publicSelected = {
    intakeItems: selected.intakeItems.map(publicIntake),
    sources: selected.sources.map(publicSource),
    observations: selected.observations.map(publicObservation),
    claims: selected.claims.map(publicClaim),
    researchInquiries: []
  };
  const publicSelect = (items) =>
    items.filter(
      (item) =>
        containsEntity(item) &&
        containsDate(item) &&
        publicSafetyFindings([JSON.stringify(item)]).length === 0
    );

  return {
    filters: publicFilters,
    matchedRoutes: publicRoutes,
    intakeItems: publicSelect(publicSelected.intakeItems),
    sources: publicSelect(publicSelected.sources),
    observations: publicSelect(publicSelected.observations),
    claims: publicSelect(publicSelected.claims),
    researchInquiries: []
  };
}
