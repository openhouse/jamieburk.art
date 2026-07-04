import type { Metadata } from "next";
import { Section } from "@/components/sections";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Jamie Burkart, a technical project manager and implementation lead based in Brooklyn."
};

export default function AboutPage() {
  return (
    <>
      <section className="section">
        <div className="container stack-lg">
          <div className="prose-container stack">
            <p className="eyebrow">About</p>
            <h1>Jamie Burkart</h1>
            <p className="lead">
              I am a technical project manager and implementation lead based in Brooklyn.
            </p>
          </div>
        </div>
      </section>

      <Section title="Work posture">
        <div className="prose-container mdx-body">
          <p>
            My work sits where systems are under-structured and the stakes are human: civic
            technology, small-business operations, public-facing tools, cultural infrastructure,
            coalition work, and knowledge systems.
          </p>
          <p>
            Across projects, I tend to do the same kind of work: clarify ambiguous goals,
            translate between technical and nontechnical stakeholders, map workflows, build
            documentation, create usable interfaces, coordinate implementation, and leave behind
            handoffs people can use after the meeting or launch is over.
          </p>
          <p>
            I am currently focused on technical project management, product operations,
            implementation, business analysis, civic/govtech delivery, and source-backed
            knowledge systems.
          </p>
        </div>
      </Section>

      <Section title="Values and boundaries">
        <div className="note">
          <p>
            I value public benefit, accessibility, source-backed memory, careful claims,
            collective credit, consent, privacy, repair, and documentation that helps future
            collaborators safely continue the work.
          </p>
        </div>
      </Section>
    </>
  );
}
