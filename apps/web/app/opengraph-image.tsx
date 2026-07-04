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
          background: "#f7f2ea",
          color: "#1e1b18",
          display: "flex",
          flexDirection: "column",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
          height: "100%",
          justifyContent: "space-between",
          padding: 72,
          width: "100%"
        }}
      >
        <div
          style={{
            background: "#0b5f81",
            height: 14,
            width: "61.803398875%"
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column"
          }}
        >
          <p style={{ color: "#0b5f81", fontSize: 34, fontWeight: 800 }}>
            {site.name}
          </p>
          <h1
            style={{
              fontSize: 78,
              letterSpacing: 0,
              lineHeight: 0.95,
              margin: "18px 0 0"
            }}
          >
            Technical Project Manager
          </h1>
          <p style={{ fontSize: 36, marginTop: 28 }}>
            Operating structure for complex public-facing teams.
          </p>
        </div>
        <div
          style={{
            display: "flex",
            gap: 14
          }}
        >
          {["#2e5f5a", "#f7ec86", "#ffa77f", "#624c7f"].map((color) => (
            <div
              key={color}
              style={{
                background: color,
                height: 18,
                width: 120
              }}
            />
          ))}
        </div>
      </div>
    ),
    size
  );
}
