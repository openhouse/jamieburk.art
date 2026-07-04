import Link from "next/link";

import { TagList } from "./TagList";

import type { WorkItem } from "@/lib/types";

type ProjectCardProps = {
  item: WorkItem;
  compact?: boolean;
};

export function ProjectCard({ item, compact = false }: ProjectCardProps) {
  return (
    <article className="card grid overflow-hidden md:grid-cols-[0.382fr_0.618fr]">
      <div className="artifact-preview min-h-52 rounded-none border-0" aria-hidden />
      <div className="p-5 md:p-6">
        <div className="flex flex-wrap items-center gap-3">
          <p className="eyebrow">{item.status}</p>
          <span className="text-xs font-bold text-muted">{item.dates}</span>
        </div>
        <h3 className="h3 mt-3">
          <Link className="text-base-content no-underline hover:text-primary" href={`/work/${item.slug}`}>
            {item.title}
          </Link>
        </h3>
        <p className="mt-3 text-base text-muted">{item.summary}</p>
        <div className="mt-4">
          <TagList tags={item.tags.slice(0, compact ? 3 : 5)} />
        </div>
        {!compact ? (
          <dl className="mt-5 grid gap-4 text-sm md:grid-cols-2">
            <div>
              <dt className="font-black">What was unclear?</dt>
              <dd className="mt-1 text-muted">{item.unclear}</dd>
            </div>
            <div>
              <dt className="font-black">What became usable?</dt>
              <dd className="mt-1 text-muted">{item.usable}</dd>
            </div>
          </dl>
        ) : null}
        <Link
          className="mt-5 inline-flex font-black no-underline"
          href={`/work/${item.slug}`}
        >
          View proof
        </Link>
      </div>
    </article>
  );
}
