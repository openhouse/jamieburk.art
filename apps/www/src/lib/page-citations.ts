import { pageCitationSetsById } from "@/data/knowledge-bank";
import { buildCitationSet, type BuiltCitationSet } from "@/lib/citations";

export const builtPageCitationSets = Object.fromEntries(
  Object.values(pageCitationSetsById).map((set) => [set.pageId, buildCitationSet(set)])
) as Record<string, BuiltCitationSet>;

export const callNYCCitationSet = builtPageCitationSets["callnyc-case-study"];

export function getBuiltCitationSet(pageId?: string) {
  return pageId ? builtPageCitationSets[pageId] : undefined;
}
