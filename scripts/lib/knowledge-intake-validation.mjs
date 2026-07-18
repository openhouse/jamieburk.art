import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { intakeRecordSchema } from "../../apps/www/src/data/knowledge-bank/schema.ts";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";

const PRIVATE_PATTERN = /(?:\/Users\/|\/Volumes\/|file:\/\/|\.photoslibrary|Apple Photos Library|private\/tmp|raw-transcripts|otter-exports|legal-review|client-private|signed[_-]?url|credential)/i;

export function validateIntakeEnvelope(envelope) {
  const failures = [];
  const keys = Object.keys(envelope || {}).sort();
  const allowed = ["publicUrl", "record", "title", "version"].sort();
  if (JSON.stringify(keys) !== JSON.stringify(allowed)) failures.push("Envelope must contain only version, title, publicUrl, and record");
  if (envelope && envelope.version !== 1) failures.push("Envelope version must be 1");
  if (typeof (envelope && envelope.title) !== "string" || !envelope.title.trim()) failures.push("Envelope title is required");
  if (envelope && envelope.publicUrl !== null) {
    try {
      const url = new URL(envelope.publicUrl);
      if (!["http:", "https:"].includes(url.protocol)) failures.push("publicUrl must use HTTP(S)");
    } catch {
      failures.push("publicUrl must be a valid URL or null");
    }
  }
  const parsed = intakeRecordSchema.safeParse(envelope && envelope.record);
  if (!parsed.success) {
    for (const issue of parsed.error.issues) failures.push("record." + issue.path.join(".") + ": " + issue.message);
  }
  const serialized = JSON.stringify(envelope);
  if (PRIVATE_PATTERN.test(serialized)) failures.push("Envelope contains a prohibited private-path or credential pattern");
  if (envelope && envelope.record && envelope.record.privacy === "protected" && envelope.publicUrl) {
    failures.push("Protected intake cannot expose a public URL");
  }
  return failures;
}

export function loadIntakeQueue(repoRoot) {
  const directory = path.join(repoRoot, "docs/knowledge-bank/intake");
  if (!existsSync(directory)) return [];
  return readdirSync(directory)
    .filter(function (file) { return file.endsWith(".json"); })
    .sort()
    .map(function (file) {
      const envelope = JSON.parse(readFileSync(path.join(directory, file), "utf8"));
      return { file, envelope, failures: validateIntakeEnvelope(envelope) };
    });
}

export function validateIntakeQueue(repoRoot) {
  const failures = [];
  const queue = loadIntakeQueue(repoRoot);
  const canonicalIds = new Set(knowledgeBank.intakeRecords.map(function (record) { return record.id; }));
  const sourceIds = new Set(knowledgeBank.sources.map(function (source) { return source.id; }));
  const claimIds = new Set(knowledgeBank.claims.map(function (claim) { return claim.id; }));
  const inquiryIds = new Set(knowledgeBank.researchInquiries.map(function (inquiry) { return inquiry.id; }));
  const queuedIds = [];

  for (const item of queue) {
    for (const failure of item.failures) failures.push(item.file + ": " + failure);
    const record = item.envelope.record || {};
    queuedIds.push(record.id);
    if (canonicalIds.has(record.id)) failures.push(item.file + ": intake ID already exists canonically");
    for (const id of record.sourceIds || []) if (!sourceIds.has(id)) failures.push(item.file + ": unknown source " + id);
    for (const id of record.claimIds || []) if (!claimIds.has(id)) failures.push(item.file + ": unknown claim " + id);
    for (const id of record.researchInquiryIds || []) if (!inquiryIds.has(id)) failures.push(item.file + ": unknown inquiry " + id);
  }
  if (new Set(queuedIds).size !== queuedIds.length) failures.push("Queued intake IDs must be unique");
  return { failures, queue };
}

function containsQuery(value, query) {
  return !query || JSON.stringify(value).toLowerCase().includes(query.toLowerCase());
}

export function queryKnowledgeBank(filters, queue) {
  const query = filters.query || "";
  let claims = knowledgeBank.claims.filter(function (claim) {
    return (!filters.project || claim.project === filters.project) &&
      (!filters.status || claim.status === filters.status) &&
      containsQuery(claim, query);
  });
  let sources = knowledgeBank.sources.filter(function (source) {
    return (!filters.kind || source.kind === filters.kind) && containsQuery(source, query);
  });
  let intake = knowledgeBank.intakeRecords.filter(function (record) {
    return (!filters.project || record.project === filters.project) && containsQuery(record, query);
  });
  let inquiries = knowledgeBank.researchInquiries.filter(function (inquiry) {
    return (!filters.project || inquiry.project === filters.project) && containsQuery(inquiry, query);
  });

  if (filters.publicationSafe) {
    if (!filters.surface) throw new Error("Publication-safe retrieval requires --surface");
    claims = claims
      .map(function (claim) {
        const projections = claim.projections.filter(function (projection) {
          return projection.status === "active" && projection.surfaces.includes(filters.surface);
        });
        if (!projections.length) return null;
        const sourceIds = new Set(claim.evidence.filter(function (item) {
          return item.renderCitation;
        }).map(function (item) { return item.sourceId; }));
        return {
          id: claim.id,
          project: claim.project,
          status: claim.status,
          projections,
          boundaries: claim.boundaries,
          antiClaims: claim.antiClaims,
          sources: knowledgeBank.sources
            .filter(function (source) { return sourceIds.has(source.id) && source.visibility === "public"; })
            .map(function (source) {
              return {
                id: source.id,
                publicCitation: source.publicCitation,
                canonicalUrl: source.canonicalUrl,
                archiveUrl: source.archiveUrl,
                assetUrl: source.assetUrl,
                publicNote: source.publicNote
              };
            })
        };
      })
      .filter(Boolean);
    return {
      mode: "publication-palette",
      surface: filters.surface,
      claims,
      boundary: "This is a candidate palette for an exact surface, not an automatic publication command."
    };
  }

  const limit = filters.limit || 100;
  return {
    mode: "research-query",
    filters,
    intake: intake.slice(0, limit),
    queuedIntake: queue.map(function (item) { return item.envelope; }).filter(function (item) {
      return (!filters.project || item.record.project === filters.project) && containsQuery(item, query);
    }).slice(0, limit),
    sources: sources.slice(0, limit),
    claims: claims.slice(0, limit),
    researchInquiries: inquiries.slice(0, limit),
    counts: {
      intake: intake.length,
      queuedIntake: queue.length,
      sources: sources.length,
      claims: claims.length,
      researchInquiries: inquiries.length
    }
  };
}

export { PRIVATE_PATTERN };

