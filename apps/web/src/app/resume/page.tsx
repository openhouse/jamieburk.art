import type { Metadata } from "next";
import { siteConfig } from "@jamie/site-content/site";
import { CTAButton } from "@/components/ui";
import { Section } from "@/components/sections";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Download Jamie Burkart's resume for Technical Project Manager - Product Operations & Implementation roles."
};

const highlights = [
  "Technical project management and implementation across public-facing systems.",
  "E-commerce, analytics, marketing, content, and operational workflow modernization.",
  "Civic campaign-memory infrastructure, source maps, public guidance, and stakeholder follow-up systems.",
  "Public-facing web tools, documentation systems, onboarding materials, and durable handoffs."
];

export default function ResumePage() {
  return (
    <>
      <section className="section">
        <div className="container stack-lg">
          <div className="prose-container stack">
            <p className="eyebrow">Resume</p>
            <h1>Technical Project Manager - Product Operations & Implementation</h1>
            <p className="lead">
              Download Jamie Burkart&apos;s resume for technical project management, product
              operations, implementation, business analysis, civic/govtech delivery, and
              knowledge-systems roles.
            </p>
          </div>
          <div className="cluster">
            <CTAButton href={siteConfig.resumePath}>Download resume PDF</CTAButton>
            <CTAButton href="/contact" variant="secondary">
              Contact Jamie
            </CTAButton>
          </div>
        </div>
      </section>

      <Section title="Selected impact highlights">
        <ul className="grid grid-2">
          {highlights.map((highlight) => (
            <li className="card" key={highlight}>
              {highlight}
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
