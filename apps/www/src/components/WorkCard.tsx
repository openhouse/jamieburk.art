import Link from "next/link";
import type { Route } from "next";
import { MediaImage } from "@/components/MediaImage";
import { StatusBadge } from "@/components/StatusBadge";
import { TagList } from "@/components/TagList";
import { getWorkCover } from "@/data/work-covers";
import type { WorkMeta } from "@/types/work";

type WorkCardProps = {
  compact?: boolean;
  eager?: boolean;
  item: WorkMeta;
};

export function WorkCard({ compact = false, eager = false, item }: WorkCardProps) {
  const cover = getWorkCover(item.slug);

  return (
    <article className="border-t border-jb-ink/20 py-8 last:border-b">
      <div className="grid gap-6 lg:grid-cols-[minmax(18rem,0.42fr)_minmax(0,0.58fr)] lg:gap-8">
        <figure className="min-w-0">
          <Link
            aria-label={`Read the ${item.title} case study`}
            className="group block overflow-hidden bg-jb-ink/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-jb-blue"
            href={`/work/${item.slug}` as Route}
          >
            <MediaImage
              alt={cover.alt}
              className={`aspect-[3/2] w-full transition-[filter] duration-200 group-hover:brightness-95 motion-reduce:transition-none ${
                cover.fit === "contain" ? "object-contain" : "object-cover"
              }`}
              height={cover.height}
              loading={eager ? "eager" : "lazy"}
              sizes="(min-width: 1024px) 42vw, 100vw"
              src={cover.src}
              style={{ objectPosition: cover.objectPosition }}
              width={cover.width}
            />
          </Link>
          <figcaption className="mt-3 text-xs leading-5 text-jb-ink/64">
            <span>{cover.caption}</span>{" "}
            <span className="font-medium text-jb-ink/72">{cover.credit}</span>
          </figcaption>
        </figure>
        <div className="min-w-0">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-jb-green">{item.series}</p>
              <p className="mt-1 text-sm text-jb-ink/64">{item.years}</p>
            </div>
            <StatusBadge status={item.status} visibility={item.visibility} />
          </div>
          <h2 className="mt-5 text-3xl leading-tight text-jb-ink">
            <Link className="hover:text-jb-blue" href={`/work/${item.slug}` as Route}>
              {item.title}
            </Link>
          </h2>
          <p className="mt-2 font-semibold text-jb-green">{item.subtitle}</p>
          <p className="mt-4 leading-7 text-jb-ink/76">{item.summary}</p>
          {!compact ? (
            <>
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
            </>
          ) : null}
          <Link
            className="mt-5 inline-block border-b border-jb-blue font-semibold text-jb-blue hover:border-jb-green hover:text-jb-green"
            href={`/work/${item.slug}` as Route}
          >
            {compact ? `Read the ${item.title} case study` : "Read case study"}
          </Link>
        </div>
      </div>
    </article>
  );
}
