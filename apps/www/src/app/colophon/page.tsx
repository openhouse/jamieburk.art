import Link from "next/link";
import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Colophon - Jamie Burkart",
  description:
    "How Jamie Burkart's living portfolio is composed, supported, reviewed, and maintained.",
  path: "/colophon"
});

const details = [
  "This public edition is written, designed, built, edited, and maintained by Jamie Burkart; the projects it documents are often collective",
  "Static-first Next.js App Router, React, TypeScript, Tailwind CSS, local MDX content, and Docker / Dokku deployment",
  "Semantic HTML, visible keyboard focus, readable line lengths, and responsive layouts",
  "Karla, Oswald, TeX Gyre Pagella, a system display serif, and Human Index colors drawn from civic documents and the materials of the work",
  "A small, metadata-stripped photographic edition selected from Jamie's archive; publication permission and project-appropriate credit are reviewed separately",
  "Staging stays out of search indexes until the exact release is approved; this edition uses no invasive tracking"
];

export default function ColophonPage() {
  return (
    <div className="jb-frame py-14">
      <div className="grid gap-8 lg:grid-cols-[0.32fr_0.68fr]">
        <div>
          <p className="jb-section-label">How this is made</p>
          <h1 className="mt-3 text-6xl leading-none text-jb-ink">Colophon</h1>
        </div>
        <p className="mt-6 text-xl leading-8 text-jb-ink/76">
          This portfolio is a living public edition of Jamie Burkart&apos;s work. It
          is composed from a wider knowledge practice: projects, people,
          artifacts, decisions, questions, and corrections brought into
          relationship, then edited for a particular reader and purpose. Only
          material that is supported, useful, permitted, and safe to share
          enters the public site. The working archive remains separate.
          Capability and project-topic links open a filtered work index, keeping
          each claim close to the case studies that support it.
        </p>
      </div>
      <section className="mt-16 grid gap-8 border-t border-jb-ink/20 pt-12 lg:grid-cols-[0.32fr_0.68fr]">
        <div>
          <p className="jb-section-label">Editorial stewardship</p>
          <h2 className="mt-3 text-4xl leading-tight text-jb-ink">
            Every page has a review path
          </h2>
        </div>
        <div>
          <p className="text-xl leading-8 text-jb-ink/76">
            Each page begins with a purpose, an audience, and an accountable
            review path. A new source, a change in project status, an
            accessibility finding, a rights or credit decision, or a new release
            can prompt revision. Jamie reviews what changed, what supports it,
            what may be shared, and whether the page still serves its reader.
          </p>
          <p className="mt-6 leading-8 text-jb-ink/76">
            Deterministic checks test what software can establish: source
            relationships, dates, links, accessibility requirements, and
            public-safety rules. Editorial simulations then inspect the rendered
            page from named perspectives suited to its subject. In the codebase,
            these perspectives are called page owners.
          </p>
          <p className="mt-6 leading-8 text-jb-ink/76">
            A page owner may accept the edition or return constructive criticism.
            These are fictionalized simulations informed only by publicly
            available work—not participation, quotation, endorsement, approval,
            or sign-off by the named person. They cannot grant consent, settle a
            disputed fact, assign collective credit, or publish a page. Those
            decisions remain human responsibilities, and Jamie retains final
            publication authority.
          </p>
        </div>
      </section>
      <div className="mt-14 grid gap-8 lg:grid-cols-[0.32fr_0.68fr]">
        <div>
          <p className="jb-section-label">Made and maintained</p>
          <h2 className="mt-3 text-4xl leading-tight text-jb-ink">
            Digital structure, material attention
          </h2>
        </div>
        <ol className="border-t border-jb-ink/20">
          {details.map((detail, index) => (
            <li
              className="grid gap-3 border-b border-jb-ink/20 py-4 sm:grid-cols-[3rem_1fr]"
              key={detail}
            >
              <span className="font-label text-sm text-jb-blue">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="leading-7 text-jb-ink/76">{detail}</p>
            </li>
          ))}
        </ol>
      </div>
      <section className="mt-16 grid gap-8 border-t border-jb-ink/20 pt-12 lg:grid-cols-[0.32fr_0.68fr]">
        <div>
          <p className="jb-section-label">Knowledge system</p>
          <h2 className="mt-3 text-4xl leading-tight text-jb-ink">
            Three graphs, one reviewable practice
          </h2>
        </div>
        <div>
          <p className="text-xl leading-8 text-jb-ink/76">
            The portfolio is one public expression of Jamie&apos;s Knowledge Wiki
            Graph: a research and operating practice for turning changing
            project material into knowledge a team can inspect, correct,
            evaluate, and continue.
          </p>
          <dl className="mt-8 grid gap-px border border-jb-ink/15 bg-jb-ink/15 md:grid-cols-3">
            <div className="bg-jb-paper p-5">
              <dt className="font-semibold text-jb-blue">Semantic graph</dt>
              <dd className="mt-2 text-sm leading-6 text-jb-ink/74">
                Projects, people, decisions, requirements, claims, corrections,
                and open questions describe what the work means.
              </dd>
            </div>
            <div className="bg-jb-paper p-5">
              <dt className="font-semibold text-jb-blue">Evidence graph</dt>
              <dd className="mt-2 text-sm leading-6 text-jb-ink/74">
                Sources, artifacts, observations, contradictions, and limits
                show what supports or complicates an interpretation.
              </dd>
            </div>
            <div className="bg-jb-paper p-5">
              <dt className="font-semibold text-jb-blue">Source custody</dt>
              <dd className="mt-2 text-sm leading-6 text-jb-ink/74">
                Exact materials, versions, access conditions, and retention
                rules record where authoritative material lives and who may use it.
              </dd>
            </div>
          </dl>
          <p className="mt-6 leading-8 text-jb-ink/76">
            Evaluations and human review govern movement between the three. A
            shared identity can connect independently useful project
            repositories without merging stewardship, claims, permission,
            collective credit, or publication authority. The public site remains
            a selective composition, not a browser into the underlying archive.
          </p>
          <Link
            className="mt-6 inline-block border-b border-jb-blue font-semibold text-jb-blue hover:text-jb-green"
            href="/lab/source-backed-team-memory"
          >
            See the Knowledge Wiki Graph method
          </Link>
        </div>
      </section>
      <section className="mt-16 grid gap-8 border-t border-jb-ink/20 pt-12 lg:grid-cols-[0.32fr_0.68fr]">
        <div>
          <p className="jb-section-label">Lineage and contribution</p>
          <h2 className="mt-3 text-4xl leading-tight text-jb-ink">
            No work arrives alone
          </h2>
        </div>
        <div>
          <p className="text-xl leading-8 text-jb-ink/76">
            This edition carries work made with artists, organizers, resident
            leaders, small businesses, public agencies, neighborhood
            associations, and open-web communities. Its visible lineage includes
            the{" "}
            <Link className="text-jb-blue underline" href="/work/fair-rent-nyc">
              NYC Artist Coalition and Fair Rent NYC
            </Link>
            ,{" "}
            <Link className="text-jb-blue underline" href="/work/kc-town-hall">
              KC Town Hall
            </Link>
            ,{" "}
            <Link className="text-jb-blue underline" href="/work/196-sunday-dinner">
              Sunday Dinner
            </Link>
            , and the community organizers who used{" "}
            <Link className="text-jb-blue underline" href="/work/wowlist">
              WOW List
            </Link>
            .
          </p>
          <p className="mt-6 leading-8 text-jb-ink/76">
            The practice draws from community organizing, participatory design,
            archival research, documentary photography, web standards, and
            software delivery. Individual case studies name Jamie&apos;s role and use
            collective-work language where the work was shared.
          </p>
          <p className="mt-6 leading-8 text-jb-ink/76">
            People, sources, and photographs are credited when the credit is
            relevant, supported, and permitted. When a person or source should
            not be identified publicly, the edition uses project-level credit or
            withholds the detail. Protected material remains part of responsible
            stewardship without becoming public content.
          </p>
        </div>
      </section>
      <div className="mt-12 border-t border-jb-ink/20 pt-8 text-right">
        <Link
          className="inline-block border-b border-jb-blue font-semibold text-jb-blue hover:text-jb-green"
          href="https://github.com/openhouse/jamieburk.art"
        >
          Read the public source and revision history
        </Link>
      </div>
    </div>
  );
}
