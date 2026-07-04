import { ImageResponse } from "next/og";
import { siteConfig } from "@jamie/site-content/site";

export const size = {
  width: 1200,
  height: 630
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#eeefec",
          color: "#343435",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          padding: 72,
          width: "100%"
        }}
      >
        <div
          style={{
            color: "#0b5f81",
            fontSize: 34,
            fontWeight: 800
          }}
        >
          {siteConfig.role}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 92, fontWeight: 900, letterSpacing: 0 }}>
            {siteConfig.name}
          </div>
          <div style={{ fontSize: 42, lineHeight: 1.2, maxWidth: 900 }}>
            I create operating structure for complex public-facing teams.
          </div>
        </div>
        <div style={{ color: "#5e5f61", fontSize: 26 }}>{siteConfig.url}</div>
      </div>
    ),
    size
  );
}
