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
          <section className="border-y border-jb-blue/20 py-6">
            <h2 className="text-2xl font-semibold text-jb-ink">
              A practice of attention
            </h2>
            <div className="mt-4 space-y-4">
              <p>
                My practice began in participatory media and social software,
                where code, interfaces, prototypes, installations, gatherings,
                and public situations were ways to understand a system by
                entering it. I still keep artistic, civic, technical, and
                social work connected: embodied inquiry, participation,
                memory, place, atmosphere, hospitality, and how people inhabit
                a structure all shape what I build.
              </p>
              <p>
                I work recursively: follow relationships across systems, make
                hidden structures visible, test a source-backed analysis
                through a prototype or usable process, and then test it with
                people in real settings. That cycle turns observation into
                working form and use into further learning.
              </p>
            </div>
          </section>
          <p>
            I am seeking technical project management, product operations, and
            implementation work with teams navigating consequential change. I
            can take ownership of the connective layer: requirements,
            dependencies, workflows, risk, decision records, launch support,
            onboarding, and maintainable handoffs.
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
