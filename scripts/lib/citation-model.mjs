import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";
import {
  citationNoteRecordSchema,
  citationPageSchema,
  claimRecordSchema,
  correctionRecordSchema,
  evidenceRecordSchema,
  mediaRecordSchema,
  researchRunSchema,
  sourceRecordSchema
} from "../../apps/www/src/data/knowledge-bank/schema.ts";

export const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
export const dataDir = path.join(repoRoot, "apps/www/src/data/knowledge-bank");

const collectionSchemas = {
  sources: sourceRecordSchema,
  evidence: evidenceRecordSchema,
  claims: claimRecordSchema,
  notes: citationNoteRecordSchema,
  media: mediaRecordSchema,
  researchRuns: researchRunSchema,
  corrections: correctionRecordSchema,
  pages: citationPageSchema
};

const collectionFiles = {
  sources: "sources.json",
  evidence: "evidence.json",
  claims: "claims.json",
  notes: "citation-notes.json",
  media: "media.json",
  researchRuns: "research-runs.json",
  corrections: "corrections.json",
  pages: "pages.json"
};

const privatePathPattern =
  /(?:\/private\/|\/_private\/|\/Volumes\/|\/Users\/|file:\/\/|raw-transcripts|otter-exports|Apple Photos Library|\.photoslibrary|private\/tmp|gdrive\/|google-drive\/|legal-review\/|coalition-private\/|client-private\/)/i;
const signedUrlPattern =
  /(?:X-Amz-(?:Credential|Signature)|[?&](?:sig|signature|token|access_token)=|[?&](?:Expires|expiry)=\d+)/i;
const nonexistencePattern =
  /(?:proves?|establishes?|confirms?)\s+(?:that\s+)?(?:no|never)|no\s+(?:dedicated\s+)?(?:event|calendar)\s+(?:page|listing)\s+(?:ever\s+)?existed|did\s+not\s+exist/i;

export function loadCitationBundle() {
  const bundle = {};
  for (const [key, filename] of Object.entries(collectionFiles)) {
    let input;
    try {
      input = JSON.parse(readFileSync(path.join(dataDir, filename), "utf8"));
    } catch (error) {
      throw new Error(`Invalid JSON in ${filename}: ${error.message}`);
    }
    const result = z.array(collectionSchemas[key]).safeParse(input);
    if (!result.success) {
      throw new Error(`Invalid ${filename}: ${z.prettifyError(result.error)}`);
    }
    bundle[key] = result.data;
  }
  return bundle;
}

function duplicateIds(records) {
  const seen = new Set();
  return [...new Set(records.map((item) => item.id).filter((id) => seen.size === seen.add(id).size))];
}

function indexById(records) {
  return new Map(records.map((record) => [record.id, record]));
}

