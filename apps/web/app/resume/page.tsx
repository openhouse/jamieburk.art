import type { Metadata } from "next";

import { ButtonLink } from "@/components/ButtonLink";
import { ResumeDownload } from "@/components/ResumeDownload";
import { SectionHeading } from "@/components/SectionHeading";
import { createMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = createMetadata({
  title: "Résumé",
  description:
    "Download Jamie Burkart's resume for technical project management, product operations, implementation, business analysis, civic technology, knowledge systems, and public-sector-adjacent digital delivery roles.",
  path: "/resume"
});

const highlights = [
  "14+ years creating operating structure across web systems, civic technology, cultural infrastructure, and small-business operations.",
  "Contributed to 2x revenue growth for a legacy e-commerce business through web, analytics, content, and operational support.",
  "Built and stewarded 30+ pages of civic campaign-memory infrastructure for Commercial Rent Stabilization work.",
  "Co-built public-facing community and civic prototypes spanning open data, organizer workflows, and source-backed documentation."
];

export default function ResumePage() {
  return (
    <div>
      <header className="section">
        <div className="container golden-split">
          <SectionHeading eyebrow="Résumé" title="Technical Project Manager">
            <p>
              Download Jamie Burkart’s résumé for Technical Project Manager,
              Technical Operations, Product Operations, Implementation, Business
              Analysis, Civic Technology, Knowledge Systems, and
              public-sector-adjacent digital delivery roles.
            </p>
          </SectionHeading>
          <ResumeDownload />
        </div>
      </header>
      <div className="container grid gap-8 pb-20">
        <section className="card p-6">
          <h2 className="h3">Selected impact highlights</h2>
          <ul className="mt-5 list-disc space-y-3 pl-5 text-muted">
            {highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </section>
        <section className="flex flex-wrap gap-3">
          <ButtonLink href={`mailto:${site.email}`}>Email Jamie</ButtonLink>
          <ButtonLink href={site.githubUrl} variant="secondary">
            GitHub
          </ButtonLink>
          {site.linkedinUrl ? (
            <ButtonLink href={site.linkedinUrl} variant="ghost">
              LinkedIn
            </ButtonLink>
          ) : null}
        </section>
      </div>
    </div>
  );
}
