import { JBButton } from "@/components/JBButton";
import { site } from "@/data/site";
import workingSession from "@/data/working-session.json";

function createInquiryHref() {
  const subject = encodeURIComponent(workingSession.cta.subject);
  const body = encodeURIComponent(workingSession.cta.prompts.join("\n\n"));
  return `${site.emailHref}?subject=${subject}&body=${body}`;
}

export function WorkingSessionOffer() {
  return (
    <section
      aria-labelledby="working-session-title"
      className="mt-12 scroll-mt-28 border-y border-jb-ink/20 py-8"
      id="working-session"
    >
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
        <div>
          <p className="jb-section-label">Smallest paid start</p>
          <h2
            className="mt-3 text-4xl leading-tight text-jb-ink"
            id="working-session-title"
          >
            {workingSession.headline}
          </h2>
          <p className="mt-4 text-lg leading-8 text-jb-ink/76">
            Bring one decision, operating problem, knowledge-system question,
            or implementation knot. Before work begins, we&apos;ll agree on one
            useful outcome.
          </p>
          <dl className="mt-7 grid grid-cols-2 gap-x-5 gap-y-6 border-t border-jb-ink/16 pt-5">
            <div>
              <dt className="jb-meta-label text-xs text-jb-blue">Fee</dt>
              <dd className="mt-2 font-semibold text-jb-ink">
                {workingSession.price.display}
              </dd>
            </div>
            <div>
              <dt className="jb-meta-label text-xs text-jb-blue">Total effort</dt>
              <dd className="mt-2 font-semibold text-jb-ink">
                {workingSession.effort.display}
              </dd>
            </div>
          </dl>
        </div>

        <div>
          <ol className="border-t border-jb-ink/20">
            {workingSession.components.map((component) => (
              <li
                className="grid grid-cols-[2.5rem_1fr] gap-3 border-b border-jb-ink/20 py-4 sm:grid-cols-[2.5rem_7rem_1fr]"
                key={component.id}
              >
                <span className="font-label text-sm text-jb-blue">
                  {component.number}
                </span>
                <strong className="text-jb-ink">{component.label}</strong>
                <p className="col-start-2 leading-7 text-jb-ink/74 sm:col-start-3">
                  {component.description}
                </p>
              </li>
            ))}
          </ol>

          <p className="mt-5 leading-7 text-jb-ink/76">
            The session can stand alone. If more work would help, we&apos;ll
            scope and authorize it separately.
          </p>
          <div className="mt-6">
            <JBButton href={createInquiryHref()}>
              {workingSession.cta.label}
            </JBButton>
          </div>
          <p className="mt-3 text-sm leading-6 text-jb-ink/64">
            Opens an email asking for the decision or problem, a useful outcome,
            and timing. It is an inquiry, not a confirmed booking.
          </p>
        </div>
      </div>
    </section>
  );
}
