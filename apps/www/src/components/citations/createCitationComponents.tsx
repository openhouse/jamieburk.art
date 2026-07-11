import type { MDXComponents } from "mdx/types";
import { CitationMarker } from "./CitationMarker";
import { SourcesList } from "./SourcesList";
import type { CiteProps } from "./types";

export function createCitationComponents(citationOrder: readonly string[]): MDXComponents {
  const citationMap = new Map(
    citationOrder.map((evidenceId, index) => [evidenceId, index + 1] as const)
  );

  return {
    Cite: (props: CiteProps) => <CitationMarker citationMap={citationMap} {...props} />,
    References: () => <SourcesList citationOrder={citationOrder} />
  };
}
