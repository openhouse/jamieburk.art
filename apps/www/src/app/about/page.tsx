import Link from "next/link";
import type { Metadata } from "next";
import { ContactCTA } from "@/components/ContactCTA";
import { FieldPhoto } from "@/components/FieldPhoto";
import { portfolioPhotos } from "@/data/photography";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "About - Jamie Burkart",
  description:
    "About Jamie Burkart, a Brooklyn-based technical project manager and implementation lead.",
  path: "/about"
});

export default function AboutPage() {
  return (
    <div className="jb-frame py-14">
      <div className="grid gap-10 lg:grid-cols-[0.48fr_0.52fr] lg:items-end">
        <div>
          <p className="jb-section-label">Practice and approach</p>
          <h1 className="mt-3 text-5xl leading-none text-jb-ink sm:text-6xl">
            About
          </h1>
          <div className="mt-8 space-y-6 text-xl leading-9 text-jb-ink/78">
            <p>
              I am Jamie Burkart, a technical project manager and implementation
              lead based in Brooklyn.
            </p>
            <p>
              My work sits where the stakes are human and the operating structure
              is still forming: civic technology, small-business operations,
              public-facing tools, cultural infrastructure, coalition work, and
              knowledge systems.
            </p>
            <p>
              Across projects, I tend to do the same kind of work: clarify
              ambiguous goals, translate between technical and nontechnical
              stakeholders, map workflows, build documentation, create usable
              interfaces, coordinate implementation, and leave behind handoffs
              people can use after the meeting or launch is over.
            </p>
            <p>
              I am currently focused on technical project management, product
              operations, implementation, business analysis, civic/govtech
              delivery, and source-backed knowledge systems.
            </p>
          </div>
        </div>
        <FieldPhoto
          imageClassName="aspect-[4/3]"
          photo={portfolioPhotos.raftRiverboat}
          priority
          sizes="(max-width: 1024px) 100vw, 52vw"
        />
      </div>
      <div className="mt-16 max-w-4xl">
        <section className="mt-12 border-t border-jb-blue/20 pt-8">
          <p className="jb-section-label">The through line</p>
          <h2 className="mt-3 text-4xl leading-tight text-jb-ink">
            Systems people can inhabit
          </h2>
          <div className="mt-5 space-y-5 text-lg leading-8 text-jb-ink/78">
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
              <Link
                className="font-semibold text-jb-blue hover:text-jb-green"
                href="/work/wowlist"
              >
                WOWList
              </Link>
              ,{" "}
              <Link
                className="font-semibold text-jb-blue hover:text-jb-green"
                href="/work/196-sunday-dinner"
              >
                Sunday Dinner and 196
              </Link>
              ,{" "}
              <Link
                className="font-semibold text-jb-blue hover:text-jb-green"
                href="/work/fair-rent-nyc"
              >
                NYC Artist Coalition work
              </Link>
              , and{" "}
              <Link
                className="font-semibold text-jb-blue hover:text-jb-green"
                href="/lab/source-backed-team-memory"
              >
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
              document enough for others to continue. Requirements, interfaces,
              and handoffs matter because people have to inhabit them.
            </p>
          </div>
          <div className="mt-8 border-t border-jb-ink/12 pt-5">
            <p className="jb-section-label">Three current implementation loops</p>
            <p className="mt-3 max-w-3xl leading-7 text-jb-ink/72">
              Each begins with relationships, becomes an interface people can
              use, changes through use, and leaves a pattern others can continue.
            </p>
          </div>
          <div className="mt-5 divide-y divide-jb-ink/12 border-y border-jb-ink/12">
            <article className="py-6">
              <h3 className="text-xl font-semibold text-jb-ink">
                <Link
                  className="text-jb-blue hover:text-jb-green"
                  href="/work/harry-j-epstein"
                >
                  Harry J. Epstein Company
                </Link>
              </h3>
              <div className="mt-3 space-y-2 leading-7 text-jb-ink/76">
                <p>
                  <strong className="text-jb-ink">Relationships:</strong>{" "}
                  customer language, product judgment, public voice, and
                  internal operating habits.
                </p>
                <p>
                  <strong className="text-jb-ink">Model:</strong>{" "}
                  product knowledge, discovery, ordering, content, marketing,
                  and follow-up treated as one operating journey.
                </p>
                <p>
                  <strong className="text-jb-ink">Interface and use:</strong>{" "}
                  a maintained storefront joining product discovery, content,
                  marketing, ordering, and customer follow-up.
                </p>
                <p>
                  <strong className="text-jb-ink">
                    Learning and continuity:
                  </strong>{" "}
                  recurring operational questions and bounded analytics guided
                  incremental releases; reusable content and operating patterns
                  gave the team clearer workflows to carry forward.
                </p>
              </div>
            </article>
            <article className="py-6">
              <h3 className="text-xl font-semibold text-jb-ink">
                <Link
                  className="text-jb-blue hover:text-jb-green"
                  href="/work/fair-rent-nyc"
                >
                  NYC Artist Coalition and FairRentNYC
                </Link>
              </h3>
              <div className="mt-3 space-y-2 leading-7 text-jb-ink/76">
                <p>
                  <strong className="text-jb-ink">Relationships:</strong>{" "}
                  lived experience in cultural spaces, recurring meetings,
                  public sources, open questions, and city and state actors.
                </p>
                <p>
                  <strong className="text-jb-ink">Model:</strong>{" "}
                  a coalition memory connecting testimony, policy lineage,
                  public evidence, decisions, and next actions.
                </p>
                <p>
                  <strong className="text-jb-ink">Interface and use:</strong>{" "}
                  campaign sites, town halls, hearings, practical sessions, and
                  public action pathways built and used with many collaborators.
                </p>
                <p>
                  <strong className="text-jb-ink">
                    Learning and continuity:
                  </strong>{" "}
                  running minutes, source maps, question logs, and action
                  trackers let collaborators recover context, review decisions,
                  and carry the work forward.
                </p>
              </div>
            </article>
            <article className="py-6">
              <h3 className="text-xl font-semibold text-jb-ink">
                <Link
                  className="text-jb-blue hover:text-jb-green"
                  href="/work/196-sunday-dinner"
                >
                  Sunday Dinner and 196
                </Link>
              </h3>
              <div className="mt-3 space-y-2 leading-7 text-jb-ink/76">
                <p>
                  <strong className="text-jb-ink">Relationships:</strong>{" "}
                  hospitality, trust, artist support, shared space, and the
                  rhythms of returning.
                </p>
                <p>
                  <strong className="text-jb-ink">Model:</strong>{" "}
                  recurring invitations, hosting, onboarding, facilitation, and
                  access handoffs as one care-centered operating rhythm.
                </p>
                <p>
                  <strong className="text-jb-ink">Interface and use:</strong>{" "}
                  gatherings and artist residencies in which people enter,
                  work, return, and shape a living practice.
                </p>
                <p>
                  <strong className="text-jb-ink">
                    Learning and continuity:
                  </strong>{" "}
                  repeatable rhythms supported continuation while consent kept
                  guest histories, private correspondence, and unapproved images
                  outside the public record.
                </p>
              </div>
            </article>
          </div>
          <div className="mt-10">
            <p className="jb-section-label">Historical foundation</p>
            <article className="py-6">
              <h3 className="text-xl font-semibold text-jb-ink">
                <Link
                  className="text-jb-blue hover:text-jb-green"
                  href="/work/wowlist"
                >
                  WOWList
                </Link>
              </h3>
              <div className="mt-3 space-y-2 leading-7 text-jb-ink/76">
                <p>
                  <strong className="text-jb-ink">Relationships:</strong>{" "}
                  the language organizers already used for scenes, interests,
                  places, and venues.
                </p>
                <p>
                  <strong className="text-jb-ink">Interface and use:</strong>{" "}
                  followable keyword communities, event publishing, digests,
                  and embeddable calendars for distributed organizers.
                </p>
                <p>
                  <strong className="text-jb-ink">
                    Learning and continuity:
                  </strong>{" "}
                  organizer distribution needs became reusable publishing and
                  low-cost deployment patterns rather than one central calendar.
                </p>
              </div>
            </article>
          </div>
        </section>
        <div className="mt-10 rounded border border-jb-blue/25 bg-jb-sky/15 p-5">
          <p className="leading-8 text-jb-ink/78">
            I value public benefit, accessibility, source-backed memory, careful
            claims, collective credit, consent, privacy, repair, and
            documentation that helps future collaborators safely continue the
            work.
          </p>
        </div>
      </div>
      <div className="mt-12 max-w-4xl">
        <ContactCTA />
      </div>
    </div>
  );
}
