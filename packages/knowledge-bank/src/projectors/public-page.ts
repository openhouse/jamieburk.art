import { callNYCKnowledgeBank } from "../records/callnyc.ts";
import type {
  ArtifactRecord,
  CitationGroup,
  CitationOccurrence,
  ClaimRecord,
  CorrectionRecord,
  EvidenceEdge,
  KnowledgeBank,
  ResearchRun,
  SourceRecord
} from "../schemas.ts";

const defaultBank = callNYCKnowledgeBank;

export type PublicLink = {
  label: string;
  url: string;
};

export type PublicReferenceTarget = {
  kind: "source" | "artifact" | "research-run";
  edgeId: string;
  id: string;
  label: string;
  description: string;
  relation: EvidenceEdge["relation"];
  explanation?: string;
  links: PublicLink[];
  rightsState?: string;
  reviewState?: string;
};

export type PageCitationOccurrence = CitationOccurrence & {
  number: number;
  refId: string;
  noteId: string;
};

export type PublicReference = {
  number: number;
  citationGroup: CitationGroup;
  claims: ClaimRecord[];
  targets: PublicReferenceTarget[];
  corrections: CorrectionRecord[];
  occurrences: PageCitationOccurrence[];
  warnings: string[];
};

export type PageCitationScope = {
  pageId: string;
  path: string;
  occurrences: PageCitationOccurrence[];
  references: PublicReference[];
};

function anchorSafe(value: string) {
  return value.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase();
}

function byId<T extends { id: string }>(records: T[]) {
  return new Map(records.map((record) => [record.id, record]));
}

function pageAllowed(record: { allowedPages?: string[]; prohibitedPages?: string[] }, pageId: string) {
  if (record.prohibitedPages?.includes(pageId)) return false;
  if (record.allowedPages?.length && !record.allowedPages.includes(pageId)) return false;
  return true;
}

function sourceLinks(source: SourceRecord): PublicLink[] {
  const rights = source.rights?.publicCitationStatus;
  if (!source.publicLinkable || rights === "describe-without-link" || rights === "do-not-project") {
    return [];
  }

  const links: PublicLink[] = [];
  if (source.url) links.push({ label: "View source", url: source.url });
  if (source.archiveUrl) links.push({ label: "Archived capture", url: source.archiveUrl });
  return links;
}

function resolveTarget(
  bank: KnowledgeBank,
  edge: EvidenceEdge,
  pageId: string
): PublicReferenceTarget {
  if (edge.target.kind === "source") {
    const source = byId(bank.sources).get(edge.target.id);
    if (!source) throw new Error(`Unknown source: ${edge.target.id}`);

    return {
      kind: "source",
      edgeId: edge.id,
      id: source.id,
      label: source.title,
      description: source.publicDescription,
      relation: edge.relation,
      explanation: edge.publicExplanation,
      links: sourceLinks(source),
      rightsState: source.rights?.permissionStatus,
      reviewState: source.reviewStatus
    };
  }

  if (edge.target.kind === "artifact") {
    const artifact = byId(bank.artifacts).get(edge.target.id);
    if (!artifact) throw new Error(`Unknown artifact: ${edge.target.id}`);
    if (!pageAllowed(artifact, pageId)) {
      throw new Error(`${artifact.id} is not allowed on ${pageId}`);
    }

    const assetUrl =
      artifact.rights.permissionStatus === "approved-for-publication" &&
      artifact.publicLinkable &&
      artifact.publicAssetUrl
        ? artifact.publicAssetUrl
        : undefined;

    return {
      kind: "artifact",
      edgeId: edge.id,
      id: artifact.id,
      label: artifact.type,
      description: artifact.publicDescription,
      relation: edge.relation,
      explanation: edge.publicExplanation,
      links: assetUrl ? [{ label: "View artifact", url: assetUrl }] : [],
      rightsState: artifact.rights.permissionStatus,
      reviewState: artifact.consent?.status
    };
  }

  const run = byId(bank.researchRuns).get(edge.target.id);
  if (!run) throw new Error(`Unknown research run: ${edge.target.id}`);

  return {
    kind: "research-run",
    edgeId: edge.id,
    id: run.id,
    label: run.type,
    description: `${run.finding} ${run.limitation}`,
    relation: edge.relation,
    explanation: edge.publicExplanation,
    links: [],
    reviewState: run.reviewedAt
  };
}

function getPageProjection(pageId: string, bank: KnowledgeBank) {
  const projection = bank.pageProjections.find((page) => page.id === pageId);
  if (!projection) throw new Error(`Unknown citation page: ${pageId}`);
  return projection;
}

function numberMapFor(pageId: string, bank: KnowledgeBank) {
  const projection = getPageProjection(pageId, bank);
  const numbers = new Map<string, number>();

  for (const occurrence of projection.occurrences) {
    if (!numbers.has(occurrence.citationGroupId)) {
      numbers.set(occurrence.citationGroupId, numbers.size + 1);
    }
  }

  return numbers;
}

function occurrenceDetails(
  pageId: string,
  occurrence: CitationOccurrence,
  bank: KnowledgeBank
): PageCitationOccurrence {
  const number = getCitationNumber(pageId, occurrence.citationGroupId, bank);
  const pageAnchor = anchorSafe(pageId);
  const occurrenceAnchor = anchorSafe(occurrence.occurrenceId);

  return {
    ...occurrence,
    number,
    refId: `cite-ref-${pageAnchor}-${number}-${occurrenceAnchor}`,
    noteId: `cite-note-${pageAnchor}-${number}`
  };
}

