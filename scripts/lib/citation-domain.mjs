import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
export const dataRoot = path.join(repoRoot, "apps/www/src/data/knowledge-bank");

const readJson = (relativePath) =>
  JSON.parse(readFileSync(path.join(dataRoot, relativePath), "utf8"));

export function loadKnowledge() {
  return {
    sources: readJson("sources.json"),
    assertions: readJson("assertions.json"),
    evidence: readJson("evidence.json"),
    researchRuns: readJson("research-runs.json"),
    artifacts: readJson("artifacts.json"),
    corrections: readJson("corrections.json"),
    citationNotes: readJson("citation-notes.json"),
    pages: [readJson("pages/callnyc.json")]
  };
}

const publicStatuses = new Set(["supported", "supported-with-attribution", "use-with-care"]);
const blockedPolicies = new Set(["approval-required", "internal-only"]);
const publicNoteStatuses = new Set(["public-ready", "public-ready-with-qualification"]);
const localPathPattern = /\/private\/tmp\/|\/Users\/|\/Volumes\/|\b[A-Za-z]:\\/;

function mapById(records, label, failures) {
  const map = new Map();
  for (const record of records) {
    if (!record.id) failures.push(`${label} record has no ID`);
    if (map.has(record.id)) failures.push(`Duplicate ${label} ID: ${record.id}`);
    map.set(record.id, record);
  }
  return map;
}

export function validateKnowledge(bundle, { throwOnWarnings = false } = {}) {
  const failures = [];
  const warnings = [];
  const sources = mapById(bundle.sources, "source", failures);
  const assertions = mapById(bundle.assertions, "assertion", failures);
  const evidence = mapById(bundle.evidence, "evidence", failures);
  mapById(bundle.researchRuns, "research-run", failures);
  mapById(bundle.artifacts, "artifact", failures);
  mapById(bundle.corrections, "correction", failures);
  const notes = mapById(bundle.citationNotes, "citation-note", failures);
  mapById(bundle.pages, "page", failures);

  for (const source of bundle.sources) {
    for (const link of source.links ?? []) {
      try {
        const url = new URL(link.url);
        if (!new Set(["http:", "https:"]).has(url.protocol)) throw new Error("protocol");
      } catch {
        failures.push(`${source.id} contains malformed URL ${link.url}`);
      }
      if (!link.label || /^(here|source|link)$/i.test(link.label)) {
        failures.push(`${source.id} has no usable public link label`);
      }
    }
    const hasArchive = source.links?.some((link) => link.kind === "archive");
    const hasPreservationNote = [...(source.caveats ?? []), ...(source.limitations ?? [])].some(
      (text) => /archiv|preserv|not recovered/i.test(text)
    );
    if (source.stability === "fragile" && !hasArchive && !hasPreservationNote) {
      failures.push(`${source.id} is fragile without an archive or preservation note`);
    }
    if (source.visibility === "public-metadata-only") {
      if (!source.rights || !["pending", "do-not-publish", "unknown"].includes(source.rights.permission)) {
        warnings.push(`${source.id} is public-metadata-only without a pending/restricted rights state`);
      }
      if (source.links?.length) failures.push(`${source.id} exposes a URL from a public-metadata-only record`);
    }
    if (source.visibility === "public" && source.availability === "live" && !hasArchive) {
      warnings.push(`${source.id} is public and live without a separate archive link`);
    }
  }

  for (const relationship of bundle.evidence) {
    if (!sources.has(relationship.sourceId)) {
      failures.push(`${relationship.id} references unknown source ${relationship.sourceId}`);
    }
    if (!assertions.has(relationship.assertionId)) {
      failures.push(`${relationship.id} references unknown assertion ${relationship.assertionId}`);
    }
    if (!relationship.locator) warnings.push(`${relationship.id} has no locator`);
  }

  for (const run of bundle.researchRuns) {
    for (const sourceId of run.sourceIds ?? []) {
      if (!sources.has(sourceId)) failures.push(`${run.id} references unknown source ${sourceId}`);
    }
    if (run.status === "not-recovered") {
      const text = `${run.finding} ${(run.limitations ?? []).join(" ")}`;
      if (/never existed|did not exist|proven not to exist/i.test(text)) {
        failures.push(`${run.id} turns not-recovered into proof of nonexistence`);
      }
      if (!/does not prove|failure to recover/i.test(text)) {
        failures.push(`${run.id} lacks a bounded negative-finding limitation`);
      }
    }
  }

  for (const artifact of bundle.artifacts) {
    const source = artifact.sourceId ? sources.get(artifact.sourceId) : undefined;
    if (artifact.sourceId && !source) failures.push(`${artifact.id} references unknown source ${artifact.sourceId}`);
    for (const assertionId of artifact.supportsAssertionIds ?? []) {
      const assertion = assertions.get(assertionId);
      if (!assertion) {
        failures.push(`${artifact.id} references unknown assertion ${assertionId}`);
      } else if (
        artifact.evidenceScope === "representative" &&
        /(event|hackathon|date|time|venue|attend|title)/i.test(assertion.proposition)
      ) {
        failures.push(`${artifact.id} uses representative media as direct event proof`);
      }
    }
    if (artifact.publicUseStatus === "public-metadata-only" && artifact.publicAssetUrl) {
      failures.push(`${artifact.id} exposes an asset URL from a metadata-only artifact`);
    }
  }

  for (const correction of bundle.corrections) {
    for (const assertionId of correction.relatedAssertionIds ?? []) {
      if (!assertions.has(assertionId)) failures.push(`${correction.id} references unknown assertion ${assertionId}`);
    }
    for (const sourceId of correction.relatedSourceIds ?? []) {
      if (!sources.has(sourceId)) failures.push(`${correction.id} references unknown source ${sourceId}`);
    }
  }

  const publicEvidenceByAssertion = new Map();
  for (const relationship of bundle.evidence) {
    const source = sources.get(relationship.sourceId);
    if (
      relationship.publicCitation &&
      source?.visibility === "public" &&
      !blockedPolicies.has(source.publicCitationPolicy)
    ) {
      publicEvidenceByAssertion.set(
        relationship.assertionId,
        [...(publicEvidenceByAssertion.get(relationship.assertionId) ?? []), relationship]
      );
    }
  }
  for (const assertion of bundle.assertions) {
    if (
      assertion.citationRequired &&
      publicStatuses.has(assertion.status) &&
      !(publicEvidenceByAssertion.get(assertion.id)?.length)
    ) {
      failures.push(`${assertion.id} requires a citation but has no public evidence`);
    }
    if (assertion.status === "not-recovered") {
      const boundary = [...(assertion.qualifications ?? []), ...(assertion.antiClaims ?? [])].join(" ");
      if (!/never|does not prove|bounded|proven not to exist/i.test(boundary)) {
        failures.push(`${assertion.id} lacks a not-recovered boundary`);
      }
    }
  }

  for (const note of bundle.citationNotes) {
    if (!note.evidenceIds?.length) failures.push(`${note.id} has no evidence`);
    for (const evidenceId of note.evidenceIds ?? []) {
      const relationship = evidence.get(evidenceId);
      if (!relationship) {
        failures.push(`${note.id} references unknown evidence ${evidenceId}`);
        continue;
      }
      const source = sources.get(relationship.sourceId);
      if (publicNoteStatuses.has(note.status)) {
        if (!relationship.publicCitation) failures.push(`${note.id} includes non-public evidence ${evidenceId}`);
        if (!source || source.visibility !== "public" || blockedPolicies.has(source.publicCitationPolicy)) {
          failures.push(`${note.id} includes protected or approval-required source ${relationship.sourceId}`);
        }
      }
    }
  }

  for (const page of bundle.pages) {
    if (new Set(page.citationOrder).size !== page.citationOrder.length) {
      failures.push(`${page.id} contains duplicate citation-note IDs`);
    }
    const occurrenceIds = page.occurrences.map((item) => item.occurrence);
    if (new Set(occurrenceIds).size !== occurrenceIds.length) {
      failures.push(`${page.id} contains duplicate occurrence IDs`);
    }
    for (const noteId of page.citationOrder) {
      if (!notes.has(noteId)) failures.push(`${page.id} references unknown note ${noteId}`);
      if (!page.occurrences.some((item) => item.noteId === noteId)) {
        failures.push(`${page.id} contains unused note ${noteId}`);
      }
    }
    for (const occurrence of page.occurrences) {
      if (!notes.has(occurrence.noteId)) failures.push(`${page.id} occurrence references unknown note ${occurrence.noteId}`);
      if (!page.citationOrder.includes(occurrence.noteId)) {
        failures.push(`${page.id} occurrence uses note absent from citationOrder: ${occurrence.noteId}`);
      }
    }
    const firstAppearance = page.occurrences
      .map((item) => item.noteId)
      .filter((id, index, all) => all.indexOf(id) === index);
    if (JSON.stringify(firstAppearance) !== JSON.stringify(page.citationOrder)) {
      failures.push(`${page.id} manifest order disagrees with first occurrence order`);
    }
  }

  if (localPathPattern.test(JSON.stringify(bundle))) {
    failures.push("Tracked citation data contains a machine-local path");
  }

  if (failures.length || (throwOnWarnings && warnings.length)) {
    throw new Error([...failures, ...(throwOnWarnings ? warnings : [])].join("\n"));
  }
  return { failures, warnings, maps: { sources, assertions, evidence, notes } };
}

