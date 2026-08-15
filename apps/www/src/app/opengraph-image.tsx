import { ImageResponse } from "next/og";
import type { CSSProperties } from "react";
import { socialPreview } from "@/data/social-preview";
import socialPreviewComposition from "@/data/social-preview-composition.json";
import { SITE_URL } from "@/lib/site-url";

export const runtime = "edge";
export const alt = socialPreview.alt;
export const size = {
  width: socialPreview.width,
  height: socialPreview.height
};
export const contentType = socialPreview.contentType;

function gradientFromScore() {
  const { angleDegrees, color, stops } = socialPreviewComposition.render.overlay;
  const rgb = color
    .replace("#", "")
    .match(/.{2}/g)
    ?.map((channel) => Number.parseInt(channel, 16));

  if (!rgb || rgb.length !== 3) {
    throw new Error(`Invalid social-preview overlay color: ${color}`);
  }

  return `linear-gradient(${angleDegrees}deg, ${stops
    .map(
      ({ alpha, positionPercent }) =>
        `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha}) ${positionPercent}%`
    )
    .join(", ")})`;
}

export default async function Image() {
  const photoUrl = new URL(socialPreview.rendererPhoto.src, SITE_URL).toString();
  const nameArtworkUrl = new URL(socialPreview.nameArtwork.src, SITE_URL).toString();
  const [photoData, nameArtworkData] = await Promise.all([
    fetch(photoUrl).then((response) => {
      if (!response.ok) {
        throw new Error(`Unable to load social-preview photograph: ${response.status}`);
      }
      return response.arrayBuffer();
    }),
    fetch(nameArtworkUrl).then((response) => {
      if (!response.ok) {
        throw new Error(`Unable to load social-preview name artwork: ${response.status}`);
      }
      return response.arrayBuffer();
    })
  ]);
  return new ImageResponse(
    (
      <div
        style={{
          background: socialPreviewComposition.render.canvas.background,
          color: socialPreviewComposition.render.content.textColor,
          display: "flex",
          height: "100%",
          overflow: "hidden",
          position: "relative",
          width: "100%"
        }}
      >
        {/* next/og requires a native image element inside ImageResponse. */}
        <img
          alt=""
          height={socialPreview.rendererPhoto.height}
          src={photoData as unknown as string}
          style={{
            height: "100%",
            left: 0,
            objectFit: socialPreviewComposition.render.photo.objectFit as CSSProperties["objectFit"],
            objectPosition: socialPreviewComposition.render.photo.objectPosition,
            position: "absolute",
            top: 0,
            width: "100%"
          }}
          width={socialPreview.rendererPhoto.width}
        />
        <div
          style={{
            background: gradientFromScore(),
            display: "flex",
            height: "100%",
            left: 0,
            opacity: socialPreviewComposition.render.overlay.opacity,
            position: "absolute",
            top: 0,
            width: "100%"
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "space-between",
            padding: socialPreviewComposition.render.content.padding,
            position: "relative",
            width: `${socialPreviewComposition.render.content.widthPercent}%`
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <img
              alt=""
              height={socialPreview.nameArtwork.height}
              src={nameArtworkData as unknown as string}
              style={{
                height: `${socialPreviewComposition.render.content.name.height}px`,
                objectFit: "contain",
                objectPosition: "left top",
                width: `${socialPreviewComposition.render.content.name.width}px`
              }}
              width={socialPreview.nameArtwork.width}
            />
            <div
              style={{
                color: socialPreviewComposition.render.content.textColor,
                fontFamily: socialPreviewComposition.render.content.supportingFontFamily,
                fontSize: `${socialPreviewComposition.render.content.tagline.fontSize}px`,
                fontWeight: socialPreviewComposition.render.content.tagline.fontWeight,
                lineHeight: socialPreviewComposition.render.content.tagline.lineHeight,
                marginTop: `${socialPreviewComposition.render.content.tagline.marginTop}px`,
                maxWidth: `${socialPreviewComposition.render.content.tagline.maxWidth}px`
              }}
            >
              {socialPreview.tagline}
            </div>
          </div>
          <div
            style={{
              color: socialPreviewComposition.render.content.domain.color,
              fontFamily: socialPreviewComposition.render.content.supportingFontFamily,
              fontSize: `${socialPreviewComposition.render.content.domain.fontSize}px`,
              fontWeight: socialPreviewComposition.render.content.domain.fontWeight,
              letterSpacing: `${socialPreviewComposition.render.content.domain.letterSpacing}px`
            }}
          >
            {socialPreview.domain}
          </div>
        </div>
      </div>
    ),
    size
  );
}
