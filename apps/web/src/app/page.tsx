import Link from "next/link";
import { capabilityAreas, siteConfig } from "@jamie/site-content/site";
import { CTAButton } from "@/components/ui";
import { CapabilityGrid, ProofStrip, Section, SystemDiagram } from "@/components/sections";
import { WorkCard } from "@/components/work";
import { getFeaturedWork } from "@/lib/work";

const proofItems = [
  { value: "14+", label: "years building operating structure" },
  { value: "30+", label: "pages of civic campaign-memory infrastructure" },
  { value: "2x", label: "revenue growth contribution for legacy e-commerce" },
  { value: "35", label: "city ecosystems reached through WOWList.org" },
  { value: "300+", label: "hosted gatherings documented and supported" }
];

export default function HomePage() {
  const featuredWork = getFeaturedWork();

  return (
    <>
      <section className="hero">
        <div className="container golden-split">
          <div className="stack-lg">
            <div className="stack">
              <p className="eyebrow">{siteConfig.role}</p>
              <h1>Jamie Burkart</h1>
              <p className="lead">
                I build operating structure for ambiguous public-facing technical work.
              </p>
              <p className="copy">
                I help teams turn ambiguous, stakeholder-heavy work into clear requirements,
                workflows, documentation, decision trails, launch support, onboarding
                materials, public-facing tools, and durable handoffs.
              </p>
            </div>
            <div className="cluster">
              <CTAButton href="/work">View selected work</CTAButton>
              <CTAButton href={siteConfig.resumePath} variant="secondary">
                Download resume
              </CTAButton>
              <CTAButton href="/contact" variant="secondary">
                Contact Jamie
              </CTAButton>
            </div>
            <p className="copy">
              Brooklyn, NY - Civic technology - Product operations - Knowledge systems -
              Public-facing tools
            </p>
          </div>
          <SystemDiagram />
        </div>
      </section>

      <div className="container">
        <ProofStrip items={proofItems} />
      </div>

      <Section
        title="Selected systems"
        action={<Link className="subtle-link" href="/work">See all work</Link>}
      >
        <div className="grid grid-3">
          {featuredWork.map((work) => (
            <WorkCard key={work.slug} work={work} />
          ))}
        </div>
      </Section>

      <Section title="Capabilities">
        <CapabilityGrid items={[...capabilityAreas]} />
      </Section>

      <Section title="How I work">
        <div className="golden-split">
          <div className="stack-lg">
            <p className="lead">Clarify -&gt; Structure -&gt; Build -&gt; Document -&gt; Transfer</p>
            <p className="copy">
              I usually enter when the work is important but under-structured. I listen across
              stakeholders, map what is known and unknown, create the workflows or
              documentation the team needs, support launch or adoption, and leave behind
              materials that make the work easier to maintain.
            </p>
          </div>
          <div className="note">
            <p>
              A good handoff is a form of care: it lets someone else enter the work without
              panic, shame, or missing context.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Looking for implementation support?">
        <div className="cluster">
          <CTAButton href={siteConfig.resumePath}>Download resume</CTAButton>
          <CTAButton href={`mailto:${siteConfig.email}`} variant="secondary">
            Email Jamie
          </CTAButton>
        </div>
      </Section>
    </>
  );
}
