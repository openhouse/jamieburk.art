import { Archivo_Narrow, Karla, League_Spartan } from "next/font/google";

export const karla = Karla({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-karla"
});

export const archivoNarrow = Archivo_Narrow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-archivo-narrow"
});

export const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-league-spartan"
});
