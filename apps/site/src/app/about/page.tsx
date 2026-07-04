import type { Metadata } from "next";
import { ContactCTA } from "@/components/ContactCTA";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description: "About Jamie Burkart, a Brooklyn-based technical project manager and systems builder.",
  path: "/about"
});

export default function AboutPage() {
  return (
    <section className="section-pad">
      <div className="container-page grid gap-10 md:grid-cols-[1fr_20rem]">
        <div className="max-w-3xl">
          <p className="eyebrow mb-3">About</p>
          <h1 className="text-4xl font-black leading-tight md:text-6xl">I build usable systems for under-structured work.</h1>
          <div className="mt-8 grid gap-5 text-lg leading-8 text-[color:var(--color-muted)]">
            <p>
              I am Jamie Burkart, a Brooklyn-based technical project manager and systems builder.
            </p>
            <p>
              For 14+ years through THICK ARTS, I have worked across web systems, e-commerce,
              civic technology, documentation infrastructure, public-facing guidance,
              small-business operations, cultural organizations, and community systems.
            </p>
            <p>
              My work is strongest in under-structured environments: places where stakeholders know
              something needs to work better, but the requirements, workflows, documentation, and
              handoffs are not yet clear.
            </p>
            <p>
              I help translate that ambiguity into usable systems. Depending on the project, that
              may mean mapping workflows, defining requirements, building web tools, organizing
              public data, creating documentation architecture, supporting implementation,
              coordinating stakeholders, or leaving a team with templates and handoffs they can keep
              using.
            </p>
            <p>
              I value public benefit, accessibility, source-backed memory, careful claims,
              collective credit, consent, privacy, repair, and documentation that helps future
              collaborators safely continue the work.
            </p>
          </div>
        </div>
        <ContactCTA />
      </div>
    </section>
  );
}
