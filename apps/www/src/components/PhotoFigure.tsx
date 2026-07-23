import Image from "next/image";
import type { PortfolioPhoto } from "@/data/photography";

type PhotoFigureProps = {
  photo: PortfolioPhoto;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
  showCaption?: boolean;
};

export function PhotoFigure({
  photo,
  className = "",
  imageClassName = "",
  sizes = "(min-width: 1100px) 50vw, 100vw",
  priority = false,
  showCaption = true
}: PhotoFigureProps) {
  return (
    <figure
      className={`jb-photo-figure ${className}`}
      data-photo-id={photo.id}
      data-publication-status={photo.publicationStatus}
    >
      <div className="jb-photo-frame">
        <Image
          alt={photo.alt}
          className={`h-full w-full object-cover ${imageClassName}`}
          height={photo.height}
          priority={priority}
          sizes={sizes}
          src={photo.src}
          style={{ objectPosition: photo.objectPosition }}
          width={photo.width}
        />
      </div>
      {showCaption ? (
        <figcaption className="jb-photo-caption">
          <span>{photo.caption}</span>
          <span className="jb-photo-source">{photo.archiveLabel}</span>
        </figcaption>
      ) : null}
    </figure>
  );
}

export function PhotoEssay({
  photos: essayPhotos,
  label = "Photographic sequence"
}: {
  photos: PortfolioPhoto[];
  label?: string;
}) {
  return (
    <section aria-label={label} className="jb-photo-essay">
      {essayPhotos.map((photo, index) => (
        <PhotoFigure
          className={index === 0 ? "md:col-span-2" : ""}
          imageClassName={index === 0 ? "aspect-[16/9]" : "aspect-[4/3]"}
          key={photo.id}
          photo={photo}
          sizes={index === 0 ? "(min-width: 1100px) 72vw, 100vw" : "(min-width: 768px) 36vw, 100vw"}
        />
      ))}
    </section>
  );
}
