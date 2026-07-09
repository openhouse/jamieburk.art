import type { Metadata } from "next";
import { JBButton } from "@/components/JBButton";
import { JBCard } from "@/components/JBCard";
import { resumeProofHighlights } from "@/data/proofs";
import { site } from "@/data/site";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Resume - Jamie Burkart",
  description:
    "Resume page for Jamie Burkart: Technical Project Manager - Product Operations & Implementation.",
  path: "/resume"
});

const resumeSections = [
  {
    title: "Product operations & implementation",
    text:
      "Requirements, workflow maps, user stories, acceptance criteria, decision logs, rollout planning, adoption materials, and handoff documentation."
  },
  {
    title: "Knowledge systems & documentation",
    text:
      "Documentation architecture, meeting synthesis, source maps, shared drives, resource libraries, templates, and searchable reference systems."
  },
  {
    title: "Web, open-data & civic technology",
    text:
      "Public-facing tools, JavaScript / TypeScript, React / Next.js, Python / Django, SQL, Git / GitHub, Docker / Dokku, QGIS, and open-data workflows."
  }
];

export default function ResumePage() {
  return (
    <div className="jb-frame py-12">
      <div className="grid gap-10 lg:grid-cols-[0.68fr_0.32fr]">
        <div className="jb-reading">
          <h1 className="text-5xl font-bold text-jb-ink">Resume</h1>
          <p className="mt-4 text-2xl font-semibold text-jb-green">
            Technical Project Manager - Product Operations & Implementation
          </p>
          <p className="mt-6 text-xl leading-8 text-jb-ink/76">
            I create operating structure for complex public-facing teams,
            turning ambiguous work into requirements, workflows, documentation,
            decision trails, launch support, onboarding materials, and durable
            handoffs.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <JBButton href={site.resumePath} download>
              Download resume PDF
            </JBButton>
            <JBButton href="/contact" variant="secondary">
              Contact Jamie
            </JBButton>
          </div>
          <p className="mt-4 text-sm text-jb-ink/62">
            Current resume for Technical Project Manager - Product Operations &
            Implementation roles. Last updated: July 2026.
          </p>
          <div className="mt-8 grid gap-4">
            {resumeSections.map((section) => (
              <JBCard as="section" key={section.title}>
                <h2 className="text-xl font-semibold text-jb-ink">{section.title}</h2>
                <p className="mt-3 leading-7 text-jb-ink/76">{section.text}</p>
              </JBCard>
            ))}
          </div>
        </div>
        <aside className="rounded-lg border border-jb-ink/12 bg-jb-warm p-5">
          <h2 className="text-2xl font-semibold text-jb-ink">Selected impact</h2>
          <ul className="mt-5 space-y-4 text-jb-ink/76">
            {resumeProofHighlights.map((proof) => (
              <li className="flex gap-3" key={proof.id}>
                <span aria-hidden="true" className="mt-2 h-2 w-2 rounded-full bg-jb-ochre" />
                <span>{proof.shortWording ?? proof.publicWording}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
