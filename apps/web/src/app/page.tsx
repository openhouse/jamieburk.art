import { CapabilityBand } from "@/components/CapabilityBand";
import { Hero } from "@/components/Hero";
import { ProofStrip } from "@/components/ProofStrip";
import { SectionHeading } from "@/components/SectionHeading";
import { StartHere } from "@/components/StartHere";
import { profile } from "@/data/profile";
import { getFeaturedWorkItems } from "@/lib/content";
import Link from "next/link";

export default function HomePage() {
  const featured = getFeaturedWorkItems();

  return (
    <>
      <Hero />
      <ProofStrip items={profile.proofAnchors} />
      <StartHere items={featured} />
      <section className="page-section">
        <SectionHeading
          eyebrow="What I do"
          title="Operating structure for ambiguous work"
          body="Across client, civic, cultural, and public-facing projects, Jamie builds the practices that help teams stay oriented."
        />
        <CapabilityBand items={profile.capabilities} />
      </section>
      <section className="page-section">
        <SectionHeading
          eyebrow="Case-study grammar"
          title="What was unclear -> what became usable"
          body="The site is organized around a repeatable proof pattern: under-structured context, source discovery, clearer workflows, usable artifacts, implementation support, and durable handoff."
        />
        <div className="capability-grid">
          {profile.unclearToUsable.map((item) => (
            <article className="quiet-card" key={item}>
              <p>{item}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="page-section">
        <div className="plain-stack">
          <h2>Looking for someone who can bring structure, documentation, and implementation discipline to ambiguous work?</h2>
          <p>Download resume, email Jamie, or start with the selected work.</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf">Download resume</a>
            <a className="btn btn-outline" href="mailto:jamie.burkart@gmail.com">Email Jamie</a>
            <Link className="btn btn-ghost" href="/work">View selected work</Link>
          </div>
        </div>
      </section>
    </>
  );
}
