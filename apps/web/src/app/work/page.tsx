import type { Metadata } from 'next';
import { WorkCard } from '@/components/WorkCard';
import { getPublicWorkEntries, getWorkTags } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Selected Work',
  description: 'Selected proof of technical project management, product operations, implementation, documentation, and public-facing systems.'
};

const groups = [
  'Business / operations',
  'Civic / public-facing systems',
  'Community / cultural infrastructure',
  'Knowledge systems / AI lab'
];

export default function WorkPage() {
  const entries = getPublicWorkEntries();
  const tags = getWorkTags();

  return (
    <div className="golden-shell py-12">
      <header className="max-w-4xl">
        <p className="eyebrow">Selected work</p>
        <h1 className="mt-4 text-4xl font-semibold md:text-6xl">A selected proof system, not a full archive.</h1>
        <p className="mt-6 text-xl leading-relaxed text-base-content/75">
          These pages show a recurring pattern: ambiguous need, source and stakeholder discovery, workflow clarity, implementation support, and
          durable handoff.
        </p>
      </header>

      <section className="mt-10 space-y-5">
        <h2 className="section-kicker">Filters</h2>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="badge badge-outline border-base-content/20 bg-base-200">
              {tag}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-12 grid gap-5 lg:grid-cols-3">
        {entries.map((entry) => (
          <WorkCard key={entry.slug} entry={entry} />
        ))}
      </section>

      <section className="mt-16 border-t border-base-content/10 pt-10">
        <h2 className="section-kicker">V1 groups</h2>
        <ul className="mt-5 grid gap-3 md:grid-cols-4">
          {groups.map((group) => (
            <li key={group} className="border border-base-content/10 bg-base-200 p-4 text-sm font-semibold">
              {group}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

