import { CapabilityGrid } from "@/components/CapabilityGrid";
import { ContactCTA } from "@/components/ContactCTA";
import { Hero } from "@/components/Hero";
import { ProofStrip } from "@/components/ProofStrip";
import { ReferrerBlock } from "@/components/ReferrerBlock";
import { Section } from "@/components/Section";
import { WorkCard } from "@/components/WorkCard";
import { getWorkItems } from "@/lib/work";

export default async function Home() {
  const workItems = await getWorkItems();
  const featured = workItems.filter((item) => item.featured).slice(0, 3);

  return (
    <>
      <Hero />
      <section className="current-focus">
        <div className="site-shell">
          <p>
            Current focus: technical operations and implementation roles · portfolio case studies · source-backed team
            memory · civic/public-interest technology
          </p>
        </div>
      </section>
      <Section eyebrow="Public-safe proof" title="A focused professional proof surface">
        <ProofStrip />
      </Section>
      <Section
        eyebrow="Selected systems"
        title="Work that turns messy inputs into usable handoffs"
        intro="These are public-safe summaries of civic, cultural, small-business, and technical operating work."
      >
        <div className="work-grid">
          {featured.map((item) => (
            <WorkCard key={item.slug} item={item} />
          ))}
        </div>
      </Section>
      <Section eyebrow="How I work" title="The repeatable pattern underneath the projects">
        <CapabilityGrid />
      </Section>
      <Section>
        <ReferrerBlock />
      </Section>
      <Section>
        <ContactCTA />
      </Section>
    </>
  );
}
