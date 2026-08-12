import { createHash } from "node:crypto";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { z } from "zod";

export const defaultRepoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../.."
);

const stableId = z
  .string()
  .regex(/^[a-z0-9]+(?:[.-][a-z0-9]+)*$/, "use a stable lowercase dotted ID");
const date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);
const sha256Digest = z.string().regex(/^[a-f0-9]{64}$/);

const speakerSchema = z
  .object({
    id: stableId,
    publicName: z.string().min(1),
    roleAtTime: z.string().min(1)
  })
  .strict();

const contextSchema = z
  .object({
    kind: z.enum(["official-public-hearing", "public-event", "published-work"]),
    date,
    eventId: stableId,
    publicBody: z.string().min(1),
    occurrenceState: z.enum(["documented", "scheduled", "remembered", "unknown"]),
    corroboration: z.array(z.string().min(1))
  })
  .strict()
  .superRefine((context, refinement) => {
    if (context.occurrenceState === "documented" && context.corroboration.length === 0) {
      refinement.addIssue({
        code: "custom",
        path: ["corroboration"],
        message: "documented occurrence requires corroboration"
      });
    }
  });

const stanceSchema = z
  .object({
    value: z.enum([
      "self-description",
      "description",
      "assessment",
      "recommendation",
      "support",
      "qualified-support",
      "critique",
      "mixed",
      "procedural",
      "context-only",
      "unknown"
    ]),
    basis: z.string().min(20),
    directEvidence: z.array(z.string().min(1))
  })
  .strict()
  .superRefine((stance, refinement) => {
    if (
      ["recommendation", "support", "qualified-support"].includes(stance.value) &&
      stance.directEvidence.length === 0
    ) {
      refinement.addIssue({
        code: "custom",
        path: ["directEvidence"],
        message: `${stance.value} requires direct evidence`
      });
    }
  });

const textSchema = z
  .object({
    completeness: z.enum(["complete-statement", "bounded-excerpt", "source-pointer"]),
    certification: z.enum([
      "readable-official-transcript-extract",
      "source-transcribed",
      "creator-supplied",
      "uncertified"
    ]),
    editorialNote: z.string().min(1)
  })
  .strict();

const sourceSchema = z
  .object({
    id: z.string().min(1),
    type: z.enum(["official-transcript", "official-record", "creator-controlled"]),
    url: z.string().url(),
    locator: z.string().min(1)
  })
  .strict();

const rightsSchema = z
  .object({
    evidenceUse: z.enum(["reviewed", "pending", "disallowed"]),
    quoteUse: z.enum(["reviewed", "existing-public-record", "pending", "disallowed"]),
    fullTextRepublication: z.enum([
      "reviewed",
      "existing-public-repository",
      "not-applicable",
      "pending",
      "disallowed"
    ]),
    basis: z.string().min(20)
  })
  .strict();

const consentSchema = z
  .object({
    attribution: z.enum(["reviewed", "pending", "disallowed"]),
    publicProjection: z.enum(["reviewed", "pending", "disallowed"]),
    owner: z.string().min(1),
    reviewedAt: date
  })
  .strict();

const projectionSchema = z
  .object({
    status: z.enum(["active", "hold", "disallowed"]),
    surfaces: z.array(z.enum(["github-sourcebook-pilot", "future-sourcebook-repository"]))
  })
  .strict();

const browseSchema = z
  .object({
    years: z.array(z.string().regex(/^\d{4}$/)).min(1),
    projects: z.array(z.string().min(1)).min(1),
    themes: z.array(z.string().min(1)).min(1),
    sourceTypes: z.array(z.string().min(1)).min(1)
  })
  .strict();

