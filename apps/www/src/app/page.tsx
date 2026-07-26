import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { CapabilityGrid } from "@/components/CapabilityGrid";
import { ContactCTA } from "@/components/ContactCTA";
import { Hero } from "@/components/Hero";
import { ProofStrip } from "@/components/ProofStrip";
import { WorkCard } from "@/components/WorkCard";
import { photographs, photoDisplayBoundary } from "@/data/photography";
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
      <section className="border-b border-jb-ink/12 bg-white">
        <div className="jb-frame grid gap-8 py-10 lg:grid-cols-[0.34fr_0.66fr]">
          <div className="jb-reading">
            <p className="jb-label text-sm text-jb-blue">Start here</p>
            <h2 className="mt-3 text-3xl font-bold text-jb-ink">
              A quick route through the work
            </h2>
            <p className="mt-4 leading-8 text-jb-ink/76">
              Begin with role fit, then move into the case studies and the
              source-backed record beneath them.
            </p>
          </div>
          <div className="divide-y divide-jb-ink/12 border-y border-jb-ink/12">
            {startHereLinks.map((item) => (
              <Link
                className="grid gap-1 py-4 hover:bg-jb-warm sm:grid-cols-[0.4fr_0.6fr] sm:gap-5 sm:px-3"
                href={item.href as Route}
                key={item.href}
              >
                <span className="font-semibold text-jb-blue">{item.label}</span>
                <span className="text-sm leading-6 text-jb-ink/72">{item.note}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <ProofStrip />
      <section className="jb-frame py-20">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="jb-reading">
            <p className="jb-label text-sm text-jb-blue">Selected systems</p>
            <h2 className="mt-3 text-3xl font-bold text-jb-ink">
              Proof across operating, civic, and community systems
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
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {featuredWork.map((item) => (
            <WorkCard item={item} key={item.slug} />
          ))}
        </div>
      </section>
      <section aria-labelledby="field-heading" className="bg-jb-graphite text-white">
        <div className="jb-frame grid gap-10 py-14 lg:grid-cols-[0.38fr_0.62fr] lg:items-end">
          <div className="max-w-md">
            <p className="jb-label text-sm text-jb-sky">From the working field</p>
            <h2 className="mt-3 text-4xl font-bold" id="field-heading">
              The system is a container people can inhabit
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/78">
              Across waterways, public meetings, cultural spaces, and digital
              tools, the recurring work is to make participation legible,
              resilient, and possible without scripting what people will do
              together.
            </p>
            <Link
              className="mt-7 inline-block font-semibold text-white underline decoration-jb-ochre decoration-2 underline-offset-4"
              href="/about"
            >
              Read the through line
            </Link>
          </div>
          <figure>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                alt={photographs.raftInFog.alt}
                fill
                sizes="(min-width: 1024px) 62vw, 100vw"
                src={photographs.raftInFog.src}
                style={{ objectFit: "cover", objectPosition: "50% 62%" }}
              />
            </div>
            <figcaption className="mt-3 text-sm leading-6 text-white/70">
              {photographs.raftInFog.caption} {photographs.raftInFog.credit}.
            </figcaption>
          </figure>
        </div>
      </section>
      <section aria-labelledby="sequence-heading" className="py-20">
        <div className="jb-frame mb-8 grid gap-4 md:grid-cols-[0.35fr_0.65fr] md:items-end">
          <div>
            <p className="jb-label text-sm text-jb-blue">Scenes of the work</p>
            <h2 className="mt-3 text-3xl font-bold text-jb-ink" id="sequence-heading">
              Listen. Build. Hand onward.
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-jb-ink/74">
            Photography makes the operational practice visible: rooms where
            people speak, project sites where material decisions meet, and
            gatherings where shared priorities take form.
          </p>
        </div>
        <div className="jb-photo-sequence">
          {[
            photographs.artistCoalitionListeningRoom,
            photographs.kcTownHallWork,
            photographs.sundayDinnerPreparation
          ].map((image) => (
            <figure key={image.src}>
              <Image
                alt={image.alt}
                fill
                sizes="(min-width: 1024px) 66vw, 100vw"
                src={image.src}
                style={{ objectPosition: image.objectPosition }}
              />
              <figcaption>
                {image.caption} {image.credit}.
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="jb-frame mt-5 text-sm leading-6 text-jb-ink/68">
          {photoDisplayBoundary}
        </p>
      </section>
      <CapabilityGrid />
      <section className="jb-frame grid gap-8 py-16 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="jb-label text-sm text-jb-blue">How I work</p>
          <h2 className="mt-3 text-3xl font-bold text-jb-ink">
            Clarify to Structure to Build to Document to Transfer
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
