import type { Metadata } from "next";
import { CapabilityGrid } from "@/components/CapabilityGrid";
import { ContactCTA } from "@/components/ContactCTA";
import { Hero } from "@/components/Hero";
import { ProofStrip } from "@/components/ProofStrip";
import { ResumeCTA } from "@/components/ResumeCTA";
import { VisibilityNote } from "@/components/VisibilityNote";
import { WorkCard } from "@/components/WorkCard";
import { getFeaturedWork } from "@/lib/content";

export const metadata: Metadata = {
  title: "Jamie Burkart - Technical Project Manager",
  description:
    "Selected professional proof site for technical project management, product operations, implementation, documentation, civic technology, and public-facing systems."
};

export default function HomePage() {
  const featuredWork = getFeaturedWork();

  return (
    <>
      <Hero />
      <ProofStrip />
      <section className="section">
        <div className="main-field">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-broadway-blue">
                Working method
              </p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight text-jamie-ink">
                Clarify the need. Structure the work. Build the useful system.
              </h2>
              <p className="mt-5 leading-7 text-jamie-muted">
                The site is selected proof, not a total archive: enough context for a recruiter,
                hiring manager, warm referrer, civic-tech peer, or implementation lead to understand
                what Jamie does in under a minute.
              </p>
            </div>
            <CapabilityGrid />
          </div>
        </div>
      </section>
      <section className="section border-y hairline bg-base-100/82">
        <div className="main-field">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div className="measure">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-broadway-blue">
                Selected systems
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-jamie-ink">
                Public-safe proof nearby.
              </h2>
              <p className="mt-4 leading-7 text-jamie-muted">
                Each card names the ambiguity, the usable structure that followed, and the
                professional pattern it demonstrates.
              </p>
            </div>
            <VisibilityNote />
          </div>
          <div className="proof-grid mt-8">
            {featuredWork.map((work) => (
              <WorkCard key={work.slug} work={work} />
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="main-field grid gap-6 md:grid-cols-2">
          <ResumeCTA />
          <div className="system-card p-5">
            <h2 className="text-xl font-semibold text-jamie-ink">Source-Backed Team Memory</h2>
            <p className="mt-3 leading-7 text-jamie-muted">
              A lab page frames the early prototype practice carefully: AI drafts, humans review,
              and the shared record remains inspectable and correctable.
            </p>
            <a className="mt-5 inline-flex font-semibold" href="/lab/source-backed-team-memory">
              Visit the lab
            </a>
          </div>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
