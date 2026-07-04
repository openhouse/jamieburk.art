import Link from "next/link";
import type { WorkEntry } from "@/lib/content";
import { StatusPill } from "@/components/StatusPill";
import { TagList } from "@/components/TagList";

export function WorkCard({ work }: { work: WorkEntry }) {
  return (
    <article className="system-card flex h-full flex-col p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <p className="text-sm font-semibold text-broadway-blue">{work.series}</p>
        <StatusPill>{work.status}</StatusPill>
      </div>
      <h2 className="mt-4 text-2xl font-semibold leading-tight text-jamie-ink">
        <Link className="text-jamie-ink no-underline hover:underline" href={`/work/${work.slug}`}>
          {work.title}
        </Link>
      </h2>
      <p className="mt-2 text-base leading-7 text-jamie-muted">{work.summary}</p>
      <div className="mt-5 grid gap-4 text-sm leading-6">
        <div>
          <p className="font-semibold text-jamie-ink">What was unclear</p>
          <p className="mt-1 text-jamie-muted">{work.whatWasUnclear}</p>
        </div>
        <div>
          <p className="font-semibold text-jamie-ink">What became usable</p>
          <p className="mt-1 text-jamie-muted">{work.whatBecameUsable}</p>
        </div>
      </div>
      <div className="mt-5">
        <TagList tags={work.capabilities.slice(0, 4)} />
      </div>
      <Link className="mt-6 inline-flex text-sm font-semibold" href={`/work/${work.slug}`}>
        Read public-safe summary
      </Link>
    </article>
  );
}
