import citationGroupsData from "./citation-groups.json";
import claimsData from "./claims.json";
import pageCitationOrdersData from "./page-citation-orders.json";
import researchRunsData from "./research-runs.json";
import sourcesData from "./sources.json";
import {
  citationGroupSchema,
  claimRecordSchema,
  pageCitationOrdersSchema,
  researchRunSchema,
  sourceRecordSchema
} from "./schema";

export const sourceRecords = sourceRecordSchema.array().parse(sourcesData);
export const claimRecords = claimRecordSchema.array().parse(claimsData);
export const citationGroups = citationGroupSchema.array().parse(citationGroupsData);
export const researchRuns = researchRunSchema.array().parse(researchRunsData);
export const pageCitationOrders = pageCitationOrdersSchema.parse(pageCitationOrdersData);

export const sourceById = new Map(sourceRecords.map((source) => [source.id, source]));
export const claimById = new Map(claimRecords.map((claim) => [claim.id, claim]));
export const citationGroupById = new Map(
  citationGroups.map((group) => [group.id, group])
);

export function getCitationGroup(id: string) {
  return citationGroupById.get(id);
}

export function requireCitationGroup(id: string) {
  const group = getCitationGroup(id);

  if (!group) {
    throw new Error(`Unknown citation group: ${id}`);
  }

  return group;
}

export function getPageCitationIds(pageKey: string) {
  return pageCitationOrders[pageKey] ?? [];
}

export function getCitationNumber(pageKey: string, groupId: string) {
  const ids = getPageCitationIds(pageKey);
  const index = ids.indexOf(groupId);

  if (index === -1) {
    throw new Error(`Citation group ${groupId} is not registered for ${pageKey}`);
  }

  return index + 1;
}

export function getCitationSources(groupId: string) {
  const group = requireCitationGroup(groupId);
  return group.sourceIds.map((sourceId) => {
    const source = sourceById.get(sourceId);

    if (!source) {
      throw new Error(`Citation group ${groupId} references unknown source ${sourceId}`);
    }

    return source;
  });
}

export function isSourcePublicLinkable(sourceId: string) {
  const source = sourceById.get(sourceId);
  return Boolean(source && source.publicCitationMode === "link");
}
