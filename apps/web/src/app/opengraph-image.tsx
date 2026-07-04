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
          background: "#eeefec",
          color: "#343435",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "center",
          padding: "76px",
          width: "100%"
        }}
      >
        <div style={{ color: "#0b5f81", fontSize: 34, fontWeight: 700 }}>{site.name}</div>
        <div style={{ fontSize: 56, fontWeight: 800, lineHeight: 1.06, marginTop: 26, maxWidth: 960 }}>
          Technical Project Manager - Product Operations & Implementation
        </div>
        <div style={{ color: "#5e5f61", fontSize: 32, lineHeight: 1.25, marginTop: 32, maxWidth: 940 }}>
          Operating structure for complex public-facing teams.
        </div>
      </div>
    ),
    size
  );
}
