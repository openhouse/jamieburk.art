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

async function readSocialPreviewImage(): Promise<ArrayBuffer> {
  const relativePath = socialPreview.image.src.replace(/^\/+/, "");
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

  throw lastError ?? new Error("Unable to load the social-preview image.");
}

export default async function Image() {
  const imageData = await readSocialPreviewImage();

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
            height: "630px",
            left: 0,
            objectFit: "cover",
            objectPosition: "center 46%",
            position: "absolute",
            top: 0,
            width: "1200px"
          }}
          width="1200"
        />
        <div
          style={{
            background: "rgba(16, 25, 32, 0.48)",
            display: "flex",
            height: "630px",
            left: 0,
            position: "absolute",
            top: 0,
            width: "1200px"
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "54px 68px 58px",
            position: "relative",
            width: "720px"
          }}
        >
          <div
            style={{
              fontFamily: "serif",
              fontSize: "94px",
              fontWeight: 600,
              letterSpacing: "-0.03em",
              lineHeight: 0.94,
              maxWidth: "650px"
            }}
          >
            {socialPreview.name}
          </div>
          <div
            style={{
              fontFamily: "sans-serif",
              fontSize: "31px",
              fontWeight: 700,
              lineHeight: 1.12,
              marginTop: "30px"
            }}
          >
            {socialPreview.role}
          </div>
          <div
            style={{
              fontFamily: "sans-serif",
              fontSize: "32px",
              fontWeight: 600,
              lineHeight: 1.2,
              marginTop: "24px",
              maxWidth: "600px"
            }}
          >
            {socialPreview.proposition}
          </div>
        </div>
        <div
          style={{
            background: "#2f6f89",
            bottom: 0,
            color: "#ffffff",
            display: "flex",
            fontFamily: "sans-serif",
            fontSize: "22px",
            fontWeight: 700,
            left: 0,
            letterSpacing: "0.01em",
            padding: "14px 22px 16px 68px",
            position: "absolute"
          }}
        >
          {socialPreview.siteLabel}
        </div>
      </div>
    ),
    size
  );
}
