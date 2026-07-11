import type {
  ClaimRecord,
  CorrectionRecord,
  EvidenceNoteRecord,
  MediaEvidenceRecord,
  PageCitationManifest,
  ResearchRunRecord,
  SourceRecord
} from "../data/knowledge-bank/schemas.ts";
import { buildCitationSet, projectPublicSource } from "./citations.ts";

export type CitationGraph = {
  sources: SourceRecord[];
  claims: ClaimRecord[];
  notes: EvidenceNoteRecord[];
  pages: PageCitationManifest[];
  researchRuns: ResearchRunRecord[];
  media: MediaEvidenceRecord[];
  corrections: CorrectionRecord[];
};

export type CitationValidationResult = { failures: string[]; warnings: string[] };

const forbiddenPublicPattern =
  /(?:\/private\/|\/tmp\/|\/Users\/|\/Volumes\/|file:\/\/|localhost|127\.0\.0\.1|staging\.jamieburk\.art)/i;

function duplicateValues(values: string[]) {
  return [...new Set(values.filter((value, index) => values.indexOf(value) !== index))];
}

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function claimsNonexistence(value: string) {
  return value
    .split(/(?<=[.!?])\s+/)
    .some(
      (sentence) =>
        /never existed|no [^.]{1,120} ever existed/i.test(sentence) &&
        !/(?:not (?:a )?claim|does not (?:show|establish|prove|mean)|cannot conclude)/i.test(
          sentence
        )
    );
}

export function extractMdxCitations(source: string) {
  return [...source.matchAll(/<Cite\s+([\s\S]*?)\s*\/>/g)].map((match) => {
    const props = match[1];
    return {
      noteId: /noteId="([^"]+)"/.exec(props)?.[1],
      refId: /refId="([^"]+)"/.exec(props)?.[1]
    };
  });
}

export function validateManifestAgainstMdx(
  manifest: PageCitationManifest,
  mdx: string
): CitationValidationResult {
  const failures: string[] = [];
  const warnings: string[] = [];
  const cites = extractMdxCitations(mdx);
  const resolvedRefIds: string[] = [];

  if (/\[(?:[1-9]\d*)(?:\s*,\s*[1-9]\d*)*\]/.test(mdx)) {
    failures.push(`${manifest.pageId} contains a manually authored visible citation number`);
  }

  for (const cite of cites) {
    if (!cite.noteId || !manifest.allowedNoteIds.includes(cite.noteId)) {
      failures.push(`${manifest.pageId} MDX cites undeclared note ${cite.noteId ?? "missing"}`);
      continue;
    }

    const candidates = manifest.occurrences.filter((occurrence) =>
      cite.refId
        ? occurrence.refId === cite.refId && occurrence.noteId === cite.noteId
        : occurrence.noteId === cite.noteId
    );
    if (candidates.length !== 1) {
      failures.push(
        `${manifest.pageId} citation ${cite.noteId}${cite.refId ? ` (${cite.refId})` : ""} resolves to ${candidates.length} manifest occurrences`
      );
      continue;
    }
    resolvedRefIds.push(candidates[0].refId);
  }

  const expectedRefIds = manifest.occurrences.map((occurrence) => occurrence.refId);
  if (JSON.stringify(resolvedRefIds) !== JSON.stringify(expectedRefIds)) {
    failures.push(`${manifest.pageId} manifest occurrence order does not match its MDX authoring`);
  }
  if (cites.length !== manifest.expectedOccurrenceCount) {
    failures.push(
      `${manifest.pageId} expected ${manifest.expectedOccurrenceCount} citations but MDX contains ${cites.length}`
    );
  }
  if (!new RegExp(`<References\\s+pageId="${manifest.pageId}"\\s*\\/>`).test(mdx)) {
    failures.push(`${manifest.pageId} MDX is missing its References component`);
  }

  return { failures, warnings };
}

