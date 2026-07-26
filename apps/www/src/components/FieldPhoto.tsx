import Image from "next/image";
import type { PortfolioPhoto } from "@/data/photography";

type FieldPhotoProps = {
  photo: PortfolioPhoto;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
  showCredit?: boolean;
};

export function FieldPhoto({
  photo,
  className = "",
  imageClassName = "",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 72vw",
  showCredit = true
}: FieldPhotoProps) {
  return (
    <figure className={`jb-field-photo ${className}`}>
      <div className="jb-field-photo-frame">
        <Image
          alt={photo.alt}
          className={`h-full w-full object-cover ${imageClassName}`}
          height={photo.height}
          priority={priority}
          sizes={sizes}
          src={photo.src}
          width={photo.width}
        />
      </div>
      <figcaption className="jb-photo-caption">
        <span>{photo.caption}</span>
        {showCredit ? <span>{photo.credit}</span> : null}
      </figcaption>
    </figure>
  );
}
