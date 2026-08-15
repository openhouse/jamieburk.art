"use client";

import Image, { type ImageProps } from "next/image";
import {
  cloudinaryDeliveryEnabled,
  cloudinaryLoader,
  getCloudinaryAsset
} from "@/lib/cloudinary-image-delivery.mjs";

export function GovernedImage(props: ImageProps) {
  const localSrc = typeof props.src === "string" ? props.src : null;
  const useCloudinary =
    localSrc !== null &&
    cloudinaryDeliveryEnabled() &&
    getCloudinaryAsset(localSrc) !== null;

  return (
    <Image
      {...props}
      alt={props.alt}
      loader={useCloudinary ? cloudinaryLoader : props.loader}
      unoptimized={useCloudinary ? false : props.unoptimized}
    />
  );
}
