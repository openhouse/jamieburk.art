import Image from "next/image";
import type { CSSProperties } from "react";
import {
  mediaDeliveryConfig,
  resolveMediaDelivery
} from "@/lib/media-delivery";

type ResponsiveMediaProps = {
  alt: string;
  className?: string;
  height: number;
  loading?: "eager" | "lazy";
  preload?: boolean;
  sizes: string;
  src: string;
  style?: CSSProperties;
  width: number;
};

export function ResponsiveMedia({
  alt,
  className,
  height,
  loading = "lazy",
  preload = false,
  sizes,
  src,
  style,
  width
}: ResponsiveMediaProps) {
  const delivery = resolveMediaDelivery(src, mediaDeliveryConfig);

  if (delivery.mode === "local") {
    return (
      <Image
        alt={alt}
        className={className}
        height={height}
        loading={preload ? undefined : loading}
        preload={preload}
        sizes={sizes}
        src={delivery.src}
        style={style}
        width={width}
      />
    );
  }

  return (
    // Deliberately bypass Next's optimizer for allowlisted Cloudinary assets.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt={alt}
      className={className}
      decoding="async"
      fetchPriority={preload ? "high" : "auto"}
      height={height}
      loading={preload ? "eager" : loading}
      sizes={sizes}
      src={delivery.src}
      srcSet={delivery.srcSet}
      style={style}
      width={width}
    />
  );
}
