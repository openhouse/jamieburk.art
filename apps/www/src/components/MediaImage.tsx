import Image, { type ImageProps } from "next/image";
import {
  encodeCloudinarySource,
  getMediaDeliveryAsset
} from "@/lib/media-delivery";

type MediaImageProps = Omit<ImageProps, "src"> & {
  src: string;
};

export function MediaImage({ src, alt, ...props }: MediaImageProps) {
  const asset = getMediaDeliveryAsset(src);
  const useCloudinary =
    process.env.NEXT_PUBLIC_MEDIA_DELIVERY === "cloudinary" && Boolean(asset);

  return (
    <Image
      {...props}
      alt={alt}
      src={useCloudinary && asset ? encodeCloudinarySource(asset) : src}
      unoptimized={!useCloudinary}
    />
  );
}
