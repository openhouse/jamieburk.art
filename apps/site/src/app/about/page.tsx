import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Jamie Burkart's technical project management, product operations, documentation, civic technology, and implementation work."
};

export default function AboutPage() {
  return (
    <section className="section-pad">
      <div className="container-page golden-grid">
        <div className="content-flow measure-wide">
          <p className="eyebrow">About</p>
          <h1 className="text-4xl font-black leading-tight md:text-6xl">Jamie Burkart</h1>
          <p>
            I am a technical project manager and implementation lead based in Brooklyn.
          </p>
          <p>
            For 14+ years, I have worked across web systems, e-commerce, civic technology,
            public-facing guidance, small-business operations, cultural infrastructure, community
            systems, and source-backed knowledge practices.
          </p>
          <p>
            My work is strongest in under-structured environments: places where the need is real,
            but the requirements, workflows, documentation, ownership, and handoffs are not yet
            clear. I help translate that ambiguity into usable systems.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link className="btn btn-primary" href="/resume">Resume</Link>
            <Link className="btn btn-outline" href="/contact">Contact</Link>
          </div>
        </div>
        <aside className="grid gap-4">
          <div className="editorial-card p-5">
            <h2 className="text-xl font-black">Roles</h2>
            <p className="mt-3 leading-7 text-[color:var(--jamie-muted)]">
              Technical Project Manager / Product Operations / Civic Technologist / Documentation
              Architect / Systems Steward / Community Infrastructure Builder
            </p>
          </div>
          <div className="editorial-card p-5">
            <h2 className="text-xl font-black">Verbs</h2>
            <p className="mt-3 leading-7 text-[color:var(--jamie-muted)]">
              Clarify / Coordinate / Document / Build / Onboard / Transfer / Maintain
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
