import {
  getCitationPage,
  getClaim,
  getEvidence,
  getSource,
  type ClaimRecord,
  type EvidenceRecord,
  type SourceRecord
} from "@/data/knowledge-bank";

export type ReferenceEntry = {
  number: number;
  evidence: EvidenceRecord;
  source: SourceRecord;
  claimIds: string[];
};

export function getPageClaim(pageId: string, claimId: string): ClaimRecord {
  const page = getCitationPage(pageId);
  if (!page.claimOrder.includes(claimId)) {
    throw new Error(`Citation claim ${claimId} is not projected on page ${pageId}`);
  }

  const claim = getClaim(claimId);
  if (!claim.allowedSurfaces.includes(page.path)) {
    throw new Error(`Citation claim ${claimId} is not allowed on ${page.path}`);
  }
  return claim;
}

export function getPageEvidenceOrder(pageId: string): string[] {
  const page = getCitationPage(pageId);
  const orderedEvidenceIds: string[] = [];
  const seen = new Set<string>();

  for (const claimId of page.claimOrder) {
    const claim = getPageClaim(pageId, claimId);
    for (const evidenceId of claim.evidenceIds) {
      if (!seen.has(evidenceId)) {
        seen.add(evidenceId);
        orderedEvidenceIds.push(evidenceId);
      }
    }
  }

  return orderedEvidenceIds;
}

export function getCitationNumber(pageId: string, evidenceId: string): number {
  const index = getPageEvidenceOrder(pageId).indexOf(evidenceId);
  if (index === -1) {
    throw new Error(`Citation evidence ${evidenceId} is not projected on page ${pageId}`);
  }
  return index + 1;
}

export function getEvidenceBacklinks(pageId: string, evidenceId: string): string[] {
  const page = getCitationPage(pageId);
  return page.claimOrder.filter((claimId) => {
    return getPageClaim(pageId, claimId).evidenceIds.includes(evidenceId);
  });
}

export function getPublicSourceHref(source: SourceRecord): string | undefined {
  if (!source.publicLinkAllowed || source.accessStatus === "private") return undefined;
  return source.url ?? source.archiveUrl ?? source.assetUrl;
}

export function getReferenceEntries(pageId: string): ReferenceEntry[] {
  return getPageEvidenceOrder(pageId).map((evidenceId, index) => {
    const evidence = getEvidence(evidenceId);
    if (!evidence.publicCitationAllowed) {
      throw new Error(`Citation evidence ${evidenceId} is not allowed on a public page`);
    }
    return {
      number: index + 1,
      evidence,
      source: getSource(evidence.sourceId),
      claimIds: getEvidenceBacklinks(pageId, evidenceId)
    };
  });
}

export function citationAnchorId(pageId: string, claimId: string, evidenceId: string) {
  return `cite-${pageId}-${claimId}-${evidenceId}`;
}

export function referenceAnchorId(pageId: string, number: number) {
  return `reference-${pageId}-${number}`;
}
