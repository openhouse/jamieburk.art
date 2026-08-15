import type { Metadata, Viewport } from "next";
import { Karla, Oswald } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getCloudinaryPreconnectUrl } from "@/lib/cloudinary-image-delivery.mjs";
import { createMetadata } from "@/lib/metadata";
import "./globals.css";

const karla = Karla({
  subsets: ["latin"],
  variable: "--font-karla",
  display: "swap"
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap"
});

export const metadata: Metadata = createMetadata();

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#2f6f89",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const cloudinaryPreconnect = getCloudinaryPreconnectUrl();

  return (
    <html className={`${karla.variable} ${oswald.variable}`} data-theme="human-index" lang="en">
      <head>
        {cloudinaryPreconnect ? (
          <link crossOrigin="anonymous" href={cloudinaryPreconnect} rel="preconnect" />
        ) : null}
      </head>
      <body>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