export function validateCitationBundle(bundle) {
  const failures = [];
  const warnings = [];
  const indexes = Object.fromEntries(
    Object.entries(bundle).map(([key, records]) => [key, indexById(records)])
  );

  for (const [label, records] of Object.entries(bundle)) {
    const duplicates = duplicateIds(records);
    if (duplicates.length) failures.push(`Duplicate ${label} IDs: ${duplicates.join(", ")}`);
  }

  for (const source of bundle.sources) {
    const serialized = JSON.stringify(source);
    const links = [source.url, source.archiveUrl, source.assetUrl].filter(Boolean);
    if (privatePathPattern.test(serialized)) {
      failures.push(`Source ${source.id} exposes a private filesystem or archive path`);
    }
    if (signedUrlPattern.test(serialized)) failures.push(`Source ${source.id} exposes a signed URL`);
    if (links.some((link) => link.includes("staging.jamieburk.art"))) {
      failures.push(`Source ${source.id} contains a staging URL`);
    }
    if (source.publicationMode === "link" && !links.length) {
      failures.push(`Linkable source ${source.id} has no safe public URL`);
    }
    if (source.publicationMode !== "link" && links.length) {
      failures.push(`${source.publicationMode} source ${source.id} must not expose a URL`);
    }
    if (source.publicationMode === "link" && !source.archiveUrl) {
      warnings.push(`Linkable source ${source.id} has no separate archive URL`);
    }
  }

  for (const evidence of bundle.evidence) {
    const source = indexes.sources.get(evidence.sourceId);
    const claim = indexes.claims.get(evidence.claimId);
    if (!source) failures.push(`Evidence ${evidence.id} references unknown source ${evidence.sourceId}`);
    if (!claim) failures.push(`Evidence ${evidence.id} references unknown claim ${evidence.claimId}`);
    if (privatePathPattern.test(JSON.stringify(evidence))) {
      failures.push(`Evidence ${evidence.id} exposes a private path`);
    }
    if (
      evidence.relation === "negative-search" &&
      nonexistencePattern.test(`${evidence.supportNote} ${evidence.limitations.join(" ")}`)
    ) {
      failures.push(`Negative-search evidence ${evidence.id} claims proof of nonexistence`);
    }
    if (
      evidence.relation === "archival-carrier" &&
      /(?:is|was)\s+(?:the\s+)?(?:original\s+)?(?:event|calendar)\s+(?:page|listing)/i.test(
        evidence.supportNote
      )
    ) {
      failures.push(`Archival carrier ${evidence.id} is described as an original event listing`);
    }
  }

  for (const note of bundle.notes) {
    const noteClaims = note.claimIds.map((id) => indexes.claims.get(id));
    const noteEvidence = note.evidenceIds.map((id) => indexes.evidence.get(id));
    note.claimIds.forEach((id) => {
      if (!indexes.claims.has(id)) failures.push(`Citation note ${note.id} references unknown claim ${id}`);
    });
    note.evidenceIds.forEach((id) => {
      if (!indexes.evidence.has(id)) failures.push(`Citation note ${note.id} references unknown evidence ${id}`);
    });
    for (const evidence of noteEvidence.filter(Boolean)) {
      if (!note.claimIds.includes(evidence.claimId)) {
        failures.push(`Citation note ${note.id} includes evidence ${evidence.id} for an unrelated claim`);
      }
    }
    if (note.publicationState === "public") {
      for (const claim of noteClaims.filter(Boolean)) {
        if (claim.state !== "known") {
          failures.push(`Public note ${note.id} contains ${claim.state} claim ${claim.id}`);
        }
      }
      const approved = noteEvidence.filter((item) => item?.publicUseStatus === "approved");
      if (!approved.length) failures.push(`Public note ${note.id} has no public-usable evidence`);
      for (const evidence of noteEvidence.filter(Boolean)) {
        const source = indexes.sources.get(evidence.sourceId);
        if (evidence.publicUseStatus !== "approved") {
          failures.push(`Public note ${note.id} contains ${evidence.publicUseStatus} evidence ${evidence.id}`);
        }
        if (source?.publicationMode === "not-public") {
          failures.push(`Public note ${note.id} contains not-public source ${source.id}`);
        }
      }
    }
  }

  for (const page of bundle.pages) {
    const occurrences = page.occurrences.map((item) => item.id);
    const duplicateOccurrences = occurrences.filter((id, index) => occurrences.indexOf(id) !== index);
    if (duplicateOccurrences.length) {
      failures.push(`Citation page ${page.id} has duplicate occurrence IDs`);
    }
    for (const occurrence of page.occurrences) {
      const note = indexes.notes.get(occurrence.noteId);
      if (!note) {
        failures.push(`Citation page ${page.id} references unknown note ${occurrence.noteId}`);
        continue;
      }
      if (note.publicationState !== "public") {
        failures.push(`Citation page ${page.id} uses withheld note ${note.id}`);
      }
      for (const claimId of note.claimIds) {
        const claim = indexes.claims.get(claimId);
        if (claim && !claim.allowedSurfaces.includes(page.path)) {
          failures.push(`Claim ${claimId} does not allow public use on ${page.path}`);
        }
      }
    }
  }

  for (const media of bundle.media) {
    if (media.sourceId && !indexes.sources.has(media.sourceId)) {
      failures.push(`Media ${media.id} references unknown source ${media.sourceId}`);
    }
    if (privatePathPattern.test(JSON.stringify(media))) failures.push(`Media ${media.id} exposes a private path`);
    if (media.publicUseStatus === "review-required") {
      warnings.push(`Media ${media.id} remains pending rights or consent review`);
    }
  }

  for (const correction of bundle.corrections) {
    for (const evidenceId of correction.evidenceIds) {
      if (!indexes.evidence.has(evidenceId)) {
        failures.push(`Correction ${correction.id} references unknown evidence ${evidenceId}`);
      }
    }
    if (correction.status === "follow-up-required") {
      warnings.push(`Correction ${correction.id} requires follow-up`);
    }
  }

  for (const run of bundle.researchRuns) {
    if (!run.limitations.length) failures.push(`Research run ${run.id} has no limitations`);
    if (nonexistencePattern.test(run.finding)) {
      failures.push(`Research run ${run.id} turns a negative search into proof of nonexistence`);
    }
  }

  return { failures, warnings };
}

