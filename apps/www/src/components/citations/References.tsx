import type { ResolvedCitationPage } from "@/lib/citations/types";

type ReferencesProps = {
  page: ResolvedCitationPage;
};

export function References({ page }: ReferencesProps) {
  return (
    <section className="citation-references" aria-labelledby="sources-and-notes">
      <h2 id="sources-and-notes">{page.referenceHeading}</h2>
      <ol className="citation-reference-list">
        {page.references.map((reference) => (
          <li id={`reference-${reference.number}`} key={reference.number}>
            <p>
              <span className="citation-reference-number">[{reference.number}]</span>{" "}
              <strong>{reference.citationLabel}.</strong>{" "}
              {reference.href ? (
                <a href={reference.href} rel="noreferrer" target="_blank">
                  Public reference
                </a>
              ) : (
                <span>Public-safe archival summary; no public link is exposed.</span>
              )}
            </p>
            <p>{reference.note}</p>
            <p className="citation-reference-guardrail">{reference.guardrail}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
