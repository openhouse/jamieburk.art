import Link from "next/link";
import type { Route } from "next";
import { GovernedImage } from "@/components/GovernedImage";
import { getWorkCover } from "@/data/work-covers";
import type { WorkMeta } from "@/types/work";

type HomeWorkCardProps = {
  item: WorkMeta;
  proof: string;
};

export function HomeWorkCard({ item, proof }: HomeWorkCardProps) {
  const cover = getWorkCover(item.slug);

  return (
    <article className="border-t border-jb-ink/20 py-7 last:border-b">
      <Link
        className="group grid gap-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-jb-blue md:grid-cols-[minmax(15rem,0.38fr)_minmax(0,0.62fr)] md:items-center md:gap-8"
        href={`/work/${item.slug}` as Route}
      >
        <figure className="min-w-0">
          <div className="overflow-hidden bg-jb-ink/5">
            <GovernedImage
              alt={cover.alt}
              className="aspect-[3/2] w-full object-cover transition-[filter] duration-200 group-hover:brightness-95 motion-reduce:transition-none"
              height={cover.height}
              sizes="(min-width: 768px) 38vw, 100vw"
              src={cover.src}
              style={{ objectPosition: cover.objectPosition }}
              width={cover.width}
            />
          </div>
          <figcaption className="mt-2 text-xs leading-5 text-jb-ink/64">
            <span>{cover.caption}</span>{" "}
            <span className="font-medium text-jb-ink/72">{cover.credit}</span>
          </figcaption>
        </figure>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-jb-green">
            {item.series} · {item.years}
          </p>
          <h3 className="mt-3 text-3xl leading-tight text-jb-ink transition-colors group-hover:text-jb-blue">
            {item.title}
          </h3>
          <p className="mt-3 text-lg font-semibold leading-7 text-jb-ink">
            {proof}
          </p>
          <p className="mt-3 leading-7 text-jb-ink/72">{item.subtitle}</p>
          <span className="mt-5 inline-block border-b border-jb-blue font-semibold text-jb-blue group-hover:border-jb-green group-hover:text-jb-green">
            Read case study
          </span>
        </div>
      </Link>
    </article>
  );
}
