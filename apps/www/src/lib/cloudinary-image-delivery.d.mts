import type { ImageLoader } from "next/image";

export type CloudinaryAsset = {
  localSrc: string;
  kind: "photograph" | "screenshot";
  sha256: string;
  publicId: string;
  version: `v${number}`;
  bindingMethod: "reused-exact-sha256-match" | "uploaded-from-approved-public-url";
  remoteOriginalVerifiedAt: `${number}-${number}-${number}`;
  releaseState: {
    publicGit: "approved";
    staging: "approved";
    cloudinaryPublicDelivery: "approved";
    production: "open";
    indexing: "open";
  };
  publicUseBoundary: string;
};

export const CLOUDINARY_RESPONSIVE_WIDTHS: readonly number[];
export const CLOUDINARY_DELIVERY_POLICIES: Readonly<{
  photograph: { format: "webp"; quality: 30 };
  screenshot: { format: "webp"; quality: 35 };
}>;

export function getCloudinaryAsset(localSrc: string): CloudinaryAsset | null;

export function shouldUseCloudinaryDelivery(input: {
  deployEnv?: string;
  mediaDelivery?: string;
}): boolean;

export function buildCloudinaryImageUrl(input: {
  asset: Pick<CloudinaryAsset, "kind" | "publicId" | "version">;
  cloudName: string;
  requestedWidth: number;
}): string;

export const cloudinaryLoader: ImageLoader;
export function cloudinaryDeliveryEnabled(): boolean;
export function getCloudinaryPreconnectUrl(): string | null;
