#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

export const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function readJson(root, filename) {
  return JSON.parse(
    readFileSync(path.join(root, "apps/www/src/data/citations", filename), "utf8")
  );
}

export function loadCitationData(root = repoRoot) {
  return {
    sources: readJson(root, "sources.json"),
    claims: readJson(root, "claims.json"),
    inquiries: readJson(root, "research-inquiries.json"),
    corrections: readJson(root, "corrections.json"),
    assets: readJson(root, "assets.json"),
    citationSets: readJson(root, "citation-sets.json")
  };
}

function collectIds(records, label, failures) {
  const ids = new Set();
  for (const record of records) {
    if (!record.id) failures.push(`${label} record is missing an ID`);
    if (ids.has(record.id)) failures.push(`Duplicate ${label} ID: ${record.id}`);
    ids.add(record.id);
  }
  return ids;
}

export function unsafePublicValue(value) {
  return /file:\/\/|\/(?:private|tmp|Volumes|Users)\/|[A-Za-z]:\\|\\\\|Mobile Documents|CloudStorage|civic-hall-wayback-research|X-Amz-(?:Credential|Signature)|[?&](?:sig|signature|token)=/i.test(
    String(value)
  );
}

export function mdxPathFor(root, pagePath) {
  const match = /^\/work\/([a-z0-9-]+)$/.exec(pagePath);
  if (!match) return null;
  return path.join(root, `apps/www/src/content/work/${match[1]}.mdx`);
}

export function citeRecords(source) {
  return [...source.matchAll(/<Cite\s+([\s\S]*?)\s*\/>/g)].map((match) => {
    const props = match[1];
    return {
      setId: /setId="([^"]+)"/.exec(props)?.[1],
      claimId: /claimId="([^"]+)"/.exec(props)?.[1],
      occurrence: Number(/occurrence=\{(\d+)\}/.exec(props)?.[1])
    };
  });
}

export function buildPageNumbers(citationSet) {
  return new Map(citationSet.entries.map((entry, index) => [entry.claimId, index + 1]));
}

export function citationAnchorIds(citationSet, claimId, occurrence) {
  const number = buildPageNumbers(citationSet).get(claimId);
  if (!number) throw new Error(`Unknown claim ${claimId} in ${citationSet.id}`);
  return {
    number,
    noteId: `cite-note-${citationSet.id}-${number}`,
    citationId: `cite-ref-${citationSet.id}-${number}-${occurrence}`
  };
}

export function publicSourceLinks(source) {
  if (["protected", "private"].includes(source.visibility)) return [];
  const links = [];
  if (source.preferredPublicUrl) links.push(source.preferredPublicUrl);
  if (source.originalUrl && source.originalUrl !== source.preferredPublicUrl) {
    links.push(source.originalUrl);
  }
  return [...new Set(links)];
}

export function containsProhibitedWording(text, claim) {
  const haystack = text.toLowerCase();
  return (claim.prohibitedWording ?? []).filter((wording) =>
    haystack.includes(wording.toLowerCase())
  );
}

