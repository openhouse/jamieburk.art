import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Claim, References } from "@/components/citations";
import { portfolioPhotos } from "@/data/photography";
import { site } from "@/data/site";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Colophon - Jamie Burkart",
  description:
    "How evidence, editorial judgment, and human review become Jamie Burkart's public portfolio.",
  path: "/colophon"
});

const photographPath = [
  {
    label: "Select",
    text: "This East River portrait opens the portfolio because it introduces Jamie and locates him in the city where much of the work took shape."
  },
  {
    label: "Observe",
    text: "The frame shows Jamie beneath the Manhattan Bridge. The archive record supplies the date, photographer, and recorded permission for this portfolio use."
  },
  {
    label: "Write",
    text: "The caption makes a precise public claim: where the photograph was made, when, who made it, and where the record is held."
  },
  {
    label: "Revise",
    text: "Jamie publishes only after the caption, credit, privacy, and use are resolved. Otherwise the image stays private; if the record changes, Jamie revises or removes it."
  }
];

export default function ColophonPage() {
  const photograph = portfolioPhotos.eastRiver;

  return (
    <div className="jb-frame py-8 sm:py-14">
      <section className="grid gap-6 sm:gap-8 lg:grid-cols-[0.32fr_0.68fr]">
        <div>
          <p className="jb-section-label">How this is made</p>
          <h1 className="mt-3 text-5xl leading-none text-jb-ink sm:text-6xl">
            Colophon
          </h1>
        </div>
        <div className="text-lg leading-7 text-jb-ink sm:text-xl sm:leading-8 lg:mt-6">
          <p>
            This portfolio is edited from a growing body of project evidence.
            Its purpose is to make each public claim as clear, useful, and
            accountable as the evidence allows.
          </p>
        </div>
      </section>

      <section className="mt-8 grid gap-4 sm:mt-10 sm:gap-6 lg:mt-16 lg:grid-cols-[0.32fr_0.68fr]">
        <div>
          <p className="jb-section-label">One object, one path</p>
          <h2 className="mt-3 text-2xl leading-tight text-jb-ink sm:text-4xl">
            Follow one photograph
          </h2>
          <figure className="mt-6 max-w-sm">
            <Image
              alt={photograph.alt}
              className="aspect-[4/3] w-full object-cover"
              height={photograph.height}
              sizes="(min-width: 1024px) 28vw, 100vw"
              src={photograph.src}
              width={photograph.width}
            />
            <figcaption className="mt-3 text-sm leading-6 text-jb-ink/64">
              {photograph.caption} {photograph.credit}
            </figcaption>
          </figure>
        </div>
        <div>
          <ol className="border-t border-jb-ink/20">
            {photographPath.map((step, index) => (
              <li
                className="grid grid-cols-[1.75rem_6rem_1fr] gap-2 border-b border-jb-ink/20 py-2.5 sm:grid-cols-[3rem_8rem_1fr] sm:gap-4 sm:py-4"
                key={step.label}
              >
                <span className="font-label text-sm text-jb-blue">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-sm font-semibold text-jb-ink sm:text-base">
                  {step.label}
                </span>
                <p className="text-sm leading-5 text-jb-ink/72 sm:text-base sm:leading-7">
                  {step.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mt-12 grid gap-5 border-y border-jb-ink/20 py-6 lg:grid-cols-[0.32fr_0.68fr]">
        <p className="jb-section-label">A living publication</p>
        <div>
          <p className="text-base leading-7 text-jb-ink/72">
            <Claim
              claimId="CLM-KNOWLEDGE-WIKI-GRAPH-ECOSYSTEM-2026"
              occurrenceId="knowledge-wiki-graph-method"
              pageId="colophon"
              projection="colophon"
              surface="/colophon"
            />
          </p>
          <p className="mt-3 text-base font-semibold leading-7 text-jb-ink">
            Automated checks flag issues; Jamie decides what is published.
          </p>
          <p className="mt-2 text-sm leading-6 text-jb-ink/64">
            Made and maintained by Jamie Burkart. Last revised 29 August 2026. {" "}
            <Link
              className="font-semibold text-jb-blue underline decoration-jb-blue/35 underline-offset-4 hover:text-jb-green"
              href="/lab/source-backed-team-memory"
            >
              See the knowledge method in practice
            </Link>
            , or {" "}
            <a
              className="font-semibold text-jb-blue underline decoration-jb-blue/35 underline-offset-4 hover:text-jb-green"
              href={site.emailHref}
            >
              suggest a correction
            </a>
            .
          </p>
          <details className="mt-3 text-sm leading-6 text-jb-ink/64">
            <summary className="cursor-pointer font-semibold text-jb-blue">
              Editorial responsibility
            </summary>
            <p className="mt-2">
              Tools and modeled reviewers may suggest changes, but they do not
              supply consent, rights, approval, endorsement, or publication
              authority. Jamie decides what appears here. He checks suggested
              corrections against the record and notes accepted changes here.
            </p>
          </details>
        </div>
      </section>
      <div className="mt-10 max-w-3xl">
        <References pageId="colophon" />
      </div>
    </div>
  );
}
