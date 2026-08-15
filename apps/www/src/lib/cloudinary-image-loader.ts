import type { ImageLoaderProps } from "next/image";
import {
  buildCloudinaryDeliveryUrl,
  parseCloudinarySource
} from "@/lib/media-delivery";

export default function cloudinaryImageLoader({
  src,
  width
}: ImageLoaderProps) {
  const parsed = parseCloudinarySource(src);
  if (!parsed) return src;
  return buildCloudinaryDeliveryUrl({ ...parsed, width });
}
