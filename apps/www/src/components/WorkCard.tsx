import Link from "next/link";
import type { Route } from "next";
import { PhotoFigure } from "@/components/PhotoFigure";
import { StatusBadge } from "@/components/StatusBadge";
import { TagList } from "@/components/TagList";
import { projectIndexVisuals } from "@/data/photography";
import type { WorkMeta } from "@/types/work";

type WorkCardProps = {
  item: WorkMeta;
};

export function WorkCard({ item }: WorkCardProps) {
  const visual = projectIndexVisuals[item.slug];

  return (
    <article className={`jb-work-row ${visual ? "jb-work-row-with-image" : ""}`}>
      {visual ? (
        <Link
          aria-label={`Read ${item.title}`}
          className="min-w-0"
          href={`/work/${item.slug}` as Route}
        >
          <PhotoFigure
            className="jb-work-row-image"
            photo={visual}
            priority={item.priority === 1}
            sizes="(min-width: 1024px) 38vw, 100vw"
          />
        </Link>
      ) : (
        <div aria-hidden="true" className="jb-work-row-index">
          {String(item.priority).padStart(2, "0")}
        </div>
      )}
      <div className="min-w-0 py-6 lg:py-8">
        <div className="flex flex-wrap items-center gap-3">
          <p className="jb-eyebrow text-jb-blue">{item.series} / {item.years}</p>
          <StatusBadge status={item.status} visibility={item.visibility} />
        </div>
        <h2 className="mt-4 text-3xl font-semibold leading-tight text-jb-ink">
          <Link className="hover:text-jb-blue" href={`/work/${item.slug}` as Route}>
            {item.title}
          </Link>
        </h2>
        <p className="mt-2 font-semibold text-jb-green">{item.subtitle}</p>
        <p className="mt-4 max-w-3xl leading-7 text-jb-ink/78">{item.summary}</p>
        <dl className="mt-5 grid gap-4 border-t border-jb-ink/12 pt-4 text-sm md:grid-cols-2">
          <div>
            <dt className="jb-meta-label text-jb-ink">Situation</dt>
            <dd className="mt-1 leading-6 text-jb-ink/70">{item.whatWasUnclear}</dd>
          </div>
          <div>
            <dt className="jb-meta-label text-jb-ink">Made usable</dt>
            <dd className="mt-1 leading-6 text-jb-ink/70">{item.whatBecameUsable}</dd>
          </div>
        </dl>
        <div className="mt-5">
          <TagList compact tags={item.tags.slice(0, 5)} />
        </div>
        <Link
          className="mt-5 inline-block text-sm font-semibold text-jb-blue hover:text-jb-green"
          href={`/work/${item.slug}` as Route}
        >
          Read case study
        </Link>
      </div>
    </article>
  );
}
