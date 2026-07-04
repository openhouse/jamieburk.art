import Link from "next/link";
import type { Route } from "next";
import { ContentStateBadge } from "@/components/ContentStateBadge";
import { TagList } from "@/components/TagList";
import type { WorkEntry } from "@/lib/types";
import type { WorkItem } from "@/lib/work";
import { StatusBadge } from "./StatusBadge";
import { VisibilityBadge } from "./VisibilityBadge";

type WorkCardProps = {
  entry?: WorkEntry;
  item?: WorkItem;
  compact?: boolean;
};

export function WorkCard({ entry, item, compact = false }: WorkCardProps) {
  if (item) {
    const primaryProof = item.proof?.[0] ?? item.underlyingSystem ?? item.summary;

    return (
      <article className="editorial-card flex h-full flex-col p-5">
        <div className="flex flex-wrap items-center gap-2">
          <ContentStateBadge state={item.contentState} />
          <span className="badge badge-ghost">{item.dates}</span>
        </div>
        <h3 className="mt-4 text-2xl font-black leading-tight">
          <Link href={item.href as Route}>{item.title}</Link>
        </h3>
        <p className="mt-3 leading-7 text-[color:var(--jamie-muted)]">{item.summary}</p>
        {!compact ? (
          <dl className="mt-5 grid gap-3 text-sm">
            <div>
              <dt className="font-black">Role</dt>
              <dd className="mt-1 text-[color:var(--jamie-muted)]">{item.role}</dd>
            </div>
            <div>
              <dt className="font-black">Primary proof</dt>
              <dd className="mt-1 text-[color:var(--jamie-muted)]">{primaryProof}</dd>
            </div>
          </dl>
        ) : null}
        <div className="mt-5">
          <TagList tags={item.tags.slice(0, compact ? 3 : 5)} tone="quiet" />
        </div>
        <p className="mt-6 text-sm font-black text-[color:var(--jamie-broadway-blue)]">Read proof</p>
      </article>
    );
  }

  if (!entry) {
    return null;
  }

  const href = entry.slug === "technical-operations" ? "/work/technical-operations" : `/work/${entry.slug}`;

  return (
    <article className="paper-panel flex h-full flex-col p-5">
      <div className="flex flex-wrap gap-2">
        <StatusBadge status={entry.status} />
        <VisibilityBadge visibility={entry.visibility} />
      </div>
      <h3 className="mt-4 text-2xl font-semibold">{entry.title}</h3>
      <p className="mt-2 text-sm font-semibold text-[var(--color-muted)]">{entry.role} / {entry.years}</p>
      <p className="mt-4">{entry.summary}</p>
      {!compact && (
        <div className="mt-5 grid gap-4 text-sm md:grid-cols-2">
          <div>
            <p className="font-semibold">What was unclear?</p>
            <p className="mt-1 text-[var(--color-muted)]">{entry.whatWasUnclear}</p>
          </div>
          <div>
            <p className="font-semibold">What became usable?</p>
            <p className="mt-1 text-[var(--color-muted)]">{entry.whatBecameUsable}</p>
          </div>
        </div>
      )}
      <div className="mt-5">
        <TagList tags={entry.tags} />
      </div>
      <Link className="mt-6 font-semibold" href={href}>
        {entry.status === "Lab / research" ? "View method" : entry.status === "Short proof page" ? "View proof page" : "Read case study"}
      </Link>
    </article>
  );
}
