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
  themeColor: "#0e62a3",
  width: "device-width",
  initialScale: 1
};

const formDirection = {
  seed: "603b707c",
  world: "public-service-briefing-folio",
  mechanism: "complex-public-work-to-traceable-decisions-and-usable-systems",
  firstSurface: "product-ownership-public-service-judgment-shipping-fluency",
  signature: "evidence-rail-and-documentary-folio-field",
  craftFloor: "no-eyebrows-card-grids-gradients-fake-technical-chrome-or-decorative-metrics"
} as const;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      className={`${karla.variable} ${oswald.variable}`}
      data-form-craft-floor={formDirection.craftFloor}
      data-form-first-surface={formDirection.firstSurface}
      data-form-mechanism={formDirection.mechanism}
      data-form-seed={formDirection.seed}
      data-form-signature={formDirection.signature}
      data-form-world={formDirection.world}
      data-theme="public-service-folio"
      lang="en"
    >
      <body>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