export function resolveCitationPage(pageId, bundle) {
  const page = bundle.pages.find((item) => item.id === pageId);
  if (!page) throw new Error(`Unknown citation page: ${pageId}`);
  const noteIndex = indexById(bundle.notes);
  const evidenceIndex = indexById(bundle.evidence);
  const sourceIndex = indexById(bundle.sources);
  const orderedNoteIds = [...new Set(page.occurrences.map((item) => item.noteId))];

  return orderedNoteIds.map((noteId, index) => {
    const note = noteIndex.get(noteId);
    if (!note) throw new Error(`Unknown citation note: ${noteId}`);
    if (note.publicationState !== "public") throw new Error(`Cannot render withheld note ${noteId}`);
    const sources = note.evidenceIds.map((evidenceId) => {
      const evidence = evidenceIndex.get(evidenceId);
      if (!evidence) throw new Error(`Unknown citation evidence: ${evidenceId}`);
      if (evidence.publicUseStatus !== "approved") {
        throw new Error(`Cannot render ${evidence.publicUseStatus} evidence ${evidenceId}`);
      }
      const source = sourceIndex.get(evidence.sourceId);
      if (!source) throw new Error(`Unknown citation source: ${evidence.sourceId}`);
      if (source.publicationMode === "not-public") throw new Error(`Cannot render source ${source.id}`);
      return source;
    });
    return {
      number: index + 1,
      note,
      sources,
      backlinks: page.occurrences
        .filter((item) => item.noteId === noteId)
        .map((item) => `cite-${page.id}-${item.id}`)
    };
  });
}

export function validateMdxDrift(bundle) {
  const failures = [];
  const pageIds = new Set(bundle.pages.map((page) => page.id));
  const workDir = path.join(repoRoot, "apps/www/src/content/work");

  for (const page of bundle.pages) {
    const file = path.join(workDir, `${page.id}.mdx`);
    const content = readFileSync(file, "utf8");
    const cites = [...content.matchAll(/<Cite\s+page="([^"]+)"\s+occurrence="([^"]+)"\s+noteId="([^"]+)"\s*\/>/g)].map(
      (match) => ({ page: match[1], occurrence: match[2], noteId: match[3] })
    );
    const declared = page.occurrences;
    if (cites.length !== declared.length) {
      failures.push(`${page.id}.mdx has ${cites.length} Cite uses but declares ${declared.length}`);
    }
    cites.forEach((cite, index) => {
      const expected = declared[index];
      if (!pageIds.has(cite.page)) failures.push(`${page.id}.mdx uses unknown page ${cite.page}`);
      if (!expected) return;
      if (cite.page !== page.id || cite.occurrence !== expected.id || cite.noteId !== expected.noteId) {
        failures.push(`${page.id}.mdx citation ${index + 1} diverges from pages.json`);
      }
    });
    const referenceUses = [...content.matchAll(/<References\s+page="([^"]+)"\s*\/>/g)];
    if (referenceUses.length !== 1 || referenceUses[0]?.[1] !== page.id) {
      failures.push(`${page.id}.mdx must render exactly one matching References component`);
    }
  }
  return failures;
}

export function validatePublicCallnycCopy() {
  const files = [
    "apps/www/src/content/work/callnyc.mdx",
    "apps/www/src/data/work.ts",
    "apps/www/src/data/proofs.ts",
    "apps/www/src/app/work/technical-operations/page.tsx"
  ];
  const content = files.map((file) => readFileSync(path.join(repoRoot, file), "utf8")).join("\n");
  const failures = [];
  if (/2014\s*[-–]\s*2015/i.test(content)) failures.push("Public CallNYC copy still contains 2014-2015");
  if (/first\s+civic[- ]data\s+hackathon/i.test(content)) {
    failures.push("Public CallNYC copy broadens first CouncilStat hackathon to first civic-data hackathon");
  }
  if (!/first\s+CouncilStat\s+hackathon/i.test(content)) {
    failures.push("Public CallNYC copy is missing first CouncilStat hackathon wording");
  }
  if (/Digital District/i.test(readFileSync(path.join(repoRoot, files[0]), "utf8"))) {
    failures.push("CallNYC publicly projects the withheld Digital District note");
  }
  if (privatePathPattern.test(content) || signedUrlPattern.test(content)) {
    failures.push("Public CallNYC content exposes a private path or signed URL");
  }
  return failures;
}
