import citationSetsInput from "./citation-sets.json";
import claimsInput from "./claims.json";
import researchInquiriesInput from "./research-inquiries.json";
import sourcesInput from "./sources.json";
import {
  citationSetsSchema,
  claimsSchema,
  researchInquiriesSchema,
  sourcesSchema
} from "./schemas";

export const citationSources = sourcesSchema.parse(sourcesInput);
export const citationClaims = claimsSchema.parse(claimsInput);
export const citationResearchInquiries = researchInquiriesSchema.parse(
  researchInquiriesInput
);
export const citationSets = citationSetsSchema.parse(citationSetsInput);

const sourcesById = new Map(citationSources.map((source) => [source.id, source]));
const claimsById = new Map(citationClaims.map((claim) => [claim.id, claim]));
const setsById = new Map(citationSets.map((set) => [set.id, set]));

export function getCitationSet(setId: string) {
  const set = setsById.get(setId);
  if (!set) throw new Error(`Unknown citation set: ${setId}`);
  return set;
}

export function getCitationClaim(claimId: string) {
  const claim = claimsById.get(claimId);
  if (!claim) throw new Error(`Unknown citation claim: ${claimId}`);
  return claim;
}

export function getCitationSources(claimId: string) {
  return getCitationClaim(claimId).evidence.map((relationship) => {
    const source = sourcesById.get(relationship.sourceId);
    if (!source) throw new Error(`Unknown citation source: ${relationship.sourceId}`);
    return { relationship, source };
  });
}

export function getCitationNumber(setId: string, claimId: string) {
  const index = getCitationSet(setId).entries.findIndex(
    (entry) => entry.claimId === claimId
  );
  if (index === -1) {
    throw new Error(`Citation set ${setId} does not include claim ${claimId}`);
  }
  return index + 1;
}

export function citationMarkerId(setId: string, number: number, occurrence: number) {
  return `cite-ref-${setId}-${number}-${occurrence}`;
}

export function citationNoteId(setId: string, number: number) {
  return `cite-note-${setId}-${number}`;
}
