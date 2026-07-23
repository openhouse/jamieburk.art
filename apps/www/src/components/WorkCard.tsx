import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { StatusBadge } from "@/components/StatusBadge";
import { TagList } from "@/components/TagList";
import { projectLeadPhotos } from "@/data/photography";
import type { WorkMeta } from "@/types/work";

type WorkCardProps = {
  item: WorkMeta;
  compact?: boolean;
};

export function WorkCard({ item, compact = false }: WorkCardProps) {
  const href = `/work/${item.slug}` as Route;
  const photo = projectLeadPhotos[item.slug];
  const artifactMedia = item.artifacts.find((artifact) => artifact.media)?.media;
  const image = photo
    ? {
        src: photo.src,
        alt: photo.alt,
        width: photo.width,
        height: photo.height,
        objectPosition: photo.objectPosition
      }
    : artifactMedia
      ? {
          src: artifactMedia.src,
          alt: artifactMedia.alt,
          width: 1200,
          height: 800,
          objectPosition: "50% 0%"
        }
      : null;

  return (
    <article className="jb-editorial-rule grid gap-6 py-7 md:grid-cols-[0.39fr_0.61fr]">
      <div>
        {image ? (
          <Link aria-label={`Read ${item.title}`} className="jb-image-link" href={href}>
            <Image
              alt={image.alt}
              className="aspect-[4/3] w-full object-cover"
              height={image.height}
              sizes="(min-width: 768px) 32vw, 100vw"
              src={image.src}
              style={{ objectPosition: image.objectPosition }}
              width={image.width}
            />
          </Link>
        ) : (
          <div className="flex aspect-[4/3] items-end bg-jb-neutral p-5 text-white">
            <p className="jb-meta-label text-sm">{item.series}</p>
          </div>
        )}
      </div>
      <div className="flex min-w-0 flex-col items-start">
        <StatusBadge status={item.status} visibility={item.visibility} />
        <p className="jb-section-index mt-5">{item.series}</p>
        <h2 className="mt-2 text-3xl font-semibold leading-tight text-jb-ink">
          <Link className="hover:text-jb-blue" href={href}>
            {item.title}
          </Link>
        </h2>
        <p className="mt-2 font-semibold text-jb-green">{item.subtitle}</p>
        <p className="mt-4 leading-7 text-jb-ink/76">{item.summary}</p>
        {!compact ? (
          <>
            <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
              <div>
                <dt className="jb-meta-label text-xs text-jb-red">Unclear</dt>
                <dd className="mt-2 leading-6 text-jb-ink/72">{item.whatWasUnclear}</dd>
              </div>
              <div>
                <dt className="jb-meta-label text-xs text-jb-green">Usable</dt>
                <dd className="mt-2 leading-6 text-jb-ink/72">{item.whatBecameUsable}</dd>
              </div>
            </dl>
            <div className="mt-5">
              <TagList compact tags={item.tags.slice(0, 4)} />
            </div>
          </>
        ) : null}
        <Link className="mt-6 font-semibold text-jb-blue hover:text-jb-green" href={href}>
          Read case study <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
