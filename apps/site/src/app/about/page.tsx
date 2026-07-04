import type { Metadata } from "next";

import { ContactCta } from "@/components/contact-cta";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description: "About Jamie Burkart's technical project management and implementation practice.",
  pathname: "/about"
});

export default function AboutPage() {
  return (
    <section className="section">
      <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
        <div className="prose-jamie">
          <p className="text-sm font-bold uppercase tracking-wide text-primary">About</p>
          <h1 className="text-4xl font-black leading-tight md:text-6xl">Clear systems for meaningful work</h1>
          <p>
            Jamie Burkart is a technical project manager and implementation lead who builds operating structure
            for ambiguous public-facing technical work.
          </p>
          <p>
            His work often sits between teams, records, tools, public communication, stakeholder needs, and the
            practical realities of launch and handoff.
          </p>
          <h2>Working method</h2>
          <p>Clarify the need. Structure the work. Build the useful system. Document the decisions. Transfer the memory.</p>
          <h2>Good fit</h2>
          <p>
            Civic technology, product operations, implementation management, public-interest tools, knowledge
            systems, documentation infrastructure, and public-facing workflows that need calm structure.
          </p>
        </div>
        <ContactCta />
      </div>
    </section>
  );
}
