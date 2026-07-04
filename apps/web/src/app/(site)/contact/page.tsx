import { ButtonLink } from "@/components/ButtonLink";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/data/site";

export const metadata = pageMetadata(
  "Contact",
  "Contact Jamie Burkart for roles, referrals, consulting conversations, or aligned collaborations."
);

export default function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <p className="eyebrow">Contact</p>
        <h1>Contact Jamie</h1>
        <p className="lede">
          For roles, referrals, consulting conversations, or collaborations, email Jamie.
        </p>
      </section>

      <section className="contact-box" aria-label="Contact details">
        <p className="eyebrow">Email</p>
        <p>
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </p>
        <p>Brooklyn, NY</p>
        <div className="hero-actions">
          <ButtonLink href={site.linkedin} variant="secondary">
            LinkedIn
          </ButtonLink>
          <ButtonLink href={site.github} variant="secondary">
            GitHub
          </ButtonLink>
          <ButtonLink href={site.resumePath} variant="quiet">
            Download resume PDF
          </ButtonLink>
        </div>
      </section>

      <section aria-labelledby="best-fit" className="section-block">
        <p className="eyebrow">Best-fit conversations</p>
        <h2 id="best-fit">Where this work fits</h2>
        <p>
          Technical project management, technical operations, product operations, implementation,
          civic/govtech delivery, documentation, knowledge systems, public-facing tools, and
          source-backed team memory.
        </p>
      </section>
    </>
  );
}
