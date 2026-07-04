import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

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
          alignItems: "flex-start",
          background: "#eeefec",
          color: "#343435",
          display: "flex",
          flexDirection: "column",
          fontFamily: "Arial, sans-serif",
          height: "100%",
          justifyContent: "center",
          padding: "76px",
          width: "100%"
        }}
      >
        <div style={{ color: "#0b5f81", fontSize: 30, fontWeight: 700 }}>Jamie Burkart</div>
        <div style={{ fontSize: 58, fontWeight: 800, lineHeight: 1.05, marginTop: 24, maxWidth: 920 }}>{site.role}</div>
        <div style={{ fontSize: 34, lineHeight: 1.25, marginTop: 30, maxWidth: 860 }}>Operating structure for complex public-facing teams.</div>
      </div>
    ),
    size
  );
}
