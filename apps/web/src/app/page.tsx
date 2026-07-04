import Link from 'next/link';
import { CapabilityGrid } from '@/components/CapabilityGrid';
import { ContactCTA } from '@/components/ContactCTA';
import { Hero } from '@/components/Hero';
import { ProofStrip } from '@/components/ProofStrip';
import { StartHere } from '@/components/StartHere';
import { WorkCard } from '@/components/WorkCard';
import { getFeaturedWorkEntries } from '@/lib/content';

export default function HomePage() {
  const featured = getFeaturedWorkEntries();

  return (
    <>
      <Hero />
      <StartHere />
      <ProofStrip />
      <CapabilityGrid />
      <section className="golden-shell py-16">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Selected systems</p>
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">Proof that structure can carry the work forward.</h2>
          </div>
          <Link className="btn btn-outline" href="/work">
            View all work
          </Link>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {featured.map((entry) => (
            <WorkCard key={entry.slug} entry={entry} />
          ))}
        </div>
      </section>
      <section className="golden-shell py-16">
        <div className="golden-aside-layout border-y border-base-content/10 py-12">
          <p className="eyebrow">Operating backbone</p>
          <div>
            <h2 className="text-3xl font-semibold">Operating backbone for under-structured work</h2>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-base-content/75">
              Across client, civic, cultural, and public-facing projects, I build the practices that help teams stay oriented: planning systems,
              decision logs, action trackers, source maps, onboarding materials, stakeholder updates, public guidance, runbooks, and handoff
              documentation.
            </p>
            <Link className="btn btn-primary mt-6" href="/work/technical-operations">
              View Technical Operations proof
            </Link>
          </div>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}

