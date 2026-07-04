import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { site } from "@/data/site";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Contact",
  description: "Contact Jamie Burkart for roles, referrals, consulting conversations, and collaborations.",
  path: "/contact"
});

export default function ContactPage() {
  return (
    <Section
      eyebrow="Contact"
      title="For roles, referrals, consulting conversations, or collaborations."
      intro="Best-fit conversations: technical project management, product operations, implementation, documentation systems, civic technology, govtech, knowledge systems, and public-facing tools."
    >
      <div className="contact-cta">
        <div>
          <p>Email Jamie at:</p>
          <h2>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </h2>
          <p>{site.location}</p>
        </div>
        <div>
          <p>
            <a href={site.links.linkedin}>LinkedIn</a>
          </p>
          <p>
            <a href={site.links.github}>GitHub</a>
          </p>
          <p>
            <a href={site.links.resume}>Resume PDF</a>
          </p>
        </div>
      </div>
    </Section>
  );
}
