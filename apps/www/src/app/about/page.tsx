import type { Metadata } from "next";
import Link from "next/link";
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
            I am a technical project manager and implementation lead based in
            Brooklyn. I help public-facing teams turn emerging, stakeholder-heavy
            work into clear requirements, workflows, decision records,
            documentation, onboarding materials, launch support, and durable
            handoffs.
          </p>
          <p>
            My strongest work is in civic, small-business, cultural, and
            technical environments where the work matters, the stakeholders are
            many, and the operating system has not yet caught up to the need.
          </p>
          <p>
            Across projects, I tend to do the same kind of work: clarify
            goals as they take shape, translate between technical and
            nontechnical stakeholders, map workflows, build documentation,
            create usable interfaces, coordinate implementation, and leave
            behind handoffs people can use after the meeting or launch is over.
          </p>
          <p>
            I am currently focused on technical project management, product
            operations, implementation, business analysis, civic/govtech
            delivery, and source-backed knowledge systems.
          </p>
        </div>
        <div className="mt-10 rounded-lg border border-jb-blue/25 bg-jb-sky/15 p-5">
          <p className="leading-8 text-jb-ink/78">
            I value public benefit, accessibility, careful claims, collective
            credit, consent, privacy, and documentation that lets future
            collaborators safely continue the work.
          </p>
        </div>
        <div className="mt-8">
          <Link
            className="font-semibold text-jb-blue hover:text-jb-green"
            href="/work/technical-operations"
          >
            Start with the Technical Operations proof page
          </Link>
        </div>
      </div>
      <div className="mt-12 max-w-3xl">
        <ContactCTA />
      </div>
    </div>
  );
}
