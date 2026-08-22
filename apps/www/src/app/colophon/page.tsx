import Link from "next/link";
import type { Metadata } from "next";
import { Claim } from "@/components/citations";
import { knowledgeWikiPractice } from "@/data/knowledge-wiki-practice";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Colophon - Jamie Burkart",
  description:
    "How Jamie Burkart's portfolio is composed from source-backed knowledge, editorial review, governed photography, and a public-safe publishing system.",
  path: "/colophon"
});

const makingNotes = [
  {
    term: "Composition",
    detail:
      "A static-first Next.js site built with React, TypeScript, and local MDX. Pages are edited for a reader and purpose; they are not automatic archive exports."
  },
  {
    term: "Visual language",
    detail:
      "Palatino carries editorial landmarks, Karla carries prose, and Oswald carries labels. A small, permission-reviewed photo selection uses credited, metadata-stripped derivatives."
  },
  {
    term: "Publication",
    detail:
      "Docker and Dokku support staging-first releases; Git keeps the revision record. Staging stays outside search indexes, and there is no invasive tracking in V1."
  }
];

export default function ColophonPage() {
  return (
    <article className="jb-frame py-14">
      <header className="grid gap-8 border-b border-jb-ink/16 pb-14 lg:grid-cols-[0.32fr_0.68fr]">
        <div>
          <p className="jb-section-label">How this is made</p>
          <h1 className="mt-3 text-6xl leading-none text-jb-ink">Colophon</h1>
        </div>
        <div className="mt-6 max-w-[68ch] space-y-5 text-xl leading-8 text-jb-ink/78 lg:mt-0">
          <p>
            This portfolio is a selective public rendering of a larger working
            system. It is designed to help a time-pressed reader understand what
            I do, see enough evidence to judge the work, and know where to go
            next.
          </p>
          <p>
            The archive can stay deep while the argument stays clear. Sources,
            interpretations, photographs, corrections, and open questions keep
            developing behind a deliberately small public surface.
          </p>
        </div>
      </header>

      <section className="grid gap-8 border-b border-jb-ink/16 py-14 lg:grid-cols-[0.32fr_0.68fr]">
        <div>
          <p className="jb-section-label">Knowledge system</p>
          <h2 className="mt-3 text-4xl leading-tight text-jb-ink">
            One portfolio, three graphs
          </h2>
        </div>
        <div className="max-w-[72ch]">
          <p className="text-xl leading-8 text-jb-ink/78">
            <Claim
              claimId="CLM-KNOWLEDGE-WIKI-GRAPH-PRACTICE-2026"
              projection="archive-note"
              surface="/colophon"
            />
          </p>
          <dl className="mt-8 border-t border-jb-ink/18">
            {knowledgeWikiPractice.layers.map((layer) => (
              <div
                className="grid gap-2 border-b border-jb-ink/18 py-5 sm:grid-cols-[10rem_1fr] sm:gap-6"
                key={layer.id}
              >
                <dt className="font-label text-sm uppercase text-jb-blue">
                  {layer.label}
                </dt>
                <dd>
                  <p className="font-semibold leading-7 text-jb-ink">
                    {layer.question}
                  </p>
                  <p className="mt-2 leading-7 text-jb-ink/74">
                    {layer.description}
                  </p>
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 leading-7 text-jb-ink/74">
            A portfolio page, resume, research packet, and project site are
            different audience-specific projections. None is the whole archive,
            and no transition among them is automatic.
          </p>
          <Link
            className="mt-6 inline-flex min-h-11 items-center border-b border-jb-blue font-semibold text-jb-blue hover:border-jb-green hover:text-jb-green"
            href="/lab/source-backed-team-memory"
          >
            See the Knowledge Wiki Graph practice
          </Link>
        </div>
      </section>

      <section className="grid gap-8 border-b border-jb-ink/16 py-14 lg:grid-cols-[0.32fr_0.68fr]">
        <div>
          <p className="jb-section-label">Editorial responsibility</p>
          <h2 className="mt-3 text-4xl leading-tight text-jb-ink">
            A page has to earn its place
          </h2>
        </div>
        <div className="max-w-[68ch] space-y-5 text-lg leading-8 text-jb-ink/76">
          <p>
            I am piloting a magazine-like page-ownership practice. Named
            editorial lenses each take one responsibility: story, system, or
            form. Automated checks run first; then every modeled reader returns
            a critique, recommended revision, and binary result. Every lens must
            pass; a weak result cannot be averaged away.
          </p>
          <p className="border-l border-jb-blue pl-5 text-base leading-7 text-jb-ink/72">
            These named lenses are fictionalized simulations informed by public
            work—not participation or endorsement. They guide revision but do
            not confer publication authority. I remain responsible for what this
            site says and publishes.
          </p>
        </div>
      </section>

      <section className="grid gap-8 py-14 lg:grid-cols-[0.32fr_0.68fr]">
        <div>
          <p className="jb-section-label">Material practice</p>
          <h2 className="mt-3 text-4xl leading-tight text-jb-ink">
            Selected materials
          </h2>
        </div>
        <dl className="border-t border-jb-ink/18">
          {makingNotes.map((note) => (
            <div
              className="grid gap-2 border-b border-jb-ink/18 py-5 sm:grid-cols-[10rem_1fr] sm:gap-6"
              key={note.term}
            >
              <dt className="font-semibold leading-7 text-jb-ink">
                {note.term}
              </dt>
              <dd className="leading-7 text-jb-ink/74">{note.detail}</dd>
            </div>
          ))}
        </dl>
      </section>

      <footer className="grid gap-8 border-t border-jb-ink/16 pt-10 lg:grid-cols-[0.32fr_0.68fr]">
        <p className="jb-section-label">Living edition</p>
        <div className="max-w-[68ch] space-y-4 leading-7 text-jb-ink/74">
          <p>
            The site will change as the work, evidence, and reader&apos;s needs
            change. Unpublished correspondence, sensitive records, credentials,
            and unapproved material remain outside the public edition.
          </p>
          <a
            className="inline-flex min-h-11 items-center border-b border-jb-blue font-semibold text-jb-blue hover:border-jb-green hover:text-jb-green"
            href="https://github.com/openhouse/jamieburk.art"
            rel="noreferrer"
            target="_blank"
          >
            Read the public source on GitHub
          </a>
        </div>
      </footer>
    </article>
  );
}
