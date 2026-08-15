export type CloudinaryQuality = "good" | "best";

export type CloudinaryAsset = {
  source: string;
  publicId: string;
  version: number;
  sourceWidth: number;
  widths: readonly number[];
  quality: CloudinaryQuality;
};

type MediaDeliveryConfig = {
  enabled: boolean;
  cloudName: string;
};

type LocalDelivery = {
  mode: "local";
  src: string;
};

type CloudinaryDelivery = {
  mode: "cloudinary";
  src: string;
  srcSet: string;
  widths: number[];
};

export type MediaDelivery = LocalDelivery | CloudinaryDelivery;

export const cloudinaryPilotAssets = {
  "/images/field-notes/nycac-shoestring-facilitation.webp": {
    source: "/images/field-notes/nycac-shoestring-facilitation.webp",
    publicId: "nycac-shoestring-facilitation",
    version: 1786825562,
    sourceWidth: 2400,
    widths: [480, 750, 1080, 1280, 1600, 2400],
    quality: "good"
  },
  "/artifacts/fair-rent-nyc/let-nyc-dance-public-surface.webp": {
    source: "/artifacts/fair-rent-nyc/let-nyc-dance-public-surface.webp",
    publicId: "let-nyc-dance-public-surface",
    version: 1786825582,
    sourceWidth: 1440,
    widths: [480, 750, 1080, 1280, 1440],
    quality: "best"
  }
} as const satisfies Record<string, CloudinaryAsset>;

function isSafeCloudName(value: string) {
  return /^[a-z0-9_-]+$/i.test(value);
}

function isSafePublicId(value: string) {
  return /^[a-z0-9_/-]+$/i.test(value) && !value.includes("..");
}

export function buildCloudinaryUrl(
  asset: CloudinaryAsset,
  cloudName: string,
  requestedWidth: number
) {
  if (!isSafeCloudName(cloudName) || !isSafePublicId(asset.publicId)) {
    throw new Error("Unsafe Cloudinary delivery identifier.");
  }

  const width = Math.min(
    asset.sourceWidth,
    Math.max(1, Math.round(requestedWidth))
  );

  return [
    `https://res.cloudinary.com/${cloudName}/image/upload`,
    `c_limit,w_${width}`,
    "f_auto",
    `q_auto:${asset.quality}`,
    `v${asset.version}`,
    asset.publicId
  ].join("/");
}

export function resolveMediaDelivery(
  source: string,
  config: MediaDeliveryConfig
): MediaDelivery {
  const asset = cloudinaryPilotAssets[
    source as keyof typeof cloudinaryPilotAssets
  ] as CloudinaryAsset | undefined;

  if (!config.enabled || !config.cloudName || !asset) {
    return { mode: "local", src: source };
  }

  const widths = [...asset.widths].filter(
    (width) => width > 0 && width <= asset.sourceWidth
  );
  const srcSet = widths
    .map(
      (width) =>
        `${buildCloudinaryUrl(asset, config.cloudName, width)} ${width}w`
    )
    .join(", ");

  return {
    mode: "cloudinary",
    src: buildCloudinaryUrl(asset, config.cloudName, widths.at(-1) ?? asset.sourceWidth),
    srcSet,
    widths
  };
}

export const mediaDeliveryConfig: MediaDeliveryConfig = {
  enabled: process.env.NEXT_PUBLIC_CLOUDINARY_PILOT === "enabled",
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? ""
};
