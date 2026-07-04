import type { Metadata } from "next";

import { ButtonLink } from "@/components/ButtonLink";
import { SectionHeading } from "@/components/SectionHeading";
import { TagList } from "@/components/TagList";
import { createMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = createMetadata({
  title: "About",
  description:
    "About Jamie Burkart, a Brooklyn-based technical project manager and implementation lead.",
  path: "/about"
});

const roles = [
  "Technical Project Manager",
  "Product Operations",
  "Civic Technologist",
  "Documentation Architect",
  "Systems Steward",
  "Community Infrastructure Builder"
];

const verbs = ["Clarify", "Coordinate", "Document", "Build", "Onboard", "Transfer", "Maintain"];

const methods = [
  "Clarify what is known.",
  "Name what is open.",
  "Protect what should remain private.",
  "Build what helps people act.",
  "Leave behind something maintainable."
];

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
    <div>
      <header className="section">
        <div className="container copy">
          <SectionHeading eyebrow="About" title="Jamie Burkart">
            <p>
              I’m Jamie Burkart, a technical project manager and implementation
              lead based in Brooklyn.
            </p>
          </SectionHeading>
          <p className="lead mt-6">
            For 14+ years, I have worked across web systems, e-commerce, civic
            technology, public-facing guidance, small-business operations,
            cultural infrastructure, community systems, and source-backed
            knowledge practices.
          </p>
          <p className="lead mt-5">
            My work is strongest in under-structured environments: places where
            the need is real, but the requirements, workflows, documentation,
            ownership, and handoffs are not yet clear. I help translate that
            ambiguity into usable systems.
          </p>
        </div>
      </header>
      <div className="container grid gap-8 pb-20">
        <section className="grid gap-6 md:grid-cols-2">
          <div className="card p-6">
            <h2 className="h3">Roles</h2>
            <div className="mt-5">
              <TagList tags={roles} />
            </div>
          </div>
          <div className="card p-6">
            <h2 className="h3">Verbs</h2>
            <div className="mt-5">
              <TagList tags={verbs} tone="warm" />
            </div>
          </div>
        </section>
        <section className="card p-6">
          <h2 className="h3">Working method</h2>
          <ul className="mt-5 grid gap-3 md:grid-cols-5">
            {methods.map((method) => (
              <li className="rounded-md bg-base-200 p-4 text-sm font-bold" key={method}>
                {method}
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="h3">Domains</h2>
          <div className="mt-5">
            <TagList tags={domains} />
          </div>
        </section>
        <section className="copy rounded-md border-l-4 border-primary bg-base-200 p-6">
          <p className="lead">
            I’m interested in the strange, practical work of helping people know
            what happened, what matters, and what to do next.
          </p>
        </section>
        <div className="flex flex-wrap gap-3">
          <ButtonLink download href={site.resumePath}>
            Download résumé
          </ButtonLink>
          <ButtonLink href={`mailto:${site.email}`} variant="secondary">
            Contact Jamie
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
