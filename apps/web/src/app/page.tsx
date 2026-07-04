import { ButtonLink } from "@/components/ButtonLink";
import { CapabilityGrid } from "@/components/CapabilityGrid";
import { ProjectCard } from "@/components/ProjectCard";
import { ProofStrip } from "@/components/ProofStrip";
import { StartHere } from "@/components/StartHere";
import { Tag } from "@/components/Tag";
import { featuredWork } from "@/data/work";
import { roleTargets, site } from "@/data/site";

export default function HomePage() {
  return (
    <>
      <section className="page-hero home-hero">
        <div>
          <p className="eyebrow">{site.name}</p>
          <p className="lede">{site.title}</p>
          <h1>{site.headline}</h1>
          <p>{site.description}</p>
          <div className="hero-actions">
            <ButtonLink href="/work">View selected systems</ButtonLink>
            <ButtonLink href={site.resumePath} variant="secondary">
              Download resume
            </ButtonLink>
            <ButtonLink href="/contact" variant="quiet">
              Contact Jamie
            </ButtonLink>
          </div>
        </div>
        <p className="hero-note">{site.locationLine}</p>
      </section>

      <ProofStrip />
      <StartHere />
      <CapabilityGrid />

      <section aria-labelledby="selected-systems" className="section-block">
        <p className="eyebrow">Selected proof</p>
        <h2 id="selected-systems">Selected systems</h2>
        <p className="section-intro">
          Selected proof, not everything. Each card names what was unclear, what became usable,
          and what public-safe evidence can be shown.
        </p>
        <div className="project-grid">
          {featuredWork.map((item) => (
            <ProjectCard item={item} key={item.slug} />
          ))}
        </div>
      </section>

      <section aria-labelledby="operating-backbone" className="section-block operating-callout">
        <div>
          <p className="eyebrow">Operating backbone</p>
          <h2 id="operating-backbone">Operating backbone for under-structured work</h2>
          <p>
            Across client, civic, cultural, and public-facing projects, I build the practices
            that help teams stay oriented: planning systems, decision logs, action trackers,
            source maps, onboarding materials, stakeholder updates, public guidance, runbooks,
            and handoff documentation.
          </p>
        </div>
        <ButtonLink href="/work/technical-operations">View Technical Operations proof</ButtonLink>
      </section>

      <section aria-labelledby="role-targets" className="section-block">
        <p className="eyebrow">Roles this work supports</p>
        <h2 id="role-targets">Role targets</h2>
        <div className="role-tags">
          {roleTargets.map((role) => (
            <Tag key={role}>{role}</Tag>
          ))}
        </div>
      </section>

      <section aria-labelledby="final-cta" className="section-block final-cta">
        <h2 id="final-cta">
          Looking for someone who can bring structure, documentation, and implementation
          discipline to ambiguous work?
        </h2>
        <div className="hero-actions">
          <ButtonLink href={site.resumePath}>Download resume</ButtonLink>
          <ButtonLink href={`mailto:${site.email}`} variant="secondary">
            Email Jamie
          </ButtonLink>
          <ButtonLink href="/work" variant="quiet">
            View selected work
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
