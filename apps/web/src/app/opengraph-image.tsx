import { ImageResponse } from "next/og";
import { site } from "@/data/site";

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
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 28,
          padding: 72,
          background: "#eeefec",
          color: "#343435",
          fontFamily: "Arial"
        }}
      >
        <div style={{ color: "#0b5f81", fontSize: 28, fontWeight: 700 }}>
          {site.role}
        </div>
        <div style={{ maxWidth: 860, fontSize: 86, lineHeight: 0.96, fontWeight: 800 }}>
          {site.name}
        </div>
        <div style={{ maxWidth: 780, color: "#0b5f81", fontSize: 42, fontWeight: 700 }}>
          Operating structure for complex public-facing teams.
        </div>
      </div>
    ),
    size
  );
}