export function validateCitationData(
  data,
  { root = repoRoot, checkFiles = true } = {}
) {
  const failures = [];
  const warnings = [];
  const sourceIds = collectIds(data.sources, "source", failures);
  const claimIds = collectIds(data.claims, "claim", failures);
  collectIds(data.inquiries, "research-inquiry", failures);
  collectIds(data.corrections, "correction", failures);
  collectIds(data.assets, "asset", failures);
  collectIds(data.citationSets, "citation-set", failures);

  const sourcesById = new Map(data.sources.map((source) => [source.id, source]));
  const claimsById = new Map(data.claims.map((claim) => [claim.id, claim]));
  const citedSourceIds = new Set();
  const declaredSurfaces = new Set([
    "knowledge-bank",
    ...data.citationSets.map((set) => set.pagePath)
  ]);

  for (const source of data.sources) {
    if (!source.shortCitation || !source.fullCitation) {
      failures.push(`${source.id} lacks safe citation text`);
    }
    if (unsafePublicValue(JSON.stringify(source))) {
      failures.push(`${source.id} contains a local, private, signed, or unsafe value`);
    }
    if (
      ["protected", "private"].includes(source.visibility) &&
      [source.originalUrl, source.archiveUrl, source.preferredPublicUrl].some(Boolean)
    ) {
      failures.push(`${source.id} is ${source.visibility} but exposes a public URL`);
    }
    if (source.originalUrl && !source.archiveUrl) {
      warnings.push(`${source.id} has a fragile original URL but no archive URL`);
    }
    if (source.status === "archived" && source.archiveUrl && !source.originalUrl) {
      warnings.push(`${source.id} is archived but has no preserved original URL`);
    }
    if (source.visibility === "public_with_limits" && !source.publicNote) {
      warnings.push(`${source.id} is public_with_limits but has no public note`);
    }
  }

  for (const claim of data.claims) {
    const recordStatus = claim.recordStatus ?? "active";
    if (claim.publicApproved && !claim.evidence?.length) {
      failures.push(`${claim.id} is public-approved but has no evidence`);
    }
    if (
      recordStatus === "superseded" &&
      (claim.publicApproved || (claim.approvedSurfaces ?? []).length)
    ) {
      failures.push(`${claim.id} is superseded but remains approved for public projection`);
    }
    if (claim.evidenceStatus === "not_recovered") {
      if (!claim.qualifier || !(claim.limitations ?? []).length) {
        failures.push(`${claim.id} is not_recovered but lacks a qualifier or limitation`);
      }
    }
    if (claim.evidenceStatus === "responsible_inference" && !claim.qualifier) {
      failures.push(`${claim.id} is a responsible inference without a qualifier`);
    }
    for (const relationship of claim.evidence ?? []) {
      if (!sourceIds.has(relationship.sourceId)) {
        failures.push(`${claim.id} references unknown source ${relationship.sourceId}`);
      } else {
        citedSourceIds.add(relationship.sourceId);
      }
    }
    const supportingSources = (claim.evidence ?? [])
      .map((relationship) => sourcesById.get(relationship.sourceId))
      .filter(Boolean);
    if (
      claim.publicApproved &&
      supportingSources.length > 0 &&
      supportingSources.every((source) => source.visibility === "private") &&
      supportingSources.some((source) => !source.shortCitation || !source.fullCitation)
    ) {
      failures.push(`${claim.id} relies only on private evidence without safe citation text`);
    }
    if (claim.publicApproved && (claim.approvedSurfaces ?? []).length === 1) {
      warnings.push(`${claim.id} is approved for only one surface`);
    }
  }

  for (const inquiry of data.inquiries) {
    if (!inquiry.limitation) failures.push(`${inquiry.id} has no stated limitation`);
    if (unsafePublicValue(JSON.stringify(inquiry))) {
      failures.push(`${inquiry.id} contains a local or private research value`);
    }
  }

  for (const asset of data.assets) {
    if (asset.sourceId && !sourceIds.has(asset.sourceId)) {
      failures.push(`${asset.id} references unknown source ${asset.sourceId}`);
    }
    if (unsafePublicValue(JSON.stringify(asset))) {
      failures.push(`${asset.id} contains a local or private asset value`);
    }
    for (const surface of asset.allowedSurfaces ?? []) {
      if (!declaredSurfaces.has(surface)) {
        failures.push(`${asset.id} is allowed on undeclared surface ${surface}`);
      }
    }
    if (asset.publicUseStatus === "approved") {
      const consentCleared = ["cleared", "not_required"].includes(asset.consentStatus);
      if (asset.rightsStatus !== "cleared" || !consentCleared) {
        failures.push(`${asset.id} is public-approved without cleared rights and consent`);
      }
      if (["protected", "private"].includes(asset.visibility)) {
        failures.push(`${asset.id} is ${asset.visibility} but marked for public use`);
      }
    }
  }

  for (const set of data.citationSets) {
    if (!/^\/[a-z0-9-/]*$/.test(set.pagePath) || set.pagePath.includes("..")) {
      failures.push(`${set.id} has invalid page path ${set.pagePath}`);
    }
    const declaredClaims = new Set();
    for (const entry of set.entries) {
      const claim = claimsById.get(entry.claimId);
      if (!claimIds.has(entry.claimId)) {
        failures.push(`${set.id} references unknown claim ${entry.claimId}`);
      }
      if (declaredClaims.has(entry.claimId)) {
        failures.push(`${set.id} declares ${entry.claimId} more than once`);
      }
      if (claim?.recordStatus === "superseded") {
        failures.push(`${set.id} projects superseded claim ${entry.claimId}`);
      }
      if (claim && !claim.approvedSurfaces.includes(set.pagePath)) {
        failures.push(`${entry.claimId} is not approved for ${set.pagePath}`);
      }
      declaredClaims.add(entry.claimId);
    }

    if (!checkFiles) continue;
    const mdxPath = mdxPathFor(root, set.pagePath);
    if (!mdxPath || !existsSync(mdxPath)) {
      failures.push(`${set.id} does not map to an existing MDX page`);
      continue;
    }
    const mdx = readFileSync(mdxPath, "utf8");
    const cites = citeRecords(mdx).filter((cite) => cite.setId === set.id);
    const firstAppearance = [...new Set(cites.map((cite) => cite.claimId))];
    const declaredOrder = set.entries.map((entry) => entry.claimId);
    if (JSON.stringify(firstAppearance) !== JSON.stringify(declaredOrder)) {
      failures.push(`${set.id} order differs from first appearance in MDX`);
    }
    for (const cite of cites) {
      if (!cite.claimId || !declaredClaims.has(cite.claimId)) {
        failures.push(`${set.id} MDX references undeclared claim ${cite.claimId ?? "missing"}`);
      }
      if (!Number.isInteger(cite.occurrence) || cite.occurrence < 1) {
        failures.push(`${set.id} has a missing or invalid occurrence`);
      }
    }
    for (const entry of set.entries) {
      const occurrences = cites
        .filter((cite) => cite.claimId === entry.claimId)
        .map((cite) => cite.occurrence)
        .sort((a, b) => a - b);
      const expected = Array.from({ length: entry.occurrences }, (_, index) => index + 1);
      if (!occurrences.length) failures.push(`${set.id} declares unused claim ${entry.claimId}`);
      if (JSON.stringify(occurrences) !== JSON.stringify(expected)) {
        failures.push(`${set.id} claim ${entry.claimId} occurrences must be contiguous`);
      }
      const claim = claimsById.get(entry.claimId);
      if (claim) {
        for (const wording of containsProhibitedWording(mdx, claim)) {
          failures.push(`${set.pagePath} contains prohibited wording: ${wording}`);
        }
      }
    }
    if (!new RegExp(`<References\\s+setId="${set.id}"\\s*\\/>`).test(mdx)) {
      failures.push(`${set.id} page is missing its References component`);
    }
  }

  for (const source of data.sources) {
    if (!citedSourceIds.has(source.id)) warnings.push(`${source.id} is not used by a claim`);
  }

  if (checkFiles) {
    const callnycFiles = [
      "apps/www/src/content/work/callnyc.mdx",
      "apps/www/src/data/work.ts"
    ];
    const proofSource = readFileSync(
      path.join(root, "apps/www/src/data/proofs.ts"),
      "utf8"
    );
    const proofStart = proofSource.indexOf('id: "callnyc-civic-data-guidance"');
    const proofEnd = proofSource.indexOf("doNotSay:", proofStart);
    const callnycPublicProofFields = proofSource.slice(proofStart, proofEnd);
    const publicCallnyc = callnycFiles
      .map((relativePath) => readFileSync(path.join(root, relativePath), "utf8"))
      .concat(callnycPublicProofFields)
      .join("\n");
    if (/2014[–-]2015/.test(publicCallnyc)) {
      failures.push("A public CallNYC surface retains the superseded 2014-2015 value");
    }
    if (/first civic-data hackathon/i.test(publicCallnyc)) {
      failures.push("A public CallNYC surface retains broad first civic-data hackathon wording");
    }
  }

  return { failures, warnings };
}

export function runCitationCheck(root = repoRoot) {
  const result = validateCitationData(loadCitationData(root), { root, checkFiles: true });
  if (result.warnings.length) {
    console.warn("Citation warnings:");
    for (const warning of result.warnings) console.warn(`- ${warning}`);
  }
  if (result.failures.length) {
    console.error("Citation check failed:");
    for (const failure of result.failures) console.error(`- ${failure}`);
    return 1;
  }
  console.log(
    `Citation check passed${result.warnings.length ? ` with ${result.warnings.length} warning(s)` : ""}.`
  );
  return 0;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  process.exitCode = runCitationCheck();
}
