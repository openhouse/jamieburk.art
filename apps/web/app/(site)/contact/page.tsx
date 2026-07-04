import type { Metadata } from "next";
import Link from "next/link";
import { siteMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Jamie Burkart for technical project management, product operations, implementation, documentation, and public-facing systems work."
};

export default function ContactPage() {
  return (
    <section className="section">
      <div className="main-field grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="measure">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-broadway-blue">
            Contact
          </p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight text-jamie-ink">
            Send the context and what needs to become usable.
          </h1>
          <p className="mt-5 text-lg leading-8 text-jamie-muted">
            Good starting points: the system, the audience, the current ambiguity, the deadline,
            the handoff, and any privacy boundaries that matter.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a className="btn btn-primary" href={`mailto:${siteMetadata.email}`}>
              {siteMetadata.email}
            </a>
            <Link className="btn btn-outline" href="/work">
              View work
            </Link>
          </div>
        </div>
        <div className="system-card p-5">
          <h2 className="text-2xl font-semibold text-jamie-ink">Useful context to include</h2>
          <ul className="mt-5 list-disc space-y-3 pl-5 leading-7 text-jamie-muted">
            <li>What is unclear, blocked, undocumented, or hard to coordinate?</li>
            <li>Who needs to use the system, handoff, guide, or public-facing tool?</li>
            <li>What should be public, redacted, summary-only, or private?</li>
            <li>What would make the next meeting, launch, onboarding, or decision easier?</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