export function getPublicSourceLinks(source: SourceRecord): PublicLink[] {
  return sourceLinks(source);
}

export function getApprovedClaim(
  claimId: string,
  pageId: string,
  bank: KnowledgeBank = defaultBank
) {
  const claim = byId(bank.claims).get(claimId);
  if (!claim) throw new Error(`Unknown claim: ${claimId}`);
  if (claim.reviewStatus !== "approved-public") {
    throw new Error(`${claim.id} is not approved for public projection`);
  }
  if (!pageAllowed(claim, pageId)) throw new Error(`${claim.id} is not allowed on ${pageId}`);
  return claim;
}

export function getCitationNumber(
  pageId: string,
  citationGroupId: string,
  bank: KnowledgeBank = defaultBank
) {
  const number = numberMapFor(pageId, bank).get(citationGroupId);
  if (!number) throw new Error(`${citationGroupId} is not projected on ${pageId}`);
  return number;
}

export function getCitationOccurrence(
  pageId: string,
  occurrenceId: string,
  citationGroupId: string,
  bank: KnowledgeBank = defaultBank
) {
  const projection = getPageProjection(pageId, bank);
  const occurrence = projection.occurrences.find((candidate) => {
    return candidate.occurrenceId === occurrenceId;
  });

  if (!occurrence) throw new Error(`Unknown citation occurrence: ${occurrenceId}`);
  if (occurrence.citationGroupId !== citationGroupId) {
    throw new Error(`${occurrenceId} is not bound to ${citationGroupId}`);
  }

  const group = byId(bank.citationGroups).get(citationGroupId);
  if (!group) throw new Error(`Unknown citation group: ${citationGroupId}`);

  return {
    ...occurrenceDetails(pageId, occurrence, bank),
    shortLabel: group.shortLabel
  };
}

export function getPublicReferences(
  pageId: string,
  bank: KnowledgeBank = defaultBank
): PublicReference[] {
  const projection = getPageProjection(pageId, bank);
  const groupsById = byId(bank.citationGroups);
  const claimsById = byId(bank.claims);
  const edgesById = byId(bank.evidenceEdges);
  const correctionsByClaimId = new Map<string, CorrectionRecord[]>();

  for (const correction of bank.corrections) {
    const existing = correctionsByClaimId.get(correction.targetClaimId) ?? [];
    existing.push(correction);
    correctionsByClaimId.set(correction.targetClaimId, existing);
  }

  const occurrencesByGroup = new Map<string, PageCitationOccurrence[]>();
  for (const occurrence of projection.occurrences) {
    const details = occurrenceDetails(pageId, occurrence, bank);
    const existing = occurrencesByGroup.get(occurrence.citationGroupId) ?? [];
    existing.push(details);
    occurrencesByGroup.set(occurrence.citationGroupId, existing);
  }

  const orderedGroupIds = [...new Set(projection.occurrences.map((item) => item.citationGroupId))];

  return orderedGroupIds.map((groupId) => {
    const citationGroup = groupsById.get(groupId);
    if (!citationGroup) throw new Error(`Unknown citation group: ${groupId}`);
    const warnings: string[] = [];

    const claims = citationGroup.claimIds.map((claimId) => getApprovedClaim(claimId, pageId, bank));
    const targets = citationGroup.evidenceEdgeIds.map((edgeId) => {
      const edge = edgesById.get(edgeId);
      if (!edge) throw new Error(`Unknown evidence edge: ${edgeId}`);
      return resolveTarget(bank, edge, pageId);
    });

    const correctionRecords = claims.flatMap((claim) => {
      return correctionIdsFor(claim, correctionsByClaimId);
    });

    for (const target of targets) {
      if (target.kind === "source" && !target.links.length && target.rightsState === "public-link-only") {
        warnings.push(`${target.id} is public-link-only but no public link was projected`);
      }
      if (target.kind === "artifact" && target.rightsState !== "approved-for-publication") {
        warnings.push(`${target.id} is projected as description-only`);
      }
    }

    return {
      number: getCitationNumber(pageId, groupId, bank),
      citationGroup,
      claims,
      targets,
      corrections: correctionRecords,
      occurrences: occurrencesByGroup.get(groupId) ?? [],
      warnings: [...new Set(warnings)]
    };
  });
}

function correctionIdsFor(
  claim: ClaimRecord,
  correctionsByClaimId: Map<string, CorrectionRecord[]>
) {
  const allCorrections = correctionsByClaimId.get(claim.id) ?? [];
  if (!claim.correctionIds?.length) return allCorrections;
  const wanted = new Set(claim.correctionIds);
  return allCorrections.filter((correction) => wanted.has(correction.id));
}

export function getPageCitationScope(
  pageId: string,
  bank: KnowledgeBank = defaultBank
): PageCitationScope {
  const projection = getPageProjection(pageId, bank);

  return {
    pageId,
    path: projection.path,
    occurrences: projection.occurrences.map((occurrence) =>
      occurrenceDetails(pageId, occurrence, bank)
    ),
    references: getPublicReferences(pageId, bank)
  };
}

export function getResearchRun(id: string, bank: KnowledgeBank = defaultBank): ResearchRun {
  const run = byId(bank.researchRuns).get(id);
  if (!run) throw new Error(`Unknown research run: ${id}`);
  return run;
}
