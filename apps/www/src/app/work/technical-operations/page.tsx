import type { Metadata } from "next";
import { ContactCTA } from "@/components/ContactCTA";
import { JBCard } from "@/components/JBCard";
import { ResumeCTA } from "@/components/ResumeCTA";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Technical Operations & Implementation - Jamie Burkart",
  description:
    "Role-specific proof surface for technical operations, implementation, product operations, documentation systems, and durable handoffs.",
  path: "/work/technical-operations"
});

const sections = [
  {
    title: "Operating systems built",
    items: [
      "HJE e-commerce and operating-workflow systems",
      "NYC Artist Coalition / FairRentNYC public campaign web and campaign-memory infrastructure",
      "196 / Sunday Dinner onboarding, facilitation, and continuity systems"
    ]
  },
  {
    title: "Delivery and launch",
    items: ["CallNYC", "WOWList", "HJE e-commerce"]
  },
  {
    title: "Documentation and working memory",
    items: [
      "Source maps",
      "Public guidance",
      "Resource libraries",
      "Handbooks / templates",
      "Meeting synthesis",
      "Decision records",
      "Known / Open / Protected boundaries"
    ]
  },
  {
    title: "Tools and technical environments",
    items: [
      "JavaScript / TypeScript",
      "Node.js",
      "React / Next.js",
      "Ember.js",
      "Python / Django",
      "SQL",
      "Git / GitHub",
      "Docker / Dokku",
      "QGIS",
      "Open-data workflows",
      "AI evals and human-reviewed documentation workflows"
    ]
  }
];

const proofRows = [
  {
    label: "Private-sector operations",
    proof:
      "Helped a legacy industrial business translate catalog knowledge and operating routines into maintainable e-commerce workflows."
  },
  {
    label: "Civic campaign infrastructure",
    proof:
      "Helped build 30+ pages of Commercial Rent Stabilization campaign memory with source maps, action tracking, public-data framing, and protected-source boundaries."
  },
  {
    label: "Coalition public systems",
    proof:
      "As a NYC Artist Coalition co-founding member, helped shape public campaign web surfaces and follow-up infrastructure while keeping campaign outcomes collective."
  },
  {
    label: "Source-backed memory",
    proof:
      "Developed a lab method for source-linked, human-reviewed team memory with decisions, open questions, onboarding context, governance notes, and eval checks."
  }
];

export default function TechnicalOperationsPage() {
  return (
    <div className="jb-frame py-12">
      <div className="jb-reading">
        <h1 className="text-5xl font-bold text-jb-ink">
          Technical Operations & Implementation
        </h1>
        <p className="mt-5 text-xl leading-8 text-jb-ink/76">
          Across civic, cultural, small-business, and public-facing technical
          environments, I build the operating backbone teams need to move:
          planning rhythms, decision logs, action trackers, onboarding materials,
          documentation systems, launch support, and durable handoffs.
        </p>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {sections.map((section) => (
          <JBCard key={section.title}>
            <h2 className="text-2xl font-semibold text-jb-ink">{section.title}</h2>
            <ul className="mt-5 space-y-3 text-jb-ink/76">
              {section.items.map((item) => (
                <li className="flex gap-3" key={item}>
                  <span aria-hidden="true" className="mt-2 h-2 w-2 rounded-full bg-jb-ochre" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </JBCard>
        ))}
      </div>
      <section className="mt-10 rounded-lg border border-jb-ink/12 bg-jb-warm p-6">
        <h2 className="text-2xl font-semibold text-jb-ink">Selected proof</h2>
        <dl className="mt-5 grid gap-4">
          {proofRows.map((row) => (
            <div className="grid gap-2 md:grid-cols-[0.32fr_0.68fr]" key={row.label}>
              <dt className="font-semibold text-jb-blue">{row.label}</dt>
              <dd className="leading-7 text-jb-ink/76">{row.proof}</dd>
            </div>
          ))}
        </dl>
      </section>
      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        <ResumeCTA />
        <ContactCTA />
      </div>
    </div>
  );
}
