import type {
  ClaimRecord,
  EvidenceNoteRecord,
  MediaEvidenceRecord,
  PageCitationSet,
  ResearchRunRecord,
  SourceRecord
} from "../data/knowledge-bank/schemas.ts";
import { buildCitationSet, projectPublicSource } from "./citations.ts";

export type CitationGraph = {
  sources: SourceRecord[];
  claims: ClaimRecord[];
  notes: EvidenceNoteRecord[];
  pages: PageCitationSet[];
  researchRuns: ResearchRunRecord[];
  media: MediaEvidenceRecord[];
};

export type CitationValidationResult = {
  failures: string[];
  warnings: string[];
};

const forbiddenPublicPattern =
  /(?:\/private\/|\/tmp\/|\/Users\/|\/Volumes\/|file:\/\/|~\/|[A-Za-z]:\\|staging\.jamieburk\.art)/i;

function duplicateValues(values: string[]) {
  return [...new Set(values.filter((value, index) => values.indexOf(value) !== index))];
}

function hasRenderablePublicDescription(source: SourceRecord) {
  if (source.visibility === "public") {
    return Boolean(source.publicNote && (source.url || source.archivedUrl));
  }
  return Boolean(source.publicNote && !source.url && !source.archivedUrl);
}

export function validateCitationGraph(graph: CitationGraph): CitationValidationResult {
  const failures: string[] = [];
  const warnings: string[] = [];
  const sourceIds = new Set(graph.sources.map((source) => source.id));
  const claimIds = new Set(graph.claims.map((claim) => claim.id));
  const noteIds = new Set(graph.notes.map((note) => note.id));

  for (const [label, values] of [
    ["source", graph.sources.map((source) => source.id)],
    ["claim", graph.claims.map((claim) => claim.id)],
    ["evidence note", graph.notes.map((note) => note.id)],
    ["page", graph.pages.map((page) => page.pageId)],
    ["research run", graph.researchRuns.map((run) => run.id)],
    ["media record", graph.media.map((record) => record.id)]
  ] as const) {
    const duplicates = duplicateValues(values);
    if (duplicates.length) failures.push(`Duplicate ${label} IDs: ${duplicates.join(", ")}`);
  }

  for (const source of graph.sources) {
    if (forbiddenPublicPattern.test(JSON.stringify(projectPublicSource(source)))) {
      failures.push(`${source.id} exposes a forbidden path or staging URL publicly`);
    }

    if (source.visibility !== "public" && (source.url || source.archivedUrl)) {
      failures.push(`${source.id} is ${source.visibility} but exposes a URL`);
    }

    if (source.kind === "archived-carrier-page") {
      if (source.archiveRelation !== "embedded-social-feed-capture") {
        failures.push(`${source.id} does not identify its embedded-feed carrier relationship`);
      }
      if (!/not (?:a |the )?recovered|not (?:a |the )?event/i.test(source.publicNote ?? "")) {
        failures.push(`${source.id} may be mislabeled as the original event source`);
      }
    }

    if (source.visibility === "public" && source.availability === "live" && !source.archivedUrl) {
      warnings.push(`${source.id} is live without an archive fallback`);
    }
    if (source.kind === "official-social-post" && !source.archivedUrl) {
      warnings.push(`${source.id} is a social source without an archived carrier`);
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
      failures.push(`${claim.id} is ${claim.status} but declares public projection surfaces`);
    }

    if (claim.projectionSurfaces.length && !graph.notes.some((note) => note.claimIds.includes(claim.id))) {
      failures.push(`${claim.id} is public but has no evidence note`);
    }

    if (claim.evidence.length === 1 && claim.projectionSurfaces.length) {
      warnings.push(`${claim.id} is a public claim supported by one source`);
    }

    if (claim.status === "qualified" && claim.qualifiers?.length) {
      const qualifierVisible = claim.qualifiers.some((qualifier) =>
        claim.publicText.toLowerCase().includes(qualifier.toLowerCase())
      );
      if (!qualifierVisible) {
        warnings.push(`${claim.id} is qualified; public projections must preserve its qualifier`);
      }
    }

    if (/not recovered/i.test(claim.publicText)) {
      const hasScopedSupport = claim.evidence.some(
        (evidence) => /documented search|reviewed/i.test(evidence.supportNote)
      );
      const hasLimitation = claim.evidence.some((evidence) =>
        /does not prove|doesn't prove|not prove/i.test(evidence.limitationNote ?? "")
      );
      if (!hasScopedSupport || !hasLimitation) {
        failures.push(`${claim.id} is not-recovered wording without scope and limitation`);
      }
    }
  }

  for (const note of graph.notes) {
    for (const claimId of note.claimIds) {
      if (!claimIds.has(claimId)) failures.push(`${note.id} references unknown claim ${claimId}`);
    }
    for (const sourceId of note.sourceIds) {
      if (!sourceIds.has(sourceId)) failures.push(`${note.id} references unknown source ${sourceId}`);
    }
    if (!note.sourceIds.some((sourceId) => {
      const source = graph.sources.find((candidate) => candidate.id === sourceId);
      return source ? hasRenderablePublicDescription(source) : false;
    })) {
      failures.push(`${note.id} has no renderable public source or approved restricted description`);
    }
    if (note.title.trim().length < 8 || /^citation|source note$/i.test(note.title.trim())) {
      failures.push(`${note.id} lacks a meaningful accessible title`);
    }
    if (note.preferredSourceId && !note.sourceIds.includes(note.preferredSourceId)) {
      failures.push(`${note.id} prefers a source it does not cite`);
    }
  }

  for (const page of graph.pages) {
    const duplicateRefs = duplicateValues(page.references.map((reference) => reference.refId));
    if (duplicateRefs.length) {
      failures.push(`${page.pageId} has duplicate reference IDs: ${duplicateRefs.join(", ")}`);
    }
    for (const reference of page.references) {
      if (!noteIds.has(reference.noteId)) {
        failures.push(`${page.pageId} references unknown note ${reference.noteId}`);
      }
    }

    const built = buildCitationSet(page);
    const domIds = [
      ...built.references.map((reference) => reference.anchorId),
      ...built.notes.map((note) => note.noteAnchorId)
    ];
    const duplicateDomIds = duplicateValues(domIds);
    if (duplicateDomIds.length) {
      failures.push(`${page.pageId} generates duplicate DOM IDs: ${duplicateDomIds.join(", ")}`);
    }
  }

  for (const run of graph.researchRuns) {
    if (forbiddenPublicPattern.test(JSON.stringify(run))) {
      failures.push(`${run.id} commits a forbidden working path`);
    }
    if (/not recovered/i.test(run.finding)) {
      const bounded = run.limitations.some((limit) => /does not prove|not prove/i.test(limit));
      if (!bounded) failures.push(`${run.id} lacks a limitation for its negative finding`);
    }
  }

  for (const record of graph.media) {
    if (!sourceIds.has(record.sourceId)) {
      failures.push(`${record.id} references unknown source ${record.sourceId}`);
    }
    if (!record.rightsStatus || !record.consentStatus) {
      warnings.push(`${record.id} has incomplete rights or consent status`);
    }
    if (forbiddenPublicPattern.test(JSON.stringify(record))) {
      failures.push(`${record.id} exposes a forbidden path`);
    }
  }

  return { failures, warnings };
}

