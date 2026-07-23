import Link from "next/link";
import type { Metadata } from "next";
import type { Route } from "next";
import { ContactCTA } from "@/components/ContactCTA";
import { PhotoFigure } from "@/components/PhotoFigure";
import { photos } from "@/data/photography";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "About - Jamie Burkart",
  description:
    "About Jamie Burkart, a Brooklyn-based technical project manager and implementation lead.",
  path: "/about"
});

const lineages = [
  {
    title: "Harry J. Epstein Company",
    href: "/work/harry-j-epstein",
    status: "Current / 2012-Present",
    observed:
      "Customer language, product judgment, public voice, and internal operating habits.",
    model:
      "Requirements join product information, content, ordering, marketing, and customer follow-up as one operating workflow.",
    interface:
      "A maintained public storefront and the internal routines that support releases, merchandising, communication, and follow-up.",
    feedback:
      "Recurring customer and team questions, alongside bounded analytics, identify where product finding and operating steps need clarification.",
    handoff:
      "Incremental releases become reusable content patterns and clearer workflows the team can keep using.",
    evidence:
      "The public storefront is inspectable; customer data, internal analytics, and workflow diagrams remain protected."
  },
  {
    title: "NYC Artist Coalition / FairRentNYC",
    href: "/work/fair-rent-nyc",
    status: "Current / 2017-Present",
    observed:
      "Lived experience in cultural spaces, recurring meetings, public sources, open questions, and city and state actors.",
    model:
      "Source maps, question logs, provenance records, decision memory, and action tracking hold the relationships without flattening disagreement.",
    interface:
      "Campaign sites, town halls, hearings, practical sessions, and public action pathways built and used with many collaborators.",
    feedback:
      "Meetings and public use reveal missing context, changing language, unresolved questions, and the next useful action.",
    handoff:
      "Running minutes and reviewable decision trails let collaborators recover context and carry the work forward.",
    evidence:
      "Public campaign sites, reporting, testimony, handbills, and bounded documentation are inspectable; protected coalition context remains offline."
  },
  {
    title: "WOWList",
    href: "/work/wowlist",
    status: "Historical platform / 2010s",
    observed:
      "The language organizers already used for scenes, interests, places, and venues.",
    model:
      "Keyword communities represent overlapping interests without requiring one central editorial taxonomy.",
    interface:
      "Followable keyword communities, event publishing, digests, and embeddable calendars for distributed organizers.",
    feedback:
      "Organizer publishing and support needs showed where distribution, reuse, and low-cost operation mattered most.",
    handoff:
      "Those needs became reusable publishing and deployment patterns rather than dependence on one central calendar.",
    evidence:
      "A bounded database snapshot, public archives, support records, and an independent tutorial support the historical account."
  },
  {
    title: "Sunday Dinner and 196",
    href: "/work/196-sunday-dinner",
    status: "Current / 2010s-Present",
    observed:
      "Hospitality, trust, artist support, shared space, and the rhythms of returning.",
    model:
      "Repeatable invitation and participation operations hold arrival, access, hosting, facilitation, and follow-up together.",
    interface:
      "Invitations, hosting, onboarding, access handoffs, and facilitation that let people enter and shape a living practice.",
    feedback:
      "Recurring gatherings make practical needs around arrival, access, setup, hosting, and return visible over time.",
    handoff:
      "A governed 2023 residency handoff and 2025 operating sheet preserve repeatable steps while the practice remains active.",
    evidence:
      "Public-safe aggregate continuity supports the account; participant names, attendance, correspondence, and access details remain protected."
  }
];

