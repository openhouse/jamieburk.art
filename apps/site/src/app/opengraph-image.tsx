import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#eeefec",
          color: "#343435",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          padding: 72,
          width: "100%"
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 920 }}>
          <div style={{ color: "#0b5f81", fontSize: 34, fontWeight: 800 }}>Jamie Burkart</div>
          <div style={{ fontSize: 72, fontWeight: 900, lineHeight: 0.98, marginTop: 28 }}>
            Operating structure for ambiguous public-facing technical work.
          </div>
        </div>
      </div>
    ),
    size
  );
}
