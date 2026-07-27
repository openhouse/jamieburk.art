import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ContactCTA } from "@/components/ContactCTA";
import {
  getPhotoOccurrenceId,
  photographs,
  photoDisplayBoundary
} from "@/data/photography";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "About - Jamie Burkart",
  description:
    "About Jamie Burkart, a Brooklyn-based technical project manager and implementation lead.",
  path: "/about"
});

export default function AboutPage() {
  return (
    <div className="jb-frame py-12">
      <div className="grid gap-10 lg:grid-cols-[0.52fr_0.48fr] lg:items-center">
        <div>
          <p className="jb-label text-sm text-jb-blue">Practice and approach</p>
          <h1 className="mt-3 text-5xl font-bold text-jb-ink">About</h1>
          <div className="mt-8 space-y-6 text-xl leading-9 text-jb-ink/78">
            <p>
              I am Jamie Burkart, a technical project manager and implementation
              lead based in Brooklyn.
            </p>
            <p>
              I work where human stakes are high and the operating structure is
              still forming: civic technology, small-business operations,
              cultural infrastructure, coalition work, and knowledge systems.
            </p>
            <p>
              Across projects, I turn ambiguity into requirements, workflows,
              documentation, implementation, and handoffs people can continue.
            </p>
          </div>
        </div>
        <figure
          data-photo-occurrence={getPhotoOccurrenceId(
            photographs.sundayDinnerPreparation,
            "about.method"
          )}
        >
          <div className="relative aspect-[3/4] overflow-hidden bg-jb-warm">
            <Image
              alt={photographs.sundayDinnerPreparation.alt}
              fill
              priority
              sizes="(min-width: 1024px) 48vw, 100vw"
              src={photographs.sundayDinnerPreparation.src}
              style={{
                objectFit: "cover",
                objectPosition: photographs.sundayDinnerPreparation.objectPosition
              }}
            />
          </div>
          <figcaption className="mt-3 text-sm leading-6 text-jb-ink/68">
            {photographs.sundayDinnerPreparation.caption}{" "}
            {photographs.sundayDinnerPreparation.credit}.
          </figcaption>
        </figure>
      </div>
      <div className="jb-reading">
        <p className="mt-8 border-l-4 border-jb-ochre bg-jb-warm px-4 py-3 text-sm leading-6 text-jb-ink/72">
          <strong className="text-jb-ink">Image boundary:</strong>{" "}
          {photoDisplayBoundary}
        </p>
        <section className="mt-12 border-t border-jb-blue/20 pt-8">
          <p className="text-sm font-semibold uppercase text-jb-blue">
            The through line
          </p>
          <h2 className="mt-3 text-3xl font-bold text-jb-ink">
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
          <div className="mt-8 divide-y divide-jb-ink/12 border-y border-jb-ink/12">
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
                  <strong className="text-jb-ink">Interface and use:</strong>{" "}
                  a maintained storefront joining product discovery, content,
                  marketing, ordering, and customer follow-up.
                </p>
                <p>
                  <strong className="text-jb-ink">
                    Learning and continuity:
                  </strong>{" "}
                  recurring operational questions and bounded analytics guided
                  incremental releases, reusable content patterns, and clearer
                  workflows for the team.
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
                  <strong className="text-jb-ink">Interface and use:</strong>{" "}
                  invitations, hosting, onboarding, access handoffs, and
                  facilitation that let people enter and shape a living practice.
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
        </section>
        <div className="mt-10 border-l-4 border-jb-blue bg-jb-sky/25 p-5">
          <p className="leading-8 text-jb-ink/78">
            I value public benefit, accessibility, source-backed memory, careful
            claims, collective credit, consent, privacy, repair, and
            documentation that helps future collaborators safely continue the
            work.
          </p>
        </div>
      </div>
      <div className="mt-12 max-w-3xl">
        <ContactCTA />
      </div>
    </div>
  );
}
