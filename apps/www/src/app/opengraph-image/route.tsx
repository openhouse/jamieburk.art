import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import {
  buildSocialCardLayout,
  homeSocialCard,
  resolveSocialCardIdentityFontPath,
  resolveSocialCardInterfaceFontPath,
  resolveSocialCardPhotoPath
} from "@/data/social-card";

export const runtime = "nodejs";
const size = {
  width: homeSocialCard.width,
  height: homeSocialCard.height
};
export async function GET() {
  const layout = buildSocialCardLayout();
  const [photoData, identityFontData, interfaceRegularData, interfaceBoldData] = await Promise.all([
    readFile(resolveSocialCardPhotoPath(process.cwd())),
    readFile(resolveSocialCardIdentityFontPath(process.cwd())),
    readFile(resolveSocialCardInterfaceFontPath(process.cwd(), 400)),
    readFile(resolveSocialCardInterfaceFontPath(process.cwd(), 700))
  ]);
  const photoSource = Uint8Array.from(photoData).buffer;
  const identityFontSource = Uint8Array.from(identityFontData).buffer;
  const interfaceRegularSource = Uint8Array.from(interfaceRegularData).buffer;
  const interfaceBoldSource = Uint8Array.from(interfaceBoldData).buffer;

  return new ImageResponse(
    (
      <div
        style={{
          background: "#1a232b",
          color: "#f4f6f7",
          display: "flex",
          fontFamily: homeSocialCard.interfaceFont.family,
          height: "100%",
          overflow: "hidden",
          position: "relative",
          width: "100%"
        }}
      >
        <img
          alt=""
          height={630}
          // @ts-expect-error Satori accepts ArrayBuffer sources for local images.
          src={photoSource}
          style={{
            height: "100%",
            left: 0,
            objectFit: "cover",
            objectPosition: "center 46%",
            position: "absolute",
            top: 0,
            width: "100%"
          }}
          width={1200}
        />
        <div
          style={layout.photoWash}
        />
        <div style={layout.identityField} />
        <div style={layout.rule} />
        <div
          style={layout.copy}
        >
          <div
            style={{
              display: "flex",
              fontSize: 24,
              fontWeight: 700,
              lineHeight: 1.18,
              marginBottom: 17,
              maxWidth: 560,
              textTransform: "uppercase"
            }}
          >
            {homeSocialCard.visibleCopy.role}
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: homeSocialCard.identityFont.family,
              fontSize: 88,
              fontWeight: homeSocialCard.identityFont.weight,
              letterSpacing: "0em",
              lineHeight: 0.96,
              whiteSpace: "nowrap"
            }}
          >
            {homeSocialCard.visibleCopy.name}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: homeSocialCard.identityFont.family,
          data: identityFontSource,
          weight: homeSocialCard.identityFont.weight,
          style: "normal"
        },
        {
          name: homeSocialCard.interfaceFont.family,
          data: interfaceRegularSource,
          weight: 400,
          style: "normal"
        },
        {
          name: homeSocialCard.interfaceFont.family,
          data: interfaceBoldSource,
          weight: 700,
          style: "normal"
        }
      ]
    }
  );
}
