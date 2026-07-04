import type { Metadata } from "next";
import { PublicSafetyNote } from "@/components/PublicSafetyNote";
import { Section } from "@/components/Section";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Colophon",
  description: "Technical, accessibility, privacy, and public-safety notes for jamieburk.art.",
  path: "/colophon"
});

export default function ColophonPage() {
  return (
    <>
      <Section eyebrow="Colophon" title="How this site is built">
        <div className="case-content">
          <h2>Stack</h2>
          <p>Built with Next.js App Router, React, TypeScript, MDX, Tailwind CSS, daisyUI, Node 26, and Dokku.</p>
          <h2>Accessibility</h2>
          <p>
            The V1 baseline uses semantic HTML, readable text size, keyboard navigation, visible focus states, responsive
            layouts, reduced-motion support, descriptive links, and public-safe alt-text expectations for future images.
          </p>
          <h2>Privacy and analytics</h2>
          <p>No invasive analytics. If analytics are added later, use privacy-preserving analytics only.</p>
          <h2>Content workflow</h2>
          <p>
            Work items live in MDX. Status and visibility are controlled by exported metadata. Sensitive pages require
            Jamie approval before publication.
          </p>
        </div>
      </Section>
      <Section>
        <PublicSafetyNote>
          This site summarizes relational, civic, and client work using public-safe materials. Private correspondence,
          raw transcripts, coalition notes, legal-review materials, attendance records, and unapproved names or images
          are intentionally omitted.
        </PublicSafetyNote>
      </Section>
    </>
  );
}
