import type { ClaimProjection } from "@/data/knowledge-bank";
import { getClaimProjection } from "@/data/knowledge-bank";
import { Cite } from "./Cite";

type ClaimProps = {
  claimId: string;
  projection: ClaimProjection["key"];
  surface: string;
  pageId?: string;
  occurrenceId?: string;
  as?: "span" | "p";
};

export function Claim({
  as = "span",
  claimId,
  occurrenceId,
  pageId,
  projection,
  surface
}: ClaimProps) {
  const approved = getClaimProjection(claimId, projection, surface);
  const Component = as;

  if (approved.citationRequired && (!pageId || !occurrenceId)) {
    throw new Error(`${claimId}/${projection} requires a pageId and occurrenceId`);
  }

  return (
    <Component>
      {approved.text}
      {pageId && occurrenceId ? (
        <Cite pageId={pageId} occurrenceId={occurrenceId} />
      ) : null}
    </Component>
  );
}
