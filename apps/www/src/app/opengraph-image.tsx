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
          background: "#f3f6f8",
          color: "#222b36",
          display: "flex",
          height: "100%",
          width: "100%"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "52px 48px 46px 58px",
            width: "640px"
          }}
        >
          <div
            style={{
              fontFamily: "serif",
              fontSize: "70px",
              fontWeight: 600,
              letterSpacing: "-0.025em",
              lineHeight: 0.98
            }}
          >
            {socialPreview.name}
          </div>
          <div
            style={{
              color: "#2f6f89",
              fontFamily: "sans-serif",
              fontSize: "36px",
              fontWeight: 700,
              lineHeight: 1.12,
              marginTop: "30px"
            }}
          >
            {socialPreview.role}
          </div>
          <div
            style={{
              color: "#4e6f61",
              fontFamily: "sans-serif",
              fontSize: "28px",
              fontWeight: 700,
              lineHeight: 1.2,
              marginTop: "10px"
            }}
          >
            {socialPreview.focus}
          </div>
          <div
            style={{
              background: "#c83b32",
              height: "5px",
              marginTop: "34px",
              width: "58px"
            }}
          />
          <div
            style={{
              fontFamily: "sans-serif",
              fontSize: "27px",
              fontWeight: 600,
              lineHeight: 1.25,
              marginTop: "26px",
              maxWidth: "510px"
            }}
          >
            {socialPreview.proposition}
          </div>
          <div
            style={{
              color: "#4e6f61",
              fontFamily: "sans-serif",
              fontSize: "22px",
              fontWeight: 700,
              marginTop: "34px"
            }}
          >
            {socialPreview.siteLabel}
          </div>
        </div>
        <div
          style={{
            alignItems: "center",
            background: "#2f6f89",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "center",
            padding: "28px 20px 24px",
            width: "560px"
          }}
        >
          <img
            alt={socialPreview.image.alt}
            height="390"
            src={imageData as unknown as string}
            style={{
              height: "390px",
              objectFit: "contain",
              width: "520px"
            }}
            width="520"
          />
          <div
            style={{
              color: "#ffffff",
              display: "flex",
              flexDirection: "column",
              fontFamily: "sans-serif",
              marginTop: "22px",
              width: "520px"
            }}
          >
            <div style={{ fontSize: "21px", fontWeight: 700, lineHeight: 1.25 }}>
              {socialPreview.image.caption}
            </div>
            <div
              style={{
                color: "#ffffff",
                fontSize: "18px",
                fontWeight: 500,
                lineHeight: 1.3,
                marginTop: "8px"
              }}
            >
              {socialPreview.credit}
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
