import type {
  CitationRegistry,
  CitationSourceSummary,
  ResolvedCitationPage,
  ResolvedReference
} from "./types";

function sourceSummaryFor(sourceId: string, registry: CitationRegistry): CitationSourceSummary {
  const source = registry.sources.find((item) => item.id === sourceId);
  if (source) {
    return {
      id: source.id,
      title: source.title,
      shortCitation: source.shortCitation,
      fullCitation: source.fullCitation,
      publicNote: source.publicNote,
      originalUrl: source.originalUrl,
      archiveUrl: source.archiveUrl ?? source.preservation?.captureUrl,
      publiclyLinkable: source.publiclyLinkable,
      accessStatus: source.accessStatus,
      sourceType: source.sourceType,
      establishes: source.establishes,
      doesNotEstablish: source.doesNotEstablish
    };
  }

  const researchRun = registry.researchRuns.find((item) => item.id === sourceId);
  if (researchRun) {
    return {
      id: researchRun.id,
      title: researchRun.subject,
      shortCitation: "Public-safe research-run summary",
      fullCitation: researchRun.subject,
      publicNote: researchRun.publicSummary,
      publiclyLinkable: false,
      accessStatus: "private",
      sourceType: "research_run",
      establishes: researchRun.findings,
      doesNotEstablish: researchRun.negativeFindings
    };
  }

  throw new Error(`Unknown citation source: ${sourceId}`);
}

function referenceKey(evidenceId: string, treatment: "linked" | "summary_only") {
  return `${evidenceId}::${treatment}`;
}

export function resolveCitationPage(
  projectionId: string,
  registry: CitationRegistry
): ResolvedCitationPage {
  const projection = registry.projections.find((item) => item.id === projectionId);
  if (!projection) throw new Error(`Unknown citation projection: ${projectionId}`);

  const references: ResolvedReference[] = [];
  const referenceNumbers = new Map<string, ResolvedReference>();
  const occurrences: ResolvedCitationPage["occurrences"] = {};

  for (const occurrence of projection.occurrences) {
    const claim = registry.claims.find((item) => item.id === occurrence.claimId);
    if (!claim) throw new Error(`Unknown claim in projection: ${occurrence.claimId}`);
    if (!claim.publiclyUsable || claim.approval.status !== "approved") {
      throw new Error(`Claim is not approved for public projection: ${claim.id}`);
    }
    if (!claim.allowedSurfaces.includes(projection.surface)) {
      throw new Error(`Claim ${claim.id} is not allowed on ${projection.surface}`);
    }

    const claimEvidence = registry.evidence.filter(
      (item) => item.claimId === claim.id && item.publicCitation
    );
    if (!claimEvidence.length) {
      throw new Error(`Claim has no public citation evidence: ${claim.id}`);
    }

    occurrences[occurrence.occurrenceId] = {
      occurrenceId: occurrence.occurrenceId,
      claimId: claim.id,
      citations: []
    };

    for (const evidence of claimEvidence) {
      const treatment = occurrence.treatment ?? "linked";
      const key = referenceKey(evidence.id, treatment);
      let reference = referenceNumbers.get(key);

      if (!reference) {
        const source = sourceSummaryFor(evidence.sourceId, registry);
        reference = {
          number: references.length + 1,
          evidenceId: evidence.id,
          claimId: claim.id,
          treatment,
          note: evidence.publicNoteOverride ?? evidence.note,
          qualifierNotes: claim.requiredQualifiers,
          source,
          backlinks: []
        };
        references.push(reference);
        referenceNumbers.set(key, reference);
      }

      const anchorId = `citation-${reference.number}-${reference.backlinks.length + 1}`;
      reference.backlinks.push({
        anchorId,
        label: `Back to citation ${reference.number}`
      });
      occurrences[occurrence.occurrenceId].citations.push({
        referenceNumber: reference.number,
        referenceId: `reference-${reference.number}`,
        anchorId
      });
    }
  }

  return {
    id: projection.id,
    path: projection.path,
    surface: projection.surface,
    title: projection.title,
    occurrences,
    references
  };
}
