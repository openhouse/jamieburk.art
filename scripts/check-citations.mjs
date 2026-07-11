#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const citationDir = path.join(repoRoot, "apps/www/src/data/citations");
const defaultFiles = {
  sources: path.join(citationDir, "sources.json"),
  claims: path.join(citationDir, "claims.json"),
  pages: path.join(citationDir, "pages.json"),
  findings: path.join(citationDir, "research-findings.json")
};

const privatePathPattern =
  /\/Users\/|\/Volumes\/|\/private\/tmp|Mobile Documents|supporting-materials|private archive|raw transcript/i;

const callnycPublicFiles = [
  "apps/www/src/content/work/callnyc.mdx",
  "apps/www/src/data/work.ts",
  "apps/www/src/data/proofs.ts",
  "apps/www/src/app/work/technical-operations/page.tsx",
  "docs/knowledge-bank/claims.md",
  "docs/knowledge-bank/proofs.md"
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

function duplicateIds(items) {
  const seen = new Set();
  const duplicates = new Set();

  for (const item of items) {
    if (seen.has(item.id)) duplicates.add(item.id);
    seen.add(item.id);
  }

  return [...duplicates];
}

function duplicatePageIds(pages) {
  const seen = new Set();
  const duplicates = new Set();

  for (const page of pages) {
    if (seen.has(page.pageId)) duplicates.add(page.pageId);
    seen.add(page.pageId);
  }

  return [...duplicates];
}

export function buildPageNumbers(page) {
  return new Map(page.citationOrder.map((item, index) => [item.claimId, index + 1]));
}

export function citationAnchorIds(page, claimId, occurrenceId) {
  const numbers = buildPageNumbers(page);
  const number = numbers.get(claimId);

  if (!number) {
    throw new Error(`Claim ${claimId} is not projected on ${page.pageId}`);
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
    pages: readJson(files.pages),
    findings: readJson(files.findings),
    raw: {
      sources: readText(files.sources),
      claims: readText(files.claims),
      pages: readText(files.pages),
      findings: readText(files.findings)
    }
  };
}

export function validateCitationData(data, options = {}) {
  const failures = [];
  const warnings = [];
  const sources = data.sources ?? [];
  const claims = data.claims ?? [];
  const pages = data.pages ?? [];
  const findings = data.findings ?? [];
  const raw = data.raw ?? {};

  const sourceById = new Map(sources.map((source) => [source.id, source]));
  const claimById = new Map(claims.map((claim) => [claim.id, claim]));
  const pageById = new Map(pages.map((page) => [page.pageId, page]));
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

  const pageDuplicates = duplicatePageIds(pages);
  if (pageDuplicates.length) fail(`Duplicate page IDs: ${pageDuplicates.join(", ")}`);

  const rawCitationData = Object.values(raw).join("\n");
  if (privatePathPattern.test(rawCitationData)) {
    fail("Citation data contains a private local path or private-source marker");
  }

  if (/\[\d+\]/.test(rawCitationData)) {
    fail("Citation data stores a literal display citation number");
  }

  for (const source of sources) {
    if (source.url && !isValidUrl(source.url)) fail(`${source.id} has malformed url`);
    if (source.archiveUrl && !isValidUrl(source.archiveUrl)) {
      fail(`${source.id} has malformed archiveUrl`);
    }
    if (source.status === "unstable" && !source.caveat) {
      fail(`${source.id} is unstable but lacks a caveat`);
    }
    if ((source.status === "private" || source.status === "pending-rights") && source.publicCitation) {
      fail(`${source.id} is ${source.status} but marked publicCitation=true`);
    }
  }

  for (const claim of claims) {
    if (claim.status === "Ready" && !claim.supports?.length) {
      fail(`${claim.id} is Ready but has no supporting source`);
    }

    for (const support of claim.supports ?? []) {
      if (findingIds.has(support.sourceId) || support.sourceId.startsWith("FINDING-")) {
        fail(`${claim.id} uses a research finding as positive evidence: ${support.sourceId}`);
      }
      if (!sourceById.has(support.sourceId)) {
        fail(`${claim.id} references nonexistent source ${support.sourceId}`);
      }
    }

    for (const pageId of claim.allowedPages ?? []) {
      const page = pageById.get(pageId);
      if (!page) continue;
      const projected = page.citationOrder.some((item) => item.claimId === claim.id);
      if (claim.citationRequired && !projected) {
        fail(`${claim.id} is citation-required but absent from ${pageId}`);
      }
    }
  }

  for (const page of pages) {
    const occurrences = new Set();

    for (const item of page.citationOrder ?? []) {
      const claim = claimById.get(item.claimId);
      if (!claim) {
        fail(`${page.pageId} references nonexistent claim ${item.claimId}`);
        continue;
      }

      for (const occurrence of item.occurrences ?? []) {
        if (occurrences.has(occurrence)) {
          fail(`${page.pageId} has duplicate occurrence ID ${occurrence}`);
        }
        occurrences.add(occurrence);
      }

      for (const support of claim.supports ?? []) {
        const source = sourceById.get(support.sourceId);
        if (!source) continue;

        if (!source.publicCitation) {
          fail(`${page.pageId} publicly cites ${source.id}, which is publicCitation=false`);
        }

        if (source.status === "private" || source.status === "pending-rights") {
          fail(`${page.pageId} publicly cites ${source.status} source ${source.id}`);
        }

        if (source.type === "social-post" && source.archiveUrl && !page.includeArchiveLinks) {
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

      if (!claim.guardrail) {
        fail(`${claim.id} is publicly cited but lacks a guardrail`);
      }
    }
  }

  for (const finding of findings) {
    if (finding.status === "not-recovered" && /prove|proves|establishes/i.test(finding.conclusion)) {
      fail(`${finding.id} is not-recovered but written as positive proof`);
    }
  }

  if (options.checkCallNYCPublicCopy !== false) {
    for (const file of callnycPublicFiles) {
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
  }

  if (options.warnOnExternalUrls) {
    warn("Live external URL availability is intentionally not a build blocker");
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
