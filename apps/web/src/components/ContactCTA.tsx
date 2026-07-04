import Link from 'next/link';
import { site } from '@/data/site';

type ContactCTAProps = {
  compact?: boolean;
};

export function ContactCTA({ compact = false }: ContactCTAProps) {
  return (
    <section className={compact ? 'space-y-3' : 'golden-shell border-t border-base-content/10 py-16'}>
      <h2 className={compact ? 'text-xl font-semibold' : 'max-w-3xl text-3xl font-semibold md:text-4xl'}>
        Looking for someone who can bring structure, documentation, and implementation discipline to ambiguous work?
      </h2>
      <div className="mt-6 flex flex-wrap gap-3">
        <a className="btn btn-primary" href={site.resumePath}>
          Download resume
        </a>
        <a className="btn btn-outline" href={`mailto:${site.email}`}>
          Email Jamie
        </a>
        <Link className="btn btn-ghost" href="/work">
          View selected work
        </Link>
      </div>
    </section>
  );
}