function publicLinks(source) {
  if (source.publicCitationPolicy === "cite-without-link") return [];
  if (source.publicCitationPolicy === "link-canonical") {
    return source.links.filter((link) => ["canonical", "media"].includes(link.kind));
  }
  if (source.publicCitationPolicy === "link-archive") {
    return source.links.filter((link) => link.kind === "archive");
  }
  return source.links;
}

export function resolveCitationPage(route, bundle = loadKnowledge()) {
  const { maps } = validateKnowledge(bundle);
  const page = bundle.pages.find((item) => item.route === route);
  if (!page) throw new Error(`Unknown citation page ${route}`);

  const notes = page.citationOrder.map((noteId, index) => {
    const note = maps.notes.get(noteId);
    const relationships = note.evidenceIds.map((id) => maps.evidence.get(id));
    const sourceRecords = relationships.map((item) => maps.sources.get(item.sourceId));
    const sources = [...new Map(sourceRecords.map((source) => [source.id, source])).values()].map(
      (source) => ({ ...source, publicLinks: publicLinks(source) })
    );
    const number = index + 1;
    const backlinks = page.occurrences
      .filter((item) => item.noteId === noteId)
      .map((item) => ({
        occurrence: item.occurrence,
        citationId: `citation-${page.slug}-${item.occurrence}`
      }));
    return {
      ...note,
      number,
      relationships,
      assertionIds: [...new Set(relationships.map((item) => item.assertionId))],
      sources,
      backlinks,
      referenceId: `reference-${page.slug}-${number}`
    };
  });

  return { ...page, notes };
}

export function extractMdxCitations(text) {
  return [...text.matchAll(/<Cite\s+note="([^"]+)"\s+occurrence="([^"]+)"\s*\/>/g)].map(
    (match) => ({ noteId: match[1], occurrence: match[2] })
  );
}

export function citationAnchor(page, occurrence) {
  return `citation-${page.slug}-${occurrence}`;
}

export function referenceAnchor(page, number) {
  return `reference-${page.slug}-${number}`;
}