export function validateCitationGraph(graph: CitationGraph): CitationValidationResult {
  const failures: string[] = [];
  const warnings: string[] = [];
  const idsByKind = {
    source: graph.sources.map((record) => record.id),
    claim: graph.claims.map((record) => record.id),
    note: graph.notes.map((record) => record.id),
    page: graph.pages.map((record) => record.pageId),
    research: graph.researchRuns.map((record) => record.id),
    media: graph.media.map((record) => record.id),
    correction: graph.corrections.map((record) => record.id)
  };

  for (const [kind, ids] of Object.entries(idsByKind)) {
    const duplicates = duplicateValues(ids);
    if (duplicates.length) failures.push(`Duplicate ${kind} IDs: ${duplicates.join(", ")}`);
  }
  const allObjectIds = Object.values(idsByKind).flat();
  const globalDuplicates = duplicateValues(allObjectIds);
  if (globalDuplicates.length) {
    failures.push(`Stable IDs collide across record types: ${globalDuplicates.join(", ")}`);
  }

  const sourceIds = new Set(idsByKind.source);
  const claimIds = new Set(idsByKind.claim);
  const noteIds = new Set(idsByKind.note);
  const allIds = new Set(allObjectIds);

  for (const source of graph.sources) {
    const projection = projectPublicSource(source);
    if (forbiddenPublicPattern.test(JSON.stringify(projection))) {
      failures.push(`${source.id} exposes a forbidden path or non-production URL`);
    }
    if (source.visibility !== "public" && (source.url || source.archivedUrl)) {
      failures.push(`${source.id} is ${source.visibility} but exposes a URL`);
    }
    if ("internalNote" in projection) failures.push(`${source.id} leaks internalNote publicly`);
    if (source.kind === "archived-carrier-page") {
      if (source.archiveRelation !== "embedded-social-feed-capture") {
        failures.push(`${source.id} loses its embedded-feed carrier relationship`);
      }
      if (!/not (?:a |the )?recovered|not (?:a |the )?event/i.test(source.publicNote ?? "")) {
        failures.push(`${source.id} may be mislabeled as the original event source`);
      }
    }
    if (source.visibility === "public" && source.availability === "live" && !source.archivedUrl) {
      warnings.push(`${source.id} is live without an archive fallback`);
    }
    if (source.kind === "official-social-post" && !source.archivedUrl) {
      warnings.push(`${source.id} is a social source without an archival carrier`);
    }
    if (source.availability === "dead") warnings.push(`${source.id} is marked dead`);
  }

  for (const claim of graph.claims) {
    if (claim.status === "approved" && claim.projectionSurfaces.length && !claim.evidence.length) {
      failures.push(`${claim.id} is an approved public claim without evidence`);
    }
    for (const evidence of claim.evidence) {
      if (!sourceIds.has(evidence.sourceId)) {
        failures.push(`${claim.id} references unknown source ${evidence.sourceId}`);
      }
    }
    if ((claim.status === "open" || claim.status === "protected") && claim.projectionSurfaces.length) {
      failures.push(`${claim.id} is ${claim.status} but declares public projections`);
    }
    if (claim.projectionSurfaces.length && !graph.notes.some((note) => note.claimIds.includes(claim.id))) {
      failures.push(`${claim.id} is public but has no evidence note`);
    }
    if (claim.evidence.length === 1 && claim.projectionSurfaces.length) {
      warnings.push(`${claim.id} is a material public claim supported by one source`);
    }
    for (const antiClaim of claim.antiClaims ?? []) {
      if (normalize(claim.publicText).includes(normalize(antiClaim))) {
        failures.push(`${claim.id} public wording violates anti-claim: ${antiClaim}`);
      }
    }
    if (/not recovered/i.test(claim.publicText)) {
      const scoped = claim.evidence.some((link) => /documented search|reviewed/i.test(link.supportNote));
      const limited = claim.evidence.some((link) => /does not prove|not prove/i.test(link.limitationNote ?? ""));
      if (!scoped || !limited || claimsNonexistence(claim.publicText)) {
        failures.push(`${claim.id} has an unbounded not-recovered finding`);
      }
    }
    if (
      claimsNonexistence(claim.publicText) &&
      claim.evidence.some((link) =>
        graph.sources.some(
          (source) => source.id === link.sourceId && source.kind === "research-run"
        )
      )
    ) {
      failures.push(`${claim.id} turns a negative research result into proof of nonexistence`);
    }
  }

  for (const note of graph.notes) {
    for (const claimId of note.claimIds) {
      if (!claimIds.has(claimId)) failures.push(`${note.id} references unknown claim ${claimId}`);
    }
    for (const sourceId of note.sourceIds) {
      if (!sourceIds.has(sourceId)) failures.push(`${note.id} references unknown source ${sourceId}`);
    }
    if (note.preferredSourceId && !note.sourceIds.includes(note.preferredSourceId)) {
      failures.push(`${note.id} prefers a source it does not cite`);
    }
    if (note.title.trim().length < 8 || /^citation|source note$/i.test(note.title.trim())) {
      failures.push(`${note.id} lacks a meaningful accessible title`);
    }
    if (claimsNonexistence(`${note.publicSummary} ${note.qualification ?? ""}`)) {
      failures.push(`${note.id} converts not recovered into never existed`);
    }
  }

  for (const manifest of graph.pages) {
    const duplicateRefs = duplicateValues(manifest.occurrences.map((occurrence) => occurrence.refId));
    if (duplicateRefs.length) failures.push(`${manifest.pageId} has duplicate occurrence IDs`);
    for (const noteId of manifest.allowedNoteIds) {
      if (!noteIds.has(noteId)) failures.push(`${manifest.pageId} allows unknown note ${noteId}`);
    }
    for (const occurrence of manifest.occurrences) {
      if (!manifest.allowedNoteIds.includes(occurrence.noteId)) {
        failures.push(`${manifest.pageId} occurrence references undeclared note ${occurrence.noteId}`);
      }
    }
    const usedNotes = [...new Set(manifest.occurrences.map((occurrence) => occurrence.noteId))].sort();
    const allowedNotes = [...manifest.allowedNoteIds].sort();
    if (JSON.stringify(usedNotes) !== JSON.stringify(allowedNotes)) {
      failures.push(`${manifest.pageId} has unused or missing allowed notes`);
    }
    if (manifest.occurrences.length !== manifest.expectedOccurrenceCount) {
      failures.push(`${manifest.pageId} occurrence count does not match its contract`);
    }
    const built = buildCitationSet(manifest);
    const domIds = [
      ...built.occurrences.map((occurrence) => occurrence.anchorId),
      ...built.notes.map((note) => note.noteAnchorId)
    ];
    if (duplicateValues(domIds).length) failures.push(`${manifest.pageId} generates duplicate DOM IDs`);
  }

  for (const run of graph.researchRuns) {
    if (forbiddenPublicPattern.test(JSON.stringify(run))) {
      failures.push(`${run.id} includes a forbidden working path`);
    }
    if (/not recovered/i.test(run.finding)) {
      const bounded = run.limitations.some((limit) => /does not prove|not prove/i.test(limit));
      if (!bounded || !run.method || !(run.queryScope?.length ?? 0)) {
        failures.push(`${run.id} lacks method, scope, or limitation for its negative finding`);
      }
    }
  }

  for (const media of graph.media) {
    if (!sourceIds.has(media.sourceId)) failures.push(`${media.id} references unknown source ${media.sourceId}`);
    if (!media.rightsStatus || !media.consentStatus) {
      warnings.push(`${media.id} has incomplete rights or consent status`);
    }
    if (forbiddenPublicPattern.test(JSON.stringify(media))) {
      failures.push(`${media.id} exposes a forbidden path`);
    }
  }

  for (const correction of graph.corrections) {
    for (const objectId of correction.objectIds) {
      if (!allIds.has(objectId)) failures.push(`${correction.id} references unknown object ${objectId}`);
    }
    for (const sourceId of correction.evidenceAdded ?? []) {
      if (!sourceIds.has(sourceId)) failures.push(`${correction.id} adds unknown evidence ${sourceId}`);
    }
    if (correction.status === "recorded") warnings.push(`${correction.id} is recorded but not reviewed`);
  }

  return { failures, warnings };
}
