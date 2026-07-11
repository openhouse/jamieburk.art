#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const citationDir = path.join(repoRoot, "apps/www/src/data/citations");
const defaultFiles = {
  sources: path.join(citationDir, "sources.json"),
  claims: path.join(citationDir, "claims.json"),
  notes: path.join(citationDir, "notes.json"),
  pages: path.join(citationDir, "pages.json"),
  findings: path.join(citationDir, "research-findings.json"),
  media: path.join(citationDir, "media.json"),
  corrections: path.join(citationDir, "corrections.json")
};

const privatePathPattern =
  /\/Users\/|\/Volumes\/|\/private\/tmp|Mobile Documents|supporting-materials|private archive|raw transcript|civic-hall-wayback-research/i;

const publicCopyFiles = [
  "apps/www/src/content/work/callnyc.mdx",
  "apps/www/src/data/work.ts",
  "apps/www/src/data/proofs.ts",
  "apps/www/src/app/work/technical-operations/page.tsx",
  "docs/knowledge-bank/claims.md",
  "docs/knowledge-bank/proofs.md"
].map((file) => path.join(repoRoot, file));

const citationComponentFiles = [
  "apps/www/src/components/citations/Citation.tsx",
  "apps/www/src/components/citations/References.tsx",
  "apps/www/src/components/citations/SourceLinks.tsx"
].map((file) => path.join(repoRoot, file));

function readJson(file) {
  return JSON.parse(readFileSync(file, "utf8"));
}

function readText(file) {
  return readFileSync(file, "utf8");
}

