import Link from 'next/link';
import type { WorkEntry } from '@/lib/types';
import { ContentStateBadge } from './ContentStateBadge';
import { TagList } from './TagList';

type WorkCardProps = {
  entry: WorkEntry;
};

export function WorkCard({ entry }: WorkCardProps) {
  return (
    <article className="card h-full rounded-lg border border-base-content/10 bg-base-200 shadow-sm">
      <div className="card-body gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <ContentStateBadge state={entry.contentState} />
          <span className="font-mono text-xs text-base-content/55">{entry.years}</span>
        </div>
        <div>
          <h3 className="card-title text-2xl leading-tight">
            <Link className="link-hover" href={`/work/${entry.slug}`}>
              {entry.title}
            </Link>
          </h3>
          <p className="mt-2 text-sm font-semibold text-primary">{entry.subtitle}</p>
        </div>
        <p className="text-base-content/78">{entry.summary}</p>
        <div className="grid gap-3 text-sm text-base-content/78">
          <p>
            <span className="font-semibold text-base-content">What was unclear?</span> {entry.whatWasUnclear}
          </p>
          <p>
            <span className="font-semibold text-base-content">What became usable?</span> {entry.whatBecameUsable}
          </p>
        </div>
        <TagList tags={entry.tags.slice(0, 4)} />
        <div className="card-actions mt-auto pt-2">
          <Link className="btn btn-outline btn-sm" href={`/work/${entry.slug}`}>
            View proof
          </Link>
        </div>
      </div>
    </article>
  );
}

