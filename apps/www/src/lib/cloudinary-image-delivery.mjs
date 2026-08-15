import {
  cloudinaryAccount,
  cloudinaryAssets
} from "../data/cloudinary-assets.mjs";

export const CLOUDINARY_RESPONSIVE_WIDTHS = [384, 640, 750, 828, 1080, 1200, 1600, 1920];
export const CLOUDINARY_DELIVERY_POLICIES = {
  photograph: { format: "webp", quality: 30 },
  screenshot: { format: "webp", quality: 35 }
};

export function getCloudinaryAsset(localSrc) {
  return cloudinaryAssets.find((asset) => asset.localSrc === localSrc) ?? null;
}

export function shouldUseCloudinaryDelivery({ deployEnv, mediaDelivery }) {
  if (mediaDelivery === "cloudinary") return true;
  if (mediaDelivery === "local") return false;
  return deployEnv === "staging";
}

function boundedWidth(requestedWidth) {
  const numericWidth = Number(requestedWidth);
  if (!Number.isFinite(numericWidth) || numericWidth <= 0) {
    throw new TypeError("Cloudinary image width must be a positive number.");
  }

  return (
    CLOUDINARY_RESPONSIVE_WIDTHS.find((width) => width >= numericWidth) ??
    CLOUDINARY_RESPONSIVE_WIDTHS.at(-1)
  );
}

function encodePublicId(publicId) {
  return publicId.split("/").map(encodeURIComponent).join("/");
}

export function buildCloudinaryImageUrl({ asset, cloudName, requestedWidth }) {
  if (!cloudName || cloudName === "TODO_CLOUD_NAME") {
    throw new Error("Cloudinary delivery requires a public cloud name.");
  }

  const width = boundedWidth(requestedWidth);
  const publicId = encodePublicId(asset.publicId);
  const policy = CLOUDINARY_DELIVERY_POLICIES[asset.kind];
  if (!policy) throw new Error(`No Cloudinary delivery policy for ${asset.kind}`);
  return `https://${cloudinaryAccount.deliveryHost}/${encodeURIComponent(cloudName)}/image/upload/c_limit,w_${width}/f_${policy.format}/q_${policy.quality}/${asset.version}/${publicId}`;
}

export function cloudinaryLoader({ src, width }) {
  const asset = getCloudinaryAsset(src);
  if (!asset) {
    throw new Error(`No approved Cloudinary delivery binding for ${src}`);
  }

  return buildCloudinaryImageUrl({
    asset,
    cloudName: cloudinaryAccount.cloudName,
    requestedWidth: width
  });
}

export function cloudinaryDeliveryEnabled() {
  return (
    cloudinaryAccount.cloudName !== "TODO_CLOUD_NAME" &&
    shouldUseCloudinaryDelivery({
      deployEnv: process.env.NEXT_PUBLIC_DEPLOY_ENV,
      mediaDelivery: process.env.NEXT_PUBLIC_MEDIA_DELIVERY
    })
  );
}

export function getCloudinaryPreconnectUrl() {
  if (!cloudinaryDeliveryEnabled()) return null;
  return `https://${cloudinaryAccount.deliveryHost}`;
}