function isValidUrl(value) {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

function duplicateIds(items, idField = "id") {
  const seen = new Set();
  const duplicates = new Set();

  for (const item of items) {
    const id = item[idField];
    if (seen.has(id)) duplicates.add(id);
    seen.add(id);
  }

  return [...duplicates];
}

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

export function buildPageNumbers(page) {
  return new Map(page.citationOrder.map((item, index) => [item.noteId, index + 1]));
}

export function citationAnchorIds(page, noteId, occurrenceId) {
  const numbers = buildPageNumbers(page);
  const number = numbers.get(noteId);

  if (!number) {
    throw new Error(`Citation note ${noteId} is not projected on ${page.pageId}`);
  }

  return {
    number,
    noteId: `ref-${page.pageId}-${number}`,
    citationId: `cite-${page.pageId}-${number}-${occurrenceId}`
  };
}

export function loadCitationData(files = defaultFiles) {
  return {
    sources: readJson(files.sources),
    claims: readJson(files.claims),
    notes: readJson(files.notes),
    pages: readJson(files.pages),
    findings: readJson(files.findings),
    media: readJson(files.media),
    corrections: readJson(files.corrections),
    raw: Object.fromEntries(
      Object.entries(files).map(([key, file]) => [key, readText(file)])
    )
  };
}

export function summarizeCitationData(data) {
  const sources = data.sources ?? [];
  const claims = data.claims ?? [];
  const notes = data.notes ?? [];
  const pages = data.pages ?? [];
  const findings = data.findings ?? [];
  const media = data.media ?? [];
  const corrections = data.corrections ?? [];

  const sourceVisibility = sources.reduce(
    (acc, source) => {
      if (source.publicCitation) acc.public += 1;
      else acc.restricted += 1;
      return acc;
    },
    { public: 0, restricted: 0 }
  );

  const claimStatuses = claims.reduce((acc, claim) => {
    acc[claim.status] = (acc[claim.status] ?? 0) + 1;
    return acc;
  }, {});

  const noteIds = new Set(notes.map((note) => note.id));
  const projectedNoteIds = new Set(
    pages.flatMap((page) => page.citationOrder.map((item) => item.noteId))
  );

  return {
    counts: {
      sources: sources.length,
      claims: claims.length,
      notes: notes.length,
      pages: pages.length,
      researchFindings: findings.length,
      media: media.length,
      corrections: corrections.length
    },
    sourceVisibility,
    claimStatuses,
    orphanNotes: [...noteIds].filter((id) => !projectedNoteIds.has(id)),
    pageOrders: Object.fromEntries(
      pages.map((page) => [page.pageId, page.citationOrder.map((item) => item.noteId)])
    )
  };
}

export function validateCitationData(data, options = {}) {
  const failures = [];
  const warnings = [];
  const sources = data.sources ?? [];
  const claims = data.claims ?? [];
  const notes = data.notes ?? [];
  const pages = data.pages ?? [];
  const findings = data.findings ?? [];
  const media = data.media ?? [];
  const corrections = data.corrections ?? [];
  const raw = data.raw ?? {};

  const sourceById = new Map(sources.map((source) => [source.id, source]));
  const claimById = new Map(claims.map((claim) => [claim.id, claim]));
  const noteById = new Map(notes.map((note) => [note.id, note]));
  const pageById = new Map(pages.map((page) => [page.pageId, page]));
  const mediaById = new Map(media.map((item) => [item.id, item]));
  const findingIds = new Set(findings.map((finding) => finding.id));

  function fail(message) {
    failures.push(message);
  }

  function warn(message) {
    warnings.push(message);
  }

  const sourceDuplicates = duplicateIds(sources);
  if (sourceDuplicates.length) fail(`Duplicate source IDs: ${sourceDuplicates.join(", ")}`);

  const claimDuplicates = duplicateIds(claims);
  if (claimDuplicates.length) fail(`Duplicate claim IDs: ${claimDuplicates.join(", ")}`);

  const noteDuplicates = duplicateIds(notes);
  if (noteDuplicates.length) fail(`Duplicate citation note IDs: ${noteDuplicates.join(", ")}`);

  const pageDuplicates = duplicateIds(pages, "pageId");
  if (pageDuplicates.length) fail(`Duplicate page IDs: ${pageDuplicates.join(", ")}`);

  const mediaDuplicates = duplicateIds(media);
  if (mediaDuplicates.length) fail(`Duplicate media IDs: ${mediaDuplicates.join(", ")}`);

  const correctionDuplicates = duplicateIds(corrections);
  if (correctionDuplicates.length) {
    fail(`Duplicate correction IDs: ${correctionDuplicates.join(", ")}`);
  }

  const rawCitationData = Object.values(raw).join("\n");
  if (privatePathPattern.test(rawCitationData)) {
    fail("Citation data contains a private local path or private-source marker");
  }

  if (/\[\d+\]/.test(rawCitationData)) {
    fail("Citation data stores a literal display citation number");
  }

  for (const source of sources) {
    if (source.originalUrl && !isValidUrl(source.originalUrl)) {
      fail(`${source.id} has malformed originalUrl`);
    }
    if (source.archiveUrl && !isValidUrl(source.archiveUrl)) {
      fail(`${source.id} has malformed archiveUrl`);
    }
    if (source.originalUrl && source.archiveUrl && source.originalUrl === source.archiveUrl) {
      fail(`${source.id} has identical originalUrl and archiveUrl`);
    }
    if (source.publicCitation && !source.originalUrl && !source.archiveUrl) {
      fail(`${source.id} is public but has no public URL`);
    }
    if (source.status === "unstable" && !source.caveat) {
      fail(`${source.id} is unstable but lacks a caveat`);
    }
    if (source.status === "unstable" && source.publicCitation && !source.archiveUrl) {
      warn(`${source.id} is unstable and has no archive fallback`);
    }
    if ((source.status === "private" || source.status === "pending-rights") && source.publicCitation) {
      fail(`${source.id} is ${source.status} but marked publicCitation=true`);
    }
  }

  for (const claim of claims) {
    if (claim.status === "Ready" && !asArray(claim.supports).length) {
      fail(`${claim.id} is Ready but has no supporting source`);
    }

    for (const support of asArray(claim.supports)) {
      if (findingIds.has(support.sourceId) || support.sourceId.startsWith("FINDING-")) {
        fail(`${claim.id} uses a research finding as positive evidence: ${support.sourceId}`);
      }
      if (!sourceById.has(support.sourceId)) {
        fail(`${claim.id} references nonexistent source ${support.sourceId}`);
      }
    }

    for (const pageId of asArray(claim.allowedPages)) {
      const page = pageById.get(pageId);
      if (!page) continue;
      const projected = page.citationOrder.some((item) => {
        const note = noteById.get(item.noteId);
        return note?.claimId === claim.id;
      });
      if (claim.citationRequired && !projected) {
        fail(`${claim.id} is citation-required but absent from ${pageId}`);
      }
    }
  }

  for (const note of notes) {
    const claim = claimById.get(note.claimId);
    if (!claim) fail(`${note.id} references nonexistent claim ${note.claimId}`);

    for (const sourceId of asArray(note.sourceIds)) {
      const source = sourceById.get(sourceId);
      if (!source) {
        fail(`${note.id} references nonexistent source ${sourceId}`);
        continue;
      }

      if (claim && !asArray(claim.supports).some((support) => support.sourceId === sourceId)) {
        warn(`${note.id} cites ${sourceId}, which is not listed in ${claim.id} supports`);
      }
    }
  }

  for (const page of pages) {
    const occurrences = new Set();

    for (const item of page.citationOrder ?? []) {
      const note = noteById.get(item.noteId);
      if (!note) {
        fail(`${page.pageId} references nonexistent citation note ${item.noteId}`);
        continue;
      }

      const claim = claimById.get(note.claimId);
      if (!claim) continue;

      for (const occurrence of item.occurrences ?? []) {
        if (occurrences.has(occurrence)) {
          fail(`${page.pageId} has duplicate occurrence ID ${occurrence}`);
        }
        occurrences.add(occurrence);
      }

      for (const sourceId of asArray(note.sourceIds)) {
        const source = sourceById.get(sourceId);
        if (!source) continue;

        if (!source.publicCitation) {
          fail(`${page.pageId} publicly cites ${source.id}, which is publicCitation=false`);
        }

        if (source.status === "private" || source.status === "pending-rights") {
          fail(`${page.pageId} publicly cites ${source.status} source ${source.id}`);
        }

        if (source.type === "social-post" && source.archiveUrl && !note.includeArchiveLinks) {
          fail(`${page.pageId} cites social post ${source.id} but omits archive links`);
        }

        if (!source.publicNote) {
          fail(`${source.id} is publicly cited but lacks a publicNote`);
        }

        if (!source.caveat) {
          fail(`${source.id} is publicly cited but lacks a caveat`);
        }

        if (source.id === "SRC-CALLNYC-DIGITAL-DISTRICT-PHOTO") {
          fail("Digital District photograph is publicly cited before rights approval");
        }
      }

      if (!claim.guardrail && !note.caveatOverride) {
        fail(`${claim.id} is publicly cited but lacks a guardrail or note caveat`);
      }
    }
  }

  for (const finding of findings) {
    if (finding.status === "not-recovered" && /prove|proves|establishes/i.test(finding.conclusion)) {
      fail(`${finding.id} is not-recovered but written as positive proof`);
    }
  }

  for (const item of media) {
    if (item.sourceId && !sourceById.has(item.sourceId)) {
      fail(`${item.id} references nonexistent source ${item.sourceId}`);
    }

    for (const claimId of asArray(item.relatedClaimIds)) {
      if (!claimById.has(claimId)) fail(`${item.id} references nonexistent claim ${claimId}`);
    }

    if (item.publicCitation && item.rightsStatus !== "approved" && item.rightsStatus !== "not-required") {
      fail(`${item.id} is publicly projected without approved/not-required rights`);
    }

    if (item.publicCitation && item.consentStatus === "pending") {
      fail(`${item.id} is publicly projected while consent is pending`);
    }

    if (item.publicAssetPath && item.rightsStatus !== "approved" && item.rightsStatus !== "not-required") {
      fail(`${item.id} has a public asset path without publishable rights`);
    }

    if (item.id === "MEDIA-CALLNYC-DIGITAL-DISTRICT-PHOTO" && item.publicCitation) {
      fail("Digital District media record projects publicly before rights approval");
    }
  }

  for (const correction of corrections) {
    for (const claimId of asArray(correction.supportClaimIds)) {
      if (!claimById.has(claimId)) {
        fail(`${correction.id} references nonexistent claim ${claimId}`);
      }
    }
  }

  if (options.checkPublicCopy !== false) {
    for (const file of publicCopyFiles) {
      if (!existsSync(file)) continue;
      const content = readText(file);
      const rel = path.relative(repoRoot, file);

      if (/2014-2015|2014–2015/.test(content)) {
        fail(`${rel} contains the old CallNYC year`);
      }

      if (/first civic-data hackathon|first civic data hackathon/i.test(content)) {
        fail(`${rel} contains unsupported first-hackathon wording`);
      }
    }

    for (const file of citationComponentFiles) {
      if (!existsSync(file)) continue;
      const content = readText(file);
      const rel = path.relative(repoRoot, file);
      if (/doc-endnote/.test(content)) fail(`${rel} uses deprecated doc-endnote`);
    }
  }

  return { failures, warnings };
}

function main() {
  const data = loadCitationData();
  const result = validateCitationData(data);

  if (result.warnings.length) {
    console.warn("Citation warnings:");
    for (const warning of result.warnings) console.warn(`- ${warning}`);
  }

  if (result.failures.length) {
    console.error("Citation check failed:");
    for (const failure of result.failures) console.error(`- ${failure}`);
    process.exit(1);
  }

  console.log("Citation check passed.");
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  main();
}