export function runCitationContractTests(graph: CitationGraph): string[] {
  const failures: string[] = [];
  const sample = buildCitationSet({
    pageId: "contract-test",
    references: [
      { refId: "first", noteId: "alpha" },
      { refId: "second", noteId: "beta" },
      { refId: "third", noteId: "alpha" },
      { refId: "fourth", noteId: "gamma" }
    ]
  });
  const expect = (condition: boolean, message: string) => {
    if (!condition) failures.push(message);
  };

  expect(sample.referencesById.first.number === 1, "Numbering must follow first appearance");
  expect(sample.referencesById.second.number === 2, "Grouped notes must preserve order");
  expect(sample.referencesById.third.number === 1, "Repeated note IDs must reuse their number");
  expect(sample.referencesById.fourth.number === 3, "Later distinct notes must remain ordered");
  expect(sample.notes.length === 3, "References must include only distinct cited notes");
  expect(
    new Set(sample.references.map((reference) => reference.anchorId)).size === 4,
    "Citation anchors must be unique"
  );
  expect(
    sample.notes[0].referenceAnchorIds.every((anchorId) =>
      sample.references.some((reference) => reference.anchorId === anchorId)
    ),
    "Backlinks must target valid citation anchors"
  );

  const restrictedSource = graph.sources.find(
    (source) => source.id === "callnyc-digital-district-participant-photo"
  );
  expect(Boolean(restrictedSource), "Restricted participant source must exist");
  if (restrictedSource) {
    const projection = projectPublicSource(restrictedSource);
    expect(projection.links.length === 0, "Restricted sources must render no links");
    expect(!("internalNote" in projection), "Public projection must omit internal notes");
  }

  const brokenGraph: CitationGraph = {
    ...graph,
    claims: [
      ...graph.claims,
      {
        ...graph.claims[0],
        id: "contract.unknown-source",
        evidence: [{ ...graph.claims[0].evidence[0], sourceId: "missing-source" }]
      }
    ]
  };
  expect(
    validateCitationGraph(brokenGraph).failures.some((failure) =>
      failure.includes("unknown source missing-source")
    ),
    "Unknown source IDs must fail validation"
  );

  return failures;
}
