import Image from "next/image";
import {
  assertPhotoPlacement,
  type PortfolioPhoto
} from "@/data/photography";

type FieldPhotoProps = {
  photo: PortfolioPhoto;
  photoId: PortfolioPhoto["wikiId"];
  placementId: PortfolioPhoto["placementIds"][number];
  route: string;
  className?: string;
  crop: string;
  priority?: boolean;
  sizes?: string;
  showCredit?: boolean;
};

export function FieldPhoto({
  photo,
  className = "",
  crop,
  photoId,
  placementId,
  route,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 72vw",
  showCredit = true
}: FieldPhotoProps) {
  assertPhotoPlacement(photo, photoId, placementId);

  return (
    <figure
      className={`jb-field-photo ${className}`}
      data-photo-crop={crop}
      data-photo-id={photoId}
      data-photo-placement={placementId}
      data-photo-route={route}
    >
      <div className="jb-field-photo-frame">
        <Image
          alt={photo.alt}
          className={`h-full w-full object-cover ${crop}`}
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
