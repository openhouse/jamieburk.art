import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.resolve(scriptDir, "..");
const repoRoot = path.resolve(appRoot, "../..");
const knowledgeBankDir = path.join(appRoot, "src/data/knowledge-bank");

const publicProjectionFiles = [
  "apps/www/src/content/work/callnyc.mdx",
  "apps/www/src/app/work/technical-operations/page.tsx",
  "apps/www/src/data/work.ts",
  "apps/www/src/data/proofs.ts",
  "docs/knowledge-bank/proofs.md",
  "docs/knowledge-bank/claims.md",
  "docs/knowledge-bank/approval-register.md"
];

const privatePathPatterns = [
  /\/Volumes\//,
  /\/Users\//,
  /file:\/\//,
  /BEGIN (?:RSA |OPENSSH |EC |DSA )?PRIVATE KEY/,
  /\bsk-[A-Za-z0-9_-]{20,}/,
  /\bghp_[A-Za-z0-9_]{20,}/
];

const stalePublicPatterns = [
  /2014[-–]2015/,
  /after a New York City Council civic-data hackathon/i,
  /New York City Council civic-data hackathon/i,
  /Digital District was the official/i,
  /CallNYC was created at the hackathon/i,
  /Civic Hall never/i
];

function readJson(relativePath) {
  const absolutePath = path.join(knowledgeBankDir, relativePath);
  return JSON.parse(fs.readFileSync(absolutePath, "utf8"));
}

function readText(relativePath) {
  return fs.readFileSync(path.join(repoRoot, relativePath), "utf8");
}

function mapById(records, label, errors) {
  const mapped = new Map();

  for (const record of records) {
    if (mapped.has(record.id)) {
      errors.push(`Duplicate ${label} id: ${record.id}`);
    }

    mapped.set(record.id, record);
  }

  return mapped;
}

function requireId(map, label, id, errors, context) {
  if (!map.has(id)) {
    errors.push(`${context} references missing ${label}: ${id}`);
  }
}

function validateHttpsUrl(url, errors, context) {
  if (!url) return;

  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:") {
      errors.push(`${context} must use https: ${url}`);
    }
  } catch {
    errors.push(`${context} is not a valid URL: ${url}`);
  }
}

function citationLabel(record) {
  return record.id ?? record.title ?? record.canonical ?? "unknown record";
}

const sources = readJson("sources.json");
const assets = readJson("assets.json");
const claims = readJson("claims.json");
const evidence = readJson("evidence.json");
const researchRuns = readJson("research-runs.json");
const corrections = readJson("corrections.json");
const citationGroups = readJson("citation-groups.json");
const projectionFiles = fs
  .readdirSync(path.join(knowledgeBankDir, "page-projections"))
  .filter((file) => file.endsWith(".json"))
  .sort();
const projections = projectionFiles.map((file) => readJson(`page-projections/${file}`));

const errors = [];
const warnings = [];

const sourceById = mapById(sources, "source", errors);
const assetById = mapById(assets, "asset", errors);
const claimById = mapById(claims, "claim", errors);
const evidenceById = mapById(evidence, "evidence", errors);
const researchRunById = mapById(researchRuns, "research run", errors);
const citationGroupById = mapById(citationGroups, "citation group", errors);

for (const source of sources) {
  validateHttpsUrl(source.originalUrl, errors, `Source ${source.id} originalUrl`);

  for (const archive of source.archiveUrls ?? []) {
    validateHttpsUrl(archive.url, errors, `Source ${source.id} archive URL`);
  }

  if (source.visibility !== "public" && (source.originalUrl || source.archiveUrls?.length)) {
    errors.push(`Private or restricted source ${source.id} must not publish URLs.`);
  }

  if (source.visibility === "public" && source.citationMode === "description-only") {
    errors.push(`Public source ${source.id} should not require description-only citation mode.`);
  }

  if (source.sourceType === "institutional-social-post" && !source.archiveUrls?.length) {
    warnings.push(`Institutional social post ${source.id} has no archive context.`);
  }

  if (!source.lastChecked) {
    warnings.push(`Source ${source.id} is missing lastChecked.`);
  }
}

