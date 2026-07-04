import Link from "next/link";
import type { Route } from "next";
import type { WorkItem } from "@/lib/types";
import { TagList } from "@/components/TagList";

type ProjectCardProps = {
  item: WorkItem;
};

export function ProjectCard({ item }: ProjectCardProps) {
  return (
    <article className="surface flex h-full flex-col p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="small-caps text-[color:var(--color-primary)]">{item.status}</p>
          <h3 className="mt-2 text-2xl font-bold leading-tight">{item.title}</h3>
        </div>
        <span className="rounded-[0.382rem] bg-[color:var(--color-soft-green)] px-2 py-1 text-xs font-bold">
          {item.privacyLevel}
        </span>
      </div>
      <p className="mt-4 leading-7 text-[color:var(--color-muted)]">{item.summary}</p>
      <div className="mt-5">
        <TagList tags={item.tags.slice(0, 4)} />
      </div>
      <dl className="mt-5 grid gap-4 text-sm">
        <div>
          <dt className="font-bold">Role</dt>
          <dd className="mt-1 text-[color:var(--color-muted)]">{item.role}</dd>
        </div>
        <div>
          <dt className="font-bold">Primary proof</dt>
          <dd className="mt-1 text-[color:var(--color-muted)]">{item.primaryProof}</dd>
        </div>
        <div>
          <dt className="font-bold">What was unclear?</dt>
          <dd className="mt-1 text-[color:var(--color-muted)]">{item.whatWasUnclear}</dd>
        </div>
        <div>
          <dt className="font-bold">What became usable?</dt>
          <dd className="mt-1 text-[color:var(--color-muted)]">{item.whatBecameUsable}</dd>
        </div>
      </dl>
      <Link className="mt-6 inline-flex font-bold text-[color:var(--color-primary)]" href={`/work/${item.slug}` as Route}>
        Read proof page
      </Link>
    </article>
  );
}
