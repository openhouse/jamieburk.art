import Link from "next/link";
import type { Route } from "next";
import { CapabilityGrid } from "@/components/CapabilityGrid";
import { ContactCTA } from "@/components/ContactCTA";
import { FieldPhoto } from "@/components/FieldPhoto";
import { Hero } from "@/components/Hero";
import { ProofStrip } from "@/components/ProofStrip";
import { WorkCard } from "@/components/WorkCard";
import { portfolioPhotos } from "@/data/photography";
import { featuredWork } from "@/data/work";

const transformations = [
  ["Stakeholder context in motion", "shared decision records"],
  ["Public data awaiting translation", "resident-facing guidance"],
  ["Long-running operations", "maintainable workflows"],
  ["Recurring gatherings", "participation infrastructure"]
];

const startHereLinks = [
  {
    href: "/work/technical-operations",
    label: "Technical Operations & Implementation",
    note: "Role-fit proof for public-sector technical operations, product operations, implementation, and delivery coordination."
  },
  {
    href: "/work/harry-j-epstein",
    label: "Harry J. Epstein Company",
    note: "Long-running e-commerce, analytics, content, marketing, and operations modernization."
  },
  {
    href: "/work/fair-rent-nyc",
    label: "NYC Artist Coalition / FairRentNYC",
    note: "Coalition operations, campaign memory, source maps, public events, and cultural-space advocacy."
  },
  {
    href: "/work/callnyc",
    label: "CallNYC.org",
    note: "Civic open data translated into issue pathways and resident-facing guidance."
  },
  {
    href: "/resume",
    label: "Resume",
    note: "Application-ready PDF and a concise account of roles, capabilities, and outcomes."
  }
];

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="jb-frame py-16">
        <div className="grid gap-10 lg:grid-cols-[0.34fr_0.66fr]">
          <div className="jb-reading">
            <p className="jb-section-label">Start here</p>
            <h2 className="mt-3 text-4xl leading-tight text-jb-ink">
              A clear route through the work
            </h2>
            <p className="mt-4 leading-8 text-jb-ink/76">
              For hiring managers, referrers, civic-tech peers, and
              collaborators: begin with the operating role, then follow the
              proof most relevant to you.
            </p>
          </div>
          <div>
            {startHereLinks.map((item) => (
              <Link
                className="jb-index-link group sm:grid-cols-[0.42fr_0.58fr] sm:items-baseline"
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
            <p className="jb-section-label">Selected systems</p>
            <h2 className="mt-3 text-4xl leading-tight text-jb-ink">
              Proof across operating, civic, and community systems
            </h2>
            <p className="mt-4 leading-8 text-jb-ink/76">
              The settings differ. The recurring action is to listen, make the
              work legible, build what people can use, and leave continuity
              behind.
            </p>
          </div>
          <Link
            className="border-b border-jb-blue font-semibold text-jb-blue hover:border-jb-green hover:text-jb-green"
            href="/work"
          >
            View all work
          </Link>
        </div>
        <div className="mt-8">
          {featuredWork.map((item) => (
            <WorkCard item={item} key={item.slug} />
          ))}
        </div>
      </section>

      <section className="border-y border-jb-ink/12 bg-jb-warm py-16">
        <div className="jb-frame">
          <div className="grid gap-8 lg:grid-cols-[0.38fr_0.62fr] lg:items-end">
            <div>
              <p className="jb-section-label">In the field</p>
              <h2 className="mt-3 text-4xl leading-tight text-jb-ink">
                Operating structure has a material life
              </h2>
            </div>
            <p className="max-w-3xl text-xl leading-9 text-jb-ink/76">
              A building, a neighborhood route, a measured stack of paper:
              project operations happen in places, with tools, over time. The
              structure matters because people have to inhabit it.
            </p>
          </div>
          <div className="jb-photo-sequence mt-10">
            <FieldPhoto
              crop="aspect-[16/9] object-cover"
              photoId="photo.kc-town-hall-before"
              placementId="placement.home.sequence.kc-town-hall-before.layout-b"
              photo={portfolioPhotos.kcTownHallBefore}
              route="/"
              sizes="(max-width: 1280px) 100vw, 1240px"
            />
            <FieldPhoto
              crop="aspect-[4/3] object-cover"
              photoId="photo.tired-of-tires-load"
              placementId="placement.home.sequence.tired-of-tires-load.layout-b"
              photo={portfolioPhotos.tiredOfTiresLoad}
              route="/"
              sizes="(max-width: 768px) 100vw, 58vw"
            />
            <FieldPhoto
              crop="aspect-[4/3] object-cover"
              photoId="photo.paper-trimming"
              placementId="placement.home.sequence.paper-trimming.layout-b"
              photo={portfolioPhotos.paperTrimming}
              route="/"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>
        </div>
      </section>

      <CapabilityGrid />

      <section className="jb-frame py-16">
        <div className="grid gap-10 lg:grid-cols-[0.4fr_0.6fr]">
          <div className="jb-reading">
            <p className="jb-section-label">Operating motif</p>
            <h2 className="mt-3 text-4xl leading-tight text-jb-ink">
              Structure grows from the material
            </h2>
            <p className="mt-4 leading-8 text-jb-ink/76">
              Clarify what is known, protect what should stay private, and
              leave behind material people can act on.
            </p>
          </div>
          <ol className="border-t border-jb-ink/20">
            {transformations.map(([from, to], index) => (
              <li
                className="grid gap-2 border-b border-jb-ink/20 py-5 sm:grid-cols-[3rem_1fr_auto_1fr] sm:items-baseline"
                key={from}
              >
                <span className="font-label text-sm text-jb-blue">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="font-semibold text-jb-ink">{from}</p>
                <span className="hidden text-jb-blue sm:block">becomes</span>
                <p className="font-semibold text-jb-green">{to}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="jb-frame grid gap-8 border-t border-jb-ink/12 py-16 lg:grid-cols-[0.4fr_0.6fr]">
        <div>
          <p className="jb-section-label">How I work</p>
          <h2 className="mt-3 text-4xl leading-tight text-jb-ink">
            Listen. Map. Build. Document. Transfer.
          </h2>
        </div>
        <div className="space-y-7">
          <p className="text-xl leading-9 text-jb-ink/78">
            I usually enter when the work is important and its operating
            structure is still forming. I listen across stakeholders, map what
            is known and unknown, create the workflows or documentation the
            team needs, support launch and adoption, and leave materials that
            make the work easier to maintain.
          </p>
          <ContactCTA />
        </div>
      </section>
    </>
  );
}
