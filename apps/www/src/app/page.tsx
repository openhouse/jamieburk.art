import Link from "next/link";
import type { Route } from "next";
import { CapabilityGrid } from "@/components/CapabilityGrid";
import { ContactCTA } from "@/components/ContactCTA";
import { FieldSystemEvidence } from "@/components/FieldSystemEvidence";
import { Hero } from "@/components/Hero";
import { ProofStrip } from "@/components/ProofStrip";
import { WorkCard } from "@/components/WorkCard";
import { featuredWork } from "@/data/work";

const startHereLinks = [
  {
    href: "/work/technical-operations",
    label: "Technical Operations & Implementation",
    note: "The fastest role-fit proof surface for public-sector technical operations, product operations, implementation, and delivery coordination."
  },
  {
    href: "/work",
    label: "Selected work",
    note: "Six case studies across current civic delivery, sustained operations, public-facing products, implementation, and community systems."
  },
  {
    href: "/resume",
    label: "Resume",
    note: "PDF for applications and hiring workflows."
  }
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <section className="jb-frame py-16">
        <div className="grid gap-10 lg:grid-cols-[0.36fr_0.64fr]">
          <div className="jb-reading">
            <p className="jb-section-label">Start here</p>
            <h2 className="mt-3 text-4xl leading-tight text-jb-ink">
              Quick path through the portfolio
            </h2>
            <p className="mt-4 leading-8 text-jb-ink/76">
              New to my work? These pages give the clearest route through the
              site for hiring managers, referrers, civic-tech peers, and
              collaborators.
            </p>
          </div>
          <div>
            {startHereLinks.map((item) => (
              <Link
                className="jb-index-link group hover:text-jb-blue sm:grid-cols-[0.42fr_0.58fr] sm:items-baseline"
                href={item.href as Route}
                key={item.href}
              >
                <span className="text-lg font-semibold text-jb-blue group-hover:text-jb-green">
                  {item.label}
                </span>
                <span className="block text-sm leading-6 text-jb-ink/70">
                  {item.note}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <ProofStrip />
      <CapabilityGrid />
      <section className="jb-frame py-16">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="jb-reading">
            <p className="jb-section-label">Selected systems</p>
            <h2 className="mt-3 text-4xl leading-tight text-jb-ink">
              Proof across operating, civic, and community systems
            </h2>
            <p className="mt-4 leading-8 text-jb-ink/76">
              These projects show a recurring pattern: emerging, high-context
              work becoming usable systems, public-facing tools,
              documentation, decision trails, and durable handoffs.
            </p>
          </div>
          <Link className="font-semibold text-jb-blue hover:text-jb-green" href="/work">
            View all work
          </Link>
        </div>
        <div className="mt-8">
          {featuredWork.map((item) => (
            <WorkCard item={item} key={item.slug} />
          ))}
        </div>
      </section>
      <FieldSystemEvidence variant="home" />
      <section className="jb-frame grid gap-8 py-16 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="jb-section-label">How I work</p>
          <h2 className="mt-3 text-4xl leading-tight text-jb-ink">
            Listen. Map. Build. Document. Transfer.
          </h2>
        </div>
        <div className="space-y-7">
          <p className="text-xl leading-9 text-jb-ink/78">
            I usually enter when the work is important but loosely defined. I
            listen across stakeholders, map what is known and unknown, create
            the workflows or documentation the team needs, support launch or
            adoption, and leave behind materials that make the work easier to
            maintain.
          </p>
          <ContactCTA />
        </div>
      </section>
    </>
  );
}
