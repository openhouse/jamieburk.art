import type { Metadata } from "next";
import { ContactCTA } from "@/components/ContactCTA";
import { site } from "@/data/site";
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
            {site.referrerSentence}
          </p>
          <p>
            My work sits where goals are high-context and loosely defined:
            civic technology, small-business operations, public-facing tools,
            cultural infrastructure, coalition work, and knowledge systems.
          </p>
          <p>
            Across projects, I tend to do the same kind of work: clarify
            ambiguous goals, translate between technical and nontechnical
            stakeholders, map workflows, build documentation, create usable
            interfaces, coordinate implementation, and leave behind handoffs
            people can use after the meeting or launch is over.
          </p>
          <p>
            I am currently focused on technical project management, technical
            operations, product operations, implementation, business analysis,
            civic technology delivery, and source-backed knowledge systems.
          </p>
          <p>
            In NYC Artist Coalition / FairRentNYC work, my public-safe role is
            co-founder and civic-systems, documentation, and policy-communications
            lead. The work turns cultural-space advocacy into usable civic
            infrastructure: campaign pages, explainers, source maps, running
            minutes, action systems, public-data framing, and careful handoffs.
          </p>
        </div>
        <div className="mt-10 rounded-lg border border-jb-blue/25 bg-jb-sky/15 p-5">
          <p className="leading-8 text-jb-ink/78">
            I value public benefit, accessibility, source-backed memory, careful
            claims, collective credit, consent, privacy, repair, and
            documentation that helps future collaborators safely continue the
            work.
          </p>
        </div>
      </div>
      <div className="mt-12 max-w-3xl">
        <ContactCTA />
      </div>
    </div>
  );
}
