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
    <article className="rounded-lg border border-jb-ink/15 bg-jb-warm/88 p-5 shadow-sm">
      <div className="flex flex-col gap-4">
        <StatusBadge status={item.status} visibility={item.visibility} />
        <div>
          <h2 className="text-2xl font-semibold text-jb-ink">
            <Link className="hover:text-jb-blue" href={`/work/${item.slug}` as Route}>
              {item.title}
            </Link>
          </h2>
          <p className="mt-2 font-medium text-jb-green">{item.subtitle}</p>
          <p className="mt-4 font-semibold leading-7 text-jb-ink/84">{item.result}</p>
          <p className="mt-3 leading-7 text-jb-ink/76">{item.summary}</p>
        </div>
        <dl className="grid gap-3 text-sm md:grid-cols-2">
          <div>
            <dt className="font-semibold text-jb-ink">What was unclear</dt>
            <dd className="mt-1 leading-6 text-jb-ink/72">{item.whatWasUnclear}</dd>
          </div>
          <div>
            <dt className="font-semibold text-jb-ink">What became usable</dt>
            <dd className="mt-1 leading-6 text-jb-ink/72">{item.whatBecameUsable}</dd>
          </div>
          <div className="md:col-span-2">
            <dt className="font-semibold text-jb-ink">Toward what end</dt>
            <dd className="mt-1 leading-6 text-jb-ink/72">{item.towardWhatEnd}</dd>
          </div>
        </dl>
        <div>
          <p className="text-sm font-semibold text-jb-ink">Role fit</p>
          <p className="mt-1 text-sm leading-6 text-jb-ink/72">{item.roleFit}</p>
        </div>
        <TagList compact tags={item.tags} />
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
