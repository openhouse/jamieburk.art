import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { StatusBadge } from "@/components/StatusBadge";
import { TagList } from "@/components/TagList";
import { workVisuals } from "@/data/photography";
import type { WorkMeta } from "@/types/work";

type WorkCardProps = {
  item: WorkMeta;
};

export function WorkCard({ item }: WorkCardProps) {
  const visual = workVisuals[item.slug];

  return (
    <article className="overflow-hidden rounded border border-jb-ink/15 bg-jb-paper">
      {visual ? (
        <Link
          aria-label={`Read ${item.title} case study`}
          className="jb-project-cover block"
          href={`/work/${item.slug}` as Route}
        >
          <Image
            alt={visual.alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            src={visual.src}
            style={{
              objectFit: visual.kind === "project-artifact" ? "contain" : "cover",
              objectPosition: visual.objectPosition
            }}
          />
        </Link>
      ) : null}
      <div className="flex flex-col gap-4 p-5">
        <StatusBadge status={item.status} visibility={item.visibility} />
        <div>
          <h2 className="text-2xl font-semibold text-jb-ink">
            <Link className="hover:text-jb-blue" href={`/work/${item.slug}` as Route}>
              {item.title}
            </Link>
          </h2>
          <p className="mt-2 font-medium text-jb-green">{item.subtitle}</p>
          <p className="mt-4 leading-7 text-jb-ink/76">{item.summary}</p>
        </div>
        <dl className="border-l-2 border-jb-blue/40 pl-4 text-sm">
          <div>
            <dt className="font-semibold text-jb-ink">What became usable</dt>
            <dd className="mt-1 leading-6 text-jb-ink/72">{item.whatBecameUsable}</dd>
          </div>
        </dl>
        <TagList compact tags={item.tags.slice(0, 4)} />
        {visual ? (
          <p className="border-t border-jb-ink/10 pt-3 text-xs leading-5 text-jb-ink/68">
            {visual.caption} {visual.credit}.
          </p>
        ) : null}
        <Link
          className="text-sm font-semibold text-jb-blue hover:text-jb-green"
          href={`/work/${item.slug}` as Route}
        >
          Read case study
        </Link>
      </div>
    </article>
  );
}
