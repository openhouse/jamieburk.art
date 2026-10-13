import Link from "next/link";
import type { Metadata } from "next";
import { Claim } from "@/components/citations/Claim";
import { Cite } from "@/components/citations/Cite";
import { References } from "@/components/citations/References";
import { ContactCTA } from "@/components/ContactCTA";
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
      <div className="grid gap-8 lg:grid-cols-[0.32fr_0.68fr]">
        <div>
          <p className="jb-section-label">Practice and approach</p>
          <h1 className="mt-3 text-6xl leading-none text-jb-ink">About</h1>
        </div>
        <div className="max-w-3xl space-y-6 text-xl leading-9 text-jb-ink/78">
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
            emerging goals, translate between technical and nontechnical
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

      <div className="max-w-4xl">
        <section className="mt-16 border-t border-jb-blue/25 pt-8">
          <p className="jb-section-label">The through line</p>
          <h2 className="mt-3 text-4xl leading-tight text-jb-ink">
            Systems people can inhabit
          </h2>
          <div className="mt-5 space-y-5 text-lg leading-8 text-jb-ink/78">
            <Claim
              as="p"
              claimId="CLM-OPEN-HOUSE-PARTICIPATORY-GALLERY"
              projection="archive-note"
              surface="/about"
              pageId="about"
              occurrenceId="open-house-participatory-gallery"
            />
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
                Knowledge Wiki Graphs
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
          <div className="mt-8 border-y border-jb-ink/12 py-4">
            <p className="jb-section-label">Three documented participation systems</p>
            <p className="mt-2 max-w-3xl leading-7 text-jb-ink/72">
              These examples connect a need, a working model, a public interface,
              collective use, and a way to continue. Their evidence differs:
              product support, an organizing sequence, and a delivered service.
              None is presented as a formal user study or proof that a particular
              comment caused a software release.
            </p>
          </div>
          <div className="mt-8 divide-y divide-jb-ink/12 border-y border-jb-ink/12">
            <article className="py-6">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="text-xl font-semibold text-jb-ink">
                  <Link
                    className="text-jb-blue hover:text-jb-green"
                    href="/work/wowlist"
                  >
                    WOWList: from shared calendars to organizer support
                  </Link>
                </h3>
              </div>
              <div className="mt-3 space-y-2 leading-7 text-jb-ink/76">
                <p>
                  <strong className="text-jb-ink">Relationships:</strong>{" "}
                  calendars made with Sunday Dinner connected people through
                  shared scenes, interests, and places. Richard Caceres and I
                  co-founded and co-built WOWList around that organizing practice.
                </p>
                <p>
                  <strong className="text-jb-ink">Model:</strong>{" "}
                  editable event text → keyword communities → followed lists →
                  event distribution. This is a reconstruction of the documented
                  product model, not an original interface screenshot.
                </p>
                <p>
                  <strong className="text-jb-ink">Interface and use:</strong>{" "}
                  instead of a complex event form, collaborators could work with
                  natural-language event text. Public support records document
                  publishing, profiles, followed lists, and weekly email.
                  <Cite pageId="about" occurrenceId="wowlist-product-model" />
                </p>
                <p>
                  <strong className="text-jb-ink">
                    Learning and continuity:
                  </strong>{" "}
                  support exchanges made joining and publishing explainable;
                  an independent organizer tutorial and the SBDIY calendar route
                  show use beyond the founding team. These are inspectable
                  onboarding and continuation records, not retention metrics or
                  evidence of current availability.
                  <Cite pageId="about" occurrenceId="wowlist-organizer-support" />
                </p>
              </div>
            </article>
            <article className="py-6">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="text-xl font-semibold text-jb-ink">
                  <Link
                    className="text-jb-blue hover:text-jb-green"
                    href="/work/fair-rent-nyc"
                  >
                    NYC Artist Coalition: an invitation becomes a shared process
                  </Link>
                </h3>
              </div>
              <div className="mt-3 space-y-2 leading-7 text-jb-ink/76">
                <p>
                  <strong className="text-jb-ink">Relationships:</strong>{" "}
                  cultural-space organizers needed a way to gather around the
                  January 2017 DCLA meeting. I publicly invited people into that
                  meeting; Call Script was one bridge into collective organizing.
                </p>
                <p>
                  <strong className="text-jb-ink">Model:</strong>{" "}
                  public invitation → meeting discussion → participatory naming
                  and letter-making → next general meeting. This timeline models
                  the documented participation path, not sole authorship.
                </p>
                <p>
                  <strong className="text-jb-ink">Interface and use:</strong>{" "}
                  the January 27 event discussion invited people to choose a name
                  and read, edit, and sign a shared letter. The naming poll
                  displayed 57% for “NYC Artist Coalition.” That is the result
                  displayed by the platform, not an attendance count or legal founding vote.
                </p>
                <p>
                  <strong className="text-jb-ink">
                    Learning and continuity:
                  </strong>{" "}
                  Call Script then promoted the March 6 general meeting at
                  Floasis. The next invitation carried the coalition identity
                  forward, leaving a dated path others could join. The record
                  does not establish who wrote every line, letter delivery,
                  meeting attendance, or a resulting policy change.
                  <Cite pageId="about" occurrenceId="coalition-participation-path" />
                </p>
              </div>
            </article>
            <article className="py-6">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="text-xl font-semibold text-jb-ink">
                  <Link
                    className="text-jb-blue hover:text-jb-green"
                    href="/work/kc-town-hall#resident-service-sequence-title"
                  >
                    KC Town Hall: a resident request becomes a completed service
                  </Link>
                </h3>
              </div>
              <div className="mt-3 space-y-2 leading-7 text-jb-ink/76">
                <p>
                  <strong className="text-jb-ink">Relationships:</strong>{" "}
                  Tired of Tires connected households, volunteers, KC Town Hall,
                  Oak Park Neighborhood Association, and City recycling. Public
                  records establish my participation in pickup work, not sole
                  ownership of the program or each service component.
                </p>
                <p>
                  <strong className="text-jb-ink">Model:</strong>{" "}
                  eligibility → form or phone request → scheduled collection →
                  City recycling → public reporting. The archived service page
                  makes that operating sequence recoverable.
                </p>
                <p>
                  <strong className="text-jb-ink">Interface and use:</strong>{" "}
                  a public service page and outreach flyer explained what
                  residents could request and when pickup would happen. The
                  linked case study pairs the governed flyer with before-and-after
                  field photographs of one completed collection.
                </p>
                <p>
                  <strong className="text-jb-ink">
                    Learning and continuity:
                  </strong>{" "}
                  the recurring schedule, volunteer pathway, recycling handoff,
                  and public reporting made participation repeatable. This is
                  service-delivery evidence, not an audited program total or a
                  demonstrated resident-feedback-to-redesign chain; that finer
                  learning history remains unresolved.
                  <Cite pageId="about" occurrenceId="resident-service-path" />
                </p>
              </div>
            </article>
          </div>
          <div className="mt-8 border-y border-jb-ink/12 py-4">
            <p className="jb-section-label">Additional continuities</p>
            <p className="mt-2 max-w-3xl leading-7 text-jb-ink/72">
              Historical systems and current research remain part of the method
              without being presented as current production deployments.
            </p>
          </div>
          <div className="divide-y divide-jb-ink/12 border-b border-jb-ink/12">
            <article className="py-6">
              <h3 className="text-xl font-semibold text-jb-ink">
                <Link
                  className="text-jb-blue hover:text-jb-green"
                  href="/work/harry-j-epstein"
                >
                  Harry J. Epstein Company
                </Link>
              </h3>
              <p className="mt-3 leading-7 text-jb-ink/76">
                The 2009–2015 engagement joins storefront, content, marketing,
                and operations. Its case-study handoff specimen is a reconstruction,
                not a recovered log proving a particular customer question caused
                a particular release.
              </p>
            </article>
            <article className="py-6">
              <h3 className="text-xl font-semibold text-jb-ink">
                <Link className="text-jb-blue hover:text-jb-green" href="/work/196-sunday-dinner">
                  Sunday Dinner and 196
                </Link>
              </h3>
              <p className="mt-3 leading-7 text-jb-ink/76">
                Recurring hospitality connects invitations, hosting, return,
                and artist support. Historical gatherings and later residency
                planning remain distinct: the case-study acceptance specimen is
                a planning template, not proof of a completed residency.
              </p>
            </article>
            <article className="py-6">
              <h3 className="text-xl font-semibold text-jb-ink">
                <Link
                  className="text-jb-blue hover:text-jb-green"
                  href="/lab/source-backed-team-memory"
                >
                  Knowledge Wiki Graphs
                </Link>
              </h3>
              <div className="mt-3 space-y-2 leading-7 text-jb-ink/76">
                <Claim
                  as="p"
                  claimId="CLM-KNOWLEDGE-WIKI-GRAPH-ECOSYSTEM-2026"
                  projection="case-study"
                  surface="/about"
                  pageId="about"
                  occurrenceId="knowledge-wiki-graph-method"
                />
                <p>
                  <strong className="text-jb-ink">Relationships:</strong>{" "}
                  semantic meaning, evidentiary support, source custody,
                  contributors, open questions, corrections, and the audiences
                  who need to trust the record.
                </p>
                <p>
                  <strong className="text-jb-ink">Interface and use:</strong>{" "}
                  this portfolio, its checks, and its review reports form an
                  early working method tested through iterative research and
                  human review, not a completed client pilot.
                </p>
                <p>
                  <strong className="text-jb-ink">
                    Learning and continuity:
                  </strong>{" "}
                  locally authoritative repositories, stable identities,
                  citations, correction paths, evaluation receipts, and
                  explicit human gates let another collaborator inspect what is
                  known and safely continue the work.
                </p>
              </div>
            </article>
          </div>
          <aside
            aria-labelledby="systems-comparison-limits"
            className="mt-8 border-l-4 border-jb-ochre bg-jb-lemon/20 p-5"
          >
            <h3
              className="text-lg font-semibold text-jb-ink"
              id="systems-comparison-limits"
            >
              Limits of this comparison
            </h3>
            <p className="mt-3 leading-7 text-jb-ink/76">
              These recurring steps are an analytical pattern, not evidence
              that different projects are structurally equivalent. Missing
              evidence and relationships remain missing; I do not invent them.
              The Knowledge Wiki Graph is an evolving research practice, not a
              finished platform, proof of client adoption, or peer-reviewed
              research; historical implementation evidence does not by itself
              establish present technical proficiency.
            </p>
          </aside>
        </section>
        <div className="mt-10 border-l-4 border-jb-blue bg-jb-warm p-5">
          <p className="leading-8 text-jb-ink/78">
            I value public benefit, accessibility, source-backed memory, careful
            claims, collective credit, consent, privacy, repair, and
            documentation that helps future collaborators safely continue the
            work.
          </p>
        </div>
      </div>
      <div className="mt-12 max-w-3xl">
        <References pageId="about" />
      </div>
      <div className="mt-12 max-w-3xl">
        <ContactCTA />
      </div>
    </div>
  );
}
