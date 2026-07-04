import type { Metadata } from "next";
import { CapabilityGrid } from "@/components/CapabilityGrid";
import { ContactCTA } from "@/components/ContactCTA";

export const metadata: Metadata = {
  title: "About",
  description:
    "Short professional bio and working method for Jamie Burkart, technical project manager and implementation lead."
};

export default function AboutPage() {
  return (
    <>
      <section className="section border-b hairline bg-base-100/80">
        <div className="main-field measure">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-broadway-blue">
            About
          </p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight text-jamie-ink">
            Technical project manager, implementation lead, and public-systems translator.
          </h1>
          <p className="mt-5 text-lg leading-8 text-jamie-muted">
            Jamie Burkart builds operating structure across civic, cultural, small-business,
            public-interest, and technical work. The practice centers on requirements, workflows,
            documentation, decision trails, launch support, onboarding, public-facing tools,
            source-backed memory, and durable handoffs.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="main-field grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="text-3xl font-semibold text-jamie-ink">Working method</h2>
            <p className="mt-4 leading-7 text-jamie-muted">
              Clarify the need. Structure the work. Build the useful system. Document the
              decisions. Transfer the memory.
            </p>
          </div>
          <CapabilityGrid />
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
