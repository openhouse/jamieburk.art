import type { Metadata } from "next";
import { Claim, References } from "@/components/citations";
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
        <section className="mt-12 border-t border-jb-blue/20 pt-10">
          <h2 className="text-3xl font-semibold text-jb-ink">
            How I arrived here
          </h2>
          <div className="mt-5 space-y-5 text-lg leading-8 text-jb-ink/78">
            <Claim
              as="p"
              claimId="CLM-OPEN-HOUSE-PARTICIPATORY-SYSTEM-2006"
              occurrenceId="artistic-social-systems-lineage"
              pageId="about"
              projection="about"
              surface="/about"
            />
            <p>
              Before I had product-operations language for this work, I was
              learning to treat a system as more than a workflow. It is also a
              place people inhabit, a set of relationships made visible, and an
              invitation to participate.
            </p>
            <p>
              That lineage still matters. Across WOW List, CallNYC, and
              source-backed team memory, the recurring move is to listen for
              relationships already present, prototype a shared representation
              or interface, and make collective context easier to perceive,
              use, and revise.
            </p>
            <p>
              That is why I pay attention to atmosphere and trust alongside
              interfaces, decisions, and handoffs.
            </p>
          </div>
        </section>
        <div className="mt-10 rounded-lg border border-jb-blue/25 bg-jb-sky/15 p-5">
          <p className="leading-8 text-jb-ink/78">
            I value public benefit, accessibility, source-backed memory, careful
            claims, collective credit, consent, privacy, repair, and
            documentation that helps future collaborators safely continue the
            work.
          </p>
        </div>
        <References pageId="about" />
      </div>
      <div className="mt-12 max-w-3xl">
        <ContactCTA />
      </div>
    </div>
  );
}
