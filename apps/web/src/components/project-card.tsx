import Link from "next/link";
import { getWorkHref } from "@/lib/content";
import type { WorkEntry } from "@/lib/types";
import { StatusPill } from "./status-pill";
import { TagList } from "./tag-list";

type ProjectCardProps = {
  entry: WorkEntry;
};

export function ProjectCard({ entry }: ProjectCardProps) {
  return (
    <article className="group flex h-full flex-col rounded border border-base-300 bg-base-200 p-5 transition-colors hover:border-primary/55">
      <div className="flex flex-wrap items-center gap-2">
        <StatusPill status={entry.status} />
        {entry.publicSafety ? (
          <span className="badge rounded border-base-300 bg-base-100 text-xs font-bold">
            {entry.publicSafety.level}
          </span>
        ) : null}
      </div>
      <h3 className="mt-5 text-2xl font-black leading-tight">
        <Link className="no-underline after:absolute" href={getWorkHref(entry)}>
          {entry.title}
        </Link>
      </h3>
      {entry.subtitle ? <p className="mt-2 font-bold text-primary">{entry.subtitle}</p> : null}
      <p className="mt-4 text-sm leading-6 text-base-content/75">{entry.summary}</p>
      <dl className="mt-5 grid gap-3 border-t border-base-300 pt-4 text-sm">
        <div>
          <dt className="font-bold text-base-content">Role</dt>
          <dd className="text-base-content/75">{entry.role}</dd>
        </div>
        <div>
          <dt className="font-bold text-base-content">What was unclear</dt>
          <dd className="text-base-content/75">{entry.whatWasUnclear}</dd>
        </div>
        <div>
          <dt className="font-bold text-base-content">What became usable</dt>
          <dd className="text-base-content/75">{entry.whatBecameUsable}</dd>
        </div>
      </dl>
      <div className="mt-5">
        <TagList tags={entry.tags.slice(0, 4)} />
      </div>
      <div className="mt-auto pt-6">
        <Link className="text-sm font-black text-primary underline" href={getWorkHref(entry)}>
          Read proof page
        </Link>
      </div>
    </article>
  );
}
