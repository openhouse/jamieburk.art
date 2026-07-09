import type { Metadata } from "next";
import { JBButton } from "@/components/JBButton";
import { resumeProofHighlights } from "@/data/proofs";
import { site } from "@/data/site";
import { createMetadata } from "@/lib/metadata";

const coreCapabilities = [
  {
    title: "Product operations and implementation",
    body:
      "Requirements, workflow mapping, user stories, acceptance criteria, decision logs, action trackers, rollout planning, UAT / QA support, stakeholder updates, adoption materials, and handoffs."
  },
  {
    title: "Knowledge systems and documentation",
    body:
      "Documentation architecture, source maps, meeting synthesis, shared-drive structure, public guidance, resource libraries, reusable templates, searchable reference systems, and AI-ready documentation practices."
  },
  {
    title: "Web, open-data, and civic technology",
    body:
      "I build and maintain public-facing tools with JavaScript / TypeScript, Node.js, React / Next.js, Ember.js, Python / Django, SQL, Git / GitHub, Docker / Dokku, QGIS, open-data workflows, dataset documentation, and API / data-product requirements."
  }
];

const selectedImpact = [
  "Led web, e-commerce, marketing, analytics, and operations improvements for Harry J. Epstein Company, contributing to 2x online revenue growth while helping an 80+ year-old legacy industrial business adapt to e-commerce.",
  "Built CallNYC.org after the New York City Council's first civic-data hackathon, translating constituent-services open data into resident-facing find help / next steps guidance.",
  "Built and stewarded 30+ pages of shared campaign-memory and coordination infrastructure for a Commercial Rent Stabilization collaboration; synthesized meetings, decision records, action items, legal / policy questions, media assets, stakeholder next steps, and city / state strategy lanes into shared memory and actionable workstreams.",
  "Created a legislative source map and provenance redline tracing Commercial Rent Stabilization bill language and drafted privacy-preserving commercial vacancy, occupancy, and lease-cost data materials for city stakeholders.",
  "Co-built WOWList.org with Richard Caceres, a Python / Django + Ember.js community-calendar platform adopted by DIY arts and music organizers across roughly 35 city ecosystems.",
  "Created Sunday Dinner / 196 Artists Residency as repeatable participation infrastructure, documenting 300+ gatherings and supporting 20+ resident artists through practical invitation, hosting, onboarding, facilitation, documentation, and follow-through systems."
];

const experienceSummary = [
  "Harry J. Epstein Company: technical project management, web systems, e-commerce workflows, analytics, marketing operations, content systems, stakeholder translation, and long-term implementation stewardship.",
  "NYC Artist Coalition / FairRentNYC: public campaign web infrastructure, Commercial Rent Stabilization campaign memory, source maps, decision records, action trackers, public-data framing, and coordination support.",
  "WOWList.org: co-built Django / PostgreSQL / PostGIS and Ember community-calendar platform for DIY arts and music organizers and local calendar editors.",
  "CallNYC.org: built archived civic-data prototype translating constituent-services open data into resident-facing next-step guidance.",
  "196 Artists Residency / Sunday Dinner: created repeatable participation infrastructure across gatherings, hosting, onboarding, facilitation, documentation, and follow-through.",
  "KC Town Hall LLC: co-led adaptive reuse planning and public-benefit documentation for a long-vacant historic building, including a public funding recommendation."
];

const educationAndDevelopment = [
  "AI Evals for Engineers & PMs, Shreya Shankar and Hamel Husain / Maven, 2026.",
  "Professional practice across technical project management, product operations, implementation, civic technology, documentation systems, AI evaluation, and source-backed team memory."
];

export const metadata: Metadata = createMetadata({
  title: "Resume - Jamie Burkart",
  description:
    "Resume page for Jamie Burkart: Technical Project Manager - Product Operations & Implementation.",
  path: "/resume"
});

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
            I turn ambiguous, loosely defined work into usable systems for
            public-facing teams: requirements, workflows, documentation,
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
            Current public resume for Technical Project Manager, Technical
            Operations, Product Operations, Implementation, civic technology,
            documentation, knowledge-systems, and public-facing tools roles.
          </p>
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
      <section className="mt-14 grid gap-10 lg:grid-cols-[0.34fr_0.66fr]">
        <div>
          <p className="text-sm font-semibold uppercase text-jb-blue">Role</p>
          <h2 className="mt-3 text-3xl font-bold text-jb-ink">
            Technical Project Manager - Product Operations & Implementation
          </h2>
        </div>
        <div className="jb-reading">
          <h3 className="text-2xl font-semibold text-jb-ink">Profile</h3>
          <p className="mt-4 leading-8 text-jb-ink/76">
            Technical project manager with 14+ years creating operating
            structure between stakeholders, product, documentation,
            implementation, and public-facing systems. Strong in complex,
            resource-constrained, early-stage, civic, small-business, cultural,
            and public-interest environments where teams need someone to clarify
            the work, translate between technical and nontechnical audiences,
            coordinate stakeholders, and leave behind usable workflows, reliable
            handoffs, adoption support, and durable documentation.
          </p>
        </div>
      </section>
      <section className="mt-14">
        <h2 className="text-3xl font-bold text-jb-ink">Core capabilities</h2>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {coreCapabilities.map((capability) => (
            <div
              className="rounded-lg border border-jb-ink/12 bg-jb-paper p-5"
              key={capability.title}
            >
              <h3 className="text-xl font-semibold text-jb-ink">
                {capability.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-jb-ink/72">
                {capability.body}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className="mt-14">
        <h2 className="text-3xl font-bold text-jb-ink">Selected impact</h2>
        <ul className="mt-6 grid gap-4 lg:grid-cols-2">
          {selectedImpact.map((impact) => (
            <li
              className="rounded-lg border border-jb-ink/12 bg-jb-warm p-5 leading-7 text-jb-ink/76"
              key={impact}
            >
              {impact}
            </li>
          ))}
        </ul>
      </section>
      <section className="mt-14">
        <h2 className="text-3xl font-bold text-jb-ink">Experience summary</h2>
        <ul className="mt-6 grid gap-4 lg:grid-cols-2">
          {experienceSummary.map((item) => (
            <li
              className="rounded-lg border border-jb-ink/12 bg-jb-paper p-5 leading-7 text-jb-ink/76"
              key={item}
            >
              {item}
            </li>
          ))}
        </ul>
      </section>
      <section className="mt-14">
        <h2 className="text-3xl font-bold text-jb-ink">
          Education / Professional Development
        </h2>
        <ul className="mt-6 grid gap-4 lg:grid-cols-2">
          {educationAndDevelopment.map((item) => (
            <li
              className="rounded-lg border border-jb-ink/12 bg-jb-warm p-5 leading-7 text-jb-ink/76"
              key={item}
            >
              {item}
            </li>
          ))}
        </ul>
      </section>
      <section className="mt-14 rounded-lg border border-jb-blue/20 bg-jb-sky/15 p-6">
        <h2 className="text-2xl font-semibold text-jb-ink">Download PDF</h2>
        <p className="mt-3 leading-7 text-jb-ink/76">
          Current public resume for Technical Project Manager - Product
          Operations & Implementation roles.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <JBButton href={site.resumePath} download>
            Download resume PDF
          </JBButton>
          <JBButton href="/contact" variant="secondary">
            Contact Jamie
          </JBButton>
        </div>
      </section>
    </div>
  );
}
