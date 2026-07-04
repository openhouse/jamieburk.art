import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const runtime = "edge";
export const alt = "Jamie Burkart portfolio";
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
          justifyContent: "space-between",
          background: "#eeefec",
          color: "#343435",
          padding: "72px",
          fontFamily: "Arial, sans-serif"
        }}
      >
        <div style={{ fontSize: 32, color: "#0b5f81", fontWeight: 700 }}>
          Technical Project Manager - Product Operations & Implementation
        </div>
        <div>
          <div style={{ fontSize: 92, fontWeight: 900, lineHeight: 1 }}>{site.name}</div>
          <div style={{ marginTop: 24, fontSize: 42, lineHeight: 1.2 }}>
            I turn under-structured work into usable systems.
          </div>
        </div>
        <div style={{ display: "flex", gap: 18, fontSize: 28, color: "#5e5f61" }}>
          <span>Requirements</span>
          <span>Documentation</span>
          <span>Handoffs</span>
          <span>Civic tools</span>
        </div>
      </div>
    ),
    size
  );
}
