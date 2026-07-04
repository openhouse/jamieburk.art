import { CapabilityBand } from "@/components/capability-band";
import { Hero } from "@/components/hero";
import { LinkButton } from "@/components/link-button";
import { ProjectCard } from "@/components/project-card";
import { ProofStrip } from "@/components/proof-strip";
import { PublicSafetyNote } from "@/components/public-safety-note";
import { SectionHeading } from "@/components/section-heading";
import { StartHere } from "@/components/start-here";
import { TagList } from "@/components/tag-list";
import { roleTags } from "@/data/capabilities";
import { site } from "@/data/site";
import { getFeaturedWork } from "@/lib/content";

export default async function Home() {
  const featuredWork = await getFeaturedWork();

  return (
    <>
      <Hero />
      <ProofStrip />
      <section className="container-page section-pad">
        <SectionHeading
          title="Start here"
          body="New to my work? These pages give the quickest path through the portfolio."
        />
        <div className="mt-8">
          <StartHere />
        </div>
      </section>
      <section className="bg-base-200">
        <div className="container-page section-pad">
          <SectionHeading
            eyebrow="What I do"
            title="Operating practices for under-structured work"
            body="The repeated pattern: unclear situation, stakeholder and source discovery, workflow clarity, documentation, implementation support, handoff, and durable system."
          />
          <div className="mt-8">
            <CapabilityBand />
          </div>
        </div>
      </section>
      <section className="container-page section-pad">
        <SectionHeading
          eyebrow="Selected systems"
          title="Proof that becomes useful"
          body="These are selected systems, not a total archive. Each one shows what was unclear and what became usable."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featuredWork.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
      <section className="bg-base-200">
        <div className="container-page section-pad">
          <div className="golden-split">
            <div>
              <SectionHeading
                title="Operating backbone for under-structured work"
                body="Across client, civic, cultural, and public-facing projects, I build the practices that help teams stay oriented: planning systems, decision logs, action trackers, source maps, onboarding materials, stakeholder updates, public guidance, runbooks, and handoff documentation."
              />
              <div className="mt-6">
                <LinkButton href="/work/technical-operations">
                  View Technical Operations proof
                </LinkButton>
              </div>
            </div>
            <PublicSafetyNote />
          </div>
        </div>
      </section>
      <section className="container-page section-pad">
        <SectionHeading title="Roles this work supports" />
        <div className="mt-6">
          <TagList tags={roleTags} />
        </div>
      </section>
      <section className="border-t border-base-300 bg-primary text-primary-content">
        <div className="container-reading py-14 text-center">
          <h2 className="text-3xl font-bold leading-tight">
            Looking for someone who can bring structure, documentation, and
            implementation discipline to ambiguous work?
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <LinkButton href={site.resumePath} variant="ghost">
              Download resume
            </LinkButton>
            <LinkButton href={`mailto:${site.email}`} variant="ghost">
              Email Jamie
            </LinkButton>
            <LinkButton href="/work" variant="ghost">
              View selected work
            </LinkButton>
          </div>
        </div>
      </section>
    </>
  );
}
