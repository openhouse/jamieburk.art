import Link from "next/link";
import type { Route } from "next";
import { StatusBadge } from "@/components/StatusBadge";
import { TagList } from "@/components/TagList";
import type { WorkMeta } from "@/types/work";

type WorkCardProps = {
  item: WorkMeta;
};

export function WorkCard({ item }: WorkCardProps) {
  return (
    <article className="border-t border-jb-ink/20 py-6 last:border-b">
      <div className="grid gap-5 md:grid-cols-[0.34fr_0.66fr]">
        <div>
          <StatusBadge status={item.status} visibility={item.visibility} />
          <p className="mt-4 text-sm font-semibold text-jb-green">{item.series}</p>
          <p className="mt-1 text-sm text-jb-ink/64">{item.years}</p>
        </div>
        <div className="min-w-0">
          <h2 className="text-3xl leading-tight text-jb-ink">
            <Link className="hover:text-jb-blue" href={`/work/${item.slug}` as Route}>
              {item.title}
            </Link>
          </h2>
          <p className="mt-2 font-semibold text-jb-green">{item.subtitle}</p>
          <p className="mt-4 leading-7 text-jb-ink/76">{item.summary}</p>
          <dl className="mt-5 grid gap-4 border-t border-jb-ink/12 pt-4 text-sm sm:grid-cols-2">
            <div>
              <dt className="font-semibold text-jb-ink">What was emerging</dt>
              <dd className="mt-1 leading-6 text-jb-ink/72">{item.whatWasUnclear}</dd>
            </div>
            <div>
              <dt className="font-semibold text-jb-ink">What became usable</dt>
              <dd className="mt-1 leading-6 text-jb-ink/72">{item.whatBecameUsable}</dd>
            </div>
          </dl>
          <div className="mt-5">
            <TagList compact tags={item.tags.slice(0, 4)} />
          </div>
          <Link
            className="mt-5 inline-block border-b border-jb-blue font-semibold text-jb-blue hover:border-jb-green hover:text-jb-green"
            href={`/work/${item.slug}` as Route}
          >
            Read case study
          </Link>
        </div>
      </div>
    </article>
  );
}
