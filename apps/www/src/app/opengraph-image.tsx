import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Jamie Burkart - Product leadership for public-facing systems";
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
          background: "#fffdf7",
          color: "#101b20",
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
            background: "#0e62a3",
            height: "12px",
            marginBottom: "54px",
            width: "100%"
          }}
        />
        <div style={{ color: "#0e62a3", fontSize: 34, fontWeight: 700 }}>
          Jamie Burkart
        </div>
        <div style={{ fontSize: 80, fontWeight: 800, lineHeight: 0.98, marginTop: 28 }}>
          Product leadership for public-facing systems.
        </div>
        <div style={{ color: "#1f6b53", fontSize: 34, fontWeight: 700, marginTop: 30 }}>
          Discovery → launch → measurement → handoff
        </div>
      </div>
    ),
    size
  );
}
