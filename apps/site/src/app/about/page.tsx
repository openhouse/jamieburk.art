import type { Metadata } from "next";
import { ContactCTA } from "@/components/ContactCTA";
import { Section } from "@/components/Section";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "About",
  description: "About Jamie Burkart's technical project management, implementation, and knowledge-systems work.",
  path: "/about"
});

export default function AboutPage() {
  return (
    <>
      <Section
        eyebrow="About"
        title="Jamie Burkart is a technical project manager and implementation lead based in Brooklyn."
        intro="My work sits where systems are under-structured and the stakes are human: civic technology, small-business operations, public-facing tools, cultural infrastructure, coalition work, and knowledge systems."
      >
        <div className="case-content">
          <p>
            Across projects, I tend to do the same kind of work: clarify ambiguous goals, translate between technical
            and nontechnical stakeholders, map workflows, build documentation, create usable interfaces, coordinate
            implementation, and leave behind handoffs people can use after the meeting or launch is over.
          </p>
          <p>
            I am currently focused on technical project management, product operations, implementation, business
            analysis, civic/govtech delivery, and source-backed knowledge systems.
          </p>
        </div>
      </Section>
      <Section title="Values and boundaries">
        <div className="case-content">
          <p>
            I value public benefit, accessibility, source-backed memory, careful claims, collective credit, consent,
            privacy, repair, and documentation that helps future collaborators safely continue the work.
          </p>
        </div>
      </Section>
      <Section>
        <ContactCTA />
      </Section>
    </>
  );
}
