import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { socialPreview } from "@/data/social-preview";

export const runtime = "nodejs";
export const alt = socialPreview.alt;
export const size = {
  width: socialPreview.width,
  height: socialPreview.height
};
export const contentType = "image/png";

async function readSocialPreviewAsset(source: string): Promise<ArrayBuffer> {
  const relativePath = source.replace(/^\/+/, "");
  const publicRoots = [
    join(process.cwd(), "apps/www/public"),
    join(process.cwd(), "public")
  ];
  let lastError: unknown;

  for (const publicRoot of publicRoots) {
    try {
      const bytes = await readFile(join(publicRoot, relativePath));
      return Uint8Array.from(bytes).buffer;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError ?? new Error(`Unable to load social-preview asset: ${source}`);
}

export default async function Image() {
  const composition = socialPreview.composition;
  const [imageData, displayFontData, bodyFontData] = await Promise.all([
    readSocialPreviewAsset(socialPreview.image.src),
    readSocialPreviewAsset(composition.typography.displayFont.src),
    readSocialPreviewAsset(composition.typography.bodyFont.src)
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          background: "#222b36",
          color: "#ffffff",
          display: "flex",
          height: "100%",
          overflow: "hidden",
          position: "relative",
          width: "100%"
        }}
      >
        <img
          alt={socialPreview.image.alt}
          height="630"
          src={imageData as unknown as string}
          style={{
            height: `${composition.layout.canvas.height}px`,
            left: 0,
            objectFit: "cover",
            objectPosition: composition.layout.image.objectPosition,
            position: "absolute",
            top: 0,
            width: `${composition.layout.canvas.width}px`
          }}
          width="1200"
        />
        <div
          style={{
            background: composition.contrast.background,
            display: "flex",
            height: `${composition.layout.canvas.height}px`,
            left: 0,
            position: "absolute",
            top: 0,
            width: `${composition.layout.canvas.width}px`
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            left: `${composition.layout.text.left}px`,
            position: "absolute",
            top: `${composition.layout.text.top}px`,
            width: `${composition.layout.text.width}px`
          }}
        >
          <div
            style={{
              fontFamily: composition.typography.displayFont.family,
              fontSize: `${composition.typography.name.fontSize}px`,
              fontWeight: composition.typography.name.fontWeight,
              letterSpacing: composition.typography.name.letterSpacing,
              lineHeight: composition.typography.name.lineHeight,
              width: `${composition.typography.name.width}px`
            }}
          >
            {socialPreview.name}
          </div>
          <div
            style={{
              fontFamily: composition.typography.bodyFont.family,
              fontSize: `${composition.typography.proposition.fontSize}px`,
              fontWeight: composition.typography.proposition.fontWeight,
              lineHeight: composition.typography.proposition.lineHeight,
              marginTop: `${composition.typography.proposition.marginTop}px`,
              width: `${composition.typography.proposition.width}px`
            }}
          >
            {socialPreview.proposition}
          </div>
        </div>
        <div
          style={{
            bottom: `${composition.layout.destination.bottom}px`,
            color: composition.typography.destination.color,
            display: "flex",
            fontFamily: composition.typography.bodyFont.family,
            fontSize: `${composition.typography.destination.fontSize}px`,
            fontWeight: composition.typography.destination.fontWeight,
            left: `${composition.layout.destination.left}px`,
            letterSpacing: composition.typography.destination.letterSpacing,
            position: "absolute"
          }}
        >
          {socialPreview.siteLabel}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: composition.typography.displayFont.family,
          data: displayFontData,
          style: "normal",
          weight: composition.typography.displayFont.weight
        },
        {
          name: composition.typography.bodyFont.family,
          data: bodyFontData,
          style: "normal",
          weight: composition.typography.bodyFont.weight
        }
      ]
    }
  );
}
