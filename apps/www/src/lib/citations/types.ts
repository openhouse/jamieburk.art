import type { PageManifest } from "@/data/knowledge-bank/schema";

export type CitationReference = {
  number: number;
  sourceTitle: string;
  citationLabel: string;
  sourceType: string;
  note: string;
  locator?: string;
  href?: string;
  publiclyLinkable: boolean;
  publicUseStatus: string;
  guardrail: string;
};

export type ResolvedCitationPage = Pick<
  PageManifest,
  "id" | "path" | "title" | "surface" | "referenceHeading" | "publicBoundary"
> & {
  citationsByClaim: Record<string, number[]>;
  references: CitationReference[];
};
