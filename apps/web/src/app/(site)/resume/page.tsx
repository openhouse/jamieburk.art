import { ButtonLink } from "@/components/ButtonLink";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/data/site";

export const metadata = pageMetadata(
  "Resume",
  "Download Jamie Burkart's resume for technical project management, technical operations, product operations, implementation, civic technology, and knowledge systems roles."
);

const highlights = [
  "14+ years creating operating structure across civic, cultural, small-business, public-facing, and technical environments.",
  "Technical project management and implementation across web systems, e-commerce, documentation, and public-facing tools.",
  "Public-safe civic documentation, source maps, decision records, action trackers, and campaign-memory infrastructure.",
  "Comfortable translating ambiguous stakeholder-heavy work into durable workflows, onboarding, and handoffs."
];

export default function ResumePage() {
  return (
    <>
      <section className="page-hero">
        <p className="eyebrow">Resume</p>
        <h1>Resume</h1>
        <p className="lede">
          Download Jamie Burkart&apos;s resume for Technical Project Manager, Technical Operations,
          Product Operations, Implementation, Business Analysis, Civic Technology, Knowledge
          Systems, and public-sector-adjacent digital delivery roles.
        </p>
        <div className="hero-actions">
          <ButtonLink href={site.resumePath}>Download resume PDF</ButtonLink>
          <ButtonLink href={site.linkedin} variant="secondary">
            LinkedIn
          </ButtonLink>
          <ButtonLink href={site.github} variant="quiet">
            GitHub
          </ButtonLink>
        </div>
      </section>

      <section aria-labelledby="impact-highlights" className="section-block">
        <p className="eyebrow">Selected impact</p>
        <h2 id="impact-highlights">Highlights</h2>
        <div className="resume-highlights">
          {highlights.map((highlight) => (
            <p className="resume-highlight" key={highlight}>
              {highlight}
            </p>
          ))}
        </div>
      </section>

      <section aria-labelledby="resume-note" className="section-block public-safety-note">
        <p className="eyebrow">Launch note</p>
        <h2 id="resume-note">Approved PDF needed before production</h2>
        <p>
          The site reserves the recommended public path for the resume PDF. Replace the scaffold
          placeholder with Jamie&apos;s approved resume before final production launch.
        </p>
      </section>
    </>
  );
}
