import type { Metadata } from "next";
import { Section } from "@/components/sections";

export const metadata: Metadata = {
  title: "Colophon",
  description:
    "Build notes, privacy posture, accessibility, and design DNA for Jamie Burkart's portfolio."
};

export default function ColophonPage() {
  return (
    <>
      <section className="section">
        <div className="container stack-lg">
          <div className="prose-container stack">
            <p className="eyebrow">Colophon</p>
            <h1>Build notes</h1>
            <p className="lead">
              A small public note about the build, privacy posture, accessibility, and design DNA
              of this V1 proof site.
            </p>
          </div>
        </div>
      </section>

      <Section title="Build">
        <p className="copy">
          This site is a small, content-driven Next.js portfolio built with React, TypeScript,
          MDX content files, Tailwind CSS, and daisyUI.
        </p>
      </Section>

      <Section title="Privacy">
        <p className="copy">
          The site is public-safe by design. It does not publish private notes, raw transcripts,
          private coalition materials, personal financial, health, or therapeutic details, or
          unapproved collaborator material.
        </p>
      </Section>

      <Section title="Design DNA">
        <p className="copy">
          The color system draws from an oil-pastel palette originally matched to
          hardware-store paint cards. Broadway blue (#0b5f81) is used as the primary action
          color. Layout spacing borrows from a golden-ratio print-grid practice.
        </p>
      </Section>

      <Section title="Accessibility">
        <p className="copy">
          The site uses semantic HTML, visible focus states, readable contrast, keyboard
          navigation, descriptive text, and reduced-motion support.
        </p>
      </Section>

      <Section title="Current state">
        <p className="copy">
          This is a V1 proof site. Deeper writing, archive, lab notes, and source-backed methods
          may grow later.
        </p>
      </Section>
    </>
  );
}
