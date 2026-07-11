export * from "./schemas.ts";
export * from "./callnyc.ts";

import {
  citationRecords,
  claimRecords,
  pageCitationPlans,
  researchRuns,
  sourceRecords
} from "./callnyc.ts";
import type { CitationRecord, PageCitationPlan, SourceRecord } from "./schemas.ts";

function byId<T extends { id: string }>(records: T[]) {
  return Object.fromEntries(records.map((record) => [record.id, record])) as Record<string, T>;
}

export const sourceRecordsById = byId(sourceRecords);
export const claimRecordsById = byId(claimRecords);
export const citationRecordsById = byId(citationRecords);
export const researchRunsById = byId(researchRuns);
export const pageCitationPlansById = Object.fromEntries(
  pageCitationPlans.map((plan) => [plan.pageId, plan])
) as Record<string, PageCitationPlan>;

export type PageCitationEntry = {
  number: number;
  citation: CitationRecord;
  sources: SourceRecord[];
};

export function getPageCitationPlan(pageId: string) {
  const plan = pageCitationPlansById[pageId];
  if (!plan) throw new Error(`Unknown citation page: ${pageId}`);
  return plan;
}

export function getCitation(citationId: string) {
  const citation = citationRecordsById[citationId];
  if (!citation) throw new Error(`Unknown citation: ${citationId}`);
  return citation;
}

export function getCitationNumber(pageId: string, citationId: string) {
  const plan = getPageCitationPlan(pageId);
  const index = plan.citationIds.indexOf(citationId);
  if (index === -1) throw new Error(`${citationId} is not planned for ${pageId}`);
  return index + 1;
}

export function getPageCitationEntries(pageId: string): PageCitationEntry[] {
  const plan = getPageCitationPlan(pageId);

  return plan.citationIds.map((citationId, index) => {
    const citation = getCitation(citationId);
    return {
      number: index + 1,
      citation,
      sources: citation.sourceIds.map((sourceId) => {
        const source = sourceRecordsById[sourceId];
        if (!source) throw new Error(`Unknown source: ${sourceId}`);
        return source;
      })
    };
  });
}

export function getPublicSourceLinks(source: SourceRecord) {
  if (!source.publicLinkable) return [];

  const links: Array<{ label: string; url: string }> = [];
  if (source.url) links.push({ label: "View source", url: source.url });
  if (source.archiveUrl) links.push({ label: "Archived capture", url: source.archiveUrl });
  if (source.originalUrl) links.push({ label: "Original source", url: source.originalUrl });

  return links;
}
