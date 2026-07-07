import type { Metadata } from "next";
import { JBButton } from "@/components/JBButton";
import { site } from "@/data/site";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Resume - Jamie Burkart",
  description:
    "Resume page for Jamie Burkart: Technical Project Manager - Product Operations & Implementation.",
  path: "/resume"
});

const highlights = [
  "14+ years creating operating structure",
  "Contributed to online and e-commerce growth for a legacy business",
  "Structured shared civic campaign documentation and decision trails",
  "Co-built community web systems for city-based arts and music communities",
  "Created summary-only community continuity systems for gatherings and artists"
];

const capabilities = [
  "Requirements discovery, workflow mapping, user stories, acceptance criteria, decision logs, action trackers, rollout planning, UAT / QA coordination, adoption materials, and handoffs.",
  "Documentation architecture, meeting synthesis, source mapping, shared-drive structure, public guidance, reusable templates, searchable reference systems, and AI-ready documentation practices.",
  "JavaScript / TypeScript, Node.js, React / Next.js, Ember.js, Python / Django, SQL, Git / GitHub, Docker / Dokku, QGIS, open-data workflows, dataset documentation, and API / data-product requirements."
];

const professionalDevelopment = [
  "AI Evals for Engineers & PMs - Shreya Shankar & Hamel Husain / Maven, 2026. Application-centric evals, analysis, annotation workflows, traces, LLM failure modes, retrieval quality, and human-in-the-loop evaluation practice."
];

export default function ResumePage() {
  return (
    <div className="jb-frame py-12">
      <div className="grid gap-10 lg:grid-cols-[0.68fr_0.32fr]">
        <div className="jb-reading">
          <h1 className="text-4xl font-bold text-jb-ink sm:text-5xl">Resume</h1>
          <p className="mt-4 text-2xl font-semibold text-jb-green">
            Technical Project Manager - Product Operations & Implementation
          </p>
          <p className="mt-6 text-xl leading-8 text-jb-ink/76">
            I help teams turn loosely defined, high-stakes work into usable
            systems by creating requirements, workflows, documentation, decision
            records, launch support, onboarding materials, and durable handoffs.
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
            Current public resume PDF. The HTML summary below keeps the page
            useful and accessible even when the standalone PDF is not indexed.
          </p>
        </div>
        <aside className="rounded-lg border border-jb-ink/12 bg-jb-warm p-5">
          <h2 className="text-2xl font-semibold text-jb-ink">Selected impact</h2>
          <ul className="mt-5 space-y-4 text-jb-ink/76">
            {highlights.map((highlight) => (
              <li className="flex gap-3" key={highlight}>
                <span aria-hidden="true" className="mt-2 h-2 w-2 rounded-full bg-jb-ochre" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
      <section className="mt-12 rounded-lg border border-jb-ink/12 bg-jb-warm p-6">
        <h2 className="font-display text-2xl font-semibold text-jb-ink">
          Core capabilities
        </h2>
        <div className="mt-5 grid gap-5 text-jb-ink/76 lg:grid-cols-3">
          {capabilities.map((capability) => (
            <p className="leading-7" key={capability}>
              {capability}
            </p>
          ))}
        </div>
      </section>
      <section className="mt-6 rounded-lg border border-jb-ink/12 bg-jb-warm p-6">
        <h2 className="font-display text-2xl font-semibold text-jb-ink">
          Professional development
        </h2>
        <ul className="mt-5 space-y-4 text-jb-ink/76">
          {professionalDevelopment.map((item) => (
            <li className="flex gap-3" key={item}>
              <span aria-hidden="true" className="mt-2 h-2 w-2 rounded-full bg-jb-ochre" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
