import { ButtonLink } from "@/components/ButtonLink";
import { CapabilityGrid } from "@/components/CapabilityGrid";
import { Hero } from "@/components/Hero";
import { ProjectCard } from "@/components/ProjectCard";
import { ProofStrip } from "@/components/ProofStrip";
import { Section } from "@/components/Section";
import { getFeaturedWorkItems } from "@/lib/content";

const workflow = ["Clarify", "Structure", "Build", "Document", "Transfer"];

export default function HomePage() {
  const featured = getFeaturedWorkItems();

  return (
    <>
      <Hero />
      <section className="border-y border-[color:var(--color-line)] bg-base-200/55 py-4">
        <div className="container-page">
          <p className="text-sm font-semibold text-[color:var(--color-muted)]">
            Current focus: technical operations and implementation roles - portfolio case studies -
            source-backed team memory - civic/public-interest technology
          </p>
        </div>
      </section>
      <ProofStrip />
      <Section eyebrow="Selected systems" title="Selected systems">
        <div className="balanced-grid">
          {featured.map((item) => (
            <ProjectCard item={item} key={item.meta.slug} />
          ))}
        </div>
      </Section>
      <Section eyebrow="Pattern" title="How I work" ruled>
        <div className="phi-grid">
          <div>
            <div className="flex flex-wrap gap-2">
              {workflow.map((step) => (
                <span className="badge badge-primary badge-lg" key={step}>
                  {step}
                </span>
              ))}
            </div>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[color:var(--color-muted)]">
              I usually enter when the work is important but under-structured. I listen across
              stakeholders, map what is known and unknown, create the workflows or documentation the
              team needs, support launch or adoption, and leave behind materials that make the work
              easier to maintain.
            </p>
          </div>
          <CapabilityGrid compact />
        </div>
      </Section>
      <section className="section-pad section-rule callout-band">
        <div className="container-page">
          <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div>
              <p className="eyebrow mb-3">Referrer note</p>
              <p className="max-w-3xl text-2xl font-bold leading-snug md:text-3xl">
                Jamie Burkart is a technical project manager and implementation lead who helps
                civic, cultural, small-business, and public-facing teams turn messy work into usable
                systems: workflows, documentation, decision records, launch support, onboarding, and
                handoffs.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <ButtonLink href="/resume" icon="download">
                Download resume
              </ButtonLink>
              <ButtonLink href="/contact" icon="mail" variant="secondary">
                Contact Jamie
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
