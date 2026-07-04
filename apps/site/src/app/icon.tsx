import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#0b5f81",
          color: "#ffffff",
          display: "flex",
          fontSize: 28,
          fontWeight: 900,
          height: "100%",
          justifyContent: "center",
          width: "100%"
        }}
      >
        JB
      </div>
    ),
    size
  );
}
