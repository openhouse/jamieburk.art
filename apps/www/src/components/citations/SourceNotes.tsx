import type { ResolvedCitationPage } from "@/data/knowledge";

type SourceNotesProps = {
  page: ResolvedCitationPage;
};

function displayDate(value?: string) {
  if (!value) return null;
  const [year, month, day] = value.slice(0, 10).split("-");
  if (!year) return value;
  if (!month) return year;
  if (!day) return `${year}-${month}`;
  return `${month}/${day}/${year}`;
}

export function SourceNotes({ page }: SourceNotesProps) {
  if (!page.sources.length) return null;

  return (
    <section
      className="citation-sources mt-14 border-t border-jb-blue/25 pt-8"
      role="doc-endnotes"
      aria-labelledby={`${page.slug}-sources-heading`}
    >
      <h2 id={`${page.slug}-sources-heading`} className="text-2xl font-semibold text-jb-ink">
        Sources
      </h2>
      <ol className="mt-5 list-decimal space-y-6 pl-7 text-[0.96rem] leading-7 text-jb-ink/82">
        {page.sources.map(({ source, evidence, number, targetId, backlinks }) => {
          const citationNotes = [...new Set(evidence.flatMap((item) => item.citationNote ?? []))];
          const limitations = [...new Set(evidence.flatMap((item) => item.limitations))];
          const sourceDate = displayDate(source.publishedAt ?? source.capturedAt);

          return (
            <li id={targetId} key={source.id} className="citation-source-note scroll-mt-28 pl-2">
              <p>
                {source.authorOrOrganization ? (
                  <strong className="font-semibold text-jb-ink">
                    {source.authorOrOrganization}.{" "}
                  </strong>
                ) : null}
                <cite className="not-italic">{source.title}</cite>
                {sourceDate ? ` (${sourceDate}).` : "."} {source.publicNote}
              </p>
              {citationNotes.map((note) => (
                <p key={note} className="mt-2 text-jb-ink/72">
                  {note}
                </p>
              ))}
              {limitations.length ? (
                <p className="mt-2 text-jb-ink/72">
                  <strong className="font-semibold text-jb-ink">Limit:</strong>{" "}
                  {limitations.join("; ")}.
                </p>
              ) : null}
              {source.links.length ? (
                <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                  {source.links.map((link) => (
                    <a
                      key={`${source.id}-${link.kind}`}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-jb-blue underline decoration-jb-blue/35 underline-offset-4 hover:decoration-jb-blue"
                    >
                      {link.label}
                    </a>
                  ))}
                </p>
              ) : null}
              <span className="mt-2 inline-flex flex-wrap gap-2" aria-label={`Backlinks for source ${number}`}>
                {backlinks.map((backlink, index) => (
                  <a
                    key={backlink.id}
                    href={`#${backlink.id}`}
                    role="doc-backlink"
                    aria-label={backlink.label}
                    className="citation-backlink"
                  >
                    <span aria-hidden="true">↩</span>
                    {backlinks.length > 1 ? (
                      <span className="sr-only"> occurrence {index + 1}</span>
                    ) : null}
                  </a>
                ))}
              </span>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
