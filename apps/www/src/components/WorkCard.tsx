import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { StatusBadge } from "@/components/StatusBadge";
import { TagList } from "@/components/TagList";
import { getCaseStudyPhoto } from "@/data/photography";
import type { WorkMeta } from "@/types/work";

type WorkCardProps = {
  item: WorkMeta;
};

export function WorkCard({ item }: WorkCardProps) {
  const fieldPhoto = getCaseStudyPhoto(item.slug);
  const artifactMedia = item.artifacts.find((artifact) => artifact.media)?.media;
  const media = fieldPhoto
    ? {
        alt: fieldPhoto.alt,
        caption: fieldPhoto.caption,
        height: fieldPhoto.height,
        src: fieldPhoto.src,
        width: fieldPhoto.width
      }
    : artifactMedia
      ? {
          alt: artifactMedia.alt,
          caption: artifactMedia.caption,
          height: 800,
          src: artifactMedia.src,
          width: 1200
        }
      : undefined;

  return (
    <article className="jb-work-row">
      <div className="grid gap-5 md:grid-cols-[0.24fr_0.76fr]">
        <div>
          <StatusBadge status={item.status} visibility={item.visibility} />
          <p className="mt-4 text-sm font-semibold text-jb-green">{item.series}</p>
          <p className="mt-1 text-sm text-jb-ink/64">{item.years}</p>
        </div>
        <div
          className={
            media
              ? "grid min-w-0 gap-6 lg:grid-cols-[minmax(0,0.62fr)_minmax(220px,0.38fr)]"
              : "min-w-0"
          }
        >
          <div>
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
                <dd className="mt-1 leading-6 text-jb-ink/72">
                  {item.whatWasUnclear}
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-jb-ink">What became usable</dt>
                <dd className="mt-1 leading-6 text-jb-ink/72">
                  {item.whatBecameUsable}
                </dd>
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
          {media ? (
            <figure>
              <Image
                alt={media.alt}
                className="aspect-[4/3] w-full object-cover object-top"
                height={media.height}
                sizes="(min-width: 1024px) 28vw, 100vw"
                src={media.src}
                width={media.width}
              />
              <figcaption className="border-b border-jb-ink/12 py-2 text-xs leading-5 text-jb-ink/68">
                {media.caption}
              </figcaption>
            </figure>
          ) : null}
        </div>
      </div>
    </article>
  );
}
