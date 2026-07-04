import type { Metadata } from "next";
import { ContactCTA } from "@/components/contact-cta";
import { Section } from "@/components/section";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "About",
  description: "Short professional about page for Jamie Burkart.",
  path: "/about"
});

export default function AboutPage() {
  return (
    <Section
      eyebrow="About"
      title="Jamie creates operating structure for complex public-facing teams."
      intro="Technical Project Manager - Product Operations & Implementation, based in Brooklyn."
    >
      <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="prose-measure text-lg leading-8 text-base-content/75">
          <p>
            I help teams turn ambiguous, stakeholder-heavy work into usable systems: requirements,
            workflows, documentation, decision trails, public tools, launch support, onboarding,
            source-backed memory, and durable handoffs.
          </p>
          <p className="mt-5">
            My work often sits between public-facing systems and the operating structure behind them.
            I am most useful when teams need someone to listen across contexts, clarify what is known
            and unknown, build practical tools or documents, and leave behind a record people can use.
          </p>
          <p className="mt-5">
            The deeper practice includes civic memory, rooms, knowledge systems, artist
            infrastructure, source-backed AI, and documentation as care. The professional doorway stays
            clear: technical operations, product operations, implementation, and handoff.
          </p>
        </div>
        <ContactCTA />
      </div>
    </Section>
  );
}
