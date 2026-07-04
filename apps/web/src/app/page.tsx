import { CapabilityBand } from "@/components/CapabilityBand";
import { CTA } from "@/components/CTA";
import { Hero } from "@/components/Hero";
import { ProjectCard } from "@/components/ProjectCard";
import { ProofStrip } from "@/components/ProofStrip";
import { SectionHeading } from "@/components/SectionHeading";
import { StartHere } from "@/components/StartHere";
import { roleTags } from "@/data/capabilities";
import { getFeaturedWork } from "@/lib/content";
import { TagList } from "@/components/TagList";
import { LinkButton } from "@/components/LinkButton";

export default function HomePage() {
  const featuredWork = getFeaturedWork();

  return (
    <>
      <Hero />
      <StartHere />
      <ProofStrip />
      <section className="section-band">
        <div className="page-shell">
          <SectionHeading title="What I do" body="The repeated pattern across the work is simple: clarify the messy situation, build the system people can use, coordinate adoption, and leave a durable handoff." />
          <div className="mt-8">
            <CapabilityBand />
          </div>
        </div>
      </section>
      <section className="section-band">
        <div className="page-shell">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <SectionHeading title="Selected systems" body="Selected proof, not everything. These projects show public-facing tools, operating systems, documentation, implementation, and handoff work." />
            <LinkButton href="/work">View work index</LinkButton>
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {featuredWork.map((item) => (
              <ProjectCard item={item} key={item.slug} />
            ))}
          </div>
        </div>
      </section>
      <section className="section-band">
        <div className="page-shell grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <SectionHeading
            eyebrow="Operating backbone"
            title="Operating backbone for under-structured work"
            body="Across client, civic, cultural, and public-facing projects, I build the practices that help teams stay oriented: planning systems, decision logs, action trackers, source maps, onboarding materials, stakeholder updates, public guidance, runbooks, and handoff documentation."
          />
          <div className="surface p-6">
            <p className="small-caps text-[color:var(--color-primary)]">Roles this work supports</p>
            <div className="mt-5">
              <TagList tags={roleTags} tone="quiet" />
            </div>
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
