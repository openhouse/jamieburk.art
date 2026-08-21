import { GovernedImage } from "@/components/GovernedImage";
import type { Metadata } from "next";
import SourceBackedMemory from "@/content/lab/source-backed-team-memory.mdx";
import { Cite, Claim, References } from "@/components/citations";
import { JBButton } from "@/components/JBButton";
import { knowledgeWikiPractice } from "@/data/knowledge-wiki-practice";
import { portfolioPhotos } from "@/data/photography";
import { site } from "@/data/site";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Source-Backed Team Memory - Jamie Burkart",
  description:
    "A lab / proof-of-practice for Knowledge Wiki Graphs, source-backed operating memory, decision lineage, and human-correctable AI workflows.",
  path: "/lab/source-backed-team-memory"
});

export default function SourceBackedTeamMemoryPage() {
  const photo = portfolioPhotos.knowledgeWikiCollectiveSynthesis;
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

  return (
    <article className="jb-frame py-12">
      <div className="jb-reading">
        <p className="text-sm font-semibold uppercase text-jb-blue">Lab / method</p>
        <h1 className="mt-3 text-5xl font-bold text-jb-ink">
          Source-Backed Team Memory
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
            Early research / method / consulting practice. Not a finished
            production SaaS, chatbot, surveillance system, AI replacement for
            judgment, or private archive browser.
          </p>
        </div>
        <section className="mt-12 border-y border-jb-ink/12 py-10">
          <p className="text-sm font-semibold uppercase text-jb-blue">
            Current research
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold text-jb-ink">
            A project is a reviewed projection from living knowledge
          </h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-jb-ink/76">
            <Claim
              claimId="CLM-KNOWLEDGE-WIKI-GRAPH-PRACTICE-2026"
              projection="case-study"
              surface="/lab/source-backed-team-memory"
            />
          </p>
          <figure className="mt-8 overflow-hidden rounded-lg border border-jb-ink/12 bg-jb-paper">
            <GovernedImage
              alt={photo.alt}
              className="h-auto w-full"
              height={photo.height}
              sizes="(min-width: 1024px) 768px, 100vw"
              src={photo.src}
              width={photo.width}
            />
            <figcaption className="grid gap-2 border-t border-jb-ink/10 p-4 text-sm leading-6 text-jb-ink/76 sm:grid-cols-[1fr_auto]">
              <span>{photo.caption}</span>
              <span>{photo.credit}</span>
            </figcaption>
          </figure>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-jb-ink/76">
            A shared field of ideas becomes a navigable constellation. The
            structure does not invent the knowledge; it helps a team see, test,
            and use what people already know.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {knowledgeWikiPractice.layers.map((layer, index) => (
              <article
                className="rounded-lg border border-jb-ink/12 bg-jb-warm p-5"
                key={layer.id}
              >
                <p className="font-label text-xs uppercase tracking-[0.16em] text-jb-ochre">
                  Layer {index + 1}
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-jb-blue">
                  {layer.label}
                </h3>
                <p className="mt-3 font-semibold leading-6 text-jb-ink">
                  {layer.question}
                </p>
                <p className="mt-3 text-sm leading-6 text-jb-ink/74">
                  {layer.description}
                </p>
              </article>
            ))}
          </div>
          <div className="mt-4 rounded-lg border border-jb-blue/25 bg-jb-blue/[0.06] p-6">
            <p className="font-label text-xs uppercase tracking-[0.16em] text-jb-blue">
              Then compose
            </p>
            <h3 className="mt-3 text-2xl font-semibold text-jb-ink">
              {knowledgeWikiPractice.projection.label}
            </h3>
            <p className="mt-3 font-semibold leading-6 text-jb-ink">
              {knowledgeWikiPractice.projection.question}
            </p>
            <p className="mt-3 max-w-3xl leading-7 text-jb-ink/74">
              {knowledgeWikiPractice.projection.description}
            </p>
          </div>
        </section>
        <div className="mt-12 space-y-6">
          <SourceBackedMemory />
        </div>
        <section className="mt-12 border-b border-jb-ink/12 pb-10">
          <p className="text-sm font-semibold uppercase text-jb-blue">
            Research lineage
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-jb-ink">
            From Noting.us to the Knowledge Wiki Graph
          </h2>
          <p className="mt-4 max-w-3xl leading-8 text-jb-ink/76">
            <Claim
              claimId="CLM-NOTING-US-KNOWLEDGE-WIKI-LINEAGE-2026"
              projection="case-study"
              surface="/lab/source-backed-team-memory"
            />
          </p>
          <p className="mt-4 max-w-3xl leading-8 text-jb-ink/76">
            Each project can keep its own materials, sources, responsibilities,
            and review rules. Stable identities and explicit handoffs let
            knowledge travel without asking one repository to become the
            universal source of truth.
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
            <GovernedImage
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
