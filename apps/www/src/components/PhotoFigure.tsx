import Image from "next/image";
import type { PhotoAsset } from "@/data/photography";

type PhotoFigureProps = {
  photo: PhotoAsset;
  priority?: boolean;
  mode?: "standard" | "wide" | "portrait";
  className?: string;
  showCaption?: boolean;
  sizes?: string;
};

const aspectClasses = {
  standard: "aspect-[3/2]",
  wide: "aspect-[16/9]",
  portrait: "aspect-[4/5]"
};

export function PhotoFigure({
  photo,
  priority = false,
  mode = "standard",
  className = "",
  showCaption = true,
  sizes
}: PhotoFigureProps) {
  return (
    <figure className={`jb-photo ${className}`} data-photo-id={photo.id}>
      <div className={`relative overflow-hidden bg-jb-neutral ${aspectClasses[mode]}`}>
        <Image
          alt={photo.alt}
          className="object-cover"
          fill
          priority={priority}
          sizes={sizes ?? (mode === "portrait" ? "(min-width: 1024px) 40vw, 100vw" : "100vw")}
          src={photo.src}
          style={{ objectPosition: photo.objectPosition ?? "50% 50%" }}
        />
      </div>
      {showCaption ? (
        <figcaption className="jb-photo-caption">
          <span>{photo.caption}</span>
          <span className="jb-photo-credit">{photo.credit}</span>
        </figcaption>
      ) : null}
    </figure>
  );
}
