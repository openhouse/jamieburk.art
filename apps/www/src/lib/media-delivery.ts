import manifest from "@/data/media-delivery.json";

export type MediaDeliveryAsset = (typeof manifest.assets)[number];

const assetsBySource = new Map(
  manifest.assets.map((asset) => [asset.source, asset] as const)
);

export function getMediaDeliveryAsset(source: string) {
  return assetsBySource.get(source);
}

export function encodeCloudinarySource(asset: MediaDeliveryAsset) {
  return `/__cloudinary/${asset.quality}/v${asset.cloudinary.version}/${asset.cloudinary.publicId}`;
}

export function buildCloudinaryDeliveryUrl({
  publicId,
  quality,
  version,
  width
}: {
  publicId: string;
  quality: "best" | "good";
  version: number;
  width: number;
}) {
  const boundedWidth = Math.max(1, Math.round(width));
  return `${manifest.provider.deliveryBase}/c_limit,w_${boundedWidth}/f_auto,q_auto:${quality}/v${version}/${publicId}`;
}

export function parseCloudinarySource(source: string) {
  const match = source.match(
    /^\/__cloudinary\/(best|good)\/v([1-9][0-9]*)\/(jamieburk-art\/portfolio\/[a-z0-9/-]+)$/
  );
  if (!match) return null;
  return {
    quality: match[1] as "best" | "good",
    version: Number(match[2]),
    publicId: match[3]
  };
}

export { manifest as mediaDeliveryManifest };
