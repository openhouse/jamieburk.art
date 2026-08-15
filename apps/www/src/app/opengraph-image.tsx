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
  const photoData = await fetch(photoUrl).then((response) => {
    if (!response.ok) {
      throw new Error(`Unable to load social-preview photograph: ${response.status}`);
    }
    return response.arrayBuffer();
  });
  const [roleLead, roleDetail] = socialPreview.role.split(" - ");
  const [givenName, ...familyNameParts] = socialPreview.title.split(" ");
  const familyName = familyNameParts.join(" ");

  return new ImageResponse(
    (
      <div
        style={{
          background: "#1a232b",
          color: "#ffffff",
          display: "flex",
          height: "100%",
          width: "100%"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "space-between",
            padding: "62px 58px 54px",
            width: "58%"
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                background: "#2f6f89",
                height: "12px",
                marginBottom: "42px",
                width: "104px"
              }}
            />
            <div
              style={{
                color: "#ffffff",
                display: "flex",
                flexDirection: "column",
                fontFamily: "Georgia, serif",
                fontSize: "76px",
                fontWeight: 700,
                letterSpacing: "-1.5px",
                lineHeight: 0.94
              }}
            >
              <span>{givenName}</span>
              <span>{familyName}</span>
            </div>
            <div
              style={{
                color: "#d9e4e9",
                display: "flex",
                flexDirection: "column",
                fontFamily: "Arial, sans-serif",
                fontSize: "27px",
                fontWeight: 700,
                lineHeight: 1.2,
                marginTop: "32px"
              }}
            >
              <span>{roleLead}</span>
              <span>{roleDetail}</span>
            </div>
            <div
              style={{
                color: "#ffffff",
                fontFamily: "Arial, sans-serif",
                fontSize: "34px",
                fontWeight: 700,
                lineHeight: 1.18,
                marginTop: "34px",
                maxWidth: "560px"
              }}
            >
              {socialPreview.tagline}
            </div>
          </div>
          <div
            style={{
              color: "#a9c4cf",
              fontFamily: "Arial, sans-serif",
              fontSize: "23px",
              fontWeight: 700,
              letterSpacing: "1.1px"
            }}
          >
            {socialPreview.domain}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            height: "100%",
            overflow: "hidden",
            position: "relative",
            width: "42%"
          }}
        >
          {/* next/og requires a native image element inside ImageResponse. */}
          <img
            alt=""
            height={socialPreview.rendererPhoto.height}
            src={photoData as unknown as string}
            style={{
              height: "100%",
              objectFit: "cover",
              objectPosition: "72% 50%",
              width: "100%"
            }}
            width={socialPreview.rendererPhoto.width}
          />
          <div
            style={{
              background: "rgba(26, 35, 43, 0.88)",
              bottom: "24px",
              color: "#ffffff",
              display: "flex",
              fontFamily: "Arial, sans-serif",
              fontSize: "17px",
              left: "24px",
              lineHeight: 1.25,
              padding: "10px 12px",
              position: "absolute",
              right: "24px"
            }}
          >
            {socialPreview.photoCredit}
          </div>
        </div>
      </div>
    ),
    size
  );
}
