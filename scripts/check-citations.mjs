#!/usr/bin/env node

import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { resolveCitationPage, assertNoDuplicateDomIds } from "../apps/www/src/data/knowledge-bank/resolve-citations.mjs";

const scriptPath = fileURLToPath(import.meta.url);
const defaultRepoRoot = path.resolve(path.dirname(scriptPath), "..");
const privatePathPattern = /(?:\/private\/tmp\/|\/Users\/|\/Volumes\/|Mobile Documents|[A-Z]:\\)/i;
const nonexistencePattern = /(?:proves?|establishes?)\s+(?:that\s+)?(?:no|never|nonexistence)|(?:never|did not) exist/i;
const publicClaimStatuses = new Set(["defensible"]);

function readJson(root, file) {
  return JSON.parse(readFileSync(path.join(root, file), "utf8"));
}

function walk(directory) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const item = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(item) : [item];
  });
}

function recordKey(record, label) {
  return label === "page" ? record.route : record.id;
}

function duplicates(records, label = "record") {
  const ids = records.map((record) => recordKey(record, label));
  return [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
}

function normalize(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function mapById(records) {
  return new Map(records.map((record) => [record.id, record]));
}

export function loadCitationData(repoRoot = defaultRepoRoot) {
  const dataRoot = path.join(repoRoot, "apps/www/src/data/knowledge-bank");
  return {
    sources: readJson(dataRoot, "sources.json"),
    claims: readJson(dataRoot, "claims.json"),
    evidence: readJson(dataRoot, "evidence.json"),
    notes: readJson(dataRoot, "citation-notes.json"),
    pages: readJson(dataRoot, "pages.json"),
    artifacts: readJson(dataRoot, "artifacts.json"),
    researchRuns: readJson(dataRoot, "research-runs.json"),
    corrections: readJson(dataRoot, "corrections.json")
  };
}

export function validateCitationData(data, options = {}) {
  const repoRoot = options.repoRoot ?? defaultRepoRoot;
  const production = options.production ?? false;
  const failures = [];
  const warnings = [];
  const collections = [
    ["source", data.sources], ["claim", data.claims], ["evidence", data.evidence],
    ["note", data.notes], ["page", data.pages], ["artifact", data.artifacts],
    ["research run", data.researchRuns], ["correction", data.corrections]
  ];

  for (const [label, records] of collections) {
    if (!Array.isArray(records)) {
      failures.push(`${label} records must be an array`);
      continue;
    }
    const duplicateRecordIds = duplicates(records, label);
    if (duplicateRecordIds.length) failures.push(`Duplicate ${label} IDs: ${duplicateRecordIds.join(", ")}`);
    for (const record of records) {
      const key = record && typeof record === "object" ? recordKey(record, label) : undefined;
      if (!record || typeof record !== "object" || typeof key !== "string" || !key) {
        failures.push(`${label} record has invalid schema or missing ID`);
      }
    }
  }

  const allRecords = collections
    .filter(([label]) => label !== "page")
    .flatMap(([, records]) => records ?? []);
  const globalDuplicateIds = duplicates(allRecords);
  if (globalDuplicateIds.length) failures.push(`IDs collide across record types: ${globalDuplicateIds.join(", ")}`);

  const sourcesById = mapById(data.sources);
  const claimsById = mapById(data.claims);
  const evidenceById = mapById(data.evidence);
  const notesById = mapById(data.notes);
  const artifactsById = mapById(data.artifacts);
  const registry = { sourcesById, claimsById, evidenceById, notesById };

  const serializedPublicData = JSON.stringify(data);
  if (privatePathPattern.test(serializedPublicData)) {
    failures.push("Citation data contains an absolute private filesystem path");
  }
  if (/"(?:citationNumber|referenceNumber|publicNumber|displayNumber)"\s*:/.test(serializedPublicData)) {
    failures.push("Citation data stores a display number; numbers must be page-local and generated");
  }

  for (const source of data.sources) {
    for (const required of ["type", "title", "shortTitle", "visibility", "availability", "publicNote"]) {
      if (!source[required]) failures.push(`Source ${source.id} is missing ${required}`);
    }
    if (!Array.isArray(source.establishes) || !source.establishes.length) failures.push(`Source ${source.id} has no establishes list`);
    if (!Array.isArray(source.doesNotEstablish) || !source.doesNotEstablish.length) failures.push(`Source ${source.id} has no doesNotEstablish list`);
    if (source.visibility === "protected" && source.links?.length) failures.push(`Protected source ${source.id} exposes public links`);
    if (source.type === "participant-archive" && source.visibility !== "protected") failures.push(`Participant source ${source.id} must remain protected`);
    for (const carriedId of source.archiveCarrierFor ?? []) {
      if (!sourcesById.has(carriedId)) failures.push(`Source ${source.id} carries unknown source ${carriedId}`);
    }
    if (source.visibility === "public" && !source.links?.length) warnings.push(`Public source ${source.id} has no public link`);
    if (source.visibility === "public" && !source.links?.some((link) => link.kind.includes("archive"))) {
      const hasCarrier = data.sources.some((candidate) => candidate.archiveCarrierFor?.includes(source.id));
      if (!hasCarrier) warnings.push(`Public source ${source.id} has no archive link or archive carrier`);
    }
  }

  for (const claim of data.claims) {
    if (!Array.isArray(claim.allowedSurfaces) || !claim.allowedSurfaces.length) failures.push(`Claim ${claim.id} has no allowed surfaces`);
    if (!Array.isArray(claim.boundaries) || !claim.boundaries.length) failures.push(`Claim ${claim.id} has no boundaries`);
    if (!Array.isArray(claim.antiClaims) || !claim.antiClaims.length) failures.push(`Claim ${claim.id} has no anti-claims`);

    const claimEvidence = data.evidence.filter((item) => item.claimId === claim.id);
    const publicEvidence = claimEvidence.filter((item) => item.publicCitation && sourcesById.get(item.sourceId)?.visibility === "public");
    if (claim.citationPolicy === "required" && !publicEvidence.length) {
      failures.push(`Citation-required claim ${claim.id} has no public evidence`);
    }
    if (claim.status === "superseded" && claim.publicProjection) failures.push(`Superseded claim ${claim.id} retains public wording`);
  }

  for (const relationship of data.evidence) {
    const claim = claimsById.get(relationship.claimId);
    const source = sourcesById.get(relationship.sourceId);
    if (!claim) failures.push(`Evidence ${relationship.id} references unknown claim ${relationship.claimId}`);
    if (!source) failures.push(`Evidence ${relationship.id} references unknown source ${relationship.sourceId}`);
    if (!claim || !source) continue;

    if (relationship.publicCitation && source.visibility !== "public") failures.push(`Evidence ${relationship.id} publicly cites non-public source ${source.id}`);
    if (relationship.publicCitation && !publicClaimStatuses.has(claim.status)) failures.push(`Evidence ${relationship.id} publicly cites ${claim.status} claim ${claim.id}`);
    if (relationship.relation === "does-not-support" && relationship.publicCitation) failures.push(`Evidence ${relationship.id} uses does-not-support as positive public evidence`);
    if (relationship.relation === "negative-search-result" && nonexistencePattern.test(`${relationship.supportsText} ${relationship.citationNote ?? ""}`)) {
      failures.push(`Negative-search evidence ${relationship.id} is worded as proof of nonexistence`);
    }
    if (relationship.relation === "archival-carrier" && !relationship.limitations.some((item) => /not the event listing/i.test(item))) {
      failures.push(`Archive-carrier evidence ${relationship.id} does not reject event-listing status`);
    }
    if (
      ["participant-archive-only", "visual-evidence"].includes(relationship.relation) &&
      source.type === "participant-archive" &&
      relationship.publicCitation &&
      claim.allowedSurfaces.some((surface) => surface.startsWith("/"))
    ) {
      failures.push(`Participant or visual evidence ${relationship.id} is used as institutional public proof`);
    }

    const support = normalize(relationship.supportsText);
    for (const excluded of source.doesNotEstablish) {
      const rejected = normalize(excluded);
      if (support === rejected || (rejected.length > 24 && support.includes(rejected))) {
        failures.push(`Evidence ${relationship.id} conflicts with source boundary: ${excluded}`);
      }
    }
  }

  for (const note of data.notes) {
    for (const claimId of note.claimIds ?? []) if (!claimsById.has(claimId)) failures.push(`Note ${note.id} references unknown claim ${claimId}`);
    for (const evidenceId of note.evidenceIds ?? []) if (!evidenceById.has(evidenceId)) failures.push(`Note ${note.id} references unknown evidence ${evidenceId}`);
    if (note.status === "ready") {
      for (const claimId of note.claimIds) {
        if (claimsById.get(claimId)?.status !== "defensible") failures.push(`Ready note ${note.id} uses non-defensible claim ${claimId}`);
      }
      for (const evidenceId of note.evidenceIds) {
        if (!evidenceById.get(evidenceId)?.publicCitation) failures.push(`Ready note ${note.id} uses non-public evidence ${evidenceId}`);
      }
    }
  }

  const resolvedPages = [];
  for (const page of data.pages) {
    try {
      const resolved = resolveCitationPage(page, registry);
      assertNoDuplicateDomIds(resolved);
      resolvedPages.push(resolved);
    } catch (error) {
      failures.push(error instanceof Error ? error.message : String(error));
    }
  }

  for (const artifact of data.artifacts) {
    if (artifact.sourceId && !sourcesById.has(artifact.sourceId)) failures.push(`Artifact ${artifact.id} references unknown source ${artifact.sourceId}`);
    if (artifact.type === "photograph" && artifact.publicationStatus === "public" && artifact.rightsStatus !== "cleared") {
      failures.push(`Photograph ${artifact.id} is public without cleared rights`);
    }
    if (artifact.id.includes("digital-district") && artifact.publicationStatus === "public") {
      failures.push("Digital District participant photograph must remain non-public");
    }
  }

  for (const run of data.researchRuns) {
    if (nonexistencePattern.test(`${run.result} ${run.interpretation}`)) failures.push(`Research run ${run.id} is worded as proof of nonexistence`);
    if (!Array.isArray(run.doesNotProve) || !run.doesNotProve.length) failures.push(`Research run ${run.id} has no doesNotProve boundary`);
  }

  for (const correction of data.corrections) {
    for (const claimId of correction.relatedClaimIds ?? []) if (!claimsById.has(claimId)) failures.push(`Correction ${correction.id} references unknown claim ${claimId}`);
    for (const sourceId of correction.relatedSourceIds ?? []) if (!sourcesById.has(sourceId)) failures.push(`Correction ${correction.id} references unknown source ${sourceId}`);
    if (production && correction.status === "required-before-production") failures.push(`Production blocked by unresolved correction ${correction.id}`);
  }

  const callnycClaim = claimsById.get("claim.callnyc.hackathon.first-councilstat");
  if (!/Council.*described|described.*Council/i.test(callnycClaim?.publicProjection ?? "")) failures.push("CouncilStat public wording drops attribution");
  if (/first civic-data hackathon/i.test(callnycClaim?.publicProjection ?? "")) failures.push("CouncilStat public wording broadens to first civic-data hackathon");

  if (options.checkRepo !== false) {
    const callnycPath = path.join(repoRoot, "apps/www/src/content/work/callnyc.mdx");
    const workPath = path.join(repoRoot, "apps/www/src/data/work.ts");
    const proofsPath = path.join(repoRoot, "apps/www/src/data/proofs.ts");
    const citePath = path.join(repoRoot, "apps/www/src/components/citations/Cite.tsx");
    const referencesPath = path.join(repoRoot, "apps/www/src/components/citations/References.tsx");
    const publicText = [callnycPath, workPath].map((file) => readFileSync(file, "utf8")).join("\n");
    if (/Council(?:'s|’s) first civic-data hackathon/i.test(publicText)) failures.push("Public site copy still calls the event the Council's first civic-data hackathon");
    if (/CallNYC (?:was )?built (?:at|during) the hackathon/i.test(publicText)) failures.push("Public site copy says CallNYC was built during the hackathon");
    if (/event (?:ran|lasted) (?:from )?1-3 p\.m\./i.test(publicText)) failures.push("Public site copy presents announced hours as proved duration");
    if (/2014-2015/.test(publicText)) failures.push("CallNYC public copy still contains 2014-2015");

    const callnycMdx = readFileSync(callnycPath, "utf8");
    const page = data.pages.find((item) => item.route === "/work/callnyc");
    for (const occurrence of page?.occurrences ?? []) {
      if (!callnycMdx.includes(`occurrence=\"${occurrence.id}\"`)) failures.push(`CallNYC MDX is missing citation occurrence ${occurrence.id}`);
    }
    if (!/<References page=\{callnycCitationPage\} \/>/.test(callnycMdx)) failures.push("CallNYC MDX does not render References");
    if (/note\.callnyc\.digital-district-photo/.test(JSON.stringify(page))) failures.push("CallNYC page manifest renders the protected photo note");

    const citeSource = readFileSync(citePath, "utf8");
    const referencesSource = readFileSync(referencesPath, "utf8");
    for (const requirement of [
      [citeSource, 'role="doc-noteref"', "Cite is missing doc-noteref role"],
      [referencesSource, 'role="doc-endnotes"', "References is missing doc-endnotes role"],
      [referencesSource, 'role="doc-backlink"', "References is missing doc-backlink role"]
    ]) if (!requirement[0].includes(requirement[1])) failures.push(requirement[2]);
    if (/^["']use client["']/m.test(citeSource + referencesSource)) failures.push("Citation components must remain server-rendered");

    const proofBlock = /id:\s*"callnyc-civic-data-guidance"([\s\S]*?)lastReviewed:/.exec(readFileSync(proofsPath, "utf8"))?.[1] ?? "";
    const proofWording = /publicWording:\s*\n?\s*"([^"]+)"/.exec(proofBlock)?.[1];
    const canonicalProjection = claimsById.get("claim.callnyc.project.independent-follow-on")?.publicProjection;
    if (proofWording !== canonicalProjection) failures.push("CallNYC proof projection has drifted from the canonical citation claim");

    for (const blockedRoute of ["proofs", "knowledge-bank", "public-claims", "sources"]) {
      if (existsSync(path.join(repoRoot, "apps/www/src/app", blockedRoute))) failures.push(`Public citation-data route must not exist: /${blockedRoute}`);
    }
  }

  return { failures, warnings, resolvedPages, artifactsById };
}

export function runCitationCheck() {
  const production = [process.env.APP_ENV, process.env.SITE_ENV, process.env.NEXT_PUBLIC_DEPLOY_ENV, process.env.NODE_ENV].includes("production");
  let data;
  try {
    data = loadCitationData();
  } catch (error) {
    console.error(`Citation check failed: ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
  }
  const result = validateCitationData(data, { production, repoRoot: defaultRepoRoot });
  if (result.warnings.length) {
    console.warn("Citation warnings:");
    result.warnings.forEach((warning) => console.warn(`- ${warning}`));
  }
  if (result.failures.length) {
    console.error("Citation check failed:");
    result.failures.forEach((failure) => console.error(`- ${failure}`));
    process.exit(1);
  }
  console.log(`Citation check passed for ${data.sources.length} sources, ${data.claims.length} claims, ${data.notes.length} notes, and ${data.pages.length} page(s).`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === scriptPath) runCitationCheck();
