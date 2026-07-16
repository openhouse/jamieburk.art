import type { Metadata } from "next";
import { ContactCTA } from "@/components/ContactCTA";
import { requireReadyOrCarefulProof } from "@/data/proofs";
import { createMetadata } from "@/lib/metadata";

const creativeTechnologyProof = requireReadyOrCarefulProof(
  "creative-technology-embodied-systems"
);

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
            emerging goals, translate between technical and nontechnical
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
        <section aria-labelledby="material-structure" className="mt-12 border-t border-jb-ink/15 pt-10">
          <p className="text-sm font-semibold uppercase text-jb-blue">
            A longer practice
          </p>
          <h2 className="mt-3 text-3xl font-bold text-jb-ink" id="material-structure">
            Structure grows from the material
          </h2>
          <div className="mt-5 space-y-5 text-lg leading-8 text-jb-ink/76">
            <p>
              My work has long moved among artistic, civic, technical, and social
              practice. At UCSC, I studied how social structure could become a
              usable interface: I analyzed recursively overlapping Flickr groups,
              prototyped a related-image system, and built an interactive model in
              Max/MSP and Jitter before helping carry the idea into a collaborative
              spatial-installation design.
            </p>
            <p>{creativeTechnologyProof.publicWording}</p>
            <p>
              That history still shapes my attention to participation, memory,
              place, and how people inhabit structures. It is why I approach an
              operating system as something that must grow from its people and
              materials, not as a template imposed from elsewhere.
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
      </div>
      <div className="mt-12 max-w-3xl">
        <ContactCTA />
      </div>
    </div>
  );
}
