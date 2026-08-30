import Image from "next/image";
import type { Metadata } from "next";
import SourceBackedMemory from "@/content/lab/source-backed-team-memory.mdx";
import { Cite, Claim, References } from "@/components/citations";
import { JBButton } from "@/components/JBButton";
import { ResponsiveMedia } from "@/components/ResponsiveMedia";
import { portfolioPhotos } from "@/data/photography";
import { site } from "@/data/site";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Knowledge Wiki Graphs - Jamie Burkart",
  description:
    "An evolving practice using a human-inspectable, source-backed wiki form to connect semantic, evidence, and source-custody graphs to human-reviewed outputs.",
  path: "/lab/source-backed-team-memory"
});

export default function SourceBackedTeamMemoryPage() {
  const collectiveMapPhoto = portfolioPhotos.knowledgeWikiCollectiveMap;
  const graphLayers = [
    {
      label: "Semantic graph",
      text: "What the work means: projects, people, decisions, capabilities, claims, inquiries, and their relationships."
    },
    {
      label: "Evidence graph",
      text: "Why a statement can be trusted or remains open: sources, observations, assets, citations, limitations, and provenance."
    },
    {
      label: "Source-custody graph",
      text: "Where authoritative material is held and under what access, rights, consent, and retention conditions."
    }
  ];

  const workedExample = [
    {
      label: "Known",
      text: "A public project brief records the launch date, intended audience, and approved owner of a decision."
    },
    {
      label: "Open",
      text: "Two meeting summaries describe adoption differently, so the shared record flags the discrepancy for review."
    },
    {
      label: "Protected",
      text: "Private transcripts, contact details, and unapproved collaborator context remain outside the public memory."
    }
  ];

  const pilotSteps = [
    {
      label: "Find the knowledge friction",
      text: "Choose one recurring place where product rationale, decisions, open questions, or onboarding context is being lost."
    },
    {
      label: "Start from approved material",
      text: "Use a small source set the team has deliberately cleared: for example, one meeting, one product brief, and one onboarding note."
    },
    {
      label: "Return usable operating memory",
      text: "Produce a start-here page, decision record, open-question list, source links, and access notes that fit the team's existing work."
    },
    {
      label: "Test the handoff",
      text: "Ask a teammate to find an answer, trace why it is there, correct it, and recognize what remains open or protected."
    }
  ];

  const engagementShape = [
    {
      label: "People",
      text: "One sponsor, one working lead, and two or three teammates who can test whether the result helps them find and use what the team already knows."
    },
    {
      label: "Source set",
      text: "Three to five approved sources around one decision trail, such as a product brief, meeting notes, an onboarding document, and the current place where open questions live."
    },
    {
      label: "Jamie returns",
      text: "A knowledge-friction map, start-here page, decision record, open-question list, source and access notes, correction path, and a tested handoff."
    },
    {
      label: "End decision",
      text: "The team decides to continue, revise, or stop—and leaves with a clear account of what worked, what remains uncertain, who owns the next step, and what would require new authorization."
    }
  ];

  return (
    <article className="jb-frame py-12">
      <div className="jb-reading">
        <p className="text-sm font-semibold uppercase text-jb-blue">Lab / method</p>
        <h1 className="mt-3 text-5xl font-bold text-jb-ink">
          Knowledge Wiki Graphs
        </h1>
        <p className="mt-5 text-xl leading-8 text-jb-ink/76">
          <Claim
            claimId="CLM-KNOWLEDGE-WIKI-GRAPH-ECOSYSTEM-2026"
            projection="case-study"
            surface="/lab/source-backed-team-memory"
            pageId="source-backed-team-memory"
            occurrenceId="knowledge-wiki-graph-method"
          />
        </p>
        <figure className="mt-8 overflow-hidden rounded-lg border border-jb-ink/12 bg-jb-paper">
          <ResponsiveMedia
            alt={collectiveMapPhoto.alt}
            className="h-auto w-full"
            height={collectiveMapPhoto.height}
            preload
            sizes="(min-width: 1024px) 768px, 100vw"
            src={collectiveMapPhoto.src}
            width={collectiveMapPhoto.width}
          />
          <figcaption className="border-t border-jb-ink/10 p-4 text-sm leading-6 text-jb-ink/76">
            {collectiveMapPhoto.caption}
            <span className="mt-1 block text-jb-ink/70">
              {collectiveMapPhoto.credit}
            </span>
          </figcaption>
        </figure>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-jb-ink/76">
          The practice begins with knowledge already present in people,
          language, artifacts, and relationships. The system helps a team make
          that knowledge visible, connected, and usable without claiming
          ownership of it.
        </p>
        <section className="mt-10 border-y border-jb-ink/12 py-10">
          <p className="text-sm font-semibold uppercase text-jb-blue">
            Why a wiki form
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight text-jb-ink">
            Shared memory should remain readable, traceable, and revisable
          </h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-jb-ink/76">
            The working proposition is that shared agentic memory should take a
            wiki form: a human-inspectable, source-backed place where people and
            agents with different contexts can develop working memory, trace why
            something is believed, preserve disagreement, and revise the record.
            A wiki does not manufacture consensus or replace human judgment. It
            makes the terms and history of working agreement visible.
          </p>
        </section>
        <div className="mt-6 rounded-lg border border-jb-ochre/50 bg-jb-lemon/25 p-5">
          <p className="leading-7 text-jb-ink/76">
            Early research / method / consulting practice. Not a finished
            production SaaS, chatbot, surveillance system, AI replacement for
            judgment, or private archive browser.
          </p>
        </div>
        <section className="mt-10 border-b border-jb-ink/12 pb-10">
          <p className="text-sm font-semibold uppercase text-jb-blue">
            At a glance
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-jb-ink">
            Three graph responsibilities, one reviewed output
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {graphLayers.map((item) => (
              <div
                className="rounded-lg border border-jb-ink/12 bg-jb-warm p-5"
                key={item.label}
              >
                <h3 className="text-xl font-semibold text-jb-blue">{item.label}</h3>
                <p className="mt-3 text-sm leading-6 text-jb-ink/74">{item.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-3xl leading-8 text-jb-ink/76">
            The portfolio is a selective projection from those responsibilities,
            composed for a particular audience and released through human review.
          </p>
        </section>
        <section className="mt-12 border-b border-jb-ink/12 pb-12">
          <h2 className="max-w-3xl text-3xl font-semibold leading-tight text-jb-ink">
            Start with one team pressure people can feel
          </h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-jb-ink/76">
            For a fast-growing product and engineering team, the first proposal
            is a focused discovery or prototype sprint—not a company-wide
            knowledge platform. Begin with one practical question: can a new
            teammate understand what the team is building, why current choices
            were made, and what remains open without reconstructing that history
            from meetings and private messages?
          </p>
          <ol className="mt-8 divide-y divide-jb-ink/12 border-y border-jb-ink/12">
            {pilotSteps.map((item, index) => (
              <li
                className="grid gap-3 py-6 md:grid-cols-[3rem_0.38fr_0.62fr] md:items-start md:gap-5"
                key={item.label}
              >
                <span className="font-semibold tabular-nums text-jb-blue">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-lg font-semibold text-jb-blue">{item.label}</h3>
                <p className="leading-7 text-jb-ink/74">{item.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8 rounded-lg border border-jb-blue/25 bg-jb-warm p-6 md:p-8">
            <p className="text-sm font-semibold uppercase text-jb-blue">
              Proposed first engagement
            </p>
            <h3 className="mt-3 max-w-3xl text-2xl font-semibold text-jb-ink">
              A two-week discovery and prototype sprint the team can authorize
            </h3>
            <p className="mt-4 max-w-3xl leading-8 text-jb-ink/76">
              The timebox and participation plan are confirmed with the sponsor
              before work begins. The aim is not to install a new company-wide
              platform. It is to make one slipping decision trail easier to
              find, trust, correct, protect, and hand to the next teammate.
            </p>
            <dl className="mt-6 grid gap-px overflow-hidden rounded-md border border-jb-ink/12 bg-jb-ink/12 md:grid-cols-2">
              {engagementShape.map((item) => (
                <div className="bg-jb-paper p-5" key={item.label}>
                  <dt className="font-semibold text-jb-blue">{item.label}</dt>
                  <dd className="mt-2 text-sm leading-6 text-jb-ink/74">
                    {item.text}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-6 grid gap-5 md:grid-cols-[0.38fr_0.62fr]">
              <h4 className="text-lg font-semibold text-jb-ink">
                Deliberately outside this first sprint
              </h4>
              <p className="leading-7 text-jb-ink/74">
                Indiscriminate ingestion, hidden monitoring, a private archive
                browser, a company-wide rollout, and continuing maintenance
                without a separate agreement.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <JBButton href={site.emailHref}>
                Discuss this proposed two-week pilot
              </JBButton>
              <JBButton href="/resume" variant="secondary">
                Review Jamie&apos;s resume
              </JBButton>
            </div>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-[0.38fr_0.62fr]">
            <h3 className="text-2xl font-semibold text-jb-ink">
              What makes the pilot worth continuing
            </h3>
            <div>
              <ul className="list-disc space-y-3 pl-5 text-jb-ink/76 marker:text-jb-ochre">
                <li>A newcomer can find the current product rationale and open questions.</li>
                <li>A decision can be traced to its source and reviewed in context.</li>
                <li>A teammate can correct the record or keep sensitive material protected.</li>
                <li>The team can make a clear continue, revise, or stop decision.</li>
              </ul>
              <p className="mt-5 text-sm leading-6 text-jb-ink/64">
                These are proposed acceptance conditions, not a claim that a
                client engagement or company-wide implementation has occurred.
              </p>
            </div>
          </div>
        </section>
        <div className="mt-10 space-y-6">
          <SourceBackedMemory />
        </div>
        <section className="mt-12 border-b border-jb-ink/12 pb-10">
          <p className="text-sm font-semibold uppercase text-jb-blue">
            Earlier method
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-jb-ink">
            Source-Backed Team Memory remains part of the lineage
          </h2>
          <p className="mt-4 max-w-3xl leading-8 text-jb-ink/76">
            <Claim
              claimId="CLM-SOURCE-BACKED-MEMORY-METHOD-2026"
              projection="case-study"
              surface="/lab/source-backed-team-memory"
            />
          </p>
        </section>
        <section className="mt-12 border-y border-jb-ink/12 py-10">
          <p className="text-sm font-semibold uppercase text-jb-blue">
            Worked example
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-jb-ink">
            One source enters; three review states remain visible
          </h2>
          <p className="mt-4 max-w-3xl leading-8 text-jb-ink/76">
            This synthetic example shows the method without exposing a private
            archive. The system does not force disagreement into certainty.
            It preserves what is supported, what needs review, and what should
            stay outside the public record.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {workedExample.map((item) => (
              <div
                className="rounded-lg border border-jb-ink/12 bg-jb-warm p-5"
                key={item.label}
              >
                <h3 className="text-xl font-semibold text-jb-blue">{item.label}</h3>
                <p className="mt-3 text-sm leading-6 text-jb-ink/74">{item.text}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="mt-12 border-b border-jb-ink/12 pb-10">
          <p className="text-sm font-semibold uppercase text-jb-blue">
            Concrete correction trace
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-jb-ink">
            The public record changed the portfolio
          </h2>
          <p className="mt-4 max-w-3xl leading-8 text-jb-ink/76">
            Earlier portfolio copy dated CallNYC to 2014-2015. A recovered
            Council hackathon announcement, the fuller CouncilStat data-release
            chronology, and contemporaneous Politico coverage placed the work
            in 2016.<Cite pageId="source-backed-team-memory" occurrenceId="callnyc-correction-trace" />{" "}
            The correction was applied to the work index, case study, and
            resume while the prior wording and reason remained visible in the
            Knowledge Wiki.
          </p>
          <dl className="mt-6 grid gap-px border border-jb-ink/12 bg-jb-ink/12 md:grid-cols-3">
            <div className="bg-jb-paper p-5">
              <dt className="font-semibold text-jb-blue">Before</dt>
              <dd className="mt-2 text-sm leading-6 text-jb-ink/74">2014-2015</dd>
            </div>
            <div className="bg-jb-paper p-5">
              <dt className="font-semibold text-jb-blue">After</dt>
              <dd className="mt-2 text-sm leading-6 text-jb-ink/74">2016</dd>
            </div>
            <div className="bg-jb-paper p-5">
              <dt className="font-semibold text-jb-blue">Handoff</dt>
              <dd className="mt-2 text-sm leading-6 text-jb-ink/74">
                One correction propagated to every public surface that carried
                the date.
              </dd>
            </div>
          </dl>
        </section>
        <section className="mt-12 grid gap-6 border-b border-jb-ink/12 pb-10 lg:grid-cols-[0.58fr_0.42fr] lg:items-center">
          <figure className="overflow-hidden rounded-lg border border-jb-ink/12 bg-jb-paper">
            <Image
              alt="Certificate of completion for AI Evals for Engineers and PMs, awarded to James Burkart by Hamel Husain and Shreya Shankar through Maven."
              className="h-auto w-full"
              height={584}
              sizes="(min-width: 1024px) 58vw, 100vw"
              src="/artifacts/ai-evals/completion-certificate.jpg"
              width={1024}
            />
            <figcaption className="border-t border-jb-ink/10 p-4 text-sm leading-6 text-jb-ink/76">
              Public completion certificate. Professional development,
              not instructor affiliation or a claim that the lab is production SaaS.
            </figcaption>
          </figure>
          <div>
            <p className="text-sm font-semibold uppercase text-jb-blue">
              Evaluation practice
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-jb-ink">
              Human review is part of the system
            </h2>
            <p className="mt-4 leading-8 text-jb-ink/76">
              <Claim
                claimId="CLM-AI-EVALS-COURSE-COMPLETION-2026"
                projection="case-study"
                surface="/lab/source-backed-team-memory"
                pageId="source-backed-team-memory"
                occurrenceId="ai-evals-course-completion"
              />{" "}
              The coursework supports this lab&apos;s
              emphasis on error analysis, annotation, traces, retrieval quality,
              and reviewable failure modes.
            </p>
          </div>
        </section>
        <References pageId="source-backed-team-memory" />
        <div className="mt-10 flex flex-wrap gap-3">
          <JBButton href="/work" variant="secondary">
            View selected work
          </JBButton>
          <JBButton href={site.emailHref}>
            Discuss a focused knowledge-system sprint
          </JBButton>
        </div>
      </div>
    </article>
  );
}
