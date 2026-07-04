import type { Metadata } from "next";
import Link from "next/link";
import { ContactCTA } from "@/components/ContactCTA";
import { ResumeCTA } from "@/components/ResumeCTA";
import { getAllWork } from "@/lib/content";

export const metadata: Metadata = {
  title: "Technical Operations Proof",
  description:
    "A role-specific view of Jamie Burkart's technical project management, product operations, implementation, documentation, and launch support work."
};

export default function TechnicalOperationsPage() {
  const work = getAllWork();
  const capabilities = Array.from(new Set(work.flatMap((entry) => entry.capabilities))).sort();

  return (
    <>
      <section className="section border-b hairline bg-base-100/80">
        <div className="main-field measure">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-broadway-blue">
            Technical operations
          </p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight text-jamie-ink">
            Operating structure for ambiguous public-facing technical work.
          </h1>
          <p className="mt-5 text-lg leading-8 text-jamie-muted">
            This page extracts the hiring-manager-friendly pattern from the case studies: where
            work was under-structured, Jamie helped make it usable, documented, launchable, and
            transferable.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="main-field grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="measure">
            <h2 className="text-3xl font-semibold text-jamie-ink">Operating systems built</h2>
            <p className="mt-4 leading-7 text-jamie-muted">
              Across small business, civic-data prototypes, coalition documentation, community
              systems, and source-backed team memory, the pattern is consistent: clarify the need,
              map the moving pieces, build the useful public or internal surface, and leave a
              reliable handoff.
            </p>
          </div>
          <div className="proof-grid">
            {[
              "Delivery and launch",
              "Documentation and working memory",
              "Public-facing web systems",
              "Requirements and workflow mapping"
            ].map((item) => (
              <article className="system-card p-5" key={item}>
                <h3 className="text-xl font-semibold text-jamie-ink">{item}</h3>
                <p className="mt-3 text-sm leading-6 text-jamie-muted">
                  Supported through selected case studies, public-safe summaries, and visible
                  privacy boundaries.
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section border-y hairline bg-base-100/82">
        <div className="main-field">
          <h2 className="text-3xl font-semibold text-jamie-ink">Tools and technical environments</h2>
          <ul className="mt-6 flex flex-wrap gap-2">
            {capabilities.map((capability) => (
              <li
                className="rounded border border-jamie-line/70 bg-base-200 px-3 py-2 text-sm text-jamie-muted"
                key={capability}
              >
                {capability}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Link className="btn btn-primary" href="/work">
              Review selected work
            </Link>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="main-field">
          <ResumeCTA />
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