for (const asset of assets) {
  if (asset.sourceId) {
    requireId(sourceById, "source", asset.sourceId, errors, `Asset ${asset.id}`);
  }

  validateHttpsUrl(asset.publicAssetUrl, errors, `Asset ${asset.id} publicAssetUrl`);

  if (asset.rightsState === "private-review" && asset.publicAssetUrl) {
    errors.push(`Private-review asset ${asset.id} must not have a publicAssetUrl.`);
  }

  if (asset.visibility !== "public" && asset.publicAssetUrl) {
    errors.push(`Private or restricted asset ${asset.id} must not publish an asset URL.`);
  }

  if (asset.visibility === "private" && asset.allowedSurfaces.includes("public-link")) {
    errors.push(`Private asset ${asset.id} cannot be allowed on public-link surfaces.`);
  }
}

for (const claim of claims) {
  for (const proofId of claim.relatedProofIds ?? []) {
    if (!proofId.trim()) {
      errors.push(`Claim ${claim.id} has an empty relatedProofId.`);
    }
  }

  if (claim.status === "unresolved" && claim.allowedSurfaces.some((surface) => surface.startsWith("/"))) {
    errors.push(`Unresolved claim ${claim.id} cannot project to a public route.`);
  }
}

for (const evidenceRecord of evidence) {
  requireId(claimById, "claim", evidenceRecord.claimId, errors, `Evidence ${evidenceRecord.id}`);

  if (evidenceRecord.target.kind === "source") {
    requireId(sourceById, "source", evidenceRecord.target.id, errors, `Evidence ${evidenceRecord.id}`);
  } else if (evidenceRecord.target.kind === "asset") {
    requireId(assetById, "asset", evidenceRecord.target.id, errors, `Evidence ${evidenceRecord.id}`);
  } else if (evidenceRecord.target.kind === "research-run") {
    requireId(
      researchRunById,
      "research run",
      evidenceRecord.target.id,
      errors,
      `Evidence ${evidenceRecord.id}`
    );
  }

  if (!evidenceRecord.publicSafe) {
    errors.push(`Evidence ${evidenceRecord.id} is not public-safe and cannot be used in this bank.`);
  }
}

for (const researchRun of researchRuns) {
  const expectedCounts = [
    "deduplicated_html_captures",
    "original_urls",
    "distinct_event_url_keys",
    "successful_pages",
    "redirects",
    "not_found_captures"
  ];

  for (const key of expectedCounts) {
    if (typeof researchRun.counts[key] !== "number") {
      errors.push(`Research run ${researchRun.id} is missing numeric count ${key}.`);
    }
  }

  if (researchRun.privateResearchArtifacts) {
    warnings.push(`Research run ${researchRun.id} is public-citation-only; private artifacts remain outside git.`);
  }
}

for (const correction of corrections) {
  for (const claimId of correction.supportingClaimIds) {
    requireId(claimById, "claim", claimId, errors, `Correction ${correction.id}`);
  }

  if (correction.status === "required-before-production") {
    errors.push(`Correction ${correction.id} is still required before production.`);
  }
}

