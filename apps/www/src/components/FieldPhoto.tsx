import { ResponsiveMedia } from "@/components/ResponsiveMedia";
import type { PortfolioPhoto } from "@/data/photography";

type FieldPhotoProps = {
  photo: PortfolioPhoto;
  className?: string;
  imageClassName?: string;
  preload?: boolean;
  sizes?: string;
};

export function FieldPhoto({
  photo,
  className = "",
  imageClassName = "",
  preload = false,
  sizes = "(max-width: 768px) 100vw, 72vw"
}: FieldPhotoProps) {
  return (
    <figure className={`jb-field-photo ${className}`}>
      <div className="jb-field-photo-frame">
        <ResponsiveMedia
          alt={photo.alt}
          className={`h-full w-full object-cover ${imageClassName}`}
          height={photo.height}
          preload={preload}
          sizes={sizes}
          src={photo.src}
          width={photo.width}
        />
      </div>
      <figcaption className="jb-photo-caption">
        <span>{photo.caption}</span>
        <span>{photo.credit}</span>
      </figcaption>
    </figure>
  );
}
