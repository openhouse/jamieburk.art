import Link from "next/link";
import type { Route } from "next";
import { CapabilityGrid } from "@/components/CapabilityGrid";
import { ContactCTA } from "@/components/ContactCTA";
import { Hero } from "@/components/Hero";
import { ProofStrip } from "@/components/ProofStrip";
import { WorkCard } from "@/components/WorkCard";
import { featuredWork } from "@/data/work";

const startHereLinks = [
  {
    href: "/work/technical-operations",
    label: "Assess role fit",
    note: "The fastest route through technical project management, product operations, implementation, and public-sector delivery evidence."
  },
  {
    href: "/work",
    label: "Inspect the work",
    note: "Full case studies across commerce, civic data, advocacy, neighborhood service, community publishing, and artist support."
  },
  {
    href: "/resume",
    label: "Review the current resume",
    note: "The public resume maintained for current applications and hiring conversations."
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
              Choose what you need to see
            </h2>
            <p className="mt-4 leading-8 text-jb-ink/76">
              Each route answers a different hiring question. If you have only
              a few minutes, begin with the one that matters now.
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
      <section className="jb-frame py-16">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="jb-reading">
            <p className="jb-section-label">Selected work</p>
            <h2 className="mt-3 text-4xl leading-tight text-jb-ink">
              Six projects, one operating practice
            </h2>
            <p className="mt-4 leading-8 text-jb-ink/76">
              The settings differ: coalition advocacy, civic data, commerce,
              neighborhood service, community publishing, and artist support.
              Each case study makes my responsibility, the team context, and
              what became usable easier to inspect.
            </p>
          </div>
          <Link className="font-semibold text-jb-blue hover:text-jb-green" href="/work">
            View all work
          </Link>
        </div>
        <div className="mt-8">
          {featuredWork.map((item) => (
            <WorkCard compact item={item} key={item.slug} />
          ))}
        </div>
      </section>
      <CapabilityGrid />
      <section className="jb-frame grid gap-8 py-16 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="jb-section-label">How I work</p>
          <h2 className="mt-3 text-4xl leading-tight text-jb-ink">
            Listen. Map. Build. Document. Transfer.
          </h2>
        </div>
        <div className="space-y-7">
          <p className="text-xl leading-9 text-jb-ink/78">
            The work begins by finding the decision the team needs to make. I
            make responsibilities, dependencies, open questions, and source
            context visible; build the smallest useful workflow or tool;
            support implementation; and document the handoff so the work can
            continue.
          </p>
          <ContactCTA />
        </div>
      </section>
    </>
  );
}
