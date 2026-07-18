import type { Metadata } from "next";
import { ContactCTA } from "@/components/ContactCTA";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "About - Jamie Burkart",
  description:
    "About Jamie Burkart, a Brooklyn-based technical project manager and implementation lead.",
  path: "/about"
});

export default function AboutPage() {
  return (
    <div className="jb-frame py-12">
      <div className="jb-reading">
        <h1 className="text-5xl font-bold text-jb-ink">About</h1>
        <div className="mt-8 space-y-6 text-xl leading-9 text-jb-ink/78">
          <p>
            I am Jamie Burkart, a technical project manager and implementation
            lead based in Brooklyn.
          </p>
          <p>
            My work sits where the stakes are human and the operating structure
            is still forming: civic technology, small-business operations,
            public-facing tools, cultural infrastructure, coalition work, and
            knowledge systems.
          </p>
          <p>
            Across projects, I tend to do the same kind of work: clarify
            ambiguous goals, translate between technical and nontechnical
            stakeholders, map workflows, build documentation, create usable
            interfaces, coordinate implementation, and leave behind handoffs
            people can use after the meeting or launch is over.
          </p>
          <p>
            I am currently focused on technical project management, product
            operations, implementation, business analysis, civic/govtech
            delivery, and source-backed knowledge systems.
          </p>
        </div>
        <section className="mt-12 border-t border-jb-ink/15 pt-8" aria-labelledby="practice-heading">
          <h2 className="text-3xl font-semibold text-jb-ink" id="practice-heading">
            A practice of attention and structure
          </h2>
          <div className="mt-5 space-y-5 text-lg leading-8 text-jb-ink/78">
            <p>
              The artistic, civic, technical, and social parts of my practice
              belong together. I approach systems as things people inhabit:
              places where attention, hospitality, and participation shape what
              becomes possible. I care not only whether a structure works, but
              whether it helps people find agency, connection, and room to
              contribute.
            </p>
            <p>
              Structure grows from the material and relationships already
              present. I look for latent patterns, make them inspectable through
              prototypes and shared artifacts, and build interfaces people can
              use to understand and change the system together. I learn from
              what happens in use and revise the structure without erasing the
              relationships that produced it.
            </p>
            <p>
              That is why I value public benefit, accessibility, source-backed
              memory, careful claims, collective credit, consent, privacy,
              repair, and documentation that helps future collaborators safely
              continue the work.
            </p>
          </div>
        </section>
      </div>
      <div className="mt-12 max-w-3xl">
        <ContactCTA />
      </div>
    </div>
  );
}
