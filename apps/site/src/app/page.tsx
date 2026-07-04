import Link from "next/link";

import { WorkCard } from "@/components/WorkCard";
import { getFeaturedWorkItems, getStartHereItems } from "@/lib/work";

const proof = [
  "14+ years creating operating structure",
  "30+ pages of civic campaign-memory infrastructure",
  "Contributing to 2x revenue growth for a legacy e-commerce business",
  "35 city ecosystems reached through WOWList.org",
  "300+ gatherings / 20+ resident artists supported"
];

export default function HomePage() {
  const startHere = getStartHereItems();
  const featured = getFeaturedWorkItems();

  return (
    <>
      <section className="section-pad">
        <div className="container-page golden-grid">
          <div className="measure-wide">
            <p className="eyebrow mb-4">Technical Project Manager - Product Operations & Implementation</p>
            <h1 className="text-5xl font-black leading-[1.02] md:text-7xl">
              I create operating structure for complex public-facing teams.
            </h1>
            <p className="mt-6 max-w-3xl text-xl leading-9 text-[color:var(--jamie-muted)]">
              I help teams turn ambiguous, stakeholder-heavy work into usable systems:
              requirements, workflows, documentation, decision trails, launch support, onboarding,
              and durable handoffs.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="btn btn-primary" href="/work">View selected work</Link>
              <Link className="btn btn-outline" href="/resume">Download resume</Link>
              <Link className="btn btn-ghost" href="/contact">Contact Jamie</Link>
            </div>
          </div>
          <div className="artifact-panel" aria-hidden="true" />
        </div>
      </section>

      <section className="section-rule py-6" aria-label="Proof points">
        <div className="container-page">
          <ul className="grid gap-3 md:grid-cols-5">
            {proof.map((item) => (
              <li className="editorial-card px-4 py-4 text-sm font-bold leading-6" key={item}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-pad section-rule">
        <div className="container-page">
          <div className="measure mb-8">
            <p className="eyebrow mb-3">Start here</p>
            <h2 className="text-3xl font-black leading-tight md:text-4xl">The quickest path through the portfolio</h2>
            <p className="mt-4 text-lg leading-8 text-[color:var(--jamie-muted)]">
              New to my work? These pages give the fastest read on the operating pattern.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {startHere.map((item) => (
              <WorkCard item={item} compact key={item.slug} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad section-rule">
        <div className="container-page">
          <div className="measure mb-8">
            <p className="eyebrow mb-3">Selected systems</p>
            <h2 className="text-3xl font-black leading-tight md:text-4xl">Selected systems</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((item) => (
              <WorkCard item={item} key={item.slug} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad section-rule">
        <div className="container-page measure-wide">
          <h2 className="text-3xl font-black leading-tight">
            Operating backbone for under-structured work
          </h2>
          <p className="mt-5 text-lg leading-8 text-[color:var(--jamie-muted)]">
            Across client, civic, cultural, and public-facing projects, I build planning systems,
            decision logs, action trackers, source maps, onboarding materials, public guidance,
            runbooks, and handoff documentation.
          </p>
        </div>
      </section>
    </>
  );
}