export const sourcebookRecordSchema = z
  .object({
    id: stableId,
    knowledgeWikiId: stableId,
    title: z.string().min(1),
    kind: z.literal("perspective"),
    status: z.enum(["maintained", "withdrawn", "superseded"]),
    visibility: z.literal("public-safe"),
    sensitivity: z.enum(["low", "moderate"]),
    lastReviewed: date,
    reviewBy: date,
    bodyPath: z.string().regex(/^docs\/knowledge-bank\/testimony\/[a-z0-9-]+\.md$/),
    bodySha256: sha256Digest,
    speaker: speakerSchema,
    context: contextSchema,
    stance: stanceSchema,
    text: textSchema,
    source: sourceSchema,
    rights: rightsSchema,
    consent: consentSchema,
    projection: projectionSchema,
    creditScope: z.enum([
      "individual",
      "shared",
      "collective",
      "institutional",
      "individual-and-collective"
    ]),
    withdrawalState: z.enum(["clear", "requested", "withdrawn"]),
    boundaries: z.array(z.string().min(20)).min(2),
    browse: browseSchema
  })
  .strict()
  .superRefine((record, refinement) => {
    if (record.projection.status === "active") {
      const rightsReady =
        record.rights.evidenceUse === "reviewed" &&
        ["reviewed", "existing-public-record"].includes(record.rights.quoteUse) &&
        ["reviewed", "existing-public-repository", "not-applicable"].includes(
          record.rights.fullTextRepublication
        );
      if (!rightsReady) {
        refinement.addIssue({
          code: "custom",
          path: ["rights"],
          message: "active projection requires reviewed rights state"
        });
      }
      if (
        record.consent.attribution !== "reviewed" ||
        record.consent.publicProjection !== "reviewed"
      ) {
        refinement.addIssue({
          code: "custom",
          path: ["consent"],
          message: "active projection requires reviewed attribution and public projection"
        });
      }
      if (
        record.projection.surfaces.length !== 1 ||
        record.projection.surfaces[0] !== "github-sourcebook-pilot"
      ) {
        refinement.addIssue({
          code: "custom",
          path: ["projection", "surfaces"],
          message: "pilot active projection is limited to the Git-native Sourcebook surface"
        });
      }
    }
    if (record.status !== "maintained" || record.withdrawalState !== "clear") {
      if (record.projection.status === "active") {
        refinement.addIssue({
          code: "custom",
          path: ["projection", "status"],
          message: "withdrawn or non-maintained records cannot project"
        });
      }
    }
  });

const pilotSchema = z
  .object({
    populationDefinition: z.string().min(1),
    populationSource: z.string().regex(/^docs\//),
    populationSourceReviewedAt: date,
    eligibleCount: z.number().int().nonnegative(),
    includedCount: z.number().int().nonnegative(),
    excludedCount: z.number().int().nonnegative(),
    sourceCutoff: date,
    privateBuildDependency: z.literal(false)
  })
  .strict();

export const sourcebookCatalogSchema = z
  .object({
    schemaVersion: z.literal(1),
    title: z.string().min(1),
    reviewedAt: date,
    reviewBy: date,
    pilot: pilotSchema,
    records: z.array(sourcebookRecordSchema).min(1)
  })
  .strict();

const approvalSchema = z
  .object({
    state: z.enum(["reviewed", "pending", "disallowed"]),
    owner: z.string().min(1),
    reviewedAt: date
  })
  .strict();

export const publicationPacketSchema = z
  .object({
    schemaVersion: z.literal(1),
    id: stableId,
    purpose: z.string().min(20),
    intendedSurface: z.literal("github-sourcebook-pilot"),
    privateDependencies: z.literal(false),
    records: z
      .array(
        z
          .object({
            publicId: stableId,
            bodySha256: sha256Digest
          })
          .strict()
      )
      .min(1),
    approvals: z
      .object({
        subject: approvalSchema,
        rights: approvalSchema,
        editorial: approvalSchema
      })
      .strict(),
    antiClaims: z.array(z.string().min(20)).min(2)
  })
  .strict()
  .superRefine((packet, refinement) => {
    for (const [name, approval] of Object.entries(packet.approvals)) {
      if (approval.state !== "reviewed") {
        refinement.addIssue({
          code: "custom",
          path: ["approvals", name, "state"],
          message: "active publication packet requires reviewed approvals"
        });
      }
    }
  });

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function stableJson(value) {
  if (Array.isArray(value)) return value.map(stableJson);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value)
        .sort(([a], [b]) => a.localeCompare(b, "en-US"))
        .map(([key, item]) => [key, stableJson(item)])
    );
  }
  return value;
}

function json(value) {
  return `${JSON.stringify(stableJson(value), null, 2)}\n`;
}

