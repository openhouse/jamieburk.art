import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { homeSocialCard, resolveSocialCardPhotoPath } from "@/data/social-card";

export const runtime = "nodejs";
const size = {
  width: homeSocialCard.width,
  height: homeSocialCard.height
};
export async function GET() {
  const photoData = await readFile(resolveSocialCardPhotoPath(process.cwd()));
  const photoSource = Uint8Array.from(photoData).buffer;

  return new ImageResponse(
    (
      <div
        style={{
          background: "#d9e4e9",
          color: "#f4f6f7",
          display: "flex",
          fontFamily: "sans-serif",
          height: "100%",
          width: "100%"
        }}
      >
        <div
          style={{
            background: "#1a232b",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "space-between",
            padding: "46px 40px 34px",
            width: "420px"
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontFamily: "serif",
                fontSize: 70,
                fontWeight: 500,
                letterSpacing: "-0.02em",
                lineHeight: 0.9
              }}
            >
              <span>Jamie</span>
              <span>Burkart</span>
            </div>
            <div
              style={{
                background: "#d1a23f",
                display: "flex",
                height: "6px",
                marginTop: "28px",
                width: "72px"
              }}
            />
            <div
              style={{
                color: "#d9e4e9",
                display: "flex",
                fontSize: 23,
                fontWeight: 700,
                lineHeight: 1.18,
                marginTop: "26px"
              }}
            >
              {homeSocialCard.role}
            </div>
            <div
              style={{
                color: "#ffffff",
                display: "flex",
                fontFamily: "serif",
                fontSize: 31,
                lineHeight: 1.12,
                marginTop: "30px"
              }}
            >
              {homeSocialCard.tagline}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                color: "#ffffff",
                display: "flex",
                fontSize: 18,
                fontWeight: 700,
                letterSpacing: "0.02em"
              }}
            >
              jamieburk.art
            </div>
            <div
              style={{
                color: "#b8c9d0",
                display: "flex",
                fontSize: 14,
                lineHeight: 1.25,
                marginTop: "10px"
              }}
            >
              {homeSocialCard.photoLabel} · {homeSocialCard.photoCredit}
            </div>
          </div>
        </div>
        <div
          style={{
            alignItems: "center",
            background: "#d9e4e9",
            display: "flex",
            height: "100%",
            justifyContent: "center",
            overflow: "hidden",
            width: "780px"
          }}
        >
          <img
            alt=""
            height={630}
            // @ts-expect-error Satori accepts ArrayBuffer sources for local images.
            src={photoSource}
            style={{
              height: "100%",
              objectFit: "contain",
              width: "100%"
            }}
            width={780}
          />
        </div>
      </div>
    ),
    size
  );
}