for (const group of citationGroups) {
  const evidenceSet = new Set(group.evidenceIds);

  for (const claimId of group.claimIds) {
    requireId(claimById, "claim", claimId, errors, `Citation group ${group.id}`);
  }

  for (const evidenceId of group.evidenceIds) {
    requireId(evidenceById, "evidence", evidenceId, errors, `Citation group ${group.id}`);
    const evidenceRecord = evidenceById.get(evidenceId);

    if (evidenceRecord && !group.claimIds.includes(evidenceRecord.claimId)) {
      errors.push(
        `Citation group ${group.id} includes evidence ${evidenceId} for claim ${evidenceRecord.claimId}, which is not in claimIds.`
      );
    }
  }

  for (const evidenceId of group.sourceOrder) {
    if (!evidenceSet.has(evidenceId)) {
      errors.push(`Citation group ${group.id} sourceOrder includes missing evidence ${evidenceId}.`);
    }
  }

  if (group.visibility === "public") {
    const hasPrivateEvidence = group.evidenceIds.some((evidenceId) => {
      const evidenceRecord = evidenceById.get(evidenceId);
      if (!evidenceRecord) return false;
      if (evidenceRecord.target.kind === "source") {
        return sourceById.get(evidenceRecord.target.id)?.visibility === "private";
      }
      if (evidenceRecord.target.kind === "asset") {
        return assetById.get(evidenceRecord.target.id)?.visibility === "private";
      }
      return false;
    });

    if (hasPrivateEvidence && !group.boundaryNote) {
      errors.push(`Public citation group ${group.id} uses private evidence without a boundary note.`);
    }

    if (hasPrivateEvidence) {
      warnings.push(`Citation group ${group.id} cites private evidence only through public-safe description.`);
    }
  }
}

for (const projection of projections) {
  if (!projection.page?.startsWith("/")) {
    errors.push(`Projection ${projection.page ?? "(missing page)"} must use a route-like page path.`);
  }

  const seenCitationKeys = new Set();
  const seenGroups = new Set();

  for (const occurrence of projection.occurrences) {
    if (seenCitationKeys.has(occurrence.citationKey)) {
      errors.push(`Projection ${projection.page} repeats citationKey ${occurrence.citationKey}.`);
    }

    seenCitationKeys.add(occurrence.citationKey);
    requireId(
      citationGroupById,
      "citation group",
      occurrence.citationGroupId,
      errors,
      `Projection ${projection.page}`
    );

    const group = citationGroupById.get(occurrence.citationGroupId);
    if (group?.visibility !== "public") {
      errors.push(`Projection ${projection.page} cannot cite non-public group ${occurrence.citationGroupId}.`);
    }

    seenGroups.add(occurrence.citationGroupId);
  }

  if (!seenGroups.size) {
    warnings.push(`Projection ${projection.page} has no citations.`);
  }
}

for (const relativePath of publicProjectionFiles) {
  const text = readText(relativePath);

  for (const pattern of stalePublicPatterns) {
    if (pattern.test(text)) {
      errors.push(`Public projection file ${relativePath} contains stale or prohibited CallNYC wording: ${pattern}`);
    }
  }
}

const serializedKnowledgeBank = JSON.stringify(
  {
    sources,
    assets,
    claims,
    evidence,
    researchRuns,
    corrections,
    citationGroups,
    projections
  },
  null,
  2
);

for (const pattern of privatePathPatterns) {
  if (pattern.test(serializedKnowledgeBank)) {
    errors.push(`Knowledge-bank citation data contains a private path or credential-like string: ${pattern}`);
  }
}

if (!claims.some((claim) => claim.id === "CLM-CALLNYC-CIVICHALL-PAGE-NOT-RECOVERED")) {
  errors.push("Missing bounded negative-search claim for the unrecovered Civic Hall event page.");
}

if (!citationGroups.some((group) => group.id === "CALLNYC-NOTE-04" && group.visibility === "restricted")) {
  errors.push("Missing restricted citation group for the Civic Hall negative search boundary.");
}

if (errors.length) {
  console.error("Citation check failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }

  if (warnings.length) {
    console.warn("\nCitation warnings:");
    for (const warning of warnings) {
      console.warn(`- ${warning}`);
    }
  }

  process.exit(1);
}

console.log(
  `Citation check passed for ${claims.length} claims, ${evidence.length} evidence records, ${citationGroups.length} citation groups, and ${projections.length} page projections.`
);

if (warnings.length) {
  console.warn("Citation warnings:");
  for (const warning of warnings) {
    console.warn(`- ${warning}`);
  }
}

for (const group of citationGroups) {
  console.log(`- ${group.id}: ${citationLabel(group)} (${group.visibility})`);
}
