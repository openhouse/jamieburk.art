import type { Metadata } from "next";
import { ContactCTA } from "@/components/contact-cta";
import { Section } from "@/components/section";
import { site } from "@/lib/site";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Contact",
  description: "Contact path for roles, referrals, civic/public-interest work, and implementation conversations.",
  path: "/contact"
});

export default function ContactPage() {
  return (
    <Section
      eyebrow="Contact"
      title="For roles, referrals, and useful public-facing systems."
      intro="Best fits: technical operations, product operations, implementation, civic/public-interest technology, documentation, and knowledge systems."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
        <div className="prose-measure text-lg leading-8 text-base-content/75">
          <p>
            Reach out about full-time roles, contract implementation work, public-interest technology,
            documentation systems, launch support, knowledge infrastructure, or referrals where the
            work is important and under-structured.
          </p>
          <p className="mt-5">
            Public email for this scaffold:{" "}
            <a className="font-black text-primary" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            . Confirm the final public email before launch.
          </p>
        </div>
        <ContactCTA />
      </div>
    </Section>
  );
}
