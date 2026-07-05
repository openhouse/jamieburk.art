import type { Metadata } from "next";
import Link from "next/link";
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
      "HJE implementation and handoff systems",
      "FairRentNYC / NYC Artist Coalition campaign-memory infrastructure",
      "196 / Sunday Dinner onboarding and continuity systems"
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
      "Decision records"
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
      "Open-data workflows"
    ]
  }
];

const proofLinks = [
  { href: "/work/harry-j-epstein", label: "Harry J. Epstein Company" },
  { href: "/work/fair-rent-nyc", label: "FairRentNYC / CRS" },
  { href: "/work/callnyc", label: "CallNYC" },
  { href: "/lab/source-backed-team-memory", label: "Source-Backed Team Memory lab" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" }
] as const;

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
      <section className="mt-10 rounded-lg border border-jb-ink/12 bg-jb-paper p-5">
        <h2 className="text-2xl font-semibold text-jb-ink">Related proof</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {proofLinks.map((link) => (
            <Link
              className="rounded-lg border border-jb-blue/20 bg-jb-warm px-4 py-3 font-semibold text-jb-blue hover:border-jb-green hover:text-jb-green"
              href={link.href}
              key={link.href}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </section>
      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        <ResumeCTA />
        <ContactCTA />
      </div>
    </div>
  );
}
