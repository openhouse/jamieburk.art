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
          fontFamily: "Arial, sans-serif",
          height: "100%",
          justifyContent: "space-between",
          padding: 72,
          width: "100%"
        }}
      >
        <div style={{ color: "#0b5f81", fontSize: 34, fontWeight: 800 }}>{site.title}</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 88, fontWeight: 900, lineHeight: 1 }}>{site.name}</div>
          <div style={{ color: "#5e5f61", fontSize: 44, fontWeight: 700, marginTop: 28 }}>{site.tagline}</div>
        </div>
        <div style={{ display: "flex", gap: 18 }}>
          {["workflows", "documentation", "decision trails", "handoffs"].map((label) => (
            <div
              key={label}
              style={{
                background: "#e6f1f4",
                border: "2px solid #0b5f81",
                color: "#343435",
                fontSize: 28,
                fontWeight: 800,
                padding: "12px 18px"
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
