import type { Route } from "next";
import Link from "next/link";

import { StatusPill } from "@/components/status-pill";
import { TagList } from "@/components/tag-list";
import type { WorkMeta } from "@/lib/content";

type WorkCardProps = {
  work: WorkMeta;
};

export function WorkCard({ work }: WorkCardProps) {
  const href = `/work/${work.slug}` as Route;

  return (
    <article className="flex h-full flex-col rounded-lg border quiet-rule bg-base-100 p-5">
      <div className="flex flex-wrap items-center gap-2">
        <StatusPill status={work.status} />
        <span className="text-xs font-semibold uppercase tracking-wide text-base-content/50">{work.years}</span>
      </div>
      <h3 className="mt-4 text-2xl font-bold leading-tight">{work.title}</h3>
      <p className="mt-2 text-sm font-semibold text-primary">{work.series}</p>
      <p className="mt-3 text-sm leading-6 text-base-content/70">{work.summary}</p>
      <dl className="mt-5 grid gap-4 text-sm">
        <div>
          <dt className="font-bold text-base-content">What was unclear</dt>
          <dd className="mt-1 leading-6 text-base-content/70">{work.whatWasUnclear}</dd>
        </div>
        <div>
          <dt className="font-bold text-base-content">What became usable</dt>
          <dd className="mt-1 leading-6 text-base-content/70">{work.whatBecameUsable}</dd>
        </div>
        <div>
          <dt className="font-bold text-base-content">Primary artifacts</dt>
          <dd className="mt-1 leading-6 text-base-content/70">{work.artifactTypes.join(", ")}</dd>
        </div>
        <div>
          <dt className="font-bold text-base-content">Role fit</dt>
          <dd className="mt-1 leading-6 text-base-content/70">{work.role}</dd>
        </div>
        <div>
          <dt className="font-bold text-base-content">Visibility</dt>
          <dd className="mt-1 leading-6 text-base-content/70">{work.visibility}</dd>
        </div>
      </dl>
      <div className="mt-5">
        <TagList tags={work.tags} />
      </div>
      <div className="mt-auto pt-6">
        <Link className="btn btn-primary btn-sm rounded-lg" href={href}>
          Read case study
        </Link>
      </div>
    </article>
  );
}
