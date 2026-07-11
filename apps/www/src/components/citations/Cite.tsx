import type { ResolvedCitationPage } from "@/lib/citations/types";

type CiteProps = {
  page: ResolvedCitationPage;
  claim: string;
};

export function Cite({ page, claim }: CiteProps) {
  const citationNumbers = page.citationsByClaim[claim];

  if (!citationNumbers?.length) {
    throw new Error(`Missing public citation for claim on ${page.path}`);
  }

  return (
    <>
      {citationNumbers.map((number) => (
        <sup className="citation" key={number}>
          <a href={`#reference-${number}`} aria-label={`Citation ${number}`}>
            [{number}]
          </a>
        </sup>
      ))}
    </>
  );
}
