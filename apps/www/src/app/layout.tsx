import type { Metadata, Viewport } from "next";
import { Archivo_Narrow, Karla } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { createMetadata } from "@/lib/metadata";
import { IS_PRODUCTION } from "@/lib/site-url";
import "./globals.css";

const karla = Karla({
  subsets: ["latin"],
  variable: "--font-karla",
  display: "swap"
});

const archivoNarrow = Archivo_Narrow({
  subsets: ["latin"],
  variable: "--font-archivo-narrow",
  display: "swap",
  weight: ["400", "500", "600", "700"]
});

export const metadata: Metadata = createMetadata();

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#0b5f81",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html className={`${karla.variable} ${archivoNarrow.variable}`} lang="en">
      <body>
        <SiteHeader />
        {!IS_PRODUCTION ? (
          <div className="border-b border-jb-blue/18 bg-jb-blue px-4 py-2 text-center font-display text-sm font-semibold text-jb-paper">
            Staging review - not indexed
          </div>
        ) : null}
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
