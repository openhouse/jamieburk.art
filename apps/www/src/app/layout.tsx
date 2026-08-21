import type { Metadata, Viewport } from "next";
import { Karla, Oswald } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
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
  return (
    <html
      className={`${karla.variable} ${oswald.variable}`}
      data-scroll-behavior="smooth"
      data-theme="human-index"
      lang="en"
    >
      <head>
        <link href="https://res.cloudinary.com" rel="dns-prefetch" />
        <link crossOrigin="anonymous" href="https://res.cloudinary.com" rel="preconnect" />
      </head>
      <body>
        <SiteHeader />
        <main id="main" tabIndex={-1}>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