function slug(value) {
  return value
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function relativeLink(fromRelative, toRelative) {
  return path.posix.relative(path.posix.dirname(fromRelative), toRelative);
}

function issue(code, message, file = "sourcebook/catalog.json") {
  return { code, message, file };
}

const leakagePattern =
  /(?:\/(?:Users|Volumes|private\/tmp)\/|file:\/\/|vault:\/\/|BEGIN (?:RSA |OPENSSH )?PRIVATE KEY|\b(?:sk-proj-|ghp_|AKIA)[A-Za-z0-9_-]{12,})/i;

export function readSourcebookInputs(repoRoot = defaultRepoRoot) {
  const catalogPath = path.join(repoRoot, "sourcebook/catalog.json");
  const packetPath = path.join(
    repoRoot,
    "sourcebook/publication-packets/pilot-jamie-public-testimony.json"
  );
  return {
    catalog: JSON.parse(readFileSync(catalogPath, "utf8")),
    packet: JSON.parse(readFileSync(packetPath, "utf8"))
  };
}

export function validateSourcebook({
  repoRoot = defaultRepoRoot,
  catalog,
  packet
}) {
  const issues = [];
  const parsedCatalog = sourcebookCatalogSchema.safeParse(catalog);
  const parsedPacket = publicationPacketSchema.safeParse(packet);

  if (!parsedCatalog.success) {
    for (const failure of parsedCatalog.error.issues) {
      issues.push(issue("CATALOG_SCHEMA", `${failure.path.join(".")}: ${failure.message}`));
    }
  }
  if (!parsedPacket.success) {
    for (const failure of parsedPacket.error.issues) {
      issues.push(
        issue(
          "PACKET_SCHEMA",
          `${failure.path.join(".")}: ${failure.message}`,
          "sourcebook/publication-packets/pilot-jamie-public-testimony.json"
        )
      );
    }
  }
  if (!parsedCatalog.success || !parsedPacket.success) return { issues };

  const cleanCatalog = parsedCatalog.data;
  const cleanPacket = parsedPacket.data;
  const serialized = JSON.stringify({ catalog: cleanCatalog, packet: cleanPacket });
  if (leakagePattern.test(serialized)) {
    issues.push(issue("PUBLIC_LEAKAGE", "public Sourcebook inputs contain a protected locator or credential-like value"));
  }

  const ids = new Set();
  const bodies = new Set();
  const wikiIds = new Set();
  for (const record of cleanCatalog.records) {
    if (ids.has(record.id)) issues.push(issue("DUPLICATE_ID", record.id));
    if (bodies.has(record.bodyPath)) issues.push(issue("DUPLICATE_BODY", record.bodyPath));
    if (wikiIds.has(record.knowledgeWikiId)) {
      issues.push(issue("DUPLICATE_WIKI_BINDING", record.knowledgeWikiId));
    }
    ids.add(record.id);
    bodies.add(record.bodyPath);
    wikiIds.add(record.knowledgeWikiId);

    const absoluteBody = path.join(repoRoot, record.bodyPath);
    if (!existsSync(absoluteBody)) {
      issues.push(issue("MISSING_BODY", record.bodyPath));
    } else {
      const actual = sha256(readFileSync(absoluteBody));
      if (actual !== record.bodySha256) {
        issues.push(
          issue(
            "STALE_BODY_HASH",
            `${record.id}: expected ${record.bodySha256}, received ${actual}`
          )
        );
      }
    }
  }

  if (
    cleanCatalog.pilot.includedCount !== cleanCatalog.records.length ||
    cleanCatalog.pilot.eligibleCount !==
      cleanCatalog.pilot.includedCount + cleanCatalog.pilot.excludedCount
  ) {
    issues.push(issue("POPULATION_CLOSURE", "pilot counts do not reconcile with the catalog"));
  }

  const byId = new Map(cleanCatalog.records.map((record) => [record.id, record]));
  const packetIds = new Set();
  for (const reference of cleanPacket.records) {
    if (packetIds.has(reference.publicId)) {
      issues.push(issue("DUPLICATE_PACKET_RECORD", reference.publicId));
      continue;
    }
    packetIds.add(reference.publicId);
    const record = byId.get(reference.publicId);
    if (!record) {
      issues.push(issue("UNKNOWN_PACKET_RECORD", reference.publicId));
    } else if (record.bodySha256 !== reference.bodySha256) {
      issues.push(issue("PACKET_HASH_MISMATCH", reference.publicId));
    } else if (record.status !== "maintained" || record.withdrawalState !== "clear") {
      issues.push(issue("WITHDRAWN_PACKET_RECORD", reference.publicId));
    }
  }
  for (const record of cleanCatalog.records) {
    if (record.projection.status === "active" && !packetIds.has(record.id)) {
      issues.push(issue("UNPACKETED_ACTIVE_RECORD", record.id));
    }
  }

  return { issues, catalog: cleanCatalog, packet: cleanPacket };
}

function facetOutputs(records, facet, directory) {
  const grouped = new Map();
  for (const record of records) {
    for (const value of record.browse[facet]) {
      if (!grouped.has(value)) grouped.set(value, []);
      grouped.get(value).push(record);
    }
  }
  return Object.fromEntries(
    [...grouped.entries()]
      .sort(([a], [b]) => a.localeCompare(b, "en-US"))
      .map(([value, items]) => {
        const outputPath = `sourcebook/browse/${directory}/${slug(value)}.md`;
        const lines = [
          `# ${value}`,
          "",
          "Generated from `sourcebook/catalog.json`. Do not edit by hand.",
          ""
        ];
        for (const record of items.sort((a, b) => a.context.date.localeCompare(b.context.date))) {
          lines.push(
            `- [${record.title}](${relativeLink(outputPath, record.bodyPath)}) — ${record.context.date}; ${record.context.publicBody}; stance: \`${record.stance.value}\`.`,
            `  - Boundary: ${record.boundaries[0]}`
          );
        }
        return [outputPath, markdown(lines)];
      })
  );
}

function markdown(lines) {
  const normalized = [...lines];
  while (normalized.at(-1) === "") normalized.pop();
  return `${normalized.join("\n")}\n`;
}

export function buildSourcebookOutputs({ catalog, packet }) {
  const activeRecords = catalog.records
    .filter((record) => record.projection.status === "active")
    .sort((a, b) => a.context.date.localeCompare(b.context.date) || a.id.localeCompare(b.id));
  const exportCore = {
    schemaVersion: 1,
    population: {
      definition: catalog.pilot.populationDefinition,
      source: catalog.pilot.populationSource,
      sourceCutoff: catalog.pilot.sourceCutoff,
      eligibleCount: catalog.pilot.eligibleCount,
      includedCount: catalog.pilot.includedCount,
      excludedCount: catalog.pilot.excludedCount
    },
    records: activeRecords.map((record) => ({
      id: record.id,
      knowledgeWikiId: record.knowledgeWikiId,
      title: record.title,
      date: record.context.date,
      publicBody: record.context.publicBody,
      bodyPath: record.bodyPath,
      bodySha256: record.bodySha256,
      sourceId: record.source.id,
      sourceUrl: record.source.url,
      stance: record.stance,
      creditScope: record.creditScope,
      boundaries: record.boundaries,
      browse: record.browse
    }))
  };
  const exportFingerprint = sha256(json(exportCore));
  const publicExport = { ...exportCore, exportFingerprint };

  const indexPath = "sourcebook/catalog/INDEX.md";
  const indexLines = [
    "# Sourcebook catalog",
    "",
    "Generated from `sourcebook/catalog.json`. Do not edit by hand.",
    "",
    `Population: **${catalog.pilot.includedCount} of ${catalog.pilot.eligibleCount} eligible records included**.`,
    ""
  ];
  for (const record of activeRecords) {
    indexLines.push(
      `## ${record.context.date}: ${record.title}`,
      "",
      `- Stable ID: \`${record.id}\``,
      `- [Canonical statement body](${relativeLink(indexPath, record.bodyPath)})`,
      `- Public body: ${record.context.publicBody}`,
      `- Stance: \`${record.stance.value}\` — ${record.stance.basis}`,
      `- Source: [${record.source.id}](${record.source.url}) (${record.source.locator})`,
      `- Body SHA-256: \`${record.bodySha256}\``,
      `- Credit scope: \`${record.creditScope}\``,
      `- Git projection: \`${record.projection.status}\``,
      "- Boundaries:",
      ...record.boundaries.map((boundary) => `  - ${boundary}`),
      ""
    );
  }

  const rightsLines = [
    "# Rights and consent",
    "",
    "Generated from `sourcebook/catalog.json`. Do not edit by hand.",
    "",
    "| Record | Evidence | Quote | Full text | Attribution | Public projection | Surface |",
    "| --- | --- | --- | --- | --- | --- | --- |",
    ...activeRecords.map(
      (record) =>
        `| \`${record.id}\` | ${record.rights.evidenceUse} | ${record.rights.quoteUse} | ${record.rights.fullTextRepublication} | ${record.consent.attribution} | ${record.consent.publicProjection} | ${record.projection.surfaces.join(", ")} |`
    ),
    "",
    "These fields document the bounded pilot decision. They do not grant rights or consent to later surfaces, third-party speech, recommendation material, or photographs.",
    ""
  ];

  const dependencyLines = [
    "# Correction and withdrawal dependencies",
    "",
    "Generated from `sourcebook/catalog.json`. Do not edit by hand.",
    "",
    "A body correction or withdrawal invalidates the corresponding catalog hash, publication-packet reference, public export, browse pages, and Knowledge Wiki adapter.",
    "",
    "| Perspective | Canonical body | Packet | Knowledge Wiki |",
    "| --- | --- | --- | --- |",
    ...activeRecords.map(
      (record) =>
        `| \`${record.id}\` | \`${record.bodyPath}\` | \`${packet.id}\` | \`${record.knowledgeWikiId}\` |`
    ),
    ""
  ];

  const validationLines = [
    "# Validation",
    "",
    "Generated from the current authored catalog and publication packet. Do not edit by hand.",
    "",
    `- Schema version: \`${catalog.schemaVersion}\``,
    `- Active records: \`${activeRecords.length}\``,
    `- Export fingerprint: \`${exportFingerprint}\``,
    `- Publication packet: \`${packet.id}\``,
    "- Private build dependency: `false`",
    "",
    "Run `npm run sourcebook:hillclimb` to revalidate structure, semantics, fingerprints, generated output, Knowledge Wiki integration, and repository public safety.",
    ""
  ];

  return {
    "sourcebook/public-export.json": json(publicExport),
    [indexPath]: markdown(indexLines),
    "sourcebook/catalog/RIGHTS-AND-CONSENT.md": markdown(rightsLines),
    "sourcebook/catalog/DEPENDENCIES.md": markdown(dependencyLines),
    "sourcebook/catalog/VALIDATION.md": markdown(validationLines),
    ...facetOutputs(activeRecords, "years", "years"),
    ...facetOutputs(activeRecords, "projects", "projects"),
    ...facetOutputs(activeRecords, "themes", "themes"),
    ...facetOutputs(activeRecords, "sourceTypes", "source-types")
  };
}

export function compileSourcebook({
  repoRoot = defaultRepoRoot,
  catalog,
  packet
} = {}) {
  const inputs = catalog && packet ? { catalog, packet } : readSourcebookInputs(repoRoot);
  const validation = validateSourcebook({ repoRoot, ...inputs });
  if (validation.issues.length) return { ...validation, outputs: {} };
  return {
    ...validation,
    outputs: buildSourcebookOutputs({
      catalog: validation.catalog,
      packet: validation.packet
    })
  };
}

export function writeSourcebookOutputs(repoRoot, outputs) {
  for (const [relative, content] of Object.entries(outputs)) {
    const target = path.join(repoRoot, relative);
    mkdirSync(path.dirname(target), { recursive: true });
    writeFileSync(target, content);
  }
}

export function checkSourcebookOutputs(repoRoot, outputs) {
  const failures = [];
  for (const [relative, expected] of Object.entries(outputs)) {
    const target = path.join(repoRoot, relative);
    if (!existsSync(target)) {
      failures.push(`${relative}: missing generated output`);
      continue;
    }
    if (readFileSync(target, "utf8") !== expected) {
      failures.push(`${relative}: stale generated output`);
    }
  }
  return failures;
}

export function sourcebookExportFingerprint(catalog, packet) {
  const outputs = buildSourcebookOutputs({ catalog, packet });
  return JSON.parse(outputs["sourcebook/public-export.json"]).exportFingerprint;
}
