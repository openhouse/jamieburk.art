import type { Metadata } from "next";
import { ContactCTA } from "@/components/ContactCTA";
import { ResumeDownload } from "@/components/ResumeDownload";
import { Section } from "@/components/Section";
import { site } from "@/data/site";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Resume",
  description: "Resume page for Jamie Burkart, technical project manager focused on product operations and implementation.",
  path: "/resume"
});

export default function ResumePage() {
  return (
    <>
      <Section eyebrow="Resume" title="Resume" intro={site.title}>
        <ResumeDownload />
      </Section>
      <Section title="Links">
        <div className="case-content">
          <p>
            <a href={site.links.linkedin}>LinkedIn</a> · <a href={site.links.github}>GitHub</a> ·{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
          <p>No home address or phone number is published on this site.</p>
        </div>
      </Section>
      <Section>
        <ContactCTA />
      </Section>
    </>
  );
}
