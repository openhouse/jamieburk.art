import type { Metadata } from "next";
import { LinkButton } from "@/components/link-button";
import { SectionHeading } from "@/components/section-heading";
import { TagList } from "@/components/tag-list";

export const metadata: Metadata = {
  title: "About",
  description:
    "Short professional bio for Jamie Burkart, technical project manager and implementation lead based in Brooklyn.",
};

const roles = [
  "Technical Project Manager",
  "Product Operations",
  "Civic Technologist",
  "Documentation Architect",
  "Systems Steward",
  "Community Infrastructure Builder",
];

const verbs = [
  "Clarify",
  "Coordinate",
  "Document",
  "Build",
  "Onboard",
  "Transfer",
  "Maintain",
];

const methods = [
  "Clarify what is known.",
  "Name what is open.",
  "Protect what should remain private.",
  "Build what helps people act.",
  "Leave behind something maintainable.",
];

export default function AboutPage() {
  return (
    <section className="container-reading section-pad">
      <SectionHeading
        eyebrow="About"
        title="Jamie Burkart"
        body="I am a technical project manager and implementation lead based in Brooklyn."
      />
      <div className="reading-flow mt-8">
        <p>
          For 14+ years, I have worked across web systems, e-commerce, civic
          technology, public-facing guidance, small-business operations,
          cultural infrastructure, community systems, and source-backed
          knowledge practices.
        </p>
        <p>
          My work is strongest in under-structured environments: places where
          the need is real, but the requirements, workflows, documentation,
          ownership, and handoffs are not yet clear. I help translate that
          ambiguity into usable systems.
        </p>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        <section className="rounded-md border border-base-300 bg-base-100 p-5">
          <h2 className="text-xl font-bold">Roles</h2>
          <div className="mt-4">
            <TagList tags={roles} tone="quiet" />
          </div>
        </section>
        <section className="rounded-md border border-base-300 bg-base-100 p-5">
          <h2 className="text-xl font-bold">Verbs</h2>
          <div className="mt-4">
            <TagList tags={verbs} />
          </div>
        </section>
      </div>
      <section className="mt-10 rounded-md border border-base-300 bg-base-100 p-5">
        <h2 className="text-xl font-bold">How I work</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-neutral">
          {methods.map((method) => (
            <li key={method}>{method}</li>
          ))}
        </ul>
      </section>
      <blockquote className="mt-10 border-l-4 border-primary pl-5 text-xl font-semibold leading-8">
        I am interested in the strange, practical work of helping people know
        what happened, what matters, and what to do next.
      </blockquote>
      <div className="mt-10 flex flex-wrap gap-3">
        <LinkButton href="/resume">View resume</LinkButton>
        <LinkButton href="/contact" variant="ghost">
          Contact
        </LinkButton>
      </div>
    </section>
  );
}
