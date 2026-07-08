import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Jamie Burkart - Technical Project Manager";
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
          fontFamily: "sans-serif",
          height: "100%",
          justifyContent: "center",
          padding: "76px",
          width: "100%"
        }}
      >
        <div
          style={{
            background: "#0b5f81",
            height: "12px",
            marginBottom: "54px",
            width: "100%"
          }}
        />
        <div style={{ color: "#0b5f81", fontSize: 34, fontWeight: 700 }}>
          Technical Project Manager - Product Operations & Implementation
        </div>
        <div style={{ fontSize: 88, fontWeight: 800, marginTop: 24 }}>
          Jamie Burkart
        </div>
        <div style={{ color: "#1f5c3e", fontSize: 42, fontWeight: 700, marginTop: 28 }}>
          I turn emerging, loosely defined work into usable systems.
        </div>
      </div>
    ),
    size
  );
}
