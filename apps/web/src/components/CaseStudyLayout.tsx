import Link from 'next/link';
import type { WorkEntry } from '@/lib/types';
import { AtAGlance } from './AtAGlance';
import { ContentStateBadge } from './ContentStateBadge';
import { KnownOpenProtected } from './KnownOpenProtected';
import { MdxBody } from './MdxBody';
import { PublicSafetyNote } from './PublicSafetyNote';
import { SourceTrail } from './SourceTrail';
import { TagList } from './TagList';

type CaseStudyLayoutProps = {
  entry: WorkEntry;
};

export function CaseStudyLayout({ entry }: CaseStudyLayoutProps) {
  return (
    <article className="golden-shell py-12">
      <nav className="breadcrumbs text-sm" aria-label="Breadcrumbs">
        <ol>
          <li>
            <Link href="/work">Work</Link>
          </li>
          <li>{entry.title}</li>
        </ol>
      </nav>

      <header className="golden-aside-layout mt-8">
        <div className="space-y-5">
          <ContentStateBadge state={entry.contentState} />
          <TagList tags={entry.tags} />
        </div>
        <div>
          <p className="eyebrow">{entry.subtitle}</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">{entry.title}</h1>
          <p className="mt-6 text-xl leading-relaxed text-base-content/75">{entry.summary}</p>
        </div>
      </header>

      <div className="golden-aside-layout mt-12">
        <aside className="space-y-6">
          <AtAGlance
            items={[
              { label: 'Role', value: entry.role },
              { label: 'Years', value: entry.years },
              { label: 'Status', value: entry.contentState },
              { label: 'Skills shown', value: entry.capabilities }
            ]}
          />
          <SourceTrail items={entry.proof} />
        </aside>

        <div className="space-y-10">
          <PublicSafetyNote note={entry.publicSafety?.note} />
          <section className="grid gap-4 md:grid-cols-2">
            <div className="border border-base-content/10 bg-base-200 p-5">
              <h2 className="section-kicker">What was unclear?</h2>
              <p className="mt-3 text-base-content/78">{entry.whatWasUnclear}</p>
            </div>
            <div className="border border-base-content/10 bg-base-200 p-5">
              <h2 className="section-kicker">What became usable?</h2>
              <p className="mt-3 text-base-content/78">{entry.whatBecameUsable}</p>
            </div>
          </section>
          <MdxBody source={entry.body} />
          <KnownOpenProtected items={entry.knownOpenProtected} />
        </div>
      </div>
    </article>
  );
}

