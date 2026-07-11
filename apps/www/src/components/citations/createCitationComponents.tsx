import type { MDXComponents } from "mdx/types";
import { CitationNotes } from "./CitationNotes";
import { CitationRef } from "./CitationRef";
import type { CitationNotesProps, CitationRefProps } from "./types";

export function createCitationComponents({
  pageKey,
  citationIds
}: {
  pageKey: string;
  citationIds?: readonly string[];
}): MDXComponents {
  return {
    Cite: ({ id, instance }: Omit<CitationRefProps, "pageKey" | "citationIds">) => (
      <CitationRef
        citationIds={citationIds}
        id={id}
        instance={instance}
        pageKey={pageKey}
      />
    ),
    References: ({ heading }: Pick<CitationNotesProps, "heading">) => (
      <CitationNotes citationIds={citationIds} heading={heading} pageKey={pageKey} />
    )
  };
}
