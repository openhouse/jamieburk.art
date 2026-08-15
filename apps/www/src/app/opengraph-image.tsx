import { ImageResponse } from "next/og";
import { socialPreview } from "@/data/social-preview";
import { SITE_URL } from "@/lib/site-url";

export const runtime = "edge";
export const alt = socialPreview.alt;
export const size = {
  width: socialPreview.width,
  height: socialPreview.height
};
export const contentType = socialPreview.contentType;

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
          background: "#1a232b",
          color: "#ffffff",
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
            objectFit: "cover",
            objectPosition: "50% 47%",
            position: "absolute",
            top: 0,
            width: "100%"
          }}
          width={socialPreview.rendererPhoto.width}
        />
        <div
          style={{
            background:
              "linear-gradient(90deg, rgba(26, 35, 43, 0.98) 0%, rgba(26, 35, 43, 0.95) 34%, rgba(26, 35, 43, 0.78) 52%, rgba(26, 35, 43, 0.2) 72%, rgba(26, 35, 43, 0.04) 100%)",
            display: "flex",
            height: "100%",
            left: 0,
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
            padding: "58px 58px 50px",
            position: "relative",
            width: "58%"
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <img
              alt=""
              height={socialPreview.nameArtwork.height}
              src={nameArtworkData as unknown as string}
              style={{
                height: "175px",
                objectFit: "contain",
                objectPosition: "left top",
                width: "350px"
              }}
              width={socialPreview.nameArtwork.width}
            />
            <div
              style={{
                color: "#ffffff",
                fontFamily: "Arial, sans-serif",
                fontSize: "38px",
                fontWeight: 700,
                lineHeight: 1.16,
                marginTop: "42px",
                maxWidth: "500px"
              }}
            >
              {socialPreview.tagline}
            </div>
          </div>
          <div
            style={{
              color: "#a9c4cf",
              fontFamily: "Arial, sans-serif",
              fontSize: "24px",
              fontWeight: 700,
              letterSpacing: "1.1px"
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
