import type { Metadata } from "next";

import { ButtonLink } from "@/components/ButtonLink";
import { SectionHeading } from "@/components/SectionHeading";
import { createMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = createMetadata({
  title: "Contact",
  description:
    "Contact Jamie Burkart for roles, referrals, consulting conversations, and collaborations.",
  path: "/contact"
});

export default function ContactPage() {
  return (
    <div>
      <header className="section">
        <div className="container copy">
          <SectionHeading eyebrow="Contact" title="Start a conversation">
            <p>
              For roles, referrals, consulting conversations, or collaborations,
              email Jamie at{" "}
              <a className="font-black" href={`mailto:${site.email}`}>
                {site.email}
              </a>
              .
            </p>
          </SectionHeading>
        </div>
      </header>
      <div className="container grid gap-8 pb-20 md:grid-cols-[0.618fr_0.382fr]">
        <section className="card p-6">
          <h2 className="h3">Best-fit conversations</h2>
          <p className="mt-4 text-muted">
            Technical project management, technical operations, product
            operations, implementation, civic/govtech delivery, documentation,
            knowledge systems, public-facing tools, and source-backed team
            memory.
          </p>
        </section>
        <section className="card p-6">
          <h2 className="h3">Links</h2>
          <div className="mt-5 flex flex-col gap-3">
            <ButtonLink href={`mailto:${site.email}`}>Email</ButtonLink>
            <ButtonLink download href={site.resumePath} variant="secondary">
              Résumé PDF
            </ButtonLink>
            <ButtonLink href={site.githubUrl} variant="ghost">
              GitHub
            </ButtonLink>
          </div>
          <p className="mt-5 text-sm font-bold text-muted">{site.location}</p>
        </section>
      </div>
    </div>
  );
}
