import type { Metadata, Viewport } from "next";
import {
  Archivo_Black,
  Caveat_Brush,
  Karla,
  League_Spartan,
  Libre_Franklin,
  Nunito_Sans,
  Oswald,
  Patrick_Hand,
  Risque
} from "next/font/google";
import { EnvironmentBanner } from "@/components/EnvironmentBanner";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { createMetadata } from "@/lib/metadata";
import "./globals.css";

const karla = Karla({
  subsets: ["latin"],
  variable: "--font-karla",
  display: "swap"
});

const libreFranklin = Libre_Franklin({
  subsets: ["latin"],
  variable: "--font-libre-franklin",
  display: "swap"
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap"
});

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  variable: "--font-league-spartan",
  display: "swap"
});

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-archivo-black",
  display: "swap"
});

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
  display: "swap"
});

const risque = Risque({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-risque",
  display: "swap"
});

const caveatBrush = Caveat_Brush({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-caveat-brush",
  display: "swap"
});

const patrickHand = Patrick_Hand({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-patrick-hand",
  display: "swap"
});

const fontVariables = [
  karla.variable,
  libreFranklin.variable,
  oswald.variable,
  leagueSpartan.variable,
  archivoBlack.variable,
  nunitoSans.variable,
  risque.variable,
  caveatBrush.variable,
  patrickHand.variable
].join(" ");

export const metadata: Metadata = createMetadata();

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#0b5f81",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html className={fontVariables} lang="en">
      <body>
        <EnvironmentBanner />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
