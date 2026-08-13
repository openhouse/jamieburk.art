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
    <html className={`${karla.variable} ${oswald.variable}`} data-theme="human-index" lang="en">
      <body>
        {/*
          THESIS: A case-file homepage proves Jamie can lead the difficult middle between public need and durable product; it refuses the generic portfolio gallery.
          OWN-WORLD: Work-jacket blue, graphite, field paper, serif declarations, ruled records, documentary photography, and full-width evidence bands.
          STORY: Identify a senior product leader, see discover-deliver-sustain practice, open three decisive cases, then resume or contact.
          FIRST VIEWPORT: Current civic fieldwork fills the right side; Jamie, literal role, one-line value, proof signal, and two actions occupy the blue left field.
          FORM: Discover-deliver-sustain case file; assigned structure three; seed 5e4cf5f7.
          FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
        */}
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
