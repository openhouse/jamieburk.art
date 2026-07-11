import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";

export const dataRoot = "apps/www/src/data/knowledge-bank";

export const validIdPattern =
  /^(source|claim|evidence|research|asset|correction|page)(\.[A-Za-z0-9_-]+)+$/;

export const allowedRelationships = new Set([
  "direct_support",
  "corroboration",
  "context",
  "qualification",
  "contradiction",
  "negative_search_result"
]);

export function readJson(repoRoot, relativePath) {
  return JSON.parse(readFileSync(path.join(repoRoot, relativePath), "utf8"));
}

export function readText(repoRoot, relativePath) {
  return readFileSync(path.join(repoRoot, relativePath), "utf8");
}

export function loadCitationModel(repoRoot) {
  const projectionsRoot = path.join(repoRoot, dataRoot, "projections");
  const projectionFiles = existsSync(projectionsRoot)
    ? readdirSync(projectionsRoot)
        .filter((file) => file.endsWith(".json"))
        .sort()
        .map((file) => path.join("projections", file))
    : [];

  return {
    sources: readJson(repoRoot, path.join(dataRoot, "sources.json")),
    claims: readJson(repoRoot, path.join(dataRoot, "claims.json")),
    evidence: readJson(repoRoot, path.join(dataRoot, "evidence.json")),
    researchRuns: readJson(repoRoot, path.join(dataRoot, "research-runs.json")),
    assets: readJson(repoRoot, path.join(dataRoot, "assets.json")),
    corrections: readJson(repoRoot, path.join(dataRoot, "corrections.json")),
    projections: projectionFiles.map((file) => readJson(repoRoot, path.join(dataRoot, file)))
  };
}

export function indexById(records, label, failures) {
  const index = new Map();
  for (const record of records) {
    if (!record.id) {
      failures.push(`${label} record is missing id`);
      continue;
    }
    if (!validIdPattern.test(record.id)) failures.push(`${label} has invalid id: ${record.id}`);
    if (index.has(record.id)) failures.push(`${label} has duplicate id: ${record.id}`);
    index.set(record.id, record);
  }
  return index;
}

function sourceSummaryFor(sourceId, model) {
  const source = model.sources.find((record) => record.id === sourceId);
  if (source) {
    return {
      id: source.id,
      title: source.title,
      shortCitation: source.shortCitation,
      fullCitation: source.fullCitation,
      publicNote: source.publicNote,
      originalUrl: source.originalUrl,
      archiveUrl: source.archiveUrl ?? source.preservation?.captureUrl,
      publiclyLinkable: source.publiclyLinkable,
      accessStatus: source.accessStatus,
      sourceType: source.sourceType,
      establishes: source.establishes,
      doesNotEstablish: source.doesNotEstablish
    };
  }

  const researchRun = model.researchRuns.find((record) => record.id === sourceId);
  if (researchRun) {
    return {
      id: researchRun.id,
      title: researchRun.subject,
      shortCitation: "Public-safe research-run summary",
      fullCitation: researchRun.subject,
      publicNote: researchRun.publicSummary,
      publiclyLinkable: false,
      accessStatus: "private",
      sourceType: "research_run",
      establishes: researchRun.findings,
      doesNotEstablish: researchRun.negativeFindings
    };
  }

  throw new Error(`Unknown citation source: ${sourceId}`);
}

export function resolveProjection(projection, model) {
  const references = [];
  const referenceNumbers = new Map();
  const occurrences = {};

  for (const occurrence of projection.occurrences) {
    const claim = model.claims.find((record) => record.id === occurrence.claimId);
    if (!claim) throw new Error(`Unknown claim in projection: ${occurrence.claimId}`);
    if (!claim.publiclyUsable || claim.approval?.status !== "approved") {
      throw new Error(`Claim is not approved for public projection: ${claim.id}`);
    }
    if (!claim.allowedSurfaces?.includes(projection.surface)) {
      throw new Error(`Claim ${claim.id} is not allowed on ${projection.surface}`);
    }

    const claimEvidence = model.evidence.filter(
      (record) => record.claimId === claim.id && record.publicCitation
    );
    if (!claimEvidence.length) throw new Error(`Claim has no public evidence: ${claim.id}`);

    occurrences[occurrence.occurrenceId] = {
      occurrenceId: occurrence.occurrenceId,
      claimId: claim.id,
      citations: []
    };

    for (const evidence of claimEvidence) {
      const treatment = occurrence.treatment ?? "linked";
      const key = `${evidence.id}::${treatment}`;
      let reference = referenceNumbers.get(key);
      if (!reference) {
        reference = {
          number: references.length + 1,
          evidenceId: evidence.id,
          claimId: claim.id,
          treatment,
          note: evidence.publicNoteOverride ?? evidence.note,
          qualifierNotes: claim.requiredQualifiers ?? [],
          source: sourceSummaryFor(evidence.sourceId, model),
          backlinks: []
        };
        references.push(reference);
        referenceNumbers.set(key, reference);
      }

      const anchorId = `citation-${reference.number}-${reference.backlinks.length + 1}`;
      reference.backlinks.push({ anchorId, label: `Back to citation ${reference.number}` });
      occurrences[occurrence.occurrenceId].citations.push({
        referenceNumber: reference.number,
        referenceId: `reference-${reference.number}`,
        anchorId
      });
    }
  }

  return {
    id: projection.id,
    path: projection.path,
    surface: projection.surface,
    title: projection.title,
    occurrences,
    references
  };
}

export function walkTextFiles(root, relativeDir, extensions, ignoredDirs = new Set()) {
  const absoluteRoot = path.join(root, relativeDir);
  if (!existsSync(absoluteRoot)) return [];

  const files = [];
  for (const entry of readdirSync(absoluteRoot, { withFileTypes: true })) {
    const absolute = path.join(absoluteRoot, entry.name);
    const relative = path.join(relativeDir, entry.name);
    if (entry.isDirectory()) {
      if (!ignoredDirs.has(entry.name)) {
        files.push(...walkTextFiles(root, relative, extensions, ignoredDirs));
      }
      continue;
    }
    if (entry.isFile() && extensions.has(path.extname(entry.name))) files.push(relative);
  }
  return files;
}
