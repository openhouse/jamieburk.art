import type { Metadata } from "next";
import SourceBackedMemory from "@/content/lab/source-backed-team-memory.mdx";
import { Cite, Claim, References } from "@/components/citations";
import { JBButton } from "@/components/JBButton";
import { MediaImage } from "@/components/MediaImage";
import { portfolioPhotos } from "@/data/photography";
import { site } from "@/data/site";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Knowledge Wiki Graph - Jamie Burkart",
  description:
    "A working research method connecting project meaning, supporting evidence, responsible source custody, evaluations, and human review.",
  path: "/lab/source-backed-team-memory"
});

export default function SourceBackedTeamMemoryPage() {
  const collectiveSynthesisPhoto =
    portfolioPhotos.teamKnowledgeCollectiveSynthesis;
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
      label: "What I deliver",
      text: "A knowledge-friction map, one source-linked memory artifact, a correction path, access notes, and a tested handoff."
    },
    {
      label: "End decision",
      text: "The team decides to continue, revise, or stop—and keeps a useful record of what worked, what remains uncertain, and who owns the next step."
    }
  ];

  return (
    <article className="jb-frame py-12">
      <div className="jb-reading">
        <p className="text-sm font-semibold uppercase text-jb-blue">Lab / method</p>
        <h1 className="mt-3 text-5xl font-bold text-jb-ink">
          Knowledge Wiki Graph
        </h1>
        <p className="mt-5 text-xl leading-8 text-jb-ink/76">
          <Claim
            claimId="CLM-SOURCE-BACKED-MEMORY-METHOD-2026"
            projection="case-study"
            surface="/lab/source-backed-team-memory"
          />
        </p>
        <div className="mt-6 rounded-lg border border-jb-ochre/50 bg-jb-lemon/25 p-5">
          <p className="leading-7 text-jb-ink/76">
            Working research and operating method within Jamie&apos;s project
            ecosystem. Not a finished production SaaS, client deployment,
            chatbot, surveillance system, AI replacement for judgment, or
            private archive browser.
          </p>
        </div>
        <section className="mt-10 border-y border-jb-ink/12 py-8">
          <p className="text-sm font-semibold uppercase text-jb-blue">
            Proposed first engagement
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-jb-ink">
            A small paid two-week discovery and prototype sprint the team can
            authorize
          </h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-jb-ink/76">
            Start with one decision trail where product reasoning, open
            questions, or onboarding context keeps slipping away. We test a
            practical source-backed memory pattern without introducing a new
            platform or asking for broad system access.
          </p>
          <dl className="mt-6 grid gap-px overflow-hidden rounded-md border border-jb-ink/12 bg-jb-ink/12 md:grid-cols-2">
            {engagementShape.map((item) => (
              <div className="bg-jb-warm p-5" key={item.label}>
                <dt className="font-semibold text-jb-blue">{item.label}</dt>
                <dd className="mt-2 text-sm leading-6 text-jb-ink/74">
                  {item.text}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 max-w-3xl text-sm leading-6 text-jb-ink/64">
            The timebox and participation plan are confirmed with the sponsor
            before work begins. A wider rollout or continuing maintenance
            requires a separate decision.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <JBButton href="/resume" variant="secondary">
              View Jamie&apos;s resume
            </JBButton>
            <JBButton href={site.emailHref}>
              Discuss this proposed two-week pilot
            </JBButton>
          </div>
        </section>
        <figure className="mt-10 overflow-hidden rounded-lg border border-jb-ink/12 bg-jb-paper">
          <MediaImage
            alt={collectiveSynthesisPhoto.alt}
            className="aspect-[3/2] h-auto w-full object-cover"
            height={collectiveSynthesisPhoto.height}
            priority
            sizes="(min-width: 1024px) 768px, 100vw"
            src={collectiveSynthesisPhoto.src}
            width={collectiveSynthesisPhoto.width}
          />
          <figcaption className="border-t border-jb-ink/10 p-4 text-sm leading-6 text-jb-ink/76">
            {collectiveSynthesisPhoto.caption}{" "}
            <span className="whitespace-nowrap">
              {collectiveSynthesisPhoto.credit}
            </span>
          </figcaption>
        </figure>
        <div className="mt-10 space-y-6">
          <SourceBackedMemory />
        </div>
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
            <MediaImage
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
            Discuss a focused source-backed memory sprint
          </JBButton>
        </div>
      </div>
    </article>
  );
}
