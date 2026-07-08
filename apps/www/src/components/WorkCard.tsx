import Link from "next/link";
import type { Route } from "next";
import { TagList } from "@/components/TagList";
import type { WorkMeta } from "@/types/work";

type WorkCardProps = {
  item: WorkMeta;
};

export function WorkCard({ item }: WorkCardProps) {
  return (
    <article className="rounded-lg border border-jb-ink/15 bg-jb-warm/88 p-5">
      <div className="flex h-full flex-col gap-4">
        <div>
          <p className="text-sm font-semibold text-jb-blue">
            {item.series} / {item.years}
          </p>
          <h2 className="text-2xl font-semibold text-jb-ink">
            <Link className="hover:text-jb-blue" href={`/work/${item.slug}` as Route}>
              {item.title}
            </Link>
          </h2>
          <p className="mt-2 font-medium text-jb-green">{item.subtitle}</p>
          <p className="mt-4 leading-7 text-jb-ink/78">{item.summary}</p>
        </div>
        <div className="border-t border-jb-ink/12 pt-4">
          <p className="text-sm font-semibold text-jb-ink">What became usable</p>
          <p className="mt-1 text-sm leading-6 text-jb-ink/76">
            {item.whatBecameUsable}
          </p>
        </div>
        <TagList compact tags={item.tags.slice(0, 4)} />
        <Link
          className="mt-auto text-sm font-semibold text-jb-blue hover:text-jb-green"
          href={`/work/${item.slug}` as Route}
        >
          Read the work
        </Link>
      </div>
    </article>
  );
}
