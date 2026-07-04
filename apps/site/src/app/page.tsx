import Link from "next/link";

import { CapabilityGrid } from "@/components/capability-grid";
import { ContactCta } from "@/components/contact-cta";
import { Hero } from "@/components/hero";
import { ProofStrip } from "@/components/proof-strip";
import { WorkCard } from "@/components/work-card";
import { getFeaturedWorkItems } from "@/lib/content";

export default async function HomePage() {
  const featuredWork = await getFeaturedWorkItems();

  return (
    <>
      <Hero />
      <ProofStrip />
      <section className="section">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-wide text-primary">Capabilities</p>
          <h2 className="mt-3 text-3xl font-black leading-tight md:text-5xl">The recurring work</h2>
          <p className="mt-4 text-lg leading-8 text-base-content/70">
            Clarify the need. Structure the work. Build the useful system. Document the decisions. Transfer the
            memory.
          </p>
        </div>
        <div className="mt-8">
          <CapabilityGrid />
        </div>
      </section>
      <section className="section border-t quiet-rule">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-wide text-primary">Selected systems</p>
            <h2 className="mt-3 text-3xl font-black leading-tight md:text-5xl">Proof, close to the claim</h2>
          </div>
          <Link className="btn btn-outline rounded-lg" href="/work">
            View all work
          </Link>
        </div>
        <div className="case-grid mt-8">
          {featuredWork.map((item) => (
            <WorkCard key={item.meta.slug} work={item.meta} />
          ))}
        </div>
      </section>
      <section className="section border-t quiet-rule">
        <div className="grid gap-6 md:grid-cols-[1fr_20rem]">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-wide text-primary">Current lab</p>
            <h2 className="mt-3 text-3xl font-black leading-tight md:text-5xl">Source-Backed Team Memory</h2>
            <p className="mt-4 text-lg leading-8 text-base-content/70">
              I am developing a source-backed documentation practice for knowledge-heavy collaborations. The
              working principle is simple: AI can help draft and organize, but humans remain responsible for
              review, correction, acceptance, and public / internal boundaries.
            </p>
            <Link className="btn btn-primary mt-6 rounded-lg" href="/lab/source-backed-team-memory">
              Open lab page
            </Link>
          </div>
          <ContactCta />
        </div>
      </section>
    </>
  );
}
