import type {
  CitationNoteRecord,
  ClaimRecord,
  PageCitationSet,
  SourceRecord
} from "../data/knowledge-bank/schemas.ts";
import { buildCitationSet, getPublicSourceLinks } from "./citations.ts";

export type CitationGraph = {
  sources: SourceRecord[];
  claims: ClaimRecord[];
  notes: CitationNoteRecord[];
  pages: PageCitationSet[];
};

export type CitationValidationResult = {
  failures: string[];
  warnings: string[];
};

const localPathPattern =
  /(?:\/private\/|\/tmp\/|\/Users\/|\/Volumes\/|file:\/\/|~\/|[A-Za-z]:\\)/i;

function duplicateValues(values: string[]) {
  return [...new Set(values.filter((value, index) => values.indexOf(value) !== index))];
}

export function validateCitationGraph(graph: CitationGraph): CitationValidationResult {
  const failures: string[] = [];
  const warnings: string[] = [];
  const sourceIds = new Set(graph.sources.map((source) => source.id));
  const claimIds = new Set(graph.claims.map((claim) => claim.id));
  const noteIds = new Set(graph.notes.map((note) => note.id));
  const pageIds = new Set(graph.pages.map((page) => page.pageId));

  for (const [label, values] of [
    ["source", graph.sources.map((source) => source.id)],
    ["claim", graph.claims.map((claim) => claim.id)],
    ["note", graph.notes.map((note) => note.id)],
    ["page", graph.pages.map((page) => page.pageId)]
  ] as const) {
    const duplicates = duplicateValues(values);
    if (duplicates.length) failures.push(`Duplicate ${label} IDs: ${duplicates.join(", ")}`);
  }

  for (const source of graph.sources) {
    const publicBundle = JSON.stringify(source);
    if (localPathPattern.test(publicBundle)) {
      failures.push(`${source.id} exposes a local filesystem path`);
    }

    if (source.publicationStatus === "private") {
      if (source.canonicalUrl || source.archiveUrl || source.originalUrl) {
        failures.push(`${source.id} is private but exposes a public URL`);
      } else {
        warnings.push(`${source.id} is private and correctly has no public URL`);
      }
    }

    if (
      (source.publicationStatus === "public" ||
        source.publicationStatus === "public-with-caveat") &&
      (!source.title || !source.sourceClass || !source.mediaType || !source.publicSourceNote)
    ) {
      failures.push(`${source.id} is public but lacks required public metadata`);
    }

    for (const [field, value] of [
      ["canonicalUrl", source.canonicalUrl],
      ["archiveUrl", source.archiveUrl],
      ["originalUrl", source.originalUrl]
    ] as const) {
      if (value) {
        try {
          new URL(value);
        } catch {
          failures.push(`${source.id}.${field} is malformed`);
        }
      }
    }

    if (source.linkStatus === "unchecked") {
      warnings.push(`${source.id} needs manual link verification`);
    }
    if (source.archiveUrl && source.originalUrl && source.linkStatus === "archived") {
      warnings.push(`${source.id} relies on an archive because the original may be unavailable`);
    }
  }

  for (const claim of graph.claims) {
    for (const evidence of claim.evidence) {
      if (!sourceIds.has(evidence.sourceId)) {
        failures.push(`${claim.id} references unknown source ${evidence.sourceId}`);
      }
    }

    if (claim.status !== "approved" && claim.publicSurfaces.length) {
      failures.push(`${claim.id} is ${claim.status} but is configured for public surfaces`);
    }
    if (claim.strength === "reconstructed") {
      warnings.push(`${claim.id} is supported by reconstruction rather than direct evidence`);
    }

    if (claim.mustCite) {
      const notesForClaim = graph.notes.filter((note) => note.claimIds.includes(claim.id));
      if (!notesForClaim.length) failures.push(`${claim.id} must be cited but has no citation note`);

      for (const surface of claim.publicSurfaces) {
        const page = graph.pages.find((candidate) => candidate.pageId === surface);
        if (!page) {
          failures.push(`${claim.id} declares unknown public surface ${surface}`);
          continue;
        }
        const pageNoteIds = new Set(page.references.map((reference) => reference.noteId));
        if (!notesForClaim.some((note) => pageNoteIds.has(note.id))) {
          failures.push(`${claim.id} is rendered on ${surface} without a citation note`);
        }
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
    if (/^citation$/i.test(note.shortLabel.trim())) {
      failures.push(`${note.id} needs a useful contextual citation label`);
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

  if (!pageIds.has("callnyc-case-study")) {
    failures.push("CallNYC public surface is missing");
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
      { refId: "third", noteId: "alpha" }
    ]
  });

  const expect = (condition: boolean, message: string) => {
    if (!condition) failures.push(message);
  };

  expect(sample.referencesById.first.number === 1, "Numbering must follow first appearance");
  expect(sample.referencesById.second.number === 2, "Second first-appearing note must be 2");
  expect(sample.referencesById.third.number === 1, "Repeated note IDs must reuse their number");
  expect(sample.notes.length === 2, "Repeated notes must render only once");
  expect(
    new Set(sample.references.map((reference) => reference.anchorId)).size === 3,
    "Reference anchors must be unique"
  );
  expect(
    sample.notes[0].referenceAnchorIds.every((anchorId) =>
      sample.references.some((reference) => reference.anchorId === anchorId)
    ),
    "Backlinks must target valid references"
  );

  const privateSource = graph.sources.find(
    (source) => source.id === "participant-archive-digital-district-2016"
  );
  expect(Boolean(privateSource), "Private participant source must exist");
  if (privateSource) {
    expect(getPublicSourceLinks(privateSource).length === 0, "Private sources must render no links");
  }

  const archiveSource = graph.sources.find(
    (source) => source.id === "civic-hall-embedded-feed-wayback-2016-01-31"
  );
  if (archiveSource) {
    const labels = getPublicSourceLinks(archiveSource).map((link) => link.label);
    expect(labels.includes("Original source"), "Original source link needs a distinct label");
    expect(labels.includes("Archived capture"), "Archive link needs a distinct label");
  }

  const canonicalAndArchiveSource: SourceRecord = {
    ...graph.sources[0],
    id: "contract-canonical-and-archive",
    canonicalUrl: "https://example.com/original",
    archiveUrl: "https://web.archive.org/web/20200101000000/https://example.com/original",
    originalUrl: undefined
  };
  const canonicalAndArchiveLabels = getPublicSourceLinks(canonicalAndArchiveSource).map(
    (link) => link.label
  );
  expect(
    canonicalAndArchiveLabels.includes("View source") &&
      canonicalAndArchiveLabels.includes("Archived capture"),
    "Canonical and archive URLs need distinct labels"
  );

  const brokenGraph: CitationGraph = {
    ...graph,
    claims: [
      ...graph.claims,
      {
        ...graph.claims[0],
        id: "contract-unknown-source",
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

  const unknownClaimGraph: CitationGraph = {
    ...graph,
    notes: [
      ...graph.notes,
      {
        ...graph.notes[0],
        id: "contract-unknown-claim",
        claimIds: ["missing-claim"]
      }
    ]
  };
  expect(
    validateCitationGraph(unknownClaimGraph).failures.some((failure) =>
      failure.includes("unknown claim missing-claim")
    ),
    "Unknown claim IDs must fail validation"
  );

  const unknownNoteGraph: CitationGraph = {
    ...graph,
    pages: [
      ...graph.pages,
      {
        pageId: "contract-unknown-note-page",
        references: [{ refId: "missing-note-reference", noteId: "missing-note" }]
      }
    ]
  };
  expect(
    validateCitationGraph(unknownNoteGraph).failures.some((failure) =>
      failure.includes("references unknown note missing-note")
    ),
    "Unknown note IDs must fail validation"
  );

  return failures;
}
