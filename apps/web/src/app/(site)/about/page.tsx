import { ButtonLink } from "@/components/ButtonLink";
import { Tag } from "@/components/Tag";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "About",
  "About Jamie Burkart, a Brooklyn-based technical project manager and implementation lead."
);

const roles = [
  "Technical Project Manager",
  "Product Operations",
  "Civic Technologist",
  "Documentation Architect",
  "Systems Steward",
  "Community Infrastructure Builder"
];

const verbs = ["Clarify", "Coordinate", "Document", "Build", "Onboard", "Transfer", "Maintain"];

const domains = [
  "Web systems",
  "E-commerce",
  "Civic technology",
  "Public-facing guidance",
  "Small-business operations",
  "Cultural infrastructure",
  "Community systems",
  "Source-backed knowledge practices"
];

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <p className="eyebrow">About Jamie</p>
        <h1>Under-structured work into usable systems</h1>
        <p className="lede">
          I am Jamie Burkart, a technical project manager and implementation lead based in
          Brooklyn.
        </p>
        <p>
          For 14+ years, I have worked across web systems, e-commerce, civic technology,
          public-facing guidance, small-business operations, cultural infrastructure, community
          systems, and source-backed knowledge practices.
        </p>
        <p>
          My work is strongest in under-structured environments: places where the need is real,
          but the requirements, workflows, documentation, ownership, and handoffs are not yet
          clear. I help translate that ambiguity into usable systems.
        </p>
      </section>

      <section aria-labelledby="roles-verbs" className="section-block">
        <p className="eyebrow">Roles / Verbs</p>
        <h2 id="roles-verbs">How the work shows up</h2>
        <div className="work-group-grid">
          <article className="work-group">
            <h3>Roles</h3>
            <div className="role-tags">
              {roles.map((role) => (
                <Tag key={role}>{role}</Tag>
              ))}
            </div>
          </article>
          <article className="work-group">
            <h3>Verbs</h3>
            <div className="role-tags">
              {verbs.map((verb) => (
                <Tag key={verb}>{verb}</Tag>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section aria-labelledby="working-method" className="section-block">
        <p className="eyebrow">Working method</p>
        <h2 id="working-method">A practical pattern</h2>
        <ul>
          <li>Clarify what is known.</li>
          <li>Name what is open.</li>
          <li>Protect what should remain private.</li>
          <li>Build what helps people act.</li>
          <li>Leave behind something maintainable.</li>
        </ul>
        <p className="lede">
          I am interested in the strange, practical work of helping people know what happened,
          what matters, and what to do next.
        </p>
      </section>

      <section aria-labelledby="domains" className="section-block">
        <p className="eyebrow">Domains</p>
        <h2 id="domains">Where this work has lived</h2>
        <div className="role-tags">
          {domains.map((domain) => (
            <Tag key={domain}>{domain}</Tag>
          ))}
        </div>
      </section>

      <section className="section-block final-cta" aria-labelledby="about-next">
        <h2 id="about-next">Next useful steps</h2>
        <div className="hero-actions">
          <ButtonLink href="/work">View selected work</ButtonLink>
          <ButtonLink href="/resume" variant="secondary">
            View resume
          </ButtonLink>
          <ButtonLink href="/contact" variant="quiet">
            Contact Jamie
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