export default function AboutPage() {
  return (
    <>
      <header className="border-b border-jb-ink/15 bg-jb-warm py-12">
        <div className="jb-frame grid gap-10 lg:grid-cols-[0.54fr_0.46fr] lg:items-center">
          <div className="jb-reading">
            <p className="jb-section-index">About</p>
            <h1 className="mt-3 text-5xl font-bold leading-none text-jb-ink">
              Jamie Burkart
            </h1>
            <p className="mt-6 text-2xl font-semibold leading-snug text-jb-green">
              Technical project manager, implementation lead, artist, and
              operational steward in Brooklyn.
            </p>
            <div className="mt-6 space-y-5 text-lg leading-8 text-jb-ink/78">
              <p>
                My work sits where the stakes are human and the operating
                structure is still forming: civic technology, small-business
                operations, public-facing tools, cultural infrastructure,
                coalition work, and knowledge systems.
              </p>
              <p>
                I surface the structure already emerging from the material,
                then help it become functional, resilient, and transferable.
              </p>
            </div>
          </div>
          <PhotoFigure
            imageClassName="aspect-[4/3]"
            photo={photos.cityPortrait}
            priority
            sizes="(min-width: 1100px) 46vw, 100vw"
          />
        </div>
      </header>

      <section className="jb-frame grid gap-10 py-16 lg:grid-cols-[0.62fr_0.38fr] lg:items-center">
        <div className="jb-reading">
          <p className="jb-section-index">The through line</p>
          <h2 className="mt-3 text-4xl font-bold leading-tight text-jb-ink">
            Systems people can inhabit
          </h2>
          <div className="mt-6 space-y-5 text-lg leading-8 text-jb-ink/78">
            <p>
              This practice began before I called it technical operations. In{" "}
              <Link
                className="font-semibold text-jb-blue hover:text-jb-green"
                href="https://www.goodtimes.sc/archives/metro-santa-cruz/06.28.06/open-house-0626.html"
              >
                Open House
              </Link>
              , a ten-day UCSC gallery experiment I initiated in 2006,
              participants collectively governed a space for making, living,
              negotiation, and many-perspective documentation.
            </p>
            <p>
              The same question continues through{" "}
              <Link className="font-semibold text-jb-blue hover:text-jb-green" href="/work/wowlist">
                WOWList
              </Link>
              ,{" "}
              <Link className="font-semibold text-jb-blue hover:text-jb-green" href="/work/196-sunday-dinner">
                Sunday Dinner and 196
              </Link>
              ,{" "}
              <Link className="font-semibold text-jb-blue hover:text-jb-green" href="/work/fair-rent-nyc">
                NYC Artist Coalition work
              </Link>
              , and{" "}
              <Link className="font-semibold text-jb-blue hover:text-jb-green" href="/lab/source-backed-team-memory">
                source-backed team memory
              </Link>
              : how can a structure help people recognize their relationships,
              participate, remember what happened, and continue the work?
              Across that lineage, the practice is artistic, civic, technical,
              and social.
            </p>
            <p>
              The practical sequence is recursive: observe relationships,
              model a system, prototype an interface, test it with people, and
              document enough for others to continue. Requirements,
              interfaces, and handoffs matter because people have to inhabit
              them.
            </p>
          </div>
        </div>
        <PhotoFigure
          imageClassName="aspect-[3/4]"
          photo={photos.waterfrontPortrait}
          sizes="(min-width: 1100px) 38vw, 100vw"
        />
      </section>

      <section className="jb-dark-photo-section border-y border-jb-ink/15 bg-jb-neutral py-16 text-white">
        <div className="jb-frame">
          <div className="grid gap-8 lg:grid-cols-[0.38fr_0.62fr]">
            <div>
              <p className="jb-section-index text-jb-orange">
                2007 / historical / collective river expedition
              </p>
              <h2 className="mt-3 text-4xl font-bold leading-tight text-white">
                Release yourself onto the water until it tastes of salt.
              </h2>
            </div>
            <div className="space-y-5 text-lg leading-8 text-white/78">
              <p>
                I originated and organized a reclaimed-material,
                bicycle-powered raft expedition with Libby Hendon and Laura
                Mattingly. Contemporary reporting documented us more than
                1,000 miles from Kansas City into Louisiana, with material
                improvisation, public encounters, interruption, adaptation,
                and continued travel shaping the work. An earlier{" "}
                <Link
                  className="font-semibold text-jb-orange hover:text-white"
                  href="https://www.thepitchkc.com/when-artists-turn-huck-finn/"
                >
                  Pitch report
                </Link>{" "}
                records the raft&apos;s reclaimed construction and early journey.
              </p>
              <p>
                I understood my role as tending a project container people
                could enter, change, and leave. The archive treats the route,
                full crew chronology, and collective labor as continuing
                research, not as a solo achievement or a finished impact claim.
              </p>
            </div>
          </div>
          <div aria-label="Arrival, release, and public geography on the river" className="mt-10 space-y-7">
            <PhotoFigure
              imageClassName="aspect-[16/9]"
              photo={photos.raftArrival}
              sizes="(min-width: 1100px) 1100px, 100vw"
            />
            <div className="grid gap-7 md:grid-cols-[0.38fr_0.62fr] md:items-start">
              <PhotoFigure
                imageClassName="aspect-[3/4]"
                photo={photos.raftFog}
                sizes="(min-width: 1100px) 38vw, 100vw"
              />
              <PhotoFigure
                imageClassName="aspect-[4/3]"
                photo={photos.raftDeltaQueen}
                sizes="(min-width: 1100px) 62vw, 100vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="jb-frame py-16">
        <div className="grid gap-10 lg:grid-cols-[0.3fr_0.7fr]">
          <div>
            <p className="jb-section-index">Practice across settings</p>
            <h2 className="mt-3 text-3xl font-bold text-jb-ink">
              Observe / model / prototype / test / document
            </h2>
          </div>
          <ol className="border-b border-jb-ink/20">
            {lineages.map((lineage, index) => (
              <li className="border-t border-jb-ink/20 py-6" key={lineage.title}>
                <div className="grid gap-3 sm:grid-cols-[2.5rem_0.35fr_0.65fr]">
                  <span className="jb-meta-label text-xs text-jb-red">0{index + 1}</span>
                  <h3 className="text-xl font-semibold">
                    <Link
                      className="text-jb-blue hover:text-jb-green"
                      href={lineage.href as Route}
                    >
                      {lineage.title}
                    </Link>
                  </h3>
                  <div className="space-y-3 leading-7 text-jb-ink/74">
                    <p>
                      <strong className="text-jb-ink">Status:</strong>{" "}
                      {lineage.status}
                    </p>
                    <p>
                      <strong className="text-jb-ink">Observed:</strong>{" "}
                      {lineage.observed}
                    </p>
                    <p>
                      <strong className="text-jb-ink">Modeled:</strong>{" "}
                      {lineage.model}
                    </p>
                    <p>
                      <strong className="text-jb-ink">Interface:</strong>{" "}
                      {lineage.interface}
                    </p>
                    <p>
                      <strong className="text-jb-ink">Use and feedback:</strong>{" "}
                      {lineage.feedback}
                    </p>
                    <p>
                      <strong className="text-jb-ink">Revision and handoff:</strong>{" "}
                      {lineage.handoff}
                    </p>
                    <p>
                      <strong className="text-jb-ink">Evidence boundary:</strong>{" "}
                      {lineage.evidence}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-jb-ink/15 bg-jb-warm py-14">
        <div className="jb-frame grid gap-8 lg:grid-cols-[0.58fr_0.42fr] lg:items-center">
          <p className="text-xl leading-9 text-jb-ink/78">
            I value public benefit, accessibility, source-backed memory,
            careful claims, collective credit, consent, privacy, repair, and
            documentation that helps future collaborators safely continue the
            work.
          </p>
          <ContactCTA />
        </div>
      </section>
    </>
  );
}
