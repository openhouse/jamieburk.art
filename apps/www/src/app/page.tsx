import Link from "next/link";
import type { Route } from "next";
import { CapabilityGrid } from "@/components/CapabilityGrid";
import { ContactCTA } from "@/components/ContactCTA";
import { Hero } from "@/components/Hero";
import { PhotoFigure } from "@/components/PhotoFigure";
import { ProofStrip } from "@/components/ProofStrip";
import { WorkCard } from "@/components/WorkCard";
import { photos } from "@/data/photography";
import { featuredWork } from "@/data/work";

const startHereLinks = [
  {
    href: "/work/technical-operations",
    label: "Technical Operations & Implementation",
    note: "The fastest role-fit proof surface for public-sector technical operations, product operations, implementation, and delivery coordination."
  },
  {
    href: "/work/harry-j-epstein",
    label: "Harry J. Epstein Company",
    note: "Legacy e-commerce, analytics, content, marketing, and operations modernization."
  },
  {
    href: "/work/fair-rent-nyc",
    label: "FairRentNYC / Commercial Rent Stabilization",
    note: "Campaign memory, source maps, public-data framing, and coalition operations."
  },
  {
    href: "/work/callnyc",
    label: "CallNYC.org",
    note: "Civic open data translated into resident-facing guidance."
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
      <section className="jb-frame py-14 md:py-18">
        <div className="grid gap-10 lg:grid-cols-[0.42fr_0.58fr]">
          <div>
            <p className="jb-eyebrow text-jb-blue">Start here</p>
            <h2 className="mt-3 max-w-lg text-3xl font-bold text-jb-ink">
              A quick path through the work
            </h2>
            <p className="mt-4 max-w-xl leading-8 text-jb-ink/76">
              For hiring managers and collaborators: begin with role fit, then
              follow the projects into the fuller practice.
            </p>
          </div>
          <div className="border-t border-jb-ink/18">
            {startHereLinks.map((item) => (
              <Link
                className="group grid gap-2 border-b border-jb-ink/14 py-4 sm:grid-cols-[0.42fr_0.58fr]"
                href={item.href as Route}
                key={item.href}
              >
                <span className="font-semibold text-jb-blue group-hover:text-jb-green">
                  {item.label}
                </span>
                <span className="text-sm leading-6 text-jb-ink/70">
                  {item.note}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <ProofStrip />
      <section className="jb-image-text-band">
        <PhotoFigure
          className="jb-image-text-band-photo"
          photo={photos.dclaListeningRoom}
          sizes="(min-width: 1024px) 60vw, 100vw"
        />
        <div className="jb-image-text-band-copy">
          <p className="jb-eyebrow text-jb-blue">Participation infrastructure</p>
          <h2 className="mt-3 text-3xl font-bold text-jb-ink">
            Listening is an operating system
          </h2>
          <p className="mt-5 text-xl leading-8 text-jb-ink/76">
            The work often begins before a requirement exists. A room, a meal,
            a public tool, or a recurring meeting can make it possible for
            people to name what matters and recognize a coherence they can act on.
          </p>
        </div>
      </section>
      <CapabilityGrid />
      <section className="jb-frame border-t border-jb-ink/16 py-16">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="jb-reading">
            <p className="jb-eyebrow text-jb-blue">Selected systems</p>
            <h2 className="mt-3 text-3xl font-bold text-jb-ink">
              Work across operating, civic, and community systems
            </h2>
            <p className="mt-4 leading-8 text-jb-ink/76">
              These projects show a recurring pattern: ambiguous, high-context
              situations becoming usable systems, public-facing tools,
              documentation, decision trails, and durable handoffs.
            </p>
          </div>
          <Link className="font-semibold text-jb-blue hover:text-jb-green" href="/work">
            View all work
          </Link>
        </div>
        <div className="mt-8 border-t border-jb-ink/18">
          {featuredWork.map((item) => (
            <WorkCard item={item} key={item.slug} />
          ))}
        </div>
      </section>
      <section className="jb-material-band">
        <div className="jb-frame grid gap-8 lg:grid-cols-[0.62fr_0.38fr] lg:items-end">
          <PhotoFigure photo={photos.screenPrinting} sizes="(min-width: 1024px) 62vw, 100vw" />
          <div className="pb-2">
            <p className="jb-eyebrow text-jb-ochre">Operational production</p>
            <h2 className="mt-3 text-3xl font-bold text-white">
              Care for the container is part of the work
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/78">
              Requirements and runbooks matter. So do the shirts, maps, meals,
              invitations, rooms, and small acts of maintenance that let people
              enter a project and make it their own.
            </p>
          </div>
        </div>
      </section>
      <section className="jb-frame grid gap-8 py-16 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="jb-eyebrow text-jb-blue">How I work</p>
          <h2 className="mt-3 text-3xl font-bold text-jb-ink">
            Clarify / structure / build / document / transfer
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
