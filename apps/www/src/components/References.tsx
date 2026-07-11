import { claimsById, sourcesById } from "@/data/knowledge-bank";
import { buildCitationNote, requirePublicClaim } from "@/lib/knowledge-bank-runtime.mjs";

type ReferencesProps = { claimIds: string[]; className?: string };

export function References({ claimIds, className }: ReferencesProps) {
  const ids = [...new Set(claimIds)];
  if (!ids.length) return null;

  return (
    <section aria-label="References" className={className} data-citations data-footnotes>
      <h2>References</h2>
      <ol>
        {ids.map((id) => {
          const claim = requirePublicClaim(claimsById, id);
          const note = buildCitationNote(claim, sourcesById);
          return (
            <li data-citation-claim={id} id={`citation-note-${id}`} key={id}>
              <p>
                {note.text}{" "}
                {note.links.map((link, index) => (
                  <span key={`${link.href}-${link.label}`}>
                    {index > 0 ? " · " : ""}
                    <a href={link.href}>{link.label}</a>
                  </span>
                ))}
                {note.links.length ? ". " : " "}
                {note.qualifications.join(" ")}{" "}
                <a
                  aria-label={`Back to citation ${ids.indexOf(id) + 1}`}
                  data-citation-backlink
                  data-footnote-backref
                  href={`#citation-ref-${id}`}
                >
                  Back to citation
                </a>
              </p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
